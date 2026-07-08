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
