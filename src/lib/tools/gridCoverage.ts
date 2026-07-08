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
// Verified against the official Stardew Valley Wiki "Scarecrow" page: a
// regular Scarecrow protects 249 tiles including its own tile (248 excluding
// it) — reaching 8 tiles orthogonally (N/E/S/W) and 6 tiles diagonally
// (NE/SE/SW/NW). The Deluxe Scarecrow uses the same shape at radius 16,
// protecting 888 tiles (excluding its own tile). The predicate dx²+dy² <=
// r²+2r reproduces this exact shape: at r=8 it admits (8,0) [64<=80] but
// rejects (9,0) [81>80], and admits (6,6) [72<=80] but rejects (7,7)
// [98>80] — matching the wiki's 8-orthogonal/6-diagonal description exactly.
export function scarecrowOffsets(deluxe: boolean): [number, number][] {
  const r = deluxe ? 16 : 8
  const out: [number, number][] = []
  for (let dy = -r; dy <= r; dy++)
    for (let dx = -r; dx <= r; dx++) {
      if (dx === 0 && dy === 0) continue
      if (dx * dx + dy * dy <= r * r + 2 * r) out.push([dx, dy]) // tuned to hit 248 for r=8
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
