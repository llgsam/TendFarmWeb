'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'townscaper' | 'terra-nil' | 'dorfromantik' | 'summerhouse'

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

const QUESTIONS: Array<{
  q_en: string
  q_zh: string
  q_zhTW: string
  q_ja: string
  q_ko: string
  q_de: string
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Pick }>
}> = [
  {
    q_en: 'What kind of building experience do you want?',
    q_zh: '你想要什么样的建造体验？',
    q_zhTW: '你想要什麼樣的建造體驗？',
    q_ja: 'どんな建造体験がしたいですか？',
    q_ko: '어떤 건설 경험을 원하세요?',
    q_de: 'Welche Art von Bauerlebnis möchtest du haben?',
    options: [
      {
        en: 'Pure sandbox — click to place, watch it evolve, no objectives at all',
        zh: '纯沙盒——点击放置，看它演变，完全没有目标',
        zhTW: '純沙盒——點擊放置，看它演變，完全沒有目標',
        ja: '完全サンドボックス——クリックして置くだけ、進化を眺める、目標一切なし',
        ko: '순수 샌드박스 — 클릭해서 배치하고 변화를 지켜보기, 목표 전혀 없음',
        de: 'Reines Sandbox — klicken und platzieren, zusehen wie es sich entwickelt, keine Ziele',
        type: 'townscaper',
      },
      {
        en: 'Puzzle-goal — restore a destroyed environment to natural beauty, then remove all my tools',
        zh: '谜题目标——将被破坏的环境恢复到自然美态，然后移除所有我的工具',
        zhTW: '謎題目標——將被破壞的環境恢復到自然美態，然後移除所有我的工具',
        ja: 'パズル目標——破壊された環境を自然の美しさに戻し、最後に自分のツールをすべて撤去',
        ko: '퍼즐 목표 — 파괴된 환경을 자연의 아름다움으로 복원하고 모든 도구를 제거하기',
        de: 'Puzzle-Ziel — eine zerstörte Umgebung in natürliche Schönheit zurückführen, dann alle Werkzeuge entfernen',
        type: 'terra-nil',
      },
      {
        en: 'Gentle scoring — place tiles to build a village, earn points, beat my own best',
        zh: '温和计分——放置瓦片建造村庄，获得积分，打破自己的最好成绩',
        zhTW: '溫和計分——放置瓦片建造村莊，獲得積分，打破自己的最好成績',
        ja: 'ゆるいスコア制——タイルを置いて村を作り、ポイントを稼いで自己ベスト更新',
        ko: '부드러운 점수제 — 타일을 배치해 마을 건설, 점수 획득, 내 최고 기록 경신',
        de: 'Sanftes Scoring — Kacheln platzieren, ein Dorf bauen, Punkte sammeln, meinen eigenen Rekord brechen',
        type: 'dorfromantik',
      },
      {
        en: 'Creative decorating — arrange a house and garden exactly the way I want, purely for aesthetics',
        zh: '创意装饰——按照我想要的方式精确布置房子和花园，纯粹为了美观',
        zhTW: '創意裝飾——按照我想要的方式精確佈置房子和花園，純粹為了美觀',
        ja: 'クリエイティブ装飾——自分好みにお家と庭を自由にレイアウト、純粋な美しさのために',
        ko: '창의적 꾸미기 — 내가 원하는 대로 집과 정원을 완벽하게 배치, 순수하게 미적 목적으로',
        de: 'Kreatives Dekorieren — Haus und Garten ganz nach meinen Vorstellungen einrichten, rein ästhetisch',
        type: 'summerhouse',
      },
    ],
  },
  {
    q_en: 'Which visual world sounds most appealing right now?',
    q_zh: '哪个视觉世界现在听起来最有吸引力？',
    q_zhTW: '哪個視覺世界現在聽起來最有吸引力？',
    q_ja: '今一番心惹かれるビジュアルの世界はどれですか？',
    q_ko: '지금 가장 매력적으로 느껴지는 시각적 세계는 무엇인가요?',
    q_de: 'Welche visuelle Welt klingt gerade am ansprechendsten?',
    options: [
      {
        en: 'Colorful coastal town with stacked houses, arched bridges, and ocean views',
        zh: '色彩缤纷的沿海小镇，有叠层房屋、拱形桥梁和海景',
        zhTW: '色彩繽紛的沿海小鎮，有疊層房屋、拱形橋梁和海景',
        ja: 'カラフルな港町——重なる家々、アーチ橋、海の眺め',
        ko: '쌓인 집들, 아치형 다리, 바다 전망이 있는 화려한 해안 마을',
        de: 'Bunte Küstenstadt mit gestapelten Häusern, Bogenbrücken und Meerblick',
        type: 'townscaper',
      },
      {
        en: 'Industrial wasteland slowly blooming back to forest, wetland, and meadow',
        zh: '工业荒地慢慢重新绽放为森林、湿地和草地',
        zhTW: '工業荒地慢慢重新綻放為森林、濕地和草地',
        ja: '灰色の工業廃墟が、森・湿地・草原へと少しずつ蘇る風景',
        ko: '공업 황무지가 서서히 숲, 습지, 초원으로 피어나는 풍경',
        de: 'Industrielle Brachfläche, die langsam zu Wald, Feuchtgebiet und Wiese erblüht',
        type: 'terra-nil',
      },
      {
        en: 'Pastoral European countryside with windmills, rivers, wheat fields, and thatched roofs',
        zh: '有风车、河流、麦田和茅草屋顶的田园欧洲乡村',
        zhTW: '有風車、河流、麥田和茅草屋頂的田園歐洲鄉村',
        ja: '風車・川・麦畑・茅葺き屋根が広がるヨーロッパの田舎風景',
        ko: '풍차, 강, 밀밭, 초가지붕이 있는 목가적인 유럽 시골 풍경',
        de: 'Ländliches Europa mit Windmühlen, Flüssen, Weizenfeldern und Reetdächern',
        type: 'dorfromantik',
      },
      {
        en: 'A perfect little garden with a house, terracotta pots, climbing vines, and afternoon light',
        zh: '一个完美的小花园，有房子、赤陶盆、攀爬藤蔓和午后光线',
        zhTW: '一個完美的小花園，有房子、赤陶盆、攀爬藤蔓和午後光線',
        ja: '家と素焼きの鉢、つる植物、午後の光が差し込む完璧な小さな庭',
        ko: '집과 테라코타 화분, 덩굴 식물, 오후의 햇살이 있는 완벽한 작은 정원',
        de: 'Ein perfekter kleiner Garten mit Haus, Terrakotta-Töpfen, kletternden Weinreben und Nachmittagslicht',
        type: 'summerhouse',
      },
    ],
  },
  {
    q_en: 'How do you feel about scores, goals, or objectives in relaxing games?',
    q_zh: '你对放松游戏中的分数、目标或任务感觉如何？',
    q_zhTW: '你對放鬆遊戲中的分數、目標或任務感覺如何？',
    q_ja: 'リラックス系ゲームのスコアや目標についてはどう思いますか？',
    q_ko: '힐링 게임에서 점수, 목표, 미션에 대해 어떻게 생각하세요?',
    q_de: 'Wie stehst du zu Punkten, Zielen oder Aufgaben in entspannenden Spielen?',
    options: [
      {
        en: 'No goals at all — I want zero pressure, just infinite creative freedom',
        zh: '完全没有目标——我想要零压力，只是无限的创意自由',
        zhTW: '完全沒有目標——我想要零壓力，只是無限的創意自由',
        ja: '目標はゼロがいい——プレッシャーなし、無限の創造の自由だけ',
        ko: '목표 전혀 없음 — 제로 압박으로, 무한한 창의적 자유만 원해요',
        de: 'Gar keine Ziele — ich will null Druck, nur unendliche kreative Freiheit',
        type: 'townscaper',
      },
      {
        en: 'Clear puzzles — I like knowing when I have succeeded and when the level is complete',
        zh: '明确的谜题——我喜欢知道我什么时候成功了，什么时候关卡完成了',
        zhTW: '明確的謎題——我喜歡知道我什麼時候成功了，什麼時候關卡完成了',
        ja: '明確なパズル——クリアの瞬間がはっきりわかるゲームが好き',
        ko: '명확한 퍼즐 — 언제 성공했고 스테이지가 끝났는지 알 수 있는 게 좋아요',
        de: 'Klare Rätsel — ich mag es zu wissen, wann ich erfolgreich war und ein Level abgeschlossen ist',
        type: 'terra-nil',
      },
      {
        en: 'Soft scoring — I want gentle goals that give direction without feeling stressful',
        zh: '软性计分——我想要给出方向而不感到有压力的温和目标',
        zhTW: '軟性計分——我想要給出方向而不感到有壓力的溫和目標',
        ja: 'ゆるいスコア制——方向感はほしいけど、プレッシャーは感じたくない',
        ko: '부드러운 점수제 — 방향감은 있지만 스트레스 받지 않는 가벼운 목표가 좋아요',
        de: 'Sanftes Scoring — ich will sanfte Ziele, die Orientierung geben ohne Druck zu erzeugen',
        type: 'dorfromantik',
      },
      {
        en: 'Pure aesthetics — my only goal is that it looks beautiful to me',
        zh: '纯粹美学——我唯一的目标是对我来说看起来很美',
        zhTW: '純粹美學——我唯一的目標是對我來說看起來很美',
        ja: '純粋な美学追求——私の唯一のゴールは、自分が見て美しいと感じること',
        ko: '순수 미학 — 제 유일한 목표는 제 눈에 아름답게 보이는 것이에요',
        de: 'Reine Ästhetik — mein einziges Ziel ist, dass es für mich schön aussieht',
        type: 'summerhouse',
      },
    ],
  },
  {
    q_en: 'How long do you typically want a single session to last?',
    q_zh: '你通常希望单次游戏时段持续多长时间？',
    q_zhTW: '你通常希望單次遊戲時段持續多長時間？',
    q_ja: '一回のプレイ時間はどのくらいが理想ですか？',
    q_ko: '한 번의 게임 세션이 보통 얼마나 길기를 원하세요?',
    q_de: 'Wie lang soll eine einzelne Spielsitzung typischerweise dauern?',
    options: [
      {
        en: '5-20 minutes — I want something I can open, enjoy briefly, and close feeling good',
        zh: '5-20 分钟——我想要一些可以打开、简短享受、然后感觉良好地关闭的东西',
        zhTW: '5-20 分鐘——我想要一些可以打開、簡短享受、然後感覺良好地關閉的東西',
        ja: '5〜20分——ちょっと開いて、さっと楽しんで、スッキリ閉じられるゲームがいい',
        ko: '5~20분 — 열어서 잠깐 즐기고 기분 좋게 닫을 수 있는 것을 원해요',
        de: '5-20 Minuten — ich will etwas, das ich kurz öffnen, genießen und gut gelaunt schließen kann',
        type: 'townscaper',
      },
      {
        en: '30-90 minutes — enough to complete a full restoration level start to finish',
        zh: '30-90 分钟——足以从头到尾完成一个完整的恢复关卡',
        zhTW: '30-90 分鐘——足以從頭到尾完成一個完整的恢復關卡',
        ja: '30〜90分——1つのステージを最初から最後まで完走できる時間がほしい',
        ko: '30~90분 — 복원 스테이지를 처음부터 끝까지 완료할 충분한 시간',
        de: '30-90 Minuten — genug, um ein vollständiges Restaurierungslevel von Anfang bis Ende abzuschließen',
        type: 'terra-nil',
      },
      {
        en: '1-3 hours — I want to get into a flow state and just keep placing tiles',
        zh: '1-3 小时——我想进入心流状态，继续放置瓦片',
        zhTW: '1-3 小時——我想進入心流狀態，繼續放置瓦片',
        ja: '1〜3時間——フロー状態に入って、ひたすらタイルを置き続けたい',
        ko: '1~3시간 — 플로우 상태에 빠져서 타일을 계속 놓고 싶어요',
        de: '1-3 Stunden — ich will in einen Flow-Zustand kommen und einfach immer weiter Kacheln legen',
        type: 'dorfromantik',
      },
      {
        en: 'Whatever I feel like — I want to drop in and decorate for however long I want',
        zh: '随心所欲——我想随时加入并装饰任意长的时间',
        zhTW: '隨心所欲——我想隨時加入並裝飾任意長的時間',
        ja: '気分次第——いつでも入って、好きなだけデコレーションしたい',
        ko: '마음 내키는 대로 — 언제든지 들어와서 원하는 만큼 꾸미고 싶어요',
        de: 'Wie ich es fühle — ich will jederzeit einsteigen und so lange dekorieren, wie ich möchte',
        type: 'summerhouse',
      },
    ],
  },
  {
    q_en: 'What makes a building or puzzle game feel deeply satisfying to you?',
    q_zh: '什么让建造或谜题游戏对你感觉非常令人满足？',
    q_zhTW: '什麼讓建造或謎題遊戲對你感覺非常令人滿足？',
    q_ja: '建造・パズルゲームで最も深い満足感を得られるのはどんな瞬間ですか？',
    q_ko: '건설 또는 퍼즐 게임에서 깊은 만족감을 느끼게 하는 것은 무엇인가요?',
    q_de: 'Was lässt ein Bau- oder Puzzlespiel für dich tiefgreifend befriedigend wirken?',
    options: [
      {
        en: 'Emergence — watching the algorithm generate something beautiful I did not plan',
        zh: '涌现——看着算法生成我没有计划的美丽事物',
        zhTW: '湧現——看著演算法生成我沒有計畫的美麗事物',
        ja: '創発——自分が意図しなかった美しさをアルゴリズムが生み出す瞬間',
        ko: '창발 — 내가 계획하지 않은 아름다운 것을 알고리즘이 생성하는 것을 지켜보기',
        de: 'Emergenz — beobachten, wie der Algorithmus etwas Schönes erzeugt, das ich nicht geplant hatte',
        type: 'townscaper',
      },
      {
        en: 'Completion — reaching the state where the land is fully restored and I can finally leave',
        zh: '完成——达到土地完全恢复的状态，我终于可以离开了',
        zhTW: '完成——達到土地完全恢復的狀態，我終於可以離開了',
        ja: '達成感——土地が完全に蘇り、ついに立ち去れる瞬間',
        ko: '완성 — 대지가 완전히 복원되어 마침내 떠날 수 있는 상태에 도달하기',
        de: 'Vollendung — den Moment erreichen, in dem das Land vollständig wiederhergestellt ist und ich endlich gehen kann',
        type: 'terra-nil',
      },
      {
        en: 'Optimization — placing the tile that perfectly connects four landscapes at once',
        zh: '优化——放置完美同时连接四个景观的瓦片',
        zhTW: '優化——放置完美同時連接四個景觀的瓦片',
        ja: '最適配置——一度に4つの景観をつなぐ完璧なタイルを置けた瞬間',
        ko: '최적화 — 한 번에 네 가지 풍경을 완벽하게 연결하는 타일 배치',
        de: 'Optimierung — die Kachel platzieren, die vier Landschaften gleichzeitig perfekt verbindet',
        type: 'dorfromantik',
      },
      {
        en: 'Curation — finding exactly the right small detail that makes the whole scene click',
        zh: '策展——找到让整个场景恰到好处的确切小细节',
        zhTW: '策展——找到讓整個場景恰到好處的確切小細節',
        ja: 'キュレーション——シーン全体がカチッとはまる、ちょうどいいディテールを見つける瞬間',
        ko: '큐레이션 — 전체 장면을 완벽하게 만드는 딱 맞는 작은 디테일 찾기',
        de: 'Kuration — genau das richtige kleine Detail finden, das die ganze Szene zum Klicken bringt',
        type: 'summerhouse',
      },
    ],
  },
  {
    q_en: 'If this game could give you one feeling, what would you choose?',
    q_zh: '如果这款游戏能给你一种感觉，你会选择什么？',
    q_zhTW: '如果這款遊戲能給你一種感覺，你會選擇什麼？',
    q_ja: 'このゲームがひとつの感情をくれるとしたら、何を選びますか？',
    q_ko: '이 게임이 하나의 감정을 줄 수 있다면, 무엇을 선택하시겠어요?',
    q_de: 'Wenn dieses Spiel dir ein Gefühl geben könnte, welches würdest du wählen?',
    options: [
      {
        en: '"I made something that looks like it could be a real place — and I could live there"',
        zh: '"我做了一些看起来像真实地方的东西——我可以住在那里"',
        zhTW: '「我做了一些看起來像真實地方的東西——我可以住在那裡」',
        ja: '「本物の場所みたいな街を作れた——ここに住みたいな」',
        ko: '"내가 실제 장소처럼 보이는 것을 만들었어 — 거기서 살 수 있을 것 같아"',
        de: '„Ich habe etwas geschaffen, das wie ein echter Ort aussieht — und ich könnte dort leben"',
        type: 'townscaper',
      },
      {
        en: '"The world I built is better than when I found it, and then I disappeared"',
        zh: '"我建造的世界比我发现时更好，然后我消失了"',
        zhTW: '「我建造的世界比我發現時更好，然後我消失了」',
        ja: '「私が作った世界は、出会った時よりも美しくなった。そして私は静かに去った」',
        ko: '"내가 만든 세상은 발견했을 때보다 더 나아졌고, 그리고 나는 사라졌어"',
        de: '„Die Welt, die ich gebaut habe, ist besser als ich sie vorgefunden habe — und dann verschwand ich"',
        type: 'terra-nil',
      },
      {
        en: '"I was in flow for two hours and the village just kept growing and growing"',
        zh: '"我进入了两小时的心流状态，村庄一直在增长和增长"',
        zhTW: '「我進入了兩小時的心流狀態，村莊一直在增長和增長」',
        ja: '「2時間ずっとフロー状態で、村はどんどん成長し続けた」',
        ko: '"두 시간 동안 플로우 상태에 있었고 마을은 계속계속 성장했어"',
        de: '„Ich war zwei Stunden im Flow und das Dorf wuchs und wuchs einfach immer weiter"',
        type: 'dorfromantik',
      },
      {
        en: '"This little garden is exactly how I imagined it — exactly that"',
        zh: '"这个小花园正是我想象的样子——正是那样"',
        zhTW: '「這個小花園正是我想像的樣子——正是那樣」',
        ja: '「この小さな庭、まさに想像していた通りだ——まさにそれ」',
        ko: '"이 작은 정원은 딱 내가 상상하던 그대로야 — 딱 그거야"',
        de: '„Dieser kleine Garten ist genau so, wie ich ihn mir vorgestellt habe — genau das"',
        type: 'summerhouse',
      },
    ],
  },
]

