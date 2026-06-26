import { FarmPersonalityQuiz } from '@/components/tools/FarmPersonalityQuiz'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'
import Link from 'next/link'

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
      ? '你是哪种农场玩家？测出你的农场游戏人格'
      : 'What Kind of Farmer Are You? Farm Game Personality Quiz',
    description: isZh
      ? '6 个问题，测出你的农场游戏人格：效率农夫、美学农夫、探索农夫还是禅意农夫？并推荐最适合你的游戏。'
      : '6 questions to reveal your farming game personality — Optimizer, Homesteader, Explorer, or Zen Farmer — plus personalized game recommendations.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/farm-personality`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes/farm-personality`,
        [other]: `${BASE_URL}/${other}/quizzes/farm-personality`,
      },
    },
  }
}

export default async function FarmPersonalityPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/quizzes`} className="hover:text-[#e8dcc8]">
          {isZh ? '测评' : 'Quizzes'}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">
          {isZh ? '农场人格测试' : 'Farm Personality Quiz'}
        </span>
      </nav>

      <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
        <FarmPersonalityQuiz locale={locale} />
      </div>

      <p className="mt-6 text-center text-xs text-[#8a9a7a]">
        {isZh
          ? '你的选择完全匿名，帮助我们了解农场玩家的偏好。'
          : 'Your answers are anonymous and help us understand what farmers want.'}
      </p>
    </div>
  )
}
