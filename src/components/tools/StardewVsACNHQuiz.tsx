'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Result = 'sdv' | 'acnh' | 'both-sdv' | 'both-acnh'

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
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Result }>
}> = [
  {
    q_en: 'How long do you typically want to play in one session?',
    q_zh: '你通常想在一次游戏里玩多长时间？',
    q_zhTW: '你通常想在一次遊戲裡玩多長時間？',
    q_ja: '一回のプレイでどのくらい遊びたいですか？',
    q_ko: '한 번 플레이할 때 보통 얼마나 플레이하고 싶으세요?',
    q_de: 'Wie lange möchtest du normalerweise in einer Spielsitzung spielen?',
    options: [
      {
        en: '2–4+ hours — I want to sink in and really accomplish something',
        zh: '2-4 小时以上——我想沉浸其中，真正完成一些事情',
        zhTW: '2-4 小時以上——我想沉浸其中，真正完成一些事情',
        ja: '2〜4時間以上 — じっくり腰を据えて、何かを達成したい',
        ko: '2~4시간 이상 — 완전히 몰입해서 뭔가를 이뤄내고 싶어요',
        de: '2–4 Stunden oder mehr — ich will richtig eintauchen und was erreichen',
        type: 'sdv',
      },
      {
        en: '30–60 minutes — light and refreshing, like a daily ritual',
        zh: '30-60 分钟——轻松清爽，像每天的仪式',
        zhTW: '30-60 分鐘——輕鬆清爽，像每天的儀式',
        ja: '30〜60分 — 毎日の習慣みたいに、気軽にサクッと',
        ko: '30~60분 — 가볍고 상쾌하게, 매일의 루틴처럼',
        de: '30–60 Minuten — leicht und erfrischend, wie ein tägliches Ritual',
        type: 'acnh',
      },
      {
        en: '1–2 hours — enough to feel progress but not overwhelming',
        zh: '1-2 小时——足以感受进度但不会太累',
        zhTW: '1-2 小時——足以感受進度但不會太累',
        ja: '1〜2時間 — 進んでる感はほしいけど、ガッツリはちょっと',
        ko: '1~2시간 — 진행감은 느끼되 너무 지치지 않을 만큼',
        de: '1–2 Stunden — genug um Fortschritt zu spüren, ohne zu überfordern',
        type: 'both-sdv',
      },
      {
        en: 'Flexible — 15 minutes or 3 hours, depending on how I feel',
        zh: '弹性——15 分钟或 3 小时都行，看心情',
        zhTW: '彈性——15 分鐘或 3 小時都行，看心情',
        ja: 'そのとき次第 — 15分のときも3時間のときも、気分で決める',
        ko: '그날그날 달라요 — 15분일 때도 있고 3시간일 때도 있어요',
        de: 'Flexibel — 15 Minuten oder 3 Stunden, je nach Stimmung',
        type: 'both-acnh',
      },
    ],
  },
  {
    q_en: 'What do you want to feel after a gaming session?',
    q_zh: '游戏结束后，你想有什么感觉？',
    q_zhTW: '遊戲結束後，你想有什麼感覺？',
    q_ja: 'プレイ後にどんな気分になりたいですか？',
    q_ko: '게임을 끝내고 어떤 기분이 들었으면 하세요?',
    q_de: 'Wie willst du dich nach einer Spielsitzung fühlen?',
    options: [
      {
        en: 'Productive — like I really got things done and moved forward',
        zh: '有成就感——感觉真正做了事情、有了进展',
        zhTW: '有成就感——感覺真正做了事情、有了進展',
        ja: '達成感 — ちゃんとやり遂げた、前に進めた感じ',
        ko: '뿌듯함 — 뭔가를 진짜로 해냈다는 성취감',
        de: 'Produktiv — als hätte ich wirklich was geschafft und bin weitergekommen',
        type: 'sdv',
      },
      {
        en: 'Refreshed — like I had a small vacation inside the game',
        zh: '焕然一新——感觉在游戏里度过了一次小假期',
        zhTW: '煥然一新——感覺在遊戲裡度過了一次小假期',
        ja: 'リフレッシュ感 — ゲームの中でプチ旅行したような気持ち',
        ko: '기분 전환 — 게임 속에서 짧은 여행을 다녀온 것 같은 느낌',
        de: 'Erfrischt — wie ein kleiner Urlaub im Spiel',
        type: 'acnh',
      },
      {
        en: 'Satisfied — a mix of accomplishment and relaxation',
        zh: '满足——成就感和放松感的结合',
        zhTW: '滿足——成就感和放鬆感的結合',
        ja: '満足感 — 達成感とリラックスのいいとこどり',
        ko: '만족감 — 성취감과 릴렉스가 적절히 섞인 느낌',
        de: 'Zufrieden — eine Mischung aus Leistungsgefühl und Entspannung',
        type: 'both-sdv',
      },
      {
        en: 'Calm — no stress carried in, no stress carried out',
        zh: '平静——带着轻松进去，带着平静出来',
        zhTW: '平靜——帶著輕鬆進去，帶著平靜出來',
        ja: '穏やか — ストレスなしで入って、ストレスなしで出てくる',
        ko: '차분함 — 스트레스 없이 들어가서 편안하게 나오는 것',
        de: 'Ruhig — entspannt rein, entspannt raus',
        type: 'both-acnh',
      },
    ],
  },
  {
    q_en: 'How do you feel about goals and to-do lists in games?',
    q_zh: '你对游戏里的目标和待办事项有什么感觉？',
    q_zhTW: '你對遊戲裡的目標和待辦事項有什麼感覺？',
    q_ja: 'ゲーム内の目標やToDoリストについてどう思いますか？',
    q_ko: '게임 내 목표나 할 일 목록에 대해 어떻게 생각하세요?',
    q_de: 'Was hältst du von Zielen und To-do-Listen in Spielen?',
    options: [
      {
        en: 'I love them — clear goals motivate me and give structure to my play',
        zh: '我喜欢——明确的目标激励我，给我的游戏提供结构',
        zhTW: '我喜歡——明確的目標激勵我，給我的遊戲提供結構',
        ja: '大好き — 明確な目標があると燃えるし、メリハリがつく',
        ko: '좋아요 — 명확한 목표가 있어야 동기부여가 되고 플레이에 구조감이 생겨요',
        de: 'Ich liebe sie — klare Ziele motivieren mich und geben dem Spielen Struktur',
        type: 'sdv',
      },
      {
        en: "I prefer no pressure — gentle nudges only, nothing I feel I 'must' do",
        zh: "我更喜欢没有压力——只需温和提示，没有我'必须'做的事情",
        zhTW: "我更喜歡沒有壓力——只需溫和提示，沒有我「必須」做的事情",
        ja: 'プレッシャーは要らない — やさしいヒントだけあればOK、「やらなきゃ」は嫌',
        ko: "압박은 싫어요 — 살짝 힌트만 있으면 충분해요, '해야 한다'는 느낌은 별로예요",
        de: "Kein Druck, bitte — sanfte Hinweise reichen, nichts, das ich 'muss'",
        type: 'acnh',
      },
      {
        en: 'I like optional goals — something to aim for but nothing stressful',
        zh: '我喜欢可选目标——有努力的方向但没有压力',
        zhTW: '我喜歡可選目標——有努力的方向但沒有壓力',
        ja: '任意の目標なら好き — 目指せるものはあるけど、強制はされない感じ',
        ko: '선택적 목표는 괜찮아요 — 방향은 있지만 강요받지 않는 게 좋아요',
        de: 'Optionale Ziele mag ich — ein Richtungsgefühl, aber kein Stress',
        type: 'both-sdv',
      },
      {
        en: "I'm fine either way — I make my own goals or ignore them",
        zh: '我随便——我自己定目标，或者忽略它们',
        zhTW: '我隨便——我自己定目標，或者忽略它們',
        ja: 'どっちでもいい — 自分でゴールを決めるか、無視するだけ',
        ko: '어느 쪽이든 상관없어요 — 내가 직접 목표를 세우거나 그냥 무시하면 되니까요',
        de: 'Egal mir — ich setze mir selbst Ziele oder ignoriere sie einfach',
        type: 'both-acnh',
      },
    ],
  },
  {
    q_en: 'Which sounds more appealing: building a farm or decorating an island?',
    q_zh: '哪个听起来更吸引你：建造农场还是装饰岛屿？',
    q_zhTW: '哪個聽起來更吸引你：建造農場還是裝飾島嶼？',
    q_ja: '農場を作るのと島を飾るの、どっちが楽しそう？',
    q_ko: '농장 만들기 vs 섬 꾸미기, 어느 쪽이 더 끌리세요?',
    q_de: 'Was klingt verlockender: eine Farm bauen oder eine Insel gestalten?',
    options: [
      {
        en: 'Building and expanding a farm — watching it grow from nothing into something productive',
        zh: '建造和扩展农场——看着它从零开始成长为富有生产力的地方',
        zhTW: '建造和擴展農場——看著它從零開始成長為富有生產力的地方',
        ja: '農場を作って広げていく — ゼロから育てて、生産的な場所にしていく達成感',
        ko: '농장 만들고 키우기 — 아무것도 없는 곳에서 생산적인 공간으로 발전시키는 과정이 좋아요',
        de: 'Eine Farm aufbauen und erweitern — dabei zuschauen, wie aus nichts etwas Produktives entsteht',
        type: 'sdv',
      },
      {
        en: 'Decorating and personalizing an island — making it look exactly how I imagine it',
        zh: '装饰和个性化定制岛屿——让它看起来正是我想象中的样子',
        zhTW: '裝飾和個性化定制島嶼——讓它看起來正是我想象中的樣子',
        ja: '島をデコって自分好みに — 頭の中のイメージ通りにアレンジするのが最高',
        ko: '섬을 내 스타일로 꾸미기 — 머릿속의 이미지대로 꾸며나가는 게 재미있어요',
        de: 'Eine Insel dekorieren und personalisieren — sie genau so gestalten, wie ich mir das vorstelle',
        type: 'acnh',
      },
      {
        en: 'Both equally — I want efficiency AND aesthetics',
        zh: '两者同等重要——我既想要效率也想要美观',
        zhTW: '兩者同等重要——我既想要效率也想要美觀',
        ja: '両方同じくらい好き — 効率も見た目も、どっちも大事',
        ko: '둘 다 똑같이 좋아요 — 효율성도 미적 감각도 둘 다 중요해요',
        de: 'Beides gleichermaßen — ich will Effizienz UND Ästhetik',
        type: 'both-sdv',
      },
      {
        en: 'More decoration — creativity and beauty matter more to me than optimization',
        zh: '更多是装饰——创造力和美感对我比优化更重要',
        zhTW: '更多是裝飾——創造力和美感對我比優化更重要',
        ja: 'どちらかといえば飾る方 — 最適化より、創造性とかわいさの方が好き',
        ko: '주로 꾸미는 쪽 — 최적화보다 창의성과 예쁜 게 더 중요해요',
        de: 'Eher dekorieren — Kreativität und Schönheit sind mir wichtiger als Optimierung',
        type: 'both-acnh',
      },
    ],
  },
  {
    q_en: 'How do you feel about games that use real-world time?',
    q_zh: '你对使用真实时间的游戏有什么感觉？',
    q_zhTW: '你對使用真實時間的遊戲有什麼感覺？',
    q_ja: 'リアルタイムが流れるゲームについてどう思いますか？',
    q_ko: '현실 시간이 흐르는 게임에 대해 어떻게 생각하세요?',
    q_de: 'Wie stehst du zu Spielen, die Echtzeit verwenden?',
    options: [
      {
        en: "I prefer games that let me control time — I want to play 3 game-years in one afternoon",
        zh: '我更喜欢让我控制时间的游戏——我想在一个下午玩三个游戏年',
        zhTW: '我更喜歡讓我控制時間的遊戲——我想在一個下午玩三個遊戲年',
        ja: '自分で時間をコントロールしたい — 午後だけで3年分遊べるくらい自由がほしい',
        ko: '내가 시간을 통제하는 게 좋아요 — 오후 한나절에 게임 속 3년을 살고 싶어요',
        de: 'Ich bevorzuge Spiele, bei denen ich die Zeit selbst steuere — in einem Nachmittag drei Spieljahre erleben',
        type: 'sdv',
      },
      {
        en: "I love it — my island feels alive and changes with the real seasons",
        zh: '我喜欢——我的岛屿感觉有生命，随着真实季节变化',
        zhTW: '我喜歡——我的島嶼感覺有生命，隨著真實季節變化',
        ja: '好き — 島が本当に生きてる感じがして、現実の季節と一緒に変わっていくのが嬉しい',
        ko: '좋아요 — 섬이 진짜 살아있는 느낌이고, 현실 계절과 함께 변하는 게 좋아요',
        de: 'Ich liebe es — meine Insel fühlt sich lebendig an und verändert sich mit den echten Jahreszeiten',
        type: 'acnh',
      },
      {
        en: "I'm neutral — I like that real-world time games reward consistency",
        zh: '我无所谓——我喜欢真实时间游戏奖励持续游玩的方式',
        zhTW: '我無所謂——我喜歡真實時間遊戲獎勵持續遊玩的方式',
        ja: 'どちらでもいい — コツコツ続けると報われるリアルタイム系も好き',
        ko: '딱히 상관없어요 — 꾸준히 플레이하면 보상받는 리얼타임 방식도 괜찮아요',
        de: 'Mir ist es egal — ich mag, dass Echtzeitspiele Beständigkeit belohnen',
        type: 'both-acnh',
      },
      {
        en: "I slightly prefer in-game time control — flexibility matters to me",
        zh: '我稍微更喜欢游戏内时间控制——灵活性对我很重要',
        zhTW: '我稍微更喜歡遊戲內時間控制——靈活性對我很重要',
        ja: 'どちらかといえばゲーム内時間がいい — 自分のペースで遊びたい',
        ko: '살짝은 게임 내 시간이 더 좋아요 — 내 페이스대로 하고 싶어요',
        de: 'Ich bevorzuge leicht die Spielzeit-Steuerung — Flexibilität ist mir wichtig',
        type: 'both-sdv',
      },
    ],
  },
  {
    q_en: 'Which of these describes you better?',
    q_zh: '哪个描述更符合你？',
    q_zhTW: '哪個描述更符合你？',
    q_ja: '自分に近いのはどっちですか？',
    q_ko: '다음 중 자신과 더 가까운 쪽은요?',
    q_de: 'Welche Beschreibung passt besser zu dir?',
    options: [
      {
        en: 'I like depth and systems — I want to learn, optimize, and unlock everything',
        zh: '我喜欢深度和系统——我想学习、优化、解锁所有东西',
        zhTW: '我喜歡深度和系統——我想學習、優化、解鎖所有東西',
        ja: '深さとシステムが好き — 学んで、最適化して、全部解放したい',
        ko: '깊이와 시스템을 좋아해요 — 배우고, 최적화하고, 모든 걸 해금하고 싶어요',
        de: 'Ich mag Tiefe und Systeme — ich will lernen, optimieren und alles freischalten',
        type: 'sdv',
      },
      {
        en: "I like gentle charm — I want to feel cozy, not challenged",
        zh: '我喜欢温和的魅力——我想感受治愈，而不是接受挑战',
        zhTW: '我喜歡溫和的魅力——我想感受治癒，而不是接受挑戰',
        ja: 'ゆるくてかわいい雰囲気が好き — 癒されたいだけで、チャレンジしたいわけじゃない',
        ko: '따뜻하고 귀여운 분위기가 좋아요 — 힐링하러 왔지, 도전하러 온 게 아니에요',
        de: 'Ich mag gemütlichen Charme — ich will mich wohlfühlen, nicht herausgefordert werden',
        type: 'acnh',
      },
      {
        en: 'A bit of both — depth when I want it, easy when I need it',
        zh: '两者兼具——想要的时候有深度，需要的时候很轻松',
        zhTW: '兩者兼具——想要的時候有深度，需要的時候很輕鬆',
        ja: '両方あり — 深みもほしいけど、気楽に遊べる日もある',
        ko: '둘 다 조금씩 — 깊이도 좋지만 가볍게 즐길 수 있는 날도 필요해요',
        de: 'Beides ein bisschen — Tiefe wenn ich will, entspannt wenn ich es brauche',
        type: 'both-sdv',
      },
      {
        en: 'Mainly ease — I come to cozy games to escape stress, not manage it',
        zh: '主要是轻松——我来玩 cozy 游戏是为了逃避压力，而不是管理它',
        zhTW: '主要是輕鬆——我來玩 cozy 遊戲是為了逃避壓力，而不是管理它',
        ja: '気楽さ重視 — コージーゲームはストレス発散のためであって、ストレス管理じゃない',
        ko: '주로 가볍게 — 코지 게임은 스트레스 해소용이지, 스트레스 관리용이 아니에요',
        de: 'Hauptsächlich Entspannung — ich spiele Cozy Games zum Abschalten, nicht zum Verwalten',
        type: 'both-acnh',
      },
    ],
  },
]

