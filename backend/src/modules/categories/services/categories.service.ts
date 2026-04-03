import { AppError } from '../../../common/exceptions/app-error';
import type { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { CategoriesRepository } from '../repositories/categories.repository';
import { PlansRepository } from '../../plans/repositories/plans.repository';
import { ExpensesRepository } from '../../expenses/repositories/expenses.repository';

export class CategoriesService {
  constructor(
    private readonly repository: CategoriesRepository,
    private readonly plansRepository: PlansRepository,
    private readonly expensesRepository: ExpensesRepository
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    const plan = await this.plansRepository.findById(dto.planId);
    if (!plan) {
      throw new AppError({
        message: 'Plan not found',
        statusCode: 404,
        code: 'PLAN_NOT_FOUND',
        field: 'planId'
      });
    }

    const currentAllocated = await this.repository.sumAllocations(dto.planId);
    if (currentAllocated + dto.allocatedAmount > plan.totalIncome) {
      throw new AppError({
        message: 'Category allocation exceeds plan income',
        statusCode: 400,
        code: 'ALLOCATION_EXCEEDED',
        field: 'allocatedAmount'
      });
    }

    return this.repository.create(dto);
  }

  async listByPlanId(planId: string) {
    const plan = await this.plansRepository.findById(planId);
    if (!plan) {
      throw new AppError({
        message: 'Plan not found',
        statusCode: 404,
        code: 'PLAN_NOT_FOUND',
        field: 'planId'
      });
    }
    return this.repository.findByPlanId(planId);
  }

  async getById(id: string) {
    const category = await this.repository.findById(id);
    if (!category) {
      throw new AppError({
        message: 'Category not found',
        statusCode: 404,
        code: 'CATEGORY_NOT_FOUND',
        field: 'id'
      });
    }
    return category;
  }

  async updateCategory(id: string, dto: UpdateCategoryDto) {
    const existing = await this.getById(id);
    const plan = await this.plansRepository.findById(String(existing.planId));
    if (!plan) {
      throw new AppError({
        message: 'Parent plan not found',
        statusCode: 404,
        code: 'PLAN_NOT_FOUND'
      });
    }

    const nextAllocated = dto.allocatedAmount ?? existing.allocatedAmount;
    const currentAllocatedExcluding = await this.repository.sumAllocations(String(existing.planId), id);
    if (currentAllocatedExcluding + nextAllocated > plan.totalIncome) {
      throw new AppError({
        message: 'Updated allocation exceeds plan income',
        statusCode: 400,
        code: 'ALLOCATION_EXCEEDED',
        field: 'allocatedAmount'
      });
    }

    const updated = await this.repository.updateById(id, dto);
    if (!updated) {
      throw new AppError({
        message: 'Category not found',
        statusCode: 404,
        code: 'CATEGORY_NOT_FOUND'
      });
    }
    return updated;
  }

  async deleteCategory(id: string) {
    await this.getById(id);
    // Deletion strategy: cascade soft delete expenses for this category.
    await this.expensesRepository.softDeleteByCategoryIds([id]);
    await this.repository.softDeleteById(id);
    return { deleted: true };
  }
}

