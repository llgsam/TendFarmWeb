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
  const resolved = resolveContentLocale(locale)
  const dir = path.join(contentDir, resolved, 'guides', game)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
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
    })
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))
}

export async function getGuideBySlug(
  locale: string,
  game: string,
  slug: string
): Promise<GuidePost | null> {
  const resolved = resolveContentLocale(locale)
  const filePath = path.join(contentDir, resolved, 'guides', game, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content: rawContent } = matter(raw)
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
    title: localizeZh(locale, data.title ?? ''),
    description: localizeZh(locale, data.description ?? ''),
    publishedAt: data.publishedAt ?? '',
    tags: (data.tags ?? []).map((t: string) => localizeZh(locale, t)),
    contentHtml,
    toc,
    readingTime: calcReadingTime(content),
    faqs: (data.faqs ?? []).map((f: FaqItem) => ({
      q: localizeZh(locale, f.q),
      a: localizeZh(locale, f.a),
    })),
  }
}

const CONTENT_LOCALES = ['zh', 'en'] as const
const FALLBACK_LOCALE = 'en'

function resolveContentLocale(locale: string): string {
  if ((CONTENT_LOCALES as readonly string[]).includes(locale)) return locale
  if (locale === 'zh-TW') return 'zh'
  return FALLBACK_LOCALE
}

export async function getAllGuideSlugs(): Promise<
  Array<{ locale: string; game: string; slug: string }>
> {
  const result: Array<{ locale: string; game: string; slug: string }> = []

  for (const locale of CONTENT_LOCALES) {
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
      }
    }
  }

  return result
}
