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
      ? '农场游戏测评 — 找到你的游戏类型 | Farm Game Hub'
      : 'Farming Game Quizzes — Find Your Perfect Game | Farm Game Hub',
    description: isZh
      ? '农场游戏互动测评：测出你的农场人格、找到最适合你的游戏，结果适合截图分享。'
      : 'Interactive farming game quizzes — discover your farming personality, find the perfect game for your playstyle, and share your results.',
    keywords: isZh
      ? ['农场游戏测评', '农场人格测试', '哪款农场游戏适合我', '星露谷 动物森友会']
      : ['farming game quiz', 'which farming game should i play', 'farming game personality test', 'best farming game for me'],
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
    slug: 'which-farming-game',
    emoji: '🎮',
    titleZh: '哪款农场游戏最适合你？',
    titleEn: 'Which Farming Game Should You Play?',
    descZh: '6 个问题，从星露谷、动物森友会、Palia、模拟农场等热门游戏中，精准推荐最适合你的那一款。',
    descEn: '6 questions to match you with the perfect farming game — Stardew Valley, Animal Crossing, Palia, Farming Simulator, and more.',
    tagZh: '游戏推荐',
    tagEn: 'Game Finder',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
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
    isNew: false,
  },
]

const FAQ_EN = [
  {
    q: 'What are the best farming games right now?',
    a: "The top farming games in 2025 are Stardew Valley (PC/Switch/Mobile), Animal Crossing: New Horizons (Switch), Palia (PC/Switch, free), Hay Day (Mobile), and Farming Simulator 25 (PC/Console). Each excels in a different category.",
  },
  {
    q: 'Is Stardew Valley still worth playing in 2025?',
    a: "Yes — Stardew Valley remains the gold standard farming RPG. The 1.6 update added significant new content, and it's still actively enjoyed by millions. At ~$15, it's one of the best value games ever made.",
  },
  {
    q: 'What farming game is best for relaxation?',
    a: 'Animal Crossing: New Horizons and Cozy Grove are the most relaxing farming games — no fail states, no time pressure, gentle pacing. Palia is also extremely cozy for those who prefer online multiplayer.',
  },
]

const FAQ_ZH = [
  {
    q: '2025 年最好玩的农场游戏有哪些？',
    a: '2025 年最受好评的农场游戏包括：星露谷物语（PC/Switch/手机）、动物森友会（Switch）、Palia（PC/Switch，免费）、Hay Day（手机）、模拟农场 25（PC/主机）。每款都在不同方向上是各自品类的最佳。',
  },
  {
    q: '星露谷物语 2025 年还值得玩吗？',
    a: '非常值得。星露谷物语经过 1.6 更新后内容更丰富，仍然是最受欢迎的农场 RPG。约 100 元人民币的价格，被公认为史上性价比最高的游戏之一。',
  },
  {
    q: '哪款农场游戏最适合放松减压？',
    a: '动物森友会和 Cozy Grove 是最适合放松的农场游戏——没有失败机制、没有时间压力、节奏极其温和。喜欢多人联机的话，Palia 也是极其治愈的选择。',
  },
]

export default async function QuizzesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'
  const faq = isZh ? FAQ_ZH : FAQ_EN

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-12">
          <p className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">
            {isZh ? '互动测评' : 'Interactive Quizzes'}
          </p>
          <h1 className="mb-4 text-4xl font-bold text-[#e8dcc8]">
            {isZh ? '找到你的农场游戏类型' : 'Find Your Farming Game'}
          </h1>
          <p className="max-w-xl text-lg text-[#8a9a7a]">
            {isZh
              ? '测出你的农场玩家类型，找到最适合你的游戏——把结果分享给朋友，看看你们是不是同类农夫。'
              : 'Discover your farming playstyle and find the game that fits you best — then share your results to see if your friends are the same type of farmer.'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {QUIZZES.map((quiz) => (
            <Link
              key={quiz.slug}
              href={`/${locale}/quizzes/${quiz.slug}`}
              className="group relative rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-7 transition-all hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
            >
              {quiz.isNew && (
                <span className="absolute right-4 top-4 rounded-full bg-[#f0a832] px-2 py-0.5 text-xs font-semibold text-[#0f1a0f]">
                  {isZh ? '新上线' : 'NEW'}
                </span>
              )}
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

          {/* Coming soon */}
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

        {/* FAQ Section for SEO/GEO */}
        <div className="mt-20">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于农场游戏的常见问题' : 'Farming Game FAQ'}
          </h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-5">
                <h3 className="mb-2 font-semibold text-[#e8dcc8]">{q}</h3>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
