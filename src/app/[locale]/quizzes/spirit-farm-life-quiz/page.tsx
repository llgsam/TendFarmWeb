import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import { SpiritFarmLifeQuiz } from '@/components/tools/SpiritFarmLifeQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'

const SLUG = 'spirit-farm-life-quiz'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    title: isZh
      ? '灵气农场生活风格测验 — Spirittea/仙武门/Moonglow Bay/Everdream Valley | Farm Game Hub'
      : 'Spirit Farm Life Style Quiz — Spirittea, Immortal Life, Moonglow Bay, Everdream Valley | Farm Game Hub',
    description: isZh
      ? '6道题帮你发现最适合的灵气农场生活游戏：日式妖怪温泉Spirittea、仙侠修炼门派仙武门、海湾钓鱼疗愈Moonglow Bay、梦境动物农场Everdream Valley。双语推荐含攻略。'
      : '6 questions to find your spirit farming life match: Spirittea Japanese bathhouse spirits, Immortal Life xianxia cultivation farm, Moonglow Bay coastal fishing healing, or Everdream Valley animal dream farm. Bilingual guide with tips.',
    keywords: isZh
      ? [
          '灵气农场游戏推荐',
          'Spirittea值得买吗',
          '仙武门游戏评测',
          'Immortal Life farming game',
          'Moonglow Bay值得买吗',
          'Everdream Valley推荐',
          '日式妖怪农场游戏',
          '仙侠农场游戏',
          '钓鱼治愈系游戏',
          '动物梦境农场游戏',
        ]
      : [
          'spirit farm life quiz',
          'Spirittea worth it',
          'Immortal Life farming game review',
          'Moonglow Bay worth it',
          'Everdream Valley review worth it',
          'Japanese spirit farming game',
          'xianxia farming game',
          'fishing cozy game like Stardew',
          'animal bonding farming game',
          'cozy farming games 2023',
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
          q: 'Spirittea 值得购买吗？和千与千寻有多像？',
          a: '《Spirittea》非常值得购买，尤其对于《千与千寻》和《夏目友人帐》的粉丝来说。游戏确实深受这两部作品影响——主角进入一个人类看不见妖灵的小镇，开始经营温泉浴馆。核心区别是：Spirittea是一款真正的游戏，有完整的生活模拟机制（农业、社交、解谜），不只是叙事体验。如果你觉得"有《千与千寻》的世界观+星露谷的玩法"是你一直想要的，这款游戏几乎完美命中这个需求。',
        },
        {
          q: '仙武门（Immortal Life）是什么类型的游戏？有战斗吗？',
          a: '《仙武门》是中国仙侠修炼+农场模拟游戏。战斗确实存在，但相当轻量，不是游戏的核心内容——你花大部分时间在种植灵草、炼制丹药、管理门派和与NPC交流上。对于习惯修炼成仙题材小说的玩家，游戏提供的"境界突破"和"灵气成长"体验非常契合。对于纯农场模拟玩家，也完全可以把战斗当作辅助内容来对待。',
        },
        {
          q: 'Moonglow Bay 一个人玩会太孤独吗？游戏有多悲伤？',
          a: '《Moonglow Bay》的情感调性是"温柔忧郁而非压抑沉重"。游戏以失去为起点，但整个故事关于小镇社区如何共同治愈——你会遇到很多温暖的居民，游戏的情感走向是积极向前的。支持本地双人合作模式（split-screen），所以也可以和朋友一起玩，并不孤独。单人体验适合那些在现实生活中经历过失去、希望游戏给予陪伴感的玩家。',
        },
        {
          q: 'Everdream Valley 适合大人玩吗？还是只适合小孩？',
          a: '《Everdream Valley》虽然美术风格和玩法设计对儿童非常友好，但成年玩家同样报告了深度满足感——尤其是进入动物梦境这个独特机制，在任何年龄都令人着迷。游戏没有暴力、没有压力机制，是父母和孩子可以共同游玩的理想选择。对于成年玩家来说，游戏后期的梦境关卡有一定平台游戏难度，提供了超越纯治愈体验的挑战感。',
        },
        {
          q: '这四款游戏哪一款最适合《星露谷物语》玩家？',
          a: '取决于你最爱星露谷的哪个元素：喜欢社区关系和神秘感 → Spirittea；喜欢明确的进步感和资源管理 → 仙武门；喜欢钓鱼系统和情感深度 → Moonglow Bay；喜欢动物养成和探索新发现 → Everdream Valley。四款都有星露谷式的"日常节奏"核心，但各自发展了完全不同的灵魂。',
        },
      ]
    : [
        {
          q: 'Is Spirittea worth it for Spirited Away fans?',
          a: "Spirittea is absolutely worth it for Spirited Away fans. The game directly draws from the same aesthetic well as Miyazaki's film — a young person enters a spirit world hidden within a declining town, runs a bathhouse for supernatural beings, and gradually uncovers each spirit's story. The key difference from Spirited Away is that Spirittea is a full farming life sim, not just a narrative experience. You manage real crops, relationships, and bathhouse mechanics. If you've always wanted a Spirited Away game that gives you agency in that world, Spirittea is the closest thing that currently exists.",
        },
        {
          q: 'What is Immortal Life and is it worth playing if I like Stardew Valley?',
          a: 'Immortal Life is a Chinese cultivation xianxia farming game where you manage a spiritual farm as a martial cultivator, growing magical crops that power your breakthrough into higher cultivation realms. If you like Stardew Valley, you will recognize the farming loop immediately — plant, water, harvest, process, sell — but the cultural identity and progression system are completely distinct. The xianxia power-growth fantasy layered on top of farming is the unique hook. Worth it if you want a farming sim with a non-Western cultural lens and meaningful character progression.',
        },
        {
          q: 'Is Moonglow Bay worth it? Is it too sad?',
          a: "Moonglow Bay handles grief in a way that is gentle rather than crushing. The game begins with loss but unfolds as a story about community, routine, and finding beauty in small things. The emotional tone is melancholic but warm — think a quiet rainy day rather than a devastating story beat. The fishing mechanic is the deepest in any cozy game, which gives players an active, satisfying loop that carries them through the emotional narrative. It's worth it for players who want cozy games with emotional substance, not just feel-good escapism.",
        },
        {
          q: 'Is Everdream Valley good for adults or just kids?',
          a: "Everdream Valley is designed to be enjoyable for all ages. The art style is family-friendly and the overworld is peaceful, but the dream sequences introduce genuine platformer challenge that gives adult players something to engage with beyond the cozy surface. The animal bonding mechanic — entering each animal's dream to resolve its fears — is imaginative enough to be emotionally resonant for adults. It is also an excellent co-op option for playing alongside a child. The game does not condescend to younger players or bore older ones.",
        },
        {
          q: 'Which of these four games has the most replayability?',
          a: 'For long-term replayability: Immortal Life has the most systems depth, with cultivation progression, sect management, and a seasonal farming loop that evolves over multiple in-game years. Spirittea has strong replayability because the spirit character stories reward slow exploration across multiple playthroughs. Moonglow Bay is a more linear story experience but the fishing species variety is extensive. Everdream Valley has the least replayability of the four but is the most unique experience within a single playthrough.',
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
    name: isZh ? '灵气农场生活风格测验' : 'Which Spirit Farm Life Game Is Right for You?',
    description: isZh
      ? '6道双语题目，从Spirittea、仙武门、Moonglow Bay、Everdream Valley中找出最适合你的灵气农场生活游戏'
      : '6 questions to match you with your perfect spirit farm life game from Spirittea, Immortal Life, Moonglow Bay, and Everdream Valley',
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
          <div className="mb-3 text-5xl">🌸</div>
          <p className="mb-2 text-sm text-[#8a9a7a]">
            {isZh ? '灵气农场生活推荐' : 'Spirit Farm Life Pick'}
          </p>
          <h1 className="mb-3 text-2xl font-bold text-[#e8dcc8] md:text-3xl">
            {isZh
              ? '灵气农场生活风格测验'
              : 'Which Spirit Farm Life Game Is Right for You?'}
          </h1>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh
              ? 'Spirittea、仙武门、Moonglow Bay、Everdream Valley——6道题发现你的灵感农场游戏'
              : 'Spirittea, Immortal Life, Moonglow Bay, or Everdream Valley — 6 questions to find your match'}
          </p>
        </div>

        <SpiritFarmLifeQuiz locale={locale} />

        <div className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '常见问题' : 'Frequently Asked Questions'}
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
