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
]

const RELATED: Record<string, string[]> = {
  'stardew-season': ['stardew-character', 'stardew-romance', 'stardew-farm-type'],
  'stardew-farm-type': ['stardew-season', 'stardew-character', 'stardew-beginner'],
  'stardew-character': ['stardew-romance', 'stardew-season', 'stardew-farm-type'],
  'stardew-romance': ['stardew-character', 'stardew-season', 'stardew-beginner'],
  'farm-aesthetic': ['stardew-season', 'farm-personality', 'which-farming-game'],
  'farm-personality': ['farm-aesthetic', 'which-farming-game', 'cozy-gamer'],
  'which-farming-game': ['farm-personality', 'cozy-gamer', 'farm-aesthetic'],
  'cozy-gamer': ['which-farming-game', 'farm-personality', 'stardew-character'],
  'stardew-beginner': ['stardew-farm-type', 'stardew-season', 'stardew-character'],
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
