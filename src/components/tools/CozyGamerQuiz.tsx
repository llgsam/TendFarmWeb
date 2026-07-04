'use client'

import { useState } from 'react'

interface Option {
  zh: string
  en: string
  zhTW: string
  ja: string
  ko: string
  de: string
  points: number
}

const QUESTIONS: Array<{
  q_zh: string
  q_en: string
  q_zhTW: string
  q_ja: string
  q_ko: string
  q_de: string
  options: Option[]
}> = [
  {
    q_zh: '游戏里有限时任务或时间压力，你会…？',
    q_en: 'When a game has timed quests or time pressure, you:',
    q_zhTW: '遊戲裡有限時任務或時間壓力，你會…？',
    q_ja: 'ゲームに時間制限クエストやタイムプレッシャーがある場合は？',
    q_ko: '게임에 시간 제한 퀘스트나 압박이 있을 때, 어떻게 하시나요？',
    q_de: 'Wenn ein Spiel Zeitquests oder Zeitdruck hat, was machst du?',
    options: [
      { zh: '很喜欢，刺激', en: 'Love it — exciting challenge', zhTW: '很喜歡，刺激', ja: '大好き！ドキドキして楽しい', ko: '좋아요！스릴 있고 재밌어요', de: 'Ich liebe es — aufregend!', points: 0 },
      { zh: '勉强接受，但有点烦', en: 'Tolerate it, but find it a bit stressful', zhTW: '勉強接受，但有點煩', ja: 'まあ許せるけど、ちょっとイライラする', ko: '그나마 참을 수 있지만 좀 스트레스예요', de: 'Tolerierbar, aber etwas nervig', points: 1 },
      { zh: '专门找没有时间压力的游戏', en: 'Specifically seek games without time pressure', zhTW: '專門找沒有時間壓力的遊戲', ja: '時間制限のないゲームを意識的に選んでる', ko: '시간 압박 없는 게임만 골라서 해요', de: 'Ich suche gezielt nach Spielen ohne Zeitdruck', points: 2 },
      { zh: '一般不太注意', en: "Don't usually notice or care", zhTW: '一般不太注意', ja: 'あまり気にしない', ko: '별로 신경 안 써요', de: 'Ich bemerke es meistens nicht mal', points: 1 },
    ],
  },
  {
    q_zh: '在游戏里失败了，你的第一反应是？',
    q_en: 'If you fail at something in a game, your first reaction is:',
    q_zhTW: '在遊戲裡失敗了，你的第一反應是？',
    q_ja: 'ゲームで失敗したとき、最初にどう思う？',
    q_ko: '게임에서 실패했을 때 첫 반응은？',
    q_de: 'Wenn du in einem Spiel scheiterst, ist deine erste Reaktion:',
    options: [
      { zh: '重来！我要通关', en: 'Try again — I will beat this', zhTW: '重來！我要過關', ja: 'もう一回！絶対クリアしてみせる', ko: '다시! 반드시 클리어하고 말겠어', de: 'Nochmal — ich schaffe das!', points: 0 },
      { zh: '复盘一下，看看哪里出了问题', en: 'Analyze what went wrong', zhTW: '複盤一下，看看哪裡出了問題', ja: '何が悪かったか分析する', ko: '어디서 틀렸는지 분석해봐요', de: 'Ich analysiere, was schiefgelaufen ist', points: 0 },
      { zh: '有点烦，先去干别的', en: 'Mildly annoyed — time for a break', zhTW: '有點煩，先去做別的事', ja: 'ちょっとイラっとして、別のことをしに行く', ko: '약간 짜증나서 다른 걸 하러 가요', de: 'Leicht genervt — ich mache erst mal was anderes', points: 1 },
      { zh: '我一般不玩会有失败惩罚的游戏', en: 'I tend to avoid games with harsh fail states', zhTW: '我一般不玩會有失敗懲罰的遊戲', ja: '失敗ペナルティのあるゲームはそもそも選ばない', ko: '실패 패널티가 있는 게임은 애초에 안 해요', de: 'Solche Spiele spiele ich grundsätzlich nicht', points: 2 },
    ],
  },
  {
    q_zh: '你理想的游戏场景是？',
    q_en: 'Your ideal gaming setup looks like:',
    q_zhTW: '你理想的遊戲場景是？',
    q_ja: '理想のゲーム環境は？',
    q_ko: '당신의 이상적인 게임 환경은？',
    q_de: 'Dein ideales Gaming-Setup sieht so aus:',
    options: [
      { zh: '毯子+零食+耳机，能沉浸就完美', en: 'Blanket, snacks, headphones — full comfort mode', zhTW: '毛毯+零食+耳機，能沉浸就完美', ja: 'ブランケット＋お菓子＋イヤホン、没入感が最高', ko: '담요+간식+이어폰, 완전히 몰입하면 최고', de: 'Decke, Snacks, Kopfhörer — voller Komfort', points: 2 },
      { zh: '高刷显示器+专属座椅，认真竞技', en: 'High-refresh monitor, proper chair — serious setup', zhTW: '高刷新率螢幕+專用椅子，認真競技', ja: '高リフレッシュレートモニター＋ゲーミングチェアで本気モード', ko: '고주사율 모니터+전용 의자로 진지하게 게임', de: 'High-Refresh-Monitor, Gaming-Stuhl — ernsthafter Setup', points: 0 },
      { zh: '沙发上躺着随便玩', en: 'Couch with no effort', zhTW: '躺在沙發上隨便玩', ja: 'ソファに寝転がって気軽に', ko: '소파에 누워서 편하게 플레이', de: 'Auf der Couch lümmeln — ganz entspannt', points: 1 },
      { zh: '无所谓，有设备能玩就行', en: "Anything works — I'm not picky", zhTW: '無所謂，有設備能玩就行', ja: 'どこでも何でも、あれば遊べる', ko: '상관없어요, 할 수 있으면 뭐든지', de: 'Egal — Hauptsache spielen', points: 1 },
    ],
  },
  {
    q_zh: '看到一款新游戏，什么最先吸引你？',
    q_en: 'What catches your eye first when you see a new game?',
    q_zhTW: '看到一款新遊戲，什麼最先吸引你？',
    q_ja: '新しいゲームを見たとき、最初に気になるのは？',
    q_ko: '새 게임을 봤을 때 가장 먼저 눈에 띄는 것은？',
    q_de: 'Was fällt dir bei einem neuen Spiel zuerst auf?',
    options: [
      { zh: '画风可爱、氛围温馨', en: 'Cute art style and cozy atmosphere', zhTW: '畫風可愛、氛圍溫馨', ja: 'かわいいビジュアルと癒し系の雰囲気', ko: '귀여운 그래픽과 아늑한 분위기', de: 'Süßer Kunststil und gemütliche Atmosphäre', points: 2 },
      { zh: '创新机制或硬核挑战', en: 'Innovative or challenging mechanics', zhTW: '創新機制或硬核挑戰', ja: '斬新なシステムや歯ごたえのある難易度', ko: '혁신적인 메카닉이나 하드코어한 도전', de: 'Innovative Mechaniken oder knackige Herausforderung', points: 0 },
      { zh: '好友在玩或口碑很好', en: 'Friends are playing it or it has great reviews', zhTW: '朋友在玩或口碑很好', ja: '友達がやってるか、評判がいい', ko: '친구가 하거나 평이 좋아서', de: 'Freunde spielen es oder es hat tolle Bewertungen', points: 1 },
      { zh: '等打折，先观望', en: "Waiting for a sale — I'll see", zhTW: '等打折，先觀望', ja: 'セールになるまで様子見', ko: '할인할 때까지 기다려요', de: 'Ich warte auf einen Sale — mal schauen', points: 1 },
    ],
  },
  {
    q_zh: '玩游戏时，你多久查一次攻略？',
    q_en: 'How often do you look up guides or wikis while playing?',
    q_zhTW: '玩遊戲時，你多久查一次攻略？',
    q_ja: 'プレイ中、攻略サイトやWikiはどのくらい見る？',
    q_ko: '게임 중 공략이나 위키를 얼마나 자주 찾아보시나요？',
    q_de: 'Wie oft schaust du dir beim Spielen Guides oder Wikis an?',
    options: [
      { zh: '经常——我要走最优路线', en: 'Often — I optimize every decision', zhTW: '經常——我要走最優路線', ja: 'よく見る――最適ルートで進みたいから', ko: '자주 봐요 — 최적 루트로 가야 하니까', de: 'Oft — ich will jede Entscheidung optimieren', points: 0 },
      { zh: '只有卡关了才查', en: 'Only when I get truly stuck', zhTW: '只有卡關了才查', ja: 'どうしても詰まったときだけ', ko: '정말 막혔을 때만 봐요', de: 'Nur wenn ich wirklich feststecke', points: 1 },
      { zh: '很少——自己慢慢摸索才有意思', en: 'Rarely — discovery is the fun part', zhTW: '很少——自己慢慢摸索才有意思', ja: 'ほとんど見ない――自分で発見するのが楽しいから', ko: '거의 안 봐요 — 스스로 발견하는 게 재밌으니까', de: 'Selten — die Entdeckung ist der Spaß', points: 2 },
      { zh: '从不，错过什么都无所谓', en: "Never — I don't care about 100%", zhTW: '從不，錯過什麼都無所謂', ja: '絶対見ない――何か見逃しても気にしない', ko: '절대 안 봐요 — 뭔가 놓쳐도 상관없어요', de: 'Nie — es ist mir egal, wenn ich etwas verpasse', points: 1 },
    ],
  },
  {
    q_zh: '辛苦了一天之后，你最想用游戏做什么？',
    q_en: 'After a tough day, what do you want from a game?',
    q_zhTW: '辛苦了一天之後，你最想用遊戲做什麼？',
    q_ja: 'きつい一日の後、ゲームに何を求める？',
    q_ko: '힘든 하루를 보낸 후, 게임에서 뭘 원하시나요？',
    q_de: 'Was willst du nach einem harten Tag von einem Spiel?',
    options: [
      { zh: '打一局竞技游戏，发泄情绪', en: 'Play something competitive to blow off steam', zhTW: '打一局競技遊戲，發洩情緒', ja: '対戦ゲームでストレス発散', ko: '경쟁 게임 한 판으로 스트레스 해소', de: 'Kompetitiv spielen und Dampf ablassen', points: 0 },
      { zh: '完成一个有挑战的任务，找找成就感', en: 'Accomplish something challenging and feel productive', zhTW: '完成一個有挑戰的任務，找找成就感', ja: '難しいクエストをクリアして達成感を感じたい', ko: '도전적인 미션을 클리어해서 성취감을 느끼고 싶어요', de: 'Etwas Herausforderndes schaffen und produktiv fühlen', points: 0 },
      { zh: '打开一个轻松的游戏，脑子放空', en: 'Open a chill game and just exist in it', zhTW: '打開一個輕鬆的遊戲，腦子放空', ja: 'まったりゲームを開いて、ただそこにいる', ko: '가벼운 게임 켜서 멍하니 있어요', de: 'Ein entspanntes Spiel öffnen und einfach darin versinken', points: 2 },
      { zh: '联机和朋友玩，聊聊天', en: 'Join friends online for social play', zhTW: '連線和朋友玩，聊聊天', ja: 'フレンドとオンラインでわいわい遊ぶ', ko: '온라인으로 친구들이랑 같이 놀아요', de: 'Mit Freunden online spielen und quatschen', points: 1 },
    ],
  },
  {
    q_zh: '「没有明确结局」的游戏（可以无限玩下去），你觉得？',
    q_en: 'Games with no clear ending (you can play forever) feel:',
    q_zhTW: '「沒有明確結局」的遊戲（可以無限玩下去），你覺得？',
    q_ja: '「明確なエンディングがない」ゲーム（永遠に遊べる）ってどう思う？',
    q_ko: '「뚜렷한 엔딩이 없는」 게임（영원히 플레이 가능）은 어떻게 생각하세요？',
    q_de: 'Spiele ohne klares Ende (man kann ewig spielen) fühlen sich an:',
    options: [
      { zh: '完美！我就喜欢活在一个游戏世界里', en: 'Perfect — I love just existing in a game world', zhTW: '完美！我就喜歡活在一個遊戲世界裡', ja: '最高！ゲームの世界に住んでいたい', ko: '완벽해요! 게임 세계에서 그냥 살고 싶어요', de: 'Perfekt — ich lebe einfach in der Spielwelt', points: 2 },
      { zh: '还好，只要有新内容就行', en: 'Fine, as long as content keeps coming', zhTW: '還好，只要有新內容就行', ja: '悪くはない――新コンテンツが続く限り', ko: '괜찮아요, 새 컨텐츠만 계속 나오면', de: 'Okay, solange neue Inhalte kommen', points: 1 },
      { zh: '我需要一个明确目标可以去完成', en: 'I need clear goals and milestones', zhTW: '我需要一個明確目標可以去完成', ja: '明確な目標がないと困る', ko: '명확한 목표가 있어야 해요', de: 'Ich brauche klare Ziele und Meilensteine', points: 0 },
      { zh: '有点无聊，游戏应该有一个结局', en: 'Boring — games should have a proper ending', zhTW: '有點無聊，遊戲應該有一個結局', ja: 'ちょっと退屈――ゲームにはちゃんとエンディングが欲しい', ko: '좀 지루해요 — 게임은 제대로 된 결말이 있어야죠', de: 'Langweilig — Spiele sollten ein echtes Ende haben', points: 0 },
    ],
  },
  {
    q_zh: '你一般怎么发现新游戏？',
    q_en: 'How do you usually discover new games?',
    q_zhTW: '你一般怎麼發現新遊戲？',
    q_ja: '新しいゲームはどうやって見つける？',
    q_ko: '새 게임은 보통 어떻게 발견하시나요？',
    q_de: 'Wie entdeckst du normalerweise neue Spiele?',
    options: [
      { zh: '刷到有人分享好看的游戏截图', en: 'Seeing pretty screenshots shared online', zhTW: '刷到有人分享好看的遊戲截圖', ja: 'SNSで綺麗なスクショを見かけて', ko: 'SNS에서 예쁜 스크린샷을 보고', de: 'Hübsche Screenshots in sozialen Medien', points: 2 },
      { zh: '朋友推荐或者一起联机', en: 'Friend recommendations or they invite me to play', zhTW: '朋友推薦或者一起連線', ja: '友達のおすすめや一緒に遊ぶ誘い', ko: '친구 추천이나 같이 하자는 초대', de: 'Freundesempfehlungen oder Einladungen zum gemeinsamen Spielen', points: 1 },
      { zh: '销量榜或游戏奖项', en: 'Bestseller charts or game awards', zhTW: '銷量榜或遊戲獎項', ja: 'セールスランキングやゲームアワード', ko: '판매 순위나 게임 어워드', de: 'Verkaufscharts oder Spielepreise', points: 0 },
      { zh: '主播/up 主在玩', en: 'A streamer or content creator is playing it', zhTW: '主播/UP主在玩', ja: '配信者やVTuberがやってるのを見て', ko: '스트리머나 유튜버가 플레이하는 걸 보고', de: 'Ein Streamer oder Content Creator spielt es', points: 1 },
    ],
  },
]

