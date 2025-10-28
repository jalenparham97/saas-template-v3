'use client';

import { LayoutDashboard, LifeBuoy, Send, Settings2 } from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@workspace/ui/components/sidebar';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
};

/**
 * The main sidebar for the app.
 * @example
 * <AppSidebar />
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary items={data.navSecondary} className="m-0 px-0" />
      </SidebarFooter>
    </Sidebar>
  );
}
