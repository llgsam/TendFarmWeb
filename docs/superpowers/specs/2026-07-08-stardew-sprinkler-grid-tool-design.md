# 设计：Stardew 洒水器 & 稻草人规划器 + 共享网格引擎

日期：2026-07-08
状态：待实现

## 背景与目标

关键词分析结论：Stardew 的"布局/规划/覆盖"网格簇（sprinklers 12,100 + farm layout/planner ~26k + greenhouse 14,800，竞争度≈0）是当前最大的未开采金矿，且 wiki 体验最差（静态图看不了自己的农场）。决定按 **洒水器 → 温室 → 农场规划器** 顺序啃。

**本 spec 只覆盖第一步**：搭建可复用的网格覆盖引擎，并交付**洒水器 & 稻草人规划器** `/tools/stardew-sprinklers`（吃 `stardew valley sprinklers` 12,100 + `stardew valley scarecrow` 1,600）。

**明确不在本 spec 范围**（各自单独 spec/plan）：
- 温室规划器（下一步，复用本 spec 的引擎，跑在温室固定 10×12 区）
- 农场布局规划器（XL，暂缓）

## 架构：共享网格引擎（本步建立，后续复用）

两个可复用单元，边界清晰、各自单一职责：

### 1. 纯逻辑覆盖引擎 `src/lib/tools/gridCoverage.ts`（无 React，可单测）

准确性是这个工具的全部价值，逻辑必须独立可测。

```ts
export type SprinklerType = 'basic' | 'quality' | 'iridium'
export type ObjType = SprinklerType | 'scarecrow' | 'deluxe-scarecrow' | 'crop'
export interface Placed { x: number; y: number; type: ObjType; nozzle?: boolean } // nozzle 仅对洒水器有效
export interface GridDims { w: number; h: number }

// 相对偏移集（不含中心格）；nozzle=true 时各档升一级形状
export function sprinklerOffsets(type: SprinklerType, nozzle: boolean): [number, number][]
export function scarecrowOffsets(deluxe: boolean): [number, number][]

// key = `${x},${y}`
export function wateredTiles(placed: Placed[], dims: GridDims): Set<string>
export function protectedTiles(placed: Placed[], dims: GridDims): Set<string>

export interface CoverageMetrics {
  counts: Record<ObjType, number>
  wateredCount: number
  protectedCount: number
  cropTotal: number
  cropsWatered: number
  cropsUnwatered: number       // 放了作物但没被浇到
  cropsUnprotected: number     // 放了作物但没被稻草人保护
  coveragePct: number          // cropsWatered / cropTotal（无作物时 0）
}
export function computeMetrics(placed: Placed[], dims: GridDims): CoverageMetrics
```

**游戏机制（相对中心格的覆盖形状 —— 实现时必须对官方 wiki 逐一核实，不凭记忆）：**

| 对象 | 覆盖 | 格数 |
|---|---|---|
| 普通洒水器 Basic | 上下左右 4 格 | 4 |
| 优质洒水器 Quality | 3×3 去中心 | 8 |
| 铱金洒水器 Iridium | 5×5 去中心 | 24 |
| Basic + 压力喷嘴 | 3×3 去中心 | 8 |
| Quality + 压力喷嘴 | 5×5 去中心 | 24 |
| Iridium + 压力喷嘴 | 7×7 去中心 | 48 |
| 稻草人 Scarecrow | wiki 记录的固定保护形状，半径约 8 | ~248 |
| 豪华稻草人 Deluxe | wiki 记录的固定保护形状，半径约 16 | wiki 值 |

- 稻草人保护区**不是正方形**，是 wiki 上明确的固定 tile 图案；实现时把该偏移集直接编码进 `scarecrowOffsets`（对着 wiki Scarecrow 页核实格数），别用简单半径近似。
- 洒水器覆盖会被网格边界裁剪（超出网格的格子不计）。
- 多个洒水器覆盖重叠时，浇水集是并集（同一格只计一次）。

### 2. 可复用展示组件 `src/components/tools/TileGrid.tsx`（`'use client'`）

