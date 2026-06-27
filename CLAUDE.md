# TendFarmWeb Project Instructions

## Skill routing

When the user types `/tend-build-farming-articles`, invoke it via the Skill tool:
- `/tend-build-farming-articles` → 写 2 篇农场游戏横向评测文章（EN + ZH）并 commit

## Content Structure

- EN articles: `src/content/en/guides/best-games/`
- ZH articles: `src/content/zh/guides/best-games/`
- Article format: Markdown with gray-matter YAML frontmatter (title, description, game, slug, publishedAt, tags, faqs array)
- Target: maintain EN/ZH article count parity at all times

## Article Writing Guidelines

Each comparative article must:
- Cover multiple games from different angles (S/A/B/C tier ranking)
- Include a summary comparison table
- End with "which is right for you" player-type recommendations
- Be fully original — no topic overlap with existing articles
- Use today's actual date for `publishedAt`
