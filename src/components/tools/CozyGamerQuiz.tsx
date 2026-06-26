'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Option {
  zh: string
  en: string
  points: number // 0, 1, or 2
}

interface Question {
  zh: string
  en: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    zh: '游戏里有限时任务或时间压力，你会…？',
    en: 'When a game has timed quests or time pressure, you:',
    options: [
      { zh: '很喜欢，刺激', en: 'Love it — exciting challenge', points: 0 },
      { zh: '勉强接受，但有点烦', en: 'Tolerate it, but find it a bit stressful', points: 1 },
      { zh: '专门找没有时间压力的游戏', en: 'Specifically seek games without time pressure', points: 2 },
      { zh: '一般不太注意', en: "Don't usually notice or care", points: 1 },
    ],
  },
  {
    zh: '在游戏里失败了，你的第一反应是？',
    en: 'If you fail at something in a game, your first reaction is:',
    options: [
      { zh: '重来！我要通关', en: 'Try again — I will beat this', points: 0 },
      { zh: '复盘一下，看看哪里出了问题', en: 'Analyze what went wrong', points: 0 },
      { zh: '有点烦，先去干别的', en: 'Mildly annoyed — time for a break', points: 1 },
      { zh: '我一般不玩会有失败惩罚的游戏', en: "I tend to avoid games with harsh fail states", points: 2 },
    ],
  },
  {
    zh: '你理想的游戏场景是？',
    en: 'Your ideal gaming setup looks like:',
    options: [
      { zh: '毯子+零食+耳机，能沉浸就完美', en: 'Blanket, snacks, headphones — full comfort mode', points: 2 },
      { zh: '高刷显示器+专属座椅，认真竞技', en: 'High-refresh monitor, proper chair — serious setup', points: 0 },
      { zh: '沙发上躺着随便玩', en: 'Couch with no effort', points: 1 },
      { zh: '无所谓，有设备能玩就行', en: "Anything works — I'm not picky", points: 1 },
    ],
  },
  {
    zh: '看到一款新游戏，什么最先吸引你？',
    en: 'What catches your eye first when you see a new game?',
    options: [
      { zh: '画风可爱、氛围温馨', en: 'Cute art style and cozy atmosphere', points: 2 },
      { zh: '创新机制或硬核挑战', en: 'Innovative or challenging mechanics', points: 0 },
      { zh: '好友在玩或口碑很好', en: 'Friends are playing it or it has great reviews', points: 1 },
      { zh: '等打折，先观望', en: "Waiting for a sale — I'll see", points: 1 },
    ],
  },
  {
    zh: '玩游戏时，你多久查一次攻略？',
    en: 'How often do you look up guides or wikis while playing?',
    options: [
      { zh: '经常——我要走最优路线', en: 'Often — I optimize every decision', points: 0 },
      { zh: '只有卡关了才查', en: 'Only when I get truly stuck', points: 1 },
      { zh: '很少——自己慢慢摸索才有意思', en: 'Rarely — discovery is the fun part', points: 2 },
      { zh: '从不，错过什么都无所谓', en: "Never — I don't care about 100%", points: 1 },
    ],
  },
  {
    zh: '辛苦了一天之后，你最想用游戏做什么？',
    en: 'After a tough day, what do you want from a game?',
    options: [
      { zh: '打一局竞技游戏，发泄情绪', en: 'Play something competitive to blow off steam', points: 0 },
      { zh: '完成一个有挑战的任务，找找成就感', en: 'Accomplish something challenging and feel productive', points: 0 },
      { zh: '打开一个轻松的游戏，脑子放空', en: 'Open a chill game and just exist in it', points: 2 },
      { zh: '联机和朋友玩，聊聊天', en: 'Join friends online for social play', points: 1 },
    ],
  },
  {
    zh: '「没有明确结局」的游戏（可以无限玩下去），你觉得？',
    en: 'Games with no clear ending (you can play forever) feel:',
    options: [
      { zh: '完美！我就喜欢活在一个游戏世界里', en: 'Perfect — I love just existing in a game world', points: 2 },
      { zh: '还好，只要有新内容就行', en: 'Fine, as long as content keeps coming', points: 1 },
      { zh: '我需要一个明确目标可以去完成', en: 'I need clear goals and milestones', points: 0 },
      { zh: '有点无聊，游戏应该有一个结局', en: 'Boring — games should have a proper ending', points: 0 },
    ],
  },
  {
    zh: '你一般怎么发现新游戏？',
    en: 'How do you usually discover new games?',
    options: [
      { zh: '刷到有人分享好看的游戏截图', en: 'Seeing pretty screenshots shared online', points: 2 },
      { zh: '朋友推荐或者一起联机', en: 'Friend recommendations or they invite me to play', points: 1 },
      { zh: '销量榜或游戏奖项', en: 'Bestseller charts or game awards', points: 0 },
      { zh: '主播/up 主在玩', en: 'A streamer or content creator is playing it', points: 1 },
    ],
  },
]

