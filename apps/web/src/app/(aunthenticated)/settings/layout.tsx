import { NavTab, NavTabs } from '@/components/nav-tabs';
import {
  PageContent,
  PageTitle,
  PageWrapper,
} from '@/components/page-structure';

const settingsNav = [
  { label: 'General', href: '/settings/general' },
  { label: 'Security', href: '/settings/security' },
  { label: 'Notifications', href: '/settings/notifications' },
  { label: 'Subscription', href: '/settings/subscription' },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <PageTitle>Settings</PageTitle>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </div>
        <NavTabs className="space-x-2">
          {settingsNav.map((item) => (
            <NavTab key={item.href} href={item.href} label={item.label} />
          ))}
        </NavTabs>
        <PageContent className="mt-6">{children}</PageContent>
      </div>
    </PageWrapper>
  );
}
