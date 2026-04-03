import type { BudgetPlan } from '../../models/budget-plan.model';
import { idOf, toIsoDateString } from './id.mapper';

export function mapPlan(raw: Record<string, unknown>): BudgetPlan {
  return {
    id: idOf(raw['_id']),
    name: String(raw['name'] ?? ''),
    totalIncome: Number(raw['totalIncome'] ?? 0),
    startDate: toIsoDateString(raw['startDate']),
    endDate: toIsoDateString(raw['endDate']),
    isActive: raw['isActive'] === true
  };
}

export function mapPlans(raw: unknown[]): BudgetPlan[] {
  return raw.map((r) => mapPlan(r as Record<string, unknown>));
}
