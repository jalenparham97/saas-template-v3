import { api } from '@/trpc/react';
import { useToast } from '@workspace/ui/hooks/use-toast';

export function useAdminUsersQuery(params: {
  page: number;
  limit: number;
  search?: string;
}) {
  return api.admin.getUsers.useQuery({
    page: params.page,
    limit: params.limit,
    search: params.search || undefined,
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
      utils.admin.getUserById.invalidate({ userId });
    },
    onError: (error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
  });
}

export function useUnbanUserMutation(userId: string) {
  const toast = useToast();
  const utils = api.useUtils();
  return api.admin.unbanUser.useMutation({
    onSuccess: () => {
      toast.add({ title: 'User unbanned successfully', data: { close: true } });
      utils.admin.getUserById.invalidate({ userId });
    },
    onError: (error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
  });
}

export function useUpdateUserRoleMutation(userId: string) {
  const toast = useToast();
  const utils = api.useUtils();
  return api.admin.updateUserRole.useMutation({
    onSuccess: () => {
      toast.add({ title: 'Role updated successfully', data: { close: true } });
      utils.admin.getUserById.invalidate({ userId });
    },
    onError: (error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
  });
}

export function useRevokeUserSessionsMutation(userId: string) {
  const toast = useToast();
  const utils = api.useUtils();
  return api.admin.revokeUserSessions.useMutation({
    onSuccess: () => {
      toast.add({ title: 'All sessions revoked', data: { close: true } });
      utils.admin.getUserById.invalidate({ userId });
    },
    onError: (error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
  });
}

export function useDeleteUserMutation() {
  const toast = useToast();
  return api.admin.deleteUser.useMutation({
    onSuccess: () => {
      toast.add({ title: 'User deleted successfully', data: { close: true } });
    },
    onError: (error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        type: 'error',
        data: { close: true },
      });
    },
  });
}
