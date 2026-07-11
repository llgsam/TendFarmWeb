// Shared helpers for tool-page SEO content modules (summaries + FAQs).

export interface Faq {
  q: string
  a: string
}

// Look up a locale-keyed value, falling back to English for unknown/missing locales.
export function byLocale<T>(map: Record<string, T>, locale: string): T {
  return map[locale] ?? map.en
}

// FAQs are hand-authored only for a subset of locales; return [] for the rest.
export function faqsByLocale(map: Record<string, Faq[]>, locale: string): Faq[] {
  return map[locale] ?? []
}
