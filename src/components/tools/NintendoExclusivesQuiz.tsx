'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'zelda' | 'pikmin' | 'mario' | 'kirby'

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
    q_en: 'What makes a Nintendo game sound exciting to you?',
    q_zh: '什么样的 Nintendo 游戏最能让你心动？',
    options: [
      { en: 'A vast open world where I can build anything, explore in any order, and spend 100+ hours barely scratching the surface — a game that rewards curiosity above all else', zh: '一个我可以建造任何东西、按任意顺序探索并花费 100 多小时仍感觉才触及皮毛的广阔开放世界——一款最奖励好奇心的游戏', type: 'zelda' },
      { en: 'A strategic, slightly cozy game where I manage small creatures that feel almost like a garden — charming and deceptively smart, with emergent problem-solving at its core', zh: '一款管理小生物的策略、略微舒适的游戏，感觉有点像打理花园——迷人且出乎意料地聪明，以涌现式解题为核心', type: 'pikmin' },
      { en: 'A wildly creative 2D platformer bursting with ideas — every level introduces something new, and the game clearly loves having fun with its own rules', zh: '一款创意无限的 2D 平台游戏，充满各种想法——每个关卡都会引入新的元素，游戏显然热爱颠覆自己的规则', type: 'mario' },
      { en: 'The most welcoming game on the platform — one designed to be genuinely completable even if I have almost no gaming experience, with a cast of characters I can fall in love with', zh: '平台上最友好的游戏——即使我几乎没有游戏经验也能真正通关，拥有一批让我爱上的角色阵容', type: 'kirby' },
    ],
  },
  {
    q_en: 'How much time are you ready to invest?',
    q_zh: '你准备投入多少时间？',
    options: [
      { en: '100–200 hours — I want a game that I am still actively playing three months after I started, where the map keeps revealing new things and every session surfaces a new surprise', zh: '100-200 小时——我想要一款我在开始三个月后仍在积极游玩的游戏，地图不断揭示新内容，每次游玩都会带来新惊喜', type: 'zelda' },
      { en: '30–40 hours for the main story, with replay value in going back for S-rank scores on my favorite missions — complete at a natural length without overstaying', zh: '主线 30-40 小时，回头在最喜欢的任务中刷 S 级评分有重玩价值——在自然的长度内完整，不会过度拖延', type: 'pikmin' },
      { en: '15–20 hours of pure joy — a game I can finish in a week of evenings, feel completely satisfied, and revisit specific favorite levels for years', zh: '15-20 小时的纯粹喜悦——一款我能在一周的晚上通关、完全满足、并在多年后重访特定喜爱关卡的游戏', type: 'mario' },
      { en: '10–15 hours on my first run, with an easy mode that lets me see everything without frustration — I want to experience the whole game without getting stuck', zh: '第一次游玩 10-15 小时，有简单模式让我无需挫折地看到所有内容——我想体验整个游戏而不会卡关', type: 'kirby' },
    ],
  },
  {
    q_en: 'How do you feel about challenge and skill?',
    q_zh: '你对挑战难度和技巧要求的感受是？',
    options: [
      { en: 'I want challenge that I set myself — the game has hard shrines and optional boss fights, but the open world means I can always go do something else and return when I\'m ready', zh: '我想要自己设定的挑战——游戏有困难神庙和可选 Boss 战，但开放世界意味着我随时可以去做其他事情，准备好后再回来', type: 'zelda' },
      { en: 'Puzzle-based challenge — I want to feel clever for figuring out the optimal creature deployment, not twitch-reflex tested; the difficulty comes from planning, not execution speed', zh: '基于谜题的挑战——我想因为找到了最优生物部署方案而感到聪明，而不是被快速反应测试；难度来自计划，而非执行速度', type: 'pikmin' },
      { en: 'Moderate platforming challenge — hard enough to feel satisfying when I clear a tricky section, but never so punishing that I replay the same segment more than a handful of times', zh: '适中的平台挑战——难到足以在通过棘手关卡时感到满足，但不会如此惩罚性地让我重玩同一段落超过几次', type: 'mario' },
      { en: 'Very gentle — I want to enjoy the game\'s creativity and world without frustration, and I\'d use Kirby\'s health-heavy systems and optional assists to make sure I see everything', zh: '非常温和——我想享受游戏的创意和世界而不感到沮丧，我会使用柯比的高生命值系统和可选辅助功能确保看到所有内容', type: 'kirby' },
    ],
  },
  {
    q_en: 'What story tone appeals to you most?',
    q_zh: '哪种故事基调最吸引你？',
    options: [
      { en: 'Mythic and epic — ancient civilizations, a princess lost in time, a kingdom threatened by a darkness that resurfaces from the deep past, and a story that reveals itself slowly through found memories', zh: '神话史诗——古老文明、迷失在时间中的公主、被从远古历史中重新浮现的黑暗所威胁的王国，以及通过找到的记忆缓缓揭示的故事', type: 'zelda' },
      { en: 'Warmly heroic with surprising depth — Pikmin 4 has a rescue story where you help stranded explorers, with a surprisingly touching dog companion whose bond with Pikmin grows throughout the adventure', zh: '温暖英雄主义带有惊人深度——皮克敏 4 有一个救援故事，你帮助被困的探险家，拥有一只出乎意料令人感动的狗狗伙伴，其与皮克敏的羁绊在整个冒险中不断增长', type: 'pikmin' },
      { en: 'Pure joyful creativity — Super Mario Wonder has minimal story (save the Flower Kingdom from Bowser), but every Wonder Flower event is its own tiny comedic surprise, and the whole game is saturated with delight', zh: '纯粹的喜悦创意——超级马力欧兄弟：奇妙之旅的故事极简（从库巴手中拯救花之王国），但每个奇妙花朵事件都是自己独特的小喜剧惊喜，整款游戏充满喜悦', type: 'mario' },
      { en: 'Classic Nintendo heart — a clear villain (Meta Knight, King Dedede, or a new threat), characters I\'ve loved for decades, and a finale with the operatic scope that Kirby games always deliver despite their gentle difficulty', zh: '经典任天堂情怀——一个明确的反派（魅塔骑士、迪迪迪大王或新威胁）、我喜欢了几十年的角色，以及柯比游戏尽管难度温和但总能呈现的史诗级终章', type: 'kirby' },
    ],
  },
  {
    q_en: 'Which exploration style fits you best?',
    q_zh: '哪种探索方式最适合你？',
    options: [
      { en: 'Nonlinear open world — I want to climb any mountain, dive into any cave, and solve puzzles in creative ways the developers didn\'t intend; the joy is in the emergent discovery', zh: '非线性开放世界——我想爬任何山、潜入任何洞穴，并以开发者未必预料到的创意方式解谜；乐趣在于涌现式发现', type: 'zelda' },
      { en: 'Area-by-area expedition — I explore a cave or meadow with my Pikmin squad, solve its puzzles, find its treasures, and return to base before nightfall in a satisfying daily loop', zh: '逐区域探险——我带着皮克敏小队探索洞穴或草地，解开谜题、找到宝藏，在令人满足的每日循环中于夜幕降临前返回基地', type: 'pikmin' },
      { en: 'Level-by-level adventure — each level is a contained world with a beginning and end, full of secrets and badges to collect, and I can revisit levels I loved at any time', zh: '逐关卡冒险——每个关卡都是有开头和结尾的独立世界，充满可收集的秘密和徽章，我可以随时重访喜欢的关卡', type: 'mario' },
      { en: 'City and hub-based — exploring Waddle Dee Town between levels, finding new shops, meeting NPCs, and watching the town grow as I rescue more Waddle Dees felt like a cozy home to return to', zh: '城市和枢纽地图——在关卡之间探索沃都迪小镇、发现新商店、与 NPC 交谈、看着小镇随着我拯救更多沃都迪而成长，感觉像回到了一个温馨的家', type: 'kirby' },
    ],
  },
  {
    q_en: 'Which post-session feeling sounds most satisfying?',
    q_zh: '哪种游玩后的感觉最令你满足？',
    options: [
      { en: 'I just spent two hours building a flying machine out of parts I found in a mine, and it actually worked well enough to carry me across a canyon I hadn\'t figured out how to cross — this game accepts my chaotic creativity', zh: '我刚花了两个小时用在矿山里找到的零件造了一架飞行器，它工作得很好，足以把我带过一个我还没想出怎么穿越的峡谷——这款游戏接受我的混乱创意', type: 'zelda' },
      { en: 'My Pikmin team just completed a dungeon without a single casualty — I planned the route, positioned the right types, and it came together perfectly; the efficiency of it felt deeply satisfying', zh: '我的皮克敏团队刚以零伤亡完成了一个地下城——我规划了路线、安排了正确的类型，一切完美配合；这种效率感令人深感满足', type: 'pikmin' },
      { en: 'I just saw a Wonder Flower event that turned Mario into a walking onion being chased by a giant piranha plant through a psychedelic background — I am still laughing ten minutes later', zh: '我刚看到一个奇妙花朵事件，让马力欧变成了一颗在迷幻背景中被巨型吞食花追赶的行走洋葱——我在十分钟后仍在大笑', type: 'mario' },
      { en: 'I just defeated a boss that looked intimidating by inhaling its attacks and copying its power — then used that power for the rest of the world, making me feel inventive and powerful simultaneously', zh: '我刚通过吸入攻击并复制能力击败了一个看起来令人生畏的 Boss——然后在整个世界剩余部分使用那个能力，让我同时感到有创意和强大', type: 'kirby' },
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
  zelda: {
    title_en: 'The Legend of Zelda: Tears of the Kingdom',
    title_zh: '塞尔达传说：王国之泪',
    emoji: '🏰',
    tag_en: 'The most ambitious open-world game ever made — a 100+ hour masterpiece where you can build anything, go anywhere, and solve every puzzle your own way',
    tag_zh: '有史以来最雄心勃勃的开放世界游戏——超过 100 小时的杰作，你可以建造任何东西、去任何地方，并用自己的方式解决每一个谜题',
    platform_en: 'Available on: Nintendo Switch only — about $70 new. Game of the Year 2023.',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 70 美元。2023 年度游戏。',
    why_en:
      "The Legend of Zelda: Tears of the Kingdom (2023) is the sequel to Breath of the Wild and one of the most acclaimed games ever made — Metacritic 96, Game of the Year 2023 in almost every publication. The game expands BotW's open world vertically (sky islands above, underground depths below) and adds four game-changing building mechanics: Ultrahand (glue any objects together), Fuse (combine weapons and shields with materials to create new items), Ascend (phase through any ceiling above you), and Recall (reverse an object's recent movement). The result is a game where every puzzle has hundreds of solutions, every gap can be bridged with what you find around you, and creativity is more powerful than combat skill. Players regularly discover interactions the developers didn't plan — building flying machines, rail guns, automated combat rigs. The story (which unfolds through optional memories hidden across the world) is the most narratively ambitious in the Zelda series. At $70 and Switch-exclusive, it is expensive, but most players consider it the best game on the platform. Absolutely does not require playing Breath of the Wild first, though that game is also a masterpiece and often on sale for ~$30.",
    why_zh:
      '塞尔达传说：王国之泪（2023 年）是旷野之息的续作，也是有史以来最受好评的游戏之一——Metacritic 96 分，几乎每家媒体的 2023 年度游戏。游戏垂直扩展了旷野之息的开放世界（上方的天空岛屿、下方的地底深处）并添加了四个改变游戏的建造机制：超手（将任何物体粘在一起）、融合（将武器和盾牌与材料组合以创造新物品）、穿天（穿越你上方的任何天花板）和倒带（逆转物体最近的运动）。结果是一款每个谜题都有数百种解法的游戏，每个间隙都可以用你周围找到的东西桥接，创造力比战斗技巧更强大。Metacritic 96 分，Switch 独占。',
    tip_en: "The tutorial area (Great Sky Island) teaches you all four abilities — complete it fully before descending. Don't sell Zonaite or Construct materials early: they're used for Zonai Device Dispensers which become essential mid-game. The Depths (underground) can feel overwhelming — bring Brightbloom Seeds and follow Gloom-free paths. The story shrines (Dragon's Tears) are optional but give the best narrative payoff; find all memories before the final boss for the complete ending. You can fast travel from the start, so if you're stuck anywhere, just go somewhere else.",
    tip_zh: '教程区域（天空大岛）教会你所有四个能力——在下降之前完整完成它。不要提前出售佐纳乌石或构造物材料：它们用于佐纳乌装置分发器，在游戏中期变得至关重要。地底深处可能感觉压倒性——携带萤光蘑菇种子并沿着无恐魔之力的路径行走。故事神庙（龙之泪）是可选的，但提供最好的叙事回报；在最终 Boss 前找到所有记忆以获得完整结局。从一开始你就可以快速旅行，所以如果你在任何地方卡住了，就去别的地方。',
  },
  pikmin: {
    title_en: 'Pikmin 4',
    title_zh: '皮克敏 4',
    emoji: '🌿',
    tag_en: 'The most cozy strategy game on Switch — a charming expedition game where you command tiny plant-animal creatures in clever, satisfying puzzles with a surprisingly touching dog companion',
    tag_zh: 'Switch 上最 Cozy 的策略游戏——一款迷人的探险游戏，你在聪明、令人满足的谜题中指挥微小的植物动物生物，拥有出乎意料令人感动的狗狗伙伴',
    platform_en: 'Available on: Nintendo Switch only — about $60 new, often on sale for $35-45',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 60 美元，经常特价 35-45 美元',
    why_en:
      "Pikmin 4 (2023) is simultaneously the most beginner-friendly and most fully featured entry in the beloved Pikmin series — a strategy game where you command groups of tiny plant-animal creatures (Pikmin) to carry objects, fight enemies, and solve environmental puzzles. The core hook is beautiful: you're a rescue pilot who crash-landed in a miniature world (a garden, a house, a beach) where everyday objects like acorns and bottle caps are treasures. Each day-night cycle is timed (you must return to base before nightfall or lose Pikmin to nocturnal creatures), which creates a satisfying planning loop: scout the area, decide priorities, execute efficiently. Pikmin 4 adds Oatchi, a dog companion who can carry Pikmin, attack enemies, swim, and dig — who becomes arguably the most useful character in the game. The game is the most cozy strategy title on Switch: no online competition, no punishing failure states, and the difficulty scales naturally through new Pikmin types (Red, Yellow, Blue, Ice, Glow, Rock, Winged) each with distinct abilities that open new areas. Main story runs 25-30 hours; 100% completion takes 50-60 hours. Switch exclusive.",
    why_zh:
      '皮克敏 4（2023 年）同时是备受喜爱的皮克敏系列中最适合新手且功能最齐全的作品——一款你指挥小植物动物生物（皮克敏）搬运物品、对抗敌人并解决环境谜题的策略游戏。核心吸引力很美丽：你是一名迫降在微型世界（花园、房子、海滩）中的救援飞行员，橡果和瓶盖等日常物品都是宝藏。每个昼夜循环都有计时（你必须在夜幕降临前返回基地，否则会失去皮克敏给夜行生物），这创造了令人满足的规划循环。皮克敏 4 添加了大奇，一只可以携带皮克敏、攻击敌人、游泳和挖掘的狗狗伙伴。Switch 独占。Metacritic 89 分。',
    tip_en: "Always end your day before the timer reaches zero — lost Pikmin cannot be recovered until you complete the night missions unlocked after Area 1. Oatchi's Rush ability (unlocked early) is essential: use it to break through crystal walls. Prioritize upgrading Oatchi at the Rescue Corps base before expanding your Pikmin numbers. The caves (Dandori Caves) are timed challenge rooms; in the main game, the overworld missions are usually more rewarding. Don't neglect the Pikmin types: Rock Pikmin destroy crystal barriers, Ice Pikmin freeze water, and Glow Pikmin are exclusively for night missions.",
    tip_zh: '永远在计时器归零之前结束你的一天——失去的皮克敏无法恢复，直到你完成第 1 区域后解锁的夜间任务。大奇的冲锋能力（早期解锁）至关重要：用它突破水晶墙。在扩大皮克敏数量之前，优先在救援队基地升级大奇。洞穴（丹多利洞穴）是限时挑战室；在主游戏中，地表任务通常更有价值。不要忽视皮克敏类型：石头皮克敏摧毁水晶屏障，冰皮克敏冻结水域，萤火皮克敏专门用于夜间任务。',
  },
  mario: {
    title_en: 'Super Mario Bros. Wonder',
    title_zh: '超级马力欧兄弟：奇妙之旅',
    emoji: '🌺',
    tag_en: 'The most inventive 2D Mario game in 30 years — every level surprises you with a Wonder Flower event that transforms the rules, the physics, or the genre entirely',
    tag_zh: '30 年来最具创意的 2D 马力欧游戏——每个关卡都用改变规则、物理或整个类型的奇妙花朵事件让你惊喜',
    platform_en: 'Available on: Nintendo Switch only — about $60 new',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 60 美元',
    why_en:
      "Super Mario Bros. Wonder (2023) is widely considered the best 2D Mario game since Super Mario World (1990) — and a strong argument for the best 2D platformer of its generation. The key innovation is the Wonder Flower: every level contains a Wonder Flower that, when collected, transforms the game in unexpected and often hilarious ways. Some examples: the ground rises and falls like breathing, every enemy turns into Mario, the camera rotates, you play as a parade float, gravity reverses, the game shifts to a completely different genre for 60 seconds. No two Wonder Flower events are identical. The base platforming is crisp, the music reacts to every Wonder event, and the game offers 12 playable characters (including Yoshi and Nabbit who are invincible — perfect for less experienced players). Online multiplayer allows players to see ghosts of other players' runs on the same levels without true real-time interaction, which feels cozy rather than competitive. Metacritic 93 on Switch.",
    why_zh:
      '超级马力欧兄弟：奇妙之旅（2023 年）被广泛认为是自超级马力欧世界（1990 年）以来最好的 2D 马力欧游戏。关键创新是奇妙花朵：每个关卡都包含一个奇妙花朵，收集后会以出人意料且常常令人捧腹的方式改变游戏。地面像呼吸一样起伏、每个敌人都变成马力欧、摄像机旋转、游戏在 60 秒内转变成完全不同的类型——没有两个奇妙花朵事件是相同的。包括无敌的耀西和纳比特在内的 12 个可玩角色（非常适合经验较少的玩家）。Switch 版 Metacritic 93 分。',
    tip_en: "Use Yoshi or Nabbit if you die repeatedly on any section — they take no damage and let you see the full level design. The Wonder Seeds (main progression) are distinct from the 10 Purple Coins per level (optional collectibles); prioritize Seeds first and come back for coins on a second run. The final world (Special World) has the hardest optional content in the game — don't feel obligated to complete it. The badge system (equip one bonus ability per level) lets you tailor the experience: Badge: Wall Climb is great for explorers, Dolphin Kick for water levels, and Crouching High Jump for hard badge challenges.",
    tip_zh: '如果你在任何部分反复死亡，使用耀西或纳比特——他们不受伤害，让你看到完整的关卡设计。奇妙种子（主要进程）与每关的 10 个紫色硬币（可选收集品）不同；优先收集种子，在第二次游玩时回来收集硬币。最终世界（特殊世界）有游戏中最难的可选内容——不要感到有义务完成它。徽章系统（每关装备一个奖励能力）让你定制体验：徽章：爬墙非常适合探索者，海豚踢适合水关，蹲跳适合困难徽章挑战。',
  },
  kirby: {
    title_en: 'Kirby and the Forgotten Land',
    title_zh: '星之卡比：探索发现',
    emoji: '🌸',
    tag_en: "Nintendo's most welcoming 3D game — a joyful platformer where Kirby can inhale cars, vending machines, and traffic cones with Mouthful Mode, in a world inspired by post-apocalyptic civilizations",
    tag_zh: '任天堂最友好的 3D 游戏——一款欢快的平台游戏，柯比可以在受末日文明启发的世界中用"塞满嘴"模式吸入汽车、自动贩卖机和交通锥',
    platform_en: 'Available on: Nintendo Switch only — about $60 new, often on sale for $30-40',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 60 美元，经常特价 30-40 美元',
    why_en:
      "Kirby and the Forgotten Land (2022) is Nintendo's first fully 3D Kirby game — and it is one of the most charming, accessible 3D platformers ever made. Kirby arrives in the Forgotten Land: a post-civilization world where shopping malls, highways, and amusement parks have been reclaimed by nature, and where the Waddle Dees he rescues gradually rebuild a thriving town you can explore between levels. The headline feature is Mouthful Mode: Kirby can fully inhale large real-world objects (cars, vending machines, traffic cones, water tanks) and use their functions as abilities — driving the car, shooting ice from the machine, rolling as the cone. This is the most Nintendo-weird-wonderful the series has ever been. The game is genuinely accessible: Kirby has enormous health reserves, copy abilities let you choose your combat style, and the Wild Mode difficulty reduces damage even further. The story has a surprisingly epic finale that has become a series tradition. Metacritic 82 on Switch — broadly loved. Perfect for non-gamers or anyone who wants a pure, uncomplicated Nintendo joy experience.",
    why_zh:
      '星之卡比：探索发现（2022 年）是任天堂第一款完全 3D 的柯比游戏——也是有史以来最迷人、最易上手的 3D 平台游戏之一。柯比来到被遗忘之地：一个文明后的世界，购物中心、高速公路和游乐园已被大自然重新占据，他拯救的沃都迪逐渐重建了一个你可以在关卡之间探索的繁荣小镇。主要特色是"塞满嘴"模式：柯比可以完整吸入大型现实物品（汽车、自动贩卖机、交通锥、水箱）并将其功能作为能力使用。游戏真正易上手：柯比拥有巨大的生命值储备，复制能力让你选择战斗风格。Switch 版 Metacritic 82 分。',
    tip_en: "Upgrade copy abilities at Waddle Dee's Weapons Shop using Star Coins and Rare Stones (found in Treasure Chests). The 'Evolved' ability upgrades are visually spectacular and significantly more powerful — try Evolved Sword or Evolved Fire. Rescue all Waddle Dees in a stage before moving on: Waddle Dee Town grows with each rescue and unlocks a café, cinema, fishing pond, and arena that are genuinely fun to visit. The optional Boss Rush (Colosseum) has the game's hardest challenges. In two-player co-op, Player 2 controls Bandana Waddle Dee — a great way to play with a non-gaming partner.",
    tip_zh: '在沃都迪武器店使用星之硬币和稀有之石（在宝箱中找到）升级复制能力。"进化"能力升级视觉上令人叹为观止且显著更强大——尝试进化之剑或进化之火。在继续之前救出关卡中的所有沃都迪：沃都迪镇随着每次救援而成长，并解锁咖啡馆、电影院、钓鱼池和竞技场，真的很有趣。可选的 Boss 连战（斗技场）有游戏中最难的挑战。在双人合作中，玩家 2 控制头巾沃都迪——与非游戏玩家伙伴一起游玩的好方法。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { zelda: 0, pikmin: 0, mario: 0, kirby: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function NintendoExclusivesQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/nintendo-switch-exclusives-quiz`
    const shareText = isZh
      ? `Nintendo Switch 独占游戏推荐结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My Nintendo Switch exclusive recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
          <p className="text-xs text-[#4a5a4a]">{isZh ? result.platform_zh : result.platform_en}</p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.why_zh : result.why_en}
        </p>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {isZh ? '入门建议：' : 'Getting started: '}
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
          {isZh ? '哪款 Nintendo Switch 独占游戏最适合你？' : 'Which Nintendo Switch Exclusive Is Right for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从塞尔达：王国之泪、皮克敏 4、超级马力欧兄弟：奇妙之旅、星之卡比：探索发现中找到你的专属推荐'
            : '6 questions to match you with Zelda: Tears of the Kingdom, Pikmin 4, Super Mario Bros. Wonder, or Kirby and the Forgotten Land'}
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
        {isZh ? '找到我的 Switch 游戏' : 'Find My Switch Game'}
      </button>
    </div>
  )
}
