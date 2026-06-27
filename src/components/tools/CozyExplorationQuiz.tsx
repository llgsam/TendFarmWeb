'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'firewatch' | 'edith-finch' | 'short-hike' | 'abzu'

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
    q_en: 'What kind of world do you most want to get lost in right now?',
    q_zh: '你现在最想迷失在哪种世界中？',
    options: [
      { en: 'A vast Wyoming wilderness — towering pines, canyon vistas, total isolation', zh: '广阔的怀俄明荒野——参天松树、峡谷美景、完全的孤寂', type: 'firewatch' },
      { en: 'The rooms of an old house full of secret passages and lives that ended too soon', zh: '一座老房子的各个房间，充满秘密通道和过早结束的生命', type: 'edith-finch' },
      { en: 'A sunlit mountain with gentle slopes, hidden beaches, and friendly animals everywhere', zh: '一座阳光照耀的山，有平缓的坡道、隐藏的海滩，以及随处可见的友好动物', type: 'short-hike' },
      { en: 'A luminous coral ocean with impossible ruins and creatures of pure light', zh: '一片发光的珊瑚海洋，有不可思议的废墟和纯粹光芒的生物', type: 'abzu' },
    ],
  },
  {
    q_en: 'How important is human connection or dialogue in this experience?',
    q_zh: '人际联系或对话在这段体验中有多重要？',
    options: [
      { en: 'Very — I want meaningful conversations with another character that change how I feel', zh: '非常重要——我想要与另一个角色进行改变我感受的有意义对话', type: 'firewatch' },
      { en: 'Through stories — I want to discover other people\'s lives and feel their weight', zh: '通过故事——我想发现其他人的生活并感受其分量', type: 'edith-finch' },
      { en: 'Light — friendly chats with villagers, but mostly I want free exploration', zh: '轻度——和村民友好聊天，但我主要想要自由探索', type: 'short-hike' },
      { en: 'None — I want a purely wordless, musical experience with no dialogue at all', zh: '不需要——我想要完全无语言的、音乐性的体验，完全没有对话', type: 'abzu' },
    ],
  },
  {
    q_en: 'What emotional tone are you looking for?',
    q_zh: '你在寻找什么情感基调？',
    options: [
      { en: 'Bittersweet — a story about isolation, connection, and things unsaid', zh: '苦乐参半——一个关于孤立、联系和未说出口的话的故事', type: 'firewatch' },
      { en: 'Melancholy and wonder — a meditation on mortality and what lives leave behind', zh: '忧郁和惊奇——对死亡率和生命留下什么的沉思', type: 'edith-finch' },
      { en: 'Warm and light — I just want to feel good and enjoy a beautiful place', zh: '温暖而轻盈——我只想感觉良好并享受美丽的地方', type: 'short-hike' },
      { en: 'Transcendent — I want to feel small and awed by something vast and beautiful', zh: '超然——我想感到渺小，并对宏大而美丽的事物肃然起敬', type: 'abzu' },
    ],
  },
  {
    q_en: 'How much do you enjoy a sense of mystery or unease in your games?',
    q_zh: '你多喜欢游戏中的神秘感或不安感？',
    options: [
      { en: 'A lot — I love when a peaceful game hides something unsettling underneath', zh: '非常喜欢——我喜欢当平和的游戏在下面隐藏不安的东西', type: 'firewatch' },
      { en: 'Moderate — the game is unsettling, but in a way that feels meaningful, not scary', zh: '适中——游戏令人不安，但以一种感觉有意义而不是可怕的方式', type: 'edith-finch' },
      { en: 'Not much — I want zero unease, just pure gentle joy', zh: '不多——我想要零不安感，只有纯粹温和的快乐', type: 'short-hike' },
      { en: 'None — I want serene, flowing peace with no tension at all', zh: '没有——我想要宁静、流动的平和，完全没有紧张感', type: 'abzu' },
    ],
  },
  {
    q_en: 'How long do you want this experience to be?',
    q_zh: '你希望这段体验持续多长时间？',
    options: [
      { en: '4-6 hours — enough to really inhabit a world and feel a complete story', zh: '4-6 小时——足以真正居住在一个世界中并感受一个完整的故事', type: 'firewatch' },
      { en: '2-3 hours — brief but with a weight that stays with you for much longer', zh: '2-3 小时——短暂但带着比游戏本身持续更长时间的重量', type: 'edith-finch' },
      { en: '1-4 hours — I want to play at my own pace with no pressure to finish quickly', zh: '1-4 小时——我想按自己的节奏玩，没有快速完成的压力', type: 'short-hike' },
      { en: '1-2 hours — a complete sensory journey that does not overstay its welcome', zh: '1-2 小时——一段完整的感官旅程，不会让人觉得过长', type: 'abzu' },
    ],
  },
  {
    q_en: 'What do you want to feel when the game ends?',
    q_zh: '你希望游戏结束时感受到什么？',
    options: [
      { en: 'Like I was there — the world felt so real I could smell the smoke', zh: '就像我曾在那里——世界感觉如此真实，我几乎能闻到烟雾的味道', type: 'firewatch' },
      { en: 'Changed — this story made me think about my own life and mortality differently', zh: '被改变了——这个故事让我以不同方式思考自己的生活和死亡', type: 'edith-finch' },
      { en: 'Replenished — I feel lighter than when I started, like a good afternoon outside', zh: '被补充了——我感觉比开始时更轻盈，就像一个美好的午后户外时光', type: 'short-hike' },
      { en: 'Expanded — the world is vast and beautiful and I am glad to be in it', zh: '被扩展了——世界广阔而美丽，我很高兴身处其中', type: 'abzu' },
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
  firewatch: {
    title_en: 'Firewatch',
    title_zh: 'Firewatch（看火人）',
    emoji: '🌲',
    tag_en: 'A Wyoming wilderness mystery — stunning visuals, unforgettable dialogue, bittersweet ending',
    tag_zh: '怀俄明荒野悬疑——惊艳视觉、难忘对话、苦乐参半的结局',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    why_en:
      "Firewatch is one of the most visually stunning games ever made. You play as Henry, a man escaping his life who takes a summer job as a fire lookout in the Wyoming backcountry. Your only connection to another human is your supervisor Delilah, reached by walkie-talkie — and your relationship with her, built entirely through dialogue choices over the course of a summer, is one of the most genuinely felt relationships in any game. The wilderness itself is rendered in painterly, impressionistic beauty. And then, gradually, something strange starts happening in the forest. Firewatch is 4-6 hours long, bittersweet in ways you will not expect, and designed to be experienced in one or two sittings. It has one of the best voice acting performances ever recorded in a game. Campo Santo's masterwork.",
    why_zh:
      '看火人是有史以来视觉上最震撼的游戏之一。你扮演 Henry，一个逃离生活的人，在怀俄明内陆担任夏季护林瞭望员。你与另一个人唯一的联系是你的主管 Delilah，通过对讲机联系——而你与她的关系，完全通过整个夏天的对话选择建立，是任何游戏中最真实感受到的关系之一。荒野本身以绘画般的印象派美感呈现。然后，渐渐地，森林里开始发生奇怪的事情。看火人时长 4-6 小时，以你意想不到的方式苦乐参半，设计用于一到两次连续游玩体验。它拥有游戏中有史以来录制的最佳配音表演之一。Campo Santo 的杰作。',
    tip_en: "Play with headphones — the ambient wilderness sounds and Olly Moss's visual design create a sensory experience that deserves full attention.",
    tip_zh: '戴耳机玩——环境荒野音效和 Olly Moss 的视觉设计创造了一种值得全神贯注的感官体验。',
  },
  'edith-finch': {
    title_en: 'What Remains of Edith Finch',
    title_zh: '艾迪芬奇的记忆',
    emoji: '🏚️',
    tag_en: 'A walking sim about a family of deaths — the most acclaimed story game of the decade',
    tag_zh: '关于一个死亡家族的步行模拟游戏——十年来最受好评的故事游戏',
    platform_en: 'Available on: PC (Steam), PlayStation 4/5, Xbox (Game Pass), Nintendo Switch',
    platform_zh: '可在以下平台获取：PC（Steam）、PlayStation 4/5、Xbox（Game Pass）、Nintendo Switch',
    why_en:
      "What Remains of Edith Finch won the BAFTA for Best Game and is consistently cited as one of the greatest narrative games ever made. You return to your family's sprawling, impossibly layered house as the last surviving Finch — every family member died under strange or tragic circumstances, and each room tells their story. Each chapter plays completely differently: one is a first-person bathtub fantasy, one is a comic strip, one is you operating a cannery knife while daydreaming. The game is 2-3 hours long but the stories stay with you far longer. It is not cozy in the traditional sense — it is about mortality and family — but it is one of those games that proves what games can do as a medium. Available on Xbox Game Pass.",
    why_zh:
      '艾迪芬奇的记忆获得了英国影视艺术学院最佳游戏奖，并被一致认为是有史以来最伟大的叙事游戏之一。你作为最后幸存的芬奇家族成员回到家族那座错综复杂的房子——每个家族成员都在奇怪或悲剧性的情况下死亡，每个房间都讲述他们的故事。每章的玩法完全不同：一章是第一人称浴缸幻想，一章是漫画形式，一章是你在做白日梦时操作罐头厂刀具。游戏时长 2-3 小时，但故事留存的时间远比这更长。它在传统意义上并不温馨——它关于死亡率和家庭——但它是那些证明游戏作为媒介能做什么的游戏之一。可在 Xbox Game Pass 上获取。',
    tip_en: "Do not read anything about it beforehand — the discoveries in each room are best experienced without knowing what is coming.",
    tip_zh: '之前不要读任何关于它的资料——每个房间的发现最好在不知道接下来会发生什么的情况下体验。',
  },
  'short-hike': {
    title_en: 'A Short Hike',
    title_zh: '短途徒步（A Short Hike）',
    emoji: '⛰️',
    tag_en: 'The coziest mountain game ever made — $8, one afternoon, pure warmth',
    tag_zh: '有史以来最温馨的山地游戏——8 美元、一个下午、纯粹的温暖',
    platform_en: 'Available on: PC (Steam/itch.io), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_zh: '可在以下平台获取：PC（Steam/itch.io）、Nintendo Switch、PlayStation 4/5、Xbox',
    why_en:
      "A Short Hike is a small, perfect game. You are Claire, a young bird spending the summer on Hawk Peak Provincial Park, and your goal is to climb to the top of the mountain. There is no time limit, no fail state, no pressure of any kind. The mountain is small enough to feel intimate and large enough to reward exploration — hidden beaches, secret items, fishing spots, other hikers who stop to chat. The game costs about $8 and takes 1-4 hours depending on how much you explore. It has a distinctive lo-fi pixel art style and a soundtrack (by Mark Sparling) that is one of the most reliably comfortable pieces of music in any game. When people describe 'the game that gave me peace,' this is the one they often mean. One of the most acclaimed indie games of the past decade.",
    why_zh:
      '短途徒步是一款小而完美的游戏。你是 Claire，一只在鹰峰省立公园度过夏天的年轻鸟，你的目标是爬到山顶。没有时间限制、没有失败状态、没有任何压力。这座山足够小以感觉亲密，又足够大以奖励探索——隐藏的海滩、秘密物品、钓鱼点，以及会停下来聊天的其他徒步者。游戏价格约 8 美元，根据你探索多少需要 1-4 小时。它有独特的低保真像素艺术风格，以及（由 Mark Sparling 创作的）任何游戏中最可靠令人舒适的原声之一。当人们描述"给我带来平静的游戏"时，这往往就是他们的意思。过去十年中最受好评的独立游戏之一。',
    tip_en: "Collect Golden Feathers — they let you float and climb faster, and the mountain reveals itself completely differently once you can soar.",
    tip_zh: '收集金色羽毛——它们让你漂浮和更快攀登，一旦你能翱翔，这座山就以完全不同的方式展现自己。',
  },
  abzu: {
    title_en: 'Abzû',
    title_zh: 'Abzû',
    emoji: '🌊',
    tag_en: 'A wordless underwater journey — the most beautiful 90-minute meditation in games',
    tag_zh: '无语言的水下旅程——游戏中最美丽的 90 分钟冥想',
    platform_en: 'Available on: PC (Steam), PlayStation 4/5, Xbox (Game Pass), Nintendo Switch',
    platform_zh: '可在以下平台获取：PC（Steam）、PlayStation 4/5、Xbox（Game Pass）、Nintendo Switch',
    why_en:
      "Abzû was made by Giant Squid Studios, founded by the art director of Journey — and that lineage shows in every frame. You are a diver exploring a vast, luminous ocean. There is no combat, no dialogue, no inventory, no map. You swim through coral reefs teeming with hundreds of species of fish; you find hidden meditation pools where you can sit and watch the ecosystem around you; you encounter ancient ruins that slowly reveal a wordless mythology. The game is about 90 minutes long and has a genuine ending. What it does in those 90 minutes — the visual spectacle, the Austin Wintory soundtrack (same composer as Journey), the sense of being genuinely immersed in a living underwater world — earns it a place as one of the most beautiful games ever made. Available on Xbox Game Pass.",
    why_zh:
      'Abzû 由 Giant Squid Studios 制作，该工作室由 Journey 的艺术总监创立——这一传承在每一帧中都体现出来。你是一名探索广阔发光海洋的潜水员。没有战斗、没有对话、没有物品栏、没有地图。你穿过栖息着数百种鱼类的珊瑚礁；你发现隐藏的冥想水池，在那里你可以坐下来观察周围的生态系统；你遇到古老的遗迹，慢慢揭示一个无语言的神话。游戏时长约 90 分钟，有一个真正的结局。在这 90 分钟里它做的事情——视觉奇观、Austin Wintory 原声（与 Journey 同一作曲家）、真正沉浸在活生生的水下世界中的感觉——使它成为有史以来最美丽的游戏之一。可在 Xbox Game Pass 上获取。',
    tip_en: "Find every meditation pool and sit in each one for a full minute — watching the fish school around you is the core of what this game offers.",
    tip_zh: '找到每个冥想水池，在每个水池中坐满一分钟——观察鱼群在你周围游动是这款游戏提供的核心体验。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    firewatch: 0,
    'edith-finch': 0,
    'short-hike': 0,
    abzu: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyExplorationQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-exploration-games`
    const shareText = isZh
      ? `我的氛围探索游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My atmospheric exploration game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {isZh ? '体验小贴士：' : 'For the best experience: '}
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
            ? '你应该玩哪款氛围探索游戏？'
            : 'Which Atmospheric Exploration Game Should You Play?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，在看火人、艾迪芬奇的记忆、短途徒步和 Abzû 中找到最适合你的短篇探索体验'
            : '6 questions to find your match across Firewatch, What Remains of Edith Finch, A Short Hike, and Abzû'}
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
        {isZh ? '找到我的探索游戏' : 'Find My Exploration Game'}
      </button>
    </div>
  )
}
