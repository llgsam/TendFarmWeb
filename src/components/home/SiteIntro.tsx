import Link from 'next/link'
import { useLocale } from 'next-intl'

export function SiteIntro() {
  const locale = useLocale()
  const isZh = locale === 'zh'
  const base = `/${locale}`

  return (
    <section className="px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">

        {/* 游戏社区 */}
        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a] p-7">
          <p className="mb-2 text-xs uppercase tracking-widest text-[#8a9a7a]">
            {isZh ? '农场游戏爱好者' : 'For Farming Game Fans'}
          </p>
          <h2 className="mb-3 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '攻略 · 工具 · 社区' : 'Guides · Tools · Community'}
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
            {isZh
              ? 'Hay Day 作物利润计算器、星露谷物语种植策略、动物森友会攻略，以及农场人格测试——帮你玩得更明白，找到真正适合你的农场游戏。'
              : 'Hay Day crop calculators, Stardew Valley planting strategy, Animal Crossing guides, and a farming personality quiz — play smarter and find the game that fits you.'}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`${base}/tools`}
              className="rounded-lg bg-[#2d3d2d] px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:bg-[#3d4d3d]"
            >
              {isZh ? '🔧 工具集' : '🔧 Tools'}
            </Link>
            <Link
              href={`${base}/guides`}
              className="rounded-lg bg-[#2d3d2d] px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:bg-[#3d4d3d]"
            >
              {isZh ? '📖 游戏攻略' : '📖 Guides'}
            </Link>
          </div>
        </div>

        {/* TendFarm App */}
        <div className="rounded-2xl border border-[#f0a832]/25 bg-[#f0a832]/5 p-7">
          <p className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">TendFarm App</p>
          <h2 className="mb-3 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '用健康数据，养一座真实的农场' : 'Grow a Real Farm with Your Health Data'}
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
            {isZh
              ? '睡得好，农场收成更充盈；步数多，作物提前成熟。TendFarm 是一款 Apple Watch 健康农场 App，正在开发中，开放候补名单。'
              : 'Sleep well, harvest more. Walk more, crops ripen early. TendFarm is an Apple Watch health farming app in development — waitlist open now.'}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`${base}/philosophy`}
              className="rounded-lg bg-[#f0a832]/15 px-4 py-2 text-sm font-medium text-[#f0a832] transition-colors hover:bg-[#f0a832]/25"
            >
              {isZh ? '了解产品 →' : 'Learn more →'}
            </Link>
            <Link
              href={`${base}/#waitlist`}
              className="rounded-lg bg-[#f0a832] px-4 py-2 text-sm font-semibold text-[#0f1a0f] transition-opacity hover:opacity-90"
            >
              {isZh ? '加入候补名单' : 'Join Waitlist'}
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
