import { AdminUserDetailView } from '@/features/admin/components/admin-user-detail-view';

export default function UserDetailPage({ params }: { params: { id: string } }) {
  return <AdminUserDetailView id={params.id} />;
}
