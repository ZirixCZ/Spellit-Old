//import * as sdk from "microsoft-cognitiveservices-speech-sdk";

var createServer = require('http');
var Server = require('socket.io');
var express = require('express');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log(`new client:${socket.id}`);
    socket.emit("connection");
    socket.on("TextToSpeech", async (text) => {
        console.log(text);
        socket.broadcast.emit("TextToSpeech", JSON.parse(JSON.stringify(text)).text);
    })
});

httpServer.listen(8080);