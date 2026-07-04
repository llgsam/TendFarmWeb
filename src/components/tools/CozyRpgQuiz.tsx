'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'moonlighter' | 'cassette' | 'hatintime' | 'crosscode'

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
    q_en: 'Which aspect of a deeper game most excites you?',
    q_zh: '深度游戏中的哪个方面最让你兴奋？',
    q_zhTW: '深度遊戲中的哪個方面最讓你興奮？',
    q_ja: '本格的なゲームのどんな要素が一番ワクワクしますか？',
    q_ko: '더 깊은 게임에서 어떤 요소가 가장 설레나요?',
    q_de: 'Welcher Aspekt eines tiefgründigen Spiels begeistert dich am meisten?',
    options: [
      {
        en: 'Running an economy — I want to buy, sell, upgrade, and watch my shop grow alongside my fighting ability',
        zh: '经营经济——我想买卖、升级，看着我的商店随着我的战斗能力一起成长',
        zhTW: '經營經濟——我想買賣、升級，看著我的商店隨著我的戰鬥能力一起成長',
        ja: '経済を回すこと——売買・強化をして、戦闘力と一緒にお店を成長させたい',
        ko: '경제 운영——사고팔고, 업그레이드하면서 내 전투력과 함께 상점을 키워나가고 싶어',
        de: 'Eine Wirtschaft aufbauen — kaufen, verkaufen, upgraden und zusehen, wie mein Laden zusammen mit meiner Kampffähigkeit wächst',
        type: 'moonlighter',
      },
      {
        en: 'Building a team — collecting creatures, choosing my party composition, fusing two monsters into something new',
        zh: '组建队伍——收集生物、选择我的队伍组合、将两只怪物融合成新的形态',
        zhTW: '組建隊伍——收集生物、選擇我的隊伍組合、將兩隻怪物融合成新的形態',
        ja: 'チームを組むこと——モンスターを集めて、パーティを考えて、2体を融合させて新しい形を作りたい',
        ko: '팀 구성——몬스터를 모으고, 파티를 구성하고, 두 몬스터를 융합해 새로운 형태를 만들고 싶어',
        de: 'Ein Team aufbauen — Kreaturen sammeln, meine Partykomposition wählen und zwei Monster zu etwas Neuem fusionieren',
        type: 'cassette',
      },
      {
        en: 'Mastering movement — learning every trick my character can do until I can reach places others never find',
        zh: '掌握移动——学习我的角色能做的每一个技巧，直到我能到达别人从未发现的地方',
        zhTW: '掌握移動——學習我的角色能做的每一個技巧，直到我能到達別人從未發現的地方',
        ja: '動きをマスターすること——キャラのあらゆるテクニックを覚えて、誰も知らない場所にたどり着きたい',
        ko: '움직임 마스터하기——캐릭터의 모든 테크닉을 익혀 아무도 가보지 못한 곳에 도달하고 싶어',
        de: 'Bewegungen meistern — jeden Trick meines Charakters lernen, bis ich Orte erreiche, die andere nie finden',
        type: 'hatintime',
      },
      {
        en: 'Learning deep mechanics — a combat system with enough layers that I am still discovering things 40 hours in',
        zh: '学习深度机制——一个有足够层次的战斗系统，让我在 40 小时后仍在发现新东西',
        zhTW: '學習深度機制——一個有足夠層次的戰鬥系統，讓我在 40 小時後仍在發現新東西',
        ja: '深いメカニクスを学ぶこと——40時間経っても新発見があるくらい奥深い戦闘システムが欲しい',
        ko: '깊은 메커니즘 익히기——40시간 후에도 새로운 걸 발견할 만큼 레이어가 많은 전투 시스템',
        de: 'Tiefe Mechaniken erlernen — ein Kampfsystem mit so vielen Ebenen, dass ich nach 40 Stunden noch Neues entdecke',
        type: 'crosscode',
      },
    ],
  },
  {
    q_en: 'How long are you willing to spend on a single game before feeling you have seen what it offers?',
    q_zh: '在感觉你已经看到一款游戏所能提供的内容之前，你愿意在单一游戏上花多少时间？',
    q_zhTW: '在感覺你已經看到一款遊戲所能提供的內容之前，你願意在單一遊戲上花多少時間？',
    q_ja: '一本のゲームに「満足した」と感じるまで、どのくらいプレイしますか？',
    q_ko: '한 게임에서 충분히 즐겼다고 느끼기까지 얼마나 시간을 쓸 의향이 있나요?',
    q_de: 'Wie viel Zeit möchtest du in ein einzelnes Spiel investieren, bevor du das Gefühl hast, alles gesehen zu haben?',
    options: [
      {
        en: '15-25 hours — enough for daily loops to feel satisfying and the full shop arc to play out',
        zh: '15-25 小时——足以让日常循环感到满足并完成完整的商店弧线',
        zhTW: '15-25 小時——足以讓日常循環感到滿足並完成完整的商店弧線',
        ja: '15〜25時間——毎日のループが楽しめて、お店の成長ストーリーもしっかり体験できる時間',
        ko: '15~25시간——매일의 루프가 만족스럽고 상점 스토리가 완결되기에 충분한 시간',
        de: '15-25 Stunden — genug, um die täglichen Loops befriedigt zu erleben und den ganzen Laden-Bogen zu spielen',
        type: 'moonlighter',
      },
      {
        en: '20-35 hours — enough to fill my monster roster, explore the island fully, and finish the story',
        zh: '20-35 小时——足以填满我的怪物名册、完整探索岛屿并完成故事',
        zhTW: '20-35 小時——足以填滿我的怪物名冊、完整探索島嶼並完成故事',
        ja: '20〜35時間——モンスター図鑑を埋めて、島を隅々まで探索して、ストーリーを終わらせるのに十分',
        ko: '20~35시간——몬스터 도감을 채우고, 섬을 다 탐험하고, 스토리를 마치기에 충분한 시간',
        de: '20-35 Stunden — genug, um meinen Monsterkader zu füllen, die Insel vollständig zu erkunden und die Geschichte zu beenden',
        type: 'cassette',
      },
      {
        en: '10-15 hours — I want a joyful, complete platformer experience that does not overstay its welcome',
        zh: '10-15 小时——我想要一次愉快、完整的平台游戏体验，不会让人感到厌倦',
        zhTW: '10-15 小時——我想要一次愉快、完整的平台遊戲體驗，不會讓人感到厭倦',
        ja: '10〜15時間——飽きずに楽しめる、ちょうどいい長さのプラットフォームゲーム体験がいい',
        ko: '10~15시간——지루하지 않고 즐거움을 다 느낄 수 있는 완결된 플랫폼 게임 경험을 원해',
        de: '10-15 Stunden — ich möchte ein freudvolles, vollständiges Plattformer-Erlebnis, das nicht zu lang wird',
        type: 'hatintime',
      },
      {
        en: '60-80+ hours — I want the full-scale RPG experience, every sidequest, every mechanic fully explored',
        zh: '60-80+ 小时——我想要完整规模的 RPG 体验、每一个支线任务、每一个机制都被充分探索',
        zhTW: '60-80+ 小時——我想要完整規模的 RPG 體驗、每一個支線任務、每一個機制都被充分探索',
        ja: '60〜80時間以上——サブクエストもメカニクスも全部やり尽くす、フルスケールのRPG体験が欲しい',
        ko: '60~80시간 이상——모든 사이드퀘스트와 메커니즘을 다 파헤치는 풀스케일 RPG 경험을 원해',
        de: '60-80+ Stunden — ich möchte das vollständige RPG-Erlebnis, jede Nebenquest, jeden Mechanismus voll erkundet',
        type: 'crosscode',
      },
    ],
  },
  {
    q_en: 'Which type of challenge sounds most rewarding to you?',
    q_zh: '哪种类型的挑战对你来说最有成就感？',
    q_zhTW: '哪種類型的挑戰對你來說最有成就感？',
    q_ja: 'どんな挑戦が一番やりがいを感じますか？',
    q_ko: '어떤 종류의 도전이 가장 보람차게 느껴지나요?',
    q_de: 'Welche Art von Herausforderung klingt für dich am befriedigendsten?',
    options: [
      {
        en: 'Learning enemy attack patterns in a roguelite dungeon until I can clear it smoothly',
        zh: '学习地下城敌人的攻击模式，直到我能顺利清除它——类 Roguelite 的进步弧线',
        zhTW: '學習地下城敵人的攻擊模式，直到我能順利清除它——類 Roguelite 的進步弧線',
        ja: 'ローグライトダンジョンの敵の攻撃パターンを覚えて、スムーズにクリアできるようになること',
        ko: '로그라이트 던전의 적 공격 패턴을 익혀서 부드럽게 클리어할 수 있게 되는 것',
        de: 'Angriffsmustern von Feinden in einem Roguelite-Dungeon lernen, bis ich ihn reibungslos bezwinge',
        type: 'moonlighter',
      },
      {
        en: 'Building a monster team that can handle any encounter through type coverage and smart fusion decisions',
        zh: '建立一个通过属性覆盖和明智的融合决策能应对任何遭遇战的怪物队伍',
        zhTW: '建立一個通過屬性覆蓋和明智的融合決策能應對任何遭遇戰的怪物隊伍',
        ja: '属性カバレッジと融合の判断力で、どんな戦闘にも対応できるモンスターチームを作ること',
        ko: '타입 커버리지와 융합 전략으로 어떤 전투도 대응 가능한 몬스터 팀을 만드는 것',
        de: 'Ein Monsterteam aufbauen, das durch Typabdeckung und kluge Fusionsentscheidungen jeden Kampf meistert',
        type: 'cassette',
      },
      {
        en: 'Finding the precise sequence of moves — a hat throw here, a dash there — to reach a secret platform',
        zh: '找到精确的动作序列——这里一个帽子投掷、那里一个冲刺——到达一个秘密平台',
        zhTW: '找到精確的動作序列——這裡一個帽子投擲、那裡一個衝刺——到達一個秘密平台',
        ja: '帽子を投げてダッシュして……正確なアクションの順番を見つけて、隠れたプラットフォームに辿り着くこと',
        ko: '모자 던지기 한 번, 대시 한 번…정확한 동작 순서를 찾아 숨겨진 발판에 도달하는 것',
        de: 'Die genaue Bewegungssequenz finden — hier ein Hutwurf, dort ein Dash — um eine geheime Plattform zu erreichen',
        type: 'hatintime',
      },
      {
        en: "Unlocking a boss's full attack pattern over several attempts, then finally executing a clean run",
        zh: '通过几次尝试解锁 Boss 的完整攻击模式，然后最终执行一次完美的运行',
        zhTW: '通過幾次嘗試解鎖 Boss 的完整攻擊模式，然後最終執行一次完美的運行',
        ja: '何度か挑戦してボスの全攻撃パターンを解読して、最終的にきれいにクリアすること',
        ko: '여러 번 도전해 보스의 공격 패턴을 완전히 파악하고, 마침내 완벽하게 클리어하는 것',
        de: 'Das vollständige Angriffsmuster eines Bosses über mehrere Versuche entschlüsseln und dann einen sauberen Run durchführen',
        type: 'crosscode',
      },
    ],
  },
  {
    q_en: 'Which visual world sounds most appealing?',
    q_zh: '哪个视觉世界听起来最有吸引力？',
    q_zhTW: '哪個視覺世界聽起來最有吸引力？',
    q_ja: 'どんなビジュアルの世界に一番惹かれますか？',
    q_ko: '어떤 비주얼의 세계가 가장 끌리나요?',
    q_de: 'Welche visuelle Welt klingt für dich am ansprechendsten?',
    options: [
      {
        en: 'A cozy pixel-art medieval town with a shop on the surface and mysterious dungeons carved beneath it',
        zh: '一个舒适的像素艺术中世纪小镇，地面上有一家商店，下方刻有神秘的地下城',
        zhTW: '一個舒適的像素藝術中世紀小鎮，地面上有一家商店，下方刻有神秘的地下城',
        ja: '地上に店があって、その下に謎めいたダンジョンが広がる、居心地のよいピクセルアートの中世の町',
        ko: '지상에는 상점이, 지하에는 신비로운 던전이 펼쳐지는 아늑한 픽셀아트 중세 마을',
        de: 'Eine gemütliche Pixelart-Mittelalterstadt mit einem Laden auf der Oberfläche und geheimnisvollen Dungeons darunter',
        type: 'moonlighter',
      },
      {
        en: 'A strange island where people arrive from other dimensions and must make a new life with the monsters they befriend there',
        zh: '一个人们从其他维度到来并必须与他们在那里结交的怪物共同开创新生活的奇异岛屿',
        zhTW: '一個人們從其他維度到來並必須與他們在那裡結交的怪物共同開創新生活的奇異島嶼',
        ja: '他の次元からやってきた人たちが、友達になったモンスターと一緒に新生活を始める不思議な島',
        ko: '다른 차원에서 온 사람들이 그곳에서 친해진 몬스터들과 함께 새로운 삶을 시작하는 이상한 섬',
        de: 'Eine seltsame Insel, auf der Menschen aus anderen Dimensionen ankommen und mit den Monstern, die sie dort treffen, ein neues Leben beginnen',
        type: 'cassette',
      },
      {
        en: 'A colorful 3D cartoon world full of creative level design, hidden collectibles, and physics-based hat mechanics',
        zh: '一个充满创意关卡设计、隐藏收藏品和基于物理的帽子机制的色彩丰富的 3D 卡通世界',
        zhTW: '一個充滿創意關卡設計、隱藏收藏品和基於物理的帽子機制的色彩豐富的 3D 卡通世界',
        ja: '創意あふれるステージ、隠しコレクター、帽子の物理メカニクスが詰まったカラフルな3D漫画世界',
        ko: '창의적인 레벨 디자인, 숨겨진 수집품, 물리 기반 모자 메커니즘으로 가득한 컬러풀한 3D 카툰 세계',
        de: 'Eine bunte 3D-Cartoon-Welt voller kreativer Level-Designs, versteckter Sammelobjekte und physikbasierter Hutmechaniken',
        type: 'hatintime',
      },
      {
        en: 'An anime-styled MMO world rendered with extraordinary detail, inhabited by a lone player navigating its strange rules',
        zh: '一个以非凡细节呈现的动漫风格 MMO 世界，由一个独自玩家穿梭于其奇异规则中',
        zhTW: '一個以非凡細節呈現的動漫風格 MMO 世界，由一個獨自玩家穿梭於其奇異規則中',
        ja: 'ひとりのプレイヤーがその不思議なルールの中を旅する、圧倒的な細部まで作り込まれたアニメ風MMO世界',
        ko: '혼자인 플레이어가 기묘한 규칙 속을 헤쳐나가는, 놀라운 디테일로 구현된 애니메이션 스타일 MMO 세계',
        de: 'Eine Anime-artige MMO-Welt in außergewöhnlichem Detail, in der ein einsamer Spieler ihre seltsamen Regeln navigiert',
        type: 'crosscode',
      },
    ],
  },
  {
    q_en: 'What role do you want story to play in your RPG?',
    q_zh: '你希望故事在你的 RPG 中扮演什么角色？',
    q_zhTW: '你希望故事在你的 RPG 中扮演什麼角色？',
    q_ja: 'RPGでストーリーにどんな役割を求めますか？',
    q_ko: 'RPG에서 스토리가 어떤 역할을 하길 원하나요?',
    q_de: 'Welche Rolle soll die Geschichte in deinem RPG spielen?',
    options: [
      {
        en: 'Light but charming — I want the economy and dungeon mechanics to be the core, with story as a welcome backdrop',
        zh: '轻度但迷人——我希望经济和地下城机制成为核心，故事作为受欢迎的背景',
        zhTW: '輕度但迷人——我希望經濟和地下城機制成為核心，故事作為受歡迎的背景',
        ja: '軽めだけど味わいがある——経済とダンジョンのメカニクスがメインで、ストーリーはいいスパイスくらいでいい',
        ko: '가볍지만 매력적인——경제와 던전 메커니즘이 핵심이고, 스토리는 좋은 배경 정도면 충분해',
        de: 'Leicht, aber charmant — die Wirtschaft und Dungeon-Mechaniken sollen der Kern sein, Geschichte als willkommene Hintergrundkulisse',
        type: 'moonlighter',
      },
      {
        en: 'Present and emotional — I want to care about the characters I meet and the world they ended up in',
        zh: '存在且有情感——我想关心我遇到的角色和他们最终所处的世界',
        zhTW: '存在且有情感——我想關心我遇到的角色和他們最終所處的世界',
        ja: 'ちゃんとあって感情移入できる——出会うキャラたちと、彼らがたどり着いた世界のことを気にかけたい',
        ko: '존재하고 감정적인——만나는 캐릭터들과 그들이 처한 세계가 마음에 걸릴 만큼 신경 쓰이길 원해',
        de: 'Präsent und emotional — ich möchte die Charaktere, denen ich begegne, und die Welt, in der sie gelandet sind, wirklich mögen',
        type: 'cassette',
      },
      {
        en: 'Lighthearted and creative — funny characters, clever writing, a charming narrative I can engage with casually',
        zh: '轻松愉快且有创意——有趣的角色、聪明的文字、我可以轻松参与的迷人叙事',
        zhTW: '輕鬆愉快且有創意——有趣的角色、聰明的文字、我可以輕鬆參與的迷人敘事',
        ja: '楽しくてユニーク——面白いキャラ、ウィットのある文章、気軽に楽しめるチャーミングなストーリーがいい',
        ko: '가볍고 창의적인——재미있는 캐릭터, 위트 있는 대사, 가벼운 마음으로 즐길 수 있는 매력적인 이야기',
        de: 'Unbeschwert und kreativ — lustige Charaktere, cleveres Schreiben, eine charmante Handlung, die ich locker genießen kann',
        type: 'hatintime',
      },
      {
        en: 'Deep and invested — I want a full RPG narrative with story twists, revelations, and characters whose arcs matter',
        zh: '深入且投入——我想要一个完整的 RPG 叙事，有故事转折、启示和弧线重要的角色',
        zhTW: '深入且投入——我想要一個完整的 RPG 敘事，有故事轉折、啟示和弧線重要的角色',
        ja: '深くて没入できる——どんでん返し、伏線回収、キャラクターの成長弧がある本格的なRPGストーリーが欲しい',
        ko: '깊고 몰입감 있는——반전, 폭로, 성장 아크가 있는 진지한 RPG 서사를 원해',
        de: 'Tiefgründig und fesselnd — ich möchte eine vollständige RPG-Erzählung mit Wendungen, Enthüllungen und Charakteren, deren Bögen wichtig sind',
        type: 'crosscode',
      },
    ],
  },
  {
    q_en: 'Which description sounds like a perfect afternoon gaming session?',
    q_zh: '哪种描述听起来像是完美的下午游戏时光？',
    q_zhTW: '哪種描述聽起來像是完美的下午遊戲時光？',
    q_ja: '理想の午後のゲームセッション、どれに一番ピンときますか？',
    q_ko: '완벽한 오후 게임 세션을 묘사한다면 어떤 게 가장 마음에 드나요?',
    q_de: 'Welche Beschreibung klingt wie eine perfekte Nachmittags-Spielsession?',
    options: [
      {
        en: "Open the shop, sell last night's dungeon loot at good prices, upgrade my weapon, then dive back in for another run",
        zh: '开店、以好价格出售昨晚地下城的战利品、升级我的武器，然后再来一次探险',
        zhTW: '開店、以好價格出售昨晚地下城的戰利品、升級我的武器，然後再來一次探險',
        ja: '昨夜のダンジョンで集めたアイテムを高値で売って、武器を強化して、また潜る——この繰り返しが最高',
        ko: '어젯밤 던전 전리품을 좋은 가격에 팔고, 무기를 업그레이드하고, 다시 던전에 뛰어드는 것',
        de: 'Den Laden öffnen, das gestrige Dungeon-Loot zu guten Preisen verkaufen, meine Waffe upgraden und dann wieder eintauchen',
        type: 'moonlighter',
      },
      {
        en: 'Take my monster team into a challenging battle, discover a new fusion combination, then explore more of the strange island',
        zh: '带着我的怪物队伍投入一场艰难的战斗、发现一种新的融合组合，然后探索更多奇异的岛屿',
        zhTW: '帶著我的怪物隊伍投入一場艱難的戰鬥、發現一種新的融合組合，然後探索更多奇異的島嶼',
        ja: 'モンスターチームで難しい戦闘に挑んで、新しい融合の組み合わせを発見して、島をもっと探索する',
        ko: '몬스터 팀을 이끌고 어려운 전투에 도전하고, 새로운 융합 조합을 발견하고, 더 많은 섬을 탐험하는 것',
        de: 'Mein Monsterkader in einen anspruchsvollen Kampf führen, eine neue Fusionskombination entdecken und mehr von der merkwürdigen Insel erkunden',
        type: 'cassette',
      },
      {
        en: 'Find a new area I have never reached before, figure out the hat-throw sequence to unlock it, and collect everything inside',
        zh: '找到一个我从未到达过的新区域，找出解锁它的帽子投掷序列，然后收集里面的一切',
        zhTW: '找到一個我從未到達過的新區域，找出解鎖它的帽子投擲序列，然後收集裡面的一切',
        ja: '一度も行ったことのない新しいエリアを見つけて、帽子を使ってたどり着く方法を考えて、中のアイテムを全部集める',
        ko: '한 번도 가본 적 없는 새 구역을 발견하고, 모자 던지기 순서를 파악해 잠금을 해제하고, 안의 모든 것을 수집하는 것',
        de: 'Einen neuen Bereich finden, den ich noch nie erreicht habe, die Hutsequenz herausfinden, um ihn zu öffnen, und alles darin sammeln',
        type: 'hatintime',
      },
      {
        en: 'Get deep into a story-driven quest chain, then spend an hour reading skill tooltips and optimizing my build for the next boss',
        zh: '深入一个故事驱动的任务链，然后花一个小时阅读技能提示并为下一个 Boss 优化我的配置',
        zhTW: '深入一個故事驅動的任務鏈，然後花一個小時閱讀技能提示並為下一個 Boss 優化我的配置',
        ja: 'ストーリー主導のクエストチェーンに没入して、次のボスに備えてスキルを読み込んでビルドを最適化する',
        ko: '스토리 중심의 퀘스트 체인에 깊이 빠져들고, 다음 보스를 위해 스킬 툴팁을 읽으며 빌드를 최적화하는 것',
        de: 'Tief in eine storgetriebene Questkette eintauchen, dann eine Stunde Skill-Tooltips lesen und meinen Build für den nächsten Boss optimieren',
        type: 'crosscode',
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
  moonlighter: {
    title_en: 'Moonlighter',
    title_zh: 'Moonlighter',
    title_zhTW: 'Moonlighter',
    title_ja: 'ムーンライター',
    title_ko: '문라이터',
    title_de: 'Moonlighter',
    emoji: '🏪',
    tag_en: 'Run a shop by day, explore dungeons by night — a perfect loop for cozy players who want action combat paired with economic satisfaction',
    tag_zh: '白天开店、夜晚探索地下城——对于想要将动作战斗与经济满足感结合的 Cozy 玩家来说是完美的循环',
    tag_zhTW: '白天開店、夜晚探索地下城——對於想要將動作戰鬥與經濟滿足感結合的 Cozy 玩家來說是完美的循環',
    tag_ja: '昼は商店主、夜はダンジョン探索者——アクション戦闘と経済的な達成感を両立したい Cozy ゲーマーに完璧なループ',
    tag_ko: '낮에는 상점 주인, 밤에는 던전 탐험가——액션 전투와 경제적 만족감을 동시에 원하는 코지 게이머에게 완벽한 루프',
    tag_de: 'Tagsüber Laden führen, nachts Dungeons erkunden — eine perfekte Schleife für Cozy-Spieler, die Actionkampf mit wirtschaftlicher Befriedigung verbinden wollen',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, Xbox — about $20. Often on sale for $5-10.',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、Xbox——约 20 美元。经常以 5-10 美元促销。',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PS4、Xbox——約 20 美元。經常以 5-10 美元促銷。',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PS4、Xbox——約$20。セール時は$5〜10になることも。',
    platform_ko: '플랫폼：PC(Steam), 닌텐도 스위치, PS4, Xbox——약 $20. 세일 시 $5~10.',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PS4, Xbox — ca. 20 $. Oft im Angebot für 5-10 $.',
    why_en:
      "Moonlighter (2018) is one of the most satisfying dual-loop games ever designed: you play as Will, a shopkeeper in the town of Rynoka who secretly dreams of being a hero. By day you manage your shop — pricing items for maximum profit, dealing with customers who try to steal, upgrading your shop size and furniture, and hiring an assistant. By night you descend into procedurally generated dungeons beneath the town, fighting monsters, collecting loot, and trying to make it back alive. The two loops enhance each other perfectly: better shop income means better equipment for dungeon runs; better dungeon loot means better items to sell. The pixel art is beautiful and warm, the shop management system has just enough depth to stay satisfying, and the combat is action-oriented (dodge, attack, use items) with enough variety across five dungeons to keep it interesting. For cozy game players specifically, the shop-keeper daytime section provides the gentle rhythm they already love, while the dungeons provide a challenge that scales with confidence. At $20 with frequent sales to $5, it is one of the best value indie RPGs available.",
    why_zh:
      'Moonlighter（2018 年）是有史以来设计最令人满足的双循环游戏之一：你扮演 Will，Rynoka 镇上秘密梦想成为英雄的店主。白天你经营你的商店——为商品定价以获取最大利润、对付试图偷窃的顾客、升级你的商店规模和家具，并雇佣助手。夜晚你下降到小镇下方程序生成的地下城，战斗、收集战利品，并尝试活着回来。两个循环完美相互增强：更好的商店收入意味着更好的地下城装备；更好的地下城战利品意味着更好的出售物品。像素艺术美丽温暖，商店管理系统有足够的深度保持令人满足，战斗是动作导向的（闪避、攻击、使用物品），五个地下城的多样性足以保持趣味。对于 cozy 游戏玩家，白天的店主部分提供了他们已经喜爱的温和节奏，而地下城则提供随信心增长的挑战。20 美元，经常促销到 5 美元，是最具价值的独立 RPG 之一。',
    why_zhTW:
      'Moonlighter（2018 年）是有史以來設計最令人滿足的雙循環遊戲之一：你扮演 Will，Rynoka 鎮上秘密夢想成為英雄的店主。白天你經營你的商店——為商品定價以獲取最大利潤、對付試圖偷竊的顧客、升級你的商店規模和家具，並雇用助手。夜晚你下降到小鎮下方程序生成的地下城，戰鬥、收集戰利品，並嘗試活著回來。兩個循環完美相互增強：更好的商店收入意味著更好的地下城裝備；更好的地下城戰利品意味著更好的出售物品。像素藝術美麗溫暖，商店管理系統有足夠的深度保持令人滿足，戰鬥是動作導向的（閃避、攻擊、使用物品），五個地下城的多樣性足以保持趣味。對於 cozy 遊戲玩家，白天的店主部分提供了他們已經喜愛的溫和節奏，而地下城則提供隨信心增長的挑戰。20 美元，經常促銷到 5 美元，是最具價值的獨立 RPG 之一。',
    why_ja:
      'Moonlighter（2018）は、二重ループの設計において過去最高クラスの満足感を誇るゲームのひとつです。プレイヤーはRynoka村でひっそりと英雄を夢見る店主のWillを演じます。昼間は店を経営し——アイテムに値段をつけて利益を最大化し、万引きしようとする客をあしらい、店を拡張して家具を整え、助手を雇います。夜になるとダンジョンに潜り、モンスターと戦い、戦利品を集め、生きて帰ることを目指します。この二つのループは見事にかみ合っています。稼いだお金でダンジョン装備が揃い、ダンジョンで手に入れたアイテムが店の在庫を豊かにするのです。ピクセルアートは温かく美しく、店管理システムは飽きのこない深さを持ち、戦闘はアクション系（回避・攻撃・アイテム使用）で5つのダンジョンにわたって変化を楽しめます。コージーゲーム好きにとっては、昼の店主パートが慣れ親しんだ穏やかなリズムを提供し、夜のダンジョンが自信とともにスケールする挑戦を与えてくれます。通常$20で、セール時は$5まで下がることも。インディーRPGのなかでも最高のコスパを誇る一本です。',
    why_ko:
      'Moonlighter(2018)는 역대 가장 만족스러운 이중 루프 게임 중 하나입니다. 플레이어는 Rynoka 마을에서 영웅을 꿈꾸는 상점 주인 Will을 연기합니다. 낮에는 상점을 운영하며——아이템 가격을 정해 최대 이익을 올리고, 도둑을 막고, 상점을 업그레이드하고 조수를 고용합니다. 밤에는 마을 아래 절차 생성된 던전에 내려가 몬스터와 싸우고 전리품을 모아 살아 돌아오는 것을 목표로 합니다. 두 루프는 완벽하게 서로를 강화합니다. 상점 수익이 좋아지면 더 좋은 던전 장비를 살 수 있고, 던전 전리품이 좋아질수록 판매 아이템도 풍성해집니다. 픽셀 아트는 따뜻하고 아름다우며, 상점 관리 시스템은 적절한 깊이를 유지하고, 전투는 액션 지향적(회피, 공격, 아이템 사용)으로 5개의 던전에 걸쳐 다양성을 제공합니다. 코지 게임 팬에게 낮의 상점 주인 파트는 익숙한 느긋한 리듬을, 던전 파트는 자신감과 함께 성장하는 도전을 제공합니다. 약 $20이며 세일 시 $5까지 내려가 인디 RPG 중 최고의 가성비를 자랑합니다.',
    why_de:
      'Moonlighter (2018) ist eines der befriedigendsten Doppelloop-Spiele überhaupt: Du spielst Will, einen Ladenbesitzer in der Stadt Rynoka, der heimlich davon träumt, ein Held zu sein. Tagsüber betreibst du deinen Laden — Preise festlegen, um maximalen Gewinn zu erzielen, mit Kunden umgehen, die stehlen wollen, die Ladengröße und Möbel upgraden und einen Assistenten einstellen. Nachts steigst du in prozedural generierte Dungeons unter der Stadt hinab, kämpfst gegen Monster, sammelst Beute und versuchst, lebend zurückzukehren. Die beiden Loops verstärken sich perfekt gegenseitig: Bessere Ladeneinnahmen bedeuten bessere Dungeon-Ausrüstung; bessere Dungeon-Beute bedeutet bessere Verkaufsartikel. Die Pixelkunst ist wunderschön und warm, das Laden-Management hat genau die richtige Tiefe und der Kampf ist aktionsorientiert (Ausweichen, Angreifen, Items benutzen) mit ausreichend Abwechslung über fünf Dungeons. Für Cozy-Spieler bietet der Ladenbesitzer-Tagesabschnitt den sanften Rhythmus, den sie lieben, während die Dungeons eine Herausforderung bieten, die mit dem Können skaliert. Bei ca. 20 $ mit häufigen Sales auf 5 $ ist es eines der besten Preis-Leistungs-Verhältnisse im Indie-RPG-Bereich.',
    tip_en: "Sell items in the shop before the next dungeon run to fund upgrades — but watch customer reactions carefully to learn what items are actually worth. A customer looking horrified means you underpriced; one who hesitates and buys anyway means you hit the ceiling. Price discovery is part of the game.",
    tip_zh: '在下次地下城探险前在商店出售物品来资助升级——但要仔细观察顾客的反应，了解物品的实际价值。顾客看起来很恐慌意味着你定价过低；一个犹豫后还是购买的人意味着你达到了价格上限。价格发现是游戏的一部分。',
    tip_zhTW: '在下次地下城探險前在商店出售物品來資助升級——但要仔細觀察顧客的反應，了解物品的實際價值。顧客看起來很恐慌意味著你定價過低；一個猶豫後還是購買的人意味著你達到了價格上限。價格發現是遊戲的一部分。',
    tip_ja: '次のダンジョン前に必ず店でアイテムを売って資金を確保しましょう。ただし客の反応をよく見ること。驚いた顔の客は安すぎるサイン、悩んでから買う客は価格の上限に達したサインです。値付けそのものがゲームの楽しさのひとつです。',
    tip_ko: '다음 던전에 가기 전에 상점에서 아이템을 팔아 업그레이드 자금을 마련하세요. 손님 반응을 잘 살피는 게 중요합니다. 손님이 깜짝 놀라는 표정이면 너무 싸게 판 것이고, 망설이다가 사는 손님은 가격 상한선에 도달했다는 신호입니다. 가격 탐색 자체가 게임의 일부입니다.',
    tip_de: 'Verkaufe Gegenstände im Laden, bevor du den nächsten Dungeon betrittst, um Upgrades zu finanzieren — aber achte genau auf die Reaktionen der Kunden. Ein erschreckter Kunde bedeutet, dass du zu niedrig bepreist hast; einer, der zögert und trotzdem kauft, bedeutet, dass du die Preisobergrenze getroffen hast. Preisfindung ist Teil des Spiels.',
  },
  cassette: {
    title_en: 'Cassette Beasts',
    title_zh: 'Cassette Beasts',
    title_zhTW: 'Cassette Beasts',
    title_ja: 'カセット・ビースト',
    title_ko: '카세트 비스트',
    title_de: 'Cassette Beasts',
    emoji: '📼',
    tag_en: 'A monster-taming RPG unlike Pokémon — record monsters onto cassette tapes, fuse two creatures to create new hybrid forms, and explore a strange island where everyone arrived from somewhere else',
    tag_zh: '一款与宝可梦截然不同的怪物收集 RPG——将怪物录制到卡带上、融合两只生物创造新的混合形态，并探索一个每个人都从其他地方来到的奇异岛屿',
    tag_zhTW: '一款與寶可夢截然不同的怪物收集 RPG——將怪物錄製到卡帶上、融合兩隻生物創造新的混合形態，並探索一個每個人都從其他地方來到的奇異島嶼',
    tag_ja: 'ポケモンとは一線を画すモンスター育成RPG——カセットテープに録音したモンスターを融合させて新種を生み出し、異世界から流れ着いた人々が暮らす不思議な島を冒険しよう',
    tag_ko: '포켓몬과는 전혀 다른 몬스터 수집 RPG——카세트 테이프에 몬스터를 녹음하고, 두 몬스터를 융합해 새로운 혼합 형태를 만들며, 다른 세계에서 온 사람들이 사는 이상한 섬을 탐험하세요',
    tag_de: 'Ein Monsterzähmungs-RPG ganz anders als Pokémon — nimm Monster auf Kassetten auf, fusioniere zwei Kreaturen zu neuen Hybridformen und erkunde eine seltsame Insel, auf der alle aus anderen Welten stammen',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, Xbox, Game Pass — about $20',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、Xbox、Game Pass——约 20 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、Xbox、Game Pass——約 20 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、Xbox、Game Pass——約$20',
    platform_ko: '플랫폼：PC(Steam), 닌텐도 스위치, Xbox, Game Pass——약 $20',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, Xbox, Game Pass — ca. 20 $',
    why_en:
      "Cassette Beasts (2023) is the most creative monster-taming RPG since the Pokémon games first launched — and in some ways more mechanically interesting. You play as someone who wakes up on New Wirral, an island that collects people who somehow slip from their home world, and discover that the local wildlife can be recorded onto cassette tapes and played back as battle forms. The key mechanic that sets it apart: any two monster cassettes can be fused mid-battle to create a hybrid creature that combines their moves, typing, and visual design. With 120 base monsters and unlimited fusion possibilities, the team-building depth is enormous. The island itself is designed with love — each area has its own aesthetic, the NPC companions each have a story arc that unfolds through sidequests, and the world-building raises interesting questions about how the island works. Available on Game Pass, making it essentially free to try. One of the most underrated games of 2023, frequently described by players as 'the Pokémon-like that actually evolved the genre.'",
    why_zh:
      'Cassette Beasts（2023 年）是自宝可梦游戏首次推出以来最具创意的怪物收集 RPG——在某些方面机制上更有趣。你扮演一个在 New Wirral 醒来的人，这是一个收集以某种方式从家园世界滑落的人的岛屿，并发现当地的野生动物可以录制到卡带上并作为战斗形态回放。使其与众不同的关键机制：任何两张怪物卡带都可以在战斗中融合，创造结合了它们的招式、属性和视觉设计的混合生物。凭借 120 只基础怪物和无限的融合可能性，队伍构建深度是巨大的。岛屿本身充满爱意设计——每个区域都有自己的美学，NPC 同伴各自有通过支线任务展开的故事弧线，世界构建提出了关于岛屿如何运作的有趣问题。Game Pass 上可用，使试玩基本上免费。2023 年最被低估的游戏之一，常被玩家描述为"真正进化了该类型的宝可梦类游戏"。',
    why_zhTW:
      'Cassette Beasts（2023 年）是自寶可夢遊戲首次推出以來最具創意的怪物收集 RPG——在某些方面機制上更有趣。你扮演一個在 New Wirral 醒來的人，這是一個收集以某種方式從家園世界滑落的人的島嶼，並發現當地的野生動物可以錄製到卡帶上並作為戰鬥形態回放。使其與眾不同的關鍵機制：任何兩張怪物卡帶都可以在戰鬥中融合，創造結合了它們的招式、屬性和視覺設計的混合生物。憑藉 120 只基礎怪物和無限的融合可能性，隊伍構建深度是巨大的。島嶼本身充滿愛意設計——每個區域都有自己的美學，NPC 同伴各自有通過支線任務展開的故事弧線，世界構建提出了關於島嶼如何運作的有趣問題。Game Pass 上可用，使試玩基本上免費。2023 年最被低估的遊戲之一，常被玩家描述為「真正進化了該類型的寶可夢類遊戲」。',
    why_ja:
      'Cassette Beasts（2023）は、ポケモン登場以来最も独創的なモンスター育成RPGと言えるかもしれません——メカニクスの面では、ある意味でポケモンを超えている部分もあります。プレイヤーは、何らかの理由で元の世界から迷い込んだ人々が住む島・New Wirralで目覚め、現地の野生生物をカセットテープに録音して戦闘フォームとして使えることを発見します。このゲームを際立たせるのが「融合」システム——戦闘中に任意の2体のカセットを融合させることで、技・タイプ・見た目がブレンドされたハイブリッドを生み出せます。基本120体のモンスターと無限の融合可能性で、チーム編成の深みは計り知れません。島そのものも愛情を込めて設計されており、エリアごとに独特の雰囲気があり、NPCの仲間たちはそれぞれサイドクエストで展開するストーリーを持ち、世界観には興味深い謎が散りばめられています。Game Passで遊べるので実質無料で試せます。2023年の最も過小評価されたゲームのひとつであり、「ポケモン系ゲームの中で本当に進化した作品」と評するプレイヤーも多いです。',
    why_ko:
      'Cassette Beasts(2023)는 포켓몬 이후 가장 창의적인 몬스터 수집 RPG입니다——어떤 면에서는 메커니즘이 더 흥미롭기도 합니다. 플레이어는 어떻게든 원래 세계에서 흘러들어온 사람들이 모이는 섬 New Wirral에서 눈을 뜨고, 현지 야생 생물을 카세트 테이프에 녹음해 전투 형태로 불러낼 수 있다는 사실을 발견합니다. 이 게임을 차별화하는 핵심 메커니즘: 어떤 두 몬스터 카세트든 전투 중에 융합하여 기술, 타입, 비주얼 디자인이 합쳐진 혼합 생물을 만들 수 있습니다. 120가지 기본 몬스터와 무한한 융합 가능성 덕분에 팀 빌딩 깊이는 엄청납니다. 섬 자체도 정성껏 설계되어——각 구역은 고유한 분위기를 갖고 있고, NPC 동반자들은 사이드 퀘스트를 통해 펼쳐지는 스토리 아크를 가지고 있으며, 세계관 구축은 섬의 작동 방식에 대한 흥미로운 질문을 던집니다. Game Pass에서 이용 가능해 사실상 무료로 체험할 수 있습니다. 2023년 가장 저평가된 게임 중 하나로, 많은 플레이어가 "포켓몬류 게임 중 진정으로 장르를 진화시킨 작품"이라고 평가합니다.',
    why_de:
      'Cassette Beasts (2023) ist das kreativste Monsterzähmungs-RPG seit den ersten Pokémon-Spielen — und in mancher Hinsicht mechanisch interessanter. Du spielst jemanden, der auf New Wirral aufwacht, einer Insel, die Menschen aufnimmt, die irgendwie aus ihrer Heimatwelt hinausgefallen sind, und entdeckst, dass die Tierwelt dort auf Kassetten aufgezeichnet und als Kampfformen abgespielt werden kann. Der entscheidende Mechanismus: Jede Kombination zweier Monsterkassetten kann im Kampf fusioniert werden, um ein Hybridwesen zu erschaffen, das deren Moves, Typing und visuelles Design vereint. Mit 120 Grundmonstern und unbegrenzten Fusionsmöglichkeiten ist die Team-Building-Tiefe enorm. Die Insel selbst ist liebevoll gestaltet — jeder Bereich hat seine eigene Ästhetik, die NPC-Begleiter haben alle eigene Bögen, die sich durch Nebenquests entfalten. Auf Game Pass verfügbar, also im Grunde kostenlos ausprobierbar. Eines der am meisten unterschätzten Spiele von 2023.',
    tip_en: "Experiment with fusions during every boss fight — some boss mechanics specifically punish certain typings, and fusing two creatures can give you emergency coverage you didn't have. Don't save fusion for 'special moments'; the game encourages you to try combinations freely.",
    tip_zh: '在每次 Boss 战斗中尝试融合——某些 Boss 机制专门惩罚特定属性，融合两只生物可以给你意外的覆盖范围。不要把融合留给"特殊时刻"；游戏鼓励你自由尝试组合。',
    tip_zhTW: '在每次 Boss 戰鬥中嘗試融合——某些 Boss 機制專門懲罰特定屬性，融合兩隻生物可以給你意外的覆蓋範圍。不要把融合留給「特殊時刻」；遊戲鼓勵你自由嘗試組合。',
    tip_ja: 'ボス戦では積極的に融合を試してみましょう——特定のタイプを狙い撃ちにするボスもいるので、融合で即席のカバレッジを作ることが鍵になります。「特別な場面」まで取っておく必要はなく、ゲーム自体が自由な組み合わせ試行を推奨しています。',
    tip_ko: '모든 보스 전투에서 융합을 실험해 보세요——일부 보스 메커니즘은 특정 타입을 집중 처벌하므로, 두 몬스터를 융합하면 없던 커버리지를 즉석에서 만들 수 있습니다. 융합을 "특별한 순간"을 위해 아껴두지 마세요. 게임이 자유롭게 조합을 시도하도록 장려합니다.',
    tip_de: 'Experimentiere bei jedem Bosskampf mit Fusionen — manche Boss-Mechaniken bestrafen bestimmte Typen gezielt, und das Fusionieren zweier Kreaturen kann dir spontan Abdeckung geben, die du sonst nicht hättest. Spare Fusionen nicht für "besondere Momente" auf; das Spiel ermutigt dich, Kombinationen frei auszuprobieren.',
  },
  hatintime: {
    title_en: 'A Hat in Time',
    title_zh: '时光帽',
    title_zhTW: '時光帽',
    title_ja: 'ア・ハット・イン・タイム',
    title_ko: '어 햇 인 타임',
    title_de: 'A Hat in Time',
    emoji: '🎩',
    tag_en: 'A joyful 3D collectathon platformer built around hat-throwing physics — expressive movement, creative worlds, charming writing, and the best feeling of mastering a character in the genre',
    tag_zh: '一款以帽子投掷物理为核心的欢乐 3D 收藏品平台游戏——富有表现力的移动、创意世界、迷人的文字和该类型中最好的掌握角色感觉',
    tag_zhTW: '一款以帽子投擲物理為核心的歡樂 3D 收藏品平台遊戲——富有表現力的移動、創意世界、迷人的文字和該類型中最好的掌握角色感覺',
    tag_ja: '帽子投げ物理を核にした楽しい3Dコレクタブル系プラットフォーマー——表現豊かな動作、個性的なステージ、チャーミングな文章、そしてこのジャンル最高の「キャラを乗りこなす快感」',
    tag_ko: '모자 던지기 물리를 중심으로 한 즐거운 3D 수집 플랫포머——표현력 있는 움직임, 창의적인 세계, 매력적인 글쓰기, 그리고 장르 최고의 캐릭터 마스터 느낌',
    tag_de: 'Ein freudvoller 3D-Collectathon-Plattformer rund um Hutwerfe-Physik — ausdrucksstarke Bewegung, kreative Welten, charmantes Writing und das beste Gefühl, einen Charakter zu meistern',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, Xbox — about $30',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、Xbox——约 30 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PS4、Xbox——約 30 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PS4、Xbox——約$30',
    platform_ko: '플랫폼：PC(Steam), 닌텐도 스위치, PS4, Xbox——약 $30',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PS4, Xbox — ca. 30 $',
    why_en:
      "A Hat in Time (2017) is the best modern 3D collectathon platformer — a love letter to the Nintendo 64 era of games like Super Mario 64 and Banjo-Kazooie, made by a small team with enormous creativity. You play as Hat Kid, a small alien girl who collects hourglasses to power her spaceship home, through five wildly different chapters: a cruise ship murder mystery, a movie studio with competing mafia owls and mob penguins, a forest that changes character based on which path you take, an alpine village with a scaffolding challenge, and a haunted manor. The movement system centers on a hookshot that transforms into a hat mid-flight — with upgrades it becomes one of the most expressive and satisfying platformer movement systems ever built. At 10-15 hours for the main game with significantly more in DLC, it is the perfect length for the experience it delivers. One of the highest-rated platformers of its decade with a warm, funny, and creative identity all its own.",
    why_zh:
      '时光帽（2017 年）是最好的现代 3D 收藏品平台游戏——一封给任天堂 64 时代游戏（如超级马里奥 64 和班卓熊）的情书，由一个拥有巨大创意的小团队制作。你扮演 Hat Kid，一个收集沙漏为她的飞船提供动力回家的小外星女孩，历经五个截然不同的章节：一场邮轮谋杀悬案、一个由竞争猫头鹰黑手党和企鹅黑帮的电影工作室、一个根据你选择的路径改变性格的森林、一个带有脚手架挑战的高山村庄，以及一座闹鬼的庄园。移动系统以在飞行中变成帽子的钩爪为中心——升级后它成为有史以来最具表现力和最令人满足的平台游戏移动系统之一。主游戏 10-15 小时，DLC 还有更多，对于它所提供的体验来说长度恰到好处。十年来评分最高的平台游戏之一，拥有温暖、有趣、独具一格的创意身份。',
    why_zhTW:
      '時光帽（2017 年）是最好的現代 3D 收藏品平台遊戲——一封給任天堂 64 時代遊戲（如超級瑪利歐 64 和班卓熊）的情書，由一個擁有巨大創意的小團隊製作。你扮演 Hat Kid，一個收集沙漏為她的飛船提供動力回家的小外星女孩，歷經五個截然不同的章節：一場郵輪謀殺懸案、一個由競爭貓頭鷹黑手黨和企鵝黑幫的電影工作室、一個根據你選擇的路徑改變性格的森林、一個帶有鷹架挑戰的高山村莊，以及一座鬧鬼的莊園。移動系統以在飛行中變成帽子的鉤爪為中心——升級後它成為有史以來最具表現力和最令人滿足的平台遊戲移動系統之一。主遊戲 10-15 小時，DLC 還有更多，對於它所提供的體驗來說長度恰到好處。十年來評分最高的平台遊戲之一，擁有溫暖、有趣、獨具一格的創意身份。',
    why_ja:
      'A Hat in Time（2017）は、現代のコレクタブル系3Dプラットフォーマーで最高傑作と言えるゲームです。スーパーマリオ64やバンジョーカズーイといったニンテンドー64時代への愛に溢れた作品で、才能あふれる小さなチームが作りました。プレイするのは、砂時計を集めて宇宙船で故郷に帰ろうとする小さな宇宙人の女の子・Hat Kid。5つの個性的なチャプターを冒険します——クルーズ船での殺人ミステリー、フクロウマフィアとペンギンギャングが競う映画スタジオ、進む道で雰囲気が変わる森、足場を上るアルプスの村、お化け屋敷。移動システムは空中で帽子に変形するフックショットを軸に構築されており、アップグレードすると同ジャンル史上でも指折りの表現力と快感を誇るシステムに進化します。メインゲームは10〜15時間、DLCを加えればさらに長く、ボリュームもちょうどいい。ここ10年で最高評価のプラットフォーマーのひとつで、温かく、楽しく、唯一無二の個性を持っています。',
    why_ko:
      'A Hat in Time(2017)는 현대 3D 수집 플랫포머 중 최고의 작품입니다——슈퍼 마리오 64, 반조-카주이 같은 닌텐도 64 시대 게임에 보내는 러브레터로, 엄청난 창의력을 가진 소규모 팀이 만들었습니다. 플레이어는 모래시계를 모아 우주선으로 집에 돌아가려는 작은 외계 소녀 Hat Kid를 연기하며 5개의 완전히 다른 챕터를 통과합니다: 크루즈선 살인 미스터리, 경쟁하는 올빼미 마피아와 펭귄 조직의 영화 스튜디오, 선택한 경로에 따라 분위기가 바뀌는 숲, 발판 도전이 있는 산골 마을, 그리고 귀신이 나오는 저택. 이동 시스템은 비행 중 모자로 변형되는 훅샷을 중심으로 구성되어 있으며, 업그레이드하면 장르 역사상 가장 표현력 있고 만족스러운 이동 시스템 중 하나가 됩니다. 메인 게임 10~15시간, DLC까지 포함하면 더 길며 경험에 딱 맞는 볼륨입니다. 10년 통틀어 가장 높은 평가를 받은 플랫포머 중 하나로 따뜻하고, 재미있고, 독창적인 정체성을 가지고 있습니다.',
    why_de:
      'A Hat in Time (2017) ist der beste moderne 3D-Collectathon-Plattformer — ein Liebesbrief an die Nintendo-64-Ära mit Spielen wie Super Mario 64 und Banjo-Kazooie, erstellt von einem kleinen Team mit enormer Kreativität. Du spielst Hat Kid, ein kleines Alien-Mädchen, das Sanduhren sammelt, um ihr Raumschiff nach Hause anzutreiben, durch fünf völlig unterschiedliche Kapitel: ein Kreuzfahrtschiff-Mordmysterium, ein Filmstudio mit konkurrierenden Eulen-Mafia und Pinguin-Gang, einen Wald, der sich je nach gewähltem Weg verändert, ein Alpendorf mit Gerüst-Challenge und ein Geisterschloss. Das Bewegungssystem baut auf einem Fanghaken auf, der sich im Flug in einen Hut verwandelt — mit Upgrades wird es eines der ausdrucksstärksten und befriedigendsten Platformer-Bewegungssysteme, die je entwickelt wurden. 10-15 Stunden für das Hauptspiel, deutlich mehr mit DLC — eine perfekte Länge für das gebotene Erlebnis. Einer der am höchsten bewerteten Plattformer des Jahrzehnts mit warmer, lustiger und kreativer Identität.',
    tip_en: "Earn the Sprint Hat (Chapter 2) as early as possible — it transforms movement and makes the whole game feel better. The game is extremely generous with its collectibles; if you explore naturally you will almost never need to grind. Save your time pieces for new chapter unlocks first.",
    tip_zh: '尽早获得冲刺帽（第 2 章）——它改变了移动方式，让整个游戏感觉更好。游戏对其收藏品非常慷慨；如果你自然探索，你几乎永远不需要磨练。首先将你的时间片段用于解锁新章节。',
    tip_zhTW: '盡早獲得衝刺帽（第 2 章）——它改變了移動方式，讓整個遊戲感覺更好。遊戲對其收藏品非常慷慨；如果你自然探索，你幾乎永遠不需要磨練。首先將你的時間片段用於解鎖新章節。',
    tip_ja: 'スプリントハット（チャプター2）をできるだけ早く入手しましょう——移動感がガラッと変わり、ゲーム全体がもっと楽しくなります。コレクターアイテムは太っ腹な設計なので、普通に探索するだけでグラインドはほぼ不要。タイムピースは新チャプターアンロックに優先して使いましょう。',
    tip_ko: '최대한 빨리 스프린트 햇(챕터 2)을 획득하세요——이동 방식이 완전히 달라지며 게임 전체가 더 즐거워집니다. 수집품은 매우 관대하게 설계되어 있어 자연스럽게 탐험하면 거의 그라인드가 필요 없습니다. 타임 피스는 새 챕터 해금에 우선 사용하세요.',
    tip_de: 'Hol dir den Sprint Hat (Kapitel 2) so früh wie möglich — er verändert die Bewegung fundamental und lässt das ganze Spiel besser anfühlen. Das Spiel ist sehr großzügig mit Sammelobjekten; wenn du natürlich erkundest, musst du fast nie grinden. Verwende deine Zeitstücke zuerst für neue Kapitelfreischaltungen.',
  },
  crosscode: {
    title_en: 'CrossCode',
    title_zh: 'CrossCode',
    title_zhTW: 'CrossCode',
    title_ja: 'クロスコード',
    title_ko: '크로스코드',
    title_de: 'CrossCode',
    emoji: '⚡',
    tag_en: 'A lone player inside an MMO world — reactive real-time combat, deep skill trees, meticulously designed puzzles, and a 60-hour anime RPG narrative about identity and what is real',
    tag_zh: '一个在 MMO 世界中的孤独玩家——反应性实时战斗、深度技能树、精心设计的谜题，以及一个关于身份认同和什么是真实的 60 小时动漫 RPG 叙事',
    tag_zhTW: '一個在 MMO 世界中的孤獨玩家——反應性實時戰鬥、深度技能樹、精心設計的謎題，以及一個關於身份認同和什麼是真實的 60 小時動漫 RPG 敘事',
    tag_ja: 'MMOの中に一人で紛れ込んだプレイヤー——反応性のあるリアルタイム戦闘、深いスキルツリー、精密に設計されたパズル、そしてアイデンティティと現実を問う60時間のアニメRPG物語',
    tag_ko: 'MMO 세계 속의 혼자인 플레이어——반응형 실시간 전투, 깊은 스킬 트리, 정교하게 설계된 퍼즐, 그리고 정체성과 현실에 관한 60시간 애니메이션 RPG 서사',
    tag_de: 'Ein einsamer Spieler in einer MMO-Welt — reaktives Echtzeit-Kampfsystem, tiefe Skill-Bäume, akribisch gestaltete Rätsel und eine 60-Stunden-Anime-RPG-Erzählung über Identität und Realität',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, Xbox — about $20. DLC: A New Home ~$8.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、Xbox——约 20 美元。DLC：新家园约 8 美元。',
    platform_zhTW: '可在以下平台取得：PC（Steam、GOG）、Nintendo Switch、PS4、Xbox——約 20 美元。DLC：新家園約 8 美元。',
    platform_ja: '対応プラットフォーム：PC（Steam、GOG）、Nintendo Switch、PS4、Xbox——約$20。DLC「A New Home」は約$8。',
    platform_ko: '플랫폼：PC(Steam, GOG), 닌텐도 스위치, PS4, Xbox——약 $20. DLC: A New Home 약 $8.',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), Nintendo Switch, PS4, Xbox — ca. 20 $. DLC: A New Home ca. 8 $.',
    why_en:
      "CrossCode (2018) is one of the most underrated RPGs ever made — a game that simulates what it would feel like to be a mute player character inside a future anime MMORPG, surrounded by NPC players who treat the game world as a social space while you are on a mission that only you understand. The premise sounds niche but the game delivers on every front: the real-time combat system has enough depth that skilled players are still discovering optimizations years later, the puzzle design (especially in dungeons) is meticulous and satisfying, the skill tree lets you specialize in dozens of build directions, and the 60-70 hour story builds slowly toward revelations that genuinely land emotionally. The developer spent seven years making it; every system feels polished to an unusual degree. For cozy game players specifically who have been afraid of 'hard RPGs,' CrossCode's difficulty is adjustable in granular ways — you can tune combat difficulty, puzzle hints, and enemy aggression separately. One of the finest games of the 2010s.",
    why_zh:
      'CrossCode（2018 年）是有史以来最被低估的 RPG 之一——一款模拟在一个未来动漫 MMORPG 中作为沉默玩家角色的感受的游戏，被将游戏世界视为社交空间的 NPC 玩家包围，而你正在执行只有你理解的任务。前提听起来很小众，但游戏在各方面都兑现了：实时战斗系统有足够的深度，多年后熟练玩家仍在发现优化方法；谜题设计（尤其是地下城中）细致而令人满足；技能树让你专注于数十个构建方向；60-70 小时的故事慢慢构建到真正情感落地的揭示。开发者花了七年制作；每个系统都感觉被打磨到了异乎寻常的程度。对于一直害怕"困难 RPG"的 cozy 游戏玩家，CrossCode 的难度可以精细调整——你可以分别调整战斗难度、谜题提示和敌人攻击性。2010 年代最好的游戏之一。',
    why_zhTW:
      'CrossCode（2018 年）是有史以來最被低估的 RPG 之一——一款模擬在一個未來動漫 MMORPG 中作為沉默玩家角色的感受的遊戲，被將遊戲世界視為社交空間的 NPC 玩家包圍，而你正在執行只有你理解的任務。前提聽起來很小眾，但遊戲在各方面都兌現了：實時戰鬥系統有足夠的深度，多年後熟練玩家仍在發現優化方法；謎題設計（尤其是地下城中）細緻而令人滿足；技能樹讓你專注於數十個構建方向；60-70 小時的故事慢慢構建到真正情感落地的揭示。開發者花了七年製作；每個系統都感覺被打磨到了異乎尋常的程度。對於一直害怕「困難 RPG」的 cozy 遊戲玩家，CrossCode 的難度可以精細調整——你可以分別調整戰鬥難度、謎題提示和敵人攻擊性。2010 年代最好的遊戲之一。',
    why_ja:
      'CrossCode（2018）は過小評価されたRPGの中でも最高レベルの一本です——未来のアニメ風MMORPGの中で口のきけないプレイヤーキャラクターを演じるというシミュレーション体験で、ゲーム世界を社交の場として扱うNPCプレイヤーたちに囲まれながら、あなただけが理解するミッションに挑みます。設定は一見ニッチですが、ゲームはあらゆる面で期待に応えています。リアルタイム戦闘システムは奥が深く、熟練プレイヤーが数年後も最適解を発見し続けるほど。ダンジョンのパズル設計は精緻で満足度が高く、スキルツリーは何十もの方向性でビルドを特化できます。60〜70時間のストーリーはゆっくりと積み上げて、最終的に本当に感情的に着地する展開を見せます。開発者は7年をかけて作り上げ、すべてのシステムが異常なほど磨き込まれています。「難しいRPGが怖い」というコージーゲーム勢のために、CrossCodeは戦闘難度・パズルヒント・敵の積極性を個別に調整できます。2010年代最高のゲームのひとつです。',
    why_ko:
      'CrossCode(2018)는 역대 가장 저평가된 RPG 중 하나입니다——미래의 애니메이션 풍 MMORPG 안에서 말 없는 플레이어 캐릭터로 활동하는 경험을 시뮬레이션하는 게임으로, 게임 세계를 사교의 장으로 활용하는 NPC 플레이어들에게 둘러싸인 채 오직 당신만이 이해하는 임무를 수행합니다. 설정은 다소 틈새적으로 들릴 수 있지만 게임은 모든 면에서 기대에 부응합니다. 실시간 전투 시스템은 숙련된 플레이어들이 수년 후에도 최적화를 발견하고 있을 만큼 깊고, 퍼즐 디자인(특히 던전)은 정교하고 만족스러우며, 스킬 트리는 수십 가지 빌드 방향으로 특화할 수 있습니다. 60~70시간의 스토리는 천천히 쌓아 올려 진정으로 감정적으로 착지하는 폭로로 마무리됩니다. 개발자는 7년을 들여 만들었으며 모든 시스템이 비정상적으로 잘 다듬어진 느낌입니다. "어려운 RPG가 두려운" 코지 게임 팬을 위해 CrossCode는 전투 난이도, 퍼즐 힌트, 적 공격성을 개별적으로 조정할 수 있습니다. 2010년대 최고의 게임 중 하나입니다.',
    why_de:
      'CrossCode (2018) ist eines der am meisten unterschätzten RPGs überhaupt — ein Spiel, das simuliert, wie es sich anfühlen würde, als stummer Spielercharakter in einem futuristischen Anime-MMORPG zu sein, umgeben von NPC-Spielern, die die Spielwelt als sozialen Raum behandeln, während du eine Mission ausführst, die nur du verstehst. Die Prämisse klingt nischig, aber das Spiel erfüllt auf jeder Front: Das Echtzeit-Kampfsystem hat genug Tiefe, dass erfahrene Spieler Jahre später noch Optimierungen entdecken; das Rätseldesign (besonders in Dungeons) ist akribisch und befriedigend; der Skill-Baum lässt dich in Dutzende Bau-Richtungen spezialisieren; und die 60-70-stündige Geschichte baut langsam auf Enthüllungen hin, die emotional wirklich landen. Der Entwickler hat sieben Jahre daran gearbeitet; jedes System fühlt sich ungewöhnlich poliert an. Für Cozy-Spieler, die Angst vor "schwierigen RPGs" haben: CrossCodes Schwierigkeit ist granular einstellbar — du kannst Kampfschwierigkeit, Rätselhinweise und Gegneraggressivität separat anpassen. Eines der besten Spiele der 2010er.',
    tip_en: "Do not skip the combat arts tutorial — the combat system looks simple for the first few hours but the arts (special moves with elemental switching) are where the depth lives. Spend time with each art type and you will find the combat becomes completely different from the early impression.",
    tip_zh: '不要跳过战斗技能教程——战斗系统在最初几个小时看起来很简单，但技能（带元素切换的特殊移动）是深度所在。花时间了解每种技能类型，你会发现战斗与最初的印象完全不同。',
    tip_zhTW: '不要跳過戰鬥技能教學——戰鬥系統在最初幾個小時看起來很簡單，但技能（帶元素切換的特殊移動）是深度所在。花時間了解每種技能類型，你會發現戰鬥與最初的印象完全不同。',
    tip_ja: '戦闘アーツのチュートリアルは絶対に飛ばさないように。最初の数時間は戦闘がシンプルに見えますが、アーツ（属性切り替えを伴う特殊技）に本当の深みが宿っています。各アーツに時間をかけると、最初の印象とはまったく異なる戦闘体験が待っています。',
    tip_ko: '전투 아츠 튜토리얼을 건너뛰지 마세요——전투 시스템은 처음 몇 시간 동안 단순해 보이지만, 아츠(원소 전환을 동반한 특수 기술)에 진정한 깊이가 있습니다. 각 아츠 유형에 시간을 들이면 전투가 초기 인상과 완전히 달라집니다.',
    tip_de: 'Überspringe das Combat-Arts-Tutorial nicht — das Kampfsystem sieht in den ersten Stunden einfach aus, aber die Arts (Spezialangriffe mit Elementwechsel) sind der Kern der Tiefe. Beschäftige dich mit jedem Art-Typ, und du wirst feststellen, dass der Kampf sich völlig anders anfühlt als anfangs.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { moonlighter: 0, cassette: 0, hatintime: 0, crosscode: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyRpgQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-rpg-quiz`
    const shareText = getLoc(
      `Cozy 玩家 RPG 进阶测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My indie RPG for cozy gamers: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `Cozy 玩家 RPG 進階測驗結果：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `コージーゲーマーにおすすめのインディーRPG：${result.title_ja} — ${result.tag_ja}。あなたも診断：${url}`,
      `코지 게이머를 위한 인디 RPG 추천 결과: ${result.title_ko} — ${result.tag_ko}. 당신도 해보세요: ${url}`,
      `Mein Indie-RPG für Cozy-Spieler: ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`,
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
            '哪款独立 RPG 最适合 Cozy 游戏玩家？',
            'Which Indie RPG Is Perfect for a Cozy Gamer?',
            '哪款獨立 RPG 最適合 Cozy 遊戲玩家？',
            'どのインディーRPGがコージーゲーマーにぴったり？',
            '코지 게이머에게 완벽한 인디 RPG는?',
            'Welches Indie-RPG ist perfekt für Cozy-Spieler?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从 Moonlighter、Cassette Beasts、时光帽、CrossCode 中找到你的 RPG 进阶游戏',
            '6 questions to match you with Moonlighter, Cassette Beasts, A Hat in Time, or CrossCode — your next step beyond cozy farming',
            '6 個問題，從 Moonlighter、Cassette Beasts、時光帽、CrossCode 中找到你的 RPG 進階遊戲',
            '6つの質問で Moonlighter、Cassette Beasts、A Hat in Time、CrossCode の中からあなたにぴったりのRPGを診断',
            '6가지 질문으로 Moonlighter, Cassette Beasts, A Hat in Time, CrossCode 중 당신의 다음 RPG를 찾아보세요',
            '6 Fragen, um deinen perfekten Indie-RPG zu finden — Moonlighter, Cassette Beasts, A Hat in Time oder CrossCode',
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
        {getLoc('找到我的 RPG 进阶游戏', 'Find My RPG Next Step', '找到我的 RPG 進階遊戲', '私のRPGを見つける', '내 RPG 찾기', 'Mein RPG finden')}
      </button>
    </div>
  )
}
