'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(newLocale: string) {
    // pathname 是 /zh/xxx，替换第一段
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <div className="flex gap-2 text-sm">
      <button
        onClick={() => switchLocale('zh')}
        className={locale === 'zh' ? 'text-[#f0a832] font-semibold' : 'text-[#8a9a7a] hover:text-[#e8dcc8]'}
      >
        中文
      </button>
      <span className="text-[#8a9a7a]">/</span>
      <button
        onClick={() => switchLocale('en')}
        className={locale === 'en' ? 'text-[#f0a832] font-semibold' : 'text-[#8a9a7a] hover:text-[#e8dcc8]'}
      >
        EN
      </button>
    </div>
  )
}
