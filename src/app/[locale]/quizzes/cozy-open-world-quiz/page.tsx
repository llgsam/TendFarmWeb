import { Metadata } from 'next'
import { CozyOpenWorldQuiz } from '@/components/tools/CozyOpenWorldQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-open-world-quiz`

  return {
    title: isZh
      ? '农场游戏玩家的下一片星空：无人深空/泰拉瑞亚/Astroneer/Subnautica 推荐测验 | FarmGame Hub'
      : 'Which Open-World Game for Farming Game Fans? No Man\'s Sky, Terraria, Astroneer, Subnautica Quiz | FarmGame Hub',
    description: isZh
      ? '测验：无人深空、泰拉瑞亚、Astroneer、Subnautica——哪款开放世界探索游戏最适合喜爱农场游戏的你？6 个问题找到你的下一个探索天地。'
      : 'Quiz: No Man\'s Sky, Terraria, Astroneer, or Subnautica — which open-world exploration game is right for farming game fans? 6 questions to find your next big world.',
    keywords: isZh
      ? ['无人深空值得买吗', '泰拉瑞亚值得玩吗', 'astroneer 评测', 'subnautica 值得玩吗', '农场游戏进阶推荐', '开放世界探索游戏推荐', '星露谷之后玩什么', '无人深空 2024 评测', '泰拉瑞亚入门攻略']
      : ['no mans sky worth it 2024', 'terraria worth it review 2024', 'astroneer review worth it', 'subnautica worth it 2024', 'games like stardew valley but bigger', 'open world games for cozy gamers', 'what to play after stardew valley open world', 'no mans sky beginners guide', 'terraria vs no mans sky', 'subnautica worth buying'],
    alternates: {
      canonical,
      languages: buildLanguageAlternates('/quizzes/cozy-open-world-quiz'),
    },
  }
}

