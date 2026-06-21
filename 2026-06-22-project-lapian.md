# 课程答辩三电影长卷站 · lapian

把课上拉片讲过的《老无所依 / 黄金三镖客 / 爵士春秋》重构成**一条连续向下滚动、由滚动驱动的电影感长卷**（8–12min 短片，不是"网站"）。学习用途、非盈利，作者 chichu。

## 地址 / 工程
- 工程：`C:\Users\david\lapian`
- GitHub：https://github.com/xing0325/lapian （public）
- 在线：https://xing0325.github.io/lapian/ （Pages，main/根目录）。现首页=设计稿；build 出站点本体后首页换成站点、设计稿移 `/design.html`
- 设计稿：`docs/superpowers/specs/2026-06-21-three-films-design-v2.md`（HTML 版 `design-v2.html`）；研究/哲学脊柱/评审在 `research/synthesis/`
- 更新流程：改 md → 重生 design-v2.html → copy 到 `index.html` → `git push` → Pages ~1min 自动重建

## 已锁决策（别再推翻）
- 整体=连续长卷 + 三处 morph 接缝；每幕用各自视听语言、物理互斥（明度/画幅/字体/声音≥5 维对立）；哲学只进答辩脑子、**不上墙、不堆术语**。
- 三幕英雄交互：
  - NCFO 虚空·**等上帝来**（父亲骑马带火先行、火不灭你却永远到不了；全片静默=上帝缺席）
  - GBU 造梦/元电影·**换配乐实验**（同一张脏脸换四曲、情绪翻转但不洗白那张脸）
  - ATJ 纵情·**自由是幻觉+恶魔之问**（用户拍板的**悲剧读法**：即兴已死/强迫重复）
- 交互数 **2-2-3**（非对称才像电影；评审警告"加按钮≠加思想"）。
- 豆瓣直连被反爬挡（302→sec.douban.com），深读靠 WebSearch 聚合真实影评。
- 配乐：用户自备正版放 `public/audio/<幕>/`，缺则默片字幕卡降级；NCFO 走 CC0/自录。
- 技术：连续长卷单页 + GSAP ScrollTrigger（pin+scrub）+ Web Audio（分幕 crossfade）；Vite(+vite-plugin-singlefile)；禁 emoji/ASCII 凑图，美术双路线（写实素材交 Codex+image-2 / 符号 SVG）。

## 下一步
设计已部署、待用户绿灯 → writing-plans → 分阶段 build MVP，部署到同一 Pages。
