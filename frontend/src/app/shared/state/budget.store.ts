import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiBusinessError } from '../api/api-business.error';
import { CategoriesApiService } from '../api/categories-api.service';
import { ExpensesApiService } from '../api/expenses-api.service';
import { PlansApiService } from '../api/plans-api.service';
import { SettingsApiService } from '../api/settings-api.service';
import { LocalStorageService } from '../data/local-storage.service';
import type { BudgetPlan, Category, Expense } from '../models';
import type { BudgetSettings, OverspendBehavior } from '../models/budget-settings.model';

export type { BudgetSettings, OverspendBehavior } from '../models/budget-settings.model';

export interface BudgetStateV1 {
  version: 1;
  activePlanId: string | null;
  plans: BudgetPlan[];
  categories: Category[];
  expenses: Expense[];
  settings: BudgetSettings;
  /** Set after load; omitted in legacy cache entries */
  dataSource?: 'api' | 'cache' | null;
}

const DEFAULT_STATE: BudgetStateV1 = {
  version: 1,
  activePlanId: null,
  plans: [],
  categories: [],
  expenses: [],
  settings: { overspendBehavior: 'warn' },
  dataSource: null
};

function asMoneyAmount(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100) / 100;
}

function sumBy<T>(items: readonly T[], pick: (item: T) => number): number {
  let total = 0;
  for (const item of items) total += pick(item);
  return asMoneyAmount(total);
}

@Injectable({ providedIn: 'root' })
export class BudgetStore {
  private readonly storage = inject(LocalStorageService);
  private readonly plansApi = inject(PlansApiService);
  private readonly categoriesApi = inject(CategoriesApiService);
  private readonly expensesApi = inject(ExpensesApiService);
  private readonly settingsApi = inject(SettingsApiService);

  private readonly _state = signal<BudgetStateV1>(DEFAULT_STATE);
  readonly state = this._state.asReadonly();

  /** True after `initialize()` finishes (success or cache fallback). */
  readonly initComplete = signal(false);
  readonly initError = signal<string | null>(null);

  /** Incremented while `loadFromApi()` runs (initial load + refreshes after mutations). */
  private readonly _loadPending = signal(0);
  readonly apiLoading = computed(() => this._loadPending() > 0);

  readonly activePlan = computed(() => {
    const { activePlanId, plans } = this._state();
    return activePlanId ? plans.find((p) => p.id === activePlanId) ?? null : null;
  });

  readonly plans = computed(() => this._state().plans);

  readonly categoriesForActivePlan = computed(() => {
    const plan = this.activePlan();
    if (!plan) return [] as Category[];
    return this._state().categories.filter((c) => c.planId === plan.id);
  });

  readonly expensesForActivePlan = computed(() => {
    const cats = this.categoriesForActivePlan();
    if (!cats.length) return [] as Expense[];
    const catIds = new Set(cats.map((c) => c.id));
    return this._state().expenses.filter((e) => catIds.has(e.categoryId));
  });

  readonly allocationTotal = computed(() =>
    sumBy(this.categoriesForActivePlan(), (c) => c.allocatedAmount)
  );

  readonly totalSpent = computed(() => sumBy(this.expensesForActivePlan(), (e) => e.amount));

  readonly remainingIncome = computed(() => {
    const plan = this.activePlan();
    if (!plan) return 0;
    return asMoneyAmount(plan.totalIncome - this.totalSpent());
  });

  readonly spentByCategoryId = computed(() => {
    const map = new Map<string, number>();
    for (const e of this.expensesForActivePlan()) {
      map.set(e.categoryId, asMoneyAmount((map.get(e.categoryId) ?? 0) + e.amount));
    }
    return map;
  });

  readonly settings = computed(() => this._state().settings);

  readonly usingCachedData = computed(() => this._state().dataSource === 'cache');

