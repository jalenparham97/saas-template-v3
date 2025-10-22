'use client';

import { api } from '@/trpc/react';

export const useNotificationPreferencesQuery = () => {
  return api.notifications.getPreferences.useQuery();
};

export const useUpdateNotificationPreferencesMutation = () => {
  const utils = api.useUtils();

  return api.notifications.updatePreferences.useMutation({
    onSuccess: () => {
      // Invalidate the preferences query to refetch fresh data
      utils.notifications.getPreferences.invalidate();
    },
    onError: (error) => {
      console.error('Failed to update notification preferences:', error);
    },
  });
};
