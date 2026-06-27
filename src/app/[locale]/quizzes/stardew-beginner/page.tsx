import { StardewBeginnerQuiz } from '@/components/tools/StardewBeginnerQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  return {
    title: isZh
      ? '你是星露谷新手还是老鸟？6 题测出你的农夫段位'
      : 'Stardew Valley Beginner or Pro? Quiz — Find Your Farmer Level',
    description: isZh
      ? '6 个经典场景问题，测出你是嫩苗新手、成长萌芽、丰收达人还是农场大师？附专属进阶建议，适合新玩家和老玩家。'
      : '6 scenario questions to find your Stardew Valley skill level — Seedling, Sprout, Harvest Ready, or Master Farmer? Includes tips for your exact level.',
    keywords: isZh
      ? ['星露谷新手测试', '星露谷我是老玩家吗', '星露谷段位测验', '星露谷新手攻略', '星露谷玩家等级']
      : [
          'stardew valley beginner or pro quiz',
          'am i good at stardew valley',
          'stardew valley skill level test',
          'stardew valley tips for beginners',
          'stardew valley new player guide',
          'stardew valley how to get better',
          'stardew valley experience level quiz',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/stardew-beginner`,
      languages: buildLanguageAlternates('/quizzes/stardew-beginner'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'What should a Stardew Valley beginner do first?',
    a: "On your first day in Stardew Valley: (1) Check the TV for Lucky Day and cooking tips. (2) Clear enough land to plant your starting seeds before nightfall. (3) Head to Pierre's General Store by 5pm to buy extra parsnip seeds. (4) On day 13, attend the Egg Festival and buy as many strawberry seeds as you can afford — they keep producing all season and are by far the best spring crop. (5) Aim to reach floor 40 of the mines before summer to unlock copper ore for tool upgrades.",
  },
  {
    q: 'What are the most important things to know in Stardew Valley?',
    a: "The five most important beginner facts: (1) Strawberry seeds at the Egg Festival (Spring 13) are the single best early investment. (2) Upgrade your watering can on a rainy day so you don't miss watering. (3) Talk to villagers every day — friendships unlock recipes and events. (4) The Community Center bundles guide what crops and fish you need to find. (5) Energy management is critical — eat food to restore energy and never exhaust yourself before watering is complete.",
  },
  {
    q: 'What are the best tips for Stardew Valley beginners?',
    a: "Top tips for new players: (1) Always check the TV for weather forecasts — plan activities around rain. (2) Gift villagers on their birthdays for 8× friendship boost. (3) Bring food to the mines — Salmonberry and Blackberry seasons are free energy sources. (4) Don't neglect fishing early — fish sell well and fishing unlocks important items. (5) Prioritize completing the backpack upgrade from Pierre to carry more items. (6) Plant mixed seeds you find while hoeing — they produce random crops at no cost.",
  },
  {
    q: 'How do I get better at Stardew Valley?',
    a: "To improve at Stardew Valley: (1) Plan your seasons before they start — know which crops to buy, what fish to catch, which festivals to attend. (2) Unlock sprinklers as fast as possible — they remove daily watering and free up hours of in-game time. (3) Learn the mines efficiently: bring stairs for stuck floors, focus on getting to floor 80 (gold ore) and 120 (bottom) in year 1. (4) Build the greenhouse by completing the Pantry bundles — it's the key to late-game income. (5) Master artisan goods — wine and jelly turn cheap crops into high-value items.",
  },
  {
    q: 'How long does it take to get good at Stardew Valley?',
    a: "Most players feel competent after 20-30 hours of playtime (roughly one in-game year). You'll understand the seasonal crop cycle, mine progression, and friendship systems by then. Players start feeling like 'veterans' around 80-100 hours — when they can plan Community Center completion in year 1 and understand artisan goods economics. Stardew Valley never really ends, though — even 500-hour players discover new things, especially with mods like Stardew Valley Expanded.",
  },
]

const FAQ_ZH = [
  {
    q: '星露谷物语新手第一天应该做什么？',
    a: '第一天的优先事项：(1) 先看电视，获取幸运播报和料理提示。(2) 在天黑前清出足够的地并种下初始种子。(3) 在下午 5 点前赶到皮埃尔商店买更多防风草种子。(4) 第 13 天参加鸡蛋节，用所有存款买草莓种子——它们整个季节持续产出，是春天最划算的作物。(5) 争取在夏天之前挖到矿洞第 40 层，解锁铜矿来升级工具。',
  },
  {
    q: '星露谷物语最重要的新手须知是什么？',
    a: '五条最关键的新手知识：(1) 鸡蛋节（春天第 13 天）买草莓种子是早期最佳单笔投资。(2) 在雨天升级水壶，避免耽误浇水。(3) 每天和村民交谈——友谊可以解锁食谱和特殊事件。(4) 社区中心捆包会指导你需要种哪些作物、钓哪些鱼。(5) 体力管理至关重要——多吃食物回体力，绝对不要在浇水完成前把体力耗尽。',
  },
  {
    q: '星露谷物语新手最实用的技巧有哪些？',
    a: '新玩家必备技巧：(1) 每天看天气预报——提前根据下雨规划活动。(2) 在村民生日当天送礼，友好度提升 8 倍。(3) 进矿洞要带食物——桑葚和黑莓季节是免费体力来源。(4) 不要忽视早期钓鱼——鱼类卖价不错，而且钓鱼可以解锁重要物品。(5) 尽快从皮埃尔商店购买背包升级——携带更多物品至关重要。(6) 用锄头翻地时得到的混合种子直接种下——免费获取随机作物。',
  },
  {
    q: '怎么提升星露谷物语的游戏水平？',
    a: '进阶要点：(1) 在每个季节开始之前提前规划——知道买哪些作物种子、钓哪些鱼、参加哪些节日。(2) 尽快解锁洒水机——它消除每日浇水任务，每天节省大量时间。(3) 高效下矿：用楼梯跳过卡关楼层，争取在第一年内到达 80 层（金矿）和 120 层（底部）。(4) 完成储藏室捆包解锁温室——这是后期高收入的关键。(5) 掌握手工艺品经济——把廉价作物通过酿酒桶和果酱机转化为高价值商品。',
  },
  {
    q: '星露谷物语需要多久才能玩得比较好？',
    a: '大多数玩家在游戏约 20-30 小时后（大约一个游戏年）开始感到得心应手，基本掌握季节作物循环、矿洞推进和友谊系统。玩到 80-100 小时左右，玩家会开始有「老玩家」的感觉——能在第一年计划完成社区中心，理解手工艺品经济体系。但星露谷物语没有真正的终点——即使玩了 500 小时的玩家依然会有新发现，尤其是加入星露谷扩展 Mod 之后。',
  },
]

export default async function StardewBeginnerPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'
  const faq = isZh ? FAQ_ZH : FAQ_EN

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <nav className="mb-6 text-sm text-[#8a9a7a]">
          <Link href={`/${locale}/quizzes`} className="hover:text-[#e8dcc8]">
            {isZh ? '测评' : 'Quizzes'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#e8dcc8]">
            {isZh ? '星露谷段位测验' : 'Stardew Beginner or Pro'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <StardewBeginnerQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '无论哪个段位，星露谷都会给你留下最美好的农场时光。'
            : "Whatever your level, Stardew Valley still has something left to surprise you."}
        </p>

        <RelatedQuizzes currentSlug="stardew-beginner" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '星露谷新手常见问题' : 'Stardew Valley Beginner FAQ'}
          </h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-5">
                <h3 className="mb-2 font-semibold text-[#e8dcc8]">{q}</h3>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
