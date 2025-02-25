#!/usr/bin/env node

/**
 * 简单的测试脚本，用于测试Primer Icons MCP服务
 *
 * 使用方法：
 * 1. 先构建项目：npm run build
 * 2. 运行此测试脚本：node test.js
 */

import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// MCP请求格式
const listToolsRequest = {
  jsonrpc: '2.0',
  id: '1',
  method: 'mcp.tools.list',
  params: {},
};

const searchIconsRequest = {
  jsonrpc: '2.0',
  id: '2',
  method: 'mcp.tools.call',
  params: {
    name: 'search_icons',
    arguments: {
      query: 'alert',
      limit: 5,
    },
  },
};

// 启动MCP服务器进程
console.log('启动服务器进程...');
const serverProcess = spawn('node', [join(__dirname, 'dist', 'server.js')]);
console.log('服务器进程已启动');

// 创建readline接口
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 处理服务器输出
serverProcess.stderr.on('data', data => {
  console.log(`[服务器日志] ${data.toString().trim()}`);
});

// 发送请求到服务器
function sendRequest(request) {
  const requestStr = JSON.stringify(request) + '\n';
  serverProcess.stdin.write(requestStr);
  console.log(`[发送请求] ${requestStr.trim()}`);
}

// 处理服务器响应
let buffer = '';
serverProcess.stdout.on('data', data => {
  buffer += data.toString();
  console.log(`[原始响应] ${data.toString().trim()}`);

  // 尝试解析完整的JSON响应
  try {
    const lines = buffer.split('\n');
    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i].trim();
      if (line) {
        const response = JSON.parse(line);
        console.log('[收到响应]', JSON.stringify(response, null, 2));
      }
    }
    buffer = lines[lines.length - 1];
  } catch (e) {
    console.log('[解析错误]', e.message);
    // 不完整的JSON，继续等待更多数据
  }
});

// 测试流程
console.log('开始测试Primer Icons MCP服务...');

// 等待服务器启动
setTimeout(() => {
  console.log('\n1. 测试列出可用工具...');
  sendRequest(listToolsRequest);

  setTimeout(() => {
    console.log('\n2. 测试搜索图标...');
    sendRequest(searchIconsRequest);

    setTimeout(() => {
      console.log('\n测试完成，自动退出...');
      serverProcess.kill();
      rl.close();
      process.exit(0);
    }, 3000);
  }, 1000);
}, 1000);

// 处理进程退出
process.on('SIGINT', () => {
  serverProcess.kill();
  rl.close();
  process.exit(0);
});
