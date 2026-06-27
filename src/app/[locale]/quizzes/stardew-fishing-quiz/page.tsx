import { Metadata } from 'next'
import { StardewFishingQuiz } from '@/components/tools/StardewFishingQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/stardew-fishing-quiz`

  return {
    title: isZh
      ? '你的星露谷钓鱼风格测验：传奇猎手 / 蟹笼 / 任务单 / 鱼塘 | TendFarm'
      : 'Stardew Valley Fishing Style Quiz: Legendary, Crabpot, Completionist, or Pond | TendFarm',
    description: isZh
      ? '6 个问题测出你的星露谷钓鱼风格——传奇鱼猎手、蟹笼被动派、任务单完成者还是鱼塘专家，附完整攻略指南。'
      : '6 questions to find your Stardew Valley fishing playstyle — Legendary Hunter, Passive Crabpotter, Bundle Completionist, or Fish Pond Expert. Includes a full fishing strategy guide.',
    keywords: [
      'stardew valley fishing tips',
      'stardew valley fishing guide',
      'how to catch legendary fish stardew valley',
      'stardew valley legendary fish locations',
      'stardew valley crabpot worth it',
      'stardew valley crabpot guide',
      'stardew valley fish pond guide',
      'stardew valley best fish for pond',
      'stardew valley sturgeon caviar profit',
      'stardew valley iridium rod worth it',
      'stardew valley wild bait recipe',
      'stardew valley fishing skill leveling',
      'stardew valley best fishing spots',
      'stardew valley mariner profession worth it',
    ],
    alternates: {
      canonical,
      languages: buildLanguageAlternates('/quizzes/stardew-fishing-quiz'),
    },
    openGraph: {
      title: isZh
        ? '你的星露谷钓鱼风格是哪种？——传奇猎手、蟹笼派、任务单完成者、鱼塘专家'
        : 'What Is Your Stardew Valley Fishing Style? Legendary, Crabpot, Completionist, or Pond Expert',
      description: isZh
        ? '6 个问题揭示你的钓鱼风格，每种结果包含完整的星露谷钓鱼攻略指南。'
        : '6 questions to reveal your fishing playstyle, each result including a complete Stardew Valley fishing strategy guide.',
      url: canonical,
    },
  }
}

