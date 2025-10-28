import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Reset Password - ${APP_NAME}`,
  description: 'Enter a new password',
};

// This page relies on URL search params (e.g., `?token=`) via a Client Component.
// During static prerender (build-time), there is no request URL, which can cause
// Next.js to throw a prerender error. Mark the route as dynamic so it renders
// at request-time instead of being statically exported.
export const dynamic = 'force-dynamic';

export default async function ResetPasswordPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center py-10">
      <ResetPasswordForm />
    </div>
  );
}
