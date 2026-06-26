'use client'

import { useState } from 'react'
import Link from 'next/link'

type GameId = 'stardew' | 'animal-crossing' | 'hay-day' | 'palia' | 'farming-sim'
type ScoreMap = Partial<Record<GameId, number>>

interface Option {
  zh: string
  en: string
  scores: ScoreMap
}

interface Question {
  zh: string
  en: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    zh: '你通常在哪里玩游戏？',
    en: 'How do you usually play games?',
    options: [
      { zh: '手机——随时随地', en: 'On my phone — anywhere, anytime', scores: { 'hay-day': 4 } },
      { zh: 'PC 电脑', en: 'On my PC or laptop', scores: { stardew: 2, 'farming-sim': 3, palia: 3 } },
      { zh: 'Nintendo Switch', en: 'Nintendo Switch', scores: { 'animal-crossing': 4, stardew: 1, palia: 1 } },
      { zh: 'PS5 / Xbox', en: 'PS5 or Xbox', scores: { 'farming-sim': 3, stardew: 1 } },
      { zh: '多端都玩', en: 'I play on multiple devices', scores: { stardew: 2, palia: 1 } },
    ],
  },
  {
    zh: '你一次通常玩多久？',
    en: 'How long is a typical play session?',
    options: [
      { zh: '5–15 分钟，碎片时间', en: '5–15 minutes in spare moments', scores: { 'hay-day': 4, 'animal-crossing': 2 } },
      { zh: '30–60 分钟', en: '30–60 minutes', scores: { 'animal-crossing': 3, stardew: 2, 'hay-day': 1 } },
      { zh: '1–3 小时', en: '1–3 hours at a time', scores: { stardew: 3, palia: 3, 'farming-sim': 2 } },
      { zh: '停不下来，经常玩 4 小时以上', en: "Can't stop — often 4+ hours in one sitting", scores: { 'farming-sim': 4, stardew: 2 } },
    ],
  },
  {
    zh: '农场游戏里，你最想要什么？',
    en: 'What do you want most from a farming game?',
    options: [
      { zh: '真实农业机械 + 深度农场模拟', en: 'Real farm machinery and deep agricultural simulation', scores: { 'farming-sim': 5 } },
      { zh: '丰富剧情、可爱 NPC、地下城探索', en: 'Rich story, lovable NPCs, and dungeons to explore', scores: { stardew: 4 } },
      { zh: '美化家园、打扮小岛，悠闲生活', en: 'Decorating my island and enjoying a peaceful life', scores: { 'animal-crossing': 5 } },
      { zh: '和朋友一起玩，在线开放世界', en: 'Playing with friends in an online open world', scores: { palia: 5 } },
      { zh: '轻松随意，手机上随便种种', en: 'Casual, breezy fun on my phone', scores: { 'hay-day': 5 } },
    ],
  },
  {
    zh: '你对游戏复杂度的偏好？',
    en: 'How complex do you like your games?',
    options: [
      { zh: '越复杂越好，我喜欢查攻略研究系统', en: 'The more complex the better — I love wikis and guides', scores: { 'farming-sim': 3, stardew: 2 } },
      { zh: '中等复杂度，边玩边学', en: 'Medium complexity — I like to learn as I go', scores: { stardew: 3, palia: 2 } },
      { zh: '简单就好，上手即玩', en: "Simple and approachable — no tutorials please", scores: { 'animal-crossing': 3, 'hay-day': 3 } },
      { zh: '随意探索，不被系统绑住', en: 'Free exploration without too many systems tying me down', scores: { palia: 3, stardew: 1 } },
    ],
  },
  {
    zh: '你喜欢和别人一起玩吗？',
    en: 'How social do you want your experience to be?',
    options: [
      { zh: '我更喜欢一个人安静地玩', en: 'I prefer playing alone', scores: { stardew: 2, 'farming-sim': 2 } },
      { zh: '偶尔和好友联机就够了', en: 'Occasional co-op with close friends is perfect', scores: { palia: 2, 'animal-crossing': 2, stardew: 1 } },
      { zh: '我喜欢实时社区活动、认识新玩家', en: 'I love real-time community events and meeting new players', scores: { palia: 4, 'animal-crossing': 3 } },
      { zh: '轻度社交——分享截图、串门看看', en: 'Light social — sharing screenshots or visiting friends', scores: { stardew: 2, 'animal-crossing': 2, 'hay-day': 2 } },
    ],
  },
  {
    zh: '哪种画风最吸引你？',
    en: 'Which art style speaks to you most?',
    options: [
      { zh: '像素风 / 复古像素', en: 'Cozy pixel art / retro style', scores: { stardew: 5 } },
      { zh: '卡通 Q 版，可爱动漫风', en: 'Cute cartoon / anime style', scores: { 'animal-crossing': 4, palia: 2 } },
      { zh: '写实高精度，有质感', en: 'Realistic, high-fidelity, gritty', scores: { 'farming-sim': 5 } },
      { zh: '现代彩色 3D，清新漂亮', en: 'Clean, colorful modern 3D', scores: { palia: 4, 'animal-crossing': 2 } },
    ],
  },
]

