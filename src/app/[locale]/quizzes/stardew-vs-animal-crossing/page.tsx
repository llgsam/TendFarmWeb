import { StardewVsACNHQuiz } from '@/components/tools/StardewVsACNHQuiz'
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
      ? '星露谷物语 vs 动物之森：哪款更适合你？— 对比推荐测验'
      : 'Stardew Valley vs Animal Crossing: New Horizons — Which Is Right for You? Quiz',
    description: isZh
      ? '6 个问题，帮你在星露谷物语和动物之森新视野之间做出选择，或找到两款都玩的最佳顺序。含游戏风格深度分析。'
      : '6 questions to choose between Stardew Valley and Animal Crossing: New Horizons — or find the best order to play both. Includes honest deep-dives into each game\'s strengths.',
    keywords: isZh
      ? ['星露谷 vs 动物之森', '星露谷和动物之森哪个好', '星露谷还是动物之森', '动物之森和星露谷区别', '哪款适合新手', '治愈游戏对比']
      : [
          'stardew valley vs animal crossing',
          'stardew valley or animal crossing which is better',
          'stardew valley vs animal crossing new horizons',
          'is stardew valley better than animal crossing',
          'animal crossing vs stardew valley for beginners',
          'which is more relaxing stardew or animal crossing',
          'should i play stardew or animal crossing first',
          'stardew valley animal crossing comparison',
          'best cozy game for beginners 2025',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/stardew-vs-animal-crossing`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes/stardew-vs-animal-crossing`,
        [other]: `${BASE_URL}/${other}/quizzes/stardew-vs-animal-crossing`,
      },
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Stardew Valley better than Animal Crossing: New Horizons?',
    a: "Neither game is objectively better — they excel in completely different dimensions. Stardew Valley is better for: players who want deep systems and RPG progression, clear goals and satisfaction of completion, 300+ hours of content in a single playthrough, the ability to control in-game time and play at their own pace, and deeper story and character development. Animal Crossing: New Horizons is better for: players who want genuine stress-free relaxation with no fail states or pressure, creative decoration and island expression as the primary activity, daily check-in play style (30 minutes per day is fulfilling), real-world seasons and events that make the island feel alive, and a game that works as a years-long daily ritual. Many players love both. Take the quiz above to find which fits you better right now.",
  },
  {
    q: 'Which is better for beginners — Stardew Valley or Animal Crossing?',
    a: "Both games are very beginner-friendly, but in different ways. Animal Crossing: New Horizons has an extremely gentle learning curve — the game teaches you everything slowly, there is nothing that punishes mistakes, and you cannot fail. It's ideal for players new to gaming entirely or who want something they can dip in and out of casually. Stardew Valley has slightly more to learn (farming, mining, fishing, crafting, social systems) but remains approachable — the game is forgiving early on and there are many tutorials in the first in-game days. It's ideal for players comfortable with games who want more depth. Either is a great first cozy game.",
  },
  {
    q: 'Can I play both Stardew Valley and Animal Crossing?',
    a: "Yes — and many players do. The two games complement each other perfectly. Most players who love both describe using them in different contexts: Stardew Valley for longer sessions (1–3 hours) when you have time and energy to focus on goals and progression; Animal Crossing for short daily check-ins (30–60 minutes) as a ritual to relax and maintain your island. The playstyles don't conflict — one is about accomplishment, the other about gentle presence. If budget is a concern, start with whichever appeals more, finish your first year/playthrough, then add the other.",
  },
  {
    q: 'Is Stardew Valley or Animal Crossing more relaxing?',
    a: "Animal Crossing: New Horizons is more purely relaxing — there are zero fail states, no death, no time pressure, no bad outcomes, and the real-time clock means you never feel behind. Stardew Valley is relaxing in a different way: it has seasons with soft deadlines, mines with enemies, and systems complex enough to cause optional stress if you want to optimize. However, Stardew Valley can also be played very casually — you can ignore optimization, fish whenever you want, and take years to complete the community center. Both are peaceful and cozy; Animal Crossing is categorically more stress-free.",
  },
  {
    q: 'Do Stardew Valley and Animal Crossing have multiplayer?',
    a: "Both games have multiplayer, but with very different implementations. Stardew Valley multiplayer: supports up to 4 players online, all working the same farm together; local co-op for 2 players splitscreen; requires Nintendo Switch Online for online play on Switch. One player hosts the farm and others are farmhands. Animal Crossing: New Horizons multiplayer: supports online and local visitors to your island; up to 8 players can visit at once; all players maintain their own island independently. Visiting other players' islands is a social experience for trading, gifting, and seeing designs — players don't share an island permanently (unless they live on the same Nintendo Switch console).",
  },
]

