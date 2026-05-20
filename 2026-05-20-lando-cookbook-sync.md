# 2026-05-20 lando-teardown HTML 与 web-anim-cookbook 仓库保持同构

> 源：memory `feedback_lando_cookbook_sync.md`

兰多·诺里斯官网反向工程 HTML（`landonorris-teardown` 仓库 / `index.html`）和动效库（`web-anim-cookbook` 仓库）要保持**结构同构**。

- **HTML = source of truth**
- **cookbook = derived artifact**

## 为什么

chichu 原话：**"这个动效库将养活我的好多项目"**

cookbook 是给所有未来项目复用的素材库，必须跟主反向报告保持一致，否则 cookbook 内容会过时、误导。

## 触发同步的动作

- **新增 demo** → cookbook 加对应独立文件到分类目录 + 更新 `index.html` 卡片 + 更新分类 `README.md`
- **修改 demo 实现** → cookbook 里对应文件同步改 HTML/CSS/JS
- **新增分类** → 新文件夹 + 新 `README.md` + root README 加分类卡 + 根 `index.html` 加分类 section
- **重构 HTML 整体结构** → cookbook 也按新结构重组（重命名、移动、合并、拆分）
- **重命名 demo** → cookbook 文件改名 + 所有引用同步改（index.html, README, TAXONOMY）

## 关键路径

- **lando 主 HTML（source of truth）**：`C:\Users\david\OneDrive\桌面\lando-norris-reverse-engineering.html`
- **lando 部署仓库**：`C:\Users\david\projects-deploy\landonorris-teardown\` → https://github.com/xing0325/landonorris-teardown → https://xing0325.github.io/landonorris-teardown/
- **cookbook 仓库**：`C:\Users\david\projects-deploy\web-anim-cookbook\` → https://github.com/xing0325/web-anim-cookbook → https://xing0325.github.io/web-anim-cookbook/
- **抽取脚本**：`C:\Users\david\projects-deploy\web-anim-cookbook-tool\split_to_cookbook.py` —— 从主 HTML 抽取 65 个 demo 到 cookbook 独立文件

## 流程

每次完成 lando HTML 改动后：

1. 推 lando teardown（已有标准流程）
2. **同步 cookbook**：
   - 单 demo 加 / 改：编辑 `DEMO_INFO` 字典加新 entry → 跑 `split_to_cookbook.py` → 编辑 `index.html` 加卡 → 编辑分类 `README.md` 加行
   - 结构性重构：跑 `split_to_cookbook.py` 全量重生成 → 重写 root `index.html` → 重写各类 `README.md`（可派 agent 帮写）
3. 推 cookbook（commit + push）
4. **两个仓库都给链接**：lando-teardown URL + cookbook URL

## 不要做的事

- 不要只更新 lando 不更新 cookbook
- 不要让两边的 demo 数 / 分类数对不上
- 不要在 cookbook 里加 lando HTML 没有的 demo（cookbook 是镜像，不是独立项目）—— 如要加，先加到 lando HTML，再同步

## 验证清单

每次同步后核对：

- cookbook demo 文件数 = lando HTML 里 demo 数（最新 65）
- cookbook `index.html` 卡片数 = lando HTML 里 demo 数
- cookbook 8 分类 README + 4 子组 README 都齐
- root README 总览数字对得上
- Pages 部署成功（HTTP 200）

## 配套工具

- `split_to_cookbook.py` —— DEMO_INFO 字典是单一信息源，更新它即可。脚本会清空 cookbook 重建
- `reorder.py` —— 主 HTML 的 demo 重排序脚本（landonorris-teardown 项目里）

**加 demo 的最快流程**：lando HTML 里加 → `reorder.py` → 更新 `DEMO_INFO` → `split_to_cookbook.py` → 推两个仓库

---

> 来自 2026-05-20 memory 整理同步会话（claude）
