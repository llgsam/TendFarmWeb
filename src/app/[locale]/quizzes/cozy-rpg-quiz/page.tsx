import { Metadata } from 'next'
import { CozyRpgQuiz } from '@/components/tools/CozyRpgQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-rpg-quiz`

  return {
    title: isZh
      ? '哪款独立 RPG 最适合 Cozy 游戏玩家？ | FarmGame Hub'
      : 'Which Indie RPG Is Perfect for a Cozy Gamer? Moonlighter, Cassette Beasts, A Hat in Time, CrossCode | FarmGame Hub',
    description: isZh
      ? '测验：Moonlighter、Cassette Beasts、时光帽、CrossCode——哪款独立 RPG 最适合喜爱 Cozy 游戏的你？6 个问题找到你的完美进阶游戏。'
      : 'Quiz: Moonlighter, Cassette Beasts, A Hat in Time, or CrossCode — which indie RPG is perfect for a cozy gamer? Answer 6 questions to find your ideal next game.',
    keywords: isZh
      ? ['moonlighter 值得买吗', 'cassette beasts 评测', '时光帽 a hat in time', 'crosscode 值得玩吗', 'cozy 游戏玩家推荐 rpg', '独立 rpg 入门推荐', 'moonlighter 攻略', 'cassette beasts 宝可梦', 'crosscode 好玩吗']
      : ['moonlighter review worth it', 'cassette beasts review worth it', 'a hat in time review worth it', 'crosscode worth it 2024', 'indie rpg for cozy gamers', 'best indie rpg like stardew valley', 'cassette beasts vs pokemon', 'moonlighter shopkeeper game', 'crosscode rpg review'],
    alternates: {
      canonical,
      languages: buildLanguageAlternates('/quizzes/cozy-rpg-quiz'),
    },
  }
}

