import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const budgetPlanSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    totalIncome: { type: Number, required: true, min: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, versionKey: false }
);

budgetPlanSchema.index({ isActive: 1 });
budgetPlanSchema.index({ createdAt: -1 });

export type BudgetPlanDocument = InferSchemaType<typeof budgetPlanSchema> & { _id: Types.ObjectId };
export const BudgetPlanModel = model('BudgetPlan', budgetPlanSchema);

