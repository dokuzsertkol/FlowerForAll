import type { Request, Response } from "express";
import { SettingsService } from "../../application/services/settingsService.js";
import { SettingsRepo } from "../../infrastructure/repositories/settingsRepo.js";

const settingsService = new SettingsService(new SettingsRepo());

// GET : get settings
export const getSettings = async (req: Request, res: Response): Promise<void> => {

    try {
        const settings = await settingsService.getStateSettings();
        res.json({ Success: true, Message: null, Data: settings });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ Success: false, Message: "Server error." , Data: null});
    }
};