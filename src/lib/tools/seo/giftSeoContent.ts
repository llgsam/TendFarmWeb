import { GIFT_VILLAGERS, GIFT_ITEMS, UNIVERSAL_LOVES, type GiftLoc } from '@/components/tools/stardewGiftData'

export interface Faq {
  q: string
  a: string
}

function pickGiftLoc(loc: GiftLoc, locale: string): string {
  if (locale === 'zh') return loc.zh
  if (locale === 'zh-TW') return loc.zhTW
  if (locale === 'ja') return loc.ja
  if (locale === 'ko') return loc.ko
  if (locale === 'de') return loc.de
  return loc.en
}

function itemName(key: string, locale: string): string {
  const loc = GIFT_ITEMS[key]
  return loc ? pickGiftLoc(loc, locale) : key.replace(/_/g, ' ')
}

function joinTwo(names: string[], locale: string): string {
  if (locale === 'zh' || locale === 'zh-TW' || locale === 'ja' || locale === 'ko') return names.join('、')
  if (locale === 'de') return names.join(' und ')
  return names.join(' and ')
}

// Highlight the two most iconic universal loves when present, else fall back to
// the first two in the list. Kept data-verified (filtered against UNIVERSAL_LOVES).
function facts(locale: string) {
  const villagerCount = GIFT_VILLAGERS.length
  const universalCount = UNIVERSAL_LOVES.length
  const preferred = ['Prismatic_Shard', 'Pearl'].filter((k) => UNIVERSAL_LOVES.includes(k))
  const keys = preferred.length ? preferred : UNIVERSAL_LOVES.slice(0, 2)
  const highlight = joinTwo(keys.map((k) => itemName(k, locale)), locale)
  return { villagerCount, universalCount, highlight }
}

type SummaryFn = (f: ReturnType<typeof facts>) => string

const SUMMARIES: Record<string, SummaryFn> = {
  en: (f) =>
    `Stardew Valley has ${f.villagerCount} villagers you can give gifts to. Every one of them loves ${f.universalCount} universal gifts, including the ${f.highlight}. A loved gift grants +80 friendship — and 8× that on the villager's birthday. Use the finder above to look up any villager, or browse the full gift guide below.`,
  zh: (f) =>
    `星露谷物语有 ${f.villagerCount} 位可以送礼的村民。人人都爱的通用礼物有 ${f.universalCount} 种，包括${f.highlight}。送出爱的礼物 +80 好感度，生日当天更是 ×8。用上面的查询器查任意村民，或查看下方的完整送礼表。`,
  'zh-TW': (f) =>
    `星露谷物語有 ${f.villagerCount} 位可以送禮的村民。人人都愛的通用禮物有 ${f.universalCount} 種，包括${f.highlight}。送出愛的禮物 +80 好感度，生日當天更是 ×8。用上面的查詢器查任意村民，或查看下方的完整送禮表。`,
  ja: (f) =>
    `スターデューバレーには贈り物ができる村人が ${f.villagerCount} 人います。全員が大好きな万能ギフトが ${f.universalCount} 種類あり、${f.highlight}などが含まれます。大好きな贈り物は友好度 +80、誕生日にはその 8 倍。上の検索で村人を調べるか、下の贈り物一覧をご覧ください。`,
  ko: (f) =>
    `스타듀 밸리에는 선물을 줄 수 있는 주민이 ${f.villagerCount}명 있습니다. 모두가 좋아하는 만능 선물이 ${f.universalCount}종 있으며 ${f.highlight} 등이 포함됩니다. 좋아하는 선물은 우호도 +80, 생일에는 그 8배입니다. 위의 검색기로 주민을 찾거나 아래 전체 선물 목록을 확인하세요.`,
  de: (f) =>
    `Stardew Valley hat ${f.villagerCount} Bewohner, denen du Geschenke machen kannst. Alle lieben ${f.universalCount} universelle Geschenke, darunter ${f.highlight}. Ein Lieblingsgeschenk gibt +80 Freundschaft — und das 8-Fache am Geburtstag des Bewohners. Nutze den Finder oben oder sieh dir den vollständigen Geschenk-Guide unten an.`,
}

export function giftSummary(locale: string): string {
  const fn = SUMMARIES[locale] ?? SUMMARIES.en
  return fn(facts(locale))
}

// NOTE: FAQ prose enumerates the universal-love names and the +80 figure by hand.
// If UNIVERSAL_LOVES or item friendship values change, update these answers to match the dataset.
const GIFT_FAQS: Record<'en' | 'zh', Faq[]> = {
  en: [
    {
      q: 'What gifts does everyone love in Stardew Valley?',
      a: "Six gifts are loved by every villager: the Prismatic Shard, Pearl, Rabbit's Foot, Magic Rock Candy, Golden Pumpkin, and Stardrop Tea. These universal loves grant +80 friendship with anyone — the one exception is Stardrop Tea, which gives +250 — making them the safest premium gifts to hand out.",
    },
    {
      q: 'What is the best gift to give any villager?',
      a: "The Prismatic Shard is the best universal gift — every villager loves it. Any of the six universal loves works, but the Prismatic Shard is the most iconic. Give a loved gift on a villager's birthday for 8× the friendship (+640).",
    },
    {
      q: 'How much friendship does a loved gift give in Stardew Valley?',
      a: "A loved gift grants +80 friendship points. On the villager's birthday it counts 8×, so a single loved gift gives +640 — which is why birthdays are the fastest way to build a relationship. Liked gifts give +45 and neutral gifts +20.",
    },
    {
      q: 'How often can I give gifts in Stardew Valley?',
      a: 'You can give each villager up to 2 gifts per week, plus 1 more on their birthday (so 3 during a birthday week). The weekly limit resets every Monday. Spend both weekly gifts on loved items for the fastest friendship gains.',
    },
  ],
  zh: [
    {
      q: '星露谷物语里人人都爱的礼物有哪些？',
      a: '有六样礼物是每位村民都喜爱的：五彩碎片、珍珠、兔子的脚、魔法糖冰棍、黄金南瓜和星之果茶。这些「通用最爱」对任何人都 +80 好感度（星之果茶为 +250），是最稳妥的高级礼物。',
    },
    {
      q: '送任何村民最好的礼物是什么？',
      a: '五彩碎片是最好的通用礼物——人人都爱。六样通用最爱任选其一都行，但五彩碎片最经典。在村民生日当天送出爱的礼物，好感度 ×8（+640）。',
    },
    {
      q: '星露谷送出爱的礼物加多少好感度？',
      a: '送出爱的礼物 +80 好感度。生日当天按 ×8 计算，一份就是 +640——所以生日是拉好感最快的时机。喜欢的礼物 +45，普通礼物 +20。',
    },
    {
      q: '星露谷每周能送几次礼物？',
      a: '每位村民每周最多送 2 次，外加生日当天 1 次（生日那周可送 3 次）。每周一重置。把两次机会都用在爱的礼物上，拉好感最快。',
    },
  ],
}

export function getGiftFaqs(locale: string): Faq[] {
  if (locale === 'en') return GIFT_FAQS.en
  if (locale === 'zh') return GIFT_FAQS.zh
  return []
}
