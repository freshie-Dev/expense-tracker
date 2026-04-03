import { z } from 'zod';

export const createExpenseSchema = z.object({
  categoryId: z.string().min(1),
  amount: z.number().positive(),
  date: z.string().date(),
  description: z.string().trim().max(240).optional().default('')
});

export const updateExpenseSchema = z
  .object({
    categoryId: z.string().min(1).optional(),
    amount: z.number().positive().optional(),
    date: z.string().date().optional(),
    description: z.string().trim().max(240).optional()
  })
  .refine((x) => Object.keys(x).length > 0, {
    message: 'At least one field must be provided'
  });

export const expenseListQuerySchema = z.object({
  categoryId: z.string().optional(),
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20)
});

export type CreateExpenseDto = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseDto = z.infer<typeof updateExpenseSchema>;
export type ExpenseListQueryDto = z.infer<typeof expenseListQuerySchema>;

