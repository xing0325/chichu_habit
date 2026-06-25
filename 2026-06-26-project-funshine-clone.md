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
