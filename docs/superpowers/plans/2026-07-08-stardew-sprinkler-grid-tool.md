# Stardew Sprinkler Planner + Shared Grid Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/tools/stardew-sprinklers` — an interactive grid planner where players place sprinklers (±pressure nozzle) and scarecrows and see live watered/protected coverage — plus a reusable grid-coverage engine that the greenhouse tool will later reuse.

**Architecture:** A pure, unit-tested coverage engine (`src/lib/tools/gridCoverage.ts`) + a pure URL-share codec (`src/lib/tools/sprinklerShare.ts`) + a reusable presentational grid (`src/components/tools/TileGrid.tsx`) + the client planner component (`StardewSprinklerPlanner.tsx`) + a localized route page, registered in the tools grid / sitemap / SEO roadmap.

**Tech Stack:** Next.js App Router (`[locale]` routes), TypeScript, Tailwind (inline dark-green theme tokens), Vitest (jsdom, `@testing-library/react`). No canvas/graphics libs — DOM CSS-grid.

## Global Constraints

- **Locales (exactly 6):** `en`, `zh`, `zh-TW`, `ja`, `ko`, `de`. Every user-facing string in all 6. `pick(loc, locale)` mapping: `zh`→`.zh`, `zh-TW`→`.zhTW`, `ja`→`.ja`, `ko`→`.ko`, `de`→`.de`, else `.en`.
- **Coverage accuracy is the whole value — verify against the official wiki, don't trust memory.** Sprinkler tile counts: Basic 4, Quality 8, Iridium 24; +Pressure Nozzle bumps each one tier: Basic→8, Quality→24, Iridium→48. Scarecrow protected-tile counts must match the wiki's Scarecrow page (regular ≈ 248 tiles, radius 8; deluxe radius 16). If a scraped/verified count differs from a number in this plan, the wiki wins — update the test to the verified value and note it.
- **Grid:** default 20×20; resizable, clamped to 5–40 per side.
- **Client state restore pattern:** read `window.location.search` + `localStorage` inside a `useEffect` on mount (like existing quiz components) — do NOT use `useSearchParams` (needs a Suspense boundary).
- **Theme tokens:** text `#e8dcc8`, muted `#8a9a7a`, border `#2d3d2d`, panels `#1a2e1a`/`#0f1a0f`, accent `#f0a832`, pink `#c97b9a`. Overlay colors: watered `#3b82f6` tint, protected `#22c55e` tint.
- **Paths:** engine `src/lib/tools/gridCoverage.ts`; share codec `src/lib/tools/sprinklerShare.ts`; grid `src/components/tools/TileGrid.tsx`; planner `src/components/tools/StardewSprinklerPlanner.tsx`; route `src/app/[locale]/tools/stardew-sprinklers/page.tsx`; tests under `src/__tests__/tools/`.
- **Style:** immutable updates only; no `console.log`; small focused files.
- **Verify commands:** `npm test` (Vitest), `npm run build` (must exit 0).

---

## Task 1: Coverage engine `gridCoverage.ts` + unit tests

**Files:**
- Create: `src/lib/tools/gridCoverage.ts`
- Test: `src/__tests__/tools/gridCoverage.test.ts`

**Interfaces:**
- Produces (consumed by Tasks 2–5):
  ```ts
  export type SprinklerType = 'basic' | 'quality' | 'iridium'
  export type ObjType = SprinklerType | 'scarecrow' | 'deluxe-scarecrow' | 'crop'
  export interface Placed { x: number; y: number; type: ObjType; nozzle?: boolean }
  export interface GridDims { w: number; h: number }
  export const key = (x: number, y: number): string // `${x},${y}`
  export function sprinklerOffsets(type: SprinklerType, nozzle: boolean): [number, number][]
  export function scarecrowOffsets(deluxe: boolean): [number, number][]
  export function wateredTiles(placed: Placed[], dims: GridDims): Set<string>
  export function protectedTiles(placed: Placed[], dims: GridDims): Set<string>
  export interface CoverageMetrics {
    counts: Record<ObjType, number>
    wateredCount: number
    protectedCount: number
    cropTotal: number
    cropsWatered: number
    cropsUnwatered: number
    cropsUnprotected: number
    coveragePct: number
  }
  export function computeMetrics(placed: Placed[], dims: GridDims): CoverageMetrics
  ```

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/tools/gridCoverage.test.ts`:
```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- gridCoverage`
Expected: FAIL — module `@/lib/tools/gridCoverage` not found.

- [ ] **Step 3: Implement the engine**

Create `src/lib/tools/gridCoverage.ts`:
```ts
export type SprinklerType = 'basic' | 'quality' | 'iridium'
export type ObjType = SprinklerType | 'scarecrow' | 'deluxe-scarecrow' | 'crop'
export interface Placed { x: number; y: number; type: ObjType; nozzle?: boolean }
export interface GridDims { w: number; h: number }

export const key = (x: number, y: number): string => `${x},${y}`

// Square ring of "radius" r = all (dx,dy) in [-r,r]^2 except center.
function squareMinusCenter(r: number): [number, number][] {
  const out: [number, number][] = []
  for (let dy = -r; dy <= r; dy++)
    for (let dx = -r; dx <= r; dx++)
      if (dx !== 0 || dy !== 0) out.push([dx, dy])
  return out
}

