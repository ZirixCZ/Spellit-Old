import express from "express";
import cors from "cors";
import {createServer} from "http";
import {Server} from "socket.io";
import bodyParser from "body-parser";

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

export const httpServer = createServer(app);

export const io = new Server(httpServer, {
    cors: {
        origin: process.env.ALLOWED_ORIGIN,
    }
});