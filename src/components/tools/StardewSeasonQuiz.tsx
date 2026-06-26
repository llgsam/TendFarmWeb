'use client'

import { useState } from 'react'
import Link from 'next/link'

type Season = 'spring' | 'summer' | 'fall' | 'winter'

interface Option {
  zh: string
  en: string
  type: Season
}

interface Question {
  zh: string
  en: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    zh: '你理想的周末早晨是？',
    en: 'Your ideal weekend morning:',
    options: [
      { zh: '去农夫市集，买新种子，计划新的开始', en: 'Farmers market, new seeds, planning a fresh start', type: 'spring' },
      { zh: '户外活动，阳光灿烂，和一群朋友一起', en: 'Outdoors in full sun with a big group of friends', type: 'summer' },
      { zh: '苹果园采摘，回来做热苹果酒，看叶子变色', en: 'Apple picking, hot cider, watching leaves turn', type: 'fall' },
      { zh: '待在家里，热可可，做手工或读书', en: 'Staying in with hot cocoa, crafting or reading', type: 'winter' },
    ],
  },
  {
    zh: '你如何看待「效率」这件事？',
    en: 'Your relationship with productivity:',
    options: [
      { zh: '充满雄心的新计划，从零开始，什么都是可能的', en: 'Ambitious new plans — everything feels possible from zero', type: 'spring' },
      { zh: '我现在状态最好，全力开动，能赶紧做完就做完', en: 'I am at my peak right now — full throttle, get it all done', type: 'summer' },
      { zh: '收获当初种下的东西，一种深深的满足感', en: 'Harvesting what I planted earlier — deep satisfaction', type: 'fall' },
      { zh: '放慢节奏，休息，思考，为下一步做计划', en: 'Slow down, rest, reflect, and plan what comes next', type: 'winter' },
    ],
  },
  {
    zh: '你喜欢什么样的社交方式？',
    en: 'Your social style:',
    options: [
      { zh: '小型聚会，认识新朋友，参加社区活动', en: 'Small gatherings, meeting new people, community events', type: 'spring' },
      { zh: '大型派对，户外音乐节，越多人越热闹', en: 'Big parties, outdoor festivals, the more the merrier', type: 'summer' },
      { zh: '和亲近的朋友吃一顿温暖的晚餐', en: 'A warm dinner with close friends who really know you', type: 'fall' },
      { zh: '一个人或和一两个很亲密的人待在一起', en: 'Alone or with just one or two very close people', type: 'winter' },
    ],
  },
  {
    zh: '选一个你最喜欢的星露谷节日：',
    en: 'Pick your favorite Stardew Valley festival:',
    options: [
      { zh: '鸡蛋节——春日、捡彩蛋、清晨的小镇广场', en: 'Egg Festival — spring, egg hunt, the whole town square', type: 'spring' },
      { zh: 'Luau 夏日沙滩派对——烈日、烤肉、热闹的人群', en: 'Luau — full sun, beach bonfires, crowded and festive', type: 'summer' },
      { zh: '星露谷农场交易会——金秋、比赛、收获奖励', en: 'Stardew Valley Fair — golden autumn, contests, harvest prizes', type: 'fall' },
      { zh: '夜市——神秘、安静的雪夜、漂浮的灯火', en: 'Night Market — mysterious, quiet snowy nights, glowing lights', type: 'winter' },
    ],
  },
  {
    zh: '哪种情绪最能代表你现在的状态？',
    en: 'Which emotion best describes your current vibe?',
    options: [
      { zh: '充满希望，跃跃欲试，对未来很期待', en: 'Hopeful and eager — excited about what is ahead', type: 'spring' },
      { zh: '充满活力，自信，处于人生的高峰时刻', en: 'Energized and confident — at my personal peak', type: 'summer' },
      { zh: '感恩，满足，珍惜现在拥有的一切', en: 'Grateful and content — appreciating everything I have', type: 'fall' },
      { zh: '内省，安静，喜欢一个人慢慢想事情', en: 'Introspective and quiet — savoring slow, deep thinking', type: 'winter' },
    ],
  },
  {
    zh: '你在星露谷最享受哪种活动？',
    en: 'Your favorite thing to do in Stardew Valley:',
    options: [
      { zh: '种下新作物，和新村民交朋友，规划农场布局', en: 'Planting new crops, befriending villagers, planning the farm layout', type: 'spring' },
      { zh: '高强度挖矿，赚大钱，把所有事情做到最高效', en: 'Mining hard, earning big, making everything maximally efficient', type: 'summer' },
      { zh: '大丰收，参加农场交易会，填满整个谷仓', en: 'Big harvests, the Stardew Valley Fair, filling the barn', type: 'fall' },
      { zh: '在雪地里做工艺品，逛夜市，和村民聊心事', en: 'Crafting in the snow, browsing the Night Market, deep talks with villagers', type: 'winter' },
    ],
  },
]

