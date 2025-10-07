import { z } from 'zod/v4';

export const UserUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .optional()
    .nullable()
    .describe('The name of the user.'),
  image: z.url().optional().nullable().describe('The image of the user.'),
});
