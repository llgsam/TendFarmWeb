import { CozyIndieQuiz } from '@/components/tools/CozyIndieQuiz'
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
      ? '你应该玩哪款独立 Cozy 游戏？— Cozy Grove / Unpacking / A Little to the Left / Wylde Flowers'
      : 'Which Indie Cozy Game Should You Play? Quiz — Cozy Grove, Unpacking, A Little to the Left, Wylde Flowers',
    description: isZh
      ? '6 个问题，在四款备受赞誉的独立 cozy 游戏中找到最适合你的：Cozy Grove（每日签到）、Unpacking（无言叙事）、A Little to the Left（整理谜题）、Wylde Flowers（农业 + 魔法）。'
      : '6 questions to match you with the right acclaimed indie cozy game — Cozy Grove (daily ritual), Unpacking (wordless storytelling), A Little to the Left (organizing puzzles), or Wylde Flowers (farming + witchcraft).',
    keywords: isZh
      ? ['Cozy Grove 值得玩吗', 'Unpacking 游戏推荐', 'A Little to the Left 推荐', 'Wylde Flowers 推荐', '最好的独立 cozy 游戏', '短时间能完成的 cozy 游戏', 'Apple Arcade cozy 游戏', '独立农场游戏推荐']
      : [
          'which indie cozy game should i play',
          'is cozy grove worth playing',
          'is unpacking game worth it',
          'a little to the left review',
          'wylde flowers review',
          'best indie cozy games 2025',
          'cozy games you can finish',
          'short cozy games worth playing',
          'cozy games on apple arcade',
          'cozy games on xbox game pass',
          'cozy grove vs unpacking',
          'best cozy games under 5 hours',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-indie-games`,
      languages: buildLanguageAlternates('/quizzes/cozy-indie-games'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Cozy Grove worth playing in 2025?',
    a: "Yes — Cozy Grove is absolutely worth playing, though it's a unique experience that requires the right expectations. It's a daily check-in cozy game set on an island of colorful bear spirits: you play for about 20-30 minutes per day, a small amount of content unlocks each real-world day, and the characters' stories unfold slowly over weeks. The art style is the most beautiful in any cozy game — genuinely painterly and layered. If you want a game to play in short sessions over a few months, it's wonderful. If you want a game to binge in a weekend, it will frustrate you. Available on Switch, PC, PS4/5, Xbox, and Apple Arcade.",
  },
  {
    q: 'Is Unpacking worth buying? How long is it?',
    a: "Unpacking is 100% worth playing and is considered one of the best indie games ever made. It takes about 3-4 hours to complete, is completely wordless (no dialogue, no text), and tells the complete emotional arc of a woman's life through the objects she moves across eight apartments. Multiple players describe crying during the ex-boyfriend's apartment level without being able to articulate exactly why. It's available on Xbox Game Pass (essentially free with subscription), Nintendo Switch (~$20), PC (Steam), and PS4/5. The Game Pass version means the bar to try it is extremely low — it is strongly recommended to anyone who hasn't played it.",
  },
  {
    q: 'What is A Little to the Left and is it good?',
    a: "A Little to the Left is an organizing puzzle game where you arrange everyday objects — pencils, stamps, kitchen utensils, houseplants — into satisfying arrangements. Most puzzles have more than one valid solution, and the game rewards creative categorization thinking. A mischievous cat occasionally undoes your work. Sessions are naturally short (2-10 minutes per puzzle), making it ideal for commutes, waiting rooms, or short breaks. The Cupboards & Drawers DLC adds substantial extra content. Available on Nintendo Switch, PC (Steam), Apple Arcade, and Xbox Game Pass. It consistently tops lists of the most satisfying cozy games for people who love organization, tidying, and arrangement.",
  },
  {
    q: 'What is Wylde Flowers and is it on Switch or PC?',
    a: "Wylde Flowers is a farming game about Tara, a city woman who inherits her grandmother's farm in a small coastal town and discovers she is a witch. The game combines traditional farming (crops, animals, seasonal progression) with a witches' coven, potion crafting, and a story with fully voiced characters and romance options. It is notably praised for diverse, well-written characters and handling themes of belonging with genuine warmth. It was originally an Apple Arcade exclusive and is now available on PC via Steam and Nintendo Switch (~$20). Most players complete the main story in 20-30 hours. It is consistently recommended alongside Stardew Valley for players who want farming with strong character writing.",
  },
  {
    q: 'What are the best cozy games you can finish in a weekend?',
    a: "The best cozy games completable in a weekend (6-10 hours) are: Unpacking (3-4 hours, PC/Switch/Game Pass — the most emotionally complete experience in that time); A Little to the Left (4-6 hours for the base game, available on Game Pass and Apple Arcade); Spiritfarer (20+ hours for full completion, but deeply satisfying over 2-3 sessions even unfinished); and Wylde Flowers (20-30 hours for the full story, but the first act wraps beautifully in a weekend). For under-3-hour completions, look at short narrative games like Venba (~1.5 hours) or Alba: A Wildlife Adventure (~3-4 hours).",
  },
]

const FAQ_ZH = [
  {
    q: 'Cozy Grove 2025 年值得玩吗？',
    a: '是的——Cozy Grove 绝对值得玩，不过它是一种需要正确预期的独特体验。这是一款设定在多彩熊灵魂岛屿上的每日签到 cozy 游戏：你每天玩约 20-30 分钟，每个现实世界中的一天解锁少量内容，角色的故事在几周内缓缓展开。艺术风格是所有 cozy 游戏中最美丽的——真正的绘画感和分层效果。如果你想要一款在几个月内以短暂时段游玩的游戏，它非常精彩。如果你想要在一个周末快速通关的游戏，它会让你失望。可在 Switch、PC、PS4/5、Xbox 和 Apple Arcade 上获取。',
  },
  {
    q: 'Unpacking 值得买吗？需要多长时间？',
    a: 'Unpacking 100% 值得玩，被认为是有史以来最好的独立游戏之一。完成大约需要 3-4 小时，完全无声（没有对话、没有文字），通过一位女性在八次搬家中移动的物品讲述她完整的情感人生弧线。多位玩家描述在前男友公寓关卡哭泣，却无法准确说明原因。可在 Xbox Game Pass（本质上免费订阅）、Nintendo Switch（约 50 元）、PC（Steam）和 PS4/5 上获取。Game Pass 版本意味着尝试的门槛极低——强烈推荐给任何还没玩过的人。',
  },
  {
    q: 'A Little to the Left 是什么？好玩吗？',
    a: 'A Little to the Left 是一款整理谜题游戏，你将日常物品——铅笔、邮票、厨房用具、室内植物——排列成令人满足的布局。大多数谜题有不止一个有效解决方案，游戏奖励有创意的分类思维。一只淘气的猫偶尔会破坏你的工作。每次游戏自然较短（每个谜题 2-10 分钟），非常适合通勤、等待或短暂休息。Cupboards & Drawers DLC 增加了大量额外内容。可在 Nintendo Switch、PC（Steam）、Apple Arcade 和 Xbox Game Pass 上获取。它始终位列喜欢整理、收纳和排列的人的最令人满足的 cozy 游戏榜首。',
  },
  {
    q: 'Wylde Flowers 是什么游戏？Switch 和 PC 上有吗？',
    a: 'Wylde Flowers 是一款关于 Tara 的农场游戏，她是一位在小海滨小镇继承外祖母农场并发现自己是女巫的城市女性。游戏将传统农业（作物、动物、季节性进度）与女巫集会、药水制作以及有完整配音角色和恋爱选项的故事相结合。它因多样、有深度的角色和以真诚温暖处理归属感主题而备受赞誉。它最初是 Apple Arcade 独占，现在可在 PC（Steam）和 Nintendo Switch（约 50 元）上获取。大多数玩家在 20-30 小时内完成主故事。对于想要有强力角色写作的农业游戏的玩家，它始终与星露谷物语一起被推荐。',
  },
  {
    q: '有哪些可以在一个周末玩完的 cozy 游戏？',
    a: '可以在一个周末（6-10 小时）完成的最好 cozy 游戏包括：Unpacking（3-4 小时，PC/Switch/Game Pass——在该时间内最完整的情感体验）；A Little to the Left（基础游戏 4-6 小时，可在 Game Pass 和 Apple Arcade 上获取）；Spiritfarer（完整通关 20 小时以上，但即使未完成，2-3 次游戏也非常令人满足）；以及 Wylde Flowers（完整故事 20-30 小时，但第一章在一个周末内就有美丽的完整感）。对于 3 小时以内的完成，可以看看 Venba（约 1.5 小时）或 Alba: A Wildlife Adventure（约 3-4 小时）等短叙事游戏。',
  },
]

export default async function CozyIndieGamesPage({
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
            {isZh ? '独立 Cozy 游戏推荐测验' : 'Indie Cozy Games Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyIndieQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '最好的独立 cozy 游戏不是预算最大的——而是最了解自己想说什么的那个。'
            : "The best indie cozy games are not the ones with the biggest budgets — they're the ones that know exactly what they want to say."}
        </p>

        <RelatedQuizzes currentSlug="cozy-indie-games" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '独立 Cozy 游戏常见问题' : 'Indie Cozy Games FAQ'}
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
