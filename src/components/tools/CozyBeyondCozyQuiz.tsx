'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'powerwash-simulator' | 'outer-wilds' | 'tunic' | 'obra-dinn'

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
    q_en: 'What do you want your brain to do while you play?',
    q_zh: '你希望玩游戏时大脑在做什么？',
    options: [
      { en: 'Absolutely nothing — I want a game that requires zero thinking, zero decisions, pure mindless satisfaction', zh: '什么都不做——我想要一款需要零思考、零决策、纯粹无脑满足感的游戏', type: 'powerwash-simulator' },
      { en: 'Quietly wonder — notice things, form questions, let curiosity guide me through a world with no map', zh: '静静地好奇——注意事物、形成问题、让好奇心在没有地图的世界里引导我', type: 'outer-wilds' },
      { en: 'Slowly piece together — gather fragments and symbols, let understanding build over hours without explanation', zh: '慢慢拼凑——收集碎片和符号，让理解在没有解释的情况下在数小时内积累', type: 'tunic' },
      { en: 'Deduce systematically — observe, record, eliminate possibilities, build toward a definitive answer', zh: '系统性推理——观察、记录、排除可能性、向确定答案努力', type: 'obra-dinn' },
    ],
  },
  {
    q_en: 'How do you feel about games that give you no instructions or tutorials?',
    q_zh: '你如何看待没有说明或教程的游戏？',
    options: [
      { en: 'Fine for this game — what you do is obvious, instructions would only get in the way', zh: '对这款游戏没问题——要做什么很明显，说明只会碍事', type: 'powerwash-simulator' },
      { en: 'Excited — I want to discover everything through exploration with no hand-holding', zh: '兴奋——我想在没有引导的情况下通过探索发现一切', type: 'outer-wilds' },
      { en: 'Fine — I like finding my own hints in the world and figuring out what they mean', zh: '没问题——我喜欢在世界中找到自己的线索并弄清楚它们的含义', type: 'tunic' },
      { en: 'Preferred — the game IS the tutorial; figuring out the system is the puzzle', zh: '偏好——游戏本身就是教程；弄清楚系统才是谜题', type: 'obra-dinn' },
    ],
  },
  {
    q_en: 'What kind of ending do you want from a game?',
    q_zh: '你希望从游戏中得到什么样的结局？',
    options: [
      { en: 'Completion — everything clean, organized, the job done, that satisfying "before and after" comparison', zh: '完成——一切干净、整洁、工作完成，令人满足的"前后"对比', type: 'powerwash-simulator' },
      { en: 'A revelation that changes how I see everything that came before — I want the ending to reframe the whole game', zh: '一个改变我看待之前一切事物的启示——我希望结局重新定义整个游戏', type: 'outer-wilds' },
      { en: 'Understanding — I want to feel I finally saw what the world was trying to show me from the beginning', zh: '理解——我希望感觉我终于看到了世界从一开始就试图向我展示的东西', type: 'tunic' },
      { en: 'Correctness — I want all the blanks filled in, every face identified, every cause of death confirmed', zh: '正确性——我希望所有空白都被填满、每张面孔都被识别、每个死因都被确认', type: 'obra-dinn' },
    ],
  },
  {
    q_en: 'Which setting sounds most interesting?',
    q_zh: '哪种设定听起来最有趣？',
    options: [
      { en: 'Anywhere that is dirty and needs cleaning — a celebrity mansion, a fantasy treehouse, a garden gnome village', zh: '任何脏乱需要清洁的地方——名人豪宅、奇幻树屋、花园地精村庄', type: 'powerwash-simulator' },
      { en: 'A dying solar system full of alien ruins, strange physics anomalies, and a mystery millions of years old', zh: '一个充满外星废墟、奇异物理异常和百万年古老谜题的垂死太阳系', type: 'outer-wilds' },
      { en: 'An isometric world of ruins and mystery where a small fox tries to understand a forgotten civilization', zh: '一个等距视角的废墟和谜题世界，一只小狐狸试图理解一个被遗忘的文明', type: 'tunic' },
      { en: 'An 1800s sailing ship wrecked with sixty crew aboard, and only your memory and a ledger to reconstruct what happened', zh: '一艘 19 世纪帆船失事，60 名船员遇难，只有你的记忆和账本来重建发生了什么', type: 'obra-dinn' },
    ],
  },
  {
    q_en: 'How much challenge or frustration are you comfortable with?',
    q_zh: '你对多少挑战或挫折感到舒适？',
    options: [
      { en: 'Zero — I specifically want no challenge, no way to fail, just the act of doing something with my hands', zh: '零——我特别想要没有挑战、没有失败的方式，只是用手做某事的行为', type: 'powerwash-simulator' },
      { en: 'Moderate — I am okay with searching, going in circles, and sudden death as long as I keep learning', zh: '适中——我可以接受搜索、兜圈子和猝死，只要我不断学习', type: 'outer-wilds' },
      { en: 'Moderate — I enjoy difficult bosses and cryptic puzzles when I know fair solutions exist', zh: '适中——当我知道公平解决方案存在时，我喜欢困难的 Boss 和神秘谜题', type: 'tunic' },
      { en: 'High — I do not mind being stuck for hours if the eventual solution is genuinely clever', zh: '高——如果最终解决方案真正聪明，我不介意卡关数小时', type: 'obra-dinn' },
    ],
  },
  {
    q_en: 'Which of these feelings most describes why you play games?',
    q_zh: '以下哪种感受最能描述你玩游戏的原因？',
    options: [
      { en: 'The satisfaction of making order from chaos — I love seeing progress in a before-and-after way', zh: '从混乱中创造秩序的满足感——我喜欢以前后对比的方式看到进展', type: 'powerwash-simulator' },
      { en: 'The feeling of being small in a big universe — discovery, wonder, and understanding something vast', zh: '在大宇宙中渺小的感觉——发现、惊奇和理解某种广阔的东西', type: 'outer-wilds' },
      { en: 'The warmth of understanding — gradually figuring out a world that at first seemed completely opaque', zh: '理解的温暖——逐渐弄清楚一个起初看似完全不透明的世界', type: 'tunic' },
      { en: 'The pride of deduction — earning the solution through careful logic, not luck or hint systems', zh: '推理的自豪感——通过仔细的逻辑而非运气或提示系统赢得解决方案', type: 'obra-dinn' },
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
  'powerwash-simulator': {
    title_en: 'PowerWash Simulator',
    title_zh: '高压清洗模拟器',
    emoji: '🚿',
    tag_en: 'Clean everything with a pressure washer — no fail states, no time limits, pure satisfying before-and-after progress',
    tag_zh: '用高压清洗机清洗一切——没有失败状态、没有时间限制、纯粹令人满足的前后进展',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox (Game Pass) — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox（Game Pass）——约 25 美元',
    why_en:
      "PowerWash Simulator (2022) is not a joke — it is one of the most genuinely relaxing games ever made and one of the most beloved stress-relief games among cozy game players. You are given a pressure washer and a job: clean a dirty object or environment. The satisfaction is entirely in the completion: watching a filthy garden shed become spotless, seeing a grimy playground returned to bright colors, cleaning a fantasy treehouse or a celebrity's mansion or a gnome village as part of the main campaign. There are no enemies, no fail states, no time pressure of any kind. The dirt yields to water in a tactile, satisfying way that feels almost meditative. Played at full volume with good speakers, the hiss and spray becomes genuinely calming. With a free DLC expansion that includes cleaning an alien landscape from a well-known space game, and additional themed content packs, there is a surprising amount of variety. Available on Xbox Game Pass. Won multiple awards for Most Relaxing Game in 2022-2023. Has a multiplayer mode for cleaning together.",
    why_zh:
      '高压清洗模拟器（2022 年）不是开玩笑——它是有史以来最真正令人放松的游戏之一，也是 cozy 游戏玩家中最受喜爱的减压游戏之一。你被给予一个高压清洗机和一项工作：清洁脏乱的物品或环境。满足感完全在于完成：看着一个肮脏的花园棚变得一尘不染，看着一个污秽的游乐场恢复明亮的颜色，在主要活动中清洁奇幻树屋、名人豪宅或地精村庄。没有敌人、没有失败状态、没有任何形式的时间压力。污垢以触觉上令人满足的方式屈服于水，几乎感觉像冥想。在好音箱全音量播放时，嘶嘶声和喷水声变得真正令人平静。有一个免费 DLC 扩展，包括清洁一个知名太空游戏中的外星景观，以及额外的主题内容包，有令人惊讶的多样性。可在 Xbox Game Pass 上获取。2022-2023 年赢得多个最放松游戏奖项。有多人游戏模式可以一起清洁。',
    tip_en: "Change your nozzle early — the wider fan nozzle covers large flat surfaces much faster, while the narrow jet is best for stubborn grime in corners. Most players default to one nozzle for too long and then realize switching is the key to efficient cleaning.",
    tip_zh: '早点更换喷嘴——更宽的扇形喷嘴覆盖大平面快得多，而窄喷射最适合角落里顽固的污垢。大多数玩家使用一个喷嘴太久，然后意识到切换是高效清洁的关键。',
  },
  'outer-wilds': {
    title_en: 'Outer Wilds',
    title_zh: '星外拓荒',
    emoji: '🪐',
    tag_en: 'A mystery set in a handcrafted solar system — explore, discover, and unravel why everything ends every 22 minutes',
    tag_zh: '一个设置在手工制作太阳系中的谜题——探索、发现，并解开为什么一切每 22 分钟结束的原因',
    platform_en: 'Available on: PC (Steam, Epic), Nintendo Switch, PlayStation 4/5, Xbox (Game Pass) — about $25',
    platform_zh: '可在以下平台获取：PC（Steam、Epic）、Nintendo Switch、PlayStation 4/5、Xbox（Game Pass）——约 25 美元',
    why_en:
      "Outer Wilds (2019) is one of the most acclaimed games ever made — it regularly appears at the top of 'best games of all time' lists and is widely considered one of the few games that is genuinely irreplaceable. You play as a young alien explorer in a small solar system where every planet has secrets, physics simulations running in real time (sand falls from one planet's surface into the core of another), and a central mystery tying everything together. The twist: every 22 minutes, the solar system ends and you wake up at the start of the loop with only your knowledge retained. You are not trying to prevent the loop — you are trying to understand it. The game does not have a map or a quest log. Everything you need to know is written on wooden boards scattered across alien ruins. It is entirely discovery-driven: no combat required, no reflex-based challenge, just pure exploration and curiosity. Available on Xbox Game Pass. WARNING: Outer Wilds is specifically a game that must be experienced without spoilers. The discoveries are its content; knowing what you will find removes the experience entirely.",
    why_zh:
      '星外拓荒（2019 年）是有史以来最受好评的游戏之一——它定期出现在"有史以来最佳游戏"榜单的顶部，被广泛认为是少数真正不可替代的游戏之一。你扮演一个小太阳系中的年轻外星探险家，每个星球都有秘密、实时运行的物理模拟（沙子从一个星球的表面落入另一个星球的核心），以及将一切联系在一起的核心谜题。转折点：每 22 分钟，太阳系结束，你醒来时循环重新开始，只保留你的知识。你不是在试图阻止循环——你是在试图理解它。游戏没有地图或任务日志。你需要知道的一切都写在散布在外星废墟中的木板上。它完全由发现驱动：不需要战斗，没有基于反应的挑战，只有纯粹的探索和好奇心。可在 Xbox Game Pass 上获取。警告：星外拓荒是一款必须在没有剧透的情况下体验的游戏。发现就是它的内容；知道你将发现什么会完全消除体验。',
    tip_en: "Never look up a guide, a hint, or even ask someone what to do next. If you are stuck, put the game down for a day and come back — your brain will keep working on it. The breakthrough moments in Outer Wilds are among the most satisfying in any medium. Spoilers are permanent damage.",
    tip_zh: '永远不要查攻略、提示，甚至不要问别人下一步该做什么。如果你卡住了，把游戏放下一天然后回来——你的大脑会继续思考它。星外拓荒中的突破时刻是任何媒介中最令人满足的体验之一。剧透是永久性损害。',
  },
  tunic: {
    title_en: 'Tunic',
    title_zh: 'Tunic',
    emoji: '🦊',
    tag_en: 'A Zelda-like adventure about a small fox in a mysterious ruined world — you find pages of the game\'s own instruction manual as you explore',
    tag_zh: '一款关于神秘废墟世界中一只小狐狸的类塞尔达冒险——你在探索时找到游戏自己的说明手册页面',
    platform_en: 'Available on: PC (Steam, Epic), Nintendo Switch, PlayStation 4/5, Xbox (Game Pass) — about $30',
    platform_zh: '可在以下平台获取：PC（Steam、Epic）、Nintendo Switch、PlayStation 4/5、Xbox（Game Pass）——约 30 美元',
    why_en:
      "Tunic (2022) is one of the most clever and heartwarming games made in the past decade. You play as a small fox in a ruined world, armed at first with only a stick, and you gradually discover that the game's instruction manual — the kind that used to come in the box with 1990s games — is scattered throughout the world as collectible pages. The manual is written in a fictional language you cannot read, with diagrams you can interpret. Over the course of 15-20 hours, the manual and the world itself teach you the game's mechanics, its secrets, and eventually its hidden system that reveals a deeper layer beneath the surface game. It feels like being a child discovering a secret in a cartridge that no one else had found. The music is gorgeous (Brian Eno-influenced generative ambient), the combat is difficult but fair (think Dark Souls for a tiny fox), and the accessibility options are excellent — you can turn off death penalty or even make combat trivially easy without affecting the puzzle content. Developed by Andrew Shouldice over six years. Won multiple awards including IGF Nuovo Award and BAFTA nomination.",
    why_zh:
      'Tunic（2022 年）是过去十年制作的最聪明、最温馨的游戏之一。你扮演废墟世界中的一只小狐狸，起初只有一根棍子，你逐渐发现游戏的说明手册——那种过去 1990 年代游戏盒子里附带的那种——作为可收集页面散布在世界各地。手册是用你无法阅读的虚构语言写成的，附有你可以解读的图表。在 15-20 小时的过程中，手册和世界本身教你游戏的机制、秘密，最终是其隐藏系统，揭示了表面游戏下面更深的层次。感觉就像一个孩子在卡带中发现了别人从未找到的秘密。音乐非常优美（受 Brian Eno 影响的生成性环境音乐），战斗困难但公平（想象一下针对小狐狸的黑暗之魂），无障碍选项很好——你可以关闭死亡惩罚，甚至让战斗微不足道，而不影响谜题内容。由 Andrew Shouldice 历时六年开发。赢得多个奖项，包括 IGF Nuovo 奖和 BAFTA 提名。',
    tip_en: "Collect every manual page you find — even when you cannot read them, the diagrams contain crucial information about mechanics the game will never explain otherwise. And turn on No Fail Mode if the combat frustrates you; the puzzle content of Tunic is entirely separate from the combat difficulty.",
    tip_zh: '收集你找到的每一张手册页面——即使你无法阅读它们，图表也包含关于机制的重要信息，否则游戏永远不会解释。如果战斗让你沮丧，开启无失败模式；Tunic 的谜题内容与战斗难度完全分离。',
  },
  'obra-dinn': {
    title_en: 'Return of the Obra Dinn',
    title_zh: '奥伯拉丁号的回归',
    emoji: '⚓',
    tag_en: 'A 1-bit deduction mystery — a ship returns to port with no crew and only your memory-vision device to reconstruct what happened to 60 people',
    tag_zh: '一款 1-bit 演绎谜题——一艘船只空船返港，只有你的记忆幻视装置来重建 60 个人身上发生的事情',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PlayStation 4/5, Xbox — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PlayStation 4/5、Xbox——约 20 美元',
    why_en:
      "Return of the Obra Dinn (2018) is one of the most beloved and unique puzzle games ever created. Created entirely by one person (Lucas Pope, developer of Papers Please) over four years, it puts you aboard a ghost ship that returned to port in 1807 with no crew alive and no explanation. You have a magic pocket watch that, when placed near human remains, shows you a frozen tableau of the moment of that person's death, plus the audio leading up to it. Your task: identify every one of the sixty crew members and determine each person's fate — did they die, did they abandon ship, and if they died, who or what caused it? The 1-bit dithered art style (black, white, and grey only) is striking and iconic. The deductive satisfaction is unlike anything else: the game gives you enough information to solve every case through logic and observation alone, with no guessing required. It takes 8-15 hours for a first playthrough. Won BAFTA Best Game and dozens of other awards in 2018. Available on Nintendo Switch, PC, and consoles. One of the most original games of the past decade, period.",
    why_zh:
      '奥伯拉丁号的回归（2018 年）是有史以来最受喜爱和最独特的解谜游戏之一。由一个人（Papers Please 开发者 Lucas Pope）历时四年独自完成，它将你带上了一艘幽灵船，该船于 1807 年无生还船员地返港，毫无解释。你有一个魔法怀表，当放置在人类遗骸附近时，会向你显示该人死亡时刻的冻结场景，以及之前的音频。你的任务：识别六十名船员中的每一个，并确定每个人的命运——他们是死了、弃船逃跑了，如果他们死了，是谁或什么造成的？1-bit 抖动艺术风格（仅黑白灰）引人注目且标志性。演绎满足感与其他任何东西都不同：游戏给你足够的信息，仅通过逻辑和观察就能解决每个案例，不需要猜测。第一次通关需要 8-15 小时。2018 年赢得 BAFTA 最佳游戏和数十个其他奖项。Nintendo Switch、PC 和主机均可。无疑是过去十年最具原创性的游戏之一。',
    tip_en: "You can guess three fates at a time and the game confirms which, if any, are correct — use this liberally. When you find two crew members whose deaths you have witnessed together, deduce a third from context clues: what were they wearing, what language did they speak, what did they look like? Nationality and role narrow identities down fast.",
    tip_zh: '你可以一次猜测三个命运，游戏会确认哪些（如果有的话）是正确的——大量使用这个。当你找到两个你一起目击其死亡的船员时，从上下文线索推断第三个：他们穿什么衣服、说什么语言、看起来什么样？国籍和角色能快速缩小身份范围。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'powerwash-simulator': 0,
    'outer-wilds': 0,
    tunic: 0,
    'obra-dinn': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyBeyondCozyQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-beyond-cozy`
    const shareText = isZh
      ? `作为 Cozy 玩家，我的下一步独立游戏是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `As a cozy gamer, my next indie game is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              ? 'TendFarm 正在研发农场节律追踪功能——把游戏里的那种沉浸心流带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the focused flow state of games into real daily life.'}
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
            ? 'Cozy 玩家的下一步：哪款深度独立游戏最适合你？'
            : 'Beyond Cozy: Which Beloved Indie Game Should You Try Next?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，为 Cozy 游戏玩家找到完美的下一步——高压清洗模拟器、星外拓荒、Tunic 还是奥伯拉丁号的回归'
            : '6 questions to find your next game as a cozy gamer who wants to branch out — PowerWash Simulator, Outer Wilds, Tunic, or Return of the Obra Dinn.'}
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
        {isZh ? '找到我的下一步' : 'Find My Next Game'}
      </button>
    </div>
  )
}
