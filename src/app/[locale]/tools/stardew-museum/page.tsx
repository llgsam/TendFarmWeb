import { StardewMuseumFinder } from '@/components/tools/StardewMuseumFinder'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'
import { ToolReference } from '@/components/tools/seo/ToolReference'
import { MuseumReferenceTable } from '@/components/tools/seo/MuseumReferenceTable'
import { museumSummary, getMuseumFaqs } from '@/lib/tools/seo/museumSeoContent'

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
      '星露谷物语博物馆收藏速查 — 矿物/化石来源 + 捐赠奖励',
      'Stardew Valley Museum — Minerals, Artifacts & Donation Rewards',
      '星露谷物語博物館收藏速查 — 礦物/化石來源 + 捐贈獎勵',
      'スターデューバレー 博物館コレクション — 鉱物・発掘品・報酬',
      '스타듀밸리 박물관 컬렉션 — 광물·유물·기증 보상',
      'Stardew Valley Museum — Mineralien, Artefakte & Belohnungen',
    ),
    description: getLoc(
      locale,
      '免费星露谷物语博物馆收藏速查：全部 95 项矿物、宝石、晶洞矿物和化石的获取来源，按类别筛选、按名称搜索，附全部捐赠里程碑奖励。凑齐博物馆拿星之果实。',
      'Free Stardew Valley museum guide. All 95 minerals, gems, geode minerals, and artifacts with where to find each — filter by category, search by name — plus every donation milestone reward. Complete the collection for the Stardrop.',
      '免費星露谷物語博物館收藏速查：全部 95 項礦物、寶石、晶球礦物和化石的獲取來源，按類別篩選、按名稱搜索，附全部捐贈里程碑獎勵。',
      '無料のスターデューバレー博物館ガイド。全95件の鉱物・宝石・ジオード鉱物・発掘品の入手先をカテゴリ別・名前で検索でき、寄贈報酬も網羅。',
      '무료 스타듀밸리 박물관 가이드. 광물·보석·정동석 광물·유물 95종의 입수처를 카테고리·이름으로 검색하고, 모든 기증 보상까지 확인하세요.',
      'Kostenloser Stardew-Valley-Museumsguide. Alle 95 Mineralien, Edelsteine, Geoden-Mineralien und Artefakte mit Fundort, filter- und durchsuchbar, plus alle Spendenbelohnungen.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-museum`,
      languages: buildLanguageAlternates('/tools/stardew-museum'),
    },
  }
}

export default async function StardewMuseumPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {getLoc(locale, '工具集', 'Tools', '工具集', 'ツール', '도구', 'Tools')}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">
          {getLoc(locale, '博物馆收藏', 'Museum', '博物館收藏', '博物館', '박물관', 'Museum')}
        </span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语博物馆收藏', 'Stardew Valley Museum Collection', '星露谷物語博物館收藏', 'スターデューバレー 博物館コレクション', '스타듀밸리 박물관 컬렉션', 'Stardew Valley Museum-Sammlung')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(
          locale,
          '全部 95 项可捐赠的矿物、宝石、晶洞矿物和化石，含每一项的获取来源。按类别筛选、按名称搜索，下方还有全部捐赠里程碑奖励。',
          "All 95 donatable minerals, gems, geode minerals, and artifacts, with where to find each. Filter by category, search by name, and see every donation milestone reward below.",
          '全部 95 項可捐贈的礦物、寶石、晶球礦物和化石，含每一項的獲取來源。按類別篩選、按名稱搜索，下方還有全部捐贈里程碑獎勵。',
          '寄贈できる全95件の鉱物・宝石・ジオード鉱物・発掘品と、それぞれの入手先。カテゴリ別・名前で検索でき、下部に寄贈報酬も。',
          '기증 가능한 광물·보석·정동석 광물·유물 95종과 각 입수처. 카테고리·이름으로 검색하고, 아래에서 모든 기증 보상을 확인하세요.',
          'Alle 95 spendbaren Mineralien, Edelsteine, Geoden-Mineralien und Artefakte mit Fundort. Nach Kategorie filtern, nach Namen suchen, plus alle Spendenbelohnungen unten.',
        )}
      </p>

      <StardewMuseumFinder locale={locale} />

      <ToolReference
        locale={locale}
        tableTitle={getLoc(locale, '完整捐赠物品表', 'Complete Donation List', '完整捐贈物品表', '全寄贈品リスト', '전체 기증 목록', 'Vollständige Spendenliste')}
        summary={museumSummary(locale)}
        faqs={getMuseumFaqs(locale)}
      >
        <MuseumReferenceTable locale={locale} />
      </ToolReference>

      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`/${locale}/tools/stardew-bundles`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '收集包速查 →', 'Bundles →', '收集包速查 →', 'バンドル →', '꾸러미 →', 'Bündel →')}
          </Link>
          <Link href={`/${locale}/tools/stardew-fish`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '鱼类查询 →', 'Fish Finder →', '魚類查詢 →', '魚検索 →', '물고기 찾기 →', 'Fisch-Finder →')}
          </Link>
          <Link href={`/${locale}/tools/stardew-gifts`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '送礼喜好查询 →', 'Gift Guide →', '送禮喜好查詢 →', '贈り物ガイド →', '선물 가이드 →', 'Geschenk-Guide →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
