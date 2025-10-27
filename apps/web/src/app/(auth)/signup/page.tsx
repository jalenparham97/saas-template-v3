import { SignUpForm } from '@/features/auth/components/signup-form';

export default function SignUpPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center py-10">
      <SignUpForm />
    </div>
  );
}
