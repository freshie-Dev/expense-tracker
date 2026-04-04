import { z } from 'zod';

const isoDate = z.string().date();

export const planSnapshotSchema = z
  .object({
    schemaVersion: z.literal(1),
    plan: z.object({
      name: z.string().trim().min(1).max(100),
      totalIncome: z.number().positive(),
      startDate: isoDate,
      endDate: isoDate
    }),
    categories: z
      .array(
        z.object({
          localId: z.string().trim().min(1).max(64),
          name: z.string().trim().min(1).max(100),
          allocatedAmount: z.number().min(0)
        })
      )
      .max(200),
    expenses: z
      .array(
        z.object({
          categoryLocalId: z.string().trim().min(1).max(64),
          amount: z.number().positive(),
          date: isoDate,
          description: z.string().max(240).optional().default('')
        })
      )
      .max(5000)
  })
  .refine((d) => d.plan.endDate >= d.plan.startDate, {
    message: 'endDate must be greater than or equal to startDate',
    path: ['plan', 'endDate']
  })
  .superRefine((data, ctx) => {
    const localIds = new Set(data.categories.map((c) => c.localId));
    if (localIds.size !== data.categories.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'category localId values must be unique',
        path: ['categories']
      });
    }
    for (const e of data.expenses) {
      if (!localIds.has(e.categoryLocalId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Unknown categoryLocalId: ${e.categoryLocalId}`,
          path: ['expenses']
        });
        break;
      }
    }
  });

export const importPlanBodySchema = z
  .object({
    mode: z.enum(['create', 'replace']),
    targetPlanId: z.string().min(1).optional(),
    snapshot: planSnapshotSchema
  })
  .refine((b) => b.mode !== 'replace' || Boolean(b.targetPlanId), {
    message: 'targetPlanId is required when mode is replace',
    path: ['targetPlanId']
  });

export type ImportPlanBodyDto = z.infer<typeof importPlanBodySchema>;
export type PlanSnapshotDto = z.infer<typeof planSnapshotSchema>;
