'use client';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/ui/components/sidebar';
import { HomeIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

export function NavMain() {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();

  function isActive({ path, name }: { path: string; name: string }) {
    return segment === name.toLowerCase() || pathname === path;
  }

  const menuItems = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: SettingsIcon,
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
