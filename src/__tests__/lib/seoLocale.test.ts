import { describe, it, expect } from 'vitest'
import { pickLoc, SEASONS, type LocLabel } from '@/lib/tools/seo/locale'

const sample: LocLabel = { en: 'E', zh: 'Z', zhTW: 'T', ja: 'J', ko: 'K', de: 'D' }

describe('pickLoc', () => {
  it('returns the matching locale field for each supported locale', () => {
    expect(pickLoc(sample, 'en')).toBe('E')
    expect(pickLoc(sample, 'zh')).toBe('Z')
    expect(pickLoc(sample, 'zh-TW')).toBe('T')
    expect(pickLoc(sample, 'ja')).toBe('J')
    expect(pickLoc(sample, 'ko')).toBe('K')
    expect(pickLoc(sample, 'de')).toBe('D')
  })
  it('falls back to en for an unknown locale', () => {
    expect(pickLoc(sample, 'xx')).toBe('E')
  })
})

describe('SEASONS', () => {
  it('covers all four seasons with all six locale labels', () => {
    for (const key of ['spring', 'summer', 'fall', 'winter'] as const) {
      const label = SEASONS[key]
      for (const loc of ['en', 'zh', 'zhTW', 'ja', 'ko', 'de'] as const) {
        expect(label[loc].length).toBeGreaterThan(0)
      }
    }
  })
  it('localizes fall correctly (en/zh)', () => {
    expect(pickLoc(SEASONS.fall, 'en')).toBe('Fall')
    expect(pickLoc(SEASONS.fall, 'zh')).toBe('秋')
  })
})
