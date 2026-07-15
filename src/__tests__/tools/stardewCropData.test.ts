import { describe, it, expect } from 'vitest'
import { CROPS } from '@/lib/tools/stardewCropData'

describe('stardewCropData', () => {
  it('has Melon as a 12-day summer crop', () => {
    const melon = CROPS.find((c) => c.nameEn === 'Melon')
    expect(melon).toMatchObject({ season: 'summer', days: 12 })
  })
  it('every crop has all 6 name languages', () => {
    for (const c of CROPS)
      for (const k of ['nameEn', 'nameZh', 'nameZhTW', 'nameJa', 'nameKo', 'nameDe'] as const)
        expect(c[k]).toBeTruthy()
  })
})
