import { CozyNew2024Quiz } from '@/components/tools/CozyNew2024Quiz'
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
      ? '2024 年最佳新 Cozy 游戏测验 — 植物庄园、Rusty 的退休生活、Mistria 的田野还是 Hinterberg 的地下城？'
      : 'Which New 2024 Cozy Game Should You Play? Botany Manor, Rusty\'s Retirement, Fields of Mistria, or Dungeons of Hinterberg?',
    description: isZh
      ? '6 个问题，在 2024 年发布的四款最佳 Cozy 游戏中找到最适合你的——从 3 小时植物谜题到无限放置农场，从星露谷式农耕到 Cozy 动作 RPG。'
      : '6 questions to find your 2024 cozy game match — a 3-hour botany puzzle masterpiece, an idle farm on your taskbar, a Stardew-successor farming sim, or a cozy action RPG in the Austrian Alps.',
    keywords: isZh
      ? ['2024 最佳新 cozy 游戏推荐', '植物庄园评测值得买吗', 'Rusty 的退休生活评测', 'Mistria 的田野抢先体验值得买吗', 'Hinterberg 的地下城评测', '2024 年 cozy 游戏新作推荐', '2024 独立 cozy 游戏排行']
      : [
          'best new cozy games 2024',
          'botany manor review worth it',
          'botany manor game pass worth playing',
          "rusty's retirement review worth it",
          "rusty's retirement idle farm game",
          'fields of mistria early access worth buying',
          'fields of mistria stardew valley alternative',
          'dungeons of hinterberg review worth it',
          'dungeons of hinterberg game pass',
          'cozy indie games 2024 worth playing',
          'best cozy game releases 2024',
          'new farming games 2024',
          'best short cozy games 2024',
          'cozy games on xbox game pass 2024',
          'cozy action rpg games 2024',
          'games like stardew valley released 2024',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-new-2024`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes/cozy-new-2024`,
        [other]: `${BASE_URL}/${other}/quizzes/cozy-new-2024`,
      },
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Botany Manor worth it? How long is the game?',
    a: "Botany Manor is absolutely worth it, especially if you have Xbox Game Pass — it's included at no extra cost on Game Pass, making it essentially free to try. On Steam or GOG it costs about $20. The game is about 3 hours for a careful playthrough where you read all the documents and take time to experiment. Speedrunners finish it in under 90 minutes; completionists who find every collectible and read every letter take 4-5 hours. The puzzle design is exceptional — each plant is a distinct puzzle that requires synthesizing clues from scattered documents around the manor. The game was BAFTA nominated in 2024 and appeared on numerous Game of the Year lists for short games. For players who love the satisfaction of a puzzle clicking into place, it is one of the best short cozy games made in recent years.",
  },
  {
    q: "What is Rusty's Retirement and is it worth buying?",
    a: "Rusty's Retirement is a unique idle farming game designed to run in a horizontal strip at the bottom of your computer screen while you work on other things. You manage a small farm of robot workers (Rustys) who automatically harvest crops, gather wood, mine, and process resources. You check in occasionally to upgrade their systems, plant new crops, and expand the farm. The game has no sound (respects your work focus), no time pressure, and runs at any screen size. At $7 on Steam, it's one of the most reasonably priced creative concepts of 2024. The core appeal is the 'companion game' format — it satisfies the cozy gaming itch without requiring you to sit down for a dedicated session. Players frequently report it becoming a beloved background presence during work-from-home days. Best suited for PC users who multitask.",
  },
  {
    q: 'Is Fields of Mistria worth buying in Early Access? Is it close to Stardew Valley?',
    a: "Fields of Mistria entered Early Access in July 2024 at about $18 and is widely considered one of the most promising Stardew Valley-adjacent games released in years. The comparison to Stardew Valley is accurate in structure — farming, mining, fishing, gifting NPCs, dungeon combat, seasonal crops — but the setting is medieval fantasy anime-adjacent rather than contemporary small-town. The art is genuinely beautiful with vibrant colors and expressive character portraits. The NPC writing has received strong praise. The game is in Early Access, which means not all content is complete — some later story content, NPCs, and areas are not yet available. However, most players report 60-100+ hours of content already available. Developer NPC Studio updates regularly. For Stardew fans who want the familiar rhythm with fresh characters and world, Fields of Mistria is the strongest 2024 recommendation.",
  },
  {
    q: 'What is Dungeons of Hinterberg? Is it on Game Pass?',
    a: "Dungeons of Hinterberg is a cozy action RPG set in a fictional Austrian mountain town called Hinterberg, where magical dungeons have appeared across the Alps and become a tourist attraction. You play as Luisa, a burned-out young lawyer taking a working vacation to challenge the dungeons. During the day you explore puzzle-heavy dungeons with action combat using different magic abilities; in the evenings you socialize with townspeople and fellow adventurers at restaurants, shops, and inns. The social simulation and the action dungeon-crawling are both more substantial than you'd expect from either description alone. The game is about 25-40 hours for a complete playthrough. Yes — Dungeons of Hinterberg is available on Xbox Game Pass, making it accessible at no extra cost for Game Pass subscribers. It is also on Steam and GOG for about $25.",
  },
  {
    q: 'What are the best cozy games released in 2024 overall?',
    a: "The standout cozy games of 2024 are: Botany Manor (PC/Xbox/Game Pass, April 2024) — the best short cozy puzzle game of the year; Rusty's Retirement (PC/Steam, April 2024) — the most creative cozy concept of the year (idle farm on your taskbar); Fields of Mistria (PC/Steam Early Access, July 2024) — the best Stardew Valley-adjacent farming sim released since Stardew itself; Dungeons of Hinterberg (PC/Xbox/Game Pass, July 2024) — the best cozy + action RPG hybrid of the year; Balatro (all platforms, February 2024) — won multiple Game of the Year awards, poker-based roguelike; and WEBFISHING (PC, October 2024) — viral multiplayer fishing phenomenon that costs $5. Most of the biggest cozy game releases of 2024 are available on Xbox Game Pass, making it an excellent platform for cozy game fans. Take the Which New 2024 Cozy Game quiz to find the best match for your specific playstyle.",
  },
]

