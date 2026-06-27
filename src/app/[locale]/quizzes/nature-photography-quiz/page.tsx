import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { NaturePhotographyQuiz } from '@/components/tools/NaturePhotographyQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

const SLUG = 'nature-photography-quiz'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'

  return {
    title: isZh
      ? '治愈自然摄影游戏推荐测验 | 新宝可梦随乐拍 / Alba / Toem / Umurangi Generation'
      : 'Which Cozy Nature Photography Game Is Right for You? | Pokémon Snap vs Alba vs Toem vs Umurangi Generation',
    description: isZh
      ? '你是宝可梦摄影达人还是环保行动者？6道题从新宝可梦随乐拍、Alba野生动物大冒险、Toem和Umurangi Generation中找到最适合你的自然摄影游戏。'
      : 'Wildlife collector or conservation activist? 6 questions to find your cozy nature photography game across New Pokémon Snap, Alba, Toem, and Umurangi Generation.',
    keywords: isZh
      ? [
          '新宝可梦随乐拍值得买吗',
          'Alba野生动物大冒险评测',
          'Toem游戏推荐',
          'Umurangi Generation评测',
          '治愈摄影游戏推荐',
          '自然观察游戏Switch',
          '环保主题游戏2024',
          '摄影冒险游戏',
          '黑白画风游戏推荐',
          '宝可梦摄影游戏',
        ]
      : [
          'new pokemon snap worth it 2024',
          'alba wildlife adventure review',
          'toem game review',
          'umurangi generation review',
          'cozy nature photography game quiz',
          'photography game recommendation',
          'best photography games switch pc',
          'conservation game recommendation',
          'nature observation games for cozy gamers',
          'pokemon snap successor alternative',
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
          q: '新宝可梦随乐拍和原版宝可梦随乐拍相比有多大改进，值得在Switch上入手吗？',
          a: '新宝可梦随乐拍在视觉效果、内容量和系统深度上都是对原版的全面提升。原版1999年的N64游戏拥有63种宝可梦分布在少数几个关卡；新版有200多种宝可梦分布在多个具有昼夜变化和多条隐藏路径的生物群落。评分系统更加深入，研究等级进度系统提供了更多重玩价值，而摄影机制也更加精致。如果你对宝可梦IP有情感依附，这是非常值得的Switch游戏之一。如果你对宝可梦不感兴趣，Alba或Toem可能是更好的纯摄影游戏体验。',
        },
        {
          q: 'Alba野生动物大冒险适合儿童游玩吗，它是否有足够的内容吸引成年玩家？',
          a: 'Alba对儿童完全友好，这是设计意图之一——操作简单，无时间压力，后果不严苛。但游戏并不是专门为儿童制作的：它关于环境主义的主题、角色动态以及叙事的情感重量都适合任何年龄的玩家。成年玩家报告说游戏的3-4小时时长感觉恰到好处而非太短，世界观和野生动物记录系统提供了足够的探索空间。游戏主要吸引力是情感共鸣而非机械深度，所以如果你正在寻找复杂的游戏系统，这不是那款游戏。',
        },
        {
          q: 'Toem和Umurangi Generation哪款更适合没有摄影背景的普通玩家？',
          a: 'Toem对摄影初学者更加友好。它的黑白世界消除了颜色分析的需要，挑战系统不评分而只要求"拍了什么"而非"拍得多好"，整体氛围轻松无压力。Umurangi Generation需要更多主动的构图思考：它有相机镜头选择、光线条件变化和特定构图目标，奖励对摄影原则有所了解的玩家。两款游戏都不要求实际摄影技能，但Toem对纯新手更易上手，Umurangi对希望学习构图思维的玩家更有回报。',
        },
        {
          q: 'Umurangi Generation的政治主题是否会影响游戏体验，这款游戏真的是"治愈"游戏吗？',
          a: 'Umurangi Generation是列表中最不传统意义上"治愈"的游戏。它描绘军事占领、气候危机和边缘化社区，这些主题是真实且刻意的而非背景噪音。然而它仍然被许多玩家视为治愈体验：因为在混乱和不公正的世界中寻找美、专注于摄影行为本身，对很多人来说是深度放松的。是否"治愈"取决于你是否能与通过美丽记录困难现实来处理焦虑的游戏产生共鸣。如果你对这种类型的内容感到情感不适，Toem或Alba是更安全的选择。',
        },
        {
          q: '这四款摄影游戏里哪款最适合农场游戏爱好者？',
          a: '农场游戏玩家通常喜欢耐心的节奏、对自然的关注和温和的目标感。在这个维度上，Alba和Toem最接近农场游戏的节奏：两者都奖励探索而非速度，有关于照料的主题，并且在完成小任务时给予满足感。Alba额外的保育主题和真实野生动物系统与喜爱农场游戏的自然爱好者特别相关。新宝可梦随乐拍对于同时是宝可梦粉丝的农场游戏玩家是完美选择。Umurangi Generation对于欣赏更具挑战性的艺术体验的农场游戏玩家效果最好。',
        },
      ]
    : [
        {
          q: 'Is New Pokémon Snap worth playing if you loved the original N64 game?',
          a: 'New Pokémon Snap is a genuine sequel in every meaningful sense and a significant improvement over the original. The N64 game had 63 Pokémon across a small number of linear levels; the Switch version has over 200 Pokémon across multiple biomes with day-night variations, multiple hidden routes within each course, and a research progression system that rewards replay in ways the original never attempted. The photography mechanics are more refined, the scoring system is deeper, and the environmental design is substantially more ambitious. For players who loved the original, New Pokémon Snap is likely to exceed expectations rather than merely meet them — the 21-year wait did not hurt the concept; if anything, the Switch hardware allowed the idea to finally reach its potential.',
        },
        {
          q: 'How does Alba: A Wildlife Adventure handle environmentalism without becoming preachy or depressing?',
          a: 'Alba handles its environmental themes through agency rather than lecture. Rather than explaining environmental problems to the player, it gives Alba — and by extension the player — the specific tools to do something about them: photograph wildlife to document it, get signatures on a petition, repair the nature center, save injured animals. The optimism is earned rather than assumed: the town begins resistant to change, and watching each character gradually come around as a result of persistent, caring action gives the environmentalism real emotional weight without being dishonest about difficulty. The Mediterranean setting and warm color palette also help — it is a game about a place worth protecting, which makes the activism feel meaningful rather than abstract.',
        },
        {
          q: 'How long is Toem and does it have replay value after completing it?',
          a: 'Toem runs four to five hours for a first playthrough and has a genuine completion state once you have seen the Toem phenomenon at the end. Replay value is limited in the traditional sense — there is no new game plus, no procedural elements, and the story does not change. However, many players replay individual regions to find photographs they missed, and the game is short enough that a full replay carries relatively low time cost. The real value is in the first playthrough\'s sense of discovery, which is substantial: Toem has more hidden content than its gentle surface suggests, and players regularly discover encounters and challenges on second visits that they completely missed the first time.',
        },
        {
          q: 'What makes Umurangi Generation significant beyond being a photography game?',
          a: 'Umurangi Generation is considered significant because it is one of the first games made by a Māori developer to receive widespread critical attention, and because its political content is unusually direct and substantive for the games medium. The game depicts indigenous communities under military occupation, climate-driven societal collapse, and the ways that young people in marginalized communities create art and community under systemic pressure — not as metaphor but as literal setting. This is drawn from the developer Naphtali Faulkner\'s own cultural context as a Māori artist in Aotearoa New Zealand, and it gives the game a specificity and authenticity that generic dystopia settings lack. Critics have called it one of the most important games made about climate anxiety, and its dedicated fanbase considers it a foundational work of games-as-art.',
        },
        {
          q: 'Can these photography games be enjoyed by people who have no interest in real photography?',
          a: 'Yes, all four are accessible to players with no photography background or interest. New Pokémon Snap requires no technical photography knowledge — the satisfaction is in knowing Pokémon behavior, not camera technique. Alba uses a simple tap-to-photograph mechanic with no framing requirements. Toem has no scoring system and simply requires taking a shot of the requested subject, however framed. Umurangi Generation is the most technically photography-adjacent of the four, with lens selection and compositional objectives, but it teaches these concepts through play rather than assuming prior knowledge. All four are ultimately about paying attention to the world they have built, and that is a skill any player can develop regardless of real-world photographic experience.',
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
      ? '治愈自然摄影游戏推荐测验'
      : 'Which Cozy Nature Photography Game Is Right for You?',
    description: isZh
      ? '6道题从新宝可梦随乐拍、Alba野生动物大冒险、Toem和Umurangi Generation中找到你的匹配游戏。'
      : '6 questions to match you to New Pokémon Snap, Alba: A Wildlife Adventure, Toem, or Umurangi Generation.',
    url: `${BASE_URL}/${locale}/quizzes/${SLUG}`,
    educationalLevel: 'beginner',
    about: {
      '@type': 'Thing',
      name: isZh ? '自然摄影游戏' : 'Nature Photography Games',
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
            <div className="mb-3 text-5xl">📷</div>
            <h1 className="mb-3 text-2xl font-bold leading-tight text-[#f0a832] md:text-3xl">
              {isZh
                ? '治愈自然摄影游戏推荐测验'
                : 'Which Cozy Nature Photography Game Is Right for You?'}
            </h1>
            <p className="text-[#8a9a7a]">
              {isZh
                ? '宝可梦随乐拍 · Alba · Toem · Umurangi — 6道题找到你的匹配'
                : 'Pokémon Snap · Alba · Toem · Umurangi Generation — 6 questions'}
            </p>
          </div>

          <NaturePhotographyQuiz locale={locale} />

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
