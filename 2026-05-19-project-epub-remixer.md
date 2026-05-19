# EPUB ADHD Remixer 项目 — 状态档案

> 源：memory `project_epub_remixer.md`
> 日期：2026-05-19
> 起因：用户说"我最近看不进去书，想办法帮我 coding 一个帮我看书的助手"

## chichu，xing0325 接下来回到 epub-adhd-remixer 项目时，记住

### 项目身份
- **本地路径**：`C:\Users\david\epub-adhd-remixer\`
- **状态**：spec + plan 写完，本地 git 已提交，**未推 GitHub**（等用户授权）
- **GitHub repo**：还没建
- **预计工程量**：~4.5 天
- **用途**：用户单人本地工具，**不是**多人 web 服务

### 真实痛点（不要变质）
用户原话两个卡点：
1. **开头难** — 翻两页就放下
2. **走神/刷手机** — 看着看着丢线

不是"做笔记"、"出题"、"统计阅读进度"等其他读书 app 的功能。要 laser-focus 这两条。

### 核心架构（已锁定）
EPUB 上传 → Claude 一次性塞全书生成 RemixPlan JSON → EPUB Writer 把以下三类静态 HTML 注入：
1. **开头钩子章节**（4-8 段，第一个 spine 项）
2. **章末回忆卡**（每章后插一页，单 `<p>` 问句）
3. **段间减速带**（每 ~2000 字一个斜体 `<em>` interjection）

然后 SMTP 直接 send-to-kindle 到用户的 @kindle.com。

**为什么不做实时交互**：用户读 Kindle，Kindle 是 E-ink 不能弹窗。所以把"助手能力"全部编译成静态 EPUB 插页，让 Kindle 不变聪明、书变聪明。

### 真实最大风险
**Amazon 会把 sideload EPUB 转成 KFX**。这个转换可能破坏插入页的排版/样式。

→ Plan 的 Task 13 step 4 是真机验证关卡，**必须**真把 EPUB 发到 Kindle 设备上打开，逐项确认：
- 钩子章节作为独立 chapter 出现
- 回忆卡作为独立页
- 减速带还是 italic interjection 不是乱码

不通过就回 `writer.py` 简化 HTML（去 `<em>`、合并 `<p>`、删 `<h2>` 等），再发一遍。这不是 nice-to-have，是 GO/NO-GO。

### 文档位置
- spec：`docs/superpowers/specs/2026-05-19-epub-adhd-remixer-design.md`
- plan：`docs/superpowers/plans/2026-05-19-epub-adhd-remixer-plan.md`（13 任务，TDD，含全部代码）
- 脚手架：pyproject、.gitignore、.env.example、`src/remixer/`、`tests/`

### 实施流程
- 走 `superpowers:subagent-driven-development`（推荐）或 `executing-plans`
- plan 已经把全部代码、测试、命令、commit 消息都列好了，**不要再让用户重定**
- 每个 task 末尾的 commit 跑完再启动下一个

### 不要再问的问题
- 形态？— 已确认本地 Python + FastAPI 网页
- 设备？— Kindle（EPUB sideload）
- 鉴权？— 单用户无 auth
- 同步双端高亮？— **拆出去了**，去 `kindle-highlight-sync` 项目，本项目 v1 不做
