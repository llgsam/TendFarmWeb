import { StardewGiftFinder } from '@/components/tools/StardewGiftFinder'
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
      '星露谷物语送礼喜好查询 — 村民最爱礼物',
      'Stardew Valley Gift Guide — Every Villager’s Loved Gifts',
      '星露谷物語送禮喜好查詢 — 村民最愛禮物',
      'スターデューバレー 贈り物ガイド — 村人の大好きな贈り物',
      '스타듀밸리 선물 가이드 — 주민별 좋아하는 선물',
      'Stardew Valley Geschenk-Guide — Lieblingsgeschenke jedes Bewohners',
    ),
    description: getLoc(
      locale,
      '免费星露谷物语送礼查询：选择村民，立刻查看 TA 最爱的礼物（+80 好感度）和通用最爱礼物。快速提升与每位村民的关系。',
      'Free Stardew Valley gift guide. Pick any villager and instantly see their loved gifts (+80 friendship) plus universal loves. Level up every relationship fast.',
      '免費星露谷物語送禮查詢：選擇村民，立刻查看 TA 最愛的禮物（+80 好感度）和通用最愛禮物。快速提升與每位村民的關係。',
      '無料のスターデューバレー贈り物ガイド。村人を選ぶと大好きな贈り物（友好度+80）と一般的な大好き物を即表示。関係を素早く深めよう。',
      '무료 스타듀밸리 선물 가이드. 주민을 선택하면 좋아하는 선물(+80 호감도)과 보편적 선물을 즉시 표시. 모든 관계를 빠르게 올리세요.',
      'Kostenloser Stardew-Valley-Geschenk-Guide. Wähle einen Bewohner und sieh sofort seine Lieblingsgeschenke (+80 Freundschaft) plus allgemeine Favoriten.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-gifts`,
      languages: buildLanguageAlternates('/tools/stardew-gifts'),
    },
  }
}

export default async function StardewGiftsPage({
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
          {getLoc(locale, '送礼查询', 'Gift Guide', '送禮查詢', '贈り物ガイド', '선물 가이드', 'Geschenk-Guide')}
        </span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语送礼喜好查询', 'Stardew Valley Gift Guide', '星露谷物語送禮喜好查詢', 'スターデューバレー 贈り物ガイド', '스타듀밸리 선물 가이드', 'Stardew Valley Geschenk-Guide')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(
          locale,
          '选择任意村民，立刻查看 TA 最爱的礼物。每份最爱礼物 +80 好感度，生日当天效果翻 8 倍——送对礼物是搞好关系最快的方式。',
          'Pick any villager to instantly see their loved gifts. Each loved gift gives +80 friendship (×8 on their birthday) — the fastest way to build a relationship.',
          '選擇任意村民，立刻查看 TA 最愛的禮物。每份最愛禮物 +80 好感度，生日當天效果翻 8 倍——送對禮物是搞好關係最快的方式。',
          '村人を選ぶと大好きな贈り物を即表示。大好きな贈り物は友好度+80（誕生日は×8）——関係を深める最速の方法。',
          '주민을 선택하면 좋아하는 선물을 즉시 표시. 좋아하는 선물은 호감도 +80(생일엔 ×8) — 관계를 쌓는 가장 빠른 방법.',
          'Wähle einen Bewohner und sieh sofort seine Lieblingsgeschenke. Jedes gibt +80 Freundschaft (×8 am Geburtstag) — der schnellste Weg zu einer Beziehung.',
        )}
      </p>

      <StardewGiftFinder locale={locale} />

      {/* Related links */}
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/tools/stardew-calendar`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '星露谷日历（生日）→', 'Stardew Calendar (Birthdays) →', '星露谷日曆（生日）→', 'カレンダー（誕生日）→', '달력(생일) →', 'Kalender (Geburtstage) →')}
          </Link>
          <Link
            href={`/${locale}/tools/stardew`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '星露谷作物计算器 →', 'Stardew Crop Calculator →', '星露谷作物計算器 →', 'スターデュー作物計算機 →', '스타듀밸리 작물 계산기 →', 'Stardew Ernterechner →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
