import { BASE_URL } from './config'

const LOCALE_TO_LANGUAGE: Record<string, string> = {
  zh: 'zh-CN',
  'zh-TW': 'zh-TW',
  en: 'en-US',
  ja: 'ja-JP',
  ko: 'ko-KR',
  de: 'de-DE',
}

export function websiteSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Farming Game Hub',
    url: `${BASE_URL}/${locale}`,
    description:
      locale === 'zh'
        ? '农场游戏爱好者集结地——攻略、工具和游戏推荐'
        : 'The farming game community — guides, tools, and game recommendations',
    inLanguage: LOCALE_TO_LANGUAGE[locale] ?? 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/${locale}/games?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Farming Game Hub',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [],
  }
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Ordered list of entities on a directory/collection page (games, comparison
// articles, quizzes). Helps AI engines and search extract "here are the items".
export function itemListSchema(
  name: string,
  items: { name: string; url: string; description?: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  }
}

export function videoGameSchema(game: {
  slug: string
  nameEn: string
  nameZh: string
  descEn: string
  descZh: string
  developerEn: string
  developerZh: string
  year: number
  platforms: string[]
}, locale: string, localized?: { name?: string; description?: string; developer?: string }) {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: localized?.name ?? (isZh ? game.nameZh : game.nameEn),
    description: localized?.description ?? (isZh ? game.descZh : game.descEn),
    author: {
      '@type': 'Organization',
      name: localized?.developer ?? (isZh ? game.developerZh : game.developerEn),
    },
    datePublished: String(game.year),
    url: `${BASE_URL}/${locale}/games/${game.slug}`,
    gamePlatform: game.platforms,
    genre: 'Farming Simulation',
    inLanguage: LOCALE_TO_LANGUAGE[locale] ?? 'en-US',
  }
}

export function articleSchema(post: {
  title: string
  description: string
  publishedAt?: string
  slug: string
  game: string
}, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt ?? '',
    dateModified: post.publishedAt ?? '',
    url: `${BASE_URL}/${locale}/guides/${post.game}/${post.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Farming Game Hub',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Farming Game Hub',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    inLanguage: LOCALE_TO_LANGUAGE[locale] ?? 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${locale}/guides/${post.game}/${post.slug}`,
    },
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
