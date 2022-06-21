import io from "./io.js";
import {createRoom, fetchRoom, removeRoom} from "./redis.js";

export const emitRooms = async () => {
    let fetchedRooms = await fetchRoom()
    console.log(fetchedRooms?.length + JSON.stringify(fetchedRooms))
    if (!fetchedRooms?.length) {
        io.emit("rooms", null);
        return 0;
    }
    let roomObjects = [];
    for (let i = 0; i < fetchedRooms.length; i++) {
        let object = {
            id: fetchedRooms[i].entityFields.id._value,
            name: fetchedRooms[i].entityFields.name._value
        }
        roomObjects.push(object);
    }
    io.emit("rooms", roomObjects);

    return roomObjects;
}

export const removeRoomEntity = (id) => {
    removeRoom({
        id: id
    })
}

export const createRoomEntity = (roomName, id) => {
    createRoom({
        id: id,
        name: roomName
    })
}