"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansService = void 0;
const app_error_1 = require("../../../common/exceptions/app-error");
class PlansService {
    plansRepository;
    categoriesRepository;
    expensesRepository;
    constructor(plansRepository, categoriesRepository, expensesRepository) {
        this.plansRepository = plansRepository;
        this.categoriesRepository = categoriesRepository;
        this.expensesRepository = expensesRepository;
    }
    async createPlan(dto) {
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
            throw new app_error_1.AppError({
                message: 'No active plan found',
                statusCode: 404,
                code: 'ACTIVE_PLAN_NOT_FOUND'
            });
        }
        return plan;
    }
    async getPlanById(id) {
        const plan = await this.plansRepository.findById(id);
        if (!plan) {
            throw new app_error_1.AppError({
                message: 'Plan not found',
                statusCode: 404,
                code: 'PLAN_NOT_FOUND',
                field: 'id'
            });
        }
        return plan;
    }
    async activatePlan(id) {
        const activated = await this.plansRepository.activateById(id);
        if (!activated) {
            throw new app_error_1.AppError({
                message: 'Plan not found',
                statusCode: 404,
                code: 'PLAN_NOT_FOUND',
                field: 'id'
            });
        }
        return activated;
    }
    async deletePlan(id) {
        const plan = await this.plansRepository.findById(id);
        if (!plan) {
            throw new app_error_1.AppError({
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
exports.PlansService = PlansService;
