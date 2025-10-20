import { Types } from "mongoose";
import { Server } from "socket.io";

import type { IFlowerRepo } from "../../infrastructure/repositories/interfaces/IFlowerRepo.js";
import { flowerToDTO, flowerToListDTO } from "../mappers/flowerMapper.js";
import type { FlowerDTO } from "../dtos/flowerDto.js";
import type { FlowerListDTO } from "../dtos/flowerListDto.js";
import calcHealthState from "../utils/calcHealthState.js";
import settingsConfig from "../../config/settingsConfig.json" with { type: "json" };

export class FlowerService {
    constructor(private flowerRepo: IFlowerRepo) {}

    async getAliveFlower(): Promise<FlowerDTO | null> {
        
        const flower = await this.flowerRepo.getLastFlower();

        // if no flower in the database
        if (!flower) return null;
        
        const currentHealthState = await calcHealthState(flower);
        
        return flowerToDTO(flower, currentHealthState);
    };

    async createNewFlower(io: Server): Promise<FlowerDTO | null> {

        const lastFlower = await this.flowerRepo.getLastFlower();
        const maxHealthState = settingsConfig.stateCount - 1;

        // the first ever flower creation
        if (!lastFlower) return flowerToDTO(await this.flowerRepo.createFirstFlower(), maxHealthState);

        // check if the last flower is dead and announced dead
        if (!lastFlower.diedAt || await calcHealthState(lastFlower) !== 0) return null;

        // creating new flower
        const newId = lastFlower ? lastFlower.flowerNumber + 1 : 1;

        const flower = await this.flowerRepo.createFlower(newId);

        io.emit("flowerUpdated", { flower: flowerToDTO(flower, maxHealthState) });

        return flowerToDTO(flower, maxHealthState);
    };

    async waterAliveFlower(io: Server): Promise<FlowerDTO | null> {

        const flower = await this.flowerRepo.getLastFlower();

        // if no flower in the database
        if (!flower) return null;

        // check if the flower is alive
        if (await calcHealthState(flower) === 0) return null;

        // update lastWateredAt
        await this.flowerRepo.updateLastWaterDate(flower._id as Types.ObjectId);
        
        const updatedFlower = await this.flowerRepo.getFlowerById(flower._id as Types.ObjectId);
        if (!updatedFlower) return null;
        const newHealthState = await calcHealthState(updatedFlower);

        io.emit("flowerUpdated", { flower: flowerToDTO(updatedFlower, newHealthState) });

        return flowerToDTO(updatedFlower, await calcHealthState(updatedFlower));
    };

    async setAliveFlowerDead(): Promise<FlowerDTO | null> {

        const flower = await this.flowerRepo.getLastFlower();

        // if no flower in the database
        if (!flower) return null;
        
        // if flower is alive
        if (await calcHealthState(flower) !== 0) return null;

        // if flower is already announced dead
        if (flower.diedAt) return flowerToDTO(flower, 0);

        // calculate date of death
        const diedAtDate: Date = new Date(flower.lastWateredAt.getTime() + (settingsConfig.stateCount - 1) * settingsConfig.stateIntervalHours * 1000 * 60 * 60);

        // set flower dead
        await this.flowerRepo.updateDeathDate(flower._id as Types.ObjectId, diedAtDate);
        
        const updatedFlower = await this.flowerRepo.getFlowerById(flower._id as Types.ObjectId);
        if (!updatedFlower) return null;

        return flowerToDTO(updatedFlower, 0);
    };

    async getLeaderboard(): Promise<FlowerListDTO[]> {
        
        const flowers = await this.flowerRepo.getLeaderboardList();

        return flowers.map(flower => flowerToListDTO(flower));
    };
};