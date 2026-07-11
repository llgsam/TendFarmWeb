import { VILLAGERS } from '@/components/tools/stardewVillagerData'
import { byLocale, faqsByLocale, type Faq } from '@/lib/tools/seo/content'

function facts() {
  const total = VILLAGERS.length
  const marriageable = VILLAGERS.filter((v) => v.marriageable).length
  return { total, marriageable }
}

type SummaryFn = (f: ReturnType<typeof facts>) => string

const SUMMARIES: Record<string, SummaryFn> = {
  en: (f) =>
    `Stardew Valley has ${f.total} villagers you can befriend, ${f.marriageable} of them marriageable. Each has a birthday, a home region, and a set of loved gifts. The table below lists every villager with those details. Use the finder above to search, or browse the full directory.`,
  zh: (f) =>
    `星露谷物语有 ${f.total} 位可以交好感的村民，其中 ${f.marriageable} 位可以结婚。每位都有生日、居住地和一组最爱的礼物。下方表格列出了每位村民的这些信息。用上面的查询器搜索，或查看完整名录。`,
  'zh-TW': (f) =>
    `星露谷物語有 ${f.total} 位可以交好感的村民，其中 ${f.marriageable} 位可以結婚。每位都有生日、居住地和一組最愛的禮物。下方表格列出了每位村民的這些資訊。用上面的查詢器搜尋，或查看完整名錄。`,
  ja: (f) =>
    `スターデューバレーには友好度を上げられる村人が ${f.total} 人おり、うち ${f.marriageable} 人と結婚できます。それぞれ誕生日・居住地・大好きな贈り物があります。下の表に各村人のこれらの情報を掲載。上の検索もどうぞ。`,
  ko: (f) =>
    `스타듀 밸리에는 친해질 수 있는 주민이 ${f.total}명 있으며 그중 ${f.marriageable}명과 결혼할 수 있습니다. 각자 생일, 거주지, 좋아하는 선물이 있습니다. 아래 표에 각 주민의 정보를 정리했습니다.`,
  de: (f) =>
    `Stardew Valley hat ${f.total} Bewohner, mit denen du dich anfreunden kannst, ${f.marriageable} davon heiratbar. Jeder hat einen Geburtstag, einen Wohnort und Lieblingsgeschenke. Die Tabelle unten listet jeden Bewohner mit diesen Angaben auf.`,
}

export function villagerSummary(locale: string): string {
  return byLocale(SUMMARIES, locale)(facts())
}

const VILLAGER_FAQS: Record<'en' | 'zh', Faq[]> = {
  en: [
    {
      q: 'Who can you marry in Stardew Valley?',
      a: "The marriage candidates are the villagers marked 'Yes' in the Marriageable column above. Raise one to 8 hearts and give them a Bouquet to start dating, then — once they reach 10 hearts — propose with a Mermaid's Pendant (bought from the Old Mariner at the beach on rainy days).",
    },
    {
      q: 'How do you increase friendship with villagers in Stardew Valley?',
      a: 'Talk to villagers every day and give them gifts they like — a loved gift is best. You can give each villager up to 2 gifts per week, plus one on their birthday, which counts eight times as much. See our gift guide for exactly what each villager loves.',
    },
    {
      q: "When are villagers' birthdays in Stardew Valley?",
      a: 'Every villager\'s birthday is listed in the Birthday column above as a season and day. Giving a loved gift on a villager\'s birthday grants eight times the usual friendship, so birthdays are the fastest way to build a relationship.',
    },
    {
      q: 'Where do villagers live in Stardew Valley?',
      a: 'Each villager\'s home is shown in the Region column above. Most live in and around Pelican Town, while others live in the mountains to the north, out by the beach, or in Cindersap Forest to the south.',
    },
  ],
  zh: [
    {
      q: '星露谷物语里可以和谁结婚？',
      a: '可结婚的对象就是上表「可结婚」列标「是」的村民。把好感度提到 8 颗心，送花束（Bouquet）开始约会，等好感度到 10 颗心后，送美人鱼吊坠（雨天在海滩的老水手处购买）求婚即可。',
    },
    {
      q: '星露谷怎么提升和村民的好感度？',
      a: '每天和村民交谈，并送他们喜欢的礼物——爱的礼物效果最好。每位村民每周最多送 2 次，外加生日当天 1 次（生日好感度 ×8）。每位村民具体爱什么，见我们的送礼查询。',
    },
    {
      q: '星露谷村民的生日都是什么时候？',
      a: '每位村民的生日都在上表「生日」列，按季节和日期标注。在村民生日当天送出爱的礼物，好感度是平时的 8 倍，所以生日是拉好感最快的时机。',
    },
    {
      q: '星露谷的村民都住在哪里？',
      a: '每位村民的住处见上表「居住地」列。多数住在鹈鹕镇及周边，也有人住在北边的山区、海滩，或南边的煤矿森林。',
    },
  ],
}

export function getVillagerFaqs(locale: string): Faq[] {
  return faqsByLocale(VILLAGER_FAQS, locale)
}
