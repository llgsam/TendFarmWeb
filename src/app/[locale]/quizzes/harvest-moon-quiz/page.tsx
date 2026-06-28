import { HarvestMoonQuiz } from '@/components/tools/HarvestMoonQuiz'
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
      ? '哪款牧场物语 / 符文工房最适合你？— 推荐测验'
      : 'Which Story of Seasons Game Should You Play? — Harvest Moon Quiz',
    description: isZh
      ? '6 个问题，从矿石镇的伙伴们、美好的一生、橄榄镇与希望的大地、符文工房 4 中找到最适合你风格的一款牧场物语系列游戏。'
      : '6 questions to find your perfect Story of Seasons / Harvest Moon game — Friends of Mineral Town, A Wonderful Life, Pioneers of Olive Town, or Rune Factory 4 Special.',
    keywords: isZh
      ? ['牧场物语哪款好', '星露之月测试', '符文工房 4 推荐', '牧场物语新手入门', '矿石镇伙伴们推荐', '美好的一生怎么样', '牧场物语测验']
      : [
          'which story of seasons game should i play',
          'harvest moon quiz',
          'story of seasons beginners guide',
          'harvest moon vs story of seasons',
          'friends of mineral town or a wonderful life',
          'rune factory 4 vs stardew valley',
          'best story of seasons game',
          'story of seasons game recommendation',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/harvest-moon-quiz`,
      languages: buildLanguageAlternates('/quizzes/harvest-moon-quiz'),
    },
  }
}

const FAQ_EN = [
  {
    q: "What is the difference between Harvest Moon and Story of Seasons?",
    a: "They are the same franchise, just with different names in different eras. The series was originally called Harvest Moon in English (localized from the Japanese \"Bokujou Monogatari\" — meaning Farm Story). In 2014, the original developer Marvelous lost the rights to the Harvest Moon name in North America. Since then, Marvelous' games have been released as Story of Seasons in English, while the name Harvest Moon was purchased by Natsume and used for unrelated, lower-quality games. Modern games in the original franchise are always Story of Seasons. Look for \"Marvelous\" or \"XSEED\" as the publisher to identify the authentic games.",
  },
  {
    q: "Which Story of Seasons game should I play first?",
    a: "Story of Seasons: Friends of Mineral Town (2020) is the most recommended starting point. It is a modernized remake of the beloved 2003 Game Boy Advance game, compact and accessible, with the classic charm that defined the franchise. It is available on Nintendo Switch, PC (Steam), and mobile. If you prefer a more emotional, story-focused experience and don't mind starting with something that takes longer to show its depth, Story of Seasons: A Wonderful Life (2023) is also excellent for newcomers.",
  },
  {
    q: "Is Story of Seasons: A Wonderful Life worth buying in 2023/2024?",
    a: "Yes — A Wonderful Life is worth it if you want a farming game that tells a meaningful story. The 2023 remake significantly improved the original (which was praised for its emotional depth but criticized for slow pacing and limited gameplay). The remake adds new marriage candidates including male romance options, a larger cast, new story content, and modern quality-of-life improvements. It is the only farming game that genuinely makes you feel the passage of time as your character ages — a completely unique experience in the genre.",
  },
  {
    q: "Is Rune Factory 4 better than Stardew Valley?",
    a: "They serve different needs, so it depends on what you want. Rune Factory 4 is better for: action-RPG combat and dungeon crawling, deeper romance storylines with extensive character dialogue, a stronger main story with two major narrative arcs, and a fantasy world with magic and monsters. Stardew Valley is better for: pure farming depth and complexity, emotional simplicity and relaxation, offline solo play with more systems control, and replay value through its farm layout choices. Many players love both. If you want farming + adventure, Rune Factory 4 is unmatched. If you want pure cozy farming, Stardew Valley is the gold standard.",
  },
  {
    q: "Where can I play Story of Seasons games?",
    a: "The main Story of Seasons games are available on: Nintendo Switch (Friends of Mineral Town, A Wonderful Life, Pioneers of Olive Town — all three), PC via Steam (Friends of Mineral Town, A Wonderful Life, Pioneers of Olive Town), PlayStation 4/5 (A Wonderful Life), Xbox (A Wonderful Life), and mobile via Netflix Games (Friends of Mineral Town). Rune Factory 4 Special is available on Nintendo Switch and PC (Steam). All of these are legitimate games by Marvelous/XSEED — not the Natsume-published Harvest Moon games, which are separate and unrelated to the original franchise.",
  },
]

const FAQ_ZH = [
  {
    q: "星露之月和牧场物语有什么区别？",
    a: "它们是同一个系列，只是不同时期在英语市场使用了不同名称。这个系列日文名是「牧场物语」，英文版最初叫 Harvest Moon（星露之月）。2014 年，原开发商 Marvelous 在北美失去了 Harvest Moon 商标权，此后 Marvelous 的游戏在英文版改名为 Story of Seasons（牧场物语），而 Harvest Moon 这个名称则被 Natsume 公司买走，用于与原版毫无关联的独立游戏（普遍口碑较差）。因此，凡是由 Marvelous 或 XSEED 发行的 Story of Seasons 才是正统牧场物语系列，中文版统一称为「牧场物语」。",
  },
  {
    q: "新手应该从哪款牧场物语入手？",
    a: "最推荐从《牧场物语：矿石镇的伙伴们》（2020 年重制版）开始。它是 2003 年 GBA 经典之作的现代化重制，既保留了系列标志性的温馨魅力，又加入了现代品质改进，内容紧凑、上手友好。Switch、PC（Steam）和手机均可游玩。如果你更想要一款有独特叙事深度的游戏，《牧场物语：美好的一生》（2023 年重制版）也是绝佳的入门选择，不过它需要多一点耐心才能感受到精华。",
  },
  {
    q: "《牧场物语：美好的一生》2023 年重制版值得买吗？",
    a: "值得——尤其如果你想要一款有真实叙事感的农场游戏。2023 年重制版大幅改进了原版（原版以情感深度著称，但节奏偏慢、玩法内容有限）。重制版新增了多位婚姻对象（包括男性恋爱路线）、更多角色、新故事内容，以及现代化品质改进。这是唯一一款能让你真切感受到角色随时间老去的农场游戏——在整个类型中是独一无二的体验。",
  },
  {
    q: "符文工房 4 比星露谷物语更好玩吗？",
    a: "两款游戏各有侧重，取决于你想要什么。符文工房 4 的优势：动作 RPG 战斗和地下城探索、更深入的恋爱故事线和角色对话量、两段主线剧情的完整叙事，以及充满魔法与怪物的奇幻世界。星露谷的优势：更纯粹的农场系统深度、情感上的简洁与放松感、离线单人游玩的完整掌控感、通过不同农场布局获得的重玩价值。很多玩家两款都喜欢。想要农场+冒险的组合，符文工房 4 无可替代；只想纯粹治愈农场的话，星露谷是黄金标准。",
  },
  {
    q: "牧场物语游戏在哪里可以玩？",
    a: "主要的牧场物语游戏平台：Nintendo Switch（矿石镇的伙伴们、美好的一生、橄榄镇与希望的大地，三款均有）；PC Steam 版（同样三款均有）；PlayStation 4/5（美好的一生）；Xbox（美好的一生）；手机 Netflix Games（矿石镇的伙伴们）。符文工房 4 豪华版在 Nintendo Switch 和 PC（Steam）均可游玩。以上均为 Marvelous/XSEED 发行的正统作品，注意区别于 Natsume 发行的 Harvest Moon 系列（与原版无关）。",
  },
]

export default async function HarvestMoonQuizPage({
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
            {isZh ? '牧场物语 / 符文工房推荐测验' : 'Story of Seasons Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <HarvestMoonQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '牧场物语的每一款都有独特的灵魂——没有错的选择，只有最适合你的那一款。'
            : "Every Story of Seasons game has its own soul — there's no wrong choice, only the right one for you right now."}
        </p>

        <RelatedQuizzes currentSlug="harvest-moon-quiz" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于牧场物语系列的常见问题' : 'Story of Seasons FAQ'}
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
