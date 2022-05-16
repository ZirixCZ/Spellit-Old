import React, { useEffect, useState } from "react";
import {Link, useNavigate}  from "react-router-dom";
import {Button, ButtonGroup, Center, FormControl, Input, Stack} from "@chakra-ui/react";
import Swal from 'sweetalert2';
const Login = () => {
    const [nameInput, setNameInput] = useState(null);
    const [name, setName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (name === null) {
            return;
        }
        console.log(`NAME HAS CHANgED TO ${name}`);
        navigate("/", { state: { name: name }});
    }, [name]);

    return (
        <>
            <Center h="100vh" w="100vw">
                <Stack flexDir="row" w="75vw">
                    <Input
                        htmlSize={4}
                        variant="flushed"
                        width="100%"
                        type="text"
                        id="input"
                        placeholder="nickname"
                        onChange={(e) => {
                            setNameInput(e.target.value);
                            console.log(name);
                        }}
                    ></Input>
                    <ButtonGroup variant="outline" w="10vw">
                        <Button colorScheme="green" onClick={() => {
                            if (nameInput === null) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Your name cannot be null or empty!',
                                })
                            }
                            setName(nameInput);
                        }}>
                            save name
                        </Button>
                    </ButtonGroup>
                </Stack>
            </Center>
        </>
    );
};

export default Login;
