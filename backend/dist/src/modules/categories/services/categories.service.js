"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const app_error_1 = require("../../../common/exceptions/app-error");
class CategoriesService {
    repository;
    plansRepository;
    expensesRepository;
    constructor(repository, plansRepository, expensesRepository) {
        this.repository = repository;
        this.plansRepository = plansRepository;
        this.expensesRepository = expensesRepository;
    }
    async createCategory(dto) {
        const plan = await this.plansRepository.findById(dto.planId);
        if (!plan) {
            throw new app_error_1.AppError({
                message: 'Plan not found',
                statusCode: 404,
                code: 'PLAN_NOT_FOUND',
                field: 'planId'
            });
        }
        const currentAllocated = await this.repository.sumAllocations(dto.planId);
        if (currentAllocated + dto.allocatedAmount > plan.totalIncome) {
            throw new app_error_1.AppError({
                message: 'Category allocation exceeds plan income',
                statusCode: 400,
                code: 'ALLOCATION_EXCEEDED',
                field: 'allocatedAmount'
            });
        }
        return this.repository.create(dto);
    }
    async listByPlanId(planId) {
        const plan = await this.plansRepository.findById(planId);
        if (!plan) {
            throw new app_error_1.AppError({
                message: 'Plan not found',
                statusCode: 404,
                code: 'PLAN_NOT_FOUND',
                field: 'planId'
            });
        }
        return this.repository.findByPlanId(planId);
    }
    async getById(id) {
        const category = await this.repository.findById(id);
        if (!category) {
            throw new app_error_1.AppError({
                message: 'Category not found',
                statusCode: 404,
                code: 'CATEGORY_NOT_FOUND',
                field: 'id'
            });
        }
        return category;
    }
    async updateCategory(id, dto) {
        const existing = await this.getById(id);
        const plan = await this.plansRepository.findById(String(existing.planId));
        if (!plan) {
            throw new app_error_1.AppError({
                message: 'Parent plan not found',
                statusCode: 404,
                code: 'PLAN_NOT_FOUND'
            });
        }
        const nextAllocated = dto.allocatedAmount ?? existing.allocatedAmount;
        const currentAllocatedExcluding = await this.repository.sumAllocations(String(existing.planId), id);
        if (currentAllocatedExcluding + nextAllocated > plan.totalIncome) {
            throw new app_error_1.AppError({
                message: 'Updated allocation exceeds plan income',
                statusCode: 400,
                code: 'ALLOCATION_EXCEEDED',
                field: 'allocatedAmount'
            });
        }
        const updated = await this.repository.updateById(id, dto);
        if (!updated) {
            throw new app_error_1.AppError({
                message: 'Category not found',
                statusCode: 404,
                code: 'CATEGORY_NOT_FOUND'
            });
        }
        return updated;
    }
    async deleteCategory(id) {
        await this.getById(id);
        // Deletion strategy: cascade soft delete expenses for this category.
        await this.expensesRepository.softDeleteByCategoryIds([id]);
        await this.repository.softDeleteById(id);
        return { deleted: true };
    }
}
exports.CategoriesService = CategoriesService;
