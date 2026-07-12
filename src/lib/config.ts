export const BASE_URL = 'https://www.farmgamehub.com'

export const LOCALES = ['zh', 'en', 'zh-TW', 'ja', 'ko', 'de'] as const
export type Locale = (typeof LOCALES)[number]

export function otherLocale(locale: string): string {
  return locale === 'zh' ? 'en' : 'zh'
}

const HREFLANG_MAP: Record<string, string> = {
  zh: 'zh-Hans',
  'zh-TW': 'zh-Hant',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  de: 'de',
}

// availableLocales limits the hreflang set to locales that actually serve content at
// this path (partially-translated content like ja/ko/de guides 404s on missing slugs;
// advertising those URLs sends Google to 404s and wastes crawl budget). Omit it for
// pages that exist in every locale.
export function buildLanguageAlternates(
  pathSuffix = '',
  availableLocales?: readonly string[]
): Record<string, string> {
  const locales = availableLocales
    ? LOCALES.filter((l) => availableLocales.includes(l))
    : LOCALES
  const xDefault = locales.includes('en') ? 'en' : locales[0]
  const result: Record<string, string> = {}
  if (xDefault) result['x-default'] = `${BASE_URL}/${xDefault}${pathSuffix}`
  for (const locale of locales) {
    const hreflangKey = HREFLANG_MAP[locale] ?? locale
    result[hreflangKey] = `${BASE_URL}/${locale}${pathSuffix}`
  }
  return result
}
