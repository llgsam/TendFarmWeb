'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Game = 'mineral-town' | 'wonderful-life' | 'olive-town' | 'rune-factory'

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
    ? locale === 'zh'
      ? '✓ 已复制！'
      : locale === 'zh-TW'
        ? '✓ 已複製！'
        : locale === 'ja'
          ? '✓ コピーしました！'
          : locale === 'ko'
            ? '✓ 복사되었습니다!'
            : locale === 'de'
              ? '✓ Kopiert!'
              : '✓ Copied!'
    : locale === 'zh'
      ? '📋 复制结果'
      : locale === 'zh-TW'
        ? '📋 複製結果'
        : locale === 'ja'
          ? '📋 結果をコピー'
          : locale === 'ko'
            ? '📋 결과 복사'
            : locale === 'de'
              ? '📋 Ergebnis kopieren'
              : '📋 Copy result'

  const shareLabel =
    locale === 'zh' || locale === 'zh-TW'
      ? '分享'
      : locale === 'ja'
        ? 'シェア'
        : locale === 'ko'
          ? '공유'
          : locale === 'de'
            ? 'Teilen'
            : 'Share'

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
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Game }>
}> = [
  {
    q_en: 'How much time do you usually have for a gaming session?',
    q_zh: '你通常有多少时间玩一次游戏？',
    q_zhTW: '你通常有多少時間玩一次遊戲？',
    q_ja: '一回のゲームセッションはどのくらい時間がとれますか？',
    q_ko: '보통 한 번 게임할 때 얼마나 시간이 있나요?',
    q_de: 'Wie viel Zeit hast du normalerweise für eine Spielsession?',
    options: [
      {
        en: '30–60 min — I need something I can pick up and put down easily',
        zh: '30-60 分钟——我需要随时能拿起来放下的游戏',
        zhTW: '30-60 分鐘——我需要隨時能拿起放下的遊戲',
        ja: '30〜60分——気軽にサッと遊べるものが必要',
        ko: '30-60분 — 언제든 가볍게 시작하고 끝낼 수 있는 게임이 필요해요',
        de: '30–60 Min. — ich brauche etwas, das ich leicht auf- und absetzen kann',
        type: 'mineral-town',
      },
      {
        en: '1–2 hours — I like a steady rhythm without rushing',
        zh: '1-2 小时——我喜欢不紧不慢的节奏',
        zhTW: '1-2 小時——我喜歡不緊不慢的節奏',
        ja: '1〜2時間——焦らずゆったりとしたペースが好き',
        ko: '1-2시간 — 여유롭고 안정적인 리듬이 좋아요',
        de: '1–2 Stunden — ich mag einen ruhigen Rhythmus ohne Hektik',
        type: 'wonderful-life',
      },
      {
        en: '2–3 hours — I love getting deep into building and progression',
        zh: '2-3 小时——我喜欢深入建造和成长的过程',
        zhTW: '2-3 小時——我喜歡深入建造和成長的過程',
        ja: '2〜3時間——建築や成長要素にどっぷりハマりたい',
        ko: '2-3시간 — 건설과 성장 과정에 깊이 빠져드는 걸 좋아해요',
        de: '2–3 Stunden — ich liebe es, mich ins Bauen und Fortschreiten zu vertiefen',
        type: 'olive-town',
      },
      {
        en: '3+ hours — I want a full experience with combat and story',
        zh: '3 小时以上——我想要有战斗和故事的完整体验',
        zhTW: '3 小時以上——我想要有戰鬥和故事的完整體驗',
        ja: '3時間以上——戦闘とストーリーが充実した本格的な体験がしたい',
        ko: '3시간 이상 — 전투와 스토리가 있는 풍부한 경험을 원해요',
        de: '3+ Stunden — ich möchte eine vollständige Erfahrung mit Kampf und Geschichte',
        type: 'rune-factory',
      },
    ],
  },
  {
    q_en: 'What draws you most to farming games?',
    q_zh: '你最喜欢农场游戏的哪个方面？',
    q_zhTW: '你最喜歡農場遊戲的哪個方面？',
    q_ja: '農場ゲームの何が一番好きですか？',
    q_ko: '농장 게임에서 가장 매력적인 부분은 무엇인가요?',
    q_de: 'Was zieht dich bei Farming-Games am meisten an?',
    options: [
      {
        en: 'The satisfying loop of planting, growing, and selling',
        zh: '种植、成长、出售的满足感循环',
        zhTW: '種植、成長、販售的滿足感循環',
        ja: '種を蒔いて育てて売る、あの達成感のループ',
        ko: '씨 뿌리고, 키우고, 팔아내는 만족스러운 루프',
        de: 'Der befriedigende Kreislauf aus Pflanzen, Züchten und Verkaufen',
        type: 'mineral-town',
      },
      {
        en: 'The characters and their evolving relationships over years',
        zh: '人物和他们随时间变化的关系',
        zhTW: '人物和他們隨時間演變的關係',
        ja: 'キャラクターたちと、年月をかけて深まる関係性',
        ko: '캐릭터들과 세월에 걸쳐 발전하는 관계',
        de: 'Die Charaktere und ihre sich über Jahre entwickelnden Beziehungen',
        type: 'wonderful-life',
      },
      {
        en: 'Building and designing a town or farm from scratch',
        zh: '从零开始建造和设计城镇或农场',
        zhTW: '從零開始建造和設計城鎮或農場',
        ja: 'ゼロから街や農場を作り上げていくこと',
        ko: '처음부터 마을이나 농장을 직접 만들고 꾸미는 것',
        de: 'Eine Stadt oder Farm von Grund auf aufbauen und gestalten',
        type: 'olive-town',
      },
      {
        en: 'Adventure — exploring dungeons and fighting monsters between farm days',
        zh: '冒险——在农场日之间探索地下城和战斗',
        zhTW: '冒險——在農場日之間探索地下城和戰鬥',
        ja: '冒険――農作業の合間にダンジョンを探索してモンスターと戦うこと',
        ko: '모험 — 농사 틈틈이 던전을 탐험하고 몬스터와 싸우는 것',
        de: 'Abenteuer — zwischen Farmtagen Dungeons erkunden und Monster bekämpfen',
        type: 'rune-factory',
      },
    ],
  },
  {
    q_en: 'Romance and marriage in farming games are:',
    q_zh: '农场游戏里的恋爱和结婚对你来说是？',
    q_zhTW: '農場遊戲裡的戀愛和結婚對你來說是？',
    q_ja: '農場ゲームにおけるロマンスや結婚は？',
    q_ko: '농장 게임에서의 연애와 결혼은?',
    q_de: 'Romantik und Heirat in Farming-Games sind für dich:',
    options: [
      {
        en: 'A fun goal — I enjoy gifting and building romance slowly',
        zh: '有趣的目标——我喜欢慢慢送礼和建立感情',
        zhTW: '有趣的目標——我喜歡慢慢送禮和建立感情',
        ja: '楽しい目標――プレゼントを渡しながら少しずつ仲を深めていく',
        ko: '재미있는 목표 — 선물을 드리며 천천히 관계를 쌓아가는 과정이 좋아요',
        de: 'Ein schönes Ziel — ich genieße es, langsam Geschenke zu geben und die Romanze aufzubauen',
        type: 'mineral-town',
      },
      {
        en: 'Central — I want to watch my family grow and age together',
        zh: '核心内容——我想看着家庭一起成长和变老',
        zhTW: '核心內容——我想看著家庭一起成長和老去',
        ja: '中心的存在――家族が共に成長し、年を重ねていく姿を見届けたい',
        ko: '핵심 요소 — 가족이 함께 자라고 나이 들어가는 모습을 보고 싶어요',
        de: 'Zentral — ich möchte zusehen, wie meine Familie gemeinsam wächst und altert',
        type: 'wonderful-life',
      },
      {
        en: 'Nice but secondary — I care more about the town community',
        zh: '不错但次要——我更在乎城镇社区',
        zhTW: '不錯但次要——我更在乎城鎮社群',
        ja: 'あると良いけど二の次――私は街のコミュニティ全体の方が大切',
        ko: '좋지만 부차적 — 마을 커뮤니티 전체가 더 중요해요',
        de: 'Nett, aber zweitrangig — mir liegt die Stadtgemeinschaft mehr am Herzen',
        type: 'olive-town',
      },
      {
        en: 'Part of a rich character system with deep storylines',
        zh: '丰富角色系统和深度故事线的组成部分',
        zhTW: '豐富角色系統和深度故事線的重要組成部分',
        ja: '深いストーリーと充実したキャラクターシステムの一部',
        ko: '깊은 스토리와 풍부한 캐릭터 시스템의 일부',
        de: 'Teil eines reichen Charaktersystems mit tiefen Handlungssträngen',
        type: 'rune-factory',
      },
    ],
  },
  {
    q_en: 'How do you feel about action or combat in a farming game?',
    q_zh: '你对农场游戏里的动作或战斗元素怎么看？',
    q_zhTW: '你對農場遊戲裡的動作或戰鬥元素怎麼看？',
    q_ja: '農場ゲームにアクションや戦闘があることについてどう思いますか？',
    q_ko: '농장 게임에서 액션이나 전투 요소에 대해 어떻게 생각하나요?',
    q_de: 'Wie stehst du zu Action oder Kämpfen in einem Farming-Game?',
    options: [
      {
        en: 'No combat please — pure farming and life simulation',
        zh: '不要战斗——纯粹的农场和生活模拟',
        zhTW: '不要戰鬥——純粹的農場和生活模擬',
        ja: '戦闘はいらない――純粋な農業と生活シミュレーションがいい',
        ko: '전투는 싫어요 — 순수한 농장 경영과 생활 시뮬레이션이 좋아요',
        de: 'Bitte kein Kampf — nur reines Farmen und Lebenssimulation',
        type: 'mineral-town',
      },
      {
        en: 'Minimal is fine — light mine exploration is enough',
        zh: '少量就好——轻度探索矿洞就够了',
        zhTW: '少量就好——輕度探索礦洞就夠了',
        ja: '最低限でOK――軽く鉱山を探索する程度で十分',
        ko: '최소한으로만 — 가볍게 광산 탐험 정도면 충분해요',
        de: 'Minimal ist okay — ein wenig Minenexploration reicht mir',
        type: 'wonderful-life',
      },
      {
        en: 'A little gathering and resource collection but nothing intense',
        zh: '一点采集和资源收集，但不要太激烈',
        zhTW: '一點採集和資源收集，但不要太激烈',
        ja: '採集や素材集め程度ならいいけど、激しいのは遠慮したい',
        ko: '약간의 채집과 자원 수집 정도는 좋지만 격렬한 건 싫어요',
        de: 'Etwas Sammeln und Ressourcen abbauen — aber nichts Intensives',
        type: 'olive-town',
      },
      {
        en: 'I want real combat — dungeons, bosses, and progression',
        zh: '我想要真正的战斗——地下城、Boss 和成长体系',
        zhTW: '我想要真正的戰鬥——地下城、Boss 和成長體系',
        ja: 'ちゃんとした戦闘がほしい――ダンジョン、ボス、成長システム込みで',
        ko: '진짜 전투를 원해요 — 던전, 보스, 성장 시스템까지',
        de: 'Ich will echten Kampf — Dungeons, Bosse und ein Progressionssystem',
        type: 'rune-factory',
      },
    ],
  },
  {
    q_en: 'Your preferred game length for a farming game is:',
    q_zh: '你偏好农场游戏的时长是？',
    q_zhTW: '你偏好農場遊戲的遊玩時長是？',
    q_ja: '農場ゲームの好みのプレイ時間は？',
    q_ko: '농장 게임의 선호 플레이 시간은?',
    q_de: 'Deine bevorzugte Spieldauer bei einem Farming-Game ist:',
    options: [
      {
        en: 'Compact and replayable — one run is 20–40 hours, then new game+',
        zh: '紧凑可重玩——一轮 20-40 小时，然后新周目',
        zhTW: '緊湊且可重玩——一輪 20-40 小時，然後再開新周目',
        ja: 'コンパクトで周回しやすい――1周20〜40時間でニューゲーム+',
        ko: '압축되고 반복할 수 있는 — 한 회차 20-40시간, 그다음 뉴게임+',
        de: 'Kompakt und wiederspielbar — ein Durchlauf mit 20–40 Std., dann New Game+',
        type: 'mineral-town',
      },
      {
        en: 'A single meaningful story — I want a satisfying ending',
        zh: '一个有意义的故事——我想要令人满足的结局',
        zhTW: '一個有意義的故事——我想要令人滿足的結局',
        ja: '一本のしっかりしたストーリー――満足のいくエンディングが欲しい',
        ko: '하나의 의미 있는 이야기 — 만족스러운 엔딩을 원해요',
        de: 'Eine einzelne bedeutungsvolle Geschichte — ich will ein befriedigendes Ende',
        type: 'wonderful-life',
      },
      {
        en: 'Open-ended — I want to keep building with no clear finish',
        zh: '开放式——我想不断建造，没有明确的终点',
        zhTW: '開放式——我想不斷建造，沒有明確的終點',
        ja: 'エンドレス――明確なゴールがなくても、ずっと作り続けていたい',
        ko: '오픈엔딩 — 뚜렷한 마무리 없이 계속 만들어가고 싶어요',
        de: 'Offen — ich möchte endlos weiterbauen, ohne klares Ende',
        type: 'olive-town',
      },
      {
        en: 'Epic — 60-100+ hours with lots of content and story routes',
        zh: '史诗级——60-100 小时以上，有大量内容和故事路线',
        zhTW: '史詩級——60-100 小時以上，有大量內容和故事路線',
        ja: '大作級――60〜100時間以上、豊富なコンテンツと複数のストーリールート',
        ko: '에픽 — 60-100시간 이상, 풍부한 콘텐츠와 다양한 스토리 루트',
        de: 'Episch — 60-100+ Stunden mit viel Inhalt und Storylinien',
        type: 'rune-factory',
      },
    ],
  },
  {
    q_en: 'When you hear "classic farming game," the first image that comes to mind is:',
    q_zh: '听到"经典农场游戏"，你脑海中第一个浮现的画面是？',
    q_zhTW: '聽到「經典農場遊戲」，你腦海中第一個浮現的畫面是？',
    q_ja: '「クラシックな農場ゲーム」と聞いて最初に思い浮かぶ光景は？',
    q_ko: '「클래식 농장 게임」이라고 들었을 때 가장 먼저 떠오르는 장면은?',
    q_de: 'Wenn du "klassisches Farming-Game" hörst, ist das erste Bild, das dir in den Sinn kommt:',
    options: [
      {
        en: 'A cozy mountain town, festivals, and a simple but perfect farm',
        zh: '一个舒适的山间小镇、节日和简单而完美的农场',
        zhTW: '一個溫馨的山間小鎮、節慶和簡單而完美的農場',
        ja: '居心地のいい山間の町、お祭り、そしてシンプルだけど完璧な農場',
        ko: '아늑한 산간 마을, 축제, 그리고 소박하지만 완벽한 농장',
        de: 'Eine gemütliche Bergstadt, Feste und eine simple, aber perfekte Farm',
        type: 'mineral-town',
      },
      {
        en: 'A life lived across seasons, watching your child grow up',
        zh: '跨越季节的人生，看着孩子长大',
        zhTW: '跨越四季的人生，看著孩子長大',
        ja: '季節をまたいだ人生、子どもが成長していく姿',
        ko: '계절을 넘어 살아온 삶, 아이가 자라는 모습',
        de: 'Ein Leben über die Jahreszeiten hinweg, dem Kind beim Aufwachsen zusehen',
        type: 'wonderful-life',
      },
      {
        en: 'Building a town from the ground up with your own hands',
        zh: '亲手从头建造一座城镇',
        zhTW: '親手從頭建造一座城鎮',
        ja: '自分の手でゼロから街を作り上げていく光景',
        ko: '내 손으로 처음부터 마을을 만들어가는 모습',
        de: 'Eine Stadt von Grund auf mit den eigenen Händen aufbauen',
        type: 'olive-town',
      },
      {
        en: 'A magical world where farming and dungeon-crawling coexist',
        zh: '农场耕种和地下城探索共存的魔法世界',
        zhTW: '農場耕種和地下城探索共存的魔幻世界',
        ja: '農業とダンジョン攻略が共存する、魔法の世界',
        ko: '농사와 던전 탐험이 공존하는 마법 같은 세계',
        de: 'Eine magische Welt, in der Farmen und Dungeon-Crawling nebeneinander existieren',
        type: 'rune-factory',
      },
    ],
  },
]

