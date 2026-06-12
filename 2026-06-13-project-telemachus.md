# Telemachus —— 手机版 Odysseus AI agent（chichu 的新项目）

> 源：memory `project_telemachus.md`

chichu 在做一个安卓 AI agent，叫 **Telemachus**（Odysseus 之子）。本质是把他在用的桌面版 Odysseus 搬上手机：chat 为主，用自然语言聊天，AI 自动帮他管日历/待办/提醒/邮件（工作），并记录生活（Zen 日记 + 每日 AI 洞察 + 越用越懂他的记忆）。聊天里提到日程/待办就自动调工具。

## 工程位置
- 代码仓库：`C:\Users\david\telemachus`（monorepo：`/backend` FastAPI + `/app` Flutter）
- 设计文档：`docs/superpowers/specs/2026-06-13-telemachus-design.md`（已到 v1.3）
- 实现计划：`docs/superpowers/plans/2026-06-13-v1-backend-m0.md`（M0 后端，TDD）

## 锁定的关键决策
- 原生安卓 APK 用 **Flutter**；后端 **FastAPI 跑 Railway**，瘦身移植 Odysseus
- 多用户（owner 隔离），v1 先单用户验证
- AI 大脑可切换：DeepSeek（默认）/ OpenAI / 可选订阅；费用 = 运营方提供 key（带额度）+ 用户自带 key
- 数据存自家 SQLite，**不接 Google**（chichu 自己纠正的方向：Odysseus 原版就是本地 SQLite + 可选 CalDAV，没接 Google）
- 记忆系统品牌名 **AI 洞察**（原拟叫"了解你"，chichu 要求改名）；可插拔 MemoryProvider（借鉴 Hermes）
- 借鉴 Hermes：notify 多渠道主动触达、技能渐进披露、自然语言 cron
- 借鉴 chichu 以前做的 calling：输入（待学：书/影/课）/ 输出（灵感：coding/写作/剪辑）捕获库
- 可插拔工作法模块：四象限/看板/甘特图，设置里开关；todo 表预留 importance/start/board_column 做前向兼容

## 分工（重要）
- **后端 + API 合约 + 功能级前端规格** = Claude（Opus）做，能用 HTTP 实测
- **前端视觉/UX/Flutter 实现** = **Fable 模型**做，到 M1 前端阶段才切（chichu 指定用 Fable）

## 路线
- v1 = M0（地基 + 流式聊天）+ M1（agent 工具循环 + 日历/待办/记忆/Zen 日记/每日洞察）
- v1.1：热力图（仿 flomo）/ 自改进技能 / 输入输出库 / 四象限
- Mods：看板 / 甘特图
- M2 notify 提醒 · M3 邮件 · M4 STT/TTS/多平台网关
- 可选集成：Feishu（中文办公，最贴 chichu）/ kanban / Spotify

状态（2026-06-13）：设计锁定 v1.3，M0 实现计划写完，准备开工执行。

—— 记于 2026-06-13，来源 Claude Code session（Telemachus 设计阶段）
