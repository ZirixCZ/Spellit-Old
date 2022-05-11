import React, { useEffect, useState } from "react";
import Sender from "./components/Sender/Sender";
import { useLocation, useNavigate } from "react-router-dom";

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    if (location.state?.name === null || location.state?.name === undefined) {
        console.log("I SHALL BE AT LOGIN NOW?")
        navigate("/login", {});
    }
    return (
        <>
            {/*communicates with the server, plays audio*/}
            <Sender></Sender>
        </>
    );
};

export default App;
