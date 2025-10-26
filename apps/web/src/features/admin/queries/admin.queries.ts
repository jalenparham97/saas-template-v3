import { authClient } from '@/lib/auth-client';
import { APP_ROUTES } from '@/lib/constants';
import { api } from '@/trpc/react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@workspace/ui/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function useAdminUsersQuery(params: {
  page: number;
  limit: number;
  search?: string;
  sortBy?: 'name' | 'email' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}) {
  return api.admin.getUsers.useQuery({
    page: params.page,
    limit: params.limit,
    search: params.search || undefined,
    sortBy: params.sortBy ?? 'createdAt',
    sortOrder: params.sortOrder ?? 'desc',
  });
}

export function useAdminUserQuery(userId: string) {
  return api.admin.getUserById.useQuery({ userId });
}

export function useBanUserMutation(userId: string) {
  const toast = useToast();
  const utils = api.useUtils();
  return api.admin.banUser.useMutation({
    onSuccess: () => {
      toast.add({ title: 'User banned successfully', data: { close: true } });
    },
    onError: (error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
    onSettled: () => {
      utils.admin.getUsers.invalidate();
      utils.admin.getUserById.invalidate({ userId });
    },
  });
}

export function useUnbanUserMutation(userId: string) {
  const toast = useToast();
  const utils = api.useUtils();
  return api.admin.unbanUser.useMutation({
    onSuccess: () => {
      toast.add({ title: 'User unbanned successfully', data: { close: true } });
    },
    onError: (error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
    onSettled: () => {
      utils.admin.getUsers.invalidate();
      utils.admin.getUserById.invalidate({ userId });
    },
  });
}

export function useUpdateUserRoleMutation(userId: string) {
  const toast = useToast();
  const utils = api.useUtils();
  return api.admin.updateUserRole.useMutation({
    onSuccess: () => {
      toast.add({ title: 'Role updated successfully', data: { close: true } });
    },
    onError: (error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
    onSettled: () => {
      utils.admin.getUsers.invalidate();
    },
  });
}

export function useRevokeUserSessionsMutation(userId: string) {
  const toast = useToast();
  const utils = api.useUtils();
  return api.admin.revokeUserSessions.useMutation({
    onSuccess: () => {
      toast.add({ title: 'All sessions revoked', data: { close: true } });
    },
    onError: (error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
    onSettled: () => {
      utils.admin.getUsers.invalidate();
      utils.admin.getUserById.invalidate({ userId });
    },
  });
}

export function useDeleteUserMutation() {
  const toast = useToast();
  const utils = api.useUtils();
  const router = useRouter();
  return api.admin.deleteUser.useMutation({
    onSuccess: () => {
      toast.add({ title: 'User deleted successfully', data: { close: true } });
      router.push('/admin/users');
    },
    onError: (error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
    onSettled: () => {
      utils.admin.getUsers.invalidate();
    },
  });
}

/**
 * Starts impersonating a user using Better Auth admin plugin
 */
export function useImpersonateUserMutation(userId: string) {
  const toast = useToast();
  const router = useRouter();
  const utils = api.useUtils();

  return useMutation({
    mutationFn: async () => {
      await authClient.admin.impersonateUser(
        { userId },
        {
          onSuccess: () => {
            // Navigate into the app as the impersonated user
            // window.location.replace(`/admin/users`);
            utils.admin.getUsers.invalidate();
            utils.user.getUser.invalidate();
            window.location.assign(
              `${window.location.origin}${APP_ROUTES.DASHBOARD}`
            );
          },
        }
      );
    },
    onError: (error: any) => {
      console.error(error);
      toast.add({
        title: 'Failed to impersonate',
        description: error?.message ?? 'Please try again.',
        type: 'error',
        data: { close: true },
      });
    },
    onSettled: () => {
      // Invalidate the users query to refetch fresh data
      utils.admin.getUsers.invalidate();
      utils.user.getUser.invalidate();
    },
  });
}

/**
 * Stops impersonating and returns to the admin account
 */
export function useStopImpersonatingMutation() {
  const toast = useToast();
  const utils = api.useUtils();

  return useMutation({
    mutationFn: async () => {
      const res = await authClient.admin.stopImpersonating(
        {},
        {
          onSuccess: () => {
            // Navigate back to the admin area
            utils.admin.getUsers.invalidate();
            utils.user.getUser.invalidate();
            window.location.assign(`${window.location.origin}/admin/users`);
          },
        }
      );
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data ?? null;
    },
    onError: (error: any) => {
      console.error(error);
      toast.add({
        title: 'Unable to stop impersonating',
        description:
          error?.message ?? 'You may not be impersonating currently.',
        type: 'error',
        data: { close: true },
      });
    },
    onSettled: () => {
      utils.admin.getUsers.invalidate();
      utils.user.getUser.invalidate();
    },
  });
}
