import { CategoryModel, type CategoryDocument } from '../schemas/category.schema';

export class CategoriesRepository {
  async create(input: {
    planId: string;
    name: string;
    allocatedAmount: number;
  }): Promise<CategoryDocument> {
    return CategoryModel.create(input);
  }

  async findByPlanId(planId: string): Promise<CategoryDocument[]> {
    return CategoryModel.find({ planId, isDeleted: false }).sort({ createdAt: -1 }).lean();
  }

  async findById(id: string): Promise<CategoryDocument | null> {
    return CategoryModel.findOne({ _id: id, isDeleted: false }).lean();
  }

  async sumAllocations(planId: string, excludedCategoryId?: string): Promise<number> {
    const match: Record<string, unknown> = { planId, isDeleted: false };
    if (excludedCategoryId) match._id = { $ne: excludedCategoryId };
    const result = await CategoryModel.aggregate<{ total: number }>([
      { $match: match },
      { $group: { _id: null, total: { $sum: '$allocatedAmount' } } }
    ]);
    return result[0]?.total ?? 0;
  }

  async updateById(
    id: string,
    patch: { name?: string; allocatedAmount?: number }
  ): Promise<CategoryDocument | null> {
    return CategoryModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: patch }, { new: true }).lean();
  }

  async softDeleteById(id: string): Promise<void> {
    await CategoryModel.updateOne({ _id: id }, { $set: { isDeleted: true } });
  }

  async softDeleteByPlanId(planId: string): Promise<void> {
    await CategoryModel.updateMany({ planId }, { $set: { isDeleted: true } });
  }

  async findByPlanIds(planIds: string[]): Promise<CategoryDocument[]> {
    return CategoryModel.find({ planId: { $in: planIds }, isDeleted: false }).lean();
  }
}

