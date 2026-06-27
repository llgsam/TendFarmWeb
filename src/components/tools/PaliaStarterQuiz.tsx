'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Focus = 'farming' | 'hunting' | 'social' | 'crafting'

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
  options: Array<{ en: string; zh: string; type: Focus }>
}> = [
  {
    q_en: 'You log into Palia for the first time. What calls to you most?',
    q_zh: '你第一次登入 Palia。什么最吸引你？',
    options: [
      { en: 'The gorgeous land around my plot — I want to start growing crops immediately', zh: '我地块周围的美丽土地——我想立刻开始种植作物', type: 'farming' },
      { en: 'The wildlife I can see in the distance — what can I hunt and track out there?', zh: '远处我能看到的野生动物——那里有什么可以追踪和狩猎的？', type: 'hunting' },
      { en: 'The other players around me — I want to meet people and build relationships first', zh: '我周围的其他玩家——我想先认识人、建立关系', type: 'social' },
      { en: 'My inventory — I want to understand what materials I have and what I can make', zh: '我的背包——我想了解我有什么材料、能制作什么', type: 'crafting' },
    ],
  },
  {
    q_en: 'In a cozy game, your most satisfying moment is usually:',
    q_zh: '在 cozy 游戏里，你最满足的时刻通常是：',
    options: [
      { en: 'Harvesting a fully grown field and seeing my crops fill the storage', zh: '收获一整块地，看着农作物填满仓库', type: 'farming' },
      { en: 'Successfully tracking and catching a rare creature I have been chasing', zh: '成功追踪并捕获我一直在寻找的稀有生物', type: 'hunting' },
      { en: 'Finally reaching max friendship with a character I really care about', zh: '终于和一个我真心在乎的角色达到最高友谊等级', type: 'social' },
      { en: 'Unlocking a new crafting recipe and building something complex for the first time', zh: '解锁新的制作配方，第一次建造出复杂的东西', type: 'crafting' },
    ],
  },
  {
    q_en: 'How do you feel about playing with strangers online?',
    q_zh: '你对和陌生人一起在线游戏感觉如何？',
    options: [
      { en: "I'm mostly there for my own farm — other players are background noise I barely notice", zh: '我主要是为了自己的农场——其他玩家是我几乎注意不到的背景', type: 'farming' },
      { en: "I like grouping up when there's something to track or hunt together", zh: '我喜欢在有共同追踪或狩猎目标时组队', type: 'hunting' },
      { en: "I love it — meeting people and chatting is half the reason I play MMOs", zh: '我喜欢——认识人和聊天是我玩 MMO 的一半原因', type: 'social' },
      { en: "I'm fine with others as long as I can trade resources and get crafting help", zh: '我可以接受，只要能和别人交换资源或获得制作帮助', type: 'crafting' },
    ],
  },
  {
    q_en: 'Which resource would you most want to gather in Palia?',
    q_zh: '在 Palia 里你最想采集哪种资源？',
    options: [
      { en: 'Seeds, soil, fertilizer — anything that makes my garden grow better', zh: '种子、土壤、肥料——任何能让我的花园长得更好的东西', type: 'farming' },
      { en: 'Animal parts, rare drops, and trophies from difficult hunts', zh: '动物部位、稀有掉落物和艰难狩猎获得的战利品', type: 'hunting' },
      { en: "Gifts for characters — I always want to know what each person likes best", zh: '给角色的礼物——我总是想知道每个人最喜欢什么', type: 'social' },
      { en: 'Wood, stone, metal — the building blocks for crafting and construction', zh: '木材、石头、金属——制作和建造的基础材料', type: 'crafting' },
    ],
  },
  {
    q_en: 'When you imagine your ideal Palia session, it looks like:',
    q_zh: '想象你理想的 Palia 游戏时光，它看起来像：',
    options: [
      { en: 'Tending my garden, experimenting with crop combinations, watching my plot grow', zh: '打理花园、实验作物组合、看着我的地块生长', type: 'farming' },
      { en: 'Exploring the map, tracking rare animals, and mastering the bow', zh: '探索地图、追踪稀有动物、精通弓箭技术', type: 'hunting' },
      { en: 'Talking with friends, joining community activities, and decorating together', zh: '和朋友聊天、参加社区活动、一起装饰', type: 'social' },
      { en: 'Min-maxing my workshop, figuring out efficient production chains, building the perfect home', zh: '优化我的工坊、研究高效的生产链、建造完美的家', type: 'crafting' },
    ],
  },
  {
    q_en: 'What would make you feel like you are succeeding in Palia?',
    q_zh: '什么会让你感觉自己在 Palia 里取得了进步？',
    options: [
      { en: 'Having the most productive and beautiful garden on my server', zh: '拥有我服务器上最高产且最美丽的花园', type: 'farming' },
      { en: 'Completing the full hunting journal and finding every rare creature', zh: '完成完整的狩猎日志并找到每种稀有生物', type: 'hunting' },
      { en: 'Max friendship with every NPC and being known as the social heart of my community', zh: '与所有 NPC 达到最高友谊，被认为是社区的社交核心', type: 'social' },
      { en: 'Having every crafting station unlocked and being able to build anything in the game', zh: '解锁所有制作站，能够建造游戏中的任何东西', type: 'crafting' },
    ],
  },
]

