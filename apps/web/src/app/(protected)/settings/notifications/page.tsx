import { NotificationsSettings } from '@/features/settings/components/notifications-settings';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Notification Settings - ${APP_NAME}`,
  description: 'Configure your notification preferences',
};

export default function NotificationsSettingsPage() {
  return <NotificationsSettings />;
}
