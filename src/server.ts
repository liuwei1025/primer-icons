#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

// 定义图标搜索工具的参数类型
interface SearchIconsArgs {
  query: string;
  limit?: number;
}

// 验证搜索图标参数
const isValidSearchIconsArgs = (args: any): args is SearchIconsArgs => {
  return (
    typeof args === 'object' &&
    args !== null &&
    typeof args.query === 'string' &&
    (args.limit === undefined || typeof args.limit === 'number')
  );
};

// 定义图标信息接口
interface IconInfo {
  name: string;
  description: string;
  svgPath: string;
  url: string;
}

class PrimerIconsServer {
  private server: Server;
  private baseUrl = 'https://primer.style/foundations/icons';

  constructor() {
    this.server = new Server(
      {
        name: 'primer-icons-service',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      },
    );

    this.setupToolHandlers();

    // 错误处理
    this.server.onerror = error => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    // 注册工具列表
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'search_icons',
          description: '搜索Primer Icons库中的图标',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: '搜索关键词',
              },
              limit: {
                type: 'number',
                description: '返回结果数量限制（可选，默认为10）',
                minimum: 1,
                maximum: 50,
              },
            },
            required: ['query'],
          },
        },
      ],
    }));

    // 处理工具调用
    this.server.setRequestHandler(CallToolRequestSchema, async request => {
      if (request.params.name !== 'search_icons') {
        throw new McpError(ErrorCode.MethodNotFound, `未知工具: ${request.params.name}`);
      }

      if (!isValidSearchIconsArgs(request.params.arguments)) {
        throw new McpError(ErrorCode.InvalidParams, '无效的搜索参数');
      }

      try {
        const icons = await this.searchIcons(
          request.params.arguments.query,
          request.params.arguments.limit || 10,
        );

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(icons, null, 2),
            },
          ],
        };
      } catch (error) {
        console.error('搜索图标时出错:', error);
        return {
          content: [
            {
              type: 'text',
              text: `搜索图标时出错: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  // 搜索图标实现
  private async searchIcons(query: string, limit: number): Promise<IconInfo[]> {
    try {
      // 获取图标页面
      const response = await axios.get(this.baseUrl);
      const $ = cheerio.load(response.data);
      const icons: IconInfo[] = [];

      // 查找所有图标元素
      $('.Box-row').each((index: number, element: any) => {
        const nameElement = $(element).find('.d-flex.flex-items-start h3');
        const name = nameElement.text().trim();

        // 如果名称不匹配查询，则跳过
        if (!name.toLowerCase().includes(query.toLowerCase())) {
          return;
        }

        const description = $(element).find('.color-fg-muted').text().trim();
        const svgElement = $(element).find('svg');
        const svgPath = svgElement.find('path').attr('d') || '';
        const url = `${this.baseUrl}#${name.toLowerCase().replace(/\s+/g, '-')}`;

        icons.push({
          name,
          description,
          svgPath,
          url,
        });

        // 如果已达到限制，停止处理
        if (icons.length >= limit) {
          return false;
        }
      });

      return icons;
    } catch (error) {
      console.error('获取图标时出错:', error);
      throw new Error('无法从Primer Icons网站获取图标');
    }
  }

  // 启动服务器
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Primer Icons MCP服务已启动，使用标准输入/输出通信');
  }
}

// 创建并启动服务器
const server = new PrimerIconsServer();
server.run().catch(console.error);
