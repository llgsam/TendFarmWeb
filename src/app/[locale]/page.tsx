import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { ConceptCards } from '@/components/home/ConceptCards'
import { GuidesTeaser } from '@/components/home/GuidesTeaser'
import { WaitlistSection } from '@/components/home/WaitlistSection'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: `TendFarm — ${t('meta.title')}`,
    description: t('meta.description'),
  }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ConceptCards />
      <GuidesTeaser />
      <WaitlistSection />
    </>
  )
}
