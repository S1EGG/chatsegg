# ChatSegg AI Chatbot

<div align="center">
  <img src="public/images/brandlogopng.png" alt="ChatSegg Logo" width="200">
</div>

<div align="center">
  English | <a href="README.zh-CN.md">中文</a>
</div>

<div id="english">

<p align="center">
  A Modern AI Chatbot Built with Next.js 14 and AI SDK
</p>

## Introduction

ChatSegg is a modern AI chat application that offers rich conversational features and an intuitive user interface. Built with cutting-edge web technologies, it supports multiple AI models and provides excellent scalability.

## Features

- 💬 Smart Conversations: Natural language interaction with smooth dialogue experience
- 🎨 Modern UI: Beautiful interface built with Tailwind CSS and shadcn/ui
- 🔒 Secure Authentication: Reliable user authentication with NextAuth.js
- 📝 Multiple Editors: Support for rich text, code, and image editing
- 💾 Data Persistence: Chat history storage with Vercel Postgres
- 🚀 High Performance: Based on React Server Components and Server Actions

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Component Library**: [Radix UI](https://radix-ui.com)
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Database**: [Vercel Postgres](https://vercel.com/storage/postgres)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **Animation**: [Framer Motion](https://www.framer.com/motion)
- **Code Formatting**: [Biome](https://biomejs.dev)

## Requirements

- Node.js 18+
- pnpm 9+
- PostgreSQL

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/yourusername/chatsegg.git
cd chatsegg
```

2. Install dependencies

```bash
pnpm install
```

3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the required variables:

```bash
cp .env.example .env.local
```

4. Initialize database

```bash
pnpm db:migrate
```

5. Start development server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

Recommended deployment with [Vercel](https://vercel.com):

1. Import project to Vercel
2. Configure environment variables
3. Deploy the application

## Development Guide

- Use `pnpm dev` to start development server
- Use `pnpm lint` to run code checks
- Use `pnpm format` to format code
- Use `pnpm build` to build production version

## Database Management

- `pnpm db:generate` - Generate database migration files
- `pnpm db:migrate` - Execute database migrations
- `pnpm db:studio` - Launch database management interface

## Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Submit Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, please feel free to:

- Submit an [Issue](https://github.com/yourusername/chatsegg/issues)
- Send email to [your-email@example.com](mailto:your-email@example.com)

</div>

<div id="chinese" style="display: none;">

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

- 提交 [Issue](https://github.com/yourusername/chatsegg/issues)
- 发送邮件至 [your-email@example.com](mailto:your-email@example.com)

</div>

<script>
document.getElementById('en-btn').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('english').style.display = 'block';
  document.getElementById('chinese').style.display = 'none';
  document.getElementById('en-btn').style.color = '#000';
  document.getElementById('zh-btn').style.color = '#666';
});

document.getElementById('zh-btn').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('english').style.display = 'none';
  document.getElementById('chinese').style.display = 'block';
  document.getElementById('en-btn').style.color = '#666';
  document.getElementById('zh-btn').style.color = '#000';
});
</script>
