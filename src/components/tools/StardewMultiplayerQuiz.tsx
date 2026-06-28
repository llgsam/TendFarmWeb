'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Role = 'provider' | 'builder' | 'explorer' | 'planner'

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
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Role }>
}> = [
  {
    q_en: "It's the first day of a new Stardew Valley co-op farm. What do you do?",
    q_zh: '星露谷联机农场的第一天，你会做什么？',
    q_zhTW: '星露谷聯機農場的第一天，你會做什麼？',
    q_ja: 'スターデューバレーのマルチプレイ農場、初日に何をする？',
    q_ko: '스타듀 밸리 멀티 농장 첫날, 당신은 무엇을 하나요?',
    q_de: 'Erster Tag auf einer Stardew-Valley-Koop-Farm — was machst du als Erstes?',
    options: [
      {
        en: 'Plant every seed in the starter pack and start cooking something for everyone',
        zh: '把新手礼包里的种子全种下去，然后给大家做点东西吃',
        zhTW: '把新手禮包裡的種子全種下去，然後給大家做點東西吃',
        ja: 'スターターパックの種を全部植えて、みんなのためにごはんを作り始める',
        ko: '스타터 팩 씨앗을 전부 심고 다들 먹을 음식을 만들기 시작한다',
        de: 'Alle Samen aus dem Starterpaket pflanzen und direkt für alle kochen',
        type: 'provider',
      },
      {
        en: "Start clearing land and mentally redesigning the whole farm's layout",
        zh: '开始清理土地，在脑海里重新规划整个农场的布局',
        zhTW: '開始清理土地，在腦海裡重新規劃整個農場的佈局',
        ja: '土地を整地しながら、頭の中でファーム全体のレイアウトを設計し直す',
        ko: '땅을 정리하면서 머릿속으로 농장 전체 레이아웃을 새로 구상한다',
        de: 'Das Land urbar machen und dabei die gesamte Farmgestaltung im Kopf umplanen',
        type: 'builder',
      },
      {
        en: 'Head straight to the mines — ore is the real bottleneck and someone has to grind it',
        zh: '直接去矿洞——矿石才是真正的瓶颈，总得有人去挖',
        zhTW: '直接去礦洞——礦石才是真正的瓶頸，總得有人去挖',
        ja: 'まっすぐ鉱山へ——鉱石こそが本当のボトルネック、誰かが掘りに行かないと',
        ko: '바로 광산으로 간다 — 광석이야말로 진짜 병목이고, 누군가는 캐야 하니까',
        de: 'Sofort in die Mine — Erz ist der echte Engpass und jemand muss es farmen',
        type: 'explorer',
      },
      {
        en: 'Open a spreadsheet and calculate the optimal crop rotation for the whole season',
        zh: '打开表格，计算整个季节的最优作物轮换方案',
        zhTW: '打開試算表，計算整個季節的最優作物輪換方案',
        ja: 'スプレッドシートを開いて、シーズン全体の最適な作物ローテーションを計算する',
        ko: '스프레드시트를 열고 시즌 전체의 최적 작물 로테이션을 계산한다',
        de: 'Eine Tabelle öffnen und die optimale Fruchtfolge für die ganze Saison berechnen',
        type: 'planner',
      },
    ],
  },
  {
    q_en: "Your co-op partner just spent all the shared gold on something unexpected. You:",
    q_zh: '你的联机伙伴刚把共享金币全花在了一件你没预料到的事上。你会：',
    q_zhTW: '你的聯機夥伴剛把共享金幣全花在了一件你沒預料到的事上。你會：',
    q_ja: 'チームメンバーが共有のゴールドを全部予想外のものに使ってしまった。あなたは？',
    q_ko: '같이 하는 친구가 공유 골드를 전부 예상치 못한 곳에 써버렸다. 당신은?',
    q_de: 'Dein Koop-Partner hat gerade alles gemeinsame Gold für etwas Unerwartetes ausgegeben. Du:',
    options: [
      {
        en: "Sigh, then immediately go harvest and sell crops to refill the treasury",
        zh: '叹口气，然后立刻去收割出售作物，把金库补回来',
        zhTW: '嘆口氣，然後立刻去收割出售作物，把金庫補回來',
        ja: 'ため息をついて、すぐに作物を収穫・販売して資金を補充する',
        ko: '한숨 쉬고, 바로 작물을 수확해서 팔아 금고를 채운다',
        de: 'Seufzen, dann sofort Ernte verkaufen und die Kasse wieder auffüllen',
        type: 'provider',
      },
      {
        en: "Ask what they bought — if it was a building upgrade you are secretly thrilled",
        zh: '问他们买了什么——如果是建筑升级，你心里其实很高兴',
        zhTW: '問他們買了什麼——如果是建築升級，你心裡其實很高興',
        ja: '何を買ったか聞く——建物のアップグレードなら、内心ちょっと嬉しい',
        ko: '뭘 샀는지 묻는다 — 건물 업그레이드라면 사실 속으로는 기쁘다',
        de: 'Fragen, was sie gekauft haben — bei einem Gebäude-Upgrade bist du heimlich erfreut',
        type: 'builder',
      },
      {
        en: "You're still in the mine and haven't checked the balance in three days",
        zh: '你还在矿洞里，已经三天没看账户余额了',
        zhTW: '你還在礦洞裡，已經三天沒看帳戶餘額了',
        ja: 'まだ鉱山にいて、3日間残高なんてチェックしてない',
        ko: '아직 광산 안에 있고, 3일째 잔액은 확인도 안 했다',
        de: 'Du bist noch in der Mine und hast seit drei Tagen nicht auf den Kontostand geschaut',
        type: 'explorer',
      },
      {
        en: 'Pull up the budget sheet and call a meeting — this was not in the plan',
        zh: '打开预算表，召开紧急会议——这不在计划之内',
        zhTW: '打開預算表，召開緊急會議——這不在計劃之內',
        ja: '予算シートを開いて緊急会議を開く——これは計画にない',
        ko: '예산 시트를 열고 긴급 회의를 소집한다 — 계획에 없는 일이다',
        de: 'Die Budgettabelle aufmachen und eine Notfallbesprechung einberufen — das war nicht geplant',
        type: 'planner',
      },
    ],
  },
  {
    q_en: 'Which part of co-op do you enjoy most?',
    q_zh: '联机模式里你最享受哪个部分？',
    q_zhTW: '聯機模式裡你最享受哪個部分？',
    q_ja: 'マルチプレイで一番楽しいのはどこ？',
    q_ko: '멀티플레이에서 가장 즐기는 부분은?',
    q_de: 'Was genießt du am meisten im Koop-Modus?',
    options: [
      {
        en: "Leaving food in the shared chest so everyone's energy is topped up",
        zh: '把食物放进共享箱，让大家的体力都满格',
        zhTW: '把食物放進共享箱，讓大家的體力都滿格',
        ja: '共有チェストに食料を入れて、みんなのスタミナを満タンにすること',
        ko: '공유 상자에 음식을 넣어서 모두의 체력을 꽉 채우는 것',
        de: 'Essen in die gemeinsame Truhe legen, damit alle volle Energie haben',
        type: 'provider',
      },
      {
        en: 'Finally getting the barn and coop built — seeing the farm come together',
        zh: '终于把谷仓和鸡舍建好——看着农场成形的那一刻',
        zhTW: '終於把穀倉和雞舍建好——看著農場成形的那一刻',
        ja: '納屋と鶏小屋がついに完成して、ファームが形になっていく瞬間',
        ko: '헛간과 닭장이 드디어 지어지는 순간 — 농장이 완성되어 가는 그 느낌',
        de: 'Die Scheune und den Hühnerstall fertigzustellen — wenn die Farm wirklich Gestalt annimmt',
        type: 'builder',
      },
      {
        en: 'Diving deep in the mines and surfacing with a bag full of rare ore and gems',
        zh: '深入矿洞，带着一包稀有矿石和宝石回来',
        zhTW: '深入礦洞，帶著一包稀有礦石和寶石回來',
        ja: '鉱山の深くまで潜って、レアな鉱石や宝石を山ほど持ち帰ること',
        ko: '광산 깊이 들어가서 희귀 광석과 보석 가득 들고 나오는 것',
        de: 'Tief in der Mine nach seltenen Erzen und Edelsteinen zu suchen und reich zurückzukehren',
        type: 'explorer',
      },
      {
        en: "Knowing that everything is running according to the plan you laid out on day one",
        zh: '知道一切都在按照第一天制定的计划进行',
        zhTW: '知道一切都在按照第一天制定的計劃進行',
        ja: '初日に立てた計画通りにすべてが進んでいると知っていること',
        ko: '모든 것이 첫날 세운 계획대로 돌아가고 있다는 걸 아는 것',
        de: 'Wissen, dass alles genau nach Plan läuft — dem Plan vom ersten Tag',
        type: 'planner',
      },
    ],
  },
  {
    q_en: 'Your team needs copper ore urgently. What happens?',
    q_zh: '队伍急需铜矿石。接下来发生了什么？',
    q_zhTW: '隊伍急需銅礦石。接下來發生了什麼？',
    q_ja: 'チームが銅の鉱石を急いでいる。どうなった？',
    q_ko: '팀이 구리 광석이 급하게 필요하다. 어떻게 됐나요?',
    q_de: 'Euer Team braucht dringend Kupfererz. Was passiert dann?',
    options: [
      {
        en: "You check if anyone has energy left and offer to run to the mine with food buffs",
        zh: '你检查大家还有没有体力，带着食物增益主动说去矿洞',
        zhTW: '你檢查大家還有沒有體力，帶著食物增益主動說去礦洞',
        ja: 'みんなのスタミナを確認して、食料バフを持って鉱山に行くと申し出る',
        ko: '다들 체력이 남았는지 확인하고, 음식 버프 챙겨서 광산 가겠다고 나선다',
        de: 'Nachschauen, ob noch jemand Energie hat, und mit Essen-Buffs anbieten, in die Mine zu gehen',
        type: 'provider',
      },
      {
        en: "You already bought a furnace but realize you were waiting for someone else to get ore",
        zh: '你已经买好了熔炉，但发现自己一直在等别人去挖矿',
        zhTW: '你已經買好了熔爐，但發現自己一直在等別人去挖礦',
        ja: '炉はもう買ってあるけど、誰かが鉱石を掘ってくれるのをずっと待っていたと気づく',
        ko: '용광로는 이미 샀는데, 계속 누군가 광석을 캐줄 거라고 기다리고 있었다는 걸 깨닫는다',
        de: 'Du hast schon einen Schmelzofen, aber merkst, dass du darauf gewartet hast, dass jemand anderes Erz holt',
        type: 'builder',
      },
      {
        en: 'You are already in the mine — you send "coming up soon" in chat',
        zh: '你已经在矿洞里了——你在聊天框发"马上上来"',
        zhTW: '你已經在礦洞裡了——你在聊天框發「馬上上來」',
        ja: 'もう鉱山にいる——チャットに「すぐ上がるよ」と送る',
        ko: '이미 광산 안에 있다 — 채팅창에 "곧 올라가요" 라고 보낸다',
        de: 'Du bist schon in der Mine — du schreibst im Chat "komme gleich hoch"',
        type: 'explorer',
      },
      {
        en: "You consult the schedule: copper was supposed to arrive yesterday per the plan",
        zh: '你翻查时间表：按计划铜矿昨天就该到了',
        zhTW: '你翻查時間表：按計劃銅礦昨天就該到了',
        ja: 'スケジュールを確認する：計画では銅は昨日届いているはずだった',
        ko: '일정표를 확인한다: 계획상 구리는 어제 왔어야 했다',
        de: 'Den Zeitplan prüfen: Laut Plan hätte Kupfer gestern schon da sein sollen',
        type: 'planner',
      },
    ],
  },
  {
    q_en: "A festival is coming up. How do you prepare?",
    q_zh: '节日快来了。你怎么准备？',
    q_zhTW: '節日快來了。你怎麼準備？',
    q_ja: 'もうすぐお祭り。どう準備する？',
    q_ko: '축제가 다가왔다. 어떻게 준비하나요?',
    q_de: 'Ein Fest steht bevor. Wie bereitest du dich vor?',
    options: [
      {
        en: 'Cook everyone their favorite dishes the night before so energy is maxed during the festival',
        zh: '前一天晚上给大家做最喜欢的菜，让节日当天体力满格',
        zhTW: '前一天晚上給大家做最喜歡的菜，讓節日當天體力滿格',
        ja: '前日の夜にみんなのお気に入り料理を作って、当日スタミナ満タンで臨めるようにする',
        ko: '하루 전날 밤에 모두가 좋아하는 음식을 만들어서 축제 당일 체력을 최대로 채운다',
        de: 'Am Abend vorher für alle das Lieblingsessen kochen, damit am Festtag alle volle Energie haben',
        type: 'provider',
      },
      {
        en: 'Make sure the farm looks presentable — maybe add some seasonal decorations',
        zh: '确保农场看起来整洁——也许加一些应季装饰',
        zhTW: '確保農場看起來整潔——也許加一些應季裝飾',
        ja: 'ファームが見栄え良く見えるようにする——季節の飾りをちょっと足すかも',
        ko: '농장이 깔끔하게 보이는지 확인한다 — 계절 장식도 좀 추가할지도',
        de: 'Dafür sorgen, dass die Farm vorzeigbar aussieht — vielleicht ein paar saisonale Dekorationen',
        type: 'builder',
      },
      {
        en: "Realize it is the night before and you forgot — quickly grab what prizes you want to win",
        zh: '发现前一天晚上才记起来——赶快确认自己想赢的奖品',
        zhTW: '發現前一天晚上才記起來——趕快確認自己想贏的獎品',
        ja: '前日の夜になってようやく気づく——欲しい景品を急いで確認する',
        ko: '하루 전날 밤에야 기억난다 — 얼른 원하는 상품이 뭔지 확인한다',
        de: 'Am Abend vorher daran erinnert werden — schnell nachschauen, welche Preise man gewinnen möchte',
        type: 'explorer',
      },
      {
        en: 'Block out time in the shared calendar and brief everyone on their roles',
        zh: '在共享日历里标注时间，向大家说明各自的分工',
        zhTW: '在共享日曆裡標注時間，向大家說明各自的分工',
        ja: '共有カレンダーに時間をブロックして、全員に役割を説明する',
        ko: '공유 캘린더에 시간을 표시하고 모두에게 각자의 역할을 설명한다',
        de: 'Zeit im gemeinsamen Kalender blockieren und alle über ihre Aufgaben briefen',
        type: 'planner',
      },
    ],
  },
  {
    q_en: 'At the end of a long play session, you feel most satisfied when:',
    q_zh: '一次长时间游戏结束后，你最有满足感的是：',
    q_zhTW: '一次長時間遊戲結束後，你最有滿足感的是：',
    q_ja: '長いプレイセッションが終わって、一番達成感があるのは？',
    q_ko: '긴 플레이 세션이 끝났을 때 가장 뿌듯한 순간은?',
    q_de: 'Nach einer langen Spielsession bist du am zufriedensten, wenn:',
    options: [
      {
        en: 'The shared chest is full of food, everyone has money, and the crops are watered',
        zh: '共享箱里装满了食物，大家都有钱，作物都浇好水了',
        zhTW: '共享箱裡裝滿了食物，大家都有錢，作物都澆好水了',
        ja: '共有チェストが食料でいっぱいで、みんなお金があって、作物に水もやってある',
        ko: '공유 상자가 음식으로 가득 차 있고, 다들 돈이 있고, 작물에 물도 다 줬다',
        de: 'Die Gemeinschaftstruhe ist voll mit Essen, alle haben Geld und die Ernte ist bewässert',
        type: 'provider',
      },
      {
        en: 'A new building went up and the farm layout is noticeably better than before',
        zh: '又盖好了一栋建筑，农场布局明显比以前更好看了',
        zhTW: '又蓋好了一棟建築，農場佈局明顯比以前更好看了',
        ja: '新しい建物が完成して、ファームのレイアウトが明らかに前より良くなった',
        ko: '새 건물이 하나 더 완성되고, 농장 레이아웃이 눈에 띄게 좋아졌다',
        de: 'Ein neues Gebäude steht und die Farm sieht merklich besser aus als vorher',
        type: 'builder',
      },
      {
        en: 'You hit a new mine floor record and have a pile of ore to process',
        zh: '你创下了新的矿洞层数纪录，有一堆矿石等着加工',
        zhTW: '你創下了新的礦洞層數紀錄，有一堆礦石等著加工',
        ja: '新しい鉱山フロア記録を出して、加工待ちの鉱石の山がある',
        ko: '광산 층 신기록을 세우고, 처리할 광석 더미가 쌓여 있다',
        de: 'Du hast einen neuen Minenrekord aufgestellt und ein Haufen Erz wartet auf die Verarbeitung',
        type: 'explorer',
      },
      {
        en: 'You checked off everything on the list and are ahead of schedule for next season',
        zh: '你完成了清单上的所有任务，下个季节的进度提前了',
        zhTW: '你完成了清單上的所有任務，下個季節的進度提前了',
        ja: 'リストのタスクを全部こなして、次のシーズンも予定より早く進んでいる',
        ko: '목록의 모든 작업을 완료했고, 다음 시즌도 예정보다 앞서 있다',
        de: 'Alle Punkte auf der Liste abgehakt und für die nächste Saison schon im Voraus',
        type: 'planner',
      },
    ],
  },
]

