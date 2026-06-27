import { CozyMoodQuiz } from '@/components/tools/CozyMoodQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'
import Link from 'next/link'

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
      ? '根据心情选 Cozy 游戏测验 — 星露谷 / 动物之森 / PowerWash / Spiritfarer'
      : 'What Cozy Game Should I Play Tonight? Mood Quiz — Stardew Valley, Animal Crossing, PowerWash Simulator, Spiritfarer',
    description: isZh
      ? '6 个问题，根据你现在的心情找到今晚最合适的 cozy 游戏。效率感→星露谷，平静→动物之森，关脑子→PowerWash，有情绪→Spiritfarer。'
      : '6 questions to find the right cozy game for your exact mood — productive (Stardew Valley), peaceful (Animal Crossing), need to switch off (PowerWash Simulator), or emotional (Spiritfarer).',
    keywords: isZh
      ? ['根据心情选游戏', '今天玩什么游戏', '减压游戏推荐', '焦虑时玩什么游戏', 'PowerWash Simulator 推荐', 'Spiritfarer 推荐', '放松游戏推荐', '心情不好玩什么游戏']
      : [
          'what cozy game should i play tonight',
          'what cozy game should i play quiz',
          'cozy games when stressed',
          'cozy games for anxiety',
          'relaxing games for when you are overwhelmed',
          'is powerwash simulator worth it',
          'is powerwash simulator relaxing',
          'cozy games to destress',
          'what game to play when you need to switch off',
          'cozy games for depression',
          'best games for anxiety 2025',
          'powerwash simulator review',
          'spiritfarer worth playing',
          'what to play when you need to relax',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-game-mood`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes/cozy-game-mood`,
        [other]: `${BASE_URL}/${other}/quizzes/cozy-game-mood`,
      },
    },
  }
}

const FAQ_EN = [
  {
    q: 'What cozy game should I play when I am stressed or anxious?',
    a: "The best cozy games for stress and anxiety are PowerWash Simulator and Animal Crossing: New Horizons. PowerWash Simulator works because it replaces anxious thoughts with pure sensory feedback — you aim a pressure washer at dirty surfaces and they become clean, with no fail states, no time pressure, and deeply satisfying visual progress. It is widely recommended by therapists and mental health communities as one of the most effective games for anxiety. Animal Crossing: New Horizons works for a different reason: its zero-pressure design, gentle real-world clock, and quiet island atmosphere create a genuine sense of safety. For more structured engagement without overwhelm, Stardew Valley's daily rhythm can be grounding. Take the mood quiz above to find the right match for your specific stress type.",
  },
  {
    q: 'Is PowerWash Simulator worth buying?',
    a: "Yes — PowerWash Simulator is one of the most genuinely relaxing games ever made, and it's considered excellent value. It's available on Xbox Game Pass (essentially included with a subscription at no extra cost), PC (Steam), PlayStation 4/5, and Nintendo Switch. The base game has many hours of content across multiple environments and vehicles to clean, and DLC packs add themed locations (including a Tomb Raider pack and a SpongeBob SquarePants pack). The core loop — point pressure washer at dirty surface, watch it become clean — sounds simple but triggers a deeply satisfying flow state. It is especially good for people with anxiety, ADHD, or burnout who need something genuinely low-stakes.",
  },
  {
    q: 'What are the most relaxing cozy games to play after work?',
    a: "The most relaxing cozy games to decompress after work in 2025 are: PowerWash Simulator (best for completely switching off — zero thinking required); Animal Crossing: New Horizons (best for peaceful creative sessions with no stress); Stardew Valley (best for productive winding-down — tasks feel satisfying but not demanding); and Spiritfarer (best for when you want emotional engagement rather than disengagement). The right choice depends on what kind of tired you are — if you're mentally exhausted and just want to exist, pick PowerWash or Animal Crossing. If you still have some energy and want to feel productive, pick Stardew Valley.",
  },
  {
    q: 'Is Spiritfarer worth playing? Will it make me cry?',
    a: "Spiritfarer is absolutely worth playing and yes, it will likely make you cry. It is widely considered one of the best cozy games ever made and one of the most emotionally powerful games in any genre. You play as Stella, a ferrylady who cares for spirits — each inspired by real people in the developer's life — and helps them find peace before they pass on. The crying is not sad in a hollow way; it is cathartic and warm, like crying at a film you love deeply. The game also has excellent farming, cooking, platforming, and crafting systems that keep it engaging between emotional moments. Available on Xbox Game Pass, PlayStation 4/5, Nintendo Switch, and PC. Often on sale for under $10.",
  },
  {
    q: 'What cozy games are good for mental health?',
    a: "The best cozy games for mental health vary by what you need: for anxiety and overwhelm, PowerWash Simulator and Animal Crossing: New Horizons are most recommended by mental health professionals for their zero-pressure design. For depression or emotional numbness, Spiritfarer is the most cited game for helping players reconnect with feeling and grief in a safe space. For ADHD, Stardew Valley's structured daily loop and satisfying task completion triggers dopamine in a sustainable way. For general burnout, any cozy game without a timer or fail state helps — but Animal Crossing: New Horizons and Palia (free) are the most commonly recommended starting points because they literally cannot be played wrong.",
  },
]