export default async function CozyRpgQuizPage({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-rpg-quiz`

  const faqItems = [
    {
      q: isZh ? 'Moonlighter 值得购买吗？' : 'Is Moonlighter worth buying?',
      a: isZh
        ? 'Moonlighter 非常值得购买，尤其是在促销时（5-10 美元）。游戏以商店经营与地下城探索的完美双循环著称：白天经营商店、为商品定价、与顾客互动、升级商店设施；夜晚下入程序生成的地下城、战斗、收集战利品。五个地下城提供递进的挑战，像素艺术风格精美温暖。约 15-25 小时可完成主线，完成度玩家可延长到 40+ 小时。'
        : "Moonlighter is absolutely worth buying, especially on sale for $5-10. It's celebrated for its perfect dual-loop design: manage your shop by day (price items, deal with customers, upgrade your store) and dive into procedurally generated dungeons by night (fight monsters, collect loot, survive). Five dungeons offer progressively harder challenges, the pixel art is beautiful and warm, and the shop economy has surprising depth. Main story runs 15-25 hours; completionists can reach 40+. One of the best-value indie games of its generation.",
    },
    {
      q: isZh ? 'Cassette Beasts 值得游玩吗？比宝可梦好吗？' : 'Is Cassette Beasts worth it — is it better than Pokémon?',
      a: isZh
        ? 'Cassette Beasts 被许多玩家认为在机制上比现代宝可梦更有深度。最独特的系统是怪物融合：任意两张怪物卡带都可在战斗中融合，创造出结合两者技能和属性的混合形态。凭借 120 只基础怪物和无限融合可能，队伍构建深度极大。岛屿世界设计充满爱意，NPC 同伴各有情感丰富的故事弧线。Game Pass 上可免费试玩，买断价约 20 美元。2023 年最被低估的游戏之一。'
        : "Cassette Beasts is considered by many players to be mechanically deeper than modern Pokémon. The standout system is monster fusion: any two monster cassettes can be fused mid-battle to create a hybrid that combines their moves, typing, and visual design. With 120 base monsters and unlimited fusion combinations, team-building depth is enormous. The island world is designed with love, NPC companions have emotionally rich story arcs, and the game is available on Game Pass to try for free (or ~$20 to buy). Widely described as 'the monster-tamer that actually evolved the genre.'",
    },
    {
      q: isZh ? '时光帽（A Hat in Time）值得游玩吗？' : 'Is A Hat in Time worth playing?',
      a: isZh
        ? '时光帽是近年来最好的 3D 收藏品平台游戏，也是评分最高的平台游戏之一。游戏以帽子投掷物理为核心，有五个截然不同的章节（邮轮悬案、电影工作室、森林、高山村庄、闹鬼庄园），每个章节都有独特的风格和玩法。移动系统升级后极具表现力和满足感。主线约 10-15 小时，DLC 还有更多内容，长度对于所提供的体验来说恰到好处。强烈推荐给喜欢充满创意、欢乐的 3D 平台游戏的玩家。'
        : "A Hat in Time is one of the finest 3D collectathon platformers of the past decade and consistently rated among the best platformers of its era. It features five wildly different chapters (cruise ship murder mystery, rival mafia studios, a forest that changes personality, alpine village, haunted manor) with a movement system that becomes extraordinarily expressive with upgrades. At 10-15 hours for the main game with significantly more in DLC, it perfectly hits its runtime. Highly recommended for anyone who enjoys creative, joyful 3D platformers with charming writing.",
    },
    {
      q: isZh ? 'CrossCode 好玩吗？这款游戏适合什么类型的玩家？' : 'Is CrossCode worth it — what kind of player is it for?',
      a: isZh
        ? 'CrossCode 是有史以来最被低估的 RPG 之一，开发历时七年，完成度极高。游戏设定在一个未来动漫 MMORPG 内，你扮演一个沉默的玩家角色执行秘密任务。实时战斗系统有足够的深度，多年后仍有玩家在发现新的优化方法；地下城谜题细致精心；技能树提供数十种构建方向；60-70 小时的故事在情感上落地有力。难度可以精细调整（战斗难度、谜题提示、敌人攻击性分开设置），适合各类玩家。最适合想要完整 RPG 体验的玩家。'
        : "CrossCode is one of the most underrated RPGs ever made — seven years in development with extraordinary polish. Set inside a future anime MMORPG, you play a mute player character on a secret mission. The real-time combat system has layers that skilled players are still discovering years later; dungeon puzzle design is meticulous; the skill tree offers dozens of build directions; and the 60-70 hour story builds to revelations that genuinely land emotionally. Difficulty is adjustable in granular ways (combat difficulty, puzzle hints, and enemy aggression are separate sliders). Perfect for players who want a complete, high-quality RPG journey.",
    },
    {
      q: isZh ? '喜欢 Stardew Valley 的玩家适合哪款独立 RPG？' : 'Which indie RPG should Stardew Valley players try next?',
      a: isZh
        ? '喜欢 Stardew Valley 的玩家有几个很好的独立 RPG 选项：如果你喜欢经济循环和资源管理，试试 Moonlighter（商店经营 + 地下城探索）；如果你喜欢收集和 Gundrop Dungeon 一类的内容，试试 Cassette Beasts（收集怪物 + 融合系统）；如果你想要轻松愉快的体验，试试时光帽（A Hat in Time）；如果你想要一个完整的 RPG 旅程，试试 CrossCode。所有这些游戏都为 Cozy 游戏玩家提供了一个进入更广泛独立游戏世界的友好入口。'
        : "Stardew Valley players transitioning to indie RPGs have several strong options. For players who love the economy loop, try Moonlighter (shop management + dungeon crawling). For players who love collecting and building — especially the Junimo side content — try Cassette Beasts (monster collection + fusion system). For players who want something joyful and lighthearted, try A Hat in Time. For players ready for a full-scale RPG commitment, try CrossCode. All four are considered friendly entry points into the broader world of indie gaming beyond cozy.",
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Quiz',
        name: isZh ? '哪款独立 RPG 最适合 Cozy 游戏玩家？' : 'Which Indie RPG Is Perfect for a Cozy Gamer?',
        description: isZh
          ? '6 个问题找到你最适合的独立 RPG：Moonlighter、Cassette Beasts、时光帽或 CrossCode。'
          : '6 questions to find your ideal indie RPG: Moonlighter, Cassette Beasts, A Hat in Time, or CrossCode.',
        url: canonical,
        inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
        educationalLevel: 'Beginner',
        about: { '@type': 'Thing', name: 'Indie RPG Games for Cozy Gamers' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#0f1a0f] py-12 text-[#e8dcc8]">
        <div className="mx-auto max-w-2xl px-4">
          <div className="mb-8 text-center">
            <div className="mb-4 text-5xl">🎮</div>
            <h1 className="mb-2 text-2xl font-bold text-[#e8dcc8]">
              {isZh ? '哪款独立 RPG 最适合 Cozy 游戏玩家？' : 'Which Indie RPG Is Perfect for a Cozy Gamer?'}
            </h1>
            <p className="text-sm text-[#8a9a7a]">
              {isZh
                ? '从 Moonlighter、Cassette Beasts、时光帽、CrossCode 中找到你的进阶游戏'
                : 'Find your next step: Moonlighter, Cassette Beasts, A Hat in Time, or CrossCode'}
            </p>
          </div>

          <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a] p-6 shadow-xl">
            <CozyRpgQuiz locale={locale} />
          </div>

          <div className="mt-12">
            <RelatedQuizzes currentSlug="cozy-rpg-quiz" locale={locale} />
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-lg font-semibold text-[#e8dcc8]">
              {locale === 'zh' ? '常见问题' : locale === 'zh-TW' ? '常見問題' : locale === 'ja' ? 'よくある質問' : locale === 'ko' ? '자주 묻는 질문' : locale === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
            </h2>
            {faqItems.map(({ q, a }, i) => (
              <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-5">
                <h3 className="mb-2 font-semibold text-[#f0a832]">{q}</h3>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
