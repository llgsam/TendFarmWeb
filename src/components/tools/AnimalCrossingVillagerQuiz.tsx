'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Villager = 'isabelle' | 'raymond' | 'stitches' | 'marshal'

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
  options: Array<{ en: string; zh: string; type: Villager }>
}> = [
  {
    q_en: 'Your ideal Saturday morning looks like:',
    q_zh: '你理想的周六早晨是什么样的？',
    options: [
      { en: "Helping someone with their errands — nothing beats feeling useful", zh: '帮朋友跑腿办事——没什么比帮到人更开心了', type: 'isabelle' },
      { en: "Curating the perfect outfit before anything else", zh: '精心搭配今天的穿搭，才能出门', type: 'raymond' },
      { en: "Staying in bed with snacks and a feel-good show", zh: '窝在被子里嗑零食看番剧', type: 'stitches' },
      { en: "Making something creative — a drawing, a playlist, anything", zh: '做点创意的事——画画、整理歌单，随便什么', type: 'marshal' },
    ],
  },
  {
    q_en: 'A new neighbor moves in nearby. You:',
    q_zh: '邻居搬来了新住户，你会怎么做？',
    options: [
      { en: "Plan a welcome gathering immediately", zh: '马上张罗个欢迎会', type: 'isabelle' },
      { en: "Observe first — you'll introduce yourself when the timing feels right", zh: '先观察一下，时机成熟了再自我介绍', type: 'raymond' },
      { en: "Bake cookies and knock on their door that same day", zh: '当天就烤饼干去敲门送过去', type: 'stitches' },
      { en: "Leave a small note or plant at their door anonymously", zh: '匿名在门口放一盆小植物或一张便条', type: 'marshal' },
    ],
  },
  {
    q_en: 'Your living space is best described as:',
    q_zh: '你的生活空间最像哪种风格？',
    options: [
      { en: "Organized and warm — full of things tied to people you love", zh: '整洁温馨——很多东西都跟你在乎的人有关联', type: 'isabelle' },
      { en: "Impeccable — every piece is chosen with intention", zh: '无懈可击——每件东西都是精心挑选的', type: 'raymond' },
      { en: "Cozy chaos — pillows, plushies, fairy lights everywhere", zh: '温馨混乱——到处是抱枕、公仔和小彩灯', type: 'stitches' },
      { en: "A creative studio — art supplies, books, indie finds", zh: '创意工作室风格——艺术材料、书籍和独立感小物件', type: 'marshal' },
    ],
  },
  {
    q_en: 'A friend is going through a hard time. You:',
    q_zh: '朋友遇到了困难，你会怎么做？',
    options: [
      { en: "Drop everything to be with them — logistics can wait", zh: '放下一切陪在他们身边——其他事都能等', type: 'isabelle' },
      { en: "Give clear, practical advice — you know what usually works", zh: '给出清晰实用的建议——你知道什么通常有效', type: 'raymond' },
      { en: "Show up with their favorite snacks and zero agenda", zh: '拎着他们最爱的零食出现，什么都不问', type: 'stitches' },
      { en: "Send something meaningful — a song, an article, a sketch", zh: '发一首歌、一篇文章或一幅画给他们', type: 'marshal' },
    ],
  },
  {
    q_en: 'Your biggest strength according to people who know you:',
    q_zh: '认识你的人觉得你最大的优点是？',
    options: [
      { en: "You make everyone feel seen and genuinely valued", zh: '你能让每个人都感觉自己被真正重视', type: 'isabelle' },
      { en: "Your taste — you know what's cool before anyone else", zh: '你的品味——你总是比别人更早发现什么是好的', type: 'raymond' },
      { en: "Your ability to find joy in absolutely anything", zh: '你能从任何事情中找到快乐的能力', type: 'stitches' },
      { en: "You notice things others walk right past", zh: '你会注意到别人完全忽略的事物', type: 'marshal' },
    ],
  },
  {
    q_en: 'In Animal Crossing, your favorite activity is:',
    q_zh: '在动物森友会里，你最喜欢做的事是？',
    options: [
      { en: "Organizing seasonal events and improving your island rating", zh: '操办季节活动，努力提升岛屿评级', type: 'isabelle' },
      { en: "Designing the perfect island layout and custom outfits", zh: '设计完美的岛屿布局和自定义服装', type: 'raymond' },
      { en: "Chatting with every villager and finding your favorites", zh: '和每个村民聊天，找到自己最喜欢的', type: 'stitches' },
      { en: "Hunting rare furniture pieces for your curated home", zh: '到处搜寻稀有家具，打造精心策划的房间', type: 'marshal' },
    ],
  },
]

const RESULTS: Record<
  Villager,
  {
    name_en: string
    name_zh: string
    emoji: string
    species_en: string
    species_zh: string
    desc_en: string
    desc_zh: string
    gift_en: string
    gift_zh: string
  }
