import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { ConceptCards } from '@/components/home/ConceptCards'
import { ToolsTeaser } from '@/components/home/ToolsTeaser'
import { GuidesTeaser } from '@/components/home/GuidesTeaser'
import { WaitlistSection } from '@/components/home/WaitlistSection'
import { BASE_URL, otherLocale } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const other = otherLocale(locale)
  return {
    title: `Tend Farm — ${t('meta.title')}`,
    description: t('meta.description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        [locale]: `${BASE_URL}/${locale}`,
        [other]: `${BASE_URL}/${other}`,
      },
    },
  }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ConceptCards />
      <ToolsTeaser />
      <GuidesTeaser />
      <WaitlistSection />
    </>
  )
}
