import { SpiritfarerQuiz } from '@/components/tools/SpiritfarerQuiz'
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
      ? '你是哪位 Spiritfarer 灵魂？— 角色人格测验'
      : 'Which Spiritfarer Spirit Are You? — Character Personality Quiz',
    description: isZh
      ? '6 个关于情感处理方式的问题，测出你最像 Spiritfarer 里的关恩、阿图尔、夏梦还是古斯塔夫。附角色专属金句。'
      : '6 questions about how you feel and move through life to find your Spiritfarer spirit match — Gwen, Atul, Summer, or Gustav. Each result includes a signature quote.',
    keywords: isZh
      ? ['Spiritfarer 角色测验', 'Spiritfarer 灵魂测试', 'Spiritfarer 值得玩吗', 'Spiritfarer 会哭吗', 'Spiritfarer 攻略', '治愈游戏推荐']
      : [
          'which spiritfarer spirit are you',
          'spiritfarer character quiz',
          'is spiritfarer sad',
          'spiritfarer spirits',
          'spiritfarer tips for beginners',
          'is spiritfarer worth playing',
          'spiritfarer review',
          'spiritfarer gwen atul summer gustav',
          'cozy game about death',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/spiritfarer-quiz`,
      languages: buildLanguageAlternates('/quizzes/spiritfarer-quiz'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'What is Spiritfarer about?',
    a: "Spiritfarer is a cozy management game about death, grief, and letting go, developed by Thunder Lotus Games and released in 2020. You play as Stella, a young woman who takes over from Charon as the Spiritfarer — a ferrymaster who guides the souls of the dead to the afterlife. Along the way, you build and upgrade a boat, grow crops, cook meals, craft materials, and most importantly, befriend a series of colorful spirits based on people Stella knew in life. Each spirit has their own story, personality, and needs, and when the time is right, you help them pass on. The game handles themes of loss, aging, dementia, family conflict, and saying goodbye with remarkable warmth and honesty.",
  },
  {
    q: 'Is Spiritfarer sad? Will it make me cry?',
    a: "Yes — Spiritfarer is emotionally heavy and will very likely make you cry, especially if you have experienced loss or have aging family members. The game deals directly with death, grief, dementia, end-of-life care, complicated family relationships, and saying goodbye. However, it is not a sad game in a hopeless way — it is tender, warm, and ultimately affirming. Many players describe it as cathartic rather than depressing. The character of Alice (a spirit based on a grandmother figure experiencing memory loss) in particular is widely considered one of the most emotionally affecting portrayals of dementia in any video game. Go in prepared, but know that the sadness comes with an enormous amount of love.",
  },
  {
    q: 'How many spirits are in Spiritfarer?',
    a: "Spiritfarer has 12 spirit companions in total across the base game and DLC: Gwen, Atul, Summer, Gustav, Alice, Giovanni, Stanley, Bruce & Mickey (counted as one), Astrid, Elena, Jackie & Daria (counted as one), and Summer. The Lily's Caress DLC added additional content. Each spirit has a complete narrative arc with unique questlines, building requirements, favorite foods, and a farewell sequence. The spirits are widely considered some of the best-written characters in any indie game released in the 2020s.",
  },
  {
    q: 'Is Spiritfarer worth playing in 2025?',
    a: "Yes — Spiritfarer is absolutely worth playing in 2025. It remains one of the highest-rated cozy games ever made (90+ on Metacritic) and is frequently cited as a masterpiece of emotional storytelling in games. The gameplay loop of building your boat, cooking, crafting, and befriending spirits is genuinely satisfying. The art is beautiful. The music is extraordinary. If you have ever lost someone or are grappling with aging loved ones, it may feel uncomfortably real — but in a way that helps. It is also available on Xbox Game Pass and PlayStation Plus at no extra cost for subscribers, making it very accessible.",
  },
  {
    q: 'What are the best tips for Spiritfarer beginners?',
    a: "Spiritfarer beginner tips: (1) Talk to every spirit every day — they often have new dialogue that advances their storylines and you do not want to miss it. (2) Learn each spirit's favorite food early and keep it stocked — feeding spirits their favorites gives big happiness boosts and is required for some quest triggers. (3) Do not rush to say goodbye — you cannot un-do a farewell, so wait until you have completed all of a spirit's questlines. (4) Upgrade your boat early — the Shipyard upgrades that expand your boat grid are essential for fitting all the buildings you will need. (5) The Everdoor awaits each spirit when their arc is complete — you will know when the time is right. (6) The game is not on a timer — take your time, enjoy the cooking, and let the stories unfold at their own pace.",
  },
]

const FAQ_ZH = [
  {
    q: 'Spiritfarer 是一款什么游戏？',
    a: 'Spiritfarer 是一款关于死亡、悲伤和放手的治愈管理游戏，由 Thunder Lotus Games 开发，于 2020 年发布。你扮演斯特拉，一位接替卡戎成为摆渡人的年轻女性——她的职责是引导亡灵的灵魂前往来世。旅途中，你建造和升级船只、种植作物、烹饪食物、制作材料，最重要的是与一系列基于斯特拉生前认识的人的彩色灵魂建立友谊。每位灵魂都有自己的故事、性格和需求，当时机成熟时，你帮助他们离开。游戏以非凡的温柔和诚实处理失去、衰老、痴呆、家庭矛盾和道别等主题。',
  },
  {
    q: 'Spiritfarer 会很悲伤吗？会让我哭吗？',
    a: '会的——Spiritfarer 情感张力很强，极有可能让你哭泣，尤其如果你经历过失去或有年迈的家人。游戏直接处理死亡、悲伤、痴呆、临终关怀、复杂的家庭关系和道别。然而，它不是一款让人绝望的悲伤游戏——它是温柔的、温暖的，最终是肯定生命的。许多玩家形容它是一种宣泄而非压抑。其中爱丽丝这个角色（以一位经历记忆衰退的祖母为原型的灵魂）被广泛认为是任何视频游戏中对痴呆症最能触动人心的描绘之一。做好心理准备，但也要知道：这份悲伤里承载着巨大的爱。',
  },
  {
    q: 'Spiritfarer 里有多少位灵魂？',
    a: 'Spiritfarer 在基础游戏和 DLC 中共有 12 位灵魂伴侣：关恩、阿图尔、夏梦、古斯塔夫、爱丽丝、乔瓦尼、斯坦利、布鲁斯与米奇（算作一位）、阿斯特里德、埃琳娜、杰克与达利亚（算作一位），以及夏梦。Lily 的爱抚 DLC 增加了额外内容。每位灵魂都有完整的叙事弧，包含独特的任务线、建筑需求、最爱食物和告别场景。这些灵魂被广泛认为是 2020 年代发布的任何独立游戏中写得最好的角色之一。',
  },
  {
    q: 'Spiritfarer 2025 年还值得玩吗？',
    a: '绝对值得。Spiritfarer 至今仍是评分最高的治愈游戏之一（Metacritic 90+），经常被誉为游戏界情感叙事的杰作。建造船只、烹饪、制作和与灵魂建立友谊的游戏循环真正令人满足。美术风格精美，音乐出色。如果你曾经失去过某人，或正在与年迈的亲人共处，它可能会让你感到真实得令人不适——但是以一种有帮助的方式。它也在 Xbox Game Pass 和 PlayStation Plus 上对订阅者免费开放，非常容易获取。',
  },
  {
    q: 'Spiritfarer 新手有哪些攻略？',
    a: 'Spiritfarer 新手攻略：(1) 每天和每位灵魂交谈——他们经常有新对话推进故事线，不要错过。(2) 尽早了解每位灵魂最喜欢的食物并保持库存——喂食最爱食物能大幅提升快乐度，也是某些任务触发的条件。(3) 不要急着道别——告别是不可撤销的，所以等到完成所有灵魂的任务线再说。(4) 尽早升级船只——造船厂的扩展升级对于容纳所有需要的建筑至关重要。(5) 永恒之门在每位灵魂的故事弧完成后等待他们——你会知道时机到了。(6) 游戏没有计时器——慢慢来，享受烹饪，让故事按自己的节奏展开。',
  },
]

export default async function SpiritfarerQuizPage({
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
            {isZh ? 'Spiritfarer 灵魂测验' : 'Spiritfarer Character Quiz'}
          </span>
        </nav>

        <h1 className="mb-4 text-2xl font-bold leading-tight text-[#e8dcc8]">
          {isZh ? 'Spiritfarer 灵魂测验' : 'Spiritfarer Character Quiz'}
        </h1>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <SpiritfarerQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '每一位灵魂都值得被好好送别。'
            : 'Every spirit deserves a proper goodbye.'}
        </p>

        <RelatedQuizzes currentSlug="spiritfarer-quiz" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于 Spiritfarer 的常见问题' : 'Spiritfarer FAQ'}
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
