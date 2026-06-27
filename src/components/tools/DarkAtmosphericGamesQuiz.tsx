'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'ln2' | 'ddlc' | 'oxen' | 'sig'

function ShareButton({ text, isZh }: { text: string; isZh: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <button
        onClick={handleCopy}
        className="rounded-lg bg-[#2d3d2d] px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:bg-[#3d4d3d]"
      >
        {copied ? (isZh ? '已复制！' : 'Copied!') : (isZh ? '复制结果' : 'Copy Result')}
      </button>
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-[#1a8cd8] px-4 py-2 text-sm text-white transition-colors hover:bg-[#1a7bc0]"
      >
        {isZh ? '分享到 X' : 'Share on X'}
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
    q_en: 'What kind of dark game sounds most appealing to you?',
    q_zh: '哪种黑暗游戏风格最吸引你？',
    options: [
      { en: 'A wordless atmospheric platformer where the world itself feels like a predator', zh: '无台词的大气横版冒险，整个世界都像一头猎食者', type: 'ln2' },
      { en: 'A cute visual novel that slowly reveals something deeply, wrongly disturbing', zh: '表面可爱的视觉小说，却在不知不觉中揭开令人不安的真相', type: 'ddlc' },
      { en: 'A supernatural mystery adventure driven by great characters and radio-tuning puzzles', zh: '以精彩角色和无线电解谜为核心的超自然悬疑冒险', type: 'oxen' },
      { en: 'A dense sci-fi survival horror with layered lore and demanding resource management', zh: '层次丰富的科幻生存恐怖，硬核背景设定与资源管理并重', type: 'sig' },
    ],
  },
  {
    q_en: 'How do you feel about jump scares and tension?',
    q_zh: '你对惊吓和紧张感的接受程度如何？',
    options: [
      { en: 'I can handle dread and atmosphere; some startles are fine as long as it tells a story', zh: '能接受压迫感与氛围，偶尔的惊吓也没问题，只要它服务于故事', type: 'ln2' },
      { en: 'I prefer psychological horror that messes with my head over cheap jump scares', zh: '比起廉价惊吓，我更喜欢能让我反复回想的心理恐惧', type: 'ddlc' },
      { en: 'I want eeriness, not terror — a slow-burning creep that makes me uneasy, not jump', zh: '我要的是不安感，不是恐惧——一种让人隐隐不适的阴暗氛围', type: 'oxen' },
      { en: 'I am completely fine with real survival horror tension; fear is part of the fun', zh: '完全能接受真实的生存恐怖张力，恐惧本身就是乐趣的一部分', type: 'sig' },
    ],
  },
  {
    q_en: 'What kind of storytelling speaks to you most?',
    q_zh: '你最喜欢哪种叙事方式？',
    options: [
      { en: 'Show-don\'t-tell: environmental details, no dialogue, let me piece it together', zh: '少即是多：用环境细节说话，没有台词，让我自己拼凑故事', type: 'ln2' },
      { en: 'A narrative that breaks the fourth wall and makes me question what a game even is', zh: '打破第四面墙，让我开始质疑游戏本身是什么的叙事实验', type: 'ddlc' },
      { en: 'Character-driven dialogue where my choices actually shape relationships and endings', zh: '以角色为核心的对话，我的选择真实影响人际关系与结局', type: 'oxen' },
      { en: 'Dense, fragmented lore that rewards players willing to read every document twice', zh: '破碎而深厚的世界观，愿意把每份文件读两遍才能参透真相', type: 'sig' },
    ],
  },
  {
    q_en: 'How much gameplay challenge are you looking for?',
    q_zh: '你期待多高的游戏难度？',
    options: [
      { en: 'Light puzzle-platformer difficulty — accessible but tense enough to feel stakes', zh: '轻度解谜平台难度——好上手，但有足够的张力让你屏住呼吸', type: 'ln2' },
      { en: 'Minimal mechanics — I mostly want to read, choose, and experience the story', zh: '机制越简单越好，我主要想阅读、做选择、沉浸于故事', type: 'ddlc' },
      { en: 'Walk-and-talk adventure with light puzzles — relaxed interaction is key', zh: '散步模拟器风格加轻度解谜，放松互动是关键', type: 'oxen' },
      { en: 'Real survival horror mechanics — limited ammo, inventory, actual danger', zh: '真实的生存恐怖机制——弹药有限、背包管理、真实的危险', type: 'sig' },
    ],
  },
  {
    q_en: 'Which setting draws you in the most?',
    q_zh: '哪个游戏世界最让你想踏入？',
    options: [
      { en: 'A foggy, rain-soaked world of towering monsters and one tiny vulnerable child', zh: '浓雾与大雨笼罩的世界，巨型怪物游荡，一个渺小脆弱的孩子独行其中', type: 'ln2' },
      { en: 'A high school literature club that is cheerful on the surface and broken underneath', zh: '表面阳光活泼的高中文学社，深处却藏着崩坏的秘密', type: 'ddlc' },
      { en: 'A misty Pacific Northwest island where time loops and radio signals reveal old wounds', zh: '浓雾笼罩的西北太平洋岛屿，时间循环与无线电信号揭开陈年创伤', type: 'oxen' },
      { en: 'A cold, dark retrofuturist dystopia where synthetic beings search for meaning and memory', zh: '冰冷黑暗的复古未来反乌托邦，合成人在其中追寻意义与记忆', type: 'sig' },
    ],
  },
  {
    q_en: 'What do you want to carry with you after finishing a dark game?',
    q_zh: '玩完一款黑暗游戏后，你希望带走什么？',
    options: [
      { en: 'A haunting image burned into memory — the kind you see when you close your eyes', zh: '一幅烙印在记忆里的意象，闭上眼睛还能看见的那种', type: 'ln2' },
      { en: 'A mind-bending shock and the urge to tell everyone what just happened to you', zh: '彻底的震惊，以及迫不及待想告诉所有人「我刚刚经历了什么」的冲动', type: 'ddlc' },
      { en: 'Genuine emotional resonance from characters who felt real and choices that mattered', zh: '对真实感十足的角色的情感共鸣，以及那些真正有分量的选择所留下的余韵', type: 'oxen' },
      { en: 'A deep, melancholic sadness about identity, love, and what it means to be alive', zh: '关于身份认同、爱与生命意义的深沉哀愁，久久无法散去', type: 'sig' },
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
  ln2: {
    title_en: 'Little Nightmares II',
    title_zh: '小小梦魇 2',
    emoji: '🕯️',
    tag_en: 'The Atmospheric Dread Seeker',
    tag_zh: '大气恐惧探索者',
    platform_en: 'PC · PS4/5 · Xbox · Switch',
    platform_zh: 'PC · PS4/5 · Xbox · Switch',
    why_en: `Little Nightmares II is one of the most visually arresting horror experiences of the past decade, and it accomplishes everything through atmosphere rather than explanation. You play as Mono, a small boy in a paper bag hat, navigating a grotesque world dominated by larger, monstrous figures — a schoolteacher with a neck that stretches impossibly long, pale-faced children who snap their heads toward you in unison, a city of television-obsessed mannequins. The game never explains who these creatures are or why the world is the way it is. That silence is intentional: Little Nightmares II trusts you to feel the wrongness rather than understand it. Developed by Tarsier Studios, the sequel expands on the original with a companion mechanic — Six, the yellow-raincoat girl from the first game, accompanies you and can be grabbed for a boost or guided across obstacles. This simple mechanic creates genuine emotional investment; you find yourself protecting Six not because the game tells you to, but because she feels fragile and real. The platforming is light and accessible, with some stealth sections and light puzzle-solving that keeps the pacing tense without becoming frustrating. Crucially, Little Nightmares II is not a cheap-scare game — it earns every moment of dread through sustained visual design, a minimalist score, and the quiet certainty that this world is fundamentally hostile to small things. For cozy gamers who want to test the edges of their comfort zone, it is the perfect gateway into atmospheric horror.`,
    why_zh: `《小小梦魇2》是近十年视觉表达力最强的恐怖游戏之一，全程依靠氛围而非文字说明来传递恐惧。你扮演戴着纸袋帽的小男孩莫诺，在一个被巨型怪物统治的诡异世界中穿行。游戏从不解释这些怪物的来历，那份沉默是刻意为之：它相信你能感受到那种"不对劲"，而不需要理解原因。同伴六子（黄雨衣女孩）全程陪伴，让你在不知不觉中对她产生真实的保护欲。平台跳跃轻松易上手，部分潜行和解谜让节奏保持紧张而不令人沮丧。对于想试水黑暗游戏的 cozy 玩家，这是完美的入门之作。`,
    tip_en: `The game has a handful of chase sequences that can feel punishing on first attempt — the key is to memorize the environment rather than panicking and randomly running. Take the time before each chase to note where the walls are, where the exits are, and where you saw the enemy start. The game autosaves generously, so failed attempts cost very little time. For the best experience, play in a dark room with headphones: the spatial audio does most of the psychological work, and you will miss half of it on laptop speakers. The ending will hit harder if you completed the first Little Nightmares beforehand — it is not required, but the payoff is significantly larger with that context.`,
    tip_zh: `游戏中有几段追逐关卡初见容易失败——诀窍是提前记住环境，而不是在恐慌中乱跑。注意出口位置和怪物的起始点，游戏自动存档非常频繁，失败代价很低。最佳体验方式：暗室+耳机，空间音效承担了大量心理工作，用电脑外放会损失一半效果。如果在玩本作前先通关了第一部，结局的冲击力会显著增强——虽然不是必须，但值得。`,
  },
  ddlc: {
    title_en: 'Doki Doki Literature Club!',
    title_zh: '心跳文学部！',
    emoji: '🌸',
    tag_en: 'The Meta-Horror Enthusiast',
    tag_zh: '元叙事恐怖爱好者',
    platform_en: 'PC (free) · PS4/5 · Switch',
    platform_zh: 'PC（免费）· PS4/5 · Switch',
    why_en: `Doki Doki Literature Club is one of the most talked-about games of the past decade for a simple reason: it does something to players that almost no other game has managed. What begins as a cheerful, anime-style visual novel about joining a high school literature club — complete with poem-writing minigames and four charming club members — gradually, then suddenly, becomes something altogether different. Without spoiling the specifics: the game is acutely aware that it is a game, and it uses that awareness to create horror that is uniquely effective because it bypasses the usual distance between player and story. You are not watching characters be afraid. You are made to feel the wrongness yourself, in your own interface, in your own save files. Developed by Team Salvato and released completely free on Steam, DDLC is one of the most downloaded games on the platform and has spawned an enormous fan community. The base game takes about 6-8 hours to complete (including all routes), and the expanded DDLC Plus adds new story content and side stories for the characters. It is rated 17+ and carries content warnings for depression, self-harm, and suicide — take those warnings seriously, but do not let them stop you if you are in a stable place, because DDLC is one of the most genuinely innovative experiences interactive fiction has produced.`,
    why_zh: `《心跳文学部！》是过去十年讨论度最高的游戏之一，原因很简单：它做到了几乎没有其他游戏能做到的事。游戏以明快的日系视觉小说形式开场——加入高中文学社、写诗、和四位可爱社员互动——然后，它开始变化，慢慢地，然后猛然地，变成完全不同的东西。游戏清醒地意识到自己是一款游戏，并借此制造出一种独特的恐惧：不是让你观看角色受怕，而是让你在自己的界面和存档文件里感受到那份不对劲。完全免费，Steam 上下载量极高。游戏含有抑郁、自伤等内容警告，请认真对待，但如果你状态稳定，不要因此错过这部互动小说史上最具创意的作品。`,
    tip_en: `Do not look up spoilers before your first playthrough — the entire value of DDLC rests on genuine surprise, and even indirect hints will diminish the experience. Play through the game at least twice, including all character routes, before you see the true ending; the game is designed to reward players who engage with every path. After finishing, there is a hidden poem file in the game's local data folder that most players miss — it adds one final layer to the narrative. DDLC Plus is worth purchasing for the Side Stories if you want to understand the characters more fully before the main game darkens; many players find the Side Stories recontextualize everything in ways that make the second playthrough even more affecting.`,
    tip_zh: `第一遍通关前绝对不要查攻略——《心跳文学部》的全部价值依赖于真实的震惊体验，哪怕间接的提示都会削弱效果。至少完整体验所有角色路线再去看真结局，游戏专为反复游玩而设计。通关后，在游戏本地数据文件夹里有一首隐藏诗歌，大多数玩家会错过它，但它为叙事添加了最后一层含义。DDLC Plus 的番外故事值得购买——先读番外再进主线，会让第二遍游玩时一切情感都更加深沉。`,
  },
  oxen: {
    title_en: 'Oxenfree II: Lost Signals',
    title_zh: 'Oxenfree II：失落信号',
    emoji: '📻',
    tag_en: 'The Supernatural Mystery Lover',
    tag_zh: '超自然悬疑爱好者',
    platform_en: 'PC · PS4/5 · Switch · Netflix',
    platform_zh: 'PC · PS4/5 · Switch · Netflix',
    why_en: `Oxenfree II: Lost Signals is the rare sequel that stands completely on its own while rewarding fans of the original with callbacks and deeper lore. You play as Riley, an environmental researcher who returns to her hometown of Camena to investigate strange radio signals — only to discover that the supernatural rifts from the first game have returned and are growing. Like the original Oxenfree, Lost Signals centers its horror on atmosphere and character rather than threat: the game is more haunting than scary, more melancholic than terrifying. The signature mechanic — tuning a radio to different frequencies to interact with paranormal phenomena — creates a genuinely tactile relationship between the player and the game's supernatural layer. The dialogue system runs continuously, meaning conversations happen while you walk, and your choices shape Riley's relationships with her partner Jacob and various residents of Camena in ways that accumulate meaningfully over the game's 6-8 hour runtime. The writing is Night School Studio at their best: witty, human, and quietly heartbreaking in the right moments. Lost Signals also features a unique phone mechanic where people from the future call you — a clever way of conveying the time-loop stakes without ever feeling gimmicky. For players who love cozy games and want to step into dark territory without combat or death screens, Oxenfree II is the ideal bridge.`,
    why_zh: `《Oxenfree II：失落信号》是那种完全能独立成作、但也会奖励前作粉丝的难得续集。你扮演环境研究员莱利回到故乡卡梅纳调查异常无线电信号，发现超自然裂缝再度出现并持续扩散。游戏的恐怖在于氛围与角色，而非威胁——它比起恐怖更像是阴郁，比起惊吓更像是哀伤。调频无线电与超自然现象互动的核心机制让玩家与游戏的奇异层次建立真实的触感关系。对话在行走时实时进行，选择逐渐塑造莱利与各角色的关系。对于喜欢 cozy 游戏但想试探黑暗边界、不想接受战斗或死亡画面的玩家，这是完美的过渡。`,
    tip_en: `Oxenfree II does not require you to have played the first game, but reading a summary of the original story will enrich your understanding of the world-building significantly. The phone calls from the future are easy to miss if you are moving quickly — slow down whenever your phone buzzes, because those conversations contain some of the most interesting narrative content in the game. There are multiple endings, and they are shaped by relationship choices throughout the entire game rather than a single final decision, so play attentively from the start. If you have Netflix, the mobile version is free and surprisingly well-optimized; it is an excellent way to experience the game if you prefer portable play.`,
    tip_zh: `《Oxenfree II》不需要玩过第一部，但提前了解前作世界观会让你对许多细节的理解更丰富。来自未来的电话很容易在快速移动时错过——每次手机震动都放慢脚步，那些通话含有游戏中最有趣的叙事内容之一。游戏有多个结局，由全程的关系选择共同决定，而非最后一刻的单一抉择，因此从头就要用心做每个选择。如果你有 Netflix，手机版免费且优化出色，是绝佳的随身游玩方式。`,
  },
  sig: {
    title_en: 'Signalis',
    title_zh: 'Signalis',
    emoji: '🤖',
    tag_en: 'The Philosophical Horror Devotee',
    tag_zh: '哲学恐怖devotee',
    platform_en: 'PC · PS4/5 · Xbox · Switch',
    platform_zh: 'PC · PS4/5 · Xbox · Switch',
    why_en: `Signalis is the game that the dedicated dark-game enthusiast has been waiting for. A love letter to classic survival horror — Resident Evil, Silent Hill — combined with dense science fiction worldbuilding drawn from sources like 1984, Blame!, and Serial Experiments Lain, Signalis tells the story of Elster, a Replika (synthetic human) who wakes alone and searches for her partner Ariane. What seems like a straightforward survival-horror premise — navigate a crumbling research station, solve inventory puzzles, manage limited ammo — opens into a meditation on identity, memory, love, and the horror of being a consciousness trapped in a body that was never meant to feel. The combat is punishing but fair; the inventory system — six slots only — forces constant, tense decisions. But the real depth of Signalis is in its fragmented narrative: diary entries, distorted dreams, environmental clues, and a structure that loops back on itself until the player begins to understand that the game is not just a horror story but an emotional statement about grief and devotion. Multiple endings, each illuminating a different facet of the story, reward multiple playthroughs. Developed by rose-engine, an independent two-person studio, Signalis is the kind of debut that makes you wonder how two people made something this complete.`,
    why_zh: `《Signalis》是真正的黑暗游戏爱好者一直在等待的作品。它既是向经典生存恐怖（生化危机、寂静岭）的情书，也是融合了《1984》《BLAME!》《实验性错误》等深厚科幻底蕴的哲学陈述。你扮演合成人Elster，独自醒来，寻找伴侣Ariane。表面上是生存恐怖——探索崩坏的研究站、解决背包谜题、管理有限弹药——实则是一场关于身份、记忆、爱与意识被困于从未被设计成能够感受的躯体中的深沉冥想。六格背包系统迫使你做出持续而紧张的取舍。破碎的叙事——日记、扭曲梦境、环境线索——让整个故事循环反折，直到你意识到这不只是恐怖故事，而是关于悲痛与执念的情感声明。多结局，每一个都值得细思。`,
    tip_en: `Signalis has a steep learning curve for survival horror newcomers — if you are not used to tank controls and limited inventory, the first hour will feel overwhelming. Stick with it: the control scheme becomes natural quickly, and the deliberate pacing is part of the experience. Resource management is critical: never hold more ammo than you need for immediate threats, and always keep one inventory slot free for documents, which are essential for understanding the story. The game has five endings, and getting the true ending requires specific choices that are not telegraphed — use a guide for your second playthrough if you want to see it. Pay close attention to the loading screen quotes and the dream sequences; they contain the emotional core of the narrative and are easy to skip in the tension of gameplay.`,
    tip_zh: `《Signalis》对生存恐怖新手有一定上手门槛——如果不熟悉坦克操控和有限背包，前一小时会感到不适应。坚持下去：操控很快变得自然，而那种刻意的节奏本身就是体验的一部分。资源管理至关重要：只携带应对眼前威胁所需的弹药，始终为文件留一个背包格——文件是理解故事的关键。游戏共五个结局，真结局需要特定选择且游戏不会提示——第二遍可以参考攻略。请仔细留意加载画面的引言和梦境场景，它们是整个叙事情感核心的所在，在游戏紧张节奏中很容易被跳过。`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { ln2: 0, ddlc: 0, oxen: 0, sig: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function DarkAtmosphericGamesQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Pick[]>([])
  const [result, setResult] = useState<Pick | null>(null)

  const handleAnswer = (type: Pick) => {
    const next = [...answers, type]
    if (current + 1 < QUESTIONS.length) {
      setAnswers(next)
      setCurrent(current + 1)
    } else {
      setResult(calcResult(next))
    }
  }

  const reset = () => {
    setCurrent(0)
    setAnswers([])
    setResult(null)
  }

  const q = QUESTIONS[current]

  if (result) {
    const r = RESULTS[result]
    const shareText = isZh
      ? `我的黑暗大气游戏推荐是《${r.title_zh}》！${r.emoji} 来测测你适合哪款？${BASE_URL}/zh/quizzes/dark-atmospheric-games-quiz`
      : `My dark atmospheric game match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/dark-atmospheric-games-quiz`

    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{r.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">{isZh ? r.tag_zh : r.tag_en}</p>
          <h2 className="mb-2 text-2xl font-bold text-[#f0a832]">
            {isZh ? r.title_zh : r.title_en}
          </h2>
          <p className="text-sm text-[#8a9a7a]">{isZh ? r.platform_zh : r.platform_en}</p>
        </div>

        <div className="mb-6 rounded-xl bg-[#1a2e1a]/60 p-5 text-[#e8dcc8]">
          <p className="mb-4 leading-relaxed">{isZh ? r.why_zh : r.why_en}</p>
          <div className="border-t border-[#2d3d2d] pt-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {isZh ? '游玩建议' : 'Pro Tip'}
            </p>
            <p className="text-sm leading-relaxed text-[#c8bca8]">{isZh ? r.tip_zh : r.tip_en}</p>
          </div>
        </div>

        <div className="mb-6">
          <ShareButton text={shareText} isZh={isZh} />
        </div>

        <div className="mb-6 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a]/40 p-4 text-center">
          <p className="mb-1 text-xs text-[#8a9a7a]">
            {isZh ? '想找更多适合你的农场与休闲游戏？' : 'Want more game recommendations tailored to you?'}
          </p>
          <p className="text-sm text-[#e8dcc8]">
            {isZh
              ? '试试 TendFarm App — 根据你的心情和时间，每天推荐最适合的游戏'
              : 'Try TendFarm App — daily game picks matched to your mood and schedule'}
          </p>
        </div>

        <button
          onClick={reset}
          className="w-full rounded-xl border border-[#2d3d2d] py-2.5 text-sm text-[#8a9a7a] transition-colors hover:border-[#4d5d4d] hover:text-[#e8dcc8]"
        >
          {isZh ? '重新测试' : 'Retake Quiz'}
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs text-[#8a9a7a]">
          <span>
            {isZh
              ? `第 ${current + 1} / ${QUESTIONS.length} 题`
              : `Question ${current + 1} of ${QUESTIONS.length}`}
          </span>
          <div className="flex gap-1">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i < current ? 'bg-[#f0a832]' : i === current ? 'bg-[#f0a832]/60' : 'bg-[#2d3d2d]'
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-[#e8dcc8]">
          {isZh ? q.q_zh : q.q_en}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.type)}
            className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 px-4 py-3 text-left text-sm text-[#e8dcc8] transition-all hover:border-[#f0a832]/40 hover:bg-[#1a2e1a] hover:text-[#f0a832]"
          >
            {isZh ? opt.zh : opt.en}
          </button>
        ))}
      </div>
    </div>
  )
}
