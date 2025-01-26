'use client';

import * as React from 'react';
import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';
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
    href: '/',
    isActive: true,
  },
  {
    title: 'Projects',
    icon: FolderKanban,
    href: '/projects',
    isActive: false,
  },
  {
    title: 'Applications',
    icon: AppWindow,
    href: '/applications',
    isActive: false,
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
    isActive: false,
  },
];

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const [activeItem, setActiveItem] = React.useState(navItems[0]);
  const { setOpenMobile, setOpen } = useSidebar();

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
                            router.push(item.href);
                            setOpen(true);
                          }}
                          isActive={activeItem.title === item.title}
                          className={`px-2.5 md:px-2 ${activeItem.title === item.title ? 'bg-black text-white' : ''}`}
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
          <SidebarContent>
            <SidebarHistory user={user} />
          </SidebarContent>
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
