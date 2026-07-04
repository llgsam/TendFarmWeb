'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'hollow' | 'inscryption' | 'forgotten' | 'pentiment'

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
    q_en: 'What pulls you into a game most powerfully?',
    q_zh: '什么最能把你吸引进一款游戏？',
    q_zhTW: '什麼最能把你吸引進一款遊戲？',
    q_ja: 'ゲームに最も強く引き込まれるのはどんな要素ですか？',
    q_ko: '게임에 가장 강하게 끌리게 하는 것은 무엇인가요?',
    q_de: 'Was zieht dich am stärksten in ein Spiel hinein?',
    options: [
      {
        en: 'A world so dense with mystery that every room hints at a history I want to uncover — and the exploration loop keeps rewarding me with new areas for hours',
        zh: '一个充满谜题的世界，每个房间都暗示着我想要探索的历史——探索循环不断以新区域回报我，持续数小时',
        zhTW: '謎題密布的世界，每個房間都暗示著我想探索的歷史——探索循環不斷以新區域回報我，持續數小時',
        ja: '謎だらけの世界——部屋ひとつひとつが歴史の断片を語りかけてきて、探索のたびに新しいエリアが開けていく感覚',
        ko: '미스터리로 가득 찬 세계, 모든 방이 탐험하고 싶은 역사를 암시하고 — 탐험 루프가 몇 시간이고 새로운 구역으로 보상해줄 때',
        de: 'Eine Welt so dicht voll Geheimnisse, dass jeder Raum auf eine Geschichte hinweist — und der Erkundungsloop mich stundenlang mit neuen Gebieten belohnt',
        type: 'hollow',
      },
      {
        en: 'A premise so strange that I genuinely do not know where it is going — and then it pulls the rug out completely, and I sit back and say "what just happened"',
        zh: '一个奇特到我真的不知道走向的前提——然后它完全颠覆了一切，让我坐在那里说"刚才发生了什么"',
        zhTW: '奇特到我真的不知道走向的前提——然後它完全顛覆了一切，讓我坐在那裡說「剛才發生了什麼」',
        ja: '最初から予想できない奇妙な前提——そしてどんでん返しが来て、思わず「え、今何が起きた？」と呟いてしまう展開',
        ko: '너무 기묘해서 어디로 흘러갈지 전혀 모르는 전제 — 그리고 완전히 뒤집어지며 "방금 무슨 일이 일어난 거야"라고 말하게 만드는 것',
        de: 'Eine so fremdartige Prämisse, dass ich nie weiß, wohin sie führt — und dann dreht sie alles um und ich lehne mich zurück und denke „was zur Hölle war das"',
        type: 'inscryption',
      },
      {
        en: 'A tightly designed puzzle where I control one variable — time — and must figure out the rules of the world by replaying the same day with different knowledge',
        zh: '一个我控制单一变量——时间——的精密谜题，必须通过带着不同知识重玩同一天来弄清世界的规则',
        zhTW: '我控制單一變量——時間——的精密謎題，必須通過帶著不同知識重玩同一天來弄清世界規則',
        ja: '時間というたったひとつの変数を操る精密なパズル——同じ1日を違う知識で何度もやり直して、世界のルールを解き明かしていく',
        ko: '내가 하나의 변수—시간—를 조종하는 정밀한 퍼즐, 다른 지식을 가지고 같은 날을 반복하며 세계의 규칙을 밝혀내는 것',
        de: 'Ein präzises Rätsel, bei dem ich nur eine Variable — die Zeit — kontrolliere, und die Regeln der Welt herausfinden muss, indem ich denselben Tag mit neuem Wissen wiederhole',
        type: 'forgotten',
      },
      {
        en: 'A historical world so carefully researched that reading dialogue feels like archaeology — and my choices shape how an actual person\'s story ends across decades',
        zh: '一个经过精心研究的历史世界，阅读对话感觉就像考古——我的选择塑造了一个真实人物跨越数十年的故事结局',
        zhTW: '精心研究的歷史世界，閱讀對話感覺就像考古——我的選擇塑造了一個真實人物跨越數十年的故事結局',
        ja: '丁寧に調査された歴史の世界——台詞を読むだけで遺跡を発掘しているような感覚になり、自分の選択が実在の人物の数十年にわたる人生を形作っていく',
        ko: '세심하게 연구된 역사 세계, 대화를 읽는 것이 고고학 같은 느낌 — 내 선택이 실제 인물의 수십 년에 걸친 이야기 결말을 형성하는 것',
        de: 'Eine historisch sorgfältig recherchierte Welt, in der Dialoge sich wie Archäologie anfühlen — und meine Entscheidungen beeinflussen, wie eine echte Person über Jahrzehnte lebt',
        type: 'pentiment',
      },
    ],
  },
  {
    q_en: 'How do you feel about combat as a core mechanic?',
    q_zh: '你对战斗作为核心机制的态度是什么？',
    q_zhTW: '你對戰鬥作為核心機制的態度是什麼？',
    q_ja: '戦闘がゲームの核心にある場合、どう感じますか？',
    q_ko: '전투가 핵심 메카닉일 때 어떻게 느끼시나요?',
    q_de: 'Wie stehst du zu Kampf als Kernmechanik?',
    options: [
      {
        en: 'I want combat that is precise, fair, and deeply satisfying to master — difficult bosses that teach me their patterns until I beat them cleanly',
        zh: '我想要精准、公平、精通后极其令人满足的战斗——困难的 Boss 教我它们的模式，直到我流畅地击败它们',
        zhTW: '我想要精準、公平、精通後極其令人滿足的戰鬥——困難的 Boss 教我它們的模式，直到我流暢地擊敗它們',
        ja: '正確で公平で、マスターしたときに最高の達成感がある戦闘がいい——強いボスがパターンを教えてくれて、ついにクリアできたときの爽快感',
        ko: '정밀하고 공정하며 마스터하면 정말 만족스러운 전투 — 어려운 보스가 패턴을 가르쳐주고 깔끔하게 이길 때까지',
        de: 'Kämpfe, die präzise, fair und beim Meistern befriedigend sind — schwere Bosse, die mich ihre Muster lehren, bis ich sie sauber besiege',
        type: 'hollow',
      },
      {
        en: 'I want card game mechanics where every decision in a battle is a strategic puzzle — resource management, risk calculation, no reflex required',
        zh: '我想要卡牌游戏机制，每次战斗中的每个决策都是战略谜题——资源管理、风险计算，不需要反应速度',
        zhTW: '我想要卡牌遊戲機制，每次戰鬥中的每個決策都是戰略謎題——資源管理、風險計算，不需要反應速度',
        ja: 'カードゲームのメカニクスがいい——毎バトルの一手一手が戦略的なパズルで、リソース管理とリスク計算が全て、反射神経は不要',
        ko: '카드 게임 메카닉, 매 전투의 모든 결정이 전략적 퍼즐 — 자원 관리, 위험 계산, 반응 속도 불필요',
        de: 'Kartenspiel-Mechaniken, bei denen jede Entscheidung im Kampf ein strategisches Rätsel ist — Ressourcenmanagement, Risikoabwägung, kein Reflexe nötig',
        type: 'inscryption',
      },
      {
        en: 'I want no combat at all — pure dialogue, exploration, and deduction. If I make a mistake I want to rewind time rather than lose a fight',
        zh: '我完全不想要战斗——纯对话、探索和推理。如果我犯错，我想倒回时间而不是输掉战斗',
        zhTW: '我完全不想要戰鬥——純對話、探索和推理。如果我犯錯，我想倒回時間而不是輸掉戰鬥',
        ja: '戦闘は全くいらない——純粋な対話、探索、推理だけでいい。ミスしたら戦闘に負けるんじゃなく、時間を巻き戻したい',
        ko: '전투는 전혀 원하지 않음 — 순수한 대화, 탐험, 추리. 실수했을 때 싸워서 지는 게 아니라 시간을 되감고 싶음',
        de: 'Kein Kampf — reine Dialoge, Erkundung und Deduktion. Wenn ich einen Fehler mache, will ich die Zeit zurückdrehen, nicht einen Kampf verlieren',
        type: 'forgotten',
      },
      {
        en: 'I want no combat — pure narrative choices where the weight of consequence comes from what I said to someone ten chapters ago, not from sword swings',
        zh: '我不想要战斗——纯叙事选择，后果的重量来自我十章前对某人说的话，而不是剑的挥舞',
        zhTW: '我不想要戰鬥——純敘事選擇，後果的重量來自我十章前對某人說的話，而不是劍的揮舞',
        ja: '戦闘はいらない——純粋な物語の選択がしたい。十章前に誰かに言った言葉が後で響いてくる、そういう重みが好き',
        ko: '전투 없음 — 순수 서사 선택, 결과의 무게는 10챕터 전에 누군가에게 한 말에서 오는 것, 칼 휘두르는 것에서 오는 게 아님',
        de: 'Kein Kampf — reine Erzählentscheidungen, bei denen das Gewicht der Konsequenzen daher kommt, was ich zehn Kapitel zuvor zu jemandem sagte, nicht von Schwertschwüngen',
        type: 'pentiment',
      },
    ],
  },
  {
    q_en: 'Which atmosphere sounds most appealing for a long play session?',
    q_zh: '哪种氛围最适合你长时间游玩？',
    q_zhTW: '哪種氛圍最適合你長時間遊玩？',
    q_ja: '長時間プレイするなら、どんな雰囲気のゲームが好きですか？',
    q_ko: '오랜 플레이 세션에 가장 끌리는 분위기는 어떤 건가요?',
    q_de: 'Welche Atmosphäre klingt für eine lange Spielsession am ansprechendsten?',
    options: [
      {
        en: 'A vast underground kingdom of ruined civilizations, ancient temples, and strange creatures — melancholy and beautiful, with a profound sense of history in every corner',
        zh: '一个废墟文明、古老神庙和奇异生物的广阔地下王国——忧郁而美丽，每个角落都有深刻的历史感',
        zhTW: '廢墟文明、古老神廟和奇異生物的廣闊地下王國——憂鬱而美麗，每個角落都有深刻的歷史感',
        ja: '滅びた文明の遺跡、古代の神殿、奇妙な生き物が暮らす広大な地下王国——もの悲しくて美しく、どこかに歴史の重みが漂っている',
        ko: '폐허가 된 문명, 고대 사원, 이상한 생물들이 있는 광활한 지하 왕국 — 우울하고 아름답고, 모든 구석에 깊은 역사감이 있는',
        de: 'Ein riesiges unterirdisches Königreich mit zerstörten Zivilisationen, alten Tempeln und seltsamen Kreaturen — melancholisch und wunderschön, mit tiefem Geschichtsgefühl in jeder Ecke',
        type: 'hollow',
      },
      {
        en: 'A dark cabin in the woods where you are playing a card game against something that is watching you — strange, unsettling, with layers of meta-horror that unfold slowly',
        zh: '森林中的黑暗小屋，你在和某个正在注视你的东西玩卡牌——奇怪、令人不安，缓慢展开的元恐怖层次',
        zhTW: '森林中的黑暗小屋，你在和某個正在注視你的東西玩卡牌——奇怪、令人不安，緩慢展開的元恐怖層次',
        ja: '森の中の暗い小屋で、こちらを見ている何かとカードゲームをしている——不気味で不安感があり、じわじわと明かされるメタホラーの層',
        ko: '숲 속의 어두운 오두막, 당신을 지켜보는 무언가와 카드 게임을 하는 — 이상하고 불안하며, 천천히 펼쳐지는 메타 공포의 층위',
        de: 'Eine dunkle Hütte im Wald, in der du Karten gegen etwas spielst, das dich beobachtet — seltsam, beunruhigend, mit sich langsam entfaltenden Meta-Horror-Ebenen',
        type: 'inscryption',
      },
      {
        en: 'The sunlit streets and forums of ancient Rome, frozen in a single day that repeats — classical architecture, toga-clad characters, and a mystery where everyone is both victim and suspect',
        zh: '古罗马阳光明媚的街道和广场，被冻结在重复的单日中——古典建筑、身着托加的人物，以及一个每个人既是受害者又是嫌疑人的谜题',
        zhTW: '古羅馬陽光明媚的街道和廣場，被凍結在重複的單日中——古典建築、身著托加的人物，以及一個每個人既是受害者又是嫌疑人的謎題',
        ja: '繰り返す一日の中に閉じ込められた古代ローマの陽光降り注ぐ街並みと広場——トーガをまとった人々、古典的な建築、誰もが被害者でもあり容疑者でもある謎',
        ko: '반복되는 하루에 갇힌 고대 로마의 햇살 가득한 거리와 광장 — 고전 건축, 토가를 입은 인물들, 모든 사람이 피해자이자 용의자인 미스터리',
        de: 'Die sonnigen Straßen und Foren des antiken Roms, eingefroren in einem Tag, der sich wiederholt — klassische Architektur, Charaktere in Togas und ein Rätsel, bei dem jeder Opfer und Verdächtiger zugleich ist',
        type: 'forgotten',
      },
      {
        en: 'A hand-painted 16th-century Bavarian monastery town, illustrated in the style of a medieval manuscript — historically accurate characters living real lives in a real crisis',
        zh: '手绘的 16 世纪巴伐利亚修道院小镇，以中世纪手稿风格绘制——历史上真实的人物在真实的危机中生活',
        zhTW: '手繪的 16 世紀巴伐利亞修道院小鎮，以中世紀手稿風格繪製——歷史上真實的人物在真實的危機中生活',
        ja: '中世の写本スタイルで描かれた16世紀バイエルンの修道院の町——実在した人々が本物の危機の中を生きるハンドペイントの世界',
        ko: '중세 필사본 스타일로 그려진 손으로 그린 16세기 바이에른 수도원 마을 — 실제 역사적 인물들이 실제 위기 속에서 살아가는',
        de: 'Eine handgezeichnete Klosterstadt im Bayern des 16. Jahrhunderts, illustriert im Stil einer mittelalterlichen Handschrift — historisch genaue Charaktere, die echte Leben in einer echten Krise leben',
        type: 'pentiment',
      },
    ],
  },
  {
    q_en: 'How much time are you willing to invest for the full experience?',
    q_zh: '你愿意投入多少时间获得完整体验？',
    q_zhTW: '你願意投入多少時間獲得完整體驗？',
    q_ja: '完全なゲーム体験のためにどのくらいの時間を使えますか？',
    q_ko: '전체 경험을 위해 얼마나 많은 시간을 투자할 의향이 있나요?',
    q_de: 'Wie viel Zeit bist du bereit für das vollständige Erlebnis zu investieren?',
    options: [
      {
        en: '40-60+ hours — a vast world I can get deeply lost in, with optional areas, hidden lore, and multiple endings I might never see on a first playthrough',
        zh: '40-60+ 小时——一个我可以深深迷失其中的广阔世界，有可选区域、隐藏传说和我第一次游玩可能永远看不到的多个结局',
        zhTW: '40-60+ 小時——一個我可以深深迷失其中的廣闊世界，有可選區域、隱藏傳說和我第一次遊玩可能永遠看不到的多個結局',
        ja: '40〜60時間以上——広大な世界に深く没頭できる、隠しエリア、秘密の伝承、初回プレイでは気づかないかもしれない複数エンディングがある',
        ko: '40-60시간 이상 — 깊이 빠져들 수 있는 광활한 세계, 선택적 구역, 숨겨진 설정, 첫 플레이에서는 절대 못 볼 수도 있는 여러 엔딩이 있는',
        de: '40–60+ Stunden — eine riesige Welt, in der ich mich tief verlieren kann, mit optionalen Gebieten, verborgener Lore und mehreren Enden, die ich beim ersten Durchlauf vielleicht nie sehe',
        type: 'hollow',
      },
      {
        en: '8-12 hours — a tightly designed experience where the revelation pays off specifically because it fits in one intense sitting, not because it is short',
        zh: '8-12 小时——一个精心设计的体验，揭示的价值在于它适合一次紧凑的游玩，而不仅仅是因为它短',
        zhTW: '8-12 小時——一個精心設計的體驗，揭示的價值在於它適合一次緊湊的遊玩，而不僅僅是因為它短',
        ja: '8〜12時間——精密に設計された体験で、その衝撃は短さゆえではなく「一気にプレイできる密度」があってこそ生きる',
        ko: '8-12시간 — 정밀하게 설계된 경험, 그 충격이 짧아서가 아니라 한 번의 집중 플레이에 딱 맞기 때문에 빛나는',
        de: '8–12 Stunden — ein kompakt gestaltetes Erlebnis, bei dem die Enthüllung sich auszahlt, weil es in eine intensive Sitzung passt, nicht weil es kurz ist',
        type: 'inscryption',
      },
      {
        en: '6-10 hours — a complete, satisfying story where I will replay specific sections to test different dialogue choices and see how the mystery resolves differently',
        zh: '6-10 小时——一个完整、令人满足的故事，我会重玩特定章节来测试不同的对话选择，看看谜题如何以不同方式解决',
        zhTW: '6-10 小時——一個完整、令人滿足的故事，我會重玩特定章節來測試不同的對話選擇，看看謎題如何以不同方式解決',
        ja: '6〜10時間——完結した満足感のある物語で、特定のシーンを何度もやり直して別の選択肢を試し、謎がどう変わるか確かめたくなる',
        ko: '6-10시간 — 완전하고 만족스러운 이야기, 특정 섹션을 다시 플레이해서 다른 대화 선택을 시험하고 미스터리가 어떻게 다르게 풀리는지 보고 싶은',
        de: '6–10 Stunden — eine vollständige, befriedigende Geschichte, bei der ich bestimmte Abschnitte neu spielen werde, um verschiedene Dialogoptionen zu testen und zu sehen, wie sich das Rätsel anders löst',
        type: 'forgotten',
      },
      {
        en: '8-12 hours — a slow, deliberate narrative that respects my time while rewarding every hour with new character development and historical depth',
        zh: '8-12 小时——一个缓慢、深思熟虑的叙事，尊重我的时间，同时用新的角色发展和历史深度回报每一小时',
        zhTW: '8-12 小時——一個緩慢、深思熟慮的敘事，尊重我的時間，同時用新的角色發展和歷史深度回報每一小時',
        ja: '8〜12時間——じっくりと語られる物語で、プレイする時間を大切にしながら、一時間ごとに新たなキャラクターの成長と歴史の深みで報いてくれる',
        ko: '8-12시간 — 느리고 사려 깊은 서사, 내 시간을 존중하면서 매 시간마다 새로운 캐릭터 발전과 역사적 깊이로 보상해주는',
        de: '8–12 Stunden — ein langsames, bedächtiges Erzählen, das meine Zeit respektiert und jede Stunde mit neuer Charakterentwicklung und historischer Tiefe belohnt',
        type: 'pentiment',
      },
    ],
  },
  {
    q_en: 'How do you want the game to challenge you?',
    q_zh: '你想让游戏如何挑战你？',
    q_zhTW: '你想讓遊戲如何挑戰你？',
    q_ja: 'ゲームにどんな形で挑戦してほしいですか？',
    q_ko: '게임이 당신에게 어떻게 도전하기를 원하나요?',
    q_de: 'Wie soll dich das Spiel herausfordern?',
    options: [
      {
        en: 'Muscle memory and spatial reasoning — learning enemy patterns, navigating a complex interconnected map without a guide, mastering movement to access new areas',
        zh: '肌肉记忆和空间推理——学习敌人模式、不用攻略在复杂的互联地图中导航、掌握移动以进入新区域',
        zhTW: '肌肉記憶和空間推理——學習敵人模式、不用攻略在複雜的互聯地圖中導航、掌握移動以進入新區域',
        ja: '筋肉記憶と空間認識——敵のパターンを体で覚えて、攻略なしで複雑なマップを読み解き、新エリアへのアクセスを開いていく',
        ko: '근육 기억과 공간 추리 — 적 패턴 학습, 공략 없이 복잡한 연결된 지도 탐색, 새 구역 접근을 위한 움직임 마스터링',
        de: 'Muskelgedächtnis und räumliches Denken — Feindmuster lernen, eine komplexe, vernetzte Karte ohne Guide navigieren, Bewegungen meistern, um neue Gebiete zu erschließen',
        type: 'hollow',
      },
      {
        en: 'Strategic thinking under pressure — managing a deck of cards with limited resources against opponents whose patterns I need to decode before I run out of options',
        zh: '在压力下进行战略思考——用有限资源管理一副牌对抗对手，需要在用尽选项之前解码他们的模式',
        zhTW: '在壓力下進行戰略思考——用有限資源管理一副牌對抗對手，需要在用盡選項之前解碼他們的模式',
        ja: 'プレッシャーの中での戦略的思考——限られたリソースでデッキを管理し、選択肢が尽きる前に相手のパターンを読み解く',
        ko: '압박 속의 전략적 사고 — 한정된 자원으로 카드 덱을 관리하며 선택지가 소진되기 전에 상대방의 패턴을 해독하는',
        de: 'Strategisches Denken unter Druck — ein Kartendeck mit begrenzten Ressourcen gegen Gegner verwalten, deren Muster ich entschlüsseln muss, bevor mir die Optionen ausgehen',
        type: 'inscryption',
      },
      {
        en: 'Deductive reasoning — remembering what I learned in a previous loop, identifying which characters know what, and crafting the perfect sequence of conversations to solve the central crime',
        zh: '演绎推理——记住我在上一轮循环中学到的内容，识别哪些角色知道什么，精心安排完美的对话顺序来解决核心案件',
        zhTW: '演繹推理——記住我在上一輪循環中學到的內容，識別哪些角色知道什麼，精心安排完美的對話順序來解決核心案件',
        ja: '推理力——前のループで得た情報を覚えており、誰が何を知っているかを特定し、事件を解決する完璧な会話の順序を組み立てていく',
        ko: '연역적 추리 — 이전 루프에서 배운 것을 기억하고, 어떤 캐릭터가 무엇을 아는지 파악하고, 핵심 범죄를 해결할 완벽한 대화 순서를 짜는',
        de: 'Deduktives Denken — mir merken, was ich in einem vorherigen Loop gelernt habe, herausfinden, wer was weiß, und die perfekte Gesprächsreihenfolge planen, um das zentrale Verbrechen zu lösen',
        type: 'forgotten',
      },
      {
        en: 'Ethical reasoning — making decisions about historical figures in a real crisis where every choice has consequences I cannot fully predict, and where there is no clean right answer',
        zh: '道德推理——在真实危机中对历史人物做出决定，每个选择都有我无法完全预测的后果，且没有干净的正确答案',
        zhTW: '道德推理——在真實危機中對歷史人物做出決定，每個選擇都有我無法完全預測的後果，且沒有乾淨的正確答案',
        ja: '倫理的な判断——実際の危機の中で歴史上の人物に関する決断を下し、すべての選択が予測しきれない結果を生み、唯一の正解など存在しない',
        ko: '윤리적 추리 — 실제 위기 속 역사적 인물들에 대한 결정을 내리고, 모든 선택이 완전히 예측할 수 없는 결과를 갖고 깨끗한 정답이 없는',
        de: 'Ethisches Denken — Entscheidungen über historische Personen in einer echten Krise treffen, bei der jede Wahl Folgen hat, die ich nicht vollständig vorhersehen kann, und wo es keine saubere richtige Antwort gibt',
        type: 'pentiment',
      },
    ],
  },
  {
    q_en: 'Which post-credits feeling appeals to you most?',
    q_zh: '哪种通关后的感觉最吸引你？',
    q_zhTW: '哪種通關後的感覺最吸引你？',
    q_ja: 'エンディング後、どんな気持ちになりたいですか？',
    q_ko: '엔딩 후 어떤 감정이 가장 끌리나요?',
    q_de: 'Welches Gefühl nach dem Abspann spricht dich am meisten an?',
    options: [
      {
        en: 'I sat with the ending for a while — the world\'s history unfolded in the final moments in a way that recontextualized everything I saw, and now I want to read every piece of lore I missed',
        zh: '我独坐了一会儿——世界的历史在最后时刻以重新诠释我所见一切的方式展开，现在我想阅读每一段我错过的传说',
        zhTW: '我獨坐了一會兒——世界的歷史在最後時刻以重新詮釋我所見一切的方式展開，現在我想閱讀每一段我錯過的傳說',
        ja: 'しばらく呆然と座っていた——エンディングで世界の歴史が明かされ、今まで見てきたすべてが違って見え、見逃したロアを全部読み返したくなる',
        ko: '잠시 멍하니 앉아 있었음 — 마지막 순간에 세계의 역사가 내가 본 모든 것을 재해석하는 방식으로 펼쳐지고, 이제 놓친 모든 설정을 읽고 싶음',
        de: 'Ich saß eine Weile mit dem Ende — die Geschichte der Welt entfaltete sich in den letzten Momenten auf eine Weise, die alles, was ich gesehen hatte, neu kontextualisierte, und jetzt will ich jeden Lore-Eintrag nachlesen, den ich verpasst habe',
        type: 'hollow',
      },
      {
        en: 'I immediately wanted to call someone and talk through what had just happened — a game that feels like a shared secret with everyone who has played it',
        zh: '我立刻想打电话给某人讨论刚才发生的事情——一款感觉像是与每位玩过它的人共享秘密的游戏',
        zhTW: '我立刻想打電話給某人討論剛才發生的事情——一款感覺像是與每位玩過它的人共享秘密的遊戲',
        ja: 'すぐ誰かに連絡して「ねえ今これやって！」って言いたくなる——プレイした人だけが共有できる秘密を持っているような感覚のゲーム',
        ko: '즉시 누군가에게 전화해서 방금 일어난 일을 이야기하고 싶었음 — 게임을 플레이한 모든 사람과 공유하는 비밀 같은 느낌',
        de: 'Ich wollte sofort jemanden anrufen und durchsprechen, was gerade passiert war — ein Spiel, das sich wie ein geteiltes Geheimnis mit jedem anfühlt, der es gespielt hat',
        type: 'inscryption',
      },
      {
        en: 'A warm sense of resolution — I understood the crime, I saw the final golden rule play out, and the ancient Roman world felt genuinely real for the hours I spent in it',
        zh: '温暖的解决感——我理解了犯罪，看到最终的黄金法则展开，我在其中度过的数小时让古罗马世界感觉真实存在',
        zhTW: '溫暖的解決感——我理解了犯罪，看到最終的黃金法則展開，我在其中度過的數小時讓古羅馬世界感覺真實存在',
        ja: 'あたたかい解決感——謎が解け、黄金律のラストシーンを見て、過ごした数時間が古代ローマの世界をリアルに感じさせてくれた',
        ko: '따뜻한 해결감 — 범죄를 이해하고, 마지막 황금 법칙이 펼쳐지는 것을 보고, 그 안에서 보낸 시간이 고대 로마 세계를 진짜처럼 느끼게 해줬음',
        de: 'Ein warmes Gefühl der Auflösung — ich verstand das Verbrechen, sah die goldene Regel sich am Ende entfalten, und die Welt des antiken Roms fühlte sich für die Stunden, die ich darin verbrachte, echt an',
        type: 'forgotten',
      },
      {
        en: 'A quiet kind of sadness — I watched people live and die across thirty years and felt the weight of the choices I made for them, knowing some consequences were never undone',
        zh: '一种平静的悲伤——我看着人们跨越三十年的生死，感受到我为他们所做选择的分量，知道一些后果永远无法撤销',
        zhTW: '一種平靜的悲傷——我看著人們跨越三十年的生死，感受到我為他們所做選擇的分量，知道一些後果永遠無法撤銷',
        ja: '静かな悲しさ——三十年にわたって人々が生き、死ぬのを見届けて、自分が彼らのために下した選択の重みを感じ、取り返しのつかない結果があることを知っている',
        ko: '조용한 슬픔 — 30년에 걸쳐 사람들이 살고 죽는 것을 지켜보며 내가 그들을 위해 한 선택의 무게를 느끼고, 어떤 결과는 영원히 되돌릴 수 없음을 아는',
        de: 'Eine stille Traurigkeit — ich beobachtete Menschen über dreißig Jahre hinweg leben und sterben und spürte das Gewicht der Entscheidungen, die ich für sie traf, wissend, dass manche Konsequenzen nie rückgängig gemacht wurden',
        type: 'pentiment',
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
  hollow: {
    title_en: 'Hollow Knight',
    title_zh: '空洞骑士',
    title_zhTW: '空洞騎士',
    title_ja: 'ホロウナイト',
    title_ko: '할로우 나이트',
    title_de: 'Hollow Knight',
    emoji: '🪲',
    tag_en: 'A vast underground kingdom of ruined insect civilizations — one of the deepest metroidvania games ever made, with 40+ hours of exploration, challenging combat, and melancholy lore',
    tag_zh: '昆虫废墟文明的广阔地下王国——有史以来最深度的银河城游戏之一，40+ 小时探索、充满挑战的战斗和忧郁的传说',
    tag_zhTW: '昆蟲廢墟文明的廣闊地下王國——有史以來最深度的銀河城遊戲之一，40+ 小時探索、充滿挑戰的戰鬥和憂鬱的傳說',
    tag_ja: '滅びた昆虫文明の広大な地下王国——史上最も深いメトロイドヴァニアのひとつ。40時間超の探索、歯応えある戦闘、もの悲しい伝承',
    tag_ko: '곤충 폐허 문명의 광활한 지하 왕국 — 역대 가장 깊이 있는 메트로이드바니아 중 하나, 40시간 이상의 탐험, 도전적인 전투, 우울한 설정',
    tag_de: 'Ein riesiges unterirdisches Königreich einer zerstörten Insektenzivilisation — eines der tiefgründigsten Metroidvanias aller Zeiten, mit 40+ Stunden Erkundung, herausforderndem Kampf und melancholischer Lore',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox — about $15. An outstanding value.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox——约 15 美元。极高性价比。',
    platform_zhTW: '可在以下平台取得：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox——約 15 美元。極高性價比。',
    platform_ja: '対応プラットフォーム：PC（Steam・GOG）、Nintendo Switch、PS4、PS5、Xbox——約1,500〜2,000円。コスパ最強クラス。',
    platform_ko: '이용 가능 플랫폼: PC(Steam, GOG), Nintendo Switch, PS4, PS5, Xbox — 약 15달러. 가성비 최고.',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox — ca. 15 €. Ein herausragendes Preis-Leistungs-Verhältnis.',
    why_en:
      "Hollow Knight (2017) is Team Cherry's handcrafted masterpiece — a metroidvania set in the vast underground kingdom of Hallownest, a once-great insect civilization now in ruin. You play as the Knight, a small silent warrior who descends into the depths to discover what happened to Hallownest and why it fell. The game is enormous: 40+ hours to complete the main story, with optional bosses and areas that can extend to 60+ hours for completionists. The combat is precise and demanding — every boss has attack patterns you must learn through deaths and attempts, and beating a difficult boss is one of the most satisfying feelings in gaming. The world is dense with environmental storytelling — you piece together Hallownest's history from fragments of NPC dialogue, item descriptions, and visual design rather than cutscenes. The art direction is hauntingly beautiful: all hand-drawn in a dark, melancholy watercolor style. At about $15, it is one of the best-value games ever made. For cozy gamers: the exploration loop (unlocking new traversal abilities that open new areas) is deeply familiar from games like Stardew Valley's skill progression — it just happens at a much higher difficulty.",
    why_zh:
      '空洞骑士（2017 年）是 Team Cherry 的手工艺品——一款银河城游戏，设定在曾经伟大的昆虫文明荒原王国的广阔地下世界。你扮演骑士，一个沉默的小战士，潜入深处探索荒原发生了什么以及为什么衰落。游戏规模巨大：完成主线故事需要 40+ 小时，可选 Boss 和区域可以让收集爱好者游玩 60+ 小时。战斗精准且要求高——每个 Boss 都有你必须通过死亡和尝试来学习的攻击模式，击败困难 Boss 是游戏中最令人满足的感受之一。世界充满环境叙事——你从 NPC 对话片段、物品描述和视觉设计中拼凑荒原的历史。约 15 美元，是有史以来性价比最高的游戏之一。',
    why_zhTW:
      '空洞騎士（2017年）是 Team Cherry 的手工傑作——一款銀河城遊戲，設定在曾經偉大的昆蟲文明荒原王國的廣闊地下世界。你扮演騎士，一個沉默的小戰士，潛入深處探索荒原發生了什麼以及為什麼衰落。遊戲規模巨大：完成主線故事需要 40+ 小時，可選 Boss 和區域可以讓收集愛好者遊玩 60+ 小時。戰鬥精準且要求高——每個 Boss 都有你必須通過死亡和嘗試來學習的攻擊模式，擊敗困難 Boss 是遊戲中最令人滿足的感受之一。世界充滿環境敘事——你從 NPC 對話片段、物品描述和視覺設計中拼湊荒原的歷史。約 15 美元，是有史以來性價比最高的遊戲之一。',
    why_ja:
      'ホロウナイト（2017年）はTeam Cherryが全て手作りした傑作メトロイドヴァニア。かつて栄えた昆虫文明「ハロウネスト」の廃墟となった広大な地下王国が舞台です。プレイヤーは小さな無口な戦士「騎士」となり、深淵へと降りてハロウネストに何が起きたかを解き明かします。ボリュームは圧倒的で、メインストーリーのクリアに40時間以上、隠しボスやエリアまで攻略すると60時間以上かかることも。戦闘は正確で要求が高く、各ボスには死んで学ぶパターンがあり、難ボスを倒したときの達成感はゲーム史上屈指の爽快感です。世界はNPCの会話の断片、アイテムの説明文、視覚的なデザインから歴史を積み上げる「環境ストーリーテリング」で満ちています。約15ドルという価格は、ゲーム史上最高のコスパのひとつといえます。',
    why_ko:
      '할로우 나이트(2017)는 Team Cherry의 수제작 걸작 — 한때 위대했던 곤충 문명 할로우네스트의 광활한 지하 왕국을 배경으로 한 메트로이드바니아입니다. 플레이어는 작고 말 없는 전사 기사가 되어 깊은 곳으로 내려가 할로우네스트에 무슨 일이 일어났는지 탐색합니다. 메인 스토리 완료에 40시간 이상, 선택적 보스와 구역까지 하면 60시간 이상 걸릴 수 있습니다. 전투는 정밀하고 요구가 높으며 — 각 보스마다 죽고 시도하며 배워야 하는 패턴이 있고, 어려운 보스를 이길 때의 만족감은 게임 역사상 최고 수준입니다. 세계는 환경 스토리텔링으로 가득 차 있어 NPC 대화 단편, 아이템 설명, 시각적 디자인에서 할로우네스트의 역사를 짜 맞춥니다. 약 15달러로 역대 최고의 가성비 게임 중 하나입니다.',
    why_de:
      'Hollow Knight (2017) ist das handgefertigte Meisterwerk von Team Cherry — ein Metroidvania, das im riesigen unterirdischen Königreich Hallownest spielt, einer einst großartigen Insektenzivilisation, die nun in Trümmern liegt. Du spielst als der Ritter, einen kleinen, schweigsamen Krieger, der in die Tiefen hinabsteigt, um herauszufinden, was mit Hallownest geschah. Das Spiel ist enorm: 40+ Stunden für die Hauptgeschichte, mit optionalen Bossen und Gebieten, die Completionists auf 60+ Stunden bringen können. Der Kampf ist präzise und fordernd — jeder Boss hat Angriffsmuster, die du durch Tode und Versuche lernen musst, und einen schwierigen Boss zu besiegen gehört zu den befriedigendsten Gefühlen im Gaming. Die Welt strotzt vor Umgebungserzählung — du setzt Hallownests Geschichte aus NPC-Dialogfragmenten, Gegenstandsbeschreibungen und visuellem Design zusammen. Für ca. 15 € ist es eines der besten Preis-Leistungs-Verhältnisse im Gaming.',
    tip_en: "Do not look up maps or guides on your first playthrough — the joy of discovery is the whole point, and Hollow Knight is designed to be navigated by feel. Mark areas with the map pins when you find locked doors (the game tells you when you need a new ability). The Mothwing Cloak (first major movement upgrade) is the unlock that opens the game up. If a boss is too hard, explore other areas first — you almost always have somewhere else to go.",
    tip_zh: '第一次游玩不要查地图或攻略——发现的乐趣是核心，空洞骑士设计成靠感觉导航。当你发现锁住的门时用地图标记（游戏会告诉你何时需要新能力）。飞蛾翼斗篷（第一个主要移动升级）是打开游戏的关键解锁。如果 Boss 太难，先探索其他区域——几乎总有其他地方可以去。',
    tip_zhTW: '第一次遊玩不要查地圖或攻略——發現的樂趣是核心，空洞騎士設計成靠感覺導航。當你發現鎖住的門時用地圖標記（遊戲會告訴你何時需要新能力）。飛蛾翼斗篷（第一個主要移動升級）是打開遊戲的關鍵解鎖。如果 Boss 太難，先探索其他區域——幾乎總有其他地方可以去。',
    tip_ja: '初回プレイはマップも攻略サイトも見ないで——発見する楽しさがこのゲームの全て。ロックされた扉を見つけたらピンを刺しておこう（新しいアビリティが必要なタイミングはゲームが教えてくれる）。最初の大きな移動アップグレード「蛾の翼マント」を手に入れると世界が広がる感覚が一変します。ボスが強すぎると感じたら別エリアを探索しよう——ほぼ必ず他に行ける場所がある。',
    tip_ko: '첫 플레이에서는 지도나 공략을 찾아보지 마세요 — 발견의 즐거움이 핵심이고, 할로우 나이트는 감각으로 탐색하도록 설계되어 있습니다. 잠긴 문을 발견할 때 지도 핀으로 표시하세요(새 능력이 필요할 때 게임이 알려줍니다). 나방날개 망토(첫 번째 주요 이동 업그레이드)가 게임을 열어주는 핵심 해금입니다. 보스가 너무 어려우면 다른 구역을 먼저 탐험하세요 — 거의 항상 다른 갈 곳이 있습니다.',
    tip_de: 'Schau im ersten Durchlauf keine Karten oder Guides nach — die Freude der Entdeckung ist der Kern, und Hollow Knight ist darauf ausgelegt, intuitiv navigiert zu werden. Markiere Bereiche mit Kartennadeln, wenn du verschlossene Türen findest (das Spiel sagt dir, wann du eine neue Fähigkeit brauchst). Der Mottenschwingen-Umhang (erstes größeres Bewegungs-Upgrade) ist das Freischalt-Ereignis, das das Spiel öffnet. Wenn ein Boss zu schwer ist, erkunde zuerst andere Bereiche — es gibt fast immer einen anderen Ort, zu dem du gehen kannst.',
  },
  inscryption: {
    title_en: 'Inscryption',
    title_zh: 'Inscryption',
    title_zhTW: 'Inscryption',
    title_ja: 'Inscryption',
    title_ko: 'Inscryption',
    title_de: 'Inscryption',
    emoji: '🃏',
    tag_en: 'A card game that is also a cabin escape puzzle that is also a meta-horror deconstruction of gaming itself — one of the most original games of the past decade',
    tag_zh: '一款卡牌游戏，也是小屋逃脱谜题，也是对游戏本身的元恐怖解构——过去十年最具原创性的游戏之一',
    tag_zhTW: '一款卡牌遊戲，也是小屋逃脫謎題，也是對遊戲本身的元恐怖解構——過去十年最具原創性的遊戲之一',
    tag_ja: 'カードゲームでありながら小屋脱出パズルであり、ゲームそのものを解体するメタホラー——過去10年で最もオリジナリティあふれるゲームのひとつ',
    tag_ko: '카드 게임이자 오두막 탈출 퍼즐이자 게임 자체를 해체하는 메타 호러 — 지난 10년간 가장 독창적인 게임 중 하나',
    tag_de: 'Ein Kartenspiel, das auch ein Kabinen-Escape-Puzzle und eine Meta-Horror-Dekonstruktion des Gamings selbst ist — eines der originellsten Spiele des letzten Jahrzehnts',
    platform_en: 'Available on: PC (Steam), PS4, PS5 — about $20. Won IGF Grand Prize 2022.',
    platform_zh: '可在以下平台获取：PC（Steam）、PS4、PS5——约 20 美元。获得 2022 年 IGF 大奖。',
    platform_zhTW: '可在以下平台取得：PC（Steam）、PS4、PS5——約 20 美元。獲得 2022 年 IGF 大獎。',
    platform_ja: '対応プラットフォーム：PC（Steam）、PS4、PS5——約2,000〜2,500円。2022年IGFグランプリ受賞作。',
    platform_ko: '이용 가능 플랫폼: PC(Steam), PS4, PS5 — 약 20달러. 2022 IGF 그랜드 프라이즈 수상.',
    platform_de: 'Erhältlich auf: PC (Steam), PS4, PS5 — ca. 20 €. Gewann den IGF Grand Prize 2022.',
    why_en:
      "Inscryption (2021) by Daniel Mullins is almost impossible to describe without spoiling, which is itself part of its appeal. It begins as a roguelike deckbuilding card game set in a dark cabin — you play against a mysterious figure, using cards of woodland creatures (squirrels, wolves, stoats) in strategic battles where blood sacrifice is the core resource mechanic. But the cabin is also a puzzle: you can get up from the table, explore the room, and discover objects that affect the card game in unexpected ways. And then the game does something extraordinary that I will not describe, except to say that every layer you think is the game turns out to be a wrapper for something stranger beneath it. Metacritic score 85 on PC. For cozy gamers who loved the meta-elements of games like Tunic (also used) or who want a game that makes them feel like the rules of the medium itself are bending: Inscryption is that experience at its most committed. It won the Grand Prize at the Independent Games Festival in 2022 — the highest honor in independent games.",
    why_zh:
      'Inscryption（2021 年）由 Daniel Mullins 开发，几乎无法在不剧透的情况下描述，这本身就是其吸引力的一部分。游戏以一个黑暗小屋中的 Roguelike 卡组构建卡牌游戏开始——你与一个神秘人物对战，使用林地生物卡（松鼠、狼、黄鼠狼）在以血液献祭为核心资源机制的战略战斗中。但小屋也是一个谜题：你可以起身离开桌子，探索房间，发现以意想不到方式影响卡牌游戏的物品。然后游戏做了一件非凡的事……PC 版 Metacritic 评分 85，2022 年 IGF 大奖得主。',
    why_zhTW:
      'Inscryption（2021年）由 Daniel Mullins 開發，幾乎無法在不劇透的情況下描述，這本身就是其吸引力的一部分。遊戲以一個黑暗小屋中的 Roguelike 卡組構建卡牌遊戲開始——你與一個神秘人物對戰，使用林地生物卡（松鼠、狼、黃鼠狼）在以血液獻祭為核心資源機制的戰略戰鬥中。但小屋也是一個謎題：你可以起身離開桌子，探索房間，發現以意想不到方式影響卡牌遊戲的物品。然後遊戲做了一件非凡的事……PC 版 Metacritic 評分 85，2022 年 IGF 大獎得主。',
    why_ja:
      'Inscryption（2021年）はダニエル・マリンズ作で、ネタバレなしにはほぼ説明不可能——それ自体がこのゲームの魅力のひとつです。暗い小屋の中のローグライクなデッキ構築カードゲームとして始まり、謎の人物を相手に、血の生け贄を核心リソースとした戦略バトルでリスや狼、イタチなどの森の生き物カードを駆使して戦います。しかしその小屋はパズルでもある——テーブルから立ち上がって部屋を探索し、予想外の方法でカードゲームに影響を与えるオブジェクトを発見できます。そしてゲームは、私が説明しないある驚異的なことをやってのけます。PCでMetacritic 85点、2022年IGFグランプリ受賞。',
    why_ko:
      'Inscryption(2021)은 Daniel Mullins 개발작으로, 스포일러 없이는 거의 설명이 불가능합니다 — 그 자체가 매력의 일부입니다. 어두운 오두막의 로그라이크 덱 빌딩 카드 게임으로 시작해 — 혈액 희생을 핵심 자원 메카닉으로 하는 전략 배틀에서 다람쥐, 늑대, 족제비 같은 숲 생물 카드를 사용해 신비한 인물과 대결합니다. 하지만 오두막도 퍼즐입니다: 테이블에서 일어나 방을 탐험하고 예상치 못한 방식으로 카드 게임에 영향을 미치는 물건을 발견할 수 있습니다. 그리고 게임은 설명하지 않을 어떤 비범한 것을 합니다. PC Metacritic 85점, 2022 IGF 그랜드 프라이즈 수상.',
    why_de:
      'Inscryption (2021) von Daniel Mullins ist fast unmöglich zu beschreiben, ohne zu spoilern, was selbst Teil seines Reizes ist. Es beginnt als Roguelike-Deckbau-Kartenspiel in einer dunklen Hütte — du spielst gegen eine geheimnisvolle Gestalt, nutzt Karten von Waldtieren (Eichhörnchen, Wölfe, Hermeline) in strategischen Kämpfen, bei denen Blutopfer die Kernressource ist. Aber die Hütte ist auch ein Rätsel: Du kannst vom Tisch aufstehen, den Raum erkunden und Objekte entdecken, die das Kartenspiel auf unerwartete Weise beeinflussen. Und dann tut das Spiel etwas Außerordentliches, das ich nicht beschreiben werde. Metacritic-Wertung 85 auf PC, IGF Grand Prize 2022.',
    tip_en: "Play your first run without any foreknowledge — every discovery is the experience. If you lose a run in the cabin phase (you will, several times), pay attention to what the Leshy says and what changes: losing is part of learning the systems. Some of the cabin puzzles require finding physical objects in the room; if you are stuck, stand up from the table and look around. The card game is deeper than it first appears — teeth as a currency and blood sacrifice chains are the advanced systems.",
    tip_zh: '第一次游玩不要提前了解任何信息——每个发现都是体验。如果你在小屋阶段输了一轮（你会的，会输好几次），注意 Leshy 说了什么以及什么发生了变化：失败是学习系统的一部分。一些小屋谜题需要在房间里找到实物对象；如果你卡住了，起身离开桌子四处看看。卡牌游戏比最初看起来更深——牙齿作为货币和血液献祭链是高级系统。',
    tip_zhTW: '第一次遊玩不要提前了解任何資訊——每個發現都是體驗。如果你在小屋階段輸了一輪（你會的，會輸好幾次），注意 Leshy 說了什麼以及什麼發生了變化：失敗是學習系統的一部分。一些小屋謎題需要在房間裡找到實物對象；如果你卡住了，起身離開桌子四處看看。卡牌遊戲比最初看起來更深——牙齒作為貨幣和血液獻祭鏈是高級系統。',
    tip_ja: '事前情報なしでプレイしよう——すべての発見が体験そのものです。小屋フェーズで負けてしまっても（何度か負けるはず）、Leshyが何を言うか、何が変わるかをよく聞いて——負けることもシステムを学ぶ一部。一部の小屋パズルは部屋の中で物を見つける必要がある。詰まったらテーブルを離れて部屋を探索してみよう。カードゲームは見た目以上に奥が深い——歯をコインとして使う仕組みや、血の生け贄チェーンが高度なシステム。',
    tip_ko: '첫 플레이에서 사전 정보 없이 도전하세요 — 모든 발견이 경험 그 자체입니다. 오두막 단계에서 지면 (몇 번 지게 됩니다), Leshy가 뭐라고 하는지, 무엇이 바뀌는지 주목하세요: 실패가 시스템을 배우는 일부입니다. 일부 오두막 퍼즐은 방에서 실물 오브젝트를 찾아야 합니다; 막히면 테이블에서 일어나서 둘러보세요. 카드 게임은 처음 보이는 것보다 훨씬 깊습니다 — 이빨을 통화로 사용하는 것과 혈액 희생 체인이 고급 시스템입니다.',
    tip_de: 'Spiele deine erste Runde ohne Vorkenntnisse — jede Entdeckung ist das Erlebnis. Wenn du im Kabinenabschnitt eine Runde verlierst (du wirst, mehrmals), achte darauf, was Leshy sagt und was sich ändert: Verlieren ist Teil des Systemlernens. Einige Kabinenrätsel erfordern das Finden von physischen Objekten im Raum; wenn du feststeckst, steh vom Tisch auf und schau dich um. Das Kartenspiel ist tiefer als es zunächst erscheint — Zähne als Währung und Blutopfer-Ketten sind die fortgeschrittenen Systeme.',
  },
  forgotten: {
    title_en: 'The Forgotten City',
    title_zh: '被遗忘的城市',
    title_zhTW: '被遺忘的城市',
    title_ja: '忘れられた都市',
    title_ko: '잊혀진 도시',
    title_de: 'The Forgotten City',
    emoji: '🏛️',
    tag_en: 'A Skyrim mod turned standalone game — you are trapped in a time loop in an ancient Roman city where a single sin will kill everyone, and you must solve the mystery using only knowledge from previous loops',
    tag_zh: '一款 Skyrim 模组变成独立游戏——你被困在古罗马城市的时间循环中，单一的罪孽将杀死所有人，你必须仅凭前一次循环的知识解开谜题',
    tag_zhTW: '一款 Skyrim 模組變成獨立遊戲——你被困在古羅馬城市的時間循環中，單一的罪孽將殺死所有人，你必須僅憑前一次循環的知識解開謎題',
    tag_ja: 'Skyrimのモードが独立ゲームに——古代ローマの都市の時間ループに閉じ込められ、誰かひとりが罪を犯せば全員が死ぬ。前のループで得た知識だけを頼りに謎を解く',
    tag_ko: 'Skyrim 모드에서 독립 게임이 된 작품 — 고대 로마 도시의 시간 루프에 갇혀, 단 하나의 죄가 모든 사람을 죽이고, 이전 루프의 지식만으로 미스터리를 풀어야 하는',
    tag_de: 'Ein Skyrim-Mod wurde zum eigenständigen Spiel — du steckst in einer Zeitschleife in einer antiken römischen Stadt, in der eine einzige Sünde alle tötet, und musst das Rätsel nur mit dem Wissen aus vorherigen Schleifen lösen',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, PS5, Xbox, Xbox Game Pass — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Xbox Game Pass——约 25 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Xbox Game Pass——約 25 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Xbox Game Pass——約2,500〜3,000円',
    platform_ko: '이용 가능 플랫폼: PC(Steam), Nintendo Switch, PS4, PS5, Xbox, Xbox Game Pass — 약 25달러',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PS4, PS5, Xbox, Xbox Game Pass — ca. 25 €',
    why_en:
      "The Forgotten City (2021) began as a Skyrim mod that won a Writer's Guild Award before being rebuilt as a standalone game — the only video game to win that award in competition with film and television. You are a time-traveler transported to a mysterious Roman city hidden underground, where 23 people are trapped by an ancient curse: if anyone commits a sin, golden statues awaken and kill everyone. Each time you solve part of the mystery, you reset the loop and use that knowledge — a golden item from this run, a key you know the location of, a conversation that changes an NPC's behavior — to go further in the next. The writing is exceptional: each NPC is a fully realized person with a backstory, and uncovering their secrets (some who are hiding sins, some innocent, some complex) is the game's heart. The mystery has four different endings, and the true ending requires synthesizing everything you learned across all loops. Available on Xbox Game Pass — about 8 hours for a first playthrough, more for completionists.",
    why_zh:
      '被遗忘的城市（2021 年）最初是一个赢得编剧协会奖的 Skyrim 模组，后被重建为独立游戏——唯一一款与电影和电视竞争并赢得该奖项的电子游戏。你是一个被传送到隐藏在地下的神秘罗马城市的时间旅行者，23 个人被古代诅咒困住：如果任何人犯罪，黄金雕像就会苏醒并杀死所有人。每次你解开谜题的一部分，你重置循环并使用知识——这次循环的黄金物品、你知道位置的钥匙、改变 NPC 行为的对话——在下一次循环中走得更远。写作出色：每个 NPC 都是有完整背景故事的人物。Xbox Game Pass 可玩，第一次游玩约 8 小时。',
    why_zhTW:
      '被遺忘的城市（2021年）最初是一個贏得編劇協會獎的 Skyrim 模組，後被重建為獨立遊戲——唯一一款與電影和電視競爭並贏得該獎項的電子遊戲。你是一個被傳送到隱藏在地下的神秘羅馬城市的時間旅行者，23 個人被古代詛咒困住：如果任何人犯罪，黃金雕像就會甦醒並殺死所有人。每次你解開謎題的一部分，你重置循環並使用知識——這次循環的黃金物品、你知道位置的鑰匙、改變 NPC 行為的對話——在下一次循環中走得更遠。寫作出色：每個 NPC 都是有完整背景故事的人物。Xbox Game Pass 可玩，第一次遊玩約 8 小時。',
    why_ja:
      '忘れられた都市（2021年）はもともとSkyrimのMODとして制作され、映画・テレビと競ってライターズギルド賞を受賞した後、スタンドアローンゲームとして作り直されました——映像作品に交じってその賞を受賞した唯一のビデオゲームです。時間旅行者として地下に隠された謎のローマ都市に転送され、23人がある古代の呪いに縛られています：誰かひとりでも罪を犯せば黄金の像が目覚め全員が死ぬ。謎のひとつを解くたびにループをリセットし、その知識——このループで手に入れたアイテム、場所を知っている鍵、NPCの行動を変える会話——を次のループに持ち込んでより深く進んでいきます。ライティングが秀逸で、各NPCは完全な背景を持つ人物として描かれています。Xbox Game Passでプレイ可能、初回プレイは約8時間。',
    why_ko:
      '잊혀진 도시(2021)는 원래 Skyrim 모드로 시작해 작가 조합 상을 받은 후 독립 게임으로 재건되었습니다 — 영화 및 텔레비전과 경쟁해 그 상을 받은 유일한 비디오 게임입니다. 시간 여행자로서 지하에 숨겨진 신비한 로마 도시로 전송되고, 23명이 고대 저주에 갇혀 있습니다: 누군가 죄를 지으면 황금 조각상이 깨어나 모든 사람을 죽입니다. 미스터리의 일부를 풀 때마다 루프를 리셋하고 그 지식 — 이번 루프의 황금 아이템, 위치를 아는 열쇠, NPC 행동을 바꾸는 대화 — 을 활용해 다음 루프에서 더 나아갑니다. 글쓰기가 뛰어나고 각 NPC는 완전한 배경 이야기를 가진 인물입니다. Xbox Game Pass에서 플레이 가능, 첫 플레이 약 8시간.',
    why_de:
      "The Forgotten City (2021) begann als Skyrim-Mod, die einen Writers' Guild Award gewann, bevor sie als eigenständiges Spiel neu aufgebaut wurde — das einzige Videospiel, das diesen Award im Wettbewerb mit Film und Fernsehen gewonnen hat. Als Zeitreisender wirst du in eine mysteriöse römische Stadt unter der Erde versetzt, in der 23 Menschen durch einen alten Fluch festgehalten werden: Wenn jemand eine Sünde begeht, erwachen goldene Statuen und töten alle. Jedes Mal, wenn du einen Teil des Rätsels löst, setzt du die Schleife zurück und nutzt dieses Wissen — ein goldenes Objekt aus diesem Durchlauf, ein Schlüssel, dessen Position du kennst, ein Gespräch, das das Verhalten eines NSC ändert — um im nächsten Durchlauf weiter zu kommen. Das Schreiben ist außergewöhnlich: Jeder NSC ist eine vollständig ausgearbeitete Person mit einer Hintergrundgeschichte. Auf Xbox Game Pass erhältlich, etwa 8 Stunden für einen ersten Durchlauf.",
    tip_en: "Keep a mental (or physical) note of every golden statue you see — their locations tell you who has been killed in previous loops and hint at which characters have sins to hide. The most powerful items from each loop carry forward when you reset; prioritize finding the golden items early. Talk to every NPC multiple times in your first loop even if the dialogue runs out — some conversations only trigger after specific story beats happen elsewhere in the city.",
    tip_zh: '记住（精神上或实物上）你看到的每个黄金雕像——它们的位置告诉你哪些人在之前的循环中被杀，并暗示哪些角色有罪要隐藏。每次循环中最强力的物品在你重置时会保留；优先早期找到黄金物品。第一次循环与每个 NPC 多次对话，即使对话用尽——一些对话只在城市其他地方发生特定剧情点后触发。',
    tip_zhTW: '記住（精神上或實物上）你看到的每個黃金雕像——它們的位置告訴你哪些人在之前的循環中被殺，並暗示哪些角色有罪要隱藏。每次循環中最強力的物品在你重置時會保留；優先早期找到黃金物品。第一次循環與每個 NPC 多次對話，即使對話用盡——一些對話只在城市其他地方發生特定劇情點後觸發。',
    tip_ja: '見かけた黄金の像の場所は（頭の中でも紙でも）メモしておこう——場所から前のループで誰が殺されたかわかり、隠すべき罪がある人物の手がかりにもなります。各ループの最強アイテムはリセット後も持ち越せる。黄金アイテムを序盤に見つけることを優先しよう。最初のループでは会話が尽きても全てのNPCと何度も話すこと——特定のストーリーイベントが街の別の場所で起きた後にしか始まらない会話がある。',
    tip_ko: '보이는 황금 조각상을 (정신적으로든 물리적으로든) 메모하세요 — 위치가 이전 루프에서 누가 죽었는지 알려주고 어떤 캐릭터가 숨길 죄가 있는지 암시합니다. 각 루프에서 가장 강력한 아이템은 리셋할 때 유지됩니다; 황금 아이템을 일찍 찾는 것을 우선시하세요. 첫 루프에서 대화가 끝나도 모든 NPC와 여러 번 대화하세요 — 일부 대화는 도시 다른 곳에서 특정 스토리 이벤트가 일어난 후에만 트리거됩니다.',
    tip_de: 'Halte dir jede goldene Statue, die du siehst, (mental oder physisch) in Erinnerung — ihre Standorte verraten dir, wer in vorherigen Schleifen getötet wurde, und geben Hinweise darauf, welche Charaktere Sünden zu verbergen haben. Die mächtigsten Gegenstände aus jeder Schleife bleiben beim Reset erhalten; priorisiere das frühe Finden der goldenen Gegenstände. Sprich in deiner ersten Schleife mehrmals mit jedem NSC, auch wenn die Dialoge enden — manche Gespräche triggern erst, nachdem an einem anderen Ort in der Stadt bestimmte Handlungsereignisse stattgefunden haben.',
  },
  pentiment: {
    title_en: 'Pentiment',
    title_zh: 'Pentiment',
    title_zhTW: 'Pentiment',
    title_ja: 'Pentiment',
    title_ko: 'Pentiment',
    title_de: 'Pentiment',
    emoji: '📜',
    tag_en: 'A narrative mystery set in a 16th-century Bavarian monastery, illustrated as a living medieval manuscript — your choices determine who is accused of murder and how real lives unfold across three decades',
    tag_zh: '一款设定在 16 世纪巴伐利亚修道院的叙事谜题，以活历史手稿风格绘制——你的选择决定谁被指控谋杀，以及真实生命如何在三十年间展开',
    tag_zhTW: '一款設定在 16 世紀巴伐利亞修道院的敘事謎題，以活歷史手稿風格繪製——你的選擇決定誰被指控謀殺，以及真實生命如何在三十年間展開',
    tag_ja: '16世紀バイエルンの修道院を舞台にした叙事的ミステリー。生きた中世写本として描かれ——あなたの選択が誰が殺人犯とされるかを決め、30年間にわたって実在した人物の人生が展開される',
    tag_ko: '16세기 바이에른 수도원을 배경으로 한 서사 미스터리, 살아있는 중세 필사본 스타일로 그려진 — 당신의 선택이 누가 살인 혐의를 받을지 결정하고 실제 삶이 30년에 걸쳐 펼쳐지는',
    tag_de: 'Ein erzählerisches Mystery-Spiel in einem bayerischen Kloster des 16. Jahrhunderts, illustriert als lebendige mittelalterliche Handschrift — deine Entscheidungen bestimmen, wer des Mordes beschuldigt wird und wie echte Leben über drei Jahrzehnte verlaufen',
    platform_en: 'Available on: PC (Steam, GOG), Xbox, Xbox Game Pass — about $20. Developed by Obsidian Entertainment.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Xbox、Xbox Game Pass——约 20 美元。由 Obsidian Entertainment 开发。',
    platform_zhTW: '可在以下平台取得：PC（Steam、GOG）、Xbox、Xbox Game Pass——約 20 美元。由 Obsidian Entertainment 開發。',
    platform_ja: '対応プラットフォーム：PC（Steam・GOG）、Xbox、Xbox Game Pass——約2,000〜2,500円。Obsidian Entertainment開発。',
    platform_ko: '이용 가능 플랫폼: PC(Steam, GOG), Xbox, Xbox Game Pass — 약 20달러. Obsidian Entertainment 개발.',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), Xbox, Xbox Game Pass — ca. 20 €. Entwickelt von Obsidian Entertainment.',
    why_en:
      "Pentiment (2022) is Obsidian Entertainment's most personal and unusual game — a narrative mystery set in the Bavarian town of Tassing during the Protestant Reformation, illustrated in the style of an illuminated medieval manuscript. You play as Andreas Maler, an itinerant artist completing a Master Work commission at the local monastery, who becomes entangled in a murder investigation. The game spans three acts across 25 years, and your choices in Act One — who you accuse, who you befriend, what you study — cast long shadows into Acts Two and Three as you see the consequences ripple through the town's history. The writing is the game: every character speaks in a dialect appropriate to their education and station, the text itself changes font when different characters speak, and the historical detail (drawn from game director Josh Sawyer's years of research into medieval life) is extraordinary. No combat, no stat systems — pure dialogue, choices, and consequence. Available on Xbox Game Pass. Won multiple awards for narrative and writing in 2022. For players who want their games to feel like great historical fiction.",
    why_zh:
      'Pentiment（2022 年）是 Obsidian Entertainment 最个人化、最不寻常的游戏——一款设定在新教改革期间巴伐利亚小镇 Tassing 的叙事谜题，以彩绘中世纪手稿风格绘制。你扮演漫游艺术家 Andreas Maler，在当地修道院完成一项大师级委托，并卷入谋杀调查。游戏跨越三幕 25 年，你在第一幕的选择——你指控谁、你与谁交好、你研究什么——在第二幕和第三幕中投下长长的阴影，你看到后果在小镇历史中涟漪般扩散。写作就是游戏。Xbox Game Pass 可玩，2022 年获多项叙事和写作奖项。',
    why_zhTW:
      'Pentiment（2022年）是 Obsidian Entertainment 最個人化、最不尋常的遊戲——一款設定在新教改革期間巴伐利亞小鎮 Tassing 的敘事謎題，以彩繪中世紀手稿風格繪製。你扮演漫遊藝術家 Andreas Maler，在當地修道院完成一項大師級委託，並捲入謀殺調查。遊戲跨越三幕 25 年，你在第一幕的選擇——你指控誰、你與誰交好、你研究什麼——在第二幕和第三幕中投下長長的陰影，你看到後果在小鎮歷史中漣漪般擴散。寫作就是遊戲。Xbox Game Pass 可玩，2022 年獲多項敘事和寫作獎項。',
    why_ja:
      'Pentiment（2022年）はObsidian Entertainmentが作った最もパーソナルで異色な作品——宗教改革期のバイエルンの小さな町Tassingを舞台にした叙事的ミステリーで、彩色された中世写本のスタイルで描かれています。修道院で大作の委嘱を受けた旅の画家Andreas Malerとして、殺人事件の調査に巻き込まれていきます。物語は25年にわたる3幕構成で、第1幕の選択——誰を告発するか、誰と仲良くなるか、何を研究するか——が第2・3幕に長い影を落とし、その結果が町の歴史に波紋のように広がっていくのを目撃します。ゲームイコール文章、といえる作品。Xbox Game Passでプレイ可能、2022年に多くの叙事・ライティング賞を受賞。',
    why_ko:
      'Pentiment(2022)은 Obsidian Entertainment의 가장 개인적이고 특이한 게임 — 종교 개혁 기간 바이에른 마을 Tassing을 배경으로 한 서사 미스터리로, 채색된 중세 필사본 스타일로 그려졌습니다. 수도원에서 대작 위탁을 완성하던 여행 예술가 Andreas Maler로서 살인 조사에 얽힙니다. 게임은 25년에 걸친 3막으로 구성되고, 1막의 선택 — 누구를 고발하는지, 누구와 친해지는지, 무엇을 연구하는지 — 가 2막과 3막에 긴 그림자를 드리우며 결과가 마을 역사에 파문처럼 퍼지는 것을 봅니다. 글쓰기가 곧 게임입니다. Xbox Game Pass에서 플레이 가능, 2022년 다수의 서사 및 글쓰기 상 수상.',
    why_de:
      'Pentiment (2022) ist Obsidian Entertainments persönlichstes und ungewöhnlichstes Spiel — ein erzählerisches Mystery, das während der Protestantischen Reformation in der bayerischen Stadt Tassing spielt, illustriert im Stil einer illuminierten mittelalterlichen Handschrift. Du spielst Andreas Maler, einen reisenden Künstler, der in einer lokalen Klosterkirche ein Meisterwerk fertigstellt und in eine Mordermittlung hineingezogen wird. Das Spiel umfasst drei Akte über 25 Jahre, und deine Entscheidungen in Akt Eins — wen du beschuldigst, mit wem du dich anfreundest, was du studierst — werfen lange Schatten in Akt Zwei und Drei, wenn du siehst, wie die Konsequenzen durch die Geschichte der Stadt rippeln. Das Schreiben ist das Spiel. Auf Xbox Game Pass erhältlich, gewann 2022 mehrere Auszeichnungen für Erzählung und Schreiben.',
    tip_en: "Read every book and document Andreas can access in the scriptorium — they seem optional but they change how the murder investigation unfolds and unlock unique dialogue options that closed-off characters respond to. In Act One, who you spend time with matters: the characters you know well are those whose lives you will follow for the next 25 years, so invest in the relationships that interest you most. There is no correct accusation — every possible answer is supported by the evidence, and the game knows this. The point is the choice, not the solution.",
    tip_zh: '阅读 Andreas 在缮写室可以访问的每本书和文件——它们看起来是可选的，但它们改变谋杀调查的进展，并解锁封闭角色会响应的独特对话选项。在第一幕，你花时间与谁在一起很重要：你熟知的角色是你在未来 25 年将跟随其生活的人，所以投资于你最感兴趣的关系。没有正确的指控——每个可能的答案都有证据支持，游戏也知道这一点。重点是选择，而不是解决方案。',
    tip_zhTW: '閱讀 Andreas 在繕寫室可以訪問的每本書和文件——它們看起來是可選的，但它們改變謀殺調查的進展，並解鎖封閉角色會響應的獨特對話選項。在第一幕，你花時間與誰在一起很重要：你熟知的角色是你在未來 25 年將跟隨其生活的人，所以投資於你最感興趣的關係。沒有正確的指控——每個可能的答案都有證據支持，遊戲也知道這一點。重點是選擇，而不是解決方案。',
    tip_ja: 'Andreas が写本室でアクセスできるすべての本と文書を読もう——任意に見えるが、殺人調査の展開が変わり、普段は心を閉ざしているキャラクターが反応するユニークな選択肢が解放されます。第1幕では誰と時間を過ごすかが重要：よく知っているキャラクターが次の25年間その人生を追っていく人物なので、最も興味のある関係に投資しよう。正しい告発なんてない——どの答えにも証拠があり、ゲームもそれを知っている。大切なのは結果ではなく選択そのもの。',
    tip_ko: 'Andreas가 필사실에서 접근할 수 있는 모든 책과 문서를 읽으세요 — 선택적으로 보이지만 살인 조사의 전개를 바꾸고 평소 마음을 닫은 캐릭터가 반응하는 독특한 대화 옵션을 해금합니다. 1막에서는 누구와 시간을 보내는지 중요합니다: 잘 아는 캐릭터들이 앞으로 25년간 삶을 따라갈 사람들이니 가장 관심 있는 관계에 투자하세요. 올바른 고발은 없습니다 — 모든 가능한 답변이 증거로 뒷받침되며 게임도 이를 알고 있습니다. 핵심은 해결책이 아닌 선택입니다.',
    tip_de: 'Lies jedes Buch und Dokument, auf das Andreas im Skriptorium zugreifen kann — sie wirken optional, ändern aber den Verlauf der Mordermittlung und schalten einzigartige Dialogoptionen frei, auf die sonst verschlossene Charaktere reagieren. In Akt Eins kommt es darauf an, mit wem du Zeit verbringst: Die Charaktere, die du gut kennst, sind die, deren Leben du in den nächsten 25 Jahren verfolgen wirst, also investiere in die Beziehungen, die dich am meisten interessieren. Es gibt keine korrekte Anschuldigung — jede mögliche Antwort wird durch Beweise gestützt, und das Spiel weiß das. Der Punkt ist die Wahl, nicht die Lösung.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { hollow: 0, inscryption: 0, forgotten: 0, pentiment: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function DeepThinkGamesQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/deep-think-games-quiz`
    const shareText = getLoc(
      `深度思考游戏推荐测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My deep-think game recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `深度思考遊戲推薦測驗結果：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `深く考えるゲームの診断結果：「${result.title_ja}」！${result.tag_ja}。あなたも試して：${url}`,
      `깊이 생각하는 게임 추천 결과：「${result.title_ko}」！${result.tag_ko}。당신의 결과는：${url}`,
      `Mein Deep-Think-Spielvorschlag: ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`,
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
              {getLoc('入门建议：', 'Getting started: ', '入門建議：', 'はじめる前に：', '시작 전 팁：', 'Erste Schritte: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
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
            '哪款「深度思考」游戏最适合你？',
            'Which Deep-Think Game Is Right for You?',
            '哪款「深度思考」遊戲最適合你？',
            'あなたに合う「深く考えるゲーム」はどれ？',
            '어떤 「깊이 생각하는 게임」이 당신에게 맞나요?',
            'Welches Deep-Think-Spiel passt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从空洞骑士、Inscryption、被遗忘的城市、Pentiment 中找到你的进阶游戏',
            '6 questions to match you with Hollow Knight, Inscryption, The Forgotten City, or Pentiment',
            '6 個問題，從空洞騎士、Inscryption、被遺忘的城市、Pentiment 中找到你的進階遊戲',
            '6つの質問で、ホロウナイト・Inscryption・忘れられた都市・Pentimentからあなたの一本を見つけよう',
            '6가지 질문으로 할로우 나이트, Inscryption, 잊혀진 도시, Pentiment 중 당신의 게임을 찾아보세요',
            '6 Fragen, um dein Spiel aus Hollow Knight, Inscryption, The Forgotten City oder Pentiment zu finden',
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
          '找到我的深度游戏',
          'Find My Deep-Think Game',
          '找到我的深度遊戲',
          '私の深く考えるゲームを見つける',
          '내 깊이 생각하는 게임 찾기',
          'Mein Deep-Think-Spiel finden',
        )}
      </button>
    </div>
  )
}
