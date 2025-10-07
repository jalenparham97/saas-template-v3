import { auth } from '@/lib/auth';
import { stripeApiClient } from '@/lib/stripe';
import { UserUpdateSchema } from '@/schemas/user.schemas';
import { TRPCError } from '@trpc/server';
import { z } from 'zod/v4';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        accounts: {
          select: {
            id: true,
            accountId: true,
            providerId: true,
          },
        },
        passkeys: true,
        sessions: true,
      },
    });

    return user;
  }),
  updateUser: protectedProcedure
    .input(UserUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { name: input.name ?? ctx.session.user.name, image: input.image },
        include: {
          accounts: {
            select: {
              id: true,
              accountId: true,
              providerId: true,
            },
          },
          passkeys: true,
          sessions: true,
        },
      });
    }),
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      await stripeApiClient.customers.del(user?.stripeCustomerId ?? '');

      await ctx.db.$transaction([
        ctx.db.subscription.deleteMany({
          where: { stripeCustomerId: user?.stripeCustomerId ?? '' },
        }),
        ctx.db.user.delete({
          where: { id: ctx.session.user.id },
        }),
      ]);

      return { message: 'Account deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        message: 'Error deleting account',
        code: 'UNPROCESSABLE_CONTENT',
        cause: error,
      });
    }
  }),
  revokeSession: protectedProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await auth.api.revokeSession({
        headers: ctx.headers,
        body: { token: input.token },
      });
    }),
  revokeOtherSessions: protectedProcedure.mutation(async ({ ctx }) => {
    return await auth.api.revokeOtherSessions({
      headers: ctx.headers,
    });
  }),
  revokeAllSessions: protectedProcedure.mutation(async ({ ctx }) => {
    return await auth.api.revokeSessions({
      headers: ctx.headers,
    });
  }),
  getActiveSession: protectedProcedure.query(async ({ ctx }) => {
    return await auth.api.getSession({ headers: ctx.headers });
  }),
  getAccounts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: {
        accounts: {
          select: {
            id: true,
            accountId: true,
            providerId: true,
          },
        },
      },
    });
  }),
  updatePasskeyName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const passkey = await ctx.db.passkey.update({
        where: { id: input.id },
        data: { name: input.name },
      });

      return passkey;
    }),
});
