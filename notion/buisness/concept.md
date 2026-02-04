# Agent工作流程及相关AI概念

## AI 相关的概念

### LLM（大语言模型）—— 大脑

- 基于海量数据训练的深度学习模型，本质是概率预测引擎。
- 它们通过在海量文本数据上进行训练，学习自然语言的规律、结构和知识，能够理解、总结、翻译、预测和生成复杂的文本内容，如聊天机器人（ChatGPT）、内容创作和代码编写。
- 在 Agent 架构中，应选择推理能力强且支持长上下文（Long Context）的模型。Agent 的中央处理器（CPU），负责逻辑推理与意图识别。

### Token

- 模型处理文本的最小单位，决定了处理成本和信息的精细度
- 通过精简提示词或压缩历史记录来优化 Token 消耗。

### Context & Memory (上下文与记忆)

- AI 当前的“短期记忆”，当前交互相关的背景内容。LLM 是无状态的，Context 的大小决定了当前能处理多少信息（受限于 Context Window）。
- Context Window 上下文窗口越大，模型能够考虑的信息就越多，生成的回答也就越相关和连贯。
- 解释：Context 是当前对话的即时窗口；Memory 是存储并检索历史信息的能力。
- 理解：Context 是短期工作内存（掉电即失），而 Memory（通过数据库实现）是长期记忆。
- 最佳实践：定期总结对话要点并存入长期记忆，防止 Agent “失忆”，同时防止超出context window限制

### RAG & 向量存储 (Vector Store)

- 解释：RAG 是通过检索外部知识来增强生成效果的技术；向量存储是将文本转化为数学坐标（向量）并计算相似度的数据库。
- 理解：这是给 Agent 准备的**“外部知识库”或“开卷考试资料”**。
- 最佳实践：对原始文档进行合理的切片（Chunking），确保检索到的片段语义完整，避免“断章取义”。

#### RAG 数据处理逻辑

基于检索到的数据生成响应，并确保内容有据可依。

- 切片 (Chunking)：将长文档拆成有语义的小块。用向量表示用户查询编码。
- 向量化 (Embedding)：将文字转化为数字坐标（向量），存入向量存储。
- 检索 (Retrieval)：当用户提问时，寻找坐标最接近的知识块并喂给 LLM。
- 最佳实践：切片时保留一定的重叠（Overlap），确保上下文不丢失。

### 系统提示词 vs. 普通提示词 (规则与任务)
1. 系统提示词 (System Prompt)：“员工手册”。定义角色（你是谁）、准则（不能做什么）和格式。

2. 普通提示词 (User Prompt)：“具体指令”。交代当前要完成的具体任务。

3. AI rules：嵌入在系统提示词 (System Prompt) 中的约束集合
    - 解释：规定模型在特定场景下的行为边界、道德标准、处理逻辑以及输出规范。
    - 构成：通常包含运行指令（Operating Instructions）、禁令（Negative Constraints）和格式规范（Formatting Requirements）。
    - 最佳实践：
        1. 给出最佳实践和错误示范
        2. 使用肯定句，内容简洁
        3. 定义优先级排序，rules的优先级高于用户
        4. 给出示例
    - 在执行 Plan（规划） 和 Action（执行） 阶段，Agent 会不断对照 Rules 检查自己的计划是否违规。

最佳实践：在系统提示词中强制约束输出格式（如 JSON），方便程序解析。

### Tools & Skills & MCP

- 解释：Tools 是外部 API；Skills 是封装好的逻辑；MCP (Model Context Protocol) 是连接模型与数据的通用标准协议。
- 理解：它们是 Agent 的**“手脚”**。没有工具，Agent 只能空谈；有了工具，它能查天气、订机票、写代码。
- 最佳实践：遵循 MCP 协议来构建工具，使你的工具可以在不同的 Agent 框架（如 Claude Desktop 或自定义系统）中无缝复用。

### Agent 的标准工作流程 (Workflow)

一个成熟的 Agent 并不是简单地问答，而是遵循以下闭环路径：

1. 感知与拆解 (Perception & Planning)
    - 接收到模糊指令（如“帮我写一份行业报告并发送邮件”）。
    - LLM 将其拆解为子任务：检索资料、整理大纲、生成内容、调用邮件接口。

2. 检索与召回 (Retrieval)

    - Agent 访问 RAG 知识库，搜索相关的私有数据或最新资讯，扩充当前 Context。

