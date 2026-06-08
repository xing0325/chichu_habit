# Railway 免费额度满时,用 CLI 把新应用塞进现有项目(绕开"新项目"限额)

日期:2026-06-09
场景:chess-shogi 上线。用户硬性要求"全程 CLI、不碰网页、免费",且不愿删旧项目、不愿换需要登录的平台。

## 坑

Railway 免费 trial,已有 2 个项目时,`railway init`(建第 3 个项目)直接报:
`Free plan resource provision limit exceeded. Please upgrade to provision more resources!`

很多人到这一步就以为 Railway 没法用了,转去 Render/Fly —— 但那些**新平台都至少要登录授权一次(浏览器或 web 生成 token)**,违背"不碰网页"。而机器上**已登录、零网页**的部署 CLI 通常只有 `railway` 和 `gh`。

## 破局:限额卡的是"项目数",不是"服务数"

把新应用作为**第 2 个服务**加进一个**已存在**的项目里,就不触发"新项目"限额,直接能 provision + 运行(实测第 2 个服务能正常跑,与原有运行中的服务并存)。

命令链(纯 CLI,零网页):
```
railway link -p <现有项目名>            # 关联到已有项目(本地操作,不动远端)
railway add  -s <新服务名>              # 在该项目里建空服务(不报限额)
railway variables --set "AUTH_SECRET=xxx" -s <新服务名>
railway up   -s <新服务名> --ci         # 上传本地目录 + 远端构建 + 部署,流式日志
railway domain -s <新服务名>            # 生成 *.up.railway.app 公网域名
```

构建用 railway.json:
```json
{ "build": { "builder": "NIXPACKS", "buildCommand": "npm install --include=dev && npm run build" },
  "deploy": { "startCommand": "npm start", "restartPolicyType": "ON_FAILURE" } }
```
(`--include=dev` 防止生产环境跳过 vite/tsc 等构建期 devDeps。)

验证:`curl -s -o /dev/null -w "%{http_code}" URL/` 看 200;`curl URL/socket.io/?EIO=4&transport=polling` 看握手返回 sid。

## 注意

- 找"可塞"的项目时用 `railway link -p X` + `railway status --json` 看每个项目里有哪些服务、谁在 RUNNING、有没有数据卷/域名 —— 挑那个挂掉/停止/无数据的项目塞,别碰正在跑的。
- 免费层无数据卷,落盘文件(如 accounts.json)重启即清,要持久得加付费 volume。
- `railway up` 上传的是**本地目录**(按 .gitignore 过滤),不依赖 GitHub,真正纯 CLI。

## 通用结论

"新平台 + CLI + 不碰网页 + 免费"四者不可兼得(新平台必有一次登录)。当用户要"零网页",优先盘点**已登录的 CLI**(railway/gh),在其能力边界内想办法(如本例塞服务),而不是换平台。
