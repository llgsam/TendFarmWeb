import { StardewAltsQuiz } from '@/components/tools/StardewAltsQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const other = otherLocale(locale)
  const isZh = locale === 'zh'
  return {
    title: isZh
      ? '星露谷之后该玩哪款游戏？— Sun Haven / 珊瑚岛 / Fields of Mistria / 沙石镇时光推荐测验'
      : 'What to Play After Stardew Valley? — Sun Haven vs Coral Island vs Fields of Mistria vs My Time at Sandrock Quiz',
    description: isZh
      ? '6 个问题，从 Sun Haven、珊瑚岛、Fields of Mistria、沙石镇时光中找到最适合你的星露谷替代品。含游戏特点对比和注意事项。'
      : '6 questions to find your perfect Stardew Valley alternative — Sun Haven, Coral Island, Fields of Mistria, or My Time at Sandrock. Includes honest pros and watch-outs for each.',
    keywords: isZh
      ? ['星露谷替代品推荐', '类星露谷游戏', 'Sun Haven 攻略', 'Sun Haven 和星露谷哪个好', '珊瑚岛游戏', 'Fields of Mistria', '沙石镇时光', '波托镇时光续集', '星露谷之后玩什么', '2025 年最好的农场 RPG']
      : [
          'games like stardew valley',
          'stardew valley alternatives',
          'what to play after stardew valley',
          'sun haven vs stardew valley',
          'is sun haven similar to stardew valley',
          'coral island tips for beginners',
          'fields of mistria review',
          'my time at sandrock tips',
          'best farming rpg 2025',
          'stardew valley alternatives quiz',
          'games similar to stardew valley 2025',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/stardew-alternatives`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes/stardew-alternatives`,
        [other]: `${BASE_URL}/${other}/quizzes/stardew-alternatives`,
      },
    },
  }
}

const FAQ_EN = [
  {
    q: 'What are the best games like Stardew Valley in 2025?',
    a: "The best Stardew Valley alternatives in 2025 are: Sun Haven (PC/Switch) — the most content-rich alternative with multiple towns, 50+ romance candidates, and deep combat in a full fantasy RPG world; Coral Island (PC/PS/Xbox/Switch) — a vibrant tropical farming game with ocean-diving mechanics and an environmental restoration storyline; Fields of Mistria (PC, Early Access) — the closest spiritual successor to Stardew in tone and charm, with beautiful pixel art and a cozy medieval European setting; and My Time at Sandrock (all platforms) — a deep crafting and town-rebuilding RPG with a fully voiced story set in a post-apocalyptic desert frontier. Each excels for a different type of player.",
  },
  {
    q: 'Is Sun Haven similar to Stardew Valley?',
    a: "Yes — Sun Haven is directly inspired by Stardew Valley and shares the core loop: farm, fish, mine, and build relationships with villagers. However, it expands significantly in several directions. Sun Haven features multiple playable fantasy races (elf, demon, neko, human, etc.), three separate towns to develop, a main quest narrative, and a more action-oriented combat system with a skill tree. If Stardew Valley is a cozy 2D farming RPG, Sun Haven is that same foundation expanded into a fuller fantasy RPG experience with considerably more content.",
  },
  {
    q: 'Is Coral Island worth playing?',
    a: "Yes — Coral Island is worth playing if you want a Stardew Valley alternative with a unique setting and premise. Its standout feature is ocean diving for resource gathering — you can explore coral reefs, collect underwater resources, and restore the ocean ecosystem as part of the core gameplay. The art is more vibrant and colorful than Stardew Valley, and it has one of the most diverse romance rosters of any farming game. Performance on Nintendo Switch can be inconsistent, so PC or PlayStation/Xbox is recommended for the best experience.",
  },
  {
    q: 'Is Fields of Mistria finished? Is it out of early access?',
    a: "As of 2024–2025, Fields of Mistria is still in Early Access on Steam. However, the available content is substantial and highly polished — many players describe it as feeling more complete than some fully-released games. The developer (NPC Studio) has been releasing updates consistently. A full 1.0 release date has not been officially announced. It is safe to buy and play in its current Early Access state if you're comfortable with games that receive ongoing updates.",
  },
  {
    q: 'What is the best farming RPG to play in 2025?',
    a: "The best farming RPG in 2025 depends on what you're looking for: Stardew Valley remains the gold standard for overall quality and value (~$15 for hundreds of hours). Sun Haven is the best for players who want a bigger RPG experience with more content, combat, and magic. Coral Island is the best for a unique tropical setting with ocean exploration. Fields of Mistria is the best for players who want the Stardew Valley feel in a fresh medieval fantasy world. My Time at Sandrock is the best for players who prioritize deep crafting systems and story. Take the quiz above to get a personalized recommendation.",
  },
]

