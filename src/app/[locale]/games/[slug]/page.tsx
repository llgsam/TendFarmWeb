import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GAMES, getGameBySlug, getAllGameSlugs, PLATFORM_LABELS, STYLE_LABELS_ZH, STYLE_LABELS_EN } from '@/lib/games'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { videoGameSchema, breadcrumbSchema, faqSchema } from '@/lib/structured-data'

export async function generateStaticParams() {
  const locales = ['zh', 'en']
  const slugs = getAllGameSlugs()
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const game = getGameBySlug(slug)
  if (!game) return {}

  const isZh = locale === 'zh'
  const name = isZh ? game.nameZh : game.nameEn
  const desc = isZh ? game.descZh : game.descEn

  return {
    title: isZh
      ? `${name} 攻略与推荐 | Farming Game Hub`
      : `${name} Review & Guide | Farming Game Hub`,
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

  const isZh = locale === 'zh'
  const name = isZh ? game.nameZh : game.nameEn
  const desc = isZh ? game.longDescZh : game.longDescEn
  const forWhom = isZh ? game.forWhomZh : game.forWhomEn
  const tip = isZh ? game.tipZh : game.tipEn
  const styles = game.styles.map((s) => (isZh ? STYLE_LABELS_ZH[s] : STYLE_LABELS_EN[s]))

  const related = (game.relatedSlugs ?? [])
    .map((s) => GAMES.find((g) => g.slug === s))
    .filter(Boolean)

  const gameSchema = videoGameSchema(game, locale)
  const breadcrumb = breadcrumbSchema([
    { name: isZh ? '首页' : 'Home', url: `${BASE_URL}/${locale}` },
    { name: isZh ? '游戏大全' : 'All Games', url: `${BASE_URL}/${locale}/games` },
    { name, url: `${BASE_URL}/${locale}/games/${slug}` },
  ])

  const platformNames = game.platforms.map((p) => PLATFORM_LABELS[p]).join('、')
  const faqs = isZh
    ? [
        {
          question: `${name} 是什么游戏？`,
          answer: game.descZh,
        },
        {
          question: `${name} 支持哪些平台？`,
          answer: `${name} 支持以下平台：${platformNames}。`,
        },
        {
          question: `${name} 适合新手吗？`,
          answer: game.tipZh || `${name} 对新手相对友好，建议先了解基本玩法。`,
        },
        {
          question: `${name} 是谁开发的？`,
          answer: `${name} 由 ${game.developerZh} 于 ${game.year} 年开发。`,
        },
        {
          question: `${name} 适合什么类型的玩家？`,
          answer: game.forWhomZh,
        },
      ]
    : [
        {
          question: `What is ${name}?`,
          answer: game.descEn,
        },
        {
          question: `What platforms is ${name} available on?`,
          answer: `${name} is available on: ${platformNames}.`,
        },
        {
          question: `Is ${name} good for beginners?`,
          answer: game.tipEn || `${name} is beginner-friendly with a gentle learning curve.`,
        },
        {
          question: `Who developed ${name}?`,
          answer: `${name} was developed by ${game.developerEn} and released in ${game.year}.`,
        },
        {
          question: `Who should play ${name}?`,
          answer: game.forWhomEn,
        },
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
            {isZh ? '首页' : 'Home'}
          </Link>
          <span>›</span>
          <Link href={`/${locale}/games`} className="hover:text-[#e8dcc8]">
            {isZh ? '游戏大全' : 'All Games'}
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
            {isZh ? '开发商：' : 'Developer: '}
            <span className="text-[#e8dcc8]">{isZh ? game.developerZh : game.developerEn}</span>
            <span className="mx-2">·</span>
            {game.year}
          </p>
        </div>

        {/* Description */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
            {isZh ? '游戏介绍' : 'About the Game'}
          </h2>
          <p className="leading-relaxed text-[#8a9a7a]">{desc}</p>
        </section>

        {/* Features */}
        {game.features.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
              {isZh ? '核心玩法亮点' : 'Key Features'}
            </h2>
            <ul className="space-y-2">
              {game.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: game.color }}
                  />
                  <span className="text-sm text-[#8a9a7a]">{isZh ? f.zh : f.en}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Who is it for */}
        {forWhom && (
          <section className="mb-10 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f]/50 p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f0a832]">
              {isZh ? '适合什么样的玩家？' : 'Who Is This Game For?'}
            </h2>
            <p className="text-sm leading-relaxed text-[#8a9a7a]">{forWhom}</p>
          </section>
        )}

        {/* Beginner tip */}
        {tip && (
          <section className="mb-10 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#7bc67e]">
              {isZh ? '新手小贴士' : 'Beginner Tip'}
            </h2>
            <p className="text-sm leading-relaxed text-[#8a9a7a]">{tip}</p>
          </section>
        )}

        {/* Tools & Guides links */}
        {(game.hasTools || game.hasGuides) && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
              {isZh ? '更多资源' : 'More Resources'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {game.hasTools && (
                <Link
                  href={`/${locale}/tools/${game.slug}`}
                  className="rounded-lg border border-[#f0a832]/30 px-4 py-2 text-sm text-[#f0a832] hover:border-[#f0a832]/60 hover:bg-[#f0a832]/5 transition-colors"
                >
                  {isZh ? `📊 ${name} 计算器` : `📊 ${name} Calculator`}
                </Link>
              )}
              {game.hasGuides && (
                <Link
                  href={`/${locale}/guides`}
                  className="rounded-lg border border-[#7bc67e]/30 px-4 py-2 text-sm text-[#7bc67e] hover:border-[#7bc67e]/60 hover:bg-[#7bc67e]/5 transition-colors"
                >
                  {isZh ? `📖 ${name} 攻略` : `📖 ${name} Guides`}
                </Link>
              )}
            </div>
          </section>
        )}

        {/* Related games */}
        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
              {isZh ? '类似游戏' : 'Similar Games'}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((r) => {
                if (!r) return null
                return (
                  <Link
                    key={r.slug}
                    href={`/${locale}/games/${r.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-4 hover:border-[#f0a832]/30 transition-colors"
                  >
                    <span className="text-2xl">{r.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors">
                        {isZh ? r.nameZh : r.nameEn}
                      </p>
                      <p className="text-xs text-[#8a9a7a]">
                        {r.styles.map((s) => (isZh ? STYLE_LABELS_ZH[s] : STYLE_LABELS_EN[s])).join(' · ')}
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
            {isZh ? '常见问题' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {faqs.filter((f) => f.answer).map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-[#2d3d2d] bg-[#0f1a0f]/30 open:border-[#f0a832]/20"
              >
                <summary className="cursor-pointer select-none px-5 py-4 text-sm font-medium text-[#e8dcc8] list-none flex items-center justify-between">
                  {faq.question}
                  <span className="ml-2 text-[#8a9a7a] group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="px-5 pb-4 text-sm text-[#8a9a7a] leading-relaxed">{faq.answer}</p>
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
            ← {isZh ? '回到游戏大全' : 'Back to All Games'}
          </Link>
          <Link
            href={`/${locale}/quizzes/farm-personality`}
            className="text-sm text-[#f0a832] hover:underline"
          >
            {isZh ? '🌾 测测你的农场人格 →' : '🌾 Take the Farm Quiz →'}
          </Link>
        </div>
      </div>
    </div>
  )
}
