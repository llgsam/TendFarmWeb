import Link from 'next/link'
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
      ? '农场游戏测评 — 找到你的游戏类型 | Farm Game Hub'
      : 'Farming Game Quizzes — Find Your Perfect Game | Farm Game Hub',
    description: isZh
      ? '农场游戏互动测评：测出你的农场人格、找到最适合你的游戏，结果适合截图分享。'
      : 'Interactive farming game quizzes — discover your farming personality, find the perfect game for your playstyle, and share your results.',
    keywords: isZh
      ? ['农场游戏测评', '农场人格测试', '你是哪位星露谷村民', '星露谷配对测验', 'cozy gamer 测试']
      : ['farming game quiz', 'which stardew valley character are you', 'stardew valley romance quiz', 'cozy gamer quiz', 'which farming game should i play'],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes`,
        [other]: `${BASE_URL}/${other}/quizzes`,
      },
    },
  }
}

const QUIZZES = [
  {
    slug: 'stardew-character',
    emoji: '🌾',
    titleZh: '你是哪位星露谷村民？',
    titleEn: 'Which Stardew Valley Villager Are You?',
    descZh: '6 个问题，测出你最像艾比盖尔、莉亚、潘妮、塞巴斯蒂安还是艾略特？每个结果都有专属描述，适合截图分享。',
    descEn: '6 questions to find your Stardew Valley match — Abigail, Leah, Penny, Sebastian, or Elliott? Each result tells you exactly why you match.',
    tagZh: '角色测试',
    tagEn: 'Character Quiz',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: false,
  },
  {
    slug: 'stardew-romance',
    emoji: '💌',
    titleZh: '你在星露谷里应该和谁在一起？',
    titleEn: 'Which Stardew Valley Character Should You Romance?',
    descZh: '6 个关于感情的问题，测出你最适合和哪位星露谷村民在一起——艾比盖尔、莉亚、潘妮、艾米莉、塞巴斯蒂安还是哈维？',
    descEn: '6 questions about what you want in a relationship to find your perfect Stardew Valley romance match — results include exactly why you fit.',
    tagZh: '配对测验',
    tagEn: 'Romance Match',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: true,
  },
  {
    slug: 'cozy-gamer',
    emoji: '☕',
    titleZh: '你是 Cozy Gamer 吗？',
    titleEn: 'Are You a Cozy Gamer?',
    descZh: '8 个问题测出你的 Cozy 指数（0%–100%）——从硬核玩家到超级 Cozy Gamer，看看你的灵魂属于哪个阵营。',
    descEn: '8 questions to calculate your Cozy Score (0–100%) — from hardcore player to True Cozy Gamer. Share your result with friends.',
    tagZh: '风格测试',
    tagEn: 'Cozy Score',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: false,
  },
  {
    slug: 'which-farming-game',
    emoji: '🎮',
    titleZh: '哪款农场游戏最适合你？',
    titleEn: 'Which Farming Game Should You Play?',
    descZh: '6 个问题，从星露谷、动物森友会、Palia、模拟农场等热门游戏中，精准推荐最适合你的那一款。',
    descEn: '6 questions to match you with the perfect farming game — Stardew Valley, Animal Crossing, Palia, Farming Simulator, and more.',
    tagZh: '游戏推荐',
    tagEn: 'Game Finder',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: false,
  },
  {
    slug: 'farm-personality',
    emoji: '🌱',
    titleZh: '你是哪种农场玩家？',
    titleEn: 'What Kind of Farmer Are You?',
    descZh: '6 个问题，测出你的农场游戏人格——效率农夫、美学农夫、探索农夫还是禅意农夫？附推荐游戏。',
    descEn: '6 questions to reveal your farming personality — Optimizer, Homesteader, Explorer, or Zen — plus personalized game picks.',
    tagZh: '人格测试',
    tagEn: 'Personality',
    timeZh: '约 2 分钟',
    timeEn: '~2 min',
    isNew: false,
  },
]

const FAQ_EN = [
  {
    q: 'Which Stardew Valley villager is the most popular?',
    a: 'Abigail, Leah, and Sebastian consistently rank as the most popular Stardew Valley villagers in fan polls. Abigail wins for her adventurous personality and relatable non-conformism; Leah is beloved for her artist backstory; Sebastian resonates with introverts. Penny and Elliott have dedicated fanbases for their warmth and depth respectively.',
  },
  {
    q: 'Who is the best character to marry in Stardew Valley?',
    a: "There's no single best marriage choice — it depends on your playstyle and personality. Abigail and Leah are most popular for their depth and uniqueness. Harvey is loved for his thoughtfulness, Sebastian for his authenticity, and Penny for her warmth. Take the Stardew Valley Romance Quiz above to find your personal best match.",
  },
  {
    q: 'What are the best farming games right now?',
    a: "The top farming games in 2025 are Stardew Valley (PC/Switch/Mobile), Animal Crossing: New Horizons (Switch), Palia (PC/Switch, free), Hay Day (Mobile), and Farming Simulator 25 (PC/Console). Each excels in a different category.",
  },
  {
    q: 'Is Stardew Valley still worth playing in 2025?',
    a: "Yes — Stardew Valley remains the gold standard farming RPG. The 1.6 update added significant new content, and it's still actively enjoyed by millions. At ~$15, it's one of the best value games ever made.",
  },
  {
    q: 'What farming game is best for relaxation?',
    a: 'Animal Crossing: New Horizons and Cozy Grove are the most relaxing farming games — no fail states, no time pressure, gentle pacing. Palia is also extremely cozy for those who prefer online multiplayer.',
  },
]

const FAQ_ZH = [
  {
    q: '星露谷物语最受欢迎的村民是谁？',
    a: '根据粉丝票选，艾比盖尔、莉亚和塞巴斯蒂安始终是最受欢迎的星露谷村民。艾比盖尔以冒险个性和真实感著称；莉亚凭借艺术家背景故事获得大量喜爱；塞巴斯蒂安则在内向型玩家中高度共鸣。潘妮和艾略特也分别以温柔与深度吸引了忠实粉丝群体。',
  },
  {
    q: '星露谷物语最值得结婚的角色是谁？',
    a: '没有唯一正确答案——最适合结婚的角色取决于你的性格和游戏风格。艾比盖尔和莉亚以深度和个性著称最受欢迎，哈维以体贴、塞巴斯蒂安以真实、潘妮以温暖各有拥趸。做上面的「星露谷配对测验」，找到最适合你的那位。',
  },
  {
    q: '2025 年最好玩的农场游戏有哪些？',
    a: '2025 年最受好评的农场游戏包括：星露谷物语（PC/Switch/手机）、动物森友会（Switch）、Palia（PC/Switch，免费）、Hay Day（手机）、模拟农场 25（PC/主机）。每款都在不同方向上是各自品类的最佳。',
  },
  {
    q: '星露谷物语 2025 年还值得玩吗？',
    a: '非常值得。星露谷物语经过 1.6 更新后内容更丰富，仍然是最受欢迎的农场 RPG。约 100 元人民币的价格，被公认为史上性价比最高的游戏之一。',
  },
  {
    q: '哪款农场游戏最适合放松减压？',
    a: '动物森友会和 Cozy Grove 是最适合放松的农场游戏——没有失败机制、没有时间压力、节奏极其温和。喜欢多人联机的话，Palia 也是极其治愈的选择。',
  },
]

export default async function QuizzesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'
  const faq = isZh ? FAQ_ZH : FAQ_EN

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-12">
          <p className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">
            {isZh ? '互动测评' : 'Interactive Quizzes'}
          </p>
          <h1 className="mb-4 text-4xl font-bold text-[#e8dcc8]">
            {isZh ? '找到你的农场游戏类型' : 'Find Your Farming Game'}
          </h1>
          <p className="max-w-xl text-lg text-[#8a9a7a]">
            {isZh
              ? '测出你的农场玩家类型，找到最适合你的游戏——把结果分享给朋友，看看你们是不是同类农夫。'
              : 'Discover your farming playstyle and find the game that fits you best — then share your results to see if your friends are the same type of farmer.'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {QUIZZES.map((quiz) => (
            <Link
              key={quiz.slug}
              href={`/${locale}/quizzes/${quiz.slug}`}
              className="group relative rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-7 transition-all hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
            >
              {quiz.isNew && (
                <span className="absolute right-4 top-4 rounded-full bg-[#f0a832] px-2 py-0.5 text-xs font-semibold text-[#0f1a0f]">
                  {isZh ? '新上线' : 'NEW'}
                </span>
              )}
              <div className="mb-4 text-4xl">{quiz.emoji}</div>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-[#2d5a27] px-2.5 py-0.5 text-xs text-[#8a9a7a]">
                  {isZh ? quiz.tagZh : quiz.tagEn}
                </span>
                <span className="text-xs text-[#4a5a4a]">
                  {isZh ? quiz.timeZh : quiz.timeEn}
                </span>
              </div>
              <h2 className="mb-2 text-xl font-bold text-[#e8dcc8] transition-colors group-hover:text-[#f0a832]">
                {isZh ? quiz.titleZh : quiz.titleEn}
              </h2>
              <p className="text-sm leading-relaxed text-[#8a9a7a]">
                {isZh ? quiz.descZh : quiz.descEn}
              </p>
              <p className="mt-4 text-sm font-medium text-[#f0a832]">
                {isZh ? '开始测评 →' : 'Start quiz →'}
              </p>
            </Link>
          ))}
        </div>

        {/* FAQ Section for SEO/GEO */}
        <div className="mt-20">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于农场游戏的常见问题' : 'Farming Game FAQ'}
          </h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-5">
                <h3 className="mb-2 font-semibold text-[#e8dcc8]">{q}</h3>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
