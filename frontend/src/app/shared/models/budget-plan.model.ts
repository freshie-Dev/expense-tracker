export interface BudgetPlan {
  id: string;
  name: string;
  totalIncome: number;
  startDate: string; // ISO date (YYYY-MM-DD)
  endDate: string; // ISO date (YYYY-MM-DD)
  /** Present when loaded from API */
  isActive?: boolean;
}

