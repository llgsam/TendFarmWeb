'use client'

import { useMemo, useState } from 'react'
import {
  MUSEUM_CATEGORIES,
  MUSEUM_ITEMS,
  MUSEUM_MILESTONES,
  type MuseumItem,
  type MuseumLoc,
} from './stardewMuseumData'

function pick(l: MuseumLoc, locale: string): string {
  if (locale === 'zh') return l.zh
  if (locale === 'zh-TW') return l.zhTW
  if (locale === 'ja') return l.ja
  if (locale === 'ko') return l.ko
  if (locale === 'de') return l.de
  return l.en
}

const CAT_HEX: Record<string, string> = {
  artifact: '#c9a24a',
  foraged: '#5aa02c',
  gem: '#4a90d9',
  'geode-mineral': '#9b6bd6',
}

export function StardewMuseumFinder({ locale }: { locale: string }) {
  const [cat, setCat] = useState<string>('all')
  const [query, setQuery] = useState<string>('')

  const t = (l: MuseumLoc) => pick(l, locale)
  const L = (zh: string, en: string, zhTW: string, ja: string, ko: string, de: string) =>
    t({ zh, zhTW, en, ja, ko, de })

  const q = query.trim().toLowerCase()

  const items = useMemo(() => {
    return MUSEUM_ITEMS.filter((it) => {
      if (cat !== 'all' && it.category !== cat) return false
      if (!q) return true
      return t(it.name).toLowerCase().includes(q) || it.name.en.toLowerCase().includes(q)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, q, locale])

  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    for (const it of MUSEUM_ITEMS) c[it.category] = (c[it.category] || 0) + 1
    return c
  }, [])

  const ItemCard = ({ it }: { it: MuseumItem }) => (
    <div
      className="rounded-lg border border-[#2d3d2d] bg-[#1a2e1a]/50 p-3"
      style={{ borderLeft: `3px solid ${CAT_HEX[it.category] || '#5aa02c'}` }}
    >
      <div className="font-semibold text-[#e8dcc8]">{t(it.name)}</div>
      <div className="mt-1 text-xs leading-relaxed text-[#8a9a7a]">{t(it.source)}</div>
    </div>
  )

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={L(
            '搜索矿物或化石名称…（例：钻石、恐龙蛋）',
            'Search a mineral or artifact… (e.g. Diamond, Dinosaur Egg)',
            '搜索礦物或化石名稱…（例：鑽石、恐龍蛋）',
            '鉱物や発掘品を検索…（例：ダイヤ）',
            '광물이나 유물 검색…（예: 다이아몬드）',
            'Mineral oder Artefakt suchen…',
          )}
          className="mb-4 w-full rounded-lg border border-[#2d3d2d] bg-[#0f1a0f] px-3 py-2.5 text-[#e8dcc8] placeholder:text-[#4a5a4a] focus:border-[#f0a832] focus:outline-none"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCat('all')}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${cat === 'all' ? 'bg-[#f0a832] text-[#0f1a0f] font-semibold' : 'border border-[#2d3d2d] text-[#8a9a7a] hover:text-[#e8dcc8]'}`}
          >
            {L('全部', 'All', '全部', 'すべて', '전체', 'Alle')} ({MUSEUM_ITEMS.length})
          </button>
          {MUSEUM_CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${cat === c.key ? 'bg-[#f0a832] text-[#0f1a0f] font-semibold' : 'border border-[#2d3d2d] text-[#8a9a7a] hover:text-[#e8dcc8]'}`}
            >
              {t(c.name)} ({counts[c.key] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="mb-3 text-sm text-[#8a9a7a]">
        {L(
          `显示 ${items.length} 项`,
          `Showing ${items.length} item(s)`,
          `顯示 ${items.length} 項`,
          `${items.length} 件を表示`,
          `${items.length}개 표시`,
          `${items.length} Einträge`,
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <ItemCard key={it.key} it={it} />
        ))}
      </div>

      {/* Donation reward milestones */}
      <div className="mt-12">
        <h2 className="mb-1 text-lg font-semibold text-[#e8dcc8]">
          🏛️ {L('捐赠里程碑奖励', 'Donation Milestone Rewards', '捐贈里程碑獎勵', '寄贈マイルストーン報酬', '기증 마일스톤 보상', 'Spenden-Meilenstein-Belohnungen')}
        </h2>
        <p className="mb-4 text-xs text-[#8a9a7a]">
          {L(
            '每累计捐赠一定数量的矿物和化石，Gunther 会给你奖励。共 95 项，全部捐完可得星之果实。',
            'Gunther rewards you as your total minerals + artifacts donated hits each threshold. All 95 donated earns a Stardrop.',
            '每累計捐贈一定數量的礦物和化石，Gunther 會給你獎勵。共 95 項，全部捐完可得星之果實。',
            '鉱物と発掘品の寄贈総数が各しきい値に達すると、ギュンターが報酬をくれます。全95件でスタードロップ。',
            '광물과 유물 기증 총합이 각 기준에 도달하면 군터가 보상을 줍니다. 전부 95개 기증 시 스타드롭.',
            'Gunther belohnt dich, wenn deine gespendeten Mineralien + Artefakte jede Schwelle erreichen. Alle 95 ergeben einen Sternentropfen.',
          )}
        </p>
        <div className="overflow-hidden rounded-xl border border-[#2d3d2d]">
          {MUSEUM_MILESTONES.map((m, i) => (
            <div
              key={m.threshold}
              className={`flex items-center gap-4 px-4 py-2.5 ${i % 2 ? 'bg-[#1a2e1a]/30' : 'bg-[#1a2e1a]/60'}`}
            >
              <span className="w-14 shrink-0 text-right font-mono text-sm font-semibold text-[#f0a832]">
                {m.threshold}
              </span>
              <span className="text-sm text-[#e8dcc8]">{t(m.reward)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
