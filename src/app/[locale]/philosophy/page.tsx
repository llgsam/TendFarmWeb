import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { WaitlistSection } from '@/components/home/WaitlistSection'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const other = otherLocale(locale)
  const isZh = locale === 'zh'
  return {
    title: isZh ? 'TendFarm — 让健康生活长出一座农场' : 'TendFarm — Grow a Farm from Your Healthy Life',
    description: isZh
      ? 'TendFarm 是一款 Apple Watch 健康农场 App：睡眠、步数和 HRV 自动转化为农场生长动力。'
      : 'TendFarm is an Apple Watch farming app where your sleep, steps, and HRV power real farm growth.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/philosophy`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/philosophy`,
        [other]: `${BASE_URL}/${other}/philosophy`,
      },
    },
  }
}

const FEATURES = [
  {
    icon: '🌱',
    titleZh: '健康数据驱动农场生长',
    titleEn: 'Health Data Powers Your Farm',
    descZh: '睡眠质量、每日步数、HRV 自动转化为农场的收成和生长速度，不需要手动输入任何数字。',
    descEn: 'Sleep quality, daily steps, and HRV automatically drive your farm\'s harvest and growth rate — zero manual input.',
  },
  {
    icon: '⌚',
    titleZh: 'Apple Watch 原生接入',
    titleEn: 'Native Apple Watch Integration',
    descZh: '直接读取 HealthKit 全套数据，包括睡眠分阶、活动环、静息心率和心率变异性。',
    descEn: 'Reads HealthKit natively — sleep stages, activity rings, resting heart rate, and HRV all included.',
  },
  {
    icon: '🏡',
    titleZh: '离线也在运转',
    titleEn: 'Grows While You Live',
    descZh: '不需要盯着 App，农场在后台持续生长。打开时看到的是你这段时间健康生活积累的真实成果。',
    descEn: 'No need to tend it all day. Your farm grows in the background, and what you see when you open it reflects your real health habits.',
  },
  {
    icon: '🧘',
    titleZh: '无焦虑设计',
    titleEn: 'Stress-Free by Design',
    descZh: '没有断签惩罚，没有红色警告。生活越规律，收益越稳定——但偶尔的波动不会让你失去进度。',
    descEn: 'No streak punishments, no red alerts. Better rhythms mean better yields — but missing a day won\'t set you back.',
  },
  {
    icon: '🎮',
    titleZh: '玩农场游戏，养成健康习惯',
    titleEn: 'Farm Game Meets Health Habit',
    descZh: '灵感来自 Hay Day、星露谷等农场游戏的治愈感，但农场的生长动力来自你真实的身体状态。',
    descEn: 'Inspired by the cozy loop of Hay Day and Stardew Valley, but your real body powers the farm.',
  },
  {
    icon: '📱',
    titleZh: 'iOS + Apple Watch 首发',
    titleEn: 'iOS + Apple Watch First',
    descZh: '为 iPhone 和 Apple Watch 深度优化，支持手表端独立查看今日农场状态。',
    descEn: 'Deeply optimized for iPhone and Apple Watch. Check today\'s farm status right from your wrist.',
  },
]

export default async function PhilosophyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Hero */}
      <div className="mb-16">
        <h1 className="mb-4 text-4xl font-bold text-[#e8dcc8]">
          {isZh ? '让健康生活，长出一座农场' : 'Grow a Farm from Your Healthy Life'}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[#8a9a7a]">
          {isZh
            ? 'TendFarm 是一款专为 Apple Watch 用户设计的健康农场 App。你睡得好，农场收成就更丰盛；你每天散步，作物就提前成熟。健康习惯不再是冷冰冰的数字指标，而是看得见、摸得着的农场生长。'
            : 'TendFarm is a health farming app built for Apple Watch users. Sleep well and your harvest grows richer. Walk daily and your crops ripen faster. Healthy habits become something you can actually see and feel.'}
        </p>
      </div>

      {/* Features */}
      <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">
        {isZh ? '产品特色' : 'What Makes TendFarm Different'}
      </h2>
      <div className="mb-16 grid gap-4 md:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f.titleEn} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-5">
            <div className="mb-2 text-2xl">{f.icon}</div>
            <h3 className="mb-2 font-semibold text-[#e8dcc8]">
              {isZh ? f.titleZh : f.titleEn}
            </h3>
            <p className="text-sm leading-relaxed text-[#8a9a7a]">
              {isZh ? f.descZh : f.descEn}
            </p>
          </div>
        ))}
      </div>

      {/* Why */}
      <div className="mb-16 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-6">
        <h2 className="mb-4 text-xl font-semibold text-[#f0a832]">
          {isZh ? '为什么做 TendFarm' : 'Why We Built This'}
        </h2>
        <p className="leading-relaxed text-[#8a9a7a]">
          {isZh
            ? '市面上的健康 App 很多，但大多数都是数据仪表盘——你看了数字，关掉 App，然后忘了。我们想换一种方式：把健康数据变成你每天打开会期待的东西。农场游戏天然有「想看看今天长出什么」的驱动力，和健康数据的每日反馈节奏完美契合。TendFarm 不是要你完美，而是让健康的生活方式自然地成为你日常的一部分。'
            : 'Most health apps are dashboards — you check the numbers, close the app, and forget. We wanted something different: health data that becomes something you actually want to open every day. Farming games have a natural "I wonder what grew today" pull that matches perfectly with daily health feedback. TendFarm isn\'t about being perfect. It\'s about making a healthy lifestyle feel like a natural part of your day.'}
        </p>
      </div>

      {/* Status */}
      <div className="mb-16 rounded-xl border border-[#f0a832]/20 bg-[#f0a832]/5 p-6">
        <h2 className="mb-3 text-lg font-semibold text-[#e8dcc8]">
          {isZh ? '🚧 当前状态：开发中' : '🚧 Status: In Development'}
        </h2>
        <p className="text-sm leading-relaxed text-[#8a9a7a]">
          {isZh
            ? 'TendFarm 正在积极开发中，预计 2026 年底在 App Store 上线（iOS + Apple Watch）。加入候补名单，第一批用户可以优先体验 Beta 版本，并直接影响产品功能方向。'
            : 'TendFarm is in active development, targeting an App Store launch in late 2026 for iOS and Apple Watch. Join the waitlist to get early Beta access and help shape the product.'}
        </p>
      </div>

      {/* Feedback */}
      <div className="mb-16">
        <h2 className="mb-4 text-xl font-semibold text-[#f0a832]">
          {isZh ? '欢迎关注和提建议' : 'Follow Along & Share Your Ideas'}
        </h2>
        <p className="mb-4 leading-relaxed text-[#8a9a7a]">
          {isZh
            ? 'TendFarm 还在早期阶段，每一条用户反馈都会被认真对待。你有功能想法、设计建议，或者只是想聊聊对健康游戏化的看法，都欢迎联系我们。'
            : 'TendFarm is still early, and every piece of feedback is taken seriously. Got a feature idea, a design suggestion, or just want to talk about gamified health? We\'d love to hear from you.'}
        </p>
        <a
          href="mailto:jsamgogo@gmail.com"
          className="inline-block rounded-lg bg-[#f0a832]/10 px-5 py-2.5 text-sm font-semibold text-[#f0a832] transition-colors hover:bg-[#f0a832]/20"
        >
          {isZh ? '发邮件给我们 →' : 'Send us an email →'}
        </a>
      </div>

      <WaitlistSection />
    </div>
  )
}
