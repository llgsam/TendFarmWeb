import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { CozyJapanFarmQuiz } from '@/components/tools/CozyJapanFarmQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

const SLUG = 'cozy-japan-farm-quiz'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'

  return {
    title: isZh
      ? '日式温馨农场游戏推荐测验 | 矿石镇重制 / 哆啦A梦 / SunnySide / 小龙咖啡馆'
      : 'Which Japanese Cozy Farming Game Is Right for You? | FoMT vs Doraemon vs SunnySide vs Little Dragon Café',
    description: isZh
      ? '你是怀旧归乡型还是现代动漫型？6道题从牧场物语矿石镇重制版、哆啦A梦牧场物语、SunnySide和小龙咖啡馆中找到最适合你的日式农场游戏。'
      : 'Nostalgic homecoming or modern anime adventurer? Take this 6-question quiz to find your Japanese cozy farming game match across Friends of Mineral Town, Doraemon SoS, SunnySide, and Little Dragon Café.',
    keywords: isZh
      ? [
          '牧场物语矿石镇重制版值得买吗',
          '哆啦A梦牧场物语测评',
          'SunnySide游戏推荐',
          '小龙咖啡馆评测',
          '日式农场游戏推荐2024',
          '和田康弘新游戏',
          '牧场物语系列哪款最好',
          '日本乡村农场游戏Switch',
          '动漫风格农场游戏PC',
          'Story of Seasons推荐',
        ]
      : [
          'story of seasons friends of mineral town worth it',
          'doraemon story of seasons review',
          'sunnyside game review 2024',
          'little dragon cafe review',
          'best japanese farming sim quiz',
          'harvest moon friends of mineral town remake',
          'yasuhiro wada farming game',
          'anime style farming game pc switch',
          'japanese cozy game recommendation',
          'story of seasons which game to play',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/${SLUG}`,
      languages: buildLanguageAlternates(`/quizzes/${SLUG}`),
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'

  const faqItems = isZh
    ? [
        {
          q: '牧场物语矿石镇重制版和原版GBA有多大区别，老玩家值得再买吗？',
          a: '2020年的重制版对原版GBA的核心体验高度忠实，主要升级是视觉效果（温暖的3D风格替代了像素画）、品质改善（省去了很多重复操作）和同性婚姻选项。如果你对GBA原版有深厚情感，重制版的感觉就像一次温柔的归来而不是彻底重制。对于从未接触过矿石镇的新玩家，它提供了这段历史中最易上手的形式。对老玩家来说，主要吸引力是重温情感记忆加上现代舒适度，而非全新内容。',
        },
        {
          q: '哆啦A梦牧场物语是否适合完全没玩过农场游戏的新手？',
          a: '是的，这正是它的设计初衷之一。游戏难度比标准牧场物语游戏低，作物失败的惩罚很少，体力系统宽松，节奏比较缓慢友好。哆啦A梦IP提供了即时的情感熟悉感，对于可能觉得其他农场游戏系统量令人不安的玩家来说，这是一个让你在有所归属感的情况下慢慢探索类型的机会。完成游戏后，续作《大王国的伙伴们》（2022）提供了更深度的体验，适合想要进阶的玩家。',
        },
        {
          q: 'SunnySide和星露谷物语相比，哪款更适合想要日本文化体验的玩家？',
          a: 'SunnySide是目前最接近"设定在真实日本乡村的农场游戏"体验的选择——节日基于真实日本节气，食物系统反映了日式烹饪，社区动态带有日本乡间生活的特质。星露谷物语使用更泛泛的欧洲田园风格，虽然部分灵感来自牧场物语。如果日本文化真实性是优先考量，SunnySide明显占优；如果你想要更深的情感深度和更成熟的游戏机制，星露谷提供了已经经过大量内容更新打磨的体验。',
        },
        {
          q: '小龙咖啡馆真的是牧场物语创始人和田康弘的作品吗，这对游戏质量有什么意义？',
          a: '是的，和田康弘是小龙咖啡馆的创作者，他是1996年创造了最初牧场物语系列的人。版权纠纷将他与自己创造的IP分离后，他以小龙咖啡馆开创了自己的新系列。他的DNA在游戏设计中清晰可见：对社区关系的关注、培育某样脆弱东西的主题、相信耐心本身就是奖励的设计哲学。对于特别欣赏早期牧场物语游戏情感核心而非后来机制扩展的玩家，小龙咖啡馆直接捕捉到了那种精神。',
        },
        {
          q: 'SunnySide适合Switch还是只有PC版本？',
          a: 'SunnySide目前（2024年）主要在PC上通过Steam提供，主机版本在开发中但截至本文撰写时尚未确认具体发布日期。如果你只有Switch或主机，建议关注官方渠道的更新。牧场物语矿石镇重制版、哆啦A梦牧场物语和小龙咖啡馆都在Switch上有官方版本，适合主机玩家。SunnySide的PC版获得了良好评价，如果有电脑可以游玩，是当前最便捷的体验方式。',
        },
      ]
    : [
        {
          q: 'How faithful is the Story of Seasons Friends of Mineral Town remake to the GBA original and is it worth it for returning fans?',
          a: 'The 2020 remake is highly faithful to the original GBA experience. The core gameplay loop — four seasons, marriage system, mines, festivals, friendship hearts — is preserved almost exactly. The main changes are visual (warm 3D replacing pixel art), quality-of-life improvements (less repetitive tool animation, faster walk speed), and the addition of same-sex marriage options. For returning fans, the emotional experience is genuinely nostalgic rather than reductive — Mineral Town feels like home, the characters are recognizably themselves, and the additions feel like respect rather than revision. The question of "is it worth it" depends on how you feel about revisiting a 50-80 hour game you likely already completed, but for players who want to re-experience Mineral Town in a comfortable modern package, the answer is yes.',
        },
        {
          q: 'Is Doraemon Story of Seasons good if you have never played a farming sim before?',
          a: 'Doraemon: Story of Seasons is genuinely well-designed as a farming sim entry point. The difficulty is lower than standard Story of Seasons entries, crop failure is rare, the stamina system is forgiving, and the IP familiarity provides immediate emotional scaffolding — you already care about these characters before the game has done anything to earn that affection. The game runs 25-35 hours to completion, which is a manageable commitment for testing whether you enjoy the genre. If you finish it and want more complexity, the sequel (Friends of the Great Kingdom, 2022) expands every system significantly. The main downside is that fans of the Doraemon franchise who are already comfortable with farming sims may find it slightly too gentle.',
        },
        {
          q: 'What makes SunnySide different from other anime-style farming games and is it better than Story of Seasons?',
          a: 'SunnySide distinguishes itself primarily through its authentic Japanese rural setting and its community-restoration premise, which gives the farming work moral weight beyond pure optimization. Most farming sims use vague European pastoral settings (even Japanese-developed ones like Story of Seasons); SunnySide specifically depicts a Japanese countryside with culturally specific festivals, architecture, food systems, and social dynamics. Whether it is "better" than Story of Seasons depends on what you value: SunnySide has more modern content density, a richer anime aesthetic, and authentic Japanese setting, while Friends of Mineral Town has a more emotionally refined relationship system built over decades of iteration. They are different enough that most players will find both worth playing.',
        },
        {
          q: 'How long is Little Dragon Cafe and is it worth playing compared to longer farming sims?',
          a: 'Little Dragon Café runs approximately 20-25 hours to see the main story through to completion, which is significantly shorter than Stardew Valley or Friends of Mineral Town. This is partly a limitation and partly a design choice: Yasuhiro Wada designed the game as a focused fairy tale rather than an open-ended life simulation, and the ending is earned and intentional rather than open. Whether this is worth it compared to longer games depends on what you value — if you prefer games that know when to end, Little Dragon Café\'s focused runtime contains more emotional precision per hour than most genre entries. Players who enjoy open-ended long-term farming sims may find it too brief. The dragon-raising mechanic and café management are genuinely distinct from standard farming sims and reward the attention of genre fans who want something different.',
        },
        {
          q: 'Is Little Dragon Cafe truly from the creator of Harvest Moon and what does that mean for how it plays?',
          a: 'Yes — Little Dragon Café was created by Yasuhiro Wada, who designed the original Bokujo Monogatari (Harvest Moon) series starting in 1996. After the legal dispute that separated him from the franchise IP he created, Wada founded Brownies and made Little Dragon Café as his new creative direction. His design philosophy is evident throughout: community relationships as the primary emotional engine, the cultivation of something fragile as the central mechanic, seasonal rhythm, and the fundamental belief that care and patience are their own narrative payoff. For players who loved early Harvest Moon games specifically for their emotional simplicity and relational depth rather than mechanical complexity, Little Dragon Café captures that original spirit more directly than most modern Story of Seasons entries, which have increasingly added systems to compete with Stardew Valley.',
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
    name: isZh
      ? '日式温馨农场游戏推荐测验'
      : 'Which Japanese Cozy Farming Game Is Right for You?',
    description: isZh
      ? '6道题从牧场物语矿石镇重制版、哆啦A梦牧场物语、SunnySide和小龙咖啡馆中找到你的匹配游戏。'
      : '6 questions to match you to Friends of Mineral Town remake, Doraemon Story of Seasons, SunnySide, or Little Dragon Café.',
    url: `${BASE_URL}/${locale}/quizzes/${SLUG}`,
    educationalLevel: 'beginner',
    about: {
      '@type': 'Thing',
      name: isZh ? '日式温馨农场游戏' : 'Japanese Cozy Farming Games',
    },
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

      <main className="min-h-screen bg-[#0f1a0f] px-4 py-12 text-[#e8dcc8]">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mb-3 text-5xl">🌸</div>
            <h1 className="mb-3 text-2xl font-bold leading-tight text-[#f0a832] md:text-3xl">
              {isZh
                ? '日式温馨农场游戏推荐测验'
                : 'Which Japanese Cozy Farming Game Is Right for You?'}
            </h1>
            <p className="text-[#8a9a7a]">
              {isZh
                ? '矿石镇重制 · 哆啦A梦 · SunnySide · 小龙咖啡馆 — 6道题找到你的匹配'
                : 'FoMT Remake · Doraemon SoS · SunnySide · Little Dragon Café — 6 questions'}
            </p>
          </div>

          <CozyJapanFarmQuiz locale={locale} />

          <section className="mt-16">
            <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">
              {locale === 'zh' ? '常见问题' : locale === 'zh-TW' ? '常見問題' : locale === 'ja' ? 'よくある質問' : locale === 'ko' ? '자주 묻는 질문' : locale === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-5">
              {faqItems.map(({ q, a }, i) => (
                <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 p-5">
                  <h3 className="mb-2 font-semibold text-[#f0a832]">{q}</h3>
                  <p className="text-sm leading-relaxed text-[#c8bca8]">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-12">
            <RelatedQuizzes currentSlug={SLUG} locale={locale} />
          </div>
        </div>
      </main>
    </>
  )
}
