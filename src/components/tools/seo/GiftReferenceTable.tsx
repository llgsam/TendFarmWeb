import { GIFT_VILLAGERS, GIFT_ITEMS, UNIVERSAL_LOVES, type GiftLoc, type Season } from '@/components/tools/stardewGiftData'

export interface GiftReferenceTableProps {
  locale: string
}

function pick(loc: GiftLoc, locale: string): string {
  if (locale === 'zh') return loc.zh
  if (locale === 'zh-TW') return loc.zhTW
  if (locale === 'ja') return loc.ja
  if (locale === 'ko') return loc.ko
  if (locale === 'de') return loc.de
  return loc.en
}

function itemName(key: string, locale: string): string {
  const loc = GIFT_ITEMS[key]
  return loc ? pick(loc, locale) : key.replace(/_/g, ' ')
}

function sep(locale: string): string {
  return locale === 'zh' || locale === 'zh-TW' || locale === 'ja' || locale === 'ko' ? '、' : ', '
}

const HEADERS: Record<string, [string, string, string]> = {
  en: ['Villager', 'Birthday', 'Loved Gifts'],
  zh: ['村民', '生日', '最爱礼物'],
  'zh-TW': ['村民', '生日', '最愛禮物'],
  ja: ['村人', '誕生日', '大好きな贈り物'],
  ko: ['주민', '생일', '좋아하는 선물'],
  de: ['Bewohner', 'Geburtstag', 'Lieblingsgeschenke'],
}

const SEASONS: Record<Season, GiftLoc> = {
  spring: { en: 'Spring', zh: '春', zhTW: '春', ja: '春', ko: '봄', de: 'Frühling' },
  summer: { en: 'Summer', zh: '夏', zhTW: '夏', ja: '夏', ko: '여름', de: 'Sommer' },
  fall: { en: 'Fall', zh: '秋', zhTW: '秋', ja: '秋', ko: '가을', de: 'Herbst' },
  winter: { en: 'Winter', zh: '冬', zhTW: '冬', ja: '冬', ko: '겨울', de: 'Winter' },
}

const CALLOUT: Record<string, string> = {
  en: 'Loved by every villager (universal gifts):',
  zh: '人人都爱（通用礼物）：',
  'zh-TW': '人人都愛（通用禮物）：',
  ja: '全員が大好き（万能ギフト）：',
  ko: '모두가 좋아함(만능 선물):',
  de: 'Von allen geliebt (universelle Geschenke):',
}

const CAPTION: Record<string, string> = {
  en: 'Complete Stardew Valley villager gift guide — birthday and loved gifts for every villager',
  zh: '星露谷物语完整村民送礼表——每位村民的生日与最爱礼物',
  'zh-TW': '星露谷物語完整村民送禮表——每位村民的生日與最愛禮物',
  ja: 'スターデューバレー全村人 贈り物ガイド——各村人の誕生日と大好きな贈り物',
  ko: '스타듀 밸리 전체 주민 선물 가이드 — 각 주민의 생일과 좋아하는 선물',
  de: 'Vollständiger Stardew-Valley-Geschenk-Guide — Geburtstag und Lieblingsgeschenke jedes Bewohners',
}

export function GiftReferenceTable({ locale }: GiftReferenceTableProps) {
  const headers = HEADERS[locale] ?? HEADERS.en
  const s = sep(locale)
  const universal = UNIVERSAL_LOVES.map((k) => itemName(k, locale)).join(s)

  return (
    <>
      <div className="mb-4 rounded-lg border border-[#f0a832]/20 bg-[#1a2e1a] px-4 py-3 text-sm">
        <span className="font-semibold text-[#e8dcc8]">{CALLOUT[locale] ?? CALLOUT.en}</span>{' '}
        <span className="text-[#8a9a7a]">{universal}</span>
      </div>

      <table className="w-full min-w-[560px] border-collapse text-sm">
        <caption className="mb-3 text-left text-xs text-[#8a9a7a]">{CAPTION[locale] ?? CAPTION.en}</caption>
        <thead>
          <tr className="border-b border-[#2d3d2d] text-left text-[#e8dcc8]">
            {headers.map((h) => (
              <th key={h} scope="col" className="px-3 py-2 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {GIFT_VILLAGERS.map((v) => (
            <tr key={v.en} className="border-b border-[#2d3d2d]/50 align-top text-[#c8bca8]">
              <th scope="row" className="px-3 py-2 text-left font-medium text-[#e8dcc8]">
                {pick(v.name, locale)}
              </th>
              <td className="whitespace-nowrap px-3 py-2">
                {pick(SEASONS[v.season], locale)} {v.day}
              </td>
              <td className="px-3 py-2">{v.loves.map((k) => itemName(k, locale)).join(s)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
