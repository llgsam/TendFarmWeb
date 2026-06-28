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
    key: 'quiz',
    href: 'tools/quiz',
    titles: {
      zh: '你是哪种农场玩家？', 'zh-TW': '你是哪種農場玩家？',
      ja: 'あなたはどんな農場プレイヤー？', ko: '당신은 어떤 농장 플레이어인가요?',
      de: 'Was für ein Bauer bist du?', en: 'What Kind of Farmer Are You?',
    },
    descs: {
      zh: '6 个问题，测出你的农场人格——效率、美学、探索还是禅意？并推荐最适合你的游戏。',
      'zh-TW': '6 個問題，測出你的農場人格——效率、美學、探索還是禪意？並推薦最適合你的遊戲。',
      ja: '6問で農場スタイルを診断——効率・美学・探索・禅意のどれ？おすすめゲームも紹介。',
      ko: '6가지 질문으로 농장 성격 진단 — 효율, 미학, 탐험, 선 중 어떤 유형? 게임 추천 포함.',
      de: '6 Fragen um deinen Farm-Typ zu finden — Optimierer, Ästhet, Entdecker oder Zen-Bauer?',
      en: '6 questions to find your farm personality — Optimizer, Homesteader, Explorer, or Zen — plus game picks.',
    },
    tags: { zh: '🌾 测一测', 'zh-TW': '🌾 測一測', ja: '🌾 クイズ', ko: '🌾 퀴즈', de: '🌾 Quiz', en: '🌾 Quiz' },
  },
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
