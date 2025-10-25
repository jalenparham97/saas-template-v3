'use client';

import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center py-10">
      <ResetPasswordForm />
    </div>
  );
}
