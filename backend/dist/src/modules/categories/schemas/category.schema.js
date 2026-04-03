"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    planId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'BudgetPlan', required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    allocatedAmount: { type: Number, required: true, min: 0 },
    isDeleted: { type: Boolean, required: true, default: false }
}, { timestamps: true, versionKey: false });
categorySchema.index({ planId: 1, createdAt: -1 });
exports.CategoryModel = (0, mongoose_1.model)('Category', categorySchema);
