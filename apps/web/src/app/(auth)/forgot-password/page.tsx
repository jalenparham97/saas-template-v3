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
import { AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod/v4';

const forgotPasswordSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address' }),
});

const [useForgotPasswordForm] = createZodForm(forgotPasswordSchema);

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForgotPasswordForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError(null);
      // TODO: Implement forgot password logic
      console.log('Forgot password data:', data);
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
            Forgot password?
          </h1>
          <p className="text-sm text-muted-foreground">
            {success
              ? 'Check your email for a reset link'
              : 'Enter your email address to receive a reset link'}
          </p>
        </div>
        {success ? (
          <Alert variant="success" appearance="light">
            <AlertIcon>
              <CheckCircle2 className="h-4 w-4" />
            </AlertIcon>
            <AlertDescription>
              We&apos;ve sent a password reset link to your email address.
              Please check your inbox and follow the instructions.
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
              <InputFieldLabel>Email</InputFieldLabel>
              <InputFieldControl error={!!errors.email}>
                <Input
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                />
              </InputFieldControl>
              <InputFieldError message={errors.email?.message} />
            </InputField>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send reset link'}
            </Button>
          </form>
        )}
        <div className="pt-2 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
