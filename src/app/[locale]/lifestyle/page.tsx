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
    title: isZh
      ? 'Tend Farm 如何把健康生活转化为农场能量'
      : 'How Tend Farm Turns Your Health Life into Farm Energy',
    description: isZh
      ? '阳光来自活动，晨露来自睡眠，空气来自恢复与心情，生活节律放大转化效率——了解 Tend Farm 的五大健康驱动力。'
      : 'Sunlight from activity, dew from sleep, air from recovery and mood, rhythm as the amplifier — the five health drivers behind Tend Farm.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/lifestyle`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/lifestyle`,
        [other]: `${BASE_URL}/${other}/lifestyle`,
      },
    },
  }
}

const FARM_DATA = [
  {
    farmIcon: '☀️',
    farmNameZh: '阳光',
    farmNameEn: 'Sunlight',
    sourceZh: '活动：步数、运动、训练',
    sourceEn: 'Activity: steps, workouts, exercise',
    effectZh: '作物生长速度',
    effectEn: 'Crop growth speed',
    detailZh: '你在哪个时间段活动，那个时间段的作物生长速度就会提升。早晨跑步 → 早晨的田地更有活力；下午散步 → 下午的作物提前成熟。阳光不是金币，它是生长的驱动力。',
    detailEn: 'Crops grow faster during the hours you are active. Morning run → morning fields thrive. Afternoon walk → afternoon crops ripen early. Sunlight is not currency — it drives growth.',
  },
  {
    farmIcon: '🌿',
    farmNameZh: '晨露',
    farmNameEn: 'Morning Dew',
    sourceZh: 'Vitals / 睡眠：睡眠分阶、静息心率、恢复评分',
    sourceEn: 'Vitals / Sleep: sleep stages, resting HR, recovery score',
    effectZh: '收成充盈度（最多 +20%）',
    effectEn: 'Harvest richness (up to +20%)',
    detailZh: '前一晚的睡眠质量会在清晨凝结为晨露，影响当天所有收成的充盈程度。睡得越好，收成越饱满。晨露不改变基础产量，而是让每一次收成都更值。',
    detailEn: 'Last night\'s sleep condenses into morning dew at dawn, enriching every harvest that day. Better sleep means fuller yields. Dew does not change base output — it makes each harvest count more.',
  },
  {
    farmIcon: '🌬️',
    farmNameZh: '空气',
    farmNameEn: 'Air',
    sourceZh: 'Mood / HRV / 冥想 / 心情记录',
    sourceEn: 'Mood / HRV / meditation / mood logs',
    effectZh: '自动收割机燃料利用率',
    effectEn: 'Auto-harvester fuel efficiency',
    detailZh: '心率变异性、冥想时长和心情记录共同构成空气质量。空气越清新，自动收割机每次运作消耗的燃料越少——让你的农场自动化运转得更久。',
    detailEn: 'HRV, meditation duration, and mood logs together shape air quality. Cleaner air means your auto-harvester burns less fuel per run — your farm automation runs longer.',
  },
  {
    farmIcon: '🔄',
    farmNameZh: '生活节律',
    farmNameEn: 'Lifestyle Rhythm',
    sourceZh: '睡眠规律性、活动规律性、恢复趋势稳定性、数据连续性',
    sourceEn: 'Sleep regularity, activity regularity, recovery stability, data consistency',
    effectZh: '健康数据转化率 ×1.00 ~ ×1.12',
    effectEn: 'Health data conversion rate ×1.00 – ×1.12',
    detailZh: '生活节律是阳光、晨露、空气和 LifeExp 所有效果的放大器。作息越规律，转化率越高：未成形 1.00x → 初醒 1.03x → 稳定 1.06x → 共振 1.09x → 身心合一 1.12x。',
    detailEn: 'Lifestyle rhythm amplifies all health data conversions — sunlight, dew, air, and LifeExp alike. More regularity, higher multiplier: forming 1.00× → awakening 1.03× → steady 1.06× → resonance 1.09× → harmony 1.12×.',
  },
  {
    farmIcon: '📈',
    farmNameZh: 'LifeExp',
    farmNameEn: 'LifeExp',
    sourceZh: '长期健康数据积累',
    sourceEn: 'Long-term health data accumulation',
    effectZh: '农场等级 → 解锁新作物、区域、风格',
    effectEn: 'Farm level → unlock new crops, regions, styles',
    detailZh: '数周、数月的健康数据沉淀形成 LifeExp——生活沉淀为经验。LifeExp 推动农场等级成长，解锁新的作物种类、区域和农场风格建筑。',
    detailEn: 'Weeks and months of health data accumulate into LifeExp — life becomes experience. LifeExp levels up your farm and unlocks new crop varieties, regions, and style buildings.',
  },
]

