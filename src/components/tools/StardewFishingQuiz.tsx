'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'legendary' | 'crabpot' | 'completionist' | 'pond'

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
  options: Array<{ en: string; zh: string; type: Pick }>
}> = [
  {
    q_en: 'When you start a new Stardew save, when do you seriously focus on fishing?',
    q_zh: '开始新的星露谷存档时，你什么时候会认真专注于钓鱼？',
    options: [
      { en: 'Immediately — I prioritize fishing skill to level 5 before almost anything else so I can handle the tougher fish', zh: '立刻——我优先把钓鱼技能提升到 5 级，几乎在做任何其他事情之前，这样我就能应对更难的鱼', type: 'legendary' },
      { en: 'Early but balanced — I fish on rainy days and whenever I need quick gold, but I don\'t grind it obsessively', zh: '早期但均衡——我在下雨天和需要快速赚金的时候钓鱼，但不会痴迷地磨练它', type: 'completionist' },
      { en: 'I get crabpots going as soon as I can and then mostly ignore the fishing rod after that', zh: '我尽快放置蟹笼，然后基本上不再管鱼竿', type: 'crabpot' },
      { en: 'I fish specifically to stock my fish ponds — the skill level matters less than catching the right species', zh: '我专门为鱼塘捕捞鱼——技能等级不如捕捉到正确的鱼种重要', type: 'pond' },
    ],
  },
  {
    q_en: 'How do you feel about the Stardew Valley fishing minigame?',
    q_zh: '你怎么看星露谷的钓鱼小游戏？',
    options: [
      { en: 'I love it — I have mastered it and I genuinely enjoy the tension and reaction time it demands, especially for rare fish', zh: '我喜欢它——我已经掌握了它，我真正享受它所要求的紧张感和反应时间，尤其是钓稀有鱼', type: 'legendary' },
      { en: 'It\'s fine — I do it without stress and it\'s satisfying when I catch something I need for a bundle', zh: '还好——我毫无压力地做这件事，当我钓到完成任务所需的东西时很有满足感', type: 'completionist' },
      { en: 'Honestly it feels tedious to me — passive crabpot income is more my speed', zh: '说实话，这对我来说感觉很乏味——被动的蟹笼收入更符合我的节奏', type: 'crabpot' },
      { en: 'I do it, but I view fishing as an input to the pond system rather than the destination', zh: '我会钓鱼，但我把钓鱼视为鱼塘系统的输入，而不是最终目的', type: 'pond' },
    ],
  },
  {
    q_en: 'The text reads: "A mysterious presence is emanating from the water..." — how do you react?',
    q_zh: '屏幕出现提示：「水中涌动着一股神秘的存在……」——你如何反应？',
    options: [
      { en: 'Pure adrenaline — this is exactly what I have been preparing for all season', zh: '纯粹的肾上腺素——这正是我整个季节都在准备的', type: 'legendary' },
      { en: 'Careful focus — I know what to do, I respect the difficulty, and I want to land this cleanly', zh: '谨慎专注——我知道该怎么做，我尊重这种难度，我想要干净利落地钓上来', type: 'completionist' },
      { en: 'Oh — I was actually half-AFK checking my crabpots. Let me try anyway', zh: '哦——我实际上刚才一半注意力都在查看我的蟹笼。不管怎样让我试试', type: 'crabpot' },
      { en: 'Interesting — which legendary is this, and is it a species that can go into a pond?', zh: '有意思——这是哪种传奇鱼，它是可以放入鱼塘的鱼种吗？', type: 'pond' },
    ],
  },
  {
    q_en: 'What do you primarily use fishing gold for?',
    q_zh: '你主要把钓鱼赚来的金币用来做什么？',
    options: [
      { en: 'Upgrading my rod, buying bait and tackle, and investing back into my fishing efficiency', zh: '升级鱼竿、购买鱼饵和渔具，重新投资于钓鱼效率', type: 'legendary' },
      { en: 'General farm progress — crops, buildings, animals — fishing is one income stream among many', zh: '一般农场进展——庄稼、建筑、动物——钓鱼是众多收入来源之一', type: 'completionist' },
      { en: 'It is reliable passive income so I spend it on whatever the farm needs without thinking much about it', zh: '这是可靠的被动收入，所以我把它花在农场需要的任何东西上，不太考虑它', type: 'crabpot' },
      { en: 'I reinvest into more fish ponds so I can scale up caviar and roe production', zh: '我重新投资更多鱼塘，这样我就可以扩大鱼子酱和鱼卵的产量', type: 'pond' },
    ],
  },
  {
    q_en: 'Where do you most often fish in Stardew Valley?',
    q_zh: '你最常在星露谷哪里钓鱼？',
    options: [
      { en: 'Wherever the legendary fish are — mountain lake at night, ocean pier in summer, Secret Woods — I plan around them', zh: '无论传奇鱼在哪——夜晚的山中湖、夏天的海洋码头、秘密树林——我根据它们来规划', type: 'legendary' },
      { en: 'Wherever is most convenient for what I am already doing — I fish opportunistically, not obsessively', zh: '在我已经在做的事情中最方便的地方——我机会性地钓鱼，而不是痴迷地钓鱼', type: 'completionist' },
      { en: 'Honestly I barely open the fishing screen — my crabpots are working while I farm, mine, and do errands', zh: '说实话，我几乎不打开钓鱼界面——我的蟹笼在我种地、挖矿和跑腿时默默工作', type: 'crabpot' },
      { en: 'The lake or ocean, catching the specific species that my ponds still need to be stocked', zh: '湖泊或海洋，捕捉我的鱼塘还需要的特定鱼种', type: 'pond' },
    ],
  },
  {
    q_en: 'What does a perfect Stardew Valley fishing session look like for you?',
    q_zh: '对你来说，完美的星露谷钓鱼时间是什么样的？',
    options: [
      { en: 'Catching the last legendary I need for the collection — Mutant Carp, Crimsonfish, whatever — and seeing it go into the museum', zh: '钓到我收藏所需的最后一条传奇鱼——变异鲤鱼、绯红鱼，不管是什么——然后看着它进入博物馆', type: 'legendary' },
      { en: 'Efficiently catching the last three fish missing from the Community Center bundle before the season ends', zh: '在季节结束前高效钓到社区中心任务单中缺少的最后三条鱼', type: 'completionist' },
      { en: 'Logging in, collecting gold from 30 crabpots across the beach and ocean in under five minutes, and returning to real farming', zh: '登录，在不到五分钟内从海滩和海洋的 30 个蟹笼中收集金币，然后返回真正的农业', type: 'crabpot' },
      { en: 'Watching my eight fish ponds all produce at capacity — the sturgeon generating caviar, the lava eel producing roe — and calculating the season profit', zh: '看着我的八个鱼塘全部满负荷生产——鲟鱼产鱼子酱、熔岩鳗鱼产鱼卵——并计算季度利润', type: 'pond' },
    ],
  },
]

