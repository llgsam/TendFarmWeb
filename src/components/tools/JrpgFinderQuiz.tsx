'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'octopath' | 'triangle' | 'xenoblade' | 'ryza'

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

  const copiedLabel =
    locale === 'zh' ? '✓ 已复制！' :
    locale === 'zh-TW' ? '✓ 已複製！' :
    locale === 'ja' ? '✓ コピーしました！' :
    locale === 'ko' ? '✓ 복사됨！' :
    locale === 'de' ? '✓ Kopiert!' :
    '✓ Copied!'

  const copyLabel =
    locale === 'zh' ? '📋 复制结果' :
    locale === 'zh-TW' ? '📋 複製結果' :
    locale === 'ja' ? '📋 結果をコピー' :
    locale === 'ko' ? '📋 결과 복사' :
    locale === 'de' ? '📋 Ergebnis kopieren' :
    '📋 Copy result'

  const shareLabel =
    locale === 'zh' ? '分享' :
    locale === 'zh-TW' ? '分享' :
    locale === 'ja' ? 'シェア' :
    locale === 'ko' ? '공유' :
    locale === 'de' ? 'Teilen' :
    'Share'

  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copied ? copiedLabel : copyLabel}
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
    q_en: 'What draws you most to JRPGs?',
    q_zh: '你对 JRPG 最感兴趣的是什么？',
    q_zhTW: '你對 JRPG 最感興趣的是什麼？',
    q_ja: 'JRPGで一番惹かれるものは何ですか？',
    q_ko: 'JRPG에서 가장 끌리는 요소는 무엇인가요?',
    q_de: 'Was zieht dich bei JRPGs am meisten an?',
    options: [
      {
        en: 'Beautiful character stories — I want to follow 8 distinct protagonists through personal journeys that gradually weave into a shared epic, each with their own chapter arc',
        zh: '美丽的角色故事——我想跟随 8 位各具特色的主角经历个人旅程，这些旅程逐渐交织成一部共同史诗，每位都有自己的章节弧线',
        zhTW: '美麗的角色故事——我想跟隨 8 位各具特色的主角經歷個人旅程，這些旅程逐漸交織成一部共同史詩，每位都有自己的章節弧線',
        ja: 'キャラクターの物語——8人の個性的な主人公それぞれの旅を追いながら、徐々に交わっていく群像劇を楽しみたい。各キャラクターに独自のチャプターがある作品',
        ko: '아름다운 캐릭터 스토리 — 각자의 개성을 지닌 8명의 주인공을 따라가며 개인의 여정이 서서히 하나의 서사로 엮이는 작품. 각 캐릭터만의 챕터 아크가 있는 게임',
        de: 'Wunderschöne Charaktergeschichten – ich möchte 8 einzigartige Protagonisten auf persönlichen Reisen begleiten, die sich allmählich zu einem gemeinsamen Epos verflechten, jede mit ihrem eigenen Kapitelbogen',
        type: 'octopath',
      },
      {
        en: 'Political weight — I want to make decisions that shape which faction wins a war, with branching routes where my convictions determine the ending I see',
        zh: '政治分量——我想做出塑造哪个派系赢得战争的决定，在分支路线中，我的信念决定我看到的结局',
        zhTW: '政治分量——我想做出塑造哪個派系贏得戰爭的決定，在分支路線中，我的信念決定我看到的結局',
        ja: '政治的な重み——どの勢力が戦争に勝つかを左右する決断を下したい。ルート分岐があり、自分の信念が見るエンディングを決める作品',
        ko: '정치적 무게감 — 어느 세력이 전쟁에서 승리할지를 결정짓는 선택을 하고 싶다. 분기 루트가 있어서 내 신념이 어떤 엔딩을 맞이할지를 결정하는 게임',
        de: 'Politisches Gewicht – ich möchte Entscheidungen treffen, die bestimmen, welche Fraktion den Krieg gewinnt, mit verzweigten Routen, bei denen meine Überzeugungen das Ende bestimmen',
        type: 'triangle',
      },
      {
        en: 'Epic scope — I want a world so vast that after 150 hours I am still discovering new places, a story that wrestles with life and death, and a combat system that rewards mastery',
        zh: '史诗规模——我想要一个广阔到 150 小时后仍在发现新地方的世界、一个与生死博弈的故事，以及一个奖励精通的战斗系统',
        zhTW: '史詩規模——我想要一個廣闊到 150 小時後仍在發現新地方的世界、一個與生死博弈的故事，以及一個獎勵精通的戰鬥系統',
        ja: '壮大なスケール——150時間遊んでもまだ新しい場所を発見できるほど広大な世界、生と死を問う物語、そして習熟が報われる戦闘システムがある作品',
        ko: '웅장한 스케일 — 150시간이 지나도 새로운 장소를 발견할 수 있는 광활한 세계, 생사를 다루는 이야기, 숙련도에 보상이 따르는 전투 시스템이 있는 게임',
        de: 'Epischer Umfang – ich möchte eine Welt, die so riesig ist, dass ich auch nach 150 Stunden noch neue Orte entdecke, eine Geschichte, die mit Leben und Tod ringt, und ein Kampfsystem, das Meisterschaft belohnt',
        type: 'xenoblade',
      },
      {
        en: "Cozy progression — I want a JRPG where the core loop feels like Stardew Valley's gathering and crafting: exploring fields for ingredients, discovering new recipes, and watching my alchemy tree grow",
        zh: '舒适的进展感——我想要一款核心循环感觉像星露谷采集和制作的 JRPG：在田野中寻找材料、发现新配方、看着我的炼金术树成长',
        zhTW: '舒適的進展感——我想要一款核心循環感覺像星露谷採集和製作的 JRPG：在田野中尋找材料、發現新配方、看著我的煉金術樹成長',
        ja: 'まったり育成——採取・クラフトのループがStardew Valleyみたいな感覚のJRPG：フィールドで素材を集め、新しいレシピを発見して、錬金術ツリーを育てたい',
        ko: '느긋한 성장 루프 — 스타듀 밸리의 수집·제작 루프처럼 느껴지는 JRPG: 들판에서 재료를 모으고 새 레시피를 발견하며 연금술 트리를 키워가는 게임',
        de: 'Gemütlicher Fortschritt – ich möchte ein JRPG, dessen Kernschleife sich anfühlt wie Sammeln und Crafting in Stardew Valley: Felder nach Zutaten absuchen, neue Rezepte entdecken, meinen Alchemiebaum wachsen sehen',
        type: 'ryza',
      },
    ],
  },
  {
    q_en: 'Which combat style appeals to you most?',
    q_zh: '哪种战斗风格最吸引你？',
    q_zhTW: '哪種戰鬥風格最吸引你？',
    q_ja: '好きな戦闘スタイルはどれですか？',
    q_ko: '어떤 전투 스타일이 가장 마음에 드시나요?',
    q_de: 'Welcher Kampfstil spricht dich am meisten an?',
    options: [
      {
        en: 'Classic turn-based with a twist — the Boost system lets me bank turns for burst damage, and every enemy has a Break mechanic I need to unlock to deal full damage',
        zh: '经典回合制加变体——Boost 系统让我积累回合以爆发伤害，每个敌人都有我需要解锁才能造成完整伤害的破盾机制',
        zhTW: '經典回合制加變體——Boost 系統讓我積累回合以爆發傷害，每個敵人都有我需要解鎖才能造成完整傷害的破盾機制',
        ja: 'ひと味違うターン制——ブーストシステムでターンを溜めてバースト攻撃できて、敵ごとにブレイク機構を解除しないとフルダメージが出ない作品',
        ko: '변형 턴제 — 부스트 시스템으로 턴을 쌓아 집중 공격을 퍼붓고, 적마다 브레이크 기믹을 해제해야 풀 데미지를 줄 수 있는 게임',
        de: 'Klassisches Rundenbasiertes mit Twist – das Boost-System lässt mich Züge für Burst-Schaden ansparen, und jeder Gegner hat eine Break-Mechanik, die ich entsperren muss, um vollen Schaden zu machen',
        type: 'octopath',
      },
      {
        en: 'Tactical grid combat — positioning my units, considering terrain effects, managing conviction votes on moral dilemmas, and replaying maps to find the optimal formation',
        zh: '战术方格战斗——定位我的单位、考虑地形效果、管理道德困境上的信念投票，并重玩地图以找到最佳阵型',
        zhTW: '戰術方格戰鬥——定位我的單位、考慮地形效果、管理道德困境上的信念投票，並重玩地圖以找到最佳陣型',
        ja: 'タクティクスグリッド戦闘——ユニット配置、地形効果、道徳的ジレンマへの信念投票、最適陣形を求めてのマップ再挑戦が楽しい作品',
        ko: '전술 그리드 전투 — 유닛 배치, 지형 효과, 도덕적 딜레마 투표, 최적 포메이션을 찾아 맵을 반복 공략하는 게임',
        de: 'Taktisches Gitterkampf – Einheiten platzieren, Geländeeffekte berücksichtigen, Überzeugungsabstimmungen bei moralischen Dilemmata verwalten und Karten wiederholen, um die optimale Formation zu finden',
        type: 'triangle',
      },
      {
        en: 'Deep real-time with combos — a system I am still learning new things about after 60 hours, where class-switching, blade combinations, and interlinking characters create layered strategic depth',
        zh: '深度实时连击——一个我 60 小时后仍在学习新事物的系统，职业切换、刀刃组合和角色连接创造多层战略深度',
        zhTW: '深度即時連擊——一個我 60 小時後仍在學習新事物的系統，職業切換、刀刃組合和角色連接創造多層戰略深度',
        ja: '奥深いリアルタイムコンボ——60時間遊んでもまだ新発見がある戦闘。クラスチェンジ、ブレードコンボ、インタリンクが重層的な戦略を生み出す作品',
        ko: '깊이 있는 실시간 콤보 — 60시간 플레이해도 새로운 걸 발견하는 전투 시스템. 클래스 변환, 블레이드 조합, 인터링크로 겹겹이 쌓이는 전략적 깊이',
        de: 'Tiefes Echtzeit mit Combos – ein System, bei dem ich auch nach 60 Stunden noch Neues entdecke: Klassenwechsel, Klingenkombinationen und Interlinking schaffen vielschichtige strategische Tiefe',
        type: 'xenoblade',
      },
      {
        en: 'Alchemy puzzle combat — a system where I manage a crafting queue of items during battle, chaining effect tags to trigger bonus reactions without needing precise reflex timing',
        zh: '炼金谜题战斗——一个我在战斗中管理道具制作队列的系统，通过连接效果标签来触发奖励反应，不需要精确的反应时间',
        zhTW: '煉金謎題戰鬥——一個我在戰鬥中管理道具製作佇列的系統，透過連接效果標籤來觸發獎勵反應，不需要精確的反應時間',
        ja: '錬金パズル戦闘——バトル中にアイテムクラフトキューを管理して、エフェクトタグをチェーンさせることで追加反応を起こす。反射神経は不要な作品',
        ko: '연금술 퍼즐 전투 — 전투 중 아이템 제작 큐를 관리하면서 효과 태그를 체인해 추가 반응을 유발하는 게임. 반사 신경이 필요 없는 시스템',
        de: 'Alchemie-Puzzle-Kampf – während des Kampfes eine Crafting-Warteschlange von Items verwalten, Effekt-Tags verketten, um Bonusreaktionen auszulösen, ohne präzises Reaktionsvermögen zu brauchen',
        type: 'ryza',
      },
    ],
  },
  {
    q_en: 'How much time are you willing to invest?',
    q_zh: '你愿意投入多少时间？',
    q_zhTW: '你願意投入多少時間？',
    q_ja: 'どれくらい時間を投資できますか？',
    q_ko: '얼마나 많은 시간을 투자할 의향이 있으신가요?',
    q_de: 'Wie viel Zeit bist du bereit zu investieren?',
    options: [
      {
        en: '70-80 hours — enough to experience all 8 character stories and their convergence, with optional side content I can explore at my own pace without feeling like I am missing the ending',
        zh: '70-80 小时——足够体验所有 8 位角色故事及其汇聚，可选支线内容我可以按自己的节奏探索，不会感到错过结局',
        zhTW: '70-80 小時——足夠體驗所有 8 位角色故事及其匯聚，可選支線內容我可以按自己的節奏探索，不會感到錯過結局',
        ja: '70〜80時間——8人全員のストーリーと交差を体験するには十分。任意のサブコンテンツも自分のペースで探索できて、エンディングを逃した気にならない作品',
        ko: '70~80시간 — 8명 전원의 스토리와 교차점을 경험하기에 충분. 선택적 서브 콘텐츠도 내 페이스대로 즐길 수 있어 엔딩을 놓친다는 느낌이 없는 게임',
        de: '70–80 Stunden – genug, um alle 8 Charaktergeschichten und ihre Verflechtung zu erleben, mit optionalem Nebeninhalt, den ich in meinem eigenen Tempo erkunden kann, ohne das Gefühl, das Ende zu verpassen',
        type: 'octopath',
      },
      {
        en: '30-50 hours — a focused, replayable JRPG experience where my first playthrough reveals one route and I can replay for different political outcomes and a true ending across multiple runs',
        zh: '30-50 小时——一个专注、可重玩的 JRPG 体验，第一次游玩揭示一条路线，我可以为不同的政治结果重玩，并在多次游玩中达到真正结局',
        zhTW: '30-50 小時——一個專注、可重玩的 JRPG 體驗，第一次遊玩揭示一條路線，我可以為不同的政治結果重玩，並在多次遊玩中達到真正結局',
        ja: '30〜50時間——周回前提でコンパクトにまとまったJRPG。初回はひとつのルートを開放して、異なる政治的結末や真エンドを目指して複数回プレイできる作品',
        ko: '30~50시간 — 집중적이고 반복 플레이가 가능한 JRPG. 첫 플레이에서 하나의 루트를 열고, 다른 정치적 결말과 트루 엔딩을 위해 여러 번 플레이할 수 있는 게임',
        de: '30–50 Stunden – ein fokussiertes, wiederspielbareres JRPG, bei dem der erste Durchlauf eine Route enthüllt und ich für andere politische Enden und ein wahres Ende mehrmals spielen kann',
        type: 'triangle',
      },
      {
        en: '100-150+ hours — I want a JRPG that is its own complete world I can live in for months, where I never feel I have exhausted what the game has to offer',
        zh: '100-150+ 小时——我想要一款 JRPG，它是我可以在其中生活数月的完整世界，我永远不会感到穷尽游戏所提供的内容',
        zhTW: '100-150+ 小時——我想要一款 JRPG，它是我可以在其中生活數月的完整世界，我永遠不會感到窮盡遊戲所提供的內容',
        ja: '100〜150時間以上——数ヶ月住めるほどの完結した世界を持つJRPGがいい。やり尽くした感を覚えない作品',
        ko: '100~150시간 이상 — 몇 달 동안 살 수 있는 완결된 세계를 가진 JRPG. 게임이 제공하는 걸 다 소진했다는 느낌이 들지 않는 게임',
        de: '100–150+ Stunden – ich möchte ein JRPG, das eine vollständige Welt ist, in der ich monatelang leben kann und nie das Gefühl habe, alles ausgeschöpft zu haben',
        type: 'xenoblade',
      },
      {
        en: '40-50 hours — a complete, satisfying JRPG at a reasonable length, with sequels available if I fall in love with the world and want more immediately after finishing',
        zh: '40-50 小时——一个长度合理的完整、令人满足的 JRPG，如果我爱上这个世界并在完成后立刻想要更多，续集已经可玩',
        zhTW: '40-50 小時——一個長度合理的完整、令人滿足的 JRPG，如果我愛上這個世界並在完成後立刻想要更多，續集已經可玩',
        ja: '40〜50時間——適切なボリュームで完結するJRPG。気に入ったらすぐに続編に移れる作品',
        ko: '40~50시간 — 적절한 볼륨으로 완결되는 JRPG. 세계관에 빠졌다면 바로 속편으로 이어갈 수 있는 게임',
        de: '40–50 Stunden – ein vollständiges, befriedigendes JRPG in vernünftiger Länge, mit sofort verfügbaren Fortsetzungen, wenn ich in die Welt verliebt bin',
        type: 'ryza',
      },
    ],
  },
  {
    q_en: 'Which story tone appeals most?',
    q_zh: '哪种故事基调最吸引你？',
    q_zhTW: '哪種故事基調最吸引你？',
    q_ja: 'どんな物語のトーンが好みですか？',
    q_ko: '어떤 스토리 톤이 가장 매력적인가요?',
    q_de: 'Welcher Stimmungstyp spricht dich am meisten an?',
    options: [
      {
        en: 'Eight personal epics — each character has a hometown, a wound, and a destiny; some are dark (revenge, betrayal), some are warm (community, found family), none are identical',
        zh: '八部个人史诗——每位角色都有家乡、伤痛和命运；一些是黑暗的（复仇、背叛），一些是温暖的（社区、羁绊），没有两部相同',
        zhTW: '八部個人史詩——每位角色都有家鄉、傷痛和命運；一些是黑暗的（復仇、背叛），一些是溫暖的（社群、羈絆），沒有兩部相同',
        ja: '8つの個人叙事詩——キャラクターごとに故郷・傷・運命がある。ダークなもの（復讐・裏切り）も、温かいもの（仲間・絆）も、どれも独自の物語',
        ko: '8개의 개인 서사시 — 각 캐릭터에게 고향, 상처, 운명이 있다. 어두운 것(복수, 배신)도 있고 따뜻한 것(공동체, 인연)도 있으며, 둘 다 독자적인 이야기',
        de: 'Acht persönliche Epen – jeder Charakter hat eine Heimat, eine Wunde und ein Schicksal; manche sind dunkel (Rache, Verrat), manche warm (Gemeinschaft, Zusammenhalt), keine gleicht der anderen',
        type: 'octopath',
      },
      {
        en: 'Political tragedy — a war where every faction believes it is right, and my choices about whom to trust and which ideals to uphold determine whether the ending is just or bittersweet',
        zh: '政治悲剧——一场每个派系都认为自己是正确的战争，我对信任谁以及坚持哪些理想的选择决定结局是公正的还是苦甜参半的',
        zhTW: '政治悲劇——一場每個派系都認為自己是正確的戰爭，我對信任誰以及堅持哪些理想的選擇決定結局是公正的還是苦甜參半的',
        ja: '政治的悲劇——どの勢力も自分たちが正しいと信じる戦争。信頼する相手、貫く理想によってエンディングが正義になるか苦くなるかが決まる作品',
        ko: '정치적 비극 — 모든 세력이 자신이 옳다고 믿는 전쟁. 누구를 신뢰하고 어떤 이상을 고수하느냐에 따라 엔딩이 정의로운 결말이 될지 씁쓸한 결말이 될지 결정되는 게임',
        de: 'Politische Tragödie – ein Krieg, in dem jede Fraktion glaubt, recht zu haben, und meine Entscheidungen darüber, wem ich vertraue und welche Ideale ich verteidige, bestimmen, ob das Ende gerecht oder bitter-süß ist',
        type: 'triangle',
      },
      {
        en: 'Philosophical epic — a story about the nature of life, death, and what it means to exist, told through the eyes of companions whose bond forms the emotional core of a 150-hour journey',
        zh: '哲学史诗——一个关于生死本质以及存在意义的故事，通过同伴的眼睛讲述，他们的羁绊构成 150 小时旅程的情感核心',
        zhTW: '哲學史詩——一個關於生死本質以及存在意義的故事，透過同伴的眼睛講述，他們的羈絆構成 150 小時旅程的情感核心',
        ja: '哲学的叙事詩——生と死の本質、存在の意味を問う物語。仲間たちの絆が150時間の旅の感情的核心を形成する作品',
        ko: '철학적 서사시 — 생사의 본질과 존재의 의미를 탐구하는 이야기. 동료들의 유대가 150시간 여정의 감정적 핵심을 이루는 게임',
        de: 'Philosophisches Epos – eine Geschichte über die Natur von Leben, Tod und Existenz, erzählt durch die Augen von Gefährten, deren Band den emotionalen Kern einer 150-Stunden-Reise bildet',
        type: 'xenoblade',
      },
      {
        en: 'Warm coming-of-age — teenagers in a small island town discover alchemy, explore ruins, and grow up together in a story that is sunny and cozy even when serious moments arise',
        zh: '温暖的成长故事——小岛镇上的青少年发现炼金术、探索遗迹，并在一个即使出现严肃时刻也阳光温馨的故事中共同成长',
        zhTW: '溫暖的成長故事——小島鎮上的青少年發現煉金術、探索遺跡，並在一個即使出現嚴肅時刻也陽光溫馨的故事中共同成長',
        ja: '温かい青春物語——小さな島の町に住む10代の若者が錬金術を発見して遺跡を探索し、共に成長していく。シリアスな場面でも陽気で居心地のいい作品',
        ko: '따뜻한 성장 이야기 — 작은 섬 마을의 10대들이 연금술을 발견하고 유적을 탐험하며 함께 성장. 진지한 장면이 나와도 밝고 아늑한 분위기를 유지하는 게임',
        de: 'Warme Coming-of-Age-Geschichte – Teenager in einer kleinen Inselstadt entdecken Alchemie, erkunden Ruinen und wachsen in einer Geschichte zusammen, die auch bei ernsten Momenten sonnig und gemütlich bleibt',
        type: 'ryza',
      },
    ],
  },
  {
    q_en: 'What visual style sounds most appealing for long play sessions?',
    q_zh: '哪种视觉风格最适合长时间游玩？',
    q_zhTW: '哪種視覺風格最適合長時間遊玩？',
    q_ja: '長時間プレイするのに最も魅力的なビジュアルスタイルはどれですか？',
    q_ko: '장시간 플레이에 가장 매력적인 비주얼 스타일은 어떤 건가요?',
    q_de: 'Welcher visuelle Stil klingt am attraktivsten für lange Spielsessions?',
    options: [
      {
        en: "HD-2D — a gorgeous hybrid of pixel art sprites and 3D environments that feels like a living watercolor painting, with each character's world having a distinct color palette and lighting style",
        zh: 'HD-2D——像素艺术精灵与 3D 环境的精美混合，感觉像活的水彩画，每位角色的世界都有独特的色彩调色板和光照风格',
        zhTW: 'HD-2D——像素藝術角色與 3D 環境的精美融合，感覺像活的水彩畫，每位角色的世界都有獨特的色彩調色盤和光照風格',
        ja: 'HD-2D——ピクセルアートキャラクターと3D環境を融合させた独自のスタイル。生きた水彩画のようで、キャラクターごとに異なるカラーパレットと光の演出がある作品',
        ko: 'HD-2D — 픽셀 아트 캐릭터와 3D 환경을 결합한 독특한 스타일. 살아있는 수채화 같은 느낌으로, 각 캐릭터의 세계마다 독특한 색 팔레트와 조명 스타일이 있는 게임',
        de: 'HD-2D – eine atemberaubende Mischung aus Pixel-Art-Sprites und 3D-Umgebungen, die sich wie ein lebendes Aquarell anfühlt, mit einer eigenen Farbpalette und einem eigenen Lichtstil für die Welt jedes Charakters',
        type: 'octopath',
      },
      {
        en: 'Clean tactical art — a deliberate, elegant visual style where the grid map reads clearly for strategy, illustrated character portraits tell emotional story beats, and every political decision is weighted by the art',
        zh: '清晰的战术艺术——刻意、优雅的视觉风格，方格地图清晰易读以进行战略，插图角色肖像讲述情感故事节拍，每个政治决定都由艺术加权',
        zhTW: '清晰的戰術美術——刻意、優雅的視覺風格，方格地圖清晰易讀以進行戰略，插圖角色肖像講述情感故事節拍，每個政治決定都由美術加權',
        ja: '洗練されたタクティクスアート——グリッドマップが戦略的に読みやすく、イラストのキャラクターポートレートが感情的な場面を演出し、政治的決断に重みを加えるビジュアル',
        ko: '깔끔한 전술 아트 — 그리드 맵이 전략적으로 읽기 쉽고, 일러스트 캐릭터 초상화가 감정적 장면을 연출하며, 모든 정치적 결정에 무게감을 더하는 비주얼',
        de: 'Klare Taktikgrafik – ein bewusster, eleganter visueller Stil, bei dem die Gitterkarte strategisch lesbar ist, illustrierte Charakterporträts emotionale Wendepunkte zeigen und jede politische Entscheidung durch die Kunst gewichtet wird',
        type: 'triangle',
      },
      {
        en: 'Spectacular open world — enormous vistas that stretch to the horizon, creatures that dwarf the player characters, and a world that feels genuinely alien despite being rich with life',
        zh: '壮观的开放世界——延伸至地平线的巨大全景、矮化玩家角色的生物，以及一个尽管充满生命力但感觉真正异域的世界',
        zhTW: '壯觀的開放世界——延伸至地平線的巨大全景、矮化玩家角色的生物，以及一個儘管充滿生命力但感覺真正異域的世界',
        ja: '壮大なオープンワールド——地平線まで広がる絶景、プレイヤーを見下ろす巨大生物、生命力に溢れながらも異世界的に感じられる世界',
        ko: '스펙터클한 오픈 월드 — 지평선까지 펼쳐지는 광활한 경치, 플레이어 캐릭터를 압도하는 거대 생물, 생명력이 넘치면서도 이질적으로 느껴지는 세계',
        de: 'Spektakuläre offene Welt – riesige Panoramen, die sich bis zum Horizont erstrecken, Kreaturen, die Spielerfiguren zwergenhaft erscheinen lassen, und eine Welt, die sich trotz Lebendigkeit wirklich fremdArtig anfühlt',
        type: 'xenoblade',
      },
      {
        en: 'Warm anime aesthetic — summer afternoons, the smell of seawater, characters in casual clothes gathering herbs in sunlit fields — the most visually cozy JRPG on this list',
        zh: '温暖的动漫美学——夏日午后、海水的气味、穿着休闲服在阳光照耀的田野中采集草药的角色——这个列表中视觉上最 Cozy 的 JRPG',
        zhTW: '溫暖的動漫美學——夏日午後、海水的氣味、穿著休閒服在陽光照耀的田野中採集草藥的角色——這個列表中視覺上最 Cozy 的 JRPG',
        ja: '温かいアニメ風美術——夏の午後、潮の香り、日差しの中でハーブを摘む仲間たち。このリストの中で最もコージーなビジュアルのJRPG',
        ko: '따뜻한 애니메이션 감성 — 여름 오후, 바닷내음, 햇살 가득한 들판에서 약초를 캐는 캐릭터들. 이 목록에서 가장 코지한 비주얼의 JRPG',
        de: 'Warme Anime-Ästhetik – Sommernachmittage, Meeresluft, Charaktere in Freizeitkleidung beim Kräutersammeln auf sonnenbeschienenen Feldern – das visuell gemütlichste JRPG auf dieser Liste',
        type: 'ryza',
      },
    ],
  },
  {
    q_en: 'Which post-session feeling sounds most satisfying?',
    q_zh: '哪种游玩后的感觉最令你满足？',
    q_zhTW: '哪種遊玩後的感覺最令你滿足？',
    q_ja: 'セッション後の達成感として最も満足感を得られそうなのはどれですか？',
    q_ko: '플레이 후 가장 뿌듯할 것 같은 느낌은 어떤 건가요?',
    q_de: 'Welches Gefühl nach einer Spielsession klingt am befriedigendsten?',
    options: [
      {
        en: "I just completed Tressa's chapter arc and now I understand how her story connects to Ophilia's — the moment they interact in a crossed path event was exactly the reward I was waiting for",
        zh: '我刚完成 Tressa 的章节弧线，现在我明白她的故事如何与 Ophilia 的连接——他们在交叉路径事件中互动的那一刻正是我等待的回报',
        zhTW: '我剛完成 Tressa 的章節弧線，現在我明白她的故事如何與 Ophilia 的連接——他們在交叉路徑事件中互動的那一刻正是我等待的回報',
        ja: 'Tressaのチャプターをクリアして、彼女の物語とOphiliaの繋がりが見えてきた——クロスパス・イベントで2人が出会った瞬間がまさに待ち望んでいた報酬だった',
        ko: '트레사의 챕터를 막 끝내고 그녀의 스토리가 오필리아의 것과 어떻게 연결되는지 이해했다 — 교차 경로 이벤트에서 두 사람이 만나는 순간이 기다리던 보상 그 자체였다',
        de: "Ich habe gerade Tressas Kapitelbogen abgeschlossen und verstehe jetzt, wie ihre Geschichte mit Ophilias zusammenhängt – der Moment, in dem sie sich in einem Kreuzpfad-Event begegnen, war genau die Belohnung, auf die ich gewartet habe",
        type: 'octopath',
      },
      {
        en: 'A pivotal vote just went in a direction I did not expect — my character gave the speech I wrote but the outcome surprised me, and now I am replaying from the chapter start to see what changes',
        zh: '一次关键投票以我没预料到的方向进行——我的角色发表了我写的演讲，但结果让我惊讶，现在我从章节开始重玩以查看有什么变化',
        zhTW: '一次關鍵投票以我沒預料到的方向進行——我的角色發表了我寫的演講，但結果讓我驚訝，現在我從章節開始重玩以查看有什麼變化',
        ja: '重要な投票が予想外の方向に進んだ——自分のキャラクターが用意した演説をしたのに結果が驚きで、今は章の最初から再プレイして何が変わるか確認している',
        ko: '중요한 투표가 예상치 못한 방향으로 흘렀다 — 내 캐릭터가 내가 쓴 연설을 했는데도 결과가 놀라웠고, 이제 챕터 처음부터 다시 플레이해서 뭐가 달라지는지 보고 있다',
        de: 'Eine entscheidende Abstimmung ist in eine Richtung gegangen, die ich nicht erwartet hatte – mein Charakter hat die Rede gehalten, die ich vorbereitet hatte, aber das Ergebnis hat mich überrascht, und jetzt spiele ich vom Kapitelanfang neu, um zu sehen, was sich ändert',
        type: 'triangle',
      },
      {
        en: 'I just unlocked a new area of the world and the scale of what lies ahead genuinely surprised me — 80 hours in and the game still has new biomes, combat mechanics, and companions to introduce',
        zh: '我刚解锁了世界的一个新区域，前方规模真的让我惊讶——80 小时后游戏仍有新的生物群落、战斗机制和同伴要介绍',
        zhTW: '我剛解鎖了世界的一個新區域，前方規模真的讓我驚訝——80 小時後遊戲仍有新的生物群落、戰鬥機制和同伴要介紹',
        ja: '新エリアを解放したら、その先の規模に本当に驚いた——80時間遊んでもまだ新しいバイオーム・戦闘メカニック・仲間が登場する',
        ko: '새로운 지역을 막 해금했는데 앞으로 남은 규모에 진심으로 놀랐다 — 80시간이 지났는데도 게임은 여전히 새로운 바이옴, 전투 메카닉, 동료를 소개하고 있다',
        de: 'Ich habe gerade ein neues Gebiet der Welt freigeschaltet, und das Ausmaß dessen, was noch kommt, hat mich wirklich überrascht – 80 Stunden drin, und das Spiel hat noch neue Biome, Kampfmechaniken und Begleiter zu bieten',
        type: 'xenoblade',
      },
      {
        en: 'I discovered a new alchemy synthesis chain and my item bag is now packed with upgraded consumables I made myself — the satisfaction of a perfect crafting session before a boss fight',
        zh: '我发现了一个新的炼金合成链，我的道具袋现在装满了我自己制作的升级消耗品——Boss 战前完美制作环节的满足感',
        zhTW: '我發現了一個新的煉金合成鏈，我的道具袋現在裝滿了我自己製作的升級消耗品——Boss 戰前完美製作環節的滿足感',
        ja: '新しい錬金合成チェーンを発見して、アイテムバッグが自作のアップグレード消耗品でいっぱいに——ボス戦前の完璧なクラフトセッションの達成感',
        ko: '새로운 연금술 합성 체인을 발견했고 내가 직접 만든 강화 소모품으로 아이템 가방이 가득 찼다 — 보스전 전 완벽한 제작 세션의 성취감',
        de: 'Ich habe eine neue Alchemie-Synthesekette entdeckt, und meine Itembag ist jetzt voller selbst gebauter Verbrauchsgüter – die Befriedigung einer perfekten Crafting-Session vor einem Bosskampf',
        type: 'ryza',
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
  octopath: {
    title_en: 'Octopath Traveler II',
    title_zh: '歧路旅人 II',
    title_zhTW: '歧路旅人 II',
    title_ja: 'オクトパストラベラー II',
    title_ko: '옥토패스 트래블러 II',
    title_de: 'Octopath Traveler II',
    emoji: '🎭',
    tag_en: 'Eight protagonists with eight interwoven stories in a breathtaking HD-2D world — the sequel improves on every system in the beloved original, with a true convergent ending',
    tag_zh: '八位主角在令人叹为观止的 HD-2D 世界中交织的八个故事——续作在深受喜爱的原作的每个系统上都有改进，并有真正的汇聚结局',
    tag_zhTW: '八位主角在令人嘆為觀止的 HD-2D 世界中交織的八個故事——續作在深受喜愛的原作的每個系統上都有改進，並有真正的匯聚結局',
    tag_ja: 'HD-2Dの美麗な世界を舞台に8人の主人公が交差する群像JRPG。前作を超えた完成度で、真の収束エンドも搭載',
    tag_ko: 'HD-2D 미술로 빛나는 8인 군상 JRPG. 전작의 모든 시스템을 개선한 속편으로 진정한 교차 스토리 엔딩도 탑재',
    tag_de: 'Acht Protagonisten, acht verflochtene Geschichten in einer atemberaubenden HD-2D-Welt – der Nachfolger verbessert jedes System des Originals und bietet ein echtes konvergentes Ende',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, PS5 — about $60 new, often on sale for $30-40',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、PS5——新品约 60 美元，经常特价 30-40 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PS4、PS5——新品約 60 美元，特價時 30-40 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PS4、PS5 — 新品約60ドル、セール時30〜40ドル',
    platform_ko: '지원 플랫폼: PC(Steam), 닌텐도 스위치, PS4, PS5 — 신품 약 $60, 할인 시 $30-40',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PS4, PS5 – ca. 60 $ neu, oft im Sale für 30-40 $',
    why_en:
      "Octopath Traveler II (2023) is Square Enix's follow-up to the beloved 2018 original — a turn-based JRPG featuring eight distinct protagonists (a merchant, a dancer, a thief, a scholar, a cleric, a hunter, an inventor, and an apothecary), each with their own story that begins separately and gradually intertwines. The HD-2D visual style — pixel art characters layered over 3D environments with gorgeous lighting — is one of the most distinctive art styles in modern gaming. The Boost-and-Break combat system is the series' signature: every enemy has weaknesses (fire, swords, bows, etc.) that you exploit to Break them, and then you spend stored Boost points for amplified attacks on a vulnerable target. The sequel significantly improves on the original: a true convergent story arc unites all eight characters in the final act, day/night cycles change which path abilities are usable, and every protagonist's storyline is notably better written. Metacritic approximately 87 on Switch. For cozy gamers from Stardew Valley who want their first JRPG: Octopath II's episodic structure means you can play one character's chapters when you have an hour, and it never punishes you for taking breaks.",
    why_zh:
      '歧路旅人 II（2023 年）是史克威尔艾尼克斯对备受喜爱的 2018 年原作的续作——一款回合制 JRPG，拥有八位各具特色的主角（商人、舞者、盗贼、学者、神官、猎人、发明家和药剂师），每人都有自己从分开到逐渐交织的故事。HD-2D 视觉风格——在具有华丽光照效果的 3D 环境上叠加像素艺术角色——是现代游戏中最独特的艺术风格之一。Boost 和破盾战斗系统是系列标志：每个敌人都有你利用来破盾的弱点，然后你在脆弱目标上花费积累的 Boost 点数进行增强攻击。续作在原作基础上显著改进：真正的汇聚故事弧线在最终章节联合所有八位角色，昼夜循环改变可用的路径技能，每位主角的故事线写作明显更好。Switch 版 Metacritic 约 87 分。',
    why_zhTW:
      '歧路旅人 II（2023）是 Square Enix 備受讚譽的原作續集。遊戲採用 HD-2D 視覺風格，匯集商人、舞者、盜賊、學者等八位各具特色的主角，各自從不同起點展開旅程，最終匯聚成一部共同史詩。Boost 破盾戰鬥系統是本作招牌：找出敵人弱點將其破盾，再用積累的 Boost 點數集中爆發。續作大幅強化原作不足：最終章節八位主角真正匯聚，晝夜循環改變可用的路徑技能，每條故事線的劇情品質均顯著提升。Switch 版 Metacritic 約 87 分。對想入坑 JRPG 的農場遊戲玩家來說，本作的章節式結構讓你隨時都能撿起一個角色的故事繼續，絕不懲罰中斷遊玩。',
    why_ja:
      '『オクトパストラベラー II』（2023）はスクウェア・エニックスによる前作の続編。HD-2Dスタイルで描かれた美しい世界に、商人・踊り子・盗賊・学者など8人の主人公が登場し、それぞれの旅が徐々に交差していく。ブーストとブレイクを駆使した戦闘は本シリーズの代名詞。弱点属性で敵をブレイクしてから、貯めたブーストポイントで大ダメージを狙う戦略的なターン制だ。続編では全キャラクターが合流する真のクロスストーリーが実装され、昼夜サイクルが行動コマンドに影響を与える仕組みも追加。農場ゲームからJRPGに入りたい人にも安心な章立て構成で、1時間だけ遊んで中断してもストーリーを見失わない。SwitchのMetascore約87点。',
    why_ko:
      '《옥토패스 트래블러 II》(2023)는 스퀘어 에닉스의 사랑받는 전작의 속편이다. HD-2D 비주얼 스타일 아래 상인·댄서·도적·학자 등 8명의 개성 넘치는 주인공이 각자의 이야기를 펼치며 서서히 하나로 수렴된다. 본 시리즈의 트레이드마크인 부스트&브레이크 전투 시스템은 적의 약점을 공략해 브레이크시킨 뒤 쌓인 부스트 포인트로 집중 공격을 퍼붓는 전략적 턴제다. 속편에서는 진정한 크로스 스토리 아크, 주야 사이클 시스템, 개선된 스토리라인 등이 대폭 추가됐다. 챕터식 구성 덕분에 농장 게임에서 JRPG로 넘어오는 플레이어도 부담 없이 즐길 수 있다. 스위치판 메타크리틱 약 87점.',
    why_de:
      'Octopath Traveler II (2023) ist Square Enix\' Nachfolger des geliebten Originals von 2018 – ein rundenbasiertes JRPG mit acht einzigartigen Protagonisten (Händlerin, Tänzerin, Diebin, Gelehrter, Klerikerin, Jäger, Erfinderin und Apothekerin), deren zunächst getrennte Geschichten sich allmählich verflechten. Der HD-2D-Stil – Pixel-Art-Charaktere in 3D-Umgebungen mit wunderschöner Beleuchtung – ist unverwechselbar. Das Boost-und-Break-System ist Markenkern der Reihe: Schwächen ausnutzen, um Gegner zu brechen, dann gespeicherte Boost-Punkte für maximalen Schaden einsetzen. Der Nachfolger verbessert das Original deutlich: echter Konvergenzstorybogen, Tag-Nacht-Zyklus und besser geschriebene Geschichten. Für Cozy-Gamer aus Stardew Valley: Die Episodenstruktur lässt sich in 60-Minuten-Sessions spielen. Metacritic ca. 87 auf Switch.',
    tip_en: "Start with Hikari (the warrior) or Throné (the thief) — they have the most immediately engaging storylines and teach the core combat mechanics well. Do not try to rush through all eight stories simultaneously; instead, focus on one character's chapters in a region before moving to the next, and only swap to other characters when you need to unlock their path skills for traversal. The night path skills (Throné's steal, Osvald's mug) are extremely useful — switch to nighttime in towns regularly.",
    tip_zh: '从光 Hikari（战士）或 Throné（盗贼）开始——他们有最立即吸引人的故事线，并能很好地教授核心战斗机制。不要试图同时匆匆完成所有八个故事；专注于一个区域的一位角色章节后再转到下一个，只有当你需要解锁他们的路径技能以通行时才切换其他角色。夜间路径技能（Throné 的盗窃、Osvald 的袭击）非常有用——定期在城镇切换到夜间模式。',
    tip_zhTW: '建議從光（Hikari，戰士）或 Throné（盜賊）開始，這兩位主角的故事線最引人入勝，也能有效學習核心戰鬥機制。切忌急著同時推進所有八條線；先在同一區域深入一位主角的章節，只在需要解鎖通行技能時才切換角色。夜間路徑技能（Throné 的偷竊、Osvald 的奪取）用途廣泛，記得在城鎮中定期切換至夜間模式。',
    tip_ja: '最初は光（ウォリアー）かトラーニ（シーフ）がおすすめ。どちらもストーリーへの引き込みが強く、戦闘の基本もしっかり学べる。8人を同時並行で進めようとせず、まずひとつのエリアで1人のキャラクターのチャプターを完結させよう。移動に必要な旅人のコマンドが必要なときだけ他キャラに切り替えるのが効率的。夜間限定コマンド（トラーニの「盗む」、オーズバルドの「強奪」など）は非常に便利なので、町では定期的に夜モードに切り替えることを忘れずに。',
    tip_ko: '처음에는 Hikari(전사) 또는 Throné(도적)를 추천한다. 두 캐릭터 모두 스토리 흡입력이 강하고 핵심 전투 메카닉을 자연스럽게 익힐 수 있다. 8명을 동시에 진행하려 하지 말고, 한 지역에서 한 캐릭터의 챕터를 완결시킨 뒤 다음으로 넘어가는 것이 좋다. 이동에 필요한 패스 스킬이 필요할 때만 다른 캐릭터로 전환하자. 야간 패스 스킬(Throné의 훔치기, Osvald의 강탈)은 매우 유용하니 마을에서는 정기적으로 야간 모드로 전환하는 걸 잊지 말자.',
    tip_de: 'Starte am besten mit Hikari (dem Krieger) oder Throné (der Diebin) – sie haben die packendsten Storys und lehren die Kampfmechaniken gut. Versuche nicht, alle acht Geschichten gleichzeitig zu jagen; konzentriere dich in einer Region auf einen Charakter, bevor du weiterziehst, und wechsle nur, wenn du spezielle Reisenden-Fähigkeiten zum Weiterkommen brauchst. Nacht-Fähigkeiten (Thronés Stehlen, Osvalds Überfall) sind äußerst nützlich – wechsle in Städten regelmäßig in den Nachtmodus.',
  },
  triangle: {
    title_en: 'Triangle Strategy',
    title_zh: '三角战略',
    title_zhTW: '三角戰略',
    title_ja: 'トライアングルストラテジー',
    title_ko: '트라이앵글 스트래티지',
    title_de: 'Triangle Strategy',
    emoji: '⚔️',
    tag_en: 'A tactical JRPG with a deeply political story — your moral convictions determine which of four distinct endings you reach, and the strategy combat is among the finest in the genre',
    tag_zh: '一款拥有深度政治故事的战术 JRPG——你的道德信念决定你达到四个截然不同结局中的哪一个，战略战斗是该类型中最优秀的之一',
    tag_zhTW: '一款擁有深度政治故事的戰術 JRPG——你的道德信念決定你達到四個截然不同結局中的哪一個，戰略戰鬥是該類型中最優秀的之一',
    tag_ja: '深い政治ドラマが光る戦術JRPG。道義的信念が4つの異なるエンドを分かつシリーズ最高峰のタクティクス作品',
    tag_ko: '깊이 있는 정치 드라마를 담은 전술 JRPG. 도의적 신념이 4가지 엔딩을 가르는 장르 최고 수준의 타이틀',
    tag_de: 'Ein Taktik-JRPG mit tief politischer Geschichte – deine moralischen Überzeugungen bestimmen, welches der vier Enden du erreichst, und der Strategie-Kampf gehört zu den besten im Genre',
    platform_en: 'Available on: Nintendo Switch, PC (Steam) — about $60 new, often on sale for $20-30',
    platform_zh: '可在以下平台获取：Nintendo Switch、PC（Steam）——新品约 60 美元，经常特价 20-30 美元',
    platform_zhTW: '可在以下平台取得：Nintendo Switch、PC（Steam）——新品約 60 美元，特價時 20-30 美元',
    platform_ja: '対応プラットフォーム：Nintendo Switch、PC（Steam） — 新品約60ドル、セール時20〜30ドル',
    platform_ko: '지원 플랫폼: 닌텐도 스위치, PC(Steam) — 신품 약 $60, 할인 시 $20-30',
    platform_de: 'Erhältlich auf: Nintendo Switch, PC (Steam) – ca. 60 $ neu, oft im Sale für 20-30 $',
    why_en:
      "Triangle Strategy (2022) is Square Enix's second HD-2D tactical JRPG after the original Octopath Traveler — a political war story set in the land of Norzelia, where three powers struggle for control of salt and iron (the world's most precious commodities). You play as Serenoa, a young lord whose kingdom is caught between three great nations, and whose fate is decided by a Scales of Conviction mechanic: throughout the game, your choices accumulate as Utility, Morality, or Liberty points, and at critical junctures your party votes on what to do — influenced by those accumulated values. The game has four endings, including a secret true ending that requires very specific choices across the entire playthrough. The tactical combat is superb: terrain elevation gives archers range bonuses, fire spreads between adjacent tiles, and every unit has a class-specific role that rewards positioning. Metacritic 84 on Switch. For players who loved Fire Emblem: Three Houses but want a more politically focused story without relationship simulation: Triangle Strategy is the more narrative-pure tactical JRPG.",
    why_zh:
      '三角战略（2022 年）是史克威尔艾尼克斯继歧路旅人原作之后的第二款 HD-2D 战术 JRPG——一个设定在诺兹利亚大陆的政治战争故事，三方势力争夺对盐和铁（世界最珍贵商品）的控制。你扮演年轻领主塞利诺亚，他的王国夹在三个大国之间，命运由信念天平机制决定：整个游戏中，你的选择累积为功利、道德或自由点数，在关键时刻你的队伍投票决定行动——受那些累积价值的影响。游戏有四个结局，包括需要整个游玩过程中非常特定选择的秘密真结局。战术战斗出色：地形高度给弓箭手提供射程加成，火焰在相邻格间蔓延，每个单位都有需要定位奖励的职业专属角色。Switch 版 Metacritic 84 分。',
    why_zhTW:
      '《三角戰略》（2022）是 Square Enix 的第二款 HD-2D 戰術 JRPG，故事發生在鹽與鐵資源爭奪激烈的諾茲利亞大陸。你扮演年輕領主塞利諾亞，夾在三大強國之間，命運由「信念天秤」機制左右：你的選擇累積為功利、道義或自由點數，關鍵時刻同伴將對此進行投票。遊戲共有四個結局，包括需要貫穿全程特定選擇才能解鎖的隱藏真結局。戰術戰鬥精彩紛呈：地形高度影響射程，火焰可蔓延至相鄰格，每個單位都有職業專屬定位。Switch 版 Metacritic 84 分。',
    why_ja:
      '『トライアングルストラテジー』（2022）はスクウェア・エニックス2作目のHD-2Dタクティクスで、塩と鉄を巡る3勢力の政治戦争を描く。若き領主セレノアを操り、「信念の天秤」と呼ばれるシステムが物語を左右する。選択肢が功利・道義・自由の信念値として積み重なり、重要局面では仲間が投票でルートを決定。全4エンドに加え、全編を通じた特定の選択が必要な真エンドも存在。地形効果や炎の延焼が光るタクティクス戦闘も本格派だ。SwitchメタスコアはMC 84点。',
    why_ko:
      '《트라이앵글 스트래티지》(2022)는 스퀘어 에닉스의 두 번째 HD-2D 전술 JRPG로, 소금과 철을 둘러싼 세 세력의 정치 전쟁을 배경으로 한다. 젊은 영주 세레노아를 조종하며 세 강대국 사이에서 나라의 운명을 이끌어가는 게임으로, \'신념의 저울\' 시스템이 핵심이다. 선택이 공리·도의·자유 점수로 쌓이고 주요 기로에서 동료들이 투표로 방향을 결정한다. 엔딩은 총 4개이며, 전편에 걸친 특정 선택이 필요한 히든 트루 엔딩도 존재한다. 지형 효과와 불 번짐 등 전술 전투도 수준급이다. 스위치 메타크리틱 84점.',
    why_de:
      'Triangle Strategy (2022) ist Square Enix\' zweites HD-2D-Taktik-JRPG – eine politische Kriegsgeschichte auf dem Kontinent Norzelia, wo drei Mächte um Salz und Eisen kämpfen. Du spielst Serenoa, einen jungen Herrn zwischen drei Großnationen. Die Waage der Überzeugungen akkumuliert deine Entscheidungen als Nutz-, Moral- oder Freiheitspunkte; an kritischen Weggabelungen stimmt deine Gruppe über den weiteren Weg ab. Vier Enden – darunter ein geheimes wahres Ende, das bestimmte Entscheidungen im gesamten Durchlauf erfordert. Die Taktikkämpfe mit Geländehöhe und Feuerausbreitung sind erstklassig. Metacritic 84 auf Switch.',
    tip_en: "Do not skip the Encampment mock battles — they are the only way to grind experience without advancing the story, and some chapters have difficulty spikes. The Conviction system is missable: read every event carefully and consider which value (Utility, Morality, Liberty) your choice builds before confirming. For the true ending, keep a separate save file at the final branching point — the game tells you which chapter it is.",
    tip_zh: '不要跳过大本营的模拟战斗——它们是在不推进故事的情况下磨练经验的唯一方式，一些章节有难度峰值。信念系统是可错过的：在确认前仔细阅读每个事件并考虑你的选择建立哪个价值（功利、道德、自由）。对于真结局，在最终分支点保留一个单独的存档——游戏会告诉你是哪个章节。',
    tip_zhTW: '別跳過大本營的演習戰鬥——這是不推進主線就能磨練等級的唯一途徑，部分章節難度曲線較陡。信念系統有遺漏風險：確認前請仔細閱讀每個事件，考量你的選擇累積的是哪個點數（功利、道義或自由）。想挑戰真結局，建議在最終分支點單獨保存一個存檔——遊戲會提示是哪個章節。',
    tip_ja: '拠点の模擬戦はぜひ活用しよう。これが本編を進めずに経験値を稼げる唯一の手段で、難所のある章の前に有効だ。信念システムは取り返しがつかない。選択肢を確認する前に、功利・道義・自由のどの信念値を積むかをよく考えること。真エンドを狙うなら、最終分岐点に別のセーブデータを残しておこう。どのチャプターかはゲーム内で知らせてくれる。',
    tip_ko: '본거지 모의 전투는 절대 건너뛰지 말자. 본편을 진행하지 않고 경험치를 쌓을 수 있는 유일한 방법이며, 일부 챕터는 난이도 스파이크가 있다. 신념 시스템은 놓칠 수 있으니 확인 전 어떤 가치(공리·도의·자유)를 올리는지 신중히 생각해야 한다. 트루 엔딩을 노린다면 마지막 분기점에서 별도 세이브 파일을 남겨두자. 어느 챕터인지는 게임이 알려준다.',
    tip_de: 'Überspringe die Übungskämpfe im Lager nicht – sie sind die einzige Möglichkeit, ohne Story-Fortschritt Erfahrung zu sammeln, und einige Kapitel haben Schwierigkeitsspitzen. Das Überzeugungssystem ist verpassbar: Lese jeden Dialog sorgfältig und überlege, welchen Wert (Nutzen, Moral, Freiheit) deine Wahl aufbaut. Für das wahre Ende behalte eine separate Speicherdatei am letzten Verzweigungspunkt – das Spiel verrät dir, welches Kapitel es ist.',
  },
  xenoblade: {
    title_en: 'Xenoblade Chronicles 3',
    title_zh: '异度神剑 3',
    title_zhTW: '異度神劍 3',
    title_ja: 'ゼノブレイド3',
    title_ko: '제노블레이드 크로니클스 3',
    title_de: 'Xenoblade Chronicles 3',
    emoji: '🌌',
    tag_en: 'The most ambitious JRPG on Nintendo Switch — a 150+ hour epic about life, death, and connection set in a spectacular world, with one of the deepest combat systems in the genre',
    tag_zh: 'Nintendo Switch 上最雄心勃勃的 JRPG——一部设定在壮观世界中关于生死与羁绊的 150+ 小时史诗，拥有该类型中最深度的战斗系统之一',
    tag_zhTW: 'Nintendo Switch 上最雄心勃勃的 JRPG——一部設定在壯觀世界中關於生死與羈絆的 150+ 小時史詩，擁有該類型中最深度的戰鬥系統之一',
    tag_ja: 'ニンテンドースイッチ最高峰のJRPG——生と死、つながりをテーマにした150時間超の超大作。シリーズ屈指の深みある戦闘システムが光る',
    tag_ko: '닌텐도 스위치 최고의 JRPG——장대한 세계를 배경으로 생사와 유대를 탐구하는 150시간 이상의 서사시. 장르 최고 수준의 깊이 있는 전투 시스템이 빛나는 걸작',
    tag_de: 'Das ambitionierteste JRPG auf Nintendo Switch – ein 150+ Stunden langes Epos über Leben, Tod und Verbindung in einer spektakulären Welt, mit einem der tiefsten Kampfsysteme des Genres',
    platform_en: 'Available on: Nintendo Switch only — about $60 new',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 60 美元',
    platform_zhTW: '可在以下平台取得：僅 Nintendo Switch——新品約 60 美元',
    platform_ja: '対応プラットフォーム：Nintendo Switch独占 — 新品約60ドル',
    platform_ko: '지원 플랫폼: 닌텐도 스위치 독점 — 신품 약 $60',
    platform_de: 'Erhältlich auf: Nur Nintendo Switch – ca. 60 $ neu',
    why_en:
      "Xenoblade Chronicles 3 (2022) is Monolith Soft's masterpiece and the most fully realized entry in the beloved JRPG series. You follow six young warriors from two warring nations who discover that the war they have been fighting their entire lives is a construct — and that they have far less time to live than they believed. The world of Aionios is vast and staggeringly beautiful: open plains where creatures the size of buildings roam, ruins that hint at a long-lost civilization, and a mystery about the world's true nature that unfolds slowly over 80+ hours of main story. The real-time combat system — built around six party members, each with a combat class that can be swapped, and Interlinking mechanics where two characters fuse into a powerful combined form — has enough depth to reveal new possibilities for hundreds of hours. The story is the series' most emotionally resonant, wrestling with mortality, chosen family, and the value of living fully in finite time. Metacritic 93 on Switch — one of the highest-rated JRPGs of the generation. Switch exclusive.",
    why_zh:
      '异度神剑 3（2022 年）是 Monolith Soft 的杰作，是备受喜爱的 JRPG 系列中最完整实现的作品。你跟随来自两个交战民族的六位年轻战士，他们发现他们一生都在进行的战争是一个构建——而且他们的生命比他们相信的要短得多。Aionios 世界广阔而令人叹为观止：建筑大小的生物漫步的开阔平原、暗示久远失落文明的废墟，以及关于世界真实本质的谜题在 80+ 小时主线故事中缓慢展开。实时战斗系统——围绕六名队员构建，每人都有可以切换的战斗职业，以及两名角色融合成强大组合形态的连接机制——有足够的深度在数百小时内揭示新的可能性。Switch 版 Metacritic 93 分——该世代评分最高的 JRPG 之一。Switch 独占。',
    why_zhTW:
      '《異度神劍 3》（2022）是 Monolith Soft 的傑作，也是備受喜愛的系列中完成度最高的作品。你跟隨來自兩個交戰民族的六位年輕戰士，他們逐漸發現這場持續一生的戰爭不過是一個謊言。Aionios 世界廣袤壯麗：建築般大小的生物徜徉於開闊平原，廢墟暗示著消逝文明的秘密，關於世界本質的謎題在 80+ 小時主線中緩緩揭露。戰鬥系統以六名隊員為核心，結合可切換職業與雙人連接形態，數百小時後仍能發掘新玩法。故事探討有限生命的意義與羈絆，是系列情感最深刻的作品。Switch 版 Metacritic 93 分，限 Switch 獨占。',
    why_ja:
      '『ゼノブレイド3』（2022）はモノリスソフトの最高傑作であり、シリーズ最高の完成度を誇る。二つの交戦国に属する6人の若い兵士を追う物語は、やがてその戦争そのものが虚構だったことを明かす。舞台アイオニオスは広大で、ビルほどの巨大生物が闊歩し、失われた文明の痕跡が点在する。80時間以上かけて展開するメインストーリーは、生死の哲学と有限の命の意味を正面から扱う。6人編成・クラスチェンジ・インタリンクを組み合わせた戦闘は、数百時間プレイしても新発見があるほど深い。SwitchのMetascore 93点。Switch独占。',
    why_ko:
      '《제노블레이드 크로니클스 3》(2022)는 모노리스소프트의 최고 걸작이자 시리즈 최고의 완성도를 지닌 작품이다. 두 교전 국가에서 온 6명의 젊은 전사를 따라가는 이야기는 이들이 평생 싸워온 전쟁 자체가 허구임을 밝혀내는 과정을 담는다. 아이오니스 세계는 광활하고 장엄하며, 건물 크기의 생물이 활보하는 광야, 사라진 문명의 흔적이 가득하다. 80시간 이상의 메인 스토리는 유한한 생명의 의미와 동료의 유대를 정면으로 다룬다. 6인 파티·클래스 체인지·인터링크를 결합한 전투는 수백 시간 후에도 새로운 발견이 있다. 스위치 메타크리틱 93점. 스위치 독점.',
    why_de:
      'Xenoblade Chronicles 3 (2022) ist Monolith Softs Meisterwerk und der am stärksten ausgearbeitete Teil der Reihe. Du folgst sechs jungen Kriegern aus zwei verfeindeten Nationen, die entdecken, dass der Krieg, den sie ihr ganzes Leben geführt haben, ein Konstrukt ist. Die Welt von Aionios ist riesig: offene Ebenen mit gebäudegroßen Kreaturen, Ruinen einer untergegangenen Zivilisation, ein Welträtsel das sich über 80+ Stunden entfaltet. Das Kampfsystem – sechs Partymitglieder, Klassen-Wechsel, Interlink – offenbart hunderte Stunden lang neue Tiefen. Die Geschichte über Sterblichkeit und Verbundenheit ist die emotional stärkste des Franchise. Metacritic 93 auf Switch. Exklusiv für Switch.',
    tip_en: "Do not try to level-up grind in the early game — XC3 scales enemy levels to your current level, so exploration is more valuable than grinding. Unlock Class Mastery for your characters as soon as it becomes available: when you master a class, you keep its skills on a new class, which is the long-term power progression. The side quests in XC3 are unusually good — many have their own story arcs. Do not skip Colony side quests; they add significant emotional context to the main cast.",
    tip_zh: '不要在游戏早期尝试磨练等级——XC3 会根据你当前等级调整敌人等级，所以探索比磨练更有价值。一旦可用就为你的角色解锁职业精通：当你精通一个职业后，你在新职业上保留其技能，这是长期的强化进程。XC3 的支线任务质量异常高——许多都有自己的故事弧线。不要跳过殖民地支线任务；它们为主角团添加了重要的情感背景。',
    tip_zhTW: '早期遊戲不必刻意磨等——XC3 會根據主角等級調整敵人，探索比磨練更有效率。一旦職業精通功能開放，務必積極解鎖：精通職業後，技能可攜帶至新職業，這是長期強化的核心。XC3 的支線任務質量異常出色，許多都有獨立故事弧線。殖民地支線不要跳過，它們為主要角色提供了深刻的情感背景。',
    tip_ja: '序盤は無理にレベル上げをしなくていい——XC3は敵レベルがプレイヤーに連動するため、探索を優先すべきだ。クラスマスタリーが解放されたら積極的に活用しよう。クラスを極めるとスキルを別クラスに引き継げるので、長期的な強化の要になる。XC3のサブクエストは異例の質の高さで、独自のストーリーアークを持つものも多い。コロニーのサブクエストは必ずこなすこと——メインキャラクターへの感情的な肉付けがなされる重要な内容だ。',
    tip_ko: '초반 레벨 파밍은 필요 없다——XC3는 적 레벨이 플레이어에 연동되므로 파밍보다 탐험이 더 가치 있다. 클래스 마스터리가 해금되면 적극 활용하자. 클래스를 완전 숙련하면 스킬을 새 클래스에 이어받을 수 있어 장기 강화의 핵심이 된다. XC3의 서브 퀘스트는 독자적인 스토리 아크를 가진 것도 많아 퀄리티가 이례적으로 높다. 콜로니 서브 퀘스트는 꼭 챙길 것——메인 캐릭터들의 감정적 배경을 깊이 있게 채워주는 중요한 내용이다.',
    tip_de: 'Grinde in der Frühphase keine Level – XC3 skaliert Gegnerlevels mit deinem Charakter, daher ist Erkunden wertvoller als Grinden. Schalte die Klassen-Meisterschaft frei, sobald verfügbar: wenn du eine Klasse meisterst, behältst du ihre Fähigkeiten beim Klassenwechsel. Die Nebenquests in XC3 sind ungewöhnlich gut – viele haben eigene Storystränge. Überspringe keine Kolonien-Nebenquests; sie fügen dem Hauptcast wichtigen emotionalen Kontext hinzu.',
  },
  ryza: {
    title_en: 'Atelier Ryza: Ever Darkness & the Secret Hideout',
    title_zh: '莱莎的炼金工房～常暗女王与秘密藏身处～',
    title_zhTW: '萊莎的煉金工房～常暗女王與秘密藏身處～',
    title_ja: 'ライザのアトリエ〜常闇の女王と秘密の隠れ家〜',
    title_ko: '라이자의 아틀리에 ~항암의 여왕과 비밀의 은신처~',
    title_de: 'Atelier Ryza: Ever Darkness & the Secret Hideout',
    emoji: '⚗️',
    tag_en: 'The most accessible entry point to the beloved Atelier series — a cozy JRPG where gathering ingredients, crafting alchemy items, and living a summer adventure with your best friends is the whole point',
    tag_zh: '深受喜爱的工房系列最易上手的入口——一款 Cozy JRPG，采集材料、制作炼金物品、与最好的朋友一起度过夏日冒险就是全部意义',
    tag_zhTW: '深受喜愛的工房系列最易上手的入口——一款 Cozy JRPG，採集材料、製作煉金物品、與最好的朋友一起度過夏日冒險就是全部意義',
    tag_ja: 'アトリエシリーズ最高の入門作——採取、錬金、夏の冒険、親友たちとの日常。コージーJRPGのお手本が詰まった一本',
    tag_ko: '아틀리에 시리즈 최고의 입문작——채집, 연금, 친구들과 함께하는 여름 모험. 코지 JRPG의 정수가 담긴 한 편',
    tag_de: 'Der zugänglichste Einstiegspunkt in die beliebte Atelier-Reihe – ein gemütliches JRPG, bei dem Zutaten sammeln, Alchemie craften und ein Sommer-Abenteuer mit Freunden der ganze Sinn ist',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, PS5 — about $40 new. Two sequels already available: Ryza 2 and Ryza 3.',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、PS5——新品约 40 美元。两部续集已上市：莱莎 2 和莱莎 3。',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PS4、PS5——新品約 40 美元。兩部續集已上市：萊莎 2 和萊莎 3。',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PS4、PS5 — 新品約40ドル。続編ライザ2・ライザ3も発売済み',
    platform_ko: '지원 플랫폼: PC(Steam), 닌텐도 스위치, PS4, PS5 — 신품 약 $40. 속편 라이자 2·3 이미 출시',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PS4, PS5 – ca. 40 $ neu. Zwei Fortsetzungen (Ryza 2 und 3) bereits verfügbar',
    why_en:
      "Atelier Ryza: Ever Darkness & the Secret Hideout (2019) is the entry in the beloved Atelier series (Gust/Koei Tecmo) that introduced the franchise to a massive new audience — and for good reason. The alchemy system is the heart of the game: a visual synthesis puzzle where you combine ingredients with elemental properties to craft items, and where understanding which materials fit together creates increasingly powerful results. The gathering loop — exploring fields, forests, and ruins for ingredients, each with quality ratings that affect synthesis — feels unmistakably similar to farming game resource collection. The story is warm coming-of-age: Ryza and her friends, bored with island life, discover alchemy and the outside world, and the central emotion of the game is the bittersweetness of an ending summer. The combat is real-time with item use integrated: you manage an ATB-style gauge while deploying crafted consumables for tactical advantage. Two sequels (Ryza 2 and 3) are available immediately if you fall in love with the world. Metacritic approximately 80 across platforms.",
    why_zh:
      '莱莎的炼金工房～常暗女王与秘密藏身处～（2019 年）是备受喜爱的工房系列（Gust/光荣特库摩）中将该系列介绍给大量新受众的作品——原因充分。炼金系统是游戏的核心：一个视觉合成谜题，你将具有元素属性的材料组合来制作物品，理解哪些材料配合在一起会创造越来越强大的结果。采集循环——在田野、森林和遗迹中寻找材料，每种都有影响合成的品质评级——与农场游戏资源收集的感觉明显相似。故事是温暖的成长故事：莱莎和她的朋友们，对岛屿生活感到无聊，发现了炼金术和外面的世界，游戏的中心情感是夏末的苦甜感。两部续集（莱莎 2 和 3）已立即可玩。各平台 Metacritic 约 80 分。',
    why_zhTW:
      '《萊莎的煉金工房》（2019）是 Gust/光榮特庫摩備受喜愛的工房系列中，將系列推向更廣大受眾的關鍵作品。煉金系統是遊戲核心：一個視覺合成謎題，透過組合具有元素屬性的材料來製作道具，掌握材料搭配就能創造威力更強大的成果。採集循環——在田野、森林和遺跡中蒐集材料——與農場遊戲的資源收集感受高度相似。故事溫暖動人：萊莎和夥伴們對島嶼生活感到厭倦，發現了煉金術與外面的世界，核心情感是夏末那份甜中帶酸的告別感。兩部續集（萊莎 2 和 3）已立即可玩。各平台 Metacritic 約 80 分。',
    why_ja:
      '『ライザのアトリエ』（2019）はガスト/コーエーテクモのアトリエシリーズを一気に広い層に届けた作品だ。錬金システムがゲームの核で、素材の元素属性を組み合わせる視覚的な合成パズル。どの素材が相性がいいかを理解するほど強力なアイテムが作れる仕組みだ。フィールドや遺跡で素材を集める採取ループは農場ゲームのリソース収集に近い感覚で親しみやすい。物語は爽やかな青春もので、島暮らしに飽きたライザと友人たちが錬金術と外の世界を発見していく。夏の終わりの淡い切なさが中心的感情だ。ライザ2・3も続けてプレイできる。各プラットフォームのMetascoreは約80点。',
    why_ko:
      '《라이자의 아틀리에》(2019)는 가스트/코에이 테크모의 아틀리에 시리즈를 더 넓은 관객층에게 알린 작품이다. 연금술 시스템이 게임의 핵심으로, 원소 속성을 가진 재료를 조합해 아이템을 제작하는 시각적 합성 퍼즐이다. 어떤 재료가 잘 맞는지 이해할수록 더 강력한 결과물이 나온다. 들판·숲·유적에서 재료를 모으는 채집 루프는 농장 게임의 자원 수집과 비슷한 감각으로 친근하다. 스토리는 따뜻한 청춘물로, 섬 생활에 지친 라이자와 친구들이 연금술과 바깥세상을 발견하는 이야기다. 라이자 2·3도 바로 이어 플레이할 수 있다. 각 플랫폼 메타크리틱 약 80점.',
    why_de:
      'Atelier Ryza: Ever Darkness & the Secret Hideout (2019) ist der Eintrag in die Atelier-Reihe (Gust/Koei Tecmo), der die Franchise einem massiv neuen Publikum vorstellte. Das Alchemiesystem ist das Herzstück: ein visuelles Synthese-Puzzle, bei dem du Zutaten mit Elementeigenschaften kombinierst und mit besserem Materialverständnis immer stärkere Resultate erzielst. Der Sammelloop – Felder, Wälder und Ruinen nach Zutaten absuchen – fühlt sich ähnlich an wie die Ressourcensammlung in Farming-Games. Die Geschichte ist eine warme Coming-of-Age-Erzählung: Ryza und ihre Freunde entdecken Alchemie und die Außenwelt, die emotionale Mitte ist die bittersüße Stimmung eines ausklingenden Sommers. Ryza 2 und 3 sind sofort verfügbar. Metacritic ca. 80.',
    tip_en: "The quality of materials matters more than the quantity — always use the highest-quality ingredient available for synthesis, and prioritize gathering spots with multiple elements. The alchemy tree expands significantly in the second half of the game; do not feel pressure to craft every item early. When in doubt, talk to every NPC in every area: many have hidden gathering spot triggers. Ryza 2 is considered slightly better than the original by most fans; if you love Ryza 1, you can move straight to 2.",
    tip_zh: '材料的质量比数量更重要——合成时始终使用可用的最高质量材料，并优先采集具有多种元素的地点。炼金术树在游戏后半段显著扩展；不要感到有压力早期制作所有物品。如果不确定，与每个区域的每个 NPC 交谈：许多人都有隐藏的采集点触发器。大多数粉丝认为莱莎 2 比原作稍好；如果你喜爱莱莎 1，可以直接进入 2。',
    tip_zhTW: '材料品質比數量更重要——合成時請盡量使用最高品質的材料，並優先前往含有多種元素的採集點。煉金術樹在後半段大幅擴展，初期不必急著製作所有道具。有疑問時，和每個地區的每個 NPC 對話——許多人都能觸發隱藏採集點。大多數粉絲認為萊莎 2 比原作略勝一籌；如果你愛上第一作，可以直接進入第二作。',
    tip_ja: '素材は量より質が大事。合成には常に手持ちの中で最高品質のものを使い、複数の元素特性を持つ採取場所を優先しよう。錬金術ツリーは後半になると大きく広がるので、序盤から全アイテムを作り切ろうとしなくていい。迷ったらエリア内の全NPCに話しかけること——隠し採取場所のヒントをくれる人が多い。ライザ2は1作目より完成度が高いと評するファンが多いので、1をクリアしたらすぐに続編に進んでもいい。',
    tip_ko: '재료는 양보다 질이 중요하다. 합성 시 항상 가장 높은 품질의 재료를 사용하고, 여러 원소 특성을 가진 채집 장소를 우선하자. 연금술 트리는 후반에 크게 확장되므로 초반부터 모든 아이템을 다 만들려 하지 않아도 된다. 막막할 때는 각 지역의 모든 NPC와 대화하자——숨겨진 채집 장소 힌트를 주는 인물이 많다. 팬들 사이에서 라이자 2가 1편보다 약간 더 낫다는 평이 많으니 1편을 클리어하고 곧장 2편으로 넘어가도 좋다.',
    tip_de: 'Die Qualität der Materialien zählt mehr als die Menge – verwende beim Synthetisieren immer die höchstwertige verfügbare Zutat und priorisiere Sammelstellen mit mehreren Elementen. Der Alchemiebaum expandiert in der zweiten Spielhälfte erheblich; lass dich nicht unter Druck setzen, früh alles zu craften. Im Zweifel: Sprich mit jedem NPC in jedem Gebiet – viele haben versteckte Sammelstellen-Trigger. Ryza 2 gilt bei den meisten Fans als minimal besser als das Original; wenn du Ryza 1 liebst, kannst du direkt zu Teil 2 weitergehen.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { octopath: 0, triangle: 0, xenoblade: 0, ryza: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function JrpgFinderQuiz({ locale }: { locale: string }) {
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const getLoc = <T,>(en: T, zh: T, zhTW: T, ja: T, ko: T, de: T): T => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW
    if (locale === 'ja') return ja
    if (locale === 'ko') return ko
    if (locale === 'de') return de
    return en
  }

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/jrpg-finder-quiz`
    const shareText = getLoc(
      `My JRPG recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `JRPG 推荐测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `JRPG 推薦測驗結果：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `JRPGおすすめ診断：「${result.title_ja}」！${result.tag_ja}。あなたも診断：${url}`,
      `JRPG 추천 퀴즈 결과: 「${result.title_ko}」！${result.tag_ko}. 나도 해보기: ${url}`,
      `Mein JRPG-Empfehlung: ${result.title_de} — ${result.tag_de}. Finde deine: ${url}`,
    )

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {getLoc(result.tag_en, result.tag_zh, result.tag_zhTW, result.tag_ja, result.tag_ko, result.tag_de)}
          </p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {getLoc(result.title_en, result.title_zh, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}
          </h2>
          <p className="text-xs text-[#4a5a4a]">
            {getLoc(result.platform_en, result.platform_zh, result.platform_zhTW, result.platform_ja, result.platform_ko, result.platform_de)}
          </p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.why_en, result.why_zh, result.why_zhTW, result.why_ja, result.why_ko, result.why_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {getLoc('Getting started: ', '入门建议：', '入門建議：', '始め方：', '시작 팁：', 'Einstieg: ')}
            </span>
            {getLoc(result.tip_en, result.tip_zh, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm is building a farm rhythm tracker — bringing the rhythm of game life into real daily life.',
              'TendFarm 正在研发农场节律追踪功能——把游戏里的生活节奏带入真实日常。',
              'TendFarm 正在研發農場節律追蹤功能——把遊戲裡的生活節奏帶入真實日常。',
              'TendFarmはファームリズムトラッカーを開発中——ゲームの生活リズムをリアルな日常に。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다——게임 속 생활 리듬을 실제 일상으로.',
              'TendFarm baut einen Farm-Rhythmus-Tracker – den Lebensrhythmus aus dem Spiel in den echten Alltag bringen.',
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {getLoc('Retake Quiz', '重新测试', '重新測試', 'もう一度診断する', '다시 테스트하기', 'Quiz wiederholen')}
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
            'Which JRPG Is Right for You?',
            '哪款 JRPG 最适合你？',
            '哪款 JRPG 最適合你？',
            'あなたにぴったりのJRPGは？',
            '나에게 맞는 JRPG는?',
            'Welches JRPG passt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 questions to match you with Octopath Traveler II, Triangle Strategy, Xenoblade Chronicles 3, or Atelier Ryza',
            '6 个问题，从歧路旅人 II、三角战略、异度神剑 3、莱莎的炼金工房中找到你的 JRPG',
            '6 個問題，從歧路旅人 II、三角戰略、異度神劍 3、萊莎的煉金工房中找到你的 JRPG',
            '6つの質問で、オクトパストラベラーII・トライアングルストラテジー・ゼノブレイド3・ライザのアトリエからあなたのJRPGを見つけよう',
            '6개 질문으로 옥토패스 트래블러 II, 트라이앵글 스트래티지, 제노블레이드 크로니클스 3, 라이자의 아틀리에 중 나에게 맞는 JRPG 찾기',
            '6 Fragen, um das richtige JRPG für dich zu finden: Octopath Traveler II, Triangle Strategy, Xenoblade Chronicles 3 oder Atelier Ryza',
          )}
        </p>
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, qi) => (
          <div key={qi}>
            <p className="mb-3 font-medium text-[#e8dcc8]">
              {qi + 1}. {getLoc(q.q_en, q.q_zh, q.q_zhTW, q.q_ja, q.q_ko, q.q_de)}
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
                  {getLoc(opt.en, opt.zh, opt.zhTW, opt.ja, opt.ko, opt.de)}
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
        {getLoc('Find My JRPG', '找到我的 JRPG', '找到我的 JRPG', '自分のJRPGを見つける', '내 JRPG 찾기', 'Mein JRPG finden')}
      </button>
    </div>
  )
}
