import { Router } from 'express';
import { buildPlansController } from './modules/plans/controllers/plans.controller';
import { buildCategoriesController } from './modules/categories/controllers/categories.controller';
import { buildExpensesController } from './modules/expenses/controllers/expenses.controller';
import { buildDashboardController } from './modules/dashboard/controllers/dashboard.controller';
import { buildSettingsController } from './modules/settings/controllers/settings.controller';
import { buildHealthController } from './modules/health/controllers/health.controller';

import { PlansRepository } from './modules/plans/repositories/plans.repository';
import { CategoriesRepository } from './modules/categories/repositories/categories.repository';
import { ExpensesRepository } from './modules/expenses/repositories/expenses.repository';
import { DashboardRepository } from './modules/dashboard/repositories/dashboard.repository';
import { SettingsRepository } from './modules/settings/repositories/settings.repository';

import { PlansService } from './modules/plans/services/plans.service';
import { CategoriesService } from './modules/categories/services/categories.service';
import { ExpensesService } from './modules/expenses/services/expenses.service';
import { DashboardService } from './modules/dashboard/services/dashboard.service';
import { SettingsService } from './modules/settings/services/settings.service';

export interface AppContainer {
  settingsService: SettingsService;
  apiRouter: Router;
}

export function createAppModule(): AppContainer {
  const plansRepository = new PlansRepository();
  const categoriesRepository = new CategoriesRepository();
  const expensesRepository = new ExpensesRepository();
  const dashboardRepository = new DashboardRepository();
  const settingsRepository = new SettingsRepository();

  const settingsService = new SettingsService(settingsRepository);
  const plansService = new PlansService(plansRepository, categoriesRepository, expensesRepository);
  const categoriesService = new CategoriesService(
    categoriesRepository,
    plansRepository,
    expensesRepository
  );
  const expensesService = new ExpensesService(
    expensesRepository,
    categoriesRepository,
    settingsRepository
  );
  const dashboardService = new DashboardService(dashboardRepository);

  const apiRouter = Router();
  apiRouter.use('/health', buildHealthController());
  apiRouter.use('/plans', buildPlansController(plansService));
  apiRouter.use('/categories', buildCategoriesController(categoriesService));
  apiRouter.use('/expenses', buildExpensesController(expensesService));
  apiRouter.use('/dashboard', buildDashboardController(dashboardService));
  apiRouter.use('/settings', buildSettingsController(settingsService));

  return { settingsService, apiRouter };
}

