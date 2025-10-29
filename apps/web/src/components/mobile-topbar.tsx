'use client';

import { useStopImpersonatingMutation } from '@/features/admin/queries/admin.queries';
import { useAuth } from '@/features/auth/queries/auth.queries';
import { APP_ROUTES } from '@/lib/constants';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/avatar';
import { Button } from '@workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { SidebarTrigger } from '@workspace/ui/components/sidebar';
import { Skeleton } from '@workspace/ui/components/skeleton';
import {
  ArrowLeft,
  BadgeCheck,
  CreditCard,
  LogOut,
  Sparkles,
  UserXIcon,
} from 'lucide-react';
import Link from 'next/link';

export function MobileTopbar({
  showBackToApp = false,
}: {
  showBackToApp?: boolean;
}) {
  const { signout, user, session } = useAuth();
  const stopImpersonatinMutation = useStopImpersonatingMutation();

  const handleLogout = async () => {
    await signout();
  };

  return (
    <div className="md:hidden sticky top-0 z-30 w-full border-b bg-background px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" aria-label="Open sidebar" />
        </div>

        <div>
          {user?.isLoading || !user?.data ? (
            <Skeleton className="h-8 w-8 rounded-lg" />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 p-0">
                  <Avatar className="h-9 w-9 rounded-lg">
                    <AvatarImage
                      src={user.data.image ?? ''}
                      alt={user.data.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user.data.name?.[0]?.toUpperCase() ?? 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-56 rounded-lg"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user.data.image ?? ''}
                        alt={user.data.name}
                      />
                      <AvatarFallback className="rounded-lg">
                        {user.data.name?.[0]?.toUpperCase() ?? 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user.data.name}
                      </span>
                      <span className="truncate text-xs">
                        {user.data.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {showBackToApp ? (
                  <>
                    <DropdownMenuGroup>
                      <Link href={APP_ROUTES.DASHBOARD}>
                        <DropdownMenuItem>
                          <ArrowLeft />
                          Back to app
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                  </>
                ) : null}
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {session?.data?.impersonatedBy ? (
                    <DropdownMenuItem
                      onClick={async () =>
                        await stopImpersonatinMutation.mutateAsync()
                      }
                    >
                      <UserXIcon />
                      Stop impersonating
                    </DropdownMenuItem>
                  ) : null}
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
          )}
        </div>
      </div>
    </div>
  );
}
