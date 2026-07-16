'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

type LocMap = { zh: string; 'zh-TW': string; ja: string; ko: string; de: string; en: string }
type Tool = { key: string; href: string; titles: LocMap; descs: LocMap; tags: LocMap; featured?: boolean }

export function ToolsBrowser({
  locale,
  liveTools,
  dataTools,
  calcLabel,
  dataLabel,
  dataSubtitle,
  liveLabel,
  featuredLabel,
  allLabel,
}: {
  locale: string
  liveTools: Tool[]
  dataTools: Tool[]
  calcLabel: string
  dataLabel: string
  dataSubtitle: string
  liveLabel: string
  featuredLabel: string
  allLabel: string
}) {
  const [game, setGame] = useState<string>('all')

  const loc = (m: LocMap) => (m[locale as keyof LocMap] ?? m.en)

  // unique games (by canonical English tag), preserving order of appearance
  const games = useMemo(() => {
    const seen = new Set<string>()
    const out: { key: string; label: string }[] = []
    for (const t of [...liveTools, ...dataTools]) {
      if (!seen.has(t.tags.en)) {
        seen.add(t.tags.en)
        out.push({ key: t.tags.en, label: loc(t.tags) })
      }
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveTools, dataTools, locale])

  const match = (t: Tool) => game === 'all' || t.tags.en === game
  const live = liveTools.filter(match)
  const data = dataTools.filter(match)

  // A featured tool gets the accent frame and spans the grid, because its only
  // discovery path is this hub (it can't win search on its own).
  const Card = ({ t }: { t: Tool }) => (
    <Link
      href={`/${locale}/${t.href}`}
      className={`group rounded-xl border p-5 transition-colors ${
        t.featured
          ? 'border-[#f0a832]/60 bg-[#f0a832]/5 hover:border-[#f0a832] hover:bg-[#f0a832]/10 md:col-span-2'
          : 'border-[#2d3d2d] bg-[#1a2e1a]/50 hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]'
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-[#2d5a27] px-2 py-0.5 text-xs text-[#8a9a7a]">{loc(t.tags)}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${t.featured ? 'bg-[#f0a832] text-[#0f1a0f]' : 'bg-[#f0a832]/10 text-[#f0a832]'}`}>
          {t.featured ? featuredLabel : liveLabel}
        </span>
      </div>
      <h3 className="mb-2 font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors">{loc(t.titles)}</h3>
      <p className="text-sm text-[#8a9a7a]">{loc(t.descs)}</p>
    </Link>
  )

  return (
    <div>
      {/* Game filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        <button
          onClick={() => setGame('all')}
          className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${game === 'all' ? 'bg-[#f0a832] text-[#0f1a0f] font-semibold' : 'border border-[#2d3d2d] text-[#8a9a7a] hover:text-[#e8dcc8]'}`}
        >
          {allLabel}
        </button>
        {games.map((g) => (
          <button
            key={g.key}
            onClick={() => setGame(g.key)}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${game === g.key ? 'bg-[#f0a832] text-[#0f1a0f] font-semibold' : 'border border-[#2d3d2d] text-[#8a9a7a] hover:text-[#e8dcc8]'}`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {live.length > 0 && (
        <section className="mb-14">
          <h2 className="mb-4 text-xl font-semibold text-[#e8dcc8]">{calcLabel}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {live.map((t) => (
              <Card key={t.key} t={t} />
            ))}
          </div>
        </section>
      )}

      {data.length > 0 && (
        <section className="mb-14">
          <h2 className="mb-1 text-xl font-semibold text-[#e8dcc8]">{dataLabel}</h2>
          <p className="mb-4 text-sm text-[#8a9a7a]">{dataSubtitle}</p>
          <div className="grid gap-4 md:grid-cols-2">
            {data.map((t) => (
              <Card key={t.key} t={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
