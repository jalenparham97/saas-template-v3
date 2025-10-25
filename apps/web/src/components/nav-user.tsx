'use client';

import {
  BadgeCheck,
  ChevronDownIcon,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-react';

import { useAuth } from '@/features/auth/queries/auth.queries';
import { APP_ROUTES } from '@/lib/constants';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/ui/components/sidebar';
import { Skeleton } from '@workspace/ui/components/skeleton';
import Link from 'next/link';

export function NavUser() {
  const { signout, user } = useAuth();

  if (user?.isLoading || !user?.data) {
    return <Skeleton className="h-12 w-full bg-sidebar-accent" />;
  }

  const handleLogout = async () => {
    await signout();
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer w-auto">
              <Avatar className="size-6 rounded-lg">
                <AvatarImage src={user.data.image ?? ''} alt={user.data.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.data.name}</span>
                {/* <span className="truncate text-xs">{user.data.email}</span> */}
              </div>
              <ChevronDownIcon className="size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={'bottom'}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.data.image ?? ''}
                    alt={user.data.name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.data.name}</span>
                  <span className="truncate text-xs">{user.data.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={APP_ROUTES.SETTINGS}>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </Link>
              <Link href={`${APP_ROUTES.SETTINGS}/subscription`}>
                <DropdownMenuItem>
                  <CreditCard />
                  Subscription
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
