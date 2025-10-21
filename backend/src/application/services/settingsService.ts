import type { ISettingsRepo } from "../../infrastructure/repositories/interfaces/ISettingsRepo.js";
import type { SettingsDTO } from "../dtos/settingsDto.js";

export class SettingsService {
    constructor(private settingsRepo: ISettingsRepo) {}

    async getStateSettings(): Promise<SettingsDTO> {

        const config = await this.settingsRepo.getSettings();

        const deathHours = (config.stateCount - 1) * config.stateIntervalHours;

        return {
            totalStateCount: config.stateCount,
            intervalHours: config.stateIntervalHours,
            deathHours: deathHours,
        } as SettingsDTO;
    };
};