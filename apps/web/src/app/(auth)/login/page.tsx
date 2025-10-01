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
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Input, InputWrapper } from '@workspace/ui/components/input';
import {
  InputField,
  InputFieldControl,
  InputFieldError,
  InputFieldLabel,
} from '@workspace/ui/components/input-field';
import { Label } from '@workspace/ui/components/label';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod/v4';

const loginSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address' }),
  password: z.string().min(1, { error: 'Password is required' }),
  rememberMe: z.boolean().optional(),
});

const [useLoginForm] = createZodForm(loginSchema);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useLoginForm();

  const rememberMe = watch('rememberMe');

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError(null);
      // TODO: Implement login logic
      console.log('Login data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch {
      setError('Invalid email or password. Please try again.');
    }
  });

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
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
            <div className="flex items-center justify-between mb-2">
              <InputFieldLabel className="mb-0">Password</InputFieldLabel>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked) =>
                setValue('rememberMe', checked as boolean)
              }
            />
            <Label
              htmlFor="rememberMe"
              variant="secondary"
              className="cursor-pointer"
            >
              Remember me
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-primary hover:underline">
            Create account
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
