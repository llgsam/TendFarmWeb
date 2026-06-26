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
    title: isZh ? '健康生活如何驱动 TendFarm 农场' : 'How Your Health Lifestyle Powers TendFarm',
    description: isZh
      ? '了解睡眠、步数和 HRV 如何在 TendFarm 里转化为作物收成、农场生长和燃料效率。'
      : 'See how sleep, steps, and HRV become crop yields, farm growth, and fuel efficiency in TendFarm.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/lifestyle`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/lifestyle`,
        [other]: `${BASE_URL}/${other}/lifestyle`,
      },
    },
  }
}

const HOW_IT_WORKS = [
  {
    icon: '😴',
    inputZh: '睡眠质量',
    inputEn: 'Sleep Quality',
    arrowZh: '前一晚的深睡和 REM',
    arrowEn: 'Prior night\'s deep sleep & REM',
    outputZh: '当天收成更充盈，最多 +20%',
    outputEn: 'Richer harvest that day, up to +20%',
    detailZh: '睡得好，农场会在清晨凝结出「晨露」，让当天的收成更饱满。这是对你昨晚好好休息的直接回报。',
    detailEn: 'Good sleep generates "morning dew" at dawn, swelling that day\'s harvest. A direct reward for last night\'s rest.',
  },
  {
    icon: '🚶',
    inputZh: '每日步数 / 活动',
    inputEn: 'Daily Steps / Activity',
    arrowZh: '活动时间段的阳光强度',
    arrowEn: 'Sunlight intensity during active hours',
    outputZh: '活动时间片的作物提前成熟',
    outputEn: 'Crops in active time slots ripen faster',
    detailZh: '你在哪个时间段活动，那个时间段的作物就长得更快。早晨跑步 → 早晨的作物提前成熟。',
    detailEn: 'Crops grow faster during the hours you\'re active. Morning run → morning crops ripen early.',
  },
  {
    icon: '💓',
    inputZh: 'HRV 心率变异性',
    inputEn: 'Heart Rate Variability',
    arrowZh: '自主神经恢复状态',
    arrowEn: 'Autonomic recovery state',
    outputZh: '自动收割机燃料利用率更高',
    outputEn: 'Auto-harvester uses fuel more efficiently',
    detailZh: 'HRV 越高代表身体恢复越好。在农场里，这体现为收割机每次运作消耗更少燃料，你的资源用得更久。',
    detailEn: 'Higher HRV means your body is more recovered. In the farm, your harvester runs more fuel-efficiently.',
  },
  {
    icon: '🔄',
    inputZh: '生活节律规律性',
    inputEn: 'Lifestyle Regularity',
    arrowZh: '健康数据的转化率系数',
    arrowEn: 'Health data conversion multiplier',
    outputZh: '所有效果提升 ×1.00 ~ 1.12',
    outputEn: 'All effects boosted ×1.00 – 1.12',
    detailZh: '固定的起床、运动、睡眠时间让你的农场进入「共振状态」，所有健康数据的转化效率整体提升。',
    detailEn: 'Consistent wake, move, and sleep times put your farm in a "resonance state," boosting all health-to-farm conversions.',
  },
  {
    icon: '📈',
    inputZh: '长期健康积累',
    inputEn: 'Long-Term Health Trends',
    arrowZh: 'LifeExp 生命值累积',
    arrowEn: 'LifeExp accumulation',
    outputZh: '农场等级提升，解锁新区域和作物',
    outputEn: 'Farm level up, unlock new regions and crops',
    detailZh: '数周、数月的健康数据累积形成 LifeExp，推动农场等级成长，解锁新的世界和作物种类。',
    detailEn: 'Weeks and months of health data accumulate into LifeExp, leveling up your farm and unlocking new worlds.',
  },
]

