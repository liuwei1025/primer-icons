# Primer Icons MCP 服务

这是一个Model Context Protocol (MCP) 服务，用于在Cline中编程时查找和使用GitHub Primer Icons。

## 功能

- 通过关键词搜索Primer Icons库中的图标
- 获取图标的名称、描述、SVG路径和URL
- 在Cline中直接使用搜索到的图标

## 安装

1. 克隆此仓库
2. 安装依赖：`npm install`
3. 构建项目：`npm run build`
4. 启动服务：`npm start`

## 在Cline中配置

要在Cline中使用此MCP服务，需要将其添加到Cline的MCP设置中：

1. 打开Cline的MCP设置文件：
   - VSCode: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
   - Claude桌面应用: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. 添加以下配置：

```json
{
  "mcpServers": {
    "primer-icons": {
      "command": "node",
      "args": ["/path/to/primer-icons-mcp/dist/server.js"],
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

## 开发

- `npm run build` - 构建项目
- `npm run dev` - 以监视模式构建项目
- `npm start` - 启动MCP服务

## 许可证

ISC
