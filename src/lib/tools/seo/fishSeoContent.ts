import { FISH, type FishLoc } from '@/components/tools/stardewFishData'

export interface Faq {
  q: string
  a: string
}

function pickFishLoc(loc: FishLoc, locale: string): string {
  if (locale === 'zh') return loc.zh
  if (locale === 'zh-TW') return loc.zhTW
  if (locale === 'ja') return loc.ja
  if (locale === 'ko') return loc.ko
  if (locale === 'de') return loc.de
  return loc.en
}

// Data-derived facts (computed at call time so they track the data).
function facts(locale: string) {
  const total = FISH.length
  const top = FISH.reduce((a, b) => (b.price > a.price ? b : a))
  const topName = pickFishLoc(top.name, locale)
  const springCount = FISH.filter((f) => f.seasons.includes('spring')).length
  return { total, topName, topPrice: top.price, springCount }
}

type SummaryFn = (f: ReturnType<typeof facts>) => string

const SUMMARIES: Record<string, SummaryFn> = {
  en: (f) =>
    `Stardew Valley has ${f.total} rod-caught fish across all four seasons. The most valuable is the ${f.topName}, selling for ${f.topPrice}g. ${f.springCount} of them can be caught in spring. Use the finder above to filter by season, location, and weather, or browse the full list below.`,
  zh: (f) =>
    `星露谷物语共有 ${f.total} 种钓竿鱼，横跨春夏秋冬四季。其中最值钱的是${f.topName}，售价 ${f.topPrice}g。有 ${f.springCount} 种可以在春季钓到。用上面的查询器按季节、地点和天气筛选，或查看下方的完整列表。`,
  'zh-TW': (f) =>
    `星露谷物語共有 ${f.total} 種釣竿魚，橫跨春夏秋冬四季。其中最值錢的是${f.topName}，售價 ${f.topPrice}g。有 ${f.springCount} 種可以在春季釣到。用上面的查詢器按季節、地點和天氣篩選，或查看下方的完整列表。`,
  ja: (f) =>
    `スターデューバレーには四季を通じて ${f.total} 種類の釣り竿で釣れる魚がいます。最も高価なのは${f.topName}で、売値は ${f.topPrice}g。うち ${f.springCount} 種類は春に釣れます。上の検索で季節・場所・天気で絞り込むか、下の全リストをご覧ください。`,
  ko: (f) =>
    `스타듀 밸리에는 사계절에 걸쳐 낚싯대로 잡을 수 있는 물고기가 ${f.total}종 있습니다. 가장 비싼 것은 ${f.topName}(으)로 ${f.topPrice}g에 팔립니다. 그중 ${f.springCount}종은 봄에 잡을 수 있습니다. 위의 검색기로 계절·장소·날씨로 필터링하거나 아래 전체 목록을 확인하세요.`,
  de: (f) =>
    `Stardew Valley hat ${f.total} mit der Angel fangbare Fische über alle vier Jahreszeiten. Der wertvollste ist der ${f.topName} mit ${f.topPrice}g. ${f.springCount} davon lassen sich im Frühling fangen. Nutze den Finder oben, um nach Jahreszeit, Ort und Wetter zu filtern, oder sieh dir die vollständige Liste unten an.`,
}

export function fishSummary(locale: string): string {
  const fn = SUMMARIES[locale] ?? SUMMARIES.en
  return fn(facts(locale))
}

const FISH_FAQS: Record<'en' | 'zh', Faq[]> = {
  en: [
    {
      q: 'What is the most valuable fish in Stardew Valley?',
      a: 'The Lava Eel is the most valuable rod-caught fish, selling for 700g at base quality. It lives in the lava pools on Mines level 100 and on Ginger Island, and bites at any time of day. Its high value also makes it a strong Fish Pond breeding target for steady profit.',
    },
    {
      q: 'What fish can I catch in spring in Stardew Valley?',
      a: 'Spring has one of the fullest rosters — ocean fish like Anchovy and Sardine, river fish like Catfish (rainy days only) and Shad, plus the mine fish that bite year-round. Set the finder above to Spring to see the full list with times, locations, and prices.',
    },
    {
      q: 'Which fish can only be caught when it is raining?',
      a: 'The rain-locked fish are the Walleye, Catfish, Eel, Red Snapper, and Shad — they only bite while it is raining, so save rainy days for them. The Catfish in particular is a valuable 200g catch and a common bundle and quest target.',
    },
    {
      q: 'What are the best early-game fish for profit?',
      a: "Early on, the Catfish (200g, rivers on rainy days) is the standout, and the Mines' Stonefish and Ice Pip become strong once you can fish the mine pools. Otherwise sell whatever you catch and prioritize rainy days — that is when the most valuable weather-locked fish appear.",
    },
  ],
  zh: [
    {
      q: '星露谷物语里最值钱的鱼是哪一条？',
      a: '熔岩鳗鱼（Lava Eel）是售价最高的钓竿鱼，基础品质售价 700g。它栖息在矿井 100 层的岩浆池以及姜岛，全天候都能上钩。高售价也让它成为鱼塘养殖持续赚钱的优选目标。',
    },
    {
      q: '星露谷春季能钓到哪些鱼？',
      a: '春季的可钓鱼种非常丰富——海里的鳀鱼、沙丁鱼，河里的鲶鱼（仅雨天）、西鲱，以及全年上钩的矿洞鱼。把上面的查询器切到「春季」，即可看到含时间、地点和售价的完整列表。',
    },
    {
      q: '哪些鱼只有下雨时才能钓到？',
      a: '雨天限定的鱼是大眼鱼、鲶鱼、鳗鱼、红鲷鱼和西鲱——它们只在下雨时上钩，所以要把雨天留给它们。其中鲶鱼售价 200g，还是社区中心 bundle 和任务的常见目标。',
    },
    {
      q: '新手前期钓什么鱼最划算？',
      a: '前期最突出的是鲶鱼（200g，雨天的河流），等能到矿洞钓鱼后，石鱼和冰柱鱼也很不错。其余时候钓到什么卖什么，并优先利用雨天——最值钱的天气限定鱼都在雨天出现。',
    },
  ],
}

export function getFishFaqs(locale: string): Faq[] {
  if (locale === 'en') return FISH_FAQS.en
  if (locale === 'zh') return FISH_FAQS.zh
  return []
}
