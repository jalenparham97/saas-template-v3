'use client';

import { SettingsSection } from '@/features/settings/components/settings-section';
import {
  useNotificationPreferencesQuery,
  useUpdateNotificationPreferencesMutation,
} from '@/features/settings/queries/notifications.queries';
import { Controller, useZodForm } from '@workspace/react-form';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Label } from '@workspace/ui/components/label';
import { Separator } from '@workspace/ui/components/separator';
import { Switch } from '@workspace/ui/components/switch';
import { useEffect } from 'react';
import { z } from 'zod/v4';

const NotificationPreferencesSchema = z.object({
  accountUpdates: z.boolean(),
  productUpdates: z.boolean(),
  marketingEmails: z.boolean(),
});

type NotificationPreferencesFormData = z.infer<
  typeof NotificationPreferencesSchema
>;

export function NotificationsSettings() {
  const { data: preferences } = useNotificationPreferencesQuery();

  const updateMutation = useUpdateNotificationPreferencesMutation();

  const form = useZodForm({
    schema: NotificationPreferencesSchema,
    defaultValues: {
      accountUpdates: true,
      productUpdates: false,
      marketingEmails: false,
    },
  });

  // Update form values when preferences are loaded
  useEffect(() => {
    if (preferences) {
      form.reset({
        accountUpdates: preferences.accountUpdates,
        productUpdates: preferences.productUpdates,
        marketingEmails: preferences.marketingEmails,
      });
    }
  }, [preferences, form]);

  const handleSave = async (data: NotificationPreferencesFormData) => {
    await updateMutation.mutateAsync(data);
  };

  const isDirty = form.formState.isDirty;

  return (
    <div className="space-y-10">
      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">
            Email Notifications
          </h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Choose what notifications you want to receive via email.
          </p>
        </div>
        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Customize your email notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1 space-y-1">
                <Label>Account Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about your account activity and security.
                </p>
              </div>
              <Controller
                name="accountUpdates"
                control={form.control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={updateMutation.isPending}
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1 space-y-1">
                <Label>Product Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about new features and product updates.
                </p>
              </div>
              <Controller
                name="productUpdates"
                control={form.control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={updateMutation.isPending}
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1 space-y-1">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive promotional emails and special offers.
                </p>
              </div>
              <Controller
                name="marketingEmails"
                control={form.control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={updateMutation.isPending}
                  />
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="py-4">
            <Button
              onClick={form.handleSubmit(handleSave)}
              disabled={!isDirty || updateMutation.isPending}
              loading={updateMutation.isPending}
            >
              Save preferences
            </Button>
          </CardFooter>
        </Card>
      </SettingsSection>

      <Separator className="my-12" />

      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">
            Push Notifications
          </h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Manage your push notification preferences.
          </p>
        </div>
        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Push Notifications</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Control your push notification settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1 space-y-1">
                <Label>Desktop Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Show notifications on your desktop.
                </p>
              </div>
              <Switch disabled />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex-1 space-y-1">
                <Label>Mobile Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your mobile device.
                </p>
              </div>
              <Switch disabled />
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Push notifications coming soon.
          </CardFooter>
        </Card>
      </SettingsSection>
    </div>
  );
}
