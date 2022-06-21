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
            name: fetchedRooms[i].entityFields.name._value
        }
        roomObjects.push(object);
    }
    io.emit("rooms", roomObjects);

    return roomObjects;
}

export const removeRoomEntity = async (roomName) => {
    await removeRoom({
        name: roomName
    })
}

export const createRoomEntity = async (roomName) => {
    await createRoom({
        name: roomName
    })
}