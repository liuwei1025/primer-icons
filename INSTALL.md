# Primer Icons MCP 服务安装指南

本文档提供了安装和配置Primer Icons MCP服务的详细步骤。

## 前提条件

- Node.js (v14.0.0或更高版本)
- npm或yarn包管理器

## 安装步骤

### 1. 克隆或下载仓库

```bash
git clone <repository-url>
cd primer-icons-mcp
```

### 2. 安装依赖

```bash
npm install
```

或者使用yarn：

```bash
yarn install
```

### 3. 构建项目

```bash
npm run build
```

或者使用yarn：

```bash
yarn build
```

### 4. 测试服务

运行测试脚本以确保服务正常工作：

```bash
node test.js
```

## 配置Cline

要在Cline中使用此MCP服务，需要将其添加到Cline的MCP设置中：

### VSCode中的Cline

1. 打开VSCode的MCP设置文件：
   `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

2. 添加以下配置：

```json
{
  "mcpServers": {
    "primer-icons": {
      "command": "node",
      "args": ["/完整路径/到/primer-icons-mcp/dist/server.js"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Claude桌面应用

1. 打开Claude桌面应用的MCP设置文件：
   `~/Library/Application Support/Claude/claude_desktop_config.json`

2. 添加以下配置：

```json
{
  "mcpServers": {
    "primer-icons": {
      "command": "node",
      "args": ["/完整路径/到/primer-icons-mcp/dist/server.js"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## 使用方法

在Cline中，你可以使用以下方式查找图标：

```
使用MCP工具搜索"alert"图标
```

服务将返回匹配的图标信息，包括：
- 图标名称
- 图标描述
- SVG路径
- 图标URL

## 故障排除

如果遇到问题，请检查：

1. Node.js版本是否满足要求
2. 所有依赖是否正确安装
3. 项目是否成功构建
4. MCP设置文件中的路径是否正确

## 更新服务

要更新服务，请拉取最新代码并重新构建：

```bash
git pull
npm install
npm run build
```
