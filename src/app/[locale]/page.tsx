import { HeroSection } from '@/components/home/HeroSection'
import { ConceptCards } from '@/components/home/ConceptCards'
import { GuidesTeaser } from '@/components/home/GuidesTeaser'
import { WaitlistSection } from '@/components/home/WaitlistSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TendFarm — 你的健康生活，在这里生长',
  description: '把你的步数、睡眠、HRV 变成一座会自动生长的农场。加入候补名单，第一个体验 TendFarm。',
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
