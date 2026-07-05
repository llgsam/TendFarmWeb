// AUTO-GENERATED from the official per-language Stardew Valley wiki (Bundles page).
// Standard (default) bundles. Structure/required-count/quantity/quality from the EN
// page; names per-language via shared icon filenames; zh-TW via the wiki's zh-hant
// variant. Do not edit by hand — regenerate from source (gen_bundles.py).

export type BundleLoc = { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
export type BundleQuality = 'gold' | 'silver' | 'iridium' | null
export interface BundleItem { key: string; icon: string; name: BundleLoc; qty: number; quality: BundleQuality }
export interface Bundle { key: string; name: BundleLoc; color: string; required: number; items: BundleItem[]; reward: { name: BundleLoc; qty: number } | null; gold?: number }
export interface BundleRoom { key: string; name: BundleLoc; reward: BundleLoc; bundles: Bundle[] }

export const BUNDLE_ROOMS: BundleRoom[] = [
  {
    key: "crafts",
    name: {"en": "Crafts Room", "zh": "工艺室", "zhTW": "工藝室", "ja": "クラフトルーム", "ko": "공예실", "de": "Handwerksraum"},
    reward: {"en": "Quarry", "zh": "采石场", "zhTW": "採石場", "ja": "石切場", "ko": "채석장", "de": "Steinbruch"},
    bundles: [
      {
        key: "spring-foraging", color: "green", required: 4,
        name: {"en": "Spring Foraging Bundle", "zh": "春季采集收集包", "zhTW": "春季採集收集包", "ja": "春の採集 バンドル", "ko": "봄 채집 꾸러미", "de": "Sammeln (Frühling)"},
        items: [
          { key: "wild-horseradish", icon: "Wild_Horseradish.png", qty: 1, quality: null, name: {"en": "Wild Horseradish", "zh": "野山葵", "zhTW": "野山葵", "ja": "ノワサビ", "ko": "야생 고추냉이", "de": "Wilder Meerrettich"} },
          { key: "daffodil", icon: "Daffodil.png", qty: 1, quality: null, name: {"en": "Daffodil", "zh": "黄水仙", "zhTW": "黃水仙", "ja": "ラッパスイセン", "ko": "수선화", "de": "Narzisse"} },
          { key: "leek", icon: "Leek.png", qty: 1, quality: null, name: {"en": "Leek", "zh": "韭葱", "zhTW": "韭蔥", "ja": "ポロネギ", "ko": "리크", "de": "Lauch"} },
          { key: "dandelion", icon: "Dandelion.png", qty: 1, quality: null, name: {"en": "Dandelion", "zh": "蒲公英", "zhTW": "蒲公英", "ja": "タンポポ", "ko": "민들레", "de": "Löwenzahn"} },
        ],
        reward: { qty: 30, name: {"en": "Spring Seeds", "zh": "春季种子", "zhTW": "春季種子", "ja": "春のタネつめあわせ", "ko": "봄 씨앗 모음", "de": "Frühlingssaat"} },
      },
      {
        key: "summer-foraging", color: "yellow", required: 3,
        name: {"en": "Summer Foraging Bundle", "zh": "夏季采集收集包", "zhTW": "夏季採集收集包", "ja": "夏の採集 バンドル", "ko": "여름 채집 꾸러미", "de": "Sammeln (Sommer)"},
        items: [
          { key: "grape", icon: "Grape.png", qty: 1, quality: null, name: {"en": "Grape", "zh": "葡萄", "zhTW": "葡萄", "ja": "ブドウ", "ko": "포도", "de": "Weintraube"} },
          { key: "spice-berry", icon: "Spice_Berry.png", qty: 1, quality: null, name: {"en": "Spice Berry", "zh": "香味浆果", "zhTW": "香味漿果", "ja": "スパイスベリー", "ko": "백량금", "de": "Gewürzbeere"} },
          { key: "sweet-pea", icon: "Sweet_Pea.png", qty: 1, quality: null, name: {"en": "Sweet Pea", "zh": "甜豌豆", "zhTW": "甜豌豆", "ja": "スイートピー", "ko": "스위트피", "de": "Edelwicke"} },
        ],
        reward: { qty: 30, name: {"en": "Summer Seeds", "zh": "夏季种子", "zhTW": "夏季種子", "ja": "夏のタネつめあわせ", "ko": "여름 씨앗 모음", "de": "Sommersaat"} },
      },
      {
        key: "fall-foraging", color: "orange", required: 4,
        name: {"en": "Fall Foraging Bundle", "zh": "秋季采集收集包", "zhTW": "秋季採集收集包", "ja": "秋の採集 バンドル", "ko": "가을 채집 꾸러미", "de": "Sammeln (Herbst)"},
        items: [
          { key: "common-mushroom", icon: "Common_Mushroom.png", qty: 1, quality: null, name: {"en": "Common Mushroom", "zh": "普通蘑菇", "zhTW": "普通蘑菇", "ja": "マッシュルーム", "ko": "흔한 버섯", "de": "Gewöhnlicher Pilz"} },
          { key: "wild-plum", icon: "Wild_Plum.png", qty: 1, quality: null, name: {"en": "Wild Plum", "zh": "野梅", "zhTW": "野梅", "ja": "野生のプラム", "ko": "야생 자두", "de": "Wildpflaume"} },
          { key: "hazelnut", icon: "Hazelnut.png", qty: 1, quality: null, name: {"en": "Hazelnut", "zh": "榛子", "zhTW": "榛子", "ja": "ヘーゼルナッツ", "ko": "헤이즐넛", "de": "Haselnuss"} },
          { key: "blackberry", icon: "Blackberry.png", qty: 1, quality: null, name: {"en": "Blackberry", "zh": "黑莓", "zhTW": "黑莓", "ja": "ブラックベリー", "ko": "블랙베리", "de": "Brombeere"} },
        ],
        reward: { qty: 30, name: {"en": "Fall Seeds", "zh": "秋季种子", "zhTW": "秋季種子", "ja": "秋のタネつめあわせ", "ko": "가을 씨앗 모음", "de": "Herbstsaat"} },
      },
      {
        key: "winter-foraging", color: "teal", required: 4,
        name: {"en": "Winter Foraging Bundle", "zh": "冬季采集收集包", "zhTW": "冬季採集收集包", "ja": "冬の採集 バンドル", "ko": "겨울 채집 꾸러미", "de": "Sammeln (Winter)"},
        items: [
          { key: "winter-root", icon: "Winter_Root.png", qty: 1, quality: null, name: {"en": "Winter Root", "zh": "冬根", "zhTW": "冬根", "ja": "クワイ", "ko": "겨울뿌리", "de": "Winterwurzel"} },
          { key: "crystal-fruit", icon: "Crystal_Fruit.png", qty: 1, quality: null, name: {"en": "Crystal Fruit", "zh": "水晶果", "zhTW": "水晶果", "ja": "クリスタルフルーツ", "ko": "수정 과일", "de": "Kristallfrucht"} },
          { key: "snow-yam", icon: "Snow_Yam.png", qty: 1, quality: null, name: {"en": "Snow Yam", "zh": "雪山药", "zhTW": "雪山藥", "ja": "スノーヤム", "ko": "눈마", "de": "Schnee-Süßkartoffel"} },
          { key: "crocus", icon: "Crocus.png", qty: 1, quality: null, name: {"en": "Crocus", "zh": "番红花", "zhTW": "番紅花", "ja": "クロッカス", "ko": "크로커스", "de": "Krokus"} },
        ],
        reward: { qty: 30, name: {"en": "Winter Seeds", "zh": "冬季种子", "zhTW": "冬季種子", "ja": "冬のタネつめあわせ", "ko": "겨울 씨앗 모음", "de": "Wintersaat"} },
      },
      {
        key: "construction", color: "red", required: 4,
        name: {"en": "Construction Bundle", "zh": "建筑收集包", "zhTW": "建築收集包", "ja": "建築材料 バンドル", "ko": "건축 꾸러미", "de": "Konstruktion"},
        items: [
          { key: "wood", icon: "Wood.png", qty: 99, quality: null, name: {"en": "Wood", "zh": "木材", "zhTW": "木材", "ja": "木材", "ko": "나무", "de": "Holz"} },
          { key: "wood", icon: "Wood.png", qty: 99, quality: null, name: {"en": "Wood", "zh": "木材", "zhTW": "木材", "ja": "木材", "ko": "나무", "de": "Holz"} },
          { key: "stone", icon: "Stone.png", qty: 99, quality: null, name: {"en": "Stone", "zh": "石头", "zhTW": "石頭", "ja": "石", "ko": "돌", "de": "Stein"} },
          { key: "hardwood", icon: "Hardwood.png", qty: 10, quality: null, name: {"en": "Hardwood", "zh": "硬木", "zhTW": "硬木", "ja": "堅い木", "ko": "단단한 나무", "de": "Hartholz"} },
        ],
        reward: { qty: 1, name: {"en": "Charcoal Kiln", "zh": "煤炭窑", "zhTW": "煤炭窯", "ja": "炭焼き窯", "ko": "숯 가마", "de": "Kohlebrennofen"} },
      },
      {
        key: "exotic-foraging", color: "purple", required: 5,
        name: {"en": "Exotic Foraging Bundle", "zh": "异国情调采集收集包", "zhTW": "異國情調採集收集包", "ja": "レアな採集 バンドル", "ko": "이국적인 채집 꾸러미", "de": "Sammeln (Exoten)"},
        items: [
          { key: "coconut", icon: "Coconut.png", qty: 1, quality: null, name: {"en": "Coconut", "zh": "椰子", "zhTW": "椰子", "ja": "ココナッツ", "ko": "코코넛", "de": "Kokosnuss"} },
          { key: "cactus-fruit", icon: "Cactus_Fruit.png", qty: 1, quality: null, name: {"en": "Cactus Fruit", "zh": "仙人掌果子", "zhTW": "仙人掌果子", "ja": "サボテンフルーツ", "ko": "선인장 열매", "de": "Kaktus-Frucht"} },
          { key: "cave-carrot", icon: "Cave_Carrot.png", qty: 1, quality: null, name: {"en": "Cave Carrot", "zh": "山洞萝卜", "zhTW": "山洞蘿蔔", "ja": "洞窟ニンジン", "ko": "동굴 당근", "de": "Höhlenkarotte"} },
          { key: "red-mushroom", icon: "Red_Mushroom.png", qty: 1, quality: null, name: {"en": "Red Mushroom", "zh": "红蘑菇", "zhTW": "紅蘑菇", "ja": "赤キノコ", "ko": "붉은 버섯", "de": "Roter Pilz"} },
          { key: "purple-mushroom", icon: "Purple_Mushroom.png", qty: 1, quality: null, name: {"en": "Purple Mushroom", "zh": "紫蘑菇", "zhTW": "紫蘑菇", "ja": "むらさきキノコ", "ko": "보라색 버섯", "de": "Violetter Pilz"} },
          { key: "maple-syrup", icon: "Maple_Syrup.png", qty: 1, quality: null, name: {"en": "Maple Syrup", "zh": "枫糖浆", "zhTW": "楓糖漿", "ja": "メープルシロップ", "ko": "메이플 시럽", "de": "Ahornsirup"} },
          { key: "oak-resin", icon: "Oak_Resin.png", qty: 1, quality: null, name: {"en": "Oak Resin", "zh": "橡树树脂", "zhTW": "橡樹樹脂", "ja": "オークの樹脂", "ko": "참나무 수지", "de": "Eichenharz"} },
          { key: "pine-tar", icon: "Pine_Tar.png", qty: 1, quality: null, name: {"en": "Pine Tar", "zh": "松焦油", "zhTW": "松焦油", "ja": "マツやに", "ko": "소나무 타르", "de": "Kiefernteer"} },
          { key: "morel", icon: "Morel.png", qty: 1, quality: null, name: {"en": "Morel", "zh": "羊肚菌", "zhTW": "羊肚菌", "ja": "アミガサタケ", "ko": "곰보버섯", "de": "Morchel"} },
        ],
        reward: { qty: 5, name: {"en": "Autumn's Bounty", "zh": "秋日恩赐", "zhTW": "秋日恩賜", "ja": "秋のめぐみ", "ko": "가을의 수확", "de": "Herbstfülle"} },
      },
    ],
  },
  {
    key: "pantry",
    name: {"en": "Pantry", "zh": "茶水间", "zhTW": "茶水間", "ja": "食料室", "ko": "식료품 저장실", "de": "Speisekammer"},
    reward: {"en": "Greenhouse", "zh": "温室", "zhTW": "溫室", "ja": "温室", "ko": "온실", "de": "Gewächshaus"},
    bundles: [
      {
        key: "spring-crops", color: "green", required: 4,
        name: {"en": "Spring Crops Bundle", "zh": "春季作物收集包", "zhTW": "春季作物收集包", "ja": "春の作物 バンドル", "ko": "봄 작물 꾸러미", "de": "Nutzpflanzen (Frühling)"},
        items: [
          { key: "parsnip", icon: "Parsnip.png", qty: 1, quality: null, name: {"en": "Parsnip", "zh": "防风草", "zhTW": "防風草", "ja": "パースニップ", "ko": "파스닙", "de": "Pastinake"} },
          { key: "green-bean", icon: "Green_Bean.png", qty: 1, quality: null, name: {"en": "Green Bean", "zh": "青豆", "zhTW": "青豆", "ja": "サヤエンドウ", "ko": "완두콩", "de": "Grüne Bohne"} },
          { key: "cauliflower", icon: "Cauliflower.png", qty: 1, quality: null, name: {"en": "Cauliflower", "zh": "花椰菜", "zhTW": "花椰菜", "ja": "カリフラワー", "ko": "콜리플라워", "de": "Blumenkohl"} },
          { key: "potato", icon: "Potato.png", qty: 1, quality: null, name: {"en": "Potato", "zh": "土豆", "zhTW": "土豆", "ja": "ジャガイモ", "ko": "감자", "de": "Kartoffel"} },
        ],
        reward: { qty: 20, name: {"en": "Speed-Gro", "zh": "生长激素", "zhTW": "生長激素", "ja": "グングンノビール", "ko": "성장 촉진제", "de": "Geschwind-Wachs"} },
      },
      {
        key: "summer-crops", color: "yellow", required: 4,
        name: {"en": "Summer Crops Bundle", "zh": "夏季作物收集包", "zhTW": "夏季作物收集包", "ja": "夏の作物 バンドル", "ko": "여름 작물 꾸러미", "de": "Nutzpflanzen (Sommer)"},
        items: [
          { key: "tomato", icon: "Tomato.png", qty: 1, quality: null, name: {"en": "Tomato", "zh": "西红柿", "zhTW": "西紅柿", "ja": "トマト", "ko": "토마토", "de": "Tomate"} },
          { key: "hot-pepper", icon: "Hot_Pepper.png", qty: 1, quality: null, name: {"en": "Hot Pepper", "zh": "辣椒", "zhTW": "辣椒", "ja": "トウガラシ", "ko": "매운 고추", "de": "Peperoni"} },
          { key: "blueberry", icon: "Blueberry.png", qty: 1, quality: null, name: {"en": "Blueberry", "zh": "蓝莓", "zhTW": "藍莓", "ja": "ブルーベリー", "ko": "블루베리", "de": "Blaubeere"} },
          { key: "melon", icon: "Melon.png", qty: 1, quality: null, name: {"en": "Melon", "zh": "甜瓜", "zhTW": "甜瓜", "ja": "メロン", "ko": "멜론", "de": "Melone"} },
        ],
        reward: { qty: 1, name: {"en": "Quality Sprinkler", "zh": "优质洒水器", "zhTW": "優質灑水器", "ja": "高品質スプリンクラー", "ko": "고급 스프링클러", "de": "Qualitätssprinkler"} },
      },
      {
        key: "fall-crops", color: "orange", required: 4,
        name: {"en": "Fall Crops Bundle", "zh": "秋季作物收集包", "zhTW": "秋季作物收集包", "ja": "秋の作物 バンドル", "ko": "가을 작물 꾸러미", "de": "Nutzpflanzen (Herbst)"},
        items: [
          { key: "corn", icon: "Corn.png", qty: 1, quality: null, name: {"en": "Corn", "zh": "玉米", "zhTW": "玉米", "ja": "トウモロコシ", "ko": "옥수수", "de": "Mais"} },
          { key: "eggplant", icon: "Eggplant.png", qty: 1, quality: null, name: {"en": "Eggplant", "zh": "茄子", "zhTW": "茄子", "ja": "ナス", "ko": "가지", "de": "Aubergine"} },
          { key: "pumpkin", icon: "Pumpkin.png", qty: 1, quality: null, name: {"en": "Pumpkin", "zh": "南瓜", "zhTW": "南瓜", "ja": "カボチャ", "ko": "호박", "de": "Kürbis"} },
          { key: "yam", icon: "Yam.png", qty: 1, quality: null, name: {"en": "Yam", "zh": "山药", "zhTW": "山藥", "ja": "サツマイモ", "ko": "참마", "de": "Süßkartoffel"} },
        ],
        reward: { qty: 1, name: {"en": "Bee House", "zh": "蜂房", "zhTW": "蜂房", "ja": "ハチの巣箱", "ko": "양봉장", "de": "Bienenhaus"} },
      },
      {
        key: "quality-crops", color: "teal", required: 3,
        name: {"en": "Quality Crops Bundle", "zh": "高品质作物收集包", "zhTW": "高品質作物收集包", "ja": "高品質な作物 バンドル", "ko": "고품질 작물 꾸러미", "de": "Nutzpflanzen (Qualität)"},
        items: [
          { key: "parsnip", icon: "Parsnip.png", qty: 5, quality: "gold", name: {"en": "Parsnip", "zh": "防风草", "zhTW": "防風草", "ja": "パースニップ", "ko": "파스닙", "de": "Pastinake"} },
          { key: "melon", icon: "Melon.png", qty: 5, quality: "gold", name: {"en": "Melon", "zh": "甜瓜", "zhTW": "甜瓜", "ja": "メロン", "ko": "멜론", "de": "Melone"} },
          { key: "pumpkin", icon: "Pumpkin.png", qty: 5, quality: "gold", name: {"en": "Pumpkin", "zh": "南瓜", "zhTW": "南瓜", "ja": "カボチャ", "ko": "호박", "de": "Kürbis"} },
          { key: "corn", icon: "Corn.png", qty: 5, quality: "gold", name: {"en": "Corn", "zh": "玉米", "zhTW": "玉米", "ja": "トウモロコシ", "ko": "옥수수", "de": "Mais"} },
        ],
        reward: { qty: 1, name: {"en": "Preserves Jar", "zh": "罐头瓶", "zhTW": "罐頭瓶", "ja": "保存ジャー", "ko": "절임통", "de": "Einmachgefäß"} },
      },
      {
        key: "animal", color: "red", required: 5,
        name: {"en": "Animal Bundle", "zh": "动物收集包", "zhTW": "動物收集包", "ja": "畜産品 バンドル", "ko": "동물 꾸러미", "de": "Tier"},
        items: [
          { key: "large-milk", icon: "Large_Milk.png", qty: 1, quality: null, name: {"en": "Large Milk", "zh": "大壶牛奶", "zhTW": "大壺牛奶", "ja": "おおきなミルク", "ko": "큰 우유", "de": "Große Milch"} },
          { key: "large-brown-egg", icon: "Large_Brown_Egg.png", qty: 1, quality: null, name: {"en": "Large Egg", "zh": "大鸡蛋", "zhTW": "大雞蛋", "ja": "おおきなタマゴ", "ko": "큰 달걀", "de": "Großes Ei"} },
          { key: "large-egg", icon: "Large_Egg.png", qty: 1, quality: null, name: {"en": "Large Egg", "zh": "大鸡蛋", "zhTW": "大雞蛋", "ja": "おおきなタマゴ", "ko": "큰 달걀", "de": "Großes Ei"} },
          { key: "large-goat-milk", icon: "Large_Goat_Milk.png", qty: 1, quality: null, name: {"en": "Large Goat Milk", "zh": "大瓶羊奶", "zhTW": "大瓶羊奶", "ja": "Large Goat Milk", "ko": "큰 염소젖", "de": "Große Ziegenmilch"} },
          { key: "wool", icon: "Wool.png", qty: 1, quality: null, name: {"en": "Wool", "zh": "动物毛", "zhTW": "動物毛", "ja": "ウール", "ko": "양털", "de": "Wolle"} },
          { key: "duck-egg", icon: "Duck_Egg.png", qty: 1, quality: null, name: {"en": "Duck Egg", "zh": "鸭蛋", "zhTW": "鴨蛋", "ja": "アヒルのタマゴ", "ko": "오리알", "de": "Entenei"} },
        ],
        reward: { qty: 1, name: {"en": "Cheese Press", "zh": "压酪机", "zhTW": "壓酪機", "ja": "チーズプレス", "ko": "치즈 착제기", "de": "Käsepresse"} },
      },
      {
        key: "artisan", color: "purple", required: 6,
        name: {"en": "Artisan Bundle", "zh": "工匠收集包", "zhTW": "工匠收集包", "ja": "加工品 バンドル", "ko": "장인 꾸러미", "de": "Handwerker"},
        items: [
          { key: "truffle-oil", icon: "Truffle_Oil.png", qty: 1, quality: null, name: {"en": "Truffle Oil", "zh": "松露油", "zhTW": "松露油", "ja": "トリュフオイル", "ko": "송로버섯 오일", "de": "Trüffelöl"} },
          { key: "cloth", icon: "Cloth.png", qty: 1, quality: null, name: {"en": "Cloth", "zh": "布料", "zhTW": "布料", "ja": "布", "ko": "옷감", "de": "Stoff"} },
          { key: "goat-cheese", icon: "Goat_Cheese.png", qty: 1, quality: null, name: {"en": "Goat Cheese", "zh": "山羊奶酪", "zhTW": "山羊奶酪", "ja": "ヤギのチーズ", "ko": "염소 치즈", "de": "Ziegenkäse"} },
          { key: "cheese", icon: "Cheese.png", qty: 1, quality: null, name: {"en": "Cheese", "zh": "奶酪", "zhTW": "奶酪", "ja": "チーズ", "ko": "치즈", "de": "Käse"} },
          { key: "honey", icon: "Honey.png", qty: 1, quality: null, name: {"en": "Honey", "zh": "蜂蜜", "zhTW": "蜂蜜", "ja": "ハチミツ", "ko": "벌꿀", "de": "Honig"} },
          { key: "jelly", icon: "Jelly.png", qty: 1, quality: null, name: {"en": "Jellies and Pickles", "zh": "果酱", "zhTW": "果醬", "ja": "ジャムとピクルス", "ko": "젤리와 피클", "de": "Gelees und Eingelegtes"} },
          { key: "apple", icon: "Apple.png", qty: 1, quality: null, name: {"en": "Apple", "zh": "苹果", "zhTW": "蘋果", "ja": "リンゴ", "ko": "사과", "de": "Apfel"} },
          { key: "apricot", icon: "Apricot.png", qty: 1, quality: null, name: {"en": "Apricot", "zh": "杏子", "zhTW": "杏子", "ja": "アプリコット", "ko": "살구", "de": "Aprikose"} },
          { key: "orange", icon: "Orange.png", qty: 1, quality: null, name: {"en": "Orange", "zh": "橙子", "zhTW": "橙子", "ja": "オレンジ", "ko": "오렌지", "de": "Orange"} },
          { key: "peach", icon: "Peach.png", qty: 1, quality: null, name: {"en": "Peach", "zh": "桃子", "zhTW": "桃子", "ja": "モモ", "ko": "복숭아", "de": "Pfirsich"} },
          { key: "pomegranate", icon: "Pomegranate.png", qty: 1, quality: null, name: {"en": "Pomegranate", "zh": "石榴", "zhTW": "石榴", "ja": "ザクロ", "ko": "석류", "de": "Granatapfel"} },
          { key: "cherry", icon: "Cherry.png", qty: 1, quality: null, name: {"en": "Cherry", "zh": "樱桃", "zhTW": "櫻桃", "ja": "サクランボ", "ko": "체리", "de": "Kirsche"} },
        ],
        reward: { qty: 1, name: {"en": "Keg", "zh": "小桶", "zhTW": "小桶", "ja": "醸造ダル", "ko": "술통", "de": "Fass"} },
      },
    ],
  },
  {
    key: "fishtank",
    name: {"en": "Fish Tank", "zh": "鱼缸", "zhTW": "魚缸", "ja": "水槽", "ko": "어항", "de": "Aquarium"},
    reward: {"en": "Pans", "zh": "移除闪闪发光的巨石", "zhTW": "移除閃閃發光的巨石", "ja": "きらびやかな巨礫を除去", "ko": "빛나는 바위 제거", "de": "Entfernung des glitzernden Felsens"},
    bundles: [
      {
        key: "river-fish", color: "teal", required: 4,
        name: {"en": "River Fish Bundle", "zh": "河鱼收集包", "zhTW": "河魚收集包", "ja": "川の魚 バンドル", "ko": "강 물고기 꾸러미", "de": "Flussfische"},
        items: [
          { key: "sunfish", icon: "Sunfish.png", qty: 1, quality: null, name: {"en": "Sunfish", "zh": "太阳鱼", "zhTW": "太陽魚", "ja": "ブルーギル", "ko": "선피쉬", "de": "Gotteslachs"} },
          { key: "catfish", icon: "Catfish.png", qty: 1, quality: null, name: {"en": "Catfish", "zh": "鲶鱼", "zhTW": "鲶魚", "ja": "ナマズ", "ko": "메기", "de": "Katzenfisch"} },
          { key: "shad", icon: "Shad.png", qty: 1, quality: null, name: {"en": "Shad", "zh": "西鲱", "zhTW": "西鯡", "ja": "アロサ", "ko": "전어", "de": "Blaubarsch"} },
          { key: "tiger-trout", icon: "Tiger_Trout.png", qty: 1, quality: null, name: {"en": "Tiger Trout", "zh": "虎纹鳟鱼", "zhTW": "虎紋鱒魚", "ja": "タイガートラウト", "ko": "타이거 송어", "de": "Tigerforelle"} },
        ],
        reward: { qty: 30, name: {"en": "Deluxe Bait", "zh": "高级鱼饵", "zhTW": "高級魚餌", "ja": "Deluxe Bait", "ko": "Deluxe Bait", "de": "Deluxe Bait"} },
      },
      {
        key: "lake-fish", color: "green", required: 4,
        name: {"en": "Lake Fish Bundle", "zh": "湖鱼收集包", "zhTW": "湖魚收集包", "ja": "湖の魚 バンドル", "ko": "호수 물고기 꾸러미", "de": "Teichfische"},
        items: [
          { key: "largemouth-bass", icon: "Largemouth_Bass.png", qty: 1, quality: null, name: {"en": "Largemouth Bass", "zh": "大嘴鲈鱼", "zhTW": "大嘴鱸魚", "ja": "ブラックバス", "ko": "큰입우럭", "de": "Forellenbarsch"} },
          { key: "carp", icon: "Carp.png", qty: 1, quality: null, name: {"en": "Carp", "zh": "鲤鱼", "zhTW": "鯉魚", "ja": "コイ", "ko": "잉어", "de": "Karpfen"} },
          { key: "bullhead", icon: "Bullhead.png", qty: 1, quality: null, name: {"en": "Bullhead", "zh": "大头鱼", "zhTW": "大頭魚", "ja": "ブルヘッド", "ko": "눈동자개", "de": "Zwergwels"} },
          { key: "sturgeon", icon: "Sturgeon.png", qty: 1, quality: null, name: {"en": "Sturgeon", "zh": "鲟鱼", "zhTW": "鱘魚", "ja": "チョウザメ", "ko": "철갑상어", "de": "Stör"} },
        ],
        reward: { qty: 1, name: {"en": "Dressed Spinner", "zh": "精装旋式鱼饵", "zhTW": "精裝旋式魚餌", "ja": "ドレススピナー", "ko": "꾸며진 회전식 미끼", "de": "Verkleideter Dreher"} },
      },
      {
        key: "ocean-fish", color: "blue", required: 4,
        name: {"en": "Ocean Fish Bundle", "zh": "海鱼收集包", "zhTW": "海魚收集包", "ja": "海の魚 バンドル", "ko": "바다 물고기 꾸러미", "de": "Ozeanfische"},
        items: [
          { key: "sardine", icon: "Sardine.png", qty: 1, quality: null, name: {"en": "Sardine", "zh": "沙丁鱼", "zhTW": "沙丁魚", "ja": "イワシ", "ko": "정어리", "de": "Sardine"} },
          { key: "tuna", icon: "Tuna.png", qty: 1, quality: null, name: {"en": "Tuna", "zh": "金枪鱼", "zhTW": "金槍魚", "ja": "マグロ", "ko": "참치", "de": "Thunfisch"} },
          { key: "red-snapper", icon: "Red_Snapper.png", qty: 1, quality: null, name: {"en": "Red Snapper", "zh": "红鲷鱼", "zhTW": "紅鯛魚", "ja": "フエダイ", "ko": "붉은 퉁돔", "de": "Riffbarsch"} },
          { key: "tilapia", icon: "Tilapia.png", qty: 1, quality: null, name: {"en": "Tilapia", "zh": "罗非鱼", "zhTW": "羅非魚", "ja": "ティラピア", "ko": "틸라피아", "de": "Buntbarsch"} },
        ],
        reward: { qty: 5, name: {"en": "Warp Totem: Beach", "zh": "传送图腾：海滩", "zhTW": "傳送圖騰：海灘", "ja": "ワープトーテム：浜辺", "ko": "워프 토템: 해변", "de": "Teleport-Totem: Strand"} },
      },
      {
        key: "night-fishing", color: "purple", required: 3,
        name: {"en": "Night Fishing Bundle", "zh": "夜间垂钓收集包", "zhTW": "夜間垂釣收集包", "ja": "夜釣り バンドル", "ko": "밤 물고기 꾸러미", "de": "Nachtfischen"},
        items: [
          { key: "walleye", icon: "Walleye.png", qty: 1, quality: null, name: {"en": "Walleye", "zh": "大眼鱼", "zhTW": "大眼魚", "ja": "ウォールアイ", "ko": "월아이", "de": "Glasaugenbarsch"} },
          { key: "bream", icon: "Bream.png", qty: 1, quality: null, name: {"en": "Bream", "zh": "鲷鱼", "zhTW": "鯛魚", "ja": "ブリーム", "ko": "도미", "de": "Brasse"} },
          { key: "eel", icon: "Eel.png", qty: 1, quality: null, name: {"en": "Eel", "zh": "鳗鱼", "zhTW": "鰻魚", "ja": "ウナギ", "ko": "장어", "de": "Aal"} },
        ],
        reward: { qty: 1, name: {"en": "Glow Ring", "zh": "光辉戒指", "zhTW": "光輝戒指", "ja": "Glow Ring", "ko": "Glow Ring", "de": "Glow Ring"} },
      },
      {
        key: "crab-pot", color: "purple", required: 5,
        name: {"en": "Crab Pot Bundle", "zh": "蟹笼收集包", "zhTW": "蟹籠收集包", "ja": "カニかご バンドル", "ko": "게잡이 통발 꾸러미", "de": "Krabbenreuse"},
        items: [
          { key: "lobster", icon: "Lobster.png", qty: 1, quality: null, name: {"en": "Lobster", "zh": "龙虾", "zhTW": "龍蝦", "ja": "ロブスター", "ko": "바닷가재", "de": "Hummer"} },
          { key: "crayfish", icon: "Crayfish.png", qty: 1, quality: null, name: {"en": "Crayfish", "zh": "小龙虾", "zhTW": "小龍蝦", "ja": "ザリガニ", "ko": "민물가재", "de": "Flusskrebs"} },
          { key: "crab", icon: "Crab.png", qty: 1, quality: null, name: {"en": "Crab", "zh": "螃蟹", "zhTW": "螃蟹", "ja": "カニ", "ko": "게", "de": "Krabbe"} },
          { key: "cockle", icon: "Cockle.png", qty: 1, quality: null, name: {"en": "Cockle", "zh": "鸟蛤", "zhTW": "鳥蛤", "ja": "ザルガイ", "ko": "새조개", "de": "Herzmuschel"} },
          { key: "mussel", icon: "Mussel.png", qty: 1, quality: null, name: {"en": "Mussel", "zh": "蚌", "zhTW": "蚌", "ja": "ムールガイ", "ko": "홍합", "de": "Miesmuschel"} },
          { key: "shrimp", icon: "Shrimp.png", qty: 1, quality: null, name: {"en": "Shrimp", "zh": "虾", "zhTW": "蝦", "ja": "エビ", "ko": "새우", "de": "Garnele"} },
          { key: "snail", icon: "Snail.png", qty: 1, quality: null, name: {"en": "Snail", "zh": "蜗牛", "zhTW": "蝸牛", "ja": "カタツムリ", "ko": "달팽이", "de": "Schnecke"} },
          { key: "periwinkle", icon: "Periwinkle.png", qty: 1, quality: null, name: {"en": "Periwinkle", "zh": "玉黍螺", "zhTW": "玉黍螺", "ja": "タマキビ", "ko": "충알고둥", "de": "Strandschnecke"} },
          { key: "oyster", icon: "Oyster.png", qty: 1, quality: null, name: {"en": "Oyster", "zh": "牡蛎", "zhTW": "牡蠣", "ja": "カキ", "ko": "굴", "de": "Auster"} },
          { key: "clam", icon: "Clam.png", qty: 1, quality: null, name: {"en": "Clam", "zh": "蛤", "zhTW": "蛤", "ja": "アサリ", "ko": "조개", "de": "Venusmuschel"} },
        ],
        reward: { qty: 3, name: {"en": "Crab Pot", "zh": "蟹笼", "zhTW": "蟹籠", "ja": "カニかご", "ko": "게잡이 통발", "de": "Krabbenreuse"} },
      },
      {
        key: "specialty-fish", color: "red", required: 4,
        name: {"en": "Specialty Fish Bundle", "zh": "特色鱼类收集包", "zhTW": "特色魚類收集包", "ja": "珍魚 バンドル", "ko": "특별한 물고기 꾸러미", "de": "Spezialitätsfische"},
        items: [
          { key: "pufferfish", icon: "Pufferfish.png", qty: 1, quality: null, name: {"en": "Pufferfish", "zh": "河豚", "zhTW": "河豚", "ja": "ハリセンボン", "ko": "복어", "de": "Kugelfisch"} },
          { key: "ghostfish", icon: "Ghostfish.png", qty: 1, quality: null, name: {"en": "Ghostfish", "zh": "鬼鱼", "zhTW": "鬼魚", "ja": "ヒヨケウオ", "ko": "귀신물고기", "de": "Indischer Glaswels"} },
          { key: "sandfish", icon: "Sandfish.png", qty: 1, quality: null, name: {"en": "Sandfish", "zh": "沙鱼", "zhTW": "沙魚", "ja": "スナゴチ", "ko": "도루묵", "de": "Sandfisch"} },
          { key: "woodskip", icon: "Woodskip.png", qty: 1, quality: null, name: {"en": "Woodskip", "zh": "木跃鱼", "zhTW": "木躍魚", "ja": "キノボリウオ", "ko": "숲고기", "de": "Waldspringer"} },
        ],
        reward: { qty: 5, name: {"en": "Dish O' The Sea", "zh": "海之菜肴", "zhTW": "海之菜餚", "ja": "おさかな定食", "ko": "바다의 요리", "de": "Matrosenteller"} },
      },
    ],
  },
  {
    key: "boiler",
    name: {"en": "Boiler Room", "zh": "锅炉房", "zhTW": "鍋爐房", "ja": "ボイラールーム", "ko": "보일러실", "de": "Heizraum"},
    reward: {"en": "Minecart", "zh": "矿车", "zhTW": "礦車", "ja": "トロッコ", "ko": "광산 카트", "de": "Loren"},
    bundles: [
      {
        key: "blacksmith-s", color: "orange", required: 3,
        name: {"en": "Blacksmith's Bundle", "zh": "铁匠的收集包", "zhTW": "鐵匠的收集包", "ja": "鍛冶屋の バンドル", "ko": "대장장이 꾸러미", "de": "Schmied"},
        items: [
          { key: "copper-bar", icon: "Copper_Bar.png", qty: 1, quality: null, name: {"en": "Copper Bar", "zh": "铜锭", "zhTW": "銅錠", "ja": "銅ののべ棒", "ko": "구리 주괴", "de": "Kupferbarren"} },
          { key: "iron-bar", icon: "Iron_Bar.png", qty: 1, quality: null, name: {"en": "Iron Bar", "zh": "铁锭", "zhTW": "鐵錠", "ja": "鉄ののべ棒", "ko": "철 주괴", "de": "Eisenbarren"} },
          { key: "gold-bar", icon: "Gold_Bar.png", qty: 1, quality: null, name: {"en": "Gold Bar", "zh": "金锭", "zhTW": "金錠", "ja": "金ののべ棒", "ko": "금 주괴", "de": "Goldbarren"} },
        ],
        reward: { qty: 1, name: {"en": "Furnace", "zh": "熔炉", "zhTW": "熔爐", "ja": "溶鉱炉", "ko": "용광로", "de": "Schmelzofen"} },
      },
      {
        key: "geologist-s", color: "purple", required: 4,
        name: {"en": "Geologist's Bundle", "zh": "地理学家的收集包", "zhTW": "地理學家的收集包", "ja": "地質学者の バンドル", "ko": "지질학자 꾸러미", "de": "Geologe"},
        items: [
          { key: "quartz", icon: "Quartz.png", qty: 1, quality: null, name: {"en": "Quartz", "zh": "石英", "zhTW": "石英", "ja": "水晶", "ko": "석영", "de": "Quarz"} },
          { key: "earth-crystal", icon: "Earth_Crystal.png", qty: 1, quality: null, name: {"en": "Earth Crystal", "zh": "地晶", "zhTW": "地晶", "ja": "アースクリスタル", "ko": "땅의 수정", "de": "Erdkristall"} },
          { key: "frozen-tear", icon: "Frozen_Tear.png", qty: 1, quality: null, name: {"en": "Frozen Tear", "zh": "泪晶", "zhTW": "淚晶", "ja": "イエティのなみだ", "ko": "얼어붙은 눈물", "de": "Gefrorene Träne"} },
          { key: "fire-quartz", icon: "Fire_Quartz.png", qty: 1, quality: null, name: {"en": "Fire Quartz", "zh": "火水晶", "zhTW": "火水晶", "ja": "ファイアクオーツ", "ko": "불의 석영", "de": "Feuer-Quarz"} },
        ],
        reward: { qty: 5, name: {"en": "Omni Geode", "zh": "万象晶球", "zhTW": "萬象晶球", "ja": "オムニジオード", "ko": "전 정동석", "de": "Omni-Geode"} },
      },
      {
        key: "adventurer-s", color: "purple", required: 2,
        name: {"en": "Adventurer's Bundle", "zh": "冒险家的收集包", "zhTW": "冒險家的收集包", "ja": "冒険者の バンドル", "ko": "모험가 꾸러미", "de": "Abenteurer"},
        items: [
          { key: "slime", icon: "Slime.png", qty: 99, quality: null, name: {"en": "Slime", "zh": "史莱姆泥", "zhTW": "史萊姆泥", "ja": "スライム", "ko": "슬라임", "de": "Schleim"} },
          { key: "bat-wing", icon: "Bat_Wing.png", qty: 10, quality: null, name: {"en": "Bat Wing", "zh": "蝙蝠翅膀", "zhTW": "蝙蝠翅膀", "ja": "コウモリのつばさ", "ko": "박쥐 날개", "de": "Fledermausflügel"} },
          { key: "solar-essence", icon: "Solar_Essence.png", qty: 1, quality: null, name: {"en": "Solar Essence", "zh": "太阳精华", "zhTW": "太陽精華", "ja": "光の結晶", "ko": "태양 정수", "de": "Solar-Essenz"} },
          { key: "void-essence", icon: "Void_Essence.png", qty: 1, quality: null, name: {"en": "Void Essence", "zh": "虚空精华", "zhTW": "虛空精華", "ja": "闇の結晶", "ko": "공허 정수", "de": "Schattenessenz"} },
        ],
        reward: { qty: 1, name: {"en": "Small Magnet Ring", "zh": "小型磁铁戒指", "zhTW": "小型磁鐵戒指", "ja": "磁石の指輪S", "ko": "작은자석 반지", "de": "Kleiner Magnetring"} },
      },
    ],
  },
  {
    key: "bulletin",
    name: {"en": "Bulletin Board", "zh": "布告栏", "zhTW": "布告欄", "ja": "掲示板", "ko": "게시판", "de": "Schwarzes Brett"},
    reward: {"en": "Friendship", "zh": "友谊", "zhTW": "友誼", "ja": "友好度", "ko": "우정", "de": "Freundschaft"},
    bundles: [
      {
        key: "chef-s", color: "red", required: 6,
        name: {"en": "Chef's Bundle", "zh": "厨师收集包", "zhTW": "廚師收集包", "ja": "料理人の バンドル", "ko": "요리사 꾸러미", "de": "Koch"},
        items: [
          { key: "maple-syrup", icon: "Maple_Syrup.png", qty: 1, quality: null, name: {"en": "Maple Syrup", "zh": "枫糖浆", "zhTW": "楓糖漿", "ja": "メープルシロップ", "ko": "메이플 시럽", "de": "Ahornsirup"} },
          { key: "fiddlehead-fern", icon: "Fiddlehead_Fern.png", qty: 1, quality: null, name: {"en": "Fiddlehead Fern", "zh": "蕨菜", "zhTW": "蕨菜", "ja": "フィドルヘッド", "ko": "청나래고사리", "de": "Straußfarn"} },
          { key: "truffle", icon: "Truffle.png", qty: 1, quality: null, name: {"en": "Truffle", "zh": "松露", "zhTW": "松露", "ja": "トリュフ", "ko": "송로버섯", "de": "Trüffel"} },
          { key: "poppy", icon: "Poppy.png", qty: 1, quality: null, name: {"en": "Poppy", "zh": "虞美人花", "zhTW": "虞美人花", "ja": "ポピー", "ko": "양귀비", "de": "Mohn"} },
          { key: "maki-roll", icon: "Maki_Roll.png", qty: 1, quality: null, name: {"en": "Maki Roll", "zh": "生鱼寿司", "zhTW": "生魚壽司", "ja": "巻きずし", "ko": "마키 롤", "de": "Maki-Rolle"} },
          { key: "fried-egg", icon: "Fried_Egg.png", qty: 1, quality: null, name: {"en": "Fried Egg", "zh": "煎鸡蛋", "zhTW": "煎雞蛋", "ja": "目玉焼き", "ko": "계란 프라이", "de": "Spiegelei"} },
        ],
        reward: { qty: 3, name: {"en": "Pink Cake", "zh": "粉红蛋糕", "zhTW": "粉紅蛋糕", "ja": "ピンクケーキ", "ko": "핑크 케이크", "de": "Pinke Torte"} },
      },
      {
        key: "dye", color: "teal", required: 6,
        name: {"en": "Dye Bundle", "zh": "染料收集包", "zhTW": "染料收集包", "ja": "染めもの バンドル", "ko": "염료 꾸러미", "de": "Färbemittel"},
        items: [
          { key: "red-mushroom", icon: "Red_Mushroom.png", qty: 1, quality: null, name: {"en": "Red Mushroom", "zh": "红蘑菇", "zhTW": "紅蘑菇", "ja": "赤キノコ", "ko": "붉은 버섯", "de": "Roter Pilz"} },
          { key: "sea-urchin", icon: "Sea_Urchin.png", qty: 1, quality: null, name: {"en": "Sea Urchin", "zh": "海胆", "zhTW": "海膽", "ja": "ウニ", "ko": "성게", "de": "Seeigel"} },
          { key: "sunflower", icon: "Sunflower.png", qty: 1, quality: null, name: {"en": "Sunflower", "zh": "向日葵", "zhTW": "向日葵", "ja": "ヒマワリ", "ko": "해바라기", "de": "Sonnenblume"} },
          { key: "duck-feather", icon: "Duck_Feather.png", qty: 1, quality: null, name: {"en": "Duck Feather", "zh": "鸭毛", "zhTW": "鴨毛", "ja": "アヒルのハネ", "ko": "오리깃털", "de": "Entenfeder"} },
          { key: "aquamarine", icon: "Aquamarine.png", qty: 1, quality: null, name: {"en": "Aquamarine", "zh": "海蓝宝石", "zhTW": "海藍寶石", "ja": "アクアマリン", "ko": "아쿠아마린", "de": "Aquamarin"} },
          { key: "red-cabbage", icon: "Red_Cabbage.png", qty: 1, quality: null, name: {"en": "Red Cabbage", "zh": "红叶卷心菜", "zhTW": "紅葉捲心菜", "ja": "赤キャベツ", "ko": "붉은 양배추", "de": "Rotkohl"} },
        ],
        reward: { qty: 1, name: {"en": "Seed Maker", "zh": "种子生产器", "zhTW": "種子生產器", "ja": "タネ製造マシン", "ko": "씨앗 생성기", "de": "Saatguterzeuger"} },
      },
      {
        key: "field-research", color: "blue", required: 4,
        name: {"en": "Field Research Bundle", "zh": "土地研究收集包", "zhTW": "土地研究收集包", "ja": "野外調査 バンドル", "ko": "현장 연구 꾸러미", "de": "Feldforschung"},
        items: [
          { key: "purple-mushroom", icon: "Purple_Mushroom.png", qty: 1, quality: null, name: {"en": "Purple Mushroom", "zh": "紫蘑菇", "zhTW": "紫蘑菇", "ja": "むらさきキノコ", "ko": "보라색 버섯", "de": "Violetter Pilz"} },
          { key: "nautilus-shell", icon: "Nautilus_Shell.png", qty: 1, quality: null, name: {"en": "Nautilus Shell", "zh": "鹦鹉螺", "zhTW": "鸚鵡螺", "ja": "オウムガイの貝がら", "ko": "앵무조개 껍데기", "de": "Nautilusmuschel"} },
          { key: "chub", icon: "Chub.png", qty: 1, quality: null, name: {"en": "Chub", "zh": "鲢鱼", "zhTW": "鰱魚", "ja": "チャブ", "ko": "피라미", "de": "Kaulbarsch"} },
          { key: "frozen-geode", icon: "Frozen_Geode.png", qty: 1, quality: null, name: {"en": "Frozen Geode", "zh": "冰封晶球", "zhTW": "冰封晶球", "ja": "フローズンジオード", "ko": "얼어붙은 정동석", "de": "Gefrorene Geode"} },
        ],
        reward: { qty: 1, name: {"en": "Recycling Machine", "zh": "回收机", "zhTW": "回收機", "ja": "リサイクルマシン", "ko": "재활용 기계", "de": "Recycle-Maschine"} },
      },
      {
        key: "fodder", color: "yellow", required: 3,
        name: {"en": "Fodder Bundle", "zh": "饲料收集包", "zhTW": "飼料收集包", "ja": "まきばの バンドル", "ko": "사료 꾸러미", "de": "Futter"},
        items: [
          { key: "wheat", icon: "Wheat.png", qty: 10, quality: null, name: {"en": "Wheat", "zh": "小麦", "zhTW": "小麥", "ja": "コムギ", "ko": "밀", "de": "Weizen"} },
          { key: "hay", icon: "Hay.png", qty: 10, quality: null, name: {"en": "Hay", "zh": "干草", "zhTW": "乾草", "ja": "ほし草", "ko": "건초", "de": "Heu"} },
          { key: "apple", icon: "Apple.png", qty: 3, quality: null, name: {"en": "Apple", "zh": "苹果", "zhTW": "蘋果", "ja": "リンゴ", "ko": "사과", "de": "Apfel"} },
        ],
        reward: { qty: 1, name: {"en": "Heater", "zh": "加热器", "zhTW": "加熱器", "ja": "ヒーター", "ko": "히터", "de": "Heizgerät"} },
      },
      {
        key: "enchanter-s", color: "purple", required: 4,
        name: {"en": "Enchanter's Bundle", "zh": "魔法师收集包", "zhTW": "魔法師收集包", "ja": "魔術師の バンドル", "ko": "마법사 꾸러미", "de": "Verzauberer"},
        items: [
          { key: "oak-resin", icon: "Oak_Resin.png", qty: 1, quality: null, name: {"en": "Oak Resin", "zh": "橡树树脂", "zhTW": "橡樹樹脂", "ja": "オークの樹脂", "ko": "참나무 수지", "de": "Eichenharz"} },
          { key: "wine", icon: "Wine.png", qty: 1, quality: null, name: {"en": "Wine", "zh": "果酒", "zhTW": "果酒", "ja": "ワイン", "ko": "와인", "de": "Wein"} },
          { key: "rabbit-s-foot", icon: "Rabbit's_Foot.png", qty: 1, quality: null, name: {"en": "Rabbit's Foot", "zh": "兔子的脚", "zhTW": "兔子的腳", "ja": "ウサギの足", "ko": "토끼발", "de": "Hasenpfote"} },
          { key: "pomegranate", icon: "Pomegranate.png", qty: 1, quality: null, name: {"en": "Pomegranate", "zh": "石榴", "zhTW": "石榴", "ja": "ザクロ", "ko": "석류", "de": "Granatapfel"} },
        ],
        reward: { qty: 5, name: {"en": "Gold Bar", "zh": "金锭", "zhTW": "金錠", "ja": "金ののべ棒", "ko": "금 주괴", "de": "Goldbarren"} },
      },
    ],
  },
  {
    key: "vault",
    name: {"en": "Vault", "zh": "金库", "zhTW": "金庫", "ja": "金庫室", "ko": "금고", "de": "Tresor"},
    reward: {"en": "Bus Stop", "zh": "巴士站", "zhTW": "巴士站", "ja": "バス停", "ko": "버스 정류장", "de": "Bushaltestelle"},
    bundles: [
      {
        key: "2-500", color: "red", required: 0,
        gold: 2500,
        name: {"en": "2,500 Bundle", "zh": "2,500金收集包", "zhTW": "2,500金收集包", "ja": "2500G バンドル", "ko": "2,500 꾸러미", "de": "2.500 Bündel"},
        items: [],
        reward: { qty: 3, name: {"en": "Chocolate Cake", "zh": "巧克力蛋糕", "zhTW": "巧克力蛋糕", "ja": "チョコレートケーキ", "ko": "초콜릿 케이크", "de": "Schokoladentorte"} },
      },
      {
        key: "5-000", color: "orange", required: 0,
        gold: 5000,
        name: {"en": "5,000 Bundle", "zh": "5,000金收集包", "zhTW": "5,000金收集包", "ja": "5000G バンドル", "ko": "5,000 꾸러미", "de": "5.000 Bündel"},
        items: [],
        reward: { qty: 30, name: {"en": "Quality Fertilizer", "zh": "高级肥料", "zhTW": "高級肥料", "ja": "高級な肥料", "ko": "고급 비료", "de": "Qualitätsdünger"} },
      },
      {
        key: "10-000", color: "yellow", required: 0,
        gold: 10000,
        name: {"en": "10,000 Bundle", "zh": "10,000金收集包", "zhTW": "10,000金收集包", "ja": "10000G バンドル", "ko": "10,000 꾸러미", "de": "10.000 Bündel"},
        items: [],
        reward: { qty: 1, name: {"en": "Lightning Rod", "zh": "避雷针", "zhTW": "避雷針", "ja": "ひらい針", "ko": "피뢰침", "de": "Blitzableiter"} },
      },
      {
        key: "25-000", color: "purple", required: 0,
        gold: 25000,
        name: {"en": "25,000 Bundle", "zh": "25,000金收集包", "zhTW": "25,000金收集包", "ja": "25000G バンドル", "ko": "25,000 꾸러미", "de": "25.000 Bündel"},
        items: [],
        reward: { qty: 1, name: {"en": "Crystalarium", "zh": "宝石复制机", "zhTW": "寶石複製機", "ja": "結晶コピーマシン", "ko": "결정생성기", "de": "Kristallarium"} },
      },
    ],
  },
  {
    key: "joja",
    name: {"en": "Abandoned JojaMart", "zh": "废弃Joja超市", "zhTW": "廢棄Joja超市", "ja": "放棄されたJojaマート", "ko": "버려진 조자마트", "de": "Verlassener Joja-Markt"},
    reward: {"en": "Movie Theater", "zh": "电影院", "zhTW": "電影院", "ja": "映画館", "ko": "영화관", "de": "Kino"},
    bundles: [
      {
        key: "the-missing", color: "purple", required: 5,
        name: {"en": "The Missing Bundle", "zh": "失踪的收集包", "zhTW": "失蹤的收集包", "ja": "行方不明 バンドル", "ko": "잊혀진 꾸러미", "de": "Das fehlende Bündel"},
        items: [
          { key: "wine", icon: "Wine.png", qty: 1, quality: "silver", name: {"en": "Wine", "zh": "果酒", "zhTW": "果酒", "ja": "ワイン", "ko": "와인", "de": "Wein"} },
          { key: "dinosaur-mayonnaise", icon: "Dinosaur_Mayonnaise.png", qty: 1, quality: null, name: {"en": "Dinosaur Mayonnaise", "zh": "恐龙蛋黄酱", "zhTW": "恐龍蛋黃醬", "ja": "恐竜マヨネーズ", "ko": "공룡 마요네즈", "de": "Dinosaurier Mayonnaise"} },
          { key: "prismatic-shard", icon: "Prismatic_Shard.png", qty: 1, quality: null, name: {"en": "Prismatic Shard", "zh": "五彩碎片", "zhTW": "五彩碎片", "ja": "レインボージェム", "ko": "무지갯빛 파편", "de": "Prismatische Scherbe"} },
          { key: "ancient-fruit", icon: "Ancient_Fruit.png", qty: 5, quality: "gold", name: {"en": "Ancient Fruit", "zh": "上古水果", "zhTW": "上古水果", "ja": "古代のフルーツ", "ko": "고대 과일", "de": "Uralte Frucht"} },
          { key: "void-salmon", icon: "Void_Salmon.png", qty: 1, quality: "gold", name: {"en": "Void Salmon", "zh": "虚空鲑鱼", "zhTW": "虛空鮭魚", "ja": "闇サーモン", "ko": "공허의 연어", "de": "Schattenlachs"} },
          { key: "caviar", icon: "Caviar.png", qty: 1, quality: null, name: {"en": "Caviar", "zh": "鱼籽酱", "zhTW": "魚籽醬", "ja": "キャビア", "ko": "캐비아", "de": "Kaviar"} },
        ],
        reward: null,
      },
    ],
  },
]
