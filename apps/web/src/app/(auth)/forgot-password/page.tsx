'use client';

import { createZodForm } from '@workspace/react-form';
import { Alert, AlertDescription } from '@workspace/ui/components/alert';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
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
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
        <CardDescription>
          {success
            ? 'Check your email for a reset link'
            : "Enter your email address and we'll send you a reset link"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <Alert variant="success" appearance="light">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              We&apos;ve sent a password reset link to your email address.
              Please check your inbox and follow the instructions to reset your
              password.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" appearance="light">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <InputField>
              <InputFieldLabel>Email</InputFieldLabel>
              <InputFieldControl error={!!errors.email}>
                <Input
                  type="email"
                  placeholder="john@example.com"
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
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
}
