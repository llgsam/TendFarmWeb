'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { TileGrid } from './TileGrid'
import {
  wateredTiles, computeMetrics, key,
  type Placed, type ObjType, type GridDims,
} from '@/lib/tools/gridCoverage'
import { encodeLayout, decodeLayout } from '@/lib/tools/sprinklerShare'
import { applyPreset } from '@/lib/tools/sprinklerPresets'

// The Stardew Valley greenhouse has a fixed 10-wide x 12-tall tillable plot
// (120 plantable tiles). Crops grow year-round here, sprinklers work, and no
// scarecrows are needed (crows never attack indoors) — so this planner drops
// the scarecrow brush the field planner has, and locks the grid to 10x12.
const GH_DIMS: GridDims = { w: 10, h: 12 }
const STORAGE_KEY = 'greenhouse-layout-v1'

type Loc = { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
function pick(l: Loc, locale: string): string {
  if (locale === 'zh') return l.zh
  if (locale === 'zh-TW') return l.zhTW
  if (locale === 'ja') return l.ja
  if (locale === 'ko') return l.ko
  if (locale === 'de') return l.de
  return l.en
}

type GhObj = 'basic' | 'quality' | 'iridium' | 'crop'
type Brush = GhObj | 'erase'
const EMOJI: Record<GhObj, string> = { basic: '💧', quality: '🔵', iridium: '🟣', crop: '🌱' }
const PALETTE: { brush: Brush; label: Loc }[] = [
  { brush: 'iridium', label: { en: 'Iridium Sprinkler', zh: '铱金洒水器', zhTW: '銥金灑水器', ja: 'イリジウムスプリンクラー', ko: '이리듐 스프링클러', de: 'Iridium-Sprinkler' } },
  { brush: 'quality', label: { en: 'Quality Sprinkler', zh: '优质洒水器', zhTW: '優質灑水器', ja: '上質スプリンクラー', ko: '고급 스프링클러', de: 'Qualitäts-Sprinkler' } },
  { brush: 'basic', label: { en: 'Basic Sprinkler', zh: '普通洒水器', zhTW: '普通灑水器', ja: 'スプリンクラー', ko: '스프링클러', de: 'Sprinkler' } },
  { brush: 'crop', label: { en: 'Crop', zh: '作物', zhTW: '作物', ja: '作物', ko: '작물', de: 'Feldfrucht' } },
  { brush: 'erase', label: { en: 'Erase', zh: '橡皮擦', zhTW: '橡皮擦', ja: '消しゴム', ko: '지우개', de: 'Löschen' } },
]

// The greenhouse-optimal layout. An Iridium Sprinkler waters a 5×5 area
// (Chebyshev radius 2). On the 10×12 plot, six of them at columns {2,7} ×
// rows {2,7,11} cover every one of the other 114 tiles — the classic
// full-coverage greenhouse setup. buildOptimal() also plants crops on all
// remaining tiles so a first-time visitor lands on a fully-planted,
// fully-watered greenhouse.
const GH_IRIDIUM_POS: [number, number][] = [[2, 2], [7, 2], [2, 7], [7, 7], [2, 11], [7, 11]]
export function buildGreenhouseOptimal(): Placed[] {
  const sprinklerSet = new Set(GH_IRIDIUM_POS.map(([x, y]) => key(x, y)))
  const out: Placed[] = GH_IRIDIUM_POS.map(([x, y]) => ({ x, y, type: 'iridium' as ObjType }))
  for (let y = 0; y < GH_DIMS.h; y++)
    for (let x = 0; x < GH_DIMS.w; x++)
      if (!sprinklerSet.has(key(x, y))) out.push({ x, y, type: 'crop' })
  return out
}

// Preset id -> label. 'optimal' is greenhouse-specific full coverage; the
// lattice presets are reused from the field planner as alternatives (their
// generic spacing leaves the bottom rows dry on a 12-tall plot, which the
// live Watered metric shows honestly).
const PRESET_LABELS: { id: string; label: Loc }[] = [
  { id: 'optimal', label: { en: 'Optimal (6 Iridium, full coverage)', zh: '最优（6 铱金，全覆盖）', zhTW: '最優（6 銥金，全覆蓋）', ja: '最適（イリジウム6・全給水）', ko: '최적(이리듐 6, 전체 급수)', de: 'Optimal (6 Iridium, volle Abdeckung)' } },
  { id: 'iridium', label: { en: 'Iridium lattice', zh: '铱金格阵', zhTW: '銥金格陣', ja: 'イリジウム格子', ko: '이리듐 격자', de: 'Iridium-Gitter' } },
  { id: 'quality', label: { en: 'Quality lattice', zh: '优质格阵', zhTW: '優質格陣', ja: '上質格子', ko: '고급 격자', de: 'Qualitäts-Gitter' } },
]

export function StardewGreenhousePlanner({ locale }: { locale: string }) {
  const [placed, setPlaced] = useState<Placed[]>([])
  const [brush, setBrush] = useState<Brush>('iridium')
  const [nozzle, setNozzle] = useState(false)
  const [copied, setCopied] = useState(false)
  const restoredRef = useRef(false)

  const L = (en: string, zh: string, zhTW: string, ja: string, ko: string, de: string) => pick({ en, zh, zhTW, ja, ko, de }, locale)

  // Restore from URL (?l=) first, else localStorage, else seed the Iridium
  // preset so a first-time visitor immediately sees the optimal full-coverage
  // layout rather than an empty plot.
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('l')
    const fromUrl = token ? decodeLayout(token) : null
    if (fromUrl) { setPlaced(fromUrl.placed); restoredRef.current = true; return }
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) { const l = decodeLayout(saved); if (l) { setPlaced(l.placed); restoredRef.current = true; return } }
    } catch { /* ignore */ }
    setPlaced(buildGreenhouseOptimal())
    restoredRef.current = true
  }, [])

  // Autosave to localStorage after the restore/seed pass completes.
  useEffect(() => {
    if (!restoredRef.current) return
    try { localStorage.setItem(STORAGE_KEY, encodeLayout({ dims: GH_DIMS, placed })) } catch { /* ignore */ }
  }, [placed])

  const watered = useMemo(() => wateredTiles(placed, GH_DIMS), [placed])
  const metrics = useMemo(() => computeMetrics(placed, GH_DIMS), [placed])
  const byCell = useMemo(() => {
    const m = new Map<string, Placed>()
    for (const p of placed) m.set(key(p.x, p.y), p)
    return m
  }, [placed])

  const placeAt = (x: number, y: number) => {
    setPlaced((prev) => {
      const rest = prev.filter((p) => !(p.x === x && p.y === y))
      if (brush === 'erase') return rest
      const p: Placed = { x, y, type: brush as ObjType }
      if ((brush === 'basic' || brush === 'quality' || brush === 'iridium') && nozzle) p.nozzle = true
      return [...rest, p]
    })
  }

  const clear = () => setPlaced([])
  const fillPreset = (id: string) => setPlaced(id === 'optimal' ? buildGreenhouseOptimal() : applyPreset(id, GH_DIMS))
  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}?l=${encodeLayout({ dims: GH_DIMS, placed })}`
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* ignore */ }
  }

  const cellContent = (x: number, y: number) => {
    const p = byCell.get(key(x, y))
    const w = watered.has(key(x, y))
    return {
      emoji: p ? EMOJI[p.type as GhObj] : undefined,
      watered: w,
      protectedTile: false,
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
            {p.brush !== 'erase' ? EMOJI[p.brush as GhObj] + ' ' : '🧽 '}{pick(p.label, locale)}
          </button>
        ))}
        <label className="ml-2 flex items-center gap-2 text-sm text-[#e8dcc8]">
          <input type="checkbox" checked={nozzle} onChange={(e) => setNozzle(e.target.checked)} />
          {L('Pressure Nozzle', '压力喷嘴', '壓力噴嘴', '加圧ノズル', '가압 노즐', 'Druckdüse')}
        </label>
      </div>

      {/* presets + actions */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {PRESET_LABELS.map((p) => (
          <button key={p.id} type="button" onClick={() => fillPreset(p.id)} className={btn(false)}>
            ✨ {pick(p.label, locale)}
          </button>
        ))}
        <button type="button" onClick={clear} className={btn(false)}>
          🗑 {L('Clear', '清空', '清空', 'クリア', '비우기', 'Leeren')}
        </button>
        <button type="button" onClick={share} className={btn(false)}>
          🔗 {copied ? L('Copied!', '已复制！', '已複製！', 'コピー！', '복사됨!', 'Kopiert!') : L('Share link', '复制分享链接', '複製分享連結', '共有リンク', '공유 링크', 'Link teilen')}
        </button>
      </div>

      {/* metrics */}
      <div className="mb-4 flex flex-wrap gap-4 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-4 text-sm text-[#e8dcc8]">
        <span>🟩 {L('Plot', '耕地', '耕地', '区画', '경작지', 'Beet')}: 10 × 12 = 120</span>
        <span>💧 {L('Watered', '浇水格', '澆水格', '給水', '급수', 'Bewässert')}: {metrics.wateredCount}/120</span>
        <span>🌱 {L('Crops watered', '作物已浇', '作物已澆', '給水作物', '급수 작물', 'Bewässerte Feldfrüchte')}: {metrics.cropsWatered}/{metrics.cropTotal}</span>
        <span className={metrics.cropsUnwatered ? 'text-red-400' : ''}>⚠️ {L('Dry crops', '漏浇作物', '漏澆作物', '未給水作物', '미급수 작물', 'Trockene Feldfrüchte')}: {metrics.cropsUnwatered}</span>
        <span>🟣 {L('Iridium sprinklers', '铱金洒水器', '銥金灑水器', 'イリジウム', '이리듐', 'Iridium-Sprinkler')}: {metrics.counts.iridium}</span>
      </div>

      <TileGrid dims={GH_DIMS} cellContent={cellContent} onCellClick={placeAt} />

      <p className="mt-4 text-xs text-[#8a9a7a]">
        {L(
          'The greenhouse plot is fixed at 10 × 12 (120 tiles). Click a tile to place the selected item; pick Erase to remove. No scarecrows are needed indoors — crows never attack the greenhouse. Layout autosaves and can be shared via link.',
          '温室耕地固定为 10 × 12（120 格）。点格子放置所选物品，选「橡皮擦」删除。室内无需稻草人——乌鸦从不袭击温室。布局自动保存，可复制链接分享。',
          '溫室耕地固定為 10 × 12（120 格）。點格子放置所選物品，選「橡皮擦」刪除。室內無需稻草人——烏鴉從不襲擊溫室。佈局自動儲存，可複製連結分享。',
          '温室の区画は10×12（120マス）固定。マスをクリックで配置、消しゴムで削除。室内はカカシ不要——カラスは温室を襲いません。配置は自動保存、リンク共有可能。',
          '온실 경작지는 10 × 12(120칸) 고정. 칸을 클릭해 배치, 지우개로 삭제. 실내에는 허수아비가 필요 없음——까마귀는 온실을 습격하지 않음. 배치는 자동 저장되며 링크로 공유 가능.',
          'Das Gewächshaus-Beet ist fest 10 × 12 (120 Felder). Feld anklicken zum Platzieren, Löschen zum Entfernen. Drinnen sind keine Vogelscheuchen nötig — Krähen greifen das Gewächshaus nie an. Layout wird gespeichert und ist per Link teilbar.',
        )}
      </p>
    </div>
  )
}
