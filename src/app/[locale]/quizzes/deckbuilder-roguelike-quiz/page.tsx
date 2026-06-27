import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { DeckbuilderRoguelikeQuiz } from '@/components/tools/DeckbuilderRoguelikeQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh'

  return {
    title: isZh
      ? '卡牌构筑Roguelike推荐测验：Cobalt Core、怪物列车、暗黑地牢2还是Across the Obelisk？'
      : 'Which Deckbuilder Roguelike Is Right for You? Cobalt Core, Monster Train, Darkest Dungeon II, or Across the Obelisk',
    description: isZh
      ? '6道题帮你找出最适合的卡牌构筑Roguelike：Cobalt Core的治愈风、怪物列车的机制深度、暗黑地牢2的黑暗叙事，还是Across the Obelisk的合作冒险？'
      : '6 questions to match you with the perfect deckbuilder roguelike — Cobalt Core, Monster Train, Darkest Dungeon II, or Across the Obelisk. Find your deck.',
    keywords: isZh
      ? [
          '卡牌构筑游戏推荐',
          'Cobalt Core好玩吗',
          '怪物列车值得买吗',
          '暗黑地牢2值得买吗',
          'Across the Obelisk合作推荐',
          'roguelike卡牌游戏推荐',
          '最好的deckbuilder游戏',
          'cozy卡牌游戏推荐',
        ]
      : [
          'cobalt core worth it',
          'monster train worth it',
          'darkest dungeon 2 worth it',
          'across the obelisk worth it',
          'best deckbuilder roguelike 2024',
          'deckbuilder games like slay the spire',
          'best card roguelike pc switch',
          'co-op deckbuilder games',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/deckbuilder-roguelike-quiz`,
      languages: buildLanguageAlternates('/quizzes/deckbuilder-roguelike-quiz'),
    },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh'

  const faqItems = isZh
    ? [
        {
          q: 'Cobalt Core 适合从未玩过卡牌构筑游戏的新手吗？',
          a: 'Cobalt Core 是最适合deckbuilder新手的选择之一。游戏的机制深度适中、学习曲线平缓，可爱的机甲动物美术风格和温馨故事让整个体验充满包容感。比起《杀戮尖塔》这类学习曲线较陡的作品，Cobalt Core 在引导新玩家理解牌组协同这件事上做得更友好。单局约2-3小时，是轻松上手的好选择。',
        },
        {
          q: '《怪物列车》和《杀戮尖塔》哪个更好？',
          a: '两款都是顶级deckbuilder，风格不同。《杀戮尖塔》更注重纯粹的卡牌引擎搭建，回合结构更传统；《怪物列车》加入了单位放置和楼层防守的维度，增加了空间策略层次。很多玩家认为《怪物列车》在重玩价值和机制深度上略胜一筹，但《杀戮尖塔》的三角色多样性和更长的历史积累让它依然是标杆。如果已经玩了几百小时《杀戮尖塔》想换口味，《怪物列车》是完美下一站。',
        },
        {
          q: '《暗黑地牢2》需要玩过第一部吗？',
          a: '不需要。《暗黑地牢2》是完整独立的作品，有自己的世界设定和故事框架。玩过第一部的玩家会对角色和世界观有更多情感连接，但新玩家完全可以直接从第二部入手。值得注意的是，第二部从地牢管理改为了公路旅行框架，玩法与第一部有较大差异，许多老玩家需要重新适应。',
        },
        {
          q: 'Across the Obelisk 单人游玩好玩吗？',
          a: 'Across the Obelisk 单人可玩，但确实为合作模式设计，单人体验中你一人需要控制全部四位英雄的策略决策，压力更大也更繁琐。喜欢深度RPG策略的单人玩家会找到乐趣，但如果你有1-3位朋友一起游玩，体验会显著提升。分支叙事和角色组合多样性在多人局中更容易被充分探索。',
        },
        {
          q: '哪款卡牌roguelike最适合喜欢cozy游戏的玩家？',
          a: 'Cobalt Core 是cozy游戏爱好者进入deckbuilder领域最自然的选择——可爱的像素美术、温馨的故事、友好的难度曲线，让整个体验没有传统roguelike的挫败感。如果你玩过《杀戮尖塔》或《Balatro》已经接受了这类游戏的节奏，《怪物列车》是深度提升的好下一步。《暗黑地牢2》和Across the Obelisk对cozy玩家而言门槛较高，建议先从前两款积累经验。',
        },
      ]
    : [
        {
          q: 'Is Cobalt Core worth it for someone new to deckbuilders?',
          a: "Cobalt Core is one of the best entry points into the deckbuilder genre. Its mechanics are deep but learnable, the mech-animal aesthetic and heartfelt story make the experience feel welcoming rather than punishing, and the run length of 2-3 hours is manageable for players used to shorter sessions. It is consistently praised as the deckbuilder that finally clicked for players who bounced off Slay the Spire.",
        },
        {
          q: 'Is Monster Train worth it in 2025?',
          a: 'Monster Train absolutely holds up. The clan combination system means the number of meaningfully different run identities is enormous, and the developer has continued supporting the game with patches and the Collector expansion. The Covenant 25 prestige system gives veteran players a clear progression ladder that keeps the game engaging for hundreds of hours. It is one of the highest-rated deckbuilders ever made and has not dated at all.',
        },
        {
          q: 'Is Darkest Dungeon II worth it?',
          a: "Darkest Dungeon II is worth it if you go in knowing what it is: a brutal, literary roguelike with a steep learning curve that rewards patience and mastery. It is not a casual game. But for players who want their roguelikes to have weight and meaning, Darkest Dungeon II delivers one of the most cohesive artistic experiences in the genre. The relationship system adds significant strategic depth over the original, and the road journey format creates a genuinely different feel.",
        },
        {
          q: 'Is Across the Obelisk good for solo players?',
          a: "Across the Obelisk is playable solo — you control all four heroes yourself — but it is clearly optimized for co-op. Solo players who enjoy deep tactical management will find plenty to engage with, and the branching narrative adds replay value. However, if you have even one friend to play with, the co-op experience is dramatically better. The game shines when strategy discussion happens between real players rather than in your own head.",
        },
        {
          q: 'What is the best deckbuilder roguelike for beginners?',
          a: "For deckbuilder beginners, Cobalt Core is the most welcoming starting point — its cozy aesthetic, forgiving difficulty curve, and clear tutorial reduce the friction that makes many new players bounce off the genre. Slay the Spire remains the genre standard and is worth playing early. Monster Train and Darkest Dungeon II are better suited for players who have already completed several Slay the Spire runs and want more depth or different textures from the genre.",
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
      ? '卡牌构筑Roguelike推荐测验：你适合哪款？'
      : 'Which Deckbuilder Roguelike Is Right for You?',
    description: isZh
      ? '6道题帮你找出最适合的卡牌构筑游戏：Cobalt Core、怪物列车、暗黑地牢2或Across the Obelisk。'
      : '6 questions to match you with Cobalt Core, Monster Train, Darkest Dungeon II, or Across the Obelisk.',
    url: `${BASE_URL}/${locale}/quizzes/deckbuilder-roguelike-quiz`,
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
          <div className="mb-3 text-5xl">🃏</div>
          <h1 className="mb-3 text-2xl font-bold leading-tight md:text-3xl">
            {isZh
              ? '卡牌构筑Roguelike推荐测验：你适合哪款？'
              : 'Which Deckbuilder Roguelike Is Right for You?'}
          </h1>
          <p className="text-sm text-[#8a9a7a]">
            {isZh
              ? 'Cobalt Core · 怪物列车 · 暗黑地牢2 · Across the Obelisk — 6道题精准推荐'
              : 'Cobalt Core · Monster Train · Darkest Dungeon II · Across the Obelisk — 6 questions'}
          </p>
        </div>

        <DeckbuilderRoguelikeQuiz locale={locale} />

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

        <RelatedQuizzes currentSlug="deckbuilder-roguelike-quiz" locale={locale} />
      </div>
    </main>
  )
}
