"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansRepository = void 0;
const plan_schema_1 = require("../schemas/plan.schema");
class PlansRepository {
    async create(input) {
        return plan_schema_1.BudgetPlanModel.create(input);
    }
    async deactivateAll() {
        await plan_schema_1.BudgetPlanModel.updateMany({ isDeleted: false, isActive: true }, { $set: { isActive: false } });
    }
    async findAll() {
        return plan_schema_1.BudgetPlanModel.find({ isDeleted: false }).sort({ createdAt: -1 }).lean();
    }
    async findActive() {
        return plan_schema_1.BudgetPlanModel.findOne({ isDeleted: false, isActive: true }).lean();
    }
    async findById(id) {
        return plan_schema_1.BudgetPlanModel.findOne({ _id: id, isDeleted: false }).lean();
    }
    async activateById(id) {
        await this.deactivateAll();
        return plan_schema_1.BudgetPlanModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isActive: true } }, { new: true }).lean();
    }
    async softDeleteById(id) {
        await plan_schema_1.BudgetPlanModel.updateOne({ _id: id }, { $set: { isDeleted: true, isActive: false } });
    }
}
exports.PlansRepository = PlansRepository;
