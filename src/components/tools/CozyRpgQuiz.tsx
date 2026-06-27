'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'moonlighter' | 'cassette' | 'hatintime' | 'crosscode'

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
    q_en: 'Which aspect of a deeper game most excites you?',
    q_zh: '深度游戏中的哪个方面最让你兴奋？',
    options: [
      { en: 'Running an economy — I want to buy, sell, upgrade, and watch my shop grow alongside my fighting ability', zh: '经营经济——我想买卖、升级，看着我的商店随着我的战斗能力一起成长', type: 'moonlighter' },
      { en: 'Building a team — collecting creatures, choosing my party composition, fusing two monsters into something new', zh: '组建队伍——收集生物、选择我的队伍组合、将两只怪物融合成新的形态', type: 'cassette' },
      { en: 'Mastering movement — learning every trick my character can do until I can reach places others never find', zh: '掌握移动——学习我的角色能做的每一个技巧，直到我能到达别人从未发现的地方', type: 'hatintime' },
      { en: 'Learning deep mechanics — a combat system with enough layers that I am still discovering things 40 hours in', zh: '学习深度机制——一个有足够层次的战斗系统，让我在 40 小时后仍在发现新东西', type: 'crosscode' },
    ],
  },
  {
    q_en: 'How long are you willing to spend on a single game before feeling you have seen what it offers?',
    q_zh: '在感觉你已经看到一款游戏所能提供的内容之前，你愿意在单一游戏上花多少时间？',
    options: [
      { en: '15-25 hours — enough for daily loops to feel satisfying and the full shop arc to play out', zh: '15-25 小时——足以让日常循环感到满足并完成完整的商店弧线', type: 'moonlighter' },
      { en: '20-35 hours — enough to fill my monster roster, explore the island fully, and finish the story', zh: '20-35 小时——足以填满我的怪物名册、完整探索岛屿并完成故事', type: 'cassette' },
      { en: '10-15 hours — I want a joyful, complete platformer experience that does not overstay its welcome', zh: '10-15 小时——我想要一次愉快、完整的平台游戏体验，不会让人感到厌倦', type: 'hatintime' },
      { en: '60-80+ hours — I want the full-scale RPG experience, every sidequest, every mechanic fully explored', zh: '60-80+ 小时——我想要完整规模的 RPG 体验、每一个支线任务、每一个机制都被充分探索', type: 'crosscode' },
    ],
  },
  {
    q_en: 'Which type of challenge sounds most rewarding to you?',
    q_zh: '哪种类型的挑战对你来说最有成就感？',
    options: [
      { en: 'Learning enemy attack patterns in a roguelite dungeon until I can clear it smoothly', zh: '学习地下城敌人的攻击模式，直到我能顺利清除它——类 Roguelite 的进步弧线', type: 'moonlighter' },
      { en: 'Building a monster team that can handle any encounter through type coverage and smart fusion decisions', zh: '建立一个通过属性覆盖和明智的融合决策能应对任何遭遇战的怪物队伍', type: 'cassette' },
      { en: 'Finding the precise sequence of moves — a hat throw here, a dash there — to reach a secret platform', zh: '找到精确的动作序列——这里一个帽子投掷、那里一个冲刺——到达一个秘密平台', type: 'hatintime' },
      { en: 'Unlocking a boss\'s full attack pattern over several attempts, then finally executing a clean run', zh: '通过几次尝试解锁 Boss 的完整攻击模式，然后最终执行一次完美的运行', type: 'crosscode' },
    ],
  },
  {
    q_en: 'Which visual world sounds most appealing?',
    q_zh: '哪个视觉世界听起来最有吸引力？',
    options: [
      { en: 'A cozy pixel-art medieval town with a shop on the surface and mysterious dungeons carved beneath it', zh: '一个舒适的像素艺术中世纪小镇，地面上有一家商店，下方刻有神秘的地下城', type: 'moonlighter' },
      { en: 'A strange island where people arrive from other dimensions and must make a new life with the monsters they befriend there', zh: '一个人们从其他维度到来并必须与他们在那里结交的怪物共同开创新生活的奇异岛屿', type: 'cassette' },
      { en: 'A colorful 3D cartoon world full of creative level design, hidden collectibles, and physics-based hat mechanics', zh: '一个充满创意关卡设计、隐藏收藏品和基于物理的帽子机制的色彩丰富的 3D 卡通世界', type: 'hatintime' },
      { en: 'An anime-styled MMO world rendered with extraordinary detail, inhabited by a lone player navigating its strange rules', zh: '一个以非凡细节呈现的动漫风格 MMO 世界，由一个独自玩家穿梭于其奇异规则中', type: 'crosscode' },
    ],
  },
  {
    q_en: 'What role do you want story to play in your RPG?',
    q_zh: '你希望故事在你的 RPG 中扮演什么角色？',
    options: [
      { en: 'Light but charming — I want the economy and dungeon mechanics to be the core, with story as a welcome backdrop', zh: '轻度但迷人——我希望经济和地下城机制成为核心，故事作为受欢迎的背景', type: 'moonlighter' },
      { en: 'Present and emotional — I want to care about the characters I meet and the world they ended up in', zh: '存在且有情感——我想关心我遇到的角色和他们最终所处的世界', type: 'cassette' },
      { en: 'Lighthearted and creative — funny characters, clever writing, a charming narrative I can engage with casually', zh: '轻松愉快且有创意——有趣的角色、聪明的文字、我可以轻松参与的迷人叙事', type: 'hatintime' },
      { en: 'Deep and invested — I want a full RPG narrative with story twists, revelations, and characters whose arcs matter', zh: '深入且投入——我想要一个完整的 RPG 叙事，有故事转折、启示和弧线重要的角色', type: 'crosscode' },
    ],
  },
  {
    q_en: 'Which description sounds like a perfect afternoon gaming session?',
    q_zh: '哪种描述听起来像是完美的下午游戏时光？',
    options: [
      { en: 'Open the shop, sell last night\'s dungeon loot at good prices, upgrade my weapon, then dive back in for another run', zh: '开店、以好价格出售昨晚地下城的战利品、升级我的武器，然后再来一次探险', type: 'moonlighter' },
      { en: 'Take my monster team into a challenging battle, discover a new fusion combination, then explore more of the strange island', zh: '带着我的怪物队伍投入一场艰难的战斗、发现一种新的融合组合，然后探索更多奇异的岛屿', type: 'cassette' },
      { en: 'Find a new area I have never reached before, figure out the hat-throw sequence to unlock it, and collect everything inside', zh: '找到一个我从未到达过的新区域，找出解锁它的帽子投掷序列，然后收集里面的一切', type: 'hatintime' },
      { en: 'Get deep into a story-driven quest chain, then spend an hour reading skill tooltips and optimizing my build for the next boss', zh: '深入一个故事驱动的任务链，然后花一个小时阅读技能提示并为下一个 Boss 优化我的配置', type: 'crosscode' },
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
  moonlighter: {
    title_en: 'Moonlighter',
    title_zh: 'Moonlighter',
    emoji: '🏪',
    tag_en: 'Run a shop by day, explore dungeons by night — a perfect loop for cozy players who want action combat paired with economic satisfaction',
    tag_zh: '白天开店、夜晚探索地下城——对于想要将动作战斗与经济满足感结合的 Cozy 玩家来说是完美的循环',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, Xbox — about $20. Often on sale for $5-10.',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、Xbox——约 20 美元。经常以 5-10 美元促销。',
    why_en:
      "Moonlighter (2018) is one of the most satisfying dual-loop games ever designed: you play as Will, a shopkeeper in the town of Rynoka who secretly dreams of being a hero. By day you manage your shop — pricing items for maximum profit, dealing with customers who try to steal, upgrading your shop size and furniture, and hiring an assistant. By night you descend into procedurally generated dungeons beneath the town, fighting monsters, collecting loot, and trying to make it back alive. The two loops enhance each other perfectly: better shop income means better equipment for dungeon runs; better dungeon loot means better items to sell. The pixel art is beautiful and warm, the shop management system has just enough depth to stay satisfying, and the combat is action-oriented (dodge, attack, use items) with enough variety across five dungeons to keep it interesting. For cozy game players specifically, the shop-keeper daytime section provides the gentle rhythm they already love, while the dungeons provide a challenge that scales with confidence. At $20 with frequent sales to $5, it is one of the best value indie RPGs available.",
    why_zh:
      'Moonlighter（2018 年）是有史以来设计最令人满足的双循环游戏之一：你扮演 Will，Rynoka 镇上秘密梦想成为英雄的店主。白天你经营你的商店——为商品定价以获取最大利润、对付试图偷窃的顾客、升级你的商店规模和家具，并雇佣助手。夜晚你下降到小镇下方程序生成的地下城，战斗、收集战利品，并尝试活着回来。两个循环完美相互增强：更好的商店收入意味着更好的地下城装备；更好的地下城战利品意味着更好的出售物品。像素艺术美丽温暖，商店管理系统有足够的深度保持令人满足，战斗是动作导向的（闪避、攻击、使用物品），五个地下城的多样性足以保持趣味。对于 cozy 游戏玩家，白天的店主部分提供了他们已经喜爱的温和节奏，而地下城则提供随信心增长的挑战。20 美元，经常促销到 5 美元，是最具价值的独立 RPG 之一。',
    tip_en: "Sell items in the shop before the next dungeon run to fund upgrades — but watch customer reactions carefully to learn what items are actually worth. A customer looking horrified means you underpriced; one who hesitates and buys anyway means you hit the ceiling. Price discovery is part of the game.",
    tip_zh: '在下次地下城探险前在商店出售物品来资助升级——但要仔细观察顾客的反应，了解物品的实际价值。顾客看起来很恐慌意味着你定价过低；一个犹豫后还是购买的人意味着你达到了价格上限。价格发现是游戏的一部分。',
  },
  cassette: {
    title_en: 'Cassette Beasts',
    title_zh: 'Cassette Beasts',
    emoji: '📼',
    tag_en: 'A monster-taming RPG unlike Pokémon — record monsters onto cassette tapes, fuse two creatures to create new hybrid forms, and explore a strange island where everyone arrived from somewhere else',
    tag_zh: '一款与宝可梦截然不同的怪物收集 RPG——将怪物录制到卡带上、融合两只生物创造新的混合形态，并探索一个每个人都从其他地方来到的奇异岛屿',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, Xbox, Game Pass — about $20',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、Xbox、Game Pass——约 20 美元',
    why_en:
      "Cassette Beasts (2023) is the most creative monster-taming RPG since the Pokémon games first launched — and in some ways more mechanically interesting. You play as someone who wakes up on New Wirral, an island that collects people who somehow slip from their home world, and discover that the local wildlife can be recorded onto cassette tapes and played back as battle forms. The key mechanic that sets it apart: any two monster cassettes can be fused mid-battle to create a hybrid creature that combines their moves, typing, and visual design. With 120 base monsters and unlimited fusion possibilities, the team-building depth is enormous. The island itself is designed with love — each area has its own aesthetic, the NPC companions each have a story arc that unfolds through sidequests, and the world-building raises interesting questions about how the island works. Available on Game Pass, making it essentially free to try. One of the most underrated games of 2023, frequently described by players as 'the Pokémon-like that actually evolved the genre.'",
    why_zh:
      'Cassette Beasts（2023 年）是自宝可梦游戏首次推出以来最具创意的怪物收集 RPG——在某些方面机制上更有趣。你扮演一个在 New Wirral 醒来的人，这是一个收集以某种方式从家园世界滑落的人的岛屿，并发现当地的野生动物可以录制到卡带上并作为战斗形态回放。使其与众不同的关键机制：任何两张怪物卡带都可以在战斗中融合，创造结合了它们的招式、属性和视觉设计的混合生物。凭借 120 只基础怪物和无限的融合可能性，队伍构建深度是巨大的。岛屿本身充满爱意设计——每个区域都有自己的美学，NPC 同伴各自有通过支线任务展开的故事弧线，世界构建提出了关于岛屿如何运作的有趣问题。Game Pass 上可用，使试玩基本上免费。2023 年最被低估的游戏之一，常被玩家描述为"真正进化了该类型的宝可梦类游戏"。',
    tip_en: "Experiment with fusions during every boss fight — some boss mechanics specifically punish certain typings, and fusing two creatures can give you emergency coverage you didn't have. Don't save fusion for 'special moments'; the game encourages you to try combinations freely.",
    tip_zh: '在每次 Boss 战斗中尝试融合——某些 Boss 机制专门惩罚特定属性，融合两只生物可以给你意外的覆盖范围。不要把融合留给"特殊时刻"；游戏鼓励你自由尝试组合。',
  },
  hatintime: {
    title_en: 'A Hat in Time',
    title_zh: '时光帽',
    emoji: '🎩',
    tag_en: 'A joyful 3D collectathon platformer built around hat-throwing physics — expressive movement, creative worlds, charming writing, and the best feeling of mastering a character in the genre',
    tag_zh: '一款以帽子投掷物理为核心的欢乐 3D 收藏品平台游戏——富有表现力的移动、创意世界、迷人的文字和该类型中最好的掌握角色感觉',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, Xbox — about $30',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、Xbox——约 30 美元',
    why_en:
      "A Hat in Time (2017) is the best modern 3D collectathon platformer — a love letter to the Nintendo 64 era of games like Super Mario 64 and Banjo-Kazooie, made by a small team with enormous creativity. You play as Hat Kid, a small alien girl who collects hourglasses to power her spaceship home, through five wildly different chapters: a cruise ship murder mystery, a movie studio with competing mafia owls and mob penguins, a forest that changes character based on which path you take, an alpine village with a scaffolding challenge, and a haunted manor. The movement system centers on a hookshot that transforms into a hat mid-flight — with upgrades it becomes one of the most expressive and satisfying platformer movement systems ever built. At 10-15 hours for the main game with significantly more in DLC, it is the perfect length for the experience it delivers. One of the highest-rated platformers of its decade with a warm, funny, and creative identity all its own.",
    why_zh:
      '时光帽（2017 年）是最好的现代 3D 收藏品平台游戏——一封给任天堂 64 时代游戏（如超级马里奥 64 和班卓熊）的情书，由一个拥有巨大创意的小团队制作。你扮演 Hat Kid，一个收集沙漏为她的飞船提供动力回家的小外星女孩，历经五个截然不同的章节：一场邮轮谋杀悬案、一个由竞争猫头鹰黑手党和企鹅黑帮的电影工作室、一个根据你选择的路径改变性格的森林、一个带有脚手架挑战的高山村庄，以及一座闹鬼的庄园。移动系统以在飞行中变成帽子的钩爪为中心——升级后它成为有史以来最具表现力和最令人满足的平台游戏移动系统之一。主游戏 10-15 小时，DLC 还有更多，对于它所提供的体验来说长度恰到好处。十年来评分最高的平台游戏之一，拥有温暖、有趣、独具一格的创意身份。',
    tip_en: "Earn the Sprint Hat (Chapter 2) as early as possible — it transforms movement and makes the whole game feel better. The game is extremely generous with its collectibles; if you explore naturally you will almost never need to grind. Save your time pieces for new chapter unlocks first.",
    tip_zh: '尽早获得冲刺帽（第 2 章）——它改变了移动方式，让整个游戏感觉更好。游戏对其收藏品非常慷慨；如果你自然探索，你几乎永远不需要磨练。首先将你的时间片段用于解锁新章节。',
  },
  crosscode: {
    title_en: 'CrossCode',
    title_zh: 'CrossCode',
    emoji: '⚡',
    tag_en: 'A lone player inside an MMO world — reactive real-time combat, deep skill trees, meticulously designed puzzles, and a 60-hour anime RPG narrative about identity and what is real',
    tag_zh: '一个在 MMO 世界中的孤独玩家——反应性实时战斗、深度技能树、精心设计的谜题，以及一个关于身份认同和什么是真实的 60 小时动漫 RPG 叙事',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, Xbox — about $20. DLC: A New Home ~$8.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、Xbox——约 20 美元。DLC：新家园约 8 美元。',
    why_en:
      "CrossCode (2018) is one of the most underrated RPGs ever made — a game that simulates what it would feel like to be a mute player character inside a future anime MMORPG, surrounded by NPC players who treat the game world as a social space while you are on a mission that only you understand. The premise sounds niche but the game delivers on every front: the real-time combat system has enough depth that skilled players are still discovering optimizations years later, the puzzle design (especially in dungeons) is meticulous and satisfying, the skill tree lets you specialize in dozens of build directions, and the 60-70 hour story builds slowly toward revelations that genuinely land emotionally. The developer spent seven years making it; every system feels polished to an unusual degree. For cozy game players specifically who have been afraid of 'hard RPGs,' CrossCode's difficulty is adjustable in granular ways — you can tune combat difficulty, puzzle hints, and enemy aggression separately. One of the finest games of the 2010s.",
    why_zh:
      'CrossCode（2018 年）是有史以来最被低估的 RPG 之一——一款模拟在一个未来动漫 MMORPG 中作为沉默玩家角色的感受的游戏，被将游戏世界视为社交空间的 NPC 玩家包围，而你正在执行只有你理解的任务。前提听起来很小众，但游戏在各方面都兑现了：实时战斗系统有足够的深度，多年后熟练玩家仍在发现优化方法；谜题设计（尤其是地下城中）细致而令人满足；技能树让你专注于数十个构建方向；60-70 小时的故事慢慢构建到真正情感落地的揭示。开发者花了七年制作；每个系统都感觉被打磨到了异乎寻常的程度。对于一直害怕"困难 RPG"的 cozy 游戏玩家，CrossCode 的难度可以精细调整——你可以分别调整战斗难度、谜题提示和敌人攻击性。2010 年代最好的游戏之一。',
    tip_en: "Do not skip the combat arts tutorial — the combat system looks simple for the first few hours but the arts (special moves with elemental switching) are where the depth lives. Spend time with each art type and you will find the combat becomes completely different from the early impression.",
    tip_zh: '不要跳过战斗技能教程——战斗系统在最初几个小时看起来很简单，但技能（带元素切换的特殊移动）是深度所在。花时间了解每种技能类型，你会发现战斗与最初的印象完全不同。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { moonlighter: 0, cassette: 0, hatintime: 0, crosscode: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyRpgQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-rpg-quiz`
    const shareText = isZh
      ? `Cozy 玩家 RPG 进阶测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My indie RPG for cozy gamers: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
            ? '哪款独立 RPG 最适合 Cozy 游戏玩家？'
            : 'Which Indie RPG Is Perfect for a Cozy Gamer?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从 Moonlighter、Cassette Beasts、时光帽、CrossCode 中找到你的 RPG 进阶游戏'
            : '6 questions to match you with Moonlighter, Cassette Beasts, A Hat in Time, or CrossCode — your next step beyond cozy farming'}
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
        {isZh ? '找到我的 RPG 进阶游戏' : 'Find My RPG Next Step'}
      </button>
    </div>
  )
}
