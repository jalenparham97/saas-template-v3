'use client';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/ui/components/sidebar';
import { LayoutDashboardIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

export function AdminNavMain() {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();

  function isActive({ path, name }: { path: string; name: string }) {
    // Active if exact path matches, or the current segment matches the item name
    return pathname === path || segment === name.toLowerCase();
  }

  const menuItems = [
    {
      title: 'Overview',
      url: '/admin',
      icon: LayoutDashboardIcon,
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: UsersIcon,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton
              asChild
              isActive={isActive({ path: item.url, name: item.title })}
              variant="white"
            >
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
