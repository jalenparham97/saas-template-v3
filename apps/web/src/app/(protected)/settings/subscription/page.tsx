import { SubscriptionSettings } from '@/features/settings/components/subscription-settings';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Subscription Settings - ${APP_NAME}`,
  description: 'Manage your subscription and billing',
};

export default function SubscriptionSettingsPage() {
  return <SubscriptionSettings />;
}
