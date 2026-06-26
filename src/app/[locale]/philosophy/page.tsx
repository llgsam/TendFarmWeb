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
      ? 'Tend Farm — 你去生活，农场替你生长'
      : 'Tend Farm — You Live, Your Farm Grows',
    description: isZh
      ? 'Tend Farm 是由真实健康数据驱动的放置建造农场。活动、睡眠、恢复和生活节律，转化为农场里的阳光、晨露、空气和 Aura。'
      : 'Tend Farm is an idle farming game powered by your real health data. Activity, sleep, recovery, and lifestyle rhythm become sunlight, dew, air, and Aura.',
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
    icon: '☀️',
    titleZh: '活动 → 阳光 → 作物生长',
    titleEn: 'Activity → Sunlight → Crop Growth',
    descZh: '你走路、运动的时间段，那一段时间片的作物长得更快。晨跑让早晨的田地更有活力。',
    descEn: 'The hours you walk or work out, crops in those time slots grow faster. Your morning run energizes the morning fields.',
  },
  {
    icon: '🌿',
    titleZh: '睡眠 → 晨露 → 收成充盈',
    titleEn: 'Sleep → Morning Dew → Richer Harvest',
    descZh: '睡眠质量和 Vitals 形成晨露，决定当天收成的充盈程度。睡得好，农场的每一次收成都更饱满。',
    descEn: 'Sleep quality and vitals form morning dew, which determines how rich each harvest is. Better sleep means fuller yields.',
  },
  {
    icon: '🌬️',
    titleZh: 'Mood / HRV / 冥想 → 空气 → 燃料效率',
    titleEn: 'Mood / HRV / Meditation → Air → Fuel Efficiency',
    descZh: '心率变异性、冥想记录和心情状态形成空气质量，空气越好，自动收割机燃料消耗越少。',
    descEn: 'HRV, meditation, and mood logs shape air quality. Better air means your auto-harvester burns less fuel.',
  },
  {
    icon: '🔄',
    titleZh: '生活节律 = 健康数据转化率',
    titleEn: 'Lifestyle Rhythm = Health Conversion Rate',
    descZh: '作息越规律，健康数据转化为农场效果的效率越高，最多可以放大 1.12 倍。节律是阳光、晨露、空气和 LifeExp 的放大器。',
    descEn: 'The more consistent your routine, the more efficiently health data converts to farm effects — up to 1.12× amplification. Rhythm multiplies everything.',
  },
  {
    icon: '✨',
    titleZh: 'Aura — 农场越来越像你',
    titleEn: 'Aura — Your Farm Becomes You',
    descZh: '生活节律为基础，叠加农场风格、作物配置和装饰，形成独特的可视化表现力。不是生产倍率，而是你的农场的生命感。',
    descEn: 'Built on your lifestyle rhythm, blended with farm style, crops, and décor. Not a production multiplier — the living presence of your farm.',
  },
  {
    icon: '📈',
    titleZh: 'LifeExp — 生活沉淀为成长',
    titleEn: 'LifeExp — Life Becomes Progress',
    descZh: '长期健康数据积累为 LifeExp，推动农场等级成长，解锁新的作物、区域和农场风格。',
    descEn: 'Long-term health data accumulates into LifeExp, leveling up your farm and unlocking new crops, regions, and styles.',
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
          {isZh ? '你去生活，农场替你生长' : 'You Live. Your Farm Grows.'}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[#8a9a7a]">
          {isZh
            ? 'Tend Farm 是一个由真实健康数据驱动的放置建造农场。你在现实中的活动形成阳光，睡眠形成晨露，心情和恢复状态形成空气，长期生活节律放大一切转化效率。你去生活，农场替你生长；你的生活越有节律，农场越懂得把健康数据转化为生产力。'
            : 'Tend Farm is an idle farming game powered by your real health data. Your daily activity becomes sunlight. Sleep becomes morning dew. Mood and recovery become air quality. And your lifestyle rhythm amplifies it all. You live — your farm grows.'}
        </p>
      </div>

      {/* Core concept callout */}
      <div className="mb-12 rounded-xl border border-[#f0a832]/30 bg-[#f0a832]/5 px-6 py-5">
        <p className="font-medium leading-relaxed text-[#e8dcc8]">
          {isZh
            ? '健康数据不直接变金币，而是影响农场的运行效率——阳光加快生长，晨露让收成更饱满，空气让机器更省燃料。田地、水池、仓库决定基础产能；健康数据决定转化效率和长期成长。'
            : 'Health data never converts directly to coins. It shapes how efficiently your farm runs — sunlight speeds growth, dew enriches harvests, air cuts fuel costs. Infrastructure sets the base; your health data amplifies the results.'}
        </p>
      </div>

      {/* FarmData mapping */}
      <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">
        {isZh ? '健康数据 → 农场能量' : 'Health Data → Farm Energy'}
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
          {isZh ? '为什么做 Tend Farm' : 'Why We Built This'}
        </h2>
        <p className="leading-relaxed text-[#8a9a7a]">
          {isZh
            ? '大多数健康 App 是数据仪表盘——你看了数字，关掉，然后忘了。农场游戏有一种天然的"想看看今天长出什么"的驱动力，和健康数据的每日反馈节奏完美契合。Tend Farm 不是要你完美，而是让健康的生活方式自然地成为你每天期待打开 App 的理由。'
            : 'Most health apps are dashboards — you check the numbers, close the app, and forget. Farming games have a natural "I wonder what grew today" pull that matches daily health feedback perfectly. Tend Farm is not about being perfect. It turns healthy living into something you actually want to open every day.'}
        </p>
      </div>

      {/* Status */}
      <div className="mb-16 rounded-xl border border-[#f0a832]/20 bg-[#f0a832]/5 p-6">
        <h2 className="mb-3 text-lg font-semibold text-[#e8dcc8]">
          {isZh ? '🚧 当前状态：开发中' : '🚧 Status: In Development'}
        </h2>
        <p className="text-sm leading-relaxed text-[#8a9a7a]">
          {isZh
            ? 'Tend Farm 正在积极开发中，预计 2026 年底在 App Store 上线（iOS + Apple Watch）。加入候补名单，第一批用户可以优先体验 Beta 版本，并直接影响产品功能方向。'
            : 'Tend Farm is in active development, targeting an App Store launch in late 2026 for iOS and Apple Watch. Join the waitlist for early Beta access and a direct line to shape the product.'}
        </p>
      </div>

      {/* Feedback */}
      <div className="mb-16">
        <h2 className="mb-4 text-xl font-semibold text-[#f0a832]">
          {isZh ? '欢迎关注和提建议' : 'Follow Along & Share Your Ideas'}
        </h2>
        <p className="mb-4 leading-relaxed text-[#8a9a7a]">
          {isZh
            ? 'Tend Farm 还在早期阶段，每一条用户反馈都会被认真对待。你有功能想法、设计建议，或者只是想聊聊对健康游戏化的看法，都欢迎联系我们。'
            : 'Tend Farm is early-stage and every piece of feedback gets read. Got a feature idea, a design thought, or just want to talk about gamified health? We would love to hear from you.'}
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
