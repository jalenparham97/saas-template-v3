import { AdminSidebar } from '@/features/admin/components/admin-sidebar';
import { auth } from '@/lib/auth';
import { APP_NAME } from '@/lib/constants';
import {
  SidebarInset,
  SidebarProvider,
} from '@workspace/ui/components/sidebar';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: `Admin Panel - ${APP_NAME}`,
  description: 'Admin dashboard for managing users and platform operations',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Inline admin role protection to avoid adding new helpers
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role as string | undefined;
  const isAdmin = role === 'admin' || role === 'superadmin';
  if (!isAdmin) {
    redirect('/dashboard');
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
