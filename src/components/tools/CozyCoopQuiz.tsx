'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'it-takes-two' | 'overcooked-2' | 'plateup' | 'moving-out'

function ShareButton({ text, locale }: { text: string; locale: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    }
  }
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const copiedLabel = getLoc('✓ 已复制！', '✓ Copied!', '✓ 已複製！', '✓ コピーしました！', '✓ 복사되었습니다!', '✓ Kopiert!')
  const copyLabel = getLoc('📋 复制结果', '📋 Copy result', '📋 複製結果', '📋 結果をコピー', '📋 결과 복사', '📋 Ergebnis kopieren')
  const shareLabel = getLoc('分享', 'Share', '分享', 'シェア', '공유', 'Teilen')
  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copied ? copiedLabel : copyLabel}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
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
    q_en: 'How many people are playing?',
    q_zh: '有几个人一起玩？',
    q_zhTW: '有幾個人一起玩？',
    q_ja: '何人で遊びますか？',
    q_ko: '몇 명이 함께 플레이하나요?',
    q_de: 'Wie viele Personen spielen mit?',
    options: [
      {
        en: 'Just 2 — exactly 2, that is the whole point',
        zh: '就 2 个人——恰好 2 人，这就是重点',
        zhTW: '就 2 個人——恰好 2 人，這就是重點',
        ja: '2人だけ——ちょうど2人、それが全てです',
        ko: '딱 2명 — 정확히 2명, 그게 핵심이에요',
        de: 'Genau 2 — exakt 2, das ist der ganze Punkt',
        type: 'it-takes-two',
      },
      {
        en: '2-4 people — flexible, depends who shows up',
        zh: '2-4 人——灵活，取决于来了几个人',
        zhTW: '2-4 人——彈性，取決於來了幾個人',
        ja: '2〜4人——その日によって違います',
        ko: '2-4명 — 유동적이에요, 누가 오느냐에 따라 달라요',
        de: '2-4 Personen — flexibel, je nachdem wer kommt',
        type: 'overcooked-2',
      },
      {
        en: '2-4 people and we want to build something together over time',
        zh: '2-4 人，我们想随着时间一起建造些什么',
        zhTW: '2-4 人，我們想隨著時間一起建造些什麼',
        ja: '2〜4人で、時間をかけて一緒に何かを作りたいです',
        ko: '2-4명이고, 시간을 두고 함께 무언가를 만들고 싶어요',
        de: '2-4 Personen und wir wollen gemeinsam etwas aufbauen',
        type: 'plateup',
      },
      {
        en: '2-4 people and we mostly want to laugh at each other',
        zh: '2-4 人，我们主要想一起笑闹',
        zhTW: '2-4 人，我們主要想一起笑鬧',
        ja: '2〜4人で、とにかく笑いたいです',
        ko: '2-4명이고, 주로 서로를 보며 웃고 싶어요',
        de: '2-4 Personen und wir wollen hauptsächlich übereinander lachen',
        type: 'moving-out',
      },
    ],
  },
  {
    q_en: 'What do you want out of this shared gaming session?',
    q_zh: '你想从这次共同游戏中得到什么？',
    q_zhTW: '你想從這次共同遊戲中得到什麼？',
    q_ja: '今回の共同プレイで何を求めていますか？',
    q_ko: '이번 함께하는 게임 세션에서 무엇을 원하나요?',
    q_de: 'Was erhoffst du dir von dieser gemeinsamen Spielsession?',
    options: [
      {
        en: 'An emotional story we both experience together — something we will remember and talk about',
        zh: '一个我们共同体验的情感故事——我们会记住并谈论的东西',
        zhTW: '一個我們共同體驗的情感故事——我們會記住並談論的東西',
        ja: '2人で体験する感動のストーリー——ずっと語り合えるような思い出',
        ko: '함께 경험하는 감동적인 이야기 — 기억하고 이야기할 무언가',
        de: 'Eine emotionale Geschichte, die wir gemeinsam erleben — etwas, woran wir uns erinnern',
        type: 'it-takes-two',
      },
      {
        en: 'Chaotic fun under real pressure — moments where everything goes wrong and we laugh about it',
        zh: '在真实压力下的混乱乐趣——一切出错的瞬间，然后我们一起大笑',
        zhTW: '在真實壓力下的混亂樂趣——一切出錯的瞬間，然後我們一起大笑',
        ja: '本気のプレッシャーの中での大混乱——全部うまくいかなくて爆笑するあの瞬間',
        ko: '실제 압박감 속의 혼란스러운 재미 — 모든 게 엉망이 되고 웃음이 터지는 순간',
        de: 'Chaotischen Spaß unter echtem Druck — Momente wo alles schiefläuft und wir darüber lachen',
        type: 'overcooked-2',
      },
      {
        en: 'A shared project we keep building across multiple sessions — satisfying steady progress',
        zh: '我们跨越多个游戏时段持续建造的共同项目——令人满足的稳步进展',
        zhTW: '我們跨越多個遊戲時段持續建造的共同項目——令人滿足的穩步進展',
        ja: '複数のセッションをまたいで作り続ける共同プロジェクト——着実な進歩の達成感',
        ko: '여러 세션에 걸쳐 계속 만들어가는 공동 프로젝트 — 꾸준한 발전의 만족감',
        de: 'Ein gemeinsames Projekt, das wir über mehrere Sessions aufbauen — befriedigender stetiger Fortschritt',
        type: 'plateup',
      },
      {
        en: 'Pure absurdist comedy — a game that makes us cry-laugh every single session',
        zh: '纯粹的荒诞喜剧——一款让我们每次都笑到流泪的游戏',
        zhTW: '純粹的荒誕喜劇——一款讓我們每次都笑到流淚的遊戲',
        ja: '純粋なシュールコメディ——毎回涙が出るほど笑えるゲーム',
        ko: '순수한 황당 코미디 — 매 세션마다 눈물이 날 정도로 웃게 만드는 게임',
        de: 'Purer absurder Humor — ein Spiel, das uns jede Session zum Weinen lachen bringt',
        type: 'moving-out',
      },
    ],
  },
  {
    q_en: 'How do you feel about games that require real communication and coordination to succeed?',
    q_zh: '你对需要真正沟通和协调才能成功的游戏感觉如何？',
    q_zhTW: '你對需要真正溝通和協調才能成功的遊戲感覺如何？',
    q_ja: 'クリアするために本当のコミュニケーションと連携が必要なゲームはどうですか？',
    q_ko: '성공하기 위해 진짜 소통과 조율이 필요한 게임에 대해 어떻게 생각하나요?',
    q_de: 'Wie stehst du zu Spielen, bei denen echte Kommunikation und Koordination nötig sind?',
    options: [
      {
        en: 'Yes — working together on clever puzzles is the appeal',
        zh: '是的——在巧妙的谜题上共同合作正是吸引力所在',
        zhTW: '是的——在巧妙的謎題上共同合作正是吸引力所在',
        ja: 'はい——巧みなパズルを一緒に解くのが魅力です',
        ko: '네 — 영리한 퍼즐을 함께 푸는 게 매력이에요',
        de: 'Ja — gemeinsam an cleveren Rätseln zu arbeiten ist der Reiz',
        type: 'it-takes-two',
      },
      {
        en: 'Yes — shouting across the kitchen about who is handling what is half the fun',
        zh: '是的——互相大喊谁负责什么是乐趣的一半',
        zhTW: '是的——互相大喊誰負責什麼是樂趣的一半',
        ja: 'はい——誰が何を担当するかキッチン越しに叫び合うのも楽しさの半分です',
        ko: '네 — 주방을 가로질러 누가 무엇을 맡는지 소리치는 게 절반의 재미예요',
        de: 'Ja — sich gegenseitig zuzurufen wer was macht ist die Hälfte des Spaßes',
        type: 'overcooked-2',
      },
      {
        en: 'Yes — planning our restaurant layout together is why we are playing',
        zh: '是的——一起规划餐厅布局正是我们玩这款游戏的原因',
        zhTW: '是的——一起規劃餐廳布局正是我們玩這款遊戲的原因',
        ja: 'はい——レストランのレイアウトを一緒に計画するためにプレイしています',
        ko: '네 — 레스토랑 레이아웃을 함께 계획하는 게 플레이 이유예요',
        de: 'Ja — gemeinsam unser Restaurantlayout zu planen ist der Grund warum wir spielen',
        type: 'plateup',
      },
      {
        en: "Not really — we want to laugh at how wrong things go, not coordinate perfectly",
        zh: '不太需要——我们想笑看事情有多糟糕，而不是完美协调',
        zhTW: '不太需要——我們想笑看事情有多糟糕，而不是完美協調',
        ja: 'あまり——完璧に連携するよりも、どれだけ失敗するかを笑いたいです',
        ko: '별로요 — 완벽하게 조율하기보다 얼마나 엉망이 되는지 웃고 싶어요',
        de: 'Nicht wirklich — wir wollen über das Chaos lachen, nicht perfekt koordinieren',
        type: 'moving-out',
      },
    ],
  },
  {
    q_en: 'How long do you want a single game session to be?',
    q_zh: '你想要单次游戏时段持续多长时间？',
    q_zhTW: '你想要單次遊戲時段持續多長時間？',
    q_ja: '1回のゲームセッションはどのくらいの長さが理想ですか？',
    q_ko: '한 번의 게임 세션이 얼마나 길었으면 좋겠나요?',
    q_de: 'Wie lange soll eine einzelne Spielsession sein?',
    options: [
      {
        en: '2-3 hours per chapter — it is a proper story we are working through together',
        zh: '每章 2-3 小时——这是我们一起经历的正式故事',
        zhTW: '每章 2-3 小時——這是我們一起經歷的正式故事',
        ja: '1章につき2〜3時間——一緒に進める本格的なストーリーです',
        ko: '챕터당 2-3시간 — 함께 헤쳐나가는 제대로 된 이야기예요',
        de: '2-3 Stunden pro Kapitel — das ist eine richtige Geschichte die wir gemeinsam durchspielen',
        type: 'it-takes-two',
      },
      {
        en: '30-60 minute sessions — we want a clear beginning and end each time',
        zh: '30-60 分钟的时段——我们每次都想有清晰的开始和结束',
        zhTW: '30-60 分鐘的時段——我們每次都想有清晰的開始和結束',
        ja: '30〜60分のセッション——毎回明確な始まりと終わりが欲しいです',
        ko: '30-60분 세션 — 매번 명확한 시작과 끝이 있었으면 해요',
        de: '30-60 Minuten Sessions — wir wollen jedes Mal einen klaren Anfang und ein Ende',
        type: 'overcooked-2',
      },
      {
        en: 'Open-ended — we want to drop in and continue building whenever we have time',
        zh: '开放式——我们想随时加入并继续建造，只要有时间',
        zhTW: '開放式——我們想隨時加入並繼續建造，只要有時間',
        ja: 'オープンエンド——時間があるときにいつでも続きから建設したいです',
        ko: '열린 형식 — 시간이 날 때마다 들어와서 계속 만들고 싶어요',
        de: 'Offen — wir wollen jederzeit einspringen und weiterbauen wenn wir Zeit haben',
        type: 'plateup',
      },
      {
        en: '20-45 minutes — quick rounds, instant laughs, easy to pick up and put down',
        zh: '20-45 分钟——快速轮次，即时欢笑，容易拿起放下',
        zhTW: '20-45 分鐘——快速輪次，即時歡笑，容易拿起放下',
        ja: '20〜45分——短いラウンドで即笑い、気軽に始めて終われます',
        ko: '20-45분 — 빠른 라운드, 즉각적인 웃음, 쉽게 시작하고 끝낼 수 있어요',
        de: '20-45 Minuten — kurze Runden, sofortiger Spaß, leicht aufzunehmen und abzulegen',
        type: 'moving-out',
      },
    ],
  },
  {
    q_en: 'What would make this game session feel successful?',
    q_zh: '什么会让这次游戏时段感觉很成功？',
    q_zhTW: '什麼會讓這次遊戲時段感覺很成功？',
    q_ja: 'どんな結果になればこのゲームセッションは成功だと感じますか？',
    q_ko: '어떤 결과가 이번 게임 세션을 성공적으로 느끼게 할까요?',
    q_de: 'Was würde diese Spielsession für dich erfolgreich machen?',
    options: [
      {
        en: "We finished a chapter, talked about what happened, and one of us might have teared up",
        zh: '我们完成了一章，谈论了发生的事情，其中一个人可能眼眶湿润了',
        zhTW: '我們完成了一章，談論了發生的事情，其中一個人可能眼眶濕潤了',
        ja: '1章をクリアして、起きたことについて話し合い、どちらかが涙ぐんでいたかもしれません',
        ko: '챕터를 완료하고, 일어난 일에 대해 이야기하고, 한 명이 눈물을 훔쳤을 수도 있어요',
        de: 'Wir haben ein Kapitel beendet, darüber geredet und einer von uns hat vielleicht geweint',
        type: 'it-takes-two',
      },
      {
        en: 'We barely survived the hardest level and earned a star we are proud of',
        zh: '我们勉强完成了最难的关卡，获得了我们引以为傲的一颗星',
        zhTW: '我們勉強完成了最難的關卡，獲得了我們引以為傲的一顆星',
        ja: '最難関ステージをギリギリクリアして、誇らしいスターを獲得しました',
        ko: '가장 어려운 레벨을 간신히 버텨내고 자랑스러운 별을 획득했어요',
        de: 'Wir haben das schwerste Level kaum überlebt und einen Stern errungen auf den wir stolz sind',
        type: 'overcooked-2',
      },
      {
        en: 'We unlocked a new kitchen upgrade and our restaurant survived the dinner rush',
        zh: '我们解锁了新的厨房升级，我们的餐厅撑过了晚餐高峰期',
        zhTW: '我們解鎖了新的廚房升級，我們的餐廳撐過了晚餐高峰期',
        ja: '新しいキッチンアップグレードを解除して、ディナーラッシュを乗り越えました',
        ko: '새로운 주방 업그레이드를 해제하고 레스토랑이 저녁 피크 타임을 버텨냈어요',
        de: 'Wir haben ein neues Küchenupgrade freigeschaltet und unser Restaurant hat den Abendansturm überlebt',
        type: 'plateup',
      },
      {
        en: 'We got the sofa through the tiny window and screamed about it for 10 minutes straight',
        zh: '我们把沙发从那个小窗口弄进去了，然后连续为此尖叫了 10 分钟',
        zhTW: '我們把沙發從那個小窗口弄進去了，然後連續為此尖叫了 10 分鐘',
        ja: '小さな窓からソファを通すことができて、10分間ぶっ通しで叫び続けました',
        ko: '작은 창문으로 소파를 통과시키는 데 성공해서 10분 내내 소리를 질렀어요',
        de: 'Wir haben das Sofa durch das winzige Fenster bekommen und 10 Minuten lang geschrien',
        type: 'moving-out',
      },
    ],
  },
  {
    q_en: 'Which best describes the gaming dynamic you have with this person?',
    q_zh: '哪个最能描述你和这个人的游戏互动关系？',
    q_zhTW: '哪個最能描述你和這個人的遊戲互動關係？',
    q_ja: 'この人とのゲームの関係性を最もよく表しているのはどれですか？',
    q_ko: '이 사람과의 게임 관계를 가장 잘 설명하는 것은 무엇인가요?',
    q_de: 'Was beschreibt deine Spieledynamik mit dieser Person am besten?',
    options: [
      {
        en: 'We want to feel emotionally connected — this game should bring us closer',
        zh: '我们想要情感上的连接——这款游戏应该让我们更亲近',
        zhTW: '我們想要情感上的連結——這款遊戲應該讓我們更親近',
        ja: '感情的なつながりを感じたい——このゲームで2人の絆を深めたいです',
        ko: '감정적으로 연결되고 싶어요 — 이 게임이 우리를 더 가깝게 만들어줬으면 해요',
        de: 'Wir wollen uns emotional verbunden fühlen — dieses Spiel soll uns näherbringen',
        type: 'it-takes-two',
      },
      {
        en: 'We are competitive in a friendly way and love the pressure of performing under time limits',
        zh: '我们以友好的方式很有竞争性，喜欢在时间限制下表现的压力',
        zhTW: '我們以友好的方式很有競爭性，喜歡在時間限制下表現的壓力',
        ja: '友好的な競争心があって、制限時間内でのプレッシャーが好きです',
        ko: '친근한 방식으로 경쟁적이고, 시간 제한 안에서 플레이하는 압박감을 좋아해요',
        de: 'Wir sind freundschaftlich kompetitiv und lieben den Druck unter Zeitlimits zu spielen',
        type: 'overcooked-2',
      },
      {
        en: 'We work well together strategically and enjoy planning and optimizing systems',
        zh: '我们在策略上配合默契，享受规划和优化系统',
        zhTW: '我們在策略上配合默契，享受規劃和優化系統',
        ja: '戦略的に息が合っていて、システムの計画と最適化を楽しんでいます',
        ko: '전략적으로 잘 맞고, 시스템을 계획하고 최적화하는 걸 즐겨요',
        de: 'Wir arbeiten strategisch gut zusammen und genießen Planung und Systemoptimierung',
        type: 'plateup',
      },
      {
        en: 'We have zero coordination but infinite ability to find everything funny',
        zh: '我们零协调能力但有无限的能力发现一切都很好笑',
        zhTW: '我們零協調能力但有無限的能力發現一切都很好笑',
        ja: '連携はゼロだけど、何でも笑いに変える能力は無限大です',
        ko: '조율 능력은 제로지만 모든 걸 웃음거리로 만드는 능력은 무한해요',
        de: 'Wir haben null Koordination aber unendlich viel Fähigkeit alles lustig zu finden',
        type: 'moving-out',
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
  'it-takes-two': {
    title_en: 'It Takes Two',
    title_zh: 'It Takes Two（双人成行）',
    title_zhTW: 'It Takes Two（雙人成行）',
    title_ja: 'It Takes Two（イット・テイクス・トゥー）',
    title_ko: 'It Takes Two (잇 테이크스 투)',
    title_de: 'It Takes Two',
    emoji: '💑',
    tag_en: 'The most acclaimed co-op story game ever made — for exactly two players',
    tag_zh: '有史以来最受好评的合作故事游戏——专为两位玩家设计',
    tag_zhTW: '有史以來最受好評的合作故事遊戲——專為兩位玩家設計',
    tag_ja: 'これまでで最も高く評価された協力ストーリーゲーム——2人専用',
    tag_ko: '역대 가장 호평받은 협동 스토리 게임 — 정확히 두 명을 위한',
    tag_de: 'Das meistgelobte Co-op-Storyspiel aller Zeiten — für genau zwei Spieler',
    platform_en: 'Available on: PC (Steam/EA App), PlayStation 4/5, Xbox, Nintendo Switch',
    platform_zh: '可在以下平台获取：PC（Steam/EA App）、PlayStation 4/5、Xbox、Nintendo Switch',
    platform_zhTW: '可在以下平台取得：PC（Steam/EA App）、PlayStation 4/5、Xbox、Nintendo Switch',
    platform_ja: '対応プラットフォーム：PC（Steam/EA App）、PlayStation 4/5、Xbox、Nintendo Switch',
    platform_ko: '플레이 가능 플랫폼: PC (Steam/EA App), PlayStation 4/5, Xbox, Nintendo Switch',
    platform_de: 'Erhältlich auf: PC (Steam/EA App), PlayStation 4/5, Xbox, Nintendo Switch',
    why_en:
      "It Takes Two won Game of the Year at every major award show in 2021, and it deserved every one. You play as a couple on the verge of divorce who are magically shrunk to the size of toys by their daughter's wish. The game sends you through a surreal, constantly-changing journey — one chapter has you playing as sentient tools in a woodshop, another has you in a snow globe, another in a honeybee hive. Every chapter introduces brand-new mechanics you have never seen before and will never see again. The game is ONLY playable by exactly two players and is designed from the ground up as a shared experience. One copy purchased on PC lets both players play through a 'friend pass' at no extra cost. At 10-12 hours, it is the perfect length to play through across a few evenings. There is nothing else quite like it.",
    why_zh:
      '双人成行在 2021 年赢得了每个主要颁奖典礼的年度最佳游戏奖，这些奖项都是实至名归的。你扮演一对濒临离婚的夫妻，被女儿的愿望神奇地缩小到玩具大小。游戏带你踏上一段超现实的、不断变化的旅程——一章让你在木工坊里扮演有意识的工具，另一章在雪球里，另一章在蜜蜂蜂巢中。每一章都引入你从未见过、也永远不会再见到的全新机制。游戏只能由恰好两名玩家玩，从头开始设计为共同体验。在 PC 上购买一份，两名玩家都可以通过"好友通行证"免费游玩全程。10-12 小时的长度是在几个晚上完成游玩的完美时长。没有其他任何游戏与它相似。',
    why_zhTW:
      '雙人成行在 2021 年贏得了每個主要頒獎典禮的年度最佳遊戲獎，這些獎項都是實至名歸的。你扮演一對瀕臨離婚的夫妻，被女兒的願望神奇地縮小到玩具大小。遊戲帶你踏上一段超現實的、不斷變化的旅程——一章讓你在木工坊裡扮演有意識的工具，另一章在雪球裡，另一章在蜜蜂蜂巢中。每一章都引入你從未見過、也永遠不會再見到的全新機制。遊戲只能由恰好兩名玩家玩，從頭開始設計為共同體驗。在 PC 上購買一份，兩名玩家都可以透過「好友通行證」免費遊玩全程。10-12 小時的長度是在幾個晚上完成遊玩的完美時長。沒有其他任何遊戲與它相似。',
    why_ja:
      'イット・テイクス・トゥーは2021年のあらゆる主要アワードでゲームオブザイヤーを受賞しました。どれも文句なしの受賞です。プレイヤーは離婚寸前の夫婦を操り、娘の願いで魔法のようにおもちゃサイズに縮められてしまいます。超現実的で常に変化する旅が続き——ある章では木工所で意思を持つ道具として活躍し、別の章ではスノーグローブの中、また別の章ではミツバチの巣の中で冒険します。各章は今まで見たことのないまったく新しいメカニクスを導入し、その章限りで終わります。ゲームはちょうど2人専用で、最初から共同体験として設計されています。PC版を1本購入すれば「フレンドパス」でもう1人も追加費用なしでプレイできます。10〜12時間というボリュームは、数晩かけてプレイするのにちょうどよい長さです。これほど他にないゲームです。',
    why_ko:
      'It Takes Two는 2021년 모든 주요 시상식에서 올해의 게임을 수상했으며, 그 모든 수상이 마땅했습니다. 이혼 위기에 처한 부부를 조작하며, 딸의 소원으로 마법처럼 장난감 크기로 작아지게 됩니다. 게임은 초현실적이고 끊임없이 변화하는 여정으로 안내합니다 — 한 챕터에서는 목공소의 의식 있는 도구로 플레이하고, 다른 챕터에서는 스노우 글로브 안에서, 또 다른 챕터에서는 꿀벌 벌집 안에서 펼쳐집니다. 각 챕터는 이전에 본 적 없고 다시는 볼 수 없는 완전히 새로운 메카닉을 도입합니다. 게임은 정확히 두 명만 플레이할 수 있으며, 처음부터 공유 경험으로 설계되었습니다. PC에서 한 카피를 구매하면 두 플레이어 모두 추가 비용 없이 \'친구 패스\'로 플레이할 수 있습니다. 10-12시간의 분량은 며칠 저녁에 걸쳐 완주하기에 완벽한 길이입니다. 이것과 비슷한 게임은 없습니다.',
    why_de:
      'It Takes Two hat 2021 bei jeder großen Preisverleihung das Spiel des Jahres gewonnen — und das völlig zu Recht. Du spielst ein Paar kurz vor der Scheidung, das von der Tochter magisch auf Spielzeuggröße geschrumpft wird. Das Spiel schickt euch auf eine surreale, sich ständig verändernde Reise — ein Kapitel spielt ihr als bewusste Werkzeuge in einer Tischlerei, ein anderes in einer Schneekugel, ein weiteres in einem Bienenstock. Jedes Kapitel führt völlig neue Mechaniken ein, die ihr vorher nie gesehen habt und danach nie wieder sehen werdet. Das Spiel ist NUR mit genau zwei Spielern spielbar und von Grund auf als gemeinsames Erlebnis konzipiert. Kauft ihr eine PC-Kopie, können beide Spieler kostenlos via \'Freundespass\' spielen. Mit 10-12 Stunden ist es die perfekte Länge für ein paar Abende. Es gibt nichts Vergleichbares.',
    tip_en: 'Do not look anything up — the delight is in discovering what completely unexpected genre the game becomes next.',
    tip_zh: '不要查任何攻略——乐趣就在于发现这款游戏接下来会变成什么完全意想不到的类型。',
    tip_zhTW: '不要查任何攻略——樂趣就在於發現這款遊戲接下來會變成什麼完全意想不到的類型。',
    tip_ja: '攻略は調べないで——次にどんなジャンルになるか、予想外の展開を発見するのが醍醐味です。',
    tip_ko: '아무것도 검색하지 마세요 — 다음에 게임이 완전히 예상치 못한 어떤 장르가 되는지 발견하는 게 즐거움이에요.',
    tip_de: 'Schaut nichts nach — das Vergnügen liegt darin zu entdecken welches völlig unerwartete Genre das Spiel als nächstes wird.',
  },
  'overcooked-2': {
    title_en: 'Overcooked! 2',
    title_zh: 'Overcooked! 2（胡闹厨房 2）',
    title_zhTW: 'Overcooked! 2（胡鬧廚房 2）',
    title_ja: 'Overcooked! 2（オーバークック！2）',
    title_ko: 'Overcooked! 2 (오버쿡드! 2)',
    title_de: 'Overcooked! 2',
    emoji: '👨‍🍳',
    tag_en: 'Chaotic co-op cooking game — the best screaming-at-each-other party game',
    tag_zh: '混乱合作烹饪游戏——最好的互相大喊派对游戏',
    tag_zhTW: '混亂合作烹飪遊戲——最好的互相大喊派對遊戲',
    tag_ja: 'カオスな協力料理ゲーム——お互いに叫び合うパーティゲームの王道',
    tag_ko: '혼란스러운 협동 요리 게임 — 서로에게 소리치는 최고의 파티 게임',
    tag_de: 'Chaotisches Co-op-Kochspiel — das beste Spiel bei dem man sich gegenseitig anbrüllt',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox — often included in Game Pass/PS Plus',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox——通常包含在 Game Pass/PS Plus 中',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox——通常包含在 Game Pass/PS Plus 中',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox — Game Pass/PS Plusに含まれることも',
    platform_ko: '플레이 가능 플랫폼: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox — Game Pass/PS Plus에 자주 포함',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox — oft in Game Pass/PS Plus enthalten',
    why_en:
      "Overcooked! 2 is the definitive version of the Overcooked formula — and that formula is one of the most reliably fun co-op experiences ever made. The concept is simple: you and 1-3 other players run a kitchen, preparing and serving dishes against a time limit. Chop the ingredients, cook them in the right order, plate them, and send them out — while the kitchen is on fire, literally moving apart, or has recipes that involve throwing ingredients across gaps. The game provides immediate, honest feedback on exactly how well you cooperate with the people you play with. It sounds stressful and it absolutely is — but the chaos creates memories. The 'I cannot believe we got three stars on that level' feeling is unlike any other game. Supports 2-4 players locally and online.",
    why_zh:
      'Overcooked! 2 是 Overcooked 公式的最终版本——而这个公式是有史以来最可靠有趣的合作体验之一。概念很简单：你和 1-3 位其他玩家经营一个厨房，在时间限制内准备和供应菜肴。切配料、按正确顺序烹饪、摆盘、送出去——而厨房在起火，字面意义上分开移动，或者有需要跨越空隙抛掷配料的食谱。这款游戏对你和共同游玩的人之间合作得多好给出直接、诚实的反馈。这听起来很有压力，确实如此——但混乱创造了回忆。"我不敢相信我们在那个关卡得了三颗星"的感觉是其他任何游戏都无法给予的。支持 2-4 人本地和在线游玩。',
    why_zhTW:
      'Overcooked! 2 是 Overcooked 公式的最終版本——而這個公式是有史以來最可靠有趣的合作體驗之一。概念很簡單：你和 1-3 位其他玩家經營一個廚房，在時間限制內準備和供應菜餚。切食材、按正確順序烹飪、擺盤、送出去——而廚房在起火，字面意義上分開移動，或者有需要跨越空隙拋擲食材的食譜。這款遊戲對你和共同遊玩的人之間合作得多好給出直接、誠實的回饋。這聽起來很有壓力，確實如此——但混亂創造了回憶。「我不敢相信我們在那個關卡得了三顆星」的感覺是其他任何遊戲都無法給予的。支援 2-4 人本地和線上遊玩。',
    why_ja:
      'オーバークック！2はオーバークックの公式の決定版です——そしてその公式は、これまでに作られた中で最も安定して楽しい協力体験のひとつです。コンセプトはシンプル：あなたと1〜3人のプレイヤーがキッチンを運営し、制限時間内に料理を準備して提供します。食材を切り、正しい順序で調理し、盛り付けて提供する——キッチンが燃えていたり、文字通り分裂して動いていたり、すき間を越えて食材を投げなければならないレシピがある中で。このゲームは、一緒にプレイする人とどれだけうまく協力できているかについて、即座に正直なフィードバックを与えてくれます。ストレスに聞こえますが、実際そうです——でもそのカオスが思い出を作ります。「あのステージで3スター取れたなんて信じられない」という感覚は他のゲームでは味わえません。2〜4人のローカルおよびオンライン対応。',
    why_ko:
      'Overcooked! 2는 오버쿡드 공식의 결정판입니다 — 그리고 그 공식은 지금까지 만들어진 것 중 가장 안정적으로 재미있는 협동 경험 중 하나입니다. 개념은 간단합니다: 1-3명과 함께 주방을 운영하며 시간 제한 안에 요리를 준비하고 제공합니다. 재료를 자르고, 올바른 순서로 조리하고, 플레이팅하고, 내보내세요 — 주방이 불타거나, 문자 그대로 분리되어 움직이거나, 틈새를 가로질러 재료를 던져야 하는 레시피가 있는 가운데. 이 게임은 함께 플레이하는 사람들과 얼마나 잘 협력하는지에 대해 즉각적이고 솔직한 피드백을 제공합니다. 스트레스가 들릴 수 있고 실제로도 그렇습니다 — 하지만 그 혼돈이 추억을 만듭니다. "그 레벨에서 별 세 개를 받다니 믿을 수 없어"라는 느낌은 다른 게임에서는 경험할 수 없습니다. 2-4인 로컬 및 온라인 지원.',
    why_de:
      'Overcooked! 2 ist die definitive Version der Overcooked-Formel — und diese Formel ist eine der zuverlässig spaßigsten Co-op-Erfahrungen überhaupt. Das Konzept ist einfach: Du und 1-3 andere Spieler betreibt eine Küche und bereitet Gerichte gegen eine Zeitbegrenzung vor. Zutaten schneiden, in der richtigen Reihenfolge kochen, anrichten und rausschicken — während die Küche brennt, sich buchstäblich auseinanderbewegt oder Rezepte hat bei denen man Zutaten über Lücken werfen muss. Das Spiel gibt dir ehrliches sofortiges Feedback darüber wie gut ihr zusammenarbeitet. Es klingt stressig und das ist es absolut — aber das Chaos schafft Erinnerungen. Das Gefühl "ich kann nicht glauben dass wir auf dem Level drei Sterne geholt haben" ist einzigartig. Unterstützt 2-4 Spieler lokal und online.',
    tip_en: "Always designate one person to be the 'caller' who announces what orders are coming in — prevents the most common communication breakdown.",
    tip_zh: '始终指定一个人担任"报单者"，宣布即将到来的订单——防止最常见的沟通崩溃。',
    tip_zhTW: '始終指定一個人擔任「報單者」，宣布即將到來的訂單——防止最常見的溝通崩潰。',
    tip_ja: '常に1人を「アナウンス係」に指名して、入ってくる注文を宣言させましょう——最もよくあるコミュニケーション崩壊を防げます。',
    tip_ko: '항상 한 명을 들어오는 주문을 알리는 \'콜러\'로 지정하세요 — 가장 흔한 소통 붕괴를 예방할 수 있어요.',
    tip_de: 'Bestimmt immer eine Person als "Ansager" der ankündigt welche Bestellungen reinkommen — verhindert den häufigsten Kommunikationseinbruch.',
  },
  plateup: {
    title_en: 'PlateUp!',
    title_zh: 'PlateUp!',
    title_zhTW: 'PlateUp!',
    title_ja: 'PlateUp!（プレートアップ！）',
    title_ko: 'PlateUp!',
    title_de: 'PlateUp!',
    emoji: '🍽️',
    tag_en: 'Co-op restaurant builder — plan your kitchen together, then survive dinner rush',
    tag_zh: '合作餐厅建造游戏——一起规划厨房，然后撑过晚餐高峰',
    tag_zhTW: '合作餐廳建造遊戲——一起規劃廚房，然後撐過晚餐高峰',
    tag_ja: '協力レストランビルダー——一緒にキッチンを設計して、ディナーラッシュを乗り越えよう',
    tag_ko: '협동 레스토랑 빌더 — 함께 주방을 계획하고 저녁 피크 타임을 버텨내세요',
    tag_de: 'Co-op-Restaurantbauer — plant gemeinsam eure Küche und überlebt den Abendansturm',
    platform_en: 'Available on: PC (Steam), PlayStation 4/5, Xbox, Nintendo Switch',
    platform_zh: '可在以下平台获取：PC（Steam）、PlayStation 4/5、Xbox、Nintendo Switch',
    platform_zhTW: '可在以下平台取得：PC（Steam）、PlayStation 4/5、Xbox、Nintendo Switch',
    platform_ja: '対応プラットフォーム：PC（Steam）、PlayStation 4/5、Xbox、Nintendo Switch',
    platform_ko: '플레이 가능 플랫폼: PC (Steam), PlayStation 4/5, Xbox, Nintendo Switch',
    platform_de: 'Erhältlich auf: PC (Steam), PlayStation 4/5, Xbox, Nintendo Switch',
    why_en:
      "PlateUp! is for players who want more strategy and planning in their co-op cooking experience than Overcooked provides. Instead of playing pre-designed levels, you build your own restaurant from scratch — choosing the layout, placing equipment, designing the workflow — and then survive increasingly intense dinner services with the kitchen you built. The planning phase is collaborative and satisfying: where should the prep stations go? How do we route the food from oven to counter? What recipes are we even going to serve? Then the service phase puts your plan to the test under real pressure. Each day you earn money to upgrade your kitchen and expand the menu. The game has a deep automation system that lets you eventually run parts of the kitchen on autopilot, which is deeply satisfying for players who like optimization. 1-4 players, local and online.",
    why_zh:
      'PlateUp! 适合那些在合作烹饪体验中想要比 Overcooked 提供更多策略和规划的玩家。与其玩预先设计的关卡，你从头建造自己的餐厅——选择布局、放置设备、设计工作流程——然后用你建造的厨房撑过越来越紧张的晚餐服务。规划阶段是协作性的且令人满足的：备料台应该放在哪里？我们如何将食物从烤箱路由到柜台？我们甚至要供应什么菜肴？然后服务阶段在真实压力下检验你的计划。每天你赚钱升级厨房和扩展菜单。这款游戏有一个深度自动化系统，让你最终可以让厨房的部分工作自动运行，对于喜欢优化的玩家来说非常令人满足。1-4 人，本地和在线。',
    why_zhTW:
      'PlateUp! 適合那些在合作烹飪體驗中想要比 Overcooked 提供更多策略和規劃的玩家。與其玩預先設計的關卡，你從頭建造自己的餐廳——選擇布局、放置設備、設計工作流程——然後用你建造的廚房撐過越來越緊張的晚餐服務。規劃階段是協作性的且令人滿足的：備料台應該放在哪裡？我們如何將食物從烤箱路由到櫃台？我們甚至要供應什麼菜餚？然後服務階段在真實壓力下檢驗你的計劃。每天你賺錢升級廚房和擴展菜單。這款遊戲有一個深度自動化系統，讓你最終可以讓廚房的部分工作自動運行，對於喜歡優化的玩家來說非常令人滿足。1-4 人，本地和線上。',
    why_ja:
      'プレートアップ！は、オーバークックよりも戦略と計画性を求める協力料理ゲームファンのための作品です。あらかじめデザインされたステージをプレイするのではなく、自分たちのレストランをゼロから作り上げます——レイアウトを選び、設備を配置し、ワークフローを設計して——そして自分たちが作ったキッチンでどんどん激しくなるディナーサービスを乗り越えていきます。計画フェーズは協力的で達成感があります：仕込み台はどこに置く？オーブンからカウンターへの動線は？何の料理を出すの？そしてサービスフェーズが、あなたたちの計画を実際のプレッシャーの下で試します。毎日お金を稼いでキッチンをアップグレードし、メニューを拡大していきます。ゲームには深い自動化システムがあり、最終的にキッチンの一部をオートパイロットで動かせるようになります——最適化好きのプレイヤーには最高の満足感です。1〜4人、ローカルおよびオンライン対応。',
    why_ko:
      'PlateUp!은 Overcooked가 제공하는 것보다 더 많은 전략과 계획을 협동 요리 경험에서 원하는 플레이어를 위한 게임입니다. 미리 설계된 레벨을 플레이하는 대신, 레스토랑을 처음부터 만들어갑니다 — 레이아웃을 선택하고, 장비를 배치하고, 워크플로를 설계한 다음 직접 만든 주방으로 점점 더 격렬해지는 저녁 서비스를 버텨냅니다. 계획 단계는 협력적이고 만족스럽습니다: 준비 스테이션은 어디에 둬야 할까요? 오븐에서 카운터로 음식을 어떻게 이동시킬까요? 도대체 어떤 요리를 제공할 건가요? 그런 다음 서비스 단계가 실제 압박 속에서 당신의 계획을 시험합니다. 매일 돈을 벌어 주방을 업그레이드하고 메뉴를 확장합니다. 게임에는 궁극적으로 주방의 일부를 자동 조종으로 운영할 수 있게 해주는 깊은 자동화 시스템이 있어, 최적화를 좋아하는 플레이어에게 매우 만족스럽습니다. 1-4인, 로컬 및 온라인.',
    why_de:
      'PlateUp! ist für Spieler die bei ihrem Co-op-Kocherlebnis mehr Strategie und Planung wollen als Overcooked bietet. Statt vordesignter Level baut ihr euer eigenes Restaurant von Grund auf — wählt das Layout, platziert Ausrüstung, designed den Workflow — und überlebt dann immer intensivere Abendservices mit der Küche die ihr gebaut habt. Die Planungsphase ist kollaborativ und befriedigend: Wo sollen die Vorbereitungsstationen hin? Wie routen wir das Essen vom Ofen zur Theke? Was kochen wir eigentlich? Dann prüft die Servicephase euren Plan unter echtem Druck. Jeden Tag verdient ihr Geld um eure Küche aufzurüsten und die Karte zu erweitern. Das Spiel hat ein tiefes Automatisierungssystem mit dem ihr Teile der Küche irgendwann auf Autopilot laufen lassen könnt — sehr befriedigend für Optimierungsfreunde. 1-4 Spieler, lokal und online.',
    tip_en: 'Spend the first three in-game days just planning your kitchen layout before you start serving — the time invested in setup pays back immediately.',
    tip_zh: '在开始供应之前，用前三个游戏内的天数规划你的厨房布局——投入设置的时间会立即得到回报。',
    tip_zhTW: '在開始供應之前，用前三個遊戲內的天數規劃你的廚房布局——投入設置的時間會立即得到回報。',
    tip_ja: 'サービスを始める前に、最初の3ゲーム内日数をキッチンレイアウトの計画だけに使いましょう——セットアップに投資した時間はすぐに回収できます。',
    tip_ko: '서빙을 시작하기 전에 처음 세 인게임 날을 주방 레이아웃 계획에만 쓰세요 — 셋업에 투자한 시간은 즉시 보상받아요.',
    tip_de: 'Verbringt die ersten drei Spieltage nur mit der Planung eures Küchenlayouts bevor ihr anfangt zu servieren — die Zeit die ihr in den Aufbau investiert zahlt sich sofort aus.',
  },
  'moving-out': {
    title_en: 'Moving Out',
    title_zh: 'Moving Out（搬家模拟器）',
    title_zhTW: 'Moving Out（搬家模擬器）',
    title_ja: 'Moving Out（ムービングアウト）',
    title_ko: 'Moving Out (무빙 아웃)',
    title_de: 'Moving Out',
    emoji: '🛋️',
    tag_en: 'Absurdist co-op comedy — throw furniture out windows, fail perfectly, laugh forever',
    tag_zh: '荒诞合作喜剧——把家具扔出窗外、完美失败、永远大笑',
    tag_zhTW: '荒誕合作喜劇——把家具扔出窗外、完美失敗、永遠大笑',
    tag_ja: 'シュールな協力コメディ——窓から家具を投げ、完璧に失敗して、ずっと笑い続けよう',
    tag_ko: '황당한 협동 코미디 — 창문으로 가구를 던지고, 완벽하게 실패하고, 영원히 웃어요',
    tag_de: 'Absurde Co-op-Komödie — wirf Möbel aus Fenstern, scheitere perfekt, lach für immer',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4, Xbox — often included in Game Pass',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4、Xbox——通常包含在 Game Pass 中',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PlayStation 4、Xbox——通常包含在 Game Pass 中',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PlayStation 4、Xbox — Game Passに含まれることも',
    platform_ko: '플레이 가능 플랫폼: PC (Steam), Nintendo Switch, PlayStation 4, Xbox — Game Pass에 자주 포함',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PlayStation 4, Xbox — oft in Game Pass enthalten',
    why_en:
      "Moving Out is the answer to the question: 'What if Overcooked was about moving furniture and also completely absurd?' You play as professional movers (loosely defined) hired to clear homes of furniture. The moving van is at one end, the furniture is inside, and absolutely nothing about how you accomplish this needs to make physical sense. The game actively celebrates throwing, launching, and catapulting furniture through windows, off roofs, and out of second-floor balconies. The physics engine is deliberately chaotic. Levels include increasingly surreal settings — an active ghost house, a farm with animals to avoid, a superhero's lair. The game has accessibility options that let you reduce the time pressure or difficulty so anyone can play. It has never once been described as stressful. It has been described as making people 'unable to breathe from laughing' in every single Steam review. 2-4 players, local and online.",
    why_zh:
      '搬家模拟器是这个问题的答案："如果 Overcooked 是关于搬运家具，而且完全荒诞，会怎样？"你扮演（宽泛定义的）专业搬运工，被雇来清空房屋的家具。搬家车在一端，家具在里面，而你如何完成这件事完全不需要在物理上合理。游戏积极庆祝通过窗户、从屋顶上、从二楼阳台扔、发射和弹射家具。物理引擎故意设计得很混乱。关卡包括越来越超现实的设置——一个活跃的鬼屋、一个有动物需要回避的农场、一个超级英雄的巢穴。游戏有无障碍选项，让你减少时间压力或难度，所以任何人都可以玩。它从来没有被描述为压力大。在每一条 Steam 评测中，它都被描述为让人"笑到无法呼吸"。2-4 人，本地和在线。',
    why_zhTW:
      '搬家模擬器是這個問題的答案：「如果 Overcooked 是關於搬運家具，而且完全荒誕，會怎樣？」你扮演（廣泛定義的）專業搬運工，被雇來清空房屋的家具。搬家車在一端，家具在裡面，而你如何完成這件事完全不需要在物理上合理。遊戲積極慶祝透過窗戶、從屋頂上、從二樓陽台扔、發射和彈射家具。物理引擎故意設計得很混亂。關卡包括越來越超現實的設置——一個活躍的鬼屋、一個有動物需要回避的農場、一個超級英雄的巢穴。遊戲有無障礙選項，讓你減少時間壓力或難度，所以任何人都可以玩。它從來沒有被描述為壓力大。在每一條 Steam 評測中，它都被描述為讓人「笑到無法呼吸」。2-4 人，本地和線上。',
    why_ja:
      'ムービングアウトは「もしオーバークックが家具の引っ越しについてで、しかも完全にシュールだったら？」という問いへの答えです。あなたは（大まかな定義での）プロの引っ越し屋として、家から家具を運び出す仕事を請け負います。引っ越しトラックは一方の端にあり、家具は中にある——そして、これをどう達成するかについて、物理的に理にかなっている必要は一切ありません。ゲームは家具を窓から投げたり、屋根から飛ばしたり、二階のバルコニーから弾き飛ばしたりすることを積極的に称えます。物理エンジンは意図的にカオスに設計されています。レベルはどんどん超現実的な舞台になっていきます——幽霊が出るお化け屋敷、動物をよけながら進む農場、スーパーヒーローの隠れ家。ゲームにはアクセシビリティオプションがあり、時間のプレッシャーや難易度を下げることができるので誰でも楽しめます。「ストレス」と表現されたことは一度もありません。Steamのすべてのレビューで「笑いすぎて呼吸できない」と表現されています。2〜4人、ローカルおよびオンライン対応。',
    why_ko:
      'Moving Out은 이 질문에 대한 답입니다: "만약 Overcooked가 가구 이사에 관한 것이고 완전히 황당하다면 어떨까?" 당신은 (느슨하게 정의된) 전문 이사업자로 집에서 가구를 치우는 일을 합니다. 이사 트럭은 한쪽 끝에 있고, 가구는 안에 있으며, 이것을 어떻게 달성하든 물리적으로 말이 될 필요가 전혀 없습니다. 게임은 창문을 통해, 지붕에서, 2층 발코니 밖으로 가구를 던지고, 발사하고, 투석기로 날리는 것을 적극적으로 축하합니다. 물리 엔진은 의도적으로 혼돈스럽게 설계되었습니다. 레벨은 점점 더 초현실적인 배경을 포함합니다 — 활발한 유령의 집, 동물을 피해야 하는 농장, 슈퍼히어로의 소굴. 게임에는 시간 압박이나 난이도를 줄일 수 있는 접근성 옵션이 있어 누구나 플레이할 수 있습니다. 스트레스받는다고 설명된 적이 단 한 번도 없습니다. 모든 Steam 리뷰에서 "웃음으로 숨을 쉴 수 없다"고 묘사되었습니다. 2-4인, 로컬 및 온라인.',
    why_de:
      "Moving Out ist die Antwort auf die Frage: 'Was wenn Overcooked über Möbeltransport wäre und auch völlig absurd?' Du spielst als Profiumzügler (im weitesten Sinne) die beauftragt sind Häuser von Möbeln zu befreien. Der Umzugswagen ist an einem Ende, die Möbel sind drin, und absolut nichts davon wie ihr das schafft muss physikalisch sinnvoll sein. Das Spiel feiert aktiv das Werfen, Schießen und Katapultieren von Möbeln durch Fenster, von Dächern und aus Balkonen im zweiten Stock. Die Physikengine ist absichtlich chaotisch. Level umfassen immer surrealistischere Settings — ein aktives Geisterhaus, eine Farm mit Tieren die zu vermeiden sind, eine Superheldenhöhle. Das Spiel hat Barrierefreiheitsoptionen mit denen ihr den Zeitdruck oder die Schwierigkeit reduzieren könnt. Es wurde noch nie als stressig beschrieben. In jeder einzelnen Steam-Rezension wird es als 'nicht mehr atmen können vor Lachen' beschrieben. 2-4 Spieler, lokal und online.",
    tip_en: 'Enable the accessibility option that extends the time limit on your first playthrough — the fun comes from the chaos, not the pressure.',
    tip_zh: '在第一次游玩时启用延长时间限制的无障碍选项——乐趣来自混乱，而不是压力。',
    tip_zhTW: '在第一次遊玩時啟用延長時間限制的無障礙選項——樂趣來自混亂，而不是壓力。',
    tip_ja: '初回プレイ時は制限時間を延長するアクセシビリティオプションを有効にしましょう——楽しさはカオスから来るのであって、プレッシャーからではありません。',
    tip_ko: '첫 플레이 시 시간 제한을 연장하는 접근성 옵션을 활성화하세요 — 재미는 혼돈에서 오지, 압박에서 오는 게 아니에요.',
    tip_de: 'Aktiviert beim ersten Durchspielen die Barrierefreiheitsoption die das Zeitlimit verlängert — der Spaß kommt vom Chaos, nicht vom Druck.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'it-takes-two': 0,
    'overcooked-2': 0,
    plateup: 0,
    'moving-out': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyCoopQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-coop-games`
    const shareText = isZh
      ? `我们的合作 cozy 游戏推荐是「${getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}」！${getLoc(result.tag_zh, result.tag_en, result.tag_zhTW, result.tag_ja, result.tag_ko, result.tag_de)}。找到你们的：${url}`
      : `Our co-op cozy game match is ${getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)} — ${getLoc(result.tag_zh, result.tag_en, result.tag_zhTW, result.tag_ja, result.tag_ko, result.tag_de)}. Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{getLoc(result.tag_zh, result.tag_en, result.tag_zhTW, result.tag_ja, result.tag_ko, result.tag_de)}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}
          </h2>
          <p className="text-xs text-[#4a5a4a]">{getLoc(result.platform_zh, result.platform_en, result.platform_zhTW, result.platform_ja, result.platform_ko, result.platform_de)}</p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.why_zh, result.why_en, result.why_zhTW, result.why_ja, result.why_ko, result.why_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {getLoc('一起玩小贴士：', 'Playing together: ', '一起玩小貼士：', '一緒にプレイするコツ：', '함께 플레이 팁: ', 'Gemeinsam spielen: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把各种游戏里的专注节奏带入真实日常。',
              'TendFarm is building a farm rhythm tracker — bringing the focused rhythms of games into real daily life.',
              'TendFarm 正在研發農場節律追蹤功能——把各種遊戲裡的專注節奏帶入真實日常。',
              'TendFarmは農場リズムトラッカーを開発中です——ゲームの集中したリズムを日常生活に取り入れます。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 게임의 집중된 리듬을 실제 일상으로 가져옵니다.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — der die fokussierten Rhythmen von Spielen in den echten Alltag bringt.',
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度テストする', '다시 테스트하기', 'Quiz wiederholen')}
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
            '你们应该一起玩哪款合作 Cozy 游戏？',
            'Which Co-op Cozy Game Should You Play Together?',
            '你們應該一起玩哪款合作 Cozy 遊戲？',
            'どの協力型コージーゲームを一緒にプレイすべき？',
            '어떤 협동 코지 게임을 함께 플레이해야 할까요?',
            'Welches Co-op-Cozy-Spiel solltet ihr zusammen spielen?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，在 It Takes Two、胡闹厨房 2、PlateUp! 和搬家模拟器中找到最适合你们组合的游戏',
            '6 questions to find your perfect match across It Takes Two, Overcooked! 2, PlateUp!, and Moving Out',
            '6 個問題，在 It Takes Two、胡鬧廚房 2、PlateUp! 和搬家模擬器中找到最適合你們組合的遊戲',
            '6つの質問で、It Takes Two、オーバークック！2、プレートアップ！、ムービングアウトからあなたたちにぴったりのゲームを見つけよう',
            '6가지 질문으로 It Takes Two, Overcooked! 2, PlateUp!, Moving Out 중 여러분에게 딱 맞는 게임을 찾아보세요',
            '6 Fragen um euer perfektes Spiel aus It Takes Two, Overcooked! 2, PlateUp! und Moving Out zu finden',
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
        {getLoc('找到我们的合作游戏', 'Find Our Co-op Game', '找到我們的合作遊戲', '私たちの協力ゲームを見つける', '우리의 협동 게임 찾기', 'Unser Co-op-Spiel finden')}
      </button>
    </div>
  )
}
