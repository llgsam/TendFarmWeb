import { StardewCalculator } from '@/components/tools/StardewCalculator'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const other = otherLocale(locale)
  const isZh = locale === 'zh'
  return {
    title: isZh
      ? '星露谷物语作物利润计算器 — 最优季节种植策略'
      : 'Stardew Valley Crop Profit Calculator — Best Crops Per Season',
    description: isZh
      ? '免费星露谷物语作物利润计算器：按季节筛选，支持再生作物、工匠技能，实时计算每天金币收益。找出春夏秋最优种植方案。'
      : 'Free Stardew Valley crop profit calculator. Filter by season, toggle artisan skill, and see gold per day for every crop including regrow crops.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/tools/stardew`,
        [other]: `${BASE_URL}/${other}/tools/stardew`,
      },
    },
  }
}

export default async function StardewToolPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {isZh ? '工具集' : 'Tools'}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">{isZh ? '星露谷物语' : 'Stardew Valley'}</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {isZh ? '星露谷物语作物利润计算器' : 'Stardew Valley Crop Profit Calculator'}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {isZh
          ? '按季节和剩余天数，计算每种作物的日均金币收益。支持再生作物、多产作物和工匠技能（酒桶/坛子加工）。'
          : 'Calculate gold per day for every crop by season and days left. Handles regrow crops, multi-yield crops, and artisan skill (keg/jar processing).'}
      </p>

      <StardewCalculator locale={locale} />

      {/* Related links */}
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {isZh ? '相关攻略' : 'Related Guides'}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/guides/stardew-valley`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {isZh ? '星露谷攻略中心 →' : 'Stardew Valley Guides →'}
          </Link>
          <Link
            href={`/${locale}/tools/hay-day`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {isZh ? 'Hay Day 作物计算器 →' : 'Hay Day Crop Calculator →'}
          </Link>
        </div>
      </div>
    </div>
  )
}
