"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesService = void 0;
const app_error_1 = require("../../../common/exceptions/app-error");
const logger_1 = require("../../../common/utils/logger");
class ExpensesService {
    repository;
    categoriesRepository;
    settingsRepository;
    constructor(repository, categoriesRepository, settingsRepository) {
        this.repository = repository;
        this.categoriesRepository = categoriesRepository;
        this.settingsRepository = settingsRepository;
    }
    async assertOverspendingAllowed(params) {
        const category = await this.categoriesRepository.findById(params.categoryId);
        if (!category) {
            throw new app_error_1.AppError({
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
            throw new app_error_1.AppError({
                message: 'Overspending is blocked by configuration',
                statusCode: 400,
                code: 'OVERSPENDING_BLOCKED',
                field: 'amount',
                details: warning
            });
        }
        logger_1.logger.warn({ categoryId: params.categoryId, spent, projected, allocated: category.allocatedAmount }, 'Expense allowed despite overspending due to warn mode');
        return { warning };
    }
    async createExpense(dto) {
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
    async listByPlanId(planId, query) {
        const categories = await this.categoriesRepository.findByPlanId(planId);
        const categoryIds = categories.map((c) => String(c._id));
        if (categoryIds.length === 0) {
            return { items: [], total: 0, page: query.page, limit: query.limit };
        }
        if (query.categoryId && !categoryIds.includes(query.categoryId)) {
            throw new app_error_1.AppError({
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
    async getById(id) {
        const expense = await this.repository.findById(id);
        if (!expense) {
            throw new app_error_1.AppError({
                message: 'Expense not found',
                statusCode: 404,
                code: 'EXPENSE_NOT_FOUND',
                field: 'id'
            });
        }
        return expense;
    }
    async updateExpense(id, dto) {
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
            throw new app_error_1.AppError({
                message: 'Expense not found',
                statusCode: 404,
                code: 'EXPENSE_NOT_FOUND'
            });
        }
        return { expense: updated, warning };
    }
    async deleteExpense(id) {
        await this.getById(id);
        await this.repository.softDeleteById(id);
        return { deleted: true };
    }
}
exports.ExpensesService = ExpensesService;
