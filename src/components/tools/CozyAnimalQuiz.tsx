'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'neko-atsume' | 'webfishing' | 'goose-game' | 'little-kitty'

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
    q_en: 'What kind of relationship with the animal do you want in this game?',
    q_zh: '你想要在这款游戏中和动物建立什么样的关系？',
    q_zhTW: '你想要在這款遊戲中和動物建立什麼樣的關係？',
    q_ja: 'このゲームで動物とどんな関係を築きたいですか？',
    q_ko: '이 게임에서 동물과 어떤 관계를 원하시나요?',
    q_de: 'Welche Art von Beziehung zu Tieren wünschst du dir in diesem Spiel?',
    options: [
      { en: 'Passive — leave out snacks, check the camera, see who visited while I was away', zh: '被动——放出零食、查看相机、看看我不在时谁来过', zhTW: '被動——放出零食、查看相機、看看我不在時誰來過', ja: 'のんびり派——おやつを置いてカメラを確認、留守中に誰が来たか見る', ko: '수동적으로 — 간식을 놓고 카메라 확인, 내가 없는 동안 누가 왔는지 보기', de: 'Passiv — Snacks rauslegen, Kamera checken, schauen wer vorbeigekommen ist', type: 'neko-atsume' },
      { en: 'Social — fish with other people online, talk to fish, be surrounded by gentle chaos', zh: '社交——和其他人在线钓鱼、和鱼交谈、被温和的混乱包围', zhTW: '社交——和其他人在線釣魚、和魚交談、被溫和的混亂包圍', ja: 'ソーシャル派——オンラインで他の人と釣りをして、魚と話して、ゆるいカオスに包まれる', ko: '소셜 — 온라인에서 다른 사람들과 낚시하고, 물고기와 대화하고, 따뜻한 혼란에 둘러싸이기', de: 'Gesellig — online mit anderen angeln, mit Fischen reden, von sanftem Chaos umgeben sein', type: 'webfishing' },
      { en: 'Mischievous — I want to BE the animal causing harmless trouble for unsuspecting humans', zh: '淘气——我想成为那只给毫无防备的人类制造无害麻烦的动物', zhTW: '淘氣——我想成為那隻給毫無防備的人類製造無害麻煩的動物', ja: 'いたずら派——無防備な人間に無害なトラブルを起こす動物になりたい', ko: '장난꾸러기 — 아무것도 모르는 인간들에게 무해한 장난을 치는 동물이 되고 싶어요', de: 'Lausbub — Ich will das Tier sein, das ahnungslosen Menschen harmlosen Ärger bereitet', type: 'goose-game' },
      { en: 'Exploratory — wander a city as a cat, discover secret rooftops, befriend strangers', zh: '探索——作为猫漫游城市、发现秘密屋顶、结交陌生人', zhTW: '探索——作為貓漫遊城市、發現秘密屋頂、結交陌生人', ja: '探索派——猫として街を歩き回り、秘密の屋上を発見し、見知らぬ人と仲良くなる', ko: '탐험적으로 — 고양이로 도시를 돌아다니며 비밀 옥상을 발견하고 낯선 사람과 친해지기', de: 'Erkundend — als Katze durch eine Stadt streifen, geheime Dachterrassen entdecken, Fremde anfreunden', type: 'little-kitty' },
    ],
  },
  {
    q_en: 'How active do you want to be during a gaming session?',
    q_zh: '你在游戏过程中想有多活跃？',
    q_zhTW: '你在遊戲過程中想有多活躍？',
    q_ja: 'ゲームセッション中、どのくらい積極的に動きたいですか？',
    q_ko: '게임 중에 얼마나 활동적이고 싶으신가요?',
    q_de: 'Wie aktiv möchtest du während einer Gaming-Session sein?',
    options: [
      { en: 'Barely — I want to open the app for 2 minutes, feel happy about cats, and close it', zh: '几乎不——我想打开应用 2 分钟，为猫感到快乐，然后关掉它', zhTW: '幾乎不——我想打開應用 2 分鐘，為貓感到快樂，然後關掉它', ja: 'ほぼなし——アプリを2分開いて、猫に癒されて、閉じるだけでいい', ko: '거의 없이 — 앱을 2분 열어서 고양이를 보고 행복해지다가 닫고 싶어요', de: 'Kaum — App 2 Minuten öffnen, sich über Katzen freuen, wieder schließen', type: 'neko-atsume' },
      { en: 'Gently — cast a line, wait, chat with friends, reel something in eventually', zh: '轻柔地——抛线、等待、和朋友聊天、最终收回什么东西', zhTW: '輕柔地——拋線、等待、和朋友聊天、最終收回什麼東西', ja: 'のんびり——釣り糸を垂らして、待って、友達とおしゃべりして、ゆっくり何か釣り上げる', ko: '가볍게 — 낚시줄을 던지고, 기다리고, 친구들과 채팅하고, 결국 무언가 낚기', de: 'Sanft — eine Angel auswerfen, warten, mit Freunden quatschen, irgendwann was einholen', type: 'webfishing' },
      { en: 'Actively — I want to execute plans and watch them produce comedic results', zh: '积极地——我想执行计划并观察它们产生喜剧效果', zhTW: '積極地——我想執行計劃並觀察它們產生喜劇效果', ja: 'アクティブ——計画を実行して、コミカルな結果を見届けたい', ko: '적극적으로 — 계획을 실행하고 코믹한 결과가 나오는 것을 보고 싶어요', de: 'Aktiv — Pläne ausführen und zusehen, wie sie komische Ergebnisse produzieren', type: 'goose-game' },
      { en: 'Freely — wander wherever I want with no objective pressure, find things organically', zh: '自由地——没有目标压力地随意游荡，有机地发现事物', zhTW: '自由地——沒有目標壓力地隨意遊蕩，有機地發現事物', ja: '自由に——目標のプレッシャーなしに好きなところをぶらぶらして、自然に発見していく', ko: '자유롭게 — 목표 압박 없이 마음대로 돌아다니며 자연스럽게 발견하기', de: 'Frei — ohne Zieldruck herumwandern und Dinge organisch entdecken', type: 'little-kitty' },
    ],
  },
  {
    q_en: 'Do you want to play with other people or alone?',
    q_zh: '你想和其他人一起玩还是独自玩？',
    q_zhTW: '你想和其他人一起玩還是獨自玩？',
    q_ja: '他のプレイヤーと一緒にプレイしたいですか？それともひとりで？',
    q_ko: '다른 사람들과 함께 플레이하고 싶으신가요, 아니면 혼자 하고 싶으신가요?',
    q_de: 'Möchtest du mit anderen spielen oder lieber allein?',
    options: [
      { en: 'Alone — this is a solo ritual, like tending a garden only I know about', zh: '独自——这是一个独自的仪式，就像照料一个只有我知道的花园', zhTW: '獨自——這是一個獨自的儀式，就像照料一個只有我知道的花園', ja: 'ひとりで——これは自分だけの儀式、自分しか知らない庭の手入れみたいなもの', ko: '혼자 — 이건 나만의 의식이에요, 나만 아는 정원을 가꾸는 것처럼', de: 'Allein — das ist ein Solo-Ritual, wie einen Garten pflegen, den nur ich kenne', type: 'neko-atsume' },
      { en: 'With others — the whole appeal is fishing alongside strangers who become friends', zh: '和他人——整个吸引力在于和陌生人一起钓鱼，他们成为朋友', zhTW: '和他人——整個吸引力在於和陌生人一起釣魚，他們成為朋友', ja: '他の人と——見知らぬ人と一緒に釣りをして友達になる、それが魅力のすべて', ko: '다른 사람들과 — 낯선 사람들과 함께 낚시하며 친구가 되는 게 매력의 전부예요', de: 'Mit anderen — der ganze Reiz ist, neben Fremden zu angeln, die zu Freunden werden', type: 'webfishing' },
      { en: 'Alone but best watched by others laughing at what I am doing', zh: '独自——但最好让其他人旁观，笑看我在做什么', zhTW: '獨自——但最好讓其他人旁觀，笑看我在做什麼', ja: 'ひとりで——でも他の人に笑いながら見てもらうのが最高', ko: '혼자지만 — 다른 사람들이 내가 하는 것을 보며 웃어주는 게 최고예요', de: 'Allein, aber am besten mit anderen, die lachend zuschauen', type: 'goose-game' },
      { en: 'Solo, but the city feels alive — NPCs react to what the cat does', zh: '独自——但城市感觉很有活力，NPC 会对猫的行为作出反应', zhTW: '獨自——但城市感覺很有活力，NPC 會對貓的行為作出反應', ja: 'ソロだけど、街に命が宿っている感じ——NPCが猫の行動に反応してくれる', ko: '혼자지만 도시가 살아있는 느낌 — NPC들이 고양이의 행동에 반응해요', de: 'Solo, aber die Stadt fühlt sich lebendig an — NPCs reagieren auf das, was die Katze macht', type: 'little-kitty' },
    ],
  },
  {
    q_en: 'Which of these sounds most like your ideal gaming moment?',
    q_zh: '以下哪个听起来最像你理想的游戏时刻？',
    q_zhTW: '以下哪個聽起來最像你理想的遊戲時刻？',
    q_ja: '次のうち、あなたの理想のゲームの瞬間に最も近いのはどれですか？',
    q_ko: '다음 중 당신의 이상적인 게임 순간과 가장 비슷한 것은 무엇인가요?',
    q_de: 'Was klingt am meisten nach deinem perfekten Gaming-Moment?',
    options: [
      { en: 'Opening the app after a long day to find a rare cat visiting for the first time', zh: '漫长的一天后打开应用，发现一只稀有猫咪首次到访', zhTW: '漫長的一天後打開應用，發現一隻稀有貓咪首次到訪', ja: '長い一日の後アプリを開いたら、レアな猫が初めて来てくれていた', ko: '긴 하루 후 앱을 열었더니 희귀한 고양이가 처음 방문해 있는 것을 발견하기', de: 'Die App nach einem langen Tag öffnen und eine seltene Katze beim Erstbesuch vorfinden', type: 'neko-atsume' },
      { en: 'Accidentally catching something extraordinary and everyone in the lobby reacts', zh: '意外钓到非凡的东西，大厅里的每个人都作出反应', zhTW: '意外釣到非凡的東西，大廳裡的每個人都作出反應', ja: '偶然すごいものを釣り上げて、ロビー全員が反応してくれる瞬間', ko: '우연히 엄청난 것을 낚았는데 로비의 모든 사람이 반응하는 것', de: 'Aus Versehen etwas Außergewöhnliches fangen und alle im Lobby drehen durch', type: 'webfishing' },
      { en: 'Perfectly executing a plan to steal a specific item while a human stares in disbelief', zh: '在一个人类不敢置信地盯着我的情况下，完美执行偷取特定物品的计划', zhTW: '在一個人類不敢置信地盯著我的情況下，完美執行偷取特定物品的計劃', ja: '人間が唖然と見つめる中、特定のアイテムを盗む計画を完璧に実行する', ko: '인간이 믿을 수 없다는 듯 바라보는 가운데 특정 아이템을 훔치는 계획을 완벽하게 실행하기', de: 'Einen Plan perfekt ausführen, um ein bestimmtes Item zu stehlen, während ein Mensch ungläubig zuschaut', type: 'goose-game' },
      { en: 'Discovering an unexpected rooftop garden that no one told me existed', zh: '发现一个没人告诉我存在的意外屋顶花园', zhTW: '發現一個沒人告訴我存在的意外屋頂花園', ja: '誰も教えてくれなかった屋上庭園を偶然発見する', ko: '아무도 존재한다고 알려주지 않은 예상치 못한 옥상 정원을 발견하기', de: 'Einen unerwarteten Dachgarten entdecken, von dem mir niemand erzählt hat', type: 'little-kitty' },
    ],
  },
  {
    q_en: 'What platform do you mainly play on?',
    q_zh: '你主要在什么平台上玩游戏？',
    q_zhTW: '你主要在什麼平台上玩遊戲？',
    q_ja: '主にどのプラットフォームでプレイしますか？',
    q_ko: '주로 어떤 플랫폼에서 게임을 하시나요?',
    q_de: 'Auf welcher Plattform spielst du hauptsächlich?',
    options: [
      { en: 'Mobile (iPhone or Android) — I want something for the phone, no console needed', zh: '手机（iPhone 或 Android）——我想要手机上的东西，不需要主机', zhTW: '手機（iPhone 或 Android）——我想要手機上的東西，不需要主機', ja: 'スマホ（iPhone または Android）——コンソール不要、スマホで遊べるゲームがほしい', ko: '모바일(iPhone 또는 Android) — 폰으로 할 수 있는 걸 원해요, 콘솔은 필요 없어요', de: 'Mobile (iPhone oder Android) — ich will etwas fürs Handy, keine Konsole nötig', type: 'neko-atsume' },
      { en: 'PC — Steam is where I play, I want a game for my computer', zh: 'PC——Steam 是我玩游戏的地方，我想要一款电脑游戏', zhTW: 'PC——Steam 是我玩遊戲的地方，我想要一款電腦遊戲', ja: 'PC——Steamでプレイするので、パソコン向けのゲームがほしい', ko: 'PC — Steam에서 게임해요, 컴퓨터용 게임을 원해요', de: 'PC — Steam ist meine Plattform, ich will ein Spiel für den Computer', type: 'webfishing' },
      { en: 'Nintendo Switch or PC — I want it on whatever is most convenient', zh: 'Nintendo Switch 或 PC——我想要在最方便的平台上玩', zhTW: 'Nintendo Switch 或 PC——我想要在最方便的平台上玩', ja: 'Nintendo Switch か PC——一番便利なプラットフォームで遊べればいい', ko: 'Nintendo Switch 또는 PC — 가장 편한 플랫폼이면 뭐든 좋아요', de: 'Nintendo Switch oder PC — ich will es auf der bequemsten Plattform spielen', type: 'goose-game' },
      { en: 'Any platform — I play on PC, Switch, or Xbox, any of them works', zh: '任何平台——我在 PC、Switch 或 Xbox 上玩，任何一个都行', zhTW: '任何平台——我在 PC、Switch 或 Xbox 上玩，任何一個都行', ja: 'どのプラットフォームでも——PC、Switch、Xboxどれでも大丈夫', ko: '어떤 플랫폼이든 — PC, Switch, Xbox 어디서든 다 플레이해요', de: 'Jede Plattform — ich spiele auf PC, Switch oder Xbox, alles funktioniert', type: 'little-kitty' },
    ],
  },
  {
    q_en: 'Which best describes how animals make you feel?',
    q_zh: '以下哪个最能描述动物让你感受到的？',
    q_zhTW: '以下哪個最能描述動物讓你感受到的？',
    q_ja: '動物があなたに与える感覚として最も近いのはどれですか？',
    q_ko: '동물이 당신에게 주는 느낌을 가장 잘 묘사한 것은 무엇인가요?',
    q_de: 'Was trifft am besten zu, wenn du beschreibst, wie Tiere dich fühlen lassen?',
    options: [
      { en: 'Peaceful — animals existing and living their lives makes me deeply content', zh: '平静——动物存在并过着自己的生活让我深感满足', zhTW: '平靜——動物存在並過著自己的生活讓我深感滿足', ja: '穏やか——動物が存在してそれぞれの生活を送っているだけで、深く満たされる', ko: '평화롭게 — 동물들이 존재하고 자신의 삶을 사는 것 자체가 깊은 만족감을 줘요', de: 'Friedlich — Tiere einfach existieren und ihr Leben leben zu sehen macht mich tief zufrieden', type: 'neko-atsume' },
      { en: 'Joyful — being around animals (even fish) makes me feel light and connected', zh: '快乐——和动物（甚至是鱼）在一起让我感到轻盈和连接', zhTW: '快樂——和動物（甚至是魚）在一起讓我感到輕盈和連結', ja: '楽しい——動物（魚でも！）と一緒にいると、軽やかでつながっている感覚になる', ko: '즐겁게 — 동물(물고기도요!)과 함께 있으면 가볍고 연결된 느낌이 들어요', de: 'Fröhlich — in der Nähe von Tieren (sogar Fischen!) fühle ich mich leicht und verbunden', type: 'webfishing' },
      { en: 'Entertained — animals being chaotic and unpredictable is endlessly funny', zh: '有趣——动物混乱且不可预测是无尽的笑点', zhTW: '有趣——動物混亂且不可預測是無盡的笑點', ja: '楽しませてくれる——動物がカオスで予測不能なのは本当に笑えて飽きない', ko: '재미있게 — 동물들이 혼란스럽고 예측 불가능한 것이 끝없이 재미있어요', de: 'Unterhalten — Tiere, die chaotisch und unberechenbar sind, sind endlos komisch', type: 'goose-game' },
      { en: 'Curious — animals notice the world differently than humans and I find that fascinating', zh: '好奇——动物以不同于人类的方式注意世界，我觉得这很迷人', zhTW: '好奇——動物以不同於人類的方式注意世界，我覺得這很迷人', ja: '好奇心旺盛——動物が人間とは違う視点で世界を見ているのが面白くてたまらない', ko: '호기심 있게 — 동물들이 인간과 다르게 세상을 인식한다는 것이 매력적이에요', de: 'Neugierig — Tiere nehmen die Welt anders wahr als Menschen und ich finde das faszinierend', type: 'little-kitty' },
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
  'neko-atsume': {
    title_en: 'Neko Atsume: Kitty Collector',
    title_zh: 'Neko Atsume（猫咪后院）',
    title_zhTW: 'Neko Atsume（貓咪後院）',
    title_ja: 'ねこあつめ',
    title_ko: '네코 아츠메 (고양이 모으기)',
    title_de: 'Neko Atsume: Kitty Collector',
    emoji: '🐱',
    tag_en: 'The original idle cat game — leave food, come back to happiness',
    tag_zh: '原版放置猫猫游戏——放出食物，回来收获幸福',
    tag_zhTW: '原版放置貓貓遊戲——放出食物，回來收獲幸福',
    tag_ja: '元祖放置猫ゲーム——えさを出して、戻ってきたら幸せが待っている',
    tag_ko: '원조 방치형 고양이 게임 — 음식을 두고 돌아오면 행복이 기다려요',
    tag_de: 'Das Original-Idle-Katzenspiel — Futter rauslegen, zurückkommen und glücklich sein',
    platform_en: 'Available on: iOS, Android — free (plus optional paid expansion)',
    platform_zh: '可在以下平台获取：iOS、Android——免费（另有可选付费扩展）',
    platform_zhTW: '可在以下平台取得：iOS、Android——免費（另有可選付費擴展）',
    platform_ja: '対応プラットフォーム：iOS、Android——無料（オプションの有料拡張あり）',
    platform_ko: '이용 가능 플랫폼: iOS, Android — 무료 (선택적 유료 확장판 있음)',
    platform_de: 'Erhältlich auf: iOS, Android — kostenlos (plus optionale kostenpflichtige Erweiterung)',
    why_en:
      "Neko Atsume is the purest idle game ever made — and it is entirely about cats. The premise is beautifully simple: you have a small yard. You leave out food and toys. Cats come to visit while you are not playing. You check in periodically to photograph the visitors, collect fish currency they leave behind as thanks, and use that currency to buy more items to attract more cats and unlock rare visitors. There are no quests, no time pressure, no fail states. Some cats are common and arrive quickly; others are rare and finicky and take weeks of specific setups to attract. The entire game runs in the background of your actual life. Opening it feels like checking on a garden that tends itself. Updated in 2023 with a full Reroll remake that adds a 3D town mode with even more content. Free on iOS and Android.",
    why_zh:
      '猫咪后院是有史以来最纯粹的放置游戏——它完全关于猫。前提简单得令人惊叹：你有一个小院子。你放出食物和玩具。当你不在玩的时候猫咪来拜访。你定期查看以拍摄访客、收集它们留下作为感谢的金鱼货币，并用那些货币购买更多物品来吸引更多猫咪并解锁稀有访客。没有任务、没有时间压力、没有失败状态。有些猫很常见，很快就来；其他的很稀有且挑剔，需要数周的特定设置才能吸引。整个游戏在你实际生活的背景下运行。打开它感觉就像查看一个自我照料的花园。2023 年更新了一个完整的 Reroll 重制版，增加了有更多内容的 3D 城镇模式。iOS 和 Android 上免费。',
    why_zhTW:
      '貓咪後院是有史以來最純粹的放置遊戲——它完全關於貓。前提簡單得令人驚嘆：你有一個小院子。你放出食物和玩具。當你不在玩的時候貓咪來拜訪。你定期查看以拍攝訪客、收集它們留下作為感謝的金魚貨幣，並用那些貨幣購買更多物品來吸引更多貓咪並解鎖稀有訪客。沒有任務、沒有時間壓力、沒有失敗狀態。有些貓很常見，很快就來；其他的很稀有且挑剔，需要數週的特定設置才能吸引。整個遊戲在你實際生活的背景下運行。打開它感覺就像查看一個自我照料的花園。2023 年更新了完整的 Reroll 重製版，增加了有更多內容的 3D 城鎮模式。iOS 和 Android 上免費。',
    why_ja:
      'ねこあつめは、史上最も純粋な放置ゲームです——そしてすべてが猫づくし。仕組みはシンプルの極み：小さなお庭があります。えさとおもちゃを置いておきます。あなたが遊んでいない間に猫たちが遊びに来ます。定期的にチェックして訪問者を写真に撮り、お礼に置いていったにぼし通貨を集め、その通貨でアイテムをもっと買ってさらに多くの猫を呼び、レア猫を解放します。クエストなし、時間制限なし、失敗なし。よく来る猫もいれば、特定の条件が揃わないと何週間も姿を見せないレア猫もいます。ゲームはあなたの実生活のバックグラウンドで動いています。アプリを開くのは、誰かが手入れしてくれている庭をのぞくような感覚。2023年にはRerollとしてリメイクされ、3Dタウンモードが追加されました。iOS・Android無料。',
    why_ko:
      '네코 아츠메는 역대 가장 순수한 방치형 게임입니다——전부 고양이에 관한 이야기예요. 게임 방식은 아름답도록 단순합니다: 작은 마당이 있어요. 음식과 장난감을 내놓으세요. 게임을 하지 않는 동안 고양이들이 놀러 옵니다. 주기적으로 들러서 방문객을 사진 찍고, 고양이들이 감사의 표시로 남긴 생선 화폐를 모아서, 그 화폐로 더 많은 아이템을 사서 더 많은 고양이를 부르고 희귀한 방문자를 해금하세요. 퀘스트도 없고, 시간 압박도 없고, 실패 상태도 없습니다. 흔한 고양이는 금방 오지만, 희귀하고 까다로운 고양이는 특정 설정을 몇 주간 유지해야 올 수 있어요. 게임 전체가 실생활의 배경에서 돌아갑니다. 앱을 여는 건 스스로 가꿔지는 정원을 들여다보는 것 같은 느낌이에요. 2023년에 Reroll로 리메이크되어 3D 타운 모드가 추가되었습니다. iOS와 Android에서 무료입니다.',
    why_de:
      'Neko Atsume ist das reinste Idle-Game, das je gemacht wurde — und es dreht sich vollständig um Katzen. Die Prämisse ist wunderschön simpel: Du hast einen kleinen Garten. Du legst Futter und Spielzeug raus. Katzen kommen zu Besuch, während du nicht spielst. Du schaust periodisch rein, um Besucher zu fotografieren, die Fisch-Währung einzusammeln, die sie als Dankeschön hinterlassen, und kaufst mit dieser Währung mehr Gegenstände, um mehr Katzen anzulocken und seltene Besucher freizuschalten. Keine Quests, kein Zeitdruck, keine Niederlage-Zustände. Manche Katzen sind häufig und kommen schnell; andere sind selten und wählerisch und brauchen wochenlange spezifische Setups. Das Spiel läuft im Hintergrund deines echten Lebens. Es zu öffnen fühlt sich an wie nach einem Garten sehen, der sich selbst pflegt. 2023 mit einem vollständigen Reroll-Remake aktualisiert, das einen 3D-Stadt-Modus mit noch mehr Inhalten hinzufügt. Kostenlos auf iOS und Android.',
    tip_en: "Put out Thunfishy tuna (the premium food) when you want to attract rare cats faster — save up enough fish to keep a steady supply.",
    tip_zh: '当你想更快吸引稀有猫咪时放出金枪鱼（高级食物）——存够金鱼来保持稳定供应。',
    tip_zhTW: '當你想更快吸引稀有貓咪時放出金槍魚（高級食物）——存夠金魚來保持穩定供應。',
    tip_ja: 'レア猫を早く呼びたいときはかつおぶし（高級えさ）を置いてみよう——コンスタントに置けるよう、にぼしをしっかり貯めておこう。',
    tip_ko: '희귀 고양이를 더 빨리 부르고 싶을 때는 가다랑어포(프리미엄 먹이)를 내놓으세요——꾸준히 공급할 수 있도록 생선을 충분히 모아두세요.',
    tip_de: 'Leg Thunfisch (das Premium-Futter) raus, wenn du seltene Katzen schneller anlocken willst — spare genug Fisch, um einen stetigen Vorrat zu halten.',
  },
  webfishing: {
    title_en: 'WEBFISHING',
    title_zh: 'WEBFISHING',
    title_zhTW: 'WEBFISHING',
    title_ja: 'WEBFISHING',
    title_ko: 'WEBFISHING',
    title_de: 'WEBFISHING',
    emoji: '🎣',
    tag_en: 'Viral lo-fi multiplayer fishing — strangers who become friends over a fishing hole',
    tag_zh: '病毒式低保真多人钓鱼——在钓鱼洞边成为朋友的陌生人',
    tag_zhTW: '病毒式低保真多人釣魚——在釣魚洞邊成為朋友的陌生人',
    tag_ja: 'バイラル系ローファイ釣りマルチ——釣り場で友達になる見知らぬ人たち',
    tag_ko: '바이럴 로파이 멀티 낚시 — 낚시터에서 친구가 되는 낯선 사람들',
    tag_de: 'Virales Lo-Fi-Multiplayer-Angeln — Fremde, die über einem Angelteich Freunde werden',
    platform_en: 'Available on: PC (Steam) — about $5 USD',
    platform_zh: '可在以下平台获取：PC（Steam）——约 5 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）——約 5 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）——約750円',
    platform_ko: '이용 가능 플랫폼: PC (Steam) — 약 6,000원',
    platform_de: 'Erhältlich auf: PC (Steam) — ca. 5 USD',
    why_en:
      "WEBFISHING became a viral hit in late 2024 for one reason: it is an incredibly cozy multiplayer experience that feels like nothing else. You create a small animal character (raccoon, cat, frog, any creature), load into a shared fishing lobby of up to 12 players, and fish together in a lo-fi pixelated world with a gorgeous chilled soundtrack. The fishing itself is simple — cast, wait, reel in at the right moment — but the real game is the community. Strangers chat about their day. People share what they caught. Someone's playing an in-game guitar. You can decorate a shared space. It has been described as 'a fishing game that is secretly a social space.' For $5, it has one of the highest happiness-per-dollar ratios of any game released in 2024. PC only on Steam.",
    why_zh:
      'WEBFISHING 在 2024 年底成为病毒式热门游戏，原因只有一个：它是一种令人难以置信的温馨多人体验，感觉与其他任何东西都不一样。你创建一个小动物角色（浣熊、猫、青蛙、任何生物），加入最多 12 名玩家的共享钓鱼大厅，在一个有着精彩轻松原声的低保真像素世界中一起钓鱼。钓鱼本身很简单——抛线、等待、在正确时机收线——但真正的游戏是社区。陌生人谈论他们的一天。人们分享他们钓到的东西。有人在玩游戏内吉他。你可以装饰共享空间。它被描述为"一款暗地里是社交空间的钓鱼游戏"。以 5 美元的价格，它拥有 2024 年发布的任何游戏中最高的每美元幸福感比率之一。仅在 Steam 上的 PC 版本。',
    why_zhTW:
      'WEBFISHING 在 2024 年底成為病毒式熱門遊戲，原因只有一個：它是一種令人難以置信的溫馨多人體驗，感覺與其他任何東西都不一樣。你創建一個小動物角色（浣熊、貓、青蛙、任何生物），加入最多 12 名玩家的共享釣魚大廳，在一個有著精彩輕鬆原聲的低保真像素世界中一起釣魚。釣魚本身很簡單——拋線、等待、在正確時機收線——但真正的遊戲是社群。陌生人談論他們的一天。人們分享他們釣到的東西。有人在玩遊戲內吉他。你可以裝飾共享空間。它被描述為「一款暗地裡是社交空間的釣魚遊戲」。以 5 美元的價格，它擁有 2024 年發布的任何遊戲中最高的每美元幸福感比率之一。僅在 Steam 上的 PC 版本。',
    why_ja:
      'WEBFISHINGは2024年末に爆発的にバイラルしました。理由はひとつ：これはほかに似たものがないほど居心地のよいマルチプレイ体験だからです。小動物キャラクター（アライグマ、猫、カエル、何でも）を作って、最大12人の共有釣りロビーに入り、ゴージャスなチルアウトBGMが流れるローファイなピクセルワールドで一緒に釣りをします。釣り自体はシンプル——糸を垂らして、待って、タイミングよく引き上げる——でも本当のゲームはコミュニティです。知らない人が今日あったことを話してくれます。釣れたものをみんなでシェアします。誰かがゲーム内ギターを弾いています。共有スペースを飾れます。「実は社交スペースな釣りゲーム」と表現されています。約750円で、2024年リリースのどのゲームよりも高い「1円あたりの幸福度」を誇ります。SteamのPC専用。',
    why_ko:
      'WEBFISHING은 2024년 말 바이럴 히트가 되었습니다. 이유는 단 하나: 다른 어떤 것과도 다른 믿을 수 없이 아늑한 멀티플레이어 경험이기 때문이에요. 작은 동물 캐릭터(너구리, 고양이, 개구리, 어떤 생물이든)를 만들어 최대 12명의 공유 낚시 로비에 입장해서, 멋진 칠아웃 사운드트랙이 흐르는 로파이 픽셀 세계에서 함께 낚시를 합니다. 낚시 자체는 단순합니다——줄을 던지고, 기다리고, 적절한 타이밍에 당기기——하지만 진짜 게임은 커뮤니티예요. 낯선 사람이 하루 일과를 이야기합니다. 낚은 것을 서로 공유합니다. 누군가는 게임 내 기타를 연주하고 있어요. 공유 공간을 꾸밀 수도 있습니다. "사실은 소셜 공간인 낚시 게임"이라고 묘사되곤 해요. 약 6,000원으로 2024년 출시 게임 중 가장 높은 가성비를 자랑합니다. Steam PC 전용입니다.',
    why_de:
      'WEBFISHING wurde Ende 2024 viral — aus einem einzigen Grund: Es ist ein unglaublich gemütliches Multiplayer-Erlebnis, das sich wie nichts anderes anfühlt. Du erstellst einen kleinen Tiercharakter (Waschbär, Katze, Frosch, irgendein Tier), joinnst eine gemeinsame Angel-Lobby mit bis zu 12 Spielern und angelst zusammen in einer Lo-Fi-Pixelwelt mit einem wunderschönen entspannten Soundtrack. Das Angeln selbst ist simpel — Leine auswerfen, warten, zur richtigen Zeit einholen — aber das eigentliche Spiel ist die Community. Fremde erzählen von ihrem Tag. Leute teilen, was sie gefangen haben. Jemand spielt eine Gitarre im Spiel. Du kannst einen gemeinsamen Raum dekorieren. Es wird als „ein Angelspiel, das heimlich ein Sozialraum ist" beschrieben. Für ~5 USD hat es eines der höchsten Glück-pro-Euro-Verhältnisse aller 2024 veröffentlichten Spiele. Nur auf Steam für PC.',
    tip_en: "Join a public lobby during peak hours (evenings on your timezone) — a full 12-player lobby with an active chat is the game at its best.",
    tip_zh: '在高峰时段（你时区的傍晚）加入公共大厅——有活跃聊天的满员 12 人大厅是游戏最佳状态。',
    tip_zhTW: '在高峰時段（你時區的傍晚）加入公共大廳——有活躍聊天的滿員 12 人大廳是遊戲最佳狀態。',
    tip_ja: 'ピーク時間帯（あなたのタイムゾーンの夕方）にパブリックロビーに入ろう——チャットが盛り上がった12人満員ロビーがゲームの真骨頂。',
    tip_ko: '피크 시간대(당신 시간대의 저녁)에 퍼블릭 로비에 참여하세요——활발한 채팅이 있는 12인 풀 로비가 게임의 최고 상태예요.',
    tip_de: 'Tritt zu Stoßzeiten (Abende in deiner Zeitzone) einem öffentlichen Lobby bei — ein voller 12-Spieler-Lobby mit aktivem Chat ist das Spiel in Bestform.',
  },
  'goose-game': {
    title_en: 'Untitled Goose Game',
    title_zh: '无标题鹅作游戏',
    title_zhTW: '無標題鵝作遊戲',
    title_ja: 'アンタイトルド・グース・ゲーム',
    title_ko: '언타이틀드 구스 게임',
    title_de: 'Untitled Goose Game',
    emoji: '🪿',
    tag_en: 'You are a horrible goose — the most joyful mischief ever put in a game',
    tag_zh: '你是一只可怕的鹅——游戏史上最令人愉悦的恶作剧',
    tag_zhTW: '你是一隻可怕的鵝——遊戲史上最令人愉悅的惡作劇',
    tag_ja: 'あなたはひどいガチョウ——ゲーム史上最もハッピーないたずら',
    tag_ko: '당신은 끔찍한 거위입니다 — 게임 역사상 가장 유쾌한 장난',
    tag_de: 'Du bist eine schreckliche Gans — das fröhlichste Chaos, das je in einem Spiel steckte',
    platform_en: 'Available on: PC (Steam/Epic), Nintendo Switch, PlayStation 4, Xbox',
    platform_zh: '可在以下平台获取：PC（Steam/Epic）、Nintendo Switch、PlayStation 4、Xbox',
    platform_zhTW: '可在以下平台取得：PC（Steam/Epic）、Nintendo Switch、PlayStation 4、Xbox',
    platform_ja: '対応プラットフォーム：PC（Steam/Epic）、Nintendo Switch、PlayStation 4、Xbox',
    platform_ko: '이용 가능 플랫폼: PC (Steam/Epic), Nintendo Switch, PlayStation 4, Xbox',
    platform_de: 'Erhältlich auf: PC (Steam/Epic), Nintendo Switch, PlayStation 4, Xbox',
    why_en:
      "Untitled Goose Game is about being a goose. A horrible goose. You wander a charming English village and complete to-do list items like 'steal the groundskeeper's keys,' 'make the boy in the yard fall in a puddle,' and 'get into the pub and cause a scene.' The humans react to you with increasingly panicked helplessness. You honk. You steal. You create chaos. The entire thing is funny every single moment — not because the game tells you it is, but because the physical comedy of a determined goose disrupting human life is genuinely, endlessly entertaining. It is short (about 2-3 hours to finish, more to find all optional tasks) but perfectly paced. One of the most original games of the past decade, available on every platform. Also has a two-player cooperative mode.",
    why_zh:
      '无标题鹅作游戏是关于成为一只鹅。一只可怕的鹅。你在迷人的英国村庄漫游，完成待办事项，如"偷走园丁的钥匙"、"让院子里的男孩摔进水坑"和"进入酒吧并制造一场混乱"。人类以越来越恐慌的无助来回应你。你嘎嘎叫。你偷窃。你制造混乱。整件事每时每刻都很有趣——不是因为游戏告诉你它是，而是因为一只坚定的鹅打乱人类生活的肢体喜剧是真正、无尽地令人娱乐的。它很短（完成大约 2-3 小时，找到所有可选任务需要更多时间），但节奏完美。过去十年中最具原创性的游戏之一，可在所有平台上获取。还有双人合作模式。',
    why_zhTW:
      '無標題鵝作遊戲是關於成為一隻鵝。一隻可怕的鵝。你在迷人的英國村莊漫遊，完成待辦事項，如「偷走園丁的鑰匙」、「讓院子裡的男孩摔進水坑」和「進入酒吧並製造一場混亂」。人類以越來越恐慌的無助來回應你。你嘎嘎叫。你偷竊。你製造混亂。整件事每時每刻都很有趣——不是因為遊戲告訴你它是，而是因為一隻堅定的鵝打亂人類生活的肢體喜劇是真正、無盡地令人娛樂的。它很短（完成大約 2-3 小時，找到所有可選任務需要更多時間），但節奏完美。過去十年中最具原創性的遊戲之一，可在所有平台上取得。還有雙人合作模式。',
    why_ja:
      'アンタイトルド・グース・ゲームは、ガチョウになる物語です。ひどいガチョウに。あなたはチャーミングなイギリスの村を歩き回り、「庭師の鍵を盗む」「庭の男の子を水たまりに落とす」「パブに乗り込んで騒動を起こす」といったToDoリストをこなします。人間たちはどんどんパニックになり、なすすべなく反応します。あなたはガーガー鳴きます。盗みます。混乱を起こします。全編一瞬一瞬がおかしくて笑えます——ゲームがそう言っているからではなく、頑固なガチョウが人間の生活をかき乱すフィジカルコメディが本当に、尽きることなく面白いからです。短いゲームです（クリアは約2〜3時間、オプション達成にはもう少し）が、ペーシングは完璧。全プラットフォームで遊べる過去10年間で最も独創的なゲームのひとつ。2人協力モードもあります。',
    why_ko:
      '언타이틀드 구스 게임은 거위가 되는 이야기입니다. 끔찍한 거위가 되는. 당신은 매력적인 영국 마을을 돌아다니며 "정원사의 열쇠 훔치기", "마당의 남자아이 물웅덩이에 빠트리기", "펍에 들어가서 소동 일으키기" 같은 할 일 목록을 완수합니다. 인간들은 점점 더 당황해하며 속수무책으로 반응합니다. 당신은 꽥꽥거립니다. 훔칩니다. 혼란을 일으킵니다. 게임 전체가 매 순간 웃깁니다——게임이 그렇다고 말해서가 아니라, 완고한 거위가 인간의 일상을 방해하는 피지컬 코미디가 진짜로, 끝없이 재미있기 때문입니다. 짧습니다(완주 약 2~3시간, 모든 선택 과제 완료에는 더 걸림)만 페이싱이 완벽해요. 지난 10년간 가장 독창적인 게임 중 하나로 모든 플랫폼에서 이용 가능합니다. 2인 협동 모드도 있습니다.',
    why_de:
      'Untitled Goose Game handelt davon, eine Gans zu sein. Eine schreckliche Gans. Du streifst durch ein charmantes englisches Dorf und erledigst To-do-Listen-Einträge wie "dem Gärtner den Schlüssel stehlen", "den Jungen im Hof in eine Pfütze fallen lassen" und "ins Pub eindringen und eine Szene machen". Die Menschen reagieren auf dich mit zunehmend panischer Hilflosigkeit. Du schnatterst. Du stiehlst. Du verbreitest Chaos. Das Ganze ist in jedem einzelnen Moment witzig — nicht weil das Spiel dir das sagt, sondern weil die körperliche Komödie einer entschlossenen Gans, die das Menschenleben stört, wirklich und endlos unterhaltsam ist. Es ist kurz (ca. 2–3 Stunden zum Durchspielen, mehr für alle optionalen Aufgaben), aber perfekt getaktet. Eines der originellsten Spiele des letzten Jahrzehnts, auf jeder Plattform verfügbar. Hat auch einen Zweispieler-Koop-Modus.',
    tip_en: "Pick up items and carry them somewhere absurd before triggering your target's reaction — the best moments come from setting up the scene.",
    tip_zh: '在触发目标反应之前，拾起物品并将它们带到荒诞的地方——最好的时刻来自设置场景。',
    tip_zhTW: '在觸發目標反應之前，拾起物品並將它們帶到荒誕的地方——最好的時刻來自設置場景。',
    tip_ja: '目標の反応を引き起こす前に、アイテムを拾って不条理な場所に持っていこう——最高の瞬間はシーンを仕込むことから生まれる。',
    tip_ko: '목표의 반응을 유발하기 전에 아이템을 집어 황당한 곳으로 가져가세요——최고의 순간은 장면을 설정하는 데서 나옵니다.',
    tip_de: 'Nimm Gegenstände auf und trag sie an einen absurden Ort, bevor du die Reaktion deines Ziels auslöst — die besten Momente entstehen durch das Vorbereiten der Szene.',
  },
  'little-kitty': {
    title_en: 'Little Kitty, Big City',
    title_zh: '小猫咪，大城市',
    title_zhTW: '小貓咪，大城市',
    title_ja: 'リトル・キティ・ビッグ・シティ',
    title_ko: '리틀 키티, 빅 시티',
    title_de: 'Little Kitty, Big City',
    emoji: '🏙️',
    tag_en: 'Explore a Japanese city as a lost cat — knock things over, befriend everyone',
    tag_zh: '作为一只迷路的猫探索日本城市——推倒东西、结交所有人',
    tag_zhTW: '作為一隻迷路的貓探索日本城市——推倒東西、結交所有人',
    tag_ja: '迷子の猫として日本の街を探索——物を倒して、みんなと仲良くなる',
    tag_ko: '길 잃은 고양이로 일본 도시를 탐험하세요 — 물건을 쓰러뜨리고 모두와 친해지기',
    tag_de: 'Eine japanische Stadt als verlorene Katze erkunden — Dinge umstoßen, alle anfreunden',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, Xbox (Game Pass) — around $20 USD',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、Xbox（Game Pass）——约 20 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、Xbox（Game Pass）——約 20 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、Xbox（Game Pass）——約2,500円',
    platform_ko: '이용 가능 플랫폼: PC (Steam), Nintendo Switch, Xbox (Game Pass) — 약 26,000원',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, Xbox (Game Pass) — ca. 20 USD',
    why_en:
      "Little Kitty, Big City is exactly what the title says: you are a small cat who fell from a high apartment window and needs to find your way home. You explore a detailed, lovingly crafted Japanese city neighborhood from ground level — which looks completely different from cat height. You can knock things off shelves (obviously), collect hats to wear, befriend animals who give you tasks and information, talk to humans who react to you with charmed bewilderment, and slowly piece together where home is. The game captures something true about how cats interact with the world: curious, unhurried, easily distracted by interesting things. It is short (4-6 hours to complete) but rich in small details and NPC charm. Available on Xbox Game Pass, making it free for subscribers. One of the most warmly reviewed indie games of 2024.",
    why_zh:
      '小猫咪，大城市正如标题所说：你是一只从高层公寓窗户掉落的小猫，需要找到回家的路。你从地面高度探索一个精致的、充满爱心打造的日本城市街区——从猫咪高度看起来完全不同。你可以把东西从架子上推下来（当然），收集帽子来戴，结交给你任务和信息的动物，和以迷人困惑回应你的人类交谈，慢慢拼凑出家在哪里。游戏捕捉到了一些关于猫如何与世界互动的真实之处：好奇、从容、容易被有趣的事物分散注意力。它很短（完成大约 4-6 小时），但在小细节和 NPC 魅力方面很丰富。可在 Xbox Game Pass 上获取，对订阅者免费。2024 年评价最温馨的独立游戏之一。',
    why_zhTW:
      '小貓咪，大城市正如標題所說：你是一隻從高層公寓窗戶掉落的小貓，需要找到回家的路。你從地面高度探索一個精緻的、充滿愛心打造的日本城市街區——從貓咪高度看起來完全不同。你可以把東西從架子上推下來（當然），收集帽子來戴，結交給你任務和信息的動物，和以迷人困惑回應你的人類交談，慢慢拼湊出家在哪裡。遊戲捕捉到了一些關於貓如何與世界互動的真實之處：好奇、從容、容易被有趣的事物分散注意力。它很短（完成大約 4-6 小時），但在小細節和 NPC 魅力方面很豐富。可在 Xbox Game Pass 上取得，對訂閱者免費。2024 年評價最溫馨的獨立遊戲之一。',
    why_ja:
      'リトル・キティ・ビッグ・シティはタイトルそのまま：高層マンションの窓から落ちてしまった小さな猫として、家に帰る道を探すゲームです。丁寧に作り込まれた日本の街の一角を、地面の高さから——猫の目線では全然違って見える——探索します。当然、棚から物を落とせます（もちろん！）。帽子を集めてかぶれます。クエストや情報をくれる動物と友達になれます。チャーミングな困惑で反応してくれる人間と話せます。そしてゆっくりと家への道を見つけていきます。このゲームは猫が世界とどう関わるかの本質を掴んでいます：好奇心旺盛で、焦らず、面白いものにすぐ気を取られる。短め（クリアまで約4〜6時間）ですが、小さなディテールとNPCの愛嬌が詰まっています。Xbox Game Passで遊べるのでサブスクライバーは無料。2024年最も温かみのあるインディーゲームのひとつ。',
    why_ko:
      '리틀 키티, 빅 시티는 제목 그대로입니다: 높은 아파트 창문에서 떨어진 작은 고양이가 되어 집으로 돌아가는 길을 찾는 게임이에요. 섬세하게 정성껏 만들어진 일본 도시 동네를 지면 높이에서——고양이 키에서는 완전히 다르게 보이죠——탐험합니다. 선반에서 물건을 밀어 떨어뜨릴 수 있고(물론이죠!), 모자를 모아 쓸 수도 있고, 임무와 정보를 주는 동물과 친해지고, 매력적인 어리둥절함으로 반응하는 인간들과 대화하며, 천천히 집이 어디 있는지 맞춰나갑니다. 이 게임은 고양이가 세상과 상호작용하는 방식에서 진실한 무언가를 포착합니다: 호기심 많고, 서두르지 않고, 흥미로운 것에 쉽게 주의가 분산되죠. 짧지만(완료까지 약 4~6시간) 작은 디테일과 NPC 매력이 넘쳐납니다. Xbox Game Pass에서 이용 가능해 구독자에게는 무료예요. 2024년 가장 따뜻한 평가를 받은 인디 게임 중 하나입니다.',
    why_de:
      'Little Kitty, Big City ist genau das, was der Titel sagt: Du bist eine kleine Katze, die aus einem Hochhausfenster gefallen ist und den Weg nach Hause finden muss. Du erkundest ein detailliertes, liebevoll gestaltetes japanisches Stadtviertel aus Bodenhöhe — was aus Katzenhöhe völlig anders aussieht. Du kannst Dinge von Regalen stoßen (natürlich), Hüte sammeln zum Anziehen, Tiere anfreunden, die dir Aufgaben und Informationen geben, mit Menschen reden, die mit charmanter Ratlosigkeit reagieren, und langsam zusammensetzen, wo zuhause ist. Das Spiel fängt etwas Wahres darüber ein, wie Katzen mit der Welt interagieren: neugierig, ungehetzt, leicht abgelenkt von interessanten Dingen. Es ist kurz (4–6 Stunden zum Durchspielen), aber reich an kleinen Details und NPC-Charme. Auf Xbox Game Pass verfügbar, für Abonnenten kostenlos. Eines der herzlichsten Indies von 2024.',
    tip_en: "Try wearing every hat you find — each hat changes how NPCs react to and greet you, which leads to some of the best moments in the game.",
    tip_zh: '尝试戴上你找到的每一顶帽子——每顶帽子都会改变 NPC 对你的反应和问候方式，这会带来游戏中一些最好的时刻。',
    tip_zhTW: '嘗試戴上你找到的每一頂帽子——每頂帽子都會改變 NPC 對你的反應和問候方式，這會帶來遊戲中一些最好的時刻。',
    tip_ja: '見つけた帽子を全部かぶってみよう——帽子によってNPCの反応や挨拶が変わって、ゲームの中で一番おかしな瞬間が生まれる。',
    tip_ko: '찾은 모든 모자를 써보세요——각 모자마다 NPC들이 반응하고 인사하는 방식이 달라지는데, 그 덕분에 게임에서 가장 좋은 순간들이 탄생합니다.',
    tip_de: 'Probiere jeden Hut aus, den du findest — jeder Hut verändert, wie NPCs auf dich reagieren und dich begrüßen, was zu einigen der besten Momente im Spiel führt.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'neko-atsume': 0,
    webfishing: 0,
    'goose-game': 0,
    'little-kitty': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyAnimalQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-animal-games`
    let shareText: string
    if (locale === 'zh') {
      shareText = `我的动物主题 cozy 游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
    } else if (locale === 'zh-TW') {
      shareText = `我的動物主題 cozy 遊戲推薦是「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`
    } else if (locale === 'ja') {
      shareText = `私のおすすめ動物コージーゲームは${result.title_ja}です！${result.tag_ja}。あなたも試して：${url}`
    } else if (locale === 'ko') {
      shareText = `내 동물 코지 게임은 ${result.title_ko}입니다! ${result.tag_ko}. 찾아보세요: ${url}`
    } else if (locale === 'de') {
      shareText = `Mein Animal-Cozy-Game-Match ist ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`
    } else {
      shareText = `My animal cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`
    }

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
              {getLoc('开始小贴士：', 'Getting started: ', '開始小貼士：', 'はじめのヒント：', '시작 팁: ', 'Einstieg-Tipp: ')}
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
            {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やる', '다시 테스트하기', 'Quiz wiederholen')}
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
            '你应该玩哪款动物主题 Cozy 游戏？',
            'Which Animal Cozy Game Should You Play?',
            '你應該玩哪款動物主題 Cozy 遊戲？',
            'どの動物コージーゲームが向いている？',
            '어떤 동물 코지 게임이 당신에게 맞을까요?',
            'Welches Animal-Cozy-Game solltest du spielen?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，在猫咪后院、WEBFISHING、无标题鹅作游戏和小猫咪大城市中找到最适合你的',
            '6 questions to find your match across Neko Atsume, WEBFISHING, Untitled Goose Game, and Little Kitty Big City',
            '6 個問題，在貓咪後院、WEBFISHING、無標題鵝作遊戲和小貓咪大城市中找到最適合你的',
            '6つの質問で、ねこあつめ・WEBFISHING・アンタイトルド・グース・ゲーム・リトル・キティの中からあなたにぴったりのゲームを見つけよう',
            '6가지 질문으로 네코 아츠메, WEBFISHING, 언타이틀드 구스 게임, 리틀 키티 빅 시티 중 나에게 맞는 게임 찾기',
            '6 Fragen, um dein Match aus Neko Atsume, WEBFISHING, Untitled Goose Game und Little Kitty Big City zu finden',
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
        {getLoc('找到我的动物游戏', 'Find My Animal Game', '找到我的動物遊戲', '私のゲームを見つける', '내 게임 찾기', 'Mein Spiel finden')}
      </button>
    </div>
  )
}