const RESULTS: Record<
  Pick,
  {
    title_en: string
    title_zh: string
    emoji: string
    tag_en: string
    tag_zh: string
    guide_en: string
    guide_zh: string
    tip_en: string
    tip_zh: string
  }
> = {
  legendary: {
    title_en: 'The Legendary Hunter',
    title_zh: '传奇鱼猎手',
    emoji: '🎣',
    tag_en: 'You fish for the thrill — collecting every legendary, mastering the minigame, and reaching the ceiling of what fishing skill can do',
    tag_zh: '你为刺激而钓鱼——收集每一条传奇鱼、掌握小游戏、达到钓鱼技能所能做到的极限',
    guide_en:
      "The five legendary fish are Mutant Carp (Sewers, any season), Legend (mountain lake spring rain, level 10 fishing), Crimsonfish (east ocean pier summer, level 5 fishing), Angler (north of Jodi's house fall bridge, level 3), and Glacierfish (south of Arrowhead Island winter, level 6). For maximum fishing skill efficiency: reach level 4 fishing to unlock the Fiberglass Rod and use bait, then grind to level 6 for the Iridium Rod upgrade path. Wild Bait (Linus's recipe, level 4 foraging) increases the chance of catching two fish at once and is the most valuable bait for legendary hunting. Cork Bobber is the best tackle for general use — it increases the size of your green fishing bar, which is critical for the minigame. The Legend is arguably the hardest fish in the game: it requires level 10, raining, spring, mountain lake, and then tests the limits of the minigame. Stack every advantage: Iridium Rod, Wild Bait, Cork Bobber, Fishing enchantment from the Forge if possible. Dishes that boost fishing: Dish O' The Sea (+3), Chowder (+3 max energy, also slightly +fishing), Trout Soup (+1), and Seafoam Pudding (+4) from cooking. Eat a buff food before every session targeting a legendary.",
    guide_zh:
      '五条传奇鱼是：变异鲤鱼（下水道，任何季节）、传说（山中湖、春天雨天、需要 10 级钓鱼）、绯红鱼（东海洋码头夏天、需要 5 级钓鱼）、钓鱼者（Jo家北部秋天木桥、需要 3 级）和冰川鱼（箭头岛南部冬天、需要 6 级）。最高效提升钓鱼技能：达到 4 级解锁玻璃纤维鱼竿并使用鱼饵，然后磨到 6 级进入铱合金鱼竿升级路径。野生鱼饵（Linus 的配方、4 级采集）增加同时钓两条鱼的概率，是传奇鱼猎手最有价值的鱼饵。软木浮标是通用最佳钓具——它增加绿色钓鱼条的大小，这对小游戏至关重要。传说鱼可以说是游戏中最难的鱼：需要 10 级、下雨、春天、山中湖，然后考验小游戏的极限。叠加每一个优势：铱合金鱼竿、野生鱼饵、软木浮标，如果可能的话还有铸造厂的钓鱼附魔。提升钓鱼的菜肴：深海之盘（+3）、浓汤（+3 最大能量）、鳟鱼汤（+1）和海泡布丁（+4）。在每次针对传奇鱼的游戏前吃一种增益食物。',
    tip_en: "On rainy days, fish at the mountain lake from 6 AM — Legend can spawn here in spring rain, and rain boosts fish bite rate. If you miss a legendary in its season, the Sewers Mutant Carp is always available and good practice for difficult bar control.",
    tip_zh: '下雨天从早上 6 点开始在山中湖钓鱼——传说鱼可以在春雨中出现在这里，而且雨天会提升鱼咬钩率。如果你在某个季节错过了传奇鱼，下水道的变异鲤鱼随时可以钓，是练习困难钓鱼条控制的好方法。',
  },
  completionist: {
    title_en: 'The Bundle Completionist',
    title_zh: '任务单完成者',
    emoji: '📋',
    tag_en: 'You fish with purpose — filling every Community Center bundle systematically before seasonal deadlines, using fishing as one efficient tool in a broader farm plan',
    tag_zh: '你有目的地钓鱼——在季节截止日期前系统性地完成每个社区中心任务单，将钓鱼作为更广泛农场计划中的一个高效工具',
    guide_en:
      "The Community Center fish bundles require specific seasonal fish, so planning ahead prevents missing them. Spring: Catfish (spring/fall rain, river/secret woods), Shad (spring/summer/fall, river), Sardine (spring/fall/winter, ocean), Eel (spring/fall rain, ocean). Summer: Pufferfish (summer, ocean 12 PM-4 PM), Tuna (summer/winter, ocean), Red Snapper (summer/fall, ocean), Tilapia (summer/fall, ocean). Fall: Salmon (fall, river), Walleye (fall rain, all freshwater), Tiger Trout (fall/winter, river level 5+), Albacore (fall/winter, ocean). Winter: Squid (winter, ocean night), Lingcod (winter, all freshwater), Midnight Carp (fall/winter, all freshwater/mountain lake after 8 PM). The Night Fishing Bundle (walleye, bream, eel) requires fishing after 8 PM. Use the wiki or fish finder to know exactly which fish are in season — fishing outside a fish's time window is wasted energy. A Fiberglass Rod + bait is sufficient for all bundle fish; you do not need the Iridium Rod to complete the Bulletin Board or Community Center.",
    guide_zh:
      '社区中心鱼类任务单需要特定的季节性鱼类，所以提前规划可以避免错过。春天：鲶鱼（春天/秋天下雨、河流/秘密树林）、美洲西鲱（春夏秋、河流）、沙丁鱼（春天/秋天/冬天、海洋）、鳗鱼（春天/秋天下雨、海洋）。夏天：河豚（夏天、海洋 12 PM-4 PM）、金枪鱼（夏天/冬天、海洋）、红鲷鱼（夏天/秋天、海洋）、罗非鱼（夏天/秋天、海洋）。秋天：鲑鱼（秋天、河流）、胡瓜鱼（秋天下雨、所有淡水）、虎鳟鱼（秋天/冬天、河流 5 级以上）、长鳍金枪鱼（秋天/冬天、海洋）。冬天：鱿鱼（冬天、海洋夜晚）、香鱼（冬天、所有淡水）、午夜鲤鱼（秋天/冬天、所有淡水/晚上 8 点后的山中湖）。夜间钓鱼任务单（胡瓜鱼、鲷鱼、鳗鱼）需要在晚上 8 点后钓鱼。用维基或鱼类索引了解哪些鱼正当季——在鱼类时间窗口之外钓鱼是浪费精力。玻璃纤维鱼竿 + 鱼饵足以完成所有任务单鱼类；你不需要铱合金鱼竿来完成公告板或社区中心。',
    tip_en: "Make a checklist at the start of each season noting which bundle fish are available that season and what time/weather they require. This prevents the gut-punch of reaching winter and realizing you forgot to catch a summer-only fish.",
    tip_zh: '在每个季节开始时列一张清单，注明当季有哪些任务单鱼类以及它们需要什么时间/天气。这样可以避免到了冬天才意识到忘记钓了夏天独有的鱼那种心痛的感觉。',
  },
  crabpot: {
    title_en: 'The Passive Crabpotter',
    title_zh: '被动蟹笼玩家',
    emoji: '🦀',
    tag_en: 'You fish without fishing — a network of crabpots generating daily passive income while you focus on everything else the farm needs',
    tag_zh: '你不钓鱼地钓鱼——一个蟹笼网络每天产生被动收入，而你专注于农场需要的其他一切',
    guide_en:
      "Crabpots become available after reaching fishing level 3 (sold by Willy or crafted after level 3). You place them in water — river, ocean, lake, or mountain lake — and they passively catch crustaceans and trash overnight without any minigame. The critical upgrade is the Mariner profession at fishing level 10: instead of catching trash, your crabpots only catch quality items. If you choose Fisher at level 5, you will need to go Fisher → Mariner at level 10. With Mariner, every crabpot pull is a sellable item. Efficient crabpot setup: 30+ crabpots placed in the ocean near the beach at the south end of town gives maximum variety. Each crabpot requires bait to function — Trash Can Hat (wearing) or Auto-Grabber for crabpots (modded) makes collection even faster in vanilla. Keep a stack of bait always in inventory; you can make bait from any fish × 1 = 5 bait. The best income from crabpots is Lobster (120g), Crab (100g), Clam (50g), Mussel (30g) — Mariner means no more Soggy Newspaper or Broken CD days. A full 30-crabpot ocean grid with Mariner generates roughly 1,500-3,000g daily for 5 minutes of collection time.",
    guide_zh:
      '蟹笼在达到钓鱼 3 级后可用（Willy 处购买或 3 级后解锁制作）。你把它们放在水中——河流、海洋、湖泊或山中湖——它们在一夜之间被动地捕捉甲壳类动物和垃圾，无需任何小游戏。关键升级是钓鱼 10 级的水手职业：你的蟹笼不再捕垃圾，只捕高质量物品。如果你在 5 级选择了渔夫，你需要在 10 级走渔夫→水手路线。有了水手，每次蟹笼收获都是可出售的物品。高效蟹笼设置：在镇南端海滩附近的海洋中放置 30+ 个蟹笼可以获得最大多样性。每个蟹笼需要鱼饵才能运作——可以用任何鱼 × 1 = 5 鱼饵来制作鱼饵。始终在背包中保持一叠鱼饵；垃圾桶帽（佩戴）可以让收集更快。水手蟹笼的最佳收入是龙虾（120g）、螃蟹（100g）、蛤蜊（50g）、贻贝（30g）——水手意味着不再有浸湿报纸或破损 CD 的日子。拥有 30 个蟹笼的完整海洋网格加上水手职业，每天 5 分钟收集时间大约产生 1,500-3,000g。',
    tip_en: "Place crabpots in the ocean near Willy's shop at the south beach — walk along the pier each morning to collect all of them in one straight line, then restock bait in one batch. Position matters: ocean and mountain lake give different species than the river.",
    tip_zh: '在 Willy 店铺旁边的南部海滩海洋中放置蟹笼——每天早上沿着码头走，一条直线收集所有蟹笼，然后批量补充鱼饵。位置很重要：海洋和山中湖给出的鱼种与河流不同。',
  },
  pond: {
    title_en: 'The Fish Pond Expert',
    title_zh: '鱼塘专家',
    emoji: '🏊',
    tag_en: 'You fish to build infrastructure — stocking ponds with high-value species that generate daily roe, caviar, and special items without ever touching the rod again',
    tag_zh: '你钓鱼是为了建设基础设施——用高价值鱼种放养鱼塘，每天生产鱼卵、鱼子酱和特殊物品，而不再需要接触鱼竿',
    guide_en:
      "Fish ponds (1,000g + 200 stone + 5 seaweed + 5 green algae, built by Robin) each hold a single fish species that produces items daily. The most profitable species: Sturgeon (mountain lake, summer/winter) → Roe → Aged Roe = Caviar (500g per jar from Preserves Jar, 40-day aging) — the highest single-item yield in the game from a pond. Lava Eel (floors 100 of the Mines) → Roe → Aged Roe (worth significantly more than raw roe). Blobfish (deep fishing at 9+ Mariner luck) → Roe → profitable but harder to stock initially. Super Cucumber (ocean, summer/fall night) → Roe → consistently profitable. For maximum pond income: 5+ Sturgeon ponds producing caviar, with Artisan profession (+40% to all artisan goods including aged roe) for massive multipliers. Pond population grows when fish ask for specific items — fulfill their requests to increase capacity from 1 to 3 to 5 to 10. Each pond of 10 Sturgeons generates 10 roe per day which becomes 10 caviar (5,000g) per 40-day aging cycle. A mature Sturgeon pond grid is one of the highest passive income sources in the endgame.",
    guide_zh:
      '鱼塘（1,000g + 200 石头 + 5 海藻 + 5 绿藻，由 Robin 建造）每个容纳一个鱼种，每天产生物品。最有利可图的鱼种：鲟鱼（山中湖、夏天/冬天）→ 鱼卵 → 陈年鱼卵 = 鱼子酱（保鲜罐每罐 500g，40 天熟成）——游戏中鱼塘单品最高产出。熔岩鳗鱼（矿山 100 层）→ 鱼卵 → 陈年鱼卵（价值远高于生鱼卵）。水滴鱼（幸运值 9+ 时深海钓鱼）→ 鱼卵 → 利润丰厚但最初放养较难。超级黄瓜（海洋、夏天/秋天夜晚）→ 鱼卵 → 持续盈利。最大化鱼塘收入：5+ 个产鱼子酱的鲟鱼塘，配合工匠职业（所有工匠商品+40%，包括陈年鱼卵）获得巨大乘数。当鱼要求特定物品时，鱼塘种群增长——满足它们的需求以将容量从 1 增加到 3 到 5 到 10。每个装满 10 条鲟鱼的鱼塘每天产生 10 个鱼卵，在 40 天的熟成周期中变成 10 个鱼子酱（5,000g）。成熟的鲟鱼塘网格是游戏后期最高的被动收入来源之一。',
    tip_en: "Stock Sturgeon first — they are catchable in summer AND winter from the mountain lake, making them the most accessible high-value pond species. Build your first Preserves Jar as soon as you get caviar; aged caviar (500g each) is worth significantly more than fresh caviar (200g).",
    tip_zh: '首先放养鲟鱼——它们在夏天和冬天都可以在山中湖钓到，使它们成为最容易获得的高价值鱼塘鱼种。一旦获得鱼子酱就立刻建造你的第一个保鲜罐；陈年鱼子酱（每个 500g）比新鲜鱼子酱（200g）价值高得多。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { legendary: 0, crabpot: 0, completionist: 0, pond: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function StardewFishingQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/stardew-fishing-quiz`
    const shareText = isZh
      ? `我的星露谷钓鱼风格：「${result.title_zh}」！${result.tag_zh}。测测你的：${url}`
      : `My Stardew fishing style is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
        </div>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">
            {isZh ? '专属攻略指南' : 'Your Fishing Strategy Guide'}
          </p>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh ? result.guide_zh : result.guide_en}
          </p>
        </div>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {isZh ? '老手小贴士：' : 'Pro tip: '}
            </span>
            {isZh ? result.tip_zh : result.tip_en}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把游戏里的生活节奏带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the rhythm of game life into real daily life.'}
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
          {isZh
            ? '你的星露谷钓鱼风格是哪种？'
            : 'What Is Your Stardew Valley Fishing Style?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，测出你是传奇鱼猎手、蟹笼被动派、任务单完成者，还是鱼塘专家——并获取专属攻略指南'
            : '6 questions to find your fishing playstyle — Legendary Hunter, Passive Crabpotter, Bundle Completionist, or Fish Pond Expert — with a full strategy guide'}
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
        {isZh ? '测出我的钓鱼风格' : 'Find My Fishing Style'}
      </button>
    </div>
  )
}
