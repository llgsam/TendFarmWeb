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
  const t = await getTranslations({ locale, namespace: 'lifestyle' })
  const other = otherLocale(locale)
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/lifestyle`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/lifestyle`,
        [other]: `${BASE_URL}/${other}/lifestyle`,
      },
    },
  }
}

export default function LifestylePage() {
  const t = useTranslations('lifestyle')
  const sections = t.raw('sections') as Array<{ id: string; title: string; body: string }>

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-12 text-4xl font-bold text-[#e8dcc8]">{t('hero.title')}</h1>
      <div className="space-y-16">
        {sections.map((s) => (
          <section key={s.id} id={s.id}>
            <h2 className="mb-4 text-xl font-semibold text-[#f0a832]">{s.title}</h2>
            <p className="text-[#8a9a7a] leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>
      <div className="mt-20">
        <WaitlistSection />
      </div>
    </div>
  )
}
