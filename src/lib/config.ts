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

export function buildLanguageAlternates(pathSuffix = ''): Record<string, string> {
  const result: Record<string, string> = {
    'x-default': `${BASE_URL}/en${pathSuffix}`,
  }
  for (const locale of LOCALES) {
    const hreflangKey = HREFLANG_MAP[locale] ?? locale
    result[hreflangKey] = `${BASE_URL}/${locale}${pathSuffix}`
  }
  return result
}
