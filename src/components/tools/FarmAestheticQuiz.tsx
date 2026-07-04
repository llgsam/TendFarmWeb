'use client'

import { useState } from 'react'

type Aesthetic = 'cottagecore' | 'dark-moody' | 'bright-cheerful' | 'zen-minimal' | 'cozy-rustic'

interface Option {
  zh: string
  en: string
  zhTW: string
  ja: string
  ko: string
  de: string
  type: Aesthetic
}

interface Question {
  zh: string
  en: string
  q_zhTW: string
  q_ja: string
  q_ko: string
  q_de: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    zh: '你理想的农场早晨是什么样的？',
    en: 'Your ideal farm morning looks like:',
    q_zhTW: '你理想的農場早晨是什麼樣的？',
    q_ja: '理想のファームの朝はどんな感じ？',
    q_ko: '당신의 이상적인 농장 아침은 어떤 모습인가요?',
    q_de: 'Wie sieht dein idealer Farmmorgen aus?',
    options: [
      {
        zh: '薄雾中，穿着麻布裙去采野花',
        en: 'Walking through mist in a linen dress, picking wildflowers',
        zhTW: '薄霧中，穿著麻布裙去採野花',
        ja: '霧の中、リネンのスカートで野の花を摘む',
        ko: '안개 속에서 린넨 치마를 입고 들꽃을 따다',
        de: 'Im Nebel in einem Leinenkleid Wildblumen pflücken',
        type: 'cottagecore',
      },
      {
        zh: '乌云压着雾气，在静谧中喝一杯黑茶',
        en: 'Low clouds, fog, and a quiet cup of black tea in the stillness',
        zhTW: '烏雲壓著霧氣，在靜謐中喝一杯黑茶',
        ja: '曇り空と霧の中、静かに紅茶を一杯',
        ko: '먹구름과 안개 속에서 조용히 홍차 한 잔',
        de: 'Tiefe Wolken, Nebel und eine stille Tasse schwarzen Tee',
        type: 'dark-moody',
      },
      {
        zh: '阳光灿烂，到处都是缤纷的颜色',
        en: 'Bright sunshine, colorful flowers everywhere, cheerful sounds',
        zhTW: '陽光燦爛，到處都是繽紛的顏色',
        ja: '明るい日差し、カラフルな花々が咲き乱れる',
        ko: '밝은 햇살, 알록달록한 꽃들이 가득',
        de: 'Strahlender Sonnenschein, bunte Blumen überall',
        type: 'bright-cheerful',
      },
      {
        zh: '极简整洁，一杯白茶，听鸟叫',
        en: 'Minimal and clean — a cup of white tea and birdsong',
        zhTW: '極簡整潔，一杯白茶，聽鳥叫',
        ja: 'シンプルで清潔感、白茶と鳥の声',
        ko: '미니멀하고 깔끔하게, 백차 한 잔과 새 소리',
        de: 'Minimal und sauber — ein Becher Weißtee und Vogelgesang',
        type: 'zen-minimal',
      },
      {
        zh: '木屋里有柴火的味道，外面是金色秋叶',
        en: 'Woodsmoke from the hearth, golden autumn leaves outside',
        zhTW: '木屋裡有柴火的味道，外面是金色秋葉',
        ja: '木の家に薪の香り、外は黄金色の秋の葉',
        ko: '목조 오두막의 장작 냄새, 밖에는 황금빛 가을 잎',
        de: 'Holzrauch aus dem Kamin, goldene Herbstblätter draußen',
        type: 'cozy-rustic',
      },
    ],
  },
  {
    zh: '你的农场窗台上放着什么？',
    en: "What's on your farmhouse windowsill?",
    q_zhTW: '你的農場窗台上放著什麼？',
    q_ja: 'ファームの窓辺には何がある？',
    q_ko: '농장 창틀에 무엇이 있나요?',
    q_de: 'Was steht auf deiner Farmhaus-Fensterbank?',
    options: [
      {
        zh: '干花束、蜂蜡蜡烛、一本旧诗集',
        en: 'Dried flower bunches, a beeswax candle, a worn poetry book',
        zhTW: '乾花束、蜂蠟蠟燭、一本舊詩集',
        ja: 'ドライフラワー、蜜蝋キャンドル、古い詩集',
        ko: '드라이 플라워, 밀랍 양초, 낡은 시집',
        de: 'Trockenblumen, eine Bienenwachskerze, ein alter Gedichtband',
        type: 'cottagecore',
      },
      {
        zh: '苔藓、蘑菇标本、一个黑色花瓶',
        en: 'Moss, mushroom specimens, and a single black vase',
        zhTW: '苔蘚、蘑菇標本、一個黑色花瓶',
        ja: 'コケ、キノコの標本、黒い花瓶',
        ko: '이끼, 버섯 표본, 검은 꽃병',
        de: 'Moos, Pilzexemplare und eine schwarze Vase',
        type: 'dark-moody',
      },
      {
        zh: '彩虹水晶、色彩缤纷的多肉、贝壳',
        en: 'Rainbow crystals, colorful succulents, and seashells',
        zhTW: '彩虹水晶、色彩繽紛的多肉、貝殼',
        ja: 'レインボークリスタル、カラフルな多肉植物、貝殻',
        ko: '무지개 크리스탈, 알록달록한 다육이, 조개껍데기',
        de: 'Regenbogenkristalle, bunte Sukkulenten und Muscheln',
        type: 'bright-cheerful',
      },
      {
        zh: '一盆简单的绿植，什么都不多',
        en: 'One simple green plant — nothing more, nothing less',
        zhTW: '一盆簡單的綠植，什麼都不多',
        ja: 'シンプルな観葉植物が一鉢、それだけ',
        ko: '단순한 초록 화분 하나, 그것으로 충분',
        de: 'Eine schlichte grüne Pflanze — nicht mehr, nicht weniger',
        type: 'zen-minimal',
      },
      {
        zh: '亲手做的果酱罐、松果、一块粗陶杯',
        en: 'Homemade jam jars, pinecones, a handmade ceramic mug',
        zhTW: '親手做的果醬罐、松果、一塊粗陶杯',
        ja: '手作りジャムの瓶、松ぼっくり、手びねりのマグカップ',
        ko: '수제 잼 병, 솔방울, 손으로 만든 세라믹 머그',
        de: 'Selbstgemachte Marmeladengläser, Tannenzapfen, eine Keramiktasse',
        type: 'cozy-rustic',
      },
    ],
  },
  {
    zh: '你的农场颜色主调是？',
    en: "Your farm's color palette is:",
    q_zhTW: '你的農場顏色主調是？',
    q_ja: 'ファームのカラーパレットは？',
    q_ko: '농장의 주요 색조는?',
    q_de: 'Die Farbpalette deiner Farm ist:',
    options: [
      {
        zh: '米白、鼠尾草绿、淡玫瑰、蜜蜡黄',
        en: 'Cream, sage green, blush rose, and beeswax yellow',
        zhTW: '米白、鼠尾草綠、淡玫瑰、蜜蠟黃',
        ja: 'クリーム、セージグリーン、淡いローズ、蜜蝋イエロー',
        ko: '크림, 세이지 그린, 블러시 로즈, 밀랍 옐로',
        de: 'Creme, Salbeigrün, zartes Rosa und Bienenwachsgelb',
        type: 'cottagecore',
      },
      {
        zh: '深墨绿、炭灰、雾蓝、暗紫',
        en: 'Deep forest green, charcoal, mist blue, and dark plum',
        zhTW: '深墨綠、炭灰、霧藍、暗紫',
        ja: '深い森の緑、チャコール、霞がかったブルー、ダークプラム',
        ko: '짙은 숲 초록, 차콜, 안개 블루, 다크 플럼',
        de: 'Tiefes Waldgrün, Anthrazit, Nebelblau und dunkles Pflaume',
        type: 'dark-moody',
      },
      {
        zh: '天蓝、柠檬黄、珊瑚橙、薄荷绿',
        en: 'Sky blue, lemon yellow, coral, and mint green',
        zhTW: '天藍、檸檬黃、珊瑚橙、薄荷綠',
        ja: 'スカイブルー、レモンイエロー、コーラル、ミントグリーン',
        ko: '하늘색, 레몬 옐로, 코랄, 민트 그린',
        de: 'Himmelblau, Zitronengelb, Koralle und Mintgrün',
        type: 'bright-cheerful',
      },
      {
        zh: '白、米白、浅灰、原木色',
        en: 'White, off-white, light grey, and natural wood tones',
        zhTW: '白、米白、淺灰、原木色',
        ja: '白、オフホワイト、ライトグレー、ナチュラルウッド',
        ko: '흰색, 오프화이트, 연회색, 내추럴 우드',
        de: 'Weiß, Off-White, Hellgrau und natürliche Holztöne',
        type: 'zen-minimal',
      },
      {
        zh: '深栗棕、橘红、苔绿、暖黄',
        en: 'Deep chestnut, burnt orange, moss green, and amber',
        zhTW: '深栗棕、橘紅、苔綠、暖黃',
        ja: '深いチェスナット、バーントオレンジ、モスグリーン、アンバー',
        ko: '깊은 밤색, 번트 오렌지, 이끼 초록, 앰버',
        de: 'Tiefes Kastanienbraun, gebranntes Orange, Moosgrün und Bernstein',
        type: 'cozy-rustic',
      },
    ],
  },
  {
    zh: '太阳落山时，你的农场是什么感觉？',
    en: 'When the sun goes down, your farm feels:',
    q_zhTW: '太陽落山時，你的農場是什麼感覺？',
    q_ja: '日が沈む頃、ファームはどんな雰囲気？',
    q_ko: '해가 질 때 농장의 느낌은?',
    q_de: 'Wenn die Sonne untergeht, fühlt sich deine Farm an wie:',
    options: [
      {
        zh: '金色光芒穿过白色窗帘，像童话里一样',
        en: 'Golden light through white curtains — like a fairy tale',
        zhTW: '金色光芒穿過白色窗簾，像童話裡一樣',
        ja: '白いカーテン越しに差し込む金色の光、おとぎ話みたい',
        ko: '흰 커튼 사이로 스며드는 황금빛, 동화 같은',
        de: 'Goldenes Licht durch weiße Vorhänge — wie ein Märchen',
        type: 'cottagecore',
      },
      {
        zh: '灯笼和蜡烛亮起来，有点神秘，很美',
        en: 'Lanterns and candles flickering — mysterious and beautiful',
        zhTW: '燈籠和蠟燭亮起來，有點神秘，很美',
        ja: 'ランタンとキャンドルが灯り、神秘的で美しい',
        ko: '등불과 양초가 켜지며 신비롭고 아름다운',
        de: 'Laternen und Kerzen flackern — geheimnisvoll und schön',
        type: 'dark-moody',
      },
      {
        zh: '灯光通明，到处都是欢声笑语',
        en: 'Bright lights everywhere, laughter, and music in the air',
        zhTW: '燈光通明，到處都是歡聲笑語',
        ja: '明るい灯り、どこからも笑い声と音楽が聞こえる',
        ko: '환한 불빛, 곳곳에 웃음소리와 음악',
        de: 'Helles Licht überall, Lachen und Musik in der Luft',
        type: 'bright-cheerful',
      },
      {
        zh: '安静归位，简单，一片祥和',
        en: 'Everything settles into quiet — simple and utterly peaceful',
        zhTW: '安靜歸位，簡單，一片祥和',
        ja: 'すべてが静かに落ち着き、シンプルで穏やか',
        ko: '모든 것이 조용히 제자리로, 단순하고 평화롭게',
        de: 'Alles kehrt in die Stille zurück — einfach und friedlich',
        type: 'zen-minimal',
      },
      {
        zh: '壁炉燃起，毛毯盖上，最好的时刻',
        en: 'Fireplace lit, blanket on, the best part of the day',
        zhTW: '壁爐燃起，毛毯蓋上，最好的時刻',
        ja: '暖炉に火が入り、毛布をかけて、一日で一番好きな時間',
        ko: '벽난로가 켜지고 담요를 덮는, 하루 중 최고의 순간',
        de: 'Kamin an, Decke drüber — der beste Moment des Tages',
        type: 'cozy-rustic',
      },
    ],
  },
  {
    zh: '你的农场世界里播放着什么音乐？',
    en: 'What music plays in your farm world?',
    q_zhTW: '你的農場世界裡播放著什麼音樂？',
    q_ja: 'ファームの世界に流れる音楽は？',
    q_ko: '농장 세계에서 흘러나오는 음악은?',
    q_de: 'Was spielt in deiner Farmwelt für Musik?',
    options: [
      {
        zh: '民谣、竖琴、轻柔的口哨声',
        en: 'Folk music, harp melodies, and soft whistling',
        zhTW: '民謠、豎琴、輕柔的口哨聲',
        ja: 'フォークミュージック、ハープ、やさしい口笛',
        ko: '포크 음악, 하프 선율, 부드러운 휘파람',
        de: 'Folk, Harfenmelodien und sanftes Pfeifen',
        type: 'cottagecore',
      },
      {
        zh: '大提琴、雨声、黑暗古典乐',
        en: 'Cello, rain sounds, and dark classical music',
        zhTW: '大提琴、雨聲、黑暗古典樂',
        ja: 'チェロ、雨の音、ダークなクラシック',
        ko: '첼로, 빗소리, 다크 클래식',
        de: 'Cello, Regengeräusche und dunkle klassische Musik',
        type: 'dark-moody',
      },
      {
        zh: '动森原声带、欢快的吉他、合成器流行',
        en: 'Animal Crossing OST, upbeat guitar, synth-pop',
        zhTW: '動森原聲帶、歡快的吉他、合成器流行',
        ja: 'どうぶつの森のBGM、明るいギター、シンセポップ',
        ko: '모동숲 OST, 신나는 기타, 신스팝',
        de: 'Animal Crossing OST, fröhliche Gitarre, Synth-Pop',
        type: 'bright-cheerful',
      },
      {
        zh: '日式禅意音乐、流水声、无声',
        en: 'Japanese zen music, water sounds, or silence',
        zhTW: '日式禪意音樂、流水聲、無聲',
        ja: '日本の禅の音楽、水の音、または無音',
        ko: '일본 선 음악, 물소리, 혹은 침묵',
        de: 'Japanische Zen-Musik, Wassergeräusche oder Stille',
        type: 'zen-minimal',
      },
      {
        zh: '乡村民谣、原声吉他、温暖的钢琴',
        en: 'Country folk, acoustic guitar, and warm piano',
        zhTW: '鄉村民謠、原聲吉他、溫暖的鋼琴',
        ja: 'カントリーフォーク、アコースティックギター、温かいピアノ',
        ko: '컨트리 포크, 어쿠스틱 기타, 따뜻한 피아노',
        de: 'Country-Folk, Akustikgitarre und warmes Klavier',
        type: 'cozy-rustic',
      },
    ],
  },
  {
    zh: '你农场最具代表性的一个场景是？',
    en: 'The most iconic scene on your farm:',
    q_zhTW: '你農場最具代表性的一個場景是？',
    q_ja: 'ファームで最も象徴的なシーンは？',
    q_ko: '농장에서 가장 상징적인 장면은?',
    q_de: 'Die ikonischste Szene auf deiner Farm:',
    options: [
      {
        zh: '野花丛里的蜜蜂，旁边是手工蜂蜡蜡烛',
        en: 'Bees among wildflowers beside a handmade beeswax candle',
        zhTW: '野花叢裡的蜜蜂，旁邊是手工蜂蠟蠟燭',
        ja: '野の花の間のミツバチと手作りの蜜蝋キャンドル',
        ko: '들꽃 사이의 꿀벌과 수제 밀랍 양초',
        de: 'Bienen zwischen Wildblumen neben einer Bienenwachskerze',
        type: 'cottagecore',
      },
      {
        zh: '雨中的蘑菇圈，乌鸦站在旧围栏上',
        en: 'A mushroom ring in the rain, a raven perched on an old fence',
        zhTW: '雨中的蘑菇圈，烏鴉站在舊圍欄上',
        ja: '雨の中のキノコの輪、古い柵の上のカラス',
        ko: '빗속의 버섯 링, 낡은 울타리 위의 까마귀',
        de: 'Ein Pilzring im Regen, ein Rabe auf einem alten Zaun',
        type: 'dark-moody',
      },
      {
        zh: '向日葵田里的彩虹，旁边是彩色小屋',
        en: 'A rainbow over a sunflower field beside a colorful cottage',
        zhTW: '向日葵田裡的彩虹，旁邊是彩色小屋',
        ja: 'ひまわり畑に虹、そばにカラフルなコテージ',
        ko: '해바라기 밭 위의 무지개, 옆에 알록달록한 오두막',
        de: 'Ein Regenbogen über einem Sonnenblumenfeld neben einem bunten Cottage',
        type: 'bright-cheerful',
      },
      {
        zh: '白鹅石子路，竹林，极简的木制农具',
        en: 'White pebble paths, bamboo grove, and minimal wooden tools',
        zhTW: '白鵝石子路，竹林，極簡的木製農具',
        ja: '白い玉砂利の道、竹林、シンプルな木の農具',
        ko: '흰 자갈길, 대나무 숲, 미니멀한 목제 농기구',
        de: 'Weißer Kiesweg, Bambushain und schlichte Holzwerkzeuge',
        type: 'zen-minimal',
      },
      {
        zh: '苹果树下的木桌，一壶热茶，秋日午后',
        en: 'A wooden table under apple trees with hot tea on an autumn afternoon',
        zhTW: '蘋果樹下的木桌，一壺熱茶，秋日午後',
        ja: 'リンゴの木の下の木製テーブル、温かいお茶、秋の午後',
        ko: '사과나무 아래 나무 탁자, 따뜻한 차 한 주전자, 가을 오후',
        de: 'Ein Holztisch unter Apfelbäumen mit heißem Tee an einem Herbstnachmittag',
        type: 'cozy-rustic',
      },
    ],
  },
]

