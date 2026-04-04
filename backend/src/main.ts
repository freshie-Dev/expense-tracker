import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import swaggerUi from 'swagger-ui-express';
import pinoHttp from 'pino-http';

import { appConfig } from './config/app.config';
import { swaggerDocument } from './config/swagger.config';
import { connectMongo } from './database/mongodb.module';
import { logger } from './common/utils/logger';
import { globalErrorHandler, notFoundHandler } from './common/filters/error-handler';
import { createAppModule } from './app.module';

/**
 * Express 5 exposes `req.query` as getter-only; the default express-mongo-sanitize
 * middleware assigns `req.query = …` and throws. Sanitize body/params only; validate
 * query in route handlers (Zod).
 */
function mongoSanitizeExpress5(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void {
  const sanitize = mongoSanitize.sanitize as (input: unknown) => unknown;
  if (req.body && typeof req.body === 'object') {
    req.body = sanitize(req.body);
  }
  if (req.params && typeof req.params === 'object') {
    req.params = sanitize(req.params) as express.Request['params'];
  }
  next();
}

async function bootstrap(): Promise<void> {
  await connectMongo();

  const app = express();

  app.use(
    pinoHttp({
      logger,
      customSuccessMessage(req, res) {
        return `${req.method} ${req.url} completed with ${res.statusCode}`;
      }
    })
  );

  app.use(helmet());
  app.use(
    cors({
      origin: appConfig.CORS_ORIGIN.split(',').map((o) => o.trim()),
      credentials: false
    })
  );
  if (appConfig.NODE_ENV !== 'development') {
    app.use(
      rateLimit({
        windowMs: appConfig.RATE_LIMIT_WINDOW_MS,
        max: appConfig.RATE_LIMIT_MAX,
        standardHeaders: true,
        legacyHeaders: false
      })
    );
  }
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false, limit: '1mb' }));
  app.use(mongoSanitizeExpress5);
  app.use(hpp());

  const { settingsService, apiRouter } = createAppModule();
  await settingsService.bootstrapDefaults();

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(globalErrorHandler);

  const port = process.env.PORT || appConfig.PORT || 5000;

  app.listen(port, () => {
    logger.info(
      { port, env: appConfig.NODE_ENV },
      `Server running on port ${port}`
    );
  });
  // app.listen(appConfig.PORT, () => {
  //   logger.info(
  //     { port: appConfig.PORT, env: appConfig.NODE_ENV },
  //     `Budget Tracker API running on http://localhost:${appConfig.PORT}`
  //   );
  // });
}

bootstrap().catch((err) => {
  logger.error({ err }, 'Failed to bootstrap application');
  process.exit(1);
});

