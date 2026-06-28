import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { DeepThinkGamesQuiz } from '@/components/tools/DeepThinkGamesQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const canonical = `${BASE_URL}/${locale}/quizzes/deep-think-games-quiz`

  const faqItems = isZh
    ? [
        { q: '空洞骑士值得玩吗？', a: '空洞骑士绝对值得——它是有史以来评价最高的独立游戏之一，PC/Switch/PS/Xbox 全平台约 15 美元，性价比极高。游戏有 40-60 小时内容，精准且令人满足的战斗系统，以及充满环境叙事的手绘昆虫废墟世界。对于从未玩过银河城游戏的玩家来说，可能较难，但非常值得坚持。' },
        { q: 'Inscryption 值得买吗？', a: 'Inscryption 非常值得——它是过去十年最具原创性的游戏之一，赢得了 2022 年独立游戏节大奖。游戏约 20 美元，8-12 小时完成，以卡牌游戏开始，然后不断颠覆你对游戏本身的认知。不要提前查阅攻略，让惊喜自然展开才是完整体验。' },
        { q: '被遗忘的城市值得买吗？', a: '被遗忘的城市绝对值得——它从一个 Skyrim 模组发展而来，赢得了编剧协会奖，是唯一一款在与电影和电视竞争中获胜的电子游戏。Xbox Game Pass 可玩，约 8 小时完成，有四个不同结局。时间循环解谜机制设计精巧，罗马世界写作出色。' },
        { q: 'Pentiment 值得买吗？', a: 'Pentiment 对于喜爱叙事和历史的玩家来说非常值得。由 Obsidian Entertainment 开发，Xbox Game Pass 可玩，约 20 美元购买。游戏以活历史手稿风格绘制，设定在 16 世纪宗教改革期间，你的选择跨越三幕 25 年影响真实人物的命运。2022 年获多项叙事奖项。' },
        { q: '有哪些像外星世界或 Tunic 的游戏可以玩？', a: '如果你喜欢外星世界（Outer Wilds）或 Tunic 那种通过探索和发现驱动的游戏，可以尝试：空洞骑士（更深的银河城探索，40+ 小时）；被遗忘的城市（时间循环解谜，知识积累驱动）；Inscryption（系统逐层揭示，每层都比上一层更奇特）；Pentiment（对话和历史细节作为"发现"机制）。做上面的测验找到最适合你的。' },
      ]
    : [
        { q: 'Is Hollow Knight worth it?', a: 'Hollow Knight is absolutely worth it — one of the highest-rated indie games ever made, about $15 on all platforms (PC/Switch/PS/Xbox) with an outstanding price-to-content ratio. The game offers 40-60+ hours of content, precise and satisfying combat, and a hand-drawn insect ruin world dense with environmental lore. It can be challenging for players new to metroidvanias, but the difficulty is fair and deeply rewarding.' },
        { q: 'Is Inscryption worth it?', a: 'Inscryption is absolutely worth it — one of the most original games of the past decade, winner of the 2022 Independent Games Festival Grand Prize. About $20, 8-12 hours to complete, it begins as a card game and then repeatedly subverts your expectations about what the game even is. Do not look up guides before playing — the revelations are the experience.' },
        { q: 'Is The Forgotten City worth it?', a: 'The Forgotten City is absolutely worth it — it evolved from a Skyrim mod to win a Writer\'s Guild Award, the only video game to win competing against film and television. Available on Xbox Game Pass, about 8 hours to complete with four distinct endings. The time-loop puzzle design is elegantly crafted, and the Roman world writing is exceptional.' },
        { q: 'Is Pentiment worth it?', a: 'Pentiment is absolutely worth it for players who love narrative and history. Developed by Obsidian Entertainment, available on Xbox Game Pass or about $20 to buy. Illustrated as a living medieval manuscript set during the 16th-century Reformation, your choices across three acts spanning 25 years shape the fates of real characters. Won multiple narrative awards in 2022.' },
        { q: 'What games are similar to Outer Wilds or Tunic?', a: 'If you loved Outer Wilds or Tunic — games driven by exploration and discovery — try: Hollow Knight (deeper metroidvania exploration, 40+ hours); The Forgotten City (time-loop mystery where knowledge accumulates across loops); Inscryption (systems revealed in layers, each stranger than the last); Pentiment (dialogue and historical detail as the discovery mechanic). Take the quiz above to find your closest match.' },
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
    name: isZh ? '哪款深度思考游戏最适合你？' : 'Which Deep-Think Game Is Right for You?',
    description: isZh
      ? '6 个问题，从空洞骑士、Inscryption、被遗忘的城市、Pentiment 中找到你的深度游戏'
      : '6 questions to match you with Hollow Knight, Inscryption, The Forgotten City, or Pentiment',
    url: canonical,
  }

  return {
    title: isZh
      ? '哪款深度思考游戏最适合你？空洞骑士 / Inscryption / 被遗忘的城市 / Pentiment | Farm Game Hub'
      : 'Which Deep-Think Game Is Right for You? Hollow Knight vs Inscryption vs The Forgotten City vs Pentiment | Farm Game Hub',
    description: isZh
      ? '6 个问题找到你的进阶挑战游戏：银河城探索（空洞骑士）、卡牌元恐怖（Inscryption）、时间循环谜题（被遗忘的城市），或历史叙事（Pentiment）。均可在 Game Pass 或 Steam 获取。'
      : '6 questions to find your next deep game: metroidvania exploration (Hollow Knight), card horror deconstruction (Inscryption), time-loop mystery (The Forgotten City), or historical narrative (Pentiment). All on Game Pass or Steam.',
    keywords: isZh
      ? ['深度游戏推荐', '空洞骑士值得玩吗', 'Inscryption 值得买吗', '被遗忘的城市值得买吗', 'Pentiment 值得买吗', '类外星世界游戏', '叙事冒险游戏推荐', '银河城游戏推荐', '独立游戏精品推荐']
      : ['deep think games quiz', 'hollow knight worth it', 'inscryption worth it', 'the forgotten city worth it', 'pentiment worth it', 'games like outer wilds', 'best narrative adventure games', 'best metroidvania games', 'best indie games for story lovers'],
    alternates: {
      canonical,
      languages: buildLanguageAlternates('/quizzes/deep-think-games-quiz'),
    },
    other: {
      'script:ld+json:faq': JSON.stringify(faqSchema),
      'script:ld+json:quiz': JSON.stringify(quizSchema),
    },
  }
}

