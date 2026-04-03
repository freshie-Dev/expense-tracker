"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetPlanModel = void 0;
const mongoose_1 = require("mongoose");
const budgetPlanSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, maxlength: 100 },
    totalIncome: { type: Number, required: true, min: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false }
}, { timestamps: true, versionKey: false });
budgetPlanSchema.index({ isActive: 1 });
budgetPlanSchema.index({ createdAt: -1 });
exports.BudgetPlanModel = (0, mongoose_1.model)('BudgetPlan', budgetPlanSchema);
