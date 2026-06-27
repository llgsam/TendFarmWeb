'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'acnh' | 'stardew' | 'palia' | 'dreamlight'

function ShareButton({ text, isZh }: { text: string; isZh: boolean }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    }
  }
  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copied ? (isZh ? '✓ 已复制！' : '✓ Copied!') : isZh ? '📋 复制结果' : '📋 Copy result'}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]"
      >
        𝕏 {isZh ? '分享' : 'Share'}
      </a>
    </div>
  )
}

const QUESTIONS: Array<{
  q_en: string
  q_zh: string
  options: Array<{ en: string; zh: string; type: Pick }>
}> = [
  {
    q_en: "You're new to cozy games. What worries you most?",
    q_zh: '你是 cozy 游戏新手。你最担心什么？',
    options: [
      { en: 'Getting overwhelmed by too many systems to learn at once', zh: '被太多需要同时学习的系统压倒', type: 'acnh' },
      { en: 'Failing or dying and having to start over', zh: '失败或死亡，不得不重新开始', type: 'palia' },
      { en: 'Not knowing what to do next and getting stuck', zh: '不知道接下来做什么而卡住', type: 'stardew' },
      { en: 'Spending money and not enjoying it', zh: '花了钱但不喜欢', type: 'dreamlight' },
    ],
  },
  {
    q_en: 'How long can you comfortably play in one sitting as a beginner?',
    q_zh: '作为新手，你在一次游戏中能舒适地玩多长时间？',
    options: [
      { en: '15–30 minutes — I want to ease in slowly', zh: '15-30 分钟——我想慢慢适应', type: 'acnh' },
      { en: '30–60 minutes — I need enough time to explore but not too long', zh: '30-60 分钟——我需要足够时间探索，但不要太长', type: 'dreamlight' },
      { en: '1–2 hours — I am willing to invest time to learn something properly', zh: '1-2 小时——我愿意花时间好好学习', type: 'stardew' },
      { en: 'Flexible — I just need to be able to pick up and put down easily', zh: '弹性——我只需要能随时拿起和放下', type: 'palia' },
    ],
  },
  {
    q_en: 'What kind of cozy game experience sounds most appealing to start with?',
    q_zh: '作为开始，哪种 cozy 游戏体验听起来最吸引你？',
    options: [
      { en: 'A gentle, creative world where I decorate and make friends at my own pace', zh: '一个温和的创意世界，我可以按自己的节奏装饰和交朋友', type: 'acnh' },
      { en: 'A relaxing farm where I grow crops, fish, and explore at leisure', zh: '一个轻松的农场，我可以种植作物、钓鱼、悠然探索', type: 'stardew' },
      { en: 'A free online world where I can explore and meet people when I feel like it', zh: '一个免费的在线世界，我可以随心所欲地探索和认识人', type: 'palia' },
      { en: 'A charming world filled with characters I already know and love', zh: '一个充满我已经认识和喜爱的角色的迷人世界', type: 'dreamlight' },
    ],
  },
  {
    q_en: 'Which statement describes you best right now?',
    q_zh: '哪句话最能描述现在的你？',
    options: [
      { en: "I've never really gotten into video games but cozy games seem different", zh: '我从来没有真正喜欢过电子游戏，但 cozy 游戏看起来不一样', type: 'acnh' },
      { en: "I've played some games before but nothing like cozy farming games", zh: '我以前玩过一些游戏，但没有玩过像 cozy 农场游戏这样的', type: 'stardew' },
      { en: "I've played some mobile games and I'm ready to try something on PC or Switch", zh: '我玩过一些手机游戏，准备在 PC 或 Switch 上尝试新东西', type: 'palia' },
      { en: "I love Disney/anime and want a game that feels like those worlds", zh: '我喜欢 Disney/动漫，想要一款感觉像那些世界的游戏', type: 'dreamlight' },
    ],
  },
  {
    q_en: 'What is your biggest priority for your first cozy game?',
    q_zh: '对于你的第一款 cozy 游戏，什么是你的最大优先级？',
    options: [
      { en: 'Zero stress — I need a game that is impossible to play wrong', zh: '零压力——我需要一款不可能玩错的游戏', type: 'acnh' },
      { en: 'Depth — I want something that will keep me engaged for months', zh: '深度——我想要一款能让我投入数月的游戏', type: 'stardew' },
      { en: 'Free — I want to try before committing any money', zh: '免费——我想在花钱之前先试试', type: 'palia' },
      { en: 'Familiar — I want characters and settings that feel welcoming from day one', zh: '熟悉感——我想要从第一天起就感觉亲切的角色和场景', type: 'dreamlight' },
    ],
  },
  {
    q_en: 'How do you feel about making mistakes while learning a new game?',
    q_zh: '学习新游戏时犯错误你感觉如何？',
    options: [
      { en: "I want a game where mistakes literally do not matter — I need the safety net", zh: '我想要一款字面意义上错误无所谓的游戏——我需要安全网', type: 'acnh' },
      { en: "I'm okay with gentle mistakes — missing a crop or doing something suboptimally", zh: '我可以接受温和的错误——错过作物或做了不那么完美的事情', type: 'stardew' },
      { en: "I'm fine learning by doing — just don't punish me harshly for trying things", zh: '我可以边做边学——只是不要因为尝试而严厉惩罚我', type: 'palia' },
      { en: "I want clear guidance that shows me what to do so I don't have to guess", zh: '我想要清晰的指引告诉我该做什么，这样我就不必猜测', type: 'dreamlight' },
    ],
  },
]

