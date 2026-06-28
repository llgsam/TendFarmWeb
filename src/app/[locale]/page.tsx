import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroSection } from '@/components/home/HeroSection'
import { GamesTeaser } from '@/components/home/GamesTeaser'
import { ToolsTeaser } from '@/components/home/ToolsTeaser'
import { GuidesTeaser } from '@/components/home/GuidesTeaser'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    title: isZh
      ? 'Farming Game Hub — 农场游戏爱好者集结地'
      : 'Farming Game Hub — The Farming Game Community',
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
  const isZh = locale === 'zh' || locale === 'zh-TW'

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
                {isZh
                  ? '我们也在做一款 iOS 健康农场 App——用你的活动和睡眠驱动农场生长。'
                  : "We're also building an iOS health farming app — your activity and sleep drive your farm's growth."}
              </p>
            </div>
            <Link
              href={`/${locale}/tendfarm`}
              className="shrink-0 rounded-lg border border-[#f0a832]/30 px-4 py-2 text-xs font-medium text-[#f0a832]/80 hover:text-[#f0a832] hover:border-[#f0a832]/60 transition-colors"
            >
              {isZh ? '了解更多 →' : 'Learn more →'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
