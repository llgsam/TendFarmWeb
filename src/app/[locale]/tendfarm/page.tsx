import { WaitlistSection } from '@/components/home/WaitlistSection'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'

function getLoc(locale: string, zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW ?? zh
  if (locale === 'ja') return ja ?? en
  if (locale === 'ko') return ko ?? en
  if (locale === 'de') return de ?? en
  return en
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: getLoc(
      locale,
      'TendFarm App — 用健康数据养一座农场',
      'TendFarm App — Grow a Farm with Your Health Data',
      'TendFarm App — 用健康數據養一座農場',
      'TendFarm App — 健康データで農場を育てる',
      'TendFarm App — 건강 데이터로 농장을 키우세요',
      'TendFarm App — Züchte eine Farm mit deinen Gesundheitsdaten',
    ),
    description: getLoc(
      locale,
      'TendFarm 是一款 iOS 健康农场 App：活动变阳光，睡眠变晨露，生活节律放大一切。正在开发中，开放候补名单。',
      'TendFarm is an iOS health farming app — activity becomes sunlight, sleep becomes dew, and your daily rhythm amplifies everything. In development, waitlist open.',
      'TendFarm 是一款 iOS 健康農場 App：活動變陽光，睡眠變晨露，生活節律放大一切。正在開發中，開放候補名單。',
      'TendFarmはiOS健康農場アプリ。活動が陽光に、睡眠が朝露に変わり、生活リズムがすべてを増幅します。開発中、ウェイトリスト受付中。',
      'TendFarm은 iOS 건강 농장 앱입니다. 활동은 햇빛으로, 수면은 이슬로 바뀌고 생활 리듬이 모든 것을 증폭합니다. 개발 중, 대기자 명단 오픈.',
      'TendFarm ist eine iOS-Gesundheits-Farm-App — Aktivität wird zu Sonnenlicht, Schlaf zu Tau, und dein Tagesrhythmus verstärkt alles. In Entwicklung, Warteliste offen.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tendfarm`,
      languages: buildLanguageAlternates('/tendfarm'),
    },
  }
}

type LocaleText = { zh: string; en: string; zhTW: string; ja: string; ko: string; de: string }

const FARM_DATA: { icon: string; label: LocaleText; desc: LocaleText }[] = [
  {
    icon: '☀️',
    label: { zh: '活动 → 阳光', en: 'Activity → Sunlight', zhTW: '活動 → 陽光', ja: '活動 → 陽光', ko: '활동 → 햇빛', de: 'Aktivität → Sonnenlicht' },
    desc: {
      zh: '你运动的时间段，作物在那段时间长得更快。',
      en: 'When you move, crops in that time slot grow faster.',
      zhTW: '你運動的時間段，作物在那段時間長得更快。',
      ja: '運動した時間帯は、その時間の作物が早く成長します。',
      ko: '운동한 시간대에는 그 시간의 작물이 더 빨리 자랍니다.',
      de: 'Wenn du dich bewegst, wachsen Pflanzen in diesem Zeitfenster schneller.',
    },
  },
  {
    icon: '🌿',
    label: { zh: '睡眠 → 晨露', en: 'Sleep → Morning Dew', zhTW: '睡眠 → 晨露', ja: '睡眠 → 朝露', ko: '수면 → 아침 이슬', de: 'Schlaf → Morgentau' },
    desc: {
      zh: '睡眠质量决定当天收成的充盈程度。',
      en: 'Sleep quality determines how abundant your daily harvest is.',
      zhTW: '睡眠品質決定當天收成的充盈程度。',
      ja: '睡眠の質がその日の収穫の豊かさを決めます。',
      ko: '수면의 질이 그날 수확의 풍성함을 결정합니다.',
      de: 'Die Schlafqualität bestimmt, wie reichhaltig deine tägliche Ernte ausfällt.',
    },
  },
  {
    icon: '🌬️',
    label: { zh: 'HRV / 冥想 → 空气', en: 'HRV / Meditation → Air', zhTW: 'HRV / 冥想 → 空氣', ja: 'HRV / 瞑想 → 空気', ko: 'HRV / 명상 → 공기', de: 'HRV / Meditation → Luft' },
    desc: {
      zh: '心率变异性和冥想记录改善空气质量，让机器更省燃料。',
      en: 'HRV and meditation logs improve air quality, cutting fuel costs.',
      zhTW: '心率變異性和冥想記錄改善空氣品質，讓機器更省燃料。',
      ja: '心拍変動と瞑想の記録が空気の質を改善し、機械の燃料を節約します。',
      ko: '심박 변이도와 명상 기록이 공기 질을 개선해 기계 연료를 절약합니다.',
      de: 'HRV- und Meditationsprotokolle verbessern die Luftqualität und senken die Treibstoffkosten.',
    },
  },
  {
    icon: '🔄',
    label: { zh: '生活节律 → 转化率', en: 'Rhythm → Conversion Rate', zhTW: '生活節律 → 轉化率', ja: '生活リズム → 変換率', ko: '생활 리듬 → 전환율', de: 'Rhythmus → Umwandlungsrate' },
    desc: {
      zh: '作息越规律，健康数据转化为农场效果的效率越高，最多 ×1.12。',
      en: 'The more consistent your routine, the more efficiently health data converts — up to ×1.12.',
      zhTW: '作息越規律，健康數據轉化為農場效果的效率越高，最多 ×1.12。',
      ja: '生活が規則的なほど、健康データが農場効果に変換される効率が上がります——最大×1.12。',
      ko: '생활이 규칙적일수록 건강 데이터가 농장 효과로 전환되는 효율이 높아집니다 — 최대 ×1.12.',
      de: 'Je gleichmäßiger dein Tagesablauf, desto effizienter werden Gesundheitsdaten umgewandelt — bis zu ×1,12.',
    },
  },
  {
    icon: '📈',
    label: { zh: 'LifeExp — 长期成长', en: 'LifeExp — Long-term Growth', zhTW: 'LifeExp — 長期成長', ja: 'LifeExp — 長期的な成長', ko: 'LifeExp — 장기 성장', de: 'LifeExp — Langzeit-Wachstum' },
    desc: {
      zh: '长期健康数据积累为 LifeExp，解锁新作物、新区域和农场风格。',
      en: 'Long-term health data accumulates into LifeExp, unlocking new crops, regions, and styles.',
      zhTW: '長期健康數據積累為 LifeExp，解鎖新作物、新區域和農場風格。',
      ja: '長期的な健康データがLifeExpとして蓄積され、新しい作物・地域・農場スタイルを解放します。',
      ko: '장기 건강 데이터가 LifeExp로 누적되어 새로운 작물, 지역, 농장 스타일을 해금합니다.',
      de: 'Langfristige Gesundheitsdaten sammeln sich als LifeExp an und schalten neue Pflanzen, Regionen und Stile frei.',
    },
  },
]

