import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GAMES, getGameBySlug, getAllGameSlugs, PLATFORM_LABELS, getStyleLabels, getGameName, getGameDesc, getGameLongDesc, getGameForWhom, getGameTip, getGameFeatures } from '@/lib/games'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { videoGameSchema, breadcrumbSchema, faqSchema } from '@/lib/structured-data'

const ALL_LOCALES = ['zh', 'en', 'zh-TW', 'ja', 'ko', 'de']

export async function generateStaticParams() {
  const slugs = getAllGameSlugs()
  return ALL_LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

function getLoc(locale: string, zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW ?? zh
  if (locale === 'ja') return ja ?? en
  if (locale === 'ko') return ko ?? en
  if (locale === 'de') return de ?? en
  return en
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const game = getGameBySlug(slug)
  if (!game) return {}

  const name = getGameName(game, locale)
  const desc = getGameDesc(game, locale)

  const titleSuffix = getLoc(locale, '攻略与推荐', 'Review & Guide', '攻略與推薦', 'レビュー・攻略', '리뷰 및 공략', 'Review & Guide')

  return {
    title: `${name} ${titleSuffix} | Farming Game Hub`,
    description: desc,
    alternates: {
      canonical: `${BASE_URL}/${locale}/games/${slug}`,
      languages: buildLanguageAlternates(`/games/${slug}`),
    },
  }
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const game = getGameBySlug(slug)
  if (!game) notFound()

  const styleLabels = getStyleLabels(locale)
  const name = getGameName(game, locale)
  const desc = getGameLongDesc(game, locale)
  const forWhom = getGameForWhom(game, locale)
  const tip = getGameTip(game, locale)
  const features = getGameFeatures(game, locale)
  const developer = locale === 'zh' || locale === 'zh-TW' ? game.developerZh : game.developerEn
  const styles = game.styles.map((s) => styleLabels[s])

  const related = (game.relatedSlugs ?? [])
    .map((s) => GAMES.find((g) => g.slug === s))
    .filter(Boolean)

  const gameSchema = videoGameSchema(game, locale, {
    name,
    description: getGameDesc(game, locale),
    developer,
  })
  const breadcrumb = breadcrumbSchema([
    { name: getLoc(locale, '首页', 'Home', '首頁', 'ホーム', '홈', 'Startseite'), url: `${BASE_URL}/${locale}` },
    { name: getLoc(locale, '游戏大全', 'All Games', '遊戲大全', 'ゲーム一覧', '모든 게임', 'Alle Spiele'), url: `${BASE_URL}/${locale}/games` },
    { name, url: `${BASE_URL}/${locale}/games/${slug}` },
  ])

  const platformNames = game.platforms.map((p) => PLATFORM_LABELS[p]).join(locale === 'zh' || locale === 'zh-TW' ? '、' : ', ')
  // Localized content for FAQ answers
  const faqDesc = getGameDesc(game, locale)
  const faqTip = getGameTip(game, locale)
  const faqForWhom = getGameForWhom(game, locale)

  const faqs = locale === 'zh'
    ? [
        { question: `${name} 是什么游戏？`, answer: faqDesc },
        { question: `${name} 支持哪些平台？`, answer: `${name} 支持以下平台：${platformNames}。` },
        { question: `${name} 适合新手吗？`, answer: faqTip || `${name} 对新手相对友好，建议先了解基本玩法。` },
        { question: `${name} 是谁开发的？`, answer: `${name} 由 ${developer} 于 ${game.year} 年开发。` },
        { question: `${name} 适合什么类型的玩家？`, answer: faqForWhom },
      ]
    : locale === 'zh-TW'
    ? [
        { question: `${name} 是什麼遊戲？`, answer: faqDesc },
        { question: `${name} 支援哪些平台？`, answer: `${name} 支援以下平台：${platformNames}。` },
        { question: `${name} 適合新手嗎？`, answer: faqTip || `${name} 對新手相對友好，建議先了解基本玩法。` },
        { question: `${name} 是誰開發的？`, answer: `${name} 由 ${developer} 於 ${game.year} 年開發。` },
        { question: `${name} 適合什麼類型的玩家？`, answer: faqForWhom },
      ]
    : locale === 'ja'
    ? [
        { question: `${name} はどんなゲームですか？`, answer: faqDesc },
        { question: `${name} はどのプラットフォームで遊べますか？`, answer: `${name} は ${platformNames} で遊べます。` },
        { question: `${name} は初心者向けですか？`, answer: faqTip || `${name} は初心者に優しく、すぐに楽しめます。` },
        { question: `${name} の開発者は？`, answer: `${name} は ${developer} が ${game.year} 年にリリースしました。` },
        { question: `${name} はどんな人に向いていますか？`, answer: faqForWhom },
      ]
    : locale === 'ko'
    ? [
        { question: `${name}는 어떤 게임인가요?`, answer: faqDesc },
        { question: `${name}는 어떤 플랫폼에서 즐길 수 있나요?`, answer: `${name}는 ${platformNames}에서 플레이할 수 있습니다.` },
        { question: `${name}는 초보자에게 적합한가요?`, answer: faqTip || `${name}는 초보자 친화적인 게임입니다.` },
        { question: `${name}는 누가 개발했나요?`, answer: `${name}는 ${developer}이 ${game.year}년에 출시했습니다.` },
        { question: `${name}는 어떤 플레이어에게 맞나요?`, answer: faqForWhom },
      ]
    : locale === 'de'
    ? [
        { question: `Was ist ${name}?`, answer: faqDesc },
        { question: `Auf welchen Plattformen ist ${name} verfügbar?`, answer: `${name} ist auf ${platformNames} verfügbar.` },
        { question: `Ist ${name} für Anfänger geeignet?`, answer: faqTip || `${name} ist einsteiger­freundlich.` },
        { question: `Wer hat ${name} entwickelt?`, answer: `${name} wurde von ${developer} im Jahr ${game.year} veröffentlicht.` },
        { question: `Für wen ist ${name} gedacht?`, answer: faqForWhom },
      ]
    : [
        { question: `What is ${name}?`, answer: faqDesc },
        { question: `What platforms is ${name} available on?`, answer: `${name} is available on: ${platformNames}.` },
        { question: `Is ${name} good for beginners?`, answer: faqTip || `${name} is beginner-friendly with a gentle learning curve.` },
        { question: `Who developed ${name}?`, answer: `${name} was developed by ${developer} and released in ${game.year}.` },
        { question: `Who should play ${name}?`, answer: faqForWhom },
      ]

  const faq = faqSchema(faqs.filter((f) => f.answer))

  return (
    <div className="min-h-screen px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-[#8a9a7a]">
          <Link href={`/${locale}`} className="hover:text-[#e8dcc8]">
            {getLoc(locale, '首页', 'Home', '首頁', 'ホーム', '홈', 'Startseite')}
          </Link>
          <span>›</span>
          <Link href={`/${locale}/games`} className="hover:text-[#e8dcc8]">
            {getLoc(locale, '游戏大全', 'All Games', '遊戲大全', 'ゲーム一覧', '모든 게임', 'Alle Spiele')}
          </Link>
          <span>›</span>
          <span className="text-[#e8dcc8]">{name}</span>
        </nav>

        {/* Hero */}
        <div className="mb-10 rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-8">
          <div className="mb-4 text-5xl">{game.emoji}</div>
          <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">{name}</h1>
          <div className="mb-4 flex flex-wrap gap-2">
            {styles.map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#2d3d2d] px-3 py-0.5 text-xs text-[#8a9a7a]"
              >
                {s}
              </span>
            ))}
            {game.platforms.map((p) => (
              <span
                key={p}
                className="rounded-full border border-[#2d3d2d] px-3 py-0.5 text-xs text-[#8a9a7a]"
              >
                {PLATFORM_LABELS[p]}
              </span>
            ))}
          </div>
          <p className="text-sm text-[#8a9a7a]">
            {getLoc(locale, '开发商：', 'Developer: ', '開發商：', 'デベロッパー: ', '개발사: ', 'Entwickler: ')}
            <span className="text-[#e8dcc8]">{developer}</span>
            <span className="mx-2">·</span>
            {game.year}
          </p>
        </div>

        {/* Description */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
            {getLoc(locale, '游戏介绍', 'About the Game', '遊戲介紹', 'ゲーム紹介', '게임 소개', 'Über das Spiel')}
          </h2>
          <p className="leading-relaxed text-[#8a9a7a]">{desc}</p>
        </section>

        {/* Features */}
        {game.features.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
              {getLoc(locale, '核心玩法亮点', 'Key Features', '核心玩法亮點', '主な特徴', '주요 특징', 'Highlights')}
            </h2>
            <ul className="space-y-2">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: game.color }}
                  />
                  <span className="text-sm text-[#8a9a7a]">{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Who is it for */}
        {forWhom && (
          <section className="mb-10 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f]/50 p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f0a832]">
              {getLoc(locale, '适合什么样的玩家？', 'Who Is This Game For?', '適合什麼樣的玩家？', 'こんな人におすすめ', '이런 플레이어에게 추천', 'Für wen ist dieses Spiel?')}
            </h2>
            <p className="text-sm leading-relaxed text-[#8a9a7a]">{forWhom}</p>
          </section>
        )}

        {/* Beginner tip */}
        {tip && (
          <section className="mb-10 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#7bc67e]">
              {getLoc(locale, '新手小贴士', 'Beginner Tip', '新手小貼士', '初心者へのアドバイス', '초보자 팁', 'Einsteiger-Tipp')}
            </h2>
            <p className="text-sm leading-relaxed text-[#8a9a7a]">{tip}</p>
          </section>
        )}

        {/* Tools & Guides links */}
        {(game.hasTools || game.hasGuides) && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
              {getLoc(locale, '更多资源', 'More Resources', '更多資源', 'その他のリソース', '더 많은 리소스', 'Weitere Ressourcen')}
            </h2>
            <div className="flex flex-wrap gap-3">
              {game.hasTools && (
                <Link
                  href={`/${locale}/tools/${game.slug}`}
                  className="rounded-lg border border-[#f0a832]/30 px-4 py-2 text-sm text-[#f0a832] hover:border-[#f0a832]/60 hover:bg-[#f0a832]/5 transition-colors"
                >
                  {getLoc(locale, `📊 ${name} 计算器`, `📊 ${name} Calculator`, `📊 ${name} 計算器`, `📊 ${name} 計算ツール`, `📊 ${name} 계산기`, `📊 ${name} Rechner`)}
                </Link>
              )}
              {game.hasGuides && (
                <Link
                  href={`/${locale}/guides/${game.slug}`}
                  className="rounded-lg border border-[#7bc67e]/30 px-4 py-2 text-sm text-[#7bc67e] hover:border-[#7bc67e]/60 hover:bg-[#7bc67e]/5 transition-colors"
                >
                  {getLoc(locale, `📖 ${name} 攻略`, `📖 ${name} Guides`, `📖 ${name} 攻略`, `📖 ${name} 攻略`, `📖 ${name} 공략`, `📖 ${name} Guides`)}
                </Link>
              )}
              <Link
                href={`/${locale}/quizzes`}
                className="rounded-lg border border-[#f0a832]/30 px-4 py-2 text-sm text-[#f0a832] hover:border-[#f0a832]/60 hover:bg-[#f0a832]/5 transition-colors"
              >
                {getLoc(locale, '🌾 农场游戏测验', '🌾 Farm Game Quizzes', '🌾 農場遊戲測驗', '🌾 農場ゲーム診断', '🌾 농장 게임 퀴즈', '🌾 Farmspiel-Quizze')}
              </Link>
            </div>
          </section>
        )}

        {/* Related games */}
        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
              {getLoc(locale, '类似游戏', 'Similar Games', '類似遊戲', '似たようなゲーム', '비슷한 게임', 'Ähnliche Spiele')}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((r) => {
                if (!r) return null
                const rName = getGameName(r, locale)
                return (
                  <Link
                    key={r.slug}
                    href={`/${locale}/games/${r.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-4 hover:border-[#f0a832]/30 transition-colors"
                  >
                    <span className="text-2xl">{r.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors">
                        {rName}
                      </p>
                      <p className="text-xs text-[#8a9a7a]">
                        {r.styles.map((s) => styleLabels[s]).join(' · ')}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="mb-6 text-lg font-semibold text-[#e8dcc8]">
            {getLoc(locale, '常见问题', 'Frequently Asked Questions', '常見問題', 'よくある質問', '자주 묻는 질문', 'Häufig gestellte Fragen')}
          </h2>
          <div className="space-y-4">
            {faqs.filter((f) => f.answer).map((faqItem, i) => (
              <details
                key={i}
                className="group rounded-xl border border-[#2d3d2d] bg-[#0f1a0f]/30 open:border-[#f0a832]/20"
              >
                <summary className="cursor-pointer select-none px-5 py-4 text-sm font-medium text-[#e8dcc8] list-none flex items-center justify-between">
                  {faqItem.question}
                  <span className="ml-2 text-[#8a9a7a] group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-4 text-sm text-[#8a9a7a] leading-relaxed">{faqItem.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Back link */}
        <div className="flex items-center justify-between border-t border-[#2d3d2d] pt-6">
          <Link
            href={`/${locale}/games`}
            className="text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            ← {getLoc(locale, '回到游戏大全', 'Back to All Games', '回到遊戲大全', 'ゲーム一覧に戻る', '모든 게임으로 돌아가기', 'Zurück zur Spielliste')}
          </Link>
          <Link
            href={`/${locale}/quizzes/farm-personality`}
            className="text-sm text-[#f0a832] hover:underline"
          >
            {getLoc(locale, '🌾 测测你的农场人格 →', '🌾 Take the Farm Quiz →', '🌾 測測你的農場人格 →', '🌾 農場診断を受ける →', '🌾 농장 퀴즈 하기 →', '🌾 Farm-Quiz starten →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
