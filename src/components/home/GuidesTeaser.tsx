import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

const FEATURED_GAMES = ['hay-day', 'stardew-valley', 'animal-crossing'] as const

export function GuidesTeaser() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section className="px-4 py-16 bg-[#1a2e1a]/30">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-2xl font-semibold text-[#e8dcc8]">
          {t('home.guidesTeaser.title')}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURED_GAMES.map((game) => (
            <Link
              key={game}
              href={`/${locale}/guides/${game}`}
              className="rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-5 hover:border-[#f0a832] transition-colors"
            >
              <h3 className="font-semibold text-[#e8dcc8] mb-1">{t(`guides.games.${game}.name`)}</h3>
              <p className="text-sm text-[#8a9a7a]">{t(`guides.games.${game}.desc`)}</p>
              <p className="mt-3 text-xs text-[#f0a832]">{t('guides.readMore')}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href={`/${locale}/guides`} className="text-sm text-[#f0a832] hover:underline">
            {t('home.guidesTeaser.cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
