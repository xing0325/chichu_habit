# Hermes 网关（Nous Research agent，跑在原生 Windows）

> 类型：project · 记录于 2026-06-21

Nous Research 的 **Hermes Agent**(自进化 AI agent;官方 README 明说"原生 Windows 不支持、要用 WSL2",但用户硬装在原生 Windows 上跑)。装在 `C:\Users\david\AppData\Local\hermes\`,editable v0.16.0,用 uv 的 cpython-3.11。`hermes gateway run` 是常驻"消息网关",当前接着**本地 API(127.0.0.1:8642)+ 微信(ilinkai.weixin.qq.com,账号 e1116dcf)**,带 cron + kanban 调度。就是 lando-hero-replica 里"VIBE_DASH 接口留给 Hermes"的那个 Hermes。

## 自启机制
两个 Windows 计划任务:
- `Hermes_Gateway`(登录触发 → 跑 `gateway-service\Hermes_Gateway.cmd`)
- `Hermes_Gateway_Watchdog`(每 5 分钟,wscript 隐藏跑 .vbs,网关死了就拉回来)

改计划任务**定义**需要管理员(`Set-ScheduledTask` 会"拒绝访问");但 `gateway-service\` 下的 .cmd / .vbs **文件**用户可直接改。

## 2026-06-21 修过的坑：满屏 GBK 报错 + 任务栏黑窗
- **症状**:一个 `cmd.exe` 黑窗一直刷 `UnicodeDecodeError: 'gbk' codec can't decode … in _readerthread`,Thread 编号一路涨。
- **真凶**:中文系统上 `subprocess.run(text=True)` 默认按 **GBK** 解码子命令的 **UTF-8** 输出 → 负责读输出的后台线程崩。主进程**不死**、看门狗也**不重启**(实测同一进程连跑 8.6h),所以只是无限刷屏,不是"连接断了在重启"。
- **关键认知**:.cmd 里的 `PYTHONIOENCODING=utf-8` **管不到**子进程解码;真正生效的开关是 **`PYTHONUTF8=1`**(实测 `utf8_mode=1 → preferredencoding=utf-8`)。
- **修法**:① 新建 `Hermes_Gateway_Hidden.vbs`(pythonw 隐藏窗口 + `PYTHONUTF8=1`);② `Hermes_Gateway.cmd` 改成调它(顺带消掉前台黑窗);③ 看门狗 .vbs 也加 `PYTHONUTF8`。原件备份 `gateway-service\*.bak-20260621`。
- **零闪窗(可选,需管理员)**:`schtasks /Change /TN "Hermes_Gateway" /TR "wscript.exe \"…\Hermes_Gateway_Hidden.vbs\""`。

## 管理命令
`hermes gateway stop | status | uninstall`。

## 旁注
微信偶发 `[Weixin] poll error … getaddrinfo failed` 是 DNS / 代理(Karing)抖动,能自愈,**与上面的刷屏是两码事**。
