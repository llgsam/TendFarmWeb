import Link from 'next/link'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const other = otherLocale(locale)
  const isZh = locale === 'zh'
  return {
    title: isZh
      ? '农场游戏测评 — 找到你的游戏类型 | Farm Game Hub'
      : 'Farming Game Quizzes — Find Your Perfect Game | Farm Game Hub',
    description: isZh
      ? '农场游戏互动测评：测出你的农场人格、找到最适合你的游戏，结果适合截图分享。'
      : 'Interactive farming game quizzes — discover your farming personality, find the perfect game for your playstyle, and share your results.',
    keywords: isZh
      ? ['农场游戏测评', '星露谷农场类型测试', '农场美学测试', '农场人格测试', '你是哪位星露谷村民', '星露谷配对测验', 'cozy gamer 测试', 'cottagecore 农场', '星露谷新手攻略', '星露谷段位测验', '动物森友会村民测验', 'Palia 游戏风格', 'Palia 新手攻略', 'Palia 免费吗', '牧场物语哪款好', '符文工房推荐', 'Disney Dreamlight Valley 角色测验', 'Dreamlight Valley 免费吗', '星露谷联机攻略', '星露谷多人模式', 'Spiritfarer 灵魂测验', 'Spiritfarer 会哭吗', '手机农场游戏推荐', 'Hay Day 攻略', '类星露谷游戏', '星露谷替代品', 'Switch cozy 游戏推荐']
      : ['farming game quiz', 'which stardew valley farm type', 'farm aesthetic quiz', 'cottagecore farm aesthetic', 'which stardew valley character are you', 'stardew valley romance quiz', 'cozy gamer quiz', 'which farming game should i play', 'stardew valley tips for beginners', 'which animal crossing villager are you', 'palia tips for beginners', 'palia playstyle quiz', 'which story of seasons game should i play', 'harvest moon quiz', 'which disney dreamlight valley character are you', 'is disney dreamlight valley free', 'stardew valley multiplayer', 'stardew valley co-op tips', 'which spiritfarer spirit are you', 'is spiritfarer sad', 'best mobile farming game', 'hay day tips for beginners', 'games like stardew valley', 'stardew valley alternatives', 'sun haven vs stardew valley', 'what to play after stardew valley', 'best cozy games switch', 'cozy games nintendo switch', 'best nintendo switch games for relaxing', 'best cozy games for beginners', 'easy cozy games to get into', 'cozy games for non gamers', 'first cozy game to play', 'easiest cozy games', 'cozy games with dark themes', 'dark cozy games', 'dave the diver worth it', 'is cult of the lamb worth it', 'dredge game worth buying', 'cozy games that are not actually cozy', 'games like stardew valley but darker', 'best co-op cozy games', 'cozy games to play with partner', 'is it takes two worth it', 'overcooked 2 worth it', 'cozy games for couples switch', 'cozy games with cats', 'cozy games about animals', 'neko atsume worth playing', 'webfishing game review', 'is untitled goose game worth it', 'is hades worth it', 'vampire survivors worth it', 'is balatro worth it 2024', 'slay the spire review worth buying', 'best beginner roguelike games', 'cozy roguelike games', 'best roguelike to start with', 'ooblets review worth it', 'fae farm review worth it', 'roots of pacha review', 'potion permit review worth buying', 'games like stardew valley 2023 2024', 'games like animal crossing for pc', 'best cozy games after stardew valley'],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes`,
        [other]: `${BASE_URL}/${other}/quizzes`,
      },
    },
  }
}

const QUIZZES = [
  {
    slug: 'stardew-season',
    emoji: '🍃',
    titleZh: '你是哪个星露谷季节？',
    titleEn: 'Which Stardew Valley Season Are You?',
    descZh: '春天的希望、夏天的活力、秋天的感恩还是冬天的内省？6 个性格问题测出你的灵魂季节，附村民配对和专属攻略。',
    descEn: 'Spring hope, summer energy, fall gratitude, or winter depth? 6 personality questions to reveal your Stardew soul season, with villager match and tips.',
    tagZh: '季节人格',
    tagEn: 'Season Soul',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'stardew-farm-type',
    emoji: '🏡',
    titleZh: '你适合哪种星露谷农场？',
    titleEn: 'Which Stardew Valley Farm Type Is Right for You?',
    descZh: '标准、森林、河地、山顶还是海滩？6 个问题帮你在五种官方农场类型中找到最适合你游戏风格的那一个，附老手小贴士。',
    descEn: 'Standard, Forest, Riverland, Hill-top, or Beach? 6 questions to match you with your perfect Stardew Valley farm type — includes pro tips for each.',
    tagZh: '农场选择',
    tagEn: 'Farm Finder',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'farm-aesthetic',
    emoji: '🌿',
    titleZh: '你的农场美学是什么风格？',
    titleEn: "What's Your Farm Aesthetic?",
    descZh: '6 个关于美感的问题，测出你的农场灵魂属于哪种美学——Cottagecore 田园梦、暗调神秘、彩虹缤纷、禅意极简还是 Cozy Rustic？',
    descEn: '6 sensory questions to reveal your farm aesthetic — Cottagecore, Dark & Moody, Bright Cheerful, Zen Minimal, or Cozy Rustic? Share your result.',
    tagZh: '美学测试',
    tagEn: 'Aesthetic',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'stardew-character',
    emoji: '🌾',
    titleZh: '你是哪位星露谷村民？',
    titleEn: 'Which Stardew Valley Villager Are You?',
    descZh: '6 个问题，测出你最像艾比盖尔、莉亚、潘妮、塞巴斯蒂安还是艾略特？每个结果都有专属描述，适合截图分享。',
    descEn: '6 questions to find your Stardew Valley match — Abigail, Leah, Penny, Sebastian, or Elliott? Each result tells you exactly why you match.',
    tagZh: '角色测试',
    tagEn: 'Character Quiz',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: false,
  },
  {
    slug: 'stardew-romance',
    emoji: '💌',
    titleZh: '你在星露谷里应该和谁在一起？',
    titleEn: 'Which Stardew Valley Character Should You Romance?',
    descZh: '6 个关于感情的问题，测出你最适合和哪位星露谷村民在一起——艾比盖尔、莉亚、潘妮、艾米莉、塞巴斯蒂安还是哈维？',
    descEn: '6 questions about what you want in a relationship to find your perfect Stardew Valley romance match — results include exactly why you fit.',
    tagZh: '配对测验',
    tagEn: 'Romance Match',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-gamer',
    emoji: '☕',
    titleZh: '你是 Cozy Gamer 吗？',
    titleEn: 'Are You a Cozy Gamer?',
    descZh: '8 个问题测出你的 Cozy 指数（0%–100%）——从硬核玩家到超级 Cozy Gamer，看看你的灵魂属于哪个阵营。',
    descEn: '8 questions to calculate your Cozy Score (0–100%) — from hardcore player to True Cozy Gamer. Share your result with friends.',
    tagZh: '风格测试',
    tagEn: 'Cozy Score',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: false,
  },
  {
    slug: 'which-farming-game',
    emoji: '🎮',
    titleZh: '哪款农场游戏最适合你？',
    titleEn: 'Which Farming Game Should You Play?',
    descZh: '6 个问题，从星露谷、动物森友会、Palia、模拟农场等热门游戏中，精准推荐最适合你的那一款。',
    descEn: '6 questions to match you with the perfect farming game — Stardew Valley, Animal Crossing, Palia, Farming Simulator, and more.',
    tagZh: '游戏推荐',
    tagEn: 'Game Finder',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: false,
  },
  {
    slug: 'farm-personality',
    emoji: '🌱',
    titleZh: '你是哪种农场玩家？',
    titleEn: 'What Kind of Farmer Are You?',
    descZh: '6 个问题，测出你的农场游戏人格——效率农夫、美学农夫、探索农夫还是禅意农夫？附推荐游戏。',
    descEn: '6 questions to reveal your farming personality — Optimizer, Homesteader, Explorer, or Zen — plus personalized game picks.',
    tagZh: '人格测试',
    tagEn: 'Personality',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: false,
  },
  {
    slug: 'stardew-beginner',
    emoji: '🎯',
    titleZh: '你是星露谷新手还是老鸟？',
    titleEn: 'Stardew Valley: Beginner or Pro?',
    descZh: '6 个经典场景问题，测出你是嫩苗新手、成长萌芽、丰收达人还是农场大师？每个段位都有专属进阶建议。',
    descEn: '6 classic scenario questions to find your Stardew Valley skill level — Seedling, Sprout, Harvest Ready, or Master Farmer. With tips for your exact level.',
    tagZh: '段位测验',
    tagEn: 'Skill Level',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'animal-crossing-villager',
    emoji: '🍃',
    titleZh: '你是哪位动物森友会村民？',
    titleEn: 'Which Animal Crossing Villager Are You?',
    descZh: '6 个性格问题，测出你最像西施惠的温暖、雷蒙德的品味、布丁的治愈，还是松风的艺术感？每个结果附上专属好友互动细节。',
    descEn: '6 personality questions to find your Animal Crossing villager match — Isabelle, Raymond, Stitches, or Marshal. Each result includes a special "if they were your friend" detail.',
    tagZh: '村民测验',
    tagEn: 'ACNH Quiz',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'palia-playstyle',
    emoji: '🌻',
    titleZh: '你在 Palia 的游戏风格是什么？',
    titleEn: "What's Your Palia Playstyle?",
    descZh: '6 个关于游戏习惯的问题，测出你是 Palia 里的培育者、静待者、探险家还是工匠？每个结果附上该风格的技能优先攻略。',
    descEn: '6 questions about how you play to find your Palia playstyle — Cultivator, Patient Watcher, Adventurer, or Maker. Each result includes which skills to prioritize.',
    tagZh: 'Palia 测验',
    tagEn: 'Palia Quiz',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'harvest-moon-quiz',
    emoji: '⛰️',
    titleZh: '哪款牧场物语 / 符文工房最适合你？',
    titleEn: 'Which Story of Seasons Game Should You Play?',
    descZh: '6 个问题，从矿石镇的伙伴们、美好的一生、橄榄镇与希望的大地、符文工房 4 中精准推荐最适合你的一款。含详细平台和购买指引。',
    descEn: '6 questions to find your perfect Story of Seasons game — Friends of Mineral Town, A Wonderful Life, Pioneers of Olive Town, or Rune Factory 4. Includes platform availability and buying guide.',
    tagZh: '游戏推荐',
    tagEn: 'SoS Finder',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'dreamlight-valley-quiz',
    emoji: '✨',
    titleZh: '你是哪位 Disney Dreamlight Valley 角色？',
    titleEn: 'Which Disney Dreamlight Valley Character Are You?',
    descZh: '6 个性格问题，测出你最像莫阿娜、WALL-E、艾莎还是高飞？每个结果附上该角色在游戏内的专属攻略提示，结果适合截图分享。',
    descEn: '6 personality questions to find your Disney Dreamlight Valley character match — Moana, WALL-E, Elsa, or Goofy. Each result includes an in-game tip for your character.',
    tagZh: 'Disney 测验',
    tagEn: 'Disney Quiz',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'stardew-multiplayer',
    emoji: '🤝',
    titleZh: '你在星露谷联机里是哪种队友？',
    titleEn: 'What Kind of Stardew Valley Co-op Partner Are You?',
    descZh: '6 个联机场景题，测出你是补给官、建造师、探险家还是规划师。含优势分析、盲点提醒和专属联机攻略——发给队友一起对号入座！',
    descEn: '6 co-op scenarios to reveal your Stardew Valley multiplayer role — Provider, Builder, Explorer, or Planner. Each result includes strengths, blind spots, and a co-op tip. Tag your partner!',
    tagZh: '联机测验',
    tagEn: 'Co-op Quiz',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'spiritfarer-quiz',
    emoji: '🦊',
    titleZh: '你是哪位 Spiritfarer 灵魂？',
    titleEn: 'Which Spiritfarer Spirit Are You?',
    descZh: '6 个关于情感处理方式的问题，测出你最像关恩、阿图尔、夏梦还是古斯塔夫。每个结果附角色专属金句——这个游戏会让你哭。',
    descEn: '6 questions about how you feel and move through life — find your Spiritfarer spirit match: Gwen, Atul, Summer, or Gustav. Each result includes a signature quote.',
    tagZh: '角色测验',
    tagEn: 'Spirit Quiz',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'mobile-farming-quiz',
    emoji: '📱',
    titleZh: '哪款手机农场游戏最适合你？',
    titleEn: 'Which Mobile Farming Game Is Right for You?',
    descZh: '6 个关于手机游戏习惯的问题，从 Hay Day、星露谷手机版、Township、动物之森口袋营地中精准推荐最适合你的一款。含优缺点对比。',
    descEn: '6 questions to match you with the best mobile farming game — Hay Day, Stardew Valley, Township, or Pocket Camp. Includes honest pros and watch-outs for each.',
    tagZh: '手机游戏',
    tagEn: 'Mobile Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'stardew-alternatives',
    emoji: '🌸',
    titleZh: '星露谷之后该玩哪款游戏？',
    titleEn: 'What to Play After Stardew Valley?',
    descZh: '6 个问题，从 Sun Haven、珊瑚岛、Fields of Mistria、沙石镇时光中找到最适合你的星露谷替代品。含详细游戏特点和「需要注意」对比。',
    descEn: '6 questions to find your perfect Stardew Valley alternative — Sun Haven, Coral Island, Fields of Mistria, or My Time at Sandrock. Includes honest game breakdowns and watch-outs.',
    tagZh: '游戏推荐',
    tagEn: 'Next Game',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-switch-games',
    emoji: '🎮',
    titleZh: '你该在 Switch 上玩哪款 Cozy 游戏？',
    titleEn: 'Which Cozy Game for Nintendo Switch?',
    descZh: '6 个问题，从星露谷物语、动物之森新视野、Spiritfarer、Disney Dreamlight Valley 中找到最适合你的 Switch cozy 游戏。含价格、入门建议和优缺点分析。',
    descEn: '6 questions to find your perfect cozy Switch game — Stardew Valley, Animal Crossing: New Horizons, Spiritfarer, or Disney Dreamlight Valley. With prices and honest tips for each.',
    tagZh: 'Switch 推荐',
    tagEn: 'Switch Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'palia-beginner-guide',
    emoji: '🌻',
    titleZh: 'Palia 新手测验：你该从哪里开始？',
    titleEn: 'Palia Beginner Quiz: Where Should You Start?',
    descZh: '6 个问题，找出最适合你的 Palia 起点——园艺、狩猎、社交还是制作？每个结果含 3 条专属新手攻略。Palia 免费游玩，立即开始。',
    descEn: '6 questions to find your Palia beginner focus — Gardening, Hunting, Friendships, or Crafting. Each result includes 3 beginner tips for your path. Palia is free — start today.',
    tagZh: 'Palia 攻略',
    tagEn: 'Palia Guide',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'stardew-vs-animal-crossing',
    emoji: '🌾🍃',
    titleZh: '星露谷物语 vs 动物之森：哪款更适合你？',
    titleEn: 'Stardew Valley vs Animal Crossing: Which Is Right for You?',
    descZh: '6 个问题，帮你在星露谷物语和动物之森新视野之间做出选择——或找到两款都玩的最佳顺序。含游戏风格深度对比。',
    descEn: '6 questions to choose between Stardew Valley and Animal Crossing: New Horizons — or find the perfect order to play both. Includes honest deep-dives into each game.',
    tagZh: '游戏对比',
    tagEn: 'vs Quiz',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-games-for-couples',
    emoji: '💑',
    titleZh: '适合情侣的 Cozy 游戏推荐测验',
    titleEn: 'Best Cozy Game for Couples Quiz',
    descZh: '6 个问题，为你们找到最适合一起玩的 cozy 游戏——星露谷联机、动物之森、Palia 或煮过头？发给你的另一半一起做！',
    descEn: '6 questions to find the perfect cozy game for you and your partner — Stardew Valley co-op, Animal Crossing, Palia, or Overcooked. Share with your partner and compare!',
    tagZh: '情侣推荐',
    tagEn: 'Couple Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-games-for-beginners',
    emoji: '🌱',
    titleZh: 'Cozy 游戏新手入门测验：哪款最适合你？',
    titleEn: 'Best Cozy Game for Beginners Quiz',
    descZh: '6 个问题，为 cozy 游戏新手找到完美入门作品——无论你的游戏经验或预算如何。含新手第一步指南。',
    descEn: '6 questions to find the perfect first cozy game for you — no gaming experience needed. Includes Animal Crossing, Stardew Valley, Palia (free), and Disney Dreamlight Valley.',
    tagZh: '新手入门',
    tagEn: 'Beginner Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-game-mood',
    emoji: '🌙',
    titleZh: '根据心情选 Cozy 游戏：今晚该玩什么？',
    titleEn: 'What Cozy Game Should I Play Tonight? Mood Quiz',
    descZh: '6 个问题，根据你现在的心情——效率感、平静、关脑子、还是有情绪——找到今晚最合适的游戏。',
    descEn: '6 questions to find the right cozy game for your exact mood — productive, peaceful, need to switch off, or ready to feel something real.',
    tagZh: '心情推荐',
    tagEn: 'Mood Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-indie-games',
    emoji: '🏕️',
    titleZh: '你应该玩哪款独立 Cozy 游戏？',
    titleEn: 'Which Indie Cozy Game Should You Play?',
    descZh: '在 Cozy Grove、Unpacking、A Little to the Left 和 Wylde Flowers 之间找到最适合你的——四款完全不同的独立 cozy 体验。',
    descEn: 'Find your match across Cozy Grove, Unpacking, A Little to the Left, and Wylde Flowers — four acclaimed indie cozy games with completely different souls.',
    tagZh: '独立游戏',
    tagEn: 'Indie Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'farming-game-challenge',
    emoji: '⚔️',
    titleZh: '你想要多少挑战感？农场游戏推荐测验',
    titleEn: 'How Much Challenge Do You Want in Your Farming Game?',
    descZh: '从零战斗的纯探索（Yonder）到动作 RPG 地下城（牧场物语 4）到真实农业机械模拟——6 个问题找到你的挑战区间。',
    descEn: 'From zero-combat exploration (Yonder) to action RPG dungeons (Rune Factory 4) to realistic agricultural simulation — 6 questions to match your challenge tolerance.',
    tagZh: '挑战偏好',
    tagEn: 'Challenge Quiz',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'stardew-mods-quiz',
    emoji: '🔧',
    titleZh: '你应该给星露谷物语装模组吗？装哪些？',
    titleEn: 'Should You Play Stardew Valley with Mods? Which Ones?',
    descZh: '6 个问题，根据你的游玩进度找到正确的模组策略——原版、SVE、纯视觉模组或完整模组栈。',
    descEn: '6 questions to find the right mod strategy for where you are — pure vanilla, Stardew Valley Expanded, visual mods only, or the full SVE + Ridgeside mod stack.',
    tagZh: 'SVE 模组',
    tagEn: 'Mods Quiz',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-dark-games',
    emoji: '🌑',
    titleZh: '你应该玩哪款暗色系 Cozy 游戏？',
    titleEn: 'Which Dark Cozy Game Should You Play?',
    descZh: '不是所有 cozy 游戏都真的温馨——6 个问题，在 Dave the Diver、羔羊邪教、Dredge 和 Potion Craft 中找到最适合你的。',
    descEn: "Not every cozy game is truly cozy — 6 questions to find your match across Dave the Diver, Cult of the Lamb, Dredge, and Potion Craft.",
    tagZh: '暗色系推荐',
    tagEn: 'Dark Cozy Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-coop-games',
    emoji: '🤝',
    titleZh: '你们应该一起玩哪款合作 Cozy 游戏？',
    titleEn: 'Which Co-op Cozy Game Should You Play Together?',
    descZh: '6 个问题，在 It Takes Two、胡闹厨房 2、PlateUp! 和搬家模拟器中找到最适合你们组合的游戏体验。',
    descEn: '6 questions to find your co-op match — from emotional couple story to chaotic kitchen team to strategic restaurant builders to pure absurdist comedy.',
    tagZh: '合作推荐',
    tagEn: 'Co-op Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-animal-games',
    emoji: '🐾',
    titleZh: '你应该玩哪款动物主题 Cozy 游戏？',
    titleEn: 'Which Animal Cozy Game Should You Play?',
    descZh: '6 个问题，在猫咪后院、WEBFISHING、无标题鹅作游戏和小猫咪大城市中找到最适合你的——从放置猫咪到恶作剧之鹅。',
    descEn: '6 questions to find your match — idle cat watching, viral multiplayer fishing, goose-powered mischief, or exploring a city as a lost kitten.',
    tagZh: '动物推荐',
    tagEn: 'Animal Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-exploration-games',
    emoji: '🌿',
    titleZh: '你应该玩哪款氛围探索游戏？',
    titleEn: 'Which Atmospheric Exploration Game Should You Play?',
    descZh: '6 个问题，在看火人、艾迪芬奇的记忆、短途徒步和 Abzû 中找到最适合你的短篇氛围体验。',
    descEn: '6 questions to find your short atmospheric match — wilderness mystery, a house of memories, a cozy mountain, or a wordless ocean.',
    tagZh: '探索推荐',
    tagEn: 'Exploration Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-builder-games',
    emoji: '🏘️',
    titleZh: '你应该玩哪款放松建造游戏？',
    titleEn: 'Which Cozy Builder Game Should You Play?',
    descZh: '6 个问题，在 Townscaper、Terra Nil、Dorfromantik 和 Summerhouse 中找到最适合你的冥想建造体验——全部零战斗。',
    descEn: '6 questions to find your cozy builder match — pure sandbox town, ecological restoration puzzle, tile-placement village, or tiny garden aesthetics.',
    tagZh: '建造推荐',
    tagEn: 'Builder Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-roguelike-quiz',
    emoji: '🎲',
    titleZh: '你应该从哪款 Roguelike 游戏入门？',
    titleEn: 'Which Roguelike Should You Start With?',
    descZh: '6 个问题，在黑帝斯、吸血鬼幸存者、杀戮尖塔和 Balatro 中找到最适合你的入门 Roguelike——全部低门槛高可重玩性。',
    descEn: '6 questions to find your starter roguelike — action escape to bullet heaven to deckbuilding strategy to poker multiplier madness. All beginner-friendly.',
    tagZh: 'Roguelike 推荐',
    tagEn: 'Roguelike Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-new-2024',
    emoji: '✨',
    titleZh: '2024 年哪款新 Cozy 游戏最适合你？',
    titleEn: 'Which New 2024 Cozy Game Is Right for You?',
    descZh: '6 个问题，在植物庄园、Rusty 的退休生活、Mistria 的田野和 Hinterberg 的地下城中找到你的 2024 年度 Cozy 游戏——全部 Xbox Game Pass 可用。',
    descEn: '6 questions to match you with the best new cozy game of 2024 — botany puzzles, an idle farm on your taskbar, a Stardew successor, or a cozy action RPG in the Alps.',
    tagZh: '2024 年度推荐',
    tagEn: '2024 Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-atmosphere-quiz',
    emoji: '🌧️',
    titleZh: '你现在的心情氛围适合哪款 Cozy 游戏？',
    titleEn: 'Which Cozy Game Matches Your Atmosphere Right Now?',
    descZh: '6 个感官问题，根据你此刻的天气感受——雨夜、秋日余晖、晨雾还是春日清晨——找到你的氛围 Cozy 游戏。',
    descEn: '6 sensory questions matching your exact mood — rainy-night café, contemplative autumn road, seasonal harvest rhythm, or spring community garden.',
    tagZh: '氛围推荐',
    tagEn: 'Atmosphere Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-short-adventure',
    emoji: '🌱',
    titleZh: '你应该玩哪款短篇 Cozy 冒险游戏？',
    titleEn: 'Which Short Cozy Adventure Game Should You Play?',
    descZh: '6 个问题，在 Venba、奇异园艺、小鳄鱼游戏和 Tinykin 中找到你的完美短篇体验——全部 12 小时以内，全部独具一格。',
    descEn: '6 questions to find your match — from a 90-minute Indian family cooking narrative to a Victorian herbalist mystery to a child\'s pretend adventure to thumb-sized house exploration.',
    tagZh: '短篇推荐',
    tagEn: 'Short Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-next-step',
    emoji: '🌿',
    titleZh: '玩完星露谷和动物之森，你该玩什么？',
    titleEn: 'What to Play After Stardew Valley and Animal Crossing?',
    descZh: '6 个问题，在 Ooblets、精灵农场、帕恰之根和药水许可证中找到你的下一款 Cozy 游戏——每款都有星露谷没有的独特特色。',
    descEn: '6 questions to find your next cozy game — dancing creature-collecting, magical co-op farming, Stone Age community sim, or small-town doctor life. Each brings something Stardew never had.',
    tagZh: '进阶推荐',
    tagEn: 'Next Step Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-soundtrack-quiz',
    emoji: '🎵',
    titleZh: '你的音乐品味对应哪款 Cozy 游戏原声？',
    titleEn: 'Which Cozy Game Has the Soundtrack You\'ll Love?',
    descZh: '6 个关于音乐感受的问题——Celeste 格莱美提名电子乐、Gris 无言水彩管弦乐、Chicory 温暖涂色配乐，还是林中夜晚独立摇滚？',
    descEn: '6 questions about how music moves you — Grammy-nominated electronic, wordless orchestral watercolor, warm discovery adventure, or lo-fi indie guitar small-town story.',
    tagZh: '配乐推荐',
    tagEn: 'Soundtrack Pick',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
]

const FAQ_EN = [
  {
    q: 'Which Stardew Valley villager is the most popular?',
    a: 'Abigail, Leah, and Sebastian consistently rank as the most popular Stardew Valley villagers in fan polls. Abigail wins for her adventurous personality and relatable non-conformism; Leah is beloved for her artist backstory; Sebastian resonates with introverts. Penny and Elliott have dedicated fanbases for their warmth and depth respectively.',
  },
  {
    q: 'Who is the best character to marry in Stardew Valley?',
    a: "There's no single best marriage choice — it depends on your playstyle and personality. Abigail and Leah are most popular for their depth and uniqueness. Harvey is loved for his thoughtfulness, Sebastian for his authenticity, and Penny for her warmth. Take the Stardew Valley Romance Quiz above to find your personal best match.",
  },
  {
    q: 'What are the best farming games right now?',
    a: "The top farming games in 2025 are Stardew Valley (PC/Switch/Mobile), Animal Crossing: New Horizons (Switch), Palia (PC/Switch, free), Hay Day (Mobile), and Farming Simulator 25 (PC/Console). Each excels in a different category.",
  },
  {
    q: 'Is Stardew Valley still worth playing in 2025?',
    a: "Yes — Stardew Valley remains the gold standard farming RPG. The 1.6 update added significant new content, and it's still actively enjoyed by millions. At ~$15, it's one of the best value games ever made.",
  },
  {
    q: 'What farming game is best for relaxation?',
    a: 'Animal Crossing: New Horizons and Cozy Grove are the most relaxing farming games — no fail states, no time pressure, gentle pacing. Palia is also extremely cozy for those who prefer online multiplayer.',
  },
  {
    q: 'What is a cottagecore farm aesthetic?',
    a: "Cottagecore farm aesthetic is a romantic, pastoral style inspired by rural life — wildflowers, honey jars, handmade candles, linen textures, and stone walls. In farming games like Stardew Valley, it means natural, slightly overgrown farm designs in cream, sage green, and blush palettes. It celebrates slow living and closeness to nature. Take the Farm Aesthetic Quiz above to find your exact aesthetic type.",
  },
  {
    q: 'Which Stardew Valley farm type should I choose?',
    a: 'The best farm type depends on your playstyle: Standard is best for beginners and crop farmers (most land); Forest is best for crafters and foragers (renewable hardwood); Riverland is best for fishers and artisan goods makers; Hill-top is best for miners (on-farm quarry); Beach is best for challenge-seekers (hardest but most unique). Take the Stardew Valley Farm Type Quiz above to get a personalized recommendation.',
  },
  {
    q: 'What are the best games like Stardew Valley?',
    a: "The best Stardew Valley alternatives in 2025 are: Sun Haven (PC/Switch) for players who want a full fantasy RPG with multiple towns and deep combat; Coral Island (PC/PS/Xbox/Switch) for a vibrant tropical farming game with ocean diving; Fields of Mistria (PC, Early Access) for players who want the Stardew feel in a fresh medieval pixel art setting; and My Time at Sandrock (all platforms) for deep crafting and town-rebuilding with a fully voiced story. Take our Stardew Valley Alternatives Quiz to find which one fits your playstyle.",
  },
  {
    q: 'Is Palia free to play? What should beginners do first?',
    a: "Yes — Palia is completely free to download and play on PC (Steam, Epic Games Store) and Nintendo Switch. There are no energy timers, no pay-to-win mechanics, and no forced ads. Cosmetic purchases are optional. For beginners, the best first steps are: complete the starter quests to unlock your plot and meet the main NPCs; build a Worktable and Plant Station early; start a small garden with tomatoes or potatoes (the best early gold source); and talk to every NPC daily for friendship points. Take our Palia Beginner Quiz to find which focus — gardening, hunting, socializing, or crafting — suits you best.",
  },
  {
    q: 'What is the best cozy game on Nintendo Switch?',
    a: "The best cozy game on Nintendo Switch depends on what you want: Stardew Valley (~$15) for deep farming RPG progression with hundreds of hours of content; Animal Crossing: New Horizons (~$60) for creative island decoration with no fail states and the most relaxing pace; Spiritfarer (~$30, often on sale for ~$10) for the most emotionally powerful cozy story on Switch; and Disney Dreamlight Valley (free) for Disney fans who want character quests and a life sim with beloved franchises. Take our Cozy Switch Games Quiz to find your match.",
  },
  {
    q: 'What is the best mobile farming game?',
    a: "The best mobile farming game depends on your preferences: Hay Day (free, iOS/Android) is the best for classic production-chain farming with social features and neighborhood competitions; Stardew Valley ($4.99, iOS/Android) is the best complete no-timer farming RPG with zero in-app purchases; Township (free, iOS/Android) is best for players who want farming combined with town-building and active co-op teams; Animal Crossing: Pocket Camp (free, iOS/Android) is best for Animal Crossing fans who want the franchise on mobile. Take our Mobile Farming Game Quiz to find the right fit for you.",
  },
  {
    q: 'Is Spiritfarer worth playing? Is it very sad?',
    a: "Yes — Spiritfarer is absolutely worth playing. It is widely considered one of the best cozy games ever made, often appearing on lists of the most emotionally powerful games period. Yes, it will make many players cry — it is about accompanying spirits (inspired by real people in the developer's life) through death and letting them go. However, it is not a sad game in a depressing way; it is a warm, hopeful meditation on grief, connection, and what we leave behind. The management and crafting systems are fun and satisfying, and the writing is exceptional. Take our Spiritfarer Quiz to find which spirit you most resemble.",
  },
  {
    q: 'What is the easiest cozy game for people who have never played video games?',
    a: "Animal Crossing: New Horizons is the easiest cozy game for true beginners with no gaming experience. It was specifically designed to have no way to fail: you cannot die, there is no time pressure on any activity, no crops that wither, and no enemies. Your island grows on your real-world clock over days and weeks, and you are never rushed. Second recommendation for non-gamers is Disney Dreamlight Valley (also free to download) — it uses familiar Disney characters to create immediate emotional context, which removes the alienating feeling of learning an unknown world. Take the Best Cozy Game for Beginners Quiz above to get a personalized first-game recommendation.",
  },
  {
    q: 'Is Animal Crossing better than Stardew Valley for beginners?',
    a: "For absolute beginners, Animal Crossing: New Horizons is gentler because it has zero fail states — you literally cannot do anything wrong. Stardew Valley is more forgiving than most games but has mild time-management elements (daily energy, seasonal crops, a loose year-one goal) that some first-time gamers find slightly structured. Both are excellent first cozy games; the right choice depends on whether you want pure creative freedom with no structure (Animal Crossing) or a gentle introduction to progression goals and RPG elements (Stardew Valley). Take the Best Cozy Game for Beginners Quiz to get a recommendation based on your specific priorities.",
  },
  {
    q: 'What are the best cozy games with dark themes or dark aesthetics?',
    a: "The best 'dark cozy' games are: Dave the Diver (overwhelmingly positive on Steam — ocean diving + sushi restaurant with a surprisingly gripping story and high stakes); Cult of the Lamb (adorable cult management + roguelike combat with genuinely dark themes under a cute art style); Dredge (a fishing game set in waters where the fish are wrong and the sea has a memory — Lovecraftian atmosphere, never scary but persistently unsettling); and Potion Craft: Alchemist Simulator (medieval alchemy puzzle with moral complexity — you choose who deserves the potions you brew). For something darker and more emotionally heavy, Spiritfarer handles grief and death in a warm, cozy format. Take the Dark Cozy Games Quiz to find which one matches your specific tolerance for darkness and preferred gameplay style.",
  },
  {
    q: 'What is the best first roguelike game for someone who has never played one?',
    a: "The best first roguelike depends entirely on what you want: Hades (PC/Switch/PlayStation/Xbox, ~$25) if you want a story with characters you care about and fast action combat — the best roguelike for cozy game players. Vampire Survivors (PC/Xbox Game Pass ~$3, iOS/Android free) if you want the simplest possible entry with minimal decisions and maximum visual satisfaction. Slay the Spire (PC/Switch/iOS/Android, ~$25) if you want deep strategic deckbuilding with no time pressure. Balatro (PC/Switch/PlayStation/Xbox/iOS/Android, ~$15) if you want poker-based multiplier discovery that won Game of the Year 2024. All four are considered beginner-friendly despite being roguelikes. Take the Which Roguelike Should You Start With quiz above to get a personalized match based on your specific preferences.",
  },
  {
    q: 'What cozy game should I play when I am stressed, anxious, or burned out?',
    a: "The best cozy games for stress, anxiety, and burnout are: PowerWash Simulator (best for completely switching your brain off — no fail states, no time pressure, pure sensory satisfaction of cleaning); Animal Crossing: New Horizons (best for gentle, zero-pressure creative space that feels genuinely safe); Stardew Valley (best when you want to feel productive without pressure — the daily farming rhythm is grounding); and Spiritfarer (best for emotional catharsis — it processes grief and connection in a warm, cozy format). Take the Cozy Game Mood Quiz to find the right match for exactly how you feel right now.",
  },
]

const FAQ_ZH = [
  {
    q: '星露谷物语最受欢迎的村民是谁？',
    a: '根据粉丝票选，艾比盖尔、莉亚和塞巴斯蒂安始终是最受欢迎的星露谷村民。艾比盖尔以冒险个性和真实感著称；莉亚凭借艺术家背景故事获得大量喜爱；塞巴斯蒂安则在内向型玩家中高度共鸣。潘妮和艾略特也分别以温柔与深度吸引了忠实粉丝群体。',
  },
  {
    q: '星露谷物语最值得结婚的角色是谁？',
    a: '没有唯一正确答案——最适合结婚的角色取决于你的性格和游戏风格。艾比盖尔和莉亚以深度和个性著称最受欢迎，哈维以体贴、塞巴斯蒂安以真实、潘妮以温暖各有拥趸。做上面的「星露谷配对测验」，找到最适合你的那位。',
  },
  {
    q: '2025 年最好玩的农场游戏有哪些？',
    a: '2025 年最受好评的农场游戏包括：星露谷物语（PC/Switch/手机）、动物森友会（Switch）、Palia（PC/Switch，免费）、Hay Day（手机）、模拟农场 25（PC/主机）。每款都在不同方向上是各自品类的最佳。',
  },
  {
    q: '星露谷物语 2025 年还值得玩吗？',
    a: '非常值得。星露谷物语经过 1.6 更新后内容更丰富，仍然是最受欢迎的农场 RPG。约 100 元人民币的价格，被公认为史上性价比最高的游戏之一。',
  },
  {
    q: '哪款农场游戏最适合放松减压？',
    a: '动物森友会和 Cozy Grove 是最适合放松的农场游戏——没有失败机制、没有时间压力、节奏极其温和。喜欢多人联机的话，Palia 也是极其治愈的选择。',
  },
  {
    q: '什么是 Cottagecore 农场美学？',
    a: 'Cottagecore 农场美学是一种浪漫的田园风格，灵感来自乡村生活——野花、蜂蜜罐、手工蜡烛、麻布质感和石砌墙壁。在星露谷物语等农场游戏中，它意味着自然、略微凌乱的农场设计，配色以米白、鼠尾草绿和淡玫瑰为主，颂扬慢生活和亲近自然的生活方式。做上面的「农场美学测试」，找到属于你的精确美学类型。',
  },
  {
    q: '星露谷物语应该选哪种农场类型？',
    a: '最适合的农场类型取决于你的游戏风格：标准农场适合新手和作物型玩家（最大可耕地）；森林农场适合手工和采集型玩家（可再生硬木）；河地农场适合钓鱼和手工艺品爱好者；山顶农场适合挖矿玩家（农场内含采石场）；海滩农场适合挑战型玩家（最难但最独特）。做上面的「星露谷农场类型测试」，获取个性化推荐。',
  },
  {
    q: '有哪些好玩的类星露谷游戏？',
    a: '2025 年最好的星露谷替代品包括：Sun Haven（PC/Switch）——适合想要有多个城镇和深度战斗的完整奇幻 RPG 的玩家；珊瑚岛（PC/PS/Xbox/Switch）——拥有海底潜水机制的生机勃勃热带农场游戏；Fields of Mistria（PC，抢先体验）——适合想在清新中世纪像素风设定中体验星露谷感觉的玩家；沙石镇时光（全平台）——拥有完全配音故事的深度制作和城镇重建游戏。做我们的「星露谷替代品推荐测验」，找到最适合你游戏风格的那款。',
  },
  {
    q: 'Palia 免费吗？Palia 新手应该先做什么？',
    a: '是的——Palia 在 PC（Steam、Epic Games Store）和 Nintendo Switch 上完全免费下载和游玩。没有体力计时器、没有付费赢机制、没有强制广告。外观购买是可选的。对于新手，最好的第一步是：完成新手任务以解锁你的地块并认识主要 NPC；尽早建造工作台和种植台；从西红柿或土豆开始一个小花园（最好的早期赚钱来源）；每天和每个 NPC 交谈以获得友谊点数。做我们的「Palia 新手测验」，找出哪个方向——园艺、狩猎、社交还是制作——最适合你。',
  },
  {
    q: 'Nintendo Switch 上最好的 Cozy 游戏是什么？',
    a: 'Switch 上最好的 cozy 游戏取决于你的需求：星露谷物语（约 100 元）适合想要数百小时内容的深度农场 RPG 进度；动物之森：新视野（约 300 元）适合没有失败机制、最放松节奏的创意岛屿装饰；Spiritfarer（约 60 元，促销时约 20 元）适合 Switch 上情感最强大的治愈故事；Disney Dreamlight Valley（免费）适合想要角色任务和心爱 Disney 角色的粉丝。做我们的「Switch Cozy 游戏推荐测验」，找到你的匹配。',
  },
  {
    q: '最好的手机农场游戏是什么？',
    a: '最好的手机农场游戏取决于你的偏好：Hay Day（免费，iOS/Android）最适合有社交功能和社区竞赛的经典生产链农业；星露谷物语（4.99 美元，iOS/Android）是没有任何游戏内购的最完整无计时器农场 RPG；Township（免费，iOS/Android）最适合想要将农业与城镇建设和活跃合作团队结合的玩家；动物之森：口袋营地（免费，iOS/Android）最适合想在手机上体验该系列的动物森友会粉丝。做我们的「手机农场游戏推荐测验」，找到适合你的那款。',
  },
  {
    q: 'Spiritfarer 值得玩吗？它很悲伤吗？',
    a: '是的——Spiritfarer 绝对值得玩。它被广泛认为是有史以来最好的 cozy 游戏之一，经常出现在最具情感冲击力游戏的榜单上。是的，它会让许多玩家哭泣——它讲述的是陪伴灵魂（受开发者生活中真实人物启发）走过死亡并放手的故事。然而，它不是一款令人沮丧的悲伤游戏；它是关于悲伤、联系和我们留下的东西的温暖、充满希望的沉思。经营和制作系统有趣而令人满足，写作水准极高。做我们的「Spiritfarer 角色测验」，找到你最像哪位灵魂。',
  },
  {
    q: '完全没有玩过电子游戏的人，最容易上手的 cozy 游戏是什么？',
    a: '动物之森：新视野是真正没有游戏经验的新手最容易上手的 cozy 游戏。它专门设计成没有任何失败方式：你永远不会死亡、任何活动都没有时间压力、作物不会枯萎、没有敌人。你的岛屿在几天和几周内按你的现实世界时钟成长，永远不会催促你。第二推荐是 Disney Dreamlight Valley（也可免费下载）——它使用熟悉的 Disney 角色创造即时的情感背景，消除了学习陌生世界的疏离感。做上面的「Cozy 游戏新手入门测验」，获取个性化的第一款游戏推荐。',
  },
  {
    q: '对于新手来说，动物之森比星露谷更好吗？',
    a: '对于完全的新手，动物之森：新视野更温和，因为它有零失败状态——你字面意义上不可能做任何错误的事情。星露谷物语比大多数游戏更宽容，但有轻微的时间管理元素（每日体力、季节性作物、松散的第一年目标），一些第一次玩游戏的人会觉得稍微有点结构化。两款都是很棒的第一款 cozy 游戏；正确的选择取决于你是想要没有任何结构的纯粹创意自由（动物之森），还是想要对进度目标和 RPG 元素的温和介绍（星露谷物语）。做「Cozy 游戏新手入门测验」，根据你的具体优先级获得推荐。',
  },
  {
    q: '有哪些有黑暗主题或暗色系美学的 cozy 游戏推荐？',
    a: '最好的"暗色系 cozy"游戏是：Dave the Diver（Steam 极度好评——海洋潜水 + 寿司餐厅，有出人意料的引人入胜故事和高风险）；羔羊邪教（可爱邪教管理 + roguelike 战斗，在可爱美术风格下有真正的黑暗主题）；Dredge（一款设置在鱼不对劲、海洋有记忆的水域的钓鱼游戏——洛夫克拉夫特式氛围，从不恐怖但持续令人不安）；以及 Potion Craft: 炼金师模拟器（有道德复杂性的中世纪炼金谜题——你选择谁值得得到你调制的药水）。想要更深度情感体验的，Spiritfarer 以温暖的 cozy 方式处理悲伤和死亡。做「暗色系 Cozy 游戏测验」，找出哪款游戏最符合你对黑暗的接受度和首选游戏风格。',
  },
  {
    q: '从未玩过 Roguelike 的人，第一款应该选哪个？',
    a: '最好的第一款 roguelike 完全取决于你想要什么：黑帝斯（PC/Switch/PlayStation/Xbox，约 25 美元）——如果你想要有你关心的角色的故事和快速动作战斗——cozy 游戏玩家的最佳 roguelike。吸血鬼幸存者（PC/Xbox Game Pass 约 3 美元，iOS/Android 免费）——如果你想要最简单的入门，决策最少，视觉满足感最大。杀戮尖塔（PC/Switch/iOS/Android，约 25 美元）——如果你想要没有时间压力的深度策略卡组构建。Balatro（PC/Switch/PlayStation/Xbox/iOS/Android，约 15 美元）——如果你想要赢得 2024 年年度最佳游戏的基于扑克的乘数发现游戏。尽管是 roguelike，但这四款都被认为对新手友好。做上面的「入门 Roguelike 推荐测验」，根据你的具体偏好获得个性化匹配。',
  },
  {
    q: '压力大、焦虑或倦怠时应该玩什么 cozy 游戏？',
    a: '压力、焦虑和倦怠时最好的 cozy 游戏是：PowerWash Simulator（最适合完全关闭大脑——没有失败状态、没有时间压力、清洁的纯感官满足）；动物之森：新视野（最适合感觉真正安全的温和零压力创意空间）；星露谷物语（最适合想要在没有压力的情况下感到有成效——每日农业节律有稳定作用）；以及 Spiritfarer（最适合情感宣泄——它以温暖的 cozy 形式处理悲伤和联系）。做「根据心情选 Cozy 游戏测验」，找到最适合你现在感受的游戏。',
  },
]

export default async function QuizzesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'
  const faq = isZh ? FAQ_ZH : FAQ_EN

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-12">
          <p className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">
            {isZh ? '互动测评' : 'Interactive Quizzes'}
          </p>
          <h1 className="mb-4 text-4xl font-bold text-[#e8dcc8]">
            {isZh ? '找到你的农场游戏类型' : 'Find Your Farming Game'}
          </h1>
          <p className="max-w-xl text-lg text-[#8a9a7a]">
            {isZh
              ? '测出你的农场玩家类型，找到最适合你的游戏——把结果分享给朋友，看看你们是不是同类农夫。'
              : 'Discover your farming playstyle and find the game that fits you best — then share your results to see if your friends are the same type of farmer.'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {QUIZZES.map((quiz) => (
            <Link
              key={quiz.slug}
              href={`/${locale}/quizzes/${quiz.slug}`}
              className="group relative rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-7 transition-all hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
            >
              {quiz.isNew && (
                <span className="absolute right-4 top-4 rounded-full bg-[#f0a832] px-2 py-0.5 text-xs font-semibold text-[#0f1a0f]">
                  {isZh ? '新上线' : 'NEW'}
                </span>
              )}
              <div className="mb-4 text-4xl">{quiz.emoji}</div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-[#2d5a27] px-2.5 py-0.5 text-xs text-[#8a9a7a]">
                  {isZh ? quiz.tagZh : quiz.tagEn}
                </span>
                <span className="text-xs text-[#4a5a4a]">
                  {isZh ? quiz.timeZh : quiz.timeEn}
                </span>
              </div>
              <h2 className="mb-2 text-xl font-bold text-[#e8dcc8] transition-colors group-hover:text-[#f0a832]">
                {isZh ? quiz.titleZh : quiz.titleEn}
              </h2>
              <p className="text-sm leading-relaxed text-[#8a9a7a]">
                {isZh ? quiz.descZh : quiz.descEn}
              </p>
              <p className="mt-4 text-sm font-medium text-[#f0a832]">
                {isZh ? '开始测评 →' : 'Start quiz →'}
              </p>
            </Link>
          ))}
        </div>

        {/* FAQ Section for SEO/GEO */}
        <div className="mt-20">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于农场游戏的常见问题' : 'Farming Game FAQ'}
          </h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-5">
                <h3 className="mb-2 font-semibold text-[#e8dcc8]">{q}</h3>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
