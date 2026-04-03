import { Router } from 'express';
import { successResponse } from '../../../common/responses/api-response';

export function buildHealthController(): Router {
  const router = Router();
  router.get('/', (_req, res) => {
    res.json(
      successResponse('API is healthy', {
        status: 'ok',
        timestamp: new Date().toISOString()
      })
    );
  });
  return router;
}

