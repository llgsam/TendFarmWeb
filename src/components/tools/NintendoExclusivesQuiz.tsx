'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'zelda' | 'pikmin' | 'mario' | 'kirby'

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
    q_en: 'What makes a Nintendo game sound exciting to you?',
    q_zh: '什么样的 Nintendo 游戏最能让你心动？',
    q_zhTW: '什麼樣的 Nintendo 遊戲最能讓你心動？',
    q_ja: 'Nintendo のどんなゲームがワクワクしますか？',
    q_ko: '어떤 Nintendo 게임이 가장 설레나요?',
    q_de: 'Was macht ein Nintendo-Spiel für dich besonders aufregend?',
    options: [
      {
        en: 'A vast open world where I can build anything, explore in any order, and spend 100+ hours barely scratching the surface — a game that rewards curiosity above all else',
        zh: '一个我可以建造任何东西、按任意顺序探索并花费 100 多小时仍感觉才触及皮毛的广阔开放世界——一款最奖励好奇心的游戏',
        zhTW: '一個可以建造任何東西、按任意順序探索並花費 100 多小時仍感覺才觸及皮毛的廣闊開放世界——一款最獎勵好奇心的遊戲',
        ja: '何でも作れて、どこでも行けて、100時間以上遊んでもまだ触れていない場所がある広大なオープンワールド——好奇心を最大限に報酬にしてくれるゲーム',
        ko: '무엇이든 만들고, 어느 순서로든 탐험하고, 100시간 넘게 플레이해도 아직 못 간 곳이 있는 광활한 오픈 월드——호기심을 가장 크게 보상해주는 게임',
        de: 'Eine riesige offene Welt, in der ich alles bauen, in jeder Reihenfolge erkunden und 100+ Stunden spielen kann, ohne das Gefühl zu haben, die Oberfläche gekratzt zu haben — ein Spiel, das Neugier über alles belohnt',
        type: 'zelda',
      },
      {
        en: 'A strategic, slightly cozy game where I manage small creatures that feel almost like a garden — charming and deceptively smart, with emergent problem-solving at its core',
        zh: '一款管理小生物的策略、略微舒适的游戏，感觉有点像打理花园——迷人且出乎意料地聪明，以涌现式解题为核心',
        zhTW: '一款管理小生物的策略、略微舒適的遊戲，感覺有點像打理花園——迷人且出乎意料地聰明，以湧現式解題為核心',
        ja: '小さな生き物たちを管理する、ちょっとほのぼのした戦略ゲーム——ガーデニングみたいな感覚で、見た目は可愛いのに中身は奥深い',
        ko: '작은 생명체들을 관리하는 아늑한 전략 게임——정원 가꾸기 같은 느낌으로, 귀엽지만 생각보다 훨씬 깊이 있는 퍼즐 게임',
        de: 'Ein strategisches, leicht gemütliches Spiel, bei dem ich kleine Pflanzenwesen verwalte — charmant und überraschend klug, mit emergenter Problemlösung als Kern',
        type: 'pikmin',
      },
      {
        en: 'A wildly creative 2D platformer bursting with ideas — every level introduces something new, and the game clearly loves having fun with its own rules',
        zh: '一款创意无限的 2D 平台游戏，充满各种想法——每个关卡都会引入新的元素，游戏显然热爱颠覆自己的规则',
        zhTW: '一款創意無限的 2D 平台遊戲，充滿各種想法——每個關卡都會引入新元素，遊戲顯然熱愛顛覆自己的規則',
        ja: '遊び心あふれる2Dアクションゲーム——ステージごとに新しいアイデアが飛び出して、ゲーム自体がルールをひっくり返すのを楽しんでいる感じ',
        ko: '아이디어가 폭발하는 2D 플랫포머——스테이지마다 새로운 요소가 등장하고, 게임 자체가 자신의 규칙을 뒤집는 걸 즐기는 느낌',
        de: 'Ein kreativ sprühender 2D-Plattformer voller Ideen — jedes Level überrascht mit etwas Neuem, und das Spiel liebt es, seine eigenen Regeln umzuwerfen',
        type: 'mario',
      },
      {
        en: 'The most welcoming game on the platform — one designed to be genuinely completable even if I have almost no gaming experience, with a cast of characters I can fall in love with',
        zh: '平台上最友好的游戏——即使我几乎没有游戏经验也能真正通关，拥有一批让我爱上的角色阵容',
        zhTW: '平台上最友好的遊戲——即使幾乎沒有遊戲經驗也能真正通關，擁有一批讓人愛上的角色陣容',
        ja: 'Switch一番の入門に優しいゲーム——ゲーム経験がほぼゼロでもクリアできて、キャラクターが全員愛着持てる',
        ko: '플랫폼에서 가장 접근하기 쉬운 게임——게임 경험이 거의 없어도 엔딩을 볼 수 있고, 캐릭터들이 모두 정이 드는 게임',
        de: 'Das zugänglichste Spiel der Plattform — eines, das ich wirklich durchspielen kann, auch wenn ich kaum Spielerfahrung habe, mit Charakteren zum Verlieben',
        type: 'kirby',
      },
    ],
  },
  {
    q_en: 'How much time are you ready to invest?',
    q_zh: '你准备投入多少时间？',
    q_zhTW: '你準備投入多少時間？',
    q_ja: 'どのくらい時間をかける覚悟がありますか？',
    q_ko: '얼마나 많은 시간을 투자할 준비가 되어 있나요?',
    q_de: 'Wie viel Zeit bist du bereit zu investieren?',
    options: [
      {
        en: '100–200 hours — I want a game that I am still actively playing three months after I started, where the map keeps revealing new things and every session surfaces a new surprise',
        zh: '100-200 小时——我想要一款我在开始三个月后仍在积极游玩的游戏，地图不断揭示新内容，每次游玩都会带来新惊喜',
        zhTW: '100-200 小時——我想要一款開始三個月後仍在積極遊玩的遊戲，地圖不斷揭示新內容，每次遊玩都會帶來新驚喜',
        ja: '100〜200時間——3ヶ月後もまだ遊んでいて、マップを開くたびに新しい場所が見つかるようなゲームがいい',
        ko: '100~200시간——시작한 지 세 달이 지나도 여전히 플레이하고, 맵을 열 때마다 새로운 발견이 있는 게임',
        de: '100–200 Stunden — ein Spiel, das ich noch drei Monate nach dem Start aktiv spiele, wo die Karte immer Neues enthüllt und jede Session neue Überraschungen bietet',
        type: 'zelda',
      },
      {
        en: '30–40 hours for the main story, with replay value in going back for S-rank scores on my favorite missions — complete at a natural length without overstaying',
        zh: '主线 30-40 小时，回头在最喜欢的任务中刷 S 级评分有重玩价值——在自然的长度内完整，不会过度拖延',
        zhTW: '主線 30-40 小時，回頭在最喜歡的任務中刷 S 級評分有重玩價值——在自然的長度內完整，不會過度拖延',
        ja: 'メインストーリー30〜40時間、気に入ったミッションでSランクを狙う周回プレイも楽しめる長さ',
        ko: '메인 스토리 30~40시간, 좋아하는 미션에서 S랭크를 노리는 재플레이도 즐길 수 있는 적당한 볼륨',
        de: '30–40 Stunden für die Hauptgeschichte, mit Wiederspielwert beim S-Rang auf Lieblingsmissionen — vollständig in natürlicher Länge ohne zu strecken',
        type: 'pikmin',
      },
      {
        en: '15–20 hours of pure joy — a game I can finish in a week of evenings, feel completely satisfied, and revisit specific favorite levels for years',
        zh: '15-20 小时的纯粹喜悦——一款我能在一周的晚上通关、完全满足、并在多年后重访特定喜爱关卡的游戏',
        zhTW: '15-20 小時的純粹喜悅——一款能在一週的晚上通關、完全滿足、並在多年後重訪特定喜愛關卡的遊戲',
        ja: '15〜20時間のピュアな楽しさ——一週間の夜で終わってもスッキリ満足できて、気に入ったステージに何年後も戻れる',
        ko: '15~20시간의 순수한 즐거움——일주일 저녁에 클리어하고도 완전히 만족스럽고, 몇 년 뒤에 좋아하는 스테이지를 다시 즐길 수 있는 게임',
        de: '15–20 Stunden purer Freude — ein Spiel, das ich in einer Woche abends durchspielen, komplett befriedigt fühlen und Lieblingslevel jahrelang wieder besuchen kann',
        type: 'mario',
      },
      {
        en: '10–15 hours on my first run, with an easy mode that lets me see everything without frustration — I want to experience the whole game without getting stuck',
        zh: '第一次游玩 10-15 小时，有简单模式让我无需挫折地看到所有内容——我想体验整个游戏而不会卡关',
        zhTW: '第一次遊玩 10-15 小時，有簡單模式讓我無需挫折地看到所有內容——我想體驗整個遊戲而不會卡關',
        ja: '初回プレイ10〜15時間、イージーモードでストレスなく全部見られる——詰まらずにゲーム全体を体験したい',
        ko: '처음 플레이에 10~15시간, 이지 모드로 스트레스 없이 모든 것을 볼 수 있는——막히지 않고 게임 전체를 경험하고 싶어요',
        de: '10–15 Stunden beim ersten Durchlauf mit einem einfachen Modus, der mir alles zeigt — ich will das ganze Spiel erleben, ohne feststeckend',
        type: 'kirby',
      },
    ],
  },
  {
    q_en: 'How do you feel about challenge and skill?',
    q_zh: '你对挑战难度和技巧要求的感受是？',
    q_zhTW: '你對挑戰難度和技巧要求的感受是？',
    q_ja: 'チャレンジや難しさについて、どう感じますか？',
    q_ko: '도전과 실력에 대해 어떻게 느끼나요?',
    q_de: 'Wie stehst du zu Herausforderung und Geschick?',
    options: [
      {
        en: "I want challenge that I set myself — the game has hard shrines and optional boss fights, but the open world means I can always go do something else and return when I'm ready",
        zh: '我想要自己设定的挑战——游戏有困难神庙和可选 Boss 战，但开放世界意味着我随时可以去做其他事情，准备好后再回来',
        zhTW: '我想要自己設定的挑戰——遊戲有困難神廟和可選 Boss 戰，但開放世界意味著我隨時可以去做其他事情，準備好後再回來',
        ja: '自分でチャレンジの難易度を決めたい——難しいほこらや任意のボス戦はあるけど、オープンワールドだからいつでも別のことをして、準備ができたら戻れる',
        ko: '내가 스스로 도전 수준을 정하고 싶어요——어려운 사당이나 선택적 보스 전투가 있지만, 오픈 월드라 언제든 다른 걸 하다가 준비되면 돌아올 수 있으니까요',
        de: 'Ich will eine Herausforderung, die ich mir selbst setze — das Spiel hat schwierige Schreine und optionale Bosskämpfe, aber die offene Welt bedeutet, ich kann immer woanders hingehen und zurückkehren, wenn ich bereit bin',
        type: 'zelda',
      },
      {
        en: "Puzzle-based challenge — I want to feel clever for figuring out the optimal creature deployment, not twitch-reflex tested; the difficulty comes from planning, not execution speed",
        zh: '基于谜题的挑战——我想因为找到了最优生物部署方案而感到聪明，而不是被快速反应测试；难度来自计划，而非执行速度',
        zhTW: '基於謎題的挑戰——我想因為找到了最優生物部署方案而感到聰明，而不是被快速反應測試；難度來自計劃，而非執行速度',
        ja: 'パズル系の難しさが好き——最適な生き物の配置を考えて「うまくいった！」と感じたい。反射神経じゃなくて計画性が試されるほうが好き',
        ko: '퍼즐 기반의 도전이 좋아요——최적의 생명체 배치를 찾아내서 "잘했다!" 는 느낌을 받고 싶어요. 반응 속도보다 계획성이 시험받는 게 더 좋아요',
        de: 'Puzzle-basierte Herausforderung — ich will mich clever fühlen, wenn ich die optimale Kreaturenaufstellung herausfinde, nicht auf Reaktionszeit getestet werden; die Schwierigkeit kommt aus der Planung, nicht der Ausführungsgeschwindigkeit',
        type: 'pikmin',
      },
      {
        en: 'Moderate platforming challenge — hard enough to feel satisfying when I clear a tricky section, but never so punishing that I replay the same segment more than a handful of times',
        zh: '适中的平台挑战——难到足以在通过棘手关卡时感到满足，但不会如此惩罚性地让我重玩同一段落超过几次',
        zhTW: '適中的平台挑戰——難到足以在通過棘手關卡時感到滿足，但不會如此懲罰性地讓我重玩同一段落超過幾次',
        ja: '適度なアクション難度——難しい場面をクリアした時の達成感はほしいけど、同じ場所を何十回もやり直すのはちょっとしんどい',
        ko: '적당한 플랫포밍 도전——어려운 구간을 클리어했을 때 성취감은 있어야 하지만, 같은 구간을 수십 번 반복하는 건 좀 힘들어요',
        de: 'Moderate Plattformer-Herausforderung — schwierig genug, um sich bei einem kniffligen Abschnitt zufrieden zu fühlen, aber nie so bestrafend, dass ich denselben Teil mehr als ein paarmal wiederholen muss',
        type: 'mario',
      },
      {
        en: "Very gentle — I want to enjoy the game's creativity and world without frustration, and I'd use Kirby's health-heavy systems and optional assists to make sure I see everything",
        zh: '非常温和——我想享受游戏的创意和世界而不感到沮丧，我会使用柯比的高生命值系统和可选辅助功能确保看到所有内容',
        zhTW: '非常溫和——我想享受遊戲的創意和世界而不感到沮喪，我會使用柯比的高生命值系統和可選輔助功能確保看到所有內容',
        ja: 'できるだけやさしめがいい——ゲームのアイデアと世界観を楽しみたいので、体力が多めなシステムや補助機能を使って全部見たい',
        ko: '최대한 편안하게——게임의 창의성과 세계관을 즐기고 싶어서, 체력 넉넉한 시스템이나 보조 기능을 활용해 모든 걸 보고 싶어요',
        de: 'Sehr sanft — ich will die Kreativität und Welt des Spiels ohne Frustration genießen und Kirbys gesundheitsstarke Systeme und optionale Hilfen nutzen, um sicherzustellen, dass ich alles sehe',
        type: 'kirby',
      },
    ],
  },
  {
    q_en: 'What story tone appeals to you most?',
    q_zh: '哪种故事基调最吸引你？',
    q_zhTW: '哪種故事基調最吸引你？',
    q_ja: 'どんな物語のトーンが好きですか？',
    q_ko: '어떤 스토리 분위기가 가장 매력적인가요?',
    q_de: 'Welcher Story-Ton spricht dich am meisten an?',
    options: [
      {
        en: 'Mythic and epic — ancient civilizations, a princess lost in time, a kingdom threatened by a darkness that resurfaces from the deep past, and a story that reveals itself slowly through found memories',
        zh: '神话史诗——古老文明、迷失在时间中的公主、被从远古历史中重新浮现的黑暗所威胁的王国，以及通过找到的记忆缓缓揭示的故事',
        zhTW: '神話史詩——古老文明、迷失在時間中的公主、被從遠古歷史中重新浮現的黑暗所威脅的王國，以及透過找到的記憶緩緩揭示的故事',
        ja: '神話的で壮大な物語——古代文明、時の中に消えた姫、過去から甦る闇に脅かされる王国、そして散らばった記憶をたどりながら少しずつ明かされるストーリー',
        ko: '신화적이고 웅장한 이야기——고대 문명, 시간 속에 사라진 공주, 먼 과거에서 되살아난 어둠에 위협받는 왕국, 그리고 흩어진 기억을 모아 서서히 밝혀지는 스토리',
        de: 'Mythisch und episch — alte Zivilisationen, eine in der Zeit verlorene Prinzessin, ein Königreich bedroht von einer Dunkelheit, die aus der fernen Vergangenheit aufsteigt, und eine Geschichte, die sich langsam durch gefundene Erinnerungen enthüllt',
        type: 'zelda',
      },
      {
        en: 'Warmly heroic with surprising depth — Pikmin 4 has a rescue story where you help stranded explorers, with a surprisingly touching dog companion whose bond with Pikmin grows throughout the adventure',
        zh: '温暖英雄主义带有惊人深度——皮克敏 4 有一个救援故事，你帮助被困的探险家，拥有一只出乎意料令人感动的狗狗伙伴，其与皮克敏的羁绊在整个冒险中不断增长',
        zhTW: '溫暖英雄主義帶有驚人深度——皮克敏 4 有一個救援故事，你幫助被困的探險家，擁有一隻出乎意料令人感動的狗狗夥伴，其與皮克敏的羈絆在整個冒險中不斷增長',
        ja: '温かくも意外に深いヒーローもの——ピクミン4は遭難した探検家を助けるレスキューストーリーで、ピクミンたちと絆を深めていく犬の相棒オッチンが感動的',
        ko: '따뜻한 영웅 이야기에 의외의 깊이——피크민 4는 조난당한 탐험가들을 구하는 구조 이야기로, 피크민들과 유대를 쌓아가는 강아지 동료 오치가 감동적이에요',
        de: 'Warmherzig heroisch mit überraschender Tiefe — Pikmin 4 hat eine Rettungsgeschichte, bei der du gestrandeten Entdeckern hilfst, mit einem überraschend rührenden Hundebegleiter, dessen Band mit den Pikmin im Laufe des Abenteuers wächst',
        type: 'pikmin',
      },
      {
        en: 'Pure joyful creativity — Super Mario Wonder has minimal story (save the Flower Kingdom from Bowser), but every Wonder Flower event is its own tiny comedic surprise, and the whole game is saturated with delight',
        zh: '纯粹的喜悦创意——超级马力欧兄弟：奇妙之旅的故事极简（从库巴手中拯救花之王国），但每个奇妙花朵事件都是自己独特的小喜剧惊喜，整款游戏充满喜悦',
        zhTW: '純粹的喜悅創意——超級瑪利歐兄弟：驚奇的故事極簡（從庫巴手中拯救花之王國），但每個驚奇花朵事件都是自己獨特的小喜劇驚喜，整款遊戲充滿喜悅',
        ja: '純粋な喜びと創造性——スーパーマリオブラザーズ ワンダーの話はシンプル（バウザーから花の王国を救う）だけど、ワンダーフラワーが起こす変化が毎回違う小さなドラマで、ゲーム全体が楽しさで満ちている',
        ko: '순수한 기쁨과 창의성——슈퍼 마리오브라더스 원더의 이야기는 단순하지만(쿠파에게서 꽃의 왕국 구하기), 원더 플라워가 일으키는 변화가 매번 달라서 게임 전체가 즐거움으로 넘쳐요',
        de: 'Reine freudige Kreativität — Super Mario Bros. Wonder hat eine minimalistische Geschichte (rette das Blumenreich vor Bowser), aber jedes Wunderblumen-Ereignis ist seine eigene kleine komödiantische Überraschung, und das ganze Spiel ist mit Freude gesättigt',
        type: 'mario',
      },
      {
        en: "Classic Nintendo heart — a clear villain (Meta Knight, King Dedede, or a new threat), characters I've loved for decades, and a finale with the operatic scope that Kirby games always deliver despite their gentle difficulty",
        zh: '经典任天堂情怀——一个明确的反派（魅塔骑士、迪迪迪大王或新威胁）、我喜欢了几十年的角色，以及柯比游戏尽管难度温和但总能呈现的史诗级终章',
        zhTW: '經典任天堂情懷——一個明確的反派（魅塔騎士、迪迪迪大王或新威脅）、喜歡了幾十年的角色，以及柯比遊戲儘管難度溫和但總能呈現的史詩級終章',
        ja: '王道任天堂——明確な悪役（メタナイトやデデデ大王、または新たな脅威）、何十年も好きなキャラクター、そしてカービィシリーズ恒例の難易度が優しくてもスケールの大きいフィナーレ',
        ko: '클래식 닌텐도 감성——명확한 악당(메타나이트, 디디디 대왕 또는 새로운 위협), 수십 년간 좋아해온 캐릭터들, 그리고 난이도는 쉽지만 항상 웅장한 피날레를 선사하는 커비 시리즈만의 전통',
        de: 'Klassisches Nintendo-Herz — ein klarer Bösewicht (Meta Knight, König Dedede oder eine neue Bedrohung), Charaktere, die ich seit Jahrzehnten liebe, und ein Finale mit dem opernhaften Ausmaß, das Kirby-Spiele trotz ihrer sanften Schwierigkeit immer liefern',
        type: 'kirby',
      },
    ],
  },
  {
    q_en: 'Which exploration style fits you best?',
    q_zh: '哪种探索方式最适合你？',
    q_zhTW: '哪種探索方式最適合你？',
    q_ja: 'どんな探索スタイルが好きですか？',
    q_ko: '어떤 탐험 스타일이 가장 잘 맞나요?',
    q_de: 'Welcher Erkundungsstil passt am besten zu dir?',
    options: [
      {
        en: "Nonlinear open world — I want to climb any mountain, dive into any cave, and solve puzzles in creative ways the developers didn't intend; the joy is in the emergent discovery",
        zh: '非线性开放世界——我想爬任何山、潜入任何洞穴，并以开发者未必预料到的创意方式解谜；乐趣在于涌现式发现',
        zhTW: '非線性開放世界——我想爬任何山、潛入任何洞穴，並以開發者未必預料到的創意方式解謎；樂趣在於湧現式發現',
        ja: '自由なオープンワールド——どの山にも登れて、どの洞窟にも潜れて、開発者が想定していない方法でパズルを解く喜びがあるゲーム',
        ko: '자유로운 오픈 월드——어느 산이든 올라가고, 어느 동굴이든 들어가고, 개발자가 상상하지 못한 방법으로 퍼즐을 푸는 즐거움이 있는 게임',
        de: 'Nichtlineares Open World — ich will jeden Berg erklimmen, in jede Höhle tauchen und Rätsel auf kreative Weisen lösen, die die Entwickler nicht vorgesehen haben; die Freude liegt in der emergenten Entdeckung',
        type: 'zelda',
      },
      {
        en: 'Area-by-area expedition — I explore a cave or meadow with my Pikmin squad, solve its puzzles, find its treasures, and return to base before nightfall in a satisfying daily loop',
        zh: '逐区域探险——我带着皮克敏小队探索洞穴或草地，解开谜题、找到宝藏，在令人满足的每日循环中于夜幕降临前返回基地',
        zhTW: '逐區域探險——我帶著皮克敏小隊探索洞穴或草地，解開謎題、找到寶藏，在令人滿足的每日循環中於夜幕降臨前返回基地',
        ja: 'エリアごとの探索——ピクミン隊を率いて洞窟や草原を探索し、謎を解いて宝物を見つけ、夜が来る前に基地に戻る毎日のサイクルが充実感をくれる',
        ko: '구역별 탐험——피크민 부대를 이끌고 동굴이나 초원을 탐험하며, 퍼즐을 풀고 보물을 찾고, 밤이 오기 전에 기지로 돌아가는 매일의 사이클이 뿌듯한 게임',
        de: 'Gebiet-für-Gebiet-Expedition — ich erforsche mit meiner Pikmin-Truppe eine Höhle oder Wiese, löse ihre Rätsel, finde ihre Schätze und kehre vor Einbruch der Dunkelheit in einer befriedigenden täglichen Schleife zur Basis zurück',
        type: 'pikmin',
      },
      {
        en: 'Level-by-level adventure — each level is a contained world with a beginning and end, full of secrets and badges to collect, and I can revisit levels I loved at any time',
        zh: '逐关卡冒险——每个关卡都是有开头和结尾的独立世界，充满可收集的秘密和徽章，我可以随时重访喜欢的关卡',
        zhTW: '逐關卡冒險——每個關卡都是有開頭和結尾的獨立世界，充滿可收集的秘密和徽章，我可以隨時重訪喜歡的關卡',
        ja: 'ステージクリア型の冒険——各ステージが独立した世界で、秘密やバッジが隠れていて、気に入ったステージにいつでも戻れる',
        ko: '스테이지 클리어형 모험——각 스테이지가 독립된 세계로 비밀과 뱃지가 숨겨져 있고, 좋아하는 스테이지에 언제든 다시 돌아갈 수 있는 게임',
        de: 'Level-für-Level-Abenteuer — jedes Level ist eine abgeschlossene Welt mit Anfang und Ende, voller Geheimnisse und Abzeichen zum Sammeln, und ich kann jederzeit Lieblingslevels wieder besuchen',
        type: 'mario',
      },
      {
        en: 'City and hub-based — exploring Waddle Dee Town between levels, finding new shops, meeting NPCs, and watching the town grow as I rescue more Waddle Dees felt like a cozy home to return to',
        zh: '城市和枢纽地图——在关卡之间探索沃都迪小镇、发现新商店、与 NPC 交谈、看着小镇随着我拯救更多沃都迪而成长，感觉像回到了一个温馨的家',
        zhTW: '城市和樞紐地圖——在關卡之間探索沃都迪小鎮、發現新商店、與 NPC 交談、看著小鎮隨著我拯救更多沃都迪而成長，感覺像回到了一個溫馨的家',
        ja: '町やハブ拠点がある探索——ステージ間にワドルディタウンをぶらぶらして、新しいお店を見つけたりNPCと話したり、街が少しずつ成長していく感じが居心地いい',
        ko: '마을과 허브 지도——스테이지 사이에 와들디 마을을 돌아다니며 새 가게를 발견하고, NPC와 대화하고, 마을이 조금씩 성장하는 모습을 보는 게 마치 아늑한 집에 돌아오는 느낌',
        de: 'Stadt und Hub-basiert — zwischen Levels Waddeldorf erkunden, neue Läden finden, NPCs treffen und zusehen, wie die Stadt mit jeder Rettung wächst, fühlte sich wie ein gemütliches Zuhause an',
        type: 'kirby',
      },
    ],
  },
  {
    q_en: 'Which post-session feeling sounds most satisfying?',
    q_zh: '哪种游玩后的感觉最令你满足？',
    q_zhTW: '哪種遊玩後的感覺最令你滿足？',
    q_ja: 'ゲームの後、どんな気持ちになりたいですか？',
    q_ko: '게임 후 어떤 기분이 가장 만족스러운가요?',
    q_de: 'Welches Gefühl nach einer Spielsession klingt am befriedigendsten?',
    options: [
      {
        en: "I just spent two hours building a flying machine out of parts I found in a mine, and it actually worked well enough to carry me across a canyon I hadn't figured out how to cross — this game accepts my chaotic creativity",
        zh: '我刚花了两个小时用在矿山里找到的零件造了一架飞行器，它工作得很好，足以把我带过一个我还没想出怎么穿越的峡谷——这款游戏接受我的混乱创意',
        zhTW: '我剛花了兩個小時用在礦山裡找到的零件造了一架飛行器，它工作得很好，足以把我帶過一個我還沒想出怎麼穿越的峽谷——這款遊戲接受我的混亂創意',
        ja: '鉱山で見つけたパーツで2時間かけて飛行機を作ったら、なんとか峡谷を渡れた——このゲーム、私のカオスな発想を全力で受け入れてくれる',
        ko: '광산에서 찾은 부품으로 2시간 동안 비행기를 만들었더니 어떻게든 협곡을 건너갈 수 있었어요——이 게임은 제 엉뚱한 창의력을 완전히 받아주네요',
        de: 'Ich habe gerade zwei Stunden damit verbracht, aus Teilen, die ich in einer Mine gefunden habe, eine fliegende Maschine zu bauen, und sie hat gut genug funktioniert, um mich über eine Schlucht zu tragen — dieses Spiel akzeptiert meine chaotische Kreativität',
        type: 'zelda',
      },
      {
        en: 'My Pikmin team just completed a dungeon without a single casualty — I planned the route, positioned the right types, and it came together perfectly; the efficiency of it felt deeply satisfying',
        zh: '我的皮克敏团队刚以零伤亡完成了一个地下城——我规划了路线、安排了正确的类型，一切完美配合；这种效率感令人深感满足',
        zhTW: '我的皮克敏團隊剛以零傷亡完成了一個地下城——我規劃了路線、安排了正確的類型，一切完美配合；這種效率感令人深感滿足',
        ja: 'ピクミン部隊が犠牲ゼロでダンジョンをクリアできた——ルートを計画して、正しいタイプを配置して、完璧にはまった時の達成感が最高',
        ko: '피크민 부대가 사망자 없이 던전을 클리어했을 때——경로를 계획하고, 맞는 타입을 배치하고, 모든 것이 딱 맞아떨어지는 그 효율감이 정말 뿌듯해요',
        de: 'Mein Pikmin-Team hat gerade einen Dungeon ohne einen einzigen Verlust abgeschlossen — ich habe die Route geplant, die richtigen Typen positioniert, und es hat perfekt funktioniert; die Effizienz davon war tief befriedigend',
        type: 'pikmin',
      },
      {
        en: 'I just saw a Wonder Flower event that turned Mario into a walking onion being chased by a giant piranha plant through a psychedelic background — I am still laughing ten minutes later',
        zh: '我刚看到一个奇妙花朵事件，让马力欧变成了一颗在迷幻背景中被巨型吞食花追赶的行走洋葱——我在十分钟后仍在大笑',
        zhTW: '我剛看到一個驚奇花朵事件，讓瑪利歐變成了一顆在迷幻背景中被巨型吞食花追趕的行走洋蔥——我在十分鐘後仍在大笑',
        ja: 'ワンダーフラワーで、マリオが巨大パックンフラワーに追いかけられるタマネギになった——10分後もまだ笑ってる',
        ko: '원더 플라워로 마리오가 거대한 파이란하 플랜트에 쫓기는 걸어다니는 양파가 됐을 때——10분이 지나도 아직 웃고 있어요',
        de: 'Ich habe gerade ein Wunderblumen-Ereignis gesehen, das Mario in eine gehende Zwiebel verwandelt hat, die von einer riesigen Piranha-Pflanze durch einen psychedelischen Hintergrund gejagt wird — ich lache noch zehn Minuten später',
        type: 'mario',
      },
      {
        en: 'I just defeated a boss that looked intimidating by inhaling its attacks and copying its power — then used that power for the rest of the world, making me feel inventive and powerful simultaneously',
        zh: '我刚通过吸入攻击并复制能力击败了一个看起来令人生畏的 Boss——然后在整个世界剩余部分使用那个能力，让我同时感到有创意和强大',
        zhTW: '我剛通過吸入攻擊並複製能力擊敗了一個看起來令人生畏的 Boss——然後在整個世界剩餘部分使用那個能力，讓我同時感到有創意和強大',
        ja: '強そうなボスの攻撃を吸い込んでコピーしたら、その能力でそのまま残りのステージを無双できた——創意工夫と強さを同時に感じる瞬間',
        ko: '무서워 보이던 보스의 공격을 흡입해서 카피했더니, 그 능력으로 나머지 스테이지를 쭉 진행할 수 있었어요——창의력과 강함을 동시에 느끼는 순간',
        de: 'Ich habe gerade einen einschüchternd aussehenden Boss besiegt, indem ich seine Attacken eingesaugt und seine Kraft kopiert habe — dann habe ich diese Kraft für den Rest der Welt benutzt, was mich gleichzeitig einfallsreich und mächtig fühlen ließ',
        type: 'kirby',
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
  zelda: {
    title_en: 'The Legend of Zelda: Tears of the Kingdom',
    title_zh: '塞尔达传说：王国之泪',
    title_zhTW: '薩爾達傳說：王國之淚',
    title_ja: 'ゼルダの伝説 ティアーズ オブ ザ キングダム',
    title_ko: '젤다의 전설: 왕국의 눈물',
    title_de: 'The Legend of Zelda: Tears of the Kingdom',
    emoji: '🏰',
    tag_en: 'The most ambitious open-world game ever made — a 100+ hour masterpiece where you can build anything, go anywhere, and solve every puzzle your own way',
    tag_zh: '有史以来最雄心勃勃的开放世界游戏——超过 100 小时的杰作，你可以建造任何东西、去任何地方，并用自己的方式解决每一个谜题',
    tag_zhTW: '史上最具野心的開放世界遊戲——超過 100 小時的傑作，你可以建造任何東西、去任何地方，並用自己的方式解決每一個謎題',
    tag_ja: '史上最も野心的なオープンワールドゲーム——100時間以上遊べる傑作。何でも作れて、どこへでも行けて、すべてのパズルを自分だけのやり方で解ける',
    tag_ko: '역대 가장 야심 찬 오픈 월드 게임——100시간이 넘는 걸작. 무엇이든 만들고, 어디든 가고, 모든 퍼즐을 내 방식대로 풀 수 있어요',
    tag_de: 'Das ehrgeizigstes Open-World-Spiel aller Zeiten — ein 100+ Stunden Meisterwerk, bei dem du alles bauen, überall hingehen und jedes Rätsel auf deine eigene Weise lösen kannst',
    platform_en: 'Available on: Nintendo Switch only — about $70 new. Game of the Year 2023.',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 70 美元。2023 年度游戏。',
    platform_zhTW: '可在以下平台取得：僅 Nintendo Switch——全新約 70 美元。2023 年年度遊戲。',
    platform_ja: '対応ハード：Nintendo Switch専用——新品約70ドル（日本では6,578円）。2023年ゲーム・オブ・ザ・イヤー。',
    platform_ko: '플랫폼: Nintendo Switch 독점——신품 약 70달러(한국 69,800원). 2023년 올해의 게임.',
    platform_de: 'Erhältlich auf: Nur Nintendo Switch — ca. 70 € neu. Spiel des Jahres 2023.',
    why_en:
      "The Legend of Zelda: Tears of the Kingdom (2023) is the sequel to Breath of the Wild and one of the most acclaimed games ever made — Metacritic 96, Game of the Year 2023 in almost every publication. The game expands BotW's open world vertically (sky islands above, underground depths below) and adds four game-changing building mechanics: Ultrahand (glue any objects together), Fuse (combine weapons and shields with materials to create new items), Ascend (phase through any ceiling above you), and Recall (reverse an object's recent movement). The result is a game where every puzzle has hundreds of solutions, every gap can be bridged with what you find around you, and creativity is more powerful than combat skill. Players regularly discover interactions the developers didn't plan — building flying machines, rail guns, automated combat rigs. The story (which unfolds through optional memories hidden across the world) is the most narratively ambitious in the Zelda series. At $70 and Switch-exclusive, it is expensive, but most players consider it the best game on the platform. Absolutely does not require playing Breath of the Wild first, though that game is also a masterpiece and often on sale for ~$30.",
    why_zh:
      '塞尔达传说：王国之泪（2023 年）是旷野之息的续作，也是有史以来最受好评的游戏之一——Metacritic 96 分，几乎每家媒体的 2023 年度游戏。游戏垂直扩展了旷野之息的开放世界（上方的天空岛屿、下方的地底深处）并添加了四个改变游戏的建造机制：超手（将任何物体粘在一起）、融合（将武器和盾牌与材料组合以创造新物品）、穿天（穿越你上方的任何天花板）和倒带（逆转物体最近的运动）。结果是一款每个谜题都有数百种解法的游戏，每个间隙都可以用你周围找到的东西桥接，创造力比战斗技巧更强大。Metacritic 96 分，Switch 独占。',
    why_zhTW:
      '薩爾達傳說：王國之淚（2023 年）是曠野之息的續作，也是有史以來最受好評的遊戲之一——Metacritic 96 分，幾乎每家媒體的 2023 年度遊戲。遊戲垂直擴展了曠野之息的開放世界（上方的天空島嶼、下方的地底深處）並添加了四個改變遊戲的建造機制：究極手（將任何物體黏在一起）、究極融合（將武器和盾牌與材料組合以創造新物品）、穿天（穿越你上方的任何天花板）和倒轉（逆轉物體最近的運動）。結果是一款每個謎題都有數百種解法的遊戲，創意比戰鬥技巧更強大。Metacritic 96 分，Switch 獨占。',
    why_ja:
      'ゼルダの伝説 ティアーズ オブ ザ キングダム（2023年）は、ブレス オブ ザ ワイルドの続編で、史上最高評価のゲームのひとつ——Metacritic 96点、ほぼすべての媒体で2023年ゲーム・オブ・ザ・イヤーを受賞。ブレワイの世界を縦に広げ（上空の空島、地底の深部）、4つの新能力が追加されました：「ウルトラハンド」（物体を自由に組み合わせて構築物を作る）、「スクラビルド」（武器と素材を合成して新アイテムに）、「トーレルーフ」（天井を突き抜けてすり抜ける）、「モドレコ」（物体の動きを巻き戻す）。どのパズルにも何百もの解き方があり、プレイヤーが開発者も想定しなかった飛行機や大砲を作る動画がSNSに溢れています。Switch専用。',
    why_ko:
      '젤다의 전설: 왕국의 눈물(2023)은 야생의 숨결의 후속작으로, 역대 가장 높은 평가를 받은 게임 중 하나입니다——Metacritic 96점, 거의 모든 매체에서 2023년 올해의 게임 수상. 야숨의 오픈 월드를 수직으로 확장해(위로는 하늘 섬, 아래로는 지저 깊은 곳) 4가지 새로운 능력이 추가됐습니다: 울트라핸드(어떤 물체든 붙여 구조물 제작), 퓨즈(무기와 재료를 합쳐 새 아이템 제작), 올라타기(위의 천장을 통과), 되감기(물체의 최근 움직임을 역재생). 어떤 퍼즐이든 수백 가지 해법이 있고, 개발자가 예상하지 못한 비행기와 레일건을 만드는 영상이 커뮤니티에 넘쳐납니다. Switch 독점.',
    why_de:
      'The Legend of Zelda: Tears of the Kingdom (2023) ist der Nachfolger von Breath of the Wild und eines der meistgefeierten Spiele aller Zeiten — Metacritic 96, Spiel des Jahres 2023 bei fast jeder Publikation. Das Spiel erweitert BotWs offene Welt vertikal (Himmelsinseln oben, unterirdische Tiefen unten) und fügt vier spielverändernde Baumechaniken hinzu: Ultrahand (beliebige Objekte zusammenkleben), Verschmelzen (Waffen und Schilde mit Materialien kombinieren), Aufstieg (durch jede Decke über dir durchdringen) und Rückspulen (die kürzliche Bewegung eines Objekts umkehren). Das Ergebnis ist ein Spiel, bei dem jedes Rätsel Hunderte von Lösungen hat und Kreativität mächtiger ist als Kampffertigkeit. Switch-Exklusiv.',
    tip_en: "The tutorial area (Great Sky Island) teaches you all four abilities — complete it fully before descending. Don't sell Zonaite or Construct materials early: they're used for Zonai Device Dispensers which become essential mid-game. The Depths (underground) can feel overwhelming — bring Brightbloom Seeds and follow Gloom-free paths. The story shrines (Dragon's Tears) are optional but give the best narrative payoff; find all memories before the final boss for the complete ending. You can fast travel from the start, so if you're stuck anywhere, just go somewhere else.",
    tip_zh: '教程区域（天空大岛）教会你所有四个能力——在下降之前完整完成它。不要提前出售佐纳乌石或构造物材料：它们用于佐纳乌装置分发器，在游戏中期变得至关重要。地底深处可能感觉压倒性——携带萤光蘑菇种子并沿着无恐魔之力的路径行走。故事神庙（龙之泪）是可选的，但提供最好的叙事回报；在最终 Boss 前找到所有记忆以获得完整结局。从一开始你就可以快速旅行，所以如果你在任何地方卡住了，就去别的地方。',
    tip_zhTW: '教學區域（天空大島）會教你所有四種能力——在下降之前完整完成它。不要提早出售佐納烏石或構造物材料：它們用於佐納烏裝置分發器，在遊戲中期變得至關重要。地底深處可能感覺壓倒性——攜帶螢光蘑菇種子並沿著無恐魔之力的路徑行走。故事神廟（龍之淚）是可選的，但提供最好的敘事回報；在最終 Boss 前找到所有記憶以獲得完整結局。從一開始你就可以快速旅行，所以如果在任何地方卡住了，就去別的地方。',
    tip_ja: 'チュートリアルエリア（ここからの島）で4つの能力を全部習得してから地上に降りましょう。ゾナニウムや構造物の素材は序盤に売らないで——中盤から重要になるゾナウギアの補充に必要です。ハテノ古代研究所（地底）は最初は圧倒されますが、ヒカリノミの実を持っていけば暗くない道を見つけやすいです。龍の涙（ストーリー祠）はオプションですが、最高の感動が待っています——最終ボス前に全記憶を回収すると完全なエンディングが見られます。最初から快速移動できるので、詰まったら迷わず別の場所へ。',
    tip_ko: '튜토리얼 구역(이곳에서 섬)에서 4가지 능력을 전부 익힌 후 지상으로 내려가세요. 조나이트 광석이나 구성물 소재를 일찍 팔지 마세요——중반부터 필수적인 조나이 장치 보급기에 필요합니다. 지저(깊은 곳)는 처음에 압도적으로 느껴질 수 있는데, 빛의 씨앗을 챙겨가면 공포의 힘이 없는 길을 찾기 쉬워집니다. 스토리 사당(용의 눈물)은 선택 사항이지만 최고의 감동이 담겨 있어요——최종 보스 전에 모든 기억을 수집하면 완전한 엔딩을 볼 수 있습니다. 처음부터 순간이동이 가능하니 막히면 다른 곳으로 가세요.',
    tip_de: 'Der Tutorial-Bereich (Himmelseiland Urquelle) lehrt dir alle vier Fähigkeiten — schließe ihn vollständig ab, bevor du hinabsteigst. Verkaufe früh kein Zonanit oder Konstruktmaterialien: Sie werden für Zonan-Gerät-Spender benötigt, die in der Spielmitte unentbehrlich werden. Die Tiefen (unterirdisch) können überwältigend wirken — nimm Leuchtblütensamen mit und folge Gleam-freien Pfaden. Die Geschichte-Schreine (Drachenzähren) sind optional, bieten aber den besten erzählerischen Lohn; finde alle Erinnerungen vor dem Finalboss für das vollständige Ende. Du kannst von Anfang an schnellreisen, also geh einfach woanders hin, wenn du irgendwo feststeckst.',
  },
  pikmin: {
    title_en: 'Pikmin 4',
    title_zh: '皮克敏 4',
    title_zhTW: '皮克敏 4',
    title_ja: 'ピクミン4',
    title_ko: '피크민 4',
    title_de: 'Pikmin 4',
    emoji: '🌿',
    tag_en: 'The most cozy strategy game on Switch — a charming expedition game where you command tiny plant-animal creatures in clever, satisfying puzzles with a surprisingly touching dog companion',
    tag_zh: 'Switch 上最 Cozy 的策略游戏——一款迷人的探险游戏，你在聪明、令人满足的谜题中指挥微小的植物动物生物，拥有出乎意料令人感动的狗狗伙伴',
    tag_zhTW: 'Switch 上最 Cozy 的策略遊戲——一款迷人的探險遊戲，你在聰明、令人滿足的謎題中指揮微小的植物動物生物，擁有出乎意料令人感動的狗狗夥伴',
    tag_ja: 'Switchで最もほのぼの系の戦略ゲーム——小さな植物生物（ピクミン）を指揮してパズルを解く、優しくて奥深い探検ゲーム。感動的な犬の相棒も登場',
    tag_ko: 'Switch에서 가장 아늑한 전략 게임——작은 식물 생명체들을 지휘해 퍼즐을 푸는 매력적인 탐험 게임. 감동적인 강아지 동료도 함께해요',
    tag_de: 'Das gemütlichste Strategiespiel auf dem Switch — ein charmantes Expeditionsspiel, bei dem du winzige Pflanzen-Tier-Wesen in cleveren, befriedigenden Rätseln befehligst, mit einem überraschend rührenden Hundebegleiter',
    platform_en: 'Available on: Nintendo Switch only — about $60 new, often on sale for $35-45',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 60 美元，经常特价 35-45 美元',
    platform_zhTW: '可在以下平台取得：僅 Nintendo Switch——全新約 60 美元，經常特價 35-45 美元',
    platform_ja: '対応ハード：Nintendo Switch専用——新品約60ドル（日本では6,578円）、セール時35〜45ドル程度',
    platform_ko: '플랫폼: Nintendo Switch 독점——신품 약 60달러(한국 59,800원), 세일 시 35~45달러',
    platform_de: 'Erhältlich auf: Nur Nintendo Switch — ca. 60 € neu, oft im Angebot für 35-45 €',
    why_en:
      "Pikmin 4 (2023) is simultaneously the most beginner-friendly and most fully featured entry in the beloved Pikmin series — a strategy game where you command groups of tiny plant-animal creatures (Pikmin) to carry objects, fight enemies, and solve environmental puzzles. The core hook is beautiful: you're a rescue pilot who crash-landed in a miniature world (a garden, a house, a beach) where everyday objects like acorns and bottle caps are treasures. Each day-night cycle is timed (you must return to base before nightfall or lose Pikmin to nocturnal creatures), which creates a satisfying planning loop: scout the area, decide priorities, execute efficiently. Pikmin 4 adds Oatchi, a dog companion who can carry Pikmin, attack enemies, swim, and dig — who becomes arguably the most useful character in the game. The game is the most cozy strategy title on Switch: no online competition, no punishing failure states, and the difficulty scales naturally through new Pikmin types (Red, Yellow, Blue, Ice, Glow, Rock, Winged) each with distinct abilities that open new areas. Main story runs 25-30 hours; 100% completion takes 50-60 hours. Switch exclusive.",
    why_zh:
      '皮克敏 4（2023 年）同时是备受喜爱的皮克敏系列中最适合新手且功能最齐全的作品——一款你指挥小植物动物生物（皮克敏）搬运物品、对抗敌人并解决环境谜题的策略游戏。核心吸引力很美丽：你是一名迫降在微型世界（花园、房子、海滩）中的救援飞行员，橡果和瓶盖等日常物品都是宝藏。每个昼夜循环都有计时（你必须在夜幕降临前返回基地，否则会失去皮克敏给夜行生物），这创造了令人满足的规划循环。皮克敏 4 添加了大奇，一只可以携带皮克敏、攻击敌人、游泳和挖掘的狗狗伙伴。Switch 独占。Metacritic 89 分。',
    why_zhTW:
      '皮克敏 4（2023 年）同時是備受喜愛的皮克敏系列中最適合新手且功能最齊全的作品——一款你指揮小植物動物生物（皮克敏）搬運物品、對抗敵人並解決環境謎題的策略遊戲。核心吸引力很美麗：你是一名迫降在微型世界（花園、房子、海灘）中的救援飛行員，橡果和瓶蓋等日常物品都是寶藏。每個晝夜循環都有計時（你必須在夜幕降臨前返回基地，否則會失去皮克敏給夜行生物），這創造了令人滿足的規劃循環。皮克敏 4 添加了大奇，一隻可以攜帶皮克敏、攻擊敵人、游泳和挖掘的狗狗夥伴。Switch 獨占。Metacritic 89 分。',
    why_ja:
      'ピクミン4（2023年）は、人気のピクミンシリーズで最も初心者に優しく、最も充実した内容の作品です——小さな植物生き物（ピクミン）を指揮して物を運ばせたり敵と戦ったり環境パズルを解くストラテジーゲーム。あなたは庭や家や海岸を舞台にした小さな世界に不時着したレスキューパイロットで、どんぐりやボトルキャップが宝物になっています。昼夜サイクルに制限時間があり（夜が来る前に基地に帰らないとピクミンを失う）、計画と実行の充実感あるループが生まれます。ピクミン4では犬の相棒「オッチン」が加わり、ピクミンを運んだり、敵を攻撃したり、泳いだり、掘ったりできます。Nintendo Switch専用。Metacritic 89点。',
    why_ko:
      '피크민 4(2023)은 사랑받는 피크민 시리즈 중 가장 입문 친화적이며 가장 완성도 높은 작품입니다——작은 식물 생명체(피크민)를 지휘해 물건을 나르고, 적과 싸우고, 환경 퍼즐을 푸는 전략 게임. 핵심 매력이 독특해요: 정원, 집, 해변을 배경으로 한 미니어처 세계에 불시착한 구조 파일럿으로, 도토리나 병뚜껑 같은 일상 물건이 보물이 됩니다. 낮밤 사이클에 제한 시간이 있어 계획과 실행의 뿌듯한 루프가 생깁니다. 피크민 4에는 강아지 동료 오치가 등장해 피크민을 나르거나, 적을 공격하거나, 수영하거나, 땅을 팔 수 있어요. Switch 독점. Metacritic 89점.',
    why_de:
      'Pikmin 4 (2023) ist gleichzeitig der einsteigerfreundlichste und vollständigste Eintrag in der geliebten Pikmin-Reihe — ein Strategiespiel, bei dem du Gruppen winziger Pflanzen-Tier-Wesen (Pikmin) befehligst, um Objekte zu tragen, Feinde zu bekämpfen und Umgebungsrätsel zu lösen. Der Kernreiz ist wunderschön: Du bist ein Rettungspilot, der in einer miniaturisierten Welt (ein Garten, ein Haus, ein Strand) notgelandet ist, wo Alltägliches wie Eicheln und Kronkorken Schätze sind. Der Tag-Nacht-Zyklus ist zeitgesteuert, was eine befriedigende Planungsschleife schafft. Pikmin 4 fügt Oatchi hinzu, einen Hundebegleiter, der Pikmin tragen, Feinde angreifen, schwimmen und graben kann. Switch-Exklusiv. Metacritic 89.',
    tip_en: "Always end your day before the timer reaches zero — lost Pikmin cannot be recovered until you complete the night missions unlocked after Area 1. Oatchi's Rush ability (unlocked early) is essential: use it to break through crystal walls. Prioritize upgrading Oatchi at the Rescue Corps base before expanding your Pikmin numbers. The caves (Dandori Caves) are timed challenge rooms; in the main game, the overworld missions are usually more rewarding. Don't neglect the Pikmin types: Rock Pikmin destroy crystal barriers, Ice Pikmin freeze water, and Glow Pikmin are exclusively for night missions.",
    tip_zh: '永远在计时器归零之前结束你的一天——失去的皮克敏无法恢复，直到你完成第 1 区域后解锁的夜间任务。大奇的冲锋能力（早期解锁）至关重要：用它突破水晶墙。在扩大皮克敏数量之前，优先在救援队基地升级大奇。洞穴（丹多利洞穴）是限时挑战室；在主游戏中，地表任务通常更有价值。不要忽视皮克敏类型：石头皮克敏摧毁水晶屏障，冰皮克敏冻结水域，萤火皮克敏专门用于夜间任务。',
    tip_zhTW: '永遠在計時器歸零之前結束你的一天——失去的皮克敏無法恢復，直到你完成第 1 區域後解鎖的夜間任務。大奇的衝鋒能力（早期解鎖）至關重要：用它突破水晶牆。在擴大皮克敏數量之前，優先在救援隊基地升級大奇。洞穴（丹多利洞穴）是限時挑戰室；在主遊戲中，地表任務通常更有價值。不要忽視皮克敏類型：石頭皮克敏摧毀水晶屏障，冰皮克敏凍結水域，螢火皮克敏專門用於夜間任務。',
    tip_ja: 'タイマーがゼロになる前に必ず一日を終えましょう——失ったピクミンはエリア1クリア後に解放されるナイトミッションをこなすまで取り戻せません。オッチンの「とっしん」（序盤解放）は必須です：水晶の壁を壊すのに使いましょう。ピクミンの数を増やす前に、レスキュー隊基地でオッチンをアップグレードすることを優先しましょう。洞窟（ダンドリ洞窟）は制限時間ありの挑戦部屋ですが、地上のミッションのほうが報酬が多めです。ピクミンの種類を使い分けましょう：石ピクミンは水晶壁を壊し、氷ピクミンは水を凍らせ、ヒカリピクミンはナイトミッション専用です。',
    tip_ko: '타이머가 0이 되기 전에 반드시 하루를 마무리하세요——잃어버린 피크민은 1구역 클리어 후 해방되는 야간 임무를 완료할 때까지 되찾을 수 없습니다. 오치의 돌진 능력(초반 해방)은 필수입니다: 수정 벽을 부수는 데 사용하세요. 피크민 수를 늘리기 전에 구조대 기지에서 오치를 먼저 업그레이드하세요. 동굴(단도리 동굴)은 제한 시간 있는 도전 방이지만, 지상 임무가 보상이 더 풍부합니다. 피크민 타입을 잘 활용하세요: 돌 피크민은 수정 장벽을 부수고, 얼음 피크민은 물을 얼리고, 빛 피크민은 야간 임무 전용입니다.',
    tip_de: 'Beende deinen Tag immer, bevor der Timer null erreicht — verlorene Pikmin können erst wieder gewonnen werden, wenn du die Nachtmissionen abschließt, die nach Gebiet 1 freigeschaltet werden. Oatchis Rush-Fähigkeit (früh freigeschaltet) ist unerlässlich: Nutze sie, um Kristallwände zu durchbrechen. Priorisiere die Verbesserung von Oatchi an der Rettungskorps-Basis, bevor du deine Pikmin-Zahlen erweiterst. Die Höhlen (Dandori-Höhlen) sind zeitgesteuerte Herausforderungsräume; im Hauptspiel sind die Überwelt-Missionen normalerweise lohnender. Vernachlässige die Pikmin-Typen nicht: Fels-Pikmin zerstören Kristallbarrieren, Eis-Pikmin frieren Wasser ein, und Glüh-Pikmin sind ausschließlich für Nachtmissionen.',
  },
  mario: {
    title_en: 'Super Mario Bros. Wonder',
    title_zh: '超级马力欧兄弟：奇妙之旅',
    title_zhTW: '超級瑪利歐兄弟：驚奇',
    title_ja: 'スーパーマリオブラザーズ ワンダー',
    title_ko: '슈퍼 마리오브라더스 원더',
    title_de: 'Super Mario Bros. Wonder',
    emoji: '🌺',
    tag_en: 'The most inventive 2D Mario game in 30 years — every level surprises you with a Wonder Flower event that transforms the rules, the physics, or the genre entirely',
    tag_zh: '30 年来最具创意的 2D 马力欧游戏——每个关卡都用改变规则、物理或整个类型的奇妙花朵事件让你惊喜',
    tag_zhTW: '30 年來最具創意的 2D 瑪利歐遊戲——每個關卡都用改變規則、物理或整個類型的驚奇花朵事件讓你驚喜',
    tag_ja: '30年ぶりに最も斬新な2Dマリオ——ステージごとに物理法則やジャンルそのものを変えるワンダーフラワーが詰まった傑作',
    tag_ko: '30년 만에 가장 창의적인 2D 마리오——스테이지마다 규칙, 물리법칙, 심지어 장르 자체를 바꿔버리는 원더 플라워로 가득 찬 걸작',
    tag_de: 'Das einfallsreichste 2D-Mario-Spiel seit 30 Jahren — jedes Level überrascht dich mit einem Wunderblumen-Ereignis, das die Regeln, die Physik oder das Genre komplett verändert',
    platform_en: 'Available on: Nintendo Switch only — about $60 new',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 60 美元',
    platform_zhTW: '可在以下平台取得：僅 Nintendo Switch——全新約 60 美元',
    platform_ja: '対応ハード：Nintendo Switch専用——新品約60ドル（日本では6,578円）',
    platform_ko: '플랫폼: Nintendo Switch 독점——신품 약 60달러(한국 59,800원)',
    platform_de: 'Erhältlich auf: Nur Nintendo Switch — ca. 60 € neu',
    why_en:
      "Super Mario Bros. Wonder (2023) is widely considered the best 2D Mario game since Super Mario World (1990) — and a strong argument for the best 2D platformer of its generation. The key innovation is the Wonder Flower: every level contains a Wonder Flower that, when collected, transforms the game in unexpected and often hilarious ways. Some examples: the ground rises and falls like breathing, every enemy turns into Mario, the camera rotates, you play as a parade float, gravity reverses, the game shifts to a completely different genre for 60 seconds. No two Wonder Flower events are identical. The base platforming is crisp, the music reacts to every Wonder event, and the game offers 12 playable characters (including Yoshi and Nabbit who are invincible — perfect for less experienced players). Online multiplayer allows players to see ghosts of other players' runs on the same levels without true real-time interaction, which feels cozy rather than competitive. Metacritic 93 on Switch.",
    why_zh:
      '超级马力欧兄弟：奇妙之旅（2023 年）被广泛认为是自超级马力欧世界（1990 年）以来最好的 2D 马力欧游戏。关键创新是奇妙花朵：每个关卡都包含一个奇妙花朵，收集后会以出人意料且常常令人捧腹的方式改变游戏。地面像呼吸一样起伏、每个敌人都变成马力欧、摄像机旋转、游戏在 60 秒内转变成完全不同的类型——没有两个奇妙花朵事件是相同的。包括无敌的耀西和纳比特在内的 12 个可玩角色（非常适合经验较少的玩家）。Switch 版 Metacritic 93 分。',
    why_zhTW:
      '超級瑪利歐兄弟：驚奇（2023 年）被廣泛認為是自超級瑪利歐世界（1990 年）以來最好的 2D 瑪利歐遊戲。關鍵創新是驚奇花朵：每個關卡都包含一個驚奇花朵，收集後會以出人意料且常常令人捧腹的方式改變遊戲。地面像呼吸一樣起伏、每個敵人都變成瑪利歐、攝影機旋轉、遊戲在 60 秒內轉變成完全不同的類型——沒有兩個驚奇花朵事件是相同的。包括無敵的耀西和納比特在內的 12 個可玩角色（非常適合經驗較少的玩家）。Switch 版 Metacritic 93 分。',
    why_ja:
      'スーパーマリオブラザーズ ワンダー（2023年）は、スーパーマリオワールド（1990年）以来の最高の2Dマリオゲームと広く言われており、世代最高の2Dプラットフォーマーの有力候補です。核心となる革新はワンダーフラワーです：各ステージに一つあり、それを取ると予想外で面白い変化が起こります。地面が呼吸するように上下する、敵が全員マリオになる、カメラが回転する、60秒間完全に別ジャンルになる。ワンダーフラワーの演出は全部異なります。12人のプレイアブルキャラ（無敵のヨッシーとナビットは経験の少ないプレイヤーに最適）が選べます。Switch版Metacritic 93点。',
    why_ko:
      '슈퍼 마리오브라더스 원더(2023)는 슈퍼 마리오 월드(1990) 이후 가장 훌륭한 2D 마리오 게임으로 널리 인정받고 있습니다. 핵심 혁신은 원더 플라워입니다: 각 스테이지에 하나씩 있고, 수집하면 예상치 못하고 종종 폭소를 자아내는 방식으로 게임이 바뀝니다. 땅이 숨쉬듯 오르내리고, 모든 적이 마리오가 되고, 카메라가 회전하고, 60초간 완전히 다른 장르로 바뀌기도 합니다. 무적인 요시와 나비트를 포함한 12명의 플레이어블 캐릭터(경험이 적은 플레이어에게 최적)를 선택할 수 있어요. Switch 버전 Metacritic 93점.',
    why_de:
      'Super Mario Bros. Wonder (2023) gilt weithin als das beste 2D-Mario-Spiel seit Super Mario World (1990) — und als starkes Argument für den besten 2D-Plattformer seiner Generation. Die zentrale Innovation ist die Wunderblume: Jedes Level enthält eine Wunderblume, die, wenn gesammelt, das Spiel auf unerwartete und oft urkomische Weisen verändert. Einige Beispiele: Der Boden hebt und senkt sich wie beim Atmen, jeder Feind wird zu Mario, die Kamera rotiert, das Spiel wechselt für 60 Sekunden in ein völlig anderes Genre. Keine zwei Wunderblumen-Ereignisse sind identisch. Das Spiel bietet 12 spielbare Charaktere (darunter der unverwundbare Yoshi und Nabbit — perfekt für weniger erfahrene Spieler). Switch-Version Metacritic 93.',
    tip_en: "Use Yoshi or Nabbit if you die repeatedly on any section — they take no damage and let you see the full level design. The Wonder Seeds (main progression) are distinct from the 10 Purple Coins per level (optional collectibles); prioritize Seeds first and come back for coins on a second run. The final world (Special World) has the hardest optional content in the game — don't feel obligated to complete it. The badge system (equip one bonus ability per level) lets you tailor the experience: Badge: Wall Climb is great for explorers, Dolphin Kick for water levels, and Crouching High Jump for hard badge challenges.",
    tip_zh: '如果你在任何部分反复死亡，使用耀西或纳比特——他们不受伤害，让你看到完整的关卡设计。奇妙种子（主要进程）与每关的 10 个紫色硬币（可选收集品）不同；优先收集种子，在第二次游玩时回来收集硬币。最终世界（特殊世界）有游戏中最难的可选内容——不要感到有义务完成它。徽章系统（每关装备一个奖励能力）让你定制体验：徽章：爬墙非常适合探索者，海豚踢适合水关，蹲跳适合困难徽章挑战。',
    tip_zhTW: '如果你在任何部分反覆死亡，使用耀西或納比特——他們不受傷害，讓你看到完整的關卡設計。驚奇種子（主要進程）與每關的 10 個紫色硬幣（可選收藏品）不同；優先收集種子，在第二次遊玩時回來收集硬幣。最終世界（特殊世界）有遊戲中最難的可選內容——不要感到有義務完成它。徽章系統（每關裝備一個獎勵能力）讓你定製體驗：徽章：爬牆非常適合探索者，海豚踢適合水關，蹲跳適合困難徽章挑戰。',
    tip_ja: 'どこかで何度もやられてしまう場合は、ヨッシーかナビットを使いましょう——ダメージを受けないのでステージの全設計を楽しめます。ワンダーシード（メイン進行）と各ステージの10枚のパープルコイン（オプション収集）は別物です；まずシードを優先して、2周目にコインを集めましょう。最終ワールド（スペシャルワールド）はゲーム中最難のオプションコンテンツです——クリアを急がなくて大丈夫。バッジシステム（1ステージに1つ装備できるボーナス能力）で自分好みに調整できます：「かべのぼりバッジ」は探索好きに、「ドルフィンキック」は水中ステージに、「しゃがみジャンプ」は難バッジチャレンジにおすすめ。',
    tip_ko: '어디선가 계속 죽는다면 요시나 나비트를 사용하세요——데미지를 받지 않으니 스테이지 전체 디자인을 편하게 즐길 수 있어요. 원더 씨앗(메인 진행)과 각 스테이지의 보라색 동전 10개(선택 수집)는 별개입니다; 먼저 씨앗을 우선하고, 2회차에 동전을 모으세요. 최종 월드(스페셜 월드)는 게임 최고 난이도의 선택 콘텐츠——완료해야 한다는 부담은 갖지 않아도 됩니다. 뱃지 시스템(스테이지마다 하나씩 장착하는 보너스 능력)으로 나에게 맞게 커스터마이징하세요: 벽오르기 뱃지는 탐험가에게, 돌핀킥은 수중 스테이지에, 쪼그려 점프는 어려운 뱃지 챌린지에 추천.',
    tip_de: 'Verwende Yoshi oder Nabbit, wenn du auf irgendeinem Abschnitt wiederholt stirbst — sie nehmen keinen Schaden und lassen dich das vollständige Level-Design sehen. Die Wundersamen (Hauptfortschritt) unterscheiden sich von den 10 Lila Münzen pro Level (optionale Sammelstücke); priorisiere zuerst Samen und komme für Münzen in einem zweiten Durchlauf zurück. Die finale Welt (Spezialwelt) hat die schwersten optionalen Inhalte des Spiels — fühle dich nicht verpflichtet, sie abzuschließen. Das Abzeichen-System (rüste eine Bonusfähigkeit pro Level aus) lässt dich die Erfahrung anpassen: Abzeichen: Wandklettern ist großartig für Entdecker, Delfinschlag für Wasserlevel und Hocksprung für schwere Abzeichen-Herausforderungen.',
  },
  kirby: {
    title_en: 'Kirby and the Forgotten Land',
    title_zh: '星之卡比：探索发现',
    title_zhTW: '星之卡比：探索發現',
    title_ja: 'カービィ ディスカバリー',
    title_ko: '별의 커비: 디스커버리',
    title_de: 'Kirby und das vergessene Land',
    emoji: '🌸',
    tag_en: "Nintendo's most welcoming 3D game — a joyful platformer where Kirby can inhale cars, vending machines, and traffic cones with Mouthful Mode, in a world inspired by post-apocalyptic civilizations",
    tag_zh: '任天堂最友好的 3D 游戏——一款欢快的平台游戏，柯比可以在受末日文明启发的世界中用"塞满嘴"模式吸入汽车、自动贩卖机和交通锥',
    tag_zhTW: '任天堂最友好的 3D 遊戲——一款歡快的平台遊戲，柯比可以在受末日文明啟發的世界中用「塞滿嘴」模式吸入汽車、自動販賣機和交通錐',
    tag_ja: 'Nintendo最高のとっつきやすい3Dゲーム——文明後の世界で、車や自動販売機や交通コーンを丸ごと吸い込める「ほおばりヘンケイ」が楽しいアクション',
    tag_ko: '닌텐도에서 가장 접근하기 쉬운 3D 게임——커비가 문명 이후의 세계에서 자동차, 자판기, 교통 콘을 통째로 흡입하는 빵빵 변신 모드가 가득한 즐거운 플랫포머',
    tag_de: 'Nintendos zugänglichstes 3D-Spiel — ein fröhlicher Plattformer, bei dem Kirby Autos, Automaten und Verkehrshüte mit dem Stopf-Modus einschlucken kann, in einer von postapokalyptischen Zivilisationen inspirierten Welt',
    platform_en: 'Available on: Nintendo Switch only — about $60 new, often on sale for $30-40',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 60 美元，经常特价 30-40 美元',
    platform_zhTW: '可在以下平台取得：僅 Nintendo Switch——全新約 60 美元，經常特價 30-40 美元',
    platform_ja: '対応ハード：Nintendo Switch専用——新品約60ドル（日本では6,578円）、セール時30〜40ドル程度',
    platform_ko: '플랫폼: Nintendo Switch 독점——신품 약 60달러(한국 59,800원), 세일 시 30~40달러',
    platform_de: 'Erhältlich auf: Nur Nintendo Switch — ca. 60 € neu, oft im Angebot für 30-40 €',
    why_en:
      "Kirby and the Forgotten Land (2022) is Nintendo's first fully 3D Kirby game — and it is one of the most charming, accessible 3D platformers ever made. Kirby arrives in the Forgotten Land: a post-civilization world where shopping malls, highways, and amusement parks have been reclaimed by nature, and where the Waddle Dees he rescues gradually rebuild a thriving town you can explore between levels. The headline feature is Mouthful Mode: Kirby can fully inhale large real-world objects (cars, vending machines, traffic cones, water tanks) and use their functions as abilities — driving the car, shooting ice from the machine, rolling as the cone. This is the most Nintendo-weird-wonderful the series has ever been. The game is genuinely accessible: Kirby has enormous health reserves, copy abilities let you choose your combat style, and the Wild Mode difficulty reduces damage even further. The story has a surprisingly epic finale that has become a series tradition. Metacritic 82 on Switch — broadly loved. Perfect for non-gamers or anyone who wants a pure, uncomplicated Nintendo joy experience.",
    why_zh:
      '星之卡比：探索发现（2022 年）是任天堂第一款完全 3D 的柯比游戏——也是有史以来最迷人、最易上手的 3D 平台游戏之一。柯比来到被遗忘之地：一个文明后的世界，购物中心、高速公路和游乐园已被大自然重新占据，他拯救的沃都迪逐渐重建了一个你可以在关卡之间探索的繁荣小镇。主要特色是"塞满嘴"模式：柯比可以完整吸入大型现实物品（汽车、自动贩卖机、交通锥、水箱）并将其功能作为能力使用。游戏真正易上手：柯比拥有巨大的生命值储备，复制能力让你选择战斗风格。Switch 版 Metacritic 82 分。',
    why_zhTW:
      '星之卡比：探索發現（2022 年）是任天堂第一款完全 3D 的柯比遊戲——也是有史以來最迷人、最易上手的 3D 平台遊戲之一。柯比來到被遺忘之地：一個文明後的世界，購物中心、高速公路和遊樂園已被大自然重新占據，他拯救的沃都迪逐漸重建了一個你可以在關卡之間探索的繁榮小鎮。主要特色是「塞滿嘴」模式：柯比可以完整吸入大型現實物品（汽車、自動販賣機、交通錐、水箱）並將其功能作為能力使用。遊戲真正易上手：柯比擁有巨大的生命值儲備，複製能力讓你選擇戰鬥風格。Switch 版 Metacritic 82 分。',
    why_ja:
      'カービィ ディスカバリー（2022年）は、任天堂初の完全3Dカービィゲームで、これまで作られた中で最もチャーミングでとっつきやすい3Dプラットフォーマーのひとつです。カービィは「忘れられた土地」に迷い込みます：ショッピングモール、高速道路、遊園地が自然に飲み込まれた文明後の世界で、救出したワドルディたちがステージ間に探索できる賑やかな街を少しずつ作り上げていきます。目玉機能は「ほおばりヘンケイ」：カービィが大きな現実の物体（車、自動販売機、交通コーン、水タンク）を丸ごと吸い込んでその機能を能力として使えます。Nintendo Switch専用。Metacritic 82点。',
    why_ko:
      '별의 커비: 디스커버리(2022)는 닌텐도 최초의 완전 3D 커비 게임으로, 역대 가장 매력적이고 접근하기 쉬운 3D 플랫포머 중 하나입니다. 커비는 잊혀진 땅에 도착합니다: 쇼핑몰, 고속도로, 놀이공원이 자연에 되돌아간 문명 이후의 세계에서, 구출한 와들디들이 스테이지 사이에 탐험할 수 있는 번성하는 마을을 조금씩 재건합니다. 핵심 기능은 빵빵 변신: 커비가 큰 현실 물체(자동차, 자판기, 교통 콘, 물탱크)를 통째로 흡입해 그 기능을 능력으로 사용할 수 있어요. Switch 독점. Metacritic 82점.',
    why_de:
      'Kirby und das vergessene Land (2022) ist Nintendos erstes vollständig 3D Kirby-Spiel — und eines der charmantesten, zugänglichsten 3D-Plattformer überhaupt. Kirby kommt ins Vergessene Land: eine Welt nach der Zivilisation, in der Einkaufszentren, Autobahnen und Vergnügungsparks von der Natur zurückerobert wurden, und die Waddeldis, die er rettet, bauen nach und nach eine florierende Stadt wieder auf, die du zwischen den Levels erkunden kannst. Das Hauptmerkmal ist der Stopf-Modus: Kirby kann große reale Objekte (Autos, Automaten, Verkehrshüte, Wassertanks) vollständig einschlucken und deren Funktionen als Fähigkeiten nutzen. Metacritic 82 auf Switch — allgemein geliebt.',
    tip_en: "Upgrade copy abilities at Waddle Dee's Weapons Shop using Star Coins and Rare Stones (found in Treasure Chests). The 'Evolved' ability upgrades are visually spectacular and significantly more powerful — try Evolved Sword or Evolved Fire. Rescue all Waddle Dees in a stage before moving on: Waddle Dee Town grows with each rescue and unlocks a café, cinema, fishing pond, and arena that are genuinely fun to visit. The optional Boss Rush (Colosseum) has the game's hardest challenges. In two-player co-op, Player 2 controls Bandana Waddle Dee — a great way to play with a non-gaming partner.",
    tip_zh: '在沃都迪武器店使用星之硬币和稀有之石（在宝箱中找到）升级复制能力。"进化"能力升级视觉上令人叹为观止且显著更强大——尝试进化之剑或进化之火。在继续之前救出关卡中的所有沃都迪：沃都迪镇随着每次救援而成长，并解锁咖啡馆、电影院、钓鱼池和竞技场，真的很有趣。可选的 Boss 连战（斗技场）有游戏中最难的挑战。在双人合作中，玩家 2 控制头巾沃都迪——与非游戏玩家伙伴一起游玩的好方法。',
    tip_zhTW: '在沃都迪武器店使用星之硬幣和稀有之石（在寶箱中找到）升級複製能力。「進化」能力升級視覺上令人嘆為觀止且顯著更強大——嘗試進化之劍或進化之火。在繼續之前救出關卡中的所有沃都迪：沃都迪鎮隨著每次救援而成長，並解鎖咖啡廳、電影院、釣魚池和競技場，真的很有趣。可選的 Boss 連戰（鬥技場）有遊戲中最難的挑戰。在雙人合作中，玩家 2 控制頭巾沃都迪——與非遊戲玩家夥伴一起遊玩的好方法。',
    tip_ja: 'ワドルディの武器店でスターコインとレアストーン（宝箱の中にある）を使ってコピー能力をアップグレードしましょう。「シャイニー」アップグレードは見た目も性能も格段にアップ——シャイニーソードやシャイニーファイアは特におすすめです。ステージを進む前に全ワドルディを救出しましょう：救出するたびにワドルディタウンが成長し、カフェ、映画館、釣り池、闘技場が解放されます。オプションのボスラッシュ（コロシアム）はゲーム最難の挑戦です。2人プレイではプレイヤー2がバンダナワドルディを操作します——ゲームが得意でないパートナーと一緒に楽しむ最高の方法。',
    tip_ko: '와들디 무기점에서 별 코인과 희귀 돌(보물 상자에서 발견)로 카피 능력을 업그레이드하세요. 진화 능력 업그레이드는 시각적으로도 성능적으로도 크게 향상됩니다——진화 소드나 진화 파이어를 꼭 써보세요. 스테이지를 넘어가기 전에 모든 와들디를 구출하세요: 구출할 때마다 와들디 마을이 성장하며 카페, 영화관, 낚시터, 아레나가 해방됩니다. 선택적인 보스 연속전(콜로세움)에는 게임 최고 난이도의 도전이 있어요. 2인 협동에서는 플레이어 2가 반다나 와들디를 조작합니다——게임이 익숙하지 않은 파트너와 함께 즐기기에 최고의 방법.',
    tip_de: "Verbessere Kopier-Fähigkeiten in Waddeldis Waffenladen mit Sterntaler und Rarsteinen (in Schatzkisten gefunden). Die 'Evolvierten' Fähigkeits-Upgrades sind visuell spektakulär und bedeutend mächtiger — probiere Evolviertes Schwert oder Evolviertes Feuer. Rette alle Waddeldis in einem Level, bevor du weitergehst: Waddeldorf wächst mit jeder Rettung und schaltet ein Café, ein Kino, einen Angelteich und eine Arena frei, die wirklich Spaß machen zu besuchen. Der optionale Bosseinsatz (Kolosseum) hat die schwersten Herausforderungen des Spiels. Im Zwei-Spieler-Koop steuert Spieler 2 Waddeli — ein toller Weg, mit einem nicht spielenden Partner zu spielen.",
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { zelda: 0, pikmin: 0, mario: 0, kirby: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function NintendoExclusivesQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/nintendo-switch-exclusives-quiz`
    const shareText = getLoc(
      `Nintendo Switch 独占游戏推荐结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My Nintendo Switch exclusive recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `Nintendo Switch 獨占遊戲推薦結果：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `Nintendo Switch独占ゲームのおすすめ結果：「${result.title_ja}」！${result.tag_ja}。あなたも試してみて：${url}`,
      `Nintendo Switch 독점 게임 추천 결과：「${result.title_ko}」！${result.tag_ko}. 당신도 찾아보세요：${url}`,
      `Meine Nintendo Switch-Exklusivspiel-Empfehlung: ${result.title_de} — ${result.tag_de}. Finde deine: ${url}`,
    )

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
              {getLoc('入门建议：', 'Getting started: ', '入門建議：', '遊び始めのヒント：', '시작 팁: ', 'Erste Schritte: ')}
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
            '哪款 Nintendo Switch 独占游戏最适合你？',
            'Which Nintendo Switch Exclusive Is Right for You?',
            '哪款 Nintendo Switch 獨占遊戲最適合你？',
            'あなたにぴったりのNintendo Switch独占ゲームは？',
            '어떤 Nintendo Switch 독점 게임이 나에게 맞을까요?',
            'Welches Nintendo Switch-Exklusivspiel passt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从塞尔达：王国之泪、皮克敏 4、超级马力欧兄弟：奇妙之旅、星之卡比：探索发现中找到你的专属推荐',
            '6 questions to match you with Zelda: Tears of the Kingdom, Pikmin 4, Super Mario Bros. Wonder, or Kirby and the Forgotten Land',
            '6 個問題，從薩爾達傳說：王國之淚、皮克敏 4、超級瑪利歐兄弟：驚奇、星之卡比：探索發現中找到你的專屬推薦',
            '6つの質問で、ゼルダの伝説 ティアーズ オブ ザ キングダム・ピクミン4・スーパーマリオブラザーズ ワンダー・カービィ ディスカバリーの中からあなたにぴったりの一本を',
            '6가지 질문으로 젤다의 전설: 왕국의 눈물, 피크민 4, 슈퍼 마리오브라더스 원더, 별의 커비: 디스커버리 중 내게 맞는 게임 찾기',
            '6 Fragen, die dir zwischen Zelda: Tears of the Kingdom, Pikmin 4, Super Mario Bros. Wonder oder Kirby und das vergessene Land die passende Empfehlung geben',
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
        {getLoc('找到我的 Switch 游戏', 'Find My Switch Game', '找到我的 Switch 遊戲', '私のSwitchゲームを探す', '내 Switch 게임 찾기', 'Mein Switch-Spiel finden')}
      </button>
    </div>
  )
}
