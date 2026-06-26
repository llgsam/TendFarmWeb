import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

const contentDir = path.join(process.cwd(), 'src', 'content')

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
  const dir = path.join(contentDir, locale, 'guides', game)
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
        title: data.title ?? '',
        description: data.description ?? '',
        publishedAt: data.publishedAt ?? '',
        tags: data.tags ?? [],
      }
    })
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))
}

export async function getGuideBySlug(
  locale: string,
  game: string,
  slug: string
): Promise<GuidePost | null> {
  const filePath = path.join(contentDir, locale, 'guides', game, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const toc = extractToc(content)
  const processed = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content)
  const contentHtml = addHeadingIds(processed.toString(), toc)

  return {
    slug,
    game,
    locale,
    title: data.title ?? '',
    description: data.description ?? '',
    publishedAt: data.publishedAt ?? '',
    tags: data.tags ?? [],
    contentHtml,
    toc,
    readingTime: calcReadingTime(content),
    faqs: data.faqs ?? [],
  }
}

export async function getAllGuideSlugs(): Promise<
  Array<{ locale: string; game: string; slug: string }>
> {
  const result: Array<{ locale: string; game: string; slug: string }> = []
  const locales = ['zh', 'en']

  for (const locale of locales) {
    const localeDir = path.join(contentDir, locale, 'guides')
    if (!fs.existsSync(localeDir)) continue

    const games = fs.readdirSync(localeDir)
    for (const game of games) {
      const gameDir = path.join(localeDir, game)
      if (!fs.statSync(gameDir).isDirectory()) continue

      const files = fs.readdirSync(gameDir).filter((f) => f.endsWith('.md'))
      for (const file of files) {
        result.push({ locale, game, slug: file.replace(/\.md$/, '') })
      }
    }
  }

  return result
}
