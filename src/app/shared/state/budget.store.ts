import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../data/local-storage.service';
import type { BudgetPlan, Category, Expense } from '../models';
import { createId } from '../utils/id';

export type OverspendBehavior = 'block' | 'warn';

export interface BudgetSettings {
  overspendBehavior: OverspendBehavior;
}

export interface BudgetStateV1 {
  version: 1;
  activePlanId: string | null;
  plans: BudgetPlan[];
  categories: Category[];
  expenses: Expense[];
  settings: BudgetSettings;
}

const DEFAULT_STATE: BudgetStateV1 = {
  version: 1,
  activePlanId: null,
  plans: [],
  categories: [],
  expenses: [],
  settings: { overspendBehavior: 'warn' }
};

function asMoneyAmount(n: number): number {
  // Keep deterministic numeric representation for storage and UI.
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

  private readonly _state = signal<BudgetStateV1>(DEFAULT_STATE);
  readonly state = this._state.asReadonly();

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

  constructor() {
    const loaded = this.storage.readJson<BudgetStateV1>();
    if (loaded.ok && loaded.value?.version === 1) {
      // Basic shape trust; UI-level validation will prevent invalid edits.
      this._state.set(loaded.value);
    }

    effect(() => {
      const s = this._state();
      this.storage.writeJson(s);
    });
  }

  setOverspendBehavior(behavior: OverspendBehavior): void {
    this._state.update((s) => ({ ...s, settings: { ...s.settings, overspendBehavior: behavior } }));
  }

  createPlan(input: Omit<BudgetPlan, 'id'>): BudgetPlan {
    const plan: BudgetPlan = {
      id: createId(),
      name: input.name.trim(),
      totalIncome: asMoneyAmount(input.totalIncome),
      startDate: input.startDate,
      endDate: input.endDate
    };

    this._state.update((s) => ({
      ...s,
      plans: [plan, ...s.plans],
      activePlanId: plan.id
    }));

    return plan;
  }

  setActivePlan(planId: string): void {
    this._state.update((s) => ({
      ...s,
      activePlanId: s.plans.some((p) => p.id === planId) ? planId : s.activePlanId
    }));
  }

  deletePlan(planId: string): void {
    this._state.update((s) => {
      const remainingPlans = s.plans.filter((p) => p.id !== planId);
      const remainingCategories = s.categories.filter((c) => c.planId !== planId);
      const removedCategoryIds = new Set(
        s.categories.filter((c) => c.planId === planId).map((c) => c.id)
      );
      const remainingExpenses = s.expenses.filter((e) => !removedCategoryIds.has(e.categoryId));
      const nextActive =
        s.activePlanId === planId ? (remainingPlans[0]?.id ?? null) : s.activePlanId;

      return {
        ...s,
        plans: remainingPlans,
        categories: remainingCategories,
        expenses: remainingExpenses,
        activePlanId: nextActive
      };
    });
  }

  upsertCategory(input: Omit<Category, 'id'> & { id?: string }): Category {
    const plan = this.activePlan();
    if (!plan) throw new Error('No active plan');

    const category: Category = {
      id: input.id ?? createId(),
      planId: plan.id,
      name: input.name.trim(),
      allocatedAmount: asMoneyAmount(input.allocatedAmount)
    };

    this._state.update((s) => {
      const exists = s.categories.some((c) => c.id === category.id);
      const categories = exists
        ? s.categories.map((c) => (c.id === category.id ? category : c))
        : [category, ...s.categories];
      return { ...s, categories };
    });

    return category;
  }

  deleteCategory(categoryId: string): void {
    this._state.update((s) => ({
      ...s,
      categories: s.categories.filter((c) => c.id !== categoryId),
      expenses: s.expenses.filter((e) => e.categoryId !== categoryId)
    }));
  }

  addExpense(input: Omit<Expense, 'id'>): Expense {
    const expense: Expense = {
      id: createId(),
      categoryId: input.categoryId,
      amount: asMoneyAmount(input.amount),
      date: input.date,
      description: input.description?.trim() ? input.description.trim() : undefined
    };

    this._state.update((s) => ({ ...s, expenses: [expense, ...s.expenses] }));
    return expense;
  }

  deleteExpense(expenseId: string): void {
    this._state.update((s) => ({ ...s, expenses: s.expenses.filter((e) => e.id !== expenseId) }));
  }

  resetAll(): void {
    this._state.set(DEFAULT_STATE);
    this.storage.clear();
  }
}

