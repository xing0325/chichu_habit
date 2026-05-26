# 打字爽（dazi-juice）项目档案

> 中文打字练习网页，强反馈 + 导入自己喜欢的文章背诵式练习。

## 来源
2026-05-26 一次对话里诞生。用户喜欢打字、想提升中文速度，发现打喜欢的文章能背得更深。

## 形态
- 单文件 HTML 网页（`C:/Users/david/projects/dazi-juice/index.html`）
- 零依赖零构建
- dev server: http://localhost:8110/（python http.server）

## 已锁定的设计决策（不要推翻）

### Monkeytype 风格输入
- textarea 完全透明（color/caret/background 都是 rgba(0,0,0,0)），紧跟 active 行下方定位
- IME 候选窗会自然弹在原文下方
- 点击任意位置（除 modal/button/hud）自动 refocus
- **不要再做底部独立输入框**

### 排版
- splitToLines 切分集合 `[。！？；，、：…,;?!:]` + 换行
- 逗号也分行（避免长句溢出）
- active 行 30px，普通行 22px
- text-area max-height 62vh，超长自动滚动

### 错字可改正
- evaluate 基于完整 input.value 重算所有字符状态
- backspace 回退视觉和 stats
- maxCombo 历史峰值不被冲刷

### 反馈强度封顶
intensityLevel 函数四档：
- combo < 5：极轻（2 粒子，无震动）
- combo < 20：轻（3 粒子）
- combo < 50：中（5 粒子，small shake）
- combo ≥ 50：高，**封顶**（7 粒子，speed lines）

已去掉的（之前太炸）：
- 满屏红闪
- 巨型字幕（INSANE/GOD 那种 120px banner）
- 大震动 shake-m / shake-l

milestone（25/50/100/200）改为右侧小标签淡入淡出。

### 持久化
localStorage key `dazi-juice:v1`，存用户自加的文章和 muted 状态。

### 预置文章
DEFAULT_ARTICLES 数组：鹿柴、登鹳雀楼、荷塘月色节选、卜算子咏梅。

## 用户喜欢但搜不到正文的作者

### 朱慈
- 知乎用户名"神经无端"
- 2024 年 4 月注销知乎，文章被删
- Web 公开 surface（搜索 / archive.today / wayback machine / 知乎主站）全部拿不到正文
- 知乎主站 403，satori5ama 锐评页 404
- **不要瞎编朱慈的文章**，只能让用户自己从备份（手机截图 OCR、微信收藏、转载公众号、B 站朗诵视频简介、小红书搬运）粘进来
- 类似情况：愚者、李拐儿、白纸（同一波）

## 文件位置
- 主：`C:/Users/david/projects/dazi-juice/index.html`
- 设计稿：`C:/Users/david/projects/dazi-juice/DESIGN.md`

## 后续可能做
- 默写模式（隐藏部分字 / 全文凭记忆打）
- 结算页错字回顾
- 推 GitHub（PAT 已存）

## 相关 habit
- `2026-05-16-dev-server-url-push.md`
- `2026-05-16-html-link-required.md`
- `2026-05-16-match-form-factor.md`
