import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from "./pages/Login";
import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <React.StrictMode>
        <ChakraProvider>
        <BrowserRouter>
            <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
        </ChakraProvider>

    </React.StrictMode>
);