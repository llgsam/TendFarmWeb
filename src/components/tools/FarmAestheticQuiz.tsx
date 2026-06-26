'use client'

import { useState } from 'react'
import Link from 'next/link'

type Aesthetic = 'cottagecore' | 'dark-moody' | 'bright-cheerful' | 'zen-minimal' | 'cozy-rustic'

interface Option {
  zh: string
  en: string
  type: Aesthetic
}

interface Question {
  zh: string
  en: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    zh: '你理想的农场早晨是什么样的？',
    en: 'Your ideal farm morning looks like:',
    options: [
      { zh: '薄雾中，穿着麻布裙去采野花', en: 'Walking through mist in a linen dress, picking wildflowers', type: 'cottagecore' },
      { zh: '乌云压着雾气，在静谧中喝一杯黑茶', en: 'Low clouds, fog, and a quiet cup of black tea in the stillness', type: 'dark-moody' },
      { zh: '阳光灿烂，到处都是缤纷的颜色', en: 'Bright sunshine, colorful flowers everywhere, cheerful sounds', type: 'bright-cheerful' },
      { zh: '极简整洁，一杯白茶，听鸟叫', en: 'Minimal and clean — a cup of white tea and birdsong', type: 'zen-minimal' },
      { zh: '木屋里有柴火的味道，外面是金色秋叶', en: 'Woodsmoke from the hearth, golden autumn leaves outside', type: 'cozy-rustic' },
    ],
  },
  {
    zh: '你的农场窗台上放着什么？',
    en: "What's on your farmhouse windowsill?",
    options: [
      { zh: '干花束、蜂蜡蜡烛、一本旧诗集', en: 'Dried flower bunches, a beeswax candle, a worn poetry book', type: 'cottagecore' },
      { zh: '苔藓、蘑菇标本、一个黑色花瓶', en: 'Moss, mushroom specimens, and a single black vase', type: 'dark-moody' },
      { zh: '彩虹水晶、色彩缤纷的多肉、贝壳', en: 'Rainbow crystals, colorful succulents, and seashells', type: 'bright-cheerful' },
      { zh: '一盆简单的绿植，什么都不多', en: 'One simple green plant — nothing more, nothing less', type: 'zen-minimal' },
      { zh: '亲手做的果酱罐、松果、一块粗陶杯', en: 'Homemade jam jars, pinecones, a handmade ceramic mug', type: 'cozy-rustic' },
    ],
  },
  {
    zh: '你的农场颜色主调是？',
    en: "Your farm's color palette is:",
    options: [
      { zh: '米白、鼠尾草绿、淡玫瑰、蜜蜡黄', en: 'Cream, sage green, blush rose, and beeswax yellow', type: 'cottagecore' },
      { zh: '深墨绿、炭灰、雾蓝、暗紫', en: 'Deep forest green, charcoal, mist blue, and dark plum', type: 'dark-moody' },
      { zh: '天蓝、柠檬黄、珊瑚橙、薄荷绿', en: 'Sky blue, lemon yellow, coral, and mint green', type: 'bright-cheerful' },
      { zh: '白、米白、浅灰、原木色', en: 'White, off-white, light grey, and natural wood tones', type: 'zen-minimal' },
      { zh: '深栗棕、橘红、苔绿、暖黄', en: 'Deep chestnut, burnt orange, moss green, and amber', type: 'cozy-rustic' },
    ],
  },
  {
    zh: '太阳落山时，你的农场是什么感觉？',
    en: 'When the sun goes down, your farm feels:',
    options: [
      { zh: '金色光芒穿过白色窗帘，像童话里一样', en: 'Golden light through white curtains — like a fairy tale', type: 'cottagecore' },
      { zh: '灯笼和蜡烛亮起来，有点神秘，很美', en: 'Lanterns and candles flickering — mysterious and beautiful', type: 'dark-moody' },
      { zh: '灯光通明，到处都是欢声笑语', en: 'Bright lights everywhere, laughter, and music in the air', type: 'bright-cheerful' },
      { zh: '安静归位，简单，一片祥和', en: 'Everything settles into quiet — simple and utterly peaceful', type: 'zen-minimal' },
      { zh: '壁炉燃起，毛毯盖上，最好的时刻', en: 'Fireplace lit, blanket on, the best part of the day', type: 'cozy-rustic' },
    ],
  },
  {
    zh: '你的农场世界里播放着什么音乐？',
    en: 'What music plays in your farm world?',
    options: [
      { zh: '民谣、竖琴、轻柔的口哨声', en: 'Folk music, harp melodies, and soft whistling', type: 'cottagecore' },
      { zh: '大提琴、雨声、黑暗古典乐', en: 'Cello, rain sounds, and dark classical music', type: 'dark-moody' },
      { zh: '动森原声带、欢快的吉他、合成器流行', en: "Animal Crossing OST, upbeat guitar, synth-pop", type: 'bright-cheerful' },
      { zh: '日式禅意音乐、流水声、无声', en: 'Japanese zen music, water sounds, or silence', type: 'zen-minimal' },
      { zh: '乡村民谣、原声吉他、温暖的钢琴', en: 'Country folk, acoustic guitar, and warm piano', type: 'cozy-rustic' },
    ],
  },
  {
    zh: '你农场最具代表性的一个场景是？',
    en: 'The most iconic scene on your farm:',
    options: [
      { zh: '野花丛里的蜜蜂，旁边是手工蜂蜡蜡烛', en: 'Bees among wildflowers beside a handmade beeswax candle', type: 'cottagecore' },
      { zh: '雨中的蘑菇圈，乌鸦站在旧围栏上', en: 'A mushroom ring in the rain, a raven perched on an old fence', type: 'dark-moody' },
      { zh: '向日葵田里的彩虹，旁边是彩色小屋', en: 'A rainbow over a sunflower field beside a colorful cottage', type: 'bright-cheerful' },
      { zh: '白鹅石子路，竹林，极简的木制农具', en: 'White pebble paths, bamboo grove, and minimal wooden tools', type: 'zen-minimal' },
      { zh: '苹果树下的木桌，一壶热茶，秋日午后', en: 'A wooden table under apple trees with hot tea on an autumn afternoon', type: 'cozy-rustic' },
    ],
  },
]

