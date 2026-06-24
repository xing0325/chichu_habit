# 银饰画册已部署上线（2026-06-24）

chichu 的银饰 DIY 项目（代码建模 → 3D 打印可铸树脂 → 失蜡铸造）的**画册（lookbook）已部署到 GitHub Pages**：

- 线上：https://xing0325.github.io/jewelry/
- 仓库：https://github.com/xing0325/jewelry  （public）
- 工程本地：`C:\Users\david\jewelry`，画册本体 = `lookbook.html`，`index.html` 是 0 延迟跳转到它

## 只部署画册成品，不公开源码

仓库只推画册资产（`index.html` + `lookbook.html` + 各系列 PNG，约 10.5MB）。`.gitignore` 排除：

- `*.stl` —— 208MB 的铸造 3D 模型，网页用不到
- `*.py` —— 参数化生成器源码 = chichu 的「生成式定制」护城河，暂不公开
- `*.md` —— 打样需求单 / 发布文案等内部文档

## 可复用的坑：GitHub Pages 的 Jekyll 会忽略下划线开头文件

首次部署后，`bagua/_baguaring.png`、`wuxing/_stack.png`、`wuxing/_contact.png`、`couple/_contact.png` 这 4 张**下划线开头**的图片 404。根因：GitHub Pages 默认走 Jekyll，Jekyll 把 `_` 开头的文件/目录当特殊文件不发布。

**修法：仓库根目录加一个空的 `.nojekyll` 文件**，关掉 Jekyll，所有文件原样发布。加完 push，28 张引用图全部 200、零破图。

> 经验：任何往 GitHub Pages 推、且文件名/目录有下划线开头的静态站，先放 `.nojekyll`。

## 注意版权

`ai_rings` 系列（ChatGPT/Codex/Claude/DeepSeek 的 logo）和 `artists` 系列（沃霍尔/拉姆斯/穆夏/安藤/莫奈 风格转译）已随画册公开。自媒体展示问题不大，但**商用 / 麓湖摆摊售卖需自理各家商标与作品版权**，必要时从公开画册撤下。

## 以后更新

改完 `lookbook.html` 或图片，`git push` 即自动重建（约 1 分钟）。

> 源：memory `project_silver_jewelry.md`（已同步更新上线信息）
> 来源 session：2026-06-24「把银饰的那个部署一下」