interface Result {
  season: Season
  nameZh: string
  nameEn: string
  emoji: string
  taglineZh: string
  taglineEn: string
  descZh: string
  descEn: string
  cropsZh: string[]
  cropsEn: string[]
  villagerZh: string
  villagerEn: string
  hookZh: string
  hookEn: string
}

const RESULTS: Record<Season, Result> = {
  spring: {
    season: 'spring',
    nameZh: '🌸 春天',
    nameEn: '🌸 Spring',
    emoji: '🌸',
    taglineZh: '充满希望的新开始',
    taglineEn: 'Full of hope and fresh beginnings',
    descZh:
      '你的灵魂是春天的——充满希望，跃跃欲试，总是对新事物怀有期待。你喜欢从零开始规划一切，像种下第一粒种子一样，相信只要用心浇灌，一切都会有所收获。你活在可能性里，而不是局限里。朋友们说你有一种「让人想跟着你一起开始新事情」的能量。',
    descEn:
      "Your soul is spring — full of hope, eager to start, always excited about new possibilities. You love planning everything from scratch, believing that with enough care and attention, anything can grow. You live in possibilities, not limitations. Friends say you have an energy that makes them want to start something new too.",
    cropsZh: ['草莓（鸡蛋节购买）', '大蒜', '郁金香', '花椰菜'],
    cropsEn: ['Strawberries (Egg Festival)', 'Garlic', 'Tulips', 'Cauliflower'],
    villagerZh: '潘妮——她的温柔和对未来的希望，与你的春天灵魂完美共鸣。',
    villagerEn: "Penny — her gentleness and hope for the future perfectly mirrors your spring soul.",
    hookZh:
      'TendFarm 为春天型人格设计了「萌芽」模式：你每天的新习惯和步数会让农场冒出新的嫩芽，每一个小改变都被记录成农场的生长轨迹——你的希望是可以看见的东西。',
    hookEn:
      "TendFarm has a 'Sprout' mode built for spring personalities: every new habit and daily step makes new shoots appear on the farm. Each small change is recorded as a growth milestone — your hope becomes something you can actually see.",
  },
  summer: {
    season: 'summer',
    nameZh: '☀️ 夏天',
    nameEn: '☀️ Summer',
    emoji: '☀️',
    taglineZh: '全力开动，处于巅峰',
    taglineEn: 'Full throttle, at your absolute peak',
    descZh:
      '你的灵魂是夏天的——充沛的能量，强烈的存在感，你最享受全力运转的感觉。你不喜欢慢吞吞，你相信现在就是做事的时候。在星露谷里，你会在夏天把矿洞打穿、赚最多的钱、参加每一个节日。你有一种感染力，让周围的人也振奋起来。',
    descEn:
      "Your soul is summer — abundant energy, strong presence, you love the feeling of running at full capacity. You don't like slow. You believe now is the time to act. In Stardew Valley, you would mine through every level, earn the most gold, and attend every festival. You are contagious — your energy lifts everyone around you.",
    cropsZh: ['蓝莓', '星果', '辣椒', '红色卷心菜'],
    cropsEn: ['Blueberries', 'Starfruit', 'Hot Peppers', 'Red Cabbage'],
    villagerZh: '艾米莉——她的热情、创造力和满满的能量，就是夏天本天了。',
    villagerEn: "Emily — her enthusiasm, creativity, and overflowing energy is summer personified.",
    hookZh:
      'TendFarm 的夏日冲刺模式为夏天型人格而生：高步数天数在农场里触发「丰收冲刺」，一天之内产出数倍于平常的作物。你的活力高峰，就是农场的高产季。',
    hookEn:
      "TendFarm's summer sprint mode is built for you: high-step days trigger a 'Harvest Rush' on the farm, producing several times the usual output in a single day. Your energy peaks become the farm's peak season.",
  },
  fall: {
    season: 'fall',
    nameZh: '🍂 秋天',
    nameEn: '🍂 Fall',
    emoji: '🍂',
    taglineZh: '感恩收获，享受当下所有',
    taglineEn: 'Grateful for the harvest, savoring everything',
    descZh:
      '你的灵魂是秋天的——深沉、温暖、感恩。你懂得欣赏事情「发展到最好」的那个时刻，你不追逐，你等待，然后在对的时机好好收获。你喜欢温暖的色调、有重量的食物、有深度的对话。你的农场是那种让人看一眼就觉得「这里有故事」的地方。',
    descEn:
      "Your soul is fall — deep, warm, and grateful. You know how to appreciate when things have 'reached their best,' you don't chase, you wait, then harvest at exactly the right moment. You love warm tones, substantial food, and deep conversations. Your farm is the kind of place where people look once and think: there's a story here.",
    cropsZh: ['南瓜', '葡萄', '紫薯', '山药'],
    cropsEn: ['Pumpkins', 'Grapes', 'Bok Choy', 'Yam'],
    villagerZh: '莱亚——她对土地、自然和真实生活的深深欣赏，和秋天的你如出一辙。',
    villagerEn: "Leah — her deep appreciation for the land, nature, and authentic living mirrors your fall soul exactly.",
    hookZh:
      'TendFarm 最懂秋天型人格：稳定的生活节律在农场里积累出「丰收积分」，不需要每天冲刺——只需要持续、规律地生活，到了时机，农场会给你一个惊喜的大丰收。',
    hookEn:
      "TendFarm understands fall personalities best: a steady, consistent life rhythm accumulates 'Harvest Points' on the farm. No need to sprint every day — just live consistently, and when the time is right, the farm gives you a surprise bumper harvest.",
  },
  winter: {
    season: 'winter',
    nameZh: '❄️ 冬天',
    nameEn: '❄️ Winter',
    emoji: '❄️',
    taglineZh: '内省、手工与深度的安静',
    taglineEn: 'Introspective, crafting, and the quiet of depth',
    descZh:
      '你的灵魂是冬天的——安静，深沉，有一种别人不一定能感受到的内在世界。你不喜欢表面的热闹，你在一段安静里找到真实的自己。在星露谷里，你最享受雪地里的工艺制作、夜市的神秘灯光、和村民在温暖的房间里聊心里话。你的深度是你最大的力量。',
    descEn:
      "Your soul is winter — quiet, deep, with an inner world others may not always see. You don't like surface noise; you find your true self in stillness. In Stardew Valley, you love crafting in the snow, the Night Market's mysterious lights, and deep conversations with villagers in warm rooms. Your depth is your greatest strength.",
    cropsZh: ['（冬天不能户外种植）', '冬季根（采集物）', '雪薯（采集物）', '冰柱（采集物）'],
    cropsEn: ['(No outdoor crops in winter)', 'Winter Root (forage)', 'Snow Yam (forage)', 'Crystal Fruit (forage)'],
    villagerZh: '塞巴斯蒂安——他的内省、真实和对安静深度的追求，就是冬天灵魂的完美体现。',
    villagerEn: "Sebastian — his introspection, authenticity, and love for quiet depth is the winter soul perfected.",
    hookZh:
      'TendFarm 的冬日模式为内省型人格定制：深度睡眠数据在农场里解锁神秘的「冬日稀有作物」，安静的夜晚比白天更有产出——这是专属于夜型人和内向者的农场奖励。',
    hookEn:
      "TendFarm's winter mode is made for introspective personalities: deep sleep data unlocks mysterious 'winter rare crops' on the farm. Quiet nights outperform busy days — an exclusive reward for night owls and introverts.",
  },
}