interface Result {
  type: Aesthetic
  nameZh: string
  nameEn: string
  emoji: string
  taglineZh: string
  taglineEn: string
  descZh: string
  descEn: string
  gamesZh: string[]
  gamesEn: string[]
  hookZh: string
  hookEn: string
}

const RESULTS: Record<Aesthetic, Result> = {
  cottagecore: {
    type: 'cottagecore',
    nameZh: 'Cottagecore 田园梦',
    nameEn: 'Cottagecore',
    emoji: '🌸',
    taglineZh: '野花、蜂蜜与麻布的浪漫',
    taglineEn: 'Wildflowers, honey, and linen romance',
    descZh:
      '你的农场是一首关于慢生活的诗。野花在石墙边自由生长，蜂蜜罐整整齐齐排在木架上，窗帘是手工刺绣的薄棉布。你不追求效率，你追求的是那种「一切都是自然长出来的」的美感——有点杂乱，有点旧，有点像祖母家的菜园，但每一个角落都充满生命力。',
    descEn:
      "Your farm is a poem about slow living. Wildflowers grow freely by stone walls, honey jars line wooden shelves, curtains are hand-embroidered thin cotton. You don't chase efficiency — you chase the feeling that everything grew naturally. A little wild, a little old, a little like grandmother's garden, but every corner is alive.",
    gamesZh: ['星露谷物语（植物季节换装）', 'Wylde Flowers', 'Cozy Grove', 'Garden Story'],
    gamesEn: ['Stardew Valley (seasonal decorating)', 'Wylde Flowers', 'Cozy Grove', 'Garden Story'],
    hookZh:
      'TendFarm 为 Cottagecore 玩家提供了最真实的「自然生长」体验：你的睡眠、步数和节律驱动农场随季节变化，野花和蜂蜜会在对的时机出现。不是你控制农场，是你的生活方式在滋养它。',
    hookEn:
      "TendFarm gives Cottagecore players the most authentic 'natural growth' experience: your sleep, steps, and rhythms drive the farm's seasonal changes. Wildflowers and honey appear at the right moment. You don't control the farm — your lifestyle nourishes it.",
  },
  'dark-moody': {
    type: 'dark-moody',
    nameZh: 'Dark & Moody 暗调农场',
    nameEn: 'Dark & Moody',
    emoji: '🌑',
    taglineZh: '雾气、蘑菇与神秘的美',
    taglineEn: 'Mist, mushrooms, and mysterious beauty',
    descZh:
      '你的农场有一种别人进不去的氛围。暗色的石头小径，乌鸦停在旧木桩上，雨后的蘑菇圈，提灯而不是探照灯。你不喜欢过于明亮或过于「可爱」的东西，你喜欢那种让人觉得「这里有故事」的感觉。你的农场是哥特式的，但也是治愈的——是那种让你一个人坐在角落里喝茶、觉得全世界都静下来了的地方。',
    descEn:
      "Your farm has an atmosphere others can't quite enter. Dark stone paths, a raven on an old post, mushroom circles after rain, lanterns instead of floodlights. You dislike things that are too bright or too cute. You like that feeling of 'there's a story here.' Your farm is gothic but also healing — the kind of place where you sit alone with tea and feel the whole world grow quiet.",
    gamesZh: ['星露谷物语（矿洞季节、万圣节主题）', 'Palia（夜间版本）', 'Spiritfarer', 'Stardew Gothic 主题包'],
    gamesEn: ['Stardew Valley (mine season, Halloween)', 'Spiritfarer', 'Palia (night mode)', 'Salt and Sanctuary Farm mods'],
    hookZh:
      'TendFarm 对暗调玩家而言有独特的魔力：夜间步数、深度睡眠数据，在农场里会转化成神秘的夜间作物和稀有的月光收获。你的农场在你睡着的时候，也在悄悄生长。',
    hookEn:
      "TendFarm has a unique magic for dark aesthetic players: your nighttime steps and deep sleep data transform into rare night-harvest crops and moonlit yields. Your farm grows quietly while you sleep.",
  },
  'bright-cheerful': {
    type: 'bright-cheerful',
    nameZh: 'Bright & Cheerful 彩虹农场',
    nameEn: 'Bright & Cheerful',
    emoji: '🌈',
    taglineZh: '色彩、友谊与永恒的阳光',
    taglineEn: 'Color, friendship, and eternal sunshine',
    descZh:
      '你的农场是世界上最快乐的地方。向日葵和三色堇争着开放，彩色的小屋前挂着风铃，友好的 NPC 们随时来串门。你不喜欢「沉重」的东西，你的农场就是为了让每次打开都能会心一笑而存在的。配色大胆、热闹、充满活力——就像永远是春天最好的那一天。',
    descEn:
      "Your farm is the happiest place in the world. Sunflowers and pansies compete to bloom, colorful cottages have wind chimes at the door, and friendly NPCs drop by anytime. You don't like heavy things. Your farm exists to make you smile every time you open it. Bold colors, lively, full of energy — like the best spring day, every day.",
    gamesZh: ['动物森友会', 'Coral Island', 'Stardew Valley（春夏布置）', 'Harvestella'],
    gamesEn: ['Animal Crossing: New Horizons', 'Coral Island', 'Stardew Valley (spring/summer builds)', 'Harvestella'],
    hookZh:
      'TendFarm 的彩虹模式为 Bright & Cheerful 玩家而生：日照步数在农场里会触发特殊的阳光花田，快乐的运动节律让农场配色更丰富。你越活泼，农场越缤纷。',
    hookEn:
      "TendFarm's bright mode is made for Cheerful players: outdoor steps trigger special sunlit flower fields, and an active rhythm makes the farm's colors richer. The more vibrant your life, the more colorful your farm.",
  },
  'zen-minimal': {
    type: 'zen-minimal',
    nameZh: '禅意极简 Wabi-Sabi',
    nameEn: 'Zen Minimal',
    emoji: '🎋',
    taglineZh: '留白、简洁与内心平静',
    taglineEn: 'Negative space, simplicity, and inner stillness',
    descZh:
      '你的农场是少的艺术。一条白鹅石径，几株精心选择的竹子，空气是干净的，留白是有意为之的。你不需要热闹，不需要收藏，你需要的是那种「一切各归其位」的感觉。你的农场让人平静，不是因为什么都没有，而是因为每一件东西都恰好在它应该在的地方。',
    descEn:
      "Your farm is the art of less. A white pebble path, a few carefully chosen bamboo plants, clean air, and deliberate negative space. You don't need bustle or collection — you need everything in its right place. Your farm brings calm not because it's empty, but because every element is exactly where it should be.",
    gamesZh: ['星露谷物语（日式布置 Mod）', 'Sakuna: Of Rice and Ruin', 'Nour', '天穗之咲稻姬'],
    gamesEn: ['Stardew Valley (Japanese layout mods)', 'Sakuna: Of Rice and Ruin', 'Nour', 'Wabi-Sabi farm builds'],
    hookZh:
      'TendFarm 对极简主义者来说是完美的：你什么都不需要主动做，农场就在你的日常节律里默默成长。冥想、散步、早睡——每一个习惯都在为你的农场添砖加瓦，不动声色地。',
    hookEn:
      "TendFarm is perfect for minimalists: you don't need to do anything actively — the farm grows quietly from your daily rhythms. Meditation, walks, early sleep — every habit builds your farm without fanfare.",
  },
  'cozy-rustic': {
    type: 'cozy-rustic',
    nameZh: 'Cozy Rustic 秋日暖农',
    nameEn: 'Cozy Rustic',
    emoji: '🍂',
    taglineZh: '柴火、苹果派与秋日的温度',
    taglineEn: 'Woodsmoke, apple pie, and autumn warmth',
    descZh:
      '你的农场是全世界最温暖的地方。粗糙的木头家具，亲手腌制的果酱，满树的苹果等待采摘，壁炉的烟从烟囱飘出去。你的审美不是精致的——它是真实的、有温度的、有生活气息的。来到你的农场，就像来到一个「这里没有表演，只有真实」的地方。',
    descEn:
      "Your farm is the warmest place on earth. Rough wooden furniture, handmade preserves, apple trees waiting to be picked, wood smoke rising from the chimney. Your aesthetic isn't polished — it's real, warm, and lived-in. Coming to your farm feels like arriving somewhere that says: no performance here, just life.",
    gamesZh: ['星露谷物语（秋冬季节）', 'Hay Day', 'My Time at Portia', 'Farming Simulator（农庄建设）'],
    gamesEn: ['Stardew Valley (fall/winter builds)', 'Hay Day', 'My Time at Portia', 'Farming Simulator (homestead mode)'],
    hookZh:
      'TendFarm 为 Cozy Rustic 玩家设计了最温暖的体验：稳定的作息和步数让农场呈现丰收的秋日色调；好好睡觉，明天醒来农场就多一点暖意。你的生活节律，就是农场的四季。',
    hookEn:
      "TendFarm creates the warmest experience for Cozy Rustic players: a stable routine and daily steps give the farm a rich harvest palette; sleep well and wake to a warmer farm. Your life rhythms are the farm's seasons.",
  },
}

