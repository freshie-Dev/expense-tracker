"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
const category_schema_1 = require("../schemas/category.schema");
class CategoriesRepository {
    async create(input) {
        return category_schema_1.CategoryModel.create(input);
    }
    async findByPlanId(planId) {
        return category_schema_1.CategoryModel.find({ planId, isDeleted: false }).sort({ createdAt: -1 }).lean();
    }
    async findById(id) {
        return category_schema_1.CategoryModel.findOne({ _id: id, isDeleted: false }).lean();
    }
    async sumAllocations(planId, excludedCategoryId) {
        const match = { planId, isDeleted: false };
        if (excludedCategoryId)
            match._id = { $ne: excludedCategoryId };
        const result = await category_schema_1.CategoryModel.aggregate([
            { $match: match },
            { $group: { _id: null, total: { $sum: '$allocatedAmount' } } }
        ]);
        return result[0]?.total ?? 0;
    }
    async updateById(id, patch) {
        return category_schema_1.CategoryModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: patch }, { new: true }).lean();
    }
    async softDeleteById(id) {
        await category_schema_1.CategoryModel.updateOne({ _id: id }, { $set: { isDeleted: true } });
    }
    async softDeleteByPlanId(planId) {
        await category_schema_1.CategoryModel.updateMany({ planId }, { $set: { isDeleted: true } });
    }
    async findByPlanIds(planIds) {
        return category_schema_1.CategoryModel.find({ planId: { $in: planIds }, isDeleted: false }).lean();
    }
}
exports.CategoriesRepository = CategoriesRepository;
