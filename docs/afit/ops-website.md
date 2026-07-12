# afit-ops-website config — farmgamehub.com

- **GSC resource_id**: sc-domain:farmgamehub.com   (URL-encoded: sc-domain%3Afarmgamehub.com)
- **GSC performance URL**: https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Afarmgamehub.com
- **Sitemap**: https://www.farmgamehub.com/sitemap.xml
- **Vercel**: team `jsamgogos-projects` / project `tend-farm-web`(repo llgsam/TendFarmWeb,push main 自动部署)
  - Web Analytics:未启用(2026-07-12);Speed Insights:后台开、代码未埋
- **Locales**: zh(默认/无前缀重定向到 /zh)、en、zh-TW(opencc 自 zh 转)、ja、ko、de;内容量 EN/ZH 57 篇,ja/ko/de 各 11 篇
- **Market priority**(GSC 数据):US ≫ 其他英语区(CA)> DE(romance 意外信号)> JP/KR/TW
- **Keyword library**: `docs/seo/keyword-candidates-2026-06.csv`、`docs/seo/article-queue.json`(文章队列)、`docs/seo/tools-roadmap.json`(工具队列,自带 KE vol)
- **自主程度**: 改动默认待批(propose-only);报告/日志文件可直接写
- **已知坑**: `buildLanguageAlternates()`(src/lib/config.ts)曾对全 locale 无条件广播 hreflang → 幻影 404 URL(2026-07-12 发现并修复:guide 页现在传入 `getGuideLocales()` 过滤;新增内容类型时注意同样处理)
- **GSC 请求收录操作方法**(browser-harness):inspect 深链会 404,要用顶部检查框——`focus()` 输入框 → `type_text(url)` → `press_key("Enter")` → 等"网址已/未收录" → 点"请求编入索引"文本节点向上找 button 祖先;页面过渡时 `document.body` 会短暂为 null,js 调用要 try/except

## Target clusters (what to track)
| Cluster | Pages/slugs | Target keywords | Notes |
|---|---|---|---|
| co-op/multiplayer | /en/guides/best-games/farming-games-with-best-multiplayer | co op farming games (720), coop farming games (720), best coop farming games (90) | 7/12 已做 page-1 push 增强,基线 pos 18.9/12.3 |
| romance | /en + /de …/farming-games-romance-relationships | farming games with romance (110) | EN pos 14;DE 幻影页曾排 11.8/169impr(404) |
| vs 对比文 | animal-crossing-vs-stardew-valley 等 | animal crossing vs stardew valley (880) | pos 9.3,已第 1 页 |
| Stardew 工具簇 | /en/tools/stardew-*(10 个) | stardew valley fish (22.2k) / gifts (12.1k) / sprinklers (12.1k) / bundles (8.1k) / calendar (8.1k) / museum (8.1k) | 7/8–7/11 上线,等收录 |

## Tracking log (append each run, newest first)

### 2026-07-12 — 90d(≈建站以来,6/26 上线)
- Totals: impr ~1.6k / clicks ~40 / 收录 82 / 已知 875(695 已发现未抓取)
- 市场:US 15 clicks/855 impr 绝对主力;DE romance 幻影页 3 clicks
- Movers: multiplayer 文 7c/340i/pos12.3(当天已增强);`co op farming games` pos 18.9 基线
- New pages status: 10 个工具页 sitemap ✅,收录仅个别(bundles ✅);GSC sitemap 上次读取 6/30(旧)
- Actions taken(A–E 全部批准并当日执行完毕,commits 7c91baa/4f3d3ad/d911d1e/175eabe,部署 Ready):
  - A ✅ hreflang 修复,线上验证:EN romance 页只输出 zh-Hans/zh-Hant/en/de
  - B ✅ sitemap 重提(提交日期 2026-07-12);6 个工具页全部请求收录。意外发现 fish/gifts/museum/villagers 其实已收录(比 site: 查询显示的多)
  - C ✅ @vercel/analytics + @vercel/speed-insights 上线,`window.va`/`window.si` 已挂载;dashboard Web Analytics 已 Enable
  - D ✅ DE romance 文章上线(200,德语标题验证),幻影 404 → 真内容
  - E ✅ EN romance +婚姻 FAQ +修复文末 404 内链(romance→relationships)+villagers 工具内链;multiplayer 文 2 处内链指向 romance
- 验收预期:DE romance 承接原幻影排名(基线 11.8/169impr);EN romance 冲第 1 页(基线 14.0);工具页收录加速;7/13 起 Vercel Analytics 有真实数据
- 下次复查:2026-07-19,核对 P4 清单(见报告)
