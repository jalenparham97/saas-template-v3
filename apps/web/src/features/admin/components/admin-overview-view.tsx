'use client';

import {
  PageContent,
  PageTitle,
  PageWrapper,
} from '@/components/page-structure';
import { api } from '@/trpc/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Skeleton } from '@workspace/ui/components/skeleton';
import {
  TrendingUpIcon,
  UserCheckIcon,
  UserXIcon,
  UsersIcon,
} from 'lucide-react';

export function AdminOverviewView() {
  const { data: stats, isLoading } = api.admin.getUserStats.useQuery();

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.total ?? 0,
      icon: UsersIcon,
      description: 'All registered users',
      variant: 'primary' as const,
    },
    {
      title: 'Verified Users',
      value: stats?.verified ?? 0,
      icon: UserCheckIcon,
      description: 'Email verified accounts',
      variant: 'success' as const,
    },
    {
      title: 'New (30 days)',
      value: stats?.totalLast30Days ?? 0,
      icon: TrendingUpIcon,
      description: `${stats?.totalLast7Days ?? 0} in last 7 days`,
      variant: 'info' as const,
    },
    {
      title: 'Banned Users',
      value: stats?.banned ?? 0,
      icon: UserXIcon,
      description: 'Currently restricted',
      variant: 'destructive' as const,
    },
  ];

  const chipColor: Record<(typeof statCards)[number]['variant'], string> = {
    primary:
      'text-blue-600 bg-blue-50 dark:bg-blue-950 ring-1 ring-blue-200/60 dark:ring-blue-900',
    success:
      'text-emerald-600 bg-emerald-50 dark:bg-emerald-950 ring-1 ring-emerald-200/60 dark:ring-emerald-900',
    info: 'text-violet-600 bg-violet-50 dark:bg-violet-950 ring-1 ring-violet-200/60 dark:ring-violet-900',
    destructive:
      'text-rose-600 bg-rose-50 dark:bg-rose-950 ring-1 ring-rose-200/60 dark:ring-rose-900',
  };

  const glowColor: Record<(typeof statCards)[number]['variant'], string> = {
    primary: 'from-blue-500/15',
    success: 'from-emerald-500/15',
    info: 'from-violet-500/15',
    destructive: 'from-rose-500/15',
  };

  const dotColor: Record<(typeof statCards)[number]['variant'], string> = {
    primary: 'bg-blue-500/60',
    success: 'bg-emerald-500/60',
    info: 'bg-violet-500/60',
    destructive: 'bg-rose-500/60',
  };

  return (
    <PageWrapper>
      <div>
        <PageTitle>Admin Overview</PageTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Platform statistics and metrics
        </p>
      </div>
      <PageContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                variant="accent"
                className="relative overflow-hidden"
              >
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="h-4 w-24" />
                  </CardTitle>
                  <div className="rounded-md p-2 shrink-0">
                    <Skeleton className="h-5 w-5 rounded" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold tracking-tight">
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Skeleton className="h-3 w-40" />
                  </div>
                </CardContent>
              </Card>
            ))}

          {!isLoading &&
            statCards.map((stat) => (
              <Card
                key={stat.title}
                variant="accent"
                className="relative overflow-hidden"
              >
                <div
                  className={
                    'pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br to-transparent blur-2xl ' +
                    glowColor[stat.variant]
                  }
                />
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={
                      'rounded-md p-2 shrink-0 ' + chipColor[stat.variant]
                    }
                  >
                    <stat.icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-semibold tracking-tight">
                      {stat.value}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                      className={`inline-block size-1.5 rounded-full ${dotColor[stat.variant]}`}
                    />
                    <span>{stat.description}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </PageContent>
    </PageWrapper>
  );
}
