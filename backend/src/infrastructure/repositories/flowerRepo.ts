import { Types, type UpdateResult } from "mongoose";

import { Flower } from "../../domain/models/flowerModel.js";
import type { IFlower } from "../../domain/types/flower.js";
import type { IFlowerRepo } from "./interfaces/IFlowerRepo.js";

export class FlowerRepo implements IFlowerRepo {
    async getLastFlower(): Promise<IFlower | null> {
        return await Flower.findOne().sort({ createdAt: -1 });
    };

    async getFlowerById(id: Types.ObjectId): Promise<IFlower | null> {
        return await Flower.findById(id);
    };

    async createFirstFlower(): Promise<IFlower> {
        const flower = new Flower({ flowerNumber: 1, diedAt: null, lastWateredAt: new Date()});
        await flower.save();
        return flower;
    };

    async createFlower(id: number): Promise<IFlower> {
        const flower = new Flower({
            flowerNumber: id,
            diedAt: null
        });
        await flower.save();
        return flower;
    };

    async updateLastWaterDate(id: Types.ObjectId): Promise<UpdateResult> {
        return await Flower.updateOne(
            { _id: id},
            { $set: { lastWateredAt: new Date() }}
        );
    };

    async updateDeathDate(id: Types.ObjectId, diedAtDate: Date): Promise<UpdateResult> {
        return await Flower.updateOne(
            { _id: id},
            { $set: { diedAt: diedAtDate }}
        );
    };

    async getLeaderboardList(): Promise<IFlower[]> {
        return await Flower.aggregate([
            {
                $addFields: {
                    timeSurvived: {
                        $subtract: [
                        { $ifNull: ["$diedAt", new Date()] },
                        "$createdAt"
                        ]
                    }
                }
            },
            { $sort: { timeSurvived: -1 } },
            { $limit: 5 }
        ]);
    }
};