interface Result {
  type: Aesthetic
  nameZh: string
  nameEn: string
  nameZhTW: string
  nameJa: string
  nameKo: string
  nameDe: string
  emoji: string
  taglineZh: string
  taglineEn: string
  taglineZhTW: string
  taglineJa: string
  taglineKo: string
  taglineDe: string
  descZh: string
  descEn: string
  descZhTW: string
  descJa: string
  descKo: string
  descDe: string
  gamesZh: string[]
  gamesEn: string[]
  gamesZhTW: string[]
  gamesJa: string[]
  gamesKo: string[]
  gamesDe: string[]
}

const RESULTS: Record<Aesthetic, Result> = {
  cottagecore: {
    type: 'cottagecore',
    nameZh: 'Cottagecore 田园梦',
    nameEn: 'Cottagecore',
    nameZhTW: 'Cottagecore 田園夢',
    nameJa: 'コテージコア 田園の夢',
    nameKo: '코티지코어 전원의 꿈',
    nameDe: 'Cottagecore',
    emoji: '🌸',
    taglineZh: '野花、蜂蜜与麻布的浪漫',
    taglineEn: 'Wildflowers, honey, and linen romance',
    taglineZhTW: '野花、蜂蜜與麻布的浪漫',
    taglineJa: '野の花、はちみつ、リネンのロマンス',
    taglineKo: '들꽃, 꿀, 그리고 린넨의 로맨스',
    taglineDe: 'Wildblumen, Honig und Leinen-Romantik',
    descZh:
      '你的农场是一首关于慢生活的诗。野花在石墙边自由生长，蜂蜜罐整整齐齐排在木架上，窗帘是手工刺绣的薄棉布。你不追求效率，你追求的是那种「一切都是自然长出来的」的美感——有点杂乱，有点旧，有点像祖母家的菜园，但每一个角落都充满生命力。',
    descEn:
      "Your farm is a poem about slow living. Wildflowers grow freely by stone walls, honey jars line wooden shelves, curtains are hand-embroidered thin cotton. You don't chase efficiency — you chase the feeling that everything grew naturally. A little wild, a little old, a little like grandmother's garden, but every corner is alive.",
    descZhTW:
      '你的農場是一首關於慢生活的詩。野花在石牆邊自由生長，蜂蜜罐整整齊齊排在木架上，窗簾是手工刺繡的薄棉布。你不追求效率，你追求的是那種「一切都是自然長出來的」的美感——有點雜亂，有點舊，有點像祖母家的菜園，但每一個角落都充滿生命力。',
    descJa:
      'あなたのファームはスローライフの詩。石壁のそばで野の花が自由に育ち、蜂蜜の瓶が木棚に並ぶ。効率は求めない——「すべてが自然に育った」ような美しさを求めている。少し雑然として、少し古くて、おばあちゃんの菜園みたいだけど、どの角にも生命力がある。',
    descKo:
      '당신의 농장은 느린 삶에 관한 시입니다. 돌담 옆에서 들꽃이 자유롭게 자라고, 꿀 병이 나무 선반에 가지런히 놓여 있습니다. 효율을 쫓지 않고, 「모든 것이 자연스럽게 자란」 느낌을 추구합니다. 조금 어수선하고, 조금 낡고, 할머니의 텃밭 같지만, 모든 구석에 생명력이 가득합니다.',
    descDe:
      'Deine Farm ist ein Gedicht über langsames Leben. Wildblumen wachsen frei an Steinmauern, Honiggläser reihen sich auf Holzregalen. Du jagst keiner Effizienz nach — du suchst das Gefühl, dass alles natürlich gewachsen ist. Ein bisschen wild, ein bisschen alt, wie Omas Gemüsegarten, aber jeder Winkel strotzt vor Lebendigkeit.',
    gamesZh: ['星露谷物语（植物季节换装）', 'Wylde Flowers', 'Cozy Grove', 'Garden Story'],
    gamesEn: ['Stardew Valley (seasonal decorating)', 'Wylde Flowers', 'Cozy Grove', 'Garden Story'],
    gamesZhTW: ['星露谷物語（植物季節換裝）', 'Wylde Flowers', 'Cozy Grove', 'Garden Story'],
    gamesJa: ['Stardew Valley（季節の装飾）', 'Wylde Flowers', 'Cozy Grove', 'Garden Story'],
    gamesKo: ['Stardew Valley (계절 데코)', 'Wylde Flowers', 'Cozy Grove', 'Garden Story'],
    gamesDe: ['Stardew Valley (Saisondekorationen)', 'Wylde Flowers', 'Cozy Grove', 'Garden Story'],
  },
  'dark-moody': {
    type: 'dark-moody',
    nameZh: 'Dark & Moody 暗调农场',
    nameEn: 'Dark & Moody',
    nameZhTW: 'Dark & Moody 暗調農場',
    nameJa: 'ダーク＆ムーディー',
    nameKo: '다크 & 무디 농장',
    nameDe: 'Dark & Moody',
    emoji: '🌑',
    taglineZh: '雾气、蘑菇与神秘的美',
    taglineEn: 'Mist, mushrooms, and mysterious beauty',
    taglineZhTW: '霧氣、蘑菇與神秘的美',
    taglineJa: '霧、きのこ、神秘的な美しさ',
    taglineKo: '안개, 버섯, 그리고 신비로운 아름다움',
    taglineDe: 'Nebel, Pilze und mysteriöse Schönheit',
    descZh:
      '你的农场有一种别人进不去的氛围。暗色的石头小径，乌鸦停在旧木桩上，雨后的蘑菇圈，提灯而不是探照灯。你不喜欢过于明亮或过于「可爱」的东西，你喜欢那种让人觉得「这里有故事」的感觉。你的农场是哥特式的，但也是治愈的——是那种让你一个人坐在角落里喝茶、觉得全世界都静下来了的地方。',
    descEn:
      "Your farm has an atmosphere others can't quite enter. Dark stone paths, a raven on an old post, mushroom circles after rain, lanterns instead of floodlights. You dislike things that are too bright or too cute. You like that feeling of 'there's a story here.' Your farm is gothic but also healing — the kind of place where you sit alone with tea and feel the whole world grow quiet.",
    descZhTW:
      '你的農場有一種別人進不去的氛圍。暗色的石頭小徑，烏鴉停在舊木樁上，雨後的蘑菇圈，提燈而不是探照燈。你不喜歡過於明亮或過於「可愛」的東西，你喜歡那種讓人覺得「這裡有故事」的感覺。你的農場是哥德式的，但也是治癒的——讓你一個人坐在角落裡喝茶、覺得全世界都靜下來了的地方。',
    descJa:
      'あなたのファームは他者を寄せ付けない雰囲気がある。暗い石の小道、古い杭の上のカラス、雨上がりのキノコの輪、サーチライトではなくランタン。明るすぎるもの、かわいすぎるものは好きじゃない。「ここには物語がある」という感覚が好き。ゴシックだけど癒される、一人でお茶を飲みながら世界が静まる場所。',
    descKo:
      '당신의 농장에는 다른 사람이 들어올 수 없는 분위기가 있습니다. 어두운 돌 길, 낡은 말뚝 위의 까마귀, 비 온 후의 버섯 링, 탐조등이 아닌 등불. 너무 밝거나 너무 귀여운 것은 싫습니다. 「여기엔 이야기가 있다」는 느낌이 좋습니다. 고딕풍이지만 치유적인, 혼자 차를 마시며 세상이 조용해지는 곳.',
    descDe:
      'Deine Farm hat eine Atmosphäre, in die andere nicht so leicht eintreten. Dunkle Steinwege, ein Rabe auf einem alten Pfahl, Pilzringe nach dem Regen, Laternen statt Flutlichter. Du magst nichts zu Helles oder zu Niedliches. Du magst das Gefühl: „Hier steckt eine Geschichte dahinter." Gothic aber heilend — wo du allein Tee trinkst und die Welt verstummt.',
    gamesZh: ['星露谷物语（矿洞季节、万圣节主题）', 'Palia（夜间版本）', 'Spiritfarer', 'Stardew Gothic 主题包'],
    gamesEn: ['Stardew Valley (mine season, Halloween)', 'Spiritfarer', 'Palia (night mode)', 'Salt and Sanctuary Farm mods'],
    gamesZhTW: ['星露谷物語（礦洞季節、萬聖節）', 'Palia（夜間版本）', 'Spiritfarer', 'Stardew Gothic 主題包'],
    gamesJa: ['Stardew Valley（鉱山シーズン・ハロウィン）', 'Spiritfarer', 'Palia（ナイトモード）', 'ゴシック農場Mod'],
    gamesKo: ['Stardew Valley (광산 시즌, 할로윈)', 'Spiritfarer', 'Palia (야간 모드)', '고딕 농장 Mod'],
    gamesDe: ['Stardew Valley (Minen-Saison, Halloween)', 'Spiritfarer', 'Palia (Nachtmodus)', 'Gothic-Farm-Mods'],
  },
  'bright-cheerful': {
    type: 'bright-cheerful',
    nameZh: 'Bright & Cheerful 彩虹农场',
    nameEn: 'Bright & Cheerful',
    nameZhTW: 'Bright & Cheerful 彩虹農場',
    nameJa: 'ブライト＆チアフル レインボーファーム',
    nameKo: '밝고 명랑한 레인보우 농장',
    nameDe: 'Bright & Cheerful',
    emoji: '🌈',
    taglineZh: '色彩、友谊与永恒的阳光',
    taglineEn: 'Color, friendship, and eternal sunshine',
    taglineZhTW: '色彩、友誼與永恆的陽光',
    taglineJa: 'カラー、友情、永遠の太陽',
    taglineKo: '색깔, 우정, 영원한 햇살',
    taglineDe: 'Farben, Freundschaft und ewiger Sonnenschein',
    descZh:
      '你的农场是世界上最快乐的地方。向日葵和三色堇争着开放，彩色的小屋前挂着风铃，友好的 NPC 们随时来串门。你不喜欢「沉重」的东西，你的农场就是为了让每次打开都能会心一笑而存在的。配色大胆、热闹、充满活力——就像永远是春天最好的那一天。',
    descEn:
      "Your farm is the happiest place in the world. Sunflowers and pansies compete to bloom, colorful cottages have wind chimes at the door, and friendly NPCs drop by anytime. You don't like heavy things. Your farm exists to make you smile every time you open it. Bold colors, lively, full of energy — like the best spring day, every day.",
    descZhTW:
      '你的農場是世界上最快樂的地方。向日葵和三色堇爭著開放，彩色的小屋前掛著風鈴，友好的 NPC 們隨時來串門。你不喜歡「沉重」的東西，你的農場就是為了讓每次打開都能會心一笑而存在的。配色大膽、熱鬧、充滿活力——就像永遠是春天最好的那一天。',
    descJa:
      'あなたのファームは世界一楽しい場所。ひまわりとパンジーが競って咲き、カラフルなコテージに風鈴が揺れ、フレンドリーなNPCがいつでも訪ねてくる。重たいものは苦手。農場は開くたびに笑顔になれる場所。大胆な色づかい、賑やか、エネルギッシュ——いつだって春の最高の日みたい。',
    descKo:
      '당신의 농장은 세상에서 가장 행복한 곳입니다. 해바라기와 팬지가 다투어 피고, 알록달록한 오두막 앞에는 풍경이 걸려 있고, 친절한 NPC들이 언제든지 놀러 옵니다. 무거운 것은 싫습니다. 농장은 열 때마다 미소 짓게 만들기 위해 존재합니다. 대담한 색감, 활기차고, 에너지 넘치는——영원히 봄의 가장 좋은 날 같습니다.',
    descDe:
      'Deine Farm ist der glücklichste Ort der Welt. Sonnenblumen und Stiefmütterchen blühen um die Wette, bunte Häuschen haben Windspiele an der Tür, freundliche NPCs kommen jederzeit vorbei. Du magst keine schweren Sachen. Deine Farm existiert, um dich bei jedem Öffnen zum Lächeln zu bringen. Mutige Farben, lebhaft, voller Energie — wie der schönste Frühlingstag, jeden Tag.',
    gamesZh: ['动物森友会', 'Coral Island', 'Stardew Valley（春夏布置）', 'Harvestella'],
    gamesEn: ['Animal Crossing: New Horizons', 'Coral Island', 'Stardew Valley (spring/summer builds)', 'Harvestella'],
    gamesZhTW: ['動物森友會', 'Coral Island', '星露谷物語（春夏佈置）', 'Harvestella'],
    gamesJa: ['あつまれ どうぶつの森', 'Coral Island', 'Stardew Valley（春夏デコ）', 'Harvestella'],
    gamesKo: ['모여봐요 동물의 숲', 'Coral Island', 'Stardew Valley (봄/여름 배치)', 'Harvestella'],
    gamesDe: ['Animal Crossing: New Horizons', 'Coral Island', 'Stardew Valley (Frühling/Sommer)', 'Harvestella'],
  },
  'zen-minimal': {
    type: 'zen-minimal',
    nameZh: '禅意极简 Wabi-Sabi',
    nameEn: 'Zen Minimal',
    nameZhTW: '禪意極簡 Wabi-Sabi',
    nameJa: '禅ミニマル Wabi-Sabi',
    nameKo: '선 미니멀 Wabi-Sabi',
    nameDe: 'Zen Minimal',
    emoji: '🎋',
    taglineZh: '留白、简洁与内心平静',
    taglineEn: 'Negative space, simplicity, and inner stillness',
    taglineZhTW: '留白、簡潔與內心平靜',
    taglineJa: '余白、シンプル、内なる静けさ',
    taglineKo: '여백, 단순함, 그리고 내면의 고요',
    taglineDe: 'Negative Space, Schlichtheit und innere Ruhe',
    descZh:
      '你的农场是少的艺术。一条白鹅石径，几株精心选择的竹子，空气是干净的，留白是有意为之的。你不需要热闹，不需要收藏，你需要的是那种「一切各归其位」的感觉。你的农场让人平静，不是因为什么都没有，而是因为每一件东西都恰好在它应该在的地方。',
    descEn:
      "Your farm is the art of less. A white pebble path, a few carefully chosen bamboo plants, clean air, and deliberate negative space. You don't need bustle or collection — you need everything in its right place. Your farm brings calm not because it's empty, but because every element is exactly where it should be.",
    descZhTW:
      '你的農場是少的藝術。一條白鵝石徑，幾株精心選擇的竹子，空氣是乾淨的，留白是有意為之的。你不需要熱鬧，不需要收藏，你需要的是那種「一切各歸其位」的感覺。你的農場讓人平靜，不是因為什麼都沒有，而是因為每一件東西都恰好在它應該在的地方。',
    descJa:
      'あなたのファームは「引き算」の芸術。白い玉砂利の道、厳選した竹、澄んだ空気、意図的な余白。にぎやかさもコレクションも必要ない。「すべてが正しい場所にある」感覚だけあればいい。農場が静かなのは何もないからじゃない——すべての要素がちょうどあるべき場所にあるから。',
    descKo:
      '당신의 농장은 덜어냄의 예술입니다. 흰 자갈길, 신중하게 선택한 대나무 몇 그루, 맑은 공기, 의도적인 여백. 번잡함도 수집도 필요하지 않습니다. 「모든 것이 제자리에 있다」는 느낌만 있으면 됩니다. 농장이 평온한 것은 아무것도 없어서가 아니라, 모든 요소가 정확히 있어야 할 곳에 있기 때문입니다.',
    descDe:
      'Deine Farm ist die Kunst des Weglassens. Ein weißer Kiesweg, ein paar sorgfältig gewählte Bambusse, saubere Luft und bewusste Leerräume. Du brauchst keinen Trubel, keine Sammlung — nur das Gefühl, dass alles an seinem richtigen Platz ist. Die Farm bringt Ruhe nicht weil sie leer ist, sondern weil jedes Element genau dort steht, wo es hingehört.',
    gamesZh: ['星露谷物语（日式布置 Mod）', 'Sakuna: Of Rice and Ruin', 'Nour', '天穗之咲稻姬'],
    gamesEn: ['Stardew Valley (Japanese layout mods)', 'Sakuna: Of Rice and Ruin', 'Nour', 'Wabi-Sabi farm builds'],
    gamesZhTW: ['星露谷物語（日式佈置 Mod）', 'Sakuna: Of Rice and Ruin', 'Nour', '天穗之咲稻姬'],
    gamesJa: ['Stardew Valley（和風レイアウトMod）', 'Sakuna: Of Rice and Ruin', 'Nour', '天穂のサクナヒメ'],
    gamesKo: ['Stardew Valley (일본풍 배치 Mod)', 'Sakuna: Of Rice and Ruin', 'Nour', '천수의 사쿠나히메'],
    gamesDe: ['Stardew Valley (japanische Layout-Mods)', 'Sakuna: Of Rice and Ruin', 'Nour', 'Wabi-Sabi-Farm-Builds'],
  },
  'cozy-rustic': {
    type: 'cozy-rustic',
    nameZh: 'Cozy Rustic 秋日暖农',
    nameEn: 'Cozy Rustic',
    nameZhTW: 'Cozy Rustic 秋日暖農',
    nameJa: 'コージー・ラスティック 秋の温かみ',
    nameKo: '코지 러스틱 가을 농장',
    nameDe: 'Cozy Rustic',
    emoji: '🍂',
    taglineZh: '柴火、苹果派与秋日的温度',
    taglineEn: 'Woodsmoke, apple pie, and autumn warmth',
    taglineZhTW: '柴火、蘋果派與秋日的溫度',
    taglineJa: '薪の香り、アップルパイ、秋の温もり',
    taglineKo: '장작불, 애플 파이, 그리고 가을의 온기',
    taglineDe: 'Holzrauch, Apfelkuchen und Herbstwärme',
    descZh:
      '你的农场是全世界最温暖的地方。粗糙的木头家具，亲手腌制的果酱，满树的苹果等待采摘，壁炉的烟从烟囱飘出去。你的审美不是精致的——它是真实的、有温度的、有生活气息的。来到你的农场，就像来到一个「这里没有表演，只有真实」的地方。',
    descEn:
      "Your farm is the warmest place on earth. Rough wooden furniture, handmade preserves, apple trees waiting to be picked, wood smoke rising from the chimney. Your aesthetic isn't polished — it's real, warm, and lived-in. Coming to your farm feels like arriving somewhere that says: no performance here, just life.",
    descZhTW:
      '你的農場是全世界最溫暖的地方。粗糙的木頭家具，親手醃製的果醬，滿樹的蘋果等待採摘，壁爐的煙從煙囪飄出去。你的審美不是精緻的——它是真實的、有溫度的、有生活氣息的。來到你的農場，就像來到一個「這裡沒有表演，只有真實」的地方。',
    descJa:
      'あなたのファームは世界一温かい場所。ざっくりした木の家具、手作りのジャム、収穫を待つリンゴの木、煙突から流れる薪の煙。美学は洗練じゃない——リアルで、温もりがあって、生活感がある。あなたのファームに来ると、「ここに演技はない、生活だけがある」という気持ちになる。',
    descKo:
      '당신의 농장은 세상에서 가장 따뜻한 곳입니다. 거친 목재 가구, 직접 만든 잼, 수확을 기다리는 사과나무, 굴뚝에서 피어오르는 장작 연기. 당신의 미학은 세련되지 않습니다——진실하고, 따뜻하고, 생활감이 넘칩니다. 당신의 농장에 오면, 「여기엔 연기가 없다, 진짜 삶만 있다」는 느낌이 옵니다.',
    descDe:
      'Deine Farm ist der wärmste Ort der Welt. Raues Holzmöbel, selbstgemachte Marmelade, Apfelbäume die auf die Ernte warten, Holzrauch aus dem Kamin. Deine Ästhetik ist nicht poliert — sie ist echt, warm und gelebt. Auf deiner Farm anzukommen fühlt sich an wie: Hier gibt es keine Show, nur echtes Leben.',
    gamesZh: ['星露谷物语（秋冬季节）', 'Hay Day', 'My Time at Portia', 'Farming Simulator（农庄建设）'],
    gamesEn: ['Stardew Valley (fall/winter builds)', 'Hay Day', 'My Time at Portia', 'Farming Simulator (homestead mode)'],
    gamesZhTW: ['星露谷物語（秋冬季節）', 'Hay Day', 'My Time at Portia', 'Farming Simulator（農莊建設）'],
    gamesJa: ['Stardew Valley（秋冬シーズン）', 'Hay Day', 'My Time at Portia', 'Farming Simulator（農場建設）'],
    gamesKo: ['Stardew Valley (가을/겨울 배치)', 'Hay Day', 'My Time at Portia', 'Farming Simulator (홈스테드 모드)'],
    gamesDe: ['Stardew Valley (Herbst/Winter-Builds)', 'Hay Day', 'My Time at Portia', 'Farming Simulator (Gehöftmodus)'],
  },
}

