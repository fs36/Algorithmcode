## 代码架构
``` plain text
mcp-coding/
├── src/                          ← 源代码
│   ├── index.ts                  ← 🔴 核心：MCP Server 入口
│   ├── types/
│   │   ├── beetle.ts             ← 🟡 工具接口定义
│   │   └── external.d.ts         ← 第三方类型声明
│   ├── utils/
│   │   ├── file.ts               ← 🟡 知识库文件读取
│   │   └── papi.ts               ← 🟡 PAPI 数据提取
│   └── Beetle/
│       ├── getComponentDetail.ts ← 🟢 工具实现
│       ├── getComponentList.ts   ← 🟢 工具实现
│       └── getWorkFlowTool.ts    ← 🟢 工具实现
├── scripts/                       ← 📦 构建脚本
│   ├── buildLLM.js               ← 提取组件文档
│   ├── buildComponentList.js     ← 生成组件列表
│   └── buildWhenToUse.js         ← 生成使用指南
├── knowledge/                     ← 💾 知识库
│   ├── LLM/                      ← 组件文档
│   ├── whenToUse/                ← 使用指南
│   └── componentList.md          ← 组件列表
└── package.json
```
### 搭建 MCP 的步骤
1. 定义工具类型 
2. 创建具体的工具
3. 创建 MCP 服务器
4. package.json 配置
### types
####  beetle.ts - Tool 接口
``` TS
export interface Tool<T = unknown> {
  name: string; // 工具唯一标识符（AI 调用时用这个名字）
  description: string; // 工具描述（AI 用来判断是否使用此工具）

  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  ctx?(): any; // 可选初始化函数，注册前执行（验证环境变量等）
  exec(server: any, opts: { ctx: T; name: string; description: string }): Promise<void> | void; // 必须的注册函数，在 server 上注册工具 exec(server, opts)
}
```

#### external.d.ts - 第三方类型
`declare module '@babel/parser';`
是 TypeScript 类型声明文件，告诉 TypeScript @babel/parser 模块存在（即使没有类型定义）。解决 TypeScript 类型问题

### Utils
#### file.ts 知识库文件读取
``` TS
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// // 在 ES 模块中获取 __dirname 的等效值
const __filename = fileURLToPath(import.meta.url); // 将文件的 URL（import.meta.url）转换为文件路径（__filename）
const __dirname = path.dirname(__filename); // 获取当前文件所在的目录 __dirname

// // 计算知识库目录路径
const KNOWLEDGE_DIR = path.join(__dirname, '../..', 'knowledge'); // 使用 path.join 拼接文件路径，指向项目根目录下的 knowledge 文件夹。

/**
 * 读取知识库文件，支持降级处理
 * @param filePath 文件路径，例如 'LLM/BeTable.md' 或 'LLM/Table.md'
 * @returns 文件内容，如果文件不存在返回空字符串
 *
 * 降级逻辑：
 * 1. 如果用户传入 BeXxx，直接匹配 BeXxx.md
 * 2. 如果 BeXxx.md 不存在，尝试匹配 Xxx.md（去掉 Be 前缀）
 * 3. 如果用户传入 Xxx，先匹配 Xxx.md
 * 4. 如果 Xxx.md 不存在，尝试匹配 BeXxx.md（添加 Be 前缀）
 */
export const readKnowledge = (filePath: string) => {
  const fullPath = path.join(KNOWLEDGE_DIR, filePath);

  // 首先尝试直接读取
  try {
    // 建议使用异步版本的 fs.readFile 来提高性能。
    const content = fs.readFileSync(fullPath, 'utf-8'); // fs.readFileSync 是同步地读取文件内容 意味着在文件读取完成之前，代码不会继续执行
    return content;
  } catch (error) {
    // 如果直接读取失败，尝试降级处理
  }

  // 解析文件路径，提取目录和文件名
  const dir = path.dirname(filePath);
  const fileName = path.basename(filePath, '.md');

  // 情况1：如果文件名以 Be 开头，尝试去掉 Be 前缀
  if (fileName.startsWith('Be')) {
    const withoutBePrefix = fileName.substring(2);
    const fallbackPath = path.join(KNOWLEDGE_DIR, dir, `${withoutBePrefix}.md`);
    try {
      const content = fs.readFileSync(fallbackPath, 'utf-8');
      return content;
    } catch (error) {
      return '';
    }
  }

  // 情况2：如果文件名不以 Be 开头，尝试添加 Be 前缀
  const beFileName = `Be${fileName}`;
  const fallbackPath = path.join(KNOWLEDGE_DIR, dir, `${beFileName}.md`);

  try {
    const content = fs.readFileSync(fallbackPath, 'utf-8');
    return content;
  } catch (error) {
    return '';
  }
};

export const getStructuration = () => {
  const fullPath = path.join(__dirname, '../../Agent/instruction.md');
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    return content;
  } catch (error) {
    return '';
  }
};

```
### Beetle 工具实现
#### getComponentList.ts - 组件列表工具
``` TS
import type { Tool } from '../types/beetle.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// componentList.md 文件路径
const componentListPath = path.resolve(__dirname, '../../knowledge/componentList.md');

export const getComponentListTool: Tool = {
  name: 'list_components',
  description:
    'List all available components in Beetle UI. This tool retrieves the complete component list with descriptions from the knowledge base.',
  exec(server, { name, description }) {
    server.tool(name, description, {}, async () => {
      try {
        // 读取 componentList.md 文件
        const content = await fs.readFile(componentListPath, 'utf-8');

        return {
          content: [
            {
              type: 'text',
              text: content,
            },
          ],
        };
      } catch (error) {
        // 如果文件不存在或读取失败，返回错误信息
        return {
          content: [
            {
              type: 'text',
              text: `Error reading component list: ${error.message}`,
            },
          ],
        };
      }
    });
  },
};

```

