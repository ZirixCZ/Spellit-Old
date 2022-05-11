import React, { useEffect, useState } from "react";
import {Link, useNavigate}  from "react-router-dom";
import {Button, ButtonGroup, Center, FormControl, Input, Stack} from "@chakra-ui/react";
const Login = () => {
    const [nameInput, setNameInput] = useState(null);
    const [name, setName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (name === null) return;
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
                    <ButtonGroup variant="outline" w="100vw">
                        <Button colorScheme="red" onClick={() => {
                            setName(nameInput);
                        }}>
                            save name
                        </Button>
                        <Button colorScheme="black">
                            <Link to="/">Root</Link>
                        </Button>
                    </ButtonGroup>
                </Stack>
            </Center>
        </>
    );
};

export default Login;
