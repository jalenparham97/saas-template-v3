'use client';

import { DeleteDialog } from '@/components/delete-dialog';
import {
  PageContent,
  PageTitle,
  PageWrapper,
} from '@/components/page-structure';
import {
  useAdminUserQuery,
  useBanUserMutation,
  useDeleteUserMutation,
  useImpersonateUserMutation,
  useRevokeUserSessionsMutation,
  useUnbanUserMutation,
  useUpdateUserRoleMutation,
} from '@/features/admin/queries/admin.queries';
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { formatDate } from '@/utils/format-date';
import { useZodForm } from '@workspace/react-form';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@workspace/ui/components/dialog';
import {
  InputField,
  InputFieldControl,
  InputFieldDescription,
  InputFieldError,
  InputFieldLabel,
} from '@workspace/ui/components/input-field';
import { Label } from '@workspace/ui/components/label';
import { Separator } from '@workspace/ui/components/separator';
import { Skeleton } from '@workspace/ui/components/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table';
import { Textarea } from '@workspace/ui/components/textarea';
import { useDialog } from '@workspace/ui/hooks/use-dialog';
import {
  ArrowLeftIcon,
  BanIcon,
  CheckCircle2Icon,
  KeyIcon,
  LogOutIcon,
  ShieldIcon,
  Trash2Icon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod/v4';

const ROLE_OPTIONS = [
  { key: 'user', label: 'User' },
  { key: 'admin', label: 'Admin' },
];

const banSchema = z.object({
  reason: z.string().min(1, 'Reason is required'),
});

export function AdminUserDetailView({ id }: { id: string }) {
  const router = useRouter();

  const [banDialogOpen, banDialog] = useDialog();
  const [roleDialogOpen, roleDialog] = useDialog();
  const [selectedRole, setSelectedRole] = useState<string>('');

  const {
    register: banRegister,
    handleSubmit: handleBanSubmit,
    formState: { errors: banErrors, isSubmitting: banSubmitting },
    reset: resetBanForm,
  } = useZodForm({ schema: banSchema, defaultValues: { reason: '' } });

  const { data: user, isLoading } = useAdminUserQuery(id);

  const banUser = useBanUserMutation(id);
  const unbanUser = useUnbanUserMutation(id);
  const updateRole = useUpdateUserRoleMutation(id);
  const revokeAllSessions = useRevokeUserSessionsMutation(id);
  const deleteUser = useDeleteUserMutation();
  const impersonate = useImpersonateUserMutation(id);

  if (isLoading) {
    return (
      <PageWrapper>
        <div>
          <Skeleton className="h-8 w-32" />
        </div>
        <PageContent>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* User Info Card (skeleton) */}
              <Card variant="accent">
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="mt-2 h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2 w-full max-w-sm">
                      <Skeleton className="h-5 w-48" />
                      <div className="flex gap-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i}>
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="mt-2 h-4 w-40" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sessions Card (skeleton) */}
              <Card variant="accent">
                <CardHeader>
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="mt-2 h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border">
                    <div className="grid grid-cols-4 gap-4 p-4">
                      {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                      ))}
                    </div>
                    <div className="space-y-3 p-4">
                      {[...Array(3)].map((_, row) => (
                        <div key={row} className="grid grid-cols-4 gap-4">
                          {[...Array(4)].map((_, col) => (
                            <Skeleton key={col} className="h-4 w-full" />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connected Accounts (skeleton) */}
              <Card variant="accent">
                <CardHeader>
                  <Skeleton className="h-6 w-44" />
                  <Skeleton className="mt-2 h-4 w-56" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-4 w-4" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-40" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-8" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column (Actions) */}
            <div className="space-y-4">
              <Card variant="accent">
                <CardHeader>
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="mt-2 h-4 w-40" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-9 w-full" />
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    {[...Array(2)].map((_, i) => (
                      <Skeleton key={i} className="h-9 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </PageContent>
      </PageWrapper>
    );
  }

  if (!user) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-between">
          <div>
            <PageTitle>User Not Found</PageTitle>
            <p className="text-sm text-muted-foreground mt-1">
              This user does not exist
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/users">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Users
            </Link>
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/users">
            <ArrowLeftIcon className="size-4" />
            Back to users
          </Link>
        </Button>
      </div>
      <PageContent>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* User Info Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card variant="accent">
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Basic account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.image || undefined} />
                    <AvatarFallback className="text-2xl">
                      {user.name?.charAt(0).toUpperCase() || (
                        <UserIcon className="h-8 w-8" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <div className="flex gap-2">
                      {user.banned ? (
                        <Badge variant="destructive" appearance="outline">
                          Banned
                        </Badge>
                      ) : user.emailVerified ? (
                        <Badge variant="success" appearance="outline">
                          <CheckCircle2Icon className="size-3" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="warning" appearance="outline">
                          Unverified
                        </Badge>
                      )}
                      <Badge
                        variant={
                          user.role === 'admin' ? 'primary' : 'secondary'
                        }
                        appearance="outline"
                      >
                        {capitalizeFirstLetter(user.role || 'user')}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">User ID</Label>
                    <p className="text-sm font-mono">{user.id}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Joined</Label>
                    <p className="text-sm">
                      {formatDate(user.createdAt, 'MMM DD, YYYY')}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">
                      Last Updated
                    </Label>
                    <p className="text-sm">
                      {formatDate(user.updatedAt, 'MMM DD, YYYY')}
                    </p>
                  </div>
                  {user.stripeCustomerId && (
                    <div>
                      <Label className="text-muted-foreground">
                        Stripe Customer
                      </Label>
                      <p className="text-sm font-mono">
                        {user.stripeCustomerId}
                      </p>
                    </div>
                  )}
                </div>

                {user.banned && user.banReason && (
                  <>
                    <Separator />
                    <div>
                      <Label className="text-destructive">Ban Reason</Label>
                      <p className="text-sm mt-1">{user.banReason}</p>
                      {user.banExpires && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Expires: {formatDate(user.banExpires, 'MMM DD, YYYY')}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Sessions */}
            <Card variant="accent">
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>
                  {user.sessions.length} active session
                  {user.sessions.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user.sessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No active sessions
                  </p>
                ) : (
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>IP Address</TableHead>
                          <TableHead>Device</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Expires</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {user.sessions.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell className="font-mono text-sm">
                              {session.ipAddress || 'N/A'}
                            </TableCell>
                            <TableCell className="text-sm">
                              {session.userAgent
                                ? session.userAgent.slice(0, 30) + '...'
                                : 'N/A'}
                            </TableCell>
                            <TableCell className="text-sm">
                              {formatDate(
                                session.createdAt,
                                'MMM DD, YYYY h:mm A'
                              )}
                            </TableCell>
                            <TableCell className="text-sm">
                              {formatDate(
                                session.expiresAt,
                                'MMM DD, YYYY h:mm A'
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Accounts */}
            {user.accounts.length > 0 && (
              <Card variant="accent">
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>
                    OAuth providers and authentication methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {user.accounts.map((account) => (
                      <div
                        key={account.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <KeyIcon className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium capitalize">
                              {account.providerId.replace('-', ' ')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Added{' '}
                              {formatDate(account.createdAt, 'MMM DD, YYYY')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-4">
            <Card variant="accent">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Manage user account</CardDescription>
              </CardHeader>
              <CardContent className="">
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedRole(user.role || 'user');
                      roleDialog.open();
                    }}
                  >
                    <ShieldIcon className="mr-2 h-4 w-4" />
                    Change Role
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => impersonate.mutate()}
                    disabled={impersonate.isPending}
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    {impersonate.isPending
                      ? 'Impersonating...'
                      : 'Impersonate User'}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() =>
                      revokeAllSessions.mutate({ userId: user.id })
                    }
                    disabled={
                      revokeAllSessions.isPending || user.sessions.length === 0
                    }
                  >
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Revoke All Sessions
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  {user.banned ? (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => unbanUser.mutate({ userId: user.id })}
                      disabled={unbanUser.isPending}
                    >
                      <CheckCircle2Icon className="mr-2 h-4 w-4" />
                      Unban User
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={banDialog.open}
                    >
                      <BanIcon className="mr-2 h-4 w-4" />
                      Ban User
                    </Button>
                  )}

                  <DeleteDialog
                    title="Delete User"
                    description={`Are you sure you want to delete ${user.name}? This action cannot be undone and will permanently delete their account and all associated data.`}
                    onDelete={() =>
                      deleteUser.mutate(
                        { userId: user.id },
                        { onSuccess: () => router.push('/admin/users') }
                      )
                    }
                    loading={deleteUser.isPending}
                    trigger={
                      <Button
                        variant="outline"
                        className="w-full justify-start text-destructive"
                      >
                        <Trash2Icon className="mr-2 h-4 w-4" />
                        Delete User
                      </Button>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContent>

      {/* Ban Dialog */}
      <Dialog
        open={banDialogOpen}
        onOpenChange={(open) => (open ? banDialog.open() : banDialog.close())}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription>
              This will prevent {user.name} from accessing the platform.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleBanSubmit((data) =>
              banUser.mutate(
                { userId: user.id, reason: data.reason },
                {
                  onSuccess: () => {
                    banDialog.close();
                    resetBanForm();
                  },
                }
              )
            )}
          >
            <div className="space-y-4">
              <InputField>
                <InputFieldLabel required>Reason</InputFieldLabel>
                <InputFieldControl error={!!banErrors.reason}>
                  <Textarea
                    placeholder="Enter the reason for banning this user..."
                    rows={4}
                    {...banRegister('reason')}
                  />
                </InputFieldControl>
                <InputFieldDescription>
                  Provide a clear, specific reason. This note is visible to
                  admins.
                </InputFieldDescription>
                {banErrors.reason && (
                  <InputFieldError
                    message={banErrors.reason.message as string}
                  />
                )}
              </InputField>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  banDialog.close();
                  resetBanForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                loading={banUser.isPending}
              >
                Ban user
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Role Dialog */}
      <Dialog
        open={roleDialogOpen}
        onOpenChange={(open) => (open ? roleDialog.open() : roleDialog.close())}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription className="mt-2">
              Update {user.name}'s role and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="rounded-lg border bg-muted/40 p-1">
              <div className="grid grid-cols-2 gap-1">
                {ROLE_OPTIONS.map((opt) => (
                  <Button
                    key={opt.key}
                    type="button"
                    size="sm"
                    variant={selectedRole === opt.key ? 'primary' : 'ghost'}
                    className="w-full justify-center"
                    aria-pressed={selectedRole === opt.key}
                    onClick={() => setSelectedRole(opt.key)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={roleDialog.close}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                updateRole.mutate(
                  {
                    userId: user.id,
                    role: selectedRole as 'user' | 'admin',
                  },
                  { onSuccess: roleDialog.close }
                )
              }
              disabled={
                updateRole.isPending ||
                !selectedRole ||
                selectedRole === user.role
              }
            >
              Update role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}
