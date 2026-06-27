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
