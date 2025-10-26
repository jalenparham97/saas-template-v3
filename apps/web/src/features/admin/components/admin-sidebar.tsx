'use client';

import { NavUser } from '@/components/nav-user';
import { AdminNavMain } from '@/features/admin/components/admin-nav-main';
import { AdminNavSecondary } from '@/features/admin/components/admin-nav-secondary';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@workspace/ui/components/sidebar';
import { LayoutDashboardIcon } from 'lucide-react';

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <AdminNavMain />
      </SidebarContent>
      <SidebarFooter>
        <AdminNavSecondary
          items={[
            {
              title: 'Back to App',
              url: '/dashboard',
              icon: LayoutDashboardIcon,
            },
          ]}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
