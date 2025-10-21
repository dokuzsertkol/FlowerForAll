import { Schema, model } from "mongoose";
import type { ISettings } from "../types/settings.js";

const settingsSchema = new Schema<ISettings>({
    stateIntervalHours: { type: Number, default: 0 },
    stateCount: { type: Number, default: 0 }
});

export const Settings = model<ISettings>("Setting", settingsSchema, "settings");