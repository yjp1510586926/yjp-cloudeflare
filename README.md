# YJP Cloudflare Pages - 前端应用

基于 React + Vite 的现代化前端应用，使用 GraphQL 与后端通信。

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

本地访问: `http://localhost:5173`

### 构建和部署

```bash
# 构建生产版本
npm run build

# 部署到 Cloudflare Pages
npm run deploy
```

生产地址: `https://yjp-cloudeflare-pages.pages.dev`

## ⚙️ 环境配置

### 开发环境 (`.env`)
```env
VITE_API_URL=http://localhost:8787/graphql
```

### 生产环境 (`.env.production`)
```env
VITE_API_URL=https://yjp-cloudeflare-workers.yangjinpeng.workers.dev/graphql
```

## 📁 项目结构

```
yjp-cloudeflare-pages/
├── src/
│   ├── api/
│   │   └── graphql.js    # GraphQL 客户端
│   ├── App.jsx           # 主应用组件
│   ├── App.css           # 应用样式
│   ├── index.css         # 全局样式
│   └── main.jsx          # 应用入口
├── index.html            # HTML 模板
├── vite.config.js        # Vite 配置
└── package.json          # 项目依赖
```

## 🎨 功能特性

- ✅ 用户列表展示
- ✅ 创建新用户
- ✅ GraphQL 数据查询
- ✅ 响应式设计
- ✅ 现代化 UI

## 🛠️ 技术栈

- **React 18** - UI 框架
- **Vite** - 构建工具
- **GraphQL** - 数据查询
- **Cloudflare Pages** - 部署平台

## 🔗 相关链接

- [React 文档](https://react.dev/)
- [Vite 文档](https://vitejs.dev/)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
