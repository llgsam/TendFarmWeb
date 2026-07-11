import { VILLAGERS } from '@/components/tools/stardewVillagerData'
import { pickLoc, SEASONS } from '@/lib/tools/seo/locale'

export interface VillagerReferenceTableProps {
  locale: string
}

function sep(locale: string): string {
  return locale === 'zh' || locale === 'zh-TW' || locale === 'ja' || locale === 'ko' ? '、' : ', '
}

const HEADERS: Record<string, [string, string, string, string, string]> = {
  en: ['Villager', 'Birthday', 'Region', 'Marriageable', 'Loved Gifts'],
  zh: ['村民', '生日', '居住地', '可结婚', '最爱礼物'],
  'zh-TW': ['村民', '生日', '居住地', '可結婚', '最愛禮物'],
  ja: ['村人', '誕生日', '居住地', '結婚可能', '大好きな贈り物'],
  ko: ['주민', '생일', '거주지', '결혼 가능', '좋아하는 선물'],
  de: ['Bewohner', 'Geburtstag', 'Wohnort', 'Heiratbar', 'Lieblingsgeschenke'],
}

const YES: Record<string, string> = {
  en: 'Yes',
  zh: '是',
  'zh-TW': '是',
  ja: 'はい',
  ko: '예',
  de: 'Ja',
}

const CAPTION: Record<string, string> = {
  en: 'Complete Stardew Valley villager directory — birthday, home region, marriageability, and loved gifts',
  zh: '星露谷物语完整村民名录——生日、居住地、可否结婚与最爱礼物',
  'zh-TW': '星露谷物語完整村民名錄——生日、居住地、可否結婚與最愛禮物',
  ja: 'スターデューバレー全村人名鑑——誕生日・居住地・結婚可否・大好きな贈り物',
  ko: '스타듀 밸리 전체 주민 명단 — 생일·거주지·결혼 가능 여부·좋아하는 선물',
  de: 'Vollständiges Bewohnerverzeichnis — Geburtstag, Wohnort, Heiratbarkeit und Lieblingsgeschenke',
}

export function VillagerReferenceTable({ locale }: VillagerReferenceTableProps) {
  const headers = HEADERS[locale] ?? HEADERS.en
  const yes = YES[locale] ?? YES.en
  const s = sep(locale)

  return (
    <table className="w-full min-w-[760px] border-collapse text-sm">
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
        {VILLAGERS.map((v) => (
          <tr key={v.key} className="border-b border-[#2d3d2d]/50 align-top text-[#c8bca8]">
            <th scope="row" className="px-3 py-2 text-left font-medium text-[#e8dcc8]">
              {pickLoc(v.name, locale)}
            </th>
            <td className="whitespace-nowrap px-3 py-2">
              {pickLoc(SEASONS[v.birthday.season], locale)} {v.birthday.day}
            </td>
            <td className="px-3 py-2">{pickLoc(v.region, locale)}</td>
            <td className="whitespace-nowrap px-3 py-2">{v.marriageable ? yes : '—'}</td>
            <td className="px-3 py-2">{v.lovedGifts.map((g) => pickLoc(g, locale)).join(s)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
