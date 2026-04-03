import { inject, Injectable } from '@angular/core';
import type { Category } from '../models/category.model';
import { ApiClientService } from './api-client.service';
import { mapCategories, mapCategory } from './mappers/category.mapper';

@Injectable({ providedIn: 'root' })
export class CategoriesApiService {
  private readonly api = inject(ApiClientService);

  listByPlan(planId: string): Promise<Category[]> {
    return this.api
      .get<unknown[]>(`/categories/plan/${planId}`)
      .then(({ data }) => mapCategories(data as unknown[]));
  }

  create(input: { planId: string; name: string; allocatedAmount: number }): Promise<Category> {
    return this.api
      .post<Record<string, unknown>>('/categories', input)
      .then(({ data }) => mapCategory(data as Record<string, unknown>));
  }

  update(
    id: string,
    input: { name?: string; allocatedAmount?: number }
  ): Promise<Category> {
    return this.api
      .patch<Record<string, unknown>>(`/categories/${id}`, input)
      .then(({ data }) => mapCategory(data as Record<string, unknown>));
  }

  delete(id: string): Promise<void> {
    return this.api.delete<unknown>(`/categories/${id}`).then(() => undefined);
  }
}