const FAQ_ZH = [
  {
    q: '星露谷物语和动物之森哪个更好？',
    a: '没有哪款游戏客观上更好——它们在完全不同的维度上出色。星露谷物语更适合：想要深度系统和 RPG 进度的玩家、目标明确和完成满足感、单次游戏 300 小时以上内容、能够控制游戏内时间并按自己节奏游玩，以及更深入的故事和角色发展。动物之森：新视野更适合：想要没有失败机制或压力的真正无压力放松的玩家、把创意装饰和岛屿表达作为主要活动、每日签到式游玩风格（每天 30 分钟就很充实）、让岛屿感觉有生机的现实世界季节和活动，以及作为多年每日仪式的游戏。许多玩家两款都喜欢。做上面的测验，找到哪款目前更适合你。',
  },
  {
    q: '对于新手，星露谷物语和动物之森哪个更好？',
    a: '两款游戏都非常适合新手，但方式不同。动物之森：新视野的学习曲线极其平缓——游戏慢慢教你一切，没有任何惩罚错误的机制，你不会失败。它非常适合完全游戏新手或想要可以随意进出的轻松游戏的玩家。星露谷物语学习内容略多（农业、挖矿、钓鱼、制作、社交系统），但仍然平易近人——游戏在早期很宽容，游戏内最初几天有很多教程。它非常适合对游戏有一定了解、想要更多深度的玩家。任何一款都是很好的第一款 cozy 游戏。',
  },
  {
    q: '我可以同时玩星露谷物语和动物之森吗？',
    a: '可以——很多玩家都是这样做的。这两款游戏完美互补。大多数两款都喜欢的玩家描述在不同场景下使用它们：有时间和精力专注于目标和进度的较长游戏时段（1-3 小时）玩星露谷物语；每日短暂签到（30-60 分钟）作为放松和维护岛屿的仪式玩动物之森。两种游戏风格不冲突——一个是关于成就，另一个是关于温和的存在感。如果预算有限，从更吸引你的那款开始，完成你的第一年/游戏流程，然后再加入另一款。',
  },
  {
    q: '星露谷物语和动物之森哪个更放松？',
    a: '动物之森：新视野更纯粹地放松——没有失败机制、没有死亡、没有时间压力、没有不好的结果，实时时钟意味着你永远不会感觉落后。星露谷物语以不同的方式放松：它有带软截止日期的季节、有怪物的矿洞，以及如果你想优化就会造成可选压力的复杂系统。然而，星露谷物语也可以非常随意地玩——你可以忽略优化、随时想钓鱼就钓、花好几年完成社区中心。两款都是平和治愈的；动物之森在本质上更没有压力。',
  },
  {
    q: '星露谷物语和动物之森都有多人游戏吗？',
    a: '两款游戏都有多人游戏，但实现方式非常不同。星露谷物语多人游戏：支持最多 4 名玩家在线，共同经营同一个农场；本地合作 2 名玩家分屏；Switch 上在线游玩需要 Nintendo Switch Online。一名玩家拥有农场，其他人是农场帮手。动物之森：新视野多人游戏：支持在线和本地访客参观你的岛屿；最多 8 名玩家可以同时参观；所有玩家独立维护自己的岛屿。参观其他玩家的岛屿是一种交易、赠送礼物和观看设计的社交体验——玩家不会永久共享一个岛屿（除非他们住在同一台 Nintendo Switch 主机上）。',
  },
]

export default async function StardewVsACNHPage({
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
            {isZh ? '星露谷 vs 动物之森' : 'Stardew Valley vs Animal Crossing'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <StardewVsACNHQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '星露谷和动物之森不是竞争关系——它们是不同心情下的两种答案。'
            : 'Stardew and Animal Crossing are not rivals — they are two answers to two different moods.'}
        </p>

        <RelatedQuizzes currentSlug="stardew-vs-animal-crossing" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '星露谷 vs 动物之森常见问题' : 'Stardew Valley vs Animal Crossing FAQ'}
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
