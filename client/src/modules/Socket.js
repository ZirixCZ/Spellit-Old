import io from "socket.io-client"

const SERVER = "https://starfish-app-wysgy.ondigitalocean.app/"

export default io(SERVER);