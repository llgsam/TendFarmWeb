'use client'

import { useState } from 'react'
import Link from 'next/link'

type Character = 'abigail' | 'leah' | 'penny' | 'sebastian' | 'elliott'

interface Option {
  zh: string
  en: string
  zhTW: string
  ja: string
  ko: string
  de: string
  type: Character
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
    zh: '放假一整天，你最想做什么？',
    en: "It's a free day. What do you do?",
    zhTW: '放假一整天，你最想做什麼？',
    ja: '丸一日自由な時間があったら、何をする？',
    ko: '하루 종일 자유 시간이 생겼다면, 무엇을 하고 싶나요?',
    de: 'Du hast einen freien Tag. Was machst du?',
    options: [
      {
        zh: '去探索不熟悉的地方，越刺激越好',
        en: 'Explore somewhere unfamiliar — the more adventurous, the better',
        zhTW: '去探索不熟悉的地方，越刺激越好',
        ja: '知らない場所を探索する。スリルがあればあるほどいい',
        ko: '낯선 곳을 탐험하러 간다 — 스릴 있을수록 좋다',
        de: 'Irgendwo Unbekanntes erkunden — je aufregender, desto besser',
        type: 'abigail',
      },
      {
        zh: '一个人在工作室或大自然里搞创作',
        en: 'Spend it alone creating — art, woodwork, or just being in nature',
        zhTW: '一個人在工作室或大自然裡搞創作',
        ja: '一人でアトリエか自然の中で制作活動をする',
        ko: '혼자 작업실이나 자연 속에서 창작 활동을 한다',
        de: 'Allein im Atelier oder in der Natur kreativ sein',
        type: 'leah',
      },
      {
        zh: '陪家人或朋友，帮他们做点什么',
        en: 'Spend it with family or friends — helping, cooking, being there',
        zhTW: '陪家人或朋友，幫他們做點什麼',
        ja: '家族や友達と一緒に過ごす。料理したり、そばにいたり',
        ko: '가족이나 친구와 함께 보낸다 — 도와주거나, 요리하거나, 곁에 있어준다',
        de: 'Zeit mit Familie oder Freunden verbringen — helfen, kochen, einfach da sein',
        type: 'penny',
      },
      {
        zh: '一个人宅在家里，谢绝所有打扰',
        en: 'Stay home completely alone — no interruptions, no people',
        zhTW: '一個人宅在家裡，謝絕所有打擾',
        ja: '完全に一人で家にこもる。邪魔なし、人なし',
        ko: '집에서 혼자 완전히 틀어박혀 있는다 — 방해 없음, 사람 없음',
        de: 'Zuhause bleiben, komplett allein — keine Unterbrechungen, keine Menschen',
        type: 'sebastian',
      },
      {
        zh: '找个安静的地方读书、写东西，或者看海',
        en: 'Sit somewhere beautiful — reading, writing, or watching the sea',
        zhTW: '找個安靜的地方讀書、寫東西，或者看海',
        ja: '静かな場所で本を読んだり、書き物をしたり、海を眺めたり',
        ko: '조용한 곳에서 독서, 글쓰기, 혹은 바다를 바라본다',
        de: 'An einem schönen Ort sitzen — lesen, schreiben oder aufs Meer schauen',
        type: 'elliott',
      },
    ],
  },
  {
    zh: '你最欣赏别人哪种品质？',
    en: 'What quality do you admire most in others?',
    zhTW: '你最欣賞別人哪種品質？',
    ja: '他の人のどんなところを一番尊敬する？',
    ko: '다른 사람에게서 가장 존경하는 자질은 무엇인가요?',
    de: 'Welche Eigenschaft bewunderst du bei anderen am meisten?',
    options: [
      {
        zh: '敢做自己，不怕别人怎么看',
        en: 'Being unapologetically themselves — not caring what others think',
        zhTW: '敢做自己，不怕別人怎麼看',
        ja: '人目を気にせず、自分らしくいられること',
        ko: '남의 시선을 신경 쓰지 않고 자기 자신답게 사는 것',
        de: 'Unentschuldigt sie selbst zu sein — egal was andere denken',
        type: 'abigail',
      },
      {
        zh: '为了梦想坚持下去，哪怕很难',
        en: 'Sticking to a dream even when it is hard',
        zhTW: '為了夢想堅持下去，哪怕很難',
        ja: '困難でも夢を諦めずに続けること',
        ko: '힘들어도 꿈을 포기하지 않고 계속 나아가는 것',
        de: 'An einem Traum festhalten, auch wenn es schwer ist',
        type: 'leah',
      },
      {
        zh: '真心为别人着想，温柔而有力量',
        en: 'Genuine care for others — quiet strength and warmth',
        zhTW: '真心為別人著想，溫柔而有力量',
        ja: '本当の意味で人を思いやること。静かな強さと温かさ',
        ko: '진심으로 타인을 배려하는 것 — 조용한 강인함과 따뜻함',
        de: 'Echte Fürsorge für andere — stille Stärke und Wärme',
        type: 'penny',
      },
      {
        zh: '聪明、真实，不在乎表面形象',
        en: 'Intelligence and authenticity — not playing a role',
        zhTW: '聰明、真實，不在乎表面形象',
        ja: '賢くて素直なこと。見せかけを気にしない',
        ko: '지적이고 진실된 것 — 역할극 같은 걸 하지 않는 것',
        de: 'Intelligenz und Authentizität — keine Rolle spielen',
        type: 'sebastian',
      },
      {
        zh: '有深度，能感受到生活中细微的美',
        en: 'Depth of feeling — someone who notices the subtle beauty of life',
        zhTW: '有深度，能感受到生活中細微的美',
        ja: '感受性の深さ。日常の細やかな美しさに気づける人',
        ko: '감수성의 깊이 — 삶의 미묘한 아름다움을 알아채는 사람',
        de: 'Tiefes Gefühlsleben — jemand, der die subtile Schönheit des Lebens wahrnimmt',
        type: 'elliott',
      },
    ],
  },
  {
    zh: '压力大的时候，你最可能做什么？',
    en: 'When you feel stressed or overwhelmed, you:',
    zhTW: '壓力大的時候，你最可能做什麼？',
    ja: 'ストレスを感じたとき、どうすることが多い？',
    ko: '스트레스를 받거나 힘들 때, 당신은?',
    de: 'Wenn du gestresst oder überfordert bist, was machst du?',
    options: [
      {
        zh: '去做点有意思的事，转移注意力',
        en: 'Do something fun or different to take your mind off it',
        zhTW: '去做點有意思的事，轉移注意力',
        ja: '気分転換に楽しいことや違うことをやってみる',
        ko: '재밌는 것을 하거나 다른 활동으로 기분 전환을 한다',
        de: 'Etwas Spaßiges oder Anderes tun, um auf andere Gedanken zu kommen',
        type: 'abigail',
      },
      {
        zh: '一个人在户外走走，用双手做点东西',
        en: 'Go outside alone or work with your hands',
        zhTW: '一個人在戶外走走，用雙手做點東西',
        ja: '一人で外に出るか、手を動かして何かを作る',
        ko: '혼자 밖에 나가거나 손으로 무언가를 만든다',
        de: 'Allein nach draußen gehen oder mit den Händen etwas schaffen',
        type: 'leah',
      },
      {
        zh: '找人倾诉，或者去帮助别人',
        en: 'Talk to someone close, or shift focus to helping someone else',
        zhTW: '找人傾訴，或者去幫助別人',
        ja: '誰かに話を聞いてもらうか、他の人を助けることに意識を向ける',
        ko: '누군가에게 털어놓거나, 다른 사람을 돕는 데 집중한다',
        de: 'Mit jemandem reden oder sich aufs Helfen konzentrieren',
        type: 'penny',
      },
      {
        zh: '需要完全独处，把所有人都关在门外',
        en: 'Need total solitude — shut everyone out until it passes',
        zhTW: '需要完全獨處，把所有人都關在門外',
        ja: '完全に一人になる必要がある。落ち着くまで全員シャットアウト',
        ko: '완전한 고독이 필요하다 — 지나갈 때까지 모두를 차단한다',
        de: 'Totale Einsamkeit brauchen — alle ausschließen, bis es vorbeigeht',
        type: 'sebastian',
      },
      {
        zh: '把感受写下来或者变成某种创作',
        en: 'Turn the feeling into words, music, or something creative',
        zhTW: '把感受寫下來或者變成某種創作',
        ja: 'その感情を言葉や音楽、何か創造的なものに変える',
        ko: '그 감정을 글이나 음악, 혹은 창작으로 표현한다',
        de: 'Das Gefühl in Worte, Musik oder etwas Kreatives verwandeln',
        type: 'elliott',
      },
    ],
  },
  {
    zh: '你觉得人生最重要的事是？',
    en: 'What matters most to you in life?',
    zhTW: '你覺得人生最重要的事是？',
    ja: '人生で一番大切なことって何だと思う？',
    ko: '인생에서 가장 중요한 것은 무엇이라고 생각하나요?',
    de: 'Was ist dir im Leben am wichtigsten?',
    options: [
      {
        zh: '每天都过得有意思、有故事可以讲',
        en: 'Living days worth telling stories about',
        zhTW: '每天都過得有意思、有故事可以講',
        ja: '語れるような毎日を生きること',
        ko: '이야기할 만한 하루하루를 사는 것',
        de: 'Tage leben, über die es sich lohnt zu erzählen',
        type: 'abigail',
      },
      {
        zh: '创造出真正属于自己的东西',
        en: 'Creating something that is genuinely yours',
        zhTW: '創造出真正屬於自己的東西',
        ja: '本当に自分のものと言える何かを作ること',
        ko: '진정으로 자신만의 것을 창조하는 것',
        de: 'Etwas schaffen, das wirklich deins ist',
        type: 'leah',
      },
      {
        zh: '让身边的人感受到爱和被看见',
        en: 'Making the people around you feel loved and seen',
        zhTW: '讓身邊的人感受到愛和被看見',
        ja: '周りの人に愛されていると感じてもらうこと',
        ko: '주변 사람들이 사랑받고 인정받는다고 느끼게 하는 것',
        de: 'Die Menschen um dich herum fühlen zu lassen, dass sie geliebt und gesehen werden',
        type: 'penny',
      },
      {
        zh: '活出真实的自我，不为任何人妥协',
        en: 'Living authentically — never compromising who you are',
        zhTW: '活出真實的自我，不為任何人妥協',
        ja: '本当の自分を生きること。誰のためにも妥協しない',
        ko: '진정한 자아로 사는 것 — 누구를 위해서도 타협하지 않는 것',
        de: 'Authentisch leben — niemals kompromittieren, wer du bist',
        type: 'sebastian',
      },
      {
        zh: '找到那种刻骨铭心的深刻感受',
        en: 'Finding and holding onto something deeply, profoundly felt',
        zhTW: '找到那種刻骨銘心的深刻感受',
        ja: '心の底から深く感じられる何かを見つけ、大切にすること',
        ko: '깊고 강렬하게 느껴지는 무언가를 찾고 붙들어 두는 것',
        de: 'Etwas finden und festhalten, das tief und zutiefst gefühlt wird',
        type: 'elliott',
      },
    ],
  },
  {
    zh: '你理想的生活空间是？',
    en: 'Your ideal living space is:',
    zhTW: '你理想的生活空間是？',
    ja: '理想の住まいはどんな場所？',
    ko: '당신이 꿈꾸는 생활 공간은?',
    de: 'Wie sieht dein idealer Wohnort aus?',
    options: [
      {
        zh: '小镇边缘，随时可以出发探险',
        en: 'On the edge of town — always ready to go somewhere',
        zhTW: '小鎮邊緣，隨時可以出發探險',
        ja: '町外れ。いつでも冒険に出発できる場所',
        ko: '마을 외곽 — 언제든 어딘가로 떠날 수 있는 곳',
        de: 'Am Stadtrand — immer bereit, irgendwo hinzugehen',
        type: 'abigail',
      },
      {
        zh: '森林里的小屋，或乡间的工作室',
        en: "A cabin in the woods or a rural studio — truly your own",
        zhTW: '森林裡的小屋，或鄉間的工作室',
        ja: '森の小屋か、田舎のアトリエ。本当に自分だけの場所',
        ko: '숲속 오두막이나 시골의 작업실 — 온전히 나만의 공간',
        de: 'Eine Hütte im Wald oder ein Atelier auf dem Land — wirklich deins',
        type: 'leah',
      },
      {
        zh: '社区里，离家人和邻居都近',
        en: 'In the community — close to people you care about',
        zhTW: '社區裡，離家人和鄰居都近',
        ja: 'コミュニティの中心。家族や近所の人と近い場所',
        ko: '마을 안에서 — 가족과 이웃 가까이',
        de: 'Mitten in der Gemeinschaft — nah an Menschen, die dir wichtig sind',
        type: 'penny',
      },
      {
        zh: '城市角落，安静，有雾，有自己的空间',
        en: 'A quiet corner somewhere — private, a little dark, all yours',
        zhTW: '城市角落，安靜，有霧，有自己的空間',
        ja: '都市の片隅。静かで、少し薄暗くて、自分だけの空間',
        ko: '도시의 한 구석 — 조용하고, 약간 어두컴컴하고, 오롯이 나만의 공간',
        de: 'Eine ruhige Ecke irgendwo — privat, etwas dunkel, ganz für dich',
        type: 'sebastian',
      },
      {
        zh: '海边，或者有大图书馆和咖啡馆的地方',
        en: 'By the sea, or somewhere with a great library and café',
        zhTW: '海邊，或者有大圖書館和咖啡館的地方',
        ja: '海辺か、素晴らしい図書館とカフェのある場所',
        ko: '바닷가, 혹은 멋진 도서관과 카페가 있는 곳',
        de: 'Am Meer oder irgendwo mit einer tollen Bibliothek und einem Café',
        type: 'elliott',
      },
    ],
  },
  {
    zh: '看到一片美丽的星空，你的第一想法是？',
    en: 'You look up and see a stunning night sky. Your first thought:',
    zhTW: '看到一片美麗的星空，你的第一想法是？',
    ja: '美しい夜空を見上げたとき、最初に思うことは？',
    ko: '아름다운 밤하늘을 올려다봤을 때, 첫 번째 생각은?',
    de: 'Du schaust hoch und siehst einen atemberaubenden Sternenhimmel. Dein erster Gedanke:',
    options: [
      {
        zh: '「不知道那边有什么」，开始计划去探索',
        en: "I wonder what's out there — start planning to find out",
        zhTW: '「不知道那邊有什麼」，開始計劃去探索',
        ja: '「あの向こうには何があるんだろう」——探しに行く計画を立て始める',
        ko: '「저 너머엔 뭐가 있을까」 — 탐험 계획을 세우기 시작한다',
        de: '„Was ist da draußen?" — Anfangen, eine Erkundung zu planen',
        type: 'abigail',
      },
      {
        zh: '拿出画具或相机，把这一刻记录下来',
        en: 'Reach for a sketchbook or camera — this moment needs to be captured',
        zhTW: '拿出畫具或相機，把這一刻記錄下來',
        ja: 'スケッチブックかカメラを手に取る。この瞬間を残さなければ',
        ko: '스케치북이나 카메라를 꺼낸다 — 이 순간을 담아야 한다',
        de: 'Nach einem Skizzenbuch oder einer Kamera greifen — dieser Moment muss festgehalten werden',
        type: 'leah',
      },
      {
        zh: '想找一个人一起分享这个瞬间',
        en: 'Wish someone you love was here to see this with you',
        zhTW: '想找一個人一起分享這個瞬間',
        ja: '大切な人と一緒にこれを見たい、と思う',
        ko: '사랑하는 사람과 함께 이 순간을 나누고 싶어진다',
        de: 'Wünschen, dass jemand den du liebst, hier wäre, um das mit dir zu sehen',
        type: 'penny',
      },
      {
        zh: '一个人默默地看，不需要说什么',
        en: 'Stand there quietly alone — no words needed',
        zhTW: '一個人默默地看，不需要說什麼',
        ja: '一人で黙って眺める。言葉はいらない',
        ko: '말없이 혼자 서서 바라본다 — 말이 필요 없다',
        de: 'Still und allein dastehen — keine Worte nötig',
        type: 'sebastian',
      },
      {
        zh: '脑海里已经开始写一首诗了',
        en: 'A poem is already forming in your mind',
        zhTW: '腦海裡已經開始寫一首詩了',
        ja: '頭の中でもう詩が生まれ始めている',
        ko: '머릿속에서 이미 시 한 편이 써지기 시작한다',
        de: 'Ein Gedicht formt sich bereits in deinem Kopf',
        type: 'elliott',
      },
    ],
  },
]

