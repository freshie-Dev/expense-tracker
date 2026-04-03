import { SettingsModel, type SettingsDocument } from '../schemas/settings.schema';

export class SettingsRepository {
  async getSingleton(): Promise<SettingsDocument> {
    const existing = await SettingsModel.findOne().lean();
    if (existing) return existing;
    return SettingsModel.create({ overspendingMode: 'warn' });
  }

  async update(overspendingMode: 'block' | 'warn'): Promise<SettingsDocument> {
    const existing = await this.getSingleton();
    const updated = await SettingsModel.findByIdAndUpdate(
      existing._id,
      { $set: { overspendingMode } },
      { new: true }
    ).lean();
    if (!updated) {
      return SettingsModel.create({ overspendingMode });
    }
    return updated;
  }
}

