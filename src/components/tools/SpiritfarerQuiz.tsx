'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Spirit = 'gwen' | 'atul' | 'summer' | 'gustav'

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
  options: Array<{ en: string; zh: string; type: Spirit }>
}> = [
  {
    q_en: 'How do you typically process difficult emotions?',
    q_zh: '你通常如何处理困难的情绪？',
    options: [
      { en: 'Alone, with a book and tea — I need time and quiet to work things through', zh: '独处、看书、喝茶——我需要时间和安静来消化一切', type: 'gwen' },
      { en: 'By cooking or feeding people — nurturing others helps me feel grounded', zh: '通过烹饪或给人吃东西——照顾他人让我感到踏实', type: 'atul' },
      { en: 'Through stillness — I sit with the feeling until it passes naturally', zh: '通过静止——我与情绪同坐，直到它自然消散', type: 'summer' },
      { en: 'By expressing it dramatically — I write, paint, or perform until it leaves my system', zh: '通过戏剧化的表达——我写作、绘画或表演，直到情绪从体内释放', type: 'gustav' },
    ],
  },
  {
    q_en: 'What do people who know you well say about you?',
    q_zh: '了解你的人会怎么描述你？',
    options: [
      { en: "That you're hard to read at first, but incredibly loyal once you open up", zh: '刚开始很难读懂，但一旦敞开心扉就无比忠诚', type: 'gwen' },
      { en: "That you're the warmest person they know — always ready with food and a hug", zh: '你是他们认识的最温暖的人——总是随时准备好食物和拥抱', type: 'atul' },
      { en: "That you have a calm that other people find grounding just to be around", zh: '你的平静让身边的人也感到踏实', type: 'summer' },
      { en: "That you're a lot — but in the best possible way, always memorable", zh: '你存在感很强——但是以最好的方式，总是令人难忘', type: 'gustav' },
    ],
  },
  {
    q_en: 'Your ideal way to spend a free afternoon is:',
    q_zh: '你理想中的自由下午是怎么度过的？',
    options: [
      { en: 'Reading somewhere with good light, with coffee and absolutely no interruptions', zh: '在光线好的地方看书，喝着咖啡，绝对不被打扰', type: 'gwen' },
      { en: 'Making a big meal for everyone — cooking is love, full stop', zh: '为大家做一顿丰盛的饭——烹饪就是爱，就这么简单', type: 'atul' },
      { en: 'A long walk somewhere quiet, watching light change, no destination in mind', zh: '在安静的地方长途漫步，看光线变化，没有目的地', type: 'summer' },
      { en: 'Working on a creative project — a painting, a performance, something with an audience in mind', zh: '做一个创意项目——一幅画、一场表演、想象中有观众的某件事', type: 'gustav' },
    ],
  },
  {
    q_en: 'When someone you love is struggling, your instinct is to:',
    q_zh: '当你爱的人在挣扎时，你的本能反应是：',
    options: [
      { en: "Stay close and present without saying much — your presence says it all", zh: '默默守在旁边——你的存在本身就说明了一切', type: 'gwen' },
      { en: "Show up with food and offer to help with whatever practical thing needs doing", zh: '带着食物出现，主动帮忙处理任何实际需要的事', type: 'atul' },
      { en: "Listen deeply and help them find the stillness to see their situation clearly", zh: '深度倾听，帮他们找到平静，看清自己的处境', type: 'summer' },
      { en: "Offer a dramatic pep talk and remind them of their own greatness", zh: '给他们一场慷慨激昂的鼓励，提醒他们自己有多了不起', type: 'gustav' },
    ],
  },
  {
    q_en: 'Which phrase resonates with you most?',
    q_zh: '哪句话最能引起你的共鸣？',
    options: [
      { en: '"A good book and solitude is the best medicine for most things"', zh: '"一本好书和独处是大多数事情的最佳良药"', type: 'gwen' },
      { en: '"The way to someone\'s heart is through their stomach"', zh: '"走进一个人心里的方式是通过他的胃"', type: 'atul' },
      { en: '"Be still. Everything you need is already here"', zh: '"静下来。你需要的一切已经在这里了"', type: 'summer' },
      { en: '"Life is a performance — you might as well make it a good one"', zh: '"生命是一场表演——既然如此，不如把它演好"', type: 'gustav' },
    ],
  },
  {
    q_en: 'What is your relationship with change and endings?',
    q_zh: '你如何看待变化和结束？',
    options: [
      { en: "Hard to accept — you hold on before eventually letting go with grace", zh: '难以接受——你会紧握住，最终优雅地放手', type: 'gwen' },
      { en: "Bittersweet — every ending means the memories and love still remain", zh: '苦乐参半——每个结束意味着记忆和爱依然留存', type: 'atul' },
      { en: "Natural — change is the only constant and you make peace with it early", zh: '自然的——变化是唯一的常数，你很早就与之和解', type: 'summer' },
      { en: "Dramatic but ultimately beautiful — a good ending deserves a grand exit", zh: '戏剧化但终究美丽——好的结局值得一个盛大的谢幕', type: 'gustav' },
    ],
  },
]

