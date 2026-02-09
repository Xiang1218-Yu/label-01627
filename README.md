# 二维码生成器 - QR Code Generator

基于 Angular 8 + NG-ZORRO 的纯前端二维码生成功能模块。输入一段文字，生成二维码，手机扫码后可在移动端网页中展示该文字内容。

---

## How to Run

### 方式一：Docker 一键启动（推荐）

```bash
# 克隆项目
git clone <仓库地址>
cd label-01627

# 使用 Docker Compose 构建并启动
docker-compose up -d --build

# 访问地址
# http://localhost:8081
```

### 方式二：本地开发启动

```bash
# 进入前端目录
cd frontend-admin

# 安装依赖（Angular 8 需要 Node 12.x）
npm install

# 启动开发服务器（自动监听 0.0.0.0，手机可通过局域网 IP 访问）
npm start

# 访问地址
# http://localhost:5174
# http://<你的局域网IP>:5174  （手机端访问）
```

### 方式三：生产构建

```bash
cd frontend-admin
npm install
npm run build

# 构建产物在 frontend-admin/dist/ 目录下
# 可使用任意静态资源服务器托管
```

---

## Services

| 服务名称         | 技术栈                     | 端口   | 说明               |
| ---------------- | -------------------------- | ------ | ------------------ |
| frontend-admin   | Angular 8 + NG-ZORRO      | 8081   | 前端二维码生成器   |

---

## 测试账号

本项目为纯前端项目，无需登录，无测试账号。

---

## 题目内容

> 生成一套二维码生成功能模块，纯前端，angular8，需求：
> 输入一段文字，扫描二维码，在手机端用网页展示这段文字，难点在，项目在本地启动，手机端无法访问本地得资源，看有什么办法解决这个问题

---

## 技术方案

### 核心技术栈

- **Angular 8** — 组件化前端框架，使用懒加载模块
- **NG-ZORRO 8.x** — Ant Design 的 Angular 实现，UI 组件库
- **Angular Router** — 路由管理（Hash 模式）
- **QRCode** — 纯前端二维码生成（qrcode 库）
- **Angular CLI** — 开发构建工具
- **Sass** — CSS 预处理器
- **TypeScript 3.5** — 类型安全
- **RxJS 6** — 响应式编程

### 解决手机端访问本地服务的方案

**核心难点：** 项目在本地启动后，手机端无法通过 `localhost` 访问电脑上的服务。

**解决方案：局域网 IP + 同一 WiFi 网络**

1. **Angular CLI 开发服务器绑定 `0.0.0.0`**：启动时通过 `--host 0.0.0.0` 监听所有网络接口，而不仅是 `localhost`，使局域网内设备可访问
2. **手动输入局域网 IP**：用户在页面底部"网络访问信息"卡片中手动填写本机局域网 IP 地址
3. **二维码编码局域网地址**：生成的二维码中包含 `http://<局域网IP>:8081/#/display?text=<编码文字>` 格式的 URL
4. **手机扫码直达**：手机与电脑连接同一 WiFi 后，扫码即可直接访问展示页面

**操作步骤：**

```
电脑和手机连接同一 WiFi
    ↓
在电脑浏览器打开 http://localhost:5174（开发）或 http://localhost:8081（Docker）
    ↓
查看本机局域网 IP（Windows: ipconfig / Mac: ifconfig）
    ↓
在页面底部"网络访问信息"卡片中输入局域网 IP 并点击"应用"
    ↓
输入要展示的文字 → 点击"生成二维码"
    ↓
手机扫描二维码 → 自动打开展示页面
```

> **注意事项：**
> - 需要手动输入本机局域网 IP 地址（通过 `ipconfig` / `ifconfig` 命令查看，一般为 `192.168.x.x` 格式）
> - 确保电脑防火墙允许对应端口入站连接
> - Docker 部署时，确保容器端口正确映射

### 项目结构

```
label-01627/
├── README.md                          # 项目说明文档
├── docker-compose.yml                 # Docker 编排文件
├── .gitignore                         # Git 忽略配置
└── frontend-admin/                    # 前端工程目录
    ├── Dockerfile                     # Docker 构建文件（多阶段，Node 12 构建 + Nginx）
    ├── .dockerignore                  # Docker 构建忽略配置
    ├── nginx.conf                     # Nginx 配置（生产环境）
    ├── package.json                   # 依赖管理
    ├── angular.json                   # Angular CLI 配置
    ├── tsconfig.json                  # TypeScript 配置
    ├── tsconfig.app.json              # 应用 TypeScript 配置
    └── src/                           # 源码目录
        ├── main.ts                    # 应用入口（引导 AppModule）
        ├── polyfills.ts               # 浏览器兼容 polyfills
        ├── index.html                 # HTML 入口
        ├── styles.scss                # 全局样式
        └── app/                       # 应用模块
            ├── app.module.ts          # 根模块
            ├── app.component.ts       # 根组件
            ├── app-routing.module.ts  # 路由配置（懒加载）
            ├── utils/
            │   └── network.ts         # 网络工具（URL 构建）
            ├── components/            # 可复用组件
            │   ├── text-input-card/   # 文字输入卡片组件
            │   ├── qr-preview-card/   # 二维码预览卡片组件
            │   └── network-info-card/ # 网络信息卡片组件
            └── views/                 # 页面视图（懒加载模块）
                ├── home/              # 主页 - 二维码生成器
                └── display/           # 手机端 - 文字展示页
```

### 功能特性

- 纯前端实现，无需后端服务
- 实时生成二维码，支持中文长文本
- 手动输入局域网 IP（通过 `ipconfig` / `ifconfig` 查看）
- 手机端展示页面自适应，移动端体验优化
- 二维码可下载为 PNG 图片
- 访问链接可一键复制
- 快捷示例文本，开箱即用
- 完整的视觉设计：卡片阴影、渐变头部、动画过渡
- Docker 一键部署，支持 ARM / X86 架构
