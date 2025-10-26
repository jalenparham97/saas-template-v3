import { VerifyEmailView } from '@/features/auth/components/verify-email-view';
import { getAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function VerifyPage() {
  const session = await getAuthSession();

  // If the user is already verified, redirect to the dashboard
  if (session.user?.emailVerified) {
    redirect('/dashboard');
  }

  return <VerifyEmailView />;
}
