'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'duck' | 'donut' | 'mailtime' | 'loddlenaut'

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
    q_en: 'What is your ideal way to do absolutely nothing?',
    q_zh: '你理想中"什么都不做"的方式是什么？',
    q_zhTW: '你理想中「什麼都不做」的方式是什麼？',
    q_ja: '「なにもしない」理想の過ごし方は？',
    q_ko: '아무것도 안 할 때 이상적인 방식은 뭐예요?',
    q_de: 'Was ist deine ideale Art, absolut nichts zu tun?',
    options: [
      {
        en: 'Watching water — a river, a lake, rain on a window. Moving water calms my mind completely',
        zh: '看水——河流、湖泊、窗上的雨。流动的水能完全让我平静',
        zhTW: '看水——河流、湖泊、窗上的雨。流動的水能完全讓我平靜',
        ja: '水をながめる——川、湖、窓に当たる雨。動く水が頭を空っぽにしてくれる',
        ko: '물을 바라본다——강이든 호수든 창문에 맺힌 빗물이든. 흐르는 물을 보면 머리가 완전히 비워져',
        de: 'Wasser beobachten – einen Fluss, einen See, Regen an der Fensterscheibe. Fließendes Wasser leert mir komplett den Kopf',
        type: 'duck',
      },
      {
        en: 'Doing something mildly silly that amuses only me — low stakes, high absurdity',
        zh: '做一些轻微荒唐只有我自己觉得好笑的事情——低风险、高荒诞',
        zhTW: '做一些輕微荒唐只有我自己覺得好笑的事情——低風險、高荒誕',
        ja: '自分だけが面白いと思えるバカバカしいことをする——低リスク、高シュール',
        ko: '나만 웃긴다 싶은 가볍게 황당한 짓을 한다——부담 없이, 아무 의미 없이',
        de: 'Etwas leicht Bescheuertes tun, über das nur ich lachen kann – wenig auf dem Spiel, maximaler Unsinn',
        type: 'donut',
      },
      {
        en: 'A gentle walk through somewhere I have never been, noticing small things',
        zh: '在一个我从未去过的地方轻柔漫步，留意细节',
        zhTW: '在一個我從未去過的地方輕柔漫步，留意細節',
        ja: '知らない場所をのんびり歩きながら、小さな発見を楽しむ',
        ko: '가본 적 없는 곳을 천천히 산책하면서 작은 것들을 발견하기',
        de: 'Irgendwo entspannt herumschlendern, wo ich noch nie war, und kleine Dinge entdecken',
        type: 'mailtime',
      },
      {
        en: 'Tending something — a plant, a pet, anything that needs quiet regular care',
        zh: '照料某样东西——植物、宠物、任何需要安静定期照顾的东西',
        zhTW: '照料某樣東西——植物、寵物、任何需要安靜定期照顧的東西',
        ja: '何かのお世話をする——植物、ペット、静かにこつこつ手をかけるもの',
        ko: '뭔가를 돌본다——식물이든 반려동물이든, 조용히 꾸준히 신경 써줘야 하는 것',
        de: 'Mich um etwas kümmern – eine Pflanze, ein Tier, irgendetwas, das regelmäßig stille Aufmerksamkeit braucht',
        type: 'loddlenaut',
      },
    ],
  },
  {
    q_en: 'How do you feel about game objectives?',
    q_zh: '你如何看待游戏中的目标？',
    q_zhTW: '你如何看待遊戲中的目標？',
    q_ja: 'ゲームの目標についてはどう思う？',
    q_ko: '게임 내 목표에 대해 어떻게 생각해요?',
    q_de: 'Wie stehst du zu Spielzielen?',
    options: [
      {
        en: 'I prefer zero objectives — existing inside a calm space is the entire point',
        zh: '我更喜欢零目标——在平静空间中存在就是全部意义',
        zhTW: '我更喜歡零目標——在平靜空間中存在就是全部意義',
        ja: '目標ゼロが理想——穏やかな空間にただいるだけで十分',
        ko: '목표가 아예 없는 게 좋아——고요한 공간에 그냥 존재하는 것 자체가 전부',
        de: 'Am liebsten gar keine Ziele – einfach in einem ruhigen Raum zu sein ist schon alles',
        type: 'duck',
      },
      {
        en: 'Light, funny objectives that let me cause chaos in the most satisfying way possible',
        zh: '轻松有趣的目标，让我以最令人满足的方式制造混乱',
        zhTW: '輕鬆有趣的目標，讓我以最令人滿足的方式製造混亂',
        ja: '笑えてちょうどいい混乱を巻き起こせる、軽くて楽しい目標がいい',
        ko: '가볍고 웃긴 목표——최대한 통쾌하게 혼란을 일으킬 수 있는 것',
        de: 'Leichte, witzige Ziele, mit denen ich auf möglichst befriedigende Weise Chaos anrichten kann',
        type: 'donut',
      },
      {
        en: 'Gentle direction — deliver this, explore there, meet this person — no time pressure',
        zh: '温和的方向指引——送达这个、探索那里、见见这个人——没有时间压力',
        zhTW: '溫和的方向指引——送達這個、探索那裡、見見這個人——沒有時間壓力',
        ja: 'ゆるい方向性——届けて、探して、会って。プレッシャーなしで',
        ko: '느슨한 방향성——이거 전달하고, 저기 탐험하고, 이 사람 만나고. 시간 압박 없이',
        de: 'Eine sanfte Richtung – liefere das, erkundige dich dort, triff diese Person – ohne Zeitdruck',
        type: 'mailtime',
      },
      {
        en: 'Meaningful environmental goals — clean this up, raise this creature, restore what was harmed',
        zh: '有意义的环境目标——清理这里、养育这个生物、修复被破坏的东西',
        zhTW: '有意義的環境目標——清理這裡、養育這個生物、修復被破壞的東西',
        ja: '意義のある環境目標——きれいにして、育てて、傷ついたものを回復させる',
        ko: '의미 있는 환경 목표——여기 청소하고, 이 생명체 키우고, 망가진 걸 회복시키는 것',
        de: 'Bedeutsame Umweltziele – hier aufräumen, dieses Wesen aufziehen, wiederherstellen, was beschädigt wurde',
        type: 'loddlenaut',
      },
    ],
  },
  {
    q_en: 'What feeling do you most want a game to create?',
    q_zh: '你最希望游戏带给你什么感受？',
    q_zhTW: '你最希望遊戲帶給你什麼感受？',
    q_ja: 'ゲームに求める気持ちは？',
    q_ko: '게임이 어떤 감정을 줬으면 해요?',
    q_de: 'Welches Gefühl soll ein Spiel vor allem in dir auslösen?',
    options: [
      {
        en: 'Thoughtless peace — the specific calm of watching something float, with no demands on my attention',
        zh: '无思之宁——看着某样东西漂浮的那种特定平静，对我的注意力没有任何要求',
        zhTW: '無思之寧——看著某樣東西漂浮的那種特定平靜，對我的注意力沒有任何要求',
        ja: '何も考えない平和——何かが漂うのをただ見ている、あの独特の静けさ',
        ko: '아무 생각 없는 평화——뭔가가 둥둥 떠다니는 걸 그냥 바라보는, 아무것도 요구하지 않는 그 특별한 고요함',
        de: 'Gedankenlose Stille – die ganz besondere Ruhe, wenn man dabei zusieht, wie etwas treibt, ohne dass irgendetwas von mir verlangt wird',
        type: 'duck',
      },
      {
        en: 'Lightly giddy — the satisfaction of silliness done well, without any real consequences',
        zh: '轻微的晕眩感——出色完成荒唐事的满足感，没有任何真实后果',
        zhTW: '輕微的暈眩感——出色完成荒唐事的滿足感，沒有任何真實後果',
        ja: 'ちょっとした高揚感——バカバカしいことをうまくやった達成感、でも何も壊れない',
        ko: '살짝 들뜨는 기분——황당한 걸 잘 해냈을 때의 만족감, 실제로는 아무 피해도 없는',
        de: 'Leicht beschwingt – die Genugtuung, wenn Blödsinn gut funktioniert, ohne echte Konsequenzen',
        type: 'donut',
      },
      {
        en: 'Warm curiosity — wondering what is around the next corner and always finding something worth noticing',
        zh: '温暖的好奇心——想知道下一个转角是什么，总能发现值得注意的东西',
        zhTW: '溫暖的好奇心——想知道下一個轉角是什麼，總能發現值得注意的東西',
        ja: '温かい好奇心——次の角に何があるか気になって、いつも何か発見がある',
        ko: '따뜻한 호기심——다음 모퉁이엔 뭐가 있을까 궁금하고, 항상 뭔가 발견하게 되는',
        de: 'Warme Neugier – immer neugierig, was um die nächste Ecke kommt, und immer wird man fündig',
        type: 'mailtime',
      },
      {
        en: 'Quiet purpose — the feeling of being needed by something small that depends on you',
        zh: '平静的使命感——被依赖着的感觉，某样小东西需要你',
        zhTW: '平靜的使命感——被依賴著的感覺，某樣小東西需要你',
        ja: '静かな使命感——小さな何かに必要とされている、あの感覚',
        ko: '조용한 사명감——작은 존재가 나를 필요로 하는 그 느낌',
        de: 'Stiller Sinn – das Gefühl, von etwas Kleinem gebraucht zu werden, das auf dich angewiesen ist',
        type: 'loddlenaut',
      },
    ],
  },
  {
    q_en: 'How long is your ideal play session?',
    q_zh: '你理想的游戏时长是多少？',
    q_zhTW: '你理想的遊戲時長是多少？',
    q_ja: '理想のプレイ時間は？',
    q_ko: '이상적인 플레이 시간은?',
    q_de: 'Wie lange spielst du idealerweise am Stück?',
    options: [
      {
        en: 'Five to fifteen minutes — I want to open it, feel immediately calm, and close it satisfied',
        zh: '五到十五分钟——我想打开它，立刻感到平静，然后满足地关闭它',
        zhTW: '五到十五分鐘——我想打開它，立刻感到平靜，然後滿足地關閉它',
        ja: '5〜15分——起動して、すぐ落ち着いて、満足して閉じる',
        ko: '5~15분——켜자마자 편안해지고, 만족스럽게 닫을 수 있는 시간',
        de: 'Fünf bis fünfzehn Minuten – aufmachen, sofort entspannen, zufrieden wieder schließen',
        type: 'duck',
      },
      {
        en: 'Two or three hours start-to-finish — a complete funny little story with a beginning and end',
        zh: '从头到尾两三个小时——一个有开头和结尾的完整有趣小故事',
        zhTW: '從頭到尾兩三個小時——一個有開頭和結尾的完整有趣小故事',
        ja: '最初から最後まで2〜3時間——始まりと終わりのある完結したおもしろい話',
        ko: '처음부터 끝까지 2~3시간——시작과 끝이 있는 완결된 웃긴 이야기',
        de: 'Zwei bis drei Stunden von Anfang bis Ende – eine komplette kleine witzige Geschichte mit Anfang und Ende',
        type: 'donut',
      },
      {
        en: 'A few cozy hours of exploration — finding the whole world and meeting everyone in it',
        zh: '几个舒适的探索时光——发现整个世界并见到其中的每个人',
        zhTW: '幾個舒適的探索時光——發現整個世界並見到其中的每個人',
        ja: 'ゆったり数時間の探索——世界を隅々まで発見して、全員と出会う',
        ko: '편안하게 탐험하는 몇 시간——세상 구석구석을 발견하고 모두를 만나는 시간',
        de: 'Ein paar gemütliche Stunden erkunden – die ganze Welt entdecken und alle Bewohner kennenlernen',
        type: 'mailtime',
      },
      {
        en: 'Regular check-in sessions over several days — coming back to see how my creatures are doing',
        zh: '几天内定期的回访——回来看看我的生物们状况如何',
        zhTW: '幾天內定期的回訪——回來看看我的生物們狀況如何',
        ja: '数日かけて定期的にのぞく——生き物たちの様子を見に帰ってくる',
        ko: '며칠에 걸쳐 정기적으로 접속——내 생명체들이 어떻게 지내는지 확인하러 돌아오는',
        de: 'Regelmäßige Kurzsitzungen über mehrere Tage – zurückkommen und schauen, wie es meinen Wesen geht',
        type: 'loddlenaut',
      },
    ],
  },
  {
    q_en: 'What is your relationship with humor in games?',
    q_zh: '你与游戏幽默感的关系是什么？',
    q_zhTW: '你與遊戲幽默感的關係是什麼？',
    q_ja: 'ゲームのユーモアとの付き合い方は？',
    q_ko: '게임의 유머와 어떤 관계인가요?',
    q_de: 'Wie ist dein Verhältnis zu Humor in Spielen?',
    options: [
      {
        en: 'I prefer aesthetic and calm over humor — I want to feel peaceful, not amused',
        zh: '我更喜欢美感和平静而不是幽默——我想感到平静，而不是被逗乐',
        zhTW: '我更喜歡美感和平靜而不是幽默——我想感到平靜，而不是被逗樂',
        ja: '笑いより雰囲気と静けさ優先——癒されたい、笑わせてもらいたいわけじゃない',
        ko: '유머보다 분위기와 고요함——웃기는 것보다 평온함을 원해',
        de: 'Ich mag Atmosphäre und Ruhe lieber als Humor – ich will mich entspannen, nicht zum Lachen gebracht werden',
        type: 'duck',
      },
      {
        en: 'Humor is the point — I want to genuinely laugh at the situations I create',
        zh: '幽默才是重点——我想真正为自己创造的情境而大笑',
        zhTW: '幽默才是重點——我想真正為自己創造的情境而大笑',
        ja: 'ユーモアこそすべて——自分が作り出した状況に思わず笑ってしまいたい',
        ko: '유머가 전부——내가 만들어낸 상황에 진심으로 웃고 싶어',
        de: 'Humor ist das Wichtigste – ich will wirklich über die Situationen lachen, die ich selbst erschaffe',
        type: 'donut',
      },
      {
        en: 'Gentle warmth through the characters — humor that comes from personality, not jokes',
        zh: '通过角色传递的温暖——来自个性而非笑话的幽默',
        zhTW: '透過角色傳遞的溫暖——來自個性而非笑話的幽默',
        ja: 'キャラクターから伝わる温かみ——ジョークじゃなくて、個性から生まれるユーモア',
        ko: '캐릭터를 통한 따뜻함——농담이 아니라 개성에서 나오는 유머',
        de: 'Sanfte Wärme durch die Charaktere – Humor, der aus Persönlichkeit entsteht, nicht aus Witzen',
        type: 'mailtime',
      },
      {
        en: 'Light charm through strange creature behavior — I find the bizarre biology quietly funny',
        zh: '通过奇怪的生物行为带来的轻微魅力——我觉得奇异的生物学有一种安静的趣味',
        zhTW: '透過奇怪的生物行為帶來的輕微魅力——我覺得奇異的生物學有一種安靜的趣味',
        ja: '生き物の不思議な行動からにじむチャーム——奇妙な生態がちょっとおかしくて好き',
        ko: '이상한 생명체 행동에서 나오는 가벼운 매력——기묘한 생태계가 은근히 웃겨',
        de: 'Leichter Charme durch das seltsame Verhalten der Wesen – die bizarre Biologie find ich irgendwie heimlich witzig',
        type: 'loddlenaut',
      },
    ],
  },
  {
    q_en: 'How would you describe this game to someone who has never heard of it?',
    q_zh: '你会怎么向从未听说过它的人描述这款游戏？',
    q_zhTW: '你會怎麼向從未聽說過它的人描述這款遊戲？',
    q_ja: 'このゲームを知らない人にどう説明する？',
    q_ko: '이 게임을 모르는 사람한테 어떻게 설명할 것 같아요?',
    q_de: 'Wie würdest du dieses Spiel jemandem erklären, der noch nie davon gehört hat?',
    options: [
      {
        en: '"Just turn it on, watch rubber ducks float around, and feel weirdly calm. I cannot explain why it works but it does."',
        zh: '「打开它，看着橡皮鸭漂浮，然后奇怪地感到平静。我无法解释为什么有效，但就是有效。」',
        zhTW: '「打開它，看著橡皮鴨漂浮，然後奇怪地感到平靜。我無法解釋為什麼有效，但就是有效。」',
        ja: '「起動してゴム製のアヒルが浮いてるのを見てたら、なぜか落ち着くんだよ。なんで効くのか説明できないけど、効くんだよ。」',
        ko: '"그냥 켜고 고무 오리 둥둥 떠다니는 거 보면 이상하게 마음이 가라앉아. 왜 효과가 있는지 설명은 못 하겠는데, 진짜 효과 있어."',
        de: '"Einfach starten, zuschauen, wie Gummienten schwimmen, und dann merkwürdigerweise total ruhig werden. Ich kann nicht erklären, warum es funktioniert – aber es funktioniert einfach."',
        type: 'duck',
      },
      {
        en: '"You are a hole in the ground. You eat an entire town. It is completely perfect."',
        zh: '「你是地上的一个洞。你吃掉了整个小镇。这完全是完美的。」',
        zhTW: '「你是地上的一個洞。你吃掉了整個小鎮。這完全是完美的。」',
        ja: '「あなたは地面の穴。街ごと全部飲み込む。完璧すぎる。」',
        ko: '"당신은 땅에 있는 구멍이에요. 마을 전체를 먹어 치우는 거예요. 완벽해요."',
        de: '"Du bist ein Loch im Boden. Du isst eine ganze Stadt. Es ist vollkommen perfekt."',
        type: 'donut',
      },
      {
        en: '"I am a tiny little creature delivering mail through a cozy mushroom forest and I love every resident I have met."',
        zh: '「我是一只在舒适蘑菇森林中送信的小小生物，我爱我遇到的每一位居民。」',
        zhTW: '「我是一隻在舒適蘑菇森林中送信的小小生物，我愛我遇到的每一位居民。」',
        ja: '「小さな生き物がきのこの森で手紙を届けるゲームで、出てくる住民全員が好きになる。」',
        ko: '"작은 생명체가 되어서 아늑한 버섯 숲에서 편지를 배달하는 건데, 만나는 주민들이 다 좋아."',
        de: '"Ich bin ein winziges kleines Tierchen, das in einem gemütlichen Pilzwald Post ausliefert, und ich liebe jeden Bewohner, den ich getroffen habe."',
        type: 'mailtime',
      },
      {
        en: '"I am cleaning up alien ocean pollution and raising alien sea creatures and somehow it is the most calming thing I have played."',
        zh: '「我在清理外星海洋污染，养育外星海洋生物，不知为何这是我玩过的最令人平静的东西。」',
        zhTW: '「我在清理外星海洋污染，養育外星海洋生物，不知為何這是我玩過的最令人平靜的東西。」',
        ja: '「宇宙の海の汚染を掃除して、宇宙の海の生き物を育てるんだけど、なぜかすごく癒される。」',
        ko: '"외계 바다 오염을 청소하고 외계 바다 생물들을 키우는 건데, 어쩌다 보니 지금까지 해본 것 중에 제일 힐링돼."',
        de: '"Ich reinige außerirdische Meeresverschmutzung und ziehe außerirdische Meereskreaturen groß – und es ist irgendwie das Entspannendste, was ich je gespielt habe."',
        type: 'loddlenaut',
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
  duck: {
    title_en: 'Placid Plastic Duck Simulator',
    title_zh: '安静橡皮鸭模拟器',
    title_zhTW: '安靜橡皮鴨模擬器',
    title_ja: 'プラシッド・プラスチック・ダック・シミュレーター',
    title_ko: '플라시드 플라스틱 덕 시뮬레이터',
    title_de: 'Placid Plastic Duck Simulator',
    emoji: '🦆',
    tag_en: 'Watch rubber ducks float in peaceful real-world-inspired scenes with ambient sound — no objectives, no interaction required, pure ambient calm',
    tag_zh: '观看橡皮鸭在和平的现实世界灵感场景中漂浮，伴随环境音效——没有目标、不需要互动、纯粹的环境平静',
    tag_zhTW: '觀看橡皮鴨在平靜的現實世界靈感場景中漂浮，伴隨環境音效——沒有目標、不需要互動、純粹的環境平靜',
    tag_ja: 'リアルな場面にインスパイアされた静かな環境でゴムアヒルが漂うのを眺める——目標なし、操作不要、ただひたすら穏やかなアンビエント体験',
    tag_ko: '현실 세계에서 영감받은 평화로운 장면 속에서 고무 오리가 떠다니는 걸 바라보기——목표 없음, 인터랙션 불필요, 순수한 앰비언트 힐링',
    tag_de: 'Schau dabei zu, wie Gummienten durch friedliche, von der echten Welt inspirierte Szenen treiben, mit Umgebungsklang – ohne Ziele, ohne Interaktion, purer entspannter Vibe',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, iOS, Android — about $5-8',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、iOS、Android——约 5-8 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、iOS、Android——約 5-8 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、iOS、Android——約600〜900円',
    platform_ko: '플랫폼: PC（Steam）, 닌텐도 스위치, iOS, 안드로이드——약 5~8달러',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, iOS, Android – ca. 5–8 €',
    why_en:
      "Placid Plastic Duck Simulator (2023) is one of the most unusual games on Steam — and also one of the most purely relaxing. The entire game is watching rubber ducks float across beautifully rendered environments: a mountain hot spring, a swimming pool, a jungle waterfall, a Japanese bathhouse, a rooftop pool at golden hour. There is no minigame. There is no failure state. There are no NPCs to manage. You can interact lightly by clicking to add more ducks, but the game functions just as well as a screen saver you occasionally glance at. The sound design is the real craft here: each scene has layered ambient audio — water movement, birds, distant wind, occasional rubber duck squeaks — that makes it a genuinely effective relaxation tool. It went viral after being discovered by streamers, has over 90% positive reviews on Steam, and costs about $5. Available on mobile for free with limited scenes. One of the very few games that can be genuinely recommended to people who say they do not like games.",
    why_zh:
      'Placid Plastic Duck Simulator（2023 年）是 Steam 上最不寻常的游戏之一——也是最纯粹放松的游戏之一。整个游戏就是观看橡皮鸭漂浮在精美渲染的环境中：山地温泉、游泳池、丛林瀑布、日式澡堂、黄金时刻的屋顶泳池。没有小游戏，没有失败状态，没有需要管理的 NPC。你可以通过点击轻松互动来添加更多鸭子，但游戏作为屏保偶尔瞥一眼也同样有效。音效设计是真正的工艺所在：每个场景都有分层的环境音频——水声运动、鸟鸣、远处的风、偶尔的橡皮鸭吱吱声——使其成为真正有效的放松工具。在被主播发现后成为病毒式传播，Steam 上超过 90% 的好评，售价约 5 美元。移动端有限场景免费提供。是极少数可以真正推荐给说自己不喜欢游戏的人的游戏之一。',
    why_zhTW:
      'Placid Plastic Duck Simulator（2023 年）是 Steam 上最不尋常的遊戲之一——也是最純粹放鬆的遊戲之一。整個遊戲就是觀看橡皮鴨漂浮在精美渲染的環境中：山地溫泉、游泳池、叢林瀑布、日式澡堂、黃金時刻的屋頂泳池。沒有小遊戲，沒有失敗狀態，沒有需要管理的 NPC。你可以透過點擊輕鬆互動來新增更多鴨子，但遊戲作為螢幕保護程式偶爾瞥一眼也同樣有效。音效設計是真正的工藝所在：每個場景都有分層的環境音訊——水聲、鳥鳴、遠處的風、偶爾的橡皮鴨吱吱聲——使其成為真正有效的放鬆工具。在被實況主發現後成為病毒式傳播，Steam 上超過 90% 的好評，售價約 5 美元。行動端有限場景免費提供。是極少數可以真正推薦給說自己不喜歡遊戲的人的遊戲之一。',
    why_ja:
      'Placid Plastic Duck Simulator（2023年）はSteamでも異色の存在——そして、おそらく最も純粋に癒されるゲームのひとつ。ゲームの全ては、ゴムアヒルが美しくレンダリングされた環境を漂うのを眺めること：山の露天風呂、プール、ジャングルの滝、日本の銭湯、ゴールデンアワーの屋上プール。ミニゲームも、失敗状態も、管理すべきNPCも存在しない。クリックすることで鴨を追加する軽いインタラクションもあるが、たまに目をやるスクリーンセーバーとしても機能する。このゲームの真骨頂はサウンドデザイン：各シーンには水の音、鳥の声、遠くの風、時折のアヒルのきゅっという鳴き声が重なった環境音があり、本当に有効なリラクゼーションツールになっている。ストリーマーに発見されてからバズり、Steamでは90%超の高評価、価格は約600〜900円。モバイルでは一部シーンを無料で楽しめる。「ゲームは苦手」という人にも自信を持って勧められる数少ないタイトルのひとつ。',
    why_ko:
      'Placid Plastic Duck Simulator（2023）는 Steam에서도 손꼽히게 독특한 게임이면서, 동시에 가장 순수하게 힐링되는 게임 중 하나예요. 게임의 전부는 아름답게 렌더링된 환경을 떠다니는 고무 오리들을 바라보는 것: 산속 온천, 수영장, 정글 폭포, 일본식 목욕탕, 황금빛 시간대의 옥상 수영장. 미니게임도, 실패 상태도, 관리해야 할 NPC도 없어요. 클릭으로 오리를 더 추가하는 가벼운 인터랙션은 있지만, 가끔 슬쩍 쳐다보는 화면 보호기처럼 활용해도 충분히 효과적이에요. 이 게임의 진짜 핵심은 사운드 디자인: 각 장면마다 물 흐르는 소리, 새소리, 멀리서 들리는 바람 소리, 간간이 들리는 고무 오리 삑 소리가 레이어드되어 있어서 진짜로 릴렉스 효과가 있는 도구가 돼요. 스트리머들에게 발견된 이후 바이럴이 되었고, Steam에서 90% 이상의 긍정 평가를 받고 있으며, 가격은 약 5~8달러. 모바일에서는 일부 장면을 무료로 즐길 수 있어요. "게임은 별로 안 좋아해"라는 사람에게도 자신 있게 추천할 수 있는 몇 안 되는 타이틀 중 하나예요.',
    why_de:
      'Placid Plastic Duck Simulator (2023) ist eines der ungewöhnlichsten Spiele auf Steam – und gleichzeitig eines der reinsten Entspannungserlebnisse. Das gesamte Spiel besteht daraus, Gummienten durch wunderschön gerenderte Umgebungen treiben zu sehen: eine Bergquelle, ein Schwimmbad, ein Dschungelwasserfall, ein japanisches Badehaus, ein Dachpool im goldenen Stundenlicht. Kein Minispiel, kein Scheitern, keine NPCs. Du kannst durch Klicken mehr Enten hinzufügen, aber das Spiel funktioniert genauso gut als Bildschirmschoner, den man gelegentlich ansieht. Das Sounddesign ist das eigentliche Herzstück: Jede Szene hat mehrere überlagerte Umgebungsgeräusche – fließendes Wasser, Vögel, Wind in der Ferne, gelegentliches Quietschen der Gummienten – was es zu einem wirklich effektiven Entspannungswerkzeug macht. Nachdem Streamer das Spiel entdeckt hatten, wurde es viral; es hat über 90 % positive Bewertungen auf Steam und kostet etwa 5–8 €. Auf Mobilgeräten sind einige Szenen kostenlos verfügbar. Eines der wenigen Spiele, das man getrost auch Menschen empfehlen kann, die sagen, sie mögen keine Spiele.',
    tip_en: "Try playing it as a second monitor presence during work or reading — the ambient sound of ducks floating and gentle water is better than most dedicated white noise apps. The Steam version has significantly more scenes and better audio than the mobile version.",
    tip_zh: '尝试在工作或阅读时将其作为第二屏幕背景使用——鸭子漂浮和温和水声的环境音比大多数专用白噪音应用都要好。Steam 版本比手机版本有更多场景和更好的音频。',
    tip_zhTW: '嘗試在工作或閱讀時將其作為第二螢幕背景使用——鴨子漂浮和溫和水聲的環境音比大多數專用白噪音應用都要好。Steam 版本比手機版本有更多場景和更好的音訊。',
    tip_ja: '作業中や読書中にサブモニターとして流しておくのがおすすめ——アヒルが漂う音と穏やかな水の音は、専用のホワイトノイズアプリよりも効果的なことが多い。シーン数とオーディオ品質はSteam版のほうがモバイル版より格段に優れている。',
    tip_ko: '작업하거나 책 읽을 때 보조 모니터 배경으로 켜두는 걸 추천해요——오리가 떠다니는 소리와 잔잔한 물소리는 웬만한 화이트 노이즈 앱보다 효과적이에요. 장면 수와 오디오 품질은 모바일 버전보다 Steam 버전이 훨씬 뛰어나요.',
    tip_de: 'Probiere es als Präsenz auf einem zweiten Monitor beim Arbeiten oder Lesen – das Umgebungsgeräusch der treibenden Enten und des sanften Wassers ist oft besser als die meisten weißen Rausch-Apps. Die Steam-Version hat deutlich mehr Szenen und besseres Audio als die Mobile-Version.',
  },
  donut: {
    title_en: 'Donut County',
    title_zh: '甜甜圈县城',
    title_zhTW: '甜甜圈縣城',
    title_ja: 'Donut County（ドーナツカウンティ）',
    title_ko: '도넛 카운티',
    title_de: 'Donut County',
    emoji: '🍩',
    tag_en: 'You are a hole in the ground — swallow an entire town object by object, growing larger with each thing you consume, until everything is gone',
    tag_zh: '你是地上的一个洞——一件一件地吞噬整个小镇，随着你吞噬的每样东西不断变大，直到一切都消失',
    tag_zhTW: '你是地上的一個洞——一件一件地吞噬整個小鎮，隨著你吞噬的每樣東西不斷變大，直到一切都消失',
    tag_ja: 'あなたは地面の穴——街の物を一つずつ飲み込んで、どんどん大きくなる。最後には何もかもが消える',
    tag_ko: '당신은 땅에 있는 구멍——마을의 물건들을 하나씩 집어삼키며 점점 커지다가, 결국 모든 것이 사라질 때까지',
    tag_de: 'Du bist ein Loch im Boden – verschlucke eine ganze Stadt Stück für Stück, werde mit jedem Gegenstand größer, bis nichts mehr übrig ist',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, iOS, Android — about $8',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、iOS、Android——约 8 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、GOG）、Nintendo Switch、PS4、iOS、Android——約 8 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、GOG）、Nintendo Switch、PS4、iOS、Android——約900円',
    platform_ko: '플랫폼: PC（Steam, GOG）, 닌텐도 스위치, PS4, iOS, 안드로이드——약 8달러',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), Nintendo Switch, PS4, iOS, Android – ca. 8 €',
    why_en:
      "Donut County (2018) has one of the most perfectly simple concepts in indie gaming: you control a hole in the ground that gets bigger every time it swallows something. You start by swallowing small objects — rocks, cacti, garden gnomes — and gradually grow until you can swallow entire buildings, vehicles, and eventually landmarks. The game follows BK, a raccoon who controls the hole via an app, and his friend Mira who is trying to stop him from destroying the entire county. The writing is funny in a dry, specific way — texts between BK and Mira, raccoon logic applied to real situations, absurdist environmental storytelling. At 2-3 hours, it is a perfect complete short game: funny from beginning to end, mechanically satisfying in a primal way (everything gets eaten eventually), and with a story that lands better than you expect. One of the finest examples of a game where the core mechanic is the entire joke and the joke never gets old.",
    why_zh:
      '甜甜圈县城（2018 年）在独立游戏中拥有最完美简单的概念之一：你控制地上一个每次吞噬东西就变大的洞。你从吞噬小物体开始——岩石、仙人掌、花园地精——然后逐渐长大，直到你能吞噬整栋建筑、车辆，最终是地标。游戏讲述 BK，一只通过应用程序控制洞的浣熊，以及他试图阻止他破坏整个县城的朋友 Mira 的故事。文字以一种干燥、具体的方式幽默——BK 和 Mira 之间的短信、浣熊逻辑应用于现实情况、荒诞主义的环境叙事。2-3 小时，这是一款完美的完整短游戏：从头到尾都有趣，以一种原始的方式机制令人满足（最终一切都被吃掉），故事的落点比你预期的要好。这是最好的例子之一，证明核心机制就是整个笑话，而这个笑话永远不会过时。',
    why_zhTW:
      '甜甜圈縣城（2018 年）在獨立遊戲中擁有最完美簡單的概念之一：你控制地上一個每次吞噬東西就變大的洞。你從吞噬小物體開始——岩石、仙人掌、花園地精——然後逐漸長大，直到你能吞噬整棟建築、車輛，最終是地標。遊戲講述 BK，一隻透過應用程式控制洞的浣熊，以及他試圖阻止他破壞整個縣城的朋友 Mira 的故事。文字以一種乾燥、具體的方式幽默——BK 和 Mira 之間的簡訊、浣熊邏輯應用於現實情況、荒誕主義的環境敘事。2-3 小時，這是一款完美的完整短遊戲：從頭到尾都有趣，以一種原始的方式機制令人滿足（最終一切都被吃掉），故事的落點比你預期的要好。這是最好的例子之一，證明核心機制就是整個笑話，而這個笑話永遠不會過時。',
    why_ja:
      'Donut County（2018年）はインディーゲーム史上、最もシンプルで完璧なコンセプトのひとつ：飲み込むたびに大きくなる地面の穴を操作する。最初は小石やサボテン、ガーデン小人といった小さなものを飲み込み、少しずつ成長して、やがて建物、乗り物、ランドマークまで飲み込めるようになる。物語は、アプリで穴を操作するアライグマのBKと、彼が街全体を破壊するのを止めようとする友人のMiraを追う。テキストはドライでシュールな笑いがあり——BKとMiraのテキストメッセージ、現実にアライグマの論理が適用される状況、不条理な環境ストーリーテリング。2〜3時間でプレイし終えられる、完結感のある短編ゲームの理想形：終始面白く、「全部飲み込まれる」という原初的な満足感があり、物語の着地点も予想以上によくできている。コアメカニクスがそのままジョークになっていて、そのジョークが最後まで飽きない稀有な作品。',
    why_ko:
      'Donut County（2018）는 인디게임 역사상 가장 완벽하게 단순한 컨셉 중 하나를 가진 게임이에요: 무언가를 삼킬 때마다 커지는 땅속 구멍을 조종하는 것. 처음엔 돌, 선인장, 가든 노움 같은 작은 것들을 삼키다가, 점점 성장해서 결국 건물, 차량, 랜드마크까지 삼킬 수 있게 돼요. 게임은 앱으로 구멍을 조종하는 너구리 BK와 그가 마을 전체를 파괴하는 걸 막으려는 친구 Mira의 이야기를 따라가요. 글이 건조하고 구체적으로 웃긴데——BK와 Mira의 문자 메시지, 현실 상황에 적용되는 너구리 논리, 부조리한 환경 스토리텔링이 매력이에요. 2~3시간이면 완결되는 완벽한 단편 게임: 처음부터 끝까지 재미있고, 원초적으로 만족스러운 메카닉（결국 모든 게 삼켜진다）이 있으며, 이야기의 마무리도 예상보다 훨씬 잘 됩니다. 코어 메카닉 자체가 농담이면서, 그 농담이 끝까지 질리지 않는 드문 게임이에요.',
    why_de:
      'Donut County (2018) hat eines der perfekt einfachen Konzepte in der Indie-Gaming-Welt: Du steuerst ein Loch im Boden, das mit jedem verschluckten Gegenstand größer wird. Zuerst schluckst du kleine Dinge – Steine, Kakteen, Gartenzwerge – und wächst langsam, bis du ganze Gebäude, Fahrzeuge und schließlich Wahrzeichen verschlucken kannst. Das Spiel folgt BK, einem Waschbär, der das Loch per App steuert, und seiner Freundin Mira, die versucht, ihn daran zu hindern, die gesamte Gemeinde zu zerstören. Die Texte sind trocken und spezifisch lustig – Nachrichten zwischen BK und Mira, Waschbär-Logik in echten Situationen, absurdistisches Environmental Storytelling. In 2–3 Stunden ist es ein perfektes, abgeschlossenes Kurz-Spiel: von Anfang bis Ende witzig, mechanisch befriedigend auf eine ursprüngliche Art (am Ende wird alles gefressen), mit einem überraschend guten Abschluss. Ein Paradebeispiel dafür, wie das Kern-Gameplay selbst der Witz ist – und dieser Witz nie alt wird.',
    tip_en: "Swallow things in the most satisfying order — resist the urge to swallow everything immediately. There is a specific joy in letting objects interact with each other before they go in: knock a beehive into the hole and watch what happens, or let a fireworks stand go in whole.",
    tip_zh: '以最令人满足的顺序吞噬东西——抵制立刻吞噬一切的冲动。在物体进入之前让它们相互作用有一种特殊的乐趣：把蜂箱推进洞里看看会发生什么，或者让烟花摊整个进去。',
    tip_zhTW: '以最令人滿足的順序吞噬東西——抵制立刻吞噬一切的衝動。在物體進入之前讓它們相互作用有一種特殊的樂趣：把蜂箱推進洞裡看看會發生什麼，或者讓煙火攤整個進去。',
    tip_ja: '一番気持ちいい順番で飲み込むのがコツ——すぐに全部飲み込もうとするのを少し我慢して。物が落ちる前に他のものとぶつかるのを見るのが特別に楽しい：蜂の巣を穴に落としてどうなるか見てみて、または花火スタンドをまるごと飲み込む瞬間を楽しもう。',
    tip_ko: '가장 통쾌한 순서로 삼키는 게 포인트——바로 다 삼키고 싶은 충동을 조금 참아봐요. 물건이 들어가기 전에 서로 부딪히는 걸 보는 게 특별한 재미예요: 벌집을 구멍 안으로 밀어 넣으면 어떻게 되는지 보거나, 불꽃놀이 가판대를 통째로 삼켜보세요.',
    tip_de: 'Verschlucke die Dinge in der befriedigendsten Reihenfolge – widerstehe dem Impuls, sofort alles zu schlucken. Es macht besonderen Spaß, wenn Objekte erst miteinander interagieren, bevor sie hineinfallen: Schmeiß einen Bienenstock ins Loch und schau, was passiert, oder lass einen Feuerwerksstand ganz hineinschlittern.',
  },
  mailtime: {
    title_en: 'Mail Time',
    title_zh: 'Mail Time',
    title_zhTW: 'Mail Time',
    title_ja: 'Mail Time（メールタイム）',
    title_ko: '메일 타임 (Mail Time)',
    title_de: 'Mail Time',
    emoji: '✉️',
    tag_en: 'Play as a tiny mail carrier exploring a cozy forest village — glide through mushroom trees, deliver letters to charming residents, discover every secret corner',
    tag_zh: '扮演一个探索舒适森林村庄的小小邮差——在蘑菇树间滑翔、向迷人的居民送信、发现每一个秘密角落',
    tag_zhTW: '扮演一個探索舒適森林村莊的小小郵差——在蘑菇樹間滑翔、向迷人的居民送信、發現每一個秘密角落',
    tag_ja: '小さな郵便配達員として居心地のいい森の村を探索——きのこの木々の間をグライドし、愛らしい住民たちに手紙を届け、隠された場所をすべて発見しよう',
    tag_ko: '작은 우체부가 되어 아늑한 숲 마을을 탐험——버섯 나무 사이를 활강하고, 매력적인 주민들에게 편지를 배달하고, 모든 숨겨진 구석을 발견하세요',
    tag_de: 'Spiel als winzige Postbotin und erkundige dich durch ein gemütliches Waldörfchen – gleite durch Pilzbäume, liefere Briefe an charmante Bewohner und entdecke jede versteckte Ecke',
    platform_en: 'Available on: PC (Steam, Itch.io) — about $15',
    platform_zh: '可在以下平台获取：PC（Steam、Itch.io）——约 15 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、Itch.io）——約 15 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、Itch.io）——約2,000円',
    platform_ko: '플랫폼: PC（Steam, Itch.io）——약 15달러',
    platform_de: 'Erhältlich auf: PC (Steam, Itch.io) – ca. 15 €',
    why_en:
      "Mail Time (2023) is a cozy 3D exploration platformer where you play as a tiny mail carrier living in a world-within-a-world nestled in a forest. You glide with your oversized mail bag, explore mushroom-topped trees that are entire neighborhoods, and deliver letters to a cast of charming small-creature residents who each have their own personalities, homes, and ongoing stories revealed through the mail they receive. The game has a specific dreamlike scale — you are tiny, the forest is vast, and every area contains more detail than it initially suggests. There is no combat, no fail state, and no time pressure; the challenge is exploration and finding where each piece of mail needs to go. The visual design is richly tactile — wood grain on the mailboxes, oversized flower petals as rooftops, dewdrops on spider web bridges — and the soundtrack is appropriately gentle and cozy. At $15 for 4-6 hours, it is the best game for players who want to inhabit a small and detailed world at their own pace.",
    why_zh:
      'Mail Time（2023 年）是一款舒适的 3D 探索平台游戏，你扮演一个生活在森林中世界之中的小小邮差。你用你的超大邮件袋滑翔，探索整个是邻里的蘑菇顶树木，并向一群迷人的小生物居民送信，每个人都有自己的个性、家园和通过他们收到的邮件揭示的持续故事。游戏有一种特定的梦幻般的尺度——你很小，森林很大，每个区域都包含比最初建议的更多细节。没有战斗、没有失败状态、没有时间压力；挑战是探索并找到每封信需要去的地方。视觉设计触感丰富——邮箱上的木纹、超大花瓣作为屋顶、蜘蛛网桥上的露珠——配乐适度温柔舒适。15 美元 4-6 小时，是想要按自己节奏居住在小而详细世界中的玩家的最佳游戏。',
    why_zhTW:
      'Mail Time（2023 年）是一款舒適的 3D 探索平台遊戲，你扮演一個生活在森林中世界之中的小小郵差。你用你的超大郵件袋滑翔，探索整個是鄰里的蘑菇頂樹木，並向一群迷人的小生物居民送信，每個人都有自己的個性、家園和透過他們收到的郵件揭示的持續故事。遊戲有一種特定的夢幻般的尺度——你很小，森林很大，每個區域都包含比最初建議的更多細節。沒有戰鬥、沒有失敗狀態、沒有時間壓力；挑戰是探索並找到每封信需要去的地方。視覺設計觸感豐富——郵箱上的木紋、超大花瓣作為屋頂、蜘蛛網橋上的露珠——配樂適度溫柔舒適。15 美元 4-6 小時，是想要按自己節奏居住在小而詳細世界中的玩家的最佳遊戲。',
    why_ja:
      'Mail Time（2023年）は、森の中にある「世界の中の世界」に暮らす小さな郵便配達員として遊ぶ、温かみのある3D探索プラットフォームゲーム。大きすぎる郵便バッグでグライドしながら、きのこが丘になった木々の上の集落を探索し、独特の個性と家と物語を持つ愛らしい小さな生き物の住民たちに手紙を届ける。ゲーム独特の夢のようなスケール感——プレイヤーは小さく、森は広大で、どのエリアも最初より多くの発見を秘めている。戦闘なし、失敗状態なし、時間制限なし。チャレンジは探索と、各手紙の届け先を見つけること。ビジュアルデザインは質感が豊か——ポストの木目、屋根に使われた大きな花びら、クモの巣の橋についた水滴——そしてサウンドトラックも適度にゆったりとしていて居心地がいい。約2,000円で4〜6時間。自分のペースで小さく精緻な世界に浸りたいプレイヤーに最適なゲーム。',
    why_ko:
      'Mail Time（2023）는 숲 속 세계에 자리한 또 다른 세계에 사는 작은 우체부로 플레이하는 아늑한 3D 탐험 플랫포머예요. 특대 우편 가방으로 활강하면서, 버섯이 올라탄 나무들로 이루어진 동네를 탐험하고, 각자의 개성과 집과 편지를 통해 드러나는 이야기를 가진 귀여운 작은 생명체 주민들에게 편지를 배달해요. 게임 특유의 꿈결 같은 스케일감——내가 작고 숲은 광대하며, 어떤 구역이든 처음보다 더 많은 것을 품고 있어요. 전투 없음, 실패 상태 없음, 시간 제한 없음. 도전은 탐험과 각 편지가 어디로 가야 하는지 찾는 것뿐. 비주얼 디자인은 질감이 풍부해요——우편함의 나뭇결, 지붕이 된 커다란 꽃잎, 거미줄 다리 위의 이슬방울——사운드트랙도 적절히 부드럽고 아늑해요. 15달러에 4~6시간, 자신만의 페이스로 작고 섬세한 세계에 머물고 싶은 플레이어에게 최고의 게임이에요.',
    why_de:
      'Mail Time (2023) ist ein gemütlicher 3D-Erkundungs-Plattformer, in dem du als winzige Postbotin in einer Welt-in-einer-Welt mitten im Wald lebst. Du gleitest mit deiner übergroßen Posttasche, erkundest ganze Viertel auf pilzbedeckten Baumkronen und lieferst Briefe an eine Reihe charmanter Kleintier-Bewohner, die alle ihre eigene Persönlichkeit, ihr Zuhause und ihre Geschichte haben, die durch die Post enthüllt wird. Das Spiel hat eine ganz eigene traumhafte Maßstabsgröße – du bist winzig, der Wald ist riesig, und jeder Bereich verbirgt mehr, als er zunächst vermuten lässt. Kein Kampf, kein Scheitern, kein Zeitdruck; die Herausforderung liegt in der Erkundung und darin, herauszufinden, wohin jede Sendung gehört. Das visuelle Design ist reich und haptisch – Holzmaserung an den Briefkästen, überdimensionale Blütenblätter als Dächer, Tautropfen auf Spinnweben-Brücken – und der Soundtrack ist angenehm sanft und gemütlich. Für ca. 15 € und 4–6 Stunden ist es das beste Spiel für alle, die in einem kleinen, detaillierten Kosmos in ihrem eigenen Tempo versinken wollen.',
    tip_en: "Fly everywhere before walking — the glide mechanic is the central joy of the game. Look for elevated launch points on mushroom caps and tree branches; the whole map is accessible by air if you find the right updrafts and landing spots.",
    tip_zh: '在步行之前先飞行——滑翔机制是游戏的核心乐趣。寻找蘑菇帽和树枝上的高处起飞点；如果你找到了正确的上升气流和着陆点，整张地图都可以从空中到达。',
    tip_zhTW: '在步行之前先飛行——滑翔機制是遊戲的核心樂趣。尋找蘑菇帽和樹枝上的高處起飛點；如果你找到了正確的上升氣流和著陸點，整張地圖都可以從空中到達。',
    tip_ja: '歩く前にまず飛ぼう——グライドがこのゲームの中心的な喜び。きのこのかさや木の枝の高いところから飛び立てる場所を探してみて。上昇気流と着地点さえ見つければ、マップ全体を空から旅できる。',
    tip_ko: '걷기 전에 먼저 날아보세요——활강이 이 게임의 핵심 즐거움이에요. 버섯 갓이나 나뭇가지 위 높은 곳에서 출발할 수 있는 지점을 찾아보세요; 올바른 상승 기류와 착지 지점만 찾으면 맵 전체를 하늘에서 다닐 수 있어요.',
    tip_de: 'Fliege überall zuerst, bevor du läufst – das Gleiten ist die zentrale Freude des Spiels. Suche nach erhöhten Abflugpunkten auf Pilzkappen und Ästen; die gesamte Karte ist aus der Luft erreichbar, wenn du die richtigen Aufwinde und Landeplätze findest.',
  },
  loddlenaut: {
    title_en: 'Loddlenaut',
    title_zh: 'Loddlenaut',
    title_zhTW: 'Loddlenaut',
    title_ja: 'ロッドルノート（Loddlenaut）',
    title_ko: '로들노트 (Loddlenaut)',
    title_de: 'Loddlenaut',
    emoji: '🌊',
    tag_en: 'Clean up alien ocean pollution as a solo diver and raise the alien sea creatures that return as the ecosystem recovers — gentle environmental care with biological charm',
    tag_zh: '作为独自潜水员清理外星海洋污染，并养育随着生态系统恢复而归来的外星海洋生物——温和的环境照料与生物魅力',
    tag_zhTW: '作為獨自潛水員清理外星海洋污染，並養育隨著生態系統恢復而歸來的外星海洋生物——溫和的環境照料與生物魅力',
    tag_ja: '一人の潜水士として宇宙の海の汚染を清掃し、生態系が回復するにつれて帰ってくる宇宙の海の生き物たちを育てる——静かな環境ケアと生物的なチャーム',
    tag_ko: '혼자 잠수해 외계 바다 오염을 청소하고, 생태계가 회복되면서 돌아오는 외계 바다 생물들을 키우세요——잔잔한 환경 돌봄과 생물학적 매력',
    tag_de: 'Räum als Solotaucherin außerirdische Meeresverschmutzung auf und züchte die Meereskreaturen, die zurückkehren, wenn sich das Ökosystem erholt – sanfte Umweltpflege mit biologischem Charme',
    platform_en: 'Available on: PC (Steam, Itch.io) — about $15',
    platform_zh: '可在以下平台获取：PC（Steam、Itch.io）——约 15 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、Itch.io）——約 15 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、Itch.io）——約2,000円',
    platform_ko: '플랫폼: PC（Steam, Itch.io）——약 15달러',
    platform_de: 'Erhältlich auf: PC (Steam, Itch.io) – ca. 15 €',
    why_en:
      "Loddlenaut (2023) is one of the most original cozy games of recent years: a solo alien ocean cleanup and creature care game. You play as a lone diver on an alien ocean planet, cleaning goop and pollution from the seafloor using a pressure washer-like tool, and as the environment recovers, Loddles — small round alien sea creatures with customizable biology — begin appearing and can be raised as companions. Each Loddle can be fed specific foods to customize their body shape, color, and features over time; the biological customization is gentle and endlessly surprising. The cleaning loop is deeply satisfying (similar to PowerWash Simulator's before-and-after clarity), the underwater alien environment is beautifully rendered with bioluminescent coral and strange flora, and the Loddles are genuinely charming in their rounded alien way. At $15, it is a complete experience that rewards patient players who appreciate environmental care and creature nurturing in a package unlike anything else in the cozy genre.",
    why_zh:
      'Loddlenaut（2023 年）是近年来最具原创性的 cozy 游戏之一：一款独自的外星海洋清洁和生物养育游戏。你扮演一位在外星海洋星球上的孤独潜水员，用类似压力清洗机的工具清理海底的污泥和污染，随着环境恢复，Loddles——拥有可定制生物学的小圆形外星海洋生物——开始出现，可以作为伴侣养育。每只 Loddle 都可以通过特定食物来定制它们随时间变化的体型、颜色和特征；生物定制温和而令人愉快地不断带来惊喜。清洁循环深度令人满足（类似于电力清洗模拟器的前后对比清晰感），水下外星环境以生物发光珊瑚和奇异植物精美渲染，Loddles 以其圆润的外星方式真正迷人。15 美元，对于欣赏环境照料和生物养育的耐心玩家来说，这是一次与 cozy 类型中其他任何游戏都不同的完整体验。',
    why_zhTW:
      'Loddlenaut（2023 年）是近年來最具原創性的 cozy 遊戲之一：一款獨自的外星海洋清潔和生物養育遊戲。你扮演一位在外星海洋星球上的孤獨潛水員，用類似壓力清洗機的工具清理海底的污泥和污染，隨著環境恢復，Loddles——擁有可定製生物學的小圓形外星海洋生物——開始出現，可以作為夥伴養育。每隻 Loddle 都可以透過特定食物來定製它們隨時間變化的體型、顏色和特徵；生物定製溫和而令人愉快地不斷帶來驚喜。清潔循環深度令人滿足（類似於電力清洗模擬器的前後對比清晰感），水下外星環境以生物發光珊瑚和奇異植物精美渲染，Loddles 以其圓潤的外星方式真正迷人。15 美元，對於欣賞環境照料和生物養育的耐心玩家來說，這是一次與 cozy 類型中其他任何遊戲都不同的完整體驗。',
    why_ja:
      'Loddlenaut（2023年）は近年最も独自性の高いコージーゲームのひとつ：一人で宇宙の海の清掃と生き物のお世話をするゲーム。宇宙の海洋惑星にいる孤独な潜水士として、圧力洗浄機のようなツールで海底の汚れや汚染を清掃する。環境が回復するにつれて、ロドル（カスタマイズ可能な生態を持つ小さな丸い宇宙海洋生物）たちが現れ、コンパニオンとして育てられるようになる。各ロドルには特定の食べ物を与えることで、体型や色、特徴を時間をかけて変化させられる生物カスタマイズ要素があり、穏やかで驚きに満ちている。清掃ループは深く満足感があり（パワーウォッシュシミュレーターのビフォーアフターに似た爽快感）、水中の宇宙環境は生物発光するサンゴや奇妙な植物が美しくレンダリングされ、ロドルたちは丸くてエイリアンらしい愛らしさを持っている。約2,000円で、環境ケアと生き物の育成を楽しめる完結した体験——コージージャンルの他のどのゲームとも違うパッケージ。',
    why_ko:
      'Loddlenaut（2023）는 최근 몇 년 중 가장 독창적인 코지 게임 중 하나예요: 혼자 하는 외계 바다 청소와 생물 육성 게임. 외계 해양 행성의 외로운 잠수사로서, 압력 세척기 같은 도구로 해저의 오염물을 청소하다 보면 환경이 회복되면서 로들（커스터마이징 가능한 생태를 가진 작고 둥근 외계 해양 생물）들이 나타나 동반자로 키울 수 있게 돼요. 각 로들에게 특정 먹이를 주면 체형, 색깔, 특징이 시간에 따라 변하는 생물 커스터마이징이 있는데, 부드럽고 끝없이 새로운 발견이 있어요. 청소 루프는 깊이 만족스럽고（파워워시 시뮬레이터의 전/후 선명함과 비슷한 느낌）, 수중 외계 환경은 생물발광 산호와 기묘한 식물로 아름답게 렌더링되어 있어요. 15달러에 환경 돌봄과 생물 육성을 코지 장르의 어떤 것과도 다른 방식으로 담아낸 완결된 경험이에요.',
    why_de:
      'Loddlenaut (2023) ist eines der originellsten Cozy Games der letzten Jahre: ein Solo-Alien-Meeressäuberungsspiel mit Kreaturen-Pflege. Du spielst als einsame Taucherin auf einem fremden Ozean-Planeten und reinigst mit einem druckwascher-artigen Werkzeug Schleim und Verschmutzung vom Meeresgrund. Während sich die Umgebung erholt, beginnen Loddles – kleine, runde außerirdische Seewesen mit anpassbarer Biologie – zu erscheinen und können als Gefährten aufgezogen werden. Jeder Loddle kann durch bestimmte Futtermittel in Körperform, Farbe und Eigenschaften über die Zeit angepasst werden; das Biologie-Customizing ist sanft und immer wieder überraschend. Die Reinigungs-Schleife ist tief befriedigend (ähnlich der Vorher-Nachher-Klarheit von PowerWash Simulator), die Unterwasser-Alien-Umgebung ist wunderschön mit biolumineszenten Korallen und fremdartigem Pflanzenleben gerendert, und die Loddles sind in ihrer rundlichen Alien-Art wirklich liebenswert. Für ca. 15 € ist es ein vollständiges Erlebnis, das geduldige Spieler belohnt, die Umweltpflege und Kreaturen-Aufzucht in einem Paket genießen, das sich von allem anderen im Cozy-Genre unterscheidet.',
    tip_en: "Focus on cleaning complete sections before moving on — the visual payoff of a fully cleaned area is significant, and it also concentrates the food drops that attract more Loddles to the recovered zone. Feed your Loddles the same food type repeatedly to push a single trait further.",
    tip_zh: '在继续之前专注于清洁完整的区域——完全清洁区域的视觉回报是显著的，它也会集中食物掉落，吸引更多 Loddles 到恢复区域。反复给你的 Loddles 喂食同一种类型的食物，以进一步推动单一特征。',
    tip_zhTW: '在繼續之前專注於清潔完整的區域——完全清潔區域的視覺回報是顯著的，它也會集中食物掉落，吸引更多 Loddles 到恢復區域。反覆給你的 Loddles 餵食同一種類型的食物，以進一步推動單一特徵。',
    tip_ja: '先に進む前に一区画ずつ完璧に清掃しよう——完全に清掃されたエリアの見た目の達成感は大きく、食べ物のドロップも集中するので、回復した場所にもっと多くのロドルが集まってくる。同じ種類の食べ物を繰り返し与えると、一つの特徴をどんどん伸ばすことができる。',
    tip_ko: '한 구역을 완전히 청소하고 넘어가는 걸 추천해요——완전히 청소된 구역의 시각적 보람이 상당히 크고, 먹이 드롭도 집중되어서 더 많은 로들이 회복된 구역으로 모여들어요. 같은 종류의 먹이를 반복해서 주면 한 가지 특성을 더 극단적으로 키울 수 있어요.',
    tip_de: 'Reinige immer eine ganze Zone, bevor du weitermachst – der visuelle Lohneffekt eines vollständig gesäuberten Bereichs ist enorm, und es konzentriert auch die Futter-Drops, sodass mehr Loddles in die erholte Zone kommen. Füttere deine Loddles immer wieder mit derselben Futtersorte, um eine einzelne Eigenschaft weiter zu pushen.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { duck: 0, donut: 0, mailtime: 0, loddlenaut: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyWeirdGamesQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-weird-games`
    const shareText = getLoc(
      `Cozy 难解释游戏测验：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My impossible-to-explain cozy game: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `Cozy 難解釋遊戲測驗：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `説明できないコージーゲーム診断：「${result.title_ja}」！${result.tag_ja}。あなたも試して：${url}`,
      `설명하기 어려운 코지 게임 테스트：「${result.title_ko}」！${result.tag_ko}。나도 해보기：${url}`,
      `Mein unerklärliches Cozy-Game: ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`,
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
              {getLoc('上手小贴士：', 'Getting started: ', '上手小貼士：', 'はじめるコツ：', '시작 팁: ', 'Einstiegstipp: ')}
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
            '哪款最难向朋友解释的 Cozy 游戏最适合你？',
            'Which Impossible-to-Explain Cozy Game Is Perfect for You?',
            '哪款最難向朋友解釋的 Cozy 遊戲最適合你？',
            '友達に説明できないコージーゲーム、あなたに合うのはどれ？',
            '친구에게 설명하기 가장 어려운 코지 게임, 당신에게 맞는 건?',
            'Welches unerklärliche Cozy Game passt perfekt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从橡皮鸭模拟器、甜甜圈县城、Mail Time、Loddlenaut 中找到你的奇异 Cozy 游戏',
            '6 questions to match you with Placid Plastic Duck Simulator, Donut County, Mail Time, or Loddlenaut',
            '6 個問題，從橡皮鴨模擬器、甜甜圈縣城、Mail Time、Loddlenaut 中找到你的奇異 Cozy 遊戲',
            '6つの質問で、Placid Plastic Duck Simulator・Donut County・Mail Time・Loddlenautからあなたの一本を見つけよう',
            '6가지 질문으로 Placid Plastic Duck Simulator, Donut County, Mail Time, Loddlenaut 중 나에게 맞는 게임 찾기',
            '6 Fragen, um dein Spiel zu finden: Placid Plastic Duck Simulator, Donut County, Mail Time oder Loddlenaut',
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
          '找到我的奇异 Cozy 游戏',
          'Find My Unexplainable Cozy Game',
          '找到我的奇異 Cozy 遊戲',
          '私のコージーゲームを見つける',
          '나의 코지 게임 찾기',
          'Mein Cozy Game finden',
        )}
      </button>
    </div>
  )
}
