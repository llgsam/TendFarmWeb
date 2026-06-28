'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'firewatch' | 'edith-finch' | 'short-hike' | 'abzu'

function ShareButton({ text, locale }: { text: string; locale: string }) {
  const [copied, setCopied] = useState(false)
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    }
  }
  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copied
          ? getLoc('✓ 已复制！', '✓ Copied!', '✓ 已複製！', '✓ コピーしました！', '✓ 복사되었습니다!', '✓ Kopiert!')
          : getLoc('📋 复制结果', '📋 Copy result', '📋 複製結果', '📋 コピーする', '📋 결과 복사', '📋 Ergebnis kopieren')}
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
    q_en: 'What kind of world do you most want to get lost in right now?',
    q_zh: '你现在最想迷失在哪种世界中？',
    q_zhTW: '你現在最想迷失在哪種世界中？',
    q_ja: '今、最も迷い込みたい世界はどれですか？',
    q_ko: '지금 가장 빠져들고 싶은 세계는 어떤 곳인가요?',
    q_de: 'In welcher Welt möchtest du dich gerade am liebsten verlieren?',
    options: [
      {
        en: 'A vast Wyoming wilderness — towering pines, canyon vistas, total isolation',
        zh: '广阔的怀俄明荒野——参天松树、峡谷美景、完全的孤寂',
        zhTW: '廣闊的懷俄明荒野——參天松樹、峽谷美景、完全的孤寂',
        ja: 'ワイオミングの広大な荒野——そびえ立つ松の木、渓谷の絶景、完全なる孤独',
        ko: '드넓은 와이오밍 황야—우뚝 솟은 소나무, 협곡의 절경, 완전한 고독',
        de: 'Eine weite Wyoming-Wildnis — mächtige Kiefern, Schluchtenblicke, totale Einsamkeit',
        type: 'firewatch',
      },
      {
        en: 'The rooms of an old house full of secret passages and lives that ended too soon',
        zh: '一座老房子的各个房间，充满秘密通道和过早结束的生命',
        zhTW: '一座老房子的各個房間，充滿秘密通道和過早結束的生命',
        ja: '秘密の通路と早世した人々の痕跡が残る古い家の部屋々',
        ko: '비밀 통로와 너무 일찍 끝나버린 삶들로 가득한 오래된 집의 방들',
        de: 'Die Zimmer eines alten Hauses voller Geheimgänge und zu früh beendeter Leben',
        type: 'edith-finch',
      },
      {
        en: 'A sunlit mountain with gentle slopes, hidden beaches, and friendly animals everywhere',
        zh: '一座阳光照耀的山，有平缓的坡道、隐藏的海滩，以及随处可见的友好动物',
        zhTW: '一座陽光照耀的山，有平緩的坡道、隱藏的海灘，以及隨處可見的友好動物',
        ja: '穏やかな斜面と隠れたビーチ、そこら中にいる友好的な動物たちがいる、陽光あふれる山',
        ko: '완만한 경사와 숨겨진 해변, 곳곳에 있는 친근한 동물들이 있는 햇살 가득한 산',
        de: 'Ein sonniger Berg mit sanften Hängen, versteckten Stränden und freundlichen Tieren überall',
        type: 'short-hike',
      },
      {
        en: 'A luminous coral ocean with impossible ruins and creatures of pure light',
        zh: '一片发光的珊瑚海洋，有不可思议的废墟和纯粹光芒的生物',
        zhTW: '一片發光的珊瑚海洋，有不可思議的廢墟和純粹光芒的生物',
        ja: '輝くサンゴの海——信じられない遺跡と純粋な光の生き物が広がる世界',
        ko: '믿기 어려운 폐허와 순수한 빛의 생물들이 있는 빛나는 산호 바다',
        de: 'Ein leuchtender Korallenozean mit unmöglichen Ruinen und Kreaturen aus reinem Licht',
        type: 'abzu',
      },
    ],
  },
  {
    q_en: 'How important is human connection or dialogue in this experience?',
    q_zh: '人际联系或对话在这段体验中有多重要？',
    q_zhTW: '人際連結或對話在這段體驗中有多重要？',
    q_ja: 'この体験において、人とのつながりや会話はどれくらい重要ですか？',
    q_ko: '이 경험에서 인간적 연결이나 대화는 얼마나 중요한가요?',
    q_de: 'Wie wichtig sind menschliche Verbindungen oder Dialoge für dieses Erlebnis?',
    options: [
      {
        en: 'Very — I want meaningful conversations with another character that change how I feel',
        zh: '非常重要——我想要与另一个角色进行改变我感受的有意义对话',
        zhTW: '非常重要——我想要與另一個角色進行改變我感受的有意義對話',
        ja: 'とても重要——別のキャラクターと意味のある会話をして、気持ちが変わる体験がしたい',
        ko: '매우 중요해요—다른 캐릭터와 의미 있는 대화를 나누며 감정이 변하는 경험을 하고 싶어요',
        de: 'Sehr wichtig — ich will bedeutungsvolle Gespräche mit einem anderen Charakter, die mich wirklich berühren',
        type: 'firewatch',
      },
      {
        en: 'Through stories — I want to discover other people\'s lives and feel their weight',
        zh: '通过故事——我想发现其他人的生活并感受其分量',
        zhTW: '透過故事——我想發現其他人的生活並感受其分量',
        ja: '物語を通して——他の人々の人生を発見し、その重さを感じたい',
        ko: '이야기를 통해서—다른 사람들의 삶을 발견하고 그 무게를 느끼고 싶어요',
        de: 'Durch Geschichten — ich will das Leben anderer Menschen entdecken und ihre Schwere spüren',
        type: 'edith-finch',
      },
      {
        en: 'Light — friendly chats with villagers, but mostly I want free exploration',
        zh: '轻度——和村民友好聊天，但我主要想要自由探索',
        zhTW: '輕度——和村民友好聊天，但我主要想要自由探索',
        ja: '軽め——村人と気軽におしゃべりしつつ、基本は自由に探索したい',
        ko: '가볍게—마을 사람들과 친근하게 대화하되, 주로 자유롭게 탐험하고 싶어요',
        de: 'Leicht — nette Gespräche mit Dorfbewohnern, aber hauptsächlich will ich frei erkunden',
        type: 'short-hike',
      },
      {
        en: 'None — I want a purely wordless, musical experience with no dialogue at all',
        zh: '不需要——我想要完全无语言的、音乐性的体验，完全没有对话',
        zhTW: '不需要——我想要完全無語言的、音樂性的體驗，完全沒有對話',
        ja: '必要なし——セリフ一切なし、言葉のない音楽的な体験がしたい',
        ko: '필요 없어요—대화가 전혀 없는 순수하게 음악적인 경험을 원해요',
        de: 'Gar keiner — ich will ein rein wortloses, musikalisches Erlebnis ohne jegliche Dialoge',
        type: 'abzu',
      },
    ],
  },
  {
    q_en: 'What emotional tone are you looking for?',
    q_zh: '你在寻找什么情感基调？',
    q_zhTW: '你在尋找什麼情感基調？',
    q_ja: 'どんな感情的な雰囲気を求めていますか？',
    q_ko: '어떤 감정적 분위기를 원하시나요?',
    q_de: 'Welchen emotionalen Grundton suchst du?',
    options: [
      {
        en: 'Bittersweet — a story about isolation, connection, and things unsaid',
        zh: '苦乐参半——一个关于孤立、联系和未说出口的话的故事',
        zhTW: '苦樂參半——一個關於孤立、聯繫和未說出口的話的故事',
        ja: '甘くて切ない——孤独、つながり、言えなかった言葉についての物語',
        ko: '달콤씁쓸한—고립, 연결, 그리고 말하지 못한 것들에 관한 이야기',
        de: 'Bittersüß — eine Geschichte über Isolation, Verbindung und unausgesprochene Dinge',
        type: 'firewatch',
      },
      {
        en: 'Melancholy and wonder — a meditation on mortality and what lives leave behind',
        zh: '忧郁和惊奇——对死亡率和生命留下什么的沉思',
        zhTW: '憂鬱和驚奇——對死亡率和生命留下什麼的沉思',
        ja: '哀愁と驚き——死というものと、人生が残すものへの省察',
        ko: '우울함과 경이로움—죽음과 삶이 남기는 것에 대한 성찰',
        de: 'Melancholie und Staunen — eine Meditation über Sterblichkeit und das, was Leben hinterlässt',
        type: 'edith-finch',
      },
      {
        en: 'Warm and light — I just want to feel good and enjoy a beautiful place',
        zh: '温暖而轻盈——我只想感觉良好并享受美丽的地方',
        zhTW: '溫暖而輕盈——我只想感覺良好並享受美麗的地方',
        ja: '温かくて軽やか——ただ気持ちよく、美しい場所を楽しみたい',
        ko: '따뜻하고 가볍게—그냥 기분 좋게, 아름다운 곳을 즐기고 싶어요',
        de: 'Warm und leicht — ich will mich einfach gut fühlen und einen schönen Ort genießen',
        type: 'short-hike',
      },
      {
        en: 'Transcendent — I want to feel small and awed by something vast and beautiful',
        zh: '超然——我想感到渺小，并对宏大而美丽的事物肃然起敬',
        zhTW: '超然——我想感到渺小，並對宏大而美麗的事物肅然起敬',
        ja: '超越的——広大で美しいものに圧倒され、自分の小ささを感じたい',
        ko: '초월적인—광대하고 아름다운 것에 압도되어 나 자신이 작게 느껴지고 싶어요',
        de: 'Transzendent — ich will mich klein fühlen und von etwas Großem und Schönem überwältigt werden',
        type: 'abzu',
      },
    ],
  },
  {
    q_en: 'How much do you enjoy a sense of mystery or unease in your games?',
    q_zh: '你多喜欢游戏中的神秘感或不安感？',
    q_zhTW: '你多喜歡遊戲中的神秘感或不安感？',
    q_ja: 'ゲームの中に神秘感や不穏な感覚があるのはどれくらい好きですか？',
    q_ko: '게임에서 신비감이나 불안감을 얼마나 즐기시나요?',
    q_de: 'Wie sehr magst du ein Gefühl von Geheimnis oder Unbehagen in deinen Spielen?',
    options: [
      {
        en: 'A lot — I love when a peaceful game hides something unsettling underneath',
        zh: '非常喜欢——我喜欢当平和的游戏在下面隐藏不安的东西',
        zhTW: '非常喜歡——我喜歡當平和的遊戲在下面隱藏不安的東西',
        ja: 'とても好き——穏やかなゲームの裏に不穏な何かが潜んでいるのが大好き',
        ko: '정말 좋아요—평화로운 게임 아래 불안한 무언가가 숨어 있는 걸 좋아해요',
        de: 'Sehr gerne — ich liebe es, wenn ein friedliches Spiel im Hintergrund etwas Beunruhigendes verbirgt',
        type: 'firewatch',
      },
      {
        en: 'Moderate — the game is unsettling, but in a way that feels meaningful, not scary',
        zh: '适中——游戏令人不安，但以一种感觉有意义而不是可怕的方式',
        zhTW: '適中——遊戲令人不安，但以一種感覺有意義而不是可怕的方式',
        ja: '程々に——ゲームは不穏だけど、怖いというより意味のある形で',
        ko: '적당히—게임이 불안하긴 하지만, 무서운 게 아니라 의미 있게 느껴지는 방식으로',
        de: 'Mäßig — das Spiel ist beunruhigend, aber auf eine bedeutungsvolle, nicht beängstigende Weise',
        type: 'edith-finch',
      },
      {
        en: 'Not much — I want zero unease, just pure gentle joy',
        zh: '不多——我想要零不安感，只有纯粹温和的快乐',
        zhTW: '不多——我想要零不安感，只有純粹溫和的快樂',
        ja: 'あまりいらない——不穏な感覚ゼロ、純粋で穏やかな楽しさだけがいい',
        ko: '별로 없어요—불안감 없이 순수하고 부드러운 즐거움만 원해요',
        de: 'Kaum — ich will null Unbehagen, nur pure sanfte Freude',
        type: 'short-hike',
      },
      {
        en: 'None — I want serene, flowing peace with no tension at all',
        zh: '没有——我想要宁静、流动的平和，完全没有紧张感',
        zhTW: '沒有——我想要寧靜、流動的平和，完全沒有緊張感',
        ja: '全くいらない——穏やかで流れるような平和を、緊張感なしで感じたい',
        ko: '전혀요—긴장감 없이 고요하고 흐르는 듯한 평화를 원해요',
        de: 'Keines — ich will ruhigen, fließenden Frieden ohne jegliche Spannung',
        type: 'abzu',
      },
    ],
  },
  {
    q_en: 'How long do you want this experience to be?',
    q_zh: '你希望这段体验持续多长时间？',
    q_zhTW: '你希望這段體驗持續多長時間？',
    q_ja: 'このゲームはどのくらいの長さを求めていますか？',
    q_ko: '이 경험이 얼마나 길기를 원하시나요?',
    q_de: 'Wie lange soll dieses Erlebnis sein?',
    options: [
      {
        en: '4-6 hours — enough to really inhabit a world and feel a complete story',
        zh: '4-6 小时——足以真正居住在一个世界中并感受一个完整的故事',
        zhTW: '4-6 小時——足以真正居住在一個世界中並感受一個完整的故事',
        ja: '4〜6時間——世界に本当に住み着いて、完結した物語を感じるのに十分な長さ',
        ko: '4-6시간—세계에 진정으로 머물며 완결된 이야기를 느끼기에 충분한 시간',
        de: '4-6 Stunden — genug, um wirklich in einer Welt zu leben und eine vollständige Geschichte zu erleben',
        type: 'firewatch',
      },
      {
        en: '2-3 hours — brief but with a weight that stays with you for much longer',
        zh: '2-3 小时——短暂但带着比游戏本身持续更长时间的重量',
        zhTW: '2-3 小時——短暫但帶著比遊戲本身持續更長時間的重量',
        ja: '2〜3時間——短いけどゲームが終わった後もずっと心に残る重さがある',
        ko: '2-3시간—짧지만 게임이 끝난 후에도 훨씬 오래 남는 묵직함이 있는',
        de: '2-3 Stunden — kurz, aber mit einem Gewicht, das noch viel länger bei dir bleibt',
        type: 'edith-finch',
      },
      {
        en: '1-4 hours — I want to play at my own pace with no pressure to finish quickly',
        zh: '1-4 小时——我想按自己的节奏玩，没有快速完成的压力',
        zhTW: '1-4 小時——我想按自己的節奏玩，沒有快速完成的壓力',
        ja: '1〜4時間——自分のペースで、急いで終わらせるプレッシャーなしで遊びたい',
        ko: '1-4시간—내 페이스대로, 빨리 끝내야 한다는 압박 없이 플레이하고 싶어요',
        de: '1-4 Stunden — ich will in meinem eigenen Tempo spielen, ohne Druck, schnell fertig zu werden',
        type: 'short-hike',
      },
      {
        en: '1-2 hours — a complete sensory journey that does not overstay its welcome',
        zh: '1-2 小时——一段完整的感官旅程，不会让人觉得过长',
        zhTW: '1-2 小時——一段完整的感官旅程，不會讓人覺得過長',
        ja: '1〜2時間——長すぎず、完結した感覚の旅',
        ko: '1-2시간—너무 길지 않은, 완결된 감각적 여정',
        de: '1-2 Stunden — eine vollständige sensorische Reise, die nicht zu lang wird',
        type: 'abzu',
      },
    ],
  },
  {
    q_en: 'What do you want to feel when the game ends?',
    q_zh: '你希望游戏结束时感受到什么？',
    q_zhTW: '你希望遊戲結束時感受到什麼？',
    q_ja: 'ゲームが終わったとき、どんな気持ちになりたいですか？',
    q_ko: '게임이 끝날 때 어떤 감정을 느끼고 싶으신가요?',
    q_de: 'Wie willst du dich fühlen, wenn das Spiel endet?',
    options: [
      {
        en: 'Like I was there — the world felt so real I could smell the smoke',
        zh: '就像我曾在那里——世界感觉如此真实，我几乎能闻到烟雾的味道',
        zhTW: '就像我曾在那裡——世界感覺如此真實，我幾乎能聞到煙霧的味道',
        ja: 'そこにいたような感覚——煙の匂いまで感じられそうなほどリアルな世界だった',
        ko: '거기 있었던 것 같은 느낌—연기 냄새까지 맡을 수 있을 것 같을 만큼 진짜 같은 세계',
        de: 'Als wäre ich dabei gewesen — die Welt fühlte sich so real an, dass ich den Rauch fast riechen konnte',
        type: 'firewatch',
      },
      {
        en: 'Changed — this story made me think about my own life and mortality differently',
        zh: '被改变了——这个故事让我以不同方式思考自己的生活和死亡',
        zhTW: '被改變了——這個故事讓我以不同方式思考自己的生活和死亡',
        ja: '変わった——この物語が自分の人生と死生観を変えてくれた',
        ko: '변화된 느낌—이 이야기가 나 자신의 삶과 죽음에 대해 다르게 생각하게 해줬어요',
        de: 'Verändert — diese Geschichte hat mich dazu gebracht, über mein eigenes Leben und die Sterblichkeit anders zu denken',
        type: 'edith-finch',
      },
      {
        en: 'Replenished — I feel lighter than when I started, like a good afternoon outside',
        zh: '被补充了——我感觉比开始时更轻盈，就像一个美好的午后户外时光',
        zhTW: '被補充了——我感覺比開始時更輕盈，就像一個美好的午後戶外時光',
        ja: '満たされた——始める前より軽くなった感じ、晴れた午後を外で過ごしたみたいに',
        ko: '충전된 느낌—시작할 때보다 더 가벼워진 느낌, 좋은 오후를 밖에서 보낸 것처럼',
        de: 'Aufgetankt — ich fühle mich leichter als vorher, wie nach einem schönen Nachmittag im Freien',
        type: 'short-hike',
      },
      {
        en: 'Expanded — the world is vast and beautiful and I am glad to be in it',
        zh: '被扩展了——世界广阔而美丽，我很高兴身处其中',
        zhTW: '被擴展了——世界廣闊而美麗，我很高興身處其中',
        ja: '広がった——世界は広大で美しく、その中にいられてよかったと思える',
        ko: '확장된 느낌—세상은 광대하고 아름다우며, 그 속에 있어 기쁘다는 감정',
        de: 'Erweitert — die Welt ist groß und schön, und ich bin froh, darin zu sein',
        type: 'abzu',
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
  firewatch: {
    title_en: 'Firewatch',
    title_zh: 'Firewatch（看火人）',
    title_zhTW: 'Firewatch（看火人）',
    title_ja: 'Firewatch（ファイアウォッチ）',
    title_ko: 'Firewatch（파이어워치）',
    title_de: 'Firewatch',
    emoji: '🌲',
    tag_en: 'A Wyoming wilderness mystery — stunning visuals, unforgettable dialogue, bittersweet ending',
    tag_zh: '怀俄明荒野悬疑——惊艳视觉、难忘对话、苦乐参半的结局',
    tag_zhTW: '懷俄明荒野懸疑——驚艷視覺、難忘對話、苦樂參半的結局',
    tag_ja: 'ワイオミングの荒野ミステリー——息をのむビジュアル、忘れられない会話、甘くて切ない結末',
    tag_ko: '와이오밍 황야 미스터리—놀라운 비주얼, 잊을 수 없는 대화, 달콤씁쓸한 엔딩',
    tag_de: 'Ein Wyoming-Wildnis-Mysterium — atemberaubende Optik, unvergessliche Dialoge, bittersüßes Ende',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_ko: '플랫폼: PC(Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    why_en:
      "Firewatch is one of the most visually stunning games ever made. You play as Henry, a man escaping his life who takes a summer job as a fire lookout in the Wyoming backcountry. Your only connection to another human is your supervisor Delilah, reached by walkie-talkie — and your relationship with her, built entirely through dialogue choices over the course of a summer, is one of the most genuinely felt relationships in any game. The wilderness itself is rendered in painterly, impressionistic beauty. And then, gradually, something strange starts happening in the forest. Firewatch is 4-6 hours long, bittersweet in ways you will not expect, and designed to be experienced in one or two sittings. It has one of the best voice acting performances ever recorded in a game. Campo Santo's masterwork.",
    why_zh:
      '看火人是有史以来视觉上最震撼的游戏之一。你扮演 Henry，一个逃离生活的人，在怀俄明内陆担任夏季护林瞭望员。你与另一个人唯一的联系是你的主管 Delilah，通过对讲机联系——而你与她的关系，完全通过整个夏天的对话选择建立，是任何游戏中最真实感受到的关系之一。荒野本身以绘画般的印象派美感呈现。然后，渐渐地，森林里开始发生奇怪的事情。看火人时长 4-6 小时，以你意想不到的方式苦乐参半，设计用于一到两次连续游玩体验。它拥有游戏中有史以来录制的最佳配音表演之一。Campo Santo 的杰作。',
    why_zhTW:
      '看火人是有史以來視覺上最震撼的遊戲之一。你扮演 Henry，一個逃離生活的人，在懷俄明內陸擔任夏季護林瞭望員。你與另一個人唯一的聯繫是你的主管 Delilah，透過對講機聯繫——而你與她的關係，完全透過整個夏天的對話選擇建立，是任何遊戲中最真實感受到的關係之一。荒野本身以繪畫般的印象派美感呈現。然後，漸漸地，森林裡開始發生奇怪的事情。看火人時長 4-6 小時，以你意想不到的方式苦樂參半，設計用於一到兩次連續遊玩體驗。它擁有遊戲中有史以來錄製的最佳配音表演之一。Campo Santo 的傑作。',
    why_ja:
      'Firewatchは史上最も視覚的に美しいゲームのひとつです。主人公のヘンリーは人生から逃げ出し、ワイオミングの奥地で夏の火の見番を務めます。唯一の人間とのつながりは上司のデライラ——トランシーバー越しに連絡を取り合うだけ——そして夏の間の会話の選択肢だけで築かれるその関係は、ゲーム史上最もリアルに感じられる人間関係のひとつです。荒野自体が絵画のような印象派の美しさで描かれています。そしてやがて、森の中で奇妙なことが起き始めます。プレイ時間は4〜6時間。予想を裏切る苦くて甘い展開で、1〜2回通しでプレイするよう設計されています。ゲーム史上最高峰の声優パフォーマンスのひとつ。Campo Santoの傑作です。',
    why_ko:
      'Firewatch는 역대 가장 시각적으로 인상적인 게임 중 하나입니다. 주인공 헨리는 삶을 피해 와이오밍 오지에서 여름 산불 감시원으로 일합니다. 다른 사람과의 유일한 연결은 무전기로 연락하는 상사 델라일라——그리고 여름 내내 대화 선택지로만 쌓이는 그 관계는 어느 게임에서도 가장 진실되게 느껴지는 인간관계 중 하나입니다. 황야 자체가 회화 같은 인상주의 아름다움으로 표현됩니다. 그러다 조금씩 숲 속에서 이상한 일이 일어나기 시작합니다. 플레이타임 4-6시간, 예상치 못한 방식으로 달콤씁쓸하며, 한두 번에 완주하도록 설계되었습니다. 게임 역사상 최고의 성우 연기 중 하나를 담고 있습니다. Campo Santo의 걸작입니다.',
    why_de:
      'Firewatch ist eines der visuell beeindruckendsten Spiele aller Zeiten. Du spielst Henry, einen Mann der seinem Leben entflieht und einen Sommerjob als Feuerwächter in der Wyoming-Wildnis annimmt. Deine einzige Verbindung zu einem anderen Menschen ist deine Vorgesetzte Delilah, erreichbar per Walkie-Talkie — und eure Beziehung, die sich vollständig durch Dialogentscheidungen über den Sommer aufbaut, gehört zu den am stärksten gefühlten Beziehungen in der Spielegeschichte. Die Wildnis selbst ist in malerischer, impressionistischer Schönheit dargestellt. Und dann beginnt im Wald langsam etwas Seltsames zu geschehen. Firewatch ist 4-6 Stunden lang, auf eine unerwartete Art bittersüß, und dafür gedacht, in ein bis zwei Sitzungen erlebt zu werden. Es bietet eine der besten Synchronsprecherleistungen, die je in einem Spiel aufgenommen wurden. Das Meisterwerk von Campo Santo.',
    tip_en: "Play with headphones — the ambient wilderness sounds and Olly Moss's visual design create a sensory experience that deserves full attention.",
    tip_zh: '戴耳机玩——环境荒野音效和 Olly Moss 的视觉设计创造了一种值得全神贯注的感官体验。',
    tip_zhTW: '戴耳機玩——環境荒野音效和 Olly Moss 的視覺設計創造了一種值得全神貫注的感官體驗。',
    tip_ja: 'ヘッドフォンでプレイして——環境音とOlly Mossのビジュアルデザインが生み出す感覚体験は、じっくり向き合う価値があります。',
    tip_ko: '헤드폰을 끼고 플레이하세요——주변 자연 소리와 Olly Moss의 비주얼 디자인이 만들어내는 감각 경험은 온전히 집중할 가치가 있습니다.',
    tip_de: "Spiel mit Kopfhörern — die Umgebungsgeräusche der Wildnis und Olly Moss' visuelles Design schaffen ein Sinneserlebnis, das volle Aufmerksamkeit verdient.",
  },
  'edith-finch': {
    title_en: 'What Remains of Edith Finch',
    title_zh: '艾迪芬奇的记忆',
    title_zhTW: '艾迪芬奇的記憶',
    title_ja: 'What Remains of Edith Finch（エディス・フィンチの記憶）',
    title_ko: 'What Remains of Edith Finch（에디스 핀치의 기억）',
    title_de: 'What Remains of Edith Finch',
    emoji: '🏚️',
    tag_en: 'A walking sim about a family of deaths — the most acclaimed story game of the decade',
    tag_zh: '关于一个死亡家族的步行模拟游戏——十年来最受好评的故事游戏',
    tag_zhTW: '關於一個死亡家族的步行模擬遊戲——十年來最受好評的故事遊戲',
    tag_ja: '呪われた一族の死にまつわるウォーキングシム——10年で最も絶賛されたストーリーゲーム',
    tag_ko: '죽음이 가득한 가족의 이야기를 담은 워킹 시뮬레이터——10년 최고의 스토리 게임',
    tag_de: 'Ein Walking Sim über eine Familie voller Tode — das meistgelobte Spiel der Dekade',
    platform_en: 'Available on: PC (Steam), PlayStation 4/5, Xbox (Game Pass), Nintendo Switch',
    platform_zh: '可在以下平台获取：PC（Steam）、PlayStation 4/5、Xbox（Game Pass）、Nintendo Switch',
    platform_zhTW: '可在以下平台取得：PC（Steam）、PlayStation 4/5、Xbox（Game Pass）、Nintendo Switch',
    platform_ja: '対応プラットフォーム：PC（Steam）、PlayStation 4/5、Xbox（Game Pass）、Nintendo Switch',
    platform_ko: '플랫폼: PC(Steam), PlayStation 4/5, Xbox(Game Pass), Nintendo Switch',
    platform_de: 'Erhältlich auf: PC (Steam), PlayStation 4/5, Xbox (Game Pass), Nintendo Switch',
    why_en:
      "What Remains of Edith Finch won the BAFTA for Best Game and is consistently cited as one of the greatest narrative games ever made. You return to your family's sprawling, impossibly layered house as the last surviving Finch — every family member died under strange or tragic circumstances, and each room tells their story. Each chapter plays completely differently: one is a first-person bathtub fantasy, one is a comic strip, one is you operating a cannery knife while daydreaming. The game is 2-3 hours long but the stories stay with you far longer. It is not cozy in the traditional sense — it is about mortality and family — but it is one of those games that proves what games can do as a medium. Available on Xbox Game Pass.",
    why_zh:
      '艾迪芬奇的记忆获得了英国影视艺术学院最佳游戏奖，并被一致认为是有史以来最伟大的叙事游戏之一。你作为最后幸存的芬奇家族成员回到家族那座错综复杂的房子——每个家族成员都在奇怪或悲剧性的情况下死亡，每个房间都讲述他们的故事。每章的玩法完全不同：一章是第一人称浴缸幻想，一章是漫画形式，一章是你在做白日梦时操作罐头厂刀具。游戏时长 2-3 小时，但故事留存的时间远比这更长。它在传统意义上并不温馨——它关于死亡率和家庭——但它是那些证明游戏作为媒介能做什么的游戏之一。可在 Xbox Game Pass 上获取。',
    why_zhTW:
      '艾迪芬奇的記憶獲得了英國影視藝術學院最佳遊戲獎，並被一致認為是有史以來最偉大的敘事遊戲之一。你作為最後倖存的芬奇家族成員回到家族那座錯綜複雜的房子——每個家族成員都在奇怪或悲劇性的情況下死亡，每個房間都講述他們的故事。每章的玩法完全不同：一章是第一人稱浴缸幻想，一章是漫畫形式，一章是你在做白日夢時操作罐頭廠刀具。遊戲時長 2-3 小時，但故事留存的時間遠比這更長。它在傳統意義上並不溫馨——它關於死亡率和家庭——但它是那些證明遊戲作為媒介能做什麼的遊戲之一。可在 Xbox Game Pass 上取得。',
    why_ja:
      'エディス・フィンチの記憶はBAFTA最優秀ゲーム賞を受賞し、史上最高の物語ゲームのひとつとして一貫して挙げられます。フィンチ家の最後の生き残りとして、広大で幾重にも重なった実家に帰宅します。すべての家族が奇妙または悲劇的な状況で死亡しており、それぞれの部屋が彼らの物語を語ります。各章はまったく異なる遊び方をします：一章は一人称視点の浴槽ファンタジー、一章は漫画形式、一章は缶詰工場のナイフを操作しながら白昼夢を見るというもの。プレイ時間は2〜3時間ですが、物語はずっと長い間心に残ります。伝統的な意味では居心地よくありません——死と家族についての作品です——でも、ゲームというメディアが何をできるかを証明する一本です。Xbox Game Passでプレイ可能。',
    why_ko:
      '에디스 핀치의 기억은 BAFTA 최우수 게임상을 수상했으며 역대 최고의 내러티브 게임으로 꾸준히 손꼽힙니다. 핀치 가문의 마지막 생존자로서 복잡하게 겹겹이 쌓인 가족의 집으로 돌아갑니다. 모든 가족 구성원이 기이하거나 비극적인 상황에서 사망했으며, 각각의 방이 그들의 이야기를 들려줍니다. 각 챕터는 완전히 다른 방식으로 진행됩니다: 한 챕터는 1인칭 욕조 판타지, 한 챕터는 만화 형식, 한 챕터는 몽상을 하면서 통조림 공장 칼을 조작하는 내용입니다. 게임 시간은 2-3시간이지만 이야기는 훨씬 오래 남습니다. 전통적인 의미에서 아늑하지는 않습니다——죽음과 가족에 관한 이야기니까요——하지만 게임이라는 매체가 무엇을 할 수 있는지를 증명하는 작품입니다. Xbox Game Pass로 플레이 가능합니다.',
    why_de:
      'What Remains of Edith Finch hat den BAFTA für das beste Spiel gewonnen und wird durchgehend als eines der besten Erzählspiele aller Zeiten bezeichnet. Du kehrst als letztes überlebendes Mitglied der Finch-Familie in das weitläufige, übereinander geschichtete Familienhaus zurück — jedes Familienmitglied starb unter seltsamen oder tragischen Umständen, und jedes Zimmer erzählt ihre Geschichte. Jedes Kapitel spielt sich völlig anders: eines ist eine Ich-Perspektive-Badewannen-Fantasy, eines ein Comicstrip, eines lässt dich in einer Konservenfabrik Messer bedienen, während du träumst. Das Spiel ist 2-3 Stunden lang, aber die Geschichten bleiben viel länger bei dir. Es ist nicht gemütlich im traditionellen Sinne — es geht um Sterblichkeit und Familie — aber es gehört zu den Spielen, die beweisen, was Spiele als Medium können. Auf Xbox Game Pass verfügbar.',
    tip_en: "Do not read anything about it beforehand — the discoveries in each room are best experienced without knowing what is coming.",
    tip_zh: '之前不要读任何关于它的资料——每个房间的发现最好在不知道接下来会发生什么的情况下体验。',
    tip_zhTW: '之前不要讀任何關於它的資料——每個房間的發現最好在不知道接下來會發生什麼的情況下體驗。',
    tip_ja: '事前に何も読まないで——各部屋の発見は、何が来るかを知らない状態で体験するのが一番です。',
    tip_ko: '사전에 아무것도 읽지 마세요——각 방의 발견은 무엇이 올지 모르는 상태에서 경험하는 것이 가장 좋습니다.',
    tip_de: 'Lies vorher nichts darüber — die Entdeckungen in jedem Zimmer erlebt man am besten, ohne zu wissen, was kommt.',
  },
  'short-hike': {
    title_en: 'A Short Hike',
    title_zh: '短途徒步（A Short Hike）',
    title_zhTW: '短途健行（A Short Hike）',
    title_ja: 'A Short Hike（ショートハイク）',
    title_ko: 'A Short Hike（어 쇼트 하이크）',
    title_de: 'A Short Hike',
    emoji: '⛰️',
    tag_en: 'The coziest mountain game ever made — $8, one afternoon, pure warmth',
    tag_zh: '有史以来最温馨的山地游戏——8 美元、一个下午、纯粹的温暖',
    tag_zhTW: '有史以來最溫馨的山地遊戲——8 美元、一個下午、純粹的溫暖',
    tag_ja: '史上最もほっこりする山岳ゲーム——約1,200円、ひと午後、純粋な癒し',
    tag_ko: '역대 가장 아늑한 산악 게임——약 만 원, 오후 한 때, 순수한 따뜻함',
    tag_de: 'Das gemütlichste Bergspiel aller Zeiten — 8 €, ein Nachmittag, pure Wärme',
    platform_en: 'Available on: PC (Steam/itch.io), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_zh: '可在以下平台获取：PC（Steam/itch.io）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_zhTW: '可在以下平台取得：PC（Steam/itch.io）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_ja: '対応プラットフォーム：PC（Steam/itch.io）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_ko: '플랫폼: PC(Steam/itch.io), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_de: 'Erhältlich auf: PC (Steam/itch.io), Nintendo Switch, PlayStation 4/5, Xbox',
    why_en:
      "A Short Hike is a small, perfect game. You are Claire, a young bird spending the summer on Hawk Peak Provincial Park, and your goal is to climb to the top of the mountain. There is no time limit, no fail state, no pressure of any kind. The mountain is small enough to feel intimate and large enough to reward exploration — hidden beaches, secret items, fishing spots, other hikers who stop to chat. The game costs about $8 and takes 1-4 hours depending on how much you explore. It has a distinctive lo-fi pixel art style and a soundtrack (by Mark Sparling) that is one of the most reliably comfortable pieces of music in any game. When people describe 'the game that gave me peace,' this is the one they often mean. One of the most acclaimed indie games of the past decade.",
    why_zh:
      '短途徒步是一款小而完美的游戏。你是 Claire，一只在鹰峰省立公园度过夏天的年轻鸟，你的目标是爬到山顶。没有时间限制、没有失败状态、没有任何压力。这座山足够小以感觉亲密，又足够大以奖励探索——隐藏的海滩、秘密物品、钓鱼点，以及会停下来聊天的其他徒步者。游戏价格约 8 美元，根据你探索多少需要 1-4 小时。它有独特的低保真像素艺术风格，以及（由 Mark Sparling 创作的）任何游戏中最可靠令人舒适的原声之一。当人们描述"给我带来平静的游戏"时，这往往就是他们的意思。过去十年中最受好评的独立游戏之一。',
    why_zhTW:
      '短途健行是一款小而完美的遊戲。你是 Claire，一隻在鷹峰省立公園度過夏天的年輕鳥，你的目標是爬到山頂。沒有時間限制、沒有失敗狀態、沒有任何壓力。這座山足夠小以感覺親密，又足夠大以獎勵探索——隱藏的海灘、秘密物品、釣魚點，以及會停下來聊天的其他健行者。遊戲價格約 8 美元，根據你探索多少需要 1-4 小時。它有獨特的低保真像素藝術風格，以及（由 Mark Sparling 創作的）任何遊戲中最可靠令人舒適的原聲之一。當人們描述「給我帶來平靜的遊戲」時，這往往就是他們的意思。過去十年中最受好評的獨立遊戲之一。',
    why_ja:
      'A Short Hikeは小さくて完璧なゲームです。鷹峰州立公園で夏を過ごす若い鳥クレアを操作し、山頂を目指します。タイムリミットなし、失敗なし、プレッシャー一切なし。山はちょうどいい親密さと、探索を楽しめる広さを両立しています——隠れたビーチ、秘密アイテム、釣りスポット、立ち止まって話しかけてくれるハイカーたち。価格は約1,200円で、探索次第で1〜4時間楽しめます。独特のローファイピクセルアートスタイルと、Mark Sparlingによるどんなゲームにも負けない安らぎのサウンドトラックが魅力です。「平和をくれたゲーム」と語るとき、多くの場合これを指しています。過去10年で最も絶賛されたインディーゲームのひとつ。',
    why_ko:
      'A Short Hike는 작고 완벽한 게임입니다. 호크피크 주립공원에서 여름을 보내는 젊은 새 클레어로서 산 정상에 오르는 것이 목표입니다. 시간 제한도, 실패도, 어떤 압박도 없습니다. 산은 친밀하게 느껴질 만큼 작으면서도 탐험을 보상받을 만큼 충분히 큽니다——숨겨진 해변, 비밀 아이템, 낚시 장소, 그리고 잠깐 멈춰 이야기를 나눠주는 다른 하이커들. 가격은 약 만 원이며, 얼마나 탐험하느냐에 따라 1-4시간 정도 즐길 수 있습니다. 독특한 로파이 픽셀 아트 스타일과 Mark Sparling이 작곡한 어느 게임에서도 가장 안정감을 주는 사운드트랙이 특징입니다. "나에게 평화를 준 게임"이라고 말할 때, 많은 경우 이 게임을 의미합니다. 지난 10년간 가장 호평받은 인디 게임 중 하나입니다.',
    why_de:
      'A Short Hike ist ein kleines, perfektes Spiel. Du bist Claire, ein junger Vogel, der den Sommer im Hawk Peak Provincial Park verbringt, und dein Ziel ist es, auf den Gipfel des Berges zu klettern. Kein Zeitlimit, kein Scheitern, kein Druck irgendwelcher Art. Der Berg ist klein genug, um vertraut zu wirken, und groß genug, um Erkundung zu belohnen — versteckte Strände, geheime Gegenstände, Angelplätze, andere Wanderer die stehen bleiben und reden. Das Spiel kostet etwa 8 € und dauert je nach Erkundungsaufwand 1-4 Stunden. Es hat einen unverwechselbaren Lo-Fi-Pixelart-Stil und einen Soundtrack von Mark Sparling, der zu den verlässlich entspannendsten Musikstücken in jedem Spiel gehört. Wenn Menschen von „dem Spiel, das mir Frieden gegeben hat" sprechen, meinen sie oft genau dieses. Eines der meistgelobten Indie-Spiele der letzten zehn Jahre.',
    tip_en: "Collect Golden Feathers — they let you float and climb faster, and the mountain reveals itself completely differently once you can soar.",
    tip_zh: '收集金色羽毛——它们让你漂浮和更快攀登，一旦你能翱翔，这座山就以完全不同的方式展现自己。',
    tip_zhTW: '收集金色羽毛——它們讓你漂浮和更快攀登，一旦你能翱翔，這座山就以完全不同的方式展現自己。',
    tip_ja: 'ゴールデンフェザーを集めて——それで浮いて速く登れるようになり、空を飛べるようになると山の見え方がまるで変わります。',
    tip_ko: '황금 깃털을 모으세요——그러면 더 높이 떠서 빨리 오를 수 있고, 날 수 있게 되면 산이 완전히 다른 모습으로 드러납니다.',
    tip_de: 'Sammel Goldene Federn — sie lassen dich gleiten und schneller klettern, und der Berg enthüllt sich völlig anders, sobald du fliegen kannst.',
  },
  abzu: {
    title_en: 'Abzû',
    title_zh: 'Abzû',
    title_zhTW: 'Abzû',
    title_ja: 'Abzû（アブズ）',
    title_ko: 'Abzû（압주）',
    title_de: 'Abzû',
    emoji: '🌊',
    tag_en: 'A wordless underwater journey — the most beautiful 90-minute meditation in games',
    tag_zh: '无语言的水下旅程——游戏中最美丽的 90 分钟冥想',
    tag_zhTW: '無語言的水下旅程——遊戲中最美麗的 90 分鐘冥想',
    tag_ja: '言葉のない海底の旅——ゲーム史上最も美しい90分の瞑想体験',
    tag_ko: '말 없는 수중 여정——게임 역사상 가장 아름다운 90분 명상',
    tag_de: 'Eine wortlose Unterwasserreise — die schönste 90-Minuten-Meditation in der Spielegeschichte',
    platform_en: 'Available on: PC (Steam), PlayStation 4/5, Xbox (Game Pass), Nintendo Switch',
    platform_zh: '可在以下平台获取：PC（Steam）、PlayStation 4/5、Xbox（Game Pass）、Nintendo Switch',
    platform_zhTW: '可在以下平台取得：PC（Steam）、PlayStation 4/5、Xbox（Game Pass）、Nintendo Switch',
    platform_ja: '対応プラットフォーム：PC（Steam）、PlayStation 4/5、Xbox（Game Pass）、Nintendo Switch',
    platform_ko: '플랫폼: PC(Steam), PlayStation 4/5, Xbox(Game Pass), Nintendo Switch',
    platform_de: 'Erhältlich auf: PC (Steam), PlayStation 4/5, Xbox (Game Pass), Nintendo Switch',
    why_en:
      "Abzû was made by Giant Squid Studios, founded by the art director of Journey — and that lineage shows in every frame. You are a diver exploring a vast, luminous ocean. There is no combat, no dialogue, no inventory, no map. You swim through coral reefs teeming with hundreds of species of fish; you find hidden meditation pools where you can sit and watch the ecosystem around you; you encounter ancient ruins that slowly reveal a wordless mythology. The game is about 90 minutes long and has a genuine ending. What it does in those 90 minutes — the visual spectacle, the Austin Wintory soundtrack (same composer as Journey), the sense of being genuinely immersed in a living underwater world — earns it a place as one of the most beautiful games ever made. Available on Xbox Game Pass.",
    why_zh:
      'Abzû 由 Giant Squid Studios 制作，该工作室由 Journey 的艺术总监创立——这一传承在每一帧中都体现出来。你是一名探索广阔发光海洋的潜水员。没有战斗、没有对话、没有物品栏、没有地图。你穿过栖息着数百种鱼类的珊瑚礁；你发现隐藏的冥想水池，在那里你可以坐下来观察周围的生态系统；你遇到古老的遗迹，慢慢揭示一个无语言的神话。游戏时长约 90 分钟，有一个真正的结局。在这 90 分钟里它做的事情——视觉奇观、Austin Wintory 原声（与 Journey 同一作曲家）、真正沉浸在活生生的水下世界中的感觉——使它成为有史以来最美丽的游戏之一。可在 Xbox Game Pass 上获取。',
    why_zhTW:
      'Abzû 由 Giant Squid Studios 製作，該工作室由 Journey 的藝術總監創立——這一傳承在每一幀中都體現出來。你是一名探索廣闊發光海洋的潛水員。沒有戰鬥、沒有對話、沒有物品欄、沒有地圖。你穿過棲息著數百種魚類的珊瑚礁；你發現隱藏的冥想水池，在那裡你可以坐下來觀察周圍的生態系統；你遇到古老的遺蹟，慢慢揭示一個無語言的神話。遊戲時長約 90 分鐘，有一個真正的結局。在這 90 分鐘裡它做的事情——視覺奇觀、Austin Wintory 原聲（與 Journey 同一作曲家）、真正沉浸在活生生的水下世界中的感覺——使它成為有史以來最美麗的遊戲之一。可在 Xbox Game Pass 上取得。',
    why_ja:
      'AbzûはGiant Squid Studiosが制作し、Journeyのアートディレクターが設立したスタジオです——その系譜はすべてのフレームに宿っています。あなたは広大な輝く海を探索するダイバー。戦闘なし、セリフなし、インベントリなし、マップなし。何百種もの魚が群れるサンゴ礁を泳ぎ、周りの生態系をただ眺める瞑想プールを見つけ、言葉のない神話を少しずつ明かす古代遺跡に出会います。プレイ時間は約90分で、きちんとしたエンディングがあります。その90分でこのゲームが見せるもの——視覚的な壮観、Austin Wintoryのサウンドトラック（Journeyと同じ作曲家）、生きた水中世界に本当に沈み込む感覚——は、史上最も美しいゲームのひとつとして揺るぎない地位を与えています。Xbox Game Passでプレイ可能。',
    why_ko:
      'Abzû는 Giant Squid Studios가 제작했으며, 이 스튜디오는 Journey의 아트 디렉터가 설립했습니다——그 혈통은 모든 프레임에 깃들어 있습니다. 당신은 광활하고 빛나는 바다를 탐험하는 다이버입니다. 전투도, 대화도, 인벤토리도, 지도도 없습니다. 수백 종의 물고기가 가득한 산호초를 헤엄치고, 주변 생태계를 그저 바라볼 수 있는 숨겨진 명상 웅덩이를 발견하며, 말 없는 신화를 서서히 드러내는 고대 유적을 만납니다. 게임 시간은 약 90분이며 진정한 엔딩이 있습니다. 그 90분 동안 보여주는 것들——시각적 장관, Austin Wintory의 사운드트랙(Journey와 같은 작곡가), 살아있는 수중 세계에 진정으로 잠기는 느낌——이 이 게임을 역대 가장 아름다운 게임 중 하나로 만들어줍니다. Xbox Game Pass로 플레이 가능합니다.',
    why_de:
      'Abzû wurde von Giant Squid Studios entwickelt, das vom Art Director von Journey gegründet wurde — diese Abstammung zeigt sich in jedem Einzelbild. Du bist ein Taucher, der einen riesigen, leuchtenden Ozean erkundet. Kein Kampf, kein Dialog, kein Inventar, keine Karte. Du schwimmst durch Korallenriffe mit Hunderten von Fischarten; du findest versteckte Meditationspools, in denen du sitzen und das Ökosystem um dich herum beobachten kannst; du begegnest antiken Ruinen, die langsam eine wortlose Mythologie enthüllen. Das Spiel ist ungefähr 90 Minuten lang und hat ein echtes Ende. Was es in diesen 90 Minuten tut — die visuelle Pracht, der Austin Wintory-Soundtrack (gleicher Komponist wie Journey), das Gefühl wirklich in eine lebendige Unterwasserwelt eingetaucht zu sein — verdient ihm einen Platz als eines der schönsten Spiele aller Zeiten. Auf Xbox Game Pass verfügbar.',
    tip_en: "Find every meditation pool and sit in each one for a full minute — watching the fish school around you is the core of what this game offers.",
    tip_zh: '找到每个冥想水池，在每个水池中坐满一分钟——观察鱼群在你周围游动是这款游戏提供的核心体验。',
    tip_zhTW: '找到每個冥想水池，在每個水池中坐滿一分鐘——觀察魚群在你周圍游動是這款遊戲提供的核心體驗。',
    tip_ja: '瞑想プールをすべて見つけ、それぞれで丸一分間座っていてください——周りを泳ぐ魚の群れを眺めることが、このゲームの核心体験です。',
    tip_ko: '모든 명상 웅덩이를 찾아서 각각에서 꼬박 1분씩 앉아 있으세요——물고기 떼가 주변을 헤엄치는 것을 지켜보는 것이 이 게임의 핵심 경험입니다.',
    tip_de: 'Finde jeden Meditationspool und sitz in jedem für eine volle Minute — die Fischschwärme um dich herum zu beobachten ist der Kern dessen, was dieses Spiel bietet.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    firewatch: 0,
    'edith-finch': 0,
    'short-hike': 0,
    abzu: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyExplorationQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-exploration-games`
    const shareText = getLoc(
      `我的氛围探索游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My atmospheric exploration game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `我的氛圍探索遊戲推薦是「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `私の雰囲気探索ゲームは「${result.title_ja}」です！${result.tag_ja}。あなたも試してみて：${url}`,
      `내 탐험 게임 추천은 「${result.title_ko}」입니다！${result.tag_ko}。내 결과 찾기：${url}`,
      `Mein atmosphärisches Erkundungsspiel ist ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`
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
              {getLoc('体验小贴士：', 'For the best experience: ', '體驗小貼士：', 'プレイのコツ：', '최고의 경험을 위해：', 'Für das beste Erlebnis: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把各种游戏里的专注节奏带入真实日常。',
              'TendFarm is building a farm rhythm tracker — bringing the focused rhythms of games into real daily life.',
              'TendFarm 正在開發農場節律追蹤功能——把各種遊戲裡的專注節奏帶入真實日常。',
              'TendFarmは農場リズムトラッカーを開発中です——ゲームの集中リズムを日常生活へ。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다——게임 속 집중 리듬을 실제 일상으로.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — die fokussierten Rhythmen aus Spielen in den echten Alltag bringen.'
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やる', '다시 테스트', 'Quiz wiederholen')}
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
            '你应该玩哪款氛围探索游戏？',
            'Which Atmospheric Exploration Game Should You Play?',
            '你應該玩哪款氛圍探索遊戲？',
            'あなたにぴったりの雰囲気探索ゲームは？',
            '당신에게 맞는 분위기 탐험 게임은?',
            'Welches atmosphärische Erkundungsspiel passt zu dir?'
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，在看火人、艾迪芬奇的记忆、短途徒步和 Abzû 中找到最适合你的短篇探索体验',
            '6 questions to find your match across Firewatch, What Remains of Edith Finch, A Short Hike, and Abzû',
            '6 個問題，在看火人、艾迪芬奇的記憶、短途健行和 Abzû 中找到最適合你的短篇探索體驗',
            '6つの質問で、Firewatch・エディス・フィンチの記憶・A Short Hike・Abzûからあなたにぴったりの一本を見つけよう',
            '6가지 질문으로 Firewatch, 에디스 핀치의 기억, A Short Hike, Abzû 중 당신에게 맞는 게임을 찾아보세요',
            '6 Fragen, um deinen Match unter Firewatch, What Remains of Edith Finch, A Short Hike und Abzû zu finden'
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
        {getLoc('找到我的探索游戏', 'Find My Exploration Game', '找到我的探索遊戲', '私の探索ゲームを見つける', '내 탐험 게임 찾기', 'Mein Erkundungsspiel finden')}
      </button>
    </div>
  )
}
