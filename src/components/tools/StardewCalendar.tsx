'use client'

import { useState, useMemo } from 'react'

type Loc = { zh: string; zhTW: string; en: string; ja: string; ko: string; de: string }
type Season = 'spring' | 'summer' | 'fall' | 'winter'

function pick(l: Loc, locale: string): string {
  if (locale === 'zh') return l.zh
  if (locale === 'zh-TW') return l.zhTW
  if (locale === 'ja') return l.ja
  if (locale === 'ko') return l.ko
  if (locale === 'de') return l.de
  return l.en
}

interface Villager {
  en: string
  name: Loc
  season: Season
  day: number
}

// Birthdays sourced from the official Stardew Valley wiki (per-language Calendar pages).
const VILLAGERS: Villager[] = [
  { en: 'Kent', season: 'spring', day: 4, name: { zh: '肯特', zhTW: '肯特', en: 'Kent', ja: 'ケント', ko: '켄트', de: 'Kent' } },
  { en: 'Lewis', season: 'spring', day: 7, name: { zh: '刘易斯', zhTW: '劉易斯', en: 'Lewis', ja: 'ルイス', ko: '루이스', de: 'Lewis' } },
  { en: 'Vincent', season: 'spring', day: 10, name: { zh: '文森特', zhTW: '文森特', en: 'Vincent', ja: 'ヴィンセント', ko: '빈센트', de: 'Vincent' } },
  { en: 'Haley', season: 'spring', day: 14, name: { zh: '海莉', zhTW: '海莉', en: 'Haley', ja: 'ヘイリー', ko: '헤일리', de: 'Haley' } },
  { en: 'Pam', season: 'spring', day: 18, name: { zh: '潘姆', zhTW: '潘姆', en: 'Pam', ja: 'パム', ko: '팸', de: 'Pam' } },
  { en: 'Shane', season: 'spring', day: 20, name: { zh: '谢恩', zhTW: '謝恩', en: 'Shane', ja: 'シェーン', ko: '셰인', de: 'Shane' } },
  { en: 'Pierre', season: 'spring', day: 26, name: { zh: '皮埃尔', zhTW: '皮埃爾', en: 'Pierre', ja: 'ピエール', ko: '피에르', de: 'Pierre' } },
  { en: 'Emily', season: 'spring', day: 27, name: { zh: '艾米丽', zhTW: '艾米麗', en: 'Emily', ja: 'エミリー', ko: '에밀리', de: 'Emily' } },
  { en: 'Jas', season: 'summer', day: 4, name: { zh: '贾斯', zhTW: '賈斯', en: 'Jas', ja: 'ジャス', ko: '재스', de: 'Jas' } },
  { en: 'Gus', season: 'summer', day: 8, name: { zh: '格斯', zhTW: '格斯', en: 'Gus', ja: 'ガス', ko: '거스', de: 'Gus' } },
  { en: 'Maru', season: 'summer', day: 10, name: { zh: '玛鲁', zhTW: '瑪魯', en: 'Maru', ja: 'マル', ko: '마루', de: 'Maru' } },
  { en: 'Alex', season: 'summer', day: 13, name: { zh: '亚历克斯', zhTW: '亞歷克斯', en: 'Alex', ja: 'アレックス', ko: '알렉스', de: 'Alex' } },
  { en: 'Sam', season: 'summer', day: 17, name: { zh: '山姆', zhTW: '山姆', en: 'Sam', ja: 'サム', ko: '샘', de: 'Sam' } },
  { en: 'Demetrius', season: 'summer', day: 19, name: { zh: '德米特里厄斯', zhTW: '德米特里厄斯', en: 'Demetrius', ja: 'ディメトリウス', ko: '드미트리우스', de: 'Demetrius' } },
  { en: 'Dwarf', season: 'summer', day: 22, name: { zh: '矮人', zhTW: '矮人', en: 'Dwarf', ja: 'ドワーフ', ko: '드워프', de: 'Zwerg' } },
  { en: 'Willy', season: 'summer', day: 24, name: { zh: '威利', zhTW: '威利', en: 'Willy', ja: 'ウィリー', ko: '윌리', de: 'Willy' } },
  { en: 'Leo', season: 'summer', day: 26, name: { zh: '雷欧', zhTW: '雷歐', en: 'Leo', ja: 'レオ', ko: '레오', de: 'Leo' } },
  { en: 'Penny', season: 'fall', day: 2, name: { zh: '潘妮', zhTW: '潘妮', en: 'Penny', ja: 'ペニー', ko: '페니', de: 'Penny' } },
  { en: 'Elliott', season: 'fall', day: 5, name: { zh: '艾利欧特', zhTW: '艾利歐特', en: 'Elliott', ja: 'エリオット', ko: '엘리엇', de: 'Elliott' } },
  { en: 'Jodi', season: 'fall', day: 11, name: { zh: '乔迪', zhTW: '喬迪', en: 'Jodi', ja: 'ジョディ', ko: '조디', de: 'Jodi' } },
  { en: 'Abigail', season: 'fall', day: 13, name: { zh: '阿比盖尔', zhTW: '阿比蓋爾', en: 'Abigail', ja: 'アビゲイル', ko: '애비게일', de: 'Abigail' } },
  { en: 'Sandy', season: 'fall', day: 15, name: { zh: '桑迪', zhTW: '桑迪', en: 'Sandy', ja: 'サンディ', ko: '샌디', de: 'Sandy' } },
  { en: 'Marnie', season: 'fall', day: 18, name: { zh: '玛妮', zhTW: '瑪妮', en: 'Marnie', ja: 'マーニー', ko: '마니', de: 'Marnie' } },
  { en: 'Robin', season: 'fall', day: 21, name: { zh: '罗宾', zhTW: '羅賓', en: 'Robin', ja: 'ロビン', ko: '로빈', de: 'Robin' } },
  { en: 'George', season: 'fall', day: 24, name: { zh: '乔治', zhTW: '喬治', en: 'George', ja: 'ジョージ', ko: '조지', de: 'George' } },
  { en: 'Krobus', season: 'winter', day: 1, name: { zh: '科罗布斯', zhTW: '科羅布斯', en: 'Krobus', ja: 'クロバス', ko: '크로버스', de: 'Krobus' } },
  { en: 'Linus', season: 'winter', day: 3, name: { zh: '莱纳斯', zhTW: '萊納斯', en: 'Linus', ja: 'ライナス', ko: '라이너스', de: 'Linus' } },
  { en: 'Caroline', season: 'winter', day: 7, name: { zh: '卡洛琳', zhTW: '卡洛琳', en: 'Caroline', ja: 'キャロライン', ko: '캐롤라인', de: 'Caroline' } },
  { en: 'Sebastian', season: 'winter', day: 10, name: { zh: '塞巴斯蒂安', zhTW: '塞巴斯蒂安', en: 'Sebastian', ja: 'セバスチャン', ko: '세바스찬', de: 'Sebastian' } },
  { en: 'Harvey', season: 'winter', day: 14, name: { zh: '哈维', zhTW: '哈維', en: 'Harvey', ja: 'ハーヴィー', ko: '하비', de: 'Harvey' } },
  { en: 'Wizard', season: 'winter', day: 17, name: { zh: '法师', zhTW: '法師', en: 'Wizard', ja: '魔術師', ko: '마법사', de: 'Zauberer' } },
  { en: 'Evelyn', season: 'winter', day: 20, name: { zh: '艾芙琳', zhTW: '艾芙琳', en: 'Evelyn', ja: 'エブリン', ko: '에블린', de: 'Evelyn' } },
  { en: 'Leah', season: 'winter', day: 23, name: { zh: '莉亚', zhTW: '莉亞', en: 'Leah', ja: 'リア', ko: '레아', de: 'Leah' } },
  { en: 'Clint', season: 'winter', day: 26, name: { zh: '克林特', zhTW: '克林特', en: 'Clint', ja: 'クリント', ko: '클린트', de: 'Clint' } },
]

