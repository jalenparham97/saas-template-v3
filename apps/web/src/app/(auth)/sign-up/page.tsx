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
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod/v4';

const signUpSchema = z.object({
  name: z.string().min(2, { error: 'Name must be at least 2 characters' }),
  email: z.email({ error: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { error: 'Password must be at least 8 characters' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      error:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }),
});

const [useSignUpForm] = createZodForm(signUpSchema);

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useSignUpForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError(null);
      // TODO: Implement sign-up logic
      console.log('Sign up data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch {
      setError('An error occurred. Please try again.');
    }
  });

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive" appearance="light">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <InputField>
            <InputFieldLabel>Name</InputFieldLabel>
            <InputFieldControl error={!!errors.name}>
              <Input type="text" placeholder="John Doe" {...register('name')} />
            </InputFieldControl>
            <InputFieldError message={errors.name?.message} />
          </InputField>

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

          <InputField>
            <InputFieldLabel>Password</InputFieldLabel>
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
