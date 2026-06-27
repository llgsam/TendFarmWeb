'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'it-takes-two' | 'overcooked-2' | 'plateup' | 'moving-out'

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
    q_en: 'How many people are playing?',
    q_zh: '有几个人一起玩？',
    options: [
      { en: 'Just 2 — exactly 2, that is the whole point', zh: '就 2 个人——恰好 2 人，这就是重点', type: 'it-takes-two' },
      { en: '2-4 people — flexible, depends who shows up', zh: '2-4 人——灵活，取决于来了几个人', type: 'overcooked-2' },
      { en: '2-4 people and we want to build something together over time', zh: '2-4 人，我们想随着时间一起建造些什么', type: 'plateup' },
      { en: '2-4 people and we mostly want to laugh at each other', zh: '2-4 人，我们主要想一起笑闹', type: 'moving-out' },
    ],
  },
  {
    q_en: 'What do you want out of this shared gaming session?',
    q_zh: '你想从这次共同游戏中得到什么？',
    options: [
      { en: 'An emotional story we both experience together — something we will remember and talk about', zh: '一个我们共同体验的情感故事——我们会记住并谈论的东西', type: 'it-takes-two' },
      { en: 'Chaotic fun under real pressure — moments where everything goes wrong and we laugh about it', zh: '在真实压力下的混乱乐趣——一切出错的瞬间，然后我们一起大笑', type: 'overcooked-2' },
      { en: 'A shared project we keep building across multiple sessions — satisfying steady progress', zh: '我们跨越多个游戏时段持续建造的共同项目——令人满足的稳步进展', type: 'plateup' },
      { en: 'Pure absurdist comedy — a game that makes us cry-laugh every single session', zh: '纯粹的荒诞喜剧——一款让我们每次都笑到流泪的游戏', type: 'moving-out' },
    ],
  },
  {
    q_en: 'How do you feel about games that require real communication and coordination to succeed?',
    q_zh: '你对需要真正沟通和协调才能成功的游戏感觉如何？',
    options: [
      { en: 'Yes — working together on clever puzzles is the appeal', zh: '是的——在巧妙的谜题上共同合作正是吸引力所在', type: 'it-takes-two' },
      { en: 'Yes — shouting across the kitchen about who is handling what is half the fun', zh: '是的——互相大喊谁负责什么是乐趣的一半', type: 'overcooked-2' },
      { en: 'Yes — planning our restaurant layout together is why we are playing', zh: '是的——一起规划餐厅布局正是我们玩这款游戏的原因', type: 'plateup' },
      { en: "Not really — we want to laugh at how wrong things go, not coordinate perfectly", zh: '不太需要——我们想笑看事情有多糟糕，而不是完美协调', type: 'moving-out' },
    ],
  },
  {
    q_en: 'How long do you want a single game session to be?',
    q_zh: '你想要单次游戏时段持续多长时间？',
    options: [
      { en: '2-3 hours per chapter — it is a proper story we are working through together', zh: '每章 2-3 小时——这是我们一起经历的正式故事', type: 'it-takes-two' },
      { en: '30-60 minute sessions — we want a clear beginning and end each time', zh: '30-60 分钟的时段——我们每次都想有清晰的开始和结束', type: 'overcooked-2' },
      { en: 'Open-ended — we want to drop in and continue building whenever we have time', zh: '开放式——我们想随时加入并继续建造，只要有时间', type: 'plateup' },
      { en: '20-45 minutes — quick rounds, instant laughs, easy to pick up and put down', zh: '20-45 分钟——快速轮次，即时欢笑，容易拿起放下', type: 'moving-out' },
    ],
  },
  {
    q_en: 'What would make this game session feel successful?',
    q_zh: '什么会让这次游戏时段感觉很成功？',
    options: [
      { en: "We finished a chapter, talked about what happened, and one of us might have teared up", zh: '我们完成了一章，谈论了发生的事情，其中一个人可能眼眶湿润了', type: 'it-takes-two' },
      { en: 'We barely survived the hardest level and earned a star we are proud of', zh: '我们勉强完成了最难的关卡，获得了我们引以为傲的一颗星', type: 'overcooked-2' },
      { en: 'We unlocked a new kitchen upgrade and our restaurant survived the dinner rush', zh: '我们解锁了新的厨房升级，我们的餐厅撑过了晚餐高峰期', type: 'plateup' },
      { en: 'We got the sofa through the tiny window and screamed about it for 10 minutes straight', zh: '我们把沙发从那个小窗口弄进去了，然后连续为此尖叫了 10 分钟', type: 'moving-out' },
    ],
  },
  {
    q_en: 'Which best describes the gaming dynamic you have with this person?',
    q_zh: '哪个最能描述你和这个人的游戏互动关系？',
    options: [
      { en: 'We want to feel emotionally connected — this game should bring us closer', zh: '我们想要情感上的连接——这款游戏应该让我们更亲近', type: 'it-takes-two' },
      { en: 'We are competitive in a friendly way and love the pressure of performing under time limits', zh: '我们以友好的方式很有竞争性，喜欢在时间限制下表现的压力', type: 'overcooked-2' },
      { en: 'We work well together strategically and enjoy planning and optimizing systems', zh: '我们在策略上配合默契，享受规划和优化系统', type: 'plateup' },
      { en: 'We have zero coordination but infinite ability to find everything funny', zh: '我们零协调能力但有无限的能力发现一切都很好笑', type: 'moving-out' },
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
  'it-takes-two': {
    title_en: 'It Takes Two',
    title_zh: 'It Takes Two（双人成行）',
    emoji: '💑',
    tag_en: 'The most acclaimed co-op story game ever made — for exactly two players',
    tag_zh: '有史以来最受好评的合作故事游戏——专为两位玩家设计',
    platform_en: 'Available on: PC (Steam/EA App), PlayStation 4/5, Xbox, Nintendo Switch',
    platform_zh: '可在以下平台获取：PC（Steam/EA App）、PlayStation 4/5、Xbox、Nintendo Switch',
    why_en:
      "It Takes Two won Game of the Year at every major award show in 2021, and it deserved every one. You play as a couple on the verge of divorce who are magically shrunk to the size of toys by their daughter's wish. The game sends you through a surreal, constantly-changing journey — one chapter has you playing as sentient tools in a woodshop, another has you in a snow globe, another in a honeybee hive. Every chapter introduces brand-new mechanics you have never seen before and will never see again. The game is ONLY playable by exactly two players and is designed from the ground up as a shared experience. One copy purchased on PC lets both players play through a 'friend pass' at no extra cost. At 10-12 hours, it is the perfect length to play through across a few evenings. There is nothing else quite like it.",
    why_zh:
      '双人成行在 2021 年赢得了每个主要颁奖典礼的年度最佳游戏奖，这些奖项都是实至名归的。你扮演一对濒临离婚的夫妻，被女儿的愿望神奇地缩小到玩具大小。游戏带你踏上一段超现实的、不断变化的旅程——一章让你在木工坊里扮演有意识的工具，另一章在雪球里，另一章在蜜蜂蜂巢中。每一章都引入你从未见过、也永远不会再见到的全新机制。游戏只能由恰好两名玩家玩，从头开始设计为共同体验。在 PC 上购买一份，两名玩家都可以通过"好友通行证"免费游玩全程。10-12 小时的长度是在几个晚上完成游玩的完美时长。没有其他任何游戏与它相似。',
    tip_en: 'Do not look anything up — the delight is in discovering what completely unexpected genre the game becomes next.',
    tip_zh: '不要查任何攻略——乐趣就在于发现这款游戏接下来会变成什么完全意想不到的类型。',
  },
  'overcooked-2': {
    title_en: 'Overcooked! 2',
    title_zh: 'Overcooked! 2（胡闹厨房 2）',
    emoji: '👨‍🍳',
    tag_en: 'Chaotic co-op cooking game — the best screaming-at-each-other party game',
    tag_zh: '混乱合作烹饪游戏——最好的互相大喊派对游戏',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox — often included in Game Pass/PS Plus',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox——通常包含在 Game Pass/PS Plus 中',
    why_en:
      "Overcooked! 2 is the definitive version of the Overcooked formula — and that formula is one of the most reliably fun co-op experiences ever made. The concept is simple: you and 1-3 other players run a kitchen, preparing and serving dishes against a time limit. Chop the ingredients, cook them in the right order, plate them, and send them out — while the kitchen is on fire, literally moving apart, or has recipes that involve throwing ingredients across gaps. The game provides immediate, honest feedback on exactly how well you cooperate with the people you play with. It sounds stressful and it absolutely is — but the chaos creates memories. The 'I cannot believe we got three stars on that level' feeling is unlike any other game. Supports 2-4 players locally and online.",
    why_zh:
      'Overcooked! 2 是 Overcooked 公式的最终版本——而这个公式是有史以来最可靠有趣的合作体验之一。概念很简单：你和 1-3 位其他玩家经营一个厨房，在时间限制内准备和供应菜肴。切配料、按正确顺序烹饪、摆盘、送出去——而厨房在起火，字面意义上分开移动，或者有需要跨越空隙抛掷配料的食谱。这款游戏对你和共同游玩的人之间合作得多好给出直接、诚实的反馈。这听起来很有压力，确实如此——但混乱创造了回忆。"我不敢相信我们在那个关卡得了三颗星"的感觉是其他任何游戏都无法给予的。支持 2-4 人本地和在线游玩。',
    tip_en: "Always designate one person to be the 'caller' who announces what orders are coming in — prevents the most common communication breakdown.",
    tip_zh: '始终指定一个人担任"报单者"，宣布即将到来的订单——防止最常见的沟通崩溃。',
  },
  plateup: {
    title_en: 'PlateUp!',
    title_zh: 'PlateUp!',
    emoji: '🍽️',
    tag_en: 'Co-op restaurant builder — plan your kitchen together, then survive dinner rush',
    tag_zh: '合作餐厅建造游戏——一起规划厨房，然后撑过晚餐高峰',
    platform_en: 'Available on: PC (Steam), PlayStation 4/5, Xbox, Nintendo Switch',
    platform_zh: '可在以下平台获取：PC（Steam）、PlayStation 4/5、Xbox、Nintendo Switch',
    why_en:
      "PlateUp! is for players who want more strategy and planning in their co-op cooking experience than Overcooked provides. Instead of playing pre-designed levels, you build your own restaurant from scratch — choosing the layout, placing equipment, designing the workflow — and then survive increasingly intense dinner services with the kitchen you built. The planning phase is collaborative and satisfying: where should the prep stations go? How do we route the food from oven to counter? What recipes are we even going to serve? Then the service phase puts your plan to the test under real pressure. Each day you earn money to upgrade your kitchen and expand the menu. The game has a deep automation system that lets you eventually run parts of the kitchen on autopilot, which is deeply satisfying for players who like optimization. 1-4 players, local and online.",
    why_zh:
      'PlateUp! 适合那些在合作烹饪体验中想要比 Overcooked 提供更多策略和规划的玩家。与其玩预先设计的关卡，你从头建造自己的餐厅——选择布局、放置设备、设计工作流程——然后用你建造的厨房撑过越来越紧张的晚餐服务。规划阶段是协作性的且令人满足的：备料台应该放在哪里？我们如何将食物从烤箱路由到柜台？我们甚至要供应什么菜肴？然后服务阶段在真实压力下检验你的计划。每天你赚钱升级厨房和扩展菜单。这款游戏有一个深度自动化系统，让你最终可以让厨房的部分工作自动运行，对于喜欢优化的玩家来说非常令人满足。1-4 人，本地和在线。',
    tip_en: 'Spend the first three in-game days just planning your kitchen layout before you start serving — the time invested in setup pays back immediately.',
    tip_zh: '在开始供应之前，用前三个游戏内的天数规划你的厨房布局——投入设置的时间会立即得到回报。',
  },
  'moving-out': {
    title_en: 'Moving Out',
    title_zh: 'Moving Out（搬家模拟器）',
    emoji: '🛋️',
    tag_en: 'Absurdist co-op comedy — throw furniture out windows, fail perfectly, laugh forever',
    tag_zh: '荒诞合作喜剧——把家具扔出窗外、完美失败、永远大笑',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4, Xbox — often included in Game Pass',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4、Xbox——通常包含在 Game Pass 中',
    why_en:
      "Moving Out is the answer to the question: 'What if Overcooked was about moving furniture and also completely absurd?' You play as professional movers (loosely defined) hired to clear homes of furniture. The moving van is at one end, the furniture is inside, and absolutely nothing about how you accomplish this needs to make physical sense. The game actively celebrates throwing, launching, and catapulting furniture through windows, off roofs, and out of second-floor balconies. The physics engine is deliberately chaotic. Levels include increasingly surreal settings — an active ghost house, a farm with animals to avoid, a superhero's lair. The game has accessibility options that let you reduce the time pressure or difficulty so anyone can play. It has never once been described as stressful. It has been described as making people 'unable to breathe from laughing' in every single Steam review. 2-4 players, local and online.",
    why_zh:
      '搬家模拟器是这个问题的答案："如果 Overcooked 是关于搬运家具，而且完全荒诞，会怎样？"你扮演（宽泛定义的）专业搬运工，被雇来清空房屋的家具。搬家车在一端，家具在里面，而你如何完成这件事完全不需要在物理上合理。游戏积极庆祝通过窗户、从屋顶上、从二楼阳台扔、发射和弹射家具。物理引擎故意设计得很混乱。关卡包括越来越超现实的设置——一个活跃的鬼屋、一个有动物需要回避的农场、一个超级英雄的巢穴。游戏有无障碍选项，让你减少时间压力或难度，所以任何人都可以玩。它从来没有被描述为压力大。在每一条 Steam 评测中，它都被描述为让人"笑到无法呼吸"。2-4 人，本地和在线。',
    tip_en: 'Enable the accessibility option that extends the time limit on your first playthrough — the fun comes from the chaos, not the pressure.',
    tip_zh: '在第一次游玩时启用延长时间限制的无障碍选项——乐趣来自混乱，而不是压力。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'it-takes-two': 0,
    'overcooked-2': 0,
    plateup: 0,
    'moving-out': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyCoopQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-coop-games`
    const shareText = isZh
      ? `我们的合作 cozy 游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你们的：${url}`
      : `Our co-op cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {isZh ? '一起玩小贴士：' : 'Playing together: '}
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
            ? '你们应该一起玩哪款合作 Cozy 游戏？'
            : 'Which Co-op Cozy Game Should You Play Together?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，在 It Takes Two、胡闹厨房 2、PlateUp! 和搬家模拟器中找到最适合你们组合的游戏'
            : '6 questions to find your perfect match across It Takes Two, Overcooked! 2, PlateUp!, and Moving Out'}
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
        {isZh ? '找到我们的合作游戏' : 'Find Our Co-op Game'}
      </button>
    </div>
  )
}
