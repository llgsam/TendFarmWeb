import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { GamesTeaser } from '@/components/home/GamesTeaser'
import { ToolsTeaser } from '@/components/home/ToolsTeaser'
import { QuizzesTeaser } from '@/components/home/QuizzesTeaser'
import { GuidesTeaser } from '@/components/home/GuidesTeaser'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'

function getLoc(locale: string, zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW ?? zh
  if (locale === 'ja') return ja ?? en
  if (locale === 'ko') return ko ?? en
  if (locale === 'de') return de ?? en
  return en
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: getLoc(
      locale,
      'Farming Game Hub — 农场游戏爱好者集结地',
      'Farming Game Hub — The Farming Game Community',
      'Farming Game Hub — 農場遊戲愛好者集結地',
      'Farming Game Hub — 農場ゲームファンのコミュニティ',
      'Farming Game Hub — 농장 게임 팬 커뮤니티',
      'Farming Game Hub — Die Community für Farmspiele',
    ),
    description: t('meta.description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: buildLanguageAlternates(''),
    },
  }
}

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <GamesTeaser />
      <ToolsTeaser />
      <QuizzesTeaser />
      <GuidesTeaser />
    </>
  )
}
