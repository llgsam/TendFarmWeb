import { Metadata } from 'next'
import { CozyHiddenGemsQuiz } from '@/components/tools/CozyHiddenGemsQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-hidden-gems`

  return {
    title: isZh
      ? '哪款被低估的 Cozy 游戏隐藏宝石最适合你？| Farming Game Hub'
      : 'Which Underrated Cozy Hidden Gem Should You Play? | Farming Game Hub',
    description: isZh
      ? '四款严重被低估的 Cozy 游戏：熊与早餐、美子的夜市、向东方、Potionomics。6 个问题找到你的隐藏宝石。'
      : 'Bear and Breakfast, Mineko\'s Night Market, Eastward, or Potionomics — 6 questions to find which underrated cozy hidden gem matches your style.',
    keywords: [
      'bear and breakfast review worth it',
      "mineko's night market review worth it",
      'eastward game review worth it',
      'potionomics worth it review',
      'best underrated cozy games',
      'hidden gem cozy games PC switch 2022 2023',
      'underrated indie games cozy gamers',
      'bear and breakfast vs animal crossing',
      'minekos night market worth buying',
      'eastward game worth it',
    ],
    alternates: {
      canonical,
      languages: buildLanguageAlternates('/quizzes/cozy-hidden-gems'),
    },
    openGraph: {
      title: isZh
        ? '哪款 Cozy 游戏隐藏宝石最适合你？——四款严重被低估的精品'
        : 'Which Underrated Cozy Hidden Gem Should You Play?',
      description: isZh
        ? '熊与早餐、美子的夜市、向东方，还是 Potionomics？6 个问题找到你的隐藏宝石。'
        : 'Bear and Breakfast, Mineko\'s Night Market, Eastward, or Potionomics. Find your hidden gem in 6 questions.',
      url: canonical,
    },
  }
}

