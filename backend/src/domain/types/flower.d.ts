import { Document } from "mongoose";

export interface IFlower extends Document {
    flowerNumber: number;
    createdAt: Date;
    diedAt?: Date;
    lastWateredAt: Date;
}