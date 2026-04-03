import { z } from 'zod';

export const updateSettingsSchema = z.object({
  overspendingMode: z.enum(['block', 'warn'])
});

export type UpdateSettingsDto = z.infer<typeof updateSettingsSchema>;

