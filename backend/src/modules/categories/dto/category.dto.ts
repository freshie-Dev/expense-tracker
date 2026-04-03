import { z } from 'zod';

export const createCategorySchema = z.object({
  planId: z.string().min(1),
  name: z.string().trim().min(1).max(80),
  allocatedAmount: z.number().positive()
});

export const updateCategorySchema = z
  .object({
    name: z.string().trim().min(1).max(80).optional(),
    allocatedAmount: z.number().positive().optional()
  })
  .refine((x) => x.name !== undefined || x.allocatedAmount !== undefined, {
    message: 'At least one field must be provided'
  });

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;

