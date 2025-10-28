import { GeneralSettings } from '@/features/settings/components/general-settings';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `General Settings - ${APP_NAME}`,
  description: 'Manage your general account settings',
};

export default function GeneralSettingsPage() {
  return <GeneralSettings />;
}
