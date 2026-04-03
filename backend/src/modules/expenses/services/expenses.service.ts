import { AppError } from '../../../common/exceptions/app-error';
import { logger } from '../../../common/utils/logger';
import { CategoriesRepository } from '../../categories/repositories/categories.repository';
import type {
  CreateExpenseDto,
  ExpenseListQueryDto,
  UpdateExpenseDto
} from '../dto/expense.dto';
import { ExpensesRepository } from '../repositories/expenses.repository';
import { SettingsRepository } from '../../settings/repositories/settings.repository';

export class ExpensesService {
  constructor(
    private readonly repository: ExpensesRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly settingsRepository: SettingsRepository
  ) {}

  private async assertOverspendingAllowed(params: {
    categoryId: string;
    newAmount: number;
    excludedExpenseId?: string;
  }): Promise<{ warning: string | null }> {
    const category = await this.categoriesRepository.findById(params.categoryId);
    if (!category) {
      throw new AppError({
        message: 'Category not found',
        statusCode: 404,
        code: 'CATEGORY_NOT_FOUND',
        field: 'categoryId'
      });
    }

    const spent = await this.repository.sumByCategory(params.categoryId, params.excludedExpenseId);
    const projected = spent + params.newAmount;
    if (projected <= category.allocatedAmount) {
      return { warning: null };
    }

    const settings = await this.settingsRepository.getSingleton();
    const warning = `Category budget exceeded by ${projected - category.allocatedAmount}`;

    if (settings.overspendingMode === 'block') {
      throw new AppError({
        message: 'Overspending is blocked by configuration',
        statusCode: 400,
        code: 'OVERSPENDING_BLOCKED',
        field: 'amount',
        details: warning
      });
    }

    logger.warn(
      { categoryId: params.categoryId, spent, projected, allocated: category.allocatedAmount },
      'Expense allowed despite overspending due to warn mode'
    );
    return { warning };
  }

  async createExpense(dto: CreateExpenseDto) {
    const { warning } = await this.assertOverspendingAllowed({
      categoryId: dto.categoryId,
      newAmount: dto.amount
    });

    const created = await this.repository.create({
      ...dto,
      date: new Date(dto.date),
      description: dto.description ?? ''
    });

    return {
      expense: created,
      warning
    };
  }

  async listByPlanId(planId: string, query: ExpenseListQueryDto) {
    const categories = await this.categoriesRepository.findByPlanId(planId);
    const categoryIds = categories.map((c) => String(c._id));
    if (categoryIds.length === 0) {
      return { items: [], total: 0, page: query.page, limit: query.limit };
    }

    if (query.categoryId && !categoryIds.includes(query.categoryId)) {
      throw new AppError({
        message: 'categoryId does not belong to this plan',
        statusCode: 400,
        code: 'CATEGORY_PLAN_MISMATCH',
        field: 'categoryId'
      });
    }

    const result = await this.repository.findPaginatedByCategoryIds({
      categoryIds,
      categoryId: query.categoryId,
      startDate: query.startDate ? new Date(query.startDate) : undefined,
      endDate: query.endDate ? new Date(query.endDate) : undefined,
      page: query.page,
      limit: query.limit
    });

    return { ...result, page: query.page, limit: query.limit };
  }

  async getById(id: string) {
    const expense = await this.repository.findById(id);
    if (!expense) {
      throw new AppError({
        message: 'Expense not found',
        statusCode: 404,
        code: 'EXPENSE_NOT_FOUND',
        field: 'id'
      });
    }
    return expense;
  }

  async updateExpense(id: string, dto: UpdateExpenseDto) {
    const existing = await this.getById(id);
    const targetCategoryId = dto.categoryId ?? String(existing.categoryId);
    const nextAmount = dto.amount ?? existing.amount;

    const { warning } = await this.assertOverspendingAllowed({
      categoryId: targetCategoryId,
      newAmount: nextAmount,
      excludedExpenseId: id
    });

    const updated = await this.repository.updateById(id, {
      categoryId: dto.categoryId,
      amount: dto.amount,
      date: dto.date ? new Date(dto.date) : undefined,
      description: dto.description
    });

    if (!updated) {
      throw new AppError({
        message: 'Expense not found',
        statusCode: 404,
        code: 'EXPENSE_NOT_FOUND'
      });
    }

    return { expense: updated, warning };
  }

  async deleteExpense(id: string) {
    await this.getById(id);
    await this.repository.softDeleteById(id);
    return { deleted: true };
  }
}

