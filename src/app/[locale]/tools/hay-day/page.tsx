import { getTranslations } from 'next-intl/server'
import { HayDayCalculator } from '@/components/tools/HayDayCalculator'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    title: isZh
      ? 'Hay Day 作物利润计算器 — 最优种植策略'
      : 'Hay Day Crop Profit Calculator — Best Crops by Play Style',
    description: isZh
      ? '免费的 Hay Day 作物效益计算器：按游戏风格（活跃/休闲/挂机）筛选最优作物，实时显示每分钟和每小时金币利润。'
      : 'Free Hay Day crop profit calculator. Filter by play style (active/casual/AFK) and see gold per minute and gold per hour for every crop.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/hay-day`,
      languages: buildLanguageAlternates('/tools/hay-day'),
    },
  }
}

export default async function HayDayToolPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {isZh ? '工具集' : 'Tools'}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">Hay Day</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {isZh ? 'Hay Day 作物利润计算器' : 'Hay Day Crop Profit Calculator'}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {isZh
          ? '根据你的游戏风格，找出当前等级下利润最高的田地作物。支持按利润/分钟、利润/小时排序。'
          : 'Find the most profitable field crops for your play style. Sort by gold per minute or per hour.'}
      </p>

      <HayDayCalculator locale={locale} />

      {/* Related links */}
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {isZh ? '相关攻略' : 'Related Guides'}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/guides/hay-day`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {isZh ? 'Hay Day 攻略中心 →' : 'Hay Day Guides →'}
          </Link>
          <Link
            href={`/${locale}/tools/stardew`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {isZh ? '星露谷作物计算器 →' : 'Stardew Valley Calculator →'}
          </Link>
        </div>
      </div>
    </div>
  )
}