  async initialize(): Promise<void> {
    this.initError.set(null);
    try {
      await this.loadFromApi();
      this.initComplete.set(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to load from API';
      this.initError.set(msg);
      const cached = this.tryLoadFromCache();
      if (cached) {
        this._state.update((s) => ({ ...s, dataSource: 'cache' }));
      }
      this.initComplete.set(true);
    }
  }

  private tryLoadFromCache(): boolean {
    const loaded = this.storage.readJson<BudgetStateV1>();
    if (!loaded.ok || loaded.value?.version !== 1) return false;
    this._state.set({
      ...loaded.value,
      dataSource: 'cache'
    });
    return true;
  }

  private persistCache(): void {
    this.storage.writeJson(this._state());
  }

  private async loadFromApi(): Promise<void> {
    this._loadPending.update((n) => n + 1);
    try {
      const [plans, settings] = await Promise.all([
        this.plansApi.list(),
        this.settingsApi.get()
      ]);

      let activePlanId: string | null = null;
      try {
        const active = await this.plansApi.getActive();
        activePlanId = active.id;
      } catch (e) {
        if (e instanceof ApiBusinessError && e.httpStatus === 404) {
          activePlanId = plans.find((p) => p.isActive)?.id ?? null;
        } else {
          throw e;
        }
      }

      let categories: Category[] = [];
      let expenses: Expense[] = [];
      if (activePlanId) {
        const [cats, exps] = await Promise.all([
          this.categoriesApi.listByPlan(activePlanId),
          this.expensesApi.listAllForPlan(activePlanId)
        ]);
        categories = cats;
        expenses = exps;
      }

      this._state.set({
        version: 1,
        activePlanId,
        plans,
        categories,
        expenses,
        settings,
        dataSource: 'api'
      });
      this.persistCache();
    } finally {
      this._loadPending.update((n) => n - 1);
    }
  }

  async refresh(): Promise<void> {
    await this.loadFromApi();
  }

  async setOverspendBehavior(behavior: OverspendBehavior): Promise<void> {
    const settings = await this.settingsApi.updateOverspend(behavior);
    this._state.update((s) => ({ ...s, settings }));
    this.persistCache();
  }

  async createPlan(input: Omit<BudgetPlan, 'id' | 'isActive'>): Promise<BudgetPlan> {
    const plan = await this.plansApi.create({
      name: input.name.trim(),
      totalIncome: asMoneyAmount(input.totalIncome),
      startDate: input.startDate,
      endDate: input.endDate
    });
    await this.refresh();
    return plan;
  }

  async setActivePlan(planId: string): Promise<void> {
    await this.plansApi.activate(planId);
    await this.refresh();
  }

  async deletePlan(planId: string): Promise<void> {
    await this.plansApi.delete(planId);
    await this.refresh();
  }

  async upsertCategory(input: Omit<Category, 'id'> & { id?: string }): Promise<Category> {
    const plan = this.activePlan();
    if (!plan) throw new Error('No active plan');

    const cat = input.id
      ? await this.categoriesApi.update(input.id, {
          name: input.name.trim(),
          allocatedAmount: asMoneyAmount(input.allocatedAmount)
        })
      : await this.categoriesApi.create({
          planId: plan.id,
          name: input.name.trim(),
          allocatedAmount: asMoneyAmount(input.allocatedAmount)
        });
    await this.refresh();
    return cat;
  }

  async deleteCategory(categoryId: string): Promise<void> {
    await this.categoriesApi.delete(categoryId);
    await this.refresh();
  }

  async addExpense(input: Omit<Expense, 'id'>): Promise<{ expense: Expense; warning?: string }> {
    const result = await this.expensesApi.create({
      categoryId: input.categoryId,
      amount: asMoneyAmount(input.amount),
      date: input.date,
      description: input.description?.trim() ? input.description.trim() : undefined
    });
    await this.refresh();
    return result;
  }

  async deleteExpense(expenseId: string): Promise<void> {
    await this.expensesApi.delete(expenseId);
    await this.refresh();
  }

  async resetAll(): Promise<void> {
    const plansSnapshot = [...this._state().plans];
    for (const p of plansSnapshot) {
      try {
        await this.plansApi.delete(p.id);
      } catch {
        // best-effort
      }
    }
    this.storage.clear();
    this._state.set(DEFAULT_STATE);
    try {
      await this.loadFromApi();
    } catch {
      this._state.set(DEFAULT_STATE);
    }
  }
}
