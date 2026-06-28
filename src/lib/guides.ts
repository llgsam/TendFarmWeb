import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import * as OpenCC from 'opencc-js'

const contentDir = path.join(process.cwd(), 'src', 'content')

// Simplified → Traditional (Taiwan standard + Taiwanese idioms, e.g. 软件→軟體, 程序→程式).
// Lazily created so it's only built when a zh-TW page is rendered.
let _s2twp: ((text: string) => string) | null = null
function toTraditional(text: string): string {
  if (!text) return text
  if (!_s2twp) _s2twp = OpenCC.Converter({ from: 'cn', to: 'twp' })
  return _s2twp(text)
}

// Convert source-Chinese (simplified) strings to Traditional only for the zh-TW locale.
function localizeZh(locale: string, text: string): string {
  return locale === 'zh-TW' ? toTraditional(text) : text
}

export interface TocHeading {
  level: 2 | 3
  text: string
  id: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface GuideMeta {
  slug: string
  game: string
  locale: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
}

export interface GuidePost extends GuideMeta {
  contentHtml: string
  toc: TocHeading[]
  readingTime: number
  faqs: FaqItem[]
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w一-鿿\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function extractToc(markdown: string): TocHeading[] {
  const headings: TocHeading[] = []
  for (const line of markdown.split('\n')) {
    const m2 = line.match(/^## (.+)/)
    if (m2) headings.push({ level: 2, text: m2[1].trim(), id: slugify(m2[1].trim()) })
    const m3 = line.match(/^### (.+)/)
    if (m3) headings.push({ level: 3, text: m3[1].trim(), id: slugify(m3[1].trim()) })
  }
  return headings
}

function addHeadingIds(html: string, toc: TocHeading[]): string {
  let result = html
  for (const h of toc) {
    const tag = `h${h.level}`
    const escaped = h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    result = result.replace(
      new RegExp(`<${tag}>(\\s*${escaped}\\s*)</${tag}>`, 'i'),
      `<${tag} id="${h.id}">$1</${tag}>`
    )
  }
  return result
}

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export async function getGuides(locale: string, game: string): Promise<GuideMeta[]> {
  // The canonical article list comes from the listing locale's dir; each article's
  // metadata is read from the best available translation (own locale → English).
  const listDir = path.join(contentDir, listingLocale(locale), 'guides', game)
  if (!fs.existsSync(listDir)) return []

  const files = fs.readdirSync(listDir).filter((f) => f.endsWith('.md'))
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const resolved = resolveGuideFile(locale, game, slug)
      if (!resolved) return null
      try {
        const raw = fs.readFileSync(resolved.filePath, 'utf-8')
        const { data } = matter(raw)
        return {
          slug,
          game,
          locale,
          title: localizeZh(locale, data.title ?? ''),
          description: localizeZh(locale, data.description ?? ''),
          publishedAt: data.publishedAt ?? '',
          tags: (data.tags ?? []).map((t: string) => localizeZh(locale, t)),
        }
      } catch (err) {
        // A single malformed frontmatter file must not crash the whole listing.
        console.error(`[guides] failed to parse ${resolved.filePath}:`, err)
        return null
      }
    })
    .filter((g): g is GuideMeta => g !== null)
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))
}

