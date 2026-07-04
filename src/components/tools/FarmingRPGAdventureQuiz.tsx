'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'harvestella' | 'rf5' | 'paleo' | 'pot'

function ShareButton({ text, locale }: { text: string; locale: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  const copyLabel = copied
    ? (locale === 'zh' ? '已复制！' : locale === 'zh-TW' ? '已複製！' : locale === 'ja' ? 'コピーしました！' : locale === 'ko' ? '복사되었습니다!' : locale === 'de' ? 'Kopiert!' : 'Copied!')
    : (locale === 'zh' ? '复制结果' : locale === 'zh-TW' ? '複製結果' : locale === 'ja' ? '結果をコピー' : locale === 'ko' ? '결과 복사' : locale === 'de' ? 'Ergebnis kopieren' : 'Copy Result')
  const shareLabel = locale === 'zh' || locale === 'zh-TW' ? '分享到 X' : locale === 'ja' ? 'Xでシェア' : locale === 'ko' ? 'X에 공유' : locale === 'de' ? 'Auf X teilen' : 'Share on X'

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <button
        onClick={handleCopy}
        className="rounded-lg bg-[#2d3d2d] px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:bg-[#3d4d3d]"
      >
        {copyLabel}
      </button>
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-[#1a8cd8] px-4 py-2 text-sm text-white transition-colors hover:bg-[#1a7bc0]"
      >
        {shareLabel}
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
    q_en: 'How much combat and adventure do you want alongside your farming?',
    q_zh: '你希望农场游戏里有多少战斗与冒险元素？',
    q_zhTW: '你希望農場遊戲裡有多少戰鬥與冒險元素？',
    q_ja: '農場ゲームにどのくらい戦闘・冒険要素を求めますか？',
    q_ko: '농장 게임에 전투와 모험 요소가 얼마나 있으면 좋겠나요?',
    q_de: 'Wie viel Kampf und Abenteuer möchtest du neben deiner Farm haben?',
    options: [
      {
        en: 'Full turn-based RPG combat — adventure and farming should feel equally important',
        zh: '完整的回合制RPG战斗，冒险感和农场感同等重要，缺一不可',
        zhTW: '完整的回合制RPG戰鬥，冒險感和農場感同等重要，缺一不可',
        ja: '本格ターン制RPG戦闘——冒険と農業が同じくらい重要な体験',
        ko: '완전한 턴제 RPG 전투 — 모험과 농장이 동등하게 중요해야 해요',
        de: 'Vollständige rundenbasierte RPG-Kämpfe — Abenteuer und Farming gleich wichtig',
        type: 'harvestella',
      },
      {
        en: 'Action dungeon-crawling — I want to swing a sword as often as I swing a hoe',
        zh: '动作地牢探索，挥剑和锄地一样频繁，剑与农耕兼修才过瘾',
        zhTW: '動作地牢探索，揮劍和鋤地一樣頻繁，劍與農耕兼修才過癮',
        ja: 'アクションダンジョン探索——剣を振るのも農具を使うのも同じくらいの頻度で',
        ko: '액션 던전 탐험 — 검을 휘두르는 것만큼 괭이도 자주 휘두르고 싶어요',
        de: 'Action-Dungeon-Crawling — ich will genauso oft ein Schwert schwingen wie eine Hacke',
        type: 'rf5',
      },
      {
        en: 'Light exploration — finding and befriending creatures, not fighting them',
        zh: '轻度探索就好，重点是发现和驯服生物，而不是和它们战斗',
        zhTW: '輕度探索就好，重點是發現和馴服生物，而不是和它們戰鬥',
        ja: '軽めの探索——生き物を見つけて仲良くなりたい、戦いたくない',
        ko: '가벼운 탐험 — 생물을 발견하고 친해지는 것, 싸우는 게 아니에요',
        de: 'Leichte Erkundung — Kreaturen finden und anfreunden, nicht bekämpfen',
        type: 'paleo',
      },
      {
        en: 'Minimal — I am here to farm, build, and enjoy the peaceful daily rhythm',
        zh: '越少越好，我来这里是为了种地、建设和享受平静的日常节奏',
        zhTW: '越少越好，我來這裡是為了種地、建設和享受平靜的日常節奏',
        ja: 'なるべく少なく——農業と建設でのんびり日常を楽しみたい',
        ko: '최소한으로 — 농사짓고 건설하며 평화로운 일상 리듬을 즐기고 싶어요',
        de: 'Minimal — ich bin hier zum Farmen, Bauen und um den friedlichen Tagesrhythmus zu genießen',
        type: 'pot',
      },
    ],
  },
  {
    q_en: 'Which game world calls to you?',
    q_zh: '哪个游戏世界最让你心动？',
    q_zhTW: '哪個遊戲世界最讓你心動？',
    q_ja: 'どんなゲームの世界観に惹かれますか？',
    q_ko: '어떤 게임 세계가 가장 마음에 드나요?',
    q_de: 'Welche Spielwelt spricht dich am meisten an?',
    options: [
      {
        en: 'A dying world of science fantasy — dramatic seasons, ancient mysteries, and urgent stakes',
        zh: '垂死的科幻奇幻融合世界——戏剧性的季节更替、远古谜题和紧迫的世界危机',
        zhTW: '垂死的科幻奇幻融合世界——戲劇性的季節更替、遠古謎題和緊迫的世界危機',
        ja: '滅びゆくSFファンタジー世界——劇的な季節変化、古代の謎、緊迫した世界の命運',
        ko: '멸망해가는 SF 판타지 세계 — 극적인 계절 변화, 고대의 미스터리, 긴박한 위기',
        de: 'Eine sterbende Science-Fantasy-Welt — dramatische Jahreszeiten, antike Mysterien und dringende Einsätze',
        type: 'harvestella',
      },
      {
        en: 'A lively fantasy village full of colorful townsfolk you can befriend and romance',
        zh: '充满活力的奇幻小镇，遍布可以交友和谈恋爱的可爱居民',
        zhTW: '充滿活力的奇幻小鎮，遍布可以交友和談戀愛的可愛居民',
        ja: 'にぎやかなファンタジー村——個性豊かな住人と友達になったり恋したりできる',
        ko: '활기찬 판타지 마을 — 친구도 사귀고 사랑도 할 수 있는 다채로운 주민들로 가득한 곳',
        de: 'Ein lebhaftes Fantasiedorf voller bunter Dorfbewohner, die man befreunden und romántico kann',
        type: 'rf5',
      },
      {
        en: 'A lush prehistoric island where dinosaurs roam freely and you earn their trust',
        zh: '郁郁葱葱的史前岛屿，恐龙自由奔跑，你用耐心慢慢赢得它们的信任',
        zhTW: '鬱鬱蔥蔥的史前島嶼，恐龍自由奔跑，你用耐心慢慢贏得它們的信任',
        ja: '恐竜が自由に闊歩する豊かな先史時代の島——根気強く信頼を築いていく',
        ko: '공룡이 자유롭게 돌아다니는 울창한 선사시대 섬 — 인내로 신뢰를 쌓아가는 곳',
        de: 'Eine üppige prähistorische Insel, auf der Dinosaurier frei umherstreifen und du ihr Vertrauen gewinnst',
        type: 'paleo',
      },
      {
        en: 'A sun-drenched Mediterranean-style town you restore to life through hard work and farming',
        zh: '阳光明媚的地中海风格小镇，你用辛勤耕耘一点点恢复它昔日的活力',
        zhTW: '陽光明媚的地中海風格小鎮，你用辛勤耕耘一點點恢復它昔日的活力',
        ja: '陽光あふれる地中海風の町——懸命な農業でその活気を取り戻す',
        ko: '햇살 가득한 지중해풍 마을 — 열심히 농사지어 예전 활기를 되찾는 곳',
        de: 'Eine sonnengetränkte mediterrane Stadt, die du durch harte Arbeit und Farming wiederbelebst',
        type: 'pot',
      },
    ],
  },
  {
    q_en: 'How important is romance and social life to you in a farming game?',
    q_zh: '恋爱和社交系统对你有多重要？',
    q_zhTW: '戀愛和社交系統對你有多重要？',
    q_ja: '農場ゲームで恋愛・社交システムはどれくらい重要ですか？',
    q_ko: '농장 게임에서 연애와 사교 시스템이 얼마나 중요한가요?',
    q_de: 'Wie wichtig sind Romantik und Sozialleben für dich in einem Farming-Spiel?',
    options: [
      {
        en: 'Nice to have, but the main story and world-saving mission matter more to me',
        zh: '有就好，但主线剧情和拯救世界的使命对我更重要',
        zhTW: '有就好，但主線劇情和拯救世界的使命對我更重要',
        ja: 'あれば嬉しいけど、メインストーリーと世界を救う使命の方が大事',
        ko: '있으면 좋지만, 메인 스토리와 세계를 구하는 사명이 더 중요해요',
        de: 'Schön zu haben, aber Hauptgeschichte und Weltrettungsmission sind mir wichtiger',
        type: 'harvestella',
      },
      {
        en: 'It is a core reason I play — I want to fall in love with a character and build a life together',
        zh: '这是我玩农场游戏的核心动力之一，想和喜欢的角色谈恋爱、共建生活',
        zhTW: '這是我玩農場遊戲的核心動力之一，想和喜歡的角色談戀愛、共建生活',
        ja: 'プレイする核心的な理由の一つ——好きなキャラと恋して一緒に生活を築きたい',
        ko: '이것이 플레이하는 핵심 이유 중 하나예요 — 캐릭터와 사랑에 빠져 함께 삶을 만들고 싶어요',
        de: 'Es ist ein Hauptgrund warum ich spiele — ich möchte mich in einen Charakter verlieben und ein Leben aufbauen',
        type: 'rf5',
      },
      {
        en: 'I want emotional bonds with animals and creatures, not a human romance system',
        zh: '想和动物、生物建立情感纽带，对人类角色的恋爱系统兴趣不大',
        zhTW: '想和動物、生物建立情感紐帶，對人類角色的戀愛系統興趣不大',
        ja: '動物や生き物と心の絆を育てたい——人間の恋愛システムには興味なし',
        ko: '동물과 생물과 감정적 유대를 원해요 — 인간 연애 시스템에는 관심이 없어요',
        de: 'Ich möchte emotionale Bindungen mit Tieren und Kreaturen, kein menschliches Romantiksystem',
        type: 'paleo',
      },
      {
        en: 'I enjoy socializing with townsfolk, but building and farming are the real draw',
        zh: '喜欢和镇民互动，但建设和种地才是真正吸引我的部分',
        zhTW: '喜歡和鎮民互動，但建設和種地才是真正吸引我的部分',
        ja: '村人との交流は楽しいけど、建設と農業が本命',
        ko: '마을 주민과 어울리는 건 좋아요, 하지만 건설과 농사가 진짜 매력이에요',
        de: 'Ich genieße die Geselligkeit mit Dorfbewohnern, aber Bauen und Farmen sind der eigentliche Reiz',
        type: 'pot',
      },
    ],
  },
  {
    q_en: 'What kind of story experience are you hoping for?',
    q_zh: '你期望什么样的叙事体验？',
    q_zhTW: '你期望什麼樣的敘事體驗？',
    q_ja: 'どんなストーリー体験を求めていますか？',
    q_ko: '어떤 스토리 경험을 원하시나요?',
    q_de: 'Welche Art von Story-Erlebnis erhoffst du dir?',
    options: [
      {
        en: 'A rich, cinematic main plot with character growth, plot twists, and genuine emotional payoff',
        zh: '丰富的电影级主线剧情，有角色成长、情节转折和真实的情感回报',
        zhTW: '豐富的電影級主線劇情，有角色成長、情節轉折和真實的情感回報',
        ja: '映画のような豊かなメインプロット——キャラクター成長、どんでん返し、本物の感動',
        ko: '풍부한 영화 같은 메인 스토리 — 캐릭터 성장, 반전, 진정한 감동이 있는',
        de: 'Eine reiche, kinoreife Haupthandlung mit Charakterentwicklung, Wendungen und echtem emotionalem Abschluss',
        type: 'harvestella',
      },
      {
        en: 'Lighthearted character stories and fun NPC interactions rather than a heavy main plot',
        zh: '轻松愉快的角色故事和有趣的NPC互动，不需要沉重的主线压力',
        zhTW: '輕鬆愉快的角色故事和有趣的NPC互動，不需要沉重的主線壓力',
        ja: '明るいキャラクターストーリーと楽しいNPCの交流——重い主線は不要',
        ko: '가볍고 유쾌한 캐릭터 스토리와 재미있는 NPC 상호작용 — 무거운 메인 스토리는 필요 없어요',
        de: 'Leichte Charaktergeschichten und spaßige NPC-Interaktionen statt einer schweren Haupthandlung',
        type: 'rf5',
      },
      {
        en: 'Gentle, heartwarming moments — the story should feel like a warm hug, not an epic',
        zh: '温馨治愈的点滴时刻，故事感觉像一个温暖拥抱，而不是史诗冒险',
        zhTW: '溫馨治癒的點滴時刻，故事感覺像一個溫暖擁抱，而不是史詩冒險',
        ja: '穏やかで心温まる瞬間——ストーリーは壮大な冒険ではなく暖かいハグのように',
        ko: '따뜻하고 힐링되는 순간들 — 스토리는 서사시가 아닌 따뜻한 포옹 같아야 해요',
        de: 'Sanfte, herzerwärmende Momente — die Geschichte sollte sich wie eine warme Umarmung anfühlen, nicht wie ein Epos',
        type: 'paleo',
      },
      {
        en: 'An open story I write myself through my choices — the lighter the scripted plot, the better',
        zh: '我自己书写的开放式故事，预设剧本越淡越好，自由度越高越喜欢',
        zhTW: '我自己書寫的開放式故事，預設劇本越淡越好，自由度越高越喜歡',
        ja: '自分で書くオープンストーリー——決められた台本は少ないほどいい、自由度が命',
        ko: '내가 선택으로 써내려가는 열린 이야기 — 정해진 스크립트가 적을수록 좋아요',
        de: 'Eine offene Geschichte, die ich selbst durch meine Entscheidungen schreibe — je weniger vorgeschriebene Handlung, desto besser',
        type: 'pot',
      },
    ],
  },
  {
    q_en: 'How do you feel about challenge and difficulty?',
    q_zh: '你对挑战和难度的接受程度如何？',
    q_zhTW: '你對挑戰和難度的接受程度如何？',
    q_ja: 'チャレンジや難易度についてどう思いますか？',
    q_ko: '도전과 난이도에 대해 어떻게 생각하시나요?',
    q_de: 'Wie stehst du zu Herausforderungen und Schwierigkeitsgrad?',
    options: [
      {
        en: 'Bring on the boss fights — I want meaningful stakes and satisfying victories',
        zh: '欢迎Boss战，我想要有分量的挑战和让人满足的胜利时刻',
        zhTW: '歡迎Boss戰，我想要有分量的挑戰和讓人滿足的勝利時刻',
        ja: 'ボス戦大歓迎——意味のある挑戦と達成感ある勝利がほしい',
        ko: '보스 전투 환영 — 의미 있는 도전과 만족스러운 승리를 원해요',
        de: 'Her mit den Bosskämpfen — ich möchte bedeutende Einsätze und befriedigende Siege',
        type: 'harvestella',
      },
      {
        en: 'Some dungeon challenge is fun, but I should not lose everything if I faint',
        zh: '地牢有挑战很好，但晕倒后不该失去一切，惩罚要合理',
        zhTW: '地牢有挑戰很好，但昏倒後不該失去一切，懲罰要合理',
        ja: 'ダンジョンの挑戦は楽しい——でも倒れても全部失わないで、ペナルティは穏やかに',
        ko: '던전 도전은 재미있어요, 하지만 쓰러져도 모든 걸 잃으면 안 돼요 — 패널티는 합리적이어야 해요',
        de: 'Etwas Dungeon-Herausforderung macht Spaß, aber ich sollte nicht alles verlieren wenn ich ohnmächtig werde',
        type: 'rf5',
      },
      {
        en: 'Zero pressure please — I want to play at my own pace with no failure states',
        zh: '零压力，按自己的节奏游玩，不存在失败或游戏结束的概念',
        zhTW: '零壓力，按自己的節奏遊玩，不存在失敗或遊戲結束的概念',
        ja: 'プレッシャーゼロ——自分のペースで、失敗状態なしで遊びたい',
        ko: '압박 제로 — 내 속도대로 플레이하고 싶어요, 실패 상태는 없어야 해요',
        de: 'Null Druck bitte — ich möchte in meinem eigenen Tempo spielen, ohne Fehlerzustände',
        type: 'paleo',
      },
      {
        en: 'Gentle seasonal deadlines are fine, but nothing that creates real stress or anxiety',
        zh: '季节性截止日期这种轻度节奏可以接受，但不想有真正的压力或焦虑',
        zhTW: '季節性截止日期這種輕度節奏可以接受，但不想有真正的壓力或焦慮',
        ja: '季節のゆるいデッドラインは構わない——でも本当のストレスや不安は嫌',
        ko: '가벼운 계절적 마감은 괜찮아요, 하지만 진짜 스트레스나 불안은 싫어요',
        de: 'Sanfte saisonale Fristen sind okay, aber nichts was echten Stress oder Angst erzeugt',
        type: 'pot',
      },
    ],
  },
  {
    q_en: 'Which core loop excites you most?',
    q_zh: '哪种核心游戏循环最让你期待？',
    q_zhTW: '哪種核心遊戲循環最讓你期待？',
    q_ja: 'どのコアループが一番ワクワクしますか？',
    q_ko: '어떤 핵심 루프가 가장 설레나요?',
    q_de: 'Welcher Kern-Loop begeistert dich am meisten?',
    options: [
      {
        en: 'Farm by day to gather resources, fight by night to advance the story — both loops feed each other',
        zh: '白天耕作积累资源，推进剧情时挑战战斗，两条线紧密联动互相促进',
        zhTW: '白天耕作積累資源，推進劇情時挑戰戰鬥，兩條線緊密聯動互相促進',
        ja: '昼は農業で資源集め、夜は戦闘でストーリー進行——二つのループが互いに高め合う',
        ko: '낮에는 농사로 자원 모으기, 밤에는 전투로 스토리 진행 — 두 루프가 서로를 강화해요',
        de: 'Tagsüber farmen für Ressourcen, nachts kämpfen um die Geschichte voranzutreiben — beide Loops bedingen sich',
        type: 'harvestella',
      },
      {
        en: 'Freely switch between farming, dungeon-diving, and socializing depending on my mood each day',
        zh: '农场、地牢、社交三线自由切换，今天想做什么就做什么',
        zhTW: '農場、地牢、社交三線自由切換，今天想做什麼就做什麼',
        ja: '農業・ダンジョン・社交を気分で自由に切り替え——今日やりたいことをやる',
        ko: '농장, 던전, 사교를 기분에 따라 자유롭게 전환 — 오늘 하고 싶은 것을 해요',
        de: 'Frei zwischen Farming, Dungeon-Tauchen und Geselligkeit wechseln je nach meiner Stimmung',
        type: 'rf5',
      },
      {
        en: 'Explore the island, discover a new dinosaur species, earn its trust, then expand my ranch',
        zh: '探索岛屿、发现新恐龙品种、慢慢赢得信任，再扩展我的恐龙农场',
        zhTW: '探索島嶼、發現新恐龍品種、慢慢贏得信任，再擴展我的恐龍農場',
        ja: '島を探検して新種の恐竜を発見し、信頼を積み上げてランチを拡大していく',
        ko: '섬 탐험, 새 공룡 종 발견, 신뢰 쌓기, 그리고 목장 확장하기',
        de: 'Die Insel erkunden, eine neue Dinosaurierart entdecken, ihr Vertrauen gewinnen und meine Ranch erweitern',
        type: 'paleo',
      },
      {
        en: 'Clear land, plant crops, restore the town, and feel the satisfaction of watching it all bloom',
        zh: '开荒种地、恢复小镇、装饰农场，看着一切从荒芜变得生机勃勃',
        zhTW: '開荒種地、恢復小鎮、裝飾農場，看著一切從荒蕪變得生機勃勃',
        ja: '土地を切り拓いて作物を植え、町を復興して、すべてが花開く満足感を味わう',
        ko: '땅 개간, 작물 심기, 마을 복원 — 모든 것이 피어나는 것을 보는 만족감',
        de: 'Land roden, Ernten anbauen, die Stadt restaurieren und die Befriedigung sehen wie alles aufblüht',
        type: 'pot',
      },
    ],
  },
]

const RESULTS: Record<
  Pick,
  {
    title_en: string; title_zh: string; title_zhTW: string; title_ja: string; title_ko: string; title_de: string
    emoji: string
    tag_en: string; tag_zh: string; tag_zhTW: string; tag_ja: string; tag_ko: string; tag_de: string
    platform_en: string; platform_zh: string; platform_zhTW: string; platform_ja: string; platform_ko: string; platform_de: string
    why_en: string; why_zh: string; why_zhTW: string; why_ja: string; why_ko: string; why_de: string
    tip_en: string; tip_zh: string; tip_zhTW: string; tip_ja: string; tip_ko: string; tip_de: string
  }
> = {
  harvestella: {
    title_en: 'Harvestella', title_zh: 'Harvestella', title_zhTW: 'Harvestella', title_ja: 'ハーヴェステラ', title_ko: '하베스텔라', title_de: 'Harvestella',
    emoji: '⚔️',
    tag_en: 'The Epic Farmer', tag_zh: '史诗级农耕者', tag_zhTW: '史詩級農耕者', tag_ja: '壮大な農業者', tag_ko: '서사적 농부', tag_de: 'Der epische Bauer',
    platform_en: 'PC · Nintendo Switch', platform_zh: 'PC · Nintendo Switch', platform_zhTW: 'PC · Nintendo Switch', platform_ja: 'PC・Nintendo Switch', platform_ko: 'PC · 닌텐도 스위치', platform_de: 'PC · Nintendo Switch',
    why_en: `Harvestella is what happens when Square Enix — the studio behind Final Fantasy and Dragon Quest — decides to make a farming game. The result is unlike anything else in the genre: a story-driven action RPG where farming is not a backdrop but a central mechanical pillar, directly tied to a world where the seasons themselves are dying. You play as a traveler who wakes with no memory near a small village called Lethe, and quickly discovers that the world is being consumed by Quietus — a deadly particle storm that arrives at each seasonal change and kills anyone caught outside. The farming loop gives you money, crafting materials, and food buffs that directly empower your dungeon performance. In return, dungeon progress unlocks new regions, new crops, and new story revelations. The two loops are genuinely inseparable in a way that most farming-RPG hybrids fail to achieve. The combat is real-time action with four-character parties, each character belonging to a distinct job class — Mage, Fighter, Minstrel, Assault Savant, and more — and you can freely switch between them mid-battle. The story is ambitious by farming game standards: it involves time travel, parallel worlds, and a central mystery about the nature of Quietus that unfolds over a 40-50 hour main campaign.`,
    why_zh: `《Harvestella》是Square Enix（最终幻想、勇者斗恶龙的母公司）决定做农场游戏时的产物，结果和这个类型里的任何作品都截然不同。这是一款剧情驱动的动作RPG，农场不是背景装饰，而是直接与世界观捆绑的核心机制——游戏世界里，季节本身正在消亡。你扮演一名失忆旅者，在一个叫Lethe的小村庄醒来，随即发现世界正被"Quietus"侵蚀——一种在季节交替时降临的致命粒子风暴。农场给你金钱、材料和强化战斗的食物增益；地牢推进则解锁新区域、新作物和新的剧情揭示。两条线深度联动，是大多数农场RPG混合作品难以企及的。战斗是实时动作制，四人小队各属不同职业，可以在战斗中自由切换。主线剧情约40-50小时，涉及时间旅行和平行世界的宏大命题。`,
    why_zhTW: `《Harvestella》是Square Enix決定製作農場遊戲時的產物，結果與同類型遊戲截然不同。這是一款劇情驅動的動作RPG，農場是直接與世界觀捆綁的核心機制——遊戲世界的季節本身正在消亡。你扮演失憶旅者，發現世界正被「Quietus」侵蝕，一種在季節交替時降臨的致命粒子風暴。農場與地牢兩條線深度聯動，戰鬥為四人小隊即時動作制，可自由切換職業。主線約40-50小時，涉及時間旅行與平行世界的宏大命題。`,
    why_ja: `ハーヴェステラはSquare Enixが農業ゲームを手掛けた意欲作で、同ジャンルの他作品とは一線を画す。死にゆく季節という世界観に農業が直結したストーリー駆動のアクションRPG。記憶を失った旅人として目覚め、致命的なQUIETUSという粒子嵐の謎を追う。農業バフがダンジョン戦闘を強化し、ダンジョン進行が新作物と物語を開放する二つのループが密接に絡み合う。4人パーティのリアルタイム戦闘で職業を自由に切り替え可能。メインストーリーは40〜50時間、時間旅行と平行世界が絡む壮大な物語。`,
    why_ko: `하베스텔라는 스퀘어 에닉스(파이널 판타지, 드래곤 퀘스트 제작사)가 만든 농장 게임으로, 동 장르의 다른 작품과 완전히 다릅니다. 계절 자체가 죽어가는 세계관에 농업이 직결된 스토리 중심 액션 RPG예요. 기억을 잃은 여행자로 깨어나 치명적인 Quietus 폭풍의 비밀을 좇습니다. 농장 버프가 던전 전투를 강화하고, 던전 진행이 새 작물과 이야기를 열어줍니다. 4인 파티 실시간 전투에 직업 자유 전환 가능. 메인 스토리 40-50시간, 시간여행과 평행 세계가 얽힌 웅장한 이야기.`,
    why_de: `Harvestella ist das Ergebnis, wenn Square Enix ein Farming-Spiel macht — ein story-getriebenes Action-RPG, bei dem Farming direkt mit dem Weltuntergang verknüpft ist. Die sterbenden Jahreszeiten bedrohen alles Leben. Als amnesiereisender wachst du auf und entdeckst Quietus, einen tödlichen Partikelsturm. Farming-Buffs stärken Dungeon-Kämpfe, Dungeon-Fortschritt öffnet neue Crops und Lore. Beide Loops sind untrennbar verbunden. Echtzeitkampf mit 4-Personen-Truppen und freiem Jobklassen-Wechsel. Hauptkampagne 40-50 Stunden, Zeitreisen und Parallelwelten inklusive.`,
    tip_en: `Do not neglect your farm in the early game — food buffs from home-grown ingredients directly affect your dungeon performance. Prioritize planting crops that produce materials for combat recipes you use most. The Quietus days (between seasons) are forced rest periods — use them to reorganize storage and plan next week's crops. For job classes, unlock Mage and Assault Savant as early as possible; they cover the most ground in mid-game dungeons.`,
    tip_zh: `早期不要忽视农场——用自种食材烹饪的料理直接影响战斗中的伤害输出和资源恢复。优先种植能产出常用战斗料理食材的作物。Quietus日（季节交替的强制休息日）用来整理仓库和规划下周作物，不要把它当作"损失的时间"。职业解锁方面，尽早解锁法师和突击精通者，它们覆盖中期地牢混战中最广泛的战斗场景。`,
    tip_zhTW: `早期不要忽視農場——自種食材烹飪的料理直接影響戰鬥表現。優先種植常用戰鬥料理的食材作物。Quietus日是強制休息日，用來整理倉庫和規劃作物。職業方面，盡早解鎖法師和突擊精通者，覆蓋中期地牢最廣泛的戰鬥場景。`,
    tip_ja: `序盤に農業を疎かにしないで——自家製食材の料理バフが直接ダンジョン性能に影響する。よく使う戦闘レシピの素材が取れる作物を優先して植えよう。Quietusの日は強制休息日——倉庫整理と来週の作物計画に使おう。職業はメイジとアサルトサヴァントをできるだけ早く解放するのがおすすめ。`,
    tip_ko: `초반에 농장을 소홀히 하지 마세요 — 집에서 기른 재료로 만든 요리 버프가 던전 전투에 직접 영향을 줍니다. 자주 쓰는 전투 레시피 재료를 생산하는 작물을 우선 심으세요. Quietus의 날(강제 휴식일)에는 창고 정리와 다음 주 작물 계획을 세우세요. 직업은 마법사와 어설트 사반트를 최대한 일찍 해금하세요.`,
    tip_de: `Vernachlässige deine Farm in der Früh-Phase nicht — Essensbuffs aus selbst angebauten Zutaten beeinflussen direkt deine Dungeon-Leistung. Priorisiere Pflanzen für deine meistgenutzten Kampfrezepte. Quietus-Tage sind erzwungene Ruhetage — nutze sie für Lagerverwaltung und Anbauplanung. Schalte Magier und Angriffssachkundiger so früh wie möglich frei.`,
  },
  rf5: {
    title_en: 'Rune Factory 5', title_zh: '符文工房5', title_zhTW: '符文工房5', title_ja: 'ルーンファクトリー5', title_ko: '룬 팩토리 5', title_de: 'Rune Factory 5',
    emoji: '🗡️',
    tag_en: 'The Action Farmer', tag_zh: '动作农耕探险家', tag_zhTW: '動作農耕探險家', tag_ja: 'アクション農耕冒険家', tag_ko: '액션 농부 모험가', tag_de: 'Der Action-Farmer',
    platform_en: 'PC · Nintendo Switch', platform_zh: 'PC · Nintendo Switch', platform_zhTW: 'PC · Nintendo Switch', platform_ja: 'PC・Nintendo Switch', platform_ko: 'PC · 닌텐도 스위치', platform_de: 'PC · Nintendo Switch',
    why_en: `Rune Factory 5 is the fullest realization of the franchise's core promise: a farming life simulation where you can also be an adventurer, a dungeon-crawler, and a romantic lead — and where none of these roles feels tacked on. You play as a SEED ranger who washes up on the island town of Rigbarth with amnesia, gradually rebuilding your life through farming, monster taming, town quests, and dungeon exploration. The farming uses runes (magic energy), making cultivation itself a form of magic. Monsters you befriend can become farm helpers. The dungeon content is substantial — multi-floor dungeons with real boss encounters, crafted weapons, and meaningful progression. The romance system is among the best in the genre: 12 romanceable characters, fully voiced story arcs, and same-sex marriage. The game runs 60-80 hours and is almost too generous with content.`,
    why_zh: `《符文工房5》是这个系列核心承诺的最完整实现：一款你可以同时扮演农夫、冒险者、地牢探索者和恋爱主角的农场生活模拟游戏，而且每个角色都不显得多余。你扮演失忆的SEED骑士，来到小镇Rigbarth重建生活，通过农耕、驯服怪物、镇子委托和地牢探索逐步成长。RF5的农耕使用符文能量（魔法力），农作本身就是一种魔法培育，独具特色。驯服的怪物可以带回家当农场助手，满足养成爱好者的需求。地牢内容丰富扎实，有真实的Boss战和完整的装备锻造循环。恋爱系统是类型中的佼佼者：12位可恋爱角色，全部有完整配音故事线，支持同性婚姻。通关约60-80小时，内容几乎过于丰富——永远有事可做、有人可聊、有东西可种。`,
    why_zhTW: `《符文工房5》是系列核心承諾的最完整實現：同時扮演農夫、冒險者、地牢探索者和戀愛主角，每個角色都渾然天成。農耕使用符文能量，農作本身就是魔法培育。馴服的怪物可成為農場助手。地牢內容豐富扎實，有真實Boss戰和裝備鍛造循環。戀愛系統出色：12位可戀愛角色，完整配音，支持同性婚姻。通關約60-80小時，內容近乎過於豐富。`,
    why_ja: `ルーンファクトリー5はシリーズの約束を最も完全に実現した作品：農業・冒険・ダンジョン・恋愛を同時に楽しめ、どれも取ってつけたように感じない。符文（魔法エネルギー）を使う農業はそれ自体が魔法的な営み。仲良くなったモンスターが農場を手伝ってくれる。ダンジョンは本格的なボス戦と装備製造ループが充実。恋愛システムは同ジャンル最高レベル：12人のロマンス候補、フルボイス、同性婚あり。プレイ時間60〜80時間、コンテンツが豊富すぎるほど。`,
    why_ko: `룬 팩토리 5는 시리즈의 핵심 약속을 가장 완전하게 구현한 작품입니다: 농부, 모험가, 던전 탐험가, 연애 주인공을 동시에 즐길 수 있어요. 룬(마법 에너지)을 사용하는 농업은 그 자체가 마법적인 영농이에요. 친해진 몬스터가 농장을 도와줍니다. 던전은 진짜 보스전과 장비 제작 루프가 충실해요. 연애 시스템은 장르 최고 수준: 12명의 로맨스 상대, 풀 보이스, 동성 결혼 지원. 플레이타임 60-80시간, 콘텐츠가 너무 풍부할 정도.`,
    why_de: `Rune Factory 5 ist die vollständigste Realisierung des Franchise-Versprechens: gleichzeitig Bauer, Abenteurer, Dungeon-Crawler und romantischer Hauptcharakter — und keine dieser Rollen fühlt sich aufgesetzt an. Farming nutzt Runen (magische Energie). Befreundete Monster helfen auf der Farm. Dungeons bieten echte Bosskämpfe und Ausrüstungsherstellung. Das Romantiksystem gehört zu den besten im Genre: 12 romanzierbare Charaktere, vollständig vertont, gleichgeschlechtliche Ehe. 60-80 Stunden Spielzeit, fast zu viel Inhalt.`,
    tip_en: `The most important early decision is which crops to prioritize — flowers sell well and are needed for medicine crafting, while vegetables level up farming skill fastest. Talk to every villager every day in the first month: friendship gifts accumulate. For dungeons, craft one strong weapon before each new floor set rather than scattering resources. Do not sleep past 6am: morning hours are when monster farm helpers work best.`,
    tip_zh: `早期最重要的决策是优先种哪类作物——花卉售价高且用于制药，蔬菜则更有助于快速提升农耕技能等级。第一个月每天和每位村民说话：友好度在积累，很多村民到达特定友好度后会赠送种子、食谱或材料。地牢效率方面，与其把资源分散到多件装备，不如专注打造一件强力武器进入每个新地牢区域。最后：不要睡过早上6点，早晨时段是怪物朋友在农场工作效率最高的时间。`,
    tip_zhTW: `早期優先種哪類作物很關鍵——花卉售價高且用於製藥，蔬菜提升農耕技能最快。第一個月每天和每位村民說話累積友好度，達標後會收到禮物。地牢方面集中打造一件強力武器，勝過分散資源。不要睡過早上6點，那是怪物農場助手效率最高的時段。`,
    tip_ja: `序盤は何の作物を優先するかが重要——花は高値で薬の材料、野菜は農業スキルを最速で上げる。1ヶ月目は毎日全村人に話しかけよう：友好度が蓄積してギフトをもらえるようになる。ダンジョンでは資源を分散させず一本の強い武器を作ってから入ろう。朝6時より早く起きること：モンスターの農場助手が最も働く時間帯。`,
    tip_ko: `초반에 어떤 작물을 우선할지가 중요해요 — 꽃은 비싸게 팔리고 약 제작에 필요하며, 채소는 농업 스킬을 가장 빨리 올려줍니다. 첫 달에 매일 모든 주민과 대화하세요 — 우호도가 쌓이면 씨앗, 레시피, 재료를 선물 받아요. 던전에서는 자원을 분산하지 말고 강한 무기 하나에 집중하세요. 아침 6시 전에 일어나세요 — 몬스터 농장 도우미가 가장 열심히 일하는 시간이에요.`,
    tip_de: `Die wichtigste frühe Entscheidung ist welche Pflanzen du priorisierst — Blumen verkaufen sich gut und werden für Medizin benötigt, Gemüse leveln den Farming-Skill am schnellsten. Sprich im ersten Monat täglich mit jedem Dorfbewohner. Im Dungeon: konzentriere Ressourcen auf eine starke Waffe statt viele schwache. Schlaf nicht nach 6 Uhr morgens: das ist die Zeit wo Monster-Farmhelfer am besten arbeiten.`,
  },
  paleo: {
    title_en: 'Paleo Pines', title_zh: 'Paleo Pines', title_zhTW: 'Paleo Pines', title_ja: 'ペイリオパインズ', title_ko: '팔레오 파인즈', title_de: 'Paleo Pines',
    emoji: '🦕',
    tag_en: 'The Dino Rancher', tag_zh: '恐龙牧场主', tag_zhTW: '恐龍牧場主', tag_ja: '恐竜ランチャー', tag_ko: '공룡 목장주', tag_de: 'Der Dino-Rancher',
    platform_en: 'PC · PS4/5 · Xbox · Switch', platform_zh: 'PC · PS4/5 · Xbox · Switch', platform_zhTW: 'PC · PS4/5 · Xbox · Switch', platform_ja: 'PC・PS4/5・Xbox・Switch', platform_ko: 'PC · PS4/5 · Xbox · 스위치', platform_de: 'PC · PS4/5 · Xbox · Switch',
    why_en: `Paleo Pines is the farming game for players who grew up wanting a dinosaur ranch instead of a sheep farm. Set on a colorful island where dinosaurs roam freely alongside humans in peaceful coexistence, you play as Lucky — a young rancher who arrives with her companion dino Era to restore her family's legendary ranch. Instead of tending soil, your primary goal is finding wild dinosaurs, earning their trust through a musical flute-based friendship mechanic, and building enclosures matching each species' specific habitat needs. Once befriended, dinosaurs become ranch workers who help you farm and gather resources. The game has no combat whatsoever. The town of Pebble Plaza serves as a social hub. Paleo Pines shines for players wanting a supremely low-pressure creative sandbox of dinosaur enclosure design and prehistoric ranch management.`,
    why_zh: `《Paleo Pines》是为那些从小就想要一个恐龙农场而不是羊圈的玩家而生的农场游戏。游戏设定在一座恐龙与人类和平共处的彩色岛屿上，你扮演年轻牧场主Lucky，带着伙伴恐龙Era回到家族传奇牧场，让它重焕生机。核心循环与大多数农场模拟器截然不同：你的主要目标不是耕种土地，而是寻找野生恐龙、通过长笛音乐驯服机制赢得它们的信任、建造符合各物种特定栖息需求的围栏。一旦驯服，恐龙就成为农场助手，帮助耕种、采集资源，最终实现繁殖。游戏完全没有战斗——没有武器、没有战斗、没有失败状态。如果你曾想在一个把"恐龙饲养员"视为正常职业的世界里大展身手，这就是你要找的游戏。`,
    why_zhTW: `《Paleo Pines》是為從小就想要恐龍農場的玩家而生的遊戲。在恐龍與人類和平共處的彩色島嶼上，你扮演年輕牧場主Lucky，用長笛音樂驯服機制贏得野生恐龍的信任，建造符合各物種棲息需求的圍欄。馴服後的恐龍成為農場助手。完全無戰鬥，零失敗狀態，是最純粹的低壓力創意沙盒體驗。`,
    why_ja: `ペイリオパインズは羊の牧場ではなく恐竜ランチを夢見た人のための農業ゲーム。カラフルな島で恐竜と人間が共存する世界で、若いランチャーLuckyとして伝説の牧場を再興する。目標は土を耕すことではなく、野生の恐竜を見つけてフルートの友好メカニックで信頼を勝ち取り、各種に合った囲いを作ること。仲良くなった恐竜が農場を手伝ってくれる。戦闘は一切なし、ゼロプレッシャーのクリエイティブサンドボックス。`,
    why_ko: `팔레오 파인즈는 양 목장 대신 공룡 목장을 꿈꿨던 플레이어를 위한 농장 게임이에요. 공룡과 인간이 공존하는 화려한 섬에서 젊은 목장주 Lucky로서 전설적인 가족 목장을 복원합니다. 땅을 경작하는 대신 야생 공룡을 찾아 플루트 음악 친화 메카닉으로 신뢰를 얻고, 각 종에 맞는 서식지 울타리를 짓는 것이 목표예요. 친해진 공룡은 농장 도우미가 됩니다. 전투 없음, 압박 없음, 창의적 샌드박스.`,
    why_de: `Paleo Pines ist das Farming-Spiel für Spieler die aufgewachsen sind und eine Dinosaurier-Ranch wollten statt einer Schaffarm. Auf einer bunten Insel wo Dinosaurier friedlich neben Menschen leben spielst du Lucky, die ihre legendäre Familienranch restauriert. Statt Ackerbau: wilde Dinosaurier finden, durch Flöten-Freundschafts-Mechanik ihr Vertrauen gewinnen, und Gehege bauen die deren Habitatbedürfnissen entsprechen. Kein Kampf, kein Druck, eine kreative Sandbox für Dinosaurier-Design.`,
    tip_en: `The flute mechanic is the heart of Paleo Pines — practice matching each dinosaur's melody before befriending it, because a failed attempt resets comfort level. Pay close attention to habitat requirements before building each enclosure: a rainforest species in a desert biome will be unhappy. Start with the gentler Grazer types, which are more forgiving and help with farming most directly. Keep at least one plot of each crop type growing to efficiently fulfill town requests.`,
    tip_zh: `长笛驯服机制是游戏的核心——在尝试驯服之前，先练习复现每只恐龙奏给你听的旋律，因为失败一次会重置恐龙的舒适度。建造围栏前仔细查看每种恐龙的栖息地需求：把雨林物种放在沙漠生态里会让它不开心、工作效率大降。早期优先驯服Grazer类型（食草恐龙），它们要求最宽松且对农场帮助最直接；有严格群体要求的Pack类（肉食恐龙）留到后期。同时保持每种作物都有在种植，方便高效完成镇民委托。`,
    tip_zhTW: `長笛馴服機制是核心——嘗試前先練習複現恐龍的旋律，失敗會重置舒適度。建造圍欄前仔細查看棲息地需求。先馴服Grazer類食草恐龍，要求最寬鬆且對農場幫助最大；Pack類肉食恐龍留到後期。保持每種作物都在種植，方便完成鎮民委託。`,
    tip_ja: `フルートメカニックが核心——挑戦前に各恐竜のメロディを練習して、失敗すると快適度がリセットされる。囲い建設前に各恐竜の生息地要件をよく確認しよう。まず要件が緩いグレイザータイプ（草食）から始めてるのがおすすめ。パックタイプ（肉食）は後回しに。全種類の作物を常に育てておくと町のリクエストをこなしやすい。`,
    tip_ko: `플루트 메카닉이 핵심입니다 — 각 공룡의 멜로디를 연습한 후 친화를 시도하세요. 실패하면 편안도가 초기화돼요. 울타리 건설 전 서식지 요건을 꼭 확인하세요. 요건이 가장 관대하고 농장에 바로 도움이 되는 그레이저 타입(초식)부터 시작하세요. 팩 타입(육식)은 나중에. 모든 종류의 작물을 항상 재배해 마을 요청을 효율적으로 처리하세요.`,
    tip_de: `Die Flöten-Mechanik ist das Herz von Paleo Pines — übe die Melodie jedes Dinosauriers bevor du die Freundschaft versuchst, ein Fehlschlag setzt den Komfortlevel zurück. Überprüfe sorgfältig die Habitatanforderungen vor dem Gehäudebau. Beginne mit den Grazer-Typen (Pflanzenfresser) die nachsichtiger sind. Pack-Typen für später aufheben. Halte mindestens ein Feld jeder Ernte-Art um Dorfbewohner-Anfragen effizient zu erfüllen.`,
  },
  pot: {
    title_en: 'Story of Seasons: Pioneers of Olive Town', title_zh: '牧场物语：橄榄镇与希望的大地', title_zhTW: '牧場物語：橄欖鎮與希望的大地', title_ja: 'Story of Seasons: Pioneers of Olive Town', title_ko: '목장 이야기: 올리브 타운과 희망의 대지', title_de: 'Story of Seasons: Pioneers of Olive Town',
    emoji: '🫒',
    tag_en: 'The Town Restorer', tag_zh: '小镇复兴者', tag_zhTW: '小鎮復興者', tag_ja: '町の再生者', tag_ko: '마을 복원자', tag_de: 'Der Stadtrestaurator',
    platform_en: 'PC · Nintendo Switch', platform_zh: 'PC · Nintendo Switch', platform_zhTW: 'PC · Nintendo Switch', platform_ja: 'PC・Nintendo Switch', platform_ko: 'PC · 닌텐도 스위치', platform_de: 'PC · Nintendo Switch',
    why_en: `Story of Seasons: Pioneers of Olive Town delivers the clearest, most focused version of the classic Harvest Moon fantasy: you inherit overgrown wilderness and transform it, season by season, into a thriving farm that breathes life into a quiet coastal town. The land transformation system is the game's signature feature: your starting area is wild forest and marshland, and you must physically clear every tree, rock, and log to expand. This creates a deeply satisfying sense of ownership that pre-cleared farming games cannot replicate. The Museum system rewards exploration — donating items unlocks permanent bonuses. The romance system covers six male and six female candidates, meaningful without the commitment Rune Factory demands. For players who love Stardew Valley primarily for its farming and town-building, this is the purest expression of that feeling.`,
    why_zh: `《牧场物语：橄榄镇与希望的大地》呈现了经典牧场物语幻想最清晰、最专注的版本：你继承一片荒芜土地，季复一季地将它变成让安静海滨小镇焕发生机的繁茂农场。游戏的标志性功能是土地开垦系统——起点是一片野生森林和沼泽地，你需要亲手清除每一棵树、每一块石头来扩展农场版图，这种所有权感和进步感是那些已预先清空土地的农场游戏难以复制的。博物馆系统奖励探索多样性，捐献发现的物品可解锁永久奖励并为橄榄镇带来新设施。恋爱系统涵盖六男六女，深度适中。对于主要为农场和建设而非战斗玩星露谷的玩家，这款游戏是同一种满足感的最纯粹表达。`,
    why_zhTW: `《牧場物語：橄欖鎮與希望的大地》呈現了經典牧場物語幻想最清晰的版本。標誌性的土地開墾系統：起點是野生森林和沼澤地，你需要親手清除每棵樹、每塊石頭來擴展農場，這種所有權感難以複製。博物館系統獎勵探索，捐獻物品解鎖永久獎勵。戀愛系統六男六女，深度適中。對於主要為農場和建設而玩星露谷的玩家，這是最純粹的表達。`,
    why_ja: `Story of Seasons: Pioneers of Olive Townはクラシックな牧場物語ファンタジーの最も明確な表現——荒れ地を引き継ぎ、季節ごとに静かな海辺の町に活力をもたらす農場へと変えていく。特徴的な土地開墾システム：森や沼地から木・石を自分で切り開いて農場を拡張する、この所有感はあらかじめ整備された農業ゲームには真似できない。博物館に発見物を寄付すると永続ボーナスが解放される。恋愛システムは男女各6人で程よい深さ。農業と街づくりでスターデューバレーを楽しむプレイヤーに最も純粋な満足感を届ける。`,
    why_ko: `목장 이야기: 올리브 타운은 클래식 수확의 계절 판타지의 가장 명확한 표현입니다. 황폐한 땅을 물려받아 계절마다 조용한 해안 마을에 활기를 불어넣는 농장으로 변환시켜요. 특징적인 토지 개간 시스템: 숲과 늪지에서 나무와 돌을 직접 제거해 농장을 확장하는 이 소유감은 미리 정비된 농장 게임이 복제할 수 없어요. 박물관에 발견품을 기증하면 영구 보너스가 해금됩니다. 연애 시스템은 남녀 각 6명으로 적절한 깊이. 농업과 마을 건설로 스타듀 밸리를 즐기는 플레이어에게 가장 순수한 표현이에요.`,
    why_de: `Story of Seasons: Pioneers of Olive Town liefert die klarste Version des klassischen Harvest-Moon-Traums: du erbst verwildertes Land und verwandelst es Jahreszeit für Jahreszeit in eine florierende Farm. Das Markenzeichen: ein Landumwandlungssystem wo du jede Wildnis selbst rodet — dieses Eigentumsgefühl können vorgeklärte Farming-Spiele nicht replizieren. Das Museum belohnt Entdeckungen mit permanenten Boni. Das Romantiksystem bietet sechs männliche und sechs weibliche Kandidaten in angemessener Tiefe. Für Spieler die Stardew Valley primär wegen Farming und Stadtentwicklung lieben, ist dies der reinste Ausdruck dieses Gefühls.`,
    tip_en: `The most common mistake is expanding your farm area too quickly before having tools and energy to maintain it. Clear land in manageable chunks: open a new section once the previous one is fully planted and organized. Prioritize upgrading your watering can as early as possible — the default can wastes enormous energy on any large field. The Sprite Shop offers the most cost-effective shortcuts in the game; unlocking it early reduces early-game grinding. The Museum is worth completing: full set bonuses compound significantly by mid-game.`,
    tip_zh: `最常见的新手错误是在没有足够工具和体力维护的情况下过快扩张农场面积——等上一块土地全部种满、整理妥当后再开垦新区域。尽早升级洒水壶是首要任务，默认洒水壶在任何稍大的农场上都会消耗巨量体力。精灵商店（探索中发现足够多精灵后解锁）提供游戏中性价比最高的作物和动物捷径，早期解锁能大幅减少前期的重复劳动。博物馆值得完成：全套捐赠的奖励加成到中期会产生显著的复利效果。`,
    tip_zhTW: `最常見的新手錯誤是過快擴張農場——等上一塊土地全部種滿再開墾新區域。盡早升級灑水壺是首要任務。精靈商店（探索解鎖）提供最高性價比的捷徑，早期解鎖大幅減少重複勞動。博物館值得完成：全套捐贈的獎勵加成到中期效果顯著。`,
    tip_ja: `最もよくある間違いは維持できるツールと体力なしに農場を急速に広げること——前のエリアが全部植えられてから次を開墾しよう。じょうろをできるだけ早くアップグレードするのが最優先：デフォルトのじょうろは広い畑で体力を大量消費する。スプライトショップ（探索で解放）が最高コスパのショートカット。博物館はコンプリートする価値あり：フルセット寄付ボーナスは中盤に大きく効いてくる。`,
    tip_ko: `가장 흔한 실수는 유지할 도구와 체력 없이 농장을 너무 빨리 확장하는 것이에요 — 이전 구역이 다 심어지고 정리된 후에 새 구역을 개간하세요. 물뿌리개를 최대한 일찍 업그레이드하는 것이 최우선이에요. 요정 상점(탐험으로 해금)이 가장 비용 효율적인 지름길을 제공해요. 박물관은 완성할 가치가 있어요: 전체 세트 기부 보너스가 중반에 크게 복리로 작용해요.`,
    tip_de: `Der häufigste Fehler ist die Farm zu schnell zu erweitern bevor du Werkzeuge und Energie hast sie zu pflegen — räume erst eine Sektion komplett ein bevor du die nächste öffnest. Giesskanne so früh wie möglich upgraden: die Standard-Kanne verschwendet enorm Energie. Der Sprite-Shop bietet die kosteneffektivsten Abkürzungen; früh freischalten reduziert Grinding. Das Museum lohnt sich zu vervollständigen: volle Set-Boni akkumulieren sich bis Mitte-Spiel erheblich.`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { harvestella: 0, rf5: 0, paleo: 0, pot: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function FarmingRPGAdventureQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Pick[]>([])
  const [result, setResult] = useState<Pick | null>(null)

  const handleAnswer = (type: Pick) => {
    const next = [...answers, type]
    if (current + 1 < QUESTIONS.length) {
      setAnswers(next)
      setCurrent(current + 1)
    } else {
      setResult(calcResult(next))
    }
  }

  const reset = () => {
    setCurrent(0)
    setAnswers([])
    setResult(null)
  }

  const q = QUESTIONS[current]

  if (result) {
    const r = RESULTS[result]
    const title = getLoc(r.title_zh, r.title_en, r.title_zhTW, r.title_ja, r.title_ko, r.title_de)
    const url = `${BASE_URL}/${locale}/quizzes/farming-rpg-adventure-quiz`
    const shareText = getLoc(
      `我的农场RPG推荐是《${title}》！${r.emoji} 来测测你适合哪款？${url}`,
      `My farming RPG match is ${title}! ${r.emoji} Which one are you? ${url}`,
      `我的農場RPG推薦是《${title}》！${r.emoji} 來測測你適合哪款？${url}`,
      `農場RPGの結果は「${title}」！${r.emoji} あなたも試して：${url}`,
      `내 농장 RPG 추천은 《${title}》！${r.emoji} 당신은？${url}`,
      `Mein Farming-RPG-Match ist ${title}! ${r.emoji} Was ist deins? ${url}`
    )

    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{r.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">{getLoc(r.tag_zh, r.tag_en, r.tag_zhTW, r.tag_ja, r.tag_ko, r.tag_de)}</p>
          <h2 className="mb-2 text-2xl font-bold text-[#f0a832]">{title}</h2>
          <p className="text-sm text-[#8a9a7a]">{getLoc(r.platform_zh, r.platform_en, r.platform_zhTW, r.platform_ja, r.platform_ko, r.platform_de)}</p>
        </div>

        <div className="mb-6 rounded-xl bg-[#1a2e1a]/60 p-5 text-[#e8dcc8]">
          <p className="mb-4 leading-relaxed">{getLoc(r.why_zh, r.why_en, r.why_zhTW, r.why_ja, r.why_ko, r.why_de)}</p>
          <div className="border-t border-[#2d3d2d] pt-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {getLoc('游玩建议', 'Pro Tip', '遊玩建議', 'プロのヒント', '플레이 팁', 'Profi-Tipp')}
            </p>
            <p className="text-sm leading-relaxed text-[#c8bca8]">{getLoc(r.tip_zh, r.tip_en, r.tip_zhTW, r.tip_ja, r.tip_ko, r.tip_de)}</p>
          </div>
        </div>

        <div className="mb-6">
          <ShareButton text={shareText} locale={locale} />
        </div>

        <button
          onClick={reset}
          className="w-full rounded-xl border border-[#2d3d2d] py-2.5 text-sm text-[#8a9a7a] transition-colors hover:border-[#4d5d4d] hover:text-[#e8dcc8]"
        >
          {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やる', '다시 테스트하기', 'Nochmal machen')}
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs text-[#8a9a7a]">
          <span>
            {getLoc(
              `第 ${current + 1} / ${QUESTIONS.length} 题`,
              `Question ${current + 1} of ${QUESTIONS.length}`,
              `第 ${current + 1} / ${QUESTIONS.length} 題`,
              `${current + 1} / ${QUESTIONS.length} 問`,
              `${current + 1} / ${QUESTIONS.length} 번`,
              `Frage ${current + 1} von ${QUESTIONS.length}`
            )}
          </span>
          <div className="flex gap-1">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i < current ? 'bg-[#f0a832]' : i === current ? 'bg-[#f0a832]/60' : 'bg-[#2d3d2d]'
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-[#e8dcc8]">
          {getLoc(q.q_zh, q.q_en, q.q_zhTW, q.q_ja, q.q_ko, q.q_de)}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.type)}
            className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 px-4 py-3 text-left text-sm text-[#e8dcc8] transition-all hover:border-[#f0a832]/40 hover:bg-[#1a2e1a] hover:text-[#f0a832]"
          >
            {getLoc(opt.zh, opt.en, opt.zhTW, opt.ja, opt.ko, opt.de)}
          </button>
        ))}
      </div>
    </div>
  )
}
