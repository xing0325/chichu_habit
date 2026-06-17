# CAI harness · 官方 cai CLI（推翻自制 GUI）

> 2026-06-18 · 由 memory 双写同步

为 Cybersecurity AI（CAI, aliasrobotics/cai）落地一个能直接上手用的 harness。**结论：CAI 的权威 harness 就是它自带的官方命令行，不要再做 GUI。** 之前一个 session 给 CAI 搓的桌面 GUI（`cai-gui` + 更早的 `cai-agent-gui`）是垃圾，本次全部删除并禁止重建。

- **真 CAI**：`cai-framework` 0.5.10（PyPI 最新），装在 WSL Ubuntu `~/cai-workspace/.venv`（Python 3.12.13），接 DeepSeek `deepseek/deepseek-chat`，key 在 `~/cai-workspace/.env`。WSL 里 nmap/curl/git 齐全。`cai-check` 实测连通返回 `DeepSeek connection OK`。
- **一键启动链**：桌面 `CAI.lnk` → `wt.exe -p CAI` → Windows Terminal fragment（`%LOCALAPPDATA%\Microsoft\Windows Terminal\Fragments\CAI\cai.json`，含 profile "CAI" + 配色 "CAI Matrix"，**非侵入、不动 settings.json**）→ `wsl -d Ubuntu -- bash -lic cai-deepseek` → `~/.local/bin/cai-deepseek`（激活 venv、source .env、`exec cai`）。也可终端直接 `cai-deepseek`。
- **关键 env**：`CAI_LICENSE_OFF=1`（开源模式，CLI 全功能免费；只有自家 alias1/alias0 模型才要付费）、`CAI_MODEL=deepseek/deepseek-chat`、`OPENAI_API_KEY` 必须非空（占位即可）。
- **为什么不做 GUI（教训）**：CAI 没有免费官方 GUI（TUI 已弃用，iOS app+alias1 属 CAI PRO ~€350/mo）；它的 REST API 是私有 schema（`X-CAI-API-Key`），不是 OpenAI 兼容端点——套 Open WebUI/LibreChat 只会绕过 agent 变成纯 DeepSeek 聊天框，套自家壳要写每次升级就崩的易碎适配器（**这正是上次产生一堆垃圾的根因**）。官方 REPL 已自带模型/agent 切换、`/cost`、history、Ctrl+C 人在环、流式。要更好体验 = 终端配色 + 一键启动，不写代码。
- **方法论**：先并行侦察（官方工具链 / 本地 WSL 现状 / 垃圾清单 / UX 选型）再动手；删除走回收站（可恢复）不硬删；最后用独立 agent 对抗式复核"垃圾清干净 + harness 能跑"。
- ⚠️ DeepSeek 别名 `deepseek-chat`/`deepseek-reasoner` 预计 **2026-07-24** 弃用 → 届时 `CAI_MODEL` 改 `deepseek/deepseek-v4-flash`。
- 使用说明：`C:\Users\david\CAI-快速上手.md`。