const RESULTS: Record<
  Focus,
  {
    title_en: string
    title_zh: string
    emoji: string
    tag_en: string
    tag_zh: string
    skill_en: string
    skill_zh: string
    desc_en: string
    desc_zh: string
    tips_en: string[]
    tips_zh: string[]
  }
> = {
  farming: {
    title_en: 'The Garden Keeper',
    title_zh: '花园守护者',
    emoji: '🌱',
    tag_en: 'Farming · Garden Mastery · Crop Experiments',
    tag_zh: '农业 · 花园精通 · 作物实验',
    skill_en: 'Gardening',
    skill_zh: '园艺',
    desc_en:
      "Your Palia path starts in the garden. Gardening in Palia is deep — crops grow with different watering frequencies, fertilizers boost yields, and certain crops planted together produce bonus harvests. You will find yourself experimenting with star-quality seeds, filling your plot with the most efficient combinations, and watching your harvest numbers climb week by week. The Garden is also one of the best gold-earning activities in Palia, which means your gardening focus will fund everything else you want to do in the game.",
    desc_zh:
      '你的 Palia 之路从花园开始。Palia 中的园艺非常有深度——作物以不同的浇水频率生长，肥料可以提高产量，相邻种植的特定作物会产生额外收获。你会发现自己在实验星级种子、用最有效的组合填满你的地块，并看着你的收获数字一周周攀升。花园也是 Palia 中最佳的赚钱活动之一，这意味着你的园艺专注将为你在游戏中想做的一切提供资金。',
    tips_en: [
      'Water your crops every day — star-quality crops require consistent watering for the best yields',
      'Tomatoes and blueberries are beginner-friendly high-value crops — start with these',
      'Use fertilizer on crops you want to sell: gold fertilizer boosts the chance of star-quality harvest',
    ],
    tips_zh: [
      '每天给作物浇水——星级作物需要持续浇水才能获得最佳产量',
      '西红柿和蓝莓是对新手友好的高价值作物——从这些开始',
      '在你想出售的作物上使用肥料：黄金肥料提高星级收获的几率',
    ],
  },
  hunting: {
    title_en: 'The Hunter',
    title_zh: '猎人',
    emoji: '🏹',
    tag_en: 'Hunting · Wildlife · Tracking',
    tag_zh: '狩猎 · 野生动物 · 追踪',
    skill_en: 'Hunting',
    skill_zh: '狩猎',
    desc_en:
      "Your Palia adventure belongs in the wild. Hunting in Palia is a patient, skill-based activity — you track animals by finding signs (footprints, feeding areas), approach carefully without startling them, and use your bow to bring them down cleanly. Different animals require different approaches, and rarer creatures demand mastery. Hunting provides rare materials used in high-level crafting and cooking, and hunting journal entries give ongoing goals to pursue across Palia's beautiful open world. Some of the rarest creatures only appear at specific times or locations.",
    desc_zh:
      '你的 Palia 冒险属于野外。Palia 中的狩猎是一项需要耐心和技巧的活动——你通过寻找痕迹（脚印、觅食区域）追踪动物，小心接近而不惊动它们，然后用弓箭将其干净地击倒。不同的动物需要不同的方法，更稀有的生物需要精通才能捕获。狩猎提供用于高级制作和烹饪的稀有材料，狩猎日志条目在 Palia 美丽的开放世界中为你提供持续追求的目标。一些最稀有的生物只在特定时间或地点出现。',
    tips_en: [
      'Move slowly and crouch when approaching animals — sudden movement triggers fleeing',
      'Aim for headshots to get the highest quality materials from each hunt',
      'Check the hunting board in Kilima Village for daily target requests that pay extra gold',
    ],
    tips_zh: [
      '接近动物时缓慢移动并蹲下——突然的动作会触发逃跑',
      '瞄准头部射击，从每次狩猎中获得最高质量的材料',
      '查看 Kilima 村的狩猎委托板，获取支付额外金币的每日目标请求',
    ],
  },
  social: {
    title_en: 'The Community Heart',
    title_zh: '社区灵魂',
    emoji: '💬',
    tag_en: 'Friendships · Gifts · NPC Stories',
    tag_zh: '友谊 · 礼物 · NPC 故事',
    skill_en: 'Friendship',
    skill_zh: '友谊',
    desc_en:
      "You will find your home in Palia's community. The NPC cast in Palia is one of the most well-written in the cozy genre — each character has a personal story that unfolds across multiple friendship levels, and reaching max friendship unlocks full backstories, gift preferences, and relationship-specific quests. Unlike many MMOs, you can also build genuine friendships with other real players in your server — Palia's community is known for being one of the most welcoming in online gaming. Many players decorate together, share resources, and organize in-game events.",
    desc_zh:
      '你将在 Palia 的社区中找到归属。Palia 的 NPC 阵容是 cozy 游戏类型中写得最好的之一——每个角色都有一个跨多个友谊等级展开的个人故事，达到最高友谊解锁完整的背景故事、礼物偏好和关系专属任务。与许多 MMO 不同，你也可以在你的服务器上与其他真实玩家建立真诚的友谊——Palia 的社区以在线游戏中最受欢迎而闻名。许多玩家一起装饰、分享资源、组织游戏内活动。',
    tips_en: [
      'Give each NPC a weekly gift — weekly gifts give double friendship points vs. daily gifts',
      'Talk to every NPC every day even if you cannot give a gift — daily chat gives friendship points',
      'Join community housing projects — other players often share rare seeds, cooking ingredients, and building materials',
    ],
    tips_zh: [
      '每周给每个 NPC 送一份礼物——每周礼物给予双倍友谊点数，比每日礼物更划算',
      '每天和每个 NPC 交谈，即使你没有礼物——每日聊天也给予友谊点数',
      '加入社区住宅项目——其他玩家经常分享稀有种子、烹饪食材和建筑材料',
    ],
  },
  crafting: {
    title_en: 'The Maker',
    title_zh: '制造者',
    emoji: '🔨',
    tag_en: 'Crafting · Building · Workshop',
    tag_zh: '制作 · 建造 · 工坊',
    skill_en: 'Crafting & Furniture Making',
    skill_zh: '制作与家具制造',
    desc_en:
      "Palia's crafting and housing systems are where you belong. Furniture making in Palia is one of the deepest housing systems in the cozy genre — you gather materials, craft furniture pieces from scratch, and place them to customize your home plot in near-unlimited ways. The crafting system connects to every other skill: you need farming materials for cooking recipes, hunting drops for furniture, and mining ore for tools. As a crafter, you become the player others come to for specialized items — and high-quality handmade furniture is some of the most valuable content in the game.",
    desc_zh:
      'Palia 的制作和住宅系统是你的归属地。Palia 中的家具制作是 cozy 游戏类型中最深度的住宅系统之一——你采集材料、从头制作家具，并以近乎无限的方式放置它们来定制你的家园地块。制作系统与所有其他技能相连：你需要农业材料来制作烹饪配方、狩猎掉落物来制作家具、挖矿矿石来制作工具。作为制作者，你成为其他玩家来寻求特殊物品的人——高质量的手工家具是游戏中最有价值的内容之一。',
    tips_en: [
      'Build a Worktable and Sewing Table early — they unlock the widest range of furniture recipes',
      'Mining and chopping trees gives you the raw materials you need most — upgrade your tools first',
      'Check the in-game Wishing Well requests from NPCs — handmade items often fulfill high-value wishes',
    ],
    tips_zh: [
      '尽早建造工作台和缝纫台——它们解锁最广泛的家具配方范围',
      '挖矿和砍树为你提供最需要的原材料——先升级你的工具',
      '查看游戏内 NPC 的许愿井请求——手工物品经常满足高价值的愿望',
    ],
  },
}

