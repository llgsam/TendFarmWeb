import { StardewCalendar } from '@/components/tools/StardewCalendar'
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
      '星露谷物语日历 — 生日与节日速查',
      'Stardew Valley Calendar — Birthdays & Festivals',
      '星露谷物語日曆 — 生日與節日速查',
      'スターデューバレー カレンダー — 誕生日とフェスティバル',
      '스타듀밸리 달력 — 생일과 축제',
      'Stardew Valley Kalender — Geburtstage & Festivals',
    ),
    description: getLoc(
      locale,
      '免费星露谷物语日历：四季全部村民生日和节日一览，附村民生日速查工具。规划送礼与节日活动的最佳时机。',
      'Free Stardew Valley calendar. All villager birthdays and festivals across every season, plus a birthday lookup tool. Plan the perfect day to give gifts.',
      '免費星露谷物語日曆：四季全部村民生日和節日一覽，附村民生日速查工具。規劃送禮與節日活動的最佳時機。',
      '無料のスターデューバレー カレンダー。全季節の村人の誕生日とフェスティバル一覧、誕生日検索ツール付き。贈り物の最適な日を計画。',
      '무료 스타듀밸리 달력. 모든 계절의 주민 생일과 축제 일람, 생일 검색 도구 포함. 선물하기 좋은 날을 계획하세요.',
      'Kostenloser Stardew-Valley-Kalender. Alle Geburtstage und Festivals pro Jahreszeit, plus Geburtstags-Suche. Plane den perfekten Tag für Geschenke.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-calendar`,
      languages: buildLanguageAlternates('/tools/stardew-calendar'),
    },
  }
}

export default async function StardewCalendarPage({
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
        <span className="text-[#e8dcc8]">
          {getLoc(locale, '星露谷日历', 'Stardew Calendar', '星露谷日曆', 'カレンダー', '달력', 'Kalender')}
        </span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语日历', 'Stardew Valley Calendar', '星露谷物語日曆', 'スターデューバレー カレンダー', '스타듀밸리 달력', 'Stardew Valley Kalender')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(
          locale,
          '一整年四季的村民生日和节日速查。生日当天送对礼物，好感度收益翻 8 倍——用下面的速查工具找到每个人的生日。',
          'Every villager birthday and festival across all four seasons. Gifts count 8× on a villager’s birthday — use the lookup below to find anyone’s special day.',
          '一整年四季的村民生日和節日速查。生日當天送對禮物，好感度收益翻 8 倍——用下面的速查工具找到每個人的生日。',
          '四季すべての村人の誕生日とフェスティバル一覧。誕生日に贈り物をすると友好度が8倍——下の検索ツールで各村人の誕生日を確認。',
          '사계절 모든 주민의 생일과 축제 일람. 생일에 선물하면 호감도가 8배 — 아래 검색 도구로 각 주민의 생일을 확인하세요.',
          'Alle Geburtstage und Festivals über alle vier Jahreszeiten. Geschenke zählen am Geburtstag 8× — finde mit der Suche unten den besonderen Tag jedes Bewohners.',
        )}
      </p>

      <StardewCalendar locale={locale} />

      {/* Related links */}
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/tools/stardew`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '星露谷作物计算器 →', 'Stardew Crop Calculator →', '星露谷作物計算器 →', 'スターデュー作物計算機 →', '스타듀밸리 작물 계산기 →', 'Stardew Ernterechner →')}
          </Link>
          <Link
            href={`/${locale}/tools`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '全部工具 →', 'All Tools →', '全部工具 →', 'すべてのツール →', '모든 도구 →', 'Alle Tools →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
