'use client';

import {
  PageContent,
  PageTitle,
  PageWrapper,
} from '@/components/page-structure';
import { useAdminUsersQuery } from '@/features/admin/queries/admin.queries';
import { formatDate } from '@/utils/format-date';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Skeleton } from '@workspace/ui/components/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function AdminUsersView() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 20;

  const { data, isLoading } = useAdminUsersQuery({ page, limit, search });

  return (
    <PageWrapper>
      <div className="flex items-center justify-between gap-4">
        <div>
          <PageTitle>Users</PageTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all users on the platform
          </p>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-8 w-[250px]"
          />
        </div>
      </div>

      <PageContent className="mt-0">
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[200px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[80px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[60px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-9 w-[80px]" />
                    </TableCell>
                  </TableRow>
                ))
              ) : data?.users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                data?.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.image || undefined} />
                          <AvatarFallback>
                            {user.name?.charAt(0).toUpperCase() || (
                              <UserIcon className="h-4 w-4" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {user._count.sessions} active session
                            {user._count.sessions !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span>{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.banned ? (
                        <Badge
                          variant="destructive"
                          appearance="light"
                          size="sm"
                        >
                          Banned
                        </Badge>
                      ) : user.emailVerified ? (
                        <Badge variant="success" appearance="light" size="sm">
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="warning" appearance="light" size="sm">
                          Unverified
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.role === 'admin' || user.role === 'superadmin'
                            ? 'info'
                            : 'secondary'
                        }
                        appearance="light"
                        size="sm"
                      >
                        {user.role || 'user'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/users/${user.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between border-t px-4 py-3">
              <div className="text-sm text-muted-foreground">
                Showing {(page - 1) * limit + 1} to{' '}
                {Math.min(page * limit, data.total)} of {data.total} users
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  Previous
                </Button>
                <div className="text-sm">
                  Page {page} of {data.totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={page === data.totalPages}
                >
                  Next
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </PageContent>
    </PageWrapper>
  );
}
