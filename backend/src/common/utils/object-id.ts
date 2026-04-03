import mongoose from 'mongoose';
import { AppError } from '../exceptions/app-error';

export function ensureObjectId(id: string, field = 'id'): mongoose.Types.ObjectId {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError({
      message: `Invalid ${field}`,
      statusCode: 400,
      code: 'INVALID_OBJECT_ID',
      field
    });
  }
  return new mongoose.Types.ObjectId(id);
}

