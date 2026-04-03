"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const app_config_1 = require("../../../config/app.config");
class SettingsService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async bootstrapDefaults() {
        const settings = await this.repository.getSingleton();
        if (!settings?.overspendingMode) {
            await this.repository.update(app_config_1.appConfig.OVESPENDING_MODE);
        }
    }
    async getSettings() {
        return this.repository.getSingleton();
    }
    async updateSettings(dto) {
        return this.repository.update(dto.overspendingMode);
    }
}
exports.SettingsService = SettingsService;
