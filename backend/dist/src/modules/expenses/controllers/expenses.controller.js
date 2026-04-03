"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildExpensesController = buildExpensesController;
const express_1 = require("express");
const validate_middleware_1 = require("../../../common/middleware/validate.middleware");
const api_response_1 = require("../../../common/responses/api-response");
const object_id_1 = require("../../../common/utils/object-id");
const expense_dto_1 = require("../dto/expense.dto");
function buildExpensesController(service) {
    const router = (0, express_1.Router)();
    router.post('/', (0, validate_middleware_1.validateBody)(expense_dto_1.createExpenseSchema), async (req, res) => {
        (0, object_id_1.ensureObjectId)(req.body.categoryId, 'categoryId');
        const result = await service.createExpense(req.body);
        res
            .status(201)
            .json((0, api_response_1.successResponse)('Expense created', result.expense, result.warning ? { warning: result.warning } : {}));
    });
    router.get('/plan/:planId', (0, validate_middleware_1.validateQuery)(expense_dto_1.expenseListQuerySchema), async (req, res) => {
        const planId = String(req.params.planId);
        (0, object_id_1.ensureObjectId)(planId, 'planId');
        if (req.query.categoryId)
            (0, object_id_1.ensureObjectId)(String(req.query.categoryId), 'categoryId');
        const rows = await service.listByPlanId(planId, req.query);
        res.json((0, api_response_1.successResponse)('Expenses fetched', rows.items, {
            pagination: {
                page: rows.page,
                limit: rows.limit,
                total: rows.total,
                totalPages: Math.ceil(rows.total / rows.limit)
            }
        }));
    });
    router.get('/:id', async (req, res) => {
        const id = String(req.params.id);
        (0, object_id_1.ensureObjectId)(id, 'id');
        const row = await service.getById(id);
        res.json((0, api_response_1.successResponse)('Expense fetched', row));
    });
    router.patch('/:id', (0, validate_middleware_1.validateBody)(expense_dto_1.updateExpenseSchema), async (req, res) => {
        const id = String(req.params.id);
        (0, object_id_1.ensureObjectId)(id, 'id');
        if (req.body.categoryId)
            (0, object_id_1.ensureObjectId)(req.body.categoryId, 'categoryId');
        const updated = await service.updateExpense(id, req.body);
        res.json((0, api_response_1.successResponse)('Expense updated', updated.expense, updated.warning ? { warning: updated.warning } : {}));
    });
    router.delete('/:id', async (req, res) => {
        const id = String(req.params.id);
        (0, object_id_1.ensureObjectId)(id, 'id');
        const result = await service.deleteExpense(id);
        res.json((0, api_response_1.successResponse)('Expense deleted', result));
    });
    return router;
}
