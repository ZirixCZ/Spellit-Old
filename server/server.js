import 'dotenv/config'

import {httpServer, app, io} from "./lib/io.js";
import textToSpeech from "./lib/azure.js";
import {emitRooms, createRoomEntity, removeRoomEntity} from "./lib/rooms.js";

const PORT = process.env.PORT || 8080;

app.get("/roomRequest", async (req, res) => {
    res.send(await emitRooms());
})

app.post("/createRoom", async (req, res) => {
    res.send(await createRoomEntity(req.body.title))
})

app.post("/deleteRoom", async (req, res) => {
    res.send(await removeRoomEntity(req.body.title));
})

// Socket.io -> Listening for a new connection
io.on("connection", (socket) => {

    console.log(`new client: ${socket.id}`);

    socket.emit("connection");

    // When the user connects to a room
    socket.on("connectToRoom", (title) => {
        socket.join(title);
        io.sockets.in(title).emit('roomConnection', title);
    })

    // Socket.io -> Listening for TextToSpeech
    socket.on("tts", async (data) => {
        let bufferStream = await textToSpeech(data);
        // Emits back a TextToSpeech with the bufferStream from textToSpeech()
        io.emit("tts", {stream: bufferStream, title: data.title});
    })

    // On disconnect
    socket.on("disconnect", (reason) => {
        console.log(`client disconnected: ${reason}`);
    })
});

httpServer.listen(PORT);