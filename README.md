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

- Submit an [Issue](https://github.com/S1EGG/chatsegg/issues)
- Send email to [your-email@example.com](mailto:tom.wangshihao@gmail.com)
