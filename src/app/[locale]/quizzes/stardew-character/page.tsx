import { StardewCharacterQuiz } from '@/components/tools/StardewCharacterQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    title: isZh
      ? '你是哪位星露谷村民？人格测试（艾比盖尔/莉亚/潘妮/塞巴斯蒂安/艾略特）'
      : 'Which Stardew Valley Villager Are You? Personality Quiz',
    description: isZh
      ? '6 个问题测出你最像哪位星露谷村民——艾比盖尔、莉亚、潘妮、塞巴斯蒂安还是艾略特？结果适合截图分享。'
      : '6 questions to find your Stardew Valley match — Abigail, Leah, Penny, Sebastian, or Elliott? Take the quiz and share your result.',
    keywords: isZh
      ? ['星露谷人格测试', '你是哪位星露谷村民', '星露谷角色测试', '星露谷艾比盖尔 莉亚 潘妮', '星露谷物语测试']
      : [
          'which stardew valley character are you',
          'stardew valley quiz',
          'stardew valley personality quiz',
          'what stardew valley villager are you',
          'stardew valley npc quiz',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/stardew-character`,
      languages: buildLanguageAlternates('/quizzes/stardew-character'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Who are the most popular Stardew Valley villagers?',
    a: 'The most popular Stardew Valley villagers (by fan community polls and wiki traffic) are Abigail, Leah, Penny, Sebastian, and Elliott. These five have the most developed backstories and deeply resonant personalities, which is why they are the most romanceable characters in fan discussion.',
  },
  {
    q: 'What is Abigail like in Stardew Valley?',
    a: "Abigail is Stardew Valley's adventurous non-conformist. She loves playing video games, exploring the mines, playing the flute, and anything purple. She's the daughter of Pierre and Caroline, and feels misunderstood by her family. Fans love her for her genuine spirit and the way she grows more confident as your friendship deepens.",
  },
  {
    q: 'What is Leah like in Stardew Valley?',
    a: "Leah is an artist who moved to Pelican Town to pursue her passion for woodcarving and sculpture. She loves nature, spending time outdoors, and creating art. She's independent and authentic, having made real sacrifices to live on her own terms. Her character arc is one of the most acclaimed in the game.",
  },
  {
    q: 'What is Sebastian like in Stardew Valley?',
    a: "Sebastian is Stardew Valley's introverted programmer. He lives in his basement room, rides a motorcycle, loves the rain and fog, and plays tabletop RPGs with his friends Sam and Abigail. He feels suffocated by his family situation and the small-town environment, and opening up takes real time and trust.",
  },
  {
    q: 'Is Stardew Valley worth playing in 2025?',
    a: 'Absolutely. Stardew Valley remains one of the highest-rated games of all time and received a major 1.6 update that added new content, secrets, and quality-of-life improvements. With over 30 million copies sold, it has one of the most active fan communities of any game, and at around $15 it is exceptional value.',
  },
]

const FAQ_ZH = [
  {
    q: '星露谷物语最受欢迎的村民是谁？',
    a: '根据粉丝社区票选和维基流量，最受欢迎的星露谷村民是艾比盖尔、莉亚、潘妮、塞巴斯蒂安和艾略特。这五位都有深度的背景故事和极具共鸣的人格，也是粉丝讨论最多的可攻略角色。',
  },
  {
    q: '星露谷里的艾比盖尔是什么性格？',
    a: '艾比盖尔是星露谷的冒险派非主流。她爱打游戏、探索矿洞、吹长笛，对紫色情有独钟。她是皮埃尔和卡罗琳的女儿，常常觉得家人不理解自己。粉丝们最喜欢她的真实感，以及随着友情加深她越来越自信的成长弧线。',
  },
  {
    q: '星露谷里的莉亚是什么性格？',
    a: '莉亚是一位搬来鹈鹕镇追求艺术梦想的雕刻家。她热爱大自然、户外活动和木雕创作，性格独立真实，为了按自己的方式生活做出了真实的牺牲。她的角色弧线是游戏中评价最高的之一。',
  },
  {
    q: '星露谷里的塞巴斯蒂安是什么性格？',
    a: '塞巴斯蒂安是星露谷的内向程序员。他住在家里的地下室，骑摩托车，喜欢雨天和雾气，和朋友塞缪尔、艾比盖尔一起玩桌游。他对家庭环境和小镇生活感到压抑，对他的信任需要时间慢慢积累。',
  },
  {
    q: '2025 年星露谷物语还值得玩吗？',
    a: '非常值得。星露谷物语至今仍是史上评分最高的游戏之一，1.6 更新带来了大量新内容和品质改善。全球已售出超过 3000 万份，粉丝社区极为活跃。约 100 元的价格提供了极高的性价比。',
  },
]

export default async function StardewCharacterPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
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
      <div className="mx-auto max-w-2xl px-4 py-12">
        <nav className="mb-6 text-sm text-[#8a9a7a]">
          <Link href={`/${locale}/quizzes`} className="hover:text-[#e8dcc8]">
            {locale === 'zh' ? '测评' : locale === 'zh-TW' ? '測評' : locale === 'ja' ? 'クイズ' : locale === 'ko' ? '퀴즈' : locale === 'de' ? 'Quiz' : 'Quizzes'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#e8dcc8]">
            {isZh ? '星露谷村民测试' : 'Stardew Valley Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <StardewCharacterQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '每位村民都有自己的光芒——无论你测出哪位，都没有对错之分。'
            : 'Every villager shines in their own way — no result is better than another.'}
        </p>

        <RelatedQuizzes currentSlug="stardew-character" locale={locale} />

        {/* FAQ Section for SEO/GEO */}
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于星露谷村民的常见问题' : 'Stardew Valley Villager FAQ'}
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
