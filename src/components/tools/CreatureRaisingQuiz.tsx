'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'slime' | 'sanctuary' | 'dqm' | 'temtem'

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
    q_en: 'How do you most want to interact with your creatures?',
    q_zh: '你最想以哪种方式与你的生物互动？',
    q_zhTW: '你最想以哪種方式與你的生物互動？',
    q_ja: '生き物とのどんな関わり方が一番楽しいですか？',
    q_ko: '생물과 가장 하고 싶은 상호작용 방식은 무엇인가요?',
    q_de: 'Wie möchtest du am liebsten mit deinen Kreaturen interagieren?',
    options: [
      {
        en: 'Ranching and caretaking — collect different types, build habitats that suit their needs, watch them multiply, and manage a thriving ecosystem',
        zh: '牧场管理和照料——收集不同类型、建造适合它们需求的栖息地、看着它们繁殖，管理一个蓬勃发展的生态系统',
        zhTW: '牧場管理和照料——收集不同類型、建造適合它們需求的棲息地、看著它們繁殖，管理一個蓬勃發展的生態系統',
        ja: '牧場の管理とお世話——いろんな種類を集めて、それぞれのニーズに合った生息地を作り、増やして、賑やかなエコシステムを育てる',
        ko: '목장 관리와 돌봄 — 다양한 종류를 수집하고, 그에 맞는 서식지를 만들고, 번식시키며 생태계를 키워나가기',
        de: 'Ranching und Pflege — verschiedene Typen sammeln, passende Lebensräume bauen, sie vermehren und ein blühendes Ökosystem verwalten',
        type: 'slime',
      },
      {
        en: 'Strategic allying — form a team of three monsters whose abilities chain together and complement each other in intelligent, tactical battles',
        zh: '战略同盟——组建三只怪物的队伍，它们的能力在智能、战术战斗中相互配合和补充',
        zhTW: '戰略同盟——組建三隻怪物的隊伍，它們的能力在智能、戰術戰鬥中相互配合和補充',
        ja: '戦略的な連携——3体のモンスターでチームを組んで、それぞれの能力を組み合わせて頭を使った戦術バトルを楽しむ',
        ko: '전략적 동맹 — 세 마리 몬스터로 팀을 구성해 능력이 서로 연계되는 전술적 배틀을 즐기기',
        de: 'Strategische Allianzen — ein Team aus drei Monstern bilden, deren Fähigkeiten sich in taktischen Kämpfen ergänzen',
        type: 'sanctuary',
      },
      {
        en: 'Collecting and synthesizing — catch hundreds of species, then fuse monsters across generations to create hybrid creatures with inherited abilities',
        zh: '收集和合成——捕获数百种物种，然后跨代合成怪物，创造拥有遗传能力的混合生物',
        zhTW: '收集和合成——捕獲數百種物種，然後跨代合成怪物，創造擁有遺傳能力的混合生物',
        ja: '収集と合成——何百種類ものモンスターを捕まえて、世代をまたいで合体させ、技を受け継いだ強いモンスターを作り上げる',
        ko: '수집과 합성 — 수백 종의 종을 포획하고 세대를 넘어 합성해 유전 능력을 가진 새로운 생물 만들기',
        de: 'Sammeln und Synthetisieren — hunderte Arten fangen, dann Monster generationsübergreifend fusionieren und Hybridwesen mit vererbten Fähigkeiten erschaffen',
        type: 'dqm',
      },
      {
        en: 'Training and competing — raise a team to challenge other players online, mastering type matchups and move synergies through real competition',
        zh: '训练和竞争——培养一个队伍在线挑战其他玩家，通过真实竞争掌握属性克制和技能协同',
        zhTW: '訓練和競爭——培養一個隊伍在線挑戰其他玩家，通過真實競爭掌握屬性克制和技能協同',
        ja: '育成と対戦——チームを鍛えてオンラインで他のプレイヤーと戦い、タイプ相性や技の連携を実戦で身につける',
        ko: '훈련과 경쟁 — 팀을 키워 온라인에서 다른 플레이어에게 도전하고 타입 상성과 기술 시너지를 익히기',
        de: 'Training und Wettkampf — ein Team aufziehen, andere Spieler online herausfordern und Typ-Matchups sowie Zug-Synergien durch echte Kämpfe meistern',
        type: 'temtem',
      },
    ],
  },
  {
    q_en: 'How important is combat to your ideal experience?',
    q_zh: '战斗对你理想体验有多重要？',
    q_zhTW: '戰鬥對你理想體驗有多重要？',
    q_ja: 'あなたの理想の体験において、バトルはどれくらい重要ですか？',
    q_ko: '전투는 당신의 이상적인 플레이 경험에 얼마나 중요한가요?',
    q_de: 'Wie wichtig ist Kämpfen für deine ideale Spielerfahrung?',
    options: [
      {
        en: 'Not important at all — I want to manage my creatures and explore without any combat pressure',
        zh: '完全不重要——我想管理我的生物并探索，没有任何战斗压力',
        zhTW: '完全不重要——我想管理我的生物並探索，沒有任何戰鬥壓力',
        ja: 'まったく重要じゃない——戦闘のプレッシャーなしに、生き物を管理して探索したい',
        ko: '전혀 중요하지 않음 — 전투 압박 없이 생물을 관리하고 탐험하고 싶어요',
        de: 'Überhaupt nicht wichtig — ich möchte meine Kreaturen verwalten und erkunden, ohne Kampfdruck',
        type: 'slime',
      },
      {
        en: 'Central and satisfying — team-based tactical battles where positioning and ability synergy decide the outcome',
        zh: '核心且令人满足——队伍战术战斗，阵型和能力协同决定结果',
        zhTW: '核心且令人滿足——隊伍戰術戰鬥，陣型和能力協同決定結果',
        ja: '中心的でやりごたえがある——陣形と能力の相乗効果が結果を決めるチーム戦術バトル',
        ko: '핵심이자 만족스러운 요소 — 포지셔닝과 능력 시너지가 승패를 결정하는 팀 전술 배틀',
        de: 'Zentral und befriedigend — teambasierte Taktikkämpfe, bei denen Positionierung und Fähigkeitssynergien das Ergebnis bestimmen',
        type: 'sanctuary',
      },
      {
        en: 'Important but strategic — I want to build a lineage of monsters specifically designed to overcome tough boss encounters',
        zh: '重要但战略性——我想建立一个专门设计来克服艰难 Boss 遭遇的怪物血脉',
        zhTW: '重要但戰略性——我想建立一個專門設計來克服艱難 Boss 遭遇的怪物血脈',
        ja: '重要だけど戦略的——強いボスを倒すために特化したモンスターの血統を作り上げたい',
        ko: '중요하지만 전략적 — 강한 보스를 클리어하기 위해 특화 설계된 몬스터 혈통 만들기',
        de: 'Wichtig, aber strategisch — ich möchte eine Monsterlinie gezielt aufbauen, um schwere Boss-Kämpfe zu meistern',
        type: 'dqm',
      },
      {
        en: 'The main event — I want to become skilled enough to compete online and measure myself against other dedicated players',
        zh: '主要内容——我想变得足够熟练以在线竞争，并与其他专注玩家比较',
        zhTW: '主要內容——我想變得足夠熟練以在線競爭，並與其他專注玩家比較',
        ja: 'メインコンテンツ——オンラインで戦えるくらい上手くなって、他の本気プレイヤーと腕を競いたい',
        ko: '주요 콘텐츠 — 온라인 경쟁에 참여할 수 있을 만큼 숙련되어 다른 전문 플레이어와 겨루기',
        de: 'Das Hauptereignis — ich möchte gut genug werden, um online zu spielen und mich mit anderen engagierten Spielern zu messen',
        type: 'temtem',
      },
    ],
  },
  {
    q_en: 'What kind of world do you want to explore with your creatures?',
    q_zh: '你想带着你的生物探索哪种类型的世界？',
    q_zhTW: '你想帶著你的生物探索哪種類型的世界？',
    q_ja: '生き物と一緒にどんな世界を冒険したいですか？',
    q_ko: '생물과 함께 어떤 세계를 탐험하고 싶나요?',
    q_de: 'Welche Art von Welt möchtest du mit deinen Kreaturen erkunden?',
    options: [
      {
        en: 'A vibrant alien island with distinct biomes — each zone has its own slime types, hazards, and resources to discover',
        zh: '一个充满活力的外星岛屿，有不同的生态区域——每个地带都有自己的史莱姆类型、危险和资源可供发现',
        zhTW: '一個充滿活力的外星島嶼，有不同的生態區域——每個地帶都有自己的史萊姆類型、危險和資源可供發現',
        ja: '生き生きした異星の島、個性豊かなバイオームがあって——それぞれのエリアに独自のスライム種、危険、資源が待っている',
        ko: '다양한 생태군계가 있는 생동감 넘치는 외계 섬 — 각 구역마다 고유한 슬라임 종류, 위험 요소, 자원이 있어요',
        de: 'Eine lebendige Alieninsel mit verschiedenen Biomen — jede Zone hat ihre eigenen Slime-Typen, Gefahren und Ressourcen zu entdecken',
        type: 'slime',
      },
      {
        en: 'A hand-crafted metroidvania world where acquiring certain monster types unlocks new traversal abilities and areas',
        zh: '一个精心制作的银河城世界，获得某些怪物类型可以解锁新的移动能力和区域',
        zhTW: '一個精心製作的銀河城世界，獲得某些怪物類型可以解鎖新的移動能力和區域',
        ja: '手作りのメトロイドヴァニアの世界で、特定のモンスターを手に入れることで新しい移動能力やエリアが解放される',
        ko: '특정 몬스터 타입 획득 시 새로운 이동 능력과 구역이 열리는 정교하게 제작된 메트로이드바니아 세계',
        de: 'Eine handgefertigte Metroidvania-Welt, in der bestimmte Monster-Typen neue Bewegungsfähigkeiten und Gebiete freischalten',
        type: 'sanctuary',
      },
      {
        en: 'A classic JRPG world with deep lore about the history of monster creation and synthesis across multiple kingdoms',
        zh: '一个有关于跨多个王国怪物创造和合成历史的深厚传说的经典 JRPG 世界',
        zhTW: '一個有關於跨多個王國怪物創造和合成歷史的深厚傳說的經典 JRPG 世界',
        ja: '複数の王国にまたがるモンスター創造と合成の歴史が描かれた、深い世界観を持つクラシックJRPGの世界',
        ko: '여러 왕국에 걸친 몬스터 창조와 합성의 역사가 깃든 깊은 세계관의 클래식 JRPG 세계',
        de: 'Eine klassische JRPG-Welt mit tiefer Lore über die Geschichte der Monsterschöpfung und -synthese über mehrere Königreiche hinweg',
        type: 'dqm',
      },
      {
        en: 'A shared online world where other tamers are also raising and battling, making every encounter feel meaningful',
        zh: '一个其他驯养者也在培育和战斗的共享在线世界，让每次遭遇都感觉有意义',
        zhTW: '一個其他馴養者也在培育和戰鬥的共享在線世界，讓每次遭遇都感覺有意義',
        ja: '他のテイマーもモンスターを育てて戦っている共有のオンライン世界で、すべての出会いが意味を持つ',
        ko: '다른 테이머들도 함께 키우고 배틀하는 공유 온라인 세계 — 모든 만남이 의미 있게 느껴져요',
        de: 'Eine gemeinsame Online-Welt, in der andere Tamer ebenfalls aufziehen und kämpfen — jede Begegnung fühlt sich bedeutsam an',
        type: 'temtem',
      },
    ],
  },
  {
    q_en: 'How much depth do you want in creature systems?',
    q_zh: '你希望生物系统有多大的深度？',
    q_zhTW: '你希望生物系統有多大的深度？',
    q_ja: '生き物システムにどれくらいの深みを求めますか？',
    q_ko: '생물 시스템에 얼마나 깊이를 원하나요?',
    q_de: 'Wie viel Tiefe wünschst du dir bei den Kreatur-Systemen?',
    options: [
      {
        en: 'Intuitive and accessible — slime types have clear needs and produce resources in ways I can understand at a glance',
        zh: '直觉且易懂——史莱姆类型有明确的需求，并以我一眼就能理解的方式产出资源',
        zhTW: '直覺且易懂——史萊姆類型有明確的需求，並以我一眼就能理解的方式產出資源',
        ja: '直感的でわかりやすい——スライムの種類ごとに明確なニーズがあって、一目で理解できる形でリソースを生産してくれる',
        ko: '직관적이고 이해하기 쉬운 — 슬라임 종류별로 명확한 요구사항이 있고 한눈에 파악할 수 있는 자원 생산 방식',
        de: 'Intuitiv und zugänglich — Slime-Typen haben klare Bedürfnisse und produzieren Ressourcen auf eine Weise, die ich auf einen Blick verstehe',
        type: 'slime',
      },
      {
        en: 'Moderate but rich — each monster has a unique passive and active ability set that creates interesting combinations in a team of three',
        zh: '中等但丰富——每只怪物都有独特的被动和主动能力组，在三只的队伍中创造有趣的组合',
        zhTW: '中等但豐富——每隻怪物都有獨特的被動和主動能力組，在三隻的隊伍中創造有趣的組合',
        ja: 'ほどよく充実している——各モンスターがユニークなパッシブとアクティブ能力を持っていて、3体チームの中で面白いコンボが生まれる',
        ko: '적당하지만 풍부함 — 각 몬스터가 고유한 패시브·액티브 능력을 보유해 세 마리 팀 내에서 흥미로운 조합이 만들어짐',
        de: 'Moderat, aber reichhaltig — jedes Monster hat einzigartige passive und aktive Fähigkeiten, die im Dreier-Team interessante Kombinationen erzeugen',
        type: 'sanctuary',
      },
      {
        en: 'Very deep — cross-generation synthesis, inherited moves, trait stacking, and monster-specific skill trees that take dozens of hours to master',
        zh: '非常深入——跨代合成、遗传技能、特性叠加和怪物专属技能树，需要数十小时来掌握',
        zhTW: '非常深入——跨代合成、遺傳技能、特性疊加和怪物專屬技能樹，需要數十小時來掌握',
        ja: 'とことん深い——世代をまたぐ合成、受け継ぐ技、特性のスタック、モンスター専用スキルツリーと、マスターするまでに何十時間もかかる',
        ko: '매우 깊은 수준 — 세대를 넘은 합성, 유전 기술, 특성 스태킹, 몬스터 전용 스킬 트리까지, 마스터하는 데 수십 시간이 걸림',
        de: 'Sehr tief — generationsübergreifende Synthese, vererbte Züge, Eigenschafts-Stacking und monster-spezifische Fähigkeitsbäume, die Dutzende Stunden zum Meistern brauchen',
        type: 'dqm',
      },
      {
        en: 'Competitively deep — type charts with dual-type interactions, stamina-based turns, and a metagame that evolves alongside the community',
        zh: '竞争性深度——双属性互动的属性克制表、基于耐力的回合，以及随社区共同演化的元游戏',
        zhTW: '競爭性深度——雙屬性互動的屬性克制表、基於耐力的回合，以及隨社群共同演化的元遊戲',
        ja: '競技的な深さ——ダブルタイプの相性チャート、スタミナ制のターン、そしてコミュニティと一緒に進化し続けるメタゲーム',
        ko: '경쟁적인 깊이 — 이중 타입 상성표, 스태미나 기반 턴제, 커뮤니티와 함께 진화하는 메타게임',
        de: 'Kompetitiv tiefgründig — Typharts mit Doppeltyp-Interaktionen, ausdauerbasierte Züge und ein Metagame, das sich mit der Community weiterentwickelt',
        type: 'temtem',
      },
    ],
  },
  {
    q_en: 'How long would you like to play before feeling satisfied?',
    q_zh: '你想玩多久才感到满足？',
    q_zhTW: '你想玩多久才感到滿足？',
    q_ja: 'どれくらいプレイしたら満足できそうですか？',
    q_ko: '얼마나 플레이해야 만족감을 느낄 것 같나요?',
    q_de: 'Wie lange möchtest du spielen, bevor du dich zufrieden fühlst?',
    options: [
      {
        en: '20-40 hours — enough to see all the biomes, unlock the full ranch, and experience the complete exploration arc',
        zh: '20-40 小时——足以看到所有生态区域、解锁完整的牧场，并体验完整的探索弧线',
        zhTW: '20-40 小時——足以看到所有生態區域、解鎖完整的牧場，並體驗完整的探索弧線',
        ja: '20〜40時間——全バイオームを見て、牧場をフル開放して、探索のメインコンテンツを楽しみ切るくらい',
        ko: '20~40시간 — 모든 생태군계를 보고, 목장을 완전히 열고, 전체 탐험 스토리를 경험하기에 충분',
        de: '20–40 Stunden — genug, um alle Biome zu sehen, die vollständige Ranch freizuschalten und den gesamten Erkundungsbogen zu erleben',
        type: 'slime',
      },
      {
        en: '40-60 hours — complete the metroidvania world map, fill my monster roster, and defeat the final boss with a team I designed myself',
        zh: '40-60 小时——完成银河城世界地图、填满我的怪物名册，并用我自己设计的队伍击败最终 Boss',
        zhTW: '40-60 小時——完成銀河城世界地圖、填滿我的怪物名冊，並用我自己設計的隊伍擊敗最終 Boss',
        ja: '40〜60時間——メトロイドヴァニアのマップを完成させて、モンスターリストを埋めて、自分で組んだチームでラスボスを倒すまで',
        ko: '40~60시간 — 메트로이드바니아 세계 지도 완성, 몬스터 명단 채우기, 내가 직접 설계한 팀으로 최종 보스 처치',
        de: '40–60 Stunden — die Metroidvania-Weltkarte vervollständigen, meinen Monsterkader füllen und den Endboss mit meinem eigenen Team besiegen',
        type: 'sanctuary',
      },
      {
        en: '80-100+ hours — the synthesis system alone can absorb that much time, and the main story adds a full classic JRPG arc on top',
        zh: '80-100+ 小时——仅合成系统就能吸收那么多时间，而主线故事还添加了一个完整的经典 JRPG 弧线',
        zhTW: '80-100+ 小時——僅合成系統就能吸收那麼多時間，而主線故事還添加了一個完整的經典 JRPG 弧線',
        ja: '80〜100時間以上——合成システムだけでその分は使えるし、メインストーリーで本格JRPGの旅も楽しめる',
        ko: '80~100시간 이상 — 합성 시스템만으로도 그만큼 걸리고, 메인 스토리로 클래식 JRPG 여정까지 더해짐',
        de: '80–100+ Stunden — allein das Synthesensystem absorbiert so viel Zeit, und die Hauptgeschichte fügt noch einen vollständigen klassischen JRPG-Bogen obendrauf',
        type: 'dqm',
      },
      {
        en: 'Ongoing — a live-service game where I can sink hundreds of hours into ranked matches, seasonal events, and improving my team',
        zh: '持续——一款实时服务游戏，我可以投入数百小时于排名比赛、季节性活动和改进我的队伍',
        zhTW: '持續——一款即時服務遊戲，我可以投入數百小時於排名比賽、季節性活動和改進我的隊伍',
        ja: 'ずっと続けたい——ランクマッチ、季節イベント、チームの強化に何百時間でも投入できるライブサービスゲーム',
        ko: '계속해서 — 랭크 매치, 시즌 이벤트, 팀 강화에 수백 시간을 투자할 수 있는 라이브 서비스 게임',
        de: 'Fortlaufend — ein Live-Service-Spiel, in das ich hunderte Stunden in Rangkämpfe, Saisonevents und Teamverbesserungen stecken kann',
        type: 'temtem',
      },
    ],
  },
  {
    q_en: 'Which end-of-session feeling sounds most appealing?',
    q_zh: '哪种游戏结束时的感觉听起来最有吸引力？',
    q_zhTW: '哪種遊戲結束時的感覺聽起來最有吸引力？',
    q_ja: 'セッション終了後、どんな達成感が一番心地よさそうですか？',
    q_ko: '게임 세션을 마칠 때 어떤 느낌이 가장 끌리나요?',
    q_de: 'Welches Gefühl am Ende einer Spielsitzung klingt am ansprechendsten?',
    options: [
      {
        en: 'I expanded my ranch into a new biome, discovered two new slime variants I had never seen, and my Plort market is now fully automated',
        zh: '我把牧场扩展到了一个新的生态区域，发现了两种我从未见过的史莱姆变种，我的晶体市场现在已经完全自动化了',
        zhTW: '我把牧場擴展到了一個新的生態區域，發現了兩種我從未見過的史萊姆變種，我的晶體市場現在已經完全自動化了',
        ja: '新しいバイオームへ牧場を拡張して、見たことないスライムを2種類見つけて、プロートマーケットが全自動になった',
        ko: '목장을 새 생태군계로 확장하고, 처음 보는 슬라임 변종 두 가지를 발견했으며, 플로트 시장이 완전 자동화됐어요',
        de: 'Ich habe meine Ranch in ein neues Biom erweitert, zwei neue Slime-Varianten entdeckt und mein Plort-Markt ist jetzt vollständig automatisiert',
        type: 'slime',
      },
      {
        en: 'I finally figured out the perfect three-monster combo to clear the dungeon I was stuck on — and it opened a new area of the world I had been unable to reach',
        zh: '我终于找到了完美的三怪物组合来清除我一直卡住的地下城——它打开了一个我无法到达的世界新区域',
        zhTW: '我終於找到了完美的三怪物組合來清除我一直卡住的地下城——它打開了一個我無法到達的世界新區域',
        ja: 'ずっと詰まってたダンジョンを突破できる完璧な3体コンボをついに見つけた——しかも新しいエリアまで解放されちゃった',
        ko: '막혀 있던 던전을 클리어할 완벽한 세 몬스터 조합을 드디어 찾았어요 — 그리고 새로운 세계 구역까지 열렸어요',
        de: 'Ich habe endlich die perfekte Drei-Monster-Kombo gefunden, um den Dungeon zu meistern — und es hat ein neues Gebiet geöffnet, das ich vorher nicht erreichen konnte',
        type: 'sanctuary',
      },
      {
        en: 'I synthesized a rare monster with three inherited skills from its parent lineage — a creature no one else will have built exactly the same way',
        zh: '我合成了一只拥有三个来自父母血脉遗传技能的稀有怪物——一个没有其他人会以完全相同方式培育的生物',
        zhTW: '我合成了一隻擁有三個來自父母血脈遺傳技能的稀有怪物——一個沒有其他人會以完全相同方式培育的生物',
        ja: '親の血統から3つの技を受け継いだレアモンスターを合成できた——世界に一体だけの、自分だけのモンスター',
        ko: '부모 혈통에서 세 가지 유전 기술을 가진 희귀 몬스터를 합성했어요 — 다른 누구도 똑같이 만들 수 없는 나만의 생물',
        de: 'Ich habe ein seltenes Monster mit drei vererbten Skills aus seiner Elternlinie synthetisiert — ein Wesen, das kein anderer genau so aufgebaut hat',
        type: 'dqm',
      },
      {
        en: 'I won three ranked matches in a row using a team composition I developed from scratch — my reading of the metagame is finally paying off',
        zh: '我用从零开始开发的队伍组合连赢了三场排名比赛——我对元游戏的理解终于得到了回报',
        zhTW: '我用從零開始開發的隊伍組合連贏了三場排名比賽——我對元遊戲的理解終於得到了回報',
        ja: '自分で一から作ったチームで3連勝できた——メタゲームの読みがついに実を結んだ瞬間',
        ko: '처음부터 개발한 팀 구성으로 랭크 3연승을 달성했어요 — 메타게임 이해가 드디어 빛을 발했어요',
        de: 'Ich habe drei Rangkämpfe hintereinander mit einer Teamkomposition gewonnen, die ich von Grund auf entwickelt habe — mein Metaspiel zahlt sich endlich aus',
        type: 'temtem',
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
  slime: {
    title_en: 'Slime Rancher 2',
    title_zh: 'Slime Rancher 2',
    title_zhTW: 'Slime Rancher 2',
    title_ja: 'スライムランチャー2',
    title_ko: '슬라임 랜처 2',
    title_de: 'Slime Rancher 2',
    emoji: '🫧',
    tag_en: 'Ranch colorful alien slimes on a magical glass desert island — a pure cozy exploration and management game with no combat and an always-satisfying resource loop',
    tag_zh: '在一个神奇的玻璃沙漠岛上牧养多彩的外星史莱姆——一款没有战斗、有着始终令人满足资源循环的纯 Cozy 探索和管理游戏',
    tag_zhTW: '在一個神奇的玻璃沙漠島上牧養多彩的外星史萊姆——一款沒有戰鬥、有著始終令人滿足資源循環的純 Cozy 探索和管理遊戲',
    tag_ja: '魔法のようなガラスの砂漠の島で、カラフルな宇宙スライムを育てるゲーム——戦闘なし、いつも気持ちいいリソースループが続く純粋なコージー探索＆管理ゲーム',
    tag_ko: '마법 같은 유리 사막 섬에서 형형색색의 외계 슬라임을 기르는 게임 — 전투 없이 언제나 만족스러운 자원 루프가 이어지는 순수 코지 탐험 & 관리 게임',
    tag_de: 'Züchte farbenfrohe Alien-Slimes auf einer magischen Glaswüsteninsel — ein reines Cozy-Erkundungs- und Managementspiel ohne Kämpfe mit einem stets befriedigenden Ressourcenkreislauf',
    platform_en: 'Available on: PC (Steam), Xbox Series X/S, Game Pass — about $30. Early Access since 2022, full release ongoing.',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox Series X/S、Game Pass——约 30 美元。自 2022 年起进入抢先体验，完整发行持续进行。',
    platform_zhTW: '可在以下平台獲取：PC（Steam）、Xbox Series X/S、Game Pass——約 30 美元。自 2022 年起進入搶先體驗，完整發行持續進行。',
    platform_ja: '対応プラットフォーム：PC（Steam）、Xbox Series X/S、Game Pass——約30ドル。2022年より早期アクセス中、正式リリース進行中。',
    platform_ko: '플랫폼: PC(Steam), Xbox Series X/S, Game Pass — 약 $30. 2022년부터 얼리 액세스, 정식 출시 진행 중.',
    platform_de: 'Verfügbar auf: PC (Steam), Xbox Series X/S, Game Pass — ca. 30 $. Seit 2022 im Early Access, Vollversion in Entwicklung.',
    why_en:
      "Slime Rancher 2 (2022, full release in progress) is the sequel to the beloved original and one of the most charming creature management games ever made. You play as Beatrix LeBeau, returning to a new island called Rainbow Island, where you discover new slime species, build and expand a ranch, and harvest the \"Plorts\" (droppings) that each slime type produces to sell. The game is played in first person with a vacuum gun — you suck up resources, food, and slimes, then deposit them where they belong. Each slime type has different needs (diet, environment) and different Plort values; Largo Slimes (fusions of two types) produce two Plort types but are more demanding. The exploration loop is deeply satisfying: new areas contain new slimes, and finding a biome you have never been to before always delivers a moment of delight. There is no combat; the only danger is letting slimes escape or over-mixing incompatible species. For Stardew Valley players: the Plort market, resource management, and ranch automation feel immediately familiar — this is a farming sim in creature form. Available on Game Pass.",
    why_zh:
      'Slime Rancher 2（2022 年，完整版发行中）是备受喜爱的原版续作，也是有史以来最迷人的生物管理游戏之一。你扮演 Beatrix LeBeau，回到一个新岛屿"彩虹岛"，在那里你发现新的史莱姆物种、建造和扩展牧场，并收获每种史莱姆类型产生的"晶体"（排泄物）出售。游戏以第一人称和真空枪进行——你吸起资源、食物和史莱姆，然后将它们存放在适当的地方。每种史莱姆类型都有不同的需求（饮食、环境）和不同的晶体价值；大型史莱姆（两种类型的融合）产生两种晶体类型但要求更高。探索循环非常令人满足：新区域包含新史莱姆，找到一个你从未去过的生态区域总是带来一个愉快的时刻。没有战斗；唯一的危险是让史莱姆逃跑或过度混合不相容的物种。对于星露谷玩家：晶体市场、资源管理和牧场自动化感觉立即熟悉——这是生物形式的农场模拟。Game Pass 上可用。',
    why_zhTW:
      'Slime Rancher 2（2022 年，完整版發行中）是備受喜愛的原版續作，也是有史以來最迷人的生物管理遊戲之一。你扮演 Beatrix LeBeau，回到一個新島嶼「彩虹島」，在那裡你發現新的史萊姆物種、建造和擴展牧場，並收獲每種史萊姆類型產生的「晶體」（排泄物）出售。遊戲以第一人稱和真空槍進行——你吸起資源、食物和史萊姆，然後將它們存放在適當的地方。每種史萊姆類型都有不同的需求（飲食、環境）和不同的晶體價值；大型史萊姆（兩種類型的融合）產生兩種晶體類型但要求更高。探索循環非常令人滿足：新區域包含新史萊姆，找到一個你從未去過的生態區域總是帶來一個愉快的時刻。沒有戰鬥；唯一的危險是讓史萊姆逃跑或過度混合不相容的物種。對於星露谷玩家：晶體市場、資源管理和牧場自動化感覺立即熟悉——這是生物形式的農場模擬。Game Pass 上可用。',
    why_ja:
      'スライムランチャー2（2022年、正式リリース進行中）は人気オリジナルの続編で、史上もっとも魅力的な生き物管理ゲームのひとつです。主人公のベアトリクス・ルボーとして新しい島「レインボーアイランド」を訪れ、新種のスライムを発見し、牧場を拡張し、各スライムが生産する「プロート」（排泄物）を売って資金を稼ぎます。ゲームは一人称視点でバキュームガンを使って進行——資源・食料・スライムを吸い込んで、適切な場所に格納します。スライムの種類ごとに異なる食事・環境ニーズとプロート価値があり、ラルゴスライム（2種類の融合）は2種類のプロートを生産する代わりに手がかかります。探索ループは非常に気持ちよく、新エリアには必ず新スライムが待っています。戦闘なし——スライムを逃がしたり相性の悪い種を混在させたりしないことが唯一の緊張感です。スターデューバレーファンには、プロート市場・資源管理・牧場の自動化がすぐ馴染みやすいはずです。Game Passでも遊べます。',
    why_ko:
      '슬라임 랜처 2(2022년, 정식 출시 진행 중)는 사랑받는 오리지널의 속편이자 역대 가장 매력적인 생물 관리 게임 중 하나입니다. 주인공 비어트릭스 르보로서 새로운 섬 \'레인보우 아일랜드\'를 탐험하며 새로운 슬라임 종을 발견하고, 목장을 건설·확장하고, 각 슬라임이 생산하는 \'플로트\'(배설물)를 판매합니다. 게임은 1인칭 시점에서 진공 건을 사용해 진행 — 자원, 음식, 슬라임을 빨아들여 적절한 곳에 보관합니다. 슬라임 종류마다 다른 식이·환경 요구사항과 플로트 가치를 갖고 있으며, 라르고 슬라임(두 종류의 융합)은 두 종류의 플로트를 생산하지만 관리가 더 까다롭습니다. 탐험 루프는 매우 만족스럽고 새 구역에는 항상 새 슬라임이 있습니다. 전투 없음 — 슬라임 탈출이나 호환되지 않는 종의 혼합이 유일한 위험 요소입니다. 스타듀 밸리 플레이어라면 플로트 시장, 자원 관리, 목장 자동화가 바로 익숙하게 느껴질 것입니다. Game Pass에서도 이용 가능합니다.',
    why_de:
      'Slime Rancher 2 (2022, Vollversion in Entwicklung) ist die Fortsetzung des beliebten Originals und eines der charmantesten Kreaturenmanagementspiele überhaupt. Du spielst als Beatrix LeBeau, kehrst auf eine neue Insel namens Rainbow Island zurück, entdeckst neue Slime-Arten, baust und erweiterst eine Ranch und erntest die „Plorts" (Ausscheidungen), die jede Slime-Art produziert, zum Verkauf. Das Spiel läuft in der Egoperspektive mit einer Vakuumkanone — du saugst Ressourcen, Nahrung und Slimes auf und bringst sie dorthin, wo sie hingehören. Jede Slime-Art hat unterschiedliche Bedürfnisse (Ernährung, Umgebung) und unterschiedliche Plort-Werte; Largo Slimes (Fusionen zweier Typen) produzieren zwei Plort-Typen, sind aber anspruchsvoller. Der Erkundungsloop ist äußerst befriedigend: Neue Gebiete enthalten neue Slimes, und ein bisher unbesuchtes Biom zu entdecken, bringt stets einen freudigen Moment. Es gibt keine Kämpfe; die einzige Gefahr besteht darin, Slimes entkommen zu lassen oder unverträgliche Arten zu mischen. Für Stardew Valley-Spieler: Der Plort-Markt, das Ressourcenmanagement und die Ranch-Automatisierung fühlen sich sofort vertraut an — das ist ein Farming-Sim in Kreaturenform. Auf Game Pass verfügbar.',
    tip_en: "Build a Plort Market early and start selling your most valuable Plort types each morning — prices reset daily and fluctuate. Prioritize the Conservatory expansion to gain more ranch plots. The Gordo Slimes (giant immovable slimes in the world) are worth feeding to pop — they always reveal a new area or resource when burst.",
    tip_zh: '早期建立晶体市场，每天早上开始出售你最有价值的晶体类型——价格每天重置并波动。优先扩展温室以获得更多牧场地块。世界中的 Gordo 史莱姆（巨大的不可移动史莱姆）值得喂食来爆破——爆破时总会揭示新区域或资源。',
    tip_zhTW: '早期建立晶體市場，每天早上開始出售你最有價值的晶體類型——價格每天重置並波動。優先擴展溫室以獲得更多牧場地塊。世界中的 Gordo 史萊姆（巨大的不可移動史萊姆）值得餵食來爆破——爆破時總會揭示新區域或資源。',
    tip_ja: '早めにプロートマーケットを建てて、毎朝一番価値の高いプロートを売りましょう——価格は毎日リセットされて変動します。コンサバトリーの拡張を優先して、牧場スペースを増やしましょう。世界中にいるゴルドスライム（巨大な動かないスライム）はエサを与えて破裂させる価値があります——破裂させると必ず新エリアか資源が出現します。',
    tip_ko: '초반에 플로트 시장을 만들고 매일 아침 가장 가치 있는 플로트 종류부터 판매하세요 — 가격은 매일 초기화되고 변동합니다. 더 많은 목장 공간을 확보하려면 온실 확장을 우선시하세요. 세계 곳곳의 고르도 슬라임(거대하고 움직이지 않는 슬라임)은 먹이를 줘서 터뜨릴 가치가 있습니다 — 터뜨리면 항상 새 구역이나 자원이 나타납니다.',
    tip_de: 'Baue früh einen Plort-Markt und beginne jeden Morgen damit, deine wertvollsten Plort-Typen zu verkaufen — Preise werden täglich zurückgesetzt und schwanken. Priorisiere die Erweiterung des Konservatoriums, um mehr Ranch-Parzellen zu erhalten. Die Gordo Slimes (riesige, unbewegte Slimes in der Welt) sind es wert, gefüttert und zum Platzen gebracht zu werden — sie enthüllen immer ein neues Gebiet oder eine Ressource, wenn sie platzen.',
  },
  sanctuary: {
    title_en: 'Monster Sanctuary',
    title_zh: '怪物避难所',
    title_zhTW: '怪物避難所',
    title_ja: 'モンスターサンクチュアリ',
    title_ko: '몬스터 생츄어리',
    title_de: 'Monster Sanctuary',
    emoji: '🐉',
    tag_en: 'A metroidvania where your team of three monsters is your toolkit — unlock new traversal abilities, discover every corner of a connected world, and master strategic 3v3 monster battles',
    tag_zh: '一款你的三只怪物队伍是你工具包的银河城——解锁新的移动能力、发现互连世界的每个角落，并掌握战略性 3v3 怪物战斗',
    tag_zhTW: '一款你的三隻怪物隊伍是你工具包的銀河城——解鎖新的移動能力、發現互連世界的每個角落，並掌握戰略性 3v3 怪物戰鬥',
    tag_ja: '3体のモンスターチームが探索ツールになるメトロイドヴァニア——新しい移動能力を解放し、つながった世界の隅々を探索して、戦略的な3対3バトルをマスターしよう',
    tag_ko: '세 마리 몬스터 팀이 이동 도구가 되는 메트로이드바니아 — 새로운 이동 능력 해제, 연결된 세계의 구석구석 탐험, 전략적 3v3 배틀 마스터하기',
    tag_de: 'Ein Metroidvania, bei dem dein Team aus drei Monstern dein Werkzeugkasten ist — schalte neue Bewegungsfähigkeiten frei, entdecke jeden Winkel einer verbundenen Welt und meistere strategische 3v3-Monsterkämpfe',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox — about $17',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox——约 17 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox——約 17 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox——約17ドル',
    platform_ko: '플랫폼: PC(Steam, GOG), Nintendo Switch, PS4, PS5, Xbox — 약 $17',
    platform_de: 'Verfügbar auf: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox — ca. 17 $',
    why_en:
      "Monster Sanctuary (2020) is a brillantly designed fusion of metroidvania exploration and monster-collecting RPG — a game that uses monster abilities directly as traversal tools. Your team of three monsters accompanies you everywhere, and different monster types unlock different world areas: a flying monster lets you cross gaps, an aquatic monster lets you swim, and so on. The turn-based battle system is built around \"Shielding\" — your monsters build up Shield (damage reduction) through ability synergies, and breaking an enemy's Shield does massive damage. Building a team where each monster's passive and active abilities enhance the others is the core creative puzzle. The metroidvania world is hand-crafted and dense, with secrets in every area. The monster roster spans 100+ species, each with a fully unique skill tree. For players who want Pokémon's creature collection married to Hollow Knight's exploration philosophy: Monster Sanctuary does exactly that. At about $17 with regular deep sales, it is one of the best value games in the genre.",
    why_zh:
      '怪物避难所（2020 年）是银河城探索和怪物收集 RPG 的精彩融合——一款直接使用怪物能力作为移动工具的游戏。你的三只怪物队伍无处不在地陪伴着你，不同的怪物类型解锁不同的世界区域：飞行怪物让你越过裂缝，水生怪物让你游泳，等等。回合制战斗系统建立在"护盾"基础上——你的怪物通过能力协同积累护盾（伤害减免），打破敌人的护盾造成巨大伤害。建立一个每只怪物的被动和主动能力相互增强的队伍是核心创意谜题。银河城世界是手工制作且密集的，每个区域都有秘密。怪物名册涵盖 100+ 种物种，每种都有完全独特的技能树。约 17 美元，经常深度促销，是该类型中最高性价比的游戏之一。',
    why_zhTW:
      '怪物避難所（2020 年）是銀河城探索和怪物收集 RPG 的精彩融合——一款直接使用怪物能力作為移動工具的遊戲。你的三隻怪物隊伍無處不在地陪伴著你，不同的怪物類型解鎖不同的世界區域：飛行怪物讓你越過裂縫，水生怪物讓你游泳，等等。回合制戰鬥系統建立在「護盾」基礎上——你的怪物通過能力協同積累護盾（傷害減免），打破敵人的護盾造成巨大傷害。建立一個每隻怪物的被動和主動能力相互增強的隊伍是核心創意謎題。銀河城世界是手工製作且密集的，每個區域都有秘密。怪物名冊涵蓋 100+ 種物種，每種都有完全獨特的技能樹。約 17 美元，經常深度促銷，是該類型中最高性價比的遊戲之一。',
    why_ja:
      'モンスターサンクチュアリ（2020年）は、メトロイドヴァニア探索とモンスター収集RPGを見事に融合した作品——モンスターの能力をそのまま移動ツールとして使うユニークなゲームです。3体のモンスターチームが常に一緒に行動し、モンスターの種類によって新しいエリアが解放されます。飛行モンスターなら隙間を越えられ、水中モンスターなら泳いで進めます。ターン制バトルは「シールド」システムを軸に設計されていて——味方のシールドを能力の相乗効果で積み上げ、敵のシールドを破ることで大ダメージを与えます。各モンスターのパッシブとアクティブが互いを強化するチームを作ることが、このゲームの核心的な創造パズルです。手作りで密度の高いメトロイドヴァニアの世界には、各エリアに隠し要素が詰まっています。モンスターは100種以上、それぞれ独自のスキルツリーを持ちます。約17ドルで頻繁に大幅セールも行われる、コスパ抜群の良作です。',
    why_ko:
      '몬스터 생츄어리(2020년)는 메트로이드바니아 탐험과 몬스터 수집 RPG를 훌륭하게 결합한 게임 — 몬스터 능력을 직접 이동 도구로 사용하는 독특한 작품입니다. 세 마리 몬스터 팀이 항상 함께 다니며, 몬스터 종류에 따라 다른 세계 구역이 열립니다. 비행 몬스터는 틈새를 넘게 해주고, 수중 몬스터는 헤엄칠 수 있게 해줍니다. 턴제 배틀 시스템은 \'쉴드\'를 중심으로 구축되어 있어 — 능력 시너지로 쉴드를 쌓고 적의 쉴드를 부수면 막대한 피해를 줍니다. 각 몬스터의 패시브와 액티브가 서로를 강화하는 팀을 구성하는 것이 핵심 창의 퍼즐입니다. 수제작된 밀도 높은 메트로이드바니아 세계에는 각 구역마다 비밀이 가득합니다. 몬스터 명단은 100종 이상, 각각 완전히 독자적인 스킬 트리를 보유합니다. 약 $17에 정기적인 대폭 할인도 있어 장르 내 최고의 가성비 게임 중 하나입니다.',
    why_de:
      'Monster Sanctuary (2020) ist eine brillant konzipierte Fusion aus Metroidvania-Erkundung und Monster-Sammel-RPG — ein Spiel, das Monster-Fähigkeiten direkt als Bewegungswerkzeuge nutzt. Dein Team aus drei Monstern begleitet dich überall, und verschiedene Monster-Typen schalten unterschiedliche Weltbereiche frei: ein fliegendes Monster lässt dich Lücken überqueren, ein Wassermonster lässt dich schwimmen und so weiter. Das rundenbasierte Kampfsystem dreht sich um „Schilde" — deine Monster bauen durch Fähigkeitssynergien Schilde (Schadensreduktion) auf, und ein gegnerisches Schild zu durchbrechen, verursacht massiven Schaden. Ein Team zu bauen, bei dem die passiven und aktiven Fähigkeiten jedes Monsters die anderen verbessern, ist das kreative Kernrätsel. Die Metroidvania-Welt ist handgefertigt und dicht, mit Geheimnissen in jedem Bereich. Das Monster-Kader umfasst 100+ Arten, jede mit einem vollständig einzigartigen Fähigkeitsbaum. Bei ca. 17 $ mit regelmäßigen tiefen Rabatten ist es eines der besten Preis-Leistungs-Spiele im Genre.',
    tip_en: "Focus on Shielding synergy early — monsters that apply Shields when buffing allies make your team much more durable. Breed monsters as soon as breeding unlocks; offspring inherit abilities and often have better stat spread than the wild-caught parent. Check monster ability tooltips carefully: some passives trigger multiple times per round and are far more powerful than they look.",
    tip_zh: '早期专注于护盾协同——在增益盟友时施加护盾的怪物让你的队伍更加耐久。繁殖解锁后立即繁殖怪物；后代继承能力，通常比野外捕获的亲本有更好的属性分配。仔细检查怪物能力提示：一些被动每回合触发多次，比看起来强大得多。',
    tip_zhTW: '早期專注於護盾協同——在增益盟友時施加護盾的怪物讓你的隊伍更加耐久。繁殖解鎖後立即繁殖怪物；後代繼承能力，通常比野外捕獲的親本有更好的屬性分配。仔細檢查怪物能力提示：一些被動每回合觸發多次，比看起來強大得多。',
    tip_ja: '序盤はシールドの相乗効果に注目しましょう——バフをかけるときにシールドを付与するモンスターがいると、チームの耐久力がぐっと上がります。繁殖が解放されたらすぐ使いましょう。子孫は能力を継承していて、野生で捕まえた親より優れたステータス配分を持つことが多いです。モンスターの能力ツールチップをよく読んでください——一部のパッシブは1ターンに複数回発動し、見た目よりはるかに強力です。',
    tip_ko: '초반에는 쉴드 시너지에 집중하세요 — 아군에게 버프를 걸 때 쉴드를 부여하는 몬스터가 있으면 팀 내구성이 크게 향상됩니다. 브리딩이 해금되면 즉시 활용하세요. 자손은 능력을 물려받으며 야생에서 잡은 부모보다 더 좋은 스탯 배분을 갖는 경우가 많습니다. 몬스터 능력 툴팁을 꼼꼼히 확인하세요 — 일부 패시브는 한 턴에 여러 번 발동하며 보이는 것보다 훨씬 강력합니다.',
    tip_de: 'Konzentriere dich früh auf Schild-Synergien — Monster, die beim Buffen von Verbündeten Schilde anwenden, machen dein Team viel widerstandsfähiger. Züchte Monster, sobald das Züchten freischaltet; Nachkommen erben Fähigkeiten und haben oft eine bessere Stat-Verteilung als das in freier Wildbahn gefangene Elterntier. Lies Monster-Fähigkeits-Tooltips sorgfältig: Manche passiven Fähigkeiten lösen mehrmals pro Runde aus und sind weit mächtiger, als sie aussehen.',
  },
  dqm: {
    title_en: 'Dragon Quest Monsters: The Dark Prince',
    title_zh: '勇者斗恶龙：怪兽仙境 The Dark Prince',
    title_zhTW: '勇者鬥惡龍：怪獸仙境 The Dark Prince',
    title_ja: 'ドラゴンクエストモンスターズ3 マスターズロード',
    title_ko: '드래곤 퀘스트 몬스터즈: 다크 프린스',
    title_de: 'Dragon Quest Monsters: The Dark Prince',
    emoji: '👑',
    tag_en: 'The deepest monster synthesis system in gaming — catch hundreds of species and fuse them across generations to create custom monsters with inherited skills from both parents',
    tag_zh: '游戏中最深度的怪物合成系统——捕获数百种物种并跨代合成，创造从双亲继承技能的定制怪物',
    tag_zhTW: '遊戲中最深度的怪物合成系統——捕獲數百種物種並跨代合成，創造從雙親繼承技能的定製怪物',
    tag_ja: 'ゲーム史上最も深いモンスター合体システム——何百種類ものモンスターを捕まえて、世代をまたいで合体させ、両親から技を受け継いだオリジナルモンスターを生み出そう',
    tag_ko: '게임 역사상 가장 깊은 몬스터 합성 시스템 — 수백 종을 포획하고 세대를 넘어 합성해 양 부모로부터 기술을 물려받은 나만의 몬스터 만들기',
    tag_de: 'Das tiefgründigste Monster-Synthesensystem im Gaming — fange hunderte Arten und fusioniere Monster generationsübergreifend, um Hybridwesen mit vererbten Fähigkeiten beider Elternteile zu erschaffen',
    platform_en: 'Available on: Nintendo Switch only — about $60 new. PC version not yet available.',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 60 美元。PC 版尚未发售。',
    platform_zhTW: '可在以下平台獲取：僅 Nintendo Switch——新品約 60 美元。PC 版尚未發售。',
    platform_ja: '対応プラットフォーム：Nintendo Switchのみ——新品約60ドル。PC版は未発売。',
    platform_ko: '플랫폼: Nintendo Switch 전용 — 신품 약 $60. PC 버전 미출시.',
    platform_de: 'Verfügbar auf: Nur Nintendo Switch — ca. 60 $ neu. PC-Version noch nicht verfügbar.',
    why_en:
      "Dragon Quest Monsters: The Dark Prince (2023) is the latest entry in Square Enix's beloved monster-collecting sub-franchise — a game with one of the deepest synthesis (fusion) systems in the genre. You play as Psaro, a character from Dragon Quest IV who is cursed to be unable to harm monsters, and so learns to synthesize them instead. The world is layered across five seasons, with different monsters available depending on the current season in each area. But the synthesis system is the real draw: any two monsters can be fused to create a new higher-rank species, and critically, the offspring inherits up to eight skills from both parents. Breeding a monster specifically to inherit the perfect combination of skills from multiple generations is the depth that monster enthusiasts spend hundreds of hours on. The roster spans 500+ monsters drawn from the entire Dragon Quest franchise history. For fans of Dragon Quest or anyone who wants the deepest monster-collection system available on Nintendo Switch: this is the definitive entry in the genre.",
    why_zh:
      '勇者斗恶龙：怪兽仙境 The Dark Prince（2023 年）是史克威尔艾尼克斯备受喜爱的怪物收集子系列的最新作品——一款拥有该类型中最深度合成（融合）系统之一的游戏。你扮演 Psaro，勇者斗恶龙 IV 中的角色，他被诅咒无法伤害怪物，因此转而学习合成它们。世界分层于五个季节，不同区域有不同的怪物可根据当前季节获得。但合成系统才是真正的核心：任何两只怪物都可以合成，创造一个新的更高级别物种，关键是后代从双亲继承多达八个技能。专门培育一只怪物以从多代继承完美技能组合的深度是怪物爱好者花费数百小时的原因。名册涵盖了整个勇者斗恶龙系列历史中的 500+ 只怪物。',
    why_zhTW:
      '勇者鬥惡龍：怪獸仙境 The Dark Prince（2023 年）是史克威爾艾尼克斯備受喜愛的怪物收集子系列的最新作品——一款擁有該類型中最深度合成（融合）系統之一的遊戲。你扮演 Psaro，勇者鬥惡龍 IV 中的角色，他被詛咒無法傷害怪物，因此轉而學習合成它們。世界分層於五個季節，不同區域有不同的怪物可根據當前季節獲得。但合成系統才是真正的核心：任何兩隻怪物都可以合成，創造一個新的更高級別物種，關鍵是後代從雙親繼承多達八個技能。專門培育一隻怪物以從多代繼承完美技能組合的深度是怪物愛好者花費數百小時的原因。名冊涵蓋了整個勇者鬥惡龍系列歷史中的 500+ 隻怪物。',
    why_ja:
      'ドラゴンクエストモンスターズ3 マスターズロード（2023年）は、スクウェア・エニックスの人気モンスター収集サブシリーズ最新作——シリーズ最深レベルの合体（合成）システムを持つ作品です。主人公は『ドラゴンクエストIV』に登場するピサロ。怪物を傷つけることができないという呪いをかけられた彼が、代わりにモンスターの合体を習得していくストーリーです。世界は五つの季節に分かれており、エリアと季節の組み合わせによって出現するモンスターが変わります。このゲームの真骨頂は合体システム——どの2体のモンスターも合体させて上位種を生み出せ、子は両親から最大8つの技を引き継ぎます。複数世代にわたって理想のスキル構成を持つモンスターを育て上げる深みが、モンスター好きが何百時間も費やす理由です。ドラゴンクエストシリーズの歴代500種以上のモンスターが登場します。',
    why_ko:
      '드래곤 퀘스트 몬스터즈: 다크 프린스(2023년)는 스퀘어 에닉스의 인기 몬스터 수집 서브시리즈 최신작 — 장르 내 가장 깊은 합성(융합) 시스템 중 하나를 가진 게임입니다. 주인공은 드래곤 퀘스트 IV의 등장인물 피사로로, 몬스터를 해칠 수 없다는 저주를 받아 합성을 배우게 됩니다. 세계는 다섯 계절에 걸쳐 구성되며 각 지역의 현재 계절에 따라 다른 몬스터가 등장합니다. 하지만 진짜 핵심은 합성 시스템 — 어떤 두 몬스터든 합성해 새로운 고랭크 종을 만들 수 있고, 자손은 양 부모로부터 최대 8개의 기술을 물려받습니다. 여러 세대에 걸쳐 완벽한 기술 조합을 가진 몬스터를 육성하는 깊이가 몬스터 매니아들이 수백 시간을 투자하는 이유입니다. 드래곤 퀘스트 시리즈 역사 전체에서 500종 이상의 몬스터가 등장합니다.',
    why_de:
      'Dragon Quest Monsters: The Dark Prince (2023) ist der neueste Eintrag in Square Enixs beliebter Monster-Sammel-Reihe — ein Spiel mit einem der tiefgründigsten Synthese-(Fusions-)Systeme im Genre. Du spielst als Psaro, eine Figur aus Dragon Quest IV, die verflucht ist, Monster nicht verletzen zu können, und daher lernt, sie zu synthetisieren. Die Welt ist über fünf Jahreszeiten verteilt, wobei je nach aktueller Jahreszeit in jedem Gebiet unterschiedliche Monster verfügbar sind. Aber das Synthesensystem ist der eigentliche Kern: Beliebige zwei Monster können fusioniert werden, um eine neue höherrangige Art zu erschaffen, und kritischerweise erbt der Nachwuchs bis zu acht Fertigkeiten von beiden Elternteilen. Ein Monster gezielt so zu züchten, dass es eine perfekte Kombination von Fertigkeiten aus mehreren Generationen erbt, ist die Tiefe, in die Monster-Enthusiasten hunderte Stunden investieren. Das Kader umfasst 500+ Monster aus der gesamten Dragon Quest-Franchisegeschichte.',
    tip_en: "Scout monsters (the game's catch mechanic involves weakening them until they want to join) in every new area immediately — some rare monsters only appear in specific seasons, and missing a season means waiting for the cycle to come back. When synthesizing, always plan your skill inheritance two generations ahead: the meta-goal is building a Rank 10 monster with skills from three or four prior generations.",
    tip_zh: '在每个新区域立即侦察怪物（游戏的捕获机制涉及削弱它们直到它们想加入）——一些稀有怪物只在特定季节出现，错过一个季节意味着等待循环回来。合成时，始终提前两代计划你的技能继承：元目标是建立一个拥有来自三到四个先前世代技能的 10 级怪物。',
    tip_zhTW: '在每個新區域立即偵察怪物（遊戲的捕獲機制涉及削弱它們直到它們想加入）——一些稀有怪物只在特定季節出現，錯過一個季節意味著等待循環回來。合成時，始終提前兩代計劃你的技能繼承：元目標是建立一個擁有來自三到四個先前世代技能的 10 級怪物。',
    tip_ja: '新しいエリアではすぐにスカウトを始めましょう（弱らせるとスカウトできるようになります）——レアモンスターは特定の季節にしか出現しないので、季節を逃すと次のサイクルまで待つことになります。合体のときは2世代先のスキル継承まで計画を立てましょう。最終目標は3〜4世代前の技を受け継いだランク10のモンスターを育て上げることです。',
    tip_ko: '새로운 구역에서는 즉시 스카우트를 시작하세요(게임의 포획 메커니즘은 몬스터를 약화시켜 합류를 원하게 만드는 것) — 일부 희귀 몬스터는 특정 계절에만 나타나므로 한 계절을 놓치면 다음 사이클까지 기다려야 합니다. 합성 시에는 항상 두 세대 앞의 기술 계승을 계획하세요. 궁극 목표는 3~4세대 이전의 기술을 물려받은 랭크 10 몬스터를 육성하는 것입니다.',
    tip_de: 'Scoutet Monster (der Fangmechanismus des Spiels beinhaltet, sie zu schwächen, bis sie beitreten wollen) sofort in jedem neuen Gebiet — manche seltene Monster erscheinen nur in bestimmten Jahreszeiten, und eine Saison zu verpassen bedeutet, auf die nächste Wiederholung zu warten. Plant beim Synthetisieren immer eure Fähigkeitsvererbung zwei Generationen im Voraus: Das Metaziel ist, ein Rang-10-Monster mit Fähigkeiten aus drei oder vier vorherigen Generationen zu züchten.',
  },
  temtem: {
    title_en: 'Temtem',
    title_zh: 'Temtem',
    title_zhTW: 'Temtem',
    title_ja: 'テムテム',
    title_ko: '템템',
    title_de: 'Temtem',
    emoji: '⚡',
    tag_en: 'An online creature-taming MMO with a stamina-based competitive battle system — raise a team, challenge the story, and compete against other tamers from around the world',
    tag_zh: '一款拥有基于耐力竞技战斗系统的在线生物驯养 MMO——培养队伍、挑战故事，并与来自世界各地的其他驯养者竞争',
    tag_zhTW: '一款擁有基於耐力競技戰鬥系統的在線生物馴養 MMO——培養隊伍、挑戰故事，並與來自世界各地的其他馴養者競爭',
    tag_ja: 'スタミナ制の競技バトルシステムを持つオンラインモンスターテイミングMMO——チームを育てて、ストーリーをクリアして、世界中のテイマーと対戦しよう',
    tag_ko: '스태미나 기반 경쟁 배틀 시스템을 갖춘 온라인 생물 테이밍 MMO — 팀을 키우고, 스토리에 도전하며, 전 세계 테이머들과 경쟁하기',
    tag_de: 'Ein Online-Kreatur-Taming-MMO mit einem ausdauerbasiertem kompetitiven Kampfsystem — ziehe ein Team auf, bezwinge die Geschichte und tritt gegen andere Tamer aus aller Welt an',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS5, Xbox Series X/S — about $45',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS5、Xbox Series X/S——约 45 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam）、Nintendo Switch、PS5、Xbox Series X/S——約 45 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PS5、Xbox Series X/S——約45ドル',
    platform_ko: '플랫폼: PC(Steam), Nintendo Switch, PS5, Xbox Series X/S — 약 $45',
    platform_de: 'Verfügbar auf: PC (Steam), Nintendo Switch, PS5, Xbox Series X/S — ca. 45 $',
    why_en:
      "Temtem (2022) is the most ambitious online monster-taming game ever made — an MMO designed from the ground up to fix the things competitive Pokémon players have wanted for decades. The game takes place in the Airborne Archipelago, a world of floating islands, and features 164 Temtem species with a dual-typing system, a unique stamina mechanic (moves cost stamina, overexerting damages your own Temtem), and a synchronize system where certain moves are twice as powerful if used by both partners in the same turn. The world is shared with other players — you will see real tamers in towns, can challenge them to battles, and can form squads for endgame content. The campaign is a full 30-40 hour story; post-campaign is competitive ranked play. For Pokémon fans who want online multiplayer integrated into the core game, a fair competitive system without random chance, and a persistent shared world: Temtem delivers that experience. Cross-play between all platforms means the player pool is combined across PC, Switch, PS5, and Xbox.",
    why_zh:
      'Temtem（2022 年）是有史以来最雄心勃勃的在线怪物驯养游戏——一款从头开始设计来修复竞争性宝可梦玩家数十年来想要的东西的 MMO。游戏发生在空中群岛，一个漂浮岛屿的世界，拥有 164 种 Temtem，具有双属性系统、独特的耐力机制（技能消耗耐力，过度消耗会伤害你自己的 Temtem）和同步系统（如果双方伙伴在同一回合使用某些技能，效果翻倍）。世界与其他玩家共享——你将在城镇看到真实的驯养者，可以向他们发起挑战，并可以组队进行终局内容。主线是一个完整的 30-40 小时故事；主线后是竞争性排名游戏。所有平台间的跨平台游戏意味着玩家池在 PC、Switch、PS5 和 Xbox 间合并。',
    why_zhTW:
      'Temtem（2022 年）是有史以來最雄心勃勃的在線怪物馴養遊戲——一款從頭開始設計來修復競爭性寶可夢玩家數十年來想要的東西的 MMO。遊戲發生在空中群島，一個漂浮島嶼的世界，擁有 164 種 Temtem，具有雙屬性系統、獨特的耐力機制（技能消耗耐力，過度消耗會傷害你自己的 Temtem）和同步系統（如果雙方夥伴在同一回合使用某些技能，效果翻倍）。世界與其他玩家共享——你將在城鎮看到真實的馴養者，可以向他們發起挑戰，並可以組隊進行終局內容。主線是一個完整的 30-40 小時故事；主線後是競爭性排名遊戲。所有平台間的跨平台遊戲意味著玩家池在 PC、Switch、PS5 和 Xbox 間合併。',
    why_ja:
      'テムテム（2022年）は、史上最も野心的なオンラインモンスターテイミングゲーム——競技ポケモンプレイヤーが何十年も望んでいたものを実現するために設計されたMMOです。舞台は空中群島と呼ばれる浮遊島の世界で、164種のテムテムが登場。デュアルタイプシステム、独自のスタミナ制（技を使うとスタミナを消費し、スタミナ切れは自分へのダメージになる）、シンクロシステム（両方のパートナーが同じターンに特定の技を使うと威力が2倍になる）が特徴です。世界は他のプレイヤーと共有されていて、町でリアルなテイマーを見かけたり、対戦を挑んだり、エンドゲームコンテンツのチームを組んだりできます。キャンペーンは30〜40時間のフルストーリー。クリア後は競技ランクマッチです。全プラットフォームでクロスプレイ対応なので、PC・Switch・PS5・Xboxのプレイヤープールが一本化されています。',
    why_ko:
      '템템(2022년)은 역대 가장 야심찬 온라인 몬스터 테이밍 게임 — 경쟁 포켓몬 플레이어들이 수십 년 동안 원해온 것들을 처음부터 구현하기 위해 설계된 MMO입니다. 공중 군도라는 부유 섬의 세계를 배경으로 164종의 템템이 등장하며, 이중 타입 시스템, 고유한 스태미나 메커니즘(기술이 스태미나를 소모하고 과도한 소모는 자신의 템템에게 피해), 동기화 시스템(양쪽 파트너가 같은 턴에 특정 기술 사용 시 위력 2배)이 특징입니다. 세계는 다른 플레이어와 공유되어 마을에서 실제 테이머를 만나고, 배틀 도전 및 엔드게임 콘텐츠 팀 구성이 가능합니다. 스토리는 30~40시간 분량이며 클리어 후에는 경쟁 랭크 게임이 기다립니다. 전 플랫폼 크로스 플레이로 PC, Switch, PS5, Xbox의 플레이어 풀이 통합됩니다.',
    why_de:
      'Temtem (2022) ist das ambitionierteste Online-Monster-Taming-Spiel, das je entwickelt wurde — ein MMO, das von Grund auf entworfen wurde, um die Dinge zu beheben, die kompetitive Pokémon-Spieler seit Jahrzehnten wollten. Das Spiel findet im Fliegenden Archipel statt, einer Welt aus schwebenden Inseln, und bietet 164 Temtem-Arten mit einem Doppeltyp-System, einem einzigartigen Ausdauermechanismus (Züge kosten Ausdauer, Überbeanspruchung schadet deinen eigenen Temtem) und einem Synchronisierungssystem (bestimmte Züge sind doppelt so stark, wenn beide Partner sie im selben Zug einsetzen). Die Welt wird mit anderen Spielern geteilt — du siehst echte Tamer in Städten, kannst sie zu Kämpfen herausfordern und Gruppen für Endgame-Inhalte bilden. Die Kampagne ist eine vollständige 30-40-stündige Geschichte; nach der Kampagne folgt kompetitives Rangspiel. Cross-Play zwischen allen Plattformen bedeutet, dass der Spielerpool über PC, Switch, PS5 und Xbox zusammengeführt wird.',
    tip_en: "Learn the stamina system before your first trainer battle — overexerting (using a move when you don't have enough stamina) causes recoil damage. The Synchronize mechanic is the key to competitive play: two Temtem using perfectly synced moves in the same turn. Build your team around one or two strong sync pairs and learn their best combinations before entering ranked.",
    tip_zh: '在第一场驯养者战斗之前学习耐力系统——过度消耗（在耐力不足时使用技能）会造成反弹伤害。同步机制是竞争游戏的关键：两只 Temtem 在同一回合使用完美同步的技能。围绕一到两个强力同步对建立你的队伍，并在进入排名前学习他们最好的组合。',
    tip_zhTW: '在第一場馴養者戰鬥之前學習耐力系統——過度消耗（在耐力不足時使用技能）會造成反彈傷害。同步機制是競爭遊戲的關鍵：兩隻 Temtem 在同一回合使用完美同步的技能。圍繞一到兩個強力同步對建立你的隊伍，並在進入排名前學習他們最好的組合。',
    tip_ja: '最初のトレーナーバトルの前に、スタミナシステムを理解しておきましょう——スタミナが足りない状態で技を使うと反動ダメージを受けます。シンクロシステムは対戦の核心：同じターンに2体のテムテムが完璧にシンクロした技を使うと大きなアドバンテージになります。強力なシンクロペアを1〜2組チームの軸にして、ランク戦に入る前にそのベストコンボを覚えておきましょう。',
    tip_ko: '첫 번째 테이머 배틀 전에 스태미나 시스템을 배우세요 — 스태미나가 부족한 상태에서 기술을 사용하면(과사용) 반동 피해가 발생합니다. 동기화 메커니즘이 경쟁 플레이의 핵심입니다. 두 템템이 같은 턴에 완벽하게 동기화된 기술을 사용하는 것이 중요합니다. 강력한 싱크 페어 1~2쌍을 팀의 축으로 삼고, 랭크에 입장하기 전에 최고의 조합을 익혀두세요.',
    tip_de: 'Lerne das Ausdauersystem vor deinem ersten Trainerkampf — Überbeanspruchung (einen Zug verwenden, wenn du nicht genug Ausdauer hast) verursacht Rückstoßschaden. Der Synchronisierungsmechanismus ist der Schlüssel zum kompetitiven Spiel: Zwei Temtem, die im selben Zug perfekt synchronisierte Züge einsetzen. Baue dein Team um ein oder zwei starke Sync-Paare herum auf und lerne ihre besten Kombinationen, bevor du in das Rangspiel einsteigst.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { slime: 0, sanctuary: 0, dqm: 0, temtem: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CreatureRaisingQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/creature-raising-quiz`
    const shareText = getLoc(
      `生物养成游戏推荐测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My creature-raising game recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `生物養成遊戲推薦測驗結果：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `生き物育成ゲーム診断結果：「${result.title_ja}」！${result.tag_ja}。あなたも試してみよう：${url}`,
      `생물 육성 게임 추천 결과：「${result.title_ko}」！${result.tag_ko}。당신의 결과를 찾아보세요：${url}`,
      `Meine Kreatur-Spiel-Empfehlung: ${result.title_de} — ${result.tag_de}. Finde deine: ${url}`,
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
              {getLoc('入门建议：', 'Getting started: ', '入門建議：', 'はじめる前に：', '시작 팁：', 'Erste Schritte: ')}
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
            '哪款生物养成游戏最适合你？',
            'Which Creature-Raising Game Is Right for You?',
            '哪款生物養成遊戲最適合你？',
            'あなたにぴったりの生き物育成ゲームはどれ？',
            '어떤 생물 육성 게임이 당신에게 맞을까요?',
            'Welches Kreatur-Aufzuchtspiel passt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从 Slime Rancher 2、怪物避难所、DQ 怪兽仙境、Temtem 中找到你的养成游戏',
            '6 questions to match you with Slime Rancher 2, Monster Sanctuary, DQ Monsters: The Dark Prince, or Temtem',
            '6 個問題，從 Slime Rancher 2、怪物避難所、DQ 怪獸仙境、Temtem 中找到你的養成遊戲',
            '6つの質問で、スライムランチャー2・モンスターサンクチュアリ・DQモンスターズ3・テムテムの中からあなたにぴったりのゲームを見つけよう',
            '6가지 질문으로 슬라임 랜처 2, 몬스터 생츄어리, DQ 몬스터즈: 다크 프린스, 템템 중 당신에게 맞는 게임 찾기',
            '6 Fragen, um dein Spiel aus Slime Rancher 2, Monster Sanctuary, DQ Monsters: The Dark Prince oder Temtem zu finden',
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
          '找到我的生物养成游戏',
          'Find My Creature Game',
          '找到我的生物養成遊戲',
          '自分の生き物育成ゲームを見つける',
          '내 생물 육성 게임 찾기',
          'Mein Kreatur-Spiel finden',
        )}
      </button>
    </div>
  )
}
