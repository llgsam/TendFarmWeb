'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'forager' | 'gardenpaws' | 'staxel' | 'havendock'

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
    q_en: 'What game pace feels most satisfying to you?',
    q_zh: '哪种游戏节奏让你最满足？',
    options: [
      { en: 'Fast and addictive — I want rapid feedback, constantly unlocking new things, and the urge to keep going', zh: '快节奏且上瘾——我想要即时反馈、不断解锁新东西，以及停不下来的冲动', type: 'forager' },
      { en: 'Social and varied — a mix of daily tasks, community events, and chatting with villagers at a comfortable pace', zh: '社交感丰富且多样——日常任务、社区活动和和村民聊天混合在一起，节奏舒适', type: 'gardenpaws' },
      { en: 'Creative and open — I want to set my own pace and spend as much time building as farming', zh: '创意感强且开放——我想自己定节奏，花和农耕同样多甚至更多的时间在建造上', type: 'staxel' },
      { en: 'Slow and atmospheric — I want time to just exist in the world, watching the ocean and tending my floating farm', zh: '缓慢而有氛围——我想在世界里静静存在，看着海洋、照料我的漂浮农场', type: 'havendock' },
    ],
  },
  {
    q_en: 'Which core motivation drives you in farming games?',
    q_zh: '在农场游戏里，什么是你最核心的驱动力？',
    options: [
      { en: 'Efficiency and expansion — I want to keep growing, unlocking, and optimizing my operation', zh: '效率和扩张——持续成长、解锁和优化我的整个运营体系', type: 'forager' },
      { en: 'Community and shop management — farming is how I supply my little shop and help my animal neighbors', zh: '社区和商店经营——农耕是为小店供货、帮助动物邻居的方式', type: 'gardenpaws' },
      { en: 'Creative construction — I want to shape a village that is uniquely mine, block by block', zh: '创意建造——用一块块积木打造一个独一无二的村庄', type: 'staxel' },
      { en: 'Peaceful self-sufficiency — farming is part of surviving and thriving on my own little floating world', zh: '宁静的自给自足——农耕是在我小小漂浮世界里生存并繁荣的一部分', type: 'havendock' },
    ],
  },
  {
    q_en: 'Which visual style speaks to you most?',
    q_zh: '哪种视觉风格最吸引你？',
    options: [
      { en: 'Cute top-down pixel art with a Zelda-like dungeon aesthetic and bright, punchy colors', zh: '可爱的俯视角像素画风，带有类塞尔达地牢美学，颜色明亮而充满冲击力', type: 'forager' },
      { en: 'Bright 3D with adorable anthropomorphic animal characters and cozy seasonal decorations', zh: '明亮的3D风格，可爱的拟人化动物角色，加上温馨的季节性装饰', type: 'gardenpaws' },
      { en: 'Voxel-style blocks with the familiar Minecraft-adjacent aesthetic that feels creatively open', zh: '体素风格的方块世界，带有熟悉的类Minecraft美学，感觉充满创意空间', type: 'staxel' },
      { en: 'Atmospheric ocean-world environments with realistic water, sunsets, and hand-crafted wooden structures', zh: '大气感十足的海洋世界，真实的水面、日落，以及手工打造的木质建筑结构', type: 'havendock' },
    ],
  },
  {
    q_en: 'How do you feel about exploration and expanding your territory?',
    q_zh: '你对探索和扩张领地有什么感受？',
    options: [
      { en: 'I love it — the core fantasy is buying new land tiles, discovering what is on them, and incorporating them into my operation', zh: '非常享受——购买新地块、发现上面有什么并融入运营，这个过程是最核心的乐趣', type: 'forager' },
      { en: 'I enjoy exploring the island for resources and quests, but home base and the village are where my heart is', zh: '喜欢探索岛屿寻找资源和任务，但大本营和村庄才是我真正在乎的地方', type: 'gardenpaws' },
      { en: 'Building outward into new space and decorating it is how I explore — terrain is a canvas, not a destination', zh: '向外建造新空间并装饰它就是我的探索方式——地形是画布，不是目的地', type: 'staxel' },
      { en: 'I prefer expanding my platform gradually and carefully — each new section should feel intentional and earned', zh: '我喜欢缓慢而谨慎地扩展平台——每一个新区域都应该感觉是经过深思熟虑赢得的', type: 'havendock' },
    ],
  },
  {
    q_en: 'Multiplayer or solo — and why?',
    q_zh: '联机还是单人——你更倾向哪种，为什么？',
    options: [
      { en: 'Primarily solo — this is my optimization puzzle and I want full control over every decision', zh: '主要单人——这是我的优化谜题，我想要对每个决策拥有完全控制权', type: 'forager' },
      { en: 'Both — I love having friends visit my shop and island, and seasonal co-op events are the highlight', zh: '都喜欢——朋友来参观我的商店和岛屿很开心，季节性合作活动更是亮点', type: 'gardenpaws' },
      { en: 'Multiplayer preferred — building a shared village with friends who each have their own sections is the dream', zh: '偏好联机——和朋友各自负责不同区域共同建设村庄是我的理想体验', type: 'staxel' },
      { en: 'Solo only — the peace and solitude of ocean farming is exactly what I am looking for', zh: '仅限单人——海洋农耕的宁静与独处，正是我所寻找的', type: 'havendock' },
    ],
  },
  {
    q_en: 'Which of these sounds most like your ideal session?',
    q_zh: '哪种最像你理想的游戏时段？',
    options: [
      { en: 'One more island tile, one more crafting level, one more dungeon — then I will stop (but I never do)', zh: '再多一块地、再升一级制作、再清一个地牢——然后我就停（但从没真的停下来）', type: 'forager' },
      { en: 'Morning: water crops, open the shop, chat with the fox neighbor, attend the harvest festival', zh: '早晨：浇水种地，开门营业，和狐狸邻居聊天，参加丰收节', type: 'gardenpaws' },
      { en: 'Spend two hours placing blocks, realize I have completely redesigned the town center, feel deeply satisfied', zh: '花两个小时放方块，发现我已经彻底重新设计了小镇中心，感到深深满足', type: 'staxel' },
      { en: 'A quiet evening: harvest from the floating garden, watch the sun set over the ocean, plan tomorrow', zh: '安静的傍晚：从漂浮花园收获，看太阳落入海洋，规划明天', type: 'havendock' },
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
  forager: {
    title_en: 'Forager',
    title_zh: 'Forager',
    emoji: '⛏️',
    tag_en: 'The Addicted Expansionist',
    tag_zh: '停不下来的扩张者',
    platform_en: 'PC · Switch · PS4 · Xbox · iOS · Android',
    platform_zh: 'PC · Switch · PS4 · Xbox · iOS · Android',
    why_en: `Forager is the farming game that most accurately recreates the feeling of an addictive idle game but with real agency and a physical world to explore. Developed solo by HopFrog and published in 2019, you begin on a single tiny island with nothing but your fists and a determination to make something of it. You chop trees, mine rocks, and gather plants. These feed into crafting stations that produce more advanced materials, which unlock new crafting tiers, which enable you to buy adjacent land tiles, which contain new resources, which feed back into the loop. The farming component — planting and harvesting crops — is one of several interlocking systems rather than the central focus, but it becomes increasingly important as a food source that powers your XP multiplier and enables more demanding crafting chains. Forager also includes Zelda-style puzzle dungeons scattered across the expanding world map, adding an exploration and combat dimension that distinguishes it from pure farming sims. The skill tree is enormous and allows genuine specialization: you can optimize for farming efficiency, combat power, crafting speed, or economy — and the right build dramatically changes how the game plays. The genius of Forager is that it compresses the satisfaction of a long farming session into rapid micro-loops: you are never more than a minute away from unlocking something new. If you have ever played a farming game and thought "I wish the progression was faster," Forager is built specifically for you.`,
    why_zh: `《Forager》是最准确地重现放置游戏那种让人上瘾感觉的农场游戏，同时又保留了真实的操控感和可探索的物理世界。2019年由单人开发者HopFrog推出。你从一个小岛、一无所有开始，砍树、挖矿、采集植物，这些材料进入制作站生产更高级材料，解锁新制作层级，从而购买相邻地块——地块上有新资源，再次回到循环中。农耕系统是多个互锁系统之一，提供食物作为经验值倍增器。游戏还包含类塞尔达的解谜地牢，增加探索和战斗维度。技能树庞大，允许真正的专精：你可以优化农耕效率、战斗能力、制作速度或经济产出。Forager的天才之处在于将长时农场游戏的满足感压缩进快速的微循环——你永远不超过一分钟就能解锁新东西。`,
    tip_en: `The key to Forager efficiency is understanding the XP multiplier system: food items do not just restore health — they multiply your XP gain for a duration, and maximizing this uptime dramatically accelerates unlocking. Set up a dedicated farming area producing berries and wheat before worrying about combat or exploration, and always have food active. The skill tree order matters enormously: prioritize skills that increase your automatic gathering radius and resource spawn rates before combat skills, since economic dominance enables everything else. When buying new land tiles, prioritize tiles with ore deposits or specific biome types over random ocean tiles — the minimap icons reveal what each tile contains before you purchase it.`,
    tip_zh: `《Forager》效率的关键是理解经验值倍增器系统：食物不只是恢复生命值——它会在一段时间内倍增经验获取速度，最大化这个时间显著加速解锁进度。在担心战斗或探索之前，先建立一个专门生产浆果和小麦的农业区，并始终保持食物效果激活状态。技能树顺序非常重要：在战斗技能之前优先提升自动采集半径和资源刷新率的技能——经济主导权能解锁其他一切。购买新地块时，优先购买含矿石矿床或特定生态类型的地块，而不是随机海洋地块——小地图图标在购买前就能揭示每块地的内容。`,
  },
  gardenpaws: {
    title_en: 'Garden Paws',
    title_zh: 'Garden Paws',
    emoji: '🦊',
    tag_en: 'The Community Shopkeeper',
    tag_zh: '社区商店主人',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `Garden Paws occupies a unique and delightful niche: it takes the Animal Crossing formula of an anthropomorphic island community and adds the deeper farming, crafting, and shop-management systems that Animal Crossing deliberately leaves out. You play as one of dozens of adorable animal characters — fox, bunny, cat, bear, and many more — who have just moved to Florens Island and inherited a small farmstead. From this base, you farm crops and trees, raise animals, gather materials from around the island, and craft products to sell in your personal shop. The shop system is where Garden Paws distinguishes itself: you set your own prices, decide which products to stock, and watch customers browse and purchase throughout the day. Community events — seasonal festivals, birthday parties, treasure hunts — give the year a rhythm and a social calendar. The game has a large active fanbase, regular developer updates, and generous multiplayer support that lets friends visit each other's islands and tend farms together. Garden Paws is notably generous in its design philosophy: there is no stamina system, no crop failure, and money is earned easily enough that economic stress is minimal. The game is somewhat smaller in scope than Stardew Valley, but what it does — the cute aesthetic, the shop management, the community feel — it does with a charm that earns real affection from players who love that specific flavor of farming life sim.`,
    why_zh: `《Garden Paws》占据了一个独特而令人愉悦的细分市场：它采用《动物森友会》的拟人化岛屿社区公式，然后加入动森刻意省略的更深层农耕、制作和商店管理系统。你选择数十种可爱动物角色之一——狐狸、兔子、猫、熊等——刚搬到Florens岛并继承了一个小农场。从这里开始，你种植作物和树木、养殖动物、在岛屿各处采集材料，并制作产品在个人商店出售。商店系统是Garden Paws的差异化所在：你自己定价、决定备货哪些商品，并看着顾客全天浏览购买。季节性节日、生日派对、寻宝活动等社区事件给全年带来节奏感和社交日历。游戏拥有活跃的粉丝群体，开发者定期更新，并支持多人游戏。`,
    tip_en: `The shop is the economic engine of Garden Paws, so invest in shop upgrades before farm expansions. A well-stocked shop with premium-priced crafted goods earns dramatically more than selling raw crops at market rates. Learn which crafted items have the highest profit margins early — generally processed goods (jams, juices, furniture) outperform raw materials by 3-5x. For farming efficiency, prioritize crops that can be harvested multiple times per season over single-harvest varieties, since replanting labor is the main time cost. The island map reveals hidden resource nodes that most players miss on the first tour — specifically look for ore deposits in the rocky northern areas and fruit trees in the forest zones. Community event participation gives exclusive cosmetic items that cannot be obtained any other way, so check the event calendar weekly.`,
    tip_zh: `商店是《Garden Paws》的经济引擎，所以在农场扩张之前先升级商店。备货优质手工商品的店铺比按市场价出售原材料多赚3-5倍。尽早了解哪些手工品利润率最高——通常加工商品（果酱、果汁、家具）的表现远超原材料。农耕效率方面，优先种植每季可多次收割的作物，而非单次收割品种，因为重新播种的劳动是主要时间成本。岛屿地图中有大多数玩家在初次游览时错过的隐藏资源节点——特别注意北部岩石区的矿石矿床和森林区的果树。参与社区活动能获得无法通过其他方式获得的独家装饰物品，所以每周查看活动日历。`,
  },
  staxel: {
    title_en: 'Staxel',
    title_zh: 'Staxel',
    emoji: '🧱',
    tag_en: 'The Voxel Village Architect',
    tag_zh: '体素村庄建造师',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `Staxel answers the question that many Minecraft players eventually ask: what if voxel building were paired with the warmth of a farming community life sim rather than survival mechanics? You move to a small village in a colorful block-world and begin as a new resident trying to find their place in the community. The farming is genuine and satisfying — seasonal crops, animal husbandry, fishing, and foraging all function as they do in Stardew Valley — but the voxel building system is what sets Staxel apart. Every building in the game, including your farmhouse and all village structures, is built from individual blocks that can be modified, replaced, and expanded in Minecraft-style. This means your farm can look exactly how you want it to — the blocky aesthetic does not constrain creativity so much as provide a consistent grammar for it. Community life is central: village events happen throughout the year, including seasonal festivals, competitive farming challenges, and market days where players can trade with each other. The multiplayer support is strong — multiple players can share a village, with each owning a separate property but contributing to shared community goals. Staxel has had a long and active development cycle with consistent updates, and its Steam community is particularly warm and helpful for new players. For players who love both Stardew Valley and Minecraft but find neither fully satisfies, Staxel may be the exact bridge they have been looking for.`,
    why_zh: `《Staxel》回答了许多Minecraft玩家最终都会问的问题：如果体素建造与农场社区生活模拟的温暖感相结合，而不是生存机制，会是什么样子？你搬进一个色彩丰富的方块世界小村庄，作为新居民开始寻找自己的位置。农耕是真实而令人满足的——季节性作物、动物养殖、钓鱼和采集都像星露谷一样运作——但体素建造系统才是Staxel的差异化所在。游戏中的每一栋建筑，包括你的农舍和所有村庄建筑，都由可以修改、替换和扩展的单个方块构建。这意味着你的农场可以完全按照你想要的样子呈现。社区生活是核心：全年发生村庄活动，包括季节性节日、竞争性农耕挑战和玩家交易市集。对于热爱星露谷和Minecraft但发现两者都不能完全满足的玩家，Staxel可能正是他们一直在寻找的那座桥梁。`,
    tip_en: `Staxel's building freedom is its greatest strength but also its biggest time sink for new players. Resist the urge to completely redesign your farmhouse in the first in-game week — establish a functional farm layout first, then decorate. The voxel building system has a learning curve: spend time in the single-player building mode before tackling large multiplayer projects, as mistakes on shared village structures can be frustrating. For farming, the community seed sharing system (trading seeds with village NPCs and other players) dramatically accelerates crop variety expansion — prioritize gifting seeds you have extras of to unlock rare varieties faster. Market days are the most profitable economic opportunity in the game; batch-produce your highest-margin crafted goods the day before and undercut competitor prices slightly to sell out quickly.`,
    tip_zh: `Staxel的建造自由是其最大优势，但对新玩家来说也是最大的时间陷阱。抵制在游戏第一周就彻底重新设计农舍的冲动——先建立功能性的农场布局，然后再装饰。体素建造系统有学习曲线：在处理大型多人项目之前，先在单人建造模式中练习，因为在共享村庄建筑上犯错可能令人沮丧。农耕方面，社区种子分享系统（与村庄NPC和其他玩家交换种子）大幅加速作物品种扩张——优先赠送你有余量的种子以更快解锁稀有品种。市集日是游戏中最有利可图的经济机会；前一天批量生产利润率最高的手工商品，并略微低于竞争对手价格出售以快速清仓。`,
  },
  havendock: {
    title_en: 'Havendock',
    title_zh: 'Havendock',
    emoji: '⚓',
    tag_en: 'The Ocean Platform Farmer',
    tag_zh: '海洋平台农耕者',
    platform_en: 'PC (Early Access)',
    platform_zh: 'PC（抢先体验）',
    why_en: `Havendock is the most atmospheric entry point in the farming-and-building genre, built around a premise that no other game quite occupies: you construct a floating settlement in the middle of a vast ocean, and your farm is built on the platforms you expand outward from your starting dock. The setting immediately creates a distinct emotional register — every farming action takes place with open water visible in all directions, and the rhythm of the ocean (weather changes, day and night cycles, fishing from the platform edge) creates an ambient presence that conventional land-based farming games cannot match. The building system is constrained but meaningful: you expand by placing new platform sections, and each section must be connected to your existing dock. This creates an organic growth pattern where your settlement sprawls naturally rather than being planned on a grid. Farming on Havendock is survival-adjacent: you grow crops to feed yourself and craft materials for platform expansion, and the early game has gentle resource pressure that makes each harvest feel meaningful. Fishing from the dock edge is integrated directly into daily life rather than being a separate activity zone. The visual style emphasizes the beauty of the ocean setting — sunrise and sunset light effects, storm weather systems, and the visual contrast between your warm wooden structures and the surrounding blue expanse. Havendock is in Early Access with active development, and its current state already provides a uniquely tranquil farming experience unlike anything else in the genre.`,
    why_zh: `《Havendock》是农场建造类型中最有氛围感的作品，建立在一个其他游戏都没有占领的前提上：你在广阔海洋中间建造一个漂浮定居点，你的农场建在从起始码头向外扩展的平台上。这个设定立刻创造了一种独特的情感基调——每一个农耕动作都在四面八方都能看到海水的环境中进行。建造系统有约束但有意义：你通过放置新平台区段来扩张，每个区段都必须连接到现有码头，形成有机的生长模式。在Havendock上的农耕带有轻度生存感：种植作物是为了养活自己并为平台扩张制作材料。从码头边缘钓鱼直接融入日常生活，而不是独立的活动区。目前仍在抢先体验阶段，活跃开发中，但当前状态已经提供了类型中独一无二的宁静农耕体验。`,
    tip_en: `Havendock's platform expansion costs increase with each new section, so plan your initial dock layout carefully before committing to a direction — it is much cheaper to plan well than to deconstruct. Prioritize fishing early: ocean fish are the primary food source before your farming operation is established, and fishing also yields crafting materials that are harder to obtain through farming alone. The weather system affects both farming (rain waters crops automatically) and fishing (certain fish types appear only during specific weather patterns) — learn these patterns and plan your daily activities accordingly. Energy management is gentle but real in the early game; rest when needed rather than exhausting yourself, as the ocean-side sleeping mechanic has a pleasant atmospheric quality that makes rest feel like a reward rather than an interruption.`,
    tip_zh: `Havendock的平台扩张成本随着每个新区段的增加而提高，所以在确定方向之前仔细规划初始码头布局——规划好比拆除重建便宜得多。优先早期钓鱼：在你的农业运营建立之前，海洋鱼是主要食物来源，钓鱼还能产出难以单独通过农耕获得的制作材料。天气系统同时影响农耕（雨天自动浇水）和钓鱼（特定鱼类只在特定天气模式下出现）——了解这些规律并相应规划每日活动。体力管理在早期游戏中温和但真实；需要时就休息，不要把自己累垮，因为海边入睡机制有一种愉快的氛围感，让休息感觉像奖励而不是打扰。`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { forager: 0, gardenpaws: 0, staxel: 0, havendock: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function FarmCraftBuildQuiz({ locale }: { locale: string }) {
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
      ? `我的农场制作建造推荐是《${r.title_zh}》！${r.emoji} 来测测你的结果？${BASE_URL}/zh/quizzes/farm-craft-build-quiz`
      : `My farm-craft-build match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/farm-craft-build-quiz`

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
            {isZh ? '想每天发现最适合你的农场游戏？' : 'Want daily farming game picks matched to your mood?'}
          </p>
          <p className="text-sm text-[#e8dcc8]">
            {isZh
              ? '试试 TendFarm App — 每天根据你的状态，推荐一款最适合你的农场游戏'
              : 'Try TendFarm App — personalized farming game picks every day based on how you feel'}
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
