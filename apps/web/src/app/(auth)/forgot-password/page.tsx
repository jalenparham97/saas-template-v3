'use client';

import { ForgotPasswordForm } from '@/features/auth/components/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center py-10">
      <ForgotPasswordForm />
    </div>
  );
}
