import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { BudgetStore } from '../state/budget.store';

export const hasActivePlanGuard: CanMatchFn = () => {
  const store = inject(BudgetStore);
  const router = inject(Router);

  if (!store.initComplete()) {
    return router.createUrlTree(['/plan']);
  }
  return store.activePlan() ? true : router.createUrlTree(['/plan']);
};

