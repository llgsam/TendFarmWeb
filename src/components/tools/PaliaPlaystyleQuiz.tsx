'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Style = 'farmer' | 'angler' | 'explorer' | 'artisan'

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
  options: Array<{ en: string; zh: string; type: Style }>
}> = [
  {
    q_en: 'You log into Palia and your first instinct is to:',
    q_zh: '登录 Palia 之后，你的第一反应是？',
    options: [
      { en: "Water your crops and check what's ready to harvest", zh: '给作物浇水，看看有哪些可以收割了', type: 'farmer' },
      { en: 'Head to your favorite fishing spot before it gets crowded', zh: '赶在其他人来之前去你最喜欢的钓鱼点', type: 'angler' },
      { en: 'Explore a part of Bahari Bay you haven\'t fully mapped yet', zh: '去 Bahari 湾还没完全探索过的地方看看', type: 'explorer' },
      { en: 'Check your crafting queue and plan what to cook or build today', zh: '检查制作队列，规划今天要做什么料理或家具', type: 'artisan' },
    ],
  },
  {
    q_en: 'Your ideal Palia session lasts about 2 hours. You spent most of it:',
    q_zh: '你理想的 Palia 游戏是大约 2 小时。你大部分时间在做什么？',
    options: [
      { en: 'Perfecting your garden layout and trying new seed varieties', zh: '完善花园布局，尝试新的种子品种', type: 'farmer' },
      { en: 'At the water — fishing, catching bugs, watching the day pass', zh: '在水边——钓鱼、捕虫、看着时光流逝', type: 'angler' },
      { en: 'Mining ore in the caves or tracking animals across the map', zh: '在洞穴里挖矿或在地图上追踪动物', type: 'explorer' },
      { en: 'Decorating your plot with furniture you crafted yourself', zh: '用自己制作的家具装饰你的地块', type: 'artisan' },
    ],
  },
  {
    q_en: "When you meet a new Palian NPC, you're most interested in:",
    q_zh: '遇到新的 Palian NPC 时，你最关心的是？',
    options: [
      { en: 'Whether they sell seeds or farming supplies you don\'t have yet', zh: '他们是否卖你还没有的种子或农业物资', type: 'farmer' },
      { en: 'What hints they drop about good fishing or bug-catching spots', zh: '他们提到的好钓鱼点或捕虫地点', type: 'angler' },
      { en: 'The lore they share about the world and where to find rare resources', zh: '他们分享的世界观知识以及稀有资源的位置', type: 'explorer' },
      { en: 'Their questline — it usually unlocks a new recipe or furniture set', zh: '他们的任务线——通常能解锁新食谱或家具系列', type: 'artisan' },
    ],
  },
  {
    q_en: 'Which resource discovery makes you most excited?',
    q_zh: '发现哪种资源会让你最兴奋？',
    options: [
      { en: 'A seed packet you\'ve never planted before', zh: '一包从没种过的新种子', type: 'farmer' },
      { en: 'A fishing spot glowing with rare catches', zh: '一处闪着稀有鱼光的钓鱼点', type: 'angler' },
      { en: 'A cave entrance you somehow missed for 20 hours', zh: '一个不知怎么遗漏了 20 小时的洞穴入口', type: 'explorer' },
      { en: 'Enough materials to finally build that furniture set you\'ve been planning', zh: '终于够做那套规划已久的家具系列的材料', type: 'artisan' },
    ],
  },
  {
    q_en: 'Your Palia plot (home base) looks like:',
    q_zh: '你的 Palia 地块（家园基地）看起来是什么样？',
    options: [
      { en: 'Rows of crops with efficient irrigation — maybe a decorative flower border', zh: '整齐的作物行和高效灌溉——也许有一圈装饰性的花卉边界', type: 'farmer' },
      { en: 'A dock or water feature because you needed it near the aesthetic', zh: '有码头或水景，因为那是你觉得最有美感的地方', type: 'angler' },
      { en: 'Honest chaos — resources everywhere, half-built projects, map pins', zh: '真实的混乱——到处是资源、一半完工的项目和地图标记', type: 'explorer' },
      { en: 'A meticulously designed living space — every piece intentional', zh: '精心设计的生活空间——每件物品都有其位置', type: 'artisan' },
    ],
  },
  {
    q_en: 'What keeps you coming back to Palia day after day?',
    q_zh: '是什么让你每天都想回来玩 Palia？',
    options: [
      { en: 'Watching your crops grow — there\'s something deeply satisfying about the cycle', zh: '看着作物成长——这种循环有一种很深层的满足感', type: 'farmer' },
      { en: 'The zen of a good fishing session — quiet, patient, rewarding', zh: '好好钓一场鱼的禅意——安静、耐心、有回报', type: 'angler' },
      { en: 'There\'s always another area you haven\'t fully discovered yet', zh: '总是有还没完全探索过的新区域在等着你', type: 'explorer' },
      { en: 'The satisfaction of crafting something beautiful from raw materials', zh: '把原材料变成美丽物品的那种成就感', type: 'artisan' },
    ],
  },
]

