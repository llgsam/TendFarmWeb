'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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
  const [wInput, setWInput] = useState(String(dims.w))
  const [hInput, setHInput] = useState(String(dims.h))
  const restoredRef = useRef(false)

  const L = (en: string, zh: string, zhTW: string, ja: string, ko: string, de: string) => pick({ en, zh, zhTW, ja, ko, de }, locale)

  // Restore from URL (?l=) first, else localStorage. Runs once on mount.
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('l')
    const fromUrl = token ? decodeLayout(token) : null
    if (fromUrl) { setDims(fromUrl.dims); setPlaced(fromUrl.placed); restoredRef.current = true; return }
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) { const l = decodeLayout(saved); if (l) { setDims(l.dims); setPlaced(l.placed) } }
    } catch { /* ignore */ }
    restoredRef.current = true
  }, [])

  // Autosave to localStorage on change. Skip the very first run (mount), which
  // would otherwise write stale default state before the restore effect flushes.
  useEffect(() => {
    if (!restoredRef.current) return
    try { localStorage.setItem(STORAGE_KEY, encodeLayout({ dims, placed })) } catch { /* ignore */ }
  }, [dims, placed])

  // Keep local input strings in sync when dims changes for another reason (preset/restore/resize).
  useEffect(() => {
    setWInput(String(dims.w))
    setHInput(String(dims.h))
  }, [dims.w, dims.h])

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
  const commitWInput = () => {
    const n = Number.parseInt(wInput, 10)
    if (Number.isFinite(n)) { resize({ w: n }); return }
    setWInput(String(dims.w))
  }
  const commitHInput = () => {
    const n = Number.parseInt(hInput, 10)
    if (Number.isFinite(n)) { resize({ h: n }); return }
    setHInput(String(dims.h))
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
          <input type="number" min={5} max={40} value={wInput} onChange={(e) => setWInput(e.target.value)}
            onBlur={commitWInput} onKeyDown={(e) => { if (e.key === 'Enter') commitWInput() }}
            className="w-16 rounded border border-[#2d3d2d] bg-[#0f1a0f] px-2 py-1 text-[#e8dcc8]" />
          ×
          <input type="number" min={5} max={40} value={hInput} onChange={(e) => setHInput(e.target.value)}
            onBlur={commitHInput} onKeyDown={(e) => { if (e.key === 'Enter') commitHInput() }}
            className="w-16 rounded border border-[#2d3d2d] bg-[#0f1a0f] px-2 py-1 text-[#e8dcc8]" />
        </span>
      </div>

      {/* metrics */}
      <div className="mb-4 flex flex-wrap gap-4 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-4 text-sm text-[#e8dcc8]">
        <span>💧 {L('Watered', '浇水格', '澆水格', '給水', '급수', 'Bewässert')}: {metrics.wateredCount}</span>
        <span>🌱 {L('Crops watered', '作物已浇', '作物已澆', '給水作物', '급수 작물', 'Bewässerte Feldfrüchte')}: {metrics.cropsWatered}/{metrics.cropTotal}</span>
        <span className={metrics.cropsUnwatered ? 'text-red-400' : ''}>⚠️ {L('Dry crops', '漏浇作物', '漏澆作物', '未給水作物', '미급수 작물', 'Trockene Feldfrüchte')}: {metrics.cropsUnwatered}</span>
        <span>🎃 {L('Protected', '受保护', '受保護', '保護', '보호', 'Geschützt')}: {metrics.protectedCount}</span>
        <span>📊 {L('Crop coverage', '作物覆盖率', '作物覆蓋率', '作物カバー率', '작물 커버리지', 'Feldfrucht-Abdeckung')}: {metrics.coveragePct}%</span>
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
