import { SignUpForm } from '@/features/auth/components/signup-form';
import { APP_NAME } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Sign Up - ${APP_NAME}`,
  description: 'Create a new account',
};

export default function SignUpPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center py-10">
      <SignUpForm />
    </div>
  );
}
