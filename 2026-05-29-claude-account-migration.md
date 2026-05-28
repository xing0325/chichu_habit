# Claude 桌面端换账号后历史 session 迁移

> 源：memory `reference_claude_account_migration.md`
> 完整 SOP：https://github.com/xing0325/claude-account-switch-migration

---

chichu 的 Claude Code 桌面端换账号后，左侧 sidebar 历史 session 会全部消失。**这不是数据丢了**，是 sidebar 元数据按账号分目录存，新账号那边是空的。

未来 AI 别一上来就以为是磁盘损坏 / 软件 bug / 同步失败。先按下面顺序判断。

## 怎么判断是不是这个症状

chichu 找你时大概率会说：
- "我的 session 不见了"
- "sidebar 空了 / 看不到对话历史"
- "换了新账号"或"重新登录后"

确认两件事：
1. `~/.claude/projects/C--Users-david/` 下还有 `.jsonl` 文件（多半还有，几十上百个）
2. `%APPDATA%\Claude\claude-code-sessions\` 下有 **≥2 个** UUID 目录（多个账号的证据）

两条都满足 = 本症状。可以放心按 SOP 走。

## 数据分层

桌面端把 session 信息分两层存：

- **Sidebar metadata**: `%APPDATA%\Claude\claude-code-sessions\<account-id>\<workspace-id>\local_*.json` —— 账号-scoped，换账号就看不见
- **`.jsonl` 对话原文**: `~/.claude/projects/<encoded-cwd>/<session-id>.jsonl` —— 账号无关，不会因换账号丢

两边靠 `local_*.json` 里的 `cliSessionId` 字段桥接（值 = `.jsonl` 的文件名不含扩展）。

## 解决思路（极简版）

把旧账号目录下的 `local_*.json` 拷到新账号目录下，重启桌面端，sidebar 就会重新列出来。`.jsonl` 不动。

详细步骤、回滚命令、跨平台路径、字段说明都在 GitHub 仓库的 README，去那边复制粘贴最快。

## 注意

- **chichu 可能不止换过一次账号**：`claude-code-sessions/` 下可能有 3+ UUID 目录。按 mtime 倒序，最新的是当前，其他都是旧的，可以全部往新账号合并。
- **不要覆盖新账号已有的 `local_*.json`**：那是当日 / 当前 session 的 metadata，覆盖了反而出问题。SOP 脚本里有 `if (Test-Path $target)` 防呆。
- **必须彻底关 desktop 才生效**：仅关主窗口不够，托盘后台进程会保持内存缓存。`Ctrl+Shift+Esc` 任务管理器结束所有 `Claude.exe`。
- **跨电脑迁移**：metadata 和 `.jsonl` 都要搬，缺一个就会 "session not found"。

## 历史

- 2026-05-29 首次实战：chichu 切到新账号 `de570f9d-...`，旧账号 `edcf51dc-...` 下 56 个 session 在新 sidebar 消失。把旧 workspace 下 56 个 `local_*.json` 拷贝到新 workspace，重启后 sidebar 恢复 58 条（56 旧 + 2 当日新建）。`.jsonl` 全程未动。
- 来源 session: `ee4fe054-4ef5-4d96-a194-a3e4cf62fd3d`