export default async function StardewFishingQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/stardew-fishing-quiz`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do you catch legendary fish in Stardew Valley?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To catch legendary fish in Stardew Valley, you need the Iridium Rod with the best tackle (Cork Bobber for a larger fishing bar) and ideally Wild Bait. Each legendary has specific requirements: Legend requires fishing level 10, mountain lake, spring, and rain. Crimsonfish needs level 5, ocean east pier, summer. Angler requires level 3, the bridge north of town in fall. Glacierfish needs level 6, Arrowhead Island south tip, winter. Mutant Carp is in the Sewers any season. Eat a Seafoam Pudding (+4 fishing) or Dish O\' The Sea (+3) before each attempt for maximum fishing bar size.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are crabpots worth it in Stardew Valley?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, especially with the Mariner profession at fishing level 10. Without Mariner, crabpots frequently pull trash (Soggy Newspaper, Broken CD). With Mariner, every crabpot pull is a sellable item: Lobster (120g), Crab (100g), Clam (50g), Mussel (30g). A 30-crabpot ocean setup with Mariner generates roughly 1,500-3,000g daily in about 5 minutes of collection time — excellent passive income that requires no minigame skill.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best fish for a fish pond in Stardew Valley?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best fish for fish ponds are Sturgeon (mountain lake, summer/winter) because their roe becomes Caviar worth 500g per Preserves Jar after aging. Lava Eel (floor 100, Mines) and Super Cucumber (ocean, summer/fall nights) are also excellent. With the Artisan profession, aged roe value increases by 40%. A full pond of 10 Sturgeons produces 10 roe daily; aging them into caviar yields 5,000g per 40-day cycle. Stocking multiple Sturgeon ponds with a Preserves Jar setup is one of the highest passive incomes in the game.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Iridium Rod worth it in Stardew Valley?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — the Iridium Rod (3,500g from Willy at fishing level 6) is worth the investment because it allows you to use both Bait and Tackle simultaneously. The Fiberglass Rod only supports bait. With the Iridium Rod you can combine Wild Bait (double-catch chance) with Cork Bobber (larger fishing bar), which dramatically increases both efficiency and ability to catch difficult fish including legendaries. For players who fish seriously, the Iridium Rod pays for itself within a few sessions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What bait should I use in Stardew Valley?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Wild Bait is the best bait in Stardew Valley for general fishing — it increases the chance of catching two fish at once, which doubles your efficiency per session. The recipe is given by Linus after reaching 4 hearts with him and requires level 4 Foraging; it uses Bug Meat, Fiber, and Slime. Standard Bait (craft from any fish, 1 fish = 5 bait) is fine for casual fishing. Magic Bait allows catching fish from any season/time/weather at any location — useful for catching rare fish out of season.",
        },
      },
    ],
  }

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh ? '你的星露谷钓鱼风格测验' : 'Stardew Valley Fishing Style Quiz',
    description: isZh
      ? '6 个问题测出你的星露谷钓鱼风格：传奇鱼猎手、蟹笼被动派、任务单完成者或鱼塘专家'
      : '6 questions to reveal your Stardew Valley fishing playstyle: Legendary Hunter, Passive Crabpotter, Bundle Completionist, or Fish Pond Expert',
    url: canonical,
    educationalLevel: 'beginner',
    about: { '@type': 'Thing', name: 'Stardew Valley Fishing' },
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
              {isZh ? '星露谷物语攻略测验' : 'Stardew Valley Strategy Quiz'}
            </p>
            <div className="mb-3 text-4xl">🎣</div>
            <h1 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
              {isZh
                ? '你的星露谷钓鱼风格是哪种？'
                : 'What Is Your Stardew Valley Fishing Style?'}
            </h1>
            <p className="text-sm text-[#8a9a7a]">
              {isZh
                ? '传奇鱼猎手、被动蟹笼玩家、任务单完成者，还是鱼塘专家？6 个问题揭示你的钓鱼风格，附完整攻略指南。'
                : 'Legendary Hunter, Passive Crabpotter, Bundle Completionist, or Fish Pond Expert? 6 questions to reveal your style — each result includes a full fishing strategy guide.'}
            </p>
          </div>

          <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-6 md:p-8">
            <StardewFishingQuiz locale={locale} />
          </div>

          <RelatedQuizzes currentSlug="stardew-fishing-quiz" locale={locale} />

          <div className="mt-12 rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6">
            <h2 className="mb-4 text-base font-bold text-[#e8dcc8]">
              {isZh ? '四种钓鱼风格一览' : 'The Four Fishing Styles'}
            </h2>
            <div className="space-y-3 text-sm text-[#8a9a7a]">
              <div>
                <span className="font-semibold text-[#f0a832]">🎣 {isZh ? '传奇鱼猎手' : 'Legendary Hunter'}</span>
                <span className="ml-1">— {isZh ? '为收集传奇鱼而钓鱼，掌握小游戏，追求钓鱼技能极限。需要：铱合金鱼竿 + 野生鱼饵 + 软木浮标 + 增益食物。' : 'Fishes for legendary collection, masters the minigame, pushes skill to its ceiling. Needs: Iridium Rod + Wild Bait + Cork Bobber + buff food.'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#f0a832]">📋 {isZh ? '任务单完成者' : 'Bundle Completionist'}</span>
                <span className="ml-1">— {isZh ? '有目的地钓鱼，在季节截止日期前完成社区中心任务单。玻璃纤维鱼竿 + 鱼饵足够，无需铱合金。' : 'Fishes with purpose to complete Community Center bundles before seasonal deadlines. Fiberglass Rod + bait is sufficient.'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#f0a832]">🦀 {isZh ? '被动蟹笼派' : 'Passive Crabpotter'}</span>
                <span className="ml-1">— {isZh ? '30+ 个蟹笼 + 10 级水手职业 = 每天 5 分钟收集，约 1,500-3,000g 被动收入，零小游戏压力。' : '30+ crabpots + Mariner profession at level 10 = 5 min daily collection, ~1,500-3,000g passive income, zero minigame stress.'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#f0a832]">🏊 {isZh ? '鱼塘专家' : 'Fish Pond Expert'}</span>
                <span className="ml-1">— {isZh ? '5+ 个鲟鱼塘 + 保鲜罐 + 工匠职业 = 每 40 天鱼子酱利润约 5,000g/塘。游戏后期最高被动收入之一。' : '5+ Sturgeon ponds + Preserves Jars + Artisan profession = ~5,000g per pond per 40-day caviar cycle. Highest passive income in the endgame.'}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
