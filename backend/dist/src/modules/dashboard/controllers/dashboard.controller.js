"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDashboardController = buildDashboardController;
const express_1 = require("express");
const api_response_1 = require("../../../common/responses/api-response");
const object_id_1 = require("../../../common/utils/object-id");
function buildDashboardController(service) {
    const router = (0, express_1.Router)();
    router.get('/active', async (_req, res) => {
        const payload = await service.getByActivePlan();
        res.json((0, api_response_1.successResponse)('Dashboard fetched for active plan', payload));
    });
    router.get('/plan/:planId', async (req, res) => {
        const planId = String(req.params.planId);
        (0, object_id_1.ensureObjectId)(planId, 'planId');
        const payload = await service.getByPlanId(planId);
        res.json((0, api_response_1.successResponse)('Dashboard fetched', payload));
    });
    router.get('/plan/:planId/export/csv', async (req, res) => {
        const planId = String(req.params.planId);
        (0, object_id_1.ensureObjectId)(planId, 'planId');
        const csv = await service.exportCsv(planId);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="budget-dashboard.csv"');
        res.send(csv);
    });
    router.get('/monthly-comparison', async (req, res) => {
        const monthsRaw = req.query.months ? Number(req.query.months) : 6;
        const months = Number.isFinite(monthsRaw) ? Math.max(1, Math.min(24, monthsRaw)) : 6;
        const payload = await service.getMonthlyComparison(months);
        res.json((0, api_response_1.successResponse)('Monthly comparison fetched', payload, { months }));
    });
    return router;
}
