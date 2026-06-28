import { WhichFarmingGameQuiz } from '@/components/tools/WhichFarmingGameQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    title: isZh
      ? '哪款农场游戏最适合我？6 题测出你的专属推荐'
      : 'Which Farming Game Should You Play? Quiz — Find Your Perfect Match',
    description: isZh
      ? '6 个问题，根据你的平台、游戏时长、风格偏好，为你精准推荐最适合的农场游戏——星露谷、动物森友会、Palia、模拟农场等。'
      : '6 quick questions to find your perfect farming game — Stardew Valley, Animal Crossing, Hay Day, Palia, Farming Simulator, and more. Based on your platform, playstyle, and what matters most to you.',
    keywords: isZh
      ? ['哪款农场游戏', '农场游戏推荐', '农场游戏测试', '星露谷 动物森友会 哪个好']
      : ['which farming game should i play', 'best farming game for me', 'farming game quiz', 'farming game recommendation quiz', 'stardew valley vs animal crossing'],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/which-farming-game`,
      languages: buildLanguageAlternates('/quizzes/which-farming-game'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'What is the best farming game for beginners?',
    a: 'Stardew Valley and Animal Crossing: New Horizons are excellent for beginners. Stardew Valley has gentle difficulty with deep optional content; Animal Crossing has almost no fail states and an intuitive loop.',
  },
  {
    q: 'Which farming game can I play on my phone?',
    a: 'Hay Day is the top mobile-native farming game. Stardew Valley also has well-optimized iOS and Android versions. Both are widely considered the best farming games on mobile.',
  },
  {
    q: 'Is there a free farming game worth playing?',
    a: 'Yes — Palia is a free-to-play cozy farming MMO available on PC (Steam) and Nintendo Switch, with no pay-to-win mechanics. It\'s one of the highest-rated free farming games.',
  },
  {
    q: 'What is the most realistic farming game?',
    a: 'Farming Simulator 25 (Giants Software) is the most realistic farming game, with hundreds of licensed real-world machines from brands like John Deere, Case IH, and Fendt.',
  },
  {
    q: 'Can I play farming games with friends?',
    a: 'Yes. Palia is built for online multiplayer and is free. Stardew Valley supports 1–4 player co-op. Animal Crossing supports visiting friends\' islands in real time.',
  },
]

const FAQ_ZH = [
  {
    q: '适合新手的农场游戏是什么？',
    a: '星露谷物语和动物森友会都非常适合新手。星露谷上手门槛低，但有丰富的深度内容；动物森友会几乎没有失败机制，节奏轻松。',
  },
  {
    q: '手机上有什么好玩的农场游戏？',
    a: 'Hay Day 是专为手机设计的顶级农场游戏；星露谷物语也有优秀的 iOS 和 Android 版本，两者都被认为是手机端最好的农场游戏。',
  },
  {
    q: '有没有免费的农场游戏？',
    a: '有，Palia 是一款免费的农场 MMO 游戏，PC（Steam）和 Nintendo Switch 均可玩，没有 pay-to-win 机制，是好评最高的免费农场游戏之一。',
  },
  {
    q: '最真实的农场游戏是哪款？',
    a: '模拟农场 25（Farming Simulator 25）是最真实的农业模拟游戏，包含数百款真实授权农机（John Deere、Case IH、Fendt 等）。',
  },
  {
    q: '农场游戏可以和朋友一起玩吗？',
    a: '可以。Palia 是专为联机设计的免费 MMO；星露谷支持 1–4 人联机；动物森友会支持实时拜访好友的小岛。',
  },
]

export default async function WhichFarmingGamePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
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
      <div className="mx-auto max-w-2xl px-4 py-12">
        <nav className="mb-6 text-sm text-[#8a9a7a]">
          <Link href={`/${locale}/quizzes`} className="hover:text-[#e8dcc8]">
            {locale === 'zh' ? '测评' : locale === 'zh-TW' ? '測評' : locale === 'ja' ? 'クイズ' : locale === 'ko' ? '퀴즈' : locale === 'de' ? 'Quiz' : 'Quizzes'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#e8dcc8]">
            {isZh ? '哪款农场游戏适合你' : 'Which Farming Game Quiz'}
          </span>
        </nav>

        <h1 className="mb-4 text-2xl font-bold leading-tight text-[#e8dcc8]">
          {isZh ? '哪款农场游戏适合你' : 'Which Farming Game Quiz'}
        </h1>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <WhichFarmingGameQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '结果仅供参考，帮助你缩小选择范围。每款游戏都值得亲自试一试。'
            : 'Results are a starting point. Every game here is worth trying — most have free demos or refund policies.'}
        </p>

        <RelatedQuizzes currentSlug="which-farming-game" locale={locale} />

        {/* FAQ Section — SEO/GEO value */}
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {locale === 'zh' ? '常见问题' : locale === 'zh-TW' ? '常見問題' : locale === 'ja' ? 'よくある質問' : locale === 'ko' ? '자주 묻는 질문' : locale === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-5">
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
