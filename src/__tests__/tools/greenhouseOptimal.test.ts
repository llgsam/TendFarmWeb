import { describe, it, expect } from 'vitest'
import { buildGreenhouseOptimal } from '@/components/tools/StardewGreenhousePlanner'
import { wateredTiles, computeMetrics, key } from '@/lib/tools/gridCoverage'

const GH_DIMS = { w: 10, h: 12 }

describe('greenhouse optimal layout', () => {
  it('places exactly 6 iridium sprinklers and crops on every other tile (120 total)', () => {
    const placed = buildGreenhouseOptimal()
    expect(placed).toHaveLength(120)
    const iridium = placed.filter((p) => p.type === 'iridium')
    const crops = placed.filter((p) => p.type === 'crop')
    expect(iridium).toHaveLength(6)
    expect(crops).toHaveLength(114)
  })

  it('one tile per cell — no overlaps', () => {
    const placed = buildGreenhouseOptimal()
    const cells = new Set(placed.map((p) => key(p.x, p.y)))
    expect(cells.size).toBe(120)
    for (const p of placed) {
      expect(p.x).toBeGreaterThanOrEqual(0)
      expect(p.x).toBeLessThan(GH_DIMS.w)
      expect(p.y).toBeGreaterThanOrEqual(0)
      expect(p.y).toBeLessThan(GH_DIMS.h)
    }
  })

  it('waters every one of the 114 crop tiles — zero dry crops (full coverage)', () => {
    const placed = buildGreenhouseOptimal()
    const metrics = computeMetrics(placed, GH_DIMS)
    expect(metrics.cropTotal).toBe(114)
    expect(metrics.cropsWatered).toBe(114)
    expect(metrics.cropsUnwatered).toBe(0)
    expect(metrics.coveragePct).toBe(100)
  })

  it('watered set covers all non-sprinkler tiles (114 of 120)', () => {
    const placed = buildGreenhouseOptimal()
    const watered = wateredTiles(placed, GH_DIMS)
    const sprinklers = new Set(
      placed.filter((p) => p.type === 'iridium').map((p) => key(p.x, p.y)),
    )
    let dry = 0
    for (let y = 0; y < GH_DIMS.h; y++)
      for (let x = 0; x < GH_DIMS.w; x++) {
        if (sprinklers.has(key(x, y))) continue
        if (!watered.has(key(x, y))) dry++
      }
    expect(dry).toBe(0)
  })
})
