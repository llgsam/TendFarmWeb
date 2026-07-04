'use client'

import { useState, useEffect } from 'react'

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

type Archetype = 'optimizer' | 'aesthete' | 'explorer' | 'zen'

const QUESTIONS: Array<{
  q_zh: string
  q_en: string
  q_zhTW: string
  q_ja: string
  q_ko: string
  q_de: string
  options: Array<{ zh: string; en: string; zhTW: string; ja: string; ko: string; de: string; type: Archetype }>
}> = [
  {
    q_zh: '拿到一块新地，你第一件事是？',
    q_en: 'You just unlocked new land. What do you do first?',
    q_zhTW: '拿到一塊新地，你第一件事是？',
    q_ja: '新しい土地を手に入れたら、まず何をしますか？',
    q_ko: '새 땅을 얻으면 가장 먼저 하는 일은？',
    q_de: 'Du hast neues Land freigeschaltet. Was machst du zuerst?',
    options: [
      { zh: '查作物数据，算最优种植配置', en: 'Look up crop data and calculate the optimal layout', zhTW: '查作物資料，算最優種植配置', ja: '作物データを調べて最適なレイアウトを計算する', ko: '작물 데이터 검색해서 최적 배치 계산하기', de: 'Pflanzendaten nachschlagen und das optimale Layout berechnen', type: 'optimizer' },
      { zh: '先规划布局，让地看起来好看', en: 'Plan the layout so it looks beautiful', zhTW: '先規劃布局，讓地看起來好看', ja: 'まずレイアウトを計画して、見た目を美しくする', ko: '레이아웃 먼저 계획해서 예쁘게 꾸미기', de: 'Das Layout planen, damit es schön aussieht', type: 'aesthete' },
      { zh: '直接种，顺便探索周围有什么', en: 'Just plant something and explore around', zhTW: '直接種，順便探索周圍有什麼', ja: 'とりあえず何か植えて、周りを探索する', ko: '일단 뭔가 심고 주변 탐험하기', de: 'Einfach etwas pflanzen und die Umgebung erkunden', type: 'explorer' },
      { zh: '随便种点什么，慢慢来', en: 'Plant whatever, no rush', zhTW: '隨便種點什麼，慢慢來', ja: '何でも植えて、のんびりやる', ko: '아무거나 심고 천천히', de: 'Einfach irgendetwas pflanzen, kein Stress', type: 'zen' },
    ],
  },
  {
    q_zh: '游戏里出了限时活动，你会：',
    q_en: 'A limited-time event just appeared in your game. You:',
    q_zhTW: '遊戲裡出了限時活動，你會：',
    q_ja: 'ゲームに期間限定イベントが登場しました。あなたは：',
    q_ko: '게임에 한정 이벤트가 나타났어요. 당신은：',
    q_de: 'Ein zeitlich begrenztes Event ist in deinem Spiel erschienen. Du:',
    options: [
      { zh: '查攻略，算最高效的完成路线', en: 'Look up a guide and plan the most efficient route', zhTW: '查攻略，算最高效的完成路線', ja: '攻略を調べて、最も効率的なルートを計画する', ko: '공략 찾아보고 가장 효율적인 완료 루트 계획하기', de: 'Eine Anleitung suchen und die effizienteste Route planen', type: 'optimizer' },
      { zh: '先看看有没有好看的限定装饰', en: 'Check if there are pretty limited decorations', zhTW: '先看看有沒有好看的限定裝飾', ja: 'かわいい限定デコレーションがあるか確認する', ko: '예쁜 한정 장식이 있는지 먼저 확인하기', de: 'Schauen ob es hübsche Sonderdekorationen gibt', type: 'aesthete' },
      { zh: '直接冲！先去看看是什么', en: 'Jump right in to see what it is', zhTW: '直接衝！先去看看是什麼', ja: 'すぐ突撃！まずは何があるか見てみる', ko: '바로 뛰어들기! 뭔지 먼저 보기', de: 'Direkt reinjumpen und schauen was es ist', type: 'explorer' },
      { zh: '有空再说，不着急', en: 'Join when I feel like it, no rush', zhTW: '有空再說，不著急', ja: '時間があるときに、急がなくていい', ko: '시간 있을 때 하면 되지, 급하지 않아', de: 'Mitmachen wenn mir danach ist, kein Stress', type: 'zen' },
    ],
  },
  {
    q_zh: '仓库满了，你的第一反应是？',
    q_en: "Your barn is full. What's your first move?",
    q_zhTW: '倉庫滿了，你的第一反應是？',
    q_ja: '倉庫がいっぱいになりました。最初にすることは？',
    q_ko: '창고가 꽉 찼어요. 가장 먼저 하는 행동은？',
    q_de: 'Deine Scheune ist voll. Was machst du zuerst?',
    options: [
      { zh: '卖掉利润最低的，保持效率', en: 'Sell the least profitable items immediately', zhTW: '賣掉利潤最低的，保持效率', ja: '一番利益の低いものを売って効率を保つ', ko: '수익이 가장 낮은 것부터 팔아서 효율 유지하기', de: 'Die unrentabelsten Sachen sofort verkaufen', type: 'optimizer' },
      { zh: '整理分类，摆放整齐', en: 'Organize everything neatly by category', zhTW: '整理分類，擺放整齊', ja: 'カテゴリ別に整理して、きれいに並べる', ko: '카테고리별로 정리해서 깔끔하게 배치하기', de: 'Alles sauber nach Kategorien ordnen', type: 'aesthete' },
      { zh: '去解锁更大的仓库', en: 'Go unlock a bigger barn', zhTW: '去解鎖更大的倉庫', ja: '大きな倉庫をアンロックしに行く', ko: '더 큰 창고 해금하러 가기', de: 'Eine größere Scheune freischalten gehen', type: 'explorer' },
      { zh: '就这样吧，以后再处理', en: 'Leave it for now', zhTW: '就這樣吧，以後再處理', ja: 'まあいいか、後で考えよう', ko: '이대로 두자, 나중에 처리하면 되지', de: 'Lass es einfach so, ich kümmere mich später darum', type: 'zen' },
    ],
  },
  {
    q_zh: '朋友问你：农场游戏什么最好玩？你说：',
    q_en: "A friend asks: what's the best part of farming games? You say:",
    q_zhTW: '朋友問你：農場遊戲什麼最好玩？你說：',
    q_ja: '友達に「農場ゲームの一番面白いところは？」と聞かれたら：',
    q_ko: '친구가 물어봐요: "농장 게임에서 뭐가 제일 재미있어?" 당신의 대답은：',
    q_de: 'Ein Freund fragt: Was macht Farmspiele so toll? Du sagst:',
    options: [
      { zh: '算出最大收益的那种成就感', en: 'The satisfaction of maximizing your income', zhTW: '算出最大收益的那種成就感', ja: '収益を最大化したときの達成感！', ko: '최대 수익을 계산해낼 때의 성취감!', de: 'Das Erfolgsgefühl, wenn man den maximalen Gewinn rausholt!', type: 'optimizer' },
      { zh: '把农场装饰得漂亮，截图分享', en: 'Making your farm beautiful and sharing screenshots', zhTW: '把農場裝飾得漂亮，截圖分享', ja: '農場をきれいにデコって、スクショを共有すること', ko: '농장 예쁘게 꾸미고 스크린샷 공유하는 거', de: 'Die Farm schön dekorieren und Screenshots teilen', type: 'aesthete' },
      { zh: '发现新区域、解锁新机制', en: 'Discovering new areas and unlocking new mechanics', zhTW: '發現新區域、解鎖新機制', ja: '新しいエリアを発見したり、新しい仕組みを解放すること', ko: '새 지역 발견하고 새로운 메커니즘 해금하는 거', de: 'Neue Gebiete entdecken und neue Mechaniken freischalten', type: 'explorer' },
      { zh: '没有压力，想玩就玩', en: 'No pressure, just pure relaxation', zhTW: '沒有壓力，想玩就玩', ja: 'プレッシャーがない、ただ癒されること', ko: '압박감 없이 그냥 힐링하는 거', de: 'Kein Druck, einfach entspannen', type: 'zen' },
    ],
  },
  {
    q_zh: '看到一款新农场游戏，你最先注意到：',
    q_en: 'You see a new farming game. What catches your eye first?',
    q_zhTW: '看到一款新農場遊戲，你最先注意到：',
    q_ja: '新しい農場ゲームを見たとき、最初に気になるのは：',
    q_ko: '새 농장 게임을 보면 가장 먼저 눈에 들어오는 건：',
    q_de: 'Du siehst ein neues Farmspiel. Was fällt dir als erstes auf?',
    options: [
      { zh: '有没有深度的经济/生产系统', en: 'Whether it has a deep economy and production system', zhTW: '有沒有深度的經濟/生產系統', ja: '深みのある経済・生産システムがあるかどうか', ko: '깊이 있는 경제/생산 시스템이 있는지', de: 'Ob es ein tiefes Wirtschafts- und Produktionssystem hat', type: 'optimizer' },
      { zh: '画风和美术风格好不好看', en: 'The art style and visual aesthetic', zhTW: '畫風和美術風格好不好看', ja: 'アートスタイルやビジュアルの雰囲気', ko: '그림체와 아트 스타일이 예쁜지', de: 'Der Kunststil und das visuelle Design', type: 'aesthete' },
      { zh: '地图有多大、内容有多少', en: 'How big the map is and how much content there is', zhTW: '地圖有多大、內容有多少', ja: 'マップの広さとコンテンツの量', ko: '맵이 얼마나 크고 콘텐츠가 얼마나 많은지', de: 'Wie groß die Karte ist und wie viel Inhalt es gibt', type: 'explorer' },
      { zh: '节奏快不快、有没有时间压力', en: 'Whether the pace is slow and there is no time pressure', zhTW: '節奏快不快、有沒有時間壓力', ja: 'テンポがゆったりしていて、時間のプレッシャーがないか', ko: '페이스가 느긋하고 시간 압박이 없는지', de: 'Ob das Spieltempo ruhig ist und kein Zeitdruck herrscht', type: 'zen' },
    ],
  },
  {
    q_zh: '你通常在什么时候打开农场游戏？',
    q_en: 'When do you usually open your farming game?',
    q_zhTW: '你通常在什麼時候打開農場遊戲？',
    q_ja: '農場ゲームを開くのはいつが多いですか？',
    q_ko: '농장 게임을 주로 언제 켜나요？',
    q_de: 'Wann öffnest du meistens dein Farmspiel?',
    options: [
      { zh: '专门留出时间坐下来认真玩', en: 'I set aside dedicated time to play properly', zhTW: '專門留出時間坐下來認真玩', ja: 'ちゃんと時間を作って腰を据えてプレイするとき', ko: '제대로 플레이할 시간을 따로 비워놓을 때', de: 'Wenn ich mir extra Zeit dafür nehme, um richtig zu spielen', type: 'optimizer' },
      { zh: '心情好、想创作的时候', en: 'When I am in a creative mood', zhTW: '心情好、想創作的時候', ja: '気分がよくて、クリエイティブになりたいとき', ko: '기분이 좋고 뭔가 만들고 싶을 때', de: 'Wenn ich in kreativer Stimmung bin', type: 'aesthete' },
      { zh: '随时——有新内容就冲', en: 'Anytime — especially when there is new content', zhTW: '隨時——有新內容就衝', ja: 'いつでも——新しいコンテンツがあればすぐ！', ko: '아무때나—특히 새 콘텐츠 나오면 바로!', de: 'Jederzeit — besonders wenn es neue Inhalte gibt', type: 'explorer' },
      { zh: '睡前或下班后放松的时候', en: 'Before bed or after work to unwind', zhTW: '睡前或下班後放鬆的時候', ja: '寝る前や仕事後にリラックスしたいとき', ko: '자기 전이나 퇴근 후에 쉬고 싶을 때', de: 'Vor dem Schlafen oder nach der Arbeit zum Entspannen', type: 'zen' },
    ],
  },
]