function calcResult(answers: Focus[]): Focus {
  const counts: Record<Focus, number> = { farming: 0, hunting: 0, social: 0, crafting: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Focus
}

export function PaliaStarterQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Focus | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Focus[])]
    const url = `${BASE_URL}/${locale}/quizzes/palia-beginner-guide`
    const shareText = isZh
      ? `我在 Palia 里最适合的路线是「${result.title_zh}」！找到你的 Palia 起点：${url}`
      : `My Palia starter path is ${result.title_en}! Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
          <p className="text-xs text-[#4a5a4a]">
            {isZh ? `核心技能：${result.skill_zh}` : `Core skill: ${result.skill_en}`}
          </p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.desc_zh : result.desc_en}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {isZh ? '新手建议' : 'Beginner tips for your path'}
          </h3>
          <ul className="space-y-2">
            {(isZh ? result.tips_zh : result.tips_en).map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把 Palia 这样的游戏里的慢生活节奏带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the gentle pacing of games like Palia into real daily life.'}
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
          {isZh ? 'Palia 新手测验：你该从哪里开始？' : 'Palia Beginner Quiz: Where Should You Start?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，找出最适合你的 Palia 起点——园艺、狩猎、社交还是制作？含专属新手攻略'
            : '6 questions to find your Palia starter focus — Gardening, Hunting, Friendships, or Crafting. Includes beginner tips for your path.'}
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
        {isZh ? '找到我的 Palia 起点' : 'Find My Palia Starting Path'}
      </button>
    </div>
  )
}
