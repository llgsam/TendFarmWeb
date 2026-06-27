import { CozyExplorationQuiz } from '@/components/tools/CozyExplorationQuiz'
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
      ? '氛围探索游戏测验 — 看火人、艾迪芬奇的记忆、短途徒步还是 Abzû？'
      : 'Which Atmospheric Exploration Game Should You Play? Firewatch, What Remains of Edith Finch, A Short Hike, or Abzû?',
    description: isZh
      ? '6 个问题，找到最适合你的氛围探索短篇游戏。覆盖看火人、艾迪芬奇的记忆、短途徒步和 Abzû——四款以独特氛围和体验为核心的游戏。'
      : '6 questions to find your atmospheric short game — Wyoming wilderness mystery, a family house of lives cut short, a cozy mountain hike, or a wordless underwater journey.',
    keywords: isZh
      ? ['氛围探索游戏推荐', '看火人值得玩吗', '艾迪芬奇的记忆评测', '短途徒步游戏评测', 'Abzû 值得玩吗', '步行模拟游戏推荐', '短篇叙事游戏推荐', '独立游戏氛围探索']
      : [
          'firewatch worth it',
          'what remains of edith finch worth it',
          'a short hike review worth buying',
          'abzu worth playing',
          'best walking simulator games',
          'best short atmospheric games',
          'games like journey',
          'cozy exploration games pc',
          'short games worth playing 2025',
          'firewatch how long',
          'what remains of edith finch how long',
          'a short hike how long',
          'best indie games under 5 hours',
          'atmospheric games for relaxation',
          'best narrative walking sims',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-exploration-games`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes/cozy-exploration-games`,
        [other]: `${BASE_URL}/${other}/quizzes/cozy-exploration-games`,
      },
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Firewatch worth playing in 2025? How long is it?',
    a: "Yes — Firewatch is absolutely worth playing in 2025. It holds up exceptionally well. The game is 4-6 hours long for most players. Its greatest strengths — the voice acting (Rich Sommer and Cissy Jones give career-best performances), the relationship you build with Delilah through dialogue choices, the painterly visual style by artist Olly Moss, and the ambient wilderness sound design — have not aged at all. The story's ending is divisive: some players find it deeply affecting, others feel it underpromises. But the journey to reach that ending is one of the most atmospheric and emotionally engaging 5 hours in any game. Available on PC (Steam), Nintendo Switch, PlayStation 4/5, and Xbox. Regularly goes on sale for under $5.",
  },
  {
    q: 'Is What Remains of Edith Finch worth buying? Is it sad?',
    a: "What Remains of Edith Finch is one of the most acclaimed short games ever made — it won the BAFTA for Best Game and the GDC award for Excellence in Narrative. Yes, it is emotionally heavy in places — it is a game about death, family trauma, and the stories we tell about the people we lose. It is 2-3 hours long. Each chapter tells the story of a different family member's death in a completely unique gameplay format, which means no two chapters feel the same. It is not a sad game in a hopeless way; it is melancholy in the way that beautiful things about difficult truths can be. Available on PC (Steam), PlayStation 4/5, Nintendo Switch, and Xbox (Game Pass — free for subscribers).",
  },
  {
    q: 'What is A Short Hike? Is it really as cozy as people say?',
    a: "A Short Hike is a small, lo-fi mountain exploration game created by Adam Robinson-Yu. You play as Claire, a young bird spending summer at a park, and your only goal is to reach the mountain summit (to get cell reception for a call you are waiting for). Along the way you can fish, run on the beach, help other hikers, find hidden items, collect golden feathers that let you climb and glide, and simply enjoy the mountain. It is widely considered one of the coziest games ever made — no combat, no fail states, no enemies, no time pressure. Just a mountain and the afternoon. The game is $8 and takes 1-4 hours depending on how much you explore. Yes, it really is that cozy.",
  },
  {
    q: 'What is Abzû? Is it just an underwater Journey?',
    a: "Abzû is often compared to Journey because it was created by Matt Nava, who was the art director of Journey. Both are wordless, short, emotionally resonant experiences with soundtracks by Austin Wintory. But Abzû is its own game. Where Journey is about movement through a desert landscape and connection with another player, Abzû is about exploration of a living underwater ecosystem. You swim through vibrant, biodiverse coral reefs that contain hundreds of species of fish behaving naturally. You find meditation stones where you can sit and simply watch the ocean around you. It is about 90 minutes long and has a complete narrative arc told entirely without words. It is available on Xbox Game Pass (free for subscribers), PC (Steam), PlayStation 4/5, and Nintendo Switch.",
  },
  {
    q: 'What are the best short games worth playing in one sitting?',
    a: "The best games you can complete in one sitting (under 4 hours) are: A Short Hike (1-4h, PC/Switch/PlayStation/Xbox, $8) — cozy mountain climbing; Abzû (90 min, PC/Switch/PlayStation/Xbox Game Pass) — wordless underwater journey; What Remains of Edith Finch (2-3h, PC/Switch/PlayStation/Xbox Game Pass) — family narrative walking sim; Firewatch (4-6h, PC/Switch/PlayStation/Xbox) — wilderness mystery with dialogue; and Journey (2h, PC/PlayStation/iOS) — the original atmospheric wordless masterpiece. All five are complete, fully satisfying experiences that do not require multiple sessions. For something with cats: Little Kitty, Big City (4-6h). For something funny: Untitled Goose Game (2-3h). Take the Atmospheric Exploration Game Quiz above to find which one fits your mood right now.",
  },
]

