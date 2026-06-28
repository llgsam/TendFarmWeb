import Link from 'next/link'
import type { Metadata } from 'next'
import { GAMES, getFeaturedGames, PLATFORM_LABELS, getStyleLabels, getGameName, getGameDesc } from '@/lib/games'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { itemListSchema } from '@/lib/structured-data'

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
  const title = getLoc(
    locale,
    '农场游戏大全 2025 — Farming Game Hub',
    'All Farming Games 2025 — Farming Game Hub',
    '農場遊戲大全 2025 — Farming Game Hub',
    '農場ゲーム一覧 2025 — Farming Game Hub',
    '모든 농장 게임 2025 — Farming Game Hub',
    'Alle Farmspiele 2025 — Farming Game Hub',
  )
  const description = getLoc(
    locale,
    '全球农场游戏大全：Hay Day、星露谷物语、动物森友会、Farming Simulator 等 15+ 款游戏介绍、平台与风格分类，帮你找到最适合自己的农场游戏。',
    'The complete list of farming games — Hay Day, Stardew Valley, Animal Crossing, Farming Simulator, and 15+ more. Find your perfect farming game by platform and style.',
    '全球農場遊戲大全：Hay Day、星露谷物語、動物森友會等 15+ 款遊戲介紹，幫你找到最適合自己的農場遊戲。',
    'Hay Day、Stardew Valley、どうぶつの森など15以上の農場ゲームを紹介。プラットフォームとスタイルで絞り込もう。',
    'Hay Day, Stardew Valley, 동물의 숲 등 15개 이상의 농장 게임을 소개합니다. 플랫폼과 스타일로 찾아보세요.',
    'Die komplette Übersicht der Farmspiele — Hay Day, Stardew Valley, Animal Crossing und 15+ mehr.',
  )
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/games`,
      languages: buildLanguageAlternates('/games'),
    },
  }
}

export default async function GamesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const styleLabels = getStyleLabels(locale)

  const featured = getFeaturedGames()
  const others = GAMES.filter((g) => !g.featured)

  const itemList = itemListSchema(
    getLoc(locale, '农场游戏大全', 'All Farming Games', '農場遊戲大全', 'すべての農場ゲーム', '모든 농장 게임', 'Alle Farmspiele'),
    GAMES.map((g) => ({
      name: getGameName(g, locale),
      url: `${BASE_URL}/${locale}/games/${g.slug}`,
      description: getGameDesc(g, locale),
    }))
  )

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">
          {getLoc(locale, '全球农场游戏', 'Farming Games Directory', '全球農場遊戲', '農場ゲーム一覧', '농장 게임 목록', 'Farmspiele-Verzeichnis')}
        </p>
        <h1 className="mb-4 text-4xl font-bold text-[#e8dcc8]">
          {getLoc(locale, '农场游戏大全', 'All Farming Games', '農場遊戲大全', 'すべての農場ゲーム', '모든 농장 게임', 'Alle Farmspiele')}
        </h1>
        <p className="max-w-xl text-lg text-[#8a9a7a]">
          {getLoc(
            locale,
            '从休闲手游到硬核模拟，一份帮你找到下一款农场游戏的完整列表。',
            'From casual mobile games to hardcore simulations — the complete guide to finding your next farming game.',
            '從休閒手遊到硬核模擬，一份幫你找到下一款農場遊戲的完整列表。',
            'カジュアルなモバイルゲームからハードコアシミュレーションまで — 次の農場ゲームを見つけるための完全ガイド。',
            '캐주얼 모바일 게임부터 하드코어 시뮬레이션까지 — 다음 농장 게임을 찾아드립니다.',
            'Von Casual-Mobile-Games bis zu Hardcore-Simulationen — die komplette Übersicht deines nächsten Farmspiels.',
          )}
        </p>
      </div>

      {/* Featured: deep-coverage games */}
      <section className="mb-14">
        <h2 className="mb-5 text-sm uppercase tracking-widest text-[#8a9a7a]">
          {getLoc(locale, '深度覆盖游戏 — 有详情页、工具和攻略', 'Featured — Full Detail Pages, Tools & Guides', '深度覆蓋遊戲 — 有詳情頁、工具和攻略', '詳細ページ・ツール・攻略あり', '상세 페이지·도구·공략 포함', 'Highlights — Detailseiten, Tools & Guides')}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((game) => (
            <Link
              key={game.slug}
              href={`/${locale}/games/${game.slug}`}
              className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5 hover:border-[#f0a832]/30 transition-colors"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{game.emoji}</span>
                  <div>
                    <h3 className="font-bold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors">
                      {getGameName(game, locale)}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {game.platforms.map((p) => (
                        <span key={p} className="rounded bg-[#2d3d2d] px-1.5 py-0.5 text-[10px] text-[#8a9a7a]">
                          {PLATFORM_LABELS[p]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-[#8a9a7a]">
                {getGameDesc(game, locale)}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {game.styles.map((s) => (
                  <span key={s} className="rounded-full border border-[#2d3d2d] px-2 py-0.5 text-[11px] text-[#8a9a7a]">
                    {styleLabels[s]}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 items-center justify-between">
                <div className="flex gap-3">
                  {game.hasTools && (
                    <span className="text-xs text-[#f0a832]">
                      🔧 {getLoc(locale, '计算器', 'Calculator', '計算器', '計算ツール', '계산기', 'Rechner')}
                    </span>
                  )}
                  {game.hasGuides && (
                    <span className="text-xs text-[#f0a832]">
                      📖 {getLoc(locale, '攻略', 'Guides', '攻略', '攻略', '공략', 'Guides')}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#8a9a7a] group-hover:text-[#f0a832] transition-colors">
                  {getLoc(locale, '查看详情 →', 'View details →', '查看詳情 →', '詳細を見る →', '자세히 보기 →', 'Details →')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* More games */}
      <section>
        <h2 className="mb-5 text-sm uppercase tracking-widest text-[#8a9a7a]">
          {getLoc(locale, '更多农场游戏', 'More Farming Games', '更多農場遊戲', 'その他の農場ゲーム', '더 많은 농장 게임', 'Weitere Farmspiele')}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((game) => (
            <Link
              key={game.slug}
              href={`/${locale}/games/${game.slug}`}
              className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-4 hover:border-[#f0a832]/30 transition-colors"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">{game.emoji}</span>
                <span className="font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors text-sm">
                  {getGameName(game, locale)}
                </span>
              </div>
              <p className="mb-2 text-xs leading-relaxed text-[#8a9a7a]">
                {getGameDesc(game, locale)}
              </p>
              <div className="flex flex-wrap gap-1">
                {game.platforms.map((p) => (
                  <span key={p} className="rounded bg-[#2d3d2d] px-1.5 py-0.5 text-[10px] text-[#8a9a7a]">
                    {PLATFORM_LABELS[p]}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Submit a game */}
      <div className="mt-12 rounded-xl border border-dashed border-[#2d3d2d] p-6 text-center">
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            locale,
            '还有我们没收录的好游戏？',
            'Know a great farming game we missed?',
            '還有我們沒收錄的好遊戲？',
            '他にも良い農場ゲームがありますか？',
            '우리가 놓친 훌륭한 농장 게임이 있나요?',
            'Kennen Sie ein tolles Farmspiel, das wir vergessen haben?',
          )}
          {' '}
          <a href="mailto:jsamgogo@gmail.com" className="text-[#f0a832] hover:underline">
            {getLoc(locale, '告诉我们 →', 'Let us know →', '告訴我們 →', '教えてください →', '알려주세요 →', 'Lass es uns wissen →')}
          </a>
        </p>
      </div>
    </div>
  )
}
