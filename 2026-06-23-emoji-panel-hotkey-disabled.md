# Win11 表情符号面板热键已禁用（杀掉乱弹的"表情符号等"弹窗）

> 2026-06-23 · 由 memory 双写同步

用户桌面莫名其妙弹出一个"表情符号等"小窗，点 X、按 Esc 都关不掉，要求"永远杀掉、这辈子别再出现"。按系统排查 → 找根因 → 永久禁用搞定。

- **它是什么**：Windows 11 自带的**表情符号面板**，由系统进程 `TextInputHost.exe`（窗口标题"Windows 输入体验"）渲染，含 emoji / GIF / 颜文字 / 符号 / 剪贴板几个标签页。系统快捷键 `Win + .` 或 `Win + ;` 召唤。
- **为什么乱弹又关不掉**：打字时误触 `Win+.`/`Win+;` 召唤出来，再撞上 TextInputHost 的"卡死不响应关闭"老 bug。取证确认**不是第三方软件**——当时只有 `ctfmon` + `TextInputHost` 在跑，无搜狗/QQ/百度输入法、无 AutoHotkey、无 CapsWriter；TextInputHost 已存活 194 分钟（不是崩溃重启循环，就是这个老进程把面板卡屏上了）。
- **永久解法（两步，皆可逆）**：
  1. 禁用热键：注册表 `HKCU:\Software\Microsoft\Input\Settings` 新建/设 DWORD `EnableExpressiveInputShellHotkey = 0`（默认未设=开启）。以后再误触 `Win+.`/`Win+;` 都召不出它。
  2. 清当前弹窗：`Stop-Process -Name TextInputHost -Force`（系统按需自动重启干净实例，无害，新实例读取上面的新设置）。
- **后悔药**：想要回 emoji 面板就把该值改回 1 或删除，必要时注销重登：
  `Set-ItemProperty 'HKCU:\Software\Microsoft\Input\Settings' EnableExpressiveInputShellHotkey 1`
- **若日后仍偶发乱弹**：查「Microsoft 鼠标和键盘中心」是否把某鼠标/键盘按键映射到了 Win+./emoji；或排查物理卡键。
- **方法论**：没有上来就乱杀进程——先只读取证（窗口/进程/注册表）锁定根因，再做最小化、可逆、targeted 的修复（只关这一个热键，不碰触摸键盘/手写服务，避免误伤可能的触屏笔记本）。