interface Result {
  type: Character
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
  traitsZh: string[]
  traitsEn: string[]
  traitsZhTW: string[]
  traitsJa: string[]
  traitsKo: string[]
  traitsDe: string[]
  hookZh: string
  hookEn: string
  hookZhTW: string
  hookJa: string
  hookKo: string
  hookDe: string
}

const RESULTS: Record<Character, Result> = {
  abigail: {
    type: 'abigail',
    nameZh: '艾比盖尔',
    nameEn: 'Abigail',
    nameZhTW: '艾比蓋爾',
    nameJa: 'アビゲイル',
    nameKo: '애비게일',
    nameDe: 'Abigail',
    emoji: '💜',
    taglineZh: '星露谷的冒险者',
    taglineEn: 'The Adventurer of Pelican Town',
    taglineZhTW: '星露谷的冒險者',
    taglineJa: 'ペリカンタウンの冒険者',
    taglineKo: '펠리컨 타운의 모험가',
    taglineDe: 'Die Abenteurerin von Pelican Town',
    descZh:
      '你和艾比盖尔一样，骨子里住着一个探险家。你不满足于平静的日常，总想知道那扇门后面是什么、那条路通向哪里。你有点不走寻常路，不在乎别人的眼光，宁可做自己，也不愿意扮演别人期待的角色。游戏、探险、神秘的事物——这些让你感到真正活着。',
    descEn:
      "Like Abigail, you have an adventurer's soul. You're not satisfied with quiet routine — you always want to know what's behind the next door or where the path leads. You march to your own beat, don't care much for others' expectations, and would rather be yourself than play a comfortable role. Games, adventures, mysterious things — these make you feel truly alive.",
    descZhTW:
      '你和艾比蓋爾一樣，骨子裡住著一個探險家。你不滿足於平靜的日常，總想知道那扇門後面是什麼、那條路通向哪裡。你有點不走尋常路，不在乎別人的眼光，寧可做自己，也不願意扮演別人期待的角色。遊戲、探險、神秘的事物——這些讓你感到真正活著。',
    descJa:
      'アビゲイルと同じで、あなたの心の中には冒険家が住んでいます。静かな日常では物足りない。次の扉の向こうに何があるのか、あの道がどこに続くのかを知りたくてたまらない。自分のペースで動き、周りの目を気にしない。期待に応えた役を演じるくらいなら、自分でいることを選ぶ。ゲーム、冒険、謎めいたもの——それがあなたを本当に生きていると感じさせる。',
    descKo:
      '애비게일처럼, 당신의 내면에는 모험가가 살고 있습니다. 조용한 일상에 만족하지 못하고, 다음 문 너머에 무엇이 있는지, 그 길이 어디로 이어지는지 항상 알고 싶어합니다. 자기만의 박자로 걷고, 남의 시선을 별로 신경 쓰지 않으며, 편안한 역할을 연기하느니 차라리 자기 자신이 되는 쪽을 선택합니다. 게임, 모험, 신비로운 것들 — 이것들이 당신을 진정으로 살아있다고 느끼게 합니다.',
    descDe:
      'Wie Abigail hast du eine Abenteurerseele. Stille Routine reicht dir nicht — du willst immer wissen, was hinter der nächsten Tür ist oder wohin der Pfad führt. Du gehst deinen eigenen Weg, kümmert dich wenig um die Erwartungen anderer und wärst lieber du selbst als eine bequeme Rolle zu spielen. Spiele, Abenteuer, geheimnisvolle Dinge — diese lassen dich wirklich lebendig fühlen.',
    traitsZh: ['爱冒险', '不走寻常路', '活在当下', '有点神秘'],
    traitsEn: ['Adventurous', 'Non-conformist', 'Present-minded', 'A little mysterious'],
    traitsZhTW: ['愛冒險', '不走尋常路', '活在當下', '有點神秘'],
    traitsJa: ['冒険好き', '型破り', '今を生きる', 'ちょっと謎めいている'],
    traitsKo: ['모험적', '비주류', '현재 중심적', '약간 미스터리한'],
    traitsDe: ['Abenteuerlustig', 'Nonkonformist', 'Gegenwartsorientiert', 'Ein bisschen geheimnisvoll'],
    hookZh:
      '艾比盖尔式的玩家喜欢探索——TendFarm 每天都会根据你的健康数据产生新变化：今天多走了几步，农场就有不一样的收成。每次打开都有新发现，就像进了一个新地下城。',
    hookEn:
      "Abigail-types love discovery — TendFarm creates new changes every day based on your health data. Walk more today, get a different harvest. Every time you open it there's something new, like descending into a fresh dungeon floor.",
    hookZhTW:
      '艾比蓋爾型的玩家喜歡探索——TendFarm 每天都會根據你的健康資料產生新變化：今天多走了幾步，農場就有不一樣的收成。每次打開都有新發現，就像進了一個新地下城。',
    hookJa:
      'アビゲイルタイプは発見が好き——TendFarm はあなたの健康データをもとに毎日新しい変化を生み出します。今日たくさん歩けば、違う収穫がある。開くたびに新しい発見があって、まるで新しいダンジョンに潜るみたい。',
    hookKo:
      '애비게일 유형은 발견을 좋아합니다 — TendFarm은 당신의 건강 데이터를 기반으로 매일 새로운 변화를 만들어냅니다. 오늘 더 많이 걸으면, 다른 수확이 생깁니다. 열 때마다 새로운 발견이 있어서, 마치 새 던전 층에 내려가는 것 같아요.',
    hookDe:
      'Abigail-Typen lieben Entdeckungen — TendFarm schafft jeden Tag neue Veränderungen basierend auf deinen Gesundheitsdaten. Heute mehr laufen, eine andere Ernte erhalten. Jedes Mal, wenn du es öffnest, gibt es etwas Neues — wie ein neues Dungeon-Stockwerk.',
  },
  leah: {
    type: 'leah',
    nameZh: '莉亚',
    nameEn: 'Leah',
    nameZhTW: '莉亞',
    nameJa: 'リア',
    nameKo: '리아',
    nameDe: 'Leah',
    emoji: '🌿',
    taglineZh: '大自然里的创作者',
    taglineEn: 'The Creator Who Lives Close to Nature',
    taglineZhTW: '大自然裡的創作者',
    taglineJa: '自然の中で生きるクリエイター',
    taglineKo: '자연 가까이 사는 창작자',
    taglineDe: 'Die Schöpferin, die nah an der Natur lebt',
    descZh:
      '你是莉亚——用双手创造、在自然里呼吸的那种人。你不需要很多人，需要的是空间和时间，让自己的想法有地方落地。你对世界有自己的感受和表达方式，哪怕别人不一定理解。你知道什么对你来说是真实的，并且愿意为此放弃一些「安全」的选择。',
    descEn:
      "You're Leah — someone who creates with their hands and breathes better in nature. You don't need many people; you need space and time to let your ideas land somewhere real. You have your own way of seeing and expressing the world, even if others don't always understand. You know what feels authentic to you, and you're willing to give up safe options to protect it.",
    descZhTW:
      '你是莉亞——用雙手創造、在自然裡呼吸的那種人。你不需要很多人，需要的是空間和時間，讓自己的想法有地方落地。你對世界有自己的感受和表達方式，哪怕別人不一定理解。你知道什麼對你來說是真實的，並且願意為此放棄一些「安全」的選擇。',
    descJa:
      'あなたはリア——手を動かして作り、自然の中で深呼吸できるタイプ。たくさんの人は必要なくて、必要なのは空間と時間。自分のアイデアが形になれる場所が。世界の見方や表現の仕方は自分だけのもので、周りに理解されなくても構わない。自分にとって本物と感じるものを知っていて、それを守るために「安全な選択肢」を手放せる人です。',
    descKo:
      '당신은 리아 — 손으로 무언가를 만들고 자연 속에서 더 잘 숨 쉬는 사람입니다. 많은 사람이 필요한 게 아니라, 자신의 아이디어가 현실 어딘가에 닿을 공간과 시간이 필요합니다. 세상을 보고 표현하는 자신만의 방식이 있고, 타인이 항상 이해하지 못해도 괜찮습니다. 자신에게 진실하다고 느끼는 것이 무엇인지 알고, 그것을 지키기 위해 안전한 선택을 포기할 준비가 되어 있습니다.',
    descDe:
      'Du bist Leah — jemand, der mit seinen Händen erschafft und in der Natur besser atmet. Du brauchst nicht viele Menschen; du brauchst Raum und Zeit, damit deine Ideen irgendwo landen können. Du hast deine eigene Art, die Welt zu sehen und auszudrücken, auch wenn andere das nicht immer verstehen. Du weißt, was sich für dich authentisch anfühlt, und bist bereit, sichere Optionen dafür aufzugeben.',
    traitsZh: ['热爱自然', '独立创作', '真实不做作', '需要独处空间'],
    traitsEn: ['Nature-loving', 'Independently creative', 'Authentic', 'Needs solitary space'],
    traitsZhTW: ['熱愛自然', '獨立創作', '真實不做作', '需要獨處空間'],
    traitsJa: ['自然が好き', '独立した創造性', '飾らない', '一人の時間が必要'],
    traitsKo: ['자연을 사랑함', '독립적인 창의성', '꾸밈없이 진실됨', '혼자만의 공간이 필요함'],
    traitsDe: ['Naturliebend', 'Unabhängig kreativ', 'Authentisch', 'Braucht Einsamkeit'],
    hookZh:
      '莉亚式的玩家在乎真实感——TendFarm 的农场直接反映你真实的生活节律：睡眠好，农场就充盈；户外活动多，土地就更肥沃。没有比这更真实的农场了。',
    hookEn:
      "Leah-types value authenticity — TendFarm's farm directly reflects your real life rhythms: sleep well and the farm flourishes; spend time outdoors and the land grows richer. There's no more authentic farm than this.",
    hookZhTW:
      '莉亞型的玩家在乎真實感——TendFarm 的農場直接反映你真實的生活節律：睡眠好，農場就充盈；戶外活動多，土地就更肥沃。沒有比這更真實的農場了。',
    hookJa:
      'リアタイプは本物感を大切にします——TendFarm の農場はあなたのリアルな生活リズムをそのまま反映します。よく眠れば農場が豊かになり、外で過ごす時間が多いほど土地が豊かになる。これ以上に本物の農場はないと思う。',
    hookKo:
      '리아 유형은 진실성을 소중히 여깁니다 — TendFarm의 농장은 당신의 실제 생활 리듬을 직접 반영합니다: 잘 자면 농장이 풍성해지고, 야외에서 많이 보내면 땅이 더 비옥해집니다. 이보다 더 진실한 농장은 없습니다.',
    hookDe:
      "Leah-Typen schätzen Authentizität — TendFarms Farm spiegelt direkt deine echten Lebensrhythmen wider: Schlaf gut und die Farm gedeiht; verbringe Zeit draußen und das Land wird reicher. Es gibt keine authentischere Farm als diese.",
  },
  penny: {
    type: 'penny',
    nameZh: '潘妮',
    nameEn: 'Penny',
    nameZhTW: '潘妮',
    nameJa: 'ペニー',
    nameKo: '페니',
    nameDe: 'Penny',
    emoji: '📚',
    taglineZh: '村子里最温暖的那个人',
    taglineEn: 'The Warmest Soul in Town',
    taglineZhTW: '村子裡最溫暖的那個人',
    taglineJa: '村で一番温かい心の持ち主',
    taglineKo: '마을에서 가장 따뜻한 영혼',
    taglineDe: 'Die wärmste Seele im Dorf',
    descZh:
      '你是潘妮——那种让周围的人都感到被看见、被关心的人。你不一定话最多，但你永远知道什么时候该陪在别人身边。你有时候会把别人的需要放在自己前面，不是因为软弱，是因为这对你来说才是最有意义的事。你相信关怀和教育能改变一个人，而你愿意用行动去证明它。',
    descEn:
      "You're Penny — the person who makes everyone around you feel truly seen and cared for. You might not always be the loudest, but you always know when to show up for someone. You sometimes put others before yourself, not out of weakness, but because this is genuinely what feels most meaningful to you. You believe that care and connection can change a person, and you live that belief.",
    descZhTW:
      '你是潘妮——那種讓周圍的人都感到被看見、被關心的人。你不一定話最多，但你永遠知道什麼時候該陪在別人身邊。你有時候會把別人的需要放在自己前面，不是因為軟弱，是因為這對你來說才是最有意義的事。你相信關懷和教育能改變一個人，而你願意用行動去證明它。',
    descJa:
      'あなたはペニー——周りの人が本当に見てもらえていると感じられるようにしてくれる人。必ずしも一番おしゃべりではないけれど、誰かのそばにいるべきタイミングをいつも知っている。自分より相手を優先することもあるけど、それは弱さからじゃなくて、それが一番意味のあることだから。人への気遣いと繋がりが人を変えられると信じていて、その信念を生き方で証明している。',
    descKo:
      '당신은 페니 — 주변 모든 사람이 진정으로 보이고 돌봄받는다고 느끼게 해주는 사람입니다. 항상 가장 목소리가 크지는 않지만, 누군가를 위해 나타나야 할 때를 언제나 알고 있습니다. 때로는 자신보다 타인을 먼저 생각하는데, 그것은 약함이 아니라 그것이 자신에게 가장 의미 있는 일이기 때문입니다. 돌봄과 연결이 사람을 변화시킬 수 있다고 믿으며, 그 믿음을 삶으로 실천합니다.',
    descDe:
      'Du bist Penny — die Person, die alle um dich herum wirklich gesehen und umsorgt fühlen lässt. Du bist vielleicht nicht immer die Lauteste, aber du weißt immer, wann du für jemanden da sein musst. Du stellst manchmal andere vor dich selbst — nicht aus Schwäche, sondern weil das für dich das Sinnvollste ist. Du glaubst, dass Fürsorge und Verbindung einen Menschen verändern können, und du lebst nach diesem Glauben.',
    traitsZh: ['温暖体贴', '有耐心', '以他人为中心', '默默付出'],
    traitsEn: ['Warm and caring', 'Patient', 'Other-centered', 'Quietly devoted'],
    traitsZhTW: ['溫暖體貼', '有耐心', '以他人為中心', '默默付出'],
    traitsJa: ['温かくて思いやりがある', '忍耐強い', '人を中心に考える', '静かに献身的'],
    traitsKo: ['따뜻하고 배려심 깊음', '인내심 있음', '타인 중심적', '조용히 헌신적'],
    traitsDe: ['Warm und fürsorglich', 'Geduldig', 'Auf andere ausgerichtet', 'Still hingebungsvoll'],
    hookZh:
      '潘妮式的玩家在乎陪伴和成长——TendFarm 的农场会随着你稳定的生活节律慢慢成长，就像照顾一个你每天关心的东西。规律的睡眠和运动，让农场慢慢变得充盈、美好。',
    hookEn:
      "Penny-types value nurturing and growth — TendFarm's farm grows gently with your steady daily rhythms, like caring for something you tend every day. Regular sleep and movement make the farm slowly bloom into something beautiful.",
    hookZhTW:
      '潘妮型的玩家在乎陪伴和成長——TendFarm 的農場會隨著你穩定的生活節律慢慢成長，就像照顧一個你每天關心的東西。規律的睡眠和運動，讓農場慢慢變得充盈、美好。',
    hookJa:
      'ペニータイプは育てることと成長を大切にします——TendFarm の農場は、毎日コツコツ続ける生活リズムに合わせてゆっくり育ちます。毎日手入れしている何かを大切にするみたいに。規則正しい睡眠と運動が、農場をだんだん美しくしていく。',
    hookKo:
      '페니 유형은 돌봄과 성장을 소중히 여깁니다 — TendFarm의 농장은 안정적인 일상 리듬과 함께 천천히 자라납니다, 매일 보살피는 무언가를 돌보는 것처럼요. 규칙적인 수면과 운동이 농장을 서서히 아름답게 만들어갑니다.',
    hookDe:
      "Penny-Typen schätzen Pflege und Wachstum — TendFarms Farm wächst sanft mit deinen beständigen täglichen Rhythmen, wie die Pflege von etwas, das du jeden Tag hegst. Regelmäßiger Schlaf und Bewegung lassen die Farm langsam in etwas Schönes erblühen.",
  },
  sebastian: {
    type: 'sebastian',
    nameZh: '塞巴斯蒂安',
    nameEn: 'Sebastian',
    nameZhTW: '塞巴斯蒂安',
    nameJa: 'セバスチャン',
    nameKo: '세바스찬',
    nameDe: 'Sebastian',
    emoji: '🌙',
    taglineZh: '内心深处有复杂宇宙的人',
    taglineEn: 'The One with a Universe Inside',
    taglineZhTW: '內心深處有複雜宇宙的人',
    taglineJa: '内側に宇宙を持つ人',
    taglineKo: '내면에 복잡한 우주를 품은 사람',
    taglineDe: 'Der Mensch mit einem Universum im Inneren',
    descZh:
      '你是塞巴斯蒂安——外表安静，内心波澜。你不轻易让人靠近，但一旦你信任某人，那是真的信任。你更在乎深度而不是广度，宁可有一两个真正懂你的朋友，也不要一大群点头之交。你有点反体制，不愿意被期待绑住，哪怕你知道有些期待并非出于恶意。',
    descEn:
      "You're Sebastian — quiet on the outside, turbulent within. You don't let people close easily, but when you trust someone, it's real. You value depth over breadth — one or two people who truly understand you over a crowd of acquaintances. You're a little countercultural, unwilling to be defined by others' expectations, even when you know those expectations come from a good place.",
    descZhTW:
      '你是塞巴斯蒂安——外表安靜，內心波瀾。你不輕易讓人靠近，但一旦你信任某人，那是真的信任。你更在乎深度而不是廣度，寧可有一兩個真正懂你的朋友，也不要一大群點頭之交。你有點反體制，不願意被期待綁住，哪怕你知道有些期待並非出於惡意。',
    descJa:
      'あなたはセバスチャン——外見は静かだけど、内側は嵐。人を簡単には近づけないけど、一度信頼したらそれは本物。広さより深さを求める。本当に分かり合える一人か二人の友達の方が、顔見知りの大勢より断然いい。少し反体制的で、たとえそれが善意からであっても、他人の期待に縛られたくない。',
    descKo:
      '당신은 세바스찬 — 겉으로는 조용하지만, 내면은 출렁입니다. 사람을 쉽게 가까이 들이지 않지만, 한번 신뢰하면 그것은 진짜입니다. 넓이보다 깊이를 중시하고 — 얼굴만 아는 사람 무리보다 진정으로 이해해주는 한두 명의 친구를 더 원합니다. 약간 반체제적이며, 그 기대가 선의에서 비롯된 것임을 알아도 타인의 기대에 묶이기를 거부합니다.',
    descDe:
      "Du bist Sebastian — nach außen ruhig, innen turbulent. Du lässt Menschen nicht leicht nah heran, aber wenn du jemandem vertraust, ist das echt. Du schätzt Tiefe über Breite — ein oder zwei Menschen, die dich wirklich verstehen, sind dir lieber als eine Menge Bekannter. Du bist ein bisschen gegenkulturell und nicht bereit, von den Erwartungen anderer definiert zu werden, auch wenn du weißt, dass diese Erwartungen gut gemeint sind.",
    traitsZh: ['内向深沉', '高度选择性', '独立思考', '真实不妥协'],
    traitsEn: ['Introverted and deep', 'Highly selective', 'Independent thinker', 'Uncompromisingly real'],
    traitsZhTW: ['內向深沉', '高度選擇性', '獨立思考', '真實不妥協'],
    traitsJa: ['内向的で深い', '非常に選択的', '独立した思考者', '妥協しない本物志向'],
    traitsKo: ['내성적이고 깊은', '매우 선택적', '독립적 사고자', '타협 없는 진실성'],
    traitsDe: ['Introvertiert und tiefgründig', 'Sehr wählerisch', 'Unabhängiger Denker', 'Kompromisslos echt'],
    hookZh:
      'TendFarm 对塞巴斯蒂安式的玩家来说是最完美的游戏：完全不需要和任何人互动，你的健康数据在后台默默运转，农场自己成长。不需要解释，不需要表演，只是存在。',
    hookEn:
      "TendFarm is the perfect game for Sebastian-types: zero social interaction required. Your health data runs quietly in the background, the farm grows on its own. No explanations, no performance — just existence.",
    hookZhTW:
      'TendFarm 對塞巴斯蒂安型的玩家來說是最完美的遊戲：完全不需要和任何人互動，你的健康資料在後台默默運轉，農場自己成長。不需要解釋，不需要表演，只是存在。',
    hookJa:
      'TendFarm はセバスチャンタイプに完璧なゲームです：誰とも交流する必要がまったくない。健康データはバックグラウンドで静かに動いて、農場は自分で育つ。説明も、演じることも不要——ただ存在するだけでいい。',
    hookKo:
      'TendFarm은 세바스찬 유형에게 완벽한 게임입니다: 누구와도 상호작용이 전혀 필요하지 않습니다. 건강 데이터는 조용히 백그라운드에서 작동하고, 농장은 스스로 자랍니다. 설명도, 연기도 필요 없어요 — 그냥 존재하면 됩니다.',
    hookDe:
      'TendFarm ist das perfekte Spiel für Sebastian-Typen: null soziale Interaktion erforderlich. Deine Gesundheitsdaten laufen still im Hintergrund, die Farm wächst von selbst. Keine Erklärungen, keine Vorstellung — nur Existenz.',
  },
  elliott: {
    type: 'elliott',
    nameZh: '艾略特',
    nameEn: 'Elliott',
    nameZhTW: '艾略特',
    nameJa: 'エリオット',
    nameKo: '엘리엇',
    nameDe: 'Elliott',
    emoji: '🖋️',
    taglineZh: '活在情感深处的浪漫主义者',
    taglineEn: 'The Romantic Who Feels Everything Deeply',
    taglineZhTW: '活在情感深處的浪漫主義者',
    taglineJa: '感情の深みに生きるロマンチスト',
    taglineKo: '감정의 깊은 곳에 사는 낭만주의자',
    taglineDe: 'Der Romantiker, der alles tief fühlt',
    descZh:
      '你是艾略特——一个把感受当作生活核心的人。你不满足于表面，总想触达更深的东西：某个故事背后的含义、某段关系的本质、某个时刻的诗意。你也许有点「戏剧性」，但那不是矫情，是因为你真的感受得很深。对你来说，生活不只是发生，而是值得被记录、被感受、被珍视的。',
    descEn:
      "You're Elliott — someone for whom feeling is at the center of life. You don't settle for surfaces; you always reach for something deeper: the meaning behind a story, the nature of a relationship, the poetry in a moment. You may seem a little dramatic, but that's not affectation — you genuinely feel things intensely. For you, life isn't just something that happens; it's something worth recording, feeling, and treasuring.",
    descZhTW:
      '你是艾略特——一個把感受當作生活核心的人。你不滿足於表面，總想觸達更深的東西：某個故事背後的含義、某段關係的本質、某個時刻的詩意。你也許有點「戲劇性」，但那不是矯情，是因為你真的感受得很深。對你來說，生活不只是發生，而是值得被記錄、被感受、被珍視的。',
    descJa:
      'あなたはエリオット——感じることが人生の中心にある人。表面だけで満足できなくて、いつもより深いものに手を伸ばす。物語の背後にある意味、関係性の本質、瞬間の詩情。少し「ドラマチック」に見えるかもしれないけど、それは気取りじゃない——本当に強く感じているから。あなたにとって人生はただ起きることじゃなく、記録し、感じ、大切にする価値があるもの。',
    descKo:
      '당신은 엘리엇 — 감정이 삶의 중심에 있는 사람입니다. 표면에 만족하지 않고, 항상 더 깊은 것에 손을 뻗습니다: 이야기 뒤에 숨겨진 의미, 관계의 본질, 한 순간의 시적 감각. 약간 "드라마틱"해 보일 수 있지만, 그것은 과장이 아니라 — 정말로 강렬하게 느끼기 때문입니다. 당신에게 삶은 그냥 일어나는 것이 아니라, 기록하고, 느끼고, 소중히 간직할 가치가 있는 것입니다.',
    descDe:
      "Du bist Elliott — jemand, für den Fühlen im Mittelpunkt des Lebens steht. Du gibst dich nicht mit Oberflächen zufrieden; du greifst immer nach etwas Tieferem: der Bedeutung hinter einer Geschichte, der Natur einer Beziehung, der Poesie in einem Moment. Du wirkst vielleicht etwas dramatisch, aber das ist keine Affektiertheit — du fühlst Dinge wirklich intensiv. Für dich ist das Leben nicht nur etwas, das passiert; es ist etwas, das es wert ist, aufgezeichnet, gefühlt und geschätzt zu werden.",
    traitsZh: ['情感丰富', '浪漫主义', '追求深度', '热爱语言和故事'],
    traitsEn: ['Emotionally rich', 'Romantic', 'Depth-seeking', 'In love with words and stories'],
    traitsZhTW: ['情感豐富', '浪漫主義', '追求深度', '熱愛語言和故事'],
    traitsJa: ['感情豊か', 'ロマンチスト', '深みを求める', '言葉と物語への愛'],
    traitsKo: ['감정이 풍부함', '낭만적', '깊이를 추구함', '언어와 이야기를 사랑함'],
    traitsDe: ['Emotional reich', 'Romantisch', 'Tiefe suchend', 'Verliebt in Worte und Geschichten'],
    hookZh:
      'TendFarm 对艾略特式的玩家有一种浪漫的诗意：你的生活节律——你的呼吸、你的步伐、你的睡眠——都在悄悄地塑造一片农场。这是你的生活写的一首无字的诗。',
    hookEn:
      "TendFarm holds a certain poetry for Elliott-types: your life's rhythms — your breathing, your steps, your sleep — are quietly shaping a farm. It's a wordless poem written by how you live.",
    hookZhTW:
      'TendFarm 對艾略特型的玩家有一種浪漫的詩意：你的生活節律——你的呼吸、你的步伐、你的睡眠——都在悄悄地塑造一片農場。這是你的生活寫的一首無字的詩。',
    hookJa:
      'TendFarm にはエリオットタイプを引き寄せる詩的な何かがあります：あなたの人生のリズム——呼吸、歩み、眠り——が静かに農場を形作っている。あなたの生き方が書いた、言葉のない詩。',
    hookKo:
      'TendFarm에는 엘리엇 유형을 위한 낭만적인 시적 감각이 있습니다: 당신의 삶의 리듬 — 숨결, 발걸음, 수면 — 이 조용히 농장을 빚어가고 있습니다. 당신이 살아가는 방식이 쓴 말 없는 시입니다.',
    hookDe:
      "TendFarm hält eine gewisse Poesie für Elliott-Typen bereit: deine Lebensrhythmen — dein Atem, deine Schritte, dein Schlaf — formen still eine Farm. Es ist ein wortloses Gedicht, geschrieben davon, wie du lebst.",
  },
}

