import type { ISettingsRepo } from "../../infrastructure/repositories/interfaces/ISettingsRepo.js";
import type { ISettings } from "../../domain/types/settings.js";
import type { SettingsDTO } from "../dtos/settingsDto.js";

export class SettingsService {
    constructor(private settingsRepo: ISettingsRepo) {}

    async getStateSettings(): Promise<SettingsDTO> {

        const config = await this.settingsRepo.getSettings() || {
            stateIntervalHours: 0,
            stateCount: 0,
        } as ISettings;

        const deathHours = (config.stateCount - 1) * config.stateIntervalHours;

        return {
            totalStateCount: config.stateCount,
            intervalHours: config.stateIntervalHours,
            deathHours: deathHours,
        } as SettingsDTO;
    };
};