'use client'

import { useState } from 'react'
import Link from 'next/link'

type Match = 'abigail' | 'leah' | 'penny' | 'emily' | 'sebastian' | 'harvey'

interface Option {
  zh: string
  en: string
  zhTW: string
  ja: string
  ko: string
  de: string
  type: Match
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
    zh: '感情里，你最看重什么？',
    en: 'In a relationship, what matters most to you?',
    zhTW: '感情裡，你最看重什麼？',
    ja: '恋愛で一番大切にしてることは？',
    ko: '연애에서 가장 중요하게 생각하는 건 뭐예요?',
    de: 'Was ist dir in einer Beziehung am wichtigsten?',
    options: [
      {
        zh: '一起探险、保持新鲜感',
        en: 'Adventuring together and keeping things exciting',
        zhTW: '一起探險、保持新鮮感',
        ja: '一緒に冒険して、いつもドキドキしていたい',
        ko: '함께 모험하고 항상 설레는 관계',
        de: 'Gemeinsame Abenteuer und immer neue Aufregung',
        type: 'abigail',
      },
      {
        zh: '互相理解，支持彼此的梦想',
        en: "Mutual understanding and supporting each other's dreams",
        zhTW: '互相理解，支持彼此的夢想',
        ja: 'お互いを理解して、夢を支え合いたい',
        ko: '서로를 이해하고 꿈을 응원하는 관계',
        de: 'Gegenseitiges Verständnis und Unterstützung für die Träume des anderen',
        type: 'leah',
      },
      {
        zh: '温暖稳定，在对方身边感到安心',
        en: 'Warmth and stability — feeling safe with each other',
        zhTW: '溫暖穩定，在對方身邊感到安心',
        ja: '温かくて安定した関係、そばにいると安心できる',
        ko: '따뜻하고 안정적인, 곁에 있으면 편안한 관계',
        de: 'Wärme und Stabilität — sich beim anderen sicher fühlen',
        type: 'penny',
      },
      {
        zh: '惊喜感，灵性上的共鸣',
        en: 'Surprises and a deeper spiritual connection',
        zhTW: '驚喜感，靈性上的共鳴',
        ja: 'サプライズと、魂レベルでの繋がり',
        ko: '영적인 공명과 예상치 못한 설렘',
        de: 'Überraschungen und eine tiefere, spirituelle Verbindung',
        type: 'emily',
      },
      {
        zh: '深度理解，不需要多说就懂你',
        en: 'Being truly understood without needing to explain yourself',
        zhTW: '深度理解，不需要多說就懂你',
        ja: '説明しなくてもわかってもらえること',
        ko: '말 안 해도 나를 이해해주는 깊은 공감',
        de: 'Wirklich verstanden werden, ohne sich erklären zu müssen',
        type: 'sebastian',
      },
      {
        zh: '体贴关心，知道对方始终在乎你',
        en: 'Thoughtfulness — knowing the other person always cares',
        zhTW: '體貼關心，知道對方始終在乎你',
        ja: '思いやり、いつも気にかけてくれると感じられること',
        ko: '세심한 배려, 항상 나를 신경 써주는 사람',
        de: 'Fürsorge — zu wissen, dass der andere immer an einen denkt',
        type: 'harvey',
      },
    ],
  },
  {
    zh: '你们第一次约会，最理想的场景是？',
    en: 'The perfect first date looks like:',
    zhTW: '你們第一次約會，最理想的場景是？',
    ja: '初めてのデートで一番行ってみたい場所は？',
    ko: '첫 번째 데이트로 가장 이상적인 장면은?',
    de: 'Wie sieht dein perfektes erstes Date aus?',
    options: [
      {
        zh: '去一个有点神秘/刺激的地方探险',
        en: 'Exploring somewhere a little mysterious or thrilling',
        zhTW: '去一個有點神秘/刺激的地方探險',
        ja: 'ちょっとミステリアスな場所を一緒に探検する',
        ko: '약간 신비롭고 스릴 있는 곳을 탐험하기',
        de: 'An einem etwas mysteriösen oder aufregenden Ort auf Entdeckungstour gehen',
        type: 'abigail',
      },
      {
        zh: '参观对方的工作室或创作空间',
        en: "Visiting their studio or creative space",
        zhTW: '參觀對方的工作室或創作空間',
        ja: '相手のアトリエや制作スペースを見に行く',
        ko: '상대방의 작업실이나 창작 공간 방문하기',
        de: 'Das Atelier oder den kreativen Raum des anderen besuchen',
        type: 'leah',
      },
      {
        zh: '一起做顿饭，在家聊很久',
        en: 'Cooking dinner together and talking for hours',
        zhTW: '一起做頓飯，在家聊很久',
        ja: '一緒に料理して、家でずっと話す',
        ko: '함께 요리하고 집에서 오래 이야기하기',
        de: 'Zusammen kochen und stundenlang reden',
        type: 'penny',
      },
      {
        zh: '去一个很有特色的地方，被惊喜到',
        en: 'A unique, unexpected place that surprises you',
        zhTW: '去一個很有特色的地方，被驚喜到',
        ja: '個性的で予想外の場所でサプライズを楽しむ',
        ko: '개성 있는 곳에서 뜻밖의 즐거움 찾기',
        de: 'An einem einzigartigen, unerwarteten Ort eine Überraschung erleben',
        type: 'emily',
      },
      {
        zh: '深夜咖啡馆，聊很多心里话',
        en: 'A late-night café, talking about things that actually matter',
        zhTW: '深夜咖啡館，聊很多心裡話',
        ja: '深夜のカフェで、本音をたくさん話す',
        ko: '심야 카페에서 진심 어린 대화 나누기',
        de: 'Spät nachts in einem Café über das reden, was wirklich zählt',
        type: 'sebastian',
      },
      {
        zh: '在公园散步，轻松无压力',
        en: 'A walk in the park — relaxed, no pressure',
        zhTW: '在公園散步，輕鬆無壓力',
        ja: '公園を散歩、気軽にリラックスできる感じ',
        ko: '공원 산책, 편하고 부담 없이',
        de: 'Entspannt durch den Park spazieren — ohne Druck',
        type: 'harvey',
      },
    ],
  },
  {
    zh: '在感情里，你最担心出现什么？',
    en: 'What worries you most in a relationship?',
    zhTW: '在感情裡，你最擔心出現什麼？',
    ja: '恋愛で一番不安に思うことは？',
    ko: '연애에서 가장 걱정되는 건 뭐예요?',
    de: 'Was macht dir in einer Beziehung die meisten Sorgen?',
    options: [
      {
        zh: '太平淡，失去新鲜感',
        en: 'Getting too comfortable and losing the spark',
        zhTW: '太平淡，失去新鮮感',
        ja: '関係がマンネリ化して、ドキドキがなくなること',
        ko: '너무 평범해져서 설렘이 사라지는 것',
        de: 'Dass alles zu routiniert wird und der Funke erlischt',
        type: 'abigail',
      },
      {
        zh: '为了对方失去自我',
        en: 'Losing yourself to please someone else',
        zhTW: '為了對方失去自我',
        ja: '相手に合わせすぎて自分を見失うこと',
        ko: '상대방을 위해 나 자신을 잃는 것',
        de: 'Sich selbst zu verlieren, um den anderen glücklich zu machen',
        type: 'leah',
      },
      {
        zh: '对方不够稳定，让你没有安全感',
        en: 'Instability — not feeling secure with each other',
        zhTW: '對方不夠穩定，讓你沒有安全感',
        ja: '相手が不安定で、安心感がなくなること',
        ko: '상대가 불안정해서 내가 불안해지는 것',
        de: 'Instabilität — sich beim anderen nicht sicher fühlen',
        type: 'penny',
      },
      {
        zh: '灵魂没有共鸣，只是相处',
        en: 'Just coexisting without a deeper soul-level connection',
        zhTW: '靈魂沒有共鳴，只是相處',
        ja: '表面的なだけで、魂レベルの繋がりがないこと',
        ko: '마음의 공명 없이 그냥 함께 있는 것',
        de: 'Nur zusammen zu sein, ohne echte tiefe Verbindung',
        type: 'emily',
      },
      {
        zh: '对方不真正理解你内心的复杂',
        en: "Being misunderstood — they don't see your inner depth",
        zhTW: '對方不真正理解你內心的複雜',
        ja: '自分の複雑な内面を理解してもらえないこと',
        ko: '내 복잡한 내면을 이해받지 못하는 것',
        de: 'Missverstanden zu werden — er/sie sieht die eigene Tiefe nicht',
        type: 'sebastian',
      },
      {
        zh: '对方忽视你的感受',
        en: "Your feelings being overlooked or dismissed",
        zhTW: '對方忽視你的感受',
        ja: '自分の気持ちを軽く扱われること',
        ko: '내 감정이 무시당하는 것',
        de: 'Dass die eigenen Gefühle übergangen oder abgetan werden',
        type: 'harvey',
      },
    ],
  },
  {
    zh: '你更希望和伴侣共享哪种日常？',
    en: 'What kind of everyday life do you want to share?',
    zhTW: '你更希望和伴侶共享哪種日常？',
    ja: '恋人と過ごす理想の日常は？',
    ko: '연인과 어떤 일상을 나누고 싶으세요?',
    de: 'Welchen Alltag möchtest du mit deinem Partner teilen?',
    options: [
      {
        zh: '随时来一场说走就走的小冒险',
        en: 'Spontaneous little adventures whenever the mood strikes',
        zhTW: '隨時來一場說走就走的小冒險',
        ja: '気まぐれにふらっと小さな冒険をする',
        ko: '갑작스럽게 즉흥 소풍이나 소모험 떠나기',
        de: 'Spontane kleine Abenteuer, wann immer die Laune es will',
        type: 'abigail',
      },
      {
        zh: '各自做自己的事，但在一起',
        en: 'Doing your own things side by side — companionable silence',
        zhTW: '各自做自己的事，但在一起',
        ja: 'お互い自分のことをしながら、でも一緒にいる',
        ko: '각자 자신의 일을 하면서 함께 있기',
        de: 'Jeder tut sein eigenes Ding, aber man ist zusammen',
        type: 'leah',
      },
      {
        zh: '一起处理生活细节，照顾彼此',
        en: 'Handling everyday life together, taking care of each other',
        zhTW: '一起處理生活細節，照顧彼此',
        ja: '日常の細々したことを一緒にこなして、支え合う',
        ko: '사소한 일상을 함께 처리하고 서로 돌봐주기',
        de: 'Den Alltag gemeinsam meistern und füreinander sorgen',
        type: 'penny',
      },
      {
        zh: '互相带来不一样的视角和可能性',
        en: "Constantly expanding each other's perspective",
        zhTW: '互相帶來不一樣的視角和可能性',
        ja: 'お互いに新しい視点や可能性をもたらし合う',
        ko: '서로에게 새로운 시각과 가능성을 가져다주기',
        de: 'Sich gegenseitig neue Perspektiven und Möglichkeiten eröffnen',
        type: 'emily',
      },
      {
        zh: '不用时刻联系，但懂得彼此',
        en: "Not always in touch, but always in sync",
        zhTW: '不用時刻聯繫，但懂得彼此',
        ja: 'いつも連絡しなくてもいい、でも心は通じている',
        ko: '항상 연락하지 않아도 서로를 이해하는 관계',
        de: 'Nicht ständig in Kontakt sein müssen, aber immer auf einer Wellenlänge',
        type: 'sebastian',
      },
      {
        zh: '关注彼此的状态，主动照顾对方',
        en: 'Checking in on each other and taking gentle care',
        zhTW: '關注彼此的狀態，主動照顧對方',
        ja: 'お互いの状態を気にかけて、自然にケアし合う',
        ko: '서로의 상태를 살피고 먼저 챙겨주기',
        de: 'Aufeinander achten und fürsorglich füreinander sein',
        type: 'harvey',
      },
    ],
  },
  {
    zh: '你希望伴侣是什么样的人？',
    en: 'What kind of person do you want your partner to be?',
    zhTW: '你希望伴侶是什麼樣的人？',
    ja: 'どんな人をパートナーにしたいですか？',
    ko: '어떤 사람이 파트너였으면 해요?',
    de: 'Was für ein Mensch soll dein Partner sein?',
    options: [
      {
        zh: '真实、有点叛逆，不在乎别人眼光',
        en: "Authentic, a little rebellious, unbothered by others' opinions",
        zhTW: '真實、有點叛逆，不在乎別人眼光',
        ja: '自分に正直で、少し反骨精神があって、人目を気にしない',
        ko: '자신에게 솔직하고, 약간 반항적이며, 남 시선 안 신경 쓰는 사람',
        de: 'Authentisch, ein bisschen rebellisch, unbeirrt von der Meinung anderer',
        type: 'abigail',
      },
      {
        zh: '有自己的热情和梦想，独立',
        en: 'Independent, with their own passions and goals',
        zhTW: '有自己的熱情和夢想，獨立',
        ja: '自分の夢に情熱を持ち、自立している',
        ko: '자신만의 열정과 꿈이 있고, 독립적인 사람',
        de: 'Unabhängig, mit eigenen Leidenschaften und Zielen',
        type: 'leah',
      },
      {
        zh: '温柔有耐心，以家庭和感情为重',
        en: 'Gentle and patient, who puts family and love first',
        zhTW: '溫柔有耐心，以家庭和感情為重',
        ja: '優しくて忍耐強く、家族や愛情を大切にする',
        ko: '다정하고 인내심이 있으며 가정과 사랑을 소중히 여기는 사람',
        de: 'Sanft und geduldig, für den Familie und Liebe an erster Stelle stehen',
        type: 'penny',
      },
      {
        zh: '充满创意，带给你意外和惊喜',
        en: 'Endlessly creative — always surprising you',
        zhTW: '充滿創意，帶給你意外和驚喜',
        ja: '創造力にあふれ、いつも驚かせてくれる',
        ko: '창의적이고 늘 예상치 못한 즐거움을 주는 사람',
        de: 'Endlos kreativ — immer wieder für eine Überraschung gut',
        type: 'emily',
      },
      {
        zh: '内敛有深度，值得慢慢了解',
        en: 'Quiet but deep — someone worth taking time to know',
        zhTW: '內斂有深度，值得慢慢了解',
        ja: '内向的だけど深みがある、時間をかけて知る価値がある',
        ko: '내성적이지만 깊이 있는, 알아갈수록 매력 있는 사람',
        de: 'Ruhig aber tiefgründig — jemand, den es sich lohnt, kennenzulernen',
        type: 'sebastian',
      },
      {
        zh: '可靠、体贴，关心你多于自己',
        en: 'Reliable and considerate — they put you before themselves',
        zhTW: '可靠、體貼，關心你多於自己',
        ja: '頼りになって思いやりがある、自分より相手のことを考える',
        ko: '믿음직하고 세심하며, 자신보다 나를 먼저 생각하는 사람',
        de: 'Zuverlässig und rücksichtsvoll — stellt dich vor sich selbst',
        type: 'harvey',
      },
    ],
  },
  {
    zh: '你最想在对方身上感受到什么？',
    en: 'What do you most want to feel from a partner?',
    zhTW: '你最想在對方身上感受到什麼？',
    ja: 'パートナーに感じたい一番の感覚は？',
    ko: '상대방에게 어떤 감정을 느끼고 싶으세요?',
    de: 'Was möchtest du am meisten von deinem Partner fühlen?',
    options: [
      {
        zh: '「和你在一起，什么都可能发生」',
        en: '"Anything could happen when I\'m with you"',
        zhTW: '「和你在一起，什麼都可能發生」',
        ja: '「あなたといると、何でも起きそうな気がする」',
        ko: '"당신과 함께라면 뭐든 가능할 것 같아"',
        de: '„Mit dir könnte alles passieren"',
        type: 'abigail',
      },
      {
        zh: '「你理解我，不需要我解释」',
        en: '"You get me without me having to explain"',
        zhTW: '「你理解我，不需要我解釋」',
        ja: '「説明しなくても、あなたはわかってくれる」',
        ko: '"설명 안 해도 당신은 나를 이해해"',
        de: '„Du verstehst mich, ohne dass ich es erklären muss"',
        type: 'leah',
      },
      {
        zh: '「你让我感到回家了」',
        en: '"You feel like home"',
        zhTW: '「你讓我感到回家了」',
        ja: '「あなたといると、家に帰ってきた気がする」',
        ko: '"당신 곁에 있으면 집에 온 것 같아"',
        de: '„Du fühlst dich an wie Zuhause"',
        type: 'penny',
      },
      {
        zh: '「你让我看到世界更多的可能」',
        en: '"You show me the world is bigger than I thought"',
        zhTW: '「你讓我看到世界更多的可能」',
        ja: '「あなたといると、世界の可能性が広がる」',
        ko: '"당신은 내게 세상의 더 많은 가능성을 보여줘"',
        de: '„Du zeigst mir, dass die Welt größer ist als ich dachte"',
        type: 'emily',
      },
      {
        zh: '「你不评判我，接受我所有的复杂」',
        en: '"You accept all of me — the complicated parts too"',
        zhTW: '「你不評判我，接受我所有的複雜」',
        ja: '「あなたは私を裁かない、複雑な部分ごと受け入れてくれる」',
        ko: '"당신은 나를 판단하지 않고 내 복잡함까지 받아줘"',
        de: '„Du urteilst nicht über mich — auch nicht über die komplizierten Teile"',
        type: 'sebastian',
      },
      {
        zh: '「我生病的时候你一定会在」',
        en: '"I know you\'ll be there when I need you"',
        zhTW: '「我生病的時候你一定會在」',
        ja: '「具合が悪いとき、絶対そこにいてくれる」',
        ko: '"내가 아플 때 당신은 반드시 곁에 있을 거야"',
        de: '„Ich weiß, du bist da, wenn ich dich brauche"',
        type: 'harvey',
      },
    ],
  },
]

