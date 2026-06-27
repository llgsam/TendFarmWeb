'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'campus' | 'zoo' | 'hospital' | 'coaster'

function ShareButton({ text, isZh }: { text: string; isZh: boolean }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    }
  }
  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copied ? (isZh ? '✓ 已复制！' : '✓ Copied!') : isZh ? '📋 复制结果' : '📋 Copy result'}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]"
      >
        𝕏 {isZh ? '分享' : 'Share'}
      </a>
    </div>
  )
}

const QUESTIONS: Array<{
  q_en: string
  q_zh: string
  options: Array<{ en: string; zh: string; type: Pick }>
}> = [
  {
    q_en: 'What would you most enjoy being responsible for?',
    q_zh: '你最享受管理哪种类型的事物？',
    options: [
      { en: 'A campus full of students learning unusual courses — from Scientography to Knight School — while keeping their social lives, grades, and wellbeing in balance', zh: '一个充满学生学习奇特课程的校园——从"科学摄影"到"骑士学校"——同时维持他们的社交生活、成绩和身心健康', type: 'campus' },
      { en: 'A zoo where animal welfare and conservation breeding matter as much as profit — designing biome-accurate habitats and watching rare species thrive', zh: '一个动物福利和保育繁殖与盈利同等重要的动物园——设计符合生物群落的栖息地，看着稀有物种茁壮成长', type: 'zoo' },
      { en: 'A chaotic, comedy-filled hospital where every patient has an absurd ailment — optimizing staff workflow, room layout, and queue management under time pressure', zh: '一个充满混乱喜剧感的医院，每位病人都有荒诞病情——在时间压力下优化员工流程、房间布局和排队管理', type: 'hospital' },
      { en: 'A theme park where you design every rollercoaster by hand, place scenery piece by piece, and watch guests react in real time to every twist and drop', zh: '一个主题公园，你亲手设计每一座过山车，逐件摆放装饰，实时观看游客对每个弯道和下坡的反应', type: 'coaster' },
    ],
  },
  {
    q_en: 'How do you prefer the "creativity vs. optimization" balance in a management game?',
    q_zh: '你在管理游戏中更偏好「创意」还是「优化」？',
    options: [
      { en: 'Deep systems with clear optimization — course research trees, staff specialization, grant applications, and student happiness metrics to tune', zh: '有明确优化目标的深度系统——课程研究树、员工专业化、助学金申请和需要调整的学生满意度指标', type: 'campus' },
      { en: 'Creative habitat design first, optimization second — I want artistic freedom building realistic biomes before worrying about the conservation budget', zh: '先创意栖息地设计，后优化——我想在担心保育预算之前，享受构建逼真生物群落的艺术自由', type: 'zoo' },
      { en: 'Pure optimization — diagnosing bottlenecks, adjusting staff ratios, and watching a previously broken hospital become a smoothly running machine', zh: '纯粹优化——诊断瓶颈、调整员工比例，看着一家之前混乱的医院变成运转顺畅的机器', type: 'hospital' },
      { en: 'Maximum creative freedom — I want to engineer rollercoasters from scratch and design a park aesthetic that is entirely my own vision', zh: '最大创意自由——我想从零工程师般设计过山车，打造完全属于自己愿景的公园美学', type: 'coaster' },
    ],
  },
  {
    q_en: 'What kind of visual world do you want to spend hours inside?',
    q_zh: '你想在哪种视觉世界里沉浸数小时？',
    options: [
      { en: 'Ivy-covered campus buildings, student clubs on the lawn, quirky course classrooms with themed decorations — warm, academic, gently satirical', zh: '爬满常春藤的校园建筑、草坪上的学生社团、主题装饰的奇特课程教室——温暖、学术、带着温和讽刺', type: 'campus' },
      { en: 'Lush, naturalistic habitats with dense foliage, waterfalls, and hundreds of real animals behaving authentically — the most beautiful management sim ever made', zh: '郁郁葱葱的自然栖息地，茂密的植被、瀑布和数百种真实动物的真实行为——有史以来最美丽的管理模拟', type: 'zoo' },
      { en: 'Colorful, stylized hospital corridors filled with nurses, doctors, and patients with hilariously absurd conditions — humor as the primary art direction', zh: '色彩鲜艳、风格化的医院走廊，充满护士、医生和患有荒诞病症的病人——幽默作为主要艺术方向', type: 'hospital' },
      { en: 'Grand theme park grounds with enormous, twisting rides towering above the horizon, illuminated signs at night, and crowds moving through your meticulously planned paths', zh: '宏伟的主题公园，巨型扭曲游乐设施高耸入云，夜晚的彩色招牌闪烁，人群穿行于你精心规划的小路间', type: 'coaster' },
    ],
  },
  {
    q_en: 'What does your ideal failure state look like?',
    q_zh: '你在游戏中最能接受哪种「失败状态」？',
    options: [
      { en: 'Student satisfaction drops and enrollment falls — I need to redesign the curriculum and rebuild morale before the next academic year', zh: '学生满意度下降、招生减少——我需要在下学年前重新设计课程并重建士气', type: 'campus' },
      { en: 'An animal gets sick or escapes its habitat — I need to quickly address welfare issues before the conservation rating collapses', zh: '动物生病或逃出栖息地——我需要在保育评级崩溃前快速解决福利问题', type: 'zoo' },
      { en: 'Queues spiral out of control and patients start leaving unhappy — diagnosing the bottleneck under pressure is part of the fun', zh: '队列失控，病人开始不满离开——在压力下诊断瓶颈是乐趣的一部分', type: 'hospital' },
      { en: 'A ride breaks down mid-day and guest satisfaction tanks — rushing to fix it while keeping the rest of the park running is exactly the kind of crisis I enjoy', zh: '游乐设施在白天中途出故障，游客满意度急跌——在保持公园其余部分运营的同时紧急修复，正是我喜欢的危机类型', type: 'coaster' },
    ],
  },
  {
    q_en: 'How do you feel about tutorial pacing and learning curve?',
    q_zh: '你对游戏的教程节奏和学习曲线有何期待？',
    options: [
      { en: 'Structured but generous — I want guided scenarios that teach each mechanic before opening the sandbox, with enough budget buffer to experiment freely', zh: '有结构但宽松——我想要引导场景在开放沙盒前教授每个机制，并有足够的预算缓冲让我自由实验', type: 'campus' },
      { en: 'Steep but rewarding — Planet Zoo has a high learning curve; I am willing to spend time learning habitat requirements because the payoff is beautiful', zh: '陡峭但有回报——Planet Zoo 有很高的学习曲线；我愿意花时间学习栖息地要求，因为回报是美丽的', type: 'zoo' },
      { en: 'Thrown in at the deep end — I prefer to figure things out by watching a crisis unfold and diagnosing what went wrong, rather than following a tutorial', zh: '直接深入——我更喜欢通过观察危机展开并诊断出错的地方来解决问题，而不是跟着教程走', type: 'hospital' },
      { en: 'Gradual and creative — I want a career mode that teaches ride design mechanics gently before unlocking sandbox, where I can build anything with unlimited funds', zh: '循序渐进且有创意——我想要一个生涯模式在解锁沙盒前温和地教授游乐设施设计机制，在那里我可以用无限资金建造任何东西', type: 'coaster' },
    ],
  },
  {
    q_en: 'Which end-of-session summary sounds most satisfying?',
    q_zh: '哪种游戏结束时的总结听起来最令人满足？',
    options: [
      { en: 'Three students just graduated my new Virtual Reality course with honors, my campus happiness score hit 80%, and I just unlocked Gastronomy as a course option for next year', zh: '三名学生以优异成绩从我新开设的虚拟现实课程毕业，校园幸福感达到 80%，我刚解锁了下年的"美食学"课程选项', type: 'campus' },
      { en: 'My endangered snow leopard breeding pair had two cubs, both cleared for the conservation release program — and my Arctic Wolf habitat finally earned a five-star welfare rating', zh: '我濒危雪豹繁殖对有了两只幼崽，都已通过保育放归计划审核——我的北极狼栖息地终于获得五星福利评级', type: 'zoo' },
      { en: 'I cleared an emergency queue in under ten minutes, diagnosed a staff-shortage bottleneck in Cardiology, hired two new surgeons, and profits are up 40% from last month', zh: '我在十分钟内清空了急诊队列，诊断出心脏科的人手短缺瓶颈，招聘了两名新外科医生，本月利润提升了 40%', type: 'hospital' },
      { en: 'My new hypercoaster just hit a 97% excitement rating, guests are screaming on the final drop, and the park photography spots I designed are filling up with happy visitors', zh: '我的新超级过山车刚刚获得 97% 的刺激评级，游客在最后的下坡处尖叫，我设计的公园拍照点挤满了快乐的游客', type: 'coaster' },
    ],
  },
]

