import type { Metadata } from 'next'
import { JrpgFinderQuiz } from '@/components/tools/JrpgFinderQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const canonical = `${BASE_URL}/${locale}/quizzes/jrpg-finder-quiz`

  return {
    title: isZh
      ? '哪款 JRPG 最适合你？测验 | FarmGameHub'
      : 'Which JRPG Is Right for You? Quiz | FarmGameHub',
    description: isZh
      ? '6 个问题，从歧路旅人 II、三角战略、异度神剑 3、莱莎的炼金工房中找到你的完美 JRPG。每款游戏都有独特的故事风格、战斗系统和时间投入。'
      : 'Answer 6 questions to find your perfect JRPG — Octopath Traveler II, Triangle Strategy, Xenoblade Chronicles 3, or Atelier Ryza. Each has a distinct story style, combat system, and time commitment.',
    alternates: {
      canonical,
      languages: buildLanguageAlternates('/quizzes/jrpg-finder-quiz'),
    },
    keywords: isZh
      ? ['JRPG推荐', '歧路旅人2值得买吗', '三角战略值得买吗', '异度神剑3值得买吗', '莱莎炼金工房值得买吗', 'JRPG测验', '最好的JRPG2023', 'Switch JRPG推荐']
      : ['jrpg quiz', 'octopath traveler 2 worth it', 'triangle strategy worth it', 'xenoblade chronicles 3 worth it', 'atelier ryza worth it', 'best jrpg 2023', 'switch jrpg recommendation', 'which jrpg should i play'],
    openGraph: {
      title: isZh ? '哪款 JRPG 最适合你？' : 'Which JRPG Is Right for You?',
      description: isZh
        ? '歧路旅人 II、三角战略、异度神剑 3、莱莎的炼金工房——6 个问题找到你的答案'
        : 'Octopath Traveler II, Triangle Strategy, Xenoblade Chronicles 3, or Atelier Ryza — 6 questions to find your answer',
      url: canonical,
      type: 'website',
    },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const canonical = `${BASE_URL}/${locale}/quizzes/jrpg-finder-quiz`

  const faqItems = [
    {
      q: 'Is Octopath Traveler 2 worth it?',
      a: "Yes — Octopath Traveler II (2023) is widely considered a major improvement over the original. The HD-2D visual style is stunning, each of the 8 protagonists has a well-written personal story arc, and the convergent ending unites all characters in a satisfying final act. The Boost-and-Break combat system rewards learning enemy weaknesses. Metacritic approximately 87 on Switch. Best for players who want a story-driven JRPG they can play in short sessions. Available on Switch, PC, and PlayStation for about $60 new.",
    },
    {
      q: 'Is Triangle Strategy worth it?',
      a: "Yes — Triangle Strategy (2022) is an excellent tactical JRPG with a genuinely political story. The Conviction system tracks your moral choices throughout the game and influences how your party votes at key decision points, leading to four distinct endings including a secret true ending. The grid-based combat with terrain effects is among the best in the genre. Most players need 40-50 hours for a full playthrough, but the game is designed for multiple runs to see all routes. Metacritic 84 on Switch. Best for Fire Emblem fans who want a more narrative-focused tactical experience.",
    },
    {
      q: 'Is Xenoblade Chronicles 3 worth it?',
      a: "Absolutely yes — Xenoblade Chronicles 3 (2022) is one of the highest-rated JRPGs of the generation with a Metacritic of 93 on Switch. The world of Aionios is enormous and spectacularly designed, the story wrestles with mortality and chosen family in genuinely moving ways, and the real-time combat system with class-switching and Interlinking offers hundreds of hours of mechanical depth. Main story runs approximately 80 hours; completionists can spend 150+ hours. Switch exclusive. The game's scale is the point — if you want a JRPG you can live in for months, this is the one.",
    },
    {
      q: 'Is Atelier Ryza worth it?',
      a: "Yes — Atelier Ryza: Ever Darkness & the Secret Hideout (2019) is the perfect entry point to the beloved Atelier series and the most cozy JRPG on this list. The alchemy crafting system — combining ingredients with elemental properties to synthesize items — will feel immediately familiar to Stardew Valley players. The story is a warm coming-of-age summer adventure, the length is manageable at 40-50 hours, and two sequels are ready to play immediately after. Available on Switch, PC, and PlayStation for about $40. Best for cozy gamers who want their first JRPG without an overwhelming commitment.",
    },
    {
      q: 'Which JRPG is best for someone who has never played a JRPG before?',
      a: 'Atelier Ryza is the most accessible starting point — its alchemy crafting loop resembles Stardew Valley resource gathering, its story is warm and low-stakes, and its combat is the least demanding of the four. Octopath Traveler II is a close second: the episodic structure lets you play one character\'s chapters at a time without feeling lost. Triangle Strategy and Xenoblade Chronicles 3 are both excellent but assume some genre familiarity — Triangle Strategy for tactical mechanics, Xenoblade 3 for scale and combat system depth.',
    },
  ]

  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh ? '哪款 JRPG 最适合你？' : 'Which JRPG Is Right for You?',
    description: isZh
      ? '6 个问题，从歧路旅人 II、三角战略、异度神剑 3、莱莎的炼金工房中找到最适合你的 JRPG'
      : '6 questions to find your perfect JRPG from Octopath Traveler II, Triangle Strategy, Xenoblade Chronicles 3, and Atelier Ryza',
    url: canonical,
    educationalLevel: 'beginner',
    about: {
      '@type': 'Thing',
      name: isZh ? 'JRPG 游戏推荐' : 'JRPG Game Recommendation',
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-[#0f1a0f] text-[#e8dcc8]">
        <div className="mx-auto max-w-2xl px-4 py-10">
          <div className="mb-8 text-center">
            <span className="mb-3 inline-block text-5xl">🗺️</span>
            <h1 className="text-2xl font-bold leading-tight text-[#e8dcc8]">{isZh ? 'JRPG 风格测验' : 'JRPG Style Quiz'}</h1>
          </div>

          <div className="rounded-2xl border border-[#2d3d2d] bg-[#141f14] p-6 shadow-xl">
            <JrpgFinderQuiz locale={locale} />
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-lg font-semibold text-[#e8dcc8]">
              {locale === 'zh' ? '常见问题' : locale === 'zh-TW' ? '常見問題' : locale === 'ja' ? 'よくある質問' : locale === 'ko' ? '자주 묻는 질문' : locale === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-5">
              {faqItems.map((item, i) => (
                <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#141f14] p-5">
                  <h3 className="mb-2 font-medium text-[#f0a832]">{item.q}</h3>
                  <p className="text-sm leading-relaxed text-[#8a9a7a]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <RelatedQuizzes currentSlug="jrpg-finder-quiz" locale={locale} />
          </div>
        </div>
      </div>
    </>
  )
}
