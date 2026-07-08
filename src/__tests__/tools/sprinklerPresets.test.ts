import { describe, it, expect } from 'vitest'
import { PRESETS, applyPreset } from '@/lib/tools/sprinklerPresets'
import { wateredTiles, key } from '@/lib/tools/gridCoverage'

describe('sprinkler presets', () => {
  it('has at least 3 presets', () => {
    expect(PRESETS.length).toBeGreaterThanOrEqual(3)
  })
  it('each preset waters ~100% of interior non-sprinkler tiles on a 20x20', () => {
    const dims = { w: 20, h: 20 }
    for (const preset of PRESETS) {
      const placed = applyPreset(preset.id, dims)
      const watered = wateredTiles(placed, dims)
      const sprinklerSet = new Set(placed.map((p) => key(p.x, p.y)))
      // interior = strip a margin equal to the preset step so edge clipping doesn't count
      const m = preset.step
      let interior = 0, dry = 0
      for (let y = m; y < dims.h - m; y++)
        for (let x = m; x < dims.w - m; x++) {
          if (sprinklerSet.has(key(x, y))) continue
          interior++
          if (!watered.has(key(x, y))) dry++
        }
      expect(interior).toBeGreaterThan(0)
      expect(dry).toBe(0) // perfect interior coverage
    }
  })
})
