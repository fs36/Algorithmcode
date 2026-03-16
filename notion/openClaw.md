# OpenClaw 的介绍
### 介绍
**自主 AI 智能体（Autonomous AI Agent）框架**，旨在将大语言模型（LLM）的推理能力转化为对物理与数字世界的实际执行力。其核心能力在于通过 **Agent Loop（自主循环）** 机制，让 AI 能够独立观察环境、拆解复杂任务并调用 Tools（原子工具） 与 Skills（复合技能） 执行操作。依托于模块化的**Workspace（工作空间） 管理记忆、Gateway（核心网关） 调度多模型路由 以及 Channels（通信渠道） 接入 Telegram/飞书等主流平台**，OpenClaw 能够 24/7 全天候作为“数字员工”在 Platforms（多平台环境） 中稳定运行，处理从自动化网页操作到复杂系统运维的全流程任务。

### WorkSpace
定义：是 Agent 运行时的默认工作目录，也是其感知自我、理解用户和存储记忆的物理载体。（openClaw是员工，WorkSpace是办公桌和笔记本）

#### md驱动
由**Markdown文件**驱动。Workspace 通过特定的 .md 文件定义 Agent 的灵魂和行为，无需代码即可完成深度定制。
- `AGENTS.md`：操作手册。规定 Agent 的任务优先级和干活准则。
- `SOUL.md`：人设滤镜。定义性格、语气（如：毒舌、严谨、温柔）。
- `USER.md`：用户画像。让 Agent 记住你的职业、偏好和禁忌。
- `IDENTITY.md`：Agent 自身的名字/风格
- `TOOLS.md`：工具使用备注
- `MEMORY.md`：长期记忆（仅主 session 加载）
- `memory/YYYY-MM-DD.md`：每日日记
里面的文件直接注入到每次对话的 System Prompt

#### 核心功能
- 安全边界-默认沙盒机制
    - 隔离性：Workspace（工作区）与全局配置（密钥、凭证）物理分离。
    - 权限控制：通过配置可开启“硬沙盒”，将 Agent 的读写权限死锁在当前文件夹内，防止其误删系统文件。
- 技能本地化-定制化“外挂”
    - `skills/` 目录：你可以为特定 Agent 编写专属脚本。
    - 覆盖逻辑：Workspace 内的技能优先级高于全局技能。这意味着同一个“代码助手”，在不同项目（Workspace）里可以拥有完全不同的私有工具。

### Model
定义： 被设计为高度灵活、可自动降级且支持多供应商并行的系统。**一套完整的模型路由与治理框架**。

#### 核心功能
- **多层级路由与降级**。OpenClaw 的模型选择遵循严密的优先级逻辑，确保智能体在复杂环境下“永不掉线”。
    三级模型路由：
    - Primary Model（主模型）：默认的首选大脑（如 anthropic/claude-3-5-sonnet）。
    - Fallbacks（降级列表）：当主模型遇到错误、欠费或触发速率限制时，系统按顺序自动切换到后续模型。
    - Provider Auth Failover（供应商内轮询）：如果同一供应商（如 OpenAI）配置了多个账号，系统会在切换模型前先尝试轮询不同的账户。
- 供应商全图谱。OpenClaw 采取“模型中立”策略，官方已深度适配了数十家主流及垂直领域的模型供应商。
    - 主流闭源： Anthropic (Claude 3.5/Opus)、OpenAI (GPT-4o/Codex)、Google (Gemini)。
    - 国产大模型： Moonshot AI (Kimi)、MiniMax、GLM (智谱)、Qianfan (百度千帆)、Mistral。
    - 本地与开源： Ollama 和 vLLM（用于本地运行 Llama 3 等模型）、Hugging Face。
    - 聚合网关： LiteLLM (统一网关)、OpenRouter (可一键接入数百种模型)、Vercel AI Gateway。
    - 隐私优先推荐： 官方推荐使用 Venice AI，支持隐私保护的推理。
- 实时交互能力。用户无需重启服务即可在对话中动态切换模型、查看模型状态，进行实时管理模型。

### Tools 与 Skills（行动层）
**Tools 是原子的执行力（手脚），而 Skills 是复合的专业知识（职业技能）。**

#### Tools 底层的“原子”能力
核心特征：
- 原子性：一个 Tools 通常只做一件事。
- 权限驱动：Tool 的开启与否直接决定了 Agent 的风险等级。

