import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { BASE_URL, LOCALES } from '@/lib/config'
import { getAllGameSlugs } from '@/lib/games'
import { getAllGuideSlugs } from '@/lib/guides'
import { GUIDE_CATEGORY_KEYS } from '@/lib/guide-categories'

const HREFLANG_MAP: Record<string, string> = {
  zh: 'zh-Hans',
  'zh-TW': 'zh-Hant',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  de: 'de',
}

// hreflang alternates for a path across the locales where it genuinely exists.
function alternates(pathSuffix: string, locales: readonly string[]): Record<string, string> {
  const languages: Record<string, string> = {}
  if (locales.includes('en')) languages['x-default'] = `${BASE_URL}/en${pathSuffix}`
  for (const l of locales) languages[HREFLANG_MAP[l] ?? l] = `${BASE_URL}/${l}${pathSuffix}`
  return languages
}

function quizSlugs(): string[] {
  const dir = path.join(process.cwd(), 'src', 'app', '[locale]', 'quizzes')
  try {
    return fs
      .readdirSync(dir)
      .filter((d) => fs.existsSync(path.join(dir, d, 'page.tsx')))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // Emit one entry per (path, locale), each carrying its full hreflang set.
  const add = (
    pathSuffix: string,
    locales: readonly string[] = LOCALES,
    priority = 0.7,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'weekly'
  ) => {
    const languages = alternates(pathSuffix, locales)
    for (const l of locales) {
      entries.push({
        url: `${BASE_URL}/${l}${pathSuffix}`,
        changeFrequency,
        priority,
        alternates: { languages },
      })
    }
  }

  // Static, fully-localized pages. ('/guides' is a redirect to /guides/best-games,
  // so it's omitted; the comparison hub is listed via the guide categories below.)
  add('', LOCALES, 1.0, 'daily')
  for (const p of ['/games', '/tools', '/tools/hay-day', '/tools/stardew', '/tools/stardew-calendar', '/quizzes', '/tendfarm']) {
    add(p)
  }

  // Game directory
  for (const slug of getAllGameSlugs()) add(`/games/${slug}`, LOCALES, 0.8)

  // Quizzes
  for (const slug of quizSlugs()) add(`/quizzes/${slug}`, LOCALES, 0.7)

  // Guide category indexes
  for (const key of GUIDE_CATEGORY_KEYS) add(`/guides/${key}`)

  // Guide articles — only the locales that actually have localized content
  // (zh/en/zh-TW for all; ja/ko/de only where translated), per getAllGuideSlugs.
  const articleLocales = new Map<string, Set<string>>()
  for (const { locale, game, slug } of await getAllGuideSlugs()) {
    const key = `/guides/${game}/${slug}`
    if (!articleLocales.has(key)) articleLocales.set(key, new Set())
    articleLocales.get(key)!.add(locale)
  }
  for (const [pathSuffix, locSet] of articleLocales) {
    add(pathSuffix, [...locSet], 0.6)
  }

  return entries
}