const RESULTS: Record<
  Style,
  {
    name_en: string
    name_zh: string
    emoji: string
    label_en: string
    label_zh: string
    desc_en: string
    desc_zh: string
    skills_en: string[]
    skills_zh: string[]
    tip_en: string
    tip_zh: string
  }
> = {
  farmer: {
    name_en: 'The Cultivator',
    name_zh: '培育者',
    emoji: '🌻',
    label_en: 'Farming · Gardening',
    label_zh: '耕种 · 园艺',
    desc_en:
      "You find Palia's rhythm in the earth. Watching seeds turn into crops, experimenting with rare seed varieties, and tending a beautiful garden are your core satisfactions. You're likely the player who has the most organized plot on the server — and your harvest parties are legendary.",
    desc_zh:
      '你在 Palia 的节奏中找到了土地的力量。看着种子变成作物、尝试稀有种子品种、打理美丽的花园是你最核心的满足感来源。你很可能是服务器上地块最整洁的玩家——你的丰收派对也是传奇级别的。',
    skills_en: ['Farming', 'Gardening'],
    skills_zh: ['耕种技能', '园艺技能'],
    tip_en:
      "Focus Farming skill early — higher levels unlock fertilizer and improved seed quality that multiply income. Badruu's Farm has weekly rare seeds worth saving gold for.",
    tip_zh:
      '优先提升耕种技能——更高等级能解锁化肥和改良种子品质，大幅提升收入。Badruu 农场每周有值得存钱购买的稀有种子。',
  },
  angler: {
    name_en: 'The Patient Watcher',
    name_zh: '静待者',
    emoji: '🎣',
    label_en: 'Fishing · Bug Catching',
    label_zh: '钓鱼 · 捕虫',
    desc_en:
      "You understand that the best moments in Palia happen when you slow down. Fishing at dawn, spotting a rare butterfly, waiting for the perfect catch — these aren't just activities, they're meditations. You probably know every fishing spot's peak hours and which bugs only appear at specific times.",
    desc_zh:
      '你明白 Palia 中最美好的时刻是在你慢下来的时候发生的。黎明时钓鱼、发现稀有蝴蝶、等待完美的渔获——这些不只是活动，而是冥想。你可能已经知道每个钓鱼点的黄金时段，以及哪些昆虫只在特定时间出现。',
    skills_en: ['Fishing', 'Bug Catching'],
    skills_zh: ['钓鱼技能', '捕虫技能'],
    tip_en:
      "Upgrade your fishing rod as soon as possible — each tier unlocks new fish and significantly improves rare catch rates. Check the Weekly Wants board for fishing items that sell for bonus Renown.",
    tip_zh:
      '尽快升级钓鱼竿——每个等级都能解锁新鱼类并显著提升稀有渔获率。查看每周心愿板，钓鱼类物品往往能换取高额荣誉点。',
  },
  explorer: {
    name_en: 'The Adventurer',
    name_zh: '探险家',
    emoji: '⛏️',
    label_en: 'Mining · Foraging · Hunting',
    label_zh: '挖矿 · 采集 · 狩猎',
    desc_en:
      "Palia's world is your playground — literally. You've probably fallen off cliffs trying to reach ore deposits, spent an hour tracking a rare animal across the map, and stumbled onto areas that most players miss for their first 30 hours. You are the one who quietly shares the discovery in community chat.",
    desc_zh:
      'Palia 的世界就是你的游乐场——字面意义上的。你可能为了够到矿石而从悬崖上摔下来，花了一个小时在地图上追踪稀有动物，并且误打误撞进入了大多数玩家前 30 小时都不会发现的区域。你是那个在社群聊天里悄悄分享发现的人。',
    skills_en: ['Mining', 'Foraging', 'Hunting'],
    skills_zh: ['挖矿技能', '采集技能', '狩猎技能'],
    tip_en:
      "Bahari Bay's caves reset daily — learn the ore node spawn locations to maximize your mining efficiency. The hunting skill unlocks Flow of the Forest bonuses that make foraging much more rewarding at higher levels.",
    tip_zh:
      'Bahari 湾的洞穴每天刷新——了解矿石节点的刷新位置能大幅提升挖矿效率。狩猎技能在高等级会解锁「森林之流」加成，让采集变得更有回报。',
  },
  artisan: {
    name_en: 'The Maker',
    name_zh: '工匠',
    emoji: '🏠',
    label_en: 'Cooking · Furniture Making',
    label_zh: '烹饪 · 家具制作',
    desc_en:
      "In Palia, you are the one who makes things beautiful — and delicious. Your plot is the one people screenshot when they visit. You know which recipes sell for the most Renown, which furniture sets pair together, and you have very strong opinions about floor tiles. Your crafting queue is never empty.",
    desc_zh:
      '在 Palia，你是让一切变得美丽和美味的人。当别人来访时，你的地块是被截图次数最多的。你知道哪些食谱能卖最高荣誉点，哪些家具系列搭配最好看，对地板材质有非常强烈的意见。你的制作队列从来都是满的。',
    skills_en: ['Cooking', 'Furniture Making'],
    skills_zh: ['烹饪技能', '家具制作技能'],
    tip_en:
      "Cooking skill unlocks Weekly Wants buffs — some dishes provide group bonuses that make your entire party more efficient. Prioritize leveling Furniture Making to unlock rare cosmetic recipes from Hodari and Tish.",
    tip_zh:
      '烹饪技能解锁每周心愿的增益效果——某些食物提供的团体加成能让整个队伍效率更高。优先提升家具制作技能，解锁来自 Hodari 和 Tish 的稀有装饰性图纸。',
  },
}

