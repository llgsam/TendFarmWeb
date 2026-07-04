'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'venba' | 'strange-horticulture' | 'lil-gator' | 'tinykin'

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
    q_en: 'How long do you want this game to be?',
    q_zh: '你希望这款游戏持续多久？',
    q_zhTW: '你希望這款遊戲持續多久？',
    q_ja: 'このゲームにどのくらいの時間をかけたいですか？',
    q_ko: '이 게임이 얼마나 길었으면 하나요?',
    q_de: 'Wie lang soll das Spiel sein?',
    options: [
      {
        en: '90 minutes to 2 hours — a complete, deeply moving experience in a single evening',
        zh: '90 分钟到 2 小时——在单个夜晚内完整且深刻动人的体验',
        zhTW: '90 分鐘到 2 小時——在單個夜晚內完整且深刻動人的體驗',
        ja: '90分〜2時間——1晩で完結する、心に深く刺さる体験',
        ko: '90분에서 2시간 — 하룻밤에 완결되는, 깊이 감동적인 경험',
        de: '90 Minuten bis 2 Stunden — ein komplettes, tief bewegendes Erlebnis an einem Abend',
        type: 'venba',
      },
      {
        en: '4-8 hours — slow, atmospheric, something I return to over several evenings',
        zh: '4-8 小时——缓慢、有氛围感，我会在几个夜晚里分次游玩',
        zhTW: '4-8 小時——緩慢、有氛圍感，我會在幾個夜晚裡分次遊玩',
        ja: '4〜8時間——ゆっくり、雰囲気重視で、何日かに分けて楽しむタイプ',
        ko: '4-8시간 — 천천히, 분위기 있게, 며칠에 나눠 플레이하는 것',
        de: '4-8 Stunden — langsam, atmosphärisch, auf mehrere Abende verteilt',
        type: 'strange-horticulture',
      },
      {
        en: '3-5 hours — joyful and breezy, the kind that makes me smile and then it is done',
        zh: '3-5 小时——愉快轻松，那种让我微笑然后就结束了的体验',
        zhTW: '3-5 小時——愉快輕鬆，那種讓我微笑然後就結束了的體驗',
        ja: '3〜5時間——楽しくてさっぱりした、笑顔で終われるゲーム',
        ko: '3-5시간 — 즐겁고 가볍게, 미소 지으며 끝낼 수 있는 경험',
        de: '3-5 Stunden — fröhlich und leicht, der Typ, der mich lächeln lässt und dann fertig ist',
        type: 'lil-gator',
      },
      {
        en: '8-12 hours — exploring every corner, discovering secrets, collecting with purpose',
        zh: '8-12 小时——探索每个角落，发现秘密，带着目标收集',
        zhTW: '8-12 小時——探索每個角落，發現秘密，帶著目標收集',
        ja: '8〜12時間——隅々まで探索して、秘密を見つけて、目的を持って集める',
        ko: '8-12시간 — 모든 구석을 탐험하고, 비밀을 발견하고, 목적 있게 수집하는 것',
        de: '8-12 Stunden — jeden Winkel erkunden, Geheimnisse entdecken, gezielt sammeln',
        type: 'tinykin',
      },
    ],
  },
  {
    q_en: 'What kind of emotional experience are you looking for?',
    q_zh: '你在寻找什么样的情感体验？',
    q_zhTW: '你在尋找什麼樣的情感體驗？',
    q_ja: 'どんな感情体験を求めていますか？',
    q_ko: '어떤 감정적 경험을 찾고 있나요?',
    q_de: 'Welche Art von emotionalem Erlebnis suchst du?',
    options: [
      {
        en: 'Something that makes me cry in the best way — deep, familial, human',
        zh: '能让我以最好的方式哭出来的东西——深刻的、家庭的、人性的',
        zhTW: '能讓我以最好的方式哭出來的東西——深刻的、家庭的、人性的',
        ja: '最高の意味で泣けるゲーム——家族の絆、人間の深みを感じるもの',
        ko: '최고의 방식으로 울게 만드는 것 — 깊고, 가족적이고, 인간적인',
        de: 'Etwas, das mich auf die beste Weise zum Weinen bringt — tiefgründig, familiär, menschlich',
        type: 'venba',
      },
      {
        en: 'Quiet immersion — a sense of uncovering something hidden in a world with history',
        zh: '安静的沉浸感——在一个有历史的世界中揭露隐藏事物的感觉',
        zhTW: '安靜的沉浸感——在一個有歷史的世界中揭露隱藏事物的感覺',
        ja: '静かな没入感——歴史ある世界で、隠されたものを少しずつ解き明かす感覚',
        ko: '조용한 몰입감 — 역사 있는 세계에서 숨겨진 것을 발견하는 느낌',
        de: 'Stille Immersion — das Gefühl, in einer Welt mit Geschichte verborgene Dinge aufzudecken',
        type: 'strange-horticulture',
      },
      {
        en: 'Pure joy and lightness — I want to feel like a kid playing outside with no worries',
        zh: '纯粹的快乐和轻盈感——我想感觉像个在外面玩耍、无忧无虑的孩子',
        zhTW: '純粹的快樂和輕盈感——我想感覺像個在外面玩耍、無憂無慮的孩子',
        ja: '純粋な楽しさと軽やかさ——外で遊ぶ子供みたいに、何も心配せずにいられる感覚',
        ko: '순수한 기쁨과 가벼움 — 밖에서 뛰노는 아이처럼, 아무 걱정 없이 느끼고 싶은',
        de: 'Reine Freude und Leichtigkeit — ich will mich fühlen wie ein Kind, das draußen spielt, ohne Sorgen',
        type: 'lil-gator',
      },
      {
        en: 'Wonder and discovery — the satisfaction of exploring a miniature world from a tiny perspective',
        zh: '惊奇与发现——从微小视角探索一个缩微世界的满足感',
        zhTW: '驚奇與發現——從微小視角探索一個縮微世界的滿足感',
        ja: '驚きと発見——小さな視点で世界を探索する、あの満足感',
        ko: '경이로움과 발견 — 작은 시각으로 미니어처 세계를 탐험하는 만족감',
        de: 'Staunen und Entdecken — die Befriedigung, eine Miniaturwelt aus winziger Perspektive zu erkunden',
        type: 'tinykin',
      },
    ],
  },
  {
    q_en: 'What is the core activity you most want to do?',
    q_zh: '你最想做的核心活动是什么？',
    q_zhTW: '你最想做的核心活動是什麼？',
    q_ja: '一番やってみたいメインの活動は何ですか？',
    q_ko: '가장 하고 싶은 핵심 활동은 무엇인가요?',
    q_de: 'Was ist die Kernaktivität, die du am liebsten machen möchtest?',
    options: [
      {
        en: 'Reconstruct and cook my mother\'s lost recipes — piece together family memory through food',
        zh: '重建和烹饪我母亲失传的食谱——通过食物拼凑家庭记忆',
        zhTW: '重建和烹飪我母親失傳的食譜——通過食物拼湊家庭記憶',
        ja: 'お母さんの失われたレシピを再現して料理する——食を通じて家族の記憶をつなぎ合わせる',
        ko: '어머니의 잃어버린 레시피를 재현하고 요리하기 — 음식을 통해 가족의 기억을 모아가는 것',
        de: 'Die verlorenen Rezepte meiner Mutter rekonstruieren und kochen — Familienerinnerungen durch Essen zusammensetzen',
        type: 'venba',
      },
      {
        en: 'Identify mysterious plants from botanical books and sell remedies to villagers with problems',
        zh: '从植物学书籍中识别神秘植物，并向有问题的村民出售药方',
        zhTW: '從植物學書籍中識別神秘植物，並向有問題的村民出售藥方',
        ja: '植物図鑑を使って謎の植物を同定し、困っている村人に薬草を売る',
        ko: '식물학 책으로 신비로운 식물을 감별하고, 문제 있는 마을 사람들에게 약을 판매하기',
        de: 'Geheimnisvolle Pflanzen aus botanischen Büchern identifizieren und Heilmittel an Dorfbewohner verkaufen',
        type: 'strange-horticulture',
      },
      {
        en: 'Run around a lake pretending to be on an adventure, making new friends and completing their quests',
        zh: '围着湖边奔跑，假装在冒险，结交新朋友并完成他们的任务',
        zhTW: '圍著湖邊奔跑，假裝在冒險，結交新朋友並完成他們的任務',
        ja: '湖のまわりを走り回って冒険ごっこをして、新しい友達を作ってお願いを叶えてあげる',
        ko: '호수 주위를 뛰어다니며 모험 놀이를 하고, 새 친구를 사귀며 그들의 퀘스트 완수하기',
        de: 'Um einen See rennen und so tun als ob man auf Abenteuer ist, neue Freunde finden und ihre Quests erfüllen',
        type: 'lil-gator',
      },
      {
        en: 'Recruit an army of tiny creatures and use them to solve environmental puzzles as a tiny person',
        zh: '招募一支微型生物军队，作为一个小人用它们解决环境谜题',
        zhTW: '招募一支微型生物軍隊，作為一個小人用它們解決環境謎題',
        ja: '小さな生き物の軍団を率いて、小人として環境パズルを解く',
        ko: '작은 생명체 군대를 모집하고, 작은 사람으로서 그들을 이용해 환경 퍼즐 풀기',
        de: 'Eine Armee winziger Kreaturen rekrutieren und als Winzling Umgebungsrätsel damit lösen',
        type: 'tinykin',
      },
    ],
  },
  {
    q_en: 'What setting sounds most appealing right now?',
    q_zh: '什么样的设定现在对你最有吸引力？',
    q_zhTW: '什麼樣的設定現在對你最有吸引力？',
    q_ja: '今一番惹かれる舞台設定はどれですか？',
    q_ko: '지금 가장 매력적으로 느껴지는 배경은 무엇인가요?',
    q_de: 'Welches Setting klingt gerade am ansprechendsten?',
    options: [
      {
        en: 'A 1980s immigrant family kitchen in Canada — handwritten recipes, Carnatic music, the smell of spices',
        zh: '80 年代加拿大移民家庭的厨房——手写食谱、卡纳塔克音乐、香料的气味',
        zhTW: '80 年代加拿大移民家庭的廚房——手寫食譜、卡納塔克音樂、香料的氣味',
        ja: '1980年代カナダの移民家族のキッチン——手書きのレシピ、カーナーティック音楽、スパイスの香り',
        ko: '1980년대 캐나다 이민 가정의 부엌 — 손으로 쓴 레시피, 카르나틱 음악, 향신료 냄새',
        de: 'Eine Einwandererküche der 1980er in Kanada — handgeschriebene Rezepte, karnatische Musik, der Duft von Gewürzen',
        type: 'venba',
      },
      {
        en: 'A Victorian herbalist shop in a fog-shrouded village full of strange and unexplained occurrences',
        zh: '雾气弥漫的村庄里一家维多利亚时代的草药师店铺，充满奇异和无法解释的事件',
        zhTW: '霧氣瀰漫的村莊裡一家維多利亞時代的草藥師店鋪，充滿奇異和無法解釋的事件',
        ja: '霧に包まれた村のビクトリア朝の薬草師の店——奇妙で説明のつかない出来事が絶えない',
        ko: '안개에 뒤덮인 마을의 빅토리아 시대 약초상 — 기이하고 설명할 수 없는 일들이 가득한',
        de: 'Ein viktorianischer Kräuterladen in einem nebelumhüllten Dorf voller seltsamer und unerklärlicher Ereignisse',
        type: 'strange-horticulture',
      },
      {
        en: 'A sunny lakeside where children play pretend — every quest is imagination dressed up as adventure',
        zh: '阳光明媚的湖边，孩子们在玩假装游戏——每个任务都是想象力装扮成冒险',
        zhTW: '陽光明媚的湖邊，孩子們在玩假裝遊戲——每個任務都是想象力裝扮成冒險',
        ja: '晴れた湖のほとりで子供たちがごっこ遊びをしている——すべてのクエストは想像力が冒険に姿を変えたもの',
        ko: '화창한 호숫가에서 아이들이 가상 놀이를 하는 — 모든 퀘스트가 상상력이 모험으로 변장한 것',
        de: 'Ein sonniger Seeufer, wo Kinder Abenteuer spielen — jede Quest ist Fantasie, die als Abenteuer verkleidet ist',
        type: 'lil-gator',
      },
      {
        en: 'The inside of a house — but you are the size of a thumb, and every room is a continent to cross',
        zh: '一栋房子的内部——但你只有拇指大小，每个房间都是要穿越的大陆',
        zhTW: '一棟房子的內部——但你只有拇指大小，每個房間都是要穿越的大陸',
        ja: '一軒の家の中——でも自分は親指くらいの大きさで、どの部屋も渡るべき大陸',
        ko: '집의 내부 — 하지만 당신은 엄지손가락 크기이고, 모든 방이 건너야 할 대륙',
        de: 'Das Innere eines Hauses — aber du bist daumengross, und jedes Zimmer ist ein Kontinent zu durchqueren',
        type: 'tinykin',
      },
    ],
  },
  {
    q_en: 'How puzzle-focused do you want the gameplay to be?',
    q_zh: '你希望游戏的谜题比重有多高？',
    q_zhTW: '你希望遊戲的謎題比重有多高？',
    q_ja: 'ゲームにパズル要素はどのくらい求めますか？',
    q_ko: '게임플레이에서 퍼즐 비중이 얼마나 되었으면 하나요?',
    q_de: 'Wie viel Rätsel-Fokus soll das Gameplay haben?',
    options: [
      {
        en: 'Gently puzzle-like — the "puzzle" is emotional and narrative, not mechanical',
        zh: '轻微谜题感——"谜题"是情感和叙事性的，而非机制性的',
        zhTW: '輕微謎題感——「謎題」是情感和敘事性的，而非機制性的',
        ja: 'ほんのりパズル感——「謎」は感情と物語の中にあり、メカニカルではない',
        ko: '살짝 퍼즐 느낌 — \'퍼즐\'이 감정적이고 서사적인 것이지, 기계적인 게 아닌',
        de: 'Sanft rätselhaft — das "Rätsel" ist emotional und narrativ, nicht mechanisch',
        type: 'venba',
      },
      {
        en: 'Moderately puzzling — cross-referencing clues and books to identify hidden things',
        zh: '中度谜题感——交叉参考线索和书籍来识别隐藏的事物',
        zhTW: '中度謎題感——交叉參考線索和書籍來識別隱藏的事物',
        ja: '程よいパズル感——手がかりと本を照らし合わせて隠されたものを特定する',
        ko: '중간 정도의 퍼즐 — 단서와 책을 교차 참조해 숨겨진 것들을 알아내는',
        de: 'Mäßig rätselhaft — Hinweise und Bücher gegenprüfen, um verborgene Dinge zu identifizieren',
        type: 'strange-horticulture',
      },
      {
        en: 'Not very puzzle-focused — exploration and meeting characters is the main draw',
        zh: '不太注重谜题——探索和遇见角色是主要吸引力',
        zhTW: '不太注重謎題——探索和遇見角色是主要吸引力',
        ja: 'あまりパズルはいらない——探索とキャラクターとの出会いがメインの楽しみ',
        ko: '퍼즐보다는 탐험 — 탐험과 캐릭터 만남이 주된 매력인 것',
        de: 'Nicht sehr rätselfokussiert — Erkundung und das Treffen von Charakteren ist der Hauptreiz',
        type: 'lil-gator',
      },
      {
        en: 'Physics-based puzzles — using your tiny creatures cleverly to navigate and interact',
        zh: '基于物理的谜题——聪明地使用你的微型生物来导航和互动',
        zhTW: '基於物理的謎題——聰明地使用你的微型生物來導航和互動',
        ja: '物理ベースのパズル——小さな生き物を上手く使って進んで触れ合う',
        ko: '물리 기반 퍼즐 — 작은 생물들을 영리하게 사용해서 탐색하고 상호작용하는',
        de: 'Physikbasierte Rätsel — deine winzigen Kreaturen clever einsetzen, um dich fortzubewegen und zu interagieren',
        type: 'tinykin',
      },
    ],
  },
  {
    q_en: 'What do you want to feel when the game is over?',
    q_zh: '游戏结束时你想有什么感受？',
    q_zhTW: '遊戲結束時你想有什麼感受？',
    q_ja: 'ゲームが終わったときにどんな気持ちでいたいですか？',
    q_ko: '게임이 끝났을 때 어떤 느낌이었으면 하나요?',
    q_de: 'Wie willst du dich fühlen, wenn das Spiel vorbei ist?',
    options: [
      {
        en: 'Like I understood something important about my family, my culture, and the things that get lost',
        zh: '好像我理解了关于我的家庭、我的文化，以及那些被遗忘的事物的某些重要东西',
        zhTW: '好像我理解了關於我的家庭、我的文化，以及那些被遺忘的事物的某些重要東西',
        ja: '自分の家族、自分の文化、そして失われてしまったものについて、大切なことを理解できた気がした',
        ko: '내 가족, 내 문화, 그리고 잊혀진 것들에 대해 중요한 무언가를 이해한 것 같은 느낌',
        de: 'Als hätte ich etwas Wichtiges über meine Familie, meine Kultur und das verstanden, was verloren geht',
        type: 'venba',
      },
      {
        en: 'Like I uncovered the truth behind something mysterious that was never fully explained',
        zh: '好像我揭开了某个从未完全解释过的神秘事物背后的真相',
        zhTW: '好像我揭開了某個從未完全解釋過的神秘事物背後的真相',
        ja: '決して完全には説明されなかった謎の裏側にある真実を解き明かせた、という感覚',
        ko: '완전히 설명된 적 없었던 신비로운 무언가의 진실을 밝혀낸 것 같은 느낌',
        de: 'Als hätte ich die Wahrheit hinter etwas Geheimnisvollem aufgedeckt, das nie vollständig erklärt wurde',
        type: 'strange-horticulture',
      },
      {
        en: 'Like I just had the best Saturday of childhood — warm, light, completely satisfied',
        zh: '好像我刚刚度过了童年最美好的一个周六——温暖、轻盈、完全满足',
        zhTW: '好像我剛剛度過了童年最美好的一個週六——溫暖、輕盈、完全滿足',
        ja: '子供のころの最高の土曜日を過ごしたみたいな——温かくて、軽やかで、完全に満たされた気持ち',
        ko: '어린 시절 최고의 토요일을 보낸 것 같은 — 따뜻하고, 가볍고, 완전히 만족스러운',
        de: 'Als hätte ich gerade den besten Samstag der Kindheit erlebt — warm, leicht, vollkommen zufrieden',
        type: 'lil-gator',
      },
      {
        en: 'Like I explored every inch of a miniature world and understood it completely',
        zh: '好像我探索了一个微型世界的每一寸，并完全理解了它',
        zhTW: '好像我探索了一個微型世界的每一寸，並完全理解了它',
        ja: 'ミニチュアの世界の隅々まで探索して、完全に理解しきった、そんな達成感',
        ko: '미니어처 세계의 구석구석을 탐험하고 완전히 이해한 것 같은 느낌',
        de: 'Als hätte ich jeden Zentimeter einer Miniaturwelt erkundet und sie vollständig verstanden',
        type: 'tinykin',
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
  venba: {
    title_en: 'Venba',
    title_zh: 'Venba',
    title_zhTW: 'Venba',
    title_ja: 'Venba',
    title_ko: 'Venba',
    title_de: 'Venba',
    emoji: '🍲',
    tag_en: 'A 90-minute cooking narrative game about an Indian immigrant family and the recipes that hold memory',
    tag_zh: '90 分钟烹饪叙事游戏，关于一个印度移民家庭和承载记忆的食谱',
    tag_zhTW: '90 分鐘烹飪敘事遊戲，關於一個印度移民家庭和承載記憶的食譜',
    tag_ja: '90分の料理ナラティブゲーム——インドの移民家族と、記憶を宿すレシピの物語',
    tag_ko: '90분 요리 내러티브 게임, 인도 이민 가족과 기억을 담은 레시피에 관한 이야기',
    tag_de: 'Ein 90-minütiges Koch-Narrative-Spiel über eine indische Einwandererfamilie und die Rezepte, die Erinnerungen tragen',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox, iOS — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox、iOS——约 15 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox、iOS——約 15 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox、iOS — 約1,800円',
    platform_ko: '플랫폼: PC(Steam), Nintendo Switch, PlayStation 4/5, Xbox, iOS — 약 20,000원',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox, iOS — ca. 15 €',
    why_en:
      "Venba (2023) is one of the most emotionally resonant games made in recent years — a 90-minute cooking narrative about Venba, an Indian woman who immigrates to Canada in the 1980s with her husband Paavalan, and their son Kavin who grows up between two cultures. The core gameplay is reconstructing Venba's mother's lost cookbook: pages are damaged or missing, and you figure out the right ingredients and steps by reading context clues. Each dish unlocks a vignette of family life. The game spans decades, following the family through joy, distance, and the quiet grief of cultural disconnection. The Tamil music, the specific food (sambar, kozhukattai, adai), the handwritten notes in the cookbook — every detail is specific and earned. It costs about $15 and takes 90 minutes to 2 hours. One of the most talked-about indie games of 2023. Has been described as 'a meal that fills you with warmth and then breaks your heart, in the best way.' Strongly recommended if you have ever felt the gap between the world you came from and the world you live in.",
    why_zh:
      'Venba（2023 年）是近年来情感共鸣最强的游戏之一——一款 90 分钟的烹饪叙事游戏，讲述 Venba，一位 80 年代移民到加拿大的印度女性，与她的丈夫 Paavalan 和在两种文化之间成长的儿子 Kavin 的故事。核心游戏玩法是重建 Venba 母亲失传的食谱本：页面受损或缺失，你通过阅读上下文线索来弄清楚正确的食材和步骤。每道菜都解锁一段家庭生活小品。游戏跨越几十年，追随这家人经历欢乐、距离和文化断裂的安静悲伤。泰米尔音乐、特定的食物（桑巴尔、科祖卡泰、阿代）、食谱本中的手写笔记——每个细节都是具体的、经过打磨的。它售价约 15 美元，需要 90 分钟到 2 小时。2023 年最受讨论的独立游戏之一。被描述为"一顿用温暖填满你然后以最好的方式让你心碎的饭"。如果你曾经感受过你来自的世界和你生活的世界之间的隔阂，强烈推荐。',
    why_zhTW:
      'Venba（2023 年）是近年來情感共鳴最強的遊戲之一——一款 90 分鐘的烹飪敘事遊戲，講述 Venba，一位 80 年代移民到加拿大的印度女性，與她的丈夫 Paavalan 和在兩種文化之間成長的兒子 Kavin 的故事。核心遊戲玩法是重建 Venba 母親失傳的食譜本：頁面受損或缺失，你通過閱讀上下文線索來找出正確的食材和步驟。每道菜都解鎖一段家庭生活小品。遊戲跨越幾十年，追隨這家人經歷歡樂、疏離和文化斷裂的安靜悲傷。泰米爾音樂、特定的食物（桑巴爾、科祖卡泰、阿代）、食譜本中的手寫筆記——每個細節都是具體的、精心打磨的。售價約 15 美元，需要 90 分鐘到 2 小時。2023 年最受討論的獨立遊戲之一。被描述為「一頓用溫暖填滿你然後以最好的方式讓你心碎的飯」。如果你曾感受過來自的世界和生活的世界之間的隔閡，強烈推薦。',
    why_ja:
      'Venba（2023年）は近年で最も感情に響くゲームのひとつです——90分の料理ナラティブゲームで、1980年代にカナダへ移民したインド人女性・Venbaと、夫のPaavalan、そして二つの文化の間で育った息子・Kavinの物語を描きます。中心となる遊びは、Venbaの母が残した料理本の失われたレシピを再現すること。ページが破れていたり欠けていたりするので、周囲の手紙や家族のメモを読み解きながら、正しい食材と手順を推理します。料理をひとつ完成させるたびに、家族の日常の一場面が解き放たれます。ゲームは数十年にわたる時間軸を辿り、喜びと疎遠、そして文化的な断絶という静かな悲しみを経験します。タミル語の音楽、サンバルやコジュカッタイ、アダイといった食事、食料本に残された手書きの走り書き——すべての細部に意味があり、丁寧に作られています。価格は約1,800円で、プレイ時間は90分〜2時間。2023年のインディーゲームの中でも特に語られた一作です。「温かさで満たされ、最高の意味で心が壊れる一食」と表現されます。故郷と今いる場所の間で何かを感じたことがある人に、強くお勧めします。',
    why_ko:
      'Venba（2023）는 최근 몇 년 사이 나온 게임 중 감정적 울림이 가장 강한 작품 중 하나입니다. 1980년대 캐나다로 이민 온 인도 여성 Venba와 남편 Paavalan, 두 문화 사이에서 자란 아들 Kavin의 이야기를 담은 90분짜리 요리 내러티브 게임이에요. 핵심 게임플레이는 Venba의 어머니가 남긴 잃어버린 요리책을 복원하는 것입니다. 페이지가 손상되거나 빠져 있어, 주변의 가족 편지와 메모를 읽으며 올바른 재료와 순서를 추론해야 해요. 요리를 완성할 때마다 가족 일상의 한 장면이 펼쳐집니다. 게임은 수십 년에 걸친 시간을 따라가며, 기쁨과 거리감, 문화적 단절이라는 조용한 슬픔을 경험하게 합니다. 타밀 음악, 삼바르·코주카타이·아다이 같은 음식, 요리책 속 손으로 쓴 메모——모든 세부 사항이 구체적이고 정성스럽게 담겨 있습니다. 가격은 약 2만 원이고 플레이 시간은 90분에서 2시간. 2023년 인디 게임 중 가장 많이 회자된 작품 중 하나입니다. "따뜻함으로 채워주다가 최고의 방식으로 마음을 부수는 한 끼"라고 표현되기도 합니다. 자신이 온 세계와 지금 사는 세계 사이의 간극을 느껴본 적 있다면 강력히 추천합니다.',
    why_de:
      'Venba (2023) ist eines der emotional eindringlichsten Spiele der letzten Jahre — ein 90-minütiges Koch-Narrative-Spiel über Venba, eine indische Frau, die in den 1980ern mit ihrem Mann Paavalan nach Kanada einwandert, und ihren Sohn Kavin, der zwischen zwei Kulturen aufwächst. Das Kerngameplay besteht darin, Venbas verlorenes Kochbuch ihrer Mutter zu rekonstruieren: Seiten sind beschädigt oder fehlen, und man muss durch Kontexthinweise die richtigen Zutaten und Schritte herausfinden. Jedes fertige Gericht schaltet eine Vignette aus dem Familienleben frei. Das Spiel erstreckt sich über Jahrzehnte und begleitet die Familie durch Freude, Distanz und die stille Trauer der kulturellen Entfremdung. Die tamilische Musik, die spezifischen Speisen (Sambar, Kozhukattai, Adai), die handgeschriebenen Notizen im Kochbuch — jedes Detail ist konkret und sorgfältig gestaltet. Es kostet etwa 15 € und dauert 90 Minuten bis 2 Stunden. Eines der meistdiskutierten Indie-Spiele von 2023. Es wurde beschrieben als "eine Mahlzeit, die dich mit Wärme füllt und dann auf die beste Weise dein Herz bricht". Sehr empfehlenswert, wenn du jemals die Kluft zwischen der Welt, aus der du kommst, und der Welt, in der du lebst, gespürt hast.',
    tip_en: "Pay close attention to the text around the damaged recipe pages — the clues for missing ingredients are always embedded in the surrounding family notes and letters.",
    tip_zh: '密切关注受损食谱页面周围的文字——缺失食材的线索总是嵌入在周围的家庭笔记和信件中。',
    tip_zhTW: '密切關注受損食譜頁面周圍的文字——缺失食材的線索總是嵌入在周圍的家庭筆記和信件中。',
    tip_ja: '破損したレシピページの周囲にある文章に注目して——欠けている食材のヒントは、必ず周りの家族のメモや手紙に隠されています。',
    tip_ko: '손상된 레시피 페이지 주변의 텍스트에 주의를 기울이세요 — 빠진 재료의 단서는 항상 주변 가족 메모와 편지 속에 담겨 있습니다.',
    tip_de: 'Achte genau auf den Text rund um die beschädigten Rezeptseiten — die Hinweise auf fehlende Zutaten sind immer in den umliegenden Familiennotizen und Briefen eingebettet.',
  },
  'strange-horticulture': {
    title_en: 'Strange Horticulture',
    title_zh: '奇异园艺',
    title_zhTW: '奇異園藝',
    title_ja: 'ストレンジ・ホーティカルチャー',
    title_ko: '스트레인지 호티컬처',
    title_de: 'Strange Horticulture',
    emoji: '🌿',
    tag_en: 'A Victorian herbalist mystery where you identify plants from botanical books and serve a fog-shrouded village',
    tag_zh: '维多利亚时代草药师谜题，你从植物学书籍识别草药，为薄雾中的村庄提供服务',
    tag_zhTW: '維多利亞時代草藥師謎題，你從植物學書籍識別草藥，為薄霧中的村莊提供服務',
    tag_ja: 'ビクトリア朝の薬草師ミステリー——植物図鑑で薬草を鑑定し、霧に包まれた村を助ける',
    tag_ko: '빅토리아 시대 약초상 미스터리, 식물학 책으로 약초를 감별하고 안개 낀 마을을 돕는 게임',
    tag_de: 'Ein viktorianisches Kräutler-Mysterium, in dem du Pflanzen aus botanischen Büchern identifizierst und einem nebelumhüllten Dorf dienst',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch — about $13',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch——约 13 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、GOG）、Nintendo Switch——約 13 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、GOG）、Nintendo Switch — 約1,500円',
    platform_ko: '플랫폼: PC(Steam, GOG), Nintendo Switch — 약 17,000원',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), Nintendo Switch — ca. 13 €',
    why_en:
      "Strange Horticulture (2022) is one of the most atmospheric puzzle games made in recent years. You inherit a herbalist shop in a fog-shrouded Victorian village called Undermere. Customers come in with problems — an illness, a strange request, a mystery — and you must identify the correct plant from your collection by cross-referencing botanical books, field journals, and maps. The identification mechanic is satisfying and tactile: you look at the plant's properties, consult your reference books, and make a judgment. The village has an unfolding mystery around a local cult, and your choices about who receives which plant can affect the story's outcome. The visual aesthetic is beautiful — warm candlelight, hand-drawn maps, aged paper textures. At 4-8 hours it takes longer than most short cozy games but rewards careful, unhurried play. One of the best discovery-type cozy games that rarely appears in 'best cozy games' lists despite being genuinely excellent.",
    why_zh:
      '奇异园艺（2022 年）是近年来氛围感最强的谜题游戏之一。你在一个叫做 Undermere 的薄雾维多利亚村庄里继承了一家草药师店铺。顾客带着问题前来——一种疾病、一个奇怪的请求、一个谜题——你必须通过交叉参考植物学书籍、田野日志和地图来从你的收藏中识别正确的植物。识别机制令人满足且触感真实：你查看植物的属性，查阅参考书籍，做出判断。这个村庄围绕着一个当地邪教展开了一个未解谜题，你关于谁获得哪种植物的选择会影响故事的结局。视觉美学很美——温暖的烛光、手绘地图、陈旧的纸张质感。4-8 小时的时长比大多数短篇 cozy 游戏更长，但能够奖励仔细、从容的游玩方式。尽管真正出色，却很少出现在"最佳 cozy 游戏"列表中的最佳发现型 cozy 游戏之一。',
    why_zhTW:
      '奇異園藝（2022 年）是近年來氛圍感最強的謎題遊戲之一。你在一個叫做 Undermere 的薄霧維多利亞村莊裡繼承了一家草藥師店鋪。顧客帶著問題前來——一種疾病、一個奇怪的請求、一個謎題——你必須通過交叉參考植物學書籍、田野日誌和地圖來從你的收藏中識別正確的植物。識別機制令人滿足且觸感真實：你查看植物的屬性，查閱參考書籍，做出判斷。這個村莊圍繞著一個當地邪教展開了一個未解謎題，你關於誰獲得哪種植物的選擇會影響故事的結局。視覺美學很美——溫暖的燭光、手繪地圖、陳舊的紙張質感。4-8 小時的時長比大多數短篇 cozy 遊戲更長，但能夠獎勵仔細、從容的遊玩方式。儘管真正出色，卻很少出現在「最佳 cozy 遊戲」列表中的最佳發現型 cozy 遊戲之一。',
    why_ja:
      'ストレンジ・ホーティカルチャー（2022年）は近年で最も雰囲気のあるパズルゲームのひとつです。霧に包まれたビクトリア朝の村「アンダーミア」で薬草師の店を継ぎます。客たちは病気、奇妙な依頼、謎を抱えてやってきます。植物図鑑、フィールドノート、地図を照らし合わせながら、コレクションの中から正しい植物を見つけ出します。この鑑定のしくみがとても心地よい——植物の特徴を確かめ、参考書を調べ、自分で判断する。村では地元のカルトを巡る謎が少しずつ明らかになり、誰にどの植物を渡すかの選択がストーリーの結末を変えます。ビジュアルは美しく、温かなろうそくの光、手描きの地図、古びた紙の質感が印象的です。4〜8時間とほかの短いコージーゲームより少し長めですが、じっくり焦らず遊ぶほど報われます。「最高のコージーゲーム」リストにはあまり登場しませんが、本当に素晴らしい発見系コージーゲームの傑作です。',
    why_ko:
      '스트레인지 호티컬처（2022）는 최근 몇 년 사이 나온 게임 중 분위기가 가장 뛰어난 퍼즐 게임 중 하나입니다. 안개에 뒤덮인 빅토리아 시대 마을 \'언더미어\'에서 약초상 가게를 물려받게 됩니다. 손님들은 병, 이상한 부탁, 미스터리를 안고 찾아오고, 식물학 책과 현장 일지, 지도를 교차 참조해 컬렉션에서 올바른 식물을 찾아내야 합니다. 감별 메커니즘이 정말 만족스럽습니다. 식물의 속성을 확인하고, 참고 서적을 찾아보고, 스스로 판단을 내리는 과정이 아날로그적이고 차분해요. 마을에는 지역 컬트를 둘러싼 미스터리가 서서히 드러나고, 누구에게 어떤 식물을 주느냐에 따라 이야기 결말이 달라집니다. 비주얼이 아름답습니다 — 따뜻한 촛불, 손으로 그린 지도, 낡은 종이 질감. 4-8시간으로 대부분의 짧은 코지 게임보다 길지만, 차분하게 천천히 플레이할수록 보람을 느낄 수 있어요. \'최고의 코지 게임\' 목록에는 잘 등장하지 않지만 진짜 훌륭한 발견형 코지 게임입니다.',
    why_de:
      'Strange Horticulture (2022) ist eines der atmosphärischsten Puzzle-Spiele der letzten Jahre. Du erbst einen Kräuterladen in einem nebelumhüllten viktorianischen Dorf namens Undermere. Kunden kommen mit Problemen — eine Krankheit, eine seltsame Bitte, ein Rätsel — und du musst die richtige Pflanze aus deiner Sammlung identifizieren, indem du botanische Bücher, Feldtagebücher und Karten gegenprüfst. Die Identifizierungsmechanik ist befriedigend und haptisch: Du siehst dir die Eigenschaften der Pflanze an, schlägst in Referenzbüchern nach und triffst eine Entscheidung. Das Dorf hat ein sich entfaltendes Geheimnis um einen lokalen Kult, und deine Entscheidungen darüber, wer welche Pflanze bekommt, können das Ergebnis der Geschichte beeinflussen. Die visuelle Ästhetik ist wunderschön — warmes Kerzenlicht, handgezeichnete Karten, vergilbte Papierstrukturen. Mit 4-8 Stunden dauert es länger als die meisten kurzen Cozy-Spiele, belohnt aber geduldiges, entspanntes Spielen. Eines der besten Entdeckungs-Cozy-Spiele, das trotz seiner Qualität selten in "beste Cozy-Spiele"-Listen auftaucht.',
    tip_en: "Use the map to track where your customers say they found plants or where events occurred — the geographic clues are as important as the botanical ones for solving the larger mystery.",
    tip_zh: '使用地图追踪你的顾客说他们在哪里发现植物或事件发生在哪里——地理线索与植物学线索对解决更大谜题同样重要。',
    tip_zhTW: '使用地圖追蹤你的顧客說他們在哪裡發現植物或事件發生在哪裡——地理線索與植物學線索對解決更大謎題同樣重要。',
    tip_ja: '客が植物を見つけた場所や出来事が起きた場所を地図で追跡しよう——地理的な手がかりは植物学的な手がかりと同じくらい、大きな謎を解く鍵になります。',
    tip_ko: '손님들이 식물을 발견했다거나 사건이 일어났다고 말하는 장소를 지도로 추적하세요 — 지리적 단서가 식물학적 단서만큼 큰 미스터리를 푸는 데 중요합니다.',
    tip_de: 'Nutze die Karte, um zu verfolgen, wo deine Kunden sagen, sie haben Pflanzen gefunden oder wo Ereignisse stattfanden — die geografischen Hinweise sind genauso wichtig wie die botanischen, um das größere Rätsel zu lösen.',
  },
  'lil-gator': {
    title_en: 'Lil Gator Game',
    title_zh: '小鳄鱼游戏',
    title_zhTW: '小鱷魚遊戲',
    title_ja: 'リル・ゲーター・ゲーム',
    title_ko: '릴 게이터 게임',
    title_de: 'Lil Gator Game',
    emoji: '🐊',
    tag_en: 'A 3-hour cozy adventure about being a small child playing pretend at a lake — pure warmth',
    tag_zh: '3 小时 cozy 冒险游戏，关于一个小孩在湖边玩假装游戏——纯粹的温暖',
    tag_zhTW: '3 小時 cozy 冒險遊戲，關於一個小孩在湖邊玩假裝遊戲——純粹的溫暖',
    tag_ja: '3時間のコージーアドベンチャー——湖のほとりで子供がごっこ遊びをする、純粋な温かさ',
    tag_ko: '3시간짜리 코지 어드벤처, 작은 아이가 호숫가에서 모험 놀이를 하는 — 순수한 따뜻함',
    tag_de: 'Ein 3-stündiges gemütliches Abenteuer über ein kleines Kind, das am See Abenteuer spielt — pure Wärme',
    platform_en: 'Available on: PC (Steam), Nintendo Switch — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch——约 15 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch——約 15 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch — 約1,800円',
    platform_ko: '플랫폼: PC(Steam), Nintendo Switch — 약 20,000원',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch — ca. 15 €',
    why_en:
      "Lil Gator Game (2022) is one of the most consistently cheerful games ever made. You play as a small alligator who wants to go on an adventure with their big sister, but she is busy studying. So you gather the neighborhood kids and play pretend — every quest is a childhood imagination game, every 'enemy' is a cardboard box, every 'dungeon' is a playground structure. The movement feels wonderful: you can run, glide with your arms, slide down hills, and swing. The characters you meet all have charming personality and the game never lets you be sad for more than a moment. At 3-4 hours, it is a complete experience that begins and ends with warmth. The art style is lo-fi and colorful. One of the best games for adults who want to remember what pure play felt like, or for playing with a child. The game handles the theme of a sibling being too busy to play with great subtlety and care.",
    why_zh:
      '小鳄鱼游戏（2022 年）是有史以来最始终如一地充满欢乐的游戏之一。你扮演一只想要和姐姐一起冒险的小鳄鱼，但她正忙于学习。所以你聚集了邻居的孩子们一起玩假装游戏——每个任务都是儿时的想象力游戏，每个"敌人"都是纸板箱，每个"地下城"都是游乐场设施。移动感觉很棒：你可以跑步、张开手臂滑翔、滑下山坡和荡秋千。你遇到的角色都有迷人的个性，游戏从不让你难过超过一刻钟。3-4 小时，这是一个以温暖开始和结束的完整体验。美术风格低保真而多彩。对于想要记得纯粹游戏感觉的成年人，或者与孩子一起玩，这是最好的游戏之一。这款游戏以极大的微妙和关怀处理了哥哥姐姐太忙没时间陪玩的主题。',
    why_zhTW:
      '小鱷魚遊戲（2022 年）是有史以來最始終如一地充滿歡樂的遊戲之一。你扮演一隻想要和姐姐一起冒險的小鱷魚，但她正忙於學習。所以你聚集了鄰居的孩子們一起玩假裝遊戲——每個任務都是兒時的想象力遊戲，每個「敵人」都是紙板箱，每個「地下城」都是遊樂場設施。移動感覺很棒：你可以跑步、張開手臂滑翔、滑下山坡和盪秋千。你遇到的角色都有迷人的個性，遊戲從不讓你難過超過一刻鐘。3-4 小時，這是一個以溫暖開始和結束的完整體驗。美術風格低保真而多彩。對於想要記得純粹遊戲感覺的成年人，或者與孩子一起玩，這是最好的遊戲之一。這款遊戲以極大的微妙和關懷處理了哥哥姐姐太忙沒時間陪玩的主題。',
    why_ja:
      'リル・ゲーター・ゲーム（2022年）は、これまで作られた中で最も一貫して楽しいゲームのひとつです。お姉ちゃんと一緒に冒険したい小さなワニを操作しますが、彼女は勉強で忙しい。そこで近所の子たちを集め、みんなでごっこ遊びを始めます——クエストはすべて子どもの想像の中の遊び、「敵」はダンボール箱、「ダンジョン」は公園の遊具。動きが気持ちよくて、走ったり、両手を広げて滑空したり、坂を滑り降りたり、ブランコができます。出会うキャラクターたちはみんな個性的でかわいく、暗い気持ちが続く場面はほとんどありません。3〜4時間で温かく始まり温かく終わる、完結した体験です。アートスタイルはローファイでカラフル。大人が純粋な「遊ぶ喜び」を思い出したいときや、子供と一緒に遊ぶのに最適なゲームのひとつ。お兄ちゃんやお姉ちゃんが忙しくて一緒に遊べないというテーマを、とても繊細に丁寧に描いています。',
    why_ko:
      '릴 게이터 게임（2022）은 지금껏 만들어진 게임 중 가장 일관되게 유쾌한 게임 중 하나입니다. 언니와 함께 모험을 떠나고 싶은 작은 악어를 플레이하지만, 언니는 공부로 바쁩니다. 그래서 동네 아이들을 모아 함께 가상 놀이를 시작합니다 — 모든 퀘스트는 어린 시절의 상상 놀이이고, \'적\'은 골판지 상자이며, \'던전\'은 놀이터 시설이에요. 이동감이 정말 좋습니다. 달리고, 팔을 펼쳐 활공하고, 언덕을 미끄러져 내려오고, 그네를 탈 수 있어요. 만나는 캐릭터들은 모두 매력적이고, 게임은 잠깐이라도 슬프게 두지 않습니다. 3-4시간으로, 따뜻하게 시작해서 따뜻하게 끝나는 완결된 경험입니다. 아트 스타일은 로파이하고 다채롭습니다. 순수하게 노는 기쁨을 기억하고 싶은 어른이나, 아이와 함께 플레이하기에 최고의 게임 중 하나입니다. 오빠나 언니가 너무 바빠서 함께 놀 수 없다는 주제를 정말 세심하고 따뜻하게 다루고 있어요.',
    why_de:
      'Lil Gator Game (2022) ist eines der durchgängig fröhlichsten Spiele, die je gemacht wurden. Du spielst als kleiner Alligator, der mit seiner großen Schwester auf Abenteuer gehen möchte, aber sie ist beschäftigt mit Lernen. Also sammelst du die Nachbarschaftskinder und spielt zusammen so als ob — jede Quest ist ein Kindheitsfantasiespiel, jeder "Feind" ist ein Pappkarton, jeder "Dungeon" ist eine Spielplatzstruktur. Die Bewegung fühlt sich wunderbar an: Du kannst rennen, mit ausgestreckten Armen gleiten, Hügel hinunterrutschen und schaukeln. Die Charaktere, die du triffst, haben alle charmante Persönlichkeiten und das Spiel lässt dich nie länger als einen Moment traurig sein. Mit 3-4 Stunden ist es ein komplettes Erlebnis, das mit Wärme beginnt und endet. Der Kunststil ist lo-fi und farbenfroh. Eines der besten Spiele für Erwachsene, die sich erinnern wollen, wie reines Spielen sich anfühlte, oder zum Spielen mit einem Kind. Das Spiel behandelt das Thema, dass ein Geschwisterkind zu beschäftigt ist, mit großer Feinfühligkeit und Fürsorge.',
    tip_en: "Try every movement ability on every terrain type — the glide, slide, and swing all have secret shortcuts through each area that make replaying feel completely different.",
    tip_zh: '在每种地形类型上尝试每种移动能力——滑翔、滑行和荡秋千都有穿越每个区域的秘密捷径，使重玩感觉完全不同。',
    tip_zhTW: '在每種地形類型上嘗試每種移動能力——滑翔、滑行和盪秋千都有穿越每個區域的秘密捷徑，使重玩感覺完全不同。',
    tip_ja: 'すべての地形で移動アクションをひととおり試してみよう——滑空、スライド、ブランコには各エリアを通り抜ける隠しルートがあって、2周目が全然違う感覚になります。',
    tip_ko: '모든 지형에서 모든 이동 능력을 시험해보세요 — 활공, 슬라이드, 그네 타기 모두 각 구역을 가로지르는 비밀 지름길이 있어서, 재플레이 시 완전히 다른 느낌을 줍니다.',
    tip_de: 'Probiere jede Bewegungsfähigkeit auf jeder Geländeart aus — Gleiten, Rutschen und Schaukeln haben alle geheime Abkürzungen durch jeden Bereich, die sich beim erneuten Spielen völlig anders anfühlen.',
  },
  tinykin: {
    title_en: 'Tinykin',
    title_zh: 'Tinykin',
    title_zhTW: 'Tinykin',
    title_ja: 'タイニーキン',
    title_ko: '타이니킨',
    title_de: 'Tinykin',
    emoji: '🔬',
    tag_en: 'A Pikmin-style adventure where you are thumb-sized and explore a single house as a vast alien world',
    tag_zh: '皮克敏风格冒险，你只有拇指大小，将一栋普通房屋作为广阔的异星世界探索',
    tag_zhTW: '皮克敏風格冒險，你只有拇指大小，將一棟普通房屋作為廣闊的異星世界探索',
    tag_ja: 'ピクミン風アドベンチャー——親指サイズになって、普通の家を広大な異星世界として探索する',
    tag_ko: '피크민 스타일 어드벤처, 엄지손가락 크기가 되어 평범한 집을 광활한 외계 세계로 탐험하는',
    tag_de: 'Ein Pikmin-artiges Abenteuer, in dem du Daumen-groß bist und ein gewöhnliches Haus als riesige Fremdwelt erkundest',
    platform_en: 'Available on: PC (Steam, GOG, Epic), Nintendo Switch, PlayStation 4/5, Xbox — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG、Epic）、Nintendo Switch、PlayStation 4/5、Xbox——约 20 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、GOG、Epic）、Nintendo Switch、PlayStation 4/5、Xbox——約 20 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、GOG、Epic）、Nintendo Switch、PlayStation 4/5、Xbox — 約2,500円',
    platform_ko: '플랫폼: PC(Steam, GOG, Epic), Nintendo Switch, PlayStation 4/5, Xbox — 약 25,000원',
    platform_de: 'Erhältlich auf: PC (Steam, GOG, Epic), Nintendo Switch, PlayStation 4/5, Xbox — ca. 20 €',
    why_en:
      "Tinykin (2022) is one of the most overlooked cozy games of recent years. You play as Milo, a space explorer who lands on Earth but is shrunk to thumbnail size. The game takes place entirely inside one suburban house — but at Milo's scale, the kitchen is a continent, the bathroom is an ocean, and the living room is a kingdom. You recruit an army of tiny creatures called Tinykin, each with different abilities: some can form bridges, some can carry heavy objects, some can explode walls. The core loop is using Tinykin creatively to solve puzzles and explore each room. The level design is exceptional — each room has intricate hidden paths, collectibles in unexpected places, and communities of insect-sized people with their own culture. At 8-12 hours it is a complete exploration experience. Often described as 'Pikmin meets Honey I Shrunk the Kids,' but Tinykin is warmer, more cozy, and less stressful than Pikmin's time-pressure mechanics. Available on most platforms.",
    why_zh:
      'Tinykin（2022 年）是近年来最被低估的 cozy 游戏之一。你扮演宇宙探索者米洛，他降落在地球后被缩小到拇指大小。游戏完全发生在一栋郊区房屋内部——但以米洛的体型，厨房是一片大陆，浴室是一片海洋，客厅是一个王国。你招募一支叫做 Tinykin 的微型生物军队，每种都有不同能力：一些可以形成桥梁，一些可以搬运重物，一些可以炸开墙壁。核心循环是创造性地使用 Tinykin 解决谜题和探索每个房间。关卡设计非常出色——每个房间都有错综复杂的隐藏路径、意想不到的收藏品，以及拥有自己文化的昆虫大小的人类社区。8-12 小时，这是一个完整的探索体验。常被描述为"皮克敏遇见缩小奇兵"，但 Tinykin 比皮克敏的时间压力机制更温暖、更 cozy、压力更小。可在大多数平台上获取。',
    why_zhTW:
      'Tinykin（2022 年）是近年來最被低估的 cozy 遊戲之一。你扮演宇宙探索者米洛，他降落在地球後被縮小到拇指大小。遊戲完全發生在一棟郊區房屋內部——但以米洛的體型，廚房是一片大陸，浴室是一片海洋，客廳是一個王國。你招募一支叫做 Tinykin 的微型生物軍隊，每種都有不同能力：一些可以形成橋樑，一些可以搬運重物，一些可以炸開牆壁。核心循環是創造性地使用 Tinykin 解決謎題和探索每個房間。關卡設計非常出色——每個房間都有錯綜複雜的隱藏路徑、意想不到的收藏品，以及擁有自己文化的昆蟲大小的人類社區。8-12 小時，這是一個完整的探索體驗。常被描述為「皮克敏遇見縮小奇兵」，但 Tinykin 比皮克敏的時間壓力機制更溫暖、更 cozy、壓力更小。可在大多數平台上取得。',
    why_ja:
      'タイニーキン（2022年）は近年で最も過小評価されているコージーゲームのひとつです。宇宙探検家のミロとして地球に降り立ちますが、親指ほどの大きさに縮んでしまいます。舞台は郊外の一軒家の中——でもミロのスケールでは、キッチンは大陸、バスルームは海、リビングは王国です。タイニーキンと呼ばれる小さな生き物の軍団を集め、それぞれの能力を活かします。橋を作るもの、重い物を運ぶもの、壁を爆破するものなど様々。パズルを解いて各部屋を探索するのが基本の流れです。レベルデザインが圧巻で——各部屋には入り組んだ隠し通路、意外な場所の収集物、独自の文化を持つ昆虫サイズの小さな人々のコミュニティがあります。8〜12時間で完結する探索体験。「ピクミン×蜂の巣縮小作戦」とよく表現されますが、ピクミンの時間プレッシャーと違い、タイニーキンはより温かく、コージーで、ストレスが少ないです。ほとんどのプラットフォームで遊べます。',
    why_ko:
      '타이니킨（2022）은 최근 몇 년 사이 나온 게임 중 가장 저평가된 코지 게임 중 하나입니다. 우주 탐험가 밀로가 지구에 착륙했지만 엄지손가락 크기로 축소됩니다. 게임은 전부 교외의 집 안에서 펼쳐지는데 — 밀로의 크기로는 부엌이 대륙이고, 욕실이 바다이며, 거실은 왕국입니다. 타이니킨이라 불리는 작은 생명체 군대를 모집하는데, 각각 다른 능력이 있습니다. 다리를 만드는 것, 무거운 물건을 나르는 것, 벽을 폭파하는 것 등이죠. 핵심 루프는 타이니킨을 창의적으로 활용해 퍼즐을 풀고 각 방을 탐험하는 것입니다. 레벨 디자인이 탁월합니다 — 각 방에는 복잡한 숨겨진 경로, 예상치 못한 곳의 수집품, 그리고 자신들만의 문화를 가진 곤충 크기의 작은 사람들 공동체가 있습니다. 8-12시간으로 완결된 탐험 경험입니다. 흔히 \'피크민 × 작아진 사람\' 같다고 표현되는데, 타이니킨은 피크민의 시간 압박 없이 훨씬 따뜻하고 코지하며 스트레스가 적습니다. 대부분의 플랫폼에서 플레이할 수 있어요.',
    why_de:
      'Tinykin (2022) ist eines der am meisten übersehenen Cozy-Spiele der letzten Jahre. Du spielst als Milo, ein Weltraumforscher, der auf der Erde landet, aber auf Daumengröße geschrumpft wird. Das Spiel spielt vollständig im Inneren eines Vororthauses — aber in Milos Maßstab ist die Küche ein Kontinent, das Badezimmer ein Ozean und das Wohnzimmer ein Königreich. Du rekrutierst eine Armee winziger Kreaturen namens Tinykin, jede mit unterschiedlichen Fähigkeiten: Manche können Brücken bilden, manche schwere Objekte tragen, manche Wände sprengen. Der Kernloop besteht darin, Tinykin kreativ einzusetzen, um Rätsel zu lösen und jeden Raum zu erkunden. Das Leveldesign ist außergewöhnlich — jeder Raum hat verwinkelte versteckte Pfade, Sammelgegenstände an unerwarteten Stellen und Gemeinschaften insektengroßer Menschen mit ihrer eigenen Kultur. Mit 8-12 Stunden ist es ein komplettes Erkundungserlebnis. Oft beschrieben als "Pikmin trifft Liebling, ich habe die Kinder geschrumpft", aber Tinykin ist wärmer, gemütlicher und weniger stressig als Pikmins Zeitdruckmechanik. Auf den meisten Plattformen verfügbar.',
    tip_en: "Use soap bubbles as a movement tool throughout the whole game — they are not just for the bathroom level and will let you reach places that seem impossible from the ground.",
    tip_zh: '在整个游戏中将肥皂泡作为移动工具使用——它们不仅仅用于浴室关卡，还会让你到达从地面上看似不可能到达的地方。',
    tip_zhTW: '在整個遊戲中將肥皂泡作為移動工具使用——它們不僅僅用於浴室關卡，還會讓你到達從地面上看似不可能到達的地方。',
    tip_ja: 'ゲーム全体を通じてシャボン玉を移動手段として活用しよう——浴室のステージだけじゃなく、地面からは絶対に届かなさそうな場所にもたどり着けます。',
    tip_ko: '게임 전체에서 비눗방울을 이동 도구로 활용하세요 — 욕실 레벨만이 아니라 지면에서 도달 불가능해 보이는 곳에도 닿을 수 있게 해줍니다.',
    tip_de: 'Verwende Seifenblasen als Bewegungsmittel im gesamten Spiel — sie sind nicht nur für das Badezimmer-Level gedacht und werden dir erlauben, Orte zu erreichen, die vom Boden aus unmöglich erscheinen.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    venba: 0,
    'strange-horticulture': 0,
    'lil-gator': 0,
    tinykin: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyShortAdventureQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-short-adventure`
    const shareText = getLoc(
      `我的短篇 Cozy 冒险推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My short cozy adventure match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `我的短篇 Cozy 冒險推薦是「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `私の短編コージーアドベンチャーは「${result.title_ja}」！${result.tag_ja}。あなたも試して：${url}`,
      `내 단편 코지 어드벤처 추천은 「${result.title_ko}」! ${result.tag_ko}. 당신의 결과 찾기: ${url}`,
      `Mein kurzes Cozy-Abenteuer ist ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`,
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
              {getLoc('上手小贴士：', 'Getting started: ', '上手小貼士：', 'はじめる前に：', '시작 팁: ', 'Einstiegstipp: ')}
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
            '你应该玩哪款短篇 Cozy 冒险游戏？',
            'Which Short Cozy Adventure Game Should You Play?',
            '你應該玩哪款短篇 Cozy 冒險遊戲？',
            'どの短編コージーアドベンチャーゲームを遊ぶべき？',
            '어떤 단편 코지 어드벤처 게임을 플레이해야 할까요?',
            'Welches kurze Cozy-Abenteuerspiel solltest du spielen?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，在 Venba、奇异园艺、小鳄鱼游戏和 Tinykin 中找到你的完美短篇 Cozy 体验',
            '6 questions to find your match — Venba, Strange Horticulture, Lil Gator Game, or Tinykin. All under 12 hours, all distinctly cozy.',
            '6 個問題，在 Venba、奇異園藝、小鱷魚遊戲和 Tinykin 中找到你的完美短篇 Cozy 體驗',
            '6問でわかる——Venba、ストレンジ・ホーティカルチャー、リル・ゲーター・ゲーム、タイニーキンの中からあなたにぴったりの短編コージーゲームを探そう',
            '6가지 질문으로 찾는 나의 단편 코지 게임 — Venba, 스트레인지 호티컬처, 릴 게이터 게임, 타이니킨 중 딱 맞는 것을',
            '6 Fragen, um dein Match zu finden — Venba, Strange Horticulture, Lil Gator Game oder Tinykin. Alle unter 12 Stunden, alle gemütlich.',
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
          '找到我的短篇 Cozy 冒险',
          'Find My Short Cozy Adventure',
          '找到我的短篇 Cozy 冒險',
          '私の短編コージーアドベンチャーを見つける',
          '나의 단편 코지 어드벤처 찾기',
          'Mein kurzes Cozy-Abenteuer finden',
        )}
      </button>
    </div>
  )
}
