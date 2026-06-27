import type { Metadata } from 'next'
import { NintendoExclusivesQuiz } from '@/components/tools/NintendoExclusivesQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/nintendo-switch-exclusives-quiz`

  return {
    title: isZh
      ? '哪款 Nintendo Switch 独占游戏最适合你？测验 | FarmGameHub'
      : 'Which Nintendo Switch Exclusive Is Right for You? Quiz | FarmGameHub',
    description: isZh
      ? '6 个问题，从塞尔达：王国之泪、皮克敏 4、超级马力欧兄弟：奇妙之旅、星之卡比：探索发现中找到你的完美 Switch 独占游戏。'
      : 'Answer 6 questions to find your perfect Nintendo Switch exclusive — Zelda: Tears of the Kingdom, Pikmin 4, Super Mario Bros. Wonder, or Kirby and the Forgotten Land.',
    alternates: {
      canonical,
      languages: buildLanguageAlternates('/quizzes/nintendo-switch-exclusives-quiz'),
    },
    keywords: isZh
      ? ['塞尔达王国之泪值得买吗', '皮克敏4值得买吗', '超级马力欧奇妙之旅值得买吗', '星之卡比探索发现值得买吗', 'Switch独占游戏推荐', 'Nintendo Switch必玩游戏', '2023任天堂游戏推荐']
      : ['zelda tears of the kingdom worth it', 'pikmin 4 worth it', 'super mario wonder worth it', 'kirby forgotten land worth it', 'best nintendo switch exclusives', 'which switch exclusive should i buy', 'nintendo switch game recommendation 2023'],
    openGraph: {
      title: isZh ? '哪款 Nintendo Switch 独占游戏最适合你？' : 'Which Nintendo Switch Exclusive Is Right for You?',
      description: isZh
        ? '塞尔达：王国之泪、皮克敏 4、马力欧奇妙之旅、星之卡比——6 个问题找到你的答案'
        : 'Zelda: Tears of the Kingdom, Pikmin 4, Super Mario Wonder, or Kirby — 6 questions to find your answer',
      url: canonical,
      type: 'website',
    },
  }
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/nintendo-switch-exclusives-quiz`

  const faqItems = [
    {
      q: 'Is Zelda: Tears of the Kingdom worth it?',
      a: "Yes — Zelda: Tears of the Kingdom (2023) is one of the highest-rated games ever made (Metacritic 96) and won Game of the Year in virtually every major gaming publication. It expands Breath of the Wild's open world with sky islands, underground depths, and four building mechanics (Ultrahand, Fuse, Ascend, Recall) that make every puzzle solvable in multiple creative ways. Main story runs 50-80 hours; completionists can spend 200+ hours. At $70 it is the most expensive game on this list, but most players consider it the best game on Nintendo Switch. You do not need to have played Breath of the Wild first.",
    },
    {
      q: 'Is Pikmin 4 worth it?',
      a: "Yes — Pikmin 4 (2023) is the most beginner-friendly and most fully featured Pikmin game, ideal for players who have never tried the series. It adds Oatchi (a dog companion who becomes one of the most useful characters in the game), Ice Pikmin who freeze water, and Glow Pikmin for night missions. The strategy is gentle — puzzle-based rather than reflex-based — and the game has a warm, cozy aesthetic despite being a strategy title. Metacritic 89 on Switch. Main story runs 25-30 hours. Switch exclusive. Recommended strongly for cozy gamers who want to try something beyond farming games.",
    },
    {
      q: 'Is Super Mario Bros. Wonder worth it?',
      a: "Yes — Super Mario Bros. Wonder (2023) is widely considered the best 2D Mario game since Super Mario World (1990), with Metacritic 93 on Switch. The key innovation is the Wonder Flower: every level has a transformation event (the ground breathes, every enemy becomes Mario, the camera rotates, you become a parade float) that is different in every level. The game offers 12 playable characters including Yoshi and Nabbit who take no damage, making it accessible to all skill levels. 15-20 hours for a casual run; completionists can spend 30-40 hours. A joyful, creative masterpiece that anyone who owns a Switch should play.",
    },
    {
      q: 'Is Kirby and the Forgotten Land worth it?',
      a: "Yes — Kirby and the Forgotten Land (2022) is Nintendo's most welcoming 3D platformer and an ideal Nintendo game for players with little gaming experience. The headline feature is Mouthful Mode where Kirby inhales real-world objects (cars, vending machines, traffic cones) and uses their functions as abilities — one of Nintendo's most creative ideas in years. Waddle Dee Town grows as you rescue more Waddle Dees, creating a cozy hub world to explore between levels. Metacritic 82 on Switch. Main story runs 10-15 hours; completionists can spend 20-25 hours. Switch exclusive, often on sale for $30-40.",
    },
    {
      q: 'Which Nintendo Switch exclusive should I buy first?',
      a: "It depends on your priorities: For the absolute best gaming experience on Switch, Zelda: Tears of the Kingdom (but it requires 100+ hours commitment and $70). For the most cozy/accessible strategy experience, Pikmin 4 (30 hours, gentle difficulty, charming world). For pure joy and creativity in a shorter package, Super Mario Bros. Wonder (15-20 hours, the funniest Nintendo game in years). For someone who has never played a 3D platformer and wants the most welcoming entry point, Kirby and the Forgotten Land (10-15 hours, very easy, endlessly charming). Take the quiz above to get a personalized recommendation based on your preferences.",
    },
  ]

  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh ? '哪款 Nintendo Switch 独占游戏最适合你？' : 'Which Nintendo Switch Exclusive Is Right for You?',
    description: isZh
      ? '6 个问题，从塞尔达：王国之泪、皮克敏 4、超级马力欧兄弟：奇妙之旅、星之卡比：探索发现中找到最适合你的 Switch 独占游戏'
      : '6 questions to find your perfect Nintendo Switch exclusive from Zelda: Tears of the Kingdom, Pikmin 4, Super Mario Bros. Wonder, and Kirby and the Forgotten Land',
    url: canonical,
    educationalLevel: 'beginner',
    about: {
      '@type': 'Thing',
      name: isZh ? 'Nintendo Switch 游戏推荐' : 'Nintendo Switch Game Recommendation',
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
            <span className="mb-3 inline-block text-5xl">🎮</span>
            <p className="text-sm text-[#8a9a7a]">
              {isZh ? 'Switch 独占游戏推荐测验' : 'Nintendo Switch Exclusive Quiz'}
            </p>
          </div>

          <div className="rounded-2xl border border-[#2d3d2d] bg-[#141f14] p-6 shadow-xl">
            <NintendoExclusivesQuiz locale={locale} />
          </div>

          <div className="mt-12">
            <h2 className="mb-6 text-lg font-semibold text-[#e8dcc8]">
              {isZh ? '常见问题' : 'Frequently Asked Questions'}
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
            <RelatedQuizzes currentSlug="nintendo-switch-exclusives-quiz" locale={locale} />
          </div>
        </div>
      </div>
    </>
  )
}
