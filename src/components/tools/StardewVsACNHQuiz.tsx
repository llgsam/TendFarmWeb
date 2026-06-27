'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Result = 'sdv' | 'acnh' | 'both-sdv' | 'both-acnh'

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
  options: Array<{ en: string; zh: string; type: Result }>
}> = [
  {
    q_en: 'How long do you typically want to play in one session?',
    q_zh: '你通常想在一次游戏里玩多长时间？',
    options: [
      { en: '2–4+ hours — I want to sink in and really accomplish something', zh: '2-4 小时以上——我想沉浸其中，真正完成一些事情', type: 'sdv' },
      { en: '30–60 minutes — light and refreshing, like a daily ritual', zh: '30-60 分钟——轻松清爽，像每天的仪式', type: 'acnh' },
      { en: '1–2 hours — enough to feel progress but not overwhelming', zh: '1-2 小时——足以感受进度但不会太累', type: 'both-sdv' },
      { en: 'Flexible — 15 minutes or 3 hours, depending on how I feel', zh: '弹性——15 分钟或 3 小时都行，看心情', type: 'both-acnh' },
    ],
  },
  {
    q_en: 'What do you want to feel after a gaming session?',
    q_zh: '游戏结束后，你想有什么感觉？',
    options: [
      { en: 'Productive — like I really got things done and moved forward', zh: '有成就感——感觉真正做了事情、有了进展', type: 'sdv' },
      { en: 'Refreshed — like I had a small vacation inside the game', zh: '焕然一新——感觉在游戏里度过了一次小假期', type: 'acnh' },
      { en: 'Satisfied — a mix of accomplishment and relaxation', zh: '满足——成就感和放松感的结合', type: 'both-sdv' },
      { en: 'Calm — no stress carried in, no stress carried out', zh: '平静——带着轻松进去，带着平静出来', type: 'both-acnh' },
    ],
  },
  {
    q_en: 'How do you feel about goals and to-do lists in games?',
    q_zh: '你对游戏里的目标和待办事项有什么感觉？',
    options: [
      { en: 'I love them — clear goals motivate me and give structure to my play', zh: '我喜欢——明确的目标激励我，给我的游戏提供结构', type: 'sdv' },
      { en: "I prefer no pressure — gentle nudges only, nothing I feel I 'must' do", zh: "我更喜欢没有压力——只需温和提示，没有我'必须'做的事情", type: 'acnh' },
      { en: 'I like optional goals — something to aim for but nothing stressful', zh: '我喜欢可选目标——有努力的方向但没有压力', type: 'both-sdv' },
      { en: "I'm fine either way — I make my own goals or ignore them", zh: '我随便——我自己定目标，或者忽略它们', type: 'both-acnh' },
    ],
  },
  {
    q_en: 'Which sounds more appealing: building a farm or decorating an island?',
    q_zh: '哪个听起来更吸引你：建造农场还是装饰岛屿？',
    options: [
      { en: "Building and expanding a farm — watching it grow from nothing into something productive", zh: '建造和扩展农场——看着它从零开始成长为富有生产力的地方', type: 'sdv' },
      { en: "Decorating and personalizing an island — making it look exactly how I imagine it", zh: '装饰和个性化定制岛屿——让它看起来正是我想象中的样子', type: 'acnh' },
      { en: 'Both equally — I want efficiency AND aesthetics', zh: '两者同等重要——我既想要效率也想要美观', type: 'both-sdv' },
      { en: "More decoration — creativity and beauty matter more to me than optimization", zh: '更多是装饰——创造力和美感对我比优化更重要', type: 'both-acnh' },
    ],
  },
  {
    q_en: 'How do you feel about games that use real-world time?',
    q_zh: '你对使用真实时间的游戏有什么感觉？',
    options: [
      { en: "I prefer games that let me control time — I want to play 3 game-years in one afternoon", zh: '我更喜欢让我控制时间的游戏——我想在一个下午玩三个游戏年', type: 'sdv' },
      { en: "I love it — my island feels alive and changes with the real seasons", zh: '我喜欢——我的岛屿感觉有生命，随着真实季节变化', type: 'acnh' },
      { en: "I'm neutral — I like that real-world time games reward consistency", zh: '我无所谓——我喜欢真实时间游戏奖励持续游玩的方式', type: 'both-acnh' },
      { en: "I slightly prefer in-game time control — flexibility matters to me", zh: '我稍微更喜欢游戏内时间控制——灵活性对我很重要', type: 'both-sdv' },
    ],
  },
  {
    q_en: 'Which of these describes you better?',
    q_zh: '哪个描述更符合你？',
    options: [
      { en: 'I like depth and systems — I want to learn, optimize, and unlock everything', zh: '我喜欢深度和系统——我想学习、优化、解锁所有东西', type: 'sdv' },
      { en: "I like gentle charm — I want to feel cozy, not challenged", zh: '我喜欢温和的魅力——我想感受治愈，而不是接受挑战', type: 'acnh' },
      { en: 'A bit of both — depth when I want it, easy when I need it', zh: '两者兼具——想要的时候有深度，需要的时候很轻松', type: 'both-sdv' },
      { en: 'Mainly ease — I come to cozy games to escape stress, not manage it', zh: '主要是轻松——我来玩 cozy 游戏是为了逃避压力，而不是管理它', type: 'both-acnh' },
    ],
  },
]

