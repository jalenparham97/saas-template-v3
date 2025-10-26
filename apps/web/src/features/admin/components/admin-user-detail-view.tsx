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
  useRevokeUserSessionsMutation,
  useUnbanUserMutation,
  useUpdateUserRoleMutation,
} from '@/features/admin/queries/admin.queries';
import { formatDate } from '@/utils/format-date';
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
import {
  ArrowLeftIcon,
  BanIcon,
  CheckCircle2Icon,
  KeyIcon,
  LogOutIcon,
  ShieldIcon,
  TrashIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AdminUserDetailView({ id }: { id: string }) {
  const router = useRouter();
  const { data: user, isLoading } = useAdminUserQuery(id);

  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [banReason, setBanReason] = useState('');
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');

  const banUser = useBanUserMutation(id);
  const unbanUser = useUnbanUserMutation(id);
  const updateRole = useUpdateUserRoleMutation(id);
  const revokeAllSessions = useRevokeUserSessionsMutation(id);
  const deleteUser = useDeleteUserMutation();

  if (isLoading) {
    return (
      <PageWrapper>
        <div>
          <PageTitle>User Details</PageTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Loading user information...
          </p>
        </div>
        <PageContent>
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/users">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Users
            </Link>
          </Button>
          <div className="mt-4">
            <PageTitle>{user.name}</PageTitle>
            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
          </div>
        </div>
      </div>
      <PageContent className="mt-0">
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
                        <Badge variant="destructive" appearance="light">
                          Banned
                        </Badge>
                      ) : user.emailVerified ? (
                        <Badge variant="success" appearance="light">
                          <CheckCircle2Icon className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="warning" appearance="light">
                          Unverified
                        </Badge>
                      )}
                      <Badge
                        variant={
                          user.role === 'admin' || user.role === 'superadmin'
                            ? 'info'
                            : 'secondary'
                        }
                        appearance="light"
                      >
                        {user.role || 'user'}
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
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedRole(user.role || 'user');
                    setRoleDialogOpen(true);
                  }}
                >
                  <ShieldIcon className="mr-2 h-4 w-4" />
                  Change Role
                </Button>

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
                    onClick={() => setBanDialogOpen(true)}
                  >
                    <BanIcon className="mr-2 h-4 w-4" />
                    Ban User
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => revokeAllSessions.mutate({ userId: user.id })}
                  disabled={
                    revokeAllSessions.isPending || user.sessions.length === 0
                  }
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Revoke All Sessions
                </Button>

                <Separator className="my-4" />

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
                      className="w-full justify-start text-destructive hover:text-destructive"
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Delete User
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContent>

      {/* Ban Dialog */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription>
              This will prevent {user.name} from accessing the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason *</Label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for banning this user..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setBanDialogOpen(false);
                setBanReason('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                banUser.mutate(
                  { userId: user.id, reason: banReason },
                  {
                    onSuccess: () => {
                      setBanDialogOpen(false);
                      setBanReason('');
                    },
                  }
                )
              }
              disabled={!banReason || banUser.isPending}
            >
              Ban User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Dialog */}
      <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role</DialogTitle>
            <DialogDescription>
              Update {user.name}'s role and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {['user', 'admin', 'superadmin'].map((role) => (
                <Button
                  key={role}
                  variant={selectedRole === role ? 'primary' : 'outline'}
                  onClick={() => setSelectedRole(role)}
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                updateRole.mutate(
                  {
                    userId: user.id,
                    role: selectedRole as 'user' | 'admin' | 'superadmin',
                  },
                  { onSuccess: () => setRoleDialogOpen(false) }
                )
              }
              disabled={updateRole.isPending || selectedRole === user.role}
            >
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}
