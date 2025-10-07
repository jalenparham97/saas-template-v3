'use client';

import { createZodForm } from '@workspace/react-form';
import {
  Alert,
  AlertDescription,
  AlertIcon,
} from '@workspace/ui/components/alert';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import {
  InputField,
  InputFieldControl,
  InputFieldError,
  InputFieldLabel,
} from '@workspace/ui/components/input-field';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod/v4';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { error: 'Password must be at least 8 characters' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        error:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const [useResetPasswordForm] = createZodForm(resetPasswordSchema);

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useResetPasswordForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError(null);
      // TODO: Implement reset password logic
      console.log('Reset password data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch {
      setError('An error occurred. Please try again.');
    }
  });

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center py-10">
      <div className="w-full space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset password
          </h1>
          <p className="text-sm text-muted-foreground">
            {success
              ? 'Your password has been reset'
              : 'Enter your new password below'}
          </p>
        </div>
        {success ? (
          <Alert variant="success" appearance="light">
            <AlertIcon>
              <CheckCircle2 className="h-4 w-4" />
            </AlertIcon>
            <AlertDescription>
              Your password has been successfully reset. You can now sign in
              with your new password.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive" appearance="light">
                <AlertIcon>
                  <AlertCircle className="h-4 w-4" />
                </AlertIcon>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <InputField>
              <InputFieldLabel>New Password</InputFieldLabel>
              <InputFieldControl error={!!errors.password}>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    {...register('password')}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    mode="icon"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </InputFieldControl>
              <InputFieldError message={errors.password?.message} />
            </InputField>
            <InputField>
              <InputFieldLabel>Confirm New Password</InputFieldLabel>
              <InputFieldControl error={!!errors.confirmPassword}>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    {...register('confirmPassword')}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    mode="icon"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    aria-label={
                      showConfirmPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </InputFieldControl>
              <InputFieldError message={errors.confirmPassword?.message} />
            </InputField>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Resetting password...' : 'Reset password'}
            </Button>
          </form>
        )}
        <div className="pt-2 text-center text-sm text-muted-foreground">
          {success ? (
            <Link
              href="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Continue to login
            </Link>
          ) : (
            <>
              Remember your password?{' '}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
