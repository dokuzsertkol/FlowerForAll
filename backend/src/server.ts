import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./infrastructure/database/db.js";
import flowerRoutes from "./api/routes/flowerRoutes.js";
import settingsRoutes from "./api/routes/settingsRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/flower", flowerRoutes);
app.use("/api/settings", settingsRoutes);

// Socket io
const server = http.createServer(app);

const allowedOrigins = [
    process.env.FRONTEND_URL || "",      // AWS frontend URL
    process.env.VERCEL_FRONTEND_URL || "", // Vercel frontend URL
    "http://localhost:5173"
]

const io = new Server(server, {
  cors: { origin: allowedOrigins }
});
app.set("io", io);

// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running."));
