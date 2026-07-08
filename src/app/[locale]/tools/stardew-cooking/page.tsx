import { StardewCookingFinder } from '@/components/tools/StardewCookingFinder'
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
      '星露谷物语料理食谱查询 — 按食材反查 + 增益筛选',
      'Stardew Valley Recipes — Cooking Finder by Ingredient & Buff',
      '星露谷物語料理食譜查詢 — 按食材反查 + 增益篩選',
      'スターデューバレー 料理レシピ検索 — 食材・バフで絞り込み',
      '스타듀밸리 요리 레시피 검색 — 재료·버프 필터',
      'Stardew Valley Rezepte — Koch-Finder nach Zutat & Buff',
    ),
    description: getLoc(locale,
      '免费星露谷物语料理食谱查询：全部料理按食材反查（"我有这个食材能做什么"）、按增益（钓鱼/采矿/战斗…）和来源筛选，每道菜列食材数量、解锁方式、回血回体力、buff 时长和售价。',
      'Free Stardew Valley recipe finder. Reverse-lookup every dish by ingredient ("what can I cook with this?"), filter by buff (fishing/mining/combat…) and source. Each recipe shows ingredient quantities, how to unlock, energy/health, buff duration, and sell price.',
      '免費星露谷物語料理食譜查詢：全部料理按食材反查（「我有這個食材能做什麼」）、按增益（釣魚/採礦/戰鬥…）和來源篩選，每道菜列食材數量、解鎖方式、回血回體力、buff 時長和售價。',
      '無料のスターデューバレー料理レシピ検索。食材から逆引き（「この食材で何が作れる？」）、バフ（釣り/採掘/戦闘…）や入手方法で絞り込み。各料理の材料数・解放条件・回復量・バフ時間・売値を表示。',
      '무료 스타듀밸리 요리 레시피 검색. 재료로 역검색("이 재료로 뭘 만들지?"), 버프(낚시/채광/전투…)와 출처로 필터. 각 요리의 재료 수량·해금 방법·회복량·버프 시간·판매가 표시.',
      'Kostenloser Stardew-Valley-Rezeptfinder. Rückwärtssuche nach Zutat, Filter nach Buff (Angeln/Bergbau/Kampf…) und Quelle. Jedes Rezept zeigt Zutatenmengen, Freischaltung, Energie/Gesundheit, Buff-Dauer und Verkaufspreis.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-cooking`,
      languages: buildLanguageAlternates('/tools/stardew-cooking'),
    },
  }
}

export default async function StardewCookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {getLoc(locale, '工具集', 'Tools', '工具集', 'ツール', '도구', 'Tools')}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">
          {getLoc(locale, '料理食谱', 'Recipes', '料理食譜', '料理レシピ', '요리 레시피', 'Rezepte')}
        </span>
      </nav>
      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语料理食谱查询', 'Stardew Valley Cooking Recipes', '星露谷物語料理食譜查詢', 'スターデューバレー 料理レシピ検索', '스타듀밸리 요리 레시피', 'Stardew Valley Kochrezepte')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(locale,
          '按食材反查（"我有这个食材能做什么"）、按增益和来源筛选。每道菜列食材数量、解锁方式、回血回体力、buff 时长和售价。',
          'Reverse-lookup by ingredient, filter by buff and source. Each recipe shows ingredient quantities, how to unlock, energy/health restored, buff duration, and sell price.',
          '按食材反查（「我有這個食材能做什麼」）、按增益和來源篩選。每道菜列食材數量、解鎖方式、回血回體力、buff 時長和售價。',
          '食材から逆引き、バフや入手方法で絞り込み。各料理の材料数・解放条件・回復量・バフ時間・売値を表示。',
          '재료로 역검색, 버프와 출처로 필터. 각 요리의 재료 수량·해금 방법·회복량·버프 시간·판매가 표시.',
          'Rückwärtssuche nach Zutat, Filter nach Buff und Quelle. Jedes Rezept zeigt Mengen, Freischaltung, Energie/Gesundheit, Buff-Dauer und Verkaufspreis.',
        )}
      </p>
      <StardewCookingFinder locale={locale} />
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`/${locale}/tools/stardew-gifts`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '送礼喜好查询 →', 'Gift Guide →', '送禮喜好查詢 →', '贈り物ガイド →', '선물 가이드 →', 'Geschenk-Guide →')}
          </Link>
          <Link href={`/${locale}/tools/stardew-fish`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '鱼类查询 →', 'Fish Finder →', '魚類查詢 →', '魚検索 →', '물고기 찾기 →', 'Fisch-Finder →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