export default async function TendFarmPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const pick = (t: LocaleText) => getLoc(locale, t.zh, t.en, t.zhTW, t.ja, t.ko, t.de)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">

      {/* Hero */}
      <div className="mb-12 rounded-2xl border border-[#f0a832]/20 bg-[#f0a832]/5 p-8">
        <p className="mb-2 text-xs uppercase tracking-widest text-[#f0a832]">TendFarm App</p>
        <h1 className="mb-4 text-4xl font-bold text-[#e8dcc8]">
          {getLoc(locale, '你去生活，农场替你生长', 'You Live. Your Farm Grows.', '你去生活，農場替你生長', 'あなたは生きる、農場が育つ', '당신은 살아가고, 농장은 자랍니다', 'Du lebst. Deine Farm wächst.')}
        </h1>
        <p className="mb-2 max-w-2xl text-lg leading-relaxed text-[#8a9a7a]">
          {getLoc(
            locale,
            'TendFarm 是一款 iOS + Apple Watch 健康农场 App。你在现实中的活动、睡眠和生活节律，直接驱动游戏里农场的生长速度和收成丰盈度。',
            'TendFarm is an iOS + Apple Watch health farming app. Your real-world activity, sleep, and daily rhythm directly drive how fast your in-game farm grows.',
            'TendFarm 是一款 iOS + Apple Watch 健康農場 App。你在現實中的活動、睡眠和生活節律，直接驅動遊戲裡農場的生長速度和收成豐盈度。',
            'TendFarmはiOS + Apple Watchの健康農場アプリ。現実のあなたの活動・睡眠・生活リズムが、ゲーム内の農場の成長速度と収穫量を直接動かします。',
            'TendFarm은 iOS + Apple Watch 건강 농장 앱입니다. 현실의 활동, 수면, 생활 리듬이 게임 속 농장의 성장 속도와 수확량을 직접 좌우합니다.',
            'TendFarm ist eine iOS- und Apple-Watch-Gesundheits-Farm-App. Deine reale Aktivität, dein Schlaf und dein Tagesrhythmus bestimmen direkt, wie schnell deine Farm im Spiel wächst.',
          )}
        </p>
        <p className="text-sm text-[#f0a832]/80">
          {getLoc(locale, '🚧 开发中，预计 2026 年底上架 App Store', '🚧 In development — targeting App Store launch in late 2026', '🚧 開發中，預計 2026 年底上架 App Store', '🚧 開発中——2026年後半のApp Storeリリース予定', '🚧 개발 중 — 2026년 말 App Store 출시 목표', '🚧 In Entwicklung — App-Store-Start für Ende 2026 geplant')}
        </p>
      </div>

      {/* 核心设计原则 */}
      <div className="mb-10 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-6 py-5">
        <p className="font-medium leading-relaxed text-[#e8dcc8]">
          {getLoc(
            locale,
            '健康数据不直接变金币——而是影响农场的运行效率。田地、水池、仓库决定基础产能；你的健康数据决定转化效率和长期成长。',
            'Health data never converts directly to coins — it shapes how efficiently your farm runs. Infrastructure sets the base; your health data amplifies the results.',
            '健康數據不直接變金幣——而是影響農場的運行效率。田地、水池、倉庫決定基礎產能；你的健康數據決定轉化效率和長期成長。',
            '健康データは直接コインにはなりません——農場の運営効率を左右します。畑・水池・倉庫が基礎能力を決め、あなたの健康データが変換効率と長期成長を決めます。',
            '건강 데이터는 직접 코인이 되지 않습니다 — 농장의 운영 효율을 결정합니다. 밭, 연못, 창고가 기본 생산력을 정하고, 당신의 건강 데이터가 전환 효율과 장기 성장을 결정합니다.',
            'Gesundheitsdaten werden nie direkt zu Münzen — sie bestimmen, wie effizient deine Farm läuft. Die Infrastruktur legt die Basis fest; deine Gesundheitsdaten verstärken die Ergebnisse.',
          )}
        </p>
      </div>

      {/* FarmData 机制 */}
      <h2 className="mb-5 text-xl font-semibold text-[#f0a832]">
        {getLoc(locale, '健康数据 → 农场能量', 'Health Data → Farm Energy', '健康數據 → 農場能量', '健康データ → 農場エネルギー', '건강 데이터 → 농장 에너지', 'Gesundheitsdaten → Farm-Energie')}
      </h2>
      <div className="mb-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FARM_DATA.map((item) => (
          <div key={item.label.en} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-5">
            <div className="mb-2 text-2xl">{item.icon}</div>
            <h3 className="mb-1 font-semibold text-[#e8dcc8]">
              {pick(item.label)}
            </h3>
            <p className="text-sm leading-relaxed text-[#8a9a7a]">
              {pick(item.desc)}
            </p>
          </div>
        ))}
      </div>

      {/* 为什么做 */}
      <div className="mb-14 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-6">
        <h2 className="mb-3 text-lg font-semibold text-[#f0a832]">
          {getLoc(locale, '为什么做 TendFarm', 'Why We Built This', '為什麼做 TendFarm', 'なぜTendFarmを作ったのか', 'TendFarm을 만든 이유', 'Warum wir das gebaut haben')}
        </h2>
        <p className="leading-relaxed text-[#8a9a7a]">
          {getLoc(
            locale,
            '大多数健康 App 是数据仪表盘——你看了数字，关掉，然后忘了。农场游戏有一种天然的"想看看今天长出什么"的驱动力，和健康数据的每日反馈节奏完美契合。TendFarm 不是要你完美，而是让健康的生活方式自然地成为你每天期待打开 App 的理由。',
            'Most health apps are dashboards — you check the numbers, close the app, and forget. Farming games have a natural "I wonder what grew today" pull that matches daily health feedback perfectly. TendFarm is not about being perfect. It turns healthy living into something you actually want to open every day.',
            '大多數健康 App 是數據儀表板——你看了數字，關掉，然後忘了。農場遊戲有一種天然的「想看看今天長出什麼」的驅動力，和健康數據的每日回饋節奏完美契合。TendFarm 不是要你完美，而是讓健康的生活方式自然地成為你每天期待打開 App 的理由。',
            'ほとんどの健康アプリはダッシュボードです——数字を見て、閉じて、忘れる。農場ゲームには「今日は何が育ったかな」という自然な引力があり、健康データの毎日のフィードバックと完璧にかみ合います。TendFarmは完璧を求めません。健康的な暮らしを、毎日開きたくなる理由に変えます。',
            '대부분의 건강 앱은 대시보드입니다 — 숫자를 보고 앱을 닫고 잊어버리죠. 농장 게임에는 "오늘은 뭐가 자랐을까" 하는 자연스러운 끌림이 있어 매일의 건강 피드백과 완벽하게 맞물립니다. TendFarm은 완벽을 요구하지 않습니다. 건강한 생활을 매일 열어보고 싶은 이유로 바꿉니다.',
            'Die meisten Gesundheits-Apps sind Dashboards — du schaust auf die Zahlen, schließt die App und vergisst sie. Farmspiele haben einen natürlichen „Mal sehen, was heute gewachsen ist"-Reiz, der perfekt zum täglichen Gesundheits-Feedback passt. Bei TendFarm geht es nicht um Perfektion. Es macht gesundes Leben zu etwas, das du wirklich jeden Tag öffnen willst.',
          )}
        </p>
      </div>

      {/* 候补名单 */}
      <WaitlistSection />

      {/* 反馈 */}
      <div className="mt-10 text-center">
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(locale, '有想法或功能建议？', 'Ideas or feature requests?', '有想法或功能建議？', 'アイデアや機能のご要望は？', '아이디어나 기능 제안이 있으신가요?', 'Ideen oder Funktionswünsche?')}
          {' '}
          <a href="mailto:jsamgogo@gmail.com" className="text-[#f0a832] hover:underline">
            {getLoc(locale, '发邮件给我们 →', 'Email us →', '發郵件給我們 →', 'メールを送る →', '이메일 보내기 →', 'Schreib uns →')}
          </a>
        </p>
      </div>
    </div>
  )
}
