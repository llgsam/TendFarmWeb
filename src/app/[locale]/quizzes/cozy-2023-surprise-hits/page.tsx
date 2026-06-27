import { Metadata } from 'next'
import { Cozy2023SurpriseQuiz } from '@/components/tools/Cozy2023SurpriseQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import { BASE_URL, otherLocale } from '@/lib/config'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-2023-surprise-hits`

  return {
    title: isZh
      ? '哪款 2023 精品会让 Cozy 玩家意外爱上？星之海/Hi-Fi Rush/塞纳尔圣歌/Jusant | FarmGame Hub'
      : 'Which 2023 Game Would a Cozy Gamer Unexpectedly Love? Sea of Stars, Hi-Fi Rush, Chants of Sennaar, Jusant | FarmGame Hub',
    description: isZh
      ? '测验：星之海、Hi-Fi Rush、塞纳尔圣歌、Jusant——哪款 2023 年的惊喜之作最适合 Cozy 游戏玩家？6 个问题找到你的年度惊喜游戏。'
      : 'Quiz: Sea of Stars, Hi-Fi Rush, Chants of Sennaar, or Jusant — which acclaimed 2023 game would a cozy gamer unexpectedly love? 6 questions to find your surprise hit.',
    keywords: isZh
      ? ['星之海值得买吗', 'hi fi rush 评测', '塞纳尔圣歌攻略', 'jusant 游戏值得玩吗', '2023 最佳独立游戏', 'sea of stars 值得吗', '2023 cozy 游戏推荐', 'hi fi rush game pass', '星之海回合制 rpg']
      : ['sea of stars review worth it', 'hi fi rush review worth it', 'chants of sennaar review worth it', 'jusant game review worth it', 'best indie games 2023 for cozy gamers', 'sea of stars worth buying', 'hi fi rush worth it game pass', 'chants of sennaar puzzle game', 'jusant climbing game review', 'best 2023 games for people who like stardew valley'],
    alternates: {
      canonical,
      languages: { [otherLocale(locale)]: `${BASE_URL}/${otherLocale(locale)}/quizzes/cozy-2023-surprise-hits` },
    },
  }
}

