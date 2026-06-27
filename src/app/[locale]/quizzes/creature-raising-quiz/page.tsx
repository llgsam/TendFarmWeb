import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'
import { CreatureRaisingQuiz } from '@/components/tools/CreatureRaisingQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const other = otherLocale(locale)
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/creature-raising-quiz`

  const faqItems = isZh
    ? [
        { q: 'Slime Rancher 2 值得买吗？', a: 'Slime Rancher 2 非常值得购买，尤其是对 Cozy 游戏玩家。作为 2022 年抢先体验游戏，它在 Steam 上保持极高好评，Game Pass 上也可游玩。游戏以第一人称真空枪玩法，让你在彩虹岛收集和牧养多彩史莱姆，没有战斗压力，资源循环令人满足。约 30 美元或包含在 Game Pass 中。' },
        { q: '怪物避难所值得买吗？', a: '怪物避难所约 17 美元，是同类游戏中性价比最高的之一。它完美融合了银河城探索与怪物收集 RPG，三只怪物组成队伍的战斗系统基于护盾协同，富有深度。世界地图手工制作，100+ 种怪物各有独特技能树。Steam 上好评如潮，经常大促。' },
        { q: 'Dragon Quest Monsters: The Dark Prince 值得买吗？', a: '对深度怪物系统爱好者来说非常值得。这是 Nintendo Switch 独占游戏，约 60 美元，包含超过 500 种怪物和跨代合成系统——你可以融合怪物让后代继承最多 8 个技能。主线故事是完整的 JRPG 体验，但合成系统本身就能吸引你超过 100 小时。' },
        { q: 'Temtem 在 2024 年还值得玩吗？', a: 'Temtem 仍然值得玩，尤其适合想要在线多人竞技生物游戏的玩家。游戏已于 2022 年正式发行，支持全平台跨平台游玩（PC/Switch/PS5/Xbox）。独特的耐力系统和同步机制使其在竞技层面更加公平。约 45 美元，适合寻找在线怪物对战体验的玩家。' },
        { q: '有哪些适合宝可梦粉丝的 PC 生物养成游戏？', a: '适合宝可梦粉丝的 PC 生物养成游戏包括：Temtem（官方风格的在线生物 MMO，有完整主线和竞技排名）；怪物避难所（银河城 + 战略怪物战斗，Steam 平台约 17 美元）；Cassette Beasts（怪物融合 RPG，有独特的磁带系统，Game Pass 可玩）。如果你喜欢轻松无战斗的体验，Slime Rancher 2 是最佳替代品。' },
      ]
    : [
        { q: 'Is Slime Rancher 2 worth it?', a: 'Slime Rancher 2 is absolutely worth playing, especially for cozy gamers. In Early Access since 2022 with overwhelmingly positive Steam reviews and Game Pass availability, it offers first-person slime ranching on a colorful alien island — no combat, satisfying resource loops, and new biomes to discover. About $30 or included in Game Pass.' },
        { q: 'Is Monster Sanctuary worth it?', a: 'Monster Sanctuary at about $17 is one of the best value games in the creature-collecting genre. It perfectly fuses metroidvania exploration with monster-collecting RPG mechanics — your team of three monsters unlocks traversal abilities, and the shield-synergy battle system has real depth. Steam reviews are very positive, and it goes on deep sale regularly.' },
        { q: 'Is Dragon Quest Monsters: The Dark Prince worth it?', a: 'For fans of deep creature systems, Dragon Quest Monsters: The Dark Prince is absolutely worth it. At about $60 on Nintendo Switch only, it includes 500+ monsters and a cross-generation synthesis system where offspring inherit up to eight skills from both parent monsters. The campaign is a full JRPG, but the synthesis system alone can absorb 100+ hours.' },
        { q: 'Is Temtem worth playing in 2024?', a: 'Temtem is still worth playing, particularly for players who want an online multiplayer creature game with competitive depth. Fully released in 2022 with cross-play across all platforms (PC/Switch/PS5/Xbox), its unique stamina mechanic and synchronize system make competitive play feel genuinely fair. About $45, best for players who want online creature battling.' },
        { q: 'What are the best creature-raising games on PC similar to Pokemon?', a: 'The best Pokemon-style creature games on PC are: Temtem (official-style online creature MMO with ranked battles); Monster Sanctuary (metroidvania + strategic creature combat, ~$17 on Steam); Cassette Beasts (monster fusion RPG with tape-recording mechanic, on Game Pass). For a cozy no-combat alternative, Slime Rancher 2 is the top pick.' },
      ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh ? '哪款生物养成游戏最适合你？' : 'Which Creature-Raising Game Is Right for You?',
    description: isZh
      ? '6 个问题，从 Slime Rancher 2、怪物避难所、DQ 怪兽仙境 The Dark Prince、Temtem 中找到你的生物养成游戏'
      : '6 questions to match you with Slime Rancher 2, Monster Sanctuary, Dragon Quest Monsters: The Dark Prince, or Temtem',
    url: canonical,
  }

  return {
    title: isZh
      ? '哪款生物养成游戏最适合你？Slime Rancher 2 / 怪物避难所 / DQ 怪兽仙境 / Temtem | Farm Game Hub'
      : 'Which Creature-Raising Game Is Right for You? Slime Rancher 2 vs Monster Sanctuary vs DQ Monsters vs Temtem | Farm Game Hub',
    description: isZh
      ? '6 个问题找到你的生物养成游戏：纯 Cozy 史莱姆牧场（Slime Rancher 2）、银河城怪物战斗（怪物避难所）、深度怪物合成 JRPG（DQ 怪兽仙境），或在线竞技 MMO（Temtem）。'
      : '6 questions to find your creature game: pure cozy slime ranching (Slime Rancher 2), metroidvania monster battles (Monster Sanctuary), deep synthesis JRPG (DQ Monsters: The Dark Prince), or competitive online MMO (Temtem).',
    keywords: isZh
      ? ['生物养成游戏推荐', 'Slime Rancher 2 值得买吗', '怪物避难所值得买吗', 'Dragon Quest Monsters 值得买', 'Temtem 值得玩吗', '类宝可梦 PC 游戏', '生物收集游戏推荐', '史莱姆牧场 2 评测', '怪物避难所银河城', 'Temtem 在线宝可梦']
      : ['which creature raising game', 'slime rancher 2 worth it', 'monster sanctuary worth it', 'dragon quest monsters dark prince worth it', 'temtem worth it 2024', 'creature games like pokemon', 'monster collecting games pc', 'slime rancher 2 review', 'monster sanctuary review metroidvania', 'temtem vs pokemon'],
    alternates: {
      canonical,
      languages: {
        [locale]: canonical,
        [other]: `${BASE_URL}/${other}/quizzes/creature-raising-quiz`,
      },
    },
    other: {
      'script:ld+json:faq': JSON.stringify(faqSchema),
      'script:ld+json:quiz': JSON.stringify(quizSchema),
    },
  }
}

export default async function CreatureRaisingQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'

  const faqItems = isZh
    ? [
        { q: 'Slime Rancher 2 值得买吗？', a: 'Slime Rancher 2 非常值得购买，尤其是对 Cozy 游戏玩家。作为 2022 年抢先体验游戏，它在 Steam 上保持极高好评，Game Pass 上也可游玩。游戏以第一人称真空枪玩法，让你在彩虹岛收集和牧养多彩史莱姆，没有战斗压力，资源循环令人满足。约 30 美元或包含在 Game Pass 中。' },
        { q: '怪物避难所值得买吗？', a: '怪物避难所约 17 美元，是同类游戏中性价比最高的之一。它完美融合了银河城探索与怪物收集 RPG，三只怪物组成队伍的战斗系统基于护盾协同，富有深度。世界地图手工制作，100+ 种怪物各有独特技能树。Steam 上好评如潮，经常大促。' },
        { q: 'Dragon Quest Monsters: The Dark Prince 值得买吗？', a: '对深度怪物系统爱好者来说非常值得。这是 Nintendo Switch 独占游戏，约 60 美元，包含超过 500 种怪物和跨代合成系统——你可以融合怪物让后代继承最多 8 个技能。主线故事是完整的 JRPG 体验，但合成系统本身就能吸引你超过 100 小时。' },
        { q: 'Temtem 在 2024 年还值得玩吗？', a: 'Temtem 仍然值得玩，尤其适合想要在线多人竞技生物游戏的玩家。游戏已于 2022 年正式发行，支持全平台跨平台游玩（PC/Switch/PS5/Xbox）。独特的耐力系统和同步机制使其在竞技层面更加公平。约 45 美元，适合寻找在线怪物对战体验的玩家。' },
        { q: '有哪些适合宝可梦粉丝的 PC 生物养成游戏？', a: '适合宝可梦粉丝的 PC 生物养成游戏包括：Temtem（官方风格的在线生物 MMO，有完整主线和竞技排名）；怪物避难所（银河城 + 战略怪物战斗，Steam 平台约 17 美元）；Cassette Beasts（怪物融合 RPG，有独特的磁带系统，Game Pass 可玩）。如果你喜欢轻松无战斗的体验，Slime Rancher 2 是最佳替代品。' },
      ]
    : [
        { q: 'Is Slime Rancher 2 worth it?', a: 'Slime Rancher 2 is absolutely worth playing, especially for cozy gamers. In Early Access since 2022 with overwhelmingly positive Steam reviews and Game Pass availability, it offers first-person slime ranching on a colorful alien island — no combat, satisfying resource loops, and new biomes to discover. About $30 or included in Game Pass.' },
        { q: 'Is Monster Sanctuary worth it?', a: 'Monster Sanctuary at about $17 is one of the best value games in the creature-collecting genre. It perfectly fuses metroidvania exploration with monster-collecting RPG mechanics — your team of three monsters unlocks traversal abilities, and the shield-synergy battle system has real depth. Steam reviews are very positive, and it goes on deep sale regularly.' },
        { q: 'Is Dragon Quest Monsters: The Dark Prince worth it?', a: 'For fans of deep creature systems, Dragon Quest Monsters: The Dark Prince is absolutely worth it. At about $60 on Nintendo Switch only, it includes 500+ monsters and a cross-generation synthesis system where offspring inherit up to eight skills from both parent monsters. The campaign is a full JRPG, but the synthesis system alone can absorb 100+ hours.' },
        { q: 'Is Temtem worth playing in 2024?', a: 'Temtem is still worth playing, particularly for players who want an online multiplayer creature game with competitive depth. Fully released in 2022 with cross-play across all platforms (PC/Switch/PS5/Xbox), its unique stamina mechanic and synchronize system make competitive play feel genuinely fair. About $45, best for players who want online creature battling.' },
        { q: 'What are the best creature-raising games on PC similar to Pokemon?', a: 'The best Pokemon-style creature games on PC are: Temtem (official-style online creature MMO with ranked battles); Monster Sanctuary (metroidvania + strategic creature combat, ~$17 on Steam); Cassette Beasts (monster fusion RPG with tape-recording mechanic, on Game Pass). For a cozy no-combat alternative, Slime Rancher 2 is the top pick.' },
      ]

  return (
    <div className="min-h-screen bg-[#0f1a0f] text-[#e8dcc8]">
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm text-[#8a9a7a]">
            {isZh ? '生物养成 · 游戏推荐测验' : 'Creature Raising · Game Finder Quiz'}
          </p>
        </div>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-6 shadow-xl">
          <CreatureRaisingQuiz locale={locale} />
        </div>

        <RelatedQuizzes currentSlug="creature-raising-quiz" locale={locale} />

        <section className="mt-12">
          <h2 className="mb-6 text-lg font-bold text-[#e8dcc8]">
            {isZh ? '常见问题' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-6">
            {faqItems.map(({ q, a }, i) => (
              <div key={i}>
                <h3 className="mb-2 font-semibold text-[#f0a832]">{q}</h3>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            }),
          }}
        />
      </main>
    </div>
  )
}