interface Result {
  type: Archetype
  titleZh: string
  titleEn: string
  titleZhTW: string
  titleJa: string
  titleKo: string
  titleDe: string
  emojiZh: string
  descZh: string
  descEn: string
  descZhTW: string
  descJa: string
  descKo: string
  descDe: string
  games: string[]
}

const RESULTS: Record<Archetype, Result> = {
  optimizer: {
    type: 'optimizer',
    titleZh: '效率农夫',
    titleEn: 'The Optimizer',
    titleZhTW: '效率農夫',
    titleJa: '効率農夫',
    titleKo: '효율 농부',
    titleDe: 'Der Optimierer',
    emojiZh: '📊',
    descZh:
      '数据和系统是你的语言。你会在种第一颗种子之前就算好利润/小时，你的仓库永远整整齐齐，田地永远是当前最优配置。对你来说，农场不只是放松——它是一道可以被解开的数学题。',
    descEn:
      'Data and systems are your language. You calculate gold-per-hour before planting your first seed. Your barn is always organized, your fields always optimal. Farming is a puzzle to be solved.',
    descZhTW:
      '資料和系統是你的語言。你會在種第一顆種子之前就算好利潤/小時，你的倉庫永遠整整齊齊，田地永遠是當前最優配置。對你來說，農場不只是放鬆——它是一道可以被解開的數學題。',
    descJa:
      'データとシステムがあなたの言語です。最初の種を植える前に時間あたりの利益を計算し、倉庫はいつも整然と、畑はいつも最適配置。あなたにとって農場はただの癒しじゃない——解くべき数学パズルなんです。',
    descKo:
      '데이터와 시스템이 당신의 언어입니다. 첫 씨앗을 심기 전부터 시간당 수익을 계산하고, 창고는 항상 깔끔하게 정리되어 있으며, 밭은 언제나 최적 배치. 당신에게 농장은 그냥 힐링이 아니에요——풀어야 할 수학 문제입니다.',
    descDe:
      'Daten und Systeme sind deine Sprache. Du berechnest den Gewinn pro Stunde, bevor du den ersten Samen pflanzt. Deine Scheune ist immer ordentlich, deine Felder immer optimal. Für dich ist Farming ein Rätsel, das es zu lösen gilt.',
    games: ['Hay Day', '星露谷物语 / Stardew Valley', 'Farming Simulator'],
  },
  aesthete: {
    type: 'aesthete',
    titleZh: '美学农夫',
    titleEn: 'The Homesteader',
    titleZhTW: '美學農夫',
    titleJa: '審美農夫',
    titleKo: '미학 농부',
    titleDe: 'Der Ästhet',
    emojiZh: '🌸',
    descZh:
      '农场是你的画布。比起最优配置，你更在乎田地布局是否好看，每件家具是否在正确的位置。截图分享是你的成就感来源，你的农场会让人说「哇，好漂亮」。',
    descEn:
      'Your farm is a canvas. You care more about how it looks than how efficient it is. You rearrange furniture until it feels right, and your screenshots get the most comments.',
    descZhTW:
      '農場是你的畫布。比起最優配置，你更在乎田地布局是否好看，每件家具是否在正確的位置。截圖分享是你的成就感來源，你的農場會讓人說「哇，好漂亮」。',
    descJa:
      '農場はあなたのキャンバスです。効率よりも見た目を優先して、家具の配置が「ぴったり」と感じるまで何度も並べ替えます。あなたのスクリーンショットには「かわいい！」とコメントが集まります。',
    descKo:
      '농장은 당신의 캔버스입니다. 최적 배치보다 레이아웃이 예쁜지가 더 중요하고, 가구 하나하나가 딱 맞는 자리에 있어야 해요. 스크린샷 공유가 가장 큰 성취감의 원천이고, 당신 농장을 보면 다들 "와, 예쁘다"라고 합니다.',
    descDe:
      'Deine Farm ist eine Leinwand. Dir ist wichtiger, wie sie aussieht als wie effizient sie ist. Du rückst Möbel so lange, bis es sich richtig anfühlt, und deine Screenshots bekommen die meisten Kommentare.',
    games: ['动物森友会 / Animal Crossing', 'Coral Island', 'Cozy Grove'],
  },
  explorer: {
    type: 'explorer',
    titleZh: '探索农夫',
    titleEn: 'The Explorer',
    titleZhTW: '探索農夫',
    titleJa: '探索農夫',
    titleKo: '탐험 농부',
    titleDe: 'Der Entdecker',
    emojiZh: '🗺️',
    descZh:
      '新地图、新机制、新内容——这才是让你打开游戏的理由。你不会在一件事情上停留太久，因为总有新的东西等着被发现。解锁新区域的那一刻，比任何大丰收都让你兴奋。',
    descEn:
      "New maps, new mechanics, new content — that's why you open the game. You never stay on one thing for long, because there's always something else to discover. Unlocking a new area beats any big harvest.",
    descZhTW:
      '新地圖、新機制、新內容——這才是讓你打開遊戲的理由。你不會在一件事情上停留太久，因為總有新的東西等著被發現。解鎖新區域的那一刻，比任何大豐收都讓你興奮。',
    descJa:
      '新しいマップ、新しい仕組み、新しいコンテンツ——それがゲームを開く理由です。一つのことに長居せず、常に新しい発見を求めています。新エリアを解放した瞬間は、どんな大豊作より興奮します。',
    descKo:
      '새 맵, 새 메커니즘, 새 콘텐츠——그것이 게임을 켜는 이유입니다. 한 가지에 너무 오래 머물지 않는 건, 항상 새로운 것이 기다리고 있기 때문이에요. 새 지역을 해금하는 그 순간은 어떤 대풍작보다도 더 흥분됩니다.',
    descDe:
      'Neue Karten, neue Mechaniken, neuer Inhalt — das ist der Grund, warum du das Spiel öffnest. Du bleibst nie lange bei einer Sache, denn es gibt immer etwas Neues zu entdecken. Ein neues Gebiet freizuschalten schlägt jede große Ernte.',
    games: ['My Time at Sandrock', 'Palia', 'Fields of Mistria'],
  },
  zen: {
    type: 'zen',
    titleZh: '禅意农夫',
    titleEn: 'The Zen Farmer',
    titleZhTW: '禪意農夫',
    titleJa: '禅農夫',
    titleKo: '선(禪) 농부',
    titleDe: 'Der Zen-Bauer',
    emojiZh: '🌿',
    descZh:
      '你玩农场游戏，不是为了效率，不是为了漂亮，就是为了那种「什么都不用担心」的感觉。没有截止日期，没有失败惩罚，农场游戏是你在忙碌生活里的一块安静角落。',
    descEn:
      "You play farming games not for efficiency or aesthetics — just for the feeling that nothing can go wrong. No deadlines, no failure states. Your farm is the quiet corner in a busy life.",
    descZhTW:
      '你玩農場遊戲，不是為了效率，不是為了漂亮，就是為了那種「什麼都不用擔心」的感覺。沒有截止日期，沒有失敗懲罰，農場遊戲是你在忙碌生活裡的一塊安靜角落。',
    descJa:
      '農場ゲームを遊ぶのは、効率のためでも見た目のためでもなく、ただ「何も心配しなくていい」という感覚のため。期限なし、失敗なし。農場ゲームは忙しい日常の中の、静かなコーナーです。',
    descKo:
      '농장 게임을 하는 이유는 효율도 예쁨도 아니에요. 그냥 "아무것도 걱정 안 해도 되는" 그 느낌 때문이에요. 마감도 없고, 실패 패널티도 없고. 농장 게임은 바쁜 일상 속의 조용한 나만의 공간입니다.',
    descDe:
      'Du spielst Farmspiele nicht für Effizienz oder Ästhetik — nur für das Gefühl, dass nichts schiefgehen kann. Keine Fristen, keine Misserfolge. Deine Farm ist die ruhige Ecke im hektischen Alltag.',
    games: ['Cozy Grove', 'Wylde Flowers', '动物森友会 / Animal Crossing'],
  },
}

