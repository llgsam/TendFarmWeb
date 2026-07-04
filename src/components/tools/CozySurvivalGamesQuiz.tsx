'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'raft' | 'keeper' | 'frontier' | 'grounded'

function ShareButton({ text, locale }: { text: string; locale: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    }
  }
  const copyLabel = copied
    ? (locale === 'zh' ? '✓ 已复制！' : locale === 'zh-TW' ? '✓ 已複製！' : locale === 'ja' ? '✓ コピーしました！' : locale === 'ko' ? '✓ 복사되었습니다!' : locale === 'de' ? '✓ Kopiert!' : '✓ Copied!')
    : (locale === 'zh' ? '📋 复制结果' : locale === 'zh-TW' ? '📋 複製結果' : locale === 'ja' ? '📋 結果をコピー' : locale === 'ko' ? '📋 결과 복사' : locale === 'de' ? '📋 Ergebnis kopieren' : '📋 Copy result')
  const shareLabel = (locale === 'zh' || locale === 'zh-TW') ? '分享' : locale === 'ja' ? 'シェア' : locale === 'ko' ? '공유' : locale === 'de' ? 'Teilen' : 'Share'
  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copyLabel}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
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
    q_en: 'Which survival setting sounds most appealing?',
    q_zh: '哪种生存游戏的场景最吸引你？',
    q_zhTW: '哪種生存遊戲的場景最吸引你？',
    q_ja: 'どの生存環境が一番魅力的に感じますか？',
    q_ko: '어떤 생존 배경이 가장 매력적으로 느껴지나요?',
    q_de: 'Welches Survival-Setting klingt am ansprechendsten für dich?',
    options: [
      {
        en: 'The open ocean — I start on a tiny wooden raft with almost nothing and slowly grow it into a sprawling floating home as I pull debris from the water and fend off the occasional shark',
        zh: '开阔的海洋——我从一个几乎什么都没有的小木筏开始，随着从水中捞起碎片并偶尔抵御鲨鱼攻击，慢慢将其建成庞大的漂浮家园',
        zhTW: '開闊的海洋——從幾乎空無一物的小木筏出發，從海中撈起漂流物，偶爾抵禦鯊魚，慢慢打造漂浮在海上的溫馨家園',
        ja: '広い海——ほぼ何もない小さな木製イカダから始め、海に漂うデブリを拾い集め、時にサメと戦いながら、広大な浮かぶ家を育てていく',
        ko: '탁 트인 바다 — 거의 아무것도 없는 작은 나무 뗏목에서 시작해 물에서 잔해를 건져 올리고 가끔 상어를 막아내면서 천천히 넓은 수상 집을 만들어 가는 것',
        de: 'Der offene Ozean — ich starte auf einem winzigen Holzfloß mit fast nichts und baue es langsam zu einem riesigen schwimmenden Zuhause aus, während ich Treibgut aus dem Wasser ziehe und gelegentlich Haie abwehre',
        type: 'raft',
      },
      {
        en: 'Underground caverns — I dig downward into a procedurally generated world of ancient ruins, rare ores, and strange creatures, building a base around a glowing Core that gradually reveals the world\'s secrets',
        zh: '地下洞穴——我向下挖入程序生成的古代遗迹、稀有矿石和奇特生物世界，在一个逐渐揭示世界秘密的发光核心周围建造基地',
        zhTW: '地下洞穴——向下挖掘進入程序生成的古代遺跡、稀有礦石與奇異生物的世界，在逐漸揭示世界秘密的發光核心周圍建造基地',
        ja: '地下洞窟——プロシージャル生成の古代遺跡、レアな鉱石、奇妙な生物の世界を掘り進め、世界の秘密を徐々に明かす輝くコアの周りに基地を作る',
        ko: '지하 동굴 — 프로시저럴 생성된 고대 유적, 희귀 광석, 이상한 생명체의 세계를 아래로 파내려가며, 세계의 비밀을 서서히 드러내는 빛나는 코어 주변에 기지를 세우는 것',
        de: 'Unterirdische Höhlen — ich grabe mich in eine prozedural generierte Welt aus antiken Ruinen, seltenen Erzen und seltsamen Kreaturen und baue eine Basis um einen leuchtenden Kern, der die Geheimnisse der Welt enthüllt',
        type: 'keeper',
      },
      {
        en: 'An alien planet where I pilot a mech — I land on a colorful extraterrestrial world, pilot a giant walking robot to harvest resources and fight off alien plants, and build a cozy farming settlement between mech missions',
        zh: '我驾驶机甲的外星球——我降落在一个色彩缤纷的外星世界，驾驶巨大的步行机器人收集资源并对抗外星植物，在机甲任务之间建立温馨的农业定居点',
        zhTW: '駕駛機甲的外星球——降落在色彩繽紛的外星世界，駕駛巨型步行機器人採集資源並對抗外星植物，在機甲任務之間建立溫馨的農業聚落',
        ja: 'メックを操縦する惑星——カラフルな異星世界に降り立ち、巨大な歩行ロボットで資源を集め外来植物と戦い、ミッションの合間に居心地の良い農場を作る',
        ko: '메크를 조종하는 외계 행성 — 화려한 외계 세계에 착륙해 거대한 보행 로봇으로 자원을 수확하고 외계 식물과 싸우며, 메크 임무 사이에 아늑한 농업 정착지를 세우는 것',
        de: 'Ein fremder Planet, wo ich einen Mech steuere — ich lande auf einer bunten außerirdischen Welt, steuere einen riesigen Laufroboter zum Ressourcensammeln und kämpfe gegen alien Pflanzen, während ich zwischen Missionen eine gemütliche Farm baue',
        type: 'frontier',
      },
      {
        en: 'A backyard from insect perspective — I am the size of a pebble in a suburban backyard where blades of grass are skyscrapers, spiders are boss-tier enemies, and every household object is a landmark in my survival world',
        zh: '从昆虫视角看到的后院——我只有小石子大小，在郊区后院，一片草叶就是摩天大楼，蜘蛛是精英级敌人，每个家用物品都是我生存世界的地标',
        zhTW: '從昆蟲視角看後院——縮小至小石子的大小，在郊區後院，一根草葉就是摩天大樓，蜘蛛是精英級敵人，每個家用物品都是生存世界的地標',
        ja: '虫の視点で見る裏庭——砂利くらいの大きさになった郊外の裏庭で、草の葉が超高層ビル、クモがボス級の敵、あらゆる家庭用品がサバイバルの目印になる世界',
        ko: '곤충 시점의 뒷마당 — 교외 뒷마당에서 자갈만 한 크기가 되어 풀잎이 고층 빌딩이 되고, 거미가 보스급 적이 되며, 모든 생활용품이 생존 세계의 랜드마크가 되는 것',
        de: 'Ein Garten aus Insektenperspektive — ich bin so groß wie ein Kieselstein in einem Vorgarten, wo Grashalme Wolkenkratzer sind, Spinnen Boss-Gegner und jeder Haushaltsgegenstand ein Wahrzeichen meiner Überlebenswelt',
        type: 'grounded',
      },
    ],
  },
  {
    q_en: 'Do you prefer to play alone or with others?',
    q_zh: '你更喜欢单人游玩还是和朋友一起？',
    q_zhTW: '你更喜歡單人遊玩還是和朋友一起？',
    q_ja: 'ソロプレイとマルチプレイ、どちらが好みですか？',
    q_ko: '혼자 플레이하는 것과 친구들과 함께 하는 것 중 어느 쪽이 더 좋으세요?',
    q_de: 'Spielst du lieber allein oder mit Freunden zusammen?',
    options: [
      {
        en: 'With 1-4 friends online — the best survival memories come from building together, dividing tasks naturally, and having someone to help when the shark attacks at the worst moment',
        zh: '和 1-4 位朋友在线——最好的生存记忆来自共同建造、自然分工，以及在鲨鱼在最糟糕时机攻击时有人帮忙',
        zhTW: '和 1-4 位朋友一起——最美好的生存回憶來自共同建造、自然分工，以及在鯊魚最糟糕時機攻擊時有人相助',
        ja: '1～4人のオンライン友人と——最高のサバイバルの思い出は、一緒に建築し、自然と役割分担が生まれ、サメが最悪なタイミングで来た時に助けてもらえること',
        ko: '1-4명의 친구와 온라인으로 — 최고의 생존 추억은 함께 건설하고, 자연스럽게 역할을 나누고, 상어가 최악의 순간에 공격할 때 누군가 도와주는 것',
        de: 'Mit 1-4 Freunden online — die besten Survival-Erinnerungen entstehen beim gemeinsamen Bauen, natürlicher Aufgabenteilung und wenn jemand hilft, wenn der Hai im schlechtesten Moment angreift',
        type: 'raft',
      },
      {
        en: 'Either works — I am happy solo and the game scales well for up to 8 players online; I could start alone and have friends drop in later without disrupting anything',
        zh: '都可以——我单人游玩很开心，游戏对最多 8 名玩家的在线支持也很好；我可以单独开始，以后朋友加入时不会打断任何流程',
        zhTW: '都可以——單人遊玩很開心，遊戲支援最多 8 人在線合作；可以單獨開始，之後朋友隨時加入都不會打亂流程',
        ja: 'どちらでも——ソロでも十分楽しく、最大8人のオンラインにも対応。ひとりで始めて後から友人が参加しても自然に溶け込める',
        ko: '둘 다 괜찮아요 — 혼자도 충분히 즐겁고 최대 8인 온라인도 잘 지원해요. 혼자 시작하다가 나중에 친구가 참여해도 전혀 방해가 되지 않아요',
        de: 'Beides funktioniert — ich spiele gerne solo und das Spiel skaliert gut für bis zu 8 Spieler online; ich könnte alleine starten und Freunde können später einsteigen ohne etwas zu unterbrechen',
        type: 'keeper',
      },
      {
        en: 'With a co-op partner or small group (1-4) — this game is best when someone else pilots a second mech alongside you, and the farm building feels more rewarding with a friend tending to it together',
        zh: '和合作伙伴或小团队（1-4 人）——当有人驾驶第二台机甲与你并肩时，这款游戏最精彩，和朋友一起打理农场也感觉更有价值',
        zhTW: '和合作夥伴或小團隊（1-4 人）——當有人駕駛第二台機甲並肩作戰時最精彩，和朋友一起打理農場也更有成就感',
        ja: 'コープパートナーか小グループ（1〜4人）——誰かが2台目のメックを並走させる時が一番楽しく、農場も一緒に手入れすると充実感が増す',
        ko: '협동 파트너 또는 소규모 그룹(1-4명) — 누군가 두 번째 메크를 함께 조종할 때 가장 재미있고, 친구와 함께 농장을 가꾸면 더욱 보람차요',
        de: 'Mit einem Co-op-Partner oder einer kleinen Gruppe (1-4) — dieses Spiel macht am meisten Spaß, wenn jemand anderes einen zweiten Mech neben dir steuert, und das Farmbauen fühlt sich befriedigender an, wenn ein Freund mithilft',
        type: 'frontier',
      },
      {
        en: 'With 1-3 close friends — the backyard survival world is best experienced as a squad, with each person specializing in different roles (builder, fighter, farmer, explorer)',
        zh: '和 1-3 位亲密朋友——后院生存世界以小队形式体验最佳，每个人专注于不同角色（建造者、战士、农夫、探索者）',
        zhTW: '和 1-3 位親密朋友——後院生存世界以小隊形式體驗最佳，每個人專注不同角色（建造者、戰士、農夫、探索者）',
        ja: '1〜3人の親しい友人と——裏庭サバイバルは小隊で体験するのが一番。建築、戦闘、農業、探索とそれぞれ役割を担うと最高に楽しい',
        ko: '1-3명의 가까운 친구와 — 뒷마당 생존 세계는 소대로 경험하는 것이 최고예요. 건축가, 전사, 농부, 탐험가로 각자 역할을 맡으면 더 재미있어요',
        de: 'Mit 1-3 engen Freunden — die Gartenüberlebens-Welt erlebt man am besten als Squad, wobei jede Person unterschiedliche Rollen übernimmt (Baumeister, Kämpfer, Bauer, Erkunder)',
        type: 'grounded',
      },
    ],
  },
  {
    q_en: 'Which survival loop sounds most satisfying?',
    q_zh: '哪种生存核心循环最令你满足？',
    q_zhTW: '哪種生存核心循環最令你滿足？',
    q_ja: 'どのサバイバルループが一番満足感を感じますか？',
    q_ko: '어떤 생존 루프가 가장 만족스럽게 느껴지나요?',
    q_de: 'Welcher Survival-Loop klingt am befriedigendsten?',
    options: [
      {
        en: 'Expanding my home base — every resource I pull from the ocean goes toward making my raft bigger, better decorated, and more self-sufficient, until it barely feels like survival and more like floating home ownership',
        zh: '扩大我的大本营——我从海洋中捞到的每一件资源都用于让我的木筏更大、装饰更好、更能自给自足，直到它几乎不像是生存，更像是漂浮的房屋所有权',
        zhTW: '擴大大本營——從海洋中撈到的每件資源都用於讓木筏更大、裝飾更好、更自給自足，直到它不再像是生存，更像是漂浮的房屋所有權',
        ja: '拠点の拡張——海から引き上げた全ての資源をイカダを大きく、より美しく、より自給自足できるものにするために使う。いつしかサバイバルより「海上マイホーム経営」に近くなる',
        ko: '홈 베이스 확장 — 바다에서 건져 올린 모든 자원을 뗏목을 더 크고 아름답고 자급자족 가능하게 만드는 데 투자해요. 어느새 생존보다 수상 집 소유에 가까워져요',
        de: 'Meine Heimatbasis ausbauen — jede Ressource, die ich aus dem Ozean ziehe, geht in ein größeres, schöner dekoriertes und selbstversorgenderes Floß, bis es sich kaum noch wie Überleben anfühlt',
        type: 'raft',
      },
      {
        en: 'Mining deeper and discovering more — every pickaxe swing reveals a new ore, a new enemy type, or a new biome; the loop of "dig, craft, survive, dig deeper" feels endlessly rewarding with each layer revealing new challenges',
        zh: '挖得更深、发现更多——每一次镐击都会揭示新的矿石、新的敌人类型或新的生物群落；"挖掘、制作、生存、再挖更深"的循环感觉无限有趣',
        zhTW: '挖得更深、發現更多——每一次鎬擊都揭示新礦石、新敵人或新生物群落；「挖掘→製作→生存→再深挖」的循環無窮無盡',
        ja: 'より深く掘って、もっと発見する——ピッケルを振るうたびに新しい鉱石、新しい敵、新しいバイオームが現れる。「掘る→クラフト→生き残る→もっと深く」のループが止まらない',
        ko: '더 깊이 파고 더 많이 발견하기 — 곡괭이를 휘두를 때마다 새로운 광석, 새로운 적, 새로운 생물군계가 드러나요. "채굴→제작→생존→더 깊이"의 루프가 끝없이 보람차요',
        de: 'Tiefer graben und mehr entdecken — jeder Pickelhieb enthüllt ein neues Erz, einen neuen Gegnertyp oder ein neues Biom; der Loop aus "graben, craften, überleben, tiefer graben" fühlt sich endlos lohnend an',
        type: 'keeper',
      },
      {
        en: 'Farming and base building with occasional mech combat — the satisfying rhythm is: explore the alien world in my mech, gather materials, return to base, plant crops, build new structures, upgrade the mech, repeat',
        zh: '农业和基地建设，偶尔进行机甲战斗——令人满足的节奏是：驾驶机甲探索外星世界、收集材料、返回基地、种植作物、建造新建筑、升级机甲、循环往复',
        zhTW: '農業和基地建設，偶爾進行機甲戰鬥——令人滿足的節奏：駕駛機甲探索→收集材料→返回基地→種植作物→建造建築→升級機甲→重複',
        ja: '農業とベース建設、時々メック戦闘——満足のいくリズムは「メックで探索→素材集め→基地に戻る→作物を植える→新しい建物を建てる→メックをアップグレード」の繰り返し',
        ko: '농업과 기지 건설, 가끔 메크 전투 — 만족스러운 리듬은 메크로 외계 세계 탐험→자원 수집→기지 귀환→작물 심기→새 건물 건설→메크 업그레이드→반복이에요',
        de: 'Farming und Basisbau mit gelegentlichem Mech-Kampf — der befriedigende Rhythmus: fremde Welt im Mech erkunden, Materialien sammeln, zur Basis zurück, Ernten pflanzen, neue Strukturen bauen, Mech upgraden, wiederholen',
        type: 'frontier',
      },
      {
        en: 'Crafting gear from creature parts — every bug I defeat drops materials that craft into specific armor and weapon sets; the gear progression loop of "kill bug → craft its armor → access new area → find stronger bugs" is the game\'s spine',
        zh: '用生物部件制作装备——每只我击败的虫子都会掉落用于制作特定护甲和武器套装的材料；装备进度循环是游戏的骨干',
        zhTW: '用生物部件製作裝備——每隻擊敗的蟲子都掉落用於製作特定護甲和武器套裝的材料；「殺蟲→製作護甲→進入新區域→發現更強蟲子」的循環是遊戲的核心',
        ja: '生物の素材でギアを作る——倒した虫が素材をドロップし、専用のアーマーや武器に変わる。「虫を倒す→鎧をクラフト→新エリアへ→もっと強い虫を見つける」という進行が本作の骨格',
        ko: '생물 부품으로 장비 제작 — 처치한 벌레마다 특정 방어구와 무기 세트를 만드는 재료가 드롭돼요. "벌레 처치→방어구 제작→새 지역 접근→더 강한 벌레 발견"의 루프가 게임의 핵심이에요',
        de: 'Ausrüstung aus Kreaturenteilen craften — jeder besiegte Käfer droppt Materialien für spezifische Rüstungs- und Waffensets; der Fortschrittsloop "Käfer töten → Rüstung craften → neues Gebiet → stärkere Käfer" ist das Herzstück',
        type: 'grounded',
      },
    ],
  },
  {
    q_en: 'How do you feel about tension and danger?',
    q_zh: '你对紧张感和危险的感受是？',
    q_zhTW: '你對緊張感和危險的感受是？',
    q_ja: '緊張感や危険についてどう感じますか？',
    q_ko: '긴장감과 위험에 대해 어떻게 느끼시나요?',
    q_de: 'Wie stehst du zu Spannung und Gefahr?',
    options: [
      {
        en: 'Mild tension is fine — the occasional shark attack keeps things interesting without being constant, and I can build shark bait to redirect attacks so I feel in control even during dangerous moments',
        zh: '轻度紧张感没问题——偶尔的鲨鱼攻击让事情保持有趣而不是持续不断，我可以制作鲨鱼诱饵来转移攻击',
        zhTW: '輕度緊張感沒問題——偶爾的鯊魚攻擊讓遊戲保持有趣而不是持續威脅，可以製作鯊魚誘餌來轉移攻擊',
        ja: '軽い緊張感ならOK——たまに来るサメの攻撃が適度なスパイスになる。サメの餌を作って攻撃を誘導できるので、危険な瞬間もコントロール感がある',
        ko: '약간의 긴장감은 괜찮아요 — 가끔 오는 상어 공격이 흥미를 유지시켜 줘요. 상어 미끼를 만들어 공격을 유도할 수 있어서 위험한 순간에도 통제감을 느껴요',
        de: 'Leichte Anspannung ist okay — der gelegentliche Haiangriff hält es interessant, ohne ständig präsent zu sein, und ich kann Haifischköder bauen, um Angriffe umzuleiten',
        type: 'raft',
      },
      {
        en: 'Comfortable tension — the underground has enemies, but combat is slow-paced enough that I can retreat and heal; Custom difficulty lets me tune danger levels so I can focus on exploration and building if I prefer',
        zh: '舒适的紧张感——地下有敌人，但战斗节奏足够缓慢，我可以撤退并治疗；自定义难度让我调整危险等级',
        zhTW: '舒適的緊張感——地下有敵人，但戰鬥節奏夠緩慢，可以撤退療傷；自訂難度讓我調整危險等級，專注探索和建造',
        ja: '程よい緊張感——地下に敵はいるが戦闘はゆったりしていて引いて回復できる。カスタム難易度で危険レベルを調整でき、探索や建設に集中することも可能',
        ko: '편안한 긴장감 — 지하에 적이 있지만 전투 속도가 느려 후퇴해 치유할 수 있어요. 커스텀 난이도로 위험 수준을 조절해 탐험과 건설에 집중할 수 있어요',
        de: 'Angenehme Spannung — die Unterwelt hat Feinde, aber der Kampf ist langsam genug, um sich zurückzuziehen und zu heilen; Custom-Schwierigkeit lässt mich Gefahren anpassen',
        type: 'keeper',
      },
      {
        en: 'Very minimal — Lightyear Frontier has the lowest danger ceiling of this group; enemies exist but the mech absorbs most damage, and the game actively encourages the cozy farming loop over combat',
        zh: '极其轻微——Lightyear Frontier 在这个组合中危险上限最低；敌人存在但机甲吸收大部分伤害，游戏积极鼓励温馨的农业循环而非战斗',
        zhTW: '極其輕微——Lightyear Frontier 危險上限最低；敵人存在但機甲吸收大部分傷害，遊戲積極鼓勵溫馨農業循環而非戰鬥',
        ja: 'かなり少なめ——このグループで最も危険が低い。敵は存在するがメックがほとんどのダメージを吸収し、ゲームは戦闘よりのんびり農業ループを積極的に推奨している',
        ko: '아주 최소한 — Lightyear Frontier는 이 그룹에서 위험 수준이 가장 낮아요. 적이 있지만 메크가 대부분의 피해를 흡수하고, 게임은 전투보다 아늑한 농업 루프를 적극 권장해요',
        de: 'Sehr minimal — Lightyear Frontier hat die niedrigste Gefahrenschwelle dieser Gruppe; Feinde existieren, aber der Mech absorbiert den meisten Schaden, und das Spiel fördert aktiv den gemütlichen Farming-Loop',
        type: 'frontier',
      },
      {
        en: 'Moderate tension with genuine stakes — spiders and wolf spiders feel authentically scary, night is significantly more dangerous than day, and the survival loop has real weight; adjustable difficulty makes it accessible',
        zh: '有真实风险的适中紧张感——蜘蛛和狼蛛感觉真实地令人害怕，夜晚明显比白天危险；可调难度使其易上手',
        zhTW: '有真實風險的適中緊張感——蜘蛛和狼蛛真實地令人害怕，夜晚明顯比白天危險；可調難度讓各種玩家都能享受',
        ja: '本物の緊張感——クモやオオカミグモは本当に怖く感じられ、夜は昼より明らかに危険。生存ループに重みがある。難易度調整で初心者も楽しめる',
        ko: '진짜 긴장감이 있는 적당한 위험 — 거미와 늑대거미는 실제로 무섭게 느껴지고, 밤은 낮보다 훨씬 위험해요. 생존 루프에 실제 무게감이 있어요. 난이도 조절 가능',
        de: 'Moderate Spannung mit echten Konsequenzen — Spinnen und Wolfsspinnen fühlen sich authentisch gruselig an, die Nacht ist deutlich gefährlicher als der Tag; einstellbare Schwierigkeit macht es zugänglich',
        type: 'grounded',
      },
    ],
  },
  {
    q_en: 'What would your ideal in-game home look like?',
    q_zh: '你理想中的游戏内家园是什么样的？',
    q_zhTW: '你理想中的遊戲內家園是什麼樣的？',
    q_ja: '理想のゲーム内の家はどんな感じですか？',
    q_ko: '이상적인 게임 내 집은 어떤 모습인가요?',
    q_de: 'Wie würde dein ideales Zuhause im Spiel aussehen?',
    options: [
      {
        en: 'A large multi-level raft with separate rooms — a bedroom, a kitchen with a cooking station, a garden section growing sugarcane and potatoes, an engine room, and a top deck for stargazing',
        zh: '一个有独立房间的多层大木筏——卧室、有烹饪台的厨房、种着甘蔗和土豆的花园区、发动机舱，以及观星的顶层甲板',
        zhTW: '一個有獨立房間的多層大木筏——臥室、有烹飪台的廚房、種著甘蔗和馬鈴薯的花園區、引擎艙，以及觀星的頂層甲板',
        ja: '個室がある大きな多層イカダ——寝室、調理台付きキッチン、サトウキビとジャガイモを育てるガーデンエリア、エンジンルーム、そして星を見る最上デッキ',
        ko: '독립 공간이 있는 크고 다층적인 뗏목 — 침실, 조리대가 있는 주방, 사탕수수와 감자를 기르는 정원 구역, 엔진실, 그리고 별 관찰을 위한 최상층 갑판',
        de: 'Ein großes mehrstöckiges Floß mit separaten Räumen — ein Schlafzimmer, eine Küche mit Kochstation, ein Gartenbereich mit Zuckerrohr und Kartoffeln, ein Motorraum und ein Oberdeck zum Sternegucken',
        type: 'raft',
      },
      {
        en: 'A sprawling underground base carved into cave walls — organized storage rooms for each ore type, a mushroom farm under artificial light, and a central crafting hall with every workstation unlocked',
        zh: '一个雕刻在洞穴壁中的庞大地下基地——每种矿石都有组织良好的储藏室，有在人工光下发光蘑菇的农场区，以及拥有所有工作台的中央制作大厅',
        zhTW: '雕刻在洞穴壁中的龐大地下基地——每種礦石有整齊的儲藏室、人工光下的蘑菇農場，以及解鎖所有工作台的中央製作大廳',
        ja: '洞窟の壁に刻まれた広大な地下基地——鉱石ごとに整理された倉庫、人工光の下でキノコを育てるファーム、全てのワークステーションが揃った中央クラフトホール',
        ko: '동굴 벽에 새겨진 광대한 지하 기지 — 광석 종류별로 정리된 창고방, 인공 조명 아래 버섯 농장, 모든 작업대가 갖춰진 중앙 제작 홀',
        de: 'Eine weitläufige unterirdische Basis in Höhlenwände geschnitzt — geordnete Lagerräume für jede Erzart, eine Pilzfarm unter künstlichem Licht und eine zentrale Handwerkshalle mit allen Arbeitsstationen',
        type: 'keeper',
      },
      {
        en: 'A colorful alien farm settlement — crop fields in neat rows, a mech hangar where I upgrade my robot, decorative alien plants, and a viewing platform overlooking the orange sunset of another planet',
        zh: '一个色彩缤纷的外星农场定居点——整齐成排的农田、我升级机器人的机甲机库、装饰性外星植物，以及俯瞰另一个星球橙色日落的观景台',
        zhTW: '色彩繽紛的外星農場聚落——整齊成排的農田、升級機器人的機甲機庫、裝飾性外星植物，以及俯瞰另一個星球橙色日落的觀景台',
        ja: 'カラフルな異星農場の集落——整然とした農地、メックをアップグレードするハンガー、装飾的な外来植物、そして別の惑星のオレンジの夕日を見渡す展望台',
        ko: '화려한 외계 농장 정착지 — 가지런한 농경지, 로봇을 업그레이드하는 메크 격납고, 장식용 외계 식물, 그리고 다른 행성의 주황빛 노을을 내려다보는 전망대',
        de: 'Eine bunte alien Farmansiedlung — Felder in ordentlichen Reihen, ein Mech-Hangar zum Upgraden meines Roboters, dekorative außerirdische Pflanzen und eine Aussichtsplattform mit Blick auf den orangenen Sonnenuntergang',
        type: 'frontier',
      },
      {
        en: 'A fortified compound in an acorn — built inside or around a huge acorn structure in the backyard, with walls to keep insects out, a garden for growing mushrooms, a lab for analyzing materials, and ziplines connecting it all',
        zh: '橡子里的防御营地——在后院巨大橡子结构内或周围建造，有阻挡昆虫的围墙、种植蘑菇的花园、分析新材料的实验室，以及连接一切的滑索',
        zhTW: '橡子裡的防禦營地——在後院巨大橡子結構內外建造，有阻擋昆蟲的圍牆、種植蘑菇的花園、分析材料的實驗室，以及連接一切的滑索',
        ja: 'ドングリの要塞コンパウンド——裏庭の巨大なドングリの構造物の中か周りに建て、虫を防ぐ壁、キノコ栽培の庭、素材分析の研究室、全てをつなぐジップラインがある',
        ko: '도토리 안의 요새 — 뒷마당의 거대한 도토리 구조물 안팎에 지어진, 곤충을 막는 벽, 버섯 재배 정원, 재료 분석 연구실, 그리고 모든 것을 연결하는 집라인이 있는 곳',
        de: 'Eine befestigte Anlage in einer Eichel — gebaut in oder um eine riesige Eichelstruktur im Garten, mit Wänden gegen Insekten, einem Pilzgarten, einem Labor für Materialanalysen und Seilbahnen die alles verbinden',
        type: 'grounded',
      },
    ],
  },
  {
    q_en: 'Which post-session feeling sounds most satisfying?',
    q_zh: '哪种游玩后的感觉最令你满足？',
    q_zhTW: '哪種遊玩後的感覺最令你滿足？',
    q_ja: 'プレイ後にどんな感覚を求めていますか？',
    q_ko: '게임 세션 후 어떤 느낌이 가장 만족스럽게 들리나요?',
    q_de: 'Welches Gefühl nach einer Spielsitzung klingt am befriedigendsten?',
    options: [
      {
        en: 'I just discovered a story island with a new research note that advanced the game\'s mystery, and I picked up enough resources to add two new rooms to my raft — everything feels like it\'s growing toward something',
        zh: '我刚发现了一个有新研究笔记的故事岛，推进了游戏的谜题，我捡到了足够资源为木筏增加两个新房间——一切都感觉在向某个目标成长',
        zhTW: '剛發現了一個有新研究筆記的故事島，推進了遊戲謎題，撿到足夠資源為木筏增加兩個新房間——一切都感覺在朝某個目標成長',
        ja: 'ストーリー島を発見して新しい研究メモで謎が進み、木筏に2つの新しい部屋を追加できるほどの資源も拾えた——すべてが何かに向かって育っている感じ',
        ko: '새 연구 노트가 있는 스토리 섬을 발견해 게임의 미스터리가 진행되고, 뗏목에 방 두 개를 추가할 자원도 충분히 모았어요 — 모든 것이 무언가를 향해 성장하는 느낌',
        de: 'Ich habe gerade eine Story-Insel mit einem neuen Forschungsnotiz entdeckt, die das Spiel-Mysterium vorantrieb, und genug Ressourcen für zwei neue Räume auf meinem Floß gesammelt — alles fühlt sich an als würde es wachsen',
        type: 'raft',
      },
      {
        en: 'I just broke into a new biome below the Sunken Sea and found a new ore I\'ve never seen before — the fact that I still don\'t know what\'s down there is the most exciting thing about this game',
        zh: '我刚突破到沉没之海下方的新生物群落，发现了我从未见过的新矿石——我仍然不知道下面有什么，这是这款游戏最令人兴奋的事情',
        zhTW: '剛突破到沉沒之海下方的新生物群落，發現了從未見過的新礦石——仍然不知道下面有什麼，這是這款遊戲最令人興奮的事',
        ja: '沈んだ海の下の新しいバイオームに突入して、見たことのない新しい鉱石を発見した——まだ下に何があるかわからないのが、このゲームで一番わくわくすること',
        ko: '침몰한 바다 아래의 새 생물군계를 돌파해 한 번도 본 적 없는 새 광석을 발견했어요 — 아직 아래에 뭐가 있는지 모른다는 사실이 이 게임에서 가장 흥미진진한 점이에요',
        de: 'Ich bin gerade in ein neues Biom unter dem versunkenen Meer eingebrochen und habe ein neues Erz gefunden — die Tatsache, dass ich noch nicht weiß was dort unten ist, macht dieses Spiel so aufregend',
        type: 'keeper',
      },
      {
        en: 'My mech just got a new upgrade that lets me access the third biome, my crop fields are automatically harvesting, and the alien settlement genuinely looks beautiful in the setting sun — survival never felt this cozy',
        zh: '我的机甲刚获得了可以进入第三个生物群落的新升级，我的农田自动收割，外星定居点在夕阳下看起来真的很美——生存从来没有感觉这么温馨',
        zhTW: '機甲剛獲得可進入第三生物群落的新升級，農田自動收割，外星聚落在夕陽下真的很美——生存從未如此溫馨',
        ja: 'メックが第3バイオームにアクセスできる新アップグレードを入手し、農地は自動収穫中。夕日の中で異星の集落が本当に美しく見える——サバイバルってこんなにコージーになれるんだ',
        ko: '메크가 세 번째 생물군계에 접근할 수 있는 새 업그레이드를 받았고, 농경지는 자동으로 수확 중이에요. 외계 정착지가 지는 해 속에서 정말 아름답게 보여요 — 생존이 이렇게 아늑할 수 있다니',
        de: 'Mein Mech hat gerade ein Upgrade erhalten, das mir Zugang zum dritten Biom gibt, meine Felder ernten automatisch, und die Alien-Siedlung sieht im Sonnenuntergang wirklich wunderschön aus — Überleben hat sich nie so gemütlich angefühlt',
        type: 'frontier',
      },
      {
        en: 'My group just defeated the Broodmother spider boss — it was genuinely tense and we each had a specific role that made the win feel collective; the Black Widow armor set we\'re all now crafting feels like a reward worth fighting for',
        zh: '我的小队刚击败了蜘蛛女王 Boss——这真的很紧张，我们每个人都有使胜利感觉集体的特定角色；我们现在都在制作的黑寡妇护甲套装感觉是值得为之战斗的奖励',
        zhTW: '小隊剛擊敗了蜘蛛女王 Boss——真的很緊張，每個人都有各自的角色讓勝利感覺像是集體的成就；現在大家都在製作的黑寡婦護甲套裝感覺是值得戰鬥的獎勵',
        ja: 'グループで巣の女王クモボスを倒した——本当に緊迫感があり、それぞれが役割を持って勝利できたことが達成感につながった。今みんなが作っているブラックウィドウアーマーセットは戦い甲斐のある報酬',
        ko: '우리 그룹이 방직모 거미 보스를 방금 처치했어요 — 정말 긴장감 넘쳤고 각자 역할이 있어서 승리가 집단적으로 느껴졌어요. 이제 모두가 제작 중인 블랙 위도우 방어구 세트는 싸울 만한 보상이에요',
        de: 'Meine Gruppe hat gerade die Broodmother Spinnen-Boss besiegt — es war wirklich angespannt und jeder hatte eine spezifische Rolle, die den Sieg kollektiv anfühlen ließ; das Black Widow-Rüstungsset das wir alle jetzt craften fühlt sich wie eine lohnende Belohnung an',
        type: 'grounded',
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
  raft: {
    title_en: 'Raft', title_zh: 'Raft 木筏求生', title_zhTW: 'Raft 木筏求生', title_ja: 'Raft', title_ko: '래프트', title_de: 'Raft',
    emoji: '🌊',
    tag_en: 'Start with a tiny raft and a hook. Pull debris from the ocean. Build a floating home. The most cozy survival game on Steam.',
    tag_zh: '从一个小木筏和一把钩子开始。从海洋中捞起碎片。建造漂浮家园。Steam 上最 Cozy 的生存游戏。',
    tag_zhTW: '從小木筏和鉤子出發，從海洋撈起漂流物，建造漂浮家園。Steam 上最溫馨的生存遊戲。',
    tag_ja: '小さなイカダとフックから始める。海からデブリを拾い、浮かぶ家を作る。Steamで最もコージーなサバイバルゲーム。',
    tag_ko: '작은 뗏목과 갈고리로 시작해 바다에서 잔해를 건져 수상 집을 짓는 Steam 최고의 아늑한 생존 게임.',
    tag_de: 'Starte mit einem kleinen Floß und einem Haken. Ziehe Treibgut aus dem Ozean. Baue ein schwimmendes Zuhause. Das gemütlichste Survival-Spiel auf Steam.',
    platform_en: 'Available on: PC (Steam) only — about $21. Supports 1-4 player online co-op.',
    platform_zh: '可在以下平台获取：仅 PC（Steam）——约 21 美元。支持 1-4 人在线合作。',
    platform_zhTW: '平台：僅 PC（Steam）——約 21 美元。支援 1-4 人在線合作。',
    platform_ja: 'PC（Steam）専用——約21ドル。1〜4人のオンラインCo-op対応。',
    platform_ko: 'PC(Steam) 전용 — 약 $21. 1-4인 온라인 협동 지원.',
    platform_de: 'Verfügbar auf: Nur PC (Steam) — ca. 21 $. Unterstützt 1-4 Spieler Online-Koop.',
    why_en: "Raft (2022, Redbeet Interactive) is a survival game that has a uniquely cozy heart. You start on a 4×4 raft with just a hook on a rope — the entire game begins from swinging the hook to catch floating debris. Everything you build is made from materials caught in the ocean or found on story islands. The game has a full narrative with mystery islands that advance a story about a civilization lost to the flood. Building your raft is deeply satisfying: design it any way you choose, decorate with furniture and paint, and watch it transform from a desperate escape platform into something genuinely beautiful. Overwhelmingly Positive on Steam from 200,000+ reviews. Main story runs 30-40 hours; open-ended survival continues indefinitely.",
    why_zh: 'Raft（2022 年，Redbeet Interactive）是一款具有独特温馨核心的生存游戏。你从一个 4×4 的海洋中央木筏开始，手里只有一根绳子和一个钩子。你建造的一切都由从海洋中捕获或在故事岛屿上找到的材料制成。游戏有完整的故事模式，带有谜题岛屿。建造木筏非常令人满足：你可以任意设计，用家具和油漆装饰。Steam 压倒性好评，20 万以上评价。',
    why_zhTW: 'Raft（2022，Redbeet Interactive）是一款充滿溫馨核心的生存遊戲。從海洋中央的 4×4 木筏開始，只有一根繩子和一個鉤子。所有建造材料都來自海洋或故事島嶼。遊戲有完整的敘事和謎題島嶼。建造木筏極其令人滿足，可自由設計並用家具和油漆裝飾。Steam 壓倒性好評，超過 20 萬則評價。',
    why_ja: 'Raft（2022年、Redbeet Interactive）は独特な居心地の良さを持つサバイバルゲーム。海の上の4×4のイカダからフック1本だけで始まる。海のデブリやストーリー島で集めた素材で全てを建設する。謎が進むストーリーモードがあり、イカダのデザインは自由自在。Steamで20万以上のレビューを持ち圧倒的好評。メインストーリーは30〜40時間。',
    why_ko: 'Raft(2022, Redbeet Interactive)는 독특하게 아늑한 생존 게임이에요. 바다 위 4×4 뗏목에서 갈고리 하나만 들고 시작해요. 바다나 스토리 섬에서 모은 재료로 모든 것을 건설해요. 문명이 홍수로 사라진 이야기를 담은 스토리 모드가 있어요. Steam에서 20만 개 이상의 평가를 받아 압도적으로 긍정적이에요.',
    why_de: 'Raft (2022, Redbeet Interactive) ist ein Survival-Spiel mit einem einzigartig gemütlichen Kern. Du startest auf einem 4×4-Floß im Ozean mit nur einem Haken am Seil. Alles wird aus Treibgut und Materialien von Story-Inseln gebaut. Das Spiel hat einen vollständigen Narrativ-Modus. Das Floß-Bauen ist tief befriedigend — gestalte es nach deinen Wünschen. Überwältigend positiv auf Steam mit 200.000+ Bewertungen.',
    tip_en: "Prioritize the Water Purifier and Cooking Pot before anything else — thirst and hunger kill faster than sharks. Build Shark Bait from Rope and Herring to redirect the shark during island trips. The Antenna is the most important mid-game goal: it receives story radio signals. In co-op, designate one person as the main hook-thrower early on.",
    tip_zh: '在其他任何事情之前优先制作净水器和烹饪锅——口渴和饥饿比鲨鱼杀死你更快。用绳子和鲱鱼制作鲨鱼诱饵来转移鲨鱼。天线是游戏中期最重要的制作目标：它接收故事广播信号。合作游玩时，早期指定一个人专门负责甩钩。',
    tip_zhTW: '優先製作淨水器和烹飪鍋——口渴和飢餓比鯊魚更快殺死你。用繩子和鯡魚製作鯊魚誘餌轉移攻擊。天線是中期最重要的製作目標，接收故事廣播信號。合作時，早期指定一人專門負責甩鉤。',
    tip_ja: '浄水器と調理鍋を最優先に——喉の渇きと空腹はサメより早く倒す。ロープとニシンでサメの餌を作り攻撃を誘導しよう。アンテナが中盤最重要の制作目標。Co-opでは早めにフック担当を決めよう。',
    tip_ko: '정수기와 조리 냄비를 가장 먼저 제작하세요 — 갈증과 굶주림이 상어보다 빨리 죽여요. 밧줄과 청어로 상어 미끼를 만들어 공격을 유도하세요. 안테나가 중반전 가장 중요한 제작 목표예요. 협동 플레이에서는 일찍 갈고리 담당을 정하세요.',
    tip_de: 'Priorisiere Wasserreiniger und Kochtopf vor allem anderen — Durst und Hunger töten schneller als Haie. Bau Haifischköder aus Seil und Hering, um den Hai umzulenken. Die Antenne ist das wichtigste Mid-Game-Crafting-Ziel. Im Koop: frühzeitig eine Person als Haken-Werfer bestimmen.',
  },
  keeper: {
    title_en: 'Core Keeper', title_zh: '核心守护者', title_zhTW: '核心守護者', title_ja: 'コアキーパー', title_ko: '코어 키퍼', title_de: 'Core Keeper',
    emoji: '⛏️',
    tag_en: 'A cozy top-down mining and farming survival game — dig underground, discover ancient biomes, grow mushroom farms, fight rare bosses.',
    tag_zh: '一款温馨的俯视角挖掘和农业生存游戏——挖掘地下、发现古老生物群落、种植蘑菇农场、击败稀有 Boss。',
    tag_zhTW: '溫馨的俯視角挖掘農業生存遊戲——地下挖掘、探索古老生物群落、種植蘑菇農場、擊敗稀有 Boss。',
    tag_ja: '居心地の良い見下ろし型採掘・農業サバイバル——地下を掘り、古代バイオームを発見し、キノコ農場を育て、レアボスと戦う。',
    tag_ko: '아늑한 탑다운 채굴·농업 생존 게임 — 지하를 파고, 고대 생물군계를 발견하고, 버섯 농장을 키우고, 희귀 보스와 싸워요.',
    tag_de: 'Ein gemütliches Top-Down-Mining- und Farming-Survival-Spiel — grabe unterirdisch, entdecke antike Biome, baue Pilzfarmen, kämpfe gegen seltene Bosse.',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation, Xbox — about $17. Supports 1-8 player online co-op.',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation、Xbox——约 17 美元。支持 1-8 人在线合作。',
    platform_zhTW: '平台：PC（Steam）、Nintendo Switch、PlayStation、Xbox——約 17 美元。支援 1-8 人在線合作。',
    platform_ja: 'PC（Steam）、Nintendo Switch、PlayStation、Xbox——約17ドル。1〜8人のオンラインCo-op対応。',
    platform_ko: 'PC(Steam), 닌텐도 스위치, PlayStation, Xbox — 약 $17. 1-8인 온라인 협동 지원.',
    platform_de: 'Verfügbar auf: PC (Steam), Nintendo Switch, PlayStation, Xbox — ca. 17 $. Unterstützt 1-8 Spieler Online-Koop.',
    why_en: "Core Keeper (2024 full release, Pugstorm) is the most Stardew Valley-adjacent survival game — a top-down game combining Terraria-style underground mining with farming and base building. You wake up in an underground cavern beside a dormant ancient Core that illuminates the starting area. You dig tunnels into the dark, discover biomes (a glowing mushroom forest, ancient ruins, crystalline ice regions), fight biome-specific bosses for their materials, and bring those materials back to craft new gear and expand your base farm. The farming system — growing mushrooms, carrots, wheat — feels genuinely cozy like Stardew Valley underground. Fully cross-platform with 1-8 online co-op. Custom difficulty for a more relaxed experience. Main story runs 30-50 hours.",
    why_zh: '核心守护者（2024 年完整版，Pugstorm）是这个列表中最接近星露谷物语的生存游戏——将泰拉瑞亚风格的地下挖掘与农业和基地建设结合在一起。你醒来在一个发光的古代核心旁边。你挖掘隧道进入黑暗，发现生物群落（发光蘑菇森林、古代文明遗迹、水晶冰川区域），为材料与 Boss 战斗。跨平台，1-8 人在线合作，主线 30-50 小时。',
    why_zhTW: '核心守護者（2024完整版，Pugstorm）是最接近星露谷的生存遊戲——結合泰拉瑞亞風格地下採掘與農業建設。在古老發光核心旁醒來，挖掘隧道發現各種生物群落，擊敗Boss獲取材料。全平台支援1-8人合作，主線30-50小時。',
    why_ja: 'コアキーパー（2024年完全版、Pugstorm）はスターデューバレーに最も近いサバイバルゲーム。テラリア風の地下採掘に農業とベース建設を組み合わせた見下ろし型ゲーム。古代コアの横で目覚め、暗闇へ掘り進めバイオームを発見。全プラットフォームで1〜8人Co-op対応。メインストーリーは30〜50時間。',
    why_ko: '코어 키퍼(2024 정식 출시, Pugstorm)는 스타듀 밸리에 가장 가까운 생존 게임이에요. 테라리아식 지하 채굴에 농업과 기지 건설을 결합했어요. 고대 코어 옆에서 깨어나 어둠 속으로 터널을 파고 생물군계를 발견해요. 모든 플랫폼에서 1-8인 협동 지원. 메인 스토리 30-50시간.',
    why_de: 'Core Keeper (2024 Vollversion, Pugstorm) ist das Stardew-Valley-nächste Survival-Spiel — kombiniert Terraria-artiges Untergrund-Mining mit Farming und Basisbau. Du erwachst in einem Höhlenraum neben einem leuchtenden Kern. Grabe Tunnel ins Dunkle, entdecke Biome, kämpfe gegen Bosse. Vollständig Cross-Platform mit 1-8 Online-Koop. Hauptstory: 30-50 Stunden.',
    tip_en: "Carry a torch at all times — darkness reduces movement speed. The first three bosses (Glurch, Ghorm, Hive Mother) can be defeated in any order and each drops a Relic Shard; after defeating all three, the Core activates. Farm mushrooms early: Bomb Pepper Mushroom is the best early food. In multiplayer, assign someone to farm while others explore.",
    tip_zh: '随时携带火炬——黑暗会降低移动速度。前三个 Boss（格鲁奇、格鲁姆、蜂巢母亲）可以按任意顺序击败，击败全部后核心激活。早期种植蘑菇：炸弹辣椒蘑菇是最好的早期食物。多人游戏中，指定一人负责农场。',
    tip_zhTW: '隨時攜帶火炬——黑暗降低移動速度。前三個Boss可任意順序擊敗，全部擊敗後核心啟動。早期種植蘑菇：炸彈辣椒蘑菇是最佳早期食物。多人遊戲中，指定一人負責農場。',
    tip_ja: '常にたいまつを携帯——暗闇は移動速度を下げる。最初の3ボス（グルーチ、ゴーム、ハイブマザー）は任意の順番で倒せ、全て倒すとコアが起動。早めにキノコ栽培を始めよう。マルチでは農業担当を決めると効率的。',
    tip_ko: '항상 횃불을 들고 다니세요 — 어둠은 이동 속도를 낮춰요. 첫 세 보스는 순서 무관하게 처치 가능하며, 모두 처치하면 코어가 활성화돼요. 초반 버섯 재배를 시작하세요. 멀티에서는 농업 담당을 정하세요.',
    tip_de: 'Trage immer eine Fackel — Dunkelheit verringert die Bewegungsgeschwindigkeit. Die ersten drei Bosse können in beliebiger Reihenfolge besiegt werden; danach aktiviert sich der Kern. Züchte früh Pilze. Im Multiplayer: eine Person für die Farm einteilen.',
  },
  frontier: {
    title_en: 'Lightyear Frontier', title_zh: '光年边疆', title_zhTW: '光年邊疆', title_ja: 'ライトイヤーフロンティア', title_ko: '라이트이어 프론티어', title_de: 'Lightyear Frontier',
    emoji: '🤖',
    tag_en: 'The most cozy survival game on this list — pilot a giant mech on an alien planet, grow crops, build a colorful settlement with zero pressure.',
    tag_zh: '这个列表中最 Cozy 的生存游戏——在外星球上驾驶巨型机甲、种植农作物、建造色彩缤纷的定居点，零压力。',
    tag_zhTW: '清單中最溫馨的生存遊戲——在外星球駕駛巨型機甲、種植農作物、建造色彩繽紛的聚落，零壓力。',
    tag_ja: 'このリストで最もコージーなサバイバルゲーム——異星でメックを操縦し、作物を育て、カラフルな集落を建てる。プレッシャーゼロ。',
    tag_ko: '이 목록에서 가장 아늑한 생존 게임 — 외계 행성에서 메크를 조종하고, 작물을 기르고, 화려한 정착지를 세워요. 압박감 제로.',
    tag_de: 'Das gemütlichste Survival-Spiel auf dieser Liste — steuere einen Riesen-Mech auf einem Alien-Planeten, baue Ernten an, errichte eine bunte Siedlung ohne Druck.',
    platform_en: 'Available on: PC (Steam), Xbox (Game Pass) — about $30. Included in Game Pass. Supports 1-4 player online co-op.',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox（Game Pass）——约 30 美元。Game Pass 包含。支持 1-4 人在线合作。',
    platform_zhTW: '平台：PC（Steam）、Xbox（Game Pass）——約 30 美元。Game Pass 包含。支援 1-4 人在線合作。',
    platform_ja: 'PC（Steam）、Xbox（Game Pass）——約30ドル。Game Pass対応。1〜4人のオンラインCo-op対応。',
    platform_ko: 'PC(Steam), Xbox(Game Pass) — 약 $30. Game Pass 포함. 1-4인 온라인 협동 지원.',
    platform_de: 'Verfügbar auf: PC (Steam), Xbox (Game Pass) — ca. 30 $. Im Game Pass enthalten. Unterstützt 1-4 Spieler Online-Koop.',
    why_en: "Lightyear Frontier (2024, Frame Break) is the farming-survival hybrid that most closely matches what a Stardew Valley player would want from survival. You pilot a customizable mech on a vibrant alien planet — the mech is your primary tool for everything: harvesting crops, gathering resources, watering fields, and fighting alien plant corruptions. The mech absorbs almost all damage so the game never feels punishing. The settlement building loop is pure cozy farming: tend your crops, build new structures, discover alien seeds. The alien planet is genuinely beautiful — warm sunsets and strange flora. Game Pass included (free with subscription), co-op supports 1-4 players.",
    why_zh: '光年边疆（2024 年，Frame Break）是最接近星露谷物语玩家想要的生存类型农场游戏混合体。你在充满活力的外星球上驾驶可定制的机甲——机甲是一切的工具：收割农作物、收集资源、给田地浇水，并与外星植物腐败战斗。机甲吸收几乎所有伤害，所以游戏从不惩罚性。Game Pass 包含，合作支持 1-4 人。',
    why_zhTW: '光年邊疆（2024，Frame Break）是最接近星露谷玩家期待的生存農場混合體。駕駛可定製機甲在活力外星球上——機甲是一切工具：收割作物、採集資源、澆水、對抗外星植物腐蝕。機甲吸收幾乎所有傷害，遊戲絕不懲罰玩家。Game Pass包含，1-4人合作。',
    why_ja: 'ライトイヤーフロンティア（2024年、Frame Break）はスターデューバレーファンが求める農業サバイバルの理想的な組み合わせ。カスタム可能なメックで鮮やかな異星を探索し、作物を育て、定住地を作る。メックがほぼ全ダメージを吸収するので安心して楽しめる。Game Pass対応、1〜4人Co-op。',
    why_ko: '라이트이어 프론티어(2024, Frame Break)는 스타듀 밸리 팬이 생존 장르에서 원하는 것에 가장 가까운 농업-생존 혼합 게임이에요. 커스터마이즈 가능한 메크로 외계 행성을 탐험하며 작물을 기르고 정착지를 세워요. 메크가 거의 모든 피해를 흡수해 게임이 절대 가혹하지 않아요. Game Pass 포함, 1-4인 협동.',
    why_de: 'Lightyear Frontier (2024, Frame Break) ist die Farming-Survival-Mischung, die am meisten dem entspricht, was ein Stardew-Valley-Spieler vom Survival-Genre erwartet. Du steuerst einen anpassbaren Mech auf einem lebhaften Alien-Planeten — der Mech absorbiert fast jeden Schaden, sodass das Spiel nie strafend wirkt. Gemütliche Farmschleife. Game Pass inklusive, Co-op für 1-4 Spieler.',
    tip_en: "Your mech's vacuum arm (resource gathering) is more important than the combat arm early on — upgrade it first to speed up harvesting. Clearing alien corruption slowly expands your safe build zone. Water your crops daily; a Water Condenser is the highest-priority quality-of-life upgrade. In co-op, one player can farm while another explores.",
    tip_zh: '你机甲的真空臂（资源收集）在早期比战斗臂更重要——先升级它以加快收割速度。清理外星腐败慢慢扩大你的安全建造区域。每天给你的作物浇水；水分凝结器是最高优先级的生活质量升级。在合作中，一名玩家可以在农场工作，而另一名探索。',
    tip_zhTW: '機甲的真空臂（採集）比戰鬥臂更重要——優先升級以加快收割。清理外星腐蝕慢慢擴大安全建造區域。每天澆水；水分凝結器是最重要的品質升級。合作時，一人農場一人探索。',
    tip_ja: 'メックの真空アーム（採集）が戦闘アームより重要——まずそれをアップグレードして収穫を速める。外来汚染を除去すると安全な建設ゾーンが広がる。毎日作物に水をやり、水分凝縮器を優先して入手しよう。Co-opでは農業と探索で役割分担が効果的。',
    tip_ko: '메크의 진공 암(채집)이 전투 팔보다 초반에 더 중요해요 — 먼저 업그레이드해 수확을 빠르게 하세요. 외계 오염을 제거하면 안전 건설 구역이 넓어져요. 매일 작물에 물을 주세요; 수분 응결기가 최우선 편의 업그레이드예요. 협동에서는 농업과 탐험으로 역할 분담하세요.',
    tip_de: 'Der Vakuumarm deines Mechs (Ressourcensammlung) ist früh wichtiger als der Kampfarm — upgrade ihn zuerst. Das Beseitigen von Alien-Korruption erweitert deine Bauzone. Täglich Ernten gießen; ein Wasserkondensator ist das wichtigste QoL-Upgrade. Im Koop: einer farmt, einer erkundet.',
  },
  grounded: {
    title_en: 'Grounded', title_zh: '缩小与生存', title_zhTW: '縮小與生存', title_ja: 'グラウンデッド', title_ko: '그라운디드', title_de: 'Grounded',
    emoji: '🐛',
    tag_en: 'Survive in a backyard the size of a world — shrunk to the size of a pebble among blades of grass, giant spiders, and everyday objects that become epic landmarks.',
    tag_zh: '在世界大小的后院生存——你缩小到小石子的大小，在草叶间、巨型蜘蛛中，以及在你生存故事中成为史诗地标的日常物品旁挣扎求生。',
    tag_zhTW: '在世界大小的後院生存——縮小至小石子大小，在草叶間、巨型蜘蛛中，以及成為生存故事史詩地標的日常物品旁掙扎求生。',
    tag_ja: '世界ほどの大きさの裏庭でサバイバル——砂利くらいの大きさに縮んで、草の葉の間で、巨大なクモの中で、日用品が史詩的な目印になる世界で生き残れ。',
    tag_ko: '세상만 한 크기의 뒷마당에서 생존 — 자갈만 한 크기로 줄어들어 풀잎 사이, 거대 거미들 사이에서, 일상 물건이 서사적인 랜드마크가 되는 세계에서 살아남아요.',
    tag_de: 'Überlebe in einem Garten in der Größe einer Welt — auf die Größe eines Kieselsteins geschrumpft zwischen Grashalmen, Riesenspinnen und Haushaltsgegenständen, die epische Wahrzeichen werden.',
    platform_en: 'Available on: PC (Steam), Xbox — about $40. Included in Xbox Game Pass. Supports 1-4 player online co-op.',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox——约 40 美元。包含在 Xbox Game Pass 中。支持 1-4 人在线合作。',
    platform_zhTW: '平台：PC（Steam）、Xbox——約 40 美元。Xbox Game Pass 包含。支援 1-4 人在線合作。',
    platform_ja: 'PC（Steam）、Xbox——約40ドル。Xbox Game Passに含まれる。1〜4人のオンラインCo-op対応。',
    platform_ko: 'PC(Steam), Xbox — 약 $40. Xbox Game Pass 포함. 1-4인 온라인 협동 지원.',
    platform_de: 'Verfügbar auf: PC (Steam), Xbox — ca. 40 $. In Xbox Game Pass enthalten. Unterstützt 1-4 Spieler Online-Koop.',
    why_en: "Grounded (2022, Obsidian Entertainment) is one of the most acclaimed survival games of its generation — a 4-player co-op survival game where you are shrunk to the size of a pebble in a suburban backyard. The game is set in a fixed, handcrafted world with specific landmarks — a hedge maze, an oak tree, a pond, a sandbox — each with its own ecosystem. Gear progression is insect-based: kill a bug, analyze its parts at a Field Station, unlock armor and weapons made from those parts. Game Pass included (free with subscription). Metacritic 80 on PC. Note: there is an Arachnophobia Mode that replaces spiders with less realistic models.",
    why_zh: '缩小与生存（2022 年，Obsidian Entertainment）是其一代最受好评的生存游戏之一——一款 4 人合作生存游戏。游戏设定在一个固定的手工制作世界中：有特定地标的后院——树篱迷宫、橡树、池塘、沙箱。装备进度基于昆虫。Game Pass 包含，支持 1-4 人在线合作。Metacritic PC 80 分。注意：有蜘蛛恐惧症模式。',
    why_zhTW: '縮小與生存（2022，Obsidian Entertainment）是同世代最受好評的生存遊戲之一。設定在手工製作的固定世界——後院有樹籬迷宮、橡樹、池塘、沙箱等地標。裝備進度基於昆蟲部件。Game Pass包含，1-4人合作。Metacritic PC 80分。有蜘蛛恐懼症模式。',
    why_ja: 'グラウンデッド（2022年、Obsidian Entertainment）は同世代で最も評価の高いサバイバルゲームの一つ。郊外の裏庭で砂利くらいの大きさに縮んで生き残る4人Co-opゲーム。手作りの固定ワールドで、各エリアに独自の生態系がある。ギア進行は昆虫素材ベース。Game Pass対応。クモ恐怖症モードあり。',
    why_ko: '그라운디드(2022, Obsidian Entertainment)는 한 세대에서 가장 호평받은 생존 게임 중 하나예요. 교외 뒷마당에서 자갈만 한 크기로 줄어들어 살아남는 4인 협동 게임이에요. 수제 고정 세계에 각자 생태계를 가진 랜드마크가 있어요. 장비는 곤충 부품 기반. Game Pass 포함. 거미 공포증 모드 있음.',
    why_de: 'Grounded (2022, Obsidian Entertainment) ist eines der meistgelobten Survival-Spiele seiner Generation — ein 4-Spieler-Koop-Survival-Spiel in einem handgefertigten Garten. Ausrüstungsfortschritt basiert auf Insektenteilen. Game Pass inklusive. Metacritic 80 auf PC. Es gibt einen Arachnophobie-Modus für weniger realistische Spinnen.',
    tip_en: "Turn on Arachnophobia Mode immediately if spiders bother you — it doesn't reduce gameplay. Build near the Oak Tree for Acorn shells (essential crafting material). Analyze every creature part at the Field Station — many items are locked behind analyses. Clover leaves are the most important early resource (first-tier armor). In co-op: two fighters, one builder, one resource runner works well.",
    tip_zh: '如果蜘蛛让你困扰，立即开启蜘蛛恐惧症模式——它不会降低游戏性。在橡树附近建造，以获取橡子壳（必要的制作材料）。在现场站分析每一个生物部件。三叶草叶子是最重要的早期资源（第一级护甲）。合作中，最有效的分工是：两个战士、一个建造者、一个资源运输者。',
    tip_zhTW: '若蜘蛛讓你不適，立即開啟蜘蛛恐懼症模式——不影響遊戲性。在橡樹附近建造獲取橡子殼。在現場站分析所有生物部件。三葉草葉子是最重要的早期資源。合作分工：兩名戰士、一名建造者、一名資源搬運者效果最佳。',
    tip_ja: '蜘蛛が苦手ならすぐにクモ恐怖症モードをオン——ゲームプレイに影響なし。オークの木の近くに建設してドングリの殻（必須素材）を確保。フィールドステーションで全ての素材を分析しよう。クローバーの葉が最重要の初期素材。Co-opでは戦士×2、建築者×1、採集者×1の役割分担がおすすめ。',
    tip_ko: '거미가 불편하면 즉시 거미 공포증 모드를 켜세요 — 게임플레이에 영향 없어요. 도토리 껍데기(필수 재료)를 위해 참나무 근처에 건설하세요. 현장 스테이션에서 모든 생물 부품을 분석하세요. 클로버 잎이 가장 중요한 초반 자원이에요. 협동: 전사 2명, 건축가 1명, 자원 운반자 1명 분업 추천.',
    tip_de: 'Schalte Arachnophobie-Modus sofort ein wenn Spinnen dich stören — kein Gameplay-Verlust. Baue nah am Eichenbaum für Eicheln (wichtiges Crafting-Material). Analysiere jedes Kreatur-Teil an der Feldstation. Kleeblätter sind die wichtigste frühe Ressource (erste Rüstungsstufe). Im Koop: zwei Kämpfer, ein Baumeister, ein Ressourcenläufer funktioniert gut.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { raft: 0, keeper: 0, frontier: 0, grounded: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozySurvivalGamesQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-survival-games-quiz`
    const shareText = getLoc(
      `Cozy 生存游戏推荐结果：「${getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}」！找到你的：${url}`,
      `My cozy survival game recommendation: ${getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)} — find yours: ${url}`,
      `Cozy 生存遊戲推薦：「${getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}」！找到你的：${url}`,
      `コージーサバイバルゲームの結果：「${getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}」！あなたも試して：${url}`,
      `코지 생존 게임 추천 결과：「${getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}」！당신도 해보세요：${url}`,
      `Mein Cozy-Survival-Ergebnis：「${getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}」！Finde deins：${url}`
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
              {getLoc('入门建议：', 'Getting started: ', '入門建議：', 'はじめ方：', '시작 팁：', 'Erste Schritte: ')}
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
          {getLoc('哪款生存游戏最适合 Cozy 玩家？', 'Which Survival Game Is Right for Cozy Gamers?', '哪款生存遊戲最適合 Cozy 玩家？', 'コージーゲーマーに合う生存ゲームは？', 'Cozy 게이머에게 맞는 생존 게임은?', 'Welches Survival-Spiel passt zu Cozy-Spielern?')}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从 Raft、核心守护者、光年边疆、缩小与生存中找到你的完美生存游戏',
            '6 questions to match you with Raft, Core Keeper, Lightyear Frontier, or Grounded',
            '6 個問題，從 Raft、核心守護者、光年邊疆、縮小與生存中找到你的完美生存遊戲',
            '6問でわかる！Raft・コアキーパー・ライトイヤーフロンティア・グラウンデッドであなたに合う生存ゲームを見つけよう',
            '6가지 질문으로 Raft, 코어 키퍼, 라이트이어 프론티어, 그라운디드 중 당신에게 맞는 생존 게임을 찾아요',
            '6 Fragen, um dein perfektes Survival-Spiel aus Raft, Core Keeper, Lightyear Frontier oder Grounded zu finden'
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
        {getLoc('找到我的生存游戏', 'Find My Survival Game', '找到我的生存遊戲', '生存ゲームを探す', '내 생존 게임 찾기', 'Mein Survival-Spiel finden')}
      </button>
    </div>
  )
}
