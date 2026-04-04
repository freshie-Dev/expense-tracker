"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesRepository = void 0;
const expense_schema_1 = require("../schemas/expense.schema");
class ExpensesRepository {
    async create(input) {
        return expense_schema_1.ExpenseModel.create(input);
    }
    async findById(id) {
        return expense_schema_1.ExpenseModel.findOne({ _id: id, isDeleted: false }).lean();
    }
    async sumByCategory(categoryId, excludedExpenseId) {
        const match = { categoryId, isDeleted: false };
        if (excludedExpenseId)
            match._id = { $ne: excludedExpenseId };
        const result = await expense_schema_1.ExpenseModel.aggregate([
            { $match: match },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        return result[0]?.total ?? 0;
    }
    async findPaginatedByCategoryIds(params) {
        const match = {
            isDeleted: false,
            categoryId: params.categoryId ?? { $in: params.categoryIds }
        };
        if (params.startDate || params.endDate) {
            match.date = {
                ...(params.startDate ? { $gte: params.startDate } : {}),
                ...(params.endDate ? { $lte: params.endDate } : {})
            };
        }
        const [items, countRows] = await Promise.all([
            expense_schema_1.ExpenseModel.find(match)
                .sort({ date: -1, createdAt: -1 })
                .skip((params.page - 1) * params.limit)
                .limit(params.limit)
                .lean(),
            expense_schema_1.ExpenseModel.countDocuments(match)
        ]);
        return { items, total: countRows };
    }
    async updateById(id, patch) {
        return expense_schema_1.ExpenseModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: patch }, { new: true }).lean();
    }
    async softDeleteById(id) {
        await expense_schema_1.ExpenseModel.updateOne({ _id: id }, { $set: { isDeleted: true } });
    }
    async softDeleteByCategoryIds(categoryIds) {
        await expense_schema_1.ExpenseModel.updateMany({ categoryId: { $in: categoryIds } }, { $set: { isDeleted: true } });
    }
    async findAllByCategoryIds(categoryIds) {
        if (categoryIds.length === 0)
            return [];
        return expense_schema_1.ExpenseModel.find({ categoryId: { $in: categoryIds }, isDeleted: false })
            .sort({ date: -1, createdAt: -1 })
            .lean();
    }
}
exports.ExpensesRepository = ExpensesRepository;
