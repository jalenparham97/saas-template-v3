import { AdminUsersView } from '@/features/admin/components/admin-users-view';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `User Management - ${APP_NAME}`,
  description: 'Manage users and permissions',
};

export default function AdminUsersPage() {
  return <AdminUsersView />;
}
