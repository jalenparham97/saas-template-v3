'use client';

import { DeleteDialog } from '@/components/delete-dialog';
import GoogleIcon from '@/components/icons/google-icon.svg';
import {
  useUser,
  useUserPasswordResetMutation,
} from '@/features/auth/queries/auth.queries';
import { SettingsSection } from '@/features/settings/components/settings-section';
import {
  useChangePasswordMutation,
  useDisconnectAccountMutation,
  useSignOutAllDevicesMutation,
} from '@/features/settings/queries/security.queries';
import { ChangePasswordSchema } from '@/schemas/auth.schemas';
import { useZodForm } from '@workspace/react-form';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@workspace/ui/components/alert';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import {
  InputField,
  InputFieldControl,
  InputFieldError,
  InputFieldLabel,
} from '@workspace/ui/components/input-field';
import { Separator } from '@workspace/ui/components/separator';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import type { z } from 'zod/v4';

type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

export function SecuritySettings() {
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const form = useZodForm({
    schema: ChangePasswordSchema,
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const userQuery = useUser();

  const changePasswordMutation = useChangePasswordMutation();
  const signOutAllMutation = useSignOutAllDevicesMutation();
  const disconnectAccountMutation = useDisconnectAccountMutation();
  const passwordResetMutation = useUserPasswordResetMutation();

  const handleChangePassword = async (data: ChangePasswordFormData) => {
    await changePasswordMutation.mutateAsync(data);
    setPasswordChangeSuccess(true);
    form.reset();
  };

  const handleSendPasswordResetEmail = async () => {
    if (!userQuery.data?.email) return;
    await passwordResetMutation.mutateAsync({
      email: userQuery.data.email,
    });
  };

  const handleSignOutAllDevices = async () => {
    await signOutAllMutation.mutateAsync();
  };

  const handleDisconnectAccount = async (providerId: string) => {
    await disconnectAccountMutation.mutateAsync(providerId);
  };

  // Connected accounts (exclude credential provider)
  const connectedAccounts =
    userQuery.data?.accounts.filter((acc) => acc.providerId !== 'credential') ??
    [];

  // Whether the user already has a credential-based password set
  const hasCredentialPassword =
    userQuery.data?.accounts.some((acc) => acc.providerId === 'credential') ??
    false;

  const isLoadingAccounts = userQuery.isLoading;
  const hasConnectedAccounts = connectedAccounts.length > 0;

  return (
    <div className="space-y-10">
      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">Password</h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Change your password to keep your account secure.
          </p>
        </div>
        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Update your password regularly to maintain account security.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {hasCredentialPassword ? (
              <>
                {passwordChangeSuccess && (
                  <Alert
                    variant="success"
                    appearance="outline"
                    size="md"
                    close
                    onClose={() => setPasswordChangeSuccess(false)}
                  >
                    <AlertIcon>
                      <CheckCircle2 className="size-5" />
                    </AlertIcon>
                    <div className="flex flex-col gap-1">
                      <AlertTitle>Password updated</AlertTitle>
                      <AlertDescription>
                        Your password has been changed successfully.
                      </AlertDescription>
                    </div>
                  </Alert>
                )}
                <InputField>
                  <InputFieldLabel>Current Password</InputFieldLabel>
                  <InputFieldControl
                    error={!!form.formState.errors.currentPassword}
                  >
                    <Input
                      type="password"
                      placeholder="Enter your current password"
                      {...form.register('currentPassword')}
                      disabled={changePasswordMutation.isPending}
                    />
                  </InputFieldControl>
                  <InputFieldError
                    message={form.formState.errors.currentPassword?.message}
                  />
                </InputField>
                <InputField>
                  <InputFieldLabel>New Password</InputFieldLabel>
                  <InputFieldControl
                    error={!!form.formState.errors.newPassword}
                  >
                    <Input
                      type="password"
                      placeholder="Enter your new password"
                      {...form.register('newPassword')}
                      disabled={changePasswordMutation.isPending}
                    />
                  </InputFieldControl>
                  <InputFieldError
                    message={form.formState.errors.newPassword?.message}
                  />
                </InputField>
                <InputField>
                  <InputFieldLabel>Confirm New Password</InputFieldLabel>
                  <InputFieldControl
                    error={!!form.formState.errors.confirmPassword}
                  >
                    <Input
                      type="password"
                      placeholder="Confirm your new password"
                      {...form.register('confirmPassword')}
                      disabled={changePasswordMutation.isPending}
                    />
                  </InputFieldControl>
                  <InputFieldError
                    message={form.formState.errors.confirmPassword?.message}
                  />
                </InputField>
              </>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  You don&apos;t have a password set yet. You can create one by
                  sending a password reset link to your email address.
                </p>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>We&apos;ll send the reset link to</span>
                  {userQuery.data?.email ? (
                    <Badge variant="primary" appearance="outline">
                      {userQuery.data.email}
                    </Badge>
                  ) : (
                    <span className="font-medium">your email</span>
                  )}
                  <span>.</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="py-4">
            {hasCredentialPassword ? (
              <Button
                onClick={form.handleSubmit(handleChangePassword)}
                loading={changePasswordMutation.isPending}
              >
                Update password
              </Button>
            ) : (
              <Button
                onClick={handleSendPasswordResetEmail}
                loading={passwordResetMutation.isPending}
              >
                Send reset link
              </Button>
            )}
          </CardFooter>
        </Card>
      </SettingsSection>

      <Separator className="my-12" />

      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">
            Connected accounts
          </h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Keep your account secure by connecting multiple authentication
            methods.
          </p>
        </div>

        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Connected accounts</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Use your third party accounts to sign in securely.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoadingAccounts && (
              <p className="text-sm text-muted-foreground">Loading accounts…</p>
            )}
            {!isLoadingAccounts && !hasConnectedAccounts && (
              <p className="text-sm text-muted-foreground">
                You don&apos;t have any connected accounts.
              </p>
            )}
            {!isLoadingAccounts && hasConnectedAccounts && (
              <div className="space-y-3">
                {connectedAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-5">
                      {account.providerId === 'google' && (
                        <Image
                          alt="Google"
                          src={GoogleIcon}
                          className="size-7"
                        />
                      )}
                      <div>
                        <p className="font-semibold capitalize">
                          {account.providerId.replace('-', ' ')}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      appearance="ghost"
                      onClick={() =>
                        handleDisconnectAccount(account.providerId)
                      }
                      loading={disconnectAccountMutation.isPending}
                    >
                      Disconnect
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </SettingsSection>

      <Separator className="my-12" />

      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">Sessions</h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Sign out from all devices.
          </p>
        </div>
        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Sign out from all devices</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Immediately sign out from all active sessions.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              For added security, you can sign out from all devices at once.
              This will end your session everywhere.
            </p>
          </CardContent>
          <CardFooter className="py-4">
            <DeleteDialog
              trigger={
                <Button variant="destructive">Sign out all devices</Button>
              }
              title="Sign out from all devices?"
              description="You will be signed out immediately from all active sessions."
              deleteButtonText="Sign out"
              onDelete={handleSignOutAllDevices}
              loading={signOutAllMutation.isPending}
            />
          </CardFooter>
        </Card>
      </SettingsSection>
    </div>
  );
}
