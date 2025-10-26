'use client';

import GoogleIconSvg from '@/components/icons/google-icon.svg';
import {
  createAvatarImage,
  useUserUpdateMutation,
} from '@/features/auth/queries/auth.queries';
import { authClient, signInWithProvider } from '@/lib/auth-client';
import { useZodForm } from '@workspace/react-form';
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
import type { User } from 'better-auth';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useZodForm({ schema: signUpSchema });

  const updateUserMutation = useUserUpdateMutation();

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    setError(null);
    await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: `/verify?email=${encodeURIComponent(data.email)}`,
      fetchOptions: {
        onSuccess: async (ctx) => {
          const user = ctx.data.user as User;
          // Generate the user image
          const userImage = await createAvatarImage(data.name, user.id);
          // Update the user image in the database
          await updateUserMutation.mutateAsync({
            image: userImage,
          });
          router.push(`/verify?email=${encodeURIComponent(data.email)}`);
        },
        onError: (ctx) => {
          setError(ctx.error.message);
        },
      },
    });
  }

  async function handleGoogleSignUp() {
    setIsGoogleLoading(true);
    try {
      await signInWithProvider('google');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to sign up with Google'
      );
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to get started
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
          <InputFieldLabel>Name</InputFieldLabel>
          <InputFieldControl error={!!errors.name}>
            <Input type="text" {...register('name')} />
          </InputFieldControl>
          <InputFieldError message={errors.name?.message} />
        </InputField>

        <InputField>
          <InputFieldLabel>Email</InputFieldLabel>
          <InputFieldControl error={!!errors.email}>
            <Input type="email" autoComplete="email" {...register('email')} />
          </InputFieldControl>
          <InputFieldError message={errors.email?.message} />
        </InputField>

        <InputField>
          <InputFieldLabel>Password</InputFieldLabel>
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
                variant="dim"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>
          </InputFieldControl>
          <InputFieldError message={errors.password?.message} />
        </InputField>

        <Button type="submit" className="w-full" loading={isSubmitting}>
          Create account
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted-foreground/20" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignUp}
          disabled={isGoogleLoading}
        >
          <Image
            alt="Sign up with Google"
            src={GoogleIconSvg}
            className="size-4"
          />
          Google
        </Button>
      </form>

      <div className="pt-2 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
