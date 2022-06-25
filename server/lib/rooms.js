import {createRoom, fetchRoom, removeRoom} from "./redis.js";

export const emitRooms = async () => {
    let fetchedRooms = await fetchRoom();

    if (!fetchedRooms?.length)
        return [];

    let roomObjects = [];

    for (let i = 0; i < fetchedRooms.length; i++) {
        let object = {
            title: fetchedRooms[i].entityFields.title._value
        }
        roomObjects.push(object);
    }

    return roomObjects;
}

export const removeRoomEntity = async (roomName) => {
    return removeRoom({
        title: roomName
    });
}

export const createRoomEntity = async (title) => {
    return createRoom({
        title: title
    })
}