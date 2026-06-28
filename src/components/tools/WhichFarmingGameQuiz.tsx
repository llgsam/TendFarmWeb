'use client'

import { useState } from 'react'
import Link from 'next/link'

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

type GameId = 'stardew' | 'animal-crossing' | 'hay-day' | 'palia' | 'farming-sim'
type ScoreMap = Partial<Record<GameId, number>>

interface Option {
  zh: string
  en: string
  zhTW: string
  ja: string
  ko: string
  de: string
  scores: ScoreMap
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
    q_zh: '你通常在哪里玩游戏？',
    q_en: 'How do you usually play games?',
    q_zhTW: '你通常在哪裡玩遊戲？',
    q_ja: 'ゲームはどこでプレイしますか？',
    q_ko: '보통 어디서 게임을 하세요?',
    q_de: 'Wie spielst du normalerweise Videospiele?',
    options: [
      {
        zh: '手机——随时随地',
        en: 'On my phone — anywhere, anytime',
        zhTW: '手機——隨時隨地',
        ja: 'スマホ——どこでもいつでも',
        ko: '스마트폰 — 언제 어디서나',
        de: 'Auf dem Handy — überall und jederzeit',
        scores: { 'hay-day': 4 },
      },
      {
        zh: 'PC 电脑',
        en: 'On my PC or laptop',
        zhTW: 'PC 電腦',
        ja: 'PC・ノートパソコン',
        ko: 'PC나 노트북',
        de: 'Am PC oder Laptop',
        scores: { stardew: 2, 'farming-sim': 3, palia: 3 },
      },
      {
        zh: 'Nintendo Switch',
        en: 'Nintendo Switch',
        zhTW: 'Nintendo Switch',
        ja: 'Nintendo Switch',
        ko: 'Nintendo Switch',
        de: 'Nintendo Switch',
        scores: { 'animal-crossing': 4, stardew: 1, palia: 1 },
      },
      {
        zh: 'PS5 / Xbox',
        en: 'PS5 or Xbox',
        zhTW: 'PS5 / Xbox',
        ja: 'PS5 か Xbox',
        ko: 'PS5 또는 Xbox',
        de: 'PS5 oder Xbox',
        scores: { 'farming-sim': 3, stardew: 1 },
      },
      {
        zh: '多端都玩',
        en: 'I play on multiple devices',
        zhTW: '多端都玩',
        ja: '複数のデバイスで',
        ko: '여러 기기에서 다 해요',
        de: 'Auf mehreren Geräten',
        scores: { stardew: 2, palia: 1 },
      },
    ],
  },
  {
    q_zh: '你一次通常玩多久？',
    q_en: 'How long is a typical play session?',
    q_zhTW: '你一次通常玩多久？',
    q_ja: '1回のプレイ時間はどのくらいですか？',
    q_ko: '한 번에 보통 얼마나 플레이하세요?',
    q_de: 'Wie lange spielst du in einer typischen Spielsitzung?',
    options: [
      {
        zh: '5–15 分钟，碎片时间',
        en: '5–15 minutes in spare moments',
        zhTW: '5–15 分鐘，碎片時間',
        ja: '5〜15分、隙間時間に',
        ko: '5~15분, 짬날 때 잠깐',
        de: '5–15 Minuten in kurzen Pausen',
        scores: { 'hay-day': 4, 'animal-crossing': 2 },
      },
      {
        zh: '30–60 分钟',
        en: '30–60 minutes',
        zhTW: '30–60 分鐘',
        ja: '30〜60分',
        ko: '30~60분',
        de: '30–60 Minuten',
        scores: { 'animal-crossing': 3, stardew: 2, 'hay-day': 1 },
      },
      {
        zh: '1–3 小时',
        en: '1–3 hours at a time',
        zhTW: '1–3 小時',
        ja: '1〜3時間',
        ko: '1~3시간',
        de: '1–3 Stunden',
        scores: { stardew: 3, palia: 3, 'farming-sim': 2 },
      },
      {
        zh: '停不下来，经常玩 4 小时以上',
        en: "Can't stop — often 4+ hours in one sitting",
        zhTW: '停不下來，經常玩 4 小時以上',
        ja: '止められない、よく4時間以上ぶっ通しで',
        ko: '멈출 수가 없어서 4시간 이상인 경우도 많아요',
        de: 'Kann nicht aufhören — oft 4+ Stunden am Stück',
        scores: { 'farming-sim': 4, stardew: 2 },
      },
    ],
  },
  {
    q_zh: '农场游戏里，你最想要什么？',
    q_en: 'What do you want most from a farming game?',
    q_zhTW: '農場遊戲裡，你最想要什麼？',
    q_ja: '農場ゲームに一番求めるものは？',
    q_ko: '농장 게임에서 가장 원하는 게 뭐예요?',
    q_de: 'Was wünschst du dir am meisten von einem Farming-Game?',
    options: [
      {
        zh: '真实农业机械 + 深度农场模拟',
        en: 'Real farm machinery and deep agricultural simulation',
        zhTW: '真實農業機械 + 深度農場模擬',
        ja: 'リアルな農業機械と本格的な農場シミュレーション',
        ko: '실제 농업 기계와 깊이 있는 농장 시뮬레이션',
        de: 'Echte Landmaschinen und tiefe Landwirtschaftssimulation',
        scores: { 'farming-sim': 5 },
      },
      {
        zh: '丰富剧情、可爱 NPC、地下城探索',
        en: 'Rich story, lovable NPCs, and dungeons to explore',
        zhTW: '豐富劇情、可愛 NPC、地下城探索',
        ja: '豊かなストーリー、かわいいNPC、ダンジョン探索',
        ko: '풍부한 스토리, 귀여운 NPC, 던전 탐험',
        de: 'Reichhaltige Story, liebenswerte NPCs und Dungeons',
        scores: { stardew: 4 },
      },
      {
        zh: '美化家园、打扮小岛，悠闲生活',
        en: 'Decorating my island and enjoying a peaceful life',
        zhTW: '美化家園、打扮小島，悠閒生活',
        ja: '島のデコレーションと、のんびりした生活',
        ko: '섬을 꾸미고 여유롭게 사는 것',
        de: 'Mein Haus und meine Insel dekorieren und einfach entspannen',
        scores: { 'animal-crossing': 5 },
      },
      {
        zh: '和朋友一起玩，在线开放世界',
        en: 'Playing with friends in an online open world',
        zhTW: '和朋友一起玩，線上開放世界',
        ja: '友達と一緒にオンラインのオープンワールドで',
        ko: '친구들과 함께 온라인 오픈 월드에서',
        de: 'Mit Freunden in einer Online-Open-World spielen',
        scores: { palia: 5 },
      },
      {
        zh: '轻松随意，手机上随便种种',
        en: 'Casual, breezy fun on my phone',
        zhTW: '輕鬆隨意，手機上隨便種種',
        ja: '気軽に、スマホでゆるく農場生活',
        ko: '가볍게 스마트폰으로 편하게 농사 짓기',
        de: 'Entspannt und locker auf dem Handy zocken',
        scores: { 'hay-day': 5 },
      },
    ],
  },
  {
    q_zh: '你对游戏复杂度的偏好？',
    q_en: 'How complex do you like your games?',
    q_zhTW: '你對遊戲複雜度的偏好？',
    q_ja: 'ゲームの複雑さはどのくらいがいいですか？',
    q_ko: '게임 복잡도는 어느 정도가 좋아요?',
    q_de: 'Wie komplex darf dein Spiel sein?',
    options: [
      {
        zh: '越复杂越好，我喜欢查攻略研究系统',
        en: 'The more complex the better — I love wikis and guides',
        zhTW: '越複雜越好，我喜歡查攻略研究系統',
        ja: '複雑なほどいい——攻略サイトを調べるのも楽しみのひとつ',
        ko: '복잡할수록 좋아요, 공략 찾아보는 걸 즐겨요',
        de: 'Je komplexer, desto besser — ich liebe Wikis und Guides',
        scores: { 'farming-sim': 3, stardew: 2 },
      },
      {
        zh: '中等复杂度，边玩边学',
        en: 'Medium complexity — I like to learn as I go',
        zhTW: '中等複雜度，邊玩邊學',
        ja: '中くらい——遊びながら覚えていく感じがいい',
        ko: '중간 정도, 하면서 배워가는 게 좋아요',
        de: 'Mittlere Komplexität — ich lerne gerne beim Spielen',
        scores: { stardew: 3, palia: 2 },
      },
      {
        zh: '简单就好，上手即玩',
        en: 'Simple and approachable — no tutorials please',
        zhTW: '簡單就好，上手即玩',
        ja: 'シンプルがいい、すぐ遊べるほうがいい',
        ko: '단순하게, 바로 시작할 수 있어야 해요',
        de: 'Einfach und zugänglich — kein langes Tutorial',
        scores: { 'animal-crossing': 3, 'hay-day': 3 },
      },
      {
        zh: '随意探索，不被系统绑住',
        en: 'Free exploration without too many systems tying me down',
        zhTW: '隨意探索，不被系統綁住',
        ja: '自由に探索したい、システムに縛られたくない',
        ko: '자유롭게 탐험하고 싶어요, 시스템에 얽매이기 싫어요',
        de: 'Freie Erkundung ohne zu viele Systeme',
        scores: { palia: 3, stardew: 1 },
      },
    ],
  },
  {
    q_zh: '你喜欢和别人一起玩吗？',
    q_en: 'How social do you want your experience to be?',
    q_zhTW: '你喜歡和別人一起玩嗎？',
    q_ja: 'マルチプレイはどのくらいしたいですか？',
    q_ko: '다른 사람들과 함께 플레이하고 싶으세요?',
    q_de: 'Wie sozial soll dein Spielerlebnis sein?',
    options: [
      {
        zh: '我更喜欢一个人安静地玩',
        en: 'I prefer playing alone',
        zhTW: '我更喜歡一個人安靜地玩',
        ja: '一人で静かに遊ぶのが好き',
        ko: '혼자 조용히 하는 게 더 좋아요',
        de: 'Ich spiele lieber allein',
        scores: { stardew: 2, 'farming-sim': 2 },
      },
      {
        zh: '偶尔和好友联机就够了',
        en: 'Occasional co-op with close friends is perfect',
        zhTW: '偶爾和好友連線就夠了',
        ja: 'たまに友達と一緒に遊ぶくらいで十分',
        ko: '가끔 친한 친구랑 같이 하면 충분해요',
        de: 'Gelegentlich mit engen Freunden ist genug',
        scores: { palia: 2, 'animal-crossing': 2, stardew: 1 },
      },
      {
        zh: '我喜欢实时社区活动、认识新玩家',
        en: 'I love real-time community events and meeting new players',
        zhTW: '我喜歡即時社群活動、認識新玩家',
        ja: 'リアルタイムのコミュニティイベントで新しいプレイヤーと出会いたい',
        ko: '실시간 커뮤니티 이벤트를 즐기고 새 플레이어를 만나고 싶어요',
        de: 'Ich liebe Community-Events und neue Spieler kennenlernen',
        scores: { palia: 4, 'animal-crossing': 3 },
      },
      {
        zh: '轻度社交——分享截图、串门看看',
        en: 'Light social — sharing screenshots or visiting friends',
        zhTW: '輕度社交——分享截圖、串門看看',
        ja: 'ゆるくでいい——スクショをシェアしたり、おじゃまするくらい',
        ko: '가볍게 — 스크린샷 공유하거나 친구 섬 놀러가는 정도',
        de: 'Locker sozial — Screenshots teilen oder Freunde besuchen',
        scores: { stardew: 2, 'animal-crossing': 2, 'hay-day': 2 },
      },
    ],
  },
  {
    q_zh: '哪种画风最吸引你？',
    q_en: 'Which art style speaks to you most?',
    q_zhTW: '哪種畫風最吸引你？',
    q_ja: 'どのアートスタイルが一番好きですか？',
    q_ko: '어떤 아트 스타일이 가장 끌려요?',
    q_de: 'Welcher Grafikstil spricht dich am meisten an?',
    options: [
      {
        zh: '像素风 / 复古像素',
        en: 'Cozy pixel art / retro style',
        zhTW: '像素風 / 復古像素',
        ja: 'ドット絵・レトロピクセル',
        ko: '픽셀 아트 / 레트로 스타일',
        de: 'Gemütliches Pixel-Art / Retro-Stil',
        scores: { stardew: 5 },
      },
      {
        zh: '卡通 Q 版，可爱动漫风',
        en: 'Cute cartoon / anime style',
        zhTW: '卡通 Q 版，可愛動漫風',
        ja: 'かわいいカートゥーン・アニメ風',
        ko: '귀여운 카툰 / 애니메이션 스타일',
        de: 'Niedlicher Cartoon / Anime-Stil',
        scores: { 'animal-crossing': 4, palia: 2 },
      },
      {
        zh: '写实高精度，有质感',
        en: 'Realistic, high-fidelity, gritty',
        zhTW: '寫實高精度，有質感',
        ja: 'リアルで高精度、重厚感のある',
        ko: '사실적이고 고해상도, 질감 있는',
        de: 'Realistisch, hochdetailliert, gritty',
        scores: { 'farming-sim': 5 },
      },
      {
        zh: '现代彩色 3D，清新漂亮',
        en: 'Clean, colorful modern 3D',
        zhTW: '現代彩色 3D，清新漂亮',
        ja: 'カラフルでクリーンな現代的3D',
        ko: '깔끔하고 화사한 현대적 3D',
        de: 'Sauberes, buntes modernes 3D',
        scores: { palia: 4, 'animal-crossing': 2 },
      },
    ],
  },
]

