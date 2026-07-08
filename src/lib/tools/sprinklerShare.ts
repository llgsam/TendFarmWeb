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
