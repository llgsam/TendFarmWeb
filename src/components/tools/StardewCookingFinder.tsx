'use client'

import { useMemo, useState } from 'react'
import { COOK_RECIPES, filterRecipes, allIngredients, pickCook, type CookRecipe, type BuffType, type SourceCat, type CookLoc } from './stardewCookingData'

const BUFFS: { key: BuffType; label: CookLoc }[] = [
  { key: 'farming', label: { en: 'Farming', zh: '耕种', zhTW: '耕種', ja: '農業', ko: '농사', de: 'Landbau' } },
  { key: 'fishing', label: { en: 'Fishing', zh: '钓鱼', zhTW: '釣魚', ja: '釣り', ko: '낚시', de: 'Angeln' } },
  { key: 'foraging', label: { en: 'Foraging', zh: '采集', zhTW: '採集', ja: '採集', ko: '채집', de: 'Sammeln' } },
  { key: 'mining', label: { en: 'Mining', zh: '采矿', zhTW: '採礦', ja: '採掘', ko: '채광', de: 'Bergbau' } },
  { key: 'combat', label: { en: 'Combat', zh: '战斗', zhTW: '戰鬥', ja: '戦闘', ko: '전투', de: 'Kampf' } },
  { key: 'luck', label: { en: 'Luck', zh: '幸运', zhTW: '幸運', ja: '運', ko: '운', de: 'Glück' } },
  { key: 'attack', label: { en: 'Attack', zh: '攻击', zhTW: '攻擊', ja: '攻撃', ko: '공격', de: 'Angriff' } },
  { key: 'defense', label: { en: 'Defense', zh: '防御', zhTW: '防禦', ja: '防御', ko: '방어', de: 'Verteidigung' } },
  { key: 'speed', label: { en: 'Speed', zh: '速度', zhTW: '速度', ja: '移動速度', ko: '이동 속도', de: 'Tempo' } },
  { key: 'maxEnergy', label: { en: 'Max Energy', zh: '最大体力', zhTW: '最大體力', ja: '最大スタミナ', ko: '최대 기력', de: 'Max. Energie' } },
  { key: 'magnetism', label: { en: 'Magnetism', zh: '磁力', zhTW: '磁力', ja: '磁力', ko: '자력', de: 'Magnetismus' } },
]

const SOURCES: { key: SourceCat; label: CookLoc }[] = [
  { key: 'skill', label: { en: 'Skill level', zh: '技能等级', zhTW: '技能等級', ja: 'スキルレベル', ko: '스킬 레벨', de: 'Fähigkeitsstufe' } },
  { key: 'friendship', label: { en: 'Friendship', zh: '好感度', zhTW: '好感度', ja: '友好度', ko: '호감도', de: 'Freundschaft' } },
  { key: 'shop', label: { en: 'Shop', zh: '商店', zhTW: '商店', ja: 'ショップ', ko: '상점', de: 'Laden' } },
  { key: 'tv', label: { en: 'Queen of Sauce (TV)', zh: '烹饪女王（电视）', zhTW: '烹飪女王（電視）', ja: '料理の女王（TV）', ko: '요리의 여왕 (TV)', de: 'Queen of Sauce (TV)' } },
  { key: 'other', label: { en: 'Other', zh: '其他', zhTW: '其他', ja: 'その他', ko: '기타', de: 'Andere' } },
]

export function StardewCookingFinder({ locale }: { locale: string }) {
  const [ingredientKey, setIngredientKey] = useState('')
  const [buff, setBuff] = useState<BuffType | 'all'>('all')
  const [sourceCat, setSourceCat] = useState<SourceCat | 'all'>('all')
  const [query, setQuery] = useState('')

  const t = (l: CookLoc) => pickCook(l, locale)
  const L = (en: string, zh: string, zhTW: string, ja: string, ko: string, de: string) =>
    t({ en, zh, zhTW, ja, ko, de })

  const ingredients = useMemo(() => allIngredients(locale), [locale])
  const results = useMemo(
    () => filterRecipes({ ingredientKey, buff, sourceCat, query, locale }),
    [ingredientKey, buff, sourceCat, query, locale],
  )

  const cls = 'rounded-lg border border-[#2d3d2d] bg-[#0f1a0f] px-3 py-2 text-sm text-[#e8dcc8] focus:border-[#f0a832] focus:outline-none'

  return (
    <div>
      <div className="mb-6 grid gap-3 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-4 sm:grid-cols-2">
        <select value={ingredientKey} onChange={(e) => setIngredientKey(e.target.value)} className={cls}>
          <option value="">{L('Any ingredient (reverse-lookup)', '任意食材（反查）', '任意食材（反查）', '食材で逆引き', '재료로 역검색', 'Beliebige Zutat (Rückwärtssuche)')}</option>
          {ingredients.map((i) => (<option key={i.key} value={i.key}>{i.name}</option>))}
        </select>
        <select value={buff} onChange={(e) => setBuff(e.target.value as BuffType | 'all')} className={cls}>
          <option value="all">{L('Any buff', '任意增益', '任意增益', '任意のバフ', '모든 버프', 'Beliebiger Buff')}</option>
          {BUFFS.map((b) => (<option key={b.key} value={b.key}>{t(b.label)}</option>))}
        </select>
        <select value={sourceCat} onChange={(e) => setSourceCat(e.target.value as SourceCat | 'all')} className={cls}>
          <option value="all">{L('Any source', '任意来源', '任意來源', '任意の入手', '모든 출처', 'Beliebige Quelle')}</option>
          {SOURCES.map((s) => (<option key={s.key} value={s.key}>{t(s.label)}</option>))}
        </select>
        <input value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder={L('Search recipe…', '搜索菜名…', '搜尋菜名…', '料理名で検索…', '요리 검색…', 'Rezept suchen…')}
          className={cls} />
      </div>

      <p className="mb-4 text-sm text-[#8a9a7a]">
        {results.length} {L('recipes', '道菜', '道菜', '品', '개', 'Rezepte')}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((r) => (<RecipeCard key={r.key} r={r} t={t} L={L} />))}
      </div>
    </div>
  )
}

function RecipeCard({
  r, t, L,
}: {
  r: CookRecipe
  t: (l: CookLoc) => string
  L: (en: string, zh: string, zhTW: string, ja: string, ko: string, de: string) => string
}) {
  return (
    <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
      <h3 className="mb-2 text-lg font-semibold text-[#e8dcc8]">🍳 {t(r.name)}</h3>
      <p className="mb-2 text-sm text-[#e8dcc8]">
        <span className="text-[#c97b9a]">{L('Ingredients', '食材', '食材', '材料', '재료', 'Zutaten')}:</span>{' '}
        {r.ingredients.map((i) => `${t(i.name)}${i.qty > 1 ? ` ×${i.qty}` : ''}`).join(', ')}
      </p>
      <p className="mb-1 text-sm text-[#8a9a7a]">🔓 {t(r.source)}</p>
      <p className="mb-1 text-sm text-[#8a9a7a]">⚡ {r.energy} · ❤️ {r.health} · 💰 {r.sellPrice}g</p>
      {r.buffs.length > 0 && (
        <p className="text-sm text-[#f0a832]">
          ✨ {r.buffs.map((b) => `${b.type} +${b.amount}`).join(', ')}{r.buffDuration ? ` (${r.buffDuration})` : ''}
        </p>
      )}
    </div>
  )
}
