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

export function SiteIntro() {
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <section className="px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">

        {/* 游戏社区 */}
        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a] p-7">
          <p className="mb-2 text-xs uppercase tracking-widest text-[#8a9a7a]">
            {getLoc(locale, '农场游戏爱好者', 'For Farming Game Fans', '農場遊戲愛好者', '農場ゲームファンへ', '농장 게임 팬을 위해', 'Für Farmspiel-Fans')}
          </p>
          <h2 className="mb-3 text-xl font-bold text-[#e8dcc8]">
            {getLoc(locale, '攻略 · 工具 · 社区', 'Guides · Tools · Community', '攻略 · 工具 · 社區', '攻略 · ツール · コミュニティ', '공략 · 도구 · 커뮤니티', 'Guides · Tools · Community')}
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(
              locale,
              'Hay Day 作物利润计算器、星露谷物语种植策略、动物森友会攻略，以及农场人格测试——帮你玩得更明白，找到真正适合你的农场游戏。',
              'Hay Day crop calculators, Stardew Valley planting strategy, Animal Crossing guides, and a farming personality quiz — play smarter and find the game that fits you.',
              'Hay Day 作物利潤計算器、星露谷物語種植策略、動物森友會攻略，以及農場人格測驗——幫你玩得更明白，找到真正適合你的農場遊戲。',
              'Hay Dayの作物利益計算機、スターデューバレーの栽培戦略、あつ森の攻略、そして農場診断クイズ——もっと賢く遊んで、あなたにぴったりの農場ゲームを見つけよう。',
              'Hay Day 작물 수익 계산기, 스타듀밸리 재배 전략, 동물의 숲 공략, 그리고 농장 성격 퀴즈 — 더 똑똑하게 즐기고 당신에게 맞는 농장 게임을 찾아보세요.',
              'Hay-Day-Ernterechner, Stardew-Valley-Anbaustrategie, Animal-Crossing-Guides und ein Farm-Persönlichkeitsquiz — spiele klüger und finde das Spiel, das zu dir passt.',
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`${base}/tools`}
              className="rounded-lg bg-[#2d3d2d] px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:bg-[#3d4d3d]"
            >
              {getLoc(locale, '🔧 工具集', '🔧 Tools', '🔧 工具集', '🔧 ツール', '🔧 도구', '🔧 Tools')}
            </Link>
            <Link
              href={`${base}/guides/best-games`}
              className="rounded-lg bg-[#2d3d2d] px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:bg-[#3d4d3d]"
            >
              {getLoc(locale, '📖 游戏评测', '📖 Best Games', '📖 遊戲評測', '📖 ゲーム比較', '📖 게임 비교', '📖 Beste Spiele')}
            </Link>
          </div>
        </div>

        {/* TendFarm App */}
        <div className="rounded-2xl border border-[#f0a832]/25 bg-[#f0a832]/5 p-7">
          <p className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">TendFarm App</p>
          <h2 className="mb-3 text-xl font-bold text-[#e8dcc8]">
            {getLoc(locale, '用健康数据，养一座真实的农场', 'Grow a Real Farm with Your Health Data', '用健康數據，養一座真實的農場', '健康データで本物の農場を育てよう', '건강 데이터로 진짜 농장을 키우세요', 'Züchte mit deinen Gesundheitsdaten eine echte Farm')}
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(
              locale,
              '睡得好，农场收成更充盈；步数多，作物提前成熟。TendFarm 是一款 Apple Watch 健康农场 App，正在开发中，开放候补名单。',
              'Sleep well, harvest more. Walk more, crops ripen early. TendFarm is an Apple Watch health farming app in development — waitlist open now.',
              '睡得好，農場收成更充盈；步數多，作物提前成熟。TendFarm 是一款 Apple Watch 健康農場 App，正在開發中，開放候補名單。',
              'よく眠れば収穫が増え、よく歩けば作物が早く実る。TendFarmは開発中のApple Watch健康農場アプリ——ウェイトリスト受付中。',
              '잘 자면 수확이 늘고, 많이 걸으면 작물이 일찍 익어요. TendFarm은 개발 중인 Apple Watch 건강 농장 앱 — 대기자 명단 오픈.',
              'Gut schlafen, mehr ernten. Mehr laufen, Pflanzen reifen früher. TendFarm ist eine Apple-Watch-Gesundheits-Farm-App in Entwicklung — Warteliste jetzt offen.',
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`${base}/philosophy`}
              className="rounded-lg bg-[#f0a832]/15 px-4 py-2 text-sm font-medium text-[#f0a832] transition-colors hover:bg-[#f0a832]/25"
            >
              {getLoc(locale, '了解产品 →', 'Learn more →', '了解產品 →', '詳しく見る →', '자세히 알아보기 →', 'Mehr erfahren →')}
            </Link>
            <Link
              href={`${base}/#waitlist`}
              className="rounded-lg bg-[#f0a832] px-4 py-2 text-sm font-semibold text-[#0f1a0f] transition-opacity hover:opacity-90"
            >
              {getLoc(locale, '加入候补名单', 'Join Waitlist', '加入候補名單', 'ウェイトリストに参加', '대기자 명단 참여', 'Warteliste beitreten')}
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
