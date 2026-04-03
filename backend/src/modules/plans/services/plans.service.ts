import { AppError } from '../../../common/exceptions/app-error';
import { CategoriesRepository } from '../../categories/repositories/categories.repository';
import { ExpensesRepository } from '../../expenses/repositories/expenses.repository';
import type { CreatePlanDto } from '../dto/plan.dto';
import { PlansRepository } from '../repositories/plans.repository';

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
}

