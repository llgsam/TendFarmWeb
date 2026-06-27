import { CoupleCozQuiz } from '@/components/tools/CoupleCozQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
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
      ? '适合情侣的 Cozy 游戏推荐测验 — 星露谷联机 / 动物之森 / Palia / 煮过头'
      : 'Best Cozy Game for Couples Quiz — Stardew Valley Co-op vs Animal Crossing vs Palia vs Overcooked',
    description: isZh
      ? '6 个问题，为你们找到最适合一起玩的 cozy 游戏。含星露谷联机、动物之森岛屿拜访、Palia 免费联机、煮过头四种推荐路线。'
      : '6 questions to find the perfect cozy game for you and your partner — Stardew Valley co-op, Animal Crossing island visits, Palia, or Overcooked. Includes honest tips for each.',
    keywords: isZh
      ? ['情侣游戏推荐', '适合情侣的 cozy 游戏', '星露谷联机', '动物之森情侣', 'Palia 情侣', '情侣一起玩的游戏', '适合两个人玩的治愈游戏']
      : [
          'cozy games for couples',
          'best games to play with girlfriend',
          'best games to play with boyfriend',
          'cozy co-op games',
          'stardew valley co-op couples',
          'animal crossing for couples',
          'games to play together cozy',
          'best couple games 2025',
          'cozy games to play together switch',
          'games to play with partner',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-games-for-couples`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes/cozy-games-for-couples`,
        [other]: `${BASE_URL}/${other}/quizzes/cozy-games-for-couples`,
      },
    },
  }
}

const FAQ_EN = [
  {
    q: 'What are the best cozy games to play with a partner in 2025?',
    a: "The best cozy games for couples in 2025 are: Stardew Valley co-op (~$15 per player on PC, ~$15 on Switch) — the deepest co-op farming experience where you share a farm and work toward meaningful goals together. Animal Crossing: New Horizons (~$60 per Switch) — each player builds their own island and you visit each other, which many couples find unexpectedly intimate. Palia (free on PC and Switch) — a gentle MMO where you can farm, hunt, and explore together with no cost to start. Overcooked! All You Can Eat (~$40 on Switch/console) — the chaotic co-op cooking game that creates the most shared laughter of any couple gaming experience. Take the quiz above to find your best match.",
  },
  {
    q: 'Is Stardew Valley good for couples?',
    a: "Yes — Stardew Valley co-op is considered one of the best couple gaming experiences available. Up to 4 players can share a farm, with one person as the main farmer and others as farmhands. The natural task division (one person might farm while the other mines, fishes, or builds relationships with NPCs) means both partners stay engaged without stepping on each other. Many couples report that building the community center together and watching the farm grow season by season is genuinely meaningful. The main caveat is that both partners need a copy of the game, and on PC they need to be connected via Steam or another service.",
  },
  {
    q: 'Can you play Animal Crossing with your partner?',
    a: "Yes — but the multiplayer works differently than most co-op games. In Animal Crossing: New Horizons, each player has their own island (requiring their own Switch and game copy). You can visit each other's islands online or locally, trade items, leave gifts, and spend time together in each other's space. This 'parallel creative worlds that intersect' dynamic is something many couples love deeply — it becomes about sharing what you've made rather than working on the same thing simultaneously. One alternative: two players can share one Switch and one island, but each gets a smaller role than the main island owner.",
  },
  {
    q: 'What cozy game is best for couples where one partner does not game much?',
    a: "Palia is the best cozy game for couples where one partner is less experienced — it's free, has a very gentle learning curve, no fail states, and both partners can play at their own pace in the same world. Animal Crossing: New Horizons is also excellent for this reason — each player manages their own island independently, so there's no pressure from different skill levels. Stardew Valley co-op can work, but the more experienced partner may find themselves naturally carrying more of the strategic load. Overcooked is fun but the time pressure can feel stressful for newcomers.",
  },
  {
    q: 'What is the best couple game on Nintendo Switch?',
    a: "The best couple games on Nintendo Switch are: Stardew Valley for deep co-op farming (both need a copy, best with two Switches but one Switch supports 2-player splitscreen locally); Animal Crossing: New Horizons for creative island sharing (ideally each has their own Switch and copy); Overcooked! All You Can Eat for chaotic co-op cooking on one TV (local co-op on one Switch is perfect); and Palia for free online co-op (currently PC and Switch, though cross-platform is not supported). All four are excellent for different couple dynamics — take the quiz above to find which fits you.",
  },
]

