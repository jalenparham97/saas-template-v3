import { api } from '@/trpc/react';
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
