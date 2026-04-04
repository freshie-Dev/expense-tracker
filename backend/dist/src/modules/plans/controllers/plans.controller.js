"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPlansController = buildPlansController;
const express_1 = require("express");
const validate_middleware_1 = require("../../../common/middleware/validate.middleware");
const api_response_1 = require("../../../common/responses/api-response");
const object_id_1 = require("../../../common/utils/object-id");
const plan_dto_1 = require("../dto/plan.dto");
const plan_import_dto_1 = require("../dto/plan-import.dto");
function buildPlansController(service) {
    const router = (0, express_1.Router)();
    router.post('/', (0, validate_middleware_1.validateBody)(plan_dto_1.createPlanSchema), async (req, res) => {
        const created = await service.createPlan(req.body);
        res.status(201).json((0, api_response_1.successResponse)('Plan created and activated', created));
    });
    router.post('/import', (0, validate_middleware_1.validateBody)(plan_import_dto_1.importPlanBodySchema), async (req, res) => {
        const result = await service.importPlan(req.body);
        res.status(201).json((0, api_response_1.successResponse)('Plan imported', result));
    });
    router.get('/', async (_req, res) => {
        const plans = await service.getAllPlans();
        res.json((0, api_response_1.successResponse)('Plans fetched', plans));
    });
    router.get('/active', async (_req, res) => {
        const plan = await service.getActivePlan();
        res.json((0, api_response_1.successResponse)('Active plan fetched', plan));
    });
    router.get('/:id/export', async (req, res) => {
        const id = String(req.params.id);
        (0, object_id_1.ensureObjectId)(id, 'id');
        const snapshot = await service.exportPlan(id);
        res.json((0, api_response_1.successResponse)('Plan export snapshot', snapshot));
    });
    router.get('/:id', async (req, res) => {
        const id = String(req.params.id);
        (0, object_id_1.ensureObjectId)(id, 'id');
        const plan = await service.getPlanById(id);
        res.json((0, api_response_1.successResponse)('Plan fetched', plan));
    });
    router.patch('/:id/activate', async (req, res) => {
        const id = String(req.params.id);
        (0, object_id_1.ensureObjectId)(id, 'id');
        const activated = await service.activatePlan(id);
        res.json((0, api_response_1.successResponse)('Plan activated', activated));
    });
    router.delete('/:id', async (req, res) => {
        const id = String(req.params.id);
        (0, object_id_1.ensureObjectId)(id, 'id');
        const result = await service.deletePlan(id);
        res.json((0, api_response_1.successResponse)('Plan deleted', result));
    });
    return router;
}