const RESULTS: Record<
  Spirit,
  {
    name_en: string
    name_zh: string
    emoji: string
    trait_en: string
    trait_zh: string
    desc_en: string
    desc_zh: string
    quote_en: string
    quote_zh: string
  }
> = {
  gwen: {
    name_en: 'Gwen',
    name_zh: '关恩',
    emoji: '🦊',
    trait_en: 'The Quiet Intellectual',
    trait_zh: '沉静的智识者',
    desc_en:
      "You are Gwen — reserved on the surface but rich with feeling underneath. You take time to open up, but once you do, your loyalty and depth are extraordinary. You find comfort in books, solitude, and a perfectly made cup of tea. You carry more than you show. You have high standards for yourself that sometimes come from old wounds, and you are slowly learning that being loved does not require you to be perfect. Your inner world is vast and beautiful — the people who earn your trust get to see it.",
    desc_zh:
      '你是关恩——表面内敛，内心却充盈着丰富的情感。你需要时间才能敞开心扉，但一旦敞开，你的忠诚和深度便令人叹服。你在书本、独处和一杯泡得恰到好处的茶中找到慰藉。你承担的比你展示的要多。你对自己要求很高，这往往来自旧日的伤痕，而你正在慢慢学会：被爱不需要你做到完美。你的内心世界辽阔而美丽——赢得你信任的人才有幸看见它。',
    quote_en: '"I just need some time alone. That\'s not rejection — it\'s how I come back to myself."',
    quote_zh: '"我只是需要一点独处的时间。这不是拒绝——这是我找回自己的方式。"',
  },
  atul: {
    name_en: 'Atul',
    name_zh: '阿图尔',
    emoji: '🍲',
    trait_en: 'The Warm-Hearted Nurturer',
    trait_zh: '热心的养育者',
    desc_en:
      "You are Atul — joyful, generous, and the emotional center of every room you enter. You show love through food, through showing up, through remembering what everyone likes and making sure they have it. You are not complicated — your warmth is genuine and unconditional. People feel safe around you immediately. You sometimes put others before yourself to a fault, but the truth is: your greatest happiness comes from seeing the people you love thrive. That is not a weakness. That is who you are.",
    desc_zh:
      '你是阿图尔——快乐、慷慨，是你所在每个房间的情感中心。你通过食物、通过出现、通过记住每个人的喜好并确保他们拥有来表达爱。你不复杂——你的温暖是真诚而无条件的。人们在你身边立刻感到安全。你有时会过度把他人放在自己之前，但事实是：看到你爱的人蓬勃成长，是你最大的幸福。这不是弱点。这就是你。',
    quote_en: '"Food is just love you can eat. That\'s the whole philosophy."',
    quote_zh: '"食物只是可以吃的爱。这就是全部的哲学。"',
  },
  summer: {
    name_en: 'Summer',
    name_zh: '夏梦',
    emoji: '🌸',
    trait_en: 'The Peaceful Philosopher',
    trait_zh: '平和的哲思者',
    desc_en:
      "You are Summer — serene, wise, and deeply at peace with the rhythm of things. You do not fight against what is. You do not dread what comes. You move through life with a grace that other people find both inspiring and slightly mysterious. You have thought deeply about impermanence, about letting go, about the beauty in endings. This does not make you sad — it makes you more fully present in the moments you have. You are the kind of person whose calm is a gift to everyone around you.",
    desc_zh:
      '你是夏梦——宁静、睿智，与万物的节律深深和解。你不抗拒既成之事，不恐惧将临之物。你以一种令他人既感到鼓舞又略感神秘的优雅穿行于生命之中。你对无常、对放手、对结束中的美丽有过深刻的思考。这不会让你悲伤——它让你更完整地活在当下的每一刻。你的平静是给身边所有人的礼物。',
    quote_en: '"Nothing is lost. Everything changes shape."',
    quote_zh: '"什么都没有失去。一切只是换了形状。"',
  },
  gustav: {
    name_en: 'Gustav',
    name_zh: '古斯塔夫',
    emoji: '🎭',
    trait_en: 'The Passionate Artist',
    trait_zh: '热情的艺术家',
    desc_en:
      "You are Gustav — dramatic, expressive, and utterly magnetic. You feel everything at full volume and you are not ashamed of it. You have a flair for the theatrical that sometimes makes people roll their eyes, but more often makes them lean in. Underneath the performance is something genuine: a person who cares deeply about beauty, craft, and leaving a mark on the world. You want to be remembered. You want your work to matter. And if you are honest with yourself, you also just want to be loved — you are working on accepting that you already are.",
    desc_zh:
      '你是古斯塔夫——戏剧化、表达欲强、极具感召力。你以全音量感受一切，对此毫不羞愧。你对戏剧性的事物有一种天赋，有时让人忍不住翻白眼，但更多时候让人不由自主地凑近。表演之下是某种真实的东西：一个深深关心美、技艺和在世界上留下印记的人。你想被记住。你想让你的作品有意义。而如果你对自己诚实，你其实也只是想被爱——你正在学着接受自己已经是被爱的。',
    quote_en: '"If you are going to feel something, feel it magnificently."',
    quote_zh: '"如果你要去感受什么，就要壮丽地感受它。"',
  },
}

