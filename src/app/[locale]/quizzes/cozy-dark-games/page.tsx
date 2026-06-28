import { CozyDarkQuiz } from '@/components/tools/CozyDarkQuiz'
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
      ? '暗色系 Cozy 游戏测验 — Dave the Diver、羔羊邪教、Dredge 还是 Potion Craft？'
      : 'Which Dark Cozy Game Should You Play? Dave the Diver, Cult of the Lamb, Dredge, or Potion Craft?',
    description: isZh
      ? '6 个问题，在有黑暗主题的 cozy 游戏中找到最适合你的。覆盖 Dave the Diver、羔羊邪教、Dredge 和 Potion Craft——四款在可爱外表下拥有阴暗内核的游戏。'
      : "6 questions to find which 'not quite cozy' game is right for you — Dave the Diver, Cult of the Lamb, Dredge, or Potion Craft. Games that pair beautiful aesthetics with dark themes, moral complexity, or genuine tension.",
    keywords: isZh
      ? ['暗色系 cozy 游戏推荐', 'Dave the Diver 值得玩吗', '羔羊邪教值得玩吗', 'Dredge 游戏评测', 'Potion Craft 炼金师模拟器', '有黑暗主题的 cozy 游戏', '星露谷之外的暗黑系游戏']
      : [
          'cozy games with dark themes',
          'dark cozy games',
          'dave the diver worth it',
          'is cult of the lamb worth it',
          'dredge game review worth buying',
          'potion craft alchemist simulator review',
          'cozy games that are not actually cozy',
          'games like stardew valley but darker',
          'cozy horror games',
          'cult of the lamb vs dave the diver',
          'dredge vs spiritfarer',
          'dark aesthetic cozy games 2025',
          'best dark cozy games switch',
          'relaxing games with dark atmosphere',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-dark-games`,
      languages: buildLanguageAlternates('/quizzes/cozy-dark-games'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Dave the Diver worth buying?',
    a: "Yes — Dave the Diver is one of the most unexpectedly excellent games released in recent years. It has an 'Overwhelmingly Positive' rating on Steam with over 100,000 reviews. Despite looking like a small indie fishing game, Dave the Diver has a full action-adventure story with plot twists, a cast of memorable characters, multiple gameplay modes, and production quality that rivals games with budgets 10× its size. The core loop — dive during the day to catch fish, run a sushi restaurant at night — sounds simple but becomes deeply satisfying and surprisingly high-stakes. Available on PC (Steam), Nintendo Switch, and PlayStation. Typically goes on sale for around $10-12 USD. Most players report it as one of their favorite gaming experiences of the year.",
  },
  {
    q: 'Is Cult of the Lamb actually disturbing? How dark is it?',
    a: "Cult of the Lamb is 'dark' in a whimsical, storybook way — not gory or horror-scary. The art style is deliberately cute: round animals, bright colors, cheerful animations. The content is genuinely dark by nature — you are literally building and managing a cult, sacrificing followers, suppressing dissenters, and performing dark rituals — but the game frames this through a fairytale aesthetic that makes it feel more like a dark children's book than a horror game. There is some stylized violence in the roguelike combat sections, but nothing realistic or gory. Most players over 13 handle the content comfortably. The game received an M/Mature rating in some regions primarily for the cult themes and mild violence, not disturbing imagery.",
  },
  {
    q: 'What kind of game is Dredge? Is it scary?',
    a: "Dredge is a fishing game with Lovecraftian horror elements — but it is atmospheric and unsettling rather than jump-scary or gory. During the day, you sail between small island towns, catch fish using satisfying puzzle-grid mechanics, sell them at docks, and upgrade your boat. At night, the sea becomes dangerous: your sanity (panic) meter rises, causing increasingly disturbing hallucinations, and the fish you catch become stranger and more wrong. The game builds dread through implication, environment, and the gradually revealed lore — not through monsters jumping at you. Players who love atmospheric fiction (The Southern Reach trilogy, Annihilation, classic Lovecraft) tend to find it deeply satisfying. Those who want a pure cozy fishing game without any darkness should look at Dave the Diver or Stardew Valley instead.",
  },
  {
    q: 'What is Potion Craft: Alchemist Simulator? How do you play it?',
    a: "Potion Craft is a crafting puzzle game set in a medieval alchemist's shop. The core mechanic is unique: instead of a crafting grid, you have a 'potion map' — a complex diagram representing all possible potion effects. You place ingredients on this map and they physically move your position through it, guiding you toward your target effect. Different ingredients move you in different directions and distances, so brewing is about finding the right path through the map to combine effects. Customers visit your shop with requests (a merchant wants a speed potion, a farmer wants something for sick crops) and you choose how to fulfill them — with full, partial, or overpriced solutions. The moral dimension comes from some customers' ambiguous intentions. The game has a very relaxing, ASMR-like pace for most sessions. Available on PC (Steam), Nintendo Switch, PlayStation, and Xbox.",
  },
  {
    q: 'What are good cozy games with dark themes or dark aesthetics for 2025?',
    a: "The best 'dark cozy' games for 2025 are: (1) Dredge — fishing + Lovecraftian cosmic horror, the most atmospheric; (2) Cult of the Lamb — adorable cult management + roguelike, dark whimsy; (3) Dave the Diver — ocean diving + restaurant empire, dark in tone and stakes but not in aesthetic; (4) Potion Craft: Alchemist Simulator — alchemy puzzle with moral choices, the subtlest; (5) Spiritfarer — a wholesome game about death and grief, emotionally heavy but deeply kind; (6) Hades — roguelike dungeon crawler with family drama, exceptional story. If you want cozy games that aren't at all dark, Stardew Valley, Animal Crossing: New Horizons, and Palia are the safest choices. If you want darker games that are still manageable, Dredge and Cult of the Lamb hit the sweet spot most often recommended by the r/CozyGamers community.",
  },
]

const FAQ_ZH = [
  {
    q: 'Dave the Diver 值得购买吗？',
    a: 'Dave the Diver 是近年来最出人意料的优秀游戏之一，在 Steam 上拥有"极度好评"评价，超过 10 万条评论。尽管看起来像是一款小型独立钓鱼游戏，但它拥有完整的动作冒险故事和情节转折、令人难忘的角色阵容、多种游戏模式，以及媲美预算高出 10 倍游戏的制作质量。核心循环——白天潜水捕鱼、晚上经营寿司餐厅——听起来简单，但变得非常令人满足且出人意料地高风险。可在 PC（Steam）、Nintendo Switch 和 PlayStation 上获取。通常在打折时约 10-12 美元。大多数玩家将其列为年度最佳游戏体验之一。',
  },
  {
    q: '羔羊邪教真的令人不安吗？它有多黑暗？',
    a: '羔羊邪教的"黑暗"是以奇想、故事书的方式呈现的——不是血腥或令人恐惧的。美术风格故意设计得很可爱：圆润的动物、明亮的颜色、欢快的动画。内容在本质上确实很黑暗——你实际上在建立和管理一个邪教，牺牲追随者，压制异见者，并进行黑暗仪式——但游戏通过童话美学来框架这一切，使其感觉更像黑暗童书而不是恐怖游戏。roguelike 战斗部分有一些程式化的暴力，但没有任何写实或血腥的内容。大多数 13 岁以上的玩家能轻松处理这些内容。游戏在某些地区获得 M/成熟评级，主要是因为邪教主题和轻微暴力，而不是令人不安的图像。',
  },
  {
    q: 'Dredge 是什么类型的游戏？它吓人吗？',
    a: 'Dredge 是一款带有洛夫克拉夫特恐怖元素的钓鱼游戏——但它是充满氛围和令人不安的，而不是突然惊吓或血腥的。白天，你在小岛镇之间航行，用令人满足的谜题格子机制捕鱼，在码头卖鱼，升级你的船。夜晚，海洋变得危险：你的理智（恐慌）值上升，导致越来越令人不安的幻觉，你捕到的鱼变得更奇怪和更不对劲。游戏通过暗示、环境和逐渐揭示的背景故事来营造恐惧——而不是通过怪物突然跳出来吓你。喜欢氛围性虚构作品（南境巡逻三部曲、湮灭、经典洛夫克拉夫特）的玩家往往会觉得它非常令人满足。那些想要纯粹温馨钓鱼游戏而没有任何黑暗元素的玩家应该转而考虑 Dave the Diver 或星露谷物语。',
  },
  {
    q: 'Potion Craft: 炼金师模拟器是什么游戏？怎么玩？',
    a: 'Potion Craft 是一款设置在中世纪炼金师商店的制作谜题游戏。核心机制独一无二：你不是用制作格子，而是有一张"药水地图"——一个代表所有可能药水效果的复杂图表。你将材料放置在这张地图上，它们在地图中物理移动你的位置，引导你走向目标效果。不同材料将你朝不同方向和距离移动，所以酿造是关于在地图中找到正确路径来组合效果的。顾客带着请求来到你的商店（商人想要速度药水，农民想要治疗生病作物的东西），你选择如何满足他们——完整、部分或过高收费的解决方案。道德维度来自一些顾客的模糊意图。游戏在大多数游戏时间里有非常放松的 ASMR 式节奏。可在 PC（Steam）、Nintendo Switch、PlayStation 和 Xbox 上获取。',
  },
  {
    q: '2025 年有哪些有黑暗主题或黑暗美学的 cozy 游戏推荐？',
    a: '2025 年最佳"暗色系 cozy"游戏是：(1) Dredge——钓鱼 + 洛夫克拉夫特宇宙恐怖，氛围最浓；(2) 羔羊邪教——可爱邪教管理 + roguelike，黑暗异想；(3) Dave the Diver——海洋潜水 + 餐厅帝国，在基调和风险上很黑暗，但美学上不是；(4) Potion Craft: 炼金师模拟器——有道德选择的炼金谜题，最微妙的；(5) Spiritfarer——一款关于死亡和悲伤的温馨游戏，情感上沉重但深度善良；(6) 哈迪斯——有家庭剧情的 roguelike 地下城爬虫，故事出色。如果你想要完全不黑暗的 cozy 游戏，星露谷物语、动物之森和 Palia 是最安全的选择。如果你想要仍然可控的较黑暗游戏，Dredge 和羔羊邪教是 r/CozyGamers 社区最常推荐的甜蜜点。',
  },
]

export default async function CozyDarkGamesPage({
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
            {isZh ? '暗色系 Cozy 游戏测验' : 'Dark Cozy Games Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyDarkQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '最好的游戏往往不是最安全的——有时候，恰到好处的黑暗让体验更难忘。'
            : 'The best games are often not the safest — sometimes the right amount of darkness makes an experience unforgettable.'}
        </p>

        <RelatedQuizzes currentSlug="cozy-dark-games" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '暗色系 Cozy 游戏常见问题' : 'Dark Cozy Games FAQ'}
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
