/** @type {import('next-sitemap').IConfig} */

const HREFLANG_MAP = {
  zh: 'zh-Hans',
  'zh-TW': 'zh-Hant',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  de: 'de',
}

const LOCALES = ['zh', 'en', 'zh-TW', 'ja', 'ko', 'de']

module.exports = {
  siteUrl: 'https://www.farmgamehub.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  alternateRefs: LOCALES.map((locale) => ({
    href: `https://www.farmgamehub.com/${locale}`,
    hreflang: HREFLANG_MAP[locale] ?? locale,
  })),
}