const RESULTS: Record<
  Result,
  {
    title_en: string
    title_zh: string
    title_zhTW: string
    title_ja: string
    title_ko: string
    title_de: string
    emoji: string
    verdict_en: string
    verdict_zh: string
    verdict_zhTW: string
    verdict_ja: string
    verdict_ko: string
    verdict_de: string
    desc_en: string
    desc_zh: string
    desc_zhTW: string
    desc_ja: string
    desc_ko: string
    desc_de: string
    also_en: string
    also_zh: string
    also_zhTW: string
    also_ja: string
    also_ko: string
    also_de: string
  }
> = {
  sdv: {
    title_en: 'Stardew Valley is your game',
    title_zh: '星露谷物语最适合你',
    title_zhTW: '星露谷物語最適合你',
    title_ja: 'スターデューバレーがあなたにぴったり',
    title_ko: '스타듀 밸리가 당신에게 딱 맞는 게임이에요',
    title_de: 'Stardew Valley ist dein Spiel',
    emoji: '🌾',
    verdict_en: 'Goal-driven · Deep systems · Completionist soul',
    verdict_zh: '目标驱动 · 深度系统 · 收集完美主义者',
    verdict_zhTW: '目標驅動 · 深度系統 · 收集完美主義者',
    verdict_ja: '目標達成型 · 深いシステム · コレクター気質',
    verdict_ko: '목표 지향형 · 깊은 시스템 · 수집 완벽주의자',
    verdict_de: 'Zielorientiert · Tiefe Systeme · Perfektionist',
    desc_en:
      "You are a Stardew Valley person through and through. You want to accomplish things — build the perfect farm, finish the community center, unlock every recipe, romance a character you love, and eventually explore the secret endgame content. Stardew rewards the kind of engagement you bring: the willingness to learn systems, optimize crop rotations, figure out the best mining paths, and put in time to see real progress. It gives you four seasons of structured goals that keep each playthrough feeling purposeful. At ~$15 for 300+ hours of content, it's one of the best games ever made at any price.",
    desc_zh:
      '你是彻头彻尾的星露谷物语人。你想要完成事情——建造完美的农场、完成社区中心、解锁所有配方、与心爱的角色恋爱，最终探索秘密的后期游戏内容。星露谷奖励你带来的参与度：愿意学习系统、优化作物轮换、找出最佳挖矿路径，并投入时间看到真正的进步。它给你四个季节的结构化目标，让每次游戏都感觉有目的性。约 100 元人民币就能获得 300 小时以上的内容，它是任何价位有史以来最好的游戏之一。',
    desc_zhTW:
      '你是徹頭徹尾的星露谷物語人。你想要完成事情——建造完美的農場、完成社區中心、解鎖所有配方、與心愛的角色戀愛，最終探索秘密的後期遊戲內容。星露谷獎勵你帶來的參與度：願意學習系統、優化作物輪換、找出最佳挖礦路徑，並投入時間看到真正的進步。它給你四個季節的結構化目標，讓每次遊戲都感覺有目的性。約 450 元台幣就能獲得 300 小時以上的內容，它是任何價位有史以來最好的遊戲之一。',
    desc_ja:
      'あなたは生粋のスターデューバレープレイヤーです。やり遂げたいことがある——理想の農場を作り上げ、コミュニティセンターを修復し、全レシピを解放して、推しキャラと恋愛し、そして隠されたエンドゲームコンテンツまで探求したい。スターデューバレーはそういう姿勢のプレイヤーに最高の報酬をくれます。作物ローテーションを最適化したり、鉱山の最短ルートを研究したり、地道にプレイして本当の意味で進んでいく達成感。四季を通じた構造的な目標が、何周しても新鮮なプレイ体験を生み出します。約2,000円で300時間以上遊べるコスパは、ゲーム史上最強クラスです。',
    desc_ko:
      '당신은 완전한 스타듀 밸리 플레이어예요. 뭔가를 이뤄내고 싶은 사람 — 완벽한 농장을 짓고, 커뮤니티 센터를 완성하고, 모든 레시피를 해금하고, 좋아하는 캐릭터와 연애하고, 숨겨진 엔드게임 콘텐츠까지 탐험하고 싶죠. 스타듀 밸리는 그런 열정에 확실히 보답해요. 시스템을 배우고, 작물 로테이션을 최적화하고, 최적의 광산 루트를 찾아내고, 시간을 쏟아 진짜 성장을 느끼는 그 과정을 게임이 충분히 보상해줍니다. 사계절 구조화된 목표 덕분에 매 플레이마다 의미있는 시간이 됩니다. 약 2만 원에 300시간 이상의 콘텐츠를 즐길 수 있으니, 어떤 가격대를 따져도 역대급 게임임이 분명해요.',
    desc_de:
      'Du bist durch und durch ein Stardew Valley-Spieler. Du willst Dinge accomplish — die perfekte Farm aufbauen, das Gemeinschaftszentrum fertigstellen, jedes Rezept freischalten, eine Beziehung mit deinem Lieblingscharakter eingehen und schließlich den geheimen Endgame-Content erkunden. Stardew belohnt genau dein Engagement: die Bereitschaft, Systeme zu lernen, Fruchtwechsel zu optimieren, den besten Minenweg zu finden und Zeit zu investieren, um echten Fortschritt zu sehen. Es gibt dir vier Jahreszeiten strukturierter Ziele, die jeden Durchlauf sinnvoll machen. Für ca. 15 € und 300+ Stunden Inhalt ist es eines der besten Spiele aller Zeiten.',
    also_en: 'You might also love: Animal Crossing for short sessions when you want a break from goals, and Sun Haven if you want even more RPG depth after Stardew.',
    also_zh: '你可能也喜欢：动物之森（当你想从目标中休息时作为短时间游戏），以及在星露谷之后想要更多 RPG 深度的话可以试试 Sun Haven。',
    also_zhTW: '你可能也會喜歡：動物之森（當你想從目標中休息時作為短時間遊戲），以及在星露谷之後想要更多 RPG 深度的話可以試試 Sun Haven。',
    also_ja: 'こんなゲームもおすすめ：目標から離れてのんびりしたいときはどうぶつの森、さらにRPG要素を求めるならスターデューバレーの後にSun Havenもぜひ。',
    also_ko: '이런 게임도 추천해요: 목표에서 벗어나 짧게 쉬고 싶을 땐 동물의 숲, 스타듀 이후 더 깊은 RPG를 원한다면 Sun Haven도 좋아요.',
    also_de: 'Dir könnte auch gefallen: Animal Crossing für kurze Sessions wenn du eine Pause von Zielen brauchst, und Sun Haven wenn du nach Stardew noch mehr RPG-Tiefe suchst.',
  },
  acnh: {
    title_en: 'Animal Crossing: New Horizons is your game',
    title_zh: '动物之森：新视野最适合你',
    title_zhTW: '動物之森：新視野最適合你',
    title_ja: 'あつまれ どうぶつの森があなたにぴったり',
    title_ko: '모여봐요 동물의 숲이 당신에게 딱 맞는 게임이에요',
    title_de: 'Animal Crossing: New Horizons ist dein Spiel',
    emoji: '🍃',
    verdict_en: 'Creative soul · No pressure · Pure relaxation',
    verdict_zh: '创意灵魂 · 零压力 · 纯粹放松',
    verdict_zhTW: '創意靈魂 · 零壓力 · 純粹放鬆',
    verdict_ja: 'クリエイティブ派 · プレッシャーゼロ · とにかく癒し',
    verdict_ko: '창의적인 영혼 · 부담 없음 · 순수한 힐링',
    verdict_de: 'Kreative Seele · Kein Druck · Pure Entspannung',
    desc_en:
      "You are an Animal Crossing person. You want a game that asks nothing of you — a place you can return to daily, spend 30 peaceful minutes, decorate exactly how you like, chat with adorable villagers, and leave feeling refreshed rather than accomplished. Animal Crossing: New Horizons is the most genuinely stress-free major game ever made: no death, no fail states, no winter that kills your crops, no pressure to progress. Its real-time clock makes your island feel alive in a way no other game matches. You will love it as a daily ritual, a creative canvas, and a place that's always there waiting for you.",
    desc_zh:
      '你是动物之森人。你想要一款对你没有任何要求的游戏——一个你可以每天回来、度过 30 分钟平静时光、按照自己喜欢的方式装饰、与可爱的村民聊天、离开时感觉焕然一新而非成就满满的地方。动物之森：新视野是有史以来最真正没有压力的主要游戏：没有死亡、没有失败机制、没有杀死你作物的冬天、没有进展的压力。它的实时时钟让你的岛屿以没有其他游戏能匹敌的方式充满生机。你会喜欢它作为每日仪式、创意画布，以及永远在那里等待你的地方。',
    desc_zhTW:
      '你是動物之森人。你想要一款對你沒有任何要求的遊戲——一個你可以每天回來、度過 30 分鐘平靜時光、按照自己喜歡的方式裝飾、與可愛的村民聊天、離開時感覺煥然一新而非成就滿滿的地方。動物之森：新視野是有史以來最真正沒有壓力的主要遊戲：沒有死亡、沒有失敗機制、沒有殺死你作物的冬天、沒有進展的壓力。它的即時時鐘讓你的島嶼以沒有其他遊戲能匹敵的方式充滿生機。你會喜歡它作為每日儀式、創意畫布，以及永遠在那裡等待你的地方。',
    desc_ja:
      'あなたは「あつ森」タイプです。あなたが求めているのは、何も要求してこないゲーム——毎日ふらっと戻れて、30分ほのぼのと過ごして、好みの島にカスタマイズして、かわいい住民とおしゃべりして、終わったらやり遂げた感じじゃなくてリフレッシュした気分で戻ってこられる場所。あつまれ どうぶつの森は、これまでのメジャーゲームの中で本当の意味でストレスフリーなゲームです。死亡なし、失敗なし、作物を枯らす冬もなし、進めなきゃというプレッシャーもなし。リアルタイム時計のおかげで、島が本当に生きているように感じられる体験は他に代えられません。毎日の習慣として、創造のキャンバスとして、いつでも待っていてくれる場所として——きっと大好きになれます。',
    desc_ko:
      '당신은 동물의 숲 타입이에요. 아무것도 요구하지 않는 게임이 필요한 사람 — 매일 돌아와서 30분 평화롭게 보내고, 내 취향대로 꾸미고, 귀여운 주민들과 대화하고, 나올 때 성취감이 아니라 상쾌한 기분을 느낄 수 있는 곳. 모여봐요 동물의 숲은 역대 메이저 게임 중 가장 진정으로 스트레스 없는 게임이에요. 죽음도, 실패도, 작물을 죽이는 겨울도, 진행 압박도 없어요. 실시간 시계 덕분에 섬이 진짜 살아있는 것처럼 느껴지는 경험은 다른 게임이 따라오기 힘들어요. 매일의 루틴으로, 창의적인 캔버스로, 언제나 기다려주는 공간으로 — 분명히 푹 빠지게 될 거예요.',
    desc_de:
      'Du bist ein Animal Crossing-Mensch. Du willst ein Spiel, das nichts von dir verlangt — einen Ort, zu dem du täglich zurückkehren kannst, 30 entspannte Minuten verbringst, genau nach deinem Geschmack dekorierst, mit niedlichen Dorfbewohnern plauderst und erfrischt statt erschöpft rausgehst. Animal Crossing: New Horizons ist das stressfreieste große Spiel, das je gemacht wurde: kein Tod, keine Fehlerzustände, kein Winter, der deine Pflanzen tötet, kein Druck voranzukommen. Durch die Echtzeituhr fühlt sich deine Insel auf eine Weise lebendig an, die kein anderes Spiel erreicht. Du wirst es als tägliches Ritual, als kreative Leinwand und als Ort lieben, der immer auf dich wartet.',
    also_en: 'You might also love: Spiritfarer for emotional storytelling with gentle gameplay, and Disney Dreamlight Valley for more character quests within a similar cozy life-sim feel.',
    also_zh: '你可能也喜欢：Spiritfarer（有情感叙事和温和游戏玩法），以及 Disney Dreamlight Valley（在类似治愈生活模拟感觉中有更多角色任务）。',
    also_zhTW: '你可能也會喜歡：Spiritfarer（有情感敘事和溫和遊戲玩法），以及 Disney Dreamlight Valley（在類似治癒生活模擬感覺中有更多角色任務）。',
    also_ja: 'こんなゲームもおすすめ：感動的なストーリーとやさしいゲームプレイを楽しみたいならSpiritfarer、同じほっこり感でキャラクタークエストをもっと楽しみたいならDisney Dreamlight Valleyもいいですよ。',
    also_ko: '이런 게임도 추천해요: 감성적인 스토리와 부드러운 게임플레이를 원한다면 Spiritfarer, 비슷한 코지 감성에서 캐릭터 퀘스트를 즐기고 싶다면 Disney Dreamlight Valley도 좋아요.',
    also_de: 'Dir könnte auch gefallen: Spiritfarer für emotionales Geschichtenerzählen mit sanftem Gameplay, und Disney Dreamlight Valley für mehr Charakterquests im ähnlich gemütlichen Life-Sim-Gefühl.',
  },
  'both-sdv': {
    title_en: 'Play both — start with Stardew Valley',
    title_zh: '两款都值得玩——从星露谷物语开始',
    title_zhTW: '兩款都值得玩——從星露谷物語開始',
    title_ja: '両方遊ぼう — まずはスターデューバレーから',
    title_ko: '둘 다 해봐요 — 스타듀 밸리부터 시작하세요',
    title_de: 'Spiel beide — fang mit Stardew Valley an',
    emoji: '🌾🍃',
    verdict_en: 'Balanced · Goal-leaning · Both will reward you',
    verdict_zh: '均衡 · 偏向目标 · 两款都会给你回报',
    verdict_zhTW: '均衡 · 偏向目標 · 兩款都會給你回報',
    verdict_ja: 'バランス型 · 目標寄り · どちらも楽しめる',
    verdict_ko: '균형잡힌 · 목표 지향 · 둘 다 재밌어요',
    verdict_de: 'Ausgewogen · Zielorientiert · Beide werden dich belohnen',
    desc_en:
      "You will love both games — but start with Stardew Valley. Your answers show you appreciate depth and progression, which Stardew delivers in abundance. Complete at least one full year (in-game) in Stardew first — experience the farming loop, the mine progression, and the community center restoration. Once you have that foundation, Animal Crossing becomes a beautiful complement: a lighter game you play in short daily sessions without the goal pressure. Many players love both games for exactly this reason — Stardew for focused sessions when you have time and energy, Animal Crossing for gentle daily check-ins.",
    desc_zh:
      '两款游戏你都会喜欢——但从星露谷物语开始。你的回答显示你欣赏深度和进展，而星露谷在这方面提供了大量内容。先在星露谷完成至少一个完整年（游戏内）——体验农业循环、矿洞进度和社区中心修复。一旦你有了这个基础，动物之森就成为美好的补充：一款你在短暂的日常时段里没有目标压力地游玩的轻度游戏。许多玩家正是因为这个原因喜欢两款游戏——有时间和精力时玩星露谷进行专注游戏，动物之森则作为温和的每日签到。',
    desc_zhTW:
      '兩款遊戲你都會喜歡——但從星露谷物語開始。你的回答顯示你欣賞深度和進展，而星露谷在這方面提供了大量內容。先在星露谷完成至少一個完整年（遊戲內）——體驗農業循環、礦洞進度和社區中心修復。一旦你有了這個基礎，動物之森就成為美好的補充：一款你在短暫的日常時段裡沒有目標壓力地遊玩的輕度遊戲。許多玩家正是因為這個原因喜歡兩款遊戲——有時間和精力時玩星露谷進行專注遊戲，動物之森則作為溫和的每日簽到。',
    desc_ja:
      '両方楽しめます——でも最初はスターデューバレーから始めましょう。あなたの回答からは、深さと進行感を大切にしていることが伝わります。スターデューバレーはまさにそこに応えるゲームです。まずはゲーム内で1年以上プレイして——農業ループ、鉱山の攻略、コミュニティセンターの修復を体験してください。その基盤ができたら、あつまれ どうぶつの森が素晴らしい補完になります。目標プレッシャーなしに、毎日ちょっとだけ遊ぶ軽いゲームとして。この組み合わせで楽しんでいるプレイヤーは多いです——余裕があるときはスターデューでじっくり、毎朝の習慣としてあつ森を開く、そんなスタイルで。',
    desc_ko:
      '두 게임 모두 좋아하게 될 거예요 — 하지만 스타듀 밸리를 먼저 해보세요. 당신의 답변을 보면 깊이와 진행감을 중시한다는 게 느껴지는데, 스타듀 밸리가 바로 그걸 제대로 제공해줘요. 먼저 게임 내에서 최소 1년 치 플레이를 경험해보세요 — 농사 사이클, 광산 공략, 커뮤니티 센터 복원을 직접 느껴보는 거예요. 그 기반이 생기면 동물의 숲이 훌륭한 보완재가 됩니다. 목표 압박 없이 매일 짧게 즐기는 가벼운 게임으로요. 많은 플레이어들이 이 조합을 사랑하는 이유예요 — 시간과 에너지가 있을 때는 스타듀로 집중 플레이, 매일 가볍게 체크인할 때는 동물의 숲으로.',
    desc_de:
      'Du wirst beide Spiele lieben — aber fang mit Stardew Valley an. Deine Antworten zeigen, dass du Tiefe und Fortschritt schätzt, was Stardew in Hülle und Fülle bietet. Schließe zuerst mindestens ein komplettes Jahr (im Spiel) in Stardew ab — erlebe den Farmzyklus, den Minenfortschritt und die Wiederherstellung des Gemeinschaftszentrums. Wenn du diese Grundlage hast, wird Animal Crossing zur wunderschönen Ergänzung: ein leichteres Spiel, das du in kurzen täglichen Sessions ohne Zieldruck spielst. Viele Spieler lieben beide Spiele genau deshalb — Stardew für fokussierte Sessions wenn man Zeit hat, Animal Crossing für sanfte tägliche Check-ins.',
    also_en: 'After both: try Palia for a free online cozy MMO that blends the social relaxation of Animal Crossing with some of Stardew\'s farming depth.',
    also_zh: '两款都玩完之后：试试 Palia——一款免费的在线 cozy MMO，将动物之森的社交放松与星露谷的部分农业深度融合在一起。',
    also_zhTW: '兩款都玩完之後：試試 Palia——一款免費的線上 cozy MMO，將動物之森的社交放鬆與星露谷的部分農業深度融合在一起。',
    also_ja: '両方クリアしたら：Paliaがおすすめです。あつ森のソーシャルなのんびり感とスターデューの農業の深さを融合させた、無料のオンラインコージーMMOです。',
    also_ko: '둘 다 해봤다면: Palia를 추천해요 — 동물의 숲의 소셜한 편안함과 스타듀 밸리의 농사 깊이를 합친 무료 온라인 코지 MMO예요.',
    also_de: 'Nach beiden: Probier Palia — ein kostenloser Online-Cozy-MMO, der die soziale Entspannung von Animal Crossing mit etwas von Stardews Farmtiefe verbindet.',
  },
  'both-acnh': {
    title_en: 'Play both — start with Animal Crossing',
    title_zh: '两款都值得玩——从动物之森开始',
    title_zhTW: '兩款都值得玩——從動物之森開始',
    title_ja: '両方遊ぼう — まずはあつまれ どうぶつの森から',
    title_ko: '둘 다 해봐요 — 동물의 숲부터 시작하세요',
    title_de: 'Spiel beide — fang mit Animal Crossing an',
    emoji: '🍃🌾',
    verdict_en: 'Balanced · Relaxation-leaning · Both will reward you',
    verdict_zh: '均衡 · 偏向放松 · 两款都会给你回报',
    verdict_zhTW: '均衡 · 偏向放鬆 · 兩款都會給你回報',
    verdict_ja: 'バランス型 · リラックス寄り · どちらも楽しめる',
    verdict_ko: '균형잡힌 · 힐링 지향 · 둘 다 재밌어요',
    verdict_de: 'Ausgewogen · Entspannungsorientiert · Beide werden dich belohnen',
    desc_en:
      "You will love both games — but start with Animal Crossing: New Horizons. Your preference for flexibility and low pressure means ACNH's gentle real-time rhythm will feel immediately natural. Spend a month or two visiting your island daily, decorating, meeting your villagers, and experiencing the seasons. After that foundation, Stardew Valley opens up beautifully as a game you can choose to go deeper when you have more time and energy. Many players discover that the two games fill different moods perfectly: Animal Crossing for daily maintenance and relaxation, Stardew Valley for weekend sessions with more focus.",
    desc_zh:
      '两款游戏你都会喜欢——但从动物之森：新视野开始。你对灵活性和低压力的偏好意味着动物之森温和的实时节奏会立刻感觉自然。花一两个月每天拜访你的岛屿、装饰、认识你的村民、体验季节。有了这个基础之后，星露谷物语就作为一款你有更多时间和精力时可以选择深入的游戏而美妙地展开。许多玩家发现这两款游戏完美地填补了不同的心情：动物之森用于每日维护和放松，星露谷物语用于周末更专注的游戏时段。',
    desc_zhTW:
      '兩款遊戲你都會喜歡——但從動物之森：新視野開始。你對靈活性和低壓力的偏好意味著動物之森溫和的即時節奏會立刻感覺自然。花一兩個月每天拜訪你的島嶼、裝飾、認識你的村民、體驗季節。有了這個基礎之後，星露谷物語就作為一款你有更多時間和精力時可以選擇深入的遊戲而美妙地展開。許多玩家發現這兩款遊戲完美地填補了不同的心情：動物之森用於每日維護和放鬆，星露谷物語用於週末更專注的遊戲時段。',
    desc_ja:
      '両方楽しめます——でも最初はあつまれ どうぶつの森から始めましょう。あなたが好むフレキシビリティと低プレッシャーには、あつ森のゆったりしたリアルタイムリズムがすぐにしっくりきます。1〜2ヶ月間、毎日島を訪れて、飾って、住民と仲良くなって、季節の変化を楽しんでください。その感覚をつかんだら、スターデューバレーが素晴らしい選択肢として開けてきます。時間と気力があるときに、もっと深みにはまりにいくゲームとして。この組み合わせを楽しんでいるプレイヤーは多い——毎日のルーティンはあつ森、週末の集中プレイはスターデュー、という感じで。',
    desc_ko:
      '두 게임 모두 좋아하게 될 거예요 — 하지만 모여봐요 동물의 숲부터 시작하세요. 유연함과 낮은 압박을 선호하는 당신에게 동물의 숲의 여유로운 실시간 리듬은 바로 자연스럽게 느껴질 거예요. 한두 달 동안 매일 섬을 방문하고, 꾸미고, 주민들과 친해지고, 계절의 변화를 느껴보세요. 그 감각이 생긴 뒤 스타듀 밸리를 열면 완전히 다른 매력으로 다가와요. 시간과 여유가 생길 때 더 깊이 파고드는 게임으로요. 많은 플레이어가 이 조합에 빠지는 이유 — 매일 루틴은 동물의 숲, 주말 집중 플레이는 스타듀 밸리.',
    desc_de:
      'Du wirst beide Spiele lieben — aber fang mit Animal Crossing: New Horizons an. Deine Vorliebe für Flexibilität und wenig Druck bedeutet, dass ACNHs sanfter Echtzeit-Rhythmus sich sofort natürlich anfühlen wird. Verbringe ein bis zwei Monate damit, täglich deine Insel zu besuchen, zu dekorieren, deine Dorfbewohner kennenzulernen und die Jahreszeiten zu erleben. Mit dieser Grundlage öffnet sich Stardew Valley wunderschön als Spiel, das du wählen kannst, wenn du mehr Zeit und Energie hast. Viele Spieler entdecken, dass beide Spiele verschiedene Stimmungen perfekt füllen: Animal Crossing für tägliche Pflege und Entspannung, Stardew Valley für Wochenendsessions mit mehr Fokus.',
    also_en: "After both: Spiritfarer is the perfect next step — it blends Animal Crossing's gentle management with a story that will stay with you for years.",
    also_zh: '两款都玩完之后：Spiritfarer 是完美的下一步——它将动物之森的温和经营与一个会在你心里留存多年的故事融合在一起。',
    also_zhTW: '兩款都玩完之後：Spiritfarer 是完美的下一步——它將動物之森的溫和經營與一個會在你心裡留存多年的故事融合在一起。',
    also_ja: '両方クリアしたら：Spiritfarerがぴったりの次のステップです。あつ森のやさしい管理要素に、何年も心に残り続けるストーリーを融合させた作品です。',
    also_ko: '둘 다 해봤다면: Spiritfarer가 완벽한 다음 단계예요 — 동물의 숲의 잔잔한 경영 요소에 오래오래 마음에 남을 이야기를 더한 작품이에요.',
    also_de: 'Nach beiden: Spiritfarer ist der perfekte nächste Schritt — es verbindet ACNHs sanftes Management mit einer Geschichte, die dich jahrelang begleiten wird.',
  },
}

