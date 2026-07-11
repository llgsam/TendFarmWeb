import { describe, it, expect } from 'vitest'
import { detectGames, GAMES, buildArticleHandoff } from '@/lib/article-ai'

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

describe('buildArticleHandoff', () => {
  const post = {
    title: 'Hay Day vs Stardew Valley',
    description: 'A comparison of two farming games.',
    tags: ['comparison'],
    contentHtml: '<p>Stardew Valley and Hay Day</p>',
  }

  it('names detected games (max 3) and includes their tools', () => {
    const { prompt, tools } = buildArticleHandoff(post, 'en')
    expect(prompt).toContain('Stardew Valley')
    expect(prompt).toContain('Hay Day')
    expect(tools.map((t) => t.href)).toContain('tools/stardew')
    expect(tools.map((t) => t.href)).toContain('tools/hay-day')
  })

  it('names at most 3 detected games in the prompt clause', () => {
    const many = {
      title: 'The best farming games ranked',
      description: '',
      tags: [] as string[],
      contentHtml: 'Stardew Valley, Hay Day, Palia, Coral Island and Animal Crossing are all here.',
    }
    const { prompt } = buildArticleHandoff(many, 'en')
    // Detection order (GAMES order) → first 3 named: Stardew, Hay Day, Palia
    expect(prompt).toContain('Stardew Valley')
    expect(prompt).toContain('Hay Day')
    expect(prompt).toContain('Palia')
    expect(prompt).not.toContain('Coral Island')
    expect(prompt).not.toContain('Animal Crossing')
  })

  it('localizes the prompt to zh', () => {
    const { prompt } = buildArticleHandoff(post, 'zh')
    expect(prompt).toContain('帮我决定哪款最适合我')
    expect(prompt).toContain('《Hay Day vs Stardew Valley》')
  })

  it('falls back to en for unknown locale', () => {
    const { prompt } = buildArticleHandoff(post, 'xx')
    expect(prompt).toContain('Help me decide')
  })

  it('omits the games clause and tools when no game detected', () => {
    const none = { title: 'Best cozy games', description: 'Nice list.', tags: [], contentHtml: '' }
    const { prompt, tools } = buildArticleHandoff(none, 'en')
    expect(tools).toEqual([])
    expect(prompt).toContain('Help me decide')
    expect(prompt).not.toContain('It compares')
  })

  it('keeps prompt under the length cap by truncating description', () => {
    const long = { title: 'T', description: 'x'.repeat(5000), tags: [], contentHtml: '' }
    const { prompt } = buildArticleHandoff(long, 'en')
    expect(prompt.length).toBeLessThanOrEqual(1000)
  })

  it('dedupes tool hrefs', () => {
    const { tools } = buildArticleHandoff(post, 'en')
    const hrefs = tools.map((t) => t.href)
    expect(hrefs).toEqual([...new Set(hrefs)])
  })

  it('collects tools from all detected games, not only the 3 named ones', () => {
    const post = {
      title: 'Farming games compared',
      description: '',
      tags: [] as string[],
      // detection order: palia(no tools), coral-island(no tools), stardew(tools), hay-day(tools)
      contentHtml: 'Palia and Coral Island and Animal Crossing, plus Stardew Valley and Hay Day.',
    }
    const { tools } = buildArticleHandoff(post, 'en')
    const hrefs = tools.map((t) => t.href)
    expect(hrefs).toContain('tools/stardew')
    expect(hrefs).toContain('tools/hay-day')
  })

  it('has no double spaces even when description is empty', () => {
    const post = { title: 'Best farming games', description: '', tags: [] as string[], contentHtml: '' }
    const { prompt } = buildArticleHandoff(post, 'en')
    expect(prompt).not.toMatch(/ {2,}/)
  })

  it.each(['zh', 'zh-TW', 'ja', 'ko', 'de', 'en'])('builds a non-empty localized prompt containing the title for locale %s', (locale) => {
    const post = {
      title: 'Hay Day vs Stardew Valley',
      description: 'A comparison.',
      tags: [] as string[],
      contentHtml: 'Stardew Valley and Hay Day',
    }
    const { prompt } = buildArticleHandoff(post, locale)
    expect(prompt.length).toBeGreaterThan(0)
    expect(prompt).toContain('Hay Day vs Stardew Valley')
    expect(prompt.length).toBeLessThanOrEqual(1000)
  })
})
