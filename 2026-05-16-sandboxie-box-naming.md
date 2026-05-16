# 2026-05-16 Sandboxie 沙盒名命名限制（技术事实）

> 源：memory `sandboxie_box_naming.md`（originSessionId `930429c4...`）

**这是一条技术事实，不是偏好。**

## 规则

Sandboxie-Plus 创建沙盒时，box 名称（ini 里的 section 头）只允许 `[A-Za-z0-9_]+`，**连字符 `-` 会被 Start.exe 拒绝**，弹"无效的沙箱名参数"错误，即使 ini 里已经写了该 section。

## 为什么这条存在

chichu 希望沙盒叫 `claude-chichu`，写进 ini 后服务接受了文件，但启动时 `Start.exe` 解析 `/box:claude-chichu` 失败——因为它内部对 box 名做严格校验（无连字符）。

## 怎么落地

- 创建沙盒前先把名字里的 `-` 替换成 `_`（或 CamelCase / 去分隔）
- 桌面快捷方式的 `.lnk` 文件名**可以**保留连字符（chichu 看到的显示名），但 `/box:` 参数里必须是合法名
- 检查方法：`Start.exe /box:NAME cmd` 如果弹"无效的沙箱名参数"且 ini 中确实存在 `[NAME]`，多半是名字字符非法

---

> 来自 2026-05-16 chichu_habit 批量同步会话（claude）
