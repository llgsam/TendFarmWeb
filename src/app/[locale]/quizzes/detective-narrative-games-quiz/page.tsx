import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { DetectiveNarrativeQuiz } from '@/components/tools/DetectiveNarrativeQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  return {
    title: isZh
      ? '侦探叙事游戏推荐测验：极乐迪斯科 vs 黄金神像案 vs 永生 vs 天堂穹顶 | Farming Game Hub'
      : 'Which Detective Narrative Game Is Right for You? Disco Elysium vs Golden Idol vs Immortality vs Heaven\'s Vault | Farming Game Hub',
    description: isZh
      ? '6 个问题，从极乐迪斯科、黄金神像案、永生、天堂穹顶中找到你的侦探叙事游戏——从技能检定 RPG 到纯视觉推理到电影档案谜题到古语言破译。'
      : '6 questions to match you with the perfect detective narrative game — Disco Elysium (skill-check RPG), The Case of the Golden Idol (visual deduction), Immortality (archival film mystery), or Heaven\'s Vault (ancient language decipherment).',
    keywords: isZh
      ? ['极乐迪斯科值得玩吗', '黄金神像案值得玩吗', '永生游戏值得玩吗', '天堂穹顶值得玩吗', '侦探游戏推荐', '叙事游戏推荐', '极乐迪斯科攻略', 'Sam Barlow 游戏推荐']
      : ['disco elysium worth it', 'the case of the golden idol worth it', 'immortality game worth it', "heaven's vault worth it", 'best detective games pc', 'best narrative games 2022 2023', 'games like disco elysium', 'detective game quiz', 'which narrative game should i play'],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/detective-narrative-games-quiz`,
      languages: buildLanguageAlternates('/quizzes/detective-narrative-games-quiz'),
    },
  }
}

export default async function DetectiveNarrativeGamesQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'

  const faqItems = isZh
    ? [
        {
          q: '极乐迪斯科值得玩吗？难度怎么样？',
          a: '极乐迪斯科绝对值得玩，被普遍认为是有史以来写作最好的游戏之一，PC 版 Metacritic 91 分。难度方面，它不是传统意义上的"困难"——没有反应时间要求，没有平台挑战——但技能检定系统意味着部分内容可能因失败而永久锁定。推荐选择感性者构建进行第一次游玩，并在多个存档槽中频繁保存。最终剪辑版包含完整配音，是推荐版本。经常打折至 10 美元左右。',
        },
        {
          q: '黄金神像案适合不喜欢教程的玩家吗？',
          a: '黄金神像案几乎没有教程——这正是它的魅力所在。游戏把你直接丢进犯罪现场，所有线索都在画面中，你需要自己发现如何解读它们。这对于喜欢自主发现的玩家非常合适，但不喜欢缺乏引导的玩家可能会感到挫败。建议：阅读场景中可见的每一个文字，包括书名、信件内容和标签。游戏赢得了 BAFTA 游戏设计奖。PC 版 Metacritic 88 分。',
        },
        {
          q: '永生游戏在哪里可以玩？是 Game Pass 里的吗？',
          a: '是的——永生在 Xbox Game Pass（PC 和 Xbox）中可以无额外费用游玩。它也在 Apple Arcade 和 Netflix Games 上提供（移动端），以及 Steam（约 20 美元）。如果你有这些订阅服务中的任何一个，可以免费体验。游戏赢得了 SAG 奖最佳全体演员表现奖——第一款赢得此奖的电子游戏。PC 版 Metacritic 87 分。',
        },
        {
          q: '天堂穹顶里的古代语言真的可以学会吗？',
          a: '是的——天堂穹顶中的古代语言由语言学顾问设计，有内部一致的语法系统。游戏设计为通过游戏过程逐渐破译它：你从视觉语境猜测词语，随着接触更多铭文，语法规律变得清晰。这是游戏最受好评的设计之一，很多玩家报告说到游戏结束时确实能够读懂基本句子。游戏约 8-12 小时，Steam 售价约 25 美元，经常打折。',
        },
        {
          q: '这些侦探游戏和农场/cozy 游戏有什么共同点？',
          a: '这类叙事侦探游戏和农场 cozy 游戏都强调"按自己节奏"游玩——没有硬性的时间压力，可以随时暂停和思考。极乐迪斯科的角色建立和对话深度类似农场游戏中的村民关系系统；黄金神像案的零压力谜题风格与整理类游戏（如 Unpacking）有相似的满足感；永生和天堂穹顶都有"解锁秘密"的渐进发现机制，类似农场游戏中逐步解锁新内容的节奏。',
        },
      ]
    : [
        {
          q: 'Is Disco Elysium worth it? What makes it different from other RPGs?',
          a: "Disco Elysium is worth it if you prioritize writing above all else — it is widely considered to have the best writing of any game ever made, with a system where your 24 skills each function as a distinct internal narrator who comments on, argues with, and complicates your observations. It is not a combat RPG: encounters are resolved through dialogue, skill checks, and roleplay. The skill check system creates real permanent consequences (some content is locked out on a failed check), and the political and philosophical depth of the world is unlike anything else in games. Metacritic 91 on PC. The Final Cut edition (with full voice acting) is the recommended version.",
        },
        {
          q: "How long is The Case of the Golden Idol? Is it good for puzzle game beginners?",
          a: "The Case of the Golden Idol takes about 6-8 hours to complete all 12 main cases, with the DLC adding 3-4 more hours. For puzzle game beginners: the game has zero tutorial and drops you straight into the first scene with no guidance, which some players find liberating and others find frustrating. The difficulty curve is well-designed — early cases are simpler, later cases are more complex. If you enjoy deductive reasoning and visual observation, it is beginner-friendly in the sense that it requires no prior puzzle game knowledge, only careful attention. BAFTA winner for Game Design. Metacritic 88 on PC.",
        },
        {
          q: 'Where can I play Immortality? Is it on Game Pass?',
          a: "Yes — Immortality is available on Xbox Game Pass (PC and Xbox) at no additional cost. It is also on Apple Arcade and Netflix Games (mobile), and Steam (~$20). If you have any of these subscriptions, you can play it for free. The mobile edition (Apple Arcade / Netflix) is a complete version of the game with touch controls. Immortality won the Screen Actors Guild Award for Outstanding Performance by a Cast — the first video game ever to win this award. Metacritic 87 on PC.",
        },
        {
          q: "Can you actually learn the ancient language in Heaven's Vault?",
          a: "Yes — the ancient language in Heaven's Vault was designed by linguistic consultant Martin Edwardes to have internally consistent grammar that can be genuinely decoded through gameplay. The game is designed to teach it through context and repetition: you make educated guesses about words from visual context, and over time grammatical patterns become clear. Many players report being able to read basic inscriptions fluently by the end of the game. The language has compound words, verb structures, and consistent sign-to-meaning relationships. This is one of the game's most praised design elements. The game takes about 8-12 hours and costs ~$25 on Steam, frequently on sale.",
        },
        {
          q: 'What detective or narrative game is best for cozy game fans?',
          a: "For cozy game fans new to detective games, The Case of the Golden Idol is the most accessible — it has no fail states, beautiful illustrated art, and self-contained cases that can be played in any order. Immortality is second-most accessible, especially if you have Game Pass or Apple Arcade (free), and rewards patient observation over fast reaction. Heaven's Vault is good for players who enjoy the gradual reveal of Stardew Valley's world-building. Disco Elysium is the most ambitious but requires comfort with a lot of reading and an open mind about political satire. All four are rated 80+ on Metacritic.",
        },
      ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh ? '侦探叙事游戏推荐测验' : 'Which Detective Narrative Game Is Right for You?',
    description: isZh
      ? '6 个问题，从极乐迪斯科、黄金神像案、永生、天堂穹顶中找到你的侦探叙事游戏'
      : "6 questions to match you with Disco Elysium, The Case of the Golden Idol, Immortality, or Heaven's Vault",
    url: `${BASE_URL}/${locale}/quizzes/detective-narrative-games-quiz`,
    inLanguage: locale,
    educationalLevel: 'Beginner',
    about: { '@type': 'Thing', name: isZh ? '侦探叙事游戏' : 'Detective Narrative Games' },
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
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">
          {isZh ? '侦探叙事游戏推荐' : 'Detective Narrative Game Finder'}
        </div>

        <div className="mb-8 rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-8">
          <DetectiveNarrativeQuiz locale={locale} />
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-[#e8dcc8]">
            {isZh ? '常见问题' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {faqItems.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-5">
                <h3 className="mb-2 font-semibold text-[#e8dcc8]">{q}</h3>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <RelatedQuizzes currentSlug="detective-narrative-games-quiz" locale={locale} />
      </div>
    </>
  )
}
