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
import { Input, InputWrapper } from '@workspace/ui/components/input';
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
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
        <CardDescription>
          {success
            ? 'Your password has been reset'
            : 'Enter your new password below'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <Alert variant="success" appearance="light">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Your password has been successfully reset. You can now sign in
              with your new password.
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
              <InputFieldLabel>New Password</InputFieldLabel>
              <InputFieldControl error={!!errors.password}>
                <InputWrapper>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  <Button
                    type="button"
                    mode="icon"
                    variant="dim"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="-me-2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </InputWrapper>
              </InputFieldControl>
              <InputFieldError message={errors.password?.message} />
            </InputField>

            <InputField>
              <InputFieldLabel>Confirm New Password</InputFieldLabel>
              <InputFieldControl error={!!errors.confirmPassword}>
                <InputWrapper>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('confirmPassword')}
                  />
                  <Button
                    type="button"
                    mode="icon"
                    variant="dim"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="-me-2"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </InputWrapper>
              </InputFieldControl>
              <InputFieldError message={errors.confirmPassword?.message} />
            </InputField>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Resetting password...' : 'Reset password'}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {success ? (
          <Link
            href="/login"
            className="text-sm text-center text-primary hover:underline w-full"
          >
            Continue to login
          </Link>
        ) : (
          <div className="text-sm text-center text-muted-foreground">
            Remember your password?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
