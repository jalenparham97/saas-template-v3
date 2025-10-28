import { DashboardView } from '@/features/dashboard/components/dashboard-view';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Dashboard - ${APP_NAME}`,
  description: 'View your account overview and recent activity',
};

export default function DashboardPage() {
  return <DashboardView />;
}
