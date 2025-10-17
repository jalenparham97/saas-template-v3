'use client';

import { env } from '@/env';
import { authClient } from '@/lib/auth-client';
import { APP_ROUTES } from '@/lib/constants';
import { nanoid } from '@/lib/nanoid';
import { useUserUpdateMutation } from '@/queries/user.queries';
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod/v4';

/**
 * Asynchronously generates an avatar image for a user by sending a POST request to the avatar API.
 *
 * @param seed - A string used to seed the avatar generation process.
 * @param uniqueIdentifier - The unique identifier of the user for whom the avatar is being generated.
 * @returns A promise that resolves to the URL of the generated avatar image.
 * @throws Will throw an error if the upload fails or the response is not OK.
 */
export const createAvatarImage = async (
  seed: string,
  uniqueIdentifier: string
) => {
  const res = await fetch(`${env.NEXT_PUBLIC_APP_BASE_URL}/api/upload/avatar`, {
    method: 'POST',
    body: JSON.stringify({
      seed,
      key: `users/${uniqueIdentifier}/${nanoid(10)}.svg`,
    }),
  });
  // Check if the upload was successful
  if (!res.ok) {
    throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
  }
  // // Get the image URL from the response
  const response = await res.json();
  // Return the image URL
  return response.url as string;
};

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

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      callbackURL: APP_ROUTES.DASHBOARD,
      fetchOptions: {
        onSuccess: async (ctx) => {
          const user = ctx.data.user as User;
          // Generate the user image
          const userImage = await createAvatarImage(data.name, user.id);
          // Update the user image in the database
          await updateUserMutation.mutateAsync({
            image: userImage,
          });
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
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
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
    </div>
  );
}
