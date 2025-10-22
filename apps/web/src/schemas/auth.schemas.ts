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

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: 'Current password is required.' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .max(24, { message: 'Password must be at most 24 characters.' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your new password.' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'New password must be different from current password.',
    path: ['newPassword'],
  });
