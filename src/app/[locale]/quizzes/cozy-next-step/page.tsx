import { CozyNextStepQuiz } from '@/components/tools/CozyNextStepQuiz'
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
  const isZh = locale === 'zh'
  return {
    title: isZh
      ? '玩完星露谷和动物之森，你该玩什么？Ooblets、精灵农场、帕恰之根还是药水许可证？'
      : 'What to Play After Stardew Valley and Animal Crossing? Ooblets, Fae Farm, Roots of Pacha, or Potion Permit?',
    description: isZh
      ? '6 个问题，在玩完星露谷和动物之森之后找到你的下一步——会跳舞的 Ooblets 生物收集、魔法合作农场、石器时代部落社区，或小镇医生生活模拟。'
      : '6 questions to find your next cozy game after Stardew Valley and Animal Crossing — dancing creature-collecting Ooblets, magical co-op Fae Farm, Stone Age Roots of Pacha, or small-town doctor Potion Permit.',
    keywords: isZh
      ? ['玩完星露谷该玩什么', '类动物之森游戏推荐', 'Ooblets 评测值得玩吗', '精灵农场评测值得买吗', '帕恰之根评测', '药水许可证评测', '星露谷替代品 2023 2024']
      : [
          'what to play after stardew valley 2024',
          'games like stardew valley 2023 2024',
          'games like animal crossing for pc',
          'best cozy games after stardew valley',
          'ooblets review worth it steam',
          'ooblets worth buying xbox game pass',
          'fae farm review worth it switch',
          'is fae farm worth buying 2024',
          'fae farm co-op review',
          'roots of pacha review worth buying',
          'is roots of pacha worth it',
          'roots of pacha stone age farming game',
          'potion permit review worth it',
          'is potion permit worth buying',
          'potion permit vs stardew valley',
          'cozy farming games beyond stardew 2024',
          'next cozy game after animal crossing new horizons',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-next-step`,
      languages: buildLanguageAlternates('/quizzes/cozy-next-step'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'What is the best game to play after finishing Stardew Valley? (Besides buying another copy and starting over)',
    a: "The most similar experience that isn't Stardew is Roots of Pacha (2023) — it has the same seasonal farming loop, community center-style progression, heart events with villagers, and a distinct mine to explore, all in a completely fresh Stone Age setting. For players who specifically loved Animal Crossing's daily ritual and social warmth, Fae Farm offers the closest multiplayer cozy farm with more magic. If you want creature-collecting like the Junimo hut aspect of Stardew but more developed, Ooblets extends that into dancing competitions and creature evolution. If you want a cozy daily loop with a completely different role (not farmer, but town doctor), Potion Permit is the most narratively rich alternative at its price point. All four give you something Stardew doesn't — Stardew never gets old, but these games offer genuinely new perspectives on what a cozy daily loop can be.",
  },
  {
    q: 'Is Ooblets worth it? Why is it different from every other farming game?',
    a: "Ooblets is worth it specifically because it refuses to be what you expect. Most creature-collecting games derive from Pokémon (combat-first, stat optimization). Ooblets uses dance-offs as its 'battle' mechanic — they are turn-based rhythm challenges where you play cards to build a dance routine. The creatures (Ooblets) you recruit help on your farm, can be entered in regional Ooblet tournaments, and evolve into new forms over time. The world of Badgetown has the cozy-town energy of Animal Crossing but filtered through deliberately weird humor: quests have absurdist logic, NPCs make self-aware meta-jokes, and the entire game refuses to be taken seriously. At $25 (or free on Xbox Game Pass), it is one of the most original takes on the farming genre available. The game reached full 1.0 release in 2022 after three years in Epic Early Access, and the developers are the same duo behind Griftlands (a critically praised card game), so the wit and craft are consistent.",
  },
  {
    q: 'Is Fae Farm worth it? How does its co-op compare to Stardew Valley co-op?',
    a: "Fae Farm's co-op is generally considered superior to Stardew Valley co-op for one key reason: it was designed co-op-first. In Stardew, co-op was added post-launch and has known friction points (split money, difficulty scaling, time sync pressure). In Fae Farm, up to 4 players share full progress — you visit the same areas, share the same story events, and there is no friction between host and client economies. The magic system (unlockable spells for watering, combat, exploration, and crafting) also gives multiplayer sessions a natural division of labor: one person casts area-water spells while another fights cave creatures. The visual polish is exceptional — soft pastels, glowing elements, warm fantasy lighting. The main criticism is that the writing is shallower than Stardew's and that the end-game content drops off. At $25-40 (often on sale), it is the best dedicated co-op farming sim currently available. On Switch or PC.",
  },
  {
    q: 'Is Roots of Pacha worth buying? What makes the Stone Age setting work?',
    a: "Roots of Pacha (2023) is one of the most underrated games in the farming genre and has grown a devoted fanbase since its April 2023 release. The Stone Age setting works because it is treated seriously and with care: crops are things being domesticated for the first time, tools feel primitive and earned, and the village's growth from a small clan camp into something more established mirrors your own progression in a way that feels genuinely historic. The equivalent of the Stardew community center is a cave wall where you record discoveries in cave-painting style — a small detail that lands emotionally. The friendship system has the same heart-event depth as Stardew's, and the game has multiplayer. The main limitation is that the art style is simpler than Stardew's pixel art, and the end-game is less deep. At $30, it is one of the best value farming sims of recent years and extremely well-suited to players coming off Stardew who want the same comfort but a genuinely fresh setting.",
  },
  {
    q: 'Is Potion Permit worth it? How long is it, and is it better than other cozy life sims?',
    a: "Potion Permit (2022) occupies a genuinely unique niche: you are a chemist-doctor in a suspicious small coastal town, not a farmer. The core loop is diagnosis (symptom-matching minigame) → wilderness foraging → potion brewing → treatment, which is much more medically flavored than any farming sim without being stressful or clinical. The town of Moonbury starts mistrustful and warms over 15-25 hours of play — the relationship arc across the whole community is more dramatically satisfying than most cozy games at this price point ($20). The pixel art is charming, the coastal aesthetic is warm, and there is a surprising amount of subplot and mystery around why Moonbury rejected modern medicine. On PC, Switch, PlayStation, and Xbox. Main criticism: the wilderness-foraging movement feels slightly stiff in the first hour. Comparison to Stardew: less farming-focused but more narrative-focused; both have relationship trees with the same warmth and event structure. Strongly recommended for players who liked Spiritfarer's 'care for others' emotional dynamic.",
  },
]

const FAQ_ZH = [
  {
    q: '玩完星露谷物语之后，最值得玩的游戏是什么？（除了再买一份重新开始）',
    a: '最相似的体验是帕恰之根（2023 年）——它有同样的季节农耕循环、类社区中心进度系统、与村民的心事件，以及独特的矿洞探索，全都在完全全新的石器时代设定中。对于特别喜欢动物之森日常仪式感和社交温暖的玩家，精灵农场提供了最接近的多人 cozy 农场体验，加上更多魔法元素。如果你想要像星露谷 Junimo 小屋那样的生物收集元素，但更丰富，Ooblets 将其延伸为舞蹈比赛和生物进化。如果你想要一个完全不同角色（不是农夫，而是小镇医生）的 cozy 日常循环，药水许可证在其价位上是叙事最丰富的替代品。所有四款都提供了星露谷没有的东西——星露谷永远不会老，但这些游戏提供了对 cozy 日常循环的真正全新视角。',
  },
  {
    q: 'Ooblets 值得玩吗？它与其他农场游戏有何不同？',
    a: 'Ooblets 值得玩，尤其是因为它拒绝成为你所预期的那种游戏。大多数生物收集游戏源自宝可梦（战斗优先，属性优化）。Ooblets 用舞蹈对决作为其"战斗"机制——这是回合制节律挑战，你打出卡牌来构建舞蹈例程。你招募的生物（Ooblets）在农场帮忙工作，可以参加地区 Ooblet 锦标赛，并随时间进化成新形态。Badgetown 世界有动物之森的 cozy 小镇氛围，但通过刻意奇异的幽默过滤：任务有荒诞逻辑，NPC 发表自我意识的元笑话，整个游戏拒绝被认真对待。25 美元（或 Xbox Game Pass 免费），是农场类型中最具原创性的演绎之一。游戏于 2022 年在 Epic 抢先体验三年后正式 1.0 发布，开发者是创作 Griftlands（获得好评的卡牌游戏）的同一个二人组，机智感和工艺品质是一贯的。',
  },
  {
    q: '精灵农场值得玩吗？它的合作模式与星露谷合作模式相比如何？',
    a: '精灵农场的合作模式通常被认为优于星露谷合作模式，原因有一个关键点：它是首先为合作设计的。在星露谷中，合作是事后添加的，存在已知的摩擦点（分钱、难度缩放、时间同步压力）。在精灵农场中，最多 4 名玩家共享完整进度——你访问相同的区域，共享相同的故事事件，主机和客户端之间没有经济摩擦。魔法系统（可解锁的浇水、战斗、探索和制作咒语）也为多人游戏提供了自然的分工：一个人施放范围浇水咒语，另一个人对抗洞穴生物。视觉质量卓越——柔和的粉彩色调、发光元素、温暖的奇幻照明。主要批评是写作比星露谷浅，游戏后期内容有所下降。25-40 美元（常有特卖），是目前市面上最佳的专门合作农场模拟。Switch 或 PC 均可。',
  },
  {
    q: '帕恰之根值得买吗？石器时代的设定为何有效？',
    a: '帕恰之根（2023 年）是农场类型中最被低估的游戏之一，自 2023 年 4 月发布以来积累了忠实粉丝群。石器时代设定之所以有效，是因为它被认真且细心地对待：作物是第一次被驯化的东西，工具感觉原始且来之不易，村庄从小部落营地成长为更成熟的东西，以一种感觉真正具有历史意义的方式映射你自己的进度。星露谷社区中心的等价物是一面洞穴壁，你用洞穴画风格记录发现——一个小细节，但情感上颇有共鸣。友谊系统与星露谷的心事件深度相同，游戏有多人游戏。主要限制是艺术风格比星露谷的像素艺术更简单，后期游戏不够深入。30 美元，是近年来性价比最佳的农场模拟之一，非常适合刚完成星露谷、想要同样舒适感但真正新鲜设定的玩家。',
  },
  {
    q: '药水许可证值得买吗？它有多长，比其他 cozy 生活模拟游戏好在哪里？',
    a: '药水许可证（2022 年）占据了一个真正独特的细分市场：你是一个多疑小沿海小镇的化学家-医生，而不是农夫。核心循环是诊断（症状匹配小游戏）→ 荒野采集 → 药水酿造 → 治疗，这比任何农场模拟更具医学风味，但不会有压力或临床感。Moonbury 小镇一开始不信任你，在 15-25 小时的游戏过程中逐渐温暖——整个社区的关系弧线在这个价位（20 美元）的 cozy 游戏中叙事上最令人满意。像素艺术迷人，沿海美学温暖，还有关于为什么 Moonbury 拒绝现代医学的令人惊喜的支线情节和谜题。PC、Switch、PlayStation 和 Xbox 均可。主要批评：荒野采集移动感在第一小时略显僵硬。与星露谷的比较：农耕专注度低，但叙事专注度高；两者的关系树都有同样的温暖感和事件结构。强烈推荐给喜欢 Spiritfarer「照顾他人」情感动态的玩家。',
  },
]

export default async function CozyNextStepPage({
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
            {isZh ? '进阶 Cozy 游戏推荐测验' : 'Cozy Next Step Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyNextStepQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '星露谷物语和动物之森是门，不是终点。打开门之后，有一整个世界的 cozy 游戏在等你。'
            : 'Stardew Valley and Animal Crossing are doors, not destinations. Past them, there is an entire world of cozy games waiting.'}
        </p>

        <RelatedQuizzes currentSlug="cozy-next-step" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '星露谷进阶推荐常见问题' : 'What to Play After Stardew FAQ'}
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
