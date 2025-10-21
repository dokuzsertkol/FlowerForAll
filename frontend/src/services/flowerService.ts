import api from "./api";

export const getFlower = () => api.get("/flower");

export const createFlower = () => api.post("/flower");

export const waterFlower = () => api.put("/flower/water");

export const setFlowerDead = () => api.put("/flower/dead");

export const getLeaderboard = () => api.get("/flower/leaderboard");
