'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Game = 'hayday' | 'stardew' | 'township' | 'pocketcamp'

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
  options: Array<{ en: string; zh: string; type: Game }>
}> = [
  {
    q_en: 'How long is your typical mobile gaming session?',
    q_zh: '你通常一次手机游戏玩多长时间？',
    options: [
      { en: '5–15 minutes — quick check-ins while waiting or between tasks', zh: '5-15 分钟——等待或间隙时快速查看一下', type: 'hayday' },
      { en: '30–60 minutes — I want to actually get into a flow state', zh: '30-60 分钟——我想真正进入心流状态', type: 'stardew' },
      { en: '15–30 minutes — enough to manage things and check on my progress', zh: '15-30 分钟——足够管理事情、查看进度', type: 'township' },
      { en: '5–20 minutes — I like quick, satisfying tasks I can finish in one sitting', zh: '5-20 分钟——我喜欢能在一次坐下来就完成的快速满足任务', type: 'pocketcamp' },
    ],
  },
  {
    q_en: 'What draws you most to a mobile game?',
    q_zh: '手机游戏里什么最能吸引你？',
    options: [
      { en: "A satisfying production chain — growing crops, processing goods, fulfilling orders", zh: '令人满足的生产链——种植作物、加工商品、完成订单', type: 'hayday' },
      { en: "A deep world to explore with characters, storylines, and things to discover", zh: '可以探索的深度世界，有人物、故事线和可以发现的事物', type: 'stardew' },
      { en: "Building and expanding — watching your town or farm grow over time", zh: '建造和扩张——看着你的城镇或农场随时间成长', type: 'township' },
      { en: "Cute characters and creative decoration — making things look just right", zh: '可爱的角色和创意装饰——让一切看起来恰到好处', type: 'pocketcamp' },
    ],
  },
  {
    q_en: 'How do you feel about waiting times in mobile games?',
    q_zh: '你对手机游戏里的等待时间有什么看法？',
    options: [
      { en: "Fine — I check in, start production, come back later. That is the rhythm.", zh: '没问题——我查看一下，开始生产，过会再回来。这就是节奏。', type: 'hayday' },
      { en: "I prefer games with no timers — I want to play as long as I want", zh: '我更喜欢没有计时器的游戏——我想玩多久就玩多久', type: 'stardew' },
      { en: "Acceptable if there is always something else to do while waiting", zh: '如果等待时还有其他事情可做，那是可以接受的', type: 'township' },
      { en: "I do not mind short waits — it gives me time to decorate and plan", zh: '我不介意短暂等待——这给了我时间来装饰和规划', type: 'pocketcamp' },
    ],
  },
  {
    q_en: 'Social features in mobile games — trading, visiting friends, guilds — are:',
    q_zh: '手机游戏里的社交功能——交易、拜访朋友、公会——对你来说：',
    options: [
      { en: 'Essential — trading with neighbors is one of the best parts', zh: '必不可少——与邻居交易是最精彩的部分之一', type: 'hayday' },
      { en: 'Optional — I mostly play solo but do not mind having the option', zh: '可选——我主要单人游玩，但不介意有这个选项', type: 'stardew' },
      { en: 'Fun — I enjoy helping friends and building together in a community', zh: '很有趣——我喜欢帮助朋友、在社区里一起建设', type: 'township' },
      { en: 'A nice bonus — I love visiting others for design inspiration', zh: '不错的加分项——我喜欢拜访他人获取设计灵感', type: 'pocketcamp' },
    ],
  },
  {
    q_en: 'Your approach to in-app purchases in free mobile games:',
    q_zh: '你对免费手机游戏内购的态度：',
    options: [
      { en: "I play free and spend occasionally when something is really worth it", zh: '我免费游玩，偶尔在真正值得的时候花一点', type: 'hayday' },
      { en: "I paid once upfront and that is it — I want no ongoing spending pressure", zh: '我一次性付款，仅此而已——我不想有持续消费的压力', type: 'stardew' },
      { en: "I play free for a long time before deciding if I want to support the game", zh: '我免费玩很长时间，然后再决定是否要支持这款游戏', type: 'township' },
      { en: "I mostly buy cosmetics — I would rather spend on cute items than gameplay advantages", zh: '我主要买外观道具——我宁愿花在可爱的物品上而不是游戏优势', type: 'pocketcamp' },
    ],
  },
  {
    q_en: 'What would make you stop playing a mobile farming game?',
    q_zh: '什么会让你停止玩一款手机农场游戏？',
    options: [
      { en: "If it becomes too aggressive with ads or pay-to-progress walls", zh: '如果游戏在广告或付费进度墙上变得太强硬', type: 'hayday' },
      { en: "If it feels shallow — I need content depth or I lose interest quickly", zh: '如果感觉内容浅薄——我需要内容深度，否则很快就会失去兴趣', type: 'stardew' },
      { en: "If the community aspect dies — playing with an empty server kills the fun", zh: '如果社区方面消失了——在空服务器里玩会让乐趣全无', type: 'township' },
      { en: "If the seasonal content runs out and there is nothing new to collect", zh: '如果季节性内容耗尽，没有新东西可以收集', type: 'pocketcamp' },
    ],
  },
]