const RESULTS: Record<
  Result,
  {
    title_en: string
    title_zh: string
    emoji: string
    verdict_en: string
    verdict_zh: string
    desc_en: string
    desc_zh: string
    also_en: string
    also_zh: string
  }
> = {
  sdv: {
    title_en: 'Stardew Valley is your game',
    title_zh: '星露谷物语最适合你',
    emoji: '🌾',
    verdict_en: 'Goal-driven · Deep systems · Completionist soul',
    verdict_zh: '目标驱动 · 深度系统 · 收集完美主义者',
    desc_en:
      "You are a Stardew Valley person through and through. You want to accomplish things — build the perfect farm, finish the community center, unlock every recipe, romance a character you love, and eventually explore the secret endgame content. Stardew rewards the kind of engagement you bring: the willingness to learn systems, optimize crop rotations, figure out the best mining paths, and put in time to see real progress. It gives you four seasons of structured goals that keep each playthrough feeling purposeful. At ~$15 for 300+ hours of content, it's one of the best games ever made at any price.",
    desc_zh:
      '你是彻头彻尾的星露谷物语人。你想要完成事情——建造完美的农场、完成社区中心、解锁所有配方、与心爱的角色恋爱，最终探索秘密的后期游戏内容。星露谷奖励你带来的参与度：愿意学习系统、优化作物轮换、找出最佳挖矿路径，并投入时间看到真正的进步。它给你四个季节的结构化目标，让每次游戏都感觉有目的性。约 100 元人民币就能获得 300 小时以上的内容，它是任何价位有史以来最好的游戏之一。',
    also_en: 'You might also love: Animal Crossing for short sessions when you want a break from goals, and Sun Haven if you want even more RPG depth after Stardew.',
    also_zh: '你可能也喜欢：动物之森（当你想从目标中休息时作为短时间游戏），以及在星露谷之后想要更多 RPG 深度的话可以试试 Sun Haven。',
  },
  acnh: {
    title_en: 'Animal Crossing: New Horizons is your game',
    title_zh: '动物之森：新视野最适合你',
    emoji: '🍃',
    verdict_en: 'Creative soul · No pressure · Pure relaxation',
    verdict_zh: '创意灵魂 · 零压力 · 纯粹放松',
    desc_en:
      "You are an Animal Crossing person. You want a game that asks nothing of you — a place you can return to daily, spend 30 peaceful minutes, decorate exactly how you like, chat with adorable villagers, and leave feeling refreshed rather than accomplished. Animal Crossing: New Horizons is the most genuinely stress-free major game ever made: no death, no fail states, no winter that kills your crops, no pressure to progress. Its real-time clock makes your island feel alive in a way no other game matches. You will love it as a daily ritual, a creative canvas, and a place that's always there waiting for you.",
    desc_zh:
      '你是动物之森人。你想要一款对你没有任何要求的游戏——一个你可以每天回来、度过 30 分钟平静时光、按照自己喜欢的方式装饰、与可爱的村民聊天、离开时感觉焕然一新而非成就满满的地方。动物之森：新视野是有史以来最真正没有压力的主要游戏：没有死亡、没有失败机制、没有杀死你作物的冬天、没有进展的压力。它的实时时钟让你的岛屿以没有其他游戏能匹敌的方式充满生机。你会喜欢它作为每日仪式、创意画布，以及永远在那里等待你的地方。',
    also_en: 'You might also love: Spiritfarer for emotional storytelling with gentle gameplay, and Disney Dreamlight Valley for more character quests within a similar cozy life-sim feel.',
    also_zh: '你可能也喜欢：Spiritfarer（有情感叙事和温和游戏玩法），以及 Disney Dreamlight Valley（在类似治愈生活模拟感觉中有更多角色任务）。',
  },
  'both-sdv': {
    title_en: 'Play both — start with Stardew Valley',
    title_zh: '两款都值得玩——从星露谷物语开始',
    emoji: '🌾🍃',
    verdict_en: 'Balanced · Goal-leaning · Both will reward you',
    verdict_zh: '均衡 · 偏向目标 · 两款都会给你回报',
    desc_en:
      "You will love both games — but start with Stardew Valley. Your answers show you appreciate depth and progression, which Stardew delivers in abundance. Complete at least one full year (in-game) in Stardew first — experience the farming loop, the mine progression, and the community center restoration. Once you have that foundation, Animal Crossing becomes a beautiful complement: a lighter game you play in short daily sessions without the goal pressure. Many players love both games for exactly this reason — Stardew for focused sessions when you have time and energy, Animal Crossing for gentle daily check-ins.",
    desc_zh:
      '两款游戏你都会喜欢——但从星露谷物语开始。你的回答显示你欣赏深度和进展，而星露谷在这方面提供了大量内容。先在星露谷完成至少一个完整年（游戏内）——体验农业循环、矿洞进度和社区中心修复。一旦你有了这个基础，动物之森就成为美好的补充：一款你在短暂的日常时段里没有目标压力地游玩的轻度游戏。许多玩家正是因为这个原因喜欢两款游戏——有时间和精力时玩星露谷进行专注游戏，动物之森则作为温和的每日签到。',
    also_en: 'After both: try Palia for a free online cozy MMO that blends the social relaxation of Animal Crossing with some of Stardew\'s farming depth.',
    also_zh: '两款都玩完之后：试试 Palia——一款免费的在线 cozy MMO，将动物之森的社交放松与星露谷的部分农业深度融合在一起。',
  },
  'both-acnh': {
    title_en: 'Play both — start with Animal Crossing',
    title_zh: '两款都值得玩——从动物之森开始',
    emoji: '🍃🌾',
    verdict_en: 'Balanced · Relaxation-leaning · Both will reward you',
    verdict_zh: '均衡 · 偏向放松 · 两款都会给你回报',
    desc_en:
      "You will love both games — but start with Animal Crossing: New Horizons. Your preference for flexibility and low pressure means ACNH's gentle real-time rhythm will feel immediately natural. Spend a month or two visiting your island daily, decorating, meeting your villagers, and experiencing the seasons. After that foundation, Stardew Valley opens up beautifully as a game you can choose to go deeper when you have more time and energy. Many players discover that the two games fill different moods perfectly: Animal Crossing for daily maintenance and relaxation, Stardew Valley for weekend sessions with more focus.",
    desc_zh:
      '两款游戏你都会喜欢——但从动物之森：新视野开始。你对灵活性和低压力的偏好意味着动物之森温和的实时节奏会立刻感觉自然。花一两个月每天拜访你的岛屿、装饰、认识你的村民、体验季节。有了这个基础之后，星露谷物语就作为一款你有更多时间和精力时可以选择深入的游戏而美妙地展开。许多玩家发现这两款游戏完美地填补了不同的心情：动物之森用于每日维护和放松，星露谷物语用于周末更专注的游戏时段。',
    also_en: "After both: Spiritfarer is the perfect next step — it blends Animal Crossing's gentle management with a story that will stay with you for years.",
    also_zh: '两款都玩完之后：Spiritfarer 是完美的下一步——它将动物之森的温和经营与一个会在你心里留存多年的故事融合在一起。',
  },
}

