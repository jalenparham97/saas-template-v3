'use client';

import { useAuth } from '@/features/auth/queries/auth.queries';
import { authClient } from '@/lib/auth-client';
import { ChangePasswordSchema } from '@/schemas/auth.schemas';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod/v4';

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

/**
 * Mutation to change the user's password
 * Validates current password and replaces it with a new password
 * Optionally revokes all other active sessions for security
 */
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: async (input: ChangePasswordInput) => {
      // Validate input with schema
      const validated = ChangePasswordSchema.parse(input);

      // Call Better Auth's changePassword client method
      const { data, error } = await authClient.changePassword({
        newPassword: validated.newPassword,
        currentPassword: validated.currentPassword,
        revokeOtherSessions: true, // Security: revoke other sessions on password change
      });

      if (error) {
        throw new Error(error.message || 'Failed to change password');
      }

      return data;
    },
    onError: (error) => {
      console.error('Password change failed:', error);
    },
  });
};

/**
 * Mutation to sign out all devices/sessions
 * Useful for security - signs out the user from all active sessions
 */
export const useSignOutAllDevicesMutation = () => {
  const { signout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      // Sign out from all sessions
      await signout();
    },
    onError: (error) => {
      console.error('Sign out failed:', error);
    },
  });
};
