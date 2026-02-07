# =============================================
# 阶段一：构建 (Build Stage)
# Angular 8 需要 Node 12.x
# =============================================
FROM node:12-alpine AS builder

# 设置工作目录
WORKDIR /app

# 先复制依赖文件，利用 Docker 缓存层
COPY package.json ./

# 安装依赖
RUN npm install --registry=https://registry.npmmirror.com

# 复制源代码
COPY . .

# 执行生产构建
RUN npm run build

# =============================================
# 阶段二：运行 (Production Stage)
# 使用 Nginx 官方跨平台镜像 (支持 ARM + X86)
# =============================================
FROM nginx:stable-alpine

# 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制产物到 Nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 8081

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
