import { describe, it, expect } from 'vitest'
import { detectGames, GAMES } from '@/lib/article-ai'

const base = { title: '', description: '', tags: [] as string[], contentHtml: '' }

describe('detectGames', () => {
  it('detects a game named in the title', () => {
    expect(detectGames({ ...base, title: 'Hay Day vs Stardew Valley' }))
      .toEqual(['stardew', 'hay-day'].filter((id) => ['stardew', 'hay-day'].includes(id)))
  })

  it('is case-insensitive and scans body html', () => {
    expect(detectGames({ ...base, contentHtml: '<p>we love stardew valley here</p>' }))
      .toContain('stardew')
  })

  it('detects localized aliases', () => {
    expect(detectGames({ ...base, title: '星露谷物语最佳作物' })).toContain('stardew')
  })

  it('detects games from tags', () => {
    expect(detectGames({ ...base, tags: ['animal-crossing', 'comparison'] })).toContain('animal-crossing')
  })

  it('returns [] when no known game appears', () => {
    expect(detectGames({ ...base, title: 'Best cozy games for autumn' })).toEqual([])
  })

  it('dedupes and preserves GAMES order', () => {
    const ids = detectGames({ ...base, title: 'Palia', contentHtml: 'Stardew Valley and Palia and stardew valley' })
    expect(ids).toEqual([...new Set(ids)])
    expect(ids.indexOf('stardew')).toBeLessThan(ids.indexOf('palia'))
  })

  it('every GAMES entry has a stable id and en display', () => {
    for (const g of GAMES) {
      expect(g.id).toMatch(/^[a-z-]+$/)
      expect(g.display.en.length).toBeGreaterThan(0)
    }
  })
})
