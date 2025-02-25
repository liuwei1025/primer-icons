# 贡献指南

感谢您考虑为Primer Icons MCP服务做出贡献！以下是一些指导方针，帮助您参与到项目中。

## 开发环境设置

1. 克隆仓库：
   ```bash
   git clone <repository-url>
   cd primer-icons-mcp
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发模式：
   ```bash
   npm run dev
   ```

## 代码风格

- 使用TypeScript编写所有代码
- 遵循ESLint规则
- 使用2个空格缩进
- 使用单引号字符串
- 每个文件末尾添加一个空行

## 提交代码

1. 创建一个新分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. 提交您的更改：
   ```bash
   git commit -m "描述您的更改"
   ```

3. 推送到您的分支：
   ```bash
   git push origin feature/your-feature-name
   ```

4. 创建一个Pull Request

## 功能请求和Bug报告

如果您想请求新功能或报告Bug，请创建一个Issue，并提供以下信息：

- 对问题或功能的清晰描述
- 重现步骤（如果是Bug）
- 预期行为
- 实际行为
- 环境信息（操作系统、Node.js版本等）

## 测试

在提交代码之前，请确保运行测试：

```bash
node test.js
```

## 文档

如果您更改了代码行为或添加了新功能，请更新相应的文档。

## 许可证

通过贡献代码，您同意您的贡献将在ISC许可证下发布。
