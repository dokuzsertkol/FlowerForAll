import type { SettingsConfig } from "../../../domain/types/settingsConfig.js";

export interface ISettingsRepo {
    getSettingsJson(): SettingsConfig;
}
