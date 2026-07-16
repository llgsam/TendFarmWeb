import { describe, it, expect } from 'vitest'
import { toolSlugs } from '@/app/sitemap'

describe('sitemap toolSlugs', () => {
  const slugs = toolSlugs()

  it('reads tool routes from disk (non-empty)', () => {
    expect(slugs.length).toBeGreaterThan(5)
  })

  // Regression: a hardcoded list once omitted this page entirely, so Google
  // never saw the greenhouse tool.
  it('includes every shipped tool, including stardew-greenhouse', () => {
    for (const s of [
      'hay-day', 'stardew', 'stardew-calendar', 'stardew-gifts', 'stardew-fish',
      'stardew-bundles', 'stardew-museum', 'stardew-villagers', 'stardew-cooking',
      'stardew-sprinklers', 'stardew-greenhouse', 'stardew-companion',
    ]) {
      expect(slugs).toContain(s)
    }
  })

  // tools/quiz only redirects to /quizzes/farm-personality. Redirect URLs must
  // never enter the sitemap — Google reports them as "page with redirect".
  it('excludes redirect-only routes', () => {
    expect(slugs).not.toContain('quiz')
  })

  it('excludes the tools index file itself', () => {
    expect(slugs).not.toContain('page.tsx')
  })
})
