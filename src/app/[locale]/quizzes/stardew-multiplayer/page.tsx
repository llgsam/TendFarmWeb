import { StardewMultiplayerQuiz } from '@/components/tools/StardewMultiplayerQuiz'
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
      ? '星露谷联机：你是哪种队友类型？— 多人模式角色测验'
      : 'Stardew Valley Co-op: What Kind of Partner Are You? — Multiplayer Role Quiz',
    description: isZh
      ? '6 个联机场景题，测出你在星露谷多人农场里是补给官、建造师、探险家还是规划师。发给队友一起对号入座！'
      : '6 co-op scenarios to find your Stardew Valley multiplayer role — The Provider, Builder, Explorer, or Planner. Tag your partner and compare results!',
    keywords: isZh
      ? ['星露谷联机', '星露谷多人模式', '星露谷联机攻略', '星露谷联机角色测验', '星露谷 co-op 怎么玩', '星露谷联机几人']
      : [
          'stardew valley multiplayer',
          'stardew valley co-op quiz',
          'stardew valley co-op tips',
          'stardew valley multiplayer roles',
          'how does stardew valley multiplayer work',
          'stardew valley co-op how many players',
          'stardew valley multiplayer guide',
          'stardew valley co-op partner types',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/stardew-multiplayer`,
      languages: buildLanguageAlternates('/quizzes/stardew-multiplayer'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'How does Stardew Valley multiplayer work?',
    a: "Stardew Valley multiplayer (co-op) allows 1–4 players to share a single farm together. One player hosts the farm and acts as the main farmer; other players join as farmhands with their own cabins on the property. All players share the same farm, the same in-game time, and the same money (gold). Each player has their own inventory, energy, and friendship hearts with villagers, but all farm buildings, crops, and bank balance are shared. The game uses peer-to-peer connections — the host needs to invite others via Steam, GOG, or a direct server invite code. Progress carries over even when farmhands are offline, though only the host's days advance when playing solo.",
  },
  {
    q: 'How many players can play Stardew Valley co-op?',
    a: 'Stardew Valley supports up to 4 players in co-op multiplayer on PC (Steam and GOG). On Nintendo Switch, the maximum is 4 players in local co-op (split-screen) and up to 4 in online co-op. PlayStation and Xbox also support up to 4 players online. Mobile does not support multiplayer. Note that with 4 players, the farm can feel crowded early on — 2-3 players is often considered the sweet spot for balance between social fun and manageable complexity.',
  },
  {
    q: 'Can you play Stardew Valley cross-platform with friends?',
    a: 'No — Stardew Valley does not support cross-platform multiplayer between PC, Switch, PlayStation, and Xbox. Each platform can only play with others on the same platform (PC with PC, Switch with Switch, etc.). This is a known limitation that ConcernedApe (the developer) has not added cross-platform support for as of 2025. The only workaround is for all friends to own the game on the same platform.',
  },
  {
    q: 'What are the best tips for Stardew Valley co-op?',
    a: "Top Stardew Valley co-op tips: (1) Divide roles early — assign one person to farm, one to mine, one to fish or forage. Specialization is dramatically more efficient than everyone doing the same thing. (2) Set up a shared chest system with labeled storage areas — disorganized shared chests are the number one co-op frustration. (3) Communicate before spending large amounts of shared gold — buying buildings without warning is a leading cause of multiplayer conflict. (4) Make sure everyone understands the shared vs. personal inventory system before starting. (5) Get sprinklers as soon as possible — in multiplayer, watering crops manually at scale is exhausting. (6) Talk to townspeople and give gifts every day — friendship hearts do not transfer between players, so if you want to see all villager storylines, coordinate who romances whom.",
  },
  {
    q: 'Is Stardew Valley better solo or in multiplayer?',
    a: "Both are great for different reasons. Solo is better for: complete narrative immersion, your own pace, all romance/friendship storylines at full depth, and the classic farming RPG experience. Multiplayer is better for: social fun and shared laughs, faster progression (more hands = more done per day), role specialization making the farm feel alive, and the unique comedy of four people arguing about crop layout at midnight. Most fans recommend playing solo first to learn the game, then doing a co-op run with friends — the multiplayer experience is richer when at least some players know what they are doing.",
  },
]

const FAQ_ZH = [
  {
    q: '星露谷物语联机模式怎么玩？',
    a: '星露谷联机（合作模式）支持 1-4 名玩家共享同一个农场。一名玩家作为房主（主要农夫），其他人以帮工身份加入，在农场上拥有各自的小屋。所有玩家共享同一个农场、同一个游戏内时间和同一笔钱（金币）。每个玩家有自己的背包、体力和与村民的好感度，但农场建筑、作物和账户余额是共享的。游戏使用点对点连接——房主通过 Steam、GOG 或直接服务器邀请码邀请其他人加入。即使帮工不在线，进度也会保留，但只有房主单独游玩时，游戏天数才会推进。',
  },
  {
    q: '星露谷物语联机最多几个人？',
    a: '星露谷在 PC（Steam 和 GOG）上支持最多 4 名玩家联机合作。任天堂 Switch 最多支持 4 名玩家本地合作（分屏）和最多 4 名玩家线上合作。PlayStation 和 Xbox 也支持最多 4 名玩家线上游玩。手机版不支持多人模式。需要注意的是，4 名玩家的情况下农场前期可能会感觉有些拥挤——2-3 名玩家通常被认为是社交乐趣和可控复杂度之间的最佳平衡点。',
  },
  {
    q: '星露谷联机支持跨平台游玩吗？',
    a: '不支持——星露谷目前不支持 PC、Switch、PlayStation 和 Xbox 之间的跨平台联机。每个平台只能与同平台的玩家游玩（PC 和 PC、Switch 和 Switch 等）。这是一个已知限制，截至 2025 年，开发者 ConcernedApe 尚未添加跨平台支持。唯一的解决办法是让所有朋友在同一平台上购买游戏。',
  },
  {
    q: '星露谷联机有哪些最佳攻略？',
    a: '星露谷联机最佳攻略：(1) 尽早分工——一个人负责农业，一个人负责挖矿，一个人负责钓鱼或采集。专业化分工效率远超所有人做同样的事。(2) 建立贴了标签的共享收纳系统——混乱的共享箱是联机体验最大的挫败感来源。(3) 在花大量共享金币之前先沟通——不打招呼就购买建筑是联机冲突的主要原因。(4) 确保所有人在开始前都理解共享和个人背包系统。(5) 尽快获得洒水器——联机模式下手动大规模浇水会耗尽所有人的耐心。(6) 每天和村民交谈并送礼——好感度不会在玩家之间共享，所以如果大家都想看到所有村民故事线，需要协调各自追谁。',
  },
  {
    q: '星露谷物语单人还是联机更好玩？',
    a: '两种模式都很出色，适合不同需求。单人更适合：完整的叙事沉浸感、自己掌控节奏、完整深度的所有恋爱/好感度故事线，以及经典农场 RPG 体验。联机更适合：社交乐趣和共同的欢笑时刻、更快的进度（多双手 = 每天完成更多）、分工让农场充满生机，以及四个人凌晨争论作物布局的独特喜剧效果。大多数粉丝建议先单人游玩以熟悉游戏，再和朋友进行联机游玩——当至少部分玩家知道游戏内容时，联机体验会更丰富。',
  },
]

export default async function StardewMultiplayerPage({
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
            {isZh ? '星露谷联机角色测验' : 'Stardew Valley Co-op Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <StardewMultiplayerQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '最好的联机农场，是每个人都做自己最擅长的事。'
            : 'The best co-op farm is when everyone does what they do best.'}
        </p>

        <RelatedQuizzes currentSlug="stardew-multiplayer" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于星露谷联机模式的常见问题' : 'Stardew Valley Multiplayer FAQ'}
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
