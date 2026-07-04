'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'stardew' | 'acnh' | 'powerwash' | 'spiritfarer'

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
    q_en: 'Right now, what does your brain most need?',
    q_zh: '此刻，你的大脑最需要什么？',
    q_zhTW: '此刻，你的大腦最需要什麼？',
    q_ja: '今この瞬間、頭が一番必要としているものは？',
    q_ko: '지금 이 순간, 뇌가 가장 필요한 게 뭔가요?',
    q_de: 'Was braucht dein Kopf gerade am meisten?',
    options: [
      {
        en: 'Something to focus on — I want my mind occupied with tasks',
        zh: '专注的事情——我想让大脑有任务可做',
        zhTW: '專注的事情——我想讓大腦有任務可做',
        ja: '集中できる何か——タスクで頭を満たしたい',
        ko: '집중할 무언가——머릿속에 할 일이 가득하길 원해요',
        de: 'Etwas, worauf ich mich konzentrieren kann — ich will meinen Kopf mit Aufgaben füllen',
        type: 'stardew',
      },
      {
        en: 'Creative space — I want to make or arrange things without pressure',
        zh: '创意空间——我想在没有压力的情况下创造或整理东西',
        zhTW: '創意空間——我想在沒有壓力的情況下創造或整理東西',
        ja: 'クリエイティブな時間——プレッシャーなく何かを作ったり整えたりしたい',
        ko: '창의적인 공간——부담 없이 뭔가를 만들거나 꾸미고 싶어요',
        de: 'Kreativen Freiraum — ich will ohne Druck etwas gestalten oder anordnen',
        type: 'acnh',
      },
      {
        en: 'Pure flow — I want repetitive, satisfying action that empties my mind',
        zh: '纯粹的心流——我想要重复的、令人满足的动作来清空大脑',
        zhTW: '純粹的心流——我想要重複的、令人滿足的動作來清空大腦',
        ja: '無心のフロー——繰り返しの心地いい動作で頭を空っぽにしたい',
        ko: '완전한 몰입——반복적이고 만족스러운 행동으로 머릿속을 비우고 싶어요',
        de: 'Puren Flow — ich will repetitive, befriedigende Aktionen, die meinen Kopf leeren',
        type: 'powerwash',
      },
      {
        en: 'Meaning — I want to feel something real and be moved',
        zh: '意义感——我想感受到真实的东西并被触动',
        zhTW: '意義感——我想感受到真實的東西並被觸動',
        ja: '意味のある体験——本物の感情を感じて心を動かされたい',
        ko: '의미 있는 경험——진짜 감정을 느끼고 마음이 움직이고 싶어요',
        de: 'Bedeutung — ich will etwas Echtes fühlen und bewegt werden',
        type: 'spiritfarer',
      },
    ],
  },
  {
    q_en: 'How has today been for you?',
    q_zh: '你今天过得怎么样？',
    q_zhTW: '你今天過得怎麼樣？',
    q_ja: '今日はどんな一日だった？',
    q_ko: '오늘 하루 어땠나요?',
    q_de: 'Wie war dein Tag?',
    options: [
      {
        en: 'Busy and scattered — I need a game that gives me back a sense of control',
        zh: '忙碌而分散——我需要一款能给我重新掌控感的游戏',
        zhTW: '忙碌而混亂——我需要一款能讓我重新找到掌控感的遊戲',
        ja: '忙しくてバタバタ——コントロール感を取り戻せるゲームが欲しい',
        ko: '바쁘고 정신없었어요——다시 통제감을 찾을 수 있는 게임이 필요해요',
        de: 'Stressig und chaotisch — ich brauche ein Spiel, das mir das Gefühl der Kontrolle zurückgibt',
        type: 'stardew',
      },
      {
        en: 'Fine but a little flat — I want something gentle and aesthetic',
        zh: '还好但有点平淡——我想要温和而有美感的东西',
        zhTW: '還好但有點平淡——我想要溫和而有美感的東西',
        ja: '普通だけど少し物足りない——穏やかでおしゃれなものがいい',
        ko: '그럭저럭이었지만 좀 밋밋했어요——부드럽고 감성적인 게 좋겠어요',
        de: 'In Ordnung, aber etwas fade — ich will etwas Ruhiges und Ästhetisches',
        type: 'acnh',
      },
      {
        en: 'Stressful or overwhelming — I genuinely need to turn my brain off',
        zh: '压力很大或不堪重负——我真的需要关掉大脑',
        zhTW: '壓力很大或不堪重負——我真的需要放空大腦',
        ja: 'ストレスが多くてしんどかった——とにかく頭を空にしたい',
        ko: '스트레스가 너무 많았어요——그냥 머리를 완전히 끄고 싶어요',
        de: 'Stressig oder überwältigend — ich muss meinen Kopf wirklich abschalten',
        type: 'powerwash',
      },
      {
        en: 'Heavy or emotional — I want a game that matches that weight',
        zh: '沉重或情绪化——我想要一款匹配这种重量的游戏',
        zhTW: '沉重或情緒化——我想要一款匹配這種分量的遊戲',
        ja: '重くて気持ちが揺れていた——その気持ちに寄り添うゲームをやりたい',
        ko: '감정적으로 무거웠어요——그 무게감에 공감해주는 게임을 하고 싶어요',
        de: 'Schwer oder emotional — ich will ein Spiel, das zu diesem Gewicht passt',
        type: 'spiritfarer',
      },
    ],
  },
  {
    q_en: 'How much mental energy do you have right now?',
    q_zh: '你现在有多少精神能量？',
    q_zhTW: '你現在有多少精神能量？',
    q_ja: '今の精神的なエネルギーはどのくらい？',
    q_ko: '지금 정신적 에너지는 얼마나 남아있나요?',
    q_de: 'Wie viel mentale Energie hast du gerade?',
    options: [
      {
        en: 'Moderate — I can think and plan but do not want anything too intense',
        zh: '中等——我可以思考和计划，但不想要太激烈的东西',
        zhTW: '中等——我可以思考和計畫，但不想太激烈',
        ja: 'まあまあある——考えたり計画したりはできるけど、激しいのは無理',
        ko: '적당히——생각하고 계획은 할 수 있지만 너무 격한 건 무리예요',
        de: 'Mittel — ich kann denken und planen, will aber nichts zu Intensives',
        type: 'stardew',
      },
      {
        en: 'Enough to be creative but not enough to manage complexity',
        zh: '足够有创意但不足以管理复杂性',
        zhTW: '足夠有創意但不足以應付複雜性',
        ja: 'クリエイティブに動けるくらいはあるけど、複雑なことは無理',
        ko: '창의적으로 움직일 수 있는 정도——복잡한 건 버거워요',
        de: 'Genug um kreativ zu sein, aber nicht genug für Komplexes',
        type: 'acnh',
      },
      {
        en: 'Very low — I need something I can do on autopilot',
        zh: '非常低——我需要可以自动驾驶的东西',
        zhTW: '非常低——我需要可以放空的事做',
        ja: 'ほぼゼロ——ぼーっとしながらできることがいい',
        ko: '거의 없어요——자동으로 할 수 있는 걸 원해요',
        de: 'Sehr wenig — ich brauche etwas, das ich auf Autopilot machen kann',
        type: 'powerwash',
      },
      {
        en: 'Emotionally available — I am ready to invest in something that matters',
        zh: '情感上可用——我准备好投入对我有意义的事情',
        zhTW: '情感上充沛——我準備好投入對我有意義的事情',
        ja: '感情的に余裕がある——深くのめり込めるものに投資したい',
        ko: '감정적으로는 여유 있어요——깊이 빠져들 수 있는 걸 해볼 준비가 됐어요',
        de: 'Emotional verfügbar — ich bin bereit, in etwas Bedeutungsvolles zu investieren',
        type: 'spiritfarer',
      },
    ],
  },
  {
    q_en: 'Which of these sounds most appealing right now?',
    q_zh: '现在哪个听起来最吸引你？',
    q_zhTW: '現在哪個聽起來最吸引你？',
    q_ja: '今一番やってみたいのはどれ？',
    q_ko: '지금 가장 끌리는 건 뭔가요?',
    q_de: 'Was klingt gerade am verlockendsten?',
    options: [
      {
        en: 'Tending crops, mining, and watching my farm grow over seasons',
        zh: '照料作物、挖矿，看着我的农场随季节成长',
        zhTW: '照料作物、挖礦，看著我的農場隨季節成長',
        ja: '作物を育てて、鉱山に潜って、農場が季節と共に育つのを見守る',
        ko: '작물을 돌보고, 광산에 들어가고, 계절마다 농장이 성장하는 걸 지켜보는 것',
        de: 'Felder bestellen, in die Mine gehen und meiner Farm beim Wachsen zusehen',
        type: 'stardew',
      },
      {
        en: 'Wandering a peaceful island, decorating, and visiting friends',
        zh: '漫步在宁静的岛屿上，装饰，拜访朋友',
        zhTW: '漫步在寧靜的島嶼上，裝飾，拜訪朋友',
        ja: '穏やかな島を散歩して、島をデコして、住人に会いに行く',
        ko: '평화로운 섬을 거닐며, 꾸미고, 주민들을 만나는 것',
        de: 'Auf einer friedlichen Insel spazieren, dekorieren und Freunde besuchen',
        type: 'acnh',
      },
      {
        en: 'Cleaning or organizing something into a perfect state',
        zh: '把某样东西清洁或整理成完美的状态',
        zhTW: '把某樣東西清潔或整理成完美的狀態',
        ja: '汚れたものをピカピカにして、完璧な状態にしていく',
        ko: '더러운 걸 깨끗하게 만들어 완벽한 상태로 만드는 것',
        de: 'Etwas reinigen oder organisieren, bis es perfekt ist',
        type: 'powerwash',
      },
      {
        en: 'Sailing, cooking for spirits, and letting go of things you love',
        zh: '航行、为灵魂烹饪，并放手你所爱的东西',
        zhTW: '航行、為靈魂烹飪，並放下你所愛的東西',
        ja: '船で旅をして、霊たちのために料理をして、別れを告げる',
        ko: '배를 타고 여행하며, 영혼들을 위해 요리하고, 소중한 것들과 작별하는 것',
        de: 'Segeln, für Geister kochen und loslassen, was man liebt',
        type: 'spiritfarer',
      },
    ],
  },
  {
    q_en: 'How long are you planning to play tonight?',
    q_zh: '你今晚打算玩多长时间？',
    q_zhTW: '你今晚打算玩多長時間？',
    q_ja: '今夜どのくらいプレイする予定？',
    q_ko: '오늘 밤 얼마나 플레이할 예정이에요?',
    q_de: 'Wie lange planst du heute Abend zu spielen?',
    options: [
      {
        en: '1-2 hours — I want meaningful progress in that time',
        zh: '1-2 小时——我想在这段时间内取得有意义的进展',
        zhTW: '1-2 小時——我想在這段時間內獲得有意義的進展',
        ja: '1〜2時間——その時間でしっかり進捗を出したい',
        ko: '1~2시간——그 시간 안에 의미 있는 진전을 이루고 싶어요',
        de: '1-2 Stunden — ich will in dieser Zeit spürbaren Fortschritt machen',
        type: 'stardew',
      },
      {
        en: '30-60 minutes — enough to visit a few islanders and maybe do some terraforming',
        zh: '30-60 分钟——足够拜访几位岛民，也许做些地形改造',
        zhTW: '30-60 分鐘——足夠拜訪幾位島民，也許做些地形改造',
        ja: '30〜60分——島民に会って、ちょっと島整備できるくらい',
        ko: '30~60분——주민 몇 명 만나고 섬 정비 좀 할 정도',
        de: '30-60 Minuten — genug für ein paar Inselbewohner und etwas Terraforming',
        type: 'acnh',
      },
      {
        en: 'However long it takes to decompress — no specific goal',
        zh: '减压需要多长时间就多长时间——没有特定目标',
        zhTW: '減壓需要多久就多久——沒有特定目標',
        ja: 'ストレスが抜けるまで——特に目標はなし',
        ko: '스트레스 풀릴 때까지——특별한 목표 없이',
        de: 'Solange ich brauche um abzuschalten — kein bestimmtes Ziel',
        type: 'powerwash',
      },
      {
        en: '2+ hours — I want to really sink into something tonight',
        zh: '2 小时以上——我今晚想真正沉浸在某件事里',
        zhTW: '2 小時以上——我今晚想真正沉浸在某件事裡',
        ja: '2時間以上——今夜はがっつりゲームに沈みたい',
        ko: '2시간 이상——오늘 밤은 정말 제대로 빠져들고 싶어요',
        de: '2+ Stunden — ich will heute Abend wirklich in etwas eintauchen',
        type: 'spiritfarer',
      },
    ],
  },
  {
    q_en: 'Pick the word that feels most true right now.',
    q_zh: '选出现在感觉最真实的词。',
    q_zhTW: '選出現在感覺最真實的詞。',
    q_ja: '今の自分に一番当てはまる言葉を選んで。',
    q_ko: '지금 자신에게 가장 잘 맞는 단어를 골라보세요.',
    q_de: 'Wähl das Wort, das sich gerade am meisten nach dir anfühlt.',
    options: [
      {
        en: 'Productive',
        zh: '效率感',
        zhTW: '效率感',
        ja: 'やる気モード',
        ko: '생산적인',
        de: 'Produktiv',
        type: 'stardew',
      },
      {
        en: 'Peaceful',
        zh: '平静',
        zhTW: '平靜',
        ja: 'のんびり',
        ko: '평온한',
        de: 'Friedlich',
        type: 'acnh',
      },
      {
        en: 'Numb',
        zh: '麻木',
        zhTW: '麻木',
        ja: 'ぼんやり',
        ko: '멍한',
        de: 'Abgestumpft',
        type: 'powerwash',
      },
      {
        en: 'Tender',
        zh: '柔软',
        zhTW: '柔軟',
        ja: 'しんみり',
        ko: '따뜻한',
        de: 'Zart',
        type: 'spiritfarer',
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
    mood_en: string
    mood_zh: string
    mood_zhTW: string
    mood_ja: string
    mood_ko: string
    mood_de: string
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
  stardew: {
    title_en: 'Stardew Valley',
    title_zh: '星露谷物语',
    title_zhTW: '星露谷物語',
    title_ja: 'スターデューバレー',
    title_ko: '스타듀 밸리',
    title_de: 'Stardew Valley',
    emoji: '🌾',
    mood_en: "You're in a productive mood",
    mood_zh: '你处于效率感模式',
    mood_zhTW: '你處於效率感模式',
    mood_ja: 'やる気と生産性を求めているあなたに',
    mood_ko: '생산적인 모드가 필요한 당신에게',
    mood_de: 'Du bist im Produktivitätsmodus',
    why_en:
      "Your brain wants to be occupied with meaningful tasks right now — and Stardew Valley is perfect for that. Each in-game day gives you a satisfying to-do list: water crops, check the shop, talk to a villager, go into the mines. You can feel the farm growing, the relationships deepening, and the community center getting closer to completion. It's the opposite of numbing out — it's focused, purposeful, and gently stimulating. The seasonal rhythm means there's always something to look forward to, and the gentle fantasy setting keeps the mood warm without being demanding.",
    why_zh:
      '你的大脑现在想要从有意义的任务中得到充实——而星露谷物语正是为此而生。每个游戏内的一天都给你一份令人满足的待办清单：浇水、查看商店、和村民交谈、去矿洞。你能感受到农场在成长、关系在加深、社区中心越来越接近完成。这与麻木状态相反——它是专注的、有目的的、温和地刺激神经。季节节律意味着总有值得期待的事情，而温和的奇幻环境在不苛求的情况下保持了温暖的心情。',
    why_zhTW:
      '你的大腦現在想要從有意義的任務中得到充實——而星露谷物語正是為此而生。每個遊戲內的一天都給你一份令人滿足的待辦清單：澆水、查看商店、和村民交談、去礦洞。你能感受到農場在成長、關係在加深、社區中心越來越接近完成。這與麻木狀態相反——它是專注的、有目的的、溫和地刺激神經。季節節律意味著總有值得期待的事情，而溫和的奇幻環境在不苛求的情況下保持了溫暖的心情。',
    why_ja:
      '今の脳は「意味のあるタスク」を求めている——そんなときにぴったりなのがスターデューバレーです。ゲーム内の一日一日に、水やり・お店チェック・村人との会話・鉱山探索と、達成感のある「やること」が詰まっています。農場が少しずつ育ち、住人との絆が深まり、コミュニティセンターが完成に近づく——その積み重ねが本当に気持ちいい。季節ごとに楽しみがあるので、「次のシーズンまで頑張ろう」という気持ちが自然と湧いてきます。',
    why_ko:
      '지금 뇌는 의미 있는 일에 몰두하고 싶어합니다——스타듀 밸리는 딱 그런 게임이에요. 게임 하루하루마다 물 주기, 상점 확인, 마을 주민과 대화, 광산 탐험 같은 만족스러운 할 일 목록이 있어요. 농장이 조금씩 성장하고, 관계가 깊어지고, 커뮤니티 센터가 완성에 가까워지는 걸 느낄 수 있어요. 멍하게 있는 것과 정반대——집중력 있고, 목적이 있고, 뇌를 적당히 자극해줘요. 계절 리듬이 있어서 항상 기대할 것이 생기고, 따뜻한 판타지 배경이 부담 없이 기분을 좋게 해줘요.',
    why_de:
      'Dein Gehirn will gerade mit bedeutungsvollen Aufgaben beschäftigt sein — und Stardew Valley ist dafür wie gemacht. Jeder Spieltag bringt dir eine befriedigende To-do-Liste: Felder bewässern, den Laden checken, mit einem Dorfbewohner reden, in die Mine gehen. Du spürst, wie die Farm wächst, die Beziehungen tiefer werden und das Gemeindezentrum der Fertigstellung näherkommt. Das ist das Gegenteil von Abschalten — es ist fokussiert, zielgerichtet und sanft stimulierend. Der saisonale Rhythmus sorgt dafür, dass es immer etwas zu erwarten gibt, und das gemütliche Fantasy-Setting hält die Stimmung warm, ohne zu fordern.',
    tip_en: 'Tonight: plant something new AND do one floor of the mines — that combination hits the productivity sweet spot.',
    tip_zh: '今晚：种一些新作物，同时去矿洞挖一层——这个组合击中了效率感的甜蜜点。',
    tip_zhTW: '今晚：種一些新作物，同時去礦洞挖一層——這個組合擊中了效率感的甜蜜點。',
    tip_ja: '今夜は新しい作物を植えて＋鉱山を1フロア攻略——この組み合わせが生産性の黄金比です。',
    tip_ko: '오늘 밤: 새 작물 심기 + 광산 한 층 탐험——이 조합이 생산성의 최적점을 정확히 찔러줘요.',
    tip_de: 'Heute Abend: etwas Neues pflanzen UND eine Ebene in der Mine erkunden — diese Kombination trifft den Produktivitätssüßpunkt genau.',
  },
  acnh: {
    title_en: 'Animal Crossing: New Horizons',
    title_zh: '动物之森：新视野',
    title_zhTW: '集合啦！動物森友會',
    title_ja: 'あつまれ どうぶつの森',
    title_ko: '모여봐요 동물의 숲',
    title_de: 'Animal Crossing: New Horizons',
    emoji: '🍃',
    mood_en: "You're in a creative, peaceful mood",
    mood_zh: '你处于创意、平静的心情',
    mood_zhTW: '你處於創意、平靜的心情',
    mood_ja: 'のんびりクリエイティブなあなたに',
    mood_ko: '창의적이고 평온한 기분의 당신에게',
    mood_de: 'Du bist in einer kreativen, ruhigen Stimmung',
    why_en:
      "Animal Crossing: New Horizons is exactly what your mood is calling for — a gentle, beautiful space where you can create and exist without any pressure. Your island has no enemies, no fail states, no time pressure. The real-world clock means the game meets you in the actual time of day you're playing — night visits have fireflies, early mornings have bird sounds, rainy days have a different music. Tonight could be about redesigning a corner of your island, giving gifts to your villagers, or just wandering around catching bugs while listening to the ambient soundtrack. There's no wrong move.",
    why_zh:
      '动物之森：新视野正是你的心情所需——一个温和、美丽的空间，你可以在没有任何压力的情况下创造和存在。你的岛屿没有敌人、没有失败状态、没有时间压力。现实世界的时钟意味着游戏在你实际游玩的时间段与你相遇——夜晚拜访有萤火虫，清晨有鸟鸣，雨天有不同的音乐。今晚可以是重新设计岛屿的一个角落、给村民送礼物，或者只是漫步捕捉昆虫，同时聆听环境原声带。没有错误的行动。',
    why_zhTW:
      '集合啦！動物森友會正是你的心情所需——一個溫和、美麗的空間，你可以在沒有任何壓力的情況下創造和存在。你的島嶼沒有敵人、沒有失敗狀態、沒有時間壓力。現實世界的時鐘意味著遊戲在你實際遊玩的時間段與你相遇——夜晚拜訪有螢火蟲，清晨有鳥鳴，雨天有不同的音樂。今晚可以是重新設計島嶼的一個角落、給居民送禮物，或者只是漫步捕捉昆蟲，同時聆聽環境原聲帶。沒有錯誤的行動。',
    why_ja:
      'あつまれ どうぶつの森は、今のあなたの気分にぴったりです——プレッシャーなく、自分のペースで島を作り上げられる優しい世界。敵もいないし、失敗もないし、時間制限もない。現実の時計と連動しているので、夜にプレイすれば蛍が飛んでいたり、早朝なら鳥の声が聞こえたり、雨の日は特別なBGMが流れたり。今夜は島の一角をリデザインしたり、住人にプレゼントを渡したり、音楽を聴きながら虫を捕まえてまったり過ごすのも最高です。',
    why_ko:
      '모여봐요 동물의 숲은 지금 당신 기분에 딱 맞아요——아무 압박 없이 만들고 존재할 수 있는 따뜻하고 아름다운 공간이에요. 섬에 적도 없고, 실패도 없고, 시간 제한도 없어요. 현실 시계와 연동되어 있어서 밤에 플레이하면 반딧불이가 있고, 새벽엔 새소리가 들리고, 비 오는 날엔 다른 음악이 흘러요. 오늘 밤은 섬 한 구석을 리디자인하거나, 주민들에게 선물을 주거나, 배경음악 들으며 천천히 곤충 잡으며 산책하는 것도 완벽해요. 뭘 해도 정답이에요.',
    why_de:
      'Animal Crossing: New Horizons ist genau das, wonach sich deine Stimmung sehnt — ein sanfter, schöner Raum, in dem du ohne Druck gestalten und einfach sein kannst. Auf deiner Insel gibt es keine Feinde, keine Niederlage-Zustände, keinen Zeitdruck. Die Echtzeit-Uhr bedeutet, dass das Spiel dich genau in der Tageszeit abholt, in der du spielst — abends gibt es Glühwürmchen, morgens Vogelgesang, bei Regen andere Musik. Heute Abend könntest du eine Ecke deiner Insel umgestalten, deinen Dorfbewohnern Geschenke bringen oder einfach beim Insektensammeln dem Soundtrack lauschen. Es gibt keine falsche Wahl.',
    tip_en: "Let the K.K. Slider music play while you terraform — it's the most peaceful state in gaming.",
    tip_zh: '在地形改造时让 K.K. Slider 的音乐播放——这是游戏中最平静的状态。',
    tip_zhTW: '在地形改造時讓 K.K. Slider 的音樂播放——這是遊戲中最平靜的狀態。',
    tip_ja: '島整備しながらKKスライダーのライブBGMをかけてみて——ゲーム史上最も穏やかな時間になります。',
    tip_ko: '지형 정비할 때 KK 슬라이더 음악 틀어놓기——게임에서 가장 평온한 상태예요.',
    tip_de: 'Lass K.K. Sliders Musik spielen während du Terraforming machst — das ist der friedlichste Moment im Gaming.',
  },
  powerwash: {
    title_en: 'PowerWash Simulator',
    title_zh: 'PowerWash Simulator',
    title_zhTW: 'PowerWash Simulator',
    title_ja: 'パワーウォッシュ シミュレーター',
    title_ko: '파워워시 시뮬레이터',
    title_de: 'PowerWash Simulator',
    emoji: '💧',
    mood_en: 'You need to switch your brain off completely',
    mood_zh: '你需要完全关掉大脑',
    mood_zhTW: '你需要完全放空大腦',
    mood_ja: '何も考えたくないあなたに',
    mood_ko: '뇌를 완전히 끄고 싶은 당신에게',
    mood_de: 'Du musst deinen Kopf komplett abschalten',
    why_en:
      "PowerWash Simulator is one of the most genuinely relaxing games ever made — and the reason is simple: it replaces your thoughts with pure, satisfying sensory feedback. You point a pressure washer at dirty surfaces and they become clean. The progress is visible in real-time. There's no fail state, no time pressure, no inventory, no resource management. Just the sound of water and the slow revelation of clean surfaces. It is widely recommended by therapists and mental health communities as one of the best games for anxiety and overwhelm. Available on Xbox Game Pass (essentially free with a subscription), PC, and PlayStation.",
    why_zh:
      'PowerWash Simulator 是有史以来最真正放松的游戏之一——原因很简单：它用纯粹的、令人满足的感官反馈取代了你的思维。你把高压水枪对准脏表面，它们变得干净。进度是实时可见的。没有失败状态、没有时间压力、没有库存、没有资源管理。只有水声和干净表面的缓慢展现。它被治疗师和心理健康社区广泛推荐为最适合焦虑和不堪重负时的游戏之一。可在 Xbox Game Pass（本质上免费订阅）、PC 和 PlayStation 上获取。',
    why_zhTW:
      'PowerWash Simulator 是有史以來最真正放鬆的遊戲之一——原因很簡單：它用純粹的、令人滿足的感官反饋取代了你的思維。你把高壓水槍對準髒表面，它們變得乾淨。進度是即時可見的。沒有失敗狀態、沒有時間壓力、沒有庫存、沒有資源管理。只有水聲和乾淨表面的緩慢展現。它被治療師和心理健康社群廣泛推薦為最適合焦慮和不堪重負時的遊戲之一。可在 Xbox Game Pass（本質上免費訂閱）、PC 和 PlayStation 上取得。',
    why_ja:
      'パワーウォッシュ シミュレーターは、今まで作られたゲームの中でも指折りの「本当に癒される」一本です。理由はシンプル：高圧洗浄機で汚れた表面を洗い流す、ただそれだけ。考えることを「感覚的な気持ちよさ」で完全に上書きしてくれます。失敗なし、時間制限なし、在庫管理なし。ただ水の音と、汚れが落ちていく様子だけ。不安や気疲れに悩む人たちにも広く勧められているゲームです。Xbox Game Pass・PC・PlayStation でプレイできます。',
    why_ko:
      '파워워시 시뮬레이터는 역대급으로 진짜 힐링되는 게임 중 하나예요——이유는 단순해요: 더러운 표면에 고압 세척기를 겨누면 깨끗해져요. 진행 상황이 실시간으로 보여요. 실패 없음, 시간 압박 없음, 인벤토리 없음, 자원 관리 없음. 그냥 물 소리와 표면이 천천히 깨끗해지는 과정뿐이에요. 불안하거나 지친 분들에게 치료사와 멘탈헬스 커뮤니티에서도 널리 추천하는 게임이에요. Xbox Game Pass (구독으로 거의 무료), PC, 플레이스테이션에서 이용 가능해요.',
    why_de:
      'PowerWash Simulator gehört zu den entspannendsten Spielen, die je gemacht wurden — der Grund ist simpel: Es ersetzt deine Gedanken durch reines, befriedigendes Sinnesfeedback. Du richtest einen Hochdruckreiniger auf dreckige Oberflächen und sie werden sauber. Der Fortschritt ist in Echtzeit sichtbar. Kein Scheitern, kein Zeitdruck, kein Inventar, kein Ressourcenmanagement. Nur das Geräusch des Wassers und die langsam auftauchenden sauberen Flächen. Therapeuten und mentale Gesundheitscommunities empfehlen es weithin als eines der besten Spiele bei Angst und Überforderung. Verfügbar auf Xbox Game Pass (quasi kostenlos mit Abo), PC und PlayStation.',
    tip_en: 'Start with the garden level — small surfaces, quick wins, and very satisfying to complete in one session.',
    tip_zh: '从花园关卡开始——表面小、快速获得成就感，在一次游戏中完成非常令人满足。',
    tip_zhTW: '從花園關卡開始——表面小、快速獲得成就感，在一次遊戲中完成非常令人滿足。',
    tip_ja: 'まず庭のステージから始めるのがおすすめ——面積が小さくて、一回のプレイでサクッとクリアできて超スッキリします。',
    tip_ko: '정원 스테이지부터 시작해요——면적이 작고 빠르게 클리어할 수 있어서 한 세션에 완성하면 정말 시원해요.',
    tip_de: 'Fang mit dem Garten-Level an — kleine Flächen, schnelle Erfolgserlebnisse und super befriedigend, in einer Sitzung fertig zu werden.',
  },
  spiritfarer: {
    title_en: 'Spiritfarer',
    title_zh: 'Spiritfarer',
    title_zhTW: 'Spiritfarer',
    title_ja: 'スピリットフェアラー',
    title_ko: '스피릿페어러',
    title_de: 'Spiritfarer',
    emoji: '🦊',
    mood_en: "You're ready to feel something real tonight",
    mood_zh: '你今晚准备好感受真实的东西了',
    mood_zhTW: '你今晚準備好感受真實的東西了',
    mood_ja: '今夜は本物の感情に触れたいあなたに',
    mood_ko: '오늘 밤 진짜 감동을 받을 준비가 된 당신에게',
    mood_de: 'Du bist heute Abend bereit, etwas Echtes zu fühlen',
    why_en:
      "Spiritfarer is the right game for tonight — you have emotional energy available and a willingness to be moved. You play as Stella, a ferrylady for the dead, responsible for caring for spirits before they pass on. Each spirit is a fully realized character inspired by real people in the developer's life — they have favorite foods, fears, unfinished business, and the way they say goodbye is different every time. The game is warm and beautiful, with farming, cooking, crafting, and platforming woven into the emotional journey. Yes, it will likely make you cry. But it won't leave you hollow — it leaves you tender and somehow more grateful. Available on Xbox Game Pass, PS4/5, Switch, and PC.",
    why_zh:
      'Spiritfarer 是今晚的正确选择——你有可用的情感能量和愿意被触动的意愿。你扮演 Stella，死者的摆渡人，负责照顾灵魂直到他们离去。每位灵魂都是受开发者生活中真实人物启发的完全实现的角色——他们有最喜欢的食物、恐惧、未竟的心愿，以及每次不同的告别方式。游戏温暖而美丽，将农业、烹饪、制作和平台跳跃编织进情感旅程中。是的，它可能会让你哭泣。但它不会让你感到空洞——它让你感到柔软，以某种方式更加感恩。可在 Xbox Game Pass、PS4/5、Switch 和 PC 上获取。',
    why_zhTW:
      'Spiritfarer 是今晚的正確選擇——你有可用的情感能量和願意被觸動的意願。你扮演 Stella，亡者的擺渡人，負責照顧靈魂直到他們離去。每位靈魂都是受開發者生活中真實人物啟發的完全實現的角色——他們有最喜歡的食物、恐懼、未竟的心願，以及每次不同的告別方式。遊戲溫暖而美麗，將農業、烹飪、製作和平台跳躍編織進情感旅程中。是的，它可能會讓你哭泣。但它不會讓你感到空洞——它讓你感到柔軟，以某種方式更加感恩。可在 Xbox Game Pass、PS4/5、Switch 和 PC 上取得。',
    why_ja:
      'スピリットフェアラーは今夜にぴったりな一本——感情的な余裕があって、心を動かされたいあなたへ。あなたは死者の渡し守・ステラを演じ、旅立ちの前の魂たちの世話をします。それぞれの霊は開発者の実際の人間関係をモデルにした存在で、好きな食べ物や恐れ、やり残したことがあり、別れの瞬間は毎回違います。農業・料理・クラフト・アクションが感動のストーリーと絶妙に絡み合う、暖かくて美しいゲームです。泣きます、多分。でも空虚にはなりません——やさしい余韻と感謝の気持ちが残ります。Xbox Game Pass・PS4/5・Switch・PC対応。',
    why_ko:
      '스피릿페어러는 오늘 밤에 딱 맞는 게임이에요——감정적인 여유가 있고 마음이 움직이고 싶은 당신을 위해. 당신은 죽은 자들의 뱃사공 스텔라로, 영혼들이 떠나기 전까지 돌봐주는 역할을 해요. 각 영혼은 개발자의 실제 삶에서 영감받은 입체적인 캐릭터들이에요——좋아하는 음식, 두려움, 마무리 못한 일들이 있고, 작별 방식도 매번 달라요. 농사, 요리, 제작, 플랫포머가 감동적인 여정에 자연스럽게 녹아든 따뜻하고 아름다운 게임이에요. 네, 아마 울게 될 거예요. 하지만 공허하지 않을 거예요——부드럽고 따뜻한 감사함이 남아요. Xbox Game Pass, PS4/5, Switch, PC에서 이용 가능해요.',
    why_de:
      "Spiritfarer ist das richtige Spiel für heute Abend — du hast emotionale Energie übrig und bist bereit, bewegt zu werden. Du spielst Stella, eine Fährfrau für Verstorbene, die Geister auf ihrem letzten Weg begleitet. Jeder Geist ist ein vollständig ausgearbeiteter Charakter, inspiriert von echten Menschen aus dem Leben der Entwickler — mit Lieblingsessen, Ängsten, unerledigten Dingen und einer eigenen Art des Abschieds. Das Spiel ist warm und wunderschön, mit Anbau, Kochen, Basteln und Plattformer-Elementen, die in die emotionale Reise eingewoben sind. Ja, es wird dich wahrscheinlich zum Weinen bringen. Aber es lässt dich nicht leer zurück — es hinterlässt ein zartes Gefühl und eine Art Dankbarkeit. Verfügbar auf Xbox Game Pass, PS4/5, Switch und PC.",
    tip_en: "Don't rush anyone's departure. Spend extra time on every spirit's favorite food — the goodbye is worth it.",
    tip_zh: '不要催促任何人离开。在每位灵魂最喜爱的食物上多花时间——告别是值得的。',
    tip_zhTW: '不要催促任何人離開。在每位靈魂最喜愛的食物上多花時間——告別是值得的。',
    tip_ja: '誰の旅立ちも急がないで。その霊が好きな料理をじっくり作ってあげてください——お別れのシーンが忘れられなくなります。',
    tip_ko: '아무도 서두르지 마세요. 각 영혼이 좋아하는 음식에 시간을 더 쏟으세요——작별 장면이 그만한 가치가 있어요.',
    tip_de: 'Lass niemanden überstürzt gehen. Nimm dir extra Zeit für das Lieblingsessen jedes Geists — der Abschied ist es wert.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { stardew: 0, acnh: 0, powerwash: 0, spiritfarer: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyMoodQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-game-mood`
    const shareText =
      locale === 'zh'
        ? `根据我今天的心情，最适合玩的 Cozy 游戏是「${result.title_zh}」！${result.mood_zh}。找到你的：${url}`
        : locale === 'zh-TW'
          ? `根據我今天的心情，最適合玩的 Cozy 遊戲是「${result.title_zhTW}」！${result.mood_zhTW}。找到你的：${url}`
          : locale === 'ja'
            ? `今夜の気分にぴったりなゲームは「${result.title_ja}」！${result.mood_ja}。あなたも試してみて：${url}`
            : locale === 'ko'
              ? `오늘 제 기분에 딱 맞는 게임은 「${result.title_ko}」！${result.mood_ko}。당신도 찾아봐요：${url}`
              : locale === 'de'
                ? `Basierend auf meiner heutigen Stimmung sollte ich ${result.title_de} spielen — ${result.mood_de}. Finde deins: ${url}`
                : `Based on my mood tonight, I should play ${result.title_en} — ${result.mood_en}. Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {getLoc(result.mood_zh, result.mood_en, result.mood_zhTW, result.mood_ja, result.mood_ko, result.mood_de)}
          </p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}
          </h2>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.why_zh, result.why_en, result.why_zhTW, result.why_ja, result.why_ko, result.why_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {getLoc('今晚这样开始：', 'Tonight: ', '今晚這樣開始：', '今夜はここから：', '오늘 밤 이렇게 시작해요: ', 'Heute Abend: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
          </p>
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
            '根据心情选 Cozy 游戏：今晚该玩什么？',
            'What Cozy Game Should I Play Tonight?',
            '根據心情選 Cozy 遊戲：今晚該玩什麼？',
            '今夜の気分でわかる！おすすめコージーゲームは？',
            '오늘 밤 기분에 맞는 코지 게임은?',
            'Welches Cozy Game sollte ich heute Abend spielen?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，根据你现在的心情找到最合适的 cozy 游戏',
            '6 questions to find the right cozy game for your exact mood right now',
            '6 個問題，根據你現在的心情找到最合適的 Cozy 遊戲',
            '6つの質問で、今夜の気分にぴったりのコージーゲームが見つかる',
            '6가지 질문으로 지금 내 기분에 딱 맞는 코지 게임 찾기',
            '6 Fragen, um das richtige Cozy-Game für deine aktuelle Stimmung zu finden',
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
          '找到今晚的游戏',
          'Find My Game for Tonight',
          '找到今晚的遊戲',
          '今夜のゲームを見つける',
          '오늘 밤 게임 찾기',
          'Mein Spiel für heute Abend finden',
        )}
      </button>
    </div>
  )
}
