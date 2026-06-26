import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

const TOOLS = [
  {
    key: 'quiz',
    href: '/tools/quiz',
    icon: '🌾',
    titleZh: '你是哪种农场玩家？',
    titleEn: 'What Kind of Farmer Are You?',
    descZh: '6 个问题，测出你的农场游戏人格，推荐最适合你的游戏。',
    descEn: '6 questions to reveal your farming personality and get personalized game picks.',
    highlight: true,
  },
  {
    key: 'hay-day',
    href: '/tools/hay-day',
    icon: '📊',
    titleZh: 'Hay Day 作物计算器',
    titleEn: 'Hay Day Crop Calculator',
    descZh: '找出你游戏风格下利润最高的作物。',
    descEn: 'Find the best crops for your play style.',
    highlight: false,
  },
  {
    key: 'stardew',
    href: '/tools/stardew',
    icon: '🌱',
    titleZh: '星露谷作物利润计算器',
    titleEn: 'Stardew Valley Profit Calculator',
    descZh: '按季节和剩余天数计算最优种植方案。',
    descEn: 'Best crops by season, days left, and artisan skill.',
    highlight: false,
  },
]

export function ToolsTeaser() {
  const t = useTranslations()
  const locale = useLocale()
  const isZh = locale === 'zh'

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-center text-2xl font-semibold text-[#e8dcc8]">
          {isZh ? '免费游戏工具' : 'Free Game Tools'}
        </h2>
        <p className="mb-8 text-center text-sm text-[#8a9a7a]">
          {isZh ? '计算器 + 人格测试，帮你玩得更明白' : 'Calculators and quizzes to play smarter'}
        </p>

        <div className="grid gap-4 md:grid-cols-3">
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
                {isZh ? tool.titleZh : tool.titleEn}
              </h3>
              <p className="text-sm text-[#8a9a7a]">
                {isZh ? tool.descZh : tool.descEn}
              </p>
              <p className="mt-3 text-xs text-[#f0a832]">
                {isZh ? (tool.key === 'quiz' ? '开始测试 →' : '打开计算器 →') : (tool.key === 'quiz' ? 'Take quiz →' : 'Open calculator →')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
