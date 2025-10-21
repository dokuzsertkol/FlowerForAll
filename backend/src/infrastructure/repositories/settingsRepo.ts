import { Settings } from "../../domain/models/settingsModel.js";
import type { ISettings } from "../../domain/types/settings.js";
import type { ISettingsRepo } from "./interfaces/ISettingsRepo.js";
import { CacheService } from "../redis/cacheService.js";

export class SettingsRepo implements ISettingsRepo {
    private cacheService = new CacheService();
    private cacheKey = "settings";

    async getSettings(): Promise<ISettings> {
        const cached = await this.cacheService.get<ISettings>(this.cacheKey);
        if (cached) return cached;
        
        const config = await Settings.findOne({}).lean() as ISettings | null;
        const settings = config || { stateIntervalHours: 0, stateCount: 0 } as ISettings;

        await this.cacheService.set<ISettings>(this.cacheKey, settings, 3600 * 4);
        
        return settings;
    };
};
