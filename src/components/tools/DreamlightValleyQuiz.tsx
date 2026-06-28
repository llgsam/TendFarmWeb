'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Character = 'moana' | 'wall-e' | 'elsa' | 'goofy'

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
    ? locale === 'zh'
      ? '✓ 已复制！'
      : locale === 'zh-TW'
        ? '✓ 已複製！'
        : locale === 'ja'
          ? '✓ コピーしました！'
          : locale === 'ko'
            ? '✓ 복사되었습니다!'
            : locale === 'de'
              ? '✓ Kopiert!'
              : '✓ Copied!'
    : locale === 'zh'
      ? '📋 复制结果'
      : locale === 'zh-TW'
        ? '📋 複製結果'
        : locale === 'ja'
          ? '📋 結果をコピー'
          : locale === 'ko'
            ? '📋 결과 복사'
            : locale === 'de'
              ? '📋 Ergebnis kopieren'
              : '📋 Copy result'

  const shareLabel =
    locale === 'zh' || locale === 'zh-TW'
      ? '分享'
      : locale === 'ja'
        ? 'シェア'
        : locale === 'ko'
          ? '공유'
          : locale === 'de'
            ? 'Teilen'
            : 'Share'

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
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Character }>
}> = [
  {
    q_en: 'How do you usually spend your time in a cozy life sim?',
    q_zh: '在 Cozy 生活游戏里，你通常怎么打发时间？',
    q_zhTW: '在 Cozy 生活遊戲裡，你通常怎麼打發時間？',
    q_ja: 'コージー生活シムで、あなたはどんなふうに時間を過ごしますか？',
    q_ko: '코지 생활 시뮬레이션 게임에서 주로 어떻게 시간을 보내나요？',
    q_de: 'Wie verbringst du deine Zeit meistens in einem gemütlichen Life-Sim-Spiel?',
    options: [
      {
        en: "Exploring every corner — I need to see what's beyond the next area",
        zh: '探索每一个角落——我需要看看下一个区域有什么',
        zhTW: '探索每一個角落——我需要看看下一個區域有什麼',
        ja: '隅から隅まで探索——次のエリアに何があるか確かめないと気が済まない',
        ko: '모든 구석 탐험하기 — 다음 구역에 뭐가 있는지 꼭 봐야 해',
        de: 'Jeden Winkel erkunden — ich muss wissen, was hinter dem nächsten Bereich wartet',
        type: 'moana',
      },
      {
        en: 'Collecting and organizing — my storage chest is perfectly sorted',
        zh: '收集和整理——我的收纳箱整理得井井有条',
        zhTW: '收集和整理——我的收納箱整理得井井有條',
        ja: '収集と整理整頓——私のチェストは完璧に片づいてる',
        ko: '수집하고 정리하기 — 내 수납함은 완벽하게 정돈되어 있어',
        de: 'Sammeln und ordnen — meine Truhen sind perfekt sortiert',
        type: 'wall-e',
      },
      {
        en: 'Working on one beautiful long-term project at my own pace',
        zh: '按自己的节奏做一个漂亮的长期项目',
        zhTW: '按自己的節奏做一個漂亮的長期專案',
        ja: '自分のペースで一つの美しい長期プロジェクトに取り組む',
        ko: '내 페이스에 맞춰 하나의 멋진 장기 프로젝트 진행하기',
        de: 'An einem schönen Langzeitprojekt in meinem eigenen Tempo arbeiten',
        type: 'elsa',
      },
      {
        en: 'Chatting with every character and helping with their quests',
        zh: '和每个角色聊天、帮他们完成任务',
        zhTW: '和每個角色聊天、幫他們完成任務',
        ja: 'すべてのキャラクターと話して、クエストを手伝う',
        ko: '모든 캐릭터와 대화하고 퀘스트 도와주기',
        de: 'Mit jedem Charakter reden und bei ihren Quests helfen',
        type: 'goofy',
      },
    ],
  },
  {
    q_en: 'Your friends would most likely describe you as:',
    q_zh: '你的朋友最可能用哪个词描述你？',
    q_zhTW: '你的朋友最可能用哪個詞描述你？',
    q_ja: '友達があなたのことを一言で表すとしたら？',
    q_ko: '친구들이 당신을 어떻게 설명할 것 같나요？',
    q_de: 'Wie würden deine Freunde dich am ehesten beschreiben?',
    options: [
      {
        en: 'Determined — once you set a goal, nothing stops you',
        zh: '坚定——一旦设定目标，没有什么能阻止你',
        zhTW: '堅定——一旦設定目標，沒有什麼能阻止你',
        ja: '意志が強い——一度決めたらどんな壁も乗り越える',
        ko: '의지가 강한 — 목표를 정하면 무엇도 막을 수 없어',
        de: 'Entschlossen — wenn du ein Ziel gesetzt hast, hält dich nichts auf',
        type: 'moana',
      },
      {
        en: 'Observant — you notice details that everyone else misses',
        zh: '细心——你能注意到其他人都忽略的细节',
        zhTW: '細心——你能注意到其他人都忽略的細節',
        ja: '観察眼が鋭い——他の人が見逃す細かいところに気づく',
        ko: '관찰력이 뛰어난 — 다른 사람들이 놓치는 세세한 것을 눈치채',
        de: 'Aufmerksam — du bemerkst Details, die andere übersehen',
        type: 'wall-e',
      },
      {
        en: 'Independent — you recharge alone and work best with space',
        zh: '独立——你独处时恢复精力，有空间时状态最好',
        zhTW: '獨立——你獨處時恢復精力，有空間時狀態最好',
        ja: '自立している——一人の時間でエネルギーを回復する',
        ko: '독립적인 — 혼자 있을 때 에너지가 충전되고 자기만의 공간이 있을 때 최고',
        de: 'Unabhängig — du tankst Energie allein und arbeitest am besten mit Freiraum',
        type: 'elsa',
      },
      {
        en: 'Warm — you make everyone around you feel welcome instantly',
        zh: '温暖——你能让身边的每个人立刻感到受欢迎',
        zhTW: '溫暖——你能讓身邊的每個人立刻感到受歡迎',
        ja: '温かみがある——いるだけで周りの人がくつろげる雰囲気を作れる',
        ko: '따뜻한 — 주변 사람들을 바로 편안하게 만들어줘',
        de: 'Herzlich — du lässt jeden in deiner Nähe sofort willkommen fühlen',
        type: 'goofy',
      },
    ],
  },
  {
    q_en: 'What do you find most satisfying in a game?',
    q_zh: '游戏里什么样的体验最让你满足？',
    q_zhTW: '遊戲裡什麼樣的體驗最讓你滿足？',
    q_ja: 'ゲームでいちばん達成感を感じるのはどんなとき？',
    q_ko: '게임에서 가장 뿌듯한 순간은 언제인가요？',
    q_de: 'Was gibt dir in einem Spiel die meiste Befriedigung?',
    options: [
      {
        en: 'Unlocking a new area or reaching a place I have never been',
        zh: '解锁新区域或到达一个从未去过的地方',
        zhTW: '解鎖新區域或到達一個從未去過的地方',
        ja: '新しいエリアの解放、行ったことのない場所への到達',
        ko: '새 구역 해금 또는 한 번도 가본 적 없는 곳에 도착하기',
        de: 'Einen neuen Bereich freischalten oder einen noch nie gesehenen Ort erreichen',
        type: 'moana',
      },
      {
        en: 'Completing a collection or finishing a set of items',
        zh: '完成一个收藏或补齐一套道具',
        zhTW: '完成一個收藏或補齊一套道具',
        ja: 'コレクションを完成させたり、アイテムセットを揃えたり',
        ko: '컬렉션 완성 또는 아이템 세트 채우기',
        de: 'Eine Sammlung vervollständigen oder ein Item-Set zusammenstellen',
        type: 'wall-e',
      },
      {
        en: 'Creating something visually stunning — a build or design I am proud of',
        zh: '创造出让我自豪的视觉作品——建筑或设计',
        zhTW: '創造出讓我自豪的視覺作品——建築或設計',
        ja: '見た目に美しいものを作り上げる——自慢のビルドやデザイン',
        ko: '시각적으로 멋진 것 만들기 — 자랑스러운 건물이나 디자인',
        de: 'Etwas visuell Beeindruckendes erschaffen — ein Gebäude oder Design, auf das ich stolz bin',
        type: 'elsa',
      },
      {
        en: 'Reaching max friendship with a character and reading their final story',
        zh: '和角色达到最高好感度，读完他们的最终故事',
        zhTW: '和角色達到最高好感度，讀完他們的最終故事',
        ja: 'キャラクターと最大の友好度に達して、最終ストーリーを読む',
        ko: '캐릭터와 최고 친밀도 달성 후 마지막 스토리 읽기',
        de: 'Die maximale Freundschaft mit einem Charakter erreichen und seine letzte Geschichte lesen',
        type: 'goofy',
      },
    ],
  },
  {
    q_en: 'When you face a challenge or obstacle, your instinct is to:',
    q_zh: '面对挑战或障碍时，你的第一反应是？',
    q_zhTW: '面對挑戰或障礙時，你的第一反應是？',
    q_ja: '困難や障害に直面したとき、あなたの本能的な反応は？',
    q_ko: '도전이나 장애물을 만났을 때 본능적인 반응은？',
    q_de: 'Wenn du einer Herausforderung oder einem Hindernis begegnest, ist dein erster Instinkt:',
    options: [
      {
        en: 'Push through — obstacles are just part of the journey',
        zh: '迎头而上——障碍只是旅途的一部分',
        zhTW: '迎頭而上——障礙只是旅途的一部分',
        ja: '突き進む——障害は旅の一部にすぎない',
        ko: '밀고 나가기 — 장애물은 여정의 일부일 뿐',
        de: 'Durchhalten — Hindernisse gehören einfach zum Weg dazu',
        type: 'moana',
      },
      {
        en: 'Patiently gather everything you need before moving forward',
        zh: '耐心收集所有需要的东西，再继续前进',
        zhTW: '耐心收集所有需要的東西，再繼續前進',
        ja: '必要なものを辛抱強く揃えてから前へ進む',
        ko: '필요한 것을 차분히 다 모은 다음 나아가기',
        de: 'Geduldig alles sammeln, was du brauchst, bevor du weitermachst',
        type: 'wall-e',
      },
      {
        en: 'Step back, think it through alone, then solve it your own way',
        zh: '退一步，独自思考，然后用自己的方式解决',
        zhTW: '退一步，獨自思考，然後用自己的方式解決',
        ja: '一歩引いて一人で考え、自分なりの方法で解決する',
        ko: '한 발 물러서서 혼자 생각하고 나만의 방법으로 해결하기',
        de: 'Einen Schritt zurücktreten, allein nachdenken, dann auf deine eigene Art lösen',
        type: 'elsa',
      },
      {
        en: 'Ask for help or team up — two heads are better than one',
        zh: '寻求帮助或合作——三个臭皮匠胜过诸葛亮',
        zhTW: '尋求幫助或合作——三個臭皮匠勝過諸葛亮',
        ja: '助けを求めたり協力したり——二人寄れば文殊の知恵',
        ko: '도움 요청하거나 협력하기 — 백지장도 맞들면 낫다',
        de: 'Um Hilfe bitten oder zusammenarbeiten — vier Augen sehen mehr als zwei',
        type: 'goofy',
      },
    ],
  },
  {
    q_en: 'Your ideal morning in Dreamlight Valley starts with:',
    q_zh: '你在 Dreamlight Valley 里理想的早晨从什么开始？',
    q_zhTW: '你在 Dreamlight Valley 裡理想的早晨從什麼開始？',
    q_ja: 'Dreamlight Valley での理想の朝の始まりは？',
    q_ko: 'Dreamlight Valley에서 이상적인 아침은 어떻게 시작되나요？',
    q_de: 'Dein idealer Morgen in Dreamlight Valley beginnt mit:',
    options: [
      {
        en: 'Immediately heading out to explore — there is always somewhere new to discover',
        zh: '马上出门探索——总有新地方可以发现',
        zhTW: '馬上出門探索——總有新地方可以發現',
        ja: 'すぐに外へ探索へ——いつも新しい場所が待っている',
        ko: '바로 탐험 나가기 — 항상 새로운 장소가 기다리고 있어',
        de: 'Sofort nach draußen zum Erkunden — es gibt immer etwas Neues zu entdecken',
        type: 'moana',
      },
      {
        en: 'Checking what resources have respawned overnight and gathering them methodically',
        zh: '查看昨晚刷新的资源，有条不紊地收集它们',
        zhTW: '查看昨晚刷新的資源，有條不紊地收集它們',
        ja: '一晩でリスポーンしたリソースを確認して、計画的に集める',
        ko: '밤새 리스폰된 자원 확인하고 차근차근 수집하기',
        de: 'Prüfen, welche Ressourcen über Nacht gespawnt sind, und sie systematisch sammeln',
        type: 'wall-e',
      },
      {
        en: 'Tending your garden and working on your ongoing passion project',
        zh: '照料花园，继续我正在进行的长期项目',
        zhTW: '照料花園，繼續我正在進行的長期專案',
        ja: '畑の世話をして、進行中の長期プロジェクトを続ける',
        ko: '정원 돌보고 진행 중인 장기 프로젝트 계속하기',
        de: 'Den Garten pflegen und an meinem laufenden Langzeitprojekt weiterarbeiten',
        type: 'elsa',
      },
      {
        en: 'Visiting every character to wish them good morning and see what they need',
        zh: '拜访每位角色，向他们道声早安，看看他们需要什么',
        zhTW: '拜訪每位角色，向他們道聲早安，看看他們需要什麼',
        ja: '全キャラクターを訪問して、おはようと声をかけて何が必要か聞く',
        ko: '모든 캐릭터 방문해서 아침 인사하고 뭐가 필요한지 확인하기',
        de: 'Jeden Charakter besuchen, guten Morgen sagen und schauen, was er braucht',
        type: 'goofy',
      },
    ],
  },
  {
    q_en: 'Which quality matters most to you in the people around you?',
    q_zh: '你最看重身边人的哪种品质？',
    q_zhTW: '你最看重身邊人的哪種品質？',
    q_ja: '身近な人に最も大切にしてほしい資質は？',
    q_ko: '주변 사람들에게서 가장 중요하게 생각하는 자질은？',
    q_de: 'Welche Eigenschaft ist dir bei Menschen in deiner Umgebung am wichtigsten?',
    options: [
      {
        en: 'Courage — people who face hard things without backing down',
        zh: '勇气——面对困难时不退缩的人',
        zhTW: '勇氣——面對困難時不退縮的人',
        ja: '勇気——困難に直面しても逃げない人',
        ko: '용기 — 어려움 앞에서도 물러서지 않는 사람',
        de: 'Mut — Menschen, die Schwierigkeiten ohne Rückzug begegnen',
        type: 'moana',
      },
      {
        en: 'Loyalty — people who quietly show up for you, every time',
        zh: '忠诚——每次都默默守护你的人',
        zhTW: '忠誠——每次都默默守護你的人',
        ja: '誠実さ——何があっても静かにそばにいてくれる人',
        ko: '충성 — 매번 조용히 곁에 있어주는 사람',
        de: 'Treue — Menschen, die still und verlässlich für dich da sind',
        type: 'wall-e',
      },
      {
        en: 'Depth — people who have their own rich inner world',
        zh: '深度——有自己丰富内心世界的人',
        zhTW: '深度——有自己豐富內心世界的人',
        ja: '深み——自分の豊かな内面世界を持つ人',
        ko: '깊이 — 자신만의 풍부한 내면 세계를 가진 사람',
        de: 'Tiefe — Menschen mit ihrer eigenen reichen inneren Welt',
        type: 'elsa',
      },
      {
        en: 'Kindness — people who treat everyone with genuine warmth',
        zh: '善良——真心对待每个人的人',
        zhTW: '善良——真心對待每個人的人',
        ja: '優しさ——誰に対しても心から温かく接する人',
        ko: '친절함 — 모든 사람을 진심으로 따뜻하게 대하는 사람',
        de: 'Freundlichkeit — Menschen, die jedem mit echter Wärme begegnen',
        type: 'goofy',
      },
    ],
  },
]

