import { env } from '@/env';
import {
  authClient,
  removePasskey,
  sendChangeEmailVerificationEmail,
  sendEmailVerificationEmail,
  sendPasswordResetEmail,
} from '@/lib/auth-client';
import { APP_ROUTES } from '@/lib/constants';
import { nanoid } from '@/lib/nanoid';
import { api } from '@/trpc/react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@workspace/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';

export type QueryOptions = {
  showToast: boolean;
};

/**
 * Generates an avatar image for a user by sending a POST request to the avatar API.
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
  // Get the image URL from the response
  const response = await res.json();
  // Return the image URL
  return response.url as string;
};

/**
 * Mutation for generating and uploading an avatar image
 */
export const useCreateAvatarImageMutation = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: async (params: { seed: string; uniqueIdentifier: string }) => {
      return await createAvatarImage(params.seed, params.uniqueIdentifier);
    },
    onError: (error) => {
      console.log(error);
      toast.add({
        title: 'Something went wrong!',
        description: 'Failed to generate avatar image.',
        data: { close: true },
        type: 'error',
      });
    },
  });
};

export function useUser() {
  return api.user.getUser.useQuery();
}

export function useUserCurrentSession() {
  return api.user.getActiveSession.useQuery();
}

export const useUserUpdateMutation = (options?: QueryOptions) => {
  const toast = useToast();
  const apiUtils = api.useUtils();

  return api.user.updateUser.useMutation({
    onSuccess: () => {
      if (options?.showToast) {
        toast.add({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully.',
          data: { close: true },
        });
      }
    },
    onError: (error) => {
      console.log(error);
      toast.add({
        title: 'Something went wrong!',
        description: 'Failed to update your profile.',
        data: { close: true },
        type: 'error',
      });
    },
    onSettled: async () => {
      await apiUtils.user.getUser.invalidate();
    },
  });
};

/**
 * Sends a password reset email
 */
export function useUserPasswordResetMutation({
  onSuccess: customOnSuccess,
  onError: customOnError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
} = {}) {
  const toast = useToast();

  return useMutation({
    mutationFn: async (params: { email: string }) => {
      return await sendPasswordResetEmail(params.email);
    },
    onSuccess: () => {
      const defaultOnSuccess = () => {
        toast.add({
          title: 'Email sent',
          description: 'Password reset email has been sent to your inbox.',
          data: { close: true },
          type: 'success',
        });
      };
      if (customOnSuccess) {
        return customOnSuccess();
      }
      return defaultOnSuccess();
    },
    onError: (error) => {
      const defaultOnError = () => {
        console.log(error);
        toast.add({
          title: 'Something went wrong!',
          description: 'Failed to send password reset email.',
          data: { close: true },
          type: 'error',
        });
      };
      if (customOnError) {
        return customOnError(error);
      }
      return defaultOnError();
    },
  });
}

/**
 * Sends a change email verification email
 */
export function useChangeEmailMutation({
  onSuccess: customOnSuccess,
  onError: customOnError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
} = {}) {
  const toast = useToast();

  return useMutation({
    mutationFn: async (params: { newEmail: string }) => {
      return await sendChangeEmailVerificationEmail(params.newEmail);
    },
    onSuccess: (response) => {
      if (response.error) {
        toast.add({
          title: 'Something went wrong!',
          description: response.error.message,
          data: { close: true },
          type: 'error',
        });
        return;
      }

      const defaultOnSuccess = () => {
        toast.add({
          title: 'Email sent',
          description: 'Verification email has been sent to your inbox.',
          data: { close: true },
        });
      };
      if (customOnSuccess) {
        return customOnSuccess();
      }
      return defaultOnSuccess();
    },
    onError: (error) => {
      const defaultOnError = () => {
        console.log(error);
        toast.add({
          title: 'Something went wrong!',
          description: 'Failed to send email verification.',
          data: { close: true },
          type: 'error',
        });
      };
      if (customOnError) {
        return customOnError(error);
      }
      return defaultOnError();
    },
  });
}

