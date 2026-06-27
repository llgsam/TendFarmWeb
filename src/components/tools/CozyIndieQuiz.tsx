'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'grove' | 'unpacking' | 'little-left' | 'wylde'

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
    q_en: 'How do you prefer to play cozy games?',
    q_zh: '你更喜欢怎样玩 cozy 游戏？',
    options: [
      { en: 'A little each day — I like having a reason to return daily', zh: '每天玩一点——我喜欢每天都有理由回来', type: 'grove' },
      { en: 'Quiet binge — I want to sink in for 3-4 hours and finish something', zh: '安静的通宵——我想沉浸 3-4 小时完成一件事', type: 'unpacking' },
      { en: 'Short bursts — 15-30 minutes of satisfying gameplay anytime', zh: '短暂爆发——随时 15-30 分钟令人满足的游戏', type: 'little-left' },
      { en: 'A full weekend journey — I want a complete story over a few sessions', zh: '完整的周末旅程——我想在几次游戏中完成一个完整的故事', type: 'wylde' },
    ],
  },
  {
    q_en: 'Which of these sounds most like what you want from a cozy game right now?',
    q_zh: '以下哪个最像你现在想从 cozy 游戏中得到的？',
    options: [
      { en: 'Gentle narrative unfolding over time — characters I grow to love slowly', zh: '随时间缓缓展开的温和叙事——我慢慢喜爱的角色', type: 'grove' },
      { en: 'Wordless storytelling — a life told entirely through objects with zero dialogue', zh: '无言的叙事——通过物品讲述的生活，零对话', type: 'unpacking' },
      { en: 'Pure satisfying order — organizing things into exactly the right place', zh: '纯粹令人满足的秩序——把东西整理到完全正确的位置', type: 'little-left' },
      { en: 'Wholesome adventure — farming, magic, romance, and a community that feels real', zh: '温馨的冒险——农业、魔法、恋爱，以及感觉真实的社区', type: 'wylde' },
    ],
  },
  {
    q_en: 'How do you feel about games with a clear ending?',
    q_zh: '你对有明确结局的游戏感觉如何？',
    options: [
      { en: "I prefer ongoing — I want a game I can check in with for weeks or months", zh: '我更喜欢持续进行——我想要一款可以持续几周或几个月的游戏', type: 'grove' },
      { en: "I love a clear ending — I want the complete arc and then I'm done", zh: '我喜欢明确的结局——我想要完整的弧线，然后结束', type: 'unpacking' },
      { en: "I like puzzle completion — finish this puzzle, move to the next", zh: '我喜欢解谜完成——完成这个谜题，进入下一个', type: 'little-left' },
      { en: "I want a story ending but with farming I can keep doing after", zh: '我想要故事结局，但之后可以继续进行农业', type: 'wylde' },
    ],
  },
  {
    q_en: 'Which visual style appeals to you most?',
    q_zh: '哪种视觉风格最吸引你？',
    options: [
      { en: 'Painterly and whimsical — every scene looks like hand-painted illustration art', zh: '绘画感和异想天开——每个场景看起来像手绘插图艺术', type: 'grove' },
      { en: 'Pixel art with detail — objects that carry real emotional weight through design', zh: '有细节的像素艺术——通过设计承载真实情感重量的物品', type: 'unpacking' },
      { en: 'Clean and tactile — the satisfaction is in seeing the perfect arrangement', zh: '干净而触感强——满足感在于看到完美的排列', type: 'little-left' },
      { en: 'Warm and colorful — a cozy town that looks lived-in and inviting', zh: '温暖而多彩——一个看起来有人居住和热情好客的温馨小镇', type: 'wylde' },
    ],
  },
  {
    q_en: 'Which word best describes what you want to feel while playing?',
    q_zh: '哪个词最能描述你在游戏时想要感受的？',
    options: [
      { en: 'Gently moved', zh: '温柔地被感动', type: 'grove' },
      { en: 'Quietly understood', zh: '静静地被理解', type: 'unpacking' },
      { en: 'Deeply satisfied', zh: '深深地感到满足', type: 'little-left' },
      { en: 'Warmly at home', zh: '温暖地有归属感', type: 'wylde' },
    ],
  },
  {
    q_en: 'How important is story and character to you in a cozy game?',
    q_zh: '故事和角色对你在 cozy 游戏中有多重要？',
    options: [
      { en: 'Essential — I want characters whose stories unfold over many sessions', zh: '必不可少——我想要在多次游戏中展开故事的角色', type: 'grove' },
      { en: "I want story told entirely through environment — no dialogue needed", zh: '我想要完全通过环境讲述的故事——不需要对话', type: 'unpacking' },
      { en: "Not needed — the gameplay satisfaction is enough for me", zh: '不需要——游戏满足感对我来说已经足够', type: 'little-left' },
      { en: 'Very important — I want deep characters, romance options, and a rich world', zh: '非常重要——我想要深度角色、恋爱选项和丰富的世界', type: 'wylde' },
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
  grove: {
    title_en: 'Cozy Grove',
    title_zh: 'Cozy Grove',
    emoji: '🏕️',
    tag_en: 'The most beautiful daily cozy game ever made',
    tag_zh: '有史以来最美丽的每日 cozy 游戏',
    platform_en: 'Available on: iOS/Android (Apple Arcade), Nintendo Switch, PC (Steam), PS4/5, Xbox',
    platform_zh: '可在以下平台获取：iOS/Android（Apple Arcade）、Nintendo Switch、PC（Steam）、PS4/5、Xbox',
    why_en:
      "Cozy Grove is the indie cozy game for you — a daily check-in experience set on a haunted island inhabited by colorful bear spirits. The game is designed around the real-world clock: a small amount of content unlocks each day, and rushing isn't possible. Each spirit is a fully realized character with a rich backstory and emotional arc that unfolds over weeks. The art style is unlike anything else in gaming — hand-painted and layered, with the island literally growing more colorful and alive as you help the spirits heal their unfinished business. It rewards patience with some of the most beautifully written characters in the cozy genre. Session length is naturally capped at about 20-30 minutes per day, making it perfect for a daily ritual.",
    why_zh:
      'Cozy Grove 是最适合你的独立 cozy 游戏——一款设定在鬼魂出没的岛屿上的每日签到体验，岛上居住着多彩的熊灵魂。游戏围绕现实世界时钟设计：每天解锁少量内容，无法加速。每位灵魂都是一个完全实现的角色，拥有丰富的背景故事和情感弧线，在几周内展开。艺术风格与游戏中的任何其他东西都不同——手绘和分层，随着你帮助灵魂治愈未竟的心愿，岛屿字面意义上变得更加丰富多彩和充满生机。它用耐心奖励玩家，拥有 cozy 类型中一些写得最美的角色。每天的游戏时长自然限制在约 20-30 分钟，使其非常适合作为日常仪式。',
    tip_en: 'Each day: complete Flamey\'s tasks first, then talk to every spirit — the dialogue resets daily and is worth reading every time.',
    tip_zh: '每天：先完成 Flamey 的任务，然后和每位灵魂说话——对话每天重置，每次都值得阅读。',
  },
  unpacking: {
    title_en: 'Unpacking',
    title_zh: 'Unpacking',
    emoji: '📦',
    tag_en: 'A life story told entirely through objects — zero dialogue',
    tag_zh: '完全通过物品讲述的人生故事——零对话',
    platform_en: 'Available on: Nintendo Switch, PC (Steam), Xbox Game Pass, PS4/5, iOS/Android (Netflix Games)',
    platform_zh: '可在以下平台获取：Nintendo Switch、PC（Steam）、Xbox Game Pass、PS4/5、iOS/Android（Netflix 游戏）',
    why_en:
      "Unpacking is one of the most remarkable games ever made in any genre — and it's perfect for you. You unpack boxes across eight different moves in a woman's life, from her first college dorm room to her eventual home, placing objects in each space. There is no dialogue, no text beyond the occasional box label, no score, and no fail state. The entire story is told through what she owns and what she keeps: the childhood stuffed animal that travels through every move, the ex-boyfriend's house where her objects don't quite fit, the space she eventually makes entirely her own. Most players cry at least once. It takes about 3-4 hours to complete and is available on Xbox Game Pass, Nintendo Switch, and more. One of the most acclaimed indie games of the past decade.",
    why_zh:
      'Unpacking 是任何类型中最杰出的游戏之一——它非常适合你。你跨越一位女性生命中八次不同搬家来拆箱，从她的第一个大学宿舍到最终的家，将物品放置在每个空间里。没有对话、没有除偶尔的箱子标签外的文字、没有分数、没有失败状态。整个故事通过她拥有的东西和她保留的东西来讲述：穿越每次搬家的童年毛绒玩具、她的物品有些格格不入的前男友的房子、她最终完全属于自己的空间。大多数玩家至少哭一次。完成需要大约 3-4 小时，可在 Xbox Game Pass、Nintendo Switch 等平台获取。过去十年最受好评的独立游戏之一。',
    tip_en: "Don't rush placing objects — take your time reading the room and putting things where they feel right, not just where they technically fit.",
    tip_zh: '不要急于放置物品——花时间阅读房间，把东西放在感觉对的地方，而不仅仅是技术上合适的地方。',
  },
  'little-left': {
    title_en: 'A Little to the Left',
    title_zh: 'A Little to the Left',
    emoji: '🗂️',
    tag_en: 'Satisfying organization puzzles with no wrong answers',
    tag_zh: '令人满足的整理谜题，没有错误答案',
    platform_en: 'Available on: Nintendo Switch, PC (Steam), iOS/Android (Apple Arcade), Xbox Game Pass',
    platform_zh: '可在以下平台获取：Nintendo Switch、PC（Steam）、iOS/Android（Apple Arcade）、Xbox Game Pass',
    why_en:
      "A Little to the Left is exactly the game your brain is asking for — organization puzzles that trigger the same satisfying instinct as aligning books by color, arranging items by size, or creating perfect patterns. Each puzzle presents a collection of everyday objects (pencils, stamps, kitchen utensils, plants) and asks you to arrange them. There is often more than one valid solution, and the game rewards creative thinking about how things could be grouped or sorted. There's a delightful mischievous cat that occasionally undoes your work. Puzzles range from 2-10 minutes each, making it ideal for short sessions. The Cupboards & Drawers DLC adds substantial extra content. Available on Apple Arcade (included with subscription), Xbox Game Pass, and Steam.",
    why_zh:
      'A Little to the Left 正是你的大脑所需的游戏——触发与按颜色对齐书籍、按大小排列物品或创造完美图案相同满足感的整理谜题。每个谜题呈现一系列日常物品（铅笔、邮票、厨房用具、植物），要求你排列它们。通常不止一个有效解决方案，游戏奖励对物品如何分组或排序的创造性思考。有一只迷人的淘气猫偶尔会破坏你的工作。谜题从 2-10 分钟不等，非常适合短暂的游戏时段。Cupboards & Drawers DLC 增加了大量额外内容。可在 Apple Arcade（包含在订阅中）、Xbox Game Pass 和 Steam 上获取。',
    tip_en: 'When a puzzle stumps you, try thinking about category instead of appearance — groupings by function sometimes reveal the hidden pattern.',
    tip_zh: '当谜题难住你时，尝试从类别而非外观来思考——按功能分组有时会揭示隐藏的规律。',
  },
  wylde: {
    title_en: 'Wylde Flowers',
    title_zh: 'Wylde Flowers',
    emoji: '🌸',
    tag_en: 'Farming + magic + wholesome story with real heart',
    tag_zh: '农业 + 魔法 + 真诚温馨的故事',
    platform_en: 'Available on: iOS/Android (Apple Arcade), PC (Steam), Nintendo Switch',
    platform_zh: '可在以下平台获取：iOS/Android（Apple Arcade）、PC（Steam）、Nintendo Switch',
    why_en:
      "Wylde Flowers is an indie farming game with a generous heart — and it's exactly what you are looking for. You play as Tara, a city woman who inherits her grandmother's farm in a small coastal town and discovers she is a witch. The game combines traditional farming (crops, animals, seasons) with a witches' coven, potion crafting, and a full story with voiced characters and romance options. The writing is warm, the characters are diverse and well-written, and the story handles themes of belonging and self-discovery with genuine care. It started as an Apple Arcade exclusive and is now also available on Steam and Switch. Most players complete the main story in 20-30 hours while leaving plenty of farming to continue afterward.",
    why_zh:
      'Wylde Flowers 是一款有着慷慨内心的独立农场游戏——它正是你在寻找的。你扮演 Tara，一位在一个小海滨小镇继承外祖母农场并发现自己是女巫的城市女性。游戏将传统农业（作物、动物、季节）与女巫集会、药水制作以及有声角色和恋爱选项的完整故事相结合。写作温暖，角色多样且有深度，故事以真诚的关怀处理归属感和自我发现的主题。它最初是 Apple Arcade 独占，现在也可在 Steam 和 Switch 上获取。大多数玩家在 20-30 小时内完成主故事，同时之后仍有大量农业内容可以继续。',
    tip_en: 'Join the coven early — the potion recipes you learn unlock some of the best farm upgrades and reveal the most interesting story beats.',
    tip_zh: '尽早加入女巫集会——你学到的药水配方解锁了一些最好的农场升级，并揭示了最有趣的故事情节。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { grove: 0, unpacking: 0, 'little-left': 0, wylde: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyIndieQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-indie-games`
    const shareText = isZh
      ? `测出我最应该玩的独立 cozy 游戏是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My indie cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              ? 'TendFarm 正在研发农场节律追踪功能——把 cozy 游戏的生活节奏带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the intentional pace of these games into your real daily life.'}
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
            ? '你应该玩哪款独立 Cozy 游戏？'
            : 'Which Indie Cozy Game Should You Play?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，在 Cozy Grove、Unpacking、A Little to the Left 和 Wylde Flowers 之间找到最适合你的'
            : '6 questions to find your match across Cozy Grove, Unpacking, A Little to the Left, and Wylde Flowers'}
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
        {isZh ? '找到我的独立游戏' : 'Find My Indie Cozy Game'}
      </button>
    </div>
  )
}
