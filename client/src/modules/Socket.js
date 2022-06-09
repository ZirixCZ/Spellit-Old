import io from "socket.io-client"

const SERVER = "https://spellit-server-4ow2c.ondigitalocean.app/"

export default io(SERVER);