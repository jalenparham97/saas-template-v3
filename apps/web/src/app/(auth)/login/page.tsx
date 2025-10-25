'use client';

import { LoginForm } from '@/features/auth/components/login-form';

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center py-10">
      <LoginForm />
    </div>
  );
}
