import React, {useEffect, useRef, useState} from "react";
import {Button, ButtonGroup, Center, FormControl, Input, Stack,} from "@chakra-ui/react";
import Swal from 'sweetalert2'
import RoomItem from "../components/Rooms/RoomItem";

// Displays the whole room array
// --> Creates new rooms

const Rooms = () => {

    const [createRoomName, setCreateRoomName] = useState(null);
    const [rooms, setRooms] = useState(null);
    const inputRef = useRef(null);

    const fetchRooms = async () => {
        setRooms(await (await fetch(`${process.env.REACT_APP_SERVER_URL}/roomRequest`)).json());
    }

    const createRoom = async (title) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: title
                })
        };

        let isFinished = await (await fetch(`${process.env.REACT_APP_SERVER_URL}/createRoom`, requestOptions)).json();
        if (isFinished) fetchRooms()
    }

    const deleteRoom = async (title) => {
//        socket.emit("deleteRoom", name);
        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: title
                })
        };

        let isFinished = await (await fetch(`${process.env.REACT_APP_SERVER_URL}/deleteRoom`, requestOptions)).json();
        if (isFinished) fetchRooms()
    }

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
        if (!rooms)
            fetchRooms();

        if (!createRoomName)
            return;

        createRoom(createRoomName);
    }, [createRoomName]);

    return (
        <>
            <div className="h-screen w-screen flex justify-end items-center flex-col">
                <h1 className="mt-10 text-3xl">Seems like you aren't connected to any rooms</h1>
                <div className="overflow-scroll h-full w-full">
                    <div className="h-full w-full mt-10 flex justify-center items-center flex-row flex-wrap">
                        {rooms ? rooms.map((room) => (
                                <div
                                    className="h-16 w-96 bg-neutral-800 text-white font-bold rounded flex flex-row items-center justify-center m-2">
                                    <RoomItem properties={room} key={room.id}/>
                                    <div className="w-1/2 text-right">
                                        <button className="text-4xl mr-10" onClick={() => {
                                            deleteRoom(room.title)
                                        }}>X
                                        </button>
                                    </div>
                                </div>))
                            : <div>Loading...</div>}
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