const RESULTS: Record<
  Character,
  {
    name_en: string
    name_zh: string
    name_zhTW: string
    name_ja: string
    name_ko: string
    name_de: string
    emoji: string
    origin_en: string
    origin_zh: string
    origin_zhTW: string
    origin_ja: string
    origin_ko: string
    origin_de: string
    trait_en: string
    trait_zh: string
    trait_zhTW: string
    trait_ja: string
    trait_ko: string
    trait_de: string
    desc_en: string
    desc_zh: string
    desc_zhTW: string
    desc_ja: string
    desc_ko: string
    desc_de: string
    tip_en: string
    tip_zh: string
    tip_zhTW: string
    tip_ja: string
    tip_ko: string
    tip_de: string
  }
> = {
  moana: {
    name_en: 'Moana',
    name_zh: '莫阿娜',
    name_zhTW: '莫阿娜',
    name_ja: 'モアナ',
    name_ko: '모아나',
    name_de: 'Moana',
    emoji: '🌊',
    origin_en: 'Moana (2016)',
    origin_zh: '《海洋奇缘》（2016）',
    origin_zhTW: '《海洋奇緣》（2016）',
    origin_ja: 'モアナと伝説の海（2016）',
    origin_ko: '모아나 (2016)',
    origin_de: 'Moana (2016)',
    trait_en: 'The Fearless Wayfinder',
    trait_zh: '无畏的航海者',
    trait_zhTW: '無畏的航海者',
    trait_ja: '恐れ知らずの航海者',
    trait_ko: '두려움 없는 항해자',
    trait_de: 'Die furchtlose Seefahrerin',
    desc_en:
      "You are Moana — the one who hears the call of the horizon and answers it without hesitation. In Dreamlight Valley and in life, you are driven by a need to discover, to go further, to understand what lies beyond the edge of what you already know. You are not reckless — you are brave with purpose. When things get hard, you keep moving. When others doubt, you stay the course. Your greatest strength is that you know who you are, even when the world tries to convince you otherwise.",
    desc_zh:
      '你是莫阿娜——那个听到地平线的召唤就毫不犹豫回应的人。在 Dreamlight Valley 和现实生活中，你都被一种探索的渴望驱动——去更远的地方，去理解已知边界之外的东西。你不是莽撞，而是有目的的勇敢。当事情变难，你继续前行；当他人质疑，你坚守初心。你最大的力量是：即使世界试图说服你，你也清楚自己是谁。',
    desc_zhTW:
      '你是莫阿娜——那個聽到地平線召喚便毫不猶豫回應的人。在 Dreamlight Valley 和現實生活中，你都被一種探索的渴望驅動——去更遠的地方，去理解已知邊界之外的東西。你不是莽撞，而是有目的的勇敢。當事情變難，你繼續前行；當他人質疑，你堅守初心。你最大的力量是：即使世界試圖說服你，你也清楚自己是誰。',
    desc_ja:
      'あなたはモアナ——地平線の呼び声に迷わず応える人。Dreamlight Valley でも現実でも、あなたは「もっと遠くへ」という衝動に突き動かされています。無謀なのではなく、目的を持った勇敢さがあるのです。困難が来ても立ち止まらず、疑われても自分の道を進む。あなたの最大の強みは、世界がどう言おうと、自分が何者かをちゃんと知っていること。',
    desc_ko:
      '당신은 모아나입니다 — 지평선의 부름을 듣고 망설임 없이 응답하는 사람. Dreamlight Valley에서도, 현실에서도 당신은 더 멀리 가고 싶은 충동에 이끌립니다. 무모한 게 아니라 목적이 있는 용감함이죠. 어려워도 멈추지 않고, 의심받아도 자신의 길을 갑니다. 당신의 가장 큰 힘은 세상이 뭐라 해도 자신이 누구인지 알고 있다는 것입니다.',
    desc_de:
      'Du bist Moana — die Person, die den Ruf des Horizonts hört und ohne Zögern antwortet. In Dreamlight Valley und im echten Leben wirst du von dem Wunsch angetrieben, zu entdecken, weiter zu gehen und zu verstehen, was jenseits des Bekannten liegt. Du bist nicht leichtsinnig — du bist mutig mit Absicht. Wenn es schwer wird, machst du weiter. Wenn andere zweifeln, hältst du Kurs. Deine größte Stärke ist, dass du weißt, wer du bist, auch wenn die Welt dich davon überzeugen will.',
    tip_en:
      "In Dreamlight Valley, prioritize unlocking the Forgotten Lands and Sunlit Plateau early — Moana's questline opens up some of the game's most visually stunning content.",
    tip_zh:
      '在 Dreamlight Valley 里，优先解锁「遗忘之地」和「晴光高原」——莫阿娜的故事线会开启游戏中视觉上最震撼的内容。',
    tip_zhTW:
      '在 Dreamlight Valley 裡，優先解鎖「遺忘之地」和「晴光高原」——莫阿娜的故事線會開啟遊戲中視覺上最震撼的內容。',
    tip_ja:
      'Dreamlight Valley では「忘れられた大地」と「陽光の高原」を早めに解放しよう——モアナのクエストラインはゲーム屈指のビジュアルコンテンツを開いてくれます。',
    tip_ko:
      'Dreamlight Valley에서는 「잊혀진 땅」과 「햇빛 고원」을 일찍 해금하세요 — 모아나의 퀘스트라인은 게임에서 시각적으로 가장 멋진 콘텐츠를 엽니다.',
    tip_de:
      'In Dreamlight Valley solltest du die Vergessenen Lande und das Sonnige Plateau früh freischalten — Moanas Questreihe öffnet einige der visuell beeindruckendsten Inhalte des Spiels.',
  },
  'wall-e': {
    name_en: 'WALL-E',
    name_zh: 'WALL-E',
    name_zhTW: 'WALL-E',
    name_ja: 'WALL-E',
    name_ko: 'WALL-E',
    name_de: 'WALL-E',
    emoji: '🤖',
    origin_en: 'WALL-E (2008)',
    origin_zh: '《机器人总动员》（2008）',
    origin_zhTW: '《機器人總動員》（2008）',
    origin_ja: 'ウォーリー（2008）',
    origin_ko: '월-E (2008)',
    origin_de: 'WALL-E (2008)',
    trait_en: 'The Patient Collector',
    trait_zh: '耐心的收藏者',
    trait_zhTW: '耐心的收藏者',
    trait_ja: '忍耐強いコレクター',
    trait_ko: '인내심 강한 수집가',
    trait_de: 'Der geduldige Sammler',
    desc_en:
      "You are WALL-E — patient, observant, and deeply appreciative of small things others overlook. You find meaning in the act of collecting, sorting, and preserving. In Dreamlight Valley, you probably have organized storage rooms, complete collections, and a farm that is perfectly planted in neat rows. You are not flashy about it — you just quietly do the work, find the joy in the process, and notice the beauty in things that other people walk right past.",
    desc_zh:
      '你是 WALL-E——耐心、细心，深深欣赏那些被别人忽视的小事。你在收集、整理和保存的过程中找到意义。在 Dreamlight Valley 里，你可能有整洁的仓库、完整的收藏，以及一片整整齐齐种植的农场。你不炫耀——你只是默默做着工作，在过程中找到乐趣，注意到别人径直走过的美好。',
    desc_zhTW:
      '你是 WALL-E——耐心、細心，深深欣賞那些被別人忽視的小事。你在收集、整理和保存的過程中找到意義。在 Dreamlight Valley 裡，你可能有整潔的倉庫、完整的收藏，以及一片整整齊齊種植的農場。你不炫耀——你只是默默做著工作，在過程中找到樂趣，注意到別人徑直走過的美好。',
    desc_ja:
      'あなたは WALL-E——忍耐強く、観察眼があり、他の人が見過ごすような小さなものに深く価値を感じる人。整理・収集・保存する行為に生きがいを見出しています。Dreamlight Valley では、きっと整然としたストレージルームと完璧なコレクション、そして美しく整列した農場を持っているはず。派手にやるタイプではなく、黙々と作業して、プロセスの中に喜びを見つける——それがあなたのスタイルです。',
    desc_ko:
      '당신은 WALL-E입니다 — 인내심이 강하고 관찰력이 뛰어나며, 다른 사람들이 무시하는 작은 것들에서 깊은 가치를 발견합니다. 수집하고 정리하고 보존하는 행위에서 의미를 찾죠. Dreamlight Valley에서는 깔끔하게 정돈된 창고, 완성된 컬렉션, 그리고 빈틈없이 심어진 농장을 가지고 있을 거예요. 화려하지 않지만 묵묵히 일하고, 과정 속에서 즐거움을 찾습니다.',
    desc_de:
      'Du bist WALL-E — geduldig, aufmerksam und tief beeindruckt von kleinen Dingen, die andere übersehen. Du findest Sinn im Sammeln, Sortieren und Bewahren. In Dreamlight Valley hast du wahrscheinlich ordentliche Lagerräume, vollständige Sammlungen und eine Farm mit perfekt ausgerichteten Reihen. Du prahlst nicht damit — du machst einfach still deine Arbeit, findest Freude im Prozess und bemerkst die Schönheit in Dingen, an denen alle anderen vorbeigehen.',
    tip_en:
      "WALL-E's questline in Dreamlight Valley involves collecting and sorting — right in your wheelhouse. Max his friendship early to unlock his story and the unique items he shares.",
    tip_zh:
      'WALL-E 在 Dreamlight Valley 里的故事线涉及收集和整理——正是你的强项。尽早提升与他的好感度，解锁他的故事和他会分享的独特道具。',
    tip_zhTW:
      'WALL-E 在 Dreamlight Valley 裡的故事線涉及收集和整理——正是你的強項。盡早提升與他的好感度，解鎖他的故事和他會分享的獨特道具。',
    tip_ja:
      'Dreamlight Valley での WALL-E のクエストラインは収集と整理がテーマ——まさにあなたの得意分野。早めに友好度を上げてストーリーと特別なアイテムを解放しましょう。',
    tip_ko:
      'Dreamlight Valley에서 WALL-E의 퀘스트라인은 수집과 정리가 주제입니다 — 바로 당신의 전문 분야. 일찍 친밀도를 올려 그의 스토리와 특별 아이템을 해금하세요.',
    tip_de:
      'WALL-Es Questreihe in Dreamlight Valley dreht sich ums Sammeln und Sortieren — genau dein Gebiet. Baue frühzeitig eine Freundschaft mit ihm auf, um seine Geschichte und die einzigartigen Items freizuschalten, die er teilt.',
  },
  elsa: {
    name_en: 'Elsa',
    name_zh: '艾莎',
    name_zhTW: '艾莎',
    name_ja: 'エルサ',
    name_ko: '엘사',
    name_de: 'Elsa',
    emoji: '❄️',
    origin_en: 'Frozen (2013)',
    origin_zh: '《冰雪奇缘》（2013）',
    origin_zhTW: '《冰雪奇緣》（2013）',
    origin_ja: 'アナと雪の女王（2013）',
    origin_ko: '겨울왕국 (2013)',
    origin_de: 'Frozen (2013)',
    trait_en: 'The Creative Loner',
    trait_zh: '创造型独行者',
    trait_zhTW: '創造型獨行者',
    trait_ja: '孤高のクリエイター',
    trait_ko: '창의적인 독자적 플레이어',
    trait_de: 'Die kreative Einzelgängerin',
    desc_en:
      "You are Elsa — powerful, creative, and most fully yourself when you have the space to work without interruption. You have a vision for how things should look or feel, and you pursue it with quiet intensity. Social energy drains you; solitude restores you. This does not make you cold — it means you bring your full self to the people and projects that matter to you. In Dreamlight Valley, your home plot is probably a work of art that reflects a very specific, deeply personal aesthetic.",
    desc_zh:
      '你是艾莎——强大、富有创造力，当有空间不受打扰地工作时你最充分地展现自我。你对事物应该呈现的样子有自己的愿景，并以安静的专注追求它。社交活动消耗你的精力，独处让你恢复。这不代表你冷漠——它意味着你把完整的自我带给对你重要的人和项目。在 Dreamlight Valley 里，你的家园地块可能是一件艺术品，反映着非常具体、深刻个人化的美学。',
    desc_zhTW:
      '你是艾莎——強大、富有創造力，當有空間不受打擾地工作時你最充分地展現自我。你對事物應該呈現的樣子有自己的願景，並以安靜的專注追求它。社交活動消耗你的精力，獨處讓你恢復。這不代表你冷漠——它意味著你把完整的自我帶給對你重要的人和專案。在 Dreamlight Valley 裡，你的家園地塊可能是一件藝術品，反映著非常具體、深刻個人化的美學。',
    desc_ja:
      'あなたはエルサ——力強く、創造的で、邪魔されずに作業できる空間があるときに最も輝く人。物事がどうあるべきかという自分なりのビジョンがあり、静かな集中力でそれを追い求めます。社交はエネルギーを消耗させ、一人の時間が回復をもたらす。それは冷たいということではなく——自分にとって大切な人やプロジェクトに、完全な自分を持ち込めるということ。Dreamlight Valley のあなたのホームは、きっと個人的な美学が詰まった芸術作品のような場所でしょう。',
    desc_ko:
      '당신은 엘사입니다 — 강하고 창의적이며, 방해받지 않고 작업할 수 있는 공간이 있을 때 가장 빛나는 사람. 사물이 어떤 모습이어야 하는지에 대한 자신만의 비전이 있고, 조용한 집중력으로 그것을 추구합니다. 사교 활동이 에너지를 소모시키고 혼자 있는 시간이 회복을 줍니다. 이것은 차갑다는 의미가 아닙니다 — 중요한 사람과 프로젝트에 온전한 자신을 가져온다는 뜻이죠. Dreamlight Valley에서 당신의 홈 구역은 아마 매우 개인적인 미학을 담은 예술 작품일 거예요.',
    desc_de:
      'Du bist Elsa — mächtig, kreativ und am vollständigsten du selbst, wenn du den Raum hast, ungestört zu arbeiten. Du hast eine Vision davon, wie Dinge aussehen oder sich anfühlen sollen, und verfolgst sie mit stiller Intensität. Soziale Energie zehrt dich aus; Einsamkeit stellt sie wieder her. Das macht dich nicht kalt — es bedeutet, dass du dein ganzes Ich in die Menschen und Projekte einbringst, die dir wichtig sind. In Dreamlight Valley ist dein Hausgrundstück wahrscheinlich ein Kunstwerk, das eine sehr spezifische, zutiefst persönliche Ästhetik widerspiegelt.',
    tip_en:
      "Elsa's questline involves building and creative expression. Invest in your Valley's aesthetics — furniture and biome decoration give you Dreamlight that accelerates the whole game.",
    tip_zh:
      '艾莎的故事线涉及建造和创意表达。投入精力美化你的 Valley——家具和生态区装饰会给你 Dreamlight，加速整个游戏进程。',
    tip_zhTW:
      '艾莎的故事線涉及建造和創意表達。投入精力美化你的 Valley——家具和生態區裝飾會給你 Dreamlight，加速整個遊戲進程。',
    tip_ja:
      'エルサのクエストラインは建設と創造的表現がテーマ。Valley のデコレーションに投資しよう——家具やバイオームの装飾は Dreamlight を与えてくれて、ゲーム全体を加速させます。',
    tip_ko:
      '엘사의 퀘스트라인은 건축과 창의적 표현이 주제입니다. Valley의 미관에 투자하세요 — 가구와 바이옴 장식이 Dreamlight를 주어 게임 전체를 가속합니다.',
    tip_de:
      'Elsas Questreihe dreht sich um Bauen und kreative Entfaltung. Investiere in die Ästhetik deines Valleys — Möbel und Biom-Dekorationen geben dir Dreamlight, was das gesamte Spiel beschleunigt.',
  },
  goofy: {
    name_en: 'Goofy',
    name_zh: '高飞',
    name_zhTW: '高飛',
    name_ja: 'グーフィー',
    name_ko: '구피',
    name_de: 'Goofy',
    emoji: '⭐',
    origin_en: 'Disney Classic',
    origin_zh: '迪士尼经典角色',
    origin_zhTW: '迪士尼經典角色',
    origin_ja: 'ディズニークラシックキャラクター',
    origin_ko: '디즈니 클래식 캐릭터',
    origin_de: 'Disney Klassik-Charakter',
    trait_en: 'The Community Heart',
    trait_zh: '社区的心脏',
    trait_zhTW: '社區的心臟',
    trait_ja: 'コミュニティの心臓部',
    trait_ko: '커뮤니티의 심장',
    trait_de: 'Das Herz der Gemeinschaft',
    desc_en:
      "You are Goofy — warm, genuine, endlessly enthusiastic, and the kind of person who makes everyone feel like they belong. You show up for the people around you without being asked. You find delight in simple things. You laugh at yourself. You make mistakes with good humor and keep going. In Dreamlight Valley, you have probably maxed out friendships with every character because you talked to them every single day without fail — not for the rewards, but because you actually like them.",
    desc_zh:
      '你是高飞——温暖、真诚、热情无限，让每个人都感到自己属于这里。你不需要被要求就会为身边的人出现。你在简单的事情中找到喜悦。你能对自己的错误一笑而过，继续前行。在 Dreamlight Valley 里，你可能已经和每一个角色都建立了最高好感度——因为你每天都不间断地和他们交谈，不是为了奖励，而是因为你真心喜欢他们。',
    desc_zhTW:
      '你是高飛——溫暖、真誠、熱情無限，讓每個人都感到自己屬於這裡。你不需要被要求就會為身邊的人出現。你在簡單的事情中找到喜悅。你能對自己的錯誤一笑而過，繼續前行。在 Dreamlight Valley 裡，你可能已經和每一個角色都建立了最高好感度——因為你每天都不間斷地和他們交談，不是為了獎勵，而是因為你真心喜歡他們。',
    desc_ja:
      'あなたはグーフィー——温かく、誠実で、いるだけでみんながここに居ていいんだと感じられる人。頼まれなくても周りの人のために動いてしまう。ちょっとしたことに喜びを見つけ、自分のミスを笑い飛ばして前へ進む。Dreamlight Valley では、おそらくすべてのキャラクターと最高の友好度を達成しているはず——報酬のためじゃなく、ただ彼らのことが好きだから、毎日欠かさず話しかけていたんでしょう。',
    desc_ko:
      '당신은 구피입니다 — 따뜻하고 진실하며 열정이 넘치고, 모든 사람이 여기에 속해 있다고 느끼게 만드는 사람. 부탁받지 않아도 주변 사람들을 위해 나서게 됩니다. 소소한 것에서 기쁨을 찾고, 실수도 웃음으로 넘기며 계속 나아갑니다. Dreamlight Valley에서는 아마 모든 캐릭터와 최고 친밀도를 달성했을 거예요 — 보상 때문이 아니라 그들이 진짜 좋기 때문에 매일 빠짐없이 대화했을 테니까요.',
    desc_de:
      'Du bist Goofy — warm, echt, unendlich enthusiastisch und die Art von Mensch, der jeden das Gefühl gibt, dazuzugehören. Du bist für die Menschen um dich herum da, ohne gefragt werden zu müssen. Du findest Freude an einfachen Dingen. Du lachst über deine Fehler und machst weiter. In Dreamlight Valley hast du wahrscheinlich mit jedem Charakter die maximale Freundschaft erreicht, weil du jeden einzelnen Tag mit ihnen geredet hast — nicht für die Belohnungen, sondern weil du sie wirklich magst.',
    tip_en:
      "Goofy runs the in-game store in Dreamlight Valley — befriend him quickly. His stall sells key crafting materials and upgrades over time, making early friendship one of the best economic investments in the game.",
    tip_zh:
      '高飞在 Dreamlight Valley 里经营游戏内商店——尽快和他建立好感。他的摊位出售关键制作材料，并会随时间升级，让早期与他建立友谊成为游戏里最佳的经济投资之一。',
    tip_zhTW:
      '高飛在 Dreamlight Valley 裡經營遊戲內商店——盡快和他建立好感。他的攤位出售關鍵製作材料，並會隨時間升級，讓早期與他建立友誼成為遊戲裡最佳的經濟投資之一。',
    tip_ja:
      'グーフィーは Dreamlight Valley のゲーム内ショップを経営しています——早めに仲良くなろう。彼の屋台はクラフト素材を販売していて、時間と共にアップグレードされるため、序盤の友好度上げはゲーム最高の経済投資の一つです。',
    tip_ko:
      '구피는 Dreamlight Valley에서 인게임 상점을 운영합니다 — 빠르게 친해지세요. 그의 가판대는 핵심 제작 재료를 팔며 시간이 지날수록 업그레이드되어, 초반 친밀도 올리기가 게임에서 최고의 경제적 투자 중 하나가 됩니다.',
    tip_de:
      'Goofy betreibt den In-Game-Shop in Dreamlight Valley — baue früh eine Freundschaft mit ihm auf. Sein Stand verkauft wichtige Herstellungsmaterialien und wird mit der Zeit aufgewertet, was frühe Freundschaft zu einer der besten wirtschaftlichen Investitionen im Spiel macht.',
  },
}

