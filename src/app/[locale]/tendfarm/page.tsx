import { WaitlistSection } from '@/components/home/WaitlistSection'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    title: isZh
      ? 'TendFarm App — 用健康数据养一座农场'
      : 'TendFarm App — Grow a Farm with Your Health Data',
    description: isZh
      ? 'TendFarm 是一款 iOS 健康农场 App：活动变阳光，睡眠变晨露，生活节律放大一切。正在开发中，开放候补名单。'
      : 'TendFarm is an iOS health farming app — activity becomes sunlight, sleep becomes dew, and your daily rhythm amplifies everything. In development, waitlist open.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/tendfarm`,
      languages: buildLanguageAlternates('/tendfarm'),
    },
  }
}

const FARM_DATA = [
  { icon: '☀️', labelZh: '活动 → 阳光', labelEn: 'Activity → Sunlight', descZh: '你运动的时间段，作物在那段时间长得更快。', descEn: 'When you move, crops in that time slot grow faster.' },
  { icon: '🌿', labelZh: '睡眠 → 晨露', labelEn: 'Sleep → Morning Dew', descZh: '睡眠质量决定当天收成的充盈程度。', descEn: 'Sleep quality determines how abundant your daily harvest is.' },
  { icon: '🌬️', labelZh: 'HRV / 冥想 → 空气', labelEn: 'HRV / Meditation → Air', descZh: '心率变异性和冥想记录改善空气质量，让机器更省燃料。', descEn: 'HRV and meditation logs improve air quality, cutting fuel costs.' },
  { icon: '🔄', labelZh: '生活节律 → 转化率', labelEn: 'Rhythm → Conversion Rate', descZh: '作息越规律，健康数据转化为农场效果的效率越高，最多 ×1.12。', descEn: 'The more consistent your routine, the more efficiently health data converts — up to ×1.12.' },
  { icon: '📈', labelZh: 'LifeExp — 长期成长', labelEn: 'LifeExp — Long-term Growth', descZh: '长期健康数据积累为 LifeExp，解锁新作物、新区域和农场风格。', descEn: 'Long-term health data accumulates into LifeExp, unlocking new crops, regions, and styles.' },
]

export default async function TendFarmPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">

      {/* Hero */}
      <div className="mb-12 rounded-2xl border border-[#f0a832]/20 bg-[#f0a832]/5 p-8">
        <p className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">TendFarm App</p>
        <h1 className="mb-4 text-4xl font-bold text-[#e8dcc8]">
          {isZh ? '你去生活，农场替你生长' : 'You Live. Your Farm Grows.'}
        </h1>
        <p className="mb-2 max-w-2xl text-lg leading-relaxed text-[#8a9a7a]">
          {isZh
            ? 'TendFarm 是一款 iOS + Apple Watch 健康农场 App。你在现实中的活动、睡眠和生活节律，直接驱动游戏里农场的生长速度和收成丰盈度。'
            : 'TendFarm is an iOS + Apple Watch health farming app. Your real-world activity, sleep, and daily rhythm directly drive how fast your in-game farm grows.'}
        </p>
        <p className="text-sm text-[#f0a832]/80">
          {isZh ? '🚧 开发中，预计 2026 年底上架 App Store' : '🚧 In development — targeting App Store launch in late 2026'}
        </p>
      </div>

      {/* 核心设计原则 */}
      <div className="mb-10 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-6 py-5">
        <p className="font-medium leading-relaxed text-[#e8dcc8]">
          {isZh
            ? '健康数据不直接变金币——而是影响农场的运行效率。田地、水池、仓库决定基础产能；你的健康数据决定转化效率和长期成长。'
            : 'Health data never converts directly to coins — it shapes how efficiently your farm runs. Infrastructure sets the base; your health data amplifies the results.'}
        </p>
      </div>

      {/* FarmData 机制 */}
      <h2 className="mb-5 text-xl font-semibold text-[#f0a832]">
        {isZh ? '健康数据 → 农场能量' : 'Health Data → Farm Energy'}
      </h2>
      <div className="mb-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FARM_DATA.map((item) => (
          <div key={item.labelEn} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-5">
            <div className="mb-2 text-2xl">{item.icon}</div>
            <h3 className="mb-1 font-semibold text-[#e8dcc8]">
              {isZh ? item.labelZh : item.labelEn}
            </h3>
            <p className="text-sm leading-relaxed text-[#8a9a7a]">
              {isZh ? item.descZh : item.descEn}
            </p>
          </div>
        ))}
      </div>

      {/* 为什么做 */}
      <div className="mb-14 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-6">
        <h2 className="mb-3 text-lg font-semibold text-[#f0a832]">
          {isZh ? '为什么做 TendFarm' : 'Why We Built This'}
        </h2>
        <p className="leading-relaxed text-[#8a9a7a]">
          {isZh
            ? '大多数健康 App 是数据仪表盘——你看了数字，关掉，然后忘了。农场游戏有一种天然的"想看看今天长出什么"的驱动力，和健康数据的每日反馈节奏完美契合。TendFarm 不是要你完美，而是让健康的生活方式自然地成为你每天期待打开 App 的理由。'
            : 'Most health apps are dashboards — you check the numbers, close the app, and forget. Farming games have a natural "I wonder what grew today" pull that matches daily health feedback perfectly. TendFarm is not about being perfect. It turns healthy living into something you actually want to open every day.'}
        </p>
      </div>

      {/* 候补名单 */}
      <WaitlistSection />

      {/* 反馈 */}
      <div className="mt-10 text-center">
        <p className="text-sm text-[#8a9a7a]">
          {isZh ? '有想法或功能建议？' : 'Ideas or feature requests?'}
          {' '}
          <a href="mailto:jsamgogo@gmail.com" className="text-[#f0a832] hover:underline">
            {isZh ? '发邮件给我们 →' : 'Email us →'}
          </a>
        </p>
      </div>
    </div>
  )
}
