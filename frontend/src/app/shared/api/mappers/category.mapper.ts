import type { Category } from '../../models/category.model';
import { idOf } from './id.mapper';

export function mapCategory(raw: Record<string, unknown>): Category {
  return {
    id: idOf(raw['_id']),
    planId: idOf(raw['planId']),
    name: String(raw['name'] ?? ''),
    allocatedAmount: Number(raw['allocatedAmount'] ?? 0)
  };
}

export function mapCategories(raw: unknown[]): Category[] {
  return raw.map((r) => mapCategory(r as Record<string, unknown>));
}
