import { AnimalCrossingVillagerQuiz } from '@/components/tools/AnimalCrossingVillagerQuiz'
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
      ? '你是哪位动物森友会村民？— 西施惠/雷蒙德/布丁/松风测验'
      : 'Which Animal Crossing Villager Are You? — Isabelle, Raymond, Stitches or Marshal Quiz',
    description: isZh
      ? '6 个性格问题，测出你最像哪位动物森友会村民——西施惠的温暖、雷蒙德的品味、布丁的治愈，还是松风的艺术感？附专属好友互动描述。'
      : '6 personality questions to find your Animal Crossing villager match — Isabelle, Raymond, Stitches, or Marshal? Includes a special "if they were your friend" detail for each result.',
    keywords: isZh
      ? ['动物森友会村民测验', '你是哪位动物森友会村民', 'ACNH 性格测试', '西施惠还是雷蒙德', '动物森友会布丁 松风', '动物森友会人格测验']
      : [
          'which animal crossing villager are you',
          'animal crossing personality quiz',
          'animal crossing character quiz',
          'which acnh villager are you',
          'isabelle or raymond quiz',
          'animal crossing villager quiz',
          'acnh personality test',
          'which animal crossing character matches me',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/animal-crossing-villager`,
      languages: buildLanguageAlternates('/quizzes/animal-crossing-villager'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Who is the most popular Animal Crossing villager?',
    a: "Raymond consistently ranks as the most popular Animal Crossing villager since New Horizons launched — his unique grey and white design with heterochromatic eyes made him instantly iconic. Stitches, Marshal, Fauna, and Isabelle are perennial top-10 favorites. Among \"cute\" villagers, Stitches leads. Among \"cool\" villagers, Raymond leads. Isabelle is the most recognizable face of the entire franchise, though she is a staff member rather than a resident villager.",
  },
  {
    q: 'What are the Animal Crossing villager personality types?',
    a: "Animal Crossing: New Horizons has 8 personality types: Normal (friendly, maternal, warm), Peppy (excitable, energetic, positive), Lazy (food-loving, laid-back, wholesome), Cranky (grumpy exterior but secretly caring), Snooty (sophisticated, fashion-obsessed, initially cold), Smug (cool, artistic, confident), Jock (athletic, competitive, loud), and Uchi/Sisterly (tough-love, big-sister energy). Each type has distinct dialogue rhythms, sleep schedules, and ways of relating to you.",
  },
  {
    q: 'Is Animal Crossing: New Horizons still worth playing in 2025?',
    a: "Yes — Animal Crossing: New Horizons remains one of the best-selling Nintendo Switch games ever with over 44 million copies sold. Its island design tools are unmatched in the cozy game genre. It is worth playing for the first time at any point: there is no time pressure, the game moves at real-world pace, and the seasonal events (cherry blossoms, Toy Day, Festivale) give you reasons to return year-round. If you are new, start in any season and just let it unfold naturally.",
  },
  {
    q: 'How do I get Raymond in Animal Crossing: New Horizons?',
    a: "Raymond appears randomly on Mystery Island tours (Nook Miles Ticket flights) or at your Campsite. You cannot target him specifically — it is pure luck. He also does not have an amiibo card, so he cannot be summoned that way. The most reliable methods are: (1) use Nook Miles Tickets repeatedly until he appears on a mystery island, (2) visit other players' islands if Raymond is moving out, or (3) use a trading community like Nookazon to invite him from another player's campsite.",
  },
  {
    q: 'What is the difference between Isabelle and Tom Nook in Animal Crossing?',
    a: "Isabelle is your Resident Services secretary — she manages community announcements, island evaluation ratings, changing the island flag/tune, and daily island-running tasks. Tom Nook is the real estate developer — he manages your housing loan, the Nook Miles rewards program, new resident recruitment, and overall island development. They serve complementary roles. Tom Nook is the infrastructure builder; Isabelle is the community manager. Both are among the most recognized Nintendo characters worldwide.",
  },
]

const FAQ_ZH = [
  {
    q: '动物森友会最受欢迎的村民是谁？',
    a: '自《集合啦！动物森友会》发布以来，雷蒙德始终高居最受欢迎村民榜首——他独特的灰白配色和异色瞳设计让他瞬间成为标志性角色。布丁、松风、小鹿和西施惠也长期位列前 10。在「可爱型」村民中布丁领先，在「酷炫型」村民中雷蒙德领先。西施惠是整个系列最具代表性的形象，但她是工作人员而非可招募的居民村民。',
  },
  {
    q: '动物森友会村民有哪些性格类型？',
    a: '动物森友会有 8 种性格类型：普通型（友好、母性、温暖）、元气型（活泼、充满能量、积极向上）、懒散型（爱美食、随性、治愈感强）、大叔型（外表暴躁但内心关心人）、高傲型（精致、痴迷时尚、初期较冷漠）、自信型（酷、有艺术感、自信）、运动型（热爱运动、好胜心强、热情）、辣妹型（大姐姐能量、直爽、真心关心你）。每种性格类型都有各自独特的对话风格、作息时间和与你互动的方式。',
  },
  {
    q: '2025 年《集合啦！动物森友会》还值得玩吗？',
    a: '非常值得。《集合啦！动物森友会》是有史以来最畅销的任天堂 Switch 游戏之一，全球销量超过 4400 万份。其岛屿设计工具在 Cozy 游戏品类中无可比拟。无论何时开始，这款游戏都值得一玩：没有时间压力，游戏按现实时间节奏推进，四季活动（樱花飘落、玩具节、嘉年华等）全年都给你回归的理由。如果是新玩家，从任何季节开始，让它自然展开即可。',
  },
  {
    q: '怎么在动物森友会里招募雷蒙德？',
    a: '雷蒙德随机出现在神秘小岛旅行（Nook 的飞机票之旅）或你的露营地。没有办法定向找他——全靠运气。他也没有 amiibo 卡片，所以无法通过 amiibo 召唤。最可靠的方法：(1) 不断使用 Nook 飞机票，直到他出现在神秘小岛；(2) 拜访其他玩家的岛屿，如果雷蒙德正在搬走可以邀请他；(3) 使用 Nookazon 等交易社区，从其他玩家的露营地邀请。',
  },
  {
    q: '西施惠和狸猫先生在动物森友会里有什么区别？',
    a: '西施惠是你的居民服务秘书——负责社区公告、岛屿评级、更改岛屿旗帜/曲调以及日常运营事务。狸猫先生是房地产开发商——管理你的住房贷款、Nook 积分奖励体系、新居民招募和整体岛屿开发。两人角色互补：狸猫先生是基础建设者，西施惠是社区管理者。两者都是全球最知名的任天堂角色之一。',
  },
]

export default async function AnimalCrossingVillagerPage({
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
            {isZh ? '动物森友会村民测验' : 'Animal Crossing Villager Quiz'}
          </span>
        </nav>

        <h1 className="mb-4 text-2xl font-bold leading-tight text-[#e8dcc8]">
          {isZh ? '动物森友会村民测验' : 'Animal Crossing Villager Quiz'}
        </h1>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <AnimalCrossingVillagerQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '每位村民都有独特的魅力——无论你是谁，你的存在都让这座岛屿变得更特别。'
            : "Every villager has their own magic — whoever you are, you make the island better."}
        </p>

        <RelatedQuizzes currentSlug="animal-crossing-villager" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于动物森友会村民的常见问题' : 'Animal Crossing Villager FAQ'}
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
