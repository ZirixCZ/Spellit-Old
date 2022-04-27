import React, { useState, useEffect } from "react";
import socketClient from "socket.io-client";
import SpeechSynthesis from "./SpeechSynthesis";
import {
  Center,
  FormControl,
  Button,
  ButtonGroup,
  Input,
  Stack,
  Select,
} from "@chakra-ui/react";

// TODO: figure out how to replace ./SpeechSynthesis.js with the server socket.io thingy
// TODO: think of better names, oh gosh...
const TextToSpeech = () => {
  const SERVER = "http://localhost:8080/";
  const [socket] = useState(() => {
    return socketClient(SERVER);
  });
  const [input, setInput] = useState(null); // TODO: think of a way of handeling the onChange without this
  const [text, setText] = useState(null);
  const [language, setLanguage] = useState("English");

  const [audioStream, setAudioStream] = useState(null);

  useEffect(() => {
    socket.on("connection", () => {
      socket.on("TextToSpeech", (output) => {
        //console.log(JSON.parse(JSON.stringify(output)).output)
        // console logging the stream from azure
        console.log(output);
        setAudioStream(output);
      });
    });
  }, [socket]);

  // sending the text to the server
  useEffect(() => {
    if (text == null || text == undefined) return;
    socket.emit("TextToSpeech", {
      text: text,
    });
  }, [text]);

  const properties = {
    text: text,
    language: language,
  };

  const buttonClickHandlerLanguage = (e) => setLanguage(e.target.value);
  const inputHandler = (e) => setInput(e.target.value);
  const buttonClickHandlerText = (e) => {
    e.preventDefault();
    setText(input);
  };
  // audiocontext
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  const audioContext = new AudioContext();
  return (
    <>
      <Center h="100vh" w="100vw">
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
              <Button colorScheme="black" onClick={buttonClickHandlerText}>
                Play Audio
              </Button>
              <Select
                id="language-chooser"
                w="20vh"
                onChange={buttonClickHandlerLanguage}
              >
                <option>English</option>
                <option>Czech</option>
              </Select>
            </ButtonGroup>
          </Stack>
          <audio src="" controls></audio>
        </FormControl>
      </Center>
      {/* <SpeechSynthesis
        text={properties.text}
        language={properties.language}
      ></SpeechSynthesis> */}
    </>
  );
};
export default TextToSpeech;
