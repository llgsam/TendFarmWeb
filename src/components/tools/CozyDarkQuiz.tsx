'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'dave-diver' | 'cult-lamb' | 'dredge' | 'potion-craft'

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
    q_en: "You want a cozy game that isn't fully cozy. Which edge sounds most appealing?",
    q_zh: '你想要一款不完全温馨的 cozy 游戏。哪种边缘感最吸引你？',
    options: [
      { en: 'High stakes — a satisfying management loop with real pressure and a gripping story', zh: '高风险——有真实压力和引人入胜故事的令人满足的管理循环', type: 'dave-diver' },
      { en: 'Dark whimsy — adorable aesthetic over genuinely dark themes and real combat challenge', zh: '暗黑异想——在真正黑暗主题和真实战斗挑战上覆盖可爱美学', type: 'cult-lamb' },
      { en: 'Creeping dread — peaceful surface activity with something deeply wrong underneath', zh: '渐进的恐惧——平和的表面活动，但下面有些东西深度不对劲', type: 'dredge' },
      { en: 'Moral weight — a craft I choose to use for good or ill, with consequences', zh: '道德重量——我选择用于善恶的工艺，有相应后果', type: 'potion-craft' },
    ],
  },
  {
    q_en: 'Which setting immediately draws you in?',
    q_zh: '哪个设定立刻吸引了你？',
    options: [
      { en: 'A vibrant tropical ocean and a sushi restaurant that becomes an empire', zh: '充满活力的热带海洋，以及一家成为帝国的寿司餐厅', type: 'dave-diver' },
      { en: 'A haunted forest full of heretics, and you are building a cult to challenge a death god', zh: '充满异教徒的幽灵森林，而你正在建立一个挑战死神的邪教', type: 'cult-lamb' },
      { en: 'Fog-shrouded archipelago waters where the fish are wrong and the sea has a memory', zh: '被雾气笼罩的群岛水域，那里的鱼不对劲，海洋有记忆', type: 'dredge' },
      { en: 'A medieval town where you brew potions in a cluttered alchemist shop', zh: '一个中世纪小镇，你在凌乱的炼金师商店里调制药水', type: 'potion-craft' },
    ],
  },
  {
    q_en: 'How do you feel about roguelike mechanics (die, lose progress, restart runs)?',
    q_zh: '你对 roguelike 机制（死亡、失去进度、重新开始轮次）感觉如何？',
    options: [
      { en: "No roguelike at all — I want persistent progress with no run resets", zh: '完全不要 roguelike——我想要持续进度，不需要重置轮次', type: 'dave-diver' },
      { en: "I enjoy them — dying in a dungeon and coming back stronger is satisfying", zh: '我喜欢——在地下城死亡然后变得更强回来是令人满足的', type: 'cult-lamb' },
      { en: "No roguelike — I want a slow, atmospheric game with no run resets", zh: '不要 roguelike——我想要缓慢的、有氛围的游戏，没有轮次重置', type: 'dredge' },
      { en: "No roguelike — the satisfaction is in the crafting puzzle, not survival runs", zh: '不要 roguelike——满足感在于制作谜题，而不是生存轮次', type: 'potion-craft' },
    ],
  },
  {
    q_en: 'Which of these core loops sounds most satisfying to you?',
    q_zh: '以下哪个核心循环听起来对你最令人满足？',
    options: [
      { en: 'Dive deep, catch fish, cook them into dishes, serve customers, use profits to dive deeper', zh: '深潜、抓鱼、烹饪成菜肴、服务顾客、用利润潜得更深', type: 'dave-diver' },
      { en: 'Build a cult village during the day, raid enemy dungeons at night, grow your followers', zh: '白天建造邪教村庄，夜晚突袭敌人地下城，发展追随者', type: 'cult-lamb' },
      { en: 'Sail carefully at night, fish strange waters, try not to think too hard about what you catch', zh: '夜晚小心航行、在奇异水域钓鱼、尽量不要太认真想你钓到了什么', type: 'dredge' },
      { en: 'Draw ingredient paths on a map, discover recipes through experimentation, fill customer orders', zh: '在地图上画出材料路径、通过实验发现配方、完成客户订单', type: 'potion-craft' },
    ],
  },
  {
    q_en: 'How much story depth do you need in a game to stay engaged?',
    q_zh: '你需要多少故事深度才能保持对游戏的投入？',
    options: [
      { en: "A lot — I want a game with a real narrative arc that surprises me", zh: '很多——我想要一款有真实叙事弧线、能让我惊讶的游戏', type: 'dave-diver' },
      { en: "Moderate — I want lore and bosses with personality, but gameplay is the main draw", zh: '适中——我想要有个性的传说和 Boss，但游戏玩法是主要吸引力', type: 'cult-lamb' },
      { en: "Atmospheric and implied — I want story told through environment and suggestion, not cutscenes", zh: '有氛围且暗示性——我想通过环境和暗示讲述故事，而不是过场动画', type: 'dredge' },
      { en: "Minimal narrative — the crafting puzzle itself is the experience I am here for", zh: '最少叙事——制作谜题本身就是我来的体验', type: 'potion-craft' },
    ],
  },
  {
    q_en: 'What would you most want to tell a friend about this game after your first session?',
    q_zh: '第一次游戏后，你最想告诉朋友关于这款游戏的什么？',
    options: [
      { en: '"This game has no right being this good — I stayed up until 3am and I don\'t regret it"', zh: '"这款游戏没有理由这么好——我熬到凌晨 3 点，但我不后悔"', type: 'dave-diver' },
      { en: '"It looks adorable but the game has me doing things I cannot believe I am doing"', zh: '"它看起来很可爱，但游戏让我做了一些我无法相信我在做的事情"', type: 'cult-lamb' },
      { en: '"Something about it is deeply unsettling and I cannot stop thinking about it"', zh: '"它有些深度令人不安的东西，我无法停止思考"', type: 'dredge' },
      { en: '"It is the most satisfying crafting loop I have ever played — deceptively simple"', zh: '"这是我玩过的最令人满足的制作循环——看似简单实则不然"', type: 'potion-craft' },
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
  'dave-diver': {
    title_en: 'Dave the Diver',
    title_zh: 'Dave the Diver',
    emoji: '🤿',
    tag_en: 'Ocean diving + sushi restaurant empire — the most surprising game of the decade',
    tag_zh: '海洋潜水 + 寿司餐厅帝国——十年来最令人惊喜的游戏',
    platform_en: 'Available on: PC (Steam, rated Overwhelmingly Positive), Nintendo Switch, PlayStation 4/5',
    platform_zh: '可在以下平台获取：PC（Steam，评价极度好评）、Nintendo Switch、PlayStation 4/5',
    why_en:
      "Dave the Diver has an overwhelmingly positive rating on Steam for a reason: it is one of the most unexpectedly excellent games ever made. On the surface it sounds simple — you dive in the ocean during the day to collect fish and ingredients, then run a sushi restaurant at night with those ingredients. But the game has a full action-adventure story that escalates far beyond its premise, a cast of deeply memorable characters, multiple gameplay modes that keep introducing new mechanics, and a production quality (music, art, optional mini-games) that no game of its budget should have. The 'dark' element is not horror but stakes: the restaurant has real pressure, the diving gets genuinely dangerous, and the story goes places you will not expect. One of the most-recommended games of 2023.",
    why_zh:
      'Dave the Diver 在 Steam 上获得极度好评是有原因的：它是有史以来最出乎意料的优秀游戏之一。表面上听起来很简单——白天在海洋中潜水收集鱼和食材，然后用这些食材在晚上经营寿司餐厅。但游戏有一个完整的动作冒险故事，远超其前提，有一批令人难忘的角色、不断引入新机制的多种游戏模式，以及任何同等预算游戏都不应有的制作质量（音乐、美术、可选小游戏）。"暗黑"元素不是恐怖而是风险：餐厅有真实压力，潜水变得真的危险，故事走向你意想不到的地方。2023 年最受推荐的游戏之一。',
    tip_en: 'Do not skip the story cutscenes — what looks like a simple fishing game becomes something else entirely by chapter 3.',
    tip_zh: '不要跳过故事过场动画——看起来像简单钓鱼游戏的东西在第三章时会变成完全不同的东西。',
  },
  'cult-lamb': {
    title_en: 'Cult of the Lamb',
    title_zh: '羔羊邪教',
    emoji: '🐑',
    tag_en: 'Adorable cult management + roguelike combat + surprisingly dark heart',
    tag_zh: '可爱邪教管理 + roguelike 战斗 + 出人意料的黑暗内核',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    why_en:
      "Cult of the Lamb is for you — it is one of the most distinctive games made in the past five years. You play as a lamb saved from death by a strange dark god who asks you to build a cult in his name. During the day, you manage your cult's village: build facilities, feed followers, give sermons, and handle the very dark consequences of having people who depend entirely on you. At night, you go into procedurally generated roguelike dungeons with real combat, collect resources, and fight increasingly difficult bosses to expand your cult's reach. The art is genuinely adorable — bright colors, round characters, cute sheep. The content is genuinely dark — you will make difficult choices about your followers that no truly cozy game would ask. It is one of the most aesthetically coherent games ever made: the sweetness and the darkness reinforce each other perfectly.",
    why_zh:
      '羔羊邪教正适合你——它是过去五年中最与众不同的游戏之一。你扮演一只被一位奇怪的黑暗神明从死亡中救出的羔羊，神明要求你以他的名义建立一个邪教。白天，你管理邪教的村庄：建造设施、喂养追随者、布道，以及处理完全依赖你的人所带来的非常黑暗的后果。晚上，你进入有真实战斗的程序生成 roguelike 地下城，收集资源，战斗越来越难的 Boss 以扩大邪教的影响力。美术真的很可爱——明亮的颜色、圆润的角色、可爱的羊。内容真的很黑暗——你将为追随者做出没有任何真正温馨游戏会要求的艰难选择。这是有史以来美学最一致的游戏之一：甜蜜和黑暗完美地相互强化。',
    tip_en: 'Prioritize the kitchen and sleeping quarter buildings first — fed and rested followers generate faith faster and cause fewer crises.',
    tip_zh: '优先建造厨房和睡眠区建筑——得到喂养和休息的追随者更快产生信仰，且引发更少危机。',
  },
  dredge: {
    title_en: 'Dredge',
    title_zh: 'Dredge',
    emoji: '🎣',
    tag_en: 'A fishing game about things that should not exist in the sea',
    tag_zh: '一款关于海洋中不应存在的东西的钓鱼游戏',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    why_en:
      "Dredge is one of the most atmospheric games made in recent years — and it is for you. You play as a fisherman who arrives in a new town and buys a boat to earn his living. The fishing mechanics are genuinely satisfying: you manage an inventory grid, sell fish at the docks, upgrade your boat, and unlock new fishing techniques. But the game has a second layer that slowly reveals itself. The fish are wrong. Some of what you reel up should not exist. The waters around certain islands have memories. Sailing at night raises your 'panic' level, which causes hallucinations. The game never becomes a horror game — it stays calm and atmospheric throughout — but it leaves you with a persistent, beautiful unease. Inspired by Lovecraftian cosmic horror but never gory or jump-scary. One of the best games of 2023.",
    why_zh:
      'Dredge 是近年来氛围最浓郁的游戏之一——它正适合你。你扮演一位到达新小镇并购买渔船谋生的渔夫。钓鱼机制真的令人满足：你管理库存格子、在码头卖鱼、升级你的船，以及解锁新的钓鱼技术。但游戏有第二层，随着时间缓缓揭示。鱼不对劲。你钓上来的一些东西不应该存在。某些岛屿周围的海水有记忆。夜晚航行会提高你的"恐慌"值，导致幻觉。游戏永远不会成为一款恐怖游戏——它始终保持平静和有氛围——但它给你留下了持续的、美丽的不安感。受洛夫克拉夫特式宇宙恐怖启发，但从不血腥或突然惊吓。2023 年最佳游戏之一。',
    tip_en: "Fish during the day when you start — save night sailing until you have lantern upgrades and a higher panic threshold.",
    tip_zh: '开始时白天钓鱼——等你有了灯笼升级和更高的恐慌阈值后再夜间航行。',
  },
  'potion-craft': {
    title_en: 'Potion Craft: Alchemist Simulator',
    title_zh: 'Potion Craft: 炼金师模拟器',
    emoji: '⚗️',
    tag_en: 'Medieval alchemy puzzle — brew potions, choose who deserves them',
    tag_zh: '中世纪炼金谜题——调制药水，选择谁值得得到它们',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    why_en:
      "Potion Craft is a uniquely satisfying alchemy puzzle game set in a hand-drawn medieval shop. The core mechanic is brewing: you place ingredients on a potion map and physically navigate through it using the properties of each ingredient to reach the target effect. It is part puzzle, part discovery — new ingredient combinations unlock new map routes you would not have predicted. Where the moral complexity comes in: customers arrive with requests, and you choose how to fulfill them. Someone asks for a healing potion; you can sell them a weak one, a strong one, overcharge them, or discover that their reasons for wanting it are not what they claimed. The game rewards experimentation and has a deeply relaxing rhythm, but you are always aware that your choices matter. Available on PC, Switch, and PlayStation.",
    why_zh:
      'Potion Craft 是一款在手绘中世纪商店中设置的独特令人满足的炼金谜题游戏。核心机制是酿造：你将材料放置在药水地图上，利用每种材料的特性在地图中物理导航以达到目标效果。它既是谜题又是探索——新的材料组合解锁你无法预测的新地图路线。道德复杂性来自：顾客带着请求到来，你选择如何满足他们。有人要求治疗药水；你可以卖给他们一个弱的、一个强的、对他们收取过高费用，或者发现他们想要它的原因并非他们所声称的。游戏奖励实验，有一种深度放松的节奏，但你始终意识到你的选择很重要。可在 PC、Switch 和 PlayStation 上获取。',
    tip_en: "Experiment freely with ingredient combinations early — the map has dozens of paths and discovering them is the main joy of the game.",
    tip_zh: '早期自由地实验材料组合——地图有数十条路径，发现它们是游戏的主要乐趣。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'dave-diver': 0,
    'cult-lamb': 0,
    dredge: 0,
    'potion-craft': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyDarkQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-dark-games`
    const shareText = isZh
      ? `我的暗色系 cozy 游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My dark cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {isZh ? '开始小贴士：' : 'Getting started: '}
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
            ? '你应该玩哪款暗色系 Cozy 游戏？'
            : "Which 'Dark Cozy' Game Should You Play?"}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '不是所有 cozy 游戏都真的温馨——6 个问题，在 Dave the Diver、羔羊邪教、Dredge 和 Potion Craft 中找到最适合你的'
            : "Not every cozy game is truly cozy — 6 questions to find your match across Dave the Diver, Cult of the Lamb, Dredge, and Potion Craft"}
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
        {isZh ? '找到我的暗色系游戏' : 'Find My Dark Cozy Game'}
      </button>
    </div>
  )
}
