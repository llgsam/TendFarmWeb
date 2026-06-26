import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'guides' })
  const other = otherLocale(locale)
  return {
    title: `${t('title')} — Tend Farm`,
    description: t('subtitle'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/guides`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/guides`,
        [other]: `${BASE_URL}/${other}/guides`,
      },
    },
  }
}

const GAMES = ['hay-day', 'stardew-valley', 'animal-crossing'] as const

export default function GuidesPage() {
  const t = useTranslations('guides')
  const locale = useLocale()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-3 text-4xl font-bold text-[#e8dcc8]">{t('title')}</h1>
      <p className="mb-12 text-[#8a9a7a]">{t('subtitle')}</p>
      <div className="grid gap-6 md:grid-cols-3">
        {GAMES.map((game) => (
          <Link
            key={game}
            href={`/${locale}/guides/${game}`}
            className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-6 transition-colors hover:border-[#f0a832]"
          >
            <h2 className="mb-2 text-lg font-semibold text-[#e8dcc8] transition-colors group-hover:text-[#f0a832]">
              {t(`games.${game}.name`)}
            </h2>
            <p className="text-sm text-[#8a9a7a]">{t(`games.${game}.desc`)}</p>
            <p className="mt-4 text-xs text-[#f0a832]">{t('readMore')}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
