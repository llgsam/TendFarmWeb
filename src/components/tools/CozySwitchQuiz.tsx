'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'stardew' | 'acnh' | 'spiritfarer' | 'dreamlight'

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
    q_en: 'How do you most often play your Nintendo Switch?',
    q_zh: '你通常怎么玩 Nintendo Switch？',
    q_zhTW: '你通常怎麼玩 Nintendo Switch？',
    q_ja: 'Nintendo Switch はどんな風に遊ぶことが多いですか？',
    q_ko: 'Nintendo Switch를 주로 어떻게 플레이하시나요?',
    q_de: 'Wie spielst du meistens deine Nintendo Switch?',
    options: [
      {
        en: 'Docked on the TV, fully settled in for a proper session',
        zh: '连接电视，好好坐下来认真玩',
        zhTW: '連接電視，好好坐下來認真玩',
        ja: 'テレビにつないで、腰を据えてがっつりプレイ',
        ko: 'TV에 연결해서 제대로 앉아서 집중해서 플레이',
        de: 'Im TV-Modus — richtig einrichten und konzentriert spielen',
        type: 'stardew',
      },
      {
        en: 'Handheld in bed or on the couch, relaxed and comfortable',
        zh: '握着机器躺在床上或沙发上放松地玩',
        zhTW: '握著機器躺在床上或沙發上放鬆地玩',
        ja: 'ベッドやソファで持ち歩きモードで、ゆったりのんびり',
        ko: '침대나 소파에서 휴대 모드로 편하게 누워서 플레이',
        de: 'Im Handheld-Modus im Bett oder auf dem Sofa, entspannt und bequem',
        type: 'acnh',
      },
      {
        en: 'Handheld anywhere — I bring it with me and play whenever I feel like it',
        zh: '随身携带，随时随地想玩就玩',
        zhTW: '隨身攜帶，隨時隨地想玩就玩',
        ja: 'どこでも持ち歩いて、気が向いたときにさっと起動',
        ko: '들고 다니면서 언제든 생각날 때마다 플레이',
        de: 'Handheld unterwegs — ich nehme sie überall mit und spiele wann immer ich Lust habe',
        type: 'spiritfarer',
      },
      {
        en: 'Any mode — I like switching between TV and handheld during one session',
        zh: '任何模式——我喜欢在同一游戏时间里在电视和掌机之间切换',
        zhTW: '任何模式——我喜歡在同一遊戲時間裡在電視和掌機之間切換',
        ja: 'どちらでも！1回のプレイ中にテレビと携帯モードを切り替えるのが好き',
        ko: '어떤 모드든 상관없어요 — 한 세션 중에 TV와 휴대 모드를 오가는 걸 좋아해요',
        de: 'Jeder Modus — ich wechsle während einer Session gerne zwischen TV und Handheld',
        type: 'dreamlight',
      },
    ],
  },
  {
    q_en: 'What makes a cozy game feel truly satisfying to you?',
    q_zh: '什么让你觉得一款 cozy 游戏真正令人满足？',
    q_zhTW: '什麼讓你覺得一款 cozy 遊戲真正令人滿足？',
    q_ja: 'コージーゲームで一番満足感を感じる瞬間はどれですか？',
    q_ko: '코지 게임에서 진정한 만족감을 느끼게 하는 것은 무엇인가요?',
    q_de: 'Was macht ein Cozy Game für dich wirklich befriedigend?',
    options: [
      {
        en: 'Deep progression — watching numbers go up, unlocking new content, working toward goals',
        zh: '深度进度——看着数字增长、解锁新内容、向目标努力',
        zhTW: '深度進度——看著數字增長、解鎖新內容、向目標努力',
        ja: 'じっくり積み上げる達成感——数字が伸びて、新要素が解放されて、目標に近づいていく感覚',
        ko: '깊은 성장 — 수치가 오르고, 새 콘텐츠를 해금하고, 목표를 향해 나아가는 느낌',
        de: 'Tiefe Progression — Zahlen wachsen sehen, neue Inhalte freischalten, auf Ziele hinarbeiten',
        type: 'stardew',
      },
      {
        en: 'Creative expression — decorating, personalizing, making something uniquely yours',
        zh: '创意表达——装饰、个性化定制、打造独属于你的东西',
        zhTW: '創意表達——裝飾、個性化定製、打造獨屬於你的東西',
        ja: '自分だけの空間づくり——デコレーション、カスタマイズ、世界にひとつだけの場所を作る',
        ko: '창의적 표현 — 꾸미고, 나만의 개성을 담아서, 세상에 하나뿐인 것을 만드는 것',
        de: 'Kreative Entfaltung — dekorieren, personalisieren, etwas einzigartig Eigenes schaffen',
        type: 'acnh',
      },
      {
        en: 'Emotional resonance — characters you care about, stories that move you',
        zh: '情感共鸣——你真心在乎的角色、打动你的故事',
        zhTW: '情感共鳴——你真心在乎的角色、打動你的故事',
        ja: '心に響く体験——愛着がわくキャラクターと、じんとくるストーリー',
        ko: '감정적 공명 — 진심으로 애착이 가는 캐릭터와 마음을 움직이는 이야기',
        de: 'Emotionale Tiefe — Charaktere, um die du dich sorgst, Geschichten, die dich berühren',
        type: 'spiritfarer',
      },
      {
        en: 'Social richness — lots of characters to meet, events, community feeling',
        zh: '丰富的社交——很多可以认识的角色、活动、社区感',
        zhTW: '豐富的社交——很多可以認識的角色、活動、社區感',
        ja: '賑やかなコミュニティ感——たくさんのキャラクターとのふれあい、イベント、仲間がいる雰囲気',
        ko: '풍부한 소셜 요소 — 만날 수 있는 캐릭터가 많고, 이벤트가 있고, 커뮤니티 느낌이 나는 것',
        de: 'Sozialer Reichtum — viele Charaktere kennenlernen, Events, Gemeinschaftsgefühl',
        type: 'dreamlight',
      },
    ],
  },
  {
    q_en: 'On a day off, how much time do you ideally want to spend gaming?',
    q_zh: '在休息日，你理想中想花多少时间在游戏上？',
    q_zhTW: '在休息日，你理想中想花多少時間在遊戲上？',
    q_ja: '休みの日、理想的にはどのくらいゲームに時間をかけたいですか？',
    q_ko: '쉬는 날, 이상적으로 게임에 얼마나 시간을 쓰고 싶으신가요?',
    q_de: 'Wie viel Zeit möchtest du an deinem freien Tag idealerweise mit Spielen verbringen?',
    options: [
      {
        en: '3–5 hours — I want to really sink into a world and feel progress by the end',
        zh: '3-5 小时——我想真正沉浸在一个世界里，结束时感受到进度',
        zhTW: '3-5 小時——我想真正沉浸在一個世界裡，結束時感受到進度',
        ja: '3〜5時間——世界にどっぷり浸かって、終わるころには達成感を感じたい',
        ko: '3~5시간 — 세계에 푹 빠져서 끝날 때 성장한 느낌이 들고 싶어요',
        de: '3–5 Stunden — ich möchte wirklich in eine Welt eintauchen und am Ende Fortschritt spüren',
        type: 'stardew',
      },
      {
        en: '1–2 hours — light and refreshing, not too demanding',
        zh: '1-2 小时——轻松清爽，不要太有压力',
        zhTW: '1-2 小時——輕鬆清爽，不要太有壓力',
        ja: '1〜2時間くらい——軽くさっぱり、重くならない感じが理想',
        ko: '1~2시간 — 가볍고 상쾌하게, 너무 부담스럽지 않게',
        de: '1–2 Stunden — leicht und erfrischend, nicht zu anspruchsvoll',
        type: 'acnh',
      },
      {
        en: '2–3 hours — enough to feel the story move but not overwhelming',
        zh: '2-3 小时——足以感受故事推进，但不会太沉重',
        zhTW: '2-3 小時——足以感受故事推進，但不會太沉重',
        ja: '2〜3時間——ストーリーが動いているのを感じられるくらい、でも重くなりすぎない程度',
        ko: '2~3시간 — 이야기가 흘러가는 걸 느끼기에 충분하지만 너무 무겁지 않게',
        de: '2–3 Stunden — genug um die Geschichte vorankommen zu fühlen, aber nicht überwältigend',
        type: 'spiritfarer',
      },
      {
        en: 'Flexible — sometimes 30 minutes, sometimes 4 hours, depending on mood',
        zh: '弹性时间——有时 30 分钟，有时 4 小时，取决于心情',
        zhTW: '彈性時間——有時 30 分鐘，有時 4 小時，取決於心情',
        ja: '気分次第で変わる——30分のときもあれば4時間のときも、その日の気分で',
        ko: '유동적 — 30분일 때도 있고 4시간일 때도 있어요, 그날 기분에 따라',
        de: 'Flexibel — manchmal 30 Minuten, manchmal 4 Stunden, je nach Stimmung',
        type: 'dreamlight',
      },
    ],
  },
  {
    q_en: 'What kind of in-game characters do you want to spend time with?',
    q_zh: '你想在游戏里和什么样的角色相处？',
    q_zhTW: '你想在遊戲裡和什麼樣的角色相處？',
    q_ja: 'ゲームの中でどんなキャラクターと過ごしたいですか？',
    q_ko: '게임 안에서 어떤 캐릭터와 함께하고 싶으신가요?',
    q_de: 'Mit welchen In-Game-Charakteren möchtest du Zeit verbringen?',
    options: [
      {
        en: 'A small, memorable cast with deep backstories I can really get to know',
        zh: '一小群有深厚背景故事的令人难忘的角色，我可以真正了解他们',
        zhTW: '一小群有深厚背景故事的令人難忘的角色，我可以真正了解他們',
        ja: '少数精鋭の印象的なキャラクターたち——深い過去を持ち、じっくり仲良くなれる人たち',
        ko: '깊은 배경 스토리를 가진 소수의 기억에 남는 캐릭터들 — 진짜로 알아갈 수 있는',
        de: 'Eine kleine, unvergessliche Besetzung mit tiefen Hintergrundgeschichten, die ich wirklich kennenlernen kann',
        type: 'stardew',
      },
      {
        en: 'Adorable animal villagers with distinct personalities — hundreds to collect',
        zh: '可爱的动物村民，各有独特个性——数百个可以收集',
        zhTW: '可愛的動物村民，各有獨特個性——數百個可以收集',
        ja: 'それぞれ個性豊かなかわいい動物の村民たち——何百種類も集められる',
        ko: '저마다 개성이 뚜렷한 귀여운 동물 주민들 — 수백 명을 수집할 수 있는',
        de: 'Niedliche Tierdorfbewohner mit ausgeprägten Persönlichkeiten — Hunderte zum Sammeln',
        type: 'acnh',
      },
      {
        en: 'Spirits with rich personal histories that I help navigate and ultimately release',
        zh: '有丰富个人历史的灵魂，我帮助他们度过并最终放手',
        zhTW: '有豐富個人歷史的靈魂，我幫助他們度過並最終放手',
        ja: '豊かな人生の歴史を持つ魂たち——その旅を一緒に歩み、最後は静かに送り出す',
        ko: '풍부한 개인 역사를 가진 영혼들 — 그들의 여정을 도와주고 결국 보내주는',
        de: 'Geister mit reichen persönlichen Geschichten, die ich begleite und letztendlich loslasse',
        type: 'spiritfarer',
      },
      {
        en: 'Beloved Disney characters I already know and love — Mickey, Moana, Elsa, and more',
        zh: '我已经认识和喜爱的经典 Disney 角色——米奇、莫阿娜、艾莎等',
        zhTW: '我已經認識和喜愛的經典 Disney 角色——米奇、莫阿娜、艾莎等',
        ja: 'ミッキー、モアナ、エルサ……大好きなディズニーキャラクターたちと一緒に過ごしたい',
        ko: '이미 알고 사랑하는 디즈니 캐릭터들 — 미키, 모아나, 엘사 등등',
        de: 'Geliebte Disney-Charaktere, die ich schon kenne und liebe — Mickey, Moana, Elsa und mehr',
        type: 'dreamlight',
      },
    ],
  },
  {
    q_en: 'How do you feel about structure and goals in cozy games?',
    q_zh: '你对 cozy 游戏中的结构和目标有什么感觉？',
    q_zhTW: '你對 cozy 遊戲中的結構和目標有什麼感覺？',
    q_ja: 'コージーゲームの目標や進行の仕組みについてどう思いますか？',
    q_ko: '코지 게임에서의 구조와 목표에 대해 어떻게 생각하시나요?',
    q_de: 'Wie stehst du zu Struktur und Zielen in Cozy Games?',
    options: [
      {
        en: 'I like clear goals and seasons — something to work toward each in-game day',
        zh: '我喜欢明确的目标和季节——每个游戏内的一天都有值得努力的事',
        zhTW: '我喜歡明確的目標和季節——每個遊戲內的一天都有值得努力的事',
        ja: 'はっきりした目標と季節の流れが好き——ゲーム内の毎日、何かに向かって頑張れる感じ',
        ko: '명확한 목표와 계절이 좋아요 — 게임 속 하루하루 노력할 무언가가 있는 것',
        de: 'Ich mag klare Ziele und Jahreszeiten — etwas, wofür man jeden Spieltag arbeiten kann',
        type: 'stardew',
      },
      {
        en: 'I like gentle objectives — optional, flexible, never stressful',
        zh: '我喜欢温和的目标——可选、灵活、永远不会有压力',
        zhTW: '我喜歡溫和的目標——可選、靈活、永遠不會有壓力',
        ja: 'ゆるい目標が好き——やってもやらなくてもいい、自由で、プレッシャーのない感じ',
        ko: '느슨한 목표가 좋아요 — 선택적이고, 유연하고, 절대 스트레스 받지 않는',
        de: 'Ich mag sanfte Ziele — optional, flexibel, niemals stressig',
        type: 'acnh',
      },
      {
        en: 'I want story progression — I need to feel like the narrative is moving forward',
        zh: '我想要故事进展——我需要感觉叙事在向前推进',
        zhTW: '我想要故事進展——我需要感覺敘事在向前推進',
        ja: 'ストーリーが前に進んでいる感覚が必要——物語が動いていると感じられないと物足りない',
        ko: '이야기 진행이 필요해요 — 서사가 앞으로 나아가고 있다는 느낌이 있어야 해요',
        de: 'Ich möchte Fortschritt in der Geschichte — ich muss das Gefühl haben, dass die Handlung voranschreitet',
        type: 'spiritfarer',
      },
      {
        en: 'I like both — daily tasks to keep me busy plus a bigger story to follow',
        zh: '我两者都喜欢——让我忙碌的日常任务加上一个更大的故事可以追随',
        zhTW: '我兩者都喜歡——讓我忙碌的日常任務加上一個更大的故事可以追隨',
        ja: '両方好き——毎日のタスクで手を動かしつつ、大きなストーリーも追いかけたい',
        ko: '둘 다 좋아요 — 바쁘게 할 일상 과제도 있고, 따라갈 더 큰 이야기도 있는 것',
        de: 'Ich mag beides — tägliche Aufgaben die mich beschäftigen plus eine größere Geschichte zu verfolgen',
        type: 'dreamlight',
      },
    ],
  },
  {
    q_en: 'When you think of your perfect cozy game evening, what does it look like?',
    q_zh: '想象你完美的 cozy 游戏夜晚，它是什么样子的？',
    q_zhTW: '想像你完美的 cozy 遊戲夜晚，它是什麼樣子的？',
    q_ja: '理想のコージーゲームナイトを想像したとき、どんな光景が浮かびますか？',
    q_ko: '완벽한 코지 게임 저녁을 떠올리면 어떤 모습인가요?',
    q_de: 'Wenn du dir deinen perfekten gemütlichen Spieleabend vorstellst, wie sieht er aus?',
    options: [
      {
        en: 'Working my farm, mining for gems, completing bundles — productive and satisfying',
        zh: '经营农场、挖矿、完成社区中心任务——有效率且令人满足',
        zhTW: '經營農場、挖礦、完成社區中心任務——有效率且令人滿足',
        ja: '農場を耕して、採掘して、コミュニティセンターを完成させていく——充実感があって最高',
        ko: '농장 경영, 광산 채굴, 꾸러미 완성 — 생산적이고 만족스러운',
        de: 'An der Farm arbeiten, nach Edelsteinen graben, Bündel abschließen — produktiv und befriedigend',
        type: 'stardew',
      },
      {
        en: 'Decorating my island, visiting a friend or checking turnip prices, totally stress-free',
        zh: '装饰我的岛屿、拜访朋友或查看大头菜价格，完全没有压力',
        zhTW: '裝飾我的島嶼、拜訪朋友或查看大頭菜價格，完全沒有壓力',
        ja: '島をデコって、友達の島に遊びに行くか蕪の値段をチェック——プレッシャーゼロで最高',
        ko: '섬 꾸미기, 친구 섬 방문 또는 무 가격 확인 — 완전히 스트레스 없이',
        de: 'Meine Insel dekorieren, eine Freundin besuchen oder Rübenpreise checken — völlig entspannt',
        type: 'acnh',
      },
      {
        en: 'Sailing my boat, cooking meals for spirits, feeling every moment of the journey',
        zh: '驾着我的船、为灵魂们烹饪食物、感受旅程的每一个时刻',
        zhTW: '駕著我的船、為靈魂們烹飪食物、感受旅程的每一個時刻',
        ja: '船で海を渡りながら、魂たちのために料理を作って、旅の一瞬一瞬をかみしめる',
        ko: '배를 타고 항해하며, 영혼들을 위해 요리하고, 여정의 모든 순간을 느끼는',
        de: 'Mein Boot segeln, Mahlzeiten für Geister kochen, jeden Moment der Reise spüren',
        type: 'spiritfarer',
      },
      {
        en: 'Completing character quests, catching new critters, expanding my valley — Disney magic everywhere',
        zh: '完成角色任务、捕捉新生物、扩展我的山谷——到处都是 Disney 魔法',
        zhTW: '完成角色任務、捕捉新生物、擴展我的山谷——到處都是 Disney 魔法',
        ja: 'キャラクターのクエストをこなして、新しい生き物を捕まえて、谷を広げていく——どこにもディズニーの魔法が',
        ko: '캐릭터 퀘스트 완료, 새로운 생물 잡기, 내 계곡 확장 — 곳곳에 디즈니 마법이',
        de: 'Charakterquests abschließen, neue Kreaturen fangen, mein Tal erweitern — überall Disney-Magie',
        type: 'dreamlight',
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
    price_en: string
    price_zh: string
    price_zhTW: string
    price_ja: string
    price_ko: string
    price_de: string
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
    tip_en: string
    tip_zh: string
    tip_zhTW: string
    tip_ja: string
    tip_ko: string
    tip_de: string
  }
> = {
  stardew: {
    title_en: 'Stardew Valley',
    title_zh: '星露谷物语',
    title_zhTW: '星露谷物語',
    title_ja: 'スターデューバレー',
    title_ko: '스타듀 밸리',
    title_de: 'Stardew Valley',
    emoji: '🌾',
    tag_en: 'Deep RPG · Seasons · Farming & Mining',
    tag_zh: '深度 RPG · 季节 · 农业与挖矿',
    tag_zhTW: '深度 RPG · 季節 · 農業與採礦',
    tag_ja: '本格RPG · 季節サイクル · 農業＆採掘',
    tag_ko: '깊은 RPG · 계절 · 농사와 광산',
    tag_de: 'Tiefes RPG · Jahreszeiten · Farming & Bergbau',
    price_en: '~$15 | One-time purchase',
    price_zh: '约 100 元人民币 | 买断制',
    price_zhTW: '約 NT$450 | 買斷制',
    price_ja: '約1,500円 | 買い切り',
    price_ko: '약 ₩20,000 | 일회 구매',
    price_de: '~15 € | Einmalkauf',
    desc_en:
      "Stardew Valley is the best fit for you — you want meaningful goals, satisfying progression, and a world that rewards dedication. On Switch, it's perfect for TV sessions where you can really sink into the game. You manage your farm across four seasons, mine for resources, build relationships with 12 marriage candidates, restore the community center, and uncover the valley's secrets. It's one of the best games ever made at any price, and the Switch version is a complete port with all content including the 1.6 update's new features.",
    desc_zh:
      '星露谷物语最适合你——你想要有意义的目标、令人满足的进度和一个奖励付出的世界。在 Switch 上，它非常适合连接电视的游戏时间，让你真正沉浸其中。你在四个季节里经营农场、挖矿采集资源、与 12 位婚姻候选人建立关系、修复社区中心、揭开山谷的秘密。这是任何价位都堪称有史以来最好的游戏之一，Switch 版本是完整移植，包含 1.6 更新的所有新内容。',
    desc_zhTW:
      '星露谷物語最適合你——你渴望有意義的目標、令人滿足的進度，以及一個回饋你付出的世界。在 Switch 上，接電視玩的效果最棒，可以真正沉浸其中。你在四個季節裡經營農場、挖礦採集、與 12 位婚姻候選人建立關係、修復社區中心、揭開山谷的秘密。這是任何價位都堪稱史上最好的遊戲之一，Switch 版本為完整移植，包含 1.6 更新的全部新內容。',
    desc_ja:
      'スターデューバレーがあなたにぴったりです——意味のある目標、達成感のある進行、そして努力に応えてくれる世界を求めているあなたに。Switch ではテレビモードでどっぷり遊ぶのが最高。4つの季節にわたって農場を管理し、採掘し、12人の結婚候補と関係を築き、コミュニティセンターを修復し、谷の秘密を解き明かします。どんな価格帯でも名作と呼ばれるゲームで、Switch版は1.6アップデートのコンテンツも含む完全移植です。',
    desc_ko:
      '스타듀 밸리가 당신에게 딱 맞습니다 — 의미 있는 목표, 만족스러운 성장, 그리고 노력에 보답하는 세계를 원하는 분께. Switch에서는 TV에 연결해서 푹 빠져 플레이하는 게 최고예요. 네 가지 계절에 걸쳐 농장을 경영하고, 광산을 채굴하고, 12명의 결혼 후보와 관계를 쌓고, 커뮤니티 센터를 복원하고, 마을의 비밀을 파헤칩니다. 어떤 가격대에서도 역대 최고의 게임 중 하나이며, Switch 버전은 1.6 업데이트의 모든 콘텐츠를 포함한 완전 이식판입니다.',
    desc_de:
      'Stardew Valley ist die perfekte Wahl für dich — du möchtest sinnvolle Ziele, befriedigenden Fortschritt und eine Welt, die deinen Einsatz belohnt. Auf der Switch eignet sich das Spiel perfekt für TV-Sessions, bei denen du wirklich in die Welt abtauchst. Du bewirtschaftest deine Farm über vier Jahreszeiten, baust Ressourcen ab, baust Beziehungen zu 12 Heiratskandidaten auf, restaurierst das Gemeindezentrum und entdeckst die Geheimnisse des Tals. Es ist eines der besten Spiele aller Zeiten zu jedem Preis, und die Switch-Version ist eine vollständige Portierung mit allen Inhalten einschließlich des 1.6-Updates.',
    why_en: [
      '300+ hours of content — one of the highest value games on Switch',
      'Satisfying seasonal loop gives every day clear purpose and reward',
      'Perfect for focused TV-mode sessions where you lose track of time',
    ],
    why_zh: [
      '300 小时以上内容——Switch 上性价比最高的游戏之一',
      '令人满足的季节循环让每一天都有明确的目的和回报',
      '非常适合连接电视的专注游戏时段，让你忘记时间',
    ],
    why_zhTW: [
      '300 小時以上內容——Switch 上性價比最高的遊戲之一',
      '令人滿足的季節循環讓每一天都有明確的目的與回饋',
      '非常適合連接電視的專注遊戲時段，讓你忘記時間',
    ],
    why_ja: [
      '300時間以上のコンテンツ量——Switchで最もコスパの高いゲームのひとつ',
      '季節のループが心地よい達成感を生み出し、毎日明確な目的と報酬をくれる',
      'テレビモードでの集中プレイに最適——気づいたら時間が経っている',
    ],
    why_ko: [
      '300시간 이상의 콘텐츠 — Switch에서 가성비 최고의 게임 중 하나',
      '만족스러운 계절 루프가 매일 명확한 목적과 보상을 제공',
      'TV 모드 집중 플레이에 완벽 — 시간 가는 줄 모르게 됨',
    ],
    why_de: [
      '300+ Stunden Inhalt — eines der besten Preis-Leistungs-Verhältnisse auf der Switch',
      'Der befriedigende Jahreszeitenzyklus gibt jedem Tag einen klaren Zweck und eine Belohnung',
      'Perfekt für fokussierte TV-Sessions, bei denen du die Zeit vergisst',
    ],
    tip_en:
      "Start with the Forest farm if you like foraging, or Standard farm if you want maximum crop space. Don't try to do everything at once — pick one skill to level each season.",
    tip_zh:
      '如果你喜欢采集就选森林农场，如果你想要最大的种植空间就选标准农场。不要试图同时做所有事情——每个季节专注提升一项技能。',
    tip_zhTW:
      '喜歡採集的話選森林農場，想要最大種植空間就選標準農場。不要試圖同時做所有事情——每個季節專注提升一項技能。',
    tip_ja:
      '採集好きなら森の農場を、作物スペースを最大にしたいなら標準農場を選ぼう。最初から全部やろうとしなくて大丈夫——1シーズンにひとつのスキルに集中するのがコツ。',
    tip_ko:
      '채집을 좋아하면 숲 농장을, 최대한 넓은 작물 공간을 원하면 표준 농장을 선택하세요. 한꺼번에 모든 걸 하려고 하지 마세요 — 한 계절에 하나의 기술에 집중하는 게 팁입니다.',
    tip_de:
      'Wähle die Waldfarm wenn du Wildes sammeln magst, oder die Standardfarm für maximale Anbaufläche. Versuche nicht alles auf einmal zu tun — konzentriere dich auf eine Fähigkeit pro Jahreszeit.',
  },
  acnh: {
    title_en: 'Animal Crossing: New Horizons',
    title_zh: '动物之森：新视野',
    title_zhTW: '動物之森：新視野',
    title_ja: 'あつまれ どうぶつの森',
    title_ko: '모여봐요 동물의 숲',
    title_de: 'Animal Crossing: New Horizons',
    emoji: '🍃',
    tag_en: 'Creative · Decoration · Relaxed Social',
    tag_zh: '创意 · 装饰 · 轻松社交',
    tag_zhTW: '創意 · 裝飾 · 輕鬆社交',
    tag_ja: 'クリエイティブ · デコレーション · ゆるい交流',
    tag_ko: '창의 · 꾸미기 · 여유로운 소셜',
    tag_de: 'Kreativ · Dekoration · Entspanntes Miteinander',
    price_en: '~$60 | One-time purchase (check for sales)',
    price_zh: '约 300 元人民币 | 买断制（注意促销）',
    price_zhTW: '約 NT$1,800 | 買斷制（注意特價）',
    price_ja: '約6,000円 | 買い切り（セール時をチェック）',
    price_ko: '약 ₩66,000 | 일회 구매（할인 기간 확인）',
    price_de: '~60 € | Einmalkauf (auf Sales achten)',
    desc_en:
      "Animal Crossing: New Horizons is the perfect fit — you want creative freedom, a pressure-free pace, and adorable characters without deep narrative demands. You develop a deserted island into a dream community, decorate your home and outdoors, collect and trade items, and build friendships with up to 10 animal villagers. It uses real-world time, so your island always feels alive. The game rewards regulars who check in daily but never punishes players who take breaks — it's the most genuinely relaxing major game on Switch.",
    desc_zh:
      '动物之森：新视野最适合你——你想要创意自由、没有压力的节奏和可爱的角色，不需要深度叙事。你将一座荒岛发展成梦想社区，装饰你的房屋和户外空间，收集和交换物品，与最多 10 位动物村民建立友谊。游戏使用现实时间，所以你的岛屿总是充满生机。游戏奖励每天登录的玩家，但从不惩罚休息一段时间后回来的玩家——这是 Switch 上真正最令人放松的主要游戏。',
    desc_zhTW:
      '動物之森：新視野最適合你——你想要創意自由、輕鬆的節奏和可愛的角色，不需要深度敘事。你將一座荒島發展成夢想社區，裝飾房屋和戶外空間，收集和交換物品，與最多 10 位動物村民建立友誼。遊戲使用現實時間，所以你的島嶼總是充滿生機。每天登入的玩家會獲得獎勵，但休息一段時間回來也不會受到懲罰——這是 Switch 上真正最令人放鬆的主要遊戲。',
    desc_ja:
      'あつまれ どうぶつの森があなたにぴったりです——創造的な自由、プレッシャーのないペース、かわいいキャラクターを求めている方に。荒れた無人島を理想のコミュニティへと発展させ、自宅や島を自由に飾り、アイテムを集めたり交換したり、最大10人の動物住人と仲を深めます。現実の時間と連動しているので島はいつも活気にあふれています。毎日プレイする人へのご褒美はあっても、しばらく離れていても罰はない——Switchで本当の意味でリラックスできる大作です。',
    desc_ko:
      '모여봐요 동물의 숲이 당신에게 완벽합니다 — 창의적 자유, 부담 없는 속도, 깊은 서사 없이 귀여운 캐릭터를 원하는 분께. 무인도를 꿈의 커뮤니티로 발전시키고, 집과 야외 공간을 꾸미고, 아이템을 수집하고 교환하며, 최대 10명의 동물 주민과 우정을 쌓습니다. 현실 시간을 사용하므로 섬은 항상 생동감이 넘칩니다. 매일 접속하는 플레이어에게는 보상이 있지만 휴식 후 돌아와도 패널티가 없어요 — Switch에서 진정으로 가장 편안한 주요 게임입니다.',
    desc_de:
      'Animal Crossing: New Horizons ist die perfekte Wahl — du willst kreative Freiheit, ein druckfreies Tempo und niedliche Charaktere ohne tiefe Erzählanforderungen. Du entwickelst eine verlassene Insel zu einer Traumgemeinschaft, dekorierst dein Haus und die Außenbereiche, sammelst und tauschst Gegenstände und baust Freundschaften mit bis zu 10 Tierdorfbewohnern auf. Das Spiel nutzt Echtzeit, sodass deine Insel immer lebendig wirkt. Das Spiel belohnt tägliche Einstiege, bestraft aber nie Spieler, die sich eine Pause gönnen — das entspannendste Spiel auf der Switch.',
    why_en: [
      'No fail states, no death, no timers — the most genuinely stress-free game on Switch',
      'Creative decoration system is unmatched — thousands of item combinations',
      'Best when played daily for short sessions — perfect for any schedule',
    ],
    why_zh: [
      '没有失败机制、没有死亡、没有计时器——Switch 上真正最没有压力的游戏',
      '创意装饰系统无可匹敌——数千种物品组合',
      '每天短时间游玩时效果最佳——适合任何日程安排',
    ],
    why_zhTW: [
      '沒有失敗機制、沒有死亡、沒有計時器——Switch 上真正最沒有壓力的遊戲',
      '創意裝飾系統無可匹敵——數千種物品組合',
      '每天短時間遊玩效果最佳——適合任何日程安排',
    ],
    why_ja: [
      'ゲームオーバーなし、死亡なし、タイマーなし——Switchで本当にプレッシャーゼロのゲーム',
      '創作性の高いデコレーションシステム——何千通りものアイテム組み合わせが楽しめる',
      '毎日少し遊ぶのに最適——どんなスケジュールの人にも合う',
    ],
    why_ko: [
      '실패 없음, 죽음 없음, 타이머 없음 — Switch에서 진정으로 가장 스트레스 없는 게임',
      '창의적인 데코 시스템은 타의 추종을 불허 — 수천 가지 아이템 조합',
      '매일 짧게 플레이할 때 가장 효과적 — 어떤 일정에도 맞는',
    ],
    why_de: [
      'Keine Fehlerzustände, kein Tod, keine Timer — das entspannendste Spiel auf der Switch',
      'Das kreative Dekorationssystem ist unübertroffen — tausende Gegenstandskombinationen',
      'Am besten täglich für kurze Sessions gespielt — perfekt für jeden Zeitplan',
    ],
    tip_en:
      'Play at least a little every day in the first month to keep your island progressing — the game gives you daily tasks and events that reward consistency without demanding large blocks of time.',
    tip_zh:
      '在前一个月每天至少玩一点来保持你的岛屿进展——游戏每天给你任务和活动，奖励持续游玩但不需要大块时间。',
    tip_zhTW:
      '前一個月每天至少玩一點來保持島嶼進度——遊戲每天提供任務和活動，獎勵持續遊玩但不需要大塊時間。',
    tip_ja:
      '最初の1ヶ月は毎日少しでもプレイして島の発展を維持しよう——毎日タスクやイベントがあって、続けるほど報酬がもらえるけど、長時間プレイしなくても大丈夫。',
    tip_ko:
      '첫 달은 매일 조금씩 접속해서 섬의 진행을 유지하세요 — 게임은 매일 과제와 이벤트를 주어 꾸준함을 보상하지만 긴 시간을 요구하지 않아요.',
    tip_de:
      'Spiel im ersten Monat täglich zumindest ein bisschen, um den Fortschritt deiner Insel zu erhalten — das Spiel gibt dir täglich Aufgaben und Events, die Beständigkeit belohnen, ohne große Zeitblöcke zu fordern.',
  },
  spiritfarer: {
    title_en: 'Spiritfarer',
    title_zh: 'Spiritfarer',
    title_zhTW: 'Spiritfarer',
    title_ja: 'スピリットフェアラー',
    title_ko: 'Spiritfarer',
    title_de: 'Spiritfarer',
    emoji: '⛵',
    tag_en: 'Emotional · Storytelling · Management',
    tag_zh: '情感 · 叙事 · 经营管理',
    tag_zhTW: '情感 · 敘事 · 經營管理',
    tag_ja: '感動 · ストーリー · 経営管理',
    tag_ko: '감동 · 스토리텔링 · 경영',
    tag_de: 'Emotional · Erzählung · Management',
    price_en: '~$30 | One-time (often on sale for ~$10)',
    price_zh: '约 60 元人民币 | 买断制（促销时约 20 元）',
    price_zhTW: '約 NT$900 | 買斷制（特價時約 NT$300）',
    price_ja: '約3,000円 | 買い切り（セール時は約1,000円）',
    price_ko: '약 ₩33,000 | 일회 구매（세일 시 약 ₩11,000）',
    price_de: '~30 € | Einmalkauf (oft im Sale für ~10 €)',
    desc_en:
      "Spiritfarer is your Switch game — you want emotional depth, characters that stay with you, and a journey that means something. You play as Stella, a ferrymaster transporting spirits to the afterlife. You manage a boat that expands and transforms, grow food, cook meals, craft materials, and most importantly, build deep relationships with each spirit aboard. Each spirit has a complete life story to uncover and a moment of letting go that you will feel. Many players describe it as making them cry in the best possible way.",
    desc_zh:
      'Spiritfarer 就是你的 Switch 游戏——你想要情感深度、留在你心里的角色和有意义的旅程。你扮演 Stella，一位引导灵魂前往来世的摆渡人。你管理一艘不断扩展和变形的船、种植食物、烹饪餐食、制作材料，最重要的是，与船上的每位灵魂建立深厚的关系。每位灵魂都有完整的生命故事等待揭开，以及一个你将真实感受到的放手时刻。许多玩家描述这款游戏让他们以最美好的方式流泪。',
    desc_zhTW:
      'Spiritfarer 就是你的 Switch 遊戲——你想要情感深度、留在你心裡的角色和有意義的旅程。你扮演 Stella，一位引導靈魂前往來世的擺渡人。你管理一艘不斷擴展和變形的船、種植食物、烹飪餐食、製作材料，最重要的是，與船上的每位靈魂建立深厚的關係。每位靈魂都有完整的生命故事等待揭開，以及一個你將真實感受到的放手時刻。許多玩家描述這款遊戲讓他們以最美好的方式流淚。',
    desc_ja:
      'スピリットフェアラーはあなたにぴったりのSwitchゲームです——感情的な深み、心に残るキャラクター、意味ある旅を求めているあなたに。フェリーの船頭として魂たちを来世へ送り届ける Stella を操作します。常に変化し拡張する船を管理し、食料を育て、食事を作り、素材を製作し、何より船上の魂たちと深い絆を築きます。各キャラクターには独自の人生ストーリーがあり、別れの瞬間には心が揺さぶられます。「最高の形で泣けた」という声が多いゲームです。',
    desc_ko:
      'Spiritfarer는 당신의 Switch 게임입니다 — 감정적 깊이, 마음속에 남는 캐릭터, 의미 있는 여정을 원하는 분께. 영혼을 저세상으로 안내하는 뱃사공 Stella를 플레이합니다. 계속 확장되고 변하는 배를 관리하고, 음식을 재배하고, 식사를 요리하고, 재료를 제작하며, 무엇보다 배 위의 각 영혼과 깊은 관계를 쌓습니다. 각 영혼은 밝혀낼 완전한 인생 이야기가 있고, 작별의 순간은 진심으로 느껴집니다. 많은 플레이어들이 "최고의 방식으로 울었다"고 표현하는 게임입니다.',
    desc_de:
      'Spiritfarer ist dein Switch-Spiel — du möchtest emotionale Tiefe, Charaktere, die in dir bleiben, und eine Reise, die etwas bedeutet. Du spielst Stella, eine Fährenmeisterin, die Seelen ins Jenseits transportiert. Du verwaltest ein Boot, das sich ständig erweitert und verändert, baust Nahrung an, kochst Mahlzeiten, stellst Materialien her und baust vor allem tiefe Beziehungen zu jeder Seele an Bord auf. Jede Seele hat eine vollständige Lebensgeschichte zu entdecken und einen Moment des Loslassens, den du wirklich spüren wirst. Viele Spieler beschreiben es als auf die beste mögliche Art und Weise zum Weinen gebracht zu werden.',
    why_en: [
      'The most emotionally resonant cozy game on Switch — nothing quite compares',
      'Rich management systems (cooking, crafting, building) that never feel like chores',
      'Perfect 20–40 hour length — complete story with satisfying ending',
    ],
    why_zh: [
      'Switch 上情感最共鸣的 cozy 游戏——没有其他游戏能与之相比',
      '丰富的经营系统（烹饪、制作、建造）从不感觉像苦差事',
      '完美的 20-40 小时时长——有令人满意结局的完整故事',
    ],
    why_zhTW: [
      'Switch 上情感最共鳴的 cozy 遊戲——沒有其他遊戲能與之相比',
      '豐富的經營系統（烹飪、製作、建造）從不感覺像苦差事',
      '完美的 20-40 小時時長——有令人滿意結局的完整故事',
    ],
    why_ja: [
      'Switch のコージーゲームの中で最も感情に訴える作品——他に類を見ない',
      '料理・クラフト・建設など、豊かな経営システムが苦行に感じないバランス',
      '20〜40時間という絶妙なボリューム——満足度の高いエンディングまで完結したストーリー',
    ],
    why_ko: [
      'Switch 코지 게임 중 감정적으로 가장 깊이 공명하는 게임 — 비교 불가',
      '풍부한 관리 시스템(요리, 제작, 건설)이 절대 지루하게 느껴지지 않음',
      '완벽한 20-40시간 분량 — 만족스러운 엔딩이 있는 완전한 이야기',
    ],
    why_de: [
      'Das emotional mitreißendste Cozy Game auf der Switch — nichts ist vergleichbar',
      'Reichhaltige Management-Systeme (Kochen, Handwerk, Bauen) die sich nie wie Arbeit anfühlen',
      'Perfekte 20–40 Stunden Länge — vollständige Geschichte mit befriedigendem Ende',
    ],
    tip_en:
      "Take your time with each spirit's storyline — don't rush to complete their quests. The conversations and hugs are where the real game is.",
    tip_zh:
      '花时间了解每位灵魂的故事线——不要急着完成他们的任务。对话和拥抱才是这款游戏真正的核心。',
    tip_zhTW:
      '慢慢體驗每位靈魂的故事線——不要急著完成他們的任務。對話和擁抱才是這款遊戲真正的核心。',
    tip_ja:
      '各キャラクターのストーリーをじっくり楽しもう——クエストを急いでクリアしようとしなくていい。会話とハグこそが、このゲームの本当の醍醐味だから。',
    tip_ko:
      '각 영혼의 스토리라인에 천천히 시간을 들이세요 — 퀘스트를 서두르지 마세요. 대화와 포옹이 이 게임의 진짜 핵심입니다.',
    tip_de:
      "Nimm dir Zeit mit der Geschichte jeder Seele — haste nicht, ihre Quests zu erfüllen. Die Gespräche und Umarmungen sind das eigentliche Spiel.",
  },
  dreamlight: {
    title_en: 'Disney Dreamlight Valley',
    title_zh: 'Disney Dreamlight Valley',
    title_zhTW: 'Disney Dreamlight Valley',
    title_ja: 'ディズニー スターライトバレー',
    title_ko: 'Disney Dreamlight Valley',
    title_de: 'Disney Dreamlight Valley',
    emoji: '✨',
    tag_en: 'Disney · Life Sim · Flexible Sessions',
    tag_zh: 'Disney · 生活模拟 · 弹性时间',
    tag_zhTW: 'Disney · 生活模擬 · 彈性時間',
    tag_ja: 'ディズニー · 生活シム · 自由なプレイ',
    tag_ko: '디즈니 · 생활 시뮬 · 유연한 플레이',
    tag_de: 'Disney · Lebenssimulation · Flexible Sessions',
    price_en: 'Free to play (cosmetics/passes optional)',
    price_zh: '免费游玩（外观/通行证可选购）',
    price_zhTW: '免費遊玩（外觀/通行證選購）',
    price_ja: '基本無料（コスメ/パスは有料オプション）',
    price_ko: '무료 플레이（코스메틱/패스 선택 구매）',
    price_de: 'Free to Play (Kosmetik/Pässe optional)',
    desc_en:
      "Disney Dreamlight Valley fits you perfectly — you want a rich cast of familiar faces, a flexible play style, and the magic of Disney woven into everything. You restore a magical valley that was taken over by a curse called the Forgetting, rebuild relationships with Disney characters (Mickey, Elsa, WALL-E, Moana, Simba, and many more), farm, cook, fish, and decorate. As a free-to-play game, it's immediately accessible. Quests unlock new characters and biomes. The social richness and Disney IP make it unlike anything else on Switch.",
    desc_zh:
      'Disney Dreamlight Valley 非常适合你——你想要一大群熟悉的面孔、弹性的游戏风格，以及渗透在一切事物中的 Disney 魔法。你修复一个被"遗忘"诅咒占领的魔法山谷，重建与 Disney 角色的关系（米奇、艾莎、WALL-E、莫阿娜、辛巴等等），耕种、烹饪、钓鱼和装饰。作为免费游玩游戏，立即就可以体验。任务解锁新角色和生物群落。丰富的社交性和 Disney IP 让它在 Switch 上独一无二。',
    desc_zhTW:
      'Disney Dreamlight Valley 非常適合你——你想要一大群熟悉的面孔、彈性的遊戲風格，以及滲透在一切事物中的 Disney 魔法。你修復一個被「遺忘」詛咒占領的魔法山谷，重建與 Disney 角色的關係（米奇、艾莎、WALL-E、莫阿娜、辛巴等等），耕種、烹飪、釣魚和裝飾。作為免費遊玩遊戲，立即就可以體驗。任務解鎖新角色和生物群落。豐富的社交性和 Disney IP 讓它在 Switch 上獨一無二。',
    desc_ja:
      'ディズニー スターライトバレーはあなたにぴったりです——おなじみのキャラクターたち、自由なプレイスタイル、そしてあらゆるところにあふれるディズニーの魔法を求めているあなたに。「忘却」に侵された魔法の谷を修復しながら、ミッキー、エルサ、WALL-E、モアナ、シンバなどのディズニーキャラクターと絆を築き、農業、料理、釣り、デコレーションを楽しみます。基本無料なのですぐに遊び始められます。クエストをこなすと新キャラクターやバイオームが解放されます。社交性の豊かさとディズニーIPが、Switchで唯一無二の体験を生み出しています。',
    desc_ko:
      'Disney Dreamlight Valley는 당신에게 딱 맞습니다 — 친숙한 얼굴들, 유연한 플레이 스타일, 그리고 모든 것에 스며든 디즈니 마법을 원하는 분께. "망각"의 저주에 사로잡힌 마법의 계곡을 복원하며, 미키, 엘사, WALL-E, 모아나, 심바 등 디즈니 캐릭터들과의 관계를 재건하고, 농사, 요리, 낚시, 장식을 즐깁니다. 무료 플레이이므로 바로 시작할 수 있어요. 퀘스트를 완료하면 새 캐릭터와 바이옴이 해금됩니다. 풍부한 소셜 요소와 디즈니 IP가 Switch에서 독보적인 경험을 만들어냅니다.',
    desc_de:
      'Disney Dreamlight Valley passt perfekt zu dir — du möchtest eine reiche Besetzung bekannter Gesichter, einen flexiblen Spielstil und die Magie von Disney in allem. Du restaurierst ein magisches Tal, das von einem Fluch namens das Vergessen heimgesucht wurde, baust Beziehungen zu Disney-Charakteren wieder auf (Mickey, Elsa, WALL-E, Moana, Simba und viele mehr), baust an, kochst, angelst und dekorierst. Als Free-to-Play-Spiel ist es sofort zugänglich. Quests schalten neue Charaktere und Biome frei. Der soziale Reichtum und das Disney-IP machen es zu einem einzigartigen Erlebnis auf der Switch.',
    why_en: [
      'Free to play — no upfront cost to try it on Switch',
      'Most recognizable characters of any cozy game — if you love Disney, this is made for you',
      'Regular updates with new characters and seasonal content keep it fresh',
    ],
    why_zh: [
      '免费游玩——在 Switch 上尝试无需前期费用',
      '所有 cozy 游戏中最容易辨认的角色——如果你热爱 Disney，这款游戏就是为你而生',
      '定期更新新角色和季节性内容保持新鲜感',
    ],
    why_zhTW: [
      '免費遊玩——在 Switch 上嘗試無需前期費用',
      '所有 cozy 遊戲中最容易辨認的角色——如果你熱愛 Disney，這款遊戲就是為你而生',
      '定期更新新角色和季節性內容保持新鮮感',
    ],
    why_ja: [
      '基本無料——Switch で気軽に始められる',
      'コージーゲームの中で最も親しみやすいキャラクター勢揃い——ディズニー好きのために作られたゲーム',
      '定期的な新キャラクターや季節コンテンツの更新で常に新鮮',
    ],
    why_ko: [
      '무료 플레이 — Switch에서 초기 비용 없이 시작 가능',
      '모든 코지 게임 중 가장 친숙한 캐릭터들 — 디즈니를 사랑한다면 이 게임은 당신을 위한 것',
      '정기 업데이트로 새 캐릭터와 시즌 콘텐츠 추가 — 항상 새로움 유지',
    ],
    why_de: [
      'Free to Play — kein Startpreis um es auf der Switch auszuprobieren',
      'Die bekanntesten Charaktere aller Cozy Games — wenn du Disney liebst, ist dieses Spiel für dich gemacht',
      'Regelmäßige Updates mit neuen Charakteren und saisonalen Inhalten halten es frisch',
    ],
    tip_en:
      'Focus on character friendship levels early — higher friendship unlocks their full questlines. And yes, the Star Path seasonal passes are optional; the base game has plenty of content.',
    tip_zh:
      '早期专注于提高角色友情等级——更高的友情解锁他们完整的任务线。是的，星途季节性通行证是可选的；基础游戏有足够多的内容。',
    tip_zhTW:
      '早期專注於提高角色友情等級——更高的友情解鎖他們完整的任務線。是的，星途季節性通行證是可選的；基礎遊戲有足夠多的內容。',
    tip_ja:
      '序盤はキャラクターの友情レベルを上げることに集中しよう——友情が高まると完全なクエストラインが解放される。スターパスはあくまで任意——ベースゲームだけで十分楽しめる。',
    tip_ko:
      '초반에는 캐릭터 우정 레벨 높이기에 집중하세요 — 우정이 높아질수록 전체 퀘스트라인이 해금됩니다. 스타 패스 시즌 통행증은 선택 사항입니다; 기본 게임만으로도 콘텐츠가 충분해요.',
    tip_de:
      'Konzentriere dich früh auf Freundschaftslevel mit Charakteren — höhere Freundschaft schaltet ihre vollständigen Questlines frei. Und ja, die Star Path saisonalen Pässe sind optional; das Basisspiel hat reichlich Inhalt.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { stardew: 0, acnh: 0, spiritfarer: 0, dreamlight: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozySwitchQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-switch-games`
    const shareText = getLoc(
      `我在 Switch 上最该玩的 Cozy 游戏是「${result.title_zh}」！找到你的推荐：${url}`,
      `My recommended cozy Switch game is ${result.title_en}! Find yours: ${url}`,
      `我在 Switch 上最該玩的 Cozy 遊戲是「${result.title_zhTW}」！找到你的推薦：${url}`,
      `Switch でプレイすべきコージーゲームは「${result.title_ja}」でした！あなたも試して：${url}`,
      `Switch에서 내가 해야 할 코지 게임은 「${result.title_ko}」입니다！당신도 찾아보세요：${url}`,
      `Mein empfohlenes Switch Cozy Game ist ${result.title_de}! Finde deins: ${url}`,
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
            {getLoc(result.price_zh, result.price_en, result.price_zhTW, result.price_ja, result.price_ko, result.price_de)}
          </p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {getLoc('为什么适合你', 'Why it fits you', '為什麼適合你', 'あなたに合う理由', '당신에게 맞는 이유', 'Warum es zu dir passt')}
          </h3>
          <ul className="mb-3 space-y-2">
            {getLoc(
              result.why_zh.join('|||'),
              result.why_en.join('|||'),
              result.why_zhTW.join('|||'),
              result.why_ja.join('|||'),
              result.why_ko.join('|||'),
              result.why_de.join('|||'),
            )
              .split('|||')
              .map((w, i) => (
                <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                  <span className="shrink-0 text-[#f0a832]">✓</span>
                  <span>{w}</span>
                </li>
              ))}
          </ul>
          <div className="border-t border-[#2d3d2d] pt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {getLoc('入门建议', 'Getting started tip', '入門建議', 'はじめ方のヒント', '시작 팁', 'Einsteiger-Tipp')}
            </p>
            <p className="text-sm text-[#8a9a7a]">
              {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
            </p>
          </div>
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
            '你该在 Nintendo Switch 上玩哪款 Cozy 游戏？',
            'Which Cozy Game Should You Play on Nintendo Switch?',
            '你該在 Nintendo Switch 上玩哪款 Cozy 遊戲？',
            'Nintendo Switch でプレイすべきコージーゲームは？',
            'Nintendo Switch에서 어떤 코지 게임을 해야 할까요?',
            'Welches Cozy Game solltest du auf der Nintendo Switch spielen?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从星露谷物语、动物之森、Spiritfarer、Disney Dreamlight Valley 中找到最适合你的那款',
            '6 questions to find your perfect cozy Switch game — Stardew Valley, Animal Crossing: New Horizons, Spiritfarer, or Disney Dreamlight Valley',
            '6 個問題，從星露谷物語、動物之森、Spiritfarer、Disney Dreamlight Valley 中找到最適合你的那款',
            '6問に答えて、スターデューバレー・どうぶつの森・スピリットフェアラー・ディズニー スターライトバレーの中からあなたにぴったりのゲームを見つけよう',
            '6가지 질문으로 스타듀 밸리, 모여봐요 동물의 숲, Spiritfarer, Disney Dreamlight Valley 중 당신에게 딱 맞는 게임을 찾아보세요',
            '6 Fragen um dein perfektes Switch Cozy Game zu finden — Stardew Valley, Animal Crossing: New Horizons, Spiritfarer oder Disney Dreamlight Valley',
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
          allAnswered ? 'bg-[#f0a832] text-[#0f1a0f] hover:bg-[#e09822]' : 'cursor-not-allowed bg-[#2d3d2d] text-[#4a5a4a]'
        }`}
      >
        {getLoc(
          '找到我的 Switch Cozy 游戏',
          'Find My Switch Cozy Game',
          '找到我的 Switch Cozy 遊戲',
          '私にぴったりのSwitchコージーゲームを探す',
          '나의 Switch 코지 게임 찾기',
          'Mein Switch Cozy Game finden',
        )}
      </button>
    </div>
  )
}