function calcResult(answers: Result[]): Result {
  const counts: Record<Result, number> = { sdv: 0, acnh: 0, 'both-sdv': 0, 'both-acnh': 0 }
  for (const a of answers) counts[a]++
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return sorted[0][0] as Result
}

export function StardewVsACNHQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Result | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Result[])]
    const url = `${BASE_URL}/${locale}/quizzes/stardew-vs-animal-crossing`
    const shareText = isZh
      ? `星露谷 vs 动物之森——测验说我应该玩：${result.title_zh}！找到你的答案：${url}`
      : `Stardew Valley vs Animal Crossing — the quiz says: ${result.title_en}! Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.verdict_zh : result.verdict_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.desc_zh : result.desc_en}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
            {isZh ? '你可能也会喜欢' : 'You might also love'}
          </p>
          <p className="text-sm text-[#8a9a7a]">{isZh ? result.also_zh : result.also_en}</p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把 cozy 游戏里的慢生活哲学带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the slow-living philosophy from cozy games into real daily life.'}
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
            ? '星露谷物语 vs 动物之森：哪款更适合你？'
            : 'Stardew Valley vs Animal Crossing: Which Is Right for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，帮你在星露谷物语和动物之森之间做出选择——或者找到两款都玩的最佳顺序'
            : '6 questions to help you choose between Stardew Valley and Animal Crossing — or find the best order to play both'}
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
        {isZh ? '找到我的答案' : 'Find My Answer'}
      </button>
    </div>
  )
}
