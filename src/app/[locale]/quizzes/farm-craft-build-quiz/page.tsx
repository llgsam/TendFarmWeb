import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { FarmCraftBuildQuiz } from '@/components/tools/FarmCraftBuildQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

const SLUG = 'farm-craft-build-quiz'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'

  return {
    title: isZh
      ? '农场制作建造游戏推荐测验 | Forager / Garden Paws / Staxel / Havendock'
      : 'Which Farm Craft & Build Game Is Right for You? | Forager vs Garden Paws vs Staxel vs Havendock',
    description: isZh
      ? '你是沙盒扩张型还是社区经营型？通过6道题，从Forager、Garden Paws、Staxel、Havendock中找到最适合你风格的农场制作建造游戏。'
      : 'Are you an addicted expansionist or a peaceful ocean farmer? Take this 6-question quiz to discover whether Forager, Garden Paws, Staxel, or Havendock matches your farm-craft-build style.',
    keywords: isZh
      ? [
          'Forager游戏值得买吗',
          'Garden Paws游戏测评',
          'Staxel游戏推荐',
          'Havendock游戏值得玩吗',
          '农场制作游戏推荐',
          '建造农场游戏2024',
          'Forager vs Stardew Valley',
          '沙盒农场游戏推荐',
          '放置农场游戏PC',
          '体素农场游戏像Minecraft',
        ]
      : [
          'forager game worth it',
          'garden paws review',
          'staxel game review',
          'havendock game worth it',
          'farm craft build game quiz',
          'farming games with building',
          'forager vs stardew valley',
          'minecraft style farming game',
          'best farming and crafting games',
          'open world farming games pc switch',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/${SLUG}`,
      languages: buildLanguageAlternates(`/quizzes/${SLUG}`),
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'

  const faqItems = isZh
    ? [
        {
          q: 'Forager 适合喜欢星露谷的玩家吗？',
          a: 'Forager 和星露谷都有农耕要素，但节奏截然不同。Forager 更像放置游戏，奖励反馈极快，解锁内容速度远超星露谷；星露谷更注重社区关系和日常节奏。如果你在星露谷里最喜欢升级制作和快速满足感，Forager 会让你上瘾。如果你更喜欢聊天交友和季节仪式感，Forager 可能节奏过快。',
        },
        {
          q: 'Garden Paws 和动物森友会有什么区别？',
          a: 'Garden Paws 常被称为"有真实农耕系统的动物森友会"。两者都有拟人化动物村民、季节活动和温馨岛屿氛围，但 Garden Paws 加入了更深入的农耕系统、个人商店经营和手工制作链，而动物森友会刻意省略了这些。Garden Paws 没有任天堂那种精致打磨，但农耕深度和商店管理玩法是动森完全没有的体验。',
        },
        {
          q: 'Staxel 对比 Minecraft 哪个更适合农耕爱好者？',
          a: 'Staxel 在相同的体素美学框架下，把重心从生存和探索转向了农耕和社区生活。如果你在 Minecraft 里最享受的是建造和规划，但对每次都要从零开始生存感到疲惫，Staxel 提供了一个温馨的村庄起点和明确的社区目标，让建造行为更有意义。对农耕爱好者来说，Staxel 的季节系统、作物类型和社区活动比原版 Minecraft 丰富得多。',
        },
        {
          q: 'Havendock 目前还在抢先体验，值得购买吗？',
          a: '截至2024年，Havendock 的抢先体验内容已经相当完整，提供了独特的漂浮平台农耕体验，开发者更新活跃。如果你对海洋农耕漂浮基地的独特设定感兴趣，而且能接受早期访问游戏的不完整性，目前已值得入手。建议关注 Steam 评测的最新状态，确认当前版本是否符合你的期待。',
        },
        {
          q: '这四款游戏里哪款最适合联机和朋友一起玩？',
          a: 'Garden Paws 和 Staxel 都有强大的多人游戏支持，但侧重点不同。Garden Paws 允许朋友访问你的岛屿并一起参加季节活动，社交互动更自然；Staxel 支持多名玩家共同建设同一个村庄，各自拥有独立农场，更适合长期合作建设项目。Forager 主要是单人体验，Havendock 目前也以单人为主。',
        },
      ]
    : [
        {
          q: 'Is Forager worth it in 2024 and how does it compare to Stardew Valley?',
          a: 'Forager remains worth it for players who enjoy rapid progression loops and the "just one more thing" addictive quality of idle games. It is shorter than Stardew Valley — most players complete the main content in 15-25 hours — but that focused experience is densely packed with unlocks and discoveries. Compared to Stardew, Forager trades depth of relationships and seasonal ritual for speed of progression and immediate feedback. It is an excellent complement to Stardew rather than a replacement. Many players finish Stardew first and turn to Forager when they want that same satisfaction at a much faster tempo.',
        },
        {
          q: 'Does Garden Paws have enough content for long-term play or does it get repetitive?',
          a: 'Garden Paws has received consistent updates since its 2019 launch, significantly expanding content over time. New items, islands, seasonal events, and quality-of-life improvements have been added regularly, extending the long-term play loop well beyond the base game. That said, it is a lighter game than Stardew Valley in terms of narrative depth and character complexity — it excels at providing a relaxing daily loop rather than a story-driven progression. Players who enjoy decorating, community events, and shop management will find plenty of content; players who need strong narrative hooks may exhaust it faster.',
        },
        {
          q: 'What kind of player is Staxel best suited for compared to other farming games?',
          a: 'Staxel is best suited for players who feel that most farming games do not give them enough creative control over how the world looks. If you find yourself wishing you could reshape the layout of a town, build custom structures, or fundamentally redesign the landscape rather than just decorating a fixed farm plot, Staxel gives you that power within a farming community context. It particularly appeals to Minecraft players who want warmer, more goal-oriented gameplay, and to Stardew players who spend most of their time decorating rather than farming efficiently.',
        },
        {
          q: 'How does Havendock handle the farming loop compared to land-based farming games?',
          a: 'Havendock recontextualizes farming by making the space itself a resource — every new farming plot requires expanding your floating platform into the ocean, so agricultural expansion is physically connected to base building in a way that land-based games do not require. Crops grow on platforms you have constructed, fishing happens directly from your dock edges, and the ocean environment creates weather and lighting conditions that feel distinctly different from pastoral land-based settings. The farming loop is slightly more survival-adjacent than pure cozy games, with a gentle resource pressure that makes each harvest feel meaningful rather than routine.',
        },
        {
          q: 'Are any of these games available on Nintendo Switch and do they run well there?',
          a: 'Forager runs excellently on Nintendo Switch and is actually considered one of the better console farming/idle game experiences — the pick-up-and-put-down nature of Switch play suits its addictive loop perfectly. Garden Paws is also available on Switch with solid performance. Staxel has a Switch version, though the PC version is generally preferred for its full keyboard/mouse building experience. Havendock is currently PC-only (Steam Early Access). For pure Switch play, Forager or Garden Paws are the stronger recommendations of this group.',
        },
      ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh
      ? '农场制作建造游戏推荐测验'
      : 'Which Farm Craft & Build Game Is Right for You?',
    description: isZh
      ? '通过6道题，从Forager、Garden Paws、Staxel、Havendock中找到最适合你的农场制作建造游戏。'
      : '6 questions to match your play style to Forager, Garden Paws, Staxel, or Havendock.',
    url: `${BASE_URL}/${locale}/quizzes/${SLUG}`,
    educationalLevel: 'beginner',
    about: {
      '@type': 'Thing',
      name: isZh ? '农场制作建造游戏' : 'Farm Craft and Build Games',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      <main className="min-h-screen bg-[#0f1a0f] px-4 py-12 text-[#e8dcc8]">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mb-3 text-5xl">⛏️</div>
            <h1 className="mb-3 text-2xl font-bold leading-tight text-[#f0a832] md:text-3xl">
              {isZh
                ? '农场制作建造游戏推荐测验'
                : 'Which Farm Craft & Build Game Is Right for You?'}
            </h1>
            <p className="text-[#8a9a7a]">
              {isZh
                ? 'Forager · Garden Paws · Staxel · Havendock — 6道题找到最适合你的游戏'
                : 'Forager · Garden Paws · Staxel · Havendock — 6 questions to find your match'}
            </p>
          </div>

          <FarmCraftBuildQuiz locale={locale} />

          <section className="mt-16">
            <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">
              {isZh ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-5">
              {faqItems.map(({ q, a }, i) => (
                <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 p-5">
                  <h3 className="mb-2 font-semibold text-[#f0a832]">{q}</h3>
                  <p className="text-sm leading-relaxed text-[#c8bca8]">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12">
            <RelatedQuizzes currentSlug={SLUG} locale={locale} />
          </div>
        </div>
      </main>
    </>
  )
}
