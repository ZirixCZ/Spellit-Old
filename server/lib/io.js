import {createServer} from "http";
import {Server} from "socket.io";

export const httpServer = createServer();

// Setting server options
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

export default io;
