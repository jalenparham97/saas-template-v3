'use client';

import {
  PageContent,
  PageTitle,
  PageWrapper,
} from '@/components/page-structure';
import { useAdminUsersQuery } from '@/features/admin/queries/admin.queries';
import { useDebouncedState } from '@/hooks/use-debounced-state';
import { capitalizeFirstLetter } from '@/utils/capitalize-first-letter';
import { formatDate } from '@/utils/format-date';
import {
  ColumnDef,
  PaginationState,
  SortingState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/avatar';
import { Badge } from '@workspace/ui/components/badge';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';
import {
  DataGrid,
  DataGridContainer,
} from '@workspace/ui/components/data-grid';
import { DataGridColumnHeader } from '@workspace/ui/components/data-grid-column-header';
import { DataGridPagination } from '@workspace/ui/components/data-grid-pagination';
import { DataGridTable } from '@workspace/ui/components/data-grid-table';
import { Input, InputWrapper } from '@workspace/ui/components/input';
import { Skeleton } from '@workspace/ui/components/skeleton';
import { SearchIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type AdminUser = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: boolean | null;
  image: string | null;
  role: 'user' | 'admin' | null;
  banned: boolean | null;
  createdAt: string | Date;
  _count: { sessions: number };
};

const ALLOWED_SORT_COLUMNS = new Set([
  'name',
  'email',
  'createdAt',
  'updatedAt',
]);

export function AdminUsersView() {
  // Debounced value used for both input and querying
  const [search, setSearch] = useDebouncedState('', 500);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ]);

  const sortBy = useMemo(() => {
    const s = sorting?.[0];
    return s && ALLOWED_SORT_COLUMNS.has(s.id)
      ? (s.id as 'name' | 'email' | 'createdAt' | 'updatedAt')
      : 'createdAt';
  }, [sorting]);

  const sortOrder = useMemo(
    () => (sorting?.[0]?.desc ? 'desc' : 'asc') as 'asc' | 'desc',
    [sorting]
  );

  const page = pagination.pageIndex + 1;
  const limit = pagination.pageSize;

  const { data, isLoading } = useAdminUsersQuery({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  });

  // Reset to first page when the debounced search term changes
  useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [search]);

  const columns = useMemo<ColumnDef<AdminUser>[]>(
    () => [
      {
        accessorKey: 'name',
        id: 'name',
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="User" />
        ),
        enableSorting: true,
        meta: {
          headerTitle: 'User',
          skeleton: (
            <div className="flex items-center gap-3">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          ),
        },
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage src={user.image || undefined} />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase() || (
                    <UserIcon className="size-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={`/admin/users/${user.id}`}
                  className="font-medium hover:text-blue-500 cursor-pointer"
                >
                  {user.name}
                </Link>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'email',
        id: 'email',
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="Email" />
        ),
        enableSorting: true,
        meta: {
          headerTitle: 'Email',
          skeleton: <Skeleton className="h-4 w-[200px]" />,
        },
        cell: ({ row }) => <span>{row.original.email}</span>,
      },
      {
        id: 'status',
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="Status" />
        ), // sorting disabled
        enableSorting: false,
        meta: {
          headerTitle: 'Status',
          skeleton: <Skeleton className="h-5 w-20" />,
        },
        cell: ({ row }) => {
          const user = row.original;
          return user.banned ? (
            <Badge variant="destructive" appearance="outline" size="sm">
              Banned
            </Badge>
          ) : user.emailVerified ? (
            <Badge variant="success" appearance="outline" size="sm">
              Verified
            </Badge>
          ) : (
            <Badge variant="warning" appearance="outline" size="sm">
              Unverified
            </Badge>
          );
        },
      },
      {
        accessorKey: 'role',
        id: 'role',
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="Role" />
        ), // not server-sortable
        enableSorting: false,
        meta: {
          headerTitle: 'Role',
          skeleton: <Skeleton className="h-5 w-[60px]" />,
        },
        cell: ({ row }) => {
          const user = row.original;
          return (
            <Badge
              variant={user.role === 'admin' ? 'primary' : 'secondary'}
              appearance="outline"
              size="sm"
            >
              {capitalizeFirstLetter(user.role || 'user')}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'createdAt',
        id: 'createdAt',
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="Joined" />
        ),
        enableSorting: true,
        meta: {
          headerTitle: 'Joined',
          skeleton: <Skeleton className="h-4 w-[100px]" />,
        },
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(row.original.createdAt)}
          </span>
        ),
      },
      {
        id: 'actions',
        header: ({ column }) => (
          <DataGridColumnHeader column={column} title="Actions" />
        ),
        enableSorting: false,
        meta: {
          headerTitle: 'Actions',
          skeleton: <Skeleton className="h-6 w-20" />,
        },
        cell: ({ row }) => (
          <Button asChild size="sm" variant="outline">
            <Link href={`/admin/users/${row.original.id}`}>View</Link>
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable<AdminUser>({
    data: data?.users as AdminUser[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data?.totalPages ?? 0,
    state: { pagination, sorting },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    manualSorting: true,
    enableSorting: true,
  });

  return (
    <PageWrapper>
      <div className="flex items-center justify-between gap-4">
        <div>
          <PageTitle>Users</PageTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all users on the platform
          </p>
        </div>
        <div className="flex items-center gap-2"></div>
      </div>

      <PageContent>
        <InputWrapper className="w-full sm:w-[320px]">
          <SearchIcon className="size-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            defaultValue={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </InputWrapper>

        {/* Mobile list (cards) */}
        <div className="mt-4 md:hidden">
          <div className="grid gap-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} variant="accent">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-2/3" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-14" />
                      </div>
                      <Skeleton className="h-8 w-full" />
                    </CardContent>
                  </Card>
                ))
              : (data?.users || []).map((user) => (
                  <Card key={user.id} variant="accent">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarImage src={user.image || undefined} />
                          <AvatarFallback>
                            {user.name?.charAt(0).toUpperCase() || (
                              <UserIcon className="size-4" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/admin/users/${user.id}`}
                            className="block font-medium truncate hover:text-blue-500"
                          >
                            {user.name || user.email}
                          </Link>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {user.banned ? (
                          <Badge
                            variant="destructive"
                            appearance="outline"
                            size="sm"
                          >
                            Banned
                          </Badge>
                        ) : user.emailVerified ? (
                          <Badge
                            variant="success"
                            appearance="outline"
                            size="sm"
                          >
                            Verified
                          </Badge>
                        ) : (
                          <Badge
                            variant="warning"
                            appearance="outline"
                            size="sm"
                          >
                            Unverified
                          </Badge>
                        )}
                        <Badge
                          variant={
                            user.role === 'admin' ? 'primary' : 'secondary'
                          }
                          appearance="outline"
                          size="sm"
                        >
                          {capitalizeFirstLetter(user.role || 'user')}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-auto">
                          Joined {formatDate(user.createdAt)}
                        </span>
                      </div>

                      <div className="flex">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Link href={`/admin/users/${user.id}`}>View</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>

        {/* Desktop/tablet table */}
        <div className="mt-4 hidden md:block">
          <DataGrid
            table={table}
            recordCount={data?.total ?? 0}
            isLoading={isLoading}
            tableLayout={{
              stripped: false,
              rowRounded: false,
              dense: true,
            }}
          >
            <div className="w-full space-y-2.5">
              <DataGridContainer>
                <DataGridTable />
              </DataGridContainer>
              <DataGridPagination
                sizes={[5, 10, 20, 25, 50, 100]}
                more
                moreLimit={5}
              />
            </div>
          </DataGrid>
        </div>
      </PageContent>
    </PageWrapper>
  );
}
