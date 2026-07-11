import { StardewBundleFinder } from '@/components/tools/StardewBundleFinder'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'
import { ToolReference } from '@/components/tools/seo/ToolReference'
import { BundleReferenceTable } from '@/components/tools/seo/BundleReferenceTable'
import { bundleSummary, getBundleFaqs } from '@/lib/tools/seo/bundleSeoContent'

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
      '星露谷物语社区中心收集包速查 — 物品/数量/奖励',
      'Stardew Valley Bundles — Community Center Checklist & Item Finder',
      '星露谷物語社區中心收集包速查 — 物品/數量/獎勵',
      'スターデューバレー コミュニティセンター バンドル一覧',
      '스타듀밸리 커뮤니티 센터 꾸러미 목록',
      'Stardew Valley Bündel — Gemeindezentrum-Checkliste',
    ),
    description: getLoc(
      locale,
      '免费星露谷物语社区中心收集包速查：按房间浏览每个收集包所需物品、数量、品质和奖励，还能反查「某物品用在哪个收集包」。凑齐社区中心不再翻百科。',
      'Free Stardew Valley bundle guide. Browse every Community Center bundle by room — required items, quantities, quality, and rewards — and reverse-lookup which bundle needs an item. Complete the Community Center fast.',
      '免費星露谷物語社區中心收集包速查：按房間瀏覽每個收集包所需物品、數量、品質和獎勵，還能反查「某物品用在哪個收集包」。',
      '無料のスターデューバレー バンドル一覧。ルームごとに必要アイテム・数量・品質・報酬を確認でき、アイテムからバンドルを逆引きも可能。',
      '무료 스타듀밸리 꾸러미 가이드. 방별로 필요한 아이템·수량·품질·보상을 확인하고, 아이템으로 꾸러미를 역검색할 수 있어요.',
      'Kostenloser Stardew-Valley-Bündel-Guide. Alle Gemeindezentrum-Bündel nach Raum: benötigte Gegenstände, Mengen, Qualität und Belohnungen.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-bundles`,
      languages: buildLanguageAlternates('/tools/stardew-bundles'),
    },
  }
}

export default async function StardewBundlesPage({
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
          {getLoc(locale, '收集包速查', 'Bundles', '收集包速查', 'バンドル', '꾸러미', 'Bündel')}
        </span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语社区中心收集包', 'Stardew Valley Community Center Bundles', '星露谷物語社區中心收集包', 'スターデューバレー コミュニティセンター バンドル', '스타듀밸리 커뮤니티 센터 꾸러미', 'Stardew Valley Gemeindezentrum-Bündel')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(
          locale,
          '按房间浏览每个收集包需要哪些物品、要几个、要什么品质，以及完成后的奖励。想知道手里的物品能凑哪个收集包？直接在上方搜索反查。',
          'Browse each bundle by room: which items you need, how many, what quality, and the reward for completing it. Got an item and wonder which bundle it fits? Search above to reverse-lookup.',
          '按房間瀏覽每個收集包需要哪些物品、要幾個、要什麼品質，以及完成後的獎勵。想知道手裡的物品能湊哪個收集包？直接在上方搜索反查。',
          'ルームごとに、各バンドルに必要なアイテム・数量・品質・完成報酬を確認。手持ちのアイテムがどのバンドルに使えるかは上の検索で逆引きできます。',
          '방별로 각 꾸러미에 필요한 아이템, 개수, 품질, 완성 보상을 확인하세요. 가진 아이템이 어느 꾸러미에 쓰이는지는 위에서 검색해 역으로 찾을 수 있어요.',
          'Durchsuche jedes Bündel nach Raum: benötigte Gegenstände, Menge, Qualität und die Belohnung. Suche oben, um zu einem Gegenstand das passende Bündel zu finden.',
        )}
      </p>

      <StardewBundleFinder locale={locale} />

      <ToolReference
        locale={locale}
        tableTitle={getLoc(locale, '完整收集包清单', 'Complete Bundle List', '完整收集包清單', '全バンドル一覧', '전체 꾸러미 목록', 'Vollständige Bündelliste')}
        summary={bundleSummary(locale)}
        faqs={getBundleFaqs(locale)}
      >
        <BundleReferenceTable locale={locale} />
      </ToolReference>

      {/* Related links */}
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/tools/stardew-fish`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '鱼类查询 →', 'Fish Finder →', '魚類查詢 →', '魚検索 →', '물고기 찾기 →', 'Fisch-Finder →')}
          </Link>
          <Link
            href={`/${locale}/tools/stardew`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '作物利润计算器 →', 'Crop Calculator →', '作物利潤計算器 →', '作物計算機 →', '작물 계산기 →', 'Ernte-Rechner →')}
          </Link>
          <Link
            href={`/${locale}/tools/stardew-gifts`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '送礼喜好查询 →', 'Gift Guide →', '送禮喜好查詢 →', '贈り物ガイド →', '선물 가이드 →', 'Geschenk-Guide →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
