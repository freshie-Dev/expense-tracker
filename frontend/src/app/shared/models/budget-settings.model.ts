export type OverspendBehavior = 'block' | 'warn';

export interface BudgetSettings {
  overspendBehavior: OverspendBehavior;
}
