import {
  PageContent,
  PageTitle,
  PageWrapper,
} from '@/components/page-structure';
import { api } from '@/trpc/server';
import { Badge } from '@workspace/ui/components/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import {
  TrendingUpIcon,
  UserCheckIcon,
  UserXIcon,
  UsersIcon,
} from 'lucide-react';

export async function AdminOverviewView() {
  const stats = await api.admin.getUserStats();

  const statCards = [
    {
      title: 'Total Users',
      value: stats.total,
      icon: UsersIcon,
      description: 'All registered users',
      variant: 'primary' as const,
    },
    {
      title: 'Verified Users',
      value: stats.verified,
      icon: UserCheckIcon,
      description: 'Email verified accounts',
      variant: 'success' as const,
    },
    {
      title: 'New (30 days)',
      value: stats.totalLast30Days,
      icon: TrendingUpIcon,
      description: `${stats.totalLast7Days} in last 7 days`,
      variant: 'info' as const,
    },
    {
      title: 'Banned Users',
      value: stats.banned,
      icon: UserXIcon,
      description: 'Currently restricted',
      variant: 'destructive' as const,
    },
  ];

  return (
    <PageWrapper>
      <PageTitle>Admin Overview</PageTitle>
      <p className="text-sm text-muted-foreground mt-1">
        Platform statistics and metrics
      </p>
      <PageContent className="mt-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <Badge variant={stat.variant} appearance="light" size="sm">
                    {stat.variant === 'success' ? 'Active' : stat.variant}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContent>
    </PageWrapper>
  );
}
