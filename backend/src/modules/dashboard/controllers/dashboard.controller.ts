import { Router } from 'express';
import { successResponse } from '../../../common/responses/api-response';
import { ensureObjectId } from '../../../common/utils/object-id';
import { DashboardService } from '../services/dashboard.service';

export function buildDashboardController(service: DashboardService): Router {
  const router = Router();

  router.get('/active', async (_req, res) => {
    const payload = await service.getByActivePlan();
    res.json(successResponse('Dashboard fetched for active plan', payload));
  });

  router.get('/plan/:planId', async (req, res) => {
    const planId = String(req.params.planId);
    ensureObjectId(planId, 'planId');
    const payload = await service.getByPlanId(planId);
    res.json(successResponse('Dashboard fetched', payload));
  });

  router.get('/plan/:planId/export/csv', async (req, res) => {
    const planId = String(req.params.planId);
    ensureObjectId(planId, 'planId');
    const csv = await service.exportCsv(planId);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="budget-dashboard.csv"');
    res.send(csv);
  });

  router.get('/monthly-comparison', async (req, res) => {
    const monthsRaw = req.query.months ? Number(req.query.months) : 6;
    const months = Number.isFinite(monthsRaw) ? Math.max(1, Math.min(24, monthsRaw)) : 6;
    const payload = await service.getMonthlyComparison(months);
    res.json(successResponse('Monthly comparison fetched', payload, { months }));
  });

  return router;
}

