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
  SidebarBrandButton,
  SidebarBrandMenuItem,
  useSidebar,
  SidebarChatHeader,
  SidebarChatContent,
  SidebarChatHistory,
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
  const [activeItem, setActiveItem] = React.useState(navItems[0]);
  const { setOpenMobile, setOpen } = useSidebar();

  // 监听URL hash变化
  React.useEffect(() => {
    // 初始化时设置 activeItem
    const hash = window.location.hash;
    const initialItem = navItems.find(item => item.href === hash) || navItems[0];
    setActiveItem(initialItem);

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
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row [&>[data-sidebar=sidebar]]:!transition-none [&_[data-sidebar=header]]:!transition-none"
    >
      {/* Left sidebar - Icon navigation */}
      <Sidebar
        collapsible="none"
        className="!w-12 border-r shrink-0 fixed left-0 z-50 !transition-none bg-white flex flex-col"
      >
        <SidebarHeader className="shrink-0">
          <SidebarMenu className="flex flex-col items-center !transition-none">
            <SidebarBrandMenuItem
              src="/images/brandlogopng.png"
              alt="Chat.segg Logo"
              href="/"
              onClick={() => {
                setOpenMobile(false);
                setActiveItem(navItems[0]);
              }}
            />
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col items-center gap-3">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          onClick={() => {
                            setActiveItem(item);
                            setOpenMobile(false);
                            window.location.hash = item.href.slice(1);
                            setOpen(true);
                          }}
                          isActive={activeItem.title === item.title}
                          className={`size-8 rounded-lg transition-colors duration-200 flex items-center justify-center ${
                            activeItem.title === item.title 
                              ? 'bg-black text-white' 
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
        <SidebarFooter className="shrink-0">
          {user && (
            <SidebarMenu className="flex flex-col items-center">
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
      <Sidebar collapsible="none" className="hidden flex-1 md:flex ml-12 !transition-none w-[280px] border-r bg-white">
          {activeItem.title === 'Chat' ? (
            <>
            <div className="flex flex-col size-full">
              <SidebarChatHeader>
                <h2 className="text-base font-medium text-gray-900">{activeItem.title}</h2>
                <button
                  onClick={() => {
                    router.push('/');
                  }}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-900 -translate-x-2"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                  >
                    <path
                      d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </SidebarChatHeader>

              {/* 内容区域 */}
              <div className="flex-1 overflow-auto">
                <SidebarChatContent>
                  <SidebarChatHistory>
                    <SidebarContent className="px-0">
                      <SidebarHistory user={user} />
                    </SidebarContent>
                  </SidebarChatHistory>
                </SidebarChatContent>
              </div>
            </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-base font-medium text-gray-500">
                {activeItem.title} - Coming Soon
              </h2>
            </div>
          )}
      </Sidebar>
    </Sidebar>
  );
}
