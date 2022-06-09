import React, {useEffect, useRef, useState} from "react";
import {Button, ButtonGroup, Center, FormControl, Input, Stack,} from "@chakra-ui/react";
import Swal from 'sweetalert2'
import RoomItem from "../components/Rooms/RoomItem";
import socket from "../modules/Socket";

// Displays the whole room array
// --> Creates new rooms

const Rooms = () => {

    const [createRoomName, setCreateRoomName] = useState(null);
    const [rooms, setRooms] = useState([]);
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
        if (inputValue.length > 10) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The room name cannot exceed 10 characters!',
            })
            return;
        }
        setCreateRoomName(inputRef.current.valueOf().value);
    }

    useEffect(() => {
        if (rooms.length == 0) {
            socket.emit("requestRooms");
        }
    }, [rooms])

    useEffect(() => {
        if (createRoomName === null) return;
        socket.emit("createRoom", createRoomName);
    }, [createRoomName]);

    useEffect(() => {
        socket.on("rooms", (rooms) => {
            for (let i = 0; i < rooms.length; i++) {
                console.log(rooms[i]);
            }
            setRooms(rooms);
        })

    }, [socket]);

    return (
        <>
            <div className="h-screen w-screen flex justify-end items-center flex-col">
                <h1 className="mt-10 text-3xl">Seems like you aren't connected to any rooms</h1>
                <div className="overflow-scroll h-full w-full">
                    <div className="h-full w-full mt-10 flex justify-center items-center flex-row flex-wrap">
                        {rooms.map((room) => <RoomItem roomName={room}/>)}
                    </div>
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