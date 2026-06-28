import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { FarmingRPGAdventureQuiz } from '@/components/tools/FarmingRPGAdventureQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

const SLUG = 'farming-rpg-adventure-quiz'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    title: isZh
      ? '农场RPG冒险游戏推荐测验 — 哪款最适合你？| Farm Game Hub'
      : 'Which Farming RPG Adventure Is Right for You? Quiz | Farm Game Hub',
    description: isZh
      ? '通过6道问题，测出你最适合的农场RPG：Harvestella 史诗剧情、符文工房5 动作恋爱、Paleo Pines 恐龙牧场、还是牧场物语橄榄镇？双语推荐，含游戏攻略提示。'
      : 'Take our 6-question quiz to find your farming RPG match: Harvestella epic JRPG, Rune Factory 5 action romance, Paleo Pines dino ranching, or Story of Seasons Pioneers of Olive Town. Bilingual recommendations with pro tips.',
    keywords: isZh
      ? [
          '农场RPG推荐',
          'Harvestella值得买吗',
          '符文工房5评测',
          'Paleo Pines推荐',
          '牧场物语橄榄镇好玩吗',
          '农场游戏RPG',
          '带战斗的农场游戏',
          '恐龙农场游戏',
          '农场恋爱游戏',
          '符文工房5好玩吗',
        ]
      : [
          'farming RPG quiz',
          'Harvestella worth it',
          'Rune Factory 5 review',
          'Paleo Pines worth it',
          'Story of Seasons Pioneers of Olive Town review',
          'farming game with combat',
          'farming RPG adventure',
          'best farming RPG Switch',
          'Harvestella vs Rune Factory',
          'dinosaur farming game',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/${SLUG}`,
      languages: buildLanguageAlternates(`/quizzes/${SLUG}`),
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const faqItems = isZh
    ? [
        {
          q: 'Harvestella 值得买吗？',
          a: 'Harvestella 对于喜欢 JRPG 剧情和回合制战斗的玩家非常值得购买。Square Enix 打造了一个史诗级的"四季垂死"世界观，农场和冒险两条线深度联动。如果你主要寻找纯农场模拟体验，它可能不是最佳选择，但对于农场+RPG复合体验的爱好者来说，它几乎无可替代。',
        },
        {
          q: '符文工房5 需要玩过前作吗？',
          a: '不需要。符文工房5的世界观和故事线完全独立，新玩家可以直接入手。每一作都有全新的小镇、角色和主线剧情。前作经验会让你更快上手游戏系统，但完全不是前提条件。',
        },
        {
          q: 'Paleo Pines 适合小孩子玩吗？',
          a: 'Paleo Pines 是家庭友好型游戏，没有任何暴力内容或战斗系统。游戏评级适合全年龄段。恐龙驯服和农场建设的玩法简单直觉，对小朋友非常友好。唯一需要注意的是长笛音乐驯服系统需要一定的听觉辨别能力，6岁以上的儿童一般都能掌握。',
        },
        {
          q: '牧场物语：橄榄镇与希望的大地好玩吗？',
          a: '总体而言好评如潮，尤其在土地开垦和博物馆收集系统上获得高度认可。游戏的恢复小镇主题和阳光地中海风格令人愉快。主要的批评集中在前几个小时的教程节奏较慢，以及相比前作《重归美好生活》内容密度略低。但整体而言是系列中现代感最强的一作。',
        },
        {
          q: '这四款农场RPG哪一款最适合《星露谷物语》粉丝？',
          a: '要看你最喜欢《星露谷》的哪个部分：如果你最爱挖矿+战斗系统，选符文工房5（动作战斗更流畅）；如果你最爱剧情沉浸感，选Harvestella；如果你最爱养成和探索，选Paleo Pines（把恐龙换掉宠物）；如果你最爱农场建设和恢复社区，选牧场物语橄榄镇——它是最接近星露谷纯农场体验的一作。',
        },
      ]
    : [
        {
          q: 'Is Harvestella worth it?',
          a: 'Harvestella is absolutely worth it if you enjoy JRPG storytelling and turn-based combat alongside your farming. Square Enix built a genuinely epic world where the seasons are dying, and the farming-combat loop is more deeply integrated than most hybrid games manage. If you want pure farming simulation, it may not satisfy you, but for players who want an emotional, story-driven adventure where farming is meaningful, it is one of the best in its niche.',
        },
        {
          q: 'Is Rune Factory 5 worth it?',
          a: 'Rune Factory 5 is worth it for players who want farming, action RPG combat, and deep romance in one package. It is the most complete realization of the franchise formula. The main criticisms are that the Switch version had performance issues at launch (mostly patched), and the story pacing in the opening hours is slow. If those trade-offs are acceptable, it offers 60-80 hours of densely layered content that few other farming RPGs can match.',
        },
        {
          q: 'Is Paleo Pines worth it?',
          a: "Paleo Pines is worth it for players who want a zero-pressure, creature-focused farming experience unlike anything else in the genre. The dinosaur taming mechanic using a musical flute is unique and charming. The farming side is lighter than Stardew or Story of Seasons, so if deep crop management is your priority, you may find it shallow. But as a creative sandbox for building your perfect prehistoric ranch, it delivers something no other farming game does.",
        },
        {
          q: "What is Story of Seasons: Pioneers of Olive Town and is it good?",
          a: "Story of Seasons: Pioneers of Olive Town is a 2021 farming simulation where you restore a coastal town by farming, raising animals, and befriending townsfolk. It features a distinctive land-clearing system where you must physically remove trees, rocks, and debris to expand your farm. The game is generally well-regarded for its satisfying progression and cheerful Mediterranean aesthetic, though some players find the early pacing slow and the NPC cast smaller than Stardew Valley.",
        },
        {
          q: 'Which farming RPG is best for Stardew Valley fans?',
          a: "It depends on which part of Stardew you love most. If you loved the mine-diving and combat, try Rune Factory 5 — its action dungeons are more developed. If you loved the emotional storytelling, try Harvestella. If you loved caring for animals and exploring, try Paleo Pines. If you loved building up your farm and restoring a community, try Story of Seasons: Pioneers of Olive Town — it is the closest to Stardew's core farming-and-town loop in pure spirit.",
        },
      ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh
      ? '农场RPG冒险游戏推荐测验'
      : 'Which Farming RPG Adventure Is Right for You?',
    description: isZh
      ? '6 道双语题目，帮你找到最适合的农场RPG冒险游戏'
      : '6 questions to match you with the perfect farming RPG adventure game',
    url: `${BASE_URL}/${locale}/quizzes/${SLUG}`,
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      targetName: 'Farming RPG Games',
    },
  }

  return (
    <main className="min-h-screen bg-[#0f1a0f] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
        />

        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">⚔️</div>
          <p className="mb-2 text-sm text-[#8a9a7a]">
            {isZh ? '农场RPG推荐' : 'Farming RPG Pick'}
          </p>
          <h1 className="mb-3 text-2xl font-bold text-[#e8dcc8] md:text-3xl">
            {isZh
              ? '农场RPG冒险游戏推荐测验'
              : 'Which Farming RPG Adventure Is Right for You?'}
          </h1>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh
              ? 'Harvestella、符文工房5、Paleo Pines、牧场物语橄榄镇——6道题帮你找到最合适的一款'
              : 'Harvestella, Rune Factory 5, Paleo Pines, or Story of Seasons: PoOT — 6 questions to find your match'}
          </p>
        </div>

        <FarmingRPGAdventureQuiz locale={locale} />

        <div className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '常见问题' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-5">
            {faqItems.map((item, i) => (
              <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 p-5">
                <h3 className="mb-2 font-semibold text-[#f0a832]">{item.q}</h3>
                <p className="text-sm leading-relaxed text-[#c8bca8]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <RelatedQuizzes currentSlug={SLUG} locale={locale} />
      </div>
    </main>
  )
}
