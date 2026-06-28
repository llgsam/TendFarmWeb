import { FarmChallengeQuiz } from '@/components/tools/FarmChallengeQuiz'
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
      ? '农场游戏挑战度测验 — 牧场物语 4 / 波西亚时光 / Yonder / 模拟农场 25'
      : 'How Much Challenge Do You Want in Your Farming Game? Quiz — Rune Factory 4, My Time at Portia, Yonder, Farming Simulator 25',
    description: isZh
      ? '6 个问题，根据你对战斗、复杂性和时间压力的偏好，找到最适合你的农场游戏——从零战斗探索到动作 RPG 地下城。'
      : '6 questions to match your challenge tolerance with the perfect farming game — from zero-combat peaceful exploration (Yonder) to full action RPG dungeons (Rune Factory 4) to authentic agricultural simulation (Farming Simulator 25).',
    keywords: isZh
      ? ['牧场物语 4 推荐', '波西亚时光推荐', 'Yonder 游戏推荐', '模拟农场 25 推荐', '有战斗的农场游戏', '没有战斗的农场游戏', '牧场物语 vs 星露谷', '最难的农场游戏']
      : [
          'rune factory 4 vs stardew valley',
          'rune factory 4 archival edition worth it',
          'my time at portia review worth it',
          'yonder cloud catcher chronicles review',
          'farming simulator 25 review',
          'farming games with combat',
          'farming games without combat',
          'is rune factory good',
          'farming game challenge difficulty',
          'farming games for hardcore players',
          'most realistic farming game',
          'peaceful farming game no enemies',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/farming-game-challenge`,
      languages: buildLanguageAlternates('/quizzes/farming-game-challenge'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Rune Factory 4 worth playing? How is it different from Stardew Valley?',
    a: "Yes — Rune Factory 4 Archival Edition is one of the best farming RPGs ever made and absolutely worth playing. The key difference from Stardew Valley is combat: Rune Factory has fully realized dungeon-crawling action with bosses, gear progression, and leveling systems, while Stardew Valley's mines are simpler and more optional. In Rune Factory 4, farming better crops directly improves your equipment through crafting, which lets you tackle harder dungeons, which unlocks new farming areas — the systems are tightly interwoven. The romance and character writing are also more extensive than Stardew Valley. Start with Rune Factory 4 before Rune Factory 5, as 4 has tighter pacing and a more charming cast. Available on Nintendo Switch and PC.",
  },
  {
    q: 'Is My Time at Portia worth playing? How is it different from Stardew Valley?',
    a: "My Time at Portia is worth playing, especially if you are drawn to crafting, city-building, and machine construction more than pure farming. The key difference from Stardew Valley is focus: in Portia, you inherit a workshop (not a farm) in a post-apocalyptic town and your main activity is fulfilling commissions from citizens by building machines, tools, and structures. You also farm and raise animals, but these are secondary activities. The main appeal is watching the town itself transform through your work — ruined buildings get restored, new citizens arrive, infrastructure improves. The sequel My Time at Sandrock has a similar feel in a desert setting and is generally considered an improvement. Both are available on Switch, PC, and PS4/5.",
  },
  {
    q: 'Is Yonder: The Cloud Catcher Chronicles good? Is it really peaceful?',
    a: "Yes — Yonder: The Cloud Catcher Chronicles is genuinely peaceful and is often considered the most relaxing farming game ever made. The defining feature is that there are literally zero enemies in the entire game. No combat, no fail states, no time pressure from external sources. You explore a gorgeous open world with distinct biomes, craft items, build small farms, help village residents, and collect friendly spirits called Sprites. The game is about 15-20 hours long for main story completion, with additional content after. It is available on Nintendo Switch, PC (Steam), and PlayStation. The art style is warm and hand-painted. It is frequently recommended for players who specifically want to explore a large beautiful world without any threat — 'open-world Zelda without combat' is a common description.",
  },
  {
    q: 'Is Farming Simulator 25 good for beginners? What platforms is it on?',
    a: "Farming Simulator 25 is good for beginners who are specifically interested in realistic agricultural simulation, but it has a steep learning curve compared to cozy farming games. There is no story, no characters to befriend, and no combat — you are operating real licensed agricultural machinery (John Deere, CLAAS, Fendt, and over 150 brands) to grow crops, raise animals, and manage a farming operation. The complexity comes from the realistic systems: soil fertility, crop rotation, equipment maintenance, and logistics. For players who enjoy watching farming content on YouTube or have agricultural backgrounds, it is deeply satisfying. A tutorial mode helps beginners. Available on PC (Steam/Epic), PS5, and Xbox Series X|S. A massive modding community adds thousands of maps and vehicles.",
  },
  {
    q: 'What is the most challenging farming game?',
    a: "The most challenging farming games in 2025 are: Rune Factory 4/5 (action RPG combat with real boss difficulty, gear progression, and dungeon strategy — the hardest in the cozy-adjacent farming category); Stardew Valley Expanded (the popular mod that adds massive amounts of content and significantly harder mine floors); My Time at Portia (timed commissions and a friendship competition mechanic add mild pressure); and Farming Simulator 25 (not hard in the action sense, but deeply complex in its realistic agricultural systems). If you want combat difficulty in a farming game, Rune Factory is the clear answer. If you want systemic complexity, Farming Simulator is unmatched.",
  },
]

const FAQ_ZH = [
  {
    q: '牧场物语 4 值得玩吗？它和星露谷物语有什么不同？',
    a: '是的——牧场物语 4 典藏版是有史以来最好的农场 RPG 之一，绝对值得玩。与星露谷物语的关键区别在于战斗：牧场物语有完全实现的地下城探索动作，有 Boss、装备进度和等级系统，而星露谷物语的矿洞更简单、更可选。在牧场物语 4 中，耕种更好的作物通过制作直接改善你的装备，这让你能挑战更难的地下城，从而解锁新的农业区域——这些系统紧密交织在一起。恋爱和角色写作也比星露谷物语更为广泛。在牧场物语 5 之前先玩牧场物语 4，因为 4 有更紧凑的节奏和更迷人的角色阵容。可在 Nintendo Switch 和 PC 上获取。',
  },
  {
    q: '波西亚时光值得玩吗？它和星露谷物语有什么不同？',
    a: '波西亚时光值得玩，特别是如果你更喜欢制作、城市建设和机器构建而不是纯粹的农业。与星露谷物语的关键区别在于重点：在波西亚时光中，你在一个后世界末日小镇继承了一个工坊（而不是农场），你的主要活动是通过建造机器、工具和结构来完成市民的委托。你也种地和养动物，但这些是次要活动。主要吸引力是看着小镇本身通过你的工作转变——废墟建筑得到修复、新居民到来、基础设施改善。续作《沙石镇时光》在沙漠环境中有类似感觉，通常被认为是改进版。两款均可在 Switch、PC 和 PS4/5 上获取。',
  },
  {
    q: 'Yonder：云彩捕捉者传说好玩吗？它真的很平静吗？',
    a: '是的——Yonder 真的很平静，经常被认为是有史以来最放松的农场游戏。决定性的特点是整款游戏中字面意义上有零个敌人。没有战斗、没有失败状态、没有来自外部的时间压力。你探索一个有不同生物群落的美丽开放世界、制作物品、建造小农场、帮助村民，以及收集被称为精灵的友善生物。主线完成大约 15-20 小时，之后还有额外内容。可在 Nintendo Switch、PC（Steam）和 PlayStation 上获取。艺术风格温暖、手绘质感。它经常被推荐给特别想在没有任何威胁的情况下探索大型美丽世界的玩家——"没有战斗的开放世界塞尔达传说"是常见的描述。',
  },
  {
    q: '模拟农场 25 适合新手吗？在哪些平台上有？',
    a: '模拟农场 25 对于专门对真实农业模拟感兴趣的新手来说是个不错的选择，但与 cozy 农场游戏相比学习曲线较陡。没有故事、没有可以交朋友的角色、没有战斗——你操作真实授权的农业机械（约翰迪尔、科乐收、芬特等超过 150 个品牌）来种植作物、养殖动物和管理农业运营。复杂性来自真实系统：土壤肥力、轮作、设备维护和物流。对于在 YouTube 上观看农业内容或有农业背景的玩家来说，它深度令人满足。教程模式帮助新手入门。可在 PC（Steam/Epic）、PS5 和 Xbox Series X|S 上获取。庞大的模组社区增加了数千个地图和车辆。',
  },
  {
    q: '最有挑战性的农场游戏是什么？',
    a: '2025 年最有挑战性的农场游戏是：牧场物语 4/5（有真实 Boss 难度的动作 RPG 战斗、装备进度和地下城策略——是温馨相邻农场品类中最难的）；星露谷物语 Expanded 模组（增加了大量内容和更难矿洞层数的热门模组）；波西亚时光（限时委托和友谊竞争机制增加了轻微压力）；以及模拟农场 25（在动作意义上不难，但其真实农业系统的复杂性无与伦比）。如果你想要农场游戏中的战斗难度，牧场物语是明确的答案。如果你想要系统复杂性，模拟农场是无与伦比的。',
  },
]

export default async function FarmingGameChallengePage({
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
            {isZh ? '农场游戏挑战度测验' : 'Farming Game Challenge Quiz'}
          </span>
        </nav>

        <h1 className="mb-4 text-2xl font-bold leading-tight text-[#e8dcc8]">
          {isZh ? '农场游戏挑战度测验' : 'Farming Game Challenge Quiz'}
        </h1>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <FarmChallengeQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '好的农场游戏无论难度如何都有同一个核心：你投入进去，然后有所回报。'
            : 'The best farming games at every difficulty level share one thing: you put something in, and something comes back.'}
        </p>

        <RelatedQuizzes currentSlug="farming-game-challenge" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '农场游戏难度常见问题' : 'Farming Game Challenge FAQ'}
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
