import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { NewWaveFarmQuiz } from '@/components/tools/NewWaveFarmQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

const SLUG = 'new-wave-farm-quiz'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    title: isZh
      ? '新浪潮农场游戏推荐测验 — 梅林回响/Sugardew/生长常树之歌/Farm Together 2 | Farm Game Hub'
      : 'New-Wave Farming Game Quiz — Echoes of the Plum Grove, Sugardew Island, Grow Song of the Evertree, Farm Together 2 | Farm Game Hub',
    description: isZh
      ? '6道题找出最适合你的新浪潮农场游戏：跨代叙事梅林回响、纯治愈Sugardew Island、世界修复生长常树之歌、还是合作农耕Farm Together 2？双语推荐含完整攻略。'
      : '6 questions to find your new-wave farming match: Echoes of the Plum Grove generational story, Sugardew Island pure cozy, Grow Song of the Evertree world restoration, or Farm Together 2 co-op farming. Full bilingual guide.',
    keywords: isZh
      ? [
          '新浪潮农场游戏推荐',
          '梅林回响评测值得买',
          'Sugardew Island推荐',
          '生长常树之歌评测',
          'Farm Together 2好玩吗',
          '2024农场游戏推荐',
          '跨代传承农场游戏',
          '合作农场游戏PC',
          '世界建造农场游戏',
          '类星露谷新游戏',
        ]
      : [
          'new wave farming game quiz',
          'Echoes of the Plum Grove review worth it',
          'Sugardew Island worth it',
          'Grow Song of the Evertree review',
          'Farm Together 2 worth it',
          'farming games 2024',
          'generational farming game',
          'co-op farming game PC Switch',
          'world building farming game',
          'games like Stardew Valley 2024',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/${SLUG}`,
      languages: buildLanguageAlternates(`/quizzes/${SLUG}`),
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const faqItems = isZh
    ? [
        {
          q: '梅林回响（Echoes of the Plum Grove）是什么游戏？和《符文工房》的跨代玩法有什么不同？',
          a: '《梅林回响》是一款专注于多代家族传承的生命模拟+农场游戏。与《符文工房》相比，最大区别在于情感基调：Echoes直接面对死亡、衰老和遗产的主题，游戏中的失去是真实且有重量的，而不是为了推进功能机制的工具。Kynseed（跨代农场游戏）的情感基调更偏幽默和英式奇幻，Echoes更接近文学意义上的严肃作品。如果你对农场游戏处理"人生意义"的方式有更高期待，Echoes值得投入时间。',
        },
        {
          q: 'Sugardew Island 是给小孩玩的吗？',
          a: 'Sugardew Island对儿童友好，但完全不限于儿童受众。它是一款精心设计的治愈农场游戏，专为需要无压力、零焦虑的游戏体验的人设计——这个需求跨越了所有年龄层。许多成年玩家反映，Sugardew Island是他们在高压工作日之后最愿意打开的游戏之一，因为它从不惩罚任何选择、永远提供正向反馈。',
        },
        {
          q: '《生长：常树之歌》和《Yonder》是同一个开发商吗？有什么区别？',
          a: '是的，两款都由Prideful Sloth开发。核心区别在于：Yonder是传统的开放世界探索+农场游戏，主角是一个孤独的旅者；Grow的核心是世界炼金和生态建造，你通过培育"常世"种子生长整个微型世界，玩法更具创造性和实验性。喜欢Yonder的玩家通常也会喜欢Grow，但Grow的体验更富想象力，Yonder更传统。',
        },
        {
          q: 'Farm Together 2 和第一代有什么改进？',
          a: 'Farm Together 2在第一代基础上主要改进了：更丰富的农场自定义选项、扩大的作物和建筑种类库、改善的异步多人体验（更容易管理多个朋友同时访问的农场）、以及视觉升级。如果你已经玩过并喜欢第一代，二代是值得入手的横向升级；如果你是新玩家，直接购买二代是最佳选择。',
        },
        {
          q: '这四款游戏哪款最适合星露谷完成度爱好者？',
          a: '取决于你在星露谷里最喜欢"完成"什么：如果你喜欢完成社区中心和博物馆 → Grow（完成各类生态和小镇建筑）；如果你喜欢与每位村民建立满级关系 → Sugardew Island；如果你喜欢通关后继续玩第二个存档体验不同选择 → 梅林回响（代际选择差异）；如果你更喜欢和朋友一起打成就 → Farm Together 2。',
        },
      ]
    : [
        {
          q: 'What is Echoes of the Plum Grove and is it worth it?',
          a: 'Echoes of the Plum Grove is a multi-generational life simulation and farming game where your characters age, die, and pass the farm to their children across multiple generations. It is worth it for players who want a farming game with genuine emotional depth and literary ambition — the game directly addresses themes of loss, aging, and legacy in ways that other farming games avoid. If you found the Grandpa evaluation in Stardew Valley unexpectedly moving, Echoes of the Plum Grove builds an entire game around that feeling.',
        },
        {
          q: 'Is Sugardew Island worth it for Stardew Valley fans?',
          a: "Sugardew Island is worth it for Stardew Valley fans who primarily love the game's peaceful daily rhythm and want an experience that removes every potential source of stress. It is less mechanically deep than Stardew but more consistently calming. The fairy-tale aesthetic is distinct enough to feel fresh rather than derivative. If you have ever wished Stardew had a mode with no energy bar, no crop failures, and no time pressure, Sugardew Island is essentially that experience built as a full game.",
        },
        {
          q: 'Is Grow: Song of the Evertree worth buying? How long is it?',
          a: 'Grow: Song of the Evertree is worth buying for players who enjoy the creative and exploratory aspects of farming games more than the economic optimization. A full playthrough to restore the Evertree takes approximately 20-30 hours, with additional content from biome completion, town building, and co-op play extending well beyond that. It is one of the most platform-accessible farming-adjacent games available, running well on Switch, PS4/5, Xbox, and PC.',
        },
        {
          q: 'Is Farm Together 2 good for long-distance friends?',
          a: "Farm Together 2 is excellent for long-distance friends and is one of the best games specifically designed for that use case. The asynchronous multiplayer means each player can tend the farm on their own schedule — you don't need to be online simultaneously to make progress together. The farm's persistent state means a friend in a different time zone can water your crops while you sleep and you can harvest them in the morning. It is low-stakes enough that differences in play time don't create imbalance.",
        },
        {
          q: 'Which of these four games has the best content-to-price value?',
          a: 'Farm Together 2 typically offers the best hours-per-dollar value because its design encourages indefinite continued play with no defined endpoint. Grow: Song of the Evertree has a clear narrative end but substantial post-game content. Echoes of the Plum Grove has high replayability through different generational choices but is more finite per playthrough. Sugardew Island is the most compact experience of the four, which is appropriate given its design priority of quality-of-relaxation over quantity-of-content.',
        },
      ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const quizJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: isZh ? '新浪潮农场游戏推荐测验' : 'Which New-Wave Farming Game Is Right for You?',
    description: isZh
      ? '6道双语题目，从梅林回响、Sugardew Island、生长常树之歌、Farm Together 2中找出最适合你的新浪潮农场游戏'
      : '6 questions to match you with your new-wave farming game from Echoes of the Plum Grove, Sugardew Island, Grow Song of the Evertree, and Farm Together 2',
    url: `${BASE_URL}/${locale}/quizzes/${SLUG}`,
  }

  return (
    <main className="min-h-screen bg-[#0f1a0f] px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(quizJsonLd) }}
        />

        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">🌱</div>
          <p className="mb-2 text-sm text-[#8a9a7a]">
            {isZh ? '新浪潮农场游戏推荐' : 'New-Wave Farming Pick'}
          </p>
          <h1 className="mb-3 text-2xl font-bold text-[#e8dcc8] md:text-3xl">
            {isZh
              ? '新浪潮农场游戏推荐测验'
              : 'Which New-Wave Farming Game Is Right for You?'}
          </h1>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh
              ? '梅林回响、Sugardew Island、生长常树之歌、Farm Together 2——6道题找到你的下一款农场游戏'
              : 'Echoes of the Plum Grove, Sugardew Island, Grow, or Farm Together 2 — 6 questions to find your match'}
          </p>
        </div>

        <NewWaveFarmQuiz locale={locale} />

        <div className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {locale === 'zh' ? '常见问题' : locale === 'zh-TW' ? '常見問題' : locale === 'ja' ? 'よくある質問' : locale === 'ko' ? '자주 묻는 질문' : locale === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-5">
            {faqItems.map((item, i) => (
              <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 p-5">
                <h3 className="mb-2 font-semibold text-[#f0a832]">{item.q}</h3>
                <p className="text-sm leading-relaxed text-[#c8bca8]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <RelatedQuizzes currentSlug={SLUG} locale={locale} />
      </div>
    </main>
  )
}
