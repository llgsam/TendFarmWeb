import Link from 'next/link'
import { useLocale } from 'next-intl'
import { getFeaturedGames, STYLE_LABELS_ZH, STYLE_LABELS_EN } from '@/lib/games'

export function GamesTeaser() {
  const locale = useLocale()
  const isZh = locale === 'zh'
  const base = `/${locale}`
  const styleLabels = isZh ? STYLE_LABELS_ZH : STYLE_LABELS_EN
  const featured = getFeaturedGames()

  return (
    <section className="px-4 py-16 bg-[#0f1a0f]/50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#e8dcc8]">
              {isZh ? '热门农场游戏' : 'Popular Farming Games'}
            </h2>
            <p className="mt-1 text-sm text-[#8a9a7a]">
              {isZh ? '15+ 款游戏，找到最适合你的那一款' : '15+ games — find the one that fits you'}
            </p>
          </div>
          <Link
            href={`${base}/games`}
            className="text-sm text-[#f0a832] hover:underline whitespace-nowrap"
          >
            {isZh ? '查看全部 →' : 'View all →'}
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((game) => (
            <Link
              key={game.slug}
              href={`${base}/games/${game.slug}`}
              className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5 transition-all hover:border-[#f0a832]/30 hover:bg-[#1a2e1a]"
            >
              <div className="mb-3 text-3xl">{game.emoji}</div>
              <h3 className="font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors text-sm">
                {isZh ? game.nameZh : game.nameEn}
              </h3>
              <p className="mt-1 text-xs text-[#8a9a7a]">
                {game.styles.map((s) => styleLabels[s]).join(' · ')}
              </p>
              <p className="mt-2 text-xs text-[#8a9a7a]/60 group-hover:text-[#f0a832]/60 transition-colors">
                {isZh ? '查看详情 →' : 'View →'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
