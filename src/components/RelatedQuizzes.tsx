import Link from 'next/link'

interface Quiz {
  slug: string
  emoji: string
  titleZh: string
  titleEn: string
  tagZh: string
  tagEn: string
}

const ALL_QUIZZES: Quiz[] = [
  { slug: 'stardew-season', emoji: '🍃', titleZh: '你是哪个星露谷季节？', titleEn: 'Which Stardew Valley Season Are You?', tagZh: '季节人格', tagEn: 'Season Soul' },
  { slug: 'stardew-farm-type', emoji: '🏡', titleZh: '你适合哪种星露谷农场？', titleEn: 'Which Stardew Valley Farm Type?', tagZh: '农场选择', tagEn: 'Farm Finder' },
  { slug: 'stardew-character', emoji: '🌾', titleZh: '你是哪位星露谷村民？', titleEn: 'Which Stardew Valley Villager Are You?', tagZh: '角色测试', tagEn: 'Character Quiz' },
  { slug: 'stardew-romance', emoji: '💌', titleZh: '你应该和谁在一起？', titleEn: 'Which Stardew Valley Character Should You Romance?', tagZh: '配对测验', tagEn: 'Romance Match' },
  { slug: 'farm-aesthetic', emoji: '🌿', titleZh: '你的农场美学风格？', titleEn: "What's Your Farm Aesthetic?", tagZh: '美学测试', tagEn: 'Aesthetic' },
  { slug: 'farm-personality', emoji: '🌱', titleZh: '你是哪种农场玩家？', titleEn: 'What Kind of Farmer Are You?', tagZh: '人格测试', tagEn: 'Personality' },
  { slug: 'which-farming-game', emoji: '🎮', titleZh: '哪款农场游戏最适合你？', titleEn: 'Which Farming Game Should You Play?', tagZh: '游戏推荐', tagEn: 'Game Finder' },
  { slug: 'cozy-gamer', emoji: '☕', titleZh: '你是 Cozy Gamer 吗？', titleEn: 'Are You a Cozy Gamer?', tagZh: '风格测试', tagEn: 'Cozy Score' },
  { slug: 'stardew-beginner', emoji: '🎯', titleZh: '你是星露谷新手还是老鸟？', titleEn: 'Stardew Valley: Beginner or Pro?', tagZh: '段位测验', tagEn: 'Skill Level' },
  { slug: 'animal-crossing-villager', emoji: '🍃', titleZh: '你是哪位动物森友会村民？', titleEn: 'Which Animal Crossing Villager Are You?', tagZh: '村民测验', tagEn: 'ACNH Quiz' },
  { slug: 'palia-playstyle', emoji: '🌻', titleZh: '你在 Palia 的游戏风格是什么？', titleEn: "What's Your Palia Playstyle?", tagZh: 'Palia 测验', tagEn: 'Palia Quiz' },
  { slug: 'harvest-moon-quiz', emoji: '⛰️', titleZh: '哪款牧场物语最适合你？', titleEn: 'Which Story of Seasons Game Should You Play?', tagZh: '游戏推荐', tagEn: 'SoS Finder' },
  { slug: 'dreamlight-valley-quiz', emoji: '✨', titleZh: '你是哪位 Disney Dreamlight Valley 角色？', titleEn: 'Which Disney Dreamlight Valley Character Are You?', tagZh: 'Disney 测验', tagEn: 'Disney Quiz' },
  { slug: 'stardew-multiplayer', emoji: '🤝', titleZh: '你在星露谷联机里是哪种队友？', titleEn: 'What Kind of Stardew Valley Co-op Partner Are You?', tagZh: '联机测验', tagEn: 'Co-op Quiz' },
  { slug: 'spiritfarer-quiz', emoji: '🦊', titleZh: '你是哪位 Spiritfarer 灵魂？', titleEn: 'Which Spiritfarer Spirit Are You?', tagZh: '角色测验', tagEn: 'Spirit Quiz' },
  { slug: 'mobile-farming-quiz', emoji: '📱', titleZh: '哪款手机农场游戏最适合你？', titleEn: 'Which Mobile Farming Game Is Right for You?', tagZh: '手机游戏', tagEn: 'Mobile Pick' },
  { slug: 'stardew-alternatives', emoji: '🌸', titleZh: '星露谷之后该玩哪款游戏？', titleEn: 'What to Play After Stardew Valley?', tagZh: '游戏推荐', tagEn: 'Next Game' },
  { slug: 'cozy-switch-games', emoji: '🎮', titleZh: '你该在 Switch 上玩哪款 Cozy 游戏？', titleEn: 'Which Cozy Game for Nintendo Switch?', tagZh: 'Switch 推荐', tagEn: 'Switch Pick' },
  { slug: 'palia-beginner-guide', emoji: '🌻', titleZh: 'Palia 新手测验：你该从哪里开始？', titleEn: 'Palia Beginner Quiz: Where to Start?', tagZh: 'Palia 攻略', tagEn: 'Palia Guide' },
  { slug: 'stardew-vs-animal-crossing', emoji: '🌾🍃', titleZh: '星露谷 vs 动物之森：哪款更适合你？', titleEn: 'Stardew Valley vs Animal Crossing Quiz', tagZh: '游戏对比', tagEn: 'vs Quiz' },
  { slug: 'cozy-games-for-couples', emoji: '💑', titleZh: '适合情侣的 Cozy 游戏推荐测验', titleEn: 'Best Cozy Game for Couples Quiz', tagZh: '情侣推荐', tagEn: 'Couple Pick' },
  { slug: 'cozy-games-for-beginners', emoji: '🌱', titleZh: 'Cozy 游戏新手入门测验', titleEn: 'Best Cozy Game for Beginners Quiz', tagZh: '新手入门', tagEn: 'Beginner Pick' },
  { slug: 'cozy-game-mood', emoji: '🌙', titleZh: '根据心情选 Cozy 游戏测验', titleEn: 'What Cozy Game Fits My Mood Quiz', tagZh: '心情推荐', tagEn: 'Mood Pick' },
  { slug: 'cozy-indie-games', emoji: '🏕️', titleZh: '你应该玩哪款独立 Cozy 游戏？', titleEn: 'Which Indie Cozy Game Should You Play?', tagZh: '独立游戏', tagEn: 'Indie Pick' },
  { slug: 'farming-game-challenge', emoji: '⚔️', titleZh: '农场游戏挑战度测验', titleEn: 'How Much Challenge Do You Want? Farming Game Quiz', tagZh: '挑战偏好', tagEn: 'Challenge Quiz' },
  { slug: 'stardew-mods-quiz', emoji: '🔧', titleZh: '星露谷物语模组测验', titleEn: 'Stardew Valley Mods Quiz', tagZh: 'SVE 模组', tagEn: 'Mods Quiz' },
  { slug: 'cozy-dark-games', emoji: '🌑', titleZh: '暗色系 Cozy 游戏测验', titleEn: 'Which Dark Cozy Game Should You Play?', tagZh: '暗色系推荐', tagEn: 'Dark Cozy Pick' },
  { slug: 'cozy-coop-games', emoji: '🤝', titleZh: '合作 Cozy 游戏推荐测验', titleEn: 'Which Co-op Cozy Game Should You Play Together?', tagZh: '合作推荐', tagEn: 'Co-op Pick' },
  { slug: 'cozy-animal-games', emoji: '🐾', titleZh: '动物主题 Cozy 游戏测验', titleEn: 'Which Animal Cozy Game Should You Play?', tagZh: '动物推荐', tagEn: 'Animal Pick' },
  { slug: 'cozy-exploration-games', emoji: '🌿', titleZh: '氛围探索游戏测验', titleEn: 'Which Atmospheric Exploration Game Should You Play?', tagZh: '探索推荐', tagEn: 'Exploration Pick' },
  { slug: 'cozy-builder-games', emoji: '🏘️', titleZh: '放松建造游戏测验', titleEn: 'Which Cozy Builder Game Should You Play?', tagZh: '建造推荐', tagEn: 'Builder Pick' },
  { slug: 'cozy-roguelike-quiz', emoji: '🎲', titleZh: '入门 Roguelike 推荐测验', titleEn: 'Which Roguelike Should You Start With?', tagZh: 'Roguelike 推荐', tagEn: 'Roguelike Pick' },
  { slug: 'cozy-new-2024', emoji: '✨', titleZh: '2024 最佳新 Cozy 游戏测验', titleEn: 'Which New 2024 Cozy Game Should You Play?', tagZh: '2024 年度推荐', tagEn: '2024 Pick' },
  { slug: 'cozy-atmosphere-quiz', emoji: '🌧️', titleZh: '根据氛围找 Cozy 游戏测验', titleEn: 'Which Cozy Game Matches Your Atmosphere?', tagZh: '氛围推荐', tagEn: 'Atmosphere Pick' },
  { slug: 'cozy-short-adventure', emoji: '🌱', titleZh: '短篇 Cozy 冒险游戏推荐测验', titleEn: 'Which Short Cozy Adventure Should You Play?', tagZh: '短篇推荐', tagEn: 'Short Pick' },
  { slug: 'cozy-next-step', emoji: '🌿', titleZh: '星露谷进阶推荐测验', titleEn: 'What to Play After Stardew Valley & Animal Crossing?', tagZh: '进阶推荐', tagEn: 'Next Step Pick' },
  { slug: 'cozy-soundtrack-quiz', emoji: '🎵', titleZh: 'Cozy 游戏原声音乐测验', titleEn: 'Which Cozy Game Soundtrack Matches Your Music Taste?', tagZh: '配乐推荐', tagEn: 'Soundtrack Pick' },
  { slug: 'cozy-creative-2024', emoji: '🏰', titleZh: '2024 创意 Cozy 游戏推荐测验', titleEn: 'Which 2023-2024 Creative Cozy Game Matches Your Style?', tagZh: '创意推荐', tagEn: '2024 Creative Pick' },
  { slug: 'cozy-beyond-cozy', emoji: '🪐', titleZh: 'Cozy 玩家进阶独立游戏推荐测验', titleEn: 'Beyond Cozy: Which Indie Game Should You Try Next?', tagZh: '进阶探索', tagEn: 'Beyond Cozy Pick' },
  { slug: 'cozy-hidden-gems', emoji: '💎', titleZh: 'Cozy 游戏隐藏宝石推荐测验', titleEn: 'Which Underrated Cozy Hidden Gem Should You Play?', tagZh: '隐藏宝石', tagEn: 'Hidden Gem Pick' },
  { slug: 'cozy-play-as-animal', emoji: '🐾', titleZh: '动物主角 Cozy 游戏推荐测验', titleEn: 'Which Game Where You Play as an Animal?', tagZh: '动物主角', tagEn: 'Play as Animal Pick' },
  { slug: 'stardew-fishing-quiz', emoji: '🎣', titleZh: '星露谷钓鱼风格测验', titleEn: 'What Is Your Stardew Valley Fishing Style?', tagZh: '钓鱼攻略', tagEn: 'Fishing Style Guide' },
  { slug: 'cozy-weird-games', emoji: '🤔', titleZh: '奇异 Cozy 游戏推荐测验', titleEn: 'Which Impossible-to-Explain Cozy Game?', tagZh: '奇异推荐', tagEn: 'Weird Cozy Pick' },
  { slug: 'cozy-rpg-quiz', emoji: '🎮', titleZh: 'Cozy 玩家独立 RPG 进阶推荐测验', titleEn: 'Which Indie RPG Is Perfect for a Cozy Gamer?', tagZh: 'RPG 进阶推荐', tagEn: 'Indie RPG Pick' },
  { slug: 'cozy-2023-surprise-hits', emoji: '⭐', titleZh: '2023 年让 Cozy 玩家意外爱上的游戏推荐测验', titleEn: 'Which 2023 Game Would a Cozy Gamer Unexpectedly Love?', tagZh: '2023 惊喜推荐', tagEn: '2023 Surprise Pick' },
  { slug: 'cozy-open-world-quiz', emoji: '🌌', titleZh: '农场游戏玩家的开放世界探索推荐测验', titleEn: 'Which Open-World Exploration Game for Farming Game Fans?', tagZh: '开放世界推荐', tagEn: 'Open World Pick' },
  { slug: 'relationship-sim-quiz', emoji: '💞', titleZh: '以「关系」为核心的游戏推荐测验', titleEn: 'Which Relationship-Driven Game Is Right for You?', tagZh: '社交关系推荐', tagEn: 'Relationship Pick' },
  { slug: 'creature-raising-quiz', emoji: '🫧', titleZh: '生物养成游戏推荐测验', titleEn: 'Which Creature-Raising Game Is Right for You?', tagZh: '生物养成推荐', tagEn: 'Creature Pick' },
  { slug: 'cozy-management-quiz', emoji: '🏗️', titleZh: '管理模拟游戏推荐测验', titleEn: 'Which Management Sim Is Right for Cozy Gamers?', tagZh: '管理模拟推荐', tagEn: 'Management Pick' },
]

