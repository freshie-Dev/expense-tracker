"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRepository = void 0;
const settings_schema_1 = require("../schemas/settings.schema");
class SettingsRepository {
    async getSingleton() {
        const existing = await settings_schema_1.SettingsModel.findOne().lean();
        if (existing)
            return existing;
        return settings_schema_1.SettingsModel.create({ overspendingMode: 'warn' });
    }
    async update(overspendingMode) {
        const existing = await this.getSingleton();
        const updated = await settings_schema_1.SettingsModel.findByIdAndUpdate(existing._id, { $set: { overspendingMode } }, { new: true }).lean();
        if (!updated) {
            return settings_schema_1.SettingsModel.create({ overspendingMode });
        }
        return updated;
    }
}
exports.SettingsRepository = SettingsRepository;
