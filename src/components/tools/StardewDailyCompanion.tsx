'use client'

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { daySummary, seasonWindow, nextDay, prevDay } from '@/lib/tools/stardewDay'
import type { Season } from '@/lib/tools/stardewCalendarData'
import type { Crop } from '@/lib/tools/stardewCropData'
import { openPiPWindow, supportsDocumentPiP } from '@/lib/tools/pipOverlay'
import { searchItems, type ItemFacts } from '@/lib/tools/stardewItemLookup'

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
  const [q, setQ] = useState('')
  const [picked, setPicked] = useState<ItemFacts | null>(null)
  const [mounted, setMounted] = useState(false)
  const L = (en: string, zh: string, zhTW: string, ja: string, ko: string, de: string) => pick({ en, zh, zhTW, ja, ko, de }, locale)

  // mark client mount (used to defer client-only reads until after hydration)
  useEffect(() => { setMounted(true) }, [])

  // restore
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const s = JSON.parse(raw)
        const validSeason = SEASONS.some((entry) => entry.key === s?.season)
        const validDay = Number.isInteger(s?.day) && s.day >= 1 && s.day <= 28
        if (validSeason && validDay) { setSeason(s.season); setDay(s.day) }
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
  const retreat = () => { const t = prevDay(season, day); setSeason(t.season); setDay(t.day) }
  const hits = useMemo(() => (q.trim() ? searchItems(q, locale) : []), [q, locale])
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
      <p className="text-xs text-[#8a9a7a]">
        {L(
          '📅 Set your current in-game date. Each time a day passes in your game, tap “Next Day” to keep this panel in sync.',
          '📅 设定你游戏里的当前日期。游戏里每过一天（睡一觉），点「下一天」，面板就同步到那天。',
          '📅 設定你遊戲裡的當前日期。遊戲裡每過一天（睡一覺），點「下一天」，面板就同步到那天。',
          '📅 ゲーム内の今日の日付を設定します。1日経つごとに「翌日へ」を押すと、パネルがその日に同期します。',
          '📅 게임 속 현재 날짜를 설정하세요. 하루가 지날 때마다 ‘다음 날’을 누르면 패널이 그날로 동기화됩니다.',
          '📅 Stelle dein aktuelles Datum im Spiel ein. Klicke „Nächster Tag“, wenn im Spiel ein Tag vergeht, damit dieses Panel synchron bleibt.',
        )}
      </p>
      <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-3">
        <div className="mb-2 text-xs font-semibold text-[#f0a832]">
          {L('📅 In-game date', '📅 游戏日期', '📅 遊戲日期', '📅 ゲーム内の日付', '📅 게임 속 날짜', '📅 Datum im Spiel')}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={retreat}
            aria-label={L('Previous day', '上一天', '上一天', '前日', '이전 날', 'Vorheriger Tag')}
            className="rounded-lg border border-[#2d3d2d] px-3 py-1.5 text-sm text-[#8a9a7a] hover:text-[#e8dcc8]"
          >
            ◀ {L('Prev', '上一天', '上一天', '前日', '이전', 'Zurück')}
          </button>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value as Season)}
            aria-label={L('Season', '季节', '季節', '季節', '계절', 'Jahreszeit')}
            className={inputCls}
          >
            {SEASONS.map((s) => (
              <option key={s.key} value={s.key}>{pick(s.label, locale)}</option>
            ))}
          </select>
          <span className="flex items-center gap-1 text-sm text-[#8a9a7a]">
            {L('Day', '第', '第', '', '', 'Tag')}
            <input
              type="number"
              min={1}
              max={28}
              value={day}
              onChange={(e) => setDayClamped(Number(e.target.value))}
              aria-label={L('Day of season (1-28)', '日期（1-28）', '日期（1-28）', '日（1-28）', '날짜(1-28)', 'Tag (1-28)')}
              className={`${inputCls} w-16`}
            />
            {L('/ 28', '天 / 28', '天 / 28', '日 / 28', '일 / 28', '/ 28')}
          </span>
          <button
            type="button"
            onClick={advance}
            aria-label={L('Next day', '下一天', '下一天', '翌日', '다음 날', 'Nächster Tag')}
            className="rounded-lg border border-[#2d3d2d] px-3 py-1.5 text-sm text-[#8a9a7a] hover:text-[#e8dcc8]"
          >
            {L('Next', '下一天', '下一天', '翌日', '다음', 'Weiter')} ▶
          </button>
        </div>
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
            {locale === 'de' ? ' aus.' : locale === 'ja' ? '。' : locale === 'ko' ? ' 이용해보세요.' : locale === 'zh' || locale === 'zh-TW' ? '。' : '.'}
          </p>
        )}
      </div>

      {/* item lookup — "I have item X, what do I do with it?" */}
      <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-3">
        <h3 className="mb-2 text-xs font-semibold text-[#f0a832]">
          🔎 {L('Item lookup', '物品速查', '物品速查', 'アイテム検索', '아이템 조회', 'Gegenstand nachschlagen')}
        </h3>
        <input
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPicked(null) }}
          placeholder={L(
            'Type an item — who loves it, bundles, museum, recipes',
            '输入物品名——谁爱送、收集包、博物馆、料理',
            '輸入物品名——誰愛送、收集包、博物館、料理',
            'アイテム名を入力 — 贈り物・バンドル・博物館・料理',
            '아이템 이름 입력 — 선물·꾸러미·박물관·요리',
            'Gegenstand eingeben — Geschenke, Bündel, Museum, Rezepte',
          )}
          aria-label={L('Item lookup', '物品速查', '物品速查', 'アイテム検索', '아이템 조회', 'Gegenstand nachschlagen')}
          className={`${inputCls} w-full`}
        />

        {!picked && q.trim() && (
          hits.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1">
              {hits.map((h) => (
                <button
                  key={h.key}
                  type="button"
                  onClick={() => setPicked(h)}
                  className="rounded border border-[#2d3d2d] px-2 py-1 text-xs text-[#8a9a7a] hover:text-[#e8dcc8]"
                >
                  {pick(h.name, locale)}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-xs text-[#8a9a7a]">
              {L(
                'No match. This covers gift, bundle, museum and cooking items — not weapons, furniture or building materials.',
                '没找到。这里收录的是送礼／收集包／博物馆／料理相关物品，不含武器、家具和建材。',
                '沒找到。這裡收錄的是送禮／收集包／博物館／料理相關物品，不含武器、家具和建材。',
                '見つかりません。対象は贈り物・バンドル・博物館・料理のアイテムで、武器・家具・建材は含みません。',
                '찾을 수 없습니다. 선물·꾸러미·박물관·요리 아이템만 다루며, 무기·가구·건축 자재는 포함되지 않습니다.',
                'Kein Treffer. Abgedeckt sind Geschenk-, Bündel-, Museums- und Kochgegenstände — keine Waffen, Möbel oder Baumaterialien.',
              )}
            </p>
          )
        )}

        {picked && (
          <div className="mt-3 space-y-1 text-sm text-[#e8dcc8]">
            <div className="font-semibold">
              {pick(picked.name, locale)}
              {picked.sellPrice !== null && <span className="ml-2 text-xs font-normal text-[#8a9a7a]">{picked.sellPrice}g</span>}
            </div>
            {picked.universalLove && (
              <div className="text-xs text-[#f0a832]">
                💛 {L('Universal love — every villager loves this', '通用最爱——所有村民都爱', '通用最愛——所有村民都愛', 'みんなが大好き（全村人）', '모두가 좋아하는 선물', 'Von allen geliebt')}
              </div>
            )}
            {picked.lovedBy.length > 0 && (
              <div>🎁 {L('Loved by', '谁爱送', '誰愛送', '好きな人', '좋아하는 주민', 'Geliebt von')}: {picked.lovedBy.map((v) => pick(v, locale)).join(', ')}</div>
            )}
            {picked.bundles.length > 0 && (
              <div>📦 {L('Bundles', '收集包', '收集包', 'バンドル', '꾸러미', 'Bündel')}: {picked.bundles.map((b) => `${pick(b.bundle, locale)}${b.qty > 1 ? ` ×${b.qty}` : ''}`).join(', ')}</div>
            )}
            {picked.museum && (
              <div>🏛️ {L('Museum: donatable', '博物馆：可捐赠', '博物館：可捐贈', '博物館：寄贈可', '박물관: 기증 가능', 'Museum: spendbar')}</div>
            )}
            {picked.recipes.length > 0 && (
              <div>🍳 {L('Used in', '用于料理', '用於料理', '料理に使う', '요리에 사용', 'Verwendet in')}: {picked.recipes.map((r) => pick(r, locale)).join(', ')}</div>
            )}
            {picked.lovedBy.length === 0 && !picked.universalLove && picked.bundles.length === 0 && !picked.museum && picked.recipes.length === 0 && (
              <div className="text-xs text-[#8a9a7a]">
                {L('No gift, bundle, museum or recipe use — just sell it.', '没有送礼／收集包／博物馆／料理用途——卖掉即可。', '沒有送禮／收集包／博物館／料理用途——賣掉即可。', '贈り物・バンドル・博物館・料理の用途なし — 売却推奨。', '선물·꾸러미·박물관·요리 용도 없음 — 판매 추천.', 'Kein Geschenk-, Bündel-, Museums- oder Rezeptnutzen — einfach verkaufen.')}
              </div>
            )}
            <button
              type="button"
              onClick={() => { setPicked(null); setQ('') }}
              className="mt-1 rounded border border-[#2d3d2d] px-2 py-1 text-xs text-[#8a9a7a] hover:text-[#e8dcc8]"
            >
              {L('Clear', '清空', '清空', 'クリア', '지우기', 'Leeren')}
            </button>
          </div>
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
        {mounted && !supportsDocumentPiP() && (
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