interface GameResult {
  id: GameId
  nameZh: string
  nameEn: string
  nameZhTW: string
  nameJa: string
  nameKo: string
  nameDe: string
  taglineZh: string
  taglineEn: string
  taglineZhTW: string
  taglineJa: string
  taglineKo: string
  taglineDe: string
  emoji: string
  descZh: string
  descEn: string
  descZhTW: string
  descJa: string
  descKo: string
  descDe: string
  featuresZh: string[]
  featuresEn: string[]
  featuresZhTW: string[]
  featuresJa: string[]
  featuresKo: string[]
  featuresDe: string[]
  platformsEn: string
  priceEn: string
  hookZh: string
  hookEn: string
  hookZhTW: string
  hookJa: string
  hookKo: string
  hookDe: string
}

const RESULTS: Record<GameId, GameResult> = {
  stardew: {
    id: 'stardew',
    nameZh: '星露谷物语',
    nameEn: 'Stardew Valley',
    nameZhTW: '星露谷物語',
    nameJa: 'スターデューバレー',
    nameKo: '스타듀 밸리',
    nameDe: 'Stardew Valley',
    taglineZh: '农场游戏的标杆之作',
    taglineEn: 'The gold standard of farming games',
    taglineZhTW: '農場遊戲的標竿之作',
    taglineJa: '農場ゲームの金字塔',
    taglineKo: '농장 게임의 교과서',
    taglineDe: 'Der Goldstandard der Farming-Games',
    emoji: '⛏️',
    descZh:
      '星露谷物语是农场游戏界的传奇——深度的耕作系统、感人至深的 NPC 关系、可探索的矿洞和四季更迭的节日。无论你想优化产出还是单纯享受田园生活，星露谷都能满足你。它是一款几乎所有玩家都应该体验一次的游戏。',
    descEn:
      "Stardew Valley is the benchmark farming RPG — deep crop systems, heartfelt NPC relationships, mines to explore, and seasonal festivals. Whether you want to optimize every crop or just enjoy farm life, it delivers. A game virtually every gamer owes themselves.",
    descZhTW:
      '星露谷物語是農場遊戲界的傳奇——深度的耕作系統、感人至深的 NPC 關係、可探索的礦洞和四季更迭的節日。無論你想優化產出還是單純享受田園生活，星露谷都能滿足你。它是一款幾乎所有玩家都應該體驗一次的遊戲。',
    descJa:
      'スターデューバレーは農場ゲームの定番中の定番。深い作物システム、心に響くNPCとの人間関係、探索できる鉱山、そして季節ごとのお祭り。収穫を最適化したい人も、のんびり田舎暮らしを楽しみたい人も、どちらも満足させてくれます。ゲーマーなら一度はプレイすべき作品です。',
    descKo:
      '스타듀 밸리는 농장 게임의 전설입니다. 깊이 있는 농사 시스템, 마음을 움직이는 NPC와의 관계, 탐험할 수 있는 광산, 그리고 계절마다 찾아오는 축제. 수확을 최적화하고 싶은 분도, 그냥 농촌 생활을 즐기고 싶은 분도 모두 만족시켜 줍니다. 게이머라면 한 번은 꼭 해봐야 할 게임이에요.',
    descDe:
      'Stardew Valley ist das Maß aller Dinge bei Farming-Rollenspielen — tiefes Pflanzsystem, herzerwärmende NPC-Beziehungen, Minen zum Erkunden und saisonale Feste. Egal ob du jeden Anbau optimieren oder einfach das Landleben genießen willst — Stardew liefert. Ein Spiel, das wirklich jeder Gamer einmal gespielt haben sollte.',
    featuresZh: [
      '超过 100 小时的内容，四季事件和节日',
      '丰富的 NPC 关系系统，可以结婚、交友',
      '地下城探索 + 战斗，不只是种田',
      '支持 1–4 人联机',
    ],
    featuresEn: [
      '100+ hours of content with seasonal events and festivals',
      'Deep NPC relationship system — make friends, get married',
      'Mine exploration and combat, not just farming',
      '1–4 player multiplayer support',
    ],
    featuresZhTW: [
      '超過 100 小時的內容，四季事件和節日',
      '豐富的 NPC 關係系統，可以結婚、交友',
      '地下城探索 + 戰鬥，不只是種田',
      '支援 1–4 人連線',
    ],
    featuresJa: [
      '100時間以上のコンテンツ、季節イベントとお祭り',
      '深いNPC関係システム――友達を作り、結婚もできる',
      '鉱山探索と戦闘、農業だけじゃない',
      '1〜4人マルチプレイ対応',
    ],
    featuresKo: [
      '100시간 이상의 콘텐츠, 계절 이벤트와 축제',
      '깊이 있는 NPC 관계 시스템 — 친구를 사귀고 결혼도 할 수 있어요',
      '광산 탐험과 전투, 농사만 하는 게 아니에요',
      '1~4인 멀티플레이 지원',
    ],
    featuresDe: [
      'Über 100 Stunden Inhalt mit saisonalen Events und Festen',
      'Tiefes NPC-Beziehungssystem — Freundschaften schließen, heiraten',
      'Minen erkunden und kämpfen, nicht nur Farming',
      '1–4 Spieler Multiplayer',
    ],
    platformsEn: 'PC, Mac, Switch, PS4/5, Xbox, iOS, Android',
    priceEn: '~$15 USD',
    hookZh:
      '星露谷玩家往往是数据驱动型或剧情导向型玩家——这和 TendFarm 用健康数据驱动农场的理念高度契合。如果你喜欢把现实数据变成游戏成就，TendFarm 是你的下一步。',
    hookEn:
      "Stardew players tend to be data-driven or story-driven — which aligns perfectly with TendFarm's model of turning health data into farm progress. If you love seeing real metrics become in-game achievements, TendFarm is your next obsession.",
    hookZhTW:
      '星露谷玩家往往是數據驅動型或劇情導向型玩家——這和 TendFarm 用健康數據驅動農場的理念高度契合。如果你喜歡把現實數據變成遊戲成就，TendFarm 是你的下一步。',
    hookJa:
      'スターデューバレーのプレイヤーはデータ分析や物語の進行を楽しむ傾向があります——TendFarmの「健康データで農場を育てる」というコンセプトとぴったり合います。ステップ数や睡眠が実績に変わる体験が好きなら、TendFarmは次の習慣になるはずです。',
    hookKo:
      '스타듀 밸리 플레이어들은 데이터 분석이나 스토리 진행을 즐기는 경향이 있어요 — TendFarm의 "건강 데이터로 농장을 키운다"는 개념과 딱 맞아떨어집니다. 실제 수치가 게임 성과로 바뀌는 걸 좋아한다면, TendFarm이 다음 습관이 될 거예요.',
    hookDe:
      "Stardew-Spieler sind oft daten- oder storyfokussiert — was perfekt zu TendFarms Ansatz passt, Gesundheitsdaten in Fortschritte auf der Farm umzuwandeln. Wenn du liebst, wie echte Metriken zu Ingame-Erfolgen werden, wird TendFarm deine nächste Obsession.",
  },
  'animal-crossing': {
    id: 'animal-crossing',
    nameZh: '动物森友会',
    nameEn: 'Animal Crossing: New Horizons',
    nameZhTW: '動物森友會',
    nameJa: 'あつまれ どうぶつの森',
    nameKo: '모여봐요 동물의 숲',
    nameDe: 'Animal Crossing: New Horizons',
    taglineZh: '你的专属无压力小岛',
    taglineEn: 'Your pressure-free island paradise',
    taglineZhTW: '你的專屬無壓力小島',
    taglineJa: 'プレッシャーのない、あなただけの島',
    taglineKo: '스트레스 없는 나만의 섬',
    taglineDe: 'Deine stressfreie Insel-Oase',
    emoji: '🏝️',
    descZh:
      '动森是世界上最受欢迎的"无压力游戏"之一。你在自己的小岛上按实时时钟生活——早上钓鱼、下午捉虫、晚上和邻居聊天。没有失败状态，没有时间压力，只有你想怎么布置就怎么布置的小岛。适合喜欢慢节奏、装饰创作和社交的玩家。',
    descEn:
      "Animal Crossing is one of the world's most beloved no-pressure games. Life on your island follows a real-time clock — fish in the morning, catch bugs in the afternoon, chat with neighbors at night. No fail states, no urgency, just your island the way you want it.",
    descZhTW:
      '動森是世界上最受歡迎的「無壓力遊戲」之一。你在自己的小島上按實時時鐘生活——早上釣魚、下午捉蟲、晚上和鄰居聊天。沒有失敗狀態，沒有時間壓力，只有你想怎麼佈置就怎麼佈置的小島。適合喜歡慢節奏、裝飾創作和社交的玩家。',
    descJa:
      '「あつ森」は世界中で愛される「ノープレッシャーゲーム」のひとつ。現実の時刻と連動した島での生活——朝は釣り、午後は虫とり、夜はご近所さんとおしゃべり。失敗もなし、急かされることもなし。自分の好きなように島を飾れます。のんびり派、インテリアが好きな人、交流したい人にぴったり。',
    descKo:
      '동물의 숲은 세계에서 가장 사랑받는 "무압박 게임" 중 하나예요. 현실 시계와 연동된 섬 생활 — 아침엔 낚시, 오후엔 곤충 채집, 밤엔 이웃 주민과 대화. 실패 없이, 조급함 없이, 내가 원하는 대로 섬을 꾸밀 수 있어요. 여유로운 페이스, 인테리어, 소통을 좋아하는 분께 딱 맞아요.',
    descDe:
      'Animal Crossing ist eines der beliebtesten „No-Pressure-Spiele" weltweit. Das Leben auf deiner Insel folgt der Echtzeituhr — morgens angeln, nachmittags Insekten fangen, abends mit Bewohnern plaudern. Kein Scheitern, kein Zeitdruck, nur deine Insel, so wie du sie haben willst. Perfekt für entspannte Typen, Kreativmenschen und alle, die soziale Aspekte mögen.',
    featuresZh: [
      '实时时钟系统，游戏随现实时间变化',
      '高度自由的岛屿改造和家具摆放',
      '可以拜访朋友的岛屿，社交功能丰富',
      '每个月都有限定活动和季节事件',
    ],
    featuresEn: [
      'Real-time clock — the game changes with the real world',
      'Incredibly deep island and home customization',
      'Visit friends islands, active player community',
      'Monthly limited events and seasonal activities',
    ],
    featuresZhTW: [
      '實時時鐘系統，遊戲隨現實時間變化',
      '高度自由的島嶼改造和家具擺放',
      '可以拜訪朋友的島嶼，社交功能豐富',
      '每個月都有限定活動和季節事件',
    ],
    featuresJa: [
      'リアルタイム時計制——現実と一緒に季節が変わる',
      '自由度の高い島・部屋のカスタマイズ',
      '友達の島を訪問、活発なコミュニティ',
      '毎月の限定イベントと季節の行事',
    ],
    featuresKo: [
      '실시간 시계 시스템 — 현실 시간에 따라 게임이 바뀌어요',
      '자유도 높은 섬과 방 꾸미기',
      '친구 섬 방문 가능, 활발한 커뮤니티',
      '매월 한정 이벤트와 계절 활동',
    ],
    featuresDe: [
      'Echtzeituhr — das Spiel ändert sich mit der realen Welt',
      'Unglaublich tiefes Insel- und Haus-Customizing',
      'Freundesinseln besuchen, aktive Community',
      'Monatliche Limited Events und Saisonaktivitäten',
    ],
    platformsEn: 'Nintendo Switch only',
    priceEn: '~$60 USD (Switch game)',
    hookZh:
      '动森玩家珍视生活节律和自然节奏——这正是 TendFarm 的核心：你的睡眠和步数驱动农场的自然生长。如果你喜欢和生活节奏同步的游戏，TendFarm 把这个体验带进了健康管理。',
    hookEn:
      'Animal Crossing players value natural rhythms and life pacing — which is exactly what TendFarm is built on. Your sleep and steps drive your farm naturally. If you love a game that syncs with your real life, TendFarm takes that experience into health.',
    hookZhTW:
      '動森玩家珍視生活節律和自然節奏——這正是 TendFarm 的核心：你的睡眠和步數驅動農場的自然生長。如果你喜歡和生活節奏同步的遊戲，TendFarm 把這個體驗帶進了健康管理。',
    hookJa:
      'あつ森プレイヤーは自然なリズムと生活のペースを大切にします——それはまさにTendFarmが目指すもの。睡眠や歩数が農場を自然に育てます。現実の生活とシンクロするゲームが好きなら、TendFarmはその体験を健康管理に持ち込みます。',
    hookKo:
      '동물의 숲 플레이어들은 자연스러운 리듬과 생활 페이스를 소중히 여기는데 — 그게 바로 TendFarm의 핵심이에요. 수면과 걸음 수가 자연스럽게 농장을 성장시킵니다. 현실 생활과 싱크가 맞는 게임을 좋아한다면, TendFarm이 그 경험을 건강 관리로 가져다줄 거예요.',
    hookDe:
      'Animal-Crossing-Spieler schätzen natürliche Rhythmen und Lebenstakt — genau das ist die Basis von TendFarm. Dein Schlaf und deine Schritte lassen deine Farm natürlich wachsen. Wenn du ein Spiel liebst, das mit deinem echten Leben synchron läuft, bringt TendFarm dieses Erlebnis in die Gesundheit.',
  },
  'hay-day': {
    id: 'hay-day',
    nameZh: 'Hay Day',
    nameEn: 'Hay Day',
    nameZhTW: 'Hay Day',
    nameJa: 'Hay Day',
    nameKo: '헤이 데이',
    nameDe: 'Hay Day',
    taglineZh: '最好玩的手机农场游戏',
    taglineEn: 'The best mobile farming game',
    taglineZhTW: '最好玩的手機農場遊戲',
    taglineJa: 'スマホ農場ゲームの定番',
    taglineKo: '최고의 모바일 농장 게임',
    taglineDe: 'Das beste Mobile-Farming-Game',
    emoji: '📱',
    descZh:
      'Hay Day 是手机农场游戏的标杆——免费下载，操作简单，5 分钟就能收获一轮庄稼。你可以建设农场、开发农产品加工链、加入社区互助。碎片时间玩，通勤时玩，睡前玩——随时随地，没有压力。',
    descEn:
      "Hay Day is the benchmark mobile farming game — free to download, simple to pick up, and rewarding in 5-minute sessions. Build your farm, develop production chains, and join a helpful community. Play during commutes, before bed, wherever life takes you.",
    descZhTW:
      'Hay Day 是手機農場遊戲的標竿——免費下載，操作簡單，5 分鐘就能收穫一輪莊稼。你可以建設農場、開發農產品加工鏈、加入社群互助。碎片時間玩，通勤時玩，睡前玩——隨時隨地，沒有壓力。',
    descJa:
      'Hay Dayはモバイル農場ゲームの代名詞——無料でダウンロードでき、5分あれば作物を収穫できます。農場を発展させ、農産物の加工ルートを開拓し、近所の人たちと助け合いながら進めていきます。通勤中でも、寝る前でも、ちょっとした隙間時間でサクッと遊べます。',
    descKo:
      '헤이 데이는 모바일 농장 게임의 기준입니다. 무료 다운로드에 조작도 간단하고, 5분이면 작물을 수확할 수 있어요. 농장을 키우고, 농산물 가공 체인을 개발하고, 이웃과 서로 도우며 진행합니다. 출퇴근 시간에도, 자기 전에도, 틈날 때마다 부담 없이 플레이할 수 있어요.',
    descDe:
      'Hay Day ist der Maßstab für mobile Farming-Spiele — kostenlos herunterladen, einfach loslegen und in 5-Minuten-Sessions Ernte einfahren. Bau deine Farm aus, entwickle Verarbeitungsketten für Agrarprodukte und hilf deiner Nachbarschaft. In der Bahn, vor dem Schlafen, wo immer du bist — kein Stress, kein Druck.',
    featuresZh: [
      '免费下载，随时随地玩 5 分钟',
      '丰富的农产品加工链和贸易系统',
      '邻里系统，互相帮助完成订单',
      '每周限时活动，保持新鲜感',
    ],
    featuresEn: [
      'Free to download, fun in 5-minute sessions',
      'Deep production chains and trading system',
      'Neighborhood system — help each other complete orders',
      'Weekly time-limited events keep things fresh',
    ],
    featuresZhTW: [
      '免費下載，隨時隨地玩 5 分鐘',
      '豐富的農產品加工鏈和貿易系統',
      '鄰里系統，互相幫助完成訂單',
      '每週限時活動，保持新鮮感',
    ],
    featuresJa: [
      '無料ダウンロード、5分でサクッと遊べる',
      '充実した農産物加工チェーンと取引システム',
      'ご近所システム——注文を助け合って達成',
      '毎週の期間限定イベントで飽きさせない',
    ],
    featuresKo: [
      '무료 다운로드, 5분씩 짬내서 플레이 가능',
      '풍부한 농산물 가공 체인과 거래 시스템',
      '이웃 시스템 — 서로 도우며 주문 완료',
      '매주 기간 한정 이벤트로 신선함 유지',
    ],
    featuresDe: [
      'Kostenlos, Spaß in 5-Minuten-Sessions',
      'Tiefe Produktionsketten und Handelssystem',
      'Nachbarschaftssystem — gemeinsam Bestellungen erfüllen',
      'Wöchentliche Zeitlimit-Events halten es frisch',
    ],
    platformsEn: 'iOS and Android (mobile only)',
    priceEn: 'Free (in-app purchases)',
    hookZh:
      '如果你喜欢随时打开、没有负担的游戏体验，TendFarm 也是如此——你的步数和睡眠在后台悄悄驱动农场成长，不需要主动操作，早上打开 App 就看到成果。',
    hookEn:
      "If you love low-commitment, open-anytime gaming, TendFarm delivers that too — your steps and sleep quietly drive your farm in the background. No active management needed; open the app in the morning and see what grew.",
    hookZhTW:
      '如果你喜歡隨時打開、沒有負擔的遊戲體驗，TendFarm 也是如此——你的步數和睡眠在背景悄悄驅動農場成長，不需要主動操作，早上打開 App 就看到成果。',
    hookJa:
      'いつでも開けて気軽に遊べるゲームが好きなら、TendFarmも同じです——歩数や睡眠がバックグラウンドで農場をこっそり育ててくれます。アクティブな操作は不要で、朝アプリを開けば成長した農場が迎えてくれます。',
    hookKo:
      '언제든 부담 없이 열 수 있는 게임을 좋아한다면, TendFarm도 마찬가지예요. 걸음 수와 수면이 백그라운드에서 조용히 농장을 성장시켜줍니다. 직접 조작 없이도, 아침에 앱을 열면 자란 농장을 볼 수 있어요.',
    hookDe:
      'Wenn du ein Spiel liebst, das du jederzeit entspannt öffnen kannst, dann passt TendFarm genauso — deine Schritte und dein Schlaf lassen deine Farm im Hintergrund wachsen. Kein aktives Spielen nötig; morgens die App öffnen und sehen, was gewachsen ist.',
  },
  palia: {
    id: 'palia',
    nameZh: 'Palia',
    nameEn: 'Palia',
    nameZhTW: 'Palia',
    nameJa: 'Palia',
    nameKo: '팔리아',
    nameDe: 'Palia',
    taglineZh: '免费的社交农场 MMO',
    taglineEn: 'The free cozy social farming MMO',
    taglineZhTW: '免費的社交農場 MMO',
    taglineJa: '無料でできるコージーMMO',
    taglineKo: '무료 소셜 농장 MMO',
    taglineDe: 'Das kostenlose gemütliche Sozial-MMO',
    emoji: '🌍',
    descZh:
      'Palia 是一款免费的在线多人农场游戏，有精美的 3D 画面和充实的开放世界。你可以和朋友一起种田、建造家园、探索世界，结交来自全球的玩家。如果你觉得单人农场游戏太孤独，Palia 是为你准备的。',
    descEn:
      "Palia is a free-to-play online cozy MMO with beautiful 3D visuals and a rich open world. Farm, build, and explore alongside friends — or make new ones from around the world. If solo farming feels lonely, Palia is the answer.",
    descZhTW:
      'Palia 是一款免費的線上多人農場遊戲，有精美的 3D 畫面和充實的開放世界。你可以和朋友一起種田、建造家園、探索世界，結交來自全球的玩家。如果你覺得單人農場遊戲太孤單，Palia 是為你準備的。',
    descJa:
      'Paliaは無料でプレイできるオンラインの農場ゲームで、美しい3Dビジュアルと充実したオープンワールドが特徴です。友達と一緒に農業、家づくり、世界の探索ができ、世界中のプレイヤーとも交流できます。一人でプレイするのが寂しく感じるなら、Paliaはそのための答えです。',
    descKo:
      '팔리아는 무료로 플레이할 수 있는 온라인 농장 게임으로, 아름다운 3D 그래픽과 풍부한 오픈 월드가 특징이에요. 친구들과 함께 농사짓고, 집을 짓고, 세계를 탐험하거나 전 세계 플레이어들과 교류할 수 있어요. 혼자 하는 농장 게임이 외롭게 느껴진다면 팔리아가 정답이에요.',
    descDe:
      'Palia ist ein kostenloses Online-Farming-Spiel mit wunderschönen 3D-Visuals und einer reichen offenen Welt. Bau, ernte und erkunde gemeinsam mit Freunden — oder lern neue Leute aus aller Welt kennen. Wenn sich Solo-Farming einsam anfühlt, ist Palia die Antwort.',
    featuresZh: [
      '完全免费游玩，无需购买游戏',
      '精美 3D 世界，可与朋友实时同屏',
      '建造和装饰自己的家园',
      '丰富的采集、钓鱼、烹饪和工艺系统',
    ],
    featuresEn: [
      'Completely free to play',
      'Beautiful 3D world — play alongside friends in real time',
      'Deep housing and home decoration system',
      'Rich gathering, fishing, cooking, and crafting systems',
    ],
    featuresZhTW: [
      '完全免費遊玩，無需購買遊戲',
      '精美 3D 世界，可與朋友即時同屏',
      '建造和裝飾自己的家園',
      '豐富的採集、釣魚、烹飪和工藝系統',
    ],
    featuresJa: [
      '完全無料でプレイ可能',
      '美麗な3Dワールド——友達とリアルタイムで冒険',
      '自分のおうちを建てて飾るシステム',
      '豊富な採集・釣り・料理・クラフトシステム',
    ],
    featuresKo: [
      '완전 무료 플레이',
      '아름다운 3D 세계 — 친구와 실시간으로 함께',
      '내 집을 짓고 꾸미는 시스템',
      '풍부한 채집, 낚시, 요리, 제작 시스템',
    ],
    featuresDe: [
      'Komplett kostenlos spielbar',
      'Wunderschöne 3D-Welt — spiel mit Freunden in Echtzeit',
      'Tiefes Haus- und Einrichtungssystem',
      'Reichhaltiges Sammel-, Angel-, Koch- und Crafting-System',
    ],
    platformsEn: 'PC (Steam) and Nintendo Switch',
    priceEn: 'Free to play',
    hookZh:
      'Palia 玩家喜欢在游戏里建立真实连接——TendFarm 的下一步是把你现实中的健康旅程变得同样有社区感。你的农场进度反映你真实的生活节律，这比任何 MMO 都更贴近你。',
    hookEn:
      'Palia players value genuine connection through games — TendFarm takes that further by making your real-life health journey feel like a shared story. Your farm reflects your actual daily rhythms, more personal than any MMO.',
    hookZhTW:
      'Palia 玩家喜歡在遊戲裡建立真實連結——TendFarm 的下一步是把你現實中的健康旅程變得同樣有社群感。你的農場進度反映你真實的生活節律，這比任何 MMO 都更貼近你。',
    hookJa:
      'Paliaプレイヤーはゲームを通じたリアルなつながりを大切にします——TendFarmはさらに一歩進んで、あなたの現実の健康の旅をコミュニティ感のあるものにします。農場の進捗が実際の日常リズムを反映し、どんなMMOより自分に近い体験になります。',
    hookKo:
      '팔리아 플레이어들은 게임을 통한 진짜 연결을 소중히 여기는데 — TendFarm은 한 걸음 더 나아가 당신의 현실 속 건강 여정도 같은 커뮤니티 감각으로 만들어 줍니다. 농장 진행 상황이 실제 일상 리듬을 반영해, 어떤 MMO보다 자신에게 가깝게 느껴질 거예요.',
    hookDe:
      'Palia-Spieler schätzen echte Verbindungen durch Spiele — TendFarm geht noch weiter und macht deinen realen Gesundheitsweg genauso gemeinschaftlich. Dein Farm-Fortschritt spiegelt deinen echten Alltag wider, persönlicher als jedes MMO.',
  },
  'farming-sim': {
    id: 'farming-sim',
    nameZh: '模拟农场 25',
    nameEn: 'Farming Simulator 25',
    nameZhTW: '模擬農場 25',
    nameJa: 'Farming Simulator 25',
    nameKo: '파밍 시뮬레이터 25',
    nameDe: 'Farming Simulator 25',
    taglineZh: '最真实的农业模拟',
    taglineEn: 'The most realistic farming simulation',
    taglineZhTW: '最真實的農業模擬',
    taglineJa: '最もリアルな農業シミュレーション',
    taglineKo: '가장 사실적인 농업 시뮬레이션',
    taglineDe: 'Die realistischste Landwirtschaftssimulation',
    emoji: '🚜',
    descZh:
      '模拟农场系列是硬核农业玩家的圣地。真实授权的农机品牌（John Deere、Case IH、Fendt 等）、精确的土地管理系统、农作物生长和收割循环。如果你对真实农业有热情，或者喜欢深度模拟游戏，这是你的不二选择。',
    descEn:
      "The Farming Simulator series is the holy grail for hardcore farming fans. Licensed real-world brands (John Deere, Case IH, Fendt, and more), precise land management, realistic crop cycles. If you're passionate about real farming or love deep simulation, this is your game.",
    descZhTW:
      '模擬農場系列是硬核農業玩家的聖地。真實授權的農機品牌（John Deere、Case IH、Fendt 等）、精確的土地管理系統、農作物生長和收割循環。如果你對真實農業有熱情，或者喜歡深度模擬遊戲，這是你的不二選擇。',
    descJa:
      'ファーミングシミュレーターシリーズは、本格派農業ファンの聖地です。実在するブランドの農機（ジョンディア、ケースIH、フェントなど）、精密な土地管理システム、リアルな作物の生育サイクル。本物の農業に情熱を持っている方や、深いシミュレーションゲームが好きな方にとって、これ以上ないタイトルです。',
    descKo:
      '파밍 시뮬레이터 시리즈는 하드코어 농업 팬들의 성지입니다. 실제 라이선스 농기계 브랜드(John Deere, Case IH, Fendt 등), 정밀한 토지 관리 시스템, 현실적인 작물 성장 및 수확 주기. 실제 농업에 열정이 있거나 깊이 있는 시뮬레이션 게임을 좋아한다면 이 게임이 정답이에요.',
    descDe:
      'Die Farming-Simulator-Serie ist die Pilgerstätte für hartgesottene Landwirtschafts-Fans. Echte Lizenzen (John Deere, Case IH, Fendt und mehr), präzises Flächenmanagement, realistische Anbauzyklen. Wenn du leidenschaftlich an echter Landwirtschaft interessiert bist oder tiefe Simulationen liebst, ist das dein Spiel.',
    featuresZh: [
      '数百种真实授权农机和设备',
      '精确的耕作、播种、施肥、收割循环',
      '支持多人联机合作经营农场',
      '强大的 MOD 社区，内容无限扩展',
    ],
    featuresEn: [
      'Hundreds of licensed real-world farm machines',
      'Precise tillage, seeding, fertilizing, and harvesting cycles',
      'Multiplayer — run a farm operation together',
      'Massive modding community with endless content',
    ],
    featuresZhTW: [
      '數百種真實授權農機和設備',
      '精確的耕作、播種、施肥、收割循環',
      '支援多人連線合作經營農場',
      '強大的 MOD 社群，內容無限擴展',
    ],
    featuresJa: [
      '数百種類の実在ライセンス農機',
      '精密な耕起・播種・施肥・収穫サイクル',
      'マルチプレイ対応、農場を一緒に経営',
      '巨大なMODコミュニティで無限に拡張可能',
    ],
    featuresKo: [
      '수백 종의 실제 라이선스 농기계 장비',
      '정밀한 경작, 파종, 시비, 수확 주기',
      '멀티플레이로 함께 농장 운영 가능',
      '거대한 MOD 커뮤니티로 무한 확장',
    ],
    featuresDe: [
      'Hunderte lizenzierter realer Landmaschinen',
      'Präzise Bearbeitungs-, Saat-, Dünge- und Erntezyklen',
      'Multiplayer — gemeinsam eine Farmoperation führen',
      'Riesige Modding-Community mit endlosem Content',
    ],
    platformsEn: 'PC, Mac, PS4/5, Xbox',
    priceEn: '~$40 USD',
    hookZh:
      '模拟农场玩家享受精确系统和可量化的成果——TendFarm 把这种满足感带进健康领域：你的步数、睡眠、HRV 都有精确的公式转化为农场产出。终于有一个游戏让你的现实数据也可以被优化。',
    hookEn:
      "Farming Simulator players love precise systems and measurable outcomes — TendFarm brings that satisfaction to health: your steps, sleep, and HRV each convert to farm output via exact formulas. Finally, a game where your real-life metrics can be min-maxed.",
    hookZhTW:
      '模擬農場玩家享受精確系統和可量化的成果——TendFarm 把這種滿足感帶進健康領域：你的步數、睡眠、HRV 都有精確的公式轉化為農場產出。終於有一個遊戲讓你的現實數據也可以被優化。',
    hookJa:
      'ファーミングシミュレータープレイヤーは正確なシステムと数値化できる成果を好みます——TendFarmはその満足感を健康領域に持ち込みます。歩数、睡眠、HRVがそれぞれ正確な計算式で農場の成果に変換されます。現実のデータも最適化できる体験の始まりです。',
    hookKo:
      '파밍 시뮬레이터 플레이어들은 정밀한 시스템과 측정 가능한 성과를 즐기는데 — TendFarm은 그 만족감을 건강 영역으로 가져옵니다. 걸음 수, 수면, HRV가 각각 정확한 공식으로 농장 산출물로 변환됩니다. 드디어 현실 데이터도 최적화할 수 있어요.',
    hookDe:
      'Farming-Simulator-Spieler lieben präzise Systeme und messbare Ergebnisse — TendFarm bringt diese Befriedigung in die Gesundheit: deine Schritte, dein Schlaf und deine HRV fließen nach genauen Formeln in den Farm-Output. Endlich ein Spiel, in dem deine echten Werte optimiert werden können.',
  },
}

