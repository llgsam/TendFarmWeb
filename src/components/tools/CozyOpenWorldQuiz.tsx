'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'nms' | 'terraria' | 'astroneer' | 'subnautica'

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
    q_en: 'What draws you most about a bigger open world?',
    q_zh: '更广阔的开放世界中，什么最吸引你？',
    options: [
      { en: 'Visiting an effectively infinite number of alien planets, each with different biomes, creatures, and resources — a universe I could never fully see', zh: '探访数量近乎无限的外星星球，每个都有不同的生态系统、生物和资源——一个我永远无法完全游历的宇宙', type: 'nms' },
      { en: 'Digging deeper and deeper into the earth, uncovering layer after layer of a world packed with secrets, ores, and increasingly dangerous creatures', zh: '越挖越深入地下，一层一层揭开一个充满秘密、矿石和越来越危险生物的世界', type: 'terraria' },
      { en: 'Building charming bases on colorful alien planets using a satisfying snap-together construction system, with minimal survival pressure', zh: '使用令人满足的拼接建造系统在多彩的外星星球上建造迷人的基地，生存压力极小', type: 'astroneer' },
      { en: 'Exploring a deep ocean mystery while managing my oxygen and food, piecing together what happened and what lives in the dark below', zh: '在管理氧气和食物的同时探索深海谜题，拼凑出发生了什么以及黑暗深处住着什么', type: 'subnautica' },
    ],
  },
  {
    q_en: 'How much challenge do you want the game to offer?',
    q_zh: '你希望游戏提供多大程度的挑战？',
    options: [
      { en: 'Fully adjustable — I can set difficulty to pure exploration with no survival pressure, or add challenge if I want it', zh: '完全可调节——我可以将难度设置为纯粹探索，不需要生存压力，或者在想要时增加挑战', type: 'nms' },
      { en: 'Moderate to high — I want meaningful combat encounters and a progression of bosses that actually test my skill and preparation', zh: '中等到高——我想要有意义的战斗遭遇和真正测试我技巧和准备程度的 Boss 进展', type: 'terraria' },
      { en: 'Low to moderate — I want a satisfying sense of progress without the game punishing me for mistakes', zh: '低到中等——我想要满足的进步感，而不是游戏因我的错误惩罚我', type: 'astroneer' },
      { en: 'Tension is exactly right — I want the unknown to feel genuinely threatening, with moments of real fear mixed into the exploration', zh: '张力恰到好处——我希望未知感觉真正具有威胁性，探索中混入真实的恐惧时刻', type: 'subnautica' },
    ],
  },
  {
    q_en: 'Which type of world depth appeals to you most?',
    q_zh: '哪种世界深度对你最有吸引力？',
    options: [
      { en: 'Horizontal infinity — I want more planets than I could ever visit, each one a new scene to discover and photograph', zh: '水平无限——我想要比我能游历的更多的星球，每一个都是要发现和拍照的新场景', type: 'nms' },
      { en: 'Vertical depth in one world — I want to mine from the surface to the bottom of the world and find entirely different environments at each depth level', zh: '单个世界的垂直深度——我想从地表挖到世界底部，在每个深度层次发现完全不同的环境', type: 'terraria' },
      { en: 'Both, gently — I want to explore in any direction without feeling overwhelmed, with the planet itself being charming regardless of which way I go', zh: '两者兼有，但温和——我想向任何方向探索而不感到不知所措，星球本身无论我往哪里走都很迷人', type: 'astroneer' },
      { en: 'Downward into the dark — the deeper I go in the ocean, the stranger and more beautiful things become, and that tension is exactly what I want', zh: '向下进入黑暗——在海洋中越深，事物变得越奇异和美丽，这种张力正是我想要的', type: 'subnautica' },
    ],
  },
  {
    q_en: 'Which visual world sounds most appealing to you?',
    q_zh: '哪个视觉世界对你最有吸引力？',
    options: [
      { en: 'Painterly alien landscapes in vivid colors — sci-fi concept art brought to life, with unique flora, fauna, and atmospheric conditions on each planet', zh: '鲜艳色彩的绘画风格外星景观——科幻概念艺术活现，每个星球都有独特的植物、动物和大气条件', type: 'nms' },
      { en: 'A pixel-art world packed with environmental storytelling — especially underground, where each biome has its own tile set, creatures, and musical theme', zh: '充满环境叙事的像素艺术世界——尤其是地下，每个生物群落都有自己的瓦片组、生物和音乐主题', type: 'terraria' },
      { en: 'A colorful, rounded cartoon aesthetic where alien minerals look like giant gummy candies and the planet surface glows with soft, inviting colors', zh: '多彩圆润的卡通美学，外星矿物看起来像巨大的软糖，星球表面发着柔和迷人的光芒', type: 'astroneer' },
      { en: 'An underwater world where bioluminescent creatures light the darkness, coral formations create alien cathedrals, and every descent reveals something I have never seen', zh: '一个生物发光生物照亮黑暗的水下世界，珊瑚形成外星大教堂，每次下潜都揭示我从未见过的东西', type: 'subnautica' },
    ],
  },
  {
    q_en: 'What is your relationship with building bases in games?',
    q_zh: '你与游戏中建造基地的关系是什么？',
    options: [
      { en: 'I want to build a home base on one planet and then use it as a staging point to explore dozens of others — the base is part of a larger journey', zh: '我想在一个星球上建立家园基地，然后用它作为探索数十个其他星球的起点——基地是更大旅程的一部分', type: 'nms' },
      { en: 'I want building to be a significant mechanic — crafting specific weapons and equipment for specific boss encounters, with gear progression throughout', zh: '我希望建造是一个重要机制——为特定 Boss 遭遇精心制作特定武器和装备，贯穿全程的装备进展', type: 'terraria' },
      { en: 'Base-building is my favorite part — connecting modules, printing tools, and watching my outpost grow is the core loop I want to keep returning to', zh: '建造基地是我最喜欢的部分——连接模块、打印工具、看着我的前哨站成长是我想不断回味的核心循环', type: 'astroneer' },
      { en: 'Building an underwater habitat is deeply satisfying — placing rooms underwater and watching the sea life swim past my windows feels magical', zh: '建造水下栖息地非常令人满足——在水下放置房间，看着海洋生物从我的窗户游过，感觉像是魔法', type: 'subnautica' },
    ],
  },
  {
    q_en: 'Which "first hour" scenario sounds most exciting to you?',
    q_zh: '哪个"游戏第一小时"的场景听起来最令你兴奋？',
    options: [
      { en: 'Arriving on an alien planet, scanning local wildlife for the catalogue, finding rare resources, building a launch pad, and flying to a completely different planet to start again', zh: '降落在外星星球上，为目录扫描当地野生动物，找到稀有资源，建造发射台，飞向一个完全不同的星球重新开始', type: 'nms' },
      { en: 'Punching trees, smelting my first ores, building a shelter before night falls, venturing into a cave, and discovering a chest with an item I do not yet understand', zh: '砍树、冶炼第一批矿石、在夜幕降临前建造庇护所、冒险进入洞穴，发现一个装有我还不理解的物品的箱子', type: 'terraria' },
      { en: 'Landing on a colorful planet, using my terrain tool to gather resin, printing my first backpack upgrade, and connecting my base to a power source for the first time', zh: '降落在一个多彩的星球上，使用地形工具收集树脂，打印我的第一个背包升级，第一次将基地连接到电源', type: 'astroneer' },
      { en: 'Waking up in a crashed escape pod surrounded by shallow ocean, swimming out to discover a nearby reef, and seeing something enormous pass in the distance below me', zh: '在浅海包围的失事逃生舱中醒来，游出去发现附近的礁石，看到某个巨大的东西从我下方的远处经过', type: 'subnautica' },
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
  nms: {
    title_en: 'No Man\'s Sky',
    title_zh: '无人深空',
    emoji: '🚀',
    tag_en: 'An infinite universe of alien planets — land anywhere, scan and catalogue every creature, build bases across multiple worlds, and never run out of things to discover',
    tag_zh: '无限外星星球宇宙——降落在任何地方、扫描并分类每一种生物、在多个世界建造基地，永远不会用尽可以发现的事物',
    platform_en: 'Available on: PC (Steam, GOG), PS4, PS5, Xbox, Game Pass, Nintendo Switch (2024), Apple VR — about $60. Regular deep sales to $15. Free on Game Pass.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、PS4、PS5、Xbox、Game Pass、Nintendo Switch（2024 年）、Apple VR——约 60 美元。定期大促销至 15 美元。Game Pass 免费。',
    why_en:
      "No Man's Sky (2016, massively updated through 2024) is one of the most remarkable redemption stories in gaming — a game that launched to widespread disappointment and was rebuilt over years of free updates into one of the most generous and content-rich sandbox experiences available. You play as a traveler in a procedurally generated universe of 18 quintillion unique planets, each with their own biomes, flora, fauna, and resources. The game can be played in pure exploration mode (no survival pressure) or with full survival mechanics. The loop involves scanning and uploading discoveries for credits, mining resources, trading with space stations, building increasingly elaborate multi-planet bases, and following any of several story threads or faction questlines. The visual style — painterly alien vistas in vivid colors — is constantly stunning. For cozy game players specifically: the difficulty is fully adjustable, all updates have been free, there is a rich co-op system for playing with friends, and the Nintendo Switch version (2024) means you can play it in handheld mode. The community is one of the most positive in gaming. Available on Game Pass. One of the best value games ever released.",
    why_zh:
      '无人深空（2016 年，通过 2024 年大幅更新）是游戏史上最非凡的救赎故事之一——一款以广泛失望开局并通过多年免费更新重建为最慷慨、内容最丰富的沙盒体验之一的游戏。你扮演一个在程序生成的 18 亿亿个独特星球宇宙中的旅行者，每个都有自己的生态系统、植物、动物和资源。游戏可以纯探索模式（无生存压力）或带有完整生存机制的方式游玩。循环包括扫描和上传发现以获取货币、挖掘资源、与空间站交易、建造越来越精心的多星球基地，以及跟随几条故事线或派系任务线。视觉风格——鲜艳色彩的绘画风格外星景观——持续令人惊叹。对于 Cozy 游戏玩家：难度完全可调节，所有更新都是免费的，有丰富的合作系统可以与朋友一起玩，2024 年的 Nintendo Switch 版本意味着你可以在手持模式下游玩。该社区是游戏界最积极的社区之一。Game Pass 上可用。',
    tip_en: "Start on Creative or Relaxed mode if you just want to explore — you can always change difficulty later. Your first priority should be fixing your ship, then reaching the space station. Talk to every alien NPC you meet; learning three alien words per species unlocks dialogue options, and the languages are a persistent feature across all playthroughs.",
    tip_zh: '如果你只是想探索，从创意或轻松模式开始——你可以随时更改难度。你的第一个优先级应该是修好你的飞船，然后到达空间站。与你遇到的每个外星 NPC 交谈；每个物种学习三个外星词汇可以解锁对话选项，而这些语言是所有游玩过程中持续存在的特性。',
  },
  terraria: {
    title_en: 'Terraria',
    title_zh: '泰拉瑞亚',
    emoji: '⛏️',
    tag_en: 'A 2D pixel-art world of infinite vertical depth — mine, build, craft, and fight your way through a hand-designed progression of biomes and bosses that gets richer the deeper you go',
    tag_zh: '一个具有无限垂直深度的 2D 像素艺术世界——挖掘、建造、制作和战斗，穿越一个手工设计的生物群落和 Boss 进展，越深入越丰富',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox, Mobile — about $10 on PC. Frequently on sale for $2.50.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、手机——PC 上约 10 美元。经常以 2.5 美元促销。',
    why_en:
      "Terraria (2011, massively updated through 2022) is one of the greatest value propositions in gaming — a $10 game (regularly $2.50 on sale) with over 5,000 items, 30+ bosses, multiple biomes, and hundreds of hours of content that has sold over 58 million copies across all platforms. The 2D pixel-art world starts gentle: build a shelter, mine basic ores, defeat your first bosses. But going deeper unlocks increasingly strange and rich environments — the Underground Jungle, the Cavern, the Underworld — each with unique enemies, materials, and building blocks. The game rewards curiosity and preparation: you research what you need to defeat the next boss, craft the right weapons, and descend with a plan. For cozy game players who want more challenge than farming games offer: Terraria's combat is action-based (not turn-based) but never unfairly difficult if you have the right gear. The building system is as deep as any creative sandbox. The progression system has a clear arc from 'exploring the surface' to 'defeating a God-tier end-game boss.' One of the most-played games of all time; the community is enormous and helpful. Best played with friends but excellent solo.",
    why_zh:
      '泰拉瑞亚（2011 年，通过 2022 年大幅更新）是游戏史上最高性价比的游戏之一——一款 10 美元（促销时经常 2.5 美元）的游戏，拥有超过 5,000 个物品、30+ 个 Boss、多个生物群落和数百小时的内容，在所有平台上销售超过 5,800 万份。2D 像素艺术世界开始温和：建造庇护所、挖掘基础矿石、击败第一批 Boss。但越深入越能解锁越来越奇异丰富的环境——地下丛林、洞穴、地下世界——每个都有独特的敌人、材料和建筑模块。游戏奖励好奇心和准备：你研究击败下一个 Boss 需要什么，制作正确的武器，有计划地下降。对于想要比农场游戏更多挑战的 Cozy 游戏玩家：泰拉瑞亚的战斗是动作性的（非回合制），但如果你有正确的装备就从来不会不公平地困难。建造系统和任何创意沙盒一样深度。进展系统有清晰的弧线，从"探索地表"到"击败神级终局 Boss"。',
    tip_en: "Build a starter house for the Guide NPC first — he tells you what items you can craft from your current materials. Before your first Blood Moon or invasion event, dig a tunnel with lava traps and watch enemies fall in. Build vertically; your best ores are always deeper than you think.",
    tip_zh: '首先为向导 NPC 建造一个起始房屋——他会告诉你可以用当前材料制作什么物品。在你第一次血月或入侵事件之前，挖一个带熔岩陷阱的隧道，看着敌人掉进去。垂直建造；你最好的矿石总是比你想象的更深。',
  },
  astroneer: {
    title_en: 'Astroneer',
    title_zh: 'Astroneer',
    emoji: '🌍',
    tag_en: 'A cozy space exploration and base-building game with a delightful cartoon aesthetic — print tools, connect base modules, and explore colorful alien planets with virtually no combat',
    tag_zh: '一款拥有令人愉悦卡通美学的 Cozy 太空探索和基地建造游戏——打印工具、连接基地模块，探索彩色外星星球，几乎没有战斗',
    platform_en: 'Available on: PC (Steam), Xbox Series X/S, PS4, PS5, Nintendo Switch, Xbox Game Pass — about $30',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox Series X/S、PS4、PS5、Nintendo Switch、Xbox Game Pass——约 30 美元',
    why_en:
      "Astroneer (2019) is the most cozy space exploration game ever made — a sandbox where you play as an astronaut on a spacefaring mission of resource extraction and base-building, but at a pace and pressure level that cozy game players will immediately recognize and appreciate. The visual aesthetic is its most immediately recognizable quality: every alien mineral, creature, and environmental element is rendered in a rounded, candy-colored cartoon style that makes even unfamiliar planets feel warm and inviting. The core loop involves using your terrain tool to extract resources, running them through a soil centrifuge or printer to create equipment, and gradually building an increasingly elaborate base with power networks, research modules, trade platforms, and vehicle bays. There is combat (aerial creatures called Floran, and environmental hazards called Flora) but it is minimal and avoidable on many planets. The game is especially excellent in co-op: up to four players can share a planet, build together, and watch the base grow. A companion to the cozy genre without being a farming game — it delivers the same sense of daily routine and incremental progress but in a space context.",
    why_zh:
      'Astroneer（2019 年）是有史以来最 Cozy 的太空探索游戏——一款你扮演执行资源提取和基地建造任务的宇航员的沙盒，但以 Cozy 游戏玩家会立即认可和欣赏的节奏和压力水平进行。视觉美学是其最直接可识别的品质：每个外星矿物、生物和环境元素都以圆润的糖果色卡通风格呈现，使即使是陌生的星球也感觉温暖迷人。核心循环包括使用地形工具提取资源，通过土壤离心机或打印机将其转化为设备，并逐渐建造一个配备电力网络、研究模块、贸易平台和车辆库的越来越精心的基地。有战斗（称为 Floran 的空中生物，以及称为 Flora 的环境危险），但在许多星球上是最少的且可以避免的。游戏在合作模式下特别出色：最多四名玩家可以共享一个星球、一起建造并看着基地成长。',
    tip_en: "Power management is the key skill to learn early — everything needs power, and running out mid-operation is frustrating. Place a Small Solar Panel and a Small Battery near every building from the start. Your terrain tool can also fill in holes and flatten ground — use it to build roads between your structures for a more organized base.",
    tip_zh: '电力管理是早期需要学习的关键技能——一切都需要电力，在操作途中耗尽电力令人沮丧。从一开始就在每座建筑附近放置小型太阳能板和小型电池。你的地形工具也可以填补洞穴和平整地面——用它在你的建筑之间建造道路，让基地更有组织。',
  },
  subnautica: {
    title_en: 'Subnautica',
    title_zh: 'Subnautica',
    emoji: '🌊',
    tag_en: 'Crash-land on an alien ocean planet and build your way to the bottom — a survival exploration game where every depth level reveals new creatures, biomes, and pieces of a mystery about what happened here',
    tag_zh: '坠落在一个外星海洋星球上，向底部建造你的出路——一款生存探索游戏，每个深度层次都揭示新的生物、生态系统和关于这里发生了什么的谜题',
    platform_en: 'Available on: PC (Steam, Epic), PS4, PS5, Xbox, Nintendo Switch — about $30. Subnautica: Below Zero is the standalone sequel (~$30).',
    platform_zh: '可在以下平台获取：PC（Steam、Epic）、PS4、PS5、Xbox、Nintendo Switch——约 30 美元。Subnautica: Below Zero 是独立续作（约 30 美元）。',
    why_en:
      "Subnautica (2018) is one of the most uniquely affecting games ever made — a survival exploration game set entirely underwater on an alien ocean planet where your escape pod has crashed. The premise sounds stressful, but Subnautica is genuinely beautiful: the ocean is populated with alien coral formations, bioluminescent creatures, kelp forests, and deep-sea trenches that become more extraordinary the further you descend. The core loop is: gather resources near the surface, craft better equipment, descend deeper, discover new biomes, gather rarer resources, build your underwater habitat, and piece together the story of what destroyed your ship and what civilization came before. The game has tense moments (sea monsters that patrol the deeper zones are genuinely threatening) but the aesthetic and sound design are consistently serene between encounters. For cozy game players: the harvesting loop (scan plants, gather materials, craft items) will feel immediately familiar; the underwater habitat building is deeply satisfying; and the story discovery is as rewarding as the exploration. A truly one-of-a-kind game. Subnautica: Below Zero (2021) is a shorter standalone sequel with the same systems but set in an arctic environment.",
    why_zh:
      'Subnautica（2018 年）是有史以来最具独特感染力的游戏之一——一款完全发生在外星海洋星球水下的生存探索游戏，你的逃生舱在那里坠毁。前提听起来很有压力，但 Subnautica 是真正美丽的：海洋中有外星珊瑚形成物、生物发光生物、海带森林和深海沟壑，越深入就越非凡。核心循环是：在地表附近收集资源、制作更好的装备、更深地下降、发现新的生态系统、收集更稀有的资源、建造你的水下栖息地，并拼凑出摧毁你的飞船和之前的文明发生了什么的故事。游戏有紧张时刻（巡逻深区的海怪是真正具有威胁性的），但美学和音效设计在遭遇之间始终保持平静。对于 Cozy 游戏玩家：收割循环（扫描植物、收集材料、制作物品）会立即让人感到熟悉；水下栖息地建造非常令人满足；故事发现和探索一样有价值。一款真正独一无二的游戏。',
    tip_en: "Mark your escape pod with a beacon immediately — losing it in the open ocean is your first lesson. Build a Scanner Room early and let it continuously map nearby resources. When you hear the Reaper Leviathan roar, swim in the opposite direction. The story progression is gated by depth; when you feel stuck, go deeper.",
    tip_zh: '立即给你的逃生舱贴上信标标记——在开阔海洋中失去它是你的第一课。尽早建造扫描仪室，让它持续映射附近的资源。当你听到收割者利维坦的吼叫时，向相反方向游去。故事进展由深度控制；当你感到困顿时，更深地下降。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { nms: 0, terraria: 0, astroneer: 0, subnautica: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyOpenWorldQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-open-world-quiz`
    const shareText = isZh
      ? `农场游戏玩家的下一片星空测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My open-world exploration game for farming game fans: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
          {isZh
            ? '农场游戏玩家的下一片星空：哪款开放世界最适合你？'
            : 'Beyond the Farm: Which Open-World Exploration Game Is Right for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从无人深空、泰拉瑞亚、Astroneer、Subnautica 中找到你的下一个探索天地'
            : '6 questions to match you with No Man\'s Sky, Terraria, Astroneer, or Subnautica — bigger worlds for farming game fans'}
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
        {isZh ? '找到我的开放世界探索游戏' : 'Find My Open World Game'}
      </button>
    </div>
  )
}