const FAQ_ZH = [
  {
    q: '植物庄园值得买吗？游戏有多长？',
    a: '植物庄园绝对值得，尤其是如果你有 Xbox Game Pass——它作为免费内容包含在 Game Pass 中，让你几乎可以免费尝试。在 Steam 或 GOG 上售价约 20 美元。这款游戏仔细通关（阅读所有文件并花时间实验）大约需要 3 小时。速通玩家在 90 分钟内完成；找到每个收藏品并阅读每封信的完美主义者需要 4-5 小时。谜题设计非常出色——每株植物都是一个独特的谜题，需要综合散落在庄园各处文件中的线索。这款游戏在 2024 年获得 BAFTA 提名，并出现在许多短游戏年度最佳列表上。对于喜欢谜题豁然开朗满足感的玩家来说，这是近年来制作的最好的短篇 cozy 游戏之一。',
  },
  {
    q: "Rusty 的退休生活是什么游戏？值得买吗？",
    a: "Rusty 的退休生活是一款独特的放置农场游戏，专为在你做其他事情时在电脑屏幕底部的水平条形区域运行而设计。你管理一个自动收获作物、采集木材、开矿和处理资源的机器人工人（Rusty）小农场。你偶尔登录来升级它们的系统、种植新作物和扩展农场。这款游戏没有声音（尊重你的工作专注度）、没有时间压力，可以在任何屏幕尺寸下运行。Steam 上 7 美元，是 2024 年最合理定价的创意概念之一。核心吸引力是'伴侣游戏'格式——它满足了 cozy 游戏的渴望，而不需要你坐下来专门游戏。玩家经常报告它在居家办公日成为一个受喜爱的背景存在。最适合需要多任务处理的 PC 用户。",
  },
  {
    q: 'Mistria 的田野抢先体验值得买吗？它接近星露谷物语吗？',
    a: 'Mistria 的田野于 2024 年 7 月以约 18 美元进入抢先体验，被广泛认为是近年来发布的最有前途的类星露谷游戏之一。与星露谷物语的比较在结构上是准确的——农耕、开矿、钓鱼、赠送礼物给 NPC、地下城战斗、季节性作物——但设定是中世纪奇幻动漫风格而非当代小镇。美术非常漂亮，有鲜艳的色彩和富有表情的角色肖像。NPC 写作获得了强烈好评。这款游戏处于抢先体验阶段，这意味着并非所有内容都已完成——一些后续故事内容、NPC 和地区尚未开放。然而，大多数玩家报告已有 60-100 多小时的内容。开发商 NPC Studio 定期更新。对于想要熟悉节奏配以新角色和世界的星露谷粉丝来说，Mistria 的田野是 2024 年最强推荐。',
  },
  {
    q: 'Hinterberg 的地下城是什么游戏？它在 Game Pass 上吗？',
    a: 'Hinterberg 的地下城是一款设定在虚构奥地利山区小镇 Hinterberg 的 cozy 动作 RPG，那里的阿尔卑斯山各地出现了魔法地下城并成为旅游景点。你扮演路易莎，一位精疲力竭的年轻律师，来度一个工作假期挑战地下城。白天你用不同魔法能力探索以谜题为主的地下城，进行动作战斗；晚上你与镇民和其他冒险者在餐馆、商店和旅馆中交往。社交模拟和动作地下城探索都比描述中预期的要丰富。完整通关大约需要 25-40 小时。是的——Hinterberg 的地下城可在 Xbox Game Pass 上获取，让 Game Pass 订阅者无需额外费用即可使用。它也在 Steam 和 GOG 上，售价约 25 美元。',
  },
  {
    q: '2024 年总体上最好的 Cozy 游戏有哪些？',
    a: '2024 年最突出的 cozy 游戏是：植物庄园（PC/Xbox/Game Pass，2024 年 4 月）——年度最佳短篇 cozy 谜题游戏；Rusty 的退休生活（PC/Steam，2024 年 4 月）——年度最具创意的 cozy 概念（任务栏上的放置农场）；Mistria 的田野（PC/Steam 抢先体验，2024 年 7 月）——自星露谷本身以来发布的最佳类星露谷农场模拟；Hinterberg 的地下城（PC/Xbox/Game Pass，2024 年 7 月）——年度最佳 cozy + 动作 RPG 混合；Balatro（全平台，2024 年 2 月）——赢得多个年度最佳游戏奖，基于扑克的 roguelike；以及 WEBFISHING（PC，2024 年 10 月）——病毒式多人钓鱼现象，5 美元。2024 年最大的 cozy 游戏发布大多可在 Xbox Game Pass 上获取，使其成为 cozy 游戏粉丝的绝佳平台。做「2024 最佳新 Cozy 游戏测验」，找到最适合你特定游戏风格的游戏。',
  },
]

export default async function CozyNew2024Page({
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
            {isZh ? '2024 最佳新 Cozy 游戏测验' : '2024 New Cozy Games Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyNew2024Quiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '2024 年的 Cozy 游戏证明了：最好的放松体验不是把游戏做大，而是把它做对。'
            : 'The cozy games of 2024 proved that the best relaxing experiences are not about making games bigger — they are about making them exactly right.'}
        </p>

        <RelatedQuizzes currentSlug="cozy-new-2024" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '2024 新 Cozy 游戏常见问题' : '2024 New Cozy Games FAQ'}
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
