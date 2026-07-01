// AUTO-GENERATED from the official per-language Stardew Valley wiki (Fish page).
// Rod-caught fish. Season/location/weather from the EN table; names per-language;
// zh-TW via the wiki's zh-hant variant. Do not edit by hand — regenerate from source.

export type FishLoc = { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
export type Season = 'spring' | 'summer' | 'fall' | 'winter'
export type Weather = 'any' | 'sun' | 'rain'
export interface Fish { key: string; name: FishLoc; price: number; seasons: Season[]; locations: string[]; weather: Weather; time: string; anytime: boolean }

export const FISH_LOCATIONS: { key: string; label: FishLoc }[] = [
  { key: 'ocean', label: { en: 'Ocean', zh: '海洋', zhTW: '海洋', ja: '海', ko: '바다', de: 'Ozean' } },
  { key: 'river', label: { en: 'River', zh: '河流', zhTW: '河流', ja: '川', ko: '강', de: 'Fluss' } },
  { key: 'lake', label: { en: 'Mountain Lake', zh: '山湖', zhTW: '山湖', ja: '山の湖', ko: '산속 호수', de: 'Bergsee' } },
  { key: 'pond', label: { en: 'Pond', zh: '池塘', zhTW: '池塘', ja: '池', ko: '연못', de: 'Teich' } },
  { key: 'waterfall', label: { en: 'Waterfall', zh: '瀑布', zhTW: '瀑布', ja: '滝', ko: '폭포', de: 'Wasserfall' } },
  { key: 'secretwoods', label: { en: 'Secret Woods', zh: '神秘森林', zhTW: '神祕森林', ja: '秘密の森', ko: '비밀의 숲', de: 'Geheimer Wald' } },
  { key: 'swamp', label: { en: 'Witch\'s Swamp', zh: '女巫沼泽', zhTW: '女巫沼澤', ja: '魔女の沼', ko: '마녀의 늪', de: 'Hexensumpf' } },
  { key: 'sewers', label: { en: 'Sewers', zh: '下水道', zhTW: '下水道', ja: '下水道', ko: '하수구', de: 'Kanalisation' } },
  { key: 'mines', label: { en: 'The Mines', zh: '矿井', zhTW: '礦井', ja: '鉱山', ko: '광산', de: 'Mine' } },
  { key: 'desert', label: { en: 'Desert', zh: '沙漠', zhTW: '沙漠', ja: '砂漠', ko: '사막', de: 'Wüste' } },
  { key: 'gingerisland', label: { en: 'Ginger Island', zh: '姜岛', zhTW: '薑島', ja: 'ジンジャー島', ko: '진저 섬', de: 'Ingwerinsel' } },
]

export const FISH: Fish[] = [
  { key: 'Pufferfish', price: 200, weather: 'sun', time: '12pm – 4pm', anytime: false, seasons: ['summer'], locations: ['ocean'], name: { en: 'Pufferfish', zh: '河豚', zhTW: '河豚', ja: 'ハリセンボン', ko: '복어', de: 'Kugelfisch' } },
  { key: 'Anchovy', price: 30, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'fall'], locations: ['ocean'], name: { en: 'Anchovy', zh: '鳀鱼', zhTW: '鯷魚', ja: 'カタクチイワシ', ko: '멸치', de: 'Sardelle' } },
  { key: 'Tuna', price: 100, weather: 'any', time: '6am – 7pm', anytime: false, seasons: ['summer', 'winter'], locations: ['ocean'], name: { en: 'Tuna', zh: '金枪鱼', zhTW: '金槍魚', ja: 'マグロ', ko: '참치', de: 'Thunfisch' } },
  { key: 'Sardine', price: 40, weather: 'any', time: '6am – 7pm', anytime: false, seasons: ['spring', 'fall', 'winter'], locations: ['ocean'], name: { en: 'Sardine', zh: '沙丁鱼', zhTW: '沙丁魚', ja: 'イワシ', ko: '정어리', de: 'Sardine' } },
  { key: 'Bream', price: 45, weather: 'any', time: '6pm – 2am', anytime: false, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['river'], name: { en: 'Bream', zh: '鲷鱼', zhTW: '鯛魚', ja: 'ブリーム', ko: '도미', de: 'Brasse' } },
  { key: 'Largemouth_Bass', price: 100, weather: 'any', time: '6am – 7pm', anytime: false, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['lake'], name: { en: 'Largemouth Bass', zh: '大嘴鲈鱼', zhTW: '大嘴鱸魚', ja: 'ブラックバス', ko: '큰입우럭', de: 'Forellenbarsch' } },
  { key: 'Smallmouth_Bass', price: 50, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'fall'], locations: ['river', 'pond'], name: { en: 'Smallmouth Bass', zh: '小嘴鲈鱼', zhTW: '小嘴鱸魚', ja: 'コクチバス', ko: '작은입우럭', de: 'Schwarzbarsch' } },
  { key: 'Rainbow_Trout', price: 65, weather: 'sun', time: '6am – 7pm', anytime: false, seasons: ['summer'], locations: ['river', 'lake'], name: { en: 'Rainbow Trout', zh: '虹鳟鱼', zhTW: '虹鱒魚', ja: 'ニジマス', ko: '무지개송어', de: 'Regenbogenforelle' } },
  { key: 'Salmon', price: 75, weather: 'any', time: '6am – 7pm', anytime: false, seasons: ['fall'], locations: ['river', 'waterfall'], name: { en: 'Salmon', zh: '鲑鱼', zhTW: '鮭魚', ja: 'サケ', ko: '연어', de: 'Lachs' } },
  { key: 'Walleye', price: 105, weather: 'rain', time: '12pm – 2am', anytime: false, seasons: ['fall', 'winter'], locations: ['river', 'pond', 'lake'], name: { en: 'Walleye', zh: '大眼鱼', zhTW: '大眼魚', ja: 'ウォールアイ', ko: '월아이', de: 'Glasaugenbarsch' } },
  { key: 'Perch', price: 55, weather: 'any', time: 'Anytime', anytime: true, seasons: ['winter'], locations: ['river', 'pond', 'lake'], name: { en: 'Perch', zh: '河鲈', zhTW: '河鱸', ja: 'パーチ', ko: '농어', de: 'Barsch' } },
  { key: 'Carp', price: 30, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['lake', 'secretwoods', 'sewers', 'swamp'], name: { en: 'Carp', zh: '鲤鱼', zhTW: '鯉魚', ja: 'コイ', ko: '잉어', de: 'Karpfen' } },
  { key: 'Catfish', price: 200, weather: 'rain', time: '6am – 12am', anytime: false, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['river', 'secretwoods', 'swamp'], name: { en: 'Catfish', zh: '鲶鱼', zhTW: '鲶魚', ja: 'ナマズ', ko: '메기', de: 'Katzenfisch' } },
  { key: 'Pike', price: 100, weather: 'any', time: 'Anytime', anytime: true, seasons: ['summer', 'winter'], locations: ['river', 'pond'], name: { en: 'Pike', zh: '狗鱼', zhTW: '狗魚', ja: 'パイク', ko: '강꼬치고기', de: 'Hecht' } },
  { key: 'Sunfish', price: 30, weather: 'sun', time: '6am – 7pm', anytime: false, seasons: ['spring', 'summer'], locations: ['river'], name: { en: 'Sunfish', zh: '太阳鱼', zhTW: '太陽魚', ja: 'ブルーギル', ko: '선피쉬', de: 'Gotteslachs' } },
  { key: 'Red_Mullet', price: 75, weather: 'any', time: '6am – 7pm', anytime: false, seasons: ['summer', 'winter'], locations: ['ocean'], name: { en: 'Red Mullet', zh: '红鲻鱼', zhTW: '紅鯔魚', ja: 'ウミヒゴイ', ko: '숭어', de: 'Rotbarbe' } },
  { key: 'Herring', price: 30, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'winter'], locations: ['ocean'], name: { en: 'Herring', zh: '鲱鱼', zhTW: '鯡魚', ja: 'ニシン', ko: '청어', de: 'Hering' } },
  { key: 'Eel', price: 85, weather: 'rain', time: '4pm – 2am', anytime: false, seasons: ['spring', 'fall'], locations: ['ocean'], name: { en: 'Eel', zh: '鳗鱼', zhTW: '鰻魚', ja: 'ウナギ', ko: '장어', de: 'Aal' } },
  { key: 'Octopus', price: 150, weather: 'any', time: '6am – 1pm', anytime: false, seasons: ['summer'], locations: ['ocean'], name: { en: 'Octopus', zh: '章鱼', zhTW: '章魚', ja: 'タコ', ko: '문어', de: 'Oktopus' } },
  { key: 'Red_Snapper', price: 50, weather: 'rain', time: '6am – 7pm', anytime: false, seasons: ['summer', 'fall', 'winter'], locations: ['ocean'], name: { en: 'Red Snapper', zh: '红鲷鱼', zhTW: '紅鯛魚', ja: 'フエダイ', ko: '붉은 퉁돔', de: 'Riffbarsch' } },
  { key: 'Squid', price: 80, weather: 'any', time: '6pm – 2am', anytime: false, seasons: ['winter'], locations: ['ocean'], name: { en: 'Squid', zh: '鱿鱼', zhTW: '魷魚', ja: 'イカ', ko: '오징어', de: 'Tintenfisch' } },
  { key: 'Sea_Cucumber', price: 75, weather: 'any', time: '6am – 7pm', anytime: false, seasons: ['fall', 'winter'], locations: ['ocean'], name: { en: 'Sea Cucumber', zh: '海参', zhTW: '海參', ja: 'ナマコ', ko: '해삼', de: 'Seegurke' } },
  { key: 'Super_Cucumber', price: 250, weather: 'any', time: '6pm – 2am', anytime: false, seasons: ['summer', 'fall'], locations: ['ocean'], name: { en: 'Super Cucumber', zh: '大海参', zhTW: '大海參', ja: 'スーパーナマコ', ko: '슈퍼해삼', de: 'Super-Seegurke' } },
  { key: 'Ghostfish', price: 45, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['mines'], name: { en: 'Ghostfish', zh: '鬼鱼', zhTW: '鬼魚', ja: 'ヒヨケウオ', ko: '귀신물고기', de: 'Indischer Glaswels' } },
  { key: 'Stonefish', price: 300, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['mines'], name: { en: 'Stonefish', zh: '石鱼', zhTW: '石魚', ja: 'ダルマオコゼ', ko: '쑥치', de: 'Steinfisch' } },
  { key: 'Ice_Pip', price: 500, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['mines'], name: { en: 'Ice Pip', zh: '冰柱鱼', zhTW: '冰柱魚', ja: 'アイスピップ', ko: '아이스핍', de: 'Eis-Pip' } },
  { key: 'Lava_Eel', price: 700, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['mines', 'gingerisland'], name: { en: 'Lava Eel', zh: '岩浆鳗鱼', zhTW: '岩漿鰻魚', ja: '溶岩ウナギ', ko: '용암 장어', de: 'Lava-Aal' } },
  { key: 'Sandfish', price: 75, weather: 'any', time: '6am – 8pm', anytime: false, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['desert'], name: { en: 'Sandfish', zh: '沙鱼', zhTW: '沙魚', ja: 'スナゴチ', ko: '도루묵', de: 'Sandfisch' } },
  { key: 'Scorpion_Carp', price: 150, weather: 'any', time: '6am – 8pm', anytime: false, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['desert'], name: { en: 'Scorpion Carp', zh: '蝎鲤鱼', zhTW: '蠍鯉魚', ja: 'サソリゴイ', ko: '전갈 잉어', de: 'Skorpionkarpfen' } },
  { key: 'Flounder', price: 100, weather: 'any', time: '6am – 8pm', anytime: false, seasons: ['spring', 'summer'], locations: ['ocean'], name: { en: 'Flounder', zh: '比目鱼', zhTW: '比目魚', ja: '平らな魚', ko: '가자미', de: 'Flunder' } },
  { key: 'Midnight_Carp', price: 150, weather: 'any', time: '10pm – 2am', anytime: false, seasons: ['fall', 'winter'], locations: ['pond', 'lake', 'river'], name: { en: 'Midnight Carp', zh: '午夜鲤鱼', zhTW: '午夜鯉魚', ja: 'シャイなコイ', ko: '자정 잉어', de: 'Mitternachtskarpfen' } },
  { key: 'Sturgeon', price: 200, weather: 'any', time: '6am – 7pm', anytime: false, seasons: ['summer', 'winter'], locations: ['lake'], name: { en: 'Sturgeon', zh: '鲟鱼', zhTW: '鱘魚', ja: 'チョウザメ', ko: '철갑상어', de: 'Stör' } },
  { key: 'Tiger_Trout', price: 150, weather: 'any', time: '6am – 7pm', anytime: false, seasons: ['fall', 'winter'], locations: ['river'], name: { en: 'Tiger Trout', zh: '虎纹鳟鱼', zhTW: '虎紋鱒魚', ja: 'タイガートラウト', ko: '타이거 송어', de: 'Tigerforelle' } },
  { key: 'Bullhead', price: 75, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['lake'], name: { en: 'Bullhead', zh: '大头鱼', zhTW: '大頭魚', ja: 'ブルヘッド', ko: '눈동자개', de: 'Zwergwels' } },
  { key: 'Tilapia', price: 75, weather: 'any', time: '6am – 2pm', anytime: false, seasons: ['summer', 'fall'], locations: ['ocean', 'river'], name: { en: 'Tilapia', zh: '罗非鱼', zhTW: '羅非魚', ja: 'ティラピア', ko: '틸라피아', de: 'Buntbarsch' } },
  { key: 'Chub', price: 50, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['river', 'lake'], name: { en: 'Chub', zh: '鲢鱼', zhTW: '鰱魚', ja: 'チャブ', ko: '피라미', de: 'Kaulbarsch' } },
  { key: 'Dorado', price: 100, weather: 'any', time: '6am – 7pm', anytime: false, seasons: ['summer'], locations: ['river'], name: { en: 'Dorado', zh: '麻哈脂鲤', zhTW: '麻哈脂鯉', ja: 'ドラド', ko: '만새기', de: 'Goldmakrele' } },
  { key: 'Albacore', price: 75, weather: 'any', time: '6am – 11am / 6pm – 2am', anytime: false, seasons: ['fall', 'winter'], locations: ['ocean'], name: { en: 'Albacore', zh: '青花鱼', zhTW: '青花魚', ja: 'ビンナガ', ko: '날개다랑어', de: 'Weißer Thun' } },
  { key: 'Shad', price: 60, weather: 'rain', time: '9am – 2am', anytime: false, seasons: ['spring', 'summer', 'fall'], locations: ['river'], name: { en: 'Shad', zh: '西鲱', zhTW: '西鯡', ja: 'アロサ', ko: '전어', de: 'Blaubarsch' } },
  { key: 'Lingcod', price: 120, weather: 'any', time: 'Any time', anytime: true, seasons: ['winter'], locations: ['river', 'lake'], name: { en: 'Lingcod', zh: '蛇齿单线鱼', zhTW: '蛇齒單線魚', ja: 'リングコッド', ko: '범노래미', de: 'Lengdorsch' } },
  { key: 'Halibut', price: 80, weather: 'any', time: '6am – 11am / 7pm – 2am', anytime: false, seasons: ['spring', 'summer', 'winter'], locations: ['ocean'], name: { en: 'Halibut', zh: '大比目鱼', zhTW: '大比目魚', ja: 'オヒョウ', ko: '넙치', de: 'Heilbutt' } },
  { key: 'Woodskip', price: 75, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['secretwoods', 'river'], name: { en: 'Woodskip', zh: '木跃鱼', zhTW: '木躍魚', ja: 'キノボリウオ', ko: '숲고기', de: 'Waldspringer' } },
  { key: 'Void_Salmon', price: 150, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['swamp'], name: { en: 'Void Salmon', zh: '虚空鲑鱼', zhTW: '虛空鮭魚', ja: '闇サーモン', ko: '공허의 연어', de: 'Schattenlachs' } },
  { key: 'Slimejack', price: 100, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['swamp'], name: { en: 'Slimejack', zh: '史莱姆鱼', zhTW: '史萊姆魚', ja: 'スライムジャック', ko: '슬라임잭', de: 'Schleimmakrele' } },
  { key: 'Stingray', price: 180, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['gingerisland'], name: { en: 'Stingray', zh: '黄貂鱼', zhTW: '黃貂魚', ja: 'エイ', ko: '가오리', de: 'Stachelrochen' } },
  { key: 'Lionfish', price: 100, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['ocean'], name: { en: 'Lionfish', zh: '狮子鱼', zhTW: '獅子魚', ja: 'ミノカサゴ', ko: '쏠배감펭', de: 'Rotfeuerfisch' } },
  { key: 'Blue_Discus', price: 120, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['river'], name: { en: 'Blue Discus', zh: '蓝铁饼鱼', zhTW: '藍鐵餅魚', ja: 'ブルーディスカス', ko: '블루 디스커스', de: 'Blauer Diskusbuntbarsch' } },
  { key: 'Goby', price: 150, weather: 'any', time: 'Anytime', anytime: true, seasons: ['spring', 'summer', 'fall', 'winter'], locations: ['waterfall'], name: { en: 'Goby', zh: '虾虎鱼', zhTW: '蝦虎魚', ja: 'ハゼ', ko: 'Goby', de: 'Grundeln' } },
]
