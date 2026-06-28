'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'acnh' | 'stardew' | 'palia' | 'dreamlight'

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
  const copiedLabel =
    locale === 'zh' ? '✓ 已复制！' :
    locale === 'zh-TW' ? '✓ 已複製！' :
    locale === 'ja' ? '✓ コピーしました！' :
    locale === 'ko' ? '✓ 복사되었습니다!' :
    locale === 'de' ? '✓ Kopiert!' :
    '✓ Copied!'
  const copyLabel =
    locale === 'zh' ? '📋 复制结果' :
    locale === 'zh-TW' ? '📋 複製結果' :
    locale === 'ja' ? '📋 結果をコピー' :
    locale === 'ko' ? '📋 결과 복사' :
    locale === 'de' ? '📋 Ergebnis kopieren' :
    '📋 Copy result'
  const shareLabel =
    locale === 'zh' ? '分享' :
    locale === 'zh-TW' ? '分享' :
    locale === 'ja' ? 'シェア' :
    locale === 'ko' ? '공유' :
    locale === 'de' ? 'Teilen' :
    'Share'
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
    q_en: "You're new to cozy games. What worries you most?",
    q_zh: '你是 cozy 游戏新手。你最担心什么？',
    q_zhTW: '你是 cozy 遊戲新手。你最擔心什麼？',
    q_ja: 'コージーゲーム初心者のあなた。一番心配なことは？',
    q_ko: '코지 게임을 처음 시작하는 분이시군요. 가장 걱정되는 게 뭔가요?',
    q_de: 'Du bist neu bei Cozy Games. Was macht dir am meisten Sorgen?',
    options: [
      {
        en: 'Getting overwhelmed by too many systems to learn at once',
        zh: '被太多需要同时学习的系统压倒',
        zhTW: '被太多需要同時學習的系統壓倒',
        ja: '一度に覚えることが多すぎて混乱しそう',
        ko: '한꺼번에 배워야 할 시스템이 너무 많아서 압도당할 것 같아요',
        de: 'Überfordert sein, weil es auf einmal zu viele Systeme zu lernen gibt',
        type: 'acnh',
      },
      {
        en: 'Failing or dying and having to start over',
        zh: '失败或死亡，不得不重新开始',
        zhTW: '失敗或死亡，不得不重新開始',
        ja: '失敗したり死んだりして最初からやり直しになること',
        ko: '실패하거나 죽어서 처음부터 다시 시작해야 하는 것',
        de: 'Scheitern oder sterben und wieder von vorne anfangen müssen',
        type: 'palia',
      },
      {
        en: 'Not knowing what to do next and getting stuck',
        zh: '不知道接下来做什么而卡住',
        zhTW: '不知道接下來要做什麼而卡住',
        ja: '次に何をすればいいかわからなくて詰まること',
        ko: '다음에 뭘 해야 할지 몰라서 막히는 것',
        de: 'Nicht wissen, was als nächstes zu tun ist, und feststecken',
        type: 'stardew',
      },
      {
        en: 'Spending money and not enjoying it',
        zh: '花了钱但不喜欢',
        zhTW: '花了錢但不喜歡',
        ja: 'お金を使ったのに楽しめないこと',
        ko: '돈을 쓰고 나서 재미없으면 어쩌나 하는 걱정',
        de: 'Geld ausgeben und dann keinen Spaß haben',
        type: 'dreamlight',
      },
    ],
  },
  {
    q_en: 'How long can you comfortably play in one sitting as a beginner?',
    q_zh: '作为新手，你在一次游戏中能舒适地玩多长时间？',
    q_zhTW: '作為新手，你在一次遊戲中能舒適地玩多長時間？',
    q_ja: '初心者として、一回のプレイで快適に遊べる時間はどのくらいですか？',
    q_ko: '초보자로서 한 번에 편하게 플레이할 수 있는 시간은 얼마나 되나요?',
    q_de: 'Wie lange kannst du als Anfänger bequem in einer Sitzung spielen?',
    options: [
      {
        en: '15–30 minutes — I want to ease in slowly',
        zh: '15-30 分钟——我想慢慢适应',
        zhTW: '15-30 分鐘——我想慢慢適應',
        ja: '15〜30分──ゆっくり慣れていきたい',
        ko: '15~30분 — 천천히 적응하고 싶어요',
        de: '15–30 Minuten — ich möchte langsam einsteigen',
        type: 'acnh',
      },
      {
        en: '30–60 minutes — I need enough time to explore but not too long',
        zh: '30-60 分钟——我需要足够时间探索，但不要太长',
        zhTW: '30-60 分鐘——我需要足夠時間探索，但不要太長',
        ja: '30〜60分──探索する時間は欲しいけど長すぎない程度',
        ko: '30~60분 — 탐험할 시간은 충분히 필요하지만 너무 길면 안 돼요',
        de: '30–60 Minuten — ich brauche genug Zeit zum Erkunden, aber nicht zu lange',
        type: 'dreamlight',
      },
      {
        en: '1–2 hours — I am willing to invest time to learn something properly',
        zh: '1-2 小时——我愿意花时间好好学习',
        zhTW: '1-2 小時——我願意花時間好好學習',
        ja: '1〜2時間──ちゃんと学ぶために時間を投資できる',
        ko: '1~2시간 — 제대로 배우기 위해 시간을 투자할 의향이 있어요',
        de: '1–2 Stunden — ich bin bereit, Zeit zu investieren, um etwas richtig zu lernen',
        type: 'stardew',
      },
      {
        en: 'Flexible — I just need to be able to pick up and put down easily',
        zh: '弹性——我只需要能随时拿起和放下',
        zhTW: '彈性——我只需要能隨時拿起和放下',
        ja: '自由──いつでも気軽に始めたり止めたりできればOK',
        ko: '자유롭게 — 그냥 언제든 쉽게 시작하고 멈출 수 있으면 돼요',
        de: 'Flexibel — ich muss es nur leicht aufnehmen und wieder weglegen können',
        type: 'palia',
      },
    ],
  },
  {
    q_en: 'What kind of cozy game experience sounds most appealing to start with?',
    q_zh: '作为开始，哪种 cozy 游戏体验听起来最吸引你？',
    q_zhTW: '作為開始，哪種 cozy 遊戲體驗聽起來最吸引你？',
    q_ja: '最初に体験してみたいコージーゲームはどんなもの？',
    q_ko: '처음으로 경험해보고 싶은 코지 게임은 어떤 건가요?',
    q_de: 'Welche Art von Cozy-Game-Erfahrung klingt für den Einstieg am verlockendsten?',
    options: [
      {
        en: 'A gentle, creative world where I decorate and make friends at my own pace',
        zh: '一个温和的创意世界，我可以按自己的节奏装饰和交朋友',
        zhTW: '一個溫和的創意世界，我可以按自己的節奏裝飾和交朋友',
        ja: 'のんびり自分のペースで島を飾りつけたり友達を作ったりできる世界',
        ko: '내 속도에 맞춰 꾸미고 친구를 사귀는 부드럽고 창의적인 세계',
        de: 'Eine sanfte, kreative Welt, in der ich in meinem eigenen Tempo dekoriere und Freundschaften schließe',
        type: 'acnh',
      },
      {
        en: 'A relaxing farm where I grow crops, fish, and explore at leisure',
        zh: '一个轻松的农场，我可以种植作物、钓鱼、悠然探索',
        zhTW: '一個輕鬆的農場，我可以種植作物、釣魚、悠然探索',
        ja: '作物を育てたり、釣りをしたり、ゆっくり探索できる癒しの農場',
        ko: '작물을 키우고, 낚시하고, 여유롭게 탐험하는 힐링 농장',
        de: 'Eine entspannte Farm, auf der ich Pflanzen anbaue, angle und in Ruhe erkunde',
        type: 'stardew',
      },
      {
        en: 'A free online world where I can explore and meet people when I feel like it',
        zh: '一个免费的在线世界，我可以随心所欲地探索和认识人',
        zhTW: '一個免費的線上世界，我可以隨心所欲地探索和認識人',
        ja: '気が向いたときに探索して人と交流できる、無料のオンラインの世界',
        ko: '마음 내킬 때 자유롭게 탐험하고 사람들을 만날 수 있는 무료 온라인 세계',
        de: 'Eine kostenlose Online-Welt, in der ich erkunden und Menschen kennenlernen kann, wann immer ich Lust habe',
        type: 'palia',
      },
      {
        en: 'A charming world filled with characters I already know and love',
        zh: '一个充满我已经认识和喜爱的角色的迷人世界',
        zhTW: '一個充滿我已經認識和喜愛的角色的迷人世界',
        ja: '知っていて大好きなキャラクターたちが溢れる、魅力的な世界',
        ko: '이미 알고 좋아하는 캐릭터들로 가득한 매력적인 세계',
        de: 'Eine charmante Welt voller Charaktere, die ich bereits kenne und liebe',
        type: 'dreamlight',
      },
    ],
  },
  {
    q_en: 'Which statement describes you best right now?',
    q_zh: '哪句话最能描述现在的你？',
    q_zhTW: '哪句話最能描述現在的你？',
    q_ja: '今の自分に一番当てはまるのはどれ？',
    q_ko: '지금 자신을 가장 잘 설명하는 것은?',
    q_de: 'Welche Aussage beschreibt dich gerade am besten?',
    options: [
      {
        en: "I've never really gotten into video games but cozy games seem different",
        zh: '我从来没有真正喜欢过电子游戏，但 cozy 游戏看起来不一样',
        zhTW: '我從來沒有真正喜歡過電子遊戲，但 cozy 遊戲看起來不一樣',
        ja: 'これまでゲームにハマったことはないけど、コージーゲームは何か違いそう',
        ko: '게임에 빠져든 적은 없는데 코지 게임은 왠지 다를 것 같아요',
        de: 'Ich bin nie wirklich in Videospiele reingekommen, aber Cozy Games wirken anders',
        type: 'acnh',
      },
      {
        en: "I've played some games before but nothing like cozy farming games",
        zh: '我以前玩过一些游戏，但没有玩过像 cozy 农场游戏这样的',
        zhTW: '我以前玩過一些遊戲，但沒有玩過像 cozy 農場遊戲這樣的',
        ja: 'ゲームは少しやったことあるけど、農場系のコージーゲームは未経験',
        ko: '게임은 좀 해봤지만 코지 농장 게임 같은 건 해본 적 없어요',
        de: 'Ich habe schon einige Spiele gespielt, aber noch nie ein gemütliches Farming-Spiel',
        type: 'stardew',
      },
      {
        en: "I've played some mobile games and I'm ready to try something on PC or Switch",
        zh: '我玩过一些手机游戏，准备在 PC 或 Switch 上尝试新东西',
        zhTW: '我玩過一些手機遊戲，準備在 PC 或 Switch 上嘗試新東西',
        ja: 'スマホゲームは少しやったことあって、PCかSwitchで何か試してみたい',
        ko: '모바일 게임은 좀 해봤고, 이제 PC나 스위치로 새로운 걸 시도해보려고요',
        de: 'Ich habe einige Mobile Games gespielt und bin bereit, etwas auf dem PC oder Switch auszuprobieren',
        type: 'palia',
      },
      {
        en: "I love Disney/anime and want a game that feels like those worlds",
        zh: '我喜欢 Disney/动漫，想要一款感觉像那些世界的游戏',
        zhTW: '我喜歡 Disney/動漫，想要一款感覺像那些世界的遊戲',
        ja: 'ディズニーやアニメが好きで、そんな世界観のゲームをやってみたい',
        ko: '디즈니나 애니메이션을 좋아해서 그런 세계관의 게임을 하고 싶어요',
        de: 'Ich liebe Disney/Anime und möchte ein Spiel, das sich wie diese Welten anfühlt',
        type: 'dreamlight',
      },
    ],
  },
  {
    q_en: 'What is your biggest priority for your first cozy game?',
    q_zh: '对于你的第一款 cozy 游戏，什么是你的最大优先级？',
    q_zhTW: '對於你的第一款 cozy 遊戲，什麼是你的最大優先級？',
    q_ja: '初めてのコージーゲームで一番大切にしたいことは？',
    q_ko: '첫 번째 코지 게임에서 가장 중요하게 생각하는 것은?',
    q_de: 'Was hat für dich bei deinem ersten Cozy Game höchste Priorität?',
    options: [
      {
        en: 'Zero stress — I need a game that is impossible to play wrong',
        zh: '零压力——我需要一款不可能玩错的游戏',
        zhTW: '零壓力——我需要一款不可能玩錯的遊戲',
        ja: 'ストレスゼロ──どう遊んでも失敗しないゲームがいい',
        ko: '스트레스 제로 — 잘못 플레이할 수 없는 게임이 필요해요',
        de: 'Null Stress — ich brauche ein Spiel, das man unmöglich falsch spielen kann',
        type: 'acnh',
      },
      {
        en: 'Depth — I want something that will keep me engaged for months',
        zh: '深度——我想要一款能让我投入数月的游戏',
        zhTW: '深度——我想要一款能讓我投入數個月的遊戲',
        ja: 'やりこみ要素──何ヶ月も楽しめるゲームがいい',
        ko: '깊이감 — 몇 달 동안 계속 즐길 수 있는 게임을 원해요',
        de: 'Tiefe — ich möchte etwas, das mich monatelang beschäftigt',
        type: 'stardew',
      },
      {
        en: 'Free — I want to try before committing any money',
        zh: '免费——我想在花钱之前先试试',
        zhTW: '免費——我想在花錢之前先試試',
        ja: '無料──お金を出す前にまず試してみたい',
        ko: '무료 — 돈을 쓰기 전에 먼저 해보고 싶어요',
        de: 'Kostenlos — ich möchte es ausprobieren, bevor ich Geld ausgebe',
        type: 'palia',
      },
      {
        en: 'Familiar — I want characters and settings that feel welcoming from day one',
        zh: '熟悉感——我想要从第一天起就感觉亲切的角色和场景',
        zhTW: '熟悉感——我想要從第一天起就感覺親切的角色和場景',
        ja: '親しみやすさ──初日から温かく迎えてくれるキャラクターや世界観がいい',
        ko: '친숙함 — 첫날부터 편안하게 느껴지는 캐릭터와 배경이 있었으면 해요',
        de: 'Vertrautheit — ich möchte Charaktere und Umgebungen, die sich vom ersten Tag an einladend anfühlen',
        type: 'dreamlight',
      },
    ],
  },
  {
    q_en: 'How do you feel about making mistakes while learning a new game?',
    q_zh: '学习新游戏时犯错误你感觉如何？',
    q_zhTW: '學習新遊戲時犯錯誤你感覺如何？',
    q_ja: '新しいゲームを学ぶときに失敗することについてどう思う？',
    q_ko: '새 게임을 배우면서 실수하는 것에 대해 어떻게 생각하나요?',
    q_de: 'Wie fühlst du dich dabei, beim Erlernen eines neuen Spiels Fehler zu machen?',
    options: [
      {
        en: "I want a game where mistakes literally do not matter — I need the safety net",
        zh: '我想要一款字面意义上错误无所谓的游戏——我需要安全网',
        zhTW: '我想要一款字面意義上錯誤無所謂的遊戲——我需要安全網',
        ja: '文字通りミスしても関係ないゲームがいい──安全網が必要',
        ko: '말 그대로 실수가 아무 의미 없는 게임을 원해요 — 안전망이 필요해요',
        de: 'Ich möchte ein Spiel, in dem Fehler buchstäblich keine Rolle spielen — ich brauche das Sicherheitsnetz',
        type: 'acnh',
      },
      {
        en: "I'm okay with gentle mistakes — missing a crop or doing something suboptimally",
        zh: '我可以接受温和的错误——错过作物或做了不那么完美的事情',
        zhTW: '我可以接受溫和的錯誤——錯過作物或做了不那麼完美的事情',
        ja: 'ちょっとしたミスはOK──作物を見逃したり最適でない行動をしたりするくらいなら',
        ko: '가벼운 실수는 괜찮아요 — 작물을 놓치거나 최적이 아닌 행동을 하는 정도라면',
        de: 'Ich bin okay mit kleinen Fehlern — eine Ernte verpassen oder etwas suboptimal machen',
        type: 'stardew',
      },
      {
        en: "I'm fine learning by doing — just don't punish me harshly for trying things",
        zh: '我可以边做边学——只是不要因为尝试而严厉惩罚我',
        zhTW: '我可以邊做邊學——只是不要因為嘗試而嚴厲懲罰我',
        ja: 'やりながら学ぶのは大丈夫──ただ試したことで厳しく罰せられるのは嫌',
        ko: '해보면서 배우는 건 괜찮아요 — 그냥 시도했다고 너무 심하게 벌받지만 않으면 돼요',
        de: 'Ich lerne gern durch Ausprobieren — bestraf mich nur nicht zu hart dafür',
        type: 'palia',
      },
      {
        en: "I want clear guidance that shows me what to do so I don't have to guess",
        zh: '我想要清晰的指引告诉我该做什么，这样我就不必猜测',
        zhTW: '我想要清晰的指引告訴我該做什麼，這樣我就不必猜測',
        ja: '何をすべきか教えてくれる明確なガイダンスが欲しい──自分で推測したくない',
        ko: '무엇을 해야 할지 알려주는 명확한 안내가 있으면 좋겠어요 — 추측하고 싶지 않아요',
        de: 'Ich möchte klare Anleitung, die mir zeigt, was zu tun ist, damit ich nicht raten muss',
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
    why_en: string
    why_zh: string
    why_zhTW: string
    why_ja: string
    why_ko: string
    why_de: string
    start_en: string[]
    start_zh: string[]
    start_zhTW: string[]
    start_ja: string[]
    start_ko: string[]
    start_de: string[]
  }
> = {
  acnh: {
    title_en: 'Animal Crossing: New Horizons',
    title_zh: '动物之森：新视野',
    title_zhTW: '集合啦！動物森友會',
    title_ja: 'あつまれ どうぶつの森',
    title_ko: '모여봐요 동물의 숲',
    title_de: 'Animal Crossing: New Horizons',
    emoji: '🍃',
    tag_en: 'The most beginner-friendly major cozy game ever made',
    tag_zh: '有史以来对新手最友好的主流 cozy 游戏',
    tag_zhTW: '史上對新手最友善的主流 cozy 遊戲',
    tag_ja: '史上最もビギナーに優しいメジャーコージーゲーム',
    tag_ko: '역대 가장 초보자 친화적인 메이저 코지 게임',
    tag_de: 'Das einsteigerfreundlichste große Cozy Game aller Zeiten',
    why_en:
      "Animal Crossing: New Horizons is the perfect first cozy game for you. It is designed from the ground up to have no way to fail: you can never die, there is no time pressure on most activities, no crops that wither, no enemies, and no bad outcomes from any choice you make. The real-world clock means your island grows organically over days and weeks — it never rushes you. You arrive on a deserted island, get a tent and some tools, and simply begin. Nook Inc. gives you gentle daily hints but never demands. You will be playing comfortably within 15 minutes of starting.",
    why_zh:
      '动物之森：新视野是完美的第一款 cozy 游戏。它从根本上设计成没有任何失败方式：你永远不会死亡、大多数活动没有时间压力、没有会枯萎的作物、没有敌人，你做的任何选择都没有不好的结果。实时时钟意味着你的岛屿在几天和几周内有机地成长——它永远不会催促你。你来到一个荒岛，得到一个帐篷和一些工具，然后简单地开始。Nook 公司给你温和的每日提示但从不要求。开始后 15 分钟内你就能轻松游玩。',
    why_zhTW:
      '集合啦！動物森友會是你最完美的第一款 cozy 遊戲。它從設計根本上就沒有任何失敗方式：你永遠不會死亡、大多數活動沒有時間壓力、沒有會枯萎的作物、沒有敵人，你的任何選擇都不會有壞結果。現實時鐘意味著你的島嶼會在幾天幾週內自然成長——從不催促你。你抵達荒島、拿到帳篷和工具，就這樣開始了。Nook 公司給你溫和的每日提示，但從不強求。開始後 15 分鐘內你就能輕鬆遊玩。',
    why_ja:
      'あつまれ どうぶつの森は、あなたにとって最高の最初のコージーゲームです。ゲームオーバーがない、ほとんどの活動に時間制限がない、枯れる作物もない、敵もいない、どんな選択をしても悪い結果にならない──失敗する方法が存在しないよう、根本から設計されています。現実の時計に連動しているので、島は何日も何週間もかけてゆっくり育ちます。無人島に辿り着き、テントと道具を受け取って、ただ始めるだけ。たぬきちの会社が毎日やさしくヒントをくれますが、急かしてくることはありません。始めてから15分以内に快適に遊べるようになりますよ。',
    why_ko:
      '모여봐요 동물의 숲은 당신에게 완벽한 첫 번째 코지 게임입니다. 죽을 수 없고, 대부분의 활동에 시간 제한이 없으며, 시들어 버리는 작물도 없고, 적도 없고, 어떤 선택을 해도 나쁜 결과가 없도록 처음부터 설계되었습니다. 실제 시계에 연동되어 섬은 며칠, 몇 주에 걸쳐 자연스럽게 성장합니다 — 절대 서두르게 만들지 않아요. 무인도에 도착해서 텐트와 도구를 받고 그냥 시작하면 됩니다. 너굴 주식회사가 매일 부드럽게 힌트를 주지만 강요하지는 않아요. 시작하고 15분 안에 편안하게 즐길 수 있을 거예요.',
    why_de:
      'Animal Crossing: New Horizons ist das perfekte erste Cozy Game für dich. Es wurde von Grund auf so gestaltet, dass es keine Möglichkeit gibt zu scheitern: Du kannst nie sterben, bei den meisten Aktivitäten gibt es keinen Zeitdruck, keine Pflanzen, die verwelken, keine Gegner, und keine schlechten Konsequenzen aus deinen Entscheidungen. Die Echtzeituhr bedeutet, dass deine Insel organisch über Tage und Wochen wächst — sie hetzt dich nie. Du kommst auf einer verlassenen Insel an, bekommst ein Zelt und ein paar Werkzeuge und fängst einfach an. Die Nook AG gibt dir sanfte tägliche Hinweise, verlangt aber nichts. Du wirst innerhalb von 15 Minuten nach dem Start bequem spielen.',
    start_en: [
      'Talk to Timmy in the shop every day early on — daily shopping unlocks items and recipes',
      "Plant fruit trees near your starting area — fruit sells for bells and is your first income source",
      "Don't worry about designing your island early — it changes constantly and nothing is permanent",
    ],
    start_zh: [
      '早期每天和商店里的唐托姆谈话——每日购物解锁物品和配方',
      '在起始区域附近种植果树——水果可以卖成铃钱，是你的第一个收入来源',
      '早期不要担心设计你的岛屿——它会不断变化，没有任何东西是永久的',
    ],
    start_zhTW: [
      '早期每天和商店裡的唐唐說話——每日購物可以解鎖物品和配方',
      '在起始區域附近種植果樹——水果可以換成鈴錢，是你最初的收入來源',
      '早期不用擔心設計島嶼——它會不斷變化，沒有任何東西是永久的',
    ],
    start_ja: [
      '序盤はショップのマメタロウに毎日話しかけよう──毎日の買い物でアイテムやレシピが解放される',
      'スタートエリアの近くに果樹を植えよう──果物はベル稼ぎになり、最初の収入源になる',
      '序盤から島のデザインを気にしなくて大丈夫──どんどん変わっていくし、永久に固定されるものは何もない',
    ],
    start_ko: [
      '초반에는 매일 상점의 너굴이와 대화하세요 — 매일 쇼핑하면 아이템과 레시피가 해금돼요',
      '시작 구역 근처에 과일나무를 심으세요 — 과일은 종을 벌 수 있는 첫 번째 수입원이에요',
      '초반에 섬 디자인을 걱정하지 마세요 — 계속 바뀌고 영구적인 것은 아무것도 없어요',
    ],
    start_de: [
      'Rede früh im Spiel jeden Tag mit Tommy im Laden — tägliches Einkaufen schaltet Gegenstände und Rezepte frei',
      'Pflanze Obstbäume in der Nähe deines Startbereichs — Obst lässt sich für Sternis verkaufen und ist deine erste Einnahmequelle',
      "Mach dir früh keine Sorgen um das Design deiner Insel — es ändert sich ständig und nichts ist dauerhaft",
    ],
  },
  stardew: {
    title_en: 'Stardew Valley',
    title_zh: '星露谷物语',
    title_zhTW: '星露谷物語',
    title_ja: 'スターデューバレー',
    title_ko: '스타듀 밸리',
    title_de: 'Stardew Valley',
    emoji: '🌾',
    tag_en: 'The gold standard first farming game — forgiving and deep',
    tag_zh: '黄金标准第一款农场游戏——宽容且有深度',
    tag_zhTW: '農場遊戲的黃金標準——寬容且有深度',
    tag_ja: '農場ゲームの金字塔──寛容でやりこみ要素たっぷり',
    tag_ko: '농장 게임의 황금 기준 — 관대하고 깊이 있는 첫 번째 게임',
    tag_de: 'Das goldene Standard-Farmingspiel — verzeihend und tiefgründig',
    why_en:
      "Stardew Valley is the right first cozy game for you — you want depth and are willing to invest a bit of time to learn. The game is forgiving by design: you never permanently lose anything important (you drop some items and gold if you pass out in the mines, but nothing game-ending), and you can take the community center at your own pace across multiple in-game years. The first week teaches you farming, the second adds mining, and you build naturally from there. Millions of people played Stardew Valley as their first ever farming game and never looked back.",
    why_zh:
      '星露谷物语是最适合你的第一款 cozy 游戏——你想要深度，愿意花一点时间学习。游戏设计上是宽容的：你永远不会永久失去任何重要的东西（如果你在矿洞晕倒会掉落一些物品和金钱，但没有游戏终结的情况），你可以在多个游戏年里按自己的节奏完成社区中心。第一周教你农业，第二周增加挖矿，然后你自然地从那里成长。数百万人将星露谷物语作为他们的第一款农场游戏，从此一发不可收拾。',
    why_zhTW:
      '星露谷物語是最適合你的第一款 cozy 遊戲——你想要深度，也願意花一點時間學習。遊戲設計本身就很寬容：你永遠不會永久失去任何重要的東西（在礦洞暈倒會掉落一些物品和金錢，但不會遊戲結束），你可以在多個遊戲年裡按自己的節奏完成社區中心。第一週教你農業，第二週加入採礦，然後自然而然地成長。數百萬人把星露谷物語當作他們的第一款農場遊戲，從此一頭栽進去再也回不了頭。',
    why_ja:
      'スターデューバレーはあなたにぴったりの最初のコージーゲームです。深みを求めていて、少し時間をかけて学ぶ覚悟がある方に最適。設計上ゲームは寛容です。重要なものが永久に失われることはなく（鉱山で倒れるとアイテムやゴールドをいくつか落としますが、ゲームオーバーにはなりません）、コミュニティセンターも複数のゲーム年をかけて自分のペースで進められます。最初の週で農業、次の週で採掘が加わり、そこから自然に広がっていきます。何百万人もの人々がスターデューバレーを初めての農場ゲームとして遊び、もう後には戻れなくなりました。',
    why_ko:
      '스타듀 밸리는 당신에게 딱 맞는 첫 번째 코지 게임입니다 — 깊이를 원하고 배우는 데 시간을 투자할 의향이 있는 분에게 맞아요. 게임은 설계 자체가 관대합니다. 중요한 것을 영구적으로 잃는 일은 없고 (광산에서 쓰러지면 아이템과 골드를 일부 잃지만 게임이 끝나지는 않아요), 커뮤니티 센터도 여러 게임 연도에 걸쳐 자신의 속도로 진행할 수 있어요. 첫 번째 주는 농업을 가르쳐 주고, 두 번째 주에 채광이 추가되며, 거기서부터 자연스럽게 성장합니다. 수백만 명의 사람들이 스타듀 밸리를 첫 번째 농장 게임으로 시작해서 다시는 뒤를 돌아보지 않았어요.',
    why_de:
      'Stardew Valley ist das richtige erste Cozy Game für dich — du willst Tiefe und bist bereit, ein bisschen Zeit zum Lernen zu investieren. Das Spiel ist von Natur aus verzeihend: Du verlierst nie dauerhaft etwas Wichtiges (du verlierst einige Gegenstände und Gold, wenn du in der Mine ohnmächtig wirst, aber nichts Spielentscheidendes), und du kannst das Gemeindezentrum in deinem eigenen Tempo über mehrere Spieljahre abschließen. Die erste Woche bringt dir das Farmen bei, die zweite fügt das Bergbauen hinzu, und von dort aus baust du ganz natürlich auf. Millionen von Menschen haben Stardew Valley als ihr erstes Farming-Spiel gespielt und nie zurückgeschaut.',
    start_en: [
      "Your first spring: grow parsnips and strawberries — parsnips are easy money and strawberries take multiple harvests",
      'Enter the mines as soon as Pierre unlocks the backpack upgrade — resources from mining help everything else',
      "Don't try to do everything in year one — it takes multiple in-game years to complete everything, and that's okay",
    ],
    start_zh: [
      '你的第一个春天：种植防风草和草莓——防风草容易赚钱，草莓可以多次收获',
      '皮埃尔解锁背包升级后立刻进入矿洞——挖矿的资源对其他一切都有帮助',
      '不要试图在第一年完成所有事情——完成一切需要多个游戏年，这完全没问题',
    ],
    start_zhTW: [
      '你的第一個春天：種植防風草和草莓——防風草容易賺錢，草莓可以多次收穫',
      '皮耶爾解鎖背包升級後立刻進入礦洞——挖礦資源對其他一切都有幫助',
      '不要試圖在第一年完成所有事情——完成一切需要多個遊戲年，這完全沒問題',
    ],
    start_ja: [
      '最初の春：パースニップとイチゴを育てよう──パースニップは手軽なお金稼ぎ、イチゴは複数回収穫できる',
      'ピエールがバッグのアップグレードを解放したらすぐ鉱山に入ろう──採掘素材は他のすべてに役立つ',
      '1年目にすべてをやり切ろうとしなくていい──すべて完了するには複数のゲーム年がかかるし、それでOK',
    ],
    start_ko: [
      '첫 번째 봄: 파스닙과 딸기를 키우세요 — 파스닙은 쉽게 돈이 되고, 딸기는 여러 번 수확할 수 있어요',
      '피에르가 가방 업그레이드를 열면 바로 광산에 들어가세요 — 광산 자원이 다른 모든 것에 도움이 돼요',
      '1년 안에 모든 걸 하려고 하지 마세요 — 모든 것을 완료하려면 여러 게임 연도가 필요하고, 그게 정상이에요',
    ],
    start_de: [
      'Dein erster Frühling: Bau Pastinaken und Erdbeeren an — Pastinaken sind einfaches Geld und Erdbeeren lassen sich mehrfach ernten',
      'Geh in die Minen, sobald Pierre das Rucksack-Upgrade freischaltet — Rohstoffe aus dem Bergbau helfen bei allem anderen',
      "Versuche nicht, alles im ersten Jahr zu schaffen — es braucht mehrere Spieljahre, alles abzuschließen, und das ist völlig okay",
    ],
  },
  palia: {
    title_en: 'Palia',
    title_zh: 'Palia',
    title_zhTW: 'Palia',
    title_ja: 'Palia',
    title_ko: 'Palia',
    title_de: 'Palia',
    emoji: '🌻',
    tag_en: 'The best free first cozy game — try it today',
    tag_zh: '最好的免费第一款 cozy 游戏——今天就试试',
    tag_zhTW: '最棒的免費第一款 cozy 遊戲——今天就試試',
    tag_ja: '無料で始められる最高のコージーゲーム──今すぐ試そう',
    tag_ko: '가장 좋은 무료 첫 번째 코지 게임 — 오늘 바로 해보세요',
    tag_de: 'Das beste kostenlose erste Cozy Game — probiere es heute aus',
    why_en:
      "Palia is the perfect first cozy game for you because it's completely free — you can download it right now on PC (Steam or Epic Games Store) or Nintendo Switch and start playing without spending a single dollar. For a beginner who isn't sure if cozy games are for them, Palia removes all financial risk. The game is gentle and welcoming, with a kind community of real players around you. You learn gardening, hunting, fishing, and crafting at your own pace with helpful in-game guidance. If you love it, you can explore its optional cosmetics; if it's not quite right, you've lost nothing but a few hours.",
    why_zh:
      'Palia 是你的完美第一款 cozy 游戏，因为它完全免费——你现在就可以在 PC（Steam 或 Epic Games Store）或 Nintendo Switch 上下载并开始游玩，无需花一分钱。对于不确定 cozy 游戏是否适合自己的新手，Palia 消除了所有财务风险。游戏温和而热情，周围有真实玩家的友好社区。你可以按自己的节奏在有用的游戏内指引下学习园艺、狩猎、钓鱼和制作。如果你喜欢它，可以探索可选的外观购买；如果不太合适，你什么都没损失，只是花了几个小时。',
    why_zhTW:
      'Palia 是你最完美的第一款 cozy 遊戲，因為它完全免費——你現在就可以在 PC（Steam 或 Epic Games Store）或 Nintendo Switch 上下載並開始遊玩，完全不需要花任何錢。對於不確定 cozy 遊戲是否適合自己的新手，Palia 消除了所有財務風險。遊戲溫和而熱情，周圍有真實玩家組成的友善社群。你可以在遊戲內指引的幫助下，按自己的節奏學習園藝、狩獵、釣魚和製作。如果你喜歡它，可以探索可選的外觀購買；如果不太合適，你只不過花了幾個小時，什麼都沒損失。',
    why_ja:
      'Paliaは完全無料なので、あなたにとって最高の最初のコージーゲームです。今すぐPC（SteamまたはEpic Gamesストア）またはNintendo Switchでダウンロードして、一円も使わずに遊び始められます。コージーゲームが自分に合っているか確信が持てない初心者にとって、Paliaは金銭的なリスクをゼロにしてくれます。ゲームはやさしく温かく、周りには親切な実プレイヤーのコミュニティがいます。役立つゲーム内ガイダンスに導かれながら、ガーデニング、狩猟、釣り、クラフトを自分のペースで学べます。気に入ったら任意の外見アイテムを探索できますし、合わなくても失うのは数時間だけです。',
    why_ko:
      'Palia는 완전 무료이기 때문에 당신에게 완벽한 첫 번째 코지 게임입니다 — 지금 바로 PC(Steam 또는 Epic Games Store)나 닌텐도 스위치에서 다운로드해서 돈 한 푼 안 쓰고 시작할 수 있어요. 코지 게임이 자신에게 맞는지 확신이 없는 초보자에게 Palia는 모든 금전적 위험을 없애줍니다. 게임은 부드럽고 따뜻하며, 주변에는 친절한 실제 플레이어 커뮤니티가 있어요. 도움이 되는 게임 내 안내를 따라 자신의 속도로 원예, 사냥, 낚시, 제작을 배울 수 있습니다. 마음에 들면 선택적 코스메틱을 탐험할 수 있고, 맞지 않더라도 잃은 건 몇 시간뿐이에요.',
    why_de:
      "Palia ist das perfekte erste Cozy Game für dich, weil es völlig kostenlos ist — du kannst es jetzt sofort auf dem PC (Steam oder Epic Games Store) oder Nintendo Switch herunterladen und spielen, ohne einen einzigen Euro auszugeben. Für einen Anfänger, der nicht sicher ist, ob Cozy Games etwas für ihn sind, beseitigt Palia jedes finanzielle Risiko. Das Spiel ist sanft und einladend, mit einer freundlichen Community echter Spieler um dich herum. Du lernst Gartenarbeit, Jagd, Angeln und Handwerk in deinem eigenen Tempo mit hilfreicher In-Game-Anleitung. Wenn du es liebst, kannst du optionale Kosmetik erkunden; wenn es nicht ganz passt, hast du nichts verloren außer ein paar Stunden.",
    start_en: [
      'Download it free from Steam, Epic Games Store, or Nintendo eShop — no credit card required',
      'Complete all the starter quests first — they unlock your plot and teach everything at a comfortable pace',
      "Join a friendly server and don't be shy about asking the community for help — Palia players are known for being welcoming",
    ],
    start_zh: [
      '从 Steam、Epic Games Store 或 Nintendo eShop 免费下载——无需信用卡',
      '先完成所有新手任务——它们解锁你的地块，以舒适的节奏教授一切',
      '加入友好的服务器，不要羞于向社区寻求帮助——Palia 玩家以热情好客而闻名',
    ],
    start_zhTW: [
      '從 Steam、Epic Games Store 或 Nintendo eShop 免費下載——不需要信用卡',
      '先完成所有新手任務——它們會解鎖你的地塊，以舒適的節奏教你一切',
      '加入友善的伺服器，不要不好意思向社群求助——Palia 玩家以熱情好客聞名',
    ],
    start_ja: [
      'Steam、Epic Gamesストア、またはNintendo eShopから無料でダウンロードしよう──クレジットカード不要',
      'まずスターターのクエストをすべてクリアしよう──土地が解放され、快適なペースですべてを学べる',
      '和気あいあいとしたサーバーに参加して、コミュニティに助けを求めることをためらわないで──Paliaプレイヤーは温かいことで有名',
    ],
    start_ko: [
      'Steam, Epic Games Store, 또는 닌텐도 eShop에서 무료로 다운로드하세요 — 신용카드 불필요',
      '먼저 스타터 퀘스트를 모두 완료하세요 — 내 땅이 열리고 편안한 속도로 모든 것을 가르쳐줘요',
      '친절한 서버에 접속해서 커뮤니티에 도움을 요청하는 걸 부끄러워하지 마세요 — Palia 플레이어는 친절함으로 유명해요',
    ],
    start_de: [
      'Lade es kostenlos von Steam, Epic Games Store oder Nintendo eShop herunter — keine Kreditkarte erforderlich',
      'Erledige zuerst alle Starter-Quests — sie schalten dein Grundstück frei und bringen dir alles in angenehm langsamem Tempo bei',
      "Tritt einem freundlichen Server bei und schäm dich nicht, die Community um Hilfe zu bitten — Palia-Spieler sind für ihre Herzlichkeit bekannt",
    ],
  },
  dreamlight: {
    title_en: 'Disney Dreamlight Valley',
    title_zh: 'Disney Dreamlight Valley',
    title_zhTW: 'Disney Dreamlight Valley',
    title_ja: 'ディズニー ドリームライト バレー',
    title_ko: '디즈니 드림라이트 밸리',
    title_de: 'Disney Dreamlight Valley',
    emoji: '✨',
    tag_en: 'The most familiar-feeling first cozy game — free to try',
    tag_zh: '最有亲切感的第一款 cozy 游戏——免费试玩',
    tag_zhTW: '最有親切感的第一款 cozy 遊戲——免費試玩',
    tag_ja: '一番親しみやすい最初のコージーゲーム──無料で試せる',
    tag_ko: '가장 친숙한 느낌의 첫 번째 코지 게임 — 무료로 체험 가능',
    tag_de: 'Das vertrauteste erste Cozy Game — kostenlos ausprobieren',
    why_en:
      "Disney Dreamlight Valley is the ideal first cozy game for you because it wraps everything in familiar faces and stories you already know. When Mickey Mouse asks you to help, you know who Mickey is — there's instant emotional context that removes the barrier of learning an unfamiliar world. The game is free to download on all platforms, has clear quest guidance that tells you what to do next, and features farming, cooking, fishing, and life-sim mechanics in a setting that feels immediately welcoming. The characters guide you through the game, so you never feel lost.",
    why_zh:
      'Disney Dreamlight Valley 是你的理想第一款 cozy 游戏，因为它将一切包裹在你已经认识的熟悉面孔和故事中。当米奇鼠要求你帮助他时，你知道米奇是谁——有即时的情感背景，消除了学习陌生世界的障碍。游戏在所有平台上都可以免费下载，有清晰的任务指引告诉你接下来该做什么，并在一个立刻让人感到亲切的环境中提供农业、烹饪、钓鱼和生活模拟机制。角色引导你完成游戏，所以你永远不会感到迷失。',
    why_zhTW:
      'Disney Dreamlight Valley 是你的理想第一款 cozy 遊戲，因為它把一切都包裹在你早已熟悉的面孔和故事裡。當米奇老鼠請你幫忙時，你知道米奇是誰——即時的情感連結消除了學習陌生世界的障礙。遊戲在所有平台免費下載，有清晰的任務指引告訴你接下來該做什麼，並在一個立刻讓人感到親切的環境中提供農業、烹飪、釣魚和生活模擬機制。角色會引導你完成遊戲，所以你永遠不會感到迷失。',
    why_ja:
      'ディズニー ドリームライト バレーはあなたにとって理想的な最初のコージーゲームです。すでに知っている親しみ顔やストーリーがすべてを包んでいるから。ミッキーマウスに助けを求められたとき、ミッキーが誰かは分かりますよね──そこには即座の感情的なつながりがあり、知らない世界を学ぶハードルが消えます。すべてのプラットフォームで無料ダウンロードでき、次に何をすべきか教えてくれる明確なクエストガイダンスがあり、すぐに温かく迎えてくれる舞台で農業・料理・釣り・生活シミュレーションを楽しめます。キャラクターたちがゲームを通じてガイドしてくれるので、迷うことはありません。',
    why_ko:
      '디즈니 드림라이트 밸리는 당신에게 이상적인 첫 번째 코지 게임입니다. 이미 알고 있는 친숙한 얼굴과 이야기로 모든 것이 감싸져 있기 때문이에요. 미키 마우스가 도움을 요청할 때, 미키가 누군지 이미 알고 있잖아요 — 즉각적인 감정적 연결이 낯선 세계를 배우는 장벽을 없애줍니다. 모든 플랫폼에서 무료로 다운로드할 수 있고, 다음에 무엇을 해야 하는지 알려주는 명확한 퀘스트 안내가 있으며, 즉시 편안함을 느낄 수 있는 배경에서 농업, 요리, 낚시, 생활 시뮬레이션 요소를 즐길 수 있어요. 캐릭터들이 게임 전반을 안내해줘서 길을 잃는 느낌이 들지 않아요.',
    why_de:
      'Disney Dreamlight Valley ist das ideale erste Cozy Game für dich, weil es alles in vertraute Gesichter und Geschichten hüllt, die du bereits kennst. Wenn Micky Maus dich um Hilfe bittet, weißt du, wer Micky ist — es gibt einen sofortigen emotionalen Kontext, der die Hürde beseitigt, eine unbekannte Welt kennenzulernen. Das Spiel ist auf allen Plattformen kostenlos herunterzuladen, bietet klare Quest-Führung, die dir sagt, was als nächstes zu tun ist, und hat Farming-, Koch-, Angel- und Life-Sim-Mechaniken in einer Umgebung, die sich sofort einladend anfühlt. Die Charaktere führen dich durch das Spiel, sodass du dich nie verloren fühlst.',
    start_en: [
      'Download it free from any platform store — no purchase required to start',
      'Follow the main quest line first — it introduces each character and biome in an easy, guided order',
      "Raise friendship levels with characters early — higher friendship unlocks their full quests and best items",
    ],
    start_zh: [
      '从任何平台商店免费下载——开始无需购买',
      '先跟着主线任务走——它以简单、有指引的顺序介绍每个角色和生物群落',
      '尽早提高与角色的友谊等级——更高的友谊解锁他们的完整任务和最好的物品',
    ],
    start_zhTW: [
      '從任何平台商店免費下載——開始遊玩無需購買',
      '先跟著主線任務走——它以簡單、有指引的順序介紹每個角色和生態群落',
      '盡早提高與角色的友誼等級——更高的友誼解鎖他們的完整任務和最好的物品',
    ],
    start_ja: [
      'どのプラットフォームストアからでも無料でダウンロード──開始するのに購入不要',
      'まずメインクエストラインを追おう──各キャラクターとバイオームを簡単なガイド順に紹介してくれる',
      '早いうちにキャラクターとの友好レベルを上げよう──友好度が上がるとフルクエストと最高のアイテムが解放される',
    ],
    start_ko: [
      '어떤 플랫폼 스토어에서든 무료로 다운로드하세요 — 시작하는 데 구매가 필요하지 않아요',
      '먼저 메인 퀘스트 라인을 따라가세요 — 각 캐릭터와 바이옴을 쉽고 안내된 순서로 소개해줘요',
      '캐릭터들과의 우정 레벨을 일찍부터 올리세요 — 우정이 높아지면 완전한 퀘스트와 최고의 아이템이 열려요',
    ],
    start_de: [
      'Lade es kostenlos aus jedem Plattform-Store herunter — kein Kauf erforderlich, um zu starten',
      'Folge zuerst der Hauptquestreihe — sie stellt jeden Charakter und jede Biome in einfacher, geführter Reihenfolge vor',
      "Erhöhe früh die Freundschaftslevel mit den Charakteren — höhere Freundschaft schaltet ihre vollständigen Quests und besten Gegenstände frei",
    ],
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { acnh: 0, stardew: 0, palia: 0, dreamlight: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyBeginnerQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-games-for-beginners`
    const shareText = isZh
      ? `作为 cozy 游戏新手，最适合我的第一款游戏是「${result.title_zh}」！找到你的入门游戏：${url}`
      : `As a cozy game beginner, my recommended first game is ${getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}! Find yours: ${url}`

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
          {getLoc(result.why_zh, result.why_en, result.why_zhTW, result.why_ja, result.why_ko, result.why_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {getLoc('新手第一步', 'Your first 3 steps', '新手第一步', '最初の3ステップ', '첫 번째 3단계', 'Deine ersten 3 Schritte')}
          </h3>
          <ul className="space-y-2">
            {(getLoc(
              result.start_zh.join('|||'),
              result.start_en.join('|||'),
              result.start_zhTW.join('|||'),
              result.start_ja.join('|||'),
              result.start_ko.join('|||'),
              result.start_de.join('|||'),
            ).split('|||')).map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把 cozy 游戏的慢生活节奏带入真实日常。',
              'TendFarm is building a farm rhythm tracker — bringing the gentle pace of cozy games into real daily life.',
              'TendFarm 正在開發農場節律追蹤功能——把 cozy 遊戲的慢生活節奏帶入真實日常。',
              'TendFarmはファームリズムトラッカーを開発中です──コージーゲームのゆったりしたペースをリアルな日常に。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 코지 게임의 여유로운 페이스를 실제 일상으로 가져오고 있어요.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — der das sanfte Tempo von Cozy Games in den echten Alltag bringt.',
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {getLoc('重新测试', 'Retake Quiz', '重新測驗', 'もう一度やる', '다시 하기', 'Quiz wiederholen')}
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
            'Cozy 游戏新手入门测验：哪款最适合你？',
            'Best Cozy Game for Beginners Quiz',
            'Cozy 遊戲新手入門測驗：哪款最適合你？',
            'コージーゲーム初心者診断：あなたに合うのはどれ？',
            '초보자를 위한 코지 게임 추천 퀴즈',
            'Welches Cozy Game passt zu dir als Anfänger?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，为新手找到最合适的第一款 cozy 游戏——无论你的经验水平或预算如何',
            '6 questions to find the perfect first cozy game for you — no experience required',
            '6 個問題，為新手找到最合適的第一款 cozy 遊戲——無論你的經驗或預算',
            '6問で、あなたにぴったりな最初のコージーゲームを見つけよう──経験不問',
            '6가지 질문으로 당신에게 딱 맞는 첫 번째 코지 게임을 찾아드려요 — 경험 불필요',
            '6 Fragen, um das perfekte erste Cozy Game für dich zu finden — keine Erfahrung nötig',
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
          '找到我的入门游戏',
          'Find My First Cozy Game',
          '找到我的入門遊戲',
          '私の最初のゲームを見つける',
          '내 첫 번째 게임 찾기',
          'Mein erstes Cozy Game finden',
        )}
      </button>
    </div>
  )
}