function calcResult(answers: Spirit[]): Spirit {
  const counts: Record<Spirit, number> = { gwen: 0, atul: 0, summer: 0, gustav: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Spirit
}

export function SpiritfarerQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Spirit | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Spirit[])]
    const url = `${BASE_URL}/${locale}/quizzes/spiritfarer-quiz`
    const shareText = isZh
      ? `在 Spiritfarer 里我最像「${result.name_zh}」。这个游戏让我哭了，测测你是哪位灵魂：${url}`
      : `I got ${result.name_en} in the Spiritfarer character quiz. This game wrecked me in the best way. Find your spirit: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.trait_zh : result.trait_en}</p>
          <h2 className="mb-3 text-2xl font-bold text-[#f0a832]">
            {isZh ? result.name_zh : result.name_en}
          </h2>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.desc_zh : result.desc_en}
        </p>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm italic leading-relaxed text-[#e8dcc8]">
            {isZh ? result.quote_zh : result.quote_en}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——帮你把 Spiritfarer 里的温柔生活节奏带入现实。'
              : 'TendFarm is building a farm rhythm tracker — bringing the gentle pace of Spiritfarer into real life.'}
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
          {isZh ? '你是哪位 Spiritfarer 灵魂？' : 'Which Spiritfarer Spirit Are You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个关于情感和处世方式的问题，测出你最像关恩、阿图尔、夏梦还是古斯塔夫'
            : '6 questions about how you feel and move through life — find your Spiritfarer spirit match'}
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
        {isZh ? '找到我的灵魂' : 'Find My Spirit'}
      </button>
    </div>
  )
}
