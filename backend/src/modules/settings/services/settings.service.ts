import { appConfig } from '../../../config/app.config';
import { SettingsRepository } from '../repositories/settings.repository';
import type { UpdateSettingsDto } from '../dto/settings.dto';

export class SettingsService {
  constructor(private readonly repository: SettingsRepository) {}

  async bootstrapDefaults(): Promise<void> {
    const settings = await this.repository.getSingleton();
    if (!settings?.overspendingMode) {
      await this.repository.update(appConfig.OVESPENDING_MODE);
    }
  }

  async getSettings() {
    return this.repository.getSingleton();
  }

  async updateSettings(dto: UpdateSettingsDto) {
    return this.repository.update(dto.overspendingMode);
  }
}