export default async function DeepThinkGamesQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const faqItems = isZh
    ? [
        { q: '空洞骑士值得玩吗？', a: '空洞骑士绝对值得——它是有史以来评价最高的独立游戏之一，PC/Switch/PS/Xbox 全平台约 15 美元，性价比极高。游戏有 40-60 小时内容，精准且令人满足的战斗系统，以及充满环境叙事的手绘昆虫废墟世界。对于从未玩过银河城游戏的玩家来说，可能较难，但非常值得坚持。' },
        { q: 'Inscryption 值得买吗？', a: 'Inscryption 非常值得——它是过去十年最具原创性的游戏之一，赢得了 2022 年独立游戏节大奖。游戏约 20 美元，8-12 小时完成，以卡牌游戏开始，然后不断颠覆你对游戏本身的认知。不要提前查阅攻略，让惊喜自然展开才是完整体验。' },
        { q: '被遗忘的城市值得买吗？', a: '被遗忘的城市绝对值得——它从一个 Skyrim 模组发展而来，赢得了编剧协会奖，是唯一一款在与电影和电视竞争中获胜的电子游戏。Xbox Game Pass 可玩，约 8 小时完成，有四个不同结局。时间循环解谜机制设计精巧，罗马世界写作出色。' },
        { q: 'Pentiment 值得买吗？', a: 'Pentiment 对于喜爱叙事和历史的玩家来说非常值得。由 Obsidian Entertainment 开发，Xbox Game Pass 可玩，约 20 美元购买。游戏以活历史手稿风格绘制，设定在 16 世纪宗教改革期间，你的选择跨越三幕 25 年影响真实人物的命运。2022 年获多项叙事奖项。' },
        { q: '有哪些像外星世界或 Tunic 的游戏可以玩？', a: '如果你喜欢外星世界（Outer Wilds）或 Tunic 那种通过探索和发现驱动的游戏，可以尝试：空洞骑士（更深的银河城探索，40+ 小时）；被遗忘的城市（时间循环解谜，知识积累驱动）；Inscryption（系统逐层揭示，每层都比上一层更奇特）；Pentiment（对话和历史细节作为"发现"机制）。做上面的测验找到最适合你的。' },
      ]
    : [
        { q: 'Is Hollow Knight worth it?', a: 'Hollow Knight is absolutely worth it — one of the highest-rated indie games ever made, about $15 on all platforms (PC/Switch/PS/Xbox) with an outstanding price-to-content ratio. The game offers 40-60+ hours of content, precise and satisfying combat, and a hand-drawn insect ruin world dense with environmental lore. It can be challenging for players new to metroidvanias, but the difficulty is fair and deeply rewarding.' },
        { q: 'Is Inscryption worth it?', a: 'Inscryption is absolutely worth it — one of the most original games of the past decade, winner of the 2022 Independent Games Festival Grand Prize. About $20, 8-12 hours to complete, it begins as a card game and then repeatedly subverts your expectations about what the game even is. Do not look up guides before playing — the revelations are the experience.' },
        { q: 'Is The Forgotten City worth it?', a: 'The Forgotten City is absolutely worth it — it evolved from a Skyrim mod to win a Writer\'s Guild Award, the only video game to win competing against film and television. Available on Xbox Game Pass, about 8 hours to complete with four distinct endings. The time-loop puzzle design is elegantly crafted, and the Roman world writing is exceptional.' },
        { q: 'Is Pentiment worth it?', a: 'Pentiment is absolutely worth it for players who love narrative and history. Developed by Obsidian Entertainment, available on Xbox Game Pass or about $20 to buy. Illustrated as a living medieval manuscript set during the 16th-century Reformation, your choices across three acts spanning 25 years shape the fates of real characters. Won multiple narrative awards in 2022.' },
        { q: 'What games are similar to Outer Wilds or Tunic?', a: 'If you loved Outer Wilds or Tunic — games driven by exploration and discovery — try: Hollow Knight (deeper metroidvania exploration, 40+ hours); The Forgotten City (time-loop mystery where knowledge accumulates across loops); Inscryption (systems revealed in layers, each stranger than the last); Pentiment (dialogue and historical detail as the discovery mechanic). Take the quiz above to find your closest match.' },
      ]

  return (
    <div className="min-h-screen bg-[#0f1a0f] text-[#e8dcc8]">
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm text-[#8a9a7a]">
            {isZh ? '深度思考 · 游戏推荐测验' : 'Deep Think · Game Finder Quiz'}
          </p>
        </div>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-6 shadow-xl">
          <DeepThinkGamesQuiz locale={locale} />
        </div>

        <RelatedQuizzes currentSlug="deep-think-games-quiz" locale={locale} />

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
