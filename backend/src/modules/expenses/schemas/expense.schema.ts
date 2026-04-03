import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const expenseSchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true, index: true },
    description: { type: String, trim: true, maxlength: 240, default: '' },
    isDeleted: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, versionKey: false }
);

expenseSchema.index({ categoryId: 1, date: -1 });

export type ExpenseDocument = InferSchemaType<typeof expenseSchema> & { _id: Types.ObjectId };
export const ExpenseModel = model('Expense', expenseSchema);

