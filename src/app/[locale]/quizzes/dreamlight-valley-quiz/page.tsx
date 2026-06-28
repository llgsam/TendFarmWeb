import { DreamlightValleyQuiz } from '@/components/tools/DreamlightValleyQuiz'
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
      ? '你是哪位 Disney Dreamlight Valley 角色？— 人格测验'
      : 'Which Disney Dreamlight Valley Character Are You? — Personality Quiz',
    description: isZh
      ? '6 个问题，测出你最像莫阿娜、WALL-E、艾莎还是高飞。含每位角色的游戏攻略提示，结果适合截图分享。'
      : '6 questions to find your Disney Dreamlight Valley character match — Moana, WALL-E, Elsa, or Goofy. Each result includes an in-game tip for that character.',
    keywords: isZh
      ? ['Disney Dreamlight Valley 角色测验', 'Dreamlight Valley 新手攻略', 'Dreamlight Valley 角色', '你是哪位迪士尼角色', 'Dreamlight Valley 免费吗', '莫阿娜 艾莎 高飞 测验']
      : [
          'which disney dreamlight valley character are you',
          'disney dreamlight valley quiz',
          'dreamlight valley personality quiz',
          'dreamlight valley tips for beginners',
          'is disney dreamlight valley free',
          'dreamlight valley best characters to befriend',
          'dreamlight valley moana wall-e elsa goofy',
          'disney dreamlight valley 2025',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/dreamlight-valley-quiz`,
      languages: buildLanguageAlternates('/quizzes/dreamlight-valley-quiz'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Disney Dreamlight Valley free to play?',
    a: "Disney Dreamlight Valley launched as a paid early access game in 2022 and became free-to-play in December 2023. It is now available at no cost on PC (Steam, Epic Games Store), Nintendo Switch, PlayStation 4/5, Xbox One, Xbox Series X|S, and iOS/Android mobile. The base game is free; additional content packs, cosmetic items, and some character quest expansions are sold separately in the in-game shop. The game is also included in Xbox Game Pass and PlayStation Plus Extra/Premium catalogs, where subscribers can play at no additional cost.",
  },
  {
    q: 'Which characters are in Disney Dreamlight Valley?',
    a: "Disney Dreamlight Valley features a large and growing roster of Disney and Pixar characters. The base game includes: Mickey Mouse, Minnie Mouse, Goofy, Donald Duck, Daisy Duck, Merlin (Sword in the Stone), Moana, WALL-E, Simba, Nala, Scar, Timon, Pumbaa (Lion King), Mirabel, Bruno, Isabela, Luisa (Encanto), Buzz Lightyear, Woody (Toy Story), Remy, Colette (Ratatouille), Elsa, Anna, Kristoff, Olaf, Hans (Frozen), Ariel, Ursula, Eric, Flounder (The Little Mermaid), Belle, Beast, Gaston, Lumière (Beauty and the Beast), Rapunzel (Tangled), Stitch (Lilo & Stitch), Maui (Moana), and more. Additional characters are regularly added via seasonal Star Path events and paid DLC content packs.",
  },
  {
    q: 'What should I do first in Disney Dreamlight Valley as a beginner?',
    a: "As a Disney Dreamlight Valley beginner: (1) Complete the early tutorial quests to unlock the crafting table, cooking stove, and basic tools. (2) Talk to every character daily — friendship XP accumulates quickly with daily conversations and cooking them their favorite meals. (3) Befriend Goofy early — his shop sells key crafting materials and upgrades as your friendship grows, making him one of the most economically important early characters. (4) Cook meals regularly — cooking is the fastest way to earn Star Coins and restore energy. (5) Complete character friendship quests as they unlock — they give Dreamlight, which is the currency for unlocking new biomes. (6) Do not spend Star Coins on the shop early — save them for character quest requirements.",
  },
  {
    q: 'How do you get more Dreamlight in Disney Dreamlight Valley?',
    a: "Dreamlight is the main progression currency used to unlock new biomes in Dreamlight Valley. You earn it by: completing Dreamlight Duties (daily and weekly tasks visible in the Dreamlight menu — this is the fastest source), progressing through character friendship questlines, placing furniture and decorating your Valley, completing cooking recipes for the first time, and harvesting crops and mining resources. Prioritize Dreamlight Duties every day — they reset daily and weekly and are by far the most efficient source of Dreamlight for progression.",
  },
  {
    q: 'Is Disney Dreamlight Valley worth playing in 2025?',
    a: "Yes — Disney Dreamlight Valley is worth playing in 2025, especially if you enjoy cozy life simulation games. Since going free-to-play in late 2023, the game has expanded significantly with new biomes, characters, and storylines. The core experience — decorating your valley, befriending Disney characters, cooking, fishing, and following character questlines — is genuinely charming and polished. The main criticism is that DLC content packs and seasonal Star Path content can feel expensive. However, the base free-to-play version has substantial content that can keep you busy for 50+ hours.",
  },
]

const FAQ_ZH = [
  {
    q: 'Disney Dreamlight Valley 是免费游戏吗？',
    a: 'Disney Dreamlight Valley 于 2022 年作为付费抢先体验游戏发布，并于 2023 年 12 月转为免费游玩。现在可在 PC（Steam、Epic Games Store）、任天堂 Switch、PlayStation 4/5、Xbox One、Xbox Series X|S 以及 iOS/Android 手机上免费下载。基础游戏免费；额外内容包、外观道具和部分角色任务扩展在游戏内商店单独出售。该游戏也包含在 Xbox Game Pass 和 PlayStation Plus Extra/Premium 订阅中，订阅者无需额外付费即可游玩。',
  },
  {
    q: 'Disney Dreamlight Valley 里有哪些角色？',
    a: 'Disney Dreamlight Valley 拥有大量不断增加的迪士尼和皮克斯角色。基础游戏包括：米奇、米妮、高飞、唐老鸭、黛西（迪士尼经典）、梅林（石中剑）、莫阿娜、WALL-E、辛巴、娜娜、刀疤、丁满、彭彭（狮子王）、米拉贝尔、布鲁诺、伊莎贝拉、路伊莎（魔法满屋）、巴斯光年、胡迪（玩具总动员）、雷米、可莱特（料理鼠王）、艾莎、安娜、克里斯托弗、雪宝、汉斯（冰雪奇缘）、爱丽儿、乌苏拉、艾瑞克、小比目（小美人鱼）、贝儿、野兽、加斯顿、烛台（美女与野兽）、乐佩（魔发奇缘）、史迪仔（星际宝贝）、毛伊（海洋奇缘）等。更多角色会通过季节性星路活动和付费 DLC 内容包持续加入。',
  },
  {
    q: 'Disney Dreamlight Valley 新手第一步应该做什么？',
    a: '作为 Dreamlight Valley 新手：(1) 完成早期教程任务，解锁制作台、烹饪炉和基础工具。(2) 每天和每位角色交谈——日常对话和为他们烹饪最喜欢的食物能快速积累好感度。(3) 尽早和高飞建立好感——他的商店出售关键制作材料，并随好感度升级，是游戏前期最重要的经济来源之一。(4) 经常烹饪——烹饪是赚取星星金币和恢复体力的最快方式。(5) 随着解锁进度完成角色好感度任务——它们提供星辉，用于解锁新的生态区。(6) 前期不要把星星金币花在商店——留着用于角色任务需求。',
  },
  {
    q: 'Disney Dreamlight Valley 里怎么获得更多星辉（Dreamlight）？',
    a: '星辉是 Dreamlight Valley 用于解锁新生态区的主要进度货币。获取方式：完成星辉任务（游戏内星辉菜单中的每日和每周任务——这是最快的来源）、推进角色好感度故事线、在 Valley 里放置家具并装饰、首次完成烹饪食谱、收获作物和挖矿资源。每天优先完成星辉任务——它们每日和每周重置，是迄今为止最高效的星辉来源。',
  },
  {
    q: 'Disney Dreamlight Valley 2025 年还值得玩吗？',
    a: '值得——尤其如果你喜欢 Cozy 生活模拟游戏。自 2023 年底转为免费后，游戏已大幅扩展，新增了生态区、角色和故事线。核心体验——装饰 Valley、与迪士尼角色建立友谊、烹饪、钓鱼和完成角色故事线——是真正迷人且制作精良的。主要争议点是 DLC 内容包和季节性星路内容可能感觉价格偏高。但免费的基础版本内容相当充实，足以让你游玩 50 小时以上。',
  },
]

export default async function DreamlightValleyQuizPage({
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
            {isZh ? 'Disney Dreamlight Valley 角色测验' : 'Disney Dreamlight Valley Quiz'}
          </span>
        </nav>

        <h1 className="mb-4 text-2xl font-bold leading-tight text-[#e8dcc8]">
          {isZh ? 'Disney Dreamlight Valley 角色测验' : 'Disney Dreamlight Valley Quiz'}
        </h1>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <DreamlightValleyQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '每位迪士尼角色都代表一种看待世界的方式——你的那种，永远都是对的。'
            : "Every Disney character sees the world differently — yours is the right one for you."}
        </p>

        <RelatedQuizzes currentSlug="dreamlight-valley-quiz" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于 Disney Dreamlight Valley 的常见问题' : 'Disney Dreamlight Valley FAQ'}
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
