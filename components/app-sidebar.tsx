'use client';

import * as React from 'react';
import type { User } from 'next-auth';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { MessageSquare, FolderKanban, AppWindow, Settings } from 'lucide-react';

import { SidebarHistory } from '@/components/sidebar-history';
import { SidebarUserNav } from '@/components/sidebar-user-nav';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const navItems = [
  {
    title: 'Chat',
    icon: MessageSquare,
    href: '#chat',
    isActive: true,
  },
  {
    title: 'Projects',
    icon: FolderKanban,
    href: '#projects',
    isActive: false,
  },
  {
    title: 'Applications',
    icon: AppWindow,
    href: '#applications',
    isActive: false,
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '#settings',
    isActive: false,
  },
];

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const [activeItem, setActiveItem] = React.useState(() => {
    // 从URL hash中获取当前激活的模块，如果没有则默认为Chat
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    return navItems.find(item => item.href === hash) || navItems[0];
  });
  const { setOpenMobile, setOpen } = useSidebar();

  // 监听URL hash变化
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const newActiveItem = navItems.find(item => item.href === hash) || navItems[0];
      setActiveItem(newActiveItem);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
    >
      {/* Left sidebar - Icon navigation */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-10 md:p-0">
                <a href="/" onClick={() => {
                  setOpenMobile(false);
                  setActiveItem(navItems[0]);
                }}>
                  <div className="flex aspect-square size-8 items-center justify-center">
                    <Image
                      src="/images/brandlogoico.ico"
                      alt="Chat.segg Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          onClick={() => {
                            setActiveItem(item);
                            setOpenMobile(false);
                            window.location.hash = item.href.slice(1); // 移除#号
                            setOpen(true);
                          }}
                          isActive={activeItem.title === item.title}
                          className={`px-2.5 md:px-2 rounded-lg transition-colors duration-200 ${
                            activeItem.title === item.title 
                              ? 'bg-black text-white hover:bg-black/90' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <item.icon className="size-4" />
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          {user && (
            <SidebarMenu>
              <SidebarMenuItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarUserNav user={user} />
                  </TooltipTrigger>
                  <TooltipContent side="right">Account</TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarFooter>
      </Sidebar>

      {/* Right sidebar - Content area */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        {activeItem.title === 'Chat' ? (
          <>
            <div className="flex flex-col h-full">
              {/* 顶部标题栏 */}
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <h2 className="text-lg font-semibold">{activeItem.title}</h2>
                <button
                  onClick={() => {
                    router.push('/');
                    setOpen(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                  >
                    <path
                      d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {/* 聊天历史记录 */}
              <div className="flex-1 overflow-auto">
                <SidebarContent>
                  <SidebarHistory user={user} />
                </SidebarContent>
              </div>

              {/* 底部搜索栏 */}
              <div className="p-4 border-t">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search chats"
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  >
                    <path
                      d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-xl font-semibold text-muted-foreground">
              {activeItem.title} - Coming Soon
            </h2>
          </div>
        )}
      </Sidebar>
    </Sidebar>
  );
}