const RELATED: Record<string, string[]> = {
  'stardew-season': ['stardew-character', 'stardew-romance', 'stardew-farm-type'],
  'stardew-farm-type': ['stardew-season', 'stardew-character', 'stardew-beginner'],
  'stardew-character': ['stardew-romance', 'stardew-multiplayer', 'stardew-season'],
  'stardew-romance': ['stardew-character', 'stardew-season', 'stardew-beginner'],
  'farm-aesthetic': ['stardew-season', 'farm-personality', 'palia-playstyle'],
  'farm-personality': ['farm-aesthetic', 'which-farming-game', 'harvest-moon-quiz'],
  'which-farming-game': ['harvest-moon-quiz', 'dreamlight-valley-quiz', 'palia-playstyle'],
  'cozy-gamer': ['dreamlight-valley-quiz', 'animal-crossing-villager', 'which-farming-game'],
  'stardew-beginner': ['stardew-multiplayer', 'stardew-farm-type', 'stardew-season'],
  'animal-crossing-villager': ['dreamlight-valley-quiz', 'stardew-character', 'cozy-gamer'],
  'palia-playstyle': ['which-farming-game', 'farm-personality', 'cozy-gamer'],
  'harvest-moon-quiz': ['which-farming-game', 'farm-personality', 'cozy-gamer'],
  'dreamlight-valley-quiz': ['animal-crossing-villager', 'which-farming-game', 'cozy-gamer'],
  'stardew-multiplayer': ['stardew-beginner', 'stardew-character', 'stardew-farm-type'],
  'spiritfarer-quiz': ['cozy-gamer', 'which-farming-game', 'farm-personality'],
  'mobile-farming-quiz': ['which-farming-game', 'cozy-gamer', 'farm-personality'],
  'stardew-alternatives': ['which-farming-game', 'harvest-moon-quiz', 'stardew-season'],
  'cozy-switch-games': ['which-farming-game', 'cozy-gamer', 'dreamlight-valley-quiz'],
  'palia-beginner-guide': ['palia-playstyle', 'which-farming-game', 'cozy-gamer'],
  'stardew-vs-animal-crossing': ['stardew-season', 'animal-crossing-villager', 'cozy-switch-games'],
  'cozy-games-for-couples': ['stardew-multiplayer', 'palia-beginner-guide', 'cozy-switch-games'],
  'cozy-games-for-beginners': ['which-farming-game', 'cozy-switch-games', 'palia-beginner-guide'],
  'cozy-game-mood': ['spiritfarer-quiz', 'cozy-gamer', 'which-farming-game'],
  'cozy-indie-games': ['spiritfarer-quiz', 'cozy-game-mood', 'cozy-gamer'],
  'farming-game-challenge': ['which-farming-game', 'harvest-moon-quiz', 'farm-personality'],
  'stardew-mods-quiz': ['stardew-beginner', 'stardew-alternatives', 'stardew-multiplayer'],
  'cozy-dark-games': ['spiritfarer-quiz', 'cozy-game-mood', 'cozy-indie-games'],
  'cozy-coop-games': ['stardew-multiplayer', 'cozy-games-for-couples', 'cozy-switch-games'],
  'cozy-animal-games': ['animal-crossing-villager', 'cozy-indie-games', 'cozy-game-mood'],
  'cozy-exploration-games': ['spiritfarer-quiz', 'cozy-dark-games', 'cozy-indie-games'],
  'cozy-builder-games': ['farm-aesthetic', 'cozy-indie-games', 'cozy-exploration-games'],
  'cozy-roguelike-quiz': ['cozy-dark-games', 'cozy-indie-games', 'cozy-exploration-games'],
  'cozy-new-2024': ['cozy-indie-games', 'cozy-builder-games', 'cozy-roguelike-quiz'],
  'cozy-atmosphere-quiz': ['cozy-game-mood', 'cozy-exploration-games', 'cozy-dark-games'],
  'cozy-short-adventure': ['cozy-exploration-games', 'cozy-atmosphere-quiz', 'cozy-indie-games'],
  'cozy-next-step': ['stardew-alternatives', 'cozy-indie-games', 'cozy-games-for-beginners'],
  'cozy-soundtrack-quiz': ['cozy-atmosphere-quiz', 'cozy-short-adventure', 'cozy-indie-games'],
  'cozy-creative-2024': ['cozy-builder-games', 'cozy-new-2024', 'cozy-indie-games'],
  'cozy-beyond-cozy': ['cozy-dark-games', 'cozy-short-adventure', 'cozy-creative-2024'],
  'cozy-hidden-gems': ['cozy-beyond-cozy', 'cozy-indie-games', 'cozy-atmosphere-quiz'],
  'cozy-play-as-animal': ['cozy-hidden-gems', 'cozy-indie-games', 'cozy-short-adventure'],
  'stardew-fishing-quiz': ['stardew-beginner', 'stardew-mods-quiz', 'stardew-multiplayer'],
  'cozy-weird-games': ['cozy-short-adventure', 'cozy-atmosphere-quiz', 'cozy-hidden-gems'],
  'cozy-rpg-quiz': ['cozy-beyond-cozy', 'cozy-hidden-gems', 'cozy-dark-games'],
  'cozy-2023-surprise-hits': ['cozy-rpg-quiz', 'cozy-beyond-cozy', 'cozy-new-2024'],
  'cozy-open-world-quiz': ['cozy-rpg-quiz', 'cozy-2023-surprise-hits', 'cozy-beyond-cozy'],
  'relationship-sim-quiz': ['stardew-romance', 'stardew-alternatives', 'cozy-rpg-quiz'],
  'creature-raising-quiz': ['cozy-rpg-quiz', 'cozy-2023-surprise-hits', 'cozy-beyond-cozy'],
  'cozy-management-quiz': ['cozy-builder-games', 'farming-game-challenge', 'cozy-new-2024'],
}