四大核心工具集：

- File Tools：read（读）、write（写）、edit（局部编辑）、ls（列出文件）。
- System Tools：bash 或 shell（执行命令）。这是最强大的工具，允许 Agent 安装软件、编译代码或部署服务。
- Web Tools：基于 Playwright，提供 Maps、click、screenshot、type 等模拟人类浏览器的行为。
- Interaction Tools：AskUser。当 Agent 遇到不确定或危险操作时，主动请求人类确认。

Web Tools：OpenClaw 的 Web 工具箱底层深度集成了 Playwright（由微软开发的浏览器自动化库），它能处理复杂的 JavaScript 渲染、单页应用（SPA）以及动态加载的内容，而不是简单的静态 HTML 抓取。它拥有自主导航、模拟人类交互、视觉理解与截图、结构化内容提取、会话与身份保持等能力。

#### Skills 高层的“复合”套件。
定义：Skills 是对 Tools 的高级封装和逻辑组合。一个 Skill 往往包含了一组指令、特定的提示词（Prompt）以及对多个 Tool 的调用逻辑。

核心特征：
- 场景化：Skill 是为了解决特定任务而生的（如“管理 GitHub 仓库”或“整理 Obsidian 笔记”）。
- 模块化：可以像插拔 U 盘一样随时为 Agent 增加或删除某项技能。
- 易扩展性：用户通过编写一个 Markdown 文件（通常是 SKILL.md）就能定义一个新技能。

### Gateway（OpenClaw核心网关）—— 常驻守护进程（daemon）
定义：作为 OpenClaw 架构的核心枢纽与**唯一通信入口**，Gateway 承担着 “交通指挥官” 的关键角色。它通过本地运行的 API 服务器（默认端口 18789），高效连接用户端 (Channels)、大模型 (Models) 与后端执行环境 (Agents/Workspace)，并将复杂的 Agent 操作封装为标准化的 HTTP 和 WebSocket 接口。所有外部请求（包括 Telegram Bot、Web Dashboard 及自定义脚本）均需经由 Gateway 处理，其独特能力在于将异步的 Agent 思考过程转化为可订阅的实时数据流，实现类似 ChatGPT 网页版的逐字输出效果。

消息来源（WhatsApp / Telegram / Discord / Signal / WebChat...）
         ↓
    [Gateway Daemon]  ←→  WebSocket
         ↓
    [Agent Runtime]  ←  模型推理 + 工具调用
         ↓
    回复发送回消息来源
Gateway 通过 WebSocket（默认端口 18789） 对外提供服务。所有客户端（macOS App、Web UI、CLI、手机 Node）都通过 WS 连接到它——不是 HTTP REST，而是持久长连接。

#### Agent Runtime -- 真正干活的地方
工作流程是一个循环（Agent Loop）：

收到消息
  → 组装 System Prompt（含 workspace 文件 + skills）
  → 调用模型（LLM）
  → 模型返回工具调用 → 执行工具 → 结果喂回模型
  → 模型返回文本 → 发送回复
  → 写入 Session 记录（JSONL）
关键点：每个 session 的 runs 是**串行**（同一个 Agent 的会话（session）一次只处理一个“事件/请求”，不并行、按顺序执行）的，防止并发冲突。

#### 核心能力
- 安全防护。Gateway强制要求所有请求携带 Bearer Token，有效防止公网暴露导致的未授权访问。OAuth 托管服务统一管理第三方服务（如 Google Calendar、GitHub）的授权凭证，确保工具调用的合法性。
- 智能路由系统。根据 agentId 参数将请求定向至对应 Workspace 及会话。并智能协调后台进程资源，优化高并发场景下的处理效率。
- 可视化管理系统。可通过 Web 界面直观展示运行中的 Agent 状态、Token 消耗及工具执行情况。内置 Playground 功能，支持网页端直接测试 Agent
- 响应。
- 持久化服务。自动加载磁盘存储的会话历史并注入模型。在网络中断时保持后台运行，重连后自动推送中断期间的执行进度。
- 跨平台适配。将 Slack、Discord 等异构平台的数据格式统一转换为 OpenClaw 标准 Message 对象。

