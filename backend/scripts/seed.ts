import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { appConfig } from '../src/config/app.config';
import { BudgetPlanModel } from '../src/modules/plans/schemas/plan.schema';
import { CategoryModel } from '../src/modules/categories/schemas/category.schema';
import { ExpenseModel } from '../src/modules/expenses/schemas/expense.schema';
import { SettingsModel } from '../src/modules/settings/schemas/settings.schema';

dotenv.config();

async function runSeed(): Promise<void> {
  await mongoose.connect(appConfig.MONGO_URI);

  await Promise.all([
    BudgetPlanModel.deleteMany({}),
    CategoryModel.deleteMany({}),
    ExpenseModel.deleteMany({}),
    SettingsModel.deleteMany({})
  ]);

  await SettingsModel.create({ overspendingMode: appConfig.OVESPENDING_MODE });

  const plan = await BudgetPlanModel.create({
    name: 'April 2026 Budget',
    totalIncome: 91730,
    startDate: new Date('2026-04-01'),
    endDate: new Date('2026-04-30'),
    isActive: true
  });

  await CategoryModel.insertMany([
    { planId: plan._id, name: 'Gym', allocatedAmount: 10000 },
    { planId: plan._id, name: 'Fuel', allocatedAmount: 30000 },
    { planId: plan._id, name: 'Lunch', allocatedAmount: 10000 },
    { planId: plan._id, name: 'Others', allocatedAmount: 10000 },
    { planId: plan._id, name: 'Home', allocatedAmount: 5000 },
    { planId: plan._id, name: 'Sadqa', allocatedAmount: 3000 }
  ]);

  console.log('Seed complete');
  await mongoose.disconnect();
}

runSeed().catch((err) => {
  console.error(err);
  process.exit(1);
});

