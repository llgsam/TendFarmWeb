import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { CozyManagementQuiz } from '@/components/tools/CozyManagementQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-management-quiz`

  const faqItems = isZh
    ? [
        { q: 'Two Point Campus 值得买吗？', a: 'Two Point Campus 非常值得——尤其是通过 Xbox Game Pass 游玩时几乎无成本。游戏评分约 80-84 分，你管理一所拥有奇特课程的大学（骑士学校、间谍学校、美食学），需要平衡学生满意度、员工管理和建筑设计。比 Two Point Hospital 更轻松，非常适合农场游戏玩家。' },
        { q: 'Planet Zoo 值得买吗？', a: 'Planet Zoo 对于热爱设计和创意建造的玩家来说绝对值得。它拥有有史以来最详细的动物福利系统，300+ 种真实动物，以及完全自由的栖息地设计工具。学习曲线较陡，但 Steam 创意工坊提供了大量免费蓝图来帮助入门。基础游戏约 45 美元，经常大幅特价。' },
        { q: 'Two Point Hospital 值得买吗？', a: 'Two Point Hospital 非常值得，是管理类游戏中性价比最高的选择之一，Metacritic 评分 85。游戏有 15+ 个医院场景，病人病症荒诞可笑（头晕目眩、小丑感染），管理挑战真实而有深度。Xbox Game Pass 可玩。农场游戏玩家会喜欢它的日常优化循环。' },
        { q: 'Planet Coaster 2 值得买吗？', a: 'Planet Coaster 2 对于喜欢创意建造的玩家非常值得。2024 年 11 月发行，新增完整水上乐园支持、过山车入水设计和改进的地形雕刻系统。自定义过山车建造器是游戏核心，可以工程师般精确设计每段轨道。约 50 美元，适合想要最高创意自由度的管理游戏玩家。' },
        { q: '有哪些像星露谷物语的管理经营游戏？', a: '最接近星露谷物语的管理经营游戏包括：Two Point Campus（轻松的大学管理，Game Pass 可玩）、Planet Zoo（创意建造 + 动物福利系统，类似农场设计）、Two Point Hospital（高节奏优化，Game Pass 可玩）。如果你喜欢星露谷的农场布局规划，Planet Zoo 的栖息地设计会给你同样的满足感。做上面的测验找到最适合你的那一款。' },
      ]
    : [
        { q: 'Is Two Point Campus worth it?', a: 'Two Point Campus is absolutely worth it — especially on Xbox Game Pass where it is essentially free to try. Metacritic score approximately 80-84, it puts you in charge of a university with absurd courses (Knight School, Spy School, Gastronomy) while managing student happiness, staff, and buildings. More forgiving than Two Point Hospital, and excellent for farming game fans who love optimization loops.' },
        { q: 'Is Planet Zoo worth it?', a: 'Planet Zoo is absolutely worth it for players who love creative design and building. It has the most detailed animal welfare systems of any zoo game, 300+ real animal species, and fully free-form habitat design tools. The learning curve is steep, but the Steam Workshop provides thousands of free blueprints to help you start. Base game about $45, frequently on deep sale.' },
        { q: 'Is Two Point Hospital worth it?', a: 'Two Point Hospital is absolutely worth it — one of the best value management games available, Metacritic 85. It features 15+ hospital scenarios with absurdly funny patient conditions (Lightheadedness, Jest Infection) and genuine management depth. Available on Xbox Game Pass. Farming game players will love its daily optimization loop applied to running a chaotic comedy hospital.' },
        { q: 'Is Planet Coaster 2 worth it?', a: 'Planet Coaster 2 is worth it for players who love creative building. Released November 2024, it adds full water park support, dive coasters, and improved terrain sculpting to the beloved original. The custom coaster builder is the centrepiece — you engineer every track segment by hand. About $50, best for players who want the most creative freedom of any management sim.' },
        { q: 'What are the best management games similar to Stardew Valley?', a: 'The best management games for Stardew Valley fans are: Two Point Campus (relaxed university management on Game Pass); Planet Zoo (creative habitat building with a design loop similar to farm layout planning); Two Point Hospital (high-pace optimization on Game Pass). If you love Stardew Valley\'s farm layout planning, Planet Zoo\'s habitat design will give you the same satisfaction at zoo scale. Take the quiz above to find your match.' },
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
    name: isZh ? '哪款管理模拟游戏最适合 Cozy 玩家？' : 'Which Management Sim Is Right for Cozy Gamers?',
    description: isZh
      ? '6 个问题，从 Two Point Campus、Planet Zoo、Two Point Hospital、Planet Coaster 2 中找到你的管理游戏'
      : '6 questions to match you with Two Point Campus, Planet Zoo, Two Point Hospital, or Planet Coaster 2',
    url: canonical,
  }

  return {
    title: isZh
      ? '哪款管理模拟游戏最适合你？Two Point Campus / Planet Zoo / Two Point Hospital / Planet Coaster 2 | Farm Game Hub'
      : 'Which Management Sim Is Right for Cozy Gamers? Two Point Campus vs Planet Zoo vs Two Point Hospital vs Planet Coaster 2 | Farm Game Hub',
    description: isZh
      ? '6 个问题找到你的管理经营游戏：大学管理（Two Point Campus）、动物园设计（Planet Zoo）、医院经营（Two Point Hospital），或主题公园建造（Planet Coaster 2）。'
      : '6 questions to find your management sim: university (Two Point Campus), zoo design (Planet Zoo), hospital management (Two Point Hospital), or theme park building (Planet Coaster 2).',
    keywords: isZh
      ? ['管理模拟游戏推荐', 'Two Point Campus 值得买吗', 'Planet Zoo 值得买吗', 'Two Point Hospital 值得买吗', 'Planet Coaster 2 值得买吗', '类星露谷管理游戏', 'Cozy 玩家经营游戏', '动物园模拟游戏', '主题公园游戏']
      : ['which management sim to play', 'two point campus worth it', 'planet zoo worth it', 'two point hospital worth it', 'planet coaster 2 worth it', 'management games like stardew valley', 'cozy tycoon games', 'best zoo management game', 'best theme park game 2024'],
    alternates: {
      canonical,
      languages: buildLanguageAlternates('/quizzes/cozy-management-quiz'),
    },
    other: {
      'script:ld+json:faq': JSON.stringify(faqSchema),
      'script:ld+json:quiz': JSON.stringify(quizSchema),
    },
  }
}

