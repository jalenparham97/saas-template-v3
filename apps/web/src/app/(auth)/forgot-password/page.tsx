import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Forgot Password - ${APP_NAME}`,
  description: 'Reset your password',
};

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center py-10">
      <ForgotPasswordForm />
    </div>
  );
}
