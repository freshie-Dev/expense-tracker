import { AppError } from '../../../common/exceptions/app-error';
import { DashboardRepository } from '../repositories/dashboard.repository';

export class DashboardService {
  constructor(private readonly repository: DashboardRepository) {}

  async getByPlanId(planId: string) {
    const payload = await this.repository.aggregateByPlanId(planId);
    if (!payload) {
      throw new AppError({
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
      throw new AppError({
        message: 'No active plan found',
        statusCode: 404,
        code: 'ACTIVE_PLAN_NOT_FOUND'
      });
    }
    return this.getByPlanId(activePlanId);
  }

  async exportCsv(planId: string): Promise<string> {
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

  async getMonthlyComparison(months: number) {
    return this.repository.monthlyComparison(months);
  }
}

