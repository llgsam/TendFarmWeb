'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Game = 'hayday' | 'stardew' | 'township' | 'pocketcamp'

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
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Game }>
}> = [
  {
    q_en: 'How long is your typical mobile gaming session?',
    q_zh: '你通常一次手机游戏玩多长时间？',
    q_zhTW: '你通常一次手機遊戲玩多長時間？',
    q_ja: 'スマホゲームのプレイ時間は、1回あたりどのくらいですか？',
    q_ko: '보통 한 번에 모바일 게임을 얼마나 플레이하세요?',
    q_de: 'Wie lange spielst du typischerweise eine mobile Gaming-Session?',
    options: [
      {
        en: '5–15 minutes — quick check-ins while waiting or between tasks',
        zh: '5-15 分钟——等待或间隙时快速查看一下',
        zhTW: '5-15 分鐘——等待或間隙時快速查看一下',
        ja: '5〜15分——待ち時間や隙間時間にサクッとチェック',
        ko: '5~15분 — 기다리거나 잠깐 쉬는 사이에 빠르게 확인',
        de: '5–15 Minuten — schnelle Checks beim Warten oder zwischen Aufgaben',
        type: 'hayday',
      },
      {
        en: '30–60 minutes — I want to actually get into a flow state',
        zh: '30-60 分钟——我想真正进入心流状态',
        zhTW: '30-60 分鐘——我想真正進入心流狀態',
        ja: '30〜60分——ちゃんとフロー状態に入りたい',
        ko: '30~60분 — 제대로 몰입 상태에 들어가고 싶어요',
        de: '30–60 Minuten — ich möchte wirklich in einen Flow-Zustand kommen',
        type: 'stardew',
      },
      {
        en: '15–30 minutes — enough to manage things and check on my progress',
        zh: '15-30 分钟——足够管理事情、查看进度',
        zhTW: '15-30 分鐘——足夠管理事情、查看進度',
        ja: '15〜30分——管理して進捗を確認するのにちょうどいい',
        ko: '15~30분 — 관리하고 진행 상황 확인하기에 충분한 시간',
        de: '15–30 Minuten — genug, um Dinge zu verwalten und Fortschritte zu checken',
        type: 'township',
      },
      {
        en: '5–20 minutes — I like quick, satisfying tasks I can finish in one sitting',
        zh: '5-20 分钟——我喜欢能在一次坐下来就完成的快速满足任务',
        zhTW: '5-20 分鐘——我喜歡能在一次坐下來就完成的快速滿足任務',
        ja: '5〜20分——一度に完結できるサクサクした達成感が好き',
        ko: '5~20분 — 한 번에 끝낼 수 있는 빠른 만족감이 좋아요',
        de: '5–20 Minuten — ich mag schnelle, befriedigende Aufgaben, die ich in einem Rutsch erledigen kann',
        type: 'pocketcamp',
      },
    ],
  },
  {
    q_en: 'What draws you most to a mobile game?',
    q_zh: '手机游戏里什么最能吸引你？',
    q_zhTW: '手機遊戲裡什麼最能吸引你？',
    q_ja: 'スマホゲームで一番惹かれるのはどんな要素ですか？',
    q_ko: '모바일 게임에서 가장 끌리는 요소는 무엇인가요?',
    q_de: 'Was zieht dich am meisten zu einem mobilen Spiel?',
    options: [
      {
        en: 'A satisfying production chain — growing crops, processing goods, fulfilling orders',
        zh: '令人满足的生产链——种植作物、加工商品、完成订单',
        zhTW: '令人滿足的生產鏈——種植作物、加工商品、完成訂單',
        ja: '満足感のある生産チェーン——作物を育て、加工して、注文をこなす',
        ko: '만족스러운 생산 사슬 — 작물 재배, 상품 가공, 주문 완료',
        de: 'Eine befriedigende Produktionskette — Pflanzen anbauen, Waren verarbeiten, Bestellungen erfüllen',
        type: 'hayday',
      },
      {
        en: 'A deep world to explore with characters, storylines, and things to discover',
        zh: '可以探索的深度世界，有人物、故事线和可以发现的事物',
        zhTW: '可以探索的深度世界，有人物、故事線和可以發現的事物',
        ja: '探索できる深い世界——キャラクター、ストーリー、発見の喜び',
        ko: '탐험할 수 있는 깊은 세계 — 캐릭터, 스토리라인, 발견할 것들',
        de: 'Eine tiefe Welt zum Erkunden — mit Charakteren, Storylines und Entdeckungen',
        type: 'stardew',
      },
      {
        en: 'Building and expanding — watching your town or farm grow over time',
        zh: '建造和扩张——看着你的城镇或农场随时间成长',
        zhTW: '建造和擴張——看著你的城鎮或農場隨時間成長',
        ja: '建設と拡張——自分の街や農場が少しずつ育っていくのを見る',
        ko: '건설과 확장 — 마을이나 농장이 시간이 지남에 따라 성장하는 것을 보기',
        de: 'Bauen und expandieren — dabei zusehen, wie deine Stadt oder Farm wächst',
        type: 'township',
      },
      {
        en: 'Cute characters and creative decoration — making things look just right',
        zh: '可爱的角色和创意装饰——让一切看起来恰到好处',
        zhTW: '可愛的角色和創意裝飾——讓一切看起來恰到好處',
        ja: 'かわいいキャラクターとデコレーション——自分だけの空間を作り上げる',
        ko: '귀여운 캐릭터와 창의적인 꾸미기 — 모든 것을 딱 맞게 만들기',
        de: 'Süße Charaktere und kreative Dekoration — alles genau richtig gestalten',
        type: 'pocketcamp',
      },
    ],
  },
  {
    q_en: 'How do you feel about waiting times in mobile games?',
    q_zh: '你对手机游戏里的等待时间有什么看法？',
    q_zhTW: '你對手機遊戲裡的等待時間有什麼看法？',
    q_ja: 'スマホゲームの待ち時間についてどう思いますか？',
    q_ko: '모바일 게임의 대기 시간에 대해 어떻게 생각하세요?',
    q_de: 'Wie stehst du zu Wartezeiten in mobilen Spielen?',
    options: [
      {
        en: 'Fine — I check in, start production, come back later. That is the rhythm.',
        zh: '没问题——我查看一下，开始生产，过会再回来。这就是节奏。',
        zhTW: '沒問題——我查看一下，開始生產，過會再回來。這就是節奏。',
        ja: '全然OK——チェックして、生産を始めて、後で戻る。それがこのゲームの楽しみ方',
        ko: '괜찮아요 — 확인하고, 생산 시작하고, 나중에 돌아오고. 그게 바로 이 게임의 리듬이죠',
        de: 'Kein Problem — ich checke rein, starte die Produktion, komme später zurück. Das ist der Rhythmus.',
        type: 'hayday',
      },
      {
        en: 'I prefer games with no timers — I want to play as long as I want',
        zh: '我更喜欢没有计时器的游戏——我想玩多久就玩多久',
        zhTW: '我更喜歡沒有計時器的遊戲——我想玩多久就玩多久',
        ja: 'タイマーなしのゲームがいい——やめたいときにやめられる自由が欲しい',
        ko: '타이머 없는 게임이 좋아요 — 원하는 만큼 마음껏 플레이하고 싶어요',
        de: 'Ich bevorzuge Spiele ohne Timer — ich möchte so lange spielen, wie ich will',
        type: 'stardew',
      },
      {
        en: 'Acceptable if there is always something else to do while waiting',
        zh: '如果等待时还有其他事情可做，那是可以接受的',
        zhTW: '如果等待時還有其他事情可做，那是可以接受的',
        ja: '待ってる間に別のことができるなら許容範囲',
        ko: '기다리는 동안 다른 할 일이 있다면 받아들일 수 있어요',
        de: 'Akzeptabel, wenn es immer etwas anderes zu tun gibt, während man wartet',
        type: 'township',
      },
      {
        en: 'I do not mind short waits — it gives me time to decorate and plan',
        zh: '我不介意短暂等待——这给了我时间来装饰和规划',
        zhTW: '我不介意短暫等待——這給了我時間來裝飾和規劃',
        ja: 'ちょっとした待ち時間は気にしない——デコレーションや計画を立てる時間になるし',
        ko: '짧은 대기는 괜찮아요 — 꾸미고 계획할 시간이 생기니까요',
        de: 'Kurze Wartezeiten stören mich nicht — sie geben mir Zeit zum Dekorieren und Planen',
        type: 'pocketcamp',
      },
    ],
  },
  {
    q_en: 'Social features in mobile games — trading, visiting friends, guilds — are:',
    q_zh: '手机游戏里的社交功能——交易、拜访朋友、公会——对你来说：',
    q_zhTW: '手機遊戲裡的社交功能——交易、拜訪朋友、公會——對你來說：',
    q_ja: 'スマホゲームのソーシャル機能——交換、フレンド訪問、ギルドなどは？',
    q_ko: '모바일 게임의 소셜 기능 — 거래, 친구 방문, 길드 — 어떻게 생각하세요?',
    q_de: 'Soziale Features in mobilen Spielen — Handel, Freunde besuchen, Gilden — sind:',
    options: [
      {
        en: 'Essential — trading with neighbors is one of the best parts',
        zh: '必不可少——与邻居交易是最精彩的部分之一',
        zhTW: '必不可少——與鄰居交易是最精彩的部分之一',
        ja: '必須——近所の人と取引するのが醍醐味のひとつ',
        ko: '필수적이에요 — 이웃과 거래하는 게 가장 재미있는 부분 중 하나예요',
        de: 'Unverzichtbar — mit Nachbarn zu handeln ist eines der besten Elemente',
        type: 'hayday',
      },
      {
        en: 'Optional — I mostly play solo but do not mind having the option',
        zh: '可选——我主要单人游玩，但不介意有这个选项',
        zhTW: '可選——我主要單人遊玩，但不介意有這個選項',
        ja: 'あってもなくても——基本ソロだけど選択肢があるのは悪くない',
        ko: '선택 사항 — 주로 혼자 플레이하지만 옵션이 있는 건 괜찮아요',
        de: 'Optional — ich spiele meistens solo, aber die Option stört nicht',
        type: 'stardew',
      },
      {
        en: 'Fun — I enjoy helping friends and building together in a community',
        zh: '很有趣——我喜欢帮助朋友、在社区里一起建设',
        zhTW: '很有趣——我喜歡幫助朋友、在社區裡一起建設',
        ja: '楽しい——友達を助けたり、コミュニティで一緒に作り上げるのが好き',
        ko: '재미있어요 — 친구를 돕고 커뮤니티에서 함께 만들어 나가는 게 좋아요',
        de: 'Spaßig — ich helfe gerne Freunden und baue gemeinsam in einer Community',
        type: 'township',
      },
      {
        en: 'A nice bonus — I love visiting others for design inspiration',
        zh: '不错的加分项——我喜欢拜访他人获取设计灵感',
        zhTW: '不錯的加分項——我喜歡拜訪他人獲取設計靈感',
        ja: 'ボーナス感覚——他の人のキャンプを見てインスピレーションもらえるのが好き',
        ko: '좋은 보너스 — 다른 사람을 방문해서 디자인 영감을 얻는 게 좋아요',
        de: 'Ein nettes Plus — ich besuche gerne andere für Deko-Inspiration',
        type: 'pocketcamp',
      },
    ],
  },
  {
    q_en: 'Your approach to in-app purchases in free mobile games:',
    q_zh: '你对免费手机游戏内购的态度：',
    q_zhTW: '你對免費手機遊戲內購的態度：',
    q_ja: '無料スマホゲームの課金についてどう思いますか？',
    q_ko: '무료 모바일 게임의 인앱 구매에 대한 당신의 태도는?',
    q_de: 'Deine Einstellung zu In-App-Käufen in kostenlosen Spielen:',
    options: [
      {
        en: 'I play free and spend occasionally when something is really worth it',
        zh: '我免费游玩，偶尔在真正值得的时候花一点',
        zhTW: '我免費遊玩，偶爾在真正值得的時候花一點',
        ja: '基本無課金で、本当に良いと思ったときだけちょっと課金する',
        ko: '무료로 플레이하고, 정말 가치 있을 때만 가끔 결제해요',
        de: 'Ich spiele kostenlos und gebe gelegentlich Geld aus, wenn es wirklich lohnt',
        type: 'hayday',
      },
      {
        en: 'I paid once upfront and that is it — I want no ongoing spending pressure',
        zh: '我一次性付款，仅此而已——我不想有持续消费的压力',
        zhTW: '我一次性付款，僅此而已——我不想有持續消費的壓力',
        ja: '最初に一度だけ払う——継続的な課金プレッシャーはいらない',
        ko: '처음에 한 번 결제하고 끝 — 계속 돈을 써야 한다는 압박은 싫어요',
        de: 'Ich habe einmal im Voraus bezahlt — kein ständiger Kaufdruck',
        type: 'stardew',
      },
      {
        en: 'I play free for a long time before deciding if I want to support the game',
        zh: '我免费玩很长时间，然后再决定是否要支持这款游戏',
        zhTW: '我免費玩很長時間，然後再決定是否要支持這款遊戲',
        ja: '長いこと無課金でやってみて、気に入ったら応援する感じ',
        ko: '오래 무료로 해보고 나서 지원할지 결정해요',
        de: 'Ich spiele lange kostenlos, bevor ich mich entscheide, das Spiel zu unterstützen',
        type: 'township',
      },
      {
        en: 'I mostly buy cosmetics — I would rather spend on cute items than gameplay advantages',
        zh: '我主要买外观道具——我宁愿花在可爱的物品上而不是游戏优势',
        zhTW: '我主要買外觀道具——我寧願花在可愛的物品上而不是遊戲優勢',
        ja: 'コスメ系だけ課金する——ゲームアドバンテージよりかわいいアイテムに使いたい',
        ko: '주로 꾸미기 아이템만 구매해요 — 게임 이점보다 귀여운 아이템에 쓰고 싶어요',
        de: 'Ich kaufe hauptsächlich Kosmetik — lieber Geld für süße Dinge als für Spielvorteile',
        type: 'pocketcamp',
      },
    ],
  },
  {
    q_en: 'What would make you stop playing a mobile farming game?',
    q_zh: '什么会让你停止玩一款手机农场游戏？',
    q_zhTW: '什麼會讓你停止玩一款手機農場遊戲？',
    q_ja: 'どうなったらスマホ農場ゲームをやめますか？',
    q_ko: '모바일 농장 게임을 그만두게 만드는 것은?',
    q_de: 'Was würde dich dazu bringen, ein mobiles Farmspiel aufzugeben?',
    options: [
      {
        en: 'If it becomes too aggressive with ads or pay-to-progress walls',
        zh: '如果游戏在广告或付费进度墙上变得太强硬',
        zhTW: '如果遊戲在廣告或付費進度牆上變得太強硬',
        ja: '広告や課金の壁がえげつなくなったら',
        ko: '광고나 유료 진행 장벽이 너무 심해지면',
        de: 'Wenn es zu aggressiv mit Werbung oder Pay-to-Progress-Mauern wird',
        type: 'hayday',
      },
      {
        en: 'If it feels shallow — I need content depth or I lose interest quickly',
        zh: '如果感觉内容浅薄——我需要内容深度，否则很快就会失去兴趣',
        zhTW: '如果感覺內容淺薄——我需要內容深度，否則很快就會失去興趣',
        ja: '浅く感じたら——コンテンツの深さがないとすぐ飽きちゃう',
        ko: '내용이 얕게 느껴지면 — 콘텐츠 깊이가 없으면 금방 흥미를 잃어요',
        de: 'Wenn es seicht wirkt — ich brauche Inhaltstiefe, sonst verliere ich schnell das Interesse',
        type: 'stardew',
      },
      {
        en: 'If the community aspect dies — playing with an empty server kills the fun',
        zh: '如果社区方面消失了——在空服务器里玩会让乐趣全无',
        zhTW: '如果社區方面消失了——在空服務器裡玩會讓樂趣全無',
        ja: 'コミュニティが過疎ったら——過疎サーバーでやっても楽しくない',
        ko: '커뮤니티가 죽으면 — 빈 서버에서 플레이하면 재미가 없어요',
        de: 'Wenn der Community-Aspekt stirbt — auf einem leeren Server zu spielen macht keinen Spaß',
        type: 'township',
      },
      {
        en: 'If the seasonal content runs out and there is nothing new to collect',
        zh: '如果季节性内容耗尽，没有新东西可以收集',
        zhTW: '如果季節性內容耗盡，沒有新東西可以收集',
        ja: 'シーズンコンテンツが尽きて、集めるものがなくなったら',
        ko: '시즌 콘텐츠가 다 소진되고 새로 수집할 게 없어지면',
        de: 'Wenn der saisonale Inhalt ausgeht und es nichts Neues mehr zu sammeln gibt',
        type: 'pocketcamp',
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
    platform_en: string
    platform_zh: string
    platform_zhTW: string
    platform_ja: string
    platform_ko: string
    platform_de: string
    desc_en: string
    desc_zh: string
    desc_zhTW: string
    desc_ja: string
    desc_ko: string
    desc_de: string
    pro_en: string[]
    pro_zh: string[]
    pro_zhTW: string[]
    pro_ja: string[]
    pro_ko: string[]
    pro_de: string[]
    watch_en: string
    watch_zh: string
    watch_zhTW: string
    watch_ja: string
    watch_ko: string
    watch_de: string
  }
> = {
  hayday: {
    title_en: 'Hay Day',
    title_zh: 'Hay Day（卡通农场）',
    title_zhTW: 'Hay Day（卡通農場）',
    title_ja: 'Hay Day（ヘイデイ）',
    title_ko: 'Hay Day（헤이 데이）',
    title_de: 'Hay Day',
    emoji: '🐓',
    tag_en: 'Classic · Social · Production Chain',
    tag_zh: '经典 · 社交 · 生产链',
    tag_zhTW: '經典 · 社交 · 生產鏈',
    tag_ja: 'クラシック · ソーシャル · 生産チェーン',
    tag_ko: '클래식 · 소셜 · 생산 사슬',
    tag_de: 'Klassiker · Sozial · Produktionskette',
    platform_en: 'iOS · Android · Free',
    platform_zh: 'iOS · Android · 免费',
    platform_zhTW: 'iOS · Android · 免費',
    platform_ja: 'iOS · Android · 無料',
    platform_ko: 'iOS · Android · 무료',
    platform_de: 'iOS · Android · Kostenlos',
    desc_en:
      "Hay Day is the game that defined mobile farming. Developed by Supercell, it has been running since 2012 and remains one of the most polished mobile farming experiences available. You grow crops, raise animals, process goods through a satisfying production chain, and fulfill roadside shop orders. The social layer — trading with neighbors, joining neighborhoods, competing in derbies — gives it longevity that most mobile games cannot match.",
    desc_zh:
      'Hay Day 是定义了手机农场游戏的那款游戏。由 Supercell 开发，自 2012 年运营至今，仍然是市面上最精良的手机农场游戏体验之一。你种植作物、饲养动物、通过令人满足的生产链加工商品、完成路边商店订单。社交层——与邻居交易、加入社区、参加比赛——赋予了它大多数手机游戏无法匹敌的持久生命力。',
    desc_zhTW:
      'Hay Day 是定義了手機農場遊戲的那款遊戲。由 Supercell 開發，自 2012 年運營至今，仍然是市面上最精良的手機農場遊戲體驗之一。你種植作物、飼養動物、通過令人滿足的生產鏈加工商品、完成路邊商店訂單。社交層——與鄰居交易、加入社區、參加比賽——賦予了它大多數手機遊戲無法媲美的持久生命力。',
    desc_ja:
      'Hay Day は、スマホ農場ゲームを定義した作品です。Supercell 開発、2012 年から続くロングランで、今でも最高峰のスマホ農場体験のひとつ。作物を育て、動物を飼い、満足感抜群の生産チェーンで商品を加工し、道端ショップの注文をこなします。近所の人との取引、近隣コミュニティ参加、ダービー対戦といったソーシャル要素が、ほかのスマホゲームには真似できない息の長さを生み出しています。',
    desc_ko:
      'Hay Day는 모바일 농장 게임을 정의한 작품입니다. Supercell이 개발하여 2012년부터 운영 중이며, 현재까지도 가장 완성도 높은 모바일 농장 게임 경험 중 하나입니다. 작물을 재배하고, 동물을 기르고, 만족스러운 생산 사슬을 통해 상품을 가공하고, 길가 상점의 주문을 완료합니다. 이웃과의 거래, 동네 참여, 더비 경쟁 등의 소셜 요소가 대부분의 모바일 게임이 따라올 수 없는 장수 비결입니다.',
    desc_de:
      'Hay Day ist das Spiel, das mobile Farmspiele definiert hat. Entwickelt von Supercell, läuft es seit 2012 und ist bis heute eines der ausgereiftesten mobilen Farmerlebnisse. Du baust Pflanzen an, züchtest Tiere, verarbeitest Waren in einer befriedigenden Produktionskette und erfüllst Bestellungen im Straßenladen. Die soziale Ebene — Handel mit Nachbarn, Nachbarschaften, Derby-Wettbewerbe — verleiht ihm eine Langlebigkeit, die die meisten mobilen Spiele nicht erreichen.',
    pro_en: [
      'Best-in-class production chain — the most satisfying order fulfillment loop in mobile farming',
      'Active community with trading, neighborhood events, and derbies',
      'Consistently updated with new content, seasonal events, and expansions',
    ],
    pro_zh: [
      '同类最佳生产链——手机农场游戏中最令人满足的订单完成循环',
      '活跃社区，有交易、社区活动和比赛',
      '持续更新，有新内容、季节活动和扩展',
    ],
    pro_zhTW: [
      '同類最佳生產鏈——手機農場遊戲中最令人滿足的訂單完成循環',
      '活躍社區，有交易、社區活動和比賽',
      '持續更新，有新內容、季節活動和擴展',
    ],
    pro_ja: [
      '業界最高の生産チェーン——スマホ農場ゲームで最も達成感のある注文サイクル',
      '活発なコミュニティ——取引、近隣イベント、ダービーが充実',
      'コンテンツ、季節イベント、拡張が継続的にアップデート',
    ],
    pro_ko: [
      '동종 최고의 생산 사슬 — 모바일 농장 게임에서 가장 만족스러운 주문 완료 루프',
      '거래, 동네 이벤트, 더비가 있는 활성 커뮤니티',
      '새 콘텐츠, 시즌 이벤트, 확장으로 지속적인 업데이트',
    ],
    pro_de: [
      'Produktionskette der Spitzenklasse — der befriedigendste Bestellungs-Loop im Mobile Farming',
      'Aktive Community mit Handel, Nachbarschafts-Events und Derbys',
      'Regelmäßige Updates mit neuen Inhalten, saisonalen Events und Erweiterungen',
    ],
    watch_en: "Progression slows significantly at higher levels without spending — the mid-to-late game can feel grindy for free players.",
    watch_zh: '在高等级时不消费进度会明显变慢——对于免费玩家来说，中后期游戏可能会感觉有些磨人。',
    watch_zhTW: '在高等級時不消費進度會明顯變慢——對於免費玩家來說，中後期遊戲可能會感覺有些磨人。',
    watch_ja: '高レベルになると無課金での進行が遅くなりがち——無課金勢には中盤以降がやや辛く感じることも。',
    watch_ko: '높은 레벨에서 결제 없이는 진행이 크게 느려집니다 — 무료 플레이어에게는 중후반 게임이 다소 고된 느낌일 수 있어요.',
    watch_de: 'Der Fortschritt verlangsamt sich ohne Ausgaben auf höheren Leveln erheblich — für Gratis-Spieler kann sich das Mid-bis-Late-Game grindend anfühlen.',
  },
  stardew: {
    title_en: 'Stardew Valley (Mobile)',
    title_zh: '星露谷物语（手机版）',
    title_zhTW: '星露谷物語（手機版）',
    title_ja: 'スターデューバレー（モバイル版）',
    title_ko: '스타듀 밸리 (모바일)',
    title_de: 'Stardew Valley (Mobil)',
    emoji: '🌾',
    tag_en: 'Deep · Story-Rich · One-Time Purchase',
    tag_zh: '深度 · 故事丰富 · 一次性购买',
    tag_zhTW: '深度 · 故事豐富 · 一次性購買',
    tag_ja: 'やり込み · ストーリー豊富 · 買い切り',
    tag_ko: '깊이 있는 · 스토리 풍부 · 일회성 구매',
    tag_de: 'Tiefgang · Story-Reich · Einmalkauf',
    platform_en: 'iOS · Android · $4.99 one-time',
    platform_zh: 'iOS · Android · 一次性付费',
    platform_zhTW: 'iOS · Android · 一次性付費',
    platform_ja: 'iOS · Android · 買い切り（約600円）',
    platform_ko: 'iOS · Android · $4.99 일회성 구매',
    platform_de: 'iOS · Android · 4,99 $ einmalig',
    desc_en:
      "Stardew Valley on mobile is the full PC experience in your pocket — no ads, no timers, no energy systems, no pay-to-win. You buy it once for under $5 and get hundreds of hours of deep farming RPG content. The mobile version includes everything from the PC version: all crops, characters, storylines, relationships, and the mines. Touch controls work surprisingly well for most tasks. If you want depth and are willing to pay once, nothing beats it.",
    desc_zh:
      '手机版星露谷物语是完整的 PC 体验放在你口袋里——没有广告、没有计时器、没有体力系统、没有付费赢。你只需一次性花不到 5 美元，就能获得数百小时的深度农场 RPG 内容。手机版包含 PC 版的所有内容：所有作物、人物、故事线、人际关系和矿洞。触控操作对大多数任务来说出人意料地好用。如果你想要深度且愿意付费一次，没有什么能超越它。',
    desc_zhTW:
      '手機版星露谷物語是完整的 PC 體驗放在你口袋裡——沒有廣告、沒有計時器、沒有體力系統、沒有付費贏。你只需一次性花不到 5 美元，就能獲得數百小時的深度農場 RPG 內容。手機版包含 PC 版的所有內容：所有作物、人物、故事線、人際關係和礦洞。觸控操作對大多數任務來說出人意料地好用。如果你想要深度且願意付費一次，沒有什麼能超越它。',
    desc_ja:
      'スマホ版スターデューバレーは、完全なPC体験をポケットに入れた一本です——広告なし、タイマーなし、スタミナ制限なし、課金有利なし。600円ほどの一度の購入で、何百時間も楽しめる深い農場RPGコンテンツが手に入ります。PC版の全要素——すべての作物、キャラクター、ストーリー、人間関係、鉱山——がそのまま収録。タッチ操作も慣れると意外にサクサク動きます。深みが欲しくて、一度の課金でいいという方には間違いなくおすすめ。',
    desc_ko:
      '모바일 스타듀 밸리는 완전한 PC 경험을 주머니에 담은 것입니다 — 광고 없음, 타이머 없음, 에너지 시스템 없음, 과금 우위 없음. 5달러 미만의 일회성 구매로 수백 시간의 깊이 있는 농장 RPG 콘텐츠를 즐길 수 있습니다. 모바일 버전에는 PC 버전의 모든 것이 포함되어 있습니다: 모든 작물, 캐릭터, 스토리라인, 인간관계, 광산. 터치 조작도 놀랍도록 잘 작동합니다. 깊이를 원하고 한 번 결제해도 괜찮다면, 이보다 나은 선택은 없습니다.',
    desc_de:
      'Stardew Valley auf dem Handy ist die vollständige PC-Erfahrung in der Tasche — keine Werbung, keine Timer, kein Energiesystem, kein Pay-to-Win. Einmal für unter 5 Euro kaufen und Hunderte Stunden tiefes Farming-RPG genießen. Die mobile Version enthält alles aus der PC-Version: alle Pflanzen, Charaktere, Storylines, Beziehungen und die Minen. Touch-Steuerung funktioniert überraschend gut. Wer Tiefe will und einmal zahlen möchte, findet nichts Besseres.',
    pro_en: [
      'Complete PC experience with no artificial timers or energy limits',
      'One-time purchase — zero ongoing spending pressure',
      'Hundreds of hours of content: farming, fishing, mining, relationships, and secrets',
    ],
    pro_zh: [
      '完整 PC 体验，没有人为的计时器或体力限制',
      '一次性购买——零持续消费压力',
      '数百小时的内容：农业、钓鱼、挖矿、人际关系和秘密',
    ],
    pro_zhTW: [
      '完整 PC 體驗，沒有人為的計時器或體力限制',
      '一次性購買——零持續消費壓力',
      '數百小時的內容：農業、釣魚、挖礦、人際關係和秘密',
    ],
    pro_ja: [
      '人工的なタイマーもスタミナ制限もない、完全なPC体験',
      '買い切り——課金プレッシャーゼロ',
      '何百時間も楽しめるコンテンツ：農業、釣り、採掘、人間関係、隠し要素',
    ],
    pro_ko: [
      '인위적인 타이머나 에너지 제한 없는 완전한 PC 경험',
      '일회성 구매 — 지속적인 결제 압박 없음',
      '수백 시간의 콘텐츠: 농업, 낚시, 광산, 인간관계, 비밀들',
    ],
    pro_de: [
      'Vollständige PC-Erfahrung ohne künstliche Timer oder Energie-Limits',
      'Einmalkauf — null laufender Kaufdruck',
      'Hunderte Stunden Inhalt: Farming, Angeln, Bergbau, Beziehungen und Geheimnisse',
    ],
    watch_en: "Small screen can feel cramped for inventory management — consider playing on a larger phone or tablet.",
    watch_zh: '小屏幕对于背包管理可能感觉有些局促——考虑在更大的手机或平板电脑上游玩。',
    watch_zhTW: '小螢幕對於背包管理可能感覺有些局促——考慮在更大的手機或平板電腦上遊玩。',
    watch_ja: '小さい画面ではインベントリ管理が少し窮屈に感じることも——大きめのスマホやタブレットでプレイするといいかも。',
    watch_ko: '작은 화면은 인벤토리 관리에 다소 답답할 수 있습니다 — 더 큰 스마트폰이나 태블릿에서 플레이하는 걸 고려해보세요.',
    watch_de: 'Das kleine Display kann beim Inventar-Management eng wirken — am besten auf einem größeren Handy oder Tablet spielen.',
  },
  township: {
    title_en: 'Township',
    title_zh: 'Township（城镇物语）',
    title_zhTW: 'Township（城鎮物語）',
    title_ja: 'タウンシップ（Township）',
    title_ko: '타운십 (Township)',
    title_de: 'Township',
    emoji: '🏘️',
    tag_en: 'Builder · Community · Farm + Town Hybrid',
    tag_zh: '建造 · 社区 · 农场+城镇混合',
    tag_zhTW: '建造 · 社區 · 農場+城鎮混合',
    tag_ja: '街づくり · コミュニティ · 農場＋町の融合',
    tag_ko: '건설 · 커뮤니티 · 농장+마을 혼합',
    tag_de: 'Aufbau · Community · Farm + Stadt Hybrid',
    platform_en: 'iOS · Android · Free',
    platform_zh: 'iOS · Android · 免费',
    platform_zhTW: 'iOS · Android · 免費',
    platform_ja: 'iOS · Android · 無料',
    platform_ko: 'iOS · Android · 무료',
    platform_de: 'iOS · Android · Kostenlos',
    desc_en:
      "Township combines farming with city-building in a way that no other mobile game quite replicates. You grow crops to feed factories, build and expand a town, trade with other players, and complete zoo collections. The progression is broad — there is always something to work toward. Developed by Playrix, it has been actively maintained since 2013 and has one of the largest active player bases of any farming game on mobile.",
    desc_zh:
      'Township 以一种其他手机游戏无法复制的方式将农业与城市建设结合在一起。你种植作物为工厂供料、建造和扩张城镇、与其他玩家交易、完成动物园收藏。进度内容广泛——总是有东西可以努力。由 Playrix 开发，自 2013 年以来持续维护，拥有手机农场游戏中最大的活跃玩家群之一。',
    desc_zhTW:
      'Township 以一種其他手機遊戲無法複製的方式將農業與城市建設結合在一起。你種植作物為工廠供料、建造和擴張城鎮、與其他玩家交易、完成動物園收藏。進度內容廣泛——總是有東西可以努力。由 Playrix 開發，自 2013 年以來持續維護，擁有手機農場遊戲中最大的活躍玩家群之一。',
    desc_ja:
      'タウンシップは農業と街づくりを組み合わせた、ほかにはないスマホゲームです。作物を育てて工場に供給し、街を建設・拡張し、ほかのプレイヤーと取引し、動物園コレクションを集めます。進行の幅が広く、常に何かしら目標があります。Playrix 開発、2013 年から継続運営で、スマホ農場ゲームの中でも有数のアクティブユーザー数を誇ります。',
    desc_ko:
      '타운십은 다른 어떤 모바일 게임도 따라할 수 없는 방식으로 농업과 도시 건설을 결합합니다. 공장에 공급할 작물을 재배하고, 마을을 건설 및 확장하고, 다른 플레이어와 거래하고, 동물원 컬렉션을 완성합니다. 진행이 광범위하여 항상 목표가 있습니다. Playrix가 개발하여 2013년부터 꾸준히 유지되고 있으며, 모바일 농장 게임 중 가장 큰 활성 플레이어 기반 중 하나를 보유하고 있습니다.',
    desc_de:
      'Township kombiniert Farming mit Städtebau auf eine Weise, die kein anderes Mobilspiel wirklich nachahmt. Du baust Pflanzen an, um Fabriken zu versorgen, erweiterst eine Stadt, handelst mit anderen Spielern und vervollständigst Zoo-Sammlungen. Die Progression ist breit — es gibt immer etwas, worauf man hinarbeiten kann. Entwickelt von Playrix, aktiv seit 2013 und eine der größten aktiven Spielergemeinschaften unter allen Farming-Apps.',
    pro_en: [
      'Unique farm-plus-town combination that rewards both farmers and builders',
      'Active co-op teams and regular seasonal events keep the experience fresh',
      'Enormous content depth — the game has been updated for 10+ years',
    ],
    pro_zh: [
      '独特的农场加城镇组合，同时奖励农民和建造者',
      '活跃的合作团队和定期季节活动保持体验新鲜感',
      '巨大的内容深度——游戏已更新超过 10 年',
    ],
    pro_zhTW: [
      '獨特的農場加城鎮組合，同時獎勵農民和建造者',
      '活躍的合作團隊和定期季節活動保持體驗新鮮感',
      '巨大的內容深度——遊戲已更新超過 10 年',
    ],
    pro_ja: [
      '農業と街づくりを両立できる唯一無二の組み合わせ',
      '活発な協力チームと定期的な季節イベントで飽きにくい',
      '10年以上更新され続けてきた圧倒的なコンテンツ量',
    ],
    pro_ko: [
      '농부와 건설자 모두에게 보상을 주는 독특한 농장+마을 조합',
      '활성 협력 팀과 정기 시즌 이벤트로 신선한 경험 유지',
      '10년 이상 업데이트된 방대한 콘텐츠 깊이',
    ],
    pro_de: [
      'Einzigartige Farm-plus-Stadt-Kombination, die sowohl Farmer als auch Baumeister belohnt',
      'Aktive Koop-Teams und regelmäßige Saisonevents halten die Erfahrung frisch',
      'Enormer Inhaltsumfang — das Spiel wird seit über 10 Jahren aktualisiert',
    ],
    watch_en: "Can become resource-intensive at higher levels. Joining an active team early makes a significant difference in progression speed.",
    watch_zh: '在高等级时可能变得资源密集。早期加入一个活跃的团队对进度速度有显著影响。',
    watch_zhTW: '在高等級時可能變得資源密集。早期加入一個活躍的團隊對進度速度有顯著影響。',
    watch_ja: '高レベルになるとリソース管理が重くなりがち。序盤から活発なチームに入ると進行スピードが大きく変わります。',
    watch_ko: '높은 레벨에서는 자원이 많이 필요해질 수 있습니다. 초반에 활성 팀에 합류하면 진행 속도가 크게 달라집니다.',
    watch_de: 'Auf höheren Stufen kann es ressourcenintensiv werden. Früh einem aktiven Team beizutreten macht einen deutlichen Unterschied in der Progressionsgeschwindigkeit.',
  },
  pocketcamp: {
    title_en: 'Animal Crossing: Pocket Camp',
    title_zh: '动物之森：口袋营地',
    title_zhTW: '動物之森：口袋營地',
    title_ja: 'どうぶつの森 ポケットキャンプ',
    title_ko: '모여봐요 동물의 숲: 포켓 캠프',
    title_de: 'Animal Crossing: Pocket Camp',
    emoji: '🍃',
    tag_en: 'Cute · Creative · Character-Focused',
    tag_zh: '可爱 · 创意 · 角色为核心',
    tag_zhTW: '可愛 · 創意 · 角色為核心',
    tag_ja: 'かわいい · クリエイティブ · キャラクター重視',
    tag_ko: '귀여움 · 창의성 · 캐릭터 중심',
    tag_de: 'Niedlich · Kreativ · Charakter-Fokus',
    platform_en: 'iOS · Android · Free (subscription available)',
    platform_zh: 'iOS · Android · 免费（可订阅）',
    platform_zhTW: 'iOS · Android · 免費（可訂閱）',
    platform_ja: 'iOS · Android · 無料（サブスクあり）',
    platform_ko: 'iOS · Android · 무료 (구독 가능)',
    platform_de: 'iOS · Android · Kostenlos (Abo verfügbar)',
    desc_en:
      "Animal Crossing: Pocket Camp brings the beloved Nintendo franchise to mobile in a focused form. You manage a campsite, befriend Animal Crossing villagers by fulfilling their requests, collect furniture and clothing, and decorate your camp and cabin with Nintendo-quality polish. The seasonal crafting events are a highlight — limited-time furniture sets tied to real-world seasons and holidays. If you love the Animal Crossing aesthetic and want it in short, satisfying mobile sessions, Pocket Camp delivers.",
    desc_zh:
      '动物之森：口袋营地将深受喜爱的任天堂系列以专注的形式带到手机上。你管理一个露营地、通过满足动物森友会村民的要求与他们建立友谊、收集家具和服装，以及用任天堂品质的精良装饰你的营地和小屋。季节性制作活动是亮点——与现实世界季节和节日相关的限时家具套装。如果你喜欢动物森友会的美学风格，想要在短暂、令人满足的手机游戏时段中体验它，口袋营地能满足你。',
    desc_zhTW:
      '動物之森：口袋營地將深受喜愛的任天堂系列以專注的形式帶到手機上。你管理一個露營地、通過滿足動物森友會村民的要求與他們建立友誼、收集家具和服裝，以及用任天堂品質的精良裝飾你的營地和小屋。季節性製作活動是亮點——與現實世界季節和節日相關的限時家具套裝。如果你喜歡動物森友會的美學風格，想要在短暫、令人滿足的手機遊戲時段中體驗它，口袋營地能滿足你。',
    desc_ja:
      'どうぶつの森 ポケットキャンプは、人気の任天堂シリーズをスマホ向けにコンパクトにまとめた作品です。キャンプサイトを管理しながら、村人のお願いをかなえて仲良くなり、家具や服を集め、任天堂クオリティのこだわりでキャンプや小屋をデコレーション。季節のイベントでは実際の季節や祝日に合わせた限定家具セットが手に入るのが魅力です。どうぶつの森の世界観が好きで、隙間時間にほっこり楽しみたい方にぴったりです。',
    desc_ko:
      '모여봐요 동물의 숲: 포켓 캠프는 사랑받는 닌텐도 시리즈를 모바일에 집중적으로 담은 작품입니다. 캠프장을 관리하고, 주민들의 요청을 들어줘 친해지고, 가구와 옷을 수집하고, 닌텐도 품질의 완성도로 캠프와 오두막을 꾸밉니다. 계절별 공예 이벤트는 하이라이트 — 실제 계절과 명절에 맞춘 한정판 가구 세트. 동물의 숲 감성을 좋아하고 짧은 모바일 세션에서 즐기고 싶다면 포켓 캠프가 답입니다.',
    desc_de:
      'Animal Crossing: Pocket Camp bringt die beliebte Nintendo-Reihe in kompakter Form aufs Handy. Du verwaltest einen Campingplatz, befreundest dich mit Animal-Crossing-Bewohnern, sammelst Möbel und Kleidung und dekorierst dein Camp mit Nintendo-typischer Sorgfalt. Die saisonalen Bastel-Events sind ein Highlight — zeitlich begrenzte Möbel-Sets zu echten Jahreszeiten und Feiertagen. Wer die Animal-Crossing-Ästhetik liebt und sie in kurzen, befriedigenden Mobile-Sessions erleben will, wird hier fündig.',
    pro_en: [
      'Official Nintendo Animal Crossing experience on mobile — full villager roster',
      'Seasonal crafting events with beautiful limited-edition furniture sets',
      'Low time pressure — perfect for short daily check-ins and creative decoration',
    ],
    pro_zh: [
      '官方任天堂动物森友会手机体验——完整的村民阵容',
      '季节性制作活动，有精美的限定版家具套装',
      '时间压力低——非常适合短暂的每日查看和创意装饰',
    ],
    pro_zhTW: [
      '官方任天堂動物森友會手機體驗——完整的村民陣容',
      '季節性製作活動，有精美的限定版家具套裝',
      '時間壓力低——非常適合短暫的每日查看和創意裝飾',
    ],
    pro_ja: [
      '任天堂公式のどうぶつの森スマホ体験——フルの村人ラインナップ',
      '美しい限定家具セットが手に入る季節クラフトイベント',
      '時間的プレッシャーが少ない——毎日ちょっとチェックとデコレーションに最適',
    ],
    pro_ko: [
      '공식 닌텐도 동물의 숲 모바일 경험 — 전체 주민 라인업',
      '아름다운 한정판 가구 세트가 있는 시즌 공예 이벤트',
      '시간 압박 낮음 — 짧은 일일 체크인과 창의적인 꾸미기에 완벽',
    ],
    pro_de: [
      'Offizielle Nintendo Animal-Crossing-Erfahrung auf dem Handy — volle Bewohner-Auswahl',
      'Saisonale Bastel-Events mit wunderschönen Limited-Edition-Möbel-Sets',
      'Geringer Zeitdruck — perfekt für kurze tägliche Check-ins und kreative Dekoration',
    ],
    watch_en: "The Leaf Tickets premium currency is needed for some content — the subscription (Nook N Go) makes the experience significantly smoother.",
    watch_zh: '部分内容需要高级货币树叶票——订阅（小熊快跑）会让体验顺畅得多。',
    watch_zhTW: '部分內容需要高級貨幣樹葉票——訂閱（小熊快跑）會讓體驗順暢得多。',
    watch_ja: '一部コンテンツにはプレミアム通貨の「コノハチケット」が必要——サブスクリプション（タヌポータル）を使うとかなり快適になります。',
    watch_ko: '일부 콘텐츠는 프리미엄 화폐인 잎 티켓이 필요합니다 — 구독(너굴 이동 서비스)을 사용하면 경험이 훨씬 부드러워집니다.',
    watch_de: 'Für manche Inhalte werden Leaf Tickets als Premium-Währung benötigt — mit dem Abo (Nook N Go) läuft es deutlich reibungsloser.',
  },
}

function calcResult(answers: Game[]): Game {
  const counts: Record<Game, number> = { hayday: 0, stardew: 0, township: 0, pocketcamp: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Game
}

export function MobileFarmingQuiz({ locale }: { locale: string }) {
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

  const isZh = locale === 'zh' || locale === 'zh-TW'
  const [answers, setAnswers] = useState<(Game | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Game[])]
    const url = `${BASE_URL}/${locale}/quizzes/mobile-farming-quiz`
    const shareText = getLoc(
      `最适合我的手机农场游戏是「${result.title_zh}」！来测测你的：${url}`,
      `My perfect mobile farming game is ${result.title_en}! Find yours: ${url}`,
      `最適合我的手機農場遊戲是「${result.title_zhTW}」！來測測你的：${url}`,
      `私にぴったりのスマホ農場ゲームは「${result.title_ja}」でした！あなたも試してみて：${url}`,
      `나에게 딱 맞는 모바일 농장 게임은 「${result.title_ko}」입니다! 당신도 테스트해보세요：${url}`,
      `Mein perfektes mobiles Farmspiel ist ${result.title_de}! Finde deins: ${url}`,
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
          {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {getLoc('为什么适合你', 'Why it fits you', '為什麼適合你', 'あなたに向いている理由', '나에게 맞는 이유', 'Warum es zu dir passt')}
          </h3>
          <ul className="space-y-2">
            {getLocArr(result.pro_zh, result.pro_en, result.pro_zhTW, result.pro_ja, result.pro_ko, result.pro_de).map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-[#2d3d2d] pt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {getLoc('需要注意', 'Watch out for', '需要注意', '注意点', '주의할 점', 'Aufpassen bei')}
            </p>
            <p className="text-sm text-[#8a9a7a]">
              {getLoc(result.watch_zh, result.watch_en, result.watch_zhTW, result.watch_ja, result.watch_ko, result.watch_de)}
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
            '哪款手机农场游戏最适合你？',
            'Which Mobile Farming Game Is Right for You?',
            '哪款手機農場遊戲最適合你？',
            'あなたにぴったりのスマホ農場ゲームは？',
            '나에게 딱 맞는 모바일 농장 게임은?',
            'Welches mobile Farmspiel passt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个关于游戏习惯的问题，从 Hay Day、星露谷、Township、动物之森口袋营地中精准推荐',
            '6 questions about how you play to match you with Hay Day, Stardew Valley, Township, or Pocket Camp',
            '6 個關於遊戲習慣的問題，從 Hay Day、星露谷、Township、動物之森口袋營地中精準推薦',
            'プレイスタイルに関する6つの質問で、Hay Day・スターデューバレー・タウンシップ・ポケットキャンプからあなたに合う一本を探します',
            '플레이 스타일에 관한 6가지 질문으로 Hay Day, 스타듀 밸리, 타운십, 포켓 캠프 중 나에게 맞는 게임을 찾아보세요',
            '6 Fragen zu deinen Spielgewohnheiten — damit wir dir aus Hay Day, Stardew Valley, Township oder Pocket Camp das Richtige empfehlen',
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
          '找到我的手机农场游戏',
          'Find My Mobile Farming Game',
          '找到我的手機農場遊戲',
          '私に合うゲームを見つける',
          '나에게 맞는 게임 찾기',
          'Mein Farmspiel finden',
        )}
      </button>
    </div>
  )
}
