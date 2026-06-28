import Link from 'next/link'
import { useLocale } from 'next-intl'

type LocaleText = { zh: string; en: string; 'zh-TW': string; ja: string; ko: string; de: string }

const TOOLS: {
  key: string
  href: string
  icon: string
  title: LocaleText
  desc: LocaleText
  highlight: boolean
}[] = [
  {
    key: 'hay-day',
    href: '/tools/hay-day',
    icon: '📊',
    title: {
      zh: 'Hay Day 作物计算器', en: 'Hay Day Crop Calculator', 'zh-TW': 'Hay Day 作物計算器',
      ja: 'Hay Day 作物計算機', ko: 'Hay Day 작물 계산기', de: 'Hay Day Ernte-Rechner',
    },
    desc: {
      zh: '找出你游戏风格下利润最高的作物。',
      en: 'Find the best crops for your play style.',
      'zh-TW': '找出你遊戲風格下利潤最高的作物。',
      ja: 'プレイスタイルに合った最も利益の高い作物を見つけよう。',
      ko: '당신의 플레이 스타일에 가장 수익성 높은 작물을 찾으세요.',
      de: 'Finde die profitabelsten Pflanzen für deinen Spielstil.',
    },
    highlight: false,
  },
  {
    key: 'stardew',
    href: '/tools/stardew',
    icon: '🌱',
    title: {
      zh: '星露谷作物利润计算器', en: 'Stardew Valley Profit Calculator', 'zh-TW': '星露谷作物利潤計算器',
      ja: 'スターデューバレー作物利益計算機', ko: '스타듀밸리 작물 수익 계산기', de: 'Stardew Valley Gewinnrechner',
    },
    desc: {
      zh: '按季节和剩余天数计算最优种植方案。',
      en: 'Best crops by season, days left, and artisan skill.',
      'zh-TW': '按季節和剩餘天數計算最優種植方案。',
      ja: '季節と残り日数から最適な作物を計算。',
      ko: '계절과 남은 날수로 최적 작물을 계산하세요.',
      de: 'Beste Pflanzen nach Jahreszeit, Resttagen und Handwerk.',
    },
    highlight: false,
  },
]

function pick(text: LocaleText, locale: string): string {
  return text[locale as keyof LocaleText] ?? text.en
}

function getLoc(locale: string, zh: string, en: string, zhTW: string, ja: string, ko: string, de: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW
  if (locale === 'ja') return ja
  if (locale === 'ko') return ko
  if (locale === 'de') return de
  return en
}

export function ToolsTeaser() {
  const locale = useLocale()

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-center text-2xl font-semibold text-[#e8dcc8]">
          {getLoc(locale, '免费游戏计算器', 'Free Game Calculators', '免費遊戲計算器', '無料ゲーム計算機', '무료 게임 계산기', 'Kostenlose Spiel-Rechner')}
        </h2>
        <p className="mb-8 text-center text-sm text-[#8a9a7a]">
          {getLoc(locale, '作物利润计算器，帮你玩得更明白', 'Crop profit calculators to play smarter', '作物利潤計算器，幫你玩得更明白', '作物利益計算機で、もっと賢くプレイ', '작물 수익 계산기로 더 똑똑하게 플레이하세요', 'Ernte-Gewinnrechner, um klüger zu spielen')}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <Link
              key={tool.key}
              href={`/${locale}${tool.href}`}
              className={`group rounded-xl border p-5 transition-colors ${
                tool.highlight
                  ? 'border-[#f0a832]/30 bg-[#f0a832]/5 hover:border-[#f0a832]/60 hover:bg-[#f0a832]/10'
                  : 'border-[#2d3d2d] bg-[#1a2e1a]/30 hover:border-[#f0a832]/30'
              }`}
            >
              <div className="mb-3 text-2xl">{tool.icon}</div>
              <h3 className="mb-1 font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors">
                {pick(tool.title, locale)}
              </h3>
              <p className="text-sm text-[#8a9a7a]">
                {pick(tool.desc, locale)}
              </p>
              <p className="mt-3 text-xs text-[#f0a832]">
                {tool.key === 'quiz'
                  ? getLoc(locale, '开始测试 →', 'Take quiz →', '開始測驗 →', 'クイズを受ける →', '퀴즈 시작 →', 'Quiz starten →')
                  : getLoc(locale, '打开计算器 →', 'Open calculator →', '打開計算器 →', '計算機を開く →', '계산기 열기 →', 'Rechner öffnen →')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
