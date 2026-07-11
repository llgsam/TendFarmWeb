import { BUNDLE_ROOMS, type BundleQuality } from '@/components/tools/stardewBundleData'
import { pickLoc, type LocLabel } from '@/lib/tools/seo/locale'

export interface BundleReferenceTableProps {
  locale: string
}

function sep(locale: string): string {
  return locale === 'zh' || locale === 'zh-TW' || locale === 'ja' || locale === 'ko' ? '、' : ', '
}

const HEADERS: Record<string, [string, string, string, string]> = {
  en: ['Room', 'Bundle', 'Items Needed', 'Reward'],
  zh: ['房间', '收集包', '所需物品', '奖励'],
  'zh-TW': ['房間', '收集包', '所需物品', '獎勵'],
  ja: ['部屋', 'バンドル', '必要なアイテム', '報酬'],
  ko: ['방', '꾸러미', '필요 아이템', '보상'],
  de: ['Raum', 'Bündel', 'Benötigte Gegenstände', 'Belohnung'],
}

const QUALITY: Record<Exclude<BundleQuality, null>, LocLabel> = {
  gold: { en: 'Gold', zh: '金', zhTW: '金', ja: '金', ko: '금', de: 'Gold' },
  silver: { en: 'Silver', zh: '银', zhTW: '銀', ja: '銀', ko: '은', de: 'Silber' },
  iridium: { en: 'Iridium', zh: '铱', zhTW: '銥', ja: 'イリジウム', ko: '이리듐', de: 'Iridium' },
}

const PICK: Record<string, (n: number) => string> = {
  en: (n) => `(pick ${n}) `,
  zh: (n) => `（选${n}）`,
  'zh-TW': (n) => `（選${n}）`,
  ja: (n) => `（${n}個選択）`,
  ko: (n) => `(${n}개 선택) `,
  de: (n) => `(${n} auswählen) `,
}

const CAPTION: Record<string, string> = {
  en: 'Complete Stardew Valley Community Center bundle list — required items and rewards for every bundle',
  zh: '星露谷物语社区中心完整收集包清单——每个收集包的所需物品与奖励',
  'zh-TW': '星露谷物語社區中心完整收集包清單——每個收集包的所需物品與獎勵',
  ja: 'スターデューバレー コミュニティセンター全バンドル——各バンドルの必要アイテムと報酬',
  ko: '스타듀 밸리 마을 회관 전체 꾸러미 목록 — 각 꾸러미의 필요 아이템과 보상',
  de: 'Vollständige Bündelliste des Gemeinschaftszentrums — benötigte Gegenstände und Belohnungen',
}

export function BundleReferenceTable({ locale }: BundleReferenceTableProps) {
  const headers = HEADERS[locale] ?? HEADERS.en
  const s = sep(locale)
  const pick = PICK[locale] ?? PICK.en
  const rows = BUNDLE_ROOMS.flatMap((room) => room.bundles.map((b) => ({ room, b })))

  return (
    <table className="w-full min-w-[820px] border-collapse text-sm">
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
        {rows.map(({ room, b }) => {
          const prefix = b.items.length > 0 && b.required < b.items.length ? pick(b.required) : ''
          const items = b.items.length
            ? prefix +
              b.items
                .map((it) => `${pickLoc(it.name, locale)} ×${it.qty}${it.quality ? ` (${pickLoc(QUALITY[it.quality], locale)})` : ''}`)
                .join(s)
            : b.gold
              ? `${b.gold}g`
              : '—'
          const reward = b.reward ? `${pickLoc(b.reward.name, locale)} ×${b.reward.qty}` : '—'
          return (
            <tr key={b.key} className="border-b border-[#2d3d2d]/50 align-top text-[#c8bca8]">
              <td className="whitespace-nowrap px-3 py-2">{pickLoc(room.name, locale)}</td>
              <th scope="row" className="px-3 py-2 text-left font-medium text-[#e8dcc8]">
                {pickLoc(b.name, locale)}
              </th>
              <td className="px-3 py-2">{items}</td>
              <td className="px-3 py-2">{reward}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
