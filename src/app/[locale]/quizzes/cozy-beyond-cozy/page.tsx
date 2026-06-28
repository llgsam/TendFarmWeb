import { CozyBeyondCozyQuiz } from '@/components/tools/CozyBeyondCozyQuiz'
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
      ? 'Cozy 玩家的下一步独立游戏推荐测验 — 高压清洗模拟器、星外拓荒、Tunic 还是奥伯拉丁号？'
      : 'Beyond Cozy: Which Indie Game Should You Try Next? PowerWash Simulator, Outer Wilds, Tunic, or Obra Dinn?',
    description: isZh
      ? '6 个问题，为 Cozy 游戏玩家找到完美的进阶独立游戏——零挑战冥想清洁、发现驱动的太阳系谜题、类塞尔达说明书秘密探索，还是 1-bit 船员命运演绎。'
      : '6 questions to find the perfect next game for cozy gamers who want to branch out — zero-challenge meditative cleaning, discovery-driven solar system mystery, a Zelda-like with a secret manual, or 1-bit deduction mystery.',
    keywords: isZh
      ? ['星外拓荒值得玩吗', '高压清洗模拟器评测值得买吗', 'Tunic 游戏评测', '奥伯拉丁号的回归评测', 'cozy 玩家进阶独立游戏推荐', '放松游戏推荐']
      : [
          'is outer wilds worth it 2024',
          'outer wilds game review worth buying',
          'outer wilds spoiler free review',
          'is powerwash simulator worth it',
          'powerwash simulator review worth buying',
          'powerwash simulator game pass',
          'tunic game worth it review',
          'tunic game xbox game pass review',
          'is return of the obra dinn worth it',
          'obra dinn review switch pc',
          'return of the obra dinn how long',
          'best indie games for cozy gamers',
          'cozy games for people who want more depth',
          'relaxing games that are also clever',
          'best unique indie games all time',
          'games with no combat like cozy games',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-beyond-cozy`,
      languages: buildLanguageAlternates('/quizzes/cozy-beyond-cozy'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Outer Wilds worth playing? Should I go in blind with no spoilers?',
    a: "Outer Wilds is worth playing and you must go in blind. This is not an exaggeration or a preference — it is the only way the game works. Outer Wilds is a mystery game where the discoveries ARE the content. Every planet in the solar system hides information about a civilization that vanished 280,000 years ago, and the process of finding that information and understanding what it means is the entire emotional arc of the game. If you know what is on each planet, the game is reduced to navigation. If you discover it yourself, the game is one of the most powerful experiences in any medium. The game received near-universal critical acclaim in 2019 (94 on Metacritic), appeared on dozens of decade-end lists, and is available on Xbox Game Pass. Length: 15-25 hours depending on how thoroughly you explore. There is some simple flight physics to learn (not hard) and some moments of time-pressure, but no combat is required. The Echoes of the Eye DLC adds a separate horror-adjacent experience — play it after the base game, and only if you have a high tolerance for tension.",
  },
  {
    q: 'Is PowerWash Simulator worth it? Is it actually relaxing or is it tedious?',
    a: "PowerWash Simulator is genuinely relaxing for most players who try it, but whether it is tedious depends entirely on your relationship to repetitive tasks. If you find tasks like folding laundry, washing dishes, or arranging objects satisfying — the kind of physical repetition that lets your mind wander — PowerWash Simulator is extremely relaxing. If you find repetitive tasks boring regardless of audiovisual feedback, it will feel tedious within an hour. The game's appeal is almost purely sensory: the hiss of the pressure washer, the visual transformation of objects from filthy to clean, the completion ping, the before-and-after color recovery. There is no story, no enemies, no fail states. The main campaign offers 25-30 hours of varied environments (backyard, playground, treehouse, fire station, van, garden shed, and more). Available on Xbox Game Pass. Has co-op multiplayer for cleaning with others. Won multiple awards for Most Relaxing Game. A great choice for people who watch cleaning videos on YouTube for the same reason.",
  },
  {
    q: 'Is Tunic worth buying? What makes it different from other Zelda-like games?',
    a: "Tunic (2022) is worth buying for players who love the feeling of figuring something out completely on your own. What distinguishes it from other Zelda-like games is its central conceit: the game's instruction manual — the physical booklet that used to come in the box with 1990s video games — is scattered as collectible pages throughout the world. The manual is written in a fictional runic language you cannot read, with diagrams that you can interpret. Over time, you piece together the game's mechanics and secrets not through cutscenes or tutorialtext but through finding pages of a document that someone else left for you. The world also hides a secret — not just a map secret but a system secret, a deeper layer beneath the game's surface that most players discover accidentally. The combat is difficult (genuinely Dark Souls-adjacent in challenge), but accessibility options let you remove the death penalty entirely without touching the puzzle content. Available on Xbox Game Pass. Won IGF Nuovo Award, BAFTA nomination. Created by one developer over six years.",
  },
  {
    q: 'Is Return of the Obra Dinn worth it on Nintendo Switch? How does the deduction work?',
    a: "Return of the Obra Dinn works well on Nintendo Switch and is worth every cent of its $20 price. The deduction system works as follows: you have a magic pocket watch that, when placed near human remains (a body, a skull, bones), shows you the moment of that person's death frozen in time, plus the audio of the last minute leading up to it. You write your deductions in a ledger: the person's name, how they died, and who or what caused it. You have sixty crew members to identify and sixty fates to determine. The game gives you enough information to solve every case through logic, cross-reference, and careful observation — no guessing required. When you have three correct answers in a row, the game confirms them. The 1-bit black-and-white dithered art style is immediately striking and completely iconic. Length: 8-15 hours for a first playthrough, depending on how systematic you are. Won BAFTA Best Game 2018. Created by Lucas Pope (Papers Please) as a solo developer. One of the most acclaimed indie games ever made.",
  },
  {
    q: 'What are the best indie games for cozy gamers who want something different?',
    a: "The best indie games for cozy gamers who want to branch out, organized by what cozy quality they keep: (1) For maximum relaxation with zero challenge: PowerWash Simulator (PC/Switch/Xbox/PS, ~$25 or Game Pass) — the most mindlessly satisfying game ever made; (2) For cozy games that love exploration: Outer Wilds (PC/Switch/Xbox/PS, ~$25 or Game Pass) — no combat required, pure curiosity-driven discovery in a solar system; (3) For cozy games that love finding secrets: Tunic (PC/Switch/Xbox/PS, ~$30 or Game Pass) — Zelda-like with accessibility options to remove combat difficulty; (4) For cozy games that love puzzles: Return of the Obra Dinn (PC/Switch/PS/Xbox, ~$20) — pure deduction with no reflex challenge; (5) For cozy games that love atmosphere: Cocoon (all platforms, ~$25 or Game Pass) — wordless, alien, beautiful puzzle adventure; (6) For cozy games that love music: Gris (PC/Switch/iOS, ~$17) — wordless watercolor journey, no fail states. Take the Beyond Cozy Quiz to find which of the top four fits your specific mood.",
  },
]

const FAQ_ZH = [
  {
    q: '星外拓荒值得玩吗？我应该在没有剧透的情况下盲目体验吗？',
    a: '星外拓荒值得玩，你必须盲目体验。这不是夸张或偏好——这是游戏运作的唯一方式。星外拓荒是一款谜题游戏，发现就是内容。太阳系中的每个星球都隐藏着关于 28 万年前消失的文明的信息，找到这些信息并理解其含义的过程是游戏的整个情感弧线。如果你知道每个星球上有什么，游戏就只剩导航了。如果你自己发现，游戏是任何媒介中最强大的体验之一。该游戏在 2019 年获得近乎普遍的批评好评（Metacritic 94 分），出现在数十个年代末榜单上，可在 Xbox Game Pass 上获取。时长：根据探索彻底程度 15-25 小时。有一些简单的飞行物理需要学习（不难），以及一些时间压力时刻，但不需要战斗。眼睛的回声 DLC 添加了一个独立的近恐怖体验——在主游戏之后体验，仅当你对紧张感有高容忍度时。',
  },
  {
    q: '高压清洗模拟器值得买吗？它真的放松还是无聊？',
    a: '高压清洗模拟器对于大多数尝试它的玩家来说确实放松，但它是否无聊完全取决于你与重复性任务的关系。如果你觉得叠衣服、洗碗或整理物品等任务令人满足——那种让你的思绪漫游的身体重复性——高压清洗模拟器极其放松。如果你无论视听反馈如何都觉得重复性任务无聊，那在一个小时内就会感到无聊。游戏的吸引力几乎纯粹是感官性的：高压清洗机的嘶嘶声、物体从肮脏到干净的视觉转变、完成提示音、前后颜色恢复。没有故事、没有敌人、没有失败状态。主要活动提供 25-30 小时的各种环境（后院、游乐场、树屋、消防站、面包车、花园棚等）。可在 Xbox Game Pass 上获取。有合作多人游戏可以与他人一起清洁。赢得多个最放松游戏奖项。对于出于同样原因在 YouTube 上观看清洁视频的人来说是个好选择。',
  },
  {
    q: 'Tunic 值得买吗？它与其他类塞尔达游戏有何不同？',
    a: 'Tunic（2022 年）对于喜欢完全独自弄清楚某事的感觉的玩家来说值得购买。它与其他类塞尔达游戏的区别在于其核心概念：游戏的说明手册——那种过去 1990 年代游戏盒子里附带的实物小册子——作为可收集页面散布在世界各地。手册是用你无法阅读的虚构符文语言写成的，附有你可以解读的图表。随着时间推移，你不是通过过场动画或教程文字，而是通过找到别人为你留下的文件页面来拼凑游戏的机制和秘密。世界还隐藏着一个秘密——不只是地图秘密，而是系统秘密，一个大多数玩家偶然发现的隐藏在游戏表面之下的更深层次。战斗很难（挑战性上真正接近黑暗之魂），但无障碍选项允许你完全移除死亡惩罚而不影响谜题内容。可在 Xbox Game Pass 上获取。赢得 IGF Nuovo 奖、BAFTA 提名。由一位开发者历时六年创作。',
  },
  {
    q: '奥伯拉丁号的回归在 Nintendo Switch 上值得吗？演绎系统如何工作？',
    a: '奥伯拉丁号的回归在 Nintendo Switch 上运行良好，值得其 20 美元的每一分钱。演绎系统工作方式如下：你有一个魔法怀表，当放置在人类遗骸（尸体、头骨、骨骼）附近时，会向你显示该人死亡时刻的冻结场景，以及此前一分钟的音频。你在账本中写下你的推断：该人的名字、他们如何死亡以及谁或什么造成了这一切。你有六十名船员要识别，六十个命运要确定。游戏给你足够的信息，仅通过逻辑、交叉参考和仔细观察就能解决每个案例——不需要猜测。当你连续得到三个正确答案时，游戏会确认它们。1-bit 黑白抖动艺术风格立即引人注目且完全标志性。时长：第一次通关 8-15 小时，取决于你的系统性程度。2018 年 BAFTA 最佳游戏。由 Lucas Pope（Papers Please）作为独立开发者创作。有史以来最受好评的独立游戏之一。',
  },
  {
    q: '想要尝试不同体验的 Cozy 游戏玩家，最好的独立游戏有哪些？',
    a: '想要拓展的 cozy 游戏玩家最好的独立游戏，按保留的 cozy 品质组织：(1) 零挑战最大放松：高压清洗模拟器（PC/Switch/Xbox/PS，约 25 美元或 Game Pass）——有史以来最无脑满足的游戏；(2) 喜欢探索的 cozy 玩家：星外拓荒（PC/Switch/Xbox/PS，约 25 美元或 Game Pass）——不需要战斗，在太阳系中纯粹由好奇心驱动的发现；(3) 喜欢找秘密的 cozy 玩家：Tunic（PC/Switch/Xbox/PS，约 30 美元或 Game Pass）——类塞尔达，有无障碍选项移除战斗难度；(4) 喜欢谜题的 cozy 玩家：奥伯拉丁号的回归（PC/Switch/PS/Xbox，约 20 美元）——没有反应挑战的纯演绎；(5) 喜欢氛围的 cozy 玩家：Cocoon（全平台，约 25 美元或 Game Pass）——无言的、异域的、美丽的谜题冒险；(6) 喜欢音乐的 cozy 玩家：Gris（PC/Switch/iOS，约 17 美元）——无言的水彩之旅，没有失败状态。做「Cozy 进阶测验」，找出前四款中哪款最适合你特定的心情。',
  },
]

export default async function CozyBeyondCozyPage({
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
            {isZh ? 'Cozy 玩家进阶独立游戏测验' : 'Beyond Cozy Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyBeyondCozyQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? 'Cozy 游戏教会你耐心、探索的乐趣和对细节的关注。这些品质带你走进一些有史以来最出色的独立游戏。'
            : 'Cozy games teach patience, the joy of exploration, and attention to detail. Those qualities are exactly what the best indie games ask for too.'}
        </p>

        <RelatedQuizzes currentSlug="cozy-beyond-cozy" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? 'Cozy 玩家进阶独立游戏常见问题' : 'Beyond Cozy — Indie Games FAQ'}
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
