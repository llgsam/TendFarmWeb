import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { getGuides } from '@/lib/guides'
import { GUIDE_CATEGORIES, guideLoc as getLoc } from '@/lib/guide-categories'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'guides' })
  return {
    title: `${t('title')} — TendFarm`,
    description: t('subtitle'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/guides`,
      languages: buildLanguageAlternates('/guides'),
    },
  }
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'guides' })

  // Keep only categories that actually have articles, with their counts.
  const cats = (
    await Promise.all(
      GUIDE_CATEGORIES.map(async (c) => ({ ...c, count: (await getGuides(locale, c.key)).length }))
    )
  ).filter((c) => c.count > 0)

  const featured = cats.filter((c) => c.featured)
  const rest = cats.filter((c) => !c.featured)

  const countLabel = (n: number) =>
    getLoc(locale, `${n} 篇攻略`, `${n} guide${n === 1 ? '' : 's'}`, `${n} 篇攻略`, `${n} 記事`, `${n}개 가이드`, `${n} Guide${n === 1 ? '' : 's'}`)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-3 text-4xl font-bold text-[#e8dcc8]">{t('title')}</h1>
      <p className="mb-12 text-[#8a9a7a]">{t('subtitle')}</p>

      {/* Featured hub (best-games) */}
      {featured.map((c) => (
        <Link
          key={c.key}
          href={`/${locale}/guides/${c.key}`}
          className="group mb-8 block rounded-2xl border border-[#f0a832]/30 bg-[#1a2e1a] p-7 transition-colors hover:border-[#f0a832]"
        >
          <div className="flex items-start gap-4">
            <span className="text-4xl">{c.emoji}</span>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-3">
                <h2 className="text-xl font-bold text-[#e8dcc8] transition-colors group-hover:text-[#f0a832]">
                  {c.name(locale)}
                </h2>
                <span className="rounded-full bg-[#2d5a27] px-2.5 py-0.5 text-xs text-[#8a9a7a]">{countLabel(c.count)}</span>
              </div>
              <p className="text-sm text-[#8a9a7a]">{c.desc(locale)}</p>
              <p className="mt-3 text-xs text-[#f0a832]">{t('readMore')}</p>
            </div>
          </div>
        </Link>
      ))}

      {/* Game-specific guide collections */}
      <div className="grid gap-6 md:grid-cols-3">
        {rest.map((c) => (
          <Link
            key={c.key}
            href={`/${locale}/guides/${c.key}`}
            className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-6 transition-colors hover:border-[#f0a832]"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">{c.emoji}</span>
              <h2 className="text-lg font-semibold text-[#e8dcc8] transition-colors group-hover:text-[#f0a832]">
                {c.name(locale)}
              </h2>
            </div>
            <p className="text-sm text-[#8a9a7a]">{c.desc(locale)}</p>
            <p className="mt-4 text-xs text-[#8a9a7a]">{countLabel(c.count)}</p>
            <p className="mt-1 text-xs text-[#f0a832]">{t('readMore')}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
