import React, {useEffect, useState} from "react";
import socketClient from "socket.io-client";
import Synthesis from "../../modules/Synthesis";

// TODO: figure out how to replace ./SpeechSynthesis.js with the server socket.io thingy
// TODO: think of better names, oh gosh...
const TextToSpeech = () => {
    const SERVER = "https://spellit-server-4ow2c.ondigitalocean.app/";
    const [socket] = useState(() => {
        return socketClient(SERVER);
    });
    const [inputOnChange, setInputOnChange] = useState(null);
    const [language, setLanguage] = useState("English");
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
    };

    return (
        <>
            {/* <Center h="100vh" w="100vw">
        <FormControl w="max">
          <Stack
            flexDir="column"
            w={{ base: "75vw", md: "75vw", lg: "50vw" }}
            spacing={4}
          >
            <Input
              htmlSize={4}
              variant="flushed"
              width="100%"
              type="text"
              id="input"
              placeholder="type something"
              onChange={inputHandler}
            ></Input>
            <ButtonGroup variant="outline" spacing="6" w="100vh">
              <Button colorScheme="black" onClick={btnTextStateChange}>
                Send
              </Button>
            </ButtonGroup>
          </Stack>
        </FormControl>
      </Center>
    </>*/}
        </>
    );
};

export default TextToSpeech;
