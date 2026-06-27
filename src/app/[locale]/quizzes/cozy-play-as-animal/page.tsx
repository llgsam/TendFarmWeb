import { Metadata } from 'next'
import { CozyAnimalGamesQuiz } from '@/components/tools/CozyAnimalGamesQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import { BASE_URL } from '@/lib/config'

const otherLocale = { zh: 'en', en: 'zh' } as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-play-as-animal`
  const alt = `${BASE_URL}/${otherLocale[locale as 'zh' | 'en']}/quizzes/cozy-play-as-animal`

  return {
    title: isZh
      ? '你该玩哪款以动物为主角的 Cozy 游戏？Stray / Cattails / Snufkin | TendFarm'
      : 'Which Game Where You Play as an Animal? Stray, Cattails, Snufkin | TendFarm',
    description: isZh
      ? '6 个问题，从 Stray（赛博猫）、Cattails：野木故事（猫族领地）、Snufkin（姆明谷）、Pupperazzi（狗狗摄影）中找到你的动物主角游戏。'
      : 'Stray, Cattails: Wildwood Story, Snufkin: Melody of Moominvalley, or Pupperazzi — 6 questions to find which game where you play as an animal is perfect for you.',
    keywords: [
      'is stray worth playing',
      'stray game review worth it',
      'stray game how long to beat',
      'cattails wildwood story review worth it',
      'snufkin melody of moominvalley review worth it',
      'pupperazzi game review worth it',
      'cozy games where you play as an animal',
      'games where you are a cat',
      'games where you are a dog',
      'games like stray',
      'moomin game worth it',
      'best cozy games where you play as animal PC switch 2024',
    ],
    alternates: {
      canonical,
      languages: {
        'zh-CN': canonical,
        'en-US': alt,
      },
    },
    openGraph: {
      title: isZh
        ? '你该玩哪款以动物为主角的 Cozy 游戏？'
        : 'Which Game Where You Play as an Animal Should You Try?',
      description: isZh
        ? 'Stray、Cattails、Snufkin 或 Pupperazzi——6 个问题找到你的动物主角游戏。'
        : 'Stray, Cattails, Snufkin, or Pupperazzi — 6 questions to find your perfect animal protagonist game.',
      url: canonical,
    },
  }
}

export default async function CozyPlayAsAnimalPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-play-as-animal`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Stray worth playing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — Stray (2022) is one of the most acclaimed games of its year. You play as a stray cat in a cyberpunk underground city where only robots remain. You meow, scratch walls, knock things off shelves, and explore neon-lit alleys from cat height. The narrative is driven by your relationship with drone companion B-12 and builds genuine emotional stakes. The game is short (4-6 hours) but complete with a beginning, middle, and memorable ending. Available on PC, PS4, PS5 for about $30; frequently on sale.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to beat Stray?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Stray takes approximately 4-6 hours to complete the main story. Players who explore thoroughly and collect all B-12's memories and the cat badge collectibles typically take 6-8 hours. There is no post-game content, so the runtime is the complete experience. It is designed to be played in one or two sessions — a complete weekend game.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is Cattails: Wildwood Story worth it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — Cattails: Wildwood Story (2023) is the best cat life simulator for players who want genuine cat priorities: claiming territory, hunting prey, building colony reputation, forming bonds with other cats, and navigating seasons. At $12, it offers significantly more depth than its price suggests. It is the sequel to the 2017 original Cattails, with refined systems and expanded colony-building mechanics. Available on PC via Steam and Itch.io.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Snufkin: Melody of Moominvalley worth it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, especially for Moomin fans or players who want a deeply gentle atmospheric experience. Snufkin: Melody of Moominvalley (2024) is the most visually faithful Moomin game ever made. You play as Snufkin returning to a valley controlled by an officious Park Keeper, composing melodies to free caged animals and restore the valley's freedom. It is deliberately slow and contemplative. Available on PC and Switch for about $25.",
        },
      },
      {
        '@type': 'Question',
        name: 'What are the best cozy games where you play as an animal?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best cozy games where you play as an animal include Stray (2022, cat in a cyberpunk robot city, PC/PS4/PS5 ~$30), Cattails: Wildwood Story (2023, cat colony life sim, PC ~$12), Snufkin: Melody of Moominvalley (2024, wandering as Snufkin in Moominvalley, PC/Switch ~$25), Pupperazzi (2022, photograph dogs in a dog-centric world, PC/Xbox/Game Pass ~$15), and Untitled Goose Game (2019, cause mischief as a goose, all platforms ~$20). Each offers a completely different interpretation of the animal protagonist experience.',
        },
      },
    ],
  }

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh ? '你该玩哪款以动物为主角的 Cozy 游戏？' : 'Which Game Where You Play as an Animal Should You Try?',
    description: isZh
      ? '6 个问题，在 Stray、Cattails、Snufkin、Pupperazzi 中找到最适合你风格的动物主角游戏'
      : '6 questions to match you with Stray, Cattails: Wildwood Story, Snufkin: Melody of Moominvalley, or Pupperazzi',
    url: canonical,
    educationalLevel: 'beginner',
    about: { '@type': 'Thing', name: isZh ? '动物主角 Cozy 游戏推荐' : 'Play-as-Animal Cozy Game Recommendations' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      <main className="min-h-screen bg-[#0f1a0f] px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm text-[#4a5a4a]">
              {isZh ? 'Cozy 游戏推荐测验' : 'Cozy Game Recommendation Quiz'}
            </p>
            <div className="mb-3 text-4xl">🐾</div>
            <h1 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
              {isZh
                ? '你该玩哪款以动物为主角的 Cozy 游戏？'
                : 'Which Game Where You Play as an Animal?'}
            </h1>
            <p className="text-sm text-[#8a9a7a]">
              {isZh
                ? 'Stray（赛博朋克流浪猫）、Cattails（猫族领地建设）、Snufkin（姆明谷漫步）、Pupperazzi（狗狗摄影）——6 个问题找到你的动物主角游戏。'
                : 'Stray, Cattails: Wildwood Story, Snufkin: Melody of Moominvalley, or Pupperazzi — 6 questions to find your perfect animal protagonist game.'}
            </p>
          </div>

          <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-6 md:p-8">
            <CozyAnimalGamesQuiz locale={locale} />
          </div>

          <RelatedQuizzes currentSlug="cozy-play-as-animal" locale={locale} />

          <div className="mt-12 rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6">
            <h2 className="mb-4 text-base font-bold text-[#e8dcc8]">
              {isZh ? '关于这四款动物主角游戏' : 'About These Four Animal Protagonist Games'}
            </h2>
            <div className="space-y-4 text-sm text-[#8a9a7a]">
              <div>
                <span className="font-semibold text-[#f0a832]">🐱 Stray (2022)</span>
                <span className="ml-1">
                  {isZh
                    ? '— BlueTwelve Studio 开发。赛博朋克机器人城市里的流浪猫，有故事有情感，4-6 小时，PC/PS4/PS5 约 $30。'
                    : '— by BlueTwelve Studio. A stray cat in a robot cyberpunk city — narrative-driven, emotional, 4-6 hours. PC/PS4/PS5 ~$30.'}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#f0a832]">🐾 Cattails: Wildwood Story (2023)</span>
                <span className="ml-1">
                  {isZh
                    ? '— Falcon Development 开发。猫族领地建设，季节狩猎，NPC 猫咪关系，长期持续游戏，PC 约 $12。'
                    : '— by Falcon Development. Cat colony building, seasonal hunting, NPC cat relationships. PC ~$12.'}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#f0a832]">🎶 Snufkin: Melody of Moominvalley (2024)</span>
                <span className="ml-1">
                  {isZh
                    ? '— Hyper Games 开发。托芙·扬松式水彩手绘，极度温柔，谱旋律解放被关押动物，PC/Switch 约 $25。'
                    : '— by Hyper Games. Tove Jansson-faithful watercolor art, extremely gentle, compose melodies to free caged animals. PC/Switch ~$25.'}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#f0a832]">📸 Pupperazzi (2022)</span>
                <span className="ml-1">
                  {isZh
                    ? '— Sundae Month 开发。为狗狗拍照，零压力，荒诞幽默，Game Pass 可玩，PC/Xbox 约 $15。'
                    : '— by Sundae Month. Photograph dogs, zero pressure, absurdist humor, on Game Pass. PC/Xbox ~$15.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