const MAX_POINTS = QUESTIONS.length * 2 // 16

interface ResultTier {
  minScore: number
  labelZh: string
  labelEn: string
  labelZhTW: string
  labelJa: string
  labelKo: string
  labelDe: string
  emoji: string
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

const RESULT_TIERS: ResultTier[] = [
  {
    minScore: 13,
    labelZh: '超级 Cozy Gamer',
    labelEn: 'True Cozy Gamer',
    labelZhTW: '超級 Cozy 玩家',
    labelJa: '真のコージーゲーマー',
    labelKo: '진정한 코지 게이머',
    labelDe: 'Echter Cozy Gamer',
    emoji: '🌿',
    descZh:
      '放松就是你玩游戏的全部理由。你不在乎通关，不在乎排名，就在乎那种「今天可以什么都不想」的感觉。毯子、热饮、一个有治愈感的游戏世界——这就是你的快乐公式。世界上有很多种玩家，但 cozy gamer 是灵魂最自由的那一类。',
    descEn:
      "Relaxation is your entire reason to game. You don't care about rankings, completion rates, or being the best — you care about that feeling of total mental rest. A soft blanket, a warm drink, a comforting game world — that's your formula for happiness. There are many kinds of gamers, but cozy gamers have the most peaceful souls.",
    descZhTW:
      '放鬆就是你玩遊戲的全部理由。你不在乎通關，不在乎排名，就在乎那種「今天可以什麼都不想」的感覺。毛毯、熱飲、一個有治愈感的遊戲世界——這就是你的快樂公式。世界上有很多種玩家，但 cozy gamer 是靈魂最自由的那一類。',
    descJa:
      'ゲームは完全にリラックスするためにある、それがあなたのスタイル。クリア率も順位も気にしない。「今日は何も考えなくていい」そんな感覚を大切にしている。ブランケット、温かい飲み物、癒しのゲーム世界――それがあなたの幸せの公式。コージーゲーマーは、ゲーマーの中で最も自由な魂を持つ。',
    descKo:
      '게임을 하는 이유는 오직 하나, 완전한 릴렉스. 클리어 률도 순위도 상관없어요. 「오늘은 아무 생각도 안 해도 돼」라는 느낌이 전부죠. 담요, 따뜻한 음료, 치유감 넘치는 게임 세계 — 이게 당신의 행복 공식이에요. 세상엔 다양한 게이머가 있지만, 코지 게이머의 영혼이 가장 자유롭습니다.',
    descDe:
      'Entspannung ist dein einziger Grund zum Spielen. Rankings, Fortschrittsbalken, der Anspruch der Beste zu sein — das interessiert dich nicht. Eine weiche Decke, ein heißes Getränk, eine tröstliche Spielwelt — das ist deine Formel für Glück. Es gibt viele Arten von Spielern, aber Cozy Gamer haben die friedlichsten Seelen.',
    gamesZh: ['星露谷物语', '动物森友会', 'Cozy Grove', 'Wylde Flowers', 'Palia'],
    gamesEn: ['Stardew Valley', 'Animal Crossing: New Horizons', 'Cozy Grove', 'Wylde Flowers', 'Palia'],
    gamesZhTW: ['星露谷物語', '動物森友會', 'Cozy Grove', 'Wylde Flowers', 'Palia'],
    gamesJa: ['スターデューバレー', 'あつまれ どうぶつの森', 'Cozy Grove', 'Wylde Flowers', 'Palia'],
    gamesKo: ['스타듀 밸리', '모여봐요 동물의 숲', 'Cozy Grove', 'Wylde Flowers', 'Palia'],
    gamesDe: ['Stardew Valley', 'Animal Crossing: New Horizons', 'Cozy Grove', 'Wylde Flowers', 'Palia'],
  },
  {
    minScore: 9,
    labelZh: 'Cozy 派玩家',
    labelEn: 'Cozy Soul',
    labelZhTW: 'Cozy 派玩家',
    labelJa: 'コージーソウル',
    labelKo: '코지 소울',
    labelDe: 'Cozy Soul',
    emoji: '☕',
    descZh:
      '你是骨子里的 cozy gamer，但偶尔也能接受一点挑战——只要不破坏整体的放松感就行。你的游戏库里大概既有治愈系的农场游戏，也有偶尔打打的冒险游戏。你理解「舒适」和「无聊」的区别，也清楚什么游戏值得你的时间。',
    descEn:
      "You're a cozy gamer at heart, but you can handle occasional challenge — as long as it doesn't break the overall relaxing vibe. Your library probably has both comforting farm games and occasional adventure games. You know the difference between cozy and boring, and you know exactly which games deserve your time.",
    descZhTW:
      '你是骨子裡的 cozy gamer，但偶爾也能接受一點挑戰——只要不破壞整體的放鬆感就行。你的遊戲庫裡大概既有治愈系的農場遊戲，也有偶爾打打的冒險遊戲。你理解「舒適」和「無聊」的區別，也清楚什麼遊戲值得你的時間。',
    descJa:
      '本質的にはコージーゲーマーだけど、ゲーム全体の雰囲気を壊さなければ少し挑戦があっても受け入れられる。ライブラリには癒し系の農場ゲームと、たまにやるアドベンチャーゲームが共存してそう。「まったり」と「退屈」の違いをちゃんと分かっていて、時間を使う価値のあるゲームをよく分かっている。',
    descKo:
      '마음속으로는 코지 게이머인데, 전반적인 릴렉스 분위기를 해치지 않는다면 가끔 도전도 받아들일 수 있어요. 라이브러리에는 치유계 농장 게임과 가끔 하는 어드벤처 게임이 공존할 것 같아요. 「편안함」과 「지루함」의 차이를 알고, 어떤 게임에 시간을 쓸 가치가 있는지도 잘 알고 있어요.',
    descDe:
      'Du bist im Herzen ein Cozy Gamer, kannst aber gelegentliche Herausforderungen akzeptieren — solange sie die entspannte Atmosphäre nicht zerstören. In deiner Bibliothek finden sich wahrscheinlich sowohl gemütliche Farmspiele als auch gelegentliche Abenteuer. Du kennst den Unterschied zwischen gemütlich und langweilig und weißt genau, welche Spiele deine Zeit wert sind.',
    gamesZh: ['星露谷物语', 'Coral Island', 'My Time at Sandrock', 'Fields of Mistria', '动物森友会'],
    gamesEn: ['Stardew Valley', 'Coral Island', 'My Time at Sandrock', 'Fields of Mistria', 'Animal Crossing'],
    gamesZhTW: ['星露谷物語', 'Coral Island', 'My Time at Sandrock', 'Fields of Mistria', '動物森友會'],
    gamesJa: ['スターデューバレー', 'Coral Island', 'My Time at Sandrock', 'Fields of Mistria', 'あつまれ どうぶつの森'],
    gamesKo: ['스타듀 밸리', 'Coral Island', 'My Time at Sandrock', 'Fields of Mistria', '모여봐요 동물의 숲'],
    gamesDe: ['Stardew Valley', 'Coral Island', 'My Time at Sandrock', 'Fields of Mistria', 'Animal Crossing'],
  },
  {
    minScore: 5,
    labelZh: '均衡派玩家',
    labelEn: 'The Balanced Gamer',
    labelZhTW: '均衡派玩家',
    labelJa: 'バランス型ゲーマー',
    labelKo: '균형파 게이머',
    labelDe: 'Der ausgewogene Spieler',
    emoji: '🎮',
    descZh:
      '你是那种真正的「全能型」玩家——能打 boss、能种田、能搞建设、能参加限时活动，全凭当时的心情。你不偏执于某一种游戏风格，这让你的游戏体验非常丰富。你既能欣赏 cozy 游戏的治愈感，也不排斥有点压力的挑战。',
    descEn:
      "You're a genuine all-rounder — you can boss-fight, farm, build, and do timed events, all depending on your mood. You're not rigid about any one style, which makes your gaming life incredibly rich. You can appreciate the therapeutic value of cozy games and handle some challenge.",
    descZhTW:
      '你是那種真正的「全能型」玩家——能打 boss、能種田、能搞建設、能參加限時活動，全憑當時的心情。你不偏執於某一種遊戲風格，這讓你的遊戲體驗非常豐富。你既能欣賞 cozy 遊戲的治愈感，也不排斥有點壓力的挑戰。',
    descJa:
      '本物の「オールラウンダー」タイプ。ボス戦もできるし、農場経営もできるし、建設もできるし、期間限定イベントも楽しめる。気分次第で何でもこなせる。特定のスタイルに縛られないから、ゲーム体験がとても豊か。コージーゲームの癒し感も理解できるし、ちょっとした難しさも苦にならない。',
    descKo:
      '진정한 올라운더 게이머예요 — 보스전도 할 수 있고, 농사도 짓고, 건설도 하고, 시간 제한 이벤트도 모두 그날의 기분에 따라 즐길 수 있어요. 특정 스타일에 집착하지 않기 때문에 게임 경험이 굉장히 풍부해요. 코지 게임의 치유감도 공감하고, 약간의 도전도 거부하지 않아요.',
    descDe:
      'Du bist ein echter Allrounder — du kannst Bosse besiegen, farmen, bauen und zeitlich begrenzte Events machen, je nach Laune. Du bist nicht starr bei einem bestimmten Stil, was dein Spielerleben unglaublich reichhaltig macht. Du schätzt den therapeutischen Wert von Cozy Games und kannst auch Herausforderungen begegnen.',
    gamesZh: ['星露谷物语', 'My Time at Sandrock', 'Palia', 'Coral Island', 'Hades'],
    gamesEn: ['Stardew Valley', 'My Time at Sandrock', 'Palia', 'Coral Island', 'Hades'],
    gamesZhTW: ['星露谷物語', 'My Time at Sandrock', 'Palia', 'Coral Island', 'Hades'],
    gamesJa: ['スターデューバレー', 'My Time at Sandrock', 'Palia', 'Coral Island', 'Hades'],
    gamesKo: ['스타듀 밸리', 'My Time at Sandrock', 'Palia', 'Coral Island', 'Hades'],
    gamesDe: ['Stardew Valley', 'My Time at Sandrock', 'Palia', 'Coral Island', 'Hades'],
  },
  {
    minScore: 2,
    labelZh: '挑战派玩家',
    labelEn: 'The Challenger',
    labelZhTW: '挑戰派玩家',
    labelJa: 'チャレンジャー',
    labelKo: '도전파 게이머',
    labelDe: 'Der Herausforderer',
    emoji: '⚔️',
    descZh:
      '你玩游戏是为了挑战自己、证明自己。失败不是挫折，是练习的机会。你的游戏时间是宝贵的，所以你倾向于选择有深度、有挑战、有成长感的游戏。cozy 游戏？可能偶尔用来放松——但对你来说，「太轻松」很快会变成「太无聊」。',
    descEn:
      "You game to challenge yourself and prove something. Failure isn't discouraging — it's practice. Your game time is precious, so you lean toward games with depth, challenge, and growth. Cozy games? Maybe occasionally to unwind — but 'too easy' quickly becomes 'too boring' for you.",
    descZhTW:
      '你玩遊戲是為了挑戰自己、證明自己。失敗不是挫折，是練習的機會。你的遊戲時間是寶貴的，所以你傾向於選擇有深度、有挑戰、有成長感的遊戲。cozy 遊戲？可能偶爾用來放鬆——但對你來說，「太輕鬆」很快會變成「太無聊」。',
    descJa:
      'ゲームは自分を試す場所だと思っている。失敗は挫折じゃなく、練習の機会。ゲーム時間は貴重だから、深みがあって、難しくて、成長できるゲームを選ぶ傾向がある。コージーゲーム？たまに息抜きには使うかもしれない――でも「簡単すぎる」はすぐ「退屈」になってしまう。',
    descKo:
      '게임은 자신을 시험하고 증명하기 위해 해요. 실패는 좌절이 아니라 연습의 기회죠. 게임 시간이 소중하니까 깊이 있고 도전적이고 성장감이 있는 게임을 선택하는 편이에요. 코지 게임？가끔 쉬기 위해 할 수도 있지만, 「너무 쉬운 건」 금방 「너무 지루해져요」.',
    descDe:
      'Du spielst um dich selbst herauszufordern und etwas zu beweisen. Scheitern ist keine Niederlage — es ist Training. Deine Spielzeit ist wertvoll, daher bevorzugst du Spiele mit Tiefe, Herausforderung und Wachstum. Cozy Games? Vielleicht gelegentlich zum Entspannen — aber „zu einfach" wird für dich schnell „zu langweilig".',
    gamesZh: ['星露谷物语（优化路线）', 'Hades', 'Dark Souls', 'Farming Simulator', 'Deep Rock Galactic'],
    gamesEn: ['Stardew Valley (optimized routes)', 'Hades', 'Dark Souls', 'Farming Simulator', 'Deep Rock Galactic'],
    gamesZhTW: ['星露谷物語（優化路線）', 'Hades', 'Dark Souls', 'Farming Simulator', 'Deep Rock Galactic'],
    gamesJa: ['スターデューバレー（最適化ルート）', 'Hades', 'Dark Souls', 'Farming Simulator', 'Deep Rock Galactic'],
    gamesKo: ['스타듀 밸리（최적화 루트）', 'Hades', 'Dark Souls', 'Farming Simulator', 'Deep Rock Galactic'],
    gamesDe: ['Stardew Valley (optimierte Routen)', 'Hades', 'Dark Souls', 'Farming Simulator', 'Deep Rock Galactic'],
  },
  {
    minScore: 0,
    labelZh: '硬核玩家',
    labelEn: 'The Hardcore Player',
    labelZhTW: '硬核玩家',
    labelJa: 'ハードコアプレイヤー',
    labelKo: '하드코어 플레이어',
    labelDe: 'Der Hardcore-Spieler',
    emoji: '🔥',
    descZh:
      '你来游戏世界是要证明自己的。轻松？无聊。舒适？可以有，但只是偶尔喘口气。你最享受那种「终于打过去了」的成就感，你的玩家 DNA 里写满了挑战和胜利。也许 cozy 游戏不是你的主场——但谁知道呢，也许哪天你会发现星露谷的种菜流程也挺让人上瘾的。',
    descEn:
      "You're here to prove yourself. Easy? Boring. Comforting? Maybe occasionally. Your greatest joy is that 'I finally beat it' feeling, and your gamer DNA is written in challenge and victory. Cozy games might not be your main arena — but who knows, maybe one day you'll find that min-maxing Stardew Valley crops is surprisingly addictive.",
    descZhTW:
      '你來遊戲世界是要證明自己的。輕鬆？無聊。舒適？可以有，但只是偶爾喘口氣。你最享受那種「終於打過去了」的成就感，你的玩家 DNA 裡寫滿了挑戰和勝利。也許 cozy 遊戲不是你的主場——但誰知道呢，也許哪天你會發現星露谷的種菜流程也挺讓人上癮的。',
    descJa:
      'ゲーム世界に来るのは自分を証明するためだ。簡単すぎる？それは退屈。たまに息抜き？それくらいならいい。最大の喜びは「ついにクリアした」という達成感で、あなたのゲーマーDNAは挑戦と勝利で構成されている。コージーゲームはメインじゃないかもしれない――でも、いつかスターデューバレーの農作物最適化が意外とクセになると気づくかも。',
    descKo:
      '게임 세계에 온 건 자신을 증명하기 위해서예요. 쉬운 건？지루해요. 편안함？가끔 숨 고르기 정도는 괜찮아요. 가장 큰 즐거움은 「드디어 잡았다」의 성취감이고, 당신의 게이머 DNA는 도전과 승리로 가득 차 있어요. 코지 게임은 당신의 주무대가 아닐 수 있어요 — 하지만 언젠가 스타듀 밸리의 작물 최적화가 의외로 중독된다는 걸 발견할지도 몰라요.',
    descDe:
      'Du bist in der Spielwelt um dich zu beweisen. Einfach? Langweilig. Gemütlich? Gelegentlich zum Durchatmen. Deine größte Freude ist das „Ich hab es endlich geschafft"-Gefühl, und deine Gamer-DNA ist aus Herausforderung und Sieg gemacht. Cozy Games sind vielleicht nicht deine Bühne — aber wer weiß, vielleicht findest du eines Tages heraus, dass Stardew Valley-Ernte-Optimierung überraschend süchtig macht.',
    gamesZh: ['Dark Souls / Elden Ring', 'Hades', 'Hollow Knight', '星露谷物语（卷王路线）', 'Farming Simulator'],
    gamesEn: ['Dark Souls / Elden Ring', 'Hades', 'Hollow Knight', 'Stardew Valley (optimized run)', 'Farming Simulator'],
    gamesZhTW: ['Dark Souls / Elden Ring', 'Hades', 'Hollow Knight', '星露谷物語（卷王路線）', 'Farming Simulator'],
    gamesJa: ['Dark Souls / Elden Ring', 'Hades', 'Hollow Knight', 'スターデューバレー（最速攻略）', 'Farming Simulator'],
    gamesKo: ['Dark Souls / Elden Ring', 'Hades', 'Hollow Knight', '스타듀 밸리 (최적화 런)', 'Farming Simulator'],
    gamesDe: ['Dark Souls / Elden Ring', 'Hades', 'Hollow Knight', 'Stardew Valley (optimierter Run)', 'Farming Simulator'],
  },
]

function calcResult(totalPoints: number): ResultTier {
  return RESULT_TIERS.find((tier) => totalPoints >= tier.minScore) ?? RESULT_TIERS[RESULT_TIERS.length - 1]
}

function getPercentage(points: number): number {
  return Math.round((points / MAX_POINTS) * 100)
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

export function CozyGamerQuiz({ locale }: Props) {
  const [step, setStep] = useState<number>(0) // 0=intro, 1–N=questions, N+1=result
  const [totalPoints, setTotalPoints] = useState<number>(0)

  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'

  const handleAnswer = (points: number) => {
    const nextPoints = totalPoints + points
    setTotalPoints(nextPoints)
    setStep(step + 1)
  }

  const reset = () => {
    setTotalPoints(0)
    setStep(0)
  }

  // Intro
  if (step === 0) {
    return (
      <div className="text-center">
        <div className="mb-6 text-6xl">☕</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {getLoc('你是 Cozy Gamer 吗？', 'Are You a Cozy Gamer?', '你是 Cozy Gamer 嗎？', 'あなたはコージーゲーマー？', '당신은 코지 게이머인가요?', 'Bist du ein Cozy Gamer?')}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {getLoc(
            '8 个问题，测出你的 Cozy 指数（0%–100%），看看你的灵魂属于哪个阵营。',
            '8 questions to calculate your Cozy Score (0%–100%) and find which gaming tribe you belong to.',
            '8 個問題，測出你的 Cozy 指數（0%–100%），看看你的靈魂屬於哪個陣營。',
            '8問でコージースコア（0%〜100%）を計算、あなたのゲーマータイプが分かります。',
            '8가지 질문으로 당신의 코지 점수（0%–100%）를 계산하고 어떤 게이머 유형인지 알아보세요.',
            '8 Fragen berechnen deinen Cozy-Score (0%–100%) und zeigen, zu welchem Spielertyp du gehörst.'
          )}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {getLoc(
            '结果可以截图分享，测测朋友的 Cozy 指数 →',
            'Share your score — see if your friends are cozy or hardcore →',
            '結果可以截圖分享，測測朋友的 Cozy 指數 →',
            '結果をシェアして、友達のコージー度もチェック →',
            '결과를 공유하고 친구들의 코지 점수도 확인해보세요 →',
            'Teile dein Ergebnis — sind deine Freunde cozy oder hardcore? →'
          )}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {getLoc('开始测试 →', 'Start Quiz →', '開始測試 →', 'クイズを始める →', '테스트 시작 →', 'Quiz starten →')}
        </button>
      </div>
    )
  }

  // Result
  if (step === QUESTIONS.length + 1) {
    const percentage = getPercentage(totalPoints)
    const result = calcResult(totalPoints)

    const getGames = (): string[] => {
      if (locale === 'zh') return result.gamesZh
      if (locale === 'zh-TW') return result.gamesZhTW
      if (locale === 'ja') return result.gamesJa
      if (locale === 'ko') return result.gamesKo
      if (locale === 'de') return result.gamesDe
      return result.gamesEn
    }

    const url = `https://www.farmgamehub.com/${locale}/quizzes/cozy-gamer`
    const resultLabel = getLoc(result.labelZh, result.labelEn, result.labelZhTW, result.labelJa, result.labelKo, result.labelDe)
    const shareText = getLoc(
      `我测出来了！我的 Cozy 指数是 ${percentage}%（${result.labelZh}）。来测测你的：${url}`,
      `I scored ${percentage}% on the Cozy Gamer quiz — I'm "${result.labelEn}"! Take it here: ${url}`,
      `我測出來了！我的 Cozy 指數是 ${percentage}%（${result.labelZhTW}）。來測測你的：${url}`,
      `コージースコア ${percentage}%（${result.labelJa}）でした！あなたも試してみて：${url}`,
      `내 코지 점수는 ${percentage}%（${result.labelKo}）예요! 당신도 해보세요: ${url}`,
      `Mein Cozy-Score: ${percentage}% — „${result.labelDe}"! Mach den Test: ${url}`
    )

    return (
      <div>
        {/* Score display */}
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {getLoc('你的 Cozy 指数', 'Your Cozy Score', '你的 Cozy 指數', 'コージースコア', '당신의 코지 점수', 'Dein Cozy-Score')}
          </p>
          <div className="mb-2 text-5xl font-bold text-[#f0a832]">{percentage}%</div>
          <p className="text-lg font-semibold text-[#e8dcc8]">
            {resultLabel}
          </p>
        </div>

        {/* Score bar */}
        <div className="mb-6">
          <div className="h-2 w-full rounded-full bg-[#2d3d2d]">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[#2d5a27] to-[#f0a832] transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-[#4a5a4a]">
            <span>{getLoc('硬核', 'Hardcore', '硬核', 'ハードコア', '하드코어', 'Hardcore')}</span>
            <span>Cozy</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-5">
          <p className="leading-relaxed text-[#e8dcc8]">
            {getLoc(result.descZh, result.descEn, result.descZhTW, result.descJa, result.descKo, result.descDe)}
          </p>
        </div>

        {/* Game recs */}
        <div className="mb-5">
          <h3 className="mb-3 text-sm font-semibold text-[#8a9a7a]">
            {getLoc('适合你的游戏', 'Games that fit you', '適合你的遊戲', 'あなたにぴったりのゲーム', '당신에게 맞는 게임', 'Spiele, die zu dir passen')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {getGames().map((g) => (
              <span key={g} className="rounded-full border border-[#2d5a27] px-3 py-1 text-sm text-[#e8dcc8]">
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="mb-6">
          <p className="mb-3 text-sm text-[#8a9a7a]">
            {getLoc(
              '分享给朋友，看看他们的 Cozy 指数 👇',
              'Share your score with friends 👇',
              '分享給朋友，看看他們的 Cozy 指數 👇',
              '友達にシェアして、コージー度を比べよう 👇',
              '친구에게 공유하고 코지 점수를 비교해보세요 👇',
              'Teile dein Ergebnis mit Freunden 👇'
            )}
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

  // Question
  const qIndex = step - 1
  const q = QUESTIONS[qIndex]
  const progress = (qIndex / QUESTIONS.length) * 100

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[#8a9a7a]">
          <span>
            {isZh
              ? `问题 ${step} / ${QUESTIONS.length}`
              : locale === 'zh-TW'
              ? `問題 ${step} / ${QUESTIONS.length}`
              : locale === 'ja'
              ? `問題 ${step} / ${QUESTIONS.length}`
              : locale === 'ko'
              ? `질문 ${step} / ${QUESTIONS.length}`
              : locale === 'de'
              ? `Frage ${step} von ${QUESTIONS.length}`
              : `Question ${step} of ${QUESTIONS.length}`}
          </span>
          <span>{getLoc('Cozy 指数进度', 'Cozy Score', 'Cozy 指數進度', 'コージースコア', '코지 점수', 'Cozy-Score')}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[#2d3d2d]">
          <div
            className="h-1.5 rounded-full bg-[#f0a832] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="mb-6 text-xl font-semibold text-[#e8dcc8]">
        {getLoc(q.q_zh, q.q_en, q.q_zhTW, q.q_ja, q.q_ko, q.q_de)}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.points)}
            className="w-full rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-5 py-4 text-left text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:bg-[#1a2e1a]"
          >
            {getLoc(opt.zh, opt.en, opt.zhTW, opt.ja, opt.ko, opt.de)}
          </button>
        ))}
      </div>

      {/* Back */}
      {step > 1 && (
        <button
          onClick={() => {
            setStep(0)
            setTotalPoints(0)
          }}
          className="mt-4 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
        >
          ↺ {getLoc('重新开始', 'Restart', '重新開始', 'やり直す', '다시 시작', 'Neustart')}
        </button>
      )}
    </div>
  )
}
