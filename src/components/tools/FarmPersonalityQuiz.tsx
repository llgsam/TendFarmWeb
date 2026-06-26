'use client'

import { useState } from 'react'
import Link from 'next/link'

type Archetype = 'optimizer' | 'aesthete' | 'explorer' | 'zen'

interface Question {
  zh: string
  en: string
  options: { zh: string; en: string; type: Archetype }[]
}

const QUESTIONS: Question[] = [
  {
    zh: '拿到一块新地，你第一件事是？',
    en: 'You just unlocked new land. What do you do first?',
    options: [
      { zh: '查作物数据，算最优种植配置', en: 'Look up crop data and calculate the optimal layout', type: 'optimizer' },
      { zh: '先规划布局，让地看起来好看', en: 'Plan the layout so it looks beautiful', type: 'aesthete' },
      { zh: '直接种，顺便探索周围有什么', en: 'Just plant something and explore around', type: 'explorer' },
      { zh: '随便种点什么，慢慢来', en: 'Plant whatever, no rush', type: 'zen' },
    ],
  },
  {
    zh: '游戏里出了限时活动，你会：',
    en: 'A limited-time event just appeared in your game. You:',
    options: [
      { zh: '查攻略，算最高效的完成路线', en: 'Look up a guide and plan the most efficient route', type: 'optimizer' },
      { zh: '先看看有没有好看的限定装饰', en: 'Check if there are pretty limited decorations', type: 'aesthete' },
      { zh: '直接冲！先去看看是什么', en: 'Jump right in to see what it is', type: 'explorer' },
      { zh: '有空再说，不着急', en: "Join when I feel like it, no rush", type: 'zen' },
    ],
  },
  {
    zh: '仓库满了，你的第一反应是？',
    en: "Your barn is full. What's your first move?",
    options: [
      { zh: '卖掉利润最低的，保持效率', en: 'Sell the least profitable items immediately', type: 'optimizer' },
      { zh: '整理分类，摆放整齐', en: 'Organize everything neatly by category', type: 'aesthete' },
      { zh: '去解锁更大的仓库', en: 'Go unlock a bigger barn', type: 'explorer' },
      { zh: '就这样吧，以后再处理', en: 'Leave it for now', type: 'zen' },
    ],
  },
  {
    zh: '朋友问你：农场游戏什么最好玩？你说：',
    en: "A friend asks: what's the best part of farming games? You say:",
    options: [
      { zh: '算出最大收益的那种成就感', en: 'The satisfaction of maximizing your income', type: 'optimizer' },
      { zh: '把农场装饰得漂亮，截图分享', en: 'Making your farm beautiful and sharing screenshots', type: 'aesthete' },
      { zh: '发现新区域、解锁新机制', en: 'Discovering new areas and unlocking new mechanics', type: 'explorer' },
      { zh: '没有压力，想玩就玩', en: 'No pressure, just pure relaxation', type: 'zen' },
    ],
  },
  {
    zh: '看到一款新农场游戏，你最先注意到：',
    en: 'You see a new farming game. What catches your eye first?',
    options: [
      { zh: '有没有深度的经济/生产系统', en: 'Whether it has a deep economy and production system', type: 'optimizer' },
      { zh: '画风和美术风格好不好看', en: 'The art style and visual aesthetic', type: 'aesthete' },
      { zh: '地图有多大、内容有多少', en: 'How big the map is and how much content there is', type: 'explorer' },
      { zh: '节奏快不快、有没有时间压力', en: 'Whether the pace is slow and there is no time pressure', type: 'zen' },
    ],
  },
  {
    zh: '你通常在什么时候打开农场游戏？',
    en: 'When do you usually open your farming game?',
    options: [
      { zh: '专门留出时间坐下来认真玩', en: 'I set aside dedicated time to play properly', type: 'optimizer' },
      { zh: '心情好、想创作的时候', en: 'When I am in a creative mood', type: 'aesthete' },
      { zh: '随时——有新内容就冲', en: 'Anytime — especially when there is new content', type: 'explorer' },
      { zh: '睡前或下班后放松的时候', en: 'Before bed or after work to unwind', type: 'zen' },
    ],
  },
]

interface Result {
  type: Archetype
  titleZh: string
  titleEn: string
  emojiZh: string
  descZh: string
  descEn: string
  games: string[]
  hookZh: string
  hookEn: string
}

