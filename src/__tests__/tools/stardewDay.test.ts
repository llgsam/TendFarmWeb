import { describe, it, expect } from 'vitest'
import { daySummary, seasonWindow, nextDay } from '@/lib/tools/stardewDay'

describe('stardewDay.daySummary', () => {
  it("returns Abigail with her loved gifts on fall 13", () => {
    const s = daySummary('fall', 13)
    const abby = s.birthdays.find((b) => b.villager.en === 'Abigail')
    expect(abby).toBeTruthy()
    const loveNames = abby!.loves.map((l) => l.en)
    expect(loveNames).toContain('Amethyst')
    expect(loveNames).toContain('Pumpkin')
  })
  it('returns the Egg Festival on spring 13', () => {
    expect(daySummary('spring', 13).festivalToday?.name.en).toBe('Egg Festival')
  })
  it('has no festival on a plain day', () => {
    expect(daySummary('spring', 2).festivalToday).toBeNull()
  })
  it("tomorrow after spring 28 is summer day 1's birthdays", () => {
    const wrap = daySummary('spring', 28)
    const summer1 = daySummary('summer', 1)
    expect(wrap.tomorrowBirthdays.map((b) => b.villager.en).sort())
      .toEqual(summer1.birthdays.map((b) => b.villager.en).sort())
  })
})

describe('stardewDay.seasonWindow', () => {
  it('includes Melon early in summer but not late', () => {
    expect(seasonWindow('summer', 1).plantableCrops.some((c) => c.nameEn === 'Melon')).toBe(true)
    expect(seasonWindow('summer', 20).plantableCrops.some((c) => c.nameEn === 'Melon')).toBe(false) // 12 > 28-20=8
  })
  it('lists at least one fish for every season', () => {
    for (const s of ['spring', 'summer', 'fall', 'winter'] as const)
      expect(seasonWindow(s, 1).fish.length).toBeGreaterThan(0)
  })
})

describe('stardewDay.nextDay', () => {
  it('advances within a season', () => {
    expect(nextDay('spring', 5)).toEqual({ season: 'spring', day: 6 })
  })
  it('wraps 28 to the next season day 1', () => {
    expect(nextDay('winter', 28)).toEqual({ season: 'spring', day: 1 })
  })
})
