import Link from 'next/link'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'

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
      ? '农场游戏大全 2025 — Farm Game Hub'
      : 'All Farming Games 2025 — Farm Game Hub',
    description: isZh
      ? '全球农场游戏大全：Hay Day、星露谷物语、动物森友会、Farming Simulator 等 20+ 款游戏介绍、平台与风格分类，帮你找到最适合自己的农场游戏。'
      : 'The complete list of farming games — Hay Day, Stardew Valley, Animal Crossing, Farming Simulator, and 20+ more. Find your perfect farming game by platform and style.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/games`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/games`,
        [other]: `${BASE_URL}/${other}/games`,
      },
    },
  }
}

type Platform = 'iOS' | 'Android' | 'PC' | 'Switch' | 'PS' | 'Xbox'
type Style = 'casual' | 'strategy' | 'simulation' | 'rpg' | 'multiplayer'

interface Game {
  slug: string
  nameZh: string
  nameEn: string
  descZh: string
  descEn: string
  platforms: Platform[]
  styles: Style[]
  color: string
  emoji: string
  hasTools?: boolean
  hasGuides?: boolean
  featured?: boolean
}

const GAMES: Game[] = [
  {
    slug: 'hay-day',
    nameZh: 'Hay Day',
    nameEn: 'Hay Day',
    descZh: '超轻松的农场经营游戏，种作物、养动物、做商品、和邻居交易。适合碎片时间。',
    descEn: 'Casual farm management — grow crops, raise animals, craft goods, and trade with neighbors.',
    platforms: ['iOS', 'Android'],
    styles: ['casual'],
    color: '#f0a832',
    emoji: '🌻',
    hasTools: true,
    hasGuides: true,
    featured: true,
  },
  {
    slug: 'stardew-valley',
    nameZh: '星露谷物语',
    nameEn: 'Stardew Valley',
    descZh: '像素风农场 RPG，经营农场、探索矿洞、与村民交友。内容极其丰富，深度极高。',
    descEn: 'Pixel-art farm RPG — build your farm, explore mines, and befriend townsfolk in a charming world.',
    platforms: ['PC', 'Switch', 'iOS', 'Android', 'PS', 'Xbox'],
    styles: ['rpg', 'simulation'],
    color: '#7bc67e',
    emoji: '🌱',
    hasTools: true,
    hasGuides: true,
    featured: true,
  },
  {
    slug: 'animal-crossing',
    nameZh: '动物森友会',
    nameEn: 'Animal Crossing: New Horizons',
    descZh: '在无人岛上建立自己的小天地，和动物邻居相处，每天都有新发现。',
    descEn: 'Build your dream island, befriend animal villagers, and enjoy the slow pace of island life.',
    platforms: ['Switch'],
    styles: ['casual', 'simulation'],
    color: '#5db8b2',
    emoji: '🏝️',
    hasGuides: true,
    featured: true,
  },
  {
    slug: 'farming-simulator',
    nameZh: 'Farming Simulator',
    nameEn: 'Farming Simulator 25',
    descZh: '高度写实的农业模拟，驾驶真实农机、管理农场、支持多人合作。硬核向。',
    descEn: 'Realistic agricultural simulation with real machinery brands, crop management, and multiplayer.',
    platforms: ['PC', 'PS', 'Xbox'],
    styles: ['simulation', 'multiplayer'],
    color: '#8a9a7a',
    emoji: '🚜',
    featured: true,
  },
  {
    slug: 'coral-island',
    nameZh: 'Coral Island',
    nameEn: 'Coral Island',
    descZh: '热带海岛农场生活，融合环保主题，可以下潜清洁珊瑚礁。星露谷风格的进化版。',
    descEn: 'Tropical island farming with an eco-friendly twist — dive to clean coral reefs and befriend islanders.',
    platforms: ['PC', 'Switch', 'PS', 'Xbox'],
    styles: ['rpg', 'simulation'],
    color: '#4db8d4',
    emoji: '🪸',
  },
  {
    slug: 'sun-haven',
    nameZh: 'Sun Haven',
    nameEn: 'Sun Haven',
    descZh: '多人农场 RPG，有精灵、龙和魔法元素，战斗系统更丰富，支持最多 8 人联机。',
    descEn: 'Multiplayer farming RPG with elves, dragons, and magic — up to 8 players on one farm.',
    platforms: ['PC', 'Switch'],
    styles: ['rpg', 'multiplayer'],
    color: '#d4a84b',
    emoji: '🌈',
  },
  {
    slug: 'story-of-seasons',
    nameZh: '牧场物语',
    nameEn: 'Story of Seasons',
    descZh: '农场游戏元老，经营农场、与村民恋爱结婚，系列作品众多，温馨治愈。',
    descEn: 'The original farming RPG series — run your farm, build relationships, and find love in a cozy rural town.',
    platforms: ['Switch', 'PC'],
    styles: ['rpg', 'casual'],
    color: '#e8a07a',
    emoji: '🐄',
  },
  {
    slug: 'rune-factory',
    nameZh: '符文工房',
    nameEn: 'Rune Factory',
    descZh: '农场 + 动作 RPG 混合，在田间耕作之余还能进入地下城战斗，内容量惊人。',
    descEn: 'Farm meets action RPG — tend your crops by day and fight dungeons by night.',
    platforms: ['Switch', 'PC'],
    styles: ['rpg', 'strategy'],
    color: '#9b7fd4',
    emoji: '⚔️',
  },
  {
    slug: 'my-time-at-portia',
    nameZh: '波西亚时光',
    nameEn: 'My Time at Portia',
    descZh: '废土世界里的农场建造游戏，收集材料、制作工具、重建工作坊，3D 画面精美。',
    descEn: 'Post-apocalyptic crafting and farming — rebuild your workshop and restore the town of Portia.',
    platforms: ['PC', 'Switch', 'PS', 'Xbox'],
    styles: ['simulation', 'rpg'],
    color: '#c4a06a',
    emoji: '🏗️',
  },
  {
    slug: 'littlewood',
    nameZh: 'Littlewood',
    nameEn: 'Littlewood',
    descZh: '勇者打败魔王之后，回到村庄重建家园的轻松农场建造游戏。极度治愈放松。',
    descEn: 'After slaying the demon, rebuild your peaceful village — the most relaxing post-adventure farming game.',
    platforms: ['PC', 'Switch'],
    styles: ['casual', 'simulation'],
    color: '#6abf69',
    emoji: '🏘️',
  },
  {
    slug: 'ranch-simulator',
    nameZh: 'Ranch Simulator',
    nameEn: 'Ranch Simulator',
    descZh: '写实牧场经营，砍树建棚、养牛养猪、管理农场经济，支持多人联机。',
    descEn: 'Realistic ranch management — chop trees, build structures, raise livestock, and manage your economy.',
    platforms: ['PC'],
    styles: ['simulation', 'multiplayer'],
    color: '#a07050',
    emoji: '🐖',
  },
  {
    slug: 'slime-rancher',
    nameZh: '史莱姆牧场主',
    nameEn: 'Slime Rancher',
    descZh: '在外星球牧养各种可爱史莱姆，射击 + 牧场经营的独特组合，色彩缤纷。',
    descEn: 'Wrangle cute slimes on an alien planet in this colorful first-person farming shooter.',
    platforms: ['PC', 'PS', 'Xbox', 'Switch'],
    styles: ['casual', 'simulation'],
    color: '#f0709a',
    emoji: '🟢',
  },
  {
    slug: 'sakuna-rice-and-ruin',
    nameZh: '天穗之咲稻姬',
    nameEn: 'Sakuna: Of Rice and Ruin',
    descZh: '日本和风横版动作 + 水稻种植，种稻的细节极度还原，战斗爽快，独一无二。',
    descEn: 'Japanese action platformer meets authentic rice cultivation — the most detailed farming mechanics in any game.',
    platforms: ['Switch', 'PC', 'PS'],
    styles: ['rpg', 'strategy'],
    color: '#e8d080',
    emoji: '🌾',
  },
  {
    slug: 'roots-of-pacha',
    nameZh: 'Roots of Pacha',
    nameEn: 'Roots of Pacha',
    descZh: '史前时代的农场游戏，发明农业、驯化动物，带领部落走向文明，概念新颖。',
    descEn: 'Stone Age farming — discover agriculture, domesticate animals, and lead your tribe into civilization.',
    platforms: ['PC', 'Switch', 'PS', 'Xbox'],
    styles: ['rpg', 'simulation'],
    color: '#c49a6a',
    emoji: '🦴',
  },
  {
    slug: 'potion-permit',
    nameZh: '魔法药剂师',
    nameEn: 'Potion Permit',
    descZh: '作为皇家药剂师来到小镇，采集药草、制作药剂、治疗居民，农场 + 生活模拟。',
    descEn: 'Play as a chemist in a small town — harvest ingredients, brew potions, and heal the townsfolk.',
    platforms: ['PC', 'Switch', 'PS', 'Xbox'],
    styles: ['casual', 'rpg'],
    color: '#8a7fd4',
    emoji: '⚗️',
  },
]

