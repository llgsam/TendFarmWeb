'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'stardew' | 'acnh' | 'powerwash' | 'spiritfarer'

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
    q_en: "Right now, what does your brain most need?",
    q_zh: '此刻，你的大脑最需要什么？',
    options: [
      { en: 'Something to focus on — I want my mind occupied with tasks', zh: '专注的事情——我想让大脑有任务可做', type: 'stardew' },
      { en: 'Creative space — I want to make or arrange things without pressure', zh: '创意空间——我想在没有压力的情况下创造或整理东西', type: 'acnh' },
      { en: 'Pure flow — I want repetitive, satisfying action that empties my mind', zh: '纯粹的心流——我想要重复的、令人满足的动作来清空大脑', type: 'powerwash' },
      { en: 'Meaning — I want to feel something real and be moved', zh: '意义感——我想感受到真实的东西并被触动', type: 'spiritfarer' },
    ],
  },
  {
    q_en: 'How has today been for you?',
    q_zh: '你今天过得怎么样？',
    options: [
      { en: 'Busy and scattered — I need a game that gives me back a sense of control', zh: '忙碌而分散——我需要一款能给我重新掌控感的游戏', type: 'stardew' },
      { en: 'Fine but a little flat — I want something gentle and aesthetic', zh: '还好但有点平淡——我想要温和而有美感的东西', type: 'acnh' },
      { en: 'Stressful or overwhelming — I genuinely need to turn my brain off', zh: '压力很大或不堪重负——我真的需要关掉大脑', type: 'powerwash' },
      { en: 'Heavy or emotional — I want a game that matches that weight', zh: '沉重或情绪化——我想要一款匹配这种重量的游戏', type: 'spiritfarer' },
    ],
  },
  {
    q_en: 'How much mental energy do you have right now?',
    q_zh: '你现在有多少精神能量？',
    options: [
      { en: 'Moderate — I can think and plan but do not want anything too intense', zh: '中等——我可以思考和计划，但不想要太激烈的东西', type: 'stardew' },
      { en: 'Enough to be creative but not enough to manage complexity', zh: '足够有创意但不足以管理复杂性', type: 'acnh' },
      { en: 'Very low — I need something I can do on autopilot', zh: '非常低——我需要可以自动驾驶的东西', type: 'powerwash' },
      { en: 'Emotionally available — I am ready to invest in something that matters', zh: '情感上可用——我准备好投入对我有意义的事情', type: 'spiritfarer' },
    ],
  },
  {
    q_en: "Which of these sounds most appealing right now?",
    q_zh: '现在哪个听起来最吸引你？',
    options: [
      { en: 'Tending crops, mining, and watching my farm grow over seasons', zh: '照料作物、挖矿，看着我的农场随季节成长', type: 'stardew' },
      { en: 'Wandering a peaceful island, decorating, and visiting friends', zh: '漫步在宁静的岛屿上，装饰，拜访朋友', type: 'acnh' },
      { en: 'Cleaning or organizing something into a perfect state', zh: '把某样东西清洁或整理成完美的状态', type: 'powerwash' },
      { en: 'Sailing, cooking for spirits, and letting go of things you love', zh: '航行、为灵魂烹饪，并放手你所爱的东西', type: 'spiritfarer' },
    ],
  },
  {
    q_en: 'How long are you planning to play tonight?',
    q_zh: '你今晚打算玩多长时间？',
    options: [
      { en: '1-2 hours — I want meaningful progress in that time', zh: '1-2 小时——我想在这段时间内取得有意义的进展', type: 'stardew' },
      { en: '30-60 minutes — enough to visit a few islanders and maybe do some terraforming', zh: '30-60 分钟——足够拜访几位岛民，也许做些地形改造', type: 'acnh' },
      { en: 'However long it takes to decompress — no specific goal', zh: '减压需要多长时间就多长时间——没有特定目标', type: 'powerwash' },
      { en: '2+ hours — I want to really sink into something tonight', zh: '2 小时以上——我今晚想真正沉浸在某件事里', type: 'spiritfarer' },
    ],
  },
  {
    q_en: 'Pick the word that feels most true right now.',
    q_zh: '选出现在感觉最真实的词。',
    options: [
      { en: 'Productive', zh: '效率感', type: 'stardew' },
      { en: 'Peaceful', zh: '平静', type: 'acnh' },
      { en: 'Numb', zh: '麻木', type: 'powerwash' },
      { en: 'Tender', zh: '柔软', type: 'spiritfarer' },
    ],
  },
]

