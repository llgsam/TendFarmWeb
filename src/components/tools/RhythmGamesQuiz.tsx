'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'sayonara' | 'trombone' | 'necrodancer' | 'melatonin'

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
    q_en: 'What role does music play in how you want to experience a game?',
    q_zh: '音乐在你想要的游戏体验中扮演什么角色？',
    options: [
      { en: 'Music IS the game — I want a cinematic music video I play through, where every visual and movement is synchronized to an original synth-pop soundtrack that tells a wordless love story', zh: '音乐就是游戏本身——我想要一个我能玩过去的电影式音乐视频，每一个视觉和动作都与讲述无字爱情故事的原创合成流行音乐同步', type: 'sayonara' },
      { en: 'Music is the joke — I want to use it as a comedic instrument (specifically a trombone I can play badly and hilariously), where hitting every note is less important than the absurdist spectacle of a terrible trombone performance', zh: '音乐是玩笑——我想把它用作喜剧乐器（特别是我可以弹得很糟糕且非常搞笑的长号），击中每个音符不如一场糟糕长号表演的荒诞奇景重要', type: 'trombone' },
      { en: 'Music is the challenge — I want the beat to dictate every action (movement, attacks, item use), and the satisfaction comes from staying in rhythm through increasingly complex procedurally generated environments', zh: '音乐是挑战——我想要节拍支配每一个动作（移动、攻击、物品使用），满足感来自在越来越复杂的程序生成环境中保持节奏', type: 'necrodancer' },
      { en: 'Music is the atmosphere — I want a gentle rhythm game set inside dream sequences, where the music is so soft and the visuals so dreamy that success feels like drifting rather than performing', zh: '音乐是氛围——我想要一款设定在梦境序列中的温和节奏游戏，音乐如此柔和、视觉如此梦幻，成功感觉像是漂浮而非表演', type: 'melatonin' },
    ],
  },
  {
    q_en: 'How long do you want to spend on your first playthrough?',
    q_zh: '你希望第一次游玩花多少时间？',
    options: [
      { en: 'About 1-2 hours — a short, complete, cinematic experience I can finish in one sitting and immediately want to replay for the S-rank scores and alternate routes I missed', zh: '约 1-2 小时——一个我可以一口气完成的短暂、完整、电影式体验，然后立刻想要重玩以获取我错过的 S 级评分和不同路线', type: 'sayonara' },
      { en: 'A few hours of pure absurdism — I want to play enough songs that I feel the full range of the joke, from "this is funny" to "this is transcendent" to "why am I this invested in hitting a trombone note"', zh: '几小时的纯荒诞主义——我想玩足够多的歌曲以感受笑话的全部范围，从"这很有趣"到"这已超然"再到"我为什么对击中一个长号音符如此投入"', type: 'trombone' },
      { en: 'Open-ended — I want a roguelike rhythm game that I can play indefinitely, where each run is a unique procedurally generated dungeon and mastery comes from hundreds of hours of learning the rhythms', zh: '开放式——我想要一款我可以无限游玩的 Roguelike 节奏游戏，每次游玩都是独特的程序生成地牢，精通来自数百小时的节奏学习', type: 'necrodancer' },
      { en: '3-4 hours for a relaxed first run — the game is divided into short dream chapters I can play in 15-20 minute bursts, and I can replay any dream I liked as many times as I want', zh: '轻松的第一次游玩约 3-4 小时——游戏分为我可以用 15-20 分钟爆发游玩的短暂梦境章节，我可以随时重玩任何我喜欢的梦境', type: 'melatonin' },
    ],
  },
  {
    q_en: 'What kind of challenge do you want from a rhythm game?',
    q_zh: '你想从节奏游戏中获得什么样的挑战？',
    options: [
      { en: 'Light skill expression with replay value — the auto-runner format is forgiving enough to enjoy on a first run, but chasing S-ranks on every level requires memorization and precise timing worth returning for', zh: '轻度技巧表达和重玩价值——自动跑酷格式足够宽容以在第一次游玩时享受，但在每个关卡追求 S 级需要值得回归的记忆和精确时机', type: 'sayonara' },
      { en: 'Comedic failure is part of the fun — I am actively fine with being bad at this game; the wiggling trombone animation when I miss a note is funnier than getting it right, and the audience\'s groaning reaction is a reward in itself', zh: '喜剧性失败是乐趣的一部分——我完全接受玩不好这款游戏；当我错过音符时摇摆的长号动画比击中音符更有趣，观众的呻吟反应本身就是一种奖励', type: 'trombone' },
      { en: 'Very high — I want a rhythm game that will genuinely punish bad timing and teach me to feel the beat in my movement decisions, not just button presses', zh: '非常高——我想要一款真正惩罚坏时机并教我在移动决策中感受节拍的节奏游戏，而不仅仅是按钮按压', type: 'necrodancer' },
      { en: 'Gentle — I want to succeed most of the time on my first attempt, feel the rhythm without fear of failure, and treat the game more as a meditative experience than a performance test', zh: '温和——我想在第一次尝试时大多数时候都能成功，在没有失败恐惧的情况下感受节奏，并将游戏更多地视为冥想体验而非表演测试', type: 'melatonin' },
    ],
  },
  {
    q_en: 'Which visual and emotional tone sounds most appealing?',
    q_zh: '哪种视觉和情感基调最吸引你？',
    options: [
      { en: 'Neon-saturated synth-pop dreamscape — a motorcycle chase through a tarot card world, a figure jumping between geometric shapes in a city of light, and an ending that lands as an emotional gut punch despite having no dialogue', zh: '霓虹饱和的合成流行梦境——穿越塔罗牌世界的摩托车追逐、在光之城几何形状间跳跃的身影，以及一个尽管没有对话却如情感重击的结局', type: 'sayonara' },
      { en: 'Gloriously absurd — the game\'s entire aesthetic is built around the dignity and tragedy of trombone performance, with a crowd of audience members who react in real-time to your playing quality and an achievement system full of impossible jokes', zh: '光荣的荒诞——游戏的整体美学建立在长号表演的尊严和悲剧之上，拥有实时对你的演奏质量做出反应的观众，以及充满不可能笑话的成就系统', type: 'trombone' },
      { en: 'Gothic pixel dungeon with a thumping bass — a neon-lit underground dungeon where monsters dance to the beat and the visual rhythm of the world is synchronized to the music, creating a hypnotic effect during good runs', zh: '拥有砰砰低音的哥特像素地牢——一个霓虹灯照亮的地下地牢，怪物随节拍起舞，世界的视觉节奏与音乐同步，在顺利的游玩中创造催眠效果', type: 'necrodancer' },
      { en: 'Pastel dream sequences — each level is inside a different dream (a garden, a bakery, a party, a starry night), rendered in soft watercolor pastels, and the music matches the warmth and safety of a good dream', zh: '粉彩梦境序列——每个关卡都在不同的梦境中（花园、面包店、派对、星夜），以柔和的水彩粉彩渲染，音乐与美梦的温暖和安全感相匹配', type: 'melatonin' },
    ],
  },
  {
    q_en: 'Which platform and price fits you best?',
    q_zh: '哪种平台和价格最适合你？',
    options: [
      { en: 'Nintendo Switch or Apple Arcade — I want to play this on my Switch in handheld mode or on my iPhone/iPad with the Apple Arcade subscription I already have; the short runtime makes it perfect for portable play', zh: 'Nintendo Switch 或 Apple Arcade——我想在便携模式的 Switch 上或用我已有的 Apple Arcade 订阅在 iPhone/iPad 上玩；短暂的游玩时间使其非常适合便携游玩', type: 'sayonara' },
      { en: 'PC (Steam) — this is a PC-first game and the experience of using a mouse or keyboard to control a trombone is part of the charm; I want the full PC version with all DLC and the card-collecting metagame', zh: 'PC（Steam）——这是一款 PC 优先的游戏，使用鼠标或键盘控制长号的体验是其魅力的一部分；我想要包含所有 DLC 和集卡元游戏的完整 PC 版本', type: 'trombone' },
      { en: 'PC or Switch at a modest price — I want the best price-to-content ratio here; the game has extensive DLC and is frequently on sale, and I plan to spend hundreds of hours so even full price represents excellent value', zh: 'PC 或 Switch 适中价格——我想要最佳的性价比；游戏有大量 DLC 且经常打折，我计划花数百小时所以即使是原价也代表出色的价值', type: 'necrodancer' },
      { en: 'PC or Switch at a gentle entry price — I want something that does not feel like a financial commitment before I know I will love it; this game costs about $15 and the demo is available to try before buying', zh: 'PC 或 Switch 温和入门价格——我想要在知道自己会喜欢之前不感觉是财务承诺的东西；这款游戏约 15 美元，购买前可以试玩演示', type: 'melatonin' },
    ],
  },
  {
    q_en: 'Which post-session feeling sounds most satisfying?',
    q_zh: '哪种游玩后的感觉最令你满足？',
    options: [
      { en: 'I just watched the credits roll on one of the most beautiful 90-minute experiences I have ever had in gaming — I felt something real, the music is still in my head, and I am immediately going back to replay my favorite level for the S-rank', zh: '我刚看完了我在游戏中经历过的最美丽的 90 分钟体验之一的片尾字幕——我感受到了真实的东西，音乐还萦绕在脑海中，我立刻回去重玩我最喜欢的关卡争取 S 级', type: 'sayonara' },
      { en: 'I just sent a video of my terrible trombone performance to three friends who are now also playing — the shared absurdity of this game is its highest value, and watching someone else fail at the trombone is funnier than succeeding yourself', zh: '我刚把我糟糕的长号表演视频发给了三个现在也在玩的朋友——这款游戏的共同荒诞性是其最高价值，看别人在长号上失败比自己成功更有趣', type: 'trombone' },
      { en: 'I just completed a run where I kept the beat through the entire Crypt without dying — the flow state of being perfectly synchronized to the music while making split-second tactical decisions felt genuinely transcendent', zh: '我刚完成了一次在整个地窟中保持节拍而没有死亡的游玩——在做出瞬间战术决策的同时与音乐完美同步的心流状态感觉真正超然', type: 'necrodancer' },
      { en: 'I just played through the Garden dream three times because the music made me feel a specific kind of safe that I wanted to stay in — this game is less about completion and more about the feeling of being gently present in a dream', zh: '我刚把花园梦境玩了三遍，因为音乐让我感受到一种特定的安全感，我想留在其中——这款游戏与其说是关于完成，不如说是关于在梦中温和地活在当下的感觉', type: 'melatonin' },
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
  sayonara: {
    title_en: 'Sayonara Wild Hearts',
    title_zh: '再见狂心',
    emoji: '🎴',
    tag_en: 'A 90-minute synth-pop music video you play through — neon motorcycles, tarot cards, heartbreak, and one of the most emotionally resonant short games ever made',
    tag_zh: '一个你能玩过去的 90 分钟合成流行音乐视频——霓虹摩托车、塔罗牌、心碎，以及有史以来情感共鸣最强的短篇游戏之一',
    platform_en: 'Available on: Nintendo Switch, Apple Arcade (free with subscription), PC (Steam ~$13), PlayStation. Apple Arcade is the best value.',
    platform_zh: '可在以下平台获取：Nintendo Switch、Apple Arcade（订阅免费）、PC（Steam 约 13 美元）、PlayStation。Apple Arcade 是最佳价值。',
    why_en:
      "Sayonara Wild Hearts (2019, Simogo) is one of the most singular gaming experiences of the past decade — a 90-minute interactive music video where you guide a heartbroken woman through a neon dreamscape of motorcycle chases, geometric puzzle sequences, and boss fights against tarot card archetypes, all synchronized to an original synth-pop and dream pop soundtrack. The album — composed by Daniel Olsén and Jonathan Eng — is genuinely exceptional music that works completely outside the game. The gameplay is an auto-runner with light directional input, making it accessible to non-gamers while offering S-rank replay value for players who want mastery. The narrative is told entirely without dialogue: a breakup, a dissolution of self, and a gradual reconstruction of identity communicated purely through visual metaphor and music. It runs about 90 minutes on a first playthrough and costs about $13 on Steam (or free with Apple Arcade). Many players consider it the most moving short game they have ever played. Metacritic 84 on Switch.",
    why_zh:
      '再见狂心（2019 年，Simogo）是过去十年中最独特的游戏体验之一——一个 90 分钟的互动音乐视频，你引导一个心碎的女人穿越霓虹梦境，经历摩托车追逐、几何谜题序列和与塔罗牌原型的 Boss 战，全部与原创合成流行和梦境流行音乐配乐同步。游戏总时长约 90 分钟，Steam 售价约 13 美元，Apple Arcade 订阅免费。许多玩家认为这是他们玩过的情感上最动人的短篇游戏。Switch 版 Metacritic 84 分。',
    tip_en: "Play with headphones — the spatial audio in Sayonara Wild Hearts is a significant part of the experience, and speakers flatten it considerably. The game difficulty is very forgiving (you respawn automatically), so do not worry about failing; treat the first playthrough as watching a film and only chase S-ranks on a second run. The album is available on all streaming platforms — listening to it after finishing the game is a beautiful way to revisit the experience. The final level is the hardest in the game and requires full attention to the beat.",
    tip_zh: '用耳机游玩——再见狂心的空间音频是体验的重要组成部分，音箱会大幅削减这种效果。游戏难度非常宽容（你会自动复活），所以不要担心失败；将第一次游玩视为看电影，只在第二次游玩时追求 S 级。该专辑在所有流媒体平台上都有——游戏结束后收听它是重温体验的美好方式。最后一关是游戏中最难的，需要全神贯注地跟随节拍。',
  },
  trombone: {
    title_en: 'Trombone Champ',
    title_zh: '长号冠军',
    emoji: '🎺',
    tag_en: 'The funniest music game ever made — you play a real trombone (very badly) through classical music and meme songs, and the audience\'s pained reactions are as much the game as the rhythm',
    tag_zh: '有史以来最有趣的音乐游戏——你（非常糟糕地）演奏真实的长号穿越古典音乐和梗曲，观众的痛苦反应与节奏本身一样是游戏的一部分',
    platform_en: 'Available on: PC (Steam) ~$15, Nintendo Switch ~$15. PC is the recommended platform for the original experience.',
    platform_zh: '可在以下平台获取：PC（Steam）约 15 美元、Nintendo Switch 约 15 美元。PC 是体验原版的推荐平台。',
    why_en:
      "Trombone Champ (2022, Holy Wow) is a rhythm game that went genuinely viral on TikTok and Twitch because of a core joke so good it sustains an entire game: you play a real trombone with a mouse or analog stick, dragging it up and down to hit pitched notes, and the trombone's physics mean that even 'correct' notes sound slightly wrong and every wrong note sounds gloriously awful. The game features classical music, meme songs, and original compositions, and every song has an audience whose visible suffering or joy reacts in real-time to your performance quality. It has a card-collecting metagame (Tromboner Cards, parody baseball cards of fictional trombone champions) and a campaign where you earn cards to unlock new songs and cosmetics. Beyond the joke, the game has genuine depth: the timing system has actual precision requirements on harder difficulties, and the community-created song charts (thousands of custom songs are available) extend its lifetime indefinitely. The shared experience of watching friends fail at the trombone is the game's highest value. Metacritic 82 on PC.",
    why_zh:
      '长号冠军（2022 年，Holy Wow）是一款在 TikTok 和 Twitch 上真正走红的节奏游戏，因为一个笑话好到足以支撑整款游戏：你用鼠标或模拟摇杆演奏真实的长号，上下拖动以击中音高音符，而长号的物理特性意味着即使"正确"的音符听起来也略微错误，每个错误音符听起来都光荣地糟糕。游戏有集卡元游戏和数千首社区创建的自定义歌曲谱面，无限延伸其寿命。PC 版 Metacritic 82 分。',
    tip_en: "Start with the default songs before downloading custom charts — the base game has enough variety to understand the core joke fully. Use a mouse rather than keyboard for the best control feel. The 'Baboon Song' is the best introduction to how funny the game is at its worst; play it first. The Tromboner Cards unlock new songs but are randomized — farm them by replaying easy songs quickly rather than playing hard songs slowly. The custom song community (TromboneDB) has thousands of charts including every imaginable song; install the mod loader after you finish the base game.",
    tip_zh: '在下载自定义谱面之前先从默认歌曲开始——基础游戏有足够的多样性来完全理解核心笑话。使用鼠标而非键盘以获得最佳控制手感。"狒狒歌"是了解游戏在最糟糕时有多有趣的最佳介绍；先玩它。长号手卡片解锁新歌曲但是随机的——通过快速重玩简单歌曲来积累它们，而不是慢慢玩困难歌曲。自定义歌曲社区（TromboneDB）有数千首谱面，包括所有可以想象的歌曲；完成基础游戏后安装模组加载器。',
  },
  necrodancer: {
    title_en: 'Crypt of the NecroDancer',
    title_zh: '地下墓穴：亡灵舞者',
    emoji: '💀',
    tag_en: 'A rhythm roguelike where every action (move, attack, dodge) must happen on the beat — the most musically demanding game on this list, with one of the best soundtracks in indie gaming',
    tag_zh: '一款每个动作（移动、攻击、躲避）都必须在节拍上发生的节奏 Roguelike——这个列表中音乐要求最高的游戏，拥有独立游戏中最好的配乐之一',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation, iOS/Android — about $15. Frequently on sale for $3-5. AMPLIFIED DLC adds significant content.',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation、iOS/Android——约 15 美元。经常打折至 3-5 美元。AMPLIFIED DLC 添加大量内容。',
    why_en:
      "Crypt of the NecroDancer (2015, Brace Yourself Games) is the progenitor of the rhythm roguelike genre — a top-down dungeon crawler where you must move, attack, and use items strictly on the beat of the music or lose your score multiplier. Every step you take is a beat; every attack is timed to the pulse; every monster has a movement pattern synchronized to the rhythm. The result is a game that creates genuine flow states: when a run is going well, you feel like you are dancing through the dungeon rather than playing it. The soundtrack by Danny Baranowsky is widely considered one of the best in indie gaming — a genre-blending mix of metal, electronic, bluegrass, and jazz that adapts to the dungeon's depth. The roguelike structure means every run is a procedurally generated dungeon with randomized items; death means starting over but keeping permanent upgrades. Extremely high replay value — some players have 500+ hours. Also available cheaply on iOS/Android. The Aria character (must hit every beat or die instantly) is one of the hardest challenges in any game. Metacritic 87 on PC.",
    why_zh:
      '地下墓穴：亡灵舞者（2015 年，Brace Yourself Games）是节奏 Roguelike 类型的鼻祖——一款俯视角地牢爬行游戏，你必须严格按照音乐的节拍移动、攻击和使用物品，否则会失去得分倍增器。由 Danny Baranowsky 创作的配乐被广泛认为是独立游戏中最好的配乐之一。PC 版 Metacritic 87 分，iOS/Android 也可玩。极高的重玩价值——一些玩家拥有 500 多小时。',
    tip_en: "Start with Cadence (the default character) and the standard dungeon — do not attempt Aria (must beat every step) until you have 20+ hours of experience. The most important early lesson: when in doubt, wait for the beat rather than moving off-rhythm. Shop items reset each floor — always check the shop before descending. Danny B's original soundtrack is better than the community remixes for learning the rhythms; switch to remixes later. Play with headphones and turn off any other audio — hearing the beat clearly is the entire game. The game has a free DLC update (AMPLIFIED) that adds a significant new zone; download it after completing the base game.",
    tip_zh: '从卡丹斯（默认角色）和标准地牢开始——在有 20 多小时经验之前不要尝试阿里亚（必须每步都踩到节拍）。最重要的早期课程：有疑问时，等待节拍而不是偏离节奏移动。商店物品每层重置——在下降之前始终检查商店。Danny B 的原版配乐比社区混音更适合学习节奏；之后再切换到混音。用耳机游玩并关掉其他任何音频——清晰地听到节拍就是整个游戏。游戏有一个免费 DLC 更新（AMPLIFIED），添加了重要的新区域；完成基础游戏后下载它。',
  },
  melatonin: {
    title_en: 'Melatonin',
    title_zh: '褪黑素',
    emoji: '🌙',
    tag_en: 'The most cozy rhythm game ever made — you play through dream sequences set in a bakery, a garden, a party, and a starry night, tapping to music so gentle it feels like the game is giving you a hug',
    tag_zh: '有史以来最 Cozy 的节奏游戏——你玩过设定在面包店、花园、派对和星夜中的梦境序列，轻拍如此温和的音乐，感觉游戏在给你一个拥抱',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, iOS/Android — about $15. A demo is available to try before buying.',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、iOS/Android——约 15 美元。购买前可试玩演示。',
    why_en:
      "Melatonin (2022, Half Asleep) is a rhythm game about the relationship between daily life and dreams — you tap to the beat of music during dream sequences that visualize the dreamer's waking life. The Bakery dream shows a baker at work, the Social Media dream shows scrolling through a phone, the Party dream shows a social gathering rendered as warm blobs of pastel color. Every level has a unique musical theme, a unique visual metaphor, and a difficulty curve that eases players in before revealing more complex rhythmic patterns. The game's design philosophy is distinctly cozy: even on the hardest difficulty, the punishment for missing a beat is minor, and the visual feedback for every hit is soft and rewarding rather than punishing. The art direction — pastel watercolors, rounded shapes, warm palettes — makes it one of the most visually beautiful rhythm games ever made. At about $15 with a free demo available, it is the lowest-commitment entry on this list. Very popular on Switch for portable play. Metacritic 77 on PC.",
    why_zh:
      '褪黑素（2022 年，Half Asleep）是一款关于日常生活与梦境关系的节奏游戏——你在将做梦者的清醒生活可视化的梦境序列中轻拍音乐的节拍。每个关卡都有独特的音乐主题和独特的视觉隐喻。游戏的设计理念明显温馨：即使在最高难度，错过节拍的惩罚也很轻微，每次击中的视觉反馈柔和且令人愉悦而非惩罚性。约 15 美元，有免费演示可用。PC 版 Metacritic 77 分。',
    tip_en: "Try the demo first — it is a complete free preview of the first three dream levels and will tell you immediately if this game's rhythm style clicks with you. The game's visual cues are as important as the audio cues — each dream has subtle animations that preview the next beat before it arrives. Normal difficulty is the best starting point; Hard difficulty has additional rhythmic complexity that rewards multiple replays. The final chapter (the waking world levels) has the most complex patterns in the game. If you enjoy Melatonin, the developer's next game and the broader rhythm game adjacent to it is Sayonara Wild Hearts — very different in tone but similarly artistic.",
    tip_zh: '先试玩演示——它是前三个梦境关卡的完整免费预览，会立即告诉你这款游戏的节奏风格是否适合你。游戏的视觉提示与音频提示同样重要——每个梦境都有微妙的动画，在下一个节拍到来之前预告它。普通难度是最佳起点；困难难度有额外的节奏复杂性，奖励多次重玩。最后章节（清醒世界关卡）有游戏中最复杂的模式。如果你喜欢褪黑素，在节奏游戏方向上与其相邻的是再见狂心——基调截然不同但同样具有艺术性。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { sayonara: 0, trombone: 0, necrodancer: 0, melatonin: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function RhythmGamesQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/rhythm-games-quiz`
    const shareText = isZh
      ? `节奏游戏推荐结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My rhythm game recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
          {isZh ? '哪款节奏音乐游戏最适合你？' : 'Which Rhythm Game Is Right for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从再见狂心、长号冠军、地下墓穴：亡灵舞者、褪黑素中找到你的完美节奏游戏'
            : '6 questions to match you with Sayonara Wild Hearts, Trombone Champ, Crypt of the NecroDancer, or Melatonin'}
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
        {isZh ? '找到我的节奏游戏' : 'Find My Rhythm Game'}
      </button>
    </div>
  )
}
