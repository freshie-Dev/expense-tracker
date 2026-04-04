import { Router } from 'express';
import { validateBody } from '../../../common/middleware/validate.middleware';
import { successResponse } from '../../../common/responses/api-response';
import { ensureObjectId } from '../../../common/utils/object-id';
import { createPlanSchema } from '../dto/plan.dto';
import { importPlanBodySchema } from '../dto/plan-import.dto';
import { PlansService } from '../services/plans.service';

export function buildPlansController(service: PlansService): Router {
  const router = Router();

  router.post('/', validateBody(createPlanSchema), async (req, res) => {
    const created = await service.createPlan(req.body);
    res.status(201).json(successResponse('Plan created and activated', created));
  });

  router.post('/import', validateBody(importPlanBodySchema), async (req, res) => {
    const result = await service.importPlan(req.body);
    res.status(201).json(successResponse('Plan imported', result));
  });

  router.get('/', async (_req, res) => {
    const plans = await service.getAllPlans();
    res.json(successResponse('Plans fetched', plans));
  });

  router.get('/active', async (_req, res) => {
    const plan = await service.getActivePlan();
    res.json(successResponse('Active plan fetched', plan));
  });

  router.get('/:id/export', async (req, res) => {
    const id = String(req.params.id);
    ensureObjectId(id, 'id');
    const snapshot = await service.exportPlan(id);
    res.json(successResponse('Plan export snapshot', snapshot));
  });

  router.get('/:id', async (req, res) => {
    const id = String(req.params.id);
    ensureObjectId(id, 'id');
    const plan = await service.getPlanById(id);
    res.json(successResponse('Plan fetched', plan));
  });

  router.patch('/:id/activate', async (req, res) => {
    const id = String(req.params.id);
    ensureObjectId(id, 'id');
    const activated = await service.activatePlan(id);
    res.json(successResponse('Plan activated', activated));
  });

  router.delete('/:id', async (req, res) => {
    const id = String(req.params.id);
    ensureObjectId(id, 'id');
    const result = await service.deletePlan(id);
    res.json(successResponse('Plan deleted', result));
  });

  return router;
}