> = {
  isabelle: {
    name_en: 'Isabelle',
    name_zh: '西施惠',
    emoji: '🌟',
    species_en: 'Shih Tzu · Town Secretary',
    species_zh: '西施犬 · 镇秘书',
    desc_en:
      "You are Isabelle — the warm, endlessly dedicated heart of your community. You show up for people before they ask, remember the small details that matter, and have an uncanny ability to make everyone feel like the most important person in the room. Your enthusiasm is genuine and people feel it.",
    desc_zh:
      '你是西施惠——温暖、无限投入的社区灵魂。你在别人开口之前就已经出现，记住所有重要的小细节，有一种神奇的能力让每个人都感觉自己是最重要的存在。你的热情是真诚的，人们都能感受到。',
    gift_en:
      "She would bring you a freshly baked treat with a handwritten note referencing something you mentioned weeks ago — proof she actually listens.",
    gift_zh:
      '她会带来一份新鲜烘焙的点心，附一张手写便条，提到你好几周前随口说过的某件事——证明她一直在认真听。',
  },
  raymond: {
    name_en: 'Raymond',
    name_zh: '雷蒙德',
    emoji: '👔',
    species_en: 'Cat · Smug Personality',
    species_zh: '猫 · 自信型',
    desc_en:
      "You are Raymond — effortlessly cool, style-forward, and quietly perceptive. You don't chase trends; you set them. You notice quality immediately, have impeccable taste in everything from music to furniture, and carry yourself with a calm confidence that others find magnetic. You're selective about who gets close — but those who do feel very lucky.",
    desc_zh:
      '你是雷蒙德——毫不费力地 cool、走在潮流前沿，又有着敏锐的洞察力。你不追逐潮流，你创造潮流。你能立刻感受到品质，对音乐到家居的一切都有无可挑剔的品味，带着一种让人着迷的冷静自信。你对亲近的人有所选择，但被你选中的人都会感到很幸运。',
    gift_en:
      "He would find some obscure, perfectly-curated item before anyone else knows it exists — and hand it to you with zero explanation, knowing you would understand.",
    gift_zh:
      '他会在任何人意识到它存在之前找到某件小众而完美的东西——毫无解释地送给你，因为他知道你会懂。',
  },
  stitches: {
    name_en: 'Stitches',
    name_zh: '布丁',
    emoji: '🧸',
    species_en: 'Cub · Lazy Personality',
    species_zh: '熊宝宝 · 懒散型',
    desc_en:
      "You are Stitches — pure, cozy, and overflowing with genuine wonder. You find magic in ordinary moments: a good snack, a rainy afternoon, a new episode of something cozy. You are the kind of friend whose presence alone makes people feel safe. Your enthusiasm is never performative — it is simply how you actually are.",
    desc_zh:
      '你是布丁——纯真、舒适，充满真实的惊喜感。你能在普通的时刻发现魔法：一个好零食、一个雨天下午、一集新出的温馨番剧。你是那种光是在场就能让人感到安全的朋友。你的热情从来不是表演——那就是你真实的样子。',
    gift_en:
      "He would show up with your favorite snack and a plushie he made himself — just because he thought you might need a cozy day.",
    gift_zh:
      '他会带着你最爱的零食和一个他自己做的小公仔出现，只是因为他觉得你今天可能需要一个窝在家里的日子。',
  },
  marshal: {
    name_en: 'Marshal',
    name_zh: '松风',
    emoji: '🎵',
    species_en: 'Squirrel · Smug Personality',
    species_zh: '松鼠 · 自信型',
    desc_en:
      "You are Marshal — artistic, introspective, and quietly extraordinary. You have a deep aesthetic sensibility that shows in everything you create and collect. The right people just get your taste without explanation. You are intensely loyal to the things and people you love, and your creative inner world is richer than most will ever know.",
    desc_zh:
      '你是松风——有艺术感、喜欢内省，安静地与众不同。你有深刻的美学感受力，体现在你创造和收藏的一切事物上。对的人不需要解释就能理解你的品味。你对你爱的人和事物忠诚到极致，你的创意内心世界比大多数人所知道的要丰富得多。',
    gift_en:
      "He would send you a playlist at 11pm with zero context — just tracks that perfectly described your current season of life.",
    gift_zh:
      '他会在晚上 11 点给你发一个毫无解释的歌单——只是他觉得这些歌完美地描述了你现在所处的人生阶段。',
  },
}

function calcResult(answers: Villager[]): Villager {
  const counts: Record<Villager, number> = { isabelle: 0, raymond: 0, stitches: 0, marshal: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Villager
}

export function AnimalCrossingVillagerQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Villager | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Villager[])]
    const url = `${BASE_URL}/${locale}/quizzes/animal-crossing-villager`
    const shareText = isZh
      ? `我的动物森友会村民人格是「${result.name_zh}」！快来测测你是谁：${url}`
      : `I got "${result.name_en}" on the Animal Crossing Villager Quiz! Who are you? ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.species_zh : result.species_en}</p>
          <h2 className="mb-3 text-2xl font-bold text-[#f0a832]">
            {isZh ? result.name_zh : result.name_en}
          </h2>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh ? result.desc_zh : result.desc_en}
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-2 text-sm font-semibold text-[#e8dcc8]">
            {isZh ? '如果他们是你的朋友...' : 'If they were your friend...'}
          </h3>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh ? result.gift_zh : result.gift_en}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把 Cozy 游戏的季节感带入你的真实生活节奏。'
              : 'TendFarm is building a farm rhythm tracker — bringing the seasonal feeling of cozy games into real life.'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} isZh={isZh} />
          <button
            onClick={() => {
              setAnswers(Array(QUESTIONS.length).fill(null))
              setSubmitted(false)
            }}
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
          {isZh ? '你是哪位动物森友会村民？' : 'Which Animal Crossing Villager Are You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh ? '6 个问题，找到最像你的那位村民' : '6 questions to find your ACNH villager match'}
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
                  onClick={() => {
                    const next = [...answers]
                    next[qi] = opt.type
                    setAnswers(next)
                  }}
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
          allAnswered
            ? 'bg-[#f0a832] text-[#0f1a0f] hover:bg-[#e09822]'
            : 'cursor-not-allowed bg-[#2d3d2d] text-[#4a5a4a]'
        }`}
      >
        {isZh ? '查看结果' : 'See My Result'}
      </button>
    </div>
  )
}
