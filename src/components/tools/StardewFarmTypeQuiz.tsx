'use client'

import { useState } from 'react'
import Link from 'next/link'

type FarmType = 'standard' | 'forest' | 'riverland' | 'hill-top' | 'beach'

interface Option {
  zh: string
  en: string
  type: FarmType
}

interface Question {
  zh: string
  en: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    zh: '你在农场游戏里最主要的目标是什么？',
    en: 'What is your main goal in a farming game?',
    options: [
      { zh: '最大化作物产量，赚到最多的钱', en: 'Maximize crop output and earn as much gold as possible', type: 'standard' },
      { zh: '自给自足，采集自然资源，过可持续的生活', en: 'Live sustainably, forage, and gather natural resources', type: 'forest' },
      { zh: '钓鱼和做手工艺品，享受水边的慢生活', en: 'Fish all day and craft artisan goods by the water', type: 'riverland' },
      { zh: '挖矿、收集矿石和宝石，探索地下世界', en: 'Mine deep, collect gems, and explore the underground', type: 'hill-top' },
      { zh: '打造最美丽、最独特的沿海农场风格', en: 'Build the most beautiful, unique coastal farm', type: 'beach' },
    ],
  },
  {
    zh: '你理想的星露谷早晨是怎样的？',
    en: 'Your ideal morning in Stardew Valley:',
    options: [
      { zh: '给所有作物浇完水，然后高效地采收出货', en: 'Water every crop and efficiently harvest everything for shipment', type: 'standard' },
      { zh: '在树林里散步，收集橡树树脂和硬木', en: 'Walk through the trees, collecting oak resin and hardwood', type: 'forest' },
      { zh: '天还没亮就去河边钓鱼，一个人安静地守杆', en: 'Cast a line in the river before anyone else wakes up', type: 'riverland' },
      { zh: '直奔采石场，看今天能挖到什么稀有矿石', en: 'Head straight to the quarry to see what minerals appear today', type: 'hill-top' },
      { zh: '沿着海滩走，捡拾退潮留下的贝壳和海草', en: 'Walk the beach looking for shells and kelp left by the tide', type: 'beach' },
    ],
  },
  {
    zh: '面对农场布局，你最看重什么？',
    en: 'When it comes to farm layout, what matters most to you?',
    options: [
      { zh: '大片开阔的可耕地，什么都能种', en: 'Wide open farmable land — room for everything', type: 'standard' },
      { zh: '有树木围绕的边缘，感觉像在森林里', en: 'Wooded edges that make the farm feel like it is in a forest', type: 'forest' },
      { zh: '大量水域，哪怕种地空间少一点也值得', en: 'Lots of water tiles, even if it means less planting space', type: 'riverland' },
      { zh: '有独特地形，比如高地、峡谷、采石区', en: 'Unique terrain — elevated sections, cliffs, a quarry area', type: 'hill-top' },
      { zh: '沙滩地面和潮汐池，哪怕不能用化肥', en: 'Sandy beach tiles and tide pools, even without fertilizer use', type: 'beach' },
    ],
  },
  {
    zh: '游戏里你最享受哪种活动？',
    en: 'Which activity do you enjoy most?',
    options: [
      { zh: '优化生产线，让每一分钟都不浪费', en: 'Optimizing production to make every second count', type: 'standard' },
      { zh: '制作、打造、砍树——自给自足的满足感', en: 'Crafting, building, and chopping — self-sufficiency feels great', type: 'forest' },
      { zh: '完成社区中心的鱼塘捆包，做成高价工艺品', en: 'Completing fish bundles and turning catches into artisan goods', type: 'riverland' },
      { zh: '打开矿石袋，看里面是什么宝石', en: 'Opening geodes and finding out which gem is inside', type: 'hill-top' },
      { zh: '面对挑战，摸索出独特的解决方案', en: 'Taking on challenges and finding unique solutions', type: 'beach' },
    ],
  },
  {
    zh: '你是什么样的玩家？',
    en: 'What kind of player are you?',
    options: [
      { zh: '初心者或想要顺畅游戏体验的老手', en: 'A beginner, or a veteran who wants a smooth experience', type: 'standard' },
      { zh: '喜欢适度挑战，但有丰富回报', en: 'Someone who likes moderate challenge with great rewards', type: 'forest' },
      { zh: '愿意牺牲一点农地来换取垂钓天堂', en: 'Willing to sacrifice some farmland for a fishing paradise', type: 'riverland' },
      { zh: '想玩出独特机制，就算一开始比较难', en: 'Into unique mechanics, even if the start is rough', type: 'hill-top' },
      { zh: '挑最难的模式，把限制变成乐趣', en: 'Always picking the hardest mode and making constraints fun', type: 'beach' },
    ],
  },
  {
    zh: '你的理想星露谷后期农场是？',
    en: 'Your ideal late-game Stardew Valley setup:',
    options: [
      { zh: '温室里全是古代水果，仓库里堆满金币', en: 'Greenhouse full of ancient fruit, warehouse full of gold', type: 'standard' },
      { zh: '硬木小屋被果树环绕，橡树树脂源源不断', en: 'Hardwood cabin surrounded by fruit trees and flowing oak resin', type: 'forest' },
      { zh: '一排排酿酒桶，鱼塘里满是鲟鱼和三文鱼', en: 'Rows of kegs, fish ponds full of sturgeon and salmon', type: 'riverland' },
      { zh: '一整间水晶培育机，出产的都是钻石和红宝石', en: 'A room of crystalariums producing diamonds and rubies', type: 'hill-top' },
      { zh: '潮汐池旁的渔屋，一望无际的沙滩就是我的农场', en: 'A fishing shack by the tide pools — the beach is my farm', type: 'beach' },
    ],
  },
]

