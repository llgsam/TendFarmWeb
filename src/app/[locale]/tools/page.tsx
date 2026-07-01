import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { WaitlistForm } from '@/components/ui/WaitlistForm'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'tools' })
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools`,
      languages: buildLanguageAlternates('/tools'),
    },
  }
}

const LIVE_TOOLS = [
  {
    key: 'hay-day',
    href: 'tools/hay-day',
    titles: {
      zh: 'Hay Day 作物利润计算器', 'zh-TW': 'Hay Day 作物利潤計算器',
      ja: 'Hay Day 作物利益計算機', ko: 'Hay Day 작물 수익 계산기',
      de: 'Hay Day Ernte-Gewinnrechner', en: 'Hay Day Crop Profit Calculator',
    },
    descs: {
      zh: '按游戏风格筛选最优作物，实时显示利润/分钟和利润/小时。',
      'zh-TW': '按遊戲風格篩選最優作物，即時顯示利潤/分鐘和利潤/小時。',
      ja: 'プレイスタイルで作物を絞り込み。金/分・金/時間をリアルタイム表示。',
      ko: '플레이 스타일로 작물 필터링. 모든 작물의 골드/분·골드/시간 확인.',
      de: 'Nach Spielstil filtern. Gold/min und Gold/h für jede Feldpflanze anzeigen.',
      en: 'Filter by play style. See gold/min and gold/hour for every field crop.',
    },
    tags: { zh: 'Hay Day', 'zh-TW': 'Hay Day', ja: 'Hay Day', ko: 'Hay Day', de: 'Hay Day', en: 'Hay Day' },
  },
  {
    key: 'stardew',
    href: 'tools/stardew',
    titles: {
      zh: '星露谷物语作物利润计算器', 'zh-TW': '星露谷物語作物利潤計算器',
      ja: 'スターデューバレー作物利益計算機', ko: '스타듀 밸리 작물 수익 계산기',
      de: 'Stardew Valley Ernte-Gewinnrechner', en: 'Stardew Valley Crop Profit Calculator',
    },
    descs: {
      zh: '按季节和剩余天数计算最优种植策略，支持工匠技能和再生作物。',
      'zh-TW': '按季節和剩餘天數計算最優種植策略，支援工匠技能和再生作物。',
      ja: '季節と残り日数で最適な作物を計算。再生作物と職人加工にも対応。',
      ko: '계절과 남은 날수로 최적 작물 계산. 재생 작물과 장인 가공 지원.',
      de: 'Beste Ernten nach Jahreszeit und verbleibenden Tagen. Inkl. nachwachsende Pflanzen und Handwerk.',
      en: 'Best crops by season and days left. Includes regrow crops and artisan processing.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
]

const DATA_TOOLS = [
  {
    key: 'stardew-calendar',
    href: 'tools/stardew-calendar',
    titles: {
      zh: '星露谷物语日历（生日+节日）', 'zh-TW': '星露谷物語日曆（生日+節日）',
      ja: 'スターデューバレー カレンダー', ko: '스타듀밸리 달력',
      de: 'Stardew Valley Kalender', en: 'Stardew Valley Calendar',
    },
    descs: {
      zh: '四季全部村民生日和节日速查，附村民生日查询工具。',
      'zh-TW': '四季全部村民生日和節日速查，附村民生日查詢工具。',
      ja: '全季節の村人の誕生日とフェスティバル一覧。誕生日検索付き。',
      ko: '사계절 모든 주민 생일과 축제 일람. 생일 검색 포함.',
      de: 'Alle Geburtstage und Festivals pro Jahreszeit, mit Geburtstags-Suche.',
      en: 'All villager birthdays and festivals per season, with a birthday lookup.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
  {
    key: 'stardew-gifts',
    href: 'tools/stardew-gifts',
    titles: {
      zh: '星露谷物语送礼喜好查询', 'zh-TW': '星露谷物語送禮喜好查詢',
      ja: 'スターデューバレー 贈り物ガイド', ko: '스타듀밸리 선물 가이드',
      de: 'Stardew Valley Geschenk-Guide', en: 'Stardew Valley Gift Guide',
    },
    descs: {
      zh: '选村民，立刻查看 TA 最爱的礼物和通用最爱礼物。',
      'zh-TW': '選村民，立刻查看 TA 最愛的禮物和通用最愛禮物。',
      ja: '村人を選ぶと大好きな贈り物と一般的な大好き物を即表示。',
      ko: '주민을 선택하면 좋아하는 선물과 보편적 선물을 즉시 표시.',
      de: 'Wähle einen Bewohner für seine Lieblingsgeschenke und Favoriten.',
      en: 'Pick a villager to see their loved gifts and universal loves.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
]

export default function ToolsPage() {
  const t = useTranslations('tools')
  const locale = useLocale()
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const wt = useTranslations('waitlist')

  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-3 text-4xl font-bold text-[#e8dcc8]">{t('hero.title')}</h1>
      <p className="mb-12 text-lg text-[#8a9a7a]">{t('hero.subtitle')}</p>

      {/* Live Game Calculators */}
      <section className="mb-14">
        <h2 className="mb-4 text-xl font-semibold text-[#e8dcc8]">
          {getLoc('游戏数值计算器', 'Game Calculators', '遊戲數值計算器', 'ゲーム計算ツール', '게임 계산기', 'Spiel-Rechner')}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {LIVE_TOOLS.map((tool) => {
            const l = locale as keyof typeof tool.titles
            const title = tool.titles[l] ?? tool.titles['en']
            const desc = tool.descs[l] ?? tool.descs['en']
            const tag = tool.tags[l] ?? tool.tags['en']
            return (
              <Link
                key={tool.key}
                href={`/${locale}/${tool.href}`}
                className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5 transition-colors hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-[#2d5a27] px-2 py-0.5 text-xs text-[#8a9a7a]">
                    {tag}
                  </span>
                  <span className="rounded-full bg-[#f0a832]/10 px-2 py-0.5 text-xs font-semibold text-[#f0a832]">
                    {getLoc('可用', 'Live', '可用', 'ライブ', '라이브', 'Live')}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-[#8a9a7a]">{desc}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Game Data Lookup */}
      <section className="mb-14">
        <h2 className="mb-1 text-xl font-semibold text-[#e8dcc8]">
          {getLoc('游戏数据查询', 'Game Database', '遊戲數據查詢', 'ゲームデータ検索', '게임 데이터 조회', 'Spiel-Datenbank')}
        </h2>
        <p className="mb-4 text-sm text-[#8a9a7a]">
          {getLoc(
            '即时查询游戏内数据：生日、节日、礼物、鱼类……',
            'Look up in-game data instantly: birthdays, festivals, gifts, fish…',
            '即時查詢遊戲內數據：生日、節日、禮物、魚類……',
            'ゲーム内データを即座に検索：誕生日、フェスティバル、贈り物、魚…',
            '게임 내 데이터를 즉시 조회: 생일, 축제, 선물, 물고기…',
            'Spielinterne Daten sofort nachschlagen: Geburtstage, Festivals, Geschenke, Fische…',
          )}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {DATA_TOOLS.map((tool) => {
            const l = locale as keyof typeof tool.titles
            const title = tool.titles[l] ?? tool.titles['en']
            const desc = tool.descs[l] ?? tool.descs['en']
            const tag = tool.tags[l] ?? tool.tags['en']
            return (
              <Link
                key={tool.key}
                href={`/${locale}/${tool.href}`}
                className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5 transition-colors hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-[#2d5a27] px-2 py-0.5 text-xs text-[#8a9a7a]">
                    {tag}
                  </span>
                  <span className="rounded-full bg-[#f0a832]/10 px-2 py-0.5 text-xs font-semibold text-[#f0a832]">
                    {getLoc('可用', 'Live', '可用', 'ライブ', '라이브', 'Live')}
                  </span>
                </div>
                <h3 className="mb-2 font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-[#8a9a7a]">{desc}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Cross-link to Quizzes (quizzes live in their own section, not as a "tool") */}
      <Link
        href={`/${locale}/quizzes`}
        className="mb-6 flex items-center justify-between rounded-xl border border-[#f0a832]/25 bg-[#f0a832]/5 p-5 transition-colors hover:border-[#f0a832]/50"
      >
        <div>
          <p className="font-semibold text-[#e8dcc8]">
            {getLoc('🌾 想测测你是哪种农场玩家？', '🌾 Curious what kind of farmer you are?', '🌾 想測測你是哪種農場玩家？', '🌾 あなたの農場プレイヤータイプは？', '🌾 당신은 어떤 농장 플레이어일까요?', '🌾 Welcher Farmer-Typ bist du?')}
          </p>
          <p className="mt-0.5 text-sm text-[#8a9a7a]">
            {getLoc('60+ 个农场游戏互动测验，找到最适合你的游戏。', '60+ interactive farming-game quizzes to find your perfect game.', '60+ 個農場遊戲互動測驗，找到最適合你的遊戲。', '60以上の農場ゲーム診断であなたにぴったりの一本を。', '60개 이상의 농장 게임 퀴즈로 딱 맞는 게임을 찾으세요.', 'Über 60 Farmspiel-Quizze, um dein perfektes Spiel zu finden.')}
          </p>
        </div>
        <span className="ml-4 shrink-0 text-sm font-semibold text-[#f0a832]">
          {getLoc('去测验 →', 'Browse quizzes →', '去測驗 →', '診断を見る →', '퀴즈 보기 →', 'Quizze ansehen →')}
        </span>
      </Link>

      {/* More tools note */}
      <div className="mb-16 rounded-xl border border-dashed border-[#2d3d2d] bg-[#1a2e1a]/30 p-6 text-center">
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '更多农场游戏工具持续更新中 · 有想要的计算器？',
            'More farming game tools on the way · Have a calculator request?',
            '更多農場遊戲工具持續更新中 · 有想要的計算器？',
            '農場ゲームツールを続々追加中 · リクエストはありますか？',
            '더 많은 농장 게임 도구가 출시 예정 · 계산기 요청이 있으신가요?',
            'Mehr Farming-Tools kommen · Hast du einen Rechner-Wunsch?'
          )}
          {' '}
          <a href="mailto:jsamgogo@gmail.com" className="text-[#f0a832] hover:underline">
            {getLoc('告诉我们 →', 'Let us know →', '告訴我們 →', '教えてください →', '알려주세요 →', 'Lass es uns wissen →')}
          </a>
        </p>
      </div>

      {/* TendFarm App waitlist */}
      <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-8 text-center">
        <p className="mb-1 text-xs uppercase tracking-widest text-[#f0a832]">TendFarm App</p>
        <h2 className="mb-2 text-xl font-semibold text-[#e8dcc8]">
          {getLoc('用健康数据驱动你的农场', 'Power your farm with health data', '用健康數據驅動你的農場', '健康データで農場を動かそう', '건강 데이터로 농장을 강화하세요', 'Stärke deine Farm mit Gesundheitsdaten')}
        </h2>
        <p className="mb-6 text-sm text-[#8a9a7a]">
          {getLoc(
            '一款 iOS 农场 App，正在开发中。加入候补名单，第一批体验 Beta 版本。',
            'An iOS farming app in development. Join the waitlist for early Beta access.',
            '一款 iOS 農場 App，正在開發中。加入候補名單，第一批體驗 Beta 版本。',
            '開発中のiOS農場アプリ。ウェイトリストに参加してBeta版をいち早く体験。',
            '개발 중인 iOS 농장 앱. 대기자 명단에 합류해 베타를 가장 먼저 경험하세요.',
            'Eine iOS-Farm-App in Entwicklung. Tritt der Warteliste bei für frühen Beta-Zugang.'
          )}
        </p>
        <div className="mx-auto max-w-md">
          <WaitlistForm
            locale={locale}
            sourcePage="tools"
            successMessage={wt('success')}
            duplicateMessage={wt('duplicate')}
            errorMessage={wt('error')}
            buttonText={wt('button')}
            placeholder={wt('placeholder')}
          />
        </div>
      </div>
    </div>
  )
}
