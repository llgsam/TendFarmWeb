import { CozyGamerQuiz } from '@/components/tools/CozyGamerQuiz'
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
      ? '你是 Cozy Gamer 吗？测出你的 Cozy 指数（0%–100%）'
      : 'Are You a Cozy Gamer? Quiz — Find Your Cozy Score (0–100%)',
    description: isZh
      ? '8 个问题测出你的 Cozy 指数——从硬核玩家到超级 Cozy Gamer，看看你的灵魂在哪个位置。结果适合截图分享给朋友。'
      : '8 questions to calculate your Cozy Gamer score from 0–100%. Find out if you\'re a true cozy gamer or a hardcore player — and share your result with friends.',
    keywords: isZh
      ? ['cozy gamer 测试', 'cozy 游戏测评', '我是 cozy gamer 吗', '游戏风格测试', 'cozy 游戏推荐']
      : ['cozy gamer quiz', 'am i a cozy gamer', 'cozy gamer test', 'cozy gaming personality', 'what kind of gamer am i quiz'],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-gamer`,
      languages: buildLanguageAlternates('/quizzes/cozy-gamer'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'What is a cozy gamer?',
    a: 'A cozy gamer is someone who prefers relaxing, low-pressure video games focused on comfort and enjoyment over challenge. Cozy games typically involve no fail states, gentle pacing, and soothing aesthetics — like Stardew Valley, Animal Crossing, and Cozy Grove.',
  },
  {
    q: 'What are the best cozy games in 2025?',
    a: "The top cozy games in 2025 include Stardew Valley, Animal Crossing: New Horizons, Palia (free), Coral Island, Fields of Mistria, Cozy Grove, and Wylde Flowers. Each offers low-pressure gameplay with beautiful, comforting worlds.",
  },
  {
    q: 'Can you be a cozy gamer and also play hardcore games?',
    a: "Absolutely. Many gamers play both — cozy games for unwinding and challenging games for the thrill of conquest. Being a cozy gamer isn't exclusive; it's simply a preference for relaxing game experiences alongside other playstyles.",
  },
  {
    q: 'What makes a game "cozy"?',
    a: 'Cozy games typically share these traits: no or minimal fail states, relaxed pacing with no urgent time pressure, gentle or cute art styles, simple or no combat, and a focus on creativity, exploration, or social bonds. Farming games, life sims, and puzzle games often fall into the cozy category.',
  },
  {
    q: 'Is Stardew Valley a cozy game?',
    a: 'Yes — Stardew Valley is considered one of the defining cozy games. While it has some optional challenging content (mines, combat, timed festivals), the core farming and relationship-building loop is relaxed, pressure-free, and deeply comforting. It is widely recommended as the best cozy game for beginners.',
  },
]

const FAQ_ZH = [
  {
    q: 'Cozy gamer 是什么意思？',
    a: 'Cozy gamer 指偏好轻松、无压力游戏的玩家，注重舒适感而非挑战性。Cozy 游戏通常没有失败惩罚、节奏温和、画面治愈——比如星露谷物语、动物森友会、Cozy Grove 等。',
  },
  {
    q: '2025 年最好玩的 cozy 游戏有哪些？',
    a: '2025 年评分最高的 cozy 游戏包括：星露谷物语、动物森友会、Palia（免费）、Coral Island、Fields of Mistria、Cozy Grove 和 Wylde Flowers，每款都提供低压力、温馨的游戏体验。',
  },
  {
    q: 'Cozy gamer 和硬核玩家能共存吗？',
    a: '完全可以。很多玩家两种风格都玩——用 cozy 游戏放松，用硬核游戏寻求挑战。Cozy gamer 不是排他标签，只是一种偏好而已。',
  },
  {
    q: '什么样的游戏算 cozy 游戏？',
    a: 'Cozy 游戏通常具备这些特征：没有（或极少）失败惩罚、节奏轻松无紧迫感、画风温馨可爱、战斗简单或没有战斗、专注于创造、探索或社交关系。农场游戏、生活模拟和益智游戏通常属于 cozy 类型。',
  },
  {
    q: '星露谷物语算 cozy 游戏吗？',
    a: '算。星露谷物语是最具代表性的 cozy 游戏之一。虽然有一些可选的挑战内容（矿洞、战斗、限时节日），但核心的种田和人际关系玩法非常轻松、无压力，深受 cozy gamer 喜爱，也是最推荐新手入坑的 cozy 游戏。',
  },
]

export default async function CozyGamerPage({
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
            {isZh ? '测评' : 'Quizzes'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#e8dcc8]">
            {isZh ? 'Cozy Gamer 测试' : 'Cozy Gamer Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyGamerQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '没有对错之分——每种游戏风格都有它的乐趣所在。'
            : "No right or wrong answer — every gaming style has its own kind of magic."}
        </p>

        <RelatedQuizzes currentSlug="cozy-gamer" locale={locale} />

        {/* FAQ Section for SEO/GEO */}
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于 Cozy 游戏的常见问题' : 'Cozy Gaming FAQ'}
          </h2>
          <div className="space-y-4">
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
