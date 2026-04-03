import { BudgetPlanModel, type BudgetPlanDocument } from '../schemas/plan.schema';

export class PlansRepository {
  async create(input: {
    name: string;
    totalIncome: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
  }): Promise<BudgetPlanDocument> {
    return BudgetPlanModel.create(input);
  }

  async deactivateAll(): Promise<void> {
    await BudgetPlanModel.updateMany({ isDeleted: false, isActive: true }, { $set: { isActive: false } });
  }

  async findAll(): Promise<BudgetPlanDocument[]> {
    return BudgetPlanModel.find({ isDeleted: false }).sort({ createdAt: -1 }).lean();
  }

  async findActive(): Promise<BudgetPlanDocument | null> {
    return BudgetPlanModel.findOne({ isDeleted: false, isActive: true }).lean();
  }

  async findById(id: string): Promise<BudgetPlanDocument | null> {
    return BudgetPlanModel.findOne({ _id: id, isDeleted: false }).lean();
  }

  async activateById(id: string): Promise<BudgetPlanDocument | null> {
    await this.deactivateAll();
    return BudgetPlanModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isActive: true } },
      { new: true }
    ).lean();
  }

  async softDeleteById(id: string): Promise<void> {
    await BudgetPlanModel.updateOne({ _id: id }, { $set: { isDeleted: true, isActive: false } });
  }
}