const RHYTHM_LEVELS = [
  { levelZh: '未成形', levelEn: 'Forming', score: '0 – 39', rate: '1.00×' },
  { levelZh: '初醒', levelEn: 'Awakening', score: '40 – 59', rate: '1.03×' },
  { levelZh: '稳定', levelEn: 'Steady', score: '60 – 74', rate: '1.06×' },
  { levelZh: '共振', levelEn: 'Resonance', score: '75 – 89', rate: '1.09×' },
  { levelZh: '身心合一', levelEn: 'Harmony', score: '90 – 100', rate: '1.12×' },
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
        {isZh ? '你的生活，就是农场的动力' : 'Your Life Is Your Farm\'s Engine'}
      </h1>
      <p className="mb-16 text-lg leading-relaxed text-[#8a9a7a]">
        {isZh
          ? 'Tend Farm 把你的健康数据分为五种农场能量。每种能量影响不同的农场机制，不直接变金币，而是让农场运转得更好、长得更快、更持久。'
          : 'Tend Farm maps your health data into five types of farm energy. Each shapes a different farm mechanic — not converting directly to coins, but making your farm run better, grow faster, and last longer.'}
      </p>

      {/* FarmData list */}
      <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">
        {isZh ? '五种农场能量' : 'Five Farm Energies'}
      </h2>
      <div className="mb-16 space-y-4">
        {FARM_DATA.map((item) => (
          <div key={item.farmNameEn} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="text-2xl">{item.farmIcon}</span>
              <span className="font-bold text-[#e8dcc8]">
                {isZh ? item.farmNameZh : item.farmNameEn}
              </span>
              <span className="text-[#8a9a7a]">←</span>
              <span className="text-sm text-[#8a9a7a]">
                {isZh ? item.sourceZh : item.sourceEn}
              </span>
            </div>
            <p className="mb-2 text-sm font-medium text-[#f0a832]">
              {isZh ? `→ ${item.effectZh}` : `→ ${item.effectEn}`}
            </p>
            <p className="text-sm leading-relaxed text-[#8a9a7a]">
              {isZh ? item.detailZh : item.detailEn}
            </p>
          </div>
        ))}
      </div>

      {/* Rhythm levels table */}
      <h2 className="mb-4 text-xl font-semibold text-[#f0a832]">
        {isZh ? '生活节律等级' : 'Lifestyle Rhythm Levels'}
      </h2>
      <div className="mb-16 overflow-x-auto rounded-xl border border-[#2d3d2d]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2d3d2d] bg-[#1a2e1a]">
              <th className="px-4 py-3 text-left text-[#8a9a7a]">
                {isZh ? '状态' : 'State'}
              </th>
              <th className="px-4 py-3 text-left text-[#8a9a7a]">
                {isZh ? '分数' : 'Score'}
              </th>
              <th className="px-4 py-3 text-left text-[#8a9a7a]">
                {isZh ? '健康数据转化率' : 'Conversion Rate'}
              </th>
            </tr>
          </thead>
          <tbody>
            {RHYTHM_LEVELS.map((row) => (
              <tr key={row.levelEn} className="border-b border-[#2d3d2d] last:border-0">
                <td className="px-4 py-3 font-medium text-[#e8dcc8]">
                  {isZh ? row.levelZh : row.levelEn}
                </td>
                <td className="px-4 py-3 text-[#8a9a7a]">{row.score}</td>
                <td className="px-4 py-3 font-semibold text-[#f0a832]">{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback */}
      <div className="mb-16 rounded-xl border border-[#f0a832]/20 bg-[#f0a832]/5 p-6">
        <h2 className="mb-3 text-xl font-semibold text-[#e8dcc8]">
          {isZh ? '欢迎关注，也欢迎来聊' : 'Follow Along — We\'d Love to Hear from You'}
        </h2>
        <p className="mb-5 leading-relaxed text-[#8a9a7a]">
          {isZh
            ? 'Tend Farm 还在早期，产品方向很大程度上会被真实用户的反馈塑造。你有任何功能想法、对健康游戏化的看法，或者只是觉得这个方向很有意思——都欢迎直接联系我们。'
            : 'Tend Farm is early-stage and user feedback will shape where it goes. Feature ideas, thoughts on gamified health, or just think this direction is interesting — reach out anytime.'}
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
