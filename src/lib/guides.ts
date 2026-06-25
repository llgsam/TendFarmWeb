import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const contentDir = path.join(process.cwd(), 'src', 'content')

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
  const processed = await remark().use(remarkHtml).process(content)
  const contentHtml = processed.toString()

  return {
    slug,
    game,
    locale,
    title: data.title ?? '',
    description: data.description ?? '',
    publishedAt: data.publishedAt ?? '',
    tags: data.tags ?? [],
    contentHtml,
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
