---
name: EPUB ADHD Remixer 项目
description: 本地单用户 Python 工具，把 EPUB 用 Claude 加钩子章节+回忆卡+减速带后 send-to-kindle，对抗 ADHD 看不进书
type: project
---

**目录**：`C:\Users\david\epub-adhd-remixer\`（本地 git，未推 GitHub，等用户授权）

**已就绪文档**：
- spec：`docs/superpowers/specs/2026-05-19-epub-adhd-remixer-design.md`
- plan：`docs/superpowers/plans/2026-05-19-epub-adhd-remixer-plan.md`（13 任务，TDD，含全部代码）
- 脚手架：pyproject、.gitignore、.env.example、`src/remixer/`、`tests/`

**核心架构**：FastAPI + ebooklib + anthropic SDK + SQLite。一次性把全书塞 Claude（prompt cache），返回 RemixPlan JSON（hook_chapter / chapter_interventions / speed_bumps），EPUB Writer 注入静态 HTML 页。

**Why（用户原始痛点）**：开头难 + 走神。E-ink 不能干花活但 *EPUB 本身可以变聪明*——所有"助手能力"编译成插页。

**Why（拆出 sync 站后这里只做本地）**：双端高亮聚合需要多用户公网服务，分到了 `kindle-highlight-sync` 项目；本项目保持单用户、本地、零账号系统。

**关键风险（v1 最可能翻车点）**：Amazon EPUB→KFX 转换可能破坏注入页排版。Plan 任务 13 step 4 是真机验证关卡，不通过就回 writer.py 降低 HTML 复杂度。

**How to apply**：
- 用户回到这个项目时，spec 是问题陈述，plan 是工作清单。
- 想动 spec 看 §4.2（三类插页）/§11（风险）/§4.6（UI）。
- 实施走 `superpowers:subagent-driven-development` 或 `executing-plans`。
- KFX 兼容验证不能跳过——这是 MVP 的真实 GO/NO-GO。
- 工程估时 ~4.5 天。
