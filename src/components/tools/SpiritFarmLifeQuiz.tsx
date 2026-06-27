'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'spirittea' | 'immortal' | 'moonglow' | 'everdream'

function ShareButton({ text, isZh }: { text: string; isZh: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <button
        onClick={handleCopy}
        className="rounded-lg bg-[#2d3d2d] px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:bg-[#3d4d3d]"
      >
        {copied ? (isZh ? '已复制！' : 'Copied!') : (isZh ? '复制结果' : 'Copy Result')}
      </button>
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-[#1a8cd8] px-4 py-2 text-sm text-white transition-colors hover:bg-[#1a7bc0]"
      >
        {isZh ? '分享到 X' : 'Share on X'}
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
    q_en: 'Which cultural aesthetic speaks to your soul?',
    q_zh: '哪种文化审美最让你心动？',
    options: [
      { en: 'Japanese Shinto folk culture — hot springs, forest spirits, and small-town warmth', zh: '日式神道民俗——温泉、山野妖怪和小镇的人情温度', type: 'spirittea' },
      { en: 'Chinese xianxia cultivation — sect life, spiritual energy, and ascending through realms', zh: '中国仙侠修炼——门派生活、灵气修炼和突破境界的升华感', type: 'immortal' },
      { en: 'Coastal North American fishing town — wooden docks, ocean mist, and quiet community life', zh: '北美海岸渔镇——木栈码头、海面薄雾和安静的小镇社区生活', type: 'moonglow' },
      { en: 'European pastoral dreamscape — sun-warmed farmland, fairy-tale forests, and whimsical animals', zh: '欧式田园梦境——温暖农场、童话森林和古灵精怪的动物伙伴', type: 'everdream' },
    ],
  },
  {
    q_en: 'Which core fantasy sounds most appealing?',
    q_zh: '哪种核心幻想最吸引你？',
    options: [
      { en: 'Running a hot spring bathhouse that serves invisible spirits, learning their unique stories one by one', zh: '经营一家专为妖怪精灵服务的温泉浴室，一个个了解它们藏在热气后的故事', type: 'spirittea' },
      { en: 'Cultivating spiritual power and managing a sect farm that grows magical ingredients for your ascension', zh: '修炼灵力、管理门派农场，种出助你突破修炼瓶颈的灵材', type: 'immortal' },
      { en: 'Fishing in a quiet coastal town where every catch helps you heal from grief and reconnect with life', zh: '在宁静海湾垂钓，每一次收竿都帮你从失去中慢慢走出来，重新连结生活', type: 'moonglow' },
      { en: 'Befriending animals on a summer farm and entering their dream worlds to heal their hidden fears', zh: '在暑假农场结交各种动物，再潜入它们的梦境，帮它们疗愈深藏的恐惧', type: 'everdream' },
    ],
  },
  {
    q_en: 'What kind of social bonds do you want to build in the game?',
    q_zh: '你希望在游戏里建立什么样的社交关系？',
    options: [
      { en: 'Quirky supernatural beings with unique personalities and requests that reveal their hidden pain', zh: '千奇百怪的妖灵，每个都有独特个性和愿望，揭开它们背后令人心酸的故事', type: 'spirittea' },
      { en: 'Disciples and sect members whose growth you guide, building a legacy through training and care', zh: '招募弟子、培养门派成员，用指导和关怀建立传承', type: 'immortal' },
      { en: 'Townsfolk with real emotional weight — people dealing with loss, hope, and quiet daily struggles', zh: '有真实情感重量的镇民——和你一样在失去、希望和日常挣扎中前行的普通人', type: 'moonglow' },
      { en: 'Animals whose trust you earn through patience — a silent emotional bond deeper than words', zh: '用耐心慢慢赢得信任的动物们——比语言更深的无声情感纽带', type: 'everdream' },
    ],
  },
  {
    q_en: 'How much progression and power growth do you want?',
    q_zh: '你希望游戏有多少进度感和力量成长？',
    options: [
      { en: 'Modest — unlocking new spirit-seeing abilities and bathhouse upgrades is satisfying enough', zh: '适中——解锁新的感灵能力和温泉升级就已经足够满足', type: 'spirittea' },
      { en: 'Significant — watching my cultivation realm rise and my skills deepen is the whole point', zh: '这很重要——看着修炼境界一步步提升、功法越来越深厚才是游戏的核心乐趣', type: 'immortal' },
      { en: 'Minimal — I want slow days of fishing and cooking with no pressure to grow stronger', zh: '越少越好——我要的是悠闲垂钓和烹饪的慢日子，不需要任何变强的压力', type: 'moonglow' },
      { en: 'Gentle — discovering new animals and unlocking their dream sequences is my version of progress', zh: '温和地推进——发现新动物、解锁新梦境就是我理解的进度感', type: 'everdream' },
    ],
  },
  {
    q_en: 'Which art style and music would make you feel most at home?',
    q_zh: '哪种美术和音乐风格最让你有归属感？',
    options: [
      { en: 'Pixel art sprites with warm lantern colors, and a lo-fi Japanese folk soundtrack', zh: '像素风格、温暖灯笼色调，配上低保真的日本民谣风配乐', type: 'spirittea' },
      { en: 'Ink-wash illustrations with a Chinese classical music undercurrent', zh: '带水墨质感的画风，中国古典音乐的底色悄悄流淌', type: 'immortal' },
      { en: 'Voxel coastal scenery bathed in sea light, with a gentle acoustic soundtrack about longing', zh: '体素风格的海岸景色、浸在海光里，搭配关于思念的轻柔木吉他配乐', type: 'moonglow' },
      { en: 'Bright, saturated European farm art with a dreamy, playful music box score', zh: '明亮饱满的欧式农场画风，配上如梦如幻的音乐盒旋律', type: 'everdream' },
    ],
  },
  {
    q_en: 'Which emotional tone are you most drawn to right now?',
    q_zh: '你现在最向往哪种情感调性？',
    options: [
      { en: 'Warm and surprising — a world full of gentle weirdness, where every spirit has an unexpected heart', zh: '温暖而充满惊喜——一个温柔奇异的世界，每个妖灵都藏着出乎意料的赤诚之心', type: 'spirittea' },
      { en: 'Satisfying and layered — the pleasure of strategic depth wrapped in a cozy cultivation fantasy', zh: '有满足感、有层次——策略深度包裹在治愈修仙幻想里的那种踏实快感', type: 'immortal' },
      { en: 'Quietly melancholic but hopeful — a game that understands loss and still believes in moving forward', zh: '安静而忧郁，但充满希望——一款理解失去、依然相信向前走的游戏', type: 'moonglow' },
      { en: 'Gentle and dreamlike — like a favorite picture book come to life that you never want to end', zh: '温柔而梦幻——像一本最爱的绘本活了过来，你舍不得翻到最后一页', type: 'everdream' },
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
    platform_en: string
    platform_zh: string
    why_en: string
    why_zh: string
    tip_en: string
    tip_zh: string
  }
> = {
  spirittea: {
    title_en: 'Spirittea',
    title_zh: 'Spirittea',
    emoji: '♨️',
    tag_en: 'The Spirit Innkeeper',
    tag_zh: '灵泉浴馆主人',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `Spirittea is a farming-adjacent life sim that draws directly from the same well as Spirited Away and Natsume's Book of Friends: a young person arrives in a small, fading hot spring town and discovers they can see the spirits that invisibly share the space with humans. The core premise — you must restore an old bathhouse and serve the local spirit community — is as cozy as it sounds, but the execution is richer than most players expect. Each spirit who visits your bathhouse has a distinct personality, a specific temperature preference, and an underlying problem in their relationship with the human world that you uncover through repeated interactions. The human side of the game is equally developed: the town has a cast of residents with their own schedules, problems, and secrets, and befriending them reveals why the town is declining and what the spirits need. The farming element in Spirittea is present but supplementary — you grow herbs and vegetables primarily to cook food that attracts specific spirit types and earns their trust. The real loop is bathhouse management: heating the water to the right temperature, keeping everything clean, choosing which spirits to accept each day, and gradually unlocking new areas of the spirit world. Spirittea is a remarkably original game that does not fit neatly into any existing category, which is precisely what makes it stand out. For players who have always wanted a Spirited Away game that takes the premise seriously and populates it with genuinely touching characters, this is as close as it gets.`,
    why_zh: `《Spirittea》是一款直接从《千与千寻》和《夏目友人帐》中汲取灵感的生活模拟游戏。你来到一个日渐衰落的温泉小镇，发现自己能看见与人类共享空间的妖灵。游戏的核心——修缮破旧浴馆、为妖灵社区提供服务——听起来简单，执行却远比想象的丰富。每个来访的妖灵都有独特性格、特定的水温偏好，以及你需要通过反复交流才能揭开的隐藏心结。人类居民同样有完整的日程和秘密，了解他们才能明白小镇衰落的真正原因。浴馆管理——调节水温、保持清洁、选择每天接待哪些妖灵——才是游戏的核心循环。农耕元素主要用于烹饪吸引特定妖灵的食物，是辅助性的但不可或缺。`,
    tip_en: `Pay close attention to each spirit's temperature preference from the very first visit — if you consistently get it wrong, they will stop coming back, and some are needed for story progression. The Tea mechanic (drinking the Spirittea itself) is how you switch between the spirit and human world view, so use it strategically when navigating town to spot spirits you might otherwise miss. Prioritize befriending the human townspeople early: their relationship levels gate story revelations about the spirits that dramatically change how you interact with certain characters. Finally, the farm plot behind the bathhouse is small — grow the herbs and vegetables that are hardest to buy from the market, not everything. You will always be able to buy basic produce.`,
    tip_zh: `从第一次来访开始就记住每个妖灵的水温偏好——长期调错温度会让它们不再光顾，而有些妖灵对剧情推进至关重要。Spirittea（灵茶）是切换妖灵视角和人类视角的机制，在镇上行走时策略性地使用，才能发现隐藏的妖灵。优先提升与人类镇民的好感度：他们的关系等级解锁关于妖灵的关键剧情，会彻底改变你与某些角色的互动方式。浴馆后面的农地很小——优先种市场上买不到或很贵的草药，普通蔬菜直接购买即可。`,
  },
  immortal: {
    title_en: 'Immortal Life',
    title_zh: '仙武门',
    emoji: '🌸',
    tag_en: 'The Cultivation Farmer',
    tag_zh: '修仙农耕者',
    platform_en: 'PC',
    platform_zh: 'PC',
    why_en: `Immortal Life (known in Chinese as Xian Wu Men, 仙武门) is the answer to a question that readers of xianxia cultivation novels have long asked of farming games: what if you were a martial cultivator who ran a spiritual farm? The game blends the well-loved mechanics of the farming sim genre — planting, harvesting, processing, selling — with the progression fantasy of Chinese cultivation fiction, where you advance through spiritual realms, unlock new powers, recruit disciples, and manage a sect. The farming is meaningfully tied to the cultivation: the spiritual herbs and crops you grow are ingredients for elixirs and tools that directly power your cultivation breakthrough attempts. This creates a more purposeful farming loop than most farming sims offer — every crop decision has a downstream effect on your martial progress. The game has a distinctly Chinese visual and musical identity that stands out sharply in a genre dominated by European pastoral or Japanese aesthetics. Sect management adds a light strategy layer as you recruit and assign disciples to tasks that would take too long to handle alone. Combat is present but intentionally light — the game is not an action RPG despite its cultivation setting, and most players will spend the majority of their time on the farm and in dialogue. Immortal Life is ideal for players who want a cozy farming sim with meaningful character progression, a non-Western cultural identity, and the specific satisfaction of the xianxia power-growth fantasy rendered in a peaceful, daily-rhythm format.`,
    why_zh: `《仙武门》（Immortal Life）是仙侠修炼小说读者长期以来对农场游戏的一个夙愿：如果你是一个同时经营灵田的武修者该多好？游戏将农场模拟类型的熟悉机制（种植、收获、加工、售卖）与仙侠小说的进阶幻想融合——突破修炼境界、解锁新功法、招募弟子、管理门派。农耕与修炼真正绑定：你种植的灵草和作物是炼制丹药、助力突破的关键原料，每一个种植决策都对修炼进程产生下游影响。游戏有鲜明的中国视觉和音乐风格，在以欧式田园或日式美学为主流的类型中格外突出。门派管理增加了轻度策略层：招募弟子并分配任务，独自处理太耗时的工作。`,
    tip_en: `The most common mistake in Immortal Life is treating it like a pure farming sim and neglecting the cultivation progression. Your breakthrough attempts have a success rate influenced by how many spiritual elixirs you have stockpiled — run out before a major breakthrough and you will stall for many in-game seasons. Always plant at least one plot of your current highest-tier spirit herbs; they take longer to grow but have dramatically higher elixir value per tile. Recruit disciples as soon as the option becomes available — even low-ranked disciples significantly multiply your daily output by handling repetitive harvesting and processing tasks. The market prices fluctuate seasonally, so check which crops fetch premiums before planting each season.`,
    tip_zh: `《仙武门》最常见的错误是把它当纯农场模拟来玩，忽视修炼进度。突破尝试的成功率受你储备的灵丹数量影响——大突破前耗尽存粮，会在一个关卡停滞很多个游戏季节。始终保留至少一块种植当前最高级灵草的田地；虽然生长周期更长，但每格地的炼丹价值高出数倍。门派招募选项一开放就立刻招募弟子——即使低阶弟子也能通过处理重复收割和加工大幅提升每日产出。市场价格随季节波动，种植前查看哪种作物本季溢价最高。`,
  },
  moonglow: {
    title_en: 'Moonglow Bay',
    title_zh: 'Moonglow Bay',
    emoji: '🎣',
    tag_en: 'The Coastal Fisherman',
    tag_zh: '海湾渔者',
    platform_en: 'PC · Xbox',
    platform_zh: 'PC · Xbox',
    why_en: `Moonglow Bay is the fishing life sim that dares to take its emotional premise seriously. You and your partner had a dream of moving to a small coastal town and starting a fishing business together — but when tragedy strikes, you are left alone to honor that dream. The game begins in grief and unfolds as a story about how work, routine, community, and beauty can carry you through loss. The fishing mechanic is the deepest in its sub-genre: each species of fish requires different bait, rod types, timing, and ocean zones to catch, and learning the ocean's patterns is genuinely satisfying. Every fish you catch can be cooked into a range of dishes using a minigame cooking system, and these dishes are what you sell or gift to townsfolk. The town of Moonglow Bay has a small cast of residents who each carry their own quiet stories of what they lost and what keeps them going — the writing is warmer and more emotionally honest than most farming games manage. The game has a distinctive chunky voxel art style with coastal lighting that makes every sunrise on the water feel like a painting you want to live in. There is no combat, no crop stress, no energy that runs out — just the rhythm of waking up, heading to sea, catching something beautiful, cooking it, and sharing it with people who need it. Moonglow Bay is for players who want a farming-adjacent game with real emotional stakes, where the ocean is the farm and healing is the harvest.`,
    why_zh: `《Moonglow Bay》是一款敢于认真对待其情感前提的钓鱼生活模拟游戏。你和伴侣曾梦想搬到一个小渔镇共同开始钓鱼事业，但悲剧发生后，你只能独自承载这个梦想。游戏从悲伤开始，讲述工作、日常、社区和美好如何帮助一个人走过失去。钓鱼机制在同类游戏中最为深度：每种鱼类需要不同的鱼饵、鱼竿类型、时机和海域才能捕获。每条鱼都可以通过小游戏料理系统烹饪成一系列菜肴，再出售或赠予镇民。小镇居民各自背负着安静的失去与继续前行的故事，文字比大多数农场游戏更温暖也更情感诚实。没有战斗、没有作物压力、没有耗尽的体力——只有起床、出海、钓到美丽的东西、烹饪、分享的节奏。`,
    tip_en: `Moonglow Bay's fishing depth rewards patience and observation. Before spending money on new gear, explore the ocean zones first — you will discover that different zones have dramatically different fish populations, and targeting a specific zone is more efficient than randomly fishing from the dock. The cooking minigame has a precision component that rewards practice: mastering it unlocks higher-quality dish variants that sell for significantly more. Gifting dishes to townsfolk is the primary relationship-building mechanic, so keep a small stockpile of each resident's favorite dish type rather than selling everything. The story chapters unlock at relationship milestones, not time-based triggers, so actively gifting and talking to residents is the key to pacing your emotional journey through the game.`,
    tip_zh: `《Moonglow Bay》的钓鱼深度奖励耐心和观察力。在花钱购买新装备之前，先探索各个海域——不同区域的鱼类种群差异巨大，定向前往特定海域比在码头随机垂钓效率高得多。烹饪小游戏有精准度组件，熟练后可解锁更高品质的菜肴变体，售价显著提高。赠送菜肴给镇民是主要的关系建立机制——为每位居民储备一小批他们最爱的菜肴类型，不要把所有东西都卖掉。故事章节在关系里程碑时解锁，不是时间触发，所以主动赠礼和对话是把控情感旅程节奏的关键。`,
  },
  everdream: {
    title_en: 'Everdream Valley',
    title_zh: 'Everdream Valley',
    emoji: '🦊',
    tag_en: 'The Dream Farmer',
    tag_zh: '梦境农场少年',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `Everdream Valley is one of the most imaginative cozy games of 2023, and also one of the most underrated. You spend your summer at your grandparents' farm, helping with daily chores while gradually befriending the wild animals that live around the property — foxes, deer, bears, rabbits, and many more. Befriending each animal species requires different approaches: some respond to patient observation, others to specific food offerings, and a few require completing small tasks to earn their trust. The game's unique mechanic is its dream system: once you have bonded with an animal, you can fall asleep next to them and enter their dream world. Inside these dreams, you play platformer-style minigames that represent the animal's deepest fears or memories, and completing them deepens your bond and unlocks new farm possibilities. This makes every animal relationship feel genuinely earned rather than transactional. The farming side of Everdream Valley is gentle and seasonal — plant, water, harvest, use crops to attract more animals or complete requests — and the progression is always in service of building a richer relationship with the natural world around the farm. The art style is warm and saturated, with a hand-painted quality that makes the European countryside setting feel like a living watercolor. Everdream Valley is most satisfying for players who want a farming game where the emotional center is the animal bonds rather than the crop optimization, and where imagination is the most valuable farm tool.`,
    why_zh: `《Everdream Valley》是2023年最富想象力也最被低估的治愈游戏之一。你在爷爷奶奶的农场度过暑假，帮忙做日常农活，同时慢慢结交农场周边的野生动物——狐狸、鹿、熊、兔子等。与每种动物建立关系需要不同的方式：有些需要耐心观察，有些需要特定的食物，少数几种需要完成小任务才能赢得信任。游戏的独特机制是梦境系统：和动物建立足够深的羁绊后，你可以在它身边入睡、进入它的梦境世界，在那里完成代表动物内心恐惧或记忆的平台小游戏。这让每段动物关系都真正感觉是赢得的，而不是用资源交换的。农耕部分温和而季节性——种植、浇水、收获，用作物吸引更多动物或完成任务。画风温暖饱满，手绘质感让欧式田园场景像一幅活着的水彩画。`,
    tip_en: `The dream sequences are harder than the peaceful overworld suggests — bring enough items from your farm (specific fruits or vegetables that restore your in-dream stamina) before attempting the more difficult animal bond dreams in the late game. The animal bonding process is paced by how consistently you show up rather than how much you do in one session: visiting an animal's location daily builds familiarity faster than a single large gift-giving session. For the farm itself, prioritize crops that attract the animals you most want to befriend at that stage of the game — the relationship is more important than the yield. Unlock the farm cellar storage early; you will accumulate more dream-sequence items than you expect, and organization saves time.`,
    tip_zh: `梦境序列比和平的田园表层难得多——在挑战后期困难的动物梦境之前，准备足够从农场带来的物品（在梦中恢复体力的特定水果或蔬菜）。与动物建立羁绊靠的是持续的频率而非一次性的大量投入：每天造访动物所在地比一次性大量赠礼建立亲密感更快。农场方面，优先种植能吸引你当前阶段最想结交的动物的作物——关系比产量更重要。尽早解锁农场地窖储藏；你会积累比预期多得多的梦境序列物品，整理好仓库能节省大量时间。`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { spirittea: 0, immortal: 0, moonglow: 0, everdream: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function SpiritFarmLifeQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Pick[]>([])
  const [result, setResult] = useState<Pick | null>(null)

  const handleAnswer = (type: Pick) => {
    const next = [...answers, type]
    if (current + 1 < QUESTIONS.length) {
      setAnswers(next)
      setCurrent(current + 1)
    } else {
      setResult(calcResult(next))
    }
  }

  const reset = () => {
    setCurrent(0)
    setAnswers([])
    setResult(null)
  }

  const q = QUESTIONS[current]

  if (result) {
    const r = RESULTS[result]
    const shareText = isZh
      ? `我的灵气农场生活推荐是《${r.title_zh}》！${r.emoji} 来测测你的结果？${BASE_URL}/zh/quizzes/spirit-farm-life-quiz`
      : `My spirit farm life match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/spirit-farm-life-quiz`

    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{r.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">{isZh ? r.tag_zh : r.tag_en}</p>
          <h2 className="mb-2 text-2xl font-bold text-[#f0a832]">
            {isZh ? r.title_zh : r.title_en}
          </h2>
          <p className="text-sm text-[#8a9a7a]">{isZh ? r.platform_zh : r.platform_en}</p>
        </div>

        <div className="mb-6 rounded-xl bg-[#1a2e1a]/60 p-5 text-[#e8dcc8]">
          <p className="mb-4 leading-relaxed">{isZh ? r.why_zh : r.why_en}</p>
          <div className="border-t border-[#2d3d2d] pt-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {isZh ? '游玩建议' : 'Pro Tip'}
            </p>
            <p className="text-sm leading-relaxed text-[#c8bca8]">{isZh ? r.tip_zh : r.tip_en}</p>
          </div>
        </div>

        <div className="mb-6">
          <ShareButton text={shareText} isZh={isZh} />
        </div>

        <div className="mb-6 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a]/40 p-4 text-center">
          <p className="mb-1 text-xs text-[#8a9a7a]">
            {isZh ? '每天都想知道适合你的农场游戏？' : 'Want daily farming game picks for your mood?'}
          </p>
          <p className="text-sm text-[#e8dcc8]">
            {isZh
              ? '试试 TendFarm App — 根据你的状态，每天推荐一款最适合你的农场游戏'
              : 'Try TendFarm App — personalized farming game picks matched to how you feel today'}
          </p>
        </div>

        <button
          onClick={reset}
          className="w-full rounded-xl border border-[#2d3d2d] py-2.5 text-sm text-[#8a9a7a] transition-colors hover:border-[#4d5d4d] hover:text-[#e8dcc8]"
        >
          {isZh ? '重新测试' : 'Retake Quiz'}
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs text-[#8a9a7a]">
          <span>
            {isZh
              ? `第 ${current + 1} / ${QUESTIONS.length} 题`
              : `Question ${current + 1} of ${QUESTIONS.length}`}
          </span>
          <div className="flex gap-1">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i < current ? 'bg-[#f0a832]' : i === current ? 'bg-[#f0a832]/60' : 'bg-[#2d3d2d]'
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-[#e8dcc8]">
          {isZh ? q.q_zh : q.q_en}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.type)}
            className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 px-4 py-3 text-left text-sm text-[#e8dcc8] transition-all hover:border-[#f0a832]/40 hover:bg-[#1a2e1a] hover:text-[#f0a832]"
          >
            {isZh ? opt.zh : opt.en}
          </button>
        ))}
      </div>
    </div>
  )
}