function calcResult(answers: Character[]): Character {
  const counts: Record<Character, number> = { moana: 0, 'wall-e': 0, elsa: 0, goofy: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Character
}

export function DreamlightValleyQuiz({ locale }: { locale: string }) {
  const getLoc = (
    zh: string,
    en: string,
    zhTW?: string,
    ja?: string,
    ko?: string,
    de?: string,
  ): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'
  const [answers, setAnswers] = useState<(Character | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Character[])]
    const url = `${BASE_URL}/${locale}/quizzes/dreamlight-valley-quiz`
    const shareText = getLoc(
      `我在 Disney Dreamlight Valley 里最像「${result.name_zh}」！来测测你是哪位 Disney 角色：${url}`,
      `I got ${result.name_en} in the Disney Dreamlight Valley Character Quiz! Find out which character you are: ${url}`,
      `我在 Disney Dreamlight Valley 裡最像「${result.name_zhTW}」！快來測測你是哪位 Disney 角色：${url}`,
      `Disney Dreamlight Valley キャラクタークイズで「${result.name_ja}」になりました！あなたは？: ${url}`,
      `Disney Dreamlight Valley 캐릭터 퀴즈에서 「${result.name_ko}」 결과가 나왔어요！당신은？ ${url}`,
      `Mein Ergebnis im Disney Dreamlight Valley Character-Quiz: ${result.name_de}! Welcher Charakter bist du? ${url}`,
    )

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {getLoc(result.origin_zh, result.origin_en, result.origin_zhTW, result.origin_ja, result.origin_ko, result.origin_de)}
          </p>
          <h2 className="mb-1 text-2xl font-bold text-[#f0a832]">
            {getLoc(result.name_zh, result.name_en, result.name_zhTW, result.name_ja, result.name_ko, result.name_de)}
          </h2>
          <p className="text-sm font-medium text-[#8a9a7a]">
            {getLoc(result.trait_zh, result.trait_en, result.trait_zhTW, result.trait_ja, result.trait_ko, result.trait_de)}
          </p>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
        </p>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-2 text-sm font-semibold text-[#e8dcc8]">
            {getLoc(
              `游戏提示：关于 ${result.name_zh}`,
              `In-game tip: About ${result.name_en}`,
              `遊戲提示：關於 ${result.name_zhTW}`,
              `ゲームのヒント：${result.name_ja} について`,
              `게임 팁：${result.name_ko} 에 대해`,
              `Spieltipp: Über ${result.name_de}`,
            )}
          </h3>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
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
            '你是哪位 Disney Dreamlight Valley 角色？',
            'Which Disney Dreamlight Valley Character Are You?',
            '你是哪位 Disney Dreamlight Valley 角色？',
            'あなたはどの Disney Dreamlight Valley キャラクター？',
            '당신은 어떤 Disney Dreamlight Valley 캐릭터인가요？',
            'Welcher Disney Dreamlight Valley Charakter bist du?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，测出你最像莫阿娜、WALL-E、艾莎还是高飞',
            '6 questions to find your Disney Dreamlight Valley character match',
            '6 個問題，測出你最像莫阿娜、WALL-E、艾莎還是高飛',
            '6問で分かる——モアナ・WALL-E・エルサ・グーフィー、あなたに似ているのは？',
            '6가지 질문으로 알아보는 나와 닮은 Disney 캐릭터 (모아나 / WALL-E / 엘사 / 구피)',
            '6 Fragen, um deinen Disney Dreamlight Valley Charakter zu finden',
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
        {getLoc('查看我的角色', 'Find My Character', '查看我的角色', '自分のキャラクターを見る', '내 캐릭터 보기', 'Meinen Charakter finden')}
      </button>
    </div>
  )
}
