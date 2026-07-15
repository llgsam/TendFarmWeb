import { describe, it, expect } from 'vitest'
import { FESTIVALS } from '@/lib/tools/stardewCalendarData'

describe('stardewCalendarData', () => {
  it('includes the Egg Festival on spring 13', () => {
    const egg = FESTIVALS.find((f) => f.season === 'spring' && f.days.includes(13))
    expect(egg?.name.en).toBe('Egg Festival')
  })
  it('every festival has all 6 languages', () => {
    for (const f of FESTIVALS)
      for (const k of ['en', 'zh', 'zhTW', 'ja', 'ko', 'de'] as const)
        expect(f.name[k]).toBeTruthy()
  })
})
