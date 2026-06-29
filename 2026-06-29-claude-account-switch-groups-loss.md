# 换 Claude 账号时，侧栏「分组/收藏」会丢，而且 migrate.ps1 管不到

> 源：memory `reference_claude_account_migration.md`（2026-06-29 更新）
> 给未来任何 AI session 看：chichu 在 Windows 上用 Claude 桌面端，换号是常态。

## 核心事实

换号后 chichu 会用 `claude-account-switch-migration` 仓库迁回历史 session。但那套（`migrate.ps1`）**只迁 session 元数据**（`%APPDATA%\Claude\claude-code-sessions\<account>\<workspace>\local_*.json`）。

**侧栏的自定义分组（customGroups）和收藏（starred）不在 session 文件里**，它们存在 Chromium 的 **Local Storage (leveldb)** 里的几个 localStorage key：
- `dframe-store` → `customGroups`（分组定义）+ `customGroupAssignments`（哪个 session 属于哪个分组）
- `LSS-persisted.starred-local-code-sessions` → 收藏的 session
- `LSS-persisted.starred-session-groups` / `starred-cowork-spaces` → 收藏分组/空间

这些 key 有三个要命特性：**不按账号分库、全机共享、后写覆盖**。

## 为什么分组「登录时还在、一会儿就消失」

事故链（2026-06-29 实测复现）：

1. 新号首次登录 → 共享的 `dframe-store` 还带着旧分组 → **所以登录瞬间还看得到**
2. 但此刻旧 session 还没迁过来 → 桌面侧栏 store 启动对账，发现分组指向的 session 全不存在
3. → 把这些分组判为「无效数据」**清空并回写** → 旧分组被覆盖
4. → 很快被 leveldb compaction 物理清除，**磁盘上不留任何副本**

收藏是扁平 ID 列表、不做这种对账，所以往往能活下来；分组死。

## 正确做法（顺序是关键）

```
旧号上 groups.ps1 -Export        # 1. 换号【前】先把分组/收藏导出备份
   ↓ 换账号
migrate.ps1 -All -Apply          # 2. 先迁 session（让 sessionId 先存在）
   ↓ 彻底退出所有 Claude.exe
groups.ps1 -Import               # 3. 再把分组/收藏写回（此时 session 已在，对账不会再清空）
   ↓ 重开 Claude
```

**如果已经换号、分组已经丢、且事先没 Export 过 → 救不回了**（旧值已被 compaction 清除）。这时要**如实告诉 chichu 救不回，别假装能恢复**；但 session 和收藏通常还在，让他手动重建分组（拖拽即可），并提醒下次换号先 Export。

## 工具（已进仓库 v1.1）

仓库 `xing0325/claude-account-switch-migration`，PR #2：
- `migrate-groups.mjs` — Node + `classic-level` 读写 Chromium leveldb 的引擎
- `groups.ps1` — PowerShell 包装器（`-Export` 读副本快照、`-Import` 检测 Claude 全退出后写回，首次自动 npm install）

技术点：Chromium Local Storage 的 data-row key 编码 = `_<origin>\x00<charset字节><scriptKey>`，charset 和 value 都用 `0x01`=latin1 / `0x00`=utf16le。写回时**只覆盖已存在 key 的 value、复用其原始 key 字节**，不新建 key、不猜编码，写前整目录备份。已做 export→import 往返验证（leveldb 52 行无损、值正确写入）。

## 给 AI 的行动提示

- chichu 说「换号 / 迁 session」→ 先跑 session 迁移；**主动提醒他分组/收藏要单独 Export，且必须换号前做**。
- chichu 说「分组没了 / 分组一会儿就消失」→ 这就是上面的机制。先确认是不是已经丢（查 `dframe-store.customGroups` 是否空）；已丢且无备份就诚实说救不回。
- `-Import` 要求 Claude 完全退出，而 AI agent 就跑在 Claude 里 → 这步连同重启**交给人类**，把命令给他自己跑。