function calcResult(answers: Season[]): Season {
  const counts: Record<Season, number> = { spring: 0, summer: 0, fall: 0, winter: 0 }
  answers.forEach((a) => counts[a]++)
  return (Object.keys(counts) as Season[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b))
}

interface ShareButtonProps {
  seasonName: string
  locale: string
  isZh: boolean
}

function ShareButton({ seasonName, locale, isZh }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://www.farmgamehub.com/${locale}/quizzes/stardew-season`
  const text = isZh
    ? `我的星露谷灵魂季节是「${seasonName}」！来测测你的：${url}`
    : `My Stardew Valley season soul is ${seasonName}! Find yours: ${url}`

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

export function StardewSeasonQuiz({ locale }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Season[]>([])
  const isZh = locale === 'zh'

  const handleAnswer = (type: Season) => {
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

  if (step === 0) {
    return (
      <div className="text-center">
        <div className="mb-6 text-6xl">🍃</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {isZh ? '你是哪个星露谷季节？' : 'Which Stardew Valley Season Are You?'}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {isZh
            ? '6 个关于性格和生活方式的问题，测出你的灵魂季节是春天、夏天、秋天还是冬天——附专属村民和推荐农场攻略。'
            : '6 questions about your personality and lifestyle to reveal your soul season — Spring, Summer, Fall, or Winter? Includes villager match and farm tips.'}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {isZh ? '分享给朋友，看看你们是什么季节配对 →' : 'Share with friends to see what season pair you make →'}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {isZh ? '测出我的季节 →' : 'Find My Season →'}
        </button>
      </div>
    )
  }

  if (step === QUESTIONS.length + 1) {
    const season = calcResult(answers)
    const result = RESULTS[season]
    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {isZh ? '你的灵魂季节是' : 'Your soul season is:'}
          </p>
          <h2 className="text-3xl font-bold text-[#f0a832]">
            {isZh ? result.nameZh : result.nameEn}
          </h2>
          <p className="mt-1 text-sm text-[#8a9a7a]">
            {isZh ? result.taglineZh : result.taglineEn}
          </p>
        </div>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-5">
          <p className="leading-relaxed text-[#e8dcc8]">
            {isZh ? result.descZh : result.descEn}
          </p>
        </div>

        {/* Crops */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold text-[#8a9a7a]">
            {isZh ? '你的季节代表作物' : 'Your season signature crops'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(isZh ? result.cropsZh : result.cropsEn).map((c) => (
              <span key={c} className="rounded-full border border-[#2d5a27] px-3 py-1 text-sm text-[#e8dcc8]">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Villager match */}
        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 p-4">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">
            {isZh ? '最契合你的村民' : 'Your villager match'}
          </p>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh ? result.villagerZh : result.villagerEn}
          </p>
        </div>

        {/* Share */}
        <div className="mb-6">
          <p className="mb-3 text-sm text-[#8a9a7a]">
            {isZh ? '看看朋友是什么季节 →' : "See what season your friends are →"}
          </p>
          <ShareButton
            seasonName={isZh ? result.nameZh : result.nameEn}
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