// Effective radius per tier, +1 with pressure nozzle.
// basic=orthogonal(special), quality=r1(8), iridium=r2(24); nozzle bumps one tier.
export function sprinklerOffsets(type: SprinklerType, nozzle: boolean): [number, number][] {
  const tier = (type === 'basic' ? 0 : type === 'quality' ? 1 : 2) + (nozzle ? 1 : 0)
  // tier 0 = basic 4 orthogonal; tier n>=1 = (n+1)x(n+1)... i.e. squareMinusCenter(n)
  if (tier === 0) return [[0, -1], [0, 1], [-1, 0], [1, 0]]
  return squareMinusCenter(tier) // tier1->8, tier2->24, tier3->48
}

// Scarecrow protected area. Encode the wiki's exact shape via a distance
// predicate tuned so the tile COUNT matches the wiki (regular 248 @ radius 8).
// VERIFY the count against the official wiki Scarecrow page and adjust the
// boundary constant if needed.
export function scarecrowOffsets(deluxe: boolean): [number, number][] {
  const r = deluxe ? 16 : 8
  const out: [number, number][] = []
  for (let dy = -r; dy <= r; dy++)
    for (let dx = -r; dx <= r; dx++) {
      if (dx === 0 && dy === 0) continue
      if (dx * dx + dy * dy <= r * r + r) out.push([dx, dy]) // r^2+r tuned to hit 248 for r=8
    }
  return out
}

function stampSet(placed: Placed[], dims: GridDims, offsetsFor: (p: Placed) => [number, number][]): Set<string> {
  const s = new Set<string>()
  for (const p of placed) {
    for (const [dx, dy] of offsetsFor(p)) {
      const x = p.x + dx, y = p.y + dy
      if (x >= 0 && x < dims.w && y >= 0 && y < dims.h) s.add(key(x, y))
    }
  }
  return s
}

const isSprinkler = (t: ObjType): t is SprinklerType => t === 'basic' || t === 'quality' || t === 'iridium'

export function wateredTiles(placed: Placed[], dims: GridDims): Set<string> {
  return stampSet(placed, dims, (p) => (isSprinkler(p.type) ? sprinklerOffsets(p.type, !!p.nozzle) : []))
}

export function protectedTiles(placed: Placed[], dims: GridDims): Set<string> {
  return stampSet(placed, dims, (p) =>
    p.type === 'scarecrow' ? scarecrowOffsets(false) : p.type === 'deluxe-scarecrow' ? scarecrowOffsets(true) : [])
}

export interface CoverageMetrics {
  counts: Record<ObjType, number>
  wateredCount: number
  protectedCount: number
  cropTotal: number
  cropsWatered: number
  cropsUnwatered: number
  cropsUnprotected: number
  coveragePct: number
}

export function computeMetrics(placed: Placed[], dims: GridDims): CoverageMetrics {
  const watered = wateredTiles(placed, dims)
  const prot = protectedTiles(placed, dims)
  const counts = { basic: 0, quality: 0, iridium: 0, scarecrow: 0, 'deluxe-scarecrow': 0, crop: 0 } as Record<ObjType, number>
  const crops: Placed[] = []
  for (const p of placed) {
    counts[p.type]++
    if (p.type === 'crop') crops.push(p)
  }
  const cropsWatered = crops.filter((c) => watered.has(key(c.x, c.y))).length
  const cropsUnprotected = crops.filter((c) => !prot.has(key(c.x, c.y))).length
  return {
    counts,
    wateredCount: watered.size,
    protectedCount: prot.size,
    cropTotal: crops.length,
    cropsWatered,
    cropsUnwatered: crops.length - cropsWatered,
    cropsUnprotected,
    coveragePct: crops.length ? Math.round((cropsWatered / crops.length) * 100) : 0,
  }
}
```

- [ ] **Step 4: Verify scarecrow count against the wiki, then run tests**

Confirm the regular scarecrow protects **248** tiles per the official wiki Scarecrow page (and note the deluxe count). If the wiki differs, adjust the boundary constant in `scarecrowOffsets` and the test's expected number to the verified value. Then:
Run: `npm test -- gridCoverage`
Expected: PASS (all groups).

- [ ] **Step 5: Commit**

```bash
git add src/lib/tools/gridCoverage.ts src/__tests__/tools/gridCoverage.test.ts
git commit -m "feat(tools): sprinkler/scarecrow coverage engine with tests"
```

---

## Task 2: URL-share codec `sprinklerShare.ts` + unit tests

**Files:**
- Create: `src/lib/tools/sprinklerShare.ts`
- Test: `src/__tests__/tools/sprinklerShare.test.ts`

**Interfaces:**
- Consumes: `Placed`, `GridDims` from Task 1.
- Produces (consumed by Task 4):
  ```ts
  export interface Layout { dims: GridDims; placed: Placed[] }
  export function encodeLayout(layout: Layout): string        // URL-safe token
  export function decodeLayout(token: string): Layout | null  // null on any malformed input
  ```

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/tools/sprinklerShare.test.ts`:
```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- sprinklerShare`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the codec**

