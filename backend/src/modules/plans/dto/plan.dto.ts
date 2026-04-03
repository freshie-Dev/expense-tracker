import { z } from 'zod';

const isoDate = z.string().date();

export const createPlanSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    totalIncome: z.number().positive(),
    startDate: isoDate,
    endDate: isoDate
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'endDate must be greater than or equal to startDate',
    path: ['endDate']
  });

export const activatePlanSchema = z.object({
  id: z.string().min(1)
});

export type CreatePlanDto = z.infer<typeof createPlanSchema>;

