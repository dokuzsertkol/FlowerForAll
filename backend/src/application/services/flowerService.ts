import { Types } from "mongoose";
import { Server } from "socket.io";

import type { IFlowerRepo } from "../../infrastructure/repositories/interfaces/IFlowerRepo.js";
import type { ISettingsRepo } from "../../infrastructure/repositories/interfaces/ISettingsRepo.js";
import { flowerToDTO, flowerToListDTO } from "../mappers/flowerMapper.js";
import type { FlowerDTO } from "../dtos/flowerDto.js";
import type { FlowerListDTO } from "../dtos/flowerListDto.js";
import calcHealthState from "../utils/calcHealthState.js";

export class FlowerService {
    constructor(private flowerRepo: IFlowerRepo, private settingsRepo: ISettingsRepo) {}

    async getAliveFlower(): Promise<FlowerDTO | null> {
        
        const flower = await this.flowerRepo.getLastFlower();

        // if no flower in the database
        if (!flower) return null;

        const config = await this.settingsRepo.getSettings();
        const currentHealthState = await calcHealthState(flower, config);
        
        return flowerToDTO(flower, currentHealthState);
    };

    async createNewFlower(io: Server): Promise<FlowerDTO | null> {
        
        const lastFlower = await this.flowerRepo.getLastFlower();
        if (!lastFlower?.diedAt) return null;

        const config = await this.settingsRepo.getSettings();
        const maxHealthState = config.stateCount - 1;

        // the first ever flower creation
        if (!lastFlower) return flowerToDTO(await this.flowerRepo.createFirstFlower(), maxHealthState);


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
        const config = await this.settingsRepo.getSettings();
        if (await calcHealthState(flower, config) === 0) return null;

        // update lastWateredAt
        await this.flowerRepo.updateLastWaterDate(flower._id as Types.ObjectId);
        
        const updatedFlower = await this.flowerRepo.getFlowerById(flower._id as Types.ObjectId);
        if (!updatedFlower) return null;
        const newHealthState = await calcHealthState(updatedFlower, config);

        io.emit("flowerUpdated", { flower: flowerToDTO(updatedFlower, newHealthState) });

        return flowerToDTO(updatedFlower, newHealthState);
    };

    async setAliveFlowerDead(): Promise<FlowerDTO | null> {

        const flower = await this.flowerRepo.getLastFlower();

        // if no flower in the database
        if (!flower) return null;
        
        // if flower is alive
        const config = await this.settingsRepo.getSettings();
        if (await calcHealthState(flower, config) !== 0) return null;

        // if flower is already announced dead
        if (flower.diedAt) return flowerToDTO(flower, 0);

        // calculate date of death
        const diedAtDate: Date = new Date(flower.lastWateredAt.getTime() + (config.stateCount - 1) * config.stateIntervalHours * 1000 * 60 * 60);

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