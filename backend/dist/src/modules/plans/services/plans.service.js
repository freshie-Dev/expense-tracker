"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansService = void 0;
const app_error_1 = require("../../../common/exceptions/app-error");
function toYmd(d) {
    const x = new Date(d);
    const y = x.getUTCFullYear();
    const m = String(x.getUTCMonth() + 1).padStart(2, '0');
    const day = String(x.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}
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
    async exportPlan(planId) {
        const plan = await this.getPlanById(planId);
        const categories = await this.categoriesRepository.findByPlanId(planId);
        const idToLocal = new Map();
        categories.forEach((c, i) => idToLocal.set(String(c._id), `c-${i}`));
        const catIds = categories.map((c) => String(c._id));
        const expenses = await this.expensesRepository.findAllByCategoryIds(catIds);
        return {
            schemaVersion: 1,
            exportedAt: new Date().toISOString(),
            plan: {
                name: plan.name,
                totalIncome: plan.totalIncome,
                startDate: toYmd(plan.startDate),
                endDate: toYmd(plan.endDate)
            },
            categories: categories.map((c, i) => ({
                localId: `c-${i}`,
                name: c.name,
                allocatedAmount: c.allocatedAmount
            })),
            expenses: expenses.map((e) => ({
                categoryLocalId: idToLocal.get(String(e.categoryId)),
                amount: e.amount,
                date: toYmd(e.date),
                description: e.description ?? ''
            }))
        };
    }
    async importPlan(body) {
        const snap = body.snapshot;
        if (body.mode === 'replace') {
            const targetId = body.targetPlanId;
            await this.getPlanById(targetId);
            const existingCats = await this.categoriesRepository.findByPlanId(targetId);
            if (existingCats.length > 0) {
                await this.expensesRepository.softDeleteByCategoryIds(existingCats.map((c) => String(c._id)));
                await this.categoriesRepository.softDeleteByPlanId(targetId);
            }
            const updated = await this.plansRepository.updateById(targetId, {
                name: snap.plan.name,
                totalIncome: snap.plan.totalIncome,
                startDate: new Date(snap.plan.startDate),
                endDate: new Date(snap.plan.endDate)
            });
            if (!updated) {
                throw new app_error_1.AppError({
                    message: 'Plan not found',
                    statusCode: 404,
                    code: 'PLAN_NOT_FOUND',
                    field: 'targetPlanId'
                });
            }
            await this.createCategoriesAndExpenses(targetId, snap);
            return { planId: targetId, mode: 'replace' };
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
        return { planId, mode: 'create' };
    }
    async createCategoriesAndExpenses(planId, snap) {
        const localToNewId = new Map();
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
                throw new app_error_1.AppError({
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
exports.PlansService = PlansService;
