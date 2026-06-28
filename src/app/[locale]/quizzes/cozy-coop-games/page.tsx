import { CozyCoopQuiz } from '@/components/tools/CozyCoopQuiz'
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
      ? '合作 Cozy 游戏推荐测验 — It Takes Two、胡闹厨房 2、PlateUp! 还是搬家模拟器？'
      : 'Which Co-op Cozy Game Should You Play? It Takes Two, Overcooked 2, PlateUp!, or Moving Out?',
    description: isZh
      ? '6 个问题，为你们的组合找到最适合的合作 cozy 游戏。覆盖 It Takes Two、胡闹厨房 2、PlateUp! 和搬家模拟器——四款适合 2-4 人一起玩的完全不同游戏体验。'
      : '6 questions to find the perfect co-op game for your group — It Takes Two for couples who want a story, Overcooked! 2 for chaotic fun, PlateUp! for strategic builders, or Moving Out for pure comedy.',
    keywords: isZh
      ? ['合作 cozy 游戏推荐', 'It Takes Two 值得买吗', '胡闹厨房 2 值得买吗', 'PlateUp 合作模式', '搬家模拟器好玩吗', '情侣一起玩的 cozy 游戏', '2-4 人合作 cozy 游戏', '适合情侣的 Switch 游戏']
      : [
          'best co-op cozy games',
          'cozy games to play with partner',
          'cozy games for couples',
          'is it takes two worth it',
          'overcooked 2 worth buying',
          'plateup review worth it',
          'moving out game review',
          'best multiplayer cozy games 2025',
          'cozy games to play with friends',
          'co-op games for couples switch',
          'it takes two friend pass',
          'overcooked 2 vs plateup',
          'best 2 player cozy games',
          'cozy games to play online with friends',
          'best co-op games for couples',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-coop-games`,
      languages: buildLanguageAlternates('/quizzes/cozy-coop-games'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is It Takes Two worth buying? Can you play it with one copy?',
    a: "Yes — It Takes Two is worth buying without question. It won Game of the Year at the Game Awards, DICE Awards, BAFTA, and almost every other major ceremony in 2021. At around 10-12 hours, it is the perfect length for a couple to play through across several evenings. The game REQUIRES two players — you cannot play it solo. One player buys the full game; the second player downloads a free 'Friend's Pass' version and can play the entire game at no cost. This makes it excellent value: one purchase for two people to experience everything. Available on PC (EA App/Steam), PlayStation 4/5, Xbox, and Nintendo Switch. If you are buying for Switch specifically, note that local wireless play requires two cartridges — the friend pass is online or same-console play.",
  },
  {
    q: 'What is the difference between Overcooked 2 and PlateUp?',
    a: "Overcooked! 2 and PlateUp! are both co-op cooking games but feel quite different in practice. Overcooked 2 uses pre-designed levels with fixed kitchen layouts — you play what is given to you. PlateUp! has you design and build your own restaurant kitchen before each service. Overcooked 2 is more accessible, faster-paced, and better for short 30-45 minute sessions or groups who just want immediate fun. PlateUp! has a deeper strategy layer, more progression between sessions, and rewards players who enjoy optimization and planning. Overcooked 2 is better for casual groups; PlateUp! is better for players who enjoyed Overcooked but want more depth and control. Both support 1-4 players.",
  },
  {
    q: 'Is Moving Out a good game for couples or groups who are not good at video games?',
    a: "Yes — Moving Out is one of the best co-op games for non-gamers or mixed-skill groups. It has an accessibility options menu that lets you extend time limits, make items lighter, or reduce the difficulty in multiple ways. More importantly, the game's physics are deliberately absurd — nothing about it requires technical skill. The fun comes from watching furniture behave unexpectedly, not from executing precise inputs. A 70-year-old who has never touched a controller and a competitive gamer can play Moving Out together and have an equally funny time. It is probably the most accessible co-op comedy game ever made. Available on PC, Switch, PlayStation 4, and Xbox — often included in Game Pass.",
  },
  {
    q: 'What is the best co-op cozy game for couples to play on Nintendo Switch?',
    a: "The best co-op games for couples on Nintendo Switch are: It Takes Two (online co-op — one person needs the full game, partner downloads the free Friend Pass; around 10-12 hours of story content); Overcooked! All You Can Eat (the definitive Overcooked collection, supports local and online co-op for 2-4 players); Moving Out (excellent in local co-op on the same Switch screen, also available online); and Stardew Valley (peaceful farming together, supports 1-4 players online and 2 players in local co-op with two Switches). For pure romantic couple content, It Takes Two is the consensus recommendation — it was specifically designed for two people and tells a story about a relationship.",
  },
  {
    q: 'Can you play Overcooked 2 or PlateUp online with friends remotely?',
    a: "Yes — both games fully support online multiplayer. Overcooked! 2 supports 2-4 players online across all platforms. PlateUp! supports 1-4 players online on PC (Steam), PlayStation, and Xbox. For Overcooked specifically: on PC, you can use Steam Remote Play Together so only one person needs to own the game, and others can join for free through Remote Play. PlateUp! on Steam also supports Remote Play Together. If you are playing with friends on different platforms, note that cross-platform multiplayer is not available in either game — everyone needs to be on the same platform (all on PlayStation, all on PC, etc.).",
  },
]

const FAQ_ZH = [
  {
    q: 'It Takes Two（双人成行）值得购买吗？一份可以两人玩吗？',
    a: '是的——双人成行毫无疑问值得购买。它在 2021 年的游戏大奖、DICE 奖、英国影视艺术学院奖以及几乎所有其他主要颁奖典礼上获得年度最佳游戏。约 10-12 小时的长度是情侣在几个晚上玩完的完美时长。游戏需要两名玩家——你无法单独游玩。一名玩家购买完整游戏；第二名玩家下载免费的"朋友通行证"版本，可以免费体验整个游戏。这使其非常划算：一次购买，两人体验所有内容。可在 PC（EA App/Steam）、PlayStation 4/5、Xbox 和 Nintendo Switch 上获取。',
  },
  {
    q: '胡闹厨房 2 和 PlateUp! 有什么区别？',
    a: '胡闹厨房 2 和 PlateUp! 都是合作烹饪游戏，但实际感受差异相当大。胡闹厨房 2 使用固定厨房布局的预设计关卡——你玩给定的内容。PlateUp! 让你在每次服务之前设计和建造自己的餐厅厨房。胡闹厨房 2 更易上手、节奏更快，更适合 30-45 分钟的短时段或只想立即享乐的团队。PlateUp! 有更深的策略层次、更多轮次间的进度，奖励喜欢优化和规划的玩家。胡闹厨房 2 更适合休闲团队；PlateUp! 更适合喜欢胡闹厨房但想要更多深度和控制的玩家。两款都支持 1-4 人。',
  },
  {
    q: '搬家模拟器（Moving Out）适合不擅长电子游戏的情侣或团队吗？',
    a: '是的——搬家模拟器是最适合非玩家或混合技能团队的合作游戏之一。它有无障碍选项菜单，让你以多种方式延长时间限制、让物品更轻或降低难度。更重要的是，游戏的物理效果故意设计得很荒诞——没有任何内容需要技术技能。乐趣来自看家具出人意料地行动，而不是执行精确操作。一个从未碰过手柄的 70 岁老人和一个竞技型玩家可以一起玩搬家模拟器，并获得同样有趣的体验。这可能是有史以来最易上手的合作喜剧游戏。可在 PC、Switch、PlayStation 4 和 Xbox 上获取——通常包含在 Game Pass 中。',
  },
  {
    q: 'Nintendo Switch 上情侣一起玩最好的合作 cozy 游戏是什么？',
    a: 'Switch 上情侣最好的合作游戏是：双人成行（在线合作——一人需要完整游戏，伴侣下载免费好友通行证；约 10-12 小时故事内容）；胡闹厨房：全你所能吃（最终版胡闹厨房合集，支持 2-4 人本地和在线合作）；搬家模拟器（在同一个 Switch 屏幕上本地合作效果极好，也可在线）；以及星露谷物语（一起平和耕种，支持在线 1-4 人和两台 Switch 本地 2 人合作）。纯粹的浪漫情侣内容，双人成行是普遍推荐——它专门为两人设计，讲述一个关于一段关系的故事。',
  },
  {
    q: '可以在线和朋友远程玩胡闹厨房 2 或 PlateUp! 吗？',
    a: '可以——两款游戏都完全支持在线多人游戏。胡闹厨房 2 支持所有平台上的 2-4 人在线游戏。PlateUp! 在 PC（Steam）、PlayStation 和 Xbox 上支持 1-4 人在线。对于胡闹厨房具体而言：在 PC 上，你可以使用 Steam 远程同玩功能，这样只有一个人需要拥有游戏，其他人可以通过远程游戏免费加入。PlateUp! 在 Steam 上也支持远程同玩。如果你在不同平台上与朋友游玩，请注意两款游戏都不支持跨平台多人游戏——每个人需要在同一平台上（全在 PlayStation 上，全在 PC 上，等等）。',
  },
]

export default async function CozyCoopGamesPage({
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
            {isZh ? '合作 Cozy 游戏测验' : 'Co-op Cozy Games Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyCoopQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '最好的合作游戏不是让你们配合完美——而是让失败和混乱本身也成为乐趣。'
            : 'The best co-op games are not the ones where you play perfectly — they are the ones where failure is also fun.'}
        </p>

        <RelatedQuizzes currentSlug="cozy-coop-games" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '合作 Cozy 游戏常见问题' : 'Co-op Cozy Games FAQ'}
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
