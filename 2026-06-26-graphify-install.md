# Graphify —— chichu 装的代码知识图谱工具（YC S26）

> 源：memory `reference_graphify.md`（2026-06-26 这次会话写的）

chichu 2026-06-26 说"有个项目叫 graphity 好像很不错，装来试试"。名字是记串的——真正要的是 **Graphify**（`safishamsi/graphify`，Y Combinator Summer 2026 批次，README 顶上挂着 YC S26 徽章）。未来 AI 注意别跟这几个搞混：

- `graphiti`（Zep AI 的时序知识图谱，也进过 YC，但是更早批次、不是 S26）
- 拼写完全对上的 `graphity`：denostack 的 TS GraphQL 框架 / WiredUK 的 .NET GraphQL 库 / kobayami 的 Java 图分析库——都小众，都不是 chichu 要的那个。

判定 chichu 口中的"YC S26 那个"= Graphify，靠的是：S26 背书 + 当时很火（60K+ stars）+ 它本身就是给 Claude Code 这类 AI 助手用的 skill。

## 它是干嘛的

把任意一个文件夹（代码 / SQL schema / 文档 / PDF / 图片 / 视频）变成**可查询的知识图谱**，产出交互式 HTML 图 + graph.json + Markdown 报告。既是 CLI，也能作为 skill 接进 Claude Code / Cursor / Codex 等 20 个 AI 助手。

## 怎么装的（chichu 的 Win11 机器）

- `uv tool install graphifyy` —— **坑：PyPI 包名是 graphifyy（双 y）**，因为 graphify 被占名了；但命令行还是 `graphify`，装在 `C:\Users\david\.local\bin`（已在 PATH，新开终端也能直接用）。
- 升级 `uv tool upgrade graphifyy`，卸载 `uv tool uninstall graphifyy`。这次装的是 0.8.49。
- chichu 这机器只有 Intel 核显、没 CUDA、没独显——**完全不影响**：基础 AST 建图不需要 GPU、不需要数据库、不需要任何 LLM / API key。

## 怎么用

- `graphify update <项目路径>`：纯 AST 重建图（无 LLM），秒级出 `<项目>/graphify-out/` 里的 graph.html / graph.json / GRAPH_REPORT.md。
- `graphify query "问题"`、`graphify explain "节点名"`、`graphify export callflow-html`、`graphify watch <路径>`（改代码自动重建）。
- 想要更聪明（语义推断边 + 社区自动命名）才需要后端：设 `GEMINI_API_KEY` 之类，或用 `claude` 后端，跑 `graphify extract <路径>`。

## 已经做的接入

- 在 `C:\Users\david\chess-shogi` 上真跑过一遍验证：361 节点 / 673 边 / 20 社区，纯结构就认得出核心抽象（idx() / GameState / Side / legalActions()）。
- 在 chess-shogi 做了**项目级** Claude Code 接入：`graphify claude install --project`，只写了项目内的 `.claude/skills/graphify/` + `CLAUDE.md` + 项目级 `.claude/settings.json`（PreToolUse hook）。**核对过全局 `~/.claude/settings.json` 没被动**（前后哈希一致）。在 chess-shogi 里开 Claude Code 敲 `/graphify .` 即可用。
- 没做全局接入：全局会加一个全局 PreToolUse hook（每次文件搜索前触发），chichu 的 hook / superpowers 本来就多，怕冲突或额外开销。想撤就在项目里 `graphify claude uninstall`。

—— 2026-06-26 这次会话由 Claude Code 记录。
