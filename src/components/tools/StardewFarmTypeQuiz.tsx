'use client'

import { useState } from 'react'
import Link from 'next/link'

type FarmType = 'standard' | 'forest' | 'riverland' | 'hill-top' | 'beach'

interface Option {
  zh: string
  en: string
  zhTW: string
  ja: string
  ko: string
  de: string
  type: FarmType
}

interface Question {
  q_zh: string
  q_en: string
  q_zhTW: string
  q_ja: string
  q_ko: string
  q_de: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    q_zh: '你在农场游戏里最主要的目标是什么？',
    q_en: 'What is your main goal in a farming game?',
    q_zhTW: '你在農場遊戲裡最主要的目標是什麼？',
    q_ja: '農場ゲームで一番やりたいことは何ですか？',
    q_ko: '농장 게임에서 당신의 주요 목표는 무엇인가요?',
    q_de: 'Was ist dein Hauptziel in einem Farming-Spiel?',
    options: [
      {
        zh: '最大化作物产量，赚到最多的钱',
        en: 'Maximize crop output and earn as much gold as possible',
        zhTW: '最大化作物產量，賺到最多的錢',
        ja: '作物の収穫を最大化して、できるだけ多くのゴールドを稼ぐ',
        ko: '작물 생산량을 최대화해서 최대한 많은 돈을 버는 것',
        de: 'Ernte maximieren und so viel Gold wie möglich verdienen',
        type: 'standard',
      },
      {
        zh: '自给自足，采集自然资源，过可持续的生活',
        en: 'Live sustainably, forage, and gather natural resources',
        zhTW: '自給自足，採集自然資源，過可持續的生活',
        ja: '自給自足で、採集しながら自然の中でのんびり暮らす',
        ko: '자급자족하며 자연 자원을 채집하며 지속 가능한 생활을 하는 것',
        de: 'Nachhaltig leben, sammeln und natürliche Ressourcen nutzen',
        type: 'forest',
      },
      {
        zh: '钓鱼和做手工艺品，享受水边的慢生活',
        en: 'Fish all day and craft artisan goods by the water',
        zhTW: '釣魚和做手工藝品，享受水邊的慢生活',
        ja: '一日中釣りをして、川沿いでアーティサン品を作る',
        ko: '낚시를 하고 수제품을 만들며 물가의 느린 생활을 즐기는 것',
        de: 'Den ganzen Tag angeln und am Wasser Handwerksprodukte herstellen',
        type: 'riverland',
      },
      {
        zh: '挖矿、收集矿石和宝石，探索地下世界',
        en: 'Mine deep, collect gems, and explore the underground',
        zhTW: '挖礦、收集礦石和寶石，探索地下世界',
        ja: '採掘して、鉱石や宝石を集めて地下世界を探索する',
        ko: '광물을 캐고 보석을 모으며 지하 세계를 탐험하는 것',
        de: 'Tief graben, Edelsteine sammeln und die Unterwelt erkunden',
        type: 'hill-top',
      },
      {
        zh: '打造最美丽、最独特的沿海农场风格',
        en: 'Build the most beautiful, unique coastal farm',
        zhTW: '打造最美麗、最獨特的沿海農場風格',
        ja: '世界で一番美しく個性的な海辺の農場を作る',
        ko: '가장 아름답고 독특한 해안 농장을 만드는 것',
        de: 'Die schönste und einzigartigste Küstenfarm bauen',
        type: 'beach',
      },
    ],
  },
  {
    q_zh: '你理想的星露谷早晨是怎样的？',
    q_en: 'Your ideal morning in Stardew Valley:',
    q_zhTW: '你理想的星露谷早晨是怎樣的？',
    q_ja: 'スターデューバレーの理想の朝は？',
    q_ko: '스타듀 밸리에서 이상적인 아침은?',
    q_de: 'Dein idealer Morgen in Stardew Valley:',
    options: [
      {
        zh: '给所有作物浇完水，然后高效地采收出货',
        en: 'Water every crop and efficiently harvest everything for shipment',
        zhTW: '給所有作物澆完水，然後高效地採收出貨',
        ja: '全部の作物に水やりして、効率よく収穫して出荷する',
        ko: '모든 작물에 물을 주고 효율적으로 수확해서 출하하는 것',
        de: 'Alle Pflanzen gießen und effizient alles ernten und versenden',
        type: 'standard',
      },
      {
        zh: '在树林里散步，收集橡树树脂和硬木',
        en: 'Walk through the trees, collecting oak resin and hardwood',
        zhTW: '在樹林裡散步，收集橡樹樹脂和硬木',
        ja: '木々の中を散歩して、オーク樹液とハードウッドを集める',
        ko: '나무 사이를 산책하며 오크 수지와 단단한 나무를 모으는 것',
        de: 'Durch die Bäume spazieren und Harz und Hartholz sammeln',
        type: 'forest',
      },
      {
        zh: '天还没亮就去河边钓鱼，一个人安静地守杆',
        en: 'Cast a line in the river before anyone else wakes up',
        zhTW: '天還沒亮就去河邊釣魚，一個人安靜地守竿',
        ja: '他の人が起きる前に川に釣り竿を垂らして、静かに釣りをする',
        ko: '아무도 일어나기 전에 강가에서 혼자 조용히 낚시하는 것',
        de: 'Vor allen anderen aufstehen und die Angel in den Fluss werfen',
        type: 'riverland',
      },
      {
        zh: '直奔采石场，看今天能挖到什么稀有矿石',
        en: 'Head straight to the quarry to see what minerals appear today',
        zhTW: '直奔採石場，看今天能挖到什麼稀有礦石',
        ja: '採石場に直行して、今日はどんな鉱石が出るか確認する',
        ko: '채석장으로 바로 달려가 오늘은 어떤 광물이 나왔는지 확인하는 것',
        de: 'Direkt zum Steinbruch gehen und sehen, welche Mineralien heute spawnen',
        type: 'hill-top',
      },
      {
        zh: '沿着海滩走，捡拾退潮留下的贝壳和海草',
        en: 'Walk the beach looking for shells and kelp left by the tide',
        zhTW: '沿著海灘走，撿拾退潮留下的貝殼和海草',
        ja: '砂浜を歩いて、潮が引いた後の貝殻や海藻を拾い集める',
        ko: '해변을 걸으며 썰물이 남긴 조개껍데기와 해초를 줍는 것',
        de: 'Den Strand entlanggehen und Muscheln und Tang suchen, die die Flut hinterlassen hat',
        type: 'beach',
      },
    ],
  },
  {
    q_zh: '面对农场布局，你最看重什么？',
    q_en: 'When it comes to farm layout, what matters most to you?',
    q_zhTW: '面對農場布局，你最看重什麼？',
    q_ja: '農場のレイアウトで一番大事なのは？',
    q_ko: '농장 레이아웃에서 가장 중요한 것은?',
    q_de: 'Was ist dir bei deinem Hof-Layout am wichtigsten?',
    options: [
      {
        zh: '大片开阔的可耕地，什么都能种',
        en: 'Wide open farmable land — room for everything',
        zhTW: '大片開闊的可耕地，什麼都能種',
        ja: '広い耕作地——何でも植えられるスペースがある',
        ko: '넓은 경작지 — 무엇이든 심을 수 있는 공간',
        de: 'Viel freies Ackerland — Platz für alles',
        type: 'standard',
      },
      {
        zh: '有树木围绕的边缘，感觉像在森林里',
        en: 'Wooded edges that make the farm feel like it is in a forest',
        zhTW: '有樹木圍繞的邊緣，感覺像在森林裡',
        ja: '木々に囲まれた縁で、森の中にいるような感覚',
        ko: '나무로 둘러싸인 가장자리 — 숲 속에 있는 느낌',
        de: 'Bewaldete Ränder, die die Farm wie mitten im Wald wirken lassen',
        type: 'forest',
      },
      {
        zh: '大量水域，哪怕种地空间少一点也值得',
        en: 'Lots of water tiles, even if it means less planting space',
        zhTW: '大量水域，哪怕種地空間少一點也值得',
        ja: '水のタイルがたくさん——農地が減っても全然OK',
        ko: '물 타일이 많은 것 — 경작지가 줄어도 상관없어',
        de: 'Viele Wasserflächen, auch wenn dadurch weniger Ackerfläche bleibt',
        type: 'riverland',
      },
      {
        zh: '有独特地形，比如高地、峡谷、采石区',
        en: 'Unique terrain — elevated sections, cliffs, a quarry area',
        zhTW: '有獨特地形，比如高地、峽谷、採石區',
        ja: '起伏のある個性的な地形——高台、崖、採石場エリア',
        ko: '독특한 지형 — 고지대, 절벽, 채석장 구역',
        de: 'Einzigartiges Gelände — Erhöhungen, Klippen, ein Steinbruchbereich',
        type: 'hill-top',
      },
      {
        zh: '沙滩地面和潮汐池，哪怕不能用化肥',
        en: 'Sandy beach tiles and tide pools, even without fertilizer use',
        zhTW: '沙灘地面和潮汐池，哪怕不能用化肥',
        ja: '砂浜と潮だまり——肥料が使えなくてもいい',
        ko: '모래사장과 조수웅덩이 — 비료를 못 써도 괜찮아',
        de: 'Sandige Strandkacheln und Gezeitentümpel, auch ohne Düngernutzung',
        type: 'beach',
      },
    ],
  },
  {
    q_zh: '游戏里你最享受哪种活动？',
    q_en: 'Which activity do you enjoy most?',
    q_zhTW: '遊戲裡你最享受哪種活動？',
    q_ja: 'ゲームで一番楽しい活動は？',
    q_ko: '게임에서 가장 즐기는 활동은?',
    q_de: 'Welche Aktivität macht dir im Spiel am meisten Spaß?',
    options: [
      {
        zh: '优化生产线，让每一分钟都不浪费',
        en: 'Optimizing production to make every second count',
        zhTW: '優化生產線，讓每一分鐘都不浪費',
        ja: '生産ラインを最適化して、1分も無駄にしない',
        ko: '생산 라인을 최적화해서 단 1분도 낭비하지 않는 것',
        de: 'Die Produktion optimieren, damit jede Sekunde zählt',
        type: 'standard',
      },
      {
        zh: '制作、打造、砍树——自给自足的满足感',
        en: 'Crafting, building, and chopping — self-sufficiency feels great',
        zhTW: '製作、打造、砍樹——自給自足的滿足感',
        ja: 'クラフト、建築、木こり——自給自足の達成感がたまらない',
        ko: '제작하고 건축하고 나무를 베는 것 — 자급자족의 만족감',
        de: 'Crafting, Bauen und Holzhacken — Selbstversorgung fühlt sich großartig an',
        type: 'forest',
      },
      {
        zh: '完成社区中心的鱼塘捆包，做成高价工艺品',
        en: 'Completing fish bundles and turning catches into artisan goods',
        zhTW: '完成社區中心的魚塘捆包，做成高價工藝品',
        ja: 'コミュニティセンターの魚バンドルを完成させて、釣った魚を高級品に加工する',
        ko: '커뮤니티 센터 어류 번들을 완성하고 잡은 물고기를 수제품으로 만드는 것',
        de: 'Fischbündel abschließen und Fänge in Handwerksprodukte verwandeln',
        type: 'riverland',
      },
      {
        zh: '打开矿石袋，看里面是什么宝石',
        en: 'Opening geodes and finding out which gem is inside',
        zhTW: '打開礦石袋，看裡面是什麼寶石',
        ja: 'ジオードを割って、中にどんな宝石が入っているか確かめる',
        ko: '지오드를 열어서 안에 어떤 보석이 있는지 확인하는 것',
        de: 'Geoden öffnen und herausfinden, welcher Edelstein darin steckt',
        type: 'hill-top',
      },
      {
        zh: '面对挑战，摸索出独特的解决方案',
        en: 'Taking on challenges and finding unique solutions',
        zhTW: '面對挑戰，摸索出獨特的解決方案',
        ja: '制約の中で独自の解決策を見つけるのが好き',
        ko: '도전에 맞서 독특한 해결책을 찾는 것',
        de: 'Herausforderungen annehmen und einzigartige Lösungen finden',
        type: 'beach',
      },
    ],
  },
  {
    q_zh: '你是什么样的玩家？',
    q_en: 'What kind of player are you?',
    q_zhTW: '你是什麼樣的玩家？',
    q_ja: 'あなたはどんなプレイヤー？',
    q_ko: '당신은 어떤 플레이어인가요?',
    q_de: 'Was für ein Spielertyp bist du?',
    options: [
      {
        zh: '初心者或想要顺畅游戏体验的老手',
        en: 'A beginner, or a veteran who wants a smooth experience',
        zhTW: '初心者或想要順暢遊戲體驗的老手',
        ja: '初心者、またはスムーズな体験を求めるベテラン',
        ko: '초보자 또는 원활한 게임 경험을 원하는 베테랑',
        de: 'Anfänger oder Veteran, der ein reibungsloses Spielerlebnis möchte',
        type: 'standard',
      },
      {
        zh: '喜欢适度挑战，但有丰富回报',
        en: 'Someone who likes moderate challenge with great rewards',
        zhTW: '喜歡適度挑戰，但有豐富回報',
        ja: '程よい難しさと大きな見返りを楽しむタイプ',
        ko: '적당한 도전과 풍부한 보상을 즐기는 사람',
        de: 'Jemand, der moderate Herausforderungen mit guten Belohnungen mag',
        type: 'forest',
      },
      {
        zh: '愿意牺牲一点农地来换取垂钓天堂',
        en: 'Willing to sacrifice some farmland for a fishing paradise',
        zhTW: '願意犧牲一點農地來換取垂釣天堂',
        ja: '農地が減っても釣りパラダイスのために妥協できる',
        ko: '낚시 천국을 위해 농지를 기꺼이 포기하는 사람',
        de: 'Bereit, etwas Ackerland für ein Angelparadies zu opfern',
        type: 'riverland',
      },
      {
        zh: '想玩出独特机制，就算一开始比较难',
        en: 'Into unique mechanics, even if the start is rough',
        zhTW: '想玩出獨特機制，就算一開始比較難',
        ja: '独自のメカニズムを楽しみたい、序盤が辛くても関係ない',
        ko: '독특한 메커니즘을 즐기고 싶은 사람, 초반이 힘들어도 괜찮아',
        de: 'Auf einzigartige Mechaniken stehen, auch wenn der Anfang schwer ist',
        type: 'hill-top',
      },
      {
        zh: '挑最难的模式，把限制变成乐趣',
        en: 'Always picking the hardest mode and making constraints fun',
        zhTW: '挑最難的模式，把限制變成樂趣',
        ja: '一番難しいモードを選んで、制約を楽しみに変える挑戦者',
        ko: '가장 어려운 모드를 선택하고 제약을 즐거움으로 만드는 사람',
        de: 'Immer den härtesten Modus wählen und Einschränkungen zum Spaß machen',
        type: 'beach',
      },
    ],
  },
  {
    q_zh: '你的理想星露谷后期农场是？',
    q_en: 'Your ideal late-game Stardew Valley setup:',
    q_zhTW: '你的理想星露谷後期農場是？',
    q_ja: 'スターデューバレーの理想の後半農場は？',
    q_ko: '스타듀 밸리 후반부 이상적인 농장은?',
    q_de: 'Dein idealer Spät-Spielhof in Stardew Valley:',
    options: [
      {
        zh: '温室里全是古代水果，仓库里堆满金币',
        en: 'Greenhouse full of ancient fruit, warehouse full of gold',
        zhTW: '溫室裡全是古代水果，倉庫裡堆滿金幣',
        ja: '温室は古代の果物でいっぱい、倉庫には金貨が山積み',
        ko: '온실에는 고대 과일이 가득하고, 창고에는 금화가 쌓인 상태',
        de: 'Gewächshaus voller alter Früchte, Lager voller Gold',
        type: 'standard',
      },
      {
        zh: '硬木小屋被果树环绕，橡树树脂源源不断',
        en: 'Hardwood cabin surrounded by fruit trees and flowing oak resin',
        zhTW: '硬木小屋被果樹環繞，橡樹樹脂源源不斷',
        ja: 'ハードウッドの小屋が果樹に囲まれて、オーク樹液が絶え間なく流れ出てくる',
        ko: '단단한 나무 오두막이 과일나무로 둘러싸이고, 오크 수지가 끊임없이 흐르는 상태',
        de: 'Hartholzhütte von Obstbäumen umgeben, mit ständig fließendem Eichenharz',
        type: 'forest',
      },
      {
        zh: '一排排酿酒桶，鱼塘里满是鲟鱼和三文鱼',
        en: 'Rows of kegs, fish ponds full of sturgeon and salmon',
        zhTW: '一排排釀酒桶，魚塘裡滿是鱘魚和鮭魚',
        ja: '発酵樽が並んで、魚池はチョウザメとサーモンでいっぱい',
        ko: '술통이 줄지어 늘어서고, 어항에는 철갑상어와 연어가 가득한 상태',
        de: 'Reihen von Fässern, Fischteiche voller Stör und Lachs',
        type: 'riverland',
      },
      {
        zh: '一整间水晶培育机，出产的都是钻石和红宝石',
        en: 'A room of crystalariums producing diamonds and rubies',
        zhTW: '一整間水晶培育機，出產的都是鑽石和紅寶石',
        ja: '部屋いっぱいのクリスタラリウムからダイヤモンドとルビーが生産され続ける',
        ko: '방 가득 크리스탈라리움에서 다이아몬드와 루비가 계속 생산되는 상태',
        de: 'Ein ganzer Raum Kristallarien, die Diamanten und Rubine produzieren',
        type: 'hill-top',
      },
      {
        zh: '潮汐池旁的渔屋，一望无际的沙滩就是我的农场',
        en: 'A fishing shack by the tide pools — the beach is my farm',
        zhTW: '潮汐池旁的漁屋，一望無際的沙灘就是我的農場',
        ja: '潮だまりのそばにある漁師小屋——砂浜全体が僕の農場',
        ko: '조수웅덩이 옆의 어부 오두막 — 끝없는 해변이 내 농장',
        de: 'Eine Fischerhütte neben den Gezeitentümpeln — der ganze Strand ist meine Farm',
        type: 'beach',
      },
    ],
  },
]

