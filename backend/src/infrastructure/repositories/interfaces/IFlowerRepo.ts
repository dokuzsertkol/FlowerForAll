import type { IFlower } from "../../../domain/types/flower.js";
import { Types, type UpdateResult } from "mongoose";

export interface IFlowerRepo {
    getLastFlower(): Promise<IFlower | null>;
    getFlowerById(id: Types.ObjectId): Promise<IFlower | null>;
    createFirstFlower(): Promise<IFlower>;
    createFlower(id: number): Promise<IFlower>;
    updateLastWaterDate(id: Types.ObjectId): Promise<UpdateResult>;
    updateDeathDate(id: Types.ObjectId, diedAtDate: Date): Promise<UpdateResult>;
    getLeaderboardList(): Promise<IFlower[]>;
}
