import { PaliaStarterQuiz } from '@/components/tools/PaliaStarterQuiz'
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
      ? 'Palia 新手测验：你该从哪里开始？— 园艺 / 狩猎 / 社交 / 制作攻略'
      : 'Palia Beginner Quiz: What Should You Focus On First? — Gardening vs Hunting vs Social vs Crafting Guide',
    description: isZh
      ? '6 个问题，找出最适合你的 Palia 起点——园艺、狩猎、社交还是制作？每个结果含专属新手攻略。'
      : '6 questions to find your Palia beginner focus — Gardening, Hunting, Friendships, or Crafting. Each result includes 3 beginner tips for your path.',
    keywords: isZh
      ? ['Palia 新手攻略', 'Palia 怎么开始', 'Palia 免费吗', 'Palia 攻略', 'Palia 测验', 'Palia 是什么', 'Palia 和星露谷', 'Palia 2025']
      : [
          'palia tips for beginners',
          'palia what to do first',
          'is palia free',
          'palia beginner guide',
          'palia starter tips',
          'palia gardening guide',
          'palia hunting guide',
          'palia crafting tips',
          'palia review 2025',
          'palia vs stardew valley',
          'palia free to play guide',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/palia-beginner-guide`,
      languages: buildLanguageAlternates('/quizzes/palia-beginner-guide'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Palia free to play?',
    a: "Yes — Palia is completely free to download and play on PC (Epic Games Store and Steam) and Nintendo Switch. There are no energy timers, no forced ads, and no pay-to-win mechanics. The core game — including all farming, hunting, crafting, housing, and character friendship systems — is fully accessible without spending money. Optional purchases include cosmetic items (clothing, furniture skins, house exterior decorations) available through the in-game Palia Store, and a Premium Membership that provides a monthly cosmetic currency allowance. Palia has received strong praise for having one of the fairest free-to-play models in the cozy genre.",
  },
  {
    q: 'What should I do first in Palia as a beginner?',
    a: "As a Palia beginner, focus on: (1) Complete the starter quests — they unlock your plot, introduce the core NPC cast, and teach the basic systems at a comfortable pace. (2) Build your first Worktable and Plant Station as early as possible — these unlock crafting and gardening, the two most consistently useful skill trees. (3) Start your first garden with easy crops like tomatoes or potatoes — gardening is the best early gold source. (4) Talk to every NPC every day — daily conversations give friendship points and eventually unlock character quests. (5) Don't rush — Palia has no seasons or time pressure; you can explore at your own pace.",
  },
  {
    q: 'Is Palia similar to Stardew Valley?',
    a: "Palia shares Stardew Valley's cozy farming genre DNA — both involve farming, fishing, foraging, crafting, and building relationships with NPCs. However, key differences: Palia is a multiplayer online game (MMO-lite) where you share a server with real players, while Stardew Valley is primarily single-player. Palia has no seasonal pressure — time passes but there are no crop-killing winters. Palia's housing plot system is the most advanced of the two. Palia is free; Stardew Valley costs ~$15. Palia's story and NPC writing are considered strong; Stardew's depth of gameplay systems is considered deeper. Many players enjoy both.",
  },
  {
    q: 'What platforms is Palia available on?',
    a: "Palia is available on PC via the Epic Games Store (direct download), Steam, and Nintendo Switch. All three versions are free to play. The PC and Switch versions share the same game world and updates, though cross-platform play between PC and Switch is not available — players on each platform play in their own servers. The PC version generally has better performance and graphics fidelity. The Switch version launched in December 2023 and supports handheld mode. A PlayStation or Xbox version has not been announced as of 2025.",
  },
  {
    q: 'How does Palia make money if it is free?',
    a: "Palia is monetized through optional cosmetic purchases only — this is widely regarded as one of the fairest free-to-play models. Revenue comes from: the Palia Store (real-money cosmetic items including clothing, furniture skins, and decorative items), the Premium Membership subscription (~$10/month) which gives a monthly allowance of Palia Coins (the premium currency), and seasonal cosmetic packages. No gameplay advantage, additional content, crafting recipes, character storylines, or farming systems are locked behind payment. All story content, character relationships, farming, hunting, crafting, and housing are fully free.",
  },
]

const FAQ_ZH = [
  {
    q: 'Palia 是免费游戏吗？',
    a: '是的——Palia 在 PC（Epic Games Store 和 Steam）和 Nintendo Switch 上完全免费下载和游玩。没有体力计时器、没有强制广告、没有付费赢的机制。核心游戏——包括所有农业、狩猎、制作、住宅和角色友谊系统——无需花钱就可以完全体验。可选购买包括通过游戏内 Palia 商店提供的外观物品（服装、家具皮肤、房屋外观装饰），以及提供每月外观货币额度的高级会员资格。Palia 因拥有 cozy 游戏类型中最公平的免费游玩模式之一而受到广泛赞誉。',
  },
  {
    q: 'Palia 新手应该先做什么？',
    a: '作为 Palia 新手，专注于：（1）完成新手任务——它们解锁你的地块、以舒适的节奏介绍核心 NPC 阵容和教授基础系统。（2）尽早建造你的第一个工作台和种植台——它们解锁制作和园艺，这是两个最持续有用的技能树。（3）用简单的作物如西红柿或土豆开始你的第一个花园——园艺是最好的早期赚钱来源。（4）每天和每个 NPC 交谈——每日对话给予友谊点数，最终解锁角色任务。（5）不要着急——Palia 没有季节或时间压力；你可以按自己的节奏探索。',
  },
  {
    q: 'Palia 和星露谷物语相似吗？',
    a: 'Palia 与星露谷物语共享 cozy 农场游戏类型的 DNA——两者都涉及农业、钓鱼、采集、制作和与 NPC 建立关系。然而，主要区别：Palia 是一款多人在线游戏（轻度 MMO），你与真实玩家共享服务器，而星露谷物语主要是单人游戏。Palia 没有季节压力——时间流逝但没有摧毁作物的冬天。Palia 的住宅地块系统是两者中最先进的。Palia 免费；星露谷物语约 100 元人民币。Palia 的故事和 NPC 写作被认为很强；星露谷的游戏系统深度被认为更深。许多玩家两者都喜欢。',
  },
  {
    q: 'Palia 在哪些平台上可以玩？',
    a: 'Palia 可在 PC（通过 Epic Games Store 直接下载）、Steam 和 Nintendo Switch 上获得。三个版本都是免费游玩。PC 版和 Switch 版共享同一个游戏世界和更新，但 PC 和 Switch 之间的跨平台游戏不可用——每个平台上的玩家在各自的服务器上游玩。PC 版通常有更好的性能和图形保真度。Switch 版于 2023 年 12 月发布，支持掌机模式。截至 2025 年，PlayStation 或 Xbox 版本尚未公布。',
  },
  {
    q: 'Palia 是免费游戏，它怎么赚钱？',
    a: 'Palia 仅通过可选的外观购买来变现——这被广泛认为是最公平的免费游玩模式之一。收入来自：Palia 商店（包括服装、家具皮肤和装饰物品在内的真实货币外观物品）、高级会员订阅（约 70 元/月），提供每月 Palia 金币额度（高级货币），以及季节性外观套装。没有任何游戏优势、额外内容、制作配方、角色故事线或农业系统锁在付费后面。所有故事内容、角色关系、农业、狩猎、制作和住宅完全免费。',
  },
]

export default async function PaliaBeginnerGuidePage({
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
            {isZh ? 'Palia 新手测验' : 'Palia Beginner Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <PaliaStarterQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? 'Palia 是一个没有终点线的游戏——最好的起点，就是你最想去的地方。'
            : "Palia has no finish line — the best starting point is wherever you most want to be."}
        </p>

        <RelatedQuizzes currentSlug="palia-beginner-guide" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? 'Palia 常见问题' : 'Palia FAQ'}
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
