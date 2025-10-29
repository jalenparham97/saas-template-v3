import { AppSidebar } from '@/components/app-sidebar';
import { MobileTopbar } from '@/components/mobile-topbar';
import {
  SidebarInset,
  SidebarProvider,
} from '@workspace/ui/components/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <MobileTopbar />
        <div className="flex flex-1 flex-col gap-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
