import { SecuritySettings } from '@/features/settings/components/security-settings';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Security Settings - ${APP_NAME}`,
  description: 'Update your security preferences',
};

export default function SecuritySettingsPage() {
  return <SecuritySettings />;
}