const FAQ_ZH = [
  {
    q: '看火人 2025 年还值得玩吗？游戏时长多久？',
    a: '是的——看火人在 2025 年绝对值得玩。它保持得非常好。大多数玩家的游戏时长为 4-6 小时。它最大的优势——配音（Rich Sommer 和 Cissy Jones 给出了职业生涯最佳表演）、通过对话选择与 Delilah 建立的关系、艺术家 Olly Moss 的绘画视觉风格，以及环境荒野音效设计——完全没有过时。故事的结局有争议：一些玩家觉得它深深打动人心，其他人觉得它没有兑现承诺。但到达那个结局的旅途是任何游戏中氛围最浓、情感最投入的 5 小时之一。可在 PC（Steam）、Nintendo Switch、PlayStation 4/5 和 Xbox 上获取。经常打折到 5 美元以下。',
  },
  {
    q: '艾迪芬奇的记忆值得购买吗？它很悲伤吗？',
    a: '艾迪芬奇的记忆是有史以来最受好评的短篇游戏之一——它获得了英国影视艺术学院最佳游戏奖和游戏开发者大会叙事卓越奖。是的，它在某些地方情感上很沉重——这是一款关于死亡、家庭创伤和我们为失去的人讲述的故事的游戏。游戏时长 2-3 小时。每章以完全独特的游戏形式讲述不同家族成员的死亡故事，这意味着没有两章感觉相同。它不是一款令人绝望的悲伤游戏；它以关于困难真相的美丽事物所特有的那种方式令人忧郁。可在 PC（Steam）、PlayStation 4/5、Nintendo Switch 和 Xbox（Game Pass——订阅者免费）上获取。',
  },
  {
    q: '短途徒步是什么游戏？它真的像人们说的那么温馨吗？',
    a: '短途徒步是由 Adam Robinson-Yu 创作的一款小型低保真山地探索游戏。你扮演 Claire，一只在公园度过夏天的年轻鸟，你唯一的目标是到达山顶（为了获得你正在等待的电话的手机信号）。沿途你可以钓鱼、在海滩上跑步、帮助其他徒步者、找到隐藏物品、收集允许你攀登和滑翔的金色羽毛，以及单纯享受这座山。它被广泛认为是有史以来最温馨的游戏之一——没有战斗、没有失败状态、没有敌人、没有时间压力。只有一座山和一个午后。游戏售价 8 美元，根据你探索多少需要 1-4 小时。是的，它真的那么温馨。',
  },
  {
    q: 'Abzû 是什么游戏？它只是水下版的 Journey 吗？',
    a: 'Abzû 经常被拿来与 Journey 比较，因为它是由 Journey 的艺术总监 Matt Nava 创作的。两款游戏都是无语言、短篇、情感共鸣的体验，有 Austin Wintory 的原声。但 Abzû 是它自己的游戏。Journey 关于在沙漠景观中移动以及与另一名玩家的联系，而 Abzû 关于探索活生生的水下生态系统。你穿越充满活力、生物多样的珊瑚礁，里面有数百种自然行动的鱼类。你找到冥想石，可以坐下来单纯观察周围的海洋。游戏约 90 分钟，有一个完整的叙事弧线，完全不通过语言讲述。可在 Xbox Game Pass（订阅者免费）、PC（Steam）、PlayStation 4/5 和 Nintendo Switch 上获取。',
  },
  {
    q: '有哪些值得一次性坐下来玩完的优秀短篇游戏推荐？',
    a: '最适合一次性玩完（4 小时以内）的游戏是：短途徒步（1-4 小时，PC/Switch/PlayStation/Xbox，8 美元）——温馨山地攀登；Abzû（90 分钟，PC/Switch/PlayStation/Xbox Game Pass）——无语言水下旅程；艾迪芬奇的记忆（2-3 小时，PC/Switch/PlayStation/Xbox Game Pass）——家庭叙事步行模拟；看火人（4-6 小时，PC/Switch/PlayStation/Xbox）——有对话的荒野悬疑；以及 Journey（2 小时，PC/PlayStation/iOS）——原版氛围无语言杰作。所有五款都是完整、完全令人满足的体验，不需要多次游戏时段。有猫的话：小猫咪大城市（4-6 小时）。想要有趣的话：无标题鹅作游戏（2-3 小时）。做上面的「氛围探索游戏测验」，找出哪款最符合你现在的心情。',
  },
]

export default async function CozyExplorationGamesPage({
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
            {isZh ? '氛围探索游戏测验' : 'Atmospheric Exploration Games Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyExplorationQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '最好的短篇游戏不是因为短而妥协——它们是因为完整而完美。'
            : 'The best short games are not compromised by their length — they are perfect because of it.'}
        </p>

        <RelatedQuizzes currentSlug="cozy-exploration-games" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '氛围探索游戏常见问题' : 'Atmospheric Exploration Games FAQ'}
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