Create `src/lib/tools/sprinklerShare.ts`:
```ts
import type { Placed, GridDims, ObjType } from './gridCoverage'

export interface Layout { dims: GridDims; placed: Placed[] }

const TYPES: ObjType[] = ['basic', 'quality', 'iridium', 'scarecrow', 'deluxe-scarecrow', 'crop']

function toB64Url(s: string): string {
  const b64 = typeof btoa !== 'undefined' ? btoa(s) : Buffer.from(s, 'binary').toString('base64')
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
function fromB64Url(t: string): string {
  const b64 = t.replace(/-/g, '+').replace(/_/g, '/')
  return typeof atob !== 'undefined' ? atob(b64) : Buffer.from(b64, 'base64').toString('binary')
}

// Compact form: "w.h.x,y,typeIdx,nozzle;..." then base64url. Keeps tokens short
// and easy to validate on decode.
export function encodeLayout(layout: Layout): string {
  const items = layout.placed
    .map((p) => `${p.x},${p.y},${TYPES.indexOf(p.type)},${p.nozzle ? 1 : 0}`)
    .join(';')
  return toB64Url(`${layout.dims.w}.${layout.dims.h}.${items}`)
}

export function decodeLayout(token: string): Layout | null {
  if (!token || !/^[A-Za-z0-9_-]+$/.test(token)) return null
  try {
    const raw = fromB64Url(token)
    const [wStr, hStr, itemsStr = ''] = raw.split('.')
    const w = Number(wStr), h = Number(hStr)
    if (!Number.isInteger(w) || !Number.isInteger(h) || w < 5 || w > 40 || h < 5 || h > 40) return null
    const placed: Placed[] = []
    if (itemsStr.length) {
      for (const chunk of itemsStr.split(';')) {
        const [xs, ys, ti, nz] = chunk.split(',')
        const x = Number(xs), y = Number(ys), t = TYPES[Number(ti)]
        if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || x >= w || y < 0 || y >= h || !t) return null
        const p: Placed = { x, y, type: t }
        if (nz === '1') p.nozzle = true
        placed.push(p)
      }
    }
    return { dims: { w, h }, placed }
  } catch {
    return null
  }
}
```

- [ ] **Step 4: Run tests**

Run: `npm test -- sprinklerShare`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/tools/sprinklerShare.ts src/__tests__/tools/sprinklerShare.test.ts
git commit -m "feat(tools): sprinkler layout URL-share codec with tests"
```

---

## Task 3: Reusable `TileGrid` component + render/interaction test

**Files:**
- Create: `src/components/tools/TileGrid.tsx`
- Test: `src/__tests__/tools/TileGrid.test.tsx`

**Interfaces:**
- Consumes: `key` from Task 1 (for set membership).
- Produces (consumed by Task 4):
  ```ts
  export interface TileGridProps {
    dims: { w: number; h: number }
    cellContent: (x: number, y: number) => { emoji?: string; watered: boolean; protectedTile: boolean; warn: boolean }
    onCellClick: (x: number, y: number) => void
  }
  export function TileGrid(props: TileGridProps): JSX.Element
  ```

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/tools/TileGrid.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TileGrid } from '@/components/tools/TileGrid'

const base = () => ({ emoji: undefined, watered: false, protectedTile: false, warn: false })

describe('TileGrid', () => {
  it('renders w*h cells', () => {
    render(<TileGrid dims={{ w: 4, h: 3 }} cellContent={base} onCellClick={() => {}} />)
    expect(screen.getAllByRole('button')).toHaveLength(12)
  })
  it('calls onCellClick with the cell coords', () => {
    const onCellClick = vi.fn()
    render(<TileGrid dims={{ w: 3, h: 3 }} cellContent={base} onCellClick={onCellClick} />)
    // cells rendered row-major; index 4 = (x1,y1)
    fireEvent.click(screen.getAllByRole('button')[4])
    expect(onCellClick).toHaveBeenCalledWith(1, 1)
  })
  it('marks watered cells via data attribute', () => {
    render(
      <TileGrid dims={{ w: 2, h: 1 }} onCellClick={() => {}}
        cellContent={(x) => ({ ...base(), watered: x === 0 })} />,
    )
    const cells = screen.getAllByRole('button')
    expect(cells[0].getAttribute('data-watered')).toBe('true')
    expect(cells[1].getAttribute('data-watered')).toBe('false')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- TileGrid`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the component**

