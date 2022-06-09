import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Controls from "./pages/Controls";
import NavBar from "./components/NavBar/NavBar";
import Rooms from "./pages/Rooms";
import PageNotFound from "./pages/PageNotFound";
import socket from "./modules/Socket";

const App = () => {

    const [isConnected, setIsConnected] = useState(false);
    const [connectedRoom, setConnectedRoom] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {

        socket.on("connection", () => {
            console.log(socket.id)
            setId(socket.id);
        })

        socket.on("roomConnection", (broadcast) => {
            console.log(broadcast);
            setIsConnected(true);
            setConnectedRoom(broadcast);
        })

    }, [])

    let props = {
        id: id,
    }

    return (
        <>
            <NavBar socketID={props.id}/>
            <Routes>
                <Route path="/" element={isConnected ? <Controls roomName={connectedRoom}/> : <Rooms/>}></Route>
                <Route path="*" element={<PageNotFound/>}></Route>
            </Routes>
        </>
    );
};

export default App;