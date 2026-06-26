'use client'

import { useState } from 'react'
import Link from 'next/link'

type Match = 'abigail' | 'leah' | 'penny' | 'emily' | 'sebastian' | 'harvey'

interface Option {
  zh: string
  en: string
  type: Match
}

interface Question {
  zh: string
  en: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    zh: '感情里，你最看重什么？',
    en: 'In a relationship, what matters most to you?',
    options: [
      { zh: '一起探险、保持新鲜感', en: 'Adventuring together and keeping things exciting', type: 'abigail' },
      { zh: '互相理解，支持彼此的梦想', en: 'Mutual understanding and supporting each other\'s dreams', type: 'leah' },
      { zh: '温暖稳定，在对方身边感到安心', en: 'Warmth and stability — feeling safe with each other', type: 'penny' },
      { zh: '惊喜感，灵性上的共鸣', en: 'Surprises and a deeper spiritual connection', type: 'emily' },
      { zh: '深度理解，不需要多说就懂你', en: 'Being truly understood without needing to explain yourself', type: 'sebastian' },
      { zh: '体贴关心，知道对方始终在乎你', en: 'Thoughtfulness — knowing the other person always cares', type: 'harvey' },
    ],
  },
  {
    zh: '你们第一次约会，最理想的场景是？',
    en: 'The perfect first date looks like:',
    options: [
      { zh: '去一个有点神秘/刺激的地方探险', en: 'Exploring somewhere a little mysterious or thrilling', type: 'abigail' },
      { zh: '参观对方的工作室或创作空间', en: "Visiting their studio or creative space", type: 'leah' },
      { zh: '一起做顿饭，在家聊很久', en: 'Cooking dinner together and talking for hours', type: 'penny' },
      { zh: '去一个很有特色的地方，被惊喜到', en: 'A unique, unexpected place that surprises you', type: 'emily' },
      { zh: '深夜咖啡馆，聊很多心里话', en: 'A late-night café, talking about things that actually matter', type: 'sebastian' },
      { zh: '在公园散步，轻松无压力', en: 'A walk in the park — relaxed, no pressure', type: 'harvey' },
    ],
  },
  {
    zh: '在感情里，你最担心出现什么？',
    en: 'What worries you most in a relationship?',
    options: [
      { zh: '太平淡，失去新鲜感', en: 'Getting too comfortable and losing the spark', type: 'abigail' },
      { zh: '为了对方失去自我', en: 'Losing yourself to please someone else', type: 'leah' },
      { zh: '对方不够稳定，让你没有安全感', en: 'Instability — not feeling secure with each other', type: 'penny' },
      { zh: '灵魂没有共鸣，只是相处', en: 'Just coexisting without a deeper soul-level connection', type: 'emily' },
      { zh: '对方不真正理解你内心的复杂', en: "Being misunderstood — they don't see your inner depth", type: 'sebastian' },
      { zh: '对方忽视你的感受', en: "Your feelings being overlooked or dismissed", type: 'harvey' },
    ],
  },
  {
    zh: '你更希望和伴侣共享哪种日常？',
    en: 'What kind of everyday life do you want to share?',
    options: [
      { zh: '随时来一场说走就走的小冒险', en: 'Spontaneous little adventures whenever the mood strikes', type: 'abigail' },
      { zh: '各自做自己的事，但在一起', en: 'Doing your own things side by side — companionable silence', type: 'leah' },
      { zh: '一起处理生活细节，照顾彼此', en: 'Handling everyday life together, taking care of each other', type: 'penny' },
      { zh: '互相带来不一样的视角和可能性', en: 'Constantly expanding each other\'s perspective', type: 'emily' },
      { zh: '不用时刻联系，但懂得彼此', en: "Not always in touch, but always in sync", type: 'sebastian' },
      { zh: '关注彼此的状态，主动照顾对方', en: 'Checking in on each other and taking gentle care', type: 'harvey' },
    ],
  },
  {
    zh: '你希望伴侣是什么样的人？',
    en: 'What kind of person do you want your partner to be?',
    options: [
      { zh: '真实、有点叛逆，不在乎别人眼光', en: 'Authentic, a little rebellious, unbothered by others\' opinions', type: 'abigail' },
      { zh: '有自己的热情和梦想，独立', en: 'Independent, with their own passions and goals', type: 'leah' },
      { zh: '温柔有耐心，以家庭和感情为重', en: 'Gentle and patient, who puts family and love first', type: 'penny' },
      { zh: '充满创意，带给你意外和惊喜', en: 'Endlessly creative — always surprising you', type: 'emily' },
      { zh: '内敛有深度，值得慢慢了解', en: 'Quiet but deep — someone worth taking time to know', type: 'sebastian' },
      { zh: '可靠、体贴，关心你多于自己', en: 'Reliable and considerate — they put you before themselves', type: 'harvey' },
    ],
  },
  {
    zh: '你最想在对方身上感受到什么？',
    en: 'What do you most want to feel from a partner?',
    options: [
      { zh: '「和你在一起，什么都可能发生」', en: '"Anything could happen when I\'m with you"', type: 'abigail' },
      { zh: '「你理解我，不需要我解释」', en: '"You get me without me having to explain"', type: 'leah' },
      { zh: '「你让我感到回家了」', en: '"You feel like home"', type: 'penny' },
      { zh: '「你让我看到世界更多的可能」', en: '"You show me the world is bigger than I thought"', type: 'emily' },
      { zh: '「你不评判我，接受我所有的复杂」', en: '"You accept all of me — the complicated parts too"', type: 'sebastian' },
      { zh: '「我生病的时候你一定会在」', en: '"I know you\'ll be there when I need you"', type: 'harvey' },
    ],
  },
]