- DOM 网格（CSS grid，每格一个可点/可触元素）。默认 20×20，可调（约束 min 5×5 / max 40×40，40×40=1600 格 DOM 性能可接受）。
- 接收：`dims`、`placed`、`wateredSet`、`protectedSet`、当前画笔、`onCellClick(x,y)`。
- 渲染覆盖叠层：浇水格蓝色调、稻草人保护格绿色调、"作物在未浇水格"告警描边。
- 触摸/鼠标点击放置；不引第三方 canvas/图形库。
- 纯展示 + 回调，不含业务逻辑（逻辑在引擎里），温室工具可直接复用。

## 工具：洒水器 & 稻草人规划器

路由 `src/app/[locale]/tools/stardew-sprinklers/page.tsx` + 客户端组件 `src/components/tools/StardewSprinklerPlanner.tsx`，沿用现有工具范式（6 语言 SEO metadata + `buildLanguageAlternates` + 面包屑 + 相关工具互链 + 注册进 `DATA_TOOLS` + `sitemap.ts` + 更新 `tools-roadmap.json`）。

### 交互

- **调色板**（选当前画笔）：普通/优质/铱金洒水器、压力喷嘴开关（作用于洒水器画笔）、稻草人、豪华稻草人、作物、橡皮擦。
- **网格**：`<TileGrid>`，默认 20×20；有"调整尺寸"控件（宽/高数字输入，钳制到 5–40）。
- 点/触一格 → 放当前画笔对象（橡皮擦=清空该格）；覆盖叠层实时重算。
- **实时指标面板**（来自 `computeMetrics`）：浇水格数、各类洒水器/稻草人数量、作物总数/已浇/漏浇、覆盖率%。（不显示"金币成本"——洒水器为制作物无干净售价，避免误导。）
- **预设最优图案**：一键把当前网格铺成经典可平铺布局（至少 3 个：铱金棋盘、铱金+压力喷嘴、优质高效阵）。每个预设的图案必须对齐社区公认的最优平铺方案并核实。
- **清空**按钮。

### 存档 + 分享（v1 含 URL 分享）

- **localStorage 自动存**：布局变更即存（key 如 `sprinkler-layout-v1`），刷新恢复。
- **URL 分享**：把 `{dims, placed}` 编码进查询参数（紧凑方案，如对精简 JSON 做 base64url；也可自定义更短编码）。点"复制分享链接"生成 `?l=<encoded>`。带 `?l=` 打开时解析并还原布局（解析失败则回退空网格，不报错）。
- 优先级：URL 参数 > localStorage > 空网格。

### 多语言

全部 UI 文案 6 语言（en/zh/zh-TW/ja/ko/de），组件内联 `pick()`/`L()`。对象名对齐官方 wiki 各语言译名（洒水器/压力喷嘴/稻草人）。

## 测试

- **引擎单测**（Vitest，`src/__tests__/tools/gridCoverage.test.ts`）：
  - `sprinklerOffsets` 每档 ±nozzle 返回正确格数（4/8/24/8/24/48）与形状（含具体偏移断言，不只数格数）。
  - `scarecrowOffsets` 返回 wiki 核实的格数（regular ~248 / deluxe wiki 值），且形状对称。
  - `wateredTiles` 正确并集、正确边界裁剪、去重。
  - `computeMetrics`：漏浇/覆盖率/计数在若干构造用例下正确（含空网格、单洒水器、重叠、作物在覆盖内外）。
- **URL 编解码单测**：`encode(decode(x)) === x` 往返、非法输入回退空布局。
- 组件层不强制单测（逻辑已抽到引擎）；交付时本地 dev 实跑：放置/覆盖/预设/调尺寸/URL 分享往返/6 语言路由均正常，`npm run build` 通过。

## 验收标准

- [ ] `/tools/stardew-sprinklers` 6 语言可访问，SEO metadata + language alternates 齐全
- [ ] 覆盖引擎逐档核实 wiki 并单测通过（洒水器 4/8/24/8/24/48、稻草人 wiki 值）
- [ ] 调色板放置 + 实时覆盖叠层 + 指标面板正确
- [ ] ≥3 个预设最优图案，对齐社区公认布局
- [ ] localStorage 自动存 + URL 分享往返可用（含非法输入回退）
- [ ] 默认网格 20×20，可调 5–40
- [ ] `TileGrid` + `gridCoverage.ts` 设计为可复用（下一步温室工具能直接复用）
- [ ] 注册进 `DATA_TOOLS`、加入 `sitemap.ts`、更新 `tools-roadmap.json`（sprinklers 移入 shipped）
- [ ] `npm run build` 通过，无 console.log，不可变更新
```