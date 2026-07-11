import { describe, it, expect } from 'vitest'
import { villagerSummary, getVillagerFaqs } from '@/lib/tools/seo/villagerSeoContent'
import { VILLAGERS } from '@/components/tools/stardewVillagerData'

const marriageable = VILLAGERS.filter((v) => v.marriageable).length

describe('villagerSummary', () => {
  it('states the real villager count for en', () => {
    expect(villagerSummary('en')).toContain(String(VILLAGERS.length))
  })
  it('states the marriageable count', () => {
    expect(villagerSummary('en')).toContain(String(marriageable))
  })
  it('uses the zh template', () => {
    expect(villagerSummary('zh')).toContain('村民')
  })
  it('falls back to en for unknown locale', () => {
    expect(villagerSummary('xx')).toContain(String(VILLAGERS.length))
  })
})

describe('getVillagerFaqs', () => {
  it('returns 4 authored FAQs for en and zh', () => {
    expect(getVillagerFaqs('en')).toHaveLength(4)
    expect(getVillagerFaqs('zh')).toHaveLength(4)
    for (const f of [...getVillagerFaqs('en'), ...getVillagerFaqs('zh')]) {
      expect(f.q.length).toBeGreaterThan(0)
      expect(f.a.length).toBeGreaterThan(0)
    }
  })
  it('returns [] for locales without authored FAQs', () => {
    for (const loc of ['zh-TW', 'ja', 'ko', 'de', 'xx']) {
      expect(getVillagerFaqs(loc)).toEqual([])
    }
  })
  it("en FAQ mentions the Mermaid's Pendant marriage item", () => {
    expect(getVillagerFaqs('en').some((f) => f.a.includes("Mermaid's Pendant"))).toBe(true)
  })
})
