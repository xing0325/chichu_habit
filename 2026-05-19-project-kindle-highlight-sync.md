---
name: Kindle Highlight Sync 项目
description: 多用户 Python web 站，bookmarklet 鉴权抓 read.amazon.com/notebook 高亮回流入库，David+朋友用
type: project
---

**目录**：`C:\Users\david\kindle-highlight-sync\`（本地 git，未推 GitHub，等用户授权）

**已就绪文档**：
- spec：`docs/superpowers/specs/2026-05-19-kindle-highlight-sync-design.md`
- plan：`docs/superpowers/plans/2026-05-19-kindle-highlight-sync-plan.md`（17 任务，TDD，含全部代码）
- 脚手架：pyproject、.gitignore、.env.example、`src/khs/`、`tests/`、`static/`

**核心架构**：FastAPI + Postgres（dev SQLite）+ HTMX + magic-link 邮箱登录。**鉴权关键**：用户在自己浏览器登录 Amazon → 点收藏栏 bookmarklet → 脚本在用户上下文跑、抓 DOM、带 per-user bookmarklet token POST 回我们 API。**我们服务器从未接触 Amazon 凭据**。

**Why（为啥不能存账号密码）**：Amazon 2FA + captcha + 风控会掐自动登录，账号密码方案技术上跑不通；存别人 Amazon 密码法律责任不可承担（PIPL）。

**Why（拆出来不和 Remixer 合一）**：Remixer 是 David 个人本地工具；sync 是多用户公网服务。耦合会让 Remixer 也背多租户/Auth/部署的复杂度。

**部署**：Railway（David 有 mofazhusha 经验）+ Postgres plugin。Resend 发 magic link。

**邀请制**：`INVITE_CODES_REQUIRED=true`，不公开开放，降低被 Amazon 注意概率。

**How to apply**：
- 用户问"sync 站怎么样了" / "朋友怎么用 bookmarklet" → 拉这个 memory + 看 spec §3。
- 真用户登录后从 `/sync-tool` 拖书签，去 `read.amazon.com/notebook` 点一下。
- 工程估时 ~6.5 天。MVP 不做浏览器插件、不做服务器端定时抓、不抓 sideload 路径（不需要：sideload 经 send-to-kindle 也会进 Personal Documents notebook）。
