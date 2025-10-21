import api from "./api";

export const getSettings = () => api.get("/settings");