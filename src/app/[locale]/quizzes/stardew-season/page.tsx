import { StardewSeasonQuiz } from '@/components/tools/StardewSeasonQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    title: isZh
      ? '你是哪个星露谷季节？春天/夏天/秋天/冬天性格测验'
      : 'Which Stardew Valley Season Are You? — Spring Summer Fall Winter Personality Quiz',
    description: isZh
      ? '6 个关于性格和生活方式的问题，测出你的星露谷灵魂季节——附专属村民配对、代表作物和 TendFarm 季节模式解析。'
      : '6 personality questions to reveal your Stardew Valley soul season — Spring, Summer, Fall, or Winter? Includes villager match, signature crops, and seasonal farm tips.',
    keywords: isZh
      ? ['星露谷季节测验', '你是哪个季节', '星露谷春夏秋冬', '星露谷性格测试', '星露谷四季']
      : [
          'which stardew valley season are you',
          'stardew valley season personality quiz',
          'stardew valley spring summer fall winter',
          'stardew valley seasons quiz',
          'stardew valley personality',
          'which season are you quiz',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/stardew-season`,
      languages: buildLanguageAlternates('/quizzes/stardew-season'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'What is the best season in Stardew Valley?',
    a: 'There is no objectively best season — each excels in different ways. Spring is best for beginners (easiest crops, Egg Festival strawberries). Summer is best for income (starfruit, blueberries, red cabbage). Fall is best for variety and profit (pumpkins, grapes, cranberries). Winter has no outdoor crops but is perfect for mining, fishing, and crafting — and the Night Market is unique to winter. Most experienced players consider Fall the most rewarding season overall.',
  },
  {
    q: 'What should I do in Stardew Valley spring?',
    a: "In Stardew Valley spring: (1) Buy strawberry seeds at the Egg Festival on day 13 — they keep producing all season. (2) Plant parsnips for quick cash on day 1. (3) Clear your farm early to maximize planting space. (4) Start building relationships with villagers. (5) Begin fishing for early income. (6) Upgrade your watering can during a rainy day. The Egg Festival is the most important spring event for farming income.",
  },
  {
    q: 'What are the best crops for each Stardew Valley season?',
    a: 'Best crops by season: Spring — Strawberries (from Egg Festival), Cauliflower, Garlic. Summer — Starfruit (highest value single crop), Blueberries (highest multi-harvest), Red Cabbage (year 2+). Fall — Cranberries (best multi-harvest), Pumpkin (bundle), Grapes (wine). Winter — No outdoor crops; focus on greenhouse, winter foraging, and deep mining.',
  },
  {
    q: 'What happens in Stardew Valley winter?',
    a: "In Stardew Valley winter, you cannot grow outdoor crops — the ground is frozen. Instead, focus on: (1) Deep mining (levels 80+ for gold ore, iridium in Skull Cavern). (2) Fishing — many fish are only available in winter. (3) Crafting items you couldn't make during busy farming seasons. (4) Building friendships with villagers. (5) The Night Market (days 15-17) offers unique items and a submarine fishing ride. (6) Greenhouse crops still produce if you have unlocked it.",
  },
  {
    q: 'What is the Stardew Valley Night Market?',
    a: "The Night Market is a special winter event in Stardew Valley that runs on Winter 15, 16, and 17. It appears on the beach and features: a submarine fishing ride (catches unique deep-sea fish including the Midnight Carp and Spookfish), a mermaid show, unique vendors selling rare items like Magic Rock Candy and Void Ghost Pendants, and a painted egg artist. It is one of the most unique and beloved events in the game, especially appealing to players with a winter soul personality.",
  },
]

const FAQ_ZH = [
  {
    q: '星露谷物语哪个季节最好？',
    a: '没有客观上最好的季节——每个季节各有擅长。春天最适合新手（作物最简单，鸡蛋节草莓极具性价比）；夏天收入最高（星果、蓝莓、红色卷心菜）；秋天品种最丰富（南瓜、葡萄、蔓越莓）；冬天虽然不能户外种地，但是挖矿、钓鱼、工艺品制作的黄金时期，夜市也是独一无二的体验。大多数有经验的玩家认为秋天整体最令人满足。',
  },
  {
    q: '星露谷物语春天应该做什么？',
    a: '春天的重点事项：(1) 第 13 天鸡蛋节一定要买草莓种子，整个季节持续产出；(2) 第 1 天种防风草快速回血现金；(3) 尽早清理农场，最大化种植面积；(4) 开始和村民建立友谊；(5) 通过钓鱼获得早期收入；(6) 在下雨天升级水壶。鸡蛋节是春天最重要的农场收益节点。',
  },
  {
    q: '星露谷物语每个季节最好的作物是什么？',
    a: '各季节最佳作物：春天——草莓（鸡蛋节购买）、花椰菜、大蒜；夏天——星果（单株最高价值）、蓝莓（多次收割最优）、红色卷心菜（第二年以后）；秋天——蔓越莓（最佳多次收割）、南瓜（捆包任务）、葡萄（酿酒）；冬天——没有户外作物，专注温室种植、冬季采集和深层挖矿。',
  },
  {
    q: '星露谷物语冬天可以做什么？',
    a: '冬天不能户外种地，但有很多事情可以做：(1) 深层挖矿（80 层以上获取金矿石，骷髅洞获取铱矿）；(2) 钓鱼——很多鱼只在冬天出现；(3) 制作平时农忙时没空做的工艺品；(4) 加强与村民的友谊；(5) 夜市（冬 15-17 日）提供独特物品和潜水艇钓鱼活动；(6) 如果已解锁温室，温室作物冬天继续生长。',
  },
  {
    q: '星露谷物语夜市是什么？',
    a: '夜市是星露谷冬天的特殊活动，在冬天第 15、16、17 日举行，出现在沙滩上。包括：潜水艇钓鱼（可钓到特有深海鱼类，如午夜鲤鱼和幽灵鱼）、美人鱼表演、出售稀有物品的特殊商家（魔法岩糖、虚空幽灵吊坠等）、画蛋艺术家。夜市是游戏中最独特也最受玩家喜爱的活动之一，对冬天灵魂的玩家来说有着特别的魔力。',
  },
]

export default async function StardewSeasonPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
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
      <div className="mx-auto max-w-2xl px-4 py-12">
        <nav className="mb-6 text-sm text-[#8a9a7a]">
          <Link href={`/${locale}/quizzes`} className="hover:text-[#e8dcc8]">
            {locale === 'zh' ? '测评' : locale === 'zh-TW' ? '測評' : locale === 'ja' ? 'クイズ' : locale === 'ko' ? '퀴즈' : locale === 'de' ? 'Quiz' : 'Quizzes'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#e8dcc8]">
            {isZh ? '星露谷季节测验' : 'Stardew Season Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <StardewSeasonQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '每个季节都有它独特的魔力——你的季节，就是你此刻最真实的状态。'
            : "Every season has its own magic — your season is your most authentic self right now."}
        </p>

        <RelatedQuizzes currentSlug="stardew-season" locale={locale} />

        {/* FAQ Section for SEO/GEO */}
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于星露谷四季的常见问题' : 'Stardew Valley Seasons FAQ'}
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
