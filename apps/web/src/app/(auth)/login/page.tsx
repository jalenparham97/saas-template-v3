import { LoginForm } from '@/features/auth/components/login-form';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Login - ${APP_NAME}`,
  description: 'Sign in to your account',
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center py-10">
      <LoginForm />
    </div>
  );
}
