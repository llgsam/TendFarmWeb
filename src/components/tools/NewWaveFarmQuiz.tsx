'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'echoes' | 'sugardew' | 'grow' | 'farmtogether'

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
    q_en: 'Which emotional tone are you looking for in your next farming game?',
    q_zh: '你希望下一款农场游戏给你什么样的情感调性？',
    q_zhTW: '你希望下一款農場遊戲給你什麼樣的情感調性？',
    q_ja: '次にプレイするファームゲームに求める感情的なトーンは？',
    q_ko: '다음 농장 게임에서 어떤 감정적 분위기를 원하시나요?',
    q_de: 'Welche emotionale Stimmung suchst du in deinem nächsten Farmspiel?',
    options: [
      {
        en: 'Bittersweet depth — I want a game that does not shy away from loss, aging, and the weight of time',
        zh: '有苦有甜的厚重感——我希望游戏不回避失去、衰老和时光的重量',
        zhTW: '有苦有甜的厚重感——我希望遊戲不回避失去、衰老和時光的重量',
        ja: '甘く切ない深み——喪失、老い、時の重みから逃げないゲームがいい',
        ko: '달콤 씁쓸한 깊이감 — 상실, 노화, 시간의 무게를 회피하지 않는 게임',
        de: 'Bittersüße Tiefe — ein Spiel, das Verlust, Altern und die Last der Zeit nicht scheut',
        type: 'echoes',
      },
      {
        en: 'Pure warmth and comfort — gentle, cheerful, and free of any stress or darkness',
        zh: '纯粹的温暖和舒适——温柔愉快，完全没有压力或沉重感',
        zhTW: '純粹的溫暖和舒適——溫柔愉快，完全沒有壓力或沉重感',
        ja: '純粋な温もりと安心感——穏やかで明るく、ストレスも暗さも一切ない',
        ko: '순수한 따뜻함과 편안함 — 부드럽고 즐거우며 스트레스나 어두움이 전혀 없는',
        de: 'Pure Wärme und Geborgenheit — sanft, heiter, ohne jeglichen Stress oder Dunkelheit',
        type: 'sugardew',
      },
      {
        en: 'Wonder and creativity — the joy of imagining and building something that has never existed before',
        zh: '惊奇与创造力——想象并建造前所未有的东西所带来的那种喜悦',
        zhTW: '驚奇與創造力——想像並建造前所未有的東西所帶來的那種喜悅',
        ja: '驚きと創造性——存在しなかった何かを想像し、作り上げる喜び',
        ko: '경이로움과 창의성 — 세상에 없던 무언가를 상상하고 만드는 기쁨',
        de: 'Staunen und Kreativität — die Freude, etwas zu erschaffen, das es noch nie gab',
        type: 'grow',
      },
      {
        en: 'Relaxed and social — the shared pleasure of tending a farm together with no pressure to perform',
        zh: '轻松而有社交感——和人一起耕作的共同乐趣，没有任何表现压力',
        zhTW: '輕鬆而有社交感——和人一起耕作的共同樂趣，沒有任何表現壓力',
        ja: 'のんびり一緒に——誰かと農場を耕す共同の楽しさ、プレッシャーなし',
        ko: '느긋하고 사교적인 — 함께 농장을 돌보는 공동의 즐거움, 부담 없이',
        de: 'Entspannt und gesellig — die gemeinsame Freude am Farmen ohne Leistungsdruck',
        type: 'farmtogether',
      },
    ],
  },
  {
    q_en: 'When you sit down to play a farming game, what motivates you most?',
    q_zh: '当你坐下来玩农场游戏时，最驱动你的是什么？',
    q_zhTW: '當你坐下來玩農場遊戲時，最驅動你的是什麼？',
    q_ja: 'ファームゲームに向かうとき、一番の原動力は何ですか？',
    q_ko: '농장 게임을 플레이할 때 가장 큰 동기는 무엇인가요?',
    q_de: 'Was motiviert dich am meisten, wenn du ein Farmspiel spielst?',
    options: [
      {
        en: 'Watching a family and community evolve across generations, shaped by choices I made years ago',
        zh: '看着一个家族和社区在世代中演变，被我多年前做出的选择所塑造',
        zhTW: '看著一個家族和社區在世代中演變，被我多年前做出的選擇所塑造',
        ja: '自分の選択で形成された家族とコミュニティが世代を超えて進化していく様子を見ること',
        ko: '수년 전 내 선택으로 형성된 가족과 공동체가 세대를 거치며 변화하는 것을 지켜보기',
        de: 'Eine Familie und Gemeinschaft über Generationen hinweg wachsen zu sehen, geformt durch meine früheren Entscheidungen',
        type: 'echoes',
      },
      {
        en: 'The simple daily loop of caring for plants, animals, and villagers in a world that never asks too much',
        zh: '照料植物、动物和村民的简单日常循环，在一个从不要求太多的世界里',
        zhTW: '在一個從不要求太多的世界裡，照料植物、動物和村民的簡單日常循環',
        ja: '植物、動物、村人を世話するシンプルな毎日のループ、あまり多くを求めない世界で',
        ko: '너무 많은 것을 요구하지 않는 세계에서 식물, 동물, 마을 주민을 돌보는 단순한 일상 루프',
        de: 'Die einfache tägliche Schleife des Kümmerns um Pflanzen, Tiere und Dorfbewohner in einer Welt, die nicht zu viel verlangt',
        type: 'sugardew',
      },
      {
        en: 'The creative challenge of growing unique biomes, restoring a legendary world, and unlocking its secrets',
        zh: '培育独特生态、修复传奇世界、解锁其中奥秘的创造性挑战',
        zhTW: '培育獨特生態、修復傳奇世界、解鎖其中奧秘的創造性挑戰',
        ja: 'ユニークな生態系を育て、伝説の世界を修復し、その秘密を解き明かすクリエイティブな挑戦',
        ko: '독특한 생태계를 키우고, 전설적인 세계를 복원하고, 그 비밀을 해제하는 창의적인 도전',
        de: 'Die kreative Herausforderung, einzigartige Ökosysteme zu züchten, eine legendäre Welt zu restaurieren und ihre Geheimnisse zu enthüllen',
        type: 'grow',
      },
      {
        en: 'Building something alongside another person — the farm is the background for connection, not the point itself',
        zh: '和另一个人共同建造什么——农场是联结的背景，而不是目的本身',
        zhTW: '和另一個人共同建造什麼——農場是聯結的背景，而不是目的本身',
        ja: '誰かと一緒に何かを作ること——農場は繋がりの舞台であって、目的そのものではない',
        ko: '다른 사람과 함께 무언가를 만드는 것 — 농장은 유대의 배경이지 목적 자체가 아닌',
        de: 'Mit jemandem zusammen etwas aufbauen — die Farm ist die Kulisse für Verbindung, nicht der Zweck selbst',
        type: 'farmtogether',
      },
    ],
  },
  {
    q_en: 'How important is multiplayer to you?',
    q_zh: '多人联机对你有多重要？',
    q_zhTW: '多人連線對你有多重要？',
    q_ja: 'マルチプレイはどのくらい重要ですか？',
    q_ko: '멀티플레이어가 얼마나 중요한가요?',
    q_de: 'Wie wichtig ist dir Multiplayer?',
    options: [
      {
        en: 'Not important at all — this is my solo story and I do not want shared narrative intruding on it',
        zh: '完全不重要——这是我个人的故事，我不希望共享叙事打扰它',
        zhTW: '完全不重要——這是我個人的故事，我不希望共享敘事打擾它',
        ja: '全く重要じゃない——これは自分だけの物語で、共有の物語に邪魔されたくない',
        ko: '전혀 중요하지 않아요 — 이건 나만의 이야기이고, 공유 서사가 끼어들길 원하지 않아요',
        de: 'Überhaupt nicht wichtig — das ist meine persönliche Geschichte, und ich möchte nicht, dass geteilte Narrative sie stören',
        type: 'echoes',
      },
      {
        en: 'I enjoy solo but would not say no to a relaxed co-op session with a friend',
        zh: '享受单人，但不排斥偶尔和朋友轻松联机的体验',
        zhTW: '享受單人，但不排斥偶爾和朋友輕鬆連線的體驗',
        ja: 'ソロも楽しいけど、友達とのんびり協力プレイも悪くない',
        ko: '혼자도 즐기지만 가끔 친구와 함께하는 느긋한 협동 플레이도 좋아요',
        de: 'Ich genieße Solo, würde aber eine entspannte Koop-Session mit einem Freund nicht ablehnen',
        type: 'sugardew',
      },
      {
        en: 'I prefer solo so I can build my world exactly the way I envision without compromising',
        zh: '偏好单人，这样我才能完全按照自己的构想建造世界，不需要妥协',
        zhTW: '偏好單人，這樣我才能完全按照自己的構想建造世界，不需要妥協',
        ja: 'ソロ派——自分のビジョン通りに世界を作りたいから、妥協したくない',
        ko: '싱글 플레이 선호 — 내 구상대로 세계를 만들고 싶어서 타협하고 싶지 않아요',
        de: 'Ich bevorzuge Solo, damit ich meine Welt genau so aufbauen kann, wie ich es mir vorstelle, ohne Kompromisse',
        type: 'grow',
      },
      {
        en: 'Multiplayer is the whole point — farming alongside someone else is why I play this kind of game',
        zh: '联机才是重点——和别人一起耕作正是我玩这类游戏的原因',
        zhTW: '連線才是重點——和別人一起耕作正是我玩這類遊戲的原因',
        ja: 'マルチが全て——誰かと一緒に農作業するために、このジャンルをプレイしてる',
        ko: '멀티플레이어가 전부예요 — 다른 사람과 함께 농사짓는 것이 이런 게임을 하는 이유예요',
        de: 'Multiplayer ist der ganze Sinn — zusammen mit jemandem zu farmen ist der Grund, warum ich diese Art von Spiel spiele',
        type: 'farmtogether',
      },
    ],
  },
  {
    q_en: 'How do you feel about generational mechanics — characters aging, dying, and leaving legacies?',
    q_zh: '你对代际机制有什么感受——角色变老、死去、留下遗产？',
    q_zhTW: '你對代際機制有什麼感受——角色變老、死去、留下遺產？',
    q_ja: '世代交代システムについてどう思いますか——キャラクターが老い、死に、遺産を残す？',
    q_ko: '캐릭터가 노화하고, 사망하고, 유산을 남기는 세대 교체 메카닉에 대해 어떻게 느끼나요?',
    q_de: 'Wie stehst du zu Generationsmechaniken — Charaktere, die altern, sterben und Vermächtnisse hinterlassen?',
    options: [
      {
        en: 'I find it deeply meaningful — the passage of time gives everything in the game more weight and beauty',
        zh: '我觉得它意义深远——时光流逝让游戏中的一切都有了更多分量和美感',
        zhTW: '我覺得它意義深遠——時光流逝讓遊戲中的一切都有了更多分量和美感',
        ja: '深く意味があると思う——時の流れがゲーム内のすべてに重みと美しさを与える',
        ko: '깊이 의미 있다고 느껴요 — 시간의 흐름이 게임 속 모든 것에 무게와 아름다움을 줘요',
        de: 'Ich finde es sehr bedeutungsvoll — der Lauf der Zeit gibt allem im Spiel mehr Gewicht und Schönheit',
        type: 'echoes',
      },
      {
        en: 'I prefer to stay with one character in a world that stays consistently warm and familiar',
        zh: '我更喜欢始终和同一个角色在一起，在一个持续温暖熟悉的世界里',
        zhTW: '我更喜歡始終和同一個角色在一起，在一個持續溫暖熟悉的世界裡',
        ja: '同じキャラクターと一緒にいたい——ずっと温かくて馴染みのある世界で',
        ko: '항상 같은 캐릭터와 함께하고 싶어요 — 지속적으로 따뜻하고 친숙한 세계에서',
        de: 'Ich bleibe lieber bei einem Charakter in einer Welt, die stets warm und vertraut bleibt',
        type: 'sugardew',
      },
      {
        en: 'Not relevant to me — my interest is in building and exploring, not in story continuity across time',
        zh: '对我来说不相关——我的兴趣是建造和探索，不是跨越时间的故事连续性',
        zhTW: '對我來說不相關——我的興趣是建造和探索，不是跨越時間的故事連續性',
        ja: '関係ない——興味は建設と探索で、時間を超えたストーリーの連続性じゃない',
        ko: '나와는 관련 없어요 — 제 관심은 건설과 탐험이지, 시간을 가로지르는 스토리 연속성이 아니에요',
        de: 'Nicht relevant für mich — mein Interesse gilt dem Bauen und Erkunden, nicht der zeitübergreifenden Story-Kontinuität',
        type: 'grow',
      },
      {
        en: 'Not a priority — I want a timeless farm that my friends and I can return to whenever we like',
        zh: '不是优先考虑的——我想要一个永恒的农场，和朋友随时都能回来',
        zhTW: '不是優先考慮的——我想要一個永恆的農場，和朋友隨時都能回來',
        ja: '優先度低い——友達と好きな時に戻れる、永続的な農場が欲しい',
        ko: '우선순위가 아니에요 — 친구들과 언제든지 돌아올 수 있는 영원한 농장을 원해요',
        de: 'Keine Priorität — ich möchte eine zeitlose Farm, zu der meine Freunde und ich jederzeit zurückkehren können',
        type: 'farmtogether',
      },
    ],
  },
  {
    q_en: 'Which visual style appeals to you most?',
    q_zh: '哪种视觉风格最吸引你？',
    q_zhTW: '哪種視覺風格最吸引你？',
    q_ja: 'どのビジュアルスタイルが一番好きですか？',
    q_ko: '어떤 비주얼 스타일이 가장 마음에 드시나요?',
    q_de: 'Welcher visuelle Stil spricht dich am meisten an?',
    options: [
      {
        en: 'Detailed pixel art with muted, earthy tones that feel like a hand-illustrated storybook',
        zh: '细腻的像素画风，柔和的大地色调，像手绘故事书一样温润',
        zhTW: '細膩的像素畫風，柔和的大地色調，像手繪故事書一樣溫潤',
        ja: '手書きの絵本みたいな、落ち着いた大地の色合いの詳細なドット絵',
        ko: '손으로 그린 동화책 같은, 차분한 흙빛 색조의 세밀한 픽셀 아트',
        de: 'Detaillierte Pixel-Art mit gedämpften Erdtönen, die sich wie ein handillustriertes Märchenbuch anfühlt',
        type: 'echoes',
      },
      {
        en: 'Soft, pastel-colored fairy-tale illustration with rounded shapes and gentle animations',
        zh: '柔和的粉彩色调童话插画风，圆润的形状和温柔的动画',
        zhTW: '柔和的粉彩色調童話插畫風，圓潤的形狀和溫柔的動畫',
        ja: '丸みのある形と優しいアニメーションが特徴の、ソフトなパステルカラーのメルヘンイラスト風',
        ko: '부드러운 파스텔 색조의 동화 삽화 스타일, 둥근 형태와 부드러운 애니메이션',
        de: 'Weiche, pastellfarbene Märchen-Illustration mit abgerundeten Formen und sanften Animationen',
        type: 'sugardew',
      },
      {
        en: 'Vibrant, painterly 3D art that makes every biome feel like a living watercolor landscape',
        zh: '鲜艳的绘画感3D风格，让每个生态区域都像一幅活着的水彩画',
        zhTW: '鮮艷的繪畫感3D風格，讓每個生態區域都像一幅活著的水彩畫',
        ja: '鮮やかで絵画的な3Dアート、各バイオームが生きている水彩画みたい',
        ko: '생동감 있고 회화적인 3D 아트, 각 생태계가 살아있는 수채화처럼 느껴지는',
        de: 'Lebhaftes, malerisches 3D-Art, das jedes Biom wie eine lebendige Aquarelllandschaft wirken lässt',
        type: 'grow',
      },
      {
        en: 'Clean, colorful, and approachable — style that feels welcoming at any experience level',
        zh: '干净、色彩丰富、易于亲近——风格在任何经验水平都感觉友好',
        zhTW: '乾淨、色彩豐富、易於親近——風格在任何經驗水平都感覺友好',
        ja: 'クリーンでカラフルで親しみやすい——どんな経験レベルでも歓迎感のあるスタイル',
        ko: '깔끔하고 다채롭고 친근한 — 어떤 경험 수준에서도 환영받는 느낌의 스타일',
        de: 'Klar, farbenfroh und zugänglich — ein Stil, der sich auf jedem Erfahrungsniveau willkommen anfühlt',
        type: 'farmtogether',
      },
    ],
  },
  {
    q_en: 'What does your ideal farming game endgame look like?',
    q_zh: '你理想中的农场游戏"游戏后期"是什么样的？',
    q_zhTW: '你理想中的農場遊戲「遊戲後期」是什麼樣的？',
    q_ja: 'あなたの理想のファームゲームのエンドゲームはどんな感じ？',
    q_ko: '이상적인 농장 게임의 엔드게임은 어떤 모습인가요?',
    q_de: 'Wie sieht dein ideales Farmspiel-Endgame aus?',
    options: [
      {
        en: 'A multi-generational legacy that I shaped — looking back at what my choices created across decades',
        zh: '由我塑造的跨代遗产——回望我的选择在数十年间创造了什么',
        zhTW: '由我塑造的跨代遺產——回望我的選擇在數十年間創造了什麼',
        ja: '自分が形作った多世代の遺産——数十年にわたって自分の選択が生み出したものを振り返ること',
        ko: '내가 만든 다세대 유산 — 수십 년에 걸쳐 내 선택이 만들어낸 것을 돌아보기',
        de: 'Ein multigenerationales Erbe, das ich geprägt habe — zurückblicken auf das, was meine Entscheidungen über Jahrzehnte geschaffen haben',
        type: 'echoes',
      },
      {
        en: 'A fully flourishing island community where every villager is happy and every corner is beautiful',
        zh: '一个完全繁荣的岛屿社区，每个村民都幸福，每个角落都美丽',
        zhTW: '一個完全繁榮的島嶼社區，每個村民都幸福，每個角落都美麗',
        ja: 'すべての村人が幸せで、あらゆる角が美しい、完全に栄えた島のコミュニティ',
        ko: '모든 주민이 행복하고 모든 구석이 아름다운, 완전히 번성한 섬 공동체',
        de: 'Eine vollständig blühende Inselgemeinschaft, in der jeder Bewohner glücklich und jede Ecke wunderschön ist',
        type: 'sugardew',
      },
      {
        en: 'A fully restored legendary world filled with diverse biomes and a thriving town I built from nothing',
        zh: '完全修复的传奇世界，充满多样生态，以及我从零建起的繁荣小镇',
        zhTW: '完全修復的傳奇世界，充滿多樣生態，以及我從零建起的繁榮小鎮',
        ja: '多様なバイオームが広がる完全修復された伝説の世界と、ゼロから築いた賑やかな街',
        ko: '다양한 생태계로 가득 찬 완전히 복원된 전설적인 세계와 내가 처음부터 만든 번성하는 마을',
        de: 'Eine vollständig restaurierte legendäre Welt voller verschiedener Ökosysteme und eine florierende Stadt, die ich von Grund auf gebaut habe',
        type: 'grow',
      },
      {
        en: 'A shared farm that keeps growing every time my friends and I log back in together',
        zh: '一个每次和朋友一起登录都在继续成长的共享农场',
        zhTW: '一個每次和朋友一起登入都在繼續成長的共享農場',
        ja: '友達と一緒にログインするたびに成長し続ける共有農場',
        ko: '친구들과 함께 로그인할 때마다 계속 성장하는 공유 농장',
        de: 'Eine gemeinsame Farm, die jedes Mal weiter wächst, wenn meine Freunde und ich zusammen einloggen',
        type: 'farmtogether',
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
  echoes: {
    title_en: 'Echoes of the Plum Grove',
    title_zh: '梅林回响（Echoes of the Plum Grove）',
    title_zhTW: '梅林回響（Echoes of the Plum Grove）',
    title_ja: 'エコーズ・オブ・ザ・プラム・グローブ',
    title_ko: '에코즈 오브 더 플럼 그로브',
    title_de: 'Echoes of the Plum Grove',
    emoji: '🌸',
    tag_en: 'The Generational Storyteller',
    tag_zh: '跨代叙事农耕者',
    tag_zhTW: '跨代敘事農耕者',
    tag_ja: '世代を超えた物語の語り手',
    tag_ko: '세대를 잇는 이야기꾼',
    tag_de: 'Der Generationen-Geschichtenerzähler',
    platform_en: 'PC',
    platform_zh: 'PC',
    platform_zhTW: 'PC',
    platform_ja: 'PC',
    platform_ko: 'PC',
    platform_de: 'PC',
    why_en: `Echoes of the Plum Grove is the farming life sim for players who found the Grandpa evaluation in Stardew Valley moving — and wondered what a whole game built around that generational pathos would feel like. Released in 2024, it is a multi-generational life simulation where you play through an entire family's history on a small farm: your first character will age, marry, have children, and eventually die, leaving the farm to the next generation. Each new character inherits the crops you planted, the relationships you built, and the structural decisions you made — but brings their own personality, strengths, and story. The game does not shy away from the full weight of a human life: illness, the death of spouses, the difficulty of family relationships, and the quiet satisfaction of watching something you built outlast you. The farming mechanics are traditional and meaningful: seasonal crops, animal husbandry, foraging, and market economics all interact in ways that require strategic thinking across multiple in-game generations rather than just a single playthrough. The art style uses detailed, muted pixel art that evokes a hand-illustrated journal, reinforcing the game's melancholic warmth. Echoes of the Plum Grove is not for players looking for escapism or stress relief — it is for players who want a farming game that makes them feel something real about time, love, and what we leave behind. It is one of the most emotionally ambitious farming games ever made.`,
    why_zh: `《梅林回响》是2024年最有情感野心的农场生活模拟游戏之一。这是一款多代传承的生命模拟：你扮演一个家族跨越世代的农耕历史，第一代角色会变老、结婚、生孩子，最终离世，把农场传给下一代。每个新角色继承你种下的作物、建立的人际关系和做出的土地决策，但带来各自的性格和故事。游戏不回避人生的全部重量：疾病、配偶离世、家庭关系的艰难，以及看着自己建造的东西在身后延续的安静满足感。农耕机制传统而有深度，需要跨越多代人的战略思考。像素画风细腻而色调柔和，像一本手绘日记，强化了游戏忧郁而温暖的基调。`,
    why_zhTW: `《梅林回響》是2024年最有情感野心的農場生活模擬遊戲之一。這是一款多代傳承的生命模擬：你扮演一個家族跨越世代的農耕歷史，第一代角色會變老、結婚、生孩子，最終離世，把農場傳給下一代。每個新角色繼承你種下的作物、建立的人際關係和做出的土地決策，但帶來各自的性格和故事。遊戲不回避人生的全部重量：疾病、配偶離世、家庭關係的艱難，以及看著自己建造的東西在身後延續的安靜滿足感。農耕機制傳統而有深度，需要跨越多代人的戰略思考。像素畫風細膩而色調柔和，像一本手繪日記，強化了遊戲憂鬱而溫暖的基調。`,
    why_ja: `『エコーズ・オブ・ザ・プラム・グローブ』は2024年に登場した、感情的野心に満ちた農場生活シミュレーションです。複数世代にまたがる命の物語——最初のキャラクターは歳を重ね、結婚し、子供を持ち、やがて旅立ちます。そして農場は次の世代へと受け継がれます。新しいキャラクターはあなたが育てた作物、築いた人間関係、下した土地の決断を引き継ぎますが、それぞれ独自の個性と物語を持っています。病、伴侶との別れ、家族関係の難しさ、そして自分が作ったものが自分の死後も続いていく静かな満足感——人生の全ての重みから目を逸らしません。農業メカニクスは伝統的で奥深く、単一のプレイスルーではなく複数世代にまたがる戦略的思考が求められます。詳細なドット絵スタイルは手書き日記のような温かみを持ち、ゲームの哀愁と温もりを引き立てます。`,
    why_ko: `『에코즈 오브 더 플럼 그로브』는 2024년 가장 감성적으로 야심 찬 농장 생활 시뮬레이션 게임 중 하나입니다. 이것은 다세대 생애 시뮬레이션으로, 한 가족의 세대에 걸친 농경 역사를 플레이합니다. 첫 번째 캐릭터는 나이를 먹고, 결혼하고, 아이를 낳고, 결국 세상을 떠나 농장을 다음 세대에게 물려줍니다. 새로운 캐릭터는 당신이 심은 작물, 쌓은 인간관계, 내린 토지 결정을 물려받지만, 각자의 성격과 이야기를 가지고 있습니다. 게임은 삶의 모든 무게를 회피하지 않습니다: 질병, 배우자의 죽음, 가족 관계의 어려움, 그리고 자신이 만든 것이 자신보다 오래 지속되는 것을 보는 조용한 만족감. 농업 메카닉은 전통적이면서도 깊이가 있어, 단일 플레이스루가 아닌 여러 세대에 걸친 전략적 사고가 필요합니다. 세밀하고 차분한 픽셀 아트 스타일이 게임의 애수 어린 따뜻함을 강화합니다.`,
    why_de: `Echoes of the Plum Grove ist eines der emotional ehrgeizigsten Farmspiele des Jahres 2024. Es ist eine generationsübergreifende Lebenssimulation: Du spielst durch die Landwirtschaftsgeschichte einer ganzen Familie über Generationen hinweg. Dein erster Charakter wird älter, heiratet, bekommt Kinder und stirbt schließlich, und hinterlässt die Farm der nächsten Generation. Jeder neue Charakter erbt die Pflanzen, die du gesetzt hast, die Beziehungen, die du aufgebaut hast, und die Entscheidungen, die du getroffen hast — bringt aber seine eigene Persönlichkeit und Geschichte mit. Das Spiel scheut das volle Gewicht eines Menschenlebens nicht: Krankheit, der Tod von Ehepartnern, die Schwierigkeit von Familienbeziehungen und die stille Befriedigung, zu sehen, wie das, was du aufgebaut hast, dich überdauert. Die Landwirtschaftsmechaniken sind traditionell und bedeutungsvoll und erfordern strategisches Denken über mehrere Ingame-Generationen hinweg. Der detaillierte, gedämpfte Pixel-Art-Stil verstärkt die melancholische Wärme des Spiels.`,
    tip_en: `The most important early decision in Echoes of the Plum Grove is your first character's marriage partner — their traits directly influence which skills and personality tendencies your children inherit, compounding across generations. Prioritize building relationships with all villagers before your first character ages out, because second-generation characters start with fewer inherited relationship points than you might expect. Plant perennial crops (those that regrow each season without replanting) as early as possible — these are the investments that pay off most dramatically across generational timescales. Keep a written record of your farming decisions between generations; the game does not summarize your legacy for you, and understanding what you built helps you plan what to leave.`,
    tip_zh: `《梅林回响》最重要的早期决策是第一代角色的婚配选择——配偶的性格特质直接影响孩子继承哪些技能和性格倾向，并在世代间复利叠加。在第一代角色老去之前，尽量和所有村民建立关系，因为第二代角色继承的关系起点比你预期的少。尽早种植多年生作物（每季自动再生，无需重新播种）——这类投资在跨代时间尺度上回报最为显著。在代际之间保留你农业决策的手写记录；游戏不会为你总结遗产，了解你建造了什么有助于规划留下什么。`,
    tip_zhTW: `《梅林回響》最重要的早期決策是第一代角色的婚配選擇——配偶的性格特質直接影響孩子繼承哪些技能和性格傾向，並在世代間複利疊加。在第一代角色老去之前，盡量和所有村民建立關係，因為第二代角色繼承的關係起點比你預期的少。盡早種植多年生作物（每季自動再生，無需重新播種）——這類投資在跨代時間尺度上回報最為顯著。在代際之間保留你農業決策的手寫記錄；遊戲不會為你總結遺產，了解你建造了什麼有助於規劃留下什麼。`,
    tip_ja: `序盤で最も重要な決断は最初のキャラクターの結婚相手です——配偶者の特性は子供たちが継承するスキルや個性の傾向に直接影響し、世代を超えて複利で積み重なります。第一世代が老いる前に、できるだけ多くの村人と関係を築きましょう。第二世代のキャラクターが継承する関係値は予想より少ないことが多いです。多年生作物（毎シーズン自動再生するもの）をできるだけ早く植えること——これらの投資は世代を超えたタイムスケールで最も劇的なリターンをもたらします。世代の合間に農業の決断を記録しておくと良いでしょう。ゲームはあなたの遺産をまとめてくれないので、何を作ったかを把握することが次に何を残すかの計画につながります。`,
    tip_ko: `초반의 가장 중요한 결정은 첫 번째 캐릭터의 결혼 상대 선택입니다 — 배우자의 성격 특성이 자녀가 물려받는 스킬과 성향에 직접 영향을 미치며, 세대를 거치며 복리로 쌓입니다. 첫 번째 캐릭터가 나이 들기 전에 모든 마을 주민과 관계를 쌓으세요. 2세대 캐릭터가 물려받는 관계 시작점이 예상보다 낮을 수 있기 때문입니다. 다년생 작물(매 시즌 자동으로 다시 자라는 것)을 최대한 일찍 심으세요 — 이런 투자는 세대에 걸친 시간 규모에서 가장 극적인 수익을 가져옵니다. 세대 사이에 농업 결정을 기록해두세요. 게임이 유산을 요약해주지 않기 때문에, 무엇을 만들었는지 파악하는 것이 무엇을 남길지 계획하는 데 도움이 됩니다.`,
    tip_de: `Die wichtigste frühe Entscheidung in Echoes of the Plum Grove ist die Wahl des Heiratspartners für deinen ersten Charakter — die Eigenschaften des Partners beeinflussen direkt, welche Fähigkeiten und Persönlichkeitstendenzen deine Kinder erben, und das kumuliert sich über Generationen. Baue Beziehungen zu allen Dorfbewohnern auf, bevor dein erster Charakter altert, da Zweitgenerationscharaktere mit weniger vererbten Beziehungspunkten starten als erwartet. Pflanze Dauerfrüchte (jene, die jede Saison ohne Neupflanzung nachwachsen) so früh wie möglich — diese Investitionen zahlen sich über Generationszeitskalen am dramatischsten aus. Halte zwischen den Generationen schriftliche Aufzeichnungen deiner Farmingentscheidungen fest; das Spiel fasst dein Erbe nicht für dich zusammen, und zu verstehen, was du aufgebaut hast, hilft dir zu planen, was du hinterlässt.`,
  },
  sugardew: {
    title_en: 'Sugardew Island',
    title_zh: 'Sugardew Island',
    title_zhTW: 'Sugardew Island',
    title_ja: 'シュガーデュー・アイランド',
    title_ko: '슈가듀 아일랜드',
    title_de: 'Sugardew Island',
    emoji: '🌺',
    tag_en: 'The Cozy Island Farmer',
    tag_zh: '治愈岛屿农耕者',
    tag_zhTW: '療癒島嶼農耕者',
    tag_ja: '癒やしの島の農家',
    tag_ko: '아늑한 섬 농부',
    tag_de: 'Der gemütliche Inselbauer',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    platform_zhTW: 'PC · Nintendo Switch',
    platform_ja: 'PC · Nintendo Switch',
    platform_ko: 'PC · Nintendo Switch',
    platform_de: 'PC · Nintendo Switch',
    why_en: `Sugardew Island is the farming game that commits fully and without apology to a single vision: be as cozy as humanly possible. Developed by a small independent team, it takes place on a fairy-tale island filled with sweet magic, charming creature-folk villagers, and an art style that looks like a professional illustrator's personal passion project. You are a young farmer who arrives on the island and begins rebuilding its community by farming, crafting, fishing, and befriending the island's inhabitants. Unlike farming games that use darkness or complexity to add depth, Sugardew Island finds depth in warmth — in the richness of its villager personalities, the variety of its magical crops and crafting recipes, and the visual joy of watching your farm and the surrounding island transform into something genuinely beautiful. The game has no combat, no crop failures from weather, no energy bar that forces you to stop, and no time-limited events that punish absence. Every single mechanic is designed to ensure the player never feels stressed. For players who play farming games primarily as a restorative experience — not a puzzle to solve or a system to optimize, but a place to go when the world feels too heavy — Sugardew Island may be the most effective farming game ever made at being exactly what it promises.`,
    why_zh: `《Sugardew Island》是一款毫无保留地全力追求单一愿景的农场游戏：尽可能地治愈。游戏发生在一座充满甜蜜魔法、可爱生物村民的童话岛屿上，美术风格像一位专业插画师的私人热情项目。你是一个抵达岛屿的年轻农夫，通过农耕、制作、钓鱼和结交岛屿居民来重建社区。游戏没有战斗、没有因天气导致的作物失败、没有强迫你停手的体力槽，也没有会惩罚缺席的限时活动。每一个机制都经过设计，确保玩家永远不会感到压力。对于把农场游戏主要当作恢复性体验的玩家——不是要解决的谜题或优化的系统，而是当世界太沉重时可以去的地方——《Sugardew Island》可能是迄今为止最忠实于自身承诺的农场游戏。`,
    why_zhTW: `《Sugardew Island》是一款毫無保留地全力追求單一願景的農場遊戲：盡可能地療癒。遊戲發生在一座充滿甜蜜魔法、可愛生物村民的童話島嶼上，美術風格像一位專業插畫師的私人熱情項目。你是一個抵達島嶼的年輕農夫，通過農耕、製作、釣魚和結交島嶼居民來重建社區。遊戲沒有戰鬥、沒有因天氣導致的作物失敗、沒有強迫你停手的體力槽，也沒有會懲罰缺席的限時活動。每一個機制都經過設計，確保玩家永遠不會感到壓力。對於把農場遊戲主要當作恢復性體驗的玩家——不是要解決的謎題或優化的系統，而是當世界太沉重時可以去的地方——《Sugardew Island》可能是迄今為止最忠實於自身承諾的農場遊戲。`,
    why_ja: `『シュガーデュー・アイランド』は、たった一つのビジョンを貫いたファームゲームです：とにかく癒やされること。甘い魔法と愛らしい生き物の村人たちが住む童話の島が舞台で、アートスタイルはプロのイラストレーターが情熱を込めて描いたような仕上がり。島に到着した若い農夫として、農業、クラフト、釣り、そして島の住人たちとの交流を通じてコミュニティを再建します。戦闘なし、天気による作物失敗なし、行動を制限するスタミナゲージなし、ログインしないと損するイベントも一切なし。すべてのメカニクスはプレイヤーがストレスを感じないよう設計されています。疲れた時に帰ってくる場所としてファームゲームをプレイする人——解くべきパズルや最適化するシステムとしてではなく、休まる場所として——このゲームは約束通りの体験を届けてくれます。`,
    why_ko: `『슈가듀 아일랜드』는 하나의 비전만을 완전히 추구하는 농장 게임입니다: 최대한 아늑하게. 달콤한 마법과 귀여운 생물 주민들로 가득한 동화 속 섬이 배경이며, 아트 스타일은 전문 일러스트레이터의 개인 열정 프로젝트처럼 보입니다. 섬에 도착한 젊은 농부로서 농사, 제작, 낚시, 주민들과의 교류를 통해 공동체를 재건합니다. 전투 없음, 날씨로 인한 작물 실패 없음, 멈추도록 강요하는 체력 게이지 없음, 부재를 처벌하는 시간 제한 이벤트 없음. 모든 메카닉은 플레이어가 스트레스를 느끼지 않도록 설계되어 있습니다. 농장 게임을 주로 회복적 경험으로 즐기는 플레이어에게 — 풀어야 할 퍼즐이나 최적화할 시스템이 아니라, 세상이 너무 무거울 때 갈 수 있는 곳으로 — 『슈가듀 아일랜드』는 지금껏 만들어진 가장 충실한 농장 게임일 것입니다.`,
    why_de: `Sugardew Island ist ein Farmspiel, das sich vollständig und ohne Entschuldigung einer einzigen Vision verschreibt: so gemütlich wie möglich zu sein. Das Spiel spielt auf einer märchenhaften Insel voller süßer Magie und charmanter Bewohner-Kreaturen, mit einem Kunststil, der wie das persönliche Passionsprojekt eines professionellen Illustrators aussieht. Du bist ein junger Bauer, der auf der Insel ankommt und beginnt, ihre Gemeinschaft durch Farmen, Handwerken, Fischen und Anfreunden mit den Inselbewohnern wiederaufzubauen. Kein Kampf, kein Ernteverlust durch Wetter, kein Energieriegel, der dich zum Aufhören zwingt, und keine zeitbegrenzten Ereignisse, die Abwesenheit bestrafen. Jeder einzelne Mechanismus ist darauf ausgelegt, sicherzustellen, dass der Spieler sich nie gestresst fühlt. Für Spieler, die Farmspiele hauptsächlich als restorative Erfahrung spielen — nicht als Rätsel zum Lösen oder System zum Optimieren, sondern als Ort, an den man geht, wenn die Welt zu schwer ist — ist Sugardew Island vielleicht das wirksamste Farmspiel aller Zeiten darin, genau das zu sein, was es verspricht.`,
    tip_en: `Sugardew Island is designed to be played without a guide, and part of its joy is organic discovery — so resist the temptation to look everything up. The crafting recipe system reveals new options as you gather ingredients you have never combined before, and some of the most satisfying unlocks come from accidentally combining two things that turned out to create something wonderful. For villager relationships, gift items that match their visual aesthetic (flower lovers respond to floral crafts, earthy types prefer farm produce) rather than giving the same universal gift to everyone. The island's magical crop varieties have seasonal quirks that are not immediately obvious — experiment with planting the same seed in different weather conditions to discover variation.`,
    tip_zh: `《Sugardew Island》被设计成无需攻略的游玩体验，有机的探索发现是乐趣的一部分——抵制查阅所有内容的诱惑。制作配方系统在你收集从未组合过的材料时会自动揭示新选项，有些最让人满足的解锁来自意外将两样东西组合在一起，发现它们创造出了美妙的东西。在村民关系方面，赠送符合他们视觉审美的物品（喜欢花的村民对花卉工艺品有反应，朴实类型更喜欢农场产品），而不是给每个人同样的万能礼物。岛屿的魔法作物品种有不立即明显的季节特性——尝试在不同天气条件下种植同一种子以发现变化。`,
    tip_zhTW: `《Sugardew Island》被設計成無需攻略的遊玩體驗，有機的探索發現是樂趣的一部分——抵制查閱所有內容的誘惑。製作配方系統在你收集從未組合過的材料時會自動揭示新選項，有些最讓人滿足的解鎖來自意外將兩樣東西組合在一起，發現它們創造出了美妙的東西。在村民關係方面，贈送符合他們視覺審美的物品（喜歡花的村民對花卉工藝品有反應，樸實類型更喜歡農場產品），而不是給每個人同樣的萬能禮物。島嶼的魔法作物品種有不立即明顯的季節特性——嘗試在不同天氣條件下種植同一種子以發現變化。`,
    tip_ja: `『シュガーデュー・アイランド』は攻略なしで楽しめるよう設計されていて、有機的な発見の喜びが大切な部分です——すべてを調べたくなる衝動をぐっと抑えてみて。クラフトレシピは今まで組み合わせたことのない素材を集めると自動的に新しい選択肢を開示してくれるので、2つのものを偶然組み合わせて素敵な何かができた時の達成感が格別です。村人との関係は、彼らのビジュアル的な好みに合ったアイテムを贈ること（花好きには花のクラフト品、素朴なタイプは農産物が好き）。全員に同じ万能ギフトを贈るのは避けて。島の魔法作物の品種には最初はわかりにくい季節の特性がある——同じ種を異なる天気条件で植えて変化を発見してみよう。`,
    tip_ko: `『슈가듀 아일랜드』는 가이드 없이 즐길 수 있도록 설계되어 있으며, 유기적인 발견이 즐거움의 일부입니다 — 모든 것을 찾아보고 싶은 충동을 억제하세요. 제작 레시피 시스템은 전에 조합해본 적 없는 재료를 모으면 자동으로 새로운 선택지를 보여줘서, 두 가지를 우연히 조합했을 때 멋진 것이 만들어지는 만족감이 특별합니다. 주민 관계에서는 그들의 시각적 미학에 맞는 아이템을 선물하세요 (꽃을 좋아하는 주민은 꽃 공예품에, 소박한 유형은 농산물을 선호합니다). 섬의 마법 작물 품종에는 처음에는 명확하지 않은 계절적 특성이 있습니다 — 같은 씨앗을 다른 날씨 조건에서 심어 변화를 발견해보세요.`,
    tip_de: `Sugardew Island ist darauf ausgelegt, ohne Leitfaden gespielt zu werden, und ein Teil seiner Freude liegt in der organischen Entdeckung — widerstehe also der Versuchung, alles nachzuschlagen. Das Crafting-Rezept-System enthüllt neue Optionen, wenn du Zutaten sammelst, die du noch nie kombiniert hast, und einige der befriedigendsten Entdeckungen entstehen durch das zufällige Kombinieren zweier Dinge, die sich als wunderbares Ergebnis herausstellen. Für Dorfbewohner-Beziehungen: Schenke Gegenstände, die ihrer visuellen Ästhetik entsprechen (Blumenliebhaber reagieren auf Blumenbasteleien, erdige Typen bevorzugen Farmprodukte), anstatt jedem das gleiche universelle Geschenk zu geben. Die magischen Pflanzensorten der Insel haben saisonale Eigenheiten, die nicht sofort offensichtlich sind — experimentiere damit, denselben Samen unter verschiedenen Wetterbedingungen zu pflanzen, um Variationen zu entdecken.`,
  },
  grow: {
    title_en: 'Grow: Song of the Evertree',
    title_zh: '生长：常树之歌',
    title_zhTW: '生長：常樹之歌',
    title_ja: 'グロウ：ソング・オブ・ザ・エバーツリー',
    title_ko: '그로우: 에버트리의 노래',
    title_de: 'Grow: Song of the Evertree',
    emoji: '🌳',
    tag_en: 'The World Restorer',
    tag_zh: '世界修复者',
    tag_zhTW: '世界修復者',
    tag_ja: '世界の修復者',
    tag_ko: '세계 복원자',
    tag_de: 'Der Weltwiederherstelller',
    platform_en: 'PC · Switch · PS4/5 · Xbox',
    platform_zh: 'PC · Switch · PS4/5 · Xbox',
    platform_zhTW: 'PC · Switch · PS4/5 · Xbox',
    platform_ja: 'PC · Switch · PS4/5 · Xbox',
    platform_ko: 'PC · Switch · PS4/5 · Xbox',
    platform_de: 'PC · Switch · PS4/5 · Xbox',
    why_en: `Grow: Song of the Evertree is the farming game for players whose favorite part of Stardew Valley was watching the town improve and the world open up — amplified into a full creative world-building experience. Developed by Prideful Sloth (the studio behind Yonder: The Cloud Catcher Chronicles), Grow tasks you as the last World Alchemist to restore the legendary Evertree — an enormous mythical tree that once generated entire living worlds from its branches. By cultivating "Alwaysworld" seeds using alchemy and farming, you grow miniature biomes: forests, deserts, wetlands, tundra — each a unique ecosystem with its own flora, fauna, and atmosphere. These biomes can be explored, and discovering each world's secrets is as rewarding as growing it. Alongside the Evertree, you build and restore a town called Sheth, attracting settlers and developing infrastructure through the resources your biomes generate. The farming in Grow is alchemical and creative: rather than planting vegetables for profit, you grow worlds for beauty and discovery, and the ingredients you harvest are catalysts for the next creation. The game has a lush, painterly 3D visual style that makes every new biome feel like a living painting you designed. It supports both solo and co-op play, and is one of the few farming-adjacent games available on every major platform. For players who want a farming game where the harvest is a new world, Grow is entirely unlike anything else in the genre.`,
    why_zh: `《生长：常树之歌》（Grow: Song of the Evertree）是为那些最喜欢《星露谷》中看着小镇改善、世界逐渐开放的玩家而生的游戏——被放大成一个完整的创意世界建构体验。你是最后一位世界炼金师，任务是修复传奇常树——一棵曾经从枝桠上生成整个活生生世界的巨大神话之树。通过炼金和农耕培育"常世"种子，你生长出微型生态系统：森林、沙漠、湿地、冻土带——每一个都有独特的植物群、动物群和氛围。同时，你建设和修复名为Sheth的小镇。游戏的农耕是炼金式的、创造性的：与其为利润种植蔬菜，你为美丽和发现而培育世界。视觉风格丰富而富有绘画感，让每个新生态区域感觉像一幅你设计的活画。`,
    why_zhTW: `《生長：常樹之歌》（Grow: Song of the Evertree）是為那些最喜歡《星露谷》中看著小鎮改善、世界逐漸開放的玩家而生的遊戲——被放大成一個完整的創意世界建構體驗。你是最後一位世界煉金師，任務是修復傳奇常樹——一棵曾經從枝椏上生成整個活生生世界的巨大神話之樹。通過煉金和農耕培育「常世」種子，你生長出微型生態系統：森林、沙漠、濕地、凍土帶——每一個都有獨特的植物群、動物群和氛圍。同時，你建設和修復名為Sheth的小鎮。遊戲的農耕是煉金式的、創造性的：與其為利潤種植蔬菜，你為美麗和發現而培育世界。視覺風格豐富而富有繪畫感，讓每個新生態區域感覺像一幅你設計的活畫。`,
    why_ja: `『グロウ：ソング・オブ・ザ・エバーツリー』は、スターデューバレーで街が発展して世界が広がっていく部分が一番好きだったプレイヤーのためのゲームです——それを本格的なクリエイティブ世界構築体験に拡大したような作品。あなたは最後の世界錬金術師として、伝説の常緑樹（エバーツリー）を修復する使命を持ちます。この巨大な神話の木はかつてその枝から生きた世界全体を生み出していました。錬金術と農業で「常世」の種を育て、ミニチュアのバイオームを成長させていきます：森林、砂漠、湿地、ツンドラ——それぞれ独自の植物群、動物群、雰囲気を持つ。その傍ら、Shethという街を建設・修復します。グロウの農業は錬金術的でクリエイティブ：利益のために野菜を植えるのではなく、美しさと発見のために世界を育てるのです。生き生きとした絵画的な3Dビジュアルが、新しいバイオームをあなたがデザインした生きた水彩画のように感じさせます。`,
    why_ko: `『그로우: 에버트리의 노래』는 스타듀 밸리에서 마을이 발전하고 세계가 열리는 부분을 가장 좋아했던 플레이어를 위한 게임입니다 — 그것을 완전한 창의적 세계 건설 경험으로 확장한 것처럼. 당신은 마지막 세계 연금술사로서 전설의 에버트리를 복원하는 임무를 맡습니다. 연금술과 농업으로 '알웨이스월드' 씨앗을 키워 미니어처 생태계를 성장시킵니다: 숲, 사막, 습지, 툰드라 — 각각 고유한 식물군, 동물군, 분위기를 가진. 동시에 Sheth라는 마을을 건설하고 복원합니다. 그로우의 농업은 연금술적이고 창의적입니다: 이익을 위해 채소를 심는 것이 아니라, 아름다움과 발견을 위해 세계를 키우는 것입니다. 풍성하고 회화적인 3D 비주얼 스타일이 새로운 생태계마다 당신이 설계한 살아있는 수채화처럼 느끼게 합니다.`,
    why_de: `Grow: Song of the Evertree ist das Farmspiel für Spieler, denen der Teil in Stardew Valley am besten gefiel, in dem die Stadt sich verbesserte und die Welt sich öffnete — verstärkt zu einem vollständigen kreativen Weltbau-Erlebnis. Du bist der letzte Welt-Alchemist, der den legendären Ewigen Baum (Evertree) restaurieren soll. Durch den Anbau von "Alwaysworld"-Samen mithilfe von Alchemie und Landwirtschaft züchtest du Miniatur-Ökosysteme: Wälder, Wüsten, Feuchtgebiete, Tundra — jedes ein einzigartiges Ökosystem. Gleichzeitig baust und restaurierst du eine Stadt namens Sheth. Die Landwirtschaft in Grow ist alchemistisch und kreativ: Anstatt Gemüse für Profit anzubauen, züchtest du Welten für Schönheit und Entdeckung. Der üppige, malerische 3D-Kunststil lässt jedes neue Biom wie ein lebendes Aquarell anfühlen, das du entworfen hast.`,
    tip_en: `The key to efficient world progression in Grow is understanding that each Alwaysworld biome has a "completion threshold" — a minimum biodiversity requirement before it yields its rarest resources. Rushing to grow more biomes before completing the ones you have will leave you short on the catalysts needed for later alchemy recipes. Explore each biome thoroughly before moving to the next, because hidden items within them often unlock unique Sheth building types that would otherwise take much longer to discover. For town building, prioritize structures that expand your Alwaysworld seed capacity before decorative structures — more cultivation slots is always the bottleneck in the mid-game. The game's co-op mode lets a second player tend existing biomes while you grow new ones, which dramatically accelerates progression.`,
    tip_zh: `《生长》中高效推进世界的关键是理解每个常世生态系统都有一个"完成阈值"——在产出最稀有资源之前的最低生物多样性要求。在完成已有生态之前急于培育更多会让你缺少后期炼金配方所需的催化剂。在转向下一个之前彻底探索每个生态，因为其中隐藏的物品经常解锁独特的Sheth建筑类型，否则需要更长时间才能发现。建镇方面，在装饰性建筑之前优先建造扩大常世种子容量的建筑——更多培育槽位始终是中期游戏的瓶颈。游戏的合作模式让第二个玩家照料现有生态，同时你培育新的，大幅加快推进速度。`,
    tip_zhTW: `《生長》中高效推進世界的關鍵是理解每個常世生態系統都有一個「完成閾值」——在產出最稀有資源之前的最低生物多樣性要求。在完成已有生態之前急於培育更多會讓你缺少後期煉金配方所需的催化劑。在轉向下一個之前徹底探索每個生態，因為其中隱藏的物品經常解鎖獨特的Sheth建築類型，否則需要更長時間才能發現。建鎮方面，在裝飾性建築之前優先建造擴大常世種子容量的建築——更多培育槽位始終是中期遊戲的瓶頸。遊戲的合作模式讓第二個玩家照料現有生態，同時你培育新的，大幅加快推進速度。`,
    tip_ja: `グロウで効率よく世界を進める鍵は、各常世バイオームに「完成閾値」があることを理解することです——最も希少なリソースを産出する前に必要な最低限の生物多様性要件です。現在のバイオームを完成させる前に急いで新しいバイオームを育てると、後期の錬金レシピに必要な触媒が不足します。次に移る前に各バイオームを徹底的に探索してください。隠しアイテムが独自のSheth建築タイプをアンロックすることが多く、そうしないと発見するまでずっと時間がかかります。街づくりでは、装飾的な建物より先に常世の種の容量を増やす建物を優先しましょう——栽培スロットの増加が中盤のボトルネックです。協力モードでは2人目のプレイヤーが既存のバイオームを管理しながらあなたが新しいバイオームを育てることができ、進行が大幅に加速します。`,
    tip_ko: `그로우에서 효율적으로 세계를 진행하는 핵심은 각 알웨이스월드 생태계에 '완성 임계값'이 있다는 것을 이해하는 것입니다 — 가장 희귀한 자원을 생산하기 전에 필요한 최소 생물다양성 요건. 현재 생태계를 완성하기 전에 서둘러 더 많은 생태계를 키우면 후반 연금술 레시피에 필요한 촉매가 부족해집니다. 다음으로 이동하기 전에 각 생태계를 철저히 탐험하세요. 숨겨진 아이템이 독특한 Sheth 건물 유형을 해제하는 경우가 많아, 그렇지 않으면 발견하기까지 훨씬 오래 걸립니다. 마을 건설에서는 장식적인 건물보다 알웨이스월드 씨앗 용량을 늘리는 건물을 먼저 지으세요 — 더 많은 재배 슬롯이 항상 중반의 병목입니다. 협동 모드에서는 두 번째 플레이어가 기존 생태계를 관리하면서 당신이 새로운 것을 키울 수 있어 진행이 크게 빨라집니다.`,
    tip_de: `Der Schlüssel zu effizientem Weltfortschritt in Grow ist das Verständnis, dass jedes Alwaysworld-Biom einen "Abschlussschwellenwert" hat — eine Mindestanforderung an die Biodiversität, bevor es seine seltensten Ressourcen liefert. Zu viele neue Biome zu züchten, bevor du die vorhandenen abgeschlossen hast, hinterlässt dich mit einem Mangel an Katalysatoren für spätere Alchemie-Rezepte. Erkunde jedes Biom gründlich, bevor du weitermachst, denn versteckte Gegenstände darin schalten oft einzigartige Sheth-Gebäudetypen frei. Beim Stadtbau: Priorisiere Strukturen, die deine Alwaysworld-Saat-Kapazität erhöhen, vor dekorativen Strukturen — mehr Kultivierungsslots sind immer der Engpass im Mittelspiel. Im Ko-op-Modus kann ein zweiter Spieler bestehende Biome pflegen, während du neue züchtest, was den Fortschritt deutlich beschleunigt.`,
  },
  farmtogether: {
    title_en: 'Farm Together 2',
    title_zh: 'Farm Together 2',
    title_zhTW: 'Farm Together 2',
    title_ja: 'ファームトゥギャザー2',
    title_ko: '팜 투게더 2',
    title_de: 'Farm Together 2',
    emoji: '🌻',
    tag_en: 'The Co-op Farmer',
    tag_zh: '合作农耕搭档',
    tag_zhTW: '合作農耕夥伴',
    tag_ja: '協力プレイの農家',
    tag_ko: '협동 농부',
    tag_de: 'Der Koop-Bauer',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    platform_zhTW: 'PC · Nintendo Switch',
    platform_ja: 'PC · Nintendo Switch',
    platform_ko: 'PC · Nintendo Switch',
    platform_de: 'PC · Nintendo Switch',
    why_en: `Farm Together 2 is the farming game that answers a surprisingly underserved question: what if the entire game — every mechanic, every design decision, every system — was built specifically around the experience of farming with someone else? The original Farm Together was beloved for exactly this reason, and Farm Together 2 refines and expands the formula significantly. The core loop is pure farming management: plant crops, water them, harvest at maturity, sell for gold, reinvest in expansions and decorations. But the key differentiators are in how the multiplayer is structured: your farm exists and produces even when you are offline, friends can visit and help tend your farm without needing an invitation at the moment you want to play, and there is no conflict-driven mechanics to make co-op stressful. You can have multiple farms on different servers, each with a different group of friends. There is no combat whatsoever, no crop failure, no seasonal pressure, and no leaderboard. Farm Together 2 is designed as an enduring social experience rather than a game with a defined endpoint — the farm grows as long as you and your friends enjoy tending it. For players who play games primarily to maintain a shared space with someone they care about — a long-distance friend, a partner, a sibling — Farm Together 2 is one of the most thoughtfully designed social farming experiences available.`,
    why_zh: `《Farm Together 2》回答了一个出乎意料地服务不足的问题：如果整款游戏——每一个机制、每一个设计决策、每一个系统——都专门围绕与他人一起农耕的体验而建造，会是什么感觉？核心循环是纯粹的农场管理：种植作物、浇水、成熟时收割、出售黄金、再投资于扩张和装饰。关键区别在于多人游戏的结构方式：即使你离线，你的农场也在生产；朋友可以在任何时候来帮你照料农场，不需要即时邀请；没有让合作变得紧张的冲突驱动机制。没有战斗、没有作物失败、没有季节压力、没有排行榜。《Farm Together 2》被设计为持久的社交体验，而不是有明确终点的游戏——只要你和朋友享受照料它，农场就一直成长。`,
    why_zhTW: `《Farm Together 2》回答了一個出乎意料地服務不足的問題：如果整款遊戲——每一個機制、每一個設計決策、每一個系統——都專門圍繞與他人一起農耕的體驗而建造，會是什麼感覺？核心循環是純粹的農場管理：種植作物、澆水、成熟時收割、出售黃金、再投資於擴張和裝飾。關鍵區別在於多人遊戲的結構方式：即使你離線，你的農場也在生產；朋友可以在任何時候來幫你照料農場，不需要即時邀請；沒有讓合作變得緊張的衝突驅動機制。沒有戰鬥、沒有作物失敗、沒有季節壓力、沒有排行榜。《Farm Together 2》被設計為持久的社交體驗，而不是有明確終點的遊戲——只要你和朋友享受照料它，農場就一直成長。`,
    why_ja: `『ファームトゥギャザー2』は、意外と満たされていなかった問いに答えるゲームです：もしゲーム全体——すべてのメカニクス、すべての設計判断、すべてのシステム——が誰かと一緒に農業をする体験のために作られたら？コアループはシンプルな農場管理：作物を植え、水をやり、収穫して、売って、拡張と装飾に再投資する。でも決定的な違いは協力プレイの構造にあります：あなたがオフラインの間も農場は生産し続け、友達はいつでも手伝いに来られる（招待不要）、そして協力が緊張するような対立的なメカニクスは一切ない。戦闘なし、作物失敗なし、季節プレッシャーなし、ランキングなし。終わりのある普通のゲームではなく、あなたと友達が世話をし続ける限り成長し続ける農場。遠距離の友人、パートナー、きょうだいと共有する空間として——これ以上のゲームはなかなか見つからないかもしれない。`,
    why_ko: `『팜 투게더 2』는 놀랍도록 충족되지 않았던 질문에 답하는 게임입니다: 게임 전체 — 모든 메카닉, 모든 설계 결정, 모든 시스템 — 이 다른 사람과 함께 농사짓는 경험을 중심으로 만들어진다면 어떨까요? 핵심 루프는 순수한 농장 관리: 작물 심기, 물주기, 수확, 판매, 확장과 장식에 재투자. 하지만 핵심 차별점은 멀티플레이어 구조에 있습니다: 오프라인 중에도 농장은 생산되고, 친구는 언제든지 초대 없이 도움을 줄 수 있으며, 협동을 긴장하게 만드는 갈등 메카닉이 없습니다. 전투 없음, 작물 실패 없음, 계절 압박 없음, 리더보드 없음. 『팜 투게더 2』는 명확한 종료 지점이 있는 게임이 아닌 지속적인 소셜 경험으로 설계되었습니다 — 당신과 친구들이 돌보는 한 농장은 계속 성장합니다. 소중한 누군가와 공유 공간을 유지하기 위해 게임을 하는 플레이어에게 최고의 선택입니다.`,
    why_de: `Farm Together 2 beantwortet eine überraschend unterversorgte Frage: Was wäre, wenn das gesamte Spiel — jeder Mechanismus, jede Designentscheidung, jedes System — speziell um das Erlebnis des gemeinsamen Farmens mit jemandem herum gebaut wäre? Der Kernloop ist reines Farmmanagement: Pflanzen, wässern, bei Reife ernten, für Gold verkaufen, in Erweiterungen und Dekorationen reinvestieren. Aber die entscheidenden Unterschiede liegen in der Multiplayer-Struktur: Deine Farm produziert auch wenn du offline bist, Freunde können jederzeit helfen ohne Echtzeit-Einladung, und es gibt keine konfliktgetriebenen Mechanismen, die Co-op stressig machen. Kein Kampf, kein Ernteverlust, kein Saisondruck, keine Ranglisten. Farm Together 2 ist als dauerhaftes soziales Erlebnis konzipiert, nicht als Spiel mit einem definierten Endpunkt — die Farm wächst, solange du und deine Freunde Spaß am Pflegen haben. Für Spieler, die Spiele hauptsächlich spielen, um mit jemandem einen gemeinsamen Raum zu pflegen, ist Farm Together 2 eine der durchdachtesten sozialen Farm-Erfahrungen überhaupt.`,
    tip_en: `Farm Together 2 rewards consistent casual sessions over occasional long marathons. Ten minutes of watering and harvesting every day keeps your farm productive and maintains the social rhythm with friends who tend it alongside you. Set up an offline production line before you log out: place crops with staggered harvest times so that something is always ready to collect when you return, even after a long absence. The decoration system has more depth than it first appears — unlocking aesthetic themes through progression opens up dramatically different visual styles for your farm layout. If you play with friends across time zones, designate different farm sections for different players so each person has a space that reflects their own style within the shared world.`,
    tip_zh: `《Farm Together 2》奖励持续的轻度游戏时段，而不是偶尔的长时间游玩。每天十分钟的浇水和收割能保持农场高效运转，并与一起照料它的朋友维持社交节奏。登出前建立离线生产线：种植收割时间错开的作物，这样当你回来时——即使是长时间离开后——总有东西等着收割。装饰系统比初看起来更有深度——通过进度解锁的美学主题为你的农场布局打开截然不同的视觉风格。如果和跨时区的朋友一起玩，为不同玩家划定不同的农场区域，这样每个人在共享世界中都有一个反映自己风格的空间。`,
    tip_zhTW: `《Farm Together 2》獎勵持續的輕度遊戲時段，而不是偶爾的長時間遊玩。每天十分鐘的澆水和收割能保持農場高效運轉，並與一起照料它的朋友維持社交節奏。登出前建立離線生產線：種植收割時間錯開的作物，這樣當你回來時——即使是長時間離開後——總有東西等著收割。裝飾系統比初看起來更有深度——通過進度解鎖的美學主題為你的農場佈局打開截然不同的視覺風格。如果和跨時區的朋友一起玩，為不同玩家劃定不同的農場區域，這樣每個人在共享世界中都有一個反映自己風格的空間。`,
    tip_ja: `ファームトゥギャザー2は、たまの長時間プレイより、毎日短いセッションを続ける方が報われます。毎日10分の水やりと収穫が農場の生産性を保ち、一緒に手入れしてくれる友達との社交リズムも維持できます。ログアウト前にオフライン生産ラインを整えて：収穫タイミングをずらした作物を植えておくと、戻ってきた時（長い不在の後でも）常に何か収穫できるものがあります。装飾システムは見た目以上に深い——進行でアンロックされる美学テーマが農場レイアウトに全く異なるビジュアルスタイルをもたらします。タイムゾーンをまたいだ友達と遊ぶなら、プレイヤーごとに農場の区画を決めて、共有ワールドの中でそれぞれが自分のスタイルを表現できる空間を作りましょう。`,
    tip_ko: `『팜 투게더 2』는 가끔 하는 장시간 플레이보다 꾸준한 가벼운 세션에 보상을 줍니다. 매일 10분의 물주기와 수확이 농장의 생산성을 유지하고 함께 돌보는 친구들과의 소셜 리듬도 유지해줍니다. 로그아웃 전에 오프라인 생산 라인을 설정하세요: 수확 시간이 엇갈린 작물을 심어두면 돌아왔을 때 — 오랜 부재 후에도 — 항상 수확할 것이 있습니다. 장식 시스템은 처음 보이는 것보다 훨씬 깊습니다 — 진행을 통해 해제되는 미적 테마가 농장 레이아웃에 완전히 다른 비주얼 스타일을 열어줍니다. 시간대가 다른 친구들과 플레이한다면, 플레이어별로 농장 구역을 지정해 공유 세계 안에서 각자의 스타일을 반영하는 공간을 만드세요.`,
    tip_de: `Farm Together 2 belohnt konsistente Kurzsessionen mehr als gelegentliche lange Marathons. Zehn Minuten tägliches Wässern und Ernten halten deine Farm produktiv und pflegen den sozialen Rhythmus mit Freunden, die sie mit dir hegen. Richte vor dem Ausloggen eine Offline-Produktionslinie ein: Pflanze Pflanzen mit gestaffelten Erntezeiten, damit immer etwas bereit ist, wenn du zurückkommst — auch nach langer Abwesenheit. Das Dekorationssystem hat mehr Tiefe als es zunächst scheint — durch Fortschritt freigeschaltete ästhetische Themes öffnen dramatisch unterschiedliche visuelle Stile für dein Farm-Layout. Wenn du mit Freunden in verschiedenen Zeitzonen spielst, weise verschiedenen Spielern unterschiedliche Farmabschnitte zu, damit jede Person einen Bereich hat, der ihren eigenen Stil in der gemeinsamen Welt widerspiegelt.`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { echoes: 0, sugardew: 0, grow: 0, farmtogether: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function NewWaveFarmQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const isZh = locale === 'zh' || locale === 'zh-TW'

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Pick[]>([])
  const [result, setResult] = useState<Pick | null>(null)

  const handleAnswer = (type: Pick) => {
    const next = [...answers, type]
    if (current + 1 < QUESTIONS.length) {
      setAnswers(next)
      setCurrent(current + 1)
    } else {
      setResult(calcResult(next))
    }
  }

  const reset = () => {
    setCurrent(0)
    setAnswers([])
    setResult(null)
  }

  const q = QUESTIONS[current]

  if (result) {
    const r = RESULTS[result]
    const shareText = getLoc(
      `我的新浪潮农场游戏推荐是《${r.title_zh}》！${r.emoji} 来测测你的结果？${BASE_URL}/zh/quizzes/new-wave-farm-quiz`,
      `My new-wave farming match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/new-wave-farm-quiz`,
      `我的新浪潮農場遊戲推薦是《${r.title_zhTW}》！${r.emoji} 來測測你的結果？${BASE_URL}/zh-TW/quizzes/new-wave-farm-quiz`,
      `私の新波農場ゲームは${r.title_ja}！${r.emoji} あなたは？${BASE_URL}/ja/quizzes/new-wave-farm-quiz`,
      `내 뉴웨이브 농장 게임 추천은 ${r.title_ko}！${r.emoji} 당신은？${BASE_URL}/ko/quizzes/new-wave-farm-quiz`,
      `Mein New-Wave-Farmspiel ist ${r.title_de}！${r.emoji} Welches ist deins？${BASE_URL}/de/quizzes/new-wave-farm-quiz`,
    )

    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{r.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {getLoc(r.tag_zh, r.tag_en, r.tag_zhTW, r.tag_ja, r.tag_ko, r.tag_de)}
          </p>
          <h2 className="mb-2 text-2xl font-bold text-[#f0a832]">
            {getLoc(r.title_zh, r.title_en, r.title_zhTW, r.title_ja, r.title_ko, r.title_de)}
          </h2>
          <p className="text-sm text-[#8a9a7a]">
            {getLoc(r.platform_zh, r.platform_en, r.platform_zhTW, r.platform_ja, r.platform_ko, r.platform_de)}
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-[#1a2e1a]/60 p-5 text-[#e8dcc8]">
          <p className="mb-4 leading-relaxed">
            {getLoc(r.why_zh, r.why_en, r.why_zhTW, r.why_ja, r.why_ko, r.why_de)}
          </p>
          <div className="border-t border-[#2d3d2d] pt-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {getLoc('游玩建议', 'Pro Tip', '遊玩建議', 'プレイのヒント', '플레이 팁', 'Spieltipp')}
            </p>
            <p className="text-sm leading-relaxed text-[#c8bca8]">
              {getLoc(r.tip_zh, r.tip_en, r.tip_zhTW, r.tip_ja, r.tip_ko, r.tip_de)}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <ShareButton text={shareText} locale={locale} />
        </div>

        <div className="mb-6 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a]/40 p-4 text-center">
          <p className="text-sm text-[#e8dcc8]">
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

        <button
          onClick={reset}
          className="w-full rounded-xl border border-[#2d3d2d] py-2.5 text-sm text-[#8a9a7a] transition-colors hover:border-[#4d5d4d] hover:text-[#e8dcc8]"
        >
          {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やる', '다시 테스트하기', 'Nochmal machen')}
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs text-[#8a9a7a]">
          <span>
            {isZh
              ? `第 ${current + 1} / ${QUESTIONS.length} 题`
              : getLoc(
                  `第 ${current + 1} / ${QUESTIONS.length} 题`,
                  `Question ${current + 1} of ${QUESTIONS.length}`,
                  `第 ${current + 1} / ${QUESTIONS.length} 題`,
                  `質問 ${current + 1} / ${QUESTIONS.length}`,
                  `질문 ${current + 1} / ${QUESTIONS.length}`,
                  `Frage ${current + 1} von ${QUESTIONS.length}`,
                )}
          </span>
          <div className="flex gap-1">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i < current ? 'bg-[#f0a832]' : i === current ? 'bg-[#f0a832]/60' : 'bg-[#2d3d2d]'
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-[#e8dcc8]">
          {getLoc(q.q_zh, q.q_en, q.q_zhTW, q.q_ja, q.q_ko, q.q_de)}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.type)}
            className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 px-4 py-3 text-left text-sm text-[#e8dcc8] transition-all hover:border-[#f0a832]/40 hover:bg-[#1a2e1a] hover:text-[#f0a832]"
          >
            {getLoc(opt.zh, opt.en, opt.zhTW, opt.ja, opt.ko, opt.de)}
          </button>
        ))}
      </div>
    </div>
  )
}
