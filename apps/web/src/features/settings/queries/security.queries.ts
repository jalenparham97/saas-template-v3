import { useAuth } from '@/features/auth/queries/auth.queries';
import { authClient } from '@/lib/auth-client';
import { ChangePasswordSchema } from '@/schemas/auth.schemas';
import { api } from '@/trpc/react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@workspace/ui/hooks/use-toast';
import { z } from 'zod/v4';

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

/**
 * Mutation to change the user's password
 * Validates current password and replaces it with a new password
 * Optionally revokes all other active sessions for security
 */
export const useChangePasswordMutation = () => {
  const toast = useToast();

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
    onSuccess: () => {
      toast.add({
        title: 'Password changed',
        description: 'Your password has been changed successfully.',
        data: { close: true },
      });
    },
    onError: (error) => {
      console.error('Password change failed:', error);
      toast.add({
        title: 'Password change failed',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
  });
};

/**
 * Mutation to sign out all devices/sessions
 * Useful for security - signs out the user from all active sessions
 */
export const useSignOutAllDevicesMutation = () => {
  const toast = useToast();

  const { signout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      // Sign out from all sessions
      await signout();
    },
    onError: (error) => {
      console.error('Sign out failed:', error);
      toast.add({
        title: 'Sign out failed',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
  });
};

/**
 * Mutation to set a password for a user who only has social/OAuth providers
 * This enables credential-based login for the user
 */
// export const useSetPasswordMutation = () => {
//   return useMutation({
//     mutationFn: async (password: string) => {
//       // Call Better Auth's setPassword client method
//       const { data, error } = await authClient.setPassword({
//         newPassword: password,
//       });

//       if (error) {
//         throw new Error(error.message || 'Failed to set password');
//       }

//       return data;
//     },
//     onError: (error) => {
//       console.error('Set password failed:', error);
//     },
//   });
// };

/**
 * Mutation to disconnect a connected account (OAuth provider)
 * This removes the provider link from the user's account
 */
export const useDisconnectAccountMutation = () => {
  const toast = useToast();
  const utils = api.useUtils();

  return useMutation({
    mutationFn: async (providerId: string) => {
      const response = await authClient.unlinkAccount({
        providerId,
      });

      if (response.error) {
        throw new Error(
          response.error.message || 'Failed to disconnect account'
        );
      }

      return response;
    },
    onSuccess: () => {
      toast.add({
        title: 'Account disconnected',
        description: 'The account has been disconnected successfully.',
        data: { close: true },
      });
    },
    onError: (error) => {
      console.error('Disconnect account failed:', error);
      toast.add({
        title: 'Disconnect account failed',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
    onSettled: () => {
      utils.user.getUser.invalidate();
    },
  });
};