#### getComponentDetail.ts
``` TS
import { z } from 'zod';
import { readKnowledge } from '../utils/file.js';

import type { Tool } from '../types/beetle.js';

export const getComponentDetail: Tool<{ componentList: { component: string; desc: string }[] }> = {
  name: 'get_component_detail',
  description:
    'Retrieve comprehensive component information including both interface declarations and example code for Beetle UI components. This tool provides complete component documentation with type definitions, props, events, and practical implementation examples.',
  async ctx() {},
  exec(server, { name, description }) {
    server.tool(
      name,
      description,
      {
        components: z
          .array(z.string()) // 定义参数类型（字符串数组）
          .describe('The name of the Beetle UI components to get detailed information for'), // 提供参数描述（给 AI）
      },
      async ({ components }: { components: string[] }) => { // 处理函数
        try {
          // 确定要处理的组件列表
          let componentsToProcess: string[] = [];

          if (components && components.length > 0) {
            // 如果提供了components数组，使用数组中的组件
            componentsToProcess = components;
          } else {
            // 如果都没有提供，返回错误
            return {
              content: [
                {
                  type: 'text',
                  text: 'The "components" parameter must be provided',
                },
              ],
            };
          }

          let resultText = '';

          // 循环处理每个组件
          for (const comp of componentsToProcess) {
            try {
              resultText += `# ${comp}\n\n`;

              // 获取示例代码
              try {
                const exampleText = await readKnowledge(`LLM/${comp}.md`);
                if (exampleText) {
                  resultText += `\n\n${exampleText}\n\n`;
                } else {
                  resultText += `## Example Code\n\nNo example code found for component ${comp}\n\n`;
                }
              } catch (exampleError) {
                resultText += `## Example Code\n\nFailed to fetch example for component ${comp}: ${exampleError instanceof Error ? exampleError.message : 'Unknown error'}\n\n`;
              }

              resultText += '---\n\n';
            } catch (error) {
              resultText += `# ${comp}\n\nFailed to process component ${comp}: ${error instanceof Error ? error.message : 'Unknown error'}\n\n---\n\n`;
            }
          }

          // 所有 MCP 工具返回的格式必须是这个
          return {
            content: [
              {
                type: 'text',
                text: resultText,
              },
            ],
          };
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Failed to fetch component details: ${error instanceof Error ? error.message : 'Unknown error'}`,
              },
            ],
          };
        }
      },
    );
  },
};

```

