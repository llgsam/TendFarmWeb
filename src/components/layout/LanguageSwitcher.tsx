'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

const LANGUAGE_LABELS: Record<string, string> = {
  zh: '中文',
  'zh-TW': '繁體',
  en: 'EN',
  ja: '日本語',
  ko: '한국어',
  de: 'DE',
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(newLocale: string) {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;samesite=lax`
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <div className="relative flex items-center">
      <select
        value={locale}
        onChange={(e) => switchLocale(e.target.value)}
        className="appearance-none bg-transparent text-sm text-[#8a9a7a] hover:text-[#e8dcc8] cursor-pointer pr-5 focus:outline-none"
        aria-label="Select language"
      >
        {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
          <option key={code} value={code} className="bg-[#0f1a0f] text-[#e8dcc8]">
            {label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#8a9a7a] text-xs">▾</span>
    </div>
  )
}
