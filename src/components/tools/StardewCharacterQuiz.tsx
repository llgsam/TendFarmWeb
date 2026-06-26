'use client'

import { useState } from 'react'
import Link from 'next/link'

type Character = 'abigail' | 'leah' | 'penny' | 'sebastian' | 'elliott'

interface Option {
  zh: string
  en: string
  type: Character
}

interface Question {
  zh: string
  en: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    zh: '放假一整天，你最想做什么？',
    en: "It's a free day. What do you do?",
    options: [
      { zh: '去探索不熟悉的地方，越刺激越好', en: 'Explore somewhere unfamiliar — the more adventurous, the better', type: 'abigail' },
      { zh: '一个人在工作室或大自然里搞创作', en: 'Spend it alone creating — art, woodwork, or just being in nature', type: 'leah' },
      { zh: '陪家人或朋友，帮他们做点什么', en: 'Spend it with family or friends — helping, cooking, being there', type: 'penny' },
      { zh: '一个人宅在家里，谢绝所有打扰', en: 'Stay home completely alone — no interruptions, no people', type: 'sebastian' },
      { zh: '找个安静的地方读书、写东西，或者看海', en: 'Sit somewhere beautiful — reading, writing, or watching the sea', type: 'elliott' },
    ],
  },
  {
    zh: '你最欣赏别人哪种品质？',
    en: 'What quality do you admire most in others?',
    options: [
      { zh: '敢做自己，不怕别人怎么看', en: 'Being unapologetically themselves — not caring what others think', type: 'abigail' },
      { zh: '为了梦想坚持下去，哪怕很难', en: 'Sticking to a dream even when it is hard', type: 'leah' },
      { zh: '真心为别人着想，温柔而有力量', en: 'Genuine care for others — quiet strength and warmth', type: 'penny' },
      { zh: '聪明、真实，不在乎表面形象', en: "Intelligence and authenticity — not playing a role", type: 'sebastian' },
      { zh: '有深度，能感受到生活中细微的美', en: 'Depth of feeling — someone who notices the subtle beauty of life', type: 'elliott' },
    ],
  },
  {
    zh: '压力大的时候，你最可能做什么？',
    en: 'When you feel stressed or overwhelmed, you:',
    options: [
      { zh: '去做点有意思的事，转移注意力', en: 'Do something fun or different to take your mind off it', type: 'abigail' },
      { zh: '一个人在户外走走，用双手做点东西', en: 'Go outside alone or work with your hands', type: 'leah' },
      { zh: '找人倾诉，或者去帮助别人', en: 'Talk to someone close, or shift focus to helping someone else', type: 'penny' },
      { zh: '需要完全独处，把所有人都关在门外', en: 'Need total solitude — shut everyone out until it passes', type: 'sebastian' },
      { zh: '把感受写下来或者变成某种创作', en: 'Turn the feeling into words, music, or something creative', type: 'elliott' },
    ],
  },
  {
    zh: '你觉得人生最重要的事是？',
    en: "What matters most to you in life?",
    options: [
      { zh: '每天都过得有意思、有故事可以讲', en: 'Living days worth telling stories about', type: 'abigail' },
      { zh: '创造出真正属于自己的东西', en: 'Creating something that is genuinely yours', type: 'leah' },
      { zh: '让身边的人感受到爱和被看见', en: 'Making the people around you feel loved and seen', type: 'penny' },
      { zh: '活出真实的自我，不为任何人妥协', en: 'Living authentically — never compromising who you are', type: 'sebastian' },
      { zh: '找到那种刻骨铭心的深刻感受', en: 'Finding and holding onto something deeply, profoundly felt', type: 'elliott' },
    ],
  },
  {
    zh: '你理想的生活空间是？',
    en: 'Your ideal living space is:',
    options: [
      { zh: '小镇边缘，随时可以出发探险', en: 'On the edge of town — always ready to go somewhere', type: 'abigail' },
      { zh: '森林里的小屋，或乡间的工作室', en: "A cabin in the woods or a rural studio — truly your own", type: 'leah' },
      { zh: '社区里，离家人和邻居都近', en: 'In the community — close to people you care about', type: 'penny' },
      { zh: '城市角落，安静，有雾，有自己的空间', en: 'A quiet corner somewhere — private, a little dark, all yours', type: 'sebastian' },
      { zh: '海边，或者有大图书馆和咖啡馆的地方', en: 'By the sea, or somewhere with a great library and café', type: 'elliott' },
    ],
  },
  {
    zh: '看到一片美丽的星空，你的第一想法是？',
    en: 'You look up and see a stunning night sky. Your first thought:',
    options: [
      { zh: '「不知道那边有什么」，开始计划去探索', en: "I wonder what's out there — start planning to find out", type: 'abigail' },
      { zh: '拿出画具或相机，把这一刻记录下来', en: 'Reach for a sketchbook or camera — this moment needs to be captured', type: 'leah' },
      { zh: '想找一个人一起分享这个瞬间', en: 'Wish someone you love was here to see this with you', type: 'penny' },
      { zh: '一个人默默地看，不需要说什么', en: 'Stand there quietly alone — no words needed', type: 'sebastian' },
      { zh: '脑海里已经开始写一首诗了', en: 'A poem is already forming in your mind', type: 'elliott' },
    ],
  },
]