export default async function Cozy2023SurpriseHitsPage({ params }: Props) {
  const { locale } = await params
  const isZh = locale === 'zh'
  const canonical = `${BASE_URL}/${locale}/quizzes/cozy-2023-surprise-hits`

  const faqItems = [
    {
      q: isZh ? '星之海（Sea of Stars）值得购买吗？' : 'Is Sea of Stars worth buying?',
      a: isZh
        ? '星之海非常值得购买，Metacritic 91 分，Steam 好评率极高。这是十多年来最好的经典风格 JRPG，具有平易近人的回合制战斗（计时攻击系统）、由两个太阳和月亮照亮的惊艳像素艺术世界，以及真正触动情感的故事。没有随机遭遇战（敌人可见），频繁存档点，可调节难度。约 30-40 小时主线。Game Pass 上可免费试玩，约 35 美元买断。'
        : "Sea of Stars is absolutely worth buying — 91 Metacritic, overwhelmingly positive on Steam, and one of the highest-rated games of 2023. It's the best classic-style JRPG in over a decade, with accessible turn-based combat featuring a timed-hit system (press the button when the ring shrinks for bonus damage), stunning pixel art illuminated by two suns and a moon, and a genuinely emotional story. No random encounters, frequent save points, and adjustable difficulty make it welcoming to new JRPG players. Main story runs 30-40 hours. Available on Game Pass to try free, or about $35 to buy.",
    },
    {
      q: isZh ? 'Hi-Fi Rush 值得游玩吗？' : 'Is Hi-Fi Rush worth playing?',
      a: isZh
        ? 'Hi-Fi Rush 是近年来最令人愉悦的游戏之一——Metacritic 87 分，Steam 好评率 95%，并在 2023 年底赢得了多项年度游戏奖项。最大的惊喜是它的无障碍性：你不需要保持完美节奏就能享受游戏——节奏奖励你额外伤害但不惩罚失误。游戏约 12-15 小时，节奏完美，文字幽默，视觉风格令人振奋。Game Pass 和 Steam 上均可获取，Mac 版通过 Steam 可玩。'
        : "Hi-Fi Rush is one of the most joyful games released in years — 87 Metacritic, 95% positive on Steam, and it swept multiple end-of-year awards in 2023. The biggest surprise is its accessibility: you don't need to keep perfect rhythm to enjoy it. Rhythm rewards extra damage but never punishes you for missing beats. The game runs 12-15 hours at a perfect pace, the writing is genuinely funny, and the visual style is infectiously energetic. Available on Game Pass for free or about $30 on Steam. Also playable on Mac through Steam (Proton compatibility).",
    },
    {
      q: isZh ? '塞纳尔圣歌（Chants of Sennaar）是什么类型的游戏？好玩吗？' : 'What kind of game is Chants of Sennaar — is it worth it?',
      a: isZh
        ? '塞纳尔圣歌是一款以"破解古代语言"为核心机制的解谜冒险游戏，2023 年 BAFTA 最佳游戏提名。你无需任何指南——通过观察上下文（人物指着门说话，你推断那个符号意味着"门"）逐渐破解五种不同文明的语言。当一个以前无法理解的句子突然变得清晰时，满足感无与伦比。约 10-15 小时，装饰艺术视觉风格，Game Pass 上可用。适合享受谜题和独特概念的玩家。'
        : "Chants of Sennaar is a puzzle adventure game built entirely around deciphering ancient languages from scratch — a 2024 BAFTA Game Award nominee. You have no guidebook: you observe context (a figure points at a door, you infer the glyph means 'door') and gradually decode five different civilizations' languages. The breakthrough moment when an incomprehensible sentence suddenly becomes clear is unlike almost any other game experience. About 10-15 hours with Art Deco visual style. Available on Game Pass. Recommended for puzzle game fans who want something completely original.",
    },
    {
      q: isZh ? 'Jusant 是什么样的游戏？它适合 Cozy 游戏玩家吗？' : 'What is Jusant — is it good for cozy gamers?',
      a: isZh
        ? 'Jusant 是由 Don\'t Nod（《奇异人生》）开发的冥想式攀岩冒险游戏，没有战斗、没有因坠落死亡（弹回到最后一个锚点）、没有计时器。你攀登一座在大洪水退去后遗留的巨塔，通过前任居民留下的笔记拼凑失落文明的故事。乐趣完全在于攀登的身体感和游戏呈现的美丽景观。5-8 小时，Game Pass 首日可用。对于想要真正放松且独特体验的 Cozy 玩家，这是完美选择。'
        : "Jusant is a meditative rock-climbing adventure from Don't Nod (Life is Strange) with no combat, no death from falling (you snap back to your last anchor), and no timer. You ascend a massive tower left stranded after a great flood, piecing together the story of lost civilizations from notes left by previous inhabitants. The pleasure is entirely in the physicality of climbing and the beautiful vistas the game opens up. 5-8 hours, available day one on Game Pass. For cozy gamers who want something truly relaxing and unlike anything else, it's a perfect choice.",
    },
    {
      q: isZh ? '2023 年最适合 Cozy 游戏玩家的非农场游戏有哪些？' : 'What are the best non-farming games from 2023 for cozy gamers?',
      a: isZh
        ? '2023 年有几款非农场游戏被大量 Cozy 游戏玩家发现并喜爱：星之海（经典 JRPG，Game Pass）、Hi-Fi Rush（节奏动作，Game Pass）、塞纳尔圣歌（语言解谜，Game Pass）、Jusant（攀岩冥想，Game Pass）。其中前三款均在 Game Pass 首日可用，让试玩零风险。这四款游戏的共同点是：高度平易近人、独特的核心创意、没有传统游戏难度壁垒，以及被大量非核心玩家发现后给予极高评价。'
        : "Several non-farming games from 2023 were discovered and loved by large numbers of cozy gamers: Sea of Stars (classic JRPG, Game Pass), Hi-Fi Rush (rhythm action, Game Pass), Chants of Sennaar (language puzzle, Game Pass), and Jusant (rock-climbing meditation, Game Pass). All four are available on Game Pass, making them zero-risk to try. Their shared appeal to cozy gamers: high accessibility, original core concepts, no traditional difficulty walls, and deep positivity from non-core gaming audiences who gave them overwhelmingly positive reviews.",
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Quiz',
        name: isZh ? '哪款 2023 精品会让 Cozy 玩家意外爱上？' : 'Which 2023 Game Would a Cozy Gamer Unexpectedly Love?',
        description: isZh
          ? '6 个问题找到你最适合的 2023 年度惊喜游戏：星之海、Hi-Fi Rush、塞纳尔圣歌或 Jusant。'
          : '6 questions to find your 2023 surprise hit: Sea of Stars, Hi-Fi Rush, Chants of Sennaar, or Jusant.',
        url: canonical,
        inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
        educationalLevel: 'Beginner',
        about: { '@type': 'Thing', name: 'Best Indie Games 2023 for Cozy Gamers' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#0f1a0f] py-12 text-[#e8dcc8]">
        <div className="mx-auto max-w-2xl px-4">
          <div className="mb-8 text-center">
            <div className="mb-4 text-5xl">🎮</div>
            <h1 className="mb-2 text-2xl font-bold text-[#e8dcc8]">
              {isZh ? '哪款 2023 精品会让 Cozy 玩家意外爱上？' : 'Which 2023 Game Would a Cozy Gamer Unexpectedly Love?'}
            </h1>
            <p className="text-sm text-[#8a9a7a]">
              {isZh
                ? '星之海、Hi-Fi Rush、塞纳尔圣歌、Jusant——四款风格迥异的年度惊喜之作'
                : 'Sea of Stars, Hi-Fi Rush, Chants of Sennaar, Jusant — four acclaimed 2023 games with strong cozy appeal'}
            </p>
          </div>

          <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a] p-6 shadow-xl">
            <Cozy2023SurpriseQuiz locale={locale} />
          </div>

          <div className="mt-12">
            <RelatedQuizzes currentSlug="cozy-2023-surprise-hits" locale={locale} />
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-lg font-semibold text-[#e8dcc8]">
              {isZh ? '常见问题' : 'Frequently Asked Questions'}
            </h2>
            {faqItems.map(({ q, a }, i) => (
              <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-5">
                <h3 className="mb-2 font-semibold text-[#f0a832]">{q}</h3>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
