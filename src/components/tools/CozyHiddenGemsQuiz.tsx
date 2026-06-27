'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'bear-and-breakfast' | 'minekos-night-market' | 'eastward' | 'potionomics'

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
    q_en: 'Which core loop sounds most satisfying to you?',
    q_zh: '哪种核心循环对你来说最令人满足？',
    options: [
      { en: 'Decorating and improving a place so guests are happier each time they visit', zh: '装饰和改善一个地方，让客人每次拜访都更开心', type: 'bear-and-breakfast' },
      { en: 'Making things with my hands and bringing them to a market to see what people want', zh: '用双手制作东西，带到市场看看人们想要什么', type: 'minekos-night-market' },
      { en: 'Moving through a world and experiencing a story that unfolds as I explore', zh: '在世界中移动，体验随着我探索而展开的故事', type: 'eastward' },
      { en: 'Getting strategically better at social negotiations until I can beat anyone in a deal', zh: '在社交谈判上变得更加战略性，直到我能在任何交易中胜出', type: 'potionomics' },
    ],
  },
  {
    q_en: 'Which setting sounds most appealing?',
    q_zh: '哪种设定听起来最吸引你？',
    options: [
      { en: 'A growing woodland B&B run by a bear who gives every room a different theme and personally greets each animal guest', zh: '一家不断扩大的林地民宿，由一只熊经营，每个房间都有不同的主题，并亲自迎接每位动物客人', type: 'bear-and-breakfast' },
      { en: 'A small Japanese coastal town full of cats where a girl prepares handmade goods for seasonal night markets', zh: '一个充满猫咪的日本海滨小镇，一个女孩在这里为季节性夜市准备手工商品', type: 'minekos-night-market' },
      { en: 'A post-apocalyptic world where something ended long ago but people kept living, and you are traveling through it cooking noodles along the way', zh: '一个末日后的世界，很久以前某事终结但人们继续生活，你穿越其中，沿途烹饪面条', type: 'eastward' },
      { en: 'A bustling magical city where you own a potion shop, and your reputation among adventurers and wizards determines who walks through your door', zh: '一个熙熙攘攘的魔法城市，你拥有一家药水店，你在冒险者和巫师中的声誉决定谁走进你的门', type: 'potionomics' },
    ],
  },
  {
    q_en: 'What do you want to come back to each play session?',
    q_zh: '你希望每次游戏时回来做什么？',
    options: [
      { en: 'Check on the B&B — see new guest reviews, decide what to renovate, unlock a new room theme', zh: '检查民宿——查看新客人评价、决定翻修什么、解锁新房间主题', type: 'bear-and-breakfast' },
      { en: 'See what new crafting recipes unlocked and which festival items are trending this week', zh: '查看解锁了哪些新制作配方，以及本周哪些节日物品正在流行', type: 'minekos-night-market' },
      { en: 'Continue the story — I want to know what happens to the characters I left mid-journey', zh: '继续故事——我想知道我中途离开的角色发生了什么', type: 'eastward' },
      { en: 'Level up my negotiation deck and try the new customers who arrived in the city', zh: '升级我的谈判牌组，尝试新到城市的客户', type: 'potionomics' },
    ],
  },
  {
    q_en: 'How do you feel about management complexity in games?',
    q_zh: '你如何看待游戏中的管理复杂性？',
    options: [
      { en: 'Love it — I want to juggle rooms, furniture, guest satisfaction ratings, and seasonal bookings', zh: '喜欢——我想要同时处理房间、家具、客人满意度评分和季节性预订', type: 'bear-and-breakfast' },
      { en: 'A little is fine — crafting resource management is satisfying, but I do not want spreadsheet-level complexity', zh: '一点点没问题——制作资源管理令人满足，但我不想要电子表格级别的复杂性', type: 'minekos-night-market' },
      { en: 'Minimal — I want light puzzle-solving and some combat, not management', zh: '最小化——我想要轻度谜题解决和一些战斗，而不是管理', type: 'eastward' },
      { en: 'Enjoy it — I specifically want the complexity of building a deck, balancing potion recipes, and learning customer preference patterns', zh: '享受它——我特别想要构建牌组、平衡药水配方和学习客户偏好模式的复杂性', type: 'potionomics' },
    ],
  },
  {
    q_en: 'Which of these games does your perfect game feel closest to?',
    q_zh: '你的理想游戏感觉最接近以下哪款游戏？',
    options: [
      { en: 'Animal Crossing meets a hotel management sim — the social warmth of ACNH but with more goal-driven decoration decisions', zh: '动物之森遇上酒店管理模拟——ACNH 的社交温暖，但有更多目标驱动的装饰决策', type: 'bear-and-breakfast' },
      { en: 'Stardew Valley set in a Japanese festival town — seasonal crafting cycles, NPC relationships, a cat in every corner', zh: '设置在日本节日小镇的星露谷物语——季节性制作循环、NPC 关系、每个角落都有猫', type: 'minekos-night-market' },
      { en: 'Mother/EarthBound with Ghibli aesthetics — weird, warm, post-apocalyptic but deeply humane pixel storytelling', zh: '带有吉卜力美学的母亲/地球边界——奇异、温暖、末日后但深度人道主义的像素叙事', type: 'eastward' },
      { en: 'Spiritfarer meets Slay the Spire — emotional connections with NPCs who have unique personalities, resolved through deckbuilding negotiations', zh: 'Spiritfarer 遇上杀戮尖塔——与拥有独特个性的 NPC 建立情感联系，通过牌组构建谈判解决', type: 'potionomics' },
    ],
  },
  {
    q_en: 'What role do you most enjoy playing in a game world?',
    q_zh: '你最喜欢在游戏世界中扮演什么角色？',
    options: [
      { en: 'The host — someone whose job is to make others comfortable and whose success is measured in guest satisfaction', zh: '主人——一个工作是让他人感到舒适、成功以客人满意度衡量的人', type: 'bear-and-breakfast' },
      { en: 'The artisan — someone who makes things, sells them, and earns a place in a community through creative work', zh: '工匠——一个制作东西、出售它们、通过创意工作在社区中赢得一席之地的人', type: 'minekos-night-market' },
      { en: 'The traveler — someone passing through a world and becoming part of it through the connections made along the way', zh: '旅行者——一个穿越世界、通过沿途建立的联系成为其一部分的人', type: 'eastward' },
      { en: 'The entrepreneur — someone building a reputation through clever deals and quality products in a competitive magical market', zh: '创业者——一个在竞争激烈的魔法市场中通过巧妙交易和优质产品建立声誉的人', type: 'potionomics' },
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
  'bear-and-breakfast': {
    title_en: 'Bear and Breakfast',
    title_zh: '熊与早餐',
    emoji: '🐻',
    tag_en: 'Run a woodland B&B as a bear — design themed rooms, manage guest satisfaction, and expand through the forest',
    tag_zh: '作为一只熊经营林地民宿——设计主题房间、管理客人满意度、在森林中扩张',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch——约 20 美元',
    why_en:
      "Bear and Breakfast (2022) is one of the most charming cozy games released in the past few years and one of the most underrated. You play as Hank, a cheerful bear who discovers an abandoned cabin and decides to renovate it into a bed and breakfast for human tourists. The game expands through the surrounding forest: you will eventually be managing multiple properties across different biomes, each with unique decor themes, different types of rooms (bedroom, bathroom, entertainment room, dining room), and guest ratings that accumulate into an overall reputation. The management loop is satisfying without being overwhelming: each day you gather resources, craft furniture from those resources, install it in the right rooms, and then watch guests arrive, stay, and leave reviews. Your bear friends have personalities and backstories that develop over time. The humor is warm and self-aware, the visual style is charming cartoon illustration, and the seasonal content gives each part of the year a different feel. At $20 on PC and Switch, it is a remarkably full-featured game for its price.",
    why_zh:
      '熊与早餐（2022 年）是近年来发布的最迷人的 cozy 游戏之一，也是最被低估的游戏之一。你扮演 Hank，一只发现废弃小屋并决定将其翻新成人类游客的民宿的快乐熊。游戏通过周围的森林扩展：你最终将在不同生物群落中管理多个房产，每个房产都有独特的装饰主题、不同类型的房间（卧室、浴室、娱乐室、餐厅）以及累积成整体声誉的客人评分。管理循环令人满足但不过于繁重：每天你收集资源，用这些资源制作家具，将其安装在正确的房间，然后看着客人到来、留宿和留下评价。你的熊朋友们有个性和背景故事，随时间发展。幽默温暖而自知，视觉风格是迷人的卡通插画，季节性内容给每年的不同部分带来不同的感觉。PC 和 Switch 上 20 美元，以其价格而言是功能非常完整的游戏。',
    tip_en: "Prioritize comfort rating above everything else — guests weight it most heavily in their reviews. A small room with high-comfort furniture earns better ratings than a large room with cheap furniture. Invest in the bedroom furniture early.",
    tip_zh: '将舒适度评级置于一切之上——客人在评价中对其权重最高。一个拥有高舒适度家具的小房间比拥有廉价家具的大房间获得更好的评分。早期投资卧室家具。',
  },
  'minekos-night-market': {
    title_en: "Mineko's Night Market",
    title_zh: '美子的夜市',
    emoji: '🏮',
    tag_en: 'Craft goods and sell at seasonal night markets in a Japanese cat-filled town — explore during the day, sell by lantern-light at night',
    tag_zh: '在一个充满猫咪的日本小镇制作商品并在季节性夜市出售——白天探索，在灯笼光下的夜晚售卖',
    platform_en: 'Available on: PC (Steam), Nintendo Switch — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch——约 25 美元',
    why_en:
      "Mineko's Night Market (2023) is the most visually distinctive cozy game of recent years — a love letter to Japanese folk culture, seasonal festivals, and the specific aesthetic of old coastal towns with paper lanterns, wooden shop signs, and a cat population that outnumbers the humans. You play as Mineko, a girl who moves to the island of Omori and discovers that a legendary sun cat may be in danger. During the day you explore the town, gather resources, build friendships with the eccentric residents, and participate in quirky quests. At night, you set up your market stall, price your handcrafted goods, and sell to a crowd of buyers who each have specific preferences. The crafting system has significant depth: you combine gathered materials into furniture, decorations, food, and novelty items, each with different demand curves at the market. The game is dripping in Japanese festival atmosphere — lanterns, yukata-wearing residents, taiko drums, seasonal matsuri events — and the cat character designs are iconic. At $25 on PC and Switch, it is one of the most lovingly made cozy games of 2023.",
    why_zh:
      '美子的夜市（2023 年）是近年来视觉上最具特色的 cozy 游戏——对日本民俗文化、季节性节日以及带有纸灯笼、木制店牌和猫口超过人口的旧海滨小镇特定美学的情书。你扮演 Mineko，一个搬到大盛岛并发现传说中的太阳猫可能处于危险中的女孩。白天你探索小镇、收集资源、与古怪居民建立友谊，并参与奇特的任务。夜晚，你设置你的市场摊位，为你的手工商品定价，并向一群各有特定偏好的买家出售。制作系统有相当大的深度：你将收集的材料组合成家具、装饰品、食物和新奇物品，每种在市场上都有不同的需求曲线。游戏充满日本节日氛围——灯笼、穿着浴衣的居民、太鼓、季节性祭典活动——猫咪角色设计是标志性的。PC 和 Switch 上 25 美元，是 2023 年最精心制作的 cozy 游戏之一。',
    tip_en: "Scout the market before setting prices — walk around the pre-opening stalls to see what other vendors are selling and at what prices. Pricing your goods slightly lower than the competition for the same item gives you a reliable sales advantage, especially early game.",
    tip_zh: '在定价前侦察市场——在开市前四处走动，查看其他摊主在卖什么以及价格如何。对相同物品的定价略低于竞争对手，给你带来可靠的销售优势，特别是在游戏早期。',
  },
  eastward: {
    title_en: 'Eastward',
    title_zh: '向东方',
    emoji: '🍜',
    tag_en: 'A gorgeous pixel-art road trip through a post-apocalyptic world that kept going — cook noodles, meet strange communities, protect a child with strange powers',
    tag_zh: '一段穿越末日后继续运转的世界的华丽像素艺术公路旅行——烹饪面条、遇见奇异社区、保护一个拥有奇异力量的孩子',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch — about $25',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch——约 25 美元',
    why_en:
      "Eastward (2021) is one of the most visually stunning cozy-adjacent games ever made — its pixel art was created by a single artist (PixPil) over seven years and has a density and warmth of detail that rivals classic Super Nintendo games. You play as John, a strong and quiet digger, and Sam, a girl with mysterious powers he discovered underground, as they travel east through a series of communities in a world where something went wrong long ago but people kept building, kept living, and kept cooking. Food is central to Eastward — there is a full cooking system, recipes to discover, and John's ability to cook meals gives the game a specific domestic warmth. Each community the pair visits has its own culture, problems, and eccentric residents; the game is structured as a series of chapter-length visits. The tone is warmly melancholy in the tradition of Studio Ghibli — hopeful and strange and specific in the way only stories set in post-disaster worlds can be. The combat is simple action-RPG (frying pan as primary weapon). One of the most underrated games of 2021, with a magnificent original soundtrack by Joel Corelitz.",
    why_zh:
      '向东方（2021 年）是有史以来视觉上最令人惊叹的 cozy 相邻游戏之一——其像素艺术由一位艺术家（PixPil）历时七年创作，细节密度和温暖感可与经典超级任天堂游戏媲美。你扮演 John，一个强壮而沉默的挖掘工，以及 Sam，一个他在地下发现的拥有神秘力量的女孩，他们向东旅行，穿越一系列社区，在一个很久以前出了什么问题但人们继续建造、继续生活、继续烹饪的世界。食物是向东方的核心——有一个完整的烹饪系统、要发现的食谱，以及 John 烹饪食物的能力给游戏带来特定的家庭温暖。这对组合访问的每个社区都有自己的文化、问题和古怪居民；游戏以一系列章节长度的访问为结构。基调是温暖忧郁的，延续了宫崎骏吉卜力的传统——充满希望、奇异而具体，只有发生在灾后世界中的故事才能有这种感觉。战斗是简单的动作 RPG（平底锅作为主要武器）。2021 年最被低估的游戏之一，配以 Joel Corelitz 创作的宏大原创配乐。',
    tip_en: "Cook meals regularly using John's cooking pot — they provide significant stat boosts and the cooking animations are warm and satisfying in their own right. Recipes often combine things you find in the current chapter, so hoard ingredients and experiment freely.",
    tip_zh: '使用 John 的烹饪锅定期烹饪食物——它们提供显著的属性加成，烹饪动画本身就温暖而令人满足。食谱通常结合你在当前章节中找到的东西，所以囤积食材并自由实验。',
  },
  potionomics: {
    title_en: 'Potionomics',
    title_zh: 'Potionomics',
    emoji: '⚗️',
    tag_en: 'Run a potion shop through deck-building negotiations — brew potions, charm adventurers, and build a business empire in a magical city',
    tag_zh: '通过牌组构建谈判经营药水店——酿造药水、魅惑冒险者、在魔法城市建立商业帝国',
    platform_en: 'Available on: PC (Steam) — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）——约 25 美元',
    why_en:
      "Potionomics (2022) is one of the most original cozy-adjacent games of the past five years: a potion shop management game where selling your potions is handled through a deckbuilding negotiation minigame. You are Sylvia, a witch who inherits a failing potion shop with significant debt. You brew potions (an ingredient combination system with visual color-mixing feedback), display them in your shop, and then when customers arrive you enter a card-based negotiation where you play charm and persuasion cards to influence the sale price. Your deck improves as you befriend the adventurers and merchants who visit your shop — each NPC has a personality and specific deck-building synergies that make friendship meaningful beyond just story content. There is also an overarching story with multiple ending paths depending on who you invest in as business partners. On PC only (no console release as of 2024), but one of the most mechanically inventive cozy games in the genre. Frequently recommended for players who enjoyed Spiritfarer's emotional NPC depth and want something with strategic depth added on top.",
    why_zh:
      'Potionomics（2022 年）是过去五年最具原创性的 cozy 相邻游戏之一：一款药水店管理游戏，其中出售药水通过牌组构建谈判小游戏处理。你是 Sylvia，一个继承了一家有大量债务的失败药水店的女巫。你酿造药水（具有视觉颜色混合反馈的配料组合系统），在你的店里展示它们，然后当客人到来时，你进入一个基于卡牌的谈判，在那里你打出魅力和说服卡牌来影响销售价格。当你与访问你店铺的冒险者和商人交朋友时，你的牌组会改善——每个 NPC 都有个性和特定的牌组构建协同效应，使友谊在故事内容之外变得有意义。还有一个总体故事，根据你投资哪些商业伙伴而有多个结局路径。仅限 PC（截至 2024 年没有主机发布），但是该类型中机制最具创意的 cozy 游戏之一。经常推荐给喜欢 Spiritfarer 情感 NPC 深度并想要在其上添加战略深度的玩家。',
    tip_en: "Focus on befriending one or two NPCs deeply in the first act rather than spreading friendship across all of them — the deck synergies from maxing out a relationship are much stronger than having mid-level friendship with everyone. Quinn and Remy are particularly strong early partners.",
    tip_zh: '在第一幕深入结交一两个 NPC 的友谊，而不是把友谊分散给所有人——最大化一段关系带来的牌组协同效应比与所有人保持中等友谊强得多。Quinn 和 Remy 是特别强力的早期合作伙伴。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'bear-and-breakfast': 0,
    'minekos-night-market': 0,
    eastward: 0,
    potionomics: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyHiddenGemsQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-hidden-gems`
    const shareText = isZh
      ? `Cozy 游戏隐藏宝石测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My cozy hidden gem is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {isZh ? '上手小贴士：' : 'Getting started: '}
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
            ? '哪款被低估的 Cozy 游戏隐藏宝石最适合你？'
            : 'Which Underrated Cozy Hidden Gem Should You Play?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，在四款被严重低估的 Cozy 精品中找到你的隐藏宝石——熊与早餐、美子的夜市、向东方，还是 Potionomics'
            : '6 questions to find your cozy hidden gem — Bear and Breakfast, Mineko\'s Night Market, Eastward, or Potionomics. All underplayed, all excellent.'}
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
        {isZh ? '找到我的隐藏宝石' : 'Find My Hidden Gem'}
      </button>
    </div>
  )
}
