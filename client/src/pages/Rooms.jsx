import React, {useEffect, useRef, useState} from "react";
import {Button, ButtonGroup, Center, FormControl, Input, Stack,} from "@chakra-ui/react";
import Swal from 'sweetalert2'
import RoomItem from "../components/Rooms/RoomItem";
import socket from "../modules/Socket";

const Rooms = () => {
    const [createRoomName, setCreateRoomName] = useState(null);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        let inputValue = inputRef.current.valueOf().value;
        if (inputValue === null || inputValue === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The room name cannot be empty!',
            })
            return;
        }
        setCreateRoomName(inputRef.current.valueOf().value);
    }

    useEffect(() => {
        if (createRoomName === null) return;
        socket.emit("roomCreation", createRoomName);
    }, [createRoomName]);

    return (
        <>
            <div className="h-screen flex justify-end items-center flex-col">
                <div className="h-96 w-screen flex justify-center">
                    <RoomItem/>
                </div>
                <Center h="50vh" w="100vw">
                    <FormControl w="max">
                        <Stack flexDir="column" w={{base: "75vw", md: "75vw", lg: "50vw"}} spacing={4}>
                            <Input htmlSize={4} variant="flushed" width="100%" type="text" id="input"
                                   placeholder="How do you want to call your room" ref={inputRef}></Input>
                            <ButtonGroup variant="outline" spacing="6" w="100vh">
                                <Button colorScheme="black" onClick={handleSubmit}>Create Room</Button>
                            </ButtonGroup>
                        </Stack>
                    </FormControl>
                </Center>
            </div>
        </>
    )
}

export default Rooms;