##### Zod 库
- 定义：一个 TypeScript 优先的数据验证库，用于在运行时验证数据结构。
问题： TS 只在编译时检查，不在运行时
解决：Zod 在运行时检查
Zod 的其他特性
``` TS
// 1. 基础类型验证
z.string()           // 字符串
z.number()           // 数字
z.boolean()          // 布尔值
z.date()             // 日期

// 2. 复杂验证
z.string().email()              // 邮箱格式
z.string().min(5).max(20)       // 长度限制
z.number().positive()           // 正数
z.array(z.string())             // 字符串数组
z.object({ name: z.string() })  // 对象结构

// 3. 条件验证
z.union([z.string(), z.number()])  // 字符串或数字
z.optional(z.string())             // 可选
z.string().default('hello')        // 默认值

// 4. 自定义验证
z.string().refine((val) => val.length > 0, {
  message: '字符串不能为空'
})

// 5. 获取验证错误
try {
  schema.parse(data);
} catch (error) {
  console.log(error.issues);  // 详细错误信息
  // [
  //   { path: ['components', 0], message: 'Expected string' },
  //   { path: ['components', 1], message: 'Expected string' }
  // ]
}
```

#### getWorkFlowTool.ts - 工作流工具
功能：显示 Beetle UI 组件开发的完整工作流
9个步骤流程：
  1. 用户输入需求
  2. 展示工作流
  3. 获取组件列表 (list_components)
  4. 用户确认组件选择
  5. 获取组件详情 (get_component_detail)
  6. API 集成 (get_papi_detail)
  7. 生成实现方案
  8. 生成代码 (需要用户确认文件位置)
  9. Playwright 自动化测试
