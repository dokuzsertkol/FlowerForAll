import type { SettingsConfig } from "../../domain/types/settingsConfig.js";
import type { ISettingsRepo } from "./interfaces/ISettingsRepo.js";
import settingsConfig from "../../config/settingsConfig.json" with { type: "json" };

export class SettingsRepo implements ISettingsRepo {
    getSettingsJson(): SettingsConfig {
        return settingsConfig;
    }
}