interface Result {
  type: Match
  nameZh: string
  nameEn: string
  emoji: string
  taglineZh: string
  taglineEn: string
  descZh: string
  descEn: string
  whyZh: string
  whyEn: string
  hookZh: string
  hookEn: string
}

const RESULTS: Record<Match, Result> = {
  abigail: {
    type: 'abigail',
    nameZh: '艾比盖尔',
    nameEn: 'Abigail',
    emoji: '💜',
    taglineZh: '你需要一个冒险同伴',
    taglineEn: 'You need an adventure partner',
    descZh:
      '你渴望的感情，是那种让你觉得「和你在一起，什么都可能」的关系。艾比盖尔正是那种人——她不会让关系变得无聊，她喜欢冒险、游戏、挑战，也同样享受深夜聊奇怪的事情。你们的感情不需要仪式感，只需要真实和新鲜。',
    descEn:
      "You want a relationship that makes anything feel possible. Abigail is exactly that kind of partner — she'd never let things get boring. She loves adventure, games, and exploring the unknown, and she's equally at home with late-night conversations about strange things. Your relationship wouldn't need grand gestures — just authenticity and a sense of possibility.",
    whyZh: '为什么是艾比盖尔：她是那种不会让你觉得「我们只是在过日子」的人。',
    whyEn: "Why Abigail: She's the one who'll never let you feel like you're just going through the motions.",
    hookZh:
      'TendFarm 的冒险型玩家——你们的健康数据每天都在创造新变化：今天多走了几步，农场就出现新的发现。就像和艾比盖尔一起，每天都有点不同。',
    hookEn:
      "TendFarm for the adventurer — your health data creates new surprises every day: walk more today, discover something new in the farm. Like being with Abigail, every day is a little different.",
  },
  leah: {
    type: 'leah',
    nameZh: '莉亚',
    nameEn: 'Leah',
    emoji: '🌿',
    taglineZh: '你需要一个真正理解你的人',
    taglineEn: 'You need someone who truly understands you',
    descZh:
      '你不需要随时的陪伴，但你需要当你在那里的时候，对方真的懂你。莉亚是那种尊重你独立性、有自己梦想、但深深理解你的人。你们的关系不需要解释，只需要存在——各自做自己的事，但在一起时感到完整。',
    descEn:
      "You don't need constant togetherness — you need someone who truly gets you when you are together. Leah respects your independence, has her own dreams, and understands you at a level that doesn't need words. Your relationship wouldn't need explaining — just two complete people, stronger together.",
    whyZh: '为什么是莉亚：她不会试图改变你，只是和你一起，做更好的自己。',
    whyEn: "Why Leah: She won't try to change you — just grow alongside you.",
    hookZh:
      'TendFarm 为莉亚式的关系设计：不需要解释，不需要操作，你的生活节律自然驱动农场生长。真实的生活，就是最好的农场设计。',
    hookEn:
      "TendFarm is built for Leah-types: no explanation needed, no manual input — your real life rhythms drive the farm naturally. Authentic living is the best farm design.",
  },
  penny: {
    type: 'penny',
    nameZh: '潘妮',
    nameEn: 'Penny',
    emoji: '📚',
    taglineZh: '你需要一段让你感到回家的感情',
    taglineEn: 'You need a relationship that feels like home',
    descZh:
      '你不是在找刺激，而是在找一种让你放松下来、觉得安全的感情。潘妮会记住你喜欢什么，会在你难过的时候出现，会把普通的日子变得有温度。和她在一起，「家」不是一个地方，而是一种感觉。',
    descEn:
      "You're not chasing excitement — you're looking for a relationship where you can breathe. Penny remembers what you like, shows up when you're struggling, and makes ordinary days feel warm. With her, home isn't a place — it's a feeling.",
    whyZh: '为什么是潘妮：她是那种让你在最坏的日子里也觉得被看见的人。',
    whyEn: "Why Penny: She's the one who makes you feel seen even on your worst days.",
    hookZh:
      'TendFarm 为稳定型玩家而生：规律的睡眠和步数让农场日渐充盈，就像潘妮式的陪伴——不急不躁，每天都多一点好。',
    hookEn:
      "TendFarm for the steady one — consistent sleep and steps make the farm gradually richer, like Penny's presence: no rush, just a little better every day.",
  },
  emily: {
    type: 'emily',
    nameZh: '艾米莉',
    nameEn: 'Emily',
    emoji: '🌈',
    taglineZh: '你需要一段让你成长的感情',
    taglineEn: 'You need a relationship that expands your world',
    descZh:
      '你希望和一个人在一起之后，感觉自己比以前更大了——看到了更多可能，有了更多感受。艾米莉是那种人。她充满创意，对世界的感受方式和大多数人不同，和她在一起，你会开始注意到那些你以前忽略的美好。',
    descEn:
      "You want a relationship that makes you feel larger — more possibilities, deeper feelings. Emily is that person. She has a way of experiencing the world that's unlike anyone else, and being with her makes you notice beauty you used to walk past. She expands you.",
    whyZh: '为什么是艾米莉：她不只是陪伴你，而是改变你看世界的方式。',
    whyEn: "Why Emily: She doesn't just accompany you — she changes how you see everything.",
    hookZh:
      'TendFarm 的创意型玩家——你的健康数据产生的农场变化充满了意外性，就像和艾米莉在一起：你永远不知道今天会带来什么惊喜。',
    hookEn:
      "TendFarm for the creative — your health data generates farm changes full of surprises, like being with Emily: you never know what today will bring.",
  },
  sebastian: {
    type: 'sebastian',
    nameZh: '塞巴斯蒂安',
    nameEn: 'Sebastian',
    emoji: '🌙',
    taglineZh: '你需要一个真正接受你复杂性的人',
    taglineEn: 'You need someone who accepts all your complexity',
    descZh:
      '你不需要别人理解你所有的面向——但你需要对方不试图简化你。塞巴斯蒂安也有他不轻易展示的内心，他不会要求你永远开朗，不会因为你的复杂而退缩。你们之间的沉默是舒适的，你们之间的深度是真实的。',
    descEn:
      "You don't need to be fully understood — but you need someone who won't try to simplify you. Sebastian has depths he doesn't easily show either. He won't ask you to always be cheerful, and he won't pull back when you're complicated. Your silences are comfortable. Your depth is real.",
    whyZh: '为什么是塞巴斯蒂安：他是那种不需要你解释「为什么」的人，他只是接受。',
    whyEn: "Why Sebastian: He's the one who doesn't need you to explain why — he just accepts.",
    hookZh:
      'TendFarm 对内向型玩家完美适配：零社交压力，你的健康数据在后台安静运行，农场自己成长。不需要解释，不需要表演。',
    hookEn:
      "TendFarm is a perfect fit for introverts: zero social pressure, your health data runs quietly in the background, the farm grows on its own. No explaining, no performing.",
  },
  harvey: {
    type: 'harvey',
    nameZh: '哈维',
    nameEn: 'Harvey',
    emoji: '💙',
    taglineZh: '你需要一个真正关心你的人',
    taglineEn: 'You need someone who genuinely cares about you',
    descZh:
      '你需要的，不是最帅的或最酷的，而是那种让你感觉「如果我病了，他一定会在」的人。哈维有点害羞，但他的体贴是发自内心的——他会注意到你状态不好，会记住你提过的事，会在你不需要求助的时候先帮你想到。在感情里，被真正照顾，是你的需求，也是你的值得。',
    descEn:
      "You don't need someone dazzling — you need someone who makes you feel genuinely cared for. Harvey is a little shy, but his thoughtfulness is real: he notices when you're off, remembers things you mentioned once, and anticipates your needs before you ask. Being truly cared for is your need, and you deserve it.",
    whyZh: '为什么是哈维：在所有人都忙着展示自己的时候，他在默默想着你。',
    whyEn: "Why Harvey: While everyone else is busy performing, he's quietly thinking of you.",
    hookZh:
      'TendFarm 对哈维式的玩家来说充满温度：你的睡眠好，农场就好；你照顾好自己，农场就回应你。TendFarm 和哈维一样，它记得你，并且在乎。',
    hookEn:
      "TendFarm resonates with Harvey-types: sleep well and the farm thrives; take care of yourself and the farm responds. Like Harvey, TendFarm pays attention — and cares.",
  },
}