``` TS
import type { Tool } from '../types/beetle.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// componentList.md 文件路径
const componentListPath = path.resolve(__dirname, '../../knowledge/componentList.md');

export const getWorkFlowTool: Tool = {
  name: 'work_flow',
  description:
    'Display the complete workflow for Beetle UI component development. This tool shows the step-by-step process for requirements analysis, component selection, API integration, and testing.',
  exec(server, { name, description }) {
    server.tool(name, description, {}, async () => {
      try {
        // 读取 componentList.md 文件
        const componentListContent = await fs.readFile(componentListPath, 'utf-8');

        // Define AI-friendly workflow format
        const workflow = {
          steps: [
            {
              step: 1,
              action: 'User Input Requirement',
              description: 'User provides specific requirement description or wiki content',
            },
            {
              step: 2,
              action: 'Display Workflow',
              description: 'Show the user the code generation steps and execute them strictly',
            },
            {
              step: 3,
              action: 'Get Component List',
              description: 'Call list_components to get simple descriptions of all components',
            },
            {
              step: 4,
              action: 'Component Confirmation',
              description:
                'Confirm which components to use based on descriptions. DO NOT execute the following steps until the user confirms the components. Wait for explicit user confirmation before proceeding.',
            },
            {
              step: 5,
              action: 'Get Component Details',
              description:
                'Call get_component_example and get_component_interface to get specific usage methods for the corresponding components. ALWAYS use the components parameter (not component) when calling these tools, even for single components. This ensures consistent parameter handling.',
            },
            {
              step: 6,
              action: 'API Integration',
              description:
                "Ask the user for the PAPI link that contains both projectId and apiId (both are REQUIRED parameters), and ask the user to provide ALL URL paths at once. Extract projectId from the segment after /project/ and apiId from the query param apiId (e.g., @https://a.sankuai.com/index/#/papi/project/016ef3a3-9c8b-4b01-82eb-483e508ed038?apiId=a0df5a16-25ea-45f5-a0c5-2c3d63cb7fb0&category=%E7%BB%93%E7%AE%97%E9%9C%80%E6%B1%82). Then call get_papi_detail with { projectId, apiId, paths } where paths is a string containing ALL URL paths separated by commas. CRITICAL: The user will provide ALL paths in one message, and AI MUST concatenate ALL paths into a single comma-separated string in ONE call (e.g., '/api/fund/foreignExchange/solution/fund/apply,/api/fund/foreignExchange/solution/fund/detail'). DO NOT make multiple calls for different paths.",
            },
            {
              step: 7,
              action: 'Generate Implementation',
              description:
                'Based on the obtained component information, generate the corresponding code implementation',
            },
            {
              step: 8,
              action: 'Generate Code',
              description:
                'Generate initial code implementation based on component information. IMPORTANT: Before generating code, confirm with the user which file to write to. DO NOT automatically create new files without explicit user confirmation.',
            },
            {
              step: 9,
              action: 'Automated Testing with Playwright',
              description:
                'After code generation, use Playwright for end-to-end testing, divided into four steps:\n\n1. Get Test Cases: Ask the user to provide ONES test case address (e.g., @https://ones.sankuai.com/ones/product/5307/case/testplan/4650661/planning?testroundId=4650662), extract projectId from the segment after /product/ and testRoundId from the testroundId query parameter, then call get_test_data to obtain test case information.\n\n2. AI Classification of Test Functions: Based on the obtained test cases, AI intelligently classifies test functions into key categories including: user interaction testing, form submission testing, data validation testing, UI component functionality testing, etc., ensuring coverage of main workflows. IMPORTANT: After classification, prioritize testing the main workflow first to ensure core functionality is working correctly before proceeding to edge cases.\n\n3. User Confirmation of Test Credentials: After test function classification, ask the user to actively provide: 1) The page URL/link where the generated component can be accessed for testing, 2) Test account credentials (username and password) if authentication is required. DO NOT proceed to testing until the user explicitly provides these credentials.\n\n4. Execute Playwright Main Workflow Testing: Based on the classified test cases and user-provided credentials, use Playwright to execute core testing processes including: navigating to the provided test page, handling login authentication with the provided credentials, executing classified key functionality tests with priority on main workflow tests, capturing screenshots for visual verification, and generating comprehensive test reports with results and identified issues.',
            },
          ],
          components: componentListContent,
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(workflow, null, 2),
            },
          ],
        };
      } catch (error) {
        // 如果文件不存在或读取失败，返回错误信息
        const workflow = {
          steps: [
            {
              step: 1,
              action: 'User Input Requirement',
              description: 'User provides specific requirement description or wiki content',
            },
            {
              step: 2,
              action: 'Display Workflow',
              description: 'Show the user the code generation steps and execute them strictly',
            },
            {
              step: 3,
              action: 'Get Component List',
              description: 'Call list_components to get simple descriptions of all components',
            },
            {
              step: 4,
              action: 'Component Confirmation',
              description:
                'Confirm which components to use based on descriptions. DO NOT execute the following steps until the user confirms the components. Wait for explicit user confirmation before proceeding.',
            },
            {
              step: 5,
              action: 'Get Component Details',
              description:
                'Call get_component_example and get_component_interface to get specific usage methods for the corresponding components. ALWAYS use the components parameter (not component) when calling these tools, even for single components. This ensures consistent parameter handling.',
            },
            {
              step: 6,
              action: 'API Integration',
              description:
                "Ask the user for the PAPI link that contains both projectId and apiId (both are REQUIRED parameters), and ask the user to provide ALL URL paths at once. Extract projectId from the segment after /project/ and apiId from the query param apiId (e.g., @https://a.sankuai.com/index/#/papi/project/016ef3a3-9c8b-4b01-82eb-483e508ed038?apiId=a0df5a16-25ea-45f5-a0c5-2c3d63cb7fb0&category=%E7%BB%93%E7%AE%97%E9%9C%80%E6%B1%82). Then call get_papi_detail with { projectId, apiId, paths } where paths is a string containing ALL URL paths separated by commas. CRITICAL: The user will provide ALL paths in one message, and AI MUST concatenate ALL paths into a single comma-separated string in ONE call (e.g., '/api/fund/foreignExchange/solution/fund/apply,/api/fund/foreignExchange/solution/fund/detail'). DO NOT make multiple calls for different paths.",
            },
            {
              step: 7,
              action: 'Generate Implementation',
              description:
                'Based on the obtained component information, generate the corresponding code implementation',
            },
            {
              step: 8,
              action: 'Generate Code',
              description:
                'Generate initial code implementation based on component information. IMPORTANT: Before generating code, confirm with the user which file to write to. DO NOT automatically create new files without explicit user confirmation.',
            },
            {
              step: 9,
              action: 'Automated Testing with Playwright',
              description:
                'After code generation, use Playwright for end-to-end testing, divided into four steps:\n\n1. Get Test Cases: Ask the user to provide ONES test case address (e.g., @https://ones.sankuai.com/ones/product/5307/case/testplan/4650661/planning?testroundId=4650662), extract projectId from the segment after /product/ and testRoundId from the testroundId query parameter, then call get_test_data to obtain test case information.\n\n2. AI Classification of Test Functions: Based on the obtained test cases, AI intelligently classifies test functions into key categories including: user interaction testing, form submission testing, data validation testing, UI component functionality testing, etc., ensuring coverage of main workflows. IMPORTANT: After classification, prioritize testing the main workflow first to ensure core functionality is working correctly before proceeding to edge cases.\n\n3. User Confirmation of Test Credentials: After test function classification, ask the user to actively provide: 1) The page URL/link where the generated component can be accessed for testing, 2) Test account credentials (username and password) if authentication is required. DO NOT proceed to testing until the user explicitly provides these credentials.\n\n4. Execute Playwright Main Workflow Testing: Based on the classified test cases and user-provided credentials, use Playwright to execute core testing processes including: navigating to the provided test page, handling login authentication with the provided credentials, executing classified key functionality tests with priority on main workflow tests, capturing screenshots for visual verification, and generating comprehensive test reports with results and identified issues.',
            },
          ],
          components: `Error reading component list: ${error.message}`,
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(workflow, null, 2),
            },
          ],
        };
      }
    });
  },
};

```

