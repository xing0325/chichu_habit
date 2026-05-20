# 2026-05-20 项目名 + 昵称选择性进 CapsWriter 热词

> 源：memory `feedback_project_names_to_capswriter_hotwords.md`

CapsWriter `hot.txt` 只为**高信号项目**自动维护 —— 不是"沾边就加"。

## 规则

新接触的小项目 / 一次性的活**默认不动 hot.txt**。

只有满足以下任一才能加：

1. **长期信号**：该项目有 `project_*.md` 类型的 memory
2. **近期信号**：最近 30 天内有 git 活动 / 文件修改 / session 中提及多次
3. **明确请求**：chichu 在 session 里直接说"加到热词"、"加进 hot.txt"、"以后这个名字要识别准"
4. **昵称同源**：基础项目已经在 hot.txt 里，chichu 在 session 里用了简称 / 昵称 → 给那个**已有条目**追加这个别名（不是为新项目建条目）
5. **Session 重命名信号**：chichu **手动重命名过 session**（`titleSource: user`），且 session 名指向一个真实项目（不是"happy mother's day"这种一次性话题）

## 为什么

chichu 主动收紧规则 —— 音近别名一旦多了，等于在他说话时设置无数地雷：

- 平时说话被错替换成项目名（"克劳的"被强行替换成"Claude"，即使他是在别的语境）
- hot.txt 视觉上一堆"嬷法主沙"、"扣的克斯"这种音译别名像乱码，编辑维护痛苦
- 误触发率随条目数线性增加 → 影响整体识别效率

→ **少而精**优先于"覆盖全"。

## 怎么检测 titleSource:user

扫 `%APPDATA%\Claude\claude-code-sessions\*\*\*.json`，找 `titleSource` 字段：

- `user` = chichu 手动重命名（**高信号 ✓**）
- `auto` = 模型自动生成（低信号，**不加**）

PowerShell 速查：

```powershell
$root = "$env:APPDATA\Claude\claude-code-sessions"
Get-ChildItem $root -Recurse -Filter "*.json" | ForEach-Object {
  try {
    $j = Get-Content $_.FullName -Raw -Encoding UTF8 | ConvertFrom-Json
    if ($j.titleSource -eq 'user' -and -not $j.isArchived) {
      [PSCustomObject]@{ Title = $j.title; LastActivity = ([DateTimeOffset]::FromUnixTimeMilliseconds($j.lastActivityAt).LocalDateTime) }
    }
  } catch {}
} | Sort-Object LastActivity -Descending
```

## 默认不加的情况

- 新建 / 一次性 / 试验性项目（哪怕碰了它的代码也不加）
- 短期 hackathon / 临时仓库
- 只在一两次 session 里讨论过、没进 memory 的项目
- chichu 没说"要识别准"的项目
- **session 名是话题 / 探索而非项目**（如"狼人杀与马尔可夫过程"、"happy mother's day"、"两个 claude 直接沟通"）—— 即使 `titleSource:user` 也不加

## 怎么加（如果决定加）

1. **文件位置**：`C:\Users\david\CapsWriter\CapsWriter-Offline\hot.txt`（保存即生效）
2. **结构**：放在 `# David 的项目` 块下
3. **格式精简**：
   - 主要写法：英文名 / 中文名
   - 音近别名**最多 1-2 个**，只加 chichu 实际会说的发音
   - **不要瞎造** —— 不确定先不加，等他在 session 里实际念错了再补
4. **昵称扩展**：如果重命名 session 里出现了已有项目的别名（如"嬷法师大乱斗"对应 mofazhusha），把这个别名追加到已有条目末尾用 `|` 分隔
5. **不用问，直接加**（规则授权）

## 已加的项目（截止 2026-05-18，hot.txt 里都有）

- 嬤法大逃杀 / mofazhusha（别名：嬷法大逃杀 / 嬷法师大乱斗）
- 钥匙玩校 / kiidschool（别名：钥匙玩学 / 钥匙玩校2）
- chichu_habit（别名：吃醋哈比特 / chichu habit）
- 振贝笔 / Vibe pen（别名：维布笔 / vibe coding 硬件）
- 好奇尖塔（别名：slay-the-curiosity）
- allow 桌宠（别名：allow-floating-ball / 自动 allow 软件）
- 我的个人网站（别名：personal-website / 作品集网站 / 作品集）
- bibabo（别名：bibabo 划词规则）
- 粉砖播客（无别名）
- 训练我的形象（无别名）

## 绝对不加的东西

- 一次性词汇、函数名、变量名
- 天然能识别准的普通词
- 极短词（≤2 字）
- 凭据类（token / 密码）

## 复审节奏

每隔几个月可以提议 chichu 一起回顾 hot.txt，淘汰他已经不做的项目的别名。

---

> 来自 2026-05-20 memory 整理同步会话（claude）
