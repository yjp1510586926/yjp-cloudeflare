# YJP Cloudflare 全栈项目

这是一个基于 Cloudflare 的全栈应用，前端部署在 Cloudflare Pages，后端 GraphQL API 部署在 Cloudflare Workers。

## 项目结构

```
yjp-cloudeflare/
├── yjp-cloudeflare-pages/      # 前端项目 (React + Vite)
│   ├── src/
│   │   ├── api/
│   │   │   └── graphql.js      # GraphQL 客户端 API
│   │   ├── App.jsx             # 主应用组件
│   │   ├── App.css             # 样式文件
│   │   └── main.jsx
│   ├── .env                    # 环境变量配置
│   └── package.json
│
└── yjp-cloudeflare-workers/    # 后端项目 (GraphQL API)
    ├── src/
    │   └── index.js            # GraphQL 服务器
    ├── wrangler.toml           # Cloudflare Workers 配置
    └── package.json
```

## 快速开始

### 1. 启动后端 GraphQL API (Workers)

```bash
cd yjp-cloudeflare-workers
npm run dev
```

后端服务将在 `http://localhost:8787` 启动。

访问 `http://localhost:8787/graphql` 可以看到 GraphQL Playground 界面并进行在线测试。

### 2. 启动前端应用 (Pages)

打开新的终端窗口：

```bash
cd yjp-cloudeflare-pages
npm run dev
```

前端应用将在 `http://localhost:5173` 启动（或其他可用端口）。

### 3. 测试前后端联调

1. 确保后端服务在 `http://localhost:8787` 运行
2. 访问前端应用 `http://localhost:5173`
3. 你应该能看到：
   - 从后端获取的 Hello 消息
   - 用户列表（默认有两个用户）
   - 创建新用户的表单

## API 功能

### GraphQL 端点

- **POST** `/graphql` - GraphQL 查询和变更
- **GET** `/graphql` - GraphQL Playground 界面
- **GET** `/health` - 健康检查

### 支持的查询

```graphql
# 获取所有用户
query {
  users {
    id
    name
    email
    createdAt
  }
}

# 获取单个用户
query {
  user(id: "1") {
    id
    name
    email
  }
}

# Hello 测试
query {
  hello
}
```

### 支持的变更

```graphql
# 创建新用户
mutation {
  createUser(name: "张三", email: "zhangsan@example.com") {
    id
    name
    email
    createdAt
  }
}
```

## 部署到 Cloudflare

### 部署后端 (Workers)

```bash
cd yjp-cloudeflare-workers
npm run deploy
```

部署后会得到一个 Workers URL，例如：`https://yjp-cloudeflare-workers.your-subdomain.workers.dev`

### 部署前端 (Pages)

1. 更新前端的环境变量，将 `.env` 文件中的 API URL 改为你的 Workers URL：

```env
VITE_API_URL=https://yjp-cloudeflare-workers.your-subdomain.workers.dev/graphql
```

2. 构建并部署：

```bash
cd yjp-cloudeflare-pages
npm run build
npm run deploy
```

## 环境变量配置

### 前端 (.env)

```env
# 开发环境
VITE_API_URL=http://localhost:8787/graphql

# 生产环境（部署后更新）
# VITE_API_URL=https://your-worker.workers.dev/graphql
```

## 技术栈

### 前端
- **React 18** - UI 框架
- **Vite** - 构建工具
- **Cloudflare Pages** - 部署平台

### 后端
- **Cloudflare Workers** - 无服务器计算平台
- **自定义 GraphQL 解析器** - 轻量级实现，无需外部依赖

## 功能特性

✅ GraphQL API 支持  
✅ CORS 跨域配置  
✅ 用户 CRUD 操作  
✅ 实时数据同步  
✅ 响应式设计  
✅ 交互式 GraphQL Playground  
✅ 健康检查端点  

## 开发提示

1. **数据持久化**：当前使用内存存储，Worker 重启后数据会丢失。生产环境建议使用 Cloudflare D1 或 KV 存储。

2. **CORS 配置**：当前允许所有来源访问，生产环境请根据需要限制。

3. **错误处理**：前端已包含基本的错误处理和加载状态。

4. **环境变量**：部署前记得更新 `.env` 文件中的 API URL。

## 故障排查

### 前端无法连接后端

1. 检查后端服务是否在运行：访问 `http://localhost:8787/health`
2. 检查 `.env` 文件中的 `VITE_API_URL` 配置是否正确
3. 检查浏览器控制台是否有 CORS 错误

### GraphQL 查询失败

1. 访问 `http://localhost:8787/graphql` 使用 Playground 测试
2. 检查查询语法是否正确
3. 查看浏览器网络面板的请求和响应

## 下一步计划

- [ ] 集成 Cloudflare D1 数据库实现数据持久化
- [ ] 添加用户认证和授权
- [ ] 添加更多 CRUD 操作
- [ ] 添加分页功能
- [ ] 添加搜索和过滤
- [ ] 添加单元测试
- [ ] 添加 CI/CD 流程

## 许可证

MIT