Create `src/components/tools/TileGrid.tsx`:
```tsx
'use client'

import type { ReactNode } from 'react'

export interface TileGridProps {
  dims: { w: number; h: number }
  cellContent: (x: number, y: number) => { emoji?: string; watered: boolean; protectedTile: boolean; warn: boolean }
  onCellClick: (x: number, y: number) => void
}

export function TileGrid({ dims, cellContent, onCellClick }: TileGridProps) {
  const cells: ReactNode[] = []
  for (let y = 0; y < dims.h; y++) {
    for (let x = 0; x < dims.w; x++) {
      const c = cellContent(x, y)
      const bg = c.watered && c.protectedTile
        ? 'bg-gradient-to-br from-[#3b82f6]/40 to-[#22c55e]/40'
        : c.watered ? 'bg-[#3b82f6]/30' : c.protectedTile ? 'bg-[#22c55e]/25' : 'bg-[#0f1a0f]'
      cells.push(
        <button
          key={`${x},${y}`}
          type="button"
          aria-label={`${x},${y}`}
          data-watered={c.watered}
          data-protected={c.protectedTile}
          onClick={() => onCellClick(x, y)}
          className={`flex aspect-square items-center justify-center border border-[#2d3d2d] text-xs leading-none ${bg} ${c.warn ? 'ring-1 ring-inset ring-red-500' : ''}`}
        >
          <span aria-hidden>{c.emoji ?? ''}</span>
        </button>,
      )
    }
  }
  return (
    <div
      className="grid w-full select-none gap-0 overflow-x-auto"
      style={{ gridTemplateColumns: `repeat(${dims.w}, minmax(0, 1fr))` }}
    >
      {cells}
    </div>
  )
}
```

- [ ] **Step 4: Run tests**

Run: `npm test -- TileGrid`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/TileGrid.tsx src/__tests__/tools/TileGrid.test.tsx
git commit -m "feat(tools): reusable TileGrid grid component with tests"
```

---

## Task 4: Planner component (palette + grid + metrics + presets + save/share) + preset test

**Files:**
- Create: `src/components/tools/StardewSprinklerPlanner.tsx`
- Create: `src/lib/tools/sprinklerPresets.ts`
- Test: `src/__tests__/tools/sprinklerPresets.test.ts`

**Interfaces:**
- Consumes: everything from Tasks 1–3.
- Produces (consumed by Task 5): `export function StardewSprinklerPlanner({ locale }: { locale: string })`.

**Presets are provably-tiling lattices** — each sprinkler tier's coverage tiles the plane on a square lattice equal to its side length (quality 3×3 → step 3, iridium 5×5 → step 5, iridium+nozzle 7×7 → step 7). A test asserts full interior coverage.

- [ ] **Step 1: Write the failing preset test**

Create `src/__tests__/tools/sprinklerPresets.test.ts`:
```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- sprinklerPresets`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the presets**

Create `src/lib/tools/sprinklerPresets.ts`:
```ts
import type { Placed, GridDims, SprinklerType } from './gridCoverage'

export interface Preset {
  id: string
  step: number
  type: SprinklerType
  nozzle: boolean
  name: { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
}

// Square-lattice tilings: a sprinkler whose coverage is an s×s block centered on
// it tiles the plane when placed every `s` tiles on both axes. quality s=3,
// iridium s=5, iridium+nozzle s=7.
export const PRESETS: Preset[] = [
  { id: 'quality', step: 3, type: 'quality', nozzle: false,
    name: { en: 'Quality Sprinkler grid', zh: '优质洒水器阵', zhTW: '優質灑水器陣', ja: '上質スプリンクラー配置', ko: '고급 스프링클러 배치', de: 'Qualitäts-Sprinkler-Raster' } },
  { id: 'iridium', step: 5, type: 'iridium', nozzle: false,
    name: { en: 'Iridium Sprinkler grid', zh: '铱金洒水器阵', zhTW: '銥金灑水器陣', ja: 'イリジウムスプリンクラー配置', ko: '이리듐 스프링클러 배치', de: 'Iridium-Sprinkler-Raster' } },
  { id: 'iridium-nozzle', step: 7, type: 'iridium', nozzle: true,
    name: { en: 'Iridium + Pressure Nozzle grid', zh: '铱金+压力喷嘴阵', zhTW: '銥金+壓力噴嘴陣', ja: 'イリジウム+加圧ノズル配置', ko: '이리듐+가압 노즐 배치', de: 'Iridium + Druckdüse-Raster' } },
]

export function applyPreset(id: string, dims: GridDims): Placed[] {
  const preset = PRESETS.find((p) => p.id === id)
  if (!preset) return []
  const s = preset.step
  const off = Math.floor(s / 2) // center the lattice
  const placed: Placed[] = []
  for (let y = off; y < dims.h; y += s)
    for (let x = off; x < dims.w; x += s)
      placed.push({ x, y, type: preset.type, nozzle: preset.nozzle })
  return placed
}
```

- [ ] **Step 4: Run preset test**

Run: `npm test -- sprinklerPresets`
Expected: PASS (interior fully watered for all 3 presets).

- [ ] **Step 5: Implement the planner component**

