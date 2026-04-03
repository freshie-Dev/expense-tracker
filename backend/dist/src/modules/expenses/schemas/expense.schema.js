"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModel = void 0;
const mongoose_1 = require("mongoose");
const expenseSchema = new mongoose_1.Schema({
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true, index: true },
    description: { type: String, trim: true, maxlength: 240, default: '' },
    isDeleted: { type: Boolean, required: true, default: false }
}, { timestamps: true, versionKey: false });
expenseSchema.index({ categoryId: 1, date: -1 });
exports.ExpenseModel = (0, mongoose_1.model)('Expense', expenseSchema);
