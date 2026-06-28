import { HayDayCalculator } from '@/components/tools/HayDayCalculator'
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
      'Hay Day 作物利润计算器 — 最优种植策略',
      'Hay Day Crop Profit Calculator — Best Crops by Play Style',
      'Hay Day 作物利潤計算器 — 最優種植策略',
      'Hay Day 作物利益計算機 — プレイスタイル別の最適作物',
      'Hay Day 작물 수익 계산기 — 플레이 스타일별 최적 작물',
      'Hay Day Ernte-Gewinnrechner — Beste Pflanzen nach Spielstil',
    ),
    description: getLoc(
      locale,
      '免费的 Hay Day 作物效益计算器：按游戏风格（活跃/休闲/挂机）筛选最优作物，实时显示每分钟和每小时金币利润。',
      'Free Hay Day crop profit calculator. Filter by play style (active/casual/AFK) and see gold per minute and gold per hour for every crop.',
      '免費的 Hay Day 作物效益計算器：按遊戲風格（活躍/休閒/掛機）篩選最優作物，即時顯示每分鐘和每小時金幣利潤。',
      '無料のHay Day作物利益計算機。プレイスタイル（アクティブ/カジュアル/放置）で作物を絞り込み、金/分・金/時間をリアルタイム表示。',
      '무료 Hay Day 작물 수익 계산기. 플레이 스타일(액티브/캐주얼/방치)로 작물을 필터링하고 분당·시간당 골드를 확인하세요.',
      'Kostenloser Hay-Day-Gewinnrechner. Filtere nach Spielstil (aktiv/casual/AFK) und sieh Gold pro Minute und Stunde für jede Pflanze.',
    ),
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {getLoc(locale, '工具集', 'Tools', '工具集', 'ツール', '도구', 'Tools')}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">Hay Day</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, 'Hay Day 作物利润计算器', 'Hay Day Crop Profit Calculator', 'Hay Day 作物利潤計算器', 'Hay Day 作物利益計算機', 'Hay Day 작물 수익 계산기', 'Hay Day Ernte-Gewinnrechner')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(
          locale,
          '根据你的游戏风格，找出当前等级下利润最高的田地作物。支持按利润/分钟、利润/小时排序。',
          'Find the most profitable field crops for your play style. Sort by gold per minute or per hour.',
          '根據你的遊戲風格，找出當前等級下利潤最高的田地作物。支援按利潤/分鐘、利潤/小時排序。',
          'プレイスタイルに合わせて、最も利益の高い畑の作物を見つけよう。金/分・金/時間で並べ替え可能。',
          '플레이 스타일에 맞춰 가장 수익성 높은 밭 작물을 찾으세요. 분당·시간당 골드로 정렬할 수 있습니다.',
          'Finde die profitabelsten Feldpflanzen für deinen Spielstil. Sortiere nach Gold pro Minute oder Stunde.',
        )}
      </p>

      <HayDayCalculator locale={locale} />

      {/* Related links */}
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关攻略', 'Related Guides', '相關攻略', '関連ガイド', '관련 공략', 'Verwandte Guides')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/guides/hay-day`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, 'Hay Day 攻略中心 →', 'Hay Day Guides →', 'Hay Day 攻略中心 →', 'Hay Day 攻略 →', 'Hay Day 공략 →', 'Hay Day Guides →')}
          </Link>
          <Link
            href={`/${locale}/tools/stardew`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '星露谷作物计算器 →', 'Stardew Valley Calculator →', '星露谷作物計算器 →', 'スターデュー作物計算機 →', '스타듀밸리 작물 계산기 →', 'Stardew Valley Rechner →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
