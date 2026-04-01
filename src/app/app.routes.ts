import { Routes } from '@angular/router';
import { hasActivePlanGuard } from './shared/guards/has-active-plan.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    canMatch: [hasActivePlanGuard],
    loadComponent: () =>
      import('./budget/pages/dashboard/dashboard.page').then((m) => m.DashboardPage)
  },
  {
    path: 'plan',
    loadComponent: () => import('./budget/pages/plan/plan.page').then((m) => m.PlanPage)
  },
  {
    path: 'categories',
    canMatch: [hasActivePlanGuard],
    loadComponent: () =>
      import('./categories/pages/categories/categories.page').then((m) => m.CategoriesPage)
  },
  {
    path: 'expenses',
    canMatch: [hasActivePlanGuard],
    loadComponent: () =>
      import('./expenses/pages/expenses/expenses.page').then((m) => m.ExpensesPage)
  },
  { path: '**', redirectTo: 'dashboard' }
];
