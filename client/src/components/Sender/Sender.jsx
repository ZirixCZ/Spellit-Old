import React, {useEffect, useState} from "react";
import socketClient from "socket.io-client";
import Synthesis from "../../modules/Synthesis";

const Sender = () => {
    const SERVER = "http://localhost:8080";
    const [socket] = useState(() => {
        return socketClient(SERVER);
    });
    const [inputOnChange, setInputOnChange] = useState(null);
    const [textToPlay, setTextToPlay] = useState(null);
    const [text, setText] = useState(null);

    useEffect(() => {
        socket.on("connection", () => {
            console.log(`Connected to server as ${socket.id}`)
            socket.on("tts", (output) => {
                console.log(`Broadcast: ${output}`);
                setTextToPlay(output);
            });
        });
    }, [socket]);

// sending the text to the server
    useEffect(() => {
        if (text === null || text === undefined) return;
        socket.emit("tts", {
            text: text,
        });
    }, [text]);

// play the audio with web speech api
    useEffect(() => {
        if (textToPlay === null) return;
        Synthesis(textToPlay);
    }, [textToPlay]);

// When typing, change input to the written text
    const inputHandler = (e) => setInputOnChange(e.target.value);
// When this is clicked, put input into text
    const btnTextStateChange = (e) => {
        e.preventDefault();
        setText(inputOnChange);
    }

    return (
        <>
            <div className="flex w-screen h-screen">
                <form className="w-full h-full">
                    <input className="w-full h-full" onChange={inputHandler}>Hello</input>
                </form>
            </div>
        </>
    );
}

export default Sender;