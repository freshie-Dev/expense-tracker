/** Matches backend plan export / import snapshot (schemaVersion 1). */
export interface PlanExportSnapshot {
  schemaVersion: 1;
  exportedAt: string;
  plan: {
    name: string;
    totalIncome: number;
    startDate: string;
    endDate: string;
  };
  categories: Array<{
    localId: string;
    name: string;
    allocatedAmount: number;
  }>;
  expenses: Array<{
    categoryLocalId: string;
    amount: number;
    date: string;
    description?: string;
  }>;
}

export type PlanImportMode = 'create' | 'replace';

export interface PlanImportRequest {
  mode: PlanImportMode;
  targetPlanId?: string;
  snapshot: PlanExportSnapshot;
}