const RESULTS: Record<
  Pick,
  {
    title_en: string
    title_zh: string
    title_zhTW: string
    title_ja: string
    title_ko: string
    title_de: string
    emoji: string
    tag_en: string
    tag_zh: string
    tag_zhTW: string
    tag_ja: string
    tag_ko: string
    tag_de: string
    platform_en: string
    platform_zh: string
    platform_zhTW: string
    platform_ja: string
    platform_ko: string
    platform_de: string
    why_en: string
    why_zh: string
    why_zhTW: string
    why_ja: string
    why_ko: string
    why_de: string
    tip_en: string
    tip_zh: string
    tip_zhTW: string
    tip_ja: string
    tip_ko: string
    tip_de: string
  }
> = {
  townscaper: {
    title_en: 'Townscaper',
    title_zh: 'Townscaper',
    title_zhTW: 'Townscaper',
    title_ja: 'Townscaper',
    title_ko: 'Townscaper',
    title_de: 'Townscaper',
    emoji: '🏘️',
    tag_en: 'Click to build colorful towns — the most meditative 5 minutes in gaming',
    tag_zh: '点击建造彩色小镇——游戏中最冥想的 5 分钟',
    tag_zhTW: '點擊建造彩色小鎮——遊戲中最冥想的 5 分鐘',
    tag_ja: 'クリックでカラフルな街を作る——ゲーム史上最も瞑想的な5分間',
    tag_ko: '클릭으로 색깔 마을 만들기 — 게임 역사상 가장 명상적인 5분',
    tag_de: 'Klicken und bunte Städte bauen — die meditativsten 5 Minuten in der Gaming-Geschichte',
    platform_en: 'Available on: PC (Steam), iOS, Android, Nintendo Switch — about $6',
    platform_zh: '可在以下平台获取：PC（Steam）、iOS、Android、Nintendo Switch——约 6 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、iOS、Android、Nintendo Switch——約 6 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、iOS、Android、Nintendo Switch——約700円',
    platform_ko: '플랫폼：PC（Steam）, iOS, Android, Nintendo Switch — 약 6달러',
    platform_de: 'Verfügbar auf: PC (Steam), iOS, Android, Nintendo Switch — ca. 6 €',
    why_en:
      "Townscaper is one of the most zen games ever made. You have a color palette and an endless ocean. You click on the water to place blocks. The game's algorithm automatically shapes them into colorful, architecturally charming houses, arched bridges, towers, and winding alleys — you never control the shape directly, only placement. Click on an existing block to remove it. That is literally the entire game. And it is somehow endlessly satisfying. There are no objectives, no scores, no win conditions, no time limits. You make a small colorful town, screenshot it, and share it. Or you just close it and feel calm. The mobile version is $6 and is perfect for 5-10 minute sessions. One of the most-shared screenshot games of recent years.",
    why_zh:
      'Townscaper 是有史以来最禅意的游戏之一。你有一个调色板和一片无边的海洋。你点击水面放置方块。游戏的算法自动将它们塑造成色彩鲜艳的、建筑上迷人的房屋、拱形桥梁、塔楼和蜿蜒的小巷——你从不直接控制形状，只控制位置。点击现有方块将其移除。这实际上就是整个游戏。而且它某种程度上无限令人满足。没有目标、没有分数、没有胜利条件、没有时间限制。你做一个小彩色小镇，截图并分享。或者你只是关掉它，感到平静。手机版本售价 6 美元，非常适合 5-10 分钟的游戏时段。近年来分享截图最多的游戏之一。',
    why_zhTW:
      'Townscaper 是有史以來最禪意的遊戲之一。你有一個調色盤和一片無邊的海洋。你點擊水面放置方塊。遊戲的演算法自動將它們塑造成色彩鮮豔的、建築上迷人的房屋、拱形橋梁、塔樓和蜿蜒的小巷——你從不直接控制形狀，只控制位置。點擊現有方塊將其移除。這實際上就是整個遊戲。而且它某種程度上無限令人滿足。沒有目標、沒有分數、沒有勝利條件、沒有時間限制。你做一個小彩色小鎮，截圖並分享。或者你只是關掉它，感到平靜。手機版本售價 6 美元，非常適合 5-10 分鐘的遊戲時段。近年來分享截圖最多的遊戲之一。',
    why_ja:
      'Townscaper は史上最も禅的なゲームのひとつです。あなたにはカラーパレットと無限の海があります。水面をクリックしてブロックを置くと、ゲームのアルゴリズムが自動的に色鮮やかな家、アーチ橋、塔、曲がりくねった路地へと形作ってくれます——形を直接コントロールするのではなく、置く場所だけを決めるのです。既存のブロックをクリックすれば削除できます。これがゲームのすべてです。そして、なぜか無限に満足できます。目標なし、スコアなし、クリア条件なし、制限時間なし。小さなカラフルな町を作って、スクリーンショットを撮ってシェアする。あるいはただ閉じて、穏やかな気持ちになる。モバイル版は約700円で、5〜10分のプレイに最適です。近年最もスクリーンショットがシェアされたゲームのひとつです。',
    why_ko:
      'Townscaper는 역사상 가장 선(禪)적인 게임 중 하나입니다. 당신에게는 색상 팔레트와 끝없는 바다가 있습니다. 물 위를 클릭해서 블록을 놓으면, 게임의 알고리즘이 자동으로 색깔 있는 아름다운 집들, 아치형 다리, 탑, 구불구불한 골목으로 형태를 만들어줍니다——형태를 직접 제어하는 것이 아니라, 위치만 결정하면 됩니다. 기존 블록을 클릭하면 제거됩니다. 이것이 게임의 전부입니다. 그리고 어찌된 일인지 무한히 만족스럽습니다. 목표 없음, 점수 없음, 승리 조건 없음, 시간 제한 없음. 작은 색깔 마을을 만들고 스크린샷을 찍어 공유하면 됩니다. 아니면 그냥 닫고 평온함을 느끼면 됩니다. 모바일 버전은 6달러로 5~10분 세션에 완벽합니다. 최근 몇 년 간 가장 많이 스크린샷이 공유된 게임 중 하나입니다.',
    why_de:
      'Townscaper ist eines der meditativsten Spiele aller Zeiten. Du hast eine Farbpalette und einen endlosen Ozean. Du klickst auf das Wasser, um Blöcke zu platzieren. Der Algorithmus des Spiels formt sie automatisch zu farbenfrohen, architektonisch charmanten Häusern, Bogenbrücken, Türmen und verschlungenen Gassen — du kontrollierst nie direkt die Form, nur die Platzierung. Klick auf einen bestehenden Block, um ihn zu entfernen. Das ist buchstäblich das gesamte Spiel. Und es ist irgendwie endlos befriedigend. Keine Ziele, keine Punkte, keine Gewinnbedingungen, keine Zeitlimits. Du baust eine kleine bunte Stadt, machst einen Screenshot und teilst ihn. Oder du schließt es einfach und fühlst dich ruhig. Die mobile Version kostet etwa 6 € und eignet sich perfekt für 5-10 Minuten. Eines der am meisten geteilten Screenshot-Spiele der letzten Jahre.',
    tip_en: 'Use the black color for windows and accents — it grounds the palette and makes the other colors pop dramatically.',
    tip_zh: '使用黑色作为窗户和点缀——它稳定了调色板，让其他颜色更加突出。',
    tip_zhTW: '使用黑色作為窗戶和點綴——它穩定了調色盤，讓其他顏色更加突出。',
    tip_ja: '黒を窓や差し色に使いましょう——他の色を引き立てて、全体のパレットが引き締まります。',
    tip_ko: '검은색을 창문과 포인트에 사용하세요 — 팔레트를 잡아주고 다른 색들이 더욱 돋보이게 됩니다.',
    tip_de: 'Verwende die schwarze Farbe für Fenster und Akzente — sie erdet die Palette und lässt die anderen Farben dramatisch hervorstechen.',
  },
  'terra-nil': {
    title_en: 'Terra Nil',
    title_zh: 'Terra Nil',
    title_zhTW: 'Terra Nil',
    title_ja: 'Terra Nil',
    title_ko: 'Terra Nil',
    title_de: 'Terra Nil',
    emoji: '🌱',
    tag_en: 'Reverse city builder — restore nature, then leave without a trace',
    tag_zh: '反向城市建造游戏——恢复自然，然后不留痕迹地离开',
    tag_zhTW: '反向城市建造遊戲——恢復自然，然後不留痕跡地離開',
    tag_ja: '逆シティビルダー——自然を取り戻し、痕跡を残さず去る',
    tag_ko: '역방향 도시 건설 게임 — 자연을 복원하고 흔적 없이 떠나기',
    tag_de: 'Umgekehrter Städtebauer — die Natur wiederherstellen und spurlos verschwinden',
    platform_en: 'Available on: PC (Steam), iOS/Android (Netflix Games, free with subscription)',
    platform_zh: '可在以下平台获取：PC（Steam）、iOS/Android（Netflix 游戏，订阅免费）',
    platform_zhTW: '可在以下平台取得：PC（Steam）、iOS/Android（Netflix 遊戲，訂閱免費）',
    platform_ja: '対応プラットフォーム：PC（Steam）、iOS/Android（Netflix Gamesに収録、サブスクで無料）',
    platform_ko: '플랫폼：PC（Steam）, iOS/Android（Netflix Games, 구독으로 무료）',
    platform_de: 'Verfügbar auf: PC (Steam), iOS/Android (Netflix Games, kostenlos mit Abo)',
    why_en:
      "Terra Nil is one of the most conceptually unique games in recent years. You start with a grey, toxic industrial wasteland. Your goal is to restore it to a thriving natural ecosystem — but there is a twist: at the end, you must also recycle all of your restoration machinery and leave the land in a completely pristine state, as if you were never there. The game has puzzle-like levels where you must restore specific biomes (wetlands, forests, tundra, meadows) in the right proportions, then carefully plan the deconstruction of your own tools. It is about 5-8 hours long with multiple campaigns. The mobile version is free with Netflix Games (any Netflix subscription), which makes it one of the best-value games available. Won multiple awards for concept and execution.",
    why_zh:
      'Terra Nil 是近年来概念上最独特的游戏之一。你从灰色的、有毒的工业荒地开始。你的目标是将其恢复为蓬勃发展的自然生态系统——但有一个转折：在最后，你还必须回收所有恢复机械，让土地处于完全原始的状态，就好像你从来没有在那里一样。游戏有谜题式关卡，你必须以正确的比例恢复特定生物群落（湿地、森林、冻原、草地），然后仔细规划自己工具的拆解。时长约 5-8 小时，有多个战役。手机版本随 Netflix 游戏（任何 Netflix 订阅）免费，这使它成为最具价值的游戏之一。凭借概念和执行赢得了多个奖项。',
    why_zhTW:
      'Terra Nil 是近年來概念上最獨特的遊戲之一。你從灰色的、有毒的工業荒地開始。你的目標是將其恢復為蓬勃發展的自然生態系統——但有一個轉折：在最後，你還必須回收所有恢復機械，讓土地處於完全原始的狀態，就好像你從來沒有在那裡一樣。遊戲有謎題式關卡，你必須以正確的比例恢復特定生物群落（濕地、森林、凍原、草地），然後仔細規劃自己工具的拆解。時長約 5-8 小時，有多個戰役。手機版本隨 Netflix 遊戲（任何 Netflix 訂閱）免費，這使它成為最具價值的遊戲之一。憑藉概念和執行贏得了多個獎項。',
    why_ja:
      'Terra Nil は近年最も概念的にユニークなゲームのひとつです。灰色の有毒な工業廃墟からスタートします。目標は、荒廃した土地を豊かな自然生態系に復元すること——でもひとつひねりがあります。最後にはすべての復元機械をリサイクルし、まるで最初からそこにいなかったかのように、完全に手つかずの状態で土地を去らなければなりません。ゲームにはパズル的なレベルがあり、特定のバイオーム（湿地、森林、ツンドラ、草原）を適切な割合で復元し、自分のツールの解体を計画する必要があります。プレイ時間は約5〜8時間で複数のキャンペーンがあります。モバイル版はNetflixゲーム（Netflixのサブスクリプション付き）で無料で遊べるため、最もコストパフォーマンスの高いゲームのひとつです。概念と実行力で複数の賞を受賞しています。',
    why_ko:
      'Terra Nil은 최근 몇 년 간 개념적으로 가장 독특한 게임 중 하나입니다. 회색의 독성 공업 황무지에서 시작합니다. 목표는 황폐화된 환경을 번성하는 자연 생태계로 복원하는 것입니다——하지만 반전이 있습니다: 마지막에는 모든 복원 기계를 재활용하고, 마치 당신이 거기에 없었던 것처럼 완전히 원시적인 상태로 땅을 떠나야 합니다. 게임에는 퍼즐식 레벨이 있으며 특정 생물군계(습지, 숲, 툰드라, 초원)를 올바른 비율로 복원한 후 자신의 도구 해체를 신중하게 계획해야 합니다. 총 플레이 시간은 약 5~8시간이며 여러 캠페인이 있습니다. 모바일 버전은 Netflix 게임(어떤 Netflix 구독이든)으로 무료로 플레이 가능해 최고의 가성비 게임 중 하나입니다. 개념과 실행력으로 여러 상을 수상했습니다.',
    why_de:
      'Terra Nil ist eines der konzeptuell einzigartigsten Spiele der letzten Jahre. Du beginnst mit einer grauen, giftigen Industriebrache. Dein Ziel ist es, sie in ein florierendes natürliches Ökosystem zu verwandeln — aber es gibt einen Twist: Am Ende musst du auch alle deine Restaurierungsmaschinen recyceln und das Land in einem vollständig unberührten Zustand hinterlassen, als wärst du nie dagewesen. Das Spiel hat rätselartige Level, bei denen du bestimmte Biome (Feuchtgebiete, Wälder, Tundra, Wiesen) im richtigen Verhältnis restaurieren und dann den Abbau deiner eigenen Werkzeuge sorgfältig planen musst. Es dauert etwa 5-8 Stunden mit mehreren Kampagnen. Die mobile Version ist kostenlos mit Netflix Games (jedem Netflix-Abo), was es zu einem der besten Preis-Leistungs-Spiele macht. Es hat mehrere Preise für Konzept und Ausführung gewonnen.',
    tip_en: 'Plan your irrigation paths before placing anything else — water placement early determines which biomes you can reach later.',
    tip_zh: '在放置其他任何东西之前规划好你的灌溉路径——早期的水位放置决定了你以后可以到达哪些生物群落。',
    tip_zhTW: '在放置其他任何東西之前規劃好你的灌溉路徑——早期的水位放置決定了你以後可以到達哪些生物群落。',
    tip_ja: '他の何かを置く前に、まず灌漑ルートを計画しましょう——序盤の水の配置が、後半でどのバイオームに到達できるかを決定します。',
    tip_ko: '다른 것을 배치하기 전에 관개 경로를 계획하세요 — 초반 물 배치가 나중에 어떤 생물군계에 도달할 수 있는지를 결정합니다.',
    tip_de: 'Plane deine Bewässerungswege, bevor du irgendetwas anderes platzierst — die frühe Wasserplatzierung bestimmt, welche Biome du später erreichen kannst.',
  },
  dorfromantik: {
    title_en: 'Dorfromantik',
    title_zh: 'Dorfromantik',
    title_zhTW: 'Dorfromantik',
    title_ja: 'Dorfromantik',
    title_ko: 'Dorfromantik',
    title_de: 'Dorfromantik',
    emoji: '🌾',
    tag_en: 'Tile-placement village builder — pastoral flow state with gentle scoring',
    tag_zh: '瓦片放置村庄建造游戏——有温和计分的田园心流状态',
    tag_zhTW: '瓦片放置村莊建造遊戲——有溫和計分的田園心流狀態',
    tag_ja: 'タイル配置型村建てゲーム——穏やかなスコア制でフロー状態に入れる田園ゲーム',
    tag_ko: '타일 배치 마을 건설 게임 — 부드러운 점수제의 목가적인 플로우 상태',
    tag_de: 'Kachelplatzierungs-Dorfbauer — ländlicher Flow-Zustand mit sanftem Scoring',
    platform_en: 'Available on: PC (Steam), Nintendo Switch — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch——约 15 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch——約 15 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch——約1,500円',
    platform_ko: '플랫폼：PC（Steam）, Nintendo Switch — 약 15달러',
    platform_de: 'Verfügbar auf: PC (Steam), Nintendo Switch — ca. 15 €',
    why_en:
      "Dorfromantik won the German Game of the Year award and has become a beloved cozy game for players who want just a little more structure than a pure sandbox. You draw hexagonal tiles and place them to build a continuous village landscape — when tile edges match (forest meets forest, river meets river, wheat meets wheat), you score points. Complete special objectives on certain tiles to unlock more tiles from your deck. The flow state it creates is uniquely satisfying: the world grows organically, and every good placement connects multiple elements at once. It has a low-pressure, no-timer scoring mode and a more structured creative mode with unlimited tiles. One of the best gateway games for people who have never played city-builders but are cozy-game fans.",
    why_zh:
      'Dorfromantik 赢得了德国年度游戏奖，成为想要比纯沙盒多一点结构的玩家所喜爱的温馨游戏。你抽取六边形瓦片并放置它们来建造连续的村庄景观——当瓦片边缘匹配时（森林遇到森林、河流遇到河流、小麦遇到小麦），你获得积分。完成某些瓦片上的特殊目标以从牌组中解锁更多瓦片。它创造的心流状态是独特令人满足的：世界有机地增长，每次好的放置都同时连接多个元素。它有一个低压力、无计时的计分模式和一个有无限瓦片的更结构化的创意模式。对于从未玩过城市建造游戏但是 cozy 游戏粉丝的人来说，它是最好的入门游戏之一。',
    why_zhTW:
      'Dorfromantik 贏得了德國年度遊戲獎，成為想要比純沙盒多一點結構的玩家所喜愛的溫馨遊戲。你抽取六邊形瓦片並放置它們來建造連續的村莊景觀——當瓦片邊緣匹配時（森林遇到森林、河流遇到河流、小麥遇到小麥），你獲得積分。完成某些瓦片上的特殊目標以從牌組中解鎖更多瓦片。它創造的心流狀態是獨特令人滿足的：世界有機地增長，每次好的放置都同時連接多個元素。它有一個低壓力、無計時的計分模式和一個有無限瓦片的更結構化的創意模式。對於從未玩過城市建造遊戲但是 cozy 遊戲粉絲的人來說，它是最好的入門遊戲之一。',
    why_ja:
      'Dorfromantikはドイツゲーム大賞を受賞し、純粋なサンドボックスよりも少し構造があるゲームを求めるプレイヤーに愛されるコージーゲームになりました。六角形のタイルを引いて置きながら、連続した村の風景を作り上げます——タイルの辺が一致すると（森と森、川と川、麦畑と麦畑）ポイントが入ります。特定のタイルに設定された特殊目標を達成すると、デッキから新しいタイルがアンロックされます。生み出されるフロー状態は格別の満足感があります。世界が有機的に成長し、うまく置くたびに複数の要素が一度につながります。プレッシャーなし・タイマーなしのスコアモードと、無限にタイルが使えるクリエイティブモードがあります。シティビルダーをプレイしたことがないけどコージーゲームが好きな方に特におすすめの入門ゲームのひとつです。',
    why_ko:
      'Dorfromantik은 독일 올해의 게임상을 수상했으며, 순수 샌드박스보다 조금 더 구조가 있는 게임을 원하는 플레이어들에게 사랑받는 코지 게임이 되었습니다. 육각형 타일을 뽑아 배치하면서 연속된 마을 풍경을 만들어갑니다——타일의 가장자리가 일치할 때(숲과 숲, 강과 강, 밀과 밀) 점수를 얻습니다. 특정 타일의 특별 목표를 달성하면 덱에서 더 많은 타일을 잠금 해제할 수 있습니다. 이 게임이 만들어내는 플로우 상태는 독특하게 만족스럽습니다: 세계가 유기적으로 성장하고, 좋은 배치마다 여러 요소가 동시에 연결됩니다. 저압 무타이머 점수 모드와 무한 타일이 있는 더 구조화된 창작 모드가 있습니다. 도시 건설 게임을 해본 적 없지만 코지 게임 팬인 분들에게 최고의 입문 게임 중 하나입니다.',
    why_de:
      'Dorfromantik gewann den Deutschen Computerspielpreis und wurde zu einem geliebten Cozy Game für Spieler, die etwas mehr Struktur als eine reine Sandbox möchten. Du ziehst sechseckige Kacheln und platzierst sie, um eine zusammenhängende Dorflandschaft zu bauen — wenn Kachelkanten übereinstimmen (Wald trifft Wald, Fluss trifft Fluss, Weizen trifft Weizen), bekommst du Punkte. Erfülle spezielle Ziele auf bestimmten Kacheln, um mehr Kacheln aus deinem Deck freizuschalten. Der Flow-Zustand, den es erzeugt, ist einzigartig befriedigend: Die Welt wächst organisch, und jede gute Platzierung verbindet mehrere Elemente gleichzeitig. Es hat einen druckfreien Modus ohne Timer und einen strukturierteren Kreativmodus mit unbegrenzten Kacheln. Eines der besten Einsteigerspiele für Menschen, die noch nie Städtebauer gespielt haben, aber Cozy-Game-Fans sind.',
    tip_en: "Prioritize completing the flag objectives on each tile before your deck runs out — they are your main source of new tiles and keep the game going.",
    tip_zh: '在你的牌组耗尽之前，优先完成每张瓦片上的旗帜目标——它们是你新瓦片的主要来源，让游戏继续进行。',
    tip_zhTW: '在你的牌組耗盡之前，優先完成每張瓦片上的旗幟目標——它們是你新瓦片的主要來源，讓遊戲繼續進行。',
    tip_ja: 'デッキが尽きる前に、各タイルの旗マーク目標を優先してクリアしましょう——それが新しいタイルを補充する主な手段で、ゲームを長続きさせるコツです。',
    tip_ko: '덱이 소진되기 전에 각 타일의 깃발 목표 달성을 우선시하세요 — 새 타일의 주요 공급원이며 게임을 계속 이어갑니다.',
    tip_de: 'Priorisiere das Erfüllen der Flaggenziele auf jeder Kachel, bevor dein Deck ausgeht — sie sind deine Hauptquelle für neue Kacheln und halten das Spiel am Laufen.',
  },
  summerhouse: {
    title_en: 'Summerhouse',
    title_zh: 'Summerhouse（夏日之家）',
    title_zhTW: 'Summerhouse（夏日之家）',
    title_ja: 'Summerhouse（サマーハウス）',
    title_ko: 'Summerhouse（서머하우스）',
    title_de: 'Summerhouse',
    emoji: '🌻',
    tag_en: 'Tiny garden and house builder — from the A Short Hike developer, pure aesthetic joy',
    tag_zh: '微型花园和房屋建造——来自短途徒步开发者，纯粹的美学喜悦',
    tag_zhTW: '微型花園和房屋建造——來自《短途健行》開發者，純粹的美學喜悅',
    tag_ja: '小さな庭と家のビルダー——「A Short Hike」の開発者が贈る、純粋な美の喜び',
    tag_ko: '작은 정원과 집 짓기 — \'A Short Hike\' 개발자의 순수한 미적 기쁨',
    tag_de: 'Kleiner Garten- und Hausbauer — vom Entwickler von A Short Hike, reiner ästhetischer Genuss',
    platform_en: 'Available on: PC (Steam, itch.io) — about $7',
    platform_zh: '可在以下平台获取：PC（Steam、itch.io）——约 7 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、itch.io）——約 7 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、itch.io）——約800円',
    platform_ko: '플랫폼：PC（Steam, itch.io） — 약 7달러',
    platform_de: 'Verfügbar auf: PC (Steam, itch.io) — ca. 7 €',
    why_en:
      "Summerhouse is by Adam Robinson-Yu, the same developer who made A Short Hike — and it has the same quality of lo-fi warmth and total absence of pressure. You are given a small plot and a selection of building pieces: walls, windows, roofs, planters, vines, furniture, fences. You assemble a house and garden however you like. There are no quests, no points, no objectives, no timer. The game renders your creation in a golden afternoon light that makes everything look like a memory. You can share your houses with others and browse the community's creations. Sessions can last 10 minutes or two hours depending on your mood. It is extremely small ($7) and extremely good. The kind of game you do not explain — you just show someone a screenshot and they immediately understand.",
    why_zh:
      'Summerhouse 由 Adam Robinson-Yu 制作，他就是制作短途徒步的同一开发者——它有相同质量的低保真温暖和完全没有压力。你得到一小块地和一些建筑组件的选择：墙壁、窗户、屋顶、花槽、藤蔓、家具、围栏。你随心所欲地组装房子和花园。没有任务、没有积分、没有目标、没有计时器。游戏在金色的午后光线中渲染你的创作，让一切都看起来像一段记忆。你可以与他人分享你的房子，浏览社区的创作。游戏时段可以持续 10 分钟或两个小时，取决于你的心情。它极其微小（7 美元）且极其出色。这种游戏不需要解释——你只需向别人展示一张截图，他们立即就会理解。',
    why_zhTW:
      'Summerhouse 由 Adam Robinson-Yu 製作，他就是製作《短途健行》的同一開發者——它有相同質量的低保真溫暖和完全沒有壓力。你得到一小塊地和一些建築組件的選擇：牆壁、窗戶、屋頂、花槽、藤蔓、家具、圍欄。你隨心所欲地組裝房子和花園。沒有任務、沒有積分、沒有目標、沒有計時器。遊戲在金色的午後光線中渲染你的創作，讓一切都看起來像一段記憶。你可以與他人分享你的房子，瀏覽社群的創作。遊戲時段可以持續 10 分鐘或兩個小時，取決於你的心情。它極其微小（7 美元）且極其出色。這種遊戲不需要解釋——你只需向別人展示一張截圖，他們立即就會理解。',
    why_ja:
      'SummerhouseはAdam Robinson-Yuの作品です。「A Short Hike」を作ったのと同じ開発者で、同じようなローファイな温かみとプレッシャーのなさがあります。小さな土地と建築パーツ（壁、窓、屋根、プランター、つる植物、家具、フェンス）が渡されます。あとは好きなように家と庭を組み立てるだけ。クエストなし、ポイントなし、目標なし、タイマーなし。ゲームはあなたの作品を黄金色の午後の光の中でレンダリングし、すべてが記憶の一場面のように見えます。自分の家を他の人とシェアしたり、コミュニティの作品を眺めたりもできます。気分によって10分にも2時間にもなります。価格は約800円で小さいけれど、非常に良質なゲームです。説明なんて不要——スクリーンショットを一枚見せれば、すぐに伝わります。',
    why_ko:
      'Summerhouse는 Adam Robinson-Yu가 제작했으며, \'A Short Hike\'를 만든 바로 그 개발자입니다——같은 퀄리티의 로파이 따뜻함과 완전한 압박감 없음이 있습니다. 작은 부지와 건축 부품들을 받습니다: 벽, 창문, 지붕, 화분, 덩굴 식물, 가구, 울타리. 원하는 대로 집과 정원을 조립하면 됩니다. 퀘스트 없음, 점수 없음, 목표 없음, 타이머 없음. 게임은 황금빛 오후 빛 아래 당신의 창작물을 렌더링해서 모든 것이 기억의 한 장면처럼 보입니다. 다른 사람들과 집을 공유하고 커뮤니티의 창작물을 감상할 수 있습니다. 기분에 따라 세션이 10분이 될 수도 두 시간이 될 수도 있습니다. 매우 작은 게임(7달러)이지만 매우 훌륭합니다. 설명이 필요 없는 게임——누군가에게 스크린샷 하나를 보여주면 즉시 이해합니다.',
    why_de:
      'Summerhouse stammt von Adam Robinson-Yu, dem gleichen Entwickler, der A Short Hike gemacht hat — und es hat die gleiche Qualität an Lo-Fi-Wärme und völligem Fehlen von Druck. Du bekommst ein kleines Grundstück und eine Auswahl an Bauelementen: Wände, Fenster, Dächer, Pflanzgefäße, Weinreben, Möbel, Zäune. Du baust ein Haus und Garten, wie es dir gefällt. Keine Quests, keine Punkte, keine Ziele, kein Timer. Das Spiel rendert deine Kreation in goldenem Nachmittagslicht, das alles wie eine Erinnerung aussehen lässt. Du kannst deine Häuser mit anderen teilen und die Kreationen der Community durchstöbern. Spielsitzungen können 10 Minuten oder zwei Stunden dauern, je nach Stimmung. Es ist extrem klein (7 €) und extrem gut. Die Art von Spiel, das man nicht erklärt — man zeigt jemandem einfach einen Screenshot und er versteht sofort.',
    tip_en: "Rotate pieces before placing (right-click or Q/E) — what seems like a limitation becomes a puzzle when you start combining angles differently.",
    tip_zh: '放置之前旋转组件（右键点击或 Q/E）——当你开始以不同角度组合时，看似限制的东西变成了谜题。',
    tip_zhTW: '放置之前旋轉組件（右鍵點擊或 Q/E）——當你開始以不同角度組合時，看似限制的東西變成了謎題。',
    tip_ja: '配置前にパーツを回転させてみましょう（右クリックまたはQ/E）——角度を変えて組み合わせると、制約に見えたものがパズルに変わります。',
    tip_ko: '배치 전에 부품을 회전시키세요(우클릭 또는 Q/E) — 다른 각도로 조합하기 시작하면 제한처럼 보이는 것이 퍼즐이 됩니다.',
    tip_de: 'Drehe Teile vor dem Platzieren (Rechtsklick oder Q/E) — was wie eine Einschränkung erscheint, wird zum Puzzle, wenn du anfängst, Winkel unterschiedlich zu kombinieren.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    townscaper: 0,
    'terra-nil': 0,
    dorfromantik: 0,
    summerhouse: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyBuilderQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-builder-games`
    const shareText = getLoc(
      `我的放松建造游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My cozy builder game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `我的放鬆建造遊戲推薦是「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `私のコージービルダーゲームは「${result.title_ja}」！${result.tag_ja}。あなたも試してみて：${url}`,
      `내 코지 빌더 게임 추천은 「${result.title_ko}」！${result.tag_ko}。당신도 찾아보세요：${url}`,
      `Mein Cozy-Builder-Spiel ist ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`,
    )

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {getLoc(result.tag_zh, result.tag_en, result.tag_zhTW, result.tag_ja, result.tag_ko, result.tag_de)}
          </p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}
          </h2>
          <p className="text-xs text-[#4a5a4a]">
            {getLoc(result.platform_zh, result.platform_en, result.platform_zhTW, result.platform_ja, result.platform_ko, result.platform_de)}
          </p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.why_zh, result.why_en, result.why_zhTW, result.why_ja, result.why_ko, result.why_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {getLoc('上手小贴士：', 'Getting started: ', '上手小貼士：', 'はじめる前に：', '시작 팁：', 'Erste Schritte: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把 Cozy 游戏的季节感带入你的真实生活节奏。',
              'TendFarm is building a farm rhythm tracker — bringing the seasonal feeling of cozy games into real life.',
              'TendFarm 正在研發農場節律追蹤功能——把 Cozy 遊戲的季節感帶入你的真實生活節奏。',
              'TendFarm はファームリズムトラッカーを開発中です——コージーゲームの季節感をリアルな生活リズムに。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 코지 게임의 계절감을 실제 생활 리듬으로.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — das saisonale Gefühl von Cozy Games ins echte Leben bringen.',
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やる', '다시 테스트하기', 'Nochmal machen')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-bold text-[#e8dcc8]">
          {getLoc(
            '你应该玩哪款放松建造游戏？',
            'Which Cozy Builder Game Should You Play?',
            '你應該玩哪款放鬆建造遊戲？',
            'あなたにぴったりのコージービルダーゲームは？',
            '당신에게 맞는 코지 건설 게임은 무엇일까요?',
            'Welches Cozy-Builder-Spiel solltest du spielen?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，在 Townscaper、Terra Nil、Dorfromantik 和 Summerhouse 中找到最适合你的冥想建造体验',
            '6 questions to find your match across Townscaper, Terra Nil, Dorfromantik, and Summerhouse — all zero combat, all pure building joy',
            '6 個問題，在 Townscaper、Terra Nil、Dorfromantik 和 Summerhouse 中找到最適合你的冥想建造體驗',
            '6つの質問で、Townscaper・Terra Nil・Dorfromantik・Summerhouse の中からあなたにぴったりの癒し建造ゲームを見つけよう',
            '6가지 질문으로 Townscaper, Terra Nil, Dorfromantik, Summerhouse 중 당신에게 딱 맞는 힐링 건설 게임을 찾아보세요',
            '6 Fragen, um deinen idealen meditativen Baugame-Match zwischen Townscaper, Terra Nil, Dorfromantik und Summerhouse zu finden — alles ohne Kampf, alles reiner Bauspaß',
          )}
        </p>
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, qi) => (
          <div key={qi}>
            <p className="mb-3 font-medium text-[#e8dcc8]">
              {qi + 1}. {getLoc(q.q_zh, q.q_en, q.q_zhTW, q.q_ja, q.q_ko, q.q_de)}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => { const next = [...answers]; next[qi] = opt.type; setAnswers(next) }}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    answers[qi] === opt.type
                      ? 'border-[#f0a832] bg-[#f0a832]/10 text-[#e8dcc8]'
                      : 'border-[#2d3d2d] text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]'
                  }`}
                >
                  {getLoc(opt.zh, opt.en, opt.zhTW, opt.ja, opt.ko, opt.de)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={!allAnswered}
        onClick={() => setSubmitted(true)}
        className={`mt-8 w-full rounded-xl py-3 font-semibold transition-colors ${
          allAnswered ? 'bg-[#f0a832] text-[#0f1a0f] hover:bg-[#e09822]' : 'cursor-not-allowed bg-[#2d3d2d] text-[#4a5a4a]'
        }`}
      >
        {getLoc('找到我的建造游戏', 'Find My Builder Game', '找到我的建造遊戲', '私のビルダーゲームを見つける', '내 건설 게임 찾기', 'Mein Builder-Spiel finden')}
      </button>
    </div>
  )
}