### Core 核心入口
#### src/index.ts - MCP Server 主程序
``` TS
#!/usr/bin/env node  // 告诉系统用 node 执行这个文件

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'; // import { StdioServerTransport }

import { getComponentDetail } from './Beetle/getComponentDetail.js';
import { getComponentListTool } from './Beetle/getComponentList.js';
import { getWorkFlowTool } from './Beetle/getWorkFlowTool.js';

import { getPapiTool } from './Papi/index.js';
import { getTestTool } from './Test/index.js';

// 创建 MCP 服务器实例
const mcpServer = new McpServer({
  name: 'mcp-coding',
  version: '1.0.0',
  capabilities: {
    tools: {}, // 声明此服务器支持 tools 功能
  },
});

// 定义工具列表
const tools = [getComponentDetail, getComponentListTool, getWorkFlowTool, getPapiTool, getTestTool];
const registeredToolCache = new Map(); // 创建缓存，防止工具重复注册

export const initializeTools = async (server: McpServer) => {
  await Promise.all(
    tools.map(async (tool) => {
      const toolCtx = await tool.ctx?.();
      if (registeredToolCache.has(tool.name)) {
        return;
      }
      registeredToolCache.set(tool.name, tool);
      // 注册工具
      tool.exec(server, {
        name: tool.name,
        description: tool.description,
        ctx: toolCtx || {},
      });
    }),
  );
};

// 启动服务
// 1. 初始化、注册工具
await initializeTools(mcpServer as any);

// 2. 创建通信层 （配置标准输入输出、准备接收 JSON 请求、准备发送 JSON 响应）
const transport = new StdioServerTransport();

// 3. 启动服务 （连接 transport、开始监听 stdin、等待 Client 请求、 ♾️ 永远运行）
await mcpServer.connect(transport);

```
### package.json
``` TS
{
  // 1️⃣ 基本信息
  "name": "@finfe/mcp-coding",
  "version": "1.2.0",
  "description": "...",
  "license": "MIT",
  
  // 2️⃣ 模块类型
  "type": "module", // ES6 模块
  "sideEffects": false, // 优化打包体积，只打包用到的
  
  // 3️⃣ 可执行命令 让这个包可以作为命令行工具运行
  "bin": { "code_tools": "./es/index.js" }, // 然后可以在命令行使用 code_tools  # 直接启动 MCP Server
  
  // 4️⃣ 导出方式 当别人 import 你的包时，系统查找顺序：
  "exports": { ".": { "import": "./es/index.js" } },
  "main": "lib/index.js",
  "module": "es/index.js",
  "types": "es/index.d.ts",
  
  // 5️⃣ 包含的文件
  "files": ["es", "src", "knowledge", "Agent"],
  
  // 6️⃣ 脚本命令
  "scripts": { ... },
  
  // 7️⃣ 依赖
  "dependencies": { ... },
  "peerDependencies": { ... },
  "devDependencies": { ... },
  
  // 8️⃣ 发布配置
  "publishConfig": { "access": "public" }
}
```

### 脚本
- 异步 API：`fs.promises`
- `fs.access`：用于检查文件或目录的访问权限，常用于确认文件是否存在。
- `fs.readFile` 和 `fs.writeFile`：异步读取和写入文件，避免阻塞主线程。
- `fs.mkdir` 创建目录
-`path.join`：用来安全地拼接路径，确保跨平台兼容。
-`path.dirname` 和 `path.basename`：获取路径的目录部分和文件名部分。
-`import.meta.url`：在 ES 模块中，用于获取当前模块的 URL，通常用于动态获取文件路径。