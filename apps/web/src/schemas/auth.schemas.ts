import { z } from 'zod/v4';

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: 'Email is required.',
    })
    .trim(),
  password: z.string().min(1, { error: 'Password is required.' }).trim(),
});

export const SignupSchema = z.object({
  name: z.string().min(1, { error: 'Full name is required.' }).trim(),
  email: z
    .email({
      error: 'Email is required.',
    })
    .trim(),
  password: z
    .string()
    .min(1, { error: 'Password is required.' })
    .max(24, { error: 'Password must be between 1 and 24 characters.' })
    .trim(),
});
