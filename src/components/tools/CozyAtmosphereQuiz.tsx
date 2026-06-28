'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'coffee-talk' | 'season-letter' | 'sakuna' | 'garden-story'

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
    q_en: 'What kind of setting do you want to be in right now?',
    q_zh: '你现在想置身于什么样的环境？',
    q_zhTW: '你現在想置身於什麼樣的環境？',
    q_ja: '今、どんな場所にいたいですか？',
    q_ko: '지금 어떤 환경에 있고 싶으신가요?',
    q_de: 'In welcher Umgebung möchtest du gerade sein?',
    options: [
      {
        en: 'A warm café on a rainy night — strangers coming in, quiet jazz, the smell of coffee',
        zh: '雨夜里温暖的咖啡馆——陌生人进进出出，安静的爵士乐，咖啡的香气',
        zhTW: '雨夜裡溫暖的咖啡館——陌生人進進出出，安靜的爵士樂，咖啡的香氣',
        ja: '雨の夜の温かいカフェ——見知らぬ人が出入りし、静かなジャズが流れ、コーヒーの香りがする',
        ko: '비 오는 밤의 따뜻한 카페——낯선 사람들이 드나들고, 잔잔한 재즈가 흐르며, 커피 향이 가득한',
        de: 'Ein warmes Café in der Regennacht — Fremde kommen und gehen, leiser Jazz, Kaffeeduft',
        type: 'coffee-talk',
      },
      {
        en: 'The open road in golden light — moving through a world that is slipping away, recording it',
        zh: '金光中的开阔道路——穿越一个正在逝去的世界，记录它',
        zhTW: '金光中的開闊道路——穿越一個正在逝去的世界，記錄它',
        ja: '黄金色の光の中に広がる道——消えゆく世界を旅しながら記録する',
        ko: '황금빛 속의 탁 트인 도로——사라져가는 세계를 지나며 기록하는',
        de: 'Die offene Straße im goldenen Licht — durch eine Welt reisen, die verblasst, und sie festhalten',
        type: 'season-letter',
      },
      {
        en: 'A Japanese river valley with terraced rice paddies — the sound of water, seasonal mist',
        zh: '日本河谷与梯田——水流声，季节性的薄雾',
        zhTW: '日本河谷與梯田——水流聲，季節性的薄霧',
        ja: '日本の渓谷と棚田——水の音、季節の霧',
        ko: '일본 계곡과 계단식 논——물소리, 계절의 안개',
        de: 'Ein japanisches Flusstal mit Reisterrassen — das Rauschen des Wassers, saisonaler Nebel',
        type: 'sakuna',
      },
      {
        en: 'A small island community garden in bloom — caring for plants, knowing every neighbor',
        zh: '繁花盛开的小岛社区花园——照料植物，认识每一位邻居',
        zhTW: '繁花盛開的小島社區花園——照料植物，認識每一位鄰居',
        ja: '花咲く島のコミュニティガーデン——植物を世話し、すべての隣人を知っている',
        ko: '꽃이 만발한 작은 섬 공동체 정원——식물을 가꾸고, 모든 이웃을 알아가는',
        de: 'Ein blühender Gemeinschaftsgarten auf einer kleinen Insel — Pflanzen pflegen, jeden Nachbarn kennen',
        type: 'garden-story',
      },
    ],
  },
  {
    q_en: 'Which of these sounds most soothing to you right now?',
    q_zh: '以下哪个声音现在对你最有抚慰效果？',
    q_zhTW: '以下哪個聲音現在對你最有撫慰效果？',
    q_ja: '今、どの音が最も心を落ち着かせますか？',
    q_ko: '지금 어떤 소리가 가장 위로가 되시나요?',
    q_de: 'Welches dieser Geräusche beruhigt dich gerade am meisten?',
    options: [
      {
        en: 'Rain on a window, low murmur of voices, coffee being poured',
        zh: '雨水打在窗户上，低沉的人声，咖啡倒入杯中',
        zhTW: '雨水打在窗戶上，低沉的人聲，咖啡倒入杯中',
        ja: '窓に当たる雨音、低いざわめき、コーヒーを注ぐ音',
        ko: '창문에 떨어지는 빗소리, 낮은 대화 소리, 커피가 따라지는 소리',
        de: 'Regen an einem Fenster, das leise Gemurmel von Stimmen, das Einschenken von Kaffee',
        type: 'coffee-talk',
      },
      {
        en: 'Wind through tall grass, the creak of a bicycle, distant bells',
        zh: '风穿过高草，自行车的吱呀声，远处的铃声',
        zhTW: '風穿過高草，自行車的吱呀聲，遠處的鈴聲',
        ja: '背の高い草を吹き抜ける風、自転車のきしむ音、遠くの鐘の音',
        ko: '키 큰 풀을 스치는 바람, 자전거 삐걱거리는 소리, 멀리서 들리는 종소리',
        de: 'Wind durch hohes Gras, das Knarzen eines Fahrrads, ferne Glocken',
        type: 'season-letter',
      },
      {
        en: 'The rhythm of harvesting — the swish of a scythe, water in a paddy, birds at dusk',
        zh: '收割的节奏——镰刀的挥动声，稻田中的水声，黄昏时的鸟鸣',
        zhTW: '收割的節奏——鐮刀的揮動聲，稻田中的水聲，黃昏時的鳥鳴',
        ja: '収穫のリズム——鎌を振る音、田んぼの水音、夕暮れ時の鳥の声',
        ko: '수확의 리듬——낫 휘두르는 소리, 논의 물소리, 해질녘 새 소리',
        de: 'Der Rhythmus der Ernte — das Schwingen einer Sense, Wasser im Reisfeld, Vögel in der Abenddämmerung',
        type: 'sakuna',
      },
      {
        en: 'Soil being turned, leaves rustling, a community cooking something together outside',
        zh: '翻土声，树叶沙沙，社区里大家一起在外面烹饪的声音',
        zhTW: '翻土聲，樹葉沙沙，社區裡大家一起在外面烹飪的聲音',
        ja: '土を掘り起こす音、葉のざわめき、外でみんなが一緒に料理している音',
        ko: '흙 뒤집는 소리, 나뭇잎 바스락거리는 소리, 마을 사람들이 함께 야외에서 요리하는 소리',
        de: 'Das Umgraben der Erde, raschelnde Blätter, eine Gemeinschaft, die draußen gemeinsam kocht',
        type: 'garden-story',
      },
    ],
  },
  {
    q_en: 'What emotional tone do you want your game to carry?',
    q_zh: '你希望你的游戏带有什么情感基调？',
    q_zhTW: '你希望你的遊戲帶有什麼情感基調？',
    q_ja: 'ゲームにどんな感情的なトーンを求めますか？',
    q_ko: '게임이 어떤 감정적 분위기를 담았으면 하시나요?',
    q_de: 'Welchen emotionalen Ton soll dein Spiel haben?',
    options: [
      {
        en: 'Warmly melancholic — characters carrying real weight, finding small moments of connection at night',
        zh: '温暖的忧郁——角色承载着真实的重量，在夜晚找到小小的连接时刻',
        zhTW: '溫暖的憂鬱——角色承載著真實的重量，在夜晚找到小小的連接時刻',
        ja: '温かく哀愁がある——キャラクターがリアルな重さを抱え、夜に小さなつながりの瞬間を見つける',
        ko: '따뜻하고 우수에 찬——캐릭터들이 진짜 무게를 짊어지고, 밤에 작은 연결의 순간을 찾는',
        de: 'Wärmend-melancholisch — Charaktere mit echtem Gewicht, die in der Nacht kleine Momente der Verbindung finden',
        type: 'coffee-talk',
      },
      {
        en: 'Bittersweet and contemplative — the beauty of things precisely because they are ending',
        zh: '苦甜参半、沉思性的——事物正因为即将结束而显出美丽',
        zhTW: '苦甜參半、沉思性的——事物正因為即將結束而顯出美麗',
        ja: 'ほろ苦く、物思いにふける——終わりゆくからこそ美しいもの',
        ko: '달콤씁쓸하고 사색적인——끝나가기에 더 아름다운 것들',
        de: 'Bittersüß und nachdenklich — die Schönheit der Dinge liegt gerade darin, dass sie enden',
        type: 'season-letter',
      },
      {
        en: 'Earthy and grounded — the satisfaction of working in rhythm with the land and seasons',
        zh: '接地气、踏实——与土地和季节同频劳作的满足感',
        zhTW: '接地氣、踏實——與土地和季節同頻勞作的滿足感',
        ja: '地に足がついた、踏み実感のある——土地と季節のリズムに合わせて働く満足感',
        ko: '현실적이고 충실한——땅과 계절의 리듬에 맞춰 일하는 만족감',
        de: 'Geerdet und bodenständig — die Befriedigung, im Rhythmus des Landes und der Jahreszeiten zu arbeiten',
        type: 'sakuna',
      },
      {
        en: 'Gentle and hopeful — small acts of care adding up to a community coming back to life',
        zh: '温和而充满希望——小小的关怀积累成社区重焕生机',
        zhTW: '溫和而充滿希望——小小的關懷積累成社區重煥生機',
        ja: '穏やかで希望に満ちた——小さなケアが積み重なってコミュニティが生き返る',
        ko: '온화하고 희망찬——작은 돌봄이 쌓여 마을이 다시 생기를 찾아가는',
        de: 'Sanft und voller Hoffnung — kleine Gesten der Fürsorge, die eine Gemeinschaft wieder zum Leben erwecken',
        type: 'garden-story',
      },
    ],
  },
  {
    q_en: 'What kind of weather is outside right now (or do you wish it was)?',
    q_zh: '你现在外面是什么天气（或者你希望是什么天气）？',
    q_zhTW: '你現在外面是什麼天氣（或者你希望是什麼天氣）？',
    q_ja: '今外はどんな天気ですか（またはどんな天気であってほしいですか）？',
    q_ko: '지금 밖의 날씨는 어떤가요 (또는 어떤 날씨였으면 하시나요)?',
    q_de: 'Welches Wetter ist gerade draußen (oder welches wünschst du dir)?',
    options: [
      {
        en: 'Raining — steady, grey, the kind that makes inside feel extra safe',
        zh: '下雨——绵绵细雨，灰蒙蒙的，那种让室内格外安全的雨',
        zhTW: '下雨——綿綿細雨，灰濛濛的，那種讓室內格外安全的雨',
        ja: '雨——しとしとと降り続く、曇り空、室内がとても安全に感じる雨',
        ko: '비——꾸준하고 잿빛, 실내가 유독 안락하게 느껴지는 그런 비',
        de: 'Regen — gleichmäßig, grau, die Art, die das Drinnen besonders sicher erscheinen lässt',
        type: 'coffee-talk',
      },
      {
        en: 'The last warm days of autumn — light is golden and thin, you know it will not last',
        zh: '秋天最后几个温暖的日子——光线金黄而稀薄，你知道这不会持续',
        zhTW: '秋天最後幾個溫暖的日子——光線金黃而稀薄，你知道這不會持續',
        ja: '秋の最後の暖かい日々——光は金色で薄く、これは続かないとわかっている',
        ko: '가을의 마지막 따뜻한 날들——빛이 금빛으로 가늘고, 오래가지 않을 것을 알고 있는',
        de: 'Die letzten warmen Herbsttage — das Licht ist golden und dünn, du weißt, es wird nicht anhalten',
        type: 'season-letter',
      },
      {
        en: 'Misty and cool — early morning mountain air, dew on everything, a chill that feels right',
        zh: '薄雾弥漫、凉意十足——清晨的山间空气，万物都挂着露水，恰到好处的凉意',
        zhTW: '薄霧瀰漫、涼意十足——清晨的山間空氣，萬物都掛著露水，恰到好處的涼意',
        ja: '霧がかかり涼しい——早朝の山の空気、すべてに露が降り、心地よい肌寒さ',
        ko: '안개가 자욱하고 서늘한——이른 아침의 산 공기, 모든 것에 이슬이 맺히고, 딱 맞는 서늘함',
        de: 'Dunstig und kühl — frühmorgendliche Bergluft, Tau auf allem, eine Kälte, die sich richtig anfühlt',
        type: 'sakuna',
      },
      {
        en: 'Clear spring morning — everything is about to grow, the soil smells alive',
        zh: '晴朗的春日清晨——一切即将生长，泥土散发着生机的气息',
        zhTW: '晴朗的春日清晨——一切即將生長，泥土散發著生機的氣息',
        ja: '晴れた春の朝——すべてが芽吹こうとしており、土が生きている香りを放っている',
        ko: '맑은 봄 아침——모든 것이 막 자라려 하고, 흙이 생기 있는 냄새를 풍기는',
        de: 'Ein klarer Frühlingsmorgen — alles steht kurz vor dem Wachsen, die Erde riecht lebendig',
        type: 'garden-story',
      },
    ],
  },
  {
    q_en: 'How long do you want each game session to feel?',
    q_zh: '你希望每次游戏时段持续多久？',
    q_zhTW: '你希望每次遊戲時段持續多久？',
    q_ja: 'ゲームの1セッションはどのくらいの長さがいいですか？',
    q_ko: '게임 세션을 얼마나 오래 하고 싶으신가요?',
    q_de: 'Wie lang soll sich jede Spielsession anfühlen?',
    options: [
      {
        en: '60-90 minutes — I want to work a full shift at the café, see who comes in tonight',
        zh: '60-90 分钟——我想完整上一个班，看看今晚谁会来',
        zhTW: '60-90 分鐘——我想完整上一個班，看看今晚誰會來',
        ja: '60〜90分——カフェでフルシフトをこなし、今夜誰が来るか見届けたい',
        ko: '60-90분——카페에서 풀 근무를 하고, 오늘 밤 누가 올지 보고 싶어',
        de: '60-90 Minuten — ich will eine volle Schicht im Café arbeiten und sehen, wer heute Abend hereinkommt',
        type: 'coffee-talk',
      },
      {
        en: '20-40 minutes — a ride through one region, one day documented, a gentle arc',
        zh: '20-40 分钟——骑过一个地区，记录一天，一段温和的弧线',
        zhTW: '20-40 分鐘——騎過一個地區，記錄一天，一段溫和的弧線',
        ja: '20〜40分——一つの地域を走り抜け、一日を記録し、穏やかな弧を描く',
        ko: '20-40분——한 지역을 지나가고, 하루를 기록하고, 부드러운 곡선을 그리는',
        de: '20-40 Minuten — durch eine Region fahren, einen Tag dokumentieren, ein sanfter Bogen',
        type: 'season-letter',
      },
      {
        en: 'A full in-game day — plant in the morning, tend at noon, harvest at dusk, process at night',
        zh: '完整的游戏内一天——早上种植、中午照料、黄昏收割、夜里加工',
        zhTW: '完整的遊戲內一天——早上種植、中午照料、黃昏收割、夜裡加工',
        ja: 'ゲーム内まる一日——朝に植え、昼に世話をし、夕暮れに収穫し、夜に加工する',
        ko: '게임 내 하루 전체——아침에 심고, 낮에 가꾸고, 황혼에 수확하고, 밤에 가공하는',
        de: 'Ein ganzer In-Game-Tag — morgens pflanzen, mittags pflegen, bei Sonnenuntergang ernten, nachts verarbeiten',
        type: 'sakuna',
      },
      {
        en: 'As long as it takes — until the section of garden feels right and alive again',
        zh: '需要多久就多久——直到这片花园区域感觉正确并重新充满生机',
        zhTW: '需要多久就多久——直到這片花園區域感覺正確並重新充滿生機',
        ja: 'かかるだけかかる——庭のその区画が正しく、また生き生きとするまで',
        ko: '필요한 만큼——정원의 그 구역이 올바르게 다시 생기를 찾을 때까지',
        de: 'So lange es braucht — bis sich der Gartenabschnitt richtig anfühlt und wieder lebt',
        type: 'garden-story',
      },
    ],
  },
  {
    q_en: 'What do you most need from a game right now?',
    q_zh: '你现在最需要从游戏中得到什么？',
    q_zhTW: '你現在最需要從遊戲中得到什麼？',
    q_ja: '今、ゲームに最も求めているものは何ですか？',
    q_ko: '지금 게임에서 가장 필요한 것은 무엇인가요?',
    q_de: 'Was brauchst du gerade am meisten von einem Spiel?',
    options: [
      {
        en: 'To be in a world that feels lived-in and human, even if the humans are elves and werewolves',
        zh: '置身于一个感觉真实、充满人情味的世界，即使那些"人"是精灵和狼人',
        zhTW: '置身於一個感覺真實、充滿人情味的世界，即使那些「人」是精靈和狼人',
        ja: '生き生きとした人間味あふれる世界に身を置くこと——たとえその「人」がエルフや狼人間でも',
        ko: '인간적이고 살아있는 세계에 있는 것——비록 그 "사람들"이 엘프와 늑대인간이어도',
        de: 'In einer Welt zu sein, die belebt und menschlich wirkt — auch wenn die Menschen Elfen und Werwölfe sind',
        type: 'coffee-talk',
      },
      {
        en: 'A reason to pay attention to beauty — a structured way of noticing what is worth remembering',
        zh: '一个关注美好的理由——一种有结构的方式来注意什么值得铭记',
        zhTW: '一個關注美好的理由——一種有結構的方式來注意什麼值得銘記',
        ja: '美しさに目を向ける理由——何が記憶に値するかを構造的に気づく方法',
        ko: '아름다움에 주목할 이유——무엇이 기억할 가치가 있는지를 구조적으로 알아채는 방법',
        de: 'Einen Grund, auf Schönheit zu achten — eine strukturierte Art, wahrzunehmen, was es wert ist, erinnert zu werden',
        type: 'season-letter',
      },
      {
        en: 'The discipline of a seasonal rhythm — something that asks me to show up, day after day',
        zh: '季节节律的纪律感——一种每天都要求我出现的事物',
        zhTW: '季節節律的紀律感——一種每天都要求我出現的事物',
        ja: '季節のリズムという規律——毎日顔を出すことを求めてくるもの',
        ko: '계절 리듬의 규율감——매일 내가 나타나도록 요구하는 무언가',
        de: 'Die Disziplin eines saisonalen Rhythmus — etwas, das verlangt, dass ich Tag für Tag auftauche',
        type: 'sakuna',
      },
      {
        en: 'To feel useful in a gentle way — caring for something, seeing it respond',
        zh: '以一种温和的方式感到有用——照料某样东西，看着它回应',
        zhTW: '以一種溫和的方式感到有用——照料某樣東西，看著它回應',
        ja: '穏やかな方法で役立つと感じること——何かを世話して、それが応えてくれるのを見ること',
        ko: '부드러운 방식으로 유용함을 느끼는 것——무언가를 돌보고, 그것이 반응하는 것을 보는 것',
        de: 'Sich auf sanfte Weise nützlich zu fühlen — etwas pflegen und sehen, wie es reagiert',
        type: 'garden-story',
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
  'coffee-talk': {
    title_en: 'Coffee Talk',
    title_zh: 'Coffee Talk',
    title_zhTW: 'Coffee Talk',
    title_ja: 'Coffee Talk',
    title_ko: 'Coffee Talk',
    title_de: 'Coffee Talk',
    emoji: '☕',
    tag_en: 'A rainy-night café sim where you make drinks for lonely elves, werewolves, and aliens',
    tag_zh: '雨夜咖啡馆模拟——为孤独的精灵、狼人和外星人制作饮料',
    tag_zhTW: '雨夜咖啡館模擬——為孤獨的精靈、狼人和外星人製作飲料',
    tag_ja: '雨の夜のカフェシム——孤独なエルフ、狼人間、宇宙人のためにドリンクを作る',
    tag_ko: '비 오는 밤 카페 시뮬레이터——외로운 엘프, 늑대인간, 외계인을 위한 음료 제조',
    tag_de: 'Ein Regennacht-Café-Sim, in dem du Drinks für einsame Elfen, Werwölfe und Aliens mixt',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox, iOS, Android — about $13. Coffee Talk Episode 2 also available.',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox、iOS、Android——约 13 美元。Coffee Talk 第 2 集也已发布。',
    platform_zhTW: '平台：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox、iOS、Android——約 13 美元。Coffee Talk 第 2 集也已發布。',
    platform_ja: 'プレイ可能：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox、iOS、Android——約 13ドル。Coffee Talk エピソード2も配信中。',
    platform_ko: '플랫폼: PC(Steam), Nintendo Switch, PlayStation 4/5, Xbox, iOS, Android — 약 13달러. Coffee Talk 에피소드 2도 출시되어 있습니다.',
    platform_de: 'Erhältlich für: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox, iOS, Android — ca. 13 €. Coffee Talk Episode 2 ist ebenfalls verfügbar.',
    why_en:
      "Coffee Talk is a visual novel barista simulator set in a rainy, modern-fantasy Seattle where humans live alongside elves, orcs, mermaids, and werewolves. You play as the owner of a late-night coffee shop — the only one still open after midnight. Customers come in one by one and you listen to their stories while making them drinks according to their requests. The drink-making is simple (select ingredients in order) but the stories are genuinely thoughtful: a succubus who works at a tech company, an elf dealing with her parents disapproving of her orc boyfriend, a writer with a deadline and a broken heart. The art is lo-fi pixel with a warm amber glow and it plays like reading a very good short story collection. Coffee Talk Episode 2 continues the world with new characters. A perfect game for a rainy evening when you want to be in a warm place and hear quiet, human (and non-human) stories.",
    why_zh:
      'Coffee Talk 是一款视觉小说咖啡馆模拟器，设定在一个雨夜的现代奇幻西雅图，人类与精灵、兽人、美人鱼和狼人共同生活。你扮演一家深夜咖啡馆的老板——午夜后唯一还开着的咖啡馆。顾客一个接一个进来，你在按照他们的要求制作饮料的同时聆听他们的故事。制作饮料很简单（按顺序选择食材），但故事却真实而有思想：一个在科技公司工作的魅魔，一个处理父母不赞同她和兽人男友的精灵，一个有截止日期和心碎的作家。美术风格是低保真像素画，有温暖的琥珀色调，玩起来像在阅读一部非常好的短篇故事集。Coffee Talk 第 2 集以新角色延续了这个世界。一款完美的雨夜游戏，当你想置身于一个温暖的地方，听一些安静的、人情味十足的（以及非人类的）故事时。',
    why_zhTW:
      'Coffee Talk 是一款視覺小說咖啡館模擬器，設定在一個雨夜的現代奇幻西雅圖，人類與精靈、獸人、美人魚和狼人共同生活。你扮演一家深夜咖啡館的老闆——午夜後唯一還開著的咖啡館。顧客一個接一個進來，你在按照他們的要求製作飲料的同時聆聽他們的故事。製作飲料很簡單（按順序選擇食材），但故事卻真實而有思想：一個在科技公司工作的魅魔，一個處理父母不贊同她和獸人男友的精靈，一個有截止日期和心碎的作家。美術風格是低保真像素畫，有溫暖的琥珀色調，玩起來像在閱讀一部非常好的短篇故事集。Coffee Talk 第 2 集以新角色延續了這個世界。一款完美的雨夜遊戲，當你想置身於一個溫暖的地方，聽一些安靜的、人情味十足的（以及非人類的）故事時。',
    why_ja:
      'Coffee Talk は、雨降る現代ファンタジーのシアトルを舞台にしたビジュアルノベル兼バリスタシミュレーターです。人間とエルフ、オーク、マーメイド、狼人間が共に暮らす世界で、深夜のコーヒーショップ——深夜0時を過ぎても唯一開いているお店——のオーナーとしてプレイします。お客が一人ずつやってきて、リクエスト通りのドリンクを作りながら彼らの話に耳を傾けます。ドリンク作りはシンプルですが（材料を順番に選ぶだけ）、ストーリーは本当に考えさせられます——IT企業で働くサキュバス、両親がオークの彼氏を認めないことに悩むエルフ、締め切りと失恋を抱えたライター。アートスタイルはローファイピクセルで温かみのある琥珀色。まるで素晴らしい短編小説集を読むような体験です。Coffee Talk エピソード2では新キャラクターが登場し、世界観が広がっています。雨の夜に温かい場所でひっそりとした人間的な（そして人外の）物語を聞きたいときにぴったりのゲームです。',
    why_ko:
      'Coffee Talk는 비 내리는 현대 판타지 시애틀을 배경으로 한 비주얼 노벨 바리스타 시뮬레이터입니다. 인간과 엘프, 오크, 인어, 늑대인간이 함께 사는 세계에서 심야 커피숍——자정 이후에도 유일하게 문을 여는 가게——의 주인으로 플레이합니다. 손님들이 한 명씩 들어오고, 그들의 요청대로 음료를 만들면서 이야기에 귀를 기울입니다. 음료 제조는 단순하지만 (재료를 순서대로 선택) 이야기는 진지하고 생각할 거리를 줍니다——IT 회사에서 일하는 서큐버스, 오크 남자친구를 반대하는 부모님 때문에 고민하는 엘프, 마감 시한과 상처를 안고 있는 작가. 아트 스타일은 따뜻한 호박색 톤의 로파이 픽셀이며, 훌륭한 단편 소설집을 읽는 것 같은 경험입니다. Coffee Talk 에피소드 2는 새로운 캐릭터들로 세계관을 이어갑니다. 비 오는 저녁 따뜻한 곳에서 조용하고 인간적인 (그리고 비인간적인) 이야기를 듣고 싶을 때 완벽한 게임입니다.',
    why_de:
      'Coffee Talk ist ein Visual Novel-Baristasimulator, der im verregneten, modernfantastischen Seattle spielt, wo Menschen gemeinsam mit Elfen, Orks, Meerjungfrauen und Werwölfen leben. Du spielst als Besitzer eines Spätcafés — dem einzigen, das nach Mitternacht noch geöffnet ist. Gäste kommen einer nach dem anderen herein, und du hörst ihnen zu, während du ihre bestellten Drinks zubereitest. Das Drinks-Mixen ist einfach (Zutaten in der richtigen Reihenfolge wählen), aber die Geschichten sind aufrichtig durchdacht: eine Sukubus, die bei einem Techunternehmen arbeitet, eine Elfe, deren Eltern ihren Ork-Freund ablehnen, ein Autor mit Deadline und gebrochenem Herzen. Der Kunststil ist Lo-Fi-Pixel mit warmem Bernsteinleuchten und fühlt sich an wie das Lesen einer sehr guten Kurzgeschichtensammlung. Coffee Talk Folge 2 erweitert die Welt mit neuen Charakteren. Ein perfektes Spiel für einen Regenabend, wenn du in einem warmen Ort sein und ruhige, menschliche (und nicht-menschliche) Geschichten hören möchtest.',
    tip_en: "Experiment with unusual ingredient combinations — some customers hint at drinks beyond their stated order, and serving them the right undisclosed drink unlocks hidden story paths.",
    tip_zh: '尝试不寻常的食材组合——一些顾客暗示了超出他们所说订单的饮料，为他们提供正确的未透露饮料会解锁隐藏的故事路径。',
    tip_zhTW: '嘗試不尋常的食材組合——一些顧客暗示了超出他們所說訂單的飲料，為他們提供正確的未透露飲料會解鎖隱藏的故事路徑。',
    tip_ja: '珍しい材料の組み合わせを試してみよう——注文とは別のドリンクを示唆する客もいる。隠れたドリンクを提供すると、隠しストーリーが解放される。',
    tip_ko: '특이한 재료 조합을 시도해보세요——일부 손님은 자신이 말한 주문 외의 음료를 암시하는데, 올바른 비공개 음료를 제공하면 숨겨진 스토리 경로가 열립니다.',
    tip_de: 'Probiere ungewöhnliche Zutatenkombinationen aus — einige Gäste deuten Drinks an, die über ihre ausgesprochene Bestellung hinausgehen. Den richtigen verborgenen Drink zu servieren schaltet versteckte Story-Pfade frei.',
  },
  'season-letter': {
    title_en: 'Season: A Letter to the Future',
    title_zh: 'Season：致未来的信',
    title_zhTW: 'Season：致未來的信',
    title_ja: 'Season: A Letter to the Future',
    title_ko: 'Season: A Letter to the Future',
    title_de: 'Season: A Letter to the Future',
    emoji: '🚲',
    tag_en: 'A bicycle journey through a beautiful world on the eve of a great seasonal reset — document everything',
    tag_zh: '在一场伟大季节重置前夕骑自行车穿越美丽的世界——记录一切',
    tag_zhTW: '在一場偉大季節重置前夕騎自行車穿越美麗的世界——記錄一切',
    tag_ja: '大きなリセットを前に自転車で美しい世界を旅し、すべてを記録するゲーム',
    tag_ko: '거대한 리셋을 앞두고 아름다운 세계를 자전거로 여행하며 모든 것을 기록하는 게임',
    tag_de: 'Eine Fahrradreise durch eine wunderschöne Welt am Vorabend eines großen Saisonresets — dokumentiere alles',
    platform_en: 'Available on: PC (Steam, GOG, Epic), PlayStation 4/5 — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG、Epic）、PlayStation 4/5——约 20 美元',
    platform_zhTW: '平台：PC（Steam、GOG、Epic）、PlayStation 4/5——約 20 美元',
    platform_ja: 'プレイ可能：PC（Steam、GOG、Epic）、PlayStation 4/5——約 2,000円',
    platform_ko: '플랫폼: PC(Steam, GOG, Epic), PlayStation 4/5 — 약 20달러',
    platform_de: 'Erhältlich für: PC (Steam, GOG, Epic), PlayStation 4/5 — ca. 20 €',
    why_en:
      "Season: A Letter to the Future (released February 2023) is one of the most unusual and beautiful cozy games ever made. You play as Estelle, a young woman leaving her isolated village for the first time on the eve of a 'season' — a recurring cataclysm that wipes the world's memory clean and resets everything. Before the season ends, you travel by bicycle through a lush, dreamlike landscape, documenting everything you find: photographing scenes, recording sounds with a microphone, pressing plants and objects into a journal. You are essentially making a time capsule for whoever comes after you. The game is about 6-8 hours, moves at a gentle bicycle pace, and is filled with found objects, letters from strangers, and small mysteries about the world's strange history. BAFTA nominated for narrative. A perfect game for autumnal evenings when you feel the particular melancholy of things ending — it transforms that feeling into something purposeful.",
    why_zh:
      'Season：致未来的信（2023 年 2 月发布）是有史以来最不寻常、最美丽的 cozy 游戏之一。你扮演艾斯特尔，一个在"季节"前夕第一次离开隔绝村庄的年轻女性——一场反复发生的灾变，它清除世界的记忆并重置一切。在季节结束之前，你骑自行车穿越郁郁葱葱、如梦似幻的风景，记录你发现的一切：拍摄场景、用麦克风录制声音、将植物和物品压入日记本。你本质上是在为你之后的人制作一个时间囊。这款游戏大约 6-8 小时，以温和的自行车速度移动，充满了拾得物、陌生人的信件，以及关于这个世界奇异历史的小谜题。BAFTA 叙事类提名。一款完美的秋日傍晚游戏，当你感受到事物结束时特有的忧郁——它将这种感觉转化为有目的的东西。',
    why_zhTW:
      'Season：致未來的信（2023 年 2 月發布）是有史以來最不尋常、最美麗的 cozy 遊戲之一。你扮演艾斯特爾，一個在「季節」前夕第一次離開隔絕村莊的年輕女性——一場反覆發生的災變，它清除世界的記憶並重置一切。在季節結束之前，你騎自行車穿越鬱鬱蔥蔥、如夢似幻的風景，記錄你發現的一切：拍攝場景、用麥克風錄製聲音、將植物和物品壓入日記本。你本質上是在為你之後的人製作一個時間囊。這款遊戲大約 6-8 小時，以溫和的自行車速度移動，充滿了拾得物、陌生人的信件，以及關於這個世界奇異歷史的小謎題。BAFTA 敘事類提名。一款完美的秋日傍晚遊戲，當你感受到事物結束時特有的憂鬱——它將這種感覺轉化為有目的的東西。',
    why_ja:
      'Season: A Letter to the Future（2023年2月リリース）は、これまでに作られた中で最も独特で美しいコージーゲームのひとつです。あなたはエステルという若い女性を演じます。「季節」——世界の記憶を消してすべてをリセットする繰り返す大変動——の前夜に、隔絶された村を初めて離れる彼女です。季節が終わる前に、あなたは自転車で青々とした夢幻的な景色の中を旅し、発見したものをすべて記録します：シーンを写真に収め、マイクで音を録音し、植物や物をジャーナルに押し込みます。あなたは本質的に、自分の後に来る人のためにタイムカプセルを作っているのです。ゲームは約6〜8時間、自転車のゆったりしたペースで進み、拾得物、見知らぬ人からの手紙、そしてこの世界の奇妙な歴史にまつわる小さな謎に満ちています。BAFTAのナラティブ部門にノミネートされました。物事が終わっていく特別なもの悲しさを感じる秋の夜にぴったりのゲームです——その感情を意味あるものへと変換してくれます。',
    why_ko:
      'Season: A Letter to the Future (2023년 2월 출시)는 역대 가장 독특하고 아름다운 코지 게임 중 하나입니다. 당신은 에스텔이라는 젊은 여성을 플레이합니다. 「시즌」——세계의 기억을 지우고 모든 것을 초기화하는 반복되는 재변——을 앞두고, 격리된 마을을 처음으로 떠나는 그녀입니다. 시즌이 끝나기 전에 당신은 자전거로 푸르르고 몽환적인 풍경을 여행하며 발견한 모든 것을 기록합니다. 장면을 사진으로 찍고, 마이크로 소리를 녹음하고, 식물과 물건을 일기장에 눌러 담습니다. 본질적으로 당신 다음에 올 누군가를 위한 타임캡슐을 만드는 것입니다. 게임은 약 6-8시간 분량이며, 자전거의 느긋한 속도로 진행되고, 습득물, 낯선 사람들의 편지, 그리고 이 세계의 기이한 역사에 관한 작은 수수께끼들로 가득 차 있습니다. BAFTA 내러티브 부문 후보에 올랐습니다. 가을 저녁 사물이 끝나가는 것에서 오는 특유의 우수를 느낄 때 완벽한 게임입니다——그 감정을 목적 있는 무언가로 변환시켜줍니다.',
    why_de:
      'Season: A Letter to the Future (erschienen Februar 2023) ist eines der ungewöhnlichsten und schönsten Cozy-Spiele, die je entwickelt wurden. Du spielst als Estelle, eine junge Frau, die zum ersten Mal ihr isoliertes Dorf verlässt — am Vorabend einer „Saison", einer wiederkehrenden Katastrophe, die das Gedächtnis der Welt auslöscht und alles zurücksetzt. Bevor die Saison endet, reist du per Fahrrad durch eine üppige, traumhafte Landschaft und dokumentierst alles, was du findest: Szenen fotografieren, Klänge mit einem Mikrofon aufnehmen, Pflanzen und Gegenstände in ein Tagebuch pressen. Im Wesentlichen erstellst du eine Zeitkapsel für die Menschen, die nach dir kommen. Das Spiel dauert etwa 6–8 Stunden, bewegt sich im gemächlichen Tempo eines Fahrrads und ist voll mit gefundenen Gegenständen, Briefen von Fremden und kleinen Geheimnissen über die seltsame Geschichte der Welt. Für die BAFTA im Bereich Narrative nominiert. Ein perfektes Spiel für Herbstabende, wenn du das ganz besondere Melancholie-Gefühl verspürst, das entsteht, wenn Dinge enden — es verwandelt dieses Gefühl in etwas Sinnvolles.',
    tip_en: "Take time to record sounds with your microphone — some of the most moving entries in your season album come from ambient sounds you can only capture in specific locations.",
    tip_zh: '花时间用你的麦克风录制声音——你的季节相册中一些最动人的条目来自只能在特定地点才能捕捉到的环境声音。',
    tip_zhTW: '花時間用你的麥克風錄製聲音——你的季節相冊中一些最動人的條目來自只能在特定地點才能捕捉到的環境聲音。',
    tip_ja: 'マイクで音を録音する時間を取ろう——シーズンアルバムの中で最も心に響くエントリーのいくつかは、特定の場所でしか捉えられないアンビエントサウンドから生まれる。',
    tip_ko: '마이크로 소리를 녹음하는 시간을 가져보세요——시즌 앨범에서 가장 감동적인 항목 중 일부는 특정 장소에서만 포착할 수 있는 주변 소리에서 나옵니다.',
    tip_de: 'Nimm dir Zeit, um Geräusche mit deinem Mikrofon aufzunehmen — einige der bewegendsten Einträge in deinem Saisonalbum stammen von Umgebungsgeräuschen, die du nur an bestimmten Orten aufnehmen kannst.',
  },
  sakuna: {
    title_en: 'Sakuna: Of Rice and Paddy',
    title_zh: '天穗之咲稻姬',
    title_zhTW: '天穗之咲稻姬',
    title_ja: '天穂のサクナヒメ',
    title_ko: '천수의 사쿠나히메',
    title_de: 'Sakuna: Of Rice and Paddy',
    emoji: '🌾',
    tag_en: 'A Japanese action RPG where the core loop is growing the perfect rice — deeply seasonal, deeply satisfying',
    tag_zh: '日本动作 RPG，核心循环是种植完美的稻米——深度季节感，深度满足感',
    tag_zhTW: '日本動作 RPG，核心循環是種植完美的稻米——深度季節感，深度滿足感',
    tag_ja: '稲作が核心ループのアクションRPG——季節の深み、やりこみ要素満載',
    tag_ko: '완벽한 쌀 재배가 핵심 루프인 일본 액션 RPG——깊은 계절감, 깊은 만족감',
    tag_de: 'Ein japanisches Action-RPG, bei dem das Kern-Loop das Anbauen von perfektem Reis ist — tief seasonal, tief befriedigend',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4 — about $40 (often on sale for ~$20)',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4——约 40 美元（常特价约 20 美元）',
    platform_zhTW: '平台：PC（Steam）、Nintendo Switch、PlayStation 4——約 40 美元（常特價約 20 美元）',
    platform_ja: 'プレイ可能：PC（Steam）、Nintendo Switch、PlayStation 4——約 4,000円（セール時約 2,000円）',
    platform_ko: '플랫폼: PC(Steam), Nintendo Switch, PlayStation 4 — 약 40달러 (할인 시 약 20달러)',
    platform_de: 'Erhältlich für: PC (Steam), Nintendo Switch, PlayStation 4 — ca. 40 € (häufig im Sale für ~20 €)',
    why_en:
      "Sakuna: Of Rice and Paddy (2020) is one of the most unexpectedly deep cozy games ever released. You play as Sakuna, a disgraced rice goddess banished to a dangerous island with a group of mortals. During the day you fight through dangerous terrain using action-RPG combat. In the evenings you return home to tend your rice paddies. The rice cultivation system is genuinely deep — managing water levels through each stage of growth, choosing fertilizer inputs carefully, watching temperature and sunlight, harvesting with precision, and threshing, polishing, and storing the harvest. The quality of your rice directly determines Sakuna's combat power. The seasonal rhythm is built deeply into the game: spring planting, summer tending, autumn harvest, winter planning. The Japanese mythology is beautiful and the domestic sequences — cooking meals for the household, everyone settling in for the evening — are some of the most cozy moments in games. One of the best surprises of the 2020s for farming game fans.",
    why_zh:
      '天穗之咲稻姬（2020 年）是有史以来发布的最出人意料的深度 cozy 游戏之一。你扮演被流放到危险岛屿的被贬黜稻米女神佐久奈，与一群凡人在一起。白天你用动作 RPG 战斗穿越危险的地形。傍晚你回家照料稻田。水稻种植系统确实很深入——管理每个生长阶段的水位、仔细选择肥料投入、观察温度和日照、精确收割、脱粒、抛光和储存收获物。你的稻米质量直接决定佐久奈的战斗力。季节节律深深融入游戏：春天播种、夏天照料、秋天收割、冬天规划。日本神话很美，家庭场景——为家人烹饪饭食、大家在傍晚安顿下来——是游戏中最 cozy 的时刻之一。对农场游戏粉丝来说是 2020 年代最好的惊喜之一。',
    why_zhTW:
      '天穗之咲稻姬（2020 年）是有史以來發布的最出人意料的深度 cozy 遊戲之一。你扮演被流放到危險島嶼的被貶黜稻米女神佐久奈，與一群凡人在一起。白天你用動作 RPG 戰鬥穿越危險的地形。傍晚你回家照料稻田。水稻種植系統確實很深入——管理每個生長階段的水位、仔細選擇肥料投入、觀察溫度和日照、精確收割、脫粒、拋光和儲存收獲物。你的稻米質量直接決定佐久奈的戰鬥力。季節節律深深融入遊戲：春天播種、夏天照料、秋天收割、冬天規劃。日本神話很美，家庭場景——為家人烹飪飯食、大家在傍晚安頓下來——是遊戲中最 cozy 的時刻之一。對農場遊戲粉絲來說是 2020 年代最好的驚喜之一。',
    why_ja:
      '天穂のサクナヒメ（2020年）は、これまでにリリースされた中で最も予想外に奥深いコージーゲームのひとつです。稲作の女神・サクナヒメとして、凡人たちとともに危険な島へ流刑されてしまいます。昼間はアクションRPGとして危険な地形を戦いながら進みます。夕方は帰宅して田んぼの世話をします。稲作システムは本当に奥が深く、生育段階ごとの水位管理、肥料の慎重な選択、気温や日照の観察、精密な収穫、脱穀、精米、収穫物の保管まで行います。稲の品質がサクナヒメの戦闘能力に直結します。季節のリズムはゲームに深く組み込まれており、春の田植え、夏の管理、秋の収穫、冬の計画立てが続きます。日本神話の世界観が美しく、家での場面——家族のために食事を作り、夕方にみんなが落ち着く時間——はゲームの中でも最もコージーな瞬間のひとつです。農場ゲームファンにとって2020年代最高の掘り出し物のひとつです。',
    why_ko:
      '천수의 사쿠나히메 (2020년)는 역대 가장 예상 외로 깊이 있는 코지 게임 중 하나입니다. 위험한 섬으로 유배된 강등된 벼 여신 사쿠나히메로 플레이하며, 여러 필멸자들과 함께합니다. 낮에는 액션 RPG 전투로 위험한 지형을 헤쳐나갑니다. 저녁에는 집으로 돌아가 논을 관리합니다. 벼 재배 시스템은 정말 깊이가 있습니다——각 성장 단계별 수위 관리, 비료 투입의 신중한 선택, 온도와 일조량 관찰, 정밀한 수확, 탈곡, 도정, 수확물 저장까지. 쌀의 품질이 사쿠나히메의 전투력을 직접 결정합니다. 계절 리듬이 게임에 깊이 내재되어 있습니다: 봄 파종, 여름 관리, 가을 수확, 겨울 계획. 일본 신화가 아름답고, 가정 장면들——가족을 위해 식사를 준비하고, 저녁에 모두가 편안히 앉는 시간——은 게임에서 가장 코지한 순간 중 하나입니다. 농장 게임 팬들에게 2020년대 최고의 뜻밖의 발견 중 하나입니다.',
    why_de:
      'Sakuna: Of Rice and Paddy (2020) ist eines der unerwartet tiefgründigsten Cozy-Spiele, die je erschienen sind. Du spielst als Sakuna, eine entmachtete Reisgöttin, die mit einer Gruppe von Sterblichen auf eine gefährliche Insel verbannt wird. Tagsüber kämpfst du im Action-RPG-Stil durch gefährliches Terrain. Abends kehrst du nach Hause zurück, um deine Reisfelder zu bestellen. Das Reisanbausystem ist wirklich tiefgründig — Wasserstand in jedem Wachstumsstadium steuern, Düngemittel sorgfältig auswählen, Temperatur und Sonnenlicht beobachten, präzise ernten, dreschen, polieren und die Ernte einlagern. Die Qualität deines Reises bestimmt direkt Sakunas Kampfkraft. Der Saisonrhythmus ist tief ins Spiel eingebaut: Frühjahrspflanzung, Sommerpflege, Herbsternte, Winterplanung. Die japanische Mythologie ist wunderschön und die häuslichen Szenen — Mahlzeiten für den Haushalt kochen, abends gemeinsam entspannen — gehören zu den gemütlichsten Momenten in Spielen. Eine der besten Überraschungen der 2020er Jahre für Farming-Game-Fans.',
    tip_en: "Prioritize water management over every other rice cultivation variable — keeping water at precisely the right level for each growth stage has a bigger impact on rice quality than any other choice.",
    tip_zh: '将水管理置于所有其他水稻种植变量之上——在每个生长阶段将水保持在精确的正确水平对稻米质量的影响比其他任何选择都要大。',
    tip_zhTW: '將水管理置於所有其他水稻種植變量之上——在每個生長階段將水保持在精確的正確水平對稻米質量的影響比其他任何選擇都要大。',
    tip_ja: '水管理を他のすべての稲作要素より優先させよう——各生長段階で水を正確な水位に保つことは、他のどんな選択よりも米の品質に大きな影響を与える。',
    tip_ko: '수위 관리를 다른 모든 쌀 재배 변수보다 우선시하세요——각 성장 단계에서 물을 정확히 올바른 수준으로 유지하는 것은 다른 어떤 선택보다 쌀 품질에 더 큰 영향을 미칩니다.',
    tip_de: 'Priorisiere das Wassermanagement über alle anderen Reisanbau-Variablen — das Wasser in jedem Wachstumsstadium auf genau dem richtigen Stand zu halten, hat einen größeren Einfluss auf die Reisqualität als jede andere Entscheidung.',
  },
  'garden-story': {
    title_en: 'Garden Story',
    title_zh: '花园物语',
    title_zhTW: '花園物語',
    title_ja: 'ガーデンストーリー',
    title_ko: '가든 스토리',
    title_de: 'Garden Story',
    emoji: '🍇',
    tag_en: 'A cozy RPG where you play as a small grape protecting a seasonal island garden community',
    tag_zh: '一款 cozy RPG，你扮演一颗保护季节性岛屿花园社区的小葡萄',
    tag_zhTW: '一款 cozy RPG，你扮演一顆保護季節性島嶼花園社區的小葡萄',
    tag_ja: '小さなブドウとなって季節の島の花園コミュニティを守るコージーRPG',
    tag_ko: '계절 섬 정원 공동체를 지키는 작은 포도가 되는 코지 RPG',
    tag_de: 'Ein gemütliches RPG, in dem du als kleine Traube eine saisonale Inselgartengemeinschaft beschützt',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch — about $15',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch——约 15 美元',
    platform_zhTW: '平台：PC（Steam、GOG）、Nintendo Switch——約 15 美元',
    platform_ja: 'プレイ可能：PC（Steam、GOG）、Nintendo Switch——約 1,500円',
    platform_ko: '플랫폼: PC(Steam, GOG), Nintendo Switch — 약 15달러',
    platform_de: 'Erhältlich für: PC (Steam, GOG), Nintendo Switch — ca. 15 €',
    why_en:
      "Garden Story (2021) is one of the most charming small-scale cozy RPGs made in recent years. You play as Concord, a young grape who becomes the Grove's new 'Guardian' — responsible for caring for an island community of anthropomorphic plants and fruits while fighting off 'Rot' (corruption that spreads through the environment). The game is divided into four seasonal areas, each with its own aesthetic, community, and challenges. The core loop combines gentle combat, quest completion for community members, and physical restoration of damaged parts of the island. What makes Garden Story special is the warmth of its community — everyone knows everyone, the requests are genuinely mundane and sweet (a mushroom needs a specific item to make a recipe for a sick neighbor), and the visual style is soft and inviting. At about 8-12 hours, it is a complete experience without demanding excessive time. A perfect game for spring mornings when you want to tend something and feel genuinely useful.",
    why_zh:
      '花园物语（2021 年）是近年来制作的最迷人的小规模 cozy RPG 之一。你扮演康科德，一颗成为树林新"守护者"的年轻葡萄——负责照料一个拟人化植物和水果的岛屿社区，同时抵抗"腐败"（在环境中蔓延的污染）。游戏分为四个季节区域，每个区域都有自己的美学、社区和挑战。核心循环结合了温和的战斗、为社区成员完成任务，以及恢复岛屿受损部分的物理修复。使花园物语特别的是其社区的温暖——每个人都认识每个人，请求真实地平凡而可爱（一个蘑菇需要一个特定物品为生病的邻居做食谱），视觉风格柔和而温馨。大约 8-12 小时，这是一个不需要过多时间的完整体验。一款完美的春日清晨游戏，当你想照料某样东西并真正感到有用时。',
    why_zhTW:
      '花園物語（2021 年）是近年來製作的最迷人的小規模 cozy RPG 之一。你扮演康科德，一顆成為樹林新「守護者」的年輕葡萄——負責照料一個擬人化植物和水果的島嶼社區，同時抵抗「腐敗」（在環境中蔓延的污染）。遊戲分為四個季節區域，每個區域都有自己的美學、社區和挑戰。核心循環結合了溫和的戰鬥、為社區成員完成任務，以及恢復島嶼受損部分的物理修復。使花園物語特別的是其社區的溫暖——每個人都認識每個人，請求真實地平凡而可愛（一個蘑菇需要一個特定物品為生病的鄰居做食譜），視覺風格柔和而溫馨。大約 8-12 小時，這是一個不需要過多時間的完整體驗。一款完美的春日清晨遊戲，當你想照料某樣東西並真正感到有用時。',
    why_ja:
      'ガーデンストーリー（2021年）は、近年作られた中で最も魅力的な小規模コージーRPGのひとつです。あなたはコンコードという若いブドウを操り、森の新しい「守護者」になります——擬人化した植物や果物が暮らす島のコミュニティを世話しながら、環境に広がる「腐敗」と戦います。ゲームは四つの季節エリアに分かれており、それぞれ独自の雰囲気、コミュニティ、課題があります。コアループは穏やかな戦闘、コミュニティメンバーのクエスト達成、そして島の傷ついた場所の物理的な修復を組み合わせています。ガーデンストーリーを特別にしているのはコミュニティの温かさです——みんながみんなを知っており、依頼は本当に日常的で愛らしく（キノコが病気の隣人のためにレシピを作るための特定アイテムを必要としている）、ビジュアルスタイルはやわらかく親しみやすいです。約8〜12時間で、過大な時間を要求しない完結した体験です。何かを世話して本当に役に立つと感じたい春の朝にぴったりのゲームです。',
    why_ko:
      '가든 스토리 (2021년)는 최근 제작된 가장 매력적인 소규모 코지 RPG 중 하나입니다. 당신은 콩코드라는 어린 포도를 조종하여 숲의 새로운 「수호자」가 됩니다——의인화된 식물과 과일들이 사는 섬 공동체를 돌보면서 환경에 퍼지는 「부패」와 싸웁니다. 게임은 네 개의 계절 구역으로 나뉘어 있으며, 각각 고유한 미학, 공동체, 도전이 있습니다. 핵심 루프는 부드러운 전투, 공동체 구성원들을 위한 퀘스트 완료, 그리고 섬의 손상된 부분을 물리적으로 복구하는 것을 결합합니다. 가든 스토리를 특별하게 만드는 것은 공동체의 따뜻함입니다——모두가 서로를 알고, 요청들은 진짜로 평범하고 달콤하며 (버섯이 아픈 이웃을 위한 레시피를 만들기 위한 특정 아이템이 필요함), 비주얼 스타일은 부드럽고 포근합니다. 약 8-12시간으로 과도한 시간을 요구하지 않는 완전한 경험입니다. 무언가를 돌보며 진정으로 유용함을 느끼고 싶은 봄 아침에 완벽한 게임입니다.',
    why_de:
      'Garden Story (2021) ist eines der bezauberndsten kleinen Cozy-RPGs der letzten Jahre. Du spielst als Concord, eine junge Traube, die der neue „Hüter" des Hains wird — verantwortlich für eine Inselgemeinschaft aus anthropomorphen Pflanzen und Früchten, während du die „Fäulnis" bekämpfst (eine Korruption, die sich durch die Umgebung ausbreitet). Das Spiel ist in vier saisonale Bereiche aufgeteilt, jeder mit seiner eigenen Ästhetik, Gemeinschaft und Herausforderungen. Der Kern-Loop kombiniert sanften Kampf, Questerfüllung für Gemeinschaftsmitglieder und die physische Wiederherstellung beschädigter Teile der Insel. Was Garden Story besonders macht, ist die Wärme seiner Gemeinschaft — jeder kennt jeden, die Anfragen sind aufrichtig alltäglich und süß (ein Pilz braucht einen bestimmten Gegenstand für ein Rezept für einen kranken Nachbarn), und der visuelle Stil ist weich und einladend. Mit etwa 8-12 Stunden ist es ein vollständiges Erlebnis ohne übermäßige Zeitanforderungen. Ein perfektes Spiel für Frühlingsmorgen, wenn du etwas pflegen und dich wirklich nützlich fühlen möchtest.',
    tip_en: "Check in with every community member each time you enter a new area — many of the most satisfying quests are time-gated behind how often you talk to them, not behind story progress.",
    tip_zh: '每次进入新区域时与每个社区成员交流——许多最令人满足的任务是由你与他们交谈的频率决定的，而不是由故事进度决定的。',
    tip_zhTW: '每次進入新區域時與每個社區成員交流——許多最令人滿足的任務是由你與他們交談的頻率決定的，而不是由故事進度決定的。',
    tip_ja: '新しいエリアに入るたびにすべてのコミュニティメンバーに話しかけよう——最も満足感のあるクエストの多くは、ストーリー進行ではなく、どれだけ彼らに話しかけるかによって解放される。',
    tip_ko: '새 구역에 진입할 때마다 모든 공동체 구성원과 대화하세요——가장 만족스러운 퀘스트 중 많은 것이 스토리 진행이 아니라 얼마나 자주 그들과 이야기하느냐에 따라 잠금 해제됩니다.',
    tip_de: 'Sprich jedes Mal, wenn du einen neuen Bereich betrittst, mit jedem Gemeinschaftsmitglied — viele der befriedigendsten Quests hängen davon ab, wie oft du mit ihnen redest, nicht vom Story-Fortschritt.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'coffee-talk': 0,
    'season-letter': 0,
    sakuna: 0,
    'garden-story': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyAtmosphereQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-atmosphere-quiz`
    const shareText = getLoc(
      `我的氛围 Cozy 游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My atmosphere cozy match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `我的氛圍 Cozy 遊戲推薦是「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `雰囲気コージーゲームの結果は「${result.title_ja}」でした！${result.tag_ja}。あなたも試して：${url}`,
      `나의 분위기 코지 게임은 「${result.title_ko}」입니다！${result.tag_ko}。당신도 찾아보세요：${url}`,
      `Mein Atmosphären-Cozy-Match ist ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`
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
              {getLoc('上手小贴士：', 'Getting started: ', '上手小貼士：', 'プレイのヒント：', '시작 팁: ', 'Einstiegstipp: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把各种游戏里的专注节奏带入真实日常。',
              'TendFarm is building a farm rhythm tracker — bringing the focused rhythms of games into real daily life.',
              'TendFarm 正在研發農場節律追蹤功能——把各種遊戲裡的專注節奏帶入真實日常。',
              'TendFarmは農場リズムトラッカーを開発中です——ゲームの集中リズムを日常生活に取り入れます。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다——게임의 집중 리듬을 실제 일상으로 가져옵니다.',
              'TendFarm entwickelt einen Farmrhythmus-Tracker — die fokussierten Rhythmen aus Spielen ins echte tägliche Leben bringen.'
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やる', '다시 풀기', 'Quiz wiederholen')}
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
            '你现在的心情氛围适合哪款 Cozy 游戏？',
            'Which Cozy Game Matches Your Current Atmosphere?',
            '你現在的心情氛圍適合哪款 Cozy 遊戲？',
            '今の気分に合うコージーゲームはどれ？',
            '지금 당신의 분위기에 맞는 코지 게임은?',
            'Welches Cozy-Game passt zu deiner aktuellen Stimmung?'
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个感官问题，在 Coffee Talk、Season: 致未来的信、天穗之咲稻姬和花园物语中找到你此刻的氛围匹配',
            '6 sensory questions to match you with Coffee Talk, Season, Sakuna, or Garden Story — based on your exact mood and atmosphere right now',
            '6 個感官問題，在 Coffee Talk、Season: 致未來的信、天穗之咲稻姬和花園物語中找到你此刻的氛圍匹配',
            '6つの感覚的な質問で、Coffee Talk、Season、天穂のサクナヒメ、ガーデンストーリーの中からあなたの今の気分に合うゲームを見つけます',
            '6가지 감각 질문으로 Coffee Talk, Season, 천수의 사쿠나히메, 가든 스토리 중 지금 기분에 맞는 게임을 찾아드립니다',
            '6 Fragen zu deiner Stimmung, die dir aus Coffee Talk, Season, Sakuna und Garden Story das passende Spiel suchen'
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
        {getLoc('找到我的氛围游戏', 'Find My Atmosphere Game', '找到我的氛圍遊戲', '私の雰囲気ゲームを見つける', '나의 분위기 게임 찾기', 'Mein Atmosphären-Spiel finden')}
      </button>
    </div>
  )
}
