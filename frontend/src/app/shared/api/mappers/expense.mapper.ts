import type { Expense } from '../../models/expense.model';
import { idOf, toIsoDateString } from './id.mapper';

export function mapExpense(raw: Record<string, unknown>): Expense {
  const desc = raw['description'];
  return {
    id: idOf(raw['_id']),
    categoryId: idOf(raw['categoryId']),
    amount: Number(raw['amount'] ?? 0),
    date: toIsoDateString(raw['date']),
    description:
      typeof desc === 'string' && desc.trim().length > 0 ? desc.trim() : undefined
  };
}

export function mapExpenses(raw: unknown[]): Expense[] {
  return raw.map((r) => mapExpense(r as Record<string, unknown>));
}
