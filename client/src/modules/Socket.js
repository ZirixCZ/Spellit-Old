import io from "socket.io-client"

const SERVER = `${process.env.REACT_APP_SERVER_URL}`

export default io(SERVER);