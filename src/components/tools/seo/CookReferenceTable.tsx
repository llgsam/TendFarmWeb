import { COOK_RECIPES, type BuffType } from '@/components/tools/stardewCookingData'
import { pickLoc, type LocLabel } from '@/lib/tools/seo/locale'

export interface CookReferenceTableProps {
  locale: string
}

function sep(locale: string): string {
  return locale === 'zh' || locale === 'zh-TW' || locale === 'ja' || locale === 'ko' ? '、' : ', '
}

const HEADERS: Record<string, [string, string, string, string, string, string]> = {
  en: ['Recipe', 'Ingredients', 'Buffs', 'Energy', 'Sell (g)', 'How to Unlock'],
  zh: ['配方', '食材', '增益', '能量', '售价(g)', '如何解锁'],
  'zh-TW': ['配方', '食材', '增益', '能量', '售價(g)', '如何解鎖'],
  ja: ['料理', '材料', 'バフ', 'エネルギー', '売値(g)', '入手方法'],
  ko: ['요리', '재료', '버프', '에너지', '판매가(g)', '해금 방법'],
  de: ['Rezept', 'Zutaten', 'Buffs', 'Energie', 'Preis (g)', 'Freischaltung'],
}

const BUFF_LABELS: Record<BuffType, LocLabel> = {
  farming: { en: 'Farming', zh: '农业', zhTW: '農業', ja: '農業', ko: '농사', de: 'Landwirtschaft' },
  fishing: { en: 'Fishing', zh: '钓鱼', zhTW: '釣魚', ja: '釣り', ko: '낚시', de: 'Angeln' },
  foraging: { en: 'Foraging', zh: '觅食', zhTW: '覓食', ja: '採取', ko: '채집', de: 'Sammeln' },
  mining: { en: 'Mining', zh: '采矿', zhTW: '採礦', ja: '採掘', ko: '채굴', de: 'Bergbau' },
  combat: { en: 'Combat', zh: '战斗', zhTW: '戰鬥', ja: '戦闘', ko: '전투', de: 'Kampf' },
  luck: { en: 'Luck', zh: '幸运', zhTW: '幸運', ja: '運', ko: '행운', de: 'Glück' },
  attack: { en: 'Attack', zh: '攻击', zhTW: '攻擊', ja: '攻撃', ko: '공격', de: 'Angriff' },
  defense: { en: 'Defense', zh: '防御', zhTW: '防禦', ja: '防御', ko: '방어', de: 'Verteidigung' },
  speed: { en: 'Speed', zh: '速度', zhTW: '速度', ja: 'スピード', ko: '속도', de: 'Geschwindigkeit' },
  maxEnergy: { en: 'Max Energy', zh: '最大体力', zhTW: '最大體力', ja: '最大エネルギー', ko: '최대 에너지', de: 'Max. Energie' },
  magnetism: { en: 'Magnetism', zh: '磁力', zhTW: '磁力', ja: '磁力', ko: '자력', de: 'Magnetismus' },
}

const CAPTION: Record<string, string> = {
  en: 'Complete Stardew Valley cooking recipe list — ingredients, buffs, energy, sell price, and how to unlock',
  zh: '星露谷物语完整料理配方表——食材、增益、能量、售价与解锁方式',
  'zh-TW': '星露谷物語完整料理配方表——食材、增益、能量、售價與解鎖方式',
  ja: 'スターデューバレー全料理レシピ——材料・バフ・エネルギー・売値・入手方法',
  ko: '스타듀 밸리 전체 요리 레시피 — 재료·버프·에너지·판매가·해금 방법',
  de: 'Vollständige Stardew-Valley-Rezeptliste — Zutaten, Buffs, Energie, Verkaufspreis und Freischaltung',
}

export function CookReferenceTable({ locale }: CookReferenceTableProps) {
  const headers = HEADERS[locale] ?? HEADERS.en
  const s = sep(locale)

  return (
    <table className="w-full min-w-[860px] border-collapse text-sm">
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
        {COOK_RECIPES.map((r) => {
          const ingredients = r.ingredients.map((i) => `${pickLoc(i.name, locale)} ×${i.qty}`).join(s)
          const buffText = r.buffs.length
            ? r.buffs.map((b) => `+${b.amount} ${pickLoc(BUFF_LABELS[b.type], locale)}`).join(s) +
              (r.buffDuration ? ` · ${r.buffDuration}` : '')
            : '—'
          return (
            <tr key={r.key} className="border-b border-[#2d3d2d]/50 align-top text-[#c8bca8]">
              <th scope="row" className="px-3 py-2 text-left font-medium text-[#e8dcc8]">
                {pickLoc(r.name, locale)}
              </th>
              <td className="px-3 py-2">{ingredients}</td>
              <td className="px-3 py-2">{buffText}</td>
              <td className="whitespace-nowrap px-3 py-2">{r.energy}</td>
              <td className="whitespace-nowrap px-3 py-2">{r.sellPrice}</td>
              <td className="px-3 py-2">{pickLoc(r.source, locale)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
