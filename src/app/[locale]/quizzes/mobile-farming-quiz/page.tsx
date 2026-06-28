import { MobileFarmingQuiz } from '@/components/tools/MobileFarmingQuiz'
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
      ? '哪款手机农场游戏最适合你？— Hay Day / 星露谷 / Township / 口袋营地测验'
      : 'Which Mobile Farming Game Should You Play? — Hay Day vs Stardew vs Township vs Pocket Camp',
    description: isZh
      ? '6 个问题，从 Hay Day、星露谷物语手机版、Township、动物之森口袋营地中找到最适合你游戏风格的那一款。'
      : '6 questions to find your perfect mobile farming game — Hay Day, Stardew Valley Mobile, Township, or Animal Crossing: Pocket Camp. Includes honest pros and watch-outs for each.',
    keywords: isZh
      ? ['手机农场游戏推荐', 'Hay Day 攻略', 'Hay Day 和 Township 哪个好', '星露谷手机版', '动物森友会口袋营地', '最好的手机农场游戏', '手机农场游戏测验']
      : [
          'best mobile farming game',
          'hay day tips for beginners',
          'hay day vs township',
          'stardew valley mobile',
          'animal crossing pocket camp tips',
          'mobile farming game quiz',
          'is hay day free',
          'best farming games for iphone android',
          'township game tips',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/mobile-farming-quiz`,
      languages: buildLanguageAlternates('/quizzes/mobile-farming-quiz'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'What is the best mobile farming game in 2025?',
    a: "The best mobile farming game depends on what you want: Hay Day (free, iOS/Android) is the best for a classic production-chain farming experience with an active social community. Stardew Valley ($4.99, iOS/Android) is the best for deep, story-rich farming RPG content with no timers or energy limits. Township (free, iOS/Android) is the best for players who want farming combined with town-building and active co-op teams. Animal Crossing: Pocket Camp (free, iOS/Android) is the best for Animal Crossing fans who want character-focused, creative decoration on mobile. Take the quiz above to find your personal best match.",
  },
  {
    q: 'Is Hay Day free to play?',
    a: "Yes — Hay Day is completely free to download and play on iOS and Android. It is supported by optional in-app purchases (diamonds, the premium currency) that can speed up production timers and unlock certain items. The core game is fully playable without spending money, though progression slows noticeably in the mid-to-late game without occasional purchases. There are no forced ads. Hay Day has been consistently rated as one of the fairest free-to-play mobile games in its genre.",
  },
  {
    q: 'Is Stardew Valley available on mobile?',
    a: "Yes — Stardew Valley is available on iOS and Android for a one-time purchase of $4.99. The mobile version is a complete port of the PC and console version — every crop, character, storyline, mine floor, and secret is included. There are no ads, no energy limits, no timers, and no in-app purchases of any kind. Touch controls work well for most gameplay, though some players prefer connecting a Bluetooth controller for longer sessions. The 1.5 update (including end-game Ginger Island content) was added to mobile after the PC release.",
  },
  {
    q: 'What is the difference between Hay Day and Township?',
    a: "Hay Day and Township are both free-to-play mobile farming games but focus on different things. Hay Day focuses on: a farm-only experience with crops, animals, and a satisfying production chain; order fulfillment for your roadside shop; trading with neighbors; and competitive neighborhood derbies. Township focuses on: combining farming with city-building (you grow crops to feed factories that supply your town); a larger variety of production buildings; zoo collections; and co-op team play. Hay Day has a more purely agricultural feel; Township feels broader and more town-management oriented. Both have been running for 10+ years with active player bases.",
  },
  {
    q: 'Are there farming games for mobile with no pay-to-win mechanics?',
    a: "Yes — Stardew Valley on mobile ($4.99 one-time) is the clearest example: no ads, no timers, no energy, no in-app purchases of any kind. It is the most 'pure' mobile farming experience with no monetization pressure whatsoever. Among free-to-play options, Hay Day is widely regarded as one of the fairer F2P farming games — progression is possible without spending, though slower at higher levels. Animal Crossing: Pocket Camp leans more cosmetic in its purchases — the main gameplay is free, with optional subscriptions and cosmetic item shops. Township falls in the middle — playable free, but team play and late-game progression benefit from occasional spending.",
  },
]

const FAQ_ZH = [
  {
    q: '2025 年最好的手机农场游戏是什么？',
    a: '最好的手机农场游戏取决于你想要什么：Hay Day（免费，iOS/Android）是经典生产链农场体验与活跃社交社区的最佳选择。星露谷物语（4.99 美元，iOS/Android）是深度、故事丰富的农场 RPG 内容的最佳选择，没有计时器或体力限制。Township（免费，iOS/Android）是想要将农业与城镇建设和活跃合作团队结合的玩家的最佳选择。动物之森：口袋营地（免费，iOS/Android）是想要在手机上体验以角色为核心、创意装饰的动物森友会粉丝的最佳选择。做上面的测验，找到你的个人最佳匹配。',
  },
  {
    q: 'Hay Day 是免费游戏吗？',
    a: 'Hay Day 在 iOS 和 Android 上完全免费下载和游玩。它通过可选的游戏内购（钻石，高级货币）维持运营，可以加快生产计时器并解锁某些物品。核心游戏无需花钱完全可以游玩，尽管在中后期游戏中不偶尔购买进度会明显变慢。没有强制广告。Hay Day 被持续评为同类游戏中最公平的免费手机游戏之一。',
  },
  {
    q: '星露谷物语有手机版吗？',
    a: '有——星露谷物语在 iOS 和 Android 上以一次性价格 4.99 美元出售。手机版是 PC 和主机版的完整移植——每种作物、角色、故事线、矿洞层和秘密都包含在内。没有广告、没有体力限制、没有计时器、没有任何形式的游戏内购。触控操作对大多数游戏内容效果良好，尽管一些玩家在较长游戏时段更喜欢连接蓝牙控制器。1.5 版本更新（包括后期内容姜岛）在 PC 发布后也已添加到手机版。',
  },
  {
    q: 'Hay Day 和 Township 有什么区别？',
    a: 'Hay Day 和 Township 都是免费的手机农场游戏，但侧重点不同。Hay Day 侧重于：纯农场体验，包括作物、动物和令人满足的生产链；路边商店的订单完成；与邻居交易；以及竞争性社区比赛。Township 侧重于：将农业与城市建设结合（你种植作物为工厂供料，工厂为城镇供货）；更多样化的生产建筑；动物园收藏；以及合作团队游戏。Hay Day 有更纯粹的农业感；Township 感觉更广泛，更偏向城镇管理。两款游戏都已运营超过 10 年，拥有活跃的玩家群。',
  },
  {
    q: '有没有没有付费赢的手机农场游戏？',
    a: '有——手机版星露谷物语（一次性 4.99 美元）是最清晰的例子：没有广告、没有计时器、没有体力、没有任何形式的游戏内购。它是没有任何货币化压力的最"纯粹"的手机农场体验。在免费游玩选项中，Hay Day 被广泛认为是最公平的免费农场游戏之一——进度可以不花钱实现，尽管在高等级时速度较慢。动物之森：口袋营地的购买更多是外观性质的——主要游戏内容免费，有可选订阅和外观道具商店。Township 介于中间——可以免费游玩，但团队游戏和后期进度受益于偶尔消费。',
  },
]

export default async function MobileFarmingQuizPage({
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
            {isZh ? '测评' : 'Quizzes'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#e8dcc8]">
            {isZh ? '手机农场游戏推荐测验' : 'Mobile Farming Game Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <MobileFarmingQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '好的手机农场游戏在等地铁的五分钟里也能让你感到踏实。'
            : 'The best mobile farming game makes even five minutes in a waiting room feel grounding.'}
        </p>

        <RelatedQuizzes currentSlug="mobile-farming-quiz" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于手机农场游戏的常见问题' : 'Mobile Farming Game FAQ'}
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
