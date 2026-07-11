import { BUNDLE_ROOMS } from '@/components/tools/stardewBundleData'

export interface Faq {
  q: string
  a: string
}

function facts() {
  const roomCount = BUNDLE_ROOMS.length
  const bundleCount = BUNDLE_ROOMS.reduce((n, r) => n + r.bundles.length, 0)
  return { roomCount, bundleCount }
}

type SummaryFn = (f: ReturnType<typeof facts>) => string

const SUMMARIES: Record<string, SummaryFn> = {
  en: (f) =>
    `Stardew Valley's Community Center has ${f.roomCount} rooms and ${f.bundleCount} bundles to complete. Each bundle asks for a set of items and gives a reward; finishing every bundle restores the Community Center. The table below lists every bundle with its required items and reward. Use the finder above to search, or browse the full list.`,
  zh: (f) =>
    `星露谷物语的社区中心共有 ${f.roomCount} 个房间、${f.bundleCount} 个收集包。每个收集包需要一组物品并给予奖励，全部完成即可修复社区中心。下方的表格列出了每个收集包的所需物品和奖励。用上面的查询器搜索，或查看完整清单。`,
  'zh-TW': (f) =>
    `星露谷物語的社區中心共有 ${f.roomCount} 個房間、${f.bundleCount} 個收集包。每個收集包需要一組物品並給予獎勵，全部完成即可修復社區中心。下方的表格列出了每個收集包的所需物品和獎勵。用上面的查詢器搜尋，或查看完整清單。`,
  ja: (f) =>
    `スターデューバレーのコミュニティセンターには ${f.roomCount} 部屋、${f.bundleCount} 個のバンドルがあります。各バンドルは決まったアイテムを要求し報酬をくれます。すべて達成するとコミュニティセンターが修復されます。下の表に各バンドルの必要アイテムと報酬を掲載。上の検索もどうぞ。`,
  ko: (f) =>
    `스타듀 밸리의 마을 회관에는 ${f.roomCount}개의 방과 ${f.bundleCount}개의 꾸러미가 있습니다. 각 꾸러미는 정해진 아이템을 요구하고 보상을 줍니다. 모든 꾸러미를 완성하면 마을 회관이 복구됩니다. 아래 표에 각 꾸러미의 필요 아이템과 보상을 정리했습니다.`,
  de: (f) =>
    `Das Gemeinschaftszentrum in Stardew Valley hat ${f.roomCount} Räume und ${f.bundleCount} Bündel. Jedes Bündel verlangt bestimmte Gegenstände und gibt eine Belohnung; alle abzuschließen stellt das Zentrum wieder her. Die Tabelle unten listet jedes Bündel mit benötigten Gegenständen und Belohnung auf.`,
}

export function bundleSummary(locale: string): string {
  const fn = SUMMARIES[locale] ?? SUMMARIES.en
  return fn(facts())
}

const BUNDLE_FAQS: Record<'en' | 'zh', Faq[]> = {
  en: [
    {
      q: 'What is the Community Center in Stardew Valley?',
      a: 'The Community Center is a run-down building in Pelican Town that you restore by completing bundles — sets of items you donate to the Junimos. Finishing a room\'s bundles unlocks a reward (such as the Greenhouse or a Minecart), and completing every bundle fully restores the Center. The alternative is the JojaMart membership route, which replaces bundles with paid upgrades.',
    },
    {
      q: 'How do bundles work in Stardew Valley?',
      a: "Each bundle asks for a specific set of items — sometimes all of them, sometimes a choice of a few from a longer list (shown as 'pick N' in the table above). Some items must meet a minimum quality (Gold, Silver, or Iridium). Donate the required items to complete the bundle; finishing all bundles in a room grants that room's reward. The Items Needed column lists exactly what each bundle wants.",
    },
    {
      q: 'What do you get for completing the Community Center in Stardew Valley?',
      a: 'Each room grants a reward as you complete it — examples include the Greenhouse, the Minecart network, and repairing the bus to open the Desert. Completing every bundle triggers a town celebration and permanently restores the Community Center. It is the classic, free path, and its rewards are generally better long-term than the paid Joja route.',
    },
    {
      q: 'Should I complete the Community Center or join JojaMart?',
      a: 'For most players the Community Center is the better choice: it is free (bundles cost only items you gather) and its rewards, like the Greenhouse, are iconic. The JojaMart route replaces bundles with purchases costing well over 100,000 gold in total — trading time for money, worth it only if you have gold to spare and dislike collecting. You cannot do both on the same save.',
    },
  ],
  zh: [
    {
      q: '星露谷物语的社区中心是什么？',
      a: '社区中心是鹈鹕镇一座破败的建筑，你通过完成「收集包」来修复它——把成套物品捐给森林精灵 Junimo。集齐一个房间的收集包会解锁奖励（如温室、矿车），全部完成即可彻底修复社区中心。另一条路线是加入 JojaMart 会员，用付费升级取代收集包。',
    },
    {
      q: '星露谷的收集包（bundle）怎么运作？',
      a: '每个收集包要求一组特定物品——有时是全部，有时是从较长列表里选几样（上表标注「选 N」）。有些物品还要求最低品质（金、银或铱）。捐入所需物品即完成收集包；集齐一个房间的所有收集包即可获得该房间的奖励。上表的「所需物品」列列出了每个收集包的确切需求。',
    },
    {
      q: '完成星露谷社区中心能得到什么？',
      a: '每完成一个房间都会给一个奖励——例如温室、矿车网络，以及修好巴士以开放沙漠。集齐所有收集包会触发全镇庆典并永久修复社区中心。这是经典的免费路线，长期奖励通常比付费的 Joja 路线更好。',
    },
    {
      q: '该做社区中心还是加入 JojaMart？',
      a: '对多数玩家来说社区中心是更好的选择：它免费（收集包只花你采集来的物品），奖励如温室也很经典。JojaMart 路线用总额超过十万金币的付费购买取代收集包，是拿钱换时间——只有当你金币充裕又不喜欢收集时才划算。同一存档两条路线只能选一条。',
    },
  ],
}

export function getBundleFaqs(locale: string): Faq[] {
  if (locale === 'en') return BUNDLE_FAQS.en
  if (locale === 'zh') return BUNDLE_FAQS.zh
  return []
}