function calcResult(answers: ScoreMap[]): GameId {
  const totals: Record<GameId, number> = {
    stardew: 0,
    'animal-crossing': 0,
    'hay-day': 0,
    palia: 0,
    'farming-sim': 0,
  }
  answers.forEach((scores) => {
    for (const [gameId, score] of Object.entries(scores) as [GameId, number][]) {
      totals[gameId] += score
    }
  })
  return (Object.keys(totals) as GameId[]).reduce((a, b) => (totals[a] >= totals[b] ? a : b))
}

interface Props {
  locale: string
}

export function WhichFarmingGameQuiz({ locale }: Props) {
  const [step, setStep] = useState<number>(0)
  const [answers, setAnswers] = useState<ScoreMap[]>([])

  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const getLocArr = (zh: string[], en: string[], zhTW?: string[], ja?: string[], ko?: string[], de?: string[]): string[] => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'

  const handleAnswer = (scores: ScoreMap) => {
    const next = [...answers, scores]
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
        <div className="mb-6 text-6xl">🎮</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {getLoc('哪款农场游戏最适合你？', 'Which Farming Game Should You Play?', '哪款農場遊戲最適合你？', 'あなたにぴったりの農場ゲームは？', '당신에게 맞는 농장 게임은?', 'Welches Farming-Game passt zu dir?')}
        </h2>
        <p className="mb-2 text-[#8a9a7a]">
          {getLoc(
            '6 个问题，帮你从上百款农场游戏中找到最适合的那一款。',
            '6 questions to match you with the perfect farming game from hundreds of options.',
            '6 個問題，幫你從上百款農場遊戲中找到最適合的那一款。',
            '6つの質問で、あなたにぴったりの農場ゲームを見つけます。',
            '6가지 질문으로 수백 개의 농장 게임 중 딱 맞는 것을 찾아드려요.',
            '6 Fragen, um das perfekte Farming-Game für dich zu finden.',
          )}
        </p>
        <p className="mb-8 text-sm text-[#4a5a4a]">
          {getLoc(
            '适合：新手选游戏 / 老玩家寻找下一款',
            'Great for: newcomers choosing a first game, or veterans looking for their next',
            '適合：新手選遊戲 / 老玩家尋找下一款',
            '初めての人にも、次の1本を探すベテランにも',
            '처음 시작하는 분도, 다음 게임을 찾는 베테랑도',
            'Für Einsteiger und erfahrene Spieler auf der Suche nach dem nächsten Hit',
          )}
        </p>
        <button
          onClick={() => setStep(1)}
          className="rounded-xl bg-[#f0a832] px-8 py-3 font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
        >
          {getLoc('开始测试 →', 'Start Quiz →', '開始測試 →', 'はじめる →', '테스트 시작 →', 'Quiz starten →')}
        </button>
      </div>
    )
  }

  // Result
  if (step === QUESTIONS.length + 1) {
    const gameId = calcResult(answers)
    const result = RESULTS[gameId]
    const url = `https://www.farmgamehub.com/${locale}/quizzes/which-farming-game`
    const gameName = getLoc(result.nameZh, result.nameEn, result.nameZhTW, result.nameJa, result.nameKo, result.nameDe)
    const shareText = getLoc(
      `测评结果：最适合我的农场游戏是「${gameName}」！来测测你的：${url}`,
      `Quiz result: the perfect farming game for me is ${gameName}! Find yours: ${url}`,
      `測評結果：最適合我的農場遊戲是「${gameName}」！來測測你的：${url}`,
      `診断結果：私にぴったりの農場ゲームは「${gameName}」！あなたも試してみて：${url}`,
      `테스트 결과: 내게 딱 맞는 농장 게임은 「${gameName}」! 당신도 해보세요: ${url}`,
      `Quiz-Ergebnis: Das perfekte Farming-Game für mich ist „${gameName}"! Finde deins: ${url}`,
    )
    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {getLoc('最适合你的游戏是', 'Your perfect farming game is:', '最適合你的遊戲是', 'あなたにぴったりの農場ゲームは', '당신에게 가장 잘 맞는 농장 게임은', 'Das perfekte Farming-Game für dich:')}
          </p>
          <h2 className="text-3xl font-bold text-[#f0a832]">
            {gameName}
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

        {/* Key features */}
        <div className="mb-5">
          <h3 className="mb-3 text-sm font-semibold text-[#8a9a7a]">
            {getLoc('核心亮点', 'Key highlights', '核心亮點', 'こんな魅力があります', '핵심 매력 포인트', 'Das macht es besonders')}
          </h3>
          <ul className="space-y-2">
            {getLocArr(result.featuresZh, result.featuresEn, result.featuresZhTW, result.featuresJa, result.featuresKo, result.featuresDe).map((f, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#e8dcc8]">
                <span className="text-[#f0a832] shrink-0">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform & price */}
        <div className="mb-6 flex flex-wrap gap-3 text-xs">
          <span className="rounded-full border border-[#2d5a27] px-3 py-1 text-[#8a9a7a]">
            📱 {result.platformsEn}
          </span>
          <span className="rounded-full border border-[#2d5a27] px-3 py-1 text-[#8a9a7a]">
            💰 {result.priceEn}
          </span>
        </div>

        <div className="mb-6">
          <ShareButton text={shareText} locale={locale} />
        </div>

        {/* TendFarm Hook */}
        <div className="mb-8 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a] p-5">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">
            {getLoc('你可能也会喜欢 →', 'You might also love →', '你可能也會喜歡 →', 'こちらも気になりませんか →', '이것도 좋아할지도 →', 'Das könnte dich auch begeistern →')} TendFarm
          </p>
          <p className="mb-4 text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(result.hookZh, result.hookEn, result.hookZhTW, result.hookJa, result.hookKo, result.hookDe)}
          </p>
          <Link
            href={`/${locale}/gameplay`}
            className="inline-block rounded-lg bg-[#f0a832] px-5 py-2 text-sm font-semibold text-[#0f1a0f] transition-colors hover:bg-[#f0a832]/80"
          >
            {getLoc('了解 TendFarm →', 'Learn about TendFarm →', '了解 TendFarm →', 'TendFarmについて →', 'TendFarm 알아보기 →', 'Mehr über TendFarm →')}
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
      {/* Progress */}
      <div className="mb-6">
        <div className="mb-1 flex justify-between text-xs text-[#8a9a7a]">
          <span>
            {getLoc(`问题 ${step} / ${QUESTIONS.length}`, `Question ${step} of ${QUESTIONS.length}`, `問題 ${step} / ${QUESTIONS.length}`, `質問 ${step} / ${QUESTIONS.length}`, `질문 ${step} / ${QUESTIONS.length}`, `Frage ${step} von ${QUESTIONS.length}`)}
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

      {/* Question */}
      <h2 className="mb-6 text-xl font-semibold text-[#e8dcc8]">
        {getLoc(q.q_zh, q.q_en, q.q_zhTW, q.q_ja, q.q_ko, q.q_de)}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.scores)}
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
            setAnswers(answers.slice(0, -1))
            setStep(step - 1)
          }}
          className="mt-4 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
        >
          {getLoc('← 上一题', '← Previous', '← 上一題', '← 前の質問', '← 이전', '← Zurück')}
        </button>
      )}
    </div>
  )
}
