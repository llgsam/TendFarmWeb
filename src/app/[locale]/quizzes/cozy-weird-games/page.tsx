import { Metadata } from 'next'
import { CozyWeirdGamesQuiz } from '@/components/tools/CozyWeirdGamesQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import { BASE_URL } from '@/lib/config'

const otherLocale = { zh: 'en', en: 'zh' } as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-weird-games`
  const alt = `${BASE_URL}/${otherLocale[locale as 'zh' | 'en']}/quizzes/cozy-weird-games`

  return {
    title: isZh
      ? '哪款最难解释的 Cozy 游戏最适合你？橡皮鸭 / 甜甜圈县城 | TendFarm'
      : 'Which Impossible-to-Explain Cozy Game? Placid Plastic Duck / Donut County | TendFarm',
    description: isZh
      ? '6 个问题找到你的奇异 Cozy 游戏——安静橡皮鸭模拟器、甜甜圈县城、Mail Time 或 Loddlenaut。'
      : 'Placid Plastic Duck Simulator, Donut County, Mail Time, or Loddlenaut — 6 questions to find which impossible-to-explain cozy game is perfect for you.',
    keywords: [
      'placid plastic duck simulator worth it',
      'placid plastic duck simulator review',
      'donut county review worth it',
      'donut county game worth buying',
      'mail time game review worth it',
      'loddlenaut game review worth it',
      'weird cozy games PC',
      'unusual relaxing games',
      'cozy games with no objectives',
      'best relaxing games no stress',
      'ambient games PC switch',
      'donut county vs untitled goose game',
    ],
    alternates: {
      canonical,
      languages: {
        'zh-CN': canonical,
        'en-US': alt,
      },
    },
    openGraph: {
      title: isZh
        ? '哪款最难解释的 Cozy 游戏最适合你？'
        : 'Which Impossible-to-Explain Cozy Game Is Perfect for You?',
      description: isZh
        ? '橡皮鸭模拟器、甜甜圈县城、Mail Time 或 Loddlenaut——6 个问题找到你的奇异 Cozy 游戏。'
        : 'Placid Plastic Duck Simulator, Donut County, Mail Time, or Loddlenaut — 6 questions to find your perfectly weird cozy game.',
      url: canonical,
    },
  }
}

export default async function CozyWeirdGamesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-weird-games`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Placid Plastic Duck Simulator worth it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — Placid Plastic Duck Simulator (2023) is genuinely effective as a relaxation tool. You watch rubber ducks float across beautifully rendered peaceful environments — mountain hot springs, swimming pools, jungle waterfalls, Japanese bathhouses — with layered ambient sound design. There is no gameplay or objectives; it functions as an interactive screensaver. Over 90% positive reviews on Steam. At about $5 on PC and Switch, it is one of the best-value relaxation games available. Also available free on mobile with limited scenes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Donut County worth playing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — Donut County (2018) is a perfectly complete 2-3 hour experience. You control a hole in the ground that grows larger each time it swallows something, eventually consuming an entire town. The writing is dry and funny, the mechanical satisfaction of swallowing progressively larger objects is primal and never gets old, and the story between raccoon BK and his friend Mira lands better than expected. Available on PC, Switch, PS4, iOS, and Android for about $8. Excellent for players who want a complete funny short game.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Mail Time worth buying?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — Mail Time (2023) is one of the best cozy exploration platformers for players who want to inhabit a small detailed world at their own pace. You play as a tiny mail carrier gliding through a forest world of mushroom-topped trees, delivering letters to charming small-creature residents whose stories unfold through the mail they receive. No combat, no fail state, no time pressure. About 4-6 hours, $15 on PC via Steam and Itch.io.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Loddlenaut worth it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — Loddlenaut (2023) is one of the most original cozy games of recent years. As a solo diver on an alien ocean planet, you clean pollution from the seafloor and raise Loddles — small round alien sea creatures whose body shape, color, and features you can customize by feeding them specific foods. The cleaning loop is deeply satisfying (similar to PowerWash Simulator\'s before-and-after clarity), the alien underwater environment is beautifully rendered, and the Loddles are genuinely charming. About $15 on PC, ideal for players who like environmental care and creature nurturing.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the best relaxing games with no objectives?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best relaxing games with no or minimal objectives include Placid Plastic Duck Simulator (2023, watch rubber ducks float, PC/Switch/mobile ~$5), Nour: Play With Your Food (2023, interactive food sandbox, PC/PS5 ~$15), Summerhouse (2023, build cozy scenes with no winning condition, PC ~$5), Townscaper (2021, click to build pastel towns, PC/Switch/mobile ~$6), and A Short Hike (2019, gentle exploration with no time pressure, PC/Switch ~$8). Each offers a different version of purposeless relaxation.',
        },
      },
    ],
  }

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh ? '哪款最难向朋友解释的 Cozy 游戏最适合你？' : 'Which Impossible-to-Explain Cozy Game Is Perfect for You?',
    description: isZh
      ? '6 个问题，在安静橡皮鸭模拟器、甜甜圈县城、Mail Time、Loddlenaut 中找到最适合你的奇异 Cozy 游戏'
      : '6 questions to match you with Placid Plastic Duck Simulator, Donut County, Mail Time, or Loddlenaut',
    url: canonical,
    educationalLevel: 'beginner',
    about: { '@type': 'Thing', name: isZh ? '奇异 Cozy 游戏推荐' : 'Unusual Cozy Game Recommendations' },
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

      <main className="min-h-screen bg-[#0f1a0f] px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm text-[#4a5a4a]">
              {isZh ? 'Cozy 游戏推荐测验' : 'Cozy Game Recommendation Quiz'}
            </p>
            <div className="mb-3 text-4xl">🤔</div>
            <h1 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
              {isZh
                ? '哪款最难向朋友解释的 Cozy 游戏最适合你？'
                : 'Which Impossible-to-Explain Cozy Game Is Perfect for You?'}
            </h1>
            <p className="text-sm text-[#8a9a7a]">
              {isZh
                ? '看鸭子漂浮、做一个洞吃掉小镇、当小邮差、清理外星海洋——6 个问题找到最适合你的奇异 Cozy 游戏。'
                : 'Watch rubber ducks float, be a hole eating a town, deliver mail as a tiny creature, or clean alien ocean pollution. 6 questions to find your perfect weird cozy game.'}
            </p>
          </div>

          <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-6 md:p-8">
            <CozyWeirdGamesQuiz locale={locale} />
          </div>

          <RelatedQuizzes currentSlug="cozy-weird-games" locale={locale} />

          <div className="mt-12 rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6">
            <h2 className="mb-4 text-base font-bold text-[#e8dcc8]">
              {isZh ? '关于这四款奇异 Cozy 游戏' : 'About These Four Unusual Cozy Games'}
            </h2>
            <div className="space-y-4 text-sm text-[#8a9a7a]">
              <div>
                <span className="font-semibold text-[#f0a832]">🦆 Placid Plastic Duck Simulator (2023)</span>
                <span className="ml-1">— {isZh ? '看橡皮鸭漂浮，纯粹环境音，零目标，90%+ Steam 好评，PC/Switch/手机 约 $5。' : 'Watch rubber ducks float, pure ambient sound, zero objectives, 90%+ positive Steam reviews. PC/Switch/mobile ~$5.'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#f0a832]">🍩 Donut County (2018)</span>
                <span className="ml-1">— {isZh ? '你是一个洞，吃掉整个小镇，2-3 小时完整故事，幽默干燥，PC/Switch/PS4/手机 约 $8。' : 'You are a hole, swallow an entire town, 2-3 hour complete story, dry humor. PC/Switch/PS4/mobile ~$8.'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#f0a832]">✉️ Mail Time (2023)</span>
                <span className="ml-1">— {isZh ? '小邮差在蘑菇森林世界中送信，无战斗无失败状态，4-6 小时，PC 约 $15。' : 'Tiny mail carrier in a mushroom forest world, no combat no fail state, 4-6 hours. PC ~$15.'}</span>
              </div>
              <div>
                <span className="font-semibold text-[#f0a832]">🌊 Loddlenaut (2023)</span>
                <span className="ml-1">— {isZh ? '清理外星海底污染，养育可定制的圆形外星生物 Loddles，生态恢复循环极具满足感，PC 约 $15。' : 'Clean alien seafloor pollution, raise customizable round alien Loddles, deeply satisfying ecosystem recovery loop. PC ~$15.'}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
