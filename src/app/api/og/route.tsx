import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Pick a CJK-capable Google font per locale so Japanese/Korean/Chinese titles
// render real glyphs (not tofu) in the share card.
const FONT_BY_LOCALE: Record<string, string> = {
  zh: 'Noto Sans SC',
  'zh-TW': 'Noto Sans TC',
  ja: 'Noto Sans JP',
  ko: 'Noto Sans KR',
  en: 'Noto Sans',
  de: 'Noto Sans',
}

// Fetch only the glyphs used (Google Fonts text-subsetting) — keeps the font tiny.
async function loadFont(family: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family
    )}:wght@700&text=${encodeURIComponent(text)}`
    const css = await (
      await fetch(cssUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    ).text()
    const m = css.match(/src: url\(([^)]+)\) format\(['"]?(?:woff2|truetype|opentype)['"]?\)/)
    if (!m) return null
    return await (await fetch(m[1])).arrayBuffer()
  } catch {
    return null
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') ?? 'Farming Game Hub').slice(0, 70)
  const tag = (searchParams.get('tag') ?? '').slice(0, 90)
  const emoji = (searchParams.get('emoji') ?? '🌾').slice(0, 4)
  const badge = (searchParams.get('badge') ?? '').slice(0, 40)
  const locale = searchParams.get('locale') ?? 'en'

  const family = FONT_BY_LOCALE[locale] ?? 'Noto Sans'
  const fontData = await loadFont(family, `${title}${tag}${badge}farmgamehub.com`)
  const fontName = fontData ? family : 'sans-serif'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #0f1a0f 0%, #1a2e1a 100%)',
          fontFamily: fontName,
        }}
      >
        {/* Eyebrow / badge */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {badge ? (
            <div
              style={{
                display: 'flex',
                fontSize: 28,
                color: '#f0a832',
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </div>
          ) : (
            <div style={{ display: 'flex' }} />
          )}
        </div>

        {/* Center: emoji + title + tag */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ display: 'flex', fontSize: 120, marginBottom: 12 }}>{emoji}</div>
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 28 ? 64 : 80,
              fontWeight: 700,
              color: '#e8dcc8',
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          {tag ? (
            <div
              style={{
                display: 'flex',
                fontSize: 36,
                color: '#8a9a7a',
                marginTop: 20,
              }}
            >
              {tag}
            </div>
          ) : (
            <div style={{ display: 'flex' }} />
          )}
        </div>

        {/* Footer brand */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontSize: 40, marginRight: 14 }}>🌱</div>
          <div style={{ display: 'flex', fontSize: 34, color: '#f0a832', fontWeight: 700 }}>
            farmgamehub.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: 'twemoji',
      fonts: fontData
        ? [{ name: family, data: fontData, weight: 700, style: 'normal' }]
        : [],
    }
  )
}
