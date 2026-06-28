import type { Metadata } from 'next'
import { CozySurvivalGamesQuiz } from '@/components/tools/CozySurvivalGamesQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-survival-games-quiz`

  return {
    title: isZh
      ? '哪款生存游戏最适合 Cozy 玩家？测验 | FarmGameHub'
      : 'Which Survival Game Is Right for Cozy Gamers? Quiz | FarmGameHub',
    description: isZh
      ? '6 个问题，从 Raft、核心守护者、光年边疆、缩小与生存中找到最适合你的生存游戏——从最温馨的外星农场到最刺激的后院求生。'
      : 'Answer 6 questions to find your perfect cozy survival game — Raft, Core Keeper, Lightyear Frontier, or Grounded. From the coziest alien farm to the most intense backyard survival.',
    alternates: {
      canonical,
      languages: buildLanguageAlternates('/quizzes/cozy-survival-games-quiz'),
    },
    keywords: isZh
      ? ['Raft木筏求生值得买吗', '核心守护者值得买吗', '光年边疆值得买吗', '缩小与生存值得买吗', 'cozy生存游戏推荐', '适合新手的生存游戏', '类星露谷生存游戏']
      : ['raft game worth it', 'core keeper worth it', 'lightyear frontier worth it', 'grounded game worth it', 'cozy survival games', 'survival games for beginners', 'survival games like stardew valley', 'best survival games game pass'],
    openGraph: {
      title: isZh ? '哪款生存游戏最适合 Cozy 玩家？' : 'Which Survival Game Is Right for Cozy Gamers?',
      description: isZh
        ? 'Raft、核心守护者、光年边疆、缩小与生存——6 个问题找到你的生存游戏'
        : 'Raft, Core Keeper, Lightyear Frontier, or Grounded — 6 questions to find your survival game',
      url: canonical,
      type: 'website',
    },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-survival-games-quiz`

  const faqItems = [
    {
      q: 'Is Raft worth it?',
      a: "Yes — Raft (2022) is one of the most accessible and cozy survival games available, with Overwhelmingly Positive reviews on Steam from 200,000+ players. You start on a tiny raft with a hook and pull debris from the ocean to build an increasingly elaborate floating home. The game has a full story mode with mystery islands and a satisfying narrative conclusion. It supports 1-4 online co-op, costs about $21 on Steam (PC only), and runs on almost any hardware. The shark mechanic sounds threatening but is very manageable with shark bait. If you loved Stardew Valley but want a survival game, Raft is the closest in spirit — it's fundamentally about building and expanding your home.",
    },
    {
      q: 'Is Core Keeper worth it?',
      a: "Yes — Core Keeper (2024 full release) is an excellent cozy survival game with a Stardew Valley-adjacent farming system set underground. You dig downward into a procedurally generated world of ancient biomes, fight biome bosses, and grow mushroom farms under artificial light. It supports 1-8 players online and is available on PC (Steam), Nintendo Switch, PlayStation, and Xbox for about $17 — one of the most affordable games on this list. The farming system genuinely feels like a cozy farming game transplanted underground. Custom difficulty lets you reduce enemy danger for a more relaxed experience. Very good value at $17.",
    },
    {
      q: 'Is Lightyear Frontier worth it?',
      a: "Yes, especially with Game Pass — Lightyear Frontier (2024) is the most cozy survival game on this list, leaning more toward farming simulation than traditional survival. You pilot a customizable mech on an alien planet, growing crops and building a settlement while the mech handles most combat damage. It is included in Xbox Game Pass at no additional cost, making it essentially free for subscribers. The alien planet is genuinely beautiful, the farming loop is calming, and the game is designed to feel like Stardew Valley in space rather than a tense survival experience. Available on PC (Steam) and Xbox (~$30 without Game Pass).",
    },
    {
      q: 'Is Grounded worth it?',
      a: "Yes — Grounded (2022, Obsidian Entertainment) is one of the most acclaimed survival games of its generation, Metacritic 80 on PC, and is included in Xbox Game Pass. You survive as a pebble-sized person in a backyard where insects are building-sized threats. The gear progression (kill insect → analyze parts → craft armor from those parts) is addictive, the world is handcrafted rather than procedurally generated (so it feels intentional and dense), and Obsidian's writing quality gives the game a story backbone above the genre average. Note: it has a full Arachnophobia Mode that replaces all spiders with abstract blobs — the spiders are otherwise very realistic and can be genuinely disturbing. Best played with 1-3 friends in co-op.",
    },
    {
      q: 'What is the coziest survival game for someone who hates survival games?',
      a: "Lightyear Frontier is the most cozy survival game for someone who doesn't enjoy traditional survival — the mech absorbs most damage so you rarely die, the core loop is farming-focused, and the pressure level is very low. Raft is a close second — the shark is manageable with bait and the raft-building is fundamentally a creative home-building exercise. Core Keeper has a Custom Mode that removes most danger. Grounded is the most traditionally 'survival' of the four — it has real tension, scary spider enemies, and resource pressure — but its Arachnophobia Mode and adjustable difficulty make it approachable. Take the quiz above to find which fits your specific comfort zone.",
    },
  ]

  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh ? '哪款生存游戏最适合 Cozy 玩家？' : 'Which Survival Game Is Right for Cozy Gamers?',
    description: isZh
      ? '6 个问题，从 Raft、核心守护者、光年边疆、缩小与生存中找到最适合你的生存游戏'
      : '6 questions to find your perfect cozy survival game from Raft, Core Keeper, Lightyear Frontier, and Grounded',
    url: canonical,
    educationalLevel: 'beginner',
    about: { '@type': 'Thing', name: isZh ? '生存游戏推荐' : 'Survival Game Recommendation' },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-[#0f1a0f] text-[#e8dcc8]">
        <div className="mx-auto max-w-2xl px-4 py-10">
          <div className="mb-8 text-center">
            <span className="mb-3 inline-block text-5xl">🏕️</span>
            <p className="text-sm text-[#8a9a7a]">
              {isZh ? 'Cozy 生存游戏推荐测验' : 'Cozy Survival Game Quiz'}
            </p>
          </div>

          <div className="rounded-2xl border border-[#2d3d2d] bg-[#141f14] p-6 shadow-xl">
            <CozySurvivalGamesQuiz locale={locale} />
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-lg font-semibold text-[#e8dcc8]">
              {locale === 'zh' ? '常见问题' : locale === 'zh-TW' ? '常見問題' : locale === 'ja' ? 'よくある質問' : locale === 'ko' ? '자주 묻는 질문' : locale === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-5">
              {faqItems.map((item, i) => (
                <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#141f14] p-5">
                  <h3 className="mb-2 font-medium text-[#f0a832]">{item.q}</h3>
                  <p className="text-sm leading-relaxed text-[#8a9a7a]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <RelatedQuizzes currentSlug="cozy-survival-games-quiz" locale={locale} />
          </div>
        </div>
      </div>
    </>
  )
}
