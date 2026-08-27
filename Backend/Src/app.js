import dotenv from 'dotenv';
dotenv.config();

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from "cors";
import { ConnectToSocket } from './Controllers/socketManager.js';
import userRoutes from "./Routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = ConnectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({ limits: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

app.get("/get", (req, res) => {
    return res.send("Hello World");
});

const start = async() => {
    const connectinoDB = await mongoose.connect(process.env.ATLASDB_URL);
    console.log(`Mongo connected to host: ${connectinoDB.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("App is listening on port 8000");
    });
}

start();