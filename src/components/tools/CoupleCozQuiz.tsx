'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'stardew-co-op' | 'acnh-visit' | 'palia' | 'overcooked'

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
  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copied
          ? getLoc('✓ 已复制！', '✓ Copied!', '✓ 已複製！', '✓ コピーしました！', '✓ 복사되었습니다!', '✓ Kopiert!')
          : getLoc('📋 分享给 TA', '📋 Share with partner', '📋 分享給 TA', '📋 パートナーにシェア', '📋 파트너에게 공유', '📋 Mit Partner teilen')}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]"
      >
        𝕏 {getLoc('分享', 'Share', '分享', 'シェア', '공유', 'Teilen')}
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
    q_en: 'When you and your partner game together, what usually works best?',
    q_zh: '你和伴侣一起玩游戏时，什么方式最顺畅？',
    q_zhTW: '你和伴侶一起玩遊戲時，什麼方式最順暢？',
    q_ja: 'パートナーと一緒にゲームするとき、どんなスタイルが一番うまくいく？',
    q_ko: '파트너와 함께 게임할 때 어떤 방식이 가장 잘 맞나요?',
    q_de: 'Was funktioniert am besten, wenn du mit deinem Partner zusammen spielst?',
    options: [
      {
        en: 'We work toward the same goal on the same screen or same world',
        zh: '我们在同一个屏幕或同一个世界里为同一个目标努力',
        zhTW: '我們在同一個畫面或同一個世界裡為同一個目標努力',
        ja: '同じ画面や同じワールドで、同じ目標に向かって一緒に取り組む',
        ko: '같은 화면이나 같은 세계에서 같은 목표를 향해 함께 플레이해요',
        de: 'Wir arbeiten auf dem gleichen Bildschirm oder in der gleichen Welt auf ein gemeinsames Ziel hin',
        type: 'stardew-co-op',
      },
      {
        en: 'We each have our own world but visit each other and share what we made',
        zh: '我们各有自己的世界，但互相拜访、分享各自的成果',
        zhTW: '我們各有自己的世界，但互相拜訪、分享各自的成果',
        ja: 'それぞれ自分のワールドを持ちつつ、お互いを訪問して作ったものを見せ合う',
        ko: '각자 자신만의 세계를 갖고 서로 방문하며 만든 것을 공유해요',
        de: 'Wir haben jeweils unsere eigene Welt, besuchen uns aber gegenseitig und zeigen, was wir gebaut haben',
        type: 'acnh-visit',
      },
      {
        en: 'We play together in the same online world alongside other people too',
        zh: '我们在同一个在线世界里一起玩，周围还有其他玩家',
        zhTW: '我們在同一個線上世界裡一起玩，周圍還有其他玩家',
        ja: '他のプレイヤーもいる同じオンラインワールドで一緒にプレイする',
        ko: '다른 플레이어들도 있는 같은 온라인 세계에서 함께 플레이해요',
        de: 'Wir spielen zusammen in der gleichen Online-Welt, auch mit anderen Spielern',
        type: 'palia',
      },
      {
        en: 'We love a bit of friendly pressure — the fun is in the chaos we create together',
        zh: '我们喜欢一点点友好的压力——乐趣就在于我们共同制造的混乱',
        zhTW: '我們喜歡一點點友好的壓力——樂趣就在於我們共同製造的混亂',
        ja: 'ちょっとしたプレッシャーが好き——一緒に生み出すカオスが楽しい',
        ko: '약간의 긴장감을 즐겨요. 함께 만들어내는 혼돈이 재미거든요',
        de: 'Wir lieben etwas freundlichen Druck — der Spaß liegt im Chaos, das wir zusammen verursachen',
        type: 'overcooked',
      },
    ],
  },
  {
    q_en: 'Describe your couple gaming dynamic honestly:',
    q_zh: '诚实描述你们的情侣游戏动态：',
    q_zhTW: '誠實描述你們的情侶遊戲動態：',
    q_ja: '二人のゲームスタイルを正直に教えて：',
    q_ko: '두 분의 게임 스타일을 솔직하게 말해주세요:',
    q_de: 'Beschreibe eure gemeinsame Gaming-Dynamik ehrlich:',
    options: [
      {
        en: 'One of us focuses, one of us explores — we naturally divide tasks',
        zh: '一个人专注，一个人探索——我们自然地分工',
        zhTW: '一個人專注，一個人探索——我們自然地分工',
        ja: '一人が集中して、もう一人が探索する——自然と役割分担できている',
        ko: '한 명은 집중하고 한 명은 탐험해요. 자연스럽게 역할 분담이 돼요',
        de: 'Einer konzentriert sich, der andere erkundet — wir teilen Aufgaben ganz natürlich auf',
        type: 'stardew-co-op',
      },
      {
        en: "We're independent but love sharing — 'come look at what I built!'",
        zh: '我们独立但喜欢分享——"快来看我建的东西！"',
        zhTW: '我們獨立但喜歡分享——「快來看我建的東西！」',
        ja: 'それぞれ独立してるけど共有が好き——「ねえ、作ったもの見て！」',
        ko: '각자 독립적이지만 공유하는 걸 좋아해요. "내가 만든 거 봐봐!"',
        de: 'Wir sind unabhängig, aber teilen gerne — "Komm schau mal, was ich gebaut habe!"',
        type: 'acnh-visit',
      },
      {
        en: "We're social butterflies — gaming is more fun when there's a whole community around us",
        zh: '我们是社交达人——周围有整个社区的时候游戏才更有趣',
        zhTW: '我們是社交達人——周圍有整個社群的時候遊戲才更有趣',
        ja: '社交的なタイプ——コミュニティがあるとゲームがもっと楽しくなる',
        ko: '우리는 사교적이에요. 주변에 커뮤니티가 있을 때 게임이 더 재미있어요',
        de: 'Wir sind soziale Schmetterlinge — Gaming macht mehr Spaß, wenn eine ganze Community dabei ist',
        type: 'palia',
      },
      {
        en: "We get competitive but laugh it off — our best memories are our biggest disasters",
        zh: '我们会竞争，但一笑而过——我们最美好的记忆往往是最大的灾难时刻',
        zhTW: '我們會競爭，但一笑而過——我們最美好的回憶往往是最大的災難時刻',
        ja: '競争するけど笑って許せる——最高の思い出はだいたい大失敗のとき',
        ko: '경쟁하지만 웃어넘겨요. 가장 좋은 추억은 대부분 최악의 실패 순간이에요',
        de: 'Wir werden kompetitiv, aber lachen es weg — unsere schönsten Erinnerungen sind unsere größten Katastrophen',
        type: 'overcooked',
      },
    ],
  },
  {
    q_en: 'How much gaming overlap do you and your partner actually have?',
    q_zh: '你和伴侣实际上有多少共同游戏时间？',
    q_zhTW: '你和伴侶實際上有多少共同遊戲時間？',
    q_ja: 'パートナーと実際にどれくらいゲームの時間が重なってる？',
    q_ko: '파트너와 실제로 겹치는 게임 시간이 얼마나 되나요?',
    q_de: 'Wie viel Gaming-Zeit habt ihr tatsächlich gemeinsam?',
    options: [
      {
        en: "We have dedicated 'us' gaming nights a few times a week",
        zh: '我们每周有几次专属的情侣游戏夜',
        zhTW: '我們每週有幾次專屬的情侶遊戲夜',
        ja: '週に何回か、二人だけのゲームナイトを設けている',
        ko: '일주일에 몇 번씩 둘만의 게임 나이트를 가져요',
        de: 'Wir haben ein paar Mal pro Woche feste gemeinsame Gaming-Abende',
        type: 'stardew-co-op',
      },
      {
        en: "We play at different times but share the same game universe",
        zh: '我们在不同时间玩，但共享同一个游戏宇宙',
        zhTW: '我們在不同時間玩，但共享同一個遊戲宇宙',
        ja: 'それぞれ別の時間にプレイするけど、同じゲームの世界を共有している',
        ko: '각자 다른 시간에 플레이하지만 같은 게임 세계를 공유해요',
        de: 'Wir spielen zu verschiedenen Zeiten, teilen aber dasselbe Spieluniversum',
        type: 'acnh-visit',
      },
      {
        en: 'We log in whenever we feel like it and find each other there',
        zh: '我们随时都可以登录，然后在游戏里找到对方',
        zhTW: '我們隨時都可以登入，然後在遊戲裡找到對方',
        ja: '気が向いたときにログインして、ゲームの中でお互いを見つける',
        ko: '생각날 때 접속해서 게임 안에서 서로를 찾아요',
        de: 'Wir loggen uns ein, wann immer wir Lust haben, und treffen uns dort',
        type: 'palia',
      },
      {
        en: 'We need something we can just pick up for 30–60 minutes and have a good time',
        zh: '我们需要一款可以直接拿起来玩 30-60 分钟就能玩得开心的游戏',
        zhTW: '我們需要一款可以直接拿起來玩 30-60 分鐘就能玩得開心的遊戲',
        ja: '30〜60分サクッと遊べて楽しめるゲームが必要',
        ko: '30~60분만 해도 즐거운 게임이 필요해요',
        de: 'Wir brauchen etwas, das wir einfach für 30–60 Minuten zocken können und Spaß haben',
        type: 'overcooked',
      },
    ],
  },
  {
    q_en: 'Which couple activity does this most remind you of?',
    q_zh: '这最让你想起哪种情侣活动？',
    q_zhTW: '這最讓你想起哪種情侶活動？',
    q_ja: 'どのカップルの活動に一番近い？',
    q_ko: '어떤 커플 활동이 가장 떠오르나요?',
    q_de: 'An welche Paaraktivität erinnert dich das am meisten?',
    options: [
      {
        en: 'Cooking a meal together from scratch — divide tasks, check in, make something real',
        zh: '一起从头开始做一顿饭——分工、协作、做出真实的东西',
        zhTW: '一起從頭開始做一頓飯——分工、協作、做出真實的東西',
        ja: '一緒にゼロから料理する——役割分担して、確認し合って、本物を作る',
        ko: '처음부터 함께 요리하기. 역할 나누고, 확인하며, 진짜 결과물 만들기',
        de: 'Zusammen von Grund auf kochen — Aufgaben aufteilen, abstimmen, etwas Echtes schaffen',
        type: 'stardew-co-op',
      },
      {
        en: 'Decorating your shared apartment — each has a zone, then you admire the whole',
        zh: '装饰你们共同的公寓——各有各的区域，然后一起欣赏整体',
        zhTW: '裝飾你們共同的公寓——各有各的區域，然後一起欣賞整體',
        ja: '二人の部屋を飾り付ける——それぞれ担当エリアを持って、最後に全体を一緒に眺める',
        ko: '함께 사는 집 꾸미기. 각자 구역을 맡고 나서 전체를 함께 감상하기',
        de: 'Die gemeinsame Wohnung einrichten — jeder hat seinen Bereich, dann bewundert ihr das Ganze',
        type: 'acnh-visit',
      },
      {
        en: 'Going to a social event together — you enjoy the space as a couple but engage with others',
        zh: '一起参加社交活动——你们作为一对享受空间，但也与他人互动',
        zhTW: '一起參加社交活動——你們作為一對享受空間，但也與他人互動',
        ja: '一緒にパーティや集まりに行く——カップルとして楽しみつつ、他の人とも交流する',
        ko: '함께 소셜 이벤트 참가하기. 커플로 공간을 즐기면서도 다른 사람들과도 어울리기',
        de: 'Zusammen auf eine Party gehen — ihr genießt es als Paar, interagiert aber auch mit anderen',
        type: 'palia',
      },
      {
        en: 'Playing a board game — there will be banter, strategy, and probably some mild arguing',
        zh: '玩桌游——一定会有斗嘴、策略，可能还有一点小争吵',
        zhTW: '玩桌遊——一定會有鬥嘴、策略，可能還有一點小爭吵',
        ja: 'ボードゲームで遊ぶ——言い合いや作戦があって、ちょっとした口論も起きそう',
        ko: '보드게임 하기. 티격태격도 있고, 전략도 있고, 약간의 말다툼도 있을 거예요',
        de: 'Ein Brettspiel spielen — es wird Geplänkel, Strategie und wahrscheinlich ein kleines Streitchen geben',
        type: 'overcooked',
      },
    ],
  },
  {
    q_en: 'What do you want a couple game to leave you feeling?',
    q_zh: '你想要情侣游戏结束后有什么感觉？',
    q_zhTW: '你想要情侶遊戲結束後有什麼感覺？',
    q_ja: 'カップルゲームの後、どんな気持ちになりたい？',
    q_ko: '커플 게임을 마친 후 어떤 기분을 원하나요?',
    q_de: 'Wie soll ein Paargame euch hinterher fühlen lassen?',
    options: [
      {
        en: 'Accomplished — we built something together and it shows',
        zh: '有成就感——我们一起建造了一些东西，它看得见',
        zhTW: '有成就感——我們一起建造了一些東西，它看得見',
        ja: '達成感——一緒に何かを作り上げた、その証拠が目に見える',
        ko: '성취감. 함께 무언가를 만들었고, 그게 눈에 보여요',
        de: 'Erfolgreich — wir haben etwas zusammen aufgebaut, und man sieht es',
        type: 'stardew-co-op',
      },
      {
        en: 'Connected — we shared our creative worlds and felt seen',
        zh: '有连接感——我们分享了各自的创意世界，感受到了被理解',
        zhTW: '有連結感——我們分享了各自的創意世界，感受到了被理解',
        ja: 'つながった感覚——お互いのクリエイティブな世界を共有して、理解し合えた',
        ko: '연결된 느낌. 서로의 창의적인 세계를 나누고 이해받은 느낌',
        de: 'Verbunden — wir haben unsere kreativen Welten geteilt und uns verstanden gefühlt',
        type: 'acnh-visit',
      },
      {
        en: 'Refreshed — we had a gentle adventure without stress or competition',
        zh: '焕然一新——我们有了一段温和的冒险，没有压力或竞争',
        zhTW: '煥然一新——我們有了一段溫和的冒險，沒有壓力或競爭',
        ja: 'リフレッシュ——プレッシャーも競争もない、穏やかな冒険ができた',
        ko: '개운함. 압박도 경쟁도 없이 부드러운 모험을 즐겼어요',
        de: 'Erfrischt — wir hatten ein sanftes Abenteuer ohne Stress oder Wettkampf',
        type: 'palia',
      },
      {
        en: 'Laughing — whatever happened, it was chaotic and we loved every minute',
        zh: '笑声不断——不管发生什么，都是一片混乱，我们爱极了每一分钟',
        zhTW: '笑聲不斷——不管發生什麼，都是一片混亂，我們愛極了每一分鐘',
        ja: '笑い転げた——何が起きてもカオスで、その一分一秒が最高だった',
        ko: '배꼽 잡고 웃음. 무슨 일이 있어도 혼란스러웠고, 그 모든 순간이 좋았어요',
        de: 'Lachen — egal was passierte, es war chaotisch und wir haben jeden Moment geliebt',
        type: 'overcooked',
      },
    ],
  },
  {
    q_en: 'One partner is less experienced with video games. How do you handle that?',
    q_zh: '一方对电子游戏经验较少。你们怎么处理这个问题？',
    q_zhTW: '一方對電子遊戲經驗較少。你們怎麼處理這個問題？',
    q_ja: 'パートナーの一方がゲーム初心者。どうやって対処する？',
    q_ko: '한 명이 게임 경험이 적어요. 어떻게 해결하나요?',
    q_de: 'Ein Partner hat weniger Spielerfahrung. Wie geht ihr damit um?',
    options: [
      {
        en: 'We want a game that gives each person a meaningful role — experience level matters less',
        zh: '我们想要一款给每个人有意义角色的游戏——经验水平关系不大',
        zhTW: '我們想要一款給每個人有意義角色的遊戲——經驗水準關係不大',
        ja: 'それぞれに意味ある役割があるゲームがいい——経験の差はあまり関係ない',
        ko: '각자에게 의미 있는 역할이 있는 게임을 원해요. 경험 차이가 크게 중요하지 않아요',
        de: 'Wir wollen ein Spiel, das jedem eine sinnvolle Rolle gibt — Erfahrungslevel spielt weniger eine Rolle',
        type: 'stardew-co-op',
      },
      {
        en: 'We want something where you can play at your own comfort level without holding each other back',
        zh: '我们想要一款可以按照自己的舒适度游玩而不会拖后腿的游戏',
        zhTW: '我們想要一款可以按照自己的舒適度遊玩而不會拖後腿的遊戲',
        ja: 'それぞれ自分のペースで遊べて、足を引っ張り合わないゲームがいい',
        ko: '각자 편한 수준으로 플레이하면서 서로 방해가 되지 않는 게임을 원해요',
        de: 'Wir wollen etwas, wo jeder auf seinem eigenen Niveau spielen kann, ohne den anderen aufzuhalten',
        type: 'acnh-visit',
      },
      {
        en: "We want a gentle learning curve — the less experienced partner can find their pace naturally",
        zh: '我们想要平缓的学习曲线——经验较少的一方可以自然地找到自己的节奏',
        zhTW: '我們想要平緩的學習曲線——經驗較少的一方可以自然地找到自己的節奏',
        ja: '緩やかな学習曲線がほしい——経験の少ない方が自然に自分のペースを見つけられるように',
        ko: '완만한 학습 곡선을 원해요. 경험이 적은 쪽이 자연스럽게 자기 페이스를 찾을 수 있도록요',
        de: 'Wir wollen eine sanfte Lernkurve — der unerfahrenere Partner kann sein Tempo ganz natürlich finden',
        type: 'palia',
      },
      {
        en: "We embrace the gap — the chaos of skill differences is half the fun",
        zh: '我们接受差距——技能差异带来的混乱就是一半的乐趣',
        zhTW: '我們接受差距——技能差異帶來的混亂就是一半的樂趣',
        ja: '差があっても全然OK——スキル差のカオスこそが楽しさの半分',
        ko: '차이를 받아들여요. 실력 차이로 생기는 혼돈이 재미의 절반이에요',
        de: 'Wir nehmen den Unterschied an — das Chaos durch Skillunterschiede ist die halbe Freude',
        type: 'overcooked',
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
    desc_en: string
    desc_zh: string
    desc_zhTW: string
    desc_ja: string
    desc_ko: string
    desc_de: string
    why_en: string[]
    why_zh: string[]
    why_zhTW: string[]
    why_ja: string[]
    why_ko: string[]
    why_de: string[]
    warning_en: string
    warning_zh: string
    warning_zhTW: string
    warning_ja: string
    warning_ko: string
    warning_de: string
  }
> = {
  'stardew-co-op': {
    title_en: 'Stardew Valley Co-op',
    title_zh: '星露谷物语联机模式',
    title_zhTW: '星露谷物語聯機模式',
    title_ja: 'スターデューバレー 協力プレイ',
    title_ko: '스타듀 밸리 협동 모드',
    title_de: 'Stardew Valley Koop',
    emoji: '🌾',
    tag_en: 'Co-op Farming · Shared Goals · Team Building',
    tag_zh: '合作农业 · 共同目标 · 团队建设',
    tag_zhTW: '合作農業 · 共同目標 · 團隊建設',
    tag_ja: '協力農場 · 共通の目標 · チームワーク',
    tag_ko: '협동 농사 · 공동 목표 · 팀워크',
    tag_de: 'Koop-Farming · Gemeinsame Ziele · Teamwork',
    desc_en:
      "Stardew Valley co-op is the most rewarding couple cozy game you can play. You share a farm, divide roles naturally (one person might fish while the other mines, or one cooks while the other grows crops), and over the in-game seasons build something that genuinely belongs to both of you. The community center restoration gives you shared goals that feel meaningful when completed together. Two to four players are supported — but two is the sweet spot for couples who want deep engagement without the chaos.",
    desc_zh:
      '星露谷物语联机是你们能玩的最有回报的情侣 cozy 游戏。你们共享一个农场，自然地分工（一个人钓鱼，另一个挖矿，或者一个烹饪，另一个种地），在游戏内的季节里建造真正属于你们两个人的东西。社区中心修复给你们共同完成时感觉有意义的目标。支持 2-4 名玩家——但对于想要深度参与而不混乱的情侣来说，两人是最佳状态。',
    desc_zhTW:
      '星露谷物語聯機是你們能玩的最有回報的情侶 cozy 遊戲。你們共享一個農場，自然地分工（一個人釣魚，另一個挖礦，或者一個烹飪，另一個種地），在遊戲內的季節裡建造真正屬於你們兩個人的東西。社區中心修復給你們共同完成時感覺有意義的目標。支援 2-4 名玩家——但對於想要深度參與而不混亂的情侶來說，兩人是最佳狀態。',
    desc_ja:
      'スターデューバレーの協力プレイは、カップルで遊べる最もやりがいのあるcozyゲームです。農場を共有し、自然と役割分担が生まれ（一人が釣りをしている間にもう一人が採掘したり、一人が料理しながらもう一人が農作業したり）、ゲーム内の季節を重ねながら、二人だけの農場を作り上げていきます。コミュニティセンターの修復は、一緒に達成したときに本当の充実感を味わえる共通の目標になります。2〜4人対応ですが、深く没頭しつつカオスになりたくないカップルには2人がベストです。',
    desc_ko:
      '스타듀 밸리 협동 모드는 커플이 즐길 수 있는 가장 보람 있는 코지 게임입니다. 농장을 함께 공유하며 자연스럽게 역할이 나뉘어요(한 명이 낚시하는 동안 다른 한 명이 광산을 탐험하거나, 한 명이 요리하고 다른 한 명이 농사를 짓거나). 게임 내 계절이 지나면서 진정으로 두 사람 것인 무언가를 만들어갑니다. 마을 회관 복원은 함께 완성했을 때 의미 있게 느껴지는 공통 목표를 줍니다. 2~4인 지원이지만, 혼란 없이 깊이 몰입하고 싶은 커플에게는 2인이 가장 좋습니다.',
    desc_de:
      "Stardew Valley Koop ist das befriedigendste Cozy-Spiel für Paare, das ihr spielen könnt. Ihr teilt eine Farm, teilt Rollen ganz natürlich auf (einer angelt, während der andere in der Mine arbeitet, oder einer kocht, während der andere Felder bestellt) und baut über die In-Game-Jahreszeiten etwas, das wirklich euch beiden gehört. Die Restaurierung des Gemeinschaftszentrums gibt euch gemeinsame Ziele, die sich bedeutsam anfühlen, wenn ihr sie zusammen abschließt. Zwei bis vier Spieler werden unterstützt — aber zwei ist der Sweet Spot für Paare, die Tiefe wollen, ohne Chaos.",
    why_en: [
      'Most "we built this together" feeling of any cozy co-op game',
      'Natural role division — you collaborate without stepping on each other',
      'Scales from 30-minute sessions to 3-hour deep dives depending on your mood',
    ],
    why_zh: [
      '所有 cozy 合作游戏中"我们一起建造了这个"的感觉最强烈',
      '自然的角色分工——你们合作而不会互相干扰',
      '根据心情可以从 30 分钟游戏到 3 小时深度体验',
    ],
    why_zhTW: [
      '所有 cozy 合作遊戲中「我們一起建造了這個」的感覺最強烈',
      '自然的角色分工——你們合作而不會互相干擾',
      '根據心情可以從 30 分鐘遊戲到 3 小時深度體驗',
    ],
    why_ja: [
      'cozyの協力ゲームの中で「一緒に作り上げた」感が一番強い',
      '自然な役割分担——お互いを邪魔せずに協力できる',
      '気分次第で30分のセッションから3時間のやりこみまで幅広く楽しめる',
    ],
    why_ko: [
      '모든 코지 협동 게임 중 "우리가 함께 만들었다"는 느낌이 가장 강해요',
      '자연스러운 역할 분담. 서로 방해하지 않고 협력할 수 있어요',
      '기분에 따라 30분 세션부터 3시간 몰입 플레이까지 유연하게 즐길 수 있어요',
    ],
    why_de: [
      'Das stärkste "Wir haben das zusammen gebaut"-Gefühl aller Cozy-Koop-Spiele',
      'Natürliche Rollenverteilung — ihr arbeitet zusammen, ohne euch gegenseitig in die Quere zu kommen',
      'Skaliert von 30-Minuten-Sessions bis zu 3-Stunden-Tiefentauchgängen, je nach Stimmung',
    ],
    warning_en: "Decide early who manages the community center checklist — conflicting approaches can be a surprising source of friction.",
    warning_zh: '尽早决定谁来管理社区中心的清单——不同的方法可能出乎意料地产生摩擦。',
    warning_zhTW: '盡早決定誰來管理社區中心的清單——不同的方法可能出乎意料地產生摩擦。',
    warning_ja: '誰がコミュニティセンターのチェックリストを管理するか早めに決めておこう——アプローチが違うと意外なところで摩擦が生まれることがある。',
    warning_ko: '마을 회관 체크리스트를 누가 관리할지 일찍 정하세요. 서로 다른 접근 방식이 예상치 못한 마찰을 일으킬 수 있어요.',
    warning_de: 'Klärt früh, wer die Checkliste für das Gemeinschaftszentrum verwaltet — unterschiedliche Ansätze können überraschend viel Reibung verursachen.',
  },
  'acnh-visit': {
    title_en: 'Animal Crossing: New Horizons (Island Visits)',
    title_zh: '动物之森：新视野（岛屿拜访模式）',
    title_zhTW: '動物森友會：新視野（島嶼拜訪模式）',
    title_ja: 'あつまれ どうぶつの森（島の訪問）',
    title_ko: '모여봐요 동물의 숲 (섬 방문)',
    title_de: 'Animal Crossing: New Horizons (Inselbesuche)',
    emoji: '🍃',
    tag_en: 'Independent · Sharing · Creative Exchange',
    tag_zh: '独立 · 分享 · 创意交流',
    tag_zhTW: '獨立 · 分享 · 創意交流',
    tag_ja: '独立プレイ · シェア · クリエイティブな交流',
    tag_ko: '독립 플레이 · 공유 · 창의적 교류',
    tag_de: 'Unabhängig · Teilen · Kreativer Austausch',
    desc_en:
      "Animal Crossing: New Horizons is perfect for couples who each want their own creative space but love sharing what they make. Each of you builds your island independently — your design choices, your villagers, your pace. Then you visit each other's islands: you might find different rare items, trade resources, leave gifts, or just walk around admiring what your partner created. It's less about playing together and more about sharing parallel creative lives — which many couples find even more intimate.",
    desc_zh:
      '动物之森：新视野非常适合想要各自拥有创意空间但喜欢分享成果的情侣。你们各自独立地建造自己的岛屿——你的设计选择、你的村民、你的节奏。然后互相拜访对方的岛屿：你可能会发现不同的稀有物品、交换资源、留下礼物，或者只是散步欣赏你的伴侣创造的东西。这与其说是一起玩，不如说是分享平行的创意生活——许多情侣发现这甚至更加亲密。',
    desc_zhTW:
      '動物森友會：新視野非常適合想要各自擁有創意空間但喜歡分享成果的情侶。你們各自獨立地建造自己的島嶼——你的設計選擇、你的村民、你的節奏。然後互相拜訪對方的島嶼：你可能會發現不同的稀有物品、交換資源、留下禮物，或者只是散步欣賞你的伴侶創造的東西。這與其說是一起玩，不如說是分享平行的創意生活——許多情侶發現這甚至更加親密。',
    desc_ja:
      'あつまれ どうぶつの森は、それぞれ自分のクリエイティブな空間を持ちながら、作ったものを共有するのが好きなカップルにぴったりです。それぞれが自分の島を独立して作り上げ——デザインの選択も、住人も、ペースもすべて自分次第。そしてお互いの島を訪問し合います。レアなアイテムを発見したり、素材を交換したり、プレゼントを置いたり、パートナーが作った島をゆっくり歩き回って眺めたり。一緒にプレイするというより、それぞれのクリエイティブな生活を共有するイメージ——多くのカップルはこちらの方がかえって親密に感じると言います。',
    desc_ko:
      '모여봐요 동물의 숲은 각자의 창의적인 공간을 원하지만 만든 것을 나누는 걸 좋아하는 커플에게 딱입니다. 각자 자신의 섬을 독립적으로 꾸미고, 디자인 선택, 주민, 페이스 모두 자신만의 것입니다. 그런 다음 서로의 섬을 방문해요. 희귀 아이템을 발견하거나, 자원을 교환하거나, 선물을 남기거나, 파트너가 만든 것을 감상하며 산책할 수 있어요. 함께 플레이하는 것보다 나란히 창의적인 삶을 나누는 느낌에 가까워요. 많은 커플이 이 방식이 오히려 더 친밀하다고 느낍니다.',
    desc_de:
      "Animal Crossing: New Horizons ist perfekt für Paare, die jeweils ihren eigenen kreativen Raum wollen, aber gerne teilen, was sie bauen. Jeder von euch baut seine Insel unabhängig — deine Designentscheidungen, deine Dorfbewohner, dein Tempo. Dann besucht ihr euch gegenseitig: Ihr findet vielleicht seltene Gegenstände, tauscht Ressourcen, hinterlasst Geschenke oder schaut euch einfach an, was der Partner geschaffen hat. Es geht weniger ums gemeinsame Spielen als ums Teilen paralleler kreativer Leben — was viele Paare noch inniger finden.",
    why_en: [
      'No skill difference problem — each plays at their own comfort level on their own island',
      'Visiting each other\'s islands becomes a genuine "come see what I made" sharing ritual',
      'Real-world time means you\'re always in the same seasonal world even when apart',
    ],
    why_zh: [
      '没有技能差异问题——每个人在自己的岛屿上按照自己的舒适度游玩',
      '拜访对方的岛屿成为真实的"来看我做的东西"分享仪式',
      '实时时钟意味着即使分开，你们也总是在同一个季节性世界里',
    ],
    why_zhTW: [
      '沒有技能差異問題——每個人在自己的島嶼上按照自己的舒適度遊玩',
      '拜訪對方的島嶼成為真實的「來看我做的東西」分享儀式',
      '實時時鐘意味著即使分開，你們也總是在同一個季節性世界裡',
    ],
    why_ja: [
      'スキル差の問題なし——それぞれが自分の島で自分のペースで楽しめる',
      'お互いの島を訪問することが、本当の意味での「作ったもの見て」の共有儀式になる',
      'リアルタイムの時計のおかげで、離れていても同じ季節の世界にいられる',
    ],
    why_ko: [
      '실력 차이 문제 없음. 각자 자신의 섬에서 편한 수준으로 플레이해요',
      '서로의 섬을 방문하는 것이 진정한 "내가 만든 거 봐봐" 공유 의식이 돼요',
      '실시간 시계 덕분에 떨어져 있어도 항상 같은 계절의 세계에 있어요',
    ],
    why_de: [
      'Kein Skillunterschied-Problem — jeder spielt auf seiner eigenen Insel in seinem eigenen Tempo',
      'Gegenseitige Inselbesuche werden zum echten "Komm schau, was ich gemacht habe"-Sharing-Ritual',
      'Echtzeit-Uhr bedeutet, ihr seid immer in der gleichen jahreszeitlichen Welt, auch wenn ihr getrennt spielt',
    ],
    warning_en: "You each need your own Nintendo Switch and copy of the game — sharing one console means sharing one island, which changes the dynamic significantly.",
    warning_zh: '你们各自需要自己的 Nintendo Switch 和游戏——共用一台主机意味着共用一个岛屿，这会显著改变游戏动态。',
    warning_zhTW: '你們各自需要自己的 Nintendo Switch 和遊戲——共用一台主機意味著共用一個島嶼，這會顯著改變遊戲動態。',
    warning_ja: 'それぞれ自分のNintendo SwitchとソフトがないとNG——本体を共有すると島も共有になってしまい、ゲームの雰囲気がガラリと変わる。',
    warning_ko: '각자 Nintendo Switch와 게임 사본이 필요해요. 본체를 공유하면 섬도 공유하게 되어 게임 분위기가 크게 달라집니다.',
    warning_de: 'Ihr braucht jeweils eure eigene Nintendo Switch und eine eigene Kopie des Spiels — eine Konsole zu teilen bedeutet, eine Insel zu teilen, was die Dynamik erheblich verändert.',
  },
  palia: {
    title_en: 'Palia (Free Online Co-op)',
    title_zh: 'Palia（免费在线合作）',
    title_zhTW: 'Palia（免費線上合作）',
    title_ja: 'Palia（無料オンライン協力）',
    title_ko: 'Palia (무료 온라인 협동)',
    title_de: 'Palia (Kostenloser Online-Koop)',
    emoji: '🌻',
    tag_en: 'Free · Online MMO · Gentle Together',
    tag_zh: '免费 · 在线 MMO · 一起治愈',
    tag_zhTW: '免費 · 線上 MMO · 一起療癒',
    tag_ja: '無料 · オンラインMMO · 穏やかに一緒に',
    tag_ko: '무료 · 온라인 MMO · 함께 힐링',
    tag_de: 'Kostenlos · Online-MMO · Sanft zusammen',
    desc_en:
      "Palia is the best free couple cozy game in 2025 — and it runs on both PC and Switch, so different hardware combinations work. You and your partner exist in the same shared world alongside other friendly players, can farm plots near each other, cook meals together, go hunting as a pair, and join community events. Palia has one of the friendliest gaming communities online. The free-to-play model means you can both download it today without spending anything, which makes it a perfect gateway cozy game for a couple where one partner is newer to gaming.",
    desc_zh:
      'Palia 是 2025 年最好的免费情侣 cozy 游戏——它在 PC 和 Switch 上都可以运行，所以不同的硬件组合也能配对。你和伴侣存在于同一个共享世界中，周围还有其他友好的玩家，可以在彼此旁边种植农场、一起烹饪食物、结伴去狩猎、参加社区活动。Palia 拥有网络上最友好的游戏社区之一。免费游玩模式意味着你们今天就可以下载而无需花任何钱，这使它成为情侣中经验较少的一方的完美入门 cozy 游戏。',
    desc_zhTW:
      'Palia 是 2025 年最好的免費情侶 cozy 遊戲——它在 PC 和 Switch 上都可以運行，所以不同的硬體組合也能配對。你和伴侶存在於同一個共享世界中，周圍還有其他友好的玩家，可以在彼此旁邊種植農場、一起烹飪食物、結伴去狩獵、參加社群活動。Palia 擁有網路上最友好的遊戲社群之一。免費遊玩模式意味著你們今天就可以下載而無需花任何錢，這使它成為情侶中經驗較少的一方的完美入門 cozy 遊戲。',
    desc_ja:
      'Paliaは2025年最高の無料カップルcozyゲームです——PCとSwitchの両方で動くので、ハードが違っても大丈夫。パートナーと同じ共有ワールドに存在し、他のフレンドリーなプレイヤーたちも一緒。隣り合った畑を育てたり、一緒に料理したり、二人で狩りに出かけたり、コミュニティイベントに参加したりできます。Paliaはオンラインで最も雰囲気のいいゲームコミュニティのひとつを持っています。基本無料なので今日から二人ともお金をかけずにダウンロードできます。ゲーム初心者のパートナーがいるカップルへの入門cozyゲームとして完璧です。',
    desc_ko:
      'Palia는 2025년 최고의 무료 커플 코지 게임입니다. PC와 Switch 모두에서 실행되어 서로 다른 기기 조합도 괜찮아요. 파트너와 같은 공유 세계에 존재하며 다른 친절한 플레이어들도 함께해요. 서로 옆에 농장을 가꾸거나, 함께 요리하거나, 짝을 지어 사냥하거나, 커뮤니티 이벤트에 참여할 수 있어요. Palia는 온라인에서 가장 친근한 게임 커뮤니티 중 하나를 갖고 있어요. 무료 플레이 모델 덕분에 오늘 당장 돈 한 푼 없이 둘 다 다운로드할 수 있어서, 게임 경험이 적은 파트너가 있는 커플에게 완벽한 코지 게임 입문작이에요.',
    desc_de:
      "Palia ist das beste kostenlose Cozy-Spiel für Paare im Jahr 2025 — und es läuft sowohl auf PC als auch auf Switch, sodass verschiedene Hardware-Kombinationen funktionieren. Du und dein Partner existiert in der gleichen gemeinsamen Welt mit anderen freundlichen Spielern, könnt Felder nebeneinander bewirtschaften, zusammen Mahlzeiten kochen, gemeinsam jagen und Community-Events beitreten. Palia hat eine der freundlichsten Gaming-Communities online. Das Free-to-play-Modell bedeutet, dass ihr beide noch heute ohne Kosten loslegen könnt — perfekt als Einstiegs-Cozy-Spiel für Paare, bei denen ein Partner weniger Spielerfahrung hat.",
    why_en: [
      'Completely free — both players can download and start today with zero cost',
      'Flexible availability — no need to schedule, just log in and find each other in-world',
      'Gentle enough for gaming newcomers but rich enough for experienced players',
    ],
    why_zh: [
      '完全免费——两名玩家今天就可以下载并开始，零成本',
      '弹性可用性——无需安排时间，随时登录就能在游戏世界里找到对方',
      '对游戏新手足够温和，但对有经验的玩家也足够丰富',
    ],
    why_zhTW: [
      '完全免費——兩名玩家今天就可以下載並開始，零成本',
      '彈性可用性——無需安排時間，隨時登入就能在遊戲世界裡找到對方',
      '對遊戲新手足夠溫和，但對有經驗的玩家也足夠豐富',
    ],
    why_ja: [
      '完全無料——両プレイヤーが今日からゼロ円でダウンロードして始められる',
      '柔軟な参加スタイル——スケジュール調整不要、ログインすればワールドで会える',
      'ゲーム初心者には優しく、経験者にも奥深い',
    ],
    why_ko: [
      '완전 무료. 두 플레이어 모두 오늘 당장 비용 없이 다운로드해 시작할 수 있어요',
      '유연한 접속. 일정을 잡을 필요 없이 로그인하면 게임 세계에서 서로를 찾을 수 있어요',
      '게임 입문자에게 충분히 부드럽고, 경험자에게도 충분히 풍성해요',
    ],
    why_de: [
      'Völlig kostenlos — beide Spieler können heute herunterladen und anfangen, ohne etwas auszugeben',
      'Flexible Verfügbarkeit — kein Planen nötig, einfach einloggen und sich in der Spielwelt finden',
      'Sanft genug für Gaming-Neulinge, aber reichhaltig genug für erfahrene Spieler',
    ],
    warning_en: "PC and Switch players cannot currently play together cross-platform — make sure you're both on the same platform.",
    warning_zh: 'PC 和 Switch 玩家目前不能跨平台一起玩——确保你们都在同一个平台上。',
    warning_zhTW: 'PC 和 Switch 玩家目前不能跨平台一起玩——確保你們都在同一個平台上。',
    warning_ja: 'PCとSwitchのプレイヤーは現在クロスプレイ非対応——二人が同じプラットフォームを使っているか確認しよう。',
    warning_ko: 'PC와 Switch 플레이어는 현재 크로스 플랫폼 플레이가 안 돼요. 둘 다 같은 플랫폼에 있는지 확인하세요.',
    warning_de: 'PC- und Switch-Spieler können derzeit nicht zusammen crossplattform spielen — stellt sicher, dass ihr beide auf der gleichen Plattform seid.',
  },
  overcooked: {
    title_en: 'Overcooked! 2 (Or Overcooked! All You Can Eat)',
    title_zh: '煮过头！2（或煮过头！管够版）',
    title_zhTW: '煮過頭！2（或煮過頭！管夠版）',
    title_ja: 'Overcooked! 2（またはOvercooked! All You Can Eat）',
    title_ko: 'Overcooked! 2 (또는 Overcooked! All You Can Eat)',
    title_de: 'Overcooked! 2 (Oder Overcooked! All You Can Eat)',
    emoji: '👨‍🍳',
    tag_en: 'Chaotic Co-op · Laughter · Friendly Competition',
    tag_zh: '混乱合作 · 欢笑 · 友好竞争',
    tag_zhTW: '混亂合作 · 歡笑 · 友好競爭',
    tag_ja: 'カオスな協力プレイ · 爆笑 · 友好的な競争',
    tag_ko: '혼돈 협동 · 웃음 · 친선 경쟁',
    tag_de: 'Chaotischer Koop · Lachen · Freundschaftlicher Wettkampf',
    desc_en:
      "Your couple energy calls for Overcooked — the chaotic co-op cooking game that has launched more laughing arguments than any other co-op game. You run a kitchen together, divide tasks under increasing time pressure, and inevitably end up shouting instructions at each other in the most affectionate way possible. It's not a cozy farming game in the traditional sense, but it is deeply cozy in the couple sense: high-energy moments that create shared memories, a game short enough for a 30-minute session, and a difficulty that scales so both partners stay engaged. Overcooked! All You Can Eat bundles the full series.",
    desc_zh:
      '你们的情侣能量需要《煮过头》——这款混乱的合作烹饪游戏制造的欢笑争论比任何其他合作游戏都多。你们一起经营厨房，在不断增加的时间压力下分工，不可避免地用最温情的方式向对方大声发出指令。它在传统意义上不是一款治愈的农场游戏，但在情侣意义上却非常治愈：创造共同记忆的高能量时刻、短到 30 分钟就能玩一局、难度会升级让两名玩家都保持投入。《煮过头！管够版》包含完整系列合集。',
    desc_zhTW:
      '你們的情侶能量需要《煮過頭》——這款混亂的合作烹飪遊戲製造的歡笑爭論比任何其他合作遊戲都多。你們一起經營廚房，在不斷增加的時間壓力下分工，不可避免地用最溫情的方式向對方大聲發出指令。它在傳統意義上不是一款療癒的農場遊戲，但在情侶意義上卻非常療癒：創造共同回憶的高能量時刻、短到 30 分鐘就能玩一局、難度會升級讓兩名玩家都保持投入。《煮過頭！管夠版》包含完整系列合集。',
    desc_ja:
      'あなたたちのカップルエネルギーにはOvercookedがぴったり——他のどんな協力ゲームよりも多くの笑い合いと言い合いを生み出してきた、カオスな協力料理ゲームです。一緒にキッチンを切り盛りし、どんどん増すタイムプレッシャーのもとで役割を分担し、気づけば最愛の人に全力で指示を叫んでいます。伝統的な意味でのcozy農場ゲームではありませんが、カップル的な意味では最高にcozy。共通の思い出を作る高テンションな瞬間、30分でも楽しめるコンパクトさ、そして二人が飽きないように上がっていく難易度。Overcooked! All You Can Eatでシリーズ全作がまとめて楽しめます。',
    desc_ko:
      '두 분의 커플 에너지에는 Overcooked가 딱이에요. 다른 어떤 협동 게임보다 많은 웃음 섞인 말다툼을 만들어낸 혼돈의 협동 요리 게임이죠. 함께 주방을 운영하며 점점 커지는 시간 압박 속에서 역할을 나누고, 어느 순간 서로에게 가장 다정한 방식으로 큰 소리로 지시를 외치고 있어요. 전통적인 의미의 코지 농장 게임은 아니지만, 커플 의미에서는 정말 코지해요. 공유 추억을 만드는 고에너지 순간들, 30분 세션도 가능한 짧은 플레이 타임, 두 파트너 모두 몰입할 수 있도록 오르는 난이도. Overcooked! All You Can Eat은 전체 시리즈를 한 번에 즐길 수 있어요.',
    desc_de:
      "Eure Paarenergie ruft nach Overcooked — dem chaotischen Koop-Kochspiel, das mehr lachende Streitereien ausgelöst hat als jedes andere Koop-Spiel. Ihr betreibt zusammen eine Küche, teilt Aufgaben unter zunehmendem Zeitdruck auf und ruft euch unweigerlich auf die liebevollste Art und Weise Anweisungen zu. Es ist kein Cozy-Farmspiel im traditionellen Sinne, aber im Paar-Sinne zutiefst gemütlich: energiegeladene Momente, die gemeinsame Erinnerungen schaffen, kurz genug für eine 30-Minuten-Runde, und ein Schwierigkeitsgrad, der skaliert, damit beide Partner engagiert bleiben. Overcooked! All You Can Eat bündelt die gesamte Serie.",
    why_en: [
      'Creates more shared laughter and stories than any other co-op game in this genre',
      'Short sessions (30–60 min) — perfect for evenings when you want fun without a big time commitment',
      'Available on every major platform including Switch local co-op on one screen',
    ],
    why_zh: [
      '比同类任何其他合作游戏创造更多共同的笑声和故事',
      '短时间游戏（30-60 分钟）——非常适合不想占用太多时间但想要乐趣的夜晚',
      '在所有主要平台上都有，包括 Switch 一屏本地合作',
    ],
    why_zhTW: [
      '比同類任何其他合作遊戲創造更多共同的笑聲和故事',
      '短時間遊戲（30-60 分鐘）——非常適合不想佔用太多時間但想要樂趣的夜晚',
      '在所有主要平台上都有，包括 Switch 一螢幕本地合作',
    ],
    why_ja: [
      'このジャンルのどんな協力ゲームよりも多くの共有の笑いと思い出を生み出す',
      '短いセッション（30〜60分）——大きな時間を使わずに楽しみたい夜にぴったり',
      '全主要プラットフォームで利用可能、Switchの1画面ローカル協力にも対応',
    ],
    why_ko: [
      '이 장르의 다른 어떤 협동 게임보다 더 많은 공유 웃음과 이야기를 만들어요',
      '짧은 세션(30~60분). 큰 시간 투자 없이 즐기고 싶은 저녁에 딱이에요',
      'Switch 한 화면 로컬 협동 포함 모든 주요 플랫폼에서 이용 가능해요',
    ],
    why_de: [
      'Erzeugt mehr gemeinsames Lachen und Geschichten als jedes andere Koop-Spiel in diesem Genre',
      'Kurze Sessions (30–60 Min.) — perfekt für Abende, wenn ihr Spaß wollt, ohne viel Zeit zu investieren',
      'Auf jeder wichtigen Plattform verfügbar, einschließlich Switch Local Co-op auf einem Bildschirm',
    ],
    warning_en: "It will test your communication under pressure. This is a feature, not a bug — but set the expectation that chaos is the point.",
    warning_zh: '它会考验你们在压力下的沟通。这是特性，不是缺陷——但要设定好混乱是游戏核心的期望。',
    warning_zhTW: '它會考驗你們在壓力下的溝通。這是特性，不是缺陷——但要設定好混亂是遊戲核心的期望。',
    warning_ja: 'プレッシャー下でのコミュニケーションが試される。これは欠点ではなく仕様——カオスがゲームの本質だという認識を事前に共有しておこう。',
    warning_ko: '압박 상황에서의 소통을 시험해요. 이건 버그가 아닌 특성이에요. 혼돈이 핵심임을 미리 인식하고 시작하세요.',
    warning_de: 'Es wird eure Kommunikation unter Druck testen. Das ist ein Feature, kein Bug — stellt aber die Erwartung, dass Chaos der Sinn der Sache ist.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'stardew-co-op': 0,
    'acnh-visit': 0,
    palia: 0,
    overcooked: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CoupleCozQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-games-for-couples`
    const shareText = isZh
      ? `我们情侣最适合玩的 Cozy 游戏是「${result.title_zh}」！快来找到你们的答案：${url}`
      : `Our couple cozy game match is ${result.title_en}! Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{getLoc(result.tag_zh, result.tag_en, result.tag_zhTW, result.tag_ja, result.tag_ko, result.tag_de)}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}
          </h2>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {getLoc('为什么适合你们', 'Why it fits your couple', '為什麼適合你們', 'なぜあなたたちに合っているか', '왜 두 분에게 맞는지', 'Warum es zu euch passt')}
          </h3>
          <ul className="mb-3 space-y-2">
            {(getLoc(result.why_zh.join('\n'), result.why_en.join('\n'), result.why_zhTW.join('\n'), result.why_ja.join('\n'), result.why_ko.join('\n'), result.why_de.join('\n')).split('\n')).map((w, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">✓</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#2d3d2d] pt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {getLoc('开始前要知道', 'Know before you start', '開始前要知道', '始める前に知っておこう', '시작 전에 알아두세요', 'Bevor ihr anfangt')}
            </p>
            <p className="text-sm text-[#8a9a7a]">{getLoc(result.warning_zh, result.warning_en, result.warning_zhTW, result.warning_ja, result.warning_ko, result.warning_de)}</p>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把游戏里共同创造的慢生活带入真实日常。',
              'TendFarm is building a farm rhythm tracker — bringing the shared slow-living you create in cozy games into real daily life.',
              'TendFarm 正在研發農場節律追蹤功能——把遊戲裡共同創造的慢生活帶入真實日常。',
              'TendFarmは農場リズムトラッカーを開発中——cozyゲームで二人が作り上げたスローライフを、リアルな日常に持ち込みます。',
              'TendFarm은 농장 리듬 트래커를 개발 중이에요. 코지 게임에서 함께 만들어가는 슬로우 라이프를 실제 일상으로 가져옵니다.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — der das gemeinsame Slow-Living aus Cozy-Games in den echten Alltag bringt.',
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {getLoc('重新测试', 'Retake Quiz', '重新測驗', 'もう一度やってみる', '다시 테스트하기', 'Quiz wiederholen')}
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
            '适合情侣的 Cozy 游戏测验',
            'Best Cozy Game for Couples Quiz',
            '適合情侶的 Cozy 遊戲測驗',
            'カップルにぴったりのcozyゲーム診断',
            '커플을 위한 코지 게임 추천 테스트',
            'Bestes Cozy-Spiel für Paare Quiz',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，为你们找到最适合一起玩的 cozy 游戏——星露谷联机、动物之森、Palia 还是煮过头',
            '6 questions to find the best cozy game for your couple — Stardew Valley co-op, Animal Crossing visits, Palia, or Overcooked',
            '6 個問題，為你們找到最適合一起玩的 cozy 遊戲——星露谷聯機、動物森友會、Palia 還是煮過頭',
            '6つの質問で、あなたたちカップルに最高のcozyゲームを診断——スターデューバレー協力、あつ森、Palia、Overcooked',
            '6가지 질문으로 커플에게 가장 잘 맞는 코지 게임을 찾아드립니다. 스타듀 밸리 협동, 동물의 숲, Palia, 또는 Overcooked',
            '6 Fragen, um das beste Cozy-Spiel für euch als Paar zu finden — Stardew Valley Koop, Animal Crossing Besuche, Palia oder Overcooked',
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
        {getLoc('找到我们的情侣游戏', 'Find Our Couple Game', '找到我們的情侶遊戲', '私たちのカップルゲームを見つける', '우리 커플 게임 찾기', 'Unser Paar-Spiel finden')}
      </button>
    </div>
  )
}