Create `src/components/tools/StardewSprinklerPlanner.tsx`:
```tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { TileGrid } from './TileGrid'
import {
  wateredTiles, protectedTiles, computeMetrics, key,
  type Placed, type ObjType, type GridDims,
} from '@/lib/tools/gridCoverage'
import { encodeLayout, decodeLayout } from '@/lib/tools/sprinklerShare'
import { PRESETS, applyPreset } from '@/lib/tools/sprinklerPresets'

type Loc = { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
function pick(l: Loc, locale: string): string {
  if (locale === 'zh') return l.zh
  if (locale === 'zh-TW') return l.zhTW
  if (locale === 'ja') return l.ja
  if (locale === 'ko') return l.ko
  if (locale === 'de') return l.de
  return l.en
}

type Brush = ObjType | 'erase'
const EMOJI: Record<ObjType, string> = {
  basic: '💧', quality: '🔵', iridium: '🟣', scarecrow: '🎃', 'deluxe-scarecrow': '👺', crop: '🌱',
}
const PALETTE: { brush: Brush; label: Loc }[] = [
  { brush: 'basic', label: { en: 'Basic Sprinkler', zh: '普通洒水器', zhTW: '普通灑水器', ja: 'スプリンクラー', ko: '스프링클러', de: 'Sprinkler' } },
  { brush: 'quality', label: { en: 'Quality Sprinkler', zh: '优质洒水器', zhTW: '優質灑水器', ja: '上質スプリンクラー', ko: '고급 스프링클러', de: 'Qualitäts-Sprinkler' } },
  { brush: 'iridium', label: { en: 'Iridium Sprinkler', zh: '铱金洒水器', zhTW: '銥金灑水器', ja: 'イリジウムスプリンクラー', ko: '이리듐 스프링클러', de: 'Iridium-Sprinkler' } },
  { brush: 'scarecrow', label: { en: 'Scarecrow', zh: '稻草人', zhTW: '稻草人', ja: 'カカシ', ko: '허수아비', de: 'Vogelscheuche' } },
  { brush: 'deluxe-scarecrow', label: { en: 'Deluxe Scarecrow', zh: '豪华稻草人', zhTW: '豪華稻草人', ja: 'デラックスカカシ', ko: '디럭스 허수아비', de: 'Deluxe-Vogelscheuche' } },
  { brush: 'crop', label: { en: 'Crop', zh: '作物', zhTW: '作物', ja: '作物', ko: '작물', de: 'Feldfrucht' } },
  { brush: 'erase', label: { en: 'Erase', zh: '橡皮擦', zhTW: '橡皮擦', ja: '消しゴム', ko: '지우개', de: 'Löschen' } },
]

const STORAGE_KEY = 'sprinkler-layout-v1'

export function StardewSprinklerPlanner({ locale }: { locale: string }) {
  const [dims, setDims] = useState<GridDims>({ w: 20, h: 20 })
  const [placed, setPlaced] = useState<Placed[]>([])
  const [brush, setBrush] = useState<Brush>('iridium')
  const [nozzle, setNozzle] = useState(false)
  const [copied, setCopied] = useState(false)

  const L = (en: string, zh: string, zhTW: string, ja: string, ko: string, de: string) => pick({ en, zh, zhTW, ja, ko, de }, locale)

  // Restore from URL (?l=) first, else localStorage. Runs once on mount.
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('l')
    const fromUrl = token ? decodeLayout(token) : null
    if (fromUrl) { setDims(fromUrl.dims); setPlaced(fromUrl.placed); return }
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) { const l = decodeLayout(saved); if (l) { setDims(l.dims); setPlaced(l.placed) } }
    } catch { /* ignore */ }
  }, [])

  // Autosave to localStorage on change.
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, encodeLayout({ dims, placed })) } catch { /* ignore */ }
  }, [dims, placed])

  const watered = useMemo(() => wateredTiles(placed, dims), [placed, dims])
  const prot = useMemo(() => protectedTiles(placed, dims), [placed, dims])
  const metrics = useMemo(() => computeMetrics(placed, dims), [placed, dims])
  const byCell = useMemo(() => {
    const m = new Map<string, Placed>()
    for (const p of placed) m.set(key(p.x, p.y), p)
    return m
  }, [placed])

  const placeAt = (x: number, y: number) => {
    setPlaced((prev) => {
      const rest = prev.filter((p) => !(p.x === x && p.y === y))
      if (brush === 'erase') return rest
      const p: Placed = { x, y, type: brush }
      if ((brush === 'basic' || brush === 'quality' || brush === 'iridium') && nozzle) p.nozzle = true
      return [...rest, p]
    })
  }

  const clear = () => setPlaced([])
  const fillPreset = (id: string) => setPlaced(applyPreset(id, dims))
  const resize = (patch: Partial<GridDims>) => {
    const w = Math.max(5, Math.min(40, patch.w ?? dims.w))
    const h = Math.max(5, Math.min(40, patch.h ?? dims.h))
    setDims({ w, h })
    setPlaced((prev) => prev.filter((p) => p.x < w && p.y < h))
  }
  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}?l=${encodeLayout({ dims, placed })}`
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* ignore */ }
  }

  const cellContent = (x: number, y: number) => {
    const p = byCell.get(key(x, y))
    const w = watered.has(key(x, y)), pr = prot.has(key(x, y))
    return {
      emoji: p ? EMOJI[p.type] : undefined,
      watered: w,
      protectedTile: pr,
      warn: !!p && p.type === 'crop' && !w, // crop not watered
    }
  }

  const btn = (active: boolean) =>
    `rounded-lg border px-3 py-1.5 text-sm transition-colors ${active ? 'border-[#f0a832] bg-[#f0a832]/15 text-[#e8dcc8]' : 'border-[#2d3d2d] text-[#8a9a7a] hover:text-[#e8dcc8]'}`

  return (
    <div>
      {/* palette */}
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-4">
        {PALETTE.map((p) => (
          <button key={p.brush} type="button" onClick={() => setBrush(p.brush)} className={btn(brush === p.brush)}>
            {p.brush !== 'erase' ? EMOJI[p.brush as ObjType] + ' ' : '🧽 '}{pick(p.label, locale)}
          </button>
        ))}
        <label className="ml-2 flex items-center gap-2 text-sm text-[#e8dcc8]">
          <input type="checkbox" checked={nozzle} onChange={(e) => setNozzle(e.target.checked)} />
          {L('Pressure Nozzle', '压力喷嘴', '壓力噴嘴', '加圧ノズル', '가압 노즐', 'Druckdüse')}
        </label>
      </div>

      {/* presets + resize + actions */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {PRESETS.map((p) => (
          <button key={p.id} type="button" onClick={() => fillPreset(p.id)} className={btn(false)}>
            ✨ {pick(p.name, locale)}
          </button>
        ))}
        <button type="button" onClick={clear} className={btn(false)}>
          🗑 {L('Clear', '清空', '清空', 'クリア', '비우기', 'Leeren')}
        </button>
        <button type="button" onClick={share} className={btn(false)}>
          🔗 {copied ? L('Copied!', '已复制！', '已複製！', 'コピー！', '복사됨!', 'Kopiert!') : L('Share link', '复制分享链接', '複製分享連結', '共有リンク', '공유 링크', 'Link teilen')}
        </button>
        <span className="flex items-center gap-1 text-sm text-[#8a9a7a]">
          {L('Size', '尺寸', '尺寸', 'サイズ', '크기', 'Größe')}:
          <input type="number" min={5} max={40} value={dims.w} onChange={(e) => resize({ w: Number(e.target.value) })}
            className="w-16 rounded border border-[#2d3d2d] bg-[#0f1a0f] px-2 py-1 text-[#e8dcc8]" />
          ×
          <input type="number" min={5} max={40} value={dims.h} onChange={(e) => resize({ h: Number(e.target.value) })}
            className="w-16 rounded border border-[#2d3d2d] bg-[#0f1a0f] px-2 py-1 text-[#e8dcc8]" />
        </span>
      </div>

      {/* metrics */}
      <div className="mb-4 flex flex-wrap gap-4 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-4 text-sm text-[#e8dcc8]">
        <span>💧 {L('Watered', '浇水格', '澆水格', '給水', '급수', 'Bewässert')}: {metrics.wateredCount}</span>
        <span>🌱 {L('Crops watered', '作物已浇', '作物已澆', '給水作物', '급수 작물', 'Bewässerte Feldfrüchte')}: {metrics.cropsWatered}/{metrics.cropTotal}</span>
        <span className={metrics.cropsUnwatered ? 'text-red-400' : ''}>⚠️ {L('Dry crops', '漏浇作物', '漏澆作物', '未給水作物', '미급수 작물', 'Trockene Feldfrüchte')}: {metrics.cropsUnwatered}</span>
        <span>🎃 {L('Protected', '受保护', '受保護', '保護', '보호', 'Geschützt')}: {metrics.protectedCount}</span>
        <span>📊 {L('Coverage', '覆盖率', '覆蓋率', 'カバー率', '커버리지', 'Abdeckung')}: {metrics.coveragePct}%</span>
      </div>

      <TileGrid dims={dims} cellContent={cellContent} onCellClick={placeAt} />

      <p className="mt-4 text-xs text-[#8a9a7a]">
        {L(
          'Click a tile to place the selected item; pick Erase to remove. Coverage updates live. Layout autosaves and can be shared via link.',
          '点格子放置所选物品，选「橡皮擦」删除。覆盖范围实时更新。布局自动保存，可复制链接分享。',
          '點格子放置所選物品，選「橡皮擦」刪除。覆蓋範圍即時更新。佈局自動儲存，可複製連結分享。',
          'マスをクリックで配置、消しゴムで削除。カバー範囲は即時更新。配置は自動保存され、リンクで共有できます。',
          '칸을 클릭해 배치, 지우개로 삭제. 커버 범위 실시간 갱신. 배치는 자동 저장되며 링크로 공유 가능.',
          'Feld anklicken zum Platzieren, Löschen zum Entfernen. Abdeckung aktualisiert live. Layout wird gespeichert und ist per Link teilbar.',
        )}
      </p>
    </div>
  )
}
```

- [ ] **Step 6: Build + verify**

Run: `npm run build` → exit 0.
Then `npm run dev`, open `http://localhost:3000/en/tools/stardew-sprinklers` (Task 5 creates the page; if not yet present, temporarily verify via a scratch route or defer this dev-drive to Task 5). Kill the dev server after.
Run: `npm test` → all green (gridCoverage, sprinklerShare, TileGrid, sprinklerPresets).

