import pino from 'pino';
import { appConfig } from '../../config/app.config';

export const logger = pino({
  level: appConfig.NODE_ENV === 'production' ? 'info' : 'debug',
  redact: ['req.headers.authorization']
});

