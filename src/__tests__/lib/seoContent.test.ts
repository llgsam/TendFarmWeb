import { describe, it, expect } from 'vitest'
import { byLocale, faqsByLocale, type Faq } from '@/lib/tools/seo/content'

describe('byLocale', () => {
  const map = { en: 'E', zh: 'Z', de: 'D' }
  it('returns the value for a present locale', () => {
    expect(byLocale(map, 'zh')).toBe('Z')
    expect(byLocale(map, 'de')).toBe('D')
  })
  it('falls back to en for a missing locale', () => {
    expect(byLocale(map, 'ja')).toBe('E')
    expect(byLocale(map, 'xx')).toBe('E')
  })
})

describe('faqsByLocale', () => {
  const en: Faq[] = [{ q: 'q1', a: 'a1' }]
  const zh: Faq[] = [{ q: '问', a: '答' }]
  const map = { en, zh }
  it('returns authored FAQs for a present locale', () => {
    expect(faqsByLocale(map, 'en')).toBe(en)
    expect(faqsByLocale(map, 'zh')).toBe(zh)
  })
  it('returns [] for a locale with no authored FAQs', () => {
    expect(faqsByLocale(map, 'ja')).toEqual([])
    expect(faqsByLocale(map, 'de')).toEqual([])
  })
})
