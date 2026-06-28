'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'campus' | 'zoo' | 'hospital' | 'coaster'

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
    q_en: 'What would you most enjoy being responsible for?',
    q_zh: '你最享受管理哪种类型的事物？',
    q_zhTW: '你最享受管理哪種類型的事物？',
    q_ja: '管理するとしたら、どんなものが一番楽しそう？',
    q_ko: '어떤 종류의 것을 관리하는 게 가장 즐거울 것 같나요?',
    q_de: 'Wofür würdest du am liebsten verantwortlich sein?',
    options: [
      {
        en: 'A campus full of students learning unusual courses — from Scientography to Knight School — while keeping their social lives, grades, and wellbeing in balance',
        zh: '一个充满学生学习奇特课程的校园——从"科学摄影"到"骑士学校"——同时维持他们的社交生活、成绩和身心健康',
        zhTW: '一個充滿學生學習奇特課程的校園——從「科學攝影」到「騎士學校」——同時維持他們的社交生活、成績和身心健康',
        ja: '奇妙な授業（科学写真術から騎士学校まで）が並ぶキャンパス——学生の社交生活・成績・メンタルをバランスよく管理する',
        ko: '특이한 수업들(과학 사진학부터 기사 학교까지)이 가득한 캠퍼스 — 학생들의 사회생활, 성적, 건강을 균형 있게 관리하기',
        de: 'Ein Campus voller Studierender mit absurden Kursen — von Wissenschaftsfotografie bis zur Ritterschule — während ich ihre Sozialeben, Noten und Wohlbefinden in Balance halte',
        type: 'campus',
      },
      {
        en: 'A zoo where animal welfare and conservation breeding matter as much as profit — designing biome-accurate habitats and watching rare species thrive',
        zh: '一个动物福利和保育繁殖与盈利同等重要的动物园——设计符合生物群落的栖息地，看着稀有物种茁壮成长',
        zhTW: '一個動物福利和保育繁殖與盈利同等重要的動物園——設計符合生物群落的棲息地，看著稀有物種茁壯成長',
        ja: '動物の福祉と保全繁殖が利益と同じくらい大切な動物園——バイオームに合った生息地を設計して、希少種が育つのを見守る',
        ko: '동물 복지와 보전 번식이 수익만큼 중요한 동물원 — 생태계에 맞는 서식지를 설계하고 희귀 종이 번성하는 걸 지켜보기',
        de: 'Einen Zoo, in dem Tierwohl und Zucht gefährdeter Arten genauso wichtig sind wie Profit — authentische Lebensräume designen und seltene Arten gedeihen sehen',
        type: 'zoo',
      },
      {
        en: 'A chaotic, comedy-filled hospital where every patient has an absurd ailment — optimizing staff workflow, room layout, and queue management under time pressure',
        zh: '一个充满混乱喜剧感的医院，每位病人都有荒诞病情——在时间压力下优化员工流程、房间布局和排队管理',
        zhTW: '一個充滿混亂喜劇感的醫院，每位病人都有荒誕病情——在時間壓力下優化員工流程、房間布局和排隊管理',
        ja: 'おかしな病気の患者で溢れるカオスなコメディ病院——時間プレッシャーの中でスタッフの動線、部屋の配置、待ち列を最適化する',
        ko: '황당한 병을 가진 환자들로 가득한 유쾌한 병원 — 시간 압박 속에서 직원 동선, 룸 배치, 대기열 관리를 최적화하기',
        de: 'Ein chaotisches Spaßkrankenhaus, in dem jeder Patient eine absurde Krankheit hat — Mitarbeiterabläufe, Raumlayout und Warteschlangenmanagement unter Zeitdruck optimieren',
        type: 'hospital',
      },
      {
        en: 'A theme park where you design every rollercoaster by hand, place scenery piece by piece, and watch guests react in real time to every twist and drop',
        zh: '一个主题公园，你亲手设计每一座过山车，逐件摆放装饰，实时观看游客对每个弯道和下坡的反应',
        zhTW: '一個主題公園，你親手設計每一座雲霄飛車，逐件擺放裝飾，實時觀看遊客對每個彎道和下坡的反應',
        ja: '自分でひとつひとつコースターを設計して、飾りを配置して、ゲストがリアルタイムで反応するのを楽しむテーマパーク',
        ko: '직접 모든 롤러코스터를 설계하고 장식을 하나하나 배치하며 손님들의 실시간 반응을 지켜보는 테마파크',
        de: 'Einen Freizeitpark, in dem ich jede Achterbahn von Hand entwerfe, Dekoration Stück für Stück platziere und Gästen in Echtzeit bei jeder Kurve und jedem Abfall zuschau',
        type: 'coaster',
      },
    ],
  },
  {
    q_en: 'How do you prefer the "creativity vs. optimization" balance in a management game?',
    q_zh: '你在管理游戏中更偏好「创意」还是「优化」？',
    q_zhTW: '你在管理遊戲中更偏好「創意」還是「優化」？',
    q_ja: '管理ゲームで「クリエイティビティ」と「最適化」のバランス、どちら寄りが好き？',
    q_ko: '경영 게임에서 「창의성」과 「최적화」 중 어느 쪽을 더 선호하나요?',
    q_de: 'Wie bevorzugst du die Balance zwischen Kreativität und Optimierung in einem Management-Spiel?',
    options: [
      {
        en: 'Deep systems with clear optimization — course research trees, staff specialization, grant applications, and student happiness metrics to tune',
        zh: '有明确优化目标的深度系统——课程研究树、员工专业化、助学金申请和需要调整的学生满意度指标',
        zhTW: '有明確優化目標的深度系統——課程研究樹、員工專業化、助學金申請和需要調整的學生滿意度指標',
        ja: 'しっかりとした最適化目標があるシステム——コースの研究ツリー、スタッフの専門化、奨学金申請、学生幸福度の調整',
        ko: '명확한 최적화 목표가 있는 깊이 있는 시스템 — 수업 연구 트리, 직원 전문화, 장학금 신청, 학생 만족도 지표 조정',
        de: 'Tiefe Systeme mit klaren Optimierungszielen — Kursforschungsbäume, Staffspezialisierung, Stipendienanträge und Studentenzufriedenheitswerte zum Anpassen',
        type: 'campus',
      },
      {
        en: 'Creative habitat design first, optimization second — I want artistic freedom building realistic biomes before worrying about the conservation budget',
        zh: '先创意栖息地设计，后优化——我想在担心保育预算之前，享受构建逼真生物群落的艺术自由',
        zhTW: '先創意棲息地設計，後優化——我想在擔心保育預算之前，享受構建逼真生物群落的藝術自由',
        ja: 'まずは創造的な生息地デザイン、最適化は後回し——保全予算を気にする前に、リアルなバイオームを作る芸術的自由を楽しみたい',
        ko: '창의적인 서식지 디자인을 먼저, 최적화는 나중에 — 보전 예산 걱정하기 전에 사실적인 생태계를 만드는 예술적 자유를 즐기고 싶어요',
        de: 'Kreatives Habitatdesign zuerst, Optimierung danach — ich will künstlerische Freiheit beim Bau realistischer Biotope genießen, bevor ich mir um das Schutzbudget Gedanken mache',
        type: 'zoo',
      },
      {
        en: 'Pure optimization — diagnosing bottlenecks, adjusting staff ratios, and watching a previously broken hospital become a smoothly running machine',
        zh: '纯粹优化——诊断瓶颈、调整员工比例，看着一家之前混乱的医院变成运转顺畅的机器',
        zhTW: '純粹優化——診斷瓶頸、調整員工比例，看著一家之前混亂的醫院變成運轉順暢的機器',
        ja: '純粋に最適化——ボトルネックを診断して、スタッフ比率を調整して、以前はぐちゃぐちゃだった病院が円滑に動く機械になるのを見届ける',
        ko: '순수한 최적화 — 병목 현상 진단하고 직원 비율 조정해서 예전엔 혼돈이었던 병원이 잘 돌아가는 기계로 변하는 걸 보기',
        de: 'Reine Optimierung — Engpässe diagnostizieren, Mitarbeiterverhältnisse anpassen und zusehen, wie ein ehemaliges Chaos-Krankenhaus zur reibungslos laufenden Maschine wird',
        type: 'hospital',
      },
      {
        en: 'Maximum creative freedom — I want to engineer rollercoasters from scratch and design a park aesthetic that is entirely my own vision',
        zh: '最大创意自由——我想从零工程师般设计过山车，打造完全属于自己愿景的公园美学',
        zhTW: '最大創意自由——我想從零工程師般設計雲霄飛車，打造完全屬於自己願景的公園美學',
        ja: '最大限のクリエイティブフリーダム——ゼロからコースターを設計して、完全に自分のビジョンのパーク美学を作り上げたい',
        ko: '최대한의 창의적 자유 — 제로에서 롤러코스터를 직접 설계하고 완전히 나만의 비전으로 파크 미학을 만들고 싶어요',
        de: 'Maximale kreative Freiheit — ich möchte Achterbahnen von Grund auf entwerfen und eine Park-Ästhetik schaffen, die vollständig meiner eigenen Vision entspricht',
        type: 'coaster',
      },
    ],
  },
  {
    q_en: 'What kind of visual world do you want to spend hours inside?',
    q_zh: '你想在哪种视觉世界里沉浸数小时？',
    q_zhTW: '你想在哪種視覺世界裡沉浸數小時？',
    q_ja: '何時間でもいたいと思えるビジュアルの世界って、どんな感じ？',
    q_ko: '몇 시간이고 빠져들고 싶은 비주얼 세계는 어떤 모습인가요?',
    q_de: 'In welcher visuellen Welt möchtest du stundenlang versinken?',
    options: [
      {
        en: 'Ivy-covered campus buildings, student clubs on the lawn, quirky course classrooms with themed decorations — warm, academic, gently satirical',
        zh: '爬满常春藤的校园建筑、草坪上的学生社团、主题装饰的奇特课程教室——温暖、学术、带着温和讽刺',
        zhTW: '爬滿常春藤的校園建築、草坪上的學生社團、主題裝飾的奇特課程教室——溫暖、學術、帶著溫和諷刺',
        ja: 'ツタが這うキャンパスの建物、芝生の上の学生サークル、テーマ付きの変わった授業教室——温かくて学術的で、ほんのりシニカル',
        ko: '담쟁이덩굴이 뒤덮인 캠퍼스 건물, 잔디밭의 학생 동아리, 테마 장식의 독특한 강의실 — 따뜻하고 학문적이며 살짝 풍자적인',
        de: 'Efeubedeckte Campusgebäude, Studentenclubs auf dem Rasen, thematisch dekorierte Kursräume — warm, akademisch, leicht satirisch',
        type: 'campus',
      },
      {
        en: 'Lush, naturalistic habitats with dense foliage, waterfalls, and hundreds of real animals behaving authentically — the most beautiful management sim ever made',
        zh: '郁郁葱葱的自然栖息地，茂密的植被、瀑布和数百种真实动物的真实行为——有史以来最美丽的管理模拟',
        zhTW: '鬱鬱蔥蔥的自然棲息地，茂密的植被、瀑布和數百種真實動物的真實行為——有史以來最美麗的管理模擬',
        ja: '生い茂る自然生息地に、本物の植生、滝、そして何百もの動物がリアルな行動をとる——今まで作られた中で最も美しい管理シム',
        ko: '울창한 자연 서식지에 빽빽한 식생, 폭포, 수백 종의 동물들이 진짜 행동을 하는 — 역대 가장 아름다운 경영 시뮬레이션',
        de: 'Üppige, naturalistische Lebensräume mit dichter Vegetation, Wasserfällen und Hunderten echter Tiere mit authentischem Verhalten — die schönste Management-Sim aller Zeiten',
        type: 'zoo',
      },
      {
        en: 'Colorful, stylized hospital corridors filled with nurses, doctors, and patients with hilariously absurd conditions — humor as the primary art direction',
        zh: '色彩鲜艳、风格化的医院走廊，充满护士、医生和患有荒诞病症的病人——幽默作为主要艺术方向',
        zhTW: '色彩鮮艷、風格化的醫院走廊，充滿護士、醫生和患有荒誕病症的病人——幽默作為主要藝術方向',
        ja: 'カラフルでスタイリッシュな病院の廊下に、看護師、医師、そして笑えるほど突拍子もない病気の患者——ユーモアがメインのアートデザイン',
        ko: '알록달록하고 스타일리시한 병원 복도에 간호사, 의사, 그리고 황당한 병을 가진 환자들이 가득 — 유머가 주된 아트 디렉션',
        de: 'Bunte, stilisierte Krankenhausflure voller Schwestern, Ärzte und Patienten mit herrlich absurden Krankheiten — Humor als primäre Kunst-Richtung',
        type: 'hospital',
      },
      {
        en: 'Grand theme park grounds with enormous, twisting rides towering above the horizon, illuminated signs at night, and crowds moving through your meticulously planned paths',
        zh: '宏伟的主题公园，巨型扭曲游乐设施高耸入云，夜晚的彩色招牌闪烁，人群穿行于你精心规划的小路间',
        zhTW: '宏偉的主題公園，巨型扭曲遊樂設施高聳入雲，夜晚的彩色招牌閃爍，人群穿行於你精心規劃的小路間',
        ja: '地平線に巨大なコースターがそびえ立ち、夜は看板が輝き、丁寧に設計した通路を人々が行き交う壮大なテーマパーク',
        ko: '거대한 롤러코스터가 지평선 위로 솟아오르고, 밤에는 형형색색 간판이 빛나며, 정성껏 설계한 길을 사람들이 오가는 웅장한 테마파크',
        de: 'Weitläufige Parkgelände mit riesigen, sich windenden Fahrgeschäften am Horizont, beleuchteten Schildern in der Nacht und Menschenmengen auf deinen sorgfältig geplanten Wegen',
        type: 'coaster',
      },
    ],
  },
  {
    q_en: 'What does your ideal failure state look like?',
    q_zh: '你在游戏中最能接受哪种「失败状态」？',
    q_zhTW: '你在遊戲中最能接受哪種「失敗狀態」？',
    q_ja: 'ゲームで一番「まあ仕方ない」と思える失敗ってどんなの？',
    q_ko: '게임에서 가장 받아들일 수 있는 「실패 상태」는 어떤 건가요?',
    q_de: 'Wie sieht dein idealer Fehlerzustand im Spiel aus?',
    options: [
      {
        en: 'Student satisfaction drops and enrollment falls — I need to redesign the curriculum and rebuild morale before the next academic year',
        zh: '学生满意度下降、招生减少——我需要在下学年前重新设计课程并重建士气',
        zhTW: '學生滿意度下降、招生減少——我需要在下學年前重新設計課程並重建士氣',
        ja: '学生の満足度が下がって入学者が減る——次の学年までにカリキュラムを再設計してモチベーションを立て直す',
        ko: '학생 만족도가 떨어지고 입학자가 줄어드는 것 — 다음 학년 전에 커리큘럼을 재설계하고 사기를 다시 끌어올려야 해요',
        de: 'Die Studierendenzufriedenheit sinkt und die Einschreibungen fallen — ich muss den Lehrplan neu gestalten und die Moral vor dem nächsten Studienjahr wiederaufbauen',
        type: 'campus',
      },
      {
        en: 'An animal gets sick or escapes its habitat — I need to quickly address welfare issues before the conservation rating collapses',
        zh: '动物生病或逃出栖息地——我需要在保育评级崩溃前快速解决福利问题',
        zhTW: '動物生病或逃出棲息地——我需要在保育評級崩潰前快速解決福利問題',
        ja: '動物が病気になったり生息地から脱出したり——保全評価が崩壊する前に福祉の問題を素早く対処する',
        ko: '동물이 아프거나 서식지에서 탈출하는 것 — 보전 평가가 붕괴되기 전에 빠르게 복지 문제를 해결해야 해요',
        de: 'Ein Tier wird krank oder bricht aus seinem Lebensraum aus — ich muss Wohlfahrtsprobleme schnell beheben, bevor die Schutzwertung zusammenbricht',
        type: 'zoo',
      },
      {
        en: 'Queues spiral out of control and patients start leaving unhappy — diagnosing the bottleneck under pressure is part of the fun',
        zh: '队列失控，病人开始不满离开——在压力下诊断瓶颈是乐趣的一部分',
        zhTW: '隊列失控，病人開始不滿離開——在壓力下診斷瓶頸是樂趣的一部分',
        ja: '待ち列が制御不能になって患者が不満で帰り始める——プレッシャーの中でボトルネックを診断するのも楽しみの一つ',
        ko: '대기열이 통제 불능이 되고 환자들이 불만족스럽게 떠나는 것 — 압박 속에서 병목을 진단하는 것도 재미의 일부예요',
        de: 'Warteschlangen eskalieren und Patienten gehen unzufrieden — unter Druck den Engpass zu diagnostizieren ist Teil des Spaßes',
        type: 'hospital',
      },
      {
        en: 'A ride breaks down mid-day and guest satisfaction tanks — rushing to fix it while keeping the rest of the park running is exactly the kind of crisis I enjoy',
        zh: '游乐设施在白天中途出故障，游客满意度急跌——在保持公园其余部分运营的同时紧急修复，正是我喜欢的危机类型',
        zhTW: '遊樂設施在白天中途出故障，遊客滿意度急跌——在保持公園其餘部分運營的同時緊急修復，正是我喜歡的危機類型',
        ja: '日中にアトラクションが故障してゲスト満足度が急落——残りのパークを動かしながら緊急修理するのが、まさに自分好みの危機',
        ko: '낮에 놀이기구가 고장나 손님 만족도가 급락하는 것 — 나머지 파크를 운영하면서 긴급 수리하는 게 딱 내가 좋아하는 위기 유형이에요',
        de: 'Eine Attraktion fällt mitten am Tag aus und die Gästezufriedenheit stürzt ab — sie zu reparieren, während der Rest des Parks läuft, ist genau die Art Krise, die ich liebe',
        type: 'coaster',
      },
    ],
  },
  {
    q_en: 'How do you feel about tutorial pacing and learning curve?',
    q_zh: '你对游戏的教程节奏和学习曲线有何期待？',
    q_zhTW: '你對遊戲的教程節奏和學習曲線有何期待？',
    q_ja: 'チュートリアルのペースと学習曲線、どんなのが好き？',
    q_ko: '튜토리얼 속도와 학습 곡선에 대해 어떻게 생각하나요?',
    q_de: 'Wie stehst du zu Tutorial-Tempo und Lernkurve?',
    options: [
      {
        en: 'Structured but generous — I want guided scenarios that teach each mechanic before opening the sandbox, with enough budget buffer to experiment freely',
        zh: '有结构但宽松——我想要引导场景在开放沙盒前教授每个机制，并有足够的预算缓冲让我自由实验',
        zhTW: '有結構但寬鬆——我想要引導場景在開放沙盒前教授每個機制，並有足夠的預算緩衝讓我自由實驗',
        ja: '構造的だけどゆとりがある——サンドボックスを開放する前に各仕組みを教えるシナリオがあって、自由に実験できる予算の余裕もほしい',
        ko: '체계적이지만 여유롭게 — 샌드박스를 열기 전에 각 메커니즘을 가르쳐주는 가이드 시나리오가 있고, 자유롭게 실험할 예산 여유도 있으면 좋겠어요',
        de: 'Strukturiert, aber großzügig — ich möchte geführte Szenarien, die jede Mechanik lehren, bevor der Sandkasten öffnet, mit genug Budgetpuffer zum freien Experimentieren',
        type: 'campus',
      },
      {
        en: 'Steep but rewarding — Planet Zoo has a high learning curve; I am willing to spend time learning habitat requirements because the payoff is beautiful',
        zh: '陡峭但有回报——Planet Zoo 有很高的学习曲线；我愿意花时间学习栖息地要求，因为回报是美丽的',
        zhTW: '陡峭但有回報——Planet Zoo 有很高的學習曲線；我願意花時間學習棲息地要求，因為回報是美麗的',
        ja: '急峻だけど見返りがある——Planet Zoo は学習曲線が急だけど、生息地の要件を学ぶ時間をかける価値はある。報酬が美しいから',
        ko: '가파르지만 보람 있는 — Planet Zoo는 학습 곡선이 높지만, 서식지 요건을 배우는 데 시간을 쏟을 의향이 있어요. 결과가 아름다우니까요',
        de: 'Steil, aber lohnend — Planet Zoo hat eine hohe Lernkurve; ich bin bereit, Zeit in das Erlernen von Habitatanforderungen zu investieren, weil das Ergebnis wunderschön ist',
        type: 'zoo',
      },
      {
        en: 'Thrown in at the deep end — I prefer to figure things out by watching a crisis unfold and diagnosing what went wrong, rather than following a tutorial',
        zh: '直接深入——我更喜欢通过观察危机展开并诊断出错的地方来解决问题，而不是跟着教程走',
        zhTW: '直接深入——我更喜歡透過觀察危機展開並診斷出錯的地方來解決問題，而不是跟著教程走',
        ja: 'いきなり深いところに放り込んでほしい——チュートリアルに沿うより、危機を観察してどこが悪かったか自分で診断するほうが好き',
        ko: '바로 깊은 곳에 던져주세요 — 튜토리얼 따라가는 것보다 위기가 펼쳐지는 걸 지켜보며 뭐가 잘못됐는지 스스로 진단하는 걸 더 좋아해요',
        de: 'Direkt ins kalte Wasser geworfen — ich lerne lieber, indem ich eine Krise beobachte und diagnostiziere, was schiefgelaufen ist, als einem Tutorial zu folgen',
        type: 'hospital',
      },
      {
        en: 'Gradual and creative — I want a career mode that teaches ride design mechanics gently before unlocking sandbox, where I can build anything with unlimited funds',
        zh: '循序渐进且有创意——我想要一个生涯模式在解锁沙盒前温和地教授游乐设施设计机制，在那里我可以用无限资金建造任何东西',
        zhTW: '循序漸進且有創意——我想要一個職涯模式在解鎖沙盒前溫和地教授遊樂設施設計機制，在那裡我可以用無限資金建造任何東西',
        ja: 'ゆっくりと創造的に——サンドボックスを解放する前にアトラクション設計の仕組みをやさしく教えるキャリアモードがほしい。解放後は無限資金で何でも作れる',
        ko: '점진적이고 창의적으로 — 샌드박스 해금 전에 놀이기구 설계 메커니즘을 부드럽게 가르쳐주는 커리어 모드가 있었으면 해요. 그 이후엔 무한 자금으로 뭐든 만들 수 있고요',
        de: 'Schrittweise und kreativ — ich möchte einen Karrieremodus, der Fahrgeschäft-Design sanft beibringt, bevor der Sandkasten mit unbegrenztem Geld öffnet',
        type: 'coaster',
      },
    ],
  },
  {
    q_en: 'Which end-of-session summary sounds most satisfying?',
    q_zh: '哪种游戏结束时的总结听起来最令人满足？',
    q_zhTW: '哪種遊戲結束時的總結聽起來最令人滿足？',
    q_ja: 'セッション終わりにどんな結果だったら一番満足感がある？',
    q_ko: '세션이 끝날 때 어떤 결과가 가장 만족스러울까요?',
    q_de: 'Welche End-of-Session-Zusammenfassung klingt am befriedigendsten?',
    options: [
      {
        en: 'Three students just graduated my new Virtual Reality course with honors, my campus happiness score hit 80%, and I just unlocked Gastronomy as a course option for next year',
        zh: '三名学生以优异成绩从我新开设的虚拟现实课程毕业，校园幸福感达到 80%，我刚解锁了下年的"美食学"课程选项',
        zhTW: '三名學生以優異成績從我新開設的虛擬實境課程畢業，校園幸福感達到 80%，我剛解鎖了下年的「美食學」課程選項',
        ja: '新しく開設したVR授業から3人の学生が優秀な成績で卒業、キャンパス幸福度が80%に達成、来年の「美食学」コースもアンロックした',
        ko: '새로 개설한 VR 강좌에서 학생 3명이 우수한 성적으로 졸업하고, 캠퍼스 행복도 80% 달성, 내년 「미식학」 강좌 옵션도 해금했어요',
        de: 'Drei Studierende haben meinen neuen VR-Kurs mit Auszeichnung abgeschlossen, mein Campus-Glücklichkeitswert erreichte 80% und ich habe gerade Gastronomie als Kursoption für nächstes Jahr freigeschaltet',
        type: 'campus',
      },
      {
        en: 'My endangered snow leopard breeding pair had two cubs, both cleared for the conservation release program — and my Arctic Wolf habitat finally earned a five-star welfare rating',
        zh: '我濒危雪豹繁殖对有了两只幼崽，都已通过保育放归计划审核——我的北极狼栖息地终于获得五星福利评级',
        zhTW: '我瀕危雪豹繁殖對有了兩隻幼崽，都已通過保育放歸計劃審核——我的北極狼棲息地終於獲得五星福利評級',
        ja: '絶滅危惧種のユキヒョウの繁殖ペアに子供が2頭生まれ、どちらも保全放流プログラムの審査を通過——ホッキョクオオカミの生息地もついに★5の福祉評価を獲得した',
        ko: '멸종위기 눈표범 번식 쌍에서 새끼 2마리가 태어났고 둘 다 보전 방류 프로그램 심사를 통과했어요 — 북극늑대 서식지도 드디어 5성 복지 평가를 받았고요',
        de: 'Mein gefährdetes Schneeleopardenpaar hat zwei Jungtiere bekommen, die beide für das Auswilderungsprogramm freigegeben wurden — und mein Arktiswolfgehege hat endlich eine Fünf-Sterne-Wohlfahrtsbewertung erhalten',
        type: 'zoo',
      },
      {
        en: 'I cleared an emergency queue in under ten minutes, diagnosed a staff-shortage bottleneck in Cardiology, hired two new surgeons, and profits are up 40% from last month',
        zh: '我在十分钟内清空了急诊队列，诊断出心脏科的人手短缺瓶颈，招聘了两名新外科医生，本月利润提升了 40%',
        zhTW: '我在十分鐘內清空了急診隊列，診斷出心臟科的人手短缺瓶頸，招聘了兩名新外科醫生，本月利潤提升了 40%',
        ja: '10分以内に救急の待ち行列を解消して、心臓科の人手不足ボトルネックを診断して、新しい外科医を2人雇って、今月の利益が40%アップした',
        ko: '10분 안에 응급 대기열을 해소하고, 심장내과의 인력 부족 병목을 진단하고, 새 외과의 2명을 채용해서, 이번 달 수익이 40% 올랐어요',
        de: 'Ich habe eine Notfallwarteschlange in unter zehn Minuten geleert, einen Personalengpass in der Kardiologie diagnostiziert, zwei neue Chirurgen eingestellt, und der Gewinn ist um 40% gestiegen',
        type: 'hospital',
      },
      {
        en: 'My new hypercoaster just hit a 97% excitement rating, guests are screaming on the final drop, and the park photography spots I designed are filling up with happy visitors',
        zh: '我的新超级过山车刚刚获得 97% 的刺激评级，游客在最后的下坡处尖叫，我设计的公园拍照点挤满了快乐的游客',
        zhTW: '我的新超級雲霄飛車剛剛獲得 97% 的刺激評級，遊客在最後的下坡處尖叫，我設計的公園拍照點擠滿了快樂的遊客',
        ja: '新しいハイパーコースターが興奮度97%を叩き出して、最後のドロップでゲストが叫んでいて、自分がデザインした撮影スポットには幸せそうな来場者が溢れている',
        ko: '새로운 하이퍼코스터가 흥분도 97% 달성, 마지막 드롭에서 손님들이 소리를 지르고 있고, 내가 설계한 포토존은 행복한 방문객으로 가득 차 있어요',
        de: 'Mein neuer Hypercoaster hat gerade eine 97% Aufregungsbewertung erreicht, Gäste schreien beim letzten Abfall, und die Fotospots, die ich entworfen habe, füllen sich mit glücklichen Besuchern',
        type: 'coaster',
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
  campus: {
    title_en: 'Two Point Campus',
    title_zh: 'Two Point Campus',
    title_zhTW: 'Two Point Campus',
    title_ja: 'Two Point Campus',
    title_ko: 'Two Point Campus',
    title_de: 'Two Point Campus',
    emoji: '🎓',
    tag_en: 'Run a university full of students learning absurd courses — from Knight School to Spy School — in a charming, systems-rich management sim available on Game Pass',
    tag_zh: '经营一所学生学习荒诞课程的大学——从骑士学校到间谍学校——在 Game Pass 上可玩的迷人、系统丰富的管理模拟',
    tag_zhTW: '經營一所學生學習荒誕課程的大學——從騎士學校到間諜學校——在 Game Pass 上可玩的迷人、系統豐富的管理模擬',
    tag_ja: '騎士学校からスパイ学校まで、ぶっとんだ授業が揃う大学を経営するシム——Game Passで遊べる、魅力たっぷりのシステム豊富な経営シミュレーション',
    tag_ko: '기사 학교부터 스파이 학교까지, 황당한 강좌가 가득한 대학을 운영하는——Game Pass에서 즐길 수 있는 매력적이고 시스템이 풍부한 경영 시뮬',
    tag_de: 'Leite eine Universität voller Studierender mit absurden Kursen — von der Ritterschule bis zur Spionschule — in einem charmanten, systemreichen Management-Sim auf Game Pass',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, PS5, Xbox, Game Pass — about $30 new, often on sale for $10-15',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——新品约 30 美元，经常特价 10-15 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——全新約 30 美元，常特價 10-15 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Game Pass ——新品約3,500円、セール時は1,000〜1,500円前後',
    platform_ko: '구매 가능 플랫폼：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——정가 약 40,000원, 세일 시 10,000~15,000원',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PS4, PS5, Xbox, Game Pass — ca. 30€ neu, oft im Angebot für 10-15€',
    why_en:
      "Two Point Campus (2022) is the follow-up to Two Point Hospital — a management simulator set in a series of eccentric university campuses where students enroll in courses like Knight School (literally medieval knight training), Scientography (photography of science), and Gastronomy (cooking as academic pursuit). You design campus layouts, manage staff (teachers, assistants, janitors), keep students happy through clubs and social spaces, and optimize a research tree that unlocks new courses and upgrades. The humor is constant — student ailments, staff personalities, and course descriptions are all written with genuine wit. The management depth is real: you balance enrollment numbers, student satisfaction, staff wages, and grant applications across multiple campus areas. Available on Xbox Game Pass, it is one of the easiest management sims to get into for farming game players who love the daily optimization loop of Stardew Valley's farm management — but applied to a campus instead of crops. Metacritic score approximately 80-84 across platforms.",
    why_zh:
      'Two Point Campus（2022 年）是 Two Point Hospital 的续作——一款以一系列古怪大学校园为背景的管理模拟，学生可以参加骑士学校（字面意思的中世纪骑士训练）、科学摄影（科学摄影学）和美食学（作为学术追求的烹饪）等课程。你设计校园布局，管理员工（教师、助理、清洁工），通过社团和社交空间让学生快乐，并优化解锁新课程和升级的研究树。幽默无处不在——学生病情、员工个性和课程描述都有真正的才智。管理深度是真实的：你需要在多个校园区域平衡招生人数、学生满意度、员工薪资和助学金申请。Xbox Game Pass 可玩，是农场游戏玩家最容易上手的管理模拟之一。',
    why_zhTW:
      'Two Point Campus（2022 年）是 Two Point Hospital 的續作——一款以一系列古怪大學校園為背景的管理模擬，學生可以參加騎士學校（字面意思的中世紀騎士訓練）、科學攝影（科學攝影學）和美食學（作為學術追求的烹飪）等課程。你設計校園布局，管理員工（教師、助理、清潔工），透過社團和社交空間讓學生快樂，並優化解鎖新課程和升級的研究樹。幽默無處不在——學生病情、員工個性和課程描述都有真正的才智。管理深度是真實的：你需要在多個校園區域平衡招生人數、學生滿意度、員工薪資和助學金申請。Xbox Game Pass 可玩，是農場遊戲玩家最容易上手的管理模擬之一。',
    why_ja:
      'Two Point Campus（2022年）はTwo Point Hospitalの続編——中世の騎士訓練「騎士学校」、科学写真術「サイエンタグラフィー」、料理を学術的に追求する「美食学」といった突拍子もないコースが揃う変わった大学キャンパスを舞台にした管理シムです。キャンパスのレイアウトを設計し、スタッフ（教師・アシスタント・清掃員）を管理し、部活や交流スペースで学生を幸せにしながら、新コースを解放する研究ツリーを最適化していきます。ユーモアは随所に——学生の奇病、スタッフの個性、コースの説明まで、本物のウィットが詰まっています。Game Passで遊べるので、スターデューバレーの農場管理ループが好きなプレイヤーに特にオススメ。メタクリティックスコアは約80〜84点。',
    why_ko:
      'Two Point Campus（2022）는 Two Point Hospital의 후속작으로, 중세 기사 훈련인 「기사 학교」, 과학 사진 촬영인 「사이언타그라피」, 요리를 학문으로 추구하는 「미식학」 등 황당한 강좌들이 가득한 대학 캠퍼스를 배경으로 한 경영 시뮬레이션입니다. 캠퍼스 레이아웃을 설계하고, 교사·보조·청소부 등 직원을 관리하며, 동아리와 소셜 공간으로 학생들을 행복하게 하면서 새 강좌를 해금하는 연구 트리를 최적화합니다. 유머가 곳곳에 넘쳐——학생들의 병, 직원 개성, 강좌 설명까지 진짜 위트가 가득합니다. Xbox Game Pass에서 즐길 수 있어 접근성도 좋아요. 스타듀 밸리의 농장 관리 루프를 좋아하는 플레이어에게 특히 추천합니다. 메타크리틱 점수 약 80~84점.',
    why_de:
      'Two Point Campus (2022) ist der Nachfolger von Two Point Hospital — eine Management-Simulation auf einer Reihe skurriler Uni-Campusse, auf denen Studenten Kurse wie Ritterschule (buchstäblich mittelalterliches Rittertraining), Wissenschaftsfotografie und Gastronomie (Kochen als akademisches Fach) belegen. Du gestaltest Campus-Layouts, managst Personal (Lehrer, Assistenten, Hausmeister), hältst Studierende durch Clubs und Sozialräume glücklich und optimierst einen Forschungsbaum, der neue Kurse freischaltet. Der Humor ist allgegenwärtig — Studentenleiden, Persönlichkeiten des Personals und Kursbeschreibungen sind alle mit echtem Witz geschrieben. Auf Xbox Game Pass verfügbar, ist es einer der einsteigerfreundlichsten Management-Sims für Farming-Game-Fans. Metacritic-Score ca. 80-84 auf allen Plattformen.',
    tip_en: "Build a Sports Hall and a Student Union early — these two buildings raise campus-wide happiness passively and pay for themselves in enrollment. Don't try to run multiple campuses simultaneously until you understand the staff-to-room ratio: one teacher per one active classroom is the baseline. Research the Gnarly Gnome grant early — it funds campus expansion and unlocks faster than most players expect.",
    tip_zh: '早期建造体育馆和学生会——这两栋建筑可以被动提升全校幸福感并通过招生回本。在理解员工与房间比例之前，不要尝试同时运营多个校区：一位教师对应一间活跃教室是基准。早期研究"Gnarly Gnome 助学金"——它资助校园扩张，解锁速度比大多数玩家预期的快。',
    tip_zhTW: '早期建造體育館和學生會——這兩棟建築可以被動提升全校幸福感並透過招生回本。在理解員工與房間比例之前，不要嘗試同時運營多個校區：一位教師對應一間活躍教室是基準。早期研究「Gnarly Gnome 助學金」——它資助校園擴張，解鎖速度比大多數玩家預期的快。',
    tip_ja: '序盤にスポーツホールと学生会館を建てましょう——この2つはキャンパス全体の幸福度を受動的に上げて、入学者数で元が取れます。スタッフと部屋の比率を理解するまで複数キャンパスを同時運営しないこと：教師1人に対して教室1室が基準です。「Gnarly Gnomeグラント」を早めに研究しましょう——キャンパス拡張の資金になり、ほとんどのプレイヤーが思うより早く解放できます。',
    tip_ko: '초반에 스포츠홀과 학생회관을 건설하세요——이 두 건물은 전교 행복도를 수동적으로 높여주고 입학자 수로 비용을 회수할 수 있어요. 직원 대 강의실 비율을 이해하기 전까지는 여러 캠퍼스를 동시에 운영하지 마세요: 교사 1명에 강의실 1개가 기준입니다. 「Gnarly Gnome 장학금」을 일찍 연구하세요——대부분의 플레이어가 예상하는 것보다 빨리 캠퍼스 확장 자금을 마련할 수 있어요.',
    tip_de: 'Baue früh eine Sporthalle und eine Studentenvereinigung — diese zwei Gebäude steigern die campusweite Zufriedenheit passiv und rentieren sich durch steigende Einschreibungen. Versuche nicht, mehrere Campusse gleichzeitig zu führen, bis du das Mitarbeiter-zu-Raum-Verhältnis verstehst: ein Lehrer pro aktivem Klassenzimmer ist die Richtlinie. Forsche früh nach dem Gnarly-Gnome-Stipendium — es finanziert die Campuserweiterung und schaltet sich schneller frei, als die meisten Spieler erwarten.',
  },
  zoo: {
    title_en: 'Planet Zoo',
    title_zh: 'Planet Zoo',
    title_zhTW: 'Planet Zoo',
    title_ja: 'Planet Zoo',
    title_ko: 'Planet Zoo',
    title_de: 'Planet Zoo',
    emoji: '🦁',
    tag_en: 'The most detailed zoo simulator ever made — design biome-accurate habitats for 300+ real animal species, run conservation breeding programs, and build breathtaking parks',
    tag_zh: '有史以来最详细的动物园模拟——为 300+ 种真实动物设计符合生物群落的栖息地，运行保育繁育计划，建造令人叹为观止的公园',
    tag_zhTW: '有史以來最詳細的動物園模擬——為 300+ 種真實動物設計符合生物群落的棲息地，運行保育繁育計劃，建造令人嘆為觀止的公園',
    tag_ja: '史上最もリアルな動物園シム——300種以上の実在動物のために生息地を設計し、保全繁殖プログラムを運営して、圧巻の公園を作り上げよう',
    tag_ko: '역대 가장 세밀한 동물원 시뮬레이션——300종 이상의 실제 동물을 위한 서식지를 설계하고, 보전 번식 프로그램을 운영하고, 숨막히는 공원을 만들어보세요',
    tag_de: 'Der detaillierteste Zoo-Simulator aller Zeiten — entwirf biotopgenaue Lebensräume für 300+ echte Tierarten, führe Schutzzuchtprogramme und baue atemberaubende Parks',
    platform_en: 'Available on: PC (Steam) only — about $45. DLC packs add additional animal species. Often on sale for $10-15.',
    platform_zh: '可在以下平台获取：仅 PC（Steam）——约 45 美元。DLC 包添加额外动物物种。经常特价 10-15 美元。',
    platform_zhTW: '可在以下平台取得：僅 PC（Steam）——約 45 美元。DLC 包添加額外動物物種。常特價 10-15 美元。',
    platform_ja: '対応プラットフォーム：PC（Steam）のみ——約5,000円。DLCパックで動物種が追加されます。セール時は1,000〜1,500円前後。',
    platform_ko: '구매 가능 플랫폼：PC（Steam） 전용——약 60,000원. DLC 팩으로 동물 종 추가 가능. 세일 시 10,000~15,000원.',
    platform_de: 'Erhältlich auf: Nur PC (Steam) — ca. 45€. DLC-Packs fügen zusätzliche Tierarten hinzu. Oft im Angebot für 10-15€.',
    why_en:
      "Planet Zoo (2019) is Frontier Developments' masterpiece zoo simulation — a game so detailed in its animal welfare systems that it has been used as an educational reference for zoo design principles. Each animal species has authentic behavioral needs (specific terrain, social group sizes, enrichment items, water depth), and meeting those needs drives your conservation rating and animal happiness. The habitat building system is fully modular — you sculpt terrain, place vegetation, design water features, and connect exhibits with guest paths to create habitats that look genuinely naturalistic. The game includes 300+ real animal species at base, with DLC packs adding dozens more. A full conservation program lets you breed animals for wild release, adding a moral dimension beyond pure profit management. The Steam Workshop is enormous — thousands of free community-built habitat blueprints, scenery pieces, and full park layouts. For farming game players who love the crafting and design elements of Stardew Valley or Animal Crossing: the habitat creation in Planet Zoo scratches a very similar itch at enormous scale. PC only, but runs well on mid-range hardware.",
    why_zh:
      'Planet Zoo（2019 年）是 Frontier Developments 的杰作动物园模拟——一款动物福利系统如此详细，以至于被用作动物园设计原则的教育参考。每种动物物种都有真实的行为需求（特定地形、社群规模、丰容物品、水深），满足这些需求可提升你的保育评级和动物幸福感。栖息地建造系统完全模块化——你雕刻地形、放置植被、设计水景，并用客人通道连接展区，创造真正自然的栖息地外观。基础游戏包含 300+ 种真实动物，DLC 包添加更多。完整的保育计划让你繁育动物以供野外放归，增添了超越纯利润管理的道德维度。Steam 创意工坊规模庞大——数千个免费的社区构建栖息地蓝图、装饰物品和完整公园布局。仅 PC 版，但在中档硬件上运行良好。',
    why_zhTW:
      'Planet Zoo（2019 年）是 Frontier Developments 的傑作動物園模擬——一款動物福利系統如此詳細，以至於被用作動物園設計原則的教育參考。每種動物物種都有真實的行為需求（特定地形、社群規模、豐容物品、水深），滿足這些需求可提升你的保育評級和動物幸福感。棲息地建造系統完全模組化——你雕刻地形、放置植被、設計水景，並用客人通道連接展區，創造真正自然的棲息地外觀。基礎遊戲包含 300+ 種真實動物，DLC 包添加更多。完整的保育計劃讓你繁育動物以供野外放歸，增添了超越純利潤管理的道德維度。Steam 創意工坊規模龐大——數千個免費的社區構建棲息地藍圖、裝飾物品和完整公園布局。僅 PC 版，但在中檔硬體上運行良好。',
    why_ja:
      'Planet Zoo（2019年）はFrontier Developmentsの傑作動物園シム——動物福祉システムがあまりにも詳細で、実際の動物園設計の教育教材として使われるほどです。各動物種には固有の行動ニーズ（地形・群れの規模・エンリッチメントアイテム・水深）があり、それを満たすことで保全評価と動物の幸福度が向上します。生息地建設はフルモジュール式——地形を成形し、植生を配置し、水景を設計し、来場者の通路でエリアをつなぐことで、本物の自然に見える生息地が完成します。基本ゲームに300種以上の実在動物が含まれ、DLCでさらに追加可能。保全プログラムでは野生放流のために動物を繁殖させる道徳的な要素もあります。Steam ワークショップには何千もの無料コミュニティ製ブループリントが。スターデューバレーやあつ森のクラフト・デザイン要素が好きなら、Planet Zooはその欲求を圧倒的なスケールで満たしてくれます。PC専用ですが、中程度のスペックで十分動作します。',
    why_ko:
      'Planet Zoo（2019）는 Frontier Developments의 걸작 동물원 시뮬레이션으로——동물 복지 시스템이 너무도 세밀해서 실제 동물원 설계 원칙의 교육 참고 자료로 활용될 정도입니다. 각 동물 종마다 고유한 행동 요구사항（지형, 무리 규모, 풍부화 아이템, 수심）이 있으며, 이를 충족하면 보전 등급과 동물 행복도가 올라갑니다. 서식지 건설 시스템은 완전 모듈형——지형을 다듬고, 식생을 배치하고, 수경 시설을 설계하고, 방문객 통로로 구역을 연결해 진짜 자연처럼 보이는 서식지를 완성할 수 있어요. 기본 게임에 300종 이상의 실제 동물이 포함되어 있고 DLC로 더 추가됩니다. 보전 프로그램으로 야생 방류를 위해 동물을 번식시키는 도덕적 차원도 있고요. 스팀 창작마당에는 수천 개의 무료 커뮤니티 제작 블루프린트가 있습니다. 스타듀 밸리나 모여봐요 동물의 숲의 크래프팅·디자인 요소를 좋아한다면, Planet Zoo는 그 욕구를 압도적인 규모로 채워줄 거예요. PC 전용이지만 중급 사양에서도 잘 돌아가요.',
    why_de:
      "Planet Zoo (2019) ist Frontier Developments' Meisterwerk-Zoosimulation — ein Spiel, dessen Tierwohl-Systeme so detailliert sind, dass sie als Bildungsreferenz für Zoodesign-Prinzipien verwendet werden. Jede Tierart hat authentische Verhaltensbedürfnisse (spezifisches Terrain, Gruppengrößen, Bereicherungsobjekte, Wassertiefe), und deren Erfüllung treibt deine Schutzbewertung und das Tierglück an. Das Habitatbausystem ist vollständig modular — du formst Terrain, platzierst Vegetation, entwirfst Wasseranlagen und verbindest Gehege mit Besucherwegen, um wirklich naturalistisch aussehende Lebensräume zu schaffen. Das Basisspiel umfasst 300+ echte Tierarten, mit DLC-Packs kommen noch mehr hinzu. Ein vollständiges Schutzprogramm ermöglicht die Zucht von Tieren zur Auswilderung, was eine moralische Dimension über die reine Gewinnverwaltung hinaus hinzufügt. Der Steam Workshop ist riesig — tausende kostenlose Community-Habitat-Blaupausen. PC-exklusiv, läuft aber gut auf mittlerer Hardware.",
    tip_en: "Use the Steam Workshop from your very first session — download three or four well-rated habitat blueprints for the animals you plan to feature and place them as your starting exhibits. This lets you focus on learning the guest path and finance systems before tackling habitat design yourself. Always check the animal welfare panel before adding new animals: unmet terrain or social needs are invisible until you look, and unhappy animals tank your conservation rating fast.",
    tip_zh: '从第一次游戏就使用 Steam 创意工坊——下载三四个评分良好的栖息地蓝图，作为你的起始展区。这让你在自己尝试栖息地设计之前，先专注于学习客人路线和财务系统。添加新动物前务必检查动物福利面板：未满足的地形或社群需求是不可见的，而不快乐的动物会迅速拉低你的保育评级。',
    tip_zhTW: '從第一次遊戲就使用 Steam 創意工坊——下載三四個評分良好的棲息地藍圖，作為你的起始展區。這讓你在自己嘗試棲息地設計之前，先專注於學習客人路線和財務系統。添加新動物前務必檢查動物福利面板：未滿足的地形或社群需求是不可見的，而不快樂的動物會迅速拉低你的保育評級。',
    tip_ja: '最初のセッションからSteam ワークショップを使いましょう——展示する予定の動物用に評価の高い生息地ブループリントを3〜4個ダウンロードして、最初の展示に使う。こうすることで、自分で生息地デザインに挑む前に、来場者の動線と財務システムの学習に集中できます。新しい動物を追加する前は必ず動物福祉パネルを確認して——未充足の地形や群れのニーズは見えにくく、不幸な動物はあっという間に保全評価を下げます。',
    tip_ko: '첫 번째 세션부터 스팀 창작마당을 활용하세요——전시하려는 동물에 대해 평점 높은 서식지 블루프린트를 3~4개 다운로드해서 첫 번째 전시관으로 사용하세요. 이렇게 하면 직접 서식지를 디자인하기 전에 방문객 동선과 재무 시스템 학습에 집중할 수 있어요. 새 동물을 추가하기 전에는 반드시 동물 복지 패널을 확인하세요: 충족되지 않은 지형이나 무리 요구사항은 눈에 보이지 않고, 불행한 동물은 순식간에 보전 평가를 떨어뜨려요.',
    tip_de: 'Nutze den Steam Workshop von deiner allerersten Sitzung an — lade drei oder vier gut bewertete Habitat-Blaupausen für die Tiere herunter, die du zeigen möchtest, und platziere sie als Startgehege. So kannst du dich auf das Lernen der Besucherweg- und Finanzsysteme konzentrieren, bevor du selbst Habitate entwirfst. Überprüfe immer das Tierwohl-Panel, bevor du neue Tiere hinzufügst: Unerfüllte Terrain- oder Sozialbedürfnisse sind unsichtbar, und unglückliche Tiere senken deine Schutzbewertung schnell.',
  },
  hospital: {
    title_en: 'Two Point Hospital',
    title_zh: 'Two Point Hospital',
    title_zhTW: 'Two Point Hospital',
    title_ja: 'Two Point Hospital',
    title_ko: 'Two Point Hospital',
    title_de: 'Two Point Hospital',
    emoji: '🏥',
    tag_en: 'A comedy hospital management sim where every patient has an absurdly funny illness — balance staff, rooms, and queues across dozens of chaotic hospitals',
    tag_zh: '一款喜剧医院管理模拟，每位病人都有荒诞可笑的病症——在数十家混乱医院中平衡员工、房间和队列',
    tag_zhTW: '一款喜劇醫院管理模擬，每位病人都有荒誕可笑的病症——在數十家混亂醫院中平衡員工、房間和隊列',
    tag_ja: 'すべての患者に笑えるほど突拍子もない病気がいる、コメディ病院管理シム——何十もの混沌とした病院でスタッフ・部屋・待ち列のバランスを取ろう',
    tag_ko: '모든 환자가 황당한 병을 가진 코미디 병원 경영 시뮬레이션——수십 개의 혼란스러운 병원에서 직원, 룸, 대기열의 균형을 맞춰보세요',
    tag_de: 'Ein Comedy-Krankenhausmanager, in dem jeder Patient eine absurd lustige Krankheit hat — balanciere Personal, Räume und Warteschlangen in Dutzenden chaotischer Krankenhäuser',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, PS5, Xbox, Xbox Game Pass — about $25 new, often on sale for $5-10',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Xbox Game Pass——新品约 25 美元，经常特价 5-10 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Xbox Game Pass——新品約 25 美元，常特價 5-10 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Xbox Game Pass——新品約2,800円、セール時は600〜1,100円前後',
    platform_ko: '구매 가능 플랫폼：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Xbox Game Pass——정가 약 35,000원, 세일 시 7,000~14,000원',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PS4, PS5, Xbox, Xbox Game Pass — ca. 25€ neu, oft im Angebot für 5-10€',
    why_en:
      "Two Point Hospital (2018) is the spiritual successor to the legendary Theme Hospital (1997) — a management simulator where you build and run a series of comedy hospitals treating patients with hilariously absurd conditions (Lightheadedness, Jest Infection, Fractured Ego, Alien DNA). Each hospital introduces new mechanics and space constraints, forcing you to rethink your hospital design. The management systems are genuinely deep: you hire staff with different skill levels and training needs, design room layouts for maximum efficiency, manage a reputation system that affects new patient intake, and run a marketing program to attract specific patient types. Queue management is the core skill — a backed-up corridor means patients leave unhappy and your rating drops. Available on Xbox Game Pass, it is extremely well-paced with 15+ distinct hospital scenarios that introduce mechanics gradually. Metacritic score 85 on PC. For players who loved the daily routine and optimization loop of farming games — Two Point Hospital takes that loop and adds the chaos of managing a living, breathing institution where every decision has cascading consequences.",
    why_zh:
      'Two Point Hospital（2018 年）是传奇游戏 Theme Hospital（1997 年）的精神续作——一款管理模拟，你建造和运营一系列喜剧医院，治疗患有荒诞病症的病人（头晕目眩症、小丑感染、自我骨折、外星 DNA）。每家医院引入新的机制和空间限制，迫使你重新思考医院设计。管理系统真正深入：你雇用具有不同技能水平和培训需求的员工，设计最高效的房间布局，管理影响新病人入院的声誉系统，并运行营销计划来吸引特定类型的病人。队列管理是核心技能——堵塞的走廊意味着病人不满离开，你的评级下降。Xbox Game Pass 可玩，有 15+ 个不同医院场景逐步引入机制。PC 版 Metacritic 评分 85 分。',
    why_zhTW:
      'Two Point Hospital（2018 年）是傳奇遊戲 Theme Hospital（1997 年）的精神續作——一款管理模擬，你建造和運營一系列喜劇醫院，治療患有荒誕病症的病人（頭昏目眩症、小丑感染、自我骨折、外星 DNA）。每家醫院引入新的機制和空間限制，迫使你重新思考醫院設計。管理系統真正深入：你雇用具有不同技能水平和培訓需求的員工，設計最高效的房間布局，管理影響新病人入院的聲譽系統，並運行行銷計劃來吸引特定類型的病人。隊列管理是核心技能——堵塞的走廊意味著病人不滿離開，你的評級下降。Xbox Game Pass 可玩，有 15+ 個不同醫院場景逐步引入機制。PC 版 Metacritic 評分 85 分。',
    why_ja:
      'Two Point Hospital（2018年）は伝説のゲーム「Theme Hospital」（1997年）の精神的続編——コメディ病院を建てて経営し、頭がくらくらする病（「ライトヘッデドネス」）、ジェスト感染、自我骨折、エイリアンDNAなど突拍子もない病気の患者を治療する管理シムです。病院ごとに新しいメカニクスと空間制限があり、病院設計を毎回考え直す必要があります。管理システムは本格的——異なるスキルレベルと研修ニーズを持つスタッフを雇い、効率的な部屋レイアウトを設計し、新患者の受け入れに影響する評判システムを管理し、特定タイプの患者を集めるマーケティングを展開します。Xbox Game Passで遊べて、15以上の病院シナリオが段階的にメカニクスを教えてくれます。PCのMetacriticスコアは85点。農場ゲームの日常最適化ループが好きな人にぴったりの一本です。',
    why_ko:
      'Two Point Hospital（2018）은 전설적인 게임 Theme Hospital（1997）의 정신적 후속작——코미디 병원을 건설하고 운영하며 두통증（Lightheadedness）, 광대 감염, 자아 골절, 외계인 DNA 등 황당한 병을 가진 환자들을 치료하는 경영 시뮬레이션입니다. 병원마다 새로운 메커니즘과 공간 제약이 도입되어 병원 설계를 매번 새로 생각해야 합니다. 관리 시스템이 진짜 깊어요——다양한 기술 수준과 훈련 필요성을 가진 직원을 고용하고, 최고 효율의 룸 레이아웃을 설계하며, 새 환자 유입에 영향을 미치는 평판 시스템을 관리하고, 특정 유형의 환자를 유치하는 마케팅 프로그램을 운영합니다. Xbox Game Pass에서 즐길 수 있으며 15개 이상의 병원 시나리오가 메커니즘을 점진적으로 소개합니다. PC 메타크리틱 점수 85점. 농장 게임의 일상 최적화 루프를 좋아하는 플레이어에게 딱 맞는 게임입니다.',
    why_de:
      'Two Point Hospital (2018) ist der spirituelle Nachfolger des legendären Theme Hospital (1997) — eine Management-Simulation, in der du eine Reihe von Comedy-Krankenhäusern baust und betreibst, die Patienten mit herrlich absurden Krankheiten behandeln (Schwindel, Witzeinfekt, Ego-Bruch, Alien-DNA). Jedes Krankenhaus führt neue Mechaniken und Platzbeschränkungen ein und zwingt dich, dein Krankenhausdesign zu überdenken. Die Managementsysteme sind wirklich tiefgründig: Du stellst Personal mit unterschiedlichen Fähigkeitsstufen und Schulungsbedarf ein, gestaltest Raumlayouts für maximale Effizienz, managst ein Reputationssystem und führst Marketingkampagnen durch. Auf Xbox Game Pass verfügbar mit 15+ Krankenhausszenarien. Metacritic-Score 85 auf PC.',
    tip_en: "The most common mistake is under-hiring janitors early — hire two per ten rooms from the start and upgrade their maintenance skill first. Every room needs a radiator or the room comfort score drops, which feeds into patient satisfaction. Never skip Marketing: one marketing campaign targeting your highest-capacity room pays back within a month of game time. Staff training is the long-term investment that separates good hospitals from great ones.",
    tip_zh: '最常见的错误是早期清洁工雇用不足——从一开始就每十间房雇用两名，并首先升级他们的维护技能。每间房都需要暖气片，否则房间舒适度评分下降，进而影响病人满意度。永远不要跳过营销：一个针对容量最高房间的营销活动在游戏时间一个月内即可回本。员工培训是区分好医院和优秀医院的长期投资。',
    tip_zhTW: '最常見的錯誤是早期清潔工雇用不足——從一開始就每十間房雇用兩名，並首先升級他們的維護技能。每間房都需要暖氣片，否則房間舒適度評分下降，進而影響病人滿意度。永遠不要跳過行銷：一個針對容量最高房間的行銷活動在遊戲時間一個月內即可回本。員工培訓是區分好醫院和優秀醫院的長期投資。',
    tip_ja: '序盤のよくあるミスは清掃員の雇用不足——最初から10部屋に対して2人雇って、まず彼らのメンテナンススキルをアップグレードしましょう。すべての部屋にラジエーターが必要です——なければ部屋の快適スコアが下がり、患者満足度に影響します。マーケティングは絶対にスキップしないこと：最も収容人数の多い部屋をターゲットにしたキャンペーンはゲーム内で1ヶ月で元が取れます。スタッフ研修は、良い病院と素晴らしい病院を分ける長期投資です。',
    tip_ko: '가장 흔한 실수는 초반에 청소부를 너무 적게 고용하는 것이에요——처음부터 방 10개당 2명을 고용하고 먼저 유지보수 스킬을 업그레이드하세요. 모든 방에 라디에이터가 필요합니다——없으면 방 편안함 점수가 떨어지고 환자 만족도에 영향을 미쳐요. 마케팅은 절대 건너뛰지 마세요: 수용 인원이 가장 많은 방을 대상으로 한 마케팅 캠페인은 게임 내 한 달 안에 본전을 뽑아요. 직원 교육은 좋은 병원과 훌륭한 병원을 구분하는 장기 투자입니다.',
    tip_de: 'Der häufigste Fehler ist es, früh zu wenig Hausmeister einzustellen — stelle von Anfang an zwei pro zehn Räume ein und steigere zuerst ihre Wartungsfähigkeit. Jeder Raum braucht einen Heizkörper, sonst sinkt die Raumkomfortbewertung, was die Patientenzufriedenheit beeinträchtigt. Überspringe nie das Marketing: eine Marketingkampagne für deinen Raum mit der höchsten Kapazität zahlt sich innerhalb eines Spielmonats aus. Mitarbeiterschulung ist die langfristige Investition, die gute von großartigen Krankenhäusern trennt.',
  },
  coaster: {
    title_en: 'Planet Coaster 2',
    title_zh: 'Planet Coaster 2',
    title_zhTW: 'Planet Coaster 2',
    title_ja: 'Planet Coaster 2',
    title_ko: 'Planet Coaster 2',
    title_de: 'Planet Coaster 2',
    emoji: '🎢',
    tag_en: 'Design rollercoasters by hand, build water parks, and sculpt entire theme parks from scratch — the most creatively free management sim available in 2024',
    tag_zh: '亲手设计过山车、建造水上乐园、从零打造整个主题公园——2024 年最有创意自由的管理模拟',
    tag_zhTW: '親手設計雲霄飛車、建造水上樂園、從零打造整個主題公園——2024 年最有創意自由的管理模擬',
    tag_ja: 'コースターを自分で設計して、ウォーターパークを作って、テーマパーク全体をゼロから作り上げよう——2024年最もクリエイティブな自由度を誇る管理ゲーム',
    tag_ko: '직접 롤러코스터를 설계하고, 워터파크를 만들고, 전체 테마파크를 처음부터 구축하세요——2024년 가장 창의적 자유가 넘치는 경영 시뮬',
    tag_de: 'Entwirf Achterbahnen von Hand, baue Wasserparks und gestalte ganze Themenparks von Grund auf — der kreativ freieste Management-Sim des Jahres 2024',
    platform_en: 'Available on: PC (Steam), Xbox Series X/S, PS5 — about $50. Full release November 2024.',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox Series X/S、PS5——约 50 美元。2024 年 11 月正式发行。',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Xbox Series X/S、PS5——約 50 美元。2024 年 11 月正式發行。',
    platform_ja: '対応プラットフォーム：PC（Steam）、Xbox Series X/S、PS5——約5,800円。2024年11月正式リリース。',
    platform_ko: '구매 가능 플랫폼：PC（Steam）、Xbox Series X/S、PS5——약 70,000원. 2024년 11월 정식 출시.',
    platform_de: 'Erhältlich auf: PC (Steam), Xbox Series X/S, PS5 — ca. 50€. Vollständige Veröffentlichung November 2024.',
    why_en:
      "Planet Coaster 2 (2024) is the sequel to Frontier's beloved theme park management simulator, and it is by far the most creatively ambitious management game on this list. The centrepiece is the custom coaster builder: you place track segments by hand, control every curve and banking angle, and test the G-force physics before opening to guests. New in the sequel: full water park support with water slides, wave pools, and lazy rivers; dive coasters that plunge riders into water; and a redesigned terrain sculpting system that makes landscapes feel genuinely organic. The management layer — guest pathing, finance, staff, maintenance — sits underneath the creativity tools and can be played seriously or ignored entirely in sandbox mode with unlimited money. The Steam Workshop is already filling with extraordinary community-built parks and blueprints. For farming game players who love the design and decoration elements of Animal Crossing or Stardew Valley's farm layout planning: Planet Coaster 2's park building is that same impulse at theme park scale — the joy of seeing guests react to something you built from nothing.",
    why_zh:
      'Planet Coaster 2（2024 年）是 Frontier 备受喜爱的主题公园管理模拟的续作，是这个列表中目前为止最具创意野心的管理游戏。核心是自定义过山车建造器：你手动放置轨道段，控制每个弯道和倾斜角度，并在对游客开放前测试 G 力物理效果。续作新增：完整的水上乐园支持，包括水滑梯、波浪池和懒人河；俯冲过山车将乘客冲入水中；以及重新设计的地形雕刻系统，使景观感觉真正有机。管理层——游客路线、财务、员工、维护——位于创意工具之下，可以认真游玩，也可以在无限资金的沙盒模式中完全忽略。Steam 创意工坊已经充满了社区构建的出色公园和蓝图。2024 年 11 月正式发行。',
    why_zhTW:
      'Planet Coaster 2（2024 年）是 Frontier 備受喜愛的主題公園管理模擬的續作，是這個列表中目前為止最具創意野心的管理遊戲。核心是自訂雲霄飛車建造器：你手動放置軌道段，控制每個彎道和傾斜角度，並在對遊客開放前測試 G 力物理效果。續作新增：完整的水上樂園支援，包括水滑梯、波浪池和懶人河；俯衝雲霄飛車將乘客衝入水中；以及重新設計的地形雕刻系統，使景觀感覺真正有機。管理層——遊客路線、財務、員工、維護——位於創意工具之下，可以認真遊玩，也可以在無限資金的沙盒模式中完全忽略。Steam 創意工坊已經充滿了社區構建的出色公園和藍圖。2024 年 11 月正式發行。',
    why_ja:
      'Planet Coaster 2（2024年）はFrontierの人気テーマパーク管理シムの続編で、このリストの中で最もクリエイティブな野心を持つ管理ゲームです。目玉はカスタムコースタービルダー——レールを1本ずつ手で配置し、すべてのカーブとバンク角度を調整し、ゲスト公開前にGフォース物理をテストできます。続編の新要素：水滑り台・波プール・怠惰な川を含む完全なウォーターパークサポート、ライダーを水中に突入させるダイブコースター、そして景観がよりオーガニックに感じられる再設計された地形彫刻システム。管理層（ゲストの動線・財務・スタッフ・メンテナンス）はクリエイティブツールの下にあり、本格的にプレイすることも、無制限の資金を使ったサンドボックスモードで完全に無視することも可能。Steam ワークショップにはすでにコミュニティ製の素晴らしい公園とブループリントが溢れています。あつ森やスターデューバレーのデザイン・配置要素が好きなプレイヤーなら、Planet Coaster 2はその欲求をテーマパーク規模で満たしてくれます。2024年11月正式リリース。',
    why_ko:
      'Planet Coaster 2（2024）는 Frontier의 사랑받는 테마파크 경영 시뮬레이션의 후속작으로, 이 목록에서 단연코 가장 창의적인 야망을 가진 경영 게임입니다. 핵심은 커스텀 코스터 빌더——트랙 세그먼트를 직접 배치하고, 모든 커브와 뱅킹 각도를 조정하며, 손님에게 개방하기 전에 G-포스 물리학을 테스트할 수 있어요. 후속작의 새 요소: 워터슬라이드·파도 풀·느긋한 강을 포함한 완전한 워터파크 지원, 탑승자를 물속으로 돌진시키는 다이브 코스터, 풍경을 더욱 유기적으로 느껴지게 하는 재설계된 지형 조각 시스템. 관리 레이어——손님 동선, 재무, 직원, 유지보수——는 창의 도구 아래에 있으며, 본격적으로 플레이하거나 무한 자금 샌드박스 모드에서 완전히 무시할 수도 있어요. 스팀 창작마당에는 이미 커뮤니티가 만든 훌륭한 공원과 블루프린트가 가득합니다. 2024년 11월 정식 출시.',
    why_de:
      "Planet Coaster 2 (2024) ist der Nachfolger von Frontiers beliebtem Themenpark-Management-Simulator und mit Abstand das kreativ ambitionierteste Management-Spiel auf dieser Liste. Das Herzstück ist der individuelle Achterbahn-Builder: Du platzierst Streckensegmente von Hand, kontrollierst jeden Kurvenwinkel und jede Neigung und testest die G-Kraft-Physik, bevor du für Gäste öffnest. Neu im Nachfolger: vollständige Wasserpark-Unterstützung mit Wasserrutschen, Wellenpools und Faulenzerbächen; Tauch-Achterbahnen, die Fahrer ins Wasser stürzen lassen; und ein überarbeitetes Geländeformungssystem. Die Managementschicht — Gästeführung, Finanzen, Personal, Wartung — liegt unter den Kreativitätswerkzeugen und kann ernst genommen oder im Sandkasten-Modus mit unbegrenztem Geld ignoriert werden. Der Steam Workshop füllt sich bereits mit außergewöhnlichen Community-Parks. Vollständige Veröffentlichung November 2024.",
    tip_en: "Start in Career mode (not sandbox) even if you want maximum creativity — the early career missions teach ride naming, queue decoration, and staff management before the financial challenge ramps up. Decorated queues directly raise ride ratings; never leave a queue path bare. Download one or two community rollercoaster blueprints from the Workshop for your first park to learn what a well-rated coaster looks like, then modify it to understand the builder before designing from scratch.",
    tip_zh: '即使你想要最大创意自由，也从生涯模式（而非沙盒）开始——早期生涯任务在财务挑战升级之前教授游乐设施命名、队列装饰和员工管理。装饰队列直接提升游乐设施评级；永远不要让队列路径空着。从创意工坊下载一两个社区过山车蓝图作为你的第一个公园，了解高评分过山车的样子，然后修改它以理解建造器，再从零开始设计。',
    tip_zhTW: '即使你想要最大創意自由，也從職涯模式（而非沙盒）開始——早期職涯任務在財務挑戰升級之前教授遊樂設施命名、隊列裝飾和員工管理。裝飾隊列直接提升遊樂設施評級；永遠不要讓隊列路徑空著。從創意工坊下載一兩個社區雲霄飛車藍圖作為你的第一個公園，了解高評分雲霄飛車的樣子，然後修改它以理解建造器，再從零開始設計。',
    tip_ja: '最大限の創造性を求めている場合でも、最初はサンドボックスではなくキャリアモードから始めましょう——序盤のキャリアミッションは、財務的な課題が増す前に、アトラクションの命名・待ち列の装飾・スタッフ管理を教えてくれます。装飾された待ち列はアトラクション評価を直接上げます——待ち列の通路を何もない状態にしないこと。最初の公園にはワークショップからコミュニティ製コースターのブループリントを1〜2つダウンロードして、高評価コースターの形を学んでから、ゼロ設計の前にビルダーを理解するために改造してみましょう。',
    tip_ko: '최대한의 창의적 자유를 원하더라도 샌드박스가 아닌 커리어 모드로 시작하세요——초반 커리어 미션은 재무적 도전이 높아지기 전에 놀이기구 이름 붙이기, 대기열 장식, 직원 관리를 가르쳐줍니다. 장식된 대기열은 놀이기구 평점을 직접 높여요——대기열 통로를 비워두지 마세요. 첫 번째 공원에는 창작마당에서 커뮤니티 롤러코스터 블루프린트를 1~2개 다운로드해서 고평점 코스터의 모습을 파악한 뒤, 제로 설계 전에 빌더를 이해하기 위해 수정해보세요.',
    tip_de: 'Beginne im Karrieremodus (nicht im Sandkasten), auch wenn du maximale Kreativität willst — die frühen Karrieremissionen lehren Fahrgeschäft-Benennung, Warteschlangengestaltung und Personalverwaltung, bevor die finanzielle Herausforderung zunimmt. Dekorierte Warteschlangen heben Fahrgeschäft-Bewertungen direkt an; lass einen Warteschlangenweg niemals kahl. Lade ein oder zwei Community-Achterbahnblaupausen aus dem Workshop für deinen ersten Park herunter, um zu sehen, wie eine gut bewertete Achterbahn aussieht, und modifiziere sie dann, um den Builder zu verstehen, bevor du von Grund auf entwirfst.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { campus: 0, zoo: 0, hospital: 0, coaster: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyManagementQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-management-quiz`
    const shareText = getLoc(
      `管理模拟游戏推荐测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My management sim recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `管理模擬遊戲推薦測驗結果：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `管理シムのおすすめ結果：「${result.title_ja}」！${result.tag_ja}。あなたも試してみて：${url}`,
      `경영 시뮬 추천 테스트 결과：「${result.title_ko}」！${result.tag_ko}。나도 해보기：${url}`,
      `Meine Management-Sim-Empfehlung: ${result.title_de} — ${result.tag_de}. Finde deine: ${url}`,
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
              {getLoc('入门建议：', 'Getting started: ', '入門建議：', 'はじめのヒント：', '시작 팁：', 'Einstiegstipp: ')}
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
            '哪款管理模拟游戏最适合你？',
            'Which Management Sim Is Right for Cozy Gamers?',
            '哪款管理模擬遊戲最適合你？',
            'どの管理シムがあなたに合ってる？',
            '어떤 경영 시뮬이 나에게 맞을까?',
            'Welcher Management-Sim passt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从 Two Point Campus、Planet Zoo、Two Point Hospital、Planet Coaster 2 中找到你的游戏',
            '6 questions to match you with Two Point Campus, Planet Zoo, Two Point Hospital, or Planet Coaster 2',
            '6 個問題，從 Two Point Campus、Planet Zoo、Two Point Hospital、Planet Coaster 2 中找到你的遊戲',
            '6つの質問で Two Point Campus、Planet Zoo、Two Point Hospital、Planet Coaster 2 からあなたにぴったりのゲームを見つけよう',
            '6가지 질문으로 Two Point Campus、Planet Zoo、Two Point Hospital、Planet Coaster 2 중 나에게 맞는 게임 찾기',
            '6 Fragen, um das passende Spiel aus Two Point Campus, Planet Zoo, Two Point Hospital oder Planet Coaster 2 zu finden',
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
          '找到我的管理模拟游戏',
          'Find My Management Sim',
          '找到我的管理模擬遊戲',
          '自分に合う管理シムを見つける',
          '나에게 맞는 경영 시뮬 찾기',
          'Meinen Management-Sim finden',
        )}
      </button>
    </div>
  )
}
