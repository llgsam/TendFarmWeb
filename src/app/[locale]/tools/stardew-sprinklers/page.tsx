import { StardewSprinklerPlanner } from '@/components/tools/StardewSprinklerPlanner'
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
      '星露谷物语洒水器布局规划器 — 覆盖范围可视化',
      'Stardew Valley Sprinkler Planner — Coverage Layout Tool',
      '星露谷物語灑水器佈局規劃器 — 覆蓋範圍可視化',
      'スターデューバレー スプリンクラー配置プランナー',
      '스타듀밸리 스프링클러 배치 플래너',
      'Stardew Valley Sprinkler-Planer — Reichweiten-Layout',
    ),
    description: getLoc(locale,
      '免费星露谷物语洒水器布局规划器：在网格上放置普通/优质/铱金洒水器（含压力喷嘴）和稻草人，实时显示浇水与保护范围，一键铺最优图案，自动保存并可分享链接。',
      'Free Stardew Valley sprinkler layout planner. Place Basic/Quality/Iridium sprinklers (with Pressure Nozzle) and scarecrows on a grid, see watered and protected coverage live, fill optimal patterns in one click, autosave and share via link.',
      '免費星露谷物語灑水器佈局規劃器：在網格上放置普通/優質/銥金灑水器（含壓力噴嘴）和稻草人，即時顯示澆水與保護範圍，一鍵鋪最優圖案，自動儲存並可分享連結。',
      '無料のスターデューバレー スプリンクラー配置プランナー。グリッドにスプリンクラー（加圧ノズル対応）やカカシを置き、給水・保護範囲を即時表示。最適配置をワンクリック、自動保存・リンク共有。',
      '무료 스타듀밸리 스프링클러 배치 플래너. 그리드에 스프링클러(가압 노즐)와 허수아비를 배치하고 급수·보호 범위를 실시간 확인, 최적 배치 원클릭, 자동 저장·링크 공유.',
      'Kostenloser Stardew-Valley-Sprinklerplaner. Platziere Sprinkler (mit Druckdüse) und Vogelscheuchen im Raster, sieh Bewässerung und Schutz live, fülle optimale Muster per Klick, mit Autospeicherung und Teilen-Link.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-sprinklers`,
      languages: buildLanguageAlternates('/tools/stardew-sprinklers'),
    },
  }
}

export default async function StardewSprinklersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {getLoc(locale, '工具集', 'Tools', '工具集', 'ツール', '도구', 'Tools')}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">
          {getLoc(locale, '洒水器规划器', 'Sprinkler Planner', '灑水器規劃器', 'スプリンクラープランナー', '스프링클러 플래너', 'Sprinkler-Planer')}
        </span>
      </nav>
      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语洒水器布局规划器', 'Stardew Valley Sprinkler Planner', '星露谷物語灑水器佈局規劃器', 'スターデューバレー スプリンクラープランナー', '스타듀밸리 스프링클러 플래너', 'Stardew Valley Sprinkler-Planer')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(locale,
          '在网格上放置洒水器和稻草人，实时查看浇水与保护范围，一键铺最优图案。布局自动保存，可复制链接分享。',
          'Place sprinklers and scarecrows on the grid, see watered and protected coverage live, and fill optimal patterns in one click. Your layout autosaves and can be shared via link.',
          '在網格上放置灑水器和稻草人，即時查看澆水與保護範圍，一鍵鋪最優圖案。佈局自動儲存，可複製連結分享。',
          'グリッドにスプリンクラーやカカシを配置し、給水・保護範囲を即時に確認、最適配置をワンクリック。配置は自動保存、リンク共有可能。',
          '그리드에 스프링클러와 허수아비를 배치하고 급수·보호 범위를 실시간 확인, 최적 배치를 원클릭. 배치는 자동 저장되고 링크로 공유 가능.',
          'Platziere Sprinkler und Vogelscheuchen im Raster, sieh Bewässerung und Schutz live und fülle optimale Muster per Klick. Dein Layout wird gespeichert und ist per Link teilbar.',
        )}
      </p>
      <StardewSprinklerPlanner locale={locale} />
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`/${locale}/tools/stardew-companion`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '每日助手（边玩边钉住）→', 'Daily Companion (pin while playing) →', '每日助手（邊玩邊釘住）→', 'デイリーコンパニオン（プレイ中に固定）→', '데일리 도우미(플레이 중 고정) →', 'Tagesbegleiter (beim Spielen anheften) →')}
          </Link>
          <Link href={`/${locale}/tools/stardew`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '作物利润计算器 →', 'Crop Calculator →', '作物利潤計算器 →', '作物計算機 →', '작물 계산기 →', 'Feldfrucht-Rechner →')}
          </Link>
          <Link href={`/${locale}/tools/stardew-greenhouse`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '温室规划器（固定 10×12）→', 'Greenhouse Planner (fixed 10×12) →', '溫室規劃器（固定 10×12）→', '温室プランナー →', '온실 플래너 →', 'Gewächshaus-Planer →')}
          </Link>
          <Link href={`/${locale}/tools/stardew-fish`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '鱼类查询 →', 'Fish Finder →', '魚類查詢 →', '魚検索 →', '물고기 찾기 →', 'Fisch-Finder →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