interface Result {
  type: FarmType
  nameZh: string
  nameEn: string
  emoji: string
  taglineZh: string
  taglineEn: string
  descZh: string
  descEn: string
  prosZh: string[]
  prosEn: string[]
  tipZh: string
  tipEn: string
  hookZh: string
  hookEn: string
}

const RESULTS: Record<FarmType, Result> = {
  standard: {
    type: 'standard',
    nameZh: '标准农场',
    nameEn: 'Standard Farm',
    emoji: '🌾',
    taglineZh: '最大的可耕地，无限可能',
    taglineEn: 'Most farmable land, infinite possibilities',
    descZh:
      '你是一个务实的农夫，你想要空间，你想要效率，你想要在游戏里建立一个真正的农业帝国。标准农场给你最大的开放可耕地，没有额外的限制和特殊机制干扰——这正是你需要的画布。你喜欢优化、计划、按顺序把每一件事做到最好。',
    descEn:
      'You are a practical farmer who wants space, efficiency, and a real agricultural empire. The Standard Farm gives you the largest open farmable area with no special constraints — the perfect blank canvas. You love optimizing, planning, and executing each phase of the game in order.',
    prosZh: ['最大可耕地面积', '新手最友好', '最适合古代水果/草莓大规模种植', '布局自由度最高'],
    prosEn: ['Largest farmable area', 'Most beginner-friendly', 'Best for ancient fruit / strawberry mass farming', 'Maximum layout freedom'],
    tipZh: '中期目标：温室解锁后种满古代水果，配合酿酒桶年收入破百万金币。',
    tipEn: 'Mid-game goal: unlock the greenhouse and fill it with ancient fruit for 1M+ gold per year with kegs.',
    hookZh:
      'TendFarm 的标准模式为效率型玩家而设计：你的日常步数直接决定作物的丰收节奏，越规律的生活，农场产出越稳定——把现实生活的规律转化为游戏里的农业帝国。',
    hookEn:
      "TendFarm's standard mode is built for efficiency players: your daily steps directly drive harvest rhythms. The more consistent your real-life routine, the more stable your farm output — turn real-world habits into an in-game agricultural empire.",
  },
  forest: {
    type: 'forest',
    nameZh: '森林农场',
    nameEn: 'Forest Farm',
    emoji: '🌲',
    taglineZh: '可再生资源，采集者的天堂',
    taglineEn: 'Renewable resources and forager paradise',
    descZh:
      '你热爱大自然，你想要一个有树木、有苔藓、有野生蘑菇的农场。森林农场的边缘会自动生长可再生的硬木树桩和采集物，你不需要把每一格土地都变成农田——你享受的是那种「土地会自己给你东西」的感觉。你是采集者，也是自给自足的实践者。',
    descEn:
      'You love nature and want a farm with trees, moss, and wild mushrooms. The Forest Farm has renewable hardwood stumps and forage items along its edges — you never need to turn every tile into farmland. You enjoy the feeling that the land gives you things on its own. You are a forager and a self-sufficient homesteader.',
    prosZh: ['边缘自动再生硬木树桩', '定期刷新采集物（蓝莓、蕨类等）', '有独特的大型空地布局', '适合以工艺和自给为核心的玩法'],
    prosEn: ['Renewable hardwood stumps on the edges', 'Regular forage spawns (blueberries, ferns, etc.)', 'Unique large clearing layout', 'Great for crafting and self-sufficiency playstyles'],
    tipZh: '优先种橡树和枫树收取树脂，配合蜜蜂屋和果树，不种一粒作物也能过上好日子。',
    tipEn: 'Prioritize oak and maple trees for resin. Combine with bee houses and fruit trees — you can thrive without planting a single crop.',
    hookZh:
      'TendFarm 特别适合森林农场玩家：你的户外步数在农场里会激活野生采集物的刷新，步行越多，农场边缘越丰饶——你的日常散步就是在给农场「浇水」。',
    hookEn:
      "TendFarm is perfect for Forest Farm players: your outdoor steps activate wild forage spawns on the farm's edges. The more you walk, the more abundant your farm's edges become — your daily stroll is your version of watering crops.",
  },
  riverland: {
    type: 'riverland',
    nameZh: '河地农场',
    nameEn: 'Riverland Farm',
    emoji: '🎣',
    taglineZh: '钓鱼天堂，手工艺品工厂',
    taglineEn: 'Fishing paradise and artisan goods factory',
    descZh:
      '你是个渔夫，也是个工匠。河地农场到处都是水域，你虽然会因此失去不少农田，但你获得的是可以随时随地钓鱼的天堂，以及建设一个以鱼塘和酿酒桶为核心的手工艺品工厂的完美基础。鱼子酱、鱼露、古代水果酒——你的农场是一个小型精品产业链。',
    descEn:
      'You are both a fisherman and an artisan. The Riverland Farm is full of water — you lose farmland, but gain a paradise where you can fish anywhere on your own property, plus the perfect foundation for a fish pond and keg-based artisan empire. Caviar, fish sauce, ancient fruit wine — your farm is a boutique operation.',
    prosZh: ['农场内部可随时钓鱼', '鱼塘布置天然融入景观', '酿酒桶 + 鱼子酱 = 极高收益', '视觉上非常独特美观'],
    prosEn: ['Fish anywhere on your own farm', 'Fish ponds blend naturally into the landscape', 'Kegs + caviar = extremely high income', 'Visually unique and beautiful'],
    tipZh: '优先建鲟鱼鱼塘出产鱼子酱，每个鱼子酱价值 500 金。再配古代水果酒，年收入轻松破百万。',
    tipEn: 'Prioritize a sturgeon fish pond for caviar (500g each). Add ancient fruit wine for 1M+ gold per year without much effort.',
    hookZh:
      'TendFarm 的水系节律与河地农场天然契合：你的睡眠质量决定鱼塘的产出，深度睡眠越多，鲟鱼产鱼子酱的频率越高——用真实的休息换取游戏里的顶级渔获。',
    hookEn:
      "TendFarm's water rhythms naturally match the Riverland Farm: your sleep quality determines fish pond output. More deep sleep means sturgeons produce caviar more often — trade real rest for the game's top-tier catch.",
  },
  'hill-top': {
    type: 'hill-top',
    nameZh: '山顶农场',
    nameEn: 'Hill-top Farm',
    emoji: '⛏️',
    taglineZh: '采石场、矿石与稀有宝石',
    taglineEn: 'Quarry, ores, and rare gems on your own land',
    descZh:
      '你不是来种地的，你是来挖矿的。山顶农场有一个独特的小型采石场，可以刷新矿石和宝石——这意味着你不需要每次都下到矿洞深处，你的农场本身就是一个资源点。你喜欢地质学、收藏、稀有物品，以及那种「打开矿石袋不知道里面是什么」的期待感。',
    descEn:
      'You are not here to farm — you are here to mine. The Hill-top Farm has a unique small quarry that spawns ores and gems, meaning your farm itself is a resource node. You love geology, collecting, rare items, and the anticipation of cracking open a geode without knowing what is inside.',
    prosZh: ['农场内的采石场每天刷新矿石', '独特的高地地形', '特别适合以矿石和水晶培育机为核心的玩法', '地形视觉效果极强'],
    prosEn: ['On-farm quarry refreshes ores daily', 'Unique elevated terrain', 'Perfect for crystalarium and mineral-focused playstyle', 'Visually dramatic terrain'],
    tipZh: '早期解锁爆破物，迅速清空采石场。中期建水晶培育机复制钻石，是最高效的被动收益之一。',
    tipEn: 'Unlock bombs early and clear the quarry fast. Mid-game, fill crystalariums with diamonds for one of the most efficient passive incomes.',
    hookZh:
      'TendFarm 的矿物节律为山顶玩家定制：你每天的步数在农场里会解锁稀有矿石的刷新，探索得越多，采石场出产越丰厚——把你的日常行走转化为游戏里的矿石财富。',
    hookEn:
      "TendFarm's mineral rhythm is built for hill-top players: your daily steps unlock rare ore spawns in the quarry. The more you explore in real life, the richer your quarry becomes — turn your walks into in-game mineral wealth.",
  },
  beach: {
    type: 'beach',
    nameZh: '海滩农场',
    nameEn: 'Beach Farm',
    emoji: '🏖️',
    taglineZh: '最美但最难——沙地挑战者',
    taglineEn: "The most beautiful and hardest — a challenger's farm",
    descZh:
      '你选择了最难的路，但也是最美的路。海滩农场的沙地不能用化肥，退潮会带来随机物品，你需要用更多智慧来设计作物布局。但当一切配合好的时候，你的农场会是星露谷里最独特的风景——潮汐池、沙滩路、渔屋。你不走寻常路，你把限制变成美学。',
    descEn:
      "You chose the hardest path, but also the most beautiful. The Beach Farm's sandy soil can't use fertilizer, but the tide washes in random items, and you must design smarter crop layouts. When it all comes together, your farm is the most unique landscape in Stardew Valley — tide pools, sandy paths, a fishing shack. You never take the easy route; you turn constraints into aesthetics.",
    prosZh: ['最独特的视觉风格', '潮汐自动带来贝壳、海草等采集物', '海湾内部可以钓鱼', '接受挑战的玩家的终极成就感'],
    prosEn: ['Most distinctive visual aesthetic', 'Tide brings free forage (shells, coral, etc.)', 'Can fish in the bay on your farm', 'Ultimate satisfaction for challenge-seekers'],
    tipZh: '沙地种作物不能用化肥，但可以用灌溉系统弥补。种植无肥料需求的葡萄（秋季）和南瓜是前期最优解。',
    tipEn: "Sandy soil can't hold fertilizer, but irrigation systems compensate. Plant no-fertilizer crops like fall grapes and pumpkins early — they work on sand.",
    hookZh:
      'TendFarm 最适合海滩农场玩家中的「挑战型」人格：你的不规律睡眠和非标准步数，在农场里会产生罕见的潮汐事件——正是这种不可预测性，让你的农场每天都有新发现。',
    hookEn:
      "TendFarm suits Beach Farm challenge-seekers best: your irregular sleep and non-standard steps create rare tidal events on the farm — that unpredictability means something new washes up every day.",
  },
}

