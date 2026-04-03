import { ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import { appConfig } from '../config/app.config';
import { logger } from '../common/utils/logger';

export async function connectMongo(): Promise<void> {
  await mongoose.connect(appConfig.MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    },
    serverSelectionTimeoutMS: 10000
  });
  logger.info('MongoDB connected (Atlas SRV + Stable API)');
}