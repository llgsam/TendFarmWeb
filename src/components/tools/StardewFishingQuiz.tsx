'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'legendary' | 'crabpot' | 'completionist' | 'pond'

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
    q_en: 'When you start a new Stardew save, when do you seriously focus on fishing?',
    q_zh: '开始新的星露谷存档时，你什么时候会认真专注于钓鱼？',
    q_zhTW: '開始新的星露谷存檔時，你什麼時候會認真專注於釣魚？',
    q_ja: '新しいスターデューバレーのセーブを始めたとき、釣りに本腰を入れるのはいつ？',
    q_ko: '스타듀 밸리 새 게임을 시작할 때, 낚시에 본격적으로 집중하는 건 언제예요?',
    q_de: 'Wenn du ein neues Stardew-Valley-Spielstand anfängst — wann konzentrierst du dich wirklich aufs Angeln?',
    options: [
      {
        en: 'Immediately — I prioritize fishing skill to level 5 before almost anything else so I can handle the tougher fish',
        zh: '立刻——我优先把钓鱼技能提升到 5 级，几乎在做任何其他事情之前，这样我就能应对更难的鱼',
        zhTW: '立刻——我優先把釣魚技能提升到 5 級，幾乎在做任何其他事情之前，這樣我就能應對更難的魚',
        ja: 'すぐに——難しい魚に挑めるよう、ほぼ何より先に釣りスキルを5まで上げる',
        ko: '바로요——더 어려운 물고기를 잡기 위해 다른 걸 하기 전에 낚시 스킬을 5레벨까지 올려요',
        de: 'Sofort — ich bringe meinen Angelskill auf 5, bevor ich fast alles andere mache, damit ich die schwierigeren Fische angeln kann',
        type: 'legendary',
      },
      {
        en: "Early but balanced — I fish on rainy days and whenever I need quick gold, but I don't grind it obsessively",
        zh: '早期但均衡——我在下雨天和需要快速赚金的时候钓鱼，但不会痴迷地磨练它',
        zhTW: '早期但均衡——我在下雨天和需要快速賺金的時候釣魚，但不會痴迷地磨練它',
        ja: '序盤から少しずつ——雨の日や資金が必要なときに釣って、ガチ勢にはならない',
        ko: '초반부터 균형있게——비 오는 날이나 빠르게 돈이 필요할 때 낚시하지만, 집착하지는 않아요',
        de: 'Früh aber ausgewogen — ich angle an Regentagen und wenn ich schnell Gold brauche, aber ohne Obsession',
        type: 'completionist',
      },
      {
        en: 'I get crabpots going as soon as I can and then mostly ignore the fishing rod after that',
        zh: '我尽快放置蟹笼，然后基本上不再管鱼竿',
        zhTW: '我盡快放置蟹籠，然後基本上不再管魚竿',
        ja: 'かに罠をできるだけ早く設置して、あとはほぼ釣り竿を使わない',
        ko: '가능한 한 빨리 게 통발을 설치하고, 그 후에는 낚싯대를 거의 안 써요',
        de: 'Ich stelle so früh wie möglich Krabbenkörbe auf und ignoriere danach die Angel größtenteils',
        type: 'crabpot',
      },
      {
        en: 'I fish specifically to stock my fish ponds — the skill level matters less than catching the right species',
        zh: '我专门为鱼塘捕捞鱼——技能等级不如捕捉到正确的鱼种重要',
        zhTW: '我專門為魚塘捕撈魚——技能等級不如捕捉到正確的魚種重要',
        ja: '魚の池に放流するために釣る——スキルレベルより必要な魚種を捕まえることの方が大事',
        ko: '물고기 연못에 넣을 것만 낚아요——스킬 레벨보다 필요한 어종을 잡는 게 더 중요해요',
        de: 'Ich angle gezielt, um meine Fischteiche zu befüllen — der Skilllevel ist weniger wichtig als die richtige Art zu fangen',
        type: 'pond',
      },
    ],
  },
  {
    q_en: 'How do you feel about the Stardew Valley fishing minigame?',
    q_zh: '你怎么看星露谷的钓鱼小游戏？',
    q_zhTW: '你怎麼看星露谷的釣魚小遊戲？',
    q_ja: 'スターデューバレーの釣りミニゲームについてどう思う？',
    q_ko: '스타듀 밸리의 낚시 미니게임에 대해 어떻게 생각하세요?',
    q_de: 'Was hältst du vom Angelminigame in Stardew Valley?',
    options: [
      {
        en: 'I love it — I have mastered it and I genuinely enjoy the tension and reaction time it demands, especially for rare fish',
        zh: '我喜欢它——我已经掌握了它，我真正享受它所要求的紧张感和反应时间，尤其是钓稀有鱼',
        zhTW: '我喜歡它——我已經掌握了它，我真正享受它所要求的緊張感和反應時間，尤其是釣稀有魚',
        ja: '大好き——もう完璧にマスターしてるし、レアな魚を狙うときの緊張感がたまらない',
        ko: '좋아해요——완벽하게 마스터했고, 희귀한 물고기를 낚을 때의 긴장감이 진짜 재미있어요',
        de: 'Ich liebe es — ich hab es gemeistert und genieße die Spannung und den Reaktionsanspruch wirklich, besonders bei seltenen Fischen',
        type: 'legendary',
      },
      {
        en: "It's fine — I do it without stress and it's satisfying when I catch something I need for a bundle",
        zh: '还好——我毫无压力地做这件事，当我钓到完成任务所需的东西时很有满足感',
        zhTW: '還好——我毫無壓力地做這件事，當我釣到完成任務所需的東西時很有滿足感',
        ja: 'まあ普通かな——気負わずできるし、バンドルに必要な魚が釣れたときは達成感ある',
        ko: '괜찮아요——부담 없이 하고, 필요한 걸 낚았을 때 뿌듯해요',
        de: 'Geht so — ich mache es entspannt und es ist befriedigend, wenn ich etwas für ein Bundle fange',
        type: 'completionist',
      },
      {
        en: 'Honestly it feels tedious to me — passive crabpot income is more my speed',
        zh: '说实话，这对我来说感觉很乏味——被动的蟹笼收入更符合我的节奏',
        zhTW: '說實話，這對我來說感覺很乏味——被動的蟹籠收入更符合我的節奏',
        ja: '正直だるい——かに罠のパッシブ収入の方が自分には合ってる',
        ko: '솔직히 좀 지루해요——게 통발로 받는 수동 수입이 제 스타일이에요',
        de: 'Ehrlich gesagt finde ich es eintönig — passives Einkommen durch Krabbenkörbe passt besser zu mir',
        type: 'crabpot',
      },
      {
        en: 'I do it, but I view fishing as an input to the pond system rather than the destination',
        zh: '我会钓鱼，但我把钓鱼视为鱼塘系统的输入，而不是最终目的',
        zhTW: '我會釣魚，但我把釣魚視為魚塘系統的輸入，而不是最終目的',
        ja: '釣りはするけど、池システムへの素材集めって感じで、目的が釣り自体ではない',
        ko: '낚시는 하지만, 연못 시스템에 넣을 재료를 모은다는 느낌이에요',
        de: 'Ich mache es, aber ich sehe Angeln als Zulieferung fürs Teichsystem, nicht als Selbstzweck',
        type: 'pond',
      },
    ],
  },
  {
    q_en: 'The text reads: "A mysterious presence is emanating from the water..." — how do you react?',
    q_zh: '屏幕出现提示：「水中涌动着一股神秘的存在……」——你如何反应？',
    q_zhTW: '螢幕出現提示：「水中湧動著一股神秘的存在……」——你如何反應？',
    q_ja: '「水の中から不思議な気配が漂ってくる……」というメッセージが出た——どうする？',
    q_ko: '화면에 「물 속에서 신비한 기운이 느껴진다…」 메시지가 뜨면?',
    q_de: 'Der Text zeigt: „Eine mysteriöse Präsenz strömt aus dem Wasser…" — wie reagierst du?',
    options: [
      {
        en: 'Pure adrenaline — this is exactly what I have been preparing for all season',
        zh: '纯粹的肾上腺素——这正是我整个季节都在准备的',
        zhTW: '純粹的腎上腺素——這正是我整個季節都在準備的',
        ja: 'アドレナリン全開——このためにシーズン中ずっと準備してきたんだから！',
        ko: '완전 아드레날린——이 순간을 위해 시즌 내내 준비했잖아요!',
        de: 'Purer Adrenalinstoß — genau dafür habe ich die ganze Saison trainiert!',
        type: 'legendary',
      },
      {
        en: 'Careful focus — I know what to do, I respect the difficulty, and I want to land this cleanly',
        zh: '谨慎专注——我知道该怎么做，我尊重这种难度，我想要干净利落地钓上来',
        zhTW: '謹慎專注——我知道該怎麼做，我尊重這種難度，我想要乾淨利落地釣上來',
        ja: '落ち着いて集中——難しさはわかってるし、きれいに釣り上げたい',
        ko: '집중해서 차분하게——어렵다는 거 알지만 깔끔하게 낚아 올리고 싶어요',
        de: 'Fokussiert und ruhig — ich weiß was zu tun ist, respektiere den Schwierigkeitsgrad und will sauber landen',
        type: 'completionist',
      },
      {
        en: 'Oh — I was actually half-AFK checking my crabpots. Let me try anyway',
        zh: '哦——我实际上刚才一半注意力都在查看我的蟹笼。不管怎样让我试试',
        zhTW: '哦——我實際上剛才一半注意力都在查看我的蟹籠。不管怎樣讓我試試',
        ja: 'あ、かに罠チェックしながら半AFK状態だった。とりあえずやってみるか',
        ko: '어, 게 통발 확인하면서 반AFK 상태였는데. 어쨌든 한번 해볼게요',
        de: "Oh — ich war gerade halb AFK beim Überprüfen meiner Krabbenkörbe. Na, ich versuch's trotzdem",
        type: 'crabpot',
      },
      {
        en: 'Interesting — which legendary is this, and is it a species that can go into a pond?',
        zh: '有意思——这是哪种传奇鱼，它是可以放入鱼塘的鱼种吗？',
        zhTW: '有意思——這是哪種傳奇魚，它是可以放入魚塘的魚種嗎？',
        ja: 'ふむ——どの伝説の魚だろ？池に入れられる魚種？',
        ko: '오——이건 어떤 전설의 물고기지? 연못에 넣을 수 있는 어종인가요?',
        de: 'Interessant — welcher Legendenfisch ist das, und kann er in einen Teich?',
        type: 'pond',
      },
    ],
  },
  {
    q_en: 'What do you primarily use fishing gold for?',
    q_zh: '你主要把钓鱼赚来的金币用来做什么？',
    q_zhTW: '你主要把釣魚賺來的金幣用來做什麼？',
    q_ja: '釣りで稼いだお金は主に何に使う？',
    q_ko: '낚시로 번 골드는 주로 어디에 써요?',
    q_de: 'Wofür verwendest du hauptsächlich dein Angel-Gold?',
    options: [
      {
        en: 'Upgrading my rod, buying bait and tackle, and investing back into my fishing efficiency',
        zh: '升级鱼竿、购买鱼饵和渔具，重新投资于钓鱼效率',
        zhTW: '升級魚竿、購買魚餌和漁具，重新投資於釣魚效率',
        ja: '竿のアップグレード、えさや仕掛けの購入——釣り効率への再投資',
        ko: '낚싯대 업그레이드, 미끼와 도구 구매——낚시 효율에 재투자해요',
        de: 'Angel-Upgrades, Köder und Ausrüstung kaufen — alles reinvestiert in Angeleffizienz',
        type: 'legendary',
      },
      {
        en: 'General farm progress — crops, buildings, animals — fishing is one income stream among many',
        zh: '一般农场进展——庄稼、建筑、动物——钓鱼是众多收入来源之一',
        zhTW: '一般農場進展——莊稼、建築、動物——釣魚是眾多收入來源之一',
        ja: '農場全般の発展——作物、建物、動物——釣りは数ある収入源のひとつ',
        ko: '농장 전반——작물, 건물, 동물——낚시는 여러 수입원 중 하나예요',
        de: 'Allgemeiner Hoffortschritt — Felder, Gebäude, Tiere — Angeln ist eine Einnahmequelle unter vielen',
        type: 'completionist',
      },
      {
        en: 'It is reliable passive income so I spend it on whatever the farm needs without thinking much about it',
        zh: '这是可靠的被动收入，所以我把它花在农场需要的任何东西上，不太考虑它',
        zhTW: '這是可靠的被動收入，所以我把它花在農場需要的任何東西上，不太考慮它',
        ja: '安定したパッシブ収入だから、農場に必要なものに気軽に使う',
        ko: '안정적인 수동 수입이니까 농장에 필요한 데 부담 없이 써요',
        de: 'Es ist zuverlässiges passives Einkommen, das ich für das ausgebe, was der Hof braucht',
        type: 'crabpot',
      },
      {
        en: 'I reinvest into more fish ponds so I can scale up caviar and roe production',
        zh: '我重新投资更多鱼塘，这样我就可以扩大鱼子酱和鱼卵的产量',
        zhTW: '我重新投資更多魚塘，這樣我就可以擴大魚子醬和魚卵的產量',
        ja: '魚の池をもっと増やして、キャビアや魚卵の生産量を拡大する',
        ko: '어류 연못을 더 늘려서 캐비아와 어란 생산량을 늘려요',
        de: 'Ich investiere in mehr Fischteiche, um die Kaviar- und Rogenproduktion zu skalieren',
        type: 'pond',
      },
    ],
  },
  {
    q_en: 'Where do you most often fish in Stardew Valley?',
    q_zh: '你最常在星露谷哪里钓鱼？',
    q_zhTW: '你最常在星露谷哪裡釣魚？',
    q_ja: 'スターデューバレーでよく釣りをする場所は？',
    q_ko: '스타듀 밸리에서 낚시는 주로 어디서 해요?',
    q_de: 'Wo angelst du in Stardew Valley am häufigsten?',
    options: [
      {
        en: 'Wherever the legendary fish are — mountain lake at night, ocean pier in summer, Secret Woods — I plan around them',
        zh: '无论传奇鱼在哪——夜晚的山中湖、夏天的海洋码头、秘密树林——我根据它们来规划',
        zhTW: '無論傳奇魚在哪——夜晚的山中湖、夏天的海洋碼頭、秘密樹林——我根據它們來規劃',
        ja: '伝説の魚がいる場所——夜の山の湖、夏の海の桟橋、秘密の森——全部その魚中心に計画してる',
        ko: '전설의 물고기가 있는 곳——밤의 산 호수, 여름 바다 부두, 비밀 숲——그것들에 맞춰 계획 세워요',
        de: 'Wo immer die Legendenfische sind — Bergsee nachts, Ozeansteg im Sommer, Geheimwald — ich plane alles um sie herum',
        type: 'legendary',
      },
      {
        en: 'Wherever is most convenient for what I am already doing — I fish opportunistically, not obsessively',
        zh: '在我已经在做的事情中最方便的地方——我机会性地钓鱼，而不是痴迷地钓鱼',
        zhTW: '在我已經在做的事情中最方便的地方——我機會性地釣魚，而不是痴迷地釣魚',
        ja: 'そのとき自分がいる場所の近く——ついでに釣る感じで、ガチで追いかけはしない',
        ko: '이미 있는 곳에서 가장 편한 곳——기회가 될 때 낚시하는 식이에요',
        de: 'Wo es gerade am bequemsten ist — ich angle opportunistisch, nicht obsessiv',
        type: 'completionist',
      },
      {
        en: 'Honestly I barely open the fishing screen — my crabpots are working while I farm, mine, and do errands',
        zh: '说实话，我几乎不打开钓鱼界面——我的蟹笼在我种地、挖矿和跑腿时默默工作',
        zhTW: '說實話，我幾乎不打開釣魚界面——我的蟹籠在我種地、挖礦和跑腿時默默工作',
        ja: '正直ほぼ釣り画面を開かない——農作業や採掘や用事をしてる間にかに罠が稼いでくれてる',
        ko: '솔직히 낚시 화면을 거의 안 열어요——게 통발이 농사짓고 광산 가고 심부름하는 동안 일해줘요',
        de: 'Ehrlich gesagt öffne ich den Angelscreen kaum — meine Krabbenkörbe arbeiten, während ich farme, mine und Besorgungen mache',
        type: 'crabpot',
      },
      {
        en: 'The lake or ocean, catching the specific species that my ponds still need to be stocked',
        zh: '湖泊或海洋，捕捉我的鱼塘还需要的特定鱼种',
        zhTW: '湖泊或海洋，捕捉我的魚塘還需要的特定魚種',
        ja: '湖や海で、池に必要な魚種を狙って釣る',
        ko: '호수나 바다에서 연못에 필요한 특정 어종을 낚아요',
        de: 'Im See oder Ozean, um die Fischarten zu fangen, die meine Teiche noch brauchen',
        type: 'pond',
      },
    ],
  },
  {
    q_en: 'What does a perfect Stardew Valley fishing session look like for you?',
    q_zh: '对你来说，完美的星露谷钓鱼时间是什么样的？',
    q_zhTW: '對你來說，完美的星露谷釣魚時間是什麼樣的？',
    q_ja: '理想のスターデューバレー釣りセッションってどんな感じ？',
    q_ko: '완벽한 스타듀 밸리 낚시 세션이란 어떤 모습이에요?',
    q_de: 'Wie sieht eine perfekte Angelstunde in Stardew Valley für dich aus?',
    options: [
      {
        en: 'Catching the last legendary I need for the collection — Mutant Carp, Crimsonfish, whatever — and seeing it go into the museum',
        zh: '钓到我收藏所需的最后一条传奇鱼——变异鲤鱼、绯红鱼，不管是什么——然后看着它进入博物馆',
        zhTW: '釣到我收藏所需的最後一條傳奇魚——變異鯉魚、緋紅魚，不管是什麼——然後看著它進入博物館',
        ja: '図鑑に必要な最後の伝説の魚——変異コイでも深紅の魚でも——を釣って博物館に納めること',
        ko: '수집에 필요한 마지막 전설의 물고기——변종 잉어든 크림슨피시든——를 낚아서 박물관에 기증하는 것',
        de: 'Den letzten Legendenfisch für meine Sammlung fangen — Mutantenkarpen, Purpurfisch, was auch immer — und ihn ins Museum bringen',
        type: 'legendary',
      },
      {
        en: 'Efficiently catching the last three fish missing from the Community Center bundle before the season ends',
        zh: '在季节结束前高效钓到社区中心任务单中缺少的最后三条鱼',
        zhTW: '在季節結束前高效釣到社區中心任務單中缺少的最後三條魚',
        ja: 'シーズン終了前に、コミュニティセンターのバンドルに足りない魚3種を効率よく釣り切ること',
        ko: '시즌이 끝나기 전에 커뮤니티 센터 번들에 필요한 마지막 물고기 세 종류를 효율적으로 낚는 것',
        de: 'Die letzten drei fehlenden Fische für das Community-Center-Bundle vor Saisonende effizient fangen',
        type: 'completionist',
      },
      {
        en: 'Logging in, collecting gold from 30 crabpots across the beach and ocean in under five minutes, and returning to real farming',
        zh: '登录，在不到五分钟内从海滩和海洋的 30 个蟹笼中收集金币，然后返回真正的农业',
        zhTW: '登錄，在不到五分鐘內從海灘和海洋的 30 個蟹籠中收集金幣，然後返回真正的農業',
        ja: 'ログインして、ビーチと海の30個のかに罠から5分以内にお金を回収して、本来の農業に戻ること',
        ko: '접속해서 해변과 바다의 게 통발 30개를 5분 안에 수거하고, 진짜 농사로 돌아가는 것',
        de: 'Einloggen, Gold aus 30 Krabbenkörben am Strand und Ozean in unter fünf Minuten einsammeln, und zurück zum echten Farmwork',
        type: 'crabpot',
      },
      {
        en: 'Watching my eight fish ponds all produce at capacity — the sturgeon generating caviar, the lava eel producing roe — and calculating the season profit',
        zh: '看着我的八个鱼塘全部满负荷生产——鲟鱼产鱼子酱、熔岩鳗鱼产鱼卵——并计算季度利润',
        zhTW: '看著我的八個魚塘全部滿負荷生產——鱘魚產魚子醬、熔岩鰻魚產魚卵——並計算季度利潤',
        ja: '8つの魚の池がフル稼働してるのを眺める——チョウザメがキャビア、溶岩ウナギが魚卵を生産——そして季節の利益を計算すること',
        ko: '8개의 물고기 연못이 모두 최대 생산 중인 걸 보는 것——철갑상어는 캐비아, 용암 장어는 어란을 생산하는——그리고 시즌 수익을 계산하는 것',
        de: 'Meine acht Fischteiche alle auf Kapazität produzieren sehen — Stör erzeugt Kaviar, Lavaaal produziert Rogen — und den Saisongewinn berechnen',
        type: 'pond',
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
    guide_en: string
    guide_zh: string
    guide_zhTW: string
    guide_ja: string
    guide_ko: string
    guide_de: string
    tip_en: string
    tip_zh: string
    tip_zhTW: string
    tip_ja: string
    tip_ko: string
    tip_de: string
  }
> = {
  legendary: {
    title_en: 'The Legendary Hunter',
    title_zh: '传奇鱼猎手',
    title_zhTW: '傳奇魚獵手',
    title_ja: '伝説の魚ハンター',
    title_ko: '전설의 물고기 헌터',
    title_de: 'Der Legendenjäger',
    emoji: '🎣',
    tag_en: 'You fish for the thrill — collecting every legendary, mastering the minigame, and reaching the ceiling of what fishing skill can do',
    tag_zh: '你为刺激而钓鱼——收集每一条传奇鱼、掌握小游戏、达到钓鱼技能所能做到的极限',
    tag_zhTW: '你為刺激而釣魚——收集每一條傳奇魚、掌握小遊戲、達到釣魚技能所能做到的極限',
    tag_ja: '興奮のために釣りをする——すべての伝説の魚を集め、ミニゲームをマスターし、釣りスキルの限界を目指す',
    tag_ko: '스릴을 위해 낚시해요——모든 전설의 물고기를 수집하고, 미니게임을 마스터하고, 낚시 스킬의 한계에 도전하는 타입',
    tag_de: 'Du angelst für den Nervenkitzel — sammelst jeden Legendenfisch, meisterst das Minigame und schöpfst alles aus dem Angelskill heraus',
    guide_en:
      "The five legendary fish are Mutant Carp (Sewers, any season), Legend (mountain lake spring rain, level 10 fishing), Crimsonfish (east ocean pier summer, level 5 fishing), Angler (north of Jodi's house fall bridge, level 3), and Glacierfish (south of Arrowhead Island winter, level 6). For maximum fishing skill efficiency: reach level 4 fishing to unlock the Fiberglass Rod and use bait, then grind to level 6 for the Iridium Rod upgrade path. Wild Bait (Linus's recipe, level 4 foraging) increases the chance of catching two fish at once and is the most valuable bait for legendary hunting. Cork Bobber is the best tackle for general use — it increases the size of your green fishing bar, which is critical for the minigame. The Legend is arguably the hardest fish in the game: it requires level 10, raining, spring, mountain lake, and then tests the limits of the minigame. Stack every advantage: Iridium Rod, Wild Bait, Cork Bobber, Fishing enchantment from the Forge if possible. Dishes that boost fishing: Dish O' The Sea (+3), Chowder (+3 max energy, also slightly +fishing), Trout Soup (+1), and Seafoam Pudding (+4) from cooking. Eat a buff food before every session targeting a legendary.",
    guide_zh:
      '五条传奇鱼是：变异鲤鱼（下水道，任何季节）、传说（山中湖、春天雨天、需要 10 级钓鱼）、绯红鱼（东海洋码头夏天、需要 5 级钓鱼）、钓鱼者（Jo家北部秋天木桥、需要 3 级）和冰川鱼（箭头岛南部冬天、需要 6 级）。最高效提升钓鱼技能：达到 4 级解锁玻璃纤维鱼竿并使用鱼饵，然后磨到 6 级进入铱合金鱼竿升级路径。野生鱼饵（Linus 的配方、4 级采集）增加同时钓两条鱼的概率，是传奇鱼猎手最有价值的鱼饵。软木浮标是通用最佳钓具——它增加绿色钓鱼条的大小，这对小游戏至关重要。传说鱼可以说是游戏中最难的鱼：需要 10 级、下雨、春天、山中湖，然后考验小游戏的极限。叠加每一个优势：铱合金鱼竿、野生鱼饵、软木浮标，如果可能的话还有铸造厂的钓鱼附魔。提升钓鱼的菜肴：深海之盘（+3）、浓汤（+3 最大能量）、鳟鱼汤（+1）和海泡布丁（+4）。在每次针对传奇鱼的游戏前吃一种增益食物。',
    guide_zhTW:
      '五條傳奇魚是：變異鯉魚（下水道，任何季節）、傳說（山中湖、春天雨天、需要 10 級釣魚）、緋紅魚（東海洋碼頭夏天、需要 5 級釣魚）、釣魚者（Jo家北部秋天木橋、需要 3 級）和冰川魚（箭頭島南部冬天、需要 6 級）。最高效提升釣魚技能：達到 4 級解鎖玻璃纖維魚竿並使用魚餌，然後磨到 6 級進入銥合金魚竿升級路徑。野生魚餌（Linus 的配方、4 級採集）增加同時釣兩條魚的概率，是傳奇魚獵手最有價值的魚餌。軟木浮標是通用最佳釣具——它增加綠色釣魚條的大小，這對小遊戲至關重要。傳說魚可以說是遊戲中最難的魚：需要 10 級、下雨、春天、山中湖，然後考驗小遊戲的極限。疊加每一個優勢：銥合金魚竿、野生魚餌、軟木浮標，如果可能的話還有鑄造廠的釣魚附魔。提升釣魚的菜餚：深海之盤（+3）、濃湯（+3 最大能量）、鱒魚湯（+1）和海泡布丁（+4）。在每次針對傳奇魚的遊戲前吃一種增益食物。',
    guide_ja:
      '伝説の魚は5種類：変異コイ（下水道、季節問わず）、レジェンド（山の湖・春の雨・釣りLv10必須）、クリムゾンフィッシュ（東の桟橋・夏・Lv5必須）、アングラー（Jo邸北の橋・秋・Lv3必須）、グレイシャーフィッシュ（アローヘッド島南・冬・Lv6必須）。効率的な釣りスキル上げ：Lv4でファイバーグラスロッドとえさが解禁、そこからLv6を目指してイリジウムロッドへ。ワイルドベイト（リナスのレシピ・採集Lv4）は一度に2匹釣れる確率が上がり、伝説魚ハンターに最も価値の高いえさ。コルクウキはミニゲームで緑バーが広がり汎用最強の仕掛け。レジェンドはゲーム最難関：Lv10＋雨＋春＋山の湖で、あらゆる条件を重ねてから挑もう。装備は全部盛り：イリジウムロッド＋ワイルドベイト＋コルクウキ＋可能なら鍛冶場のエンチャント。釣りバフ料理：ディッシュ・オ・ザ・シー（+3）、チャウダー（+3最大エネルギー）、マストスープ（+1）、シーフォームプディング（+4）。伝説魚を狙う前は必ずバフ料理を食べよう。',
    guide_ko:
      '전설의 물고기는 5종: 변종 잉어(하수도, 모든 계절), 레전드(산 호수·봄 비·낚시 10레벨 필요), 크림슨피시(동쪽 부두·여름·5레벨 필요), 앵글러(Jo네 집 북쪽 다리·가을·3레벨 필요), 글레이셔피시(화살촉 섬 남쪽·겨울·6레벨 필요). 효율적인 낚시 스킬 올리기: 4레벨에서 파이버글래스 낚싯대와 미끼 해금, 그 후 6레벨을 목표로 이리듐 낚싯대로. 와일드 베이트(리누스 레시피, 채집 4레벨)는 한 번에 두 마리 잡을 확률 상승——전설의 물고기 헌터에게 최고의 미끼. 코르크 찌는 초록 바 크기를 늘려줘 미니게임에 결정적——범용 최강 도구. 레전드는 게임 최고 난이도: 10레벨+비+봄+산 호수 조건에 이리듐 낚싯대+와일드 베이트+코르크 찌+대장간 낚시 인챈트까지 모두 쌓아야 해요. 낚시 버프 음식: 바다 요리(+3), 차우더(+3 최대 에너지), 송어 수프(+1), 해초 푸딩(+4). 전설의 물고기를 노리기 전에 반드시 버프 음식을 먹어요.',
    guide_de:
      "Die fünf Legendenfische sind: Mutantenkarpen (Kanalisation, jede Saison), Legende (Bergsee, Frühlingsregen, Angellevel 10), Purpurfisch (östlicher Ozeansteg, Sommer, Level 5), Angler (Brücke nördlich von Jodis Haus, Herbst, Level 3) und Gletscherfisch (südlich von Pfeilspitzeninsel, Winter, Level 6). Effizienter Levelweg: Level 4 für Glasfaserrute mit Köder, dann auf Level 6 für die Iridiumrute. Wildköder (Linus-Rezept, Sammel-Level 4) erhöht die Chance, zwei Fische auf einmal zu fangen — unschlagbar für Legendenjäger. Der Korkschwimmer vergrößert die grüne Angelleiste und ist die beste Ausrüstung für das Minigame. Der Legendenfisch ist wohl der schwerste im Spiel: Level 10, Regen, Frühling, Bergsee — alles auf einmal. Synergien maximieren: Iridiumrute + Wildköder + Korkschwimmer + Schmiedeenchant wenn möglich. Angelbuffe durch Gerichte: Meeresdelikatesse (+3), Chowder (+3 Maxenergie), Forellensuppe (+1), Meeresschaumpudding (+4). Vor jeder Legendenjagd immer ein Buffgericht essen.",
    tip_en: "On rainy days, fish at the mountain lake from 6 AM — Legend can spawn here in spring rain, and rain boosts fish bite rate. If you miss a legendary in its season, the Sewers Mutant Carp is always available and good practice for difficult bar control.",
    tip_zh: '下雨天从早上 6 点开始在山中湖钓鱼——传说鱼可以在春雨中出现在这里，而且雨天会提升鱼咬钩率。如果你在某个季节错过了传奇鱼，下水道的变异鲤鱼随时可以钓，是练习困难钓鱼条控制的好方法。',
    tip_zhTW: '下雨天從早上 6 點開始在山中湖釣魚——傳說魚可以在春雨中出現在這裡，而且雨天會提升魚咬鉤率。如果你在某個季節錯過了傳奇魚，下水道的變異鯉魚隨時可以釣，是練習困難釣魚條控制的好方法。',
    tip_ja: '雨の日は朝6時から山の湖でスタート——レジェンドは春雨の山の湖に出現するし、雨は魚の食いつきも上がる。もし伝説魚を季節内に逃しても、下水道の変異コイは通年釣れるので難しいバー操作の練習に最適。',
    tip_ko: '비 오는 날에는 오전 6시부터 산 호수에서 시작해요——레전드는 봄비 오는 날 이곳에 나오고, 비는 물고기 입질률도 올려줘요. 전설의 물고기를 시즌에 놓쳤다면, 하수도의 변종 잉어는 언제든지 잡을 수 있어서 어려운 낚시 바 컨트롤 연습에 딱이에요.',
    tip_de: 'An Regentagen ab 6 Uhr morgens am Bergsee angeln — der Legendenfisch taucht hier im Frühlingsregen auf, und Regen erhöht die Beißrate. Wenn du einen Legendenfisch in seiner Saison verpasst, ist der Mutantenkarpen in der Kanalisation immer verfügbar — perfekt zum Üben der schwierigen Leistensteuerung.',
  },
  completionist: {
    title_en: 'The Bundle Completionist',
    title_zh: '任务单完成者',
    title_zhTW: '任務單完成者',
    title_ja: 'コミュニティセンター完走者',
    title_ko: '번들 완성가',
    title_de: 'Der Bundle-Perfektionist',
    emoji: '📋',
    tag_en: 'You fish with purpose — filling every Community Center bundle systematically before seasonal deadlines, using fishing as one efficient tool in a broader farm plan',
    tag_zh: '你有目的地钓鱼——在季节截止日期前系统性地完成每个社区中心任务单，将钓鱼作为更广泛农场计划中的一个高效工具',
    tag_zhTW: '你有目的地釣魚——在季節截止日期前系統性地完成每個社區中心任務單，將釣魚作為更廣泛農場計劃中的一個高效工具',
    tag_ja: '目的を持って釣りをする——季節の締め切りに合わせてコミュニティセンターのバンドルをひとつひとつ埋めていく、農場計画の中の効率的なツールとして',
    tag_ko: '목적 있게 낚시해요——시즌 마감 전에 커뮤니티 센터의 모든 번들을 체계적으로 완성하면서, 낚시를 큰 농장 계획 속 효율적인 도구로 활용하는 타입',
    tag_de: 'Du angelst mit Zweck — du füllst jedes Community-Center-Bundle systematisch vor den Saisondeadlines aus und nutzt Angeln als effizientes Werkzeug im großen Hofplan',
    guide_en:
      "The Community Center fish bundles require specific seasonal fish, so planning ahead prevents missing them. Spring: Catfish (spring/fall rain, river/secret woods), Shad (spring/summer/fall, river), Sardine (spring/fall/winter, ocean), Eel (spring/fall rain, ocean). Summer: Pufferfish (summer, ocean 12 PM-4 PM), Tuna (summer/winter, ocean), Red Snapper (summer/fall, ocean), Tilapia (summer/fall, ocean). Fall: Salmon (fall, river), Walleye (fall rain, all freshwater), Tiger Trout (fall/winter, river level 5+), Albacore (fall/winter, ocean). Winter: Squid (winter, ocean night), Lingcod (winter, all freshwater), Midnight Carp (fall/winter, all freshwater/mountain lake after 8 PM). The Night Fishing Bundle (walleye, bream, eel) requires fishing after 8 PM. Use the wiki or fish finder to know exactly which fish are in season — fishing outside a fish's time window is wasted energy. A Fiberglass Rod + bait is sufficient for all bundle fish; you do not need the Iridium Rod to complete the Bulletin Board or Community Center.",
    guide_zh:
      '社区中心鱼类任务单需要特定的季节性鱼类，所以提前规划可以避免错过。春天：鲶鱼（春天/秋天下雨、河流/秘密树林）、美洲西鲱（春夏秋、河流）、沙丁鱼（春天/秋天/冬天、海洋）、鳗鱼（春天/秋天下雨、海洋）。夏天：河豚（夏天、海洋 12 PM-4 PM）、金枪鱼（夏天/冬天、海洋）、红鲷鱼（夏天/秋天、海洋）、罗非鱼（夏天/秋天、海洋）。秋天：鲑鱼（秋天、河流）、胡瓜鱼（秋天下雨、所有淡水）、虎鳟鱼（秋天/冬天、河流 5 级以上）、长鳍金枪鱼（秋天/冬天、海洋）。冬天：鱿鱼（冬天、海洋夜晚）、香鱼（冬天、所有淡水）、午夜鲤鱼（秋天/冬天、所有淡水/晚上 8 点后的山中湖）。夜间钓鱼任务单（胡瓜鱼、鲷鱼、鳗鱼）需要在晚上 8 点后钓鱼。用维基或鱼类索引了解哪些鱼正当季——在鱼类时间窗口之外钓鱼是浪费精力。玻璃纤维鱼竿 + 鱼饵足以完成所有任务单鱼类；你不需要铱合金鱼竿来完成公告板或社区中心。',
    guide_zhTW:
      '社區中心魚類任務單需要特定的季節性魚類，所以提前規劃可以避免錯過。春天：鯰魚（春天/秋天下雨、河流/秘密樹林）、美洲西鰱（春夏秋、河流）、沙丁魚（春天/秋天/冬天、海洋）、鰻魚（春天/秋天下雨、海洋）。夏天：河豚（夏天、海洋 12 PM-4 PM）、金槍魚（夏天/冬天、海洋）、紅鯛魚（夏天/秋天、海洋）、羅非魚（夏天/秋天、海洋）。秋天：鮭魚（秋天、河流）、胡瓜魚（秋天下雨、所有淡水）、虎鱒魚（秋天/冬天、河流 5 級以上）、長鰭金槍魚（秋天/冬天、海洋）。冬天：魷魚（冬天、海洋夜晚）、香魚（冬天、所有淡水）、午夜鯉魚（秋天/冬天、所有淡水/晚上 8 點後的山中湖）。夜間釣魚任務單（胡瓜魚、鯛魚、鰻魚）需要在晚上 8 點後釣魚。每個季節開始時列出當季有哪些任務單魚類需要捕捉——玻璃纖維魚竿 + 魚餌對所有任務單魚類來說已足夠。',
    guide_ja:
      'コミュニティセンターの魚バンドルは季節ごとの特定の魚が必要なので事前計画が大切。春：ナマズ（春/秋の雨、川/秘密の森）、シャッド（春夏秋、川）、イワシ（春/秋/冬、海）、ウナギ（春/秋の雨、海）。夏：フグ（夏、海・正午〜16時）、マグロ（夏/冬、海）、赤鯛（夏/秋、海）、ティラピア（夏/秋、海）。秋：サーモン（秋、川）、ワカサギ（秋の雨、全淡水）、タイガートラウト（秋/冬、川Lv5以上）、アルバコア（秋/冬、海）。冬：イカ（冬、海・夜）、リンコッド（冬、全淡水）、真夜中の鯉（秋/冬、全淡水/夜20時以降の山の湖）。夜釣りバンドル（ワカサギ・ブリーム・ウナギ）は20時以降に。各シーズン開始時に必要な魚のリストを作ると「夏限定の魚を冬に忘れた！」という悲劇を防げる。ファイバーグラスロッド＋えさで全バンドル魚は対応可能。',
    guide_ko:
      '커뮤니티 센터 물고기 번들은 특정 계절 물고기를 요구하므로 미리 계획을 세우는 것이 중요해요. 봄: 메기(봄/가을 비, 강/비밀 숲), 반어(봄여름가을, 강), 정어리(봄/가을/겨울, 바다), 뱀장어(봄/가을 비, 바다). 여름: 복어(여름, 바다 오후 12시-4시), 참치(여름/겨울, 바다), 붉은도미(여름/가을, 바다), 틸라피아(여름/가을, 바다). 가을: 연어(가을, 강), 빙어(가을 비, 모든 민물), 호랑이 송어(가을/겨울, 강 5레벨 이상), 날개다랑어(가을/겨울, 바다). 겨울: 오징어(겨울, 바다 밤), 링코드(겨울, 모든 민물), 한밤의 잉어(가을/겨울, 모든 민물/밤 8시 이후 산 호수). 야간 낚시 번들(빙어, 도미, 뱀장어)은 밤 8시 이후에. 시즌 초에 필요한 물고기 목록을 체크리스트로 만들어 두면 "여름 전용 물고기를 잊었다!"는 실수를 방지할 수 있어요. 파이버글래스 낚싯대+미끼로 모든 번들 물고기 대응 가능해요.',
    guide_de:
      'Die Community-Center-Fischbundles brauchen saisonal-spezifische Fische, also ist Vorausplanung wichtig. Frühling: Wels (Frühling/Herbst-Regen, Fluss/Geheimwald), Maifisch (Frühling/Sommer/Herbst, Fluss), Sardine (Frühling/Herbst/Winter, Ozean), Aal (Frühling/Herbst-Regen, Ozean). Sommer: Kugelfisch (Sommer, Ozean 12-16 Uhr), Thunfisch (Sommer/Winter, Ozean), Roter Schnapper (Sommer/Herbst, Ozean), Tilapia (Sommer/Herbst, Ozean). Herbst: Lachs (Herbst, Fluss), Stint (Herbst-Regen, alles Süßwasser), Tigerforelle (Herbst/Winter, Fluss Level 5+), Weißer Thunfisch (Herbst/Winter, Ozean). Winter: Tintenfisch (Winter, Ozean nachts), Dorsch (Winter, alles Süßwasser), Mitternachtskarpfen (Herbst/Winter, Süßwasser/Bergsee ab 20 Uhr). Das Nachtangelbundle braucht Fische nach 20 Uhr. Mach zu Saisonbeginn eine Checkliste der Bundle-Fische — so vermeidest du den Schmerz, im Winter zu merken, dass du den Sommerfisch vergessen hast. Glasfaserrute + Köder reicht für alle Bundle-Fische.',
    tip_en: "Make a checklist at the start of each season noting which bundle fish are available that season and what time/weather they require. This prevents the gut-punch of reaching winter and realizing you forgot to catch a summer-only fish.",
    tip_zh: '在每个季节开始时列一张清单，注明当季有哪些任务单鱼类以及它们需要什么时间/天气。这样可以避免到了冬天才意识到忘记钓了夏天独有的鱼那种心痛的感觉。',
    tip_zhTW: '在每個季節開始時列一張清單，注明當季有哪些任務單魚類以及它們需要什麼時間/天氣。這樣可以避免到了冬天才意識到忘記釣了夏天獨有的魚那種心痛的感覺。',
    tip_ja: '各シーズン開始時に、そのシーズンに釣れるバンドル魚と必要な時間帯・天候をメモしておこう。「夏限定の魚を冬に思い出す」という後悔を防ぐためのリスト管理が、バンドル完走者の最大の武器。',
    tip_ko: '각 시즌 시작 때 그 시즌에 잡을 수 있는 번들 물고기와 필요한 시간/날씨를 메모해 두세요. "겨울에 여름 전용 물고기 잊은 걸 깨닫는" 슬픔을 막아주는 가장 강력한 습관이에요.',
    tip_de: 'Mach zu Saisonbeginn eine Checkliste mit den Bundle-Fischen, die in dieser Saison verfügbar sind, und wann und bei welchem Wetter sie beißen. Das verhindert den Schmerz, im Winter festzustellen, dass du den Sommerfisch vergessen hast.',
  },
  crabpot: {
    title_en: 'The Passive Crabpotter',
    title_zh: '被动蟹笼玩家',
    title_zhTW: '被動蟹籠玩家',
    title_ja: 'かに罠パッシブ勢',
    title_ko: '수동형 통발 플레이어',
    title_de: 'Der Passive Krabbenkorb-Spieler',
    emoji: '🦀',
    tag_en: 'You fish without fishing — a network of crabpots generating daily passive income while you focus on everything else the farm needs',
    tag_zh: '你不钓鱼地钓鱼——一个蟹笼网络每天产生被动收入，而你专注于农场需要的其他一切',
    tag_zhTW: '你不釣魚地釣魚——一個蟹籠網絡每天產生被動收入，而你專注於農場需要的其他一切',
    tag_ja: '釣らずに釣る——かに罠ネットワークが毎日パッシブ収入を生み出す間、農場の他のことに集中する',
    tag_ko: '낚시 없이 낚는 타입——게 통발 네트워크가 매일 수동 수입을 올려주는 동안 농장의 다른 일에 집중해요',
    tag_de: 'Du angelst ohne zu angeln — ein Netz aus Krabbenkörben generiert täglich passives Einkommen, während du dich um alles andere auf dem Hof kümmerst',
    guide_en:
      "Crabpots become available after reaching fishing level 3 (sold by Willy or crafted after level 3). You place them in water — river, ocean, lake, or mountain lake — and they passively catch crustaceans and trash overnight without any minigame. The critical upgrade is the Mariner profession at fishing level 10: instead of catching trash, your crabpots only catch quality items. If you choose Fisher at level 5, you will need to go Fisher → Mariner at level 10. With Mariner, every crabpot pull is a sellable item. Efficient crabpot setup: 30+ crabpots placed in the ocean near the beach at the south end of town gives maximum variety. Each crabpot requires bait to function — Trash Can Hat (wearing) or Auto-Grabber for crabpots (modded) makes collection even faster in vanilla. Keep a stack of bait always in inventory; you can make bait from any fish × 1 = 5 bait. The best income from crabpots is Lobster (120g), Crab (100g), Clam (50g), Mussel (30g) — Mariner means no more Soggy Newspaper or Broken CD days. A full 30-crabpot ocean grid with Mariner generates roughly 1,500-3,000g daily for 5 minutes of collection time.",
    guide_zh:
      '蟹笼在达到钓鱼 3 级后可用（Willy 处购买或 3 级后解锁制作）。你把它们放在水中——河流、海洋、湖泊或山中湖——它们在一夜之间被动地捕捉甲壳类动物和垃圾，无需任何小游戏。关键升级是钓鱼 10 级的水手职业：你的蟹笼不再捕垃圾，只捕高质量物品。如果你在 5 级选择了渔夫，你需要在 10 级走渔夫→水手路线。有了水手，每次蟹笼收获都是可出售的物品。高效蟹笼设置：在镇南端海滩附近的海洋中放置 30+ 个蟹笼可以获得最大多样性。每个蟹笼需要鱼饵才能运作——可以用任何鱼 × 1 = 5 鱼饵来制作鱼饵。始终在背包中保持一叠鱼饵；垃圾桶帽（佩戴）可以让收集更快。水手蟹笼的最佳收入是龙虾（120g）、螃蟹（100g）、蛤蜊（50g）、贻贝（30g）——水手意味着不再有浸湿报纸或破损 CD 的日子。拥有 30 个蟹笼的完整海洋网格加上水手职业，每天 5 分钟收集时间大约产生 1,500-3,000g。',
    guide_zhTW:
      '蟹籠在達到釣魚 3 級後可用（Willy 處購買或 3 級後解鎖製作）。你把它們放在水中——河流、海洋、湖泊或山中湖——它們在一夜之間被動地捕捉甲殼類動物和垃圾，無需任何小遊戲。關鍵升級是釣魚 10 級的水手職業：你的蟹籠不再捕垃圾，只捕高品質物品。如果你在 5 級選擇了漁夫，你需要在 10 級走漁夫→水手路線。有了水手，每次蟹籠收穫都是可出售的物品。高效蟹籠設置：在鎮南端海灘附近的海洋中放置 30+ 個蟹籠可以獲得最大多樣性。每個蟹籠需要魚餌才能運作——可以用任何魚 × 1 = 5 魚餌來製作魚餌。始終在背包中保持一疊魚餌。水手蟹籠的最佳收入是龍蝦（120g）、螃蟹（100g）、蛤蜊（50g）、貽貝（30g）——水手意味著不再有浸濕報紙或破損 CD 的日子。擁有 30 個蟹籠的完整海洋網格加上水手職業，每天 5 分鐘收集時間大約產生 1,500-3,000g。',
    guide_ja:
      'かに罠は釣りLv3で解禁（ウィリーの店で購入か自分でクラフト）。水場（川、海、湖、山の湖）に設置すると、ミニゲームなしで一晩中パッシブに甲殻類やゴミを捕獲。最重要アップグレードは釣りLv10の「船乗り」職業：ゴミの代わりに品質アイテムだけを獲れるようになる。Lv5で「漁師」を選んだ場合、Lv10で漁師→船乗りのルートへ。船乗りになればかに罠から取れるものはすべて売れる。効率的な設置：南の浜辺の海に30個以上設置すると最大の種類を確保。各かに罠にはえさが必要——魚1匹からえさ5個を作れる。船乗りありの30個かに罠グリッドで、毎日5分の回収作業が1,500〜3,000g相当。ロブスター(120g)、カニ(100g)、アサリ(50g)、ムール貝(30g)がメイン収入で、ゴミ拾いの日とはおさらば。',
    guide_ko:
      '게 통발은 낚시 3레벨에서 해금돼요(윌리 상점에서 구매하거나 직접 제작). 강, 바다, 호수, 산 호수에 설치하면 미니게임 없이 밤새 수동으로 갑각류와 쓰레기를 잡아줘요. 핵심 업그레이드는 낚시 10레벨의 "선원" 직업: 쓰레기 대신 품질 아이템만 잡게 돼요. 5레벨에서 "어부"를 선택했다면 10레벨에서 어부→선원 루트로. 선원이 되면 게 통발에서 나오는 건 모두 판매 가능. 효율적인 설치: 마을 남쪽 해변 바다에 30개 이상 설치하면 최대 종류 확보. 각 통발에는 미끼 필요——물고기 1마리로 미끼 5개 제작 가능. 선원+통발 30개 그리드는 매일 5분 수거로 약 1,500-3,000g 생산. 랍스터(120g), 게(100g), 조개(50g), 홍합(30g)이 주요 수입원——쓰레기 날의 기억은 이제 안녕.',
    guide_de:
      'Krabbenkörbe sind ab Angelskill 3 verfügbar (bei Willy kaufen oder craften). Du platzierst sie in Gewässern — Fluss, Ozean, See oder Bergsee — und sie fangen passiv Krebstiere und Müll über Nacht, ganz ohne Minigame. Das wichtigste Upgrade ist der "Matrose"-Beruf bei Angel-Level 10: Statt Müll fangen deine Körbe nur Qualitätsgegenstände. Falls du bei Level 5 "Fischer" gewählt hast, geh bei Level 10 auf Fischer → Matrose. Mit Matrose ist jeder Korbinhalt verkaufbar. Effizientes Setup: 30+ Körbe im Ozean nahe des Südstrands geben maximale Vielfalt. Jeder Krabbenkorb braucht Köder — 1 Fisch = 5 Köder. Ein volles 30-Körbe-Raster mit Matrose bringt täglich 1.500-3.000g in 5 Minuten Sammelzeit. Haupteinnahmen: Hummer (120g), Krabbe (100g), Muschel (50g), Miesmuschel (30g). Nie wieder nasse Zeitung-Tage.',
    tip_en: "Place crabpots in the ocean near Willy's shop at the south beach — walk along the pier each morning to collect all of them in one straight line, then restock bait in one batch. Position matters: ocean and mountain lake give different species than the river.",
    tip_zh: '在 Willy 店铺旁边的南部海滩海洋中放置蟹笼——每天早上沿着码头走，一条直线收集所有蟹笼，然后批量补充鱼饵。位置很重要：海洋和山中湖给出的鱼种与河流不同。',
    tip_zhTW: '在 Willy 店鋪旁邊的南部海灘海洋中放置蟹籠——每天早上沿著碼頭走，一條直線收集所有蟹籠，然後批量補充魚餌。位置很重要：海洋和山中湖給出的魚種與河流不同。',
    tip_ja: 'ウィリーの店の近くの南浜の海にかに罠を並べる——毎朝桟橋沿いに一直線で全部回収して、えさをまとめて補充。場所によって取れる種類が変わる：海と山の湖は川とは違う種類が出る。',
    tip_ko: '윌리 상점 근처 남쪽 해변 바다에 게 통발을 설치하세요——매일 아침 부두를 따라 일직선으로 전부 수거하고, 미끼를 한 번에 보충해요. 위치가 중요해요: 바다와 산 호수는 강과 다른 어종이 나와요.',
    tip_de: "Krabbenkörbe im Ozean nahe Willys Laden am Südstrand platzieren — morgens die Mole entlanglaufen, alle auf einmal sammeln und dann Köder in einem Schwung auffüllen. Position zählt: Ozean und Bergsee liefern andere Arten als der Fluss.",
  },
  pond: {
    title_en: 'The Fish Pond Expert',
    title_zh: '鱼塘专家',
    title_zhTW: '魚塘專家',
    title_ja: '魚の池エキスパート',
    title_ko: '물고기 연못 전문가',
    title_de: 'Der Fischteich-Experte',
    emoji: '🏊',
    tag_en: 'You fish to build infrastructure — stocking ponds with high-value species that generate daily roe, caviar, and special items without ever touching the rod again',
    tag_zh: '你钓鱼是为了建设基础设施——用高价值鱼种放养鱼塘，每天生产鱼卵、鱼子酱和特殊物品，而不再需要接触鱼竿',
    tag_zhTW: '你釣魚是為了建設基礎設施——用高價值魚種放養魚塘，每天生產魚卵、魚子醬和特殊物品，而不再需要接觸魚竿',
    tag_ja: 'インフラ構築のために釣りをする——価値の高い魚種で池を満たし、毎日魚卵やキャビアや特別アイテムを生産させ、あとは竿に触れなくていい',
    tag_ko: '인프라 구축을 위해 낚시해요——고가치 어종으로 연못을 채워 매일 어란, 캐비아, 특별 아이템을 생산시키고, 그 후로는 낚싯대를 잡지 않아도 되는 타입',
    tag_de: 'Du angelst, um Infrastruktur aufzubauen — Teiche mit wertvollen Arten zu befüllen, die täglich Rogen, Kaviar und Sonderitems produzieren, ohne die Angel jemals wieder anzufassen',
    guide_en:
      "Fish ponds (1,000g + 200 stone + 5 seaweed + 5 green algae, built by Robin) each hold a single fish species that produces items daily. The most profitable species: Sturgeon (mountain lake, summer/winter) → Roe → Aged Roe = Caviar (500g per jar from Preserves Jar, 40-day aging) — the highest single-item yield in the game from a pond. Lava Eel (floors 100 of the Mines) → Roe → Aged Roe (worth significantly more than raw roe). Blobfish (deep fishing at 9+ Mariner luck) → Roe → profitable but harder to stock initially. Super Cucumber (ocean, summer/fall night) → Roe → consistently profitable. For maximum pond income: 5+ Sturgeon ponds producing caviar, with Artisan profession (+40% to all artisan goods including aged roe) for massive multipliers. Pond population grows when fish ask for specific items — fulfill their requests to increase capacity from 1 to 3 to 5 to 10. Each pond of 10 Sturgeons generates 10 roe per day which becomes 10 caviar (5,000g) per 40-day aging cycle. A mature Sturgeon pond grid is one of the highest passive income sources in the endgame.",
    guide_zh:
      '鱼塘（1,000g + 200 石头 + 5 海藻 + 5 绿藻，由 Robin 建造）每个容纳一个鱼种，每天产生物品。最有利可图的鱼种：鲟鱼（山中湖、夏天/冬天）→ 鱼卵 → 陈年鱼卵 = 鱼子酱（保鲜罐每罐 500g，40 天熟成）——游戏中鱼塘单品最高产出。熔岩鳗鱼（矿山 100 层）→ 鱼卵 → 陈年鱼卵（价值远高于生鱼卵）。水滴鱼（幸运值 9+ 时深海钓鱼）→ 鱼卵 → 利润丰厚但最初放养较难。超级黄瓜（海洋、夏天/秋天夜晚）→ 鱼卵 → 持续盈利。最大化鱼塘收入：5+ 个产鱼子酱的鲟鱼塘，配合工匠职业（所有工匠商品+40%，包括陈年鱼卵）获得巨大乘数。当鱼要求特定物品时，鱼塘种群增长——满足它们的需求以将容量从 1 增加到 3 到 5 到 10。每个装满 10 条鲟鱼的鱼塘每天产生 10 个鱼卵，在 40 天的熟成周期中变成 10 个鱼子酱（5,000g）。成熟的鲟鱼塘网格是游戏后期最高的被动收入来源之一。',
    guide_zhTW:
      '魚塘（1,000g + 200 石頭 + 5 海藻 + 5 綠藻，由 Robin 建造）每個容納一個魚種，每天產生物品。最有利可圖的魚種：鱘魚（山中湖、夏天/冬天）→ 魚卵 → 陳年魚卵 = 魚子醬（保鮮罐每罐 500g，40 天熟成）——遊戲中魚塘單品最高產出。熔岩鰻魚（礦山 100 層）→ 魚卵 → 陳年魚卵（價值遠高於生魚卵）。水滴魚（幸運值 9+ 時深海釣魚）→ 魚卵 → 利潤豐厚但最初放養較難。超級黃瓜（海洋、夏天/秋天夜晚）→ 魚卵 → 持續盈利。最大化魚塘收入：5+ 個產魚子醬的鱘魚塘，配合工匠職業（所有工匠商品+40%，包括陳年魚卵）獲得巨大乘數。當魚要求特定物品時，魚塘種群增長——滿足它們的需求以將容量從 1 增加到 3 到 5 到 10。每個裝滿 10 條鱘魚的魚塘每天產生 10 個魚卵，在 40 天的熟成週期中變成 10 個魚子醬（5,000g）。成熟的鱘魚塘網格是遊戲後期最高的被動收入來源之一。',
    guide_ja:
      '魚の池（1,000g＋石200＋海藻5＋緑藻5、ロビンが建設）は1種類の魚を収容して毎日アイテムを産出。最も稼げる魚種：チョウザメ（山の湖・夏/冬）→魚卵→熟成魚卵=キャビア（保存ジャー1個500g、40日熟成）——池単品の最高産出。溶岩ウナギ（鉱山100階）→魚卵→熟成魚卵（生魚卵より大幅に高価値）。ブロブフィッシュ（高幸運時の深海釣り）→利益大だが初期放流が難しい。スーパーキュウリフィッシュ（海・夏/秋の夜）→安定的に利益。最大化戦略：チョウザメ池5つ以上でキャビア生産＋職人職業（全工芸品+40%）で大きな倍率。魚が特定のアイテムを要求したら応えることで収容数が1→3→5→10と増える。10匹のチョウザメ池は1日10個の魚卵→40日で10個のキャビア（5,000g）。成熟したチョウザメ池ファームはエンドゲーム最大のパッシブ収入源のひとつ。',
    guide_ko:
      '물고기 연못(1,000g + 돌 200개 + 해초 5개 + 녹조류 5개, 로빈이 건설)은 한 종류의 물고기를 수용해 매일 아이템을 생산. 가장 수익성 높은 어종: 철갑상어(산 호수, 여름/겨울) → 어란 → 숙성 어란 = 캐비아(보존 병 한 개 500g, 40일 숙성) — 연못 단품 최고 산출량. 용암 장어(광산 100층) → 어란 → 숙성 어란(생 어란보다 훨씬 고가). 물방울 물고기(운 9+ 심해 낚시) → 어란 → 수익 높지만 초기 방류가 어려움. 슈퍼 오이 물고기(바다, 여름/가을 밤) → 꾸준한 수익. 최대화 전략: 철갑상어 연못 5개 이상 + 장인 직업(모든 공예품 +40%) 조합으로 대규모 수익. 물고기가 특정 아이템을 요청하면 들어줘서 수용량 1→3→5→10으로 늘려요. 철갑상어 10마리 연못은 하루 어란 10개 → 40일 만에 캐비아 10개(5,000g). 성숙한 철갑상어 연못 그리드는 엔드게임 최고의 수동 수입원 중 하나예요.',
    guide_de:
      'Fischteiche (1.000g + 200 Stein + 5 Seetang + 5 Grünalgen, von Robin gebaut) halten je eine Fischart, die täglich Items produziert. Profitabelste Arten: Stör (Bergsee, Sommer/Winter) → Rogen → Gereifter Rogen = Kaviar (500g je Einmachglas, 40 Tage reifen) — höchste Einzelitem-Ausbeute aus einem Teich. Lavaaal (Bergwerk Ebene 100) → Rogen → Gereifter Rogen (deutlich wertvoller als frischer Rogen). Kleckserfisch (Tiefseefischen bei hohem Glück) → profitabel, aber schwerer zu starten. Super-Gurkenfisch (Ozean, Sommer/Herbst nachts) → konstant profitabel. Maximierungsstrategie: 5+ Störteiche für Kaviarproduktion + Handwerker-Beruf (+40% auf alle Handwerkerprodukte inkl. gereifter Rogen). Wenn Fische Spezialitems verlangen, erfülle ihre Wünsche, um die Kapazität von 1 auf 3 auf 5 auf 10 zu erhöhen. Ein Störteich mit 10 Fischen: 10 Rogen/Tag = 10 Kaviar pro 40-Tage-Zyklus (5.000g). Ein ausgereiftes Störteich-Grid ist eine der profitabelsten Passiveinnahmen im Endgame.',
    tip_en: "Stock Sturgeon first — they are catchable in summer AND winter from the mountain lake, making them the most accessible high-value pond species. Build your first Preserves Jar as soon as you get caviar; aged caviar (500g each) is worth significantly more than fresh caviar (200g).",
    tip_zh: '首先放养鲟鱼——它们在夏天和冬天都可以在山中湖钓到，使它们成为最容易获得的高价值鱼塘鱼种。一旦获得鱼子酱就立刻建造你的第一个保鲜罐；陈年鱼子酱（每个 500g）比新鲜鱼子酱（200g）价值高得多。',
    tip_zhTW: '首先放養鱘魚——它們在夏天和冬天都可以在山中湖釣到，使它們成為最容易獲得的高價值魚塘魚種。一旦獲得魚子醬就立刻建造你的第一個保鮮罐；陳年魚子醬（每個 500g）比新鮮魚子醬（200g）價值高得多。',
    tip_ja: 'まずチョウザメを放流しよう——山の湖で夏と冬の両方に釣れるから最もアクセスしやすい高価値魚種。キャビアが取れたらすぐに保存ジャーを作ること：熟成キャビア（1個500g）は新鮮キャビア（200g）より大幅に価値が高い。',
    tip_ko: '먼저 철갑상어를 방류하세요——여름과 겨울 모두 산 호수에서 잡을 수 있어 접근이 가장 쉬운 고가치 어종이에요. 캐비아가 생기는 즉시 첫 번째 보존 병을 만드세요; 숙성 캐비아(개당 500g)는 신선 캐비아(200g)보다 훨씬 가치가 높아요.',
    tip_de: 'Stör zuerst einsetzen — im Bergsee im Sommer UND Winter fangbar, damit ist er die zugänglichste hochwertige Teichwahl. Sobald du Kaviar hast, sofort das erste Einmachglas bauen: Gereifter Kaviar (500g je Stück) ist deutlich mehr wert als frischer Kaviar (200g).',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { legendary: 0, crabpot: 0, completionist: 0, pond: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function StardewFishingQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/stardew-fishing-quiz`
    const shareText = getLoc(
      `我的星露谷钓鱼风格：「${result.title_zh}」！${result.tag_zh}。测测你的：${url}`,
      `My Stardew fishing style is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `我的星露谷釣魚風格：「${result.title_zhTW}」！${result.tag_zhTW}。測測你的：${url}`,
      `スターデューバレーの釣りスタイル診断：「${result.title_ja}」！${result.tag_ja}。あなたも試して：${url}`,
      `내 스타듀 밸리 낚시 스타일：「${result.title_ko}」！${result.tag_ko}。테스트해 보세요：${url}`,
      `Mein Stardew-Angel-Stil: „${result.title_de}" — ${result.tag_de}. Finde deinen: ${url}`,
    )

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{getLoc(result.tag_zh, result.tag_en, result.tag_zhTW, result.tag_ja, result.tag_ko, result.tag_de)}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}
          </h2>
        </div>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="mb-1 text-xs font-semibold text-[#f0a832]">
            {getLoc('专属攻略指南', 'Your Fishing Strategy Guide', '專屬攻略指南', '攻略ガイド', '전략 가이드', 'Dein Angel-Strategieführer')}
          </p>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(result.guide_zh, result.guide_en, result.guide_zhTW, result.guide_ja, result.guide_ko, result.guide_de)}
          </p>
        </div>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {getLoc('老手小贴士：', 'Pro tip: ', '老手小貼士：', 'プロのコツ：', '고수 팁: ', 'Profi-Tipp: ')}
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
            '你的星露谷钓鱼风格是哪种？',
            'What Is Your Stardew Valley Fishing Style?',
            '你的星露谷釣魚風格是哪種？',
            'あなたのスターデューバレー釣りスタイルは？',
            '나의 스타듀 밸리 낚시 스타일은?',
            'Was ist dein Stardew-Valley-Angelstil?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，测出你是传奇鱼猎手、蟹笼被动派、任务单完成者，还是鱼塘专家——并获取专属攻略指南',
            '6 questions to find your fishing playstyle — Legendary Hunter, Passive Crabpotter, Bundle Completionist, or Fish Pond Expert — with a full strategy guide',
            '6 個問題，測出你是傳奇魚獵手、蟹籠被動派、任務單完成者，還是魚塘專家——並獲取專屬攻略指南',
            '6問で釣りスタイル診断——伝説の魚ハンター、かに罠パッシブ勢、バンドル完走者、魚の池エキスパートのどれ？攻略ガイド付き',
            '6가지 질문으로 알아보는 낚시 스타일——전설의 물고기 헌터, 통발 플레이어, 번들 완성가, 연못 전문가 중 나는 어느 쪽? 전략 가이드 포함',
            '6 Fragen für deinen Angelstil — Legendenjäger, Passiver Krabbenkorb-Spieler, Bundle-Perfektionist oder Fischteich-Experte — mit vollständigem Strategieführer',
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
          '测出我的钓鱼风格',
          'Find My Fishing Style',
          '測出我的釣魚風格',
          '釣りスタイルを診断する',
          '내 낚시 스타일 알아보기',
          'Meinen Angelstil finden',
        )}
      </button>
    </div>
  )
}
