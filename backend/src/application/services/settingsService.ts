import type { ISettingsRepo } from "../../infrastructure/repositories/interfaces/ISettingsRepo.js";
import type { SettingsDTO } from "../dtos/settingsDto.js";
import { settingsToDTO } from "../mappers/settingsMapper.js";

export class SettingsService {
    constructor(private settingsRepo: ISettingsRepo) {}

    async getStateSettings(): Promise<SettingsDTO> {

        const settings = await this.settingsRepo.getSettings();

        return settingsToDTO(settings);
    };
};