const MAX_POINTS = QUESTIONS.length * 2 // 16

interface ResultTier {
  minScore: number
  labelZh: string
  labelEn: string
  emoji: string
  descZh: string
  descEn: string
  gamesZh: string[]
  gamesEn: string[]
  hookZh: string
  hookEn: string
}

const RESULT_TIERS: ResultTier[] = [
  {
    minScore: 13,
    labelZh: '超级 Cozy Gamer',
    labelEn: 'True Cozy Gamer',
    emoji: '🌿',
    descZh:
      '放松就是你玩游戏的全部理由。你不在乎通关，不在乎排名，就在乎那种「今天可以什么都不想」的感觉。毯子、热饮、一个有治愈感的游戏世界——这就是你的快乐公式。世界上有很多种玩家，但 cozy gamer 是灵魂最自由的那一类。',
    descEn:
      "Relaxation is your entire reason to game. You don't care about rankings, completion rates, or being the best — you care about that feeling of total mental rest. A soft blanket, a warm drink, a comforting game world — that's your formula for happiness. There are many kinds of gamers, but cozy gamers have the most peaceful souls.",
    gamesZh: ['星露谷物语', '动物森友会', 'Cozy Grove', 'Wylde Flowers', 'Palia'],
    gamesEn: ['Stardew Valley', 'Animal Crossing: New Horizons', 'Cozy Grove', 'Wylde Flowers', 'Palia'],
    hookZh:
      'TendFarm 是终极 cozy 游戏——你不需要主动操作任何东西，你的步数和睡眠在后台悄悄驱动农场成长。今天睡得好，明天打开就看到农场静静地变了。这是有史以来最懒、最舒服的农场。',
    hookEn:
      "TendFarm is the ultimate cozy game — you don't actively do anything. Your steps and sleep quietly grow your farm in the background. Sleep well tonight, open the app tomorrow and find your farm has quietly bloomed. The laziest, most comfortable farm ever made.",
  },
  {
    minScore: 9,
    labelZh: 'Cozy 派玩家',
    labelEn: 'Cozy Soul',
    emoji: '☕',
    descZh:
      '你是骨子里的 cozy gamer，但偶尔也能接受一点挑战——只要不破坏整体的放松感就行。你的游戏库里大概既有治愈系的农场游戏，也有偶尔打打的冒险游戏。你理解「舒适」和「无聊」的区别，也清楚什么游戏值得你的时间。',
    descEn:
      "You're a cozy gamer at heart, but you can handle occasional challenge — as long as it doesn't break the overall relaxing vibe. Your library probably has both comforting farm games and occasional adventure games. You know the difference between cozy and boring, and you know exactly which games deserve your time.",
    gamesZh: ['星露谷物语', 'Coral Island', 'My Time at Sandrock', 'Fields of Mistria', '动物森友会'],
    gamesEn: ['Stardew Valley', 'Coral Island', 'My Time at Sandrock', 'Fields of Mistria', 'Animal Crossing'],
    hookZh:
      'TendFarm 正好适合 cozy soul——有一点系统深度（你的健康数据驱动农场），但完全不需要主动打理。是那种「每天打开看一眼就很满足」的游戏。',
    hookEn:
      "TendFarm fits a cozy soul perfectly — there's some system depth (your health data drives the farm) but zero active management required. It's the kind of game you open for a look every day and feel genuinely satisfied.",
  },
  {
    minScore: 5,
    labelZh: '均衡派玩家',
    labelEn: 'The Balanced Gamer',
    emoji: '🎮',
    descZh:
      '你是那种真正的「全能型」玩家——能打 boss、能种田、能搞建设、能参加限时活动，全凭当时的心情。你不偏执于某一种游戏风格，这让你的游戏体验非常丰富。你既能欣赏 cozy 游戏的治愈感，也不排斥有点压力的挑战。',
    descEn:
      "You're a genuine all-rounder — you can boss-fight, farm, build, and do timed events, all depending on your mood. You're not rigid about any one style, which makes your gaming life incredibly rich. You can appreciate the therapeutic value of cozy games and handle some challenge.",
    gamesZh: ['星露谷物语', 'My Time at Sandrock', 'Palia', 'Coral Island', 'Hades'],
    gamesEn: ['Stardew Valley', 'My Time at Sandrock', 'Palia', 'Coral Island', 'Hades'],
    hookZh:
      'TendFarm 对均衡型玩家来说像是一个有趣的后台系统——不需要你专注操作，但结合了健康数据驱动的「种田」乐趣，是对你现有游戏库的好补充。',
    hookEn:
      'TendFarm works well for balanced gamers as a satisfying background system — no active focus needed, but health-data-driven farming adds an interesting layer alongside your existing games.',
  },
  {
    minScore: 2,
    labelZh: '挑战派玩家',
    labelEn: 'The Challenger',
    emoji: '⚔️',
    descZh:
      '你玩游戏是为了挑战自己、证明自己。失败不是挫折，是练习的机会。你的游戏时间是宝贵的，所以你倾向于选择有深度、有挑战、有成长感的游戏。cozy 游戏？可能偶尔用来放松——但对你来说，「太轻松」很快会变成「太无聊」。',
    descEn:
      "You game to challenge yourself and prove something. Failure isn't discouraging — it's practice. Your game time is precious, so you lean toward games with depth, challenge, and growth. Cozy games? Maybe occasionally to unwind — but 'too easy' quickly becomes 'too boring' for you.",
    gamesZh: ['星露谷物语（优化路线）', 'Hades', 'Dark Souls', 'Farming Simulator', 'Deep Rock Galactic'],
    gamesEn: ['Stardew Valley (optimized routes)', 'Hades', 'Dark Souls', 'Farming Simulator', 'Deep Rock Galactic'],
    hookZh:
      'TendFarm 对挑战型玩家来说有个有趣的角度：你的 HRV、睡眠评分、步数都有精确的转换公式，驱动农场效率。这是一个可以「优化」的现实挑战——用你的健康数据打高分。',
    hookEn:
      "TendFarm has an interesting angle for challengers: your HRV, sleep scores, and step counts each have exact formulas driving farm output. There's a real-life challenge to optimize — use your health data to score higher.",
  },
  {
    minScore: 0,
    labelZh: '硬核玩家',
    labelEn: 'The Hardcore Player',
    emoji: '🔥',
    descZh:
      '你来游戏世界是要证明自己的。轻松？无聊。舒适？可以有，但只是偶尔喘口气。你最享受那种「终于打过去了」的成就感，你的玩家 DNA 里写满了挑战和胜利。也许 cozy 游戏不是你的主场——但谁知道呢，也许哪天你会发现星露谷的种菜流程也挺让人上瘾的。',
    descEn:
      "You're here to prove yourself. Easy? Boring. Comforting? Maybe occasionally. Your greatest joy is that 'I finally beat it' feeling, and your gamer DNA is written in challenge and victory. Cozy games might not be your main arena — but who knows, maybe one day you'll find that min-maxing Stardew Valley crops is surprisingly addictive.",
    gamesZh: ['Dark Souls / Elden Ring', 'Hades', 'Hollow Knight', '星露谷物语（卷王路线）', 'Farming Simulator'],
    gamesEn: ['Dark Souls / Elden Ring', 'Hades', 'Hollow Knight', 'Stardew Valley (optimized run)', 'Farming Simulator'],
    hookZh:
      'TendFarm 对硬核玩家来说是个新挑战：用你的健康数据（步数、睡眠、HRV）来优化农场产出。你现实生活里的行为表现，直接影响游戏成绩。这是最难「作弊」的农场游戏。',
    hookEn:
      "TendFarm is a novel challenge for hardcore players: optimize your farm output through real health data — steps, sleep, HRV all feed directly into your farm performance. It's the farming game you literally can't cheat at.",
  },
]

