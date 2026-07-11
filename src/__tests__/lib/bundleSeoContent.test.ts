import { describe, it, expect } from 'vitest'
import { bundleSummary, getBundleFaqs } from '@/lib/tools/seo/bundleSeoContent'
import { BUNDLE_ROOMS } from '@/components/tools/stardewBundleData'

const bundleCount = BUNDLE_ROOMS.reduce((n, r) => n + r.bundles.length, 0)

describe('bundleSummary', () => {
  it('states the real bundle count for en', () => {
    expect(bundleSummary('en')).toContain(String(bundleCount))
  })
  it('states the room count', () => {
    expect(bundleSummary('en')).toContain(String(BUNDLE_ROOMS.length))
  })
  it('uses the zh template', () => {
    expect(bundleSummary('zh')).toContain('社区中心')
  })
  it('falls back to en for unknown locale', () => {
    expect(bundleSummary('xx')).toContain(String(bundleCount))
  })
})

describe('getBundleFaqs', () => {
  it('returns 4 authored FAQs for en and zh', () => {
    expect(getBundleFaqs('en')).toHaveLength(4)
    expect(getBundleFaqs('zh')).toHaveLength(4)
    for (const f of [...getBundleFaqs('en'), ...getBundleFaqs('zh')]) {
      expect(f.q.length).toBeGreaterThan(0)
      expect(f.a.length).toBeGreaterThan(0)
    }
  })
  it('returns [] for locales without authored FAQs', () => {
    for (const loc of ['zh-TW', 'ja', 'ko', 'de', 'xx']) {
      expect(getBundleFaqs(loc)).toEqual([])
    }
  })
  it('en FAQ mentions the JojaMart alternative', () => {
    expect(getBundleFaqs('en').some((f) => f.a.includes('JojaMart'))).toBe(true)
  })
})
