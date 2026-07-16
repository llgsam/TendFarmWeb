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

// Tool routes are read from disk so a newly added tool can never be forgotten
// here (a hardcoded list once left /tools/stardew-greenhouse out of the sitemap
// entirely, making it invisible to Google). Redirect-only routes are skipped:
// tools/quiz just redirects to /quizzes/farm-personality, and a redirect URL in
// a sitemap gets reported by Google as "page with redirect", not indexed.
export function toolSlugs(): string[] {
  const dir = path.join(process.cwd(), 'src', 'app', '[locale]', 'tools')
  try {
    return fs.readdirSync(dir).filter((d) => {
      const page = path.join(dir, d, 'page.tsx')
      if (!fs.existsSync(page)) return false
      return !/\bredirect\(/.test(fs.readFileSync(page, 'utf8'))
    })
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
  for (const p of ['/games', '/tools', '/quizzes']) {
    add(p)
  }

  // Tools (read from disk — see toolSlugs)
  for (const slug of toolSlugs()) add(`/tools/${slug}`)

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
