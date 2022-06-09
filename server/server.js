import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import 'dotenv/config'

const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = createServer(app);
// Setting server options
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

// Asynchronous function which returns audio buffer
const textToSpeech = async (text) => {

    // The text has to be a string for the function to continue
    if (text == null || text == undefined) return;

    // Initializing SpeechConfig. Giving it two arguments, the key and setting the region
    const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_KEY, "northeurope")

    // Choosing the voice name for the synthesizer
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

    // Asynchronous function which returns audioData
    const getBufferStream = async () => {
        return new Promise((resolve, reject) => {
            // Initializing the synthesizer
            let synthesizer = new sdk.SpeechSynthesizer(speechConfig);
            // Calling the speakTextAsync function on the synthesizer. Passing string as an argument
            synthesizer.speakTextAsync(JSON.parse(JSON.stringify(text)).text,
                result => {
                    if (result) {
                        const {audioData} = result;
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

    // Put the audioData from getBufferStream() into bufferStream variable
    let bufferStream = await getBufferStream();

    // Returning bufferStream with audioData
    return bufferStream;
}

let rooms = [];

const sendUpdatedRoomsArray = () => {
    io.emit("rooms", rooms);
}

// Socket.io -> Listening for a new connection
io.on("connection", (socket) => {
    // Printing out new connection's identification
    console.log(`new client: ${socket.id}`);
    // Emits a connection back to the requesting client
    socket.emit("connection");
    // When the user creates a rooms
    socket.on("createRoom", (roomName) => {
        rooms.push(roomName);
        sendUpdatedRoomsArray();
    })
    // When the user removes a room
    socket.on("deleteRoom", (roomName) => {
        let index = rooms.indexOf(roomName);
        if (index > -1) {
            rooms.splice(index, 1); // 2nd parameter means remove one item only
        }
        sendUpdatedRoomsArray();
    })
    // When the user requests all the rooms
    socket.on("requestRooms", () => {
        sendUpdatedRoomsArray();
    })
    // When the user connects to a room
    socket.on("connectToRoom", (roomName) => {
        socket.join(roomName);
        io.sockets.in(roomName).emit('roomConnection', roomName);
    })
    // Socket.io -> Listening for TextToSpeech
    socket.on("tts", async (text) => {
        let bufferStream = await textToSpeech(text);
        // Emits back a TextToSpeech with the bufferStream from textToSpeech()
        io.emit("tts", {stream: bufferStream, roomName: text.roomName});
    })
});

httpServer.listen(PORT);