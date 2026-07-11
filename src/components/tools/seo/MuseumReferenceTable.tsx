import { MUSEUM_ITEMS, MUSEUM_MILESTONES, MUSEUM_CATEGORIES, type MuseumLoc } from '@/components/tools/stardewMuseumData'
import { pickLoc } from '@/lib/tools/seo/locale'

export interface MuseumReferenceTableProps {
  locale: string
}

const HEADERS: Record<string, [string, string, string]> = {
  en: ['Item', 'Category', 'Where to Find'],
  zh: ['物品', '分类', '在哪获得'],
  'zh-TW': ['物品', '分類', '在哪獲得'],
  ja: ['アイテム', '分類', '入手場所'],
  ko: ['아이템', '분류', '입수 장소'],
  de: ['Gegenstand', 'Kategorie', 'Fundort'],
}

const MILESTONES_HEADING: Record<string, string> = {
  en: 'Donation reward milestones',
  zh: '捐赠奖励里程碑',
  'zh-TW': '捐贈獎勵里程碑',
  ja: '寄贈報酬のマイルストーン',
  ko: '기증 보상 이정표',
  de: 'Spenden-Belohnungs-Meilensteine',
}

const CAPTION: Record<string, string> = {
  en: 'Complete Stardew Valley Museum donation list — every artifact and mineral with its category and source',
  zh: '星露谷物语博物馆完整捐赠清单——每件古物和矿物的分类与获得方式',
  'zh-TW': '星露谷物語博物館完整捐贈清單——每件古物和礦物的分類與獲得方式',
  ja: 'スターデューバレー博物館 全寄贈品リスト——各発掘品・鉱物の分類と入手場所',
  ko: '스타듀 밸리 박물관 전체 기증 목록 — 각 유물·광물의 분류와 입수 장소',
  de: 'Vollständige Museums-Spendenliste — jedes Artefakt und Mineral mit Kategorie und Fundort',
}

export function MuseumReferenceTable({ locale }: MuseumReferenceTableProps) {
  const headers = HEADERS[locale] ?? HEADERS.en
  const catName = new Map<string, MuseumLoc>(MUSEUM_CATEGORIES.map((c) => [c.key, c.name]))
  const category = (key: string): string => {
    const loc = catName.get(key)
    return loc ? pickLoc(loc, locale) : key
  }

  return (
    <>
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#8a9a7a]">
          {MILESTONES_HEADING[locale] ?? MILESTONES_HEADING.en}
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#c8bca8]">
          {MUSEUM_MILESTONES.map((m) => (
            <li key={m.threshold}>
              <span className="font-semibold text-[#e8dcc8]">{m.threshold}</span> → {pickLoc(m.reward, locale)}
            </li>
          ))}
        </ul>
      </div>

      <table className="w-full min-w-[720px] border-collapse text-sm">
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
          {MUSEUM_ITEMS.map((item) => (
            <tr key={item.key} className="border-b border-[#2d3d2d]/50 align-top text-[#c8bca8]">
              <th scope="row" className="px-3 py-2 text-left font-medium text-[#e8dcc8]">
                {pickLoc(item.name, locale)}
              </th>
              <td className="whitespace-nowrap px-3 py-2">{category(item.category)}</td>
              <td className="px-3 py-2">{pickLoc(item.source, locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
