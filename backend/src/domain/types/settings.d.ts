import { Document } from "mongoose";

export interface ISettings extends Document {
    stateIntervalHours: number;
    stateCount: number;
}
