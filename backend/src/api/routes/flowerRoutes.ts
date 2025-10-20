import { Router } from "express";
import { getFlower, createFlower, waterFlower, setFlowerDead, getFlowerLeaderboard } from "../controllers/flowerController.js";

const flowerRoutes: Router = Router();

flowerRoutes.get("/", getFlower);
flowerRoutes.post("/create", createFlower);
flowerRoutes.put("/water", waterFlower);
flowerRoutes.put("/dead", setFlowerDead);
flowerRoutes.get("/deadlist", getFlowerLeaderboard);

export default flowerRoutes;