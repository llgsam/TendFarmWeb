import { PaliaPlaystyleQuiz } from '@/components/tools/PaliaPlaystyleQuiz'
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
      ? '你在 Palia 的游戏风格是什么？— 耕种/钓鱼/探险/工匠测验'
      : "What's Your Palia Playstyle? — Farmer, Angler, Explorer or Artisan Quiz",
    description: isZh
      ? '6 个问题，测出你在 Palia 最自然的游戏风格——是热爱耕种的培育者、喜欢钓鱼的静待者、探险家还是工匠型玩家？含技能优先攻略。'
      : '6 questions to find your Palia playstyle — Cultivator (Farming), Patient Watcher (Fishing), Adventurer (Mining/Hunting), or Maker (Cooking/Crafting). Includes skill tips for your type.',
    keywords: isZh
      ? ['Palia 游戏风格测试', 'Palia 新手攻略', 'Palia 技能选择', 'Palia 怎么玩', 'Palia 测验', 'Palia 钓鱼还是种地']
      : [
          'palia playstyle quiz',
          'palia tips for beginners',
          'palia what skills to focus on',
          'palia farming guide',
          'palia fishing guide',
          'palia what to do first',
          'palia cozy mmo guide',
          'is palia worth playing',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/palia-playstyle`,
      languages: buildLanguageAlternates('/quizzes/palia-playstyle'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'What is Palia and is it free to play?',
    a: "Palia is a free-to-play cozy online life simulation game developed by Singularity 6, released in open beta in 2023 and fully available on PC (Steam/Epic), Nintendo Switch, and mobile. You play as a human awakening in a world now inhabited by fantasy creatures called Palians. Gameplay centers around farming, crafting, fishing, hunting, building your home plot, and befriending NPCs. There are no enemies, no combat, and no time pressure — it is entirely cozy and social. The base game is completely free; cosmetic items are sold in a cash shop.",
  },
  {
    q: 'What should I do first in Palia as a new player?',
    a: "As a Palia beginner: (1) Complete the early tutorial quests to unlock your plot and basic skills. (2) Talk to every NPC daily — Weekly Wants boards refresh on Mondays and give significant Renown for simple item donations. (3) Plant seeds immediately — crops take real time to grow, so start early. (4) Level one skill you enjoy first rather than spreading evenly — focused leveling unlocks better recipes and rewards faster. (5) Join a group for flow-art and social bonus buffs. (6) Don't stress about housing early — your plot evolves naturally as you earn more Renown and materials.",
  },
  {
    q: 'What are the best skills to level first in Palia?',
    a: "The best first skill depends on your goals: For gold income → Farming (crops sell well) or Fishing (rare fish have high value). For Renown fast → Cooking (dishes are popular on Weekly Wants) or Furniture Making (NPCs frequently want crafted items). For exploration enjoyment → Mining or Foraging (Bahari Bay has rich resource spawns). For steady passive income → Gardening (rare seeds compound in value). Most experienced players recommend starting Farming + one gathering skill (Fishing or Foraging) in parallel.",
  },
  {
    q: 'Is Palia better than Stardew Valley?',
    a: "They serve different needs. Palia is better for: social play (up to 24 players per server, real-time with friends), modern 3D visuals, no time pressure (seasons don't end), and a cozier narrative tone. Stardew Valley is better for: solo depth and systems complexity, deeper romance storylines, mine-crawling and combat-lite gameplay, offline play, and complete control of your game speed. Many players enjoy both — they are complementary experiences rather than competitors.",
  },
  {
    q: 'Can you play Palia alone without other players?',
    a: "Yes — Palia can be played entirely solo. The NPCs provide plenty of story content, quests, and social interaction. The world is shared with other players, but you never have to interact with them. However, group activities like the weekly Flow Arts performance and some gathering buffs are more rewarding with others. If you prefer solo but want community, Palia's Discord and fan communities are friendly and helpful for sharing plot designs and Weekly Wants tips.",
  },
]

const FAQ_ZH = [
  {
    q: 'Palia 是什么游戏？免费玩吗？',
    a: 'Palia 是由 Singularity 6 开发的免费 Cozy 在线生活模拟游戏，2023 年开启公测，目前已在 PC（Steam/Epic）、任天堂 Switch 和手机上正式发布。你扮演一位在 Palian 世界苏醒的人类。游戏核心玩法包括耕种、制作、钓鱼、狩猎、建造家园和与 NPC 建立友谊。没有敌人、没有战斗、没有时间压力——是纯粹的治愈和社交体验。基础游戏完全免费，商城只售卖外观道具。',
  },
  {
    q: 'Palia 新手第一步应该做什么？',
    a: '作为 Palia 新手：(1) 完成早期教程任务，解锁你的地块和基础技能。(2) 每天和每位 NPC 交谈——每周心愿板在周一刷新，捐献简单物品就能获得大量荣誉点。(3) 马上开始种植作物——作物需要现实时间成长，越早种越好。(4) 先专注提升一个你喜欢的技能，而不是平均分配——专注升级能更快解锁更好的配方和奖励。(5) 参加团队表演和社交加成活动。(6) 不要为早期家居发愁——随着你获得更多荣誉点和材料，地块会自然进化。',
  },
  {
    q: 'Palia 里优先提升哪个技能最好？',
    a: '最佳首选技能取决于你的目标：想赚金币→耕种（作物销售价格高）或钓鱼（稀有鱼价值不菲）；想快速积累荣誉点→烹饪（料理经常出现在每周心愿板）或家具制作（NPC 频繁需要制作类物品）；喜欢探索→挖矿或采集（Bahari 湾资源丰富）；想要稳定被动收入→园艺（稀有种子复利效应显著）。大多数有经验的玩家推荐同时开始耕种+一个采集技能（钓鱼或采集）。',
  },
  {
    q: 'Palia 和星露谷物语哪个更好玩？',
    a: '两款游戏服务于不同需求。Palia 的优势：社交玩法（每个服务器最多 24 人，可以和朋友实时游戏）、现代 3D 视觉效果、没有时间压力（季节不会结束）、更治愈的叙事基调。星露谷的优势：单人深度和系统复杂度、更深入的恋爱故事线、轻战斗挖矿玩法、离线游玩、对游戏节奏的完全控制。很多玩家两款都玩——它们是互补的体验，而不是竞争关系。',
  },
  {
    q: 'Palia 可以一个人玩不用和其他玩家互动吗？',
    a: '可以——Palia 完全支持单人游玩。NPC 提供了丰富的故事内容、任务和社交互动。游戏世界与其他玩家共享，但你完全不必和他们互动。不过团队活动（如每周流艺表演）和某些采集加成在多人参与时更有回报。如果你喜欢单人但又想有社群归属感，Palia 的 Discord 和粉丝社区非常友好，经常分享地块设计和每周心愿板技巧。',
  },
]

export default async function PaliaPlaystylePage({
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
            {isZh ? 'Palia 游戏风格测验' : 'Palia Playstyle Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <PaliaPlaystyleQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '在 Palia，没有错的玩法——每一种节奏都有属于自己的魔力。'
            : "In Palia, there's no wrong way to play — every pace has its own magic."}
        </p>

        <RelatedQuizzes currentSlug="palia-playstyle" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于 Palia 的常见问题' : 'Palia FAQ'}
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
