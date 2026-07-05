'use client'

import { useMemo, useState } from 'react'
import { BUNDLE_ROOMS, type Bundle, type BundleItem, type BundleLoc } from './stardewBundleData'

function pick(l: BundleLoc, locale: string): string {
  if (locale === 'zh') return l.zh
  if (locale === 'zh-TW') return l.zhTW
  if (locale === 'ja') return l.ja
  if (locale === 'ko') return l.ko
  if (locale === 'de') return l.de
  return l.en
}

const COLOR_HEX: Record<string, string> = {
  green: '#5aa02c', yellow: '#e0b93a', orange: '#e08a3a', red: '#cc5b47',
  purple: '#9b6bd6', blue: '#4a90d9', teal: '#2fb3a3', cyan: '#3ec5d6', pink: '#d67ba6',
}

const QUALITY_HEX: Record<string, string> = { gold: '#f0a832', silver: '#c0c8d0', iridium: '#b06fd6' }

export function StardewBundleFinder({ locale }: { locale: string }) {
  const [room, setRoom] = useState<string>('all')
  const [query, setQuery] = useState<string>('')

  const t = (l: BundleLoc) => pick(l, locale)
  const L = (zh: string, en: string, zhTW: string, ja: string, ko: string, de: string) =>
    t({ zh, zhTW, en, ja, ko, de })

  const q = query.trim().toLowerCase()
  const itemMatches = (it: BundleItem) =>
    !!q && (t(it.name).toLowerCase().includes(q) || it.name.en.toLowerCase().includes(q))

  const rooms = useMemo(() => {
    return BUNDLE_ROOMS.filter((r) => room === 'all' || r.key === room)
      .map((r) => ({
        ...r,
        bundles: r.bundles.filter((b) => (q ? b.items.some(itemMatches) : true)),
      }))
      .filter((r) => r.bundles.length > 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, q, locale])

  const totalMatches = q ? rooms.reduce((n, r) => n + r.bundles.length, 0) : 0

  const requiredLabel = (b: Bundle) => {
    if (typeof b.gold === 'number') return L('付款', 'Payment', '付款', '支払い', '지불', 'Zahlung')
    if (b.required >= b.items.length)
      return L(`全部 ${b.items.length} 件`, `All ${b.items.length}`, `全部 ${b.items.length} 件`, `全 ${b.items.length} 種`, `전부 ${b.items.length}개`, `Alle ${b.items.length}`)
    return L(
      `任选 ${b.required} / 共 ${b.items.length} 件`,
      `Pick ${b.required} of ${b.items.length}`,
      `任選 ${b.required} / 共 ${b.items.length} 件`,
      `${b.items.length} 種から ${b.required} 種`,
      `${b.items.length}개 중 ${b.required}개`,
      `${b.required} von ${b.items.length}`,
    )
  }

  const Item = ({ it }: { it: BundleItem }) => {
    const hit = itemMatches(it)
    return (
      <span
        className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-sm"
        style={{
          borderColor: hit ? '#f0a832' : '#2d3d2d',
          background: hit ? 'rgba(240,168,50,0.12)' : 'rgba(26,46,26,0.5)',
          color: '#e8dcc8',
        }}
      >
        {it.quality && (
          <span title={it.quality} style={{ color: QUALITY_HEX[it.quality] }}>
            ★
          </span>
        )}
        {t(it.name)}
        {it.qty > 1 && <span className="text-[#8a9a7a]">×{it.qty}</span>}
      </span>
    )
  }

  const BundleCard = ({ b }: { b: Bundle }) => {
    const accent = COLOR_HEX[b.color] || '#5aa02c'
    return (
      <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-4" style={{ borderLeft: `3px solid ${accent}` }}>
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <h4 className="font-semibold text-[#e8dcc8]">{t(b.name)}</h4>
          <span className="rounded-full bg-[#2d3d2d] px-2 py-0.5 text-xs text-[#8a9a7a]">{requiredLabel(b)}</span>
        </div>
        {typeof b.gold === 'number' ? (
          <p className="mb-2 text-sm text-[#e8dcc8]">💰 {b.gold.toLocaleString()}g</p>
        ) : (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {b.items.map((it, i) => (
              <Item key={`${it.key}-${i}`} it={it} />
            ))}
          </div>
        )}
        {b.reward && (
          <p className="text-xs text-[#8a9a7a]">
            🎁 {L('奖励', 'Reward', '獎勵', '報酬', '보상', 'Belohnung')}:{' '}
            <span className="text-[#f0a832]">
              {t(b.reward.name)}
              {b.reward.qty > 1 && ` ×${b.reward.qty}`}
            </span>
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={L(
            '搜物品，查它属于哪个收集包…（例：松露、鲑鱼）',
            'Search an item to find its bundle… (e.g. Truffle, Salmon)',
            '搜物品，查它屬於哪個收集包…（例：松露、鮭魚）',
            'アイテム名で収集包を検索…（例：トリュフ）',
            '아이템으로 꾸러미 찾기…（예: 송로버섯）',
            'Gegenstand suchen, um sein Bündel zu finden…',
          )}
          className="mb-4 w-full rounded-lg border border-[#2d3d2d] bg-[#0f1a0f] px-3 py-2.5 text-[#e8dcc8] placeholder:text-[#4a5a4a] focus:border-[#f0a832] focus:outline-none"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setRoom('all')}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${room === 'all' ? 'bg-[#f0a832] text-[#0f1a0f] font-semibold' : 'border border-[#2d3d2d] text-[#8a9a7a] hover:text-[#e8dcc8]'}`}
          >
            {L('全部房间', 'All Rooms', '全部房間', '全ルーム', '전체', 'Alle Räume')}
          </button>
          {BUNDLE_ROOMS.map((r) => (
            <button
              key={r.key}
              onClick={() => setRoom(r.key)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${room === r.key ? 'bg-[#f0a832] text-[#0f1a0f] font-semibold' : 'border border-[#2d3d2d] text-[#8a9a7a] hover:text-[#e8dcc8]'}`}
            >
              {t(r.name)}
            </button>
          ))}
        </div>
      </div>

      {q && (
        <p className="mb-4 text-sm text-[#8a9a7a]">
          {totalMatches > 0
            ? L(
                `找到 ${totalMatches} 个需要「${query.trim()}」的收集包`,
                `${totalMatches} bundle(s) need “${query.trim()}”`,
                `找到 ${totalMatches} 個需要「${query.trim()}」的收集包`,
                `「${query.trim()}」が必要な収集包 ${totalMatches} 件`,
                `「${query.trim()}」이(가) 필요한 꾸러미 ${totalMatches}개`,
                `${totalMatches} Bündel benötigen „${query.trim()}“`,
              )
            : L('没有收集包需要这个物品', 'No bundle needs this item', '沒有收集包需要這個物品', 'この物品が必要な収集包はありません', '이 아이템이 필요한 꾸러미가 없습니다', 'Kein Bündel benötigt diesen Gegenstand')}
        </p>
      )}

      <div className="space-y-8">
        {rooms.map((r) => (
          <section key={r.key}>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2 border-b border-[#2d3d2d] pb-2">
              <h3 className="text-lg font-semibold text-[#e8dcc8]">{t(r.name)}</h3>
              <span className="text-sm text-[#8a9a7a]">
                {L('完成奖励', 'Reward', '完成獎勵', '報酬', '보상', 'Belohnung')}: <span className="text-[#f0a832]">{t(r.reward)}</span>
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {r.bundles.map((b) => (
                <BundleCard key={b.key} b={b} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
