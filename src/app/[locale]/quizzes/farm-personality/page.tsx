import { FarmPersonalityQuiz } from '@/components/tools/FarmPersonalityQuiz'
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
      ? '你是哪种农场玩家？测出你的农场游戏人格'
      : 'What Kind of Farmer Are You? Farm Game Personality Quiz',
    description: isZh
      ? '6 个问题，测出你的农场游戏人格：效率农夫、美学农夫、探索农夫还是禅意农夫？并推荐最适合你的游戏。'
      : '6 questions to reveal your farming game personality — Optimizer, Homesteader, Explorer, or Zen Farmer — plus personalized game recommendations.',
    keywords: isZh
      ? ['农场游戏人格测试', '我是什么类型的农场玩家', '效率农夫还是美学农夫', '农场游戏风格测验', '农场游戏哪款适合我']
      : [
          'what kind of farmer are you quiz',
          'farming game personality types',
          'am i an optimizer or explorer in games',
          'farming game playstyle quiz',
          'farming game personality test',
          'which farming game suits me',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/farm-personality`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes/farm-personality`,
        [other]: `${BASE_URL}/${other}/quizzes/farm-personality`,
      },
    },
  }
}

const FAQ_EN = [
  {
    q: 'What are the different farming game personality types?',
    a: 'Farming game players generally fall into four personality types: Optimizers (efficiency-first, min-max crops and gold income), Homesteaders (cozy builders who focus on aesthetics and community), Explorers (dive into lore, secrets, and side content first), and Zen Farmers (relaxed, no goals, just enjoy the rhythm). Most players are a mix, but one type usually dominates. Take this quiz to find your dominant type and get matching game recommendations.',
  },
  {
    q: 'Am I an optimizer or explorer in farming games?',
    a: 'Optimizers focus on efficiency: they research best crops before planting, plan sprinkler grids, and hit income targets by season. Explorers focus on discovery: they talk to every NPC, follow every questline, and find secrets before checking any guide. The difference shows up most on rainy days — an optimizer heads to the mines with a plan; an explorer wanders to see what happens. Neither is better — they just point to different ideal games.',
  },
  {
    q: 'What farming game is best for perfectionist players?',
    a: "Stardew Valley is the best farming game for perfectionists — it has a literal 100% completion tracker called Perfection that requires completing all bundles, cooking all recipes, catching all fish, and more. Farming Simulator 25 also appeals to perfectionists who want realistic detail. For a more relaxed perfectionist aesthetic, Garden Story and Wylde Flowers have satisfying completionist loops without the pressure.",
  },
  {
    q: 'What is the best farming game for relaxed players?',
    a: "The best farming games for relaxed players are Animal Crossing: New Horizons (no fail states, real-time pacing), Cozy Grove (gentle daily ritual, no rush), and Palia (free, online co-op, no competition). Stardew Valley can also be played at a relaxed pace — there is no game over — but it has enough depth that some players find it engaging rather than purely relaxing. My Time at Sandrock is another cozy option for relaxed-but-story-rich play.",
  },
  {
    q: 'How do I know which farming game matches my play style?',
    a: "Match by primary motivation: If you love optimization and income tracking → Stardew Valley or Farming Simulator. If you love building and aesthetics → Animal Crossing or Stardew Valley mods. If you love exploration and story → My Time at Portia, My Time at Sandrock, or Palia. If you love social simulation and relationships → Story of Seasons or Harvest Moon. If you want pure chill with no pressure → Cozy Grove or A Short Hike. Take the Farm Personality Quiz above to get a personalized recommendation in under 2 minutes.",
  },
]

const FAQ_ZH = [
  {
    q: '农场游戏有哪些不同的玩家人格类型？',
    a: '农场游戏玩家大致可以分为四种人格：效率型（优先效益，追求最优作物配置和金币收入）、农庄型（专注建造和美学，重视与社区的互动）、探索型（先挖掘剧情、秘密和支线，乐于发现游戏的各种隐藏内容）、以及禅意型（放松游戏，不设目标，享受农场节律本身）。大多数玩家是多种类型的混合体，但往往有一种主导类型。做测验找到你的主导类型，并获取推荐游戏。',
  },
  {
    q: '我是农场游戏中的效率型还是探索型玩家？',
    a: '效率型玩家注重最优解：在种地前先研究最佳作物，规划洒水机格局，按季节达成收入目标。探索型玩家注重发现：和每位 NPC 交谈，追踪每条支线任务，不看攻略自己找秘密。区别最明显的时刻是下雨天——效率型玩家带着计划冲向矿洞；探索型玩家四处闲逛，看看会发生什么。两种类型没有优劣之分，只是指向不同的理想游戏。',
  },
  {
    q: '完美主义玩家最适合哪款农场游戏？',
    a: '星露谷物语是完美主义玩家的首选——它有一个字面意义上的「完美度」追踪系统，需要完成所有捆包、学会所有料理食谱、钓到所有鱼种等。模拟农场 25 也吸引追求真实细节的完美主义者。如果你是更倾向美学的完美主义者，Garden Story 和 Wylde Flowers 提供令人满足的收集循环，而没有太大压力。',
  },
  {
    q: '随性玩家最适合哪款农场游戏？',
    a: '最适合放松型玩家的农场游戏是：动物森友会（无失败机制、现实时间流逝）、Cozy Grove（温柔的每日节律、无紧迫感），以及 Palia（免费、在线协作、无竞争压力）。星露谷物语也可以以放松的节奏游玩——游戏没有失败机制——但它的深度也足以让一些玩家进入专注模式，而非纯粹放松。我的时代：沙岗镇也是轻松但有故事感的好选择。',
  },
  {
    q: '怎么判断哪款农场游戏最适合我的游戏风格？',
    a: '按主要驱动力匹配：喜欢优化和收入目标→星露谷物语或模拟农场；喜欢建造和美学→动物森友会或加 Mod 的星露谷；喜欢探索和故事→我的时代：波缇亚/沙岗镇或 Palia；喜欢社交模拟和人际关系→牧场物语或丰收之月；想要纯粹无压力放松→Cozy Grove 或 A Short Hike。做上面的农场人格测试，2 分钟内获取个性化推荐。',
  },
]

export default async function FarmPersonalityPage({
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
            {isZh ? '农场人格测试' : 'Farm Personality Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <FarmPersonalityQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '你的选择完全匿名，帮助我们了解农场玩家的偏好。'
            : 'Your answers are anonymous and help us understand what farmers want.'}
        </p>

        <RelatedQuizzes currentSlug="farm-personality" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于农场游戏人格的常见问题' : 'Farming Game Personality FAQ'}
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
