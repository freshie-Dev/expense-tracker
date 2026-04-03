import { Schema, model, type InferSchemaType, type Types } from 'mongoose';

const settingsSchema = new Schema(
  {
    overspendingMode: { type: String, enum: ['block', 'warn'], required: true, default: 'warn' }
  },
  { timestamps: true, versionKey: false }
);

export type SettingsDocument = InferSchemaType<typeof settingsSchema> & { _id: Types.ObjectId };
export const SettingsModel = model('AppSettings', settingsSchema);

