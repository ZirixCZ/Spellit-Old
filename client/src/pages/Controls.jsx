import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Center, FormControl, Input, Stack,} from "@chakra-ui/react";
import Audio from "../modules/Audio";
import socket from "../modules/Socket";

// Gives controls for playing audio
// --> Listens and sends tts

const Controls = (props) => {

    const [input, setInput] = useState(null);
    const [text, setText] = useState(null);
    const [audioStream, setAudioStream] = useState(null);

    useEffect(() => {

        // Socket.io -> Listens for a TextToSpeech response from the server
        socket.on("tts", (output) => {
            if (output.title === props.title) {
                setAudioStream(output.stream);
            }
        });

    }, [socket]);

    // Emiting TextToSpeech to Socket.io with text as an argument
    useEffect(() => {

        if (text === null) return;
        socket.emit("tts", {
            text: text,
            title: props.title
        });

    }, [text]);

    const inputHandler = (e) => setInput(e.target.value);
    const buttonClickHandlerText = (e) => {
        e.preventDefault();
        setText(input);
    };

    return (
        <>
            <Center h="100vh" w="100vw">
                <FormControl w="max">
                    <Stack flexDir="column" w={{base: "75vw", md: "75vw", lg: "50vw"}} spacing={4}>
                        <Input htmlSize={4} variant="flushed" width="100%" type="text" id="input"
                               placeholder="type something" onChange={inputHandler}></Input>
                        <ButtonGroup variant="outline" spacing="6" w="100vh">
                            <Button colorScheme="black" onClick={buttonClickHandlerText}>Play Audio</Button>
                        </ButtonGroup>
                    </Stack>
                    <Audio output={audioStream}></Audio>
                </FormControl>
            </Center>
        </>
    )
}

export default Controls;