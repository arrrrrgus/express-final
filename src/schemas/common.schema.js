import z from 'zod';

export const intIdSchema = z.object({
  expenseId: z.coerce.number().int().positive(),
});
