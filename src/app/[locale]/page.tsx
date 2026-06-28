import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroSection } from '@/components/home/HeroSection'
import { GamesTeaser } from '@/components/home/GamesTeaser'
import { ToolsTeaser } from '@/components/home/ToolsTeaser'
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <HeroSection />
      <GamesTeaser />
      <ToolsTeaser />
      <GuidesTeaser />

      {/* TendFarm App 彩蛋 */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-[#f0a832]/15 bg-[#f0a832]/3 px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#f0a832]/70 mb-1">TendFarm App</p>
              <p className="text-sm text-[#8a9a7a]">
                {getLoc(
                  locale,
                  '我们也在做一款 iOS 健康农场 App——用你的活动和睡眠驱动农场生长。',
                  "We're also building an iOS health farming app — your activity and sleep drive your farm's growth.",
                  '我們也在做一款 iOS 健康農場 App——用你的活動和睡眠驅動農場生長。',
                  'iOSの健康農場アプリも開発中——あなたの活動と睡眠が農場の成長を促します。',
                  'iOS 건강 농장 앱도 개발 중입니다 — 당신의 활동과 수면이 농장 성장을 이끕니다.',
                  'Wir bauen auch eine iOS-Gesundheits-Farm-App — deine Aktivität und dein Schlaf treiben das Wachstum deiner Farm an.',
                )}
              </p>
            </div>
            <Link
              href={`/${locale}/tendfarm`}
              className="shrink-0 rounded-lg border border-[#f0a832]/30 px-4 py-2 text-xs font-medium text-[#f0a832]/80 hover:text-[#f0a832] hover:border-[#f0a832]/60 transition-colors"
            >
              {getLoc(locale, '了解更多 →', 'Learn more →', '了解更多 →', '詳しく見る →', '자세히 보기 →', 'Mehr erfahren →')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
