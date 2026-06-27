import { Metadata } from 'next'
import { RelationshipSimQuiz } from '@/components/tools/RelationshipSimQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import { BASE_URL, otherLocale } from '@/lib/config'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/relationship-sim-quiz`

  return {
    title: isZh
      ? '哪款以「关系」为核心的游戏最适合你？牧场物语/沙石镇/女神异闻录 4/风花雪月 | FarmGame Hub'
      : 'Which Relationship-Driven Game Is Right for You? Story of Seasons, My Time at Sandrock, Persona 4, Fire Emblem Three Houses | FarmGame Hub',
    description: isZh
      ? '测验：牧场物语：美好的生活、沙石镇时光、女神异闻录 4 黄金版、火焰纹章：风花雪月——哪款以关系为核心的游戏最适合你？6 个问题找到答案。'
      : 'Quiz: Story of Seasons: A Wonderful Life, My Time at Sandrock, Persona 4 Golden, or Fire Emblem: Three Houses — which relationship-driven game is right for you? 6 questions.',
    keywords: isZh
      ? ['牧场物语美好的生活值得买吗', '沙石镇时光评测', '女神异闻录 4 黄金版 pc 值得吗', '火焰纹章风花雪月值得玩吗', '社交模拟游戏推荐', '农场游戏婚姻系统', '星露谷类社交游戏', 'persona 4 golden steam 值得', '火焰纹章风花雪月攻略']
      : ['story of seasons a wonderful life worth it 2023', 'my time at sandrock review worth it', 'persona 4 golden worth it pc steam', 'fire emblem three houses worth it', 'best games with social links', 'games like stardew valley with romance', 'best relationship simulation games', 'my time at sandrock vs portia', 'persona 4 golden beginners guide', 'fire emblem three houses best house'],
    alternates: {
      canonical,
      languages: { [otherLocale(locale)]: `${BASE_URL}/${otherLocale(locale)}/quizzes/relationship-sim-quiz` },
    },
  }
}

