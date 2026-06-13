# Telemachus —— 手机版 Odysseus AI agent（chichu 的项目，进行中）

> 源：memory `project_telemachus.md`（2026-06-14 更新）

chichu 的安卓 AI agent，chat 为主：自然语言聊天，AI 调工具管日历/待办/提醒/邮件 + 记录生活（Zen日记/每日洞察/越用越懂你的记忆）。把桌面版 Odysseus 搬上手机。

## 工程
- 仓库 `C:\Users\david\telemachus`（monorepo `/backend` FastAPI + `/app` Flutter），分支 `feat/v1-flutter-app`（未合并 main、未推 GitHub）。
- 设计/计划/晨间简报在 `docs/`。

## 已实现（2026-06-14）
- 后端：全端点 + agent 工具循环 + 多用户隔离 + LLM 可切换(DeepSeek/OpenAI) + BYO key 加密；**122 测试全绿**。
- App：聊天/日历(月双周周+热力图)/待办(列表+四象限+看板+甘特图)/AI洞察记忆/Zen日记+每日洞察/输入输出捕获/设置(模块开关)。
- **「潮汐」视觉重做**：深海生物荧光 + 得意黑字体 + 会呼吸的 agent 之球 + 发光交互。Web 逐页核验无 bug。
- 填 DeepSeek API key → 即可聊天用（链路验证通过）。

## 关键坑/设施
- Flutter Web 自验回路：静态构建 + python 伺服 9102 + preview 截图；**别用 `flutter run -d web-server`**（DWDS 在无头浏览器崩）。
- Railway 部署被免费额度卡（项目太多），Procfile 已备，等腾槽位一键部署。
- 本地用：后端 0.0.0.0:8000，手机 USB(127.0.0.1) 或 WiFi(电脑LANIP)。

## 待办
装潮汐 APK 到手机 · 提醒弹通知(M2) · 邮件(M3) · 语音/多平台(M4) · Railway 部署 · 图片视觉(轻量,别额外劳神)。

—— 2026-06-14 更新，来源 Claude Code session（通宵推进）
