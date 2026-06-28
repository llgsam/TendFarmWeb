'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'sos' | 'sandrock' | 'persona4' | 'feth'

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
    q_en: 'How do you most enjoy building relationships with NPCs in a game?',
    q_zh: '在游戏中，你最喜欢以哪种方式与 NPC 建立关系？',
    q_zhTW: '在遊戲中，你最喜歡以哪種方式與 NPC 建立關係？',
    q_ja: 'ゲームで NPC との関係をどう築きたい？',
    q_ko: '게임에서 NPC와 관계를 맺는 방법 중 어떤 게 가장 좋아요?',
    q_de: 'Wie baust du am liebsten Beziehungen zu NPCs in einem Spiel auf?',
    options: [
      {
        en: 'Slowly through daily routines, seasonal gifts, and festivals — until I know this person well enough to spend a life with them',
        zh: '通过日常惯例、应季礼物和节日慢慢建立——直到我足够了解这个人，愿意与他们共度一生',
        zhTW: '透過日常慣例、應季禮物和節日慢慢建立——直到我足夠了解這個人，願意與他們共度一生',
        ja: '毎日の会話や季節のプレゼント、お祭りを通じてゆっくりと——この人となら一生一緒にいられると思えるまで',
        ko: '일상적인 루틴, 계절 선물, 축제를 통해 천천히——이 사람과 평생을 보낼 수 있을 만큼 충분히 알게 될 때까지',
        de: 'Langsam durch tägliche Routinen, saisonale Geschenke und Feste — bis ich diese Person gut genug kenne, um ein Leben mit ihr zu verbringen',
        type: 'sos',
      },
      {
        en: 'By helping people with their real problems — completing commissions, seeing how my work changes their daily life, watching the town grow around me',
        zh: '通过帮助人们解决真实问题——完成委托、看到我的工作如何改变他们的日常生活、看着小镇在我周围成长',
        zhTW: '透過幫助人們解決真實問題——完成委託、看到我的工作如何改變他們的日常生活、看著小鎮在我周圍成長',
        ja: '困っている人を助けることで——依頼を達成し、自分の仕事が彼らの日常を変えていく様子を見守り、街が育つのを楽しむ',
        ko: '사람들의 진짜 문제를 도와주는 것으로——의뢰를 완수하고, 내 일이 어떻게 그들의 일상을 바꾸는지 보고, 마을이 성장하는 걸 지켜보면서',
        de: 'Indem ich Menschen mit echten Problemen helfe — Aufträge erfüllen, sehen wie meine Arbeit ihren Alltag verändert, und dabei der Stadt beim Wachsen zusehen',
        type: 'sandrock',
      },
      {
        en: 'Through deliberate time investment — choosing each day whose story I want to deepen, earning their trust through shared activities until I see who they truly are',
        zh: '通过刻意的时间投入——每天选择我想深化谁的故事，通过共同活动赢得他们的信任，直到我看到他们的真实面目',
        zhTW: '透過刻意的時間投入——每天選擇我想深化誰的故事，透過共同活動贏得他們的信任，直到我看到他們的真實面目',
        ja: '計画的な時間の使い方で——毎日誰との絆を深めるか選びながら、共通の体験を通じて信頼を勝ち取り、相手の本当の姿を知っていく',
        ko: '의도적인 시간 투자로——매일 누구의 이야기를 깊게 파고들지 선택하고, 함께하는 활동을 통해 신뢰를 쌓아 그들의 진짜 모습을 발견할 때까지',
        de: 'Durch gezielten Zeitaufwand — jeden Tag auswählen, wessen Geschichte ich vertiefen möchte, durch gemeinsame Aktivitäten Vertrauen aufbauen, bis ich sehe, wer sie wirklich sind',
        type: 'persona4',
      },
      {
        en: 'By committing to a group — choosing my people, supporting them through training and hardship, and watching the bonds we build define the outcome of everything we face together',
        zh: '通过对一个群体的承诺——选择我的人，在训练和困难中支持他们，看着我们建立的纽带决定我们共同面对的一切结果',
        zhTW: '透過對一個群體的承諾——選擇我的人，在訓練和困難中支持他們，看著我們建立的紐帶決定我們共同面對的一切結果',
        ja: '仲間全員へのコミットメントで——自分の仲間を選び、訓練や試練を共に乗り越え、積み重ねた絆が共に挑む困難の結果を決める',
        ko: '한 그룹에 헌신하는 것으로——나의 사람들을 선택하고, 훈련과 역경 속에서 함께 지지하며, 우리가 쌓은 유대감이 함께 맞서는 모든 것의 결과를 결정하는 것을 지켜보면서',
        de: 'Durch Engagement für eine Gruppe — meine Leute auswählen, sie durch Training und Schwierigkeiten unterstützen und zusehen, wie die Bande, die wir aufgebaut haben, das Ergebnis von allem bestimmen, was wir gemeinsam bewältigen',
        type: 'feth',
      },
    ],
  },
  {
    q_en: 'How much mechanical challenge do you want alongside the social simulation?',
    q_zh: '在社交模拟之外，你希望游戏提供多大程度的机制挑战？',
    q_zhTW: '在社交模擬之外，你希望遊戲提供多大程度的機制挑戰？',
    q_ja: '社会シミュレーション以外にどのくらいのゲームチャレンジがほしい？',
    q_ko: '소셜 시뮬레이션 외에 어느 정도의 게임 챌린지를 원해요?',
    q_de: 'Wie viel spielmechanische Herausforderung willst du neben der Sozialsimulation?',
    options: [
      {
        en: 'Low — seasonal farming rhythms, some light exploration, and relationship events are all the challenge I need',
        zh: '低——季节性农业节奏、一些轻度探索和关系事件就是我需要的全部挑战',
        zhTW: '低——季節性農業節奏、一些輕度探索和關係事件就是我需要的全部挑戰',
        ja: '低め——季節の農業リズム、軽い探索、関係イベントがあれば十分',
        ko: '낮음——계절별 농사 리듬, 가벼운 탐험, 관계 이벤트만으로도 충분해요',
        de: 'Wenig — saisonale Anbaurhythmen, etwas leichte Erkundung und Beziehungsevents reichen mir völlig aus',
        type: 'sos',
      },
      {
        en: 'Low to moderate — I want crafting commissions and some optional combat, but the town relationships are the real draw',
        zh: '低到中等——我想要制作委托和一些可选战斗，但小镇关系才是真正的吸引力',
        zhTW: '低到中等——我想要製作委託和一些可選戰鬥，但小鎮關係才是真正的吸引力',
        ja: '低〜中程度——クラフト依頼やちょっとした戦闘もほしいが、街の人間関係が主役',
        ko: '낮음에서 중간——제작 의뢰와 선택적 전투도 원하지만, 마을 관계가 진짜 매력이에요',
        de: 'Wenig bis moderat — Handwerksaufträge und optionaler Kampf gerne, aber die Dorfbeziehungen sind der eigentliche Anreiz',
        type: 'sandrock',
      },
      {
        en: 'Moderate — dungeon exploration with a real-time limit alongside a full school-life social calendar that I have to balance carefully',
        zh: '中等——在有真实时间限制的地下城探索和需要仔细平衡的完整校园社交日历之间取得平衡',
        zhTW: '中等——在有真實時間限制的地下城探索和需要仔細平衡的完整校園社交日曆之間取得平衡',
        ja: '中程度——時間制限ありのダンジョン探索と充実した学園ソーシャルカレンダーをうまく両立したい',
        ko: '중간——실제 시간 제한이 있는 던전 탐험과 꼼꼼히 균형을 잡아야 하는 학원 소셜 캘린더 사이를 조율하고 싶어요',
        de: 'Moderat — Dungeonerkundung mit echtem Zeitlimit neben einem vollen Schulleben-Sozialkalender, den ich sorgfältig im Gleichgewicht halten muss',
        type: 'persona4',
      },
      {
        en: 'High — I want tactical chess-like battles where positioning, unit classes, and the relationships I have built all determine whether my team survives',
        zh: '高——我想要战术性的国际象棋式战斗，阵型、单位职业和我建立的关系共同决定我的队伍是否能存活',
        zhTW: '高——我想要戰術性的西洋棋式戰鬥，陣型、單位職業和我建立的關係共同決定我的隊伍是否能存活',
        ja: '高め——配置・兵種・築いた絆がすべてを左右する、将棋みたいな戦術バトルがしたい',
        ko: '높음——포지셔닝, 유닛 클래스, 내가 쌓은 관계가 팀의 생존을 결정하는 전술적 체스 같은 전투를 원해요',
        de: 'Hoch — ich will taktische Kämpfe wie Schach, bei denen Positionierung, Einheitenklassen und meine aufgebauten Beziehungen darüber entscheiden, ob mein Team überlebt',
        type: 'feth',
      },
    ],
  },
  {
    q_en: 'How important is story — and what kind of story do you want?',
    q_zh: '故事对你有多重要——你想要哪种类型的故事？',
    q_zhTW: '故事對你有多重要——你想要哪種類型的故事？',
    q_ja: 'ストーリーはどれくらい重視する？どんな話が好き？',
    q_ko: '스토리는 얼마나 중요한가요? 어떤 유형을 원해요?',
    q_de: 'Wie wichtig ist die Geschichte — und welche Art von Geschichte magst du?',
    options: [
      {
        en: 'Gentle and warm — I want character growth and seasonal milestones, not dramatic twists, with marriage as a meaningful emotional destination',
        zh: '温和而温暖——我想要角色成长和季节性里程碑，而不是戏剧性转折，婚姻作为有意义的情感目的地',
        zhTW: '溫和而溫暖——我想要角色成長和季節性里程碑，而不是戲劇性轉折，婚姻作為有意義的情感目的地',
        ja: '穏やかで温かいもの——劇的な展開より、キャラクターの成長と季節の節目を大切にし、結婚という感情的なゴールに向かうもの',
        ko: '따뜻하고 잔잔한——극적인 반전보다 캐릭터 성장과 계절의 마일스톤, 결혼이라는 의미 있는 감정적 목표가 있는 이야기',
        de: 'Sanft und warm — Charakterentwicklung und saisonale Meilensteine, keine dramatischen Wendungen; die Ehe als bedeutungsvolles emotionales Ziel',
        type: 'sos',
      },
      {
        en: "Gradually revealed — I want to uncover the town's history and each character's backstory through helping them, rather than through dramatic cutscenes",
        zh: '逐渐揭示——我想通过帮助他人来揭开小镇的历史和每个角色的背景故事，而不是通过戏剧性的过场动画',
        zhTW: '逐漸揭示——我想透過幫助他人來揭開小鎮的歷史和每個角色的背景故事，而不是透過戲劇性的過場動畫',
        ja: '少しずつ明かされるもの——壮大なカットシーンではなく、人を助けることで街の歴史やキャラクターの背景が少しずつわかってくるもの',
        ko: '조금씩 밝혀지는——극적인 컷신이 아니라, 사람들을 도우면서 마을의 역사와 각 캐릭터의 배경이 드러나는 이야기',
        de: "Schrittweise enthüllt — ich will die Geschichte der Stadt und jeden Charakter durch meine Hilfe entdecken, nicht durch dramatische Cutscenes",
        type: 'sandrock',
      },
      {
        en: "Central and surprising — I want a year-long mystery with genuine emotional payoff, where understanding the characters' true selves is as important as solving the case",
        zh: '核心且令人惊喜——我想要一个全年的悬案，有真实的情感回报，理解角色的真实自我与解案同样重要',
        zhTW: '核心且令人驚喜——我想要一個全年的懸案，有真實的情感回報，理解角色的真實自我與解案同樣重要',
        ja: '本筋に深く絡むもの——一年を通じた謎解きミステリーで、真相究明と同じくらいキャラクターの本当の姿を知ることが大切なもの',
        ko: '중심을 이루는 반전 있는——1년 내내 이어지는 미스터리가 진짜 감정적 보상을 주고, 진실 파헤치기만큼 캐릭터의 본 모습을 아는 게 중요한 이야기',
        de: 'Zentral und überraschend — ein ganzjähriges Rätsel mit echter emotionaler Belohnung, bei dem das Verstehen der wahren Persönlichkeiten genauso wichtig ist wie das Lösen des Falls',
        type: 'persona4',
      },
      {
        en: 'Epic with major revelations — I want the story to recontextualize everything I thought I knew about the world and the people in it, with choices that carry permanent weight',
        zh: '史诗级且有重大启示——我希望故事重新诠释我以为了解的关于世界和其中人物的一切，选择具有永久性的分量',
        zhTW: '史詩級且有重大啟示——我希望故事重新詮釋我以為了解的關於世界和其中人物的一切，選擇具有永久性的分量',
        ja: '壮大な大叙事詩——世界と登場人物の全てを塗り替えるような大きな展開があり、選択が永続的な重みを持つもの',
        ko: '장대한 대서사시——세계와 그 속 인물들에 대해 내가 알고 있던 모든 것을 재해석하는 이야기, 선택이 영구적인 무게를 지닌',
        de: 'Episch mit großen Enthüllungen — die Geschichte soll alles, was ich über die Welt und ihre Bewohner zu wissen glaubte, neu kontextualisieren, mit Entscheidungen, die dauerhaftes Gewicht tragen',
        type: 'feth',
      },
    ],
  },
  {
    q_en: 'Which aesthetic world draws you in?',
    q_zh: '哪种美学世界最吸引你？',
    q_zhTW: '哪種美學世界最吸引你？',
    q_ja: 'どんな世界観に惹かれる？',
    q_ko: '어떤 세계관에 끌려요?',
    q_de: 'Welche Ästhetik zieht dich an?',
    options: [
      {
        en: 'A cozy Japanese-inspired rural village with farmland, seasonal festivals, a beach, and a cast of charming marriage candidates',
        zh: '一个充满魅力的日式乡村，有农田、季节性节日、海滩，以及一群迷人的结婚候选人',
        zhTW: '一個充滿魅力的日式鄉村，有農田、季節性節日、海灘，以及一群迷人的結婚候選人',
        ja: 'のどかな日本の田舎村——農場、季節のお祭り、海辺、そして個性豊かな結婚相手候補たちがいる場所',
        ko: '아늑한 일본풍 농촌 마을——농지, 계절 축제, 해변, 그리고 매력적인 결혼 후보들이 있는 곳',
        de: 'Ein gemütliches japanisch inspiriertes Dorf mit Farmland, saisonalen Festen, einem Strand und charmanten Heiratskandidaten',
        type: 'sos',
      },
      {
        en: 'A warm desert town being rebuilt from ruins — a western-frontier community full of quirky crafters and a growing town I helped save',
        zh: '一个正在从废墟中重建的温暖沙漠小镇——一个充满古怪工匠的西部边疆社区，以及一个我帮助拯救的成长中的城镇',
        zhTW: '一個正在從廢墟中重建的溫暖沙漠小鎮——一個充滿古怪工匠的西部邊疆社區，以及一個我幫助拯救的成長中的城鎮',
        ja: '廃墟から再建中の温かい砂漠の町——クセのあるクラフターたちが集まる西部開拓地コミュニティ、自分が救うことで成長していく街',
        ko: '폐허에서 재건 중인 따뜻한 사막 마을——독특한 장인들이 모인 서부 개척지 커뮤니티, 내가 구하는 데 도움을 주는 성장하는 마을',
        de: 'Eine warme Wüstenstadt, die aus Ruinen wiederaufgebaut wird — eine westliche Grenzgemeinschaft voller schrulliger Handwerker und eine wachsende Stadt, die ich mitgerettet habe',
        type: 'sandrock',
      },
      {
        en: 'A 2000s small-town Japanese high school with a supernatural fog, a mysterious TV world, and a murder mystery that only my group of friends can solve',
        zh: '一个有超自然迷雾、神秘电视世界和只有我的朋友圈才能解开的谋杀悬案的 2000 年代日本小镇高中',
        zhTW: '一個有超自然迷霧、神秘電視世界和只有我的朋友圈才能解開的謀殺懸案的 2000 年代日本小鎮高中',
        ja: '2000年代の日本の地方高校——超自然的な霧、謎めいたテレビの世界、自分たちだけが解ける殺人ミステリー',
        ko: '2000년대 일본 지방 고등학교——초자연적인 안개, 신비로운 TV 세계, 우리 무리만 풀 수 있는 살인 미스터리',
        de: 'Eine japanische Kleinstadt-Oberschule in den 2000er Jahren mit einem übernatürlichen Nebel, einer geheimnisvollen TV-Welt und einem Mordfall, den nur meine Freundesgruppe lösen kann',
        type: 'persona4',
      },
      {
        en: 'A medieval fantasy monastery-school divided into three rival noble houses, with a war on the horizon and complex politics defining every alliance',
        zh: '一所分为三个相互竞争的贵族学院的中世纪奇幻修道院学校，地平线上战争即将爆发，复杂的政治定义着每一个联盟',
        zhTW: '一所分為三個相互競爭的貴族學院的中世紀奇幻修道院學校，地平線上戰爭即將爆發，複雜的政治定義著每一個聯盟',
        ja: '三つの貴族学院に分かれた中世ファンタジーの修道院学校——戦争の足音が迫る中、複雑な政治がすべての同盟を決める',
        ko: '세 귀족 학원으로 나뉜 중세 판타지 수도원 학교——전쟁이 지평선 너머에 드리우고, 복잡한 정치가 모든 동맹을 결정하는 곳',
        de: 'Ein mittelalterliches Fantasy-Kloster-Internat, aufgeteilt in drei rivalisierende Adelshäuser, mit einem Krieg am Horizont und komplexer Politik, die jedes Bündnis bestimmt',
        type: 'feth',
      },
    ],
  },
  {
    q_en: 'How long do you want the experience to last?',
    q_zh: '你希望这段体验持续多长时间？',
    q_zhTW: '你希望這段體驗持續多長時間？',
    q_ja: 'どのくらいプレイしたい？',
    q_ko: '얼마나 오래 즐기고 싶어요?',
    q_de: 'Wie lange soll das Spielerlebnis dauern?',
    options: [
      {
        en: '40-60 hours — a full in-game year with a second playthrough available if I want to try a different marriage path',
        zh: '40-60 小时——完整的游戏内一年，如果我想尝试不同的婚姻路线，还有第二周目可用',
        zhTW: '40-60 小時——完整的遊戲內一年，如果我想嘗試不同的婚姻路線，還有第二週目可用',
        ja: '40〜60時間——ゲーム内1年間を満喫、別の結婚ルートを試したければ2周目もあり',
        ko: '40-60시간——게임 내 1년 전체를 즐기고, 다른 결혼 루트를 시도하고 싶다면 2회차도 가능',
        de: '40-60 Stunden — ein vollständiges Spieljahr, mit der Option auf einen zweiten Durchlauf, wenn ich einen anderen Heiratsweg ausprobieren möchte',
        type: 'sos',
      },
      {
        en: '60-100 hours — rebuilding an entire town across multiple in-game years, with friendship arcs completing at different paces',
        zh: '60-100 小时——在多个游戏内年份中重建整个小镇，友情弧线以不同的节奏完成',
        zhTW: '60-100 小時——在多個遊戲內年份中重建整個小鎮，友情弧線以不同的節奏完成',
        ja: '60〜100時間——数年かけて街を再建し、各キャラとの友情エンドを自分のペースで回収',
        ko: '60-100시간——여러 게임 내 연도에 걸쳐 마을 전체를 재건하며, 우정 아크가 각자의 속도로 완성되는',
        de: '60-100 Stunden — eine ganze Stadt über mehrere Spieljahre hinweg aufbauen, während Freundschaftsbögen in unterschiedlichem Tempo abgeschlossen werden',
        type: 'sandrock',
      },
      {
        en: '80-120+ hours — one full calendar year with multiple dungeon runs, the ability to complete all Social Links, and New Game+ for everything I missed',
        zh: '80-120+ 小时——完整的一个日历年，有多次地下城探索、完成所有社交链接的能力，以及为了弥补遗漏的全部内容的新游戏+',
        zhTW: '80-120+ 小時——完整的一個日曆年，有多次地下城探索、完成所有社交鏈接的能力，以及為了彌補遺漏的全部內容的新遊戲+',
        ja: '80〜120時間以上——1年間の学園生活、ダンジョン攻略、全コープ達成、NG+で取りこぼしも回収',
        ko: '80-120시간 이상——풀 달력 1년, 던전 여러 번 공략, 모든 소셜 링크 완성, 그리고 놓친 것들을 위한 뉴게임플러스',
        de: '80-120+ Stunden — ein vollständiges Kalenderjahr mit mehreren Dungeonläufen, der Möglichkeit alle Social Links abzuschließen und New Game+ für alles, was ich verpasst habe',
        type: 'persona4',
      },
      {
        en: '60-80 hours per route — with 3+ fully different story routes that each reveal different truths about the world and characters I thought I knew',
        zh: '每条路线 60-80 小时——3+ 条完全不同的故事路线，每条都揭示了关于我以为了解的世界和角色的不同真相',
        zhTW: '每條路線 60-80 小時——3+ 條完全不同的故事路線，每條都揭示了關於我以為了解的世界和角色的不同真相',
        ja: 'ルートごとに60〜80時間——3つ以上の異なるストーリールートが用意され、それぞれで世界の真実が変わる',
        ko: '루트당 60-80시간——3개 이상의 완전히 다른 스토리 루트가 있고, 각각 내가 알고 있다고 생각했던 세계와 캐릭터들에 대한 다른 진실을 밝혀주는',
        de: '60-80 Stunden pro Route — mit 3+ vollständig unterschiedlichen Story-Routen, die jeweils andere Wahrheiten über die Welt und Charaktere enthüllen, die ich zu kennen glaubte',
        type: 'feth',
      },
    ],
  },
  {
    q_en: "Which \"perfect game day\" scenario sounds best?",
    q_zh: '哪种"完美游戏日"场景听起来最棒？',
    q_zhTW: '哪種「完美遊戲日」場景聽起來最棒？',
    q_ja: 'どんな「最高のゲームの日」が理想？',
    q_ko: "어떤 '완벽한 게임의 날' 시나리오가 가장 좋아요?",
    q_de: 'Welches "perfekte Spieltag"-Szenario klingt am besten?',
    options: [
      {
        en: "Tend crops, drop off a gift for my favorite villager on their birthday, attend the summer festival with them, and watch the sun set over the farmland",
        zh: '打理农作物、在我最喜欢的村民生日那天送去礼物、与他们一起参加夏日节日，看着夕阳沉落在农田上',
        zhTW: '打理農作物、在我最喜歡的村民生日那天送去禮物、與他們一起參加夏日節日，看著夕陽沉落在農田上',
        ja: '作物の世話をして、推しの村人の誕生日にプレゼントを持って行き、夏祭りを一緒に楽しんで、農場の夕日を眺める',
        ko: '작물을 돌보고, 좋아하는 마을 주민 생일에 선물을 건네고, 함께 여름 축제를 즐기고, 농지 위로 지는 노을을 바라보는',
        de: 'Ernte einbringen, meinem Lieblingsdorfbewohner zum Geburtstag ein Geschenk vorbeibringen, gemeinsam das Sommerfest besuchen und den Sonnenuntergang über dem Farmland beobachten',
        type: 'sos',
      },
      {
        en: "Complete a craftsman commission that unlocks more of an NPC's backstory, upgrade my workshop with the rewards, and hear how my work changed someone's life",
        zh: '完成一个工匠委托，解锁更多 NPC 的背景故事，用奖励升级我的工坊，听说我的工作如何改变了某人的生活',
        zhTW: '完成一個工匠委託，解鎖更多 NPC 的背景故事，用獎勵升級我的工坊，聽說我的工作如何改變了某人的生活',
        ja: '職人依頼を達成してNPCの過去話を解放し、報酬で工房を強化して、自分の仕事が誰かの人生を変えたと聞く',
        ko: '장인 의뢰를 완수해 NPC의 배경 이야기를 더 알게 되고, 보상으로 작업장을 업그레이드하고, 내 일이 누군가의 삶을 어떻게 바꿨는지 듣는',
        de: 'Einen Handwerksauftrag abschließen, der mehr von der Hintergrundgeschichte eines NPCs enthüllt, die Werkstatt mit den Belohnungen aufwerten und hören, wie meine Arbeit jemandes Leben verändert hat',
        type: 'sandrock',
      },
      {
        en: 'Spend the school day with a Social Link partner, study for exams in the evening, then enter the TV World for a dungeon run with the entire Investigation Team',
        zh: '在学校与一个社交链接伙伴共度时光，晚上为考试学习，然后带着整个调查队进入电视世界进行地下城探索',
        zhTW: '在學校與一個社交鏈接夥伴共度時光，晚上為考試學習，然後帶著整個調查隊進入電視世界進行地下城探索',
        ja: '学校でコープ仲間と過ごして、夜は試験勉強して、夜中にテレビの世界へ入って調査隊みんなでダンジョン攻略',
        ko: '학교에서 소셜 링크 파트너와 시간을 보내고, 저녁엔 시험 공부를 하고, 그다음 전체 수사대와 함께 TV 세계로 들어가 던전 탐험',
        de: 'Den Schultag mit einem Social-Link-Partner verbringen, abends für Prüfungen lernen und dann mit dem gesamten Ermittlerteam in die TV-Welt eintreten für einen Dungeonlauf',
        type: 'persona4',
      },
      {
        en: 'Teach class, spend Free Time unlocking a new support conversation with a student, then carefully position my units in a pivotal battle where one wrong move loses someone forever',
        zh: '上课、利用自由时间与一名学生解锁新的支援对话，然后在一场关键战役中仔细部署我的单位，一步错就会永远失去某人',
        zhTW: '上課、利用自由時間與一名學生解鎖新的支援對話，然後在一場關鍵戰役中仔細部署我的單位，一步錯就會永遠失去某人',
        ja: '授業をして、フリータイムで生徒と支援会話を解放して、一手間違えば誰かを永遠に失う決戦でユニットを慎重に配置する',
        ko: '수업을 하고, 자유 시간에 학생과 새 서포트 대화를 열고, 한 번의 실수가 누군가를 영원히 잃게 만드는 결전에서 신중하게 유닛을 배치하는',
        de: 'Unterricht halten, in der Freizeit mit einem Schüler ein neues Support-Gespräch freischalten, dann meine Einheiten in einer entscheidenden Schlacht sorgfältig positionieren, bei der ein falscher Zug jemanden für immer verliert',
        type: 'feth',
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
  sos: {
    title_en: 'Story of Seasons: A Wonderful Life',
    title_zh: '牧场物语：美好的生活',
    title_zhTW: '牧場物語：美好的生活',
    title_ja: '牧場物語 ワンダフルライフ',
    title_ko: '스토리 오브 시즌스: 원더풀 라이프',
    title_de: 'Story of Seasons: A Wonderful Life',
    emoji: '🌸',
    tag_en: 'The classic farming and marriage sim — remastered with modern polish — where building a life in a cozy rural village across multiple in-game years is the entire point',
    tag_zh: '经典农场和婚姻模拟——以现代精致感重制——在一个舒适乡村建立生活，跨越多个游戏内年份就是全部的意义',
    tag_zhTW: '經典農場和婚姻模擬——以現代精緻感重製——在一個舒適鄉村建立生活，跨越多個遊戲內年份就是全部的意義',
    tag_ja: '心温まるリメイク版の名作農場＆結婚シム——ゲーム内の年月を重ねながらのどかな村で暮らしを築くことが、このゲームのすべて',
    tag_ko: '현대적으로 리마스터된 클래식 농장 & 결혼 시뮬레이터——아늑한 농촌 마을에서 여러 게임 내 연도에 걸쳐 삶을 꾸려나가는 것이 전부인 게임',
    tag_de: 'Der klassische Farming-und-Heirats-Sim — modernisiert und aufgewertet — bei dem das Aufbauen eines Lebens in einem gemütlichen Dorf über mehrere Spieljahre hinweg der eigentliche Sinn des Spiels ist',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, PS5, Xbox — about $40',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox——约 40 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox——約 40 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox——約40ドル',
    platform_ko: '플랫폼: PC (Steam), Nintendo Switch, PS4, PS5, Xbox — 약 $40',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PS4, PS5, Xbox — ca. 40 Dollar',
    why_en:
      "Story of Seasons: A Wonderful Life (2023) is the high-quality remake of the beloved 2004 Harvest Moon: A Wonderful Life, bringing the classic with updated visuals, quality-of-life improvements, and additional marriage candidates including same-sex options. The game is set in Forget-Me-Not Valley, a small agricultural community with a rich cast of permanent villagers — each with their own personality, backstory, and routines. Unlike most farming games, A Wonderful Life spans multiple decades: your farm grows across Spring-Summer-Fall-Winter cycles over years, your child grows up, and the village itself changes over time. Relationships are developed through regular conversation, seasonal gift-giving, attending villager events, and, eventually, choosing a marriage partner. The depth comes from time: there is no rushing. Each villager changes over the years in response to your relationship; some leave if you ignore them, some grow in ways that are rewarding to watch. For Stardew Valley players who love the social simulation aspect more than the farming: this is the franchise that inspired it, with a distinctly different pace and emotional register.",
    why_zh:
      '牧场物语：美好的生活（2023 年）是备受喜爱的 2004 年《牧场物语：美好的生活》的高质量重制版，以更新的画面、生活质量改进和额外的结婚候选人（包括同性选项）带来了这部经典作品。游戏设定在勿忘谷，一个有着丰富常驻村民阵容的小农业社区——每个人都有自己的个性、背景故事和日常。与大多数农场游戏不同，美好的生活跨越多年：你的农场在多年的春夏秋冬循环中成长，你的孩子长大，村庄本身随着时间的推移而变化。关系通过定期对话、季节性赠礼、参加村民活动，以及最终选择结婚伴侣来发展。深度来自时间：没有捷径。每个村民随着年份的推移根据你们的关系而变化；一些人如果被忽视会离开，一些人的成长令人欣慰地看着。对于比农业更喜欢社交模拟方面的星露谷玩家：这是激发它的特许经营权，具有截然不同的节奏和情感基调。',
    why_zhTW:
      '牧場物語：美好的生活（2023 年）是備受喜愛的 2004 年《牧場物語：美好的生活》的高品質重製版，以更新的畫面、生活品質改進和額外的結婚候選人（包括同性選項）帶來了這部經典作品。遊戲設定在勿忘谷，一個有著豐富常駐村民陣容的小農業社區——每個人都有自己的個性、背景故事和日常。與大多數農場遊戲不同，美好的生活跨越多年：你的農場在多年的春夏秋冬循環中成長，你的孩子長大，村莊本身隨著時間的推移而變化。關係透過定期對話、季節性贈禮、參加村民活動，以及最終選擇結婚伴侶來發展。深度來自時間：沒有捷徑。每個村民隨著年份的推移根據你們的關係而變化；一些人如果被忽視會離開，一些人的成長令人欣慰地看著。對於比農業更喜歡社交模擬方面的星露谷玩家：這是激發它的特許經營權，具有截然不同的節奏和情感基調。',
    why_ja:
      '牧場物語 ワンダフルライフ（2023年）は2004年の名作「牧場物語 ～しあわせの詩～」を現代風にリメイクした作品です。グラフィックが刷新され、快適なプレイのための改善が施されたほか、同性婚を含む新たな結婚候補も追加されています。舞台は「わすれな谷」という小さな農村集落で、個性豊かな永住住人たちが生活しています。多くの農場ゲームと異なる最大の特徴は、ゲームが複数の年にわたって展開される点。農場は春夏秋冬を繰り返す中で成長し、子どもが生まれて育ち、村そのものも時間とともに変化します。住人との関係は毎日の会話、季節ごとのプレゼント、イベントへの参加、そして結婚相手の選択によって深まります。ゲームの深みは「時間」にあります——急ぐことはできません。各住人はあなたとの関係に応じて年ごとに変化し、疎遠にすると去ってしまう人もいれば、見ていて嬉しくなるほど成長する人もいます。スターデューバレーの農場より交流の方が好きなプレイヤーには、まさにそのルーツとなった作品。ペースと感情的な色合いは全く異なりますが、だからこそ唯一無二の魅力があります。',
    why_ko:
      '스토리 오브 시즌스: 원더풀 라이프(2023)는 2004년 명작 \'목장 이야기: 원더풀 라이프\'를 고품질로 리메이크한 작품입니다. 업데이트된 비주얼, 편의성 개선, 동성 옵션을 포함한 추가 결혼 후보자가 추가됐습니다. 배경은 포겟미낫 밸리라는 작은 농업 공동체로, 각자의 개성과 배경, 일상을 가진 개성 넘치는 주민들이 함께합니다. 대부분의 농장 게임과 달리, 원더풀 라이프는 여러 해에 걸쳐 진행됩니다. 봄·여름·가을·겨울이 반복되며 농장이 성장하고, 아이가 자라고, 마을 자체도 시간이 지나면서 변화합니다. 관계는 꾸준한 대화, 계절 선물, 마을 이벤트 참여, 그리고 결혼 상대 선택을 통해 깊어집니다. 이 게임의 깊이는 시간에 있습니다. 서두를 수가 없죠. 각 주민은 관계에 따라 해를 거듭할수록 달라지고, 소홀히 하면 마을을 떠나는 사람도 있고, 보람 있게 성장하는 사람도 있습니다. 스타듀 밸리의 소셜 시뮬레이션을 더 좋아하는 플레이어라면, 이게 바로 그 원조 시리즈입니다. 템포와 감성적인 톤은 분명히 다르지만, 그게 이 게임만의 독보적인 매력입니다.',
    why_de:
      'Story of Seasons: A Wonderful Life (2023) ist das hochwertige Remake des geliebten Harvest Moon: A Wonderful Life von 2004 — mit aktualisierten Grafiken, Komfortverbesserungen und zusätzlichen Heiratskandidaten, darunter gleichgeschlechtliche Optionen. Das Spiel spielt in Forget-Me-Not Valley, einer kleinen Landwirtschaftsgemeinschaft mit einer reichen Besetzung permanenter Dorfbewohner — jeder mit eigener Persönlichkeit, Hintergrundgeschichte und Routine. Anders als die meisten Farmspiele erstreckt sich A Wonderful Life über mehrere Jahrzehnte: Deine Farm wächst über Frühling-Sommer-Herbst-Winter-Zyklen hinweg über Jahre, dein Kind wächst auf, und das Dorf selbst verändert sich mit der Zeit. Beziehungen werden durch regelmäßige Gespräche, saisonale Geschenke, die Teilnahme an Dorfveranstaltungen und letztendlich die Wahl eines Heiratspartners aufgebaut. Die Tiefe kommt aus der Zeit: Es gibt keine Möglichkeit zu eilen. Jeder Dorfbewohner verändert sich im Laufe der Jahre in Reaktion auf deine Beziehung; manche verlassen das Dorf, wenn du sie vernachlässigst, andere entwickeln sich auf eine Weise, die schön anzusehen ist. Für Stardew Valley-Spieler, die den Sozialsimulationsaspekt mehr lieben als das Farming: Dies ist die Franchise, die es inspiriert hat, mit einem deutlich anderen Tempo und emotionalem Charakter.',
    tip_en: "Talk to every villager every day in the first in-game year — relationships decay if neglected, and the marriage window closes at the end of Chapter 2 (the second in-game year). Identify your preferred marriage candidate early and maintain their friendship score consistently. Your child's career in adulthood is influenced by how you raise them in Chapter 3.",
    tip_zh: '在游戏内第一年每天与每个村民交谈——如果被忽视，关系会衰退，婚姻窗口在第 2 章结束时关闭（游戏内第二年）。早点确认你偏好的结婚候选人，持续保持他们的友好度。你的孩子在成年后的职业受到你在第 3 章如何抚养他们的影响。',
    tip_zhTW: '在遊戲內第一年每天與每個村民交談——如果被忽視，關係會衰退，婚姻窗口在第 2 章結束時關閉（遊戲內第二年）。早點確認你偏好的結婚候選人，持續保持他們的友好度。你的孩子在成年後的職業受到你在第 3 章如何撫養他們的影響。',
    tip_ja: 'ゲーム内1年目は毎日全ての村人に話しかけましょう——関係値は放置すると下がり、結婚の機会はチャプター2終盤（ゲーム内2年目）で閉じてしまいます。早めに結婚したい候補を絞って、友好度を安定して上げていきましょう。チャプター3でどう育てるかによって、成長後の子どもの職業が変わります。',
    tip_ko: '게임 내 첫 해에는 매일 모든 주민에게 말을 걸어보세요——소홀히 하면 관계가 떨어지고, 결혼 기회는 챕터 2 말미(게임 내 2년차)에 닫힙니다. 원하는 결혼 후보를 일찍 정하고 우정 수치를 꾸준히 유지하는 게 포인트입니다. 챕터 3에서 아이를 어떻게 키우느냐가 성인이 된 후의 직업에 영향을 미칩니다.',
    tip_de: 'Sprich im ersten Spieljahr jeden Tag mit jedem Dorfbewohner — Beziehungen verschlechtern sich bei Vernachlässigung, und das Heiratsfenster schließt sich am Ende von Kapitel 2 (dem zweiten Spieljahr). Identifiziere früh deinen bevorzugten Heiratskandidaten und pflege dessen Freundschaftswert beständig. Die Karriere deines Kindes im Erwachsenenalter wird davon beeinflusst, wie du es in Kapitel 3 aufziehst.',
  },
  sandrock: {
    title_en: 'My Time at Sandrock',
    title_zh: '沙石镇时光',
    title_zhTW: '沙石鎮時光',
    title_ja: 'マイタイムアットサンドロック',
    title_ko: '마이타임앳샌드록',
    title_de: 'My Time at Sandrock',
    emoji: '🏜️',
    tag_en: 'Build, craft, and befriend your way through a charming desert frontier town — a spiritual upgrade from My Time at Portia with more depth, more characters, and a more complete story',
    tag_zh: '在迷人的沙漠边疆小镇建造、制作和交友——一款精神上从帕鲁世界升级的游戏，有更多深度、更多角色和更完整的故事',
    tag_zhTW: '在迷人的沙漠邊疆小鎮建造、製作和交友——波希亞時光的精神續作，有更多深度、更多角色和更完整的故事',
    tag_ja: '砂漠の辺境の街でクラフトして作って仲間を作ろう——マイタイムアットポルティアよりも奥深く、豊かなキャラクターと完成度の高いストーリーが楽しめる精神的続編',
    tag_ko: '매력적인 사막 개척 마을에서 건설하고, 제작하고, 친구를 사귀어 보세요——마이타임앳포르티아의 정신적 후속작으로 더 풍부한 깊이, 더 많은 캐릭터, 더 완성된 스토리를 자랑해요',
    tag_de: 'Bauen, craften und Freundschaften schließen in einem charmanten Wüsten-Grenzstädtchen — eine spirituelle Weiterentwicklung von My Time at Portia mit mehr Tiefe, mehr Charakteren und einer runderen Geschichte',
    platform_en: 'Available on: PC (Steam, Epic), Nintendo Switch, PS4, PS5, Xbox — about $35',
    platform_zh: '可在以下平台获取：PC（Steam、Epic）、Nintendo Switch、PS4、PS5、Xbox——约 35 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、Epic）、Nintendo Switch、PS4、PS5、Xbox——約 35 美元',
    platform_ja: '対応プラットフォーム：PC（Steam・Epic）、Nintendo Switch、PS4、PS5、Xbox——約35ドル',
    platform_ko: '플랫폼: PC (Steam, Epic), Nintendo Switch, PS4, PS5, Xbox — 약 $35',
    platform_de: 'Erhältlich auf: PC (Steam, Epic), Nintendo Switch, PS4, PS5, Xbox — ca. 35 Dollar',
    why_en:
      "My Time at Sandrock (2023) is the follow-up to My Time at Portia and represents a significant upgrade in every dimension: larger cast of characters, more developed relationship arcs, a complete and more emotionally satisfying story, and a desert frontier aesthetic that gives the world a distinct identity. You play as a builder who arrives in the struggling town of Sandrock and takes over an abandoned workshop, taking on commissions from townsfolk to craft everything from furniture to infrastructure. The relationship system is generous: befriending characters unlocks their backstory missions and eventually romance options. The town evolves as your commissions complete — you will visibly see Sandrock transform over time. Compared to Portia, Sandrock has notably better writing, more complex characters (each has real issues and arcs that resolve over time), and a main story that builds to a genuinely dramatic climax. For players who want the warmth of a farming sim but in a different setting: Sandrock delivers the cozy daily rhythm in a desert Western aesthetic that feels fresh and distinct from Japan-inspired farming games.",
    why_zh:
      '沙石镇时光（2023 年）是帕鲁世界的续作，在各个维度都有显著提升：更大的角色阵容、更发达的关系弧线、更完整且情感上更令人满足的故事，以及给世界带来独特身份的沙漠边疆美学。你扮演一个到达挣扎中的沙石镇并接管一个废弃工坊的建造者，接受村民的委托，制作从家具到基础设施的一切。关系系统很慷慨：与角色交朋友可以解锁他们的背景故事任务，最终还有浪漫选项。随着你完成委托，小镇会发展——你会随着时间的推移目睹沙石镇的转变。与帕鲁世界相比，沙石镇有明显更好的文字、更复杂的角色（每个人都有随时间解决的真实问题和弧线），以及一个真正达到戏剧性高潮的主线故事。',
    why_zhTW:
      '沙石鎮時光（2023 年）是波希亞時光的續作，在各個維度都有顯著提升：更大的角色陣容、更發達的關係弧線、更完整且情感上更令人滿足的故事，以及給世界帶來獨特身份的沙漠邊疆美學。你扮演一個到達掙扎中的沙石鎮並接管一個廢棄工坊的建造者，接受村民的委託，製作從家具到基礎設施的一切。關係系統很慷慨：與角色交朋友可以解鎖他們的背景故事任務，最終還有浪漫選項。隨著你完成委託，小鎮會發展——你會隨著時間的推移目睹沙石鎮的轉變。與波希亞時光相比，沙石鎮有明顯更好的文字、更複雜的角色（每個人都有隨時間解決的真實問題和弧線），以及一個真正達到戲劇性高潮的主線故事。',
    why_ja:
      'マイタイムアットサンドロック（2023年）はマイタイムアットポルティアの後継作品で、あらゆる面で大幅に進化しています。登場キャラクターが増え、関係性の描写がより深まり、感情的に満足できる完結したストーリーが楽しめます。砂漠の辺境という独特の雰囲気も世界に確かなアイデンティティを与えています。プレイヤーは廃れた砂石タウンにやってきて廃工房を引き継ぐビルダーとなり、住人から家具からインフラまで様々な製作依頼を受けていきます。関係システムはとても丁寧——キャラクターと仲良くなると専用のバックストーリーミッションが解放され、やがてロマンスの選択肢も登場します。街は依頼を完遂するたびに目に見えて発展し、砂石タウンが変わっていく様子を実感できます。ポルティアと比べてライティングのクオリティが明らかに向上しており、キャラクターもより複雑な内面を持ちます。メインストーリーは本当に感情が揺さぶられるクライマックスへと向かいます。農場ゲームの心地よいリズムは好きだけど違う舞台で楽しみたいというプレイヤーには、日本風農場ゲームとは一線を画す西部劇的な世界観でそれを届けてくれる作品です。',
    why_ko:
      '마이타임앳샌드록(2023)은 마이타임앳포르티아의 후속작으로, 모든 면에서 크게 발전했습니다. 캐릭터 수가 늘었고, 관계 아크의 묘사가 더 풍부해졌으며, 완결된 감동적인 스토리와 세계에 독특한 정체성을 부여하는 사막 서부 개척 미학이 특징입니다. 플레이어는 침체된 마을 샌드록에 도착해 방치된 작업장을 인수하는 빌더로, 가구부터 인프라까지 뭐든 제작하는 의뢰를 마을 사람들로부터 받습니다. 관계 시스템은 넉넉합니다. 캐릭터와 친해지면 배경 스토리 미션이 열리고, 결국 로맨스 옵션도 등장합니다. 의뢰를 완수할수록 마을이 발전하고, 샌드록이 눈에 띄게 변화하는 걸 느낄 수 있습니다. 포르티아에 비해 글쓰기 퀄리티가 확연히 좋아졌고, 캐릭터들도 더 복잡한 내면을 지니며, 메인 스토리는 진짜 감동적인 클라이맥스로 이어집니다. 농장 시뮬레이터의 아늑한 일상은 좋지만 다른 배경이 갖고 싶은 플레이어에게, 일본풍 농장 게임과 전혀 다른 서부극 미학으로 그 매력을 전달하는 작품입니다.',
    why_de:
      'My Time at Sandrock (2023) ist der Nachfolger von My Time at Portia und stellt in jeder Hinsicht eine erhebliche Verbesserung dar: größeres Charakteraufgebot, ausgefeiltere Beziehungsbögen, eine vollständige und emotional befriedigendere Geschichte und eine Wüsten-Western-Ästhetik, die der Welt eine unverwechselbare Identität verleiht. Du spielst als Baumeister, der in der angeschlagenen Stadt Sandrock ankommt und eine verlassene Werkstatt übernimmt. Du nimmst Aufträge von den Einwohnern an, um alles von Möbeln bis zur Infrastruktur herzustellen. Das Beziehungssystem ist großzügig: Die Freundschaft mit Charakteren schaltet ihre Hintergrundgeschichten-Missionen und schließlich Romanzenoptionen frei. Die Stadt entwickelt sich, wenn deine Aufträge abgeschlossen sind — du wirst sehen, wie Sandrock sich im Laufe der Zeit verändert. Verglichen mit Portia hat Sandrock deutlich besseres Schreiben, komplexere Charaktere (jeder hat echte Probleme und Bögen, die sich im Laufe der Zeit auflösen) und eine Hauptgeschichte, die zu einem wirklich dramatischen Höhepunkt führt. Für Spieler, die die Wärme eines Farming-Sims wollen, aber in einer anderen Kulisse: Sandrock liefert den gemütlichen Tagesrhythmus in einer westlichen Wüstenästhetik, die sich frisch und anders anfühlt.',
    tip_en: "Prioritize upgrading your Workshop storage early — running out of material slots while mid-commission is the most common frustration. Check the commission board every morning before deciding your day's work. Romance options unlock after becoming friends first; don't skip the friendship gifts.",
    tip_zh: '优先早期升级你的工坊存储——在完成委托途中用完材料槽是最常见的挫折。每天早上在决定当天工作之前检查委托板。浪漫选项在先成为朋友后解锁；不要跳过友情礼物。',
    tip_zhTW: '優先早期升級你的工坊儲存——在完成委託途中用完材料槽是最常見的挫折。每天早上在決定當天工作之前檢查委託板。浪漫選項在先成為朋友後解鎖；不要跳過友情禮物。',
    tip_ja: 'まずは工房の収納スペースの拡張を優先しましょう——依頼の途中で素材スロットが枯れるのが一番のストレスです。毎朝まず依頼板を確認してから今日のスケジュールを決めるとスムーズです。ロマンスは友人になってから解放されるので、友情ギフトを忘れずに。',
    tip_ko: '작업장 수납 공간을 일찍 업그레이드하는 게 최우선입니다——의뢰 도중 재료 슬롯이 가득 차는 게 가장 흔한 불만이거든요. 매일 아침 하루 일정을 정하기 전에 의뢰 보드를 확인하세요. 로맨스 옵션은 먼저 친구가 된 후 열리니, 우정 선물을 잊지 마세요.',
    tip_de: 'Priorisiere frühzeitig das Upgraden deines Werkstatt-Lagers — mitten in einem Auftrag keinen Materialienplatz mehr zu haben, ist die häufigste Frustration. Schau jeden Morgen auf das Auftragsbrett, bevor du dein Tagwerk planst. Romanzenoptionen werden freigeschaltet, nachdem du erst Freunde geworden bist; überspringe die Freundschaftsgeschenke nicht.',
  },
  persona4: {
    title_en: 'Persona 4 Golden',
    title_zh: '女神异闻录 4 黄金版',
    title_zhTW: '女神異聞錄 4 黃金版',
    title_ja: 'ペルソナ4 ザ・ゴールデン',
    title_ko: '페르소나4 더 골든',
    title_de: 'Persona 4 Golden',
    emoji: '🔶',
    tag_en: 'A year in a small Japanese town — balance high school social life, deep friendships (Social Links), and dungeon exploration in a time-management RPG built around who you choose to know',
    tag_zh: '在一个日本小镇度过的一年——在一款以你选择认识的人为核心的时间管理 RPG 中，平衡高中社交生活、深厚友谊（社交链接）和地下城探索',
    tag_zhTW: '在一個日本小鎮度過的一年——在一款以你選擇認識的人為核心的時間管理 RPG 中，平衡高中社交生活、深厚友誼（社交鏈接）和地下城探索',
    tag_ja: '日本の田舎町で過ごす1年——誰と時間を過ごすかが全てを決める時間管理RPGで、高校生活、深い友情（コープ）、ダンジョン探索をバランスよく楽しむ',
    tag_ko: '일본 소도시에서 보내는 1년——누구와 시간을 보낼지 선택하는 시간 관리 RPG에서 고등학교 생활, 깊은 우정(코옵), 던전 탐험을 균형 있게 즐겨보세요',
    tag_de: 'Ein Jahr in einer japanischen Kleinstadt — Highschool-Sozialleben, tiefe Freundschaften (Social Links) und Dungeonerkundung in einem Zeitmanagement-RPG, das darum geht, wen du wählen möchtest zu kennen',
    platform_en: 'Available on: PC (Steam), PS Vita (original), PlayStation 3 (base game) — about $20 on Steam. Also in the Persona 3 Reload + Golden bundle.',
    platform_zh: '可在以下平台获取：PC（Steam）、PS Vita（原版）、PlayStation 3（基础版）——Steam 上约 20 美元。也包含在女神异闻录 3 重制版 + 黄金版捆绑包中。',
    platform_zhTW: '可在以下平台取得：PC（Steam）、PS Vita（原版）、PlayStation 3（基礎版）——Steam 上約 20 美元。也包含在女神異聞錄 3 重製版 + 黃金版捆綁包中。',
    platform_ja: '対応プラットフォーム：PC（Steam）、PS Vita（オリジナル版）、PlayStation 3（ベース版）——Steamで約20ドル。ペルソナ3 リロード＋ゴールデンバンドルでも入手可能',
    platform_ko: '플랫폼: PC (Steam), PS Vita (오리지널), PlayStation 3 (기본판) — Steam에서 약 $20. 페르소나3 리로드 + 골든 번들에도 포함',
    platform_de: 'Erhältlich auf: PC (Steam), PS Vita (Original), PlayStation 3 (Basisspiel) — ca. 20 Dollar auf Steam. Auch im Persona 3 Reload + Golden Bundle.',
    why_en:
      "Persona 4 Golden (2012, PC release 2020) is one of the most beloved JRPGs ever made — a game where the social simulation is as mechanically deep and emotionally rewarding as the dungeon exploration. You play as a city student who moves to the rural town of Inaba for a year, and shortly after arriving, a string of murders begins. The Investigation Team — your group of high school friends — discovers they can enter televisions and navigate a supernatural dungeon world. The Social Link system is the game's defining feature: each significant character represents an Arcana, and spending time with them unlocks story content that directly strengthens your Persona fusions. Time management is real — each day has limited slots, and choosing to study, work part-time, fish, deepen a friendship, or enter the dungeon has meaningful tradeoffs. The writing is excellent, the ensemble cast is beloved, and the murder mystery is genuinely compelling. At $20 on Steam for 80-100+ hours of content, it is one of the most exceptional value RPGs available. A perfect entry point to the Persona series.",
    why_zh:
      '女神异闻录 4 黄金版（2012 年，2020 年 PC 发行）是有史以来最受喜爱的 JRPG 之一——一款社交模拟在机制深度和情感回报上与地下城探索同样丰富的游戏。你扮演一名搬到农村稻叶镇度过一年的城市学生，抵达后不久，一系列谋杀案开始发生。调查队——你的高中朋友群——发现他们可以进入电视机并在超自然地下城世界中导航。社交链接系统是游戏的决定性特色：每个重要角色代表一种塔罗牌，与他们共度时光可以解锁故事内容，直接强化你的女神合成。时间管理是真实的——每天有有限的时间段，选择学习、兼职工作、钓鱼、深化友谊或进入地下城都有有意义的取舍。文字出色，角色阵容备受喜爱，谋杀悬案真正引人入胜。Steam 上 20 美元可获得 80-100+ 小时的内容，是最具价值的 RPG 之一。',
    why_zhTW:
      '女神異聞錄 4 黃金版（2012 年，2020 年 PC 發行）是有史以來最受喜愛的 JRPG 之一——一款社交模擬在機制深度和情感回報上與地下城探索同樣豐富的遊戲。你扮演一名搬到農村稻葉鎮度過一年的城市學生，抵達後不久，一系列謀殺案開始發生。調查隊——你的高中朋友群——發現他們可以進入電視機並在超自然地下城世界中導航。社交鏈接系統是遊戲的決定性特色：每個重要角色代表一種塔羅牌，與他們共度時光可以解鎖故事內容，直接強化你的女神合成。時間管理是真實的——每天有有限的時間段，選擇學習、兼職工作、釣魚、深化友誼或進入地下城都有有意義的取捨。文字出色，角色陣容備受喜愛，謀殺懸案真正引人入勝。Steam 上 20 美元可獲得 80-100+ 小時的內容，是最具價值的 RPG 之一。',
    why_ja:
      'ペルソナ4 ザ・ゴールデン（2012年、PC版は2020年）は史上最愛のJRPGのひとつです——社会シミュレーションがダンジョン探索と同じくらい機械的に深く、感情的にも充実した作品。都会から稲羽市という農村の町に1年間転校してくる高校生を操作し、到着後まもなく連続殺人事件が起きます。調査隊——高校の仲間たち——はテレビの中に入って超自然のダンジョン世界を探索できることを発見します。コープシステムはゲームの核心的特徴で、重要なキャラクターはそれぞれアルカナを象徴し、一緒に時間を過ごすことでストーリーが解放され、ペルソナ合体が強化されます。時間管理は本当に大切——毎日スロットが限られており、勉強するか、アルバイトするか、釣りをするか、友情を深めるか、ダンジョンに入るかを選ぶことに意味のある駆け引きがあります。ライティングは秀逸で、キャラクター群も大人気。殺人ミステリーも本当に引き込まれます。Steamで約20ドルで80〜100時間以上楽しめる、コスパ最強RPGのひとつです。ペルソナシリーズ入門にも最適。',
    why_ko:
      '페르소나4 더 골든(2012년, PC 2020년 출시)은 역대 가장 사랑받는 JRPG 중 하나입니다——소셜 시뮬레이션이 던전 탐험만큼 게임 메커닉적으로도 깊고 감정적으로도 보람 있는 게임이죠. 도시에서 이나바라는 농촌 마을로 1년간 전학 온 고등학생을 조작하며, 도착 직후 연쇄 살인 사건이 발생합니다. 수사대——고등학교 친구들——은 TV 안으로 들어가 초자연적인 던전 세계를 탐험할 수 있다는 것을 알게 됩니다. 코옵 시스템이 게임의 핵심 특징으로, 주요 캐릭터는 각각 타로 아르카나를 상징하며, 함께 시간을 보내면 스토리가 열리고 페르소나 합체가 강화됩니다. 시간 관리는 진짜입니다——매일 슬롯이 한정되어 있어 공부, 아르바이트, 낚시, 우정 심화, 던전 진입 중 무엇을 할지 선택하는 게 의미 있는 트레이드오프를 만듭니다. 글쓰기 퀄리티가 훌륭하고, 앙상블 캐스트도 큰 사랑을 받으며, 살인 미스터리도 진짜 흡입력 있습니다. Steam에서 약 20달러에 80-100시간 이상의 콘텐츠를 즐길 수 있어 가성비 최강 RPG 중 하나입니다. 페르소나 시리즈의 완벽한 입문작이기도 해요.',
    why_de:
      'Persona 4 Golden (2012, PC-Release 2020) ist eines der beliebtesten JRPGs aller Zeiten — ein Spiel, bei dem die Sozialsimulation genauso mechanisch tiefgründig und emotional lohnend ist wie die Dungeonerkundung. Du spielst als Stadtschüler, der für ein Jahr in die Kleinstadt Inaba zieht, und kurz nach seiner Ankunft beginnen Morde. Das Ermittlungsteam — deine Gruppe von Oberschulfreunden — entdeckt, dass sie in Fernsehgeräte eintreten und eine übernatürliche Dungeon-Welt erkunden können. Das Social-Link-System ist das prägende Merkmal des Spiels: Jede bedeutende Figur repräsentiert ein Arcanum, und Zeit mit ihnen zu verbringen schaltet Story-Inhalte frei, die deine Persona-Fusionen direkt stärken. Zeitmanagement ist real — jeder Tag hat begrenzte Slots, und die Wahl zwischen Lernen, Teilzeitarbeit, Angeln, einer Freundschaft vertiefen oder in den Dungeon einzutreten hat echte Konsequenzen. Das Schreiben ist hervorragend, das Ensemble-Cast ist beliebt, und der Mordfall ist wirklich fesselnd. Für etwa 20 Euro auf Steam mit 80-100+ Stunden Inhalt ist es eines der besten Preis-Leistungs-Verhältnisse unter RPGs. Perfekter Einstiegspunkt in die Persona-Serie.',
    tip_en: "Raise your Social Stats (Courage, Knowledge, etc.) first — many Social Links have a minimum stat requirement before you can start them. Do part-time jobs at the Beef Bowl to raise Knowledge, watch DVDs at home for other stats. Enter the dungeon as soon as a new victim appears, then clear the rest of the month doing Social Links.",
    tip_zh: '首先提升你的社交属性（勇气、知识等）——许多社交链接在你开始之前有最低属性要求。在牛肉盖饭餐厅打工以提升知识，在家观看 DVD 提升其他属性。一旦新的受害者出现就进入地下城，然后剩余月份都用来深化社交链接。',
    tip_zhTW: '首先提升你的社交屬性（勇氣、知識等）——許多社交鏈接在你開始之前有最低屬性要求。在牛肉蓋飯餐廳打工以提升知識，在家觀看 DVD 提升其他屬性。一旦新的受害者出現就進入地下城，然後剩餘月份都用來深化社交鏈接。',
    tip_ja: 'まず社会ステータス（勇気・学力など）を上げましょう——多くのコープには開始の最低条件があります。牛丼の店でアルバイトすると学力が上がり、自宅でDVD鑑賞すると他のステータスが伸びます。新たな被害者が現れたらすぐダンジョンに入り、残りの月はコープに集中するのが王道パターンです。',
    tip_ko: '먼저 소셜 스탯(용기, 지식 등)을 올려두세요——많은 코옵은 시작 전 최소 스탯 요건이 있거든요. 쇠고기덮밥 가게 아르바이트로 지식을 올리고, 집에서 DVD를 보며 다른 스탯을 키우세요. 새로운 피해자가 나타나면 바로 던전에 입장하고, 남은 시간은 코옵에 집중하는 게 왕도입니다.',
    tip_de: 'Erhöhe zuerst deine sozialen Werte (Mut, Wissen usw.) — viele Social Links haben Mindestanforderungen, bevor du sie beginnen kannst. Arbeite im Beef Bowl Restaurant für Wissen, schau zu Hause DVDs für andere Werte an. Betritt den Dungeon, sobald ein neues Opfer auftaucht, und verbringe den Rest des Monats mit Social Links.',
  },
  feth: {
    title_en: 'Fire Emblem: Three Houses',
    title_zh: '火焰纹章：风花雪月',
    title_zhTW: '火焰紋章：風花雪月',
    title_ja: 'ファイアーエムブレム 風花雪月',
    title_ko: '파이어 엠블렘 풍화설월',
    title_de: 'Fire Emblem: Three Houses',
    emoji: '⚔️',
    tag_en: 'Teach students, build bonds, then lead them into tactical battle — a game where relationships you forge at a monastery school determine who lives and dies in a war that will shake the world',
    tag_zh: '教导学生、建立纽带，然后带领他们进入战术战斗——一款你在修道院学校建立的关系决定谁在一场将震撼世界的战争中生存和死亡的游戏',
    tag_zhTW: '教導學生、建立紐帶，然後帶領他們進入戰術戰鬥——一款你在修道院學校建立的關係決定誰在一場將震撼世界的戰爭中生存和死亡的遊戲',
    tag_ja: '生徒を教え、絆を育て、戦場へ共に——修道院学校で築いた関係が、世界を揺るがす戦争で誰が生き残るかを左右するゲーム',
    tag_ko: '학생을 가르치고, 유대감을 쌓고, 전장으로 함께——수도원 학교에서 맺은 관계가 세상을 뒤흔들 전쟁에서 누가 살아남는지를 결정하는 게임',
    tag_de: 'Unterrichte Schüler, baue Bindungen auf und führe sie dann in taktische Kämpfe — ein Spiel, bei dem die Beziehungen, die du in einer Klosterschule aufbaust, entscheiden, wer in einem Krieg, der die Welt erschüttern wird, lebt und stirbt',
    platform_en: 'Available on: Nintendo Switch only — about $60 new, often $30-40 secondhand or on sale. Cindered Shadows DLC adds significant content.',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 60 美元，二手或促销时通常 30-40 美元。灰烬之影 DLC 增加了大量内容。',
    platform_zhTW: '可在以下平台取得：僅 Nintendo Switch——新品約 60 美元，二手或促銷時通常 30-40 美元。灰燼之影 DLC 增加了大量內容。',
    platform_ja: '対応プラットフォーム：Nintendo Switch専用——新品で約60ドル、中古やセール時は30〜40ドルが目安。「蒼月の女神 外伝: 灰色の悪魔」DLCで大幅にボリュームアップ',
    platform_ko: '플랫폼: Nintendo Switch 전용 — 새것 약 $60, 중고 또는 세일 시 $30-40. 재의 그림자 DLC로 대량 콘텐츠 추가',
    platform_de: 'Erhältlich auf: Nintendo Switch — ca. 60 Dollar neu, oft 30-40 Dollar gebraucht oder im Sale. Cindered Shadows DLC fügt erhebliche Inhalte hinzu.',
    why_en:
      "Fire Emblem: Three Houses (2019) is one of the most acclaimed Nintendo Switch games and one of the finest tactical RPGs ever made — a game that pairs an expansive school-life social simulation with permanent-death tactical combat, and makes both feel equally important. You play as Byleth, a mercenary who becomes a professor at Garreg Mach Monastery, choosing one of three noble houses to teach: the Golden Deer (bright and idealistic), the Black Eagles (ambitious and complex), or the Blue Lions (disciplined and haunted by trauma). The school phase involves teaching classes, spending Free Time deepening Support conversations with students and faculty, recruiting students from other houses, and exploring the monastery. Then battles begin, and the bonds you built determine whether your students support each other effectively. The Support system creates hundreds of character-specific conversations between every pairing; watching relationships develop through battle and hardship is the emotional core. With three major story routes (and a fourth hidden route), each revealing different truths about the world's history, replay value is enormous. One of the best games of its generation.",
    why_zh:
      '火焰纹章：风花雪月（2019 年）是最受好评的 Nintendo Switch 游戏之一，也是有史以来最优秀的战术 RPG 之一——一款将广泛的学校生活社交模拟与永久死亡战术战斗配对，并让两者都感觉同样重要的游戏。你扮演贝雷斯，一名成为加纳克修道院教授的雇佣兵，选择三个贵族学院之一来执教：金鹿（明亮而理想主义）、黑鹰（雄心勃勃且复杂）或蓝狮（纪律严明且被创伤困扰）。学校阶段包括教导课程、利用自由时间深化与学生和教职员工的支援对话、从其他学院招募学生，以及探索修道院。然后战斗开始，你建立的纽带决定你的学生是否能有效地相互支持。支援系统在每对角色之间创造了数百个特定角色对话；通过战斗和困难看着关系发展是情感核心。有三条主要故事路线（以及第四条隐藏路线），每条都揭示了世界历史的不同真相，重玩价值巨大。',
    why_zhTW:
      '火焰紋章：風花雪月（2019 年）是最受好評的 Nintendo Switch 遊戲之一，也是有史以來最優秀的戰術 RPG 之一——一款將廣泛的學校生活社交模擬與永久死亡戰術戰鬥配對，並讓兩者都感覺同樣重要的遊戲。你扮演貝雷斯，一名成為加納克修道院教授的僱傭兵，選擇三個貴族學院之一來執教：金鹿（明亮而理想主義）、黑鷹（雄心勃勃且複雜）或藍獅（紀律嚴明且被創傷困擾）。學校階段包括教導課程、利用自由時間深化與學生和教職員工的支援對話、從其他學院招募學生，以及探索修道院。然後戰鬥開始，你建立的紐帶決定你的學生是否能有效地相互支持。支援系統在每對角色之間創造了數百個特定角色對話；透過戰鬥和困難看著關係發展是情感核心。有三條主要故事路線（以及第四條隱藏路線），每條都揭示了世界歷史的不同真相，重玩價值巨大。',
    why_ja:
      'ファイアーエムブレム 風花雪月（2019年）はNintendo Switchで最も高く評価されたゲームのひとつであり、史上最高の戦術RPGのひとつ。広大な学校生活ソーシャルシムと永久死亡戦術バトルをペアリングし、どちらも同じくらい重要に感じさせる作品です。ガルグ＝マク修道院の教師となった傭兵・ベレス（またはベレト）を操作し、三つの貴族学院——金鹿（明るく理想主義的）、黒鷲（野心的で複雑）、青獅子（規律正しく、トラウマを抱える）——のうちひとつを選んで教えます。学校フェーズでは授業を行い、フリータイムで生徒や教員との支援会話を深め、他学院の生徒をスカウトし、修道院を探索します。そして戦闘フェーズへ——築いた絆が生徒同士の連携に影響します。支援システムはすべての組み合わせに固有の会話を生み出し、戦場と試練を通じて関係が深まる様子が感情の核心です。3つのメインルート（と隠しルート）があり、それぞれ世界の歴史の異なる真実を明かすため、周回プレイの価値は計り知れません。この世代を代表する傑作のひとつ。',
    why_ko:
      '파이어 엠블렘 풍화설월(2019)은 가장 호평받은 Nintendo Switch 게임 중 하나이자, 역대 최고의 전술 RPG 중 하나입니다——광범위한 학원 생활 소셜 시뮬레이션과 영구 사망 전술 전투를 결합하고, 두 가지 모두 똑같이 중요하게 느끼게 만드는 게임입니다. 플레이어는 가르그마크 수도원의 교수가 된 용병 베레스(또는 베레트)가 되어, 세 귀족 학원 중 하나를 선택합니다. 금사자(밝고 이상주의적), 흑수리(야심적이고 복잡한), 청사자(규율 잡혀있고 트라우마를 안고 있는). 학원 페이즈에서는 수업을 하고, 자유 시간에 학생 및 교직원과의 지원 대화를 쌓고, 다른 학원의 학생을 스카우트하고, 수도원을 탐험합니다. 그리고 전투가 시작되면, 당신이 쌓은 유대감이 학생들이 얼마나 효과적으로 서로를 지원하는지를 결정합니다. 지원 시스템은 모든 조합 사이에 수백 개의 고유한 대화를 만들고, 전투와 역경을 통해 관계가 발전하는 것을 지켜보는 것이 감정적 핵심입니다. 3개의 주요 스토리 루트(그리고 숨겨진 4번째 루트)가 있으며, 각각 세계 역사에 대한 다른 진실을 밝혀주어 리플레이 가치가 매우 큽니다.',
    why_de:
      'Fire Emblem: Three Houses (2019) ist eines der meistgelobten Nintendo-Switch-Spiele und eines der besten taktischen RPGs aller Zeiten — ein Spiel, das eine umfangreiche Schulleben-Sozialsimulation mit taktischem Kampf mit permanentem Tod verbindet und beides gleichermaßen wichtig erscheinen lässt. Du spielst als Byleth, einen Söldner, der Professor am Garreg-Mach-Kloster wird, und wählst eines von drei Adelshäusern zum Unterrichten: die Goldenen Hirsche (hell und idealistisch), die Schwarzen Adler (ehrgeizig und komplex) oder die Blauen Löwen (diszipliniert und von Traumata geplagt). Die Schulphase umfasst das Unterrichten von Klassen, das Vertiefen von Unterstützungsgesprächen mit Schülern und Lehrkräften in der Freizeit, das Rekrutieren von Schülern aus anderen Häusern und das Erkunden des Klosters. Dann beginnen die Schlachten, und die aufgebauten Bindungen bestimmen, ob deine Schüler sich gegenseitig effektiv unterstützen. Das Support-System schafft Hunderte von charakterspezifischen Gesprächen zwischen jedem Pärchen; zu sehen, wie sich Beziehungen durch Kämpfe und Widrigkeiten entwickeln, ist der emotionale Kern. Mit drei Haupt-Story-Routen (und einer vierten versteckten Route), die jeweils andere Wahrheiten über die Weltgeschichte enthüllen, ist der Wiederspielwert enorm. Eines der besten Spiele seiner Generation.',
    tip_en: "Eat meals with students to build Faculty Points (used for extra tutoring) and relationship points simultaneously. On the 'Explore' days, prioritize the greenhouse (harvest and replant every Sunday) and fishing (rare fish unlock key item rewards). Always save before a battle and accept that some characters may fall — this is part of the emotional weight the game is designed to carry.",
    tip_zh: '与学生一起用餐，同时建立教职积分（用于额外辅导）和关系积分。在"自由探索"日，优先考虑温室（每周日收割和重新种植）和钓鱼（稀有鱼类解锁关键物品奖励）。在战斗前始终存档，接受一些角色可能阵亡——这是游戏设计来承载的情感分量的一部分。',
    tip_zhTW: '與學生一起用餐，同時建立教職積分（用於額外輔導）和關係積分。在「自由探索」日，優先考慮溫室（每週日收割和重新種植）和釣魚（稀有魚類解鎖關鍵物品獎勵）。在戰鬥前始終存檔，接受一些角色可能陣亡——這是遊戲設計來承載的情感分量的一部分。',
    tip_ja: '生徒と一緒に食事をすると教育ポイント（特訓に使う）と絆の両方が同時に育てられます。「自由探索」では毎週日曜の温室（収穫と植え替え）と釣り（レアな魚がアイテム報酬を解放）を優先しましょう。戦闘前は必ずセーブして、誰かが倒れてしまう可能性を覚悟しておきましょう——それがこのゲームが意図する重みの一部です。',
    tip_ko: '학생들과 함께 식사를 하면 교육 포인트(추가 과외에 사용)와 관계 포인트를 동시에 쌓을 수 있어요. 자유 탐험 날에는 온실(매주 일요일 수확 및 재식재)과 낚시(희귀 물고기가 핵심 아이템 보상 해금)를 우선시하세요. 전투 전에는 항상 저장하고, 일부 캐릭터가 쓰러질 수도 있다는 걸 받아들이세요——그것이 이 게임이 담으려 한 감정적 무게의 일부입니다.',
    tip_de: 'Esse Mahlzeiten mit Schülern, um gleichzeitig Lehrpunkte (für zusätzlichen Unterricht) und Beziehungspunkte aufzubauen. Priorisiere an Erkundungstagen das Gewächshaus (jeden Sonntag ernten und neu bepflanzen) und Angeln (seltene Fische schalten wichtige Gegenstände frei). Speichere immer vor einer Schlacht und akzeptiere, dass manche Charaktere fallen können — das ist Teil des emotionalen Gewichts, das das Spiel tragen soll.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { sos: 0, sandrock: 0, persona4: 0, feth: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function RelationshipSimQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/relationship-sim-quiz`
    const shareText =
      locale === 'zh'
        ? `社交关系模拟游戏推荐测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
        : locale === 'zh-TW'
        ? `社交關係模擬遊戲推薦測驗結果：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`
        : locale === 'ja'
        ? `関係シムのおすすめ診断結果：「${result.title_ja}」！${result.tag_ja}。あなたも試してみて：${url}`
        : locale === 'ko'
        ? `관계 시뮬레이션 게임 추천 결과：「${result.title_ko}」！${result.tag_ko}。나의 게임 찾기：${url}`
        : locale === 'de'
        ? `Meine Beziehungs-Sim-Empfehlung: ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`
        : `My relationship sim recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {getLoc('入门建议：', 'Getting started: ', '入門建議：', '入門アドバイス：', '시작 팁: ', 'Erste Schritte: ')}
            </span>
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
            '哪款以「关系」为核心的游戏最适合你？',
            'Which Game Built Around Relationships Is Right for You?',
            '哪款以「關係」為核心的遊戲最適合你？',
            'どのNPC関係重視ゲームが自分に合う？',
            '나에게 딱 맞는 관계 중심 게임은?',
            'Welches Beziehungs-Sim-Spiel passt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从牧场物语：美好的生活、沙石镇时光、女神异闻录 4、火焰纹章：风花雪月中找到你的游戏',
            '6 questions to match you with Story of Seasons: A Wonderful Life, My Time at Sandrock, Persona 4 Golden, or Fire Emblem: Three Houses',
            '6 個問題，從牧場物語：美好的生活、沙石鎮時光、女神異聞錄 4、火焰紋章：風花雪月中找到你的遊戲',
            '6つの質問でわかる：牧場物語 ワンダフルライフ、マイタイムアットサンドロック、ペルソナ4 ザ・ゴールデン、FE 風花雪月から自分にぴったりの1本を',
            '6가지 질문으로 스토리 오브 시즌스: 원더풀 라이프, 마이타임앳샌드록, 페르소나4 더 골든, 파이어 엠블렘 풍화설월 중 내 게임 찾기',
            '6 Fragen, um dein Spiel zu finden — Story of Seasons: A Wonderful Life, My Time at Sandrock, Persona 4 Golden oder Fire Emblem: Three Houses',
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
        {getLoc('找到我的社交关系模拟游戏', 'Find My Relationship Game', '找到我的社交關係模擬遊戲', '自分にぴったりの関係シムを見つける', '나에게 맞는 관계 시뮬레이션 게임 찾기', 'Mein Beziehungs-Sim finden')}
      </button>
    </div>
  )
}
