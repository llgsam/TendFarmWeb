import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getGuides } from '@/lib/guides'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'

const VALID_GAMES = ['hay-day', 'stardew-valley', 'animal-crossing']

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; game: string }>
}): Promise<Metadata> {
  const { locale, game } = await params
  if (!VALID_GAMES.includes(game)) return {}
  const t = await getTranslations({ locale, namespace: 'guides' })
  const gameName = VALID_GAMES.includes(game)
    ? t(`games.${game as 'hay-day' | 'stardew-valley' | 'animal-crossing'}.name`)
    : game
  const other = otherLocale(locale)
  return {
    title: `${gameName} ${t('guidesLabel')} — TendFarm`,
    description: t(`games.${game as 'hay-day' | 'stardew-valley' | 'animal-crossing'}.desc`),
    alternates: {
      canonical: `${BASE_URL}/${locale}/guides/${game}`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/guides/${game}`,
        [other]: `${BASE_URL}/${other}/guides/${game}`,
      },
    },
  }
}

export default async function GameGuidesPage({
  params,
}: {
  params: Promise<{ locale: string; game: string }>
}) {
  const { locale, game } = await params
  if (!VALID_GAMES.includes(game)) notFound()

  const guides = await getGuides(locale, game)
  const t = await getTranslations({ locale, namespace: 'guides' })
  const gameName = t(`games.${game as 'hay-day' | 'stardew-valley' | 'animal-crossing'}.name`)

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href={`/${locale}/guides`}
        className="mb-6 inline-block text-sm text-[#8a9a7a] transition-colors hover:text-[#f0a832]"
      >
        ← {t('guidesCenter')}
      </Link>
      <h1 className="mb-10 text-3xl font-bold text-[#e8dcc8]">{gameName}</h1>
      {guides.length === 0 ? (
        <p className="text-[#8a9a7a]">
          {t('comingSoon')}
        </p>
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
