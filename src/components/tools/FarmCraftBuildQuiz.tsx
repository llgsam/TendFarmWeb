'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'forager' | 'gardenpaws' | 'staxel' | 'havendock'

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
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copyLabel}
      </button>
      <a
        href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text)}
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
    q_en: 'What game pace feels most satisfying to you?',
    q_zh: '哪种游戏节奏让你最满足？',
    q_zhTW: '哪種遊戲節奏讓你最滿足？',
    q_ja: 'どんなゲームテンポが一番楽しいですか？',
    q_ko: '어떤 게임 페이스가 가장 만족스러운가요？',
    q_de: 'Welches Spieltempo fühlt sich für dich am befriedigendsten an?',
    options: [
      {
        en: 'Fast and addictive — I want rapid feedback, constantly unlocking new things, and the urge to keep going',
        zh: '快节奏且上瘾——我想要即时反馈、不断解锁新东西，以及停不下来的冲动',
        zhTW: '快節奏且上癮——我想要即時反饋、不斷解鎖新東西，以及停不下來的衝動',
        ja: 'スピーディで中毒性あり――すぐフィードバックが返ってきて、どんどんアンロックされて、やめられない感じが好き',
        ko: '빠르고 중독적인 — 즉각적인 피드백, 계속 해금되는 새로운 것들, 멈출 수 없는 충동이 좋아요',
        de: 'Schnell und süchtig machend — ich will sofortiges Feedback, ständig neue Dinge freischalten und den Drang weiterzuspielen',
        type: 'forager',
      },
      {
        en: 'Social and varied — a mix of daily tasks, community events, and chatting with villagers at a comfortable pace',
        zh: '社交感丰富且多样——日常任务、社区活动和和村民聊天混合在一起，节奏舒适',
        zhTW: '社交感豐富且多樣——日常任務、社區活動和與村民聊天混合在一起，節奏舒適',
        ja: '社交的でバラエティ豊か――日常タスク、コミュニティイベント、村人との会話がちょうどいいペースで混ざってる感じ',
        ko: '사교적이고 다양한 — 일상 과제, 커뮤니티 이벤트, 마을 주민과의 대화가 편안한 페이스로 섞여있어요',
        de: 'Sozial und abwechslungsreich — eine Mischung aus täglichen Aufgaben, Gemeinschaftsevents und Gesprächen mit Dorfbewohnern in gemütlichem Tempo',
        type: 'gardenpaws',
      },
      {
        en: 'Creative and open — I want to set my own pace and spend as much time building as farming',
        zh: '创意感强且开放——我想自己定节奏，花和农耕同样多甚至更多的时间在建造上',
        zhTW: '創意感強且開放——我想自己定節奏，花和農耕同樣多甚至更多的時間在建造上',
        ja: 'クリエイティブで自由――自分のペースで、農作業と同じかそれ以上の時間を建築に使いたい',
        ko: '창의적이고 개방적인 — 나만의 페이스로, 농사만큼 혹은 그 이상의 시간을 건설에 쓰고 싶어요',
        de: 'Kreativ und offen — ich will mein eigenes Tempo setzen und genauso viel Zeit mit Bauen wie mit Farmen verbringen',
        type: 'staxel',
      },
      {
        en: 'Slow and atmospheric — I want time to just exist in the world, watching the ocean and tending my floating farm',
        zh: '缓慢而有氛围——我想在世界里静静存在，看着海洋、照料我的漂浮农场',
        zhTW: '緩慢而有氛圍——我想在世界裡靜靜存在，看著海洋、照料我的漂浮農場',
        ja: 'ゆったりと雰囲気を楽しみたい――世界にただ存在して、海を眺めながら浮かぶ農場を手入れしたい',
        ko: '느리고 분위기 있는 — 그냥 세계 안에 있으면서 바다를 바라보고 떠다니는 농장을 돌보고 싶어요',
        de: 'Langsam und atmosphärisch — ich will einfach in der Welt existieren, den Ozean beobachten und meine schwimmende Farm pflegen',
        type: 'havendock',
      },
    ],
  },
  {
    q_en: 'Which core motivation drives you in farming games?',
    q_zh: '在农场游戏里，什么是你最核心的驱动力？',
    q_zhTW: '在農場遊戲裡，什麼是你最核心的驅動力？',
    q_ja: '農場ゲームで一番のモチベーションは何ですか？',
    q_ko: '농장 게임에서 핵심 동기는 무엇인가요？',
    q_de: 'Was ist deine Hauptmotivation in Farming-Spielen?',
    options: [
      {
        en: 'Efficiency and expansion — I want to keep growing, unlocking, and optimizing my operation',
        zh: '效率和扩张——持续成长、解锁和优化我的整个运营体系',
        zhTW: '效率和擴張——持續成長、解鎖和優化我的整個運營體系',
        ja: '効率と拡張――成長し続け、アンロックして、オペレーション全体を最適化すること',
        ko: '효율과 확장 — 계속 성장하고, 해금하고, 전체 운영을 최적화하는 것',
        de: 'Effizienz und Expansion — immer weiter wachsen, freischalten und meine Unternehmung optimieren',
        type: 'forager',
      },
      {
        en: 'Community and shop management — farming is how I supply my little shop and help my animal neighbors',
        zh: '社区和商店经营——农耕是为小店供货、帮助动物邻居的方式',
        zhTW: '社區和商店經營——農耕是為小店供貨、幫助動物鄰居的方式',
        ja: 'コミュニティとショップ経営――農業はお店に商品を供給して動物の隣人を助けるための手段',
        ko: '커뮤니티와 상점 운영 — 농사는 작은 가게에 물건을 공급하고 동물 이웃을 돕는 방법이에요',
        de: 'Gemeinschaft und Ladenverwaltung — Farming ist mein Weg, meinen kleinen Shop zu versorgen und tierische Nachbarn zu unterstützen',
        type: 'gardenpaws',
      },
      {
        en: 'Creative construction — I want to shape a village that is uniquely mine, block by block',
        zh: '创意建造——用一块块积木打造一个独一无二的村庄',
        zhTW: '創意建造——用一塊塊積木打造一個獨一無二的村莊',
        ja: 'クリエイティブな建築――ブロックを一つひとつ積み上げて、唯一無二の村を作ること',
        ko: '창의적인 건설 — 블록 하나하나로 세상에 하나뿐인 마을을 만드는 것',
        de: 'Kreatives Bauen — Block für Block ein einzigartiges Dorf erschaffen',
        type: 'staxel',
      },
      {
        en: 'Peaceful self-sufficiency — farming is part of surviving and thriving on my own little floating world',
        zh: '宁静的自给自足——农耕是在我小小漂浮世界里生存并繁荣的一部分',
        zhTW: '寧靜的自給自足——農耕是在我小小漂浮世界裡生存並繁榮的一部分',
        ja: '穏やかな自給自足――農業は小さな浮かぶ世界で生き延び、豊かになるための一部',
        ko: '평화로운 자급자족 — 농사는 작은 떠다니는 세계에서 살아남고 번영하는 일부예요',
        de: 'Ruhige Selbstversorgung — Farming ist Teil des Überlebens und Gedeihens auf meiner kleinen schwimmenden Welt',
        type: 'havendock',
      },
    ],
  },
  {
    q_en: 'Which visual style speaks to you most?',
    q_zh: '哪种视觉风格最吸引你？',
    q_zhTW: '哪種視覺風格最吸引你？',
    q_ja: 'どんなビジュアルスタイルが一番好みですか？',
    q_ko: '어떤 비주얼 스타일이 가장 마음에 드나요？',
    q_de: 'Welcher Grafikstil spricht dich am meisten an?',
    options: [
      {
        en: 'Cute top-down pixel art with a Zelda-like dungeon aesthetic and bright, punchy colors',
        zh: '可爱的俯视角像素画风，带有类塞尔达地牢美学，颜色明亮而充满冲击力',
        zhTW: '可愛的俯視角像素畫風，帶有類薩爾達地牢美學，顏色明亮而充滿衝擊力',
        ja: 'かわいいトップダウンのドット絵、ゼルダ風ダンジョン美学、明るくパンチのある色使い',
        ko: '귀여운 탑다운 픽셀 아트에 젤다 스타일 던전 미학, 밝고 강렬한 색감',
        de: 'Niedliche Top-Down-Pixelgrafik mit Zelda-ähnlicher Dungeon-Ästhetik und leuchtenden, knalligen Farben',
        type: 'forager',
      },
      {
        en: 'Bright 3D with adorable anthropomorphic animal characters and cozy seasonal decorations',
        zh: '明亮的3D风格，可爱的拟人化动物角色，加上温馨的季节性装饰',
        zhTW: '明亮的3D風格，可愛的擬人化動物角色，加上溫馨的季節性裝飾',
        ja: '明るい3Dグラフィック、かわいい擬人化動物キャラクター、季節感あふれるコージーな装飾',
        ko: '밝은 3D 스타일에 귀여운 의인화된 동물 캐릭터들과 아늑한 계절 장식',
        de: 'Helles 3D mit entzückenden anthropomorphen Tierfiguren und gemütlichen Saisondekorationen',
        type: 'gardenpaws',
      },
      {
        en: 'Voxel-style blocks with the familiar Minecraft-adjacent aesthetic that feels creatively open',
        zh: '体素风格的方块世界，带有熟悉的类Minecraft美学，感觉充满创意空间',
        zhTW: '體素風格的方塊世界，帶有熟悉的類Minecraft美學，感覺充滿創意空間',
        ja: 'ボクセルスタイルのブロックワールド、Minecraft的な親しみやすい美学、創造性が広がる感覚',
        ko: '복셀 스타일의 블록 세계에 마인크래프트 같은 친숙한 미학, 창의력이 넘치는 느낌',
        de: 'Voxel-Stil-Blockwelt mit vertrautem Minecraft-ähnlichem Look, der kreativ offen wirkt',
        type: 'staxel',
      },
      {
        en: 'Atmospheric ocean-world environments with realistic water, sunsets, and hand-crafted wooden structures',
        zh: '大气感十足的海洋世界，真实的水面、日落，以及手工打造的木质建筑结构',
        zhTW: '大氣感十足的海洋世界，真實的水面、日落，以及手工打造的木質建築結構',
        ja: '雰囲気たっぷりの海洋ワールド、リアルな水面、夕焼け、手作り感のある木造建築',
        ko: '분위기 넘치는 해양 세계에 사실적인 수면, 일몰, 수공예 느낌의 목조 건축물',
        de: 'Atmosphärische Ozeanwelt mit realistischem Wasser, Sonnenuntergängen und handgefertigten Holzkonstruktionen',
        type: 'havendock',
      },
    ],
  },
  {
    q_en: 'How do you feel about exploration and expanding your territory?',
    q_zh: '你对探索和扩张领地有什么感受？',
    q_zhTW: '你對探索和擴張領地有什麼感受？',
    q_ja: '探索とテリトリー拡張についてどう思いますか？',
    q_ko: '탐험과 영역 확장에 대해 어떻게 느끼나요？',
    q_de: 'Wie stehst du zu Erkundung und Gebietsausdehnung?',
    options: [
      {
        en: 'I love it — the core fantasy is buying new land tiles, discovering what is on them, and incorporating them into my operation',
        zh: '非常享受——购买新地块、发现上面有什么并融入运营，这个过程是最核心的乐趣',
        zhTW: '非常享受——購買新地塊、發現上面有什麼並融入運營，這個過程是最核心的樂趣',
        ja: '大好き――新しい土地を買って、何があるかを発見して、運営に取り込む、そのプロセスが一番楽しい',
        ko: '정말 좋아요 — 새 땅을 사고, 뭐가 있는지 발견하고, 운영에 통합하는 과정이 핵심 재미예요',
        de: 'Ich liebe es — neue Landkacheln kaufen, entdecken was drauf ist und in meinen Betrieb einbauen, das ist der Kern des Spaßes',
        type: 'forager',
      },
      {
        en: 'I enjoy exploring the island for resources and quests, but home base and the village are where my heart is',
        zh: '喜欢探索岛屿寻找资源和任务，但大本营和村庄才是我真正在乎的地方',
        zhTW: '喜歡探索島嶼尋找資源和任務，但大本營和村莊才是我真正在乎的地方',
        ja: '資源やクエストのために島を探索するのは楽しいけど、ホームベースと村が一番大切',
        ko: '자원과 퀘스트를 위해 섬을 탐험하는 건 좋지만, 홈베이스와 마을이 내가 진정으로 신경 쓰는 곳이에요',
        de: 'Ich erforsche gerne die Insel nach Ressourcen und Quests, aber Heimatbasis und Dorf sind mir am wichtigsten',
        type: 'gardenpaws',
      },
      {
        en: 'Building outward into new space and decorating it is how I explore — terrain is a canvas, not a destination',
        zh: '向外建造新空间并装饰它就是我的探索方式——地形是画布，不是目的地',
        zhTW: '向外建造新空間並裝飾它就是我的探索方式——地形是畫布，不是目的地',
        ja: '新しい空間に建築して装飾することが私の探索――地形はキャンバスであって、目的地じゃない',
        ko: '새로운 공간으로 확장해 건설하고 꾸미는 게 내 탐험 방식이에요 — 지형은 캔버스지 목적지가 아니에요',
        de: 'Nach außen bauen und dekorieren ist meine Art der Erkundung — das Terrain ist eine Leinwand, kein Ziel',
        type: 'staxel',
      },
      {
        en: 'I prefer expanding my platform gradually and carefully — each new section should feel intentional and earned',
        zh: '我喜欢缓慢而谨慎地扩展平台——每一个新区域都应该感觉是经过深思熟虑赢得的',
        zhTW: '我喜歡緩慢而謹慎地擴展平台——每一個新區域都應該感覺是經過深思熟慮贏得的',
        ja: 'ゆっくりと慎重にプラットフォームを広げたい――新しいエリアはちゃんと考えて、勝ち取った感覚が大事',
        ko: '천천히 신중하게 플랫폼을 확장하는 게 좋아요 — 새로운 구역은 깊이 생각하고 얻어낸 느낌이어야 해요',
        de: 'Ich erweitere meine Plattform lieber langsam und bedacht — jeder neue Bereich soll sich bewusst erkämpft anfühlen',
        type: 'havendock',
      },
    ],
  },
  {
    q_en: 'Multiplayer or solo — and why?',
    q_zh: '联机还是单人——你更倾向哪种，为什么？',
    q_zhTW: '聯機還是單人——你更傾向哪種，為什麼？',
    q_ja: 'マルチプレイとソロ、どっちが好きですか？その理由は？',
    q_ko: '멀티플레이어와 솔로 중 어떤 걸 선호하나요? 이유는？',
    q_de: 'Multiplayer oder Solo — und warum?',
    options: [
      {
        en: 'Primarily solo — this is my optimization puzzle and I want full control over every decision',
        zh: '主要单人——这是我的优化谜题，我想要对每个决策拥有完全控制权',
        zhTW: '主要單人——這是我的優化謎題，我想要對每個決策擁有完全控制權',
        ja: '基本はソロ――これは自分の最適化パズル。すべての決断を完全に掌握したい',
        ko: '주로 솔로 — 이건 내 최적화 퍼즐이고, 모든 결정에 완전한 통제권을 갖고 싶어요',
        de: 'Hauptsächlich Solo — das ist mein Optimierungsrätsel, und ich will die volle Kontrolle über jede Entscheidung',
        type: 'forager',
      },
      {
        en: 'Both — I love having friends visit my shop and island, and seasonal co-op events are the highlight',
        zh: '都喜欢——朋友来参观我的商店和岛屿很开心，季节性合作活动更是亮点',
        zhTW: '都喜歡——朋友來參觀我的商店和島嶼很開心，季節性合作活動更是亮點',
        ja: 'どっちも好き――友達が店や島に来てくれるのが楽しいし、季節の協力イベントが一番の盛り上がり',
        ko: '둘 다 좋아요 — 친구들이 가게와 섬을 방문하는 게 즐겁고, 계절 협동 이벤트가 하이라이트예요',
        de: 'Beides — Freunde in meinen Shop und auf meine Insel einladen macht Spaß, und saisonale Koop-Events sind das Highlight',
        type: 'gardenpaws',
      },
      {
        en: 'Multiplayer preferred — building a shared village with friends who each have their own sections is the dream',
        zh: '偏好联机——和朋友各自负责不同区域共同建设村庄是我的理想体验',
        zhTW: '偏好聯機——和朋友各自負責不同區域共同建設村莊是我的理想體驗',
        ja: 'マルチ推し――友達とそれぞれのエリアを担当しながら村を一緒に作るのが理想',
        ko: '멀티를 선호해요 — 친구들이 각자 구역을 담당하며 함께 마을을 건설하는 게 이상적이에요',
        de: 'Multiplayer bevorzugt — mit Freunden ein gemeinsames Dorf bauen, jeder mit seinem eigenen Bereich, ist der Traum',
        type: 'staxel',
      },
      {
        en: 'Solo only — the peace and solitude of ocean farming is exactly what I am looking for',
        zh: '仅限单人——海洋农耕的宁静与独处，正是我所寻找的',
        zhTW: '僅限單人——海洋農耕的寧靜與獨處，正是我所尋找的',
        ja: 'ソロ一択――海洋農業の静けさと孤独さこそ、自分が求めているもの',
        ko: '솔로만 — 해양 농사의 평화와 고요함이 바로 제가 찾던 것이에요',
        de: 'Nur Solo — die Ruhe und Einsamkeit des Ozean-Farmens ist genau das, was ich suche',
        type: 'havendock',
      },
    ],
  },
  {
    q_en: 'Which of these sounds most like your ideal session?',
    q_zh: '哪种最像你理想的游戏时段？',
    q_zhTW: '哪種最像你理想的遊戲時段？',
    q_ja: '理想のゲームセッションに一番近いのはどれですか？',
    q_ko: '어떤 게 이상적인 게임 세션에 가장 가까운가요？',
    q_de: 'Was klingt am ehesten nach deiner idealen Spielsession?',
    options: [
      {
        en: 'One more island tile, one more crafting level, one more dungeon — then I will stop (but I never do)',
        zh: '再多一块地、再升一级制作、再清一个地牢——然后我就停（但从没真的停下来）',
        zhTW: '再多一塊地、再升一級製作、再清一個地牢——然後我就停（但從沒真的停下來）',
        ja: 'あと一個土地を買って、もう一レベルクラフトして、もう一個ダンジョン行ったら終わり（でも絶対やめない）',
        ko: '땅 하나만 더, 제작 레벨 하나만 더, 던전 하나만 더 — 그러고 멈출 거예요 (근데 진짜로 멈춘 적은 없어요)',
        de: 'Noch eine Inselkachel, noch ein Craftinglevel, noch ein Dungeon — dann höre ich auf (aber ich höre nie wirklich auf)',
        type: 'forager',
      },
      {
        en: 'Morning: water crops, open the shop, chat with the fox neighbor, attend the harvest festival',
        zh: '早晨：浇水种地，开门营业，和狐狸邻居聊天，参加丰收节',
        zhTW: '早晨：澆水種地，開門營業，和狐狸鄰居聊天，參加豐收節',
        ja: '朝：水やりして、お店を開けて、キツネの隣人と話して、収穫祭に参加する',
        ko: '아침: 작물에 물 주고, 가게 열고, 여우 이웃과 대화하고, 수확 축제에 참가하기',
        de: 'Morgens: Pflanzen gießen, den Laden aufmachen, mit dem Fuchs-Nachbarn quatschen, Ernterfest besuchen',
        type: 'gardenpaws',
      },
      {
        en: 'Spend two hours placing blocks, realize I have completely redesigned the town center, feel deeply satisfied',
        zh: '花两个小时放方块，发现我已经彻底重新设计了小镇中心，感到深深满足',
        zhTW: '花兩個小時放方塊，發現我已經徹底重新設計了小鎮中心，感到深深滿足',
        ja: '二時間ブロックを置き続けて、気づいたら街の中心を完全リデザインしていた。最高に満足',
        ko: '두 시간 동안 블록 놓다 보니 마을 중심부를 완전히 재설계했다는 걸 깨달았어요, 깊은 만족감',
        de: 'Zwei Stunden Blöcke setzen, dann merken, dass ich das Stadtzentrum komplett umgestaltet habe — tiefe Befriedigung',
        type: 'staxel',
      },
      {
        en: 'A quiet evening: harvest from the floating garden, watch the sun set over the ocean, plan tomorrow',
        zh: '安静的傍晚：从漂浮花园收获，看太阳落入海洋，规划明天',
        zhTW: '安靜的傍晚：從漂浮花園收穫，看太陽落入海洋，規劃明天',
        ja: '静かな夕方：浮かぶ農園から収穫して、海に沈む夕日を眺めて、明日の計画を立てる',
        ko: '조용한 저녁: 떠다니는 정원에서 수확하고, 바다 위로 지는 태양을 보고, 내일을 계획하기',
        de: 'Ein ruhiger Abend: Ernte aus dem schwebenden Garten, den Sonnenuntergang über dem Ozean beobachten, morgen planen',
        type: 'havendock',
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
  forager: {
    title_en: 'Forager',
    title_zh: 'Forager',
    title_zhTW: 'Forager',
    title_ja: 'Forager',
    title_ko: 'Forager',
    title_de: 'Forager',
    emoji: '⛏️',
    tag_en: 'The Addicted Expansionist',
    tag_zh: '停不下来的扩张者',
    tag_zhTW: '停不下來的擴張者',
    tag_ja: '止まれないエクスパンショニスト',
    tag_ko: '멈출 수 없는 확장자',
    tag_de: 'Der süchtig machende Expansionist',
    platform_en: 'PC · Switch · PS4 · Xbox · iOS · Android',
    platform_zh: 'PC · Switch · PS4 · Xbox · iOS · Android',
    platform_zhTW: 'PC · Switch · PS4 · Xbox · iOS · Android',
    platform_ja: 'PC · Switch · PS4 · Xbox · iOS · Android',
    platform_ko: 'PC · Switch · PS4 · Xbox · iOS · Android',
    platform_de: 'PC · Switch · PS4 · Xbox · iOS · Android',
    why_en: `Forager is the farming game that most accurately recreates the feeling of an addictive idle game but with real agency and a physical world to explore. Developed solo by HopFrog and published in 2019, you begin on a single tiny island with nothing but your fists and a determination to make something of it. You chop trees, mine rocks, and gather plants. These feed into crafting stations that produce more advanced materials, which unlock new crafting tiers, which enable you to buy adjacent land tiles, which contain new resources, which feed back into the loop. The farming component — planting and harvesting crops — is one of several interlocking systems rather than the central focus, but it becomes increasingly important as a food source that powers your XP multiplier and enables more demanding crafting chains. Forager also includes Zelda-style puzzle dungeons scattered across the expanding world map, adding an exploration and combat dimension that distinguishes it from pure farming sims. The skill tree is enormous and allows genuine specialization: you can optimize for farming efficiency, combat power, crafting speed, or economy — and the right build dramatically changes how the game plays. The genius of Forager is that it compresses the satisfaction of a long farming session into rapid micro-loops: you are never more than a minute away from unlocking something new. If you have ever played a farming game and thought "I wish the progression was faster," Forager is built specifically for you.`,
    why_zh: `《Forager》是最准确地重现放置游戏那种让人上瘾感觉的农场游戏，同时又保留了真实的操控感和可探索的物理世界。2019年由单人开发者HopFrog推出。你从一个小岛、一无所有开始，砍树、挖矿、采集植物，这些材料进入制作站生产更高级材料，解锁新制作层级，从而购买相邻地块——地块上有新资源，再次回到循环中。农耕系统是多个互锁系统之一，提供食物作为经验值倍增器。游戏还包含类塞尔达的解谜地牢，增加探索和战斗维度。技能树庞大，允许真正的专精：你可以优化农耕效率、战斗能力、制作速度或经济产出。Forager的天才之处在于将长时农场游戏的满足感压缩进快速的微循环——你永远不超过一分钟就能解锁新东西。`,
    why_zhTW: `《Forager》是最準確地重現放置遊戲那種讓人上癮感覺的農場遊戲，同時又保留了真實的操控感和可探索的物理世界。2019年由單人開發者HopFrog推出。你從一個小島、一無所有開始，砍樹、挖礦、採集植物，這些材料進入製作站生產更高級材料，解鎖新製作層級，從而購買相鄰地塊——地塊上有新資源，再次回到循環中。農耕系統是多個互鎖系統之一，提供食物作為經驗值倍增器。遊戲還包含類薩爾達的解謎地牢，增加探索和戰鬥維度。技能樹龐大，允許真正的專精：你可以優化農耕效率、戰鬥能力、製作速度或經濟產出。Forager的天才之處在於將長時農場遊戲的滿足感壓縮進快速的微循環——你永遠不超過一分鐘就能解鎖新東西。`,
    why_ja: `Foragerは、放置ゲームの中毒性を最も忠実に再現しながら、プレイヤーの主体性と探索できる物理的世界も両立させた農場ゲームです。2019年にソロ開発者HopFrogが制作しました。最初は小さな島一つと素手だけ。木を切り、岩を掘り、植物を集めます。それらが製作ステーションに投入されてより高度な素材が生まれ、新しい製作ティアが解放され、隣接する土地を購入できるようになります。新しい土地にはまた新しいリソースがあり、ループは続きます。農業コンポーネントは複数の連動システムの一つで、経験値倍増器を動かす食料源として重要な役割を担います。ゼルダ風パズルダンジョンも各地に点在し、探索と戦闘の要素を加えています。スキルツリーは広大で、農業効率・戦闘力・製作速度・経済に特化した本物のビルドが可能です。Foragerの真骨頂は、長時間農場ゲームの満足感を高速なマイクロループに圧縮したこと。1分以内に必ず新しいものがアンロックされます。`,
    why_ko: `Forager는 방치형 게임의 중독성을 가장 정확하게 재현하면서도, 진짜 플레이어 주체성과 탐험 가능한 물리적 세계를 갖춘 농장 게임입니다. 2019년 솔로 개발자 HopFrog가 만들었습니다. 작은 섬 하나와 맨손으로 시작해 나무를 베고, 돌을 캐고, 식물을 채집합니다. 이것들이 제작 스테이션에 투입되어 더 고급 재료가 되고, 새로운 제작 티어가 열리며, 인접한 땅을 살 수 있게 됩니다. 새 땅엔 또 새 자원이 있고 루프는 계속됩니다. 농업 시스템은 여러 연동 시스템 중 하나로 경험치 배율기 역할을 합니다. 젤다 스타일의 퍼즐 던전도 흩어져 있어 탐험과 전투 요소를 더합니다. 스킬 트리가 방대해 농업 효율, 전투력, 제작 속도, 경제 전문화가 가능합니다. Forager의 천재성은 오랜 농장 게임의 만족감을 빠른 마이크로 루프로 압축했다는 것 — 1분 이내에 항상 새로운 걸 해금하게 됩니다.`,
    why_de: `Forager ist das Farming-Spiel, das am treffendsten das Gefühl eines süchtig machenden Idle-Games nachbildet — aber mit echter Handlungsfreiheit und einer physischen Welt zum Erkunden. Entwickelt von HopFrog als Einzelperson und 2019 veröffentlicht. Du beginnst auf einer winzigen Insel mit bloßen Händen: Bäume fällen, Steine abbauen, Pflanzen sammeln. Diese fließen in Crafting-Stationen, die fortgeschrittenere Materialien produzieren, die neue Crafting-Stufen freischalten, die den Kauf benachbarter Landkacheln ermöglichen — auf denen neue Ressourcen warten, die den Kreislauf fortführen. Das Farming-Element ist eines von mehreren ineinandergreifenden Systemen und liefert als Nahrungsquelle den EP-Multiplikator. Zelda-artige Puzzle-Dungeons verteilt über die Karte fügen Erkundung und Kampf hinzu. Der riesige Skilltree ermöglicht echte Spezialisierung: Farming-Effizienz, Kampfkraft, Crafting-Tempo oder Wirtschaft. Die Genialität von Forager liegt darin, dass es die Befriedigung einer langen Farm-Session in schnelle Mikroschleifen komprimiert — du bist nie mehr als eine Minute davon entfernt, etwas Neues freizuschalten.`,
    tip_en: `The key to Forager efficiency is understanding the XP multiplier system: food items do not just restore health — they multiply your XP gain for a duration, and maximizing this uptime dramatically accelerates unlocking. Set up a dedicated farming area producing berries and wheat before worrying about combat or exploration, and always have food active. The skill tree order matters enormously: prioritize skills that increase your automatic gathering radius and resource spawn rates before combat skills, since economic dominance enables everything else. When buying new land tiles, prioritize tiles with ore deposits or specific biome types over random ocean tiles — the minimap icons reveal what each tile contains before you purchase it.`,
    tip_zh: `《Forager》效率的关键是理解经验值倍增器系统：食物不只是恢复生命值——它会在一段时间内倍增经验获取速度，最大化这个时间显著加速解锁进度。在担心战斗或探索之前，先建立一个专门生产浆果和小麦的农业区，并始终保持食物效果激活状态。技能树顺序非常重要：在战斗技能之前优先提升自动采集半径和资源刷新率的技能——经济主导权能解锁其他一切。购买新地块时，优先购买含矿石矿床或特定生态类型的地块，而不是随机海洋地块——小地图图标在购买前就能揭示每块地的内容。`,
    tip_zhTW: `《Forager》效率的關鍵是理解經驗值倍增器系統：食物不只是恢復生命值——它會在一段時間內倍增經驗獲取速度，最大化這個時間顯著加速解鎖進度。在擔心戰鬥或探索之前，先建立一個專門生產漿果和小麥的農業區，並始終保持食物效果激活狀態。技能樹順序非常重要：在戰鬥技能之前優先提升自動採集半徑和資源刷新率的技能——經濟主導權能解鎖其他一切。購買新地塊時，優先購買含礦石礦床或特定生態類型的地塊，而不是隨機海洋地塊——小地圖圖標在購買前就能揭示每塊地的內容。`,
    tip_ja: `Forager効率化のカギはXP倍増器システムの理解です。食べ物はHPを回復するだけでなく、一定時間経験値獲得量を倍増させます。このアップタイムを最大化することが解放速度を劇的に上げます。戦闘や探索を気にする前に、まずベリーと小麦を生産する農業エリアを作り、常に食べ物効果を維持しましょう。スキルツリーの順番も重要で、戦闘スキルより先に自動採集範囲とリソース出現率を上げるスキルを優先してください。経済的優位がその他すべてを可能にします。新しい土地を買うときは、ランダムな海洋タイルより鉱石鉱床や特定バイオームの土地を優先しましょう。購入前にミニマップのアイコンで内容を確認できます。`,
    tip_ko: `Forager 효율의 핵심은 경험치 배율기 시스템 이해입니다. 음식은 체력만 회복하는 게 아니라 일정 시간 경험치 획득량을 배가시킵니다. 이 효과를 최대한 유지하면 해금 속도가 크게 빨라집니다. 전투나 탐험 걱정 전에 먼저 베리와 밀을 생산하는 농업 구역을 만들고 항상 음식 효과를 유지하세요. 스킬 트리 순서도 중요합니다 — 전투 스킬 이전에 자동 채집 반경과 자원 생성률을 높이는 스킬을 먼저 찍으세요. 경제적 주도권이 다른 모든 것을 가능하게 합니다. 새 땅을 살 때는 무작위 해양 타일보다 광석 광상이나 특정 바이옴 타입의 타일을 우선하세요 — 미니맵 아이콘이 구매 전 타일 내용을 알려줍니다.`,
    tip_de: `Der Schlüssel zur Effizienz in Forager ist das XP-Multiplikator-System: Nahrung stellt nicht nur HP wieder her — sie multipliziert deine EP-Ausbeute für eine bestimmte Zeit, und diese Uptime zu maximieren beschleunigt das Freischalten enorm. Richte zuerst eine dedizierte Farmzone für Beeren und Weizen ein, bevor du dich um Kampf oder Erkundung kümmerst, und halte immer Nahrungseffekte aktiv. Die Reihenfolge im Skilltree ist entscheidend: Priorisiere Fertigkeiten, die deinen automatischen Sammelradius und die Ressourcen-Spawn-Rate erhöhen, vor Kampffertigkeiten — wirtschaftliche Dominanz ermöglicht alles andere. Beim Kauf neuer Landkacheln bevorzuge Kacheln mit Erzlagerstätten oder spezifischen Biom-Typen statt zufälliger Meeresflächen — die Minimap-Symbole verraten dir vor dem Kauf, was jede Kachel enthält.`,
  },
  gardenpaws: {
    title_en: 'Garden Paws',
    title_zh: 'Garden Paws',
    title_zhTW: 'Garden Paws',
    title_ja: 'Garden Paws',
    title_ko: 'Garden Paws',
    title_de: 'Garden Paws',
    emoji: '🦊',
    tag_en: 'The Community Shopkeeper',
    tag_zh: '社区商店主人',
    tag_zhTW: '社區商店主人',
    tag_ja: 'コミュニティの雑貨屋さん',
    tag_ko: '커뮤니티 가게 주인',
    tag_de: 'Der Gemeinschaftsladenbesitzer',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    platform_zhTW: 'PC · Nintendo Switch',
    platform_ja: 'PC · Nintendo Switch',
    platform_ko: 'PC · Nintendo Switch',
    platform_de: 'PC · Nintendo Switch',
    why_en: `Garden Paws occupies a unique and delightful niche: it takes the Animal Crossing formula of an anthropomorphic island community and adds the deeper farming, crafting, and shop-management systems that Animal Crossing deliberately leaves out. You play as one of dozens of adorable animal characters — fox, bunny, cat, bear, and many more — who have just moved to Florens Island and inherited a small farmstead. From this base, you farm crops and trees, raise animals, gather materials from around the island, and craft products to sell in your personal shop. The shop system is where Garden Paws distinguishes itself: you set your own prices, decide which products to stock, and watch customers browse and purchase throughout the day. Community events — seasonal festivals, birthday parties, treasure hunts — give the year a rhythm and a social calendar. The game has a large active fanbase, regular developer updates, and generous multiplayer support that lets friends visit each other's islands and tend farms together. Garden Paws is notably generous in its design philosophy: there is no stamina system, no crop failure, and money is earned easily enough that economic stress is minimal. The game is somewhat smaller in scope than Stardew Valley, but what it does — the cute aesthetic, the shop management, the community feel — it does with a charm that earns real affection from players who love that specific flavor of farming life sim.`,
    why_zh: `《Garden Paws》占据了一个独特而令人愉悦的细分市场：它采用《动物森友会》的拟人化岛屿社区公式，然后加入动森刻意省略的更深层农耕、制作和商店管理系统。你选择数十种可爱动物角色之一——狐狸、兔子、猫、熊等——刚搬到Florens岛并继承了一个小农场。从这里开始，你种植作物和树木、养殖动物、在岛屿各处采集材料，并制作产品在个人商店出售。商店系统是Garden Paws的差异化所在：你自己定价、决定备货哪些商品，并看着顾客全天浏览购买。季节性节日、生日派对、寻宝活动等社区事件给全年带来节奏感和社交日历。游戏拥有活跃的粉丝群体，开发者定期更新，并支持多人游戏。`,
    why_zhTW: `《Garden Paws》佔據了一個獨特而令人愉悅的細分市場：它採用《動物森友會》的擬人化島嶼社區公式，然後加入動森刻意省略的更深層農耕、製作和商店管理系統。你選擇數十種可愛動物角色之一——狐狸、兔子、貓、熊等——剛搬到Florens島並繼承了一個小農場。從這裡開始，你種植作物和樹木、養殖動物、在島嶼各處採集材料，並製作產品在個人商店出售。商店系統是Garden Paws的差異化所在：你自己定價、決定備貨哪些商品，並看著顧客全天瀏覽購買。季節性節日、生日派對、尋寶活動等社區事件給全年帶來節奏感和社交日曆。遊戲擁有活躍的粉絲群體，開發者定期更新，並支持多人遊戲。`,
    why_ja: `Garden Pawsはユニークで楽しいニッチを占めています。あつまれどうぶつの森の擬人化島コミュニティの公式を取り入れながら、どうぶつの森が意図的に省いたより深い農業・クラフト・ショップ管理システムを加えた作品です。キツネ、ウサギ、ネコ、クマなど数十種類の可愛い動物キャラのひとりとして、フロレンス島に引っ越してきた新居住者として始まります。ここから作物や木を育て、動物を飼育し、島内で素材を集め、個人のショップで商品を販売します。ショップシステムがGarden Pawsの特徴で、自分で値段を設定し、どの商品を仕入れるか決め、お客が一日中ショップを見て回るのを眺めます。季節のお祭り、誕生日パーティー、宝探しなどのコミュニティイベントが年間に豊かなリズムをもたらします。活発なファンベース、定期的なアップデート、充実したマルチプレイ対応が揃っています。`,
    why_ko: `Garden Paws는 독특하고 즐거운 틈새를 차지합니다. 동물의 숲의 의인화 섬 커뮤니티 공식을 가져오면서, 동물의 숲이 의도적으로 빠뜨린 더 깊은 농업·제작·상점 관리 시스템을 더한 작품입니다. 여우, 토끼, 고양이, 곰 등 수십 종의 귀여운 동물 캐릭터 중 하나로 Florens 섬에 이사와 작은 농장을 물려받은 신주민으로 시작합니다. 작물과 나무를 기르고, 동물을 키우고, 섬 곳곳에서 재료를 모아 개인 상점에서 판매합니다. 상점 시스템이 Garden Paws의 차별점으로 직접 가격을 설정하고 어떤 상품을 들여놓을지 결정하며 하루 종일 손님이 구경하고 구매하는 걸 지켜봅니다. 계절 축제, 생일 파티, 보물 찾기 같은 커뮤니티 이벤트가 한 해에 리듬감을 줍니다. 활성화된 팬덤, 정기 업데이트, 풍부한 멀티플레이어 지원이 특징입니다.`,
    why_de: `Garden Paws besetzt eine einzigartige und köstliche Nische: Es übernimmt die Formel der anthropomorphen Insel-Community aus Animal Crossing und fügt die tieferen Farming-, Crafting- und Ladenmanagement-Systeme hinzu, die Animal Crossing bewusst weglässt. Du spielst als eine von Dutzenden niedlicher Tiercharaktere — Fuchs, Hase, Katze, Bär und viele mehr — die gerade nach Florens Island gezogen sind und ein kleines Farmgrundstück geerbt haben. Von hier aus baust du Pflanzen und Bäume an, hältst Tiere, sammelst Materialien auf der Insel und fertigst Produkte für deinen persönlichen Laden. Das Shop-System ist das Alleinstellungsmerkmal: Du setzt selbst Preise, entscheidest über die Produktauswahl und siehst zu, wie Kunden den ganzen Tag stöbern und kaufen. Saisonale Festivals, Geburtstage und Schatzsuchen verleihen dem Jahr einen sozialen Rhythmus. Das Spiel hat eine aktive Community, regelmäßige Updates und großzügigen Multiplayer-Support.`,
    tip_en: `The shop is the economic engine of Garden Paws, so invest in shop upgrades before farm expansions. A well-stocked shop with premium-priced crafted goods earns dramatically more than selling raw crops at market rates. Learn which crafted items have the highest profit margins early — generally processed goods (jams, juices, furniture) outperform raw materials by 3-5x. For farming efficiency, prioritize crops that can be harvested multiple times per season over single-harvest varieties, since replanting labor is the main time cost. The island map reveals hidden resource nodes that most players miss on the first tour — specifically look for ore deposits in the rocky northern areas and fruit trees in the forest zones. Community event participation gives exclusive cosmetic items that cannot be obtained any other way, so check the event calendar weekly.`,
    tip_zh: `商店是《Garden Paws》的经济引擎，所以在农场扩张之前先升级商店。备货优质手工商品的店铺比按市场价出售原材料多赚3-5倍。尽早了解哪些手工品利润率最高——通常加工商品（果酱、果汁、家具）的表现远超原材料。农耕效率方面，优先种植每季可多次收割的作物，而非单次收割品种，因为重新播种的劳动是主要时间成本。岛屿地图中有大多数玩家在初次游览时错过的隐藏资源节点——特别注意北部岩石区的矿石矿床和森林区的果树。参与社区活动能获得无法通过其他方式获得的独家装饰物品，所以每周查看活动日历。`,
    tip_zhTW: `商店是《Garden Paws》的經濟引擎，所以在農場擴張之前先升級商店。備貨優質手工商品的店鋪比按市場價出售原材料多賺3-5倍。盡早了解哪些手工品利潤率最高——通常加工商品（果醬、果汁、家具）的表現遠超原材料。農耕效率方面，優先種植每季可多次收割的作物，而非單次收割品種，因為重新播種的勞動是主要時間成本。島嶼地圖中有大多數玩家在初次遊覽時錯過的隱藏資源節點——特別注意北部岩石區的礦石礦床和森林區的果樹。參與社區活動能獲得無法通過其他方式獲得的獨家裝飾物品，所以每週查看活動日曆。`,
    tip_ja: `ショップがGarden Pawsの経済エンジンなので、農場を拡張する前にショップをアップグレードしましょう。高品質な手作り商品を揃えたショップは、原材料を市場価格で売るより3〜5倍稼げます。早めに利益率の高い加工品（ジャム、ジュース、家具）を把握しておくことが重要です。農業効率については、一シーズンで複数回収穫できる作物を優先してください。播き直しの手間がメインのタイムコストになるからです。島のマップには、ほとんどのプレイヤーが最初の巡回で見逃す隠しリソースノードがあります。特に北部の岩場エリアの鉱石と森林ゾーンの果樹に注目を。コミュニティイベントへの参加でしか手に入らない限定コスメがあるので、毎週イベントカレンダーをチェックしましょう。`,
    tip_ko: `상점이 Garden Paws의 경제 엔진이므로 농장 확장보다 상점 업그레이드를 먼저 하세요. 고품질 수공예 상품을 갖춘 가게는 시장가로 원재료를 파는 것보다 3-5배 더 벌 수 있습니다. 어떤 수공예품의 이익률이 높은지 일찍 파악하세요 — 보통 가공품(잼, 주스, 가구)이 원재료보다 훨씬 수익성이 좋습니다. 농업 효율은 한 계절에 여러 번 수확 가능한 작물을 우선시하세요. 다시 심는 노동이 주요 시간 비용이 됩니다. 섬 지도에는 대부분의 플레이어가 첫 탐험에서 놓치는 숨겨진 자원 노드가 있습니다 — 북쪽 암석 지대의 광석과 숲 구역의 과실수를 특히 살펴보세요. 커뮤니티 이벤트 참여로만 얻을 수 있는 독점 아이템이 있으니 매주 이벤트 캘린더를 확인하세요.`,
    tip_de: `Der Laden ist der wirtschaftliche Motor von Garden Paws, also investiere in Shop-Upgrades vor Farm-Erweiterungen. Ein gut bestückter Shop mit hochwertigen Handwerkswaren verdient dramatisch mehr als Rohstoffe zum Marktpreis. Lerne früh, welche Crafting-Waren die höchsten Gewinnmargen haben — verarbeitete Güter (Marmeladen, Säfte, Möbel) übertreffen Rohmaterialien in der Regel um das 3-5-fache. Für Farming-Effizienz bevorzuge Pflanzen, die mehrmals pro Saison geerntet werden können, statt Einzel-Ernte-Sorten — die Wiederbepflanzungsarbeit ist der Hauptzeitkostenposten. Die Inselkarte enthält versteckte Ressourcenpunkte, die die meisten Spieler beim ersten Rundgang übersehen — achte besonders auf Erzlagerstätten im felsigen Norden und Obstbäume in Waldgebieten. Gemeinschaftsevent-Teilnahme gibt exklusive Kosmetik-Gegenstände, die nicht anders erhältlich sind — also den Event-Kalender wöchentlich prüfen.`,
  },
  staxel: {
    title_en: 'Staxel',
    title_zh: 'Staxel',
    title_zhTW: 'Staxel',
    title_ja: 'Staxel',
    title_ko: 'Staxel',
    title_de: 'Staxel',
    emoji: '🧱',
    tag_en: 'The Voxel Village Architect',
    tag_zh: '体素村庄建造师',
    tag_zhTW: '體素村莊建造師',
    tag_ja: 'ボクセルの村づくり師',
    tag_ko: '복셀 마을 건축가',
    tag_de: 'Der Voxel-Dorfarchitekt',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    platform_zhTW: 'PC · Nintendo Switch',
    platform_ja: 'PC · Nintendo Switch',
    platform_ko: 'PC · Nintendo Switch',
    platform_de: 'PC · Nintendo Switch',
    why_en: `Staxel answers the question that many Minecraft players eventually ask: what if voxel building were paired with the warmth of a farming community life sim rather than survival mechanics? You move to a small village in a colorful block-world and begin as a new resident trying to find their place in the community. The farming is genuine and satisfying — seasonal crops, animal husbandry, fishing, and foraging all function as they do in Stardew Valley — but the voxel building system is what sets Staxel apart. Every building in the game, including your farmhouse and all village structures, is built from individual blocks that can be modified, replaced, and expanded in Minecraft-style. This means your farm can look exactly how you want it to — the blocky aesthetic does not constrain creativity so much as provide a consistent grammar for it. Community life is central: village events happen throughout the year, including seasonal festivals, competitive farming challenges, and market days where players can trade with each other. The multiplayer support is strong — multiple players can share a village, with each owning a separate property but contributing to shared community goals. Staxel has had a long and active development cycle with consistent updates, and its Steam community is particularly warm and helpful for new players. For players who love both Stardew Valley and Minecraft but find neither fully satisfies, Staxel may be the exact bridge they have been looking for.`,
    why_zh: `《Staxel》回答了许多Minecraft玩家最终都会问的问题：如果体素建造与农场社区生活模拟的温暖感相结合，而不是生存机制，会是什么样子？你搬进一个色彩丰富的方块世界小村庄，作为新居民开始寻找自己的位置。农耕是真实而令人满足的——季节性作物、动物养殖、钓鱼和采集都像星露谷一样运作——但体素建造系统才是Staxel的差异化所在。游戏中的每一栋建筑，包括你的农舍和所有村庄建筑，都由可以修改、替换和扩展的单个方块构建。这意味着你的农场可以完全按照你想要的样子呈现。社区生活是核心：全年发生村庄活动，包括季节性节日、竞争性农耕挑战和玩家交易市集。对于热爱星露谷和Minecraft但发现两者都不能完全满足的玩家，Staxel可能正是他们一直在寻找的那座桥梁。`,
    why_zhTW: `《Staxel》回答了許多Minecraft玩家最終都會問的問題：如果體素建造與農場社區生活模擬的溫暖感相結合，而不是生存機制，會是什麼樣子？你搬進一個色彩豐富的方塊世界小村莊，作為新居民開始尋找自己的位置。農耕是真實而令人滿足的——季節性作物、動物養殖、釣魚和採集都像星露谷一樣運作——但體素建造系統才是Staxel的差異化所在。遊戲中的每一棟建築，包括你的農舍和所有村莊建築，都由可以修改、替換和擴展的單個方塊構建。這意味著你的農場可以完全按照你想要的樣子呈現。社區生活是核心：全年發生村莊活動，包括季節性節日、競爭性農耕挑戰和玩家交易市集。對於熱愛星露谷和Minecraft但發現兩者都不能完全滿足的玩家，Staxel可能正是他們一直在尋找的那座橋樑。`,
    why_ja: `StaxelはMinecraftプレイヤーが最終的に抱く疑問に答えます――「サバイバルじゃなくて、農場コミュニティライフシムの温かさと組み合わせたら？」という問いです。カラフルなブロックワールドの小さな村に引っ越し、新しい住人として自分の居場所を探し始めます。農業はスターデューバレーと同様に季節の作物、動物飼育、釣り、採集が本格的に機能します。でも真の差別化要因はボクセル建築システム。ファームハウスから村の建物まで、ゲーム内のすべての建物がMinecraft風の個別ブロックで構成されており、自分の好みの農場を完全に再現できます。コミュニティ生活が中心で、季節のお祭りや競争的な農業チャレンジ、プレイヤー間の交換市場が年間を通じて開かれます。マルチプレイも充実しており、それぞれが別の区画を持ちながら共有コミュニティ目標に貢献できます。スターデューバレーとMinecraftはどちらも好きだけど物足りない、という方には、Staxelがその橋渡しになるかもしれません。`,
    why_ko: `Staxel은 많은 마인크래프트 플레이어가 결국 하게 되는 질문에 답합니다 — "생존 메카닉이 아니라 농장 커뮤니티 라이프심의 따뜻함과 결합하면 어떨까?"라는 물음입니다. 알록달록한 블록 세계의 작은 마을로 이사해 신입 주민으로서 자신의 자리를 찾기 시작합니다. 농업은 스타듀 밸리처럼 계절 작물, 동물 사육, 낚시, 채집이 제대로 작동합니다. 하지만 진정한 차별화 요소는 복셀 건설 시스템입니다. 농가부터 마을 건물까지 게임 내 모든 건물이 마인크래프트 스타일 개별 블록으로 구성되어 원하는 대로 농장을 꾸밀 수 있습니다. 커뮤니티 생활이 핵심으로, 계절 축제, 경쟁적 농업 챌린지, 플레이어 간 거래 시장이 연중 열립니다. 멀티플레이어도 충실하며 각자 별도 구역을 가지면서 공유 커뮤니티 목표에 기여할 수 있습니다. 스타듀 밸리와 마인크래프트 둘 다 좋아하지만 뭔가 부족하다면 Staxel이 바로 그 다리가 될 수 있습니다.`,
    why_de: `Staxel beantwortet die Frage, die viele Minecraft-Spieler irgendwann stellen: Was wäre, wenn Voxel-Bauen mit der Wärme eines Farming-Community-Lifesims kombiniert würde statt mit Survival-Mechaniken? Du ziehst in ein kleines Dorf in einer farbenfrohen Blockwelt und beginnst als neuer Bewohner, deinen Platz zu finden. Das Farming ist authentisch und befriedigend — saisonale Pflanzen, Tierhaltung, Angeln und Sammeln funktionieren wie in Stardew Valley. Aber das Voxel-Bausystem ist das Alleinstellungsmerkmal: Jedes Gebäude im Spiel, einschließlich deines Bauernhauses, besteht aus einzelnen, Minecraft-artigen Blöcken, die nach Belieben verändert werden können. Das Gemeinschaftsleben steht im Mittelpunkt: Dorffeste, Farming-Wettbewerbe und Markttage finden das ganze Jahr über statt. Für Spieler, die sowohl Stardew Valley als auch Minecraft lieben, aber von keinem vollständig befriedigt werden, könnte Staxel die gesuchte Brücke sein.`,
    tip_en: `Staxel's building freedom is its greatest strength but also its biggest time sink for new players. Resist the urge to completely redesign your farmhouse in the first in-game week — establish a functional farm layout first, then decorate. The voxel building system has a learning curve: spend time in the single-player building mode before tackling large multiplayer projects, as mistakes on shared village structures can be frustrating. For farming, the community seed sharing system (trading seeds with village NPCs and other players) dramatically accelerates crop variety expansion — prioritize gifting seeds you have extras of to unlock rare varieties faster. Market days are the most profitable economic opportunity in the game; batch-produce your highest-margin crafted goods the day before and undercut competitor prices slightly to sell out quickly.`,
    tip_zh: `Staxel的建造自由是其最大优势，但对新玩家来说也是最大的时间陷阱。抵制在游戏第一周就彻底重新设计农舍的冲动——先建立功能性的农场布局，然后再装饰。体素建造系统有学习曲线：在处理大型多人项目之前，先在单人建造模式中练习，因为在共享村庄建筑上犯错可能令人沮丧。农耕方面，社区种子分享系统（与村庄NPC和其他玩家交换种子）大幅加速作物品种扩张——优先赠送你有余量的种子以更快解锁稀有品种。市集日是游戏中最有利可图的经济机会；前一天批量生产利润率最高的手工商品，并略微低于竞争对手价格出售以快速清仓。`,
    tip_zhTW: `Staxel的建造自由是其最大優勢，但對新玩家來說也是最大的時間陷阱。抵制在遊戲第一週就徹底重新設計農舍的衝動——先建立功能性的農場布局，然後再裝飾。體素建造系統有學習曲線：在處理大型多人項目之前，先在單人建造模式中練習，因為在共享村莊建築上犯錯可能令人沮喪。農耕方面，社區種子分享系統（與村莊NPC和其他玩家交換種子）大幅加速作物品種擴張——優先贈送你有余量的種子以更快解鎖稀有品種。市集日是遊戲中最有利可圖的經濟機會；前一天批量生產利潤率最高的手工商品，並略微低於競爭對手價格出售以快速清倉。`,
    tip_ja: `Staxelの建築の自由はその最大の強みですが、新プレイヤーにとっては最大の時間ブラックホールでもあります。最初のゲーム内週でファームハウスを完全リデザインしたい衝動をこらえてください。まず機能的な農場レイアウトを確立してから装飾しましょう。ボクセル建築システムは習得に時間がかかります。大型マルチプレイプロジェクトに取り組む前に、シングルプレイ建築モードで練習を。共有村の建物でのミスはフラストレーションになります。農業では、コミュニティ種子共有システム（村NPC・他プレイヤーとの交換）が作物品種の拡張を大幅に加速します。余剰の種を優先的に贈って希少品種を早く解放しましょう。市場の日がゲーム最大の稼ぎ時なので、前日に利益率の高い加工品を大量生産し、他より少し安く設定して素早く完売させましょう。`,
    tip_ko: `Staxel의 건설 자유도는 가장 큰 강점이지만 신규 플레이어에겐 가장 큰 시간 블랙홀이기도 합니다. 게임 첫 주에 농가를 완전히 재설계하고 싶은 충동을 참으세요 — 먼저 기능적 농장 레이아웃을 구축한 다음 꾸미세요. 복셀 건설 시스템은 학습 곡선이 있습니다. 대형 멀티플레이어 프로젝트에 도전하기 전에 싱글플레이어 건설 모드에서 연습하세요. 공유 마을 건물에서 실수하면 답답해집니다. 농업에서는 커뮤니티 씨앗 공유 시스템(마을 NPC와 다른 플레이어와 씨앗 교환)이 작물 품종 확장을 크게 가속합니다 — 여유분 씨앗을 우선 선물해 희귀 품종을 더 빨리 해금하세요. 시장 날이 게임 최대의 수익 기회입니다. 전날 이익률 높은 수공예품을 대량 생산하고 경쟁자보다 약간 저렴하게 팔아 빠르게 소진하세요.`,
    tip_de: `Staxels Baufreiheit ist seine größte Stärke, aber für neue Spieler auch der größte Zeitfresser. Widersteht dem Drang, das Bauernhaus in der ersten Spielwoche komplett umzugestalten — etabliere erst ein funktionales Farm-Layout, dann dekoriere. Das Voxel-Bausystem hat eine Lernkurve: Übe erst im Einzelspieler-Baumodus, bevor du große Mehrspielerprojekte angehst — Fehler an gemeinsamen Dorfgebäuden können frustrierend sein. Beim Farming beschleunigt das Community-Saatgut-Tauschsystem (Samen mit Dorf-NPCs und anderen Spielern tauschen) die Sortenvielfalt enorm — schenke Samen, von denen du viele hast, um seltene Sorten schneller freizuschalten. Markttage sind die profitabelste wirtschaftliche Gelegenheit im Spiel; produziere am Vortag deine margenreichsten Handwerkswaren in großen Mengen und unterbiete Konkurrenten leicht, um schnell zu verkaufen.`,
  },
  havendock: {
    title_en: 'Havendock',
    title_zh: 'Havendock',
    title_zhTW: 'Havendock',
    title_ja: 'Havendock',
    title_ko: 'Havendock',
    title_de: 'Havendock',
    emoji: '⚓',
    tag_en: 'The Ocean Platform Farmer',
    tag_zh: '海洋平台农耕者',
    tag_zhTW: '海洋平台農耕者',
    tag_ja: '海上プラットフォームファーマー',
    tag_ko: '해양 플랫폼 농부',
    tag_de: 'Der Ozean-Plattform-Farmer',
    platform_en: 'PC (Early Access)',
    platform_zh: 'PC（抢先体验）',
    platform_zhTW: 'PC（搶先體驗）',
    platform_ja: 'PC（早期アクセス）',
    platform_ko: 'PC (얼리 액세스)',
    platform_de: 'PC (Early Access)',
    why_en: `Havendock is the most atmospheric entry point in the farming-and-building genre, built around a premise that no other game quite occupies: you construct a floating settlement in the middle of a vast ocean, and your farm is built on the platforms you expand outward from your starting dock. The setting immediately creates a distinct emotional register — every farming action takes place with open water visible in all directions, and the rhythm of the ocean (weather changes, day and night cycles, fishing from the platform edge) creates an ambient presence that conventional land-based farming games cannot match. The building system is constrained but meaningful: you expand by placing new platform sections, and each section must be connected to your existing dock. This creates an organic growth pattern where your settlement sprawls naturally rather than being planned on a grid. Farming on Havendock is survival-adjacent: you grow crops to feed yourself and craft materials for platform expansion, and the early game has gentle resource pressure that makes each harvest feel meaningful. Fishing from the dock edge is integrated directly into daily life rather than being a separate activity zone. The visual style emphasizes the beauty of the ocean setting — sunrise and sunset light effects, storm weather systems, and the visual contrast between your warm wooden structures and the surrounding blue expanse. Havendock is in Early Access with active development, and its current state already provides a uniquely tranquil farming experience unlike anything else in the genre.`,
    why_zh: `《Havendock》是农场建造类型中最有氛围感的作品，建立在一个其他游戏都没有占领的前提上：你在广阔海洋中间建造一个漂浮定居点，你的农场建在从起始码头向外扩展的平台上。这个设定立刻创造了一种独特的情感基调——每一个农耕动作都在四面八方都能看到海水的环境中进行。建造系统有约束但有意义：你通过放置新平台区段来扩张，每个区段都必须连接到现有码头，形成有机的生长模式。在Havendock上的农耕带有轻度生存感：种植作物是为了养活自己并为平台扩张制作材料。从码头边缘钓鱼直接融入日常生活，而不是独立的活动区。目前仍在抢先体验阶段，活跃开发中，但当前状态已经提供了类型中独一无二的宁静农耕体验。`,
    why_zhTW: `《Havendock》是農場建造類型中最有氛圍感的作品，建立在一個其他遊戲都沒有佔領的前提上：你在廣闊海洋中間建造一個漂浮定居點，你的農場建在從起始碼頭向外擴展的平台上。這個設定立刻創造了一種獨特的情感基調——每一個農耕動作都在四面八方都能看到海水的環境中進行。建造系統有約束但有意義：你通過放置新平台區段來擴張，每個區段都必須連接到現有碼頭，形成有機的生長模式。在Havendock上的農耕帶有輕度生存感：種植作物是為了養活自己並為平台擴張製作材料。從碼頭邊緣釣魚直接融入日常生活，而不是獨立的活動區。目前仍在搶先體驗階段，活躍開發中，但當前狀態已經提供了類型中獨一無二的寧靜農耕體驗。`,
    why_ja: `Havendockは農場建築ジャンルで最も雰囲気のある作品で、他のどのゲームも占領していない独自の前提に基づいています。広大な海の真ん中に浮かぶ集落を建設し、最初のドックから外へ広げたプラットフォームの上に農場を作ります。この設定が独特の情感を生み出します——すべての農業アクションが四方八方に海が広がる環境で行われます。建築システムは制約がありますが意味深いです。新しいプラットフォームセクションを置くことで拡張し、各セクションは既存のドックに接続しなければなりません。これにより、グリッドで計画するのではなく自然に広がる有機的な成長パターンが生まれます。Havendockの農業は軽いサバイバル要素があり、自分の食料確保とプラットフォーム拡張のための素材クラフトが農業の目的です。ドックの端からの釣りは別のアクティビティゾーンではなく、日常生活に直接溶け込んでいます。まだアーリーアクセス段階ですが、すでにジャンルにはない独自の穏やかな農業体験を提供しています。`,
    why_ko: `Havendock은 농장 건설 장르에서 가장 분위기 있는 작품으로, 다른 어떤 게임도 차지하지 않은 독자적인 전제 위에 세워졌습니다. 광대한 바다 한가운데에 떠다니는 정착지를 건설하고, 시작 부두에서 바깥으로 확장한 플랫폼 위에 농장을 만듭니다. 이 설정이 독특한 정서를 만들어냅니다 — 모든 농업 행동이 사방이 바다인 환경에서 이루어집니다. 건설 시스템은 제약적이지만 의미 있습니다. 새 플랫폼 구역을 놓아 확장하며, 각 구역은 기존 부두에 연결되어야 합니다. 이로 인해 격자로 계획하는 게 아니라 자연스럽게 뻗어나가는 유기적 성장 패턴이 생깁니다. Havendock의 농업은 가벼운 생존 요소가 있어 작물을 재배해 스스로를 먹이고 플랫폼 확장을 위한 재료를 만드는 게 농업의 목적입니다. 부두 끄트머리에서의 낚시는 별도 활동 구역이 아니라 일상생활에 직접 녹아들어 있습니다. 아직 얼리 액세스 단계이지만 이미 장르에서 독보적인 평온한 농업 체험을 제공합니다.`,
    why_de: `Havendock ist der atmosphärischste Einstiegspunkt im Farming-and-Building-Genre, aufgebaut auf einer Prämisse, die kein anderes Spiel besetzt: Du errichtest eine schwimmende Siedlung inmitten eines riesigen Ozeans, und deine Farm entsteht auf den Plattformen, die du von deinem Ausgangspier nach außen ausdehnst. Das Setting erzeugt sofort einen einzigartigen emotionalen Grundton — jede Farming-Aktion findet mit offenem Wasser in alle Richtungen statt. Das Bausystem ist begrenzt, aber bedeutungsvoll: Du erweiterst durch das Platzieren neuer Plattformabschnitte, wobei jeder mit deinem bestehenden Pier verbunden sein muss. Das erzeugt ein organisches Wachstumsmuster, das natürlich wuchert, statt auf einem Grid geplant zu werden. Farming auf Havendock hat leichten Survival-Charakter: Du baust Nahrungsmittel an, um dich zu ernähren und Materialien für Plattformerweiterungen herzustellen. Das Angeln vom Pier-Rand ist direkt ins Alltagsleben integriert, keine eigene Aktivitätszone. Havendock ist noch im Early Access in aktiver Entwicklung, bietet aber bereits ein einzigartig ruhiges Farming-Erlebnis ohne Vergleich im Genre.`,
    tip_en: `Havendock's platform expansion costs increase with each new section, so plan your initial dock layout carefully before committing to a direction — it is much cheaper to plan well than to deconstruct. Prioritize fishing early: ocean fish are the primary food source before your farming operation is established, and fishing also yields crafting materials that are harder to obtain through farming alone. The weather system affects both farming (rain waters crops automatically) and fishing (certain fish types appear only during specific weather patterns) — learn these patterns and plan your daily activities accordingly. Energy management is gentle but real in the early game; rest when needed rather than exhausting yourself, as the ocean-side sleeping mechanic has a pleasant atmospheric quality that makes rest feel like a reward rather than an interruption.`,
    tip_zh: `Havendock的平台扩张成本随着每个新区段的增加而提高，所以在确定方向之前仔细规划初始码头布局——规划好比拆除重建便宜得多。优先早期钓鱼：在你的农业运营建立之前，海洋鱼是主要食物来源，钓鱼还能产出难以单独通过农耕获得的制作材料。天气系统同时影响农耕（雨天自动浇水）和钓鱼（特定鱼类只在特定天气模式下出现）——了解这些规律并相应规划每日活动。体力管理在早期游戏中温和但真实；需要时就休息，不要把自己累垮，因为海边入睡机制有一种愉快的氛围感，让休息感觉像奖励而不是打扰。`,
    tip_zhTW: `Havendock的平台擴張成本隨著每個新區段的增加而提高，所以在確定方向之前仔細規劃初始碼頭布局——規劃好比拆除重建便宜得多。優先早期釣魚：在你的農業運營建立之前，海洋魚是主要食物來源，釣魚還能產出難以單獨通過農耕獲得的製作材料。天氣系統同時影響農耕（雨天自動澆水）和釣魚（特定魚類只在特定天氣模式下出現）——了解這些規律並相應規劃每日活動。體力管理在早期遊戲中溫和但真實；需要時就休息，不要把自己累垮，因為海邊入睡機制有一種愉快的氛圍感，讓休息感覺像獎勵而不是打擾。`,
    tip_ja: `Havendockのプラットフォーム拡張コストは追加するたびに上がるので、方向を決める前に最初のドックレイアウトを慎重に計画しましょう。壊して作り直すより、最初からよく計画する方がずっと安上がりです。序盤は釣りを優先してください。農業運営が確立する前は海の魚が主要な食料源で、釣りは農業だけでは得にくいクラフト素材もくれます。天気システムは農業（雨が自動的に水やり）と釣り（特定の魚は特定の天気パターンでのみ出現）の両方に影響します——これらのパターンを把握して日々の活動計画に活かしましょう。序盤のエネルギー管理は穏やかですが実在します。必要なときは休みましょう。海辺での睡眠メカニックは独特の雰囲気があって、休息が邪魔じゃなくご褒美に感じられます。`,
    tip_ko: `Havendock의 플랫폼 확장 비용은 새 구역을 추가할수록 높아지므로 방향을 정하기 전에 초기 부두 레이아웃을 신중하게 계획하세요 — 잘 계획하는 게 철거하고 다시 짓는 것보다 훨씬 저렴합니다. 초반 낚시를 우선시하세요. 농업 운영이 확립되기 전에는 바다 물고기가 주요 식량이고, 낚시는 농업만으로 얻기 어려운 제작 재료도 줍니다. 날씨 시스템은 농업(비가 자동으로 물 줌)과 낚시(특정 물고기는 특정 날씨 패턴에서만 나타남) 모두에 영향을 줍니다 — 이 패턴을 파악하고 매일 활동 계획에 반영하세요. 초반 체력 관리는 부드럽지만 실재합니다. 필요할 때 쉬세요. 바닷가 수면 메카닉은 특유의 분위기가 있어 휴식이 방해가 아니라 보상처럼 느껴집니다.`,
    tip_de: `Die Plattform-Erweiterungskosten in Havendock steigen mit jedem neuen Abschnitt, also plane dein erstes Pier-Layout sorgfältig, bevor du dich für eine Richtung entscheidest — gut planen ist viel billiger als abreißen und neu bauen. Priorisiere frühes Angeln: Meeresfische sind die Hauptnahrungsquelle, bevor deine Farmwirtschaft etabliert ist, und das Angeln liefert auch Crafting-Materialien, die sich durch Farming allein schwer beschaffen lassen. Das Wettersystem beeinflusst sowohl Farming (Regen wässert Pflanzen automatisch) als auch Angeln (bestimmte Fischarten erscheinen nur bei bestimmten Wettermustern) — lerne diese Muster und plane deine Tagesaktivitäten entsprechend. Das Energiemanagement ist früh im Spiel sanft, aber real; ruh dich aus, wenn nötig, da die Schlaf-Mechanik am Meeresrand eine schöne atmosphärische Qualität hat, die Ruhe wie eine Belohnung und nicht wie eine Unterbrechung wirken lässt.`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { forager: 0, gardenpaws: 0, staxel: 0, havendock: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function FarmCraftBuildQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'
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
    const shareText = getLoc(
      `我的农场制作建造推荐是《${r.title_zh}》！${r.emoji} 来测测你的结果？${BASE_URL}/zh/quizzes/farm-craft-build-quiz`,
      `My farm-craft-build match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/farm-craft-build-quiz`,
      `我的農場製作建造推薦是《${r.title_zhTW}》！${r.emoji} 來測測你的結果？${BASE_URL}/zh-TW/quizzes/farm-craft-build-quiz`,
      `農場クラフト診断の結果は${r.title_ja}でした！${r.emoji} あなたは？ ${BASE_URL}/ja/quizzes/farm-craft-build-quiz`,
      `내 농장 제작 게임 추천은 ${r.title_ko}！${r.emoji} 당신의 결과는？ ${BASE_URL}/ko/quizzes/farm-craft-build-quiz`,
      `Mein Farm-Craft-Ergebnis ist ${r.title_de}! ${r.emoji} Was ist deins? ${BASE_URL}/de/quizzes/farm-craft-build-quiz`,
    )

    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{r.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {getLoc(r.tag_zh, r.tag_en, r.tag_zhTW, r.tag_ja, r.tag_ko, r.tag_de)}
          </p>
          <h2 className="mb-2 text-2xl font-bold text-[#f0a832]">
            {getLoc(r.title_zh, r.title_en, r.title_zhTW, r.title_ja, r.title_ko, r.title_de)}
          </h2>
          <p className="text-sm text-[#8a9a7a]">
            {getLoc(r.platform_zh, r.platform_en, r.platform_zhTW, r.platform_ja, r.platform_ko, r.platform_de)}
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-[#1a2e1a]/60 p-5 text-[#e8dcc8]">
          <p className="mb-4 leading-relaxed">
            {getLoc(r.why_zh, r.why_en, r.why_zhTW, r.why_ja, r.why_ko, r.why_de)}
          </p>
          <div className="border-t border-[#2d3d2d] pt-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {getLoc('游玩建议', 'Pro Tip', '遊玩建議', 'プレイのヒント', '플레이 팁', 'Profi-Tipp')}
            </p>
            <p className="text-sm leading-relaxed text-[#c8bca8]">
              {getLoc(r.tip_zh, r.tip_en, r.tip_zhTW, r.tip_ja, r.tip_ko, r.tip_de)}
            </p>
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
            {isZh
              ? `第 ${current + 1} / ${QUESTIONS.length} 题`
              : getLoc(
                  `第 ${current + 1} / ${QUESTIONS.length} 题`,
                  `Question ${current + 1} of ${QUESTIONS.length}`,
                  `第 ${current + 1} / ${QUESTIONS.length} 題`,
                  `第 ${current + 1} 問 / 全 ${QUESTIONS.length} 問`,
                  `${current + 1} / ${QUESTIONS.length} 번 문항`,
                  `Frage ${current + 1} von ${QUESTIONS.length}`,
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