const RESULTS: Record<
  Role,
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
    desc_en: string
    desc_zh: string
    desc_zhTW: string
    desc_ja: string
    desc_ko: string
    desc_de: string
    strength_en: string
    strength_zh: string
    strength_zhTW: string
    strength_ja: string
    strength_ko: string
    strength_de: string
    blind_spot_en: string
    blind_spot_zh: string
    blind_spot_zhTW: string
    blind_spot_ja: string
    blind_spot_ko: string
    blind_spot_de: string
    tip_en: string
    tip_zh: string
    tip_zhTW: string
    tip_ja: string
    tip_ko: string
    tip_de: string
  }
> = {
  provider: {
    title_en: 'The Provider',
    title_zh: '补给官',
    title_zhTW: '補給官',
    title_ja: '補給係',
    title_ko: '보급 담당',
    title_de: 'Der Versorger',
    emoji: '🌾',
    tag_en: 'The heart of every co-op farm',
    tag_zh: '联机农场的心脏',
    tag_zhTW: '聯機農場的心臟',
    tag_ja: 'チームを支える縁の下の力持ち',
    tag_ko: '멀티 농장의 심장',
    tag_de: 'Das Herz jeder Koop-Farm',
    desc_en:
      "You are The Provider — the person who makes sure the whole operation actually runs. You plant crops, cook meals, fill the shared chest, and quietly keep everyone's energy topped up. You might not be the one with the dramatic mine run or the grand building project, but without you the farm would collapse in a week. Your co-op partners do not always notice until the food chest runs dry — then they understand exactly what you were doing.",
    desc_zh:
      '你是补给官——那个让整个农场实际运转的人。你种植作物、烹饪食物、填满共享箱，默默让大家的体力保持满格。你可能不是那个创下矿洞记录或搞大型建筑项目的人，但没有你，农场一周之内就会崩溃。你的联机伙伴不一定总能注意到你在做什么——直到食物箱见底，他们才真正明白你一直在干什么。',
    desc_zhTW:
      '你是補給官——那個讓整個農場實際運轉的人。你種植作物、烹飪食物、填滿共享箱，默默讓大家的體力保持滿格。你可能不是那個創下礦洞紀錄或搞大型建築項目的人，但沒有你，農場一週之內就會崩潰。你的聯機夥伴不一定總能注意到你在做什麼——直到食物箱見底，他們才真正明白你一直在做什麼。',
    desc_ja:
      'あなたは補給係——農場全体を実際に動かしている人です。作物を植え、料理を作り、共有チェストを食料で満たし、みんなのスタミナをこっそり補充し続けます。鉱山記録を出したり大きな建設プロジェクトを進めるのはあなたじゃないかもしれないけど、あなたがいなければ農場は1週間でつぶれてしまいます。チームメンバーはあなたが何をしているか気づかないことが多い——食料箱が空になったとき、ようやくわかるのです。',
    desc_ko:
      '당신은 보급 담당이에요 — 농장 전체가 실제로 돌아가게 만드는 사람이죠. 작물을 심고, 음식을 요리하고, 공유 상자를 채우며, 묵묵히 모두의 체력을 유지시킵니다. 광산 신기록을 세우거나 대형 건설 프로젝트를 진행하는 건 당신이 아닐 수도 있어요. 하지만 당신이 없으면 농장은 일주일 안에 무너집니다. 같이 하는 친구들은 당신이 뭘 하는지 항상 알아채지는 못해요 — 음식 상자가 바닥났을 때야 비로소 깨닫는 거죠.',
    desc_de:
      'Du bist Der Versorger — derjenige, der dafür sorgt, dass der ganze Betrieb wirklich läuft. Du pflanzt Kerne, kochst Mahlzeiten, füllst die gemeinsame Truhe und hältst still die Energie aller aufgefüllt. Vielleicht bist du nicht derjenige mit dem dramatischen Minenausflug oder dem großen Bauprojekt — aber ohne dich würde die Farm in einer Woche zusammenbrechen. Deine Koop-Partner bemerken es nicht immer, bis die Vorratstiste leer ist — dann verstehen sie genau, was du die ganze Zeit gemacht hast.',
    strength_en: 'Passive income, team sustainability, and making sure no one runs out of energy mid-day',
    strength_zh: '被动收入、团队持续运转、确保没人在进行到一半时体力耗尽',
    strength_zhTW: '被動收入、團隊持續運轉、確保沒人在進行到一半時體力耗盡',
    strength_ja: '継続的な収入源、チームの持続性、誰もスタミナ切れにならないようにすること',
    strength_ko: '수동 수입, 팀 지속성, 아무도 체력이 바닥나지 않게 하는 것',
    strength_de: 'Passives Einkommen, Teamausdauer und sicherstellen, dass niemandem mitten am Tag die Energie ausgeht',
    blind_spot_en: 'You sometimes forget to advance your own friendship hearts or do things just for fun',
    blind_spot_zh: '你有时会忘记推进自己的好感度，或者只是为了玩而玩',
    blind_spot_zhTW: '你有時會忘記推進自己的好感度，或者只是為了玩而玩',
    blind_spot_ja: '自分の友好度上げや純粋に楽しむことを忘れがち',
    blind_spot_ko: '자신의 우호도를 올리거나 그냥 재미로 노는 걸 잊어버릴 때가 있어요',
    blind_spot_de: 'Du vergisst manchmal, deine eigenen Freundschaftspunkte voranzubringen oder Dinge einfach zum Spaß zu tun',
    tip_en: "Automate your watering with sprinklers as soon as possible — it frees you to do more without feeling like you're abandoning your duties.",
    tip_zh: '尽快用洒水器自动化浇水——这能解放你去做更多事，而不会有「抛下职责」的愧疚感。',
    tip_zhTW: '盡快用灑水器自動化澆水——這能解放你去做更多事，而不會有「拋下職責」的愧疚感。',
    tip_ja: 'なるべく早くスプリンクラーで水やりを自動化しよう——「仕事を放棄している」という罪悪感なしに、もっといろんなことができるようになるよ。',
    tip_ko: '가능한 한 빨리 스프링클러로 물주기를 자동화하세요 — "맡은 일을 팽개쳤다"는 죄책감 없이 더 많은 것들을 할 수 있게 됩니다.',
    tip_de: 'Automatisiere dein Gießen mit Sprinklern so schnell wie möglich — das befreit dich für mehr Aktivitäten, ohne das Gefühl zu haben, deine Pflichten zu vernachlässigen.',
  },
  builder: {
    title_en: 'The Builder',
    title_zh: '建造师',
    title_zhTW: '建造師',
    title_ja: '建設家',
    title_ko: '건설가',
    title_de: 'Der Erbauer',
    emoji: '🏗️',
    tag_en: 'The one with the vision',
    tag_zh: '有愿景的那个人',
    tag_zhTW: '有願景的那個人',
    tag_ja: 'ビジョンを持つ人',
    tag_ko: '비전이 있는 사람',
    tag_de: 'Derjenige mit der Vision',
    desc_en:
      "You are The Builder — the one who sees the farm not as it is, but as it could be. You spend a lot of time in Robin's shop, have strong opinions about where the greenhouse should go, and once rearranged the entire farm at 2am because the layout was bothering you. Your co-op partners sometimes wonder where all the money went — but when the new barn goes up and you put down the pathway and the flowers, they admit it looks amazing.",
    desc_zh:
      '你是建造师——那个不按农场现有的样子，而是按它本来可以成为的样子来看待它的人。你花大量时间在罗宾的商店里，对温室应该放在哪里有强烈意见，也曾因为布局让你不舒服而在凌晨两点重新规划整个农场。你的联机伙伴有时会疑惑钱都去哪了——但当新谷仓建好、你铺上小路和鲜花时，他们会承认确实很美。',
    desc_zhTW:
      '你是建造師——那個不按農場現有的樣子，而是按它本來可以成為的樣子來看待它的人。你花大量時間在羅賓的商店裡，對溫室應該放在哪裡有強烈意見，也曾因為佈局讓你不舒服而在凌晨兩點重新規劃整個農場。你的聯機夥伴有時會疑惑錢都去哪了——但當新穀倉建好、你鋪上小路和鮮花時，他們會承認確實很美。',
    desc_ja:
      'あなたは建設家——農場の今の姿でなく、なりうる姿で見ている人。ロビンのお店でたっぷり時間を使い、温室をどこに置くかについて強い意見を持ち、レイアウトが気になって夜中の2時にファームを全部作り直したことがある。チームメンバーはお金がどこへ消えたと首をかしげることもあるけど——新しい納屋が建って小道と花を置き始めたら、みんな「確かにいいな」と認めるはず。',
    desc_ko:
      '당신은 건설가예요 — 농장을 현재 모습이 아닌, 될 수 있는 모습으로 바라보는 사람이죠. 로빈의 가게에서 많은 시간을 보내고, 온실이 어디에 들어가야 하는지에 대한 강한 의견이 있으며, 레이아웃이 마음에 안 들어서 새벽 두 시에 농장을 전부 다시 배치한 적도 있어요. 같이 하는 친구들은 돈이 어디 갔냐고 의아해할 때도 있지만 — 새 헛간이 올라가고 오솔길과 꽃을 깔았을 때, "확실히 멋있다"고 인정하게 됩니다.',
    desc_de:
      'Du bist Der Erbauer — derjenige, der die Farm nicht so sieht, wie sie ist, sondern wie sie sein könnte. Du verbringst viel Zeit in Robins Laden, hast starke Meinungen darüber, wo das Gewächshaus hingehört, und hast einmal um 2 Uhr nachts die gesamte Farm umgeplant, weil das Layout dich störte. Deine Koop-Partner fragen sich manchmal, wo das ganze Geld hingegangen ist — aber wenn die neue Scheune steht und du Wege und Blumen verlegst, geben sie zu, dass es wirklich toll aussieht.',
    strength_en: 'Long-term farm vision, infrastructure investment, and making the farm something to be proud of',
    strength_zh: '农场长期愿景、基础设施投资、让农场成为值得自豪的作品',
    strength_zhTW: '農場長期願景、基礎設施投資、讓農場成為值得自豪的作品',
    strength_ja: '長期的なファームのビジョン、インフラへの投資、誇れるファームを作ること',
    strength_ko: '농장 장기 비전, 인프라 투자, 자랑스러운 농장 만들기',
    strength_de: 'Langfristige Farm-Vision, Infrastrukturinvestitionen und die Farm zu etwas machen, auf das man stolz sein kann',
    blind_spot_en: "Buildings are expensive early — coordinate with your team before spending shared gold",
    blind_spot_zh: '前期建筑很贵——花共享金币之前先和队伍沟通一下',
    blind_spot_zhTW: '前期建築很貴——花共享金幣之前先和隊伍溝通一下',
    blind_spot_ja: '序盤の建物は高い——共有ゴールドを使う前にチームと相談して',
    blind_spot_ko: '초반 건물은 비쌉니다 — 공유 골드를 쓰기 전에 팀과 먼저 상의하세요',
    blind_spot_de: 'Gebäude sind früh teuer — sprich mit deinem Team bevor du gemeinsames Gold ausgibst',
    tip_en: "Set aside a building fund in a separate chest labeled 'DO NOT TOUCH' — it keeps the peace and the dream alive at the same time.",
    tip_zh: "在一个单独的箱子里存建造基金，贴上「请勿动」的标签——这样既维护了和平，也让梦想得以延续。",
    tip_zhTW: '在一個單獨的箱子裡存建造基金，貼上「請勿動」的標籤——這樣既維護了和平，也讓夢想得以延續。',
    tip_ja: '別のチェストに建設資金を取り分けて「さわるな」とラベルを貼ろう——平和を保ちながら夢もつなぎ止めてくれる。',
    tip_ko: '건설 자금을 별도 상자에 모아두고 "손대지 마시오" 라벨을 붙이세요 — 평화를 유지하면서 꿈도 이어나갈 수 있습니다.',
    tip_de: 'Lege in einer separaten Truhe einen Baufonds an und beschrifte sie mit "NICHT ANFASSEN" — das sichert den Frieden und hält den Traum am Leben.',
  },
  explorer: {
    title_en: 'The Explorer',
    title_zh: '探险家',
    title_zhTW: '探險家',
    title_ja: '探検家',
    title_ko: '탐험가',
    title_de: 'Der Entdecker',
    emoji: '⚔️',
    tag_en: 'Always deeper in the mines',
    tag_zh: '永远在矿洞更深处',
    tag_zhTW: '永遠在礦洞更深處',
    tag_ja: 'いつも鉱山のもっと深くに',
    tag_ko: '항상 광산 더 깊은 곳에',
    tag_de: 'Immer tiefer in der Mine',
    desc_en:
      "You are The Explorer — the one who disappears into the mines on day one and resurfaces three in-game days later with a bag full of copper, iron, and an inexplicable number of purple mushrooms. You do not always know what season it is or how many days until winter. But you consistently provide the ore pipeline that makes everything else possible — the furnaces, the sprinklers, the kegs. Without you, the farm stalls out. You are the engine room.",
    desc_zh:
      '你是探险家——那个第一天就消失在矿洞里，游戏内三天后才带着满满一包铜矿、铁矿和莫名其妙的大量紫蘑菇重新出现的人。你不一定知道现在是什么季节，或者距离冬天还有多少天。但你持续提供着让其他一切成为可能的矿石流水线——熔炉、洒水器、木桶。没有你，农场会停滞不前。你是引擎室。',
    desc_zhTW:
      '你是探險家——那個第一天就消失在礦洞裡，遊戲內三天後才帶著滿滿一包銅礦、鐵礦和莫名其妙的大量紫蘑菇重新出現的人。你不一定知道現在是什麼季節，或者距離冬天還有多少天。但你持續提供著讓其他一切成為可能的礦石流水線——熔爐、灑水器、木桶。沒有你，農場會停滯不前。你是引擎室。',
    desc_ja:
      'あなたは探検家——初日に鉱山に消えて、ゲーム内3日後に銅、鉄、そしてなぜか大量の紫キノコを持って戻ってくる人。今が何の季節か、冬まであと何日かをちゃんと把握していないこともある。でも農場を機能させる鉱石パイプライン——かまど、スプリンクラー、たる——を絶えず届けているのはあなただ。あなたなしでは農場は止まってしまう。あなたはエンジンルームそのもの。',
    desc_ko:
      '당신은 탐험가예요 — 첫날부터 광산에 사라져서 게임 내 3일 후에 구리, 철, 그리고 어쩐지 엄청난 양의 보라색 버섯을 잔뜩 들고 나타나는 사람이죠. 지금이 무슨 계절인지, 겨울까지 며칠이 남았는지 잘 모를 수도 있어요. 하지만 농장이 돌아가는 데 필요한 광석 파이프라인 — 용광로, 스프링클러, 통 — 을 끊임없이 공급하는 건 당신입니다. 당신이 없으면 농장은 멈춰버려요. 당신이 엔진실이에요.',
    desc_de:
      'Du bist Der Entdecker — derjenige, der am ersten Tag in der Mine verschwindet und drei Spieltage später mit einem Beutel voller Kupfer, Eisen und einer unerklärlichen Menge lila Pilze wieder auftaucht. Du weißt nicht immer, welche Jahreszeit es ist oder wie viele Tage es noch bis zum Winter sind. Aber du lieferst kontinuierlich die Erzpipeline, die alles andere erst möglich macht — die Öfen, die Sprinkler, die Fässer. Ohne dich kommt die Farm zum Stillstand. Du bist der Maschinenraum.',
    strength_en: 'Ore supply, combat progression, and bringing back rare items that unlock late-game content',
    strength_zh: '矿石供应、战斗进度、带回解锁后期内容的稀有道具',
    strength_zhTW: '礦石供應、戰鬥進度、帶回解鎖後期內容的稀有道具',
    strength_ja: '鉱石の供給、戦闘の進行、後半コンテンツを解放するレアアイテムを持ち帰ること',
    strength_ko: '광석 공급, 전투 진행, 후반 콘텐츠를 여는 희귀 아이템 가져오기',
    strength_de: 'Erzversorgung, Kampffortschritt und seltene Gegenstände mitbringen, die Spätspiel-Inhalte freischalten',
    blind_spot_en: "Remember to check the shared calendar occasionally — Winter is coming and you will need crops planted before then",
    blind_spot_zh: '记得偶尔看一眼共享日历——冬天要来了，你需要在那之前种好作物',
    blind_spot_zhTW: '記得偶爾看一眼共享日曆——冬天要來了，你需要在那之前種好作物',
    blind_spot_ja: '共有カレンダーをたまに確認して——冬が来るし、その前に作物を植えないといけない',
    blind_spot_ko: '공유 캘린더를 가끔 확인하세요 — 겨울이 오고 있고, 그 전에 작물을 심어야 합니다',
    blind_spot_de: 'Denk daran, gelegentlich in den gemeinsamen Kalender zu schauen — Winter kommt und du brauchst Pflanzen davor',
    tip_en: "Keep a stack of energy food in your personal inventory at all times. You will forget to check the shared chest and run out of energy in the mines — this has happened before.",
    tip_zh: '在个人背包里随时准备一叠回复体力的食物。你会忘记查共享箱然后在矿洞里体力耗尽——这种事以前发生过。',
    tip_zhTW: '在個人背包裡隨時準備一疊回復體力的食物。你會忘記查共享箱然後在礦洞裡體力耗盡——這種事以前發生過。',
    tip_ja: '個人インベントリには常にスタミナ回復食料を積んでおこう。共有チェストを確認し忘れて鉱山でスタミナ切れになる——これ、前にあったから。',
    tip_ko: '개인 인벤토리에는 항상 체력 회복 음식을 쟁여두세요. 공유 상자 확인을 잊고 광산에서 체력이 바닥날 수 있어요 — 전에도 있었던 일이에요.',
    tip_de: 'Halte immer einen Stapel Energienahrung in deinem persönlichen Inventar. Du wirst vergessen, die gemeinsame Truhe zu checken und in der Mine keine Energie haben — das ist schon passiert.',
  },
  planner: {
    title_en: 'The Planner',
    title_zh: '规划师',
    title_zhTW: '規劃師',
    title_ja: 'プランナー',
    title_ko: '플래너',
    title_de: 'Der Planer',
    emoji: '📋',
    tag_en: 'The one with the spreadsheet',
    tag_zh: '那个有表格的人',
    tag_zhTW: '那個有試算表的人',
    tag_ja: 'スプレッドシートを持つ人',
    tag_ko: '스프레드시트가 있는 사람',
    tag_de: 'Derjenige mit der Tabelle',
    desc_en:
      "You are The Planner — the one who has calculated the exact optimal crop rotation, knows what profit margin the artisan goods path yields versus the tiller profession, and has a shared document with everyone's assigned tasks for the week. You provide something irreplaceable: a coherent strategy. Without you, the farm sprawls in random directions. With you, the team knows exactly where they are going and why. Your co-op partners sometimes push back on the plans — but they follow them anyway, because the plans work.",
    desc_zh:
      '你是规划师——那个计算了精确最优作物轮换方案、知道工匠品路线比耕作者职业收益高多少、还有一份共享文档列出大家本周任务分工的人。你提供了不可替代的东西：一个连贯的策略。没有你，农场会向各种随机方向蔓延。有你，团队清楚地知道自己的目标和原因。你的联机伙伴有时会对计划提出异议——但他们还是会照做，因为计划确实有效。',
    desc_zhTW:
      '你是規劃師——那個計算了精確最優作物輪換方案、知道工匠品路線比耕作者職業收益高多少、還有一份共享文檔列出大家本週任務分工的人。你提供了不可替代的東西：一個連貫的策略。沒有你，農場會向各種隨機方向蔓延。有你，團隊清楚地知道自己的目標和原因。你的聯機夥伴有時會對計劃提出異議——但他們還是會照做，因為計劃確實有效。',
    desc_ja:
      'あなたはプランナー——最適な作物ローテーションを正確に計算して、農人職業と職人品ルートの利益差を把握して、今週のタスクを全員分まとめた共有ドキュメントを持っている人。あなたが提供するのはほかに代えられないもの：一貫した戦略。あなたがいなければ農場はバラバラな方向に広がっていく。あなたがいれば、チームはどこへ向かっていて、なぜそうなのかをはっきり理解できる。チームメンバーは計画に異議を唱えることもあるけど、結局は従う——計画が機能するから。',
    desc_ko:
      '당신은 플래너예요 — 최적의 작물 로테이션을 정확히 계산하고, 장인 직업 루트가 경작자 직업보다 수익이 얼마나 높은지 알고 있으며, 이번 주 할 일을 모두의 분량으로 나눠 담은 공유 문서가 있는 사람이죠. 당신이 제공하는 건 대체 불가한 것: 일관된 전략이에요. 당신이 없으면 농장은 제각각의 방향으로 뻗어나갑니다. 당신이 있으면 팀은 목표가 무엇인지, 왜 그런지 명확히 알게 됩니다. 같이 하는 친구들이 계획에 이의를 제기할 때도 있지만 — 결국 따릅니다. 계획이 실제로 효과가 있으니까요.',
    desc_de:
      'Du bist Der Planer — derjenige, der die exakte optimale Fruchtfolge berechnet hat, weiß, welchen Gewinnunterschied der Handwerksweg gegenüber dem Bauer-Beruf bringt, und ein gemeinsames Dokument mit den Aufgaben aller für die Woche hat. Du lieferst etwas Unersetzliches: eine kohärente Strategie. Ohne dich wächst die Farm in zufällige Richtungen. Mit dir weiß das Team genau, wo es hingeht und warum. Deine Koop-Partner widersprechen den Plänen manchmal — aber sie halten sich trotzdem daran, weil die Pläne funktionieren.',
    strength_en: 'Optimal resource allocation, season planning, and unlocking late-game content faster than anyone expects',
    strength_zh: '最优资源分配、季节规划、以超出所有人预期的速度解锁后期内容',
    strength_zhTW: '最優資源分配、季節規劃、以超出所有人預期的速度解鎖後期內容',
    strength_ja: '最適なリソース配分、シーズン計画、誰もが予想するより早く後半コンテンツを解放すること',
    strength_ko: '최적 자원 배분, 시즌 계획, 모두의 예상을 뛰어넘는 속도로 후반 콘텐츠 해금',
    strength_de: 'Optimale Ressourcenverteilung, Saisonplanung und Spätspiel-Inhalte schneller freischalten als alle erwarten',
    blind_spot_en: "Not everyone plays as efficiently as you — build in some flexibility and let people have fun their way too",
    blind_spot_zh: '不是每个人都像你一样追求效率——留一些弹性，让大家也能按自己的方式享乐',
    blind_spot_zhTW: '不是每個人都像你一樣追求效率——留一些彈性，讓大家也能按自己的方式享樂',
    blind_spot_ja: '誰もがあなたほど効率を求めているわけじゃない——余裕を作って、みんなが自分のやり方で楽しめるようにしてあげて',
    blind_spot_ko: '모두가 당신처럼 효율을 추구하지는 않아요 — 여유를 좀 남겨두고, 다들 자기 방식대로 즐길 수 있게 해주세요',
    blind_spot_de: 'Nicht alle spielen so effizient wie du — baue etwas Flexibilität ein und lass die Leute auch auf ihre Weise Spaß haben',
    tip_en: "Share your plan doc at the start of the session, but make it a living document — the best Stardew runs adapt to what actually happens.",
    tip_zh: '每次游戏开始时分享你的计划文档，但把它当成可更新的活文件——最好的星露谷游戏体验都会根据实际发生的事情灵活调整。',
    tip_zhTW: '每次遊戲開始時分享你的計劃文檔，但把它當成可更新的活文件——最好的星露谷遊戲體驗都會根據實際發生的事情靈活調整。',
    tip_ja: 'セッション開始時に計画ドキュメントをシェアしよう。でも生きたドキュメントとして扱って——最高のスターデューバレー体験は実際に起きることに合わせて柔軟に変わっていくから。',
    tip_ko: '세션 시작 때 계획 문서를 공유하되, 살아있는 문서로 다루세요 — 최고의 스타듀 밸리 경험은 실제로 일어나는 일에 맞춰 유연하게 바뀝니다.',
    tip_de: 'Teile dein Plandokument zu Beginn der Sitzung, aber behandle es als lebendiges Dokument — die besten Stardew-Runs passen sich daran an, was wirklich passiert.',
  },
}