interface GameResult {
  id: GameId
  nameZh: string
  nameEn: string
  taglineZh: string
  taglineEn: string
  emoji: string
  descZh: string
  descEn: string
  featuresZh: string[]
  featuresEn: string[]
  platformsEn: string
  priceEn: string
  hookZh: string
  hookEn: string
}

const RESULTS: Record<GameId, GameResult> = {
  stardew: {
    id: 'stardew',
    nameZh: '星露谷物语',
    nameEn: 'Stardew Valley',
    taglineZh: '农场游戏的标杆之作',
    taglineEn: 'The gold standard of farming games',
    emoji: '⛏️',
    descZh:
      '星露谷物语是农场游戏界的传奇——深度的耕作系统、感人至深的 NPC 关系、可探索的矿洞和四季更迭的节日。无论你想优化产出还是单纯享受田园生活，星露谷都能满足你。它是一款几乎所有玩家都应该体验一次的游戏。',
    descEn:
      "Stardew Valley is the benchmark farming RPG — deep crop systems, heartfelt NPC relationships, mines to explore, and seasonal festivals. Whether you want to optimize every crop or just enjoy farm life, it delivers. A game virtually every gamer owes themselves.",
    featuresZh: [
      '超过 100 小时的内容，四季事件和节日',
      '丰富的 NPC 关系系统，可以结婚、交友',
      '地下城探索 + 战斗，不只是种田',
      '支持 1–4 人联机',
    ],
    featuresEn: [
      '100+ hours of content with seasonal events and festivals',
      'Deep NPC relationship system — make friends, get married',
      'Mine exploration and combat, not just farming',
      '1–4 player multiplayer support',
    ],
    platformsEn: 'PC, Mac, Switch, PS4/5, Xbox, iOS, Android',
    priceEn: '~$15 USD',
    hookZh:
      '星露谷玩家往往是数据驱动型或剧情导向型玩家——这和 TendFarm 用健康数据驱动农场的理念高度契合。如果你喜欢把现实数据变成游戏成就，TendFarm 是你的下一步。',
    hookEn:
      "Stardew players tend to be data-driven or story-driven — which aligns perfectly with TendFarm's model of turning health data into farm progress. If you love seeing real metrics become in-game achievements, TendFarm is your next obsession.",
  },
  'animal-crossing': {
    id: 'animal-crossing',
    nameZh: '动物森友会',
    nameEn: 'Animal Crossing: New Horizons',
    taglineZh: '你的专属无压力小岛',
    taglineEn: 'Your pressure-free island paradise',
    emoji: '🏝️',
    descZh:
      '动森是世界上最受欢迎的"无压力游戏"之一。你在自己的小岛上按实时时钟生活——早上钓鱼、下午捉虫、晚上和邻居聊天。没有失败状态，没有时间压力，只有你想怎么布置就怎么布置的小岛。适合喜欢慢节奏、装饰创作和社交的玩家。',
    descEn:
      "Animal Crossing is one of the world's most beloved no-pressure games. Life on your island follows a real-time clock — fish in the morning, catch bugs in the afternoon, chat with neighbors at night. No fail states, no urgency, just your island the way you want it.",
    featuresZh: [
      '实时时钟系统，游戏随现实时间变化',
      '高度自由的岛屿改造和家具摆放',
      '可以拜访朋友的岛屿，社交功能丰富',
      '每个月都有限定活动和季节事件',
    ],
    featuresEn: [
      'Real-time clock — the game changes with the real world',
      'Incredibly deep island and home customization',
      'Visit friends islands, active player community',
      'Monthly limited events and seasonal activities',
    ],
    platformsEn: 'Nintendo Switch only',
    priceEn: '~$60 USD (Switch game)',
    hookZh:
      '动森玩家珍视生活节律和自然节奏——这正是 TendFarm 的核心：你的睡眠和步数驱动农场的自然生长。如果你喜欢和生活节奏同步的游戏，TendFarm 把这个体验带进了健康管理。',
    hookEn:
      'Animal Crossing players value natural rhythms and life pacing — which is exactly what TendFarm is built on. Your sleep and steps drive your farm naturally. If you love a game that syncs with your real life, TendFarm takes that experience into health.',
  },
  'hay-day': {
    id: 'hay-day',
    nameZh: 'Hay Day',
    nameEn: 'Hay Day',
    taglineZh: '最好玩的手机农场游戏',
    taglineEn: 'The best mobile farming game',
    emoji: '📱',
    descZh:
      'Hay Day 是手机农场游戏的标杆——免费下载，操作简单，5 分钟就能收获一轮庄稼。你可以建设农场、开发农产品加工链、加入社区互助。碎片时间玩，通勤时玩，睡前玩——随时随地，没有压力。',
    descEn:
      "Hay Day is the benchmark mobile farming game — free to download, simple to pick up, and rewarding in 5-minute sessions. Build your farm, develop production chains, and join a helpful community. Play during commutes, before bed, wherever life takes you.",
    featuresZh: [
      '免费下载，随时随地玩 5 分钟',
      '丰富的农产品加工链和贸易系统',
      '邻里系统，互相帮助完成订单',
      '每周限时活动，保持新鲜感',
    ],
    featuresEn: [
      'Free to download, fun in 5-minute sessions',
      'Deep production chains and trading system',
      'Neighborhood system — help each other complete orders',
      'Weekly time-limited events keep things fresh',
    ],
    platformsEn: 'iOS and Android (mobile only)',
    priceEn: 'Free (in-app purchases)',
    hookZh:
      '如果你喜欢随时打开、没有负担的游戏体验，TendFarm 也是如此——你的步数和睡眠在后台悄悄驱动农场成长，不需要主动操作，早上打开 App 就看到成果。',
    hookEn:
      "If you love low-commitment, open-anytime gaming, TendFarm delivers that too — your steps and sleep quietly drive your farm in the background. No active management needed; open the app in the morning and see what grew.",
  },
  palia: {
    id: 'palia',
    nameZh: 'Palia',
    nameEn: 'Palia',
    taglineZh: '免费的社交农场 MMO',
    taglineEn: 'The free cozy social farming MMO',
    emoji: '🌍',
    descZh:
      'Palia 是一款免费的在线多人农场游戏，有精美的 3D 画面和充实的开放世界。你可以和朋友一起种田、建造家园、探索世界，结交来自全球的玩家。如果你觉得单人农场游戏太孤独，Palia 是为你准备的。',
    descEn:
      "Palia is a free-to-play online cozy MMO with beautiful 3D visuals and a rich open world. Farm, build, and explore alongside friends — or make new ones from around the world. If solo farming feels lonely, Palia is the answer.",
    featuresZh: [
      '完全免费游玩，无需购买游戏',
      '精美 3D 世界，可与朋友实时同屏',
      '建造和装饰自己的家园',
      '丰富的采集、钓鱼、烹饪和工艺系统',
    ],
    featuresEn: [
      'Completely free to play',
      'Beautiful 3D world — play alongside friends in real time',
      'Deep housing and home decoration system',
      'Rich gathering, fishing, cooking, and crafting systems',
    ],
    platformsEn: 'PC (Steam) and Nintendo Switch',
    priceEn: 'Free to play',
    hookZh:
      'Palia 玩家喜欢在游戏里建立真实连接——TendFarm 的下一步是把你现实中的健康旅程变得同样有社区感。你的农场进度反映你真实的生活节律，这比任何 MMO 都更贴近你。',
    hookEn:
      'Palia players value genuine connection through games — TendFarm takes that further by making your real-life health journey feel like a shared story. Your farm reflects your actual daily rhythms, more personal than any MMO.',
  },
  'farming-sim': {
    id: 'farming-sim',
    nameZh: '模拟农场 25',
    nameEn: 'Farming Simulator 25',
    taglineZh: '最真实的农业模拟',
    taglineEn: 'The most realistic farming simulation',
    emoji: '🚜',
    descZh:
      '模拟农场系列是硬核农业玩家的圣地。真实授权的农机品牌（John Deere、Case IH、Fendt 等）、精确的土地管理系统、农作物生长和收割循环。如果你对真实农业有热情，或者喜欢深度模拟游戏，这是你的不二选择。',
    descEn:
      "The Farming Simulator series is the holy grail for hardcore farming fans. Licensed real-world brands (John Deere, Case IH, Fendt, and more), precise land management, realistic crop cycles. If you're passionate about real farming or love deep simulation, this is your game.",
    featuresZh: [
      '数百种真实授权农机和设备',
      '精确的耕作、播种、施肥、收割循环',
      '支持多人联机合作经营农场',
      '强大的 MOD 社区，内容无限扩展',
    ],
    featuresEn: [
      'Hundreds of licensed real-world farm machines',
      'Precise tillage, seeding, fertilizing, and harvesting cycles',
      'Multiplayer — run a farm operation together',
      'Massive modding community with endless content',
    ],
    platformsEn: 'PC, Mac, PS4/5, Xbox',
    priceEn: '~$40 USD',
    hookZh:
      '模拟农场玩家享受精确系统和可量化的成果——TendFarm 把这种满足感带进健康领域：你的步数、睡眠、HRV 都有精确的公式转化为农场产出。终于有一个游戏让你的现实数据也可以被优化。',
    hookEn:
      "Farming Simulator players love precise systems and measurable outcomes — TendFarm brings that satisfaction to health: your steps, sleep, and HRV each convert to farm output via exact formulas. Finally, a game where your real-life metrics can be min-maxed.",
  },
}

