import { inject, Injectable } from '@angular/core';
import type { BudgetSettings, OverspendBehavior } from '../models/budget-settings.model';
import { ApiClientService } from './api-client.service';
import { mapSettingsFromApi, overspendBehaviorToApi } from './mappers/settings.mapper';

@Injectable({ providedIn: 'root' })
export class SettingsApiService {
  private readonly api = inject(ApiClientService);

  get(): Promise<BudgetSettings> {
    return this.api
      .get<Record<string, unknown>>('/settings')
      .then(({ data }) => mapSettingsFromApi(data as Record<string, unknown>));
  }

  updateOverspend(behavior: OverspendBehavior): Promise<BudgetSettings> {
    return this.api
      .patch<Record<string, unknown>>('/settings', overspendBehaviorToApi(behavior))
      .then(({ data }) => mapSettingsFromApi(data as Record<string, unknown>));
  }
}
