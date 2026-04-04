import { ExpenseModel, type ExpenseDocument } from '../schemas/expense.schema';

export class ExpensesRepository {
  async create(input: {
    categoryId: string;
    amount: number;
    date: Date;
    description: string;
  }): Promise<ExpenseDocument> {
    return ExpenseModel.create(input);
  }

  async findById(id: string): Promise<ExpenseDocument | null> {
    return ExpenseModel.findOne({ _id: id, isDeleted: false }).lean();
  }

  async sumByCategory(categoryId: string, excludedExpenseId?: string): Promise<number> {
    const match: Record<string, unknown> = { categoryId, isDeleted: false };
    if (excludedExpenseId) match._id = { $ne: excludedExpenseId };
    const result = await ExpenseModel.aggregate<{ total: number }>([
      { $match: match },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    return result[0]?.total ?? 0;
  }

  async findPaginatedByCategoryIds(params: {
    categoryIds: string[];
    categoryId?: string;
    startDate?: Date;
    endDate?: Date;
    page: number;
    limit: number;
  }): Promise<{ items: ExpenseDocument[]; total: number }> {
    const match: Record<string, unknown> = {
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
      ExpenseModel.find(match)
        .sort({ date: -1, createdAt: -1 })
        .skip((params.page - 1) * params.limit)
        .limit(params.limit)
        .lean(),
      ExpenseModel.countDocuments(match)
    ]);
    return { items, total: countRows };
  }

  async updateById(
    id: string,
    patch: { categoryId?: string; amount?: number; date?: Date; description?: string }
  ): Promise<ExpenseDocument | null> {
    return ExpenseModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: patch }, { new: true }).lean();
  }

  async softDeleteById(id: string): Promise<void> {
    await ExpenseModel.updateOne({ _id: id }, { $set: { isDeleted: true } });
  }

  async softDeleteByCategoryIds(categoryIds: string[]): Promise<void> {
    await ExpenseModel.updateMany({ categoryId: { $in: categoryIds } }, { $set: { isDeleted: true } });
  }

  async findAllByCategoryIds(categoryIds: string[]): Promise<ExpenseDocument[]> {
    if (categoryIds.length === 0) return [];
    return ExpenseModel.find({ categoryId: { $in: categoryIds }, isDeleted: false })
      .sort({ date: -1, createdAt: -1 })
      .lean();
  }
}