interface Festival {
  days: number[]
  season: Season
  name: Loc
}

// Festivals sourced from the official Stardew Valley wiki (per-language Calendar pages).
const FESTIVALS: Festival[] = [
  { season: 'spring', days: [13], name: { zh: '复活节', zhTW: '復活節', en: 'Egg Festival', ja: 'エッグフェスティバル', ko: '달걀 축제', de: 'Eierfest' } },
  { season: 'spring', days: [15, 16, 17], name: { zh: '沙漠节', zhTW: '沙漠節', en: 'Desert Festival', ja: '砂漠フェスティバル', ko: '사막 축제', de: 'Wüstenfestival' } },
  { season: 'spring', days: [24], name: { zh: '花舞节', zhTW: '花舞節', en: 'Flower Dance', ja: 'フラワーダンス', ko: '봄꽃 무도회', de: 'Blumentanz' } },
  { season: 'summer', days: [11], name: { zh: '夏威夷宴会', zhTW: '夏威夷宴會', en: 'Luau', ja: 'ルアウパーティー', ko: '루아우', de: 'Luau' } },
  { season: 'summer', days: [20, 21], name: { zh: '鳟鱼大赛', zhTW: '鱒魚大賽', en: 'Trout Derby', ja: 'マス釣り大会', ko: '송어 시합', de: 'Forellenderby' } },
  { season: 'summer', days: [28], name: { zh: '月光水母起舞', zhTW: '月光水母起舞', en: 'Dance of the Moonlight Jellies', ja: 'ゲッコウクラゲのダンス', ko: '달빛 해파리들의 춤', de: 'Tanz der Mondlichtquallen' } },
  { season: 'fall', days: [16], name: { zh: '星露谷展览会', zhTW: '星露谷展覽會', en: 'Stardew Valley Fair', ja: 'スターデューバレーまつり', ko: '스타듀 밸리 품평회', de: 'Sterntautaler Volksfest' } },
  { season: 'fall', days: [27], name: { zh: '万灵节', zhTW: '萬靈節', en: "Spirit's Eve", ja: 'スピリットイブ', ko: '영령의 전야제', de: 'Geisternacht' } },
  { season: 'winter', days: [8], name: { zh: '冰雪节', zhTW: '冰雪節', en: 'Festival of Ice', ja: '氷まつり', ko: '얼음 축제', de: 'Fest des Eises' } },
  { season: 'winter', days: [12, 13], name: { zh: '鱿鱼节', zhTW: '魷魚節', en: 'SquidFest', ja: 'イカ釣りまつり', ko: '오징어 축제', de: 'Tintenfischfest' } },
  { season: 'winter', days: [15, 16, 17], name: { zh: '夜市', zhTW: '夜市', en: 'Night Market', ja: '夜の市', ko: '야시장', de: 'Nachtmarkt' } },
  { season: 'winter', days: [25], name: { zh: '冬日星盛宴', zhTW: '冬日星盛宴', en: 'Feast of the Winter Star', ja: '冬星祭', ko: '겨울 별의 만찬', de: 'Fest des Wintersterns' } },
]

