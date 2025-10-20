import { Schema, model } from "mongoose";
import type { IFlower } from "../types/flower.js";

const flowerSchema = new Schema<IFlower>({
    flowerNumber: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    diedAt: { type: Date },
    lastWateredAt: { type: Date, default: Date.now },
});

export const Flower = model<IFlower>("Flower", flowerSchema, "flowers");