const FAQ_ZH = [
  {
    q: '2025 年最适合情侣一起玩的 cozy 游戏有哪些？',
    a: '2025 年最适合情侣的 cozy 游戏包括：星露谷物语联机（PC 每位玩家约 100 元，Switch 约 100 元）——最深度的合作农场体验，你们共享一个农场，一起为有意义的目标努力。动物之森：新视野（每台 Switch 约 300 元）——每位玩家建造自己的岛屿，然后互相拜访，许多情侣发现这出乎意料地亲密。Palia（PC 和 Switch 免费）——一款温和的 MMO，你们可以一起种地、狩猎和探索，无需任何费用就可以开始。煮过头！管够版（Switch/主机约 200 元）——创造最多情侣共同笑声的混乱合作烹饪游戏。做上面的测验，找到你们的最佳匹配。',
  },
  {
    q: '星露谷物语适合情侣玩吗？',
    a: '是的——星露谷物语联机被认为是最好的情侣游戏体验之一。最多 4 名玩家可以共享一个农场，一人作为主农场主，其他人作为农场帮手。自然的任务分工（一人种地，另一人挖矿、钓鱼或与 NPC 建立关系）意味着两位伴侣都保持投入而不会互相干扰。许多情侣报告说，一起修复社区中心、看着农场一季季成长是真正有意义的体验。主要注意事项是两位玩家都需要各自的游戏副本，在 PC 上需要通过 Steam 或其他服务连接。',
  },
  {
    q: '可以和伴侣一起玩动物之森吗？',
    a: '可以——但多人游戏的方式与大多数合作游戏不同。在动物之森：新视野中，每位玩家都有自己的岛屿（需要各自的 Switch 和游戏副本）。你们可以在线或本地拜访对方的岛屿、交换物品、留下礼物、在对方的空间里共度时光。这种"相互交织的平行创意世界"的动态是许多情侣深深喜爱的——它变成了分享各自创造的东西，而不是同时在同一件事上工作。另一种选择：两位玩家可以共用一台 Switch 和一个岛屿，但每位玩家的角色比主岛所有者要小。',
  },
  {
    q: '其中一方很少玩游戏的情侣最适合玩什么 cozy 游戏？',
    a: 'Palia 是经验较少的一方存在的情侣的最佳 cozy 游戏——免费、学习曲线非常平缓、没有失败机制，两位伴侣可以在同一世界里按自己的节奏游玩。动物之森：新视野也因同样原因非常出色——每位玩家独立管理自己的岛屿，所以不同技能水平没有任何压力。星露谷物语联机可以，但经验更丰富的伴侣可能会自然地承担更多策略性工作。《煮过头》很有趣，但时间压力对游戏新手来说可能感觉压力很大。',
  },
  {
    q: 'Nintendo Switch 上最好的情侣游戏是什么？',
    a: '最好的 Switch 情侣游戏包括：星露谷物语适合深度合作农业（两人都需要副本，两台 Switch 最佳，但一台 Switch 支持 2 人本地分屏）；动物之森：新视野适合创意岛屿分享（理想情况下各有自己的 Switch 和副本）；《煮过头！管够版》适合在一台电视上的混乱合作烹饪（一台 Switch 的本地合作非常完美）；以及 Palia 适合免费在线合作（目前 PC 和 Switch，但不支持跨平台）。四款都非常适合不同的情侣动态——做上面的测验，找到最适合你们的那款。',
  },
]

export default async function CozyGamesForCouplesPage({
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
      <div className="mx-auto max-w-2xl px-4 py-12">
        <nav className="mb-6 text-sm text-[#8a9a7a]">
          <Link href={`/${locale}/quizzes`} className="hover:text-[#e8dcc8]">
            {isZh ? '测评' : 'Quizzes'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#e8dcc8]">
            {isZh ? '情侣 Cozy 游戏推荐测验' : 'Cozy Games for Couples Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CoupleCozQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '最好的情侣游戏不是你们技术最好的那款，而是结束之后你们话最多的那款。'
            : "The best couple game is not the one you're best at — it's the one you talk about the most afterwards."}
        </p>

        <RelatedQuizzes currentSlug="cozy-games-for-couples" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '情侣 Cozy 游戏常见问题' : 'Cozy Games for Couples FAQ'}
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