interface Result {
  type: Match
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
  whyZh: string
  whyEn: string
  whyZhTW: string
  whyJa: string
  whyKo: string
  whyDe: string
  hookZh: string
  hookEn: string
  hookZhTW: string
  hookJa: string
  hookKo: string
  hookDe: string
}

const RESULTS: Record<Match, Result> = {
  abigail: {
    type: 'abigail',
    nameZh: '艾比盖尔',
    nameEn: 'Abigail',
    nameZhTW: '艾比蓋兒',
    nameJa: 'アビゲイル',
    nameKo: '아비게일',
    nameDe: 'Abigail',
    emoji: '💜',
    taglineZh: '你需要一个冒险同伴',
    taglineEn: 'You need an adventure partner',
    taglineZhTW: '你需要一個冒險同伴',
    taglineJa: 'あなたには冒険の相棒が必要',
    taglineKo: '당신에게는 모험 파트너가 필요해요',
    taglineDe: 'Du brauchst einen Abenteuerpartner',
    descZh:
      '你渴望的感情，是那种让你觉得「和你在一起，什么都可能」的关系。艾比盖尔正是那种人——她不会让关系变得无聊，她喜欢冒险、游戏、挑战，也同样享受深夜聊奇怪的事情。你们的感情不需要仪式感，只需要真实和新鲜。',
    descEn:
      "You want a relationship that makes anything feel possible. Abigail is exactly that kind of partner — she'd never let things get boring. She loves adventure, games, and exploring the unknown, and she's equally at home with late-night conversations about strange things. Your relationship wouldn't need grand gestures — just authenticity and a sense of possibility.",
    descZhTW:
      '你渴望的感情，是那種讓你覺得「和你在一起，什麼都可能」的關係。艾比蓋兒正是那種人——她不會讓關係變得無聊，她喜歡冒險、遊戲、挑戰，也同樣享受深夜聊奇怪的事情。你們的感情不需要儀式感，只需要真實和新鮮。',
    descJa:
      'あなたが求めているのは「あなたといると何でも起きそう」と感じさせてくれる関係。アビゲイルはまさにそんな人——彼女は関係を退屈にさせない。冒険、ゲーム、未知への探求が大好きで、深夜に不思議な話をするのも楽しめる。大げさなジェスチャーは必要ない、ただリアルで新鮮であればそれでいい。',
    descKo:
      '당신이 원하는 관계는 "당신과 함께라면 뭐든 가능할 것 같아"라는 느낌을 주는 것이에요. 아비게일이 딱 그런 사람이에요 — 그녀는 관계가 지루해지도록 내버려 두지 않아요. 모험, 게임, 미지의 탐험을 좋아하고, 심야에 이상한 이야기를 나누는 것도 즐겨요. 거창한 의식이 필요 없어요, 진실되고 새로우면 그걸로 충분해요.',
    descDe:
      'Du willst eine Beziehung, die sich anfühlt, als wäre alles möglich. Abigail ist genau das — sie würde nie zulassen, dass es langweilig wird. Sie liebt Abenteuer, Spiele und das Erkunden des Unbekannten, und sie kann genauso gut bis tief in die Nacht über merkwürdige Dinge reden. Eure Beziehung bräuchte keine großen Gesten — nur Echtheit und das Gefühl von Möglichkeiten.',
    whyZh: '为什么是艾比盖尔：她是那种不会让你觉得「我们只是在过日子」的人。',
    whyEn: "Why Abigail: She's the one who'll never let you feel like you're just going through the motions.",
    whyZhTW: '為什麼是艾比蓋兒：她是那種不會讓你覺得「我們只是在過日子」的人。',
    whyJa: 'なぜアビゲイルか：彼女は「ただ日々をこなしているだけ」と感じさせない人だから。',
    whyKo: '왜 아비게일인가: 그녀는 "우리 그냥 사는 거잖아"라는 느낌을 절대 주지 않는 사람이기 때문이에요.',
    whyDe: 'Warum Abigail: Sie ist die Einzige, die dich nie das Gefühl haben lässt, einfach nur die Tage abzuhaken.',
    hookZh:
      'TendFarm 的冒险型玩家——你们的健康数据每天都在创造新变化：今天多走了几步，农场就出现新的发现。就像和艾比盖尔一起，每天都有点不同。',
    hookEn:
      "TendFarm for the adventurer — your health data creates new surprises every day: walk more today, discover something new in the farm. Like being with Abigail, every day is a little different.",
    hookZhTW:
      'TendFarm 的冒險型玩家——你們的健康數據每天都在創造新變化：今天多走了幾步，農場就出現新的發現。就像和艾比蓋兒一起，每天都有點不同。',
    hookJa:
      '冒険家タイプにぴったりのTendFarm——あなたの健康データが毎日新しい変化を生み出す。今日たくさん歩けば、農場に新しい発見が現れる。アビゲイルと一緒にいるみたいに、毎日が少しずつ違う。',
    hookKo:
      '모험가 타입을 위한 TendFarm — 건강 데이터가 매일 새로운 변화를 만들어냅니다. 오늘 더 많이 걸으면 농장에 새로운 발견이 생겨요. 아비게일과 함께하는 것처럼, 매일이 조금씩 달라요.',
    hookDe:
      'TendFarm für Abenteurer — deine Gesundheitsdaten erschaffen täglich neue Überraschungen: heute mehr laufen, morgen etwas Neues auf der Farm entdecken. Wie mit Abigail: jeder Tag ist ein bisschen anders.',
  },
  leah: {
    type: 'leah',
    nameZh: '莉亚',
    nameEn: 'Leah',
    nameZhTW: '莉亞',
    nameJa: 'リア',
    nameKo: '레아',
    nameDe: 'Leah',
    emoji: '🌿',
    taglineZh: '你需要一个真正理解你的人',
    taglineEn: 'You need someone who truly understands you',
    taglineZhTW: '你需要一個真正理解你的人',
    taglineJa: '本当にわかってくれる人が必要',
    taglineKo: '당신을 진정으로 이해해주는 사람이 필요해요',
    taglineDe: 'Du brauchst jemanden, der dich wirklich versteht',
    descZh:
      '你不需要随时的陪伴，但你需要当你在那里的时候，对方真的懂你。莉亚是那种尊重你独立性、有自己梦想、但深深理解你的人。你们的关系不需要解释，只需要存在——各自做自己的事，但在一起时感到完整。',
    descEn:
      "You don't need constant togetherness — you need someone who truly gets you when you are together. Leah respects your independence, has her own dreams, and understands you at a level that doesn't need words. Your relationship wouldn't need explaining — just two complete people, stronger together.",
    descZhTW:
      '你不需要隨時的陪伴，但你需要當你在那裡的時候，對方真的懂你。莉亞是那種尊重你獨立性、有自己夢想、但深深理解你的人。你們的關係不需要解釋，只需要存在——各自做自己的事，但在一起時感到完整。',
    descJa:
      '常に一緒にいる必要はない——でも、一緒にいるときは本当にわかってほしい。リアは自立を尊重し、自分の夢を持ちながらも、言葉を超えてあなたを理解してくれる人。説明しなくていい関係——ふたりとも完結した存在で、一緒にいるともっと強くなれる。',
    descKo:
      '항상 붙어있을 필요는 없어요 — 하지만 함께할 때 진정으로 이해받고 싶죠. 레아는 당신의 독립성을 존중하고, 자신의 꿈도 있으면서, 말없이도 당신을 깊이 이해해줘요. 설명이 필요 없는 관계, 각자 완전한 존재로서 함께할 때 더 강해지는 사이예요.',
    descDe:
      'Du brauchst keine ständige Gemeinsamkeit — aber wenn ihr zusammen seid, sollte es sich wie echtes Verstehen anfühlen. Leah respektiert deine Unabhängigkeit, hat ihre eigenen Träume und versteht dich auf einer Ebene, die keine Worte braucht. Eure Beziehung müsste sich nicht erklären — einfach zwei vollständige Menschen, die zusammen stärker sind.',
    whyZh: '为什么是莉亚：她不会试图改变你，只是和你一起，做更好的自己。',
    whyEn: "Why Leah: She won't try to change you — just grow alongside you.",
    whyZhTW: '為什麼是莉亞：她不會試圖改變你，只是和你一起，做更好的自己。',
    whyJa: 'なぜリアか：彼女はあなたを変えようとしない——ただ一緒に成長するだけ。',
    whyKo: '왜 레아인가: 그녀는 당신을 바꾸려 하지 않아요 — 그냥 함께 더 나은 사람이 되어가는 거예요.',
    whyDe: 'Warum Leah: Sie versucht nicht, dich zu verändern — sie wächst einfach an deiner Seite.',
    hookZh:
      'TendFarm 为莉亚式的关系设计：不需要解释，不需要操作，你的生活节律自然驱动农场生长。真实的生活，就是最好的农场设计。',
    hookEn:
      "TendFarm is built for Leah-types: no explanation needed, no manual input — your real life rhythms drive the farm naturally. Authentic living is the best farm design.",
    hookZhTW:
      'TendFarm 為莉亞式的關係設計：不需要解釋，不需要操作，你的生活節律自然驅動農場生長。真實的生活，就是最好的農場設計。',
    hookJa:
      'リア型の人のためのTendFarm：説明不要、操作不要、あなたのリアルな生活リズムが農場を自然に育てる。本物の生活が、最高の農場デザイン。',
    hookKo:
      '레아 타입을 위한 TendFarm: 설명 필요 없고, 조작 필요 없어요. 실제 생활 리듬이 자연스럽게 농장을 키워요. 진짜 삶이 최고의 농장 디자인이에요.',
    hookDe:
      'TendFarm, gebaut für Leah-Typen: keine Erklärung nötig, keine manuelle Eingabe — dein echter Lebensrhythmus treibt die Farm ganz natürlich an. Authentisches Leben ist das beste Farmdesign.',
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
    taglineZh: '你需要一段让你感到回家的感情',
    taglineEn: 'You need a relationship that feels like home',
    taglineZhTW: '你需要一段讓你感到回家的感情',
    taglineJa: '家に帰ってきたような温もりが欲しい',
    taglineKo: '집에 온 것 같은 느낌을 주는 연애가 필요해요',
    taglineDe: 'Du brauchst eine Beziehung, die sich anfühlt wie Zuhause',
    descZh:
      '你不是在找刺激，而是在找一种让你放松下来、觉得安全的感情。潘妮会记住你喜欢什么，会在你难过的时候出现，会把普通的日子变得有温度。和她在一起，「家」不是一个地方，而是一种感觉。',
    descEn:
      "You're not chasing excitement — you're looking for a relationship where you can breathe. Penny remembers what you like, shows up when you're struggling, and makes ordinary days feel warm. With her, home isn't a place — it's a feeling.",
    descZhTW:
      '你不是在找刺激，而是在找一種讓你放鬆下來、覺得安全的感情。潘妮會記住你喜歡什麼，會在你難過的時候出現，會把普通的日子變得有溫度。和她在一起，「家」不是一個地方，而是一種感覺。',
    descJa:
      'スリルを求めているんじゃない——ただ、ほっとできて安心できる関係が欲しい。ペニーはあなたの好きなものを覚えていて、辛いときにそばにいてくれて、何気ない日々を温かくしてくれる。彼女といると「家」は場所じゃなくて、感覚なんだ。',
    descKo:
      '자극이 필요한 게 아니에요 — 긴장을 풀고 안전함을 느낄 수 있는 관계가 필요해요. 페니는 당신이 좋아하는 것을 기억하고, 힘들 때 나타나주고, 평범한 날을 따뜻하게 만들어줘요. 그녀와 함께하면 \'집\'은 장소가 아니라 느낌이에요.',
    descDe:
      'Du jagst nicht nach Aufregung — du suchst eine Beziehung, in der du durchatmen und dich sicher fühlen kannst. Penny erinnert sich, was du magst, ist da, wenn du kämpfst, und macht gewöhnliche Tage wärmer. Mit ihr ist Zuhause kein Ort — es ist ein Gefühl.',
    whyZh: '为什么是潘妮：她是那种让你在最坏的日子里也觉得被看见的人。',
    whyEn: "Why Penny: She's the one who makes you feel seen even on your worst days.",
    whyZhTW: '為什麼是潘妮：她是那種讓你在最壞的日子裡也覺得被看見的人。',
    whyJa: 'なぜペニーか：最悪な日でも、彼女はあなたを「ちゃんと見えている」と感じさせてくれるから。',
    whyKo: '왜 페니인가: 가장 힘든 날에도 당신이 보이고 있다는 느낌을 주는 사람이기 때문이에요.',
    whyDe: 'Warum Penny: Sie ist diejenige, die dich selbst an deinen schlimmsten Tagen gesehen fühlen lässt.',
    hookZh:
      'TendFarm 为稳定型玩家而生：规律的睡眠和步数让农场日渐充盈，就像潘妮式的陪伴——不急不躁，每天都多一点好。',
    hookEn:
      "TendFarm for the steady one — consistent sleep and steps make the farm gradually richer, like Penny's presence: no rush, just a little better every day.",
    hookZhTW:
      'TendFarm 為穩定型玩家而生：規律的睡眠和步數讓農場日漸充盈，就像潘妮式的陪伴——不急不躁，每天都多一點好。',
    hookJa:
      '安定型プレイヤーのためのTendFarm：規則正しい睡眠と歩数が農場を少しずつ豊かにしていく。ペニーの存在みたいに——焦らず、毎日ちょっとずつ良くなっていく。',
    hookKo:
      '안정형 플레이어를 위한 TendFarm: 규칙적인 수면과 걸음수가 농장을 점점 풍요롭게 만들어요. 페니의 존재처럼 — 서두르지 않고, 매일 조금씩 더 좋아지는 것.',
    hookDe:
      'TendFarm für den ruhigen Typ — regelmäßiger Schlaf und Schritte lassen die Farm langsam gedeihen, wie Pennys Gegenwart: kein Hetzen, nur jeden Tag ein kleines bisschen besser.',
  },
  emily: {
    type: 'emily',
    nameZh: '艾米莉',
    nameEn: 'Emily',
    nameZhTW: '艾米莉',
    nameJa: 'エミリー',
    nameKo: '에밀리',
    nameDe: 'Emily',
    emoji: '🌈',
    taglineZh: '你需要一段让你成长的感情',
    taglineEn: 'You need a relationship that expands your world',
    taglineZhTW: '你需要一段讓你成長的感情',
    taglineJa: 'あなたを広げてくれる関係が必要',
    taglineKo: '당신을 성장시키는 연애가 필요해요',
    taglineDe: 'Du brauchst eine Beziehung, die dich wachsen lässt',
    descZh:
      '你希望和一个人在一起之后，感觉自己比以前更大了——看到了更多可能，有了更多感受。艾米莉是那种人。她充满创意，对世界的感受方式和大多数人不同，和她在一起，你会开始注意到那些你以前忽略的美好。',
    descEn:
      "You want a relationship that makes you feel larger — more possibilities, deeper feelings. Emily is that person. She has a way of experiencing the world that's unlike anyone else, and being with her makes you notice beauty you used to walk past. She expands you.",
    descZhTW:
      '你希望和一個人在一起之後，感覺自己比以前更大了——看到了更多可能，有了更多感受。艾米莉是那種人。她充滿創意，對世界的感受方式和大多數人不同，和她在一起，你會開始注意到那些你以前忽略的美好。',
    descJa:
      '誰かと付き合ったあと、以前より自分が大きくなったように感じたい——もっとたくさんの可能性が見えて、もっと深く感じられるようになりたい。エミリーはそんな人。彼女の世界の感じ方は他の誰とも違っていて、一緒にいると今まで見過ごしてきた美しさに気づくようになる。',
    descKo:
      '누군가와 함께한 후 이전보다 더 넓어진 자신을 느끼고 싶어요 — 더 많은 가능성을 보고, 더 깊이 느끼게 되는 것. 에밀리가 바로 그런 사람이에요. 그녀의 세상 감수 방식은 다른 누구와도 달라서, 함께 있으면 예전엔 지나쳤던 아름다움들이 보이기 시작해요.',
    descDe:
      'Du willst, dass eine Beziehung dich größer fühlen lässt — mehr Möglichkeiten, tiefere Gefühle. Emily ist diese Person. Sie erlebt die Welt auf eine Weise, die sich von allen anderen unterscheidet, und wenn du mit ihr zusammen bist, beginnst du Schönheit zu bemerken, an der du früher vorbeigegangen wärst. Sie erweitert dich.',
    whyZh: '为什么是艾米莉：她不只是陪伴你，而是改变你看世界的方式。',
    whyEn: "Why Emily: She doesn't just accompany you — she changes how you see everything.",
    whyZhTW: '為什麼是艾米莉：她不只是陪伴你，而是改變你看世界的方式。',
    whyJa: 'なぜエミリーか：ただ一緒にいるだけじゃなく、あなたの世界の見方を変えてくれるから。',
    whyKo: '왜 에밀리인가: 그냥 함께 있는 게 아니라, 세상을 보는 방식을 바꿔주기 때문이에요.',
    whyDe: 'Warum Emily: Sie begleitet dich nicht nur — sie verändert, wie du alles siehst.',
    hookZh:
      'TendFarm 的创意型玩家——你的健康数据产生的农场变化充满了意外性，就像和艾米莉在一起：你永远不知道今天会带来什么惊喜。',
    hookEn:
      "TendFarm for the creative — your health data generates farm changes full of surprises, like being with Emily: you never know what today will bring.",
    hookZhTW:
      'TendFarm 的創意型玩家——你的健康數據產生的農場變化充滿了意外性，就像和艾米莉在一起：你永遠不知道今天會帶來什麼驚喜。',
    hookJa:
      'クリエイティブタイプのためのTendFarm——あなたの健康データが生み出す農場の変化はサプライズ満載。エミリーと一緒みたいに：今日は何が起きるかわからない。',
    hookKo:
      '창의적인 플레이어를 위한 TendFarm — 건강 데이터가 만들어내는 농장 변화는 늘 의외성으로 가득해요. 에밀리와 함께하는 것처럼: 오늘은 또 어떤 놀라움이 찾아올지 모르잖아요.',
    hookDe:
      'TendFarm für Kreative — deine Gesundheitsdaten erzeugen Farmveränderungen voller Überraschungen, wie das Leben mit Emily: du weißt nie, was der heutige Tag bringen wird.',
  },
  sebastian: {
    type: 'sebastian',
    nameZh: '塞巴斯蒂安',
    nameEn: 'Sebastian',
    nameZhTW: '塞巴斯蒂安',
    nameJa: 'セバスチャン',
    nameKo: '세바스티안',
    nameDe: 'Sebastian',
    emoji: '🌙',
    taglineZh: '你需要一个真正接受你复杂性的人',
    taglineEn: 'You need someone who accepts all your complexity',
    taglineZhTW: '你需要一個真正接受你複雜性的人',
    taglineJa: 'あなたの複雑さをまるごと受け入れてくれる人が必要',
    taglineKo: '당신의 복잡함을 있는 그대로 받아줄 사람이 필요해요',
    taglineDe: 'Du brauchst jemanden, der all deine Komplexität akzeptiert',
    descZh:
      '你不需要别人理解你所有的面向——但你需要对方不试图简化你。塞巴斯蒂安也有他不轻易展示的内心，他不会要求你永远开朗，不会因为你的复杂而退缩。你们之间的沉默是舒适的，你们之间的深度是真实的。',
    descEn:
      "You don't need to be fully understood — but you need someone who won't try to simplify you. Sebastian has depths he doesn't easily show either. He won't ask you to always be cheerful, and he won't pull back when you're complicated. Your silences are comfortable. Your depth is real.",
    descZhTW:
      '你不需要別人理解你所有的面向——但你需要對方不試圖簡化你。塞巴斯蒂安也有他不輕易展示的內心，他不會要求你永遠開朗，不會因為你的複雜而退縮。你們之間的沉默是舒適的，你們之間的深度是真實的。',
    descJa:
      '全部を理解してもらう必要はない——でも、単純化しようとしない人が必要。セバスチャンも、簡単には見せない内面を持っている。いつも明るくしろとは言わないし、複雑なあなたから引いたりもしない。ふたりの間の沈黙は心地よく、その深さは本物だ。',
    descKo:
      '모든 면을 이해받을 필요는 없어요 — 하지만 나를 단순화하려 들지 않는 사람이 필요해요. 세바스티안도 쉽게 드러내지 않는 내면이 있어요. 항상 밝게 있으라 하지 않고, 복잡한 당신에게서 물러서지도 않아요. 둘 사이의 침묵은 편안하고, 그 깊이는 진짜예요.',
    descDe:
      'Du musst nicht vollständig verstanden werden — aber du brauchst jemanden, der nicht versucht, dich zu vereinfachen. Sebastian hat auch Tiefen, die er nicht leicht zeigt. Er wird dich nicht bitten, immer fröhlich zu sein, und er zieht sich nicht zurück, wenn du kompliziert bist. Eure Stille ist bequem. Eure Tiefe ist echt.',
    whyZh: '为什么是塞巴斯蒂安：他是那种不需要你解释「为什么」的人，他只是接受。',
    whyEn: "Why Sebastian: He's the one who doesn't need you to explain why — he just accepts.",
    whyZhTW: '為什麼是塞巴斯蒂安：他是那種不需要你解釋「為什麼」的人，他只是接受。',
    whyJa: 'なぜセバスチャンか：「なぜ」を説明しなくていい、ただ受け入れてくれる人だから。',
    whyKo: '왜 세바스티안인가: \'왜\'를 설명하지 않아도 되는 사람, 그냥 받아들여주기 때문이에요.',
    whyDe: 'Warum Sebastian: Er ist derjenige, dem du nicht erklären musst, warum — er akzeptiert es einfach.',
    hookZh:
      'TendFarm 对内向型玩家完美适配：零社交压力，你的健康数据在后台安静运行，农场自己成长。不需要解释，不需要表演。',
    hookEn:
      "TendFarm is a perfect fit for introverts: zero social pressure, your health data runs quietly in the background, the farm grows on its own. No explaining, no performing.",
    hookZhTW:
      'TendFarm 對內向型玩家完美適配：零社交壓力，你的健康數據在後台安靜運行，農場自己成長。不需要解釋，不需要表演。',
    hookJa:
      '内向型プレイヤーにぴったりのTendFarm：ソーシャルプレッシャーゼロ、あなたの健康データはバックグラウンドで静かに動き、農場が自然に育つ。説明もパフォーマンスも不要。',
    hookKo:
      '내향형 플레이어에게 완벽한 TendFarm: 소셜 부담 제로, 건강 데이터가 백그라운드에서 조용히 실행되며 농장이 스스로 성장해요. 설명도 필요 없고, 연기도 필요 없어요.',
    hookDe:
      'TendFarm ist perfekt für Introvertierte: null sozialer Druck, deine Gesundheitsdaten laufen leise im Hintergrund, die Farm wächst von alleine. Kein Erklären, kein Performen.',
  },
  harvey: {
    type: 'harvey',
    nameZh: '哈维',
    nameEn: 'Harvey',
    nameZhTW: '哈維',
    nameJa: 'ハーヴィー',
    nameKo: '하비',
    nameDe: 'Harvey',
    emoji: '💙',
    taglineZh: '你需要一个真正关心你的人',
    taglineEn: 'You need someone who genuinely cares about you',
    taglineZhTW: '你需要一個真正關心你的人',
    taglineJa: '本当に心配してくれる人が必要',
    taglineKo: '당신을 진심으로 걱정해주는 사람이 필요해요',
    taglineDe: 'Du brauchst jemanden, dem du wirklich wichtig bist',
    descZh:
      '你需要的，不是最帅的或最酷的，而是那种让你感觉「如果我病了，他一定会在」的人。哈维有点害羞，但他的体贴是发自内心的——他会注意到你状态不好，会记住你提过的事，会在你不需要求助的时候先帮你想到。在感情里，被真正照顾，是你的需求，也是你的值得。',
    descEn:
      "You don't need someone dazzling — you need someone who makes you feel genuinely cared for. Harvey is a little shy, but his thoughtfulness is real: he notices when you're off, remembers things you mentioned once, and anticipates your needs before you ask. Being truly cared for is your need, and you deserve it.",
    descZhTW:
      '你需要的，不是最帥的或最酷的，而是那種讓你感覺「如果我病了，他一定會在」的人。哈維有點害羞，但他的體貼是發自內心的——他會注意到你狀態不好，會記住你提過的事，會在你不需要求助的時候先幫你想到。在感情裡，被真正照顧，是你的需求，也是你的值得。',
    descJa:
      '一番かっこいい人や一番クールな人じゃなくていい——「もし具合が悪くなっても、絶対そこにいてくれる」と感じさせてくれる人が必要。ハーヴィーは少し内気だけど、その思いやりは本物。調子が悪そうだと気づいてくれて、一度言ったことを覚えていてくれて、頼む前にもう先に考えてくれている。本当に大切にされることは、あなたの必要であり、あなたに値すること。',
    descKo:
      '가장 잘생긴 사람이나 가장 멋진 사람이 필요한 게 아니에요 — "내가 아프면 반드시 곁에 있을 것 같은" 느낌을 주는 사람이 필요해요. 하비는 조금 수줍지만 그의 세심함은 진심이에요. 당신의 상태가 안 좋을 때 알아채고, 한 번 말한 것도 기억하고, 부탁하기 전에 먼저 챙겨줘요. 진정으로 돌봄 받는 것, 그게 당신의 바람이자 당신이 받을 자격이 있는 것이에요.',
    descDe:
      'Du brauchst nicht den Schönsten oder Coolsten — du brauchst jemanden, der dich wirklich fühlen lässt, dass er da ist, wenn du ihn brauchst. Harvey ist ein bisschen schüchtern, aber seine Fürsorge ist echt: er merkt, wenn etwas nicht stimmt, erinnert sich an Dinge, die du mal erwähnt hast, und denkt schon an deine Bedürfnisse, bevor du fragst. Wirklich umsorgt zu werden ist dein Bedürfnis, und du verdienst es.',
    whyZh: '为什么是哈维：在所有人都忙着展示自己的时候，他在默默想着你。',
    whyEn: "Why Harvey: While everyone else is busy performing, he's quietly thinking of you.",
    whyZhTW: '為什麼是哈維：在所有人都忙著展示自己的時候，他在默默想著你。',
    whyJa: 'なぜハーヴィーか：みんなが自己アピールに忙しいとき、彼はひそかにあなたのことを考えているから。',
    whyKo: '왜 하비인가: 모두가 자신을 뽐내는 데 바쁠 때, 그는 조용히 당신을 생각하고 있기 때문이에요.',
    whyDe: 'Warum Harvey: Während alle anderen damit beschäftigt sind, sich zu präsentieren, denkt er still an dich.',
    hookZh:
      'TendFarm 对哈维式的玩家来说充满温度：你的睡眠好，农场就好；你照顾好自己，农场就回应你。TendFarm 和哈维一样，它记得你，并且在乎。',
    hookEn:
      "TendFarm resonates with Harvey-types: sleep well and the farm thrives; take care of yourself and the farm responds. Like Harvey, TendFarm pays attention — and cares.",
    hookZhTW:
      'TendFarm 對哈維式的玩家來說充滿溫度：你的睡眠好，農場就好；你照顧好自己，農場就回應你。TendFarm 和哈維一樣，它記得你，並且在乎。',
    hookJa:
      'ハーヴィー型プレイヤーに響くTendFarm：よく眠れれば農場も元気になる；自分を大切にすれば農場がそれに応える。TendFarm はハーヴィーと同じ——あなたのことを覚えていて、気にかけている。',
    hookKo:
      '하비 타입 플레이어에게 따뜻한 TendFarm: 잘 자면 농장도 좋아지고, 자신을 잘 돌보면 농장이 응답해요. TendFarm은 하비처럼 — 당신을 기억하고, 신경 써요.',
    hookDe:
      'TendFarm trifft den Harvey-Typ: gut schlafen, und die Farm gedeiht; auf sich selbst achten, und die Farm antwortet. Wie Harvey erinnert sich TendFarm — und es kümmert sich.',
  },
}

