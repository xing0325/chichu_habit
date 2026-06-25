# funshine-clone 克隆站 + Vite SPA 子路径 rebase 配方

**类型**：project / reference（建站学习 + 可复用技术）
**日期**：2026-06-26

## 项目

FCC（FunShine Career Consulting）官网 https://funshinecareerconsulting.com/ 的静态克隆。

- 工程：`C:\Users\david\funshine-clone`
- 仓库：`xing0325/funshine-clone`（public）
- 线上：https://xing0325.github.io/funshine-clone/
- 部署：push master → GitHub Actions（`.github/workflows/deploy.yml`）纯静态上传，无 build 步骤

## 关键判断：镜像真实 build，而不是重写

原站是**编译好的 Vue3 + Vite 代码分割 SPA**（Element Plus、rem 缩放、内容与图片全在区块 chunk 里客户端渲染、无后端 API），图片原托管腾讯云 COS。

既然是静态 build，最高保真克隆 = **镜像真实编译产物**（同一套 JS/CSS，渲染逐字一致），而不是用 ai-website-cloner-template 的 `/clone-website` 把它重写成 Next.js（眼睛对着搭只会更不像、还更慢）。验证：渲染 DOM 与原站逐字相同（8003 字符）、图片集合一致、0 个 404。

## Vite SPA 部署到 GitHub Pages 子路径 `/<repo>/` 的 rebase 配方

Vite 默认 `base:"/"`，直接丢到项目仓库的 `/<repo>/` 子路径会白屏。没有源码、只有 build 时，按下面 5 处改 build 产物：

1. **index.html**：`/assets/...`、`/favicon.ico` → 相对路径（去掉前导 `/`）
2. **主 JS 的 Vite preload 基址函数**：`Rf=function(e){return"/"+e}` → `return e`。去掉前导 `/`，让懒加载 chunk 和注入的 CSS `<link>` 走文档相对路径、与 repo 名无关。不改 → 子路径下 CSS chunk 404 → 区块全裸奔（这是最隐蔽的坑）
3. **Vue Router**：`createWebHistory("/")` → `createWebHistory("/<repo>/")`。**唯一**必须硬编码 repo 名的地方，否则路由不匹配整页白屏
4. **CDN/COS 图片基址常量** → `cdn/`，并把图全下到本地（去外部依赖、境外也快）
5. **chunk CSS 里的** `url(/assets/...)` → 相对

## 两个实操要点

- **挖资源清单别只信首屏渲染**：从 chunk 里 grep 图片字面量。首屏渲染只出现 74 个，实际 97 个，差的是 `*-m` 移动版 / `*-z` 放大版 / 交互态弹窗图。
- **本地子路径验证法**：`New-Item -ItemType Junction` 把 repo 链到一个父目录，`py -3.12 -m http.server --directory <父目录>` 让站点落在 `http://localhost:端口/<repo>/`，再用无头 Chrome `--headless=new --dump-dom` 抓渲染后 DOM，查 server 日志有没有非 200。部署前必须这样过一遍。

姊妹案例：landonorris-clone 是 Next.js 版子路径部署（static export + basePath + next/font）。

## 后续：又做了 Next.js 源码版（funshine-next）

用户看完镜像版后要了"源码版"——用模板 `/clone-website` 流程手搓一份干净可编辑的 Next.js 工程。

- 工程 `C:\Users\david\funshine-next`，repo `xing0325/funshine-next`，线上 https://xing0325.github.io/funshine-next/
- Next16 + Tailwind4 + shadcn，12 个区块组件（hero/nav/导师/案例/关于/特色/团队/流程/策略/产品/FAQ/联系），真实文案集中在 `src/lib/content.ts`，97 张图进 `public/images/`
- `output:"export"` + `basePath:"/funshine-next"` + `images.unoptimized`，Actions 跑 `npm run build` 出 `out/` → upload-pages-artifact → deploy-pages
- 关键判断：原站是编译好的 SPA，镜像真实 build 才是"逐像素一模一样"；源码版价值在**可二次编辑**，目标是"看着像 + 干净 Tailwind 组件"，不追字节级一致