export default async function CozyManagementQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const faqItems = isZh
    ? [
        { q: 'Two Point Campus 值得买吗？', a: 'Two Point Campus 非常值得——尤其是通过 Xbox Game Pass 游玩时几乎无成本。游戏评分约 80-84 分，你管理一所拥有奇特课程的大学（骑士学校、间谍学校、美食学），需要平衡学生满意度、员工管理和建筑设计。比 Two Point Hospital 更轻松，非常适合农场游戏玩家。' },
        { q: 'Planet Zoo 值得买吗？', a: 'Planet Zoo 对于热爱设计和创意建造的玩家来说绝对值得。它拥有有史以来最详细的动物福利系统，300+ 种真实动物，以及完全自由的栖息地设计工具。学习曲线较陡，但 Steam 创意工坊提供了大量免费蓝图来帮助入门。基础游戏约 45 美元，经常大幅特价。' },
        { q: 'Two Point Hospital 值得买吗？', a: 'Two Point Hospital 非常值得，是管理类游戏中性价比最高的选择之一，Metacritic 评分 85。游戏有 15+ 个医院场景，病人病症荒诞可笑（头晕目眩、小丑感染），管理挑战真实而有深度。Xbox Game Pass 可玩。农场游戏玩家会喜欢它的日常优化循环。' },
        { q: 'Planet Coaster 2 值得买吗？', a: 'Planet Coaster 2 对于喜欢创意建造的玩家非常值得。2024 年 11 月发行，新增完整水上乐园支持、过山车入水设计和改进的地形雕刻系统。自定义过山车建造器是游戏核心，可以工程师般精确设计每段轨道。约 50 美元，适合想要最高创意自由度的管理游戏玩家。' },
        { q: '有哪些像星露谷物语的管理经营游戏？', a: '最接近星露谷物语的管理经营游戏包括：Two Point Campus（轻松的大学管理，Game Pass 可玩）、Planet Zoo（创意建造 + 动物福利系统，类似农场设计）、Two Point Hospital（高节奏优化，Game Pass 可玩）。如果你喜欢星露谷的农场布局规划，Planet Zoo 的栖息地设计会给你同样的满足感。做上面的测验找到最适合你的那一款。' },
      ]
    : [
        { q: 'Is Two Point Campus worth it?', a: 'Two Point Campus is absolutely worth it — especially on Xbox Game Pass where it is essentially free to try. Metacritic score approximately 80-84, it puts you in charge of a university with absurd courses (Knight School, Spy School, Gastronomy) while managing student happiness, staff, and buildings. More forgiving than Two Point Hospital, and excellent for farming game fans who love optimization loops.' },
        { q: 'Is Planet Zoo worth it?', a: 'Planet Zoo is absolutely worth it for players who love creative design and building. It has the most detailed animal welfare systems of any zoo game, 300+ real animal species, and fully free-form habitat design tools. The learning curve is steep, but the Steam Workshop provides thousands of free blueprints to help you start. Base game about $45, frequently on deep sale.' },
        { q: 'Is Two Point Hospital worth it?', a: 'Two Point Hospital is absolutely worth it — one of the best value management games available, Metacritic 85. It features 15+ hospital scenarios with absurdly funny patient conditions (Lightheadedness, Jest Infection) and genuine management depth. Available on Xbox Game Pass. Farming game players will love its daily optimization loop applied to running a chaotic comedy hospital.' },
        { q: 'Is Planet Coaster 2 worth it?', a: 'Planet Coaster 2 is worth it for players who love creative building. Released November 2024, it adds full water park support, dive coasters, and improved terrain sculpting to the beloved original. The custom coaster builder is the centrepiece — you engineer every track segment by hand. About $50, best for players who want the most creative freedom of any management sim.' },
        { q: 'What are the best management games similar to Stardew Valley?', a: 'The best management games for Stardew Valley fans are: Two Point Campus (relaxed university management on Game Pass); Planet Zoo (creative habitat building with a design loop similar to farm layout planning); Two Point Hospital (high-pace optimization on Game Pass). If you love Stardew Valley\'s farm layout planning, Planet Zoo\'s habitat design will give you the same satisfaction at zoo scale. Take the quiz above to find your match.' },
      ]

  return (
    <div className="min-h-screen bg-[#0f1a0f] text-[#e8dcc8]">
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold leading-tight text-[#e8dcc8]">{isZh ? '管理模拟 · 游戏推荐测验' : 'Management Sim · Game Finder Quiz'}</h1>
        </div>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-6 shadow-xl">
          <CozyManagementQuiz locale={locale} />
        </div>

        <RelatedQuizzes currentSlug="cozy-management-quiz" locale={locale} />

        <section className="mt-12">
          <h2 className="mb-6 text-lg font-bold text-[#e8dcc8]">
            {locale === 'zh' ? '常见问题' : locale === 'zh-TW' ? '常見問題' : locale === 'ja' ? 'よくある質問' : locale === 'ko' ? '자주 묻는 질문' : locale === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-6">
            {faqItems.map(({ q, a }, i) => (
              <div key={i}>
                <h3 className="mb-2 font-semibold text-[#f0a832]">{q}</h3>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            }),
          }}
        />
      </main>
    </div>
  )
}
