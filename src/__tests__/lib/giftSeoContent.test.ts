import { describe, it, expect } from 'vitest'
import { giftSummary, getGiftFaqs } from '@/lib/tools/seo/giftSeoContent'
import { GIFT_VILLAGERS, UNIVERSAL_LOVES } from '@/components/tools/stardewGiftData'

describe('giftSummary', () => {
  it('states the real villager count for en', () => {
    expect(giftSummary('en')).toContain(String(GIFT_VILLAGERS.length))
  })
  it('states the universal-loves count', () => {
    expect(giftSummary('en')).toContain(String(UNIVERSAL_LOVES.length))
  })
  it('names Prismatic Shard as a highlighted universal gift (en)', () => {
    expect(giftSummary('en')).toContain('Prismatic Shard')
  })
  it('uses the zh template', () => {
    const s = giftSummary('zh')
    expect(s).toContain('星露谷')
    expect(s).toContain('五彩碎片')
  })
  it('falls back to en for unknown locale', () => {
    expect(giftSummary('xx')).toContain(String(GIFT_VILLAGERS.length))
  })
})

describe('getGiftFaqs', () => {
  it('returns 4 authored FAQs for en and zh', () => {
    expect(getGiftFaqs('en')).toHaveLength(4)
    expect(getGiftFaqs('zh')).toHaveLength(4)
    for (const f of [...getGiftFaqs('en'), ...getGiftFaqs('zh')]) {
      expect(f.q.length).toBeGreaterThan(0)
      expect(f.a.length).toBeGreaterThan(0)
    }
  })
  it('returns [] for locales without authored FAQs', () => {
    for (const loc of ['zh-TW', 'ja', 'ko', 'de', 'xx']) {
      expect(getGiftFaqs(loc)).toEqual([])
    }
  })
  it('en FAQ mentions the +80 friendship mechanic', () => {
    expect(getGiftFaqs('en').some((f) => f.a.includes('+80'))).toBe(true)
  })
})
