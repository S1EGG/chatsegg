/**
 * Root Layout Component
 * Provides global configuration and layout structure for the entire application
 */
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

/**
 * SEO Metadata Configuration
 * Defines basic application information for search engine optimization and social media sharing
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://chatsegg.vercel.app'),
  title: 'ChatSegg - AI Chat Assistant',
  description: 'ChatSegg - An intelligent chat assistant built with Next.js and AI SDK',
};

/**
 * Viewport Configuration
 * Prevents automatic scaling in Safari on mobile devices
 */
export const viewport = {
  maximumScale: 1,
};

/**
 * Theme Color Configuration
 * Defines browser UI theme colors
 */
const LIGHT_THEME_COLOR = 'hsl(0 0% 100%)';
const DARK_THEME_COLOR = 'hsl(240deg 10% 3.92%)';

/**
 * Theme Color Dynamic Update Script
 * Runs on the client side to update browser theme color when user toggles dark/light mode
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
 * Root Layout Component
 * Provides the following features:
 * - Theme support (dark/light mode)
 * - Notification system
 * - Global styles
 * - Theme color management
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // next-themes injects additional class names on the body element to prevent visual flickering
      // suppressHydrationWarning is needed to avoid React hydration warnings
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
