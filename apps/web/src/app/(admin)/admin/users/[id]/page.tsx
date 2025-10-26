import { AdminUserDetailView } from '@/features/admin/components/admin-user-detail-view';

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminUserDetailView id={id} />;
}
