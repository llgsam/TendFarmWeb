'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Game = 'mineral-town' | 'wonderful-life' | 'olive-town' | 'rune-factory'

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
  options: Array<{ en: string; zh: string; type: Game }>
}> = [
  {
    q_en: 'How much time do you usually have for a gaming session?',
    q_zh: '你通常有多少时间玩一次游戏？',
    options: [
      { en: '30–60 min — I need something I can pick up and put down easily', zh: '30-60 分钟——我需要随时能拿起来放下的游戏', type: 'mineral-town' },
      { en: '1–2 hours — I like a steady rhythm without rushing', zh: '1-2 小时——我喜欢不紧不慢的节奏', type: 'wonderful-life' },
      { en: '2–3 hours — I love getting deep into building and progression', zh: '2-3 小时——我喜欢深入建造和成长的过程', type: 'olive-town' },
      { en: '3+ hours — I want a full experience with combat and story', zh: '3 小时以上——我想要有战斗和故事的完整体验', type: 'rune-factory' },
    ],
  },
  {
    q_en: "What draws you most to farming games?",
    q_zh: '你最喜欢农场游戏的哪个方面？',
    options: [
      { en: 'The satisfying loop of planting, growing, and selling', zh: '种植、成长、出售的满足感循环', type: 'mineral-town' },
      { en: 'The characters and their evolving relationships over years', zh: '人物和他们随时间变化的关系', type: 'wonderful-life' },
      { en: 'Building and designing a town or farm from scratch', zh: '从零开始建造和设计城镇或农场', type: 'olive-town' },
      { en: 'Adventure — exploring dungeons and fighting monsters between farm days', zh: '冒险——在农场日之间探索地下城和战斗', type: 'rune-factory' },
    ],
  },
  {
    q_en: 'Romance and marriage in farming games are:',
    q_zh: '农场游戏里的恋爱和结婚对你来说是？',
    options: [
      { en: 'A fun goal — I enjoy gifting and building romance slowly', zh: '有趣的目标——我喜欢慢慢送礼和建立感情', type: 'mineral-town' },
      { en: 'Central — I want to watch my family grow and age together', zh: '核心内容——我想看着家庭一起成长和变老', type: 'wonderful-life' },
      { en: 'Nice but secondary — I care more about the town community', zh: '不错但次要——我更在乎城镇社区', type: 'olive-town' },
      { en: 'Part of a rich character system with deep storylines', zh: '丰富角色系统和深度故事线的组成部分', type: 'rune-factory' },
    ],
  },
  {
    q_en: 'How do you feel about action or combat in a farming game?',
    q_zh: '你对农场游戏里的动作或战斗元素怎么看？',
    options: [
      { en: "No combat please — pure farming and life simulation", zh: '不要战斗——纯粹的农场和生活模拟', type: 'mineral-town' },
      { en: "Minimal is fine — light mine exploration is enough", zh: '少量就好——轻度探索矿洞就够了', type: 'wonderful-life' },
      { en: "A little gathering and resource collection but nothing intense", zh: '一点采集和资源收集，但不要太激烈', type: 'olive-town' },
      { en: "I want real combat — dungeons, bosses, and progression", zh: '我想要真正的战斗——地下城、Boss 和成长体系', type: 'rune-factory' },
    ],
  },
  {
    q_en: 'Your preferred game length for a farming game is:',
    q_zh: '你偏好农场游戏的时长是？',
    options: [
      { en: "Compact and replayable — one run is 20–40 hours, then new game+", zh: '紧凑可重玩——一轮 20-40 小时，然后新周目', type: 'mineral-town' },
      { en: "A single meaningful story — I want a satisfying ending", zh: '一个有意义的故事——我想要令人满足的结局', type: 'wonderful-life' },
      { en: "Open-ended — I want to keep building with no clear finish", zh: '开放式——我想不断建造，没有明确的终点', type: 'olive-town' },
      { en: "Epic — 60-100+ hours with lots of content and story routes", zh: '史诗级——60-100 小时以上，有大量内容和故事路线', type: 'rune-factory' },
    ],
  },
  {
    q_en: 'When you hear "classic farming game," the first image that comes to mind is:',
    q_zh: '听到"经典农场游戏"，你脑海中第一个浮现的画面是？',
    options: [
      { en: "A cozy mountain town, festivals, and a simple but perfect farm", zh: '一个舒适的山间小镇、节日和简单而完美的农场', type: 'mineral-town' },
      { en: "A life lived across seasons, watching your child grow up", zh: '跨越季节的人生，看着孩子长大', type: 'wonderful-life' },
      { en: "Building a town from the ground up with your own hands", zh: '亲手从头建造一座城镇', type: 'olive-town' },
      { en: "A magical world where farming and dungeon-crawling coexist", zh: '农场耕种和地下城探索共存的魔法世界', type: 'rune-factory' },
    ],
  },
]

