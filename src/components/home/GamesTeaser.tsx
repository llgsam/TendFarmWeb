import Link from 'next/link'
import { useLocale } from 'next-intl'
import { getFeaturedGames, getStyleLabels, getGameName } from '@/lib/games'
import { GameIcon } from '@/components/GameIcon'

function getLoc(locale: string, zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW ?? zh
  if (locale === 'ja') return ja ?? en
  if (locale === 'ko') return ko ?? en
  if (locale === 'de') return de ?? en
  return en
}

export function GamesTeaser() {
  const locale = useLocale()
  const base = `/${locale}`
  const styleLabels = getStyleLabels(locale)
  const featured = getFeaturedGames()

  return (
    <section className="px-4 py-16 bg-[#0f1a0f]/50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#e8dcc8]">
              {getLoc(locale, '热门农场游戏', 'Popular Farming Games', '熱門農場遊戲', '人気の農場ゲーム', '인기 농장 게임', 'Beliebte Farmspiele')}
            </h2>
            <p className="mt-1 text-sm text-[#8a9a7a]">
              {getLoc(locale, '15+ 款游戏，找到最适合你的那一款', '15+ games — find the one that fits you', '15+ 款遊戲，找到最適合你的那一款', '15以上のゲームから、あなたにぴったりの一作を', '15개 이상의 게임 중 당신에게 맞는 게임 찾기', '15+ Spiele — finde das passende für dich')}
            </p>
          </div>
          <Link
            href={`${base}/games`}
            className="text-sm text-[#f0a832] hover:underline whitespace-nowrap"
          >
            {getLoc(locale, '查看全部 →', 'View all →', '查看全部 →', 'すべて見る →', '전체 보기 →', 'Alle ansehen →')}
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((game) => (
            <Link
              key={game.slug}
              href={`${base}/games/${game.slug}`}
              className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5 transition-all hover:border-[#f0a832]/30 hover:bg-[#1a2e1a]"
            >
              <div className="mb-3"><GameIcon slug={game.slug} size={32} /></div>
              <h3 className="font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors text-sm">
                {getGameName(game, locale)}
              </h3>
              <p className="mt-1 text-xs text-[#8a9a7a]">
                {game.styles.map((s) => styleLabels[s]).join(' · ')}
              </p>
              <p className="mt-2 text-xs text-[#8a9a7a]/60 group-hover:text-[#f0a832]/60 transition-colors">
                {getLoc(locale, '查看详情 →', 'View →', '查看詳情 →', '詳細 →', '자세히 →', 'Ansehen →')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
