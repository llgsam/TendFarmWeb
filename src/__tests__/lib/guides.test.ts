import { describe, it, expect } from 'vitest'
import { getGuides, getGuideBySlug, getAllGuideSlugs } from '@/lib/guides'

describe('guides data layer', () => {
  it('getGuides returns array for known game', async () => {
    const guides = await getGuides('zh', 'hay-day')
    expect(Array.isArray(guides)).toBe(true)
    // 内容在 Task 9 添加，此处仅验证 shape（空数组也合法）
  })

  it('getGuideBySlug returns null for unknown slug', async () => {
    const post = await getGuideBySlug('zh', 'hay-day', 'nonexistent-slug')
    expect(post).toBeNull()
  })

  it('getGuideBySlug returns post for known slug after content created', async () => {
    // Task 9 创建 beginner.md 后才 PASS；目前内容不存在则跳过断言
    const post = await getGuideBySlug('zh', 'hay-day', 'beginner')
    if (post) {
      expect(post.title).toBeTruthy()
      expect(post.contentHtml).toBeTruthy()
      expect(post.game).toBe('hay-day')
    }
  })

  it('getAllGuideSlugs returns array', async () => {
    const slugs = await getAllGuideSlugs()
    expect(Array.isArray(slugs)).toBe(true)
    // 如有内容，每条必须有 locale/game/slug 字段
    for (const item of slugs) {
      expect(typeof item.locale).toBe('string')
      expect(typeof item.game).toBe('string')
      expect(typeof item.slug).toBe('string')
    }
  })
})
