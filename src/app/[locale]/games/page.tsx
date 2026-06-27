import Link from 'next/link'
import type { Metadata } from 'next'
import { GAMES, getFeaturedGames, PLATFORM_LABELS, STYLE_LABELS_ZH, STYLE_LABELS_EN } from '@/lib/games'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  return {
    title: isZh
      ? '农场游戏大全 2025 — Farming Game Hub'
      : 'All Farming Games 2025 — Farming Game Hub',
    description: isZh
      ? '全球农场游戏大全：Hay Day、星露谷物语、动物森友会、Farming Simulator 等 15+ 款游戏介绍、平台与风格分类，帮你找到最适合自己的农场游戏。'
      : 'The complete list of farming games — Hay Day, Stardew Valley, Animal Crossing, Farming Simulator, and 15+ more. Find your perfect farming game by platform and style.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/games`,
      languages: buildLanguageAlternates('/games'),
    },
  }
}

export default async function GamesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'
  const styleLabels = isZh ? STYLE_LABELS_ZH : STYLE_LABELS_EN

  const featured = getFeaturedGames()
  const others = GAMES.filter((g) => !g.featured)

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">
          {isZh ? '全球农场游戏' : 'Farming Games Directory'}
        </p>
        <h1 className="mb-4 text-4xl font-bold text-[#e8dcc8]">
          {isZh ? '农场游戏大全' : 'All Farming Games'}
        </h1>
        <p className="max-w-xl text-lg text-[#8a9a7a]">
          {isZh
            ? '从休闲手游到硬核模拟，一份帮你找到下一款农场游戏的完整列表。'
            : 'From casual mobile games to hardcore simulations — the complete guide to finding your next farming game.'}
        </p>
      </div>

      {/* Featured: deep-coverage games */}
      <section className="mb-14">
        <h2 className="mb-5 text-sm uppercase tracking-widest text-[#8a9a7a]">
          {isZh ? '深度覆盖游戏 — 有详情页、工具和攻略' : 'Featured — Full Detail Pages, Tools & Guides'}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((game) => (
            <Link
              key={game.slug}
              href={`/${locale}/games/${game.slug}`}
              className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5 hover:border-[#f0a832]/30 transition-colors"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{game.emoji}</span>
                  <div>
                    <h3 className="font-bold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors">
                      {isZh ? game.nameZh : game.nameEn}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {game.platforms.map((p) => (
                        <span key={p} className="rounded bg-[#2d3d2d] px-1.5 py-0.5 text-[10px] text-[#8a9a7a]">
                          {PLATFORM_LABELS[p]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-[#8a9a7a]">
                {isZh ? game.descZh : game.descEn}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {game.styles.map((s) => (
                  <span key={s} className="rounded-full border border-[#2d3d2d] px-2 py-0.5 text-[11px] text-[#8a9a7a]">
                    {styleLabels[s]}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 items-center justify-between">
                <div className="flex gap-3">
                  {game.hasTools && (
                    <span className="text-xs text-[#f0a832]">
                      🔧 {isZh ? '计算器' : 'Calculator'}
                    </span>
                  )}
                  {game.hasGuides && (
                    <span className="text-xs text-[#f0a832]">
                      📖 {isZh ? '攻略' : 'Guides'}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#8a9a7a] group-hover:text-[#f0a832] transition-colors">
                  {isZh ? '查看详情 →' : 'View details →'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* More games */}
      <section>
        <h2 className="mb-5 text-sm uppercase tracking-widest text-[#8a9a7a]">
          {isZh ? '更多农场游戏' : 'More Farming Games'}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((game) => (
            <Link
              key={game.slug}
              href={`/${locale}/games/${game.slug}`}
              className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-4 hover:border-[#f0a832]/30 transition-colors"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">{game.emoji}</span>
                <span className="font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors text-sm">
                  {isZh ? game.nameZh : game.nameEn}
                </span>
              </div>
              <p className="mb-2 text-xs leading-relaxed text-[#8a9a7a]">
                {isZh ? game.descZh : game.descEn}
              </p>
              <div className="flex flex-wrap gap-1">
                {game.platforms.map((p) => (
                  <span key={p} className="rounded bg-[#2d3d2d] px-1.5 py-0.5 text-[10px] text-[#8a9a7a]">
                    {PLATFORM_LABELS[p]}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Submit a game */}
      <div className="mt-12 rounded-xl border border-dashed border-[#2d3d2d] p-6 text-center">
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '还有我们没收录的好游戏？'
            : 'Know a great farming game we missed?'}
          {' '}
          <a href="mailto:jsamgogo@gmail.com" className="text-[#f0a832] hover:underline">
            {isZh ? '告诉我们 →' : 'Let us know →'}
          </a>
        </p>
      </div>
    </div>
  )
}
