import { CozyCreative2024Quiz } from '@/components/tools/CozyCreative2024Quiz'
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
      ? '2023-2024 创意 Cozy 游戏推荐测验 — Tiny Glade、Sticky Business、Cocoon 还是 Viewfinder？'
      : 'Which 2023-2024 Creative Cozy Game Should You Play? Tiny Glade, Sticky Business, Cocoon, or Viewfinder?',
    description: isZh
      ? '6 个关于创意风格的问题，找到最适合你的 2024 年新 Cozy 游戏——无目标城堡沙盘、贴纸设计小店、嵌套世界解谜冒险，或摄影重塑空间的创意谜题。'
      : '6 questions to find your 2023-2024 cozy game match — a freeform castle diorama builder, a sticker design shop sim, a nested-worlds puzzle adventure, or a photography-reshapes-space puzzle game.',
    keywords: isZh
      ? ['Tiny Glade 评测值得买吗', 'Sticky Business 游戏评测', 'Cocoon 游戏评测值得玩吗', 'Viewfinder 游戏评测', '2024 最佳 cozy 独立游戏', '创意 cozy 游戏推荐', '没有目标的放松建造游戏']
      : [
          'tiny glade review worth it 2024',
          'tiny glade game worth buying',
          'tiny glade gameplay review',
          'is tiny glade worth it steam',
          'sticky business game review worth it',
          'sticky business sticker game switch',
          'cocoon game review worth playing',
          'is cocoon worth it xbox game pass',
          'cocoon game jeppe carlsen review',
          'viewfinder game review worth buying',
          'viewfinder puzzle game ps5',
          'best cozy indie games 2023 2024',
          'best new cozy games 2024 pc',
          'cozy creative games without objectives',
          'relaxing sandbox games no fail states',
          'best unique puzzle games 2023',
          'cozy games with original mechanics',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-creative-2024`,
      languages: buildLanguageAlternates('/quizzes/cozy-creative-2024'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Tiny Glade worth it? What exactly do you do in Tiny Glade?',
    a: "Tiny Glade is worth $15 for anyone who has ever wanted a cozy building game with no objectives, no resource management, and no fail states. You use a set of tools to place stone walls, towers, roofs, windows, doors, arches, benches, lanterns, water features, flowers, ivy, and trees in a small landscape — and every element procedurally adapts as you place it. Walls grow moss in shadowed areas. Roofs tile based on pitch and material. Ivy climbs nearby surfaces automatically. The procedural detail generation means that even simple structures look painterly and beautiful in screenshots. Tiny Glade went viral in early 2024 when demo footage showed this dynamic in action — the clip of a player building a small cottage in real-time accumulated millions of views across social platforms. At 1-15 hours depending on how long you want to spend (there is no endpoint), it is extremely good value. Released in September 2024 by Pounce Light. PC only (Steam). Ideal for short creative sessions.",
  },
  {
    q: 'Is Sticky Business worth buying on Switch or PC? What is the gameplay loop?',
    a: "Sticky Business (2023) is worth buying for players who enjoy craft aesthetics, small-batch goods culture, and the specific satisfaction of packing an order perfectly. The core loop is: design sticker sheets using provided element libraries and color palettes, receive customer orders (each customer has specific preferences and a personality that develops over time), select the right sticker designs to fulfill each order, and then package it with matching tissue paper, extra stickers, and tape. The packaging mini-activity is tactile and meditative — each package becomes a small act of care. Customers leave reviews that affect your shop reputation, and their character emerges through repeat orders. At about 10-15 hours for the full story and $15 on PC and Switch, it is one of the most specifically-targeted cozy games of recent years. Excellent value for the audience it is designed for. Less suitable for players who want deep resource management or challenge.",
  },
  {
    q: 'Is Cocoon worth playing? Is it on Xbox Game Pass?',
    a: "Yes, Cocoon is on Xbox Game Pass (as of 2024) and is worth every minute of its 5-7 hour runtime. Created by Jeppe Carlsen (the lead gameplay designer of Limbo and Inside), Cocoon uses a mechanic that has genuinely never been done before at this level of sophistication: orbs that contain entire worlds, which you can pick up and carry, and then enter. The puzzle loop involves nesting orbs within orbs and using the internal properties of each world to affect the outer world — building bridges between worlds using mechanics discovered inside other worlds. The elegance is that the game never explains these rules: you discover them by playing, and each discovery is immediately satisfying. The art direction is bioluminescent and alien — a world of glowing beetles, curved organic architecture, and strange technology. Bosses mark the end of each world segment; they are puzzle-based, not action-based. BAFTA Best Game nomination 2023. Developed by Geometric Interactive. On PC, Switch, PlayStation, and Xbox.",
  },
  {
    q: 'Is Viewfinder worth it on PS5 or PC? How does the photography mechanic work?',
    a: "Viewfinder (2023) is worth it for players who love original mechanics and are comfortable with moderate puzzle challenge. The photography mechanic works as follows: you find polaroid photos (or take your own with a provided camera) that show environments. You can hold a photo up in 3D space and then press a button to 'place' it — at which point the flat photo becomes real 3D geometry that you can walk on, into, and through. If the photo shows a bridge, you can walk on that bridge. If it shows a building, you can enter it. This means you can take a photo from an overhead angle to create elevated platforms where there were none, or photograph a section of an already-placed photo to create recursive geometry. Puzzles ask you to use this to reach power cores. The game is 5-7 hours on PlayStation and PC (not currently on Switch). Multiple innovation awards in 2023. Developed by Sad Owl Studios. If you loved Portal for its spatial puzzle originality but want something warmer and less punishing, Viewfinder operates in a similar space.",
  },
  {
    q: 'What are the most original and creative cozy games released in 2023 and 2024?',
    a: "The most mechanically original cozy/indie games of 2023-2024: (1) Tiny Glade (2024, PC) — procedural castle diorama builder where every element adapts in real time, no objectives; (2) Cocoon (2023, all platforms) — worlds nested inside orbs nested inside worlds, from the Limbo creator; (3) Viewfinder (2023, PC/PS5) — take photos and place them in 3D space to create real geometry; (4) Sticky Business (2023, PC/Switch) — sticker design + shop sim with genuine character and packaging satisfaction; (5) Botany Manor (2024, PC/Xbox/Game Pass) — Victorian botany puzzle game about helping plants bloom; (6) Balatro (2024, all platforms) — poker roguelike that won Game of the Year 2024; (7) Rusty's Retirement (2024, PC) — cozy idle farm that runs in a taskbar strip while you work; (8) Fields of Mistria (2024, PC Early Access) — Stardew-style farming with fresh medieval art and storytelling. Take the 2023-2024 Creative Cozy Quiz to find which of the most original recent releases matches your specific creative style.",
  },
]

const FAQ_ZH = [
  {
    q: 'Tiny Glade 值得买吗？在 Tiny Glade 里你具体做什么？',
    a: 'Tiny Glade 对于任何曾经想要没有目标、没有资源管理和没有失败状态的 cozy 建造游戏的人来说，15 美元值得。你使用一套工具在小景观中放置石墙、塔楼、屋顶、窗户、门、拱门、长椅、灯笼、水景、花卉、常青藤和树木——每个元素在你放置时程序性适应。墙壁在阴影区域长苔藓。屋顶根据坡度和材料铺设。常青藤自动攀爬附近的表面。程序细节生成意味着即使是简单的结构在截图中也看起来像绘画一般美丽。Tiny Glade 在 2024 年初走红，当时 demo 视频片段展示了这种动态效果——玩家实时建造小屋的片段在社交平台上积累了数百万次观看。根据你想花多长时间（没有终点），1-15 小时，性价比极高。2024 年 9 月由 Pounce Light 发布。仅限 PC（Steam）。非常适合短暂的创意游戏。',
  },
  {
    q: 'Sticky Business 在 Switch 或 PC 上值得购买吗？游戏循环是什么？',
    a: 'Sticky Business（2023 年）对于喜欢工艺美学、小批量商品文化以及完美打包订单的特定满足感的玩家来说值得购买。核心循环是：使用提供的元素库和调色板设计贴纸表格，接收客户订单（每个客户都有特定偏好和随时间发展的个性），选择正确的贴纸设计来完成每个订单，然后用匹配的薄纸、额外贴纸和胶带包装。包装小活动在触觉上是冥想式的——每个包裹都成为一个小小的关怀行为。客户留下影响你店铺声誉的评价，他们的角色通过重复订单显现。完整故事约 10-15 小时，PC 和 Switch 上 15 美元，是近年来最具针对性的 cozy 游戏之一。对其设计的受众来说性价比极高。不太适合想要深度资源管理或挑战的玩家。',
  },
  {
    q: 'Cocoon 值得玩吗？它在 Xbox Game Pass 上有吗？',
    a: '是的，Cocoon 在 Xbox Game Pass 上（截至 2024 年），值得花 5-7 小时的每一分钟。由 Jeppe Carlsen（Limbo 和 Inside 的首席游戏设计师）创作，Cocoon 使用了一种在这种复杂程度上从未被完成过的机制：包含整个世界的球体，你可以拾取并携带，然后进入。谜题循环涉及将球体嵌套在球体内，并使用每个世界的内部属性影响外部世界——使用在其他世界内发现的机制在世界之间建立桥梁。优雅之处在于游戏从不解释这些规则：你通过玩耍发现它们，每个发现都立即令人满足。艺术指导是生物发光的和异域的——一个发光甲虫、弯曲有机建筑和奇异技术的世界。Boss 标记每个世界段的结束；它们是基于谜题的，而不是基于动作的。2023 年 BAFTA 最佳游戏提名。由 Geometric Interactive 开发。PC、Switch、PlayStation 和 Xbox 均可。',
  },
  {
    q: 'Viewfinder 在 PS5 或 PC 上值得吗？摄影机制是如何工作的？',
    a: 'Viewfinder（2023 年）对于喜欢原创机制且对中等谜题挑战感到舒适的玩家来说值得。摄影机制的工作方式如下：你找到宝丽来照片（或用提供的相机拍摄自己的照片）显示环境。你可以在三维空间中举起照片，然后按一个按钮"放置"它——此时平面照片变成你可以走过、进入和穿过的真实三维几何形状。如果照片显示一座桥，你可以在那座桥上行走。如果它显示一栋建筑，你可以进入它。这意味着你可以从俯视角度拍摄照片来在没有平台的地方创建高架平台，或者为已经放置的照片的一个部分拍照以创建递归几何形状。谜题要求你使用这个方法到达电源核心。PlayStation 和 PC 上 5-7 小时（目前在 Switch 上没有）。2023 年多个创新奖项。由 Sad Owl Studios 开发。如果你喜欢 Portal 的空间谜题原创性，但想要更温暖、惩罚性更低的东西，Viewfinder 在类似的空间中运作。',
  },
  {
    q: '2023 年和 2024 年最具原创性和创意的 Cozy 游戏有哪些？',
    a: '2023-2024 年最具机制原创性的 cozy/独立游戏：(1) Tiny Glade（2024，PC）——程序生成城堡立体场景构建器，每个元素实时适应，无目标；(2) Cocoon（2023，全平台）——球体内嵌套球体内嵌套世界，来自 Limbo 创作者；(3) Viewfinder（2023，PC/PS5）——拍摄照片并将其放置在三维空间中以创建真实几何形状；(4) Sticky Business（2023，PC/Switch）——贴纸设计+小店模拟，有真实角色塑造和包装满足感；(5) 植物庄园（2024，PC/Xbox/Game Pass）——维多利亚时代植物学谜题游戏，关于帮助植物绽放；(6) Balatro（2024，全平台）——赢得 2024 年年度游戏的扑克 roguelike；(7) Rusty 的退休生活（2024，PC）——在任务栏条中运行的 cozy 放置农场；(8) Fields of Mistria（2024，PC 抢先体验）——带新鲜中世纪艺术风格和叙事的星露谷风格农耕。做「2023-2024 创意 Cozy 测验」，找出最近最具原创性的哪款与你特定的创意风格匹配。',
  },
]

export default async function CozyCreative2024Page({
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
            {isZh ? '2024 创意 Cozy 推荐测验' : '2024 Creative Cozy Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyCreative2024Quiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '最好的新游戏不是做旧事更好——是做你以为不可能的新事。2024 年这四款游戏都是例证。'
            : 'The best new games don\'t do old things better — they do things you didn\'t think were possible. These four are the proof from 2023-2024.'}
        </p>

        <RelatedQuizzes currentSlug="cozy-creative-2024" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '2024 创意 Cozy 游戏常见问题' : '2023-2024 Creative Cozy Games FAQ'}
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