function calcResult(answers: Archetype[]): Archetype {
  const counts: Record<Archetype, number> = { optimizer: 0, aesthete: 0, explorer: 0, zen: 0 }
  answers.forEach((a) => counts[a]++)
  return (Object.keys(counts) as Archetype[]).reduce((a, b) => (counts[a] >= counts[b] ? a : b))
}

interface Props {
  locale: string
  initialResult?: string
}

export function FarmPersonalityQuiz({ locale, initialResult }: Props) {
  const [forced, setForced] = useState<Archetype | null>((initialResult as Archetype | undefined) ?? null)
  const [step, setStep] = useState<number>(forced ? QUESTIONS.length + 1 : 0) // 0 = intro, 1-6 = questions, 7 = result
  const [answers, setAnswers] = useState<Archetype[]>([])

  // Keep the URL in sync with the current result so the share link is a
  // permalink to exactly this result (and previews the matching OG card).
  const onResult = step === QUESTIONS.length + 1
  const resultArchetype: Archetype | null = onResult ? (forced ?? calcResult(answers)) : null
  useEffect(() => {
    if (typeof window === 'undefined') return
    const u = new URL(window.location.href)
    if (resultArchetype) u.searchParams.set('r', resultArchetype)
    else u.searchParams.delete('r')
    window.history.replaceState(null, '', u.toString())
  }, [resultArchetype])

  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'

  const handleAnswer = (type: Archetype) => {
    const next = [...answers, type]
    setAnswers(next)
    if (next.length === QUESTIONS.length) {
      setStep(QUESTIONS.length + 1)
    } else {
      setStep(step + 1)
    }
  }

  const reset = () => {
    setForced(null)
    setAnswers([])
    setStep(0)
  }

  // Intro
  if (step === 0) {
    return (
      <div className="text-center">
        <div className="mb-6 text-6xl">🌾</div>
        <h2 className="mb-3 text-2xl font-bold text-[#e8dcc8]">
          {getLoc('你是哪种农场玩家？', 'What Kind of Farmer Are You?', '你是哪種農場玩家？', 'あなたはどんな農場プレイヤー？', '당신은 어떤 농장 플레이어인가요?', 'Was für ein Bauer bist du?')}
        </h2>
        <p className="mb-8 text-[#8a9a7a]">
          {getLoc(
            '6 个问题，测出你的农场游戏人格，并推荐最适合你的游戏。',
            '6 questions to reveal your farming game personality and find the best games for you.',
            '6 個問題，測出你的農場遊戲人格，並推薦最適合你的遊戲。',
            '6つの質問で、あなたの農場ゲームの個性を診断し、おすすめのゲームを見つけます。',
            '6가지 질문으로 당신의 농장 게임 성격을 알아보고 최적의 게임을 추천해드립니다.',
            '6 Fragen, um deine Farm-Spielerpersönlichkeit zu enthüllen und die besten Spiele für dich zu finden.'
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
    const archetype = resultArchetype ?? calcResult(answers)
    const result = RESULTS[archetype]
    const url = `https://www.farmgamehub.com/${locale}/quizzes/farm-personality?r=${archetype}`
    const titleLabel = getLoc(result.titleZh, result.titleEn, result.titleZhTW, result.titleJa, result.titleKo, result.titleDe)
    const shareText = getLoc(
      `我的农场人格是「${titleLabel}」！来测测你是哪种农场玩家：${url}`,
      `My farming personality is "${titleLabel}"! Find yours: ${url}`,
      `我的農場人格是「${titleLabel}」！來測測你是哪種農場玩家：${url}`,
      `私の農場タイプは「${titleLabel}」でした！あなたは？：${url}`,
      `내 농장 성격은 「${titleLabel}」입니다! 당신도 테스트해보세요：${url}`,
      `Mein Farm-Typ ist „${titleLabel}"! Finde deinen hier: ${url}`
    )

    return (
      <div>
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">{result.emojiZh}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {getLoc('你的农场人格是', 'Your farming personality:', '你的農場人格是', 'あなたの農場タイプは', '당신의 농장 성격은', 'Dein Farm-Typ:')}
          </p>
          <h2 className="text-3xl font-bold text-[#f0a832]">
            {titleLabel}
          </h2>
        </div>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/60 p-6">
          <p className="leading-relaxed text-[#e8dcc8]">
            {getLoc(result.descZh, result.descEn, result.descZhTW, result.descJa, result.descKo, result.descDe)}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-[#8a9a7a]">
            {getLoc('适合你的游戏', 'Games for you', '適合你的遊戲', 'あなたにおすすめのゲーム', '당신에게 맞는 게임', 'Spiele für dich')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.games.map((g) => (
              <span
                key={g}
                className="rounded-full border border-[#2d5a27] px-3 py-1 text-sm text-[#e8dcc8]"
              >
                {g}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 flex">
          <ShareButton text={shareText} locale={locale} />
        </div>

        <div className="text-center">
          <button
            onClick={reset}
            className="text-sm text-[#8a9a7a] transition-colors hover:text-[#e8dcc8]"
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

      {/* Question */}
      <h2 className="mb-6 text-xl font-semibold text-[#e8dcc8]">
        {getLoc(q.q_zh, q.q_en, q.q_zhTW, q.q_ja, q.q_ko, q.q_de)}
      </h2>

      {/* Options */}
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

      {/* Back */}
      {step > 1 && (
        <button
          onClick={() => {
            setAnswers(answers.slice(0, -1))
            setStep(step - 1)
          }}
          className="mt-4 text-sm text-[#8a9a7a] transition-colors hover:text-[#e8dcc8]"
        >
          {getLoc('← 上一题', '← Previous', '← 上一題', '← 前の質問', '← 이전', '← Zurück')}
        </button>
      )}
    </div>
  )
}
