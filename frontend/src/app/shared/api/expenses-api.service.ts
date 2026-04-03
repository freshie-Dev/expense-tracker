import { inject, Injectable } from '@angular/core';
import type { Expense } from '../models/expense.model';
import { ApiClientService } from './api-client.service';
import { mapExpense, mapExpenses } from './mappers/expense.mapper';

@Injectable({ providedIn: 'root' })
export class ExpensesApiService {
  private readonly api = inject(ApiClientService);

  /**
   * Loads all pages (limit 100 per page) until exhausted.
   */
  async listAllForPlan(planId: string): Promise<Expense[]> {
    const all: Expense[] = [];
    let page = 1;
    const limit = 100;
    while (true) {
      const { data, meta } = await this.api.get<unknown[]>(
        `/expenses/plan/${planId}?page=${page}&limit=${limit}`
      );
      const items = mapExpenses(data as unknown[]);
      all.push(...items);
      const pagination = meta['pagination'] as
        | { totalPages?: number; page?: number }
        | undefined;
      const totalPages = Math.max(1, Number(pagination?.totalPages ?? 1));
      if (page >= totalPages) break;
      page += 1;
    }
    return all;
  }

  create(input: {
    categoryId: string;
    amount: number;
    date: string;
    description?: string;
  }): Promise<{ expense: Expense; warning?: string }> {
    return this.api
      .post<Record<string, unknown>>('/expenses', {
        ...input,
        description: input.description ?? ''
      })
      .then(({ data, meta }) => ({
        expense: mapExpense(data as Record<string, unknown>),
        warning: typeof meta['warning'] === 'string' ? meta['warning'] : undefined
      }));
  }

  delete(id: string): Promise<void> {
    return this.api.delete<unknown>(`/expenses/${id}`).then(() => undefined);
  }
}
