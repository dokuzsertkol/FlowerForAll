import type { ISettings } from "../../../domain/types/settings.js";

export interface ISettingsRepo {
    getSettings(): Promise<ISettings>;
}
