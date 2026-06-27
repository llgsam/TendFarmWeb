import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { LOCALES, type Locale } from '@/lib/config'

const DEFAULT_LOCALE: Locale = 'zh'

const COUNTRY_LOCALE_MAP: Record<string, Locale> = {
  CN: 'zh',
  TW: 'zh-TW',
  HK: 'zh-TW',
  MO: 'zh-TW',
  JP: 'ja',
  KR: 'ko',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  US: 'en',
  GB: 'en',
  CA: 'en',
  AU: 'en',
  NZ: 'en',
  IE: 'en',
  SG: 'en',
  IN: 'en',
}

const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
})

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale
  }
  const country = request.headers.get('x-vercel-ip-country') ?? ''
  return COUNTRY_LOCALE_MAP[country] ?? DEFAULT_LOCALE
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    const locale = detectLocale(request)
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  const hasLocalePrefix = (LOCALES as readonly string[]).some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )
  if (!hasLocalePrefix) {
    const locale = detectLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
