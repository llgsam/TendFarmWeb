import { FarmAestheticQuiz } from '@/components/tools/FarmAestheticQuiz'
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
      ? '你的农场美学是什么风格？— Cottagecore/暗调/极简 | Farming Game Hub'
      : 'What Is Your Farm Aesthetic? — Cottagecore, Dark Moody, Zen Minimal Quiz',
    description: isZh
      ? '6 个问题测出你的农场美学风格——Cottagecore 田园梦、暗调神秘、彩虹缤纷、禅意极简还是 Cozy Rustic？附推荐游戏与 TendFarm 专属提示。'
      : '6 questions to discover your farm aesthetic style — Cottagecore, Dark & Moody, Bright Cheerful, Zen Minimal, or Cozy Rustic. Includes game picks and shareable results.',
    keywords: isZh
      ? ['农场美学测试', 'cottagecore 农场', '农场风格测验', '极简农场', '暗调农场美学', '农场游戏美学']
      : [
          'farm aesthetic quiz',
          'what is my farm aesthetic',
          'cottagecore farm aesthetic',
          'stardew valley farm aesthetic',
          'dark moody farm',
          'zen minimal farm',
          'cozy farm aesthetic',
          'cottagecore aesthetic test',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/farm-aesthetic`,
      languages: buildLanguageAlternates('/quizzes/farm-aesthetic'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'What is cottagecore farm aesthetic?',
    a: 'Cottagecore is a romantic aesthetic inspired by rural, pastoral life — wildflowers, handmade beeswax candles, linen clothing, honey jars, dried herbs, and rustic stone walls. In farming games, cottagecore typically means natural, slightly overgrown farm designs with cream, sage green, and blush color palettes. It celebrates slow living, craft, and closeness to nature.',
  },
  {
    q: 'What are the best farming games for a cottagecore aesthetic?',
    a: 'The best farming games for cottagecore are Stardew Valley (especially with seasonal decorating mods), Wylde Flowers (built-in witchy cottagecore), Cozy Grove (forest spirit vibes), and Garden Story. Stardew Valley is the most popular because it allows complete freedom in farm layout and decoration, making it perfect for creating wildflower meadows and stone cottage setups.',
  },
  {
    q: 'What is the dark moody farm aesthetic?',
    a: 'Dark and moody farm aesthetic draws from gothic, dark academia, and witchcore influences — deep forest greens, charcoal grays, mist blues, mushroom circles, lanterns instead of floodlights, and ravens on old fences. In Stardew Valley, this style is especially popular for fall and winter farms, mushroom cave setups, and mine-depth builds. It is atmospheric and mysterious while still being cozy.',
  },
  {
    q: 'How do I create a zen minimal farm in Stardew Valley?',
    a: 'To create a zen minimal farm in Stardew Valley: (1) Choose the Forest Farm map for natural edges. (2) Use Japanese-inspired mods like East Scarpe or seasonal farm layouts. (3) Focus on paths using stone floors or gravel — no clutter. (4) Plant in symmetrical rows with bamboo hedges and stone lanterns. (5) Avoid over-decoration — negative space is the point. Quality over quantity, a few intentional elements rather than filling every tile.',
  },
  {
    q: 'What is the cozy rustic aesthetic in farming games?',
    a: 'Cozy rustic aesthetic celebrates warmth, imperfection, and the lived-in quality of a real working farm — rough wood furniture, homemade preserves, apple orchards, woodsmoke from chimneys, and amber autumn tones. Unlike cottagecore (which is more romanticized and delicate), cozy rustic is earthier and more practical-feeling. Best expressed in Stardew Valley fall builds, My Time at Portia, and Hay Day.',
  },
]

const FAQ_ZH = [
  {
    q: '什么是 Cottagecore 农场美学？',
    a: 'Cottagecore 是受田园牧歌生活启发的浪漫美学风格——野花、手工蜂蜡蜡烛、麻布服饰、蜂蜜罐、干燥草药和乡村石墙。在农场游戏中，Cottagecore 风格通常指自然、略微凌乱的农场设计，配色以米白、鼠尾草绿和淡玫瑰为主。它颂扬慢生活、手工艺和亲近自然的生活方式。',
  },
  {
    q: '哪款农场游戏最适合 Cottagecore 美学？',
    a: '最适合 Cottagecore 美学的农场游戏有：星露谷物语（尤其是季节性装饰 Mod 版）、Wylde Flowers（内置女巫 Cottagecore 风格）、Cozy Grove（森林精灵氛围）和 Garden Story。星露谷最受欢迎，因为它提供完全自由的农场布局和装饰，非常适合打造野花草甸和石砌小屋风格。',
  },
  {
    q: '什么是暗调农场美学（Dark & Moody）？',
    a: '暗调农场美学融合了哥特、暗黑学院派和女巫核的影响——深林绿、炭灰、雾蓝、蘑菇圈、提灯而非探照灯，以及站在旧围栏上的乌鸦。在星露谷物语中，这种风格在秋冬农场、蘑菇洞穴布置和矿洞深度主题建设中尤为流行。它神秘而有氛围，同时又带着独特的治愈感。',
  },
  {
    q: '如何在星露谷物语中打造禅意极简农场？',
    a: '在星露谷打造禅意极简农场的方法：(1) 选择森林农场地图，保留自然边缘。(2) 使用日式风格 Mod，如 East Scarpe 或季节性农场布局。(3) 专注于路径设计，使用石板地板或碎石——不要杂乱。(4) 对称种植，配合竹篱笆和石灯笼。(5) 避免过度装饰——留白才是核心。注重质量而非数量，几个有意为之的元素胜过填满每一格土地。',
  },
  {
    q: '农场游戏中的 Cozy Rustic 美学是什么？',
    a: 'Cozy Rustic 美学颂扬温暖、不完美和真实农场的生活感——粗糙的木制家具、自制果酱、苹果园、烟囱里飘出的木柴烟，以及秋日的琥珀色调。与更浪漫、更精致的 Cottagecore 不同，Cozy Rustic 更加质朴和有生活气息。最适合在星露谷秋冬农场、我的时代：波缇亚和 Hay Day 中呈现。',
  },
]

export default async function FarmAestheticPage({
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
            {isZh ? '农场美学测试' : 'Farm Aesthetic Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <FarmAestheticQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '没有好坏之分，只有最适合你的那种美——你的农场，你的审美宇宙。'
            : "No aesthetic is better — yours is the one that feels most like home."}
        </p>

        <RelatedQuizzes currentSlug="farm-aesthetic" locale={locale} />

        {/* FAQ Section for SEO/GEO */}
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于农场美学的常见问题' : 'Farm Aesthetic FAQ'}
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
