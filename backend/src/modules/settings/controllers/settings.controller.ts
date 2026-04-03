import { Router } from 'express';
import { validateBody } from '../../../common/middleware/validate.middleware';
import { successResponse } from '../../../common/responses/api-response';
import { updateSettingsSchema } from '../dto/settings.dto';
import { SettingsService } from '../services/settings.service';

export function buildSettingsController(service: SettingsService): Router {
  const router = Router();

  router.get('/', async (_req, res) => {
    const settings = await service.getSettings();
    res.json(successResponse('Settings fetched', settings));
  });

  router.patch('/', validateBody(updateSettingsSchema), async (req, res) => {
    const settings = await service.updateSettings(req.body);
    res.json(successResponse('Settings updated', settings));
  });

  return router;
}