const RESULTS: Record<
  Pick,
  {
    title_en: string
    title_zh: string
    emoji: string
    tag_en: string
    tag_zh: string
    platform_en: string
    platform_zh: string
    why_en: string
    why_zh: string
    tip_en: string
    tip_zh: string
  }
> = {
  campus: {
    title_en: 'Two Point Campus',
    title_zh: 'Two Point Campus',
    emoji: '🎓',
    tag_en: 'Run a university full of students learning absurd courses — from Knight School to Spy School — in a charming, systems-rich management sim available on Game Pass',
    tag_zh: '经营一所学生学习荒诞课程的大学——从骑士学校到间谍学校——在 Game Pass 上可玩的迷人、系统丰富的管理模拟',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, PS5, Xbox, Game Pass — about $30 new, often on sale for $10-15',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——新品约 30 美元，经常特价 10-15 美元',
    why_en:
      "Two Point Campus (2022) is the follow-up to Two Point Hospital — a management simulator set in a series of eccentric university campuses where students enroll in courses like Knight School (literally medieval knight training), Scientography (photography of science), and Gastronomy (cooking as academic pursuit). You design campus layouts, manage staff (teachers, assistants, janitors), keep students happy through clubs and social spaces, and optimize a research tree that unlocks new courses and upgrades. The humor is constant — student ailments, staff personalities, and course descriptions are all written with genuine wit. The management depth is real: you balance enrollment numbers, student satisfaction, staff wages, and grant applications across multiple campus areas. Available on Xbox Game Pass, it is one of the easiest management sims to get into for farming game players who love the daily optimization loop of Stardew Valley's farm management — but applied to a campus instead of crops. Metacritic score approximately 80-84 across platforms.",
    why_zh:
      'Two Point Campus（2022 年）是 Two Point Hospital 的续作——一款以一系列古怪大学校园为背景的管理模拟，学生可以参加骑士学校（字面意思的中世纪骑士训练）、科学摄影（科学摄影学）和美食学（作为学术追求的烹饪）等课程。你设计校园布局，管理员工（教师、助理、清洁工），通过社团和社交空间让学生快乐，并优化解锁新课程和升级的研究树。幽默无处不在——学生病情、员工个性和课程描述都有真正的才智。管理深度是真实的：你需要在多个校园区域平衡招生人数、学生满意度、员工薪资和助学金申请。Xbox Game Pass 可玩，是农场游戏玩家最容易上手的管理模拟之一。',
    tip_en: "Build a Sports Hall and a Student Union early — these two buildings raise campus-wide happiness passively and pay for themselves in enrollment. Don't try to run multiple campuses simultaneously until you understand the staff-to-room ratio: one teacher per one active classroom is the baseline. Research the Gnarly Gnome grant early — it funds campus expansion and unlocks faster than most players expect.",
    tip_zh: '早期建造体育馆和学生会——这两栋建筑可以被动提升全校幸福感并通过招生回本。在理解员工与房间比例之前，不要尝试同时运营多个校区：一位教师对应一间活跃教室是基准。早期研究"Gnarly Gnome 助学金"——它资助校园扩张，解锁速度比大多数玩家预期的快。',
  },
  zoo: {
    title_en: 'Planet Zoo',
    title_zh: 'Planet Zoo',
    emoji: '🦁',
    tag_en: 'The most detailed zoo simulator ever made — design biome-accurate habitats for 300+ real animal species, run conservation breeding programs, and build breathtaking parks',
    tag_zh: '有史以来最详细的动物园模拟——为 300+ 种真实动物设计符合生物群落的栖息地，运行保育繁育计划，建造令人叹为观止的公园',
    platform_en: 'Available on: PC (Steam) only — about $45. DLC packs add additional animal species. Often on sale for $10-15.',
    platform_zh: '可在以下平台获取：仅 PC（Steam）——约 45 美元。DLC 包添加额外动物物种。经常特价 10-15 美元。',
    why_en:
      "Planet Zoo (2019) is Frontier Developments' masterpiece zoo simulation — a game so detailed in its animal welfare systems that it has been used as an educational reference for zoo design principles. Each animal species has authentic behavioral needs (specific terrain, social group sizes, enrichment items, water depth), and meeting those needs drives your conservation rating and animal happiness. The habitat building system is fully modular — you sculpt terrain, place vegetation, design water features, and connect exhibits with guest paths to create habitats that look genuinely naturalistic. The game includes 300+ real animal species at base, with DLC packs adding dozens more. A full conservation program lets you breed animals for wild release, adding a moral dimension beyond pure profit management. The Steam Workshop is enormous — thousands of free community-built habitat blueprints, scenery pieces, and full park layouts. For farming game players who love the crafting and design elements of Stardew Valley or Animal Crossing: the habitat creation in Planet Zoo scratches a very similar itch at enormous scale. PC only, but runs well on mid-range hardware.",
    why_zh:
      'Planet Zoo（2019 年）是 Frontier Developments 的杰作动物园模拟——一款动物福利系统如此详细，以至于被用作动物园设计原则的教育参考。每种动物物种都有真实的行为需求（特定地形、社群规模、丰容物品、水深），满足这些需求可提升你的保育评级和动物幸福感。栖息地建造系统完全模块化——你雕刻地形、放置植被、设计水景，并用客人通道连接展区，创造真正自然的栖息地外观。基础游戏包含 300+ 种真实动物，DLC 包添加更多。完整的保育计划让你繁育动物以供野外放归，增添了超越纯利润管理的道德维度。Steam 创意工坊规模庞大——数千个免费的社区构建栖息地蓝图、装饰物品和完整公园布局。仅 PC 版，但在中档硬件上运行良好。',
    tip_en: "Use the Steam Workshop from your very first session — download three or four well-rated habitat blueprints for the animals you plan to feature and place them as your starting exhibits. This lets you focus on learning the guest path and finance systems before tackling habitat design yourself. Always check the animal welfare panel before adding new animals: unmet terrain or social needs are invisible until you look, and unhappy animals tank your conservation rating fast.",
    tip_zh: '从第一次游戏就使用 Steam 创意工坊——下载三四个评分良好的栖息地蓝图，作为你的起始展区。这让你在自己尝试栖息地设计之前，先专注于学习客人路线和财务系统。添加新动物前务必检查动物福利面板：未满足的地形或社群需求是不可见的，而不快乐的动物会迅速拉低你的保育评级。',
  },
  hospital: {
    title_en: 'Two Point Hospital',
    title_zh: 'Two Point Hospital',
    emoji: '🏥',
    tag_en: 'A comedy hospital management sim where every patient has an absurdly funny illness — balance staff, rooms, and queues across dozens of chaotic hospitals',
    tag_zh: '一款喜剧医院管理模拟，每位病人都有荒诞可笑的病症——在数十家混乱医院中平衡员工、房间和队列',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, PS5, Xbox, Xbox Game Pass — about $25 new, often on sale for $5-10',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Xbox Game Pass——新品约 25 美元，经常特价 5-10 美元',
    why_en:
      "Two Point Hospital (2018) is the spiritual successor to the legendary Theme Hospital (1997) — a management simulator where you build and run a series of comedy hospitals treating patients with hilariously absurd conditions (Lightheadedness, Jest Infection, Fractured Ego, Alien DNA). Each hospital introduces new mechanics and space constraints, forcing you to rethink your hospital design. The management systems are genuinely deep: you hire staff with different skill levels and training needs, design room layouts for maximum efficiency, manage a reputation system that affects new patient intake, and run a marketing program to attract specific patient types. Queue management is the core skill — a backed-up corridor means patients leave unhappy and your rating drops. Available on Xbox Game Pass, it is extremely well-paced with 15+ distinct hospital scenarios that introduce mechanics gradually. Metacritic score 85 on PC. For players who loved the daily routine and optimization loop of farming games — Two Point Hospital takes that loop and adds the chaos of managing a living, breathing institution where every decision has cascading consequences.",
    why_zh:
      'Two Point Hospital（2018 年）是传奇游戏 Theme Hospital（1997 年）的精神续作——一款管理模拟，你建造和运营一系列喜剧医院，治疗患有荒诞病症的病人（头晕目眩症、小丑感染、自我骨折、外星 DNA）。每家医院引入新的机制和空间限制，迫使你重新思考医院设计。管理系统真正深入：你雇用具有不同技能水平和培训需求的员工，设计最高效的房间布局，管理影响新病人入院的声誉系统，并运行营销计划来吸引特定类型的病人。队列管理是核心技能——堵塞的走廊意味着病人不满离开，你的评级下降。Xbox Game Pass 可玩，有 15+ 个不同医院场景逐步引入机制。PC 版 Metacritic 评分 85 分。',
    tip_en: "The most common mistake is under-hiring janitors early — hire two per ten rooms from the start and upgrade their maintenance skill first. Every room needs a radiator or the room comfort score drops, which feeds into patient satisfaction. Never skip Marketing: one marketing campaign targeting your highest-capacity room pays back within a month of game time. Staff training is the long-term investment that separates good hospitals from great ones.",
    tip_zh: '最常见的错误是早期清洁工雇用不足——从一开始就每十间房雇用两名，并首先升级他们的维护技能。每间房都需要暖气片，否则房间舒适度评分下降，进而影响病人满意度。永远不要跳过营销：一个针对容量最高房间的营销活动在游戏时间一个月内即可回本。员工培训是区分好医院和优秀医院的长期投资。',
  },
  coaster: {
    title_en: 'Planet Coaster 2',
    title_zh: 'Planet Coaster 2',
    emoji: '🎢',
    tag_en: 'Design rollercoasters by hand, build water parks, and sculpt entire theme parks from scratch — the most creatively free management sim available in 2024',
    tag_zh: '亲手设计过山车、建造水上乐园、从零打造整个主题公园——2024 年最有创意自由的管理模拟',
    platform_en: 'Available on: PC (Steam), Xbox Series X/S, PS5 — about $50. Full release November 2024.',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox Series X/S、PS5——约 50 美元。2024 年 11 月正式发行。',
    why_en:
      "Planet Coaster 2 (2024) is the sequel to Frontier's beloved theme park management simulator, and it is by far the most creatively ambitious management game on this list. The centrepiece is the custom coaster builder: you place track segments by hand, control every curve and banking angle, and test the G-force physics before opening to guests. New in the sequel: full water park support with water slides, wave pools, and lazy rivers; dive coasters that plunge riders into water; and a redesigned terrain sculpting system that makes landscapes feel genuinely organic. The management layer — guest pathing, finance, staff, maintenance — sits underneath the creativity tools and can be played seriously or ignored entirely in sandbox mode with unlimited money. The Steam Workshop is already filling with extraordinary community-built parks and blueprints. For farming game players who love the design and decoration elements of Animal Crossing or Stardew Valley's farm layout planning: Planet Coaster 2's park building is that same impulse at theme park scale — the joy of seeing guests react to something you built from nothing.",
    why_zh:
      'Planet Coaster 2（2024 年）是 Frontier 备受喜爱的主题公园管理模拟的续作，是这个列表中目前为止最具创意野心的管理游戏。核心是自定义过山车建造器：你手动放置轨道段，控制每个弯道和倾斜角度，并在对游客开放前测试 G 力物理效果。续作新增：完整的水上乐园支持，包括水滑梯、波浪池和懒人河；俯冲过山车将乘客冲入水中；以及重新设计的地形雕刻系统，使景观感觉真正有机。管理层——游客路线、财务、员工、维护——位于创意工具之下，可以认真游玩，也可以在无限资金的沙盒模式中完全忽略。Steam 创意工坊已经充满了社区构建的出色公园和蓝图。2024 年 11 月正式发行。',
    tip_en: "Start in Career mode (not sandbox) even if you want maximum creativity — the early career missions teach ride naming, queue decoration, and staff management before the financial challenge ramps up. Decorated queues directly raise ride ratings; never leave a queue path bare. Download one or two community rollercoaster blueprints from the Workshop for your first park to learn what a well-rated coaster looks like, then modify it to understand the builder before designing from scratch.",
    tip_zh: '即使你想要最大创意自由，也从生涯模式（而非沙盒）开始——早期生涯任务在财务挑战升级之前教授游乐设施命名、队列装饰和员工管理。装饰队列直接提升游乐设施评级；永远不要让队列路径空着。从创意工坊下载一两个社区过山车蓝图作为你的第一个公园，了解高评分过山车的样子，然后修改它以理解建造器，再从零开始设计。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { campus: 0, zoo: 0, hospital: 0, coaster: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyManagementQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-management-quiz`
    const shareText = isZh
      ? `管理模拟游戏推荐测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My management sim recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
          <p className="text-xs text-[#4a5a4a]">{isZh ? result.platform_zh : result.platform_en}</p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.why_zh : result.why_en}
        </p>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {isZh ? '入门建议：' : 'Getting started: '}
            </span>
            {isZh ? result.tip_zh : result.tip_en}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把游戏里的生活节奏带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the rhythm of game life into real daily life.'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} isZh={isZh} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {isZh ? '重新测试' : 'Retake Quiz'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-bold text-[#e8dcc8]">
          {isZh ? '哪款管理模拟游戏最适合你？' : 'Which Management Sim Is Right for Cozy Gamers?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从 Two Point Campus、Planet Zoo、Two Point Hospital、Planet Coaster 2 中找到你的游戏'
            : '6 questions to match you with Two Point Campus, Planet Zoo, Two Point Hospital, or Planet Coaster 2'}
        </p>
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, qi) => (
          <div key={qi}>
            <p className="mb-3 font-medium text-[#e8dcc8]">
              {qi + 1}. {isZh ? q.q_zh : q.q_en}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => { const next = [...answers]; next[qi] = opt.type; setAnswers(next) }}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    answers[qi] === opt.type
                      ? 'border-[#f0a832] bg-[#f0a832]/10 text-[#e8dcc8]'
                      : 'border-[#2d3d2d] text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]'
                  }`}
                >
                  {isZh ? opt.zh : opt.en}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={!allAnswered}
        onClick={() => setSubmitted(true)}
        className={`mt-8 w-full rounded-xl py-3 font-semibold transition-colors ${
          allAnswered ? 'bg-[#f0a832] text-[#0f1a0f] hover:bg-[#e09822]' : 'cursor-not-allowed bg-[#2d3d2d] text-[#4a5a4a]'
        }`}
      >
        {isZh ? '找到我的管理模拟游戏' : 'Find My Management Sim'}
      </button>
    </div>
  )
}
