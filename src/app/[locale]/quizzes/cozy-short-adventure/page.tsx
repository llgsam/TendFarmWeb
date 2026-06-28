import { CozyShortAdventureQuiz } from '@/components/tools/CozyShortAdventureQuiz'
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
      ? '短篇 Cozy 冒险游戏推荐测验 — Venba、奇异园艺、小鳄鱼游戏还是 Tinykin？'
      : 'Which Short Cozy Adventure Game Should You Play? Venba, Strange Horticulture, Lil Gator Game, or Tinykin?',
    description: isZh
      ? '6 个问题，在四款独特的短篇 Cozy 体验中找到你的游戏——印度移民家庭烹饪叙事、维多利亚草药师谜题、湖边假装冒险，或缩小版的房间探索。'
      : '6 questions to find your short cozy adventure — an Indian family cooking narrative, a Victorian herbalist mystery, a child\'s lakeside pretend-adventure, or a thumb-sized house exploration.',
    keywords: isZh
      ? ['短篇 cozy 游戏推荐', 'Venba 评测值得玩吗', '奇异园艺评测', '小鳄鱼游戏评测', 'Tinykin 评测值得买吗', '5 小时内完结 cozy 游戏', '最佳短篇独立 cozy 游戏']
      : [
          'best short cozy games under 5 hours',
          'best cozy games you can finish in one sitting',
          'venba game review worth it',
          'venba cooking game worth buying',
          'strange horticulture review worth it',
          'strange horticulture game guide',
          'lil gator game review worth it',
          'lil gator game switch review',
          'tinykin review worth buying',
          'tinykin game like pikmin',
          'cozy games with a complete story',
          'cozy games that dont take hundreds of hours',
          'emotional cozy indie games 2022 2023',
          'cozy puzzle games indie',
          'short games worth playing 2023 2024',
          'cozy adventure games no combat required',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-short-adventure`,
      languages: buildLanguageAlternates('/quizzes/cozy-short-adventure'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Venba worth it? What makes it special compared to other short indie games?',
    a: "Venba's distinctiveness comes from its specificity: it is not a generic story about immigration but a very precisely Tamil, very precisely Canadian-immigrant, very precisely 1980s-to-2000s story about a specific family. The food (sambar, kozhukattai, adai, biryani) is not decorative — it is the vehicle through which memory, identity, and love are transmitted. The cooking puzzle mechanic is simple but emotionally loaded: you are reconstructing lost recipes from a damaged cookbook, and the act of figuring out what ingredient is missing mirrors the act of recovering what was lost in migration. At $15 and 90 minutes to 2 hours, it is one of the most efficient emotional experiences in games. Multiple awards and nominations in 2023. Playable on all major platforms including iOS. For players who found What Remains of Edith Finch or Spiritfarer moving, Venba operates at a similar emotional register but in a completely different cultural register — and that specificity is exactly what makes it valuable.",
  },
  {
    q: 'Is Strange Horticulture worth buying? Is it actually scary despite the Victorian mystery setting?',
    a: "Strange Horticulture is not scary — it is atmospheric and sometimes unsettling (there is a mystery involving a cult, some ominous events), but it never becomes horror. The mood is closer to cozy mystery: there is something wrong in the village of Undermere, and your herbalist shop sits at the center of it, but the experience of playing is peaceful and contemplative. You identify plants by cross-referencing your botanical books, consult a map, and decide who gets which remedy. The satisfaction is intellectual and gentle. The visual presentation — candlelight, aged paper, handwritten notes — is beautiful and calming. At $13 on PC and Switch and 4-8 hours of content, it is one of the best value cozy mystery games available. Strongly recommended for players who love the identification mechanic in games like Potion Craft or the reference-book puzzle style in games like Return of the Obra Dinn (but much less complex).",
  },
  {
    q: 'Is Lil Gator Game good for adults or just for kids?',
    a: "Lil Gator Game is one of the best games for adults who want to reconnect with the feeling of childhood play, and many reviews specifically note that it resonates differently with adults than with children. The themes — an older sibling who is too busy to play, making friends in a new neighborhood, the way children turn any environment into an adventure — land differently once you are no longer living them. The gameplay is mechanically simple (designed to be accessible to young children) but the movement feels physically satisfying for players of any age. It is charming, never condescending, and treats the player's desire for pure play as completely valid. At 3-4 hours and $15 on PC and Switch, it is one of the most mood-elevating short games available. Often recommended for players who are burned out, stressed, or simply want something with zero stakes and maximum warmth.",
  },
  {
    q: 'What is Tinykin? Is it really like Pikmin?',
    a: "Tinykin is structurally similar to Pikmin in that you recruit creature helpers (Tinykin) with different abilities and use them to solve puzzles. However, Tinykin is significantly more cozy and less stressful than Pikmin: there is no time limit, no permadeath, no day/night deadline cycle, and no penalty for taking your time. The setting is entirely domestic — you are exploring a single suburban house at thumbnail scale across multiple rooms — which gives it a warm, familiar charm instead of Pikmin's alien wilderness atmosphere. Each 'level' (room) has its own community of tiny people, unique visual style, and independent puzzle logic. The exploration is the main appeal: finding hidden paths through the bookshelf, using soap bubbles to float between heights, and discovering that the bathroom has an entire civilization. At 8-12 hours and about $20, it is a complete and satisfying experience on most major platforms including Switch.",
  },
  {
    q: 'What are the best cozy games you can finish in one sitting or one weekend?',
    a: "The best cozy games completable in one sitting (under 4 hours): Venba (~90 minutes, PC/Switch/PlayStation/Xbox/iOS) — the most emotionally powerful of all; What Remains of Edith Finch (~2-3 hours, PC/Switch/PlayStation/Xbox) — BAFTA-winning walking sim about family deaths; Botany Manor (~3 hours, PC/Xbox/Game Pass) — plant puzzle masterpiece. Games completable in one weekend (under 15 hours): Strange Horticulture (4-8 hours, PC/Switch); Lil Gator Game (3-4 hours, PC/Switch); A Short Hike (1-4 hours, PC/Switch/PlayStation/Xbox/Mobile); Tinykin (8-12 hours, PC/Switch/PlayStation/Xbox); Abzû (90 minutes, PC/Switch/PlayStation/Xbox). The key criterion for 'finishable in a weekend' is not just length but compellingness — Venba and What Remains of Edith Finch are so engaging that players typically do not stop until they are done. Take the Short Cozy Adventure Quiz to find which one matches your specific mood.",
  },
]

const FAQ_ZH = [
  {
    q: 'Venba 值得玩吗？它与其他短篇独立游戏相比有什么特别之处？',
    a: 'Venba 的独特性来自其具体性：它不是一个关于移民的通用故事，而是一个非常精确的泰米尔人、非常精确的加拿大移民、非常精确的 1980 年代至 2000 年代关于特定家庭的故事。食物（桑巴尔、科祖卡泰、阿代、比里亚尼）不是装饰性的——它是传递记忆、身份和爱的媒介。烹饪谜题机制简单但情感分量十足：你在从受损的食谱本重建失传的食谱，弄清楚缺少哪种食材的行为折射了在移民中恢复失去的东西的行为。15 美元、90 分钟到 2 小时，它是游戏中最高效的情感体验之一。2023 年多个奖项和提名。可在包括 iOS 在内的所有主要平台上玩。对于发现艾迪芬奇的记忆或 Spiritfarer 令人感动的玩家，Venba 以相似的情感基调运作，但在完全不同的文化基调中——而这种具体性恰恰是它有价值的原因。',
  },
  {
    q: '奇异园艺值得买吗？尽管设定是维多利亚时代神秘故事，它会吓人吗？',
    a: '奇异园艺不吓人——它有氛围感，有时令人不安（有一个涉及邪教的谜题，一些不吉利的事件），但它从不变成恐怖游戏。气氛更接近 cozy 悬疑：Undermere 村庄里有些不对劲，你的草药师店铺位于其中心，但游戏体验是平和且沉思的。你通过交叉参考你的植物学书籍识别植物，查阅地图，决定谁获得哪种药方。满足感是智识性且温和的。视觉呈现——烛光、陈旧的纸张、手写的笔记——美丽而平静。PC 和 Switch 上 13 美元，4-8 小时的内容，是市面上最具价值的 cozy 悬疑游戏之一。强烈推荐给喜欢 Potion Craft 中识别机制的玩家，或返回 Obra Dinn 中参考书谜题风格的玩家（但复杂度低得多）。',
  },
  {
    q: '小鳄鱼游戏适合成年人还是只适合孩子？',
    a: '小鳄鱼游戏是成年人想要重新连接童年游戏感觉的最佳游戏之一，许多评论特别指出它对成年人的共鸣与对儿童不同。这些主题——一个太忙而无法玩耍的哥哥姐姐、在新邻里结交朋友、孩子们将任何环境变成冒险的方式——一旦你不再经历它们时会有不同的感受。游戏玩法机械上很简单（专为年幼儿童设计的可及性），但移动感对任何年龄的玩家来说都感觉身体上令人满意。它迷人、从不居高临下，并将玩家对纯粹游戏的渴望视为完全合理的。PC 和 Switch 上 3-4 小时、15 美元，是市面上最能提振心情的短游戏之一。经常推荐给精疲力竭、压力大，或只是想要零风险最大温暖的玩家。',
  },
  {
    q: 'Tinykin 是什么游戏？它真的像皮克敏吗？',
    a: 'Tinykin 在结构上与皮克敏相似，你招募拥有不同能力的生物助手（Tinykin）并使用它们解决谜题。然而，Tinykin 比皮克敏明显更 cozy、更少压力：没有时间限制、没有永久死亡、没有日/夜截止时间循环，没有拖延时间的惩罚。设定完全是家庭环境——你在拇指尺寸的状态下探索单栋郊区房屋内的多个房间——这给了它温暖、熟悉的魅力，而不是皮克敏的异星荒野氛围。每个"关卡"（房间）都有自己的微型人类社区、独特视觉风格和独立谜题逻辑。探索是主要吸引力：在书架上找到隐藏路径，使用肥皂泡在高度之间漂浮，发现浴室有一个完整的文明。8-12 小时、约 20 美元，是包括 Switch 在内的大多数主要平台上完整且令人满意的体验。',
  },
  {
    q: '有哪些可以在一次游戏或一个周末内完成的 Cozy 游戏？',
    a: '可以在一次游戏内完成的最佳 cozy 游戏（4 小时以内）：Venba（约 90 分钟，PC/Switch/PlayStation/Xbox/iOS）——所有游戏中最有情感冲击力的；艾迪芬奇的记忆（约 2-3 小时，PC/Switch/PlayStation/Xbox）——BAFTA 获奖步行模拟，关于家庭死亡；植物庄园（约 3 小时，PC/Xbox/Game Pass）——植物谜题杰作。可以在一个周末内完成的游戏（15 小时以内）：奇异园艺（4-8 小时，PC/Switch）；小鳄鱼游戏（3-4 小时，PC/Switch）；短途徒步（1-4 小时，PC/Switch/PlayStation/Xbox/手机）；Tinykin（8-12 小时，PC/Switch/PlayStation/Xbox）；Abzû（90 分钟，PC/Switch/PlayStation/Xbox）。"周末内可完成"的关键标准不仅仅是时长而是吸引力——Venba 和艾迪芬奇的记忆如此引人入胜，玩家通常不停下来直到完成。做「短篇 Cozy 冒险测验」，找到最符合你特定心情的游戏。',
  },
]

export default async function CozyShortAdventurePage({
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
            {isZh ? '测评' : 'Quizzes'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#e8dcc8]">
            {isZh ? '短篇 Cozy 冒险游戏测验' : 'Short Cozy Adventure Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyShortAdventureQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '短游戏不是小游戏。一款 2 小时的游戏可以留下比一款 100 小时游戏更深的印记——前提是它知道自己想说什么。'
            : 'Short games are not small games. A 2-hour experience can leave a deeper mark than a 100-hour one — if it knows exactly what it wants to say.'}
        </p>

        <RelatedQuizzes currentSlug="cozy-short-adventure" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '短篇 Cozy 冒险游戏常见问题' : 'Short Cozy Adventure Games FAQ'}
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
