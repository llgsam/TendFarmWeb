import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { CozyIndieFarmQuiz } from '@/components/tools/CozyIndieFarmQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

const SLUG = 'cozy-indie-farm-quiz'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    title: isZh
      ? '治愈独立农场游戏推荐测验 — Dinkum/Kynseed/Littlewood/旅者驿站 | Farm Game Hub'
      : 'Which Cozy Indie Farming Game Is Right for You? Dinkum, Kynseed, Littlewood, Travellers Rest Quiz | Farm Game Hub',
    description: isZh
      ? '6道题帮你发现最适合的治愈独立农场游戏：澳式荒野开拓Dinkum、跨代传承Kynseed、纯粹建镇Littlewood、还是酒馆经营旅者驿站？双语推荐，含游玩攻略。'
      : 'Take our 6-question quiz to find your cozy indie farming match: Dinkum Australian outback, Kynseed generational legacy, Littlewood zero-pressure town building, or Travellers Rest tavern farming. Full bilingual guide.',
    keywords: isZh
      ? [
          '治愈独立农场游戏推荐',
          'Dinkum游戏值得买吗',
          'Kynseed推荐',
          'Littlewood游戏好玩吗',
          '旅者驿站推荐',
          '澳洲农场游戏',
          '多代传承农场游戏',
          '治愈建设游戏推荐',
          '酒馆经营游戏',
          '类星露谷游戏2024',
        ]
      : [
          'cozy indie farming game quiz',
          'Dinkum worth it',
          'Kynseed worth it',
          'Littlewood farming game review',
          'Travellers Rest game worth it',
          'games like Stardew Valley',
          'Australian farming game',
          'generational farming game',
          'tavern farming game',
          'cozy indie farm 2024',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/${SLUG}`,
      languages: buildLanguageAlternates(`/quizzes/${SLUG}`),
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const faqItems = isZh
    ? [
        {
          q: 'Dinkum 值得买吗？和星露谷物语比哪个好？',
          a: '《Dinkum》对于喜欢澳洲主题和多人合作的玩家非常值得购买。它和《星露谷》的核心区别在于：Dinkum 有完整的多人联机模式、独特的"许可证"推进系统和真实的澳洲野生生态。如果你已经通关星露谷并寻求新鲜感，Dinkum 提供的荒野开拓体验是最接近但又截然不同的选择。',
        },
        {
          q: 'Kynseed 有中文支持吗？',
          a: '截至2024年，《Kynseed》在Steam版本提供英文为主的语言支持，官方中文翻译仍在开发中。对中文玩家而言，游戏的文字量较大（对话、任务描述、商店说明），因此建议具备基础英文阅读能力的玩家入手，或等待官方中文版发布。',
        },
        {
          q: 'Littlewood 和动物森友会有什么区别？',
          a: '《Littlewood》和《动物森友会》都是低压力的治愈游戏，但区别显著：Littlewood 没有每日一件事的限制，你可以在一天内建造多栋建筑；Littlewood 的制作系统更深，需要采集材料和合成配方；Littlewood 没有实时时钟概念，完全按你的节奏推进。如果你喜欢动森但觉得节奏太慢，Littlewood 可能更适合你。',
        },
        {
          q: '旅者驿站（Travellers Rest）好玩吗？抢先体验值得现在购买吗？',
          a: '《旅者驿站》目前处于抢先体验阶段，核心玩法循环（种植-酿造-烹饪-服务-升级）已经相当完整且令人满足。主要缺少的是更多的后期内容和完整的故事线。如果你对"现在购买支持独立开发者并随着更新成长"的模式感兴趣，现在入手很值。如果你需要完整体验，等1.0正式版也是合理选择。',
        },
        {
          q: '这四款游戏哪款最适合《星露谷物语》玩家？',
          a: '取决于你最爱星露谷哪个部分：喜欢社区建设和自由度 → Littlewood；喜欢挖矿探索和多人合作 → Dinkum；喜欢深度社交关系和长期游玩 → Kynseed；喜欢经营管理和看到生意成果 → 旅者驿站。四款都有星露谷的核心治愈感，但各自侧重不同。',
        },
      ]
    : [
        {
          q: 'Is Dinkum worth it in 2024?',
          a: 'Dinkum is absolutely worth it in 2024, especially for players who have exhausted Stardew Valley and want something with a genuinely fresh setting. The Australian wildlife and biomes give it an identity no other farming game has, and its multiplayer support makes it one of the few cozy farming games where playing with friends is a fully featured primary mode. The Early Access state means content is still being added, but the core game already delivers dozens of hours of satisfying play.',
        },
        {
          q: "Is Kynseed worth it? What's the generational mechanic like?",
          a: 'Kynseed is worth it for players who want depth and emotional investment in a farming life sim. The generational mechanic works like this: your character ages in real time, can marry, and eventually your children take over the family business. You can train each child in different skills, so one generation might focus on farming while the next specializes in the apothecary. The tone is Fable-esque — whimsical, sometimes bittersweet, with British folk humor throughout.',
        },
        {
          q: 'Is Littlewood good for players who find Stardew Valley too stressful?',
          a: 'Littlewood is perfect for players who find Stardew Valley too stressful. Unlike Stardew, Littlewood has no stamina system that runs out, no seasonal crop death timers, no villager schedules to chase, and no combat. You can play at any time of day, build at any pace, and nothing in the world will ever punish you for taking a break. It is the purest expression of zero-pressure cozy farming design currently available.',
        },
        {
          q: 'How does farming work in Travellers Rest?',
          a: "In Travellers Rest, farming is integrated directly into the tavern economy. You grow herbs, vegetables, and brewing ingredients in the garden behind your inn. These ingredients are then used in the kitchen to cook food dishes or in the cellar to brew ales and wines. Better-quality ingredients produce higher-quality dishes and drinks, which earn more gold and higher customer satisfaction scores. Farming is not the end goal — it's the supply chain that powers your hospitality business.",
        },
        {
          q: 'Which cozy indie farming game has the best content updates?',
          a: 'Dinkum and Travellers Rest are both in Early Access and update most frequently, with Dinkum receiving regular content patches with new biomes, seasonal events, and multiplayer improvements. Kynseed received its 1.0 launch in 2023 and continues to receive post-launch content. Littlewood is fully released and receives occasional quality-of-life updates. For players who enjoy watching a game grow over time, Dinkum currently has the most active development cadence.',
        },
      ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh
      ? '治愈独立农场游戏推荐测验'
      : 'Which Cozy Indie Farming Game Is Right for You?',
    description: isZh
      ? '6道双语题目，从Dinkum、Kynseed、Littlewood、旅者驿站中找出最适合你的治愈独立农场游戏'
      : '6 questions to match you with your perfect cozy indie farming game from Dinkum, Kynseed, Littlewood, and Travellers Rest',
    url: `${BASE_URL}/${locale}/quizzes/${SLUG}`,
  }

  return (
    <main className="min-h-screen bg-[#0f1a0f] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
        />

        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">🌿</div>
          <p className="mb-2 text-sm text-[#8a9a7a]">
            {isZh ? '治愈独立农场推荐' : 'Cozy Indie Farm Pick'}
          </p>
          <h1 className="mb-3 text-2xl font-bold text-[#e8dcc8] md:text-3xl">
            {isZh
              ? '治愈独立农场游戏推荐测验'
              : 'Which Cozy Indie Farming Game Is Right for You?'}
          </h1>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh
              ? 'Dinkum、Kynseed、Littlewood、旅者驿站——6道题帮你找到下一款隐藏宝藏农场游戏'
              : 'Dinkum, Kynseed, Littlewood, or Travellers Rest — 6 questions to find your hidden gem'}
          </p>
        </div>

        <CozyIndieFarmQuiz locale={locale} />

        <div className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '常见问题' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-5">
            {faqItems.map((item, i) => (
              <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 p-5">
                <h3 className="mb-2 font-semibold text-[#f0a832]">{item.q}</h3>
                <p className="text-sm leading-relaxed text-[#c8bca8]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <RelatedQuizzes currentSlug={SLUG} locale={locale} />
      </div>
    </main>
  )
}
