import { VerifyEmailView } from '@/features/auth/components/verify-email-view';
import { getAuthSession } from '@/lib/auth';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: `Verify Email - ${APP_NAME}`,
  description: 'Verify your email address',
};

export default async function VerifyPage() {
  const session = await getAuthSession();

  // If the user is already verified, redirect to the dashboard
  if (session.user?.emailVerified) {
    redirect('/dashboard');
  }

  return <VerifyEmailView />;
}