几个实操坑：
- Next16 的 `next.config` 删了 `eslint` 配置键（写了会报 Unrecognized key），别照搬旧版
- 无头截图给 `vh` 布局设超高视口会把 `min-h-[82vh]` 撑成上万 px → hero 用固定 px 高更稳；整页截图用超高视口能让所有 IntersectionObserver 淡入一次性触发（但 vh 元素要先改掉）
- 锚点跳转 + IntersectionObserver 在 headless 截图里常拍到 reveal 还没触发（全白），是截图假象不是 bug，整页超高视口截图能验真

## 再后续：第三版 = 以兰多诺里斯网站风格重构（funshine-lando）

用户要"以兰多诺里斯的网站的风格重构这个网站"。做法：**fork 源码版 + 复用同一份 content.ts + 换设计语言重做皮肤**，不重写内容。

- 工程 `C:\Users\david\funshine-lando`，repo `xing0325/funshine-lando`，线上 https://xing0325.github.io/funshine-lando/
- 设计语言直接从本机已有的 `landonorris-clone` 拆：配色（米白#f4f4ed/橄榄#282c20/电光柠檬绿#d2ff00，都是 globals.css 里标好的真实 getComputedStyle 值）、字体（Brier Bold 展示 + Mona Sans 正文，woff2 从 `landonorris-clone/public/fonts` 直接拷）、Lenis 平滑滚动、跑马灯、米白/橄榄交替区块、随背景反色的 nav、巨型 wordmark 页脚
- **拿别人的风格 = 拆他们克隆站的 globals.css + 组件 + 字体文件**，比看截图猜准得多

两个复用别人设计语言的坑：
- **Brier（拉丁展示字体）没有中文字形** → 中文标题会回退到 Mona/系统。解法：各区块"大号英文 Brier 展示字 + 中文做小号微标签"，既贴 Lando 招牌的大号拉丁排版又避开缺字
- **fork 工程后 `src/lib/base.ts` 的 BASE_PATH 常量要跟着 next.config 的 basePath 一起改**，否则 `asset()` 拼出来的图片路径全指向旧仓库名 → 一片 404（next/font 和 _next 资源会自动跟 basePath，但手写的 asset 助手不会）

至此 FCC 一个站做了三版：镜像(逐像素)、源码(可编辑)、换皮(Lando 风格)。同一份 content.ts 喂三套外壳。

## Lando 版加 GSAP 炫酷动效（滚动驱动 + 字体入场 + 转场）

用户要"多加一些原网页的炫酷动效（滚动驱动，字体入场）与转场（入场也要）"。用 GSAP 技能，给 funshine-lando 叠一层动效（不动内容）：

- **页面入场转场**：橄榄遮罩盖全屏，FCC 字母 mask 从下揭示→停顿→淡出→遮罩整块上掀(yPercent:-100, power4.inOut)，露出页面
- **字体入场**：`SplitText.create(el,{type:'chars',mask:'chars'})` 把标题切成字符+overflow-clip 罩，`yPercent:115→0` stagger，hero 和每个区块标题滚到视口触发
- **滚动驱动**：ScrollTrigger `scrub` 做视差——巨型 FCC 随滚动上移、团队照从 scale1.18 缓出；卡片 Reveal 升级成 ScrollTrigger 淡入
- **Lenis↔GSAP 同步**（关键）：`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t=>lenis.raf(t*1000))` + `gsap.ticker.lagSmoothing(0)`。Lenis 走原生 window 滚动，不需要 scrollerProxy

工程坑：
- React 用 `useGSAP({scope:ref})`(@gsap/react)自动清理；插件在 `lib/gsap.ts` 里 `if(typeof window!=='undefined') gsap.registerPlugin(...)` 注册，组件从那 import，避免 SSR 调用
- **Hero 入场跨组件协调**：Intro 完成时 `window.dispatchEvent(new Event('intro:done'))`，Hero 监听到才播入场 timeline；fallback `setTimeout` 必须 > intro 总时长(我设 4500ms)，否则遮罩还没掀 hero 就先播了
- 全程 `prefers-reduced-motion` 守卫：reduce 时直接 finish/return 不 set 隐藏态（避免无障碍用户看到空白）
- 无头截图验动效：virtual-time-budget=1500 抓入场中途、=30000 抓 settle 态确认内容没卡隐藏；时序动效截图只能验首尾