const SEASONS: { key: Season; emoji: string; label: Loc; accent: string }[] = [
  { key: 'spring', emoji: '🌱', accent: '#7bc47f', label: { zh: '春季', zhTW: '春季', en: 'Spring', ja: '春', ko: '봄', de: 'Frühling' } },
  { key: 'summer', emoji: '☀️', accent: '#f0c832', label: { zh: '夏季', zhTW: '夏季', en: 'Summer', ja: '夏', ko: '여름', de: 'Sommer' } },
  { key: 'fall', emoji: '🍂', accent: '#e08a4a', label: { zh: '秋季', zhTW: '秋季', en: 'Fall', ja: '秋', ko: '가을', de: 'Herbst' } },
  { key: 'winter', emoji: '❄️', accent: '#8ab6e0', label: { zh: '冬季', zhTW: '冬季', en: 'Winter', ja: '冬', ko: '겨울', de: 'Winter' } },
]

const WEEKDAYS: Loc[] = [
  { zh: '一', zhTW: '一', en: 'Mon', ja: '月', ko: '월', de: 'Mo' },
  { zh: '二', zhTW: '二', en: 'Tue', ja: '火', ko: '화', de: 'Di' },
  { zh: '三', zhTW: '三', en: 'Wed', ja: '水', ko: '수', de: 'Mi' },
  { zh: '四', zhTW: '四', en: 'Thu', ja: '木', ko: '목', de: 'Do' },
  { zh: '五', zhTW: '五', en: 'Fri', ja: '金', ko: '금', de: 'Fr' },
  { zh: '六', zhTW: '六', en: 'Sat', ja: '土', ko: '토', de: 'Sa' },
  { zh: '日', zhTW: '日', en: 'Sun', ja: '日', ko: '일', de: 'So' },
]