function calcResult(answers: Match[]): Match {
  const counts: Record<Match, number> = {
    abigail: 0,
    leah: 0,
    penny: 0,
    emily: 0,
    sebastian: 0,
    harvey: 0,
  }
  answers.forEach((a) => counts[a]++)
  return (Object.keys(counts) as Match[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b))
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

export function StardewRomanceQuiz({ locale }: Props) {
  const [step, setStep] = useState<number>(0)
  const [answers, setAnswers] = useState<Match[]>([])
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const handleAnswer = (type: Match) => {
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
        <div className="mb-6 text-6xl">💌</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {getLoc(
            '你在星露谷里应该和谁在一起？',
            'Which Stardew Valley Character Should You Romance?',
            '你在星露谷裡應該和誰在一起？',
            'スターデューバレーで誰と恋しますか？',
            '별빛 골짜기에서 누구와 연애해야 할까요?',
            'Mit wem solltest du in Stardew Valley zusammen sein?'
          )}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {getLoc(
            '6 个关于感情的问题，测出你最适合和哪位星露谷村民发展感情。',
            '6 questions about what you value in relationships to find your perfect Stardew Valley romance match.',
            '6 個關於感情的問題，測出你最適合和哪位星露谷村民發展感情。',
            '恋愛観に関する6つの質問で、あなたにぴったりのスターデューバレーキャラを見つけよう。',
            '연애에서 중요하게 생각하는 것들에 관한 6가지 질문으로 딱 맞는 별빛 골짜기 캐릭터를 찾아봐요.',
            '6 Fragen zu deinen Beziehungswerten, um deinen perfekten Stardew Valley Partner zu finden.'
          )}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {getLoc(
            '艾比盖尔、莉亚、潘妮、艾米莉、塞巴斯蒂安、哈维——你们是什么缘分？',
            'Abigail, Leah, Penny, Emily, Sebastian, or Harvey — which one is your match?',
            '艾比蓋兒、莉亞、潘妮、艾米莉、塞巴斯蒂安、哈維——你們是什麼緣分？',
            'アビゲイル、リア、ペニー、エミリー、セバスチャン、ハーヴィー——あなたとの縁は？',
            '아비게일, 레아, 페니, 에밀리, 세바스티안, 하비 — 누구와 인연이 있을까요?',
            'Abigail, Leah, Penny, Emily, Sebastian oder Harvey — wer passt zu dir?'
          )}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {getLoc('开始配对 →', 'Find My Match →', '開始配對 →', 'マッチングを始める →', '내 상대 찾기 →', 'Mein Match finden →')}
        </button>
      </div>
    )
  }

  // Result
  if (step === QUESTIONS.length + 1) {
    const match = calcResult(answers)
    const result = RESULTS[match]
    const matchName = getLoc(result.nameZh, result.nameEn, result.nameZhTW, result.nameJa, result.nameKo, result.nameDe)
    const url = `https://www.farmgamehub.com/${locale}/quizzes/stardew-romance`
    const shareText = getLoc(
      `我在星露谷的配对对象是「${matchName}」！来测测你应该和谁在一起：${url}`,
      `My Stardew Valley romance match is ${matchName}! Find yours: ${url}`,
      `我在星露谷的配對對象是「${matchName}」！來測測你應該和誰在一起：${url}`,
      `スターデューバレーで私が選んだ相手は「${matchName}」！あなたはどのキャラとお似合い？：${url}`,
      `별빛 골짜기에서 내 로맨스 상대는 「${matchName}」！당신은 누구와 어울릴까요？：${url}`,
      `Mein Stardew Valley Romance-Match ist ${matchName}! Finde deins: ${url}`
    )

    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {getLoc(
              '你的星露谷配对对象是',
              'Your Stardew Valley romance match is:',
              '你的星露谷配對對象是',
              'あなたのスターデューバレー相手は',
              '당신의 별빛 골짜기 로맨스 상대는',
              'Dein Stardew Valley Romance-Match ist:'
            )}
          </p>
          <h2 className="text-3xl font-bold text-[#f0a832]">
            {matchName}
          </h2>
          <p className="mt-1 text-sm text-[#8a9a7a]">
            {getLoc(result.taglineZh, result.taglineEn, result.taglineZhTW, result.taglineJa, result.taglineKo, result.taglineDe)}
          </p>
        </div>

        {/* Description */}
        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-5">
          <p className="leading-relaxed text-[#e8dcc8]">
            {getLoc(result.descZh, result.descEn, result.descZhTW, result.descJa, result.descKo, result.descDe)}
          </p>
        </div>

        {/* Why */}
        <div className="mb-5 rounded-xl border border-[#2d5a27]/50 bg-[#1a2e1a]/30 px-5 py-3">
          <p className="text-sm italic text-[#8a9a7a]">
            {getLoc(result.whyZh, result.whyEn, result.whyZhTW, result.whyJa, result.whyKo, result.whyDe)}
          </p>
        </div>

        {/* Share */}
        <div className="mb-6">
          <p className="mb-3 text-sm text-[#8a9a7a]">
            {getLoc(
              '看看朋友的配对结果 →',
              'See who your friends match with →',
              '看看朋友的配對結果 →',
              '友達の結果も見てみよう →',
              '친구의 배합 결과도 확인해봐요 →',
              'Schau, wen deine Freunde matchen →'
            )}
          </p>
          <ShareButton text={shareText} locale={locale} />
        </div>

        {/* TendFarm Hook */}
        <div className="mb-8 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a] p-5">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">
            {getLoc('你可能也会喜欢 →', 'You might also love →', '你可能也會喜歡 →', 'あなたにもおすすめ →', '이것도 좋아할 것 같아요 →', 'Das könntest du auch lieben →')} TendFarm
          </p>
          <p className="mb-2 text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把 Cozy 游戏的季节感带入你的真实生活节奏。',
              'TendFarm is building a farm rhythm tracker — bringing the seasonal feeling of cozy games into real life.',
              'TendFarm 正在研發農場節律追蹤功能——把 Cozy 遊戲的季節感帶入你的真實生活節奏。',
              'TendFarm はファームリズムトラッカーを開発中です——コージーゲームの季節感をリアルな生活リズムに。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 코지 게임의 계절감을 실제 생활 리듬으로.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — das saisonale Gefühl von Cozy Games ins echte Leben bringen.'
            )}
          </p>
          <p className="mb-4 text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(result.hookZh, result.hookEn, result.hookZhTW, result.hookJa, result.hookKo, result.hookDe)}
          </p>
          <Link
            href={`/${locale}/gameplay`}
            className="inline-block rounded-lg bg-[#f0a832] px-5 py-2 text-sm font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
          >
            {getLoc('了解 TendFarm →', 'Learn about TendFarm →', '了解 TendFarm →', 'TendFarm を見てみる →', 'TendFarm 알아보기 →', 'TendFarm entdecken →')}
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
              `Frage ${step} von ${QUESTIONS.length}`
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
          ← {getLoc('上一题', 'Previous', '上一題', '前の質問へ', '이전 질문', 'Zurück')}
        </button>
      )}
    </div>
  )
}
