import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { DarkAtmosphericGamesQuiz } from '@/components/tools/DarkAtmosphericGamesQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh'

  return {
    title: isZh
      ? '黑暗大气游戏推荐测验：小小梦魇2、心跳文学部、Oxenfree II 还是 Signalis？'
      : 'Which Dark Atmospheric Game Is Right for You? Little Nightmares 2, DDLC, Oxenfree II, or Signalis',
    description: isZh
      ? '6道题帮你找出最适合的黑暗大气游戏：《小小梦魇2》《心跳文学部》《Oxenfree II》《Signalis》——从氛围恐怖到元叙事到哲学科幻，总有一款为你而生。'
      : '6 questions to match you with the perfect dark atmospheric game — Little Nightmares II, Doki Doki Literature Club, Oxenfree II: Lost Signals, or Signalis. Find your darkness.',
    keywords: isZh
      ? [
          '黑暗大气游戏推荐',
          '小小梦魇2值得买吗',
          '心跳文学部评测',
          'Oxenfree2好玩吗',
          'Signalis值得买吗',
          '恐怖游戏推荐2024',
          'cozy游戏黑暗系',
          '心理恐怖游戏推荐',
          '暗黑系冒险游戏',
        ]
      : [
          'little nightmares 2 worth it',
          'doki doki literature club worth it',
          'oxenfree 2 worth it',
          'signalis worth it',
          'best dark atmospheric games',
          'dark games for cozy gamers',
          'psychological horror games pc switch',
          'best horror games for beginners',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/dark-atmospheric-games-quiz`,
      languages: buildLanguageAlternates('/quizzes/dark-atmospheric-games-quiz'),
    },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh'

  const faqItems = isZh
    ? [
        {
          q: '《小小梦魇2》适合不喜欢恐怖游戏的玩家吗？',
          a: '如果你不排斥大气压迫感和偶尔的惊吓，《小小梦魇2》是非常适合恐怖游戏新手的选择。游戏没有血腥内容，主要依靠视觉氛围和音效营造恐惧，难度也相对亲切。许多通常不玩恐怖游戏的 cozy 玩家都能顺利通关并深受震撼。',
        },
        {
          q: '《心跳文学部》真的有那么恐怖吗？',
          a: '《心跳文学部》的恐怖与传统恐怖游戏完全不同——它是心理层面的，针对视觉小说读者群体量身定制的元叙事恐惧。游戏不依赖跳出来的怪物或血腥画面，而是让你对"游戏本身"产生不安感。它附带抑郁和自伤的内容警告，请认真对待；但若你状态良好，这是互动叙事史上最具创意的体验之一。',
        },
        {
          q: '《Oxenfree II》需要玩过第一部才能理解吗？',
          a: '不需要。《Oxenfree II》有完整独立的剧情，完全可以作为新手入门作品游玩。当然，玩过第一部的玩家会更能欣赏续集中的世界观细节和前作彩蛋，但这不影响第一次接触的体验质量。如果你有时间，先体验第一部会让第二部更丰富，但两部都可以单独成立。',
        },
        {
          q: '《Signalis》的难度对普通玩家来说合适吗？',
          a: '《Signalis》是四款中难度最高的，属于真实的生存恐怖：坦克操控、六格背包管理、有限弹药和真实危险。如果你对经典生化危机或寂静岭式游戏有经验，会很快上手；如果是新手，前一两小时会有适应期，但坚持下去，操控很快变得自然，而那份克制与紧张正是体验的核心。游戏提供简单难度选项。',
        },
        {
          q: '哪款黑暗游戏最适合 cozy 游戏爱好者入门体验？',
          a: '对于 cozy 游戏爱好者来说，《Oxenfree II》是最温和的起点——没有战斗，没有游戏结束画面，散步式节奏，故事以人物情感为核心。《小小梦魇2》次之，平台难度亲切，更像是视觉体验之旅。《心跳文学部》完全免费且以阅读为主，但心理冲击较大。《Signalis》留给对生存恐怖已有心理准备的玩家。',
        },
      ]
    : [
        {
          q: 'Is Little Nightmares II worth it?',
          a: 'Little Nightmares II is absolutely worth it for anyone drawn to atmospheric storytelling and visual design. The game runs about 5-7 hours, has no bloat, and every chapter delivers something genuinely memorable. It is one of the most visually striking horror platformers ever made, and the ending will stay with you. It is also frequently on sale across all platforms, making it an easy recommendation at a discount.',
        },
        {
          q: 'Is Doki Doki Literature Club worth playing in 2025?',
          a: "Yes — DDLC's innovations in meta-narrative horror remain as effective in 2025 as they were at launch. The base game is free on Steam, which makes it a zero-risk recommendation. DDLC Plus adds new side stories that flesh out the characters and is worth purchasing if you want to spend more time in that world. Just go in as blind as possible and let the game do what it does.",
        },
        {
          q: 'Is Oxenfree 2 worth it and do I need to play the first game?',
          a: "Oxenfree II: Lost Signals is worth it for players who enjoy character-driven supernatural mysteries with minimal combat. You do not need to have played the first Oxenfree — the sequel stands on its own — but prior knowledge enriches the lore. If you have Netflix, the mobile version is free and excellent. The game takes 6-8 hours and has multiple endings shaped by your dialogue choices throughout.",
        },
        {
          q: 'Is Signalis worth it for someone new to survival horror?',
          a: 'Signalis is worth it, but it is the most demanding of these four games. If you have no survival horror experience, expect a brief adjustment period with the tank controls and inventory limits. The game offers an easy difficulty option that reduces combat pressure without diminishing the story. The narrative and artistic vision are among the best in indie games this decade, and the emotional impact of the ending is rare.',
        },
        {
          q: 'What are the best dark games for players who normally only play cozy games?',
          a: "For cozy gamers stepping into darker territory, the ideal entry point is Oxenfree II — it has no combat, no game-over screens, and its horror is gentle and emotional rather than threatening. Little Nightmares II is second-best: the platforming is accessible and the game is more visual experience than mechanical challenge. DDLC is free and mostly reading-based but delivers a significant psychological shock. Signalis is best saved for when you're ready to commit to real survival horror.",
        },
      ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh
      ? '黑暗大气游戏推荐测验：你适合哪款？'
      : 'Which Dark Atmospheric Game Is Right for You?',
    description: isZh
      ? '6道题帮你找出最适合的黑暗大气游戏：小小梦魇2、心跳文学部、Oxenfree II 或 Signalis。'
      : '6 questions to match you with Little Nightmares II, Doki Doki Literature Club, Oxenfree II, or Signalis.',
    url: `${BASE_URL}/${locale}/quizzes/dark-atmospheric-games-quiz`,
    educationalAlignment: {
      '@type': 'AlignmentObject',
      educationalFramework: 'Game Recommendation',
    },
  }

  return (
    <main className="min-h-screen bg-[#0f1a0f] px-4 py-12 text-[#e8dcc8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">🌑</div>
          <h1 className="mb-3 text-2xl font-bold leading-tight md:text-3xl">
            {isZh
              ? '黑暗大气游戏推荐测验：你适合哪款？'
              : 'Which Dark Atmospheric Game Is Right for You?'}
          </h1>
          <p className="text-sm text-[#8a9a7a]">
            {isZh
              ? '小小梦魇2 · 心跳文学部 · Oxenfree II · Signalis — 6道题精准推荐'
              : 'Little Nightmares II · Doki Doki Literature Club · Oxenfree II · Signalis — 6 questions'}
          </p>
        </div>

        <DarkAtmosphericGamesQuiz locale={locale} />

        <section className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '常见问题' : 'Frequently Asked Questions'}
          </h2>
          <div className="flex flex-col gap-4">
            {faqItems.map((item, i) => (
              <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 p-4">
                <h3 className="mb-2 font-semibold text-[#f0a832]">{item.q}</h3>
                <p className="text-sm leading-relaxed text-[#c8bca8]">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedQuizzes currentSlug="dark-atmospheric-games-quiz" locale={locale} />
      </div>
    </main>
  )
}
