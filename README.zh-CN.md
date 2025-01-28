# ChatSegg AI 聊天助手

<div align="center">
  <img src="public/images/brandlogopng.png" alt="ChatSegg Logo" width="200">
</div>

<div align="center">
  <a href="README.md">English</a> | 中文
</div>

<p align="center">
  基于 Next.js 14 和 AI SDK 构建的智能聊天助手
</p>

## 项目简介

ChatSegg 是一个现代化的 AI 聊天应用，它提供了丰富的对话功能和直观的用户界面。项目采用最新的 Web 技术栈，支持多种 AI 模型，并具有良好的可扩展性。

## 主要特性

- 💬 智能对话：支持自然语言交互，提供流畅的对话体验
- 🎨 现代化 UI：基于 Tailwind CSS 和 shadcn/ui 构建的美观界面
- 🔒 安全认证：集成 NextAuth.js 实现可靠的用户认证
- 📝 多种编辑器：支持富文本、代码和图片编辑
- 💾 数据持久化：使用 Vercel Postgres 存储聊天历史
- 🚀 高性能：基于 React Server Components 和 Server Actions

## 技术栈

- **框架**: [Next.js 14](https://nextjs.org)
- **UI 组件**: [shadcn/ui](https://ui.shadcn.com)
- **样式**: [Tailwind CSS](https://tailwindcss.com)
- **组件库**: [Radix UI](https://radix-ui.com)
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **数据库**: [Vercel Postgres](https://vercel.com/storage/postgres)
- **认证**: [NextAuth.js](https://next-auth.js.org)
- **动画**: [Framer Motion](https://www.framer.com/motion)
- **代码格式化**: [Biome](https://biomejs.dev)

## 环境要求

- Node.js 18+
- pnpm 9+
- PostgreSQL

## 快速开始

1. 克隆项目

```bash
git clone https://github.com/yourusername/chatsegg.git
cd chatsegg
```

2. 安装依赖

```bash
pnpm install
```

3. 配置环境变量

复制 `.env.example` 文件为 `.env.local` 并填写必要的环境变量：

```bash
cp .env.example .env.local
```

4. 初始化数据库

```bash
pnpm db:migrate
```

5. 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 部署

推荐使用 [Vercel](https://vercel.com) 进行部署：

1. 在 Vercel 上导入项目
2. 配置环境变量
3. 部署应用

## 开发指南

- 使用 `pnpm dev` 启动开发服务器
- 使用 `pnpm lint` 运行代码检查
- 使用 `pnpm format` 格式化代码
- 使用 `pnpm build` 构建生产版本

## 数据库管理

- `pnpm db:generate` - 生成数据库迁移文件
- `pnpm db:migrate` - 执行数据库迁移
- `pnpm db:studio` - 启动数据库管理界面

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目基于 Apache License 2.0 开源协议 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系我们

如果您有任何问题或建议，欢迎通过以下方式联系我们：

- 提交 [Issue](https://github.com/S1EGG/chatsegg/issues)
- 发送邮件至 [your-email@example.com](mailto:tom.wangshihao@gmail.com) 