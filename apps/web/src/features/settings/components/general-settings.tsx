'use client';

import { DeleteDialog } from '@/components/delete-dialog';
import {
  useAuth,
  useUserDeleteAccountMutation,
  useUserUpdateMutation,
} from '@/features/auth/queries/auth.queries';
import { SettingsSection } from '@/features/settings/components/settings-section';
import { useZodForm } from '@workspace/react-form';
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
import { useDialog } from '@workspace/ui/hooks/use-dialog';
import { Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';
import z from 'zod';

const userSchema = z.object({
  name: z.string().min(1, { error: 'Please enter your name' }).trim(),
});

export function GeneralSettings() {
  const [isDeleteOpen, deleteDialogHandlers] = useDialog();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useZodForm({
    schema: userSchema,
  });

  useEffect(() => {
    if (user?.data) {
      setValue('name', user.data.name);
    }
  }, [user?.data, setValue]);

  const updateUserMutation = useUserUpdateMutation({ showToast: true });
  const deleteAccountMutation = useUserDeleteAccountMutation();

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    updateUserMutation.mutateAsync({
      name: data.name ?? user?.data?.name,
    });
  };

  const handleDeleteAccount = async () => {
    await deleteAccountMutation.mutateAsync();
    deleteDialogHandlers.close();
  };

  return (
    <div className="space-y-10">
      <SettingsSection>
        <div>
          <h3 className="text-base font-semibold leading-7">
            Profile Information
          </h3>
          <p className="text-muted-foreground mt-1 text-sm leading-6">
            Set your name and contact information, the email address entered
            here is used for your login access.
          </p>
        </div>
        <Card variant="accent" className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Update your personal information and profile details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <InputField className="max-w-lg">
              <InputFieldLabel>Full Name</InputFieldLabel>
              <InputFieldControl error={!!errors.name}>
                <Input defaultValue={user?.data?.name} {...register('name')} />
              </InputFieldControl>
              <InputFieldError message={errors.name?.message} />
            </InputField>
            <InputField className="max-w-lg">
              <InputFieldLabel>Email</InputFieldLabel>
              <InputFieldControl>
                <Input type="email" defaultValue={user?.data?.email} disabled />
              </InputFieldControl>
            </InputField>
          </CardContent>
          <CardFooter className="py-4">
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={updateUserMutation.isPending}
            >
              {updateUserMutation.isPending && (
                <Loader2Icon className="animate-spin size-4" />
              )}
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </SettingsSection>

      <Separator className="my-12" />

      <SettingsSection>
        <div>
          <h2 className="text-base leading-7 font-semibold text-red-600">
            Danger Zone
          </h2>
          <p className="mt-1 text-[15px] leading-6 text-gray-500">
            Be careful, some of these actions are not reversible.
          </p>
        </div>

        <Card className="md:col-span-2" variant="accent">
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Delete your account
            </CardTitle>
            <CardDescription className="hidden xl:block text-sm text-muted-foreground">
              Permanently delete your account, and all associated data with it.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <CardDescription className="leading-6 text-gray-500">
              Permanently delete your account, and all associated data with it.
              We will also cancel any associated subscriptions. This action
              cannot be undone - please proceed with caution.
            </CardDescription>
          </CardContent>
          <CardFooter className="py-4">
            <DeleteDialog
              open={isDeleteOpen}
              onOpenChange={(open) =>
                open
                  ? deleteDialogHandlers.open()
                  : deleteDialogHandlers.close()
              }
              loading={deleteAccountMutation.isPending}
              onDelete={handleDeleteAccount}
              trigger={<Button variant="destructive">Delete my account</Button>}
              title="Delete your account?"
              description="Permanently delete your account and all associated data. We will also cancel any associated subscriptions. This action cannot be undone."
              confirmationText="Delete my account"
              confirmationInputLabel="Type 'Delete my account' to confirm"
              deleteButtonText="Delete account"
            />
          </CardFooter>
        </Card>
      </SettingsSection>
    </div>
  );
}
