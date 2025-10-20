import { Router } from "express";
import { getSettings } from "../controllers/settingsController.js";

const settingsRoutes = Router();
settingsRoutes.get("/", getSettings);

export default settingsRoutes;