function calcResult(answers: ScoreMap[]): GameId {
  const totals: Record<GameId, number> = {
    stardew: 0,
    'animal-crossing': 0,
    'hay-day': 0,
    palia: 0,
    'farming-sim': 0,
  }
  answers.forEach((scores) => {
    for (const [gameId, score] of Object.entries(scores) as [GameId, number][]) {
      totals[gameId] += score
    }
  })
  return (Object.keys(totals) as GameId[]).reduce((a, b) => (totals[a] >= totals[b] ? a : b))
}

interface Props {
  locale: string
}

export function WhichFarmingGameQuiz({ locale }: Props) {
  const [step, setStep] = useState<number>(0) // 0 = intro, 1–N = questions, N+1 = result
  const [answers, setAnswers] = useState<ScoreMap[]>([])
  const isZh = locale === 'zh'

  const handleAnswer = (scores: ScoreMap) => {
    const next = [...answers, scores]
    setAnswers(next)
    if (next.length === QUESTIONS.length) {
      setStep(QUESTIONS.length + 1)
    } else {
      setStep(step + 1)
    }
  }

  const reset = () => {
    setAnswers([])
    setStep(0)
  }

  // Intro
  if (step === 0) {
    return (
      <div className="text-center">
        <div className="mb-6 text-6xl">🎮</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {isZh ? '哪款农场游戏最适合你？' : 'Which Farming Game Should You Play?'}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {isZh
            ? '6 个问题，帮你从上百款农场游戏中找到最适合的那一款。'
            : '6 questions to match you with the perfect farming game from hundreds of options.'}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {isZh ? '适合：新手选游戏 / 老玩家寻找下一款' : 'Great for: newcomers choosing a first game, or veterans looking for their next'}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {isZh ? '开始测试 →' : 'Start Quiz →'}
        </button>
      </div>
    )
  }

  // Result
  if (step === QUESTIONS.length + 1) {
    const gameId = calcResult(answers)
    const result = RESULTS[gameId]
    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {isZh ? '最适合你的游戏是' : 'Your perfect farming game is:'}
          </p>
          <h2 className="text-3xl font-bold text-[#f0a832]">
            {isZh ? result.nameZh : result.nameEn}
          </h2>
          <p className="mt-1 text-sm text-[#8a9a7a]">
            {isZh ? result.taglineZh : result.taglineEn}
          </p>
        </div>

        {/* Description */}
        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-5">
          <p className="leading-relaxed text-[#e8dcc8]">
            {isZh ? result.descZh : result.descEn}
          </p>
        </div>

        {/* Key features */}
        <div className="mb-5">
          <h3 className="mb-3 text-sm font-semibold text-[#8a9a7a]">
            {isZh ? '核心亮点' : 'Key highlights'}
          </h3>
          <ul className="space-y-2">
            {(isZh ? result.featuresZh : result.featuresEn).map((f, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#e8dcc8]">
                <span className="text-[#f0a832] shrink-0">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform & price */}
        <div className="mb-6 flex flex-wrap gap-3 text-xs">
          <span className="rounded-full border border-[#2d5a27] px-3 py-1 text-[#8a9a7a]">
            📱 {result.platformsEn}
          </span>
          <span className="rounded-full border border-[#2d5a27] px-3 py-1 text-[#8a9a7a]">
            💰 {result.priceEn}
          </span>
        </div>

        {/* TendFarm Hook */}
        <div className="mb-8 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a] p-5">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">
            {isZh ? '你可能也会喜欢 →' : 'You might also love →'} TendFarm
          </p>
          <p className="mb-4 text-sm leading-relaxed text-[#8a9a7a]">
            {isZh ? result.hookZh : result.hookEn}
          </p>
          <Link
            href={`/${locale}/gameplay`}
            className="inline-block rounded-lg bg-[#f0a832] px-5 py-2 text-sm font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
          >
            {isZh ? '了解 TendFarm →' : 'Learn about TendFarm →'}
          </Link>
        </div>

        <div className="text-center">
          <button
            onClick={reset}
            className="text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {isZh ? '重新测试' : 'Retake quiz'}
          </button>
        </div>
      </div>
    )
  }

  // Question
  const qIndex = step - 1
  const q = QUESTIONS[qIndex]
  const progress = (qIndex / QUESTIONS.length) * 100

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[#8a9a7a]">
          <span>
            {isZh ? `问题 ${step} / ${QUESTIONS.length}` : `Question ${step} of ${QUESTIONS.length}`}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[#2d3d2d]">
          <div
            className="h-1.5 rounded-full bg-[#f0a832] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="mb-6 text-xl font-semibold text-[#e8dcc8]">
        {isZh ? q.zh : q.en}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.scores)}
            className="w-full rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-5 py-4 text-left text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
          >
            {isZh ? opt.zh : opt.en}
          </button>
        ))}
      </div>

      {/* Back */}
      {step > 1 && (
        <button
          onClick={() => {
            setAnswers(answers.slice(0, -1))
            setStep(step - 1)
          }}
          className="mt-4 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
        >
          ← {isZh ? '上一题' : 'Previous'}
        </button>
      )}
    </div>
  )
}
