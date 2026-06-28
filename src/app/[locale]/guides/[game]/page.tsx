import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getGuides } from '@/lib/guides'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { getGuideCategory, GUIDE_CATEGORY_KEYS } from '@/lib/guide-categories'
import { LOCALES } from '@/lib/config'

export async function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    GUIDE_CATEGORY_KEYS.map((game) => ({ locale, game }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; game: string }>
}): Promise<Metadata> {
  const { locale, game } = await params
  const category = getGuideCategory(game)
  if (!category) return {}
  const t = await getTranslations({ locale, namespace: 'guides' })
  return {
    title: `${category.name(locale)} — TendFarm`,
    description: category.desc(locale),
    alternates: {
      canonical: `${BASE_URL}/${locale}/guides/${game}`,
      languages: buildLanguageAlternates(`/guides/${game}`),
    },
  }
}

export default async function GameGuidesPage({
  params,
}: {
  params: Promise<{ locale: string; game: string }>
}) {
  const { locale, game } = await params
  const category = getGuideCategory(game)
  if (!category) notFound()

  const guides = await getGuides(locale, game)
  const t = await getTranslations({ locale, namespace: 'guides' })
  const gameName = category.name(locale)

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href={`/${locale}/guides`}
        className="mb-6 inline-block text-sm text-[#8a9a7a] transition-colors hover:text-[#f0a832]"
      >
        ← {t('guidesCenter')}
      </Link>
      <h1 className="mb-10 text-3xl font-bold text-[#e8dcc8]">{gameName}</h1>
      {/* Calculator cross-link for supported games */}
      {(game === 'hay-day' || game === 'stardew-valley') && (
        <div className="mb-8 flex items-center justify-between rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a] px-5 py-4">
          <p className="text-sm text-[#8a9a7a]">
            {game === 'hay-day'
              ? locale === 'zh' ? '边看攻略，边用计算器验证最优作物配置' : 'Pair this guide with our crop profit calculator'
              : locale === 'zh' ? '配合季节作物利润计算器，找出最优种植方案' : 'Use our crop calculator to find the best seasonal picks'}
          </p>
          <Link
            href={`/${locale}/tools/${game === 'hay-day' ? 'hay-day' : 'stardew'}`}
            className="ml-4 shrink-0 rounded-lg bg-[#f0a832]/10 px-4 py-1.5 text-sm font-semibold text-[#f0a832] hover:bg-[#f0a832]/20 transition-colors"
          >
            {locale === 'zh' ? '打开计算器 →' : 'Open Calculator →'}
          </Link>
        </div>
      )}

      {guides.length === 0 ? (
        <div>
          <p className="mb-6 text-[#8a9a7a]">{t('comingSoon')}</p>
          {locale === 'en' && (
            <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
              <p className="mb-3 text-sm font-semibold text-[#e8dcc8]">Try our interactive tools while guides are being written:</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${locale}/tools/quiz`} className="text-sm text-[#f0a832] hover:underline">🌾 Farm Personality Quiz →</Link>
                {game === 'hay-day' && <Link href={`/${locale}/tools/hay-day`} className="text-sm text-[#f0a832] hover:underline">📊 Hay Day Crop Calculator →</Link>}
                {game === 'stardew-valley' && <Link href={`/${locale}/tools/stardew`} className="text-sm text-[#f0a832] hover:underline">🌱 Stardew Valley Calculator →</Link>}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/${locale}/guides/${game}/${g.slug}`}
              className="block rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-5 transition-colors hover:border-[#f0a832]"
            >
              <h2 className="mb-1 font-semibold text-[#e8dcc8]">{g.title}</h2>
              <p className="text-sm text-[#8a9a7a]">{g.description}</p>
              {g.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#2d3d2d] px-2 py-0.5 text-xs text-[#8a9a7a]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {g.publishedAt && (
                <p className="mt-2 text-xs text-[#8a9a7a]">{g.publishedAt}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
