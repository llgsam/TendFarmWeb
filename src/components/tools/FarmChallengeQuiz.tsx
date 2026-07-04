'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'rune-factory' | 'portia' | 'yonder' | 'farming-sim'

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
    q_en: 'When you think of a perfect gaming session, which feeling matters most to you?',
    q_zh: '想到完美的一次游戏体验，哪种感受对你最重要？',
    q_zhTW: '想到完美的一次遊戲體驗，哪種感受對你最重要？',
    q_ja: '完璧なゲーム体験を思い浮かべたとき、一番大切な感覚はどれですか？',
    q_ko: '완벽한 게임 세션을 떠올릴 때, 가장 중요한 감각은 무엇인가요?',
    q_de: 'Wenn du an die perfekte Gaming-Session denkst — welches Gefühl ist dir am wichtigsten?',
    options: [
      {
        en: 'Triumph — defeating a boss I struggled with and earning it',
        zh: '胜利感——击败我挣扎过的Boss，凭实力赢得的那种',
        zhTW: '勝利感——擊敗我掙扎過的Boss，憑實力贏得的那種',
        ja: '達成感――苦戦したボスを実力で倒した瞬間の充実感',
        ko: '성취감 — 힘들게 도전했던 보스를 실력으로 쓰러뜨렸을 때의 쾌감',
        de: 'Triumph — einen Boss besiegen, mit dem ich gekämpft habe, und es wirklich verdient haben',
        type: 'rune-factory',
      },
      {
        en: 'Progress — watching my town or workshop grow through my specific choices',
        zh: '进展感——看着我的小镇或工作室因我的具体选择而成长',
        zhTW: '進展感——看著我的小鎮或工作室因我的具體選擇而成長',
        ja: '成長感――自分の選択で町やアトリエが育っていくのを見る喜び',
        ko: '성장감 — 내 선택으로 마을이나 공방이 발전해 가는 모습을 보는 기쁨',
        de: 'Fortschritt — zusehen, wie meine Stadt oder Werkstatt durch meine Entscheidungen wächst',
        type: 'portia',
      },
      {
        en: 'Freedom — exploring without any pressure, deadline, or threat',
        zh: '自由感——没有任何压力、期限或威胁地探索',
        zhTW: '自由感——沒有任何壓力、期限或威脅地探索',
        ja: '自由感――プレッシャーも締め切りも脅威もなく自分のペースで探索できること',
        ko: '자유감 — 어떤 압박이나 마감, 위협 없이 내 페이스대로 탐험할 수 있는 것',
        de: 'Freiheit — erkunden ohne Druck, Fristen oder Bedrohungen',
        type: 'yonder',
      },
      {
        en: 'Mastery — understanding real systems deeply and running them efficiently',
        zh: '掌握感——深入理解真实系统并高效运转它们',
        zhTW: '掌握感——深入理解真實系統並高效運轉它們',
        ja: '習熟感――リアルなシステムを深く理解して効率よく回せること',
        ko: '숙달감 — 실제 시스템을 깊이 이해하고 효율적으로 운영하는 것',
        de: 'Meisterschaft — echte Systeme tief verstehen und sie effizient betreiben',
        type: 'farming-sim',
      },
    ],
  },
  {
    q_en: 'How do you feel about combat or conflict in farming games?',
    q_zh: '你对农场游戏中的战斗或冲突感觉如何？',
    q_zhTW: '你對農場遊戲中的戰鬥或衝突感覺如何？',
    q_ja: 'ファーミングゲームでの戦闘や対立、どう思いますか？',
    q_ko: '파밍 게임에서 전투나 갈등 요소는 어떻게 생각하세요?',
    q_de: 'Wie stehst du zu Kämpfen oder Konflikten in Farming-Spielen?',
    options: [
      {
        en: 'I love it — combat adds real stakes and makes the cozy parts feel earned',
        zh: '我喜欢——战斗增加了真实的风险，让温馨部分更有成就感',
        zhTW: '我喜歡——戰鬥增加了真實的風險，讓溫馨部分更有成就感',
        ja: '大好き――戦闘があるからこそ、のんびり要素が引き立つ',
        ko: '좋아요 — 전투가 있어야 아늑한 요소가 더 값지게 느껴져요',
        de: 'Ich liebe es — Kämpfe machen die gemütlichen Momente erst wirklich wertvoll',
        type: 'rune-factory',
      },
      {
        en: 'Some is fine — light conflict or competition adds drive without stress',
        zh: '一点点可以——轻微的冲突或竞争增加动力但不带来压力',
        zhTW: '一點點可以——輕微的衝突或競爭增加動力但不帶來壓力',
        ja: '少しならOK――軽い競争要素があると適度な緊張感になる',
        ko: '조금은 괜찮아요 — 가벼운 경쟁 요소가 동기부여가 돼요',
        de: 'Ein bisschen ist okay — leichte Konflikte geben mir Antrieb ohne Stress',
        type: 'portia',
      },
      {
        en: 'Hard pass — I want zero enemies and zero threat in my farming game',
        zh: '完全不要——我想要农场游戏里零敌人、零威胁',
        zhTW: '完全不要——我想要農場遊戲裡零敵人、零威脅',
        ja: 'いらない――敵ゼロ、脅威ゼロの農場ゲームがしたい',
        ko: '완전 싫어요 — 적도 위협도 없는 농장 게임을 원해요',
        de: 'Keine Chance — ich will null Feinde und null Bedrohung in meinem Farming-Spiel',
        type: 'yonder',
      },
      {
        en: 'Not interested — I want technical complexity over narrative conflict',
        zh: '不感兴趣——我想要技术复杂性，而不是叙事冲突',
        zhTW: '不感興趣——我想要技術複雜性，而不是敘事衝突',
        ja: '興味なし――ストーリーの対立より技術的な複雑さがほしい',
        ko: '관심 없어요 — 서사적 갈등보다 기술적 복잡성을 원해요',
        de: 'Kein Interesse — ich will technische Komplexität statt Erzählkonflikte',
        type: 'farming-sim',
      },
    ],
  },
  {
    q_en: 'Which of these sounds most appealing to you as a core game activity?',
    q_zh: '以下哪个作为核心游戏活动最吸引你？',
    q_zhTW: '以下哪個作為核心遊戲活動最吸引你？',
    q_ja: 'メインのゲーム活動として一番惹かれるのはどれですか？',
    q_ko: '핵심 게임 활동으로 가장 끌리는 것은?',
    q_de: 'Welche Aktivität würde dich als Kern des Spiels am meisten ansprechen?',
    options: [
      {
        en: 'Exploring dungeons, leveling skills, and romancing characters with rich backstories',
        zh: '探索地下城、提升技能，以及与有丰富背景故事的角色恋爱',
        zhTW: '探索地下城、提升技能，以及與有豐富背景故事的角色戀愛',
        ja: 'ダンジョン探索・スキル強化・個性豊かなキャラとの恋愛',
        ko: '던전 탐험, 스킬 성장, 풍부한 배경의 캐릭터와의 로맨스',
        de: 'Dungeons erkunden, Skills leveln und Charaktere mit reichhaltiger Hintergrundgeschichte romancen',
        type: 'rune-factory',
      },
      {
        en: 'Building machines and workshops, filling commissions, restoring a ruined city',
        zh: '建造机器和工坊、接完成委托、修复废墟城市',
        zhTW: '建造機器和工坊、接完成委託、修復廢墟城市',
        ja: '機械や工房を作り、依頼をこなして廃墟の街を復興させる',
        ko: '기계와 공방을 만들고, 의뢰를 완수해 폐허 도시를 재건하기',
        de: 'Maschinen und Werkstätten bauen, Aufträge erfüllen und eine Ruinenstadt wiederaufbauen',
        type: 'portia',
      },
      {
        en: 'Walking through gorgeous nature, crafting, and solving gentle environmental puzzles',
        zh: '漫步在绝美的自然中、制作手工品、解决温和的环境谜题',
        zhTW: '漫步在絕美的自然中、製作手工品、解決溫和的環境謎題',
        ja: '美しい自然の中を散歩して、クラフトや穏やかな謎解きを楽しむ',
        ko: '아름다운 자연을 걸으며 크래프팅과 평화로운 퍼즐 즐기기',
        de: 'Durch atemberaubende Natur schlendern, Dinge craften und sanfte Umwelträtsel lösen',
        type: 'yonder',
      },
      {
        en: 'Operating authentic agricultural machinery, managing crop cycles and logistics',
        zh: '操作真实的农业机械、管理作物周期和物流',
        zhTW: '操作真實的農業機械、管理作物週期和物流',
        ja: '本物の農業機械を操作して、作物サイクルと流通を管理する',
        ko: '실제 농업 기계를 조작하고 작물 사이클과 물류 관리하기',
        de: 'Echte Landmaschinen bedienen und Erntezyklen sowie Logistik managen',
        type: 'farming-sim',
      },
    ],
  },
  {
    q_en: 'How much time pressure do you want in your game?',
    q_zh: '你想要游戏中有多少时间压力？',
    q_zhTW: '你想要遊戲中有多少時間壓力？',
    q_ja: 'ゲームにどれくらい時間的プレッシャーを求めますか？',
    q_ko: '게임에서 얼마나 많은 시간 압박을 원하시나요?',
    q_de: 'Wie viel Zeitdruck möchtest du in deinem Spiel?',
    options: [
      {
        en: 'Moderate — seasonal deadlines and event timers add excitement',
        zh: '适中——季节性期限和活动计时器增加了兴奋感',
        zhTW: '適中——季節性期限和活動計時器增加了興奮感',
        ja: '程よくほしい――季節の締め切りやイベントタイマーがあると燃える',
        ko: '적당히 — 계절 마감이나 이벤트 타이머가 있으면 더 재미있어요',
        de: 'Moderat — saisonale Fristen und Event-Timer sorgen für Spannung',
        type: 'rune-factory',
      },
      {
        en: 'Some — loose timed commissions give me direction without stress',
        zh: '一点点——宽松的限时委托给了我方向但没有压力',
        zhTW: '一點點——寬鬆的限時委託給了我方向但沒有壓力',
        ja: '少しだけ――ゆるい期限付き依頼があると方向性が出てちょうどいい',
        ko: '조금만 — 느슨한 기한 의뢰가 방향을 잡아줘서 좋아요',
        de: 'Etwas — lockere Auftragsfristen geben mir Orientierung ohne Stress',
        type: 'portia',
      },
      {
        en: 'None at all — I want to move at exactly my own pace, always',
        zh: '完全没有——我想始终按照自己的节奏移动',
        zhTW: '完全沒有——我想始終按照自己的節奏移動',
        ja: 'まったくいらない――常に自分のペースで進めたい',
        ko: '전혀 없이 — 항상 내 페이스로 즐기고 싶어요',
        de: 'Gar keinen — ich will immer in meinem eigenen Tempo spielen',
        type: 'yonder',
      },
      {
        en: 'None for story, high for self-imposed efficiency goals',
        zh: '故事上没有，但有自我设定的效率目标时很高',
        zhTW: '故事上沒有，但有自我設定的效率目標時很高',
        ja: 'ストーリー的にはゼロ、でも自分で設定した効率目標は追いかけたい',
        ko: '스토리에는 없고, 스스로 설정한 효율 목표는 높게',
        de: 'Keinen für die Story, aber hohe selbst gesetzte Effizienz-Ziele',
        type: 'farming-sim',
      },
    ],
  },
  {
    q_en: 'What is your relationship with learning complex game systems?',
    q_zh: '你与学习复杂游戏系统的关系如何？',
    q_zhTW: '你與學習複雜遊戲系統的關係如何？',
    q_ja: '複雑なゲームシステムを覚えることについて、どう感じますか？',
    q_ko: '복잡한 게임 시스템을 배우는 것에 대해 어떻게 생각하세요?',
    q_de: 'Wie gehst du mit komplexen Spielsystemen um?',
    options: [
      {
        en: "I enjoy it as long as the systems serve the fantasy — crafting weapons for battles I care about",
        zh: '我享受它，只要系统服务于幻想——为我在乎的战斗制造武器',
        zhTW: '我享受它，只要系統服務於幻想——為我在乎的戰鬥製造武器',
        ja: '楽しめる――戦闘のために武器を作るなど、世界観に合っていれば好き',
        ko: '즐길 수 있어요 — 세계관에 맞는 시스템이면 오히려 재미있어요',
        de: 'Ich genieße es, solange die Systeme zur Fantasie passen — Waffen für Kämpfe schmieden, die mir wichtig sind',
        type: 'rune-factory',
      },
      {
        en: "I like moderate complexity — enough to feel smart, not so much I need a spreadsheet",
        zh: '我喜欢适度的复杂性——足以让我感到聪明，但不需要电子表格',
        zhTW: '我喜歡適度的複雜性——足以讓我感到聰明，但不需要電子試算表',
        ja: '適度な複雑さが好き――頭を使うけどスプレッドシートは不要なレベルで',
        ko: '적당한 복잡성이 좋아요 — 머리는 쓰지만 스프레드시트는 필요 없는 수준',
        de: 'Ich mag moderate Komplexität — genug um mich clever zu fühlen, aber kein Tabellenkalkulationsniveau',
        type: 'portia',
      },
      {
        en: "I actively dislike complexity — I want discovery, not systems management",
        zh: '我积极地不喜欢复杂性——我想要探索，而不是系统管理',
        zhTW: '我積極地不喜歡複雜性——我想要探索，而不是系統管理',
        ja: '苦手――システム管理より探索や発見を楽しみたい',
        ko: '복잡한 건 싫어요 — 시스템 관리보다 탐험과 발견을 즐기고 싶어요',
        de: 'Ich mag Komplexität nicht — ich will Entdeckungen, kein Systemmanagement',
        type: 'yonder',
      },
      {
        en: "The more realistic and complex the better — I read the full manual before playing",
        zh: '越逼真越复杂越好——我在玩之前会阅读完整的手册',
        zhTW: '越逼真越複雜越好——我在玩之前會閱讀完整的說明書',
        ja: '複雑で現実的なほどいい――プレイ前にマニュアルを全部読むタイプ',
        ko: '복잡하고 현실적일수록 좋아요 — 플레이 전에 매뉴얼을 다 읽는 편이에요',
        de: 'Je realistischer und komplexer, desto besser — ich lese die komplette Anleitung vor dem Spielen',
        type: 'farming-sim',
      },
    ],
  },
  {
    q_en: 'Pick the gaming experience that sounds most like you.',
    q_zh: '选出听起来最像你的游戏体验。',
    q_zhTW: '選出聽起來最像你的遊戲體驗。',
    q_ja: '一番自分に近いゲーム体験を選んでください。',
    q_ko: '가장 나에게 가까운 게임 경험을 골라주세요.',
    q_de: 'Welche Gaming-Erfahrung klingt am meisten nach dir?',
    options: [
      {
        en: "After 100 hours I'm still finding new mechanics and relationships — I love depth",
        zh: '玩了100小时我仍在发现新机制和关系——我热爱深度',
        zhTW: '玩了100小時我仍在發現新機制和關係——我熱愛深度',
        ja: '100時間プレイしてもまだ新要素を発見できる――深みのあるゲームが好き',
        ko: '100시간 플레이해도 새로운 요소를 발견해요 — 깊이 있는 게임을 좋아해요',
        de: 'Nach 100 Stunden entdecke ich immer noch neue Mechaniken und Beziehungen — ich liebe Tiefgang',
        type: 'rune-factory',
      },
      {
        en: "I want to see a town transform from ruins to thriving because of my work",
        zh: '我想看到一座小镇因我的工作从废墟变成繁荣',
        zhTW: '我想看到一座小鎮因我的工作從廢墟變成繁榮',
        ja: '自分の手で廃墟の街が賑わいを取り戻すのを見届けたい',
        ko: '내 손으로 폐허였던 마을이 번성하는 걸 보고 싶어요',
        de: 'Ich will sehen, wie eine Stadt dank meiner Arbeit aus Ruinen erblüht',
        type: 'portia',
      },
      {
        en: "I want the game world to feel like a place I genuinely want to live in",
        zh: '我想让游戏世界感觉像我真正想居住的地方',
        zhTW: '我想讓遊戲世界感覺像我真正想居住的地方',
        ja: '本当に住んでみたいと思えるゲームの世界に浸りたい',
        ko: '진짜 살고 싶은 게임 세계에 빠져들고 싶어요',
        de: 'Ich will, dass sich die Spielwelt wie ein Ort anfühlt, an dem ich wirklich leben möchte',
        type: 'yonder',
      },
      {
        en: "I watch real farming content on YouTube and want that authenticity in a game",
        zh: '我在 YouTube 上观看真实农业内容，想要游戏中的那种真实感',
        zhTW: '我在 YouTube 上觀看真實農業內容，想要遊戲中的那種真實感',
        ja: 'YouTubeで農業動画を観る――ゲームでもその本物感がほしい',
        ko: '유튜브에서 실제 농업 영상을 보는데, 게임에서도 그 리얼함을 원해요',
        de: 'Ich schaue mir echte Landwirtschafts-Content auf YouTube an und will diese Authentizität im Spiel',
        type: 'farming-sim',
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
    start_en: string
    start_zh: string
    start_zhTW: string
    start_ja: string
    start_ko: string
    start_de: string
  }
> = {
  'rune-factory': {
    title_en: 'Rune Factory 4 Archival Edition / Rune Factory 5',
    title_zh: '牧场物语 4 典藏版 / 牧场物语 5',
    title_zhTW: '牧場物語 4 典藏版 / 牧場物語 5',
    title_ja: 'ルーンファクトリー4 スペシャル / ルーンファクトリー5',
    title_ko: '룬 팩토리 4 스페셜 / 룬 팩토리 5',
    title_de: 'Rune Factory 4 Archival Edition / Rune Factory 5',
    emoji: '⚔️',
    tag_en: 'Action RPG farming — combat, dungeons, romance, and deep character systems',
    tag_zh: '动作 RPG 农场——战斗、地下城、恋爱，以及深度角色系统',
    tag_zhTW: '動作 RPG 農場——戰鬥、地下城、戀愛，以及深度角色系統',
    tag_ja: 'アクションRPG農場ゲーム――戦闘・ダンジョン・恋愛・深みあるキャラクターシステム',
    tag_ko: '액션 RPG 농장 게임 — 전투·던전·로맨스·깊이 있는 캐릭터 시스템',
    tag_de: 'Action-RPG-Farming — Kämpfe, Dungeons, Romantik und tiefe Charaktersysteme',
    platform_en: 'Rune Factory 4: Nintendo Switch, PC (Steam). Rune Factory 5: Nintendo Switch, PC',
    platform_zh: 'RF4：Nintendo Switch、PC（Steam）。RF5：Nintendo Switch、PC',
    platform_zhTW: 'RF4：Nintendo Switch、PC（Steam）。RF5：Nintendo Switch、PC',
    platform_ja: 'RF4：Nintendo Switch、PC（Steam）。RF5：Nintendo Switch、PC',
    platform_ko: 'RF4: 닌텐도 스위치, PC(Steam). RF5: 닌텐도 스위치, PC',
    platform_de: 'RF4: Nintendo Switch, PC (Steam). RF5: Nintendo Switch, PC',
    why_en:
      "Rune Factory is the farming game series for you — it combines real action RPG combat with full farming, cooking, crafting, and romance systems. In Rune Factory 4 (the better-reviewed of the two), you battle monsters in multi-floor dungeons to earn materials, then bring those materials back to your farm and town. The romance options are numerous and each has a genuinely interesting arc. Boss fights require real strategy and gear preparation — farming better equipment matters. Rune Factory is often described as 'what Stardew Valley would be if it had Dark Souls lite dungeons'; it rewards players who want the cozy farming experience alongside real challenge and deep RPG progression.",
    why_zh:
      '牧场物语是最适合你的农场游戏系列——它将真实的动作 RPG 战斗与完整的农业、烹饪、制作和恋爱系统相结合。在牧场物语 4（两款中评价更高的一款）中，你在多层地下城与怪物战斗获得材料，然后将这些材料带回你的农场和小镇。恋爱选项众多，每位角色都有真正有趣的弧线。Boss 战需要真正的策略和装备准备——耕种更好的装备很重要。牧场物语经常被描述为"如果星露谷物语有黑暗之魂轻量版地下城会怎样"；它奖励那些想要温馨农场体验同时有真实挑战和深度 RPG 进度的玩家。',
    why_zhTW:
      '牧場物語是最適合你的農場遊戲系列——它將真實的動作 RPG 戰鬥與完整的農業、烹飪、製作和戀愛系統相結合。在牧場物語 4（兩款中評價更高的一款）中，你在多層地下城與怪物戰鬥獲得材料，然後將這些材料帶回你的農場和小鎮。戀愛選項眾多，每位角色都有真正有趣的弧線。Boss 戰需要真正的策略和裝備準備——耕種更好的裝備很重要。牧場物語經常被描述為「如果星露谷物語有黑魂輕量版地下城會怎樣」；它獎勵那些想要溫馨農場體驗同時有真實挑戰和深度 RPG 進度的玩家。',
    why_ja:
      'ルーンファクトリーはあなたにぴったりの農場ゲームシリーズです。本格的なアクションRPG戦闘と、農業・料理・クラフト・恋愛システムが全部つまっています。特にルーンファクトリー4（2作の中で評価が高い方）では、複数フロアのダンジョンでモンスターを倒して素材を集め、それを農場や街に持ち帰って活かします。恋愛対象は豊富で、それぞれにしっかりしたストーリーがあります。ボス戦は装備と戦略が必要で、農作業でより良い装備を揃えることが実際に活きてきます。「スターデューバレーにソウルライクのダンジョンがあったら」とよく表現されるシリーズで、コージーな農場体験と本格的な挑戦・RPG成長要素を両立したい人にぴったりです。',
    why_ko:
      '룬 팩토리는 여러분에게 딱 맞는 농장 게임 시리즈입니다. 본격적인 액션 RPG 전투와 함께 농업, 요리, 제작, 로맨스 시스템이 모두 들어 있어요. 특히 룬 팩토리 4(두 작품 중 더 높은 평가를 받는 작품)에서는 여러 층의 던전에서 몬스터를 쓰러뜨려 재료를 모으고, 그것을 농장과 마을로 가져와 활용합니다. 로맨스 대상이 다양하고 각 캐릭터마다 흥미로운 스토리가 있어요. 보스전은 장비와 전략이 필요해서, 더 좋은 장비를 위한 농업과 제작이 실제로 의미 있게 연결됩니다. "스타듀 밸리에 소울라이크 던전이 있다면"이라고 자주 표현되는 시리즈로, 아늑한 농장 경험과 도전적인 RPG 성장 요소를 동시에 원하는 분께 완벽합니다.',
    why_de:
      "Rune Factory ist die Farming-Spielserie für dich — sie kombiniert echte Action-RPG-Kämpfe mit vollständigem Farming, Kochen, Craften und Romantiksystemen. In Rune Factory 4 (das besser bewertete der beiden) kämpfst du gegen Monster in mehrstöckigen Dungeons, um Materialien zu erhalten, die du dann auf deine Farm und in deine Stadt mitbringst. Die Romantikoptionen sind zahlreich und jede hat einen wirklich interessanten Handlungsbogen. Bosskämpfe erfordern echte Strategie und Ausrüstungsvorbereitung — besseres Equipment zu farmen zahlt sich aus. Rune Factory wird oft als 'Was wäre, wenn Stardew Valley Souls-lite-Dungeons hätte' beschrieben; es belohnt Spieler, die das gemütliche Farming-Erlebnis gemeinsam mit echter Herausforderung und tiefem RPG-Fortschritt möchten.",
    start_en: 'Start with Rune Factory 4 — it has tighter pacing, better dungeons, and a more charming cast than RF5.',
    start_zh: '从牧场物语 4 开始——它比 RF5 有更紧凑的节奏、更好的地下城和更迷人的角色阵容。',
    start_zhTW: '從牧場物語 4 開始——它比 RF5 有更緊湊的節奏、更好的地下城和更迷人的角色陣容。',
    start_ja: 'まずRF4から始めましょう――RF5よりテンポがよく、ダンジョンの質もキャラクターの魅力も上です。',
    start_ko: 'RF4부터 시작하세요 — RF5보다 템포가 좋고, 던전 퀄리티와 캐릭터 매력 모두 뛰어납니다.',
    start_de: 'Fang mit Rune Factory 4 an — es hat ein strafferes Pacing, bessere Dungeons und einen charmanter Cast als RF5.',
  },
  portia: {
    title_en: 'My Time at Portia',
    title_zh: '波西亚时光',
    title_zhTW: '波西亞時光',
    title_ja: 'マイタイム アット ポーシャ',
    title_ko: '포시아의 시간',
    title_de: 'My Time at Portia',
    emoji: '🔨',
    tag_en: 'City rebuilding + crafting + community — watch a ruin become a town',
    tag_zh: '城市重建 + 制作 + 社区——看废墟变成小镇',
    tag_zhTW: '城市重建 + 製作 + 社群——看廢墟變成小鎮',
    tag_ja: '街の復興＋クラフト＋コミュニティ――廃墟が活気ある街になる過程を楽しむ',
    tag_ko: '도시 재건 + 제작 + 커뮤니티 — 폐허가 마을로 변해가는 과정',
    tag_de: 'Stadtwiederaufbau + Craften + Gemeinschaft — eine Ruine wird zur blühenden Stadt',
    platform_en: 'Available on: Nintendo Switch, PC (Steam), PlayStation 4/5, Xbox',
    platform_zh: '可在以下平台获取：Nintendo Switch、PC（Steam）、PlayStation 4/5、Xbox',
    platform_zhTW: '可在以下平台取得：Nintendo Switch、PC（Steam）、PlayStation 4/5、Xbox',
    platform_ja: '対応プラットフォーム：Nintendo Switch、PC（Steam）、PlayStation 4/5、Xbox',
    platform_ko: '지원 플랫폼: 닌텐도 스위치, PC(Steam), PlayStation 4/5, Xbox',
    platform_de: 'Verfügbar auf: Nintendo Switch, PC (Steam), PlayStation 4/5, Xbox',
    why_en:
      "My Time at Portia is the farming-adjacent game for you — you inherit a workshop in a small post-apocalyptic town and rebuild it by fulfilling commissions from citizens. The focus is less on crops and more on crafting machines, smelting ores, and building increasingly complex structures for the community. You also farm, raise animals, and develop relationships with over 20 fully developed characters. Timed commissions give you soft deadlines that create drive without feeling punishing. The game is set in a post-civilization world where technology is rediscovered, which gives the crafting a genuine sense of wonder and discovery. Its sequel, My Time at Sandrock, has a similar feel in a desert setting.",
    why_zh:
      '波西亚时光是最适合你的类农场游戏——你继承了一个小后世界末日小镇的工坊，通过完成市民的委托来重建它。重点不在作物上，而在于制作机器、冶炼矿石和为社区建造日益复杂的结构。你也种地、养动物，并与 20 多位完整开发的角色建立关系。限时委托给你带来了软性截止日期，创造了驱动力而不感到惩罚。游戏设定在一个重新发现技术的后文明世界，这让制作有了真正的惊奇和发现感。它的续作《沙石镇时光》在沙漠环境中有类似的感觉。',
    why_zhTW:
      '波西亞時光是最適合你的類農場遊戲——你繼承了一個小後世界末日小鎮的工坊，透過完成市民的委託來重建它。重點不在作物上，而在於製作機器、冶煉礦石和為社群建造日益複雜的結構。你也種地、養動物，並與 20 多位完整開發的角色建立關係。限時委託給你帶來了軟性截止日期，創造了驅動力而不感到懲罰。遊戲設定在一個重新發現技術的後文明世界，這讓製作有了真正的驚奇和發現感。它的續作《沙石鎮時光》在沙漠環境中有類似的感覺。',
    why_ja:
      'マイタイム アット ポーシャはあなたに向いている農場系ゲームです。文明崩壊後の小さな街でアトリエを受け継ぎ、住民の依頼をこなしながら街を復興させていきます。作物メインというより、機械を作ったり、鉱石を精錬したり、コミュニティのために複雑な建造物を作ることが中心です。農業や牧畜もあり、20人以上の個性豊かなキャラクターとも交流できます。期限付きの依頼はあくまでゆるやかで、プレッシャーよりも「次にやること」の指針になる感じです。失われた文明の技術を再発見していく設定が、クラフトに本物の驚きと発見の感覚をもたらしてくれます。続編「マイタイム アット サンドロック」も砂漠を舞台に同じ空気感で遊べます。',
    why_ko:
      '포시아의 시간은 여러분에게 딱 맞는 농장 인접 게임입니다. 작은 포스트 아포칼립스 마을의 공방을 물려받아 주민들의 의뢰를 완수하며 마을을 재건해 나갑니다. 핵심은 작물보다 기계 제작, 광석 제련, 커뮤니티를 위한 복잡한 구조물 건설입니다. 농업과 축산도 있고, 20명 이상의 개성 있는 캐릭터와 관계를 쌓을 수 있어요. 기한 있는 의뢰는 어디까지나 느슨해서 압박감보다는 방향성을 잡아주는 느낌입니다. 잃어버린 문명의 기술을 재발견해 가는 세계관이 제작에 진짜 경이로움과 발견의 감각을 더해줘요. 후속작 《샌드록의 시간》도 사막 배경으로 비슷한 분위기를 즐길 수 있습니다.',
    why_de:
      'My Time at Portia ist das Farming-nahe Spiel für dich — du erbst eine Werkstatt in einer kleinen post-apokalyptischen Stadt und baust sie wieder auf, indem du Aufträge der Bürger erfüllst. Der Fokus liegt weniger auf Ernte und mehr auf dem Craften von Maschinen, dem Schmelzen von Erzen und dem Bauen immer komplexerer Strukturen für die Gemeinschaft. Du farmst auch, züchtest Tiere und entwickelst Beziehungen zu über 20 vollständig ausgearbeiteten Charakteren. Zeitlich begrenzte Aufträge geben dir weiche Fristen, die Antrieb schaffen ohne stressig zu sein. Das Spiel ist in einer Post-Zivilisationswelt angesiedelt, in der Technologie wiederentdeckt wird, was dem Craften echtes Staunen und Entdeckerfreude verleiht. Die Fortsetzung My Time at Sandrock hat ein ähnliches Gefühl in einer Wüstenumgebung.',
    start_en: "Accept the main commissions first — they teach you the crafting tree and unlock the materials you need for everything else.",
    start_zh: '先接受主要委托——它们教你制作树并解锁其他所有东西所需的材料。',
    start_zhTW: '先接受主要委託——它們教你製作樹並解鎖其他所有東西所需的材料。',
    start_ja: 'メイン依頼を優先して受けましょう――クラフトツリーを覚えられて、他の全ての作業に必要な素材も解放されます。',
    start_ko: '메인 의뢰를 먼저 받으세요 — 제작 트리를 익히고 다른 모든 작업에 필요한 재료를 해금할 수 있습니다.',
    start_de: 'Nimm zuerst die Hauptaufträge an — sie lehren dich den Crafting-Baum und schalten die Materialien frei, die du für alles andere brauchst.',
  },
  yonder: {
    title_en: 'Yonder: The Cloud Catcher Chronicles',
    title_zh: 'Yonder：云彩捕捉者传说',
    title_zhTW: 'Yonder：雲彩捕捉者傳說',
    title_ja: 'Yonder：クラウドキャッチャー クロニクルズ',
    title_ko: 'Yonder: 구름 포수 연대기',
    title_de: 'Yonder: The Cloud Catcher Chronicles',
    emoji: '🌤️',
    tag_en: 'The most peaceful farming game ever made — zero combat, infinite exploration',
    tag_zh: '有史以来最平静的农场游戏——零战斗，无限探索',
    tag_zhTW: '有史以來最平靜的農場遊戲——零戰鬥，無限探索',
    tag_ja: '史上最も穏やかな農場ゲーム――敵ゼロ、探索無限大',
    tag_ko: '역대 가장 평화로운 농장 게임 — 적 제로, 탐험은 무한대',
    tag_de: 'Das friedlichste Farming-Spiel aller Zeiten — null Kämpfe, unendliche Erkundung',
    platform_en: 'Available on: Nintendo Switch, PC (Steam), PlayStation 4/5',
    platform_zh: '可在以下平台获取：Nintendo Switch、PC（Steam）、PlayStation 4/5',
    platform_zhTW: '可在以下平台取得：Nintendo Switch、PC（Steam）、PlayStation 4/5',
    platform_ja: '対応プラットフォーム：Nintendo Switch、PC（Steam）、PlayStation 4/5',
    platform_ko: '지원 플랫폼: 닌텐도 스위치, PC(Steam), PlayStation 4/5',
    platform_de: 'Verfügbar auf: Nintendo Switch, PC (Steam), PlayStation 4/5',
    why_en:
      "Yonder: The Cloud Catcher Chronicles is the farming game for you if you want zero threat, zero combat, and pure exploration. There are literally no enemies in this game — none. You explore a gorgeous open world island, collect materials, farm, craft, build farms across different biomes, and help the residents of each village with their needs. The game features some of the most beautiful environmental design in the cozy genre, with different biomes ranging from snow-capped mountains to tropical beaches. The main quest involves clearing a corrupting miasma from the land using friendly spirits called Sprites. Yonder never rushes you, never punishes you, and never creates threat. It is the definitive answer to 'I want a Zelda-sized world to explore but without any of the combat.'",
    why_zh:
      'Yonder：云彩捕捉者传说是如果你想要零威胁、零战斗和纯探索的最适合你的农场游戏。这款游戏中字面意义上没有敌人——一个都没有。你探索一个美丽的开放世界岛屿、收集材料、农业、制作、在不同生物群落建造农场，并帮助每个村庄的居民满足他们的需求。该游戏拥有 cozy 类型中最美丽的环境设计之一，生物群落从白雪皑皑的山脉到热带海滩各不相同。主线任务涉及使用被称为精灵的友善生物清除土地上的腐败瘴气。Yonder 从不催促你、从不惩罚你、从不制造威胁。它是"我想要一个塞尔达大小的世界来探索，但没有任何战斗"的终极答案。',
    why_zhTW:
      'Yonder：雲彩捕捉者傳說是如果你想要零威脅、零戰鬥和純探索的最適合你的農場遊戲。這款遊戲中字面意義上沒有敵人——一個都沒有。你探索一個美麗的開放世界島嶼、收集材料、農業、製作、在不同生態群系建造農場，並幫助每個村莊的居民滿足他們的需求。該遊戲擁有 cozy 類型中最美麗的環境設計之一，生態群系從白雪皚皚的山脈到熱帶海灘各不相同。主線任務涉及使用被稱為精靈的友善生物清除土地上的腐敗瘴氣。Yonder 從不催促你、從不懲罰你、從不製造威脅。它是「我想要一個薩爾達大小的世界來探索，但沒有任何戰鬥」的終極答案。',
    why_ja:
      'Yonder：クラウドキャッチャー クロニクルズは、脅威も戦闘も一切求めないあなたにぴったりの農場ゲームです。このゲームには本当に敵が一人も出てきません――ゼロです。広大で美しいオープンワールドの島を探索し、素材を集め、農業・クラフトをして、各バイオームに農場を作り、村人の手助けをします。雪山から熱帯のビーチまで多様なバイオームを持つ環境デザインは、コージーゲームの中でも特に美しい部類に入ります。メインクエストでは「スプライト」と呼ばれる精霊を使って、島に広がる霧を払っていきます。急かされることも、罰を受けることも、脅威にさらされることも一切ありません。「ゼルダくらいの広さの世界を戦闘なしで探索したい」という人への究極の答えです。',
    why_ko:
      'Yonder: 구름 포수 연대기는 위협도 전투도 전혀 없는 순수한 탐험을 원하는 분께 딱 맞는 농장 게임입니다. 이 게임에는 적이 단 한 명도 없어요 — 진짜 제로입니다. 아름다운 오픈 월드 섬을 탐험하며 재료를 수집하고, 농사를 짓고, 크래프팅하고, 여러 바이옴에 농장을 짓고, 각 마을 주민들을 도와줍니다. 설산부터 열대 해변까지 다양한 바이옴으로 구성된 환경 디자인은 코지 장르에서도 손꼽힐 만큼 아름답습니다. 메인 퀘스트는 스프라이트라 불리는 친근한 정령을 이용해 땅을 뒤덮은 미아즈마를 제거하는 내용입니다. Yonder는 절대 서두르게 하지 않고, 절대 패널티를 주지 않으며, 어떤 위협도 없습니다. "젤다 사이즈의 세계를 전투 없이 탐험하고 싶다"는 분께 보내는 완벽한 답변입니다.',
    why_de:
      "Yonder: The Cloud Catcher Chronicles ist das Farming-Spiel für dich, wenn du null Bedrohung, null Kämpfe und reine Erkundung möchtest. Es gibt buchstäblich keine Feinde in diesem Spiel — keinen einzigen. Du erkundest eine wunderschöne Open-World-Insel, sammelst Materialien, farmst, craftest, baust Farmen in verschiedenen Biomen und hilfst den Bewohnern jedes Dorfes. Das Spiel bietet einige der schönsten Umgebungsdesigns im Cozy-Genre, mit Biomen von verschneiten Bergen bis zu tropischen Stränden. Die Hauptquest beinhaltet das Beseitigen eines korrumpierenden Miasmas mithilfe freundlicher Geister namens Sprites. Yonder hetzt dich nie, bestraft dich nie und erzeugt keine Bedrohung. Es ist die definitive Antwort auf 'Ich möchte eine Zelda-große Welt erkunden, aber ohne Kämpfe.'",
    start_en: 'Unlock the farming plots in each biome early — having crops growing in multiple areas gives you the materials for most main quests.',
    start_zh: '尽早解锁每个生物群落的农业地块——在多个区域种植作物能给你提供大多数主线任务所需的材料。',
    start_zhTW: '儘早解鎖每個生態群系的農業地塊——在多個區域種植作物能給你提供大多數主線任務所需的材料。',
    start_ja: '各バイオームの農場区画を早めに解放しましょう――複数のエリアで作物を育てておくと、ほとんどのメインクエストに必要な素材が揃います。',
    start_ko: '각 바이옴의 농장 구획을 일찍 해금하세요 — 여러 지역에서 작물을 키워두면 대부분의 메인 퀘스트에 필요한 재료를 확보할 수 있습니다.',
    start_de: 'Schalte die Farmplätze in jedem Biotop früh frei — Feldfrüchte in mehreren Gebieten zu haben gibt dir die Materialien für die meisten Hauptquests.',
  },
  'farming-sim': {
    title_en: 'Farming Simulator 25',
    title_zh: '模拟农场 25',
    title_zhTW: '模擬農場 25',
    title_ja: 'ファーミングシミュレーター25',
    title_ko: '파밍 시뮬레이터 25',
    title_de: 'Farming Simulator 25',
    emoji: '🚜',
    tag_en: 'The most realistic farm simulation — authentic machinery, real crop cycles, zero story pressure',
    tag_zh: '最真实的农场模拟——真实机械、真实作物周期、零故事压力',
    tag_zhTW: '最真實的農場模擬——真實機械、真實作物週期、零故事壓力',
    tag_ja: '最リアルな農業シミュレーション――本物の機械、実際の作物サイクル、ストーリー的プレッシャーなし',
    tag_ko: '가장 현실적인 농장 시뮬레이션 — 실제 기계, 실제 작물 사이클, 스토리 압박 제로',
    tag_de: 'Die realistischste Farming-Simulation — echte Maschinen, echte Erntezyklen, null Story-Druck',
    platform_en: 'Available on: PC (Steam/Epic), PlayStation 5, Xbox Series X|S, with console mods support',
    platform_zh: '可在以下平台获取：PC（Steam/Epic）、PlayStation 5、Xbox Series X|S，支持主机 Mod',
    platform_zhTW: '可在以下平台取得：PC（Steam/Epic）、PlayStation 5、Xbox Series X|S，支援主機 Mod',
    platform_ja: '対応プラットフォーム：PC（Steam/Epic）、PlayStation 5、Xbox Series X|S（コンソール向けMod対応）',
    platform_ko: '지원 플랫폼: PC(Steam/Epic), PlayStation 5, Xbox Series X|S (콘솔 모드 지원)',
    platform_de: 'Verfügbar auf: PC (Steam/Epic), PlayStation 5, Xbox Series X|S mit Konsolen-Mod-Support',
    why_en:
      "Farming Simulator 25 is the game for you — authentic, deeply technical, and completely free of narrative pressure. You operate real licensed agricultural machinery from brands like John Deere, CLAAS, and Fendt, manage seasonal crop cycles, build animal husbandry operations, and expand your land empire. There are no characters to befriend, no story, no enemies, and no time pressure from external quests. The complexity comes entirely from the real agricultural systems: soil fertility management, proper crop rotation, equipment maintenance, and logistics of moving produce to market. The modding community is enormous, adding thousands of maps and vehicles. For players who watch farming content on YouTube or who have agricultural backgrounds, it is deeply satisfying in a way no other farming game can match.",
    why_zh:
      '模拟农场 25 是最适合你的游戏——真实、技术深度高，完全没有叙事压力。你操作约翰迪尔、科乐收、芬特等品牌的真实授权农业机械，管理季节性作物周期，建立畜牧业运营，扩大你的土地版图。没有要交朋友的角色、没有故事、没有敌人、没有外部任务的时间压力。复杂性完全来自真实的农业系统：土壤肥力管理、适当的轮作、设备维护和将农产品运往市场的物流。模组社区规模庞大，增加了数千个地图和车辆。对于在 YouTube 上观看农业内容的玩家或有农业背景的玩家，它提供了其他任何农场游戏都无法匹敌的深度满足感。',
    why_zhTW:
      '模擬農場 25 是最適合你的遊戲——真實、技術深度高，完全沒有敘事壓力。你操作約翰迪爾、科樂收、芬特等品牌的真實授權農業機械，管理季節性作物週期，建立畜牧業營運，擴大你的土地版圖。沒有要交朋友的角色、沒有故事、沒有敵人、沒有外部任務的時間壓力。複雜性完全來自真實的農業系統：土壤肥力管理、適當的輪作、設備維護和將農產品運往市場的物流。模組社群規模龐大，增加了數千個地圖和車輛。對於在 YouTube 上觀看農業內容的玩家或有農業背景的玩家，它提供了其他任何農場遊戲都無法匹敵的深度滿足感。',
    why_ja:
      'ファーミングシミュレーター25はあなたのためのゲームです――リアルで技術的に深く、ストーリー上のプレッシャーは一切ありません。ジョンディア・クラース・フェントなど本物のブランドからライセンスを取得した農業機械を操作し、季節ごとの作物サイクルを管理し、畜産業を展開し、農地を広げていきます。交流するキャラクターも、ストーリーも、敵も、外部クエストによる時間制限もありません。複雑さはすべて農業システム自体から来ています：土壌の肥沃度管理、適切な輪作、機械のメンテナンス、そして収穫物を市場へ運ぶ物流。MODコミュニティが非常に活発で、数千ものマップや車両が追加されています。YouTubeで農業動画を観る人や農業の背景がある人には、他のどの農場ゲームも叶えられない深い満足感を与えてくれます。',
    why_ko:
      '파밍 시뮬레이터 25는 여러분을 위한 게임입니다 — 현실적이고 기술적으로 깊으며, 스토리적 압박이 전혀 없습니다. 존 디어, CLAAS, 펜트 등 실제 브랜드의 라이선스를 받은 농업 기계를 조작하고, 계절별 작물 사이클을 관리하며, 축산 사업을 키우고, 농지를 확장합니다. 사귀어야 할 캐릭터도, 스토리도, 적도, 외부 퀘스트 마감도 없습니다. 복잡성은 오로지 실제 농업 시스템에서 나와요: 토양 비옥도 관리, 윤작, 장비 유지보수, 그리고 농산물을 시장으로 운송하는 물류까지. 모딩 커뮤니티가 방대해서 수천 가지 맵과 차량이 추가되어 있습니다. 유튜브에서 농업 영상을 즐겨 보거나 농업 배경이 있는 분이라면, 다른 어떤 농장 게임도 따라올 수 없는 깊은 만족감을 드릴 겁니다.',
    why_de:
      'Farming Simulator 25 ist das Spiel für dich — authentisch, technisch tiefgreifend und völlig frei von Erzähldruck. Du bedienst echte lizenzierte Landmaschinen von Marken wie John Deere, CLAAS und Fendt, managst saisonale Erntezyklen, baust Tierhaltungsbetriebe auf und erweiterst dein Landimperium. Es gibt keine Charaktere zum Anfreunden, keine Story, keine Feinde und keinen Zeitdruck durch externe Quests. Die Komplexität kommt ausschließlich aus den echten Landwirtschaftssystemen: Bodenfruchtbarkeitsmanagement, richtige Fruchtfolge, Gerätewartung und Logistik des Abtransports zur Markt. Die Modding-Community ist riesig und fügt Tausende von Karten und Fahrzeugen hinzu. Für Spieler, die echte Landwirtschafts-Inhalte auf YouTube schauen oder einen landwirtschaftlichen Hintergrund haben, ist es tief befriedigend auf eine Weise, die kein anderes Farming-Spiel erreicht.',
    start_en: "Start on the Elm Creek map — it has the flattest terrain, best for learning machinery controls before tackling complex terrain.",
    start_zh: '从 Elm Creek 地图开始——它地形最平坦，非常适合在挑战复杂地形之前学习机械控制。',
    start_zhTW: '從 Elm Creek 地圖開始——它地形最平坦，非常適合在挑戰複雜地形之前學習機械控制。',
    start_ja: 'まずElm Creekマップから始めましょう――地形が最も平坦で、複雑な地形に挑む前に機械の操作を覚えるのに最適です。',
    start_ko: 'Elm Creek 맵부터 시작하세요 — 지형이 가장 평탄해서, 복잡한 지형에 도전하기 전에 기계 조작을 익히기 좋습니다.',
    start_de: 'Fang auf der Elm Creek-Karte an — sie hat das flachste Gelände, ideal um die Maschinensteuerung zu lernen, bevor du dich an komplexes Terrain wagst.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'rune-factory': 0,
    portia: 0,
    yonder: 0,
    'farming-sim': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function FarmChallengeQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/farming-game-challenge`
    const shareText = getLoc(
      `根据挑战偏好，最适合我的农场游戏是「${result.title_zh}」！找到你的：${url}`,
      `Based on my challenge preference, my farming game match is ${result.title_en}! Find yours: ${url}`,
      `根據挑戰偏好，最適合我的農場遊戲是「${result.title_zhTW}」！找到你的：${url}`,
      `チャレンジ傾向から導き出した私の農場ゲームは「${result.title_ja}」！あなたも試して：${url}`,
      `도전 성향 기반 나에게 맞는 농장 게임은 「${result.title_ko}」！당신도 찾아보세요: ${url}`,
      `Basierend auf meiner Challenge-Präferenz ist mein Farming-Spiel „${result.title_de}"! Finde deins: ${url}`,
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
              {getLoc('开始建议：', 'Where to start: ', '開始建議：', 'はじめ方：', '시작 팁: ', 'Wo anfangen: ')}
            </span>
            {getLoc(result.start_zh, result.start_en, result.start_zhTW, result.start_ja, result.start_ko, result.start_de)}
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
            '你想要多少挑战感？农场游戏推荐测验',
            'How Much Challenge Do You Want in Your Farming Game?',
            '你想要多少挑戰感？農場遊戲推薦測驗',
            'あなたはどれくらいの挑戦を求めますか？農場ゲーム診断',
            '농장 게임에서 얼마나 많은 도전을 원하시나요?',
            'Wie viel Herausforderung willst du in deinem Farming-Spiel?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，根据你对挑战和复杂性的偏好，找到最适合你的农场游戏——从零战斗到动作 RPG',
            '6 questions to match your challenge preference with the right farming game — from zero combat to full action RPG dungeons',
            '6 個問題，根據你對挑戰和複雜性的偏好，找到最適合你的農場遊戲——從零戰鬥到動作 RPG',
            '6つの質問で、あなたの挑戦スタイルに合った農場ゲームを診断します――戦闘なしから本格アクションRPGまで',
            '6가지 질문으로 내 도전 성향에 맞는 농장 게임 찾기 — 전투 없음부터 액션 RPG 던전까지',
            '6 Fragen, um das richtige Farming-Spiel für deine Challenge-Präferenz zu finden — von null Kämpfen bis zu Action-RPG-Dungeons',
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
        {getLoc(
          '找到我的农场游戏',
          'Find My Farming Game',
          '找到我的農場遊戲',
          '私の農場ゲームを見つける',
          '내 농장 게임 찾기',
          'Mein Farming-Spiel finden',
        )}
      </button>
    </div>
  )
}
