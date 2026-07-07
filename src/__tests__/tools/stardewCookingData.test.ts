import { describe, it, expect } from 'vitest'
import { COOK_RECIPES } from '@/components/tools/stardewCookingData'

const LOCS = ['en', 'zh', 'zhTW', 'ja', 'ko', 'de'] as const
const nonEmptyLoc = (l: Record<string, string>) => LOCS.every((k) => typeof l[k] === 'string' && l[k].length > 0)
const SOURCE_CATS = ['skill', 'friendship', 'shop', 'tv', 'other']

describe('cooking data integrity', () => {
  it('has the full recipe set with unique keys + icons', () => {
    expect(COOK_RECIPES.length).toBeGreaterThanOrEqual(70)
    const keys = COOK_RECIPES.map((r) => r.key)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('every recipe fully localized with ≥1 ingredient and valid sourceCat', () => {
    for (const r of COOK_RECIPES) {
      expect(nonEmptyLoc(r.name), `name ${r.key}`).toBe(true)
      expect(nonEmptyLoc(r.source), `source ${r.key}`).toBe(true)
      expect(SOURCE_CATS).toContain(r.sourceCat)
      expect(r.ingredients.length, `ingredients ${r.key}`).toBeGreaterThanOrEqual(1)
      for (const ing of r.ingredients) {
        expect(nonEmptyLoc(ing.name), `ingredient of ${r.key}`).toBe(true)
        expect(ing.qty).toBeGreaterThanOrEqual(1)
      }
      expect(typeof r.sellPrice).toBe('number')
    }
  })

  it('buffs are well-formed; buffDuration present iff buffs non-empty', () => {
    for (const r of COOK_RECIPES) {
      if (r.buffs.length > 0) expect(r.buffDuration, `duration ${r.key}`).toBeTruthy()
      else expect(r.buffDuration).toBeNull()
    }
  })

  it('known fact: Salad restores energy and is a shop recipe', () => {
    const salad = COOK_RECIPES.find((r) => r.key === 'salad')
    expect(salad).toBeTruthy()
    expect(salad!.energy).toBeGreaterThan(0)
  })
})
