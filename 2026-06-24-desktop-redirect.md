# 真实桌面被重定向到 `oNedrive里的文件\桌面`

> 源：memory `reference_desktop_redirect.md`（2026-06-24）

2026-06-24 给 chichu 整理"所有桌面软件的图标"时踩到的坑：在默认的 `C:\Users\david\Desktop` 里翻，**啥都没有**——那个目录是空的。差点误判成"桌面没东西"。

## 病根：桌面被 OneDrive 重定向了

chichu 的真实桌面（注册表 `HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders` 的 `Desktop` 值）指向：

```
C:\Users\david\oNedrive里的文件\桌面
```

不是默认的 `C:\Users\david\Desktop`。更坑的是机器上**还有一个完全不同**的文件夹 `C:\Users\david\OneDrive\桌面`（另一份 OneDrive 同步，里面的 app 快捷方式跟真实桌面**不完全一样**），千万别拿它当桌面。

而且用户实际"看到"的桌面 = **真实桌面 + 公共桌面**两者合并：

```
真实桌面：C:\Users\david\oNedrive里的文件\桌面   ← 注册表取，别写死
公共桌面：C:\Users\Public\Desktop               ← 很多国产 app 装这（微信/QQ/Steam/VLC…）
```

所以以后任何涉及"桌面"的任务，先从注册表读真实路径，再并上 Public\Desktop，才是完整的桌面。

## 顺手记下：批量抠桌面软件图标的可靠做法

1. 枚举两个桌面的 `*.lnk`，用 `WScript.Shell` 的 `CreateShortcut` 解析出 `TargetPath` 和 `IconLocation`。
2. 图标源优先级：`IconLocation` 指向的 `.ico/.exe`（存在就用）→ 否则用 `TargetPath` 的 exe。空目标的（如 Adobe Illustrator/InDesign 快捷方式）手动补 exe 路径。
3. 从 exe 抠高清图标用 user32 的 `PrivateExtractIcons`，请求 256px（现代 app 基本都有 256 的图标资源）：

```powershell
Add-Type -AssemblyName System.Drawing   # pwsh7/Windows 直接能用
Add-Type @"
using System;using System.Runtime.InteropServices;
public class IconX{
 [DllImport("user32.dll",CharSet=CharSet.Unicode)] public static extern int PrivateExtractIcons(string f,int idx,int cx,int cy,IntPtr[] h,int[] id,int n,int flags);
 [DllImport("user32.dll")] public static extern bool DestroyIcon(IntPtr h);
}
"@
# foreach size in 256,128,64,48,32: PrivateExtractIcons -> Icon.FromHandle(h).ToBitmap().Save(png)
```

4. CLI 类二进制（如 OpenAI `codex.exe`）抠不出图标 → 退回找本地自带 logo（codex 自带 `.codex\skills\.system\openai-docs\assets\openai.png`）或官网拉。openai.com/chatgpt.com 直连会 **403 反爬**，但 manus.im 之类能直接 `Invoke-WebRequest` 拿到（系统走 Clash/Karing 代理时没问题）。
5. 项目自带的图（odysseus 的 `odysseus-app.png`、CAI 的 `cai-icon\cai_opt.png`）比从 exe 抠的更清，直接拿来用。

## 结果

55 个本地 app + codex/manus 共 **57 张 PNG**，统一丢到 `真实桌面\软件图标\`，文件名 = 应用名。

来源 session：2026-06-24 桌面软件图标整理。
