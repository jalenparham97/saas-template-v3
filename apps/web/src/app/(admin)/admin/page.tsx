import { AdminOverviewView } from '@/features/admin/components/admin-overview-view';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Admin Dashboard - ${APP_NAME}`,
  description: 'Overview of platform operations',
};

export default async function AdminPage() {
  return <AdminOverviewView />;
}
