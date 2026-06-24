import z from 'zod';

const Type = ['EXPENSE', 'INCOME'];

export const expensesSchema = z.object({
  title: z.string('Title must be a string').trim().min(1, 'request title'),
  amount: z.coerce.number().positive().multipleOf(0.01),
  type: z.enum(Type).default('EXPENSE'),
  transactionDate: z.coerce.date('Invalid ISO data format'),
  note: z.string().trim().nullable().optional(),
});

export const updateExpensesSchema = expensesSchema.partial();