function calcResult(answers: Style[]): Style {
  const counts: Record<Style, number> = { farmer: 0, angler: 0, explorer: 0, artisan: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Style
}

export function PaliaPlaystyleQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Style | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Style[])]
    const url = `${BASE_URL}/${locale}/quizzes/palia-playstyle`
    const shareText = isZh
      ? `我在 Palia 的游戏风格是「${result.name_zh}」！快来测测你是哪种 Palia 玩家：${url}`
      : `My Palia playstyle is "${result.name_en}"! Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {isZh ? result.label_zh : result.label_en}
          </p>
          <h2 className="mb-3 text-2xl font-bold text-[#f0a832]">
            {isZh ? result.name_zh : result.name_en}
          </h2>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh ? result.desc_zh : result.desc_en}
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {isZh ? '优先提升的技能' : 'Skills to prioritize'}
          </h3>
          <div className="mb-3 flex flex-wrap gap-2">
            {(isZh ? result.skills_zh : result.skills_en).map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#2d5a27] bg-[#2d5a27]/30 px-3 py-1 text-xs text-[#8a9a7a]"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh ? result.tip_zh : result.tip_en}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把 Palia 式的慢生活节奏带入你的现实生活。'
              : 'TendFarm is building a farm rhythm tracker — bringing Palia-style slow-living into real life.'}
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
          {isZh ? '你在 Palia 的游戏风格是什么？' : "What's Your Palia Playstyle?"}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，找到你最自然的 Palia 玩法'
            : '6 questions to find your natural Palia playstyle'}
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
        {isZh ? '查看结果' : 'See My Playstyle'}
      </button>
    </div>
  )
}