const FAQ_ZH = [
  {
    q: '压力大或焦虑时应该玩什么 cozy 游戏？',
    a: '最适合压力和焦虑时玩的 cozy 游戏是 PowerWash Simulator 和动物之森：新视野。PowerWash Simulator 有效是因为它用纯粹的感官反馈取代了焦虑的想法——你把高压水枪对准脏表面，它们变得干净，没有失败状态、没有时间压力，视觉进度令人非常满足。它被治疗师和心理健康社区广泛推荐为最有效的焦虑游戏之一。动物之森：新视野出于不同原因有效：其零压力设计、温和的实时时钟和安静的岛屿氛围创造了真正的安全感。对于更有结构但不压倒人的体验，星露谷物语的日常节律可以起到稳定作用。做上面的心情测验，找到适合你特定压力类型的游戏。',
  },
  {
    q: 'PowerWash Simulator 值得买吗？',
    a: '是的——PowerWash Simulator 是有史以来最真正放松的游戏之一，被认为性价比极高。它可以在 Xbox Game Pass（本质上包含在订阅中，无需额外费用）、PC（Steam）、PlayStation 4/5 和 Nintendo Switch 上获取。基础游戏有许多小时的内容，跨越多个环境和载具，DLC 包添加了主题场景（包括古墓丽影包和海绵宝宝包）。核心循环——把高压水枪对准脏表面，看它变干净——听起来简单，但触发了一种深度令人满足的心流状态。对于有焦虑、多动症或倦怠，需要真正低风险游戏的人来说特别好。',
  },
  {
    q: '下班后最放松的 cozy 游戏有哪些？',
    a: '2025 年下班后减压最放松的 cozy 游戏是：PowerWash Simulator（最适合完全关闭大脑——零思考要求）；动物之森：新视野（最适合没有压力的平静创意时段）；星露谷物语（最适合有成就感的放松——任务感觉令人满足但不费力）；以及 Spiritfarer（最适合想要情感投入而非情感分离时）。正确的选择取决于你是哪种累——如果你精神疲惫只想存在，选 PowerWash 或动物之森。如果你还有一些精力并想感到有生产力，选星露谷物语。',
  },
  {
    q: 'Spiritfarer 值得玩吗？它会让我哭吗？',
    a: 'Spiritfarer 绝对值得玩，是的，它可能会让你哭。它被广泛认为是有史以来最好的 cozy 游戏之一，也是任何类型中情感最强大的游戏之一。你扮演 Stella，一位照顾灵魂的摆渡人——每位灵魂都受开发者生活中真实人物的启发——并帮助他们在离去前找到平静。哭泣不是那种令人空洞的悲伤方式；它是宣泄性的、温暖的，就像为你深爱的电影而哭。游戏还有出色的农业、烹饪、平台跳跃和制作系统，在情感时刻之间保持了吸引力。可在 Xbox Game Pass、PlayStation 4/5、Nintendo Switch 和 PC 上获取。经常促销到 20 元以下。',
  },
  {
    q: '哪些 cozy 游戏对心理健康有益？',
    a: '最好的心理健康 cozy 游戏因你的需求而异：对于焦虑和不堪重负，PowerWash Simulator 和动物之森：新视野因其零压力设计而被心理健康专业人士最多推荐。对于抑郁或情感麻木，Spiritfarer 是最常被引用的游戏，帮助玩家在安全空间中重新连接感受和悲伤。对于多动症，星露谷物语的结构化日常循环和令人满足的任务完成以可持续的方式触发多巴胺。对于一般倦怠，任何没有计时器或失败状态的 cozy 游戏都有帮助——但动物之森：新视野和 Palia（免费）是最常推荐的起点，因为它们字面意义上不可能玩错。',
  },
]

export default async function CozyMoodPage({
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
      <div className="mx-auto max-w-2xl px-4 py-12">
        <nav className="mb-6 text-sm text-[#8a9a7a]">
          <Link href={`/${locale}/quizzes`} className="hover:text-[#e8dcc8]">
            {isZh ? '测评' : 'Quizzes'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#e8dcc8]">
            {isZh ? '根据心情选 Cozy 游戏' : 'Cozy Game Mood Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyMoodQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '最好的 cozy 游戏不是评分最高的那款，而是在你需要它的那个夜晚出现的那款。'
            : "The best cozy game is not the highest-rated one — it's the one that shows up on the right night."}
        </p>

        <RelatedQuizzes currentSlug="cozy-game-mood" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '心情与 Cozy 游戏常见问题' : 'Cozy Game Mood FAQ'}
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
