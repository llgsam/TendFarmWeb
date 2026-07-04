'use client'

import { useState } from 'react'

type Season = 'spring' | 'summer' | 'fall' | 'winter'

interface Option {
  zh: string
  en: string
  zhTW: string
  ja: string
  ko: string
  de: string
  type: Season
}

interface Question {
  zh: string
  en: string
  zhTW: string
  ja: string
  ko: string
  de: string
  options: Option[]
}

const QUESTIONS: Question[] = [
  {
    zh: '你理想的周末早晨是？',
    en: 'Your ideal weekend morning:',
    zhTW: '你理想的週末早晨是？',
    ja: '理想の週末の朝は？',
    ko: '이상적인 주말 아침은?',
    de: 'Dein idealer Sonntagmorgen:',
    options: [
      {
        zh: '去农夫市集，买新种子，计划新的开始',
        en: 'Farmers market, new seeds, planning a fresh start',
        zhTW: '去農夫市集，買新種子，計劃新的開始',
        ja: 'ファーマーズマーケットへ行って、新しい種を買って、計画を立てる',
        ko: '파머스 마켓에서 새 씨앗 사고, 새로운 시작을 계획하기',
        de: 'Auf den Wochenmarkt, neue Samen kaufen, Neues planen',
        type: 'spring',
      },
      {
        zh: '户外活动，阳光灿烂，和一群朋友一起',
        en: 'Outdoors in full sun with a big group of friends',
        zhTW: '戶外活動，陽光燦爛，和一群朋友一起',
        ja: '友達大勢と外でワイワイ、太陽サンサンの一日',
        ko: '친구들과 야외에서 햇살 가득한 하루 즐기기',
        de: 'Draußen in der Sonne mit einer großen Freundesgruppe',
        type: 'summer',
      },
      {
        zh: '苹果园采摘，回来做热苹果酒，看叶子变色',
        en: 'Apple picking, hot cider, watching leaves turn',
        zhTW: '蘋果園採摘，回來做熱蘋果酒，看葉子變色',
        ja: 'リンゴ狩りして、ホットサイダー作って、紅葉を眺める',
        ko: '사과 따러 가서 따뜻한 사이다 만들고, 단풍 구경하기',
        de: 'Äpfel pflücken, heiße Apfelschorle machen, dem Blätterwechsel zuschauen',
        type: 'fall',
      },
      {
        zh: '待在家里，热可可，做手工或读书',
        en: 'Staying in with hot cocoa, crafting or reading',
        zhTW: '待在家裡，熱可可，做手工或讀書',
        ja: 'お家でホットチョコレート、手芸したり本読んだり',
        ko: '집에서 핫초코 마시며 공예하거나 책 읽기',
        de: 'Zuhause bleiben mit heißer Schokolade, basteln oder lesen',
        type: 'winter',
      },
    ],
  },
  {
    zh: '你如何看待「效率」这件事？',
    en: 'Your relationship with productivity:',
    zhTW: '你如何看待「效率」這件事？',
    ja: '「生産性」についてどう思う？',
    ko: '「생산성」에 대한 당신의 관계는?',
    de: 'Deine Beziehung zur Produktivität:',
    options: [
      {
        zh: '充满雄心的新计划，从零开始，什么都是可能的',
        en: 'Ambitious new plans — everything feels possible from zero',
        zhTW: '充滿雄心的新計劃，從零開始，什麼都是可能的',
        ja: '壮大な新計画！ゼロから始めれば何でもできる気がする',
        ko: '야심찬 새 계획! 제로에서 시작하면 뭐든 가능해',
        de: 'Ehrgeizige neue Pläne — von null anfangen, alles scheint möglich',
        type: 'spring',
      },
      {
        zh: '我现在状态最好，全力开动，能赶紧做完就做完',
        en: 'I am at my peak right now — full throttle, get it all done',
        zhTW: '我現在狀態最好，全力開動，能趕緊做完就做完',
        ja: '今が絶好調！全力でやれるだけやってしまいたい',
        ko: '지금이 내 전성기! 할 수 있는 걸 다 해버리고 싶어',
        de: 'Ich bin gerade auf dem Höhepunkt — Vollgas, alles erledigen was geht',
        type: 'summer',
      },
      {
        zh: '收获当初种下的东西，一种深深的满足感',
        en: 'Harvesting what I planted earlier — deep satisfaction',
        zhTW: '收穫當初種下的東西，一種深深的滿足感',
        ja: '以前頑張ったことが実る、あの深い達成感が好き',
        ko: '예전에 심어둔 것들이 열매 맺는, 그 깊은 뿌듯함',
        de: 'Ernten, was ich damals gesät habe — diese tiefe Befriedigung',
        type: 'fall',
      },
      {
        zh: '放慢节奏，休息，思考，为下一步做计划',
        en: 'Slow down, rest, reflect, and plan what comes next',
        zhTW: '放慢節奏，休息，思考，為下一步做計劃',
        ja: 'ちょっとペース落として、ゆっくり考えて次の準備をする',
        ko: '속도를 늦추고, 쉬면서 생각하고, 다음 단계를 준비하기',
        de: 'Tempo rausnehmen, ausruhen, nachdenken, nächste Schritte planen',
        type: 'winter',
      },
    ],
  },
  {
    zh: '你喜欢什么样的社交方式？',
    en: 'Your social style:',
    zhTW: '你喜歡什麼樣的社交方式？',
    ja: '社交スタイルは？',
    ko: '소통 스타일은?',
    de: 'Dein Sozialstil:',
    options: [
      {
        zh: '小型聚会，认识新朋友，参加社区活动',
        en: 'Small gatherings, meeting new people, community events',
        zhTW: '小型聚會，認識新朋友，參加社區活動',
        ja: '小さなパーティーで新しい人と出会ったり地域イベントに参加したり',
        ko: '소모임에서 새로운 사람들 만나고 커뮤니티 행사 참여하기',
        de: 'Kleine Runden, neue Leute kennenlernen, Gemeinschaftsevents',
        type: 'spring',
      },
      {
        zh: '大型派对，户外音乐节，越多人越热闹',
        en: 'Big parties, outdoor festivals, the more the merrier',
        zhTW: '大型派對，戶外音樂節，越多人越熱鬧',
        ja: '大きなフェスや野外パーティー、人が多ければ多いほど楽しい！',
        ko: '대형 파티나 야외 페스티벌, 사람 많을수록 더 좋아!',
        de: 'Große Partys, Open-Air-Festivals, je mehr desto besser!',
        type: 'summer',
      },
      {
        zh: '和亲近的朋友吃一顿温暖的晚餐',
        en: 'A warm dinner with close friends who really know you',
        zhTW: '和親近的朋友吃一頓溫暖的晚餐',
        ja: '仲のいい友達と温かい夕食を囲んで語り合う',
        ko: '가까운 친구들과 따뜻한 저녁 식사',
        de: 'Ein gemütliches Abendessen mit engen Freunden, die einen wirklich kennen',
        type: 'fall',
      },
      {
        zh: '一个人或和一两个很亲密的人待在一起',
        en: 'Alone or with just one or two very close people',
        zhTW: '一個人或和一兩個很親密的人待在一起',
        ja: '一人か、本当に近い一、二人と静かに過ごす',
        ko: '혼자이거나, 아주 친한 한두 명과 조용히',
        de: 'Allein oder nur mit einer oder zwei sehr vertrauten Personen',
        type: 'winter',
      },
    ],
  },
  {
    zh: '选一个你最喜欢的星露谷节日：',
    en: 'Pick your favorite Stardew Valley festival:',
    zhTW: '選一個你最喜歡的星露谷節日：',
    ja: 'スターデューバレーで好きなお祭りは？',
    ko: '스타듀 밸리에서 가장 좋아하는 축제는?',
    de: 'Dein liebstes Stardew Valley Festival:',
    options: [
      {
        zh: '鸡蛋节——春日、捡彩蛋、清晨的小镇广场',
        en: 'Egg Festival — spring, egg hunt, the whole town square',
        zhTW: '雞蛋節——春日、撿彩蛋、清晨的小鎮廣場',
        ja: 'エッグフェスティバル——春の町広場でみんなと卵探し',
        ko: '달걀 축제 — 봄날, 달걀 찾기, 마을 광장에서 다함께',
        de: 'Eierfest — Frühling, Eiersuche, der ganze Dorfplatz ist dabei',
        type: 'spring',
      },
      {
        zh: 'Luau 夏日沙滩派对——烈日、烤肉、热闹的人群',
        en: 'Luau — full sun, beach bonfires, crowded and festive',
        zhTW: 'Luau 夏日沙灘派對——烈日、烤肉、熱鬧的人群',
        ja: 'ルアウ——真夏のビーチパーティー、にぎやかで最高！',
        ko: '루아우 — 한여름 해변 파티, 불꽃놀이, 신나는 분위기',
        de: 'Luau — pralle Sonne, Strandfeuer, festlich und voller Leben',
        type: 'summer',
      },
      {
        zh: '星露谷农场交易会——金秋、比赛、收获奖励',
        en: 'Stardew Valley Fair — golden autumn, contests, harvest prizes',
        zhTW: '星露谷農場交易會——金秋、比賽、收穫獎勵',
        ja: 'スターデューバレーフェア——秋の収穫祭、コンテストで腕試し',
        ko: '스타듀 밸리 박람회 — 황금빛 가을, 대회, 수확 상품',
        de: 'Stardew Valley Fair — goldener Herbst, Wettbewerbe, Erntepreise',
        type: 'fall',
      },
      {
        zh: '夜市——神秘、安静的雪夜、漂浮的灯火',
        en: 'Night Market — mysterious, quiet snowy nights, glowing lights',
        zhTW: '夜市——神秘、安靜的雪夜、漂浮的燈火',
        ja: 'ナイトマーケット——雪の夜、幻想的な光の中を散策',
        ko: '야시장 — 신비롭고, 눈 내리는 조용한 밤, 빛나는 불빛들',
        de: 'Nachtmarkt — geheimnisvoll, ruhige Schneenächte, leuchtende Lichter',
        type: 'winter',
      },
    ],
  },
  {
    zh: '哪种情绪最能代表你现在的状态？',
    en: 'Which emotion best describes your current vibe?',
    zhTW: '哪種情緒最能代表你現在的狀態？',
    ja: '今の自分の気持ちに一番近いのは？',
    ko: '지금 내 기분을 가장 잘 나타내는 감정은?',
    de: 'Welches Gefühl beschreibt deine aktuelle Stimmung am besten?',
    options: [
      {
        zh: '充满希望，跃跃欲试，对未来很期待',
        en: 'Hopeful and eager — excited about what is ahead',
        zhTW: '充滿希望，躍躍欲試，對未來很期待',
        ja: 'これからが楽しみ、なんでもできそうな希望に満ちた気持ち',
        ko: '희망적이고 설레는, 앞으로가 너무 기대돼',
        de: 'Hoffnungsvoll und gespannt — ich freu mich auf das, was kommt',
        type: 'spring',
      },
      {
        zh: '充满活力，自信，处于人生的高峰时刻',
        en: 'Energized and confident — at my personal peak',
        zhTW: '充滿活力，自信，處於人生的高峰時刻',
        ja: 'エネルギー全開！自信もあって最高潮な感じ',
        ko: '에너지 넘치고 자신감 있는, 지금이 내 절정이야',
        de: 'Voller Energie und selbstsicher — ich bin gerade auf meinem Höhepunkt',
        type: 'summer',
      },
      {
        zh: '感恩，满足，珍惜现在拥有的一切',
        en: 'Grateful and content — appreciating everything I have',
        zhTW: '感恩，滿足，珍惜現在擁有的一切',
        ja: '感謝と満足感、今持っているものをじっくり味わいたい',
        ko: '감사하고 만족스러운, 지금 가진 것들이 소중해',
        de: 'Dankbar und zufrieden — ich schätze alles, was ich habe',
        type: 'fall',
      },
      {
        zh: '内省，安静，喜欢一个人慢慢想事情',
        en: 'Introspective and quiet — savoring slow, deep thinking',
        zhTW: '內省，安靜，喜歡一個人慢慢想事情',
        ja: '内省的で静か、一人でじっくり考えたい気分',
        ko: '내성적이고 조용한, 혼자 천천히 생각하고 싶어',
        de: 'Nachdenklich und still — ich genieße ruhiges, tiefes Denken',
        type: 'winter',
      },
    ],
  },
  {
    zh: '你在星露谷最享受哪种活动？',
    en: 'Your favorite thing to do in Stardew Valley:',
    zhTW: '你在星露谷最享受哪種活動？',
    ja: 'スターデューバレーで一番好きな活動は？',
    ko: '스타듀 밸리에서 가장 즐기는 활동은?',
    de: 'Was machst du am liebsten in Stardew Valley?',
    options: [
      {
        zh: '种下新作物，和新村民交朋友，规划农场布局',
        en: 'Planting new crops, befriending villagers, planning the farm layout',
        zhTW: '種下新作物，和新村民交朋友，規劃農場布局',
        ja: '新しい作物を植えて、村人と仲良くなって、農場のレイアウトを考える',
        ko: '새 작물 심고, 마을 사람들과 친해지고, 농장 레이아웃 구상하기',
        de: 'Neue Pflanzen setzen, mit Dorfbewohnern Freundschaft schließen, den Bauernhof planen',
        type: 'spring',
      },
      {
        zh: '高强度挖矿，赚大钱，把所有事情做到最高效',
        en: 'Mining hard, earning big, making everything maximally efficient',
        zhTW: '高強度挖礦，賺大錢，把所有事情做到最高效',
        ja: 'ガッツリ採掘してガッポリ稼いで、全部最大効率でこなす',
        ko: '열심히 광산 캐고, 돈 많이 벌고, 모든 걸 최대 효율로',
        de: 'Hart in der Mine schuften, Geld verdienen, alles auf maximale Effizienz trimmen',
        type: 'summer',
      },
      {
        zh: '大丰收，参加农场交易会，填满整个谷仓',
        en: 'Big harvests, the Stardew Valley Fair, filling the barn',
        zhTW: '大豐收，參加農場交易會，填滿整個穀倉',
        ja: '大収穫！スターデューバレーフェアに参加して、納屋を満杯にする',
        ko: '대풍작, 스타듀 밸리 박람회, 헛간 가득 채우기',
        de: 'Die große Ernte einfahren, zur Stardew Valley Fair gehen, die Scheune füllen',
        type: 'fall',
      },
      {
        zh: '在雪地里做工艺品，逛夜市，和村民聊心事',
        en: 'Crafting in the snow, browsing the Night Market, deep talks with villagers',
        zhTW: '在雪地裡做工藝品，逛夜市，和村民聊心事',
        ja: '雪の中でクラフト、ナイトマーケットをぶらぶら、村人と深い話をする',
        ko: '눈 속에서 공예품 만들고, 야시장 구경하고, 마을 사람들과 깊은 대화',
        de: 'Im Schnee basteln, über den Nachtmarkt schlendern, tiefe Gespräche mit Dorfbewohnern',
        type: 'winter',
      },
    ],
  },
]

