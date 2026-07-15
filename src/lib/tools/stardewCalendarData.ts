export type Season = 'spring' | 'summer' | 'fall' | 'winter'

export interface Festival {
  days: number[]
  season: Season
  name: { zh: string; zhTW: string; en: string; ja: string; ko: string; de: string }
}

// Festivals sourced from the official Stardew Valley wiki (per-language Calendar pages).
export const FESTIVALS: Festival[] = [
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
