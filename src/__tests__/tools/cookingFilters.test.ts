import { describe, it, expect } from 'vitest'
import { filterRecipes, allIngredients, pickCook } from '@/components/tools/stardewCookingData'
import { COOK_RECIPES } from '@/components/tools/stardewCookingData'

const base = { ingredientKey: '', buff: 'all' as const, sourceCat: 'all' as const, query: '', locale: 'en' }

describe('cooking filters', () => {
  it('empty filter returns all recipes', () => {
    expect(filterRecipes(base).length).toBe(COOK_RECIPES.length)
  })

  it('ingredient reverse-lookup returns only recipes using that ingredient', () => {
    const ingKey = COOK_RECIPES[0].ingredients[0].key
    const r = filterRecipes({ ...base, ingredientKey: ingKey })
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((x) => x.ingredients.some((i) => i.key === ingKey))).toBe(true)
  })

  it('buff filter returns only recipes granting that buff', () => {
    const withBuff = COOK_RECIPES.find((r) => r.buffs.length > 0)
    if (withBuff) {
      const type = withBuff.buffs[0].type
      const r = filterRecipes({ ...base, buff: type })
      expect(r.every((x) => x.buffs.some((b) => b.type === type))).toBe(true)
      expect(r.map((x) => x.key)).toContain(withBuff.key)
    }
  })

  it('sourceCat filter narrows to that bucket', () => {
    const r = filterRecipes({ ...base, sourceCat: 'skill' })
    expect(r.every((x) => x.sourceCat === 'skill')).toBe(true)
  })

  it('query matches localized recipe name', () => {
    const first = COOK_RECIPES[0]
    const r = filterRecipes({ ...base, query: first.name.en.slice(0, 4).toLowerCase() })
    expect(r.map((x) => x.key)).toContain(first.key)
  })

  it('allIngredients is unique and sorted', () => {
    const ings = allIngredients('en')
    expect(new Set(ings.map((i) => i.key)).size).toBe(ings.length)
    const names = ings.map((i) => i.name)
    expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names)
  })

  it('pickCook falls back to en', () => {
    expect(pickCook({ en: 'X', zh: 'x', zhTW: 'x', ja: 'x', ko: 'x', de: 'x' }, 'fr')).toBe('X')
  })
})