export default async function RelationshipSimQuizPage({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/relationship-sim-quiz`

  const faqItems = [
    {
      q: isZh ? '牧场物语：美好的生活（2023 重制版）值得购买吗？' : 'Is Story of Seasons: A Wonderful Life (2023) worth buying?',
      a: isZh
        ? '牧场物语：美好的生活是对 2004 年经典的高质量重制，增加了现代画面、新的生活质量改进和扩展的结婚候选人（包括同性选项）。这款游戏以其独特的跨越多个游戏内年份的时间跨度而著称——村民随时间变化，你的孩子长大，村庄本身随着你的关系演变。对于星露谷玩家：这是激发星露谷的特许经营权，有截然不同的节奏和情感深度，专注于与角色的长期关系而非速成友谊。约 40-60 美元，值得，尤其是对于喜欢日式农场生活模拟和婚姻机制的玩家。'
        : "Story of Seasons: A Wonderful Life is a high-quality remake of the beloved 2004 classic, adding modern visuals, quality-of-life improvements, and expanded marriage candidates including same-sex options. The game is distinguished by its unique multi-decade time span — villagers change over the years, your child grows up, and the village itself evolves with your relationships. For Stardew Valley players: this is the franchise that inspired it, with a distinctly different pace that focuses on long-term NPC relationships rather than rapid friendship building. At about $40, it's worth it for players who specifically love the Japanese farming life sim and marriage mechanics.",
    },
    {
      q: isZh ? '沙石镇时光（My Time at Sandrock）值得购买吗？与帕鲁世界相比如何？' : 'Is My Time at Sandrock worth it — how does it compare to My Time at Portia?',
      a: isZh
        ? '沙石镇时光在各方面都是对帕鲁世界的明显提升：更大的角色阵容、更好的文字（帕鲁世界的文字常被批评为粗糙）、更完整的主线故事，以及沙漠边疆美学的独特身份。如果你玩过帕鲁世界并觉得它缺少什么，沙石镇很可能正是你想要的。如果你没有玩过帕鲁世界，沙石镇是更好的首选游戏。Steam 上约 35 美元，评价"好评如潮"。对于喜欢以建造和制作为核心但也有深厚关系系统的游戏的玩家，这是一款优秀选择。'
        : "My Time at Sandrock is a clear improvement over My Time at Portia in nearly every dimension: larger cast, better writing (Portia was often criticized for rough localization), more complete main story, and a distinct identity with its desert western aesthetic. If you played Portia and felt it was missing something, Sandrock is almost certainly what you wanted. If you haven't played Portia, Sandrock is the better first game. About $35 on Steam with an 'Overwhelmingly Positive' rating. An excellent choice for players who want a game centered on building and crafting but with a rich relationship system on top.",
    },
    {
      q: isZh ? '女神异闻录 4 黄金版在 PC 上值得购买吗？从哪里开始入门女神异闻录系列？' : "Is Persona 4 Golden worth it on PC — where should I start the Persona series?",
      a: isZh
        ? '女神异闻录 4 黄金版在 PC 上约 20 美元，是最有价值的 JRPG 之一（80-100+ 小时内容）。对于想要入门女神异闻录系列的玩家：女神异闻录 4 黄金版是系列的最佳入门点之一，以其温暖的社区感和较为友好的节奏著称。女神异闻录 5 皇家版（2020 年 PC）是最现代且视觉上最精致的，也是很好的入门点。女神异闻录 3 重制版（2024 年）是情感上最深刻的，但可能不是最友好的入门点。如果你喜欢 2000 年代日本小镇氛围和谋杀悬案，从 P4G 开始；如果你更喜欢现代东京和盗贼主题，从 P5R 开始。'
        : "Persona 4 Golden on PC at about $20 is one of the best value JRPGs available (80-100+ hours of content). For players new to the Persona series: P4G is one of the best entry points, known for its warm community feeling and accessible pacing. Persona 5 Royal (PC, 2020) is the most modern and visually polished, also a great starting point. Persona 3 Reload (2024) is the most emotionally powerful but not necessarily the friendliest introduction. If you like 2000s Japanese small-town atmosphere and mystery, start with P4G; if you prefer modern Tokyo and heist themes, start with P5R.",
    },
    {
      q: isZh ? '火焰纹章：风花雪月值得购买吗？哪个学院最适合第一周目？' : "Is Fire Emblem: Three Houses worth buying — which house is best for a first playthrough?",
      a: isZh
        ? '火焰纹章：风花雪月是最受好评的 Nintendo Switch 游戏之一，是有史以来最优秀的战术 RPG 之一。三条主要故事路线（以及第四条隐藏路线）提供了截然不同的叙事视角。对于第一周目的学院选择：蓝狮学院（迪米特里路线）是最推荐的，因为它有最具情感深度的主角故事弧线；金鹿学院（克洛德路线）以更轻松的氛围著称，适合第一次接触策略 RPG 的玩家；黑鹰学院（艾黛尔嘉德路线）有最有争议但最引人深思的故事。不要选择银雪路线（黑鹰路线的变体）作为你的第一周目——它要等第二周目。'
        : "Fire Emblem: Three Houses is one of the highest-rated Nintendo Switch games and one of the finest tactical RPGs ever made. Three major story routes (plus a fourth hidden route) provide dramatically different narrative perspectives. For first-playthrough house choice: Blue Lions (Dimitri's route) is most commonly recommended for having the most emotionally resonant protagonist arc; Golden Deer (Claude's route) has a lighter tone and is friendly for first-time strategy RPG players; Black Eagles (Edelgard's route) has the most controversial but thought-provoking story. Don't choose Silver Snow (the Black Eagles alternate route) for your first playthrough — save it for a subsequent run.",
    },
    {
      q: isZh ? '喜欢星露谷物语婚姻系统的玩家适合哪款游戏？' : 'Which game should Stardew Valley players who love the romance/marriage system play next?',
      a: isZh
        ? '对于喜欢星露谷婚姻和关系系统的玩家，有几个方向：如果你想要更深入的农场婚姻模拟，玩牧场物语：美好的生活（跨越多年的长期关系），或者神领物语（Rune Factory）系列（战斗+农场+深度浪漫）；如果你想要在非农场背景下的关系，玩沙石镇时光（沙漠小镇建造）或女神异闻录 4/5（高中社交链接）；如果你想要关系对战斗产生实际影响，玩火焰纹章：风花雪月（支援系统影响战术战斗）。所有这些游戏都把 NPC 关系建设放在核心位置，但以截然不同的方式实现。'
        : "For players who love Stardew Valley's romance and relationship system, there are several directions: if you want a deeper farming/marriage sim, try Story of Seasons: A Wonderful Life (long-term relationships over multiple years) or the Rune Factory series (combat + farming + deep romance); if you want relationships in a non-farming setting, try My Time at Sandrock (desert town building) or Persona 4/5 (high school social links); if you want relationships to directly impact combat, try Fire Emblem: Three Houses (support system affects tactical battles). All of these games center NPC relationship-building but implement it in very different ways.",
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Quiz',
        name: isZh ? '哪款以「关系」为核心的游戏最适合你？' : 'Which Relationship-Driven Game Is Right for You?',
        description: isZh
          ? '6 个问题找到你最适合的社交关系模拟游戏：牧场物语、沙石镇时光、女神异闻录 4 或火焰纹章：风花雪月。'
          : '6 questions to find your ideal relationship-driven game: Story of Seasons, My Time at Sandrock, Persona 4 Golden, or Fire Emblem: Three Houses.',
        url: canonical,
        inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
        educationalLevel: 'Beginner',
        about: { '@type': 'Thing', name: 'Relationship Simulation Games' },
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
            <div className="mb-4 text-5xl">💞</div>
            <h1 className="mb-2 text-2xl font-bold text-[#e8dcc8]">
              {isZh ? '哪款以「关系」为核心的游戏最适合你？' : 'Which Relationship-Driven Game Is Right for You?'}
            </h1>
            <p className="text-sm text-[#8a9a7a]">
              {isZh
                ? '牧场物语、沙石镇时光、女神异闻录 4、火焰纹章：风花雪月——深度社交关系的四种路径'
                : 'Story of Seasons, My Time at Sandrock, Persona 4 Golden, Fire Emblem: Three Houses — four paths to deep NPC relationships'}
            </p>
          </div>

          <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a] p-6 shadow-xl">
            <RelationshipSimQuiz locale={locale} />
          </div>

          <div className="mt-12">
            <RelatedQuizzes currentSlug="relationship-sim-quiz" locale={locale} />
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-lg font-semibold text-[#e8dcc8]">
              {isZh ? '常见问题' : 'Frequently Asked Questions'}
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
