'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'hades' | 'vampire-survivors' | 'slay-the-spire' | 'balatro'

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
    q_en: 'You die and lose most of your progress. Which response sounds most like you?',
    q_zh: '你死了，失去了大部分进度。哪个反应最像你？',
    options: [
      { en: '"Okay but I got more story — and now I know what to do differently next time"', zh: '"好吧，但我获得了更多故事——现在我知道下次该怎么做不同的事了"', type: 'hades' },
      { en: '"That run lasted 20 minutes and was completely satisfying — let me start the next one"', zh: '"那局持续了 20 分钟且非常令人满足——让我开始下一局"', type: 'vampire-survivors' },
      { en: '"I saw exactly where my deck strategy failed — the next build I want to try is already forming"', zh: '"我清楚地看到我的卡组策略在哪里失败了——我想尝试的下一个构建已经在形成了"', type: 'slay-the-spire' },
      { en: '"That hand was almost there. I want to try one more configuration before I stop"', zh: '"那手牌差一点就成了。在停下来之前我想再尝试一种配置"', type: 'balatro' },
    ],
  },
  {
    q_en: 'How important is story and characters to your enjoyment of a game?',
    q_zh: '故事和角色对你的游戏享受有多重要？',
    options: [
      { en: 'Essential — I want characters I grow attached to and a narrative that unfolds over runs', zh: '至关重要——我想要让我产生依附感的角色和跨越多次运行展开的叙事', type: 'hades' },
      { en: 'Unimportant — I want pure gameplay loop with no story overhead at all', zh: '不重要——我想要纯粹的游戏循环，完全没有故事负担', type: 'vampire-survivors' },
      { en: 'Light — some character flavor and lore is nice but gameplay is why I am here', zh: '轻度——一些角色风味和传说很好，但游戏玩法才是我来这里的原因', type: 'slay-the-spire' },
      { en: 'None needed — the cards and combinations are their own reward', zh: '不需要——牌和组合本身就是奖励', type: 'balatro' },
    ],
  },
  {
    q_en: 'What kind of strategy layer do you enjoy?',
    q_zh: '你喜欢什么样的策略层次？',
    options: [
      { en: 'Action-based — fast combat decisions, dodging, reading enemy patterns in real time', zh: '基于行动——快速战斗决策、闪避、实时读取敌人模式', type: 'hades' },
      { en: 'Minimal — the fun is watching the numbers go up, not making complex decisions', zh: '最少——乐趣在于看数字上涨，而不是做复杂决策', type: 'vampire-survivors' },
      { en: 'Deep deckbuilding — every card pick matters, synergies compound, runs diverge dramatically', zh: '深度卡组构建——每次选牌都很重要，协同效应叠加，每局截然不同', type: 'slay-the-spire' },
      { en: 'Combinatorial puzzles — discovering how scoring multipliers stack is the entire game for me', zh: '组合谜题——发现计分乘数如何叠加对我来说就是整个游戏', type: 'balatro' },
    ],
  },
  {
    q_en: 'How long do you want a typical single run to last?',
    q_zh: '你希望典型的单次运行持续多长时间？',
    options: [
      { en: '20-40 minutes — long enough to feel an arc, short enough to run it again tonight', zh: '20-40 分钟——足够长以感受到弧线，足够短以今晚再来一次', type: 'hades' },
      { en: '15-30 minutes — I want a complete experience that I can chain multiple times in one sitting', zh: '15-30 分钟——我想要可以在一次游戏中多次连续进行的完整体验', type: 'vampire-survivors' },
      { en: '45-90 minutes — enough time for a full dungeon run where strategy decisions compound', zh: '45-90 分钟——足以进行完整地下城运行，让策略决策积累的时间', type: 'slay-the-spire' },
      { en: '20-60 minutes — depends on how deep the current run goes and how good the hand gets', zh: '20-60 分钟——取决于当前运行进行得多深以及手牌变得多好', type: 'balatro' },
    ],
  },
  {
    q_en: 'What makes you want to start one more run after the previous one ends?',
    q_zh: '什么让你在上一局结束后想再开一局？',
    options: [
      { en: 'I got new dialogue or story — and I want to see what Zagreus says next', zh: '我获得了新的对话或故事——我想看看 Zagreus 接下来说什么', type: 'hades' },
      { en: 'The last run unlocked a new character or weapon and I want to try it immediately', zh: '上一局解锁了一个新角色或武器，我想立即尝试', type: 'vampire-survivors' },
      { en: 'I saw a card synergy that almost worked and I want to build around it properly', zh: '我看到一个几乎奏效的卡牌协同效应，我想要围绕它正确构建', type: 'slay-the-spire' },
      { en: 'That joker combination was so close to breaking the game — I want to recreate it better', zh: '那个小丑组合离攻破游戏如此之近——我想要更好地重现它', type: 'balatro' },
    ],
  },
  {
    q_en: 'Which of these describes your ideal gaming session best?',
    q_zh: '以下哪个最能描述你的理想游戏时段？',
    options: [
      { en: '"I escaped — it took 20 tries and I finally understand why this game is so acclaimed"', zh: '"我逃脱了——花了 20 次尝试，我终于明白为什么这款游戏如此受到好评"', type: 'hades' },
      { en: '"I watched 500 enemies die in 25 minutes and my brain is pleasantly empty"', zh: '"我看着 500 个敌人在 25 分钟内死亡，我的大脑愉快地空了"', type: 'vampire-survivors' },
      { en: '"I finally assembled the Catalyst + Corruption build and it was as broken as the internet said"', zh: '"我终于组建了催化剂 + 堕落构建，它和网上说的一样强大"', type: 'slay-the-spire' },
      { en: '"I had a x800 multiplier hand and I have been thinking about it all day"', zh: '"我有一手 x800 乘数，我整天都在想着它"', type: 'balatro' },
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
  hades: {
    title_en: 'Hades',
    title_zh: '黑帝斯',
    emoji: '⚔️',
    tag_en: 'The story roguelike that fixed every complaint about roguelikes — perfect for cozy-game fans',
    tag_zh: '解决了所有 roguelike 投诉的故事 roguelike——完美适合 cozy 游戏粉丝',
    platform_en: 'Available on: PC (Steam/Epic), Nintendo Switch, PlayStation 4/5, Xbox — about $25',
    platform_zh: '可在以下平台获取：PC（Steam/Epic）、Nintendo Switch、PlayStation 4/5、Xbox——约 25 美元',
    why_en:
      "Hades won Game of the Year at multiple award shows in 2020 and is widely credited with popularizing narrative roguelikes — games where dying is not just a mechanical reset but a story beat. You play as Zagreus, son of Hades, trying to escape the Underworld. Every time you die, you return to start and have new conversations with the gods, your father, and the permanent cast of characters. The story only advances when you die. The combat is fast and satisfying action, and you collect boons from the gods of Olympus each run. At around 50-100 hours to see all the story, it is one of the deepest experiences of the last decade. Supergiant Games' masterpiece. Hades II (sequel) is in early access as of 2024.",
    why_zh:
      '黑帝斯在 2020 年的多个颁奖典礼上赢得年度最佳游戏，并被广泛认为推广了叙事 roguelike——死亡不仅仅是机械重置而是故事节拍的游戏。你扮演冥王哈迪斯的儿子扎格列乌斯，试图逃出冥界。每次你死亡，你返回起点，与神明、你的父亲和固定角色有新的对话。故事只在你死亡时推进。战斗是快速且令人满足的动作，每次运行你从奥林匹斯神明那里收集祝福。大约需要 50-100 小时才能看完所有故事，这是过去十年最深度的体验之一。Supergiant Games 的杰作。黑帝斯 II（续集）截至 2024 年处于抢先体验阶段。',
    tip_en: "Focus on one weapon and one or two consistent boon gods per run — deep synergy beats spread-out variety every time.",
    tip_zh: '每次运行专注于一种武器和一两个稳定的神明祝福——深度协同效应每次都胜过广撒网的多样性。',
  },
  'vampire-survivors': {
    title_en: 'Vampire Survivors',
    title_zh: '吸血鬼幸存者',
    emoji: '🧛',
    tag_en: 'The most addictive $3 game ever made — pure number-go-up bullet heaven',
    tag_zh: '有史以来最上瘾的 3 美元游戏——纯粹的数字上涨弹幕天堂',
    platform_en: 'Available on: PC (Steam), iOS, Android, Nintendo Switch, Xbox (Game Pass) — about $3-5',
    platform_zh: '可在以下平台获取：PC（Steam）、iOS、Android、Nintendo Switch、Xbox（Game Pass）——约 3-5 美元',
    why_en:
      "Vampire Survivors is one of the most remarkable success stories in gaming history. A solo developer released it for $3, it sold millions of copies, and it spawned an entire genre. You move a character around an arena; weapons fire automatically. Hundreds of enemies swarm you. You pick upgrades at level-up. The goal is to survive 30 minutes. The game requires almost no real-time decision-making — you choose upgrades, then watch your character become progressively more powerful until the screen is a sea of effects and explosions. It is deeply, irrationally satisfying in the way that watching numbers increase always is. New characters, stages, and unlocks keep the loop fresh. Available on Xbox Game Pass. The mobile version is free with ads or a one-time $3 purchase to remove them.",
    why_zh:
      '吸血鬼幸存者是游戏史上最非凡的成功案例之一。一个独立开发者以 3 美元发布了它，销售了数百万份，并催生了整个游戏类型。你在竞技场中移动角色；武器自动射击。数百个敌人向你涌来。你在升级时选择强化项。目标是存活 30 分钟。这款游戏几乎不需要实时决策——你选择升级，然后看着你的角色变得越来越强大，直到屏幕成为效果和爆炸的海洋。它以数字增加所特有的方式带来深度的、非理性的满足感。新角色、新关卡和新解锁项持续保持循环的新鲜感。可在 Xbox Game Pass 上获取。手机版本有广告免费，或一次性 3 美元购买去除广告。',
    tip_en: "Aim for weapon evolutions by pairing each base weapon with its matching passive item at max level — the evolved weapons are dramatically more powerful.",
    tip_zh: '通过将每种基础武器与其匹配的满级被动物品配对来追求武器进化——进化后的武器强力得多。',
  },
  'slay-the-spire': {
    title_en: 'Slay the Spire',
    title_zh: '杀戮尖塔',
    emoji: '🃏',
    tag_en: 'The deckbuilder that defined a genre — elegant, deep, infinitely replayable',
    tag_zh: '定义了一个类型的卡组构建游戏——优雅、深度、无限可重玩',
    platform_en: 'Available on: PC (Steam), iOS, Android, Nintendo Switch, PlayStation 4 — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）、iOS、Android、Nintendo Switch、PlayStation 4——约 25 美元',
    why_en:
      "Slay the Spire is the game that established deckbuilding roguelikes as a genre, and it remains the standard by which all others are measured. You choose one of four characters, each with a unique card set, and climb a branching dungeon. At each node you fight enemies using cards, find relics, visit shops, and deal with events. The key is your deck: every card you add or remove shapes what future turns look like. Synergies compound in ways that feel like solving a puzzle — the Defect's orb-stacking strategies, the Silent's poison chains, the Ironclad's strength scaling. Each run takes 45-90 minutes. Four characters and an Ascension difficulty system give hundreds of hours of content. One of the most influential games made in the past decade.",
    why_zh:
      '杀戮尖塔是建立卡组构建 roguelike 作为一个类型的游戏，它仍然是所有其他游戏被衡量的标准。你选择四个角色之一，每个角色有独特的牌组，攀登一个分支地牢。在每个节点你使用卡牌战斗敌人、找到遗物、访问商店，以及处理事件。关键是你的牌组：你添加或移除的每张牌都塑造了未来回合的样貌。协同效应以感觉像解谜的方式叠加——电子人的球体叠加策略、沉默者的毒素链、铁甲的力量缩放。每局大约需要 45-90 分钟。四个角色和一个升天难度系统提供数百小时的内容。过去十年中最具影响力的游戏之一。',
    tip_en: "Draft a consistent strategy around one or two synergies instead of picking the strongest individual card each time — the run that wins has focus.",
    tip_zh: '围绕一两个协同效应制定一致的策略，而不是每次都选最强的单张牌——获胜的那局是有焦点的。',
  },
  balatro: {
    title_en: 'Balatro',
    title_zh: 'Balatro',
    emoji: '🃏',
    tag_en: 'Poker deckbuilder — Game of the Year 2024, the most "one more run" game ever made',
    tag_zh: '扑克卡组构建——2024 年度最佳游戏，有史以来最让人"再来一局"的游戏',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox, iOS, Android — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox、iOS、Android——约 15 美元',
    why_en:
      "Balatro won Game of the Year at multiple major ceremonies in 2024 and became one of the most-discussed games of the year. The premise sounds simple: it is poker, but you can modify the rules. You buy Joker cards that add scoring multipliers to your hands. You can add or remove cards from the deck, change what hands exist, apply upgrades to specific cards. The goal is to score enough points across 8 rounds of poker hands to beat a boss. What makes Balatro special is the discovery: finding a combination of Jokers that turns a modest pair into a x800 multiplier is one of the most dopamine-delivering moments in gaming. It starts simple and becomes unfathomably deep. The runs are short enough (20-60 minutes) to make 'one more' always feel reasonable. A masterpiece of game design from solo developer LocalThunk.",
    why_zh:
      'Balatro 在 2024 年的多个主要颁奖典礼上赢得年度最佳游戏，成为年度最受讨论的游戏之一。前提听起来很简单：这是扑克，但你可以修改规则。你购买为你的手牌增加计分乘数的小丑牌。你可以添加或移除牌组中的牌，改变存在哪些牌型，为特定牌应用升级。目标是在 8 轮扑克手牌中积累足够的分数来击败一个 Boss。使 Balatro 特别的是发现：找到一组将普通的一对变成 x800 乘数的小丑牌组合是游戏中最令人多巴胺飙升的时刻之一。它从简单开始变得深不可测。每局足够短（20-60 分钟），使"再来一局"总是感觉合理。独立开发者 LocalThunk 的游戏设计杰作。',
    tip_en: "Prioritize Jokers that apply to multiple hand types over Jokers that boost a single specific hand — flexibility compounds across the full 8-round run.",
    tip_zh: '优先选择适用于多种牌型的小丑牌，而不是强化单一特定牌型的小丑牌——灵活性在整个 8 轮运行中会积累。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    hades: 0,
    'vampire-survivors': 0,
    'slay-the-spire': 0,
    balatro: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyRoguelikeQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-roguelike-quiz`
    const shareText = isZh
      ? `我的入门 Roguelike 推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My starter roguelike match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
            ? '你应该从哪款 Roguelike 游戏入门？'
            : 'Which Roguelike Should You Start With?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，在黑帝斯、吸血鬼幸存者、杀戮尖塔和 Balatro 中找到最适合你的轻量 Roguelike 体验'
            : '6 questions to find your match across Hades, Vampire Survivors, Slay the Spire, and Balatro — all beginner-friendly, all endlessly replayable'}
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
        {isZh ? '找到我的 Roguelike' : 'Find My Roguelike'}
      </button>
    </div>
  )
}
