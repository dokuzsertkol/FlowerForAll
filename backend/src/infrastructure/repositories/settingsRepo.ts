import { Settings } from "../../domain/models/settingsModel.js";
import type { ISettings } from "../../domain/types/settings.js";
import type { ISettingsRepo } from "./interfaces/ISettingsRepo.js";

export class SettingsRepo implements ISettingsRepo {

    async getSettings(): Promise<ISettings> {
        return await Settings.findOne({}) 
            || {
                stateIntervalHours: 0,
                stateCount: 0,
            } as ISettings;
    }
}