/**
 * Sends an email verification email
 */
export function useUserEmailVerificationMutation() {
  const toast = useToast();

  return useMutation({
    mutationFn: async (params: { email: string }) => {
      return await sendEmailVerificationEmail(params.email);
    },
    onSuccess: () => {
      toast.add({
        title: 'Verification email sent',
        description: 'Please check your inbox for the verification email.',
        data: { close: true },
      });
    },
    onError: (error) => {
      console.log(error);
      toast.add({
        title: 'Something went wrong!',
        description: 'Failed to send verification email.',
        data: { close: true },
        type: 'error',
      });
    },
  });
}

/**
 * Deletes the user's account
 */
export function useUserDeleteAccountMutation() {
  const toast = useToast();

  return useMutation({
    mutationFn: async () => {
      await authClient.deleteUser({
        callbackURL: APP_ROUTES.LOGIN,
      });
    },
    onSuccess: () => {
      toast.add({
        title: 'Account deleted',
        description: 'Your account has been successfully deleted.',
        data: { close: true },
      });
    },
    onError: (error) => {
      console.log(error);
      toast.add({
        title: 'Something went wrong!',
        description: 'An error occurred while trying to delete your account.',
        data: { close: true },
        type: 'error',
      });
    },
  });
}

/**
 * Revokes all user sessions
 */
export function useRevokeAllUserSessionsMutation() {
  const toast = useToast();
  const apiUtils = api.useUtils();
  const router = useRouter();

  return api.user.revokeAllSessions.useMutation({
    onSuccess: () => {
      router.push(APP_ROUTES.LOGIN);
    },
    onError: (error) => {
      console.log(error);
      toast.add({
        title: 'Something went wrong!',
        description: 'Failed to revoke all sessions.',
        data: { close: true },
        type: 'error',
      });
    },
    onSettled: async () => {
      await apiUtils.user.getUser.invalidate();
    },
  });
}

/**
 * Revokes a specific user session
 */
export function useRevokeUserSessionMutation() {
  const toast = useToast();
  const apiUtils = api.useUtils();
  const router = useRouter();

  return api.user.revokeSession.useMutation({
    onSuccess: () => {
      router.push(APP_ROUTES.LOGIN);
    },
    onError: (error) => {
      console.log(error);
      toast.add({
        title: 'Something went wrong!',
        description: 'Failed to revoke session.',
        data: { close: true },
        type: 'error',
      });
    },
    onSettled: async () => {
      await apiUtils.user.getUser.invalidate();
    },
  });
}

/**
 * Deletes a user's passkey
 */
export function useDeleteUserPasskeyMutation() {
  const toast = useToast();
  const apiUtils = api.useUtils();

  return useMutation({
    mutationFn: removePasskey,
    onSuccess: () => {
      toast.add({
        title: 'Passkey deleted',
        description: 'Your passkey has been successfully deleted.',
        data: { close: true },
      });
    },
    onError: (error) => {
      console.log(error);
      toast.add({
        title: 'Something went wrong!',
        description: 'Failed to delete passkey.',
        data: { close: true },
        type: 'error',
      });
    },
    onSettled: async () => {
      await apiUtils.user.getUser.invalidate();
    },
  });
}

/**
 * Hook that provides signout function and user/session data
 */
export function useAuth() {
  const toast = useToast();
  const router = useRouter();
  const user = useUser();
  const session = useUserCurrentSession();

  const signout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(APP_ROUTES.LOGIN);
        },
        onError: (ctx) => {
          console.error('Signout error:', ctx.error.message);
          toast.add({
            title: 'Something went wrong!',
            description: 'An error occurred while trying to sign you out.',
            data: { close: true },
            type: 'error',
          });
        },
      },
    });
  };

  return {
    signout,
    user: {
      data: user.data,
      isLoading: user.isLoading,
      error: user.error,
    },
    session: {
      data: session.data?.session,
      isLoading: session.isLoading,
      error: session.error,
    },
  };
}
