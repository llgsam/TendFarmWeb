import { CozyBeginnerQuiz } from '@/components/tools/CozyBeginnerQuiz'
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
      ? 'Cozy 游戏新手入门测验 — 哪款最适合你？动物之森 / 星露谷 / Palia / Dreamlight Valley'
      : 'Best Cozy Game for Beginners Quiz 2025 — Animal Crossing vs Stardew Valley vs Palia vs Dreamlight Valley',
    description: isZh
      ? '6 个问题为 cozy 游戏新手找到完美入门作品。无论你的游戏经验水平或预算如何，都能找到最适合你的第一款 cozy 游戏。'
      : '6 questions to find the perfect first cozy game — no gaming experience needed. Covers Animal Crossing, Stardew Valley, Palia (free), and Disney Dreamlight Valley with honest beginner tips for each.',
    keywords: isZh
      ? ['cozy 游戏新手', 'cozy 游戏入门推荐', '新手第一款游戏推荐', '动物之森新手', '星露谷新手', 'Palia 免费', 'Dreamlight Valley 推荐', '适合不爱游戏的人']
      : [
          'best cozy games for beginners',
          'easy cozy games to get into',
          'cozy games for non gamers',
          'first cozy game to play',
          'cozy games for beginners 2025',
          'what cozy game should i start with',
          'easiest cozy games',
          'cozy games for people who dont play games',
          'animal crossing vs stardew valley for beginners',
          'is palia good for beginners',
          'beginner friendly cozy games',
          'cozy games no experience needed',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-games-for-beginners`,
      languages: buildLanguageAlternates('/quizzes/cozy-games-for-beginners'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'What is the best cozy game for absolute beginners in 2025?',
    a: "The best cozy game for absolute beginners in 2025 is Animal Crossing: New Horizons. It is the only major cozy game designed from the ground up to have literally no way to fail — you cannot die, there are no time limits on activities, crops never wither, and there are no enemies or penalties for any choice you make. The real-world clock means your island grows at your real-life pace, never rushing you. If budget is your main concern, Palia is the best free cozy game for beginners, available on PC (Steam/Epic) and Nintendo Switch with zero cost to download and start playing.",
  },
  {
    q: 'Is Stardew Valley good for gaming beginners?',
    a: "Stardew Valley is beginner-friendly but not quite zero-pressure like Animal Crossing. The game is very forgiving — you can never lose permanently, and there is no wrong way to progress. However, there are some time-management elements (your energy resets each day, some crops take multiple days to grow) and a loose progression goal (restoring the Community Center) that might feel slightly structured for complete newcomers. Most first-time gamers find Stardew Valley accessible within a few hours. If you have any gaming experience at all, it is one of the best starting points.",
  },
  {
    q: 'Is Palia free to play? Is it good for beginners?',
    a: "Yes, Palia is completely free to play — you can download it right now on PC via Steam or the Epic Games Store, or on Nintendo Switch, with no purchase required. It is genuinely good for beginners: there are no fail states, no ways to die, a helpful in-game tutorial system, and a welcoming community of real players. The game offers farming, fishing, hunting, cooking, and crafting in a gentle MMO world. Palia makes money through optional cosmetic items (outfits, furniture), but the core game is entirely accessible without spending anything.",
  },
  {
    q: 'Is Disney Dreamlight Valley good for people who are new to gaming?',
    a: "Yes — Disney Dreamlight Valley is especially good for non-gamers because it wraps its mechanics in familiar Disney and Pixar characters. When Mickey Mouse or Wall-E asks for your help, there's an instant emotional context that removes the alienating feeling of learning an unfamiliar game world. The game provides clear quest guidance at all times, so you always know what to do next. It's free to download on all major platforms and features farming, cooking, fishing, and life-sim elements in a forgiving, story-driven format.",
  },
  {
    q: 'What is the easiest cozy game on Nintendo Switch for beginners?',
    a: "The easiest cozy game on Nintendo Switch for beginners is Animal Crossing: New Horizons. It has zero fail states, zero time pressure, and runs on your real-world clock so there's never a moment where you feel behind or overwhelmed. The second-easiest is Palia, which is free on Switch and has a very gentle learning curve. If you want something you can play for free first to see if you like the genre, start with Palia. If you're ready to invest in a game and want the most welcoming possible experience, Animal Crossing: New Horizons is the gold standard.",
  },
]

const FAQ_ZH = [
  {
    q: '2025 年 cozy 游戏新手最适合从哪款开始？',
    a: '2025 年 cozy 游戏新手最适合从动物之森：新视野开始。它是唯一一款从根本上设计成字面意义上无法失败的主流 cozy 游戏——你永远不会死亡、活动没有时间限制、作物不会枯萎、没有敌人，你做的任何选择都没有惩罚。实时时钟意味着你的岛屿以你真实生活的节奏成长，永远不会催促你。如果预算是你的主要顾虑，Palia 是最好的免费新手 cozy 游戏，可在 PC（Steam/Epic）和 Nintendo Switch 上免费下载开始游玩，零成本。',
  },
  {
    q: '星露谷物语适合游戏新手吗？',
    a: '星露谷物语对新手友好，但不像动物之森那样完全零压力。游戏非常宽容——你永远不会永久失去任何东西，没有错误的进度方式。但是，有一些时间管理元素（你的体力每天重置，一些作物需要多天生长）和一个松散的进度目标（修复社区中心），对于完全的游戏新手来说可能感觉稍微有点结构化。大多数第一次玩游戏的人会发现星露谷物语在几个小时内就能上手。如果你有任何游戏经验，这是最好的起点之一。',
  },
  {
    q: 'Palia 免费吗？适合新手吗？',
    a: '是的，Palia 完全免费——你现在就可以通过 Steam 或 Epic Games Store 在 PC 上下载，或在 Nintendo Switch 上下载，无需购买。它对新手真正友好：没有失败状态、没有死亡方式、有有用的游戏内教程系统和热情的真实玩家社区。游戏在温和的 MMO 世界中提供农业、钓鱼、狩猎、烹饪和制作。Palia 通过可选的外观物品（服装、家具）赚钱，但核心游戏无需花任何钱就完全可以访问。',
  },
  {
    q: 'Disney Dreamlight Valley 适合游戏新手吗？',
    a: '是的——Disney Dreamlight Valley 对非游戏玩家特别好，因为它将游戏机制包裹在熟悉的 Disney 和 Pixar 角色中。当米奇鼠或机器人总动员的瓦力请求你帮助时，有即时的情感背景，消除了学习陌生游戏世界的疏离感。游戏始终提供清晰的任务指引，所以你总是知道接下来做什么。它在所有主要平台上都可以免费下载，以宽容的、故事驱动的格式提供农业、烹饪、钓鱼和生活模拟元素。',
  },
  {
    q: 'Nintendo Switch 上最适合新手的 cozy 游戏是什么？',
    a: 'Nintendo Switch 上最适合新手的 cozy 游戏是动物之森：新视野。它有零失败状态、零时间压力，并以你的现实世界时钟运行，所以从来没有你感到落后或不知所措的时刻。第二容易的是 Palia，它在 Switch 上免费，学习曲线非常平缓。如果你想先免费试试看你是否喜欢这个类型，从 Palia 开始。如果你准备好投入一款游戏，想要最受欢迎的体验，动物之森：新视野是黄金标准。',
  },
]

export default async function CozyBeginnerPage({
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
            {isZh ? 'Cozy 游戏新手入门测验' : 'Best Cozy Game for Beginners Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyBeginnerQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '每个人都有属于自己的第一款 cozy 游戏。找到它，你会明白这个类型为什么让那么多人放慢脚步。'
            : "Everyone has their first cozy game. Find yours, and you'll understand why this genre changed how people think about play."}
        </p>

        <RelatedQuizzes currentSlug="cozy-games-for-beginners" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? 'Cozy 游戏新手常见问题' : 'Cozy Games for Beginners FAQ'}
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