export default async function LifestylePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* Hero */}
      <h1 className="mb-4 text-4xl font-bold text-[#e8dcc8]">
        {isZh ? '你的每一天，都在滋养你的农场' : 'Every Day of Your Life Feeds Your Farm'}
      </h1>
      <p className="mb-16 text-lg leading-relaxed text-[#8a9a7a]">
        {isZh
          ? 'TendFarm 不要求你改变生活方式，它只是把你已经在做的事情——睡觉、走路、保持规律——转化为农场里看得见的生长。'
          : 'TendFarm doesn\'t ask you to change your life. It just turns what you already do — sleeping, walking, staying regular — into visible farm growth.'}
      </p>

      {/* How it works */}
      <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">
        {isZh ? '健康数据 → 农场效果' : 'Health Data → Farm Effects'}
      </h2>
      <div className="mb-16 space-y-4">
        {HOW_IT_WORKS.map((item) => (
          <div key={item.inputEn} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-5">
            <div className="mb-3 flex items-start gap-3">
              <span className="mt-0.5 text-2xl">{item.icon}</span>
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold text-[#e8dcc8]">
                    {isZh ? item.inputZh : item.inputEn}
                  </span>
                  <span className="text-[#8a9a7a]">→</span>
                  <span className="font-semibold text-[#f0a832]">
                    {isZh ? item.outputZh : item.outputEn}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">
                  {isZh ? item.detailZh : item.detailEn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coming soon */}
      <div className="mb-16 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-6">
        <h2 className="mb-3 text-lg font-semibold text-[#e8dcc8]">
          {isZh ? '🌾 更多功能正在规划中' : '🌾 More Features in the Works'}
        </h2>
        <ul className="space-y-2 text-sm text-[#8a9a7a]">
          {isZh ? (
            <>
              <li>• 田地规划界面：按你的生活时间表优化作物配置</li>
              <li>• 季节系统：随现实季节变化调整游戏内农场节律</li>
              <li>• 朋友农场：查看好友今天的农场状态</li>
              <li>• Apple Watch 表盘小组件：腕上直接看今日收成</li>
            </>
          ) : (
            <>
              <li>• Field planner: optimize your crop layout around your personal schedule</li>
              <li>• Season system: real-world seasons shift your farm&apos;s rhythm</li>
              <li>• Friends&apos; farms: see how your friends&apos; farms are doing today</li>
              <li>• Apple Watch complication: today&apos;s harvest at a glance on your wrist</li>
            </>
          )}
        </ul>
      </div>

      {/* Feedback & follow */}
      <div className="mb-16 rounded-xl border border-[#f0a832]/20 bg-[#f0a832]/5 p-6">
        <h2 className="mb-3 text-xl font-semibold text-[#e8dcc8]">
          {isZh ? '欢迎关注，也欢迎来聊' : 'Follow Along — We\'d Love to Hear from You'}
        </h2>
        <p className="mb-5 leading-relaxed text-[#8a9a7a]">
          {isZh
            ? 'TendFarm 还在早期，产品方向很大程度上会被真实用户的反馈塑造。你有任何功能想法、对健康游戏化的看法，或者只是觉得这个方向很有意思——都欢迎直接联系我们。每一条反馈都会被认真读到。'
            : 'TendFarm is early-stage, and real user feedback will shape where it goes. If you have feature ideas, thoughts on gamified health, or just think this direction is interesting — reach out. Every message gets read.'}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:jsamgogo@gmail.com"
            className="rounded-lg bg-[#f0a832]/10 px-4 py-2 text-sm font-semibold text-[#f0a832] transition-colors hover:bg-[#f0a832]/20"
          >
            {isZh ? '📧 发邮件给我们' : '📧 Email us'}
          </a>
          <a
            href="https://www.reddit.com/r/CozyGamers/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] transition-colors hover:border-[#f0a832]/30 hover:text-[#e8dcc8]"
          >
            {isZh ? '💬 Reddit 社区讨论' : '💬 Reddit community'}
          </a>
        </div>
      </div>

      <WaitlistSection />
    </div>
  )
}
