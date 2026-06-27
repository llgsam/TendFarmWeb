---
name: tend-build-farming-articles
description: 每次写 2 篇农场游戏横向评测文章（EN + ZH 各一篇），commit 后报告结果。每周手动触发一次。
---

# farming-articles skill

每次运行写 2 篇全新的农场游戏横向评测文章，保持 EN/ZH 数量对齐，自动 git commit。

## 内容目录

- EN 文章：`src/content/en/guides/best-games/`
- ZH 文章：`src/content/zh/guides/best-games/`

## 执行步骤

### Step 1：审查现有文章，确定 EN/ZH 差距

```bash
ls src/content/en/guides/best-games/ | sort
ls src/content/zh/guides/best-games/ | sort
```

- 统计两边各有多少篇
- 找出已有 EN 但缺少 ZH 对应文章的 slug（需要补 ZH）
- 找出已有 ZH 但缺少 EN 对应文章的 slug（需要补 EN）

### Step 2：选定本轮主题

优先级：
1. **如果 ZH 比 EN 少**：写一篇 ZH 补全现有 EN 文章的对应版本，再写一篇新 EN
2. **如果 EN 比 ZH 少**：写一篇 EN 补全现有 ZH 文章的对应版本，再写一篇新 ZH
3. **如果数量相等**：写一篇全新 EN + 一篇全新 ZH（同一主题的双语版）

**选题规则**：
- 必须是两种语言都还没有的全新主题，或者补全已有文章的对应语言版本
- 主题应为横向评测角度（分析多款游戏，推荐给不同玩家）
- 参考已覆盖维度，选择尚未写过的角度

**已覆盖维度参考**（不要重复）：
料理/食物、成就/全收集、音乐原声、经济收益、恋爱/关系、建造装饰、钓鱼系统、季节系统、故事叙事、技能升级、动物饲养、社区节日、探索世界、制作系统、难度无障碍、角色自定义、图像风格、多人联机、矿洞/挖矿、模组支持、时间管理、性价比、NPC关系、压力治愈、成人/老年玩家、儿童玩家、情侣、社恐玩家……

**可选新主题示例**：
- 农场布局与规划（grid systems, farm design optimization）
- 角色自定义（character/avatar appearance）
- 天气系统（weather effects on farming）
- 端游 vs 手游体验（PC vs mobile experience）
- 更新频率与开发支持（update cadence, live service）
- 宠物与伴侣系统（companion/pet systems beyond livestock）
- 地图大小与探索边界（map size, world boundaries）
- 游戏时长与通关后内容（game length, post-endgame content）

### Step 3：写文章

每篇文章的格式要求：

```markdown
---
title: "..."
description: "..."
game: "best-games"
slug: "farming-games-[topic]"
publishedAt: "YYYY-MM-DD"  # 使用当天日期
tags: [...]
faqs:
  - q: "..."
    a: "..."
  - q: "..."
    a: "..."
  - q: "..."
    a: "..."
  - q: "..."
    a: "..."
---

## [引入段：这个维度对游戏体验的意义]

---

## S级 / S Tier

### [游戏名] — [副标题]
[详细分析，包含具体数据、功能列表、对比]

**评级**：S

---

## A级 / A Tier
...

## B级 / B Tier
...

---

## 综合对比表 / Comparison Table

| 游戏/Game | 维度1 | 维度2 | 维度3 | 评级 |
|---|---|---|---|---|
| 星露谷物语/Stardew Valley | ... | ... | ... | S |
...

---

## 哪种...适合你 / Which ... Is Right for You

**想要...的玩家**：[推荐游戏] — [原因]
...

---

> **内链引导**：[相关文章链接]
```

**写作要求**：
- EN 文章：英文，面向国际玩家，SEO 友好标题
- ZH 文章：中文，与 EN 涵盖相同游戏和维度，翻译要自然（不是机械翻译）
- 每篇 800-1500 字正文（不含 frontmatter）
- 必须覆盖：星露谷物语、动物森友会、珊瑚岛、波蒂亚时光、帕里亚、太阳港湾、海岛农场（视维度取舍）
- 评级系统：S / A+ / A / A- / B+ / B / B- / C（根据该维度表现打分）
- 每篇文章的视角/框架必须完全原创，不能与其他文章雷同

### Step 4：写入文件

- EN 文件：`src/content/en/guides/best-games/farming-games-[slug].md`
- ZH 文件：`src/content/zh/guides/best-games/farming-games-[slug].md`

写入前用 `ls` 确认文件名不存在，避免覆盖。

### Step 5：Git Commit

```bash
git add src/content/en/guides/best-games/farming-games-[slug1].md \
        src/content/zh/guides/best-games/farming-games-[slug2].md

git commit -m "feat: 新增[主题1]横评(ZH/EN) + [主题2]横评(EN/ZH)

- [语言]: farming-games-[slug1] — [一句话摘要]
- [语言]: farming-games-[slug2] — [一句话摘要]"
```

### Step 6：报告结果

告知用户：
- 写了哪两篇文章（slug + 主题）
- 当前 EN 总数 / ZH 总数
- 下次运行时建议的主题方向

## 注意事项

- **不要**使用 `/loop` 或 ScheduleWakeup——这是手动触发的 skill，不自动循环
- **不要**写已存在的 slug，先检查再写
- **每次**只写 2 篇（1 EN + 1 ZH），保持质量
- 日期始终用运行当天的真实日期
- 遇到写作主题枯竭时，可以写「两款游戏直接对比」格式（如 `sun-haven-vs-palia.md`）