function calcResult(answers: Result[]): Result {
  const counts: Record<Result, number> = { sdv: 0, acnh: 0, 'both-sdv': 0, 'both-acnh': 0 }
  for (const a of answers) counts[a]++
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return sorted[0][0] as Result
}

export function StardewVsACNHQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const [answers, setAnswers] = useState<(Result | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Result[])]
    const url = `${BASE_URL}/${locale}/quizzes/stardew-vs-animal-crossing`
    const shareText = getLoc(
      `星露谷 vs 动物之森——测验说我应该玩：${result.title_zh}！找到你的答案：${url}`,
      `Stardew Valley vs Animal Crossing — the quiz says: ${result.title_en}! Find yours: ${url}`,
      `星露谷 vs 動物之森——測驗說我應該玩：${result.title_zhTW}！找到你的答案：${url}`,
      `スターデュー vs どうぶつの森クイズの結果：${result.title_ja}！あなたの結果はこちら：${url}`,
      `스타듀 vs 동물의 숲 — 테스트 결과: ${result.title_ko}! 나도 해보기: ${url}`,
      `Stardew Valley vs Animal Crossing — das Quiz sagt: ${result.title_de}! Mach selbst mit: ${url}`,
    )

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-5xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {getLoc(result.verdict_zh, result.verdict_en, result.verdict_zhTW, result.verdict_ja, result.verdict_ko, result.verdict_de)}
          </p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}
          </h2>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
            {getLoc('你可能也会喜欢', 'You might also love', '你可能也會喜歡', 'こんなゲームもおすすめ', '이런 게임도 추천해요', 'Dir könnte auch gefallen')}
          </p>
          <p className="text-sm text-[#8a9a7a]">
            {getLoc(result.also_zh, result.also_en, result.also_zhTW, result.also_ja, result.also_ko, result.also_de)}
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
            '星露谷物语 vs 动物之森：哪款更适合你？',
            'Stardew Valley vs Animal Crossing: Which Is Right for You?',
            '星露谷物語 vs 動物之森：哪款更適合你？',
            'スターデューバレー vs どうぶつの森：どっちがあなたに合ってる？',
            '스타듀 밸리 vs 동물의 숲: 어느 쪽이 나에게 맞을까?',
            'Stardew Valley vs Animal Crossing: Was passt besser zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，帮你在星露谷物语和动物之森之间做出选择——或者找到两款都玩的最佳顺序',
            '6 questions to help you choose between Stardew Valley and Animal Crossing — or find the best order to play both',
            '6 個問題，幫你在星露谷物語和動物之森之間做出選擇——或者找到兩款都玩的最佳順序',
            'スターデューバレーとどうぶつの森、どっちを選ぶ？6つの質問でわかる——あるいは両方やる順番も',
            '6개의 질문으로 스타듀 밸리와 동물의 숲 중 어느 쪽이 맞는지 알아보세요 — 혹은 둘 다 할 최적의 순서도 알 수 있어요',
            '6 Fragen, die dir helfen zwischen Stardew Valley und Animal Crossing zu wählen — oder die beste Reihenfolge für beide zu finden',
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
        {getLoc('找到我的答案', 'Find My Answer', '找到我的答案', '結果を見る', '내 결과 보기', 'Mein Ergebnis finden')}
      </button>
    </div>
  )
}
