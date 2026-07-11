import { MUSEUM_ITEMS } from '@/components/tools/stardewMuseumData'
import { byLocale, faqsByLocale, type Faq } from '@/lib/tools/seo/content'

function facts() {
  const total = MUSEUM_ITEMS.length
  const artifacts = MUSEUM_ITEMS.filter((i) => i.category === 'artifact').length
  const minerals = total - artifacts
  return { total, artifacts, minerals }
}

type SummaryFn = (f: ReturnType<typeof facts>) => string

const SUMMARIES: Record<string, SummaryFn> = {
  en: (f) =>
    `Stardew Valley's Museum accepts ${f.total} donatable items — ${f.artifacts} artifacts and ${f.minerals} minerals. Donating reaches reward milestones and, once complete, restores the full collection. The table below lists every item with its category and where to find it. Use the finder above to search, or browse the full list.`,
  zh: (f) =>
    `星露谷物语的博物馆可捐赠 ${f.total} 件物品——${f.artifacts} 件古物和 ${f.minerals} 件矿物。捐赠会达到奖励里程碑，全部捐齐即可完成整个收藏。下方表格列出了每件物品的分类和获得方式。用上面的查询器搜索，或查看完整清单。`,
  'zh-TW': (f) =>
    `星露谷物語的博物館可捐贈 ${f.total} 件物品——${f.artifacts} 件古物和 ${f.minerals} 件礦物。捐贈會達到獎勵里程碑，全部捐齊即可完成整個收藏。下方表格列出了每件物品的分類和獲得方式。用上面的查詢器搜尋，或查看完整清單。`,
  ja: (f) =>
    `スターデューバレーの博物館には ${f.total} 個の寄贈できるアイテム（発掘品 ${f.artifacts} 個と鉱物 ${f.minerals} 個）があります。寄贈すると報酬のマイルストーンに到達し、すべて集めるとコレクションが完成します。下の表に各アイテムの分類と入手場所を掲載。上の検索もどうぞ。`,
  ko: (f) =>
    `스타듀 밸리의 박물관은 ${f.total}개의 기증 가능한 아이템(유물 ${f.artifacts}개와 광물 ${f.minerals}개)을 받습니다. 기증하면 보상 이정표에 도달하고, 모두 모으면 컬렉션이 완성됩니다. 아래 표에 각 아이템의 분류와 입수 장소를 정리했습니다.`,
  de: (f) =>
    `Das Museum in Stardew Valley nimmt ${f.total} spendbare Gegenstände an — ${f.artifacts} Artefakte und ${f.minerals} Mineralien. Spenden erreicht Belohnungs-Meilensteine und vervollständigt schließlich die Sammlung. Die Tabelle unten listet jeden Gegenstand mit Kategorie und Fundort.`,
}

export function museumSummary(locale: string): string {
  return byLocale(SUMMARIES, locale)(facts())
}

const MUSEUM_FAQS: Record<'en' | 'zh', Faq[]> = {
  en: [
    {
      q: 'How do you donate to the Museum in Stardew Valley?',
      a: 'You donate at the Museum & Library in Pelican Town, run by Gunther. Bring any artifact or mineral you have not donated yet and give it to him — he adds it to the display. Donations are permanent and count toward reward milestones.',
    },
    {
      q: 'How do you find artifacts and minerals in Stardew Valley?',
      a: "Artifacts come from digging artifact spots (the wiggling worm tiles), tilling dirt, panning, and some monster drops. Minerals come from mining ore and gem nodes, cracking open geodes at Clint's blacksmith, and foraging. The 'Where to Find' column above lists the exact source for every donatable item.",
    },
    {
      q: 'What rewards do you get for donating to the Museum?',
      a: 'Donating reaches reward milestones — the list above shows what you get at each donation count, from seeds and decorations to the Rusty Key (at 60 donations) that unlocks the Sewers. Donating the full collection earns a final reward, and rewards are given automatically as you cross each threshold.',
    },
    {
      q: 'Where is the Museum in Stardew Valley?',
      a: 'The Museum is in Pelican Town, in the same building as the Library, just west of the town square next to the graveyard. Talk to Gunther at the counter and choose to donate; he will take any eligible artifact or mineral you are carrying.',
    },
  ],
  zh: [
    {
      q: '星露谷物语怎么向博物馆捐赠？',
      a: '在鹈鹕镇的「博物馆兼图书馆」捐赠，由 Gunther 管理。把任何还没捐过的古物或矿物交给他，他会加入展示。捐赠是永久的，并计入奖励里程碑。',
    },
    {
      q: '星露谷的古物和矿物在哪里找？',
      a: '古物来自挖掘「古物点」（地上蠕动的点）、锄地、淘洗，以及部分怪物掉落。矿物来自开采矿石和宝石矿脉、在 Clint 铁匠铺敲开晶球，以及采集。上表的「在哪获得」列列出了每件可捐物品的确切来源。',
    },
    {
      q: '向博物馆捐赠能得到什么奖励？',
      a: '捐赠达到里程碑会给奖励——上方列表显示每个捐赠数量对应的奖励，从种子、装饰到通往下水道的「生锈钥匙」（第 60 件）。捐齐全部收藏有最终奖励，每跨过一个门槛就自动发放。',
    },
    {
      q: '星露谷的博物馆在哪里？',
      a: '博物馆位于鹈鹕镇，与图书馆同一栋建筑，在镇广场西边、紧挨着墓地。在柜台找 Gunther 选择捐赠，他会收下你携带的任何符合条件的古物或矿物。',
    },
  ],
}

export function getMuseumFaqs(locale: string): Faq[] {
  return faqsByLocale(MUSEUM_FAQS, locale)
}
