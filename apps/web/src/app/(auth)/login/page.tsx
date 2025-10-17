'use client';

import { authClient } from '@/lib/auth-client';
import { APP_ROUTES } from '@/lib/constants';
import { createZodForm } from '@workspace/react-form';
import {
  Alert,
  AlertDescription,
  AlertIcon,
} from '@workspace/ui/components/alert';
import { Button } from '@workspace/ui/components/button';
import { Input, InputWrapper } from '@workspace/ui/components/input';
import {
  InputField,
  InputFieldControl,
  InputFieldError,
  InputFieldLabel,
} from '@workspace/ui/components/input-field';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod/v4';

const loginSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address' }),
  password: z.string().min(1, { error: 'Password is required' }),
});

const [useLoginForm] = createZodForm(loginSchema);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useLoginForm();

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setError('');
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: APP_ROUTES.DASHBOARD,
      fetchOptions: {
        onSuccess: () => {
          router.push(APP_ROUTES.DASHBOARD);
        },
        onError: (ctx) => {
          setError(ctx.error.message);
        },
      },
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center py-10">
      <div className="w-full space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {error && (
            <Alert variant="destructive" appearance="light">
              <AlertIcon>
                <AlertCircle className="h-4 w-4" />
              </AlertIcon>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <InputField>
            <InputFieldLabel>Email</InputFieldLabel>
            <InputFieldControl error={!!errors.email}>
              <Input type="email" autoComplete="email" {...register('email')} />
            </InputFieldControl>
            <InputFieldError message={errors.email?.message} />
          </InputField>
          <InputField>
            <div className="mb-2 flex items-center justify-between">
              <InputFieldLabel className="mb-0">Password</InputFieldLabel>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-primary underline-offset-4 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <InputFieldControl error={!!errors.password}>
              <InputWrapper>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password')}
                />
                <Button
                  type="button"
                  mode="icon"
                  variant="dim"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="-me-2"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </InputWrapper>
            </InputFieldControl>
            <InputFieldError message={errors.password?.message} />
          </InputField>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <div className="pt-2 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
