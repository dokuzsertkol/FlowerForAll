import api from "./api";

export const getFlower = () => api.get("/flower");

export const createFlower = () => api.post("/flower/create");

export const waterFlower = () => api.put("/flower/water");

export const setFlowerDead = () => api.put("/flower/dead");

export const getDeadFlowers = () => api.get("/flower/deadlist");

export const getSettings = () => api.get("/settings");
