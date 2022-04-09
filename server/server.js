import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import 'dotenv/config'

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

function textToSpeech(text) {
    if (text == null || text == undefined) return;
    const speechConfig = sdk.SpeechConfig.
        fromSubscription(process.env.AZURE_KEY, "northeurope")
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

    let synthesizer = new sdk.SpeechSynthesizer(speechConfig);
    synthesizer.speakTextAsync(text, () => {
        synthesizer.close();
    })
}

io.on("connection", (socket) => {
    console.log(`new client:${socket.id}`);
    socket.emit("connection");
    socket.on("TextToSpeech", (text) => {
        console.log(text);
        io.emit("TextToSpeech", text);
    })
});

httpServer.listen(8080);