const RESULTS: Record<
  Game,
  {
    title_en: string
    title_zh: string
    emoji: string
    tag_en: string
    tag_zh: string
    desc_en: string
    desc_zh: string
    platform_en: string
    platform_zh: string
    pro_en: string[]
    pro_zh: string[]
  }
> = {
  'mineral-town': {
    title_en: 'Story of Seasons: Friends of Mineral Town',
    title_zh: '牧场物语：矿石镇的伙伴们',
    emoji: '⛰️',
    tag_en: 'Classic · Compact · Perfect for Beginners',
    tag_zh: '经典 · 紧凑 · 新手友好',
    desc_en:
      "Friends of Mineral Town is the refined essence of what makes Story of Seasons magical — a cozy mountain town, a cast of memorable villagers, festivals that anchor every season, and a farm that rewards every hour you put in. The 2020 remake modernizes it beautifully without losing the soul of the original. It is the ideal first game and also deeply replayable.",
    desc_zh:
      '矿石镇的伙伴们是牧场物语系列魔力的精华——一个舒适的山间小镇、令人难忘的村民群体、每个季节都有固定节日，以及会回报你每一小时投入的农场。2020 年的重制版在保留原作灵魂的前提下进行了漂亮的现代化改良。它既是理想的入门之作，也极具重玩价值。',
    platform_en: 'Nintendo Switch · Steam · Mobile',
    platform_zh: 'Nintendo Switch · Steam · 手机',
    pro_en: [
      'Perfect on-ramp for the Story of Seasons / Harvest Moon franchise',
      'Tight, satisfying gameplay loop that works in short sessions',
      'Includes both same-sex and opposite-sex marriage options in the remake',
    ],
    pro_zh: [
      '进入牧场物语 / 星露之月系列的完美入口',
      '紧凑满足的游戏循环，短时间游玩也很舒适',
      '重制版支持同性和异性婚姻选项',
    ],
  },
  'wonderful-life': {
    title_en: 'Story of Seasons: A Wonderful Life',
    title_zh: '牧场物语：美好的一生',
    emoji: '🌿',
    tag_en: 'Emotional · Story-Driven · Life Simulation',
    tag_zh: '感情深厚 · 故事驱动 · 人生模拟',
    desc_en:
      "A Wonderful Life is unlike any other farming game — it follows your character across multiple life chapters, from young adult to old age, watching your marriage evolve, your children grow, and your farm change. The 2023 remake adds new marriage candidates, story content, and modern quality-of-life improvements. If you want a farming game that makes you feel something, this is it.",
    desc_zh:
      '《美好的一生》是一款与众不同的农场游戏——它跟随你的角色经历人生多个章节，从青年到老年，见证婚姻的演变、孩子的成长和农场的变化。2023 年重制版新增了婚姻候选人、故事内容和现代化品质改进。如果你想要一款能让你真正有所感触的农场游戏，这就是它。',
    platform_en: 'Nintendo Switch · PlayStation · Xbox · Steam',
    platform_zh: 'Nintendo Switch · PlayStation · Xbox · Steam',
    pro_en: [
      'Unique life-stage narrative that no other farming game matches',
      '2023 remake adds significant new content including new romance options',
      'Moving, quiet storytelling that stays with you long after you finish',
    ],
    pro_zh: [
      '独一无二的人生阶段叙事，其他农场游戏无法复制',
      '2023 年重制版增加了大量新内容，包括新的恋爱对象',
      '安静感人的叙事，结束后依然让你久久回味',
    ],
  },
  'olive-town': {
    title_en: 'Story of Seasons: Pioneers of Olive Town',
    title_zh: '牧场物语：橄榄镇与希望的大地',
    emoji: '🏗️',
    tag_en: 'Builder · Modern · Town Development',
    tag_zh: '建造型 · 现代 · 城镇发展',
    desc_en:
      "Pioneers of Olive Town puts town-building and environmental restoration front and center. You start with a neglected farm and gradually transform it — and the entire town — into a thriving community. It is the most modern entry in the series with the most detailed crafting system. If you love watching raw wilderness become something beautiful, this is your game.",
    desc_zh:
      '《橄榄镇与希望的大地》将城镇建造和环境修复放在核心位置。你从一片荒废的农场出发，逐渐将它——以及整个城镇——改造成欣欣向荣的社区。这是系列最现代的作品，有着最详细的制作系统。如果你喜欢看着荒野变成美丽之地的过程，这就是你的游戏。',
    platform_en: 'Nintendo Switch · Steam',
    platform_zh: 'Nintendo Switch · Steam',
    pro_en: [
      'Most ambitious scope in the series — building a whole town, not just a farm',
      'Detailed crafting and production chains reward patient builders',
      'Visually the most polished entry in the Story of Seasons series',
    ],
    pro_zh: [
      '系列中最宏大的规模——建造整个城镇，而不仅仅是农场',
      '详细的制作和生产链让有耐心的建造者获得充分回报',
      '视觉上是牧场物语系列中制作最精良的作品',
    ],
  },
  'rune-factory': {
    title_en: 'Rune Factory 4 Special',
    title_zh: '符文工房 4 豪华版',
    emoji: '⚔️',
    tag_en: 'Action-RPG · Deep Story · Combat + Farming',
    tag_zh: '动作 RPG · 深度故事 · 战斗 + 农场',
    desc_en:
      "Rune Factory 4 is the gold standard for players who want farming and adventure in equal measure. You manage your farm, cook, craft, build relationships with a cast of memorable characters — and then dive into dungeons and fight bosses. The Special edition on Switch and PC adds new content and is the definitive version. It has more story depth, romance depth, and combat depth than any other entry in this quiz.",
    desc_zh:
      '符文工房 4 是想要农场和冒险并重的玩家的黄金标准。你管理农场、烹饪、制作、与一群令人难忘的角色建立关系——然后跳进地下城和 Boss 战斗。Switch 和 PC 上的豪华版增加了新内容，是最终极的版本。它的故事深度、恋爱深度和战斗深度都是本次测验中所有选项里最高的。',
    platform_en: 'Nintendo Switch · Steam',
    platform_zh: 'Nintendo Switch · Steam',
    pro_en: [
      'Best-in-class combination of farming, cooking, crafting, and action RPG combat',
      'Story has two major arcs plus epilogue — substantial narrative depth',
      'Romance routes are among the most developed in the genre',
    ],
    pro_zh: [
      '农场、烹饪、制作和动作 RPG 战斗的最佳综合体',
      '故事有两条主线弧和尾声——叙事深度相当可观',
      '恋爱路线是该类型游戏中最有深度的之一',
    ],
  },
}

