'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'octopath' | 'triangle' | 'xenoblade' | 'ryza'

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
    q_en: 'What draws you most to JRPGs?',
    q_zh: '你对 JRPG 最感兴趣的是什么？',
    options: [
      { en: 'Beautiful character stories — I want to follow 8 distinct protagonists through personal journeys that gradually weave into a shared epic, each with their own chapter arc', zh: '美丽的角色故事——我想跟随 8 位各具特色的主角经历个人旅程，这些旅程逐渐交织成一部共同史诗，每位都有自己的章节弧线', type: 'octopath' },
      { en: 'Political weight — I want to make decisions that shape which faction wins a war, with branching routes where my convictions determine the ending I see', zh: '政治分量——我想做出塑造哪个派系赢得战争的决定，在分支路线中，我的信念决定我看到的结局', type: 'triangle' },
      { en: 'Epic scope — I want a world so vast that after 150 hours I am still discovering new places, a story that wrestles with life and death, and a combat system that rewards mastery', zh: '史诗规模——我想要一个广阔到 150 小时后仍在发现新地方的世界、一个与生死博弈的故事，以及一个奖励精通的战斗系统', type: 'xenoblade' },
      { en: 'Cozy progression — I want a JRPG where the core loop feels like Stardew Valley\'s gathering and crafting: exploring fields for ingredients, discovering new recipes, and watching my alchemy tree grow', zh: '舒适的进展感——我想要一款核心循环感觉像星露谷采集和制作的 JRPG：在田野中寻找材料、发现新配方、看着我的炼金术树成长', type: 'ryza' },
    ],
  },
  {
    q_en: 'Which combat style appeals to you most?',
    q_zh: '哪种战斗风格最吸引你？',
    options: [
      { en: 'Classic turn-based with a twist — the Boost system lets me bank turns for burst damage, and every enemy has a Break mechanic I need to unlock to deal full damage', zh: '经典回合制加变体——Boost 系统让我积累回合以爆发伤害，每个敌人都有我需要解锁才能造成完整伤害的破盾机制', type: 'octopath' },
      { en: 'Tactical grid combat — positioning my units, considering terrain effects, managing conviction votes on moral dilemmas, and replaying maps to find the optimal formation', zh: '战术方格战斗——定位我的单位、考虑地形效果、管理道德困境上的信念投票，并重玩地图以找到最佳阵型', type: 'triangle' },
      { en: 'Deep real-time with combos — a system I am still learning new things about after 60 hours, where class-switching, blade combinations, and interlinking characters create layered strategic depth', zh: '深度实时连击——一个我 60 小时后仍在学习新事物的系统，职业切换、刀刃组合和角色连接创造多层战略深度', type: 'xenoblade' },
      { en: 'Alchemy puzzle combat — a system where I manage a crafting queue of items during battle, chaining effect tags to trigger bonus reactions without needing precise reflex timing', zh: '炼金谜题战斗——一个我在战斗中管理道具制作队列的系统，通过连接效果标签来触发奖励反应，不需要精确的反应时间', type: 'ryza' },
    ],
  },
  {
    q_en: 'How much time are you willing to invest?',
    q_zh: '你愿意投入多少时间？',
    options: [
      { en: '70-80 hours — enough to experience all 8 character stories and their convergence, with optional side content I can explore at my own pace without feeling like I am missing the ending', zh: '70-80 小时——足够体验所有 8 位角色故事及其汇聚，可选支线内容我可以按自己的节奏探索，不会感到错过结局', type: 'octopath' },
      { en: '30-50 hours — a focused, replayable JRPG experience where my first playthrough reveals one route and I can replay for different political outcomes and a true ending across multiple runs', zh: '30-50 小时——一个专注、可重玩的 JRPG 体验，第一次游玩揭示一条路线，我可以为不同的政治结果重玩，并在多次游玩中达到真正结局', type: 'triangle' },
      { en: '100-150+ hours — I want a JRPG that is its own complete world I can live in for months, where I never feel I have exhausted what the game has to offer', zh: '100-150+ 小时——我想要一款 JRPG，它是我可以在其中生活数月的完整世界，我永远不会感到穷尽游戏所提供的内容', type: 'xenoblade' },
      { en: '40-50 hours — a complete, satisfying JRPG at a reasonable length, with sequels available if I fall in love with the world and want more immediately after finishing', zh: '40-50 小时——一个长度合理的完整、令人满足的 JRPG，如果我爱上这个世界并在完成后立刻想要更多，续集已经可玩', type: 'ryza' },
    ],
  },
  {
    q_en: 'Which story tone appeals most?',
    q_zh: '哪种故事基调最吸引你？',
    options: [
      { en: 'Eight personal epics — each character has a hometown, a wound, and a destiny; some are dark (revenge, betrayal), some are warm (community, found family), none are identical', zh: '八部个人史诗——每位角色都有家乡、伤痛和命运；一些是黑暗的（复仇、背叛），一些是温暖的（社区、羁绊），没有两部相同', type: 'octopath' },
      { en: 'Political tragedy — a war where every faction believes it is right, and my choices about whom to trust and which ideals to uphold determine whether the ending is just or bittersweet', zh: '政治悲剧——一场每个派系都认为自己是正确的战争，我对信任谁以及坚持哪些理想的选择决定结局是公正的还是苦甜参半的', type: 'triangle' },
      { en: 'Philosophical epic — a story about the nature of life, death, and what it means to exist, told through the eyes of companions whose bond forms the emotional core of a 150-hour journey', zh: '哲学史诗——一个关于生死本质以及存在意义的故事，通过同伴的眼睛讲述，他们的羁绊构成 150 小时旅程的情感核心', type: 'xenoblade' },
      { en: 'Warm coming-of-age — teenagers in a small island town discover alchemy, explore ruins, and grow up together in a story that is sunny and cozy even when serious moments arise', zh: '温暖的成长故事——小岛镇上的青少年发现炼金术、探索遗迹，并在一个即使出现严肃时刻也阳光温馨的故事中共同成长', type: 'ryza' },
    ],
  },
  {
    q_en: 'What visual style sounds most appealing for long play sessions?',
    q_zh: '哪种视觉风格最适合长时间游玩？',
    options: [
      { en: 'HD-2D — a gorgeous hybrid of pixel art sprites and 3D environments that feels like a living watercolor painting, with each character\'s world having a distinct color palette and lighting style', zh: 'HD-2D——像素艺术精灵与 3D 环境的精美混合，感觉像活的水彩画，每位角色的世界都有独特的色彩调色板和光照风格', type: 'octopath' },
      { en: 'Clean tactical art — a deliberate, elegant visual style where the grid map reads clearly for strategy, illustrated character portraits tell emotional story beats, and every political decision is weighted by the art', zh: '清晰的战术艺术——刻意、优雅的视觉风格，方格地图清晰易读以进行战略，插图角色肖像讲述情感故事节拍，每个政治决定都由艺术加权', type: 'triangle' },
      { en: 'Spectacular open world — enormous vistas that stretch to the horizon, creatures that dwarf the player characters, and a world that feels genuinely alien despite being rich with life', zh: '壮观的开放世界——延伸至地平线的巨大全景、矮化玩家角色的生物，以及一个尽管充满生命力但感觉真正异域的世界', type: 'xenoblade' },
      { en: 'Warm anime aesthetic — summer afternoons, the smell of seawater, characters in casual clothes gathering herbs in sunlit fields — the most visually cozy JRPG on this list', zh: '温暖的动漫美学——夏日午后、海水的气味、穿着休闲服在阳光照耀的田野中采集草药的角色——这个列表中视觉上最 Cozy 的 JRPG', type: 'ryza' },
    ],
  },
  {
    q_en: 'Which post-session feeling sounds most satisfying?',
    q_zh: '哪种游玩后的感觉最令你满足？',
    options: [
      { en: 'I just completed Tressa\'s chapter arc and now I understand how her story connects to Ophilia\'s — the moment they interact in a crossed path event was exactly the reward I was waiting for', zh: '我刚完成 Tressa 的章节弧线，现在我明白她的故事如何与 Ophilia 的连接——他们在交叉路径事件中互动的那一刻正是我等待的回报', type: 'octopath' },
      { en: 'A pivotal vote just went in a direction I did not expect — my character gave the speech I wrote but the outcome surprised me, and now I am replaying from the chapter start to see what changes', zh: '一次关键投票以我没预料到的方向进行——我的角色发表了我写的演讲，但结果让我惊讶，现在我从章节开始重玩以查看有什么变化', type: 'triangle' },
      { en: 'I just unlocked a new area of the world and the scale of what lies ahead genuinely surprised me — 80 hours in and the game still has new biomes, combat mechanics, and companions to introduce', zh: '我刚解锁了世界的一个新区域，前方规模真的让我惊讶——80 小时后游戏仍有新的生物群落、战斗机制和同伴要介绍', type: 'xenoblade' },
      { en: 'I discovered a new alchemy synthesis chain and my item bag is now packed with upgraded consumables I made myself — the satisfaction of a perfect crafting session before a boss fight', zh: '我发现了一个新的炼金合成链，我的道具袋现在装满了我自己制作的升级消耗品——Boss 战前完美制作环节的满足感', type: 'ryza' },
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
  octopath: {
    title_en: 'Octopath Traveler II',
    title_zh: '歧路旅人 II',
    emoji: '🎭',
    tag_en: 'Eight protagonists with eight interwoven stories in a breathtaking HD-2D world — the sequel improves on every system in the beloved original, with a true convergent ending',
    tag_zh: '八位主角在令人叹为观止的 HD-2D 世界中交织的八个故事——续作在深受喜爱的原作的每个系统上都有改进，并有真正的汇聚结局',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, PS5 — about $60 new, often on sale for $30-40',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、PS5——新品约 60 美元，经常特价 30-40 美元',
    why_en:
      "Octopath Traveler II (2023) is Square Enix's follow-up to the beloved 2018 original — a turn-based JRPG featuring eight distinct protagonists (a merchant, a dancer, a thief, a scholar, a cleric, a hunter, an inventor, and an apothecary), each with their own story that begins separately and gradually intertwines. The HD-2D visual style — pixel art characters layered over 3D environments with gorgeous lighting — is one of the most distinctive art styles in modern gaming. The Boost-and-Break combat system is the series' signature: every enemy has weaknesses (fire, swords, bows, etc.) that you exploit to Break them, and then you spend stored Boost points for amplified attacks on a vulnerable target. The sequel significantly improves on the original: a true convergent story arc unites all eight characters in the final act, day/night cycles change which path abilities are usable, and every protagonist's storyline is notably better written. Metacritic approximately 87 on Switch. For cozy gamers from Stardew Valley who want their first JRPG: Octopath II's episodic structure means you can play one character's chapters when you have an hour, and it never punishes you for taking breaks.",
    why_zh:
      '歧路旅人 II（2023 年）是史克威尔艾尼克斯对备受喜爱的 2018 年原作的续作——一款回合制 JRPG，拥有八位各具特色的主角（商人、舞者、盗贼、学者、神官、猎人、发明家和药剂师），每人都有自己从分开到逐渐交织的故事。HD-2D 视觉风格——在具有华丽光照效果的 3D 环境上叠加像素艺术角色——是现代游戏中最独特的艺术风格之一。Boost 和破盾战斗系统是系列标志：每个敌人都有你利用来破盾的弱点，然后你在脆弱目标上花费积累的 Boost 点数进行增强攻击。续作在原作基础上显著改进：真正的汇聚故事弧线在最终章节联合所有八位角色，昼夜循环改变可用的路径技能，每位主角的故事线写作明显更好。Switch 版 Metacritic 约 87 分。',
    tip_en: "Start with Hikari (the warrior) or Throné (the thief) — they have the most immediately engaging storylines and teach the core combat mechanics well. Do not try to rush through all eight stories simultaneously; instead, focus on one character's chapters in a region before moving to the next, and only swap to other characters when you need to unlock their path skills for traversal. The night path skills (Throné's steal, Osvald's mug) are extremely useful — switch to nighttime in towns regularly.",
    tip_zh: '从光 Hikari（战士）或 Throné（盗贼）开始——他们有最立即吸引人的故事线，并能很好地教授核心战斗机制。不要试图同时匆匆完成所有八个故事；专注于一个区域的一位角色章节后再转到下一个，只有当你需要解锁他们的路径技能以通行时才切换其他角色。夜间路径技能（Throné 的盗窃、Osvald 的袭击）非常有用——定期在城镇切换到夜间模式。',
  },
  triangle: {
    title_en: 'Triangle Strategy',
    title_zh: '三角战略',
    emoji: '⚔️',
    tag_en: 'A tactical JRPG with a deeply political story — your moral convictions determine which of four distinct endings you reach, and the strategy combat is among the finest in the genre',
    tag_zh: '一款拥有深度政治故事的战术 JRPG——你的道德信念决定你达到四个截然不同结局中的哪一个，战略战斗是该类型中最优秀的之一',
    platform_en: 'Available on: Nintendo Switch, PC (Steam) — about $60 new, often on sale for $20-30',
    platform_zh: '可在以下平台获取：Nintendo Switch、PC（Steam）——新品约 60 美元，经常特价 20-30 美元',
    why_en:
      "Triangle Strategy (2022) is Square Enix's second HD-2D tactical JRPG after the original Octopath Traveler — a political war story set in the land of Norzelia, where three powers struggle for control of salt and iron (the world's most precious commodities). You play as Serenoa, a young lord whose kingdom is caught between three great nations, and whose fate is decided by a Scales of Conviction mechanic: throughout the game, your choices accumulate as Utility, Morality, or Liberty points, and at critical junctures your party votes on what to do — influenced by those accumulated values. The game has four endings, including a secret true ending that requires very specific choices across the entire playthrough. The tactical combat is superb: terrain elevation gives archers range bonuses, fire spreads between adjacent tiles, and every unit has a class-specific role that rewards positioning. Metacritic 84 on Switch. For players who loved Fire Emblem: Three Houses but want a more politically focused story without relationship simulation: Triangle Strategy is the more narrative-pure tactical JRPG.",
    why_zh:
      '三角战略（2022 年）是史克威尔艾尼克斯继歧路旅人原作之后的第二款 HD-2D 战术 JRPG——一个设定在诺兹利亚大陆的政治战争故事，三方势力争夺对盐和铁（世界最珍贵商品）的控制。你扮演年轻领主塞利诺亚，他的王国夹在三个大国之间，命运由信念天平机制决定：整个游戏中，你的选择累积为功利、道德或自由点数，在关键时刻你的队伍投票决定行动——受那些累积价值的影响。游戏有四个结局，包括需要整个游玩过程中非常特定选择的秘密真结局。战术战斗出色：地形高度给弓箭手提供射程加成，火焰在相邻格间蔓延，每个单位都有需要定位奖励的职业专属角色。Switch 版 Metacritic 84 分。',
    tip_en: "Do not skip the Encampment mock battles — they are the only way to grind experience without advancing the story, and some chapters have difficulty spikes. The Conviction system is missable: read every event carefully and consider which value (Utility, Morality, Liberty) your choice builds before confirming. For the true ending, keep a separate save file at the final branching point — the game tells you which chapter it is.",
    tip_zh: '不要跳过大本营的模拟战斗——它们是在不推进故事的情况下磨练经验的唯一方式，一些章节有难度峰值。信念系统是可错过的：在确认前仔细阅读每个事件并考虑你的选择建立哪个价值（功利、道德、自由）。对于真结局，在最终分支点保留一个单独的存档——游戏会告诉你是哪个章节。',
  },
  xenoblade: {
    title_en: 'Xenoblade Chronicles 3',
    title_zh: '异度神剑 3',
    emoji: '🌌',
    tag_en: 'The most ambitious JRPG on Nintendo Switch — a 150+ hour epic about life, death, and connection set in a spectacular world, with one of the deepest combat systems in the genre',
    tag_zh: 'Nintendo Switch 上最雄心勃勃的 JRPG——一部设定在壮观世界中关于生死与羁绊的 150+ 小时史诗，拥有该类型中最深度的战斗系统之一',
    platform_en: 'Available on: Nintendo Switch only — about $60 new',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 60 美元',
    why_en:
      "Xenoblade Chronicles 3 (2022) is Monolith Soft's masterpiece and the most fully realized entry in the beloved JRPG series. You follow six young warriors from two warring nations who discover that the war they have been fighting their entire lives is a construct — and that they have far less time to live than they believed. The world of Aionios is vast and staggeringly beautiful: open plains where creatures the size of buildings roam, ruins that hint at a long-lost civilization, and a mystery about the world's true nature that unfolds slowly over 80+ hours of main story. The real-time combat system — built around six party members, each with a combat class that can be swapped, and Interlinking mechanics where two characters fuse into a powerful combined form — has enough depth to reveal new possibilities for hundreds of hours. The story is the series' most emotionally resonant, wrestling with mortality, chosen family, and the value of living fully in finite time. Metacritic 93 on Switch — one of the highest-rated JRPGs of the generation. Switch exclusive.",
    why_zh:
      '异度神剑 3（2022 年）是 Monolith Soft 的杰作，是备受喜爱的 JRPG 系列中最完整实现的作品。你跟随来自两个交战民族的六位年轻战士，他们发现他们一生都在进行的战争是一个构建——而且他们的生命比他们相信的要短得多。Aionios 世界广阔而令人叹为观止：建筑大小的生物漫步的开阔平原、暗示久远失落文明的废墟，以及关于世界真实本质的谜题在 80+ 小时主线故事中缓慢展开。实时战斗系统——围绕六名队员构建，每人都有可以切换的战斗职业，以及两名角色融合成强大组合形态的连接机制——有足够的深度在数百小时内揭示新的可能性。Switch 版 Metacritic 93 分——该世代评分最高的 JRPG 之一。Switch 独占。',
    tip_en: "Do not try to level-up grind in the early game — XC3 scales enemy levels to your current level, so exploration is more valuable than grinding. Unlock Class Mastery for your characters as soon as it becomes available: when you master a class, you keep its skills on a new class, which is the long-term power progression. The side quests in XC3 are unusually good — many have their own story arcs. Do not skip Colony side quests; they add significant emotional context to the main cast.",
    tip_zh: '不要在游戏早期尝试磨练等级——XC3 会根据你当前等级调整敌人等级，所以探索比磨练更有价值。一旦可用就为你的角色解锁职业精通：当你精通一个职业后，你在新职业上保留其技能，这是长期的强化进程。XC3 的支线任务质量异常高——许多都有自己的故事弧线。不要跳过殖民地支线任务；它们为主角团添加了重要的情感背景。',
  },
  ryza: {
    title_en: 'Atelier Ryza: Ever Darkness & the Secret Hideout',
    title_zh: '莱莎的炼金工房～常暗女王与秘密藏身处～',
    emoji: '⚗️',
    tag_en: 'The most accessible entry point to the beloved Atelier series — a cozy JRPG where gathering ingredients, crafting alchemy items, and living a summer adventure with your best friends is the whole point',
    tag_zh: '深受喜爱的工房系列最易上手的入口——一款 Cozy JRPG，采集材料、制作炼金物品、与最好的朋友一起度过夏日冒险就是全部意义',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, PS5 — about $40 new. Two sequels already available: Ryza 2 and Ryza 3.',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、PS5——新品约 40 美元。两部续集已上市：莱莎 2 和莱莎 3。',
    why_en:
      "Atelier Ryza: Ever Darkness & the Secret Hideout (2019) is the entry in the beloved Atelier series (Gust/Koei Tecmo) that introduced the franchise to a massive new audience — and for good reason. The alchemy system is the heart of the game: a visual synthesis puzzle where you combine ingredients with elemental properties to craft items, and where understanding which materials fit together creates increasingly powerful results. The gathering loop — exploring fields, forests, and ruins for ingredients, each with quality ratings that affect synthesis — feels unmistakably similar to farming game resource collection. The story is warm coming-of-age: Ryza and her friends, bored with island life, discover alchemy and the outside world, and the central emotion of the game is the bittersweetness of an ending summer. The combat is real-time with item use integrated: you manage an ATB-style gauge while deploying crafted consumables for tactical advantage. Two sequels (Ryza 2 and 3) are available immediately if you fall in love with the world. Metacritic approximately 80 across platforms.",
    why_zh:
      '莱莎的炼金工房～常暗女王与秘密藏身处～（2019 年）是备受喜爱的工房系列（Gust/光荣特库摩）中将该系列介绍给大量新受众的作品——原因充分。炼金系统是游戏的核心：一个视觉合成谜题，你将具有元素属性的材料组合来制作物品，理解哪些材料配合在一起会创造越来越强大的结果。采集循环——在田野、森林和遗迹中寻找材料，每种都有影响合成的品质评级——与农场游戏资源收集的感觉明显相似。故事是温暖的成长故事：莱莎和她的朋友们，对岛屿生活感到无聊，发现了炼金术和外面的世界，游戏的中心情感是夏末的苦甜感。两部续集（莱莎 2 和 3）已立即可玩。各平台 Metacritic 约 80 分。',
    tip_en: "The quality of materials matters more than the quantity — always use the highest-quality ingredient available for synthesis, and prioritize gathering spots with multiple elements. The alchemy tree expands significantly in the second half of the game; do not feel pressure to craft every item early. When in doubt, talk to every NPC in every area: many have hidden gathering spot triggers. Ryza 2 is considered slightly better than the original by most fans; if you love Ryza 1, you can move straight to 2.",
    tip_zh: '材料的质量比数量更重要——合成时始终使用可用的最高质量材料，并优先采集具有多种元素的地点。炼金术树在游戏后半段显著扩展；不要感到有压力早期制作所有物品。如果不确定，与每个区域的每个 NPC 交谈：许多人都有隐藏的采集点触发器。大多数粉丝认为莱莎 2 比原作稍好；如果你喜爱莱莎 1，可以直接进入 2。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { octopath: 0, triangle: 0, xenoblade: 0, ryza: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function JrpgFinderQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/jrpg-finder-quiz`
    const shareText = isZh
      ? `JRPG 推荐测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My JRPG recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
          {isZh ? '哪款 JRPG 最适合你？' : 'Which JRPG Is Right for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从歧路旅人 II、三角战略、异度神剑 3、莱莎的炼金工房中找到你的 JRPG'
            : '6 questions to match you with Octopath Traveler II, Triangle Strategy, Xenoblade Chronicles 3, or Atelier Ryza'}
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
        {isZh ? '找到我的 JRPG' : 'Find My JRPG'}
      </button>
    </div>
  )
}
