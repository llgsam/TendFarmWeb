import Link from 'next/link'
import { useLocale } from 'next-intl'

function getLoc(locale: string, zh: string, en: string, zhTW: string, ja: string, ko: string, de: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW
  if (locale === 'ja') return ja
  if (locale === 'ko') return ko
  if (locale === 'de') return de
  return en
}

type LocaleText = { zh: string; en: string; 'zh-TW': string; ja: string; ko: string; de: string }

// Flagship comparison articles from the best-games hub.
const PICKS: { slug: string; emoji: string; title: LocaleText }[] = [
  {
    slug: 'which-farming-game-for-you',
    emoji: '🧭',
    title: {
      zh: '哪款农场游戏最适合你？', en: 'Which Farming Game Is Right for You?', 'zh-TW': '哪款農場遊戲最適合你？',
      ja: 'あなたに合う農場ゲームは？', ko: '당신에게 맞는 농장 게임은?', de: 'Welches Farmspiel passt zu dir?',
    },
  },
  {
    slug: 'top-farming-games-2025',
    emoji: '🏆',
    title: {
      zh: '2025 年最佳农场游戏', en: 'Top Farming Games of 2025', 'zh-TW': '2025 年最佳農場遊戲',
      ja: '2025年のベスト農場ゲーム', ko: '2025년 최고의 농장 게임', de: 'Die besten Farmspiele 2025',
    },
  },
  {
    slug: 'animal-crossing-vs-stardew-valley',
    emoji: '⚔️',
    title: {
      zh: '动物森友会 vs 星露谷物语', en: 'Animal Crossing vs Stardew Valley', 'zh-TW': '動物森友會 vs 星露谷物語',
      ja: 'あつ森 vs スターデューバレー', ko: '동물의 숲 vs 스타듀밸리', de: 'Animal Crossing vs. Stardew Valley',
    },
  },
]

function pick(text: LocaleText, locale: string): string {
  return text[locale as keyof LocaleText] ?? text.en
}

export function GuidesTeaser() {
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <section className="px-4 py-16 bg-[#1a2e1a]/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#e8dcc8]">
              {getLoc(locale, '游戏评测与对比', 'Best Games & Comparisons', '遊戲評測與對比', 'ゲーム比較＆おすすめ', '게임 비교 & 추천', 'Beste Spiele & Vergleiche')}
            </h2>
            <p className="mt-1 text-sm text-[#8a9a7a]">
              {getLoc(locale, '横向对比、年度榜单，帮你选对下一款农场游戏', 'Head-to-head comparisons and yearly rankings to pick your next farm', '橫向對比、年度榜單，幫你選對下一款農場遊戲', '徹底比較と年間ランキングで次の一本を', '정면 비교와 연간 순위로 다음 게임 고르기', 'Vergleiche und Rankings für dein nächstes Farmspiel')}
            </p>
          </div>
          <Link
            href={`${base}/guides/best-games`}
            className="text-sm text-[#f0a832] hover:underline whitespace-nowrap"
          >
            {getLoc(locale, '查看全部 →', 'View all →', '查看全部 →', 'すべて見る →', '전체 보기 →', 'Alle ansehen →')}
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PICKS.map((p) => (
            <Link
              key={p.slug}
              href={`${base}/guides/best-games/${p.slug}`}
              className="group rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-5 hover:border-[#f0a832] transition-colors"
            >
              <div className="mb-3 text-3xl">{p.emoji}</div>
              <h3 className="font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors text-sm">
                {pick(p.title, locale)}
              </h3>
              <p className="mt-2 text-xs text-[#f0a832]/70 group-hover:text-[#f0a832] transition-colors">
                {getLoc(locale, '阅读评测 →', 'Read comparison →', '閱讀評測 →', '比較を読む →', '비교 읽기 →', 'Vergleich lesen →')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