interface Result {
  type: Character
  nameZh: string
  nameEn: string
  emoji: string
  taglineZh: string
  taglineEn: string
  descZh: string
  descEn: string
  traitsZh: string[]
  traitsEn: string[]
  hookZh: string
  hookEn: string
}

const RESULTS: Record<Character, Result> = {
  abigail: {
    type: 'abigail',
    nameZh: '艾比盖尔',
    nameEn: 'Abigail',
    emoji: '💜',
    taglineZh: '星露谷的冒险者',
    taglineEn: 'The Adventurer of Pelican Town',
    descZh:
      '你和艾比盖尔一样，骨子里住着一个探险家。你不满足于平静的日常，总想知道那扇门后面是什么、那条路通向哪里。你有点不走寻常路，不在乎别人的眼光，宁可做自己，也不愿意扮演别人期待的角色。游戏、探险、神秘的事物——这些让你感到真正活着。',
    descEn:
      "Like Abigail, you have an adventurer's soul. You're not satisfied with quiet routine — you always want to know what's behind the next door or where the path leads. You march to your own beat, don't care much for others' expectations, and would rather be yourself than play a comfortable role. Games, adventures, mysterious things — these make you feel truly alive.",
    traitsZh: ['爱冒险', '不走寻常路', '活在当下', '有点神秘'],
    traitsEn: ['Adventurous', 'Non-conformist', 'Present-minded', 'A little mysterious'],
    hookZh:
      '艾比盖尔式的玩家喜欢探索——TendFarm 每天都会根据你的健康数据产生新变化：今天多走了几步，农场就有不一样的收成。每次打开都有新发现，就像进了一个新地下城。',
    hookEn:
      "Abigail-types love discovery — TendFarm creates new changes every day based on your health data. Walk more today, get a different harvest. Every time you open it there's something new, like descending into a fresh dungeon floor.",
  },
  leah: {
    type: 'leah',
    nameZh: '莉亚',
    nameEn: 'Leah',
    emoji: '🌿',
    taglineZh: '大自然里的创作者',
    taglineEn: 'The Creator Who Lives Close to Nature',
    descZh:
      '你是莉亚——用双手创造、在自然里呼吸的那种人。你不需要很多人，需要的是空间和时间，让自己的想法有地方落地。你对世界有自己的感受和表达方式，哪怕别人不一定理解。你知道什么对你来说是真实的，并且愿意为此放弃一些「安全」的选择。',
    descEn:
      "You're Leah — someone who creates with their hands and breathes better in nature. You don't need many people; you need space and time to let your ideas land somewhere real. You have your own way of seeing and expressing the world, even if others don't always understand. You know what feels authentic to you, and you're willing to give up safe options to protect it.",
    traitsZh: ['热爱自然', '独立创作', '真实不做作', '需要独处空间'],
    traitsEn: ['Nature-loving', 'Independently creative', 'Authentic', 'Needs solitary space'],
    hookZh:
      '莉亚式的玩家在乎真实感——TendFarm 的农场直接反映你真实的生活节律：睡眠好，农场就充盈；户外活动多，土地就更肥沃。没有比这更真实的农场了。',
    hookEn:
      "Leah-types value authenticity — TendFarm's farm directly reflects your real life rhythms: sleep well and the farm flourishes; spend time outdoors and the land grows richer. There's no more authentic farm than this.",
  },
  penny: {
    type: 'penny',
    nameZh: '潘妮',
    nameEn: 'Penny',
    emoji: '📚',
    taglineZh: '村子里最温暖的那个人',
    taglineEn: 'The Warmest Soul in Town',
    descZh:
      '你是潘妮——那种让周围的人都感到被看见、被关心的人。你不一定话最多，但你永远知道什么时候该陪在别人身边。你有时候会把别人的需要放在自己前面，不是因为软弱，是因为这对你来说才是最有意义的事。你相信关怀和教育能改变一个人，而你愿意用行动去证明它。',
    descEn:
      "You're Penny — the person who makes everyone around you feel truly seen and cared for. You might not always be the loudest, but you always know when to show up for someone. You sometimes put others before yourself, not out of weakness, but because this is genuinely what feels most meaningful to you. You believe that care and connection can change a person, and you live that belief.",
    traitsZh: ['温暖体贴', '有耐心', '以他人为中心', '默默付出'],
    traitsEn: ['Warm and caring', 'Patient', 'Other-centered', 'Quietly devoted'],
    hookZh:
      '潘妮式的玩家在乎陪伴和成长——TendFarm 的农场会随着你稳定的生活节律慢慢成长，就像照顾一个你每天关心的东西。规律的睡眠和运动，让农场慢慢变得充盈、美好。',
    hookEn:
      "Penny-types value nurturing and growth — TendFarm's farm grows gently with your steady daily rhythms, like caring for something you tend every day. Regular sleep and movement make the farm slowly bloom into something beautiful.",
  },
  sebastian: {
    type: 'sebastian',
    nameZh: '塞巴斯蒂安',
    nameEn: 'Sebastian',
    emoji: '🌙',
    taglineZh: '内心深处有复杂宇宙的人',
    taglineEn: 'The One with a Universe Inside',
    descZh:
      '你是塞巴斯蒂安——外表安静，内心波澜。你不轻易让人靠近，但一旦你信任某人，那是真的信任。你更在乎深度而不是广度，宁可有一两个真正懂你的朋友，也不要一大群点头之交。你有点反体制，不愿意被期待绑住，哪怕你知道有些期待并非出于恶意。',
    descEn:
      "You're Sebastian — quiet on the outside, turbulent within. You don't let people close easily, but when you trust someone, it's real. You value depth over breadth — one or two people who truly understand you over a crowd of acquaintances. You're a little countercultural, unwilling to be defined by others' expectations, even when you know those expectations come from a good place.",
    traitsZh: ['内向深沉', '高度选择性', '独立思考', '真实不妥协'],
    traitsEn: ['Introverted and deep', 'Highly selective', 'Independent thinker', 'Uncompromisingly real'],
    hookZh:
      'TendFarm 对塞巴斯蒂安式的玩家来说是最完美的游戏：完全不需要和任何人互动，你的健康数据在后台默默运转，农场自己成长。不需要解释，不需要表演，只是存在。',
    hookEn:
      "TendFarm is the perfect game for Sebastian-types: zero social interaction required. Your health data runs quietly in the background, the farm grows on its own. No explanations, no performance — just existence.",
  },
  elliott: {
    type: 'elliott',
    nameZh: '艾略特',
    nameEn: 'Elliott',
    emoji: '🖋️',
    taglineZh: '活在情感深处的浪漫主义者',
    taglineEn: 'The Romantic Who Feels Everything Deeply',
    descZh:
      '你是艾略特——一个把感受当作生活核心的人。你不满足于表面，总想触达更深的东西：某个故事背后的含义、某段关系的本质、某个时刻的诗意。你也许有点「戏剧性」，但那不是矫情，是因为你真的感受得很深。对你来说，生活不只是发生，而是值得被记录、被感受、被珍视的。',
    descEn:
      "You're Elliott — someone for whom feeling is at the center of life. You don't settle for surfaces; you always reach for something deeper: the meaning behind a story, the nature of a relationship, the poetry in a moment. You may seem a little dramatic, but that's not affectation — you genuinely feel things intensely. For you, life isn't just something that happens; it's something worth recording, feeling, and treasuring.",
    traitsZh: ['情感丰富', '浪漫主义', '追求深度', '热爱语言和故事'],
    traitsEn: ['Emotionally rich', 'Romantic', 'Depth-seeking', 'In love with words and stories'],
    hookZh:
      'TendFarm 对艾略特式的玩家有一种浪漫的诗意：你的生活节律——你的呼吸、你的步伐、你的睡眠——都在悄悄地塑造一片农场。这是你的生活写的一首无字的诗。',
    hookEn:
      "TendFarm holds a certain poetry for Elliott-types: your life's rhythms — your breathing, your steps, your sleep — are quietly shaping a farm. It's a wordless poem written by how you live.",
  },
}