const FAQ_ZH = [
  {
    q: '2025 年最好的类星露谷游戏有哪些？',
    a: '2025 年最好的星露谷替代品包括：Sun Haven（PC/Switch）——内容最丰富的替代品，有多个城镇、50 多位恋爱候选人和完整奇幻 RPG 世界中的深度战斗；珊瑚岛（PC/PS/Xbox/Switch）——生机勃勃的热带农场游戏，有海底潜水机制和环境修复故事线；Fields of Mistria（PC，抢先体验）——在基调和魅力上最接近星露谷的精神续作，有精美像素艺术和治愈的中世纪欧式设定；沙石镇时光（全平台）——深度制作和城镇重建 RPG，有完整配音故事，设定在后末日沙漠边境。每款都擅长不同类型的玩家。',
  },
  {
    q: 'Sun Haven 和星露谷物语相似吗？',
    a: '是的——Sun Haven 直接受到星露谷物语的启发，共享核心循环：耕种、钓鱼、挖矿、与村民建立关系。但它在几个方向上有显著扩展。Sun Haven 拥有多种可玩奇幻种族（精灵、恶魔、猫耳人、人类等）、三个独立的城镇、主线任务叙事，以及有技能树的更具动作性的战斗系统。如果说星露谷物语是一款治愈的 2D 农场 RPG，Sun Haven 就是在同样基础上扩展成内容更丰富的奇幻 RPG 体验。',
  },
  {
    q: '珊瑚岛值得玩吗？',
    a: '值得——如果你想要一款有独特设定和前提的星露谷替代品，珊瑚岛值得一玩。它的突出特点是用于资源采集的海底潜水——你可以探索珊瑚礁、收集水下资源，并将修复海洋生态系统作为核心游戏的一部分。美术风格比星露谷更生机勃勃、色彩更丰富，并且拥有任何农场游戏中最多元化的恋爱阵容之一。Nintendo Switch 上的性能可能不稳定，因此推荐 PC 或 PlayStation/Xbox 以获得最佳体验。',
  },
  {
    q: 'Fields of Mistria 完成了吗？已经出完整版了吗？',
    a: '截至 2024-2025 年，Fields of Mistria 仍在 Steam 上处于抢先体验阶段。然而，现有内容丰富且制作精良——许多玩家描述它感觉比一些已正式发售的游戏更完整。开发者（NPC Studio）一直在持续发布更新。正式 1.0 版本发布日期尚未官方公布。如果你对持续更新的游戏感到适应，在当前抢先体验状态下购买和游玩是安全的。',
  },
  {
    q: '2025 年最好的农场 RPG 是什么？',
    a: '2025 年最好的农场 RPG 取决于你的需求：星露谷物语在整体质量和性价比上仍是黄金标准（约 100 元人民币，数百小时游戏时长）。Sun Haven 是想要更大 RPG 体验、更多内容、战斗和魔法的玩家的最佳选择。珊瑚岛是想要有海洋探索的独特热带设定的最佳选择。Fields of Mistria 是想要在全新中世纪奇幻世界中体验星露谷感觉的最佳选择。沙石镇时光是优先考虑深度制作系统和故事的玩家的最佳选择。做上面的测验，获得个性化推荐。',
  },
]

export default async function StardewAltsPage({
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
            {isZh ? '星露谷替代品推荐测验' : 'Stardew Valley Alternatives Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <StardewAltsQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '星露谷只是开始。农场游戏世界比你想象的要大得多。'
            : "Stardew Valley was just the beginning. The farming game world is bigger than you think."}
        </p>

        <RelatedQuizzes currentSlug="stardew-alternatives" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于星露谷替代品的常见问题' : 'Stardew Valley Alternatives FAQ'}
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
