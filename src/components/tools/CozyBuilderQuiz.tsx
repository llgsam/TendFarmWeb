'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'townscaper' | 'terra-nil' | 'dorfromantik' | 'summerhouse'

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
    q_en: 'What kind of building experience do you want?',
    q_zh: '你想要什么样的建造体验？',
    options: [
      { en: 'Pure sandbox — click to place, watch it evolve, no objectives at all', zh: '纯沙盒——点击放置，看它演变，完全没有目标', type: 'townscaper' },
      { en: 'Puzzle-goal — restore a destroyed environment to natural beauty, then remove all my tools', zh: '谜题目标——将被破坏的环境恢复到自然美态，然后移除所有我的工具', type: 'terra-nil' },
      { en: 'Gentle scoring — place tiles to build a village, earn points, beat my own best', zh: '温和计分——放置瓦片建造村庄，获得积分，打破自己的最好成绩', type: 'dorfromantik' },
      { en: 'Creative decorating — arrange a house and garden exactly the way I want, purely for aesthetics', zh: '创意装饰——按照我想要的方式精确布置房子和花园，纯粹为了美观', type: 'summerhouse' },
    ],
  },
  {
    q_en: 'Which visual world sounds most appealing right now?',
    q_zh: '哪个视觉世界现在听起来最有吸引力？',
    options: [
      { en: 'Colorful coastal town with stacked houses, arched bridges, and ocean views', zh: '色彩缤纷的沿海小镇，有叠层房屋、拱形桥梁和海景', type: 'townscaper' },
      { en: 'Industrial wasteland slowly blooming back to forest, wetland, and meadow', zh: '工业荒地慢慢重新绽放为森林、湿地和草地', type: 'terra-nil' },
      { en: 'Pastoral European countryside with windmills, rivers, wheat fields, and thatched roofs', zh: '有风车、河流、麦田和茅草屋顶的田园欧洲乡村', type: 'dorfromantik' },
      { en: 'A perfect little garden with a house, terracotta pots, climbing vines, and afternoon light', zh: '一个完美的小花园，有房子、赤陶盆、攀爬藤蔓和午后光线', type: 'summerhouse' },
    ],
  },
  {
    q_en: 'How do you feel about scores, goals, or objectives in relaxing games?',
    q_zh: '你对放松游戏中的分数、目标或任务感觉如何？',
    options: [
      { en: 'No goals at all — I want zero pressure, just infinite creative freedom', zh: '完全没有目标——我想要零压力，只是无限的创意自由', type: 'townscaper' },
      { en: 'Clear puzzles — I like knowing when I have succeeded and when the level is complete', zh: '明确的谜题——我喜欢知道我什么时候成功了，什么时候关卡完成了', type: 'terra-nil' },
      { en: 'Soft scoring — I want gentle goals that give direction without feeling stressful', zh: '软性计分——我想要给出方向而不感到有压力的温和目标', type: 'dorfromantik' },
      { en: 'Pure aesthetics — my only goal is that it looks beautiful to me', zh: '纯粹美学——我唯一的目标是对我来说看起来很美', type: 'summerhouse' },
    ],
  },
  {
    q_en: 'How long do you typically want a single session to last?',
    q_zh: '你通常希望单次游戏时段持续多长时间？',
    options: [
      { en: '5-20 minutes — I want something I can open, enjoy briefly, and close feeling good', zh: '5-20 分钟——我想要一些可以打开、简短享受、然后感觉良好地关闭的东西', type: 'townscaper' },
      { en: '30-90 minutes — enough to complete a full restoration level start to finish', zh: '30-90 分钟——足以从头到尾完成一个完整的恢复关卡', type: 'terra-nil' },
      { en: '1-3 hours — I want to get into a flow state and just keep placing tiles', zh: '1-3 小时——我想进入心流状态，继续放置瓦片', type: 'dorfromantik' },
      { en: 'Whatever I feel like — I want to drop in and decorate for however long I want', zh: '随心所欲——我想随时加入并装饰任意长的时间', type: 'summerhouse' },
    ],
  },
  {
    q_en: 'What makes a building or puzzle game feel deeply satisfying to you?',
    q_zh: '什么让建造或谜题游戏对你感觉非常令人满足？',
    options: [
      { en: 'Emergence — watching the algorithm generate something beautiful I did not plan', zh: '涌现——看着算法生成我没有计划的美丽事物', type: 'townscaper' },
      { en: 'Completion — reaching the state where the land is fully restored and I can finally leave', zh: '完成——达到土地完全恢复的状态，我终于可以离开了', type: 'terra-nil' },
      { en: 'Optimization — placing the tile that perfectly connects four landscapes at once', zh: '优化——放置完美同时连接四个景观的瓦片', type: 'dorfromantik' },
      { en: 'Curation — finding exactly the right small detail that makes the whole scene click', zh: '策展——找到让整个场景恰到好处的确切小细节', type: 'summerhouse' },
    ],
  },
  {
    q_en: 'If this game could give you one feeling, what would you choose?',
    q_zh: '如果这款游戏能给你一种感觉，你会选择什么？',
    options: [
      { en: '"I made something that looks like it could be a real place — and I could live there"', zh: '"我做了一些看起来像真实地方的东西——我可以住在那里"', type: 'townscaper' },
      { en: '"The world I built is better than when I found it, and then I disappeared"', zh: '"我建造的世界比我发现时更好，然后我消失了"', type: 'terra-nil' },
      { en: '"I was in flow for two hours and the village just kept growing and growing"', zh: '"我进入了两小时的心流状态，村庄一直在增长和增长"', type: 'dorfromantik' },
      { en: '"This little garden is exactly how I imagined it — exactly that"', zh: '"这个小花园正是我想象的样子——正是那样"', type: 'summerhouse' },
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
    platform_en: string
    platform_zh: string
    why_en: string
    why_zh: string
    tip_en: string
    tip_zh: string
  }
> = {
  townscaper: {
    title_en: 'Townscaper',
    title_zh: 'Townscaper',
    emoji: '🏘️',
    tag_en: 'Click to build colorful towns — the most meditative 5 minutes in gaming',
    tag_zh: '点击建造彩色小镇——游戏中最冥想的 5 分钟',
    platform_en: 'Available on: PC (Steam), iOS, Android, Nintendo Switch — about $6',
    platform_zh: '可在以下平台获取：PC（Steam）、iOS、Android、Nintendo Switch——约 6 美元',
    why_en:
      "Townscaper is one of the most zen games ever made. You have a color palette and an endless ocean. You click on the water to place blocks. The game's algorithm automatically shapes them into colorful, architecturally charming houses, arched bridges, towers, and winding alleys — you never control the shape directly, only placement. Click on an existing block to remove it. That is literally the entire game. And it is somehow endlessly satisfying. There are no objectives, no scores, no win conditions, no time limits. You make a small colorful town, screenshot it, and share it. Or you just close it and feel calm. The mobile version is $6 and is perfect for 5-10 minute sessions. One of the most-shared screenshot games of recent years.",
    why_zh:
      'Townscaper 是有史以来最禅意的游戏之一。你有一个调色板和一片无边的海洋。你点击水面放置方块。游戏的算法自动将它们塑造成色彩鲜艳的、建筑上迷人的房屋、拱形桥梁、塔楼和蜿蜒的小巷——你从不直接控制形状，只控制位置。点击现有方块将其移除。这实际上就是整个游戏。而且它某种程度上无限令人满足。没有目标、没有分数、没有胜利条件、没有时间限制。你做一个小彩色小镇，截图并分享。或者你只是关掉它，感到平静。手机版本售价 6 美元，非常适合 5-10 分钟的游戏时段。近年来分享截图最多的游戏之一。',
    tip_en: "Use the black color for windows and accents — it grounds the palette and makes the other colors pop dramatically.",
    tip_zh: '使用黑色作为窗户和点缀——它稳定了调色板，让其他颜色更加突出。',
  },
  'terra-nil': {
    title_en: 'Terra Nil',
    title_zh: 'Terra Nil',
    emoji: '🌱',
    tag_en: 'Reverse city builder — restore nature, then leave without a trace',
    tag_zh: '反向城市建造游戏——恢复自然，然后不留痕迹地离开',
    platform_en: 'Available on: PC (Steam), iOS/Android (Netflix Games, free with subscription)',
    platform_zh: '可在以下平台获取：PC（Steam）、iOS/Android（Netflix 游戏，订阅免费）',
    why_en:
      "Terra Nil is one of the most conceptually unique games in recent years. You start with a grey, toxic industrial wasteland. Your goal is to restore it to a thriving natural ecosystem — but there is a twist: at the end, you must also recycle all of your restoration machinery and leave the land in a completely pristine state, as if you were never there. The game has puzzle-like levels where you must restore specific biomes (wetlands, forests, tundra, meadows) in the right proportions, then carefully plan the deconstruction of your own tools. It is about 5-8 hours long with multiple campaigns. The mobile version is free with Netflix Games (any Netflix subscription), which makes it one of the best-value games available. Won multiple awards for concept and execution.",
    why_zh:
      'Terra Nil 是近年来概念上最独特的游戏之一。你从灰色的、有毒的工业荒地开始。你的目标是将其恢复为蓬勃发展的自然生态系统——但有一个转折：在最后，你还必须回收所有恢复机械，让土地处于完全原始的状态，就好像你从来没有在那里一样。游戏有谜题式关卡，你必须以正确的比例恢复特定生物群落（湿地、森林、冻原、草地），然后仔细规划自己工具的拆解。时长约 5-8 小时，有多个战役。手机版本随 Netflix 游戏（任何 Netflix 订阅）免费，这使它成为最具价值的游戏之一。凭借概念和执行赢得了多个奖项。',
    tip_en: "Plan your irrigation paths before placing anything else — water placement early determines which biomes you can reach later.",
    tip_zh: '在放置其他任何东西之前规划好你的灌溉路径——早期的水位放置决定了你以后可以到达哪些生物群落。',
  },
  dorfromantik: {
    title_en: 'Dorfromantik',
    title_zh: 'Dorfromantik',
    emoji: '🌾',
    tag_en: 'Tile-placement village builder — pastoral flow state with gentle scoring',
    tag_zh: '瓦片放置村庄建造游戏——有温和计分的田园心流状态',
    platform_en: 'Available on: PC (Steam), Nintendo Switch — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch——约 15 美元',
    why_en:
      "Dorfromantik won the German Game of the Year award and has become a beloved cozy game for players who want just a little more structure than a pure sandbox. You draw hexagonal tiles and place them to build a continuous village landscape — when tile edges match (forest meets forest, river meets river, wheat meets wheat), you score points. Complete special objectives on certain tiles to unlock more tiles from your deck. The flow state it creates is uniquely satisfying: the world grows organically, and every good placement connects multiple elements at once. It has a low-pressure, no-timer scoring mode and a more structured creative mode with unlimited tiles. One of the best gateway games for people who have never played city-builders but are cozy-game fans.",
    why_zh:
      'Dorfromantik 赢得了德国年度游戏奖，成为想要比纯沙盒多一点结构的玩家所喜爱的温馨游戏。你抽取六边形瓦片并放置它们来建造连续的村庄景观——当瓦片边缘匹配时（森林遇到森林、河流遇到河流、小麦遇到小麦），你获得积分。完成某些瓦片上的特殊目标以从牌组中解锁更多瓦片。它创造的心流状态是独特令人满足的：世界有机地增长，每次好的放置都同时连接多个元素。它有一个低压力、无计时的计分模式和一个有无限瓦片的更结构化的创意模式。对于从未玩过城市建造游戏但是 cozy 游戏粉丝的人来说，它是最好的入门游戏之一。',
    tip_en: "Prioritize completing the flag objectives on each tile before your deck runs out — they are your main source of new tiles and keep the game going.",
    tip_zh: '在你的牌组耗尽之前，优先完成每张瓦片上的旗帜目标——它们是你新瓦片的主要来源，让游戏继续进行。',
  },
  summerhouse: {
    title_en: 'Summerhouse',
    title_zh: 'Summerhouse（夏日之家）',
    emoji: '🌻',
    tag_en: 'Tiny garden and house builder — from the A Short Hike developer, pure aesthetic joy',
    tag_zh: '微型花园和房屋建造——来自短途徒步开发者，纯粹的美学喜悦',
    platform_en: 'Available on: PC (Steam, itch.io) — about $7',
    platform_zh: '可在以下平台获取：PC（Steam、itch.io）——约 7 美元',
    why_en:
      "Summerhouse is by Adam Robinson-Yu, the same developer who made A Short Hike — and it has the same quality of lo-fi warmth and total absence of pressure. You are given a small plot and a selection of building pieces: walls, windows, roofs, planters, vines, furniture, fences. You assemble a house and garden however you like. There are no quests, no points, no objectives, no timer. The game renders your creation in a golden afternoon light that makes everything look like a memory. You can share your houses with others and browse the community's creations. Sessions can last 10 minutes or two hours depending on your mood. It is extremely small ($7) and extremely good. The kind of game you do not explain — you just show someone a screenshot and they immediately understand.",
    why_zh:
      'Summerhouse 由 Adam Robinson-Yu 制作，他就是制作短途徒步的同一开发者——它有相同质量的低保真温暖和完全没有压力。你得到一小块地和一些建筑组件的选择：墙壁、窗户、屋顶、花槽、藤蔓、家具、围栏。你随心所欲地组装房子和花园。没有任务、没有积分、没有目标、没有计时器。游戏在金色的午后光线中渲染你的创作，让一切都看起来像一段记忆。你可以与他人分享你的房子，浏览社区的创作。游戏时段可以持续 10 分钟或两个小时，取决于你的心情。它极其微小（7 美元）且极其出色。这种游戏不需要解释——你只需向别人展示一张截图，他们立即就会理解。',
    tip_en: "Rotate pieces before placing (right-click or Q/E) — what seems like a limitation becomes a puzzle when you start combining angles differently.",
    tip_zh: '放置之前旋转组件（右键点击或 Q/E）——当你开始以不同角度组合时，看似限制的东西变成了谜题。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    townscaper: 0,
    'terra-nil': 0,
    dorfromantik: 0,
    summerhouse: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyBuilderQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-builder-games`
    const shareText = isZh
      ? `我的放松建造游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My cozy builder game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
          <p className="text-xs text-[#4a5a4a]">{isZh ? result.platform_zh : result.platform_en}</p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.why_zh : result.why_en}
        </p>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {isZh ? '上手小贴士：' : 'Getting started: '}
            </span>
            {isZh ? result.tip_zh : result.tip_en}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把各种游戏里的专注节奏带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the focused rhythms of games into real daily life.'}
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
            ? '你应该玩哪款放松建造游戏？'
            : 'Which Cozy Builder Game Should You Play?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，在 Townscaper、Terra Nil、Dorfromantik 和 Summerhouse 中找到最适合你的冥想建造体验'
            : '6 questions to find your match across Townscaper, Terra Nil, Dorfromantik, and Summerhouse — all zero combat, all pure building joy'}
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
        {isZh ? '找到我的建造游戏' : 'Find My Builder Game'}
      </button>
    </div>
  )
}