const RESULTS: Record<Archetype, Result> = {
  optimizer: {
    type: 'optimizer',
    titleZh: '效率农夫',
    titleEn: 'The Optimizer',
    emojiZh: '📊',
    descZh:
      '数据和系统是你的语言。你会在种第一颗种子之前就算好利润/小时，你的仓库永远整整齐齐，田地永远是当前最优配置。对你来说，农场不只是放松——它是一道可以被解开的数学题。',
    descEn:
      'Data and systems are your language. You calculate gold-per-hour before planting your first seed. Your barn is always organized, your fields always optimal. Farming is a puzzle to be solved.',
    games: ['Hay Day', '星露谷物语 / Stardew Valley', 'Farming Simulator'],
    hookZh:
      'TendFarm 为效率型玩家量身定制：步数、睡眠、HRV 都有精确的农场转化公式。终于有一个游戏，让你的现实数据也可以被优化。',
    hookEn:
      'TendFarm is built for optimizers: your steps, sleep, and HRV each have an exact formula for farm output. Finally, a game where your real-life data can be min-maxed.',
  },
  aesthete: {
    type: 'aesthete',
    titleZh: '美学农夫',
    titleEn: 'The Homesteader',
    emojiZh: '🌸',
    descZh:
      '农场是你的画布。比起最优配置，你更在乎田地布局是否好看，每件家具是否在正确的位置。截图分享是你的成就感来源，你的农场会让人说「哇，好漂亮」。',
    descEn:
      'Your farm is a canvas. You care more about how it looks than how efficient it is. You rearrange furniture until it feels right, and your screenshots get the most comments.',
    games: ['动物森友会 / Animal Crossing', 'Coral Island', 'Cozy Grove'],
    hookZh:
      'TendFarm 的农场随你的生活节律自然生长——规律的作息让农场更有层次，良好的睡眠让收成更充盈。你的生活方式，本身就是最美的农场设计。',
    hookEn:
      'TendFarm grows with your natural rhythm. A consistent sleep schedule makes your farm lush. Your lifestyle is the design.',
  },
  explorer: {
    type: 'explorer',
    titleZh: '探索农夫',
    titleEn: 'The Explorer',
    emojiZh: '🗺️',
    descZh:
      '新地图、新机制、新内容——这才是让你打开游戏的理由。你不会在一件事情上停留太久，因为总有新的东西等着被发现。解锁新区域的那一刻，比任何大丰收都让你兴奋。',
    descEn:
      "New maps, new mechanics, new content — that's why you open the game. You never stay on one thing for long, because there's always something else to discover. Unlocking a new area beats any big harvest.",
    games: ['My Time at Sandrock', 'Palia', 'Fields of Mistria'],
    hookZh:
      'TendFarm 每天都不一样——你的健康数据驱动农场产生新变化。今天多走了几步，今天的作物有不同的成熟节奏。每天打开都有新的发现。',
    hookEn:
      'TendFarm changes every day — your health data creates new variations in your farm. Walk more today, and your crops ripen differently. Something new every time you open it.',
  },
  zen: {
    type: 'zen',
    titleZh: '禅意农夫',
    titleEn: 'The Zen Farmer',
    emojiZh: '🌿',
    descZh:
      '你玩农场游戏，不是为了效率，不是为了漂亮，就是为了那种「什么都不用担心」的感觉。没有截止日期，没有失败惩罚，农场游戏是你在忙碌生活里的一块安静角落。',
    descEn:
      "You play farming games not for efficiency or aesthetics — just for the feeling that nothing can go wrong. No deadlines, no failure states. Your farm is the quiet corner in a busy life.",
    games: ['Cozy Grove', 'Wylde Flowers', '动物森友会 / Animal Crossing'],
    hookZh:
      'TendFarm 是终极的禅意农场——你不需要主动操作任何东西，你的步数和睡眠自动驱动农场生长。昨晚睡得好，今天打开 App 就看到农场悄悄变化了。你活着，它就生长。',
    hookEn:
      "TendFarm is the ultimate zen farm — you don't actively do anything. Your steps and sleep drive it automatically. Sleep well last night, open the app today and find your farm quietly grew. You live; it grows.",
  },
}

function calcResult(answers: Archetype[]): Archetype {
  const counts: Record<Archetype, number> = { optimizer: 0, aesthete: 0, explorer: 0, zen: 0 }
  answers.forEach((a) => counts[a]++)
  return (Object.keys(counts) as Archetype[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b))
}

interface Props {
  locale: string
}

export function FarmPersonalityQuiz({ locale }: Props) {
  const [step, setStep] = useState<number>(0) // 0 = intro, 1-6 = questions, 7 = result
  const [answers, setAnswers] = useState<Archetype[]>([])
  const isZh = locale === 'zh'

  const handleAnswer = (type: Archetype) => {
    const next = [...answers, type]
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
        <div className="mb-6 text-6xl">🌾</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {isZh ? '你是哪种农场玩家？' : 'What Kind of Farmer Are You?'}
        </h2>
        <p className="mb-8 text-[#8a9a7a]">
          {isZh
            ? '6 个问题，测出你的农场游戏人格，并推荐最适合你的游戏。'
            : '6 questions to reveal your farming game personality and find the best games for you.'}
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
    const archetype = calcResult(answers)
    const result = RESULTS[archetype]
    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emojiZh}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {isZh ? '你的农场人格是' : 'Your farming personality:'}
          </p>
          <h2 className="text-3xl font-bold text-[#f0a832]">
            {isZh ? result.titleZh : result.titleEn}
          </h2>
        </div>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-6">
          <p className="leading-relaxed text-[#e8dcc8]">
            {isZh ? result.descZh : result.descEn}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-[#8a9a7a]">
            {isZh ? '适合你的游戏' : 'Games for you'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.games.map((g) => (
              <span
                key={g}
                className="rounded-full border border-[#2d5a27] px-3 py-1 text-sm text-[#e8dcc8]"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* TendFarm Hook */}
        <div className="mb-8 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a] p-6">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">TendFarm</p>
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
          <span>{isZh ? `问题 ${step} / ${QUESTIONS.length}` : `Question ${step} of ${QUESTIONS.length}`}</span>
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
        {q.options.map((opt) => (
          <button
            key={opt.type}
            onClick={() => handleAnswer(opt.type)}
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
