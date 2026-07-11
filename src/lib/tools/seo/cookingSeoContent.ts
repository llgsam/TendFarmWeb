import { COOK_RECIPES } from '@/components/tools/stardewCookingData'
import { byLocale, faqsByLocale, type Faq } from '@/lib/tools/seo/content'

function facts() {
  const recipeCount = COOK_RECIPES.length
  const buffCount = COOK_RECIPES.filter((r) => r.buffs.length > 0).length
  return { recipeCount, buffCount }
}

type SummaryFn = (f: ReturnType<typeof facts>) => string

const SUMMARIES: Record<string, SummaryFn> = {
  en: (f) =>
    `Stardew Valley has ${f.recipeCount} cooking recipes, ${f.buffCount} of which grant a temporary stat buff. Each recipe below lists its ingredients, buff, energy, sell price, and how to unlock it. Use the finder above to reverse-look-up by ingredient or filter by buff and source, or browse the full list below.`,
  zh: (f) =>
    `星露谷物语共有 ${f.recipeCount} 道料理配方，其中 ${f.buffCount} 道会提供临时属性增益。下方每道菜都列出了食材、增益、能量、售价和解锁方式。用上面的查询器按食材反查或按增益、来源筛选，或查看下方的完整配方表。`,
  'zh-TW': (f) =>
    `星露谷物語共有 ${f.recipeCount} 道料理配方，其中 ${f.buffCount} 道會提供臨時屬性增益。下方每道菜都列出了食材、增益、能量、售價和解鎖方式。用上面的查詢器按食材反查或按增益、來源篩選，或查看下方的完整配方表。`,
  ja: (f) =>
    `スターデューバレーには ${f.recipeCount} 種類の料理レシピがあり、うち ${f.buffCount} 種類は一時的なステータスバフを付与します。下の表に各料理の材料・バフ・エネルギー・売値・入手方法を掲載。上の検索で材料から逆引き、またはバフや入手方法で絞り込めます。`,
  ko: (f) =>
    `스타듀 밸리에는 ${f.recipeCount}개의 요리 레시피가 있으며 그중 ${f.buffCount}개는 일시적인 능력치 버프를 줍니다. 아래 표에 각 요리의 재료·버프·에너지·판매가·해금 방법을 정리했습니다. 위의 검색기로 재료 역검색하거나 버프·출처로 필터링하세요.`,
  de: (f) =>
    `Stardew Valley hat ${f.recipeCount} Kochrezepte, von denen ${f.buffCount} einen temporären Statuswert-Buff geben. Jedes Rezept unten zeigt Zutaten, Buff, Energie, Verkaufspreis und Freischaltung. Nutze den Finder oben zur Rückwärtssuche nach Zutat oder sieh dir die vollständige Liste unten an.`,
}

export function cookingSummary(locale: string): string {
  return byLocale(SUMMARIES, locale)(facts())
}

const COOKING_FAQS: Record<'en' | 'zh', Faq[]> = {
  en: [
    {
      q: 'How do you cook in Stardew Valley?',
      a: 'You cook using a kitchen, which you get by upgrading your farmhouse to the first House Upgrade (10,000g and 450 wood from Robin). Away from home you can craft a Cookout Kit to cook in the field. Pick a recipe you have unlocked plus the required ingredients from your inventory to make the dish.',
    },
    {
      q: 'How do you unlock cooking recipes in Stardew Valley?',
      a: "Recipes come from four main sources: the Queen of Sauce cooking show on TV (a new recipe most weeks, plus reruns), leveling up your skills, friendship mail from villagers at certain heart levels, and buying a few from shops like the Saloon. The 'How to Unlock' column in the table above lists the exact source for every recipe.",
    },
    {
      q: 'How do cooking buffs work in Stardew Valley?',
      a: 'Some dishes grant a temporary buff — a boost to a skill or stat such as +2 Fishing or +1 Speed — that starts when you eat the food and lasts for the listed duration. You can only have one food buff active at a time: eating another buff dish replaces the previous one entirely (drinks like coffee use a separate slot). The Buffs column above shows each dish\'s effect and duration.',
    },
    {
      q: 'What is the best food to cook for profit in Stardew Valley?',
      a: 'The most profitable dishes are generally those made from high-value ingredients, since cooking adds value on top of the raw materials. Scan the Sell (g) column in the table above to compare every recipe\'s sell price and find the best return for what you can currently make.',
    },
  ],
  zh: [
    {
      q: '星露谷物语怎么做菜？',
      a: '做菜需要厨房——把农舍升级到第一级（在罗宾处花 10,000g 和 450 木材）即可获得。在外面则可以制作「野炊工具包」（Cookout Kit）就地做菜。选一个已解锁的配方，加上背包里对应的食材即可烹饪。',
    },
    {
      q: '星露谷怎么解锁料理配方？',
      a: '配方主要有四个来源：电视上的「酱料女皇」（The Queen of Sauce）烹饪节目（几乎每周一个新配方，还有重播）、技能升级、村民在特定好感度寄来配方的邮件，以及在酒吧等商店购买。上表的「如何解锁」列标注了每个配方的确切来源。',
    },
    {
      q: '星露谷的料理增益（buff）怎么运作？',
      a: '有些菜会给一个临时增益——比如 +2 钓鱼或 +1 速度——吃下即生效，持续上表所列的时长。同一时间只能有一个「食物」增益生效：再吃另一道带增益的菜会整个覆盖掉前一个（咖啡等饮料占用单独的槽位）。上表的「增益」列显示每道菜的效果和时长。',
    },
    {
      q: '星露谷做什么菜最赚钱？',
      a: '最赚钱的菜通常是用高价食材做的，因为烹饪会在原材料基础上增值。扫一眼上表的「售价(g)」列即可比较每个配方的卖价，找到你当前能做的菜里回报最高的。',
    },
  ],
}

export function getCookingFaqs(locale: string): Faq[] {
  return faqsByLocale(COOKING_FAQS, locale)
}
