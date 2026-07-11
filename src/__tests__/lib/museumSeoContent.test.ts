import { describe, it, expect } from 'vitest'
import { museumSummary, getMuseumFaqs } from '@/lib/tools/seo/museumSeoContent'
import { MUSEUM_ITEMS } from '@/components/tools/stardewMuseumData'

const artifacts = MUSEUM_ITEMS.filter((i) => i.category === 'artifact').length

describe('museumSummary', () => {
  it('states the real total item count for en', () => {
    expect(museumSummary('en')).toContain(String(MUSEUM_ITEMS.length))
  })
  it('states the artifact count', () => {
    expect(museumSummary('en')).toContain(String(artifacts))
  })
  it('uses the zh template', () => {
    expect(museumSummary('zh')).toContain('博物馆')
  })
  it('falls back to en for unknown locale', () => {
    expect(museumSummary('xx')).toContain(String(MUSEUM_ITEMS.length))
  })
})

describe('getMuseumFaqs', () => {
  it('returns 4 authored FAQs for en and zh', () => {
    expect(getMuseumFaqs('en')).toHaveLength(4)
    expect(getMuseumFaqs('zh')).toHaveLength(4)
    for (const f of [...getMuseumFaqs('en'), ...getMuseumFaqs('zh')]) {
      expect(f.q.length).toBeGreaterThan(0)
      expect(f.a.length).toBeGreaterThan(0)
    }
  })
  it('returns [] for locales without authored FAQs', () => {
    for (const loc of ['zh-TW', 'ja', 'ko', 'de', 'xx']) {
      expect(getMuseumFaqs(loc)).toEqual([])
    }
  })
  it('en FAQ mentions Gunther', () => {
    expect(getMuseumFaqs('en').some((f) => f.a.includes('Gunther'))).toBe(true)
  })
})