function calcResult(answers: Character[]): Character {
  const counts: Record<Character, number> = {
    abigail: 0,
    leah: 0,
    penny: 0,
    sebastian: 0,
    elliott: 0,
  }
  answers.forEach((a) => counts[a]++)
  return (Object.keys(counts) as Character[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b))
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

export function StardewCharacterQuiz({ locale }: Props) {
  const [step, setStep] = useState<number>(0)
  const [answers, setAnswers] = useState<Character[]>([])

  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'

  const handleAnswer = (type: Character) => {
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
        <div className="mb-6 text-6xl">🌾</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {getLoc(
            '你是哪位星露谷村民？',
            'Which Stardew Valley Villager Are You?',
            '你是哪位星露谷村民？',
            'あなたはどのスターデューバレーの村人？',
            '당신은 어떤 스타듀 밸리 주민인가요?',
            'Welcher Stardew Valley Dorfbewohner bist du?',
          )}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {getLoc(
            '6 个问题，测出你最像哪位星露谷村民——艾比盖尔、莉亚、潘妮、塞巴斯蒂安还是艾略特？',
            '6 questions to find your Stardew Valley match — Abigail, Leah, Penny, Sebastian, or Elliott?',
            '6 個問題，測出你最像哪位星露谷村民——艾比蓋爾、莉亞、潘妮、塞巴斯蒂安還是艾略特？',
            '6つの質問で、あなたに一番近いスタデューバレーの村人を見つけよう——アビゲイル、リア、ペニー、セバスチャン、エリオット？',
            '6가지 질문으로 당신과 가장 닮은 스타듀 밸리 주민을 찾아보세요 — 애비게일, 리아, 페니, 세바스찬, 엘리엇?',
            '6 Fragen, um deinen Stardew Valley-Match zu finden — Abigail, Leah, Penny, Sebastian oder Elliott?',
          )}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {getLoc(
            '结果适合截图分享——来和朋友比比看你们是哪位村民 →',
            'Share your result — compare with friends to see who gets who →',
            '結果適合截圖分享——來和朋友比比看你們是哪位村民 →',
            '結果をスクショして友達とシェアしよう——誰が誰になったか比べてみて →',
            '결과를 스크린샷으로 공유해보세요 — 친구들과 누가 누구인지 비교해보세요 →',
            'Teile dein Ergebnis — vergleiche mit Freunden, wer wen bekommt →',
          )}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {getLoc('开始测试 →', 'Start Quiz →', '開始測試 →', 'スタート →', '테스트 시작 →', 'Quiz starten →')}
        </button>
      </div>
    )
  }

  // Result
  if (step === QUESTIONS.length + 1) {
    const character = calcResult(answers)
    const result = RESULTS[character]
    const characterName = getLoc(result.nameZh, result.nameEn, result.nameZhTW, result.nameJa, result.nameKo, result.nameDe)
    const url = `https://www.farmgamehub.com/${locale}/quizzes/stardew-character`
    const shareText = getLoc(
      `我的星露谷人格是「${characterName}」！来测测你是哪位村民：${url}`,
      `My Stardew Valley personality is ${characterName}! Find yours: ${url}`,
      `我的星露谷人格是「${characterName}」！來測測你是哪位村民：${url}`,
      `私のスターデューバレー人格は「${characterName}」！あなたも試してみて：${url}`,
      `내 스타듀 밸리 성격 유형은 「${characterName}」입니다! 당신도 해보세요：${url}`,
      `Meine Stardew Valley Persönlichkeit ist ${characterName}! Finde deine heraus: ${url}`,
    )

    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {getLoc(
              '你最像星露谷里的',
              'Your Stardew Valley match is:',
              '你最像星露谷裡的',
              'あなたに一番近いスターデューバレーの村人は',
              '당신과 가장 닮은 스타듀 밸리 주민은:',
              'Dein Stardew Valley-Match ist:',
            )}
          </p>
          <h2 className="text-3xl font-bold text-[#f0a832]">
            {characterName}
          </h2>
          <p className="mt-1 text-sm text-[#8a9a7a]">
            {getLoc(result.taglineZh, result.taglineEn, result.taglineZhTW, result.taglineJa, result.taglineKo, result.taglineDe)}
          </p>
        </div>

        {/* Description */}
        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-5">
          <p className="leading-relaxed text-[#e8dcc8]">
            {getLoc(result.descZh, result.descEn, result.descZhTW, result.descJa, result.descKo, result.descDe)}
          </p>
        </div>

        {/* Traits */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {(locale === 'zh' ? result.traitsZh : locale === 'zh-TW' ? result.traitsZhTW : locale === 'ja' ? result.traitsJa : locale === 'ko' ? result.traitsKo : locale === 'de' ? result.traitsDe : result.traitsEn).map((t) => (
              <span key={t} className="rounded-full border border-[#2d5a27] px-3 py-1 text-sm text-[#8a9a7a]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mb-6">
          <p className="mb-3 text-sm text-[#8a9a7a]">
            {getLoc(
              '告诉朋友你是哪位村民 →',
              'Tell your friends which villager you got →',
              '告訴朋友你是哪位村民 →',
              '友達にどの村人だったか教えよう →',
              '친구들에게 어떤 주민이 나왔는지 알려주세요 →',
              'Sag deinen Freunden, welchen Dorfbewohner du bekommen hast →',
            )}
          </p>
          <ShareButton text={shareText} locale={locale} />
        </div>

        {/* TendFarm Hook */}
        <div className="mb-8 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a] p-5">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">
            {getLoc('你可能也会喜欢 →', 'You might also love →', '你可能也會喜歡 →', '気に入るかも →', '좋아하실 수도 있어요 →', 'Das könnte dir auch gefallen →')} TendFarm
          </p>
          <p className="mb-3 text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(result.hookZh, result.hookEn, result.hookZhTW, result.hookJa, result.hookKo, result.hookDe)}
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
            {getLoc('了解 TendFarm →', 'Learn about TendFarm →', '了解 TendFarm →', 'TendFarm を知る →', 'TendFarm 알아보기 →', 'TendFarm kennenlernen →')}
          </Link>
        </div>

        <div className="text-center">
          <button
            onClick={reset}
            className="text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc('重新测试', 'Retake quiz', '重新測試', 'もう一度やる', '다시 테스트하기', 'Nochmal machen')}
          </button>
        </div>
      </div>
    )
  }

  // Question
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
