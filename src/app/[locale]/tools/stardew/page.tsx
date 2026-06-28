import { StardewCalculator } from '@/components/tools/StardewCalculator'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'

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
  return {
    title: getLoc(
      locale,
      '星露谷物语作物利润计算器 — 最优季节种植策略',
      'Stardew Valley Crop Profit Calculator — Best Crops Per Season',
      '星露谷物語作物利潤計算器 — 最優季節種植策略',
      'スターデューバレー作物利益計算機 — 季節別の最適作物',
      '스타듀밸리 작물 수익 계산기 — 계절별 최적 작물',
      'Stardew Valley Ernte-Gewinnrechner — Beste Pflanzen pro Jahreszeit',
    ),
    description: getLoc(
      locale,
      '免费星露谷物语作物利润计算器：按季节筛选，支持再生作物、工匠技能，实时计算每天金币收益。找出春夏秋最优种植方案。',
      'Free Stardew Valley crop profit calculator. Filter by season, toggle artisan skill, and see gold per day for every crop including regrow crops.',
      '免費星露谷物語作物利潤計算器：按季節篩選，支援再生作物、工匠技能，即時計算每天金幣收益。找出春夏秋最優種植方案。',
      '無料のスターデューバレー作物利益計算機。季節で絞り込み、職人スキルを切り替え、再生作物を含むすべての作物の金/日を表示。',
      '무료 스타듀밸리 작물 수익 계산기. 계절로 필터링하고 장인 스킬을 토글하며 재생 작물 포함 모든 작물의 일일 골드를 확인하세요.',
      'Kostenloser Stardew-Valley-Gewinnrechner. Filtere nach Jahreszeit, schalte den Handwerks-Skill um und sieh Gold pro Tag für jede Pflanze inkl. nachwachsender.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew`,
      languages: buildLanguageAlternates('/tools/stardew'),
    },
  }
}

export default async function StardewToolPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {getLoc(locale, '工具集', 'Tools', '工具集', 'ツール', '도구', 'Tools')}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">{getLoc(locale, '星露谷物语', 'Stardew Valley', '星露谷物語', 'スターデューバレー', '스타듀밸리', 'Stardew Valley')}</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语作物利润计算器', 'Stardew Valley Crop Profit Calculator', '星露谷物語作物利潤計算器', 'スターデューバレー作物利益計算機', '스타듀밸리 작물 수익 계산기', 'Stardew Valley Ernte-Gewinnrechner')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(
          locale,
          '按季节和剩余天数，计算每种作物的日均金币收益。支持再生作物、多产作物和工匠技能（酒桶/坛子加工）。',
          'Calculate gold per day for every crop by season and days left. Handles regrow crops, multi-yield crops, and artisan skill (keg/jar processing).',
          '按季節和剩餘天數，計算每種作物的日均金幣收益。支援再生作物、多產作物和工匠技能（酒桶/罈子加工）。',
          '季節と残り日数から、各作物の1日あたりの金収益を計算。再生作物・多収作物・職人スキル（樽/瓶加工）に対応。',
          '계절과 남은 날수로 각 작물의 일일 골드 수익을 계산합니다. 재생 작물, 다수확 작물, 장인 스킬(통/병 가공)을 지원합니다.',
          'Berechne Gold pro Tag für jede Pflanze nach Jahreszeit und Resttagen. Unterstützt nachwachsende Pflanzen, mehrfache Ernten und Handwerks-Skill (Fass-/Glas-Verarbeitung).',
        )}
      </p>

      <StardewCalculator locale={locale} />

      {/* Related links */}
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关攻略', 'Related Guides', '相關攻略', '関連ガイド', '관련 공략', 'Verwandte Guides')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/guides/stardew-valley`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '星露谷攻略中心 →', 'Stardew Valley Guides →', '星露谷攻略中心 →', 'スターデュー攻略 →', '스타듀밸리 공략 →', 'Stardew Valley Guides →')}
          </Link>
          <Link
            href={`/${locale}/tools/hay-day`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, 'Hay Day 作物计算器 →', 'Hay Day Crop Calculator →', 'Hay Day 作物計算器 →', 'Hay Day 作物計算機 →', 'Hay Day 작물 계산기 →', 'Hay Day Ernterechner →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
