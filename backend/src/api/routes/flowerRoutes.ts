import { Router } from "express";
import { getFlower, createFlower, waterFlower, setFlowerDead, getFlowerLeaderboard } from "../controllers/flowerController.js";

const flowerRoutes: Router = Router();

flowerRoutes.get("/", getFlower);
flowerRoutes.post("/", createFlower);
flowerRoutes.put("/water", waterFlower);
flowerRoutes.put("/dead", setFlowerDead);
flowerRoutes.get("/leaderboard", getFlowerLeaderboard);

export default flowerRoutes;