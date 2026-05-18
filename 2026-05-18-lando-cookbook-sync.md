# lando-teardown HTML 与 web-anim-cookbook 仓库保持同构

> 源：memory `feedback_lando_cookbook_sync.md` · 2026-05-18

chichu 给的指令：**兰多·诺里斯官网反向工程 HTML 是动效素材的 source of truth，cookbook 仓库是这份 HTML 的"镜像 + 切片"**。每次更新主 HTML，cookbook 必须跟着改。两个仓库永远保持同构。

原话："这个动效库将养活我的好多项目"——这意味着 cookbook 不能过时，否则 chichu 拷一个老 demo 到新项目就翻车。

## 两个仓库的角色

- **`landonorris-teardown`** = 反向工程报告。一个长 HTML（`index.html`），里面塞 65 个 demo + 拆解文章 + 全景目录。**演示和教学用**。
- **`web-anim-cookbook`** = 动效素材库。65 个独立 HTML，每个一个 demo，可直接拷代码用。**复用和搬运用**。

cookbook 是 derived，不是独立项目。**别在 cookbook 加 lando HTML 没有的东西**。要加先加到 lando 再同步过来。

## 关键路径

| 角色 | 路径 |
|---|---|
| lando 主 HTML | `C:\Users\david\OneDrive\桌面\lando-norris-reverse-engineering.html` |
| lando 部署仓 | `C:\Users\david\projects-deploy\landonorris-teardown\` |
| lando Pages | https://xing0325.github.io/landonorris-teardown/ |
| cookbook 仓 | `C:\Users\david\projects-deploy\web-anim-cookbook\` |
| cookbook Pages | https://xing0325.github.io/web-anim-cookbook/ |
| 抽取脚本 | `C:\Users\david\projects-deploy\web-anim-cookbook-tool\split_to_cookbook.py` |

## 何时触发同步

| 主 HTML 改了什么 | cookbook 怎么跟 |
|---|---|
| 加一个 demo | `DEMO_INFO` 字典加一行 → 跑 split 脚本 → 编辑 index.html + 对应 README.md 加卡和行 |
| 改某个 demo 实现 | 跑 split 脚本（会覆盖对应文件） |
| 加新分类（如 K 无障碍） | 加新文件夹 + 新 README + root README 加分类卡 + index.html 加 section |
| 重命名 demo | 文件改名 + 所有引用同步（index.html, 各 README, 链接） |
| 整体结构重构 | 跑 split 全量重生成 + 重写 root index.html + 派 agent 重写各 README |

## 实施流程（标准）

1. 在 lando HTML 完成改动
2. 跑 `reorder.py`（如果改了 demo 顺序或加了新 demo）
3. 推 landonorris-teardown 仓
4. **更新 `DEMO_INFO` 字典**（split_to_cookbook.py 里的源数据）
5. 跑 `split_to_cookbook.py` 全量重生成 cookbook 仓
6. 编辑 cookbook `index.html`（加 / 改卡片）
7. 编辑相关 cookbook README.md
8. 推 web-anim-cookbook 仓
9. **回复时给两个 URL**：lando + cookbook

## 验证

同步完检查：
- cookbook demo 文件数 = lando HTML 里 demo 数（最新 65）
- cookbook index.html 卡片数 = lando HTML demo 数
- 8 分类 + 4 子组 README 齐全
- root README 数字对得上
- 两个仓 Pages 都 HTTP 200

## 别做的事

- ❌ 只更新 lando 不更新 cookbook
- ❌ 让两边 demo 数对不上
- ❌ 在 cookbook 加 lando 没有的 demo
- ❌ 改 cookbook 不动 lando（反向同步未支持）

## 加 demo 的最快路径

```
lando HTML 加 demo block → reorder.py → 推 lando
↓
DEMO_INFO 加一行 → split_to_cookbook.py → 编辑 cookbook index.html → 编辑分类 README
↓
推 cookbook → 给两个 URL
```

哪天反向同步（cookbook → lando HTML）也支持的话再扩展。目前先 lando 单向到 cookbook。

---
来源 session: 2026-05-18 · lando 反向工程项目阶段三