interface Result {
  type: FarmType
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
  prosZh: string[]
  prosEn: string[]
  prosZhTW: string[]
  prosJa: string[]
  prosKo: string[]
  prosDe: string[]
  tipZh: string
  tipEn: string
  tipZhTW: string
  tipJa: string
  tipKo: string
  tipDe: string
  hookZh: string
  hookEn: string
  hookZhTW: string
  hookJa: string
  hookKo: string
  hookDe: string
}

const RESULTS: Record<FarmType, Result> = {
  standard: {
    type: 'standard',
    nameZh: '标准农场',
    nameEn: 'Standard Farm',
    nameZhTW: '標準農場',
    nameJa: 'スタンダードファーム',
    nameKo: '표준 농장',
    nameDe: 'Standard-Farm',
    emoji: '🌾',
    taglineZh: '最大的可耕地，无限可能',
    taglineEn: 'Most farmable land, infinite possibilities',
    taglineZhTW: '最大的可耕地，無限可能',
    taglineJa: '最大の耕作地、無限の可能性',
    taglineKo: '최대 경작지, 무한한 가능성',
    taglineDe: 'Größte Ackerfläche, unendliche Möglichkeiten',
    descZh:
      '你是一个务实的农夫，你想要空间，你想要效率，你想要在游戏里建立一个真正的农业帝国。标准农场给你最大的开放可耕地，没有额外的限制和特殊机制干扰——这正是你需要的画布。你喜欢优化、计划、按顺序把每一件事做到最好。',
    descEn:
      'You are a practical farmer who wants space, efficiency, and a real agricultural empire. The Standard Farm gives you the largest open farmable area with no special constraints — the perfect blank canvas. You love optimizing, planning, and executing each phase of the game in order.',
    descZhTW:
      '你是一個務實的農夫，你想要空間，你想要效率，你想要在遊戲裡建立一個真正的農業帝國。標準農場給你最大的開放可耕地，沒有額外的限制和特殊機制干擾——這正是你需要的畫布。你喜歡優化、計劃、按順序把每一件事做到最好。',
    descJa:
      'あなたは実用的な農夫です。スペース、効率、そして本物の農業帝国を求めています。スタンダードファームは最大の耕作スペースを提供し、特別な制約もありません——理想のキャンバスです。最適化して計画して、一つひとつを順番に完璧にこなすのが好きなタイプです。',
    descKo:
      '당신은 실용적인 농부입니다. 공간, 효율, 그리고 게임 속 진정한 농업 제국을 원합니다. 표준 농장은 특별한 제약 없이 최대의 경작 공간을 제공합니다 — 완벽한 빈 캔버스예요. 최적화하고 계획하며, 하나씩 차례대로 완벽하게 해나가는 것을 즐깁니다.',
    descDe:
      'Du bist ein praktischer Bauer — du willst Platz, Effizienz und ein echtes Landwirtschafts-Imperium. Die Standard-Farm gibt dir die größte Ackerfläche ohne besondere Einschränkungen — die perfekte leere Leinwand. Du liebst es zu optimieren, zu planen und jeden Spielabschnitt der Reihe nach zu meistern.',
    prosZh: ['最大可耕地面积', '新手最友好', '最适合古代水果/草莓大规模种植', '布局自由度最高'],
    prosEn: ['Largest farmable area', 'Most beginner-friendly', 'Best for ancient fruit / strawberry mass farming', 'Maximum layout freedom'],
    prosZhTW: ['最大可耕地面積', '新手最友好', '最適合古代水果/草莓大規模種植', '布局自由度最高'],
    prosJa: ['最大の耕作スペース', '初心者に最も優しい', '古代の果物やイチゴの大量栽培に最適', '最高のレイアウト自由度'],
    prosKo: ['최대 경작 면적', '초보자에게 가장 친숙함', '고대 과일/딸기 대규모 재배에 최적', '레이아웃 자유도 최고'],
    prosDe: ['Größte Ackerfläche', 'Am anfängerfreundlichsten', 'Bester für Massenanbau alter Früchte/Erdbeeren', 'Maximale Layout-Freiheit'],
    tipZh: '中期目标：温室解锁后种满古代水果，配合酿酒桶年收入破百万金币。',
    tipEn: 'Mid-game goal: unlock the greenhouse and fill it with ancient fruit for 1M+ gold per year with kegs.',
    tipZhTW: '中期目標：溫室解鎖後種滿古代水果，配合釀酒桶年收入破百萬金幣。',
    tipJa: '中盤の目標：温室を解放したら古代の果物でいっぱいにして、発酵樽と組み合わせれば年間100万G以上稼げます。',
    tipKo: '중반 목표: 온실을 해금한 후 고대 과일로 가득 채우고, 술통과 결합하면 연간 100만 골드 이상을 벌 수 있어요.',
    tipDe: 'Mittelspiel-Ziel: Gewächshaus freischalten und mit alten Früchten füllen — mit Fässern über 1 Million Gold pro Jahr.',
    hookZh:
      'TendFarm 的标准模式为效率型玩家而设计：你的日常步数直接决定作物的丰收节奏，越规律的生活，农场产出越稳定——把现实生活的规律转化为游戏里的农业帝国。',
    hookEn:
      "TendFarm's standard mode is built for efficiency players: your daily steps directly drive harvest rhythms. The more consistent your real-life routine, the more stable your farm output — turn real-world habits into an in-game agricultural empire.",
    hookZhTW:
      'TendFarm 的標準模式為效率型玩家而設計：你的日常步數直接決定作物的豐收節奏，越規律的生活，農場產出越穩定——把現實生活的規律轉化為遊戲裡的農業帝國。',
    hookJa:
      'TendFarmのスタンダードモードは効率重視のプレイヤーのために作られています：あなたの日々の歩数が直接農場の収穫リズムを決めます。生活が規則正しいほど農場の生産も安定——現実の習慣をゲームの農業帝国に変換しましょう。',
    hookKo:
      'TendFarm의 표준 모드는 효율 지향 플레이어를 위해 설계되었습니다: 일상의 걸음 수가 작물 수확 리듬을 직접 결정합니다. 생활이 규칙적일수록 농장 생산량이 안정적입니다 — 현실 생활의 규칙성을 게임 속 농업 제국으로 전환하세요.',
    hookDe:
      'TendFarms Standard-Modus ist für Effizienz-Spieler gebaut: Deine täglichen Schritte bestimmen direkt den Ernte-Rhythmus. Je regelmäßiger dein echtes Leben, desto stabiler deine Farm-Produktion — wandle echte Gewohnheiten in ein Spiel-Imperium um.',
  },
  forest: {
    type: 'forest',
    nameZh: '森林农场',
    nameEn: 'Forest Farm',
    nameZhTW: '森林農場',
    nameJa: 'フォレストファーム',
    nameKo: '숲 농장',
    nameDe: 'Wald-Farm',
    emoji: '🌲',
    taglineZh: '可再生资源，采集者的天堂',
    taglineEn: 'Renewable resources and forager paradise',
    taglineZhTW: '可再生資源，採集者的天堂',
    taglineJa: '再生可能な資源、採集者のパラダイス',
    taglineKo: '재생 가능한 자원, 채집자의 천국',
    taglineDe: 'Erneuerbare Ressourcen und Sammler-Paradies',
    descZh:
      '你热爱大自然，你想要一个有树木、有苔藓、有野生蘑菇的农场。森林农场的边缘会自动生长可再生的硬木树桩和采集物，你不需要把每一格土地都变成农田——你享受的是那种「土地会自己给你东西」的感觉。你是采集者，也是自给自足的实践者。',
    descEn:
      'You love nature and want a farm with trees, moss, and wild mushrooms. The Forest Farm has renewable hardwood stumps and forage items along its edges — you never need to turn every tile into farmland. You enjoy the feeling that the land gives you things on its own. You are a forager and a self-sufficient homesteader.',
    descZhTW:
      '你熱愛大自然，你想要一個有樹木、有苔蘚、有野生蘑菇的農場。森林農場的邊緣會自動生長可再生的硬木樹樁和採集物，你不需要把每一格土地都變成農田——你享受的是那種「土地會自己給你東西」的感覺。你是採集者，也是自給自足的實踐者。',
    descJa:
      '自然が大好きで、木々と苔と野生のキノコがある農場を求めています。フォレストファームの端には再生可能なハードウッドの切り株や採集物が自動で生えてきます——全タイルを農地にしなくてもいい。「土地が勝手に何かをくれる」感覚がたまりません。あなたは採集者であり、自給自足を実践する人です。',
    descKo:
      '자연을 사랑하며, 나무와 이끼와 야생 버섯이 있는 농장을 원합니다. 숲 농장의 가장자리에는 재생 가능한 단단한 나무 그루터기와 채집물이 자동으로 자랍니다 — 모든 타일을 농지로 만들 필요가 없어요. "땅이 스스로 무언가를 줘"라는 느낌을 즐깁니다. 당신은 채집자이자 자급자족의 실천자입니다.',
    descDe:
      'Du liebst die Natur und willst eine Farm mit Bäumen, Moos und wilden Pilzen. Die Wald-Farm hat erneuerbare Hartholzstümpfe und Sammelobjekte an den Rändern — du musst nicht jeden Tile in Ackerland verwandeln. Du genießt das Gefühl, dass das Land dir von selbst etwas gibt. Du bist Sammler und Selbstversorger.',
    prosZh: ['边缘自动再生硬木树桩', '定期刷新采集物（蓝莓、蕨类等）', '有独特的大型空地布局', '适合以工艺和自给为核心的玩法'],
    prosEn: ['Renewable hardwood stumps on the edges', 'Regular forage spawns (blueberries, ferns, etc.)', 'Unique large clearing layout', 'Great for crafting and self-sufficiency playstyles'],
    prosZhTW: ['邊緣自動再生硬木樹樁', '定期刷新採集物（藍莓、蕨類等）', '有獨特的大型空地布局', '適合以工藝和自給為核心的玩法'],
    prosJa: ['端に再生可能なハードウッドの切り株', '定期的な採集物のスポーン（ブルーベリー、シダなど）', '独特の広い空き地レイアウト', 'クラフトと自給自足を中心としたプレイスタイルに最適'],
    prosKo: ['가장자리에 재생 가능한 단단한 나무 그루터기', '정기적인 채집물 리스폰 (블루베리, 고사리 등)', '독특한 넓은 공터 레이아웃', '공예와 자급자족 중심 플레이에 최적'],
    prosDe: ['Erneuerbare Hartholzstümpfe an den Rändern', 'Regelmäßige Sammel-Spawns (Blaubeeren, Farne usw.)', 'Einzigartiges großes Freiflächen-Layout', 'Ideal für Crafting- und Selbstversorgungs-Spielstil'],
    tipZh: '优先种橡树和枫树收取树脂，配合蜜蜂屋和果树，不种一粒作物也能过上好日子。',
    tipEn: 'Prioritize oak and maple trees for resin. Combine with bee houses and fruit trees — you can thrive without planting a single crop.',
    tipZhTW: '優先種橡樹和楓樹收取樹脂，配合蜜蜂屋和果樹，不種一粒作物也能過上好日子。',
    tipJa: 'まずオークとカエデの木を植えて樹液を集めましょう。ハチ小屋と果樹を組み合わせれば、作物を一粒も植えなくても豊かな生活が送れます。',
    tipKo: '오크와 단풍나무를 먼저 심어 수지를 모으세요. 꿀벌 집과 과일나무를 결합하면 작물 하나 심지 않아도 풍요롭게 살 수 있어요.',
    tipDe: 'Pflanze Eichen und Ahornbäume für Harz. Kombiniert mit Bienenhäusern und Obstbäumen kannst du ohne eine einzige Nutzpflanze gut leben.',
    hookZh:
      'TendFarm 特别适合森林农场玩家：你的户外步数在农场里会激活野生采集物的刷新，步行越多，农场边缘越丰饶——你的日常散步就是在给农场「浇水」。',
    hookEn:
      "TendFarm is perfect for Forest Farm players: your outdoor steps activate wild forage spawns on the farm's edges. The more you walk, the more abundant your farm's edges become — your daily stroll is your version of watering crops.",
    hookZhTW:
      'TendFarm 特別適合森林農場玩家：你的戶外步數在農場裡會激活野生採集物的刷新，步行越多，農場邊緣越豐饒——你的日常散步就是在給農場「澆水」。',
    hookJa:
      'TendFarmはフォレストファームプレイヤーに最適です：屋外での歩数が農場の端の野生採集物をアクティブにします。歩けば歩くほど農場の縁が豊かになる——日々の散歩が農場への「水やり」になります。',
    hookKo:
      'TendFarm은 숲 농장 플레이어에게 완벽합니다: 야외 걸음 수가 농장 가장자리의 야생 채집물 리스폰을 활성화합니다. 더 많이 걸을수록 농장 가장자리가 더 풍요로워집니다 — 일상 산책이 곧 농장에 "물 주기"입니다.',
    hookDe:
      'TendFarm ist perfekt für Wald-Farm-Spieler: Deine Outdoor-Schritte aktivieren wilde Sammel-Spawns an den Rändern. Je mehr du gehst, desto üppiger werden die Ränder — dein täglicher Spaziergang ist dein Gießen.',
  },
  riverland: {
    type: 'riverland',
    nameZh: '河地农场',
    nameEn: 'Riverland Farm',
    nameZhTW: '河地農場',
    nameJa: 'リバーランドファーム',
    nameKo: '강변 농장',
    nameDe: 'Flussland-Farm',
    emoji: '🎣',
    taglineZh: '钓鱼天堂，手工艺品工厂',
    taglineEn: 'Fishing paradise and artisan goods factory',
    taglineZhTW: '釣魚天堂，手工藝品工廠',
    taglineJa: '釣りパラダイス、アーティサン工場',
    taglineKo: '낚시 천국, 수제품 공장',
    taglineDe: 'Angelparadies und Handwerksprodukt-Fabrik',
    descZh:
      '你是个渔夫，也是个工匠。河地农场到处都是水域，你虽然会因此失去不少农田，但你获得的是可以随时随地钓鱼的天堂，以及建设一个以鱼塘和酿酒桶为核心的手工艺品工厂的完美基础。鱼子酱、鱼露、古代水果酒——你的农场是一个小型精品产业链。',
    descEn:
      'You are both a fisherman and an artisan. The Riverland Farm is full of water — you lose farmland, but gain a paradise where you can fish anywhere on your own property, plus the perfect foundation for a fish pond and keg-based artisan empire. Caviar, fish sauce, ancient fruit wine — your farm is a boutique operation.',
    descZhTW:
      '你是個漁夫，也是個工匠。河地農場到處都是水域，你雖然會因此失去不少農田，但你獲得的是可以隨時隨地釣魚的天堂，以及建設一個以魚塘和釀酒桶為核心的手工藝品工廠的完美基礎。魚子醬、魚露、古代水果酒——你的農場是一個小型精品產業鏈。',
    descJa:
      'あなたは釣り人であり、職人でもあります。リバーランドファームは水だらけ——農地は減りますが、自分の農場で好きな時に釣りができる天国と、魚池と発酵樽を軸にしたアーティサン産業を作る完璧な基盤が手に入ります。キャビア、魚醤、古代の果実ワイン——あなたの農場はこだわりの小型産業チェーンです。',
    descKo:
      '당신은 어부이자 장인입니다. 강변 농장은 물로 가득해서 농지가 줄어들지만, 내 농장 어디서든 낚시를 즐길 수 있는 천국과 어항, 술통 중심의 수제품 제국을 만들 완벽한 토대를 얻습니다. 캐비아, 피시 소스, 고대 과일 와인 — 당신의 농장은 소규모 프리미엄 산업 체인입니다.',
    descDe:
      'Du bist Fischer und Handwerker zugleich. Die Flussland-Farm ist voller Wasser — du verlierst Ackerland, gewinnst aber ein Paradies zum Angeln direkt auf deinem Hof sowie die perfekte Grundlage für ein Fischteich- und Fass-basiertes Handwerksimperium. Kaviar, Fischsoße, alten Fruchtwein — deine Farm ist ein Boutique-Betrieb.',
    prosZh: ['农场内部可随时钓鱼', '鱼塘布置天然融入景观', '酿酒桶 + 鱼子酱 = 极高收益', '视觉上非常独特美观'],
    prosEn: ['Fish anywhere on your own farm', 'Fish ponds blend naturally into the landscape', 'Kegs + caviar = extremely high income', 'Visually unique and beautiful'],
    prosZhTW: ['農場內部可隨時釣魚', '魚塘布置天然融入景觀', '釀酒桶 + 魚子醬 = 極高收益', '視覺上非常獨特美觀'],
    prosJa: ['自分の農場内でいつでも釣りができる', '魚池が自然に景観に溶け込む', '発酵樽＋キャビア＝超高収益', '視覚的に非常に個性的で美しい'],
    prosKo: ['농장 내부에서 언제든 낚시 가능', '어항이 자연스럽게 경관에 어울림', '술통 + 캐비아 = 극도로 높은 수익', '시각적으로 매우 독특하고 아름다움'],
    prosDe: ['Überall auf dem Hof angeln', 'Fischteiche fügen sich natürlich ins Landschaftsbild', 'Fässer + Kaviar = extrem hohes Einkommen', 'Visuell sehr einzigartig und schön'],
    tipZh: '优先建鲟鱼鱼塘出产鱼子酱，每个鱼子酱价值 500 金。再配古代水果酒，年收入轻松破百万。',
    tipEn: 'Prioritize a sturgeon fish pond for caviar (500g each). Add ancient fruit wine for 1M+ gold per year without much effort.',
    tipZhTW: '優先建鱘魚魚塘出產魚子醬，每個魚子醬價值 500 金。再配古代水果酒，年收入輕鬆破百萬。',
    tipJa: 'まずチョウザメの魚池を作ってキャビアを生産しましょう（1個500G）。古代の果実ワインも加えれば、年間100万G超えが楽勝です。',
    tipKo: '철갑상어 어항을 먼저 만들어 캐비아를 생산하세요 (캐비아 하나당 500골드). 고대 과일 와인까지 더하면 연간 100만 골드 돌파가 쉬워요.',
    tipDe: 'Baue zuerst einen Störteich für Kaviar (500G pro Stück). Füge alten Fruchtwein hinzu und du schaffst mühelos über 1 Million Gold pro Jahr.',
    hookZh:
      'TendFarm 的水系节律与河地农场天然契合：你的睡眠质量决定鱼塘的产出，深度睡眠越多，鲟鱼产鱼子酱的频率越高——用真实的休息换取游戏里的顶级渔获。',
    hookEn:
      "TendFarm's water rhythms naturally match the Riverland Farm: your sleep quality determines fish pond output. More deep sleep means sturgeons produce caviar more often — trade real rest for the game's top-tier catch.",
    hookZhTW:
      'TendFarm 的水系節律與河地農場天然契合：你的睡眠質量決定魚塘的產出，深度睡眠越多，鱘魚產魚子醬的頻率越高——用真實的休息換取遊戲裡的頂級漁獲。',
    hookJa:
      'TendFarmの水系リズムはリバーランドファームと相性抜群：睡眠の質が魚池の生産量を決めます。深い眠りが多いほど、チョウザメがキャビアを産む頻度が上がる——現実の休息がゲーム最高の漁獲に変わります。',
    hookKo:
      'TendFarm의 수계 리듬은 강변 농장과 완벽히 맞습니다: 수면의 질이 어항의 생산량을 결정합니다. 깊은 수면이 많을수록 철갑상어가 캐비아를 생산하는 빈도가 높아집니다 — 실제 휴식으로 게임 최고의 어획물을 얻으세요.',
    hookDe:
      'TendFarms Wasserrhythmus passt perfekt zur Flussland-Farm: Deine Schlafqualität bestimmt die Fischteich-Produktion. Mehr Tiefschlaf bedeutet, Stör produziert öfter Kaviar — tausche echte Erholung gegen den besten Fang im Spiel.',
  },
  'hill-top': {
    type: 'hill-top',
    nameZh: '山顶农场',
    nameEn: 'Hill-top Farm',
    nameZhTW: '山頂農場',
    nameJa: 'ヒルトップファーム',
    nameKo: '언덕 꼭대기 농장',
    nameDe: 'Hügelkuppen-Farm',
    emoji: '⛏️',
    taglineZh: '采石场、矿石与稀有宝石',
    taglineEn: 'Quarry, ores, and rare gems on your own land',
    taglineZhTW: '採石場、礦石與稀有寶石',
    taglineJa: '採石場、鉱石、そして希少な宝石が農場に',
    taglineKo: '채석장, 광물, 내 땅의 희귀 보석',
    taglineDe: 'Steinbruch, Erze und seltene Edelsteine auf dem eigenen Land',
    descZh:
      '你不是来种地的，你是来挖矿的。山顶农场有一个独特的小型采石场，可以刷新矿石和宝石——这意味着你不需要每次都下到矿洞深处，你的农场本身就是一个资源点。你喜欢地质学、收藏、稀有物品，以及那种「打开矿石袋不知道里面是什么」的期待感。',
    descEn:
      'You are not here to farm — you are here to mine. The Hill-top Farm has a unique small quarry that spawns ores and gems, meaning your farm itself is a resource node. You love geology, collecting, rare items, and the anticipation of cracking open a geode without knowing what is inside.',
    descZhTW:
      '你不是來種地的，你是來挖礦的。山頂農場有一個獨特的小型採石場，可以刷新礦石和寶石——這意味著你不需要每次都下到礦洞深處，你的農場本身就是一個資源點。你喜歡地質學、收藏、稀有物品，以及那種「打開礦石袋不知道裡面是什麼」的期待感。',
    descJa:
      '農業をしに来たわけじゃない——採掘をしに来たんです。ヒルトップファームには独自の小さな採石場があり、鉱石と宝石が毎日リスポーンします。毎回鉱山の深くまで降りなくても、農場自体がリソースポイントです。地質学、コレクション、レアアイテム、そしてジオードを割る時のワクワク感が好きなタイプです。',
    descKo:
      '당신은 농사를 지으러 온 게 아닙니다 — 광물을 캐러 온 거예요. 언덕 꼭대기 농장에는 독특한 소형 채석장이 있어 광물과 보석이 리스폰됩니다 — 매번 광산 깊숙이 내려가지 않아도 농장 자체가 자원 포인트입니다. 지질학, 수집, 희귀 아이템, 그리고 지오드를 열 때의 설렘을 즐깁니다.',
    descDe:
      'Du bist nicht zum Bäuerln hier — du bist zum Graben hier. Die Hügelkuppen-Farm hat einen einzigartigen kleinen Steinbruch, der täglich Erze und Edelsteine spawnt. Du musst nicht jedes Mal tief in die Mine, dein Hof selbst ist ein Ressourcenpunkt. Du liebst Geologie, Sammeln, seltene Items und die Vorfreude beim Öffnen einer Geode.',
    prosZh: ['农场内的采石场每天刷新矿石', '独特的高地地形', '特别适合以矿石和水晶培育机为核心的玩法', '地形视觉效果极强'],
    prosEn: ['On-farm quarry refreshes ores daily', 'Unique elevated terrain', 'Perfect for crystalarium and mineral-focused playstyle', 'Visually dramatic terrain'],
    prosZhTW: ['農場內的採石場每天刷新礦石', '獨特的高地地形', '特別適合以礦石和水晶培育機為核心的玩法', '地形視覺效果極強'],
    prosJa: ['農場内の採石場が毎日鉱石をリスポーン', '独自の高台地形', 'クリスタラリウムとミネラル集めを中心としたプレイに最適', '地形の視覚的インパクトが強い'],
    prosKo: ['농장 내 채석장이 매일 광물 리스폰', '독특한 고지대 지형', '광물과 크리스탈라리움 중심 플레이에 최적', '지형 시각 효과가 압도적'],
    prosDe: ['Hofeigener Steinbruch spawnt täglich Erze', 'Einzigartiges erhöhtes Gelände', 'Perfekt für Crystalarium- und Mineral-fokussierten Spielstil', 'Dramatisch wirkende Geländeform'],
    tipZh: '早期解锁爆破物，迅速清空采石场。中期建水晶培育机复制钻石，是最高效的被动收益之一。',
    tipEn: 'Unlock bombs early and clear the quarry fast. Mid-game, fill crystalariums with diamonds for one of the most efficient passive incomes.',
    tipZhTW: '早期解鎖爆破物，迅速清空採石場。中期建水晶培育機複製鑽石，是最高效的被動收益之一。',
    tipJa: '早めに爆発物を解放して採石場を素早く整理しましょう。中盤はクリスタラリウムにダイヤモンドをセットすれば、最も効率的なパッシブ収益の一つになります。',
    tipKo: '초반에 폭발물을 해금해서 채석장을 빠르게 정리하세요. 중반에는 크리스탈라리움에 다이아몬드를 복제하면 가장 효율적인 패시브 수익 중 하나가 됩니다.',
    tipDe: 'Schalte früh Bomben frei und räume den Steinbruch schnell. Mid-game: Kristallarien mit Diamanten für eines der effizientesten passiven Einkommen.',
    hookZh:
      'TendFarm 的矿物节律为山顶玩家定制：你每天的步数在农场里会解锁稀有矿石的刷新，探索得越多，采石场出产越丰厚——把你的日常行走转化为游戏里的矿石财富。',
    hookEn:
      "TendFarm's mineral rhythm is built for hill-top players: your daily steps unlock rare ore spawns in the quarry. The more you explore in real life, the richer your quarry becomes — turn your walks into in-game mineral wealth.",
    hookZhTW:
      'TendFarm 的礦物節律為山頂玩家定制：你每天的步數在農場裡會解鎖稀有礦石的刷新，探索得越多，採石場出產越豐厚——把你的日常行走轉化為遊戲裡的礦石財富。',
    hookJa:
      'TendFarmの鉱物リズムはヒルトッププレイヤーのために作られています：あなたの日々の歩数が農場の採石場でのレアな鉱石スポーンを解放します。現実で探索するほど採石場が豊かになる——日々の歩きが鉱石の富に変わります。',
    hookKo:
      'TendFarm의 광물 리듬은 언덕 꼭대기 플레이어를 위해 맞춤 설계되었습니다: 일상의 걸음 수가 농장 채석장의 희귀 광물 리스폰을 해금합니다. 현실에서 더 많이 탐험할수록 채석장이 더 풍요로워집니다 — 일상 걷기가 게임 속 광물 재산으로 바뀝니다.',
    hookDe:
      'TendFarms Mineral-Rhythmus ist für Hügelkuppen-Spieler gebaut: Deine täglichen Schritte schalten seltene Erz-Spawns im Steinbruch frei. Je mehr du in der Realität erkundest, desto reicher dein Steinbruch — wandle Spaziergänge in Mineralreichtum um.',
  },
  beach: {
    type: 'beach',
    nameZh: '海滩农场',
    nameEn: 'Beach Farm',
    nameZhTW: '海灘農場',
    nameJa: 'ビーチファーム',
    nameKo: '해변 농장',
    nameDe: 'Strand-Farm',
    emoji: '🏖️',
    taglineZh: '最美但最难——沙地挑战者',
    taglineEn: "The most beautiful and hardest — a challenger's farm",
    taglineZhTW: '最美但最難——沙地挑戰者',
    taglineJa: '最も美しく、最も難しい——挑戦者の農場',
    taglineKo: '가장 아름답지만 가장 어렵다 — 도전자의 농장',
    taglineDe: 'Die schönste und härteste — die Farm für Herausforderer',
    descZh:
      '你选择了最难的路，但也是最美的路。海滩农场的沙地不能用化肥，退潮会带来随机物品，你需要用更多智慧来设计作物布局。但当一切配合好的时候，你的农场会是星露谷里最独特的风景——潮汐池、沙滩路、渔屋。你不走寻常路，你把限制变成美学。',
    descEn:
      "You chose the hardest path, but also the most beautiful. The Beach Farm's sandy soil can't use fertilizer, but the tide washes in random items, and you must design smarter crop layouts. When it all comes together, your farm is the most unique landscape in Stardew Valley — tide pools, sandy paths, a fishing shack. You never take the easy route; you turn constraints into aesthetics.",
    descZhTW:
      '你選擇了最難的路，但也是最美的路。海灘農場的沙地不能用化肥，退潮會帶來隨機物品，你需要用更多智慧來設計作物布局。但當一切配合好的時候，你的農場會是星露谷裡最獨特的風景——潮汐池、沙灘路、漁屋。你不走尋常路，你把限制變成美學。',
    descJa:
      '一番難しい道を選んだ——でも一番美しい道でもあります。ビーチファームの砂地には肥料が使えず、潮がランダムなアイテムを運んでくるので、作物のレイアウトにも頭を使う必要があります。でも全てがうまくハマった時、あなたの農場はスターデューバレーで最も個性的な景観になります——潮だまり、砂浜の道、漁師小屋。制約を美学に変えるのがあなたのスタイルです。',
    descKo:
      '당신은 가장 어려운 길을 선택했지만, 가장 아름다운 길이기도 합니다. 해변 농장의 모래땅에는 비료를 쓸 수 없고, 썰물이 무작위 아이템을 가져옵니다. 작물 배치에도 더 많은 지혜가 필요합니다. 하지만 모든 것이 맞아떨어질 때, 당신의 농장은 스타듀 밸리에서 가장 독특한 풍경이 됩니다 — 조수웅덩이, 모래 길, 어부 오두막. 당신은 제약을 미학으로 바꿉니다.',
    descDe:
      'Du hast den schwersten Weg gewählt — aber auch den schönsten. Der Sandboden der Strand-Farm verträgt keinen Dünger, die Flut bringt zufällige Items, und du musst klüger bei der Ernte-Planung vorgehen. Wenn aber alles zusammenkommt, ist dein Hof die einzigartigste Landschaft in Stardew Valley — Gezeitentümpel, Sandwege, eine Fischerhütte. Du machst aus Einschränkungen Ästhetik.',
    prosZh: ['最独特的视觉风格', '潮汐自动带来贝壳、海草等采集物', '海湾内部可以钓鱼', '接受挑战的玩家的终极成就感'],
    prosEn: ['Most distinctive visual aesthetic', 'Tide brings free forage (shells, coral, etc.)', 'Can fish in the bay on your farm', 'Ultimate satisfaction for challenge-seekers'],
    prosZhTW: ['最獨特的視覺風格', '潮汐自動帶來貝殼、海草等採集物', '海灣內部可以釣魚', '接受挑戰的玩家的終極成就感'],
    prosJa: ['最も個性的なビジュアルスタイル', '潮が貝殻や珊瑚などの採集物を自動で運んでくる', '農場内の入江で釣り可能', '挑戦を楽しむプレイヤーの最高の達成感'],
    prosKo: ['가장 독특한 시각적 스타일', '조류가 자동으로 조개껍데기, 해초 등 채집물을 가져옴', '농장 내 만에서 낚시 가능', '도전을 즐기는 플레이어의 궁극적 성취감'],
    prosDe: ['Markantester visueller Stil', 'Flut bringt automatisch Muscheln, Korallen und andere Sammelgüter', 'Im Hof-Buchte angeln möglich', 'Ultimative Befriedigung für herausforderungslustige Spieler'],
    tipZh: '沙地种作物不能用化肥，但可以用灌溉系统弥补。种植无肥料需求的葡萄（秋季）和南瓜是前期最优解。',
    tipEn: "Sandy soil can't hold fertilizer, but irrigation systems compensate. Plant no-fertilizer crops like fall grapes and pumpkins early — they work on sand.",
    tipZhTW: '沙地種作物不能用化肥，但可以用灌溉系統彌補。種植無肥料需求的葡萄（秋季）和南瓜是前期最優解。',
    tipJa: '砂地に肥料は使えませんが、スプリンクラーで補えます。肥料不要の秋のブドウとカボチャは序盤の最適解です。',
    tipKo: '모래땅에는 비료를 쓸 수 없지만 스프링클러로 보완할 수 있어요. 비료가 필요 없는 가을 포도와 호박이 초반 최선의 선택입니다.',
    tipDe: 'Sandboden verträgt keinen Dünger, aber Sprinkler können das ausgleichen. Herbsttrauben und Kürbisse brauchen keinen Dünger — perfekt für den Anfang auf Sand.',
    hookZh:
      'TendFarm 最适合海滩农场玩家中的「挑战型」人格：你的不规律睡眠和非标准步数，在农场里会产生罕见的潮汐事件——正是这种不可预测性，让你的农场每天都有新发现。',
    hookEn:
      "TendFarm suits Beach Farm challenge-seekers best: your irregular sleep and non-standard steps create rare tidal events on the farm — that unpredictability means something new washes up every day.",
    hookZhTW:
      'TendFarm 最適合海灘農場玩家中的「挑戰型」人格：你的不規律睡眠和非標準步數，在農場裡會產生罕見的潮汐事件——正是這種不可預測性，讓你的農場每天都有新發現。',
    hookJa:
      'TendFarmはビーチファームの「チャレンジャー型」プレイヤーに最も合っています：不規則な睡眠や標準外の歩数が農場にレアな潮汐イベントを生み出します——その予測不能さが、毎日新しい発見を農場にもたらします。',
    hookKo:
      'TendFarm은 해변 농장의 "도전형" 성격에 가장 잘 맞습니다: 불규칙한 수면과 비표준 걸음 수가 농장에 희귀한 조류 이벤트를 만들어냅니다 — 바로 그 예측 불가능성이 농장에 매일 새로운 발견을 가져다줍니다.',
    hookDe:
      'TendFarm passt am besten zu den Herausforderungs-Spielern unter den Strand-Farm-Fans: Dein unregelmäßiger Schlaf und atypische Schrittzahlen erzeugen seltene Gezeiten-Events auf der Farm — genau diese Unvorhersehbarkeit sorgt täglich für neue Entdeckungen.',
  },
}

