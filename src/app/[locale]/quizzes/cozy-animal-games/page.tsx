import { CozyAnimalQuiz } from '@/components/tools/CozyAnimalQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const other = otherLocale(locale)
  const isZh = locale === 'zh'
  return {
    title: isZh
      ? '动物主题 Cozy 游戏测验 — 猫咪后院、WEBFISHING、无标题鹅作游戏还是小猫咪大城市？'
      : 'Which Animal Cozy Game Should You Play? Neko Atsume, WEBFISHING, Untitled Goose Game, or Little Kitty Big City?',
    description: isZh
      ? '6 个问题，找到最适合你的动物主题 cozy 游戏。猫咪后院的放置满足、WEBFISHING 的社交钓鱼、无标题鹅作游戏的恶作剧乐趣，还是小猫咪大城市的城市探索。'
      : '6 questions to find your animal cozy game — from idle cat-watching (Neko Atsume) to viral multiplayer fishing (WEBFISHING) to goose-powered mischief to city exploration as a lost cat.',
    keywords: isZh
      ? ['动物主题 cozy 游戏推荐', '猫咪后院值得玩吗', 'WEBFISHING 好玩吗', '无标题鹅作游戏评测', '小猫咪大城市评测', '有猫的 cozy 游戏', '手机 cozy 游戏推荐', '放置类 cozy 游戏']
      : [
          'cozy games with cats',
          'cozy games about animals',
          'neko atsume worth playing 2025',
          'webfishing game review',
          'is untitled goose game worth it',
          'little kitty big city review worth it',
          'cozy games for cat lovers',
          'best idle mobile cozy games',
          'webfishing steam review',
          'cozy games on game pass',
          'untitled goose game how long',
          'little kitty big city game pass',
          'best cozy games with animals',
          'cozy multiplayer games pc',
          'neko atsume reroll vs original',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/cozy-animal-games`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes/cozy-animal-games`,
        [other]: `${BASE_URL}/${other}/quizzes/cozy-animal-games`,
      },
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Neko Atsume still worth playing in 2025? What is Neko Atsume Reroll?',
    a: "Yes — Neko Atsume is still completely worth playing in 2025. The original game remains available and free on iOS and Android. In 2023, the developers released Neko Atsume: Kitty Collector Reroll, which is a full 3D remake with a charming Japanese neighborhood you can explore in addition to the yard. The Reroll version adds new cats, new collectibles, and seasonal events while preserving the core idle loop that made the original beloved. The original app is free; Reroll is also free to download with optional purchases. The game's entire appeal — leaving snacks out, checking back to see which cats visited, collecting cat photos and completing the album — remains as satisfying as it ever was. It is genuinely one of the most calming mobile games ever made.",
  },
  {
    q: 'What is WEBFISHING? Why did it go viral in 2024?',
    a: "WEBFISHING is a lo-fi multiplayer fishing game released in November 2024 on Steam for about $5. You create an animal avatar, join a lobby with up to 11 other players, and fish together in a peaceful pixelated environment with a cozy soundtrack. The game went viral because it unexpectedly became a gathering place — players chat, share what they catch, play music with in-game instruments, and decorate a shared space. It captures something rare: the social feeling of hanging out with friends without the pressure of competition or objectives. Reviews describe it as 'the most relaxing game of 2024' and 'the game that made me make online friends.' It is PC-only on Steam, costs about $5, and takes about 10 minutes to set up and start enjoying.",
  },
  {
    q: 'Is Untitled Goose Game worth buying? How long is it?',
    a: "Yes — Untitled Goose Game is absolutely worth buying. It is one of the most original and reliably funny games ever made. You complete a to-do list of mischief items as a determined goose disrupting an English village: stealing specific items, trapping people in areas, triggering specific panicked reactions. The game is short — about 2-3 hours for the main content, 4-5 hours to find all optional tasks — but it is perfectly paced and rarely outstays its welcome. It also has a two-player cooperative mode. Available on PC (Steam, Epic), Nintendo Switch, PlayStation 4, and Xbox. Frequently goes on sale for under $10. The 'GAME OF THE YEAR' edition (just the base game with that title self-applied, originally as a joke) has become a meme in itself.",
  },
  {
    q: 'What is Little Kitty Big City? Is it on Game Pass?',
    a: "Little Kitty, Big City is an exploration game released in May 2024 where you play as a small cat who fell out of an apartment window and needs to find a way home through a Japanese city neighborhood. You explore at ground level, knock things off shelves, collect wearable hats, befriend animals who give you tasks, and interact with humans who react to you with delighted confusion. It is about 4-6 hours to complete and is praised for its warmth, NPC charm, and the genuine satisfaction of seeing a detailed world from a cat's perspective. Yes — Little Kitty, Big City is available on Xbox Game Pass, making it free for subscribers. Also available on PC (Steam) and Nintendo Switch.",
  },
  {
    q: 'What are the best cozy games for cat lovers or animal lovers?',
    a: "The best cozy games for cat and animal lovers are: Neko Atsume (iOS/Android, free) — the original idle cat game; Little Kitty, Big City (PC/Switch/Xbox Game Pass) — play as a cat in a city; Stray (PC/PlayStation/Xbox) — a more cinematic game where you play as a cat in a post-human city; Cat Quest II (all platforms) — an RPG where you play as a cat or dog; and WEBFISHING (PC, $5) — a cozy multiplayer fishing game with animal avatars where the community is the charm. For non-cat animals: Untitled Goose Game for goose chaos, Alba: A Wildlife Adventure for nature photography and bird conservation, and Spiritfarer for a game about animals and a deeply emotional story. Take the Animal Cozy Games Quiz above to find your specific match.",
  },
]

