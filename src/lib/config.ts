export const BASE_URL = 'https://tendfarm.app'

export const LOCALES = ['zh', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export function otherLocale(locale: string): string {
  return locale === 'zh' ? 'en' : 'zh'
}
