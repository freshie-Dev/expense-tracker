import type { BudgetSettings, OverspendBehavior } from '../../models/budget-settings.model';

export function mapSettingsFromApi(raw: Record<string, unknown>): BudgetSettings {
  const mode = raw['overspendingMode'] === 'block' ? 'block' : 'warn';
  return { overspendBehavior: mode as OverspendBehavior };
}

export function overspendBehaviorToApi(
  behavior: OverspendBehavior
): { overspendingMode: 'block' | 'warn' } {
  return { overspendingMode: behavior };
}
