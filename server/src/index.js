var express = require('express');
var http = require('http');
var Server = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = new Server.Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log(`new client:${socket.id}`);
    socket.emit("connection");
    socket.on("tts", async (text) => {
        console.log(text);
        socket.broadcast.emit("tts", JSON.parse(JSON.stringify(text)).text);
    })
});

httpServer.listen(8080);