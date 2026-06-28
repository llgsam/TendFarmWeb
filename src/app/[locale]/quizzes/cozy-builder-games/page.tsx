import { CozyBuilderQuiz } from '@/components/tools/CozyBuilderQuiz'
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
      ? '放松建造游戏测验 — Townscaper、Terra Nil、Dorfromantik 还是 Summerhouse？'
      : 'Which Cozy Builder Game Should You Play? Townscaper, Terra Nil, Dorfromantik, or Summerhouse?',
    description: isZh
      ? '6 个问题，找到最适合你的冥想式建造游戏。从点击建造彩色小镇（Townscaper）到恢复自然生态（Terra Nil）到瓦片放置村庄（Dorfromantik）到打造完美花园（Summerhouse）。'
      : '6 questions to find your cozy builder match — from click-to-build coastal towns to ecological restoration puzzles to tile-placement villages to tiny aesthetic garden design.',
    keywords: isZh
      ? ['放松建造游戏推荐', 'Townscaper 评测', 'Terra Nil 值得玩吗', 'Dorfromantik 评测', 'Summerhouse 游戏评测', '冥想建造游戏', '无战斗城市建造游戏', '温馨沙盒建造游戏']
      : [
          'cozy city builder games',
          'townscaper review worth it',
          'terra nil worth playing',
          'dorfromantik review worth buying',
          'summerhouse game review',
          'relaxing building games no combat',
          'cozy builder games pc',
          'meditative building games',
          'townscaper mobile review',
          'terra nil netflix game',
          'dorfromantik switch review',
          'best zen games 2025',
          'cozy games for builders',
          'games like townscaper',
          'games like dorfromantik',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-builder-games`,
      languages: buildLanguageAlternates('/quizzes/cozy-builder-games'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Townscaper worth buying? What exactly do you do in it?',
    a: "Townscaper is a pure sandbox toy — there are no goals, no story, no objectives of any kind. You click on a body of water to place blocks; the game's algorithm automatically assembles them into colorful, architecturally charming houses, arched bridges, bell towers, and winding alleys. You choose colors, place blocks, and watch the town grow. Click an existing block to remove it. That is the entire game. It costs $6 on mobile (iOS/Android) and around $8 on PC/Switch. Most people play it in 5-15 minute sessions as a calming creative activity. It is not a 'game' in the traditional sense — it is closer to digital Lego with a beautiful aesthetic. If you want objectives or scoring, it is not the right choice; if you want pure visual meditation with beautiful results and zero friction, it is perfect.",
  },
  {
    q: 'Is Terra Nil worth playing? Is it free with Netflix?',
    a: "Terra Nil is absolutely worth playing, especially if you have a Netflix subscription — the mobile version is included free with any Netflix account (iOS and Android), making it one of the best-value games available. On PC (Steam) it costs around $25. The premise is unique: you receive a grey, polluted industrial landscape and must restore it to a natural ecosystem by placing various restoration tools (wind turbines for power, irrigators for moisture, solar panels for energy). Once the land is restored, you must also recycle all your machinery and leave no trace. It has multiple campaigns and biomes, takes about 5-8 hours to complete, and has received widespread acclaim. The 'leave without a trace' ending condition is one of the most satisfying mechanics in any puzzle game.",
  },
  {
    q: 'What is Dorfromantik? Is it hard?',
    a: "Dorfromantik is a tile-placement puzzle game where you build an idyllic countryside by placing hexagonal landscape tiles. Each tile has different terrain types on each edge (forest, wheat field, river, houses), and the goal is to match edges when placing — a forest edge should meet another forest edge. When you complete a 'closed' region of matching tiles, you score points and unlock more tiles. It is not hard in the traditional sense — there are no timers, no enemies, no fail states — but it does get progressively more complex as you try to connect larger and more ambitious tile arrangements. There is also a creative mode with unlimited tiles and no scoring. It won the German Game Award for Best Family Game. Available on PC (Steam) and Nintendo Switch for around $15.",
  },
  {
    q: 'What is Summerhouse? Who made it?',
    a: "Summerhouse is a tiny sandbox house and garden builder made by Adam Robinson-Yu, the same developer who created A Short Hike. You are given a small plot and building pieces — walls, windows, roofs, plants, furniture, fences, decorations — and you assemble a house and garden however you like. There are no objectives, no scores, and no timer. The game renders everything in warm golden afternoon light that makes creations look like postcards or memories. You can share your houses online and browse the community gallery. It costs around $7 on Steam and itch.io. It is deliberately small — the entire game is about the joy of arranging a tiny domestic space until it feels exactly right. One of the most original tiny games released in 2024.",
  },
  {
    q: 'What are the best relaxing building games with no combat?',
    a: "The best relaxing building games with zero combat are: Townscaper (PC/Switch/Mobile, $6-8) — click-to-build colorful coastal towns, pure sandbox; Dorfromantik (PC/Switch, $15) — tile-placement village builder with gentle scoring; Terra Nil (PC $25, or free with Netflix on mobile) — restore nature from industrial wasteland; Summerhouse (PC, $7) — tiny house and garden aesthetics; and Mini Motorways (PC/Switch/Mobile) — road network puzzles, meditative and addictive. If you want something with slightly more depth: Islanders (PC $5) for island city placement, and Dredge (PC/Switch/PlayStation/Xbox) if you want a cozy fishing game with atmosphere. Take the Cozy Builder Games Quiz above to find the right match for your specific building preference.",
  },
]

const FAQ_ZH = [
  {
    q: 'Townscaper 值得购买吗？你在游戏里做什么？',
    a: 'Townscaper 是一个纯粹的沙盒玩具——没有目标、没有故事、没有任何类型的任务。你点击水面放置方块；游戏的算法自动将它们组装成色彩鲜艳的、建筑上迷人的房屋、拱形桥梁、钟楼和蜿蜒的小巷。你选择颜色、放置方块，看着小镇成长。点击现有方块将其移除。这就是整个游戏。手机（iOS/Android）售价 6 美元，PC/Switch 约 8 美元。大多数人以 5-15 分钟的游戏时段作为平静的创意活动来玩它。它不是传统意义上的"游戏"——它更接近有美丽美学的数字乐高。如果你想要目标或计分，它不是正确的选择；如果你想要纯粹的视觉冥想、美丽的结果和零摩擦，它是完美的。',
  },
  {
    q: 'Terra Nil 值得玩吗？有 Netflix 能免费玩吗？',
    a: 'Terra Nil 绝对值得玩，特别是如果你有 Netflix 订阅——手机版本包含在任何 Netflix 账户（iOS 和 Android）中免费，使其成为最具价值的游戏之一。在 PC（Steam）上售价约 25 美元。前提是独特的：你收到一片灰色的、受污染的工业景观，必须通过放置各种恢复工具（风力涡轮机提供电力、灌溉机提供水分、太阳能板提供能源）将其恢复到自然生态系统。一旦土地恢复，你还必须回收所有机械并不留痕迹。它有多个战役和生物群落，完成大约需要 5-8 小时，并获得了广泛好评。"不留痕迹离开"的结束条件是任何谜题游戏中最令人满足的机制之一。',
  },
  {
    q: 'Dorfromantik 是什么游戏？它难吗？',
    a: 'Dorfromantik 是一款瓦片放置谜题游戏，你通过放置六边形景观瓦片来建造田园乡村。每个瓦片的每条边都有不同的地形类型（森林、麦田、河流、房屋），目标是放置时匹配边缘——森林边缘应该遇到另一个森林边缘。当你完成一个匹配瓦片的"封闭"区域时，你获得积分并解锁更多瓦片。它在传统意义上并不难——没有计时器、没有敌人、没有失败状态——但随着你尝试连接更大、更雄心勃勃的瓦片排列，它确实变得越来越复杂。还有一个有无限瓦片且不计分的创意模式。它赢得了德国最佳家庭游戏奖。可在 PC（Steam）和 Nintendo Switch 上获取，约 15 美元。',
  },
  {
    q: 'Summerhouse 是什么游戏？谁制作的？',
    a: 'Summerhouse 是一款由 Adam Robinson-Yu 制作的微型沙盒房屋和花园建造游戏，他就是制作短途徒步的同一开发者。你得到一小块地和建筑组件——墙壁、窗户、屋顶、植物、家具、围栏、装饰品——你随心所欲地组装房子和花园。没有目标、没有积分、没有计时器。游戏在温暖的金色午后光线中渲染一切，让创作看起来像明信片或记忆。你可以在线分享你的房子并浏览社区画廊。在 Steam 和 itch.io 上售价约 7 美元。它故意做得很小——整个游戏是关于排列一个微型家庭空间的乐趣，直到感觉恰到好处。2024 年发布的最具原创性的微型游戏之一。',
  },
  {
    q: '有哪些无战斗的放松建造游戏推荐？',
    a: '最好的零战斗放松建造游戏是：Townscaper（PC/Switch/手机，6-8 美元）——点击建造彩色沿海小镇，纯沙盒；Dorfromantik（PC/Switch，15 美元）——有温和计分的瓦片放置村庄建造；Terra Nil（PC 25 美元，或手机 Netflix 免费）——从工业荒地恢复自然；Summerhouse（PC，7 美元）——微型房屋和花园美学；以及迷你公路（PC/Switch/手机）——道路网络谜题，冥想且令人上瘾。如果你想要深度略多的：Islanders（PC 5 美元）用于岛屿城市放置，以及 Dredge（PC/Switch/PlayStation/Xbox）如果你想要有氛围的温馨钓鱼游戏。做上面的「放松建造游戏测验」，找到最适合你特定建造偏好的游戏。',
  },
]

export default async function CozyBuilderGamesPage({
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
            {isZh ? '测评' : 'Quizzes'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#e8dcc8]">
            {isZh ? '放松建造游戏测验' : 'Cozy Builder Games Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyBuilderQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '最好的建造游戏不是让你建得更多——而是让建造本身成为你需要的那种休息。'
            : 'The best builder games are not about building more — they are about the act of building being the rest you needed.'}
        </p>

        <RelatedQuizzes currentSlug="cozy-builder-games" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '放松建造游戏常见问题' : 'Cozy Builder Games FAQ'}
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