interface Props {
  currentSlug: string
  locale: string
}

export function RelatedQuizzes({ currentSlug, locale }: Props) {
  const isZh = locale === 'zh'
  const relatedSlugs = RELATED[currentSlug] ?? ALL_QUIZZES.filter((q) => q.slug !== currentSlug).slice(0, 3).map((q) => q.slug)
  const related = relatedSlugs.map((s) => ALL_QUIZZES.find((q) => q.slug === s)).filter(Boolean) as Quiz[]

  return (
    <div className="mt-12">
      <h2 className="mb-4 text-lg font-bold text-[#e8dcc8]">
        {isZh ? '还有这些测评你可能也会喜欢' : 'More quizzes you might enjoy'}
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {related.map((quiz) => (
          <Link
            key={quiz.slug}
            href={`/${locale}/quizzes/${quiz.slug}`}
            className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 p-4 transition-all hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
          >
            <div className="mb-2 text-2xl">{quiz.emoji}</div>
            <p className="mb-1 text-xs text-[#4a5a4a]">
              {isZh ? quiz.tagZh : quiz.tagEn}
            </p>
            <p className="text-sm font-medium leading-snug text-[#e8dcc8] transition-colors group-hover:text-[#f0a832]">
              {isZh ? quiz.titleZh : quiz.titleEn}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
