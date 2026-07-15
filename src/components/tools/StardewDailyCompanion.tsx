'use client'

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { daySummary, seasonWindow, nextDay } from '@/lib/tools/stardewDay'
import type { Season } from '@/lib/tools/stardewCalendarData'
import type { Crop } from '@/lib/tools/stardewCropData'
import { openPiPWindow, supportsDocumentPiP } from '@/lib/tools/pipOverlay'

type Loc = { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
function pick(l: Loc, locale: string): string {
  if (locale === 'zh') return l.zh
  if (locale === 'zh-TW') return l.zhTW
  if (locale === 'ja') return l.ja
  if (locale === 'ko') return l.ko
  if (locale === 'de') return l.de
  return l.en
}
function cropName(c: Crop, locale: string): string {
  if (locale === 'zh') return c.nameZh
  if (locale === 'zh-TW') return c.nameZhTW
  if (locale === 'ja') return c.nameJa
  if (locale === 'ko') return c.nameKo
  if (locale === 'de') return c.nameDe
  return c.nameEn
}
const SEASONS: { key: Season; label: Loc }[] = [
  { key: 'spring', label: { en: 'Spring', zh: '春', zhTW: '春', ja: '春', ko: '봄', de: 'Frühling' } },
  { key: 'summer', label: { en: 'Summer', zh: '夏', zhTW: '夏', ja: '夏', ko: '여름', de: 'Sommer' } },
  { key: 'fall',   label: { en: 'Fall',   zh: '秋', zhTW: '秋', ja: '秋', ko: '가을', de: 'Herbst' } },
  { key: 'winter', label: { en: 'Winter', zh: '冬', zhTW: '冬', ja: '冬', ko: '겨울', de: 'Winter' } },
]
const STORAGE_KEY = 'stardew-companion-date-v1'

export function StardewDailyCompanion({ locale }: { locale: string }) {
  const [season, setSeason] = useState<Season>('spring')
  const [day, setDay] = useState(1)
  const [pipWin, setPipWin] = useState<Window | null>(null)
  const L = (en: string, zh: string, zhTW: string, ja: string, ko: string, de: string) => pick({ en, zh, zhTW, ja, ko, de }, locale)

  // restore
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const s = JSON.parse(raw)
        if (s?.season && s?.day) { setSeason(s.season); setDay(s.day) }
      }
    } catch { /* ignore */ }
  }, [])
  // save
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ season, day })) } catch { /* ignore */ }
  }, [season, day])
  // close PiP on unmount
  useEffect(() => () => { pipWin?.close?.() }, [pipWin])

  const summary = useMemo(() => daySummary(season, day), [season, day])
  const window_ = useMemo(() => seasonWindow(season, day), [season, day])

  const advance = () => { const t = nextDay(season, day); setSeason(t.season); setDay(t.day) }
  const setDayClamped = (v: number) => {
    if (Number.isNaN(v)) return
    setDay(Math.min(28, Math.max(1, Math.round(v))))
  }
  const pin = async () => {
    const w = await openPiPWindow({ width: 360, height: 560 })
    if (w) { setPipWin(w); w.addEventListener('pagehide', () => setPipWin(null)) }
  }

  const inputCls = 'rounded-lg border border-[#2d3d2d] bg-[#1a2e1a] px-2 py-1.5 text-sm text-[#e8dcc8]'

  // The panel body is a function so it can render both inline and (via portal) in the PiP window.
  const Panel = (
    <div className="space-y-4 bg-[#0f1a0f] p-4 text-[#e8dcc8]">
      {/* date controls */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={season}
          onChange={(e) => setSeason(e.target.value as Season)}
          className={inputCls}
        >
          {SEASONS.map((s) => (
            <option key={s.key} value={s.key}>{pick(s.label, locale)}</option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          max={28}
          value={day}
          onChange={(e) => setDayClamped(Number(e.target.value))}
          className={`${inputCls} w-16`}
        />
        <button
          type="button"
          onClick={advance}
          className="rounded-lg border border-[#2d3d2d] px-3 py-1.5 text-sm text-[#8a9a7a] hover:text-[#e8dcc8]"
        >
          {L('Next Day', '下一天', '下一天', '翌日へ', '다음 날', 'Nächster Tag')}
        </button>
      </div>

      {/* Today */}
      <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-4">
        <h3 className="mb-2 text-sm font-semibold text-[#f0a832]">
          🎂 {L('Today', '今天', '今天', '今日', '오늘', 'Heute')}
        </h3>
        {summary.birthdays.length > 0 ? (
          <ul className="space-y-1 text-sm">
            {summary.birthdays.map((b, i) => (
              <li key={i}>
                🎉 {pick(b.villager, locale)}
                {b.loves.length > 0 && (
                  <span className="text-[#8a9a7a]">
                    {' — '}
                    {L('loves', '喜欢', '喜歡', '大好物', '좋아함', 'liebt')}: {b.loves.map((g) => pick(g, locale)).join(', ')}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#8a9a7a]">
            {L('No birthdays today.', '今天没有生日。', '今天沒有生日。', '今日は誕生日はありません。', '오늘은 생일이 없습니다.', 'Heute hat niemand Geburtstag.')}
          </p>
        )}

        {summary.festivalToday ? (
          <p className="mt-2 text-sm">
            🎪 {L('Festival', '节日', '節日', 'フェスティバル', '축제', 'Fest')}: {pick(summary.festivalToday.name, locale)}
          </p>
        ) : (
          <p className="mt-2 text-sm text-[#8a9a7a]">
            {L('No festival today.', '今天没有节日。', '今天沒有節日。', '今日はフェスティバルはありません。', '오늘은 축제가 없습니다.', 'Heute findet kein Fest statt.')}
          </p>
        )}

        <p className="mt-2 text-sm text-[#8a9a7a]">
          {summary.tomorrowBirthdays.length > 0 ? (
            <>
              {L('Tomorrow:', '明天：', '明天：', '明日：', '내일:', 'Morgen:')}{' '}
              {summary.tomorrowBirthdays.map((b) => pick(b.villager, locale)).join(', ')}
            </>
          ) : (
            L('No birthdays tomorrow.', '明天没有生日。', '明天沒有生日。', '明日は誕生日はありません。', '내일은 생일이 없습니다.', 'Morgen hat niemand Geburtstag.')
          )}
        </p>
      </div>

      {/* Season window */}
      <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-4">
        <h3 className="mb-2 text-sm font-semibold text-[#f0a832]">
          🎣 {L('Fish in season', '当季鱼类', '當季魚類', '今の季節の魚', '이번 시즌 물고기', 'Fische dieser Saison')}
        </h3>
        {window_.fish.length > 0 ? (
          <p className="text-sm text-[#e8dcc8]">
            {window_.fish.map((f) => pick(f.name, locale)).join(', ')}
          </p>
        ) : (
          <p className="text-sm text-[#8a9a7a]">
            {L('No fish available this season.', '本季没有可捕鱼类。', '本季沒有可捕魚類。', '今シーズンは釣れる魚がいません。', '이번 시즌에는 잡을 수 있는 물고기가 없습니다.', 'In dieser Saison gibt es keine Fische.')}
          </p>
        )}

        <h3 className="mb-2 mt-4 text-sm font-semibold text-[#f0a832]">
          🌱 {L('Still worth planting', '还值得种植', '還值得種植', 'まだ植える価値あり', '아직 심을 가치가 있음', 'Noch anbauwert')}
        </h3>
        {window_.plantableCrops.length > 0 ? (
          <p className="text-sm text-[#e8dcc8]">
            {window_.plantableCrops.map((c) => cropName(c, locale)).join(', ')}
          </p>
        ) : (
          <p className="text-sm text-[#8a9a7a]">
            {L('Nothing worth planting this late — try the', '这个时间点已经没什么值得种的了——试试', '這個時間點已經沒什麼值得種的了——試試', 'この時期はもう植える価値のある作物がありません。', '이 시기에는 심을 만한 작물이 없습니다 —', 'Zu spät für Freilandanbau — probier das')}
            {' '}
            <a href={`/${locale}/tools/stardew-greenhouse`} className="text-[#f0a832] underline">
              {L('greenhouse', '温室', '溫室', '温室を試してみましょう', '온실', 'Gewächshaus')}
            </a>
            {locale === 'de' ? ' aus.' : locale === 'ja' ? '。' : locale === 'ko' ? ' 이용해보세요.' : '.'}
          </p>
        )}
      </div>
    </div>
  )

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={pin}
          className="rounded-lg border border-[#f0a832] bg-[#f0a832]/15 px-3 py-1.5 text-sm text-[#e8dcc8]"
        >
          📌 {L('Pin as overlay', '钉在游戏上', '釘在遊戲上', 'オーバーレイ固定', '게임 위에 고정', 'Als Overlay anheften')}
        </button>
        {!supportsDocumentPiP() && (
          <span className="text-xs text-[#8a9a7a]">
            {L('Opens a floating window. For a true always-on-top overlay, use Chrome and run Stardew in windowed mode.',
               '会打开一个浮窗。要真正置顶叠在游戏上，请用 Chrome 并让星露谷以窗口模式运行。',
               '會開啟一個浮窗。要真正置頂疊在遊戲上，請用 Chrome 並讓星露谷以視窗模式運行。',
               'フローティングウィンドウが開きます。常時最前面のオーバーレイには Chrome とウィンドウモードを使用してください。',
               '떠 있는 창이 열립니다. 항상 위 오버레이는 Chrome과 창 모드를 사용하세요.',
               'Öffnet ein schwebendes Fenster. Für ein echtes Overlay Chrome und den Fenstermodus verwenden.')}
          </span>
        )}
      </div>
      {pipWin ? createPortal(Panel, pipWin.document.body) : Panel}
    </div>
  )
}