### Daemon（守护进程）
定义： 让 Agent 具备“主动性”和“稳定性”的后台管理器，它**保障了 Agent Loop 的持久性**，使得“自动化监控”、“定时报告”和“长流程任务”成为可能。
- **24/7 的“维生系统”**。在 OpenClaw 中，Daemon 不是一个单一的组件，而是指通过后台**静默运行的 Gateway 进程**。它解决了 AI 运行的两个痛点：
    - **脱离终端**： 即使你关闭了终端程序或浏览器，智能体依然在后台处理任务。
    - **主动性**： 智能体不再是被动等待指令，而是可以基于时间或事件“主动”开始思考。

- **Daemon 与 Agent Loop 的结合**。智能体在执行任务时会进入一个“思考-行动-观察”的死循环。Daemon 为这个循环提供了持续的生命力。
    - **会话保持** ： Daemon 负责维护会话状态。即使网络中断，当 Channel 重新连接时，Daemon 能确保 Agent Loop 从中断的点继续，而不是重启；
    - **资源锁管理**： 在循环执行长耗时任务（如：抓取 100 个网页）时，Daemon 确保工作空间（Workspace）不会被并发任务冲突破坏。
- **心跳机制**。这是 Daemon 最具代表性的功能。 Daemon 会定期“唤醒” Agent，它会向 Agent 发送一个内部信号，触发 Agent 阅读 Workspace 中的 HEARTBEAT.md。例如Agent 会自检：“我昨天答应老板的报告发了吗？”或“监控的那个网页有更新吗？”

- **自动恢复与自愈**。
    - 进程守护： 如果 Gateway 因为内存溢出或网络波动崩溃，Daemon 会尝试自动拉起；
    - 状态对齐： 重启后，它会扫描未完成的 Command Queue（命令队列），确保重要的异步任务（如自动化部署）不会因为程序崩溃而夭折。

- **任务调度**。Daemon 赋予了 Agent 时间感，支持标准的 Cron 表达式（如 0 9 * * *）。例如每天早上 9 点，Daemon 准时启动 Agent Loop，让 Agent 去看新闻、总结邮件，并在 Channel 里给你发简报。

### Channels（通信渠道）
定义：OpenClaw的**交互渠道**，Channels模块让 OpenClaw 摆脱了“浏览器插件”或“本地终端”的局限。 它让 Agent 变成了一个随时随地可以被召唤的数字员工。无论你是在排队、开车（通过语音控制 iMessage/WhatsApp），还是在群聊里开会，都可以直接通过自然语言调动 Agent 在 Workspace 里的所有技能。
- 能力定位-全渠道接入。Channels 负责将外部通讯平台的协议（如 Telegram 的 Bot API、Slack 的 Webhook）转化为 OpenClaw 内部的标准消息格式。
    - 多端联动：同一个 Agent 可以同时挂载到 Telegram、Slack、Discord 等多个渠道。
    - 统一入口：无论你在哪里发指令，Agent 接收到的上下文是一致的。
- 丰富平台矩阵。OpenClaw 提供了丰富的预置渠道支持：
    - 主流社交/极客平台：Telegram (Bot API)、Discord (Bot)、Slack (App)。
    - 国内生产力工具：飞书 (Lark)、钉钉 (DingTalk) —— 通常通过 Webhook 或 Gateway 适配器接入。
    - 高阶/个人渠道：WhatsApp (通过 Twilio 或 Matrix)、iMessage (Apple 专用)、甚至简单的 HTTP Webhook。
- 身份与权限认证。Channels 不仅仅是传输消息，它还负责“安保”工作：
    - 白名单机制：你可以通过配置 allowed_users，限制只有特定的 Telegram ID 或飞书用户才能给 Agent 下指令，防止 AI 被外部滥用。
    - 身份映射：Channel 会自动识别发送者，并将其与 Workspace 中的 USER.md 关联，让 Agent 知道“正在跟我说话的是老板还是访客”。
- 智能路由。这是 Channels 最强大的地方。你可以通过 Gateway 配置路由规则：
    - 指定分配：例如来自“运维群”的消息自动路由给“运维 Agent”，来自“私人私聊”的消息路由给“生活秘书 Agent”。
    - 负载均衡：在多实例部署时，确保消息能准确投递到活跃的 Agent 进程。
- 实时交互与流式传输。支持像 ChatGPT 网页版那样的“逐字蹦出”效果（需平台 API 支持，如 Telegram/Slack），提升用户交互体验。
    - 主动推送 ：Agent 不仅能被动回答，还能通过 Daemon 触发，主动在 Channel 里给你发消息（如：监控到股价波动，自动在飞书群里报警）。

