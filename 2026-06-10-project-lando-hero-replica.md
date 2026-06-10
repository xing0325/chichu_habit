# lando 流体头盔 hero 复刻（项目状态）

> 2026-06-10 · 由 memory 双写同步

复刻 landonorris.com 首屏「流体头盔」效果，为个人网站做的 hero 实验（hero study 001）。

- **工程**：`C:\Users\david\lando-hero-replica`，单文件 `index.html`，零依赖（无 CDN/图片/字体），file:// 可直接打开。已 git init。
- **dev server**：launch.json 配置名 `lando-hero-replica`，端口 8170。
- **机制**：Stable Fluids（BFECC 平流 + 2 格步长泊松×4，10% 分辨率）→ 速度场阈值化成液体蒙版 → 蒙版内调色板切换 + SDF raymarching 头盔显形（包围球早退）。fbm 噪声大色块 + 导数缩放等高线描边。2.5s 无操作自动巡航。按键 C 切配色（lando 柠檬绿 / zima 蓝），H 头盔常驻。
- **调参**：`CONF` 对象 / 运行时 `HERO.conf.*`；`HERO.step(n)` 隐藏标签页推帧调试。
- **官网机制结论**（逆向自抓包）：米白底 #F8F8F3 + 柠檬绿 #D2FF00 噪声色块；头盔默认隐藏，流体轨迹阈值化后才显形；泊松用 px*2 步长抑制棋盘格。
- **旧尝试归档**：`C:\Users\david\lando-attempts-archive\`（00 官网抓包 / 01 personal-website Astro hero v1-v5 / 02 工作资料单文件；INDEX.md 有全表）。`personal-website` 和 `C:\工作资料\lando` 已移走，launch.json 旧 lando 条目已删。
- 用户明确要求：不继承旧尝试的代码。
