import {
  authClient,
  removePasskey,
  sendChangeEmailVerificationEmail,
  sendEmailVerificationEmail,
  sendPasswordResetEmail,
} from '@/lib/auth-client';
import { APP_ROUTES } from '@/lib/constants';
import { api } from '@/trpc/react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@workspace/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';

export type QueryOptions = {
  showToast: boolean;
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
          title: 'Account updated',
          description: 'Your account has been successfully updated!',
          data: { close: true },
        });
      }
    },
    onError: (error, _, ctx) => {
      console.log(error);
      toast.add({
        title: 'Something went wrong!',
        description: 'An error occured while trying to update your profile.',
        data: { close: true },
        type: 'error',
      });
    },
    onSettled: async () => {
      await apiUtils.user.getUser.invalidate();
    },
  });
};

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

export function useRevokeAllUserSessionsMutation() {
  const apiUtils = api.useUtils();
  const router = useRouter();

  return api.user.revokeAllSessions.useMutation({
    onSuccess: () => {
      router.push(APP_ROUTES.LOGIN);
    },
    onError: (error) => {
      console.log(error);
      // toast.error('Something went wrong!', {
      //   description: error.message,
      //   closeButton: true,
      // });
    },
    onSettled: async () => {
      await apiUtils.user.getUser.invalidate();
    },
  });
}

export function useRevokeUserSessionMutation() {
  const apiUtils = api.useUtils();

  return api.user.revokeSession.useMutation({
    onSuccess: () => {
      // toast.success('Session revoked successfully');
      console.log('Session revoked successfully');
    },
    onError: (error) => {
      console.log(error);
      // toast.error('Something went wrong!', {
      //   description: error.message,
      //   closeButton: true,
      // });
    },
    onSettled: async () => {
      await apiUtils.user.getUser.invalidate();
    },
  });
}

export function useDeleteUserPasskeyMutation() {
  const apiUtils = api.useUtils();

  return useMutation({
    mutationFn: removePasskey,
    onSuccess: () => {
      // toast.success('Passkey deleted successfully');
      console.log('Passkey deleted successfully');
    },
    onError: (error) => {
      console.log(error);
      // toast.error('Something went wrong!', {
      //   description: error.message,
      //   closeButton: true,
      // });
    },
    onSettled: async () => {
      await apiUtils.user.getUser.invalidate();
    },
  });
}

export function useUserPasswordResetMutation({
  onSuccess: customOnSuccess,
  onError: customOnError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
} = {}) {
  return useMutation({
    mutationFn: async (params: { email: string }) => {
      return await sendPasswordResetEmail(params.email);
    },
    onSuccess: () => {
      const defaultOnSuccess = () => {
        // toast.success('Password reset email sent', {
        //   description: 'Please check your inbox for the email.',
        //   closeButton: true,
        //   duration: 10000,
        // });
      };
      if (customOnSuccess) {
        return customOnSuccess();
      }
      return defaultOnSuccess();
    },
    onError: (error) => {
      const defaultOnError = () => {
        console.log(error);
        // toast.error('Something went wrong!', {
        //   description: error.message,
        //   closeButton: true,
        // });
      };
      if (customOnError) {
        return customOnError(error);
      }
      return defaultOnError();
    },
  });
}

export function useChangeEmailMutation({
  onSuccess: customOnSuccess,
  onError: customOnError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
} = {}) {
  return useMutation({
    mutationFn: async (params: { newEmail: string }) => {
      return await sendChangeEmailVerificationEmail(params.newEmail);
    },
    onSuccess: (response) => {
      if (response.error) {
        // toast.error('Something went wrong!', {
        //   description: response.error.message,
        //   closeButton: true,
        // });
        return;
      }

      const defaultOnSuccess = () => {
        // toast.success('Email sent', {
        //   description: 'Please check your inbox for the email.',
        //   closeButton: true,
        //   duration: 10000,
        // });
      };
      if (customOnSuccess) {
        return customOnSuccess();
      }
      return defaultOnSuccess();
    },
    onError: (error) => {
      const defaultOnError = () => {
        console.log(error);
        // toast.error('Something went wrong!', {
        //   description: error.message,
        //   closeButton: true,
        // });
      };
      if (customOnError) {
        return customOnError(error);
      }
      return defaultOnError();
    },
  });
}

// export function useSubscriptions() {
//   return useQuery({
//     queryKey: ["subscriptions"],
//     queryFn: async () => {
//       const { data: subscriptions } = await authClient.subscription.list();
//       // get the active subscription
//       const activeSubscription = subscriptions?.find(
//         (sub) => sub.status === "active" || sub.status === "trialing",
//       );
//       return activeSubscription ?? null;
//     },
//   });
// }

export function useUserEmailVerificationMutation() {
  return useMutation({
    mutationFn: async (params: { email: string }) => {
      return await sendEmailVerificationEmail(params.email);
    },
    onSuccess: () => {
      // toast.success('Verification email sent', {
      //   description: 'Please check your inbox for the verification email.',
      //   closeButton: true,
      // });
      console.log('Verification email sent');
    },
    onError: (error) => {
      console.log(error);
      // toast.error('Something went wrong!', {
      //   description: error.message,
      //   closeButton: true,
      // });
    },
  });
}
