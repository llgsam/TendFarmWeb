import { StardewModsQuiz } from '@/components/tools/StardewModsQuiz'
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
      ? '星露谷物语模组测验 — 你应该装 SVE / 视觉模组 / 完整模组栈还是原版？'
      : 'Stardew Valley Mods Quiz — Should You Play Vanilla, SVE, Visual Mods, or Full Mod Stack?',
    description: isZh
      ? '6 个问题，根据你的游玩进度找到正确的模组策略。覆盖星露谷物语 Expanded（SVE）、Ridgeside Village、视觉模组和原版纯净游玩。'
      : '6 questions to find the right Stardew Valley mod strategy for where you are — pure vanilla, Stardew Valley Expanded (SVE), visual-only mods, or the full mod stack with SVE + Ridgeside + East Scarp.',
    keywords: isZh
      ? ['星露谷物语模组推荐', '星露谷 Expanded 值得玩吗', '星露谷模组新手教程', '星露谷物语视觉模组', '原版还是模组版星露谷', 'SMAPI 安装教程', 'Ridgeside Village 推荐']
      : [
          'stardew valley expanded worth it',
          'best stardew valley mods 2025',
          'stardew valley mods for beginners',
          'should i mod stardew valley',
          'stardew valley expanded vs vanilla',
          'how to install stardew valley mods',
          'stardew valley expanded review',
          'stardew valley visual mods',
          'ridgeside village stardew valley',
          'stardew valley smapi how to install',
          'stardew valley expanded how to install',
          'stardew valley modded playthrough',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/stardew-mods-quiz`,
      languages: buildLanguageAlternates('/quizzes/stardew-mods-quiz'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Is Stardew Valley Expanded worth installing?',
    a: "Yes — Stardew Valley Expanded (SVE) is absolutely worth installing if you have completed the vanilla game. It is the most downloaded Stardew Valley mod ever made, with over 10 million downloads on Nexus Mods. SVE adds two new farm maps, 27 new characters with full dialogue trees and heart events, multiple new areas to explore, new shops, seasonal events, new fish and crops, and a multi-chapter story that integrates seamlessly with vanilla content. Most players describe it as 'an official DLC-quality expansion.' You need SMAPI (the Stardew Modding API, free at smapi.io) to install it, and installation takes about 20-30 minutes following the Nexus Mods guide. Do not install SVE on your first playthrough — finish vanilla first for the best experience.",
  },
  {
    q: 'How do I install Stardew Valley mods? What is SMAPI?',
    a: "SMAPI (Stardew Modding API) is the free mod loader that makes most Stardew Valley mods work. Here is the basic installation process: 1) Download SMAPI from smapi.io and run the installer — it automatically detects your Stardew Valley installation. 2) Download mods from NexusMods.com/stardew-valley — always read the compatibility notes for the current Stardew version. 3) Unzip each mod into the 'Mods' folder that SMAPI creates in your Stardew Valley directory. 4) Launch Stardew Valley through SMAPI (a new launcher option appears). Most visual-only mods (texture replacements) do not require SMAPI and install by simply replacing files in the game's Content folder.",
  },
  {
    q: 'What are the best Stardew Valley mods for beginners?',
    a: "The best Stardew Valley mods for first-time modders are: 1) CJB Cheats Menu (quality-of-life features — no SMAPI needed, or minimal setup) for convenience; 2) DaisyNiko's Earthy Recolour for a beautiful visual overhaul that requires no SMAPI; 3) Elle's New Animals for higher-resolution farm animals — also no SMAPI. These three give you a noticeably improved experience with minimal technical complexity. After you are comfortable with basic texture swaps, graduate to SMAPI and add Stardew Valley Expanded for a content overhaul. The NexusMods page for each mod has detailed installation instructions.",
  },
  {
    q: 'Does Stardew Valley Expanded work with the 1.6 update?',
    a: "Yes — Stardew Valley Expanded has been updated to be compatible with Stardew Valley 1.6 (the major update released in 2024). Always check the Nexus Mods page for SVE to confirm you are downloading the version matching your game version, as compatibility updates sometimes lag a few weeks behind major game patches. The SMAPI console will alert you to any version mismatches when you launch. If SVE is not yet updated for the very latest patch, the Nexus Mods page will have a pinned note explaining the status and providing workarounds. The SVE mod team is very active and typically updates quickly after major game patches.",
  },
  {
    q: "Can you add mods to an existing Stardew Valley save, or do you need to start new?",
    a: "You can add most mods to an existing save — they do not require starting over. However, content mods that add new areas or characters (like Stardew Valley Expanded) are best experienced from a new save because some of their content is designed around your first experience of certain events. Visual mods (texture replacements) can always be added or removed from any existing save with no risk. If you do add SVE to an existing save, the new content will be available immediately; you just may miss some early introductory events. Always back up your save folder (Documents/My Games/Stardew Valley/Saves) before installing major content mods.",
  },
]

const FAQ_ZH = [
  {
    q: '星露谷物语 Expanded（SVE）值得安装吗？',
    a: '是的——如果你已经完成了原版游戏，星露谷物语 Expanded（SVE）绝对值得安装。它是有史以来下载量最多的星露谷物语模组，在 Nexus Mods 上拥有超过 1000 万次下载。SVE 增加了两个新农场地图、27 个有完整对话树和心事件的新角色、多个新探索区域、新商店、季节性活动、新鱼和新作物，以及一个与原版内容无缝整合的多章节故事。大多数玩家将其描述为"官方 DLC 质量的扩展"。你需要 SMAPI（星露谷模组 API，在 smapi.io 免费获取）来安装它，按照 Nexus Mods 指南安装大约需要 20-30 分钟。不要在你的第一次游玩时安装 SVE——先完成原版以获得最佳体验。',
  },
  {
    q: '如何安装星露谷物语模组？什么是 SMAPI？',
    a: 'SMAPI（星露谷模组 API）是使大多数星露谷物语模组正常工作的免费模组加载器。以下是基本安装过程：1）从 smapi.io 下载 SMAPI 并运行安装程序——它自动检测你的星露谷物语安装位置。2）从 NexusMods.com/stardew-valley 下载模组——始终阅读当前星露谷版本的兼容性说明。3）将每个模组解压到 SMAPI 在你的星露谷物语目录中创建的"Mods"文件夹中。4）通过 SMAPI 启动星露谷物语（出现新的启动器选项）。大多数纯视觉模组（纹理替换）不需要 SMAPI，只需替换游戏内容文件夹中的文件即可安装。',
  },
  {
    q: '星露谷物语新手最好装哪些模组？',
    a: '首次安装模组的玩家最好的入门模组是：1）CJB Cheats Menu（生活质量功能——不需要 SMAPI 或最少设置）方便使用；2）DaisyNiko 的大地色系重绘，带来美丽的视觉改造，不需要 SMAPI；3）Elle 的新动物，提供更高分辨率的农场动物——也不需要 SMAPI。这三款在技术复杂性最低的情况下给你明显改善的体验。当你习惯了基本的纹理替换后，升级到 SMAPI 并添加星露谷物语 Expanded 进行内容改造。每个模组的 NexusMods 页面都有详细的安装说明。',
  },
  {
    q: '星露谷物语 Expanded 与 1.6 更新兼容吗？',
    a: '是的——星露谷物语 Expanded 已更新为与星露谷物语 1.6（2024 年发布的重大更新）兼容。始终检查 SVE 的 Nexus Mods 页面，以确认你下载的版本与游戏版本匹配，因为兼容性更新有时会在主要游戏补丁发布后滞后几周。当你启动时，SMAPI 控制台会提醒你任何版本不匹配。如果 SVE 尚未针对最新补丁更新，Nexus Mods 页面将有固定说明解释状态并提供解决方法。SVE 模组团队非常活跃，通常在主要游戏补丁后迅速更新。',
  },
  {
    q: '可以将模组添加到现有的星露谷物语存档，还是需要新开存档？',
    a: '你可以将大多数模组添加到现有存档——它们不需要重新开始。但是，添加新区域或角色的内容模组（如星露谷物语 Expanded）最好在新存档中体验，因为它们的一些内容是围绕你第一次体验某些事件设计的。视觉模组（纹理替换）始终可以从任何现有存档中添加或删除，没有任何风险。如果你确实将 SVE 添加到现有存档，新内容将立即可用；只是你可能会错过一些早期介绍性事件。在安装主要内容模组之前，始终备份你的存档文件夹（文档/我的游戏/星露谷物语/Saves）。',
  },
]

export default async function StardewModsPage({
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
            {isZh ? '星露谷物语模组测验' : 'Stardew Valley Mods Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <StardewModsQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '最好的模组策略不是安装最多的，而是在你真正需要它的时候安装它。'
            : "The best mod strategy is not installing the most mods — it's installing the right ones at the right time."}
        </p>

        <RelatedQuizzes currentSlug="stardew-mods-quiz" locale={locale} />

        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '星露谷物语模组常见问题' : 'Stardew Valley Mods FAQ'}
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
