import io from "./io.js";
import {createRoom, fetchRoom, removeRoom} from "./redis.js";

export const emitRooms = async (updatedRooms) => {
    let fetchedRooms = await fetchRoom()
    if (!fetchedRooms[0]) return;

    let roomObjects = [];
    for (let i = 0; i < fetchedRooms.length; i++) {
        let object = {
            id: fetchedRooms[i].entityFields.id._value,
            name: fetchedRooms[i].entityFields.name._value
        }
        roomObjects.push(object);
    }
    console.log(roomObjects)
    io.emit("rooms", roomObjects);
}

export const removeRoomEntity = (rooms, id) => {
    for (let index = 0; index < rooms.length; index++) {
        if (rooms[index].id === id) {
            rooms.splice(index, 1);
        }
    }
    removeRoom({
        id: id
    })
}

export const createRoomEntity = (roomName, id, rooms) => {
    rooms.push({
        id: id,
        name: roomName
    });
    createRoom({
        id: id,
        name: roomName
    })
}