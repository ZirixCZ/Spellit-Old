import React, {useEffect} from "react";
import socket from "../../modules/Socket";

// Displays one of the elements in the rooms array
// --> Room Deletion
// --> Connects To Room

const RoomItem = (props) => {

    const deleteRoom = () => {
        socket.emit("deleteRoom", props.roomName.name);
    }

    const connectToRoom = () => {
        socket.emit("connectToRoom", props.roomName.name);
    }

    useEffect(() => {
        socket.on("broadcast", (broadcast) => {
            console.log(broadcast);
        })
    }, [socket]);


    return (
        <div className="h-16 w-96 bg-neutral-800 text-white font-bold rounded flex flex-row items-center justify-center m-2">
            <button className="w-1/2 text-left ml-10" onClick={() => {
                connectToRoom()
            }}>
                <h3 className="text-2xl">{props.roomName.name}</h3>
            </button>
            <div className="w-1/2 text-right">
                <button className="text-4xl mr-10" onClick={() => {
                    deleteRoom()
                }}>X
                </button>
            </div>
        </div>
    )
}

export default RoomItem;