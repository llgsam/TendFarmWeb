import { describe, it, expect } from 'vitest'
import {
  sprinklerOffsets, scarecrowOffsets, wateredTiles, protectedTiles, computeMetrics, key,
  type Placed,
} from '@/lib/tools/gridCoverage'

describe('sprinklerOffsets', () => {
  it('has the correct tile counts per tier (no nozzle)', () => {
    expect(sprinklerOffsets('basic', false).length).toBe(4)
    expect(sprinklerOffsets('quality', false).length).toBe(8)
    expect(sprinklerOffsets('iridium', false).length).toBe(24)
  })
  it('pressure nozzle bumps each tier one step', () => {
    expect(sprinklerOffsets('basic', true).length).toBe(8)
    expect(sprinklerOffsets('quality', true).length).toBe(24)
    expect(sprinklerOffsets('iridium', true).length).toBe(48)
  })
  it('never includes the center tile', () => {
    for (const t of ['basic', 'quality', 'iridium'] as const)
      for (const n of [false, true])
        expect(sprinklerOffsets(t, n).some(([dx, dy]) => dx === 0 && dy === 0)).toBe(false)
  })
  it('basic waters exactly the 4 orthogonal neighbors', () => {
    const s = new Set(sprinklerOffsets('basic', false).map(([dx, dy]) => `${dx},${dy}`))
    expect(s).toEqual(new Set(['0,-1', '0,1', '-1,0', '1,0']))
  })
  it('quality is the full 3x3 minus center', () => {
    const s = sprinklerOffsets('quality', false)
    expect(s.every(([dx, dy]) => Math.abs(dx) <= 1 && Math.abs(dy) <= 1)).toBe(true)
  })
})

describe('scarecrowOffsets', () => {
  it('matches the wiki protected-tile counts', () => {
    // VERIFY against the official wiki Scarecrow page; if the wiki says a
    // different number, change these expectations to the verified value.
    expect(scarecrowOffsets(false).length).toBe(248) // regular, radius 8
    expect(scarecrowOffsets(true).length).toBeGreaterThan(248) // deluxe, radius 16
  })
  it('is 8-fold symmetric (dx,dy)->(±dx,±dy),(±dy,±dx)', () => {
    const s = new Set(scarecrowOffsets(false).map(([dx, dy]) => `${dx},${dy}`))
    for (const [dx, dy] of scarecrowOffsets(false)) {
      expect(s.has(`${-dx},${dy}`)).toBe(true)
      expect(s.has(`${dy},${dx}`)).toBe(true)
    }
  })
})

describe('wateredTiles', () => {
  const dims = { w: 10, h: 10 }
  it('waters the 4 neighbors of a basic sprinkler, clipped to grid', () => {
    const w = wateredTiles([{ x: 0, y: 0, type: 'basic' }], dims)
    expect(w.has(key(1, 0))).toBe(true)
    expect(w.has(key(0, 1))).toBe(true)
    expect(w.has(key(-1, 0))).toBe(false) // off-grid clipped
    expect(w.has(key(0, 0))).toBe(false)  // center not watered
  })
  it('unions overlapping coverage without double count', () => {
    const w = wateredTiles([{ x: 2, y: 2, type: 'quality' }, { x: 3, y: 2, type: 'quality' }], dims)
    expect(w.has(key(2, 1))).toBe(true)
    // (3,1) covered by both — still present once
    expect([...w].filter((k) => k === key(3, 1)).length).toBe(1)
  })
})

describe('computeMetrics', () => {
  it('reports crop coverage correctly', () => {
    const placed: Placed[] = [
      { x: 5, y: 5, type: 'iridium' },
      { x: 5, y: 4, type: 'crop' }, // within iridium 5x5 -> watered
      { x: 0, y: 0, type: 'crop' }, // far away -> unwatered
    ]
    const m = computeMetrics(placed, { w: 12, h: 12 })
    expect(m.cropTotal).toBe(2)
    expect(m.cropsWatered).toBe(1)
    expect(m.cropsUnwatered).toBe(1)
    expect(m.counts.iridium).toBe(1)
    expect(m.coveragePct).toBe(50)
  })
  it('empty grid is all zeros, coveragePct 0', () => {
    const m = computeMetrics([], { w: 5, h: 5 })
    expect(m.cropTotal).toBe(0)
    expect(m.coveragePct).toBe(0)
    expect(m.wateredCount).toBe(0)
  })
})
