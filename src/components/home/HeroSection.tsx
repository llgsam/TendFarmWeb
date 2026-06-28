import Link from 'next/link'
import { useLocale } from 'next-intl'

function getLoc(locale: string, zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW ?? zh
  if (locale === 'ja') return ja ?? en
  if (locale === 'ko') return ko ?? en
  if (locale === 'de') return de ?? en
  return en
}

export function HeroSection() {
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <section className="relative overflow-hidden px-4 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a2e1a]/40 to-transparent" />
      <div className="relative mx-auto max-w-3xl">
        <p className="mb-4 text-xs uppercase tracking-widest text-[#f0a832]">
          {getLoc(locale, '农场游戏爱好者的集结地', 'The Farming Game Community', '農場遊戲愛好者的集結地', '農場ゲームファンのコミュニティ', '농장 게임 팬들의 커뮤니티', 'Die Community für Farmspiele')}
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-[#e8dcc8] md:text-5xl">
          {getLoc(locale, '发现你的下一款农场游戏', 'Find Your Next Farming Game', '發現你的下一款農場遊戲', '次に遊ぶ農場ゲームを見つけよう', '다음에 즐길 농장 게임을 찾아보세요', 'Finde dein nächstes Farmspiel')}
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[#8a9a7a]">
          {getLoc(
            locale,
            '游戏推荐、玩家工具、互动测评——Hay Day、星露谷、动森，以及更多农场游戏，一站搞定。',
            'Game recommendations, player tools, and interactive quizzes — for Hay Day, Stardew Valley, Animal Crossing, and 20+ more.',
            '遊戲推薦、玩家工具、互動測驗——Hay Day、星露谷、動森，以及更多農場遊戲，一站搞定。',
            'ゲームのおすすめ、プレイヤー向けツール、診断クイズ——Hay Day、スターデュー、あつ森など20以上の農場ゲームを網羅。',
            '게임 추천, 플레이어 도구, 인터랙티브 퀴즈 — Hay Day, 스타듀밸리, 동물의 숲 등 20개 이상의 농장 게임을 한곳에서.',
            'Spieleempfehlungen, Spieler-Tools und interaktive Quizze — für Hay Day, Stardew Valley, Animal Crossing und 20+ mehr.',
          )}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={`${base}/games`}
            className="rounded-lg bg-[#f0a832] px-6 py-2.5 text-sm font-semibold text-[#0f1a0f] transition-opacity hover:opacity-90"
          >
            {getLoc(locale, '🎮 浏览游戏大全 →', '🎮 Browse All Games →', '🎮 瀏覽遊戲大全 →', '🎮 ゲーム一覧を見る →', '🎮 모든 게임 보기 →', '🎮 Alle Spiele ansehen →')}
          </Link>
          <Link
            href={`${base}/quizzes`}
            className="rounded-lg border border-[#f0a832]/40 px-6 py-2.5 text-sm font-semibold text-[#f0a832] transition-colors hover:bg-[#f0a832]/10"
          >
            {getLoc(locale, '🌾 测测你的农场人格 →', '🌾 Take a Farm Quiz →', '🌾 測測你的農場人格 →', '🌾 農場診断を受ける →', '🌾 농장 퀴즈 풀기 →', '🌾 Farm-Quiz starten →')}
          </Link>
        </div>
      </div>
    </section>
  )
}
