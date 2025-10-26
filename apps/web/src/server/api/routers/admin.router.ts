import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod/v4';

function assertAdmin(role?: string | null) {
  const ok = role === 'admin' || role === 'superadmin';
  if (!ok) throw new TRPCError({ code: 'FORBIDDEN' });
}

export const adminRouter = createTRPCRouter({
  getUserStats: protectedProcedure.query(async ({ ctx }) => {
    assertAdmin(ctx.session.user.role);

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [total, totalLast30Days, totalLast7Days, banned, verified] =
      await Promise.all([
        ctx.db.user.count(),
        ctx.db.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
        ctx.db.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
        ctx.db.user.count({ where: { banned: true } }),
        ctx.db.user.count({ where: { emailVerified: true } }),
      ]);

    return {
      total,
      totalLast30Days,
      totalLast7Days,
      banned,
      verified,
      unverified: total - verified,
    };
  }),

  getUsers: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        search: z.string().optional(),
        sortBy: z
          .enum(['name', 'email', 'createdAt', 'updatedAt'])
          .default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      })
    )
    .query(async ({ ctx, input }) => {
      assertAdmin(ctx.session.user.role);
      const { page, limit, search, sortBy, sortOrder } = input;
      const skip = (page - 1) * limit;

      const where = search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' as const } },
              { email: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {};

      const [users, total] = await Promise.all([
        ctx.db.user.findMany({
          where,
          skip,
          take: limit,
          orderBy: { [sortBy]: sortOrder },
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            role: true,
            banned: true,
            banReason: true,
            banExpires: true,
            createdAt: true,
            updatedAt: true,
            stripeCustomerId: true,
            _count: { select: { sessions: true } },
          },
        }),
        ctx.db.user.count({ where }),
      ]);

      return {
        users,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    }),

  getUserById: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      assertAdmin(ctx.session.user.role);
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
        include: {
          accounts: {
            select: {
              id: true,
              accountId: true,
              providerId: true,
              createdAt: true,
            },
          },
          sessions: {
            select: {
              id: true,
              token: true,
              ipAddress: true,
              userAgent: true,
              expiresAt: true,
              createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
          },
          passkeys: {
            select: { id: true, name: true, deviceType: true, createdAt: true },
          },
          notificationPreferences: true,
        },
      });
      if (!user)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
      return user;
    }),

  banUser: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        reason: z.string().min(1),
        expiresAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      assertAdmin(ctx.session.user.role);
      return await ctx.db.user.update({
        where: { id: input.userId },
        data: {
          banned: true,
          banReason: input.reason,
          banExpires: input.expiresAt ?? null,
        },
      });
    }),

  unbanUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      assertAdmin(ctx.session.user.role);
      return await ctx.db.user.update({
        where: { id: input.userId },
        data: { banned: false, banReason: null, banExpires: null },
      });
    }),

  deleteUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      assertAdmin(ctx.session.user.role);
      if (input.userId === ctx.session.user.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot delete your own account',
        });
      }
      const existing = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });
      if (!existing)
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
      await ctx.db.user.delete({ where: { id: input.userId } });
      return { success: true } as const;
    }),

  updateUserRole: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.enum(['user', 'admin', 'superadmin']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      assertAdmin(ctx.session.user.role);
      if (
        input.userId === ctx.session.user.id &&
        ctx.session.user.role === 'superadmin' &&
        input.role !== 'superadmin'
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot demote yourself from superadmin',
        });
      }
      return await ctx.db.user.update({
        where: { id: input.userId },
        data: { role: input.role },
      });
    }),

  revokeUserSessions: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      assertAdmin(ctx.session.user.role);
      await ctx.db.session.deleteMany({ where: { userId: input.userId } });
      return { success: true } as const;
    }),
});