### Platforms
- 定义： 决定了 Agent 如何在不同的操作系统环境（OS）中“安家”。它为智能体提供了运行所需的底层执行环境和硬件资源访问接口。
- 作用：确保了同样的指令（如“查看磁盘空间”或“运行 Python 脚本”）能够在不同操作系统上准确执行。
- 跨平台支持：macOS、Linux、Windows
- 环境感知：Agent 会自动识别当前运行的平台，并调整其工具调用逻辑
- 三大执行模式（Runtime Modes）

根据安全与便捷需求，提供不同级别的环境隔离：
    - Host Mode (宿主机)：直接运行。性能最强，可调用本地软件和外设，但安全性较低。
    - Docker Mode (容器)：完全隔离。在独立容器中运行，是处理高风险代码或爬虫的首选。
    - Cloud / Remote (远程)：通过 SSH 在云端执行。适合处理编译、大数据等重型任务。

- 核心能力特性：
    - 桌面集成：支持剪贴板读写、多媒体控制（音量/亮度）及原生应用（如 VS Code）唤起。
    - 资源与环境管理：实时监控 CPU/内存占用，安全托管并注入环境变量用于身份验证。
    - 权限沙盒：精细化定义挂载点（Mounts）和运行用户身份（User Identity），实现权限最小化。

### 实践案例
把 OpenClaw 当成一家公司来设计。**入口→规划→执行→监控→出口**
消息转发 Agent，前台总机。(所有消息从这里进来，所有结果从这里出去)
｜
｜
粗粒度任务拆解 Agent，VP 级别：接收到任务后先判断复杂度。简单任务直接拆成两部分：代码实现交给 Code Agent，调研执行交给 Work Agent。复杂任务先做粗粒度拆分，再交给下一级去细化。每一次拆解都必须落实到文档——写清楚要做什么、怎么做、预期产出是什么，然后把文档路径和摘要一起交出去。
｜
｜
细粒度任务拆解 Agent，项目经理级别。 接收粗粒度的任务列表后，把每一项拆到可执行的粒度。代码部分要写出详细的设计文档，调研部分要列出具体的步骤和工具使用方案。同样，一切落实到文档。
|
|
Code Agent，程序员。 拿到详细设计文档后，严格按照文档实现。注意，是"严格按照"，不是"自由发挥"。如果你不约束它，它会按自己的理解乱来。交付物可能是代码、文档或者需要部署的 Demo，但必须是文档里明确要求的东西。
|
|
Work Agent，调研员。 拿到规划文档后，按步骤执行各类非代码任务：搜索信息、操作浏览器、整理资料、生成报告。该用什么 Skill 就用什么 Skill。
|
|
Monitor Agent，PMO。 整个闭环里最容易被忽略但最关键的角色。它通过定时任务，定期检查所有 Agent 的产出文档，读取并形成摘要，判断任务完成进度，然后把简报发给消息转发 Agent。没有监控，就没有闭环。

**一切皆文档** -- 每一次任务拆解、每一个执行计划、每一份产出结果，都写成文档，存在明确的路径下。
**Monitor 是灵魂** -- 通过 HEARTBEAT.MD 里配置的定时任务，周期性地去检查各个 Agent 的产出文档。把检查结果汇总成简报，通过消息转发 Agent 发给你。

#### 五个文档
AGENT.MD，组织架构图。 定义有哪些 Agent、每个 Agent 的职责是什么、它们之间怎么协作。写得越清晰，Agent 之间的协作就越顺畅。

SOUL.MD，企业文化和行为准则。 定义 Agent 的行为风格、决策原则、底线约束。比如"遇到不确定的情况，先产出文档记录问题，再请求人工介入"，比如"所有产出必须有明确的文件路径"，比如"禁止只说不做"。这些看起来很"软"的东西，实际上决定了 Agent 在边界情况下的表现。

TOOLS.MD，工具清单和使用规范。 定义 Agent 可以用哪些工具、怎么用、什么场景用什么工具。OpenClaw 的 tool profiles 和 allow/deny 列表，说白了就是权限管理——不是所有 Agent 都需要所有工具，该限制的要限制。

