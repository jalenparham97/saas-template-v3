'use client';

import { NavUser } from '@/components/nav-user';
import { AdminNavMain } from '@/features/admin/components/admin-nav-main';
import { AdminNavSecondary } from '@/features/admin/components/admin-nav-secondary';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@workspace/ui/components/sidebar';
import { LayoutDashboardIcon, ShieldIcon } from 'lucide-react';

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-muted-foreground">
            <ShieldIcon className="h-3 w-3" />
            Admin Panel
          </div>
          <AdminNavMain />
        </SidebarGroup>
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
