import type { Request, Response } from "express";
import { FlowerService } from "../../application/services/flowerService.js";
import { FlowerRepo } from "../../infrastructure/repositories/flowerRepo.js";
import { Server } from "socket.io";

const flowerService = new FlowerService(new FlowerRepo());

// GET : get flower
export const getFlower = async (req: Request, res: Response): Promise<void> => {
    try {
        const flower = await flowerService.getAliveFlower();
        if (!flower) {
            res.json({Success: false, Message: "No flower in the database."});
            return;
        }
        res.json({Success: true, Message: flower.healthState === 0 ? "Flower is dead." : "Flower is alive.", Data: flower});
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ Success: false, Message: "Server error." });
    }
};

// POST : create a new flower
export const createFlower = async (req: Request, res: Response): Promise<void> => {
    const io: Server = req.app.get("io");
    try {
        const flower = await flowerService.createNewFlower(io);
        if (!flower) {
            res.json({Success: false, Message: "Flower is alive."});
            return;
        }
        res.json({Success: true, Message: "New flower created.", Data: flower});
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ Success: false, Message: "Server error." });
    }
};

// PUT : update the lastWateredAt date
export const waterFlower = async (req: Request, res: Response): Promise<void> => {
    try {
        const io: Server = req.app.get("io");
        const flower = flowerService.waterAliveFlower(io);

        if (!flower){
            res.json({Success: false, Message: "Flower is dead."});
            return;
        }

        res.json({Success: true, Message: "The flower is watered.", Data: flower});
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ Success: false, Message: "Server error." });
    }
};

// PUT : update the diedAt date
export const setFlowerDead = async (req: Request, res: Response): Promise<void> => {

    try {
        const flower = await flowerService.setAliveFlowerDead();
        if (!flower) {
            res.json({Success: false, Message: "Flower is alive."});
            return;
        }
        res.json({Success: true, Message: "The flower set dead. RIP.", Data: flower});
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ Success: false, Message: "Server error." });
    }
};

// GET : list of dead flowers
export const getFlowerLeaderboard = async (req: Request, res: Response): Promise<void> => {
    
    const flowers = await flowerService.getLeaderboard();
    res.json({ Success: true, Message: null, Data: flowers});
    return;
};
