import { describe, it, expect } from 'vitest'
import { fishSummary, getFishFaqs } from '@/lib/tools/seo/fishSeoContent'
import { FISH } from '@/components/tools/stardewFishData'

describe('fishSummary', () => {
  it('states the real total fish count for en', () => {
    expect(fishSummary('en')).toContain(String(FISH.length))
  })
  it('names the most valuable fish and its price', () => {
    const top = FISH.reduce((a, b) => (b.price > a.price ? b : a))
    const s = fishSummary('en')
    expect(s).toContain(top.name.en)
    expect(s).toContain(String(top.price))
  })
  it('uses the zh template with the zh fish name', () => {
    const top = FISH.reduce((a, b) => (b.price > a.price ? b : a))
    const s = fishSummary('zh')
    expect(s).toContain('星露谷')
    expect(s).toContain(top.name.zh)
  })
  it('falls back to en for unknown locale', () => {
    expect(fishSummary('xx')).toContain(String(FISH.length))
  })
})

describe('getFishFaqs', () => {
  it('returns 4 authored FAQs for en and zh', () => {
    expect(getFishFaqs('en')).toHaveLength(4)
    expect(getFishFaqs('zh')).toHaveLength(4)
    for (const f of [...getFishFaqs('en'), ...getFishFaqs('zh')]) {
      expect(f.q.length).toBeGreaterThan(0)
      expect(f.a.length).toBeGreaterThan(0)
    }
  })
  it('returns [] for locales without authored FAQs', () => {
    for (const loc of ['zh-TW', 'ja', 'ko', 'de', 'xx']) {
      expect(getFishFaqs(loc)).toEqual([])
    }
  })
  it('en FAQ names the top fish (Lava Eel) somewhere', () => {
    expect(getFishFaqs('en').some((f) => f.a.includes('Lava Eel'))).toBe(true)
  })
})
