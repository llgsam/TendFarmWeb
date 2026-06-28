import { CozySoundtrackQuiz } from '@/components/tools/CozySoundtrackQuiz'
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
      ? 'Cozy 游戏原声音乐测验 — Celeste、Gris、Chicory 还是林中夜晚？'
      : 'Which Cozy Game Soundtrack Matches Your Taste? Celeste, Gris, Chicory, or Night in the Woods?',
    description: isZh
      ? '6 个关于音乐感受的问题，找到拥有你最爱原声带的 Cozy 游戏——格莱美提名电子乐、无言水彩管弦乐、温暖探索配乐，还是独立摇滚小镇故事。'
      : '6 questions about how music moves you — find the cozy game with your perfect soundtrack: Grammy-nominated electronic, wordless orchestral watercolor, warm coloring adventure, or indie rock small-town story.',
    keywords: isZh
      ? ['cozy 游戏原声音乐', 'Celeste 值得玩吗', 'Celeste 配乐评测', 'Gris 游戏评测值得买吗', 'Chicory 涂色游戏评测', '林中夜晚评测值得玩吗', '最佳独立游戏配乐', '放松游戏配乐推荐']
      : [
          'cozy games with best music',
          'best cozy game soundtracks',
          'games with best music 2024',
          'is celeste worth it 2024',
          'celeste game review worth buying',
          'celeste ost lena raine grammy',
          'gris game review worth it',
          'gris worth buying indie game',
          'chicory a colorful tale review worth it',
          'chicory a colorful tale worth buying',
          'is night in the woods worth it',
          'night in the woods review switch',
          'best indie game soundtracks for relaxing',
          'cozy games with emotional music',
          'cozy games with great ost',
          'best relaxing game soundtracks indie',
          'games with lena raine music',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-soundtrack-quiz`,
      languages: buildLanguageAlternates('/quizzes/cozy-soundtrack-quiz'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Celeste worth it? Why is the Celeste soundtrack so highly praised?',
    a: "Celeste is worth buying at $20 and essential playing for anyone interested in how music and game design can reinforce each other. Composer Lena Raine built the Celeste OST with layered tracks that respond dynamically to gameplay: the same piece shifts instrumentation depending on whether Madeline is struggling, resting, or succeeding. The score received a Grammy nomination in 2021 — the first electronic video game score ever nominated. Each chapter has a distinct musical theme: Chapter 1 is tentative synth, Chapter 2 is mirror-logic and inversions, Chapter 3 is energetic tech ambiance, Chapter 6 is fragmented and dissonant reflecting Madeline's mental state. The final chapter's music is widely described as emotionally cathartic by players who have gotten there. The Celeste Farewell DLC added more Raine compositions that many fans consider the best in the entire score. Raine has since composed for Final Fantasy XIV and other major projects. Celeste won over 50 awards including Game of the Year nominations from most major outlets.",
  },
  {
    q: 'Is Gris worth playing? How long is it, and does it have any gameplay?',
    a: "Gris is 2-4 hours long, costs about $17 (often on sale for $5-8 on Steam and Switch), and is worth experiencing for anyone who values visual and musical artistry in games. The gameplay is gentle platforming — you move left and right, jump, and eventually acquire abilities that let you interact with the world differently (turning into a stone cube to weigh things down, diving underwater, floating on wind currents). There are no enemies and no fail states: you cannot die or do anything wrong. The 'gameplay' exists mainly to pace the music and give you agency over how you move through the experience. For players who want mechanical depth or challenge, Gris is not the right game — it is closer to an interactive film or a music visualizer than a traditional platformer. For players who want pure emotional and aesthetic experience, it is among the most beautiful 2-4 hours in gaming. The soundtrack by Berlinist (a Spanish indie band) is orchestral with strong choral elements and was released as a standalone album.",
  },
  {
    q: 'Is Chicory: A Colorful Tale worth buying? What kind of game is it exactly?',
    a: "Chicory: A Colorful Tale (2021) is a coloring + adventure RPG hybrid that has a lot more emotional and narrative depth than its art-toy premise suggests. You are a young dog who picks up a magic paintbrush and must use it to restore color to a world that has gone grey. The 'coloring' mechanic means you are literally painting the world around you in real-time as you explore — trees, walls, floors, sky — and there are no right or wrong ways to color anything. Completing the story takes 10-15 hours, and there are significant unlockable areas and puzzles. The story deals with imposter syndrome, creative anxiety, and the relationship between a mentor and their successor in a way that is surprisingly emotionally honest for a game about painting. The soundtrack by Lena Raine is lighter and more playful than her Celeste work but equally crafted — different biomes have distinct musical themes that evolve as the world regains color. Available on PC, Switch, and PlayStation. Won the BAFTA Game Award for Music in 2022.",
  },
  {
    q: 'Is Night in the Woods worth it on Nintendo Switch? What kind of game is it?',
    a: "Night in the Woods is a narrative adventure game that consists primarily of walking around a small rust-belt town, talking to people, and piecing together what happened to the town and to the protagonist Mae. There is minimal 'gameplay' in the traditional sense: you can jump and interact with objects, play a rhythm-game bass guitar minigame with your bandmates, and participate in dream sequences. The core of the experience is the writing and character work, which is consistently cited as some of the best in any video game — the residents of Possum Springs feel like real people, the conversations feel like actual human interactions, and the game's portrayal of working-class town decline, millennial anxiety, mental health, and religious doubt is specific and honest. On Nintendo Switch it runs well and is one of the best narrative games on the platform. First playthrough takes 6-10 hours; there is replay value in seeing different friend routes. Won multiple awards in 2017. Note: co-creator Alec Holowka passed away in 2019; the game remains available with full developer royalties handled per their estate agreement.",
  },
  {
    q: 'What are the best cozy games with great soundtracks or music?',
    a: "The best cozy games known for exceptional music, ranked by musical distinctiveness: (1) Celeste — Lena Raine's Grammy-nominated electronic score, responds dynamically to gameplay; (2) Gris — Berlinist's orchestral-choral album, the music IS the game; (3) Night in the Woods — Alec Holowka's indie guitar score sounds like the town; (4) Chicory: A Colorful Tale — Lena Raine again, lighter and more playful; (5) Spiritfarer — Max LL's jazz-influenced tender score for each spirit; (6) Coffee Talk — a lo-fi hip-hop album that plays in a rainy café; (7) Journey — Austin Wintory's Oscar-nominated orchestral score, Grammy-nominated; (8) A Short Hike — Mark Sparling's warm guitar/piano score perfect for afternoon walking; (9) Stardew Valley — ConcernedApe's surprisingly rich seasonal chiptune-to-orchestral range; (10) Season: A Letter to the Future — Yann Van Der Cruyssen's ambient-folk environmental soundscapes. Take the Cozy Soundtrack Quiz above to find which of the top four matches your specific musical taste.",
  },
]

const FAQ_ZH = [
  {
    q: 'Celeste 值得买吗？为什么 Celeste 的配乐如此备受称赞？',
    a: 'Celeste 以 20 美元的价格值得购买，对于任何对音乐和游戏设计如何相互强化感兴趣的人来说都是必玩之作。作曲家 Lena Raine 用分层轨道构建了 Celeste 原声带，这些轨道对游戏动态响应：同一首曲目根据 Madeline 是在挣扎、休息还是成功而改变乐器配置。该配乐在 2021 年获得格莱美提名——有史以来第一个获提名的电子视频游戏配乐。每个章节都有独特的音乐主题：第 1 章是犹豫的合成器，第 2 章是镜像逻辑和反转，第 3 章是充满活力的科技氛围，第 6 章是碎片化和不和谐的，反映了 Madeline 的心理状态。最后章节的音乐被到达那里的玩家广泛描述为情感宣泄。Celeste Farewell DLC 添加了更多 Raine 的作品，许多粉丝认为是整个配乐中最好的。Raine 此后为最终幻想 XIV 和其他主要项目创作了配乐。Celeste 赢得了 50 多个奖项，包括大多数主要媒体的年度游戏提名。',
  },
  {
    q: 'Gris 值得玩吗？它有多长，它有游戏性吗？',
    a: 'Gris 长 2-4 小时，售价约 17 美元（Steam 和 Switch 上常特价 5-8 美元），对于任何重视游戏中视觉和音乐艺术性的人来说都值得体验。游戏性是温和的平台游戏——你左右移动、跳跃，最终获得让你与世界以不同方式互动的能力（变成石头方块来压重东西，潜入水下，随风漂浮）。没有敌人，没有失败状态：你不能死，也不能做任何错误的事情。"游戏性"主要是为了配合音乐节奏，让你对如何穿越体验拥有主动权。对于想要机械深度或挑战的玩家，Gris 不是合适的游戏——它更像是一部互动电影或音乐可视化器，而不是传统平台游戏。对于想要纯粹情感和美学体验的玩家，它是游戏中最美丽的 2-4 小时之一。Berlinist（一个西班牙独立乐队）的配乐是带有强力合唱元素的管弦乐，并作为独立专辑发布。',
  },
  {
    q: 'Chicory: A Colorful Tale 值得买吗？它究竟是什么类型的游戏？',
    a: 'Chicory: A Colorful Tale（2021 年）是一款涂色 + 冒险 RPG 混合游戏，其情感和叙事深度远超其艺术玩具前提所暗示的。你是一只年轻的狗，拿起魔法画笔，必须用它为变成灰色的世界恢复颜色。"涂色"机制意味着你在探索时字面意义上实时为周围的世界绘画——树木、墙壁、地板、天空——没有正确或错误的涂色方式。完成故事需要 10-15 小时，有重要的可解锁区域和谜题。故事以令人惊讶的情感诚实方式处理了冒名顶替综合症、创意焦虑以及导师与其继承者之间的关系——对于一款关于绘画的游戏来说相当深刻。Lena Raine 的配乐比她在 Celeste 中的作品更轻盈、更俏皮，但同样精心制作——不同生物群落有不同的音乐主题，随着世界重新获得颜色而演变。PC、Switch 和 PlayStation 均可。2022 年赢得 BAFTA 游戏音乐奖。',
  },
  {
    q: '林中夜晚（Night in the Woods）在 Nintendo Switch 上值得玩吗？它是什么类型的游戏？',
    a: '林中夜晚是一款叙事冒险游戏，主要由在小锈带城镇散步、与人交谈以及拼凑出城镇和主角 Mae 发生了什么组成。传统意义上的"游戏性"很少：你可以跳跃和与物体互动，与乐队成员玩节奏游戏贝斯吉他小游戏，并参与梦境序列。体验的核心是写作和人物塑造，这始终被引用为任何视频游戏中最好的——Possum Springs 的居民感觉像真实的人，对话感觉像真实的人类互动，游戏对工人阶级城镇衰落、千禧一代焦虑、心理健康和宗教怀疑的描绘是具体而诚实的。在 Nintendo Switch 上运行良好，是该平台上最好的叙事游戏之一。第一次通关需要 6-10 小时；在不同朋友路线中有重玩价值。2017 年赢得多个奖项。注意：联合创始人 Alec Holowka 于 2019 年去世；该游戏仍然可用，版税按其遗产协议处理。',
  },
  {
    q: '哪些 Cozy 游戏以出色的配乐或音乐著称？',
    a: '按音乐独特性排名的最佳 cozy 游戏配乐：(1) Celeste——Lena Raine 获格莱美提名的电子配乐，对游戏动态响应；(2) Gris——Berlinist 的管弦-合唱专辑，音乐就是游戏本身；(3) 林中夜晚——Alec Holowka 的独立吉他配乐听起来像小镇本身；(4) Chicory: A Colorful Tale——再次是 Lena Raine，更轻盈俏皮；(5) Spiritfarer——Max LL 为每个灵魂创作的爵士风格温柔配乐；(6) Coffee Talk——在雨天咖啡馆播放的 lo-fi 嘻哈专辑；(7) Journey——Austin Wintory 获奥斯卡提名的管弦乐配乐，获格莱美提名；(8) A Short Hike——Mark Sparling 适合下午散步的温暖吉他/钢琴配乐；(9) 星露谷物语——ConcernedApe 令人惊喜的丰富季节性芯片乐到管弦乐范围；(10) Season: A Letter to the Future——Yann Van Der Cruyssen 的环境-民谣环境音景。做上面的「Cozy 原声音乐测验」，找出前四名中哪款最符合你特定的音乐品味。',
  },
]

export default async function CozySoundtrackQuizPage({
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
            {isZh ? 'Cozy 游戏原声音乐测验' : 'Cozy Soundtrack Quiz'}
          </span>
        </nav>

        <h1 className="mb-4 text-2xl font-bold leading-tight text-[#e8dcc8]">
          {isZh ? 'Cozy 游戏原声音乐测验' : 'Cozy Soundtrack Quiz'}
        </h1>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozySoundtrackQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '一款游戏的配乐不是背景——它是游戏告诉你它是谁的方式。有时候，找到对的游戏就是找到对的音乐。'
            : "A game's soundtrack isn\'t background — it\'s how the game tells you who it is. Sometimes finding the right game means finding the right music first."}
        </p>

        <RelatedQuizzes currentSlug="cozy-soundtrack-quiz" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? 'Cozy 游戏原声音乐常见问题' : 'Cozy Game Soundtracks FAQ'}
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