function calcResult(totalPoints: number): ResultTier {
  return RESULT_TIERS.find((tier) => totalPoints >= tier.minScore) ?? RESULT_TIERS[RESULT_TIERS.length - 1]
}

function getPercentage(points: number): number {
  return Math.round((points / MAX_POINTS) * 100)
}

interface ShareButtonProps {
  scorePercent: number
  resultLabel: string
  locale: string
  isZh: boolean
}

function ShareButton({ scorePercent, resultLabel, locale, isZh }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://www.farmgamehub.com/${locale}/quizzes/cozy-gamer`
  const text = isZh
    ? `我测出来了！我的 Cozy 指数是 ${scorePercent}%（${resultLabel}）。来测测你的：${url}`
    : `I scored ${scorePercent}% on the Cozy Gamer quiz — I'm "${resultLabel}"! Take it here: ${url}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: open Twitter
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    }
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 rounded-lg border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copied ? (isZh ? '✓ 已复制！' : '✓ Copied!') : (isZh ? '📋 复制结果' : '📋 Copy result')}
      </button>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]"
      >
        𝕏 {isZh ? '分享到 X' : 'Share on X'}
      </a>
    </div>
  )
}

interface Props {
  locale: string
}

export function CozyGamerQuiz({ locale }: Props) {
  const [step, setStep] = useState<number>(0) // 0=intro, 1–N=questions, N+1=result
  const [totalPoints, setTotalPoints] = useState<number>(0)
  const isZh = locale === 'zh'

  const handleAnswer = (points: number) => {
    const nextPoints = totalPoints + points
    if (step === QUESTIONS.length) {
      setTotalPoints(nextPoints)
      setStep(step + 1)
    } else {
      setTotalPoints(nextPoints)
      setStep(step + 1)
    }
  }

  const reset = () => {
    setTotalPoints(0)
    setStep(0)
  }

  // Intro
  if (step === 0) {
    return (
      <div className="text-center">
        <div className="mb-6 text-6xl">☕</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {isZh ? '你是 Cozy Gamer 吗？' : 'Are You a Cozy Gamer?'}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {isZh
            ? '8 个问题，测出你的 Cozy 指数（0%–100%），看看你的灵魂属于哪个阵营。'
            : '8 questions to calculate your Cozy Score (0%–100%) and find which gaming tribe you belong to.'}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {isZh ? '结果可以截图分享，测测朋友的 Cozy 指数 →' : 'Share your score — see if your friends are cozy or hardcore →'}
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
    const percentage = getPercentage(totalPoints)
    const result = calcResult(totalPoints)

    return (
      <div>
        {/* Score display */}
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {isZh ? '你的 Cozy 指数' : 'Your Cozy Score'}
          </p>
          <div className="mb-2 text-5xl font-bold text-[#f0a832]">{percentage}%</div>
          <p className="text-lg font-semibold text-[#e8dcc8]">
            {isZh ? result.labelZh : result.labelEn}
          </p>
        </div>

        {/* Score bar */}
        <div className="mb-6">
          <div className="h-2 w-full rounded-full bg-[#2d3d2d]">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#2d5a27] to-[#f0a832] transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-[#4a5a4a]">
            <span>{isZh ? '硬核' : 'Hardcore'}</span>
            <span>{isZh ? 'Cozy' : 'Cozy'}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-5">
          <p className="leading-relaxed text-[#e8dcc8]">
            {isZh ? result.descZh : result.descEn}
          </p>
        </div>

        {/* Game recs */}
        <div className="mb-5">
          <h3 className="mb-3 text-sm font-semibold text-[#8a9a7a]">
            {isZh ? '适合你的游戏' : 'Games that fit you'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {(isZh ? result.gamesZh : result.gamesEn).map((g) => (
              <span key={g} className="rounded-full border border-[#2d5a27] px-3 py-1 text-sm text-[#e8dcc8]">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mb-6">
          <p className="mb-3 text-sm text-[#8a9a7a]">
            {isZh ? '分享给朋友，看看他们的 Cozy 指数 👇' : 'Share your score with friends 👇'}
          </p>
          <ShareButton
            scorePercent={percentage}
            resultLabel={isZh ? result.labelZh : result.labelEn}
            locale={locale}
            isZh={isZh}
          />
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
          <span>{isZh ? 'Cozy 指数进度' : 'Cozy Score'}</span>
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
            onClick={() => handleAnswer(opt.points)}
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
            // We can't undo points easily without tracking per-answer history
            // So we just restart from intro if going back
            setStep(0)
            setTotalPoints(0)
          }}
          className="mt-4 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
        >
          ↺ {isZh ? '重新开始' : 'Restart'}
        </button>
      )}
    </div>
  )
}