function calcResult(answers: FarmType[]): FarmType {
  const counts: Record<FarmType, number> = {
    standard: 0,
    forest: 0,
    riverland: 0,
    'hill-top': 0,
    beach: 0,
  }
  answers.forEach((a) => counts[a]++)
  return (Object.keys(counts) as FarmType[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b))
}

interface ShareButtonProps {
  farmName: string
  locale: string
  isZh: boolean
}

function ShareButton({ farmName, locale, isZh }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://www.farmgamehub.com/${locale}/quizzes/stardew-farm-type`
  const text = isZh
    ? `我在星露谷最适合「${farmName}」！来测测你的农场类型：${url}`
    : `My ideal Stardew Valley farm is the ${farmName}! Find yours: ${url}`

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

export function StardewFarmTypeQuiz({ locale }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<FarmType[]>([])
  const isZh = locale === 'zh'

  const handleAnswer = (type: FarmType) => {
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
        <div className="mb-6 text-6xl">🏡</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {isZh ? '你适合哪种星露谷农场？' : 'Which Stardew Valley Farm Is Right for You?'}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {isZh
            ? '6 个关于游戏风格的问题，帮你在五种官方农场类型（标准、森林、河地、山顶、海滩）中找到最适合你的那一个。'
            : '6 questions about your playstyle to find your perfect farm — Standard, Forest, Riverland, Hill-top, or Beach?'}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {isZh ? '新一轮游戏前做一下，少走弯路 →' : 'Take this before your next run — save yourself hours of second-guessing →'}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {isZh ? '找到我的农场 →' : 'Find My Farm →'}
        </button>
      </div>
    )
  }

  if (step === QUESTIONS.length + 1) {
    const farmType = calcResult(answers)
    const result = RESULTS[farmType]
    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {isZh ? '你最适合的农场是' : 'Your perfect farm is:'}
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

        {/* Pros */}
        <div className="mb-5">
          <p className="mb-2 text-xs font-semibold text-[#8a9a7a]">
            {isZh ? '这种农场的优势' : 'Why this farm works for you'}
          </p>
          <ul className="space-y-1">
            {(isZh ? result.prosZh : result.prosEn).map((pro) => (
              <li key={pro} className="flex items-start gap-2 text-sm text-[#e8dcc8]">
                <span className="mt-0.5 text-[#f0a832]">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro tip */}
        <div className="mb-5 rounded-xl border border-[#2d5a27] bg-[#1a2e1a]/40 p-4">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">
            {isZh ? '老手小贴士' : 'Pro tip'}
          </p>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh ? result.tipZh : result.tipEn}
          </p>
        </div>

        {/* Share */}
        <div className="mb-6">
          <p className="mb-3 text-sm text-[#8a9a7a]">
            {isZh ? '分享给你的农场队友 →' : 'Share with your farming squad →'}
          </p>
          <ShareButton
            farmName={isZh ? result.nameZh : result.nameEn}
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
