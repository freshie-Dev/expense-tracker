"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_config_1 = require("../src/config/app.config");
const plan_schema_1 = require("../src/modules/plans/schemas/plan.schema");
const category_schema_1 = require("../src/modules/categories/schemas/category.schema");
const expense_schema_1 = require("../src/modules/expenses/schemas/expense.schema");
const settings_schema_1 = require("../src/modules/settings/schemas/settings.schema");
dotenv_1.default.config();
async function runSeed() {
    await mongoose_1.default.connect(app_config_1.appConfig.MONGO_URI);
    await Promise.all([
        plan_schema_1.BudgetPlanModel.deleteMany({}),
        category_schema_1.CategoryModel.deleteMany({}),
        expense_schema_1.ExpenseModel.deleteMany({}),
        settings_schema_1.SettingsModel.deleteMany({})
    ]);
    await settings_schema_1.SettingsModel.create({ overspendingMode: app_config_1.appConfig.OVESPENDING_MODE });
    const plan = await plan_schema_1.BudgetPlanModel.create({
        name: 'April 2026 Budget',
        totalIncome: 91730,
        startDate: new Date('2026-04-01'),
        endDate: new Date('2026-04-30'),
        isActive: true
    });
    await category_schema_1.CategoryModel.insertMany([
        { planId: plan._id, name: 'Gym', allocatedAmount: 10000 },
        { planId: plan._id, name: 'Fuel', allocatedAmount: 30000 },
        { planId: plan._id, name: 'Lunch', allocatedAmount: 10000 },
        { planId: plan._id, name: 'Others', allocatedAmount: 10000 },
        { planId: plan._id, name: 'Home', allocatedAmount: 5000 },
        { planId: plan._id, name: 'Sadqa', allocatedAmount: 3000 }
    ]);
    console.log('Seed complete');
    await mongoose_1.default.disconnect();
}
runSeed().catch((err) => {
    console.error(err);
    process.exit(1);
});
