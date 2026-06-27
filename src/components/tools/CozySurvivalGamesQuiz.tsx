'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'raft' | 'keeper' | 'frontier' | 'grounded'

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
    q_en: 'Which survival setting sounds most appealing?',
    q_zh: '哪种生存游戏的场景最吸引你？',
    options: [
      { en: 'The open ocean — I start on a tiny wooden raft with almost nothing and slowly grow it into a sprawling floating home as I pull debris from the water and fend off the occasional shark', zh: '开阔的海洋——我从一个几乎什么都没有的小木筏开始，随着从水中捞起碎片并偶尔抵御鲨鱼攻击，慢慢将其建成庞大的漂浮家园', type: 'raft' },
      { en: 'Underground caverns — I dig downward into a procedurally generated world of ancient ruins, rare ores, and strange creatures, building a base around a glowing Core that gradually reveals the world\'s secrets', zh: '地下洞穴——我向下挖入程序生成的古代遗迹、稀有矿石和奇特生物世界，在一个逐渐揭示世界秘密的发光核心周围建造基地', type: 'keeper' },
      { en: 'An alien planet where I pilot a mech — I land on a colorful extraterrestrial world, pilot a giant walking robot to harvest resources and fight off alien plants, and build a cozy farming settlement between mech missions', zh: '我驾驶机甲的外星球——我降落在一个色彩缤纷的外星世界，驾驶巨大的步行机器人收集资源并对抗外星植物，在机甲任务之间建立温馨的农业定居点', type: 'frontier' },
      { en: 'A backyard from insect perspective — I am the size of a pebble in a suburban backyard where blades of grass are skyscrapers, spiders are boss-tier enemies, and every household object is a landmark in my survival world', zh: '从昆虫视角看到的后院——我只有小石子大小，在郊区后院，一片草叶就是摩天大楼，蜘蛛是精英级敌人，每个家用物品都是我生存世界的地标', type: 'grounded' },
    ],
  },
  {
    q_en: 'Do you prefer to play alone or with others?',
    q_zh: '你更喜欢单人游玩还是和朋友一起？',
    options: [
      { en: 'With 1-4 friends online — the best survival memories come from building together, dividing tasks naturally, and having someone to help when the shark attacks at the worst moment', zh: '和 1-4 位朋友在线——最好的生存记忆来自共同建造、自然分工，以及在鲨鱼在最糟糕时机攻击时有人帮忙', type: 'raft' },
      { en: 'Either works — I am happy solo and the game scales well for up to 8 players online; I could start alone and have friends drop in later without disrupting anything', zh: '都可以——我单人游玩很开心，游戏对最多 8 名玩家的在线支持也很好；我可以单独开始，以后朋友加入时不会打断任何流程', type: 'keeper' },
      { en: 'With a co-op partner or small group (1-4) — this game is best when someone else pilots a second mech alongside you, and the farm building feels more rewarding with a friend tending to it together', zh: '和合作伙伴或小团队（1-4 人）——当有人驾驶第二台机甲与你并肩时，这款游戏最精彩，和朋友一起打理农场也感觉更有价值', type: 'frontier' },
      { en: 'With 1-3 close friends — the backyard survival world is best experienced as a squad, with each person specializing in different roles (builder, fighter, farmer, explorer)', zh: '和 1-3 位亲密朋友——后院生存世界以小队形式体验最佳，每个人专注于不同角色（建造者、战士、农夫、探索者）', type: 'grounded' },
    ],
  },
  {
    q_en: 'Which survival loop sounds most satisfying?',
    q_zh: '哪种生存核心循环最令你满足？',
    options: [
      { en: 'Expanding my home base — every resource I pull from the ocean goes toward making my raft bigger, better decorated, and more self-sufficient, until it barely feels like survival and more like floating home ownership', zh: '扩大我的大本营——我从海洋中捞到的每一件资源都用于让我的木筏更大、装饰更好、更能自给自足，直到它几乎不像是生存，更像是漂浮的房屋所有权', type: 'raft' },
      { en: 'Mining deeper and discovering more — every pickaxe swing reveals a new ore, a new enemy type, or a new biome; the loop of "dig, craft, survive, dig deeper" feels endlessly rewarding with each layer revealing new challenges', zh: '挖得更深、发现更多——每一次镐击都会揭示新的矿石、新的敌人类型或新的生物群落；"挖掘、制作、生存、再挖更深"的循环感觉无限有趣，每一层都揭示新挑战', type: 'keeper' },
      { en: 'Farming and base building with occasional mech combat — the satisfying rhythm is: explore the alien world in my mech, gather materials, return to base, plant crops, build new structures, upgrade the mech, repeat', zh: '农业和基地建设，偶尔进行机甲战斗——令人满足的节奏是：驾驶机甲探索外星世界、收集材料、返回基地、种植作物、建造新建筑、升级机甲、循环往复', type: 'frontier' },
      { en: 'Crafting gear from creature parts — every bug I defeat drops materials that craft into specific armor and weapon sets; the gear progression loop of "kill bug → craft its armor → access new area → find stronger bugs" is the game\'s spine', zh: '用生物部件制作装备——每只我击败的虫子都会掉落用于制作特定护甲和武器套装的材料；"杀死虫子→制作其护甲→进入新区域→发现更强的虫子"的装备进度循环是游戏的骨干', type: 'grounded' },
    ],
  },
  {
    q_en: 'How do you feel about tension and danger?',
    q_zh: '你对紧张感和危险的感受是？',
    options: [
      { en: 'Mild tension is fine — the occasional shark attack keeps things interesting without being constant, and I can build shark bait to redirect attacks so I feel in control even during dangerous moments', zh: '轻度紧张感没问题——偶尔的鲨鱼攻击让事情保持有趣而不是持续不断，我可以制作鲨鱼诱饵来转移攻击，所以即使在危险时刻我也感到掌控中', type: 'raft' },
      { en: 'Comfortable tension — the underground has enemies, but combat is slow-paced enough that I can retreat and heal; a Custom difficulty lets me tune danger levels so I can focus on exploration and building if I prefer', zh: '舒适的紧张感——地下有敌人，但战斗节奏足够缓慢，我可以撤退并治疗；自定义难度让我调整危险等级，如果我愿意，我可以专注于探索和建造', type: 'keeper' },
      { en: 'Very minimal — Lightyear Frontier has the lowest danger ceiling of this group; enemies exist but the mech absorbs most damage, and the game actively encourages the cozy farming loop over combat', zh: '极其轻微——Lightyear Frontier 在这个组合中危险上限最低；敌人存在但机甲吸收大部分伤害，游戏积极鼓励温馨的农业循环而非战斗', type: 'frontier' },
      { en: 'Moderate tension with genuine stakes — spiders and wolf spiders feel authentically scary, night is significantly more dangerous than day, and the survival loop has real weight; adjustable difficulty makes it accessible', zh: '有真实风险的适中紧张感——蜘蛛和狼蛛感觉真实地令人害怕，夜晚明显比白天危险，生存循环有真实分量；可调难度使其易上手', type: 'grounded' },
    ],
  },
  {
    q_en: 'What would your ideal in-game home look like?',
    q_zh: '你理想中的游戏内家园是什么样的？',
    options: [
      { en: 'A large multi-level raft with separate rooms — a bedroom, a kitchen with a cooking station, a garden section growing sugarcane and potatoes, an engine room, and a top deck for stargazing over the open ocean', zh: '一个有独立房间的多层大木筏——卧室、有烹饪台的厨房、种着甘蔗和土豆的花园区、发动机舱，以及在开阔海洋上观星的顶层甲板', type: 'raft' },
      { en: 'A sprawling underground base carved into cave walls — organized storage rooms for each ore type, a farm section with glowing mushrooms under artificial light, and a central crafting hall with every workstation unlocked', zh: '一个雕刻在洞穴壁中的庞大地下基地——每种矿石都有组织良好的储藏室，有在人工光下发光蘑菇的农场区，以及拥有所有工作台的中央制作大厅', type: 'keeper' },
      { en: 'A colorful alien farm settlement — crop fields in neat rows, a mech hangar where I upgrade and paint my robot, decorative alien plants I found in the world, and a viewing platform overlooking the orange sunset of another planet', zh: '一个色彩缤纷的外星农场定居点——整齐成排的农田、我升级和涂装机器人的机甲机库、我在世界中发现的装饰性外星植物，以及俯瞰另一个星球橙色日落的观景台', type: 'frontier' },
      { en: 'A fortified compound in an acorn — built inside or around a huge acorn structure in the backyard, with walls to keep insects out, a garden for growing mushrooms, a lab for analyzing new materials, and ziplines connecting it all', zh: '橡子里的防御营地——在后院巨大橡子结构内或周围建造，有阻挡昆虫的围墙、种植蘑菇的花园、分析新材料的实验室，以及连接一切的滑索', type: 'grounded' },
    ],
  },
  {
    q_en: 'Which post-session feeling sounds most satisfying?',
    q_zh: '哪种游玩后的感觉最令你满足？',
    options: [
      { en: 'I just discovered a story island with a new research note that advanced the game\'s mystery, and I picked up enough resources to add two new rooms to my raft — everything feels like it\'s growing toward something', zh: '我刚发现了一个有新研究笔记的故事岛，推进了游戏的谜题，我捡到了足够资源为木筏增加两个新房间——一切都感觉在向某个目标成长', type: 'raft' },
      { en: 'I just broke into a new biome below the Sunken Sea and found a new ore I\'ve never seen before — the fact that I still don\'t know what\'s down there is the most exciting thing about this game', zh: '我刚突破到沉没之海下方的新生物群落，发现了我从未见过的新矿石——我仍然不知道下面有什么，这是这款游戏最令人兴奋的事情', type: 'keeper' },
      { en: 'My mech just got a new upgrade that lets me access the third biome, my crop fields are automatically harvesting, and the alien settlement genuinely looks beautiful in the setting sun — survival never felt this cozy', zh: '我的机甲刚获得了可以进入第三个生物群落的新升级，我的农田自动收割，外星定居点在夕阳下看起来真的很美——生存从来没有感觉这么温馨', type: 'frontier' },
      { en: 'My group just defeated the Broodmother spider boss — it was genuinely tense and we each had a specific role that made the win feel collective; the Black Widow armor set we\'re all now crafting feels like a reward worth fighting for', zh: '我的小队刚击败了蜘蛛女王 Boss——这真的很紧张，我们每个人都有使胜利感觉集体的特定角色；我们现在都在制作的黑寡妇护甲套装感觉是值得为之战斗的奖励', type: 'grounded' },
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
  raft: {
    title_en: 'Raft',
    title_zh: 'Raft 木筏求生',
    emoji: '🌊',
    tag_en: 'Start with a tiny raft and a hook. Pull debris from the ocean. Build a floating home. Survive shark attacks. Follow story islands. This is the most cozy survival game on Steam.',
    tag_zh: '从一个小木筏和一把钩子开始。从海洋中捞起碎片。建造漂浮家园。在鲨鱼攻击中生存。追寻故事岛屿。这是 Steam 上最 Cozy 的生存游戏。',
    platform_en: 'Available on: PC (Steam) only — about $21. Supports 1-4 player online co-op. Overwhelmingly Positive on Steam.',
    platform_zh: '可在以下平台获取：仅 PC（Steam）——约 21 美元。支持 1-4 人在线合作。Steam 上压倒性好评。',
    why_en:
      "Raft (2022, Redbeet Interactive) is a survival game that has a uniquely cozy heart despite its survival genre label. You start on a 4×4 raft in the middle of the ocean with a hook on a rope — the entire game begins from this single mechanic of swinging the hook to catch floating debris. Everything you build (floors, walls, storage, engines, cooking stations, water purifiers) is made from materials caught in the ocean or found on islands you encounter. The game has a full story mode with mystery islands that advance a narrative about what happened to the civilization before the flood. Building your raft is deeply satisfying: you can design it any way you choose, decorate it with furniture and paint, and watch it transform from a desperate escape platform into something genuinely beautiful. Dangers are present but manageable: the shark attacks the raft on a timer, but shark bait can redirect it, and you can build ahead of any threat. The game supports 1-4 online co-op with seamless join/leave. It is exclusively on PC (Steam), runs on almost any hardware, and costs about $21. Overwhelmingly Positive on Steam from 200,000+ reviews. Main story runs 30-40 hours; open-ended survival continues indefinitely afterward.",
    why_zh:
      'Raft（2022 年，Redbeet Interactive）是一款具有独特温馨核心的生存游戏，尽管其类型标签是生存。你从一个 4×4 的海洋中央木筏开始，手里只有一根绳子和一个钩子——整个游戏从这个单一的摆动钩子捕捉漂浮碎片的机制开始。你建造的一切（地板、墙壁、储藏、发动机、烹饪台、净水器）都由从海洋中捕获或在遭遇的岛屿上找到的材料制成。游戏有完整的故事模式，带有谜题岛屿，推进关于洪水前文明发生了什么的叙事。建造木筏非常令人满足：你可以任意设计，用家具和油漆装饰，看着它从绝望的逃生平台变成真正美丽的东西。Steam 压倒性好评，20 万以上评价。',
    tip_en: "Prioritize the Water Purifier and Cooking Pot before anything else — thirst and hunger kill faster than sharks. Build Shark Bait from Rope and Herring to redirect the shark during mining trips to islands. The Antenna is the most important mid-game crafting goal: it receives story radio signals and lets you navigate to new story islands. If playing co-op, designate one person as the main hook-thrower in early game — a rhythm develops naturally. The Chapter 3 story islands have some combat; ensure everyone has a Machete or bow before proceeding.",
    tip_zh: '在其他任何事情之前优先制作净水器和烹饪锅——口渴和饥饿比鲨鱼杀死你更快。用绳子和鲱鱼制作鲨鱼诱饵，在采矿岛屿之行期间转移鲨鱼。天线是游戏中期最重要的制作目标：它接收故事广播信号并让你导航到新的故事岛屿。如果合作游玩，在游戏早期指定一个人作为主要钩手——节奏会自然形成。第 3 章故事岛屿有一些战斗；确保每个人在继续之前都有弯刀或弓。',
  },
  keeper: {
    title_en: 'Core Keeper',
    title_zh: '核心守护者',
    emoji: '⛏️',
    tag_en: 'A cozy top-down mining and farming survival game — dig underground, discover ancient biomes, grow mushroom farms, fight rare bosses, and unlock the secrets of a glowing ancient Core',
    tag_zh: '一款温馨的俯视角挖掘和农业生存游戏——挖掘地下、发现古老生物群落、种植蘑菇农场、击败稀有 Boss，并解锁发光古代核心的秘密',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation, Xbox — about $17. Supports 1-8 player online co-op.',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation、Xbox——约 17 美元。支持 1-8 人在线合作。',
    why_en:
      "Core Keeper (2024 full release, Pugstorm) is the most Stardew Valley-adjacent survival game on this list — a top-down game that combines Terraria-style underground mining with farming and base building in a world that expands the further you dig. You wake up in an underground cavern beside a dormant ancient Core that illuminates the starting area. Everything you do radiates outward from this Core: you dig tunnels into the dark, discover biomes (a glowing mushroom forest, an ancient civilization's ruins, a crystalline ice region), fight biome-specific bosses for their materials, and bring those materials back to craft new gear and expand your base farm. The farming system — growing mushrooms, carrots, wheat, and stranger things under artificial light — is genuinely cozy and feels like Stardew Valley underground. The game is fully cross-platform with 1-8 online co-op and runs on Switch, so it is accessible to people who don't have a gaming PC. Custom difficulty lets you reduce enemy aggression for a more relaxed experience. Main story content (defeating all major bosses) runs 30-50 hours; open-ended building continues indefinitely. Metacritic 79 on PC.",
    why_zh:
      '核心守护者（2024 年完整版，Pugstorm）是这个列表中最接近星露谷物语的生存游戏——一款将泰拉瑞亚风格的地下挖掘与农业和基地建设结合在不断扩展的世界中的俯视角游戏。你醒来在一个发光的古代核心旁边的地下洞穴中。你做的一切都从这个核心向外辐射：你挖掘隧道进入黑暗，发现生物群落（发光蘑菇森林、古代文明遗迹、水晶冰川区域），为它们的材料与生物群落特定的 Boss 战斗，并将这些材料带回来制作新装备并扩大你的基地农场。跨平台，1-8 人在线合作。',
    tip_en: "Carry a torch at all times — darkness reduces movement speed. The first three bosses (Glurch, Ghorm, Hive Mother) can be defeated in any order and each drops a Relic Shard; after defeating all three, the Core activates and opens new story content. Farm mushrooms early: Bomb Pepper Mushroom is the best early food. Place your base farm as close to the Core as possible since it's the natural gathering point for all resources. In multiplayer, assign someone to farm while others explore — the game's resource flow supports this division naturally.",
    tip_zh: '随时携带火炬——黑暗会降低移动速度。前三个 Boss（格鲁奇、格鲁姆、蜂巢母亲）可以按任意顺序击败，每个都会掉落遗迹碎片；击败全部三个后，核心激活并开放新的故事内容。早期种植蘑菇：炸弹辣椒蘑菇是最好的早期食物。尽量将基地农场放在靠近核心的地方，因为它是所有资源的自然聚集点。在多人游戏中，指定一人负责农场而其他人探索——游戏的资源流自然支持这种分工。',
  },
  frontier: {
    title_en: 'Lightyear Frontier',
    title_zh: '光年边疆',
    emoji: '🤖',
    tag_en: 'The most cozy survival game on this list — pilot a giant mech on an alien planet, grow crops, build a colorful settlement, and fight plant-based threats at your own pace with zero pressure',
    tag_zh: '这个列表中最 Cozy 的生存游戏——在外星球上驾驶巨型机甲、种植农作物、建造色彩缤纷的定居点，并以自己的节奏对抗植物威胁，零压力',
    platform_en: 'Available on: PC (Steam), Xbox (Game Pass) — about $30. Game Pass included. Supports 1-4 player online co-op.',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox（Game Pass）——约 30 美元。Game Pass 包含。支持 1-4 人在线合作。',
    why_en:
      "Lightyear Frontier (2024, Frame Break) is the farming game–survival game hybrid that most closely matches what a Stardew Valley player would want from the survival genre. You pilot a customizable mech on a vibrant alien planet — and that mech is your primary tool for everything: it harvests crops, gathers resources, waters the fields, and fights the game's enemies (alien plant corruptions that spread if left unchecked). The mech absorbs almost all damage, so the game never feels punishing — you repair it between missions and eventually upgrade it with new arms and capabilities. The settlement building loop is pure cozy farming: tend your crops, build new structures, discover alien seeds, plant them, and watch your colony grow. The alien planet is genuinely beautiful — a watercolor alien world with warm sunsets and strange flora. Game Pass included (so free with a subscription), and co-op supports 1-4 players seamlessly. The game is in its 1.0 release with ongoing updates. If you loved Stardew Valley but wanted mechs, aliens, and a survival framing, this is the closest thing that exists.",
    why_zh:
      '光年边疆（2024 年，Frame Break）是最接近星露谷物语玩家想要的生存类型的农场游戏—生存游戏混合体。你在充满活力的外星球上驾驶可定制的机甲——那台机甲是你一切的主要工具：它收割农作物、收集资源、给田地浇水，并与游戏的敌人（如果不加以控制会蔓延的外星植物腐败）战斗。机甲吸收几乎所有伤害，所以游戏从不感到惩罚性——你在任务之间修复它，最终用新臂膀和能力升级它。Game Pass 包含，合作支持 1-4 人。如果你喜欢星露谷物语但想要机甲、外星人和生存框架，这是最接近的存在。',
    tip_en: "Your mech's vacuum arm (resource gathering) is more important than the combat arm early on — upgrade it first to speed up harvesting. Clearing alien corruption slowly expands your safe build zone; prioritize clearing the area around your settlement before exploring further. Water your crops daily; a Water Condenser (automatically harvests atmospheric water) is the highest-priority quality-of-life upgrade. In co-op, one player can farm while another explores in their mech — the resources are shared across the settlement. The game has seasonal weather events that change which crops grow best; pay attention to the planetary weather forecast.",
    tip_zh: '你机甲的真空臂（资源收集）在早期比战斗臂更重要——先升级它以加快收割速度。清理外星腐败慢慢扩大你的安全建造区域；在进一步探索之前，优先清理定居点周围的区域。每天给你的作物浇水；水分凝结器（自动从大气中收集水分）是最高优先级的生活质量升级。在合作中，一名玩家可以在农场工作，而另一名在他们的机甲中探索——资源在定居点中共享。游戏有改变最佳农作物的季节性天气事件；注意行星天气预报。',
  },
  grounded: {
    title_en: 'Grounded',
    title_zh: '缩小与生存',
    emoji: '🐛',
    tag_en: 'Survive in a backyard the size of a world — you\'re shrunk to the size of a pebble among blades of grass, giant spiders, and everyday objects that become epic landmarks in your survival story',
    tag_zh: '在世界大小的后院生存——你缩小到小石子的大小，在草叶间、巨型蜘蛛中，以及在你生存故事中成为史诗地标的日常物品旁挣扎求生',
    platform_en: 'Available on: PC (Steam), Xbox — about $40. Included in Xbox Game Pass. Supports 1-4 player online co-op.',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox——约 40 美元。包含在 Xbox Game Pass 中。支持 1-4 人在线合作。',
    why_en:
      "Grounded (2022, Obsidian Entertainment) is one of the most acclaimed survival games of its generation — a 4-player co-op survival game where you are shrunk to the size of a pebble in a suburban backyard and must survive among insects that are now the size of buildings. The game is set in a fixed, handcrafted world (not procedurally generated): a backyard with specific landmarks — a hedge maze, an oak tree, a pond, a sandbox, a koi pond — each of which has its own ecosystem of insects, resources, and hazards. Gear progression is insect-based: you kill a particular insect type, analyze its parts at a Field Station, and unlock the armor and weapons crafted from those parts. The backyard storytelling — audio logs from scientists who were shrunk before you — gives the game a narrative backbone that feels surprisingly substantial for a survival game. Obsidian developed it, so the writing quality is noticeably above the genre average. Game Pass included (free with subscription), making the price of entry very accessible. Metacritic 80 on PC. 1-4 online co-op. Note: the spider enemies are among the most realistic and frightening insects in gaming — there is a 'Arachnophobia Mode' that replaces them with less realistic models.",
    why_zh:
      '缩小与生存（2022 年，Obsidian Entertainment）是其一代最受好评的生存游戏之一——一款 4 人合作生存游戏，你被缩小到郊区后院的小石子大小，必须在现在与建筑物同等大小的昆虫中生存。游戏设定在一个固定的手工制作世界（非程序生成）：一个有特定地标的后院——树篱迷宫、橡树、池塘、沙箱、锦鲤池——每个都有自己的昆虫、资源和危险生态系统。装备进度基于昆虫：你击败特定昆虫类型，在现场站分析其部件，解锁用那些部件制作的护甲和武器。Game Pass 包含，支持 1-4 人在线合作。Metacritic PC 80 分。注意：游戏有蜘蛛恐惧症模式，将蜘蛛替换为不那么写实的模型。',
    tip_en: "Turn on Arachnophobia Mode immediately if spiders bother you — it makes all spiders look like abstract blobs without reducing gameplay. The first base location matters: build near the Oak Tree for access to Acorn shells (essential crafting material) and above the ground where most insects can't follow. Analyze every creature part and plant at the Field Station — many items are locked behind analyses you didn't know you needed. Clover leaves are the single most important early resource (they craft into the first-tier armor). In co-op, the most effective division is: two fighters, one builder, one resource runner — but don't enforce roles, let them emerge naturally.",
    tip_zh: '如果蜘蛛让你困扰，立即开启蜘蛛恐惧症模式——它使所有蜘蛛看起来像抽象的斑点，而不降低游戏性。第一个基地位置很重要：在橡树附近建造，以获取橡子壳（必要的制作材料），并建在大多数昆虫无法跟随的地面上方。在现场站分析每一个生物部件和植物——许多物品需要你不知道需要的分析才能解锁。三叶草叶子是最重要的早期资源（它们制作成第一级护甲）。在合作中，最有效的分工是：两个战士、一个建造者、一个资源运输者——但不要强制分工，让它们自然出现。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { raft: 0, keeper: 0, frontier: 0, grounded: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozySurvivalGamesQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-survival-games-quiz`
    const shareText = isZh
      ? `Cozy 生存游戏推荐结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My cozy survival game recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
          {isZh ? '哪款生存游戏最适合 Cozy 玩家？' : 'Which Survival Game Is Right for Cozy Gamers?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从 Raft、核心守护者、光年边疆、缩小与生存中找到你的完美生存游戏'
            : '6 questions to match you with Raft, Core Keeper, Lightyear Frontier, or Grounded'}
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
        {isZh ? '找到我的生存游戏' : 'Find My Survival Game'}
      </button>
    </div>
  )
}
