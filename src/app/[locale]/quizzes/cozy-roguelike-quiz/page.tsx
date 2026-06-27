import { CozyRoguelikeQuiz } from '@/components/tools/CozyRoguelikeQuiz'
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
  const isZh = locale === 'zh'
  return {
    title: isZh
      ? '入门 Roguelike 推荐测验 — 黑帝斯、吸血鬼幸存者、杀戮尖塔还是 Balatro？'
      : 'Which Roguelike Should You Start With? Hades, Vampire Survivors, Slay the Spire, or Balatro?',
    description: isZh
      ? '6 个问题，在黑帝斯、吸血鬼幸存者、杀戮尖塔和 Balatro 中找到最适合你的入门 Roguelike 体验。四款全部低门槛、高可重玩性，面向任何游戏水平。'
      : '6 questions to find your starter roguelike — from narrative action escape to bullet heaven to deckbuilding strategy to poker-based multiplier madness. All beginner-friendly, all infinitely replayable.',
    keywords: isZh
      ? ['入门 roguelike 推荐', '黑帝斯评测值得买吗', '吸血鬼幸存者推荐', '杀戮尖塔评测', 'Balatro 评测值得玩吗', '轻度 roguelike 游戏', '容易上手的 roguelike', 'cozy roguelike 游戏推荐', 'Hades 游戏推荐', 'Balatro 年度最佳游戏 2024']
      : [
          'which roguelike should i play first',
          'is hades worth it',
          'hades review beginner',
          'vampire survivors worth it',
          'vampire survivors review 2025',
          'slay the spire review worth buying',
          'is balatro worth it',
          'balatro review 2024 game of the year',
          'best beginner roguelike games',
          'easy roguelike for non gamers',
          'cozy roguelike games pc switch',
          'best roguelike games 2024 2025',
          'hades vs slay the spire which is better',
          'balatro vs slay the spire',
          'vampire survivors game pass',
          'best short roguelike games',
          'roguelike games with no permadeath',
          'accessible roguelike games beginners',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-roguelike-quiz`,
      languages: buildLanguageAlternates('/quizzes/cozy-roguelike-quiz'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Hades worth buying for someone who has never played a roguelike?',
    a: "Hades is almost universally considered the best entry point for roguelike beginners, especially for players who come from cozy or narrative game backgrounds. The key reason is that dying is a story mechanic, not a punishment — every death advances conversations, relationships, and plot with the permanent cast of characters. The game won multiple Game of the Year awards in 2020 and is widely credited with converting millions of 'I don't like roguelikes' players into roguelike fans. The combat is fast action with a generous dodge window, the difficulty adjusts with God Mode (a gradual damage reduction toggle that removes no content), and at around $25 it offers 50-100+ hours of content. Hades II (sequel, in early access as of 2024) is equally praised. For cozy gamers specifically, the Greek mythology setting, gorgeous art, and exceptional voice acting make it feel like a premium experience rather than a punishing indie game.",
  },
  {
    q: 'Is Vampire Survivors worth it? Is it really just $3?',
    a: "Yes — Vampire Survivors is genuinely one of the best value games ever made at $3-5 on PC and free with ads (or $3 ad-free) on mobile. It was made almost entirely by a solo developer, sold millions of copies, and launched an entire genre of 'bullet heaven' or 'auto-shooter' games. The gameplay is intentionally simple: your character moves, your weapons fire automatically, you pick upgrades every few levels, and you try to survive 30 minutes against thousands of enemies. The game requires almost no real-time decision-making — you choose upgrades, then watch your character become dramatically overpowered. The satisfaction is deeply irrational (numbers going up, screen becoming an explosion of effects) but extremely effective. Available on Xbox Game Pass. Mobile version is iOS and Android. New characters, stages, and DLC have expanded content significantly since launch.",
  },
  {
    q: 'How hard is Slay the Spire? Is it too complex for casual players?',
    a: "Slay the Spire is more strategic than action-based — it's a turn-based deckbuilding game, so you have unlimited time to make each decision. There is no timing pressure or dexterity requirement. The challenge is strategic: building a coherent deck, understanding card synergies, and making good decisions about which cards and relics to take. For players who enjoy puzzle games, card games, or strategic thinking, the difficulty curve is very satisfying. For players who prefer narrative or pure relaxation over strategic decisions, it may feel more demanding. A run takes 45-90 minutes. The four characters each have completely different card sets, so there are hundreds of hours of new-feeling content. Widely considered one of the most influential games of the last decade. The iOS version is excellent for portable sessions.",
  },
  {
    q: 'What is Balatro and why is everyone talking about it?',
    a: "Balatro won multiple Game of the Year awards in 2024 and became one of the year's most-discussed games despite being made by a single developer (LocalThunk). The premise sounds simple: it's poker, but you can modify the rules. You buy Joker cards that add scoring multipliers to your hands. You can add or remove cards from the deck, change which hands score, upgrade individual cards, and discover combinations that turn modest poker hands into astronomical multipliers (x800 on a pair, for instance). The game starts simple and becomes unfathomably deep as you discover what combinations are possible. Runs take 20-60 minutes. It's available on all major platforms including mobile. The 'one more run' quality is extreme — it's widely reported as causing players to lose entire evenings without noticing. Balatro is also noted as a remarkably good 'gateway game' for people who do not normally play roguelikes or card games.",
  },
  {
    q: 'What is the best roguelike for someone who wants a quick session under 30 minutes?',
    a: "For short sessions under 30 minutes, Vampire Survivors is the best choice — a standard run is 20-30 minutes and feels complete on its own. Hades runs are 20-40 minutes depending on your speed. Balatro runs vary from 20 minutes to over an hour depending on how the run goes. Slay the Spire runs are typically the longest at 45-90 minutes. If you want truly bite-sized roguelike sessions, Luck Be a Landlord ($11, PC) and Peglin ($10, PC) both have shorter run times. For mobile, Vampire Survivors is the clear pick for commute-length sessions. Note that all four of the games in this quiz are available on mobile — Hades on iOS, Vampire Survivors on iOS and Android, Slay the Spire on iOS and Android, and Balatro on iOS and Android — so session length can also be adjusted by simply pausing and resuming on mobile.",
  },
]

const FAQ_ZH = [
  {
    q: '从未玩过 Roguelike 的人，黑帝斯值得买吗？',
    a: '黑帝斯几乎被普遍认为是 roguelike 新手的最佳入门点，尤其是来自治愈或叙事游戏背景的玩家。关键原因是死亡是故事机制，而不是惩罚——每次死亡都推进与固定角色阵容的对话、关系和情节。这款游戏在 2020 年赢得了多个年度最佳游戏奖，被广泛认为将数百万"我不喜欢 roguelike"的玩家转变为 roguelike 粉丝。战斗是快速动作配合慷慨的闪避窗口，难度随神明模式调整（一个逐渐降低伤害的开关，不移除任何内容），约 25 美元提供 50-100 多小时的内容。黑帝斯 II（续集，截至 2024 年处于抢先体验阶段）同样备受好评。对于 cozy 游戏玩家，希腊神话设定、精美美术和出色的配音使其感觉像高级体验而不是惩罚性的独立游戏。',
  },
  {
    q: '吸血鬼幸存者值得买吗？它真的只要 3 美元吗？',
    a: '是的——吸血鬼幸存者在 PC 上 3-5 美元、手机上免费有广告（或 3 美元去广告），是有史以来性价比最高的游戏之一。它几乎完全由一位独立开发者制作，销售了数百万份，并开创了整个"弹幕天堂"或"自动射击"游戏类型。游戏玩法刻意简单：你的角色移动，你的武器自动射击，你每隔几级选择一个升级，你试图在数千个敌人中存活 30 分钟。这款游戏几乎不需要实时决策——你选择升级，然后看着你的角色变得非常强大。满足感极其非理性（数字上涨、屏幕变成效果的爆炸）但极其有效。可在 Xbox Game Pass 上获取。手机版本适用于 iOS 和 Android。自发布以来，新角色、新关卡和 DLC 已大幅扩展内容。',
  },
  {
    q: '杀戮尖塔难吗？休闲玩家能玩吗？',
    a: '杀戮尖塔比行动型游戏更具策略性——它是回合制卡组构建游戏，所以你有无限时间做每个决定。没有时间压力或操作要求。挑战是策略性的：构建一致的牌组、理解卡牌协同效应，以及做出关于选择哪些卡牌和遗物的好决定。对于喜欢益智游戏、纸牌游戏或战略思维的玩家，难度曲线非常令人满足。对于更喜欢叙事或纯放松而非战略决策的玩家，它可能感觉更有要求。一局大约需要 45-90 分钟。四个角色各有完全不同的卡牌组，所以有数百小时的新鲜感内容。被广泛认为是过去十年最具影响力的游戏之一。iOS 版本非常适合随身游戏。',
  },
  {
    q: 'Balatro 是什么游戏？为什么大家都在讨论它？',
    a: 'Balatro 在 2024 年赢得了多个年度最佳游戏奖，尽管是由一位独立开发者（LocalThunk）制作，却成为年度最受讨论的游戏之一。前提听起来很简单：这是扑克，但你可以修改规则。你购买为你的手牌增加计分乘数的小丑牌。你可以添加或移除牌组中的牌，改变哪些牌型得分，升级单张牌，发现将普通扑克手牌变成天文数字乘数的组合（例如一对牌得到 x800）。游戏从简单开始，随着你发现可能的组合变得深不可测。每局需要 20-60 分钟。可在所有主要平台（包括手机）上获取。"再来一局"的特质极强——据广泛报道，它会让玩家在不知不觉中度过整个傍晚。Balatro 也被认为是不经常玩 roguelike 或纸牌游戏的人非常好的"入门游戏"。',
  },
  {
    q: '想要 30 分钟以内快速游戏，哪款 Roguelike 最适合？',
    a: '30 分钟以内的短游戏，吸血鬼幸存者是最佳选择——标准局大约 20-30 分钟，感觉本身就是完整的。黑帝斯的局大约 20-40 分钟，取决于你的速度。Balatro 的局从 20 分钟到一个多小时不等，取决于游戏进展。杀戮尖塔的局通常最长，为 45-90 分钟。如果你想要真正的零食式 roguelike 游戏，Luck Be a Landlord（11 美元，PC）和 Peglin（10 美元，PC）都有更短的游玩时间。手机方面，吸血鬼幸存者是通勤时段游戏的明确选择。注意，这个测验中的所有四款游戏都可在手机上获取——黑帝斯在 iOS 上，吸血鬼幸存者在 iOS 和 Android 上，杀戮尖塔在 iOS 和 Android 上，Balatro 在 iOS 和 Android 上——所以也可以通过在手机上暂停和恢复来调整游戏时长。',
  },
]

export default async function CozyRoguelikeQuizPage({
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
            {isZh ? '入门 Roguelike 推荐测验' : 'Which Roguelike Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyRoguelikeQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? 'Roguelike 的魔力在于：每一次失败都教会你一些让下一局更好的东西。'
            : 'The magic of roguelikes: every run ends, but every run teaches you something that makes the next one better.'}
        </p>

        <RelatedQuizzes currentSlug="cozy-roguelike-quiz" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '入门 Roguelike 常见问题' : 'Starter Roguelike FAQ'}
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
