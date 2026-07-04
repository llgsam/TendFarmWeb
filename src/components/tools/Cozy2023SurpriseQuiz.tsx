'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'seasofstars' | 'hifirush' | 'chants' | 'jusant'

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
          ? getLoc('✓ 已复制！', '✓ Copied!', '✓ 已複製！', '✓ コピーしました！', '✓ 복사되었습니다！', '✓ Kopiert!')
          : getLoc('📋 复制结果', '📋 Copy result', '📋 複製結果', '📋 結果をコピー', '📋 결과 복사', '📋 Ergebnis kopieren')}
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
    q_en: 'What makes a game truly memorable for you beyond its genre?',
    q_zh: '超越类型标签，什么让一款游戏真正令你难忘？',
    q_zhTW: '超越類型標籤，什麼讓一款遊戲真正令你難忘？',
    q_ja: 'ジャンルを超えて、あなたにとって本当に印象に残るゲームとは？',
    q_ko: '장르를 넘어서, 어떤 게임이 진정 기억에 남나요?',
    q_de: 'Was macht ein Spiel für dich wirklich unvergesslich – jenseits seines Genres?',
    options: [
      {
        en: 'An epic journey where the battles feel fair and the world feels alive — I want the JRPG experience done right',
        zh: '一段史诗旅程，战斗感觉公平而世界充满活力——我想要真正做好的 JRPG 体验',
        zhTW: '一段史詩旅程，戰鬥感覺公平而世界充滿活力——我想要真正做好的 JRPG 體驗',
        ja: '壮大な旅、公平な戦闘、生き生きとした世界観——本当に完成度の高いJRPGを求めている',
        ko: '전투가 공정하고 세계가 살아있는 서사시적 여정——제대로 만든 JRPG 경험을 원해요',
        de: 'Eine epische Reise, faire Kämpfe und eine lebendige Welt — das JRPG-Erlebnis, wie es sein sollte',
        type: 'seasofstars',
      },
      {
        en: 'Pure creative genius — a concept so original I keep thinking about it days after finishing',
        zh: '纯粹的创意天才——一个如此原创的概念，让我在完成后几天还在思考',
        zhTW: '純粹的創意天才——一個如此原創的概念，讓我在完成後幾天還在思考',
        ja: '純粋な創造的天才性——何日も頭から離れないほど独創的なコンセプト',
        ko: '순수한 창의적 천재성——완성 후 며칠이 지나도 계속 생각나는 독창적인 개념',
        de: 'Pures kreatives Genie — ein Konzept so originell, dass ich tagelang nach dem Ende noch daran denke',
        type: 'hifirush',
      },
      {
        en: 'The quiet satisfaction of understanding something I could not before — a slow-building intellectual reward',
        zh: '理解了之前无法理解的事物时的静谧满足感——一种缓慢积累的智识奖励',
        zhTW: '理解了之前無法理解的事物時的靜謐滿足感——一種緩慢積累的智識獎勵',
        ja: '以前は理解できなかったことが分かった時の静かな満足感——ゆっくりと積み重なる知的な報酬',
        ko: '이전에 이해하지 못했던 것을 이해했을 때의 조용한 만족감——천천히 쌓이는 지적 보상',
        de: 'Die stille Befriedigung, etwas zu verstehen, was mir vorher verborgen war — eine langsam wachsende intellektuelle Belohnung',
        type: 'chants',
      },
      {
        en: 'A world that asks nothing but my presence — where just existing inside it is enough',
        zh: '一个只需要我存在的世界——单纯地活在其中就已足够',
        zhTW: '一個只需要我存在的世界——單純地活在其中就已足夠',
        ja: 'ただ存在するだけでいい世界——そこにいるだけで十分な場所',
        ko: '내 존재만 필요로 하는 세계——그 안에 그냥 있는 것만으로 충분한 곳',
        de: 'Eine Welt, die nichts von mir verlangt außer meiner Anwesenheit — einfach darin zu existieren reicht aus',
        type: 'jusant',
      },
    ],
  },
  {
    q_en: 'How do you prefer your challenge?',
    q_zh: '你喜欢哪种类型的挑战？',
    q_zhTW: '你喜歡哪種類型的挑戰？',
    q_ja: 'どんな種類の挑戦が好きですか？',
    q_ko: '어떤 종류의 도전을 선호하나요?',
    q_de: 'Wie magst du deine Herausforderungen am liebsten?',
    options: [
      {
        en: 'Turn-based tactical — I want to think through each battle at my own pace with no time pressure',
        zh: '回合制战术——我想按自己的节奏思考每场战斗，没有时间压力',
        zhTW: '回合制戰術——我想按自己的節奏思考每場戰鬥，沒有時間壓力',
        ja: 'ターン制タクティクス——時間的プレッシャーなしに自分のペースで各戦闘を考えたい',
        ko: '턴제 전술——시간 압박 없이 내 페이스로 각 전투를 생각하고 싶어요',
        de: 'Rundenbasierte Taktik — ich will jede Situation in meinem eigenen Tempo durchdenken, ohne Zeitdruck',
        type: 'seasofstars',
      },
      {
        en: 'Rhythmic and reactive — I want to feel cool and musical as I fight, with a game that rewards timing over memorization',
        zh: '节奏感和反应性——我想在战斗中感到帅气和音乐性，奖励时机感而非记忆力',
        zhTW: '節奏感和反應性——我想在戰鬥中感到帥氣和音樂性，獎勵時機感而非記憶力',
        ja: 'リズミカルでリアクティブ——戦闘中にカッコよく音楽的な気分になりたい、暗記じゃなくタイミングで報われるゲーム',
        ko: '리드미컬하고 반응적——암기보다 타이밍을 보상하는 게임에서 전투 중 멋지고 음악적인 느낌을 원해요',
        de: 'Rhythmisch und reaktiv — ich will mich cool und musikalisch fühlen, belohnt für Timing statt Auswendiglernen',
        type: 'hifirush',
      },
      {
        en: 'Intellectual deduction — working through a language or puzzle system by observation and testing over many hours',
        zh: '智识推理——通过长时间的观察和测试来理解一套语言或谜题系统',
        zhTW: '智識推理——通過長時間的觀察和測試來理解一套語言或謎題系統',
        ja: '知的推論——長い時間をかけた観察とテストで言語やパズルシステムを解き明かす',
        ko: '지적 추론——오랜 시간에 걸친 관찰과 테스트를 통해 언어나 퍼즐 시스템을 이해하기',
        de: 'Intellektuelles Herausarbeiten — ein Sprach- oder Rätselsystem durch Beobachtung und Testen über viele Stunden entschlüsseln',
        type: 'chants',
      },
      {
        en: 'Physical navigation — choosing the best route up a sheer cliff, managing rope and stamina to find the path forward',
        zh: '物理导航——选择攀登陡峭崖壁的最佳路线，管理绳索和体力找到前进之路',
        zhTW: '物理導航——選擇攀登陡峭崖壁的最佳路線，管理繩索和體力找到前進之路',
        ja: '物理的なナビゲーション——険しい崖を登る最適なルートを選び、ロープとスタミナを管理しながら進む道を見つける',
        ko: '물리적 탐색——가파른 절벽을 오르는 최적의 경로를 선택하고, 밧줄과 체력을 관리해 앞으로 나아가는 길 찾기',
        de: 'Physische Navigation — die beste Route eine steile Felswand hinauf wählen, Seil und Ausdauer managen, um vorwärtszukommen',
        type: 'jusant',
      },
    ],
  },
  {
    q_en: 'Which game world description draws you in most?',
    q_zh: '哪个游戏世界的描述最吸引你？',
    q_zhTW: '哪個遊戲世界的描述最吸引你？',
    q_ja: 'どのゲーム世界の描写が一番引き込まれますか？',
    q_ko: '어떤 게임 세계 묘사가 가장 끌리나요?',
    q_de: 'Welche Spielwelt-Beschreibung zieht dich am stärksten an?',
    options: [
      {
        en: 'A hand-crafted pixel-art JRPG world lit by two suns and a moon, with ancient eclipse magic, diverse landscapes, and a cast of characters you will remember for years',
        zh: '一个由两个太阳和一个月亮照亮的手工制作像素艺术 JRPG 世界，有古老的日食魔法、多样的地形，以及你会记住多年的角色阵容',
        zhTW: '一個由兩個太陽和一個月亮照亮的手工製作像素藝術 JRPG 世界，有古老的日食魔法、多樣的地形，以及你會記住多年的角色陣容',
        ja: '二つの太陽と一つの月に照らされた手作りのピクセルアートJRPGの世界——古代の日食魔法、多様な風景、そして何年も記憶に残るキャラクターたち',
        ko: '두 개의 태양과 달이 비추는 수제 픽셀아트 JRPG 세계——고대의 일식 마법, 다양한 지형, 그리고 몇 년 동안 기억에 남을 캐릭터들',
        de: 'Eine handgefertigte Pixel-Art-JRPG-Welt, beleuchtet von zwei Sonnen und einem Mond — mit uralter Finsternis-Magie, vielfältigen Landschaften und Charakteren, die du jahrelang nicht vergisst',
        type: 'seasofstars',
      },
      {
        en: 'A corporate robotics campus where every machine, enemy, and sound effect pulses in sync with a punk-rock soundtrack — a world where music is physics',
        zh: '一个企业机器人园区，每台机器、每个敌人和每个音效都与朋克摇滚原声带同步脉动——一个音乐即物理的世界',
        zhTW: '一個企業機器人園區，每台機器、每個敵人和每個音效都與龐克搖滾原聲帶同步脈動——一個音樂即物理的世界',
        ja: '企業のロボットキャンパス——すべてのマシン、敵、効果音がパンクロックのサウンドトラックに同期して脈動する。音楽が物理法則の世界',
        ko: '기업 로봇 캠퍼스——모든 기계, 적, 효과음이 펑크 록 사운드트랙에 맞춰 동기화되어 맥동하는, 음악이 곧 물리 법칙인 세계',
        de: 'Ein Konzern-Roboter-Campus, wo jede Maschine, jeder Feind und jeder Soundeffekt mit dem Punk-Rock-Soundtrack synchron pulsiert — eine Welt, in der Musik Physik ist',
        type: 'hifirush',
      },
      {
        en: 'An ancient, multi-level tower inspired by the Tower of Babel, each floor inhabited by a civilization speaking a unique language you must decode from context clues and gestures',
        zh: '一座受巴别塔启发的古老多层塔，每层楼都有一个使用独特语言的文明，你必须从上下文线索和姿态中解码',
        zhTW: '一座受巴別塔啟發的古老多層塔，每層樓都有一個使用獨特語言的文明，你必須從上下文線索和姿態中解碼',
        ja: 'バベルの塔にインスパイアされた古代の多層タワー——各フロアには独自の言語を話す文明が住んでいて、文脈の手がかりとジェスチャーから解読しなければならない',
        ko: '바벨탑에서 영감을 받은 고대의 다층 탑——각 층에는 독특한 언어를 쓰는 문명이 살고 있어, 맥락의 단서와 몸짓으로 해독해야 해요',
        de: 'Ein alter, mehrstöckiger Turm nach dem Vorbild des Turms von Babel — jede Etage bewohnt von einer Zivilisation mit eigener Sprache, die du aus Kontext und Gesten entschlüsseln musst',
        type: 'chants',
      },
      {
        en: 'A post-flood vertical world where humanity has migrated upward to survive — a world of rope bridges, cliff faces, gusting wind, and absolute silence broken only by the sound of your own hands finding holds',
        zh: '一个洪水后的垂直世界，人类向上迁移以生存——一个有绳桥、悬崖面、阵阵风声的世界，只有你双手寻找抓点的声音打破沉默',
        zhTW: '一個洪水後的垂直世界，人類向上遷移以生存——一個有繩橋、懸崖面、陣陣風聲的世界，只有你雙手尋找抓點的聲音打破沉默',
        ja: '大洪水後の垂直世界——人類が生き残るために上へ移住した。ロープブリッジ、断崖絶壁、強風が吹き荒れる世界。聞こえるのはホールドを探す自分の手の音だけ',
        ko: '홍수 이후의 수직 세계——인류가 살아남기 위해 위로 이동한 곳. 로프 다리, 절벽, 바람 소리가 가득한 세계. 들리는 건 당신의 손이 홀드를 찾는 소리뿐',
        de: 'Eine vertikale Welt nach der Flut, in die sich die Menschheit nach oben zurückgezogen hat — Seilbrücken, Felswände, pfeifender Wind, und als einziges Geräusch die eigenen Hände, die Griffe suchen',
        type: 'jusant',
      },
    ],
  },
  {
    q_en: 'What role should story play in your ideal game?',
    q_zh: '故事在你理想的游戏中应该扮演什么角色？',
    q_zhTW: '故事在你理想的遊戲中應該扮演什麼角色？',
    q_ja: 'あなたの理想のゲームにおいて、ストーリーはどんな役割を果たすべきですか？',
    q_ko: '당신의 이상적인 게임에서 이야기는 어떤 역할을 해야 하나요?',
    q_de: 'Welche Rolle soll die Story in deinem idealen Spiel spielen?',
    options: [
      {
        en: 'Central and emotional — I want a full narrative with memorable characters, genuine emotional beats, and a satisfying conclusion',
        zh: '核心且有情感——我想要一个有令人难忘角色、真实情感节拍和令人满意结局的完整叙事',
        zhTW: '核心且有情感——我想要一個有令人難忘角色、真實情感節拍和令人滿意結局的完整敘事',
        ja: '中心的かつ感情的——記憶に残るキャラクター、真の感情的な瞬間、そして満足のいく結末を持つ完全なナラティブ',
        ko: '중심적이고 감동적——기억에 남는 캐릭터, 진정한 감정적 순간, 만족스러운 결말이 있는 완전한 서사',
        de: 'Zentral und emotional — ich will eine vollständige Geschichte mit unvergesslichen Charakteren, echten emotionalen Momenten und einem befriedigenden Ende',
        type: 'seasofstars',
      },
      {
        en: 'Present and comedic — I want personality, genuine humor, and heart in the writing without taking itself too seriously',
        zh: '存在且有喜剧性——我希望文字有个性、真正的幽默和温情，而不是过于严肃',
        zhTW: '存在且有喜劇性——我希望文字有個性、真正的幽默和溫情，而不是過於嚴肅',
        ja: '存在感があってコミカル——個性、本物のユーモア、そして心のあるテキストを求めている。真剣になりすぎないで',
        ko: '존재하고 코믹하게——개성 있고, 진정한 유머와 따뜻함이 있는 글을, 너무 진지하지 않게',
        de: 'Vorhanden und komödiantisch — ich will Persönlichkeit, echten Humor und Herz in den Texten, ohne sich selbst zu ernst zu nehmen',
        type: 'hifirush',
      },
      {
        en: 'Environmental and archaeological — I want to piece together history from what I observe, with the revelation arriving slowly through my own deductions',
        zh: '环境的和考古式的——我想通过观察拼凑历史，启示通过我自己的推理缓缓到来',
        zhTW: '環境的和考古式的——我想通過觀察拼湊歷史，啟示通過我自己的推理緩緩到來',
        ja: '環境的かつ考古学的——観察から歴史を組み立てたい。自分の推論を通じてゆっくりと啓示が訪れる',
        ko: '환경적이고 고고학적——관찰을 통해 역사를 조각 맞추고, 내 추론을 통해 계시가 천천히 찾아오는 방식',
        de: 'Umgebungsbasiert und archäologisch — ich will Geschichte aus dem zusammensetzen, was ich beobachte, mit Erkenntnissen, die durch meine eigenen Schlussfolgerungen langsam kommen',
        type: 'chants',
      },
      {
        en: 'Wordless and ambient — I want the world itself to be the story, told through atmosphere and architecture without dialogue or cutscenes',
        zh: '无言且氛围性的——我希望世界本身就是故事，通过氛围和建筑而非对话或过场动画来讲述',
        zhTW: '無言且氛圍性的——我希望世界本身就是故事，通過氛圍和建築而非對話或過場動畫來講述',
        ja: '言葉なく、環境的に——世界そのものが物語であってほしい。対話やカットシーンではなく、雰囲気と建築で語られる',
        ko: '말 없이 분위기로——대화나 컷씬 없이 세계 자체가 분위기와 건축으로 이야기를 들려주길 바라요',
        de: 'Wortlos und atmosphärisch — die Welt selbst soll die Geschichte sein, erzählt durch Atmosphäre und Architektur ohne Dialog oder Cutscenes',
        type: 'jusant',
      },
    ],
  },
  {
    q_en: 'What length of game feels most satisfying to you?',
    q_zh: '多长的游戏对你来说最令人满足？',
    q_zhTW: '多長的遊戲對你來說最令人滿足？',
    q_ja: 'ゲームの長さとして一番満足感があるのはどれですか？',
    q_ko: '어느 정도 길이의 게임이 가장 만족스럽게 느껴지나요?',
    q_de: 'Welche Spiellänge fühlt sich für dich am befriedigendsten an?',
    options: [
      {
        en: '30-40 hours — a complete JRPG adventure that earns its length without padding, with enough content to feel epic',
        zh: '30-40 小时——一个完整的 JRPG 冒险，充分利用时长而不填充内容，有足够的内容让人感到史诗',
        zhTW: '30-40 小時——一個完整的 JRPG 冒險，充分利用時長而不填充內容，有足夠的內容讓人感到史詩',
        ja: '30〜40時間——パディングなしで長さを正当化する完全なJRPGアドベンチャー、壮大と感じるのに十分なコンテンツ',
        ko: '30-40시간——패딩 없이 길이를 충분히 활용하는 완전한 JRPG 모험, 서사적으로 느껴질 만한 충분한 콘텐츠',
        de: '30–40 Stunden — ein vollständiges JRPG-Abenteuer, das seine Länge rechtfertigt ohne Füller, mit genug Inhalt für ein episches Gefühl',
        type: 'seasofstars',
      },
      {
        en: '12-15 hours — a perfectly paced, complete experience I can finish comfortably in a week or two of evenings',
        zh: '12-15 小时——节奏完美、内容完整的体验，我可以在一到两周的晚上舒适地完成',
        zhTW: '12-15 小時——節奏完美、內容完整的體驗，我可以在一到兩週的晚上舒適地完成',
        ja: '12〜15時間——ペースが完璧で完結した体験。1〜2週間の夜にゆっくり終えられる',
        ko: '12-15시간——페이스가 완벽하고 완결된 경험, 1-2주의 저녁 시간에 편안하게 끝낼 수 있는',
        de: '12–15 Stunden — eine perfekt getaktete, vollständige Erfahrung, die ich bequem in ein bis zwei Wochen Abenden durchspielen kann',
        type: 'hifirush',
      },
      {
        en: '10-15 hours — a focused experience that respects my time and delivers its best ideas without repetition',
        zh: '10-15 小时——一段专注的体验，尊重我的时间，不重复地呈现最好的创意',
        zhTW: '10-15 小時——一段專注的體驗，尊重我的時間，不重複地呈現最好的創意',
        ja: '10〜15時間——私の時間を尊重した集中した体験、繰り返しなしで最良のアイデアを届ける',
        ko: '10-15시간——내 시간을 존중하는 집중된 경험, 반복 없이 최선의 아이디어를 전달하는',
        de: '10–15 Stunden — ein fokussiertes Erlebnis, das meine Zeit respektiert und seine besten Ideen ohne Wiederholung liefert',
        type: 'chants',
      },
      {
        en: '5-8 hours — a short, beautiful, complete meditation that leaves a lasting impression precisely because it knows when to end',
        zh: '5-8 小时——一段短暂、美丽、完整的冥想，恰恰因为知道何时结束而留下持久的印象',
        zhTW: '5-8 小時——一段短暫、美麗、完整的冥想，恰恰因為知道何時結束而留下持久的印象',
        ja: '5〜8時間——短く、美しく、完結した瞑想体験。終わり時を知っているからこそ、深い印象を残す',
        ko: '5-8시간——언제 끝내야 할지 알기에 지속적인 인상을 남기는 짧고 아름답고 완전한 명상',
        de: '5–8 Stunden — eine kurze, schöne, vollständige Meditation, die genau wegen ihres Wissens, wann sie endet, einen bleibenden Eindruck hinterlässt',
        type: 'jusant',
      },
    ],
  },
  {
    q_en: 'Which feeling sounds like a perfect end-of-session moment?',
    q_zh: '哪种感觉听起来像是完美的游戏结束时刻？',
    q_zhTW: '哪種感覺聽起來像是完美的遊戲結束時刻？',
    q_ja: 'どの気持ちが完璧なセッション終了の瞬間に聞こえますか？',
    q_ko: '어떤 느낌이 완벽한 세션 종료 순간처럼 들리나요?',
    q_de: 'Welches Gefühl klingt nach dem perfekten Ende einer Spielsitzung?',
    options: [
      {
        en: 'I just cleared a boss I had struggled with by finally using the right combo of abilities — the strategy clicked and the victory felt earned',
        zh: '我刚刚用正确的技能组合通关了一个一直在挣扎的 Boss——策略豁然开朗，胜利来之不易',
        zhTW: '我剛剛用正確的技能組合通關了一個一直在掙扎的 Boss——策略豁然開朗，勝利來之不易',
        ja: 'ちょうど正しいアビリティの組み合わせでずっと苦しんでいたボスを倒せた——戦略が噛み合い、勝利を勝ち取った',
        ko: '드디어 올바른 능력 조합으로 계속 고생하던 보스를 클리어했어요——전략이 맞아떨어지고 승리가 값지게 느껴졌어요',
        de: 'Ich habe gerade einen Boss, mit dem ich kämpfte, mit der richtigen Fähigkeitenkombination besiegt — die Strategie hat geklickt und der Sieg hat sich verdient angefühlt',
        type: 'seasofstars',
      },
      {
        en: 'I just cleared a stage while perfectly parrying every beat — the whole fight felt like a music video I was part of',
        zh: '我刚刚在完美格挡每个节拍的同时通关了一个关卡——整场战斗感觉像是我参与其中的音乐录影带',
        zhTW: '我剛剛在完美格擋每個節拍的同時通關了一個關卡——整場戰鬥感覺像是我參與其中的音樂錄影帶',
        ja: 'すべてのビートを完璧にパリィしながらステージをクリアした——戦闘全体が自分が主役のミュージックビデオみたいだった',
        ko: '모든 비트를 완벽하게 패리하며 스테이지를 클리어했어요——전체 전투가 내가 참여한 뮤직비디오처럼 느껴졌어요',
        de: 'Ich habe gerade eine Stage durchgespielt und dabei jeden Beat perfekt parriert — der gesamte Kampf fühlte sich wie ein Musikvideo an, in dem ich mitspiele',
        type: 'hifirush',
      },
      {
        en: 'I just deciphered three lines of an ancient inscription and understood something the designers put there specifically for me to discover at this moment',
        zh: '我刚刚解读了三行古代铭文，理解了设计师特意放在那里等我在这一刻发现的东西',
        zhTW: '我剛剛解讀了三行古代銘文，理解了設計師特意放在那裡等我在這一刻發現的東西',
        ja: '古代の碑文を3行解読して、デザイナーがこの瞬間に自分が発見するためだけに置いたものを理解した',
        ko: '방금 고대 비문 세 줄을 해독해서, 디자이너가 바로 이 순간 내가 발견하도록 특별히 넣어둔 것을 이해했어요',
        de: 'Ich habe gerade drei Zeilen einer alten Inschrift entziffert und etwas verstanden, das die Designer genau für diesen Moment dort hinterlassen haben',
        type: 'chants',
      },
      {
        en: 'I reached a summit I could not see from the valley floor — and the view at the top made me stop playing and just look for a full minute',
        zh: '我到达了从谷底看不到的山顶——山顶的景色让我停止游戏，静静地看了整整一分钟',
        zhTW: '我到達了從谷底看不到的山頂——山頂的景色讓我停止遊戲，靜靜地看了整整一分鐘',
        ja: '谷底からは見えなかった山頂に到達した——頂上からの眺めに思わずゲームを止めて、まるまる1分間ただ見入ってしまった',
        ko: '계곡 바닥에서는 보이지 않던 정상에 도달했어요——정상에서의 경치에 게임을 멈추고 꼬박 1분 동안 그냥 바라봤어요',
        de: 'Ich habe einen Gipfel erreicht, den ich vom Tal aus nicht sehen konnte — die Aussicht hat mich zum Aufhören gebracht, und ich habe einfach eine volle Minute lang nur geschaut',
        type: 'jusant',
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
  seasofstars: {
    title_en: 'Sea of Stars',
    title_zh: '星之海',
    title_zhTW: '星之海',
    title_ja: 'シー・オブ・スターズ',
    title_ko: '시 오브 스타즈',
    title_de: 'Sea of Stars',
    emoji: '⭐',
    tag_en: 'A love letter to classic JRPGs — stunning pixel-art world lit by two suns and a moon, accessible turn-based combat, and a story that earns its emotional beats',
    tag_zh: '致经典 JRPG 的情书——由两个太阳和一个月亮照亮的惊艳像素艺术世界、平易近人的回合制战斗，以及一个真正触动情感的故事',
    tag_zhTW: '致經典 JRPG 的情書——由兩個太陽和一個月亮照亮的驚艷像素藝術世界、平易近人的回合制戰鬥，以及一個真正觸動情感的故事',
    tag_ja: 'クラシックJRPGへのラブレター——二つの太陽と月に照らされた美しいピクセルアートの世界、親しみやすいターン制バトル、そして心を揺さぶるストーリー',
    tag_ko: '클래식 JRPG에 바치는 러브레터——두 개의 태양과 달이 빛나는 멋진 픽셀 아트 세계, 접근하기 쉬운 턴제 전투, 그리고 진정으로 감동적인 이야기',
    tag_de: 'Ein Liebesbrief an klassische JRPGs — atemberaubende Pixel-Art-Welt beleuchtet von zwei Sonnen und einem Mond, zugängliche Rundenkämpfe und eine Geschichte mit echten emotionalen Momenten',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox, Game Pass — about $35. Available day one on Game Pass.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——约 35 美元。Game Pass 首日可玩。',
    platform_zhTW: '可在以下平台獲取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——約 35 美元。Game Pass 首日可玩。',
    platform_ja: '対応プラットフォーム：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——約3,500円。Game Passで初日から遊べます。',
    platform_ko: '이용 가능 플랫폼：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——약 35달러. Game Pass 첫날 플레이 가능.',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox, Game Pass — ca. 35 €. Ab Tag 1 im Game Pass.',
    why_en:
      "Sea of Stars (2023) is the best classic-style JRPG in over a decade — a game that grew from a Kickstarter project into one of the highest-rated indie games of 2023 (91 Metacritic). Set in the world of The Messenger (though completely standalone), you play as Solstice Warriors who use the power of the sun and moon to combat the alchemist Fleshmancer and his creations. The combat system is turn-based but alive: you can time your button presses to deal extra damage or reduce incoming hits, your characters each have distinct abilities that chain together, and the game never becomes a grind thanks to smartly designed encounters. The world is handcrafted with stunning pixel art — beaches, ruins, forests, mountaintops, and underwater cities each have their own visual identity. The music by Rainbowdragoneyes features a guest track by Yasunori Mitsuda (Chrono Trigger composer). Cozy gamers will appreciate: no random encounters (enemies visible on screen), frequent save points, adjustable difficulty, and a story with genuine warmth alongside its epic moments. The game pays tribute to SNES-era JRPGs while delivering modern accessibility. Available on Game Pass, making it easy to try risk-free.",
    why_zh:
      '星之海（2023 年）是十多年来最好的经典风格 JRPG——一款从 Kickstarter 项目成长为 2023 年评分最高的独立游戏之一（Metacritic 91 分）的作品。设定在 The Messenger 的世界中（但完全独立），你扮演使用太阳和月亮力量与炼金术师 Fleshmancer 及其创造物战斗的至日战士。战斗系统是回合制但富有活力：你可以掌握按键时机来造成额外伤害或减少受到的打击，每个角色都有独特的技能可以连锁，游戏因精心设计的遭遇战而从不变成磨练。世界用惊艳的像素艺术精心制作——海滩、遗迹、森林、山顶和水下城市各有独特的视觉特征。音乐由 Rainbowdragoneyes 创作，包含 Yasunori Mitsuda（《超时空触媒》作曲家）的客串曲目。Cozy 玩家会欣赏：没有随机遭遇战（敌人在屏幕上可见）、频繁的存档点、可调节的难度，以及在史诗时刻中充满真实温情的故事。Game Pass 上可用，让试玩变得风险极低。',
    why_zhTW:
      '星之海（2023年）是十多年來最好的經典風格JRPG——從Kickstarter專案成長為2023年評分最高的獨立遊戲之一（Metacritic 91分）的作品。設定在The Messenger的世界中（但完全獨立），你扮演使用太陽和月亮力量與煉金術師Fleshmancer及其創造物戰鬥的至日戰士。戰鬥系統是回合制但富有活力：你可以掌握按鍵時機來造成額外傷害或減少受到的打擊，每個角色都有獨特的技能可以連鎖，遊戲因精心設計的遭遇戰而從不變成磨練。世界用驚艷的像素藝術精心製作——海灘、遺蹟、森林、山頂和水下城市各有獨特的視覺特徵。音樂由Rainbowdragoneyes創作，包含Yasunori Mitsuda（《超時空觸媒》作曲家）的客串曲目。Cozy玩家會欣賞：沒有隨機遭遇戰（敵人在螢幕上可見）、頻繁的存檔點、可調節的難度，以及在史詩時刻中充滿真實溫情的故事。Game Pass上可用。',
    why_ja:
      'シー・オブ・スターズ（2023年）は10年以上ぶりの最高のクラシックスタイルJRPG——KickstarterプロジェクトからMetacritic 91点を獲得した2023年最高インディーゲームの一つへと成長した作品。The Messengerの世界を舞台に（完全に独立したストーリー）、太陽と月の力を使って錬金術師フレッシュマンサーと戦う至点の戦士を操る。バトルシステムはターン制ながらも躍動感があり、ボタンのタイミングを合わせれば追加ダメージや被ダメージ軽減が可能。各キャラクターは独自のスキルを持ち連携させられる。ランダムエンカウントなし（敵はマップ上で見える）、こまめなセーブポイント、難易度調整可能でコージーゲーマーにも優しい設計。Yasunori Mitsuda（クロノトリガー作曲家）がゲスト曲を提供したサウンドトラックも必聴。Game Pass対応。',
    why_ko:
      '시 오브 스타즈（2023）는 10년 만에 등장한 최고의 클래식 스타일 JRPG——Kickstarter 프로젝트에서 Metacritic 91점을 받은 2023년 최고의 인디 게임 중 하나로 성장한 작품입니다. The Messenger의 세계관을 배경으로（완전히 독립적인 스토리） 태양과 달의 힘으로 연금술사 Fleshmancer와 싸우는 지점의 전사를 조종합니다. 전투 시스템은 턴제이지만 생동감 넘칩니다: 버튼 타이밍을 맞추면 추가 피해를 주거나 받는 피해를 줄일 수 있으며, 각 캐릭터는 연계 가능한 고유 스킬을 가집니다. 랜덤 인카운터 없음（적이 화면에 보임）, 자주 있는 세이브 포인트, 조절 가능한 난이도로 코지 게이머에게 접근하기 쉽습니다. 크로노 트리거 작곡가 Yasunori Mitsuda의 게스트 트랙이 담긴 음악도 훌륭합니다. Game Pass 이용 가능.',
    why_de:
      'Sea of Stars (2023) ist das beste klassische JRPG seit über einem Jahrzehnt — von einem Kickstarter-Projekt zu einem der meistgefeierten Indie-Games des Jahres 2023 geworden (Metacritic 91). In der Welt von The Messenger spielst du Solstice Warriors, die die Kraft von Sonne und Mond nutzen, um den Alchimisten Fleshmancer zu bekämpfen. Das Kampfsystem ist rundenbasiert, aber lebendig: Button-Timing ermöglicht Bonusschaden und reduziert eingehende Treffer. Kein zufälliger Encounter (Feinde sichtbar auf der Karte), häufige Speicherpunkte und einstellbare Schwierigkeit machen es für Cozy-Gamer zugänglich. Der Soundtrack enthält einen Gasttrack von Yasunori Mitsuda (Chrono-Trigger-Komponist). Im Game Pass enthalten — ideal zum risikofreien Ausprobieren.',
    tip_en: "Always time your Timed Hits (a ring appears — press the button when it shrinks to the inner circle) — they deal significantly more damage than untimed hits. Similarly, blocking works the same way. The timing window is generous early game; getting in the habit from the start makes the later game much more enjoyable.",
    tip_zh: '始终掌握计时攻击的时机（出现一个圆环——当它收缩到内圆时按下按键）——它们造成的伤害明显高于非计时攻击。同样，格挡也以相同方式工作。游戏早期的时机窗口很宽裕；从一开始就养成习惯会让后期游戏更加愉快。',
    tip_zhTW: '始終掌握計時攻擊的時機（出現一個圓環——當它收縮到內圓時按下按鍵）——它們造成的傷害明顯高於非計時攻擊。同樣，格擋也以相同方式工作。遊戲早期的時機窗口很寬裕；從一開始就養成習慣會讓後期遊戲更加愉快。',
    tip_ja: 'タイムドヒット（輪が表示されたら内側の円に縮んだときにボタンを押す）を必ず意識しよう——タイミングが合えばダメージが大幅に上がる。ガードも同じ仕組み。序盤は判定が甘めなので、最初からクセをつけておくと後半がずっと楽しくなる。',
    tip_ko: '타이밍 공격을 항상 활용하세요（링이 나타나면 안쪽 원으로 줄어들 때 버튼 누르기）——타이밍이 맞으면 피해가 크게 증가합니다. 가드도 같은 방식입니다. 초반 타이밍 판정이 넉넉하니 처음부터 습관을 들이면 후반 게임이 훨씬 즐거워집니다.',
    tip_de: 'Nutze immer Timed Hits (ein Ring erscheint — drücke, wenn er sich zum inneren Kreis zusammenzieht) — sie machen deutlich mehr Schaden als ungetimte Angriffe. Blocken funktioniert gleich. Das Timing-Fenster ist im Early Game großzügig; die Gewohnheit früh zu entwickeln macht das spätere Spiel viel angenehmer.',
  },
  hifirush: {
    title_en: 'Hi-Fi Rush',
    title_zh: 'Hi-Fi Rush',
    title_zhTW: 'Hi-Fi Rush',
    title_ja: 'ハイファイ・ラッシュ',
    title_ko: 'Hi-Fi Rush',
    title_de: 'Hi-Fi Rush',
    emoji: '🎸',
    tag_en: 'A rhythm-action game where EVERYTHING pulses to the beat — combat, environment, enemies, dialogue — with a Jet Set Radio visual style and genuinely funny writing',
    tag_zh: '一款一切都随节拍脉动的节奏动作游戏——战斗、环境、敌人、对话——拥有 Jet Set Radio 视觉风格和真正幽默的文字',
    tag_zhTW: '一款一切都隨節拍脈動的節奏動作遊戲——戰鬥、環境、敵人、對話——擁有 Jet Set Radio 視覺風格和真正幽默的文字',
    tag_ja: 'すべてがビートに合わせて脈動するリズムアクションゲーム——戦闘、環境、敵、セリフ——Jet Set Radioスタイルのビジュアルとクスッと笑えるシナリオ',
    tag_ko: '전투, 환경, 적, 대화까지 모든 것이 비트에 맞춰 맥동하는 리듬 액션 게임——Jet Set Radio 스타일의 비주얼과 진정으로 재미있는 대사',
    tag_de: 'Ein Rhythmus-Action-Game, in dem ALLES zum Beat pulsiert — Kämpfe, Umgebung, Feinde, Dialoge — mit Jet-Set-Radio-Optik und wirklich witzig geschriebenen Texten',
    platform_en: 'Available on: PC (Steam, Xbox Game Pass), Xbox Series X/S — about $30. Day-one on Game Pass. Mac via Steam.',
    platform_zh: '可在以下平台获取：PC（Steam、Xbox Game Pass）、Xbox Series X/S——约 30 美元。Game Pass 首日可玩。Mac 版通过 Steam 获取。',
    platform_zhTW: '可在以下平台獲取：PC（Steam、Xbox Game Pass）、Xbox Series X/S——約 30 美元。Game Pass 首日可玩。Mac 版通過 Steam 獲取。',
    platform_ja: '対応プラットフォーム：PC（Steam、Xbox Game Pass）、Xbox Series X/S——約3,000円。Game Passで初日から遊べます。Mac版はSteamから。',
    platform_ko: '이용 가능 플랫폼：PC（Steam、Xbox Game Pass）、Xbox Series X/S——약 30달러. Game Pass 첫날 플레이 가능. Mac은 Steam 통해 이용 가능.',
    platform_de: 'Erhältlich auf: PC (Steam, Xbox Game Pass), Xbox Series X/S — ca. 30 €. Ab Tag 1 im Game Pass. Mac via Steam.',
    why_en:
      "Hi-Fi Rush (2023) is one of the biggest surprise hits in recent gaming history — a game that was secretly developed and dropped with zero warning in January 2023, instantly becoming one of the most celebrated games of the year (87 Metacritic, 95% Steam positive). You play as Chai, an aspiring rock star who accidentally gets a music player fused into his chest during a cybernetic enhancement procedure, causing the entire world to pulse in sync with the beat. Combat involves slashing and dodging in rhythm, with every attack, environmental element, and enemy attack pattern synced to the soundtrack. The visual style is cel-shaded with a Jet Set Radio aesthetic; the writing is genuinely and consistently funny (not trying-to-be-funny, actually funny). Cozy gamers will appreciate: colorful art style, generous accessibility options, no required precision (you can play completely off-beat and still win — rhythm rewards you with extra damage but doesn't punish you for missing), and an energetic cast of characters you will become genuinely fond of. Available on Game Pass and on Mac via Steam. 12-15 hours perfectly paced. One of the most joyful gaming experiences in years.",
    why_zh:
      'Hi-Fi Rush（2023 年）是近年来游戏界最大的意外惊喜之一——一款秘密开发并在 2023 年 1 月毫无预警地发布的游戏，立即成为当年最受赞誉的游戏之一（Metacritic 87 分，Steam 好评率 95%）。你扮演 Chai，一个在赛博增强手术中意外将音乐播放器融入胸口的摇滚明星志望者，导致整个世界与节拍同步脉动。战斗涉及随节奏进行斩击和闪避，每次攻击、每个环境元素和每个敌人的攻击模式都与原声带同步。视觉风格是单色调着色的 Jet Set Radio 美学；文字是真正且一贯幽默的（不是试图幽默，而是真的幽默）。Cozy 玩家会欣赏：多彩的艺术风格、慷慨的无障碍选项、不需要精准（你可以完全不随节拍游戏仍然获胜——节奏给你额外伤害奖励但不惩罚你的失误），以及你会真正喜欢上的充满活力的角色阵容。Game Pass 上可用，Mac 版通过 Steam 获取。12-15 小时节奏完美。近年来最令人愉悦的游戏体验之一。',
    why_zhTW:
      'Hi-Fi Rush（2023年）是近年來遊戲界最大的意外驚喜之一——一款秘密開發並在2023年1月毫無預警地發佈的遊戲，立即成為當年最受讚譽的遊戲之一（Metacritic 87分，Steam好評率95%）。你扮演Chai，一個在賽博增強手術中意外將音樂播放器融入胸口的搖滾明星志望者，導致整個世界與節拍同步脈動。戰鬥涉及隨節奏進行斬擊和閃避，每次攻擊、每個環境元素和每個敵人的攻擊模式都與原聲帶同步。視覺風格是單色調著色的Jet Set Radio美學；文字是真正且一貫幽默的。Cozy玩家會欣賞：多彩的藝術風格、慷慨的無障礙選項、不需要精準（你可以完全不隨節拍遊戲仍然獲勝）。Game Pass上可用，Mac版通過Steam獲取。12-15小時節奏完美。',
    why_ja:
      'ハイファイ・ラッシュ（2023年）はゲーム史上最大のサプライズヒットの一つ——2023年1月に予告なしでリリースされ、即座に年間最高評価ゲームの一つとなった（Metacritic 87点、Steam好評率95%）。主人公のチャイは改造手術で胸に音楽プレイヤーが埋め込まれ、世界全体がビートに合わせて脈動するようになる。戦闘はリズムに合わせた斬撃と回避で、攻撃・環境・敵の動きすべてがサウンドトラックに同期。セルシェードのJet Set Radioスタイルのビジュアルと本当に笑えるシナリオが魅力。アクセシビリティ充実で、リズムを外してもクリアできるのでコージーゲーマーにも優しい。Game Pass対応、Mac版はSteam。12〜15時間で完結。',
    why_ko:
      'Hi-Fi Rush（2023）는 게임 역사상 가장 큰 서프라이즈 히트 중 하나——2023년 1월 예고 없이 출시되어 즉시 그 해 최고 평가 게임 중 하나가 된（Metacritic 87점, Steam 호평률 95%） 작품입니다. 주인공 차이는 사이버 강화 수술 중 가슴에 음악 플레이어가 융합되어 온 세상이 비트에 맞춰 맥동하게 됩니다. 전투는 리듬에 맞춘 공격과 회피이며, 모든 공격, 환경 요소, 적의 움직임이 사운드트랙과 동기화됩니다. Jet Set Radio 스타일의 셀 셰이딩 비주얼과 진정으로 재밌는 대사가 매력입니다. 접근성 옵션이 풍부해 비트를 놓쳐도 클리어 가능하므로 코지 게이머에게도 친절합니다. Game Pass 이용 가능, Mac은 Steam. 12-15시간에 완결.',
    why_de:
      'Hi-Fi Rush (2023) ist einer der größten Überraschungshits der jüngeren Spielegeschichte — heimlich entwickelt und im Januar 2023 ohne Vorwarnung veröffentlicht, sofort eines der gefeiertsten Spiele des Jahres (Metacritic 87, 95% positive Steam-Reviews). Chai bekommt versehentlich einen Musikplayer in die Brust implantiert, woraufhin die ganze Welt im Takt pulst. Kämpfe laufen rhythmisch ab; Angriffe, Umgebung und Feindaktionen sind alle mit dem Soundtrack synchronisiert. Cel-Shading im Jet-Set-Radio-Stil, und die Texte sind wirklich — nicht nur versucht — witzig. Zugänglichkeitsoptionen bedeuten: Rhythmus verpassen bestraft nicht, belohnt nur. Im Game Pass enthalten, Mac über Steam. 12–15 Stunden, perfekt getaktet.',
    tip_en: "Don't worry about keeping perfect rhythm — accessibility options mean missing beats never stops your run. Focus on learning the core combo (three swings into a finisher) early, then gradually start trying to time your attacks to the music. The game rewards rhythm with bonus damage, and when it clicks you feel like a music video protagonist.",
    tip_zh: '不要担心保持完美的节奏——无障碍选项意味着错过节拍永远不会停止你的战斗。专注于早期学习核心连击（三次挥砍接终结技），然后逐渐开始尝试将你的攻击与音乐同步。游戏用额外伤害奖励节奏感，当你掌握它时，你会感觉像是音乐录影带的主角。',
    tip_zhTW: '不要擔心保持完美的節奏——無障礙選項意味著錯過節拍永遠不會停止你的戰鬥。專注於早期學習核心連擊（三次揮砍接終結技），然後逐漸開始嘗試將你的攻擊與音樂同步。遊戲用額外傷害獎勵節奏感，當你掌握它時，你會感覺像是音樂錄影帶的主角。',
    tip_ja: '完璧なリズムにこだわらなくて大丈夫——アクセシビリティ設定でビートを外しても戦闘は続けられる。まずは基本コンボ（3回斬ってフィニッシャー）を覚え、慣れてきたら音楽に合わせてタイミングを意識しよう。リズムが合い始めると、自分がミュージックビデオの主人公みたいに感じられる。',
    tip_ko: '완벽한 리듬을 유지하는 것에 집착하지 마세요——접근성 옵션 덕분에 비트를 놓쳐도 전투는 계속됩니다. 핵심 콤보（세 번 베기 후 마무리 기술）를 먼저 익힌 다음, 점차 공격 타이밍을 음악에 맞춰 보세요. 리듬이 맞기 시작하면 뮤직비디오의 주인공이 된 기분이 납니다.',
    tip_de: 'Mach dir keine Sorgen wegen perfektem Rhythmus — Zugänglichkeitsoptionen bedeuten, dass ausgelassene Beats deinen Run nie stoppen. Lerne zuerst den Kern-Combo (drei Schläge in einen Finisher), dann fang langsam an, Angriffe mit der Musik zu timen. Das Spiel belohnt Rhythmus mit Bonusschaden — und wenn es klickt, fühlst du dich wie der Protagonist eines Musikvideos.',
  },
  chants: {
    title_en: 'Chants of Sennaar',
    title_zh: '塞纳尔圣歌',
    title_zhTW: '塞納爾聖歌',
    title_ja: 'センナールの詠唱',
    title_ko: '챈츠 오브 세나르',
    title_de: 'Chants of Sennaar',
    emoji: '📜',
    tag_en: 'Decipher the languages of several ancient civilizations in a Babel-inspired tower — a puzzle game about understanding, not combat, where every solved glyph unlocks a deeper mystery',
    tag_zh: '在一座受巴别塔启发的塔中解密几个古代文明的语言——一款关于理解而非战斗的谜题游戏，每解开一个象形文字都会揭示更深的谜题',
    tag_zhTW: '在一座受巴別塔啟發的塔中解密幾個古代文明的語言——一款關於理解而非戰鬥的謎題遊戲，每解開一個象形文字都會揭示更深的謎題',
    tag_ja: 'バベルの塔にインスパイアされた塔の中で複数の古代文明の言語を解読する——戦闘でなく「理解すること」を核心においたパズルゲーム。解けた文字ひとつひとつが深い謎を開く',
    tag_ko: '바벨탑에서 영감받은 탑 안에서 여러 고대 문명의 언어를 해독하는——전투가 아닌 이해에 초점을 맞춘 퍼즐 게임. 해독한 상형문자 하나하나가 더 깊은 비밀을 열어줍니다',
    tag_de: 'Entziffere die Sprachen mehrerer antiker Zivilisationen in einem von Babel inspirierten Turm — ein Rätselspiel über Verstehen, nicht Kämpfen, wo jedes gelöste Schriftzeichen ein tieferes Geheimnis öffnet',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox, Game Pass — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——约 20 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——約 20 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——約2,000円',
    platform_ko: '이용 가능 플랫폼：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——약 20달러',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox, Game Pass — ca. 20 €',
    why_en:
      "Chants of Sennaar (2023) is the most original puzzle game in years — a game where the core mechanic is deciphering languages from scratch, and the reward is understanding. Inspired by the Tower of Babel myth, you ascend through a multi-level tower where each floor is inhabited by a civilization that cannot communicate with the others. You have no guidebook: you observe context (a figure points at a door and says something, you infer the glyph means 'door'), draw your own glossary, and gradually unlock deeper meaning. The game never tells you if your interpretation is right — it just becomes useful or fails to be useful. When you make a breakthrough and a formerly incomprehensible sentence suddenly becomes clear, the satisfaction is unlike almost any other game experience. Visually it uses a striking Art Deco illustration style; aurally the ambient music is deeply atmospheric. Stealth sections (avoiding guards) can be skipped entirely on lower difficulty. Total playtime is 10-15 hours without feeling padded. A 2024 BAFTA nominee for Best Game. Perfect for puzzle game lovers who want something completely original.",
    why_zh:
      '塞纳尔圣歌（2023 年）是近年来最具原创性的谜题游戏——一款核心机制是从零开始破译语言，奖励是理解的游戏。受巴别塔神话启发，你攀登一座多层塔，每层楼都住着一个无法与其他文明交流的文明。你没有指南：你观察上下文（一个人物指着门说了些什么，你推断那个象形文字意味着"门"），绘制你自己的词汇表，并逐渐解锁更深的含义。游戏从不告诉你你的解释是否正确——它只是变得有用或无法使用。当你取得突破，一个以前无法理解的句子突然变得清晰时，那种满足感与几乎任何其他游戏体验都不同。视觉上使用引人注目的装饰艺术插画风格；听觉上氛围音乐极具感染力。潜行部分（避开守卫）可以在较低难度完全跳过。总游戏时间为 10-15 小时，不感到填充。2024 年 BAFTA 最佳游戏提名。适合想要完全原创内容的谜题游戏爱好者。',
    why_zhTW:
      '塞納爾聖歌（2023年）是近年來最具原創性的謎題遊戲——一款核心機制是從零開始破譯語言，獎勵是理解的遊戲。受巴別塔神話啟發，你攀登一座多層塔，每層樓都住著一個無法與其他文明交流的文明。你沒有指南：你觀察上下文，繪製你自己的詞彙表，並逐漸解鎖更深的含義。遊戲從不告訴你你的解釋是否正確——它只是變得有用或無法使用。視覺上使用引人注目的裝飾藝術插畫風格；聽覺上氛圍音樂極具感染力。潛行部分可以在較低難度完全跳過。總遊戲時間為10-15小時。2024年BAFTA最佳遊戲提名。適合想要完全原創內容的謎題遊戲愛好者。',
    why_ja:
      'センナールの詠唱（2023年）は近年最も独創的なパズルゲーム——言語を一から解読することが核心メカニズムで、報酬は「理解」そのもの。バベルの塔神話にインスパイアされた多層の塔を昇り、各フロアには独自の言語を話す文明が存在する。ガイドブックはない：文脈（人物がドアを指して何か言う→そのグリフは「ドア」だと推測）とジェスチャーを観察し、自分の語彙表を作り上げていく。正解かどうかゲームは教えてくれない——使えるか使えないかで分かる。アール・デコ調のイラストレーションスタイルとディープな環境音楽が印象的。ステルスセクションは難易度を下げればスキップ可能。10〜15時間で完結。2024年BAFTAノミネート作品。',
    why_ko:
      '챈츠 오브 세나르（2023）는 근래 가장 독창적인 퍼즐 게임——언어를 처음부터 해독하는 것이 핵심 메커니즘이며, 보상은 이해 그 자체입니다. 바벨탑 신화에서 영감을 받아 각 층마다 독자적인 언어를 쓰는 문명이 사는 다층 탑을 오릅니다. 안내서는 없습니다: 문맥과 몸짓을 관찰해 자신만의 어휘집을 만들어 나갑니다. 게임은 해석이 맞는지 알려주지 않습니다——사용 가능한지 그렇지 않은지로 알 수 있습니다. 아르 데코 삽화 스타일과 깊은 분위기의 음악이 인상적입니다. 스텔스 구간은 낮은 난이도에서 건너뛸 수 있습니다. 10-15시간에 완결. 2024년 BAFTA 후보작.',
    why_de:
      'Chants of Sennaar (2023) ist das originellste Rätselspiel seit Jahren — der Kern-Mechanismus ist das Entziffern von Sprachen von Grund auf, und die Belohnung ist Verstehen. Inspiriert vom Turm-von-Babel-Mythos, steigst du durch einen mehrstöckigen Turm, dessen Etagen von Zivilisationen bewohnt sind, die nicht miteinander kommunizieren können. Kein Handbuch: Du beobachtest Kontext, erstellst dein eigenes Glossar und erschließt tiefere Bedeutung schrittweise. Das Spiel sagt dir nie, ob deine Interpretation korrekt ist — sie wird einfach nützlich oder bleibt unnötig. Auffälliger Art-Deco-Illustrationsstil, atmosphärische Musik. Schleichabschnitte können auf niedrigerer Schwierigkeit übersprungen werden. 10–15 Stunden Spielzeit. 2024 BAFTA-Nominierung für Best Game.',
    tip_en: "Keep your symbol notebook actively updated — the game gives you a Rosetta Stone-style interface to record what you think each glyph means. Guess freely and revise as you learn more. Some symbols have meanings you will interpret incorrectly at first; updating your mental model is part of the process, not a failure.",
    tip_zh: '积极更新你的符号笔记本——游戏给你一个罗塞塔石碑式的界面来记录你认为每个象形文字的含义。大胆猜测并随着学习更多而修正。有些符号的含义你一开始会解读错误；更新你的思维模型是过程的一部分，而不是失败。',
    tip_zhTW: '積極更新你的符號筆記本——遊戲給你一個羅塞塔石碑式的介面來記錄你認為每個象形文字的含義。大膽猜測並隨著學習更多而修正。有些符號的含義你一開始會解讀錯誤；更新你的思維模型是過程的一部分，而不是失敗。',
    tip_ja: 'シンボルノートをこまめに更新しよう——ロゼッタストーン方式のインターフェースで各文字の意味を記録できる。積極的に推測して、学習しながら修正すればOK。最初は誤解するシンボルもあるが、メンタルモデルの更新こそがプロセスの一部であり、失敗ではない。',
    tip_ko: '기호 노트를 적극적으로 업데이트하세요——로제타석 방식의 인터페이스로 각 상형문자의 의미를 기록할 수 있습니다. 적극적으로 추측하고 더 배우면서 수정하세요. 처음에는 잘못 해석하는 기호들도 있지만, 사고 모델을 업데이트하는 것은 실패가 아니라 과정의 일부입니다.',
    tip_de: 'Halte dein Symbolnotizbuch aktiv aktuell — das Spiel gibt dir ein Rosetta-Stone-ähnliches Interface, um zu notieren, was du glaubst, was jedes Zeichen bedeutet. Rate frei und korrigiere, wenn du mehr lernst. Einige Symbole wirst du zunächst falsch interpretieren; das mentale Modell anpassen ist Teil des Prozesses, kein Versagen.',
  },
  jusant: {
    title_en: 'Jusant',
    title_zh: 'Jusant',
    title_zhTW: 'Jusant',
    title_ja: 'ジュサン',
    title_ko: 'Jusant',
    title_de: 'Jusant',
    emoji: '🧗',
    tag_en: 'A meditative rock-climbing adventure in a post-flood vertical world — no combat, no dialogue, no objectives other than upward — just rope, wind, and the sound of your hands finding holds',
    tag_zh: '一场在洪水后垂直世界中的冥想式攀岩冒险——没有战斗、没有对话、没有目标，只有向上——只有绳索、风声和你双手寻找抓点的声音',
    tag_zhTW: '一場在洪水後垂直世界中的冥想式攀岩冒險——沒有戰鬥、沒有對話、沒有目標，只有向上——只有繩索、風聲和你雙手尋找抓點的聲音',
    tag_ja: '大洪水後の垂直世界を舞台にした瞑想的なロッククライミングアドベンチャー——戦闘なし、セリフなし、目標は上へと向かうことだけ——ロープ、風、そしてホールドを探す自分の手の音だけ',
    tag_ko: '홍수 이후의 수직 세계를 배경으로 한 명상적 암벽 등반 어드벤처——전투도, 대화도, 위로 올라가는 것 외의 목표도 없습니다——밧줄, 바람, 그리고 홀드를 찾는 당신 손의 소리만',
    tag_de: 'Ein meditatives Kletterabenteuer in einer vertikalen Welt nach der Flut — kein Kampf, kein Dialog, kein Ziel außer dem Aufsteigen — nur Seil, Wind und das Geräusch deiner Hände, die Griffe suchen',
    platform_en: 'Available on: PC (Steam), Xbox Series X/S, Xbox Game Pass — about $25. Game Pass day one.',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox Series X/S、Xbox Game Pass——约 25 美元。Game Pass 首日可玩。',
    platform_zhTW: '可在以下平台獲取：PC（Steam）、Xbox Series X/S、Xbox Game Pass——約 25 美元。Game Pass 首日可玩。',
    platform_ja: '対応プラットフォーム：PC（Steam）、Xbox Series X/S、Xbox Game Pass——約2,500円。Game Passで初日から遊べます。',
    platform_ko: '이용 가능 플랫폼：PC（Steam）、Xbox Series X/S、Xbox Game Pass——약 25달러. Game Pass 첫날 플레이 가능.',
    platform_de: 'Erhältlich auf: PC (Steam), Xbox Series X/S, Xbox Game Pass — ca. 25 €. Ab Tag 1 im Game Pass.',
    why_en:
      "Jusant (2023) is the most meditative game of recent years — a climbing adventure developed by Don't Nod (Life is Strange) where the entire goal is ascending a massive tower that was once coastal but now sits stranded after a vast flood has receded, leaving behind evidence of civilizations that once lived there. You play as a nameless climber with a small companion, using your two triggers to grip left and right handholds as you ascend cliffs, swing on rope anchors, manage your stamina bar, and find paths through the vertical world. There is no combat, no death from falling (you snap back to your last anchor), no timer, no score. The pleasure is entirely in the physicality of movement — planning your route, finding the rhythm of climbing, and pausing at ledges to take in views that reveal more of the world's lost history. Notes and items left by previous inhabitants let you piece together what the world was before the water came. At 5-8 hours it is a perfectly sized experience. Available day one on Game Pass. An ideal game for players who want something beautiful, unhurried, and unlike anything else.",
    why_zh:
      "Jusant（2023 年）是近年来最具冥想性的游戏——由 Don't Nod（《奇异人生》）开发的攀岩冒险，整个目标是攀登一座曾经临海但在大洪水退去后遗留下来的巨塔，保留着曾经居住在那里的文明的痕迹。你扮演一个无名攀登者和一个小伙伴，使用两个扳机键抓住左右把手，攀登悬崖、在绳锚上摆荡、管理耐力条，并在垂直世界中找到路径。没有战斗、没有因坠落死亡（你会被弹回到最后一个锚点）、没有计时器、没有分数。前任居民留下的笔记和物品让你拼凑出水来之前世界的样子。5-8 小时的体验大小恰到好处。Game Pass 首日可用。对于想要美丽、从容、与众不同体验的玩家来说是理想游戏。",
    why_zhTW:
      "Jusant（2023年）是近年來最具冥想性的遊戲——由Don't Nod（《奇異人生》）開發的攀岩冒險，整個目標是攀登一座曾經臨海但在大洪水退去後遺留下來的巨塔，保留著曾經居住在那裡的文明的痕跡。你扮演一個無名攀登者和一個小夥伴，使用兩個扳機鍵抓住左右把手，攀登懸崖、在繩錨上擺盪、管理耐力條，並在垂直世界中找到路徑。沒有戰鬥、沒有因墜落死亡（你會被彈回到最後一個錨點）、沒有計時器、沒有分數。前任居民留下的筆記和物品讓你拼湊出水來之前世界的樣子。5-8小時的體驗大小恰到好處。Game Pass首日可用。對於想要美麗、從容、與衆不同體驗的玩家來說是理想遊戲。",
    why_ja:
      "ジュサン（2023年）は近年最も瞑想的なゲーム——Don't Nod（ライフ イズ ストレンジ）開発のクライミングアドベンチャー。かつて海沿いだったが大洪水が引いた後に取り残された巨大な塔を登り、かつてそこに暮らした文明の痕跡を辿る。名もなき登山者と小さな仲間を操り、二つのトリガーで左右のホールドを掴みながら崖を登り、ロープアンカーで揺れ、スタミナを管理する。戦闘なし、落下死なし（最後のアンカーに戻るだけ）、タイマーなし、スコアなし。以前の住人が残したメモや物品で、水が来る前の世界を組み立てられる。5〜8時間でちょうどいいサイズ。Game Pass初日対応。美しく、急かされず、他にない体験を求める人に最適。",
    why_ko:
      "Jusant（2023）는 근래 가장 명상적인 게임——Don't Nod（라이프 이즈 스트레인지）가 개발한 클라이밍 어드벤처입니다. 한때 해안가였지만 대홍수가 물러간 후 고립된 거대한 탑을 오르며, 그 안에 살았던 문명의 흔적을 따라갑니다. 이름 없는 등반가와 작은 동반자를 조종해 두 개의 트리거로 좌우 홀드를 잡으며 절벽을 오르고, 로프 앵커에서 흔들리고, 체력을 관리합니다. 전투 없음, 추락사 없음（마지막 앵커로 돌아갈 뿐）, 타이머 없음, 점수 없음. 이전 주민들이 남긴 메모와 물건들로 물이 오기 전의 세계를 조각 맞출 수 있습니다. 5-8시간의 딱 맞는 크기. Game Pass 첫날 이용 가능. 아름답고, 여유롭고, 독특한 경험을 원하는 이들에게 이상적인 게임입니다.",
    why_de:
      "Jusant (2023) ist das meditativste Spiel der jüngeren Zeit — ein Kletterabenteuer von Don't Nod (Life is Strange). Ziel ist es, einen einst küstennahen, aber nach einer riesigen Flut gestrandeten Turm zu besteigen und die Spuren der Zivilisationen zu verfolgen, die einst dort lebten. Zwei Trigger greifen links und rechts; kein Kampf, kein Tod durch Absturz (nur zurück zum letzten Ankerpunkt), kein Timer, kein Score. Notizen und Gegenstände früherer Bewohner fügen die Geschichte vor der Flut zusammen. 5–8 Stunden — perfekte Größe. Ab Tag 1 im Game Pass. Ideal für alle, die etwas Schönes, Ungehetztes und völlig Einzigartiges suchen.",
    tip_en: "Use your rope anchors liberally — they are your safety net and cost nothing. When you see an anchor point, clip in before attempting a difficult traverse. The climbing controls take 10-15 minutes to become intuitive; if the first cliff feels awkward, persist through the first area and the physicality will click.",
    tip_zh: '大量使用你的绳索锚点——它们是你的安全网，不花费任何东西。当你看到锚点时，在尝试困难横移之前先挂上。攀登控制需要 10-15 分钟才能变得直觉化；如果第一个悬崖感觉别扭，坚持通过第一个区域，身体感会豁然开朗。',
    tip_zhTW: '大量使用你的繩索錨點——它們是你的安全網，不花費任何東西。當你看到錨點時，在嘗試困難橫移之前先掛上。攀登控制需要10-15分鐘才能變得直覺化；如果第一個懸崖感覺別扭，堅持通過第一個區域，身體感會豁然開朗。',
    tip_ja: 'ロープアンカーは惜しみなく使おう——コストはゼロで、セーフティネットになる。難しいトラバースの前に必ずクリップしておくこと。クライミング操作は10〜15分で自然に感じられるようになる。最初の崖がぎこちなく感じても、最初のエリアを乗り越えれば操作感が体に馴染んでくる。',
    tip_ko: '로프 앵커를 아낌없이 사용하세요——비용이 없는 안전망입니다. 앵커 포인트가 보이면 어려운 횡단을 시도하기 전에 먼저 클립하세요. 클라이밍 조작은 10-15분 안에 직관적으로 느껴지기 시작합니다; 첫 번째 절벽이 어색하게 느껴지더라도 첫 구역을 버텨내면 감각이 잡힙니다.',
    tip_de: 'Nutze deine Seilanker großzügig — sie sind dein Sicherheitsnetz und kosten nichts. Wenn du einen Ankerpunkt siehst, clip dich ein, bevor du einen schwierigen Quergang versuchst. Die Kletter-Steuerung braucht 10–15 Minuten, um sich intuitiv anzufühlen; wenn sich der erste Fels umständlich anfühlt, bleib dabei — nach dem ersten Abschnitt wird es klicken.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { seasofstars: 0, hifirush: 0, chants: 0, jusant: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function Cozy2023SurpriseQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-2023-surprise-hits`
    const shareTitle = getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)
    const shareTag = getLoc(result.tag_zh, result.tag_en, result.tag_zhTW, result.tag_ja, result.tag_ko, result.tag_de)
    const shareText = getLoc(
      `2023 年 Cozy 玩家意外爱上的游戏测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My 2023 surprise hit for cozy gamers: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `2023 年 Cozy 玩家意外愛上的遊戲測驗結果：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `2023年コージーゲーマーのサプライズゲーム診断：${result.title_ja}！${result.tag_ja}。試してみて：${url}`,
      `2023년 코지 게이머의 뜻밖의 게임 테스트：${result.title_ko}！${result.tag_ko}. 확인해보세요：${url}`,
      `Mein 2023 Cozy-Überraschungshit: ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`
    )
    void shareTitle
    void shareTag

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
              {getLoc('入门建议：', 'Getting started: ', '入門建議：', 'はじめる前に：', '시작 전 팁：', 'Erste Schritte: ')}
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
            {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やってみる', '다시 하기', 'Quiz wiederholen')}
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
            '哪款 2023 精品会让 Cozy 玩家意外爱上？',
            'Which 2023 Game Would a Cozy Gamer Unexpectedly Love?',
            '哪款 2023 精品會讓 Cozy 玩家意外愛上？',
            '2023年、コージーゲーマーが思わずハマるゲームはどれ？',
            '2023년, 코지 게이머가 뜻밖에 빠져들 게임은?',
            'Welches Spiel aus 2023 würde Cozy-Gamer überraschend begeistern?'
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从星之海、Hi-Fi Rush、塞纳尔圣歌、Jusant 中找到你的年度惊喜之作',
            '6 questions to match you with Sea of Stars, Hi-Fi Rush, Chants of Sennaar, or Jusant — four acclaimed 2023 games with strong cozy appeal',
            '6 個問題，從星之海、Hi-Fi Rush、塞納爾聖歌、Jusant 中找到你的年度驚喜之作',
            '6問の診断で星の海、ハイファイ・ラッシュ、センナールの詠唱、ジュサンの中からあなたにぴったりの2023年ゲームを見つけよう',
            '6개의 질문으로 시 오브 스타즈, Hi-Fi Rush, 챈츠 오브 세나르, Jusant 중 당신에게 딱 맞는 2023년 게임을 찾아보세요',
            '6 Fragen, um dich mit Sea of Stars, Hi-Fi Rush, Chants of Sennaar oder Jusant zu matchen — vier gefeierte 2023-Spiele mit echtem Cozy-Appeal'
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
        {getLoc('找到我的 2023 年度惊喜游戏', 'Find My 2023 Surprise Hit', '找到我的 2023 年度驚喜遊戲', '私の2023年サプライズゲームを見つける', '나의 2023년 서프라이즈 게임 찾기', 'Mein 2023-Überraschungshit finden')}
      </button>
    </div>
  )
}