export function StardewCalendar({ locale }: { locale: string }) {
  const [season, setSeason] = useState<Season>('spring')
  const [selected, setSelected] = useState<string>('')

  const t = (l: Loc) => pick(l, locale)

  const seasonBirthdays = useMemo(
    () => VILLAGERS.filter((v) => v.season === season).sort((a, b) => a.day - b.day),
    [season],
  )
  const seasonFestivals = useMemo(
    () => FESTIVALS.filter((f) => f.season === season),
    [season],
  )

  // Fast lookups for the grid
  const birthdayByDay = useMemo(() => {
    const m = new Map<number, Villager>()
    seasonBirthdays.forEach((v) => m.set(v.day, v))
    return m
  }, [seasonBirthdays])
  const festivalByDay = useMemo(() => {
    const m = new Map<number, Festival>()
    seasonFestivals.forEach((f) => f.days.forEach((d) => m.set(d, f)))
    return m
  }, [seasonFestivals])

  const selectedVillager = VILLAGERS.find((v) => v.en === selected)

  const villagersSorted = useMemo(
    () => [...VILLAGERS].sort((a, b) => t(a.name).localeCompare(t(b.name))),
    [locale], // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onSelectVillager = (en: string) => {
    setSelected(en)
    const v = VILLAGERS.find((x) => x.en === en)
    if (v) setSeason(v.season)
  }

  const L = (zh: string, en: string, zhTW: string, ja: string, ko: string, de: string) =>
    t({ zh, zhTW, en, ja, ko, de })

  return (
    <div>
      {/* Birthday finder */}
      <div className="mb-8 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
        <label className="mb-2 block text-sm font-semibold text-[#e8dcc8]">
          {L('🎂 查村民生日', '🎂 Find a Villager’s Birthday', '🎂 查村民生日', '🎂 村人の誕生日を探す', '🎂 주민 생일 찾기', '🎂 Geburtstag eines Dorfbewohners finden')}
        </label>
        <select
          value={selected}
          onChange={(e) => onSelectVillager(e.target.value)}
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
        {selectedVillager && (
          <p className="mt-3 rounded-lg bg-[#c97b9a]/10 px-4 py-3 text-[#e8dcc8]">
            🎂 <span className="font-semibold">{t(selectedVillager.name)}</span>{' '}
            {L('的生日是', '’s birthday is', '的生日是', 'の誕生日は', '님의 생일은', 'hat Geburtstag am')}{' '}
            <span className="font-semibold text-[#f0a832]">
              {t(SEASONS.find((s) => s.key === selectedVillager.season)!.label)} {selectedVillager.day}{L(' 日', '', ' 日', '日', '일', '.')}
            </span>
            {' — '}
            {L('当天送对礼物好感翻倍。', 'gifts count 8× on their birthday.', '當天送對禮物好感翻倍。', '誕生日に贈り物をすると友好度が8倍。', '생일에 선물하면 호감도 8배.', 'Geschenke zählen an ihrem Geburtstag 8×.')}
          </p>
        )}
      </div>

      {/* Season tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {SEASONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setSeason(s.key)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              season === s.key
                ? 'border-[#f0a832] bg-[#f0a832]/10 text-[#f0a832]'
                : 'border-[#2d3d2d] text-[#8a9a7a] hover:text-[#e8dcc8]'
            }`}
          >
            {s.emoji} {t(s.label)}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mb-3 flex flex-wrap gap-4 text-xs text-[#8a9a7a]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-[#c97b9a] bg-[#c97b9a]/20" />
          {L('生日', 'Birthday', '生日', '誕生日', '생일', 'Geburtstag')}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-[#f0a832] bg-[#f0a832]/20" />
          {L('节日', 'Festival', '節日', 'フェスティバル', '축제', 'Festival')}
        </span>
      </div>

      {/* Calendar grid */}
      <div className="mb-8 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 p-3">
        <div className="grid grid-cols-7 gap-1.5">
          {WEEKDAYS.map((w, i) => (
            <div key={i} className="pb-1 text-center text-[10px] font-medium uppercase text-[#6a7a5a]">
              {t(w)}
            </div>
          ))}
          {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
            const bday = birthdayByDay.get(day)
            const fest = festivalByDay.get(day)
            const isSelected = bday && selectedVillager && bday.en === selectedVillager.en
            let cls = 'border-[#2d3d2d] bg-[#0f1a0f]/40'
            if (fest) cls = 'border-[#f0a832]/50 bg-[#f0a832]/10'
            if (bday) cls = 'border-[#c97b9a]/50 bg-[#c97b9a]/10'
            if (isSelected) cls = 'border-[#c97b9a] bg-[#c97b9a]/25 ring-1 ring-[#c97b9a]'
            return (
              <div
                key={day}
                className={`flex min-h-[62px] flex-col rounded-md border p-1.5 transition-colors ${cls}`}
              >
                <span className="text-[11px] font-semibold text-[#8a9a7a]">{day}</span>
                {fest && (
                  <span className="mt-0.5 text-[10px] leading-tight text-[#f0a832]">🎪 {t(fest.name)}</span>
                )}
                {bday && (
                  <span className="mt-auto text-[11px] leading-tight text-[#e8b9cc]">🎂 {t(bday.name)}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Season lists (SEO + clarity) */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
          <h3 className="mb-3 text-sm font-semibold text-[#e8b9cc]">
            🎂 {L('本季生日', 'Birthdays', '本季生日', 'この季節の誕生日', '이번 계절 생일', 'Geburtstage')}
          </h3>
          <ul className="space-y-1.5 text-sm text-[#8a9a7a]">
            {seasonBirthdays.map((v) => (
              <li key={v.en} className="flex justify-between">
                <span className="text-[#e8dcc8]">{t(v.name)}</span>
                <span>{L('第', '', '第', '', '', '')}{v.day}{L(' 天', '', ' 天', '日', '일', '.')}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
          <h3 className="mb-3 text-sm font-semibold text-[#f0a832]">
            🎪 {L('本季节日', 'Festivals', '本季節日', 'この季節のフェスティバル', '이번 계절 축제', 'Festivals')}
          </h3>
          <ul className="space-y-1.5 text-sm text-[#8a9a7a]">
            {seasonFestivals.map((f) => (
              <li key={f.name.en} className="flex justify-between gap-3">
                <span className="text-[#e8dcc8]">{t(f.name)}</span>
                <span className="shrink-0">
                  {f.days.length > 1 ? `${f.days[0]}–${f.days[f.days.length - 1]}` : f.days[0]}
                  {L(' 日', '', ' 日', '日', '일', '.')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
