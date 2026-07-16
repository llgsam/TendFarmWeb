import { describe, it, expect } from 'vitest'
import { normalizeItemName, lookupItem, searchItems } from '@/lib/tools/stardewItemLookup'

describe('normalizeItemName', () => {
  it('is case/space/underscore/hyphen insensitive', () => {
    const k = normalizeItemName('Golden Pumpkin')
    expect(normalizeItemName('golden pumpkin')).toBe(k)
    expect(normalizeItemName('Golden_Pumpkin')).toBe(k)
    expect(normalizeItemName('golden-pumpkin')).toBe(k)
  })
  it("strips annotation parentheses like (+250) but keeps descriptive ones", () => {
    // "Stardrop Tea (+250)" is the same item as "Stardrop Tea"
    expect(normalizeItemName('Stardrop Tea (+250)')).toBe(normalizeItemName('Stardrop Tea'))
    // but the two Strange Dolls are DIFFERENT items and must not collide
    expect(normalizeItemName('Strange Doll (green)')).not.toBe(normalizeItemName('Strange Doll (yellow)'))
  })
})

describe('lookupItem — cross-dataset joins', () => {
  it('joins gifts + museum for Amethyst', () => {
    const it_ = lookupItem('Amethyst')
    expect(it_).toBeTruthy()
    expect(it_!.lovedBy.map((v) => v.en)).toContain('Abigail')
    expect(it_!.museum?.category).toBe('gem')
  })

  it('joins gifts + cooking for Pumpkin', () => {
    const it_ = lookupItem('Pumpkin')
    expect(it_).toBeTruthy()
    expect(it_!.lovedBy.map((v) => v.en)).toContain('Abigail')
    const recipes = it_!.recipes.map((r) => r.en)
    expect(recipes).toContain('Pumpkin Soup')
    expect(recipes).toContain('Pumpkin Pie')
  })

  it('resolves bundles for Grape (Summer Foraging Bundle)', () => {
    const it_ = lookupItem('Grape')
    expect(it_).toBeTruthy()
    expect(it_!.bundles.map((b) => b.bundle.en)).toContain('Summer Foraging Bundle')
    expect(it_!.bundles.find((b) => b.bundle.en === 'Summer Foraging Bundle')?.room.en).toBe('Crafts Room')
  })

  it('flags universal loves', () => {
    expect(lookupItem('Prismatic Shard')?.universalLove).toBe(true)
    expect(lookupItem('Pumpkin')?.universalLove).toBe(false)
  })

  it('finds an item whose source name carries an annotation', () => {
    expect(lookupItem('Stardrop Tea')).toBeTruthy()
  })

  it('keeps the two Strange Dolls as distinct items', () => {
    const green = lookupItem('Strange Doll (green)')
    const yellow = lookupItem('Strange Doll (yellow)')
    expect(green).toBeTruthy()
    expect(yellow).toBeTruthy()
    expect(green!.key).not.toBe(yellow!.key)
  })

  it('returns null for an unknown item', () => {
    expect(lookupItem('Definitely Not A Real Item 12345')).toBeNull()
  })

  it('every indexed item carries all 6 languages', () => {
    const sample = ['Amethyst', 'Pumpkin', 'Grape']
    for (const q of sample) {
      const f = lookupItem(q)!
      for (const k of ['en', 'zh', 'zhTW', 'ja', 'ko', 'de'] as const) expect(f.name[k]).toBeTruthy()
    }
  })
})

describe('searchItems', () => {
  it('matches by partial English name', () => {
    const hits = searchItems('pump', 'en')
    expect(hits.map((h) => h.name.en)).toContain('Pumpkin')
  })

  it('matches by localized name', () => {
    const hits = searchItems('紫水晶', 'zh') // Amethyst in Chinese
    expect(hits.map((h) => h.name.en)).toContain('Amethyst')
  })

  it('ranks an exact match first', () => {
    const hits = searchItems('Pumpkin', 'en')
    expect(hits[0].name.en).toBe('Pumpkin')
  })

  it('respects the limit and returns [] for no match', () => {
    expect(searchItems('a', 'en', 3).length).toBeLessThanOrEqual(3)
    expect(searchItems('zzzzzznotathing', 'en')).toEqual([])
  })
})