export default async function CozyHiddenGemsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-hidden-gems`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Bear and Breakfast worth it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — Bear and Breakfast is one of the most underrated cozy games released in 2022. You play as Hank, a bear who builds and manages a woodland B&B for human tourists. At $20 on PC and Switch, it offers a full management sim with themed room decoration, guest satisfaction ratings, seasonal content, and expanding properties across multiple forest biomes. It is frequently compared to Animal Crossing for its warm social atmosphere and recommended for players who want more goal-driven decoration decisions.',
        },
      },
      {
        '@type': 'Question',
        name: "Is Mineko's Night Market worth buying?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes — Mineko's Night Market (2023) is one of the most visually distinctive cozy games of recent years. Set in a Japanese coastal town full of cats, you craft handmade goods during the day and sell them at seasonal night markets after dark. The game has deep Japanese festival aesthetic with lanterns, seasonal matsuri events, NPC relationships, and iconic cat character designs. At $25 on PC and Switch, it is a lovingly made cozy game that deserved more attention than it received at launch.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is Eastward worth playing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — Eastward (2021) is one of the most visually stunning cozy-adjacent games ever made. Its pixel art was created by a single artist over seven years and rivals classic Super Nintendo games in density and warmth. The game follows John and Sam traveling east through post-apocalyptic communities where people kept living and cooking despite something going wrong long ago. It has a full cooking system, warm melancholy tone similar to Studio Ghibli, and an excellent original soundtrack. Available on PC and Switch for about $25.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Potionomics worth it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — Potionomics (2022) is one of the most mechanically inventive cozy-adjacent games of the past five years. As a witch who inherits a failing potion shop, you brew potions and then sell them through a deckbuilding negotiation minigame where you play charm and persuasion cards. Each NPC you befriend adds unique cards to your deck, making friendship mechanically meaningful. PC-only at about $25, frequently recommended for players who enjoyed Spiritfarer\'s emotional depth but want strategic gameplay added on top.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the best underrated cozy games in 2022 and 2023?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "The most underrated cozy games from 2022-2023 include Bear and Breakfast (management sim as a bear building a B&B, $20 PC/Switch), Mineko's Night Market (Japanese festival crafting and selling, $25 PC/Switch), Potionomics (potion shop with deckbuilding negotiations, $25 PC), and Eastward (pixel-art post-apocalyptic journey with cooking, $25 PC/Switch). All four received far less attention than they deserved and are highly recommended for cozy game fans looking for something beyond the mainstream.",
        },
      },
    ],
  }

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh
      ? '哪款被低估的 Cozy 游戏隐藏宝石最适合你？'
      : 'Which Underrated Cozy Hidden Gem Should You Play?',
    description: isZh
      ? '6 个问题，在熊与早餐、美子的夜市、向东方、Potionomics 四款被低估的 Cozy 精品中找到你的隐藏宝石'
      : '6 questions to match you with Bear and Breakfast, Mineko\'s Night Market, Eastward, or Potionomics based on your playstyle',
    url: canonical,
    educationalLevel: 'beginner',
    about: { '@type': 'Thing', name: isZh ? 'Cozy 隐藏宝石游戏推荐' : 'Underrated Cozy Game Recommendations' },
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
            <div className="mb-3 text-4xl">💎</div>
            <h1 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
              {isZh
                ? '哪款被低估的 Cozy 游戏隐藏宝石最适合你？'
                : 'Which Underrated Cozy Hidden Gem Should You Play?'}
            </h1>
            <p className="text-sm text-[#8a9a7a]">
              {isZh
                ? '熊与早餐、美子的夜市、向东方、Potionomics——四款被严重低估的 Cozy 精品，都值得一玩。6 个问题找到你的隐藏宝石。'
                : 'Bear and Breakfast, Mineko\'s Night Market, Eastward, Potionomics — all underplayed, all excellent. 6 questions to find your hidden gem.'}
            </p>
          </div>

          <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-6 md:p-8">
            <CozyHiddenGemsQuiz locale={locale} />
          </div>

          <RelatedQuizzes currentSlug="cozy-hidden-gems" locale={locale} />

          <div className="mt-12 rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6">
            <h2 className="mb-4 text-base font-bold text-[#e8dcc8]">
              {isZh ? '关于这四款隐藏宝石' : 'About These Four Hidden Gems'}
            </h2>
            <div className="space-y-4 text-sm text-[#8a9a7a]">
              <div>
                <span className="font-semibold text-[#f0a832]">🐻 Bear and Breakfast (2022)</span>
                <span className="ml-1">— {isZh ? 'Gummy Cat 开发，熊经营林地民宿，装饰主题房间、迎接动物客人，PC/Switch 约 $20。' : 'by Gummy Cat. A bear runs a woodland B&B — design themed rooms, satisfy animal guests. PC/Switch ~$20.'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#f0a832]">🏮 Mineko&apos;s Night Market (2023)</span>
                <span className="ml-1">— {isZh ? 'Meowza Games 开发，日本节日小镇，制作手工品在夜市出售，猫无处不在，PC/Switch 约 $25。' : 'by Meowza Games. Japanese festival town, craft goods and sell at night markets, cats everywhere. PC/Switch ~$25.'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#f0a832]">🍜 Eastward (2021)</span>
                <span className="ml-1">— {isZh ? 'PixPil 开发（单人画师历时七年），暖系像素末日旅途，可烹饪食物，Ghibli 式忧郁，PC/Switch 约 $25。' : 'by PixPil (one artist, seven years). Warm pixel post-apocalyptic road trip with cooking. Ghibli-esque melancholy. PC/Switch ~$25.'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#f0a832]">⚗️ Potionomics (2022)</span>
                <span className="ml-1">— {isZh ? 'Voracious Games 开发，药水店 + 牌组构建谈判，每个 NPC 都有独特卡牌协同，仅限 PC 约 $25。' : 'by Voracious Games. Potion shop + deckbuilding negotiations, each NPC has unique card synergies. PC only ~$25.'}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