function calcResult(answers: Role[]): Role {
  const counts: Record<Role, number> = { provider: 0, builder: 0, explorer: 0, planner: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Role
}

export function StardewMultiplayerQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'
  const [answers, setAnswers] = useState<(Role | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Role[])]
    const url = `${BASE_URL}/${locale}/quizzes/stardew-multiplayer`
    const shareText = getLoc(
      `在星露谷联机里我是「${result.title_zh}」！你的队友是哪种类型？一起测测：${url}`,
      `I'm "${result.title_en}" in Stardew Valley co-op! What's your partner type? Find out: ${url}`,
      `在星露谷聯機裡我是「${result.title_zhTW}」！你的隊友是哪種類型？一起測測：${url}`,
      `スターデューバレーのマルチプレイで私は「${result.title_ja}」！あなたのタイプは？チェックして：${url}`,
      `스타듀 밸리 멀티에서 저는 "${result.title_ko}"예요! 당신은 어떤 타입인가요? 확인해 보세요: ${url}`,
      `Ich bin "${result.title_de}" im Stardew-Valley-Koop! Was bist du? Mach den Test: ${url}`
    )

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {getLoc(result.tag_zh, result.tag_en, result.tag_zhTW, result.tag_ja, result.tag_ko, result.tag_de)}
          </p>
          <h2 className="mb-3 text-2xl font-bold text-[#f0a832]">
            {getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}
          </h2>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
        </p>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <div className="mb-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {getLoc('你的优势', 'Your strength', '你的優勢', 'あなたの強み', '당신의 강점', 'Deine Stärke')}
            </p>
            <p className="text-sm text-[#8a9a7a]">
              {getLoc(result.strength_zh, result.strength_en, result.strength_zhTW, result.strength_ja, result.strength_ko, result.strength_de)}
            </p>
          </div>
          <div className="mb-3 border-t border-[#2d3d2d] pt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {getLoc('盲点提醒', 'Watch out for', '盲點提醒', '気をつけること', '주의할 점', 'Achtung')}
            </p>
            <p className="text-sm text-[#8a9a7a]">
              {getLoc(result.blind_spot_zh, result.blind_spot_en, result.blind_spot_zhTW, result.blind_spot_ja, result.blind_spot_ko, result.blind_spot_de)}
            </p>
          </div>
          <div className="border-t border-[#2d3d2d] pt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {getLoc('给你的联机小贴士', 'Co-op tip for your type', '給你的聯機小貼士', 'あなたのタイプ向けマルチのコツ', '당신 유형을 위한 멀티 팁', 'Koop-Tipp für deinen Typ')}
            </p>
            <p className="text-sm text-[#8a9a7a]">
              {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
            </p>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把 Cozy 游戏的季节感带入你的真实生活节奏。',
              'TendFarm is building a farm rhythm tracker — bringing the seasonal feeling of cozy games into real life.',
              'TendFarm 正在研發農場節律追蹤功能——把 Cozy 遊戲的季節感帶入你的真實生活節奏。',
              'TendFarm はファームリズムトラッカーを開発中です——コージーゲームの季節感をリアルな生活リズムに。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 코지 게임의 계절감을 실제 생활 리듬으로.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — das saisonale Gefühl von Cozy Games ins echte Leben bringen.'
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
            '在星露谷联机模式里，你是哪种队友？',
            'What Kind of Stardew Valley Co-op Partner Are You?',
            '在星露谷聯機模式裡，你是哪種隊友？',
            'スターデューバレーのマルチプレイで、あなたはどんなメンバー？',
            '스타듀 밸리 멀티플레이에서 당신은 어떤 팀원인가요?',
            'Was für ein Stardew-Valley-Koop-Partner bist du?'
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个场景题，测出你是补给官、建造师、探险家还是规划师——发给你的队友对号入座',
            '6 scenario questions — find your co-op role and tag your partner to compare',
            '6 個場景題，測出你是補給官、建造師、探險家還是規劃師——發給你的隊友對號入座',
            '6つのシナリオ問題——マルチプレイでの自分の役割を探して、相手と比べてみよう',
            '6가지 시나리오 문제 — 내 멀티 역할을 찾고 친구와 비교해 보세요',
            '6 Szenario-Fragen — finde deine Koop-Rolle und vergleiche sie mit deinem Partner'
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
        {getLoc('查看我的联机角色', 'Find My Co-op Role', '查看我的聯機角色', 'マルチでの自分の役割を見る', '내 멀티 역할 확인하기', 'Meine Koop-Rolle finden')}
      </button>
    </div>
  )
}