interface Result {
  season: Season
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
  cropsZh: string[]
  cropsEn: string[]
  cropsZhTW: string[]
  cropsJa: string[]
  cropsKo: string[]
  cropsDe: string[]
  villagerZh: string
  villagerEn: string
  villagerZhTW: string
  villagerJa: string
  villagerKo: string
  villagerDe: string
}

const RESULTS: Record<Season, Result> = {
  spring: {
    season: 'spring',
    nameZh: '🌸 春天',
    nameEn: '🌸 Spring',
    nameZhTW: '🌸 春天',
    nameJa: '🌸 春',
    nameKo: '🌸 봄',
    nameDe: '🌸 Frühling',
    emoji: '🌸',
    taglineZh: '充满希望的新开始',
    taglineEn: 'Full of hope and fresh beginnings',
    taglineZhTW: '充滿希望的嶄新開始',
    taglineJa: '希望に満ちたはじまりの季節',
    taglineKo: '희망 가득한 새로운 시작',
    taglineDe: 'Voller Hoffnung und frischer Anfänge',
    descZh:
      '你的灵魂是春天的——充满希望，跃跃欲试，总是对新事物怀有期待。你喜欢从零开始规划一切，像种下第一粒种子一样，相信只要用心浇灌，一切都会有所收获。你活在可能性里，而不是局限里。朋友们说你有一种「让人想跟着你一起开始新事情」的能量。',
    descEn:
      "Your soul is spring — full of hope, eager to start, always excited about new possibilities. You love planning everything from scratch, believing that with enough care and attention, anything can grow. You live in possibilities, not limitations. Friends say you have an energy that makes them want to start something new too.",
    descZhTW:
      '你的靈魂是春天的——充滿希望，躍躍欲試，總是對新事物懷有期待。你喜歡從零開始規劃一切，像種下第一粒種子一樣，相信只要用心澆灌，一切都會有所收穫。你活在可能性裡，而不是局限裡。朋友們說你有一種「讓人想跟著你一起開始新事情」的能量。',
    descJa:
      'あなたの魂は春——希望に満ちていて、いつも新しいことへのワクワクを持っている。ゼロから計画を立てるのが好きで、最初の種を蒔くように、愛情を注げば必ず実ると信じている。可能性の中に生きていて、制限の中には生きていない。「一緒に何か新しいことを始めたくなる」、そんなエネルギーを持っていると友人たちは言う。',
    descKo:
      '당신의 영혼은 봄입니다 — 희망으로 가득하고, 늘 새로운 것에 설레는 사람. 모든 걸 처음부터 계획하는 걸 좋아하고, 첫 씨앗을 심듯 정성껏 돌보면 반드시 결실이 있다고 믿어요. 가능성 속에서 살아가는 사람이지, 한계 안에서 사는 사람이 아니에요. 친구들은 당신 곁에 있으면 "나도 뭔가 새로 시작하고 싶다"는 마음이 든다고 해요.',
    descDe:
      'Deine Seele ist der Frühling — voller Hoffnung, immer bereit loszulegen, immer aufgeregt über neue Möglichkeiten. Du planst gerne alles von Grund auf neu, als ob du das erste Samenkorn einpflanzt — und glaubst daran, dass aus Fürsorge und Aufmerksamkeit immer etwas wächst. Du lebst in Möglichkeiten, nicht in Grenzen. Deine Freunde sagen, du hast eine Energie, die sie selbst dazu bringt, etwas Neues zu starten.',
    cropsZh: ['草莓（鸡蛋节购买）', '大蒜', '郁金香', '花椰菜'],
    cropsEn: ['Strawberries (Egg Festival)', 'Garlic', 'Tulips', 'Cauliflower'],
    cropsZhTW: ['草莓（雞蛋節購買）', '大蒜', '鬱金香', '花椰菜'],
    cropsJa: ['ストロベリー（エッグフェスティバル）', 'ニンニク', 'チューリップ', 'カリフラワー'],
    cropsKo: ['딸기 (달걀 축제)', '마늘', '튤립', '콜리플라워'],
    cropsDe: ['Erdbeeren (Eierfest)', 'Knoblauch', 'Tulpen', 'Blumenkohl'],
    villagerZh: '潘妮——她的温柔和对未来的希望，与你的春天灵魂完美共鸣。',
    villagerEn: "Penny — her gentleness and hope for the future perfectly mirrors your spring soul.",
    villagerZhTW: '潘妮——她的溫柔和對未來的希望，與你的春天靈魂完美共鳴。',
    villagerJa: 'ペニー——彼女の優しさと未来への希望は、あなたの春の魂と完璧に共鳴する。',
    villagerKo: '페니 — 그녀의 따뜻함과 미래에 대한 희망이 당신의 봄 영혼과 완벽하게 공명해요.',
    villagerDe: 'Penny — ihre Sanftheit und ihre Hoffnung auf die Zukunft spiegelt deine Frühlingsseele perfekt wider.',
  },
  summer: {
    season: 'summer',
    nameZh: '☀️ 夏天',
    nameEn: '☀️ Summer',
    nameZhTW: '☀️ 夏天',
    nameJa: '☀️ 夏',
    nameKo: '☀️ 여름',
    nameDe: '☀️ Sommer',
    emoji: '☀️',
    taglineZh: '全力开动，处于巅峰',
    taglineEn: 'Full throttle, at your absolute peak',
    taglineZhTW: '全力開動，處於巔峰',
    taglineJa: 'フルスロットル、人生のピーク',
    taglineKo: '전력 질주, 절대적 전성기',
    taglineDe: 'Vollgas, auf dem absoluten Höhepunkt',
    descZh:
      '你的灵魂是夏天的——充沛的能量，强烈的存在感，你最享受全力运转的感觉。你不喜欢慢吞吞，你相信现在就是做事的时候。在星露谷里，你会在夏天把矿洞打穿、赚最多的钱、参加每一个节日。你有一种感染力，让周围的人也振奋起来。',
    descEn:
      "Your soul is summer — abundant energy, strong presence, you love the feeling of running at full capacity. You don't like slow. You believe now is the time to act. In Stardew Valley, you would mine through every level, earn the most gold, and attend every festival. You are contagious — your energy lifts everyone around you.",
    descZhTW:
      '你的靈魂是夏天的——充沛的能量，強烈的存在感，你最享受全力運轉的感覺。你不喜歡慢吞吞，你相信現在就是做事的時候。在星露谷裡，你會在夏天把礦洞打穿、賺最多的錢、參加每一個節日。你有一種感染力，讓周圍的人也振奮起來。',
    descJa:
      'あなたの魂は夏——エネルギーにあふれ、存在感が強く、フル回転している感覚が最高に好き。のんびりしているのは性に合わない。今こそやる時だ、と信じている。スターデューバレーなら夏中ずっと鉱山を掘りまくり、ゴールドを稼ぎ、すべてのフェスに参加するはず。その熱量は周りの人をも元気にする。',
    descKo:
      '당신의 영혼은 여름입니다 — 에너지가 넘치고, 존재감이 강하며, 풀 가동하는 그 느낌을 가장 즐기는 사람. 느긋함은 맞지 않아요. 지금 바로 행동해야 할 때라고 믿거든요. 스타듀 밸리에서는 광산을 끝까지 파고, 골드를 최대로 벌고, 모든 축제에 참가하는 타입이에요. 그 에너지가 주변 사람들까지 힘나게 해요.',
    descDe:
      "Deine Seele ist der Sommer — voller Energie, starke Präsenz, du liebst das Gefühl auf Hochtouren zu laufen. Du magst kein Schneckentempo. Du glaubst: Jetzt ist die Zeit zum Handeln. In Stardew Valley würdest du die Mine bis auf den Grund abbauen, das meiste Gold verdienen und jedes Festival besuchen. Du bist ansteckend — deine Energie reißt alle mit.",
    cropsZh: ['蓝莓', '星果', '辣椒', '红色卷心菜'],
    cropsEn: ['Blueberries', 'Starfruit', 'Hot Peppers', 'Red Cabbage'],
    cropsZhTW: ['藍莓', '星果', '辣椒', '紅色捲心菜'],
    cropsJa: ['ブルーベリー', 'スターフルーツ', 'ホットペッパー', 'レッドキャベツ'],
    cropsKo: ['블루베리', '스타프루트', '핫 페퍼', '레드 캐비지'],
    cropsDe: ['Blaubeeren', 'Sternfrucht', 'Chilischoten', 'Rotkohl'],
    villagerZh: '艾米莉——她的热情、创造力和满满的能量，就是夏天本天了。',
    villagerEn: "Emily — her enthusiasm, creativity, and overflowing energy is summer personified.",
    villagerZhTW: '艾米莉——她的熱情、創造力和滿滿的能量，就是夏天本身了。',
    villagerJa: 'エミリー——彼女の情熱、創造力、あふれるエネルギーはまさに夏そのもの。',
    villagerKo: '에밀리 — 그녀의 열정, 창의력, 넘치는 에너지가 바로 여름 그 자체예요.',
    villagerDe: 'Emily — ihre Begeisterung, Kreativität und übersprudelnde Energie ist der Sommer in Person.',
  },
  fall: {
    season: 'fall',
    nameZh: '🍂 秋天',
    nameEn: '🍂 Fall',
    nameZhTW: '🍂 秋天',
    nameJa: '🍂 秋',
    nameKo: '🍂 가을',
    nameDe: '🍂 Herbst',
    emoji: '🍂',
    taglineZh: '感恩收获，享受当下所有',
    taglineEn: 'Grateful for the harvest, savoring everything',
    taglineZhTW: '感恩收穫，享受當下所有',
    taglineJa: '収穫に感謝し、今あるものを味わう',
    taglineKo: '수확에 감사하며, 지금 이 순간 만끽하기',
    taglineDe: 'Dankbar für die Ernte, jeden Moment genießen',
    descZh:
      '你的灵魂是秋天的——深沉、温暖、感恩。你懂得欣赏事情「发展到最好」的那个时刻，你不追逐，你等待，然后在对的时机好好收获。你喜欢温暖的色调、有重量的食物、有深度的对话。你的农场是那种让人看一眼就觉得「这里有故事」的地方。',
    descEn:
      "Your soul is fall — deep, warm, and grateful. You know how to appreciate when things have 'reached their best,' you don't chase, you wait, then harvest at exactly the right moment. You love warm tones, substantial food, and deep conversations. Your farm is the kind of place where people look once and think: there's a story here.",
    descZhTW:
      '你的靈魂是秋天的——深沉、溫暖、感恩。你懂得欣賞事情「發展到最好」的那個時刻，你不追逐，你等待，然後在對的時機好好收穫。你喜歡溫暖的色調、有重量的食物、有深度的對話。你的農場是那種讓人看一眼就覺得「這裡有故事」的地方。',
    descJa:
      "あなたの魂は秋——深みがあって、温かくて、感謝に満ちている。物事が「最高の状態に達した」瞬間を味わうのが上手。追いかけるのではなく、待って、ちょうどいい時に丁寧に収穫する。温かい色合い、食べ応えのある料理、深い話が好き。あなたの農場は「なにか物語がある」と感じさせる場所。",
    descKo:
      '당신의 영혼은 가을입니다 — 깊이 있고, 따뜻하고, 감사할 줄 아는 사람. 무언가가 "최고로 무르익은" 그 순간을 알아보는 눈이 있어요. 쫓지 않고 기다렸다가, 딱 맞는 타이밍에 정성껏 수확해요. 따뜻한 색감, 든든한 음식, 깊이 있는 대화를 좋아해요. 당신의 농장은 보는 사람마다 "여기엔 이야기가 있다"고 느끼는 곳이에요.',
    descDe:
      'Deine Seele ist der Herbst — tief, warm und dankbar. Du weißt, wie man den Moment schätzt, in dem Dinge „ihren Höhepunkt erreicht haben." Du jagst nicht; du wartest, und erntest dann zum genau richtigen Zeitpunkt. Du liebst warme Farbtöne, herzhaftes Essen und tiefe Gespräche. Dein Bauernhof ist der Ort, wo Besucher sofort denken: Hier steckt eine Geschichte drin.',
    cropsZh: ['南瓜', '葡萄', '紫薯', '山药'],
    cropsEn: ['Pumpkins', 'Grapes', 'Bok Choy', 'Yam'],
    cropsZhTW: ['南瓜', '葡萄', '紫薯', '山藥'],
    cropsJa: ['かぼちゃ', 'ぶどう', 'チンゲン菜', 'ヤマイモ'],
    cropsKo: ['호박', '포도', '청경채', '얌'],
    cropsDe: ['Kürbisse', 'Weintrauben', 'Chinakohl', 'Yamswurzel'],
    villagerZh: '莱亚——她对土地、自然和真实生活的深深欣赏，和秋天的你如出一辙。',
    villagerEn: "Leah — her deep appreciation for the land, nature, and authentic living mirrors your fall soul exactly.",
    villagerZhTW: '萊亞——她對土地、自然和真實生活的深深欣賞，和秋天的你如出一轍。',
    villagerJa: 'レア——土地と自然と本物の暮らしへの深い愛情は、秋のあなたとまさに重なり合う。',
    villagerKo: '레아 — 땅과 자연, 진짜 삶에 대한 그녀의 깊은 애정이 가을의 당신과 꼭 닮았어요.',
    villagerDe: 'Leah — ihre tiefe Wertschätzung für die Erde, die Natur und das authentische Leben spiegelt deine Herbstseele haargenau.',
  },
  winter: {
    season: 'winter',
    nameZh: '❄️ 冬天',
    nameEn: '❄️ Winter',
    nameZhTW: '❄️ 冬天',
    nameJa: '❄️ 冬',
    nameKo: '❄️ 겨울',
    nameDe: '❄️ Winter',
    emoji: '❄️',
    taglineZh: '内省、手工与深度的安静',
    taglineEn: 'Introspective, crafting, and the quiet of depth',
    taglineZhTW: '內省、手工與深度的安靜',
    taglineJa: '内省、クラフト、静かな深さ',
    taglineKo: '내향적이고, 손 작업 좋아하고, 깊고 조용한',
    taglineDe: 'Nachdenklich, bastelnd, in der Stille der Tiefe',
    descZh:
      '你的灵魂是冬天的——安静，深沉，有一种别人不一定能感受到的内在世界。你不喜欢表面的热闹，你在一段安静里找到真实的自己。在星露谷里，你最享受雪地里的工艺制作、夜市的神秘灯光、和村民在温暖的房间里聊心里话。你的深度是你最大的力量。',
    descEn:
      "Your soul is winter — quiet, deep, with an inner world others may not always see. You don't like surface noise; you find your true self in stillness. In Stardew Valley, you love crafting in the snow, the Night Market's mysterious lights, and deep conversations with villagers in warm rooms. Your depth is your greatest strength.",
    descZhTW:
      '你的靈魂是冬天的——安靜，深沉，有一種別人不一定能感受到的內在世界。你不喜歡表面的熱鬧，你在一段安靜裡找到真實的自己。在星露谷裡，你最享受雪地裡的工藝製作、夜市的神秘燈光、和村民在溫暖的房間裡聊心裡話。你的深度是你最大的力量。',
    descJa:
      "あなたの魂は冬——静かで、深くて、他の人にはなかなか見えない内なる世界を持っている。表面的なにぎやかさは好きじゃない。静寂の中でこそ、本当の自分に出会える。スターデューバレーでは雪の中でのクラフト、ナイトマーケットの幻想的な明かり、温かい室内での村人との深い会話が一番好き。その深さが、あなたの最大の強さ。",
    descKo:
      '당신의 영혼은 겨울입니다 — 조용하고, 깊이 있고, 남들이 잘 알아채지 못하는 내면 세계를 가진 사람. 겉으로 드러나는 시끌벅적함은 좋아하지 않아요. 고요함 속에서 진짜 나를 찾아요. 스타듀 밸리에서는 눈 속에서 공예, 야시장의 신비로운 빛, 따뜻한 방에서 마을 사람들과 나누는 깊은 대화가 가장 좋아요. 그 깊이가 당신의 가장 큰 강점이에요.',
    descDe:
      "Deine Seele ist der Winter — still, tief, mit einer inneren Welt, die andere nicht immer sehen. Du magst keinen oberflächlichen Lärm; in der Stille findest du dein wahres Selbst. In Stardew Valley liebst du das Basteln im Schnee, die mystischen Lichter des Nachtmarkts und tiefe Gespräche mit Dorfbewohnern in warmen Räumen. Deine Tiefe ist deine größte Stärke.",
    cropsZh: ['（冬天不能户外种植）', '冬季根（采集物）', '雪薯（采集物）', '冰柱（采集物）'],
    cropsEn: ['(No outdoor crops in winter)', 'Winter Root (forage)', 'Snow Yam (forage)', 'Crystal Fruit (forage)'],
    cropsZhTW: ['（冬天不能戶外種植）', '冬季根（採集物）', '雪薯（採集物）', '水晶果（採集物）'],
    cropsJa: ['（冬は屋外栽培不可）', 'ウィンタールート（採集）', 'スノーヤム（採集）', 'クリスタルフルーツ（採集）'],
    cropsKo: ['(겨울엔 야외 재배 불가)', '윈터 루트 (채집)', '스노 얌 (채집)', '크리스탈 프루트 (채집)'],
    cropsDe: ['(Kein Anbau im Freien im Winter)', 'Winterwurzel (Wildpflanzen)', 'Schneeknollen (Wildpflanzen)', 'Kristallfrucht (Wildpflanzen)'],
    villagerZh: '塞巴斯蒂安——他的内省、真实和对安静深度的追求，就是冬天灵魂的完美体现。',
    villagerEn: "Sebastian — his introspection, authenticity, and love for quiet depth is the winter soul perfected.",
    villagerZhTW: '塞巴斯蒂安——他的內省、真實和對安靜深度的追求，就是冬天靈魂的完美體現。',
    villagerJa: 'セバスチャン——内省的で、本音を大切にし、静かな深みを求める彼は、冬の魂そのもの。',
    villagerKo: '세바스찬 — 내성적이고, 진실하며, 조용한 깊이를 추구하는 그가 바로 겨울 영혼의 완벽한 체현이에요.',
    villagerDe: 'Sebastian — seine Nachdenklichkeit, Authentizität und Liebe zur stillen Tiefe ist die vollendete Winterseele.',
  },
}

