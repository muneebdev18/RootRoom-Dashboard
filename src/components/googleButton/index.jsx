import React from 'react';
import { FcGoogle } from "react-icons/fc";

import './style.css';

const GoogleButton = ({ content }) => {
    return (
        <>
            <button className="google-button">
                <FcGoogle className="google-icon" />
                {content}
            </button>
        </>
    )
}

export default GoogleButton;