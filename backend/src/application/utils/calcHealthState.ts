import type { IFlower } from "../../domain/types/flower.js";
import type { SettingsConfig } from "../../domain/types/settings.js";
import settingsConfig from "../../config/settingsConfig.json" with { type: "json" };

const config: SettingsConfig = settingsConfig;

const calcHealthState = async (flower: IFlower): Promise<number> => {

    const currentDate: Date = new Date();
    const hoursNotWatered: number = (currentDate.getTime() - flower.lastWateredAt.getTime()) / (1000 * 60 * 60);

    const level: number = Math.floor(hoursNotWatered / config.stateIntervalHours);
    const state: number = config.stateCount - 1 - level;
    return (state < 0) ? 0 : state;
}

export default calcHealthState;