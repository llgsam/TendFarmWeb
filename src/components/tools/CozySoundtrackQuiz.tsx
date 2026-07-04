'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'celeste' | 'gris' | 'chicory' | 'night-in-the-woods'

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
    q_en: 'What does music in a game need to do for you?',
    q_zh: '游戏里的音乐需要为你做什么？',
    q_zhTW: '遊戲裡的音樂需要為你做什麼？',
    q_ja: 'ゲームの中で音楽に何をしてほしい？',
    q_ko: '게임에서 음악이 어떤 역할을 해줬으면 해요?',
    q_de: 'Was soll Musik in einem Spiel für dich leisten?',
    options: [
      {
        en: 'Push me forward — match the urgency of what I am doing and make every moment feel earned',
        zh: '推动我前进——与我正在做的事情的紧迫感匹配，让每一刻都感觉值得',
        zhTW: '推動我前進——與我正在做的事情的緊迫感相符，讓每一刻都感覺值得',
        ja: '前へ進ませてくれる——今やっていることの緊張感にぴったり合って、毎瞬間に意味を感じさせてくれる',
        ko: '나를 앞으로 밀어줬으면 해요——지금 하는 일의 긴박감에 딱 맞게 맞춰줘서 모든 순간을 의미있게',
        de: 'Mich antreiben — zum Tempo meiner Handlungen passen und jedem Moment das Gefühl geben, dass er es wert war',
        type: 'celeste',
      },
      {
        en: 'Carry me somewhere I cannot name — wordless, without landmarks, pure emotional transport',
        zh: '把我带到一个我说不清名字的地方——无言的、没有标志、纯粹的情感运输',
        zhTW: '把我帶到一個我說不清名字的地方——無言的、沒有標誌、純粹的情感運輸',
        ja: '名前のない場所へ連れて行ってくれる——言葉なく、標識もなく、ただ感情だけを運んでくれる',
        ko: '이름 붙일 수 없는 곳으로 데려가줬으면 해요——말도 표지판도 없이, 순수하게 감정만 실어서',
        de: 'Mich an einen Ort tragen, den ich nicht benennen kann — wortlos, ohne Wegweiser, reiner emotionaler Transport',
        type: 'gris',
      },
      {
        en: 'Be cheerful and warm in the background — something I barely notice until I realize it has lifted my mood entirely',
        zh: '在背景中欢快而温暖——几乎不注意，直到意识到它完全提升了我的心情',
        zhTW: '在背景中歡快而溫暖——幾乎不注意，直到意識到它完全提升了我的心情',
        ja: '自然と気分を上げてくれる——気づかないうちに気持ちが明るくなっているような、穏やかな存在感',
        ko: '배경에서 따뜻하고 유쾌하게 있어줬으면 해요——거의 못 알아채다가 어느새 기분이 밝아진 걸 깨닫는',
        de: 'Fröhlich und warm im Hintergrund sein — kaum wahrnehmbar, bis ich merke, dass sie meine Stimmung komplett angehoben hat',
        type: 'chicory',
      },
      {
        en: 'Sound like a real place — local, specific, a little scrappy and imperfect like the town it is scoring',
        zh: '听起来像一个真实的地方——本土的、具体的、有点粗糙和不完美，就像它描绘的小镇',
        zhTW: '聽起來像一個真實的地方——本土的、具體的、有點粗糙和不完美，就像它描繪的小鎮',
        ja: '本物の場所みたいに聞こえる——地元の音、少し荒削りで不完全な、そのまちを描いたような音楽',
        ko: '진짜 장소처럼 들렸으면 해요——로컬하고 구체적이고, 배경이 되는 마을처럼 약간 날것인 음악',
        de: 'Wie ein echter Ort klingen — lokal, konkret, ein bisschen rau und unfertig, genau wie die Stadt, die sie beschreibt',
        type: 'night-in-the-woods',
      },
    ],
  },
  {
    q_en: 'Which of these sounds most appeals to you?',
    q_zh: '以下哪种声音最吸引你？',
    q_zhTW: '以下哪種聲音最吸引你？',
    q_ja: '次のうち、どのサウンドが一番惹かれる？',
    q_ko: '다음 중 어떤 사운드가 가장 끌려요?',
    q_de: 'Welcher dieser Klänge spricht dich am meisten an?',
    options: [
      {
        en: 'Electronic synth that builds and releases tension — like the sound of trying and trying again, and finally succeeding',
        zh: '构建和释放张力的电子合成器——就像一遍又一遍尝试、终于成功的声音',
        zhTW: '構建和釋放張力的電子合成器——就像一遍又一遍嘗試、終於成功的聲音',
        ja: '緊張が高まって解き放たれる電子シンセ——挑戦を何度も繰り返し、ついに成功した瞬間の音',
        ko: '긴장이 고조되다 한순간에 풀리는 전자 신스——도전하고 또 도전하다 마침내 성공하는 소리',
        de: 'Elektronische Synthesizer, die Spannung aufbauen und lösen — wie das Gefühl, es immer wieder zu versuchen und endlich zu schaffen',
        type: 'celeste',
      },
      {
        en: 'Orchestral with vocal layers — the feeling of grief transforming slowly into something beautiful and larger than you',
        zh: '带有声乐层次的管弦乐——悲伤缓慢转变为美丽而宏大的东西的感觉',
        zhTW: '帶有聲樂層次的管弦樂——悲傷緩慢轉變為美麗而宏大的東西的感覺',
        ja: 'ボーカルが重なるオーケストラ——悲しみがゆっくりと、より大きく美しい何かへと変わっていく感覚',
        ko: '보컬이 겹겹이 쌓이는 오케스트라——슬픔이 천천히 아름답고 거대한 무언가로 변해가는 느낌',
        de: 'Orchestrales mit Gesangsschichten — das Gefühl, wie Trauer sich langsam in etwas Schönes und Größeres als man selbst verwandelt',
        type: 'gris',
      },
      {
        en: 'Light, curious, playful — like opening a door and finding the world brighter than you expected',
        zh: '轻盈、好奇、俏皮——就像打开一扇门，发现世界比你预期的更明亮',
        zhTW: '輕盈、好奇、俏皮——就像打開一扇門，發現世界比你預期的更明亮',
        ja: '軽やかで好奇心いっぱいのポップな音——ドアを開けたら思ったより明るい世界が広がっていたような',
        ko: '가볍고 호기심 넘치는 유쾌한 음악——문을 열었더니 예상보다 훨씬 밝은 세상이 펼쳐진 느낌',
        de: 'Leicht, neugierig, verspielt — wie eine Tür öffnen und eine hellere Welt entdecken, als erwartet',
        type: 'chicory',
      },
      {
        en: 'Guitar-driven indie with emotional weight — lo-fi enough to feel authentic, melodic enough to stay with you',
        zh: '有情感分量的吉他驱动独立音乐——足够 lo-fi 以感觉真实，足够旋律性以留在你心里',
        zhTW: '有情感分量的吉他驅動獨立音樂——足夠 lo-fi 以感覺真實，足夠旋律性以留在你心裡',
        ja: '感情の重みのあるギター系インディー——ローファイで本物っぽく、メロディが頭から離れない',
        ko: '감정의 무게가 실린 기타 기반 인디——충분히 로파이라서 진짜 같고, 멜로디가 귓가에 맴도는',
        de: 'Gitarren-geprägter Indie mit emotionalem Gewicht — lo-fi genug um authentisch zu wirken, melodisch genug um im Kopf zu bleiben',
        type: 'night-in-the-woods',
      },
    ],
  },
  {
    q_en: 'When a piece of music hits you in a game, what does it feel like?',
    q_zh: '当游戏里的一段音乐触动你时，是什么感觉？',
    q_zhTW: '當遊戲裡的一段音樂觸動你時，是什麼感覺？',
    q_ja: 'ゲームの音楽に心を動かされたとき、どんな感覚？',
    q_ko: '게임 음악에 마음이 움직였을 때, 어떤 느낌이에요?',
    q_de: 'Wenn ein Musikstück dich im Spiel trifft, wie fühlt sich das an?',
    options: [
      {
        en: 'I feel the exact emotion the character is feeling — like the music is playing me, not the other way around',
        zh: '我感受到角色正在感受的确切情感——就像音乐在演奏我，而不是反过来',
        zhTW: '我感受到角色正在感受的確切情感——就像音樂在演奏我，而不是反過來',
        ja: 'キャラクターが感じているまさにその感情がわかる——音楽が私を演奏しているみたい',
        ko: '캐릭터가 느끼는 감정이 그대로 느껴져요——음악이 나를 연주하는 것 같달까요',
        de: 'Ich spüre genau die Emotion, die der Charakter gerade fühlt — als würde die Musik mich spielen, nicht umgekehrt',
        type: 'celeste',
      },
      {
        en: 'I stop moving and just stay still for a moment — the music feels bigger than the screen and I need to let it in',
        zh: '我停止移动，静静待了一会儿——音乐感觉比屏幕更大，我需要让它进来',
        zhTW: '我停止移動，靜靜待了一會兒——音樂感覺比螢幕更大，我需要讓它進來',
        ja: '動くのをやめてしばらくじっとしてしまう——音楽が画面より大きくて、ちゃんと受け取りたい',
        ko: '잠깐 멈추고 가만히 있게 돼요——음악이 화면보다 더 커서, 제대로 받아들이고 싶어서',
        de: 'Ich halte inne und bleibe kurz still — die Musik fühlt sich größer an als der Bildschirm und ich muss sie reinlassen',
        type: 'gris',
      },
      {
        en: 'I notice I am smiling without realizing when I started — the music crept in without asking',
        zh: '我注意到自己在笑，却不知道是什么时候开始的——音乐不知不觉地进入了',
        zhTW: '我注意到自己在笑，卻不知道是什麼時候開始的——音樂不知不覺地進入了',
        ja: 'いつのまにか笑っていることに気づく——音楽がこっそりしのび込んできていた',
        ko: '어느새 웃고 있는 걸 알아채요——음악이 슬쩍 파고들어와 있었던 거죠',
        de: 'Ich merke, dass ich lächle, ohne zu wissen wann es begann — die Musik hat sich unbemerkt eingeschlichen',
        type: 'chicory',
      },
      {
        en: 'A specific lyric or melody repeats in my head for days — it has lodged itself and I do not want to remove it',
        zh: '一个特定的歌词或旋律在我脑海中重复了好几天——它扎根了，我不想移除它',
        zhTW: '一個特定的歌詞或旋律在我腦海中重複了好幾天——它紮根了，我不想移除它',
        ja: '特定のメロディや歌詞が何日も頭から離れない——もう居ついてしまって、消したくない',
        ko: '특정 멜로디나 가사가 며칠 동안 머릿속을 맴돌아요——자리잡아버려서 지우고 싶지 않아요',
        de: 'Ein bestimmter Text oder eine Melodie wiederholt sich tagelang in meinem Kopf — er hat sich festgesetzt und ich will ihn nicht loswerden',
        type: 'night-in-the-woods',
      },
    ],
  },
  {
    q_en: 'What kind of emotional experience do you want a game to give you?',
    q_zh: '你希望一款游戏给你带来什么样的情感体验？',
    q_zhTW: '你希望一款遊戲給你帶來什麼樣的情感體驗？',
    q_ja: 'ゲームにどんな感情体験を求める？',
    q_ko: '게임에서 어떤 감정 경험을 원해요?',
    q_de: 'Welche emotionale Erfahrung soll ein Spiel dir geben?',
    options: [
      {
        en: 'The specific feeling of getting better at something hard — of trying with patience and having that patience quietly rewarded',
        zh: '在困难的事情上变得更好的特定感觉——耐心尝试，并且那份耐心被悄悄奖励',
        zhTW: '在困難的事情上變得更好的特定感覺——耐心嘗試，並且那份耐心被悄悄獎勵',
        ja: '難しいことが少しずつ上達していく感覚——根気よく試して、その粘り強さがそっと報われる',
        ko: '어려운 걸 조금씩 잘하게 되는 느낌——참을성 있게 도전해서 그 노력이 조용히 보상받는',
        de: 'Das spezifische Gefühl, in etwas Schwerem besser zu werden — geduldig zu versuchen und dafür leise belohnt zu werden',
        type: 'celeste',
      },
      {
        en: 'Catharsis without words — processing something wordless and large through an experience that does not explain itself',
        zh: '无言的宣泄——通过一个不解释自己的体验，处理某种无法言说却巨大的东西',
        zhTW: '無言的宣洩——通過一個不解釋自己的體驗，處理某種無法言說卻巨大的東西',
        ja: '言葉のないカタルシス——説明なしの体験を通して、言語化できない大きな何かを処理する',
        ko: '말 없는 카타르시스——설명 없는 경험을 통해 말로는 표현 못 할 크고 막연한 것을 풀어내는',
        de: 'Katharsis ohne Worte — etwas Wortloses und Großes durch eine Erfahrung zu verarbeiten, die sich selbst nicht erklärt',
        type: 'gris',
      },
      {
        en: 'Pure gentle delight — the kind of happy that does not need anything to be wrong first in order to feel good',
        zh: '纯粹温和的愉悦——不需要先有什么不对劲才能感觉良好的那种快乐',
        zhTW: '純粹溫和的愉悅——不需要先有什麼不對勁才能感覺良好的那種快樂',
        ja: '純粋で穏やかな喜び——何かが上手くいかないことを前提にしなくても感じられるハッピーさ',
        ko: '순수한 따뜻한 기쁨——뭔가 잘못되어야만 좋아질 수 있는 게 아닌, 그냥 좋은 그런 행복',
        de: 'Reine sanfte Freude — das Glück, das keine Panne voraussetzt, um sich gut anzufühlen',
        type: 'chicory',
      },
      {
        en: 'Recognition — feeling seen in the particular way a game understands something about being alive that most games miss',
        zh: '被认可——以游戏理解生命某些方面的特殊方式感到被看见，这是大多数游戏错过的',
        zhTW: '被認可——以遊戲理解生命某些方面的特殊方式感到被看見，這是大多數遊戲錯過的',
        ja: '共感——自分のことをわかってくれるゲームに、ほとんどのゲームが見落とす角度で見てもらえる感覚',
        ko: '공감——대부분의 게임이 놓치는 방식으로, 살아있다는 것에 대해 이해해주는 게임에서 보여지는 느낌',
        de: 'Anerkennung — gesehen zu werden auf die besondere Art, wie ein Spiel etwas über das Leben versteht, das die meisten Spiele übersehen',
        type: 'night-in-the-woods',
      },
    ],
  },
  {
    q_en: 'How long do you want this game to be?',
    q_zh: '你希望这款游戏有多长？',
    q_zhTW: '你希望這款遊戲有多長？',
    q_ja: 'このゲームにどのくらいのボリュームを求める？',
    q_ko: '이 게임이 얼마나 길었으면 해요?',
    q_de: 'Wie lang soll dieses Spiel sein?',
    options: [
      {
        en: '10-25 hours — long enough for real depth, short enough to finish',
        zh: '10-25 小时——足够长以产生真正的深度，又足够短可以完成',
        zhTW: '10-25 小時——足夠長以產生真正的深度，又足夠短可以完成',
        ja: '10〜25時間——本当の深みが生まれるのに十分で、クリアできる長さ',
        ko: '10~25시간——진짜 깊이가 생길 만큼 길고, 끝낼 수 있을 만큼 짧게',
        de: '10–25 Stunden — lang genug für echte Tiefe, kurz genug um es zu beenden',
        type: 'celeste',
      },
      {
        en: 'Short — under 3 hours is fine, I want an experience not a game',
        zh: '短——3 小时以内就行，我想要一个体验而不是一款游戏',
        zhTW: '短——3 小時以內就行，我想要一個體驗而不是一款遊戲',
        ja: '短め——3時間以内でいい、ゲームじゃなく「体験」がしたい',
        ko: '짧게——3시간 이내도 괜찮아요, 게임이 아니라 경험을 원해요',
        de: 'Kurz — unter 3 Stunden ist okay, ich möchte ein Erlebnis, kein Spiel',
        type: 'gris',
      },
      {
        en: '10-15 hours — I want a full story arc and characters I meet and remember',
        zh: '10-15 小时——我想要完整的故事弧和我会遇见并记住的角色',
        zhTW: '10-15 小時——我想要完整的故事弧和我會遇見並記住的角色',
        ja: '10〜15時間——ちゃんとしたストーリーと、出会って忘れられないキャラクターがほしい',
        ko: '10~15시간——완전한 스토리 흐름과 만나서 기억에 남는 캐릭터들이 있었으면',
        de: '10–15 Stunden — ich möchte einen vollständigen Storybogen und Charaktere, die ich treffe und erinnere',
        type: 'chicory',
      },
      {
        en: '6-10 hours — tight and focused, every moment earned, nothing padded',
        zh: '6-10 小时——紧凑专注，每一刻都值得，没有填充',
        zhTW: '6-10 小時——緊湊專注，每一刻都值得，沒有填充',
        ja: '6〜10時間——コンパクトで無駄なく、すべてのシーンに意味がある',
        ko: '6~10시간——군더더기 없이 탄탄하게, 모든 순간이 의미있게',
        de: '6–10 Stunden — kompakt und fokussiert, jeder Moment zählt, kein Füllmaterial',
        type: 'night-in-the-woods',
      },
    ],
  },
  {
    q_en: 'Which sentence could have been written about you?',
    q_zh: '以下哪句话可能是在描述你？',
    q_zhTW: '以下哪句話可能是在描述你？',
    q_ja: '次の中で、自分に当てはまりそうな文章は？',
    q_ko: '다음 중 자신을 표현한 것 같은 문장은?',
    q_de: 'Welcher Satz könnte über dich geschrieben worden sein?',
    options: [
      {
        en: '"Struggled with anxiety but found that working through it slowly — failing and trying again — was its own kind of medicine."',
        zh: '"曾与焦虑抗争，但发现慢慢处理它——失败再尝试——本身就是一种药。"',
        zhTW: '「曾與焦慮抗爭，但發現慢慢處理它——失敗再嘗試——本身就是一種藥。」',
        ja: '「不安と戦ってきたけど、ゆっくり向き合うこと——失敗して、また挑戦すること——が一番の薬だと気づいた。」',
        ko: '"불안과 싸워왔지만, 천천히 마주하는 것——실패하고 또 시도하는 것——이 그 자체로 약이라는 걸 알았어요."',
        de: '"Hatte mit Angst zu kämpfen, aber entdeckte, dass langsam damit umzugehen — scheitern und es wieder versuchen — seine eigene Art von Medizin war."',
        type: 'celeste',
      },
      {
        en: '"Needed to sit with sadness for a while before it became something I could understand and then, eventually, carry."',
        zh: '"需要和悲伤坐在一起一段时间，然后它才变成我能理解的东西，最终，能够承载的东西。"',
        zhTW: '「需要和悲傷坐在一起一段時間，然後它才變成我能理解的東西，最終，能夠承載的東西。」',
        ja: '「悲しみとしばらく一緒にいる必要があった。そうやって初めて、それが理解できて、やがて抱えて歩けるものになった。」',
        ko: '"슬픔과 한동안 함께 앉아있어야 했어요. 그래야 비로소 이해할 수 있는 것, 그리고 결국 안고 갈 수 있는 것이 되더라고요."',
        de: '"Musste eine Weile mit Trauer sitzen, bevor sie zu etwas wurde, das ich verstehen und schließlich tragen konnte."',
        type: 'gris',
      },
      {
        en: '"Found that creativity — coloring outside the lines, literally — taught me more about who I am than most things."',
        zh: '"发现创造力——字面意义上的在线条外涂色——比大多数事情都更多地教会了我自己是谁。"',
        zhTW: '「發現創造力——字面意義上的在線條外塗色——比大多數事情都更多地教會了我自己是誰。」',
        ja: '「創造すること——文字通り枠の外を塗ること——から、自分について一番多くを学んだ。」',
        ko: '"창의성에서——말 그대로 선 밖에 색칠하는 것에서——다른 어떤 것보다 나 자신에 대해 많이 배웠어요."',
        de: '"Entdeckte, dass Kreativität — buchstäblich über die Linien zu malen — mich mehr über mich selbst gelehrt hat als das meiste andere."',
        type: 'chicory',
      },
      {
        en: '"Came back to a small town I thought I had outgrown and discovered it was more complicated than I had given it credit for."',
        zh: '"回到了一个我以为已经长大离开的小镇，发现它比我给予的评价更复杂。"',
        zhTW: '「回到了一個我以為已經長大離開的小鎮，發現它比我給予的評價更複雜。」',
        ja: '「もう卒業したと思っていた小さな地元に戻ったら、思っていたよりずっと複雑な場所だとわかった。」',
        ko: '"이미 다 자란 줄 알았던 작은 고향에 돌아왔더니, 생각보다 훨씬 복잡한 곳이더라고요."',
        de: '"Kam in eine Kleinstadt zurück, von der ich dachte, ich wäre über sie hinausgewachsen, und entdeckte, dass sie komplizierter war als ich ihr zugestanden hatte."',
        type: 'night-in-the-woods',
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
  celeste: {
    title_en: 'Celeste',
    title_zh: 'Celeste',
    title_zhTW: 'Celeste',
    title_ja: 'セレステ (Celeste)',
    title_ko: 'Celeste (셀레스트)',
    title_de: 'Celeste',
    emoji: '🏔️',
    tag_en: 'A precise platformer about climbing a mountain and anxiety — with a Grammy-nominated electronic soundtrack by Lena Raine',
    tag_zh: '一款关于攀登山峰与焦虑的精准平台游戏——附带 Lena Raine 获格莱美提名的电子配乐',
    tag_zhTW: '一款關於攀登山峰與焦慮的精準平台遊戲——附帶 Lena Raine 獲葛萊美提名的電子配樂',
    tag_ja: '山を登り、不安と向き合うアクションゲーム——Lena Raineによるグラミー賞ノミネートの電子音楽サウンドトラック収録',
    tag_ko: '산을 오르고 불안과 마주하는 정밀 플랫포머——Lena Raine의 그래미 후보에 오른 전자 음악 사운드트랙',
    tag_de: 'Ein präziser Plattformer übers Klettern und Angst — mit dem Grammy-nominierten elektronischen Soundtrack von Lena Raine',
    platform_en: 'Available on: PC (Steam, Epic), Nintendo Switch, PlayStation 4, Xbox — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、Epic）、Nintendo Switch、PlayStation 4、Xbox——约 20 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam、Epic）、Nintendo Switch、PlayStation 4、Xbox——約 20 美元',
    platform_ja: '対応プラットフォーム：PC（Steam・Epic）、Nintendo Switch、PlayStation 4、Xbox——約20ドル',
    platform_ko: '플레이 가능 플랫폼：PC（Steam, Epic）, Nintendo Switch, PlayStation 4, Xbox——약 $20',
    platform_de: 'Verfügbar auf: PC (Steam, Epic), Nintendo Switch, PlayStation 4, Xbox — ca. 20 €',
    why_en:
      "Celeste (2018) is one of the most acclaimed indie games ever made — and its soundtrack, composed by Lena Raine, is inseparable from that acclaim. Raine scored every chapter with a distinct musical identity that evolves as the protagonist Madeline climbs: the opening chapters feel tentative and exploratory, the middle chapters build tension and fragmentation, and the final ascent resolves into something euphoric and earned. The game's central theme — Madeline is climbing Celeste Mountain partly as a way of confronting her anxiety — is communicated almost entirely through the music and the game feel rather than through heavy-handed dialogue. It is a hard game (you will die many times) but it is designed around the specific pleasure of getting better slowly, and the music celebrates each small victory. The game won multiple awards including the DICE Award for Outstanding Achievement in Game Direction. Soundtrack won a Grammy nomination in 2021 — the first electronic video game score to be nominated. At $20 on all major platforms including Xbox Game Pass, it is essential.",
    why_zh:
      'Celeste（2018 年）是有史以来最受好评的独立游戏之一——它的配乐由 Lena Raine 创作，与这种好评密不可分。Raine 为每个章节配上了独特的音乐身份，随着主角 Madeline 攀登而演变：开场章节感觉犹豫而探索性，中间章节构建张力和碎片化，最后的攀登解析成某种令人欣喜且值得的东西。游戏的核心主题——Madeline 部分是为了面对她的焦虑而攀登 Celeste 山——几乎完全通过音乐和游戏感觉而非说教性对话来传达。这是一款难游戏（你会死很多次），但它围绕慢慢变好的特定乐趣设计，音乐庆祝每一个小小的胜利。游戏赢得了包括 DICE 游戏方向杰出成就奖在内的多个奖项。原声带在 2021 年获得格莱美提名——第一个获提名的电子视频游戏配乐。20 美元，在包括 Xbox Game Pass 在内的所有主要平台上，这是必玩之作。',
    why_zhTW:
      'Celeste（2018 年）是有史以來最受好評的獨立遊戲之一——它的配樂由 Lena Raine 創作，與這種好評密不可分。Raine 為每個章節配上了獨特的音樂身份，隨著主角 Madeline 攀登而演變：開場章節感覺猶豫而探索性，中間章節構建張力和碎片化，最後的攀登解析成某種令人欣喜且值得的東西。遊戲的核心主題——Madeline 部分是為了面對她的焦慮而攀登 Celeste 山——幾乎完全通過音樂和遊戲感覺而非說教性對話來傳達。這是一款難遊戲（你會死很多次），但它圍繞慢慢變好的特定樂趣設計，音樂慶祝每一個小小的勝利。遊戲贏得了包括 DICE 遊戲方向傑出成就獎在內的多個獎項。原聲帶在 2021 年獲得葛萊美提名——第一個獲提名的電子電玩遊戲配樂。20 美元，在包括 Xbox Game Pass 在內的所有主要平台上，這是必玩之作。',
    why_ja:
      'Celeste（2018年）は、過去最高傑作クラスのインディーゲームのひとつです。作曲家Lena Raineが手がけたサウンドトラックは、ゲームの評価と切り離せない存在。各チャプターに異なる音楽的個性があり、主人公マデリンが山を登るにつれて音楽も変化していきます。序盤は探索的で慎重な音、中盤は緊張と断片化が積み重なり、最終盤は達成感と昇華へ。ゲームの核心テーマ——マデリンは不安と向き合うためにセレステ山を登る——は、くどいセリフではなく音楽とゲームの感触で語られます。難しいゲームですが（何度も失敗します）、「少しずつ上手くなる喜び」を軸に設計されており、音楽は小さな勝利のひとつひとつを祝ってくれます。2021年にはグラミー賞ノミネートを獲得（電子系ゲーム音楽初）。Xbox Game Pass対応を含む全主要プラットフォームで約20ドル。',
    why_ko:
      'Celeste（2018）는 역대 가장 높이 평가받는 인디 게임 중 하나입니다. Lena Raine이 작곡한 사운드트랙은 그 평가와 떼려야 뗄 수 없습니다. 각 챕터마다 고유한 음악적 색깔이 있고, 주인공 마들린이 산을 오를수록 음악도 함께 진화합니다. 초반 챕터는 탐색하듯 조심스럽고, 중반에는 긴장감이 쌓이며, 마지막 등반은 환희와 성취감으로 마무리됩니다. 게임의 핵심 주제——마들린이 불안과 마주하기 위해 셀레스트 산을 오른다는 것——는 설교적인 대사 대신 음악과 게임 감각으로 전달됩니다. 어려운 게임이지만（수없이 죽게 됩니다）, 천천히 성장하는 특별한 즐거움을 중심으로 설계되었고, 음악은 작은 승리 하나하나를 축하해줍니다. 2021년 그래미 후보에 오른 전자 게임 음악 최초의 작품. Xbox Game Pass 포함 주요 플랫폼에서 약 $20.',
    why_de:
      'Celeste (2018) ist eines der meistgelobten Indie-Spiele aller Zeiten — und sein Soundtrack, komponiert von Lena Raine, ist untrennbar von diesem Lob. Raine versah jedes Kapitel mit einer eigenständigen musikalischen Identität, die sich mit dem Aufstieg der Protagonistin Madeline weiterentwickelt: Die Eröffnungskapitel klingen tastend und explorativ, die mittleren Kapitel bauen Spannung und Fragmentierung auf, und der finale Aufstieg löst sich in etwas Euphorisches und Verdientes auf. Das zentrale Thema des Spiels — Madeline besteigt den Celeste Mountain auch um ihrer Angst zu begegnen — wird fast ausschließlich durch die Musik und das Spielgefühl statt durch plumpe Dialoge vermittelt. Es ist ein schwieriges Spiel (du wirst oft scheitern), aber es ist auf das spezifische Vergnügen ausgelegt, langsam besser zu werden, und die Musik feiert jeden kleinen Sieg. 2021 Grammy-nominierter Soundtrack — der erste elektronische Videospiel-Soundtrack überhaupt. Für ca. 20 € auf allen großen Plattformen inklusive Xbox Game Pass.',
    tip_en: "If a section is giving you trouble, turn on Assist Mode (available from the pause menu at any time). It does not disable achievements or endings — the game explicitly wants you to use it. Celestial helpers in later chapters are optional collectibles; skip them on a first run if they frustrate you.",
    tip_zh: '如果某个部分让你遇到困难，打开辅助模式（随时可从暂停菜单获取）。它不会禁用成就或结局——游戏明确希望你使用它。后续章节中的天体助手是可选收集品；如果它们让你沮丧，第一次通关时跳过它们。',
    tip_zhTW: '如果某個部分讓你遇到困難，打開輔助模式（隨時可從暫停選單獲取）。它不會停用成就或結局——遊戲明確希望你使用它。後續章節中的天體助手是可選收集品；如果它們讓你沮喪，第一次通關時跳過它們。',
    tip_ja: '詰まったらすぐアシストモード（ポーズ画面からいつでも）を使ってください。実績やエンディングに影響しません——ゲーム側も使ってほしいと思っています。後半に登場する天体のかけらはコレクタブルで任意。初回プレイでストレスを感じたらスルーOKです。',
    tip_ko: '어려운 구간이 있으면 언제든 어시스트 모드를 활성화하세요（일시정지 메뉴에서 가능）. 도전과제나 엔딩에 영향을 주지 않습니다——게임이 명시적으로 사용을 권장합니다. 후반 챕터의 크리스탈 하트는 선택적 수집 요소이니, 처음 플레이할 때 스트레스받으면 건너뛰어도 됩니다.',
    tip_de: 'Wenn ein Abschnitt dir Probleme macht, aktiviere den Assistenzmodus (jederzeit über das Pausenmenü). Er deaktiviert weder Errungenschaften noch Enden — das Spiel will ausdrücklich, dass du ihn nutzt. Die Kristallherzen in späteren Kapiteln sind optionale Sammelgegenstände; überspring sie beim ersten Durchgang, wenn sie dich nerven.',
  },
  gris: {
    title_en: 'Gris',
    title_zh: 'Gris',
    title_zhTW: 'Gris',
    title_ja: 'グリス (Gris)',
    title_ko: 'Gris (그리스)',
    title_de: 'Gris',
    emoji: '🎨',
    tag_en: "A wordless watercolor journey through grief — no text, no dialogue, no fail states, only Berlinist's orchestral score and painted light",
    tag_zh: '一段无言的水彩悲伤之旅——没有文字、没有对话、没有失败状态，只有 Berlinist 的管弦乐配乐和水彩光影',
    tag_zhTW: '一段無言的水彩悲傷之旅——沒有文字、沒有對話、沒有失敗狀態，只有 Berlinist 的管弦樂配樂和水彩光影',
    tag_ja: '言葉のない水彩画の旅——テキストも対話も失敗もない、Berlinist のオーケストラと絵画的な光だけで語られる悲しみの物語',
    tag_ko: '말 없는 수채화 여정——텍스트도 대화도 실패도 없이, Berlinist의 오케스트라와 수채화 빛만으로 슬픔을 이야기하는',
    tag_de: "Eine wortlose Aquarell-Reise durch die Trauer — kein Text, kein Dialog, kein Scheitern, nur Berlinists Orchester und gemaltes Licht",
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, iOS, Android — about $17 (often on sale for ~$5-8)',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、iOS、Android——约 17 美元（常特价约 5-8 美元）',
    platform_zhTW: '可在以下平台獲取：PC（Steam、GOG）、Nintendo Switch、iOS、Android——約 17 美元（常特價約 5-8 美元）',
    platform_ja: '対応プラットフォーム：PC（Steam・GOG）、Nintendo Switch、iOS、Android——約1,700円（セール時約500〜800円）',
    platform_ko: '플레이 가능 플랫폼：PC（Steam, GOG）, Nintendo Switch, iOS, Android——약 $17（할인 시 $5-8）',
    platform_de: 'Verfügbar auf: PC (Steam, GOG), Nintendo Switch, iOS, Android — ca. 17 € (oft im Angebot für ~5–8 €)',
    why_en:
      "Gris (2018) is one of the most visually and aurally beautiful games ever made. It tells no story through words — no dialogue, no text, no UI — but communicates grief, loss, and recovery through watercolor animation by artist Conrad Roset, platformer movement, and the orchestral score by Spanish band Berlinist. The music begins sparse and broken and gradually expands as Gris recovers her ability to exist in the world: each chapter adds new layers of instrumentation. Several specific musical moments in Gris are cited by players as among the most emotionally powerful experiences they have had in a game — particularly the choral sections and the final ascending sequence. At 2-4 hours, it is short, but it is dense with beauty. There are no enemies, no ways to die, no fail states — you can only move through it. On Nintendo Switch and mobile, it is one of the best games available at any price. Multiple award nominations for art direction and music. Developed by Nomada Studio.",
    why_zh:
      'Gris（2018 年）是有史以来视觉和听觉上最美丽的游戏之一。它不通过文字讲述故事——没有对话、没有文字、没有 UI——而是通过艺术家 Conrad Roset 的水彩动画、平台游戏移动和西班牙乐队 Berlinist 的管弦乐配乐来传达悲伤、失去和恢复。音乐从稀疏和破碎开始，随着 Gris 恢复在世界中存在的能力而逐渐扩展：每个章节都添加了新的乐器层次。Gris 中几个特定的音乐时刻被玩家引用为他们在游戏中拥有的最具情感冲击力的体验之一——尤其是合唱部分和最后的上升序列。2-4 小时，虽短，但充满了美丽。没有敌人，没有死亡方式，没有失败状态——你只能穿越它。在 Nintendo Switch 和手机上，它是任何价格下最好的游戏之一。多次获得艺术指导和音乐提名奖项。由 Nomada Studio 开发。',
    why_zhTW:
      'Gris（2018 年）是有史以來視覺和聽覺上最美麗的遊戲之一。它不通過文字講述故事——沒有對話、沒有文字、沒有 UI——而是通過藝術家 Conrad Roset 的水彩動畫、平台遊戲移動和西班牙樂隊 Berlinist 的管弦樂配樂來傳達悲傷、失去和恢復。音樂從稀疏和破碎開始，隨著 Gris 恢復在世界中存在的能力而逐漸擴展：每個章節都添加了新的樂器層次。Gris 中幾個特定的音樂時刻被玩家引用為他們在遊戲中擁有的最具情感衝擊力的體驗之一——尤其是合唱部分和最後的上升序列。2-4 小時，雖短，但充滿了美麗。沒有敵人，沒有死亡方式，沒有失敗狀態——你只能穿越它。在 Nintendo Switch 和手機上，它是任何價格下最好的遊戲之一。多次獲得藝術指導和音樂提名獎項。由 Nomada Studio 開發。',
    why_ja:
      'Gris（2018年）は、視覚的にも聴覚的にも最美のゲームのひとつ。テキスト、セリフ、UIが一切なく、アーティストConrad Rosetの水彩アニメーション、プラットフォームの動き、そしてスペインのバンドBerlinistのオーケストラサウンドで悲しみ・喪失・回復を表現します。音楽はまず壊れた断片から始まり、Grisが世界に存在する力を取り戻すにつれて楽器が増えていきます。プレイヤーから「ゲーム史上最も感動的な体験」と語られるシーンが複数あり、特に合唱のパートとラストの上昇シーケンスは圧巻です。プレイ時間は2〜4時間と短いですが、密度の高い美しさが詰まっています。敵もなく、死もなく、失敗もない——ただその中を歩いていけばいい。',
    why_ko:
      'Gris（2018）는 시각적으로도 청각적으로도 가장 아름다운 게임 중 하나입니다. 텍스트도, 대화도, UI도 없이 아티스트 Conrad Roset의 수채화 애니메이션, 플랫포머 움직임, 그리고 스페인 밴드 Berlinist의 오케스트라로 슬픔, 상실, 회복을 전달합니다. 음악은 처음엔 희박하고 부서진 상태에서 시작해 Gris가 세상에서 존재하는 능력을 되찾을수록 악기가 층층이 쌓여갑니다. 게임 내 몇몇 음악 순간들은 플레이어들이 게임에서 경험한 가장 감동적인 순간으로 꼽힙니다——특히 합창 구간과 마지막 상승 시퀀스. 2~4시간의 짧은 분량이지만 아름다움이 빽빽합니다. 적도, 죽음도, 실패도 없습니다——그냥 통과하기만 하면 됩니다.',
    why_de:
      'Gris (2018) ist eines der visuell und klanglich schönsten Spiele aller Zeiten. Es erzählt keine Geschichte durch Worte — kein Dialog, kein Text, kein UI — sondern vermittelt Trauer, Verlust und Erholung durch die Aquarellanimation von Künstler Conrad Roset, Plattformer-Bewegung und den orchestralen Soundtrack der spanischen Band Berlinist. Die Musik beginnt spärlich und zerbrochen und entfaltet sich schrittweise, während Gris ihre Fähigkeit zurückgewinnt, in der Welt zu existieren: Jedes Kapitel fügt neue Instrumentierungsschichten hinzu. Bestimmte musikalische Momente in Gris werden von Spielern als einige der emotional mächtigsten Erfahrungen zitiert, die sie in einem Spiel hatten — besonders die Chorpartien und die abschließende Aufstiegssequenz. Mit 2–4 Stunden ist es kurz, aber dicht mit Schönheit. Keine Feinde, keine Möglichkeit zu sterben, keine Misserfolgszustände — man bewegt sich einfach hindurch.',
    tip_en: "Play with headphones and the volume turned up — Gris is one of the few games where audio quality hardware makes a measurable difference to the experience. The spatial positioning of sound is integral to the emotional design.",
    tip_zh: '戴着耳机、调高音量玩——Gris 是为数不多的几款音频质量硬件对体验产生可衡量差异的游戏之一。声音的空间定位对情感设计至关重要。',
    tip_zhTW: '戴著耳機、調高音量玩——Gris 是為數不多的幾款音訊品質硬體對體驗產生可衡量差異的遊戲之一。聲音的空間定位對情感設計至關重要。',
    tip_ja: 'ヘッドフォンで音量を上げてプレイすることを強くおすすめします。Grisは音響機器の質がプレイ体験に如実に現れる数少ないゲームのひとつ。音の空間定位が感情設計に組み込まれています。',
    tip_ko: '헤드폰으로 볼륨을 높여서 플레이하세요——Gris는 음향 기기의 퀄리티가 체험에 실질적인 차이를 만드는 몇 안 되는 게임 중 하나입니다. 소리의 공간감이 감정 설계와 일체화되어 있습니다.',
    tip_de: 'Spiel mit Kopfhörern und aufgedrehter Lautstärke — Gris ist eines der wenigen Spiele, bei dem die Qualität der Audiohardware einen messbaren Unterschied für das Erlebnis macht. Die räumliche Positionierung des Klangs ist integral für das emotionale Design.',
  },
  chicory: {
    title_en: 'Chicory: A Colorful Tale',
    title_zh: 'Chicory: A Colorful Tale',
    title_zhTW: 'Chicory: A Colorful Tale',
    title_ja: 'チコリー (Chicory: A Colorful Tale)',
    title_ko: 'Chicory: A Colorful Tale (치코리)',
    title_de: 'Chicory: A Colorful Tale',
    emoji: '🖌️',
    tag_en: 'A cozy adventure where you use a magical paintbrush to color the whole world — with a Lena Raine score full of warmth and discovery',
    tag_zh: '一款用魔法画笔为整个世界涂色的 cozy 冒险游戏——附带 Lena Raine 充满温暖和发现感的配乐',
    tag_zhTW: '一款用魔法畫筆為整個世界塗色的 Cozy 冒險遊戲——附帶 Lena Raine 充滿溫暖和發現感的配樂',
    tag_ja: '魔法の絵筆で世界全体に色を塗るコージーアドベンチャー——Lena Raineによる温かさと発見に満ちたサウンドトラック',
    tag_ko: '마법 붓으로 세상 전체에 색을 칠하는 코지 어드벤처——Lena Raine의 따뜻함과 발견으로 가득한 사운드트랙',
    tag_de: 'Ein gemütliches Abenteuer, in dem du mit einem magischen Pinsel die ganze Welt bemalung — mit Lena Raines warmem und entdeckungsfreudigem Soundtrack',
    platform_en: 'Available on: PC (Steam, Epic), Nintendo Switch, PlayStation 4/5 — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、Epic）、Nintendo Switch、PlayStation 4/5——约 20 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam、Epic）、Nintendo Switch、PlayStation 4/5——約 20 美元',
    platform_ja: '対応プラットフォーム：PC（Steam・Epic）、Nintendo Switch、PlayStation 4/5——約20ドル',
    platform_ko: '플레이 가능 플랫폼：PC（Steam, Epic）, Nintendo Switch, PlayStation 4/5——약 $20',
    platform_de: 'Verfügbar auf: PC (Steam, Epic), Nintendo Switch, PlayStation 4/5 — ca. 20 €',
    why_en:
      "Chicory: A Colorful Tale (2021) is one of the most delightfully original cozy games made in recent years. You play as a dog named after your favorite food (the protagonist is canonically just called 'Pizza' in most runs) who picks up a legendary magic paintbrush when the previous wielder goes missing. The entire world has turned black and white — your job is to restore color, which you do literally by painting everything: trees, walls, floors, sky, characters. The core mechanic is an invitation to be creative without pressure: you can paint however you want and nothing about your coloring choices affects gameplay. Lena Raine's soundtrack is lighter in tone than Celeste but equally inventive, with different themes for different biomes that evolve as the world regains color. The game also has a genuinely warm story about imposter syndrome, creativity anxiety, and the relationship between an artist and their successor. Co-op available. Multiple awards in 2021.",
    why_zh:
      'Chicory: A Colorful Tale（2021 年）是近年来最令人愉快的原创 cozy 游戏之一。你扮演一只以你最喜欢的食物命名的狗（主角在大多数游戏中被官方称为"Pizza"），当上任持有者失踪时拿起了传奇的魔法画笔。整个世界变成了黑白——你的工作是恢复颜色，你通过字面意义上为所有东西涂色来实现：树木、墙壁、地板、天空、角色。核心机制是无压力创意的邀请：你可以随心所欲地绘画，你的涂色选择不影响游戏玩法。Lena Raine 的配乐在基调上比 Celeste 更轻盈，但同样富有创意，不同生物群落有不同的主题，随着世界重新获得颜色而演变。游戏还有一个关于冒名顶替综合症、创意焦虑以及艺术家与其继承者之间关系的真正温暖的故事。可合作游玩。2021 年多个奖项。',
    why_zhTW:
      'Chicory: A Colorful Tale（2021 年）是近年來最令人愉快的原創 Cozy 遊戲之一。你扮演一隻以你最喜歡的食物命名的狗（主角在大多數遊戲中被官方稱為「Pizza」），當上任持有者失蹤時拿起了傳奇的魔法畫筆。整個世界變成了黑白——你的工作是恢復顏色，你通過字面意義上為所有東西塗色來實現：樹木、牆壁、地板、天空、角色。核心機制是無壓力創意的邀請：你可以隨心所欲地繪畫，你的塗色選擇不影響遊戲玩法。Lena Raine 的配樂在基調上比 Celeste 更輕盈，但同樣富有創意，不同生物群落有不同的主題，隨著世界重新獲得顏色而演變。遊戲還有一個關於冒名頂替症候群、創意焦慮以及藝術家與其繼承者之間關係的真正溫暖的故事。可合作遊玩。2021 年多個獎項。',
    why_ja:
      'Chicory: A Colorful Tale（2021年）は近年で最も個性的なコージーゲームのひとつ。好きな食べ物の名前をもつ犬（多くの場合、主人公は「ピザ」）として、行方不明になった前の魔法の筆使いが残した伝説の筆を拾います。世界は白黒になっており、あなたの仕事は色を取り戻すこと——木、壁、床、空、キャラクターすべてに文字通り塗ります。コア機能は「プレッシャーなしの創造性への招待」：どう塗っても自由で、ゲームプレイへの影響はゼロ。Lena RaineのサウンドトラックはCelesteより軽やかなトーンですが同様に独創的で、バイオームごとに異なるテーマが世界が色を取り戻すにつれて進化します。インポスター症候群、創作への不安、アーティストと後継者の関係を描いた温かいストーリーも魅力。2人協力プレイ対応。2021年に複数の賞を受賞。',
    why_ko:
      'Chicory: A Colorful Tale（2021）은 최근 몇 년간 가장 독창적인 코지 게임 중 하나입니다. 좋아하는 음식 이름을 가진 강아지（대부분의 플레이에서 주인공은 "피자"）로, 전 사용자가 사라진 후 전설의 마법 붓을 줍습니다. 세상은 흑백이 되었고, 당신의 임무는 색을 되돌리는 것——나무, 벽, 바닥, 하늘, 캐릭터 모두에 글자 그대로 색을 칠합니다. 핵심 메카닉은 "부담 없는 창의성으로의 초대"입니다. 어떻게 칠해도 자유이고, 색깔 선택이 게임 플레이에 영향을 주지 않습니다. Lena Raine의 사운드트랙은 Celeste보다 가볍지만 똑같이 독창적이며, 세상이 색을 되찾으면서 바이옴마다 다른 테마가 진화합니다. 가면 증후군, 창의성 불안, 아티스트와 계승자의 관계를 진심으로 그린 이야기도 매력적입니다. 2인 협동 플레이 지원. 2021년 다수 수상.',
    why_de:
      'Chicory: A Colorful Tale (2021) ist eines der originellsten Cozy-Games der letzten Jahre. Du spielst einen Hund, der nach deinem Lieblingsessen benannt ist (meistens "Pizza"), der einen legendären Zauberpinsel aufhebt, nachdem sein vorheriger Besitzer verschwunden ist. Die ganze Welt ist schwarz-weiß geworden — deine Aufgabe ist es, die Farbe zurückzubringen, indem du buchstäblich alles bemalung: Bäume, Wände, Böden, Himmel, Charaktere. Die Kernmechanik ist eine Einladung zur Kreativität ohne Druck: Du kannst malen wie du willst und deine Farbwahl beeinflusst das Gameplay nicht. Lena Raines Soundtrack ist im Ton leichter als Celeste aber genauso einfallsreich, mit verschiedenen Themen für verschiedene Biome, die sich entwickeln während die Welt ihre Farbe zurückgewinnt. Das Spiel hat auch eine herzliche Geschichte über Impostor-Syndrom, kreative Angst und die Beziehung zwischen einem Künstler und seinem Nachfolger. Koop verfügbar. Mehrere Auszeichnungen 2021.',
    tip_en: "Do not agonize over your coloring choices — the game is designed for you to paint freely and impulsively. The most beautiful results usually come from players who stop thinking about color theory and just express their mood directly onto the world.",
    tip_zh: '不要为你的涂色选择纠结——游戏是为你自由和冲动地绘画而设计的。最美丽的结果通常来自那些停止思考色彩理论、直接将心情表达到世界上的玩家。',
    tip_zhTW: '不要為你的塗色選擇糾結——遊戲是為你自由和衝動地繪畫而設計的。最美麗的結果通常來自那些停止思考色彩理論、直接將心情表達到世界上的玩家。',
    tip_ja: '塗り方で悩みすぎないで——自由に、衝動的に塗ることを前提としたゲームです。色彩理論を考えるのをやめて、気分をそのまま世界に表現したプレイヤーが一番美しい結果を残しています。',
    tip_ko: '색칠 선택을 너무 고민하지 마세요——자유롭게, 충동적으로 그리도록 설계된 게임입니다. 색채 이론 생각을 멈추고 기분을 세상에 직접 표현한 플레이어들이 가장 아름다운 결과를 만들어냈어요.',
    tip_de: 'Grübel nicht über deine Farbwahl — das Spiel ist dafür gedacht, frei und impulsiv zu malen. Die schönsten Ergebnisse kommen meistens von Spielern, die aufgehört haben, über Farbtheorie nachzudenken, und ihre Stimmung direkt in die Welt ausgedrückt haben.',
  },
  'night-in-the-woods': {
    title_en: 'Night in the Woods',
    title_zh: '林中夜晚',
    title_zhTW: '林中夜晚',
    title_ja: 'ナイト・イン・ザ・ウッズ (Night in the Woods)',
    title_ko: '나이트 인 더 우즈 (Night in the Woods)',
    title_de: 'Night in the Woods',
    emoji: '🦝',
    tag_en: "A character-driven story about coming home to a small town after college — with Alec Holowka's indie guitar soundtrack that sounds like the town itself",
    tag_zh: '一个关于大学后回家小镇的人物驱动故事——附带 Alec Holowka 听起来像小镇本身的独立吉他配乐',
    tag_zhTW: '一個關於大學後回家小鎮的人物驅動故事——附帶 Alec Holowka 聽起來像小鎮本身的獨立吉他配樂',
    tag_ja: '大学を中退して地元の小さな町に戻る、キャラクター主導の物語——Alec Holowkaによる、まるでその町の音みたいなインディーギターサウンドトラック',
    tag_ko: '대학 후 소도시 고향으로 돌아오는 캐릭터 중심 이야기——Alec Holowka의 마을 그 자체처럼 들리는 인디 기타 사운드트랙',
    tag_de: "Eine charaktergetriebene Geschichte über die Heimkehr in eine Kleinstadt nach dem Studium — mit Alec Holowkas Indie-Gitarren-Soundtrack, der klingt wie die Stadt selbst",
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PlayStation 4, Xbox, iOS, Android — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PlayStation 4、Xbox、iOS、Android——约 20 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam、GOG）、Nintendo Switch、PlayStation 4、Xbox、iOS、Android——約 20 美元',
    platform_ja: '対応プラットフォーム：PC（Steam・GOG）、Nintendo Switch、PlayStation 4、Xbox、iOS、Android——約20ドル',
    platform_ko: '플레이 가능 플랫폼：PC（Steam, GOG）, Nintendo Switch, PlayStation 4, Xbox, iOS, Android——약 $20',
    platform_de: 'Verfügbar auf: PC (Steam, GOG), Nintendo Switch, PlayStation 4, Xbox, iOS, Android — ca. 20 €',
    why_en:
      "Night in the Woods (2017) is one of the most beloved narrative indie games of its era — a coming-of-age story about Mae Borowski, a 20-year-old cat who drops out of college and returns to her small rust-belt town of Possum Springs. The game's core loop is simple: walk around town every day, talk to friends and family, and discover that everything has changed while somehow also still being the same. There is an overarching mystery that builds over the second half, but the real substance is in the small conversations. The music by composer Alec Holowka gives the game a specific sonic personality: guitar-forward, indie-tinged, melodic but imperfect — it sounds like the band at the local bar, recorded in someone's basement, and it is perfect for that reason. Night in the Woods was widely acclaimed for its honest and specific depiction of working-class small-town life, millennial anxiety, depression, and religious doubt. Very long critically for its $20 price point — 6-10 hours for a first playthrough with high replayability. One of the most emotionally specific cozy games ever made.",
    why_zh:
      '林中夜晚（2017 年）是其时代最受喜爱的叙事独立游戏之一——一个关于 Mae Borowski 的成长故事，这只 20 岁的猫从大学退学后回到她的小锈带城镇 Possum Springs。游戏的核心循环很简单：每天在镇上散步，与朋友和家人交谈，发现一切都变了，同时不知何故还是一样。后半部分有一个总体谜题在发展，但真正的实质在于小对话。作曲家 Alec Holowka 的音乐给游戏一个特定的声音个性：吉他主导、独立音乐调调、旋律性但不完美——听起来像本地酒吧的乐队，在某人的地下室录制，正因为如此而完美。林中夜晚因其对工人阶级小镇生活、千禧一代焦虑、抑郁和宗教怀疑的诚实而具体的描绘而广受好评。在 20 美元的价位下篇幅很长——第一次通关 6-10 小时，可重玩性高。有史以来情感上最具体的 cozy 游戏之一。',
    why_zhTW:
      '林中夜晚（2017 年）是其時代最受喜愛的敘事獨立遊戲之一——一個關於 Mae Borowski 的成長故事，這隻 20 歲的貓從大學退學後回到她的小鏽帶城鎮 Possum Springs。遊戲的核心循環很簡單：每天在鎮上散步，與朋友和家人交談，發現一切都變了，同時不知何故還是一樣。後半部分有一個總體謎題在發展，但真正的實質在於小對話。作曲家 Alec Holowka 的音樂給遊戲一個特定的聲音個性：吉他主導、獨立音樂調調、旋律性但不完美——聽起來像本地酒吧的樂隊，在某人的地下室錄製，正因為如此而完美。林中夜晚因其對工人階級小鎮生活、千禧一代焦慮、抑鬱和宗教懷疑的誠實而具體的描繪而廣受好評。在 20 美元的價位下篇幅很長——第一次通關 6-10 小時，可重玩性高。有史以來情感上最具體的 Cozy 遊戲之一。',
    why_ja:
      'Night in the Woods（2017年）は、その時代を代表するナラティブ系インディーゲームのひとつ。20歳の猫、マエ・ボロウスキーが大学を中退して錆びついた工業都市ポッサム・スプリングスに帰郷する成長物語です。ゲームのループはシンプル：毎日町を歩き、友人や家族と話し、「変わったけど変わっていない」日常を発見する。後半には謎めいた展開もありますが、真骨頂は小さな会話の積み重ね。作曲家Alec Holowkaの音楽はゲームに固有の音の個性を与えます——ギター主体、インディー色、旋律的でも不完全——地元バーのバンドが誰かの地下室で録音したような音で、だからこそ完璧。ブルーカラーの小さな町の生活、ミレニアル世代の不安、うつ、宗教への懐疑心の描写が高く評価されました。20ドルの価格帯にしては内容が濃く、初回プレイ6〜10時間、周回プレイも楽しめます。',
    why_ko:
      'Night in the Woods（2017）는 그 시대 가장 사랑받은 내러티브 인디 게임 중 하나입니다. 대학을 중퇴하고 작은 러스트벨트 마을 포섬 스프링스로 돌아오는 20살 고양이 메이 보로우스키의 성장 이야기입니다. 게임의 핵심 루프는 단순합니다: 매일 마을을 걷고, 친구와 가족과 이야기하며, 모든 것이 변했지만 어떻게든 그대로인 일상을 발견하는 것. 후반부에 미스터리가 전개되지만 진짜 핵심은 작은 대화들입니다. 작곡가 Alec Holowka의 음악은 게임에 독자적인 사운드 개성을 부여합니다——기타 중심, 인디 감성, 멜로디하지만 완벽하지 않은——동네 바 밴드가 누군가 지하실에서 녹음한 것 같고, 바로 그래서 완벽합니다. 노동자 계층 소도시 생활, 밀레니얼 세대의 불안, 우울, 종교적 회의감을 솔직하게 그린 묘사로 큰 호평을 받았습니다. $20 가격 대비 높은 볼륨——첫 플레이 6~10시간, 재플레이도 즐길 수 있습니다.',
    why_de:
      'Night in the Woods (2017) ist eines der beliebtesten narrativen Indie-Spiele seiner Ära — eine Coming-of-Age-Geschichte über Mae Borowski, eine 20-jährige Katze, die ihr Studium abbricht und in ihre kleine Rostgürtel-Stadt Possum Springs zurückkehrt. Der Kernloop des Spiels ist einfach: jeden Tag durch die Stadt laufen, mit Freunden und Familie reden, und entdecken, dass sich alles verändert hat, aber irgendwie auch noch gleich geblieben ist. In der zweiten Hälfte baut sich ein übergreifendes Mysterium auf, aber das eigentliche Herzstück sind die kleinen Gespräche. Die Musik von Komponist Alec Holowka verleiht dem Spiel eine spezifische klangliche Persönlichkeit: gitarrenorientiert, indie-angehaucht, melodisch aber unfertig — wie die Band in der Stammkneipe, aufgenommen in jemandes Keller, und genau deshalb perfekt. Night in the Woods wurde weithin für seine ehrliche und spezifische Darstellung von Arbeiterklasse-Kleinstadtleben, Millennial-Angst, Depression und religiösem Zweifel gelobt. Für den Preis von ca. 20 € sehr umfangreich — 6–10 Stunden für einen ersten Durchgang mit hohem Wiederspielwert.',
    tip_en: "Talk to every character every day — their dialogue changes almost every morning, and some of the best writing in the game is in conversations that repeat on day 3 or 4 after you have gotten to know the character better.",
    tip_zh: '每天与每个角色交谈——他们的对话几乎每天早晨都会改变，游戏中一些最好的写作在你更了解角色后的第 3 或 4 天重复的对话中。',
    tip_zhTW: '每天與每個角色交談——他們的對話幾乎每天早晨都會改變，遊戲中一些最好的寫作在你更了解角色後的第 3 或 4 天重複的對話中。',
    tip_ja: '毎日全キャラクターに話しかけてください——台詞はほぼ毎朝変わります。キャラクターを深く知ってから3〜4日目に始まる会話に、このゲームの最高のテキストが詰まっています。',
    tip_ko: '매일 모든 캐릭터와 대화하세요——대사는 거의 매일 아침 바뀝니다. 캐릭터를 더 잘 알게 된 후 3~4일째부터 시작되는 반복 대화에 이 게임 최고의 글이 담겨 있습니다.',
    tip_de: 'Sprich jeden Tag mit jedem Charakter — ihre Dialoge ändern sich fast jeden Morgen, und einige der besten Texte im Spiel stecken in Gesprächen, die sich am 3. oder 4. Tag wiederholen, nachdem du den Charakter besser kennengelernt hast.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    celeste: 0,
    gris: 0,
    chicory: 0,
    'night-in-the-woods': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozySoundtrackQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-soundtrack-quiz`
    const shareText = getLoc(
      `根据我的音乐品味，最适合我的 Cozy 游戏是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `Based on my music taste, my cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `根據我的音樂品味，最適合我的 Cozy 遊戲是「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `私の音楽センスに合ったコージーゲームは「${result.title_ja}」でした！${result.tag_ja}。あなたも試してみて：${url}`,
      `내 음악 취향에 맞는 코지 게임은 "${result.title_ko}"！${result.tag_ko}。당신의 결과는？：${url}`,
      `Mein Cozy-Game-Match nach Musikgeschmack: ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`,
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
              {getLoc('上手小贴士：', 'Getting started: ', '上手小貼士：', 'はじめる前に：', '시작 팁：', 'Einstiegstipp: ')}
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
            '你的音乐品味对应哪款 Cozy 游戏原声？',
            'Which Cozy Game Soundtrack Matches Your Music Taste?',
            '你的音樂品味對應哪款 Cozy 遊戲原聲？',
            'あなたの音楽センスに合うコージーゲームサウンドトラックは？',
            '당신의 음악 취향에 맞는 코지 게임 사운드트랙은?',
            'Welcher Cozy-Game-Soundtrack passt zu deinem Musikgeschmack?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个关于音乐感受的问题——在 Celeste、Gris、Chicory 和林中夜晚中找到拥有你最爱原声带的 Cozy 游戏',
            "6 questions about how music moves you — find which game has the soundtrack you'll put on repeat: Celeste, Gris, Chicory, or Night in the Woods.",
            '6 個關於音樂感受的問題——在 Celeste、Gris、Chicory 和林中夜晚中找到擁有你最愛原聲帶的 Cozy 遊戲',
            '音楽との向き合い方を問う6問——Celeste、Gris、Chicory、Night in the Woodsの中から、あなたがリピートするサウンドトラックを見つけよう',
            '음악에 대한 6가지 질문——Celeste, Gris, Chicory, Night in the Woods 중 당신이 반복 재생할 사운드트랙을 찾아보세요',
            '6 Fragen darüber, wie Musik dich bewegt — finde heraus, welches Spiel den Soundtrack hat, den du auf Dauerschleife hörst: Celeste, Gris, Chicory oder Night in the Woods.',
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
        {getLoc('找到我的游戏原声', 'Find My Soundtrack', '找到我的遊戲原聲', 'サウンドトラックを見つける', '내 사운드트랙 찾기', 'Meinen Soundtrack finden')}
      </button>
    </div>
  )
}
