import {
  PageContent,
  PageTitle,
  PageWrapper,
} from '@/components/page-structure';

export function DashboardView() {
  return (
    <PageWrapper>
      <PageTitle>Dashboard</PageTitle>

      <PageContent>
        <p className="text-muted-foreground">
          Welcome back. This is your dashboard overview.
        </p>
      </PageContent>
    </PageWrapper>
  );
}