function calcResult(answers: Aesthetic[]): Aesthetic {
  const counts: Record<Aesthetic, number> = {
    cottagecore: 0,
    'dark-moody': 0,
    'bright-cheerful': 0,
    'zen-minimal': 0,
    'cozy-rustic': 0,
  }
  answers.forEach((a) => counts[a]++)
  return (Object.keys(counts) as Aesthetic[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b))
}

interface ShareButtonProps {
  aestheticName: string
  locale: string
}

function ShareButton({ aestheticName, locale }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const url = `https://www.farmgamehub.com/${locale}/quizzes/farm-aesthetic`

  let shareText: string
  if (locale === 'zh') {
    shareText = `我的农场美学是「${aestheticName}」！来测测你的农场风格：${url}`
  } else if (locale === 'zh-TW') {
    shareText = `我的農場美學是「${aestheticName}」！來測測你的農場風格：${url}`
  } else if (locale === 'ja') {
    shareText = `私のファーム美学は「${aestheticName}」です！あなたのスタイルを診断しよう：${url}`
  } else if (locale === 'ko') {
    shareText = `내 농장 미학은 「${aestheticName}」입니다! 당신의 스타일을 알아보세요：${url}`
  } else if (locale === 'de') {
    shareText = `Meine Farm-Ästhetik ist „${aestheticName}"! Finde deinen Stil heraus: ${url}`
  } else {
    shareText = `My farm aesthetic is "${aestheticName}"! Find yours: ${url}`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank')
    }
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`

  const copyLabel = copied
    ? { zh: '✓ 已复制！', 'zh-TW': '✓ 已複製！', ja: '✓ コピーしました！', ko: '✓ 복사됨!', de: '✓ Kopiert!', en: '✓ Copied!' }[locale] ?? '✓ Copied!'
    : { zh: '📋 复制结果', 'zh-TW': '📋 複製結果', ja: '📋 結果をコピー', ko: '📋 결과 복사', de: '📋 Ergebnis kopieren', en: '📋 Copy result' }[locale] ?? '📋 Copy result'

  const shareLabel =
    { zh: '分享到 X', 'zh-TW': '分享到 X', ja: 'Xでシェア', ko: 'X에 공유', de: 'Auf X teilen', en: 'Share on X' }[locale] ?? 'Share on X'

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 rounded-lg border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copyLabel}
      </button>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-lg border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]"
      >
        𝕏 {shareLabel}
      </a>
    </div>
  )
}

interface Props {
  locale: string
}

export function FarmAestheticQuiz({ locale }: Props) {
  const [step, setStep] = useState<number>(0)
  const [answers, setAnswers] = useState<Aesthetic[]>([])

  function getLoc<T>(vals: { zh: T; zhTW: T; ja: T; ko: T; de: T; en: T }): T {
    switch (locale) {
      case 'zh': return vals.zh
      case 'zh-TW': return vals.zhTW
      case 'ja': return vals.ja
      case 'ko': return vals.ko
      case 'de': return vals.de
      default: return vals.en
    }
  }

  const handleAnswer = (type: Aesthetic) => {
    const next = [...answers, type]
    setAnswers(next)
    if (next.length === QUESTIONS.length) {
      setStep(QUESTIONS.length + 1)
    } else {
      setStep(step + 1)
    }
  }

  const reset = () => {
    setAnswers([])
    setStep(0)
  }

  // Intro
  if (step === 0) {
    return (
      <div className="text-center">
        <div className="mb-6 text-6xl">🌿</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {getLoc({
            zh: '你的农场美学是什么风格？',
            zhTW: '你的農場美學是什麼風格？',
            ja: 'あなたのファーム美学は？',
            ko: '당신의 농장 미학은 무엇인가요?',
            de: 'Was ist deine Farm-Ästhetik?',
            en: "What's Your Farm Aesthetic?",
          })}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {getLoc({
            zh: '6 个关于美感的问题，测出你的农场灵魂属于哪种美学——Cottagecore、暗调、彩虹、极简还是 Cozy Rustic？',
            zhTW: '6 個關於美感的問題，測出你的農場靈魂屬於哪種美學——Cottagecore、暗調、彩虹、極簡還是 Cozy Rustic？',
            ja: '6つの感性に関する質問で、あなたのファーム美学を診断——コテージコア、ダーク、ブライト、禅ミニマル、コージー・ラスティック？',
            ko: '감성에 관한 6가지 질문으로 농장 미학 찾기——코티지코어, 다크 무디, 밝고 명랑, 선 미니멀, 코지 러스틱?',
            de: '6 Fragen zu deinen Vorlieben — finde deine Farm-Ästhetik: Cottagecore, Dark Moody, Bright Cheerful, Zen Minimal oder Cozy Rustic?',
            en: '6 questions about your sensibilities to find your farm aesthetic — Cottagecore, Dark Moody, Bright Cheerful, Zen Minimal, or Cozy Rustic?',
          })}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {getLoc({
            zh: '结果适合截图，发给审美相近的朋友看 →',
            zhTW: '結果適合截圖，發給審美相近的朋友看 →',
            ja: '結果をスクショして美学が近い友達に送ろう →',
            ko: '결과를 캡처해서 취향이 비슷한 친구에게 보내세요 →',
            de: 'Teile dein Ergebnis mit Freunden und vergleicht eure Ästhetik →',
            en: 'Share your result with friends to compare aesthetics →',
          })}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {getLoc({
            zh: '测出我的美学 →',
            zhTW: '測出我的美學 →',
            ja: '私の美学を診断 →',
            ko: '내 미학 찾기 →',
            de: 'Meine Ästhetik finden →',
            en: 'Find My Aesthetic →',
          })}
        </button>
      </div>
    )
  }

  // Result
  if (step === QUESTIONS.length + 1) {
    const aesthetic = calcResult(answers)
    const result = RESULTS[aesthetic]
    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {getLoc({
              zh: '你的农场美学是',
              zhTW: '你的農場美學是',
              ja: 'あなたのファーム美学は',
              ko: '당신의 농장 미학은',
              de: 'Deine Farm-Ästhetik ist:',
              en: 'Your farm aesthetic is:',
            })}
          </p>
          <h2 className="text-3xl font-bold text-[#f0a832]">
            {getLoc({ zh: result.nameZh, zhTW: result.nameZhTW, ja: result.nameJa, ko: result.nameKo, de: result.nameDe, en: result.nameEn })}
          </h2>
          <p className="mt-1 text-sm text-[#8a9a7a]">
            {getLoc({ zh: result.taglineZh, zhTW: result.taglineZhTW, ja: result.taglineJa, ko: result.taglineKo, de: result.taglineDe, en: result.taglineEn })}
          </p>
        </div>

        {/* Description */}
        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-5">
          <p className="leading-relaxed text-[#e8dcc8]">
            {getLoc({ zh: result.descZh, zhTW: result.descZhTW, ja: result.descJa, ko: result.descKo, de: result.descDe, en: result.descEn })}
          </p>
        </div>

        {/* Games */}
        <div className="mb-5">
          <p className="mb-2 text-xs font-semibold text-[#8a9a7a]">
            {getLoc({
              zh: '适合你美学的游戏',
              zhTW: '適合你美學的遊戲',
              ja: 'あなたの美学に合うゲーム',
              ko: '당신의 미학에 맞는 게임',
              de: 'Spiele, die zu deiner Ästhetik passen',
              en: 'Games that match your aesthetic',
            })}
          </p>
          <div className="flex flex-wrap gap-2">
            {getLoc({ zh: result.gamesZh, zhTW: result.gamesZhTW, ja: result.gamesJa, ko: result.gamesKo, de: result.gamesDe, en: result.gamesEn }).map((g) => (
              <span key={g} className="rounded-full border border-[#2d5a27] px-3 py-1 text-sm text-[#e8dcc8]">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mb-6">
          <p className="mb-3 text-sm text-[#8a9a7a]">
            {getLoc({
              zh: '看看朋友的农场美学 →',
              zhTW: '看看朋友的農場美學 →',
              ja: '友達のファーム美学もチェック →',
              ko: '친구의 농장 미학도 알아보세요 →',
              de: 'Schau, welche Ästhetik deine Freunde haben →',
              en: 'See what aesthetic your friends are →',
            })}
          </p>
          <ShareButton
            aestheticName={getLoc({ zh: result.nameZh, zhTW: result.nameZhTW, ja: result.nameJa, ko: result.nameKo, de: result.nameDe, en: result.nameEn })}
            locale={locale}
          />
        </div>

        <div className="text-center">
          <button
            onClick={reset}
            className="text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc({
              zh: '重新测试',
              zhTW: '重新測試',
              ja: 'もう一度やり直す',
              ko: '다시 테스트',
              de: 'Quiz wiederholen',
              en: 'Retake quiz',
            })}
          </button>
        </div>
      </div>
    )
  }

  // Question
  const qIndex = step - 1
  const q = QUESTIONS[qIndex]
  const progress = (qIndex / QUESTIONS.length) * 100

  const progressLabel = (() => {
    switch (locale) {
      case 'zh': return `问题 ${step} / ${QUESTIONS.length}`
      case 'zh-TW': return `問題 ${step} / ${QUESTIONS.length}`
      case 'ja': return `質問 ${step} / ${QUESTIONS.length}`
      case 'ko': return `질문 ${step} / ${QUESTIONS.length}`
      case 'de': return `Frage ${step} von ${QUESTIONS.length}`
      default: return `Question ${step} of ${QUESTIONS.length}`
    }
  })()

  return (
    <div>
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[#8a9a7a]">
          <span>{progressLabel}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[#2d3d2d]">
          <div
            className="h-1.5 rounded-full bg-[#f0a832] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="mb-6 text-xl font-semibold text-[#e8dcc8]">
        {getLoc({ zh: q.zh, zhTW: q.q_zhTW, ja: q.q_ja, ko: q.q_ko, de: q.q_de, en: q.en })}
      </h2>

      <div className="space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt.type}
            onClick={() => handleAnswer(opt.type)}
            className="w-full rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-5 py-4 text-left text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
          >
            {getLoc({ zh: opt.zh, zhTW: opt.zhTW, ja: opt.ja, ko: opt.ko, de: opt.de, en: opt.en })}
          </button>
        ))}
      </div>

      {step > 1 && (
        <button
          onClick={() => {
            setAnswers(answers.slice(0, -1))
            setStep(step - 1)
          }}
          className="mt-4 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
        >
          ← {getLoc({ zh: '上一题', zhTW: '上一題', ja: '前の質問', ko: '이전', de: 'Zurück', en: 'Previous' })}
        </button>
      )}
    </div>
  )
}
