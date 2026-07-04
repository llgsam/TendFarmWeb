'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'nms' | 'terraria' | 'astroneer' | 'subnautica'

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
    q_en: 'What draws you most about a bigger open world?',
    q_zh: '更广阔的开放世界中，什么最吸引你？',
    q_zhTW: '更廣闊的開放世界中，什麼最吸引你？',
    q_ja: '広大なオープンワールドで一番惹かれるのはどんな要素ですか？',
    q_ko: '더 넓은 오픈 월드에서 가장 끌리는 요소는 무엇인가요？',
    q_de: 'Was zieht dich am meisten an einer größeren offenen Welt an?',
    options: [
      {
        en: 'Visiting an effectively infinite number of alien planets, each with different biomes, creatures, and resources — a universe I could never fully see',
        zh: '探访数量近乎无限的外星星球，每个都有不同的生态系统、生物和资源——一个我永远无法完全游历的宇宙',
        zhTW: '探訪數量近乎無限的外星星球，每個都有不同的生態系統、生物和資源——一個我永遠無法完全遊歷的宇宙',
        ja: 'ほぼ無限の数の異星を巡る旅——それぞれ異なる生態系、生き物、資源があり、一生かけても全部は回りきれない宇宙',
        ko: '사실상 무한한 수의 외계 행성을 방문하는 것——각각 다른 생태계, 생물, 자원이 있어 평생 다 돌아다닐 수 없는 우주',
        de: 'Eine nahezu unendliche Anzahl fremder Planeten besuchen, jeder mit anderen Biomen, Kreaturen und Ressourcen — ein Universum, das ich niemals vollständig erkunden könnte',
        type: 'nms',
      },
      {
        en: 'Digging deeper and deeper into the earth, uncovering layer after layer of a world packed with secrets, ores, and increasingly dangerous creatures',
        zh: '越挖越深入地下，一层一层揭开一个充满秘密、矿石和越来越危险生物的世界',
        zhTW: '越挖越深入地下，一層一層揭開一個充滿秘密、礦石和越來越危險生物的世界',
        ja: '地下へどんどん掘り進み、秘密や鉱石、どんどん危険になる生き物が詰まった世界を層ごとに明かしていく',
        ko: '땅속으로 점점 더 깊이 파고들어, 비밀과 광석, 점점 더 위험한 생물들로 가득 찬 세계를 한 층씩 밝혀가는 것',
        de: 'Immer tiefer in die Erde graben und Schicht für Schicht eine Welt voller Geheimnisse, Erze und immer gefährlicherer Kreaturen entdecken',
        type: 'terraria',
      },
      {
        en: 'Building charming bases on colorful alien planets using a satisfying snap-together construction system, with minimal survival pressure',
        zh: '使用令人满足的拼接建造系统在多彩的外星星球上建造迷人的基地，生存压力极小',
        zhTW: '使用令人滿足的拼接建造系統在多彩的外星星球上建造迷人的基地，生存壓力極小',
        ja: '快適なスナップ式建設システムで色鮮やかな異星にベースを作る、生存プレッシャーがほぼないので気楽に楽しめる',
        ko: '만족스러운 스냅 방식 건설 시스템으로 알록달록한 외계 행성에 멋진 기지를 짓는 것, 생존 압박이 거의 없음',
        de: 'Auf bunten Alienplaneten mit einem befriedigenden Bausystem charmante Basen errichten — mit minimalem Überlebensdruck',
        type: 'astroneer',
      },
      {
        en: 'Exploring a deep ocean mystery while managing my oxygen and food, piecing together what happened and what lives in the dark below',
        zh: '在管理氧气和食物的同时探索深海谜题，拼凑出发生了什么以及黑暗深处住着什么',
        zhTW: '在管理氧氣和食物的同時探索深海謎題，拼湊出發生了什麼以及黑暗深處住著什麼',
        ja: '酸素や食料を管理しながら深海の謎を探索し、何が起きたのか、暗闇の底に何が棲んでいるのかを解き明かす',
        ko: '산소와 식량을 관리하면서 깊은 바다의 미스터리를 탐험하고, 무슨 일이 있었는지, 어둠 속 깊은 곳에 무엇이 사는지 조각조각 맞춰가는 것',
        de: 'Ein tiefes Ozeanmysterium erkunden und dabei Sauerstoff und Nahrung im Blick behalten, um herauszufinden was passiert ist und was in der Dunkelheit lauert',
        type: 'subnautica',
      },
    ],
  },
  {
    q_en: 'How much challenge do you want the game to offer?',
    q_zh: '你希望游戏提供多大程度的挑战？',
    q_zhTW: '你希望遊戲提供多大程度的挑戰？',
    q_ja: 'ゲームにどれくらいの難しさを求めますか？',
    q_ko: '게임이 얼마나 어렵길 원하시나요？',
    q_de: 'Wie viel Herausforderung soll das Spiel bieten?',
    options: [
      {
        en: 'Fully adjustable — I can set difficulty to pure exploration with no survival pressure, or add challenge if I want it',
        zh: '完全可调节——我可以将难度设置为纯粹探索，不需要生存压力，或者在想要时增加挑战',
        zhTW: '完全可調節——可以設置為純粹探索，不需要生存壓力，或者在想要時增加挑戰',
        ja: '自由に調整できるのがいい——生存プレッシャーゼロの純粋探索モードから、歯応えのある難しさまで自分で設定したい',
        ko: '완전히 조절 가능하면 좋겠어요——생존 압박 없는 순수 탐험 모드부터 도전적인 난이도까지 내가 설정하고 싶어요',
        de: 'Vollständig anpassbar — ich kann die Schwierigkeit auf reine Erkundung ohne Überlebensdruck setzen oder bei Bedarf mehr Challenge hinzufügen',
        type: 'nms',
      },
      {
        en: 'Moderate to high — I want meaningful combat encounters and a progression of bosses that actually test my skill and preparation',
        zh: '中等到高——我想要有意义的战斗遭遇和真正测试我技巧和准备程度的 Boss 进展',
        zhTW: '中等到高——想要有意義的戰鬥遭遇和真正測試技巧和準備程度的 Boss 進展',
        ja: '中〜高めが好き——ちゃんと技術と準備が問われるボス戦と、意味のある戦闘を楽しみたい',
        ko: '중간에서 높음——실력과 준비가 실제로 시험받는 의미 있는 전투와 보스 공략을 원해요',
        de: 'Mittel bis hoch — ich möchte bedeutungsvolle Kämpfe und eine Abfolge von Bossen, die echtes Geschick und Vorbereitung erfordern',
        type: 'terraria',
      },
      {
        en: 'Low to moderate — I want a satisfying sense of progress without the game punishing me for mistakes',
        zh: '低到中等——我想要满足的进步感，而不是游戏因我的错误惩罚我',
        zhTW: '低到中等——想要滿足的進步感，而不是遊戲因錯誤懲罰我',
        ja: '低〜中くらい——ミスしても詰められることなく、着実に進んでいく達成感を味わいたい',
        ko: '낮음에서 중간——실수해도 벌받지 않고 꾸준한 성장의 만족감을 느끼고 싶어요',
        de: 'Gering bis mittel — ich möchte ein befriedigendes Gefühl von Fortschritt, ohne für Fehler bestraft zu werden',
        type: 'astroneer',
      },
      {
        en: 'Tension is exactly right — I want the unknown to feel genuinely threatening, with moments of real fear mixed into the exploration',
        zh: '张力恰到好处——我希望未知感觉真正具有威胁性，探索中混入真实的恐惧时刻',
        zhTW: '張力恰到好處——希望未知感覺真正具有威脅性，探索中混入真實的恐懼時刻',
        ja: '絶妙な緊張感——未知のものが本当に恐ろしく感じられて、探索の合間にリアルな恐怖を体験したい',
        ko: '딱 적당한 긴장감——알 수 없는 것이 진짜 위협적으로 느껴지고, 탐험 중에 진짜 공포 순간이 섞여 있길 원해요',
        de: 'Genau die richtige Spannung — das Unbekannte soll sich wirklich bedrohlich anfühlen, mit echten Gänsehautmomenten beim Erkunden',
        type: 'subnautica',
      },
    ],
  },
  {
    q_en: 'Which type of world depth appeals to you most?',
    q_zh: '哪种世界深度对你最有吸引力？',
    q_zhTW: '哪種世界深度對你最有吸引力？',
    q_ja: 'どんなタイプの世界の「深さ」に惹かれますか？',
    q_ko: '어떤 종류의 세계 깊이감에 끌리시나요？',
    q_de: 'Welche Art von Weltentiefe reizt dich am meisten?',
    options: [
      {
        en: 'Horizontal infinity — I want more planets than I could ever visit, each one a new scene to discover and photograph',
        zh: '水平无限——我想要比我能游历的更多的星球，每一个都是要发现和拍照的新场景',
        zhTW: '水平無限——想要比我能遊歷的更多的星球，每一個都是要發現和拍照的新場景',
        ja: '横方向の無限さ——一生かけても回りきれないほど多くの星があって、どこへ行っても新しい発見と写真チャンスがほしい',
        ko: '수평적 무한함——평생 다 돌아다닐 수 없을 만큼 많은 행성이 있고, 어디서든 새로운 발견과 사진 찍을 거리가 있었으면 해요',
        de: 'Horizontale Unendlichkeit — mehr Planeten als ich je besuchen könnte, jeder ein neues Szenario zum Entdecken und Fotografieren',
        type: 'nms',
      },
      {
        en: 'Vertical depth in one world — I want to mine from the surface to the bottom of the world and find entirely different environments at each depth level',
        zh: '单个世界的垂直深度——我想从地表挖到世界底部，在每个深度层次发现完全不同的环境',
        zhTW: '單個世界的垂直深度——想從地表挖到世界底部，在每個深度層次發現完全不同的環境',
        ja: '一つの世界の縦の深さ——地表から世界の底まで掘り進めて、深度ごとにまったく違う環境を見つけたい',
        ko: '하나의 세계의 수직 깊이——지표면에서 세계 밑바닥까지 파고들어, 각 깊이마다 완전히 다른 환경을 발견하고 싶어요',
        de: 'Vertikale Tiefe in einer Welt — von der Oberfläche bis zum Weltboden graben und auf jeder Tiefenebene völlig andere Umgebungen finden',
        type: 'terraria',
      },
      {
        en: 'Both, gently — I want to explore in any direction without feeling overwhelmed, with the planet itself being charming regardless of which way I go',
        zh: '两者兼有，但温和——我想向任何方向探索而不感到不知所措，星球本身无论我往哪里走都很迷人',
        zhTW: '兩者兼有，但溫和——想向任何方向探索而不感到不知所措，星球本身無論往哪裡走都很迷人',
        ja: '両方あるけど穏やかに——どの方向に進んでも圧倒されず、星そのものがどこでも魅力的であってほしい',
        ko: '둘 다이지만 부드럽게——어느 방향으로 가도 압도되지 않고, 행성 자체가 어디로 가든 매력적이었으면 해요',
        de: 'Beides, aber sanft — in jede Richtung erkunden ohne überfordert zu werden, der Planet selbst ist überall charmant',
        type: 'astroneer',
      },
      {
        en: 'Downward into the dark — the deeper I go in the ocean, the stranger and more beautiful things become, and that tension is exactly what I want',
        zh: '向下进入黑暗——在海洋中越深，事物变得越奇异和美丽，这种张力正是我想要的',
        zhTW: '向下進入黑暗——在海洋中越深，事物變得越奇異和美麗，這種張力正是我想要的',
        ja: '下へ、暗闇へ——深海へ行くほど奇妙で美しくなり、その緊張感こそが求めているもの',
        ko: '아래로, 어둠 속으로——바다 깊이 갈수록 더 신기하고 아름다워지는 그 긴장감이 바로 내가 원하는 것',
        de: 'Hinunter ins Dunkle — je tiefer im Ozean, desto fremder und schöner wird es, genau diese Spannung will ich erleben',
        type: 'subnautica',
      },
    ],
  },
  {
    q_en: 'Which visual world sounds most appealing to you?',
    q_zh: '哪个视觉世界对你最有吸引力？',
    q_zhTW: '哪個視覺世界對你最有吸引力？',
    q_ja: 'どんなビジュアルの世界に一番惹かれますか？',
    q_ko: '어떤 시각적 세계가 가장 마음에 드시나요？',
    q_de: 'Welche visuelle Welt klingt am verlockendsten für dich?',
    options: [
      {
        en: 'Painterly alien landscapes in vivid colors — sci-fi concept art brought to life, with unique flora, fauna, and atmospheric conditions on each planet',
        zh: '鲜艳色彩的绘画风格外星景观——科幻概念艺术活现，每个星球都有独特的植物、动物和大气条件',
        zhTW: '鮮豔色彩的繪畫風格外星景觀——科幻概念藝術活現，每個星球都有獨特的植物、動物和大氣條件',
        ja: '絵画的な異星の風景を鮮やかな色で——SFコンセプトアートが生きているようで、星ごとに独自の植物・生物・大気条件がある',
        ko: '선명한 색채의 회화 스타일 외계 풍경——SF 콘셉트 아트가 살아 움직이는 것 같고, 각 행성마다 독특한 식물, 동물, 대기 조건이 있는',
        de: 'Malerische Alienlandschaften in lebhaften Farben — Sci-Fi-Konzeptkunst zum Leben erweckt, mit einzigartiger Flora, Fauna und atmosphärischen Bedingungen auf jedem Planeten',
        type: 'nms',
      },
      {
        en: 'A pixel-art world packed with environmental storytelling — especially underground, where each biome has its own tile set, creatures, and musical theme',
        zh: '充满环境叙事的像素艺术世界——尤其是地下，每个生物群落都有自己的瓦片组、生物和音乐主题',
        zhTW: '充滿環境敘事的像素藝術世界——尤其是地下，每個生物群落都有自己的瓦片組、生物和音樂主題',
        ja: '環境で語るピクセルアートの世界——特に地下で、バイオームごとに独自のタイルセット、敵キャラ、BGMがある',
        ko: '환경으로 이야기를 전하는 픽셀 아트 세계——특히 지하에서 각 생물 군계마다 고유한 타일 세트, 생물, 음악 테마가 있는',
        de: 'Eine Pixel-Art-Welt voller Umgebungsgeschichten — besonders unterirdisch, wo jedes Biom ein eigenes Tileset, Kreaturen und Musikthema hat',
        type: 'terraria',
      },
      {
        en: 'A colorful, rounded cartoon aesthetic where alien minerals look like giant gummy candies and the planet surface glows with soft, inviting colors',
        zh: '多彩圆润的卡通美学，外星矿物看起来像巨大的软糖，星球表面发着柔和迷人的光芒',
        zhTW: '多彩圓潤的卡通美學，外星礦物看起來像巨大的軟糖，星球表面發著柔和迷人的光芒',
        ja: '丸みのあるカラフルなカートゥーン調——異星の鉱物が巨大なグミキャンディーみたいで、星の表面が柔らかく光り輝いている',
        ko: '둥글둥글한 컬러풀한 카툰 미학——외계 광물이 거대한 젤리 캔디 같고 행성 표면이 부드럽고 초대하는 듯한 색으로 빛나는',
        de: 'Eine bunte, abgerundete Cartoon-Ästhetik, bei der fremde Mineralien wie riesige Gummibonbons aussehen und die Planetenoberfläche in weichen, einladenden Farben leuchtet',
        type: 'astroneer',
      },
      {
        en: 'An underwater world where bioluminescent creatures light the darkness, coral formations create alien cathedrals, and every descent reveals something I have never seen',
        zh: '一个生物发光生物照亮黑暗的水下世界，珊瑚形成外星大教堂，每次下潜都揭示我从未见过的东西',
        zhTW: '一個生物發光生物照亮黑暗的水下世界，珊瑚形成外星大教堂，每次下潛都揭示我從未見過的東西',
        ja: '生物発光の生き物が暗闇を照らす水中世界——珊瑚が異星の大聖堂を作り、潜るたびに見たことのないものが現れる',
        ko: '생물발광 생물들이 어둠을 밝히는 수중 세계——산호가 외계 대성당을 형성하고 잠수할 때마다 본 적 없는 것을 발견하는',
        de: 'Eine Unterwasserwelt, in der biolumineszierende Wesen die Dunkelheit erhellen, Korallenformationen fremdartige Kathedralen bilden und jeder Abstieg etwas Neues enthüllt',
        type: 'subnautica',
      },
    ],
  },
  {
    q_en: 'What is your relationship with building bases in games?',
    q_zh: '你与游戏中建造基地的关系是什么？',
    q_zhTW: '你與遊戲中建造基地的關係是什麼？',
    q_ja: 'ゲームでベース建設はどんな立ち位置が好みですか？',
    q_ko: '게임에서 기지 건설과의 관계는 어떤가요？',
    q_de: 'Was ist deine Beziehung zum Basenbau in Spielen?',
    options: [
      {
        en: 'I want to build a home base on one planet and then use it as a staging point to explore dozens of others — the base is part of a larger journey',
        zh: '我想在一个星球上建立家园基地，然后用它作为探索数十个其他星球的起点——基地是更大旅程的一部分',
        zhTW: '想在一個星球上建立家園基地，然後用它作為探索數十個其他星球的起點——基地是更大旅程的一部分',
        ja: '一つの星に拠点を作って、そこを足がかりに何十もの星を探索したい——拠点は大きな旅の一部',
        ko: '한 행성에 홈 기지를 만들고 수십 개의 다른 행성을 탐험하는 출발점으로 쓰고 싶어요——기지는 더 큰 여정의 일부예요',
        de: 'Ich möchte auf einem Planeten eine Heimatbasis errichten und sie als Ausgangspunkt für Dutzende anderer Planeten nutzen — die Basis ist Teil einer größeren Reise',
        type: 'nms',
      },
      {
        en: 'I want building to be a significant mechanic — crafting specific weapons and equipment for specific boss encounters, with gear progression throughout',
        zh: '我希望建造是一个重要机制——为特定 Boss 遭遇精心制作特定武器和装备，贯穿全程的装备进展',
        zhTW: '希望建造是一個重要機制——為特定 Boss 遭遇精心製作特定武器和裝備，貫穿全程的裝備進展',
        ja: '建築をがっつりやりたい——特定のボス戦に向けて武器や装備を作り込んで、ゲームを通じてギアが進化していく感じ',
        ko: '건설이 핵심 메커니즘이었으면 해요——특정 보스전을 위해 무기와 장비를 제작하고 게임 내내 장비가 발전하는 느낌',
        de: 'Ich möchte, dass der Bau ein zentrales Element ist — spezifische Waffen und Ausrüstung für bestimmte Bosse herstellen, mit Gear-Progression durch das gesamte Spiel',
        type: 'terraria',
      },
      {
        en: 'Base-building is my favorite part — connecting modules, printing tools, and watching my outpost grow is the core loop I want to keep returning to',
        zh: '建造基地是我最喜欢的部分——连接模块、打印工具、看着我的前哨站成长是我想不断回味的核心循环',
        zhTW: '建造基地是我最喜歡的部分——連接模組、列印工具、看著前哨站成長是我想不斷回味的核心循環',
        ja: 'ベース建設が一番の楽しみ——モジュールをつないで、ツールをプリントして、前哨地がどんどん成長していくのを見るのが大好き',
        ko: '기지 건설이 제일 좋아요——모듈을 연결하고, 도구를 프린트하고, 전초기지가 성장하는 걸 보는 것이 계속 되돌아오고 싶은 핵심 루프예요',
        de: 'Basenbau ist mein Lieblingsteil — Module verbinden, Werkzeuge drucken und zusehen wie mein Außenposten wächst — das ist der Kern-Loop, zu dem ich immer wiederkehren möchte',
        type: 'astroneer',
      },
      {
        en: 'Building an underwater habitat is deeply satisfying — placing rooms underwater and watching the sea life swim past my windows feels magical',
        zh: '建造水下栖息地非常令人满足——在水下放置房间，看着海洋生物从我的窗户游过，感觉像是魔法',
        zhTW: '建造水下棲息地非常令人滿足——在水下放置房間，看著海洋生物從窗戶游過，感覺像是魔法',
        ja: '水中ハビタットを作るのがたまらなく楽しい——海底に部屋を配置して、窓から海洋生物が泳ぐのを眺める感覚が最高',
        ko: '수중 서식지를 만드는 게 너무 만족스러워요——바다 속에 방을 배치하고 창문으로 해양 생물이 헤엄치는 걸 보는 느낌이 마법 같아요',
        de: 'Eine Unterwasserbehausung zu bauen ist unglaublich befriedigend — Räume unter Wasser zu platzieren und zuzusehen wie Meereslebewesen an meinen Fenstern vorbeischwimmen fühlt sich magisch an',
        type: 'subnautica',
      },
    ],
  },
  {
    q_en: 'Which "first hour" scenario sounds most exciting to you?',
    q_zh: '哪个"游戏第一小时"的场景听起来最令你兴奋？',
    q_zhTW: '哪個「遊戲第一小時」的場景聽起來最令你興奮？',
    q_ja: 'どの「最初の1時間」のシナリオが一番ワクワクしますか？',
    q_ko: '어떤 \'첫 1시간\' 시나리오가 가장 설레나요？',
    q_de: 'Welches „Erste-Stunde"-Szenario klingt am aufregendsten für dich?',
    options: [
      {
        en: 'Arriving on an alien planet, scanning local wildlife for the catalogue, finding rare resources, building a launch pad, and flying to a completely different planet to start again',
        zh: '降落在外星星球上，为目录扫描当地野生动物，找到稀有资源，建造发射台，飞向一个完全不同的星球重新开始',
        zhTW: '降落在外星星球上，為目錄掃描當地野生動物，找到稀有資源，建造發射台，飛向一個完全不同的星球重新開始',
        ja: '異星に着陸して、地元の生き物をスキャンしてカタログに登録、レアな資源を見つけて打ち上げパッドを建設、全然違う星へ飛んでまた一から始める',
        ko: '외계 행성에 착륙해 현지 생물을 스캔해 카탈로그에 등록하고, 희귀 자원을 찾아 발사대를 건설한 뒤, 완전히 다른 행성으로 날아가 처음부터 다시 시작',
        de: 'Auf einem Alienplaneten landen, einheimische Tiere für den Katalog scannen, seltene Ressourcen finden, eine Startrampe bauen und zu einem ganz anderen Planeten fliegen um von vorne anzufangen',
        type: 'nms',
      },
      {
        en: 'Punching trees, smelting my first ores, building a shelter before night falls, venturing into a cave, and discovering a chest with an item I do not yet understand',
        zh: '砍树、冶炼第一批矿石、在夜幕降临前建造庇护所、冒险进入洞穴，发现一个装有我还不理解的物品的箱子',
        zhTW: '砍樹、冶煉第一批礦石、在夜幕降臨前建造庇護所、冒險進入洞穴，發現一個裝有我還不理解的物品的箱子',
        ja: '木を切って最初の鉱石を精錬して、夜が来る前に家を作って洞窟に突入、まだ使い道がわからないアイテムが入った宝箱を発見する',
        ko: '나무를 패고 첫 광석을 제련하고 밤이 오기 전에 대피소를 짓고 동굴을 탐험하다가 아직 뭔지 모르는 아이템이 든 상자를 발견',
        de: 'Bäume fällen, erste Erze schmelzen, vor Einbruch der Nacht eine Unterkunft bauen, in eine Höhle vordringen und eine Kiste mit einem Gegenstand entdecken den ich noch nicht verstehe',
        type: 'terraria',
      },
      {
        en: 'Landing on a colorful planet, using my terrain tool to gather resin, printing my first backpack upgrade, and connecting my base to a power source for the first time',
        zh: '降落在一个多彩的星球上，使用地形工具收集树脂，打印我的第一个背包升级，第一次将基地连接到电源',
        zhTW: '降落在一個多彩的星球上，使用地形工具收集樹脂，列印我的第一個背包升級，第一次將基地連接到電源',
        ja: 'カラフルな星に着陸して地形ツールで樹脂を集め、最初のバックパックアップグレードをプリントして、初めてベースを電源につなぐ',
        ko: '알록달록한 행성에 착륙해 지형 도구로 수지를 모으고, 첫 배낭 업그레이드를 프린트하고, 처음으로 기지를 전원에 연결',
        de: 'Auf einem bunten Planeten landen, mit dem Terraforming-Tool Harz sammeln, mein erstes Rucksack-Upgrade drucken und die Basis zum ersten Mal an eine Energiequelle anschließen',
        type: 'astroneer',
      },
      {
        en: 'Waking up in a crashed escape pod surrounded by shallow ocean, swimming out to discover a nearby reef, and seeing something enormous pass in the distance below me',
        zh: '在浅海包围的失事逃生舱中醒来，游出去发现附近的礁石，看到某个巨大的东西从我下方的远处经过',
        zhTW: '在淺海包圍的失事逃生艙中醒來，游出去發現附近的礁石，看到某個巨大的東西從我下方的遠處經過',
        ja: '浅海に沈んだ脱出ポッドで目を覚まし、外に出て近くのサンゴ礁を発見、そして遙か下の暗闇を巨大な何かが通り過ぎるのを目撃する',
        ko: '얕은 바다에 둘러싸인 추락한 탈출 포드에서 깨어나 헤엄쳐 나와 근처 산호초를 발견하고, 저 아래 먼 어둠 속에서 거대한 무언가가 지나가는 것을 목격',
        de: 'In einer abgestürzten Rettungskapsel mitten im seichten Ozean aufwachen, hinausschwimmen um ein nahe gelegenes Riff zu entdecken und etwas Riesiges tief unten in der Ferne vorbeischwimmen zu sehen',
        type: 'subnautica',
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
  nms: {
    title_en: "No Man's Sky",
    title_zh: '无人深空',
    title_zhTW: '無人深空',
    title_ja: "No Man's Sky",
    title_ko: "No Man's Sky",
    title_de: "No Man's Sky",
    emoji: '🚀',
    tag_en: 'An infinite universe of alien planets — land anywhere, scan and catalogue every creature, build bases across multiple worlds, and never run out of things to discover',
    tag_zh: '无限外星星球宇宙——降落在任何地方、扫描并分类每一种生物、在多个世界建造基地，永远不会用尽可以发现的事物',
    tag_zhTW: '無限外星星球宇宙——降落在任何地方、掃描並分類每一種生物、在多個世界建造基地，永遠不會用盡可以發現的事物',
    tag_ja: 'ほぼ無限の異星宇宙——どこにでも降り立ち、あらゆる生き物をスキャン・カタログ登録し、複数の星にベースを建設、発見しきれないほどのコンテンツが待っている',
    tag_ko: '무한한 외계 행성 우주——어디든 착륙하고, 모든 생물을 스캔해 카탈로그에 등록하고, 여러 세계에 기지를 건설하며, 발견거리가 끝없이 펼쳐지는',
    tag_de: 'Ein unendliches Universum aus Alienplaneten — überall landen, jede Kreatur scannen und katalogisieren, Basen auf mehreren Welten errichten und niemals aufhören zu entdecken',
    platform_en: 'Available on: PC (Steam, GOG), PS4, PS5, Xbox, Game Pass, Nintendo Switch (2024), Apple VR — about $60. Regular deep sales to $15. Free on Game Pass.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、PS4、PS5、Xbox、Game Pass、Nintendo Switch（2024 年）、Apple VR——约 60 美元。定期大促销至 15 美元。Game Pass 免费。',
    platform_zhTW: '可在以下平台取得：PC（Steam、GOG）、PS4、PS5、Xbox、Game Pass、Nintendo Switch（2024 年）、Apple VR——約 60 美元。定期大特賣至 15 美元。Game Pass 免費。',
    platform_ja: 'PC（Steam、GOG）、PS4、PS5、Xbox、Game Pass、Nintendo Switch（2024年）、Apple VR対応——定価約60ドル。セール時は15ドル前後まで値下がりすることも。Game Passでは無料でプレイ可能。',
    platform_ko: 'PC(Steam, GOG), PS4, PS5, Xbox, Game Pass, 닌텐도 스위치(2024), Apple VR 지원——정가 약 60달러. 정기 세일 시 15달러까지. Game Pass에서 무료.',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), PS4, PS5, Xbox, Game Pass, Nintendo Switch (2024), Apple VR — ca. 60 €. Regelmäßige Sales ab ca. 15 €. Kostenlos auf Game Pass.',
    why_en:
      "No Man's Sky (2016, massively updated through 2024) is one of the most remarkable redemption stories in gaming — a game that launched to widespread disappointment and was rebuilt over years of free updates into one of the most generous and content-rich sandbox experiences available. You play as a traveler in a procedurally generated universe of 18 quintillion unique planets, each with their own biomes, flora, fauna, and resources. The game can be played in pure exploration mode (no survival pressure) or with full survival mechanics. The loop involves scanning and uploading discoveries for credits, mining resources, trading with space stations, building increasingly elaborate multi-planet bases, and following any of several story threads or faction questlines. The visual style — painterly alien vistas in vivid colors — is constantly stunning. For cozy game players specifically: the difficulty is fully adjustable, all updates have been free, there is a rich co-op system for playing with friends, and the Nintendo Switch version (2024) means you can play it in handheld mode. The community is one of the most positive in gaming. Available on Game Pass. One of the best value games ever released.",
    why_zh:
      '无人深空（2016 年，通过 2024 年大幅更新）是游戏史上最非凡的救赎故事之一——一款以广泛失望开局并通过多年免费更新重建为最慷慨、内容最丰富的沙盒体验之一的游戏。你扮演一个在程序生成的 18 亿亿个独特星球宇宙中的旅行者，每个都有自己的生态系统、植物、动物和资源。游戏可以纯探索模式（无生存压力）或带有完整生存机制的方式游玩。循环包括扫描和上传发现以获取货币、挖掘资源、与空间站交易、建造越来越精心的多星球基地，以及跟随几条故事线或派系任务线。视觉风格——鲜艳色彩的绘画风格外星景观——持续令人惊叹。对于 Cozy 游戏玩家：难度完全可调节，所有更新都是免费的，有丰富的合作系统可以与朋友一起玩，2024 年的 Nintendo Switch 版本意味着你可以在手持模式下游玩。该社区是游戏界最积极的社区之一。Game Pass 上可用。',
    why_zhTW:
      '無人深空（2016 年，經 2024 年大幅更新）是遊戲史上最非凡的救贖故事之一——一款以廣泛失望開局，並透過多年免費更新重建為最慷慨、內容最豐富的沙盒體驗之一的遊戲。你扮演一個在程序生成的 18 億億個獨特星球宇宙中的旅行者，每個都有自己的生態系統、植物、動物和資源。遊戲可以純探索模式（無生存壓力）或帶有完整生存機制的方式遊玩。循環包括掃描和上傳發現以獲取貨幣、挖掘資源、與太空站交易、建造越來越精心的多星球基地，以及跟隨幾條故事線或派系任務線。視覺風格——鮮豔色彩的繪畫風格外星景觀——持續令人驚嘆。對於 Cozy 遊戲玩家：難度完全可調節，所有更新都是免費的，有豐富的合作系統可以與朋友一起玩，2024 年的 Nintendo Switch 版本意味著你可以在手持模式下遊玩。該社群是遊戲界最積極的社群之一。Game Pass 上可用。',
    why_ja:
      "No Man's Sky（2016年発売、2024年まで大型アップデート続行中）はゲーム史上最も印象的な復活劇の一つ——発売当初は期待外れとして大きく批判されたものの、その後も無料アップデートを重ね続け、今では最もボリューム満点のサンドボックスゲームの一本として生まれ変わった。プレイヤーは手続き的に生成された1800京個の惑星が存在する宇宙の旅人として、各惑星固有の生態系・植物・生物・資源を探索する。難易度はクリエイティブモード（生存プレッシャーなし）からサバイバルモードまで自由に選択できる。生き物のスキャンと登録でクレジットを稼ぎ、資源を採掘して宇宙ステーションで取引し、複数惑星にまたがるベースを建設して、いくつかのストーリーやファクションクエストを追いかける——そんな大きなループが楽しみの中心。ビジュアルは絵画のような鮮やかな色使いが美しく、どの星も圧巻の景色を見せてくれる。Cozyゲーム好きに特に嬉しいのは、難易度調整が細かくできること、すべてのアップデートが無料なこと、フレンドとのCo-opが充実していること、そして2024年のSwitch版で寝転びながら遊べること。コミュニティの雰囲気もゲーム界随一の温かさ。Game Passでも遊べる。",
    why_ko:
      "No Man's Sky(2016년 출시, 2024년까지 대규모 업데이트 지속)는 게임 역사상 가장 놀라운 부활 이야기 중 하나입니다——출시 당시 큰 실망을 안겼지만 수년간 무료 업데이트를 통해 가장 풍성하고 콘텐츠가 넘치는 샌드박스 경험 중 하나로 재탄생했습니다. 1800경 개의 절차적으로 생성된 독특한 행성 우주를 여행하는 탐험가로 각 행성마다 고유한 생태계, 식물, 동물, 자원이 기다리고 있습니다. 순수 탐험 모드(생존 압박 없음)부터 완전 서바이벌 모드까지 난이도를 자유롭게 설정할 수 있습니다. 생물 스캔으로 크레딧을 벌고, 자원을 채굴하여 우주 정거장에서 거래하고, 여러 행성에 걸친 정교한 기지를 건설하고, 여러 스토리와 팩션 퀘스트를 따라가는 것이 핵심 루프입니다. 회화적인 색채의 외계 풍경이 지속적으로 감동을 줍니다. 코지 게이머에게 특히 좋은 점: 난이도 완전 조절 가능, 모든 업데이트 무료, 풍부한 협동 플레이, 2024년 닌텐도 스위치 버전으로 휴대 플레이 가능. 커뮤니티 분위기도 게임계에서 최고 수준. Game Pass에서 무료 플레이 가능.",
    why_de:
      "No Man's Sky (2016, mit umfangreichen Updates bis 2024) ist eine der bemerkenswertesten Erfolgsgeschichten der Spielebranche — ein Spiel, das mit einer Welle der Enttäuschung startete und über Jahre hinweg durch kostenlose Updates zu einem der großzügigsten und inhaltsreichsten Sandbox-Erlebnisse überhaupt aufgebaut wurde. Du spielst als Reisender in einem prozedural generierten Universum mit 18 Trillionen einzigartigen Planeten, jeder mit eigenen Biomen, Flora, Fauna und Ressourcen. Das Spiel kann im reinen Erkundungsmodus (kein Überlebensdruck) oder mit vollständiger Überlebensmechanik gespielt werden. Der Spielkreislauf umfasst das Scannen und Hochladen von Entdeckungen für Credits, Ressourcenabbau, Handel mit Raumstationen, den Bau immer aufwendigerer planetenübergreifender Basen sowie das Verfolgen verschiedener Story-Linien oder Fraktionsquests. Der Kunststil — malerische Alienlandschaften in leuchtenden Farben — ist durchgängig atemberaubend. Für Cozy-Spieler besonders attraktiv: vollständig anpassbare Schwierigkeit, alle Updates kostenlos, ein reichhaltiges Co-op-System und die Nintendo Switch Version (2024) für den Handheld-Modus. Die Community ist eine der positivsten in der Spielewelt. Verfügbar auf Game Pass.",
    tip_en:
      "Start on Creative or Relaxed mode if you just want to explore — you can always change difficulty later. Your first priority should be fixing your ship, then reaching the space station. Talk to every alien NPC you meet; learning three alien words per species unlocks dialogue options, and the languages are a persistent feature across all playthroughs.",
    tip_zh:
      '如果你只是想探索，从创意或轻松模式开始——你可以随时更改难度。你的第一个优先级应该是修好你的飞船，然后到达空间站。与你遇到的每个外星 NPC 交谈；每个物种学习三个外星词汇可以解锁对话选项，而这些语言是所有游玩过程中持续存在的特性。',
    tip_zhTW:
      '如果你只是想探索，從創意或輕鬆模式開始——你可以隨時更改難度。你的第一個優先事項應該是修好你的飛船，然後到達太空站。與你遇到的每個外星 NPC 交談；每個物種學習三個外星詞彙可以解鎖對話選項，而這些語言是所有遊玩過程中持續存在的特性。',
    tip_ja:
      '探索メインで遊ぶならクリエイティブかリラックスモードからスタートしよう——難易度はあとからいつでも変更できる。まず最優先でやることは宇宙船の修理と宇宙ステーションへの到達。出会った異星人NPCには必ず話しかけること。種族ごとに3つ単語を覚えれば特別な会話オプションが解放され、その言語はプレイスルー全体を通じて積み重なっていく。',
    tip_ko:
      '순수 탐험을 원한다면 크리에이티브 또는 릴랙스 모드로 시작하세요——난이도는 언제든지 바꿀 수 있어요. 첫 번째 우선순위는 우주선 수리 후 우주 정거장 도착. 만나는 모든 외계인 NPC와 대화하세요; 종족마다 외계어 3단어를 배우면 대화 옵션이 열리고, 그 언어들은 모든 플레이스루에 걸쳐 누적됩니다.',
    tip_de:
      'Wenn du einfach nur erkunden möchtest, starte im Kreativ- oder Entspannt-Modus — die Schwierigkeit lässt sich jederzeit ändern. Erste Priorität: dein Raumschiff reparieren und zur Raumstation gelangen. Sprich mit jedem Alien-NPC, dem du begegnest; drei Fremdwörter pro Spezies zu lernen schaltet Dialogoptionen frei, und die Sprachen bleiben über alle Spielstände hinweg persistent.',
  },
  terraria: {
    title_en: 'Terraria',
    title_zh: '泰拉瑞亚',
    title_zhTW: '泰拉瑞亞',
    title_ja: 'テラリア',
    title_ko: '테라리아',
    title_de: 'Terraria',
    emoji: '⛏️',
    tag_en: 'A 2D pixel-art world of infinite vertical depth — mine, build, craft, and fight your way through a hand-designed progression of biomes and bosses that gets richer the deeper you go',
    tag_zh: '一个具有无限垂直深度的 2D 像素艺术世界——挖掘、建造、制作和战斗，穿越一个手工设计的生物群落和 Boss 进展，越深入越丰富',
    tag_zhTW: '具有無限垂直深度的 2D 像素藝術世界——挖掘、建造、製作和戰鬥，穿越一個手工設計的生物群落和 Boss 進展，越深入越豐富',
    tag_ja: '縦に無限に広がる2Dドット絵の世界——掘って、建てて、クラフトして、戦いながら手作りの絶妙なバイオームとボスの進行を楽しむ、深みに挑むほど豊かになる',
    tag_ko: '무한한 수직 깊이를 가진 2D 픽셀 아트 세계——채굴, 건설, 제작, 전투로 수작업으로 설계된 생물 군계와 보스 진행을 헤쳐나가며, 깊이 갈수록 풍성해지는',
    tag_de: 'Eine 2D-Pixelart-Welt mit unendlicher vertikaler Tiefe — graben, bauen, craften und kämpfen in einer handgestalteten Abfolge von Biomen und Bossen, die umso reicher wird je tiefer du gehst',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox, Mobile — about $10 on PC. Frequently on sale for $2.50.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、手机——PC 上约 10 美元。经常以 2.5 美元促销。',
    platform_zhTW: '可在以下平台取得：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、手機——PC 上約 10 美元。經常以 2.5 美元特賣。',
    platform_ja: 'PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、スマートフォン対応——PC版の定価は約10ドル。セールでは2.5ドルになることも。',
    platform_ko: 'PC(Steam, GOG), 닌텐도 스위치, PS4, PS5, Xbox, 모바일 지원——PC 정가 약 10달러. 자주 2.5달러로 세일.',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox, Mobile — ca. 10 € auf PC. Häufig für 2,50 € im Angebot.',
    why_en:
      "Terraria (2011, massively updated through 2022) is one of the greatest value propositions in gaming — a $10 game (regularly $2.50 on sale) with over 5,000 items, 30+ bosses, multiple biomes, and hundreds of hours of content that has sold over 58 million copies across all platforms. The 2D pixel-art world starts gentle: build a shelter, mine basic ores, defeat your first bosses. But going deeper unlocks increasingly strange and rich environments — the Underground Jungle, the Cavern, the Underworld — each with unique enemies, materials, and building blocks. The game rewards curiosity and preparation: you research what you need to defeat the next boss, craft the right weapons, and descend with a plan. For cozy game players who want more challenge than farming games offer: Terraria's combat is action-based (not turn-based) but never unfairly difficult if you have the right gear. The building system is as deep as any creative sandbox. The progression system has a clear arc from 'exploring the surface' to 'defeating a God-tier end-game boss.' One of the most-played games of all time; the community is enormous and helpful. Best played with friends but excellent solo.",
    why_zh:
      '泰拉瑞亚（2011 年，通过 2022 年大幅更新）是游戏史上最高性价比的游戏之一——一款 10 美元（促销时经常 2.5 美元）的游戏，拥有超过 5,000 个物品、30+ 个 Boss、多个生物群落和数百小时的内容，在所有平台上销售超过 5,800 万份。2D 像素艺术世界开始温和：建造庇护所、挖掘基础矿石、击败第一批 Boss。但越深入越能解锁越来越奇异丰富的环境——地下丛林、洞穴、地下世界——每个都有独特的敌人、材料和建筑模块。游戏奖励好奇心和准备：你研究击败下一个 Boss 需要什么，制作正确的武器，有计划地下降。对于想要比农场游戏更多挑战的 Cozy 游戏玩家：泰拉瑞亚的战斗是动作性的（非回合制），但如果你有正确的装备就从来不会不公平地困难。建造系统和任何创意沙盒一样深度。进展系统有清晰的弧线，从"探索地表"到"击败神级终局 Boss"。',
    why_zhTW:
      '泰拉瑞亞（2011 年，經 2022 年大幅更新）是遊戲史上最高性價比的遊戲之一——一款 10 美元（促銷時經常 2.5 美元）的遊戲，擁有超過 5,000 個物品、30+ 個 Boss、多個生物群落和數百小時的內容，在所有平台上銷售超過 5,800 萬份。2D 像素藝術世界開始溫和：建造庇護所、挖掘基礎礦石、擊敗第一批 Boss。但越深入越能解鎖越來越奇異豐富的環境——地下叢林、洞穴、地下世界——每個都有獨特的敵人、材料和建築模組。遊戲獎勵好奇心和準備：你研究擊敗下一個 Boss 需要什麼，製作正確的武器，有計畫地下降。對於想要比農場遊戲更多挑戰的 Cozy 遊戲玩家：泰拉瑞亞的戰鬥是動作性的（非回合制），但如果你有正確的裝備就從來不會不公平地困難。建造系統和任何創意沙盒一樣深度。進展系統有清晰的弧線，從「探索地表」到「擊敗神級終局 Boss」。',
    why_ja:
      'テラリア（2011年発売、2022年まで大型アップデート）はゲーム史上最高のコスパを誇るゲームの一つ——定価10ドル（セール時は2.5ドル）で5,000以上のアイテム、30体超のボス、複数のバイオーム、数百時間分のコンテンツが詰まっており、累計5,800万本以上を売り上げてきた。2Dドット絵の世界は最初は穏やか——シェルターを建て、鉱石を精錬し、最初のボスを倒す。だが地下へ潜るほど、地下ジャングル・洞窟・地獄といったますます奇妙で豊かな環境が広がっていく。それぞれ固有の敵・素材・建築ブロックがある。ゲームは好奇心と準備を報いる設計で、次のボスに必要な装備を調べて作り込み、計画を持って挑むのが楽しい。農場ゲームよりちょっと歯応えがほしいCozyゲーマーへ：テラリアの戦闘はアクションベース（ターン制ではない）だが、適切な装備があれば理不尽な難しさには感じない。建築の深みはどのクリエイティブサンドボックスにも引けを取らない。「地表を探索する」から「神クラスの最終ボスを倒す」まで、明確な物語の弧を描く進行が素晴らしい。',
    why_ko:
      '테라리아(2011년 출시, 2022년까지 대규모 업데이트)는 게임 역사상 최고의 가성비를 자랑하는 게임 중 하나——정가 10달러(세일 시 2.5달러)에 5,000개 이상의 아이템, 30개 이상의 보스, 다양한 생물 군계, 수백 시간의 콘텐츠가 담겨 있으며 전 플랫폼 합산 5,800만 장 이상 판매되었습니다. 2D 픽셀 아트 세계는 처음엔 순하게 시작——대피소를 짓고, 기본 광석을 제련하고, 첫 보스를 처치합니다. 하지만 더 깊이 파내려 갈수록 지하 정글, 동굴, 지하세계 같은 점점 더 기묘하고 풍성한 환경이 펼쳐집니다. 게임은 호기심과 준비를 보상합니다——다음 보스에 무엇이 필요한지 연구하고 무기를 제작하고 계획을 세워 내려갑니다. 농장 게임보다 도전이 더 필요한 코지 게이머에게: 테라리아의 전투는 액션 기반(턴제 아님)이지만 적절한 장비만 있다면 불공평하게 어렵지 않습니다. 건설 시스템은 어느 크리에이티브 샌드박스 못지않게 깊이가 있습니다. "지표 탐험"에서 "신급 엔드게임 보스 처치"까지 명확한 진행 곡선이 있습니다.',
    why_de:
      'Terraria (2011, umfangreich durch Updates bis 2022) ist eines der besten Preis-Leistungs-Angebote in der Spielegeschichte — ein Spiel für ca. 10 € (häufig für 2,50 € im Angebot) mit über 5.000 Items, 30+ Bossen, mehreren Biomen und hunderten Stunden Content, das sich über alle Plattformen hinweg über 58 Millionen Mal verkauft hat. Die 2D-Pixelwelt beginnt sanft: eine Unterkunft bauen, erste Erze schmelzen, erste Bosse besiegen. Aber je tiefer man gräbt, desto fremdartigere und reichhaltigere Umgebungen tun sich auf — Untergrundurwald, die Höhlen, die Unterwelt — jede mit eigenen Gegnern, Materialien und Bausteinen. Das Spiel belohnt Neugier und Vorbereitung: du recherchierst was du für den nächsten Boss brauchst, craftest die richtigen Waffen und steigst mit einem Plan ab. Für Cozy-Spieler, die mehr Herausforderung suchen: Terraria-Kämpfe sind aktionsbasiert, aber mit der richtigen Ausrüstung nie unfair schwierig. Das Bausystem ist so tiefgründig wie jede kreative Sandbox. Die Progression hat einen klaren Bogen von „Oberfläche erkunden" bis hin zum „Endgame-Gottesboss besiegen".',
    tip_en:
      "Build a starter house for the Guide NPC first — he tells you what items you can craft from your current materials. Before your first Blood Moon or invasion event, dig a tunnel with lava traps and watch enemies fall in. Build vertically; your best ores are always deeper than you think.",
    tip_zh:
      '首先为向导 NPC 建造一个起始房屋——他会告诉你可以用当前材料制作什么物品。在你第一次血月或入侵事件之前，挖一个带熔岩陷阱的隧道，看着敌人掉进去。垂直建造；你最好的矿石总是比你想象的更深。',
    tip_zhTW:
      '首先為嚮導 NPC 建造一個起始房屋——他會告訴你可以用當前材料製作什麼物品。在你第一次血月或入侵事件之前，挖一個帶熔岩陷阱的隧道，看著敵人掉進去。垂直建造；你最好的礦石總是比你想像的更深。',
    tip_ja:
      'まずガイドNPC用の家を建てよう——彼は今持っている素材で何がクラフトできるか教えてくれる。最初のブラッドムーンや侵略イベントの前に、溶岩トラップ付きの落とし穴を掘っておこう。縦に建てることを意識して；いい鉱石は思っているより常に深いところにある。',
    tip_ko:
      '먼저 가이드 NPC를 위한 집을 지으세요——현재 재료로 무엇을 만들 수 있는지 알려줍니다. 첫 블러드문이나 침략 이벤트 전에 용암 함정이 있는 터널을 파두고 적이 빠지는 걸 구경하세요. 수직으로 건설하세요; 좋은 광석은 항상 생각보다 더 깊은 곳에 있습니다.',
    tip_de:
      'Bau zuerst ein Haus für den Guide-NPC — er zeigt dir, was du aus deinen aktuellen Materialien craften kannst. Bevor dein erstes Blutmond- oder Invasionsevent kommt, grabe einen Tunnel mit Lavafallen und lass die Feinde hineinfallen. Bau vertikal; die besten Erze sind immer tiefer als du denkst.',
  },
  astroneer: {
    title_en: 'Astroneer',
    title_zh: 'Astroneer',
    title_zhTW: 'Astroneer',
    title_ja: 'Astroneer',
    title_ko: 'Astroneer',
    title_de: 'Astroneer',
    emoji: '🌍',
    tag_en: 'A cozy space exploration and base-building game with a delightful cartoon aesthetic — print tools, connect base modules, and explore colorful alien planets with virtually no combat',
    tag_zh: '一款拥有令人愉悦卡通美学的 Cozy 太空探索和基地建造游戏——打印工具、连接基地模块，探索彩色外星星球，几乎没有战斗',
    tag_zhTW: '擁有令人愉悅卡通美學的 Cozy 太空探索和基地建造遊戲——列印工具、連接基地模組，探索彩色外星星球，幾乎沒有戰鬥',
    tag_ja: 'かわいいカートゥーン調のCozy宇宙探索＆ベース建設ゲーム——道具をプリントして、基地モジュールをつないで、カラフルな異星を探索、戦闘はほぼなし',
    tag_ko: '사랑스러운 카툰 미학의 코지 우주 탐험 및 기지 건설 게임——도구를 프린트하고, 기지 모듈을 연결하고, 알록달록한 외계 행성을 탐험, 전투는 거의 없음',
    tag_de: 'Ein kuscheliges Weltraum-Erkundungs- und Basisbauspiel mit entzückender Cartoon-Ästhetik — Werkzeuge drucken, Basismodule verbinden und bunte Alienplaneten erkunden, fast ohne Kämpfe',
    platform_en: 'Available on: PC (Steam), Xbox Series X/S, PS4, PS5, Nintendo Switch, Xbox Game Pass — about $30',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox Series X/S、PS4、PS5、Nintendo Switch、Xbox Game Pass——约 30 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Xbox Series X/S、PS4、PS5、Nintendo Switch、Xbox Game Pass——約 30 美元',
    platform_ja: 'PC（Steam）、Xbox Series X/S、PS4、PS5、Nintendo Switch、Xbox Game Pass対応——定価約30ドル',
    platform_ko: 'PC(Steam), Xbox Series X/S, PS4, PS5, 닌텐도 스위치, Xbox Game Pass 지원——정가 약 30달러',
    platform_de: 'Erhältlich auf: PC (Steam), Xbox Series X/S, PS4, PS5, Nintendo Switch, Xbox Game Pass — ca. 30 €',
    why_en:
      "Astroneer (2019) is the most cozy space exploration game ever made — a sandbox where you play as an astronaut on a spacefaring mission of resource extraction and base-building, but at a pace and pressure level that cozy game players will immediately recognize and appreciate. The visual aesthetic is its most immediately recognizable quality: every alien mineral, creature, and environmental element is rendered in a rounded, candy-colored cartoon style that makes even unfamiliar planets feel warm and inviting. The core loop involves using your terrain tool to extract resources, running them through a soil centrifuge or printer to create equipment, and gradually building an increasingly elaborate base with power networks, research modules, trade platforms, and vehicle bays. There is combat (aerial creatures called Floran, and environmental hazards called Flora) but it is minimal and avoidable on many planets. The game is especially excellent in co-op: up to four players can share a planet, build together, and watch the base grow. A companion to the cozy genre without being a farming game — it delivers the same sense of daily routine and incremental progress but in a space context.",
    why_zh:
      'Astroneer（2019 年）是有史以来最 Cozy 的太空探索游戏——一款你扮演执行资源提取和基地建造任务的宇航员的沙盒，但以 Cozy 游戏玩家会立即认可和欣赏的节奏和压力水平进行。视觉美学是其最直接可识别的品质：每个外星矿物、生物和环境元素都以圆润的糖果色卡通风格呈现，使即使是陌生的星球也感觉温暖迷人。核心循环包括使用地形工具提取资源，通过土壤离心机或打印机将其转化为设备，并逐渐建造一个配备电力网络、研究模块、贸易平台和车辆库的越来越精心的基地。有战斗（称为 Floran 的空中生物，以及称为 Flora 的环境危险），但在许多星球上是最少的且可以避免的。游戏在合作模式下特别出色：最多四名玩家可以共享一个星球、一起建造并看着基地成长。',
    why_zhTW:
      'Astroneer（2019 年）是有史以來最 Cozy 的太空探索遊戲——一款你扮演執行資源提取和基地建造任務的太空人的沙盒，但以 Cozy 遊戲玩家會立即認可和欣賞的節奏和壓力水平進行。視覺美學是其最直接可識別的品質：每個外星礦物、生物和環境元素都以圓潤的糖果色卡通風格呈現，使即使是陌生的星球也感覺溫暖迷人。核心循環包括使用地形工具提取資源，透過土壤離心機或列印機將其轉化為設備，並逐漸建造一個配備電力網路、研究模組、貿易平台和車輛庫的越來越精心的基地。有戰鬥（稱為 Floran 的空中生物，以及稱為 Flora 的環境危險），但在許多星球上是最少的且可以避免的。遊戲在合作模式下特別出色：最多四名玩家可以共享一個星球、一起建造並看著基地成長。',
    why_ja:
      'Astroneer（2019年）は今まで作られた中で最もCozyな宇宙探索ゲーム——宇宙飛行士として資源採掘とベース建設のミッションをこなすサンドボックスだが、そのペースと難易度はCozyゲーム好きがすぐに親しみを感じる心地よさ。最初に目に飛び込んでくるビジュアルが印象的で、外星の鉱物も生物も環境も、丸みを帯びたキャンディーカラーのカートゥーン調で描かれており、知らない惑星でも温かく迎え入れてくれる雰囲気がある。コアループは地形ツールで資源を採取し、ソイルセントリフュージやプリンターで装備に変え、電力網・研究モジュール・貿易プラットフォーム・車両ベイを備えたベースを少しずつ拡張していくこと。戦闘要素（空中生物Floranや植物系の環境ハザードFlora）はあるが、多くの惑星では最小限で回避できる。特にCo-opが素晴らしく、最大4人で同じ惑星を共有し、一緒にベースを育てることができる。',
    why_ko:
      'Astroneer(2019년)는 지금까지 만들어진 것 중 가장 코지한 우주 탐험 게임——자원 채굴과 기지 건설 임무를 수행하는 우주비행사를 플레이하는 샌드박스이지만, 코지 게이머가 즉시 공감할 수 있는 페이스와 압박감으로 즐깁니다. 비주얼 미학이 가장 두드러진 특징으로, 모든 외계 광물, 생물, 환경 요소가 둥글둥글한 캔디 컬러 카툰 스타일로 그려져 낯선 행성도 따뜻하고 초대하는 느낌입니다. 핵심 루프는 지형 도구로 자원을 채취하고, 소일 원심분리기나 프린터로 장비를 만들고, 전력망, 연구 모듈, 거래 플랫폼, 차량 격납고를 갖춘 점점 정교한 기지를 건설하는 것입니다. 전투 요소(Floran이라는 공중 생물과 Flora라는 환경 위험)가 있지만 많은 행성에서 최소한이고 피할 수 있습니다. 협동 플레이가 특히 훌륭하여 최대 4명이 같은 행성을 공유하고 함께 기지를 성장시킬 수 있습니다.',
    why_de:
      'Astroneer (2019) ist das gemütlichste Weltraum-Erkundungsspiel, das je entwickelt wurde — eine Sandbox, in der du als Astronaut auf einer Mission zur Ressourcengewinnung und zum Basenbau spielst, aber in einem Tempo und mit einem Druck, den Cozy-Spieler sofort erkennen und zu schätzen wissen. Die visuelle Ästhetik ist das unverwechselbarste Merkmal: jedes fremde Mineral, jede Kreatur und jedes Umgebungselement wird in einem abgerundeten, bonbonfarbenen Cartoon-Stil dargestellt, der selbst unbekannte Planeten warm und einladend wirken lässt. Der Kernloop umfasst das Extrahieren von Ressourcen mit dem Terraforming-Tool, das Verarbeiten zu Ausrüstung und das schrittweise Aufbauen einer Basis mit Stromnetzwerken, Forschungsmodulen, Handelsplattformen und Fahrzeughallen. Kämpfe gibt es, sind aber auf vielen Planeten minimal und vermeidbar. Besonders im Co-op-Modus glänzt das Spiel: bis zu vier Spieler können einen Planeten teilen, gemeinsam bauen und die Basis wachsen sehen.',
    tip_en:
      "Power management is the key skill to learn early — everything needs power, and running out mid-operation is frustrating. Place a Small Solar Panel and a Small Battery near every building from the start. Your terrain tool can also fill in holes and flatten ground — use it to build roads between your structures for a more organized base.",
    tip_zh:
      '电力管理是早期需要学习的关键技能——一切都需要电力，在操作途中耗尽电力令人沮丧。从一开始就在每座建筑附近放置小型太阳能板和小型电池。你的地形工具也可以填补洞穴和平整地面——用它在你的建筑之间建造道路，让基地更有组织。',
    tip_zhTW:
      '電力管理是早期需要學習的關鍵技能——一切都需要電力，在操作途中耗盡電力令人沮喪。從一開始就在每座建築附近放置小型太陽能板和小型電池。你的地形工具也可以填補洞穴和平整地面——用它在你的建築之間建造道路，讓基地更有組織。',
    tip_ja:
      '序盤で最初に習得すべきはエネルギー管理——すべての装置に電力が必要で、途中で電欠になるとかなり不便。最初から各建物のそばにSmall Solar PanelとSmall Batteryを置いておこう。地形ツールは穴を埋めたり地面を平らにする使い方もある——建物間に道を作るとベースが格段に整理されるのでおすすめ。',
    tip_ko:
      '초반에 가장 먼저 익혀야 할 것은 전력 관리——모든 것이 전력이 필요하고 작업 중 전력이 떨어지면 답답합니다. 처음부터 모든 건물 근처에 소형 태양광 패널과 소형 배터리를 설치하세요. 지형 도구는 구멍을 메우고 바닥을 평탄하게 하는 데도 쓸 수 있어요——건물 사이에 도로를 만들면 기지가 훨씬 체계적이 됩니다.',
    tip_de:
      'Energiemanagement ist die wichtigste Fertigkeit die du früh lernen solltest — alles braucht Strom, und mitten im Betrieb ohne Energie dazustehen ist frustrierend. Platziere von Anfang an ein kleines Solarpanel und eine kleine Batterie bei jedem Gebäude. Dein Terraforming-Tool kann auch Löcher auffüllen und Boden einebnen — nutze es um Wege zwischen deinen Strukturen zu bauen für eine organisiertere Basis.',
  },
  subnautica: {
    title_en: 'Subnautica',
    title_zh: 'Subnautica',
    title_zhTW: 'Subnautica',
    title_ja: 'Subnautica',
    title_ko: 'Subnautica',
    title_de: 'Subnautica',
    emoji: '🌊',
    tag_en: 'Crash-land on an alien ocean planet and build your way to the bottom — a survival exploration game where every depth level reveals new creatures, biomes, and pieces of a mystery about what happened here',
    tag_zh: '坠落在一个外星海洋星球上，向底部建造你的出路——一款生存探索游戏，每个深度层次都揭示新的生物、生态系统和关于这里发生了什么的谜题',
    tag_zhTW: '墜落在一個外星海洋星球上，向底部建造你的出路——一款生存探索遊戲，每個深度層次都揭示新的生物、生態系統和關於這裡發生了什麼的謎題',
    tag_ja: '異星の海洋惑星に不時着し、深海を目指して建設を進める——サバイバル探索ゲームで、深度が増すごとに新しい生物・バイオーム・謎が解き明かされていく',
    tag_ko: '외계 해양 행성에 추락해 바닥까지 나아가는 길을 만드는——서바이벌 탐험 게임으로, 각 깊이마다 새로운 생물, 생물 군계, 여기서 무슨 일이 일어났는지에 관한 미스터리가 펼쳐지는',
    tag_de: 'Auf einem fremden Ozeanplaneten notlanden und sich nach unten vorbauen — ein Überlebens-Erkundungsspiel, bei dem jede Tiefenebene neue Kreaturen, Biome und Geheimnisse enthüllt',
    platform_en: 'Available on: PC (Steam, Epic), PS4, PS5, Xbox, Nintendo Switch — about $30. Subnautica: Below Zero is the standalone sequel (~$30).',
    platform_zh: '可在以下平台获取：PC（Steam、Epic）、PS4、PS5、Xbox、Nintendo Switch——约 30 美元。Subnautica: Below Zero 是独立续作（约 30 美元）。',
    platform_zhTW: '可在以下平台取得：PC（Steam、Epic）、PS4、PS5、Xbox、Nintendo Switch——約 30 美元。Subnautica: Below Zero 是獨立續作（約 30 美元）。',
    platform_ja: 'PC（Steam、Epic）、PS4、PS5、Xbox、Nintendo Switch対応——定価約30ドル。スタンドアロン続編「Subnautica: Below Zero」も別途約30ドルで購入可能。',
    platform_ko: 'PC(Steam, Epic), PS4, PS5, Xbox, 닌텐도 스위치 지원——정가 약 30달러. 독립 후속작 Subnautica: Below Zero도 별도 약 30달러.',
    platform_de: 'Erhältlich auf: PC (Steam, Epic), PS4, PS5, Xbox, Nintendo Switch — ca. 30 €. Subnautica: Below Zero ist der eigenständige Nachfolger (~30 €).',
    why_en:
      "Subnautica (2018) is one of the most uniquely affecting games ever made — a survival exploration game set entirely underwater on an alien ocean planet where your escape pod has crashed. The premise sounds stressful, but Subnautica is genuinely beautiful: the ocean is populated with alien coral formations, bioluminescent creatures, kelp forests, and deep-sea trenches that become more extraordinary the further you descend. The core loop is: gather resources near the surface, craft better equipment, descend deeper, discover new biomes, gather rarer resources, build your underwater habitat, and piece together the story of what destroyed your ship and what civilization came before. The game has tense moments (sea monsters that patrol the deeper zones are genuinely threatening) but the aesthetic and sound design are consistently serene between encounters. For cozy game players: the harvesting loop (scan plants, gather materials, craft items) will feel immediately familiar; the underwater habitat building is deeply satisfying; and the story discovery is as rewarding as the exploration. A truly one-of-a-kind game. Subnautica: Below Zero (2021) is a shorter standalone sequel with the same systems but set in an arctic environment.",
    why_zh:
      'Subnautica（2018 年）是有史以来最具独特感染力的游戏之一——一款完全发生在外星海洋星球水下的生存探索游戏，你的逃生舱在那里坠毁。前提听起来很有压力，但 Subnautica 是真正美丽的：海洋中有外星珊瑚形成物、生物发光生物、海带森林和深海沟壑，越深入就越非凡。核心循环是：在地表附近收集资源、制作更好的装备、更深地下降、发现新的生态系统、收集更稀有的资源、建造你的水下栖息地，并拼凑出摧毁你的飞船和之前的文明发生了什么的故事。游戏有紧张时刻（巡逻深区的海怪是真正具有威胁性的），但美学和音效设计在遭遇之间始终保持平静。对于 Cozy 游戏玩家：收割循环（扫描植物、收集材料、制作物品）会立即让人感到熟悉；水下栖息地建造非常令人满足；故事发现和探索一样有价值。一款真正独一无二的游戏。',
    why_zhTW:
      'Subnautica（2018 年）是有史以來最具獨特感染力的遊戲之一——一款完全發生在外星海洋星球水下的生存探索遊戲，你的逃生艙在那裡墜毀。前提聽起來很有壓力，但 Subnautica 是真正美麗的：海洋中有外星珊瑚形成物、生物發光生物、海帶森林和深海溝壑，越深入就越非凡。核心循環是：在地表附近收集資源、製作更好的裝備、更深地下降、發現新的生態系統、收集更稀有的資源、建造你的水下棲息地，並拼湊出摧毀你的飛船和之前的文明發生了什麼的故事。遊戲有緊張時刻（巡邏深區的海怪是真正具有威脅性的），但美學和音效設計在遭遇之間始終保持平靜。對於 Cozy 遊戲玩家：收割循環（掃描植物、收集材料、製作物品）會立即讓人感到熟悉；水下棲息地建造非常令人滿足；故事發現和探索一樣有價值。一款真正獨一無二的遊戲。',
    why_ja:
      'Subnautica（2018年）は今まで作られた中で最も独特な感動を持つゲームの一つ——逃げ場を失った宇宙船の生存者として異星の海洋惑星、水中だけを舞台にしたサバイバル探索ゲーム。前提は緊張感がありそうに思えるが、Subnauticaは純粋に美しい：外星のサンゴ礁、生物発光の生き物、ケルプの森、深海の亀裂がどんどん幻想的になっていく。基本ループは浅瀬で資源を集め→装備をアップグレード→深く潜る→新しいバイオームを発見→より希少な資源を得る→水中ハビタットを建設、そして宇宙船が破壊された理由と過去の文明の謎を紐解く。深いエリアを巡回する海の怪物は本当に怖いが、遭遇の合間は雰囲気と音楽が常に穏やかで落ち着いている。Cozyゲーム好きには：採取ループ（植物をスキャン・素材を集める・アイテムをクラフト）がすぐ馴染む感覚があり、水中ハビタットの建設は抜群に心地いい。唯一無二のゲーム体験。',
    why_ko:
      'Subnautica(2018년)는 지금까지 만들어진 것 중 가장 독특한 감동을 주는 게임 중 하나——탈출 포드가 추락한 외계 해양 행성의 수중만을 무대로 한 서바이벌 탐험 게임. 전제가 긴장감 있게 들리지만 Subnautica는 진정으로 아름답습니다: 외계 산호 지형, 생물발광 생물, 다시마 숲, 점점 더 경이로워지는 심해 협곡이 펼쳐집니다. 핵심 루프는 얕은 곳에서 자원 수집 → 장비 업그레이드 → 더 깊이 잠수 → 새로운 생물 군계 발견 → 더 희귀한 자원 획득 → 수중 서식지 건설, 그리고 우주선이 파괴된 원인과 과거 문명의 비밀을 풀어가는 것입니다. 심층부를 순찰하는 바다 몬스터는 진짜 위협적이지만, 조우 사이의 분위기와 사운드 디자인은 항상 평온하고 서정적입니다. 코지 게이머에게: 수확 루프(식물 스캔, 재료 수집, 아이템 제작)가 즉시 친숙하게 느껴지고 수중 서식지 건설이 매우 만족스럽습니다. 진정으로 유일무이한 게임 경험.',
    why_de:
      'Subnautica (2018) ist eines der einzigartigsten Spiele aller Zeiten — ein Überlebens-Erkundungsspiel, das vollständig unter Wasser auf einem fremden Ozeanplaneten spielt, auf dem deine Rettungskapsel abgestürzt ist. Die Prämisse klingt stressig, aber Subnautica ist von beeindruckender Schönheit: der Ozean ist bevölkert mit fremden Korallenformationen, biolumineszierenden Kreaturen, Kelpwäldern und Tiefseetiefen die immer außergewöhnlicher werden je tiefer man hinabsteigt. Der Kernloop: Ressourcen nahe der Oberfläche sammeln, bessere Ausrüstung craften, tiefer tauchen, neue Biome entdecken, seltenere Ressourcen sammeln, eine Unterwasserbehausung bauen und die Geschichte herausfinden was das Raumschiff zerstörte und welche Zivilisation einst hier existierte. Das Spiel hat angespannte Momente (Meeresmonster in den Tiefen sind wirklich bedrohlich), aber die Ästhetik und das Sounddesign sind zwischen den Begegnungen durchgängig ruhig und meditativ. Für Cozy-Spieler: der Sammelloop fühlt sich sofort vertraut an; der Bau einer Unterwasserbehausung ist zutiefst befriedigend. Ein wirklich einzigartiges Spielerlebnis.',
    tip_en:
      "Mark your escape pod with a beacon immediately — losing it in the open ocean is your first lesson. Build a Scanner Room early and let it continuously map nearby resources. When you hear the Reaper Leviathan roar, swim in the opposite direction. The story progression is gated by depth; when you feel stuck, go deeper.",
    tip_zh:
      '立即给你的逃生舱贴上信标标记——在开阔海洋中失去它是你的第一课。尽早建造扫描仪室，让它持续映射附近的资源。当你听到收割者利维坦的吼叫时，向相反方向游去。故事进展由深度控制；当你感到困顿时，更深地下降。',
    tip_zhTW:
      '立即給你的逃生艙貼上信標標記——在開闊海洋中失去它是你的第一課。儘早建造掃描儀室，讓它持續繪製附近資源的地圖。當你聽到收割者利維坦的吼叫時，向相反方向游去。故事進展由深度控制；當你感到困頓時，更深地下降。',
    tip_ja:
      'すぐに脱出ポッドにビーコンを設置しよう——広い海で見失うのが最初の洗礼。スキャナールームを早めに建設して近くの資源を継続的にマッピングしよう。リーパーリバイアサンの咆哮が聞こえたら、逆方向に全力で泳ぐこと。ストーリーの進行は深度によって解禁される——行き詰まりを感じたら、もっと深く潜ってみよう。',
    tip_ko:
      '즉시 탈출 포드에 비콘을 표시하세요——넓은 바다에서 잃어버리는 것이 첫 번째 교훈입니다. 스캐너 룸을 일찍 건설하여 주변 자원을 지속적으로 매핑하게 하세요. 리퍼 리바이어선의 포효가 들리면 반대 방향으로 수영하세요. 스토리 진행은 깊이로 잠금이 해제됩니다; 막막함을 느낄 때는 더 깊이 잠수해보세요.',
    tip_de:
      'Markiere deine Rettungskapsel sofort mit einem Leuchtfeuer — sie im offenen Ozean zu verlieren ist deine erste Lektion. Bau frühzeitig einen Scanner-Raum und lass ihn kontinuierlich nahe gelegene Ressourcen kartieren. Wenn du das Brüllen des Reaper Leviathan hörst, schwimm in die entgegengesetzte Richtung. Die Story-Progression ist an die Tiefe geknüpft; wenn du feststeckst, tauch tiefer.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { nms: 0, terraria: 0, astroneer: 0, subnautica: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyOpenWorldQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-open-world-quiz`
    const shareText = getLoc(
      `农场游戏玩家的下一片星空测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My open-world exploration game for farming game fans: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `農場遊戲玩家的下一片星空測驗結果：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `農場ゲーマーに捧げるオープンワールド探索クイズ結果：「${result.title_ja}」！${result.tag_ja}。あなたも試してみて：${url}`,
      `농장 게이머를 위한 오픈 월드 탐험 퀴즈 결과：「${result.title_ko}」！${result.tag_ko}。나의 결과 찾기：${url}`,
      `Ergebnis meines Open-World-Erkennungsquiz für Farm-Spieler: ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`,
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
          {getLoc(result.why_zh, result.why_en, result.why_zhTW, result.why_ja, result.why_ko, result.why_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {getLoc('入门建议：', 'Getting started: ', '入門建議：', 'スタートのコツ：', '시작 팁：', 'Einstiegstipp: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
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
            '农场游戏玩家的下一片星空：哪款开放世界最适合你？',
            'Beyond the Farm: Which Open-World Exploration Game Is Right for You?',
            '農場遊戲玩家的下一片星空：哪款開放世界最適合你？',
            '農場ゲーマーが次に行くべきオープンワールドはどれ？',
            '농장 게이머의 다음 오픈 월드는？나에게 딱 맞는 게임 찾기',
            'Jenseits der Farm: Welches Open-World-Spiel passt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            "6 个问题，从无人深空、泰拉瑞亚、Astroneer、Subnautica 中找到你的下一个探索天地",
            "6 questions to match you with No Man's Sky, Terraria, Astroneer, or Subnautica — bigger worlds for farming game fans",
            '6 個問題，從無人深空、泰拉瑞亞、Astroneer、Subnautica 中找到你的下一個探索天地',
            "6つの質問でNo Man's Sky、テラリア、Astroneer、Subnauticaの中からあなたにぴったりの探索世界を見つけよう",
            "6가지 질문으로 No Man's Sky, 테라리아, Astroneer, Subnautica 중 당신에게 맞는 탐험 세계를 찾아보세요",
            "6 Fragen um herauszufinden, ob No Man's Sky, Terraria, Astroneer oder Subnautica der richtige Open-World-Hit für Farmspiel-Fans ist",
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
        {getLoc('找到我的开放世界探索游戏', 'Find My Open World Game', '找到我的開放世界探索遊戲', '私のオープンワールドを見つける', '내 오픈 월드 게임 찾기', 'Mein Open-World-Spiel finden')}
      </button>
    </div>
  )
}
