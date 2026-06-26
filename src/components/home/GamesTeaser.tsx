import Link from 'next/link'
import { useLocale } from 'next-intl'

const FEATURED = [
  { emoji: '🌻', nameZh: 'Hay Day', nameEn: 'Hay Day', tagZh: '休闲手游', tagEn: 'Casual Mobile', color: '#f0a832' },
  { emoji: '🌱', nameZh: '星露谷物语', nameEn: 'Stardew Valley', tagZh: 'RPG / PC', tagEn: 'RPG / PC', color: '#7bc67e' },
  { emoji: '🏝️', nameZh: '动物森友会', nameEn: 'Animal Crossing', tagZh: 'Switch', tagEn: 'Switch', color: '#5db8b2' },
  { emoji: '🚜', nameZh: 'Farming Simulator', nameEn: 'Farming Simulator', tagZh: '模拟 / PC', tagEn: 'Simulation / PC', color: '#8a9a7a' },
]

export function GamesTeaser() {
  const locale = useLocale()
  const isZh = locale === 'zh'
  const base = `/${locale}`

  return (
    <section className="px-4 py-16 bg-[#0f1a0f]/50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#e8dcc8]">
              {isZh ? '热门农场游戏' : 'Popular Farming Games'}
            </h2>
            <p className="mt-1 text-sm text-[#8a9a7a]">
              {isZh ? '20+ 款游戏，找到最适合你的那一款' : '20+ games — find the one that fits you'}
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
          {FEATURED.map((game) => (
            <Link
              key={game.nameEn}
              href={`${base}/games`}
              className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5 transition-all hover:border-[#f0a832]/30 hover:bg-[#1a2e1a]"
            >
              <div className="mb-3 text-3xl">{game.emoji}</div>
              <h3 className="font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors text-sm">
                {isZh ? game.nameZh : game.nameEn}
              </h3>
              <p className="mt-1 text-xs text-[#8a9a7a]">
                {isZh ? game.tagZh : game.tagEn}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