IDENTITY.MD，岗位说明书。 每个 Agent 的身份定义、能力边界、交付标准。Code Agent 就是写代码的，别让它去做调研；Work Agent 就是做调研的，别让它去写代码。专业分工是效率的基础，这个道理在哪儿都一样。

HEARTBEAT.MD，考勤和监控制度。 定义定时任务的频率、检查的内容、简报的格式。这是整个闭环能自动运转的关键配置。没有心跳，系统就是死的。

善用：sub-Agent，大任务使用秒回+subagents 处理

## 如何实现定时任务
### 1. Heartbeat（心跳轮询）
最简单的方式。OpenClaw 按固定间隔（比如每30分钟）向我发一条特定消息：`Read HEARTBEAT.md if it exists. Follow it strictly...`
我收到后读 HEARTBEAT.md，看看有没有需要处理的任务。有就干，没有就回 HEARTBEAT_OK。

本质：外部 cron → 发消息给我 → 我处理

缺点：时间精度差，依赖消息到达，不适合"9点整"这种精确场景。
`HEARTBEAT.md` 作用：轮询任务表，定时轮询完成文件里面的任务

### 2. Cron Job（真正的定时任务）
通过 daxiang-scheduled-message skill 或 OpenClaw 内置的 cron 系统创建。

底层是标准的 cron 表达式，由 OpenClaw Gateway 托管执行：

┌─────────── 分
│ ┌───────── 时
│ │ ┌─────── 日
│ │ │ ┌───── 月
│ │ │ │ ┌─── 周
0 9 * * 1   # 每周一9点
触发时，Gateway 直接调度一个独立 sub-agent session 来执行任务，不依赖主 session 是否活跃。

两者对比

| 维度 | Heartbeat（心跳轮询） | Cron Job（定时任务） |
|------|----------------------|----------------------|
| 精度 | 低（~30min漂移） | 高（精确到分钟） |
| 隔离性 | 在主 session 内 | 独立 sub-agent session |
| 适合场景 | 批量周期检查 | 精确时间提醒 / 推送 |
| 上下文 | 有主 session 历史 | 无历史（干净） |

执行链路
~/.openclaw/cron/jobs.json   ← 持久化存储
        ↓ Gateway 读取 （OpenClaw Gateway会一直在，到时间cron触发）
内存调度器（node-cron 之类）  ← 常驻计时
        ↓ 到点
spawn sub-agent session      ← 按需实例化
        ↓
执行任务 → 推送消息 → 销毁（不影响主 session）

Session 管理
每条对话链对应一个 session key，格式如：

agent:main:main（主 session）
agent:main:telegram:dm:123456（Telegram 某用户的独立 session）
cron:job-id（定时任务）
对话历史存为 JSONL 文件，路径：

~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl
Session 默认每天凌晨 4 点重置（新的 context window），可配置。

🧠 Memory 系统
记忆分两层：

短期：memory/YYYY-MM-DD.md，每天的流水账
长期：MEMORY.md，精华提炼
检索靠两个工具：

memory_search：语义向量搜索（支持 BM25 混合检索 + 时间衰减）
memory_get：精确读取某文件的某几行
接近 context 上限时，Gateway 会触发一次静默记忆刷新——让 Agent 悄悄把重要内容写进文件，然后压缩 context。

🔌 Skills 系统
Skills 是"插件化的工作流"，本质是 Markdown 文件（SKILL.md），里面写着"遇到 X 任务时，按这个步骤做"。Agent 的 System Prompt 里会列出所有可用 skill 的描述，遇到匹配任务时先读 SKILL.md 再执行。

Skills 加载优先级：workspace > ~/.openclaw/skills > 内置 bundled。

🌐 多 Agent 与消息路由
一个 Gateway 可以跑多个 Agent，靠 bindings 规则路由：

WhatsApp 某号码 → Agent A (家庭助理)
Telegram       → Agent B (工作助理)
Discord 某频道  → Agent C (编程助理)
路由优先级：精确 peer 匹配 > guild/team 匹配 > channel 匹配 > 默认 fallback。

🔄 总结一张图
用户发消息
    ↓
Gateway (WebSocket daemon)
    ↓ 路由 bindings
Agent Runtime
    ├── 加载 workspace 文件 → System Prompt
    ├── 加载 skills
    ├── 调用 LLM (模型)
    │     ├── 工具调用循环
    │     └── 最终文本输出
    ├── 写 session JSONL
    └── 发回消息