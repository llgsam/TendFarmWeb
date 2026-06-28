import type { Metadata } from 'next'
import { BASE_URL, otherLocale, buildLanguageAlternates } from '@/lib/config'
import { RhythmGamesQuiz } from '@/components/tools/RhythmGamesQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    title: isZh
      ? '节奏游戏推荐测验：再见狂心 vs 长号冠军 vs 亡灵舞者 vs 褪黑素 | Farming Game Hub'
      : 'Which Rhythm Game Is Right for You? Sayonara Wild Hearts vs Trombone Champ vs Crypt of the NecroDancer vs Melatonin Quiz | Farming Game Hub',
    description: isZh
      ? '6 个问题，从再见狂心、长号冠军、地下墓穴：亡灵舞者、褪黑素中找到最适合你的节奏游戏——从合成流行音乐视频到搞笑长号表演到节奏 Roguelike 再到梦境节拍。'
      : '6 questions to match you with the perfect rhythm game — Sayonara Wild Hearts (synth-pop music video), Trombone Champ (comedic trombone), Crypt of the NecroDancer (rhythm roguelike), or Melatonin (dreamy cozy beats).',
    keywords: isZh
      ? ['节奏游戏推荐', '再见狂心值得玩吗', '长号冠军值得玩吗', '亡灵舞者值得玩吗', '褪黑素游戏值得玩吗', '最适合 cozy 玩家的节奏游戏', '再见狂心 switch', '长号冠军 steam']
      : ['sayonara wild hearts worth it', 'trombone champ worth it', 'crypt of the necrodancer worth it', 'melatonin game worth it', 'best rhythm game for cozy gamers', 'rhythm game quiz', 'which rhythm game should i play', 'sayonara wild hearts apple arcade', 'trombone champ review'],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/rhythm-games-quiz`,
      languages: buildLanguageAlternates('/quizzes/rhythm-games-quiz'),
    },
  }
}

export default async function RhythmGamesQuizPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const faqItems = isZh
    ? [
        {
          q: '再见狂心值得买吗？时间有多长？',
          a: '再见狂心（2019 年，Simogo）在大多数平台售价约 13 美元，Apple Arcade 订阅免费。游戏时长约 90 分钟，是一个完整、完整的体验，有 S 级评分的重玩价值。它被许多人认为是有史以来情感上最动人的短篇游戏，Switch 版 Metacritic 84 分。',
        },
        {
          q: '长号冠军为什么这么有趣？这是认真的节奏游戏吗？',
          a: '长号冠军（2022 年，Holy Wow）之所以有趣，是因为它建立了整个游戏都绕着一个笑话：用鼠标控制一个真实的长号，当你错过音符时（你会经常这样），音效和动画都是光荣地糟糕的——而观众的痛苦反应在实时发生。游戏还有深度：更高难度上的计时系统有真正的精确度要求，社区创建的谱面（数千首）让它具有无限可重玩性。PC 版 Metacritic 82 分。',
        },
        {
          q: '地下墓穴：亡灵舞者适合初学者吗？',
          a: '对于 roguelike 和节奏游戏的初学者来说，亡灵舞者有相当陡峭的学习曲线。它要求你在节拍上做出每一个决定，而且早期失败很频繁。推荐从卡丹斯（默认角色）和标准地牢开始，并用耳机让节拍清晰可听。一旦你掌握了"等待节拍而不是随机移动"的核心技巧，游戏就会大开。PC 版 Metacritic 87 分。',
        },
        {
          q: '褪黑素游戏值得玩吗？和其他节奏游戏有什么不同？',
          a: '褪黑素（2022 年，Half Asleep）约 15 美元，有免费演示版，绝对值得一试。它与其他节奏游戏的不同之处在于其治愈设计理念：即使在最高难度，错过节拍的惩罚也很轻微，视觉反馈柔和而令人愉悦。如果你想要感觉更像冥想而非测试的节奏游戏，褪黑素是这个列表中最适合你的选择。PC 版 Metacritic 77 分。',
        },
        {
          q: '再见狂心在 Apple Arcade 上是免费的吗？',
          a: '是的——再见狂心包含在 Apple Arcade 订阅中（iOS/iPadOS/macOS/Apple TV），月费约 6 美元。如果你已经有 Apple Arcade，这是游玩该游戏的最佳方式。它也在 Nintendo Switch（约 13 美元）、Steam PC（约 13 美元）和 PlayStation 上独立购买，经常折扣出售。',
        },
      ]
    : [
        {
          q: 'Is Sayonara Wild Hearts worth it? How long is it?',
          a: 'Sayonara Wild Hearts (2019, Simogo) costs about $13 on most platforms and is free with Apple Arcade. The game is about 90 minutes long and is a complete, self-contained experience with S-rank replay value. It is widely considered one of the most emotionally resonant short games ever made, with Metacritic 84 on Switch.',
        },
        {
          q: 'Why is Trombone Champ so funny? Is it a real rhythm game?',
          a: 'Trombone Champ (2022, Holy Wow) is funny because the entire game is built around a single joke: controlling a real trombone with a mouse, and when you miss notes (you will, often), the sound and animation are gloriously awful — and the audience\'s pained reactions happen in real time. The game also has depth: the timing system has real precision requirements on harder difficulties, and the community-created charts (thousands of songs) give it near-infinite replayability. Metacritic 82 on PC.',
        },
        {
          q: 'Is Crypt of the NecroDancer good for beginners?',
          a: 'NecroDancer has a fairly steep learning curve for beginners to both roguelikes and rhythm games. It requires you to make every decision on the beat, and early deaths are frequent. Start with Cadence (the default character) and the standard dungeon, and use headphones so the beat is clearly audible. Once you internalize the core skill — waiting for the beat rather than moving randomly — the game opens up considerably. Metacritic 87 on PC.',
        },
        {
          q: 'Is Melatonin worth playing? How is it different from other rhythm games?',
          a: 'Melatonin (2022, Half Asleep) costs about $15 with a free demo available, and is absolutely worth trying. What makes it different from other rhythm games is its cozy design philosophy: even on the hardest difficulty, the punishment for missing a beat is minor, and the visual feedback is soft and rewarding rather than punishing. If you want a rhythm game that feels more like meditation than a performance test, Melatonin is the pick on this list. Metacritic 77 on PC.',
        },
        {
          q: 'Is Sayonara Wild Hearts free on Apple Arcade?',
          a: 'Yes — Sayonara Wild Hearts is included in the Apple Arcade subscription (iOS/iPadOS/macOS/Apple TV) at about $6/month. If you already have Apple Arcade, this is the best way to play it. It is also available for standalone purchase on Nintendo Switch (~$13), Steam PC (~$13), and PlayStation, and frequently goes on sale.',
        },
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
    name: isZh ? '节奏游戏推荐测验' : 'Which Rhythm Game Is Right for You?',
    description: isZh
      ? '6 个问题，从再见狂心、长号冠军、亡灵舞者、褪黑素中找到你的完美节奏游戏'
      : '6 questions to match you with Sayonara Wild Hearts, Trombone Champ, Crypt of the NecroDancer, or Melatonin',
    url: `${BASE_URL}/${locale}/quizzes/rhythm-games-quiz`,
    inLanguage: locale,
    educationalLevel: 'Beginner',
    about: { '@type': 'Thing', name: isZh ? '节奏游戏' : 'Rhythm Games' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">
          {isZh ? '节奏游戏推荐' : 'Rhythm Game Finder'}
        </div>

        <div className="mb-8 rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-8">
          <RhythmGamesQuiz locale={locale} />
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-[#e8dcc8]">
            {locale === 'zh' ? '常见问题' : locale === 'zh-TW' ? '常見問題' : locale === 'ja' ? 'よくある質問' : locale === 'ko' ? '자주 묻는 질문' : locale === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {faqItems.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-5">
                <h3 className="mb-2 font-semibold text-[#e8dcc8]">{q}</h3>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <RelatedQuizzes currentSlug="rhythm-games-quiz" locale={locale} />
      </div>
    </>
  )
}
