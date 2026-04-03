import dotenv from 'dotenv';
import { validateEnv, type AppEnv } from './env.validation';

dotenv.config();

const env = validateEnv(process.env);

export const appConfig: AppEnv = env;

