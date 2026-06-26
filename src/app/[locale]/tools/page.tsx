import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { WaitlistForm } from '@/components/ui/WaitlistForm'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'tools' })
  const other = otherLocale(locale)
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/tools`,
        [other]: `${BASE_URL}/${other}/tools`,
      },
    },
  }
}

export default function ToolsPage() {
  const t = useTranslations('tools')
  const locale = useLocale()
  const tools = t.raw('coming') as Array<{ title: string; desc: string }>
  const wt = useTranslations('waitlist')

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-3 text-4xl font-bold text-[#e8dcc8]">{t('hero.title')}</h1>
      <p className="mb-12 text-lg text-[#8a9a7a]">{t('hero.subtitle')}</p>

      <div className="mb-16 grid gap-4 md:grid-cols-3">
        {tools.map((tool) => (
          <div key={tool.title} className="rounded-xl border border-dashed border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
            <span className="mb-3 inline-block rounded-full bg-[#2d3d2d] px-2 py-0.5 text-xs text-[#8a9a7a]">
              {t('comingSoon')}
            </span>
            <h3 className="mb-2 font-semibold text-[#e8dcc8]">{tool.title}</h3>
            <p className="text-sm text-[#8a9a7a]">{tool.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold text-[#e8dcc8]">{t('notify')}</h2>
        <p className="mb-6 text-sm text-[#8a9a7a]">{wt('subtitle')}</p>
        <div className="mx-auto max-w-md">
          <WaitlistForm
            locale={locale}
            sourcePage="tools"
            successMessage={wt('success')}
            duplicateMessage={wt('duplicate')}
            errorMessage={wt('error')}
            buttonText={wt('button')}
            placeholder={wt('placeholder')}
          />
        </div>
      </div>
    </div>
  )
}