const RESULTS: Record<
  Game,
  {
    title_en: string
    title_zh: string
    emoji: string
    tag_en: string
    tag_zh: string
    platform_en: string
    platform_zh: string
    desc_en: string
    desc_zh: string
    pro_en: string[]
    pro_zh: string[]
    watch_en: string
    watch_zh: string
  }
> = {
  hayday: {
    title_en: 'Hay Day',
    title_zh: 'Hay Day（卡通农场）',
    emoji: '🐓',
    tag_en: 'Classic · Social · Production Chain',
    tag_zh: '经典 · 社交 · 生产链',
    platform_en: 'iOS · Android · Free',
    platform_zh: 'iOS · Android · 免费',
    desc_en:
      "Hay Day is the game that defined mobile farming. Developed by Supercell, it has been running since 2012 and remains one of the most polished mobile farming experiences available. You grow crops, raise animals, process goods through a satisfying production chain, and fulfill roadside shop orders. The social layer — trading with neighbors, joining neighborhoods, competing in derbies — gives it longevity that most mobile games cannot match.",
    desc_zh:
      'Hay Day 是定义了手机农场游戏的那款游戏。由 Supercell 开发，自 2012 年运营至今，仍然是市面上最精良的手机农场游戏体验之一。你种植作物、饲养动物、通过令人满足的生产链加工商品、完成路边商店订单。社交层——与邻居交易、加入社区、参加比赛——赋予了它大多数手机游戏无法匹敌的持久生命力。',
    pro_en: [
      'Best-in-class production chain — the most satisfying order fulfillment loop in mobile farming',
      'Active community with trading, neighborhood events, and derbies',
      'Consistently updated with new content, seasonal events, and expansions',
    ],
    pro_zh: [
      '同类最佳生产链——手机农场游戏中最令人满足的订单完成循环',
      '活跃社区，有交易、社区活动和比赛',
      '持续更新，有新内容、季节活动和扩展',
    ],
    watch_en: "Progression slows significantly at higher levels without spending — the mid-to-late game can feel grindy for free players.",
    watch_zh: '在高等级时不消费进度会明显变慢——对于免费玩家来说，中后期游戏可能会感觉有些磨人。',
  },
  stardew: {
    title_en: 'Stardew Valley (Mobile)',
    title_zh: '星露谷物语（手机版）',
    emoji: '🌾',
    tag_en: 'Deep · Story-Rich · One-Time Purchase',
    tag_zh: '深度 · 故事丰富 · 一次性购买',
    platform_en: 'iOS · Android · $4.99 one-time',
    platform_zh: 'iOS · Android · 一次性付费',
    desc_en:
      "Stardew Valley on mobile is the full PC experience in your pocket — no ads, no timers, no energy systems, no pay-to-win. You buy it once for under $5 and get hundreds of hours of deep farming RPG content. The mobile version includes everything from the PC version: all crops, characters, storylines, relationships, and the mines. Touch controls work surprisingly well for most tasks. If you want depth and are willing to pay once, nothing beats it.",
    desc_zh:
      '手机版星露谷物语是完整的 PC 体验放在你口袋里——没有广告、没有计时器、没有体力系统、没有付费赢。你只需一次性花不到 5 美元，就能获得数百小时的深度农场 RPG 内容。手机版包含 PC 版的所有内容：所有作物、人物、故事线、人际关系和矿洞。触控操作对大多数任务来说出人意料地好用。如果你想要深度且愿意付费一次，没有什么能超越它。',
    pro_en: [
      'Complete PC experience with no artificial timers or energy limits',
      'One-time purchase — zero ongoing spending pressure',
      'Hundreds of hours of content: farming, fishing, mining, relationships, and secrets',
    ],
    pro_zh: [
      '完整 PC 体验，没有人为的计时器或体力限制',
      '一次性购买——零持续消费压力',
      '数百小时的内容：农业、钓鱼、挖矿、人际关系和秘密',
    ],
    watch_en: "Small screen can feel cramped for inventory management — consider playing on a larger phone or tablet.",
    watch_zh: '小屏幕对于背包管理可能感觉有些局促——考虑在更大的手机或平板电脑上游玩。',
  },
  township: {
    title_en: 'Township',
    title_zh: 'Township（城镇物语）',
    emoji: '🏘️',
    tag_en: 'Builder · Community · Farm + Town Hybrid',
    tag_zh: '建造 · 社区 · 农场+城镇混合',
    platform_en: 'iOS · Android · Free',
    platform_zh: 'iOS · Android · 免费',
    desc_en:
      "Township combines farming with city-building in a way that no other mobile game quite replicates. You grow crops to feed factories, build and expand a town, trade with other players, and complete zoo collections. The progression is broad — there is always something to work toward. Developed by Playrix, it has been actively maintained since 2013 and has one of the largest active player bases of any farming game on mobile.",
    desc_zh:
      'Township 以一种其他手机游戏无法复制的方式将农业与城市建设结合在一起。你种植作物为工厂供料、建造和扩张城镇、与其他玩家交易、完成动物园收藏。进度内容广泛——总是有东西可以努力。由 Playrix 开发，自 2013 年以来持续维护，拥有手机农场游戏中最大的活跃玩家群之一。',
    pro_en: [
      'Unique farm-plus-town combination that rewards both farmers and builders',
      'Active co-op teams and regular seasonal events keep the experience fresh',
      'Enormous content depth — the game has been updated for 10+ years',
    ],
    pro_zh: [
      '独特的农场加城镇组合，同时奖励农民和建造者',
      '活跃的合作团队和定期季节活动保持体验新鲜感',
      '巨大的内容深度——游戏已更新超过 10 年',
    ],
    watch_en: "Can become resource-intensive at higher levels. Joining an active team early makes a significant difference in progression speed.",
    watch_zh: '在高等级时可能变得资源密集。早期加入一个活跃的团队对进度速度有显著影响。',
  },
  pocketcamp: {
    title_en: 'Animal Crossing: Pocket Camp',
    title_zh: '动物之森：口袋营地',
    emoji: '🍃',
    tag_en: 'Cute · Creative · Character-Focused',
    tag_zh: '可爱 · 创意 · 角色为核心',
    platform_en: 'iOS · Android · Free (subscription available)',
    platform_zh: 'iOS · Android · 免费（可订阅）',
    desc_en:
      "Animal Crossing: Pocket Camp brings the beloved Nintendo franchise to mobile in a focused form. You manage a campsite, befriend Animal Crossing villagers by fulfilling their requests, collect furniture and clothing, and decorate your camp and cabin with Nintendo-quality polish. The seasonal crafting events are a highlight — limited-time furniture sets tied to real-world seasons and holidays. If you love the Animal Crossing aesthetic and want it in short, satisfying mobile sessions, Pocket Camp delivers.",
    desc_zh:
      '动物之森：口袋营地将深受喜爱的任天堂系列以专注的形式带到手机上。你管理一个露营地、通过满足动物森友会村民的要求与他们建立友谊、收集家具和服装，以及用任天堂品质的精良装饰你的营地和小屋。季节性制作活动是亮点——与现实世界季节和节日相关的限时家具套装。如果你喜欢动物森友会的美学风格，想要在短暂、令人满足的手机游戏时段中体验它，口袋营地能满足你。',
    pro_en: [
      'Official Nintendo Animal Crossing experience on mobile — full villager roster',
      'Seasonal crafting events with beautiful limited-edition furniture sets',
      'Low time pressure — perfect for short daily check-ins and creative decoration',
    ],
    pro_zh: [
      '官方任天堂动物森友会手机体验——完整的村民阵容',
      '季节性制作活动，有精美的限定版家具套装',
      '时间压力低——非常适合短暂的每日查看和创意装饰',
    ],
    watch_en: "The Leaf Tickets premium currency is needed for some content — the subscription (Nook N Go) makes the experience significantly smoother.",
    watch_zh: '部分内容需要高级货币树叶票——订阅（小熊快跑）会让体验顺畅得多。',
  },
}

