import type { FlowerDTO } from "../dtos/flowerDto.js";
import type { FlowerListDTO } from "../dtos/flowerListDto.js";
import type { IFlower } from "../../domain/types/flower.js";

export const flowerToDTO = (flower: IFlower, state: number): FlowerDTO => {
    return {
        flowerNumber: flower.flowerNumber,
        lastWateredAt: flower.lastWateredAt,
        diedAt: flower.diedAt,
        createdAt: flower.createdAt,
        healthState: state
    };
}

export const flowerToListDTO = (flower: IFlower): FlowerListDTO => {

    const created: Date = new Date(flower.createdAt);
    const died: Date = flower.diedAt ? new Date(flower.diedAt) : new Date();

    // calculating years survived 
    const diffMs: number = died.getTime() - created.getTime();
    const days: number = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    
    return {
        flowerNumber: flower.flowerNumber,
        diedAt: flower.diedAt ? new Date(flower.diedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }) : "Alive",
        createdAt: flower.createdAt.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }),
        timeSurvived: (days > 0) ? `${days} days, ${hours} hours` : `${hours} hours`
    };
}