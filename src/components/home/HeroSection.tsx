import Link from 'next/link'
import { useLocale } from 'next-intl'

export function HeroSection() {
  const locale = useLocale()
  const isZh = locale === 'zh'
  const base = `/${locale}`

  return (
    <section className="relative overflow-hidden px-4 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a2e1a]/40 to-transparent" />
      <div className="relative mx-auto max-w-3xl">
        <p className="mb-4 text-xs uppercase tracking-widest text-[#f0a832]">
          {isZh ? '农场游戏爱好者的集结地' : 'The Farming Game Community'}
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-[#e8dcc8] md:text-5xl">
          {isZh
            ? '探索农场游戏，发现更健康的玩法'
            : 'Explore Farming Games. Play Healthier.'}
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[#8a9a7a]">
          {isZh
            ? 'Hay Day、星露谷、动物森友会的攻略和计算器工具；以及 TendFarm——一款用你的真实健康数据驱动的农场 App。'
            : 'Guides and tools for Hay Day, Stardew Valley, and Animal Crossing — plus TendFarm, a farming app powered by your real health data.'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={`${base}/tools`}
            className="rounded-lg bg-[#f0a832] px-6 py-2.5 text-sm font-semibold text-[#0f1a0f] transition-opacity hover:opacity-90"
          >
            {isZh ? '探索游戏工具 →' : 'Explore Game Tools →'}
          </Link>
          <Link
            href={`${base}/philosophy`}
            className="rounded-lg border border-[#f0a832]/40 px-6 py-2.5 text-sm font-semibold text-[#f0a832] transition-colors hover:bg-[#f0a832]/10"
          >
            {isZh ? '了解 TendFarm App →' : 'About TendFarm App →'}
          </Link>
        </div>
      </div>
    </section>
  )
}