function calcResult(answers: FarmType[]): FarmType {
  const counts: Record<FarmType, number> = {
    standard: 0,
    forest: 0,
    riverland: 0,
    'hill-top': 0,
    beach: 0,
  }
  answers.forEach((a) => counts[a]++)
  return (Object.keys(counts) as FarmType[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b))
}

function ShareButton({ text, locale }: { text: string; locale: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text), '_blank')
    }
  }
  const copyLabel = copied
    ? (locale === 'zh' ? '✓ 已复制！' : locale === 'zh-TW' ? '✓ 已複製！' : locale === 'ja' ? '✓ コピーしました！' : locale === 'ko' ? '✓ 복사되었습니다!' : locale === 'de' ? '✓ Kopiert!' : '✓ Copied!')
    : (locale === 'zh' ? '📋 复制结果' : locale === 'zh-TW' ? '📋 複製結果' : locale === 'ja' ? '📋 結果をコピー' : locale === 'ko' ? '📋 결과 복사' : locale === 'de' ? '📋 Ergebnis kopieren' : '📋 Copy result')
  const shareLabel = locale === 'zh' || locale === 'zh-TW' ? '分享' : locale === 'ja' ? 'シェア' : locale === 'ko' ? '공유' : locale === 'de' ? 'Teilen' : 'Share'
  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copyLabel}
      </button>
      <a
        href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]"
      >
        𝕏 {shareLabel}
      </a>
    </div>
  )
}

