import React, {useEffect} from "react";
import socket from "../../modules/Socket";

// Displays one of the elements in the rooms array
// --> Room Deletion
// --> Connects To Room

const RoomItem = (props) => {

    const connectToRoom = () => {
        socket.emit("connectToRoom", props.properties.title);
    }

    useEffect(() => {
        socket.on("broadcast", (broadcast) => {
            console.log(broadcast);
        })
    }, [socket]);


    return (
        <button className="w-1/2 text-left ml-10" onClick={() => {
            connectToRoom()
        }}>
            <h3 className="text-2xl">{props.properties.title}</h3>
        </button>
    )
}

export default RoomItem;