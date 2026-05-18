# 项目名 + 昵称选择性进 CapsWriter 热词

> 源：memory `feedback_project_names_to_capswriter_hotwords.md`
> 日期：2026-05-18（v3，加入 titleSource:user 检测）
> 用户原话（初版）："我的每一个项目都变成热词，然后还可以在我的 session 里面识别'我称呼这个项目的常用名'也加入热词"
> 用户原话（收紧）："能不能只有我长期的大的项目/近期常用/pinned 的 session（你能看出来的）才加入热词，不然这些英文乱码也会影响我的效率"
> 用户原话（授权自主）："加进去，加啥不用问我"

## chichu，下次帮 David 工作时，记住：

### 核心规则

**只为高信号项目维护 CapsWriter `hot.txt`，不是沾边就加。** 误触发的代价比"漏识别一两次"更大。

### 触发条件（满足任一才能加）

1. **长期信号**：项目有 `project_*.md` 类型的 memory 文件
2. **近期信号**：最近 30 天有 git 活动 / 文件修改 / 多次被提及
3. **明确请求**：David 直接说"加到热词"、"以后这个名字要识别准"
4. **昵称同源**：项目已在 hot.txt → 给**已有条目**追加 David 在 session 里用的简称别名
5. **Session 重命名信号**：David 手动重命名过 session（JSON 里 `titleSource: user`），且名字指向真实项目（不是话题）→ 把那名字加进 hot.txt

### 怎么检测 titleSource:user（核心技巧）

session 元数据存在 `%APPDATA%\Claude\claude-code-sessions\*\*\*.json`，里面有 `titleSource` 字段：

- `user` = David 手动重命名（**高信号 ✓**）
- `auto` = 模型自动生成（**低信号，不加**）

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

### 默认不加

- 新建 / 一次性 / 试验性项目（碰了代码也不加）
- 短期 hackathon、临时仓库
- 只在一两次 session 里讨论过、没进 memory 的项目
- David 没说"要识别准"的
- **session 名是话题而非项目**（"狼人杀与马尔可夫过程"、"happy mother's day"、"两个 claude 直接沟通"）—— 即使 titleSource:user 也不加

### 加的时候的格式纪律

- 位置：`# David 的项目` 块下
- 主要写法：英文名 / 中文名
- 音近别名**最多 1-2 个**，且**只加 David 实际会说的发音**
- **不要瞎造**别名 —— 不确定先不加，等他实际念错了再补
- 昵称扩展：重命名 session 里出现已有项目的别名（如"嬷法师大乱斗"对应 mofazhusha），把别名追加到已有条目末尾用 `|` 分隔
- 文件保存即生效，不重启 CapsWriter

### 为什么收紧

- 别名过多 → 平时说话被错替换
- 视觉乱码（"嬷法主沙"、"扣的克斯"）→ hot.txt 维护痛苦
- 误触发率随条目数线性增加

少而精 > 覆盖全。

### 已加项目（截止 2026-05-18）

| 项目 | 别名 | 凭啥进 |
|---|---|---|
| 嬤法大逃杀 / mofazhusha | 嬷法大逃杀 / 嬷法师大乱斗 | project memory + session 重命名 |
| 钥匙玩校 / kiidschool | 钥匙玩学 / 钥匙玩校2 | project memory + session 重命名 |
| chichu_habit | 吃醋哈比特 / chichu habit | 高频使用 + session 重命名 |
| 振贝笔 / Vibe pen | 维布笔 / vibe coding 硬件 | project memory + session 重命名 |
| 好奇尖塔 | slay-the-curiosity | launch.json + session 重命名 |
| allow 桌宠 | allow-floating-ball / 自动 allow 软件 | settings.local.json 活跃 + session 重命名 |
| 我的个人网站 | personal-website / 作品集网站 / 作品集 | launch.json + session 重命名 |
| bibabo | bibabo 划词规则 | API 调用记录活跃 + session 重命名 |
| 粉砖播客 | （无别名） | session 重命名 |
| 训练我的形象 | （无别名） | 近期多个 feedback memory + session 重命名 |

### 绝不加的东西

- 一次性词汇、函数名、变量名
- 天然能识别准的普通词
- 极短词（≤2 字）
- 凭据类（token / 密码绝对不写）

### 复审节奏

每隔几个月主动提议跟 David 一起回顾 hot.txt，淘汰他已不做的项目别名。
