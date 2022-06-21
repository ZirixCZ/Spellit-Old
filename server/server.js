import 'dotenv/config'

import io, {httpServer} from "./lib/io.js";
import textToSpeech from "./lib/azure.js";
import {emitRooms, createRoomEntity, removeRoomEntity} from "./lib/rooms.js";

const PORT = process.env.PORT || 8080;

let id;

// Socket.io -> Listening for a new connection
io.on("connection", (socket) => {
    // Printing out new connection's identification
    console.log(`new client: ${socket.id}`);
    // Emits a connection back to the requesting client
    socket.emit("connection");
    // When the user creates a rooms
    socket.on("createRoom", async (roomName) => {
        let fetchID = await emitRooms()
            .catch((err) => console.log(err))
            .then(rooms => id = rooms ? rooms.length : 0);
        console.log(fetchID)
        createRoomEntity(roomName, id);
        emitRooms();
    })
    // When the user removes a room
    socket.on("deleteRoom", async (id) => {
        removeRoomEntity(id);
        emitRooms();
    })
    // When the user requests all the rooms
    socket.on("requestRooms", async () => {
        await emitRooms();
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
    // On disconnect
    socket.on("disconnect", (reason) => {
        console.log(`client disconnected: ${reason}`);
    })
});

httpServer.listen(PORT);