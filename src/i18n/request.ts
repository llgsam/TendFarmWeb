import { getRequestConfig } from 'next-intl/server'
import { LOCALES } from '@/lib/config'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  const validLocale = locale && (LOCALES as readonly string[]).includes(locale) ? locale : 'zh'
  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
  }
})