const FAQ_ZH = [
  {
    q: '猫咪后院 2025 年还值得玩吗？猫咪后院 Reroll 是什么？',
    a: '是的——猫咪后院在 2025 年仍然完全值得玩。原版游戏在 iOS 和 Android 上仍然可以免费获取。2023 年，开发者发布了猫咪后院：猫咪收集者 Reroll，这是一个完整的 3D 重制版，除了院子之外还有一个迷人的日本街区可以探索。Reroll 版添加了新猫咪、新收藏品和季节性活动，同时保留了让原版深受喜爱的核心放置循环。原版应用免费；Reroll 也可以免费下载，有可选购买项。这款游戏的整个吸引力——放出零食、回来查看哪些猫咪来访、收集猫咪照片并完成图鉴——仍然和以前一样令人满足。这真的是有史以来最令人平静的手机游戏之一。',
  },
  {
    q: 'WEBFISHING 是什么游戏？为什么 2024 年它病毒式传播？',
    a: 'WEBFISHING 是一款于 2024 年 11 月在 Steam 上发布、售价约 5 美元的低保真多人钓鱼游戏。你创建一个动物化身，加入最多 11 名其他玩家的大厅，在一个有着温馨原声的平和像素环境中一起钓鱼。这款游戏之所以病毒式传播，是因为它出乎意料地成为了一个聚集地——玩家聊天、分享他们的收获、用游戏内乐器演奏音乐，并装饰共享空间。它捕捉到了一种罕见的东西：与朋友一起消磨时间的社交感觉，而没有竞争或目标的压力。评测将其描述为"2024 年最放松的游戏"和"让我结交网上朋友的游戏"。仅在 Steam 上的 PC 版本，约 5 美元，大约 10 分钟就能设置好并开始享受。',
  },
  {
    q: '无标题鹅作游戏值得购买吗？游戏时长多长？',
    a: '是的——无标题鹅作游戏绝对值得购买。这是有史以来最具原创性和最可靠有趣的游戏之一。你作为一只坚定的鹅，扰乱一个英国村庄，完成恶作剧清单：偷取特定物品、将人们困在区域内、触发特定的恐慌反应。游戏很短——主要内容大约 2-3 小时，找到所有可选任务需要 4-5 小时——但节奏完美，很少让人觉得拖沓。还有双人合作模式。可在 PC（Steam、Epic）、Nintendo Switch、PlayStation 4 和 Xbox 上获取。经常打折到 10 美元以下。',
  },
  {
    q: '小猫咪大城市是什么游戏？它在 Game Pass 上吗？',
    a: '小猫咪大城市是一款于 2024 年 5 月发布的探索游戏，你扮演一只从公寓窗户掉落的小猫，需要在日本城市街区找到回家的路。你从地面高度探索，把东西从架子上推下来，收集可穿戴的帽子，结交给你任务的动物，并与以喜悦困惑回应你的人类互动。完成大约需要 4-6 小时，以其温暖、NPC 魅力以及从猫咪视角看到详细世界的真实满足感而受到好评。是的——小猫咪大城市可在 Xbox Game Pass 上获取，对订阅者免费。也可在 PC（Steam）和 Nintendo Switch 上获取。',
  },
  {
    q: '有哪些适合猫咪或动物爱好者的 cozy 游戏推荐？',
    a: '最适合猫咪和动物爱好者的 cozy 游戏是：猫咪后院（iOS/Android，免费）——原版放置猫猫游戏；小猫咪大城市（PC/Switch/Xbox Game Pass）——在城市中扮演猫；Stray（PC/PlayStation/Xbox）——在后人类城市中扮演猫的更电影化游戏；猫咪斗恶龙 II（所有平台）——你扮演猫或狗的 RPG；以及 WEBFISHING（PC，5 美元）——有动物化身的温馨多人钓鱼游戏，社区是其魅力所在。非猫动物方面：无标题鹅作游戏带来鹅的混乱，Alba: A Wildlife Adventure 带来自然摄影和鸟类保护，Spiritfarer 带来关于动物的极具情感的故事。做上面的「动物 Cozy 游戏测验」，找到你的具体匹配。',
  },
]

export default async function CozyAnimalGamesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'
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
            {isZh ? '动物主题 Cozy 游戏测验' : 'Animal Cozy Games Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <CozyAnimalQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '动物游戏的独特之处：你不是在拯救世界，你只是在做一只动物——而这已经足够了。'
            : "What makes animal games special: you are not saving the world, you are just being an animal — and that is enough."}
        </p>

        <RelatedQuizzes currentSlug="cozy-animal-games" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '动物主题 Cozy 游戏常见问题' : 'Animal Cozy Games FAQ'}
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