function calcResult(answers: Aesthetic[]): Aesthetic {
  const counts: Record<Aesthetic, number> = {
    cottagecore: 0,
    'dark-moody': 0,
    'bright-cheerful': 0,
    'zen-minimal': 0,
    'cozy-rustic': 0,
  }
  answers.forEach((a) => counts[a]++)
  return (Object.keys(counts) as Aesthetic[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b))
}

interface ShareButtonProps {
  aestheticName: string
  locale: string
  isZh: boolean
}

function ShareButton({ aestheticName, locale, isZh }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://www.farmgamehub.com/${locale}/quizzes/farm-aesthetic`
  const text = isZh
    ? `我的农场美学是「${aestheticName}」！来测测你的农场风格：${url}`
    : `My farm aesthetic is "${aestheticName}"! Find yours: ${url}`

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

export function FarmAestheticQuiz({ locale }: Props) {
  const [step, setStep] = useState<number>(0)
  const [answers, setAnswers] = useState<Aesthetic[]>([])
  const isZh = locale === 'zh'

  const handleAnswer = (type: Aesthetic) => {
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
        <div className="mb-6 text-6xl">🌿</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {isZh ? '你的农场美学是什么风格？' : "What's Your Farm Aesthetic?"}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {isZh
            ? '6 个关于美感的问题，测出你的农场灵魂属于哪种美学——Cottagecore、暗调、彩虹、极简还是 Cozy Rustic？'
            : '6 questions about your sensibilities to find your farm aesthetic — Cottagecore, Dark Moody, Bright Cheerful, Zen Minimal, or Cozy Rustic?'}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {isZh ? '结果适合截图，发给审美相近的朋友看 →' : 'Share your result with friends to compare aesthetics →'}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {isZh ? '测出我的美学 →' : 'Find My Aesthetic →'}
        </button>
      </div>
    )
  }

  // Result
  if (step === QUESTIONS.length + 1) {
    const aesthetic = calcResult(answers)
    const result = RESULTS[aesthetic]
    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {isZh ? '你的农场美学是' : 'Your farm aesthetic is:'}
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

        {/* Games */}
        <div className="mb-5">
          <p className="mb-2 text-xs font-semibold text-[#8a9a7a]">
            {isZh ? '适合你美学的游戏' : 'Games that match your aesthetic'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(isZh ? result.gamesZh : result.gamesEn).map((g) => (
              <span key={g} className="rounded-full border border-[#2d5a27] px-3 py-1 text-sm text-[#e8dcc8]">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mb-6">
          <p className="mb-3 text-sm text-[#8a9a7a]">
            {isZh ? '看看朋友的农场美学 →' : "See what aesthetic your friends are →"}
          </p>
          <ShareButton
            aestheticName={isZh ? result.nameZh : result.nameEn}
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
