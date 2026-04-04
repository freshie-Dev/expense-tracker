import { inject, Injectable } from '@angular/core';
import type { BudgetPlan } from '../models/budget-plan.model';
import type {
  PlanExportSnapshot,
  PlanImportMode,
  PlanImportRequest
} from '../models/plan-export-snapshot.model';
import { ApiClientService } from './api-client.service';
import { mapPlan, mapPlans } from './mappers/plan.mapper';

@Injectable({ providedIn: 'root' })
export class PlansApiService {
  private readonly api = inject(ApiClientService);

  list(): Promise<BudgetPlan[]> {
    return this.api.get<unknown[]>('/plans').then(({ data }) => mapPlans(data as unknown[]));
  }

  getActive(): Promise<BudgetPlan> {
    return this.api
      .get<Record<string, unknown>>('/plans/active')
      .then(({ data }) => mapPlan(data as Record<string, unknown>));
  }

  create(input: {
    name: string;
    totalIncome: number;
    startDate: string;
    endDate: string;
  }): Promise<BudgetPlan> {
    return this.api
      .post<Record<string, unknown>>('/plans', input)
      .then(({ data }) => mapPlan(data as Record<string, unknown>));
  }

  activate(id: string): Promise<BudgetPlan> {
    return this.api
      .patch<Record<string, unknown>>(`/plans/${id}/activate`, {})
      .then(({ data }) => mapPlan(data as Record<string, unknown>));
  }

  delete(id: string): Promise<void> {
    return this.api.delete<unknown>(`/plans/${id}`).then(() => undefined);
  }

  exportSnapshot(planId: string): Promise<PlanExportSnapshot> {
    return this.api
      .get<PlanExportSnapshot>(`/plans/${planId}/export`)
      .then(({ data }) => data as PlanExportSnapshot);
  }

  importSnapshot(body: PlanImportRequest): Promise<{ planId: string; mode: PlanImportMode }> {
    return this.api
      .post<{ planId: string; mode: PlanImportMode }>('/plans/import', body)
      .then(({ data }) => data as { planId: string; mode: PlanImportMode });
  }
}
