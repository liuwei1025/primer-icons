# 使用Node.js官方镜像作为基础镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码和编译后的文件
COPY dist/ ./dist/

# 设置环境变量
ENV NODE_ENV=production

# 暴露端口（如果需要）
# EXPOSE 3000

# 设置启动命令
CMD ["node", "dist/server.js"]
