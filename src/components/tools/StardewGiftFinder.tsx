'use client'

import { useMemo, useState } from 'react'
import { GIFT_ITEMS, GIFT_VILLAGERS, UNIVERSAL_LOVES, type GiftLoc } from './stardewGiftData'

function pick(l: GiftLoc, locale: string): string {
  if (locale === 'zh') return l.zh
  if (locale === 'zh-TW') return l.zhTW
  if (locale === 'ja') return l.ja
  if (locale === 'ko') return l.ko
  if (locale === 'de') return l.de
  return l.en
}

const SEASON_LABEL: Record<string, GiftLoc> = {
  spring: { zh: '春季', zhTW: '春季', en: 'Spring', ja: '春', ko: '봄', de: 'Frühling' },
  summer: { zh: '夏季', zhTW: '夏季', en: 'Summer', ja: '夏', ko: '여름', de: 'Sommer' },
  fall: { zh: '秋季', zhTW: '秋季', en: 'Fall', ja: '秋', ko: '가을', de: 'Herbst' },
  winter: { zh: '冬季', zhTW: '冬季', en: 'Winter', ja: '冬', ko: '겨울', de: 'Winter' },
}

export function StardewGiftFinder({ locale }: { locale: string }) {
  const [selected, setSelected] = useState<string>('')

  const t = (l: GiftLoc) => pick(l, locale)
  const L = (zh: string, en: string, zhTW: string, ja: string, ko: string, de: string) =>
    t({ zh, zhTW, en, ja, ko, de })

  const villagersSorted = useMemo(
    () => [...GIFT_VILLAGERS].sort((a, b) => t(a.name).localeCompare(t(b.name))),
    [locale], // eslint-disable-line react-hooks/exhaustive-deps
  )

  const villager = GIFT_VILLAGERS.find((v) => v.en === selected)

  const Chip = ({ itemKey }: { itemKey: string }) => {
    const item = GIFT_ITEMS[itemKey]
    const label = item ? t(item) : itemKey.replace(/_/g, ' ')
    return (
      <span className="rounded-lg border border-[#c97b9a]/40 bg-[#c97b9a]/10 px-3 py-1.5 text-sm text-[#e8dcc8]">
        🎁 {label}
      </span>
    )
  }

  return (
    <div>
      {/* Villager picker */}
      <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
        <label className="mb-2 block text-sm font-semibold text-[#e8dcc8]">
          {L('选择村民，查看 TA 最爱的礼物', 'Pick a villager to see their loved gifts', '選擇村民，查看 TA 最愛的禮物', '村人を選んで大好きな贈り物を表示', '주민을 선택해 좋아하는 선물 보기', 'Wähle einen Bewohner für seine Lieblingsgeschenke')}
        </label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full rounded-lg border border-[#2d3d2d] bg-[#0f1a0f] px-3 py-2.5 text-[#e8dcc8] focus:border-[#f0a832] focus:outline-none"
        >
          <option value="">
            {L('选择一位村民…', 'Select a villager…', '選擇一位村民…', '村人を選択…', '주민 선택…', 'Dorfbewohner wählen…')}
          </option>
          {villagersSorted.map((v) => (
            <option key={v.en} value={v.en}>
              {t(v.name)}
            </option>
          ))}
        </select>
      </div>

      {/* Selected villager's loved gifts */}
      {villager && (
        <div className="mb-8 rounded-xl border border-[#c97b9a]/30 bg-[#c97b9a]/5 p-5">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold text-[#e8dcc8]">
              💝 {t(villager.name)} — {L('最爱的礼物', 'Loved Gifts', '最愛的禮物', '大好きな贈り物', '좋아하는 선물', 'Lieblingsgeschenke')}
            </h3>
            <span className="text-sm text-[#8a9a7a]">
              🎂 {t(SEASON_LABEL[villager.season])} {villager.day}
              {L(' 日', '', ' 日', '日', '일', '.')}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {villager.loves.map((k) => (
              <Chip key={k} itemKey={k} />
            ))}
          </div>
          <p className="mt-4 text-xs text-[#8a9a7a]">
            {L(
              '每份最爱礼物 +80 好感度；生日当天赠送效果 ×8。所有通用最爱礼物对 TA 同样有效。',
              'Each loved gift gives +80 friendship. On their birthday the effect is ×8. Universal loves below also work on everyone.',
              '每份最愛禮物 +80 好感度；生日當天贈送效果 ×8。所有通用最愛禮物對 TA 同樣有效。',
              '大好きな贈り物は友好度+80。誕生日には効果×8。下記の一般的な大好き物も全員に有効。',
              '좋아하는 선물마다 호감도 +80. 생일에는 효과 ×8. 아래 보편적 선물도 모두에게 유효.',
              'Jedes Lieblingsgeschenk gibt +80 Freundschaft. Am Geburtstag ×8. Allgemeine Favoriten unten wirken bei allen.',
            )}
          </p>
        </div>
      )}

      {/* Universal loves — always shown */}
      <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
        <h3 className="mb-1 text-sm font-semibold text-[#f0a832]">
          ⭐ {L('通用最爱礼物', 'Universal Loves', '通用最愛禮物', '一般的な大好き物', '보편적으로 좋아하는 선물', 'Allgemeine Favoriten')}
        </h3>
        <p className="mb-3 text-xs text-[#8a9a7a]">
          {L(
            '除少数例外，几乎所有村民都喜爱这些礼物——不确定送什么时的安全牌。',
            'With few exceptions, almost every villager loves these — a safe bet when unsure.',
            '除少數例外，幾乎所有村民都喜愛這些禮物——不確定送什麼時的安全牌。',
            'わずかな例外を除き、ほぼ全員が大好き——迷ったときの安全策。',
            '소수 예외를 제외하면 거의 모든 주민이 좋아함 — 고민될 때 안전한 선택.',
            'Mit wenigen Ausnahmen lieben fast alle diese — eine sichere Wahl.',
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          {UNIVERSAL_LOVES.map((k) => (
            <Chip key={k} itemKey={k} />
          ))}
        </div>
      </div>
    </div>
  )
}
