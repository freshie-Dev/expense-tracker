import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const categorySchema = new Schema(
  {
    planId: { type: Schema.Types.ObjectId, ref: 'BudgetPlan', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    allocatedAmount: { type: Number, required: true, min: 0 },
    isDeleted: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, versionKey: false }
);

categorySchema.index({ planId: 1, createdAt: -1 });

export type CategoryDocument = InferSchemaType<typeof categorySchema> & { _id: Types.ObjectId };
export const CategoryModel = model('Category', categorySchema);

