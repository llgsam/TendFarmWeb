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
            ? '发现你的下一款农场游戏'
            : 'Find Your Next Farming Game'}
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[#8a9a7a]">
          {isZh
            ? '游戏推荐、玩家工具、互动测评——Hay Day、星露谷、动森，以及更多农场游戏，一站搞定。'
            : 'Game recommendations, player tools, and interactive quizzes — for Hay Day, Stardew Valley, Animal Crossing, and 20+ more.'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={`${base}/games`}
            className="rounded-lg bg-[#f0a832] px-6 py-2.5 text-sm font-semibold text-[#0f1a0f] transition-opacity hover:opacity-90"
          >
            {isZh ? '🎮 浏览游戏大全 →' : '🎮 Browse All Games →'}
          </Link>
          <Link
            href={`${base}/quizzes`}
            className="rounded-lg border border-[#f0a832]/40 px-6 py-2.5 text-sm font-semibold text-[#f0a832] transition-colors hover:bg-[#f0a832]/10"
          >
            {isZh ? '🌾 测测你的农场人格 →' : '🌾 Take a Farm Quiz →'}
          </Link>
        </div>
      </div>
    </section>
  )
}