- [ ] **Step 7: Commit**

```bash
git add src/components/tools/StardewSprinklerPlanner.tsx src/lib/tools/sprinklerPresets.ts src/__tests__/tools/sprinklerPresets.test.ts
git commit -m "feat(tools): sprinkler planner component with presets, save + share"
```

---

## Task 5: Route page + registration + sitemap + roadmap + dev-drive

**Files:**
- Create: `src/app/[locale]/tools/stardew-sprinklers/page.tsx`
- Modify: `src/app/[locale]/tools/page.tsx` (append to `DATA_TOOLS`, before its closing `]` at line ~191)
- Modify: `src/app/sitemap.ts` (add path on the line ~61 array)
- Modify: `docs/seo/tools-roadmap.json`

**Interfaces:**
- Consumes: `StardewSprinklerPlanner` from Task 4.

- [ ] **Step 1: Write the route page**

Create `src/app/[locale]/tools/stardew-sprinklers/page.tsx` (same shape as `stardew-cooking/page.tsx`; related tools link to crops calculator + fish):
```tsx
import { StardewSprinklerPlanner } from '@/components/tools/StardewSprinklerPlanner'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'

function getLoc(locale: string, zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW ?? zh
  if (locale === 'ja') return ja ?? en
  if (locale === 'ko') return ko ?? en
  if (locale === 'de') return de ?? en
  return en
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: getLoc(locale,
      '星露谷物语洒水器布局规划器 — 覆盖范围可视化',
      'Stardew Valley Sprinkler Planner — Coverage Layout Tool',
      '星露谷物語灑水器佈局規劃器 — 覆蓋範圍可視化',
      'スターデューバレー スプリンクラー配置プランナー',
      '스타듀밸리 스프링클러 배치 플래너',
      'Stardew Valley Sprinkler-Planer — Reichweiten-Layout',
    ),
    description: getLoc(locale,
      '免费星露谷物语洒水器布局规划器：在网格上放置普通/优质/铱金洒水器（含压力喷嘴）和稻草人，实时显示浇水与保护范围，一键铺最优图案，自动保存并可分享链接。',
      'Free Stardew Valley sprinkler layout planner. Place Basic/Quality/Iridium sprinklers (with Pressure Nozzle) and scarecrows on a grid, see watered and protected coverage live, fill optimal patterns in one click, autosave and share via link.',
      '免費星露谷物語灑水器佈局規劃器：在網格上放置普通/優質/銥金灑水器（含壓力噴嘴）和稻草人，即時顯示澆水與保護範圍，一鍵鋪最優圖案，自動儲存並可分享連結。',
      '無料のスターデューバレー スプリンクラー配置プランナー。グリッドにスプリンクラー（加圧ノズル対応）やカカシを置き、給水・保護範囲を即時表示。最適配置をワンクリック、自動保存・リンク共有。',
      '무료 스타듀밸리 스프링클러 배치 플래너. 그리드에 스프링클러(가압 노즐)와 허수아비를 배치하고 급수·보호 범위를 실시간 확인, 최적 배치 원클릭, 자동 저장·링크 공유.',
      'Kostenloser Stardew-Valley-Sprinklerplaner. Platziere Sprinkler (mit Druckdüse) und Vogelscheuchen im Raster, sieh Bewässerung und Schutz live, fülle optimale Muster per Klick, mit Autospeicherung und Teilen-Link.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-sprinklers`,
      languages: buildLanguageAlternates('/tools/stardew-sprinklers'),
    },
  }
}