function calcResult(answers: Character[]): Character {
  const counts: Record<Character, number> = {
    abigail: 0,
    leah: 0,
    penny: 0,
    sebastian: 0,
    elliott: 0,
  }
  answers.forEach((a) => counts[a]++)
  return (Object.keys(counts) as Character[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b))
}

interface ShareButtonProps {
  characterName: string
  locale: string
  isZh: boolean
}

function ShareButton({ characterName, locale, isZh }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://www.farmgamehub.com/${locale}/quizzes/stardew-character`
  const text = isZh
    ? `我的星露谷人格是「${characterName}」！来测测你是哪位村民：${url}`
    : `My Stardew Valley personality is ${characterName}! Find yours: ${url}`

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

export function StardewCharacterQuiz({ locale }: Props) {
  const [step, setStep] = useState<number>(0)
  const [answers, setAnswers] = useState<Character[]>([])
  const isZh = locale === 'zh'

  const handleAnswer = (type: Character) => {
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
        <div className="mb-6 text-6xl">🌾</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {isZh ? '你是哪位星露谷村民？' : 'Which Stardew Valley Villager Are You?'}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {isZh
            ? '6 个问题，测出你最像哪位星露谷村民——艾比盖尔、莉亚、潘妮、塞巴斯蒂安还是艾略特？'
            : '6 questions to find your Stardew Valley match — Abigail, Leah, Penny, Sebastian, or Elliott?'}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {isZh ? '结果适合截图分享——来和朋友比比看你们是哪位村民 →' : 'Share your result — compare with friends to see who gets who →'}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {isZh ? '开始测试 →' : 'Start Quiz →'}
        </button>
      </div>
    )
  }

  // Result
  if (step === QUESTIONS.length + 1) {
    const character = calcResult(answers)
    const result = RESULTS[character]
    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {isZh ? '你最像星露谷里的' : 'Your Stardew Valley match is:'}
          </p>
          <h2 className="text-3xl font-bold text-[#f0a832]">
            {isZh ? result.nameZh : result.nameEn}
          </h2>
          <p className="mt-1 text-sm text-[#8a9a7a]">
            {isZh ? result.taglineZh : result.taglineEn}
          </p>
        </div>

        {/* Description */}
        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-5">
          <p className="leading-relaxed text-[#e8dcc8]">
            {isZh ? result.descZh : result.descEn}
          </p>
        </div>

        {/* Traits */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {(isZh ? result.traitsZh : result.traitsEn).map((t) => (
              <span key={t} className="rounded-full border border-[#2d5a27] px-3 py-1 text-sm text-[#8a9a7a]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mb-6">
          <p className="mb-3 text-sm text-[#8a9a7a]">
            {isZh ? '告诉朋友你是哪位村民 →' : 'Tell your friends which villager you got →'}
          </p>
          <ShareButton
            characterName={isZh ? result.nameZh : result.nameEn}
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
