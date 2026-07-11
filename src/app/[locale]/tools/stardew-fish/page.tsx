import { StardewFishFinder } from '@/components/tools/StardewFishFinder'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'
import { ToolReference } from '@/components/tools/seo/ToolReference'
import { FishReferenceTable } from '@/components/tools/seo/FishReferenceTable'
import { fishSummary, getFishFaqs } from '@/lib/tools/seo/fishSeoContent'

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
      '星露谷物语鱼类查询 — 按季节地点天气找鱼',
      'Stardew Valley Fish Finder — By Season, Location & Weather',
      '星露谷物語魚類查詢 — 按季節地點天氣找魚',
      'スターデューバレー 魚検索 — 季節・場所・天気で探す',
      '스타듀밸리 물고기 찾기 — 계절·장소·날씨별',
      'Stardew Valley Fisch-Finder — nach Jahreszeit, Ort & Wetter',
    ),
    description: getLoc(
      locale,
      '免费星露谷物语鱼类查询器：按季节、地点、天气筛选，立刻看到能钓到哪些鱼、时间段和售价。轻松完成图鉴和任务。',
      'Free Stardew Valley fish finder. Filter by season, location, and weather to instantly see what you can catch, when, and for how much. Complete your collection fast.',
      '免費星露谷物語魚類查詢器：按季節、地點、天氣篩選，立刻看到能釣到哪些魚、時間段和售價。輕鬆完成圖鑑和任務。',
      '無料のスターデューバレー魚検索。季節・場所・天気で絞り込み、釣れる魚・時間帯・売値を即表示。コレクションを効率的に完成。',
      '무료 스타듀밸리 물고기 찾기. 계절·장소·날씨로 필터링해 잡을 수 있는 물고기, 시간대, 판매가를 즉시 확인. 도감을 빠르게 완성하세요.',
      'Kostenloser Stardew-Valley-Fisch-Finder. Filtere nach Jahreszeit, Ort und Wetter und sieh sofort, was du fangen kannst, wann und für wie viel.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-fish`,
      languages: buildLanguageAlternates('/tools/stardew-fish'),
    },
  }
}

export default async function StardewFishPage({
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
          {getLoc(locale, '鱼类查询', 'Fish Finder', '魚類查詢', '魚検索', '물고기 찾기', 'Fisch-Finder')}
        </span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语鱼类查询', 'Stardew Valley Fish Finder', '星露谷物語魚類查詢', 'スターデューバレー 魚検索', '스타듀밸리 물고기 찾기', 'Stardew Valley Fisch-Finder')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(
          locale,
          '按季节、地点和天气筛选，立刻查看当前能钓到哪些鱼——含可钓时间段和售价。凑图鉴、做任务、赚金币都用得上。',
          'Filter by season, location, and weather to instantly see which fish you can catch right now — with the time window and sell price. Perfect for the collection, quests, and gold.',
          '按季節、地點和天氣篩選，立刻查看當前能釣到哪些魚——含可釣時間段和售價。湊圖鑑、做任務、賺金幣都用得上。',
          '季節・場所・天気で絞り込み、今釣れる魚を即確認——時間帯と売値付き。コレクション・クエスト・金策に。',
          '계절·장소·날씨로 필터링해 지금 잡을 수 있는 물고기를 즉시 확인 — 시간대와 판매가 포함. 도감·퀘스트·골드 벌이에 유용.',
          'Filtere nach Jahreszeit, Ort und Wetter und sieh sofort, welche Fische du gerade fangen kannst — mit Zeitfenster und Verkaufspreis.',
        )}
      </p>

      <StardewFishFinder locale={locale} />

      <ToolReference
        locale={locale}
        tableTitle={getLoc(locale, '完整鱼类列表', 'Complete Fish List', '完整魚類列表', '全魚リスト', '전체 물고기 목록', 'Vollständige Fischliste')}
        summary={fishSummary(locale)}
        faqs={getFishFaqs(locale)}
      >
        <FishReferenceTable locale={locale} />
      </ToolReference>

      {/* Related links */}
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/tools/stardew-gifts`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '送礼喜好查询 →', 'Gift Guide →', '送禮喜好查詢 →', '贈り物ガイド →', '선물 가이드 →', 'Geschenk-Guide →')}
          </Link>
          <Link
            href={`/${locale}/tools/stardew-calendar`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '星露谷日历 →', 'Stardew Calendar →', '星露谷日曆 →', 'カレンダー →', '달력 →', 'Kalender →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