function calcResult(answers: Match[]): Match {
  const counts: Record<Match, number> = {
    abigail: 0,
    leah: 0,
    penny: 0,
    emily: 0,
    sebastian: 0,
    harvey: 0,
  }
  answers.forEach((a) => counts[a]++)
  return (Object.keys(counts) as Match[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b))
}

interface ShareButtonProps {
  matchName: string
  locale: string
  isZh: boolean
}

function ShareButton({ matchName, locale, isZh }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://www.farmgamehub.com/${locale}/quizzes/stardew-romance`
  const text = isZh
    ? `我在星露谷的配对对象是「${matchName}」！来测测你应该和谁在一起：${url}`
    : `My Stardew Valley romance match is ${matchName}! Find yours: ${url}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    }
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 rounded-lg border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copied ? (isZh ? '✓ 已复制！' : '✓ Copied!') : (isZh ? '📋 复制结果' : '📋 Copy result')}
      </button>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]"
      >
        𝕏 {isZh ? '分享到 X' : 'Share on X'}
      </a>
    </div>
  )
}

interface Props {
  locale: string
}

export function StardewRomanceQuiz({ locale }: Props) {
  const [step, setStep] = useState<number>(0)
  const [answers, setAnswers] = useState<Match[]>([])
  const isZh = locale === 'zh'

  const handleAnswer = (type: Match) => {
    const next = [...answers, type]
    setAnswers(next)
    if (next.length === QUESTIONS.length) {
      setStep(QUESTIONS.length + 1)
    } else {
      setStep(step + 1)
    }
  }

  const reset = () => {
    setAnswers([])
    setStep(0)
  }

  // Intro
  if (step === 0) {
    return (
      <div className="text-center">
        <div className="mb-6 text-6xl">💌</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {isZh ? '你在星露谷里应该和谁在一起？' : 'Which Stardew Valley Character Should You Romance?'}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {isZh
            ? '6 个关于感情的问题，测出你最适合和哪位星露谷村民发展感情。'
            : '6 questions about what you value in relationships to find your perfect Stardew Valley romance match.'}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {isZh
            ? '艾比盖尔、莉亚、潘妮、艾米莉、塞巴斯蒂安、哈维——你们是什么缘分？'
            : 'Abigail, Leah, Penny, Emily, Sebastian, or Harvey — which one is your match?'}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {isZh ? '开始配对 →' : 'Find My Match →'}
        </button>
      </div>
    )
  }

  // Result
  if (step === QUESTIONS.length + 1) {
    const match = calcResult(answers)
    const result = RESULTS[match]
    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {isZh ? '你的星露谷配对对象是' : 'Your Stardew Valley romance match is:'}
          </p>
          <h2 className="text-3xl font-bold text-[#f0a832]">
            {isZh ? result.nameZh : result.nameEn}
          </h2>
          <p className="mt-1 text-sm text-[#8a9a7a]">
            {isZh ? result.taglineZh : result.taglineEn}
          </p>
        </div>

        {/* Description */}
        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-5">
          <p className="leading-relaxed text-[#e8dcc8]">
            {isZh ? result.descZh : result.descEn}
          </p>
        </div>

        {/* Why */}
        <div className="mb-5 rounded-xl border border-[#2d5a27]/50 bg-[#1a2e1a]/30 px-5 py-3">
          <p className="text-sm italic text-[#8a9a7a]">
            {isZh ? result.whyZh : result.whyEn}
          </p>
        </div>

        {/* Share */}
        <div className="mb-6">
          <p className="mb-3 text-sm text-[#8a9a7a]">
            {isZh ? '看看朋友的配对结果 →' : 'See who your friends match with →'}
          </p>
          <ShareButton
            matchName={isZh ? result.nameZh : result.nameEn}
            locale={locale}
            isZh={isZh}
          />
        </div>

        {/* TendFarm Hook */}
        <div className="mb-8 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a] p-5">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">
            {isZh ? '你可能也会喜欢 →' : 'You might also love →'} TendFarm
          </p>
          <p className="mb-4 text-sm leading-relaxed text-[#8a9a7a]">
            {isZh ? result.hookZh : result.hookEn}
          </p>
          <Link
            href={`/${locale}/gameplay`}
            className="inline-block rounded-lg bg-[#f0a832] px-5 py-2 text-sm font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
          >
            {isZh ? '了解 TendFarm →' : 'Learn about TendFarm →'}
          </Link>
        </div>

        <div className="text-center">
          <button
            onClick={reset}
            className="text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {isZh ? '重新测试' : 'Retake quiz'}
          </button>
        </div>
      </div>
    )
  }

  // Question
  const qIndex = step - 1
  const q = QUESTIONS[qIndex]
  const progress = (qIndex / QUESTIONS.length) * 100

  return (
    <div>
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[#8a9a7a]">
          <span>
            {isZh ? `问题 ${step} / ${QUESTIONS.length}` : `Question ${step} of ${QUESTIONS.length}`}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[#2d3d2d]">
          <div
            className="h-1.5 rounded-full bg-[#f0a832] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="mb-6 text-xl font-semibold text-[#e8dcc8]">
        {isZh ? q.zh : q.en}
      </h2>

      <div className="space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt.type}
            onClick={() => handleAnswer(opt.type)}
            className="w-full rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-5 py-4 text-left text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
          >
            {isZh ? opt.zh : opt.en}
          </button>
        ))}
      </div>

      {step > 1 && (
        <button
          onClick={() => {
            setAnswers(answers.slice(0, -1))
            setStep(step - 1)
          }}
          className="mt-4 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
        >
          ← {isZh ? '上一题' : 'Previous'}
        </button>
      )}
    </div>
  )
}
