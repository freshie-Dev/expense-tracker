"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCategoriesController = buildCategoriesController;
const express_1 = require("express");
const validate_middleware_1 = require("../../../common/middleware/validate.middleware");
const api_response_1 = require("../../../common/responses/api-response");
const object_id_1 = require("../../../common/utils/object-id");
const category_dto_1 = require("../dto/category.dto");
function buildCategoriesController(service) {
    const router = (0, express_1.Router)();
    router.post('/', (0, validate_middleware_1.validateBody)(category_dto_1.createCategorySchema), async (req, res) => {
        (0, object_id_1.ensureObjectId)(req.body.planId, 'planId');
        const created = await service.createCategory(req.body);
        res.status(201).json((0, api_response_1.successResponse)('Category created', created));
    });
    router.get('/plan/:planId', async (req, res) => {
        const planId = String(req.params.planId);
        (0, object_id_1.ensureObjectId)(planId, 'planId');
        const rows = await service.listByPlanId(planId);
        res.json((0, api_response_1.successResponse)('Categories fetched', rows));
    });
    router.get('/:id', async (req, res) => {
        const id = String(req.params.id);
        (0, object_id_1.ensureObjectId)(id, 'id');
        const row = await service.getById(id);
        res.json((0, api_response_1.successResponse)('Category fetched', row));
    });
    router.patch('/:id', (0, validate_middleware_1.validateBody)(category_dto_1.updateCategorySchema), async (req, res) => {
        const id = String(req.params.id);
        (0, object_id_1.ensureObjectId)(id, 'id');
        const updated = await service.updateCategory(id, req.body);
        res.json((0, api_response_1.successResponse)('Category updated', updated));
    });
    router.delete('/:id', async (req, res) => {
        const id = String(req.params.id);
        (0, object_id_1.ensureObjectId)(id, 'id');
        const result = await service.deleteCategory(id);
        res.json((0, api_response_1.successResponse)('Category deleted with cascading expense soft-delete', result));
    });
    return router;
}