3. 行动与执行 (Action)

    - Agent 判断需要调用哪些 Tools。
    - 通过 MCP 或 API 发送请求，获取执行结果（如读取文件、运行 Python 脚本）。

4. 反思与迭代 (Self-Reflection)

    -  检查工具返回的结果是否符合预期。
    - 如果报错或信息不足，重新规划路径，直到得出最终答案。

5. 响应与归档 (Response & Archiving)

    - 将最终结果反馈给用户。
    - 将关键信息存入 Memory，为下一次任务做准备。

### 总结：Agent = LLM + 规划 + 记忆 + 工具调用

理解了这些名词，你就掌握了构建 AI 应用的底层逻辑。Agent 的强大不在于模型本身知道多少知识，而在于它能像人类一样，利用工具和搜索去解决边界之外的问题。

## MCP 的工作流程及其相关概念
### MCP Server
- 定义：提供工具和资源的服务程序
- 职责：
    - ✅ 定义和注册工具（tools）
    - ✅ 定义和提供资源（resources）
    - ✅ 处理来自 Client 的请求
    - ✅ 返回工具执行结果
- 通信方式：
    - Stdio - 标准输入输出（最常用，本地通信）
    - SSE - Server Sent Events（HTTP 单向推送）
    - WebSocket - 双向长连接

### MCP Client
- 定义：连接并调用 MCP Server 的程序
- 职责：
    - 发送请求给 Server
    - 接受 Server 的响应
    - 为 Host 提供工具接口

### MCP Host
- 定义：集成 MCP Client 的应用程序，最终用户使用的界面
- 职责：
    - ✅ 在宿主应用中展示 MCP Server 的工具
    - ✅ 创建 MCP Client 实例
    - ✅ 管理多个 Server 的连接
    - ✅ 提供 UI 交互界面给用户
    - ✅ 处理 Client 和 Server 的通信

### 通信流程

``` plain text
步骤 1: 启动阶段
═══════════════════════════════════════════════════════════
┌─────────────────┐
│  Cursor IDE     │
│  (MCP Host)     │
└────────┬────────┘
         │ 读取配置: mcp-coding 的启动命令
         ▼
┌─────────────────────────────────────────────────┐
│  Cursor 内的 MCP Client #1                     │
│  (client/mcp-coding)                           │
└────────┬────────────────────────────────────────┘
         │ 执行命令: node /path/to/mcp-coding/es/index.js
         │
         ▼
┌─────────────────────────────────────────────────┐
│  你的 MCP Server                               │
│  (@finfe/mcp-coding)                           │
│                                                 │
│  - 初始化工具                                   │
│  - 注册 get_component_detail 等                │
│  - 连接 StdioServerTransport                   │
└─────────────────────────────────────────────────┘


步骤 2: Client 获取工具信息
═══════════════════════════════════════════════════════════
Cursor MCP Client                Server
       │                          │
       ├─────────────────────────>│
       │  tools/list              │
       │  获取可用工具列表         │
       │                          │
       │<─────────────────────────┤
       │                          │
       │ 返回工具列表              │
       │ [                         │
       │   {name: 'get_component_detail', ...},
       │   {name: 'list_components', ...},
       │   ...                     │
       │ ]                         │
       │                          │


步骤 3: 用户在 Cursor 中调用工具
═══════════════════════════════════════════════════════════
用户输入: "@mcp_tool_mcp-coding_get_component_detail components:['Button']"
   │
   ▼
Cursor IDE 识别这是 MCP 工具调用
   │
   ▼
Cursor MCP Client                Server
       │                          │
       ├─────────────────────────>│
       │  tools/call              │
       │  {                        │
       │    "name": "get_component_detail",
       │    "arguments": {          │
       │      "components": ["Button"]
       │    }                      │
       │  }                        │
       │                          │
       │  (等待处理...)            │
       │                          │ 执行 exec() 中的处理函数
       │                          │ 读取知识库文件
       │                          │ 返回格式化结果
       │                          │
       │<─────────────────────────┤
       │                          │
       │ 返回结果                  │
       │ {                         │
       │   "content": [{           │
       │     "type": "text",       │
       │     "text": "# Button\n..." │
       │   }]                      │
       │ }                         │
       │                          │
   ▼
Cursor IDE 展示结果给用户
```