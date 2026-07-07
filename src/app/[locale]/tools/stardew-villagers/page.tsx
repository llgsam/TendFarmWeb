import { StardewVillagerFinder } from '@/components/tools/StardewVillagerFinder'
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: getLoc(locale,
      '星露谷物语结婚对象对比 — 12 位可攻略对象一览',
      'Stardew Valley Marriage Candidates — Compare All 12 Bachelors & Bachelorettes',
      '星露谷物語結婚對象對比 — 12 位可攻略對象一覽',
      'スターデューバレー 結婚候補比較 — 独身男女12人',
      '스타듀밸리 결혼 후보 비교 — 미혼 남녀 12명',
      'Stardew Valley Heiratskandidaten — Alle 12 im Vergleich',
    ),
    description: getLoc(locale,
      '免费星露谷物语结婚对象对比：12 位可结婚村民并排对比生日、最爱礼物、性格、婚后表现与爱心事件，一屏帮你决定娶谁/嫁谁。附全部村民档案与求婚攻略。',
      'Free Stardew Valley marriage guide. Compare all 12 marriage candidates side by side — birthdays, loved gifts, personality, post-marriage perks, and heart events — to decide who to marry. Plus every villager profile and how to propose.',
      '免費星露谷物語結婚對象對比：12 位可結婚村民並排對比生日、最愛禮物、性格、婚後表現與愛心事件，一屏幫你決定娶誰/嫁誰。附全部村民檔案與求婚攻略。',
      '無料のスターデューバレー結婚ガイド。結婚候補12人を誕生日・大好きな贈り物・性格・結婚後・ハートイベントで並べて比較し、誰と結婚するか決められます。全村人プロフィール付き。',
      '무료 스타듀밸리 결혼 가이드. 결혼 후보 12명을 생일·좋아하는 선물·성격·결혼 후·하트 이벤트로 나란히 비교해 누구와 결혼할지 결정하세요. 전체 주민 프로필 포함.',
      'Kostenloser Stardew-Valley-Heiratsguide. Vergleiche alle 12 Heiratskandidaten nebeneinander — Geburtstage, Lieblingsgeschenke, Charakter, Ehe-Vorteile und Herz-Events — und entscheide, wen du heiratest.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-villagers`,
      languages: buildLanguageAlternates('/tools/stardew-villagers'),
    },
  }
}

export default async function StardewVillagersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {getLoc(locale, '工具集', 'Tools', '工具集', 'ツール', '도구', 'Tools')}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">
          {getLoc(locale, '结婚对象对比', 'Marriage Candidates', '結婚對象對比', '結婚候補', '결혼 후보', 'Heiratskandidaten')}
        </span>
      </nav>
      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语结婚对象对比', 'Stardew Valley Marriage Candidates', '星露谷物語結婚對象對比', 'スターデューバレー 結婚候補比較', '스타듀밸리 결혼 후보 비교', 'Stardew Valley Heiratskandidaten')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(locale,
          '12 位可结婚村民并排对比：生日、最爱礼物、性格、婚后表现与爱心事件亮点，帮你决定娶谁/嫁谁。关掉筛选可查看全部村民档案。',
          'Compare all 12 marriage candidates side by side — birthdays, loved gifts, personality, post-marriage perks, and heart-event highlights — to decide who to marry. Turn off the filter to browse every villager.',
          '12 位可結婚村民並排對比：生日、最愛禮物、性格、婚後表現與愛心事件亮點，幫你決定娶誰/嫁誰。關掉篩選可查看全部村民檔案。',
          '結婚候補12人を誕生日・大好きな贈り物・性格・結婚後・ハートイベントで並べて比較。フィルターを外すと全村人を閲覧できます。',
          '결혼 후보 12명을 생일·좋아하는 선물·성격·결혼 후·하트 이벤트로 나란히 비교하세요. 필터를 끄면 전체 주민을 볼 수 있습니다.',
          'Vergleiche alle 12 Heiratskandidaten nebeneinander. Schalte den Filter aus, um alle Bewohner zu durchsuchen.',
        )}
      </p>
      <StardewVillagerFinder locale={locale} />
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`/${locale}/tools/stardew-gifts`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '送礼喜好查询 →', 'Gift Guide →', '送禮喜好查詢 →', '贈り物ガイド →', '선물 가이드 →', 'Geschenk-Guide →')}
          </Link>
          <Link href={`/${locale}/tools/stardew-calendar`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '生日日历 →', 'Calendar →', '生日日曆 →', 'カレンダー →', '달력 →', 'Kalender →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