export default async function StardewSprinklersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {getLoc(locale, '工具集', 'Tools', '工具集', 'ツール', '도구', 'Tools')}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">
          {getLoc(locale, '洒水器规划器', 'Sprinkler Planner', '灑水器規劃器', 'スプリンクラープランナー', '스프링클러 플래너', 'Sprinkler-Planer')}
        </span>
      </nav>
      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语洒水器布局规划器', 'Stardew Valley Sprinkler Planner', '星露谷物語灑水器佈局規劃器', 'スターデューバレー スプリンクラープランナー', '스타듀밸리 스프링클러 플래너', 'Stardew Valley Sprinkler-Planer')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(locale,
          '在网格上放置洒水器和稻草人，实时查看浇水与保护范围，一键铺最优图案。布局自动保存，可复制链接分享。',
          'Place sprinklers and scarecrows on the grid, see watered and protected coverage live, and fill optimal patterns in one click. Your layout autosaves and can be shared via link.',
          '在網格上放置灑水器和稻草人，即時查看澆水與保護範圍，一鍵鋪最優圖案。佈局自動儲存，可複製連結分享。',
          'グリッドにスプリンクラーやカカシを配置し、給水・保護範囲を即時に確認、最適配置をワンクリック。配置は自動保存、リンク共有可能。',
          '그리드에 스프링클러와 허수아비를 배치하고 급수·보호 범위를 실시간 확인, 최적 배치를 원클릭. 배치는 자동 저장되고 링크로 공유 가능.',
          'Platziere Sprinkler und Vogelscheuchen im Raster, sieh Bewässerung und Schutz live und fülle optimale Muster per Klick. Dein Layout wird gespeichert und ist per Link teilbar.',
        )}
      </p>
      <StardewSprinklerPlanner locale={locale} />
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`/${locale}/tools/stardew`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '作物利润计算器 →', 'Crop Calculator →', '作物利潤計算器 →', '作物計算機 →', '작물 계산기 →', 'Feldfrucht-Rechner →')}
          </Link>
          <Link href={`/${locale}/tools/stardew-fish`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '鱼类查询 →', 'Fish Finder →', '魚類查詢 →', '魚検索 →', '물고기 찾기 →', 'Fisch-Finder →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Register in DATA_TOOLS**

Append to `DATA_TOOLS` in `src/app/[locale]/tools/page.tsx` (before the closing `]`):
```ts
  {
    key: 'stardew-sprinklers',
    href: 'tools/stardew-sprinklers',
    titles: {
      zh: '星露谷物语洒水器规划器', 'zh-TW': '星露谷物語灑水器規劃器',
      ja: 'スターデューバレー スプリンクラープランナー', ko: '스타듀밸리 스프링클러 플래너',
      de: 'Stardew Valley Sprinkler-Planer', en: 'Stardew Valley Sprinkler Planner',
    },
    descs: {
      zh: '在网格上放洒水器和稻草人，实时看浇水/保护范围，一键铺最优图案，可分享链接。',
      'zh-TW': '在網格上放灑水器和稻草人，即時看澆水/保護範圍，一鍵鋪最優圖案，可分享連結。',
      ja: 'グリッドにスプリンクラー・カカシを配置、給水/保護範囲を即時表示、最適配置ワンクリック。',
      ko: '그리드에 스프링클러·허수아비 배치, 급수/보호 범위 실시간, 최적 배치 원클릭.',
      de: 'Sprinkler und Vogelscheuchen im Raster platzieren, Reichweite live, optimale Muster per Klick.',
      en: 'Place sprinklers and scarecrows on a grid, see coverage live, fill optimal patterns, share a link.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
```

- [ ] **Step 3: Add to sitemap**

In `src/app/sitemap.ts` line ~61, add `'/tools/stardew-sprinklers'` to the path array (after `'/tools/stardew-cooking'`).

- [ ] **Step 4: Update roadmap**

In `docs/seo/tools-roadmap.json`: the sprinkler entry lives in `big_interactive[].candidates`. Add a new `shipped[]` entry matching the shipped schema (`tool/route/primary_kw/vol/covers/status/notes`):
```json
{ "tool": "stardew-sprinkler-planner", "route": "tools/stardew-sprinklers", "primary_kw": "stardew valley sprinklers", "vol": 12100, "covers": ["stardew valley sprinklers", "stardew valley scarecrow", "stardew sprinkler layout"], "status": "done", "notes": "Interactive coverage grid: 3 sprinkler tiers +pressure nozzle, scarecrows, live watered/protected overlays, optimal-pattern presets, localStorage + URL share; shared gridCoverage engine reused by greenhouse next." }
```
Then in the `big_interactive` candidate for `stardew-sprinkler-planner`, add `"status": "done"`. Bump top-level `"updated": "2026-07-08"`.

- [ ] **Step 5: Build + dev-drive verify**

Run: `npm run build` → exit 0; route `/[locale]/tools/stardew-sprinklers` present in output.
Then `npm run dev` (background), and verify:
- `curl -s localhost:3000/en/tools/stardew-sprinklers | grep -o "Sprinkler Planner"` → matches; same for `/zh/` and `/ja/` (localized h1, 200).
- `curl -s localhost:3000/en/tools | grep -o "Sprinkler Planner"` → the new card shows in the grid.
- Manually (or via a short Playwright/DOM check): click a few cells, confirm placement + watered overlay; click a preset, confirm the grid fills; click Share, confirm URL has `?l=`; reload that URL, confirm the layout restores.
Kill the dev server after.
Run: `npm test` → all green.

- [ ] **Step 6: Commit**

```bash
git add "src/app/[locale]/tools/stardew-sprinklers/page.tsx" "src/app/[locale]/tools/page.tsx" src/app/sitemap.ts docs/seo/tools-roadmap.json
git commit -m "feat(tools): add Stardew Valley sprinkler planner route + registration"
```

---

## Final verification

- [ ] `npm test` — all suites green (4 new: gridCoverage, sprinklerShare, TileGrid, sprinklerPresets).
- [ ] `npm run build` — exit 0.
- [ ] Route renders in all 6 locales (spot-check en/zh/ja); `/tools` grid shows the new card.
- [ ] Coverage counts verified against the wiki (sprinkler 4/8/24/8/24/48; scarecrow 248 / deluxe value).
- [ ] Presets fully water the interior (test-proven); URL share round-trips; localStorage persists.
- [ ] `tools-roadmap.json`: sprinkler entry in `shipped[]`, candidate marked done, `updated` = 2026-07-08.
- [ ] Update memory `project_game_database_tools.md`: add sprinkler tool + note the reusable `gridCoverage`/`TileGrid` engine for the greenhouse next.

## Self-review notes (addressed)

- **Spec coverage:** engine with verified coverage (T1), URL share (T2), reusable grid (T3), planner with palette/metrics/presets/save/share (T4), page + registration + sitemap + roadmap (T5). All acceptance criteria mapped.
- **Accuracy gates:** sprinkler counts asserted in T1 tests; scarecrow count flagged for wiki verification with the test as the lock; presets proven to fully water interior via T4 test (machine-checkable, not hand-authored patterns).
- **Type consistency:** `Placed`/`GridDims`/`ObjType` from T1 used verbatim in T2–T5; `encodeLayout`/`decodeLayout`, `PRESETS`/`applyPreset`, `TileGrid` props consistent across tasks.
- **Architecture note:** URL restore uses `window.location` in `useEffect` (not `useSearchParams`) per Global Constraints — avoids the Suspense-boundary requirement.
```