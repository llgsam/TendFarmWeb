import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { WaitlistSection } from '@/components/home/WaitlistSection'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'gameplay' })
  const other = otherLocale(locale)
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/gameplay`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/gameplay`,
        [other]: `${BASE_URL}/${other}/gameplay`,
      },
    },
  }
}

export default function GameplayPage() {
  const t = useTranslations('gameplay')
  const crops = t.raw('crops.list') as Array<{ name: string; cycle: string; desc: string }>
  const days = t.raw('week.days') as Array<{ day: string; exp: string }>
  const steps = t.raw('loop.steps') as string[]

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-12 text-4xl font-bold text-[#e8dcc8]">{t('hero.title')}</h1>

      {/* 核心循环 */}
      <section className="mb-16">
        <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">{t('loop.title')}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="rounded-lg border border-[#2d3d2d] bg-[#1a2e1a] px-3 py-1.5 text-sm text-[#e8dcc8]">
                {step}
              </span>
              {i < steps.length - 1 && <span className="text-[#4a5a4a]">→</span>}
            </div>
          ))}
        </div>
      </section>

      {/* 作物一览 */}
      <section className="mb-16">
        <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">{t('crops.title')}</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {crops.map((crop) => (
            <div key={crop.name} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-4">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="font-semibold text-[#e8dcc8]">{crop.name}</span>
                <span className="text-xs text-[#f0a832]">{crop.cycle}</span>
              </div>
              <p className="text-sm text-[#8a9a7a]">{crop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 前 7 天节奏 */}
      <section className="mb-16">
        <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">{t('week.title')}</h2>
        <div className="space-y-3">
          {days.map((d, i) => (
            <div key={i} className="flex gap-4 rounded-lg border border-[#2d3d2d] bg-[#1a2e1a] p-4">
              <span className="min-w-[60px] text-sm font-semibold text-[#f0a832]">{d.day}</span>
              <span className="text-sm text-[#8a9a7a]">{d.exp}</span>
            </div>
          ))}
        </div>
      </section>

      <WaitlistSection />
    </div>
  )
}