const RESULTS: Record<
  Pick,
  {
    title_en: string
    title_zh: string
    emoji: string
    tag_en: string
    tag_zh: string
    why_en: string
    why_zh: string
    start_en: string[]
    start_zh: string[]
  }
> = {
  acnh: {
    title_en: 'Animal Crossing: New Horizons',
    title_zh: '动物之森：新视野',
    emoji: '🍃',
    tag_en: 'The most beginner-friendly major cozy game ever made',
    tag_zh: '有史以来对新手最友好的主流 cozy 游戏',
    why_en:
      "Animal Crossing: New Horizons is the perfect first cozy game for you. It is designed from the ground up to have no way to fail: you can never die, there is no time pressure on most activities, no crops that wither, no enemies, and no bad outcomes from any choice you make. The real-world clock means your island grows organically over days and weeks — it never rushes you. You arrive on a deserted island, get a tent and some tools, and simply begin. Nook Inc. gives you gentle daily hints but never demands. You will be playing comfortably within 15 minutes of starting.",
    why_zh:
      '动物之森：新视野是完美的第一款 cozy 游戏。它从根本上设计成没有任何失败方式：你永远不会死亡、大多数活动没有时间压力、没有会枯萎的作物、没有敌人，你做的任何选择都没有不好的结果。实时时钟意味着你的岛屿在几天和几周内有机地成长——它永远不会催促你。你来到一个荒岛，得到一个帐篷和一些工具，然后简单地开始。Nook 公司给你温和的每日提示但从不要求。开始后 15 分钟内你就能轻松游玩。',
    start_en: [
      'Talk to Timmy in the shop every day early on — daily shopping unlocks items and recipes',
      "Plant fruit trees near your starting area — fruit sells for bells and is your first income source",
      "Don't worry about designing your island early — it changes constantly and nothing is permanent",
    ],
    start_zh: [
      '早期每天和商店里的唐托姆谈话——每日购物解锁物品和配方',
      '在起始区域附近种植果树——水果可以卖成铃钱，是你的第一个收入来源',
      '早期不要担心设计你的岛屿——它会不断变化，没有任何东西是永久的',
    ],
  },
  stardew: {
    title_en: 'Stardew Valley',
    title_zh: '星露谷物语',
    emoji: '🌾',
    tag_en: 'The gold standard first farming game — forgiving and deep',
    tag_zh: '黄金标准第一款农场游戏——宽容且有深度',
    why_en:
      "Stardew Valley is the right first cozy game for you — you want depth and are willing to invest a bit of time to learn. The game is forgiving by design: you never permanently lose anything important (you drop some items and gold if you pass out in the mines, but nothing game-ending), and you can take the community center at your own pace across multiple in-game years. The first week teaches you farming, the second adds mining, and you build naturally from there. Millions of people played Stardew Valley as their first ever farming game and never looked back.",
    why_zh:
      '星露谷物语是最适合你的第一款 cozy 游戏——你想要深度，愿意花一点时间学习。游戏设计上是宽容的：你永远不会永久失去任何重要的东西（如果你在矿洞晕倒会掉落一些物品和金钱，但没有游戏终结的情况），你可以在多个游戏年里按自己的节奏完成社区中心。第一周教你农业，第二周增加挖矿，然后你自然地从那里成长。数百万人将星露谷物语作为他们的第一款农场游戏，从此一发不可收拾。',
    start_en: [
      "Your first spring: grow parsnips and strawberries — parsnips are easy money and strawberries take multiple harvests",
      'Enter the mines as soon as Pierre unlocks the backpack upgrade — resources from mining help everything else',
      "Don't try to do everything in year one — it takes multiple in-game years to complete everything, and that's okay",
    ],
    start_zh: [
      '你的第一个春天：种植防风草和草莓——防风草容易赚钱，草莓可以多次收获',
      '皮埃尔解锁背包升级后立刻进入矿洞——挖矿的资源对其他一切都有帮助',
      '不要试图在第一年完成所有事情——完成一切需要多个游戏年，这完全没问题',
    ],
  },
  palia: {
    title_en: 'Palia',
    title_zh: 'Palia',
    emoji: '🌻',
    tag_en: 'The best free first cozy game — try it today',
    tag_zh: '最好的免费第一款 cozy 游戏——今天就试试',
    why_en:
      "Palia is the perfect first cozy game for you because it's completely free — you can download it right now on PC (Steam or Epic Games Store) or Nintendo Switch and start playing without spending a single dollar. For a beginner who isn't sure if cozy games are for them, Palia removes all financial risk. The game is gentle and welcoming, with a kind community of real players around you. You learn gardening, hunting, fishing, and crafting at your own pace with helpful in-game guidance. If you love it, you can explore its optional cosmetics; if it's not quite right, you've lost nothing but a few hours.",
    why_zh:
      'Palia 是你的完美第一款 cozy 游戏，因为它完全免费——你现在就可以在 PC（Steam 或 Epic Games Store）或 Nintendo Switch 上下载并开始游玩，无需花一分钱。对于不确定 cozy 游戏是否适合自己的新手，Palia 消除了所有财务风险。游戏温和而热情，周围有真实玩家的友好社区。你可以按自己的节奏在有用的游戏内指引下学习园艺、狩猎、钓鱼和制作。如果你喜欢它，可以探索可选的外观购买；如果不太合适，你什么都没损失，只是花了几个小时。',
    start_en: [
      'Download it free from Steam, Epic Games Store, or Nintendo eShop — no credit card required',
      'Complete all the starter quests first — they unlock your plot and teach everything at a comfortable pace',
      "Join a friendly server and don't be shy about asking the community for help — Palia players are known for being welcoming",
    ],
    start_zh: [
      '从 Steam、Epic Games Store 或 Nintendo eShop 免费下载——无需信用卡',
      '先完成所有新手任务——它们解锁你的地块，以舒适的节奏教授一切',
      '加入友好的服务器，不要羞于向社区寻求帮助——Palia 玩家以热情好客而闻名',
    ],
  },
  dreamlight: {
    title_en: 'Disney Dreamlight Valley',
    title_zh: 'Disney Dreamlight Valley',
    emoji: '✨',
    tag_en: 'The most familiar-feeling first cozy game — free to try',
    tag_zh: '最有亲切感的第一款 cozy 游戏——免费试玩',
    why_en:
      "Disney Dreamlight Valley is the ideal first cozy game for you because it wraps everything in familiar faces and stories you already know. When Mickey Mouse asks you to help, you know who Mickey is — there's instant emotional context that removes the barrier of learning an unfamiliar world. The game is free to download on all platforms, has clear quest guidance that tells you what to do next, and features farming, cooking, fishing, and life-sim mechanics in a setting that feels immediately welcoming. The characters guide you through the game, so you never feel lost.",
    why_zh:
      'Disney Dreamlight Valley 是你的理想第一款 cozy 游戏，因为它将一切包裹在你已经认识的熟悉面孔和故事中。当米奇鼠要求你帮助他时，你知道米奇是谁——有即时的情感背景，消除了学习陌生世界的障碍。游戏在所有平台上都可以免费下载，有清晰的任务指引告诉你接下来该做什么，并在一个立刻让人感到亲切的环境中提供农业、烹饪、钓鱼和生活模拟机制。角色引导你完成游戏，所以你永远不会感到迷失。',
    start_en: [
      'Download it free from any platform store — no purchase required to start',
      'Follow the main quest line first — it introduces each character and biome in an easy, guided order',
      "Raise friendship levels with characters early — higher friendship unlocks their full quests and best items",
    ],
    start_zh: [
      '从任何平台商店免费下载——开始无需购买',
      '先跟着主线任务走——它以简单、有指引的顺序介绍每个角色和生物群落',
      '尽早提高与角色的友谊等级——更高的友谊解锁他们的完整任务和最好的物品',
    ],
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { acnh: 0, stardew: 0, palia: 0, dreamlight: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyBeginnerQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-games-for-beginners`
    const shareText = isZh
      ? `作为 cozy 游戏新手，最适合我的第一款游戏是「${result.title_zh}」！找到你的入门游戏：${url}`
      : `As a cozy game beginner, my recommended first game is ${result.title_en}! Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.why_zh : result.why_en}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {isZh ? '新手第一步' : 'Your first 3 steps'}
          </h3>
          <ul className="space-y-2">
            {(isZh ? result.start_zh : result.start_en).map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把 cozy 游戏的慢生活节奏带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the gentle pace of cozy games into real daily life.'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} isZh={isZh} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {isZh ? '重新测试' : 'Retake Quiz'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-bold text-[#e8dcc8]">
          {isZh
            ? 'Cozy 游戏新手入门测验：哪款最适合你？'
            : 'Best Cozy Game for Beginners Quiz'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，为新手找到最合适的第一款 cozy 游戏——无论你的经验水平或预算如何'
            : '6 questions to find the perfect first cozy game for you — no experience required'}
        </p>
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, qi) => (
          <div key={qi}>
            <p className="mb-3 font-medium text-[#e8dcc8]">
              {qi + 1}. {isZh ? q.q_zh : q.q_en}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => { const next = [...answers]; next[qi] = opt.type; setAnswers(next) }}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    answers[qi] === opt.type
                      ? 'border-[#f0a832] bg-[#f0a832]/10 text-[#e8dcc8]'
                      : 'border-[#2d3d2d] text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]'
                  }`}
                >
                  {isZh ? opt.zh : opt.en}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={!allAnswered}
        onClick={() => setSubmitted(true)}
        className={`mt-8 w-full rounded-xl py-3 font-semibold transition-colors ${
          allAnswered ? 'bg-[#f0a832] text-[#0f1a0f] hover:bg-[#e09822]' : 'cursor-not-allowed bg-[#2d3d2d] text-[#4a5a4a]'
        }`}
      >
        {isZh ? '找到我的入门游戏' : 'Find My First Cozy Game'}
      </button>
    </div>
  )
}