const PLATFORM_LABELS: Record<Platform, string> = {
  iOS: 'iOS',
  Android: 'Android',
  PC: 'PC',
  Switch: 'Switch',
  PS: 'PS',
  Xbox: 'Xbox',
}

const STYLE_LABELS_ZH: Record<Style, string> = {
  casual: '休闲',
  strategy: '策略',
  simulation: '模拟经营',
  rpg: 'RPG',
  multiplayer: '多人联机',
}

const STYLE_LABELS_EN: Record<Style, string> = {
  casual: 'Casual',
  strategy: 'Strategy',
  simulation: 'Simulation',
  rpg: 'RPG',
  multiplayer: 'Multiplayer',
}

export default async function GamesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'
  const styleLabels = isZh ? STYLE_LABELS_ZH : STYLE_LABELS_EN

  const featured = GAMES.filter((g) => g.featured)
  const others = GAMES.filter((g) => !g.featured)

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">
          {isZh ? '全球农场游戏' : 'Farming Games Directory'}
        </p>
        <h1 className="mb-4 text-4xl font-bold text-[#e8dcc8]">
          {isZh ? '农场游戏大全' : 'All Farming Games'}
        </h1>
        <p className="max-w-xl text-lg text-[#8a9a7a]">
          {isZh
            ? '从休闲手游到硬核模拟，一份帮你找到下一款农场游戏的完整列表。'
            : 'From casual mobile games to hardcore simulations — the complete guide to finding your next farming game.'}
        </p>
      </div>

      {/* Featured: 深度覆盖游戏 */}
      <section className="mb-14">
        <h2 className="mb-5 text-sm uppercase tracking-widest text-[#8a9a7a]">
          {isZh ? '深度覆盖游戏 — 有工具和攻略' : 'Featured — Tools & Guides Available'}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((game) => (
            <div
              key={game.slug}
              className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{game.emoji}</span>
                  <div>
                    <h3 className="font-bold text-[#e8dcc8]">
                      {isZh ? game.nameZh : game.nameEn}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {game.platforms.map((p) => (
                        <span key={p} className="rounded bg-[#2d3d2d] px-1.5 py-0.5 text-[10px] text-[#8a9a7a]">
                          {PLATFORM_LABELS[p]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-[#8a9a7a]">
                {isZh ? game.descZh : game.descEn}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {game.styles.map((s) => (
                  <span key={s} className="rounded-full border border-[#2d3d2d] px-2 py-0.5 text-[11px] text-[#8a9a7a]">
                    {styleLabels[s]}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                {game.hasTools && (
                  <Link
                    href={`/${locale}/tools/${game.slug}`}
                    className="text-xs text-[#f0a832] hover:underline"
                  >
                    🔧 {isZh ? '计算器' : 'Calculator'}
                  </Link>
                )}
                {game.hasGuides && (
                  <Link
                    href={`/${locale}/guides/${game.slug}`}
                    className="text-xs text-[#f0a832] hover:underline"
                  >
                    📖 {isZh ? '游戏攻略' : 'Guides'}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More games */}
      <section>
        <h2 className="mb-5 text-sm uppercase tracking-widest text-[#8a9a7a]">
          {isZh ? '更多农场游戏' : 'More Farming Games'}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((game) => (
            <div
              key={game.slug}
              className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xl">{game.emoji}</span>
                <span className="font-semibold text-[#e8dcc8] text-sm">
                  {isZh ? game.nameZh : game.nameEn}
                </span>
              </div>
              <p className="mb-2 text-xs leading-relaxed text-[#8a9a7a]">
                {isZh ? game.descZh : game.descEn}
              </p>
              <div className="flex flex-wrap gap-1">
                {game.platforms.map((p) => (
                  <span key={p} className="rounded bg-[#2d3d2d] px-1.5 py-0.5 text-[10px] text-[#8a9a7a]">
                    {PLATFORM_LABELS[p]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Submit a game */}
      <div className="mt-12 rounded-xl border border-dashed border-[#2d3d2d] p-6 text-center">
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '还有我们没收录的好游戏？'
            : 'Know a great farming game we missed?'}
          {' '}
          <a href="mailto:jsamgogo@gmail.com" className="text-[#f0a832] hover:underline">
            {isZh ? '告诉我们 →' : 'Let us know →'}
          </a>
        </p>
      </div>
    </div>
  )
}
