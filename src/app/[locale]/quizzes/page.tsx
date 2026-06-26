import Link from 'next/link'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const other = otherLocale(locale)
  const isZh = locale === 'zh'
  return {
    title: isZh
      ? '农场游戏测评 — Farm Game Hub'
      : 'Farming Game Quizzes — Farm Game Hub',
    description: isZh
      ? '和农场游戏社区互动——测出你的农场人格、找到最适合你的游戏，结果适合截图分享。'
      : 'Interactive farming game quizzes — find your farm personality, discover your perfect game, and share the results.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes`,
        [other]: `${BASE_URL}/${other}/quizzes`,
      },
    },
  }
}

const QUIZZES = [
  {
    slug: 'farm-personality',
    emoji: '🌾',
    titleZh: '你是哪种农场玩家？',
    titleEn: 'What Kind of Farmer Are You?',
    descZh: '6 个问题，测出你的农场游戏人格——效率农夫、美学农夫、探索农夫还是禅意农夫？附推荐游戏。',
    descEn: '6 questions to reveal your farming personality — Optimizer, Homesteader, Explorer, or Zen — plus personalized game picks.',
    tagZh: '人格测试',
    tagEn: 'Personality',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
  },
]

export default async function QuizzesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <p className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">
          {isZh ? '互动测评' : 'Interactive Quizzes'}
        </p>
        <h1 className="mb-4 text-4xl font-bold text-[#e8dcc8]">
          {isZh ? '你是哪种农场玩家？' : 'Find Your Farm Personality'}
        </h1>
        <p className="max-w-xl text-lg text-[#8a9a7a]">
          {isZh
            ? '和农场游戏社区互动——测出你的类型，找到共鸣，把结果分享给朋友。'
            : 'Connect with the farming game community — find your type, see what resonates, and share your results.'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {QUIZZES.map((quiz) => (
          <Link
            key={quiz.slug}
            href={`/${locale}/quizzes/${quiz.slug}`}
            className="group rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-7 transition-all hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
          >
            <div className="mb-4 text-4xl">{quiz.emoji}</div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-[#2d5a27] px-2.5 py-0.5 text-xs text-[#8a9a7a]">
                {isZh ? quiz.tagZh : quiz.tagEn}
              </span>
              <span className="text-xs text-[#4a5a4a]">
                {isZh ? quiz.timeZh : quiz.timeEn}
              </span>
            </div>
            <h2 className="mb-2 text-xl font-bold text-[#e8dcc8] transition-colors group-hover:text-[#f0a832]">
              {isZh ? quiz.titleZh : quiz.titleEn}
            </h2>
            <p className="text-sm leading-relaxed text-[#8a9a7a]">
              {isZh ? quiz.descZh : quiz.descEn}
            </p>
            <p className="mt-4 text-sm font-medium text-[#f0a832]">
              {isZh ? '开始测评 →' : 'Start quiz →'}
            </p>
          </Link>
        ))}

        {/* 更多测评 coming soon */}
        <div className="rounded-2xl border border-dashed border-[#2d3d2d] p-7 flex flex-col items-center justify-center text-center">
          <p className="text-3xl mb-3">🎯</p>
          <p className="font-semibold text-[#e8dcc8] mb-1">
            {isZh ? '更多测评即将上线' : 'More quizzes coming soon'}
          </p>
          <p className="text-sm text-[#8a9a7a]">
            {isZh ? '你想测什么？告诉我们 →' : 'What would you like to be quizzed on?'}
          </p>
          <a
            href="mailto:jsamgogo@gmail.com"
            className="mt-3 text-sm text-[#f0a832] hover:underline"
          >
            {isZh ? '发邮件告诉我们' : 'Let us know →'}
          </a>
        </div>
      </div>
    </div>
  )
}
