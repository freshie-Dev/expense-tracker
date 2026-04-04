import { AppError } from '../../../common/exceptions/app-error';
import { CategoriesRepository } from '../../categories/repositories/categories.repository';
import { ExpensesRepository } from '../../expenses/repositories/expenses.repository';
import type { CreatePlanDto } from '../dto/plan.dto';
import type { ImportPlanBodyDto, PlanSnapshotDto } from '../dto/plan-import.dto';
import { PlansRepository } from '../repositories/plans.repository';

function toYmd(d: Date): string {
  const x = new Date(d);
  const y = x.getUTCFullYear();
  const m = String(x.getUTCMonth() + 1).padStart(2, '0');
  const day = String(x.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export class PlansService {
  constructor(
    private readonly plansRepository: PlansRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly expensesRepository: ExpensesRepository
  ) {}

  async createPlan(dto: CreatePlanDto) {
    await this.plansRepository.deactivateAll();
    return this.plansRepository.create({
      ...dto,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
      isActive: true
    });
  }

  async getAllPlans() {
    return this.plansRepository.findAll();
  }

  async getActivePlan() {
    const plan = await this.plansRepository.findActive();
    if (!plan) {
      throw new AppError({
        message: 'No active plan found',
        statusCode: 404,
        code: 'ACTIVE_PLAN_NOT_FOUND'
      });
    }
    return plan;
  }

  async getPlanById(id: string) {
    const plan = await this.plansRepository.findById(id);
    if (!plan) {
      throw new AppError({
        message: 'Plan not found',
        statusCode: 404,
        code: 'PLAN_NOT_FOUND',
        field: 'id'
      });
    }
    return plan;
  }

  async activatePlan(id: string) {
    const activated = await this.plansRepository.activateById(id);
    if (!activated) {
      throw new AppError({
        message: 'Plan not found',
        statusCode: 404,
        code: 'PLAN_NOT_FOUND',
        field: 'id'
      });
    }
    return activated;
  }

  async deletePlan(id: string) {
    const plan = await this.plansRepository.findById(id);
    if (!plan) {
      throw new AppError({
        message: 'Plan not found',
        statusCode: 404,
        code: 'PLAN_NOT_FOUND',
        field: 'id'
      });
    }

    // Deletion strategy: soft-cascade categories and expenses.
    const categories = await this.categoriesRepository.findByPlanId(id);
    if (categories.length > 0) {
      await this.expensesRepository.softDeleteByCategoryIds(categories.map((c) => String(c._id)));
      await this.categoriesRepository.softDeleteByPlanId(id);
    }

    await this.plansRepository.softDeleteById(id);
    return { deleted: true };
  }

  async exportPlan(planId: string) {
    const plan = await this.getPlanById(planId);
    const categories = await this.categoriesRepository.findByPlanId(planId);
    const idToLocal = new Map<string, string>();
    categories.forEach((c, i) => idToLocal.set(String(c._id), `c-${i}`));

    const catIds = categories.map((c) => String(c._id));
    const expenses = await this.expensesRepository.findAllByCategoryIds(catIds);

    return {
      schemaVersion: 1 as const,
      exportedAt: new Date().toISOString(),
      plan: {
        name: plan.name,
        totalIncome: plan.totalIncome,
        startDate: toYmd(plan.startDate as Date),
        endDate: toYmd(plan.endDate as Date)
      },
      categories: categories.map((c, i) => ({
        localId: `c-${i}`,
        name: c.name,
        allocatedAmount: c.allocatedAmount
      })),
      expenses: expenses.map((e) => ({
        categoryLocalId: idToLocal.get(String(e.categoryId))!,
        amount: e.amount,
        date: toYmd(e.date as Date),
        description: e.description ?? ''
      }))
    };
  }

  async importPlan(body: ImportPlanBodyDto) {
    const snap: PlanSnapshotDto = body.snapshot;

    if (body.mode === 'replace') {
      const targetId = body.targetPlanId!;
      await this.getPlanById(targetId);
      const existingCats = await this.categoriesRepository.findByPlanId(targetId);
      if (existingCats.length > 0) {
        await this.expensesRepository.softDeleteByCategoryIds(
          existingCats.map((c) => String(c._id))
        );
        await this.categoriesRepository.softDeleteByPlanId(targetId);
      }
      const updated = await this.plansRepository.updateById(targetId, {
        name: snap.plan.name,
        totalIncome: snap.plan.totalIncome,
        startDate: new Date(snap.plan.startDate),
        endDate: new Date(snap.plan.endDate)
      });
      if (!updated) {
        throw new AppError({
          message: 'Plan not found',
          statusCode: 404,
          code: 'PLAN_NOT_FOUND',
          field: 'targetPlanId'
        });
      }
      await this.createCategoriesAndExpenses(targetId, snap);
      return { planId: targetId, mode: 'replace' as const };
    }

    await this.plansRepository.deactivateAll();
    const created = await this.plansRepository.create({
      name: snap.plan.name,
      totalIncome: snap.plan.totalIncome,
      startDate: new Date(snap.plan.startDate),
      endDate: new Date(snap.plan.endDate),
      isActive: true
    });
    const planId = String(created._id);
    await this.createCategoriesAndExpenses(planId, snap);
    return { planId, mode: 'create' as const };
  }

  private async createCategoriesAndExpenses(planId: string, snap: PlanSnapshotDto): Promise<void> {
    const localToNewId = new Map<string, string>();
    for (const c of snap.categories) {
      const doc = await this.categoriesRepository.create({
        planId,
        name: c.name,
        allocatedAmount: c.allocatedAmount
      });
      localToNewId.set(c.localId, String(doc._id));
    }
    for (const e of snap.expenses) {
      const categoryId = localToNewId.get(e.categoryLocalId);
      if (!categoryId) {
        throw new AppError({
          message: `Invalid categoryLocalId: ${e.categoryLocalId}`,
          statusCode: 400,
          code: 'IMPORT_CATEGORY_MISMATCH',
          field: 'expenses'
        });
      }
      await this.expensesRepository.create({
        categoryId,
        amount: e.amount,
        date: new Date(e.date),
        description: e.description ?? ''
      });
    }
  }
}