function calcResult(answers: Game[]): Game {
  const counts: Record<Game, number> = {
    'mineral-town': 0,
    'wonderful-life': 0,
    'olive-town': 0,
    'rune-factory': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Game
}

export function HarvestMoonQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Game | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Game[])]
    const url = `${BASE_URL}/${locale}/quizzes/harvest-moon-quiz`
    const shareText = isZh
      ? `最适合我的牧场物语游戏是「${result.title_zh}」！快来测测你应该玩哪款：${url}`
      : `My perfect Story of Seasons game is ${result.title_en}! Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {isZh ? result.platform_zh : result.platform_en}
          </p>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.desc_zh : result.desc_en}
        </p>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {isZh ? '为什么适合你' : 'Why it fits you'}
          </h3>
          <ul className="space-y-2">
            {(isZh ? result.pro_zh : result.pro_en).map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——帮你把游戏里的慢生活节奏带入现实。'
              : 'TendFarm is building a farm rhythm tracker — bringing slow-living from games into real life.'}
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
          {isZh
            ? '哪款牧场物语 / 符文工房最适合你？'
            : 'Which Story of Seasons Game Should You Play?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，找到最适合你游戏风格的那一款'
            : '6 questions to find your perfect match in the Harvest Moon / Story of Seasons series'}
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
        {isZh ? '查看推荐' : 'Get My Recommendation'}
      </button>
    </div>
  )
}