function calcResult(answers: Game[]): Game {
  const counts: Record<Game, number> = { hayday: 0, stardew: 0, township: 0, pocketcamp: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Game
}

export function MobileFarmingQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Game | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Game[])]
    const url = `${BASE_URL}/${locale}/quizzes/mobile-farming-quiz`
    const shareText = isZh
      ? `最适合我的手机农场游戏是「${result.title_zh}」！来测测你的：${url}`
      : `My perfect mobile farming game is ${result.title_en}! Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
          <p className="text-xs text-[#4a5a4a]">
            {isZh ? result.platform_zh : result.platform_en}
          </p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.desc_zh : result.desc_en}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {isZh ? '为什么适合你' : 'Why it fits you'}
          </h3>
          <ul className="space-y-2">
            {(isZh ? result.pro_zh : result.pro_en).map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-[#2d3d2d] pt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {isZh ? '需要注意' : 'Watch out for'}
            </p>
            <p className="text-sm text-[#8a9a7a]">{isZh ? result.watch_zh : result.watch_en}</p>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把手机农场游戏里的慢生活理念带入现实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the slow-living idea from mobile farming into real daily life.'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} isZh={isZh} />
          <button
            onClick={() => {
              setAnswers(Array(QUESTIONS.length).fill(null))
              setSubmitted(false)
            }}
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
          {isZh ? '哪款手机农场游戏最适合你？' : 'Which Mobile Farming Game Is Right for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个关于游戏习惯的问题，从 Hay Day、星露谷、Township、动物之森口袋营地中精准推荐'
            : '6 questions about how you play to match you with Hay Day, Stardew Valley, Township, or Pocket Camp'}
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
                  onClick={() => {
                    const next = [...answers]
                    next[qi] = opt.type
                    setAnswers(next)
                  }}
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
          allAnswered
            ? 'bg-[#f0a832] text-[#0f1a0f] hover:bg-[#e09822]'
            : 'cursor-not-allowed bg-[#2d3d2d] text-[#4a5a4a]'
        }`}
      >
        {isZh ? '找到我的手机农场游戏' : 'Find My Mobile Farming Game'}
      </button>
    </div>
  )
}
