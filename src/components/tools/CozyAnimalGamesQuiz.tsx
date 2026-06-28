'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'stray' | 'cattails' | 'snufkin' | 'pupperazzi'

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
          : getLoc('📋 复制结果', '📋 Copy result', '📋 複製結果', '📋 コピー', '📋 결과 복사', '📋 Ergebnis kopieren')}
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
    q_en: 'What sounds most appealing about playing as an animal in a game?',
    q_zh: '扮演游戏中的动物，哪个方面对你最有吸引力？',
    q_zhTW: '在遊戲中扮演動物，哪個方面對你最有吸引力？',
    q_ja: 'ゲームで動物を操作するとき、一番魅力を感じるのはどんな点ですか？',
    q_ko: '게임에서 동물을 플레이할 때 가장 매력적으로 느끼는 점은 무엇인가요?',
    q_de: 'Was klingt am verlockendsten daran, in einem Spiel ein Tier zu spielen?',
    options: [
      {
        en: 'Navigating a world that was not built for you — solving its puzzles from a completely different perspective and eventually connecting with its strange residents',
        zh: '在一个不为你而建的世界中穿行——从完全不同的视角解决谜题，最终与其奇异居民建立联系',
        zhTW: '在一個不為你而建的世界中穿行——從完全不同的視角解決謎題，最終與其奇異居民建立聯繫',
        ja: '自分のために作られていない世界を歩き回る——まったく異なる視点でパズルを解き、奇妙な住人たちと絆を結ぶ',
        ko: '나를 위해 만들어지지 않은 세계를 탐험하기 — 완전히 다른 시각으로 퍼즐을 풀고, 낯선 주민들과 유대감을 쌓는 것',
        de: 'Eine Welt navigieren, die nicht für dich gemacht wurde — Rätsel aus einer völlig anderen Perspektive lösen und seltsame Bewohner kennenlernen',
        type: 'stray',
      },
      {
        en: 'Building something that is yours — your own territory, your own colony, your own status in a natural world with real stakes',
        zh: '建立属于自己的东西——你自己的领地、你自己的族群、在一个有真实风险的自然世界中的地位',
        zhTW: '建立屬於自己的東西——你自己的領地、你自己的族群、在一個有真實風險的自然世界中的地位',
        ja: '自分だけのものを作る——自分のテリトリー、自分のコロニー、本物のリスクがある自然界での地位',
        ko: '나만의 것을 만들기 — 나의 영역, 나의 군락, 진짜 위험이 있는 자연 세계에서의 지위',
        de: 'Etwas Eigenes aufbauen — dein eigenes Revier, deine eigene Kolonie, deinen Status in einer Welt mit echten Konsequenzen',
        type: 'cattails',
      },
      {
        en: 'Walking slowly through a beautiful world with no pressure — just listening, noticing, and being present in the atmosphere',
        zh: '在没有压力的美丽世界中缓步行走——只是倾听、观察、沉浸在氛围中',
        zhTW: '在沒有壓力的美麗世界中緩步行走——只是傾聽、觀察、沉浸在氛圍中',
        ja: 'プレッシャーなしに美しい世界をゆっくり歩く——ただ聴いて、気づいて、その雰囲気の中に存在する',
        ko: '아름다운 세계를 아무 압박 없이 천천히 걷기 — 그냥 듣고, 알아차리고, 분위기 속에 존재하는 것',
        de: 'Langsam durch eine wunderschöne Welt wandern, ohne Druck — einfach zuhören, beobachten und in der Atmosphäre aufgehen',
        type: 'snufkin',
      },
      {
        en: 'Bringing pure joy to every creature you meet — running, playing, making them laugh, and capturing their best moments',
        zh: '给你遇到的每一个生物带来纯粹的快乐——奔跑、嬉戏、让他们开怀大笑、捕捉他们最美的瞬间',
        zhTW: '給你遇到的每一個生物帶來純粹的快樂——奔跑、嬉戲、讓他們開懷大笑、捕捉他們最美的瞬間',
        ja: '出会うすべての生き物に純粋な喜びをもたらす——走り回り、遊び、笑わせて、最高の瞬間を写真に収める',
        ko: '만나는 모든 생물에게 순수한 기쁨 선사하기 — 달리고, 놀고, 웃게 만들고, 최고의 순간을 담는 것',
        de: 'Allen Kreaturen, denen du begegnest, pure Freude bringen — rennen, spielen, sie zum Lachen bringen und ihre schönsten Momente einfangen',
        type: 'pupperazzi',
      },
    ],
  },
  {
    q_en: 'How important is narrative to your experience?',
    q_zh: '叙事对你的游戏体验有多重要？',
    q_zhTW: '敘事對你的遊戲體驗有多重要？',
    q_ja: 'ストーリーはあなたのプレイ体験においてどれほど重要ですか？',
    q_ko: '서사는 당신의 게임 경험에서 얼마나 중요한가요?',
    q_de: 'Wie wichtig ist dir die Handlung in deinem Spielerlebnis?',
    options: [
      {
        en: 'Essential — I want a story with stakes, mystery, and an emotional ending that I will remember',
        zh: '非常重要——我想要一个有风险、有谜题、有令人难忘的情感结局的故事',
        zhTW: '非常重要——我想要一個有風險、有謎題、有令人難忘的情感結局的故事',
        ja: '必須——リスクがあり、謎があり、忘れられない感動の結末があるストーリーが欲しい',
        ko: '필수 — 위험 부담이 있고, 미스터리가 있고, 감동적인 엔딩이 기억에 남는 스토리를 원해요',
        de: 'Unverzichtbar — ich will eine Geschichte mit echten Einsätzen, Geheimnissen und einem emotionalen Ende, das ich nicht vergesse',
        type: 'stray',
      },
      {
        en: 'Light narrative is fine — I want systems, progression, and the satisfaction of building something more than I want plot',
        zh: '轻度叙事就够了——比起情节，我更想要系统、进展和建造某物的满足感',
        zhTW: '輕度敘事就夠了——比起情節，我更想要系統、進展和建造某物的滿足感',
        ja: '軽めのストーリーで十分——プロットよりもシステム、進行、何かを作る達成感が欲しい',
        ko: '가벼운 서사로도 충분해요 — 플롯보다는 시스템, 진행, 뭔가를 만드는 만족감을 원해요',
        de: 'Leichte Handlung reicht mir — ich will lieber Systeme, Fortschritt und die Befriedigung, etwas aufzubauen, als Plot',
        type: 'cattails',
      },
      {
        en: 'Atmosphere IS the narrative — I want mood and poetry and a sense of place, not plot beats or dramatic moments',
        zh: '氛围就是叙事——我想要情绪、诗意和场所感，而不是情节节拍或戏剧性时刻',
        zhTW: '氛圍就是敘事——我想要情緒、詩意和場所感，而不是情節節拍或戲劇性時刻',
        ja: '雰囲気こそがストーリー——プロットや劇的な場面より、ムード、詩情、場の空気感が欲しい',
        ko: '분위기 자체가 서사예요 — 플롯 전개나 극적인 순간보다 감성, 시적 표현, 장소감을 원해요',
        de: 'Die Atmosphäre IST die Handlung — ich will Stimmung, Poesie und ein Gefühl für den Ort, keine dramatischen Wendungen',
        type: 'snufkin',
      },
      {
        en: 'No narrative needed at all — I want pure vibes, pure interaction, zero story pressure, just me and the dogs',
        zh: '完全不需要叙事——我只想要纯粹的氛围、纯粹的互动、零故事压力，只有我和狗狗们',
        zhTW: '完全不需要敘事——我只想要純粹的氛圍、純粹的互動、零故事壓力，只有我和狗狗們',
        ja: 'ストーリーは全く要らない——純粋なバイブス、純粋なインタラクション、ストーリープレッシャーゼロ、ただ私と犬たちだけ',
        ko: '서사는 전혀 필요 없어요 — 순수한 분위기, 순수한 상호작용, 스토리 부담 제로, 그냥 나와 강아지들만',
        de: 'Keinerlei Handlung nötig — ich will pure Vibes, pure Interaktion, null Storydruck, nur ich und die Hunde',
        type: 'pupperazzi',
      },
    ],
  },
  {
    q_en: 'What is your preferred play session length and shape?',
    q_zh: '你喜欢的游戏时长和节奏是什么？',
    q_zhTW: '你喜歡的遊戲時長和節奏是什麼？',
    q_ja: '好みのプレイセッションの長さとスタイルは？',
    q_ko: '선호하는 플레이 세션의 길이와 형태는 어떤가요?',
    q_de: 'Wie lang und wie strukturiert magst du deine Spielsessions am liebsten?',
    options: [
      {
        en: 'A focused 4-6 hour experience I can complete in a weekend — I want a beginning, middle, and end',
        zh: '一个我可以在周末完成的 4-6 小时专注体验——我想要开始、中间和结局',
        zhTW: '一個我可以在週末完成的 4-6 小時專注體驗——我想要開始、中間和結局',
        ja: '週末に完結できる4〜6時間の集中体験——始まりと中盤とエンディングがあるものが好き',
        ko: '주말에 완료할 수 있는 4-6시간의 집중 경험 — 시작, 중간, 끝이 있는 게임을 원해요',
        de: 'Ein fokussiertes 4-6-Stunden-Erlebnis, das ich am Wochenende abschließen kann — ich will Anfang, Mitte und Ende',
        type: 'stray',
      },
      {
        en: 'Long-term ongoing sessions — a game I will return to over weeks and months as my colony grows',
        zh: '长期持续的游戏——一个我会在数周乃至数月内不断回来的游戏，看着我的族群成长',
        zhTW: '長期持續的遊戲——一個我會在數週乃至數月內不斷回來的遊戲，看著我的族群成長',
        ja: '長期的なプレイ——コロニーが成長するにつれて、何週間も何ヶ月も戻り続けるゲーム',
        ko: '장기 지속 세션 — 군락이 성장하면서 몇 주, 몇 달에 걸쳐 계속 돌아오게 되는 게임',
        de: 'Langfristige, fortlaufende Sessions — ein Spiel, zu dem ich über Wochen und Monate zurückkehre, während meine Kolonie wächst',
        type: 'cattails',
      },
      {
        en: 'Gentle 20-30 minute sessions whenever the mood strikes — no obligation, no progress gates, just a meditative walk',
        zh: '当心情来了就玩 20-30 分钟的温柔游戏——没有义务、没有进度门槛，只是一次冥想式散步',
        zhTW: '當心情來了就玩 20-30 分鐘的溫柔遊戲——沒有義務、沒有進度門檻，只是一次冥想式散步',
        ja: '気が向いたときに20〜30分だけ——義務なし、進行ゲートなし、ただ瞑想的な散歩',
        ko: '기분 날 때 20-30분씩 하는 여유로운 게임 — 의무 없고, 진행 관문 없고, 그냥 명상적인 산책',
        de: 'Sanfte 20-30-Minuten-Sessions, wann immer die Stimmung stimmt — kein Zwang, keine Fortschrittshürden, nur ein meditativer Spaziergang',
        type: 'snufkin',
      },
      {
        en: 'A short joyful burst — 15 minutes of absolute chaos and delight and then I am completely satisfied',
        zh: '短暂欢乐的爆发——15 分钟的绝对混乱和喜悦，然后我就完全满足了',
        zhTW: '短暫歡樂的爆發——15 分鐘的絕對混亂和喜悅，然後我就完全滿足了',
        ja: '短い喜びの爆発——15分間の純粋なカオスと喜び、それで完全に満足できる',
        ko: '짧고 즐거운 폭발 — 15분간의 완전한 혼돈과 기쁨, 그러면 충분히 만족해요',
        de: 'Ein kurzer, freudiger Ausbruch — 15 Minuten absolutes Chaos und Begeisterung, und dann bin ich vollkommen zufrieden',
        type: 'pupperazzi',
      },
    ],
  },
  {
    q_en: 'How much challenge do you want in your animal game?',
    q_zh: '你希望动物游戏中有多少挑战？',
    q_zhTW: '你希望動物遊戲中有多少挑戰？',
    q_ja: '動物ゲームにはどのくらいの難しさを求めますか？',
    q_ko: '동물 게임에서 얼마나 많은 도전을 원하시나요?',
    q_de: 'Wie viel Herausforderung willst du in deinem Tierspiel?',
    options: [
      {
        en: 'Some tension is good — stealth sections, environmental puzzles, moments where I need to think carefully to proceed',
        zh: '有些紧张感很好——潜行段落、环境谜题、需要仔细思考才能继续的时刻',
        zhTW: '有些緊張感很好——潛行段落、環境謎題、需要仔細思考才能繼續的時刻',
        ja: '多少の緊張感は良い——ステルスセクション、環境パズル、慎重に考えなければ進めない瞬間',
        ko: '약간의 긴장감은 좋아요 — 스텔스 구간, 환경 퍼즐, 조심스럽게 생각해야 진행할 수 있는 순간들',
        de: 'Etwas Spannung ist gut — Schleichpassagen, Umgebungsrätsel, Momente, in denen ich sorgfältig nachdenken muss',
        type: 'stray',
      },
      {
        en: 'Strategy over tension — I want resource management and territorial decisions that require planning, but not twitch reflexes',
        zh: '策略胜于紧张——我想要需要规划的资源管理和领地决策，但不需要快速反应',
        zhTW: '策略勝於緊張——我想要需要規劃的資源管理和領地決策，但不需要快速反應',
        ja: '緊張より戦略——計画が必要なリソース管理と縄張りの決断が欲しいが、反射神経は要らない',
        ko: '긴장보다 전략 — 계획이 필요한 자원 관리와 영역 결정을 원하지만, 빠른 반응은 필요 없어요',
        de: 'Strategie statt Spannung — ich will Ressourcenmanagement und Revierentscheidungen, die Planung erfordern, aber keine Reflexe',
        type: 'cattails',
      },
      {
        en: 'Very light — a puzzle here and there that is solvable without stress, mostly just wandering and discovering',
        zh: '非常轻度——偶尔有可以无压力解决的谜题，大部分时间只是漫游和发现',
        zhTW: '非常輕度——偶爾有可以無壓力解決的謎題，大部分時間只是漫遊和發現',
        ja: 'ごく軽め——ストレスなく解けるパズルが少しあるだけで、あとはほぼ散歩と発見',
        ko: '매우 가볍게 — 가끔 스트레스 없이 풀 수 있는 퍼즐이 있고, 대부분은 그냥 탐험하고 발견하는 것',
        de: 'Sehr leicht — hier und da ein stressfreies Rätsel, ansonsten einfach wandern und entdecken',
        type: 'snufkin',
      },
      {
        en: 'Zero challenge — I want this to be effortless, the most relaxing thing I have ever played, pure sandbox joy',
        zh: '零挑战——我希望这完全轻松，是我玩过的最放松的东西，纯粹的沙盒乐趣',
        zhTW: '零挑戰——我希望這完全輕鬆，是我玩過的最放鬆的東西，純粹的沙盒樂趣',
        ja: '挑戦ゼロ——完全に楽で、今まで遊んだ中で一番リラックスできる、純粋なサンドボックスの喜びが欲しい',
        ko: '도전 제로 — 완전히 쉽고, 지금껏 플레이한 것 중 가장 편안한 것, 순수한 샌드박스 즐거움을 원해요',
        de: 'Null Herausforderung — ich will, dass das völlig mühelos ist, das Entspannenste, was ich je gespielt habe, purer Sandbox-Spaß',
        type: 'pupperazzi',
      },
    ],
  },
  {
    q_en: 'Which visual world sounds most appealing to you?',
    q_zh: '哪个视觉世界对你最有吸引力？',
    q_zhTW: '哪個視覺世界對你最有吸引力？',
    q_ja: 'どのビジュアルの世界が一番魅力的に感じますか？',
    q_ko: '어떤 시각적 세계가 가장 매력적으로 느껴지나요?',
    q_de: 'Welche visuelle Welt klingt für dich am verlockendsten?',
    options: [
      {
        en: 'A neon cyberpunk city seen through cat-height eyes — dark and beautiful, with decaying beauty and hidden warmth',
        zh: '从猫咪视角看到的霓虹赛博朋克城市——黑暗而美丽，有着衰落的美和隐藏的温暖',
        zhTW: '從貓咪視角看到的霓虹賽博龐克城市——黑暗而美麗，有著衰落的美和隱藏的溫暖',
        ja: '猫の目線から見たネオンサイバーパンクな都市——暗くて美しく、朽ちかけた美しさと隠れた温もりがある',
        ko: '고양이 눈높이에서 바라본 네온 사이버펑크 도시 — 어둡고 아름답고, 쇠락한 아름다움과 숨겨진 온기가 있는',
        de: 'Eine Neon-Cyberpunk-Stadt aus Katzenhöhe — dunkel und wunderschön, mit verfallener Schönheit und versteckter Wärme',
        type: 'stray',
      },
      {
        en: 'Seasonal woodland landscapes with changing weather, a natural cat-scale world full of prey, rivals, and territory to claim',
        zh: '随季节变换的林地风景，有着变化的天气，一个充满猎物、竞争者和待征服领地的自然猫咪世界',
        zhTW: '隨季節變換的林地風景，有著變化的天氣，一個充滿獵物、競爭者和待征服領地的自然貓咪世界',
        ja: '季節ごとに変わる森の風景、変化する天気、獲物、ライバル、縄張りにできる土地が広がる自然な猫スケールの世界',
        ko: '날씨가 변하는 계절별 삼림 풍경, 먹이와 경쟁자와 점령할 영역이 가득한 자연스러운 고양이 규모의 세계',
        de: 'Saisonale Waldlandschaften mit wechselndem Wetter — eine natürliche Katzenwelt voller Beute, Rivalen und Territorium zum Erkunden',
        type: 'cattails',
      },
      {
        en: 'Tove Jansson\'s hand-drawn Moominvalley — Scandinavian folk nature illustration, nostalgic and soft, every scene a painting',
        zh: '托芙·扬松手绘的姆明谷——斯堪的纳维亚民俗自然插画，怀旧而柔和，每一幕都是一幅画',
        zhTW: '托芙·楊松手繪的姆明谷——斯堪的那維亞民俗自然插畫，懷舊而柔和，每一幕都是一幅畫',
        ja: 'トーベ・ヤンソンの手描きムーミン谷——北欧の自然民話イラスト、ノスタルジックで柔らかく、どのシーンも絵画のよう',
        ko: '토베 얀손의 손으로 그린 무민 계곡 — 스칸디나비아 민속 자연 일러스트, 향수롭고 부드러우며 모든 장면이 그림 같은',
        de: 'Tove Janssons handgezeichnetes Mumintal — skandinavische Volkskunst-Naturillustration, nostalgisch und sanft, jede Szene ein Gemälde',
        type: 'snufkin',
      },
      {
        en: 'A cheerful stylized world full of dogs in every breed, color, and size — exuberant pop-art energy, endlessly photogenic',
        zh: '一个充满各种品种、颜色和体型的狗狗的欢快程式化世界——充满活力的波普艺术能量，每只狗都上镜',
        zhTW: '一個充滿各種品種、顏色和體型的狗狗的歡快程式化世界——充滿活力的普普藝術能量，每隻狗都上鏡',
        ja: 'あらゆる犬種、色、サイズの犬たちでいっぱいの陽気でスタイリッシュな世界——活気あふれるポップアートエネルギー、どの犬もフォトジェニック',
        ko: '모든 품종, 색깔, 크기의 강아지들로 가득한 유쾌한 스타일화된 세계 — 활기 넘치는 팝아트 에너지, 모든 강아지가 포토제닉한',
        de: 'Eine fröhliche, stilisierte Welt voller Hunde in jeder Rasse, Farbe und Größe — überschwängliche Pop-Art-Energie, endlos fotogen',
        type: 'pupperazzi',
      },
    ],
  },
  {
    q_en: 'What do you most want to take away from the experience?',
    q_zh: '你最希望从这段游戏体验中带走什么？',
    q_zhTW: '你最希望從這段遊戲體驗中帶走什麼？',
    q_ja: 'この体験から一番持ち帰りたいものは何ですか？',
    q_ko: '이 게임 경험에서 가장 가져가고 싶은 것은 무엇인가요?',
    q_de: 'Was möchtest du am liebsten aus dem Erlebnis mitnehmen?',
    options: [
      {
        en: 'A complete emotional journey — I want to finish it feeling genuinely moved by what happened',
        zh: '一段完整的情感旅程——我希望完成后因所发生的一切而真正感动',
        zhTW: '一段完整的情感旅程——我希望完成後因所發生的一切而真正感動',
        ja: '完全な感情の旅——終わったとき、起きたことに本当に心を動かされたい',
        ko: '완전한 감정의 여정 — 끝나고 나서 일어난 일들로 인해 진심으로 감동받고 싶어요',
        de: 'Eine vollständige emotionale Reise — ich will am Ende wirklich bewegt sein von dem, was passiert ist',
        type: 'stray',
      },
      {
        en: 'Accomplishment — my colony is thriving, my territory is secure, I built something real over weeks of play',
        zh: '成就感——我的族群兴旺，我的领地稳固，我在数周的游戏中建立了真实的东西',
        zhTW: '成就感——我的族群興旺，我的領地穩固，我在數週的遊戲中建立了真實的東西',
        ja: '達成感——コロニーが繁栄し、縄張りが安全で、何週間もかけて本物を作り上げた',
        ko: '성취감 — 군락이 번성하고, 영역이 안정되고, 몇 주간의 플레이에서 진짜 뭔가를 만들었다는 것',
        de: 'Erfolg — meine Kolonie floriert, mein Revier ist gesichert, ich habe über Wochen etwas Echtes aufgebaut',
        type: 'cattails',
      },
      {
        en: 'Calm — a genuine sense that slow wandering has meaning, and that noticing small things is its own reward',
        zh: '平静——真正感受到缓慢漫游有其意义，注意小事本身就是奖励',
        zhTW: '平靜——真正感受到緩慢漫遊有其意義，注意小事本身就是獎勵',
        ja: '穏やかさ——ゆっくり歩くことに意味があり、小さなことに気づくことが報酬になるという本物の感覚',
        ko: '차분함 — 느린 방랑이 의미 있고, 작은 것들을 알아차리는 것 자체가 보상이라는 진짜 감각',
        de: 'Ruhe — das echte Gefühl, dass langsames Wandern Bedeutung hat und kleine Dinge zu bemerken seine eigene Belohnung ist',
        type: 'snufkin',
      },
      {
        en: 'Pure delight — a folder full of ridiculous dog photos and the memory of absolute joy with zero effort',
        zh: '纯粹的喜悦——一个装满荒唐狗狗照片的文件夹，以及毫不费力的绝对快乐的回忆',
        zhTW: '純粹的喜悅——一個裝滿荒唐狗狗照片的文件夾，以及毫不費力的絕對快樂的回憶',
        ja: '純粋な喜び——ばかばかしい犬の写真でいっぱいのフォルダと、努力ゼロで得た純粋な喜びの記憶',
        ko: '순수한 기쁨 — 우스꽝스러운 강아지 사진으로 가득 찬 폴더와, 아무 노력 없이 느낀 절대적인 기쁨의 기억',
        de: 'Pure Freude — ein Ordner voller absurder Hundefotos und die Erinnerung an absoluten Spaß ohne jede Anstrengung',
        type: 'pupperazzi',
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
  stray: {
    title_en: 'Stray',
    title_zh: 'Stray',
    title_zhTW: 'Stray',
    title_ja: 'Stray',
    title_ko: 'Stray',
    title_de: 'Stray',
    emoji: '🐱',
    tag_en: 'Navigate a neon cyberpunk city as a stray cat — explore from cat height, solve puzzles, and form unexpected bonds with the robot citizens',
    tag_zh: '以流浪猫的身份穿越霓虹赛博朋克城市——以猫的视角探索、解谜，与机器人居民建立意想不到的情感联系',
    tag_zhTW: '以流浪貓的身份穿越霓虹賽博龐克城市——以貓的視角探索、解謎，與機器人居民建立意想不到的情感聯繫',
    tag_ja: '野良猫として霓虹サイバーパンク都市を旅する——猫の目線で探索し、謎を解き、ロボット市民と予想外の絆を結ぶ',
    tag_ko: '길고양이로 네온 사이버펑크 도시를 탐험하기 — 고양이 시각으로 탐험하고, 퍼즐을 풀고, 로봇 시민들과 예상치 못한 유대감을 쌓는다',
    tag_de: 'Navigiere als streunende Katze durch eine Neon-Cyberpunk-Stadt — erkunde aus Katzensicht, löse Rätsel und knüpfe unerwartete Bindungen mit den Roboterbewohnern',
    platform_en: 'Available on: PC (Steam), PS4, PS5 — about $30. Also on Xbox/Game Pass via cloud.',
    platform_zh: '可在以下平台获取：PC（Steam）、PS4、PS5——约 30 美元。也可通过云端在 Xbox/Game Pass 上体验。',
    platform_zhTW: '可在以下平台取得：PC（Steam）、PS4、PS5——約 30 美元。也可透過雲端在 Xbox/Game Pass 上體驗。',
    platform_ja: '対応プラットフォーム：PC（Steam）、PS4、PS5 — 約3,000円。Xbox/Game Pass（クラウド）でもプレイ可能。',
    platform_ko: '지원 플랫폼: PC(Steam), PS4, PS5 — 약 30달러. Xbox/Game Pass 클라우드로도 이용 가능.',
    platform_de: 'Erhältlich auf: PC (Steam), PS4, PS5 — ca. 30 €. Auch via Xbox/Game Pass (Cloud).',
    why_en:
      "Stray (2022) is one of the most acclaimed games of its year — and one of the most immediately understandable pitches in gaming history: you play as a cat in a cyberpunk underground city where only robots live, and the humans are long gone. You meow, scratch walls, knock things off shelves, sleep on keyboards, and generally do cat things in a world that was never designed for you. What makes Stray extraordinary beyond its concept is how it builds genuine emotional stakes through the relationship between the cat and B-12, a small drone companion who translates the robot language and slowly reveals the history of what happened to humanity. The game is short (4-6 hours) but complete: it has a beginning, a middle, and an ending that lands emotionally without padding it out. It is beautifully rendered on PS5 — the neon-lit alleys, the robot communities going about their lives, the moments of quiet warmth among the decay. Absolutely worth playing even at full price; frequently on sale for $15-20.",
    why_zh:
      'Stray（2022 年）是当年最受好评的游戏之一——也是游戏史上最直观的概念之一：你扮演一只流浪猫，在一个只有机器人居住的赛博朋克地下城市中穿行，人类早已消失。你喵喵叫、抓墙、把东西从架子上推下去、睡在键盘上，总体上在一个从未为你设计的世界里做猫的事情。让 Stray 在概念之外卓越出众的，是它通过猫和 B-12（一个翻译机器人语言并逐渐揭示人类命运的小型无人机伙伴）之间的关系建立起真实的情感赌注。游戏很短（4-6 小时），但完整：它有开始、中间和结局，情感落点到位而不拖沓。在 PS5 上渲染精美——霓虹照耀的小巷、机器人社区在衰败中各自生活、平静温暖的瞬间。即使以全价购买也绝对值得；经常打折到 15-20 美元。',
    why_zhTW:
      'Stray（2022 年）是當年最受好評的遊戲之一——也是遊戲史上最直觀的概念之一：你扮演一隻流浪貓，在一個只有機器人居住的賽博龐克地下城市中穿行，人類早已消失。你喵喵叫、抓牆、把東西從架子上推下去、睡在鍵盤上，總體上在一個從未為你設計的世界裡做貓的事情。讓 Stray 在概念之外卓越出眾的，是它透過貓和 B-12（一個翻譯機器人語言並逐漸揭示人類命運的小型無人機夥伴）之間的關係建立起真實的情感賭注。遊戲很短（4-6 小時），但完整：它有開始、中間和結局，情感落點到位而不拖沓。在 PS5 上渲染精美——霓虹照耀的小巷、機器人社區在衰敗中各自生活、平靜溫暖的瞬間。即使以全價購買也絕對值得；經常打折到 15-20 美元。',
    why_ja:
      'Stray（2022年）はその年最も高く評価されたゲームのひとつであり、ゲーム史上最もわかりやすいコンセプトのひとつです。サイバーパンクの地下都市でロボットだけが暮らし、人間はとうに消えた世界を、野良猫として歩き回ります。鳴き声を上げ、壁を引っかき、棚からものを落とし、キーボードで昼寝する——自分のために作られていない世界で猫として生きる。Strayをコンセプト以上の傑作たらしめているのは、猫とB-12（ロボット語を翻訳し、人類に何が起きたかを徐々に明かす小型ドローンの相棒）との関係を通じて生まれる、本物の感情的な重みです。プレイ時間は短め（4〜6時間）ですが完結しており、始まりと中盤と感動的なエンディングが詰まっています。PS5での映像は息をのむほど美しく、ネオンの路地、廃墟の中で生活するロボットたち、静かな温もりの瞬間が心に残ります。フル価格でも十分な価値があり、セール時は1,500〜2,000円程度になることも。',
    why_ko:
      'Stray（2022）는 그해 가장 극찬을 받은 게임 중 하나로, 게임 역사상 가장 직관적인 피치 중 하나입니다. 로봇만이 살고 인간은 오래전에 사라진 사이버펑크 지하 도시를 길고양이로 돌아다닙니다. 야옹 소리를 내고, 벽을 긁고, 선반에서 물건을 밀어 떨어뜨리고, 키보드 위에서 잠을 잡니다 — 나를 위해 만들어지지 않은 세계에서 고양이답게 행동합니다. Stray를 개념 그 이상으로 특별하게 만드는 것은 고양이와 B-12(로봇 언어를 번역하고 인류에게 무슨 일이 있었는지 서서히 밝혀주는 작은 드론 동반자)의 관계를 통해 쌓이는 진짜 감정적 무게입니다. 게임은 짧지만(4-6시간) 완결성이 있습니다: 시작과 중간과 감동적인 엔딩이 있고, 늘어지지 않습니다. PS5에서의 렌더링은 아름답고 — 네온 골목길, 폐허 속에서 생활하는 로봇 공동체, 잔잔한 온기의 순간들이 인상적입니다. 정가에도 충분한 가치가 있으며, 할인 시 15-20달러까지 내려갑니다.',
    why_de:
      'Stray (2022) ist eines der meistgefeierten Spiele seines Erscheinungsjahres — und eines der verständlichsten Konzepte der Spielgeschichte: Du spielst eine Katze in einer cyberpunken Untergrundstadt, in der nur Roboter leben und die Menschen längst verschwunden sind. Du maunzt, kratzt an Wänden, wirfst Dinge von Regalen, schläfst auf Tastaturen und machst generell Katzendinge in einer Welt, die nie für dich gebaut wurde. Was Stray jenseits seines Konzepts außergewöhnlich macht, ist wie es durch die Beziehung zwischen der Katze und B-12 — einem kleinen Drohnen-Begleiter, der die Robotersprache übersetzt und langsam die Geschichte der Menschheit enthüllt — echte emotionale Stakes aufbaut. Das Spiel ist kurz (4-6 Stunden), aber vollständig: Es hat einen Anfang, eine Mitte und ein Ende, das emotional landet ohne aufgebläht zu sein. Auf PS5 wunderschön gerendert — die neonbeleuchteten Gassen, die Robotergemeinschaften, die ihrem Alltag nachgehen, die stillen Momente der Wärme inmitten des Verfalls. Absolut wert zum Vollpreis zu spielen; häufig im Sale für 15-20 €.',
    tip_en: "Explore every side path before proceeding through story gates — the game rewards cat curiosity with hidden memories, collectible badges, and small moments of beauty that are easy to miss if you rush. B-12's memories are some of the most affecting content in the game.",
    tip_zh: '在通过故事节点之前，探索每一条支路——游戏以隐藏记忆、可收集徽章和小小的美丽瞬间奖励猫咪的好奇心，如果你赶时间很容易错过。B-12 的记忆是游戏中最感人的内容之一。',
    tip_zhTW: '在通過故事節點之前，探索每一條支路——遊戲以隱藏記憶、可收集徽章和小小的美麗瞬間獎勵貓咪的好奇心，如果你趕時間很容易錯過。B-12 的記憶是遊戲中最感人的內容之一。',
    tip_ja: 'ストーリーゲートを通過する前に、すべての脇道を探索しよう——猫の好奇心には隠された記憶、収集バッジ、見逃しやすい美しい瞬間という報酬がある。急いでいるとすぐに見落とす。B-12の記憶はゲーム中で最も心を打つコンテンツのひとつだ。',
    tip_ko: '스토리 관문을 통과하기 전에 모든 샛길을 탐험하세요 — 게임은 숨겨진 기억, 수집 배지, 서두르면 놓치기 쉬운 작은 아름다운 순간들로 고양이의 호기심에 보상합니다. B-12의 기억은 게임에서 가장 감동적인 콘텐츠 중 하나입니다.',
    tip_de: 'Erkunde jeden Nebenweg, bevor du durch Story-Tore voranschreitest — das Spiel belohnt die Neugier der Katze mit versteckten Erinnerungen, sammelbaren Abzeichen und kleinen Momenten der Schönheit, die leicht zu übersehen sind, wenn du hetzt. B-12s Erinnerungen gehören zum berührendsten Inhalt des Spiels.',
  },
  cattails: {
    title_en: 'Cattails: Wildwood Story',
    title_zh: 'Cattails：野木故事',
    title_zhTW: 'Cattails：野木故事',
    title_ja: 'Cattails: Wildwood Story',
    title_ko: 'Cattails: Wildwood Story',
    title_de: 'Cattails: Wildwood Story',
    emoji: '🐾',
    tag_en: 'Be a cat in a natural world — claim territory, build a colony, hunt prey, and navigate seasonal cat society in a cozy wilderness',
    tag_zh: '成为自然世界中的一只猫——占领领地、建立族群、捕猎猎物、在舒适的野外环境中驾驭季节性的猫族社会',
    tag_zhTW: '成為自然世界中的一隻貓——占領領地、建立族群、捕獵獵物、在舒適的野外環境中駕馭季節性的貓族社會',
    tag_ja: '自然の世界に生きる猫になる——縄張りを確保し、コロニーを築き、獲物を狩り、居心地のいい野生の中で季節ごとの猫社会を渡り歩く',
    tag_ko: '자연 세계의 고양이가 되기 — 영역을 차지하고, 군락을 건설하고, 먹이를 사냥하고, 아늑한 야생 속에서 계절별 고양이 사회를 헤쳐나간다',
    tag_de: 'Sei eine Katze in einer natürlichen Welt — beanspruche Territorium, baue eine Kolonie auf, jage Beute und navigiere durch die saisonale Katzengesellschaft in einer gemütlichen Wildnis',
    platform_en: 'Available on: PC (Steam, Itch.io) — about $12',
    platform_zh: '可在以下平台获取：PC（Steam、Itch.io）——约 12 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、Itch.io）——約 12 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、Itch.io）— 約1,200円',
    platform_ko: '지원 플랫폼: PC(Steam, Itch.io) — 약 12달러',
    platform_de: 'Erhältlich auf: PC (Steam, Itch.io) — ca. 12 €',
    why_en:
      "Cattails: Wildwood Story (2023) is the cat life sim that actually lets you live as a cat with cat priorities. You choose your starting colony, patrol and claim territory in a seasonal forest, hunt mice and birds to sustain your character, form relationships with other cats (including romance and kittens), and build your colony's strength and reputation over time. The game has real stakes in a cozy package: other colonies will encroach on your territory, hunting grounds have limited prey that needs time to repopulate, and the seasons meaningfully change what prey is available and where. The sequel to the original Cattails (2017), it refined the systems and expanded the colony-building depth significantly. At $12, it is one of the best-value games for anyone who has ever wanted a cat life sim that goes beyond cosmetics and actually models a cat's world. The pixel art style is charming and the day/night cycle is satisfying to settle into.",
    why_zh:
      'Cattails：野木故事（2023 年）是真正让你以猫的优先级生活的猫咪生活模拟游戏。你选择起始族群，在季节性森林中巡逻并占领领地，猎取老鼠和鸟类来维持角色状态，与其他猫咪建立关系（包括恋爱和幼崽），随时间建立你族群的实力和声誉。游戏在舒适的包装下有真实的风险：其他族群会侵占你的领地，狩猎场的猎物有限，需要时间补充，季节性变化真实地影响猎物的可获取性和位置。这是原版 Cattails（2017 年）的续作，系统经过改进，族群建设深度显著扩展。12 美元，对于任何曾经想要一款超越外观、真正模拟猫咪世界的猫咪生活模拟游戏的人来说，是性价比最高的游戏之一。像素艺术风格迷人，昼夜循环令人愉快地沉浸其中。',
    why_zhTW:
      'Cattails：野木故事（2023 年）是真正讓你以貓的優先順序生活的貓咪生活模擬遊戲。你選擇起始族群，在季節性森林中巡邏並占領領地，獵取老鼠和鳥類來維持角色狀態，與其他貓咪建立關係（包括戀愛和幼崽），隨時間建立你族群的實力和聲譽。遊戲在舒適的包裝下有真實的風險：其他族群會侵占你的領地，狩獵場的獵物有限，需要時間補充，季節性變化真實地影響獵物的可獲取性和位置。這是原版 Cattails（2017 年）的續作，系統經過改進，族群建設深度顯著擴展。12 美元，對於任何曾經想要一款超越外觀、真正模擬貓咪世界的貓咪生活模擬遊戲的人來說，是性價比最高的遊戲之一。像素藝術風格迷人，晝夜循環令人愉快地沉浸其中。',
    why_ja:
      'Cattails: Wildwood Story（2023年）は、猫の優先順位で本当に生きることができる猫ライフシミュレーターです。スタートするコロニーを選び、季節ごとに変わる森でパトロールしながら縄張りを主張し、ネズミや鳥を狩ってキャラクターを維持し、他の猫と関係を築き（恋愛と子猫も含む）、時間をかけてコロニーの強さと評判を育てます。このゲームは居心地のいい外観の中に本物の緊張感を秘めています：他のコロニーが縄張りを侵食し、狩場の獲物は限られていて回復に時間がかかり、季節の変化が獲物の種類と場所をリアルに変えます。2017年の初代Cattailsの続編で、システムが洗練され、コロニー構築の深みが大幅に増しました。約1,200円という価格で、外観だけでなく猫の世界を本当にモデル化した猫ライフシムを求める人にとって、最もコスパの高いゲームのひとつです。',
    why_ko:
      'Cattails: Wildwood Story（2023）는 실제로 고양이의 우선순위로 살 수 있는 고양이 생활 시뮬레이터입니다. 시작 군락을 선택하고, 계절별 숲에서 순찰하며 영역을 주장하고, 쥐와 새를 사냥해 캐릭터를 유지하고, 다른 고양이들과 관계를 맺으며(연애와 새끼 고양이 포함), 시간이 지나면서 군락의 힘과 명성을 쌓습니다. 아늑한 외관 안에 진짜 위험 부담이 있습니다: 다른 군락이 영역을 침범하고, 사냥터의 먹이는 한정되어 있어 회복에 시간이 걸리며, 계절 변화가 먹이의 종류와 위치를 현실감 있게 바꿉니다. 원작 Cattails(2017)의 후속작으로, 시스템이 개선되고 군락 건설의 깊이가 크게 확장되었습니다. 12달러에 외관을 넘어 고양이 세계를 진정으로 모델링한 고양이 생활 시뮬레이터를 원하는 모든 사람에게 최고의 가성비 게임 중 하나입니다.',
    why_de:
      'Cattails: Wildwood Story (2023) ist der Katzen-Life-Sim, der es dir tatsächlich ermöglicht, als Katze mit Katzenprioritäten zu leben. Du wählst deine Startkolonie, patrouillierst und beanspruchst Territorium in einem saisonalen Wald, jagst Mäuse und Vögel, um deinen Charakter zu erhalten, knüpfst Beziehungen mit anderen Katzen (einschließlich Romanze und Kätzchen) und baust die Stärke und den Ruf deiner Kolonie über die Zeit auf. Das Spiel hat echte Einsätze in einem gemütlichen Paket: Andere Kolonien werden dein Territorium beanspruchen, Jagdgründe haben begrenzte Beute, die Zeit zum Nachwachsen braucht, und die Jahreszeiten verändern bedeutungsvoll, welche Beute verfügbar und wo sie zu finden ist. Als Nachfolger des originalen Cattails (2017) wurden die Systeme verfeinert und die Tiefe des Kolonieaufbaus erheblich erweitert. Für 12 € ist es eines der besten Preis-Leistungs-Spiele für alle, die jemals einen Katzen-Life-Sim wollten, der über Kosmetik hinausgeht und tatsächlich die Katzenwelt modelliert.',
    tip_en: "Prioritize expanding your colony's territory early — more territory means more hunting grounds and more resources to attract other cats to join. Don't neglect the reputation system with the colony leader; high reputation unlocks the best perks for your kittens.",
    tip_zh: '优先早期扩展你族群的领地——更多领地意味着更多狩猎场和更多资源来吸引其他猫咪加入。不要忽视与族群领袖的声誉系统；高声誉可以为你的幼崽解锁最好的天赋。',
    tip_zhTW: '優先早期擴展你族群的領地——更多領地意味著更多狩獵場和更多資源來吸引其他貓咪加入。不要忽視與族群領袖的聲譽系統；高聲譽可以為你的幼貓解鎖最好的天賦。',
    tip_ja: 'コロニーの縄張りを早めに広げることを優先しよう——縄張りが広いほど狩場も多くなり、他の猫を引き込むリソースも増える。コロニーリーダーとの評判システムを軽視しないこと；高評判は子猫に最高のパークを解放する。',
    tip_ko: '군락의 영역을 초반에 확장하는 것을 우선시하세요 — 더 많은 영역은 더 많은 사냥터와 다른 고양이들을 영입할 더 많은 자원을 의미합니다. 군락 지도자와의 평판 시스템을 소홀히 하지 마세요; 높은 평판은 새끼 고양이를 위한 최고의 특전을 해금합니다.',
    tip_de: 'Priorisiere früh die Erweiterung des Territoriums deiner Kolonie — mehr Territorium bedeutet mehr Jagdgründe und mehr Ressourcen, um andere Katzen zum Beitritt zu verleiten. Vernachlässige nicht das Reputationssystem mit dem Kolonieführer; hohe Reputation schaltet die besten Vorteile für deine Kätzchen frei.',
  },
  snufkin: {
    title_en: 'Snufkin: Melody of Moominvalley',
    title_zh: 'Snufkin：姆明谷的旋律',
    title_zhTW: 'Snufkin：姆明谷的旋律',
    title_ja: 'Snufkin: ムーミン谷のメロディ',
    title_ko: 'Snufkin: 무민 계곡의 멜로디',
    title_de: 'Snufkin: Melody of Moominvalley',
    emoji: '🎶',
    tag_en: 'Wander through Tove Jansson\'s hand-drawn Moominvalley as Snufkin — compose melodies, free caged animals, and remind a world under control that it belongs to everyone',
    tag_zh: '以 Snufkin 的身份漫步于托芙·扬松手绘的姆明谷——谱写旋律、解放被关押的动物，提醒一个被管控的世界它属于所有人',
    tag_zhTW: '以 Snufkin 的身份漫步於托芙·楊松手繪的姆明谷——譜寫旋律、解放被關押的動物，提醒一個被管控的世界它屬於所有人',
    tag_ja: 'スナフキンとしてトーベ・ヤンソンの手描きムーミン谷を旅する——メロディを作曲し、閉じ込められた動物たちを解放し、管理された世界にそれが皆のものだと思い出させる',
    tag_ko: 'Snufkin으로서 토베 얀손의 손그림 무민 계곡을 방랑하기 — 멜로디를 작곡하고, 갇힌 동물들을 해방시키고, 통제된 세계에 그것이 모두의 것임을 상기시킨다',
    tag_de: 'Wandere als Snufkin durch Tove Janssons handgezeichnetes Mumintal — komponiere Melodien, befreie gefangene Tiere und erinnere eine kontrollierte Welt daran, dass sie allen gehört',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch — about $25',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch——约 25 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、GOG）、Nintendo Switch——約 25 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、GOG）、Nintendo Switch — 約2,500円',
    platform_ko: '지원 플랫폼: PC(Steam, GOG), Nintendo Switch — 약 25달러',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), Nintendo Switch — ca. 25 €',
    why_en:
      "Snufkin: Melody of Moominvalley (2024) is the most visually faithful Moomin game ever made — Snufkin's world looks exactly like Tove Jansson's original illustrations come to life in gentle watercolor animation. You play as Snufkin, the philosophical wandering traveler of Moominvalley, returning from his winter journey to find that an officious Park Keeper has taken over the valley, planted signs everywhere, and caged the local wildlife. Your gentle adventure involves composing new melodies that charm the animals and help them escape, restoring the valley's freedom one caged creature at a time. The game is deliberately slow and contemplative — Snufkin walks at a leisurely pace, his flute melodies drift through the environment, and the Moomin characters he visits each have their own anxieties about the changed valley. It is a game for people who loved the Moomin books or shows, or who simply want a deeply gentle experience that values slowness and natural freedom over goals and metrics.",
    why_zh:
      'Snufkin：姆明谷的旋律（2024 年）是有史以来视觉上最忠实于姆明的游戏——Snufkin 的世界看起来正是托芙·扬松原版插图以温柔水彩动画呈现的样子。你扮演 Snufkin，姆明谷哲学流浪旅人，从冬季旅程归来，发现一个官僚式的公园管理员已经接管了山谷，到处竖起标牌，关押了当地野生动物。你的温柔冒险包括谱写新旋律来迷住动物们帮助它们逃脱，一次解放一只被关押的生物，恢复山谷的自由。游戏刻意缓慢而沉思——Snufkin 以悠闲的步伐行走，他的长笛旋律飘荡在环境中，他拜访的姆明角色们各自对改变的山谷有着自己的忧虑。这是一款为喜爱姆明书籍或电视剧的人，或者只是想要一段深度温柔体验的人设计的游戏，它重视慢节奏和自然自由，而不是目标和指标。',
    why_zhTW:
      'Snufkin：姆明谷的旋律（2024 年）是有史以來視覺上最忠實於姆明的遊戲——Snufkin 的世界看起來正是托芙·楊松原版插圖以溫柔水彩動畫呈現的樣子。你扮演 Snufkin，姆明谷哲學流浪旅人，從冬季旅程歸來，發現一個官僚式的公園管理員已經接管了山谷，到處豎起標牌，關押了當地野生動物。你的溫柔冒險包括譜寫新旋律來迷住動物們幫助它們逃脫，一次解放一隻被關押的生物，恢復山谷的自由。遊戲刻意緩慢而沉思——Snufkin 以悠閒的步伐行走，他的長笛旋律飄盪在環境中，他拜訪的姆明角色們各自對改變的山谷有著自己的憂慮。這是一款為喜愛姆明書籍或電視劇的人，或者只是想要一段深度溫柔體驗的人設計的遊戲，它重視慢節奏和自然自由，而不是目標和指標。',
    why_ja:
      'Snufkin: ムーミン谷のメロディ（2024年）は、今まで作られた中で最もビジュアル的にムーミンに忠実なゲームです——スナフキンの世界は、トーベ・ヤンソンのオリジナルイラストが穏やかな水彩アニメで生き生きと動き出したそのままです。哲学的な旅人であるスナフキンとして、冬の旅から戻ると、権威的な公園管理人が谷を乗っ取り、至る所に立て看板を立て、地元の野生動物を檻に入れているのを発見します。やさしい冒険は、動物たちを魅了して逃げ出せるよう新しいメロディを作曲し、一匹ずつ解放して谷の自由を取り戻すことです。ゲームは意図的にゆっくりと内省的です——スナフキンはゆっくり歩き、フルートのメロディが環境に漂い、彼が訪れるムーミンキャラクターたちはそれぞれ変わった谷への不安を抱えています。ムーミンの本やアニメが好きな人、あるいはただ目標や数字より遅さと自然の自由を大切にする深くやさしい体験を求める人のためのゲームです。',
    why_ko:
      'Snufkin: 무민 계곡의 멜로디（2024）는 지금껏 만들어진 게임 중 시각적으로 무민에 가장 충실한 작품입니다 — 스나푸킨의 세계는 토베 얀손의 원작 삽화가 부드러운 수채화 애니메이션으로 살아 움직이는 그대로입니다. 무민 계곡의 철학적 방랑자 스나푸킨으로서 겨울 여행에서 돌아와 보니, 권위적인 공원 관리인이 계곡을 장악하여 곳곳에 표지판을 세우고 현지 야생 동물들을 가둬놓았습니다. 당신의 부드러운 모험은 동물들을 매혹시켜 탈출할 수 있도록 새 멜로디를 작곡하고, 한 번에 한 마리씩 갇힌 생물을 해방시켜 계곡의 자유를 되찾는 것입니다. 게임은 의도적으로 느리고 성찰적입니다 — 스나푸킨은 여유롭게 걷고, 플루트 멜로디가 환경 속에 떠돌며, 그가 만나는 무민 캐릭터들은 각자 변한 계곡에 대한 걱정을 안고 있습니다. 무민 책이나 애니메이션을 좋아하거나, 목표와 수치보다 느림과 자연의 자유를 소중히 여기는 깊이 있고 부드러운 경험을 원하는 사람들을 위한 게임입니다.',
    why_de:
      'Snufkin: Melody of Moominvalley (2024) ist das visuell treueste Muminspiel, das je gemacht wurde — Snufkins Welt sieht genau so aus, wie Tove Janssons Originalillustrationen in sanfter Aquarellanimation zum Leben erwachen. Du spielst als Snufkin, den philosophischen Wanderer des Mumintalles, der von seiner Winterreise zurückkehrt und feststellt, dass ein bürokratischer Parkwächter das Tal übernommen, überall Schilder aufgestellt und die einheimischen Wildtiere eingesperrt hat. Dein sanftes Abenteuer besteht darin, neue Melodien zu komponieren, die die Tiere bezaubern und ihnen helfen zu entkommen, und die Freiheit des Tals wiederherzustellen — ein gefangenes Geschöpf nach dem anderen. Das Spiel ist bewusst langsam und kontemplativ — Snufkin wandert in gemächlichem Tempo, seine Flötenmelodien driften durch die Umgebung, und die Mumincharaktere, die er besucht, haben jeweils ihre eigenen Sorgen über das veränderte Tal. Es ist ein Spiel für Menschen, die die Muminbücher oder -serien liebten, oder die schlicht ein tief sanftes Erlebnis wollen, das Langsamkeit und natürliche Freiheit über Ziele und Metriken stellt.',
    tip_en: "Let the music guide you — when Snufkin hums or the environment music shifts, it usually signals something nearby worth investigating. The game rewards wandering off the obvious path; some of the most charming moments are found by simply exploring.",
    tip_zh: '让音乐引导你——当 Snufkin 哼唱或环境音乐改变时，通常意味着附近有值得探索的东西。游戏奖励偏离明显路径的漫游；一些最迷人的时刻只需探索就能找到。',
    tip_zhTW: '讓音樂引導你——當 Snufkin 哼唱或環境音樂改變時，通常意味著附近有值得探索的東西。遊戲獎勵偏離明顯路徑的漫遊；一些最迷人的時刻只需探索就能找到。',
    tip_ja: '音楽に導かれよう——スナフキンが鼻歌を歌ったり、環境音楽が変わったりしたら、たいてい近くに調べる価値があるものがある。明らかな道から外れたところを探索することで報酬が得られる；最も魅力的な瞬間のいくつかは、ただ歩き回ることで見つかる。',
    tip_ko: '음악이 안내하도록 두세요 — 스나푸킨이 흥얼거리거나 환경 음악이 바뀔 때, 보통 근처에 조사할 만한 것이 있다는 신호입니다. 게임은 명확한 경로에서 벗어난 탐험을 보상합니다; 가장 매력적인 순간들 중 일부는 단순히 돌아다닌 것으로 발견됩니다.',
    tip_de: 'Lass die Musik dich führen — wenn Snufkin summt oder sich die Umgebungsmusik verändert, signalisiert das meistens etwas Untersuchenswertes in der Nähe. Das Spiel belohnt das Verlassen des offensichtlichen Pfades; manche der charmantesten Momente findet man einfach durch Erkunden.',
  },
  pupperazzi: {
    title_en: 'Pupperazzi',
    title_zh: 'Pupperazzi',
    title_zhTW: 'Pupperazzi',
    title_ja: 'Pupperazzi',
    title_ko: 'Pupperazzi',
    title_de: 'Pupperazzi',
    emoji: '📸',
    tag_en: 'Photograph dogs in a dog-centric world — every breed, every expression, zero pressure, infinite delight',
    tag_zh: '在一个以狗为中心的世界里为狗狗拍照——每一个品种、每一个表情、零压力、无限喜悦',
    tag_zhTW: '在一個以狗為中心的世界裡為狗狗拍照——每一個品種、每一個表情、零壓力、無限喜悅',
    tag_ja: '犬中心の世界で犬たちを撮影する——あらゆる犬種、あらゆる表情、プレッシャーゼロ、無限の喜び',
    tag_ko: '강아지 중심의 세계에서 강아지들을 촬영하기 — 모든 품종, 모든 표정, 제로 압박, 무한한 기쁨',
    tag_de: 'Fotografiere Hunde in einer hundezentrierten Welt — jede Rasse, jeder Ausdruck, null Druck, unendliche Freude',
    platform_en: 'Available on: PC (Steam), Xbox, Game Pass — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox、Game Pass——约 15 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Xbox、Game Pass——約 15 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Xbox、Game Pass — 約1,500円',
    platform_ko: '지원 플랫폼: PC(Steam), Xbox, Game Pass — 약 15달러',
    platform_de: 'Erhältlich auf: PC (Steam), Xbox, Game Pass — ca. 15 €',
    why_en:
      "Pupperazzi (2022) is the purest possible expression of a simple idea: a world full of dogs who want you to photograph them, and a camera that makes it easy. There is no danger, no fail state, no time pressure, no resource management. You are a sentient camera at ground level in an exuberant stylized world where dogs have human occupations, dog parks are the cultural centers, and dog celebrities exist. Your only job is to wander, notice, react, and take photos. The more photos you take of certain dogs, the more their social media following grows; you unlock new areas as your photography reputation builds. The game has a specific sense of humor — all the signs, social media posts, and dog celebrity names are gently absurdist in the tradition of Untitled Goose Game. It is available on Game Pass, which makes it essentially free to try. At 3-4 hours for the main content, it is a perfect palate cleanser after something emotionally heavy. Not a deep game, and not trying to be — it is exactly what it says on the box.",
    why_zh:
      'Pupperazzi（2022 年）是对一个简单想法最纯粹的表达：一个充满想让你拍照的狗狗的世界，还有一台让一切变得容易的相机。没有危险、没有失败状态、没有时间压力、没有资源管理。你是一台有感知的相机，在一个欢快程式化的世界中贴地行走，在那里狗狗们有人类的职业，狗狗公园是文化中心，狗狗名人也存在。你唯一的工作是漫游、注意、反应和拍照。你拍摄某些狗狗的照片越多，它们的社交媒体粉丝就越多；随着你的摄影声誉建立，你解锁新区域。游戏有一种特定的幽默感——所有的标牌、社交媒体帖子和狗狗名人名字都是温和荒诞主义的，类似于 Untitled Goose Game 的风格。它在 Game Pass 上可用，这使得试玩基本上是免费的。主要内容约 3-4 小时，是某些情感沉重内容后完美的口味调节剂。不是一款深度游戏，也没有尝试成为——它完全是标题所表达的。',
    why_zhTW:
      'Pupperazzi（2022 年）是對一個簡單想法最純粹的表達：一個充滿想讓你拍照的狗狗的世界，還有一台讓一切變得容易的相機。沒有危險、沒有失敗狀態、沒有時間壓力、沒有資源管理。你是一台有感知的相機，在一個歡快程式化的世界中貼地行走，在那裡狗狗們有人類的職業，狗狗公園是文化中心，狗狗名人也存在。你唯一的工作是漫遊、注意、反應和拍照。你拍攝某些狗狗的照片越多，它們的社群媒體粉絲就越多；隨著你的攝影聲譽建立，你解鎖新區域。遊戲有一種特定的幽默感——所有的標牌、社群媒體貼文和狗狗名人名字都是溫和荒誕主義的，類似於 Untitled Goose Game 的風格。它在 Game Pass 上可用，這使得試玩基本上是免費的。主要內容約 3-4 小時，是某些情感沉重內容後完美的口味調節劑。不是一款深度遊戲，也沒有嘗試成為——它完全是標題所表達的。',
    why_ja:
      'Pupperazzi（2022年）は、シンプルなアイデアの最も純粋な表現です：犬たちが写真を撮ってほしがっている世界と、それを簡単にするカメラ。危険なし、ゲームオーバーなし、時間のプレッシャーなし、リソース管理なし。あなたは地面の高さを歩く知覚を持ったカメラで、犬たちが人間の職業を持ち、ドッグパークが文化の中心地で、犬のセレブが存在する活気あるスタイリッシュな世界を歩き回ります。あなたの唯一の仕事は、さまよい、気づき、反応して、写真を撮ること。特定の犬の写真をたくさん撮るほど、そのSNSフォロワーが増えていく；撮影の評判が上がるにつれて新しいエリアが解放される。ゲームには独特のユーモアがある——すべての看板、SNS投稿、犬のセレブの名前が、Untitled Goose Gameの流れを汲む穏やかな不条理主義です。Game Passでプレイできるので、実質無料で試せます。メインコンテンツは3〜4時間で、感情的に重いゲームの後の完璧な口直しに。深いゲームではなく、そうしようともしていません——まさにパッケージに書かれているそのままです。',
    why_ko:
      'Pupperazzi（2022）는 단순한 아이디어의 가장 순수한 표현입니다: 당신이 사진 찍어주길 원하는 강아지들로 가득한 세계와, 그것을 쉽게 만드는 카메라. 위험도 없고, 실패 상태도 없고, 시간 압박도 없고, 자원 관리도 없습니다. 당신은 강아지들이 인간의 직업을 갖고, 강아지 공원이 문화 중심지이며, 강아지 유명인이 존재하는 활기찬 스타일화된 세계를 지면 높이에서 걸어다니는 지각 있는 카메라입니다. 당신의 유일한 임무는 돌아다니고, 알아차리고, 반응하고, 사진을 찍는 것입니다. 특정 강아지의 사진을 더 많이 찍을수록 그 SNS 팔로워가 늘어나고; 촬영 명성이 쌓이면서 새로운 구역이 해금됩니다. 게임에는 특유의 유머 감각이 있습니다 — 모든 표지판, SNS 게시물, 강아지 유명인 이름이 Untitled Goose Game 전통의 온화한 부조리주의입니다. Game Pass에서 이용 가능하여 사실상 무료로 시도할 수 있습니다. 메인 콘텐츠는 약 3-4시간으로, 감정적으로 무거운 것 이후 완벽한 입맛 청소제입니다. 깊이 있는 게임이 아니며, 그렇게 되려고 하지도 않습니다 — 정확히 라벨에 쓰인 그대로입니다.',
    why_de:
      'Pupperazzi (2022) ist der reinste mögliche Ausdruck einer einfachen Idee: eine Welt voller Hunde, die fotografiert werden möchten, und eine Kamera, die es leicht macht. Keine Gefahr, kein Scheitern, kein Zeitdruck, kein Ressourcenmanagement. Du bist eine empfindende Kamera auf Bodenniveau in einer ausgelassenen, stilisierten Welt, in der Hunde menschliche Berufe haben, Hundeparks die Kulturzentren sind und Hunde-Celebrities existieren. Deine einzige Aufgabe ist es, zu wandern, wahrzunehmen, zu reagieren und Fotos zu machen. Je mehr Fotos du von bestimmten Hunden machst, desto größer wird ihre Social-Media-Fangemeinde; mit wachsendem Fotografie-Ruf schaltest du neue Gebiete frei. Das Spiel hat einen bestimmten Humor — alle Schilder, Social-Media-Beiträge und Hunde-Celebrity-Namen sind sanft absurdistisch im Stil von Untitled Goose Game. Es ist auf Game Pass verfügbar, was es im Grunde kostenlos zum Ausprobieren macht. Mit 3-4 Stunden Hauptinhalt ist es ein perfekter Gaumenerfrischer nach etwas emotional Schwerem. Kein tiefgründiges Spiel, und es versucht auch keines zu sein — es ist genau das, was auf der Packung steht.',
    tip_en: "Fill your camera roll with variety — the game rewards photographing many different dogs in many different situations (mid-action, sleeping, with props, in groups). Specializing in one dog's fame too early slows your area unlocks. Be a generalist paparazzi first.",
    tip_zh: '用多样性填满你的相机胶卷——游戏奖励在许多不同情况下（动作中、睡觉时、带道具、成群结队）拍摄许多不同的狗狗。过早专注于一只狗的名气会减慢你的区域解锁速度。首先成为一个通才狗仔队。',
    tip_zhTW: '用多樣性填滿你的相機膠卷——遊戲獎勵在許多不同情況下（動作中、睡覺時、帶道具、成群結隊）拍攝許多不同的狗狗。過早專注於一隻狗的名氣會減慢你的區域解鎖速度。首先成為一個通才狗仔隊。',
    tip_ja: 'カメラロールをバリエーション豊かに埋めよう——様々な場面（動き回っている、寝ている、小道具と一緒、グループで）で様々な犬を撮影すると報酬がもらえる。一匹の犬の名声に早くから集中しすぎると、エリア解放が遅くなる。まずはジェネラリストのパパラッチになろう。',
    tip_ko: '다양성으로 카메라 롤을 채우세요 — 게임은 다양한 상황(행동 중, 자는 중, 소품과 함께, 그룹으로)에서 다양한 강아지들을 촬영하는 것을 보상합니다. 너무 일찍 한 강아지의 명성에 집중하면 구역 해금이 느려집니다. 먼저 만능 파파라치가 되세요.',
    tip_de: 'Fülle deine Kamerarolle mit Abwechslung — das Spiel belohnt das Fotografieren vieler verschiedener Hunde in vielen verschiedenen Situationen (mitten in der Aktion, schlafend, mit Requisiten, in Gruppen). Zu frühes Spezialisieren auf die Bekanntheit eines Hundes verlangsamt deine Gebietsfreischaltungen. Sei zuerst ein Generalist-Paparazzi.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { stray: 0, cattails: 0, snufkin: 0, pupperazzi: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyAnimalGamesQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-play-as-animal`
    const shareText = locale === 'zh'
      ? `Cozy 动物游戏测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : locale === 'zh-TW'
      ? `Cozy 動物遊戲測驗結果：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`
      : locale === 'ja'
      ? `コージーアニマルゲームクイズ結果：「${result.title_ja}」！${result.tag_ja}。あなたの結果はこちら：${url}`
      : locale === 'ko'
      ? `코지 동물 게임 퀴즈 결과：「${result.title_ko}」！${result.tag_ko}。나의 결과：${url}`
      : locale === 'de'
      ? `Mein gemütliches Tierspiel ist ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`
      : `My cozy animal game is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {getLoc('上手小贴士：', 'Getting started: ', '上手小貼士：', 'はじめのコツ：', '시작 팁：', 'Erste Schritte: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把游戏里的生活节奏带入真实日常。',
              'TendFarm is building a farm rhythm tracker — bringing the rhythm of game life into real daily life.',
              'TendFarm 正在研發農場節律追蹤功能——把遊戲裡的生活節奏帶入真實日常。',
              'TendFarmは農場リズムトラッカーを開発中——ゲームの中の生活リズムを現実の日常へ。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 게임 속 생활 리듬을 현실 일상으로 가져오다.',
              'TendFarm entwickelt gerade einen Farm-Rhythmus-Tracker — der Rhythmus des Spiellebens ins echte Alltagsleben.',
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
            '哪款 Cozy 动物游戏最适合你？',
            'Which Cozy Animal Game Is Right for You?',
            '哪款 Cozy 動物遊戲最適合你？',
            'あなたにぴったりのコージーアニマルゲームは？',
            '어떤 코지 동물 게임이 당신에게 맞나요?',
            'Welches gemütliche Tierspiel passt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从 Stray、Cattails、Snufkin 和 Pupperazzi 中找到你的动物游戏伴侣',
            '6 questions to match you with Stray, Cattails: Wildwood Story, Snufkin: Melody of Moominvalley, or Pupperazzi',
            '6 個問題，從 Stray、Cattails、Snufkin 和 Pupperazzi 中找到你的動物遊戲伴侶',
            '6問であなたにぴったりのゲーム——Stray、Cattails: Wildwood Story、Snufkin: ムーミン谷のメロディ、またはPupperazziを見つけよう',
            '6가지 질문으로 Stray, Cattails: Wildwood Story, Snufkin: 무민 계곡의 멜로디, 또는 Pupperazzi 중 당신의 게임을 찾아보세요',
            '6 Fragen, um dein passendes Spiel zu finden — Stray, Cattails: Wildwood Story, Snufkin: Melody of Moominvalley oder Pupperazzi',
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
        {getLoc('找到我的动物游戏', 'Find My Animal Game', '找到我的動物遊戲', '私の動物ゲームを見つける', '내 동물 게임 찾기', 'Mein Tierspiel finden')}
      </button>
    </div>
  )
}
