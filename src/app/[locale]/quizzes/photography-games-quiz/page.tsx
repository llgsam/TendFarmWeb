import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { PhotographyGamesQuiz } from '@/components/tools/PhotographyGamesQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh'

  return {
    title: isZh
      ? '摄影游戏推荐测验：你适合《新宝可梦随手拍》《Toem》《Alba》还是《Umurangi》？'
      : 'Which Photography Game Is Right for You? New Pokémon Snap, Toem, Alba, or Umurangi',
    description: isZh
      ? '6道题帮你找出最适合的摄影游戏：《新宝可梦随手拍》《Toem》《Alba》《Umurangi Generation》，从生物记录到城市影像，总有一款为你而生。'
      : '6 questions to match you with the perfect photography game — New Pokémon Snap, Toem, Alba: A Wildlife Adventure, or Umurangi Generation. Find your lens.',
    keywords: isZh
      ? [
          '摄影游戏推荐',
          '新宝可梦随手拍值得买吗',
          'Toem游戏推荐',
          'Alba野生动物历险记好玩吗',
          'Umurangi Generation评测',
          '拍照游戏Switch',
          '休闲摄影游戏2024',
          'cozy游戏推荐测验',
        ]
      : [
          'new pokemon snap worth it',
          'toem game worth it',
          'alba wildlife adventure worth it',
          'umurangi generation worth it',
          'best photography games switch',
          'best photography games pc',
          'photography game recommendation quiz',
          'cozy photography games',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/photography-games-quiz`,
      languages: buildLanguageAlternates('/quizzes/photography-games-quiz'),
    },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh'

  const faqItems = isZh
    ? [
        {
          q: '《新宝可梦随手拍》适合没玩过宝可梦的玩家吗？',
          a: '完全适合。《新宝可梦随手拍》不需要任何宝可梦系列前作经验，剧情简单独立，核心玩法是拍出好照片，而不是收集培育对战。即使你对宝可梦完全陌生，看到皮卡丘对着镜头扭头的瞬间也会忍不住微笑。',
        },
        {
          q: '《Toem》有中文版吗，游戏难度高吗？',
          a: '《Toem》支持简体中文界面，阅读和操作没有语言障碍。游戏难度极低，没有战斗和惩罚机制，所有谜题都基于拍照和观察，适合任何年龄段的玩家。通关约需4-5小时，是完美的一次性休闲体验。',
        },
        {
          q: '《Alba: 野生动物历险记》在手机上好玩吗？',
          a: '手机版体验非常流畅，触屏操作直觉自然，拍照和互动都很顺手。画质与PC版相当，且手机版加入了Apple Arcade，可通过会员免费游玩。对于喜欢碎片时间随手玩的玩家来说，手机是很好的平台选择。',
        },
        {
          q: '《Umurangi Generation》对新手玩家友好吗？',
          a: '《Umurangi Generation》没有传统意义上的"难度"——游戏没有战斗、没有时间限制、没有失败判定。挑战在于理解摄影构图和创意表达，任务是拍摄指定目标，完成后可以自由创作。喜欢探索和自我表达的玩家会很快上手，追求明确目标的玩家可能需要一点适应时间。',
        },
        {
          q: '哪款摄影游戏最适合 cozy 游戏爱好者？',
          a: '如果你喜欢农场和休闲游戏的放松感，《Toem》是最直接的推荐——它的节奏、画风和情感基调与 cozy 游戏高度契合。《Alba》也是很好的选择，目标明确、充满正能量。《新宝可梦随手拍》适合喜欢宝可梦系列的 cozy 玩家。《Umurangi Generation》气氛较为沉郁，更适合想要突破舒适区的玩家。',
        },
      ]
    : [
        {
          q: 'Is New Pokémon Snap worth it in 2025?',
          a: "New Pokémon Snap absolutely holds up. With over 200 Pokémon across 24 courses, the game has more content than the original N64 classic ever had, and the depth of its photography scoring system keeps completionists busy long after the credits roll. If you enjoy patient, rewarding gameplay loops and have any affection for the Pokémon franchise, it's one of the best Nintendo Switch exclusives in the exploration genre.",
        },
        {
          q: 'How long does Toem take to beat?',
          a: "Most players complete Toem's main story in 3-4 hours. A completionist run — photographing every subject, filling the full stamp book, and finding all secret hats — takes roughly 5-6 hours. It's intentionally short and designed to feel satisfying as a complete experience rather than an ongoing commitment.",
        },
        {
          q: 'Is Alba: A Wildlife Adventure good for kids?',
          a: "Alba is one of the best games ever made for children. It has no violence, no scary content, and a genuinely hopeful message about environmental activism. The photography is accessible and low-pressure, and kids as young as 5-6 can enjoy it with minimal guidance. It also sparks real-world curiosity about wildlife and nature, which makes it a rare educational experience that doesn't feel like homework.",
        },
        {
          q: 'Is Umurangi Generation available on Nintendo Switch?',
          a: "Yes — Umurangi Generation is available on Nintendo Switch, including the Macro DLC which adds new lenses and levels. The Switch version runs well and the portability actually suits the game's street-photography vibe. The base game and DLC can typically be found at a discount during Nintendo eShop sales.",
        },
        {
          q: 'What is the best photography game for people who love cozy games?',
          a: "For cozy game fans, Toem and Alba are the strongest picks. Toem's black-and-white aesthetic, heartfelt writing, and zero-stress design sit right alongside cozy classics like A Short Hike. Alba is similarly warm and purposeful, with an optimistic worldview that cozy game fans love. New Pokémon Snap is excellent for fans who already love the Pokémon brand. Umurangi Generation is darker in tone and better suited to players ready to step outside the cozy genre.",
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
      ? '摄影游戏推荐测验：你适合哪款？'
      : 'Which Photography Game Is Right for You?',
    description: isZh
      ? '6道题帮你找出最适合的摄影游戏：新宝可梦随手拍、Toem、Alba或Umurangi Generation。'
      : '6 questions to match you with the perfect photography game: New Pokémon Snap, Toem, Alba, or Umurangi Generation.',
    url: `${BASE_URL}/${locale}/quizzes/photography-games-quiz`,
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
          <div className="mb-3 text-5xl">📷</div>
          <h1 className="mb-3 text-2xl font-bold leading-tight md:text-3xl">
            {isZh
              ? '摄影游戏推荐测验：你适合哪款？'
              : 'Which Photography Game Is Right for You?'}
          </h1>
          <p className="text-sm text-[#8a9a7a]">
            {isZh
              ? '新宝可梦随手拍 · Toem · Alba · Umurangi Generation — 6道题精准推荐'
              : 'New Pokémon Snap · Toem · Alba · Umurangi Generation — 6 questions'}
          </p>
        </div>

        <PhotographyGamesQuiz locale={locale} />

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

        <RelatedQuizzes currentSlug="photography-games-quiz" locale={locale} />
      </div>
    </main>
  )
}
