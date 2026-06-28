import { CozyAtmosphereQuiz } from '@/components/tools/CozyAtmosphereQuiz'
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
      ? '根据心情氛围选 Cozy 游戏测验 — Coffee Talk、Season、天穗之咲稻姬还是花园物语？'
      : 'Which Cozy Game Matches Your Atmosphere? Coffee Talk, Season, Sakuna, or Garden Story?',
    description: isZh
      ? '6 个感官问题，根据你此刻的天气感受和心情氛围，在 Coffee Talk、Season: 致未来的信、天穗之咲稻姬和花园物语中找到最适合你的 Cozy 体验。'
      : '6 sensory questions to find your cozy game based on atmosphere and mood — rainy café, contemplative bicycle journey, seasonal rice harvest, or spring garden community.',
    keywords: isZh
      ? ['根据心情选 cozy 游戏', 'Coffee Talk 评测值得买吗', 'Season 致未来的信评测', '天穗之咲稻姬评测值得玩吗', '花园物语评测', '雨天玩什么游戏', '秋天 cozy 游戏推荐', '氛围 cozy 游戏']
      : [
          'cozy games for rainy days',
          'cozy games for rainy weather',
          'best games to play on a rainy day',
          'coffee talk review worth it',
          'is coffee talk worth buying',
          'season a letter to the future review worth playing',
          'sakuna of rice and paddy review worth it',
          'is sakuna worth it switch',
          'garden story review worth it',
          'cozy games for autumn fall',
          'cozy games for winter evenings',
          'atmospheric cozy games 2024 2025',
          'cozy games with seasonal themes',
          'cozy games with beautiful art style',
          'cozy games about seasons',
          'best cozy games for bad weather days',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-atmosphere-quiz`,
      languages: buildLanguageAlternates('/quizzes/cozy-atmosphere-quiz'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Coffee Talk worth buying? Is it really just a café game?',
    a: "Coffee Talk is one of the most emotionally intelligent cozy games ever made, and calling it 'just a café game' undersells it significantly. You are a barista in a modern-fantasy Seattle making drinks for customers — but those customers are elves, orcs, werewolves, mermaids, and aliens, each carrying real stories about loneliness, immigration, creative failure, parental disapproval, and connection. The drink-making mechanic is simple (select 3 ingredients in order), but it unlocks or changes story paths based on whether you read the customer correctly. The game is about 4-6 hours for a complete playthrough, costs about $13, and is available on essentially every platform including iOS and Android. Coffee Talk Episode 2 continues the world with new characters and is equally good. Perfect for rainy evenings when you want warmth and humanity.",
  },
  {
    q: "What is Season: A Letter to the Future? Is it just a walking sim?",
    a: "Season: A Letter to the Future is closer to a 'cycling sim' — you travel by bicycle — but it is more than a walking sim in meaningful ways. The core mechanic is active documentation: you use a camera to photograph scenes, a microphone to record ambient sounds, and collect physical objects (pressing them into your journal). You are essentially building a time capsule of a world that is about to be wiped clean by a recurring cataclysm called 'the season.' The game has a complete narrative arc about 6-8 hours, BAFTA nominated for narrative, and is one of the most genuinely moving games of 2023. It has light puzzles and environmental storytelling but no combat. The pacing is intentionally slow and contemplative. For players who enjoy games like What Remains of Edith Finch or Firewatch, Season is an essential recommendation — it asks 'what is worth preserving' in a way that stays with you.",
  },
  {
    q: 'Is Sakuna: Of Rice and Paddy worth it on Switch? Is it more farming or more action?',
    a: "Sakuna: Of Rice and Paddy is approximately 60% farming and 40% action on a first playthrough, but the balance shifts toward farming as you deepen your involvement — the rice cultivation system is so detailed that many players spend entire sessions purely managing the paddy. The action side-scrolling combat is solid but relatively simple; the rice growing is where the game shows its depth. On Switch the farming portions play beautifully in handheld mode, and the cozy domestic sequences (cooking, listening to the family talk in the evenings) are some of the most charming moments in any farming game. The game is about 25-30 hours for the main story and considerably longer for completionists. It received excellent reviews on release in 2020. Often on sale for around $20. One of the best games for players who love Stardew Valley's seasonal rhythm and want something with a very different cultural setting.",
  },
  {
    q: 'Is Garden Story good? What kind of game is it exactly?',
    a: "Garden Story (2021) is a cozy RPG where you play as Concord, a small grape protecting a seasonal island community. It combines very gentle combat (a top-down action style similar to early Zelda but easier), community quest completion (townspeople ask for specific items or help), and environmental restoration (clearing Rot corruption from different areas). The game is divided into four seasonal zones — each with different weather, community members, and challenges — and takes about 8-12 hours to complete. It is not as deep as Stardew Valley or as challenging as Zelda, but that is intentional: Garden Story is explicitly designed to be something cozy and achievable. The visual style is soft and colorful, the writing is warm, and the sense of gradually reviving a community is genuinely satisfying. Perfect for players who want a short, complete cozy RPG with no grind and no frustration.",
  },
  {
    q: 'What cozy games are best for rainy days, winter, or bad weather?',
    a: "The best cozy games for rainy days and bad weather are: Coffee Talk (PC/Switch/PlayStation/Xbox/Mobile, ~$13) — rain sounds, warm amber cafe light, human stories; Stardew Valley (all platforms, ~$15) — the rainy in-game days are beloved for a reason, perfect winter farming rhythm; What Remains of Edith Finch (PC/Switch/PlayStation/Xbox, ~$20) — 2-3 hours of the most moving atmospheric walking sim ever made; Season: A Letter to the Future (PC/PlayStation, ~$20) — a contemplative journey through a world ending beautifully; and Spiritfarer (PC/Switch/PlayStation/Xbox, ~$30) — the most emotionally resonant cozy game for a quiet winter evening. For pure rainy-day background ambiance: PowerWash Simulator (all platforms, ~$25) or Dorfromantik (PC/Switch, ~$15) both have a meditative quality ideal for grey afternoons. Take the Cozy Atmosphere Quiz to find the right match for your specific mood.",
  },
]

const FAQ_ZH = [
  {
    q: 'Coffee Talk 值得买吗？它真的只是一款咖啡馆游戏吗？',
    a: 'Coffee Talk 是有史以来情感智慧最高的 cozy 游戏之一，称它为"只是咖啡馆游戏"大大低估了它。你是一家现代奇幻西雅图咖啡馆的咖啡师，为顾客制作饮料——但那些顾客是精灵、兽人、狼人、美人鱼和外星人，每个人都有关于孤独、移民、创意失败、父母不赞同和联系的真实故事。制作饮料的机制很简单（按顺序选择 3 种食材），但基于你是否正确解读了顾客，它会解锁或改变故事路径。这款游戏完整通关大约需要 4-6 小时，售价约 13 美元，可在几乎所有平台上获取，包括 iOS 和 Android。Coffee Talk 第 2 集以新角色延续了这个世界，同样出色。完美适合雨夜，当你想要温暖和人情味时。',
  },
  {
    q: 'Season: 致未来的信是什么游戏？它只是一款步行模拟吗？',
    a: 'Season: 致未来的信更接近"骑行模拟"——你骑自行车旅行——但它在有意义的方面不仅仅是步行模拟。核心机制是主动记录：你用相机拍摄场景，用麦克风录制环境声音，收集实物（将它们压入你的日记本）。你本质上是在为一个即将被称为"季节"的反复发生的灾变清除记忆的世界建造一个时间囊。这款游戏有一个大约 6-8 小时的完整叙事弧线，BAFTA 叙事类提名，是 2023 年最真实感人的游戏之一。它有轻度谜题和环境叙事但没有战斗。节奏刻意缓慢和沉思。对于喜欢艾迪芬奇的记忆或看火人等游戏的玩家，Season 是必要推荐——它以一种留存心间的方式提问"什么值得保存"。',
  },
  {
    q: '天穗之咲稻姬 Switch 版值得买吗？它更多是农耕还是动作？',
    a: '天穗之咲稻姬在初次通关时大约 60% 农耕、40% 动作，但随着你深入参与，平衡向农耕倾斜——水稻种植系统如此详细，许多玩家花整个时段纯粹管理稻田。横版动作战斗很扎实但相对简单；水稻种植才是游戏展示深度的地方。Switch 版本中，农耕部分在掌机模式下体验极佳，家庭场景（做饭、傍晚听家人聊天）是任何农场游戏中最迷人的时刻之一。这款游戏主线故事大约需要 25-30 小时，完美主义者需要更长时间。2020 年发布时获得了优秀的评价。通常特价约 20 美元。是喜欢星露谷物语季节节律并想要完全不同文化设定的玩家的最佳游戏之一。',
  },
  {
    q: '花园物语好玩吗？它究竟是什么类型的游戏？',
    a: '花园物语（2021 年）是一款 cozy RPG，你扮演保护季节性岛屿社区的小葡萄康科德。它结合了非常温和的战斗（俯视角动作风格，类似早期塞尔达但更容易）、社区任务完成（镇民要求特定物品或帮助）和环境修复（清除不同区域的腐败污染）。游戏分为四个季节区域——每个区域都有不同的天气、社区成员和挑战——完成大约需要 8-12 小时。它不如星露谷物语深入，也不如塞尔达具有挑战性，但这是有意为之：花园物语明确设计为 cozy 且可实现的。视觉风格柔和多彩，写作温暖，逐渐复兴社区的感觉真实令人满足。完美适合想要一款没有磨练和挫折的短篇、完整 cozy RPG 的玩家。',
  },
  {
    q: '雨天、冬天或恶劣天气时玩什么 Cozy 游戏最好？',
    a: '雨天和恶劣天气最好的 cozy 游戏是：Coffee Talk（PC/Switch/PlayStation/Xbox/手机，约 13 美元）——雨声、温暖的琥珀色咖啡馆灯光、人情味的故事；星露谷物语（全平台，约 15 美元）——游戏内雨天的原因是有道理的，完美的冬季农耕节律；艾迪芬奇的记忆（PC/Switch/PlayStation/Xbox，约 20 美元）——有史以来最感人的氛围步行模拟，2-3 小时；Season: 致未来的信（PC/PlayStation，约 20 美元）——穿越一个以美丽方式结束的世界的沉思之旅；以及 Spiritfarer（PC/Switch/PlayStation/Xbox，约 30 美元）——安静冬夜最有情感共鸣的 cozy 游戏。纯粹雨天背景环境方面：PowerWash Simulator（全平台，约 25 美元）或 Dorfromantik（PC/Switch，约 15 美元）都有适合灰色午后的冥想质量。做「氛围 Cozy 游戏测验」，找到最适合你特定心情的游戏。',
  },
]

export default async function CozyAtmosphereQuizPage({
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
            {isZh ? '氛围 Cozy 游戏测验' : 'Cozy Atmosphere Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyAtmosphereQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '最好的 Cozy 游戏不只是好玩——它让你感觉自己身处应该在的地方。'
            : 'The best cozy games do not just feel good — they feel like exactly where you should be right now.'}
        </p>

        <RelatedQuizzes currentSlug="cozy-atmosphere-quiz" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '氛围 Cozy 游戏常见问题' : 'Cozy Atmosphere Games FAQ'}
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