function calcResult(answers: Season[]): Season {
  const counts: Record<Season, number> = { spring: 0, summer: 0, fall: 0, winter: 0 }
  answers.forEach((a) => counts[a]++)
  return (Object.keys(counts) as Season[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b))
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
      <button onClick={handleCopy} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]">
        {copyLabel}
      </button>
      <a href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]">
        𝕏 {shareLabel}
      </a>
    </div>
  )
}

interface Props {
  locale: string
}

export function StardewSeasonQuiz({ locale }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Season[]>([])

  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const handleAnswer = (type: Season) => {
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
        <div className="mb-6 text-6xl">🍃</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {getLoc('你是哪个星露谷季节？', 'Which Stardew Valley Season Are You?', '你是哪個星露谷季節？', 'あなたはスターデューバレーのどの季節？', '당신은 스타듀 밸리의 어떤 계절인가요?', 'Welche Stardew Valley Saison bist du?')}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {getLoc(
            '6 个关于性格和生活方式的问题，测出你的灵魂季节是春天、夏天、秋天还是冬天——附专属村民和推荐农场攻略。',
            '6 questions about your personality and lifestyle to reveal your soul season — Spring, Summer, Fall, or Winter? Includes villager match and farm tips.',
            '6 個關於性格和生活方式的問題，測出你的靈魂季節是春天、夏天、秋天還是冬天——附專屬村民和推薦農場攻略。',
            '6つの性格・ライフスタイル質問で、あなたの魂の季節を診断——春・夏・秋・冬？ 相性の村人と農場アドバイス付き。',
            '6가지 성격 및 라이프스타일 질문으로 당신의 영혼 계절을 알아보세요 — 봄, 여름, 가을, 겨울? 마을 사람 매칭 및 농장 팁 포함.',
            '6 Fragen zu deiner Persönlichkeit und deinem Lebensstil enthüllen deine Seelensaison — Frühling, Sommer, Herbst oder Winter? Mit Dorfbewohner-Match und Farmtipps.',
          )}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {getLoc(
            '分享给朋友，看看你们是什么季节配对 →',
            'Share with friends to see what season pair you make →',
            '分享給朋友，看看你們是什麼季節配對 →',
            '友達とシェアして、どの季節コンビか確かめよう →',
            '친구에게 공유해서 어떤 계절 조합인지 확인해보세요 →',
            'Teile es mit Freunden und schau, welche Saisonen ihr seid →',
          )}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {getLoc('测出我的季节 →', 'Find My Season →', '測出我的季節 →', '季節を診断する →', '내 계절 찾기 →', 'Meine Saison finden →')}
        </button>
      </div>
    )
  }

  if (step === QUESTIONS.length + 1) {
    const season = calcResult(answers)
    const result = RESULTS[season]

    const seasonName = getLoc(result.nameZh, result.nameEn, result.nameZhTW, result.nameJa, result.nameKo, result.nameDe)
    const url = `https://www.farmgamehub.com/${locale}/quizzes/stardew-season`
    const shareText = getLoc(
      `我的星露谷灵魂季节是「${result.nameZh}」！来测测你的：${url}`,
      `My Stardew Valley season soul is ${result.nameEn}! Find yours: ${url}`,
      `我的星露谷靈魂季節是「${result.nameZhTW}」！來測測你的：${url}`,
      `私のスターデューバレーの魂の季節は「${result.nameJa}」！あなたも診断してみて：${url}`,
      `제 스타듀 밸리 영혼 계절은 「${result.nameKo}」예요! 당신도 테스트해보세요: ${url}`,
      `Meine Stardew Valley Seelensaison ist „${result.nameDe}"! Finde deine: ${url}`,
    )

    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {getLoc('你的灵魂季节是', 'Your soul season is:', '你的靈魂季節是', 'あなたの魂の季節は', '당신의 영혼 계절은', 'Deine Seelensaison ist:')}
          </p>
          <h2 className="text-3xl font-bold text-[#f0a832]">
            {seasonName}
          </h2>
          <p className="mt-1 text-sm text-[#8a9a7a]">
            {getLoc(result.taglineZh, result.taglineEn, result.taglineZhTW, result.taglineJa, result.taglineKo, result.taglineDe)}
          </p>
        </div>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-5">
          <p className="leading-relaxed text-[#e8dcc8]">
            {getLoc(result.descZh, result.descEn, result.descZhTW, result.descJa, result.descKo, result.descDe)}
          </p>
        </div>

        {/* Crops */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold text-[#8a9a7a]">
            {getLoc('你的季节代表作物', 'Your season signature crops', '你的季節代表作物', 'あなたの季節の代表作物', '당신의 계절 대표 작물', 'Deine saisonalen Signaturpflanzen')}
          </p>
          <div className="flex flex-wrap gap-2">
            {(locale === 'zh' ? result.cropsZh : locale === 'zh-TW' ? result.cropsZhTW : locale === 'ja' ? result.cropsJa : locale === 'ko' ? result.cropsKo : locale === 'de' ? result.cropsDe : result.cropsEn).map((c) => (
              <span key={c} className="rounded-full border border-[#2d5a27] px-3 py-1 text-sm text-[#e8dcc8]">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Villager match */}
        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 p-4">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">
            {getLoc('最契合你的村民', 'Your villager match', '最契合你的村民', 'あなたの相性の村人', '당신과 잘 맞는 마을 사람', 'Dein passender Dorfbewohner')}
          </p>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(result.villagerZh, result.villagerEn, result.villagerZhTW, result.villagerJa, result.villagerKo, result.villagerDe)}
          </p>
        </div>

        {/* Share */}
        <div className="mb-6">
          <p className="mb-3 text-sm text-[#8a9a7a]">
            {getLoc('看看朋友是什么季节 →', 'See what season your friends are →', '看看朋友是什麼季節 →', '友達の季節もチェック →', '친구의 계절도 확인해보세요 →', 'Schau, welche Saison deine Freunde sind →')}
          </p>
          <ShareButton text={shareText} locale={locale} />
        </div>

        <div className="text-center">
          <button
            onClick={reset}
            className="text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やる', '다시 테스트하기', 'Nochmal machen')}
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
        {getLoc(q.zh, q.en, q.zhTW, q.ja, q.ko, q.de)}
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
          className="mt-4 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
        >
          ← {getLoc('上一题', 'Previous', '上一題', '前の質問', '이전 질문', 'Zurück')}
        </button>
      )}
    </div>
  )
}
