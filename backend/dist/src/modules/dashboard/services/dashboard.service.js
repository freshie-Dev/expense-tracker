"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const app_error_1 = require("../../../common/exceptions/app-error");
class DashboardService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getByPlanId(planId) {
        const payload = await this.repository.aggregateByPlanId(planId);
        if (!payload) {
            throw new app_error_1.AppError({
                message: 'Plan dashboard not found',
                statusCode: 404,
                code: 'DASHBOARD_NOT_FOUND',
                field: 'planId'
            });
        }
        return payload;
    }
    async getByActivePlan() {
        const activePlanId = await this.repository.findActivePlanId();
        if (!activePlanId) {
            throw new app_error_1.AppError({
                message: 'No active plan found',
                statusCode: 404,
                code: 'ACTIVE_PLAN_NOT_FOUND'
            });
        }
        return this.getByPlanId(activePlanId);
    }
    async exportCsv(planId) {
        const dashboard = await this.getByPlanId(planId);
        const rows = [
            ['Category', 'Allocated', 'Spent', 'Remaining', 'UtilizationPercent', 'Status'],
            ...dashboard.categories.map((c) => [
                c.name,
                String(c.allocated),
                String(c.spent),
                String(c.remaining),
                String(c.utilizationPercent),
                c.status
            ])
        ];
        return rows.map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    }
    async getMonthlyComparison(months) {
        return this.repository.monthlyComparison(months);
    }
}
exports.DashboardService = DashboardService;
