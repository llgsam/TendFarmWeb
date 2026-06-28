import { CozySwitchQuiz } from '@/components/tools/CozySwitchQuiz'
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
      ? '你该在 Switch 上玩哪款 Cozy 游戏？— 星露谷 / 动物之森 / Spiritfarer / Dreamlight Valley 推荐测验'
      : 'Which Cozy Game Should You Play on Nintendo Switch? — Stardew Valley vs Animal Crossing vs Spiritfarer vs Dreamlight Valley Quiz',
    description: isZh
      ? '6 个问题，从星露谷物语、动物之森新视野、Spiritfarer、Disney Dreamlight Valley 中找到最适合你的 Switch cozy 游戏。'
      : '6 questions to find your perfect cozy Nintendo Switch game — Stardew Valley, Animal Crossing: New Horizons, Spiritfarer, or Disney Dreamlight Valley. Includes honest pros and tips for each.',
    keywords: isZh
      ? ['Switch cozy 游戏推荐', '最好的 Switch 放松游戏', '星露谷 Switch 版', '动物之森 Switch', 'Spiritfarer Switch', 'Disney Dreamlight Valley Switch', '治愈游戏推荐', 'Switch 游戏测验']
      : [
          'best cozy games switch',
          'best nintendo switch games for relaxing',
          'cozy games for nintendo switch',
          'is stardew valley on switch',
          'is animal crossing worth buying',
          'is disney dreamlight valley free on switch',
          'spiritfarer switch review',
          'best cozy switch games 2025',
          'cozy game recommendations nintendo',
          'relaxing games nintendo switch',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-switch-games`,
      languages: buildLanguageAlternates('/quizzes/cozy-switch-games'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'What are the best cozy games on Nintendo Switch in 2025?',
    a: "The best cozy games on Nintendo Switch in 2025 are: Stardew Valley (~$15) — the deepest farming RPG with 300+ hours of content, perfect for players who want meaningful progression and a rich world to explore. Animal Crossing: New Horizons (~$60) — the most relaxing major Switch game, with creative island decoration, adorable villagers, and no fail states or time pressure. Spiritfarer (~$30, often on sale for ~$10) — the most emotionally rich cozy game on Switch with a moving story about loss and letting go. Disney Dreamlight Valley (free) — the best option for Disney fans who want a social life sim with beloved characters. Take the quiz above to find which one fits your personal playstyle.",
  },
  {
    q: 'Is Stardew Valley on Nintendo Switch?',
    a: "Yes — Stardew Valley is available on Nintendo Switch for a one-time purchase of approximately $14.99 USD. The Switch version is a complete port of the PC game — all crops, characters, storylines, mine floors, secrets, and multiplayer features are included. The 1.6 update, which added significant new content including new items, events, and late-game features, is available on Switch. The game runs smoothly in both docked and handheld mode. Local co-op is supported (splitscreen for 2 players on Switch) and online multiplayer is available with Nintendo Switch Online.",
  },
  {
    q: 'Is Animal Crossing: New Horizons still worth buying in 2025?',
    a: "Yes — Animal Crossing: New Horizons is still worth buying in 2025, especially if you can find it on sale. The complete game (including all 2.0 update content and the Happy Home Paradise DLC) represents hundreds of hours of gameplay. It's the most genuinely relaxing major game on Switch — there are no fail states, no combat, no time pressure, and the real-time clock means your island always reflects the current season and time of day. The core loop of island decoration, villager relationships, and daily item collection remains deeply satisfying. Note that Nintendo has officially ended major updates for the game, but existing content is extensive.",
  },
  {
    q: 'Is Disney Dreamlight Valley free on Nintendo Switch?',
    a: "Yes — Disney Dreamlight Valley is free to play on Nintendo Switch (no purchase required). You can download it from the Nintendo eShop at no cost and access the full base game. Optional in-app purchases include: Star Path seasonal passes (each ~$9.99) that offer themed cosmetic rewards over a few weeks, and individual cosmetic items from the in-game shop. The base game — including all main quests, character storylines, farming/fishing/cooking/crafting mechanics, and biome expansion — is accessible without spending money. New characters and content continue to be added through free updates.",
  },
  {
    q: 'How many players can play Stardew Valley on Nintendo Switch?',
    a: "Stardew Valley supports up to 4 players in multiplayer mode on Nintendo Switch. Local co-op supports 2 players on a single Switch in splitscreen mode (both players see the same screen split in half). Online multiplayer supports up to 4 players and requires a Nintendo Switch Online subscription. In co-op, one player is the main farmer and owns the farm; other players are farmhands who live in cabins on the property. All players share the same in-game day and can work on different parts of the farm simultaneously — one mining, one farming, one fishing, etc.",
  },
]

const FAQ_ZH = [
  {
    q: '2025 年 Nintendo Switch 上最好的 Cozy 游戏有哪些？',
    a: '2025 年 Nintendo Switch 上最好的 cozy 游戏包括：星露谷物语（约 100 元）——最深度的农场 RPG，300 小时以上内容，适合想要有意义进度和丰富世界的玩家。动物之森：新视野（约 300 元）——Switch 上最令人放松的主要游戏，有创意的岛屿装饰、可爱的村民，没有失败机制或时间压力。Spiritfarer（约 60 元，促销时约 20 元）——Switch 上情感最丰富的 cozy 游戏，有关于失去与放手的动人故事。Disney Dreamlight Valley（免费）——想要有心爱角色的社交生活模拟的 Disney 粉丝的最佳选择。做上面的测验，找到最适合你游戏风格的那款。',
  },
  {
    q: '星露谷物语有 Nintendo Switch 版吗？',
    a: '有——星露谷物语在 Nintendo Switch 上以约 100 元人民币的一次性价格出售。Switch 版是 PC 游戏的完整移植——所有作物、角色、故事线、矿洞层、秘密和多人游戏功能都包含在内。1.6 更新（增加了包括新物品、活动和后期游戏功能在内的大量新内容）已在 Switch 上可用。游戏在电视模式和掌机模式下都运行流畅。支持本地合作（Switch 上 2 名玩家分屏），网络多人游戏需要 Nintendo Switch Online 会员。',
  },
  {
    q: '2025 年动物之森：新视野还值得购买吗？',
    a: '值得——动物之森：新视野 2025 年仍然值得购买，特别是如果你能在促销时购买。完整游戏（包括所有 2.0 版本更新内容和快乐家园天堂 DLC）代表数百小时的游戏时间。这是 Switch 上真正最令人放松的主要游戏——没有失败机制、没有战斗、没有时间压力，实时时钟意味着你的岛屿总是反映当前的季节和一天中的时间。岛屿装饰、村民关系和每日物品收集的核心循环仍然令人深度满足。请注意，Nintendo 已官方停止对游戏的主要更新，但现有内容已经非常丰富。',
  },
  {
    q: 'Disney Dreamlight Valley 在 Nintendo Switch 上是免费的吗？',
    a: '是的——Disney Dreamlight Valley 在 Nintendo Switch 上免费游玩（无需购买）。你可以从 Nintendo eShop 免费下载并访问完整的基础游戏。可选的游戏内购包括：星途季节性通行证（每个约 70 元）提供几周内的主题外观奖励，以及游戏内商店的个别外观物品。基础游戏——包括所有主线任务、角色故事线、农业/钓鱼/烹饪/制作机制和生物群落扩展——无需花钱就可以体验。通过免费更新继续添加新角色和内容。',
  },
  {
    q: '星露谷物语在 Nintendo Switch 上支持几人联机？',
    a: '星露谷物语在 Nintendo Switch 上支持多达 4 人联机。本地合作支持单台 Switch 上的 2 名玩家分屏游戏（两名玩家看到同一个屏幕分成两半）。网络多人游戏支持最多 4 名玩家，需要 Nintendo Switch Online 会员。在合作模式中，一名玩家是主农场主并拥有农场；其他玩家是住在农场小屋里的农场帮手。所有玩家共享同一个游戏内日子，可以同时在农场的不同部分工作——一个人挖矿、一个人种地、一个人钓鱼等。',
  },
]

export default async function CozySwitchGamesPage({
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
            {isZh ? 'Switch Cozy 游戏推荐测验' : 'Cozy Switch Games Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozySwitchQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? 'Nintendo Switch 上最好的 cozy 游戏不是你最常见到的那款，而是最适合你此刻心情的那款。'
            : 'The best cozy Switch game is not the most popular one — it is the one that matches how you want to feel right now.'}
        </p>

        <RelatedQuizzes currentSlug="cozy-switch-games" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? 'Switch Cozy 游戏常见问题' : 'Cozy Switch Games FAQ'}
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
