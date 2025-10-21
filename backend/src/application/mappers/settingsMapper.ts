import type { SettingsDTO } from "../dtos/settingsDto.js";
import type { ISettings } from "../../domain/types/settings.js";

export const settingsToDTO = (settings: ISettings): SettingsDTO => {
    return {
        totalStateCount: settings.stateCount,
        intervalHours: settings.stateIntervalHours,
        deathHours: (settings.stateCount - 1) * settings.stateIntervalHours
    };
};