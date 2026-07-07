import { describe, it, expect } from 'vitest'
import { filterVillagers, pickVil, VILLAGERS } from '@/components/tools/stardewVillagerData'

describe('villager filters', () => {
  const base = { marriageableOnly: false, season: 'all' as const, query: '', locale: 'en' }

  it('marriageableOnly returns exactly the 12 candidates', () => {
    const r = filterVillagers({ ...base, marriageableOnly: true })
    expect(r.length).toBe(12)
    expect(r.every((v) => v.marriageable)).toBe(true)
  })

  it('season filter narrows to that season', () => {
    const r = filterVillagers({ ...base, season: 'fall' })
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((v) => v.birthday.season === 'fall')).toBe(true)
  })

  it('query matches localized name (en)', () => {
    const r = filterVillagers({ ...base, query: 'abig' })
    expect(r.map((v) => v.key)).toContain('abigail')
  })

  it('query matches localized name (zh)', () => {
    const r = filterVillagers({ ...base, query: '阿比', locale: 'zh' })
    expect(r.map((v) => v.key)).toContain('abigail')
  })

  it('empty filter returns full cast', () => {
    expect(filterVillagers(base).length).toBe(VILCOUNT())
  })

  it('pickVil falls back to en for unknown locale', () => {
    expect(pickVil({ en: 'X', zh: 'x', zhTW: 'x', ja: 'x', ko: 'x', de: 'x' }, 'fr')).toBe('X')
  })
})

function VILCOUNT() { return VILLAGERS.length }
