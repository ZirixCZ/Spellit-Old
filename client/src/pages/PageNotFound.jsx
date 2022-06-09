import React from "react";
import {useNavigate} from 'react-router-dom';

const PageNotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col text-3xl">
            <h2>Page not found</h2>
            <button className="mt-5" onClick={() => navigate(-1)}><b>Go back</b></button>

        </div>
    )
}

export default PageNotFound;