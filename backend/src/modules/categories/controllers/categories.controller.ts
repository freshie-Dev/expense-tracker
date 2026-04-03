import { Router } from 'express';
import { validateBody } from '../../../common/middleware/validate.middleware';
import { successResponse } from '../../../common/responses/api-response';
import { ensureObjectId } from '../../../common/utils/object-id';
import { createCategorySchema, updateCategorySchema } from '../dto/category.dto';
import { CategoriesService } from '../services/categories.service';

export function buildCategoriesController(service: CategoriesService): Router {
  const router = Router();

  router.post('/', validateBody(createCategorySchema), async (req, res) => {
    ensureObjectId(req.body.planId, 'planId');
    const created = await service.createCategory(req.body);
    res.status(201).json(successResponse('Category created', created));
  });

  router.get('/plan/:planId', async (req, res) => {
    const planId = String(req.params.planId);
    ensureObjectId(planId, 'planId');
    const rows = await service.listByPlanId(planId);
    res.json(successResponse('Categories fetched', rows));
  });

  router.get('/:id', async (req, res) => {
    const id = String(req.params.id);
    ensureObjectId(id, 'id');
    const row = await service.getById(id);
    res.json(successResponse('Category fetched', row));
  });

  router.patch('/:id', validateBody(updateCategorySchema), async (req, res) => {
    const id = String(req.params.id);
    ensureObjectId(id, 'id');
    const updated = await service.updateCategory(id, req.body);
    res.json(successResponse('Category updated', updated));
  });

  router.delete('/:id', async (req, res) => {
    const id = String(req.params.id);
    ensureObjectId(id, 'id');
    const result = await service.deleteCategory(id);
    res.json(successResponse('Category deleted with cascading expense soft-delete', result));
  });

  return router;
}

