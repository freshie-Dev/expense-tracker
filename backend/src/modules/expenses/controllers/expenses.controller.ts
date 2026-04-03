import { Router } from 'express';
import { validateBody, validateQuery } from '../../../common/middleware/validate.middleware';
import { successResponse } from '../../../common/responses/api-response';
import { ensureObjectId } from '../../../common/utils/object-id';
import {
  createExpenseSchema,
  expenseListQuerySchema,
  type ExpenseListQueryDto,
  updateExpenseSchema
} from '../dto/expense.dto';
import { ExpensesService } from '../services/expenses.service';

export function buildExpensesController(service: ExpensesService): Router {
  const router = Router();

  router.post('/', validateBody(createExpenseSchema), async (req, res) => {
    ensureObjectId(req.body.categoryId, 'categoryId');
    const result = await service.createExpense(req.body);
    res
      .status(201)
      .json(successResponse('Expense created', result.expense, result.warning ? { warning: result.warning } : {}));
  });

  router.get('/plan/:planId', validateQuery(expenseListQuerySchema), async (req, res) => {
    const planId = String(req.params.planId);
    ensureObjectId(planId, 'planId');
    if (req.query.categoryId) ensureObjectId(String(req.query.categoryId), 'categoryId');
    const rows = await service.listByPlanId(planId, req.query as unknown as ExpenseListQueryDto);
    res.json(
      successResponse('Expenses fetched', rows.items, {
        pagination: {
          page: rows.page,
          limit: rows.limit,
          total: rows.total,
          totalPages: Math.ceil(rows.total / rows.limit)
        }
      })
    );
  });

  router.get('/:id', async (req, res) => {
    const id = String(req.params.id);
    ensureObjectId(id, 'id');
    const row = await service.getById(id);
    res.json(successResponse('Expense fetched', row));
  });

  router.patch('/:id', validateBody(updateExpenseSchema), async (req, res) => {
    const id = String(req.params.id);
    ensureObjectId(id, 'id');
    if (req.body.categoryId) ensureObjectId(req.body.categoryId, 'categoryId');
    const updated = await service.updateExpense(id, req.body);
    res.json(
      successResponse('Expense updated', updated.expense, updated.warning ? { warning: updated.warning } : {})
    );
  });

  router.delete('/:id', async (req, res) => {
    const id = String(req.params.id);
    ensureObjectId(id, 'id');
    const result = await service.deleteExpense(id);
    res.json(successResponse('Expense deleted', result));
  });

  return router;
}

