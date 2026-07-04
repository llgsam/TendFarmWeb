import { getGuideBySlug, getAllGuideSlugs } from '@/lib/guides'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/structured-data'
import { getGuideCategory } from '@/lib/guide-categories'

export async function generateStaticParams() {
  const slugs = await getAllGuideSlugs()
  return slugs.map(({ locale, game, slug }) => ({ locale, game, slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; game: string; slug: string }>
}): Promise<Metadata> {
  const { locale, game, slug } = await params
  const post = await getGuideBySlug(locale, game, slug)
  if (!post) return {}

  return {
    title: `${post.title} — Farming Game Hub`,
    description: post.description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/guides/${game}/${slug}`,
      languages: buildLanguageAlternates(`/guides/${game}/${slug}`),
    },
  }
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ locale: string; game: string; slug: string }>
}) {
  const { locale, game, slug } = await params
  const post = await getGuideBySlug(locale, game, slug)
  if (!post) notFound()

  // Use the localized category name (e.g. "Best Games & Comparisons" / "おすすめ＆比較ガイド")
  // rather than a title-cased slug.
  const category = getGuideCategory(game)
  const gameLabel = category
    ? category.name(locale)
    : game.split('-').map((w: string) => w[0].toUpperCase() + w.slice(1)).join(' ')
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const article = articleSchema(
    { title: post.title, description: post.description, publishedAt: post.publishedAt, slug, game },
    locale
  )
  // Home > {category} > article. (No generic "Guides" level — /guides is a redirect
  // to the comparison hub; the category already conveys the section.)
  const breadcrumb = breadcrumbSchema([
    { name: isZh ? '首页' : 'Home', url: `${BASE_URL}/${locale}` },
    { name: gameLabel, url: `${BASE_URL}/${locale}/guides/${game}` },
    { name: post.title, url: `${BASE_URL}/${locale}/guides/${game}/${slug}` },
  ])

  const hasFaqs = post.faqs.length > 0
  const faq = hasFaqs
    ? faqSchema(post.faqs.map((f) => ({ question: f.q, answer: f.a })))
    : null

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
      )}

      {/* Back link */}
      <Link
        href={`/${locale}/guides/${game}`}
        className="mb-6 inline-block text-sm text-[#8a9a7a] transition-colors hover:text-[#f0a832]"
      >
        ← {gameLabel}
      </Link>

      {/* Article header */}
      <h1 className="mb-3 text-3xl font-bold leading-tight text-[#e8dcc8]">{post.title}</h1>
      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-[#8a9a7a]">
        {post.publishedAt && <span>{post.publishedAt}</span>}
        <span>·</span>
        <span>{post.readingTime} {isZh ? '分钟阅读' : 'min read'}</span>
      </div>
      {post.tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#2d3d2d] px-2 py-0.5 text-xs text-[#8a9a7a]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Table of Contents */}
      {post.toc.length > 2 && (
        <nav
          aria-label={isZh ? '目录' : 'Table of contents'}
          className="mb-10 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] px-5 py-4"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#8a9a7a]">
            {isZh ? '本文目录' : 'On this page'}
          </p>
          <ol className="space-y-1.5">
            {post.toc.map((h) => (
              <li
                key={h.id}
                className={h.level === 3 ? 'ml-4' : ''}
              >
                <a
                  href={`#${h.id}`}
                  className="text-sm text-[#8a9a7a] transition-colors hover:text-[#f0a832]"
                >
                  {h.level === 2 ? '· ' : '○ '}
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Article content */}
      <article
        className="guide-prose prose prose-invert prose-p:text-[#c8bca8] prose-headings:text-[#e8dcc8] prose-a:text-[#f0a832] prose-strong:text-[#e8dcc8] prose-li:text-[#c8bca8] max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Calculator cross-link */}
      {(game === 'hay-day' || game === 'stardew-valley') && (
        <div className="mt-12 flex items-center justify-between rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a] px-5 py-4">
          <p className="text-sm text-[#8a9a7a]">
            {game === 'hay-day'
              ? (isZh ? '用计算器验证文中的作物效益数据' : 'Verify crop profit data with our calculator')
              : (isZh ? '用计算器算出本季最优种植方案' : 'Calculate the best crops for your season')}
          </p>
          <Link
            href={`/${locale}/tools/${game === 'hay-day' ? 'hay-day' : 'stardew'}`}
            className="ml-4 shrink-0 rounded-lg bg-[#f0a832]/10 px-4 py-1.5 text-sm font-semibold text-[#f0a832] transition-colors hover:bg-[#f0a832]/20"
          >
            {isZh ? '打开计算器 →' : 'Open Calculator →'}
          </Link>
        </div>
      )}

      {/* FAQ section */}
      {hasFaqs && (
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {locale === 'zh' ? '常见问题' : locale === 'zh-TW' ? '常見問題' : locale === 'ja' ? 'よくある質問' : locale === 'ko' ? '자주 묻는 질문' : locale === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {post.faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] px-5 py-4">
                <p className="mb-2 font-semibold text-[#e8dcc8]">{faq.q}</p>
                <p className="text-sm text-[#8a9a7a]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