export default async function CozyOpenWorldQuizPage({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-open-world-quiz`

  const faqItems = [
    {
      q: isZh ? '无人深空（No Man\'s Sky）2024 年值得购买吗？' : "Is No Man's Sky worth buying in 2024?",
      a: isZh
        ? '无人深空在 2024 年绝对值得购买——它是历史上最伟大的游戏救赎故事之一。2016 年以失望开局，但经过多年免费更新（所有主要更新都是免费的），现在提供数百小时的内容。难度完全可调节（创意模式无生存压力），2024 年的 Nintendo Switch 版本，Game Pass 上免费可玩，并且有多人合作系统。有超过 18 亿亿个独特星球，但游戏的核心乐趣是建造基地、探索和社区参与。正面评价为"压倒性好评"。'
        : "No Man's Sky is absolutely worth buying in 2024 — it's one of the greatest redemption stories in gaming. It launched to disappointment in 2016 but has received years of free major updates and now offers hundreds of hours of content. Difficulty is fully adjustable (Creative mode has zero survival pressure), it launched on Nintendo Switch in 2024, it's available free on Game Pass, and has a rich multiplayer co-op system. With 18 quintillion unique planets, the game's core joy is base-building, exploration, and community. Rated 'Overwhelmingly Positive' on Steam in 2024.",
    },
    {
      q: isZh ? '泰拉瑞亚（Terraria）2024 年值得玩吗？适合新手吗？' : 'Is Terraria worth it in 2024 — is it good for beginners?',
      a: isZh
        ? '泰拉瑞亚是有史以来最高性价比的游戏之一——约 10 美元（经常促销至 2.5 美元），拥有超过 5,000 个物品、30+ 个 Boss 和数百小时的内容，销量超过 5,800 万份。对于新手：游戏有学习曲线，但初期很有引导性（向导 NPC 告诉你可以制作什么），社区 wiki 极为全面。关键提示是从新手模式开始，通过 wiki 了解基础内容。Steam 好评率 98%，是有史以来评分最高的游戏之一。'
        : "Terraria is one of the best value propositions in gaming — about $10 (regularly on sale for $2.50) with over 5,000 items, 30+ bosses, and hundreds of hours of content. It has sold over 58 million copies and has a 98% positive rating on Steam, making it one of the highest-rated games ever made. For beginners: there is a learning curve but the early game is well-guided (the Guide NPC tells you what you can craft), and the community wiki is extraordinarily comprehensive. Start on Classic difficulty, consult the wiki for the basics, and don't be afraid to build a shelter before nightfall.",
    },
    {
      q: isZh ? 'Astroneer 值得购买吗？它和无人深空有什么区别？' : 'Is Astroneer worth buying — how is it different from No Man\'s Sky?',
      a: isZh
        ? 'Astroneer 非常值得购买，约 30 美元，Game Pass 上可用。与无人深空的关键区别：Astroneer 更专注（太阳系内的几个星球，而非无限宇宙）、视觉上更卡通/Cozy、战斗极少，以及核心乐趣更侧重于制作和连接基地组件的机制满足感。无人深空更侧重于星系间探索的宏大规模和叙事。Astroneer 对 Cozy 游戏玩家更友好，特别是在合作模式下（最多 4 名玩家共享基地），是很多人的"第一款太空游戏"。'
        : "Astroneer is absolutely worth buying at about $30, and is available on Game Pass. Key differences from No Man's Sky: Astroneer is more focused (a handful of planets in one solar system rather than an infinite universe), more cartoonish/cozy visually, has minimal combat, and the core joy is the crafting and base-connecting mechanic satisfaction rather than galactic-scale exploration. No Man's Sky is better if you want massive scale and narrative; Astroneer is better if you want a gentle, cozy first space game — especially in co-op (up to 4 players sharing a base). Often described as 'the most cozy space game ever made.'",
    },
    {
      q: isZh ? 'Subnautica 值得游玩吗？游戏会让人感到恐惧吗？' : 'Is Subnautica worth playing — is it actually scary?',
      a: isZh
        ? 'Subnautica 绝对值得游玩——它是有史以来最独特的游戏之一（Steam 好评率 97%）。关于恐惧程度：这取决于玩家。游戏有深海恐惧元素（巨大的生物在深处徘徊），但大部分时间，在浅水珊瑚礁中收集资源是平静而美丽的。游戏确实设计了紧张时刻，但从未变成恐惧游戏。如果你对深海生物有轻度恐惧，这实际上是面对恐惧的好方法，因为游戏在感觉舒适和感觉危险之间取得了很好的平衡。收获循环（扫描植物、收集材料）对农场游戏玩家来说非常熟悉。'
        : "Subnautica is absolutely worth playing — it's one of the most uniquely affecting games ever made (97% positive on Steam). Regarding scariness: it depends on the player. The game has thalassophobia-adjacent elements (massive creatures patrol the deeper zones) but the majority of early game time spent gathering resources in shallow coral reefs is serene and beautiful. Designed tension exists but it never becomes a horror game. If you have mild deep-sea anxiety, Subnautica is actually a surprisingly good way to work through it because the game balances 'feels comfortable' and 'feels threatening' very well. The harvesting loop (scan plants, gather materials) is immediately familiar to farming game players.",
    },
    {
      q: isZh ? '农场游戏玩家进阶开放世界游戏应该从哪里开始？' : 'Which open-world game should a farming game fan start with?',
      a: isZh
        ? '对于农场游戏玩家想要进阶开放世界游戏，最佳入口取决于你想要什么：如果你想要最 Cozy、最无压力的体验，从 Astroneer（卡通太空探索，最少战斗）开始；如果你想要史诗规模的探索自由度，从无人深空开始（有创意模式）；如果你想要有挑战的进展感和大量内容，从泰拉瑞亚开始（极高性价比）；如果你想要一个真正独特且有故事的体验，从 Subnautica 开始。前三款都在 Game Pass 上，让试玩零风险。'
        : "For farming game fans transitioning to open-world games, the best entry point depends on what you want: if you want the most cozy, pressure-free experience, start with Astroneer (cartoon space exploration, minimal combat); if you want epic-scale exploration freedom, start with No Man's Sky (has Creative mode with zero survival pressure); if you want a challenging progression with massive content, start with Terraria (extraordinary value for money); if you want a truly one-of-a-kind experience with a story, start with Subnautica. The first three are available on Game Pass, making them zero-risk to try.",
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Quiz',
        name: isZh ? '农场游戏玩家的下一片星空：哪款开放世界最适合你？' : "Beyond the Farm: Which Open-World Exploration Game Is Right for You?",
        description: isZh
          ? '6 个问题找到你最适合的开放世界游戏：无人深空、泰拉瑞亚、Astroneer 或 Subnautica。'
          : "6 questions to find your ideal open-world game: No Man's Sky, Terraria, Astroneer, or Subnautica.",
        url: canonical,
        inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
        educationalLevel: 'Beginner',
        about: { '@type': 'Thing', name: 'Open World Games for Farming Game Fans' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#0f1a0f] py-12 text-[#e8dcc8]">
        <div className="mx-auto max-w-2xl px-4">
          <div className="mb-8 text-center">
            <div className="mb-4 text-5xl">🌌</div>
            <h1 className="mb-2 text-2xl font-bold text-[#e8dcc8]">
              {isZh ? '农场游戏玩家的下一片星空' : 'Beyond the Farm: Open-World Exploration Quiz'}
            </h1>
            <p className="text-sm text-[#8a9a7a]">
              {isZh
                ? '无人深空、泰拉瑞亚、Astroneer、Subnautica——找到你的下一个探索天地'
                : "No Man's Sky, Terraria, Astroneer, Subnautica — bigger worlds for fans of farming games"}
            </p>
          </div>

          <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a] p-6 shadow-xl">
            <CozyOpenWorldQuiz locale={locale} />
          </div>

          <div className="mt-12">
            <RelatedQuizzes currentSlug="cozy-open-world-quiz" locale={locale} />
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-lg font-semibold text-[#e8dcc8]">
              {isZh ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            {faqItems.map(({ q, a }, i) => (
              <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-5">
                <h3 className="mb-2 font-semibold text-[#f0a832]">{q}</h3>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
