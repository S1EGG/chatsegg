/**
 * 应用程序根布局组件
 * 为整个应用提供全局配置和布局结构
 */
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

/**
 * SEO元数据配置
 * 定义应用的基本信息，用于搜索引擎优化和社交媒体分享
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://chatsegg.vercel.app'),
  title: 'ChatSegg - 智能聊天助手',
  description: 'ChatSegg - 基于 Next.js 和 AI SDK 构建的智能聊天助手',
};

/**
 * 视口配置
 * 防止移动端Safari浏览器自动缩放
 */
export const viewport = {
  maximumScale: 1,
};

/**
 * 主题颜色配置
 * 定义浏览器UI的主题颜色
 */
const LIGHT_THEME_COLOR = 'hsl(0 0% 100%)';
const DARK_THEME_COLOR = 'hsl(240deg 10% 3.92%)';

/**
 * 主题颜色动态更新脚本
 * 在客户端运行，根据用户切换深色/浅色模式时更新浏览器主题色
 */
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

/**
 * 根布局组件
 * 提供以下功能：
 * - 主题支持（深色/浅色模式）
 * - 消息通知系统
 * - 全局样式
 * - 主题颜色管理
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // next-themes 会在body元素上注入额外的类名以避免视觉闪烁
      // 因此需要 suppressHydrationWarning 属性来避免React水合警告
      // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_COLOR_SCRIPT }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
