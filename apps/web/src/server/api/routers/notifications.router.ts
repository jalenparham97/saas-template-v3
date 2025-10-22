import { z } from 'zod/v4';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

const NotificationPreferencesSchema = z.object({
  accountUpdates: z.boolean(),
  productUpdates: z.boolean(),
  marketingEmails: z.boolean(),
});

export const notificationsRouter = createTRPCRouter({
  getPreferences: protectedProcedure.query(async ({ ctx }) => {
    try {
      const preferences = await ctx.db.userNotificationPreferences.findUnique({
        where: { userId: ctx.session.user.id },
      });

      // If preferences don't exist, create default ones
      if (!preferences) {
        return await ctx.db.userNotificationPreferences.create({
          data: {
            userId: ctx.session.user.id,
            accountUpdates: true,
            productUpdates: false,
            marketingEmails: false,
          },
        });
      }

      return preferences;
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch notification preferences',
      });
    }
  }),

  updatePreferences: protectedProcedure
    .input(NotificationPreferencesSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // Try to update, if it doesn't exist create it
        return await ctx.db.userNotificationPreferences.upsert({
          where: { userId: ctx.session.user.id },
          update: {
            accountUpdates: input.accountUpdates,
            productUpdates: input.productUpdates,
            marketingEmails: input.marketingEmails,
          },
          create: {
            userId: ctx.session.user.id,
            accountUpdates: input.accountUpdates,
            productUpdates: input.productUpdates,
            marketingEmails: input.marketingEmails,
          },
        });
      } catch (error) {
        console.error('Error updating notification preferences:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update notification preferences',
        });
      }
    }),
});