const RESULTS: Record<
  Pick,
  {
    title_en: string
    title_zh: string
    emoji: string
    mood_en: string
    mood_zh: string
    why_en: string
    why_zh: string
    tip_en: string
    tip_zh: string
  }
> = {
  stardew: {
    title_en: 'Stardew Valley',
    title_zh: '星露谷物语',
    emoji: '🌾',
    mood_en: "You're in a productive mood",
    mood_zh: '你处于效率感模式',
    why_en:
      "Your brain wants to be occupied with meaningful tasks right now — and Stardew Valley is perfect for that. Each in-game day gives you a satisfying to-do list: water crops, check the shop, talk to a villager, go into the mines. You can feel the farm growing, the relationships deepening, and the community center getting closer to completion. It's the opposite of numbing out — it's focused, purposeful, and gently stimulating. The seasonal rhythm means there's always something to look forward to, and the gentle fantasy setting keeps the mood warm without being demanding.",
    why_zh:
      '你的大脑现在想要从有意义的任务中得到充实——而星露谷物语正是为此而生。每个游戏内的一天都给你一份令人满足的待办清单：浇水、查看商店、和村民交谈、去矿洞。你能感受到农场在成长、关系在加深、社区中心越来越接近完成。这与麻木状态相反——它是专注的、有目的的、温和地刺激神经。季节节律意味着总有值得期待的事情，而温和的奇幻环境在不苛求的情况下保持了温暖的心情。',
    tip_en: "Tonight: plant something new AND do one floor of the mines — that combination hits the productivity sweet spot.",
    tip_zh: '今晚：种一些新作物，同时去矿洞挖一层——这个组合击中了效率感的甜蜜点。',
  },
  acnh: {
    title_en: 'Animal Crossing: New Horizons',
    title_zh: '动物之森：新视野',
    emoji: '🍃',
    mood_en: "You're in a creative, peaceful mood",
    mood_zh: '你处于创意、平静的心情',
    why_en:
      "Animal Crossing: New Horizons is exactly what your mood is calling for — a gentle, beautiful space where you can create and exist without any pressure. Your island has no enemies, no fail states, no time pressure. The real-world clock means the game meets you in the actual time of day you're playing — night visits have fireflies, early mornings have bird sounds, rainy days have a different music. Tonight could be about redesigning a corner of your island, giving gifts to your villagers, or just wandering around catching bugs while listening to the ambient soundtrack. There's no wrong move.",
    why_zh:
      '动物之森：新视野正是你的心情所需——一个温和、美丽的空间，你可以在没有任何压力的情况下创造和存在。你的岛屿没有敌人、没有失败状态、没有时间压力。现实世界的时钟意味着游戏在你实际游玩的时间段与你相遇——夜晚拜访有萤火虫，清晨有鸟鸣，雨天有不同的音乐。今晚可以是重新设计岛屿的一个角落、给村民送礼物，或者只是漫步捕捉昆虫，同时聆听环境原声带。没有错误的行动。',
    tip_en: "Let the K.K. Slider music play while you terraform — it's the most peaceful state in gaming.",
    tip_zh: '在地形改造时让 K.K. Slider 的音乐播放——这是游戏中最平静的状态。',
  },
  powerwash: {
    title_en: 'PowerWash Simulator',
    title_zh: 'PowerWash Simulator',
    emoji: '💧',
    mood_en: "You need to switch your brain off completely",
    mood_zh: '你需要完全关掉大脑',
    why_en:
      "PowerWash Simulator is one of the most genuinely relaxing games ever made — and the reason is simple: it replaces your thoughts with pure, satisfying sensory feedback. You point a pressure washer at dirty surfaces and they become clean. The progress is visible in real-time. There's no fail state, no time pressure, no inventory, no resource management. Just the sound of water and the slow revelation of clean surfaces. It is widely recommended by therapists and mental health communities as one of the best games for anxiety and overwhelm. Available on Xbox Game Pass (essentially free with a subscription), PC, and PlayStation.",
    why_zh:
      'PowerWash Simulator 是有史以来最真正放松的游戏之一——原因很简单：它用纯粹的、令人满足的感官反馈取代了你的思维。你把高压水枪对准脏表面，它们变得干净。进度是实时可见的。没有失败状态、没有时间压力、没有库存、没有资源管理。只有水声和干净表面的缓慢展现。它被治疗师和心理健康社区广泛推荐为最适合焦虑和不堪重负时的游戏之一。可在 Xbox Game Pass（本质上免费订阅）、PC 和 PlayStation 上获取。',
    tip_en: "Start with the garden level — small surfaces, quick wins, and very satisfying to complete in one session.",
    tip_zh: '从花园关卡开始——表面小、快速获得成就感，在一次游戏中完成非常令人满足。',
  },
  spiritfarer: {
    title_en: 'Spiritfarer',
    title_zh: 'Spiritfarer',
    emoji: '🦊',
    mood_en: "You're ready to feel something real tonight",
    mood_zh: '你今晚准备好感受真实的东西了',
    why_en:
      "Spiritfarer is the right game for tonight — you have emotional energy available and a willingness to be moved. You play as Stella, a ferrylady for the dead, responsible for caring for spirits before they pass on. Each spirit is a fully realized character inspired by real people in the developer's life — they have favorite foods, fears, unfinished business, and the way they say goodbye is different every time. The game is warm and beautiful, with farming, cooking, crafting, and platforming woven into the emotional journey. Yes, it will likely make you cry. But it won't leave you hollow — it leaves you tender and somehow more grateful. Available on Xbox Game Pass, PS4/5, Switch, and PC.",
    why_zh:
      'Spiritfarer 是今晚的正确选择——你有可用的情感能量和愿意被触动的意愿。你扮演 Stella，死者的摆渡人，负责照顾灵魂直到他们离去。每位灵魂都是受开发者生活中真实人物启发的完全实现的角色——他们有最喜欢的食物、恐惧、未竟的心愿，以及每次不同的告别方式。游戏温暖而美丽，将农业、烹饪、制作和平台跳跃编织进情感旅程中。是的，它可能会让你哭泣。但它不会让你感到空洞——它让你感到柔软，以某种方式更加感恩。可在 Xbox Game Pass、PS4/5、Switch 和 PC 上获取。',
    tip_en: "Don't rush anyone's departure. Spend extra time on every spirit's favorite food — the goodbye is worth it.",
    tip_zh: '不要催促任何人离开。在每位灵魂最喜爱的食物上多花时间——告别是值得的。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { stardew: 0, acnh: 0, powerwash: 0, spiritfarer: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyMoodQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-game-mood`
    const shareText = isZh
      ? `根据我今天的心情，最适合玩的 Cozy 游戏是「${result.title_zh}」！${result.mood_zh}。找到你的：${url}`
      : `Based on my mood tonight, I should play ${result.title_en} — ${result.mood_en}. Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.mood_zh : result.mood_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.why_zh : result.why_en}
        </p>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {isZh ? '今晚这样开始：' : 'Tonight: '}
            </span>
            {isZh ? result.tip_zh : result.tip_en}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能，帮你把游戏里的慢生活节奏带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the cozy pacing of games like these into your real daily life.'}
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
            ? '根据心情选 Cozy 游戏：今晚该玩什么？'
            : 'What Cozy Game Should I Play Tonight?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，根据你现在的心情找到最合适的 cozy 游戏'
            : '6 questions to find the right cozy game for your exact mood right now'}
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
        {isZh ? '找到今晚的游戏' : 'Find My Game for Tonight'}
      </button>
    </div>
  )
}
