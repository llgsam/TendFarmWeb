import { describe, it, expect } from 'vitest'
import { VILLAGERS, type Villager } from '@/components/tools/stardewVillagerData'

const LOCS = ['en', 'zh', 'zhTW', 'ja', 'ko', 'de'] as const
const nonEmptyLoc = (l: Record<string, string>) => LOCS.every((k) => typeof l[k] === 'string' && l[k].length > 0)

describe('villager data integrity', () => {
  it('has the full cast with unique keys', () => {
    expect(VILLAGERS.length).toBeGreaterThanOrEqual(30)
    const keys = VILLAGERS.map((v) => v.key)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('has exactly 12 marriage candidates', () => {
    expect(VILLAGERS.filter((v) => v.marriageable).length).toBe(12)
  })

  it('every villager name + region are fully localized', () => {
    for (const v of VILLAGERS) {
      expect(nonEmptyLoc(v.name), `name ${v.key}`).toBe(true)
      expect(nonEmptyLoc(v.region), `region ${v.key}`).toBe(true)
    }
  })

  it('valid birthdays', () => {
    for (const v of VILLAGERS) {
      expect(['spring', 'summer', 'fall', 'winter']).toContain(v.birthday.season)
      expect(v.birthday.day).toBeGreaterThanOrEqual(1)
      expect(v.birthday.day).toBeLessThanOrEqual(28)
    }
  })

  it('marriage candidates carry decision fields + loved gifts; icons unique', () => {
    const icons = VILLAGERS.map((v) => v.icon)
    expect(new Set(icons).size).toBe(icons.length)
    for (const v of VILLAGERS.filter((x) => x.marriageable)) {
      expect(v.lovedGifts.length).toBeGreaterThanOrEqual(3)
      expect(v.personality && nonEmptyLoc(v.personality), `personality ${v.key}`).toBe(true)
      expect(v.spousePerk && nonEmptyLoc(v.spousePerk), `spousePerk ${v.key}`).toBe(true)
      expect(v.heartEventHint && nonEmptyLoc(v.heartEventHint), `heartEventHint ${v.key}`).toBe(true)
    }
  })

  it('known facts: Abigail is a Fall 13 marriage candidate', () => {
    const abby = VILLAGERS.find((v) => v.key === 'abigail')
    expect(abby?.marriageable).toBe(true)
    expect(abby?.birthday).toEqual({ season: 'fall', day: 13 })
  })
})
