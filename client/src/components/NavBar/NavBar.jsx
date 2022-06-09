import React from "react";
import {Link} from "react-router-dom";

const NavBar = (props) => {
    return (
        <nav className="w-screen h-10 border-b-2 flex items-center">
            <li>Socket ID: {props.socketID}</li>
            <Link className="ml-5 font-bold" to="/">Root</Link>
        </nav>
    )
}

export default NavBar;