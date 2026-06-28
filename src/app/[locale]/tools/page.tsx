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
    titleZh: '你是哪种农场玩家？',
    titleEn: 'What Kind of Farmer Are You?',
    descZh: '6 个问题，测出你的农场人格——效率、美学、探索还是禅意？并推荐最适合你的游戏。',
    descEn: '6 questions to find your farm personality — Optimizer, Homesteader, Explorer, or Zen — plus game picks.',
    tag: '🌾 测一测',
    tagEn: '🌾 Quiz',
  },
  {
    key: 'hay-day',
    href: 'tools/hay-day',
    titleZh: 'Hay Day 作物利润计算器',
    titleEn: 'Hay Day Crop Profit Calculator',
    descZh: '按游戏风格筛选最优作物，实时显示利润/分钟和利润/小时。',
    descEn: 'Filter by play style. See gold/min and gold/hour for every field crop.',
    tag: 'Hay Day',
    tagEn: 'Hay Day',
  },
  {
    key: 'stardew',
    href: 'tools/stardew',
    titleZh: '星露谷物语作物利润计算器',
    titleEn: 'Stardew Valley Crop Profit Calculator',
    descZh: '按季节和剩余天数计算最优种植策略，支持工匠技能和再生作物。',
    descEn: 'Best crops by season and days left. Includes regrow crops and artisan processing.',
    tag: 'Stardew Valley',
    tagEn: 'Stardew Valley',
  },
]

export default function ToolsPage() {
  const t = useTranslations('tools')
  const locale = useLocale()
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const wt = useTranslations('waitlist')

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-3 text-4xl font-bold text-[#e8dcc8]">{t('hero.title')}</h1>
      <p className="mb-12 text-lg text-[#8a9a7a]">{t('hero.subtitle')}</p>

      {/* Live Game Calculators */}
      <section className="mb-14">
        <h2 className="mb-4 text-xl font-semibold text-[#e8dcc8]">
          {isZh ? '游戏数值计算器' : 'Game Calculators'}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {LIVE_TOOLS.map((tool) => (
            <Link
              key={tool.key}
              href={`/${locale}/${tool.href}`}
              className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5 transition-colors hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-[#2d5a27] px-2 py-0.5 text-xs text-[#8a9a7a]">
                  {isZh ? tool.tag : tool.tagEn}
                </span>
                <span className="rounded-full bg-[#f0a832]/10 px-2 py-0.5 text-xs font-semibold text-[#f0a832]">
                  {isZh ? '可用' : 'Live'}
                </span>
              </div>
              <h3 className="mb-2 font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors">
                {isZh ? tool.titleZh : tool.titleEn}
              </h3>
              <p className="text-sm text-[#8a9a7a]">{isZh ? tool.descZh : tool.descEn}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* More tools note */}
      <div className="mb-16 rounded-xl border border-dashed border-[#2d3d2d] bg-[#1a2e1a]/30 p-6 text-center">
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '更多农场游戏工具持续更新中 · 有想要的计算器？'
            : 'More farming game tools on the way · Have a calculator request?'}
          {' '}
          <a href="mailto:jsamgogo@gmail.com" className="text-[#f0a832] hover:underline">
            {isZh ? '告诉我们 →' : 'Let us know →'}
          </a>
        </p>
      </div>

      {/* TendFarm App waitlist */}
      <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-8 text-center">
        <p className="mb-1 text-xs uppercase tracking-widest text-[#f0a832]">TendFarm App</p>
        <h2 className="mb-2 text-xl font-semibold text-[#e8dcc8]">
          {isZh ? '用健康数据驱动你的农场' : 'Power your farm with health data'}
        </h2>
        <p className="mb-6 text-sm text-[#8a9a7a]">
          {isZh
            ? '一款 iOS 农场 App，正在开发中。加入候补名单，第一批体验 Beta 版本。'
            : 'An iOS farming app in development. Join the waitlist for early Beta access.'}
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
