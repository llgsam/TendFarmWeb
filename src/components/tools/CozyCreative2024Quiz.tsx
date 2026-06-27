'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'tiny-glade' | 'sticky-business' | 'cocoon' | 'viewfinder'

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
    q_en: 'What is the most satisfying creative feeling for you?',
    q_zh: '对你来说最令人满足的创意感觉是什么？',
    options: [
      { en: 'Watching something beautiful emerge from nothing — no rules, no wrong answers, just form taking shape', zh: '看着美丽的东西从无到有地出现——没有规则、没有错误答案，只是形态逐渐成形', type: 'tiny-glade' },
      { en: 'Making something small and personal that someone else will love — something that carries your aesthetic into the world', zh: '制作一些小而个人的东西，让别人会喜欢——将你的美学带入世界的东西', type: 'sticky-business' },
      { en: 'The moment a complex system suddenly makes sense — when the pieces lock together and you see the whole structure', zh: '复杂系统突然变得清晰的那一刻——当各部分咬合在一起，你看到了整体结构', type: 'cocoon' },
      { en: 'Finding a completely new angle on a familiar thing — a perspective shift that makes the obvious impossible and the impossible obvious', zh: '在熟悉的事物上找到全新角度——一种视角转换，让显而易见的东西变得不可能，让不可能的东西变得显而易见', type: 'viewfinder' },
    ],
  },
  {
    q_en: 'Which best describes how you like to spend creative time?',
    q_zh: '以下哪个最能描述你喜欢如何度过创意时间？',
    options: [
      { en: 'Completely unstructured — I want to build whatever I want with no objectives, no timers, no right way to do it', zh: '完全无结构——我想在没有目标、没有计时器、没有正确方式的情况下构建任何我想要的东西', type: 'tiny-glade' },
      { en: 'Light structure with creative freedom — a gentle goal gives me direction, but the choices about how to express it are fully mine', zh: '轻度结构加上创意自由——温和的目标给我方向，但如何表达的选择完全是我的', type: 'sticky-business' },
      { en: 'A clear problem with a satisfying solution — I want the puzzle to be genuinely clever and the solution to feel like a discovery', zh: '有明确问题和令人满足解决方案——我希望谜题真正聪明，解决方案感觉像是一个发现', type: 'cocoon' },
      { en: 'Something that genuinely surprises me about how it works — mechanics I have never seen that make me rethink what games can do', zh: '让我真正对其工作方式感到惊讶的东西——我从未见过的机制，让我重新思考游戏可以做什么', type: 'viewfinder' },
    ],
  },
  {
    q_en: 'What kind of visual aesthetic appeals most to you right now?',
    q_zh: '目前哪种视觉美学最吸引你？',
    options: [
      { en: 'Warm, miniature, and architectural — the feeling of looking at a tiny perfect world from above', zh: '温暖、微型和建筑感——从上方俯瞰一个微小完美世界的感觉', type: 'tiny-glade' },
      { en: 'Soft and bright with crafted details — the visual language of handmade objects and small-batch goods', zh: '柔和明亮、有手工细节——手工物品和小批量商品的视觉语言', type: 'sticky-business' },
      { en: 'Alien and organic — a world that looks like nothing else, with bioluminescent curves and strange geometries', zh: '异域而有机——一个看起来与众不同的世界，有生物发光的曲线和奇异的几何形状', type: 'cocoon' },
      { en: 'Clean and surreal — retro-futurist test facility meets mind-bending spatial paradox', zh: '干净而超现实——复古未来主义测试设施遇上令人费解的空间悖论', type: 'viewfinder' },
    ],
  },
  {
    q_en: 'How important is narrative or story to you?',
    q_zh: '叙事或故事对你有多重要？',
    options: [
      { en: 'Not at all — I want pure experience, no story required, just the act of creating', zh: '完全不重要——我想要纯粹的体验，不需要故事，只是创造的行为', type: 'tiny-glade' },
      { en: 'A gentle backdrop — I want to feel like my shop is part of a world, but the main appeal is the creative work', zh: '一个温和的背景——我希望感觉我的小店是一个世界的一部分，但主要吸引力是创意工作', type: 'sticky-business' },
      { en: 'An implicit story told through world-building — I want the world to have history I discover through exploration, not cutscenes', zh: '通过世界构建讲述的隐性故事——我希望世界有通过探索而非过场动画发现的历史', type: 'cocoon' },
      { en: 'A mystery to solve — I want the environment itself to be a puzzle that hints at what happened here', zh: '一个需要解决的谜——我希望环境本身就是一个谜题，暗示着这里曾经发生过什么', type: 'viewfinder' },
    ],
  },
  {
    q_en: 'How do you feel about challenge and failure in games?',
    q_zh: '你如何看待游戏中的挑战和失败？',
    options: [
      { en: 'I actively avoid challenge — I want a game I cannot lose, where every action is just expression', zh: '我主动回避挑战——我想要一款我不会输的游戏，每个动作只是表达', type: 'tiny-glade' },
      { en: 'Light challenge is fine — mild resource management or timing keeps me engaged without frustrating me', zh: '轻度挑战没问题——轻微的资源管理或时机让我保持参与感，而不会让我沮丧', type: 'sticky-business' },
      { en: 'I welcome challenge that is fair and elegant — if a puzzle stumps me, I want to feel I could have seen it', zh: '我欢迎公平而优雅的挑战——如果一个谜题难倒我，我希望感觉我本可以看出来', type: 'cocoon' },
      { en: 'I enjoy the feeling of being genuinely stumped — and then suddenly solving something I thought was impossible', zh: '我享受真正被难住的感觉——然后突然解决了一些我认为不可能的事情', type: 'viewfinder' },
    ],
  },
  {
    q_en: 'Which of these screenshots would stop your scroll?',
    q_zh: '以下哪张截图会让你停止滑动？',
    options: [
      { en: 'A tiny golden castle nestled in autumn leaves, with soft fog, a winding path, and a warm evening glow over perfect stone', zh: '一座嵌在秋叶中的微型金色城堡，有柔和的雾气、蜿蜒的小路和完美石材上温暖的傍晚光芒', type: 'tiny-glade' },
      { en: 'A flat-lay of dozens of handcrafted sticker sheets, each with a different pastel theme, laid out perfectly on a wooden surface', zh: '数十张手工贴纸表格的俯拍，每张都有不同的粉彩主题，完美地摆放在木制表面上', type: 'sticky-business' },
      { en: 'A glowing beetle carrying a small world inside its shell, standing at the entrance of a strange organic tunnel', zh: '一只发光的甲虫，在其外壳内携带一个小世界，站在一条奇怪有机隧道的入口', type: 'cocoon' },
      { en: 'A polaroid photo placed in front of a cliff, and through the photo, a bridge that should not exist appears where the cliff was', zh: '一张宝丽来照片放在悬崖前，通过照片，一座本不应存在的桥梁出现在悬崖曾经所在的地方', type: 'viewfinder' },
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
  'tiny-glade': {
    title_en: 'Tiny Glade',
    title_zh: 'Tiny Glade',
    emoji: '🏰',
    tag_en: 'A tiny castle diorama builder with no objectives, no fail states, and procedural details that make every stone wall unique',
    tag_zh: '一款微型城堡立体场景构建器——没有目标、没有失败状态，程序生成细节让每面石墙都独一无二',
    platform_en: 'Available on: PC (Steam) — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）——约 15 美元',
    why_en:
      "Tiny Glade (2024) became an overnight viral sensation in early 2024 because its demo footage showed something the cozy gaming community had never quite seen: a builder where every element procedurally adapts in real time as you place it. Stone walls grow moss where shaded. Roofs tile differently depending on pitch and material. Ivy climbs whatever you position it near. Flowers find their own configuration in the space you give them. There are no objectives, no resources to manage, no fail states of any kind — Tiny Glade is a pure creative sandbox that generates screenshots that look like fantasy concept art. The emotional loop is complete serenity: you shape a small corner of a golden or misty or autumnal world, take a screenshot, and feel satisfied by the act of making something beautiful. At $15, it is one of the most accessible and beloved creative games of 2024. Released in September 2024 by Pounce Light, a two-person studio. Extremely suitable for short sessions of any length.",
    why_zh:
      'Tiny Glade（2024 年）在 2024 年初凭借 demo 视频片段一夜走红，因为它展示了 cozy 游戏社区从未完全见过的东西：一款每个元素都在你放置时实时程序性适应的构建游戏。石墙在阴影处长苔藓。屋顶根据坡度和材料不同方式铺设。常青藤攀爬你放置在附近的任何东西。花卉在你给予的空间内找到自己的配置。没有目标、没有资源管理、没有任何形式的失败状态——Tiny Glade 是一个纯创意沙盒，生成的截图看起来像奇幻概念艺术。情感循环是完全的宁静：你塑造一个金色或朦胧或秋日世界的小角落，截图，对制作美丽事物的行为感到满足。15 美元，是 2024 年最易得且最受喜爱的创意游戏之一。2024 年 9 月由两人工作室 Pounce Light 发布。非常适合任何长度的短游戏。',
    tip_en: "Use the fog slider — the atmospheric fog transforms even a simple arch into something ethereal. And don't overlook the path tool: letting Tiny Glade auto-generate cobblestone paths between your structures produces organic results that look far more intentional than anything you could draw by hand.",
    tip_zh: '使用雾气滑块——大气雾气将即使是简单的拱门也变成虚幻的东西。不要忽视路径工具：让 Tiny Glade 在你的建筑之间自动生成鹅卵石路径，产生的有机结果看起来比你用手绘制的任何东西都更有意图。',
  },
  'sticky-business': {
    title_en: 'Sticky Business',
    title_zh: 'Sticky Business',
    emoji: '🌸',
    tag_en: 'A cozy sticker design and shop sim — create original sticker sheets, package orders with care, and build a small online community',
    tag_zh: '一款 cozy 贴纸设计和小店模拟——创作原创贴纸表格、用心包装订单并建立一个小型网络社区',
    platform_en: 'Available on: PC (Steam), Nintendo Switch — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch——约 15 美元',
    why_en:
      "Sticky Business (2023) occupies a niche that was previously underserved: a cozy game specifically for people who love the craft and aesthetic of designing small goods and the community that forms around them. You design sticker sheets (using provided elements and color palettes), receive online orders from customers who have specific preferences and personalities, package each order carefully (selecting wrapping paper, stickers, and packing tape that match the customer's vibe), and gradually build a following. The packaging mechanic is deeply satisfying in a tactile way — matching the customer's preferences for each package creates a small moment of empathy and care. The customer characters have personalities that emerge over multiple orders: you learn what they love, what occasion they are preparing for, and what kind of shop owner they want you to be. At $15 on PC and Switch, it is one of the most specifically targeted cozy games in recent years — if the premise sounds appealing, the execution delivers exactly what it promises.",
    why_zh:
      'Sticky Business（2023 年）占据了一个之前服务不足的细分市场：一款专门为喜欢设计小商品的工艺和美学以及围绕它们形成的社区的人设计的 cozy 游戏。你设计贴纸表格（使用提供的元素和色彩调色板），从有特定偏好和个性的客户那里收到在线订单，仔细包装每个订单（选择与客户氛围匹配的包装纸、贴纸和打包胶带），并逐渐建立追随者群体。包装机制在触觉上非常令人满足——为每个包裹匹配客户的偏好创造了一个小小的同理心和关怀时刻。客户角色的个性在多个订单中逐渐显现：你了解他们喜欢什么、他们正在为什么场合准备，以及他们希望你成为什么样的店主。PC 和 Switch 上 15 美元，是近年来最具针对性的 cozy 游戏之一——如果前提听起来吸引人，执行恰好兑现了它的承诺。',
    tip_en: "Pay attention to customer notes and repeat orders — some customers leave hints about their next purchase or reveal backstory details that change how their packages feel to pack. The game rewards careful reading.",
    tip_zh: '注意客户留言和重复订单——一些客户留下关于下次购买的暗示，或透露改变包装感觉的背景故事细节。游戏奖励仔细阅读。',
  },
  cocoon: {
    title_en: 'Cocoon',
    title_zh: 'Cocoon',
    emoji: '🌀',
    tag_en: 'A wordless puzzle adventure about carrying entire worlds inside orbs — from the creator of Limbo and Inside',
    tag_zh: '一款关于在球体内携带整个世界的无言解谜冒险——来自《地狱边境》和《内部》的创作者',
    platform_en: 'Available on: PC (Steam, Xbox Game Pass), Nintendo Switch, PlayStation 4/5, Xbox — about $25',
    platform_zh: '可在以下平台获取：PC（Steam、Xbox Game Pass）、Nintendo Switch、PlayStation 4/5、Xbox——约 25 美元',
    why_en:
      "Cocoon (2023) is one of the most inventive puzzle games ever made. Created by Jeppe Carlsen, the lead gameplay designer of Limbo and Inside, it follows a small insect creature who discovers orbs that each contain an entire world inside. The central mechanic is that you can pick up these orbs and carry them — and then enter them. The puzzle loop involves placing orbs within orbs within orbs and using the properties of each nested world to affect the outer worlds. The elegance of Cocoon's design is that it introduces this system gradually and never explains it — you figure out the logic through play, and each discovery is deeply satisfying. There are no words, no dialogue, no text. The visual design is bioluminescent and alien: a world of glowing beetles, geometric architecture, and strange organic technology. The game takes 5-7 hours to complete and is paced beautifully — never too fast, never repetitive. It won multiple Game of the Year nominations in 2023 including BAFTA Best Game. On Xbox Game Pass. An exceptional experience for anyone who valued the precision and silence of Inside or Limbo.",
    why_zh:
      'Cocoon（2023 年）是有史以来最具创意的解谜游戏之一。由 Limbo 和 Inside 的首席游戏设计师 Jeppe Carlsen 创作，它讲述了一个小昆虫生物发现每个内部都有整个世界的球体的故事。核心机制是你可以拾取这些球体并携带它们——然后进入它们。谜题循环涉及将球体放置在球体内的球体内，并使用每个嵌套世界的属性来影响外部世界。Cocoon 设计的优雅之处在于它逐渐引入这个系统，从不解释它——你通过游戏弄清楚逻辑，每个发现都非常令人满足。没有文字、没有对话、没有文本。视觉设计是生物发光的和异域的：一个发光甲虫、几何建筑和奇异有机技术的世界。游戏完成需要 5-7 小时，节奏优美——从不太快，从不重复。它赢得了 2023 年包括 BAFTA 最佳游戏在内的多个年度游戏提名。可在 Xbox Game Pass 上获取。对于重视 Inside 或 Limbo 的精确和沉默的任何人来说，这是一次卓越的体验。',
    tip_en: "If a room seems to have no solution, check whether you should be carrying a different orb into it. Many Cocoon puzzles only click when you realize you have been thinking about the nesting order incorrectly — the solution often requires stepping out of a world entirely before re-entering.",
    tip_zh: '如果一个房间似乎没有解决方案，检查你是否应该将不同的球体带入其中。许多 Cocoon 谜题只有当你意识到你对嵌套顺序的思考是错误的才能解开——解决方案通常需要完全走出一个世界然后重新进入。',
  },
  viewfinder: {
    title_en: 'Viewfinder',
    title_zh: 'Viewfinder',
    emoji: '📷',
    tag_en: 'A puzzle game where you take photos and place them in 3D space to reshape the world — one of the most original mechanics in years',
    tag_zh: '一款你拍摄照片并将其放置在三维空间中以重塑世界的解谜游戏——近年来最具原创性的机制之一',
    platform_en: 'Available on: PC (Steam), PlayStation 4/5 — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）、PlayStation 4/5——约 25 美元',
    why_en:
      "Viewfinder (2023) introduces a mechanic so original that most players need to see it in action before they can believe it works: you take a photo of the environment (or use a provided polaroid) and then place that photo as a flat surface in 3D space. When the photo touches the ground, everything in the photo becomes real geometry — a bridge in a photo becomes a bridge you can walk on, a building in a photo becomes a building you can enter. This means you can place a photo taken from a higher angle to create geometry that bridges impossible gaps, or layer photos on top of each other to combine architectural elements from different images. The puzzles ask you to use this mechanic to reach a power core in each level. The game is about 5-7 hours long and is paced generously — levels are individual and self-contained, so you never feel stuck in a multi-room slog. The visual design is clean retrofuturist: a teleportation research facility populated by cassette-tape recordings and concept art. Multiple awards in 2023 for innovation. Developed by Sad Owl Studios.",
    why_zh:
      'Viewfinder（2023 年）引入了一种如此原创的机制，以至于大多数玩家需要在相信它有效之前看到它实际操作：你拍摄环境的照片（或使用提供的宝丽来），然后将该照片作为平面表面放置在三维空间中。当照片接触地面时，照片中的一切都变成真实几何——照片中的桥梁变成你可以走过的桥梁，照片中的建筑变成你可以进入的建筑。这意味着你可以放置从更高角度拍摄的照片来创建弥合不可能间隙的几何形状，或者将照片叠加在一起以组合来自不同图像的建筑元素。谜题要求你使用这个机制到达每个关卡中的电源核心。游戏大约 5-7 小时，节奏宽裕——关卡是独立的和自成一体的，所以你永远不会感觉陷入多房间的苦战。视觉设计是干净的复古未来主义：一个由磁带录音和概念艺术填充的传送研究设施。2023 年多个创新奖项。由 Sad Owl Studios 开发。',
    tip_en: "Remember that you can reset any level instantly — there is no penalty. This makes Viewfinder a great game for experimental thinking: just try placing the photo somewhere unexpected and see what geometry appears. The solution is almost always simpler than it first looks.",
    tip_zh: '记住你可以立即重置任何关卡——没有惩罚。这使 Viewfinder 成为实验性思维的好游戏：只需尝试在意想不到的地方放置照片，看看出现什么几何形状。解决方案几乎总是比最初看起来更简单。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'tiny-glade': 0,
    'sticky-business': 0,
    cocoon: 0,
    viewfinder: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyCreative2024Quiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-creative-2024`
    const shareText = isZh
      ? `根据我的创意风格，最适合我的 2024 新 Cozy 游戏是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `Based on my creative style, my 2024 cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              ? 'TendFarm 正在研发农场节律追踪功能——把游戏里的创意心流，带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the creative flow state of games into real daily life.'}
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
            ? '根据你的创意风格，2023-2024 哪款 Cozy 新游最适合你？'
            : 'Which 2023-2024 Creative Cozy Game Matches Your Style?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个关于创意偏好的问题——在 Tiny Glade、Sticky Business、Cocoon 和 Viewfinder 中找到你的最佳匹配'
            : '6 questions about how you love to create — find your match among Tiny Glade, Sticky Business, Cocoon, and Viewfinder. All released 2023-2024, all genuinely original.'}
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
        {isZh ? '找到我的 2024 创意游戏' : 'Find My 2024 Creative Match'}
      </button>
    </div>
  )
}
