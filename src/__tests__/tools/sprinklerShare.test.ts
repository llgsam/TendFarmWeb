import { describe, it, expect } from 'vitest'
import { encodeLayout, decodeLayout } from '@/lib/tools/sprinklerShare'

const layout = {
  dims: { w: 20, h: 20 },
  placed: [
    { x: 2, y: 2, type: 'iridium' as const, nozzle: true },
    { x: 3, y: 5, type: 'scarecrow' as const },
    { x: 4, y: 4, type: 'crop' as const },
  ],
}

describe('sprinkler share codec', () => {
  it('round-trips a layout', () => {
    const decoded = decodeLayout(encodeLayout(layout))
    expect(decoded).toEqual(layout)
  })
  it('produces a URL-safe token (no +/=/space)', () => {
    expect(encodeLayout(layout)).toMatch(/^[A-Za-z0-9_-]+$/)
  })
  it('returns null for malformed input', () => {
    expect(decodeLayout('!!!not-base64!!!')).toBeNull()
    expect(decodeLayout('')).toBeNull()
    expect(decodeLayout('YWJj')).toBeNull() // valid base64 but not a Layout
  })
  it('rejects out-of-range dims', () => {
    const bad = encodeLayout({ dims: { w: 9999, h: 1 }, placed: [] })
    expect(decodeLayout(bad)).toBeNull()
  })
})