interface Props {
  locale: string
}

export function StardewFarmTypeQuiz({ locale }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<FarmType[]>([])

  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'

  const handleAnswer = (type: FarmType) => {
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

  if (step === 0) {
    return (
      <div className="text-center">
        <div className="mb-6 text-6xl">🏡</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {getLoc(
            '你适合哪种星露谷农场？',
            'Which Stardew Valley Farm Is Right for You?',
            '你適合哪種星露谷農場？',
            'あなたにぴったりのスターデューバレー農場は？',
            '당신에게 맞는 스타듀 밸리 농장은?',
            'Welche Stardew-Valley-Farm passt zu dir?',
          )}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {getLoc(
            '6 个关于游戏风格的问题，帮你在五种官方农场类型（标准、森林、河地、山顶、海滩）中找到最适合你的那一个。',
            '6 questions about your playstyle to find your perfect farm — Standard, Forest, Riverland, Hill-top, or Beach?',
            '6 個關於遊戲風格的問題，幫你在五種官方農場類型（標準、森林、河地、山頂、海灘）中找到最適合你的那一個。',
            'プレイスタイルに関する6つの質問で、あなたにぴったりの農場を見つけよう——スタンダード、フォレスト、リバーランド、ヒルトップ、ビーチのどれ？',
            '플레이 스타일에 관한 6가지 질문으로 당신에게 딱 맞는 농장을 찾아보세요 — 표준, 숲, 강변, 언덕, 해변 중 어디?',
            '6 Fragen zu deinem Spielstil — finde deine perfekte Farm: Standard, Wald, Flussland, Hügelkuppe oder Strand?',
          )}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {getLoc(
            '新一轮游戏前做一下，少走弯路 →',
            'Take this before your next run — save yourself hours of second-guessing →',
            '新一輪遊戲前做一下，少走彎路 →',
            '次のプレイを始める前にやってみて——迷う時間を省こう →',
            '다음 게임 시작 전에 해보세요 — 고민하는 시간을 줄여드립니다 →',
            'Mach das vor deinem nächsten Run — spar dir stundenlange Unentschlossenheit →',
          )}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {getLoc('找到我的农场 →', 'Find My Farm →', '找到我的農場 →', '私の農場を見つける →', '내 농장 찾기 →', 'Meine Farm finden →')}
        </button>
      </div>
    )
  }

  if (step === QUESTIONS.length + 1) {
    const farmType = calcResult(answers)
    const result = RESULTS[farmType]
    const farmName = getLoc(result.nameZh, result.nameEn, result.nameZhTW, result.nameJa, result.nameKo, result.nameDe)
    const url = `https://www.farmgamehub.com/${locale}/quizzes/stardew-farm-type`
    const shareText = getLoc(
      `我在星露谷最适合「${farmName}」！来测测你的农场类型：${url}`,
      `My ideal Stardew Valley farm is the ${farmName}! Find yours: ${url}`,
      `我在星露谷最適合「${farmName}」！來測測你的農場類型：${url}`,
      `スターデューバレーで私にぴったりなのは「${farmName}」！あなたも試してみて：${url}`,
      `스타듀 밸리에서 나에게 맞는 농장은 「${farmName}」! 너도 테스트해봐: ${url}`,
      `Meine ideale Stardew-Valley-Farm ist die ${farmName}! Finde deine: ${url}`,
    )

    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {getLoc('你最适合的农场是', 'Your perfect farm is:', '你最適合的農場是', 'あなたにぴったりの農場は', '당신에게 맞는 농장은', 'Deine perfekte Farm ist:')}
          </p>
          <h2 className="text-3xl font-bold text-[#f0a832]">{farmName}</h2>
          <p className="mt-1 text-sm text-[#8a9a7a]">
            {getLoc(result.taglineZh, result.taglineEn, result.taglineZhTW, result.taglineJa, result.taglineKo, result.taglineDe)}
          </p>
        </div>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-5">
          <p className="leading-relaxed text-[#e8dcc8]">
            {getLoc(result.descZh, result.descEn, result.descZhTW, result.descJa, result.descKo, result.descDe)}
          </p>
        </div>

        {/* Pros */}
        <div className="mb-5">
          <p className="mb-2 text-xs font-semibold text-[#8a9a7a]">
            {getLoc('这种农场的优势', 'Why this farm works for you', '這種農場的優勢', 'この農場があなたに向いている理由', '이 농장이 당신에게 맞는 이유', 'Warum diese Farm zu dir passt')}
          </p>
          <ul className="space-y-1">
            {(locale === 'zh'
              ? result.prosZh
              : locale === 'zh-TW'
                ? result.prosZhTW
                : locale === 'ja'
                  ? result.prosJa
                  : locale === 'ko'
                    ? result.prosKo
                    : locale === 'de'
                      ? result.prosDe
                      : result.prosEn
            ).map((pro) => (
              <li key={pro} className="flex items-start gap-2 text-sm text-[#e8dcc8]">
                <span className="mt-0.5 text-[#f0a832]">✓</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro tip */}
        <div className="mb-5 rounded-xl border border-[#2d5a27] bg-[#1a2e1a]/40 p-4">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">
            {getLoc('老手小贴士', 'Pro tip', '老手小貼士', 'プロのヒント', '고수 팁', 'Profi-Tipp')}
          </p>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(result.tipZh, result.tipEn, result.tipZhTW, result.tipJa, result.tipKo, result.tipDe)}
          </p>
        </div>

        {/* Share */}
        <div className="mb-6">
          <p className="mb-3 text-sm text-[#8a9a7a]">
            {getLoc(
              '分享给你的农场队友 →',
              'Share with your farming squad →',
              '分享給你的農場隊友 →',
              '農場仲間にシェアしよう →',
              '농장 친구들과 공유하세요 →',
              'Mit deiner Farming-Crew teilen →',
            )}
          </p>
          <ShareButton text={shareText} locale={locale} />
        </div>

        {/* TendFarm Hook */}
        <div className="mb-8 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a] p-5">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">
            {getLoc('你可能也会喜欢 →', 'You might also love →', '你可能也會喜歡 →', 'こちらもおすすめ →', '이것도 좋아할 수 있어요 →', 'Das könnte dir auch gefallen →')} TendFarm
          </p>
          <p className="mb-4 text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(
              result.hookZh,
              result.hookEn,
              result.hookZhTW,
              result.hookJa,
              result.hookKo,
              result.hookDe,
            )}
          </p>
          <p className="mb-4 text-xs leading-relaxed text-[#4a5a4a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把 Cozy 游戏的季节感带入你的真实生活节奏。',
              'TendFarm is building a farm rhythm tracker — bringing the seasonal feeling of cozy games into real life.',
              'TendFarm 正在研發農場節律追蹤功能——把 Cozy 遊戲的季節感帶入你的真實生活節奏。',
              'TendFarm はファームリズムトラッカーを開発中です——コージーゲームの季節感をリアルな生活リズムに。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 코지 게임의 계절감을 실제 생활 리듬으로.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — das saisonale Gefühl von Cozy Games ins echte Leben bringen.',
            )}
          </p>
          <Link
            href={`/${locale}/gameplay`}
            className="inline-block rounded-lg bg-[#f0a832] px-5 py-2 text-sm font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
          >
            {getLoc('了解 TendFarm →', 'Learn about TendFarm →', '了解 TendFarm →', 'TendFarm を詳しく見る →', 'TendFarm 알아보기 →', 'TendFarm entdecken →')}
          </Link>
        </div>

        <div className="text-center">
          <button
            onClick={reset}
            className="text-sm text-[#8a9a7a] transition-colors hover:text-[#e8dcc8]"
          >
            {getLoc('重新测试', 'Retake quiz', '重新測試', 'もう一度やる', '다시 테스트하기', 'Nochmal machen')}
          </button>
        </div>
      </div>
    )
  }

  const qIndex = step - 1
  const q = QUESTIONS[qIndex]
  const progress = (qIndex / QUESTIONS.length) * 100

  return (
    <div>
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[#8a9a7a]">
          <span>
            {getLoc(
              `问题 ${step} / ${QUESTIONS.length}`,
              `Question ${step} of ${QUESTIONS.length}`,
              `問題 ${step} / ${QUESTIONS.length}`,
              `質問 ${step} / ${QUESTIONS.length}`,
              `질문 ${step} / ${QUESTIONS.length}`,
              `Frage ${step} von ${QUESTIONS.length}`,
            )}
          </span>
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
        {getLoc(q.q_zh, q.q_en, q.q_zhTW, q.q_ja, q.q_ko, q.q_de)}
      </h2>

      <div className="space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt.type}
            onClick={() => handleAnswer(opt.type)}
            className="w-full rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-5 py-4 text-left text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
          >
            {getLoc(opt.zh, opt.en, opt.zhTW, opt.ja, opt.ko, opt.de)}
          </button>
        ))}
      </div>

      {step > 1 && (
        <button
          onClick={() => {
            setAnswers(answers.slice(0, -1))
            setStep(step - 1)
          }}
          className="mt-4 text-sm text-[#8a9a7a] transition-colors hover:text-[#e8dcc8]"
        >
          ← {getLoc('上一题', 'Previous', '上一題', '前の質問へ', '이전 질문', 'Zurück')}
        </button>
      )}
    </div>
  )
}