export async function getGuideBySlug(
  locale: string,
  game: string,
  slug: string
): Promise<GuidePost | null> {
  const resolved = resolveGuideFile(locale, game, slug)
  if (!resolved) return null

  const raw = fs.readFileSync(resolved.filePath, 'utf-8')
  let data: { [key: string]: unknown }
  let rawContent: string
  try {
    const parsed = matter(raw)
    data = parsed.data
    rawContent = parsed.content
  } catch (err) {
    console.error(`[guides] failed to parse ${resolved.filePath}:`, err)
    return null
  }
  const title = (data.title as string) ?? ''
  const description = (data.description as string) ?? ''
  const publishedAt = (data.publishedAt as string) ?? ''
  const tags = (data.tags as string[]) ?? []
  const faqList = (data.faqs as FaqItem[]) ?? []
  // Convert the source (simplified) markdown to Traditional first, so the rendered
  // HTML, the TOC text, and the heading IDs all stay consistent for zh-TW.
  const content = localizeZh(locale, rawContent)
  const toc = extractToc(content)
  const processed = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content)
  const contentHtml = addHeadingIds(processed.toString(), toc)

  return {
    slug,
    game,
    locale,
    title: localizeZh(locale, title),
    description: localizeZh(locale, description),
    publishedAt,
    tags: tags.map((t: string) => localizeZh(locale, t)),
    contentHtml,
    toc,
    readingTime: calcReadingTime(content),
    faqs: faqList.map((f: FaqItem) => ({
      q: localizeZh(locale, f.q),
      a: localizeZh(locale, f.a),
    })),
  }
}

// Physical source directories that hold the full article set.
const SOURCE_LOCALES = ['zh', 'en'] as const
// Locales with their own (possibly partial) translated dirs; untranslated articles fall back to English.
const TRANSLATED_LOCALES = ['ja', 'ko', 'de'] as const
const FALLBACK_LOCALE = 'en'

// The directory whose article set defines the canonical list for a locale.
// zh/zh-TW list against the zh set; en/ja/ko/de list against the en set (full coverage).
function listingLocale(locale: string): string {
  return locale === 'zh' || locale === 'zh-TW' ? 'zh' : 'en'
}

// Ordered content dirs to try for a specific article — first existing file wins.
function contentLocaleChain(locale: string): string[] {
  if (locale === 'zh') return ['zh']
  if (locale === 'zh-TW') return ['zh'] // converted Simplified→Traditional at render time
  if (locale === 'en') return ['en']
  if ((TRANSLATED_LOCALES as readonly string[]).includes(locale)) return [locale, FALLBACK_LOCALE]
  return [FALLBACK_LOCALE]
}

// Resolve the on-disk markdown file for (locale, game, slug), honoring the fallback chain.
function resolveGuideFile(
  locale: string,
  game: string,
  slug: string
): { filePath: string; sourceLocale: string } | null {
  for (const c of contentLocaleChain(locale)) {
    const p = path.join(contentDir, c, 'guides', game, `${slug}.md`)
    if (fs.existsSync(p)) return { filePath: p, sourceLocale: c }
  }
  return null
}

export async function getAllGuideSlugs(): Promise<
  Array<{ locale: string; game: string; slug: string }>
> {
  const result: Array<{ locale: string; game: string; slug: string }> = []

  for (const locale of SOURCE_LOCALES) {
    const localeDir = path.join(contentDir, locale, 'guides')
    if (!fs.existsSync(localeDir)) continue

    const games = fs.readdirSync(localeDir)
    for (const game of games) {
      const gameDir = path.join(localeDir, game)
      if (!fs.statSync(gameDir).isDirectory()) continue

      const files = fs.readdirSync(gameDir).filter((f) => f.endsWith('.md'))
      for (const file of files) {
        const slug = file.replace(/\.md$/, '')
        result.push({ locale, game, slug })
        // zh-TW reuses the simplified-Chinese source, converted to Traditional at render time.
        if (locale === 'zh') result.push({ locale: 'zh-TW', game, slug })
        // ja/ko/de: only pre-render (and sitemap) articles that actually have a native
        // translation file. Untranslated ones stay reachable on-demand with English fallback,
        // but we don't ship localized URLs serving English content.
        if (locale === 'en') {
          for (const tl of TRANSLATED_LOCALES) {
            const translated = path.join(contentDir, tl, 'guides', game, `${slug}.md`)
            if (fs.existsSync(translated)) result.push({ locale: tl, game, slug })
          }
        }
      }
    }
  }

  return result
}