const RESULTS: Record<
  Game,
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
    desc_en: string
    desc_zh: string
    desc_zhTW: string
    desc_ja: string
    desc_ko: string
    desc_de: string
    platform_en: string
    platform_zh: string
    platform_zhTW: string
    platform_ja: string
    platform_ko: string
    platform_de: string
    pro_en: string[]
    pro_zh: string[]
    pro_zhTW: string[]
    pro_ja: string[]
    pro_ko: string[]
    pro_de: string[]
  }
> = {
  'mineral-town': {
    title_en: 'Story of Seasons: Friends of Mineral Town',
    title_zh: '牧场物语：矿石镇的伙伴们',
    title_zhTW: '牧場物語：礦石鎮的夥伴們',
    title_ja: '牧場物語 再会のミネラルタウン',
    title_ko: '목장이야기: 미네랄 타운의 친구들',
    title_de: 'Story of Seasons: Friends of Mineral Town',
    emoji: '⛰️',
    tag_en: 'Classic · Compact · Perfect for Beginners',
    tag_zh: '经典 · 紧凑 · 新手友好',
    tag_zhTW: '經典 · 緊湊 · 新手友好',
    tag_ja: 'クラシック · コンパクト · 初心者にも安心',
    tag_ko: '클래식 · 압축적 · 입문자 친화적',
    tag_de: 'Klassisch · Kompakt · Ideal für Einsteiger',
    desc_en:
      "Friends of Mineral Town is the refined essence of what makes Story of Seasons magical — a cozy mountain town, a cast of memorable villagers, festivals that anchor every season, and a farm that rewards every hour you put in. The 2020 remake modernizes it beautifully without losing the soul of the original. It is the ideal first game and also deeply replayable.",
    desc_zh:
      '矿石镇的伙伴们是牧场物语系列魔力的精华——一个舒适的山间小镇、令人难忘的村民群体、每个季节都有固定节日，以及会回报你每一小时投入的农场。2020 年的重制版在保留原作灵魂的前提下进行了漂亮的现代化改良。它既是理想的入门之作，也极具重玩价值。',
    desc_zhTW:
      '礦石鎮的夥伴們是牧場物語系列魔力的精華——一個溫馨的山間小鎮、令人難忘的村民群體、每個季節都有固定節慶，以及會回報你每一小時投入的農場。2020 年的重製版在保留原作靈魂的前提下進行了漂亮的現代化改良。它既是理想的入門之作，也極具重玩價值。',
    desc_ja:
      '再会のミネラルタウンは、牧場物語シリーズの魅力を凝縮した一作です。居心地のいい山間の町、個性豊かな村人たち、季節ごとのお祭り、そして費やした時間に応えてくれる農場――これぞ牧場物語の本質。2020年のリメイクは原作の魂を残しつつ、見事に現代化されています。初めての方にも最適で、何度遊んでも飽きない作品です。',
    desc_ko:
      '미네랄 타운의 친구들은 목장이야기 시리즈가 가진 매력의 정수입니다. 포근한 산간 마을, 기억에 남는 마을 주민들, 매 계절마다 열리는 축제, 그리고 투자한 시간만큼 보답해 주는 농장이 기다립니다. 2020년 리메이크는 원작의 감성을 살리면서도 현대적으로 멋지게 다듬어졌습니다. 입문용으로도 훌륭하고, 반복 플레이해도 질리지 않는 작품입니다.',
    desc_de:
      'Friends of Mineral Town ist die destillierte Essenz dessen, was Story of Seasons so besonders macht — eine gemütliche Bergstadt, unvergessliche Dorfbewohner, Feste, die jede Jahreszeit prägen, und eine Farm, die jede investierte Stunde belohnt. Das 2020er Remake modernisiert das Spiel wunderschön, ohne die Seele des Originals zu verlieren. Es ist das perfekte Einstiegsspiel und immer wieder neu zu entdecken.',
    platform_en: 'Nintendo Switch · Steam · Mobile',
    platform_zh: 'Nintendo Switch · Steam · 手机',
    platform_zhTW: 'Nintendo Switch · Steam · 手機',
    platform_ja: 'Nintendo Switch · Steam · モバイル',
    platform_ko: 'Nintendo Switch · Steam · 모바일',
    platform_de: 'Nintendo Switch · Steam · Mobil',
    pro_en: [
      'Perfect on-ramp for the Story of Seasons / Harvest Moon franchise',
      'Tight, satisfying gameplay loop that works in short sessions',
      'Includes both same-sex and opposite-sex marriage options in the remake',
    ],
    pro_zh: [
      '进入牧场物语 / 星露之月系列的完美入口',
      '紧凑满足的游戏循环，短时间游玩也很舒适',
      '重制版支持同性和异性婚姻选项',
    ],
    pro_zhTW: [
      '進入牧場物語系列的完美入口',
      '緊湊滿足的遊戲循環，短時間遊玩也很舒適',
      '重製版支援同性和異性婚姻選項',
    ],
    pro_ja: [
      '牧場物語シリーズへの完璧な入り口',
      '短時間でも楽しめるコンパクトで爽快なゲームループ',
      'リメイク版では同性・異性を問わず結婚が選べる',
    ],
    pro_ko: [
      '목장이야기 시리즈에 처음 입문하기 완벽한 작품',
      '짧은 세션에도 충분히 즐길 수 있는 압축된 루프',
      '리메이크에서 동성 및 이성 결혼 모두 지원',
    ],
    pro_de: [
      'Perfekter Einstieg in die Story of Seasons / Harvest Moon-Reihe',
      'Kompakter, befriedigender Gameplay-Loop, der auch in kurzen Sessions funktioniert',
      'Das Remake bietet sowohl gleichgeschlechtliche als auch verschiedengeschlechtliche Heiratsoptionen',
    ],
  },
  'wonderful-life': {
    title_en: 'Story of Seasons: A Wonderful Life',
    title_zh: '牧场物语：美好的一生',
    title_zhTW: '牧場物語：美好的一生',
    title_ja: '牧場物語 Welcome！ワンダフルライフ',
    title_ko: '목장이야기: 원더풀 라이프',
    title_de: 'Story of Seasons: A Wonderful Life',
    emoji: '🌿',
    tag_en: 'Emotional · Story-Driven · Life Simulation',
    tag_zh: '感情深厚 · 故事驱动 · 人生模拟',
    tag_zhTW: '情感豐富 · 故事驅動 · 人生模擬',
    tag_ja: '感動的 · ストーリー重視 · 人生シミュレーション',
    tag_ko: '감동적 · 스토리 중심 · 인생 시뮬레이션',
    tag_de: 'Emotional · Storygetrieben · Lebenssimulation',
    desc_en:
      "A Wonderful Life is unlike any other farming game — it follows your character across multiple life chapters, from young adult to old age, watching your marriage evolve, your children grow, and your farm change. The 2023 remake adds new marriage candidates, story content, and modern quality-of-life improvements. If you want a farming game that makes you feel something, this is it.",
    desc_zh:
      '《美好的一生》是一款与众不同的农场游戏——它跟随你的角色经历人生多个章节，从青年到老年，见证婚姻的演变、孩子的成长和农场的变化。2023 年重制版新增了婚姻候选人、故事内容和现代化品质改进。如果你想要一款能让你真正有所感触的农场游戏，这就是它。',
    desc_zhTW:
      '《美好的一生》是一款與眾不同的農場遊戲——它跟隨你的角色經歷人生多個章節，從青年到老年，見證婚姻的演變、孩子的成長和農場的變化。2023 年重製版新增了婚姻候選人、故事內容和現代化品質改進。如果你想要一款能讓你真正有所感觸的農場遊戲，這就是它。',
    desc_ja:
      'ワンダフルライフは他の農場ゲームとは一線を画す作品です。若き日から老齢まで、複数の人生チャプターをキャラクターと共に歩み、結婚生活の変化、子どもの成長、農場の移り変わりを見届けます。2023年のリメイクでは新たな結婚相手や追加ストーリー、快適なゲームプレイ改善が加わりました。農場ゲームで心を動かされたいなら、これしかありません。',
    desc_ko:
      '원더풀 라이프는 여느 농장 게임과는 차원이 다릅니다. 청년부터 노년까지 여러 인생 챕터를 캐릭터와 함께 걸어가며, 결혼 생활의 변화, 아이의 성장, 농장의 변모를 지켜봅니다. 2023년 리메이크에서는 새로운 결혼 상대, 추가 스토리, 그리고 편의성 개선이 이루어졌습니다. 농장 게임을 하면서 진심으로 감동받고 싶다면 이 게임입니다.',
    desc_de:
      'A Wonderful Life ist anders als jedes andere Farming-Game — es begleitet deinen Charakter durch mehrere Lebensabschnitte, vom jungen Erwachsenen bis ins hohe Alter, und du erlebst, wie sich deine Ehe entwickelt, deine Kinder wachsen und deine Farm sich verändert. Das 2023er Remake fügt neue Heiratspartner, Storyinhalte und moderne Komfortverbesserungen hinzu. Wenn du ein Farming-Game willst, das dich wirklich bewegt, ist das hier die Wahl.',
    platform_en: 'Nintendo Switch · PlayStation · Xbox · Steam',
    platform_zh: 'Nintendo Switch · PlayStation · Xbox · Steam',
    platform_zhTW: 'Nintendo Switch · PlayStation · Xbox · Steam',
    platform_ja: 'Nintendo Switch · PlayStation · Xbox · Steam',
    platform_ko: 'Nintendo Switch · PlayStation · Xbox · Steam',
    platform_de: 'Nintendo Switch · PlayStation · Xbox · Steam',
    pro_en: [
      'Unique life-stage narrative that no other farming game matches',
      '2023 remake adds significant new content including new romance options',
      'Moving, quiet storytelling that stays with you long after you finish',
    ],
    pro_zh: [
      '独一无二的人生阶段叙事，其他农场游戏无法复制',
      '2023 年重制版增加了大量新内容，包括新的恋爱对象',
      '安静感人的叙事，结束后依然让你久久回味',
    ],
    pro_zhTW: [
      '獨一無二的人生階段敘事，其他農場遊戲無法複製',
      '2023 年重製版增加了大量新內容，包括新的戀愛對象',
      '安靜感人的敘事，結束後依然讓你久久回味',
    ],
    pro_ja: [
      '他の農場ゲームにはないライフステージ式ナラティブ',
      '2023年リメイクで新しい恋愛相手など大幅なコンテンツ追加',
      'ゲームが終わった後も余韻が続く、静かで胸に沁みるストーリー',
    ],
    pro_ko: [
      '다른 어떤 농장 게임도 따라올 수 없는 인생 챕터식 서사',
      '2023년 리메이크에서 새 연애 상대 등 풍부한 콘텐츠 추가',
      '게임이 끝난 뒤에도 오래 여운이 남는 조용하고 감동적인 이야기',
    ],
    pro_de: [
      'Einzigartiges Lebensabschnitt-Narrativ, das kein anderes Farming-Game bietet',
      '2023er Remake fügt bedeutende neue Inhalte hinzu, inkl. neue Romantikoptionen',
      'Stille, berührende Erzählung, die noch lange nach dem Spielen nachwirkt',
    ],
  },
  'olive-town': {
    title_en: 'Story of Seasons: Pioneers of Olive Town',
    title_zh: '牧场物语：橄榄镇与希望的大地',
    title_zhTW: '牧場物語：橄欖鎮與希望的大地',
    title_ja: '牧場物語 オリーブタウンと希望の大地',
    title_ko: '목장이야기: 올리브 타운과 희망의 대지',
    title_de: 'Story of Seasons: Pioneers of Olive Town',
    emoji: '🏗️',
    tag_en: 'Builder · Modern · Town Development',
    tag_zh: '建造型 · 现代 · 城镇发展',
    tag_zhTW: '建造型 · 現代 · 城鎮發展',
    tag_ja: '建築系 · 最新作 · 街づくり',
    tag_ko: '건설형 · 모던 · 마을 개발',
    tag_de: 'Aufbau · Modern · Stadtentwicklung',
    desc_en:
      "Pioneers of Olive Town puts town-building and environmental restoration front and center. You start with a neglected farm and gradually transform it — and the entire town — into a thriving community. It is the most modern entry in the series with the most detailed crafting system. If you love watching raw wilderness become something beautiful, this is your game.",
    desc_zh:
      '《橄榄镇与希望的大地》将城镇建造和环境修复放在核心位置。你从一片荒废的农场出发，逐渐将它——以及整个城镇——改造成欣欣向荣的社区。这是系列最现代的作品，有着最详细的制作系统。如果你喜欢看着荒野变成美丽之地的过程，这就是你的游戏。',
    desc_zhTW:
      '《橄欖鎮與希望的大地》將城鎮建造和環境修復放在核心位置。你從一片荒廢的農場出發，逐漸將它——以及整個城鎮——改造成欣欣向榮的社區。這是系列最現代的作品，有著最詳細的製作系統。如果你喜歡看著荒野變成美麗之地的過程，這就是你的遊戲。',
    desc_ja:
      'オリーブタウンと希望の大地は、街づくりと自然の再生を中心に据えた作品です。荒れ果てた農場から始まり、農場はもちろん、街全体を活気ある共同体へと変えていきます。シリーズ最新の技術を使い、最も詳細なクラフトシステムを誇ります。荒れ地が美しい場所へと生まれ変わる過程を楽しみたいなら、この作品がぴったりです。',
    desc_ko:
      '올리브 타운과 희망의 대지는 마을 건설과 환경 복원을 핵심으로 삼습니다. 방치된 농장에서 시작해 농장은 물론 마을 전체를 활기 넘치는 공동체로 변모시켜 나갑니다. 시리즈에서 가장 현대적인 작품으로, 가장 정교한 제작 시스템을 갖추고 있습니다. 황무지가 아름다운 공간으로 탈바꿈하는 과정을 즐기고 싶다면 바로 이 게임입니다.',
    desc_de:
      'Pioneers of Olive Town stellt Stadtaufbau und Naturrehabilitierung in den Mittelpunkt. Du beginnst mit einer vernachlässigten Farm und verwandelst sie — und die ganze Stadt — in eine blühende Gemeinschaft. Es ist der modernste Teil der Reihe mit dem detailliertesten Crafting-System. Wenn du liebst, wie aus wilder Natur etwas Schönes entsteht, ist das dein Spiel.',
    platform_en: 'Nintendo Switch · Steam',
    platform_zh: 'Nintendo Switch · Steam',
    platform_zhTW: 'Nintendo Switch · Steam',
    platform_ja: 'Nintendo Switch · Steam',
    platform_ko: 'Nintendo Switch · Steam',
    platform_de: 'Nintendo Switch · Steam',
    pro_en: [
      'Most ambitious scope in the series — building a whole town, not just a farm',
      'Detailed crafting and production chains reward patient builders',
      'Visually the most polished entry in the Story of Seasons series',
    ],
    pro_zh: [
      '系列中最宏大的规模——建造整个城镇，而不仅仅是农场',
      '详细的制作和生产链让有耐心的建造者获得充分回报',
      '视觉上是牧场物语系列中制作最精良的作品',
    ],
    pro_zhTW: [
      '系列中最宏大的規模——建造整個城鎮，而不僅僅是農場',
      '詳細的製作和生產鏈讓有耐心的建造者獲得充分回報',
      '視覺上是牧場物語系列中製作最精良的作品',
    ],
    pro_ja: [
      '農場だけでなく街全体を作り上げる、シリーズ最大スケール',
      '細かいクラフトと製造チェーンで、じっくり遊ぶプレイヤーを満足させる',
      '牧場物語シリーズの中で視覚的に最も完成度の高い作品',
    ],
    pro_ko: [
      '농장뿐 아니라 마을 전체를 만드는 시리즈 역대 최대 규모',
      '정교한 제작 및 생산 체인으로 꼼꼼한 플레이어를 만족시킴',
      '시각적으로 목장이야기 시리즈 중 가장 완성도 높은 작품',
    ],
    pro_de: [
      'Größter Umfang der Reihe — eine ganze Stadt bauen, nicht nur eine Farm',
      'Detaillierte Herstellungs- und Produktionsketten belohnen geduldige Baumeister',
      'Optisch der am sorgfältigsten gestaltete Teil der Story of Seasons-Reihe',
    ],
  },
  'rune-factory': {
    title_en: 'Rune Factory 4 Special',
    title_zh: '符文工房 4 豪华版',
    title_zhTW: '符文工房 4 豪華版',
    title_ja: 'ルーンファクトリー4 スペシャル',
    title_ko: '룬 팩토리 4 스페셜',
    title_de: 'Rune Factory 4 Special',
    emoji: '⚔️',
    tag_en: 'Action-RPG · Deep Story · Combat + Farming',
    tag_zh: '动作 RPG · 深度故事 · 战斗 + 农场',
    tag_zhTW: '動作 RPG · 深度故事 · 戰鬥 + 農場',
    tag_ja: 'アクションRPG · 深いストーリー · 戦闘＋農業',
    tag_ko: '액션 RPG · 깊은 스토리 · 전투 + 농장',
    tag_de: 'Action-RPG · Tiefe Story · Kampf + Farmen',
    desc_en:
      "Rune Factory 4 is the gold standard for players who want farming and adventure in equal measure. You manage your farm, cook, craft, build relationships with a cast of memorable characters — and then dive into dungeons and fight bosses. The Special edition on Switch and PC adds new content and is the definitive version. It has more story depth, romance depth, and combat depth than any other entry in this quiz.",
    desc_zh:
      '符文工房 4 是想要农场和冒险并重的玩家的黄金标准。你管理农场、烹饪、制作、与一群令人难忘的角色建立关系——然后跳进地下城和 Boss 战斗。Switch 和 PC 上的豪华版增加了新内容，是最终极的版本。它的故事深度、恋爱深度和战斗深度都是本次测验中所有选项里最高的。',
    desc_zhTW:
      '符文工房 4 是想要農場和冒險並重的玩家的黃金標準。你管理農場、烹飪、製作、與一群令人難忘的角色建立關係——然後跳進地下城和 Boss 戰鬥。Switch 和 PC 上的豪華版增加了新內容，是最終極的版本。它的故事深度、戀愛深度和戰鬥深度都是本次測驗中所有選項裡最高的。',
    desc_ja:
      'ルーンファクトリー4は、農業と冒険を同時に楽しみたいプレイヤーのゴールドスタンダードです。農場を管理し、料理・製作をこなし、個性豊かなキャラクターたちとの絆を深めながら、ダンジョンに飛び込んでボスと戦う。Switch・PCのスペシャル版は追加コンテンツも充実しており、決定版と言えます。このクイズで紹介した作品の中で、ストーリー、恋愛、戦闘すべての深さが最も高い一作です。',
    desc_ko:
      '룬 팩토리 4는 농장 경영과 모험을 동시에 즐기고 싶은 플레이어를 위한 황금 표준입니다. 농장을 관리하고, 요리와 제작을 하고, 기억에 남는 캐릭터들과 관계를 쌓으면서 던전으로 뛰어들어 보스와 싸웁니다. Switch와 PC의 스페셜 에디션은 추가 콘텐츠를 담은 결정판입니다. 이 퀴즈에서 소개한 모든 게임 중 스토리, 연애, 전투 면에서 가장 깊이 있는 작품입니다.',
    desc_de:
      'Rune Factory 4 ist der Goldstandard für Spieler, die Farming und Abenteuer in gleichem Maße wollen. Du pflegst deine Farm, kochst, baust Dinge, baust Beziehungen zu einem unvergesslichen Cast auf — und tauchst dann in Dungeons ein, um gegen Bosse zu kämpfen. Die Special Edition für Switch und PC fügt neue Inhalte hinzu und ist die definitive Version. Sie bietet mehr Storytiefe, Romantiksystem und Kampftiefe als alle anderen Spiele in diesem Quiz.',
    platform_en: 'Nintendo Switch · Steam',
    platform_zh: 'Nintendo Switch · Steam',
    platform_zhTW: 'Nintendo Switch · Steam',
    platform_ja: 'Nintendo Switch · Steam',
    platform_ko: 'Nintendo Switch · Steam',
    platform_de: 'Nintendo Switch · Steam',
    pro_en: [
      'Best-in-class combination of farming, cooking, crafting, and action RPG combat',
      'Story has two major arcs plus epilogue — substantial narrative depth',
      'Romance routes are among the most developed in the genre',
    ],
    pro_zh: [
      '农场、烹饪、制作和动作 RPG 战斗的最佳综合体',
      '故事有两条主线弧和尾声——叙事深度相当可观',
      '恋爱路线是该类型游戏中最有深度的之一',
    ],
    pro_zhTW: [
      '農場、烹飪、製作和動作 RPG 戰鬥的最佳綜合體',
      '故事有兩條主線弧和尾聲——敘事深度相當可觀',
      '戀愛路線是該類型遊戲中最有深度的之一',
    ],
    pro_ja: [
      '農業・料理・クラフト・アクションRPGを最高バランスで融合',
      'メインストーリーは2つの大きなアークとエピローグを持つ充実の内容',
      '恋愛ルートはこのジャンルで最も作り込まれた部類',
    ],
    pro_ko: [
      '농장, 요리, 제작, 액션 RPG 전투를 최고로 결합한 게임',
      '스토리는 두 개의 큰 아크와 에필로그로 이루어진 탄탄한 구성',
      '연애 루트는 이 장르에서 가장 깊이 있게 만들어진 편에 속함',
    ],
    pro_de: [
      'Bestes Zusammenspiel von Farmen, Kochen, Craften und Action-RPG-Kämpfen',
      'Geschichte hat zwei große Storybögen plus Epilog — beachtliche narrative Tiefe',
      'Romantikpfade gehören zu den am tiefsten ausgearbeiteten im Genre',
    ],
  },
}

