import { describe, it, expect } from 'vitest'
import { cookingSummary, getCookingFaqs } from '@/lib/tools/seo/cookingSeoContent'
import { COOK_RECIPES } from '@/components/tools/stardewCookingData'

describe('cookingSummary', () => {
  it('states the real recipe count for en', () => {
    expect(cookingSummary('en')).toContain(String(COOK_RECIPES.length))
  })
  it('states the count of recipes that grant a buff', () => {
    const buffCount = COOK_RECIPES.filter((r) => r.buffs.length > 0).length
    expect(cookingSummary('en')).toContain(String(buffCount))
  })
  it('uses the zh template', () => {
    expect(cookingSummary('zh')).toContain('星露谷')
  })
  it('falls back to en for unknown locale', () => {
    expect(cookingSummary('xx')).toContain(String(COOK_RECIPES.length))
  })
})

describe('getCookingFaqs', () => {
  it('returns 4 authored FAQs for en and zh', () => {
    expect(getCookingFaqs('en')).toHaveLength(4)
    expect(getCookingFaqs('zh')).toHaveLength(4)
    for (const f of [...getCookingFaqs('en'), ...getCookingFaqs('zh')]) {
      expect(f.q.length).toBeGreaterThan(0)
      expect(f.a.length).toBeGreaterThan(0)
    }
  })
  it('returns [] for locales without authored FAQs', () => {
    for (const loc of ['zh-TW', 'ja', 'ko', 'de', 'xx']) {
      expect(getCookingFaqs(loc)).toEqual([])
    }
  })
  it('en FAQ mentions the Queen of Sauce unlock source', () => {
    expect(getCookingFaqs('en').some((f) => f.a.includes('Queen of Sauce'))).toBe(true)
  })
})
