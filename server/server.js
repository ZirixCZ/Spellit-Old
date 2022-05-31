import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import 'dotenv/config'

const app = express();
const httpServer = createServer(app);
// Setting server options
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

// Asynchronous function which returns audio buffer
async function textToSpeech(text) {
    // The text has to be a string for the function to continue
    if (text == null || text == undefined) return;
    // Initializing SpeechConfig. Giving it two arguments, the key and setting the region
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_KEY, "northeurope")
    // Choosing the voice name for the synthesizer
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

    // Put the audioData from getBufferStream() into bufferStream variable
    let bufferStream = await getBufferStream();

    // Asynchronous function which returns audioData
    async function getBufferStream() {
        return new Promise((resolve, reject) => {
            // Initializing the synthesizer
            let synthesizer = new sdk.SpeechSynthesizer(speechConfig);
            // Calling the speakTextAsync function on the synthesizer. Passing string as an argument
            synthesizer.speakTextAsync(JSON.parse(JSON.stringify(text)).text
                , result => {
                    if (result) {
                        const { audioData } = result;
                        synthesizer.close();
                        resolve(audioData);
                    }
                },
                error => {
                    synthesizer.close();
                    reject(error);
                }
            )
        })
    }
    // Returning bufferStream with audioData
    return bufferStream;
}

let rooms = [];

// Socket.io -> Listening for a new connection
io.on("connection", (socket) => {
    io.to("BRUH").emit("broadcast", "bruh");
    // Printing out new connection's identification
    console.log(`new client:${socket.id}`);
    // Emits a connection back to the requesting client
    socket.emit("connection");
    socket.on("roomCreation", (roomName) => {
        console.log(roomName);
    })
    // Socket.io -> Listening for TextToSpeech
    socket.on("tts", async (text) => {
        socket.join("BRUH");
        let bufferStream = await textToSpeech(text);
        // Emits back a TextToSpeech with the bufferStream from textToSpeech()
        io.emit("tts", bufferStream);
    })
});

// Listens on 8080
httpServer.listen(8080);