function calcResult(answers: Game[]): Game {
  const counts: Record<Game, number> = {
    'mineral-town': 0,
    'wonderful-life': 0,
    'olive-town': 0,
    'rune-factory': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Game
}

export function HarvestMoonQuiz({ locale }: { locale: string }) {
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

  const [answers, setAnswers] = useState<(Game | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Game[])]
    const url = `${BASE_URL}/${locale}/quizzes/harvest-moon-quiz`
    const shareText = getLoc(
      `最适合我的牧场物语游戏是「${result.title_zh}」！快来测测你应该玩哪款：${url}`,
      `My perfect Story of Seasons game is ${result.title_en}! Find yours: ${url}`,
      `最適合我的牧場物語遊戲是「${result.title_zhTW}」！快來測測你應該玩哪款：${url}`,
      `私に合った牧場物語ゲームは「${result.title_ja}」でした！あなたもぜひ試してみて：${url}`,
      `나에게 딱 맞는 목장이야기 게임은 「${result.title_ko}」！당신도 테스트해 보세요：${url}`,
      `Mein perfektes Story of Seasons-Spiel ist ${result.title_de}! Finde deins: ${url}`,
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
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {getLoc(result.platform_zh, result.platform_en, result.platform_zhTW, result.platform_ja, result.platform_ko, result.platform_de)}
          </p>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
        </p>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {getLoc('为什么适合你', 'Why it fits you', '為什麼適合你', 'あなたに合う理由', '왜 어울리나요', 'Warum es zu dir passt')}
          </h3>
          <ul className="space-y-2">
            {getLocArr(result.pro_zh, result.pro_en, result.pro_zhTW, result.pro_ja, result.pro_ko, result.pro_de).map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => {
              setAnswers(Array(QUESTIONS.length).fill(null))
              setSubmitted(false)
            }}
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
            '哪款牧场物语 / 符文工房最适合你？',
            'Which Story of Seasons Game Should You Play?',
            '哪款牧場物語 / 符文工房最適合你？',
            'あなたにぴったりの牧場物語作品は？',
            '어떤 목장이야기 게임이 나에게 맞을까?',
            'Welches Story of Seasons-Spiel passt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，找到最适合你游戏风格的那一款',
            '6 questions to find your perfect match in the Harvest Moon / Story of Seasons series',
            '6 個問題，找到最適合你遊戲風格的那一款',
            '6問で、あなたにぴったりの牧場物語シリーズ作品を見つけよう',
            '6가지 질문으로 나에게 딱 맞는 목장이야기 시리즈 게임 찾기',
            '6 Fragen, um deinen perfekten Match in der Story of Seasons-Reihe zu finden',
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
                  onClick={() => {
                    const next = [...answers]
                    next[qi] = opt.type
                    setAnswers(next)
                  }}
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
          allAnswered
            ? 'bg-[#f0a832] text-[#0f1a0f] hover:bg-[#e09822]'
            : 'cursor-not-allowed bg-[#2d3d2d] text-[#4a5a4a]'
        }`}
      >
        {getLoc(
          '查看推荐',
          'Get My Recommendation',
          '查看推薦',
          'おすすめを見る',
          '추천 결과 보기',
          'Meine Empfehlung anzeigen',
        )}
      </button>
    </div>
  )
}
