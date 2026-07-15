export interface Crop {
  nameZh: string
  nameZhTW: string
  nameEn: string
  nameJa: string
  nameKo: string
  nameDe: string
  season: 'spring' | 'summer' | 'fall' | 'any'
  seedCost: number
  sellPrice: number
  days: number
  regrowDays: number
  perPick: number
}

export const CROPS: Crop[] = [
  // Spring
  { nameZh: '防风草', nameZhTW: '防風草', nameEn: 'Parsnip', nameJa: 'パースニップ', nameKo: '파스닙', nameDe: 'Pastinake', season: 'spring', seedCost: 20, sellPrice: 35, days: 4, regrowDays: 0, perPick: 1 },
  { nameZh: '大蒜', nameZhTW: '大蒜', nameEn: 'Garlic', nameJa: 'ガーリック', nameKo: '마늘', nameDe: 'Knoblauch', season: 'spring', seedCost: 40, sellPrice: 60, days: 4, regrowDays: 0, perPick: 1 },
  { nameZh: '土豆', nameZhTW: '馬鈴薯', nameEn: 'Potato', nameJa: 'ポテト', nameKo: '감자', nameDe: 'Kartoffel', season: 'spring', seedCost: 50, sellPrice: 80, days: 6, regrowDays: 0, perPick: 1 },
  { nameZh: '郁金香', nameZhTW: '鬱金香', nameEn: 'Tulip', nameJa: 'チューリップ', nameKo: '튤립', nameDe: 'Tulpe', season: 'spring', seedCost: 20, sellPrice: 30, days: 6, regrowDays: 0, perPick: 1 },
  { nameZh: '花椰菜', nameZhTW: '花椰菜', nameEn: 'Cauliflower', nameJa: 'カリフラワー', nameKo: '콜리플라워', nameDe: 'Blumenkohl', season: 'spring', seedCost: 80, sellPrice: 175, days: 12, regrowDays: 0, perPick: 1 },
  { nameZh: '草莓', nameZhTW: '草莓', nameEn: 'Strawberry', nameJa: 'イチゴ', nameKo: '딸기', nameDe: 'Erdbeere', season: 'spring', seedCost: 100, sellPrice: 120, days: 8, regrowDays: 4, perPick: 1 },
  // Summer
  { nameZh: '萝卜', nameZhTW: '蘿蔔', nameEn: 'Radish', nameJa: 'ラディッシュ', nameKo: '래디시', nameDe: 'Radieschen', season: 'summer', seedCost: 40, sellPrice: 90, days: 6, regrowDays: 0, perPick: 1 },
  { nameZh: '甜瓜', nameZhTW: '甜瓜', nameEn: 'Melon', nameJa: 'メロン', nameKo: '멜론', nameDe: 'Melone', season: 'summer', seedCost: 80, sellPrice: 250, days: 12, regrowDays: 0, perPick: 1 },
  { nameZh: '红甘蓝', nameZhTW: '紅甘藍', nameEn: 'Red Cabbage', nameJa: 'レッドキャベツ', nameKo: '적양배추', nameDe: 'Rotkohl', season: 'summer', seedCost: 100, sellPrice: 260, days: 9, regrowDays: 0, perPick: 1 },
  { nameZh: '杨桃', nameZhTW: '楊桃', nameEn: 'Starfruit', nameJa: 'スターフルーツ', nameKo: '스타프루트', nameDe: 'Sternfrucht', season: 'summer', seedCost: 400, sellPrice: 750, days: 13, regrowDays: 0, perPick: 1 },
  { nameZh: '蓝莓', nameZhTW: '藍莓', nameEn: 'Blueberry', nameJa: 'ブルーベリー', nameKo: '블루베리', nameDe: 'Blaubeere', season: 'summer', seedCost: 80, sellPrice: 50, days: 13, regrowDays: 4, perPick: 3 },
  { nameZh: '辣椒', nameZhTW: '辣椒', nameEn: 'Hot Pepper', nameJa: 'ホットペッパー', nameKo: '핫페퍼', nameDe: 'Peperoni', season: 'summer', seedCost: 40, sellPrice: 40, days: 5, regrowDays: 3, perPick: 1 },
  // Fall
  { nameZh: '南瓜', nameZhTW: '南瓜', nameEn: 'Pumpkin', nameJa: 'パンプキン', nameKo: '호박', nameDe: 'Kürbis', season: 'fall', seedCost: 100, sellPrice: 320, days: 13, regrowDays: 0, perPick: 1 },
  { nameZh: '山药', nameZhTW: '山藥', nameEn: 'Yam', nameJa: 'ヤム', nameKo: '얌', nameDe: 'Yamswurzel', season: 'fall', seedCost: 60, sellPrice: 160, days: 10, regrowDays: 0, perPick: 1 },
  { nameZh: '苋菜', nameZhTW: '莧菜', nameEn: 'Amaranth', nameJa: 'アマランス', nameKo: '아마란스', nameDe: 'Amaranth', season: 'fall', seedCost: 70, sellPrice: 150, days: 7, regrowDays: 0, perPick: 1 },
  { nameZh: '洋蓟', nameZhTW: '朝鮮薊', nameEn: 'Artichoke', nameJa: 'アーティチョーク', nameKo: '아티초크', nameDe: 'Artischocke', season: 'fall', seedCost: 30, sellPrice: 160, days: 8, regrowDays: 0, perPick: 1 },
  { nameZh: '甜菜', nameZhTW: '甜菜', nameEn: 'Beet', nameJa: 'ビート', nameKo: '사탕무', nameDe: 'Rübe', season: 'fall', seedCost: 20, sellPrice: 100, days: 6, regrowDays: 0, perPick: 1 },
  { nameZh: '蔓越莓', nameZhTW: '蔓越莓', nameEn: 'Cranberry', nameJa: 'クランベリー', nameKo: '크랜베리', nameDe: 'Preiselbeere', season: 'fall', seedCost: 240, sellPrice: 75, days: 7, regrowDays: 5, perPick: 2 },
  { nameZh: '葡萄', nameZhTW: '葡萄', nameEn: 'Grape', nameJa: 'グレープ', nameKo: '포도', nameDe: 'Weintraube', season: 'fall', seedCost: 60, sellPrice: 80, days: 10, regrowDays: 3, perPick: 1 },
  { nameZh: '茄子', nameZhTW: '茄子', nameEn: 'Eggplant', nameJa: 'ナス', nameKo: '가지', nameDe: 'Aubergine', season: 'fall', seedCost: 20, sellPrice: 60, days: 5, regrowDays: 5, perPick: 1 },
]
