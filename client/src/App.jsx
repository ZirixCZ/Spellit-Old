import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import Controls from "./components/AudioControls/Controls";
import NavBar from "./components/NavBar/NavBar";
import Rooms from "./components/Rooms/Rooms";
import socket from "./modules/Socket";

const App = () => {
    const [id, setId] = useState(null);

    // Making initial connection, supplying socket id
    socket.on("connection", () => {
        console.log(socket.id)
        setId(socket.id);
    })

    let props = {
        id: id,
    }

    return (
        <>
            <NavBar socketID={props.id}/>
            <Routes>
                <Route path="/" element={<Controls/>}></Route>
                <Route path="/rooms" element={<Rooms/>}></Route>
            </Routes>
        </>
    